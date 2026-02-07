/**
 * MermaidBackend.ts
 * Mermaid.js backend for diagram generation
 *
 * Generates Mermaid DSL from prompts and renders to SVG.
 * Handles flowcharts, sequence diagrams, state diagrams, and more.
 */

import mermaid from 'mermaid';
import type {
  AIBackend,
  GenerationRequest,
  GenerationResult,
  ValidationResult,
  Logger,
  DiagramType,
} from '../types';
import { createLogger, AIServiceError } from '../types';
import { FEW_SHOT_EXAMPLES } from '../prompts';
import { llmService, type ConsortData, type PrismaData, type ForestPlotData } from '../LLMService';

// =============================================================================
// MERMAID CONFIGURATION
// =============================================================================

/**
 * Design tokens for consistent theming
 */
const DESIGN_TOKENS = {
  colors: {
    primary: '#2563eb',
    secondary: '#7c3aed',
    success: '#059669',
    warning: '#d97706',
    error: '#dc2626',
    neutral: '#6b7280',
    background: '#ffffff',
    surface: '#f9fafb',
    border: '#e5e7eb',
    text: '#111827',
    textMuted: '#6b7280',
  },
  fonts: {
    primary: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
};

/**
 * Mermaid theme configuration
 */
const MERMAID_THEME_CONFIG = {
  theme: 'base' as const,
  themeVariables: {
    primaryColor: DESIGN_TOKENS.colors.primary,
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#1d4ed8',
    secondaryColor: DESIGN_TOKENS.colors.surface,
    secondaryTextColor: DESIGN_TOKENS.colors.text,
    secondaryBorderColor: DESIGN_TOKENS.colors.border,
    tertiaryColor: '#fef3c7',
    tertiaryTextColor: DESIGN_TOKENS.colors.text,
    tertiaryBorderColor: '#fbbf24',
    lineColor: DESIGN_TOKENS.colors.neutral,
    textColor: DESIGN_TOKENS.colors.text,
    mainBkg: DESIGN_TOKENS.colors.background,
    nodeBorder: DESIGN_TOKENS.colors.border,
    clusterBkg: DESIGN_TOKENS.colors.surface,
    clusterBorder: DESIGN_TOKENS.colors.border,
    fontFamily: DESIGN_TOKENS.fonts.primary,
    fontSize: '14px',
    labelColor: DESIGN_TOKENS.colors.text,
    actorBkg: DESIGN_TOKENS.colors.primary,
    actorBorder: '#1d4ed8',
    actorTextColor: '#ffffff',
    signalColor: DESIGN_TOKENS.colors.text,
    signalTextColor: DESIGN_TOKENS.colors.text,
    noteBkgColor: '#fef9c3',
    noteTextColor: DESIGN_TOKENS.colors.text,
    noteBorderColor: '#fbbf24',
  },
};

/**
 * Mermaid diagram type patterns
 */
const MERMAID_TYPE_PATTERNS: Record<string, RegExp> = {
  flowchart: /^flowchart\s+(TB|BT|LR|RL)/im,
  graph: /^graph\s+(TB|BT|LR|RL)/im,
  sequence: /^sequenceDiagram/im,
  class: /^classDiagram/im,
  state: /^stateDiagram/im,
  er: /^erDiagram/im,
  pie: /^pie\s+/im,
  gantt: /^gantt\s*/im,
  journey: /^journey\s*/im,
  git: /^gitGraph\s*/im,
  mindmap: /^mindmap\s*/im,
  timeline: /^timeline\s*/im,
  quadrant: /^quadrantChart\s*/im,
  requirement: /^requirementDiagram\s*/im,
  c4: /^C4Context\s*/im,
  sankey: /^sankey-beta\s*/im,
};

// =============================================================================
// MERMAID BACKEND CLASS
// =============================================================================

/**
 * MermaidBackend implements AIBackend for Mermaid.js diagram generation
 */
export class MermaidBackend implements AIBackend {
  readonly name = 'mermaid';
  private initialized = false;
  private renderCounter = 0;
  private readonly logger: Logger;

  constructor(logger?: Logger) {
    this.logger = logger ?? createLogger('MermaidBackend');
  }

  /**
   * Initialize Mermaid with configuration
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    this.logger.debug('Initializing Mermaid');

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      ...MERMAID_THEME_CONFIG,
    });

    this.initialized = true;
    this.logger.info('Mermaid initialized');
  }

  /**
   * Check if this backend can handle the given prompt
   */
  canHandle(prompt: string): boolean {
    const normalizedPrompt = prompt.toLowerCase();

    // Check if it's already Mermaid DSL
    if (this.isMermaidDSL(prompt)) {
      return true;
    }

    // Keywords that indicate Mermaid-suitable diagrams
    const mermaidKeywords = [
      'flowchart', 'flow chart', 'flow diagram', 'process flow', 'workflow',
      'sequence diagram', 'sequence', 'interaction',
      'state diagram', 'state machine', 'state transition',
      'decision tree', 'algorithm', 'branching',
      'consort', 'prisma', 'trial flow', 'systematic review',
      'class diagram', 'er diagram', 'entity relationship',
      'timeline', 'journey', 'gantt', 'mindmap',
    ];

    for (const keyword of mermaidKeywords) {
      if (normalizedPrompt.includes(keyword)) {
        return true;
      }
    }

    // Default to handling flowchart-like requests
    if (
      normalizedPrompt.includes('diagram') ||
      normalizedPrompt.includes('flow') ||
      normalizedPrompt.includes('process')
    ) {
      return true;
    }

    return false;
  }

  /**
   * Generate a diagram from the request
   */
  async generate(request: GenerationRequest): Promise<GenerationResult> {
    const startTime = Date.now();
    await this.initialize();

    this.logger.info('Generating Mermaid diagram', { prompt: request.prompt.substring(0, 100) });

    try {
      let dsl: string;
      let promptTokens = 0;
      let completionTokens = 0;

      // Check if the prompt is already Mermaid DSL
      if (this.isMermaidDSL(request.prompt)) {
        dsl = request.prompt;
        this.logger.debug('Using provided Mermaid DSL');
      } else if (request.existingDiagram && this.isMermaidDSL(request.existingDiagram)) {
        // Modification request with existing diagram
        dsl = await this.handleModification(request);
        promptTokens = this.estimateTokens(request.prompt);
        completionTokens = this.estimateTokens(dsl);
      } else {
        // Generate DSL from natural language
        dsl = await this.generateFromPrompt(request);
        promptTokens = this.estimateTokens(request.prompt);
        completionTokens = this.estimateTokens(dsl);
      }

      // Validate the DSL
      const validation = await this.validate(dsl);
      if (!validation.valid) {
        // Try to fix common issues
        const fixedDsl = this.attemptDslFix(dsl, validation.error ?? '');
        const revalidation = await this.validate(fixedDsl);

        if (!revalidation.valid) {
          throw new AIServiceError(
            `Invalid Mermaid DSL: ${validation.error}`,
            'VALIDATION_FAILED',
            { dsl, error: validation.error }
          );
        }
        dsl = fixedDsl;
        this.logger.warn('DSL auto-fixed', { originalError: validation.error });
      }

      // Render to SVG
      const svg = await this.renderToSvg(dsl);
      const generationTimeMs = Date.now() - startTime;

      const result: GenerationResult = {
        svg,
        backend: this.name,
        dsl,
        metadata: {
          generatedAt: new Date(),
          promptTokens,
          completionTokens,
          generationTimeMs,
          diagramType: this.detectMermaidType(dsl),
          confidence: 0.9,
        },
      };

      this.logger.info('Diagram generated successfully', {
        generationTimeMs,
        svgLength: svg.length,
      });

      return result;
    } catch (error) {
      this.logger.error('Generation failed', error as Error);
      throw error instanceof AIServiceError
        ? error
        : new AIServiceError(
            `Mermaid generation failed: ${(error as Error).message}`,
            'GENERATION_FAILED',
            { originalError: (error as Error).message }
          );
    }
  }

  /**
   * Validate Mermaid DSL
   */
  async validate(dsl: string): Promise<ValidationResult> {
    await this.initialize();

    try {
      await mermaid.parse(dsl.trim());
      return { valid: true };
    } catch (error) {
      const message = (error as Error).message ?? String(error);
      const lineMatch = message.match(/line\s+(\d+)/i);

      return {
        valid: false,
        error: this.formatValidationError(message),
        line: lineMatch ? parseInt(lineMatch[1], 10) : undefined,
        suggestions: this.getSuggestions(message, dsl),
      };
    }
  }

  /**
   * Check if content is Mermaid DSL
   */
  private isMermaidDSL(content: string): boolean {
    const trimmed = content.trim();
    return Object.values(MERMAID_TYPE_PATTERNS).some((pattern) => pattern.test(trimmed));
  }

  /**
   * Detect the Mermaid diagram type from DSL
   */
  private detectMermaidType(dsl: string): DiagramType {
    const trimmed = dsl.trim();

    if (MERMAID_TYPE_PATTERNS.flowchart.test(trimmed) || MERMAID_TYPE_PATTERNS.graph.test(trimmed)) {
      // Check for specific templates
      if (/consort|enrollment|randomiz/i.test(trimmed)) {
        return 'consort';
      }
      if (/prisma|screening|eligibility|identification/i.test(trimmed)) {
        return 'prisma';
      }
      if (/decision|algorithm|yes.*no|true.*false/i.test(trimmed)) {
        return 'decision-tree';
      }
      return 'flowchart';
    }

    if (MERMAID_TYPE_PATTERNS.sequence.test(trimmed)) {
      return 'sequence';
    }

    if (MERMAID_TYPE_PATTERNS.state.test(trimmed)) {
      return 'state-diagram';
    }

    return 'generic';
  }

  /**
   * Generate Mermaid DSL from natural language prompt
   * Uses LLM service when available, otherwise uses smart fallback parsing
   */
  private async generateFromPrompt(request: GenerationRequest): Promise<string> {
    const diagramType = this.inferDiagramType(request.prompt);
    this.logger.debug('Inferred diagram type', { diagramType });

    // Always try to parse the prompt - either with LLM or fallback regex
    try {
      this.logger.debug('Parsing prompt', { llmAvailable: llmService.isAvailable() });
      const complexity = (request.metadata as any)?.complexity as 'simple' | 'complex' | undefined;
      const llmResponse = await llmService.parsePrompt(request.prompt, diagramType, complexity);

      if (llmResponse.success && llmResponse.data) {
        const parsedData = llmResponse.data;
        this.logger.debug('Parsed data', { type: parsedData.type, hasData: !!parsedData });

        // Generate DSL based on parsed data (works for both LLM and fallback parsed data)
        // For fallback-parsed data, the data object IS the structured data (ConsortData, etc.)
        const dataToUse = parsedData.type && ['consort', 'prisma', 'forest-plot', 'pathway'].includes(parsedData.type)
          ? parsedData  // The parsedData itself is ConsortData/PrismaData/etc.
          : parsedData.data || parsedData;

        const dsl = await this.generateDSLFromParsedData(parsedData.type, dataToUse as Record<string, unknown>);
        if (dsl) {
          this.logger.info('Generated DSL from parsed data', { type: parsedData.type });
          return dsl;
        }
      }
    } catch (error) {
      this.logger.warn('Prompt parsing failed, falling back to template', { error: (error as Error).message });
    }

    // Fallback: Use template-based generation with improved data extraction
    const templateDsl = this.getTemplateForType(diagramType);
    if (templateDsl) {
      this.logger.debug('Using template with smart population', { diagramType });
      return this.populateTemplateWithContext(templateDsl, request.prompt, diagramType);
    }

    // Check for few-shot examples
    const examples = FEW_SHOT_EXAMPLES[diagramType];
    if (examples && examples.length > 0) {
      // Use the closest matching example as a starting point
      const bestExample = this.findBestExample(request.prompt, examples);
      if (bestExample) {
        this.logger.debug('Using few-shot example', { diagramType });
        return this.adaptExample(bestExample.output, request.prompt);
      }
    }

    // Generate basic flowchart from prompt
    return this.generateBasicFlowchart(request.prompt);
  }

  /**
   * Generate DSL from LLM-parsed data
   */
  private async generateDSLFromParsedData(type: string, data: Record<string, unknown>): Promise<string | null> {
    try {
      switch (type) {
        case 'consort':
          return this.generateConsortFromData(data as unknown as ConsortData);
        case 'prisma':
          return this.generatePrismaFromData(data as unknown as PrismaData);
        case 'forest-plot':
          return this.generateForestPlotFromData(data as unknown as ForestPlotData);
        case 'pathway':
          return this.generatePathwayFromData(data);
        default:
          // Try LLM-generated DSL
          return await llmService.generateMermaidDSL(type, data);
      }
    } catch (error) {
      this.logger.warn('Failed to generate DSL from parsed data', { error: (error as Error).message });
      return null;
    }
  }

  /**
   * Generate CONSORT DSL from structured data
   */
  private generateConsortFromData(data: ConsortData): string {
    const e = data.enrollment || { assessed: 500, excluded: 100, excludedReasons: [] };
    const r = data.randomization || { total: 400, arms: [] };
    const arms = r.arms?.length > 0 ? r.arms : [
      { name: 'Treatment', allocated: Math.floor((r.total || 400) / 2), received: Math.floor((r.total || 400) / 2) - 5, didNotReceive: 5 },
      { name: 'Control', allocated: Math.floor((r.total || 400) / 2), received: Math.floor((r.total || 400) / 2) - 2, didNotReceive: 2 }
    ];

    let dsl = `flowchart TB
    subgraph enrollment["Enrollment"]
        assessed["Assessed for eligibility<br/>(n=${e.assessed})"]
        excluded["Excluded (n=${e.excluded})`;

    if (e.excludedReasons?.length > 0) {
      e.excludedReasons.forEach(reason => {
        dsl += `<br/>${reason.reason}: ${reason.count}`;
      });
    }
    dsl += `"]
    end

    randomized["Randomized<br/>(n=${r.total})"]

    subgraph allocation["Allocation"]
`;

    arms.forEach((arm, i) => {
      dsl += `        arm${i}["Allocated to ${arm.name}<br/>(n=${arm.allocated})<br/>Received: ${arm.received}<br/>Did not receive: ${arm.didNotReceive}"]
`;
    });
    dsl += `    end

    subgraph followup["Follow-up"]
`;

    const fu = (data.followUp as Array<{ armName: string; lostToFollowUp: number; discontinued: number; reasons?: Array<{ reason: string; count: number }> }>) || [];
    arms.forEach((arm, i) => {
      const fuData = fu.find(f => f.armName === arm.name) || { lostToFollowUp: Math.floor(arm.allocated * 0.05), discontinued: Math.floor(arm.allocated * 0.03), reasons: undefined };
      dsl += `        fu${i}["${arm.name}<br/>Lost to follow-up: ${fuData.lostToFollowUp}`;
      if (fuData.reasons && fuData.reasons.length > 0) {
        fuData.reasons.forEach((r: { reason: string; count: number }) => {
          dsl += `<br/>  - ${r.reason}: ${r.count}`;
        });
      }
      dsl += `<br/>Discontinued: ${fuData.discontinued}"]
`;
    });
    dsl += `    end

    subgraph analysis["Analysis"]
`;

    const an = (data.analysis as Array<{ armName: string; analyzed: number; excluded: number; analysisType?: string }>) || [];
    arms.forEach((arm, i) => {
      const fuData = fu.find(f => f.armName === arm.name) || { lostToFollowUp: Math.floor(arm.allocated * 0.05), discontinued: Math.floor(arm.allocated * 0.03) };
      const anData = an.find(a => a.armName === arm.name) || {
        analyzed: arm.allocated - (fuData.lostToFollowUp + fuData.discontinued),
        excluded: fuData.lostToFollowUp + fuData.discontinued,
        analysisType: 'ITT'
      };
      dsl += `        an${i}["${arm.name} - ${anData.analysisType || 'ITT'}<br/>Analyzed (n=${anData.analyzed})<br/>Excluded (n=${anData.excluded})"]
`;
    });
    dsl += `    end

    assessed --> excluded
    assessed --> randomized
`;
    arms.forEach((_, i) => {
      dsl += `    randomized --> arm${i}
    arm${i} --> fu${i}
    fu${i} --> an${i}
`;
    });

    return dsl;
  }

  /**
   * Generate PRISMA DSL from structured data
   */
  private generatePrismaFromData(data: PrismaData): string {
    const id = data.identification || { totalRecords: 1000, duplicatesRemoved: 200, databases: [] };
    const sc = data.screening || { recordsScreened: 800, recordsExcluded: 600 };
    const el = data.eligibility || { fullTextAssessed: 200, fullTextExcluded: 150, exclusionReasons: [] };
    const inc = data.included || { studiesIncluded: 50 };

    let dsl = `flowchart TB
    subgraph identification["Identification"]
        records["Records identified<br/>(n=${id.totalRecords})`;

    if (id.databases?.length > 0) {
      id.databases.forEach(db => {
        dsl += `<br/>${db.name}: ${db.records}`;
      });
    }
    dsl += `"]
        duplicates["Duplicates removed<br/>(n=${id.duplicatesRemoved})"]
    end

    subgraph screening["Screening"]
        screened["Records screened<br/>(n=${sc.recordsScreened})"]
        excluded["Records excluded<br/>(n=${sc.recordsExcluded})"]
    end

    subgraph eligibility["Eligibility"]
        assessed["Full-text assessed<br/>(n=${el.fullTextAssessed})"]
        excludedFT["Full-text excluded (n=${el.fullTextExcluded})`;

    if (el.exclusionReasons?.length > 0) {
      el.exclusionReasons.forEach(r => {
        dsl += `<br/>${r.reason}: ${r.count}`;
      });
    }
    dsl += `"]
    end

    subgraph included["Included"]
        studies["Studies included<br/>(n=${inc.studiesIncluded})`;

    if (inc.studyTypes && inc.studyTypes.length > 0) {
      inc.studyTypes.forEach((t: { type: string; count: number }) => {
        dsl += `<br/>${t.type}: ${t.count}`;
      });
    }
    dsl += `"]
    end

    records --> duplicates
    duplicates --> screened
    screened --> excluded
    screened --> assessed
    assessed --> excludedFT
    assessed --> studies`;

    return dsl;
  }

  /**
   * Generate Forest Plot DSL from structured data
   */
  private generateForestPlotFromData(data: ForestPlotData): string {
    const studies = data.studies || [];
    const overall = data.overall || { effectSize: 0.85, ciLower: 0.7, ciUpper: 1.0 };
    const measure = data.measureType || 'OR';

    let dsl = `flowchart LR
    subgraph forestplot["Forest Plot - ${measure}"]
        direction TB
        header["Study | ${measure} (95% CI) | Weight"]
`;

    studies.forEach((study, i) => {
      const ci = `${study.effectSize.toFixed(2)} (${study.ciLower.toFixed(2)}-${study.ciUpper.toFixed(2)})`;
      dsl += `        s${i}["${study.name}${study.year ? ' ' + study.year : ''} | ${ci} | ${(study.weight || 0).toFixed(1)}%"]
`;
    });

    dsl += `        overall["Overall | ${overall.effectSize.toFixed(2)} (${overall.ciLower.toFixed(2)}-${overall.ciUpper.toFixed(2)}) | 100%"]
    end

    style header fill:#f0f0f0,stroke:#333
    style overall fill:#d0e0ff,stroke:#333,stroke-width:2px`;

    return dsl;
  }

  /**
   * Generate Pathway DSL from structured data
   */
  private generatePathwayFromData(data: Record<string, unknown>): string {
    const title = (data.title as string) || 'Signaling Pathway';
    const nodes = (data.nodes as Array<{ id: string; name: string; type: string }>) || [];
    const connections = (data.connections as Array<{ from: string; to: string; type: string }>) || [];

    let dsl = `flowchart TB
    subgraph pathway["${title}"]
`;

    nodes.forEach(node => {
      const shape = node.type === 'receptor' ? '([' : node.type === 'kinase' ? '{{' : '[';
      const shapeEnd = node.type === 'receptor' ? '])' : node.type === 'kinase' ? '}}' : ']';
      dsl += `        ${node.id}${shape}"${node.name}"${shapeEnd}
`;
    });

    dsl += `    end

`;

    connections.forEach(conn => {
      const arrow = conn.type === 'inhibits' ? '-.->|inhibits|' :
                    conn.type === 'activates' ? '-->|activates|' :
                    conn.type === 'phosphorylates' ? '==>|P|' : '-->';
      dsl += `    ${conn.from} ${arrow} ${conn.to}
`;
    });

    return dsl;
  }

  /**
   * Infer diagram type from prompt
   */
  private inferDiagramType(prompt: string): DiagramType {
    const normalizedPrompt = prompt.toLowerCase();

    if (/consort|randomized\s+trial|rct/i.test(normalizedPrompt)) {
      return 'consort';
    }
    if (/prisma|systematic\s+review/i.test(normalizedPrompt)) {
      return 'prisma';
    }
    if (/decision\s+tree|algorithm|diagnostic/i.test(normalizedPrompt)) {
      return 'decision-tree';
    }
    if (/state\s+(diagram|machine)|transition/i.test(normalizedPrompt)) {
      return 'state-diagram';
    }
    if (/sequence|journey|timeline/i.test(normalizedPrompt)) {
      return 'sequence';
    }

    return 'flowchart';
  }

  /**
   * Get a template DSL for a diagram type
   */
  private getTemplateForType(type: DiagramType): string | null {
    const templates: Partial<Record<DiagramType, string>> = {
      consort: this.getConsortTemplate(),
      prisma: this.getPrismaTemplate(),
      'decision-tree': this.getDecisionTreeTemplate(),
      'state-diagram': this.getStateDiagramTemplate(),
    };

    return templates[type] ?? null;
  }

  /**
   * CONSORT template
   */
  private getConsortTemplate(): string {
    return `flowchart TB
    subgraph enrollment["Enrollment"]
        assessed["Assessed for eligibility<br/>(n=N)"]
        excluded["Excluded (n=n)<br/>Not meeting criteria (n=n)<br/>Declined (n=n)<br/>Other (n=n)"]
    end

    randomized["Randomized<br/>(n=N)"]

    subgraph allocation["Allocation"]
        intervention["Allocated to intervention (n=n)<br/>Received intervention (n=n)<br/>Did not receive (n=n)"]
        control["Allocated to control (n=n)<br/>Received control (n=n)<br/>Did not receive (n=n)"]
    end

    subgraph followup["Follow-up"]
        fuIntervention["Lost to follow-up (n=n)<br/>Discontinued (n=n)"]
        fuControl["Lost to follow-up (n=n)<br/>Discontinued (n=n)"]
    end

    subgraph analysis["Analysis"]
        analysisIntervention["Analyzed (n=n)<br/>Excluded (n=n)"]
        analysisControl["Analyzed (n=n)<br/>Excluded (n=n)"]
    end

    assessed --> excluded
    assessed --> randomized
    randomized --> intervention
    randomized --> control
    intervention --> fuIntervention
    control --> fuControl
    fuIntervention --> analysisIntervention
    fuControl --> analysisControl`;
  }

  /**
   * PRISMA template
   */
  private getPrismaTemplate(): string {
    return `flowchart TB
    subgraph identification["Identification"]
        records["Records identified<br/>(n=N)"]
        duplicates["Duplicates removed<br/>(n=n)"]
    end

    subgraph screening["Screening"]
        screened["Records screened<br/>(n=n)"]
        excluded["Records excluded<br/>(n=n)"]
    end

    subgraph eligibility["Eligibility"]
        assessed["Full-text assessed<br/>(n=n)"]
        excludedFT["Excluded (n=n)<br/>Reason 1 (n=n)<br/>Reason 2 (n=n)"]
    end

    subgraph included["Included"]
        studies["Studies included<br/>(n=n)"]
    end

    records --> duplicates
    duplicates --> screened
    screened --> excluded
    screened --> assessed
    assessed --> excludedFT
    assessed --> studies`;
  }

  /**
   * Decision tree template
   */
  private getDecisionTreeTemplate(): string {
    return `flowchart TB
    start(["Start"])
    decision1{"Decision 1?"}
    decision2{"Decision 2?"}
    decision3{"Decision 3?"}
    outcome1(["Outcome 1"])
    outcome2(["Outcome 2"])
    outcome3(["Outcome 3"])
    outcome4(["Outcome 4"])

    start --> decision1
    decision1 -->|Yes| decision2
    decision1 -->|No| decision3
    decision2 -->|Yes| outcome1
    decision2 -->|No| outcome2
    decision3 -->|Yes| outcome3
    decision3 -->|No| outcome4`;
  }

  /**
   * State diagram template
   */
  private getStateDiagramTemplate(): string {
    return `stateDiagram-v2
    [*] --> Initial
    Initial --> State1: trigger1
    State1 --> State2: trigger2
    State2 --> State3: trigger3
    State2 --> State1: back
    State3 --> [*]: complete`;
  }

  /**
   * Populate a template with smart context-aware extraction
   */
  private populateTemplateWithContext(template: string, prompt: string, diagramType: string): string {
    // Use fallback parsing from LLM service to extract structured data
    const parseResult = llmService.fallbackParse(prompt, diagramType);

    if (parseResult.success && parseResult.data) {
      // Try to generate DSL from the parsed data instead of blind replacement
      const data = parseResult.data.data as Record<string, unknown>;
      const numbers = (data.extractedNumbers as number[]) || [];

      if (diagramType === 'consort' && numbers.length >= 4) {
        // For CONSORT, use smart number assignment
        const consortData: ConsortData = {
          enrollment: {
            assessed: numbers[0] || 500,
            excluded: numbers[1] || 100,
            excludedReasons: []
          },
          randomization: {
            total: numbers[2] || numbers[0] - numbers[1],
            arms: [
              { name: 'Treatment', allocated: Math.floor((numbers[2] || 400) / 2), received: Math.floor((numbers[2] || 400) / 2), didNotReceive: 0 },
              { name: 'Control', allocated: Math.ceil((numbers[2] || 400) / 2), received: Math.ceil((numbers[2] || 400) / 2), didNotReceive: 0 }
            ]
          },
          followUp: [],
          analysis: []
        };

        // Try to extract more detail from prompt
        const screenedMatch = prompt.match(/screened?\s*[:\s]?\s*(\d[\d,]*)/i);
        const excludedMatch = prompt.match(/excluded?\s*[:\s]?\s*(\d[\d,]*)/i);
        const randomizedMatch = prompt.match(/randomized?\s*[:\s]?\s*(\d[\d,]*)/i);

        if (screenedMatch) consortData.enrollment.assessed = parseInt(screenedMatch[1].replace(/,/g, ''));
        if (excludedMatch) consortData.enrollment.excluded = parseInt(excludedMatch[1].replace(/,/g, ''));
        if (randomizedMatch) consortData.randomization.total = parseInt(randomizedMatch[1].replace(/,/g, ''));

        // Extract arm names and numbers
        const armMatches = prompt.matchAll(/(?:arm|group|allocated\s+to)\s+([A-Za-z]+)\s*[:\s(n=]*\s*(\d+)/gi);
        const arms: Array<{ name: string; allocated: number; received: number; didNotReceive: number }> = [];
        for (const match of armMatches) {
          arms.push({
            name: match[1],
            allocated: parseInt(match[2]),
            received: parseInt(match[2]),
            didNotReceive: 0
          });
        }
        if (arms.length >= 2) {
          consortData.randomization.arms = arms;
        }

        return this.generateConsortFromData(consortData);
      }

      if (diagramType === 'prisma' && numbers.length >= 3) {
        const prismaData: PrismaData = {
          identification: {
            totalRecords: numbers[0] || 1000,
            duplicatesRemoved: numbers.length > 3 ? numbers[1] : Math.floor(numbers[0] * 0.3),
            databases: []
          },
          screening: {
            recordsScreened: numbers.length > 4 ? numbers[2] : numbers[0] - (numbers.length > 3 ? numbers[1] : Math.floor(numbers[0] * 0.3)),
            recordsExcluded: numbers.length > 5 ? numbers[3] : Math.floor(numbers[0] * 0.6)
          },
          eligibility: {
            fullTextAssessed: numbers.length > 6 ? numbers[4] : Math.floor(numbers[0] * 0.1),
            fullTextExcluded: numbers.length > 7 ? numbers[5] : Math.floor(numbers[0] * 0.05),
            exclusionReasons: []
          },
          included: {
            studiesIncluded: numbers[numbers.length - 1] || 50
          }
        };

        // Extract database info
        const dbMatches = prompt.matchAll(/(?:pubmed|embase|cochrane|medline|web\s*of\s*science|scopus|cinahl)\s*[:\s(n=]*\s*(\d[\d,]*)/gi);
        for (const match of dbMatches) {
          prismaData.identification.databases.push({
            name: match[0].split(/[\s:(]/)[0],
            records: parseInt(match[1].replace(/,/g, ''))
          });
        }

        return this.generatePrismaFromData(prismaData);
      }
    }

    // Fallback: Simple number replacement
    let result = template;
    const numbers = prompt.match(/\d[\d,]*/g)?.map(n => parseInt(n.replace(/,/g, ''))) ?? [];

    if (numbers.length > 0) {
      let numIndex = 0;
      result = result.replace(/n=N|n=n/g, () => {
        const value = numbers[numIndex] ?? '...';
        numIndex = (numIndex + 1) % numbers.length;
        return `n=${value}`;
      });
    }

    return result;
  }

  /**
   * Find the best matching few-shot example
   */
  private findBestExample(
    prompt: string,
    examples: Array<{ prompt: string; output: string }>
  ): { prompt: string; output: string } | null {
    const normalizedPrompt = prompt.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;

    for (const example of examples) {
      const exampleWords = example.prompt.toLowerCase().split(/\s+/);
      let score = 0;

      for (const word of exampleWords) {
        if (normalizedPrompt.includes(word) && word.length > 3) {
          score++;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = example;
      }
    }

    return bestScore >= 2 ? bestMatch : null;
  }

  /**
   * Adapt an example to the user's prompt
   */
  private adaptExample(example: string, prompt: string): string {
    // Add a comment noting the source
    return `${example}

    %% Adapted from example
    %% Customize this diagram for: ${prompt.substring(0, 50)}...`;
  }

  /**
   * Generate a basic flowchart from natural language
   */
  private generateBasicFlowchart(prompt: string): string {
    // Extract capitalized words as potential nodes
    const words = prompt.split(/\s+/);
    const potentialNodes = words.filter(
      (w) =>
        w.length > 2 &&
        /^[A-Z]/.test(w) &&
        !['The', 'And', 'For', 'With', 'From', 'Into', 'Then', 'After'].includes(w)
    );

    if (potentialNodes.length < 2) {
      // Return a basic template
      return `flowchart TB
    A["Start"] --> B["Process"]
    B --> C["End"]

    %% Generated from: ${prompt.substring(0, 50)}...
    %% Please customize this diagram`;
    }

    // Build flowchart from nodes
    let dsl = 'flowchart TB\n';
    const nodeIds: string[] = [];

    for (let i = 0; i < Math.min(potentialNodes.length, 10); i++) {
      const id = String.fromCharCode(65 + i); // A, B, C, ...
      const label = potentialNodes[i];
      dsl += `    ${id}["${label}"]\n`;
      nodeIds.push(id);
    }

    dsl += '\n';

    // Connect nodes sequentially
    for (let i = 0; i < nodeIds.length - 1; i++) {
      dsl += `    ${nodeIds[i]} --> ${nodeIds[i + 1]}\n`;
    }

    dsl += `\n    %% Auto-generated from: ${prompt.substring(0, 50)}...\n`;
    dsl += '    %% Please refine this diagram';

    return dsl;
  }

  /**
   * Handle modification of existing diagram
   */
  private async handleModification(request: GenerationRequest): Promise<string> {
    const existingDsl = request.existingDiagram ?? '';
    const modification = request.prompt.toLowerCase();

    // Simple modification handlers
    if (/add\s+(a\s+)?node/i.test(modification)) {
      return this.addNodeToDsl(existingDsl, modification);
    }

    if (/remove\s+(a\s+)?node/i.test(modification)) {
      return this.removeNodeFromDsl(existingDsl, modification);
    }

    if (/change\s+(the\s+)?color/i.test(modification)) {
      return this.changeColorInDsl(existingDsl, modification);
    }

    // Default: return existing with comment about requested change
    return `${existingDsl}

    %% Requested modification: ${modification}
    %% Please apply this change manually`;
  }

  /**
   * Add a node to existing DSL
   */
  private addNodeToDsl(dsl: string, instruction: string): string {
    // Extract potential node name from instruction
    const nameMatch = instruction.match(/(?:called|named|labeled)\s+["']?(\w+)["']?/i);
    const newNodeName = nameMatch ? nameMatch[1] : 'NewNode';
    const newNodeId = `node${Date.now() % 1000}`;

    // Add the new node at the end
    return `${dsl}
    ${newNodeId}["${newNodeName}"]

    %% New node added. Connect it to existing nodes as needed.`;
  }

  /**
   * Remove a node from existing DSL
   */
  private removeNodeFromDsl(dsl: string, instruction: string): string {
    const nameMatch = instruction.match(/(?:called|named|labeled)\s+["']?(\w+)["']?/i);
    if (!nameMatch) {
      return dsl + '\n    %% Could not identify node to remove';
    }

    const nodeName = nameMatch[1];
    // Comment out lines containing the node
    const lines = dsl.split('\n');
    const modifiedLines = lines.map((line) => {
      if (line.includes(`"${nodeName}"`) || new RegExp(`\\b${nodeName}\\b`).test(line)) {
        return `%% REMOVED: ${line}`;
      }
      return line;
    });

    return modifiedLines.join('\n');
  }

  /**
   * Change colors in DSL
   */
  private changeColorInDsl(dsl: string, instruction: string): string {
    // Extract color if mentioned
    const colorMatch = instruction.match(
      /(red|blue|green|yellow|orange|purple|pink|gray|grey|black|white|#[0-9a-fA-F]{6})/i
    );
    const color = colorMatch ? colorMatch[1].toLowerCase() : '#2563eb';

    // Check if classDef already exists
    if (dsl.includes('classDef')) {
      // Modify existing classDef
      return dsl.replace(/fill:#[0-9a-fA-F]{6}/g, `fill:${color}`);
    }

    // Add new classDef
    return `${dsl}

    classDef customStyle fill:${color},stroke:#333,color:#fff
    %% Apply to nodes: class nodeId customStyle`;
  }

  /**
   * Render Mermaid DSL to SVG
   */
  private async renderToSvg(dsl: string): Promise<string> {
    const id = `mermaid-${++this.renderCounter}`;

    try {
      const { svg } = await mermaid.render(id, dsl.trim());
      return this.postProcessSvg(svg);
    } catch (error) {
      this.logger.error('Render failed', error as Error);
      throw new AIServiceError(
        `Mermaid render failed: ${(error as Error).message}`,
        'RENDER_FAILED'
      );
    }
  }

  /**
   * Post-process SVG for better compatibility
   */
  private postProcessSvg(svg: string): string {
    let processed = svg;

    // Remove background rect if present
    processed = processed.replace(
      /<rect[^>]*class="[^"]*background[^"]*"[^>]*><\/rect>/gi,
      ''
    );

    // Ensure viewBox is present
    if (!processed.includes('viewBox')) {
      const widthMatch = processed.match(/width="([^"]+)"/);
      const heightMatch = processed.match(/height="([^"]+)"/);

      if (widthMatch && heightMatch) {
        const width = parseFloat(widthMatch[1]);
        const height = parseFloat(heightMatch[1]);
        processed = processed.replace(/<svg/, `<svg viewBox="0 0 ${width} ${height}"`);
      }
    }

    // Clean up max-width
    processed = processed.replace(/max-width:\s*[^;]+;?/gi, '');

    // Add stroke styling
    processed = processed.replace(
      /<svg/,
      '<svg stroke-linecap="round" stroke-linejoin="round"'
    );

    // Add XML declaration if missing
    if (!processed.startsWith('<?xml')) {
      processed = '<?xml version="1.0" encoding="UTF-8"?>\n' + processed;
    }

    return processed;
  }

  /**
   * Format validation error for display
   */
  private formatValidationError(message: string): string {
    return message
      .replace(/Syntax error in text/i, 'Syntax error')
      .replace(/mermaid version .+?$/m, '')
      .trim();
  }

  /**
   * Get suggestions for fixing DSL errors
   */
  private getSuggestions(error: string, _dsl: string): string[] {
    const suggestions: string[] = [];

    if (error.includes('arrow')) {
      suggestions.push('Check arrow syntax. Use --> for solid arrows, -.-> for dashed.');
    }

    if (error.includes('quote') || error.includes('string')) {
      suggestions.push('Ensure all labels are properly quoted with double quotes.');
    }

    if (error.includes('subgraph')) {
      suggestions.push('Subgraph syntax: subgraph name["Title"]');
    }

    if (error.includes('flowchart') || error.includes('graph')) {
      suggestions.push('Start with: flowchart TB (or LR, BT, RL)');
    }

    if (suggestions.length === 0) {
      suggestions.push('Check Mermaid syntax at https://mermaid.js.org/');
    }

    return suggestions;
  }

  /**
   * Attempt to fix common DSL issues
   */
  private attemptDslFix(dsl: string, _error: string): string {
    let fixed = dsl;

    // Fix missing flowchart declaration
    if (!fixed.trim().match(/^(flowchart|graph|sequenceDiagram|stateDiagram)/i)) {
      fixed = 'flowchart TB\n' + fixed;
    }

    // Fix unquoted labels with special characters
    fixed = fixed.replace(/\[([^\]"]+)\]/g, (match, label) => {
      if (/[<>\/\(\):]/.test(label) && !label.startsWith('"')) {
        return `["${label}"]`;
      }
      return match;
    });

    // Fix broken arrows
    fixed = fixed.replace(/--+>/g, '-->');
    fixed = fixed.replace(/-\.+>/g, '-.->');

    return fixed;
  }

  /**
   * Estimate token count (simple approximation)
   */
  private estimateTokens(text: string): number {
    // Rough estimate: ~4 characters per token
    return Math.ceil(text.length / 4);
  }
}

// Export singleton instance
export const mermaidBackend = new MermaidBackend();
export default mermaidBackend;
