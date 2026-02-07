/**
 * DiagramGenerator.ts
 * Main diagram generation orchestrator
 *
 * This is the core AI service that converts natural language prompts into diagrams.
 * It analyzes prompts, routes to appropriate backends, and manages the generation lifecycle.
 */

import { PromptParser } from './PromptParser';
import { MermaidBackend } from './backends/MermaidBackend';
import { SVGBackend } from './backends/SVGBackend';
import { ImageBackend } from './backends/ImageBackend';
import { ContextBuilder } from './ContextBuilder';
import { ConversationManager } from './ConversationManager';
import type {
  AIBackend,
  GenerationRequest,
  GenerationResult,
  ParsedPrompt,
  DiagramType,
  DiagramDomain,
  Logger,
  LLMProvider,
} from './types';
import { createLogger, AIServiceError } from './types';
import type { SpecialtyContext } from './types';
import { llmService } from './LLMService';
import { getSpecialtyContext } from './prompts';
import type { ConversationContext } from './ConversationManager';

// =============================================================================
// TYPES
// =============================================================================

/**
 * Options for diagram generation
 */
export interface GenerateOptions {
  /** Preferred backend override */
  preferredBackend?: 'mermaid' | 'svg' | 'plotly' | 'tikz' | 'image';
  /** Domain context for specialized prompts */
  domain?: DiagramDomain;
  /** Whether to use conversation context */
  useConversationContext?: boolean;
  /** Conversation ID for multi-turn generation */
  conversationId?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
  /** Base64-encoded image for vision-based generation (sketch/photo upload) */
  imageData?: string;
  /** MIME type of the uploaded image */
  imageMimeType?: string;
}

/**
 * Options for diagram refinement
 */
export interface RefineOptions {
  /** Conversation context to use */
  conversationId?: string;
  /** Preserve specific elements during refinement */
  preserveElements?: string[];
  /** Refinement mode */
  mode?: 'modify' | 'enhance' | 'simplify' | 'restyle';
}

/**
 * Extended generation result with additional context
 */
export interface ExtendedGenerationResult extends GenerationResult {
  /** Parsed prompt information */
  parsedPrompt?: ParsedPrompt;
  /** Conversation ID for tracking */
  conversationId?: string;
  /** Suggested follow-up actions */
  suggestions?: string[];
}

// =============================================================================
// DIAGRAM GENERATOR CLASS
// =============================================================================

/**
 * DiagramGenerator orchestrates the conversion of natural language prompts
 * into diagram visualizations using various backends.
 */
export class DiagramGenerator {
  private readonly parser: PromptParser;
  private readonly contextBuilder: ContextBuilder;
  private readonly conversationManager: ConversationManager;
  private readonly backends: Map<string, AIBackend>;
  private readonly logger: Logger;
  private initialized = false;

  constructor(logger?: Logger) {
    this.logger = logger ?? createLogger('DiagramGenerator');
    this.parser = new PromptParser();
    this.contextBuilder = new ContextBuilder();
    this.conversationManager = new ConversationManager();
    this.backends = new Map<string, AIBackend>([
      ['mermaid', new MermaidBackend()],
      ['svg', new SVGBackend()],
      ['image', new ImageBackend()],
    ]);
  }

  /**
   * Initialize all backends
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    this.logger.debug('Initializing DiagramGenerator');

    // Initialize backends that require it
    for (const [name, backend] of this.backends) {
      if ('initialize' in backend && typeof backend.initialize === 'function') {
        try {
          await backend.initialize();
          this.logger.debug(`Backend initialized: ${name}`);
        } catch (error) {
          this.logger.warn(`Failed to initialize backend: ${name}`, {
            error: (error as Error).message,
          });
        }
      }
    }

    this.initialized = true;
    this.logger.info('DiagramGenerator initialized');
  }

  /**
   * Generate a diagram from a natural language prompt
   *
   * @param prompt - Natural language description of the desired diagram
   * @param options - Generation options
   * @returns Promise resolving to the generation result
   */
  async generate(
    prompt: string,
    options: GenerateOptions = {}
  ): Promise<ExtendedGenerationResult> {
    await this.initialize();

    const startTime = Date.now();
    this.logger.info('Starting diagram generation', {
      promptLength: prompt.length,
      options,
    });

    try {
      // Validate prompt
      if (!prompt || prompt.trim().length === 0) {
        throw new AIServiceError(
          'Prompt cannot be empty',
          'INVALID_PROMPT'
        );
      }

      // Vision-based generation: convert uploaded image to Mermaid DSL first
      if (options.imageData && options.imageMimeType) {
        this.logger.info('Image uploaded, using vision-based generation');

        const dsl = await llmService.generateMermaidDSLFromImage(
          options.imageData,
          options.imageMimeType,
          prompt
        );

        if (dsl) {
          const mermaidBackend = this.backends.get('mermaid');
          if (mermaidBackend) {
            const result = await mermaidBackend.generate({ prompt: dsl });

            // Record in conversation history
            const conversationId = this.conversationManager.addTurn(
              prompt || 'Image upload',
              result,
              options.conversationId
            );

            return {
              ...result,
              conversationId,
              suggestions: [
                'Refine the layout',
                'Add more detail',
                'Change color scheme',
                'Adjust labels',
              ],
              metadata: {
                ...result.metadata,
                generationTimeMs: Date.now() - startTime,
                provider: llmService.isClaudeAvailable() ? 'anthropic' : 'openai',
              },
            };
          }
        }

        // Vision failed - fall through to text-based generation
        this.logger.warn('Vision-based generation failed, falling through to text pipeline');
      }

      // Check for multi-panel figure
      const multiPanel = this.parser.detectMultiPanel(prompt);
      if (multiPanel && multiPanel.panels.length >= 2) {
        this.logger.info('Multi-panel figure detected', {
          panelCount: multiPanel.panels.length,
          layout: multiPanel.layout,
        });
        return this.generateMultiPanel(multiPanel.panels, multiPanel.layout ?? '2x2', options, startTime);
      }

      // Get conversation context if available
      const conversationContext = options.useConversationContext
        ? this.conversationManager.getContext(options.conversationId)
        : undefined;

      // Parse the prompt to determine intent
      const parsedPrompt = this.parser.parse(
        prompt,
        conversationContext?.summary
      );

      // Look up specialty context if a specialty was detected
      const specialtyCtx: SpecialtyContext | undefined = parsedPrompt.specialty
        ? getSpecialtyContext(parsedPrompt.specialty)
        : undefined;

      this.logger.debug('Prompt parsed', {
        diagramType: parsedPrompt.diagramType,
        domain: parsedPrompt.domain,
        confidence: parsedPrompt.confidence,
        isModification: parsedPrompt.isModification,
        template: parsedPrompt.template,
        specialty: parsedPrompt.specialty ?? 'none',
      });

      // Template-first routing: skip AI call for known template types
      if (parsedPrompt.template && parsedPrompt.confidence > 0.85) {
        this.logger.info('Template match detected, using direct generation', {
          template: parsedPrompt.template,
          confidence: parsedPrompt.confidence,
        });

        try {
          const templateResult = await this.generateFromTemplateMatch(
            prompt,
            parsedPrompt,
            startTime,
            options.conversationId
          );
          if (templateResult) {
            return templateResult;
          }
        } catch (error) {
          this.logger.warn('Template generation failed, falling through to AI', {
            error: (error as Error).message,
          });
        }
      }

      // Classify complexity for smart model routing
      const complexity = this.parser.classifyComplexity(parsedPrompt, prompt);
      this.logger.debug('Prompt complexity classified', { complexity });

      // Select the best backend
      const backendName = this.selectBackend(parsedPrompt, options);
      const backend = this.backends.get(backendName);

      if (!backend) {
        throw new AIServiceError(
          `Backend not available: ${backendName}`,
          'BACKEND_UNAVAILABLE'
        );
      }

      this.logger.debug(`Selected backend: ${backendName}`);

      // Build the generation request (with complexity for smart routing)
      const request = this.buildRequest(
        prompt,
        parsedPrompt,
        options,
        conversationContext,
        specialtyCtx,
        complexity
      );

      // Generate the diagram
      const result = await backend.generate(request);

      // Record in conversation history
      const conversationId = this.conversationManager.addTurn(
        prompt,
        result,
        options.conversationId
      );

      // Determine which provider was actually used
      const provider: LLMProvider = llmService.isClaudeAvailable()
        ? 'anthropic'
        : llmService.isAvailable()
          ? 'openai'
          : 'fallback';

      // Build extended result
      const extendedResult: ExtendedGenerationResult = {
        ...result,
        parsedPrompt,
        conversationId,
        suggestions: this.generateSuggestions(parsedPrompt, result),
        metadata: {
          ...result.metadata,
          generationTimeMs: Date.now() - startTime,
          provider,
          fallbackUsed: provider !== 'anthropic' && llmService.isClaudeAvailable(),
        },
      };

      this.logger.info('Diagram generated successfully', {
        backend: result.backend,
        diagramType: parsedPrompt.diagramType,
        generationTimeMs: extendedResult.metadata.generationTimeMs,
        svgLength: result.svg.length,
      });

      return extendedResult;
    } catch (error) {
      this.logger.error('Generation failed', error as Error, {
        prompt: prompt.substring(0, 100),
      });

      if (error instanceof AIServiceError) {
        throw error;
      }

      throw new AIServiceError(
        `Diagram generation failed: ${(error as Error).message}`,
        'GENERATION_FAILED',
        { originalError: (error as Error).message }
      );
    }
  }

  /**
   * Refine an existing diagram based on a follow-up prompt
   *
   * @param existingSvg - The existing SVG content to refine
   * @param refinementPrompt - Natural language description of desired changes
   * @param options - Refinement options
   * @returns Promise resolving to the refined generation result
   */
  async refine(
    existingSvg: string,
    refinementPrompt: string,
    options: RefineOptions = {}
  ): Promise<ExtendedGenerationResult> {
    await this.initialize();

    const startTime = Date.now();
    this.logger.info('Starting diagram refinement', {
      promptLength: refinementPrompt.length,
      svgLength: existingSvg.length,
      mode: options.mode ?? 'modify',
    });

    try {
      // Validate inputs
      if (!existingSvg || existingSvg.trim().length === 0) {
        throw new AIServiceError(
          'Existing SVG cannot be empty',
          'INVALID_PROMPT'
        );
      }

      if (!refinementPrompt || refinementPrompt.trim().length === 0) {
        throw new AIServiceError(
          'Refinement prompt cannot be empty',
          'INVALID_PROMPT'
        );
      }

      // Get conversation context
      const conversationContext = this.conversationManager.getContext(
        options.conversationId
      );

      // Build refinement context
      const refinementContext = this.contextBuilder.buildRefinementPrompt(
        refinementPrompt,
        existingSvg,
        conversationContext,
        options
      );

      // Parse the refinement prompt
      const parsedPrompt = this.parser.parse(refinementPrompt, existingSvg);

      // Determine the backend based on the existing SVG
      const backendName = this.detectBackendFromSvg(existingSvg, parsedPrompt);
      const backend = this.backends.get(backendName);

      if (!backend) {
        throw new AIServiceError(
          `Backend not available: ${backendName}`,
          'BACKEND_UNAVAILABLE'
        );
      }

      // Build the refinement request
      const request: GenerationRequest = {
        prompt: refinementContext,
        existingDiagram: existingSvg,
        context: conversationContext?.summary,
        conversationId: options.conversationId,
        metadata: {
          isModification: true,
          style: conversationContext?.style,
        },
      };

      // Generate the refined diagram
      const result = await backend.generate(request);

      // Record in conversation history
      const conversationId = this.conversationManager.addTurn(
        refinementPrompt,
        result,
        options.conversationId
      );

      // Build extended result
      const extendedResult: ExtendedGenerationResult = {
        ...result,
        parsedPrompt,
        conversationId,
        suggestions: this.generateRefinementSuggestions(result, options.mode),
        metadata: {
          ...result.metadata,
          generationTimeMs: Date.now() - startTime,
          version: (conversationContext?.version ?? 0) + 1,
        },
      };

      this.logger.info('Diagram refined successfully', {
        backend: result.backend,
        generationTimeMs: extendedResult.metadata.generationTimeMs,
        version: extendedResult.metadata.version,
      });

      return extendedResult;
    } catch (error) {
      this.logger.error('Refinement failed', error as Error);

      if (error instanceof AIServiceError) {
        throw error;
      }

      throw new AIServiceError(
        `Diagram refinement failed: ${(error as Error).message}`,
        'GENERATION_FAILED',
        { originalError: (error as Error).message }
      );
    }
  }

  /**
   * Generate a diagram from a specific template
   *
   * @param templateType - The template type (consort, prisma, etc.)
   * @param data - Data to populate the template
   * @returns Promise resolving to the generation result
   */
  async generateFromTemplate(
    templateType: DiagramType,
    data?: Record<string, unknown>
  ): Promise<ExtendedGenerationResult> {
    const templatePrompt = this.buildTemplatePrompt(templateType, data);
    return this.generate(templatePrompt, {
      preferredBackend: 'mermaid',
      domain: this.getDomainForTemplate(templateType),
    });
  }

  /**
   * Validate a diagram without rendering
   *
   * @param content - The diagram content to validate
   * @param backend - The backend to use for validation
   * @returns Validation result
   */
  async validate(
    content: string,
    backend: 'mermaid' | 'svg' = 'mermaid'
  ): Promise<{ valid: boolean; error?: string; suggestions?: string[] }> {
    const backendInstance = this.backends.get(backend);

    if (!backendInstance?.validate) {
      return { valid: true }; // Skip validation if not supported
    }

    return backendInstance.validate(content);
  }

  /**
   * Get available backends
   */
  getAvailableBackends(): string[] {
    return Array.from(this.backends.keys());
  }

  /**
   * Get conversation history
   */
  getConversationHistory(conversationId?: string): ConversationContext | null {
    return this.conversationManager.getContext(conversationId);
  }

  /**
   * Clear conversation history
   */
  clearConversation(conversationId?: string): void {
    this.conversationManager.clear(conversationId);
    this.logger.debug('Conversation cleared', { conversationId });
  }

  /**
   * Get the last generated diagram
   */
  getLastDiagram(conversationId?: string): string | null {
    return this.conversationManager.getLastDiagram(conversationId);
  }

  // ==========================================================================
  // PRIVATE METHODS
  // ==========================================================================

  /**
   * Generate diagram directly from template match using regex parsing + MermaidBackend generators.
   * No AI API call is made.
   */
  private async generateFromTemplateMatch(
    prompt: string,
    parsedPrompt: ParsedPrompt,
    startTime: number,
    conversationId?: string
  ): Promise<ExtendedGenerationResult | null> {
    const templateType = parsedPrompt.template!;

    // Use LLMService.fallbackParse (regex-based) to extract structured data
    const parseResult = llmService.fallbackParse(prompt, templateType);
    if (!parseResult.success || !parseResult.data) {
      return null;
    }

    // Route to MermaidBackend template generators via DSL generation
    const mermaidBackend = this.backends.get('mermaid');
    if (!mermaidBackend) {
      return null;
    }

    // Generate the DSL as a prompt and let MermaidBackend handle it
    const dsl = await llmService.generateMermaidDSL(
      templateType,
      parseResult.data.data as Record<string, unknown>
    );

    if (!dsl) {
      return null;
    }

    // Generate by passing DSL directly to MermaidBackend
    const result = await mermaidBackend.generate({
      prompt: dsl,
      metadata: { domain: parsedPrompt.domain },
    });

    // Record in conversation history
    const convId = this.conversationManager.addTurn(
      prompt,
      result,
      conversationId
    );

    return {
      ...result,
      parsedPrompt,
      conversationId: convId,
      suggestions: this.generateSuggestions(parsedPrompt, result),
      metadata: {
        ...result.metadata,
        generationTimeMs: Date.now() - startTime,
        templateMatched: true,
        provider: 'fallback' as LLMProvider,
      },
    };
  }

  /**
   * Select the best backend for the given prompt
   */
  private selectBackend(
    parsedPrompt: ParsedPrompt,
    options: GenerateOptions
  ): string {
    // User-specified preference takes priority
    if (options.preferredBackend) {
      if (this.backends.has(options.preferredBackend)) {
        return options.preferredBackend;
      }
      this.logger.warn(
        `Preferred backend not available: ${options.preferredBackend}, falling back`
      );
    }

    // Use parser's suggestion based on diagram type
    const suggested = this.parser.suggestBackend(parsedPrompt);

    // Check if suggested backend is available
    if (this.backends.has(suggested)) {
      return suggested;
    }

    // Fall back to Mermaid for most cases
    if (this.backends.has('mermaid')) {
      return 'mermaid';
    }

    // Last resort: first available backend
    const firstAvailable = this.backends.keys().next().value;
    if (!firstAvailable) {
      throw new AIServiceError(
        'No backends available',
        'BACKEND_UNAVAILABLE'
      );
    }

    return firstAvailable;
  }

  /**
   * Build a generation request from parsed prompt
   */
  private buildRequest(
    prompt: string,
    parsedPrompt: ParsedPrompt,
    options: GenerateOptions,
    context?: ConversationContext | null,
    specialtyContext?: SpecialtyContext,
    complexity?: 'simple' | 'complex'
  ): GenerationRequest {
    // Build enhanced prompt with context
    const enhancedPrompt = this.contextBuilder.buildGenerationPrompt(
      prompt,
      context ?? undefined,
      {
        diagramType: parsedPrompt.diagramType,
        domain: options.domain ?? parsedPrompt.domain,
        entities: parsedPrompt.entities,
        specialtyContext,
      }
    );

    return {
      prompt: enhancedPrompt,
      context: context?.summary,
      preferredBackend: options.preferredBackend,
      conversationId: options.conversationId,
      metadata: {
        domain: options.domain ?? parsedPrompt.domain,
        isModification: parsedPrompt.isModification,
        specialty: specialtyContext?.specialty,
        complexity,
      } as any,
    };
  }

  /**
   * Detect which backend was used to create the SVG
   */
  private detectBackendFromSvg(
    svg: string,
    parsedPrompt: ParsedPrompt
  ): string {
    // Check for Mermaid markers
    if (
      svg.includes('mermaid') ||
      svg.includes('flowchart') ||
      svg.includes('class="node')
    ) {
      return 'mermaid';
    }

    // Use parser suggestion for refinement
    return this.parser.suggestBackend(parsedPrompt);
  }

  /**
   * Generate follow-up suggestions based on the result
   */
  private generateSuggestions(
    parsedPrompt: ParsedPrompt,
    _result: GenerationResult
  ): string[] {
    const suggestions: string[] = [];

    // Suggest refinements based on diagram type
    switch (parsedPrompt.diagramType) {
      case 'flowchart':
        suggestions.push('Add more decision points');
        suggestions.push('Include error handling paths');
        suggestions.push('Add swimlanes for different actors');
        break;

      case 'consort':
        suggestions.push('Update sample sizes');
        suggestions.push('Add subgroup analysis');
        suggestions.push('Include per-protocol population');
        break;

      case 'prisma':
        suggestions.push('Add more database sources');
        suggestions.push('Detail exclusion criteria');
        suggestions.push('Include grey literature search');
        break;

      case 'sequence':
        suggestions.push('Add more participants');
        suggestions.push('Include alternative flows');
        suggestions.push('Add timing annotations');
        break;

      case 'pathway':
        suggestions.push('Add inhibitory pathways');
        suggestions.push('Include feedback loops');
        suggestions.push('Add cellular compartments');
        break;

      default:
        suggestions.push('Refine node labels');
        suggestions.push('Adjust layout orientation');
        suggestions.push('Add color coding');
    }

    // Add low confidence suggestion
    if (parsedPrompt.confidence < 0.7) {
      suggestions.unshift(
        'Clarify diagram type for better results'
      );
    }

    // Add alternative suggestions
    if (parsedPrompt.alternatives.length > 0) {
      const alt = parsedPrompt.alternatives[0];
      suggestions.push(
        `Try generating as ${alt.diagramType} instead`
      );
    }

    return suggestions.slice(0, 5);
  }

  /**
   * Generate suggestions specific to refinement
   */
  private generateRefinementSuggestions(
    result: GenerationResult,
    mode?: string
  ): string[] {
    const suggestions: string[] = [];

    switch (mode) {
      case 'simplify':
        suggestions.push('Remove additional elements');
        suggestions.push('Merge similar nodes');
        break;

      case 'enhance':
        suggestions.push('Add more detail');
        suggestions.push('Include annotations');
        break;

      case 'restyle':
        suggestions.push('Try a different color scheme');
        suggestions.push('Adjust font sizes');
        break;

      default:
        suggestions.push('Continue refining');
        suggestions.push('Undo last change');
        suggestions.push('Export current version');
    }

    if (result.warnings && result.warnings.length > 0) {
      suggestions.unshift('Address warnings in the diagram');
    }

    return suggestions.slice(0, 4);
  }

  /**
   * Build a prompt for template-based generation
   */
  private buildTemplatePrompt(
    templateType: DiagramType,
    data?: Record<string, unknown>
  ): string {
    const templateDescriptions: Partial<Record<DiagramType, string>> = {
      consort: 'Create a CONSORT flow diagram for a randomized controlled trial',
      prisma: 'Create a PRISMA flow diagram for a systematic review',
      'decision-tree': 'Create a clinical decision tree algorithm',
      'state-diagram': 'Create a state transition diagram',
      flowchart: 'Create a process flowchart',
      sequence: 'Create a sequence diagram',
      'forest-plot': 'Create a forest plot for meta-analysis',
      'kaplan-meier': 'Create a Kaplan-Meier survival curve',
      pathway: 'Create a signaling pathway diagram',
    };

    let prompt = templateDescriptions[templateType] ?? `Create a ${templateType} diagram`;

    // Add data context if provided
    if (data) {
      const dataContext = Object.entries(data)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      prompt += ` with the following data: ${dataContext}`;
    }

    return prompt;
  }

  /**
   * Generate a multi-panel composite figure.
   * Generates each panel independently, then composes them into a grid SVG.
   */
  private async generateMultiPanel(
    panels: string[],
    layout: string,
    options: GenerateOptions,
    startTime: number
  ): Promise<ExtendedGenerationResult> {
    const panelLabels = 'ABCDEFGHI'.split('');
    const panelResults: Array<{ label: string; svg: string }> = [];

    // Generate each panel
    for (let i = 0; i < panels.length; i++) {
      const panelPrompt = panels[i];
      this.logger.debug(`Generating panel ${panelLabels[i]}`, { prompt: panelPrompt });

      try {
        const result = await this.generate(panelPrompt, {
          ...options,
          useConversationContext: false,
        });
        panelResults.push({ label: panelLabels[i], svg: result.svg });
      } catch (error) {
        this.logger.warn(`Panel ${panelLabels[i]} generation failed`, {
          error: (error as Error).message,
        });
        // Create placeholder for failed panel
        panelResults.push({
          label: panelLabels[i],
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
            <rect width="400" height="300" fill="#f9fafb" stroke="#e5e7eb" stroke-width="1"/>
            <text x="200" y="150" text-anchor="middle" fill="#6b7280" font-family="Inter, sans-serif" font-size="14">
              Panel ${panelLabels[i]}: Generation failed
            </text>
          </svg>`,
        });
      }
    }

    // Compose into grid
    const compositeSvg = this.composePanelGrid(panelResults, layout);

    // Record in conversation
    const conversationId = this.conversationManager.addTurn(
      `Multi-panel figure: ${panels.join('; ')}`,
      {
        svg: compositeSvg,
        backend: 'multi-panel',
        metadata: {
          generatedAt: new Date(),
          promptTokens: 0,
          completionTokens: 0,
          generationTimeMs: Date.now() - startTime,
        },
      },
      options.conversationId
    );

    return {
      svg: compositeSvg,
      backend: 'multi-panel',
      conversationId,
      suggestions: [
        'Adjust panel sizes',
        'Change layout arrangement',
        'Refine individual panels',
        'Add figure caption',
      ],
      metadata: {
        generatedAt: new Date(),
        promptTokens: 0,
        completionTokens: 0,
        generationTimeMs: Date.now() - startTime,
      },
    };
  }

  /**
   * Compose panel SVGs into a grid layout with labels
   */
  private composePanelGrid(
    panels: Array<{ label: string; svg: string }>,
    layout: string
  ): string {
    const [rowsStr, colsStr] = layout.split('x');
    const cols = parseInt(colsStr) || 2;
    const rows = parseInt(rowsStr) || Math.ceil(panels.length / cols);

    const panelWidth = 500;
    const panelHeight = 400;
    const padding = 20;
    const labelSize = 24;
    const labelOffset = 30;

    const totalWidth = cols * panelWidth + (cols + 1) * padding;
    const totalHeight = rows * (panelHeight + labelOffset) + (rows + 1) * padding;

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}">
  <rect width="${totalWidth}" height="${totalHeight}" fill="white"/>`;

    panels.forEach((panel, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = padding + col * (panelWidth + padding);
      const y = padding + row * (panelHeight + labelOffset + padding);

      // Panel label (A, B, C, D...)
      svgContent += `
  <text x="${x + 4}" y="${y + labelSize - 4}" font-family="Inter, Arial, sans-serif" font-size="${labelSize}" font-weight="700" fill="#111827">${panel.label}</text>`;

      // Panel border
      svgContent += `
  <rect x="${x}" y="${y + labelOffset}" width="${panelWidth}" height="${panelHeight}" fill="none" stroke="#e5e7eb" stroke-width="1" rx="4"/>`;

      // Embed panel SVG using foreignObject for proper rendering
      svgContent += `
  <foreignObject x="${x}" y="${y + labelOffset}" width="${panelWidth}" height="${panelHeight}">
    <div xmlns="http://www.w3.org/1999/xhtml" style="width:${panelWidth}px;height:${panelHeight}px;overflow:hidden;display:flex;align-items:center;justify-content:center;">
      ${panel.svg}
    </div>
  </foreignObject>`;
    });

    svgContent += '\n</svg>';
    return svgContent;
  }

  /**
   * Get domain for template type
   */
  private getDomainForTemplate(templateType: DiagramType): DiagramDomain {
    const domainMap: Partial<Record<DiagramType, DiagramDomain>> = {
      consort: 'medicine',
      prisma: 'medicine',
      'decision-tree': 'medicine',
      'forest-plot': 'statistics',
      'kaplan-meier': 'statistics',
      'roc-curve': 'statistics',
      pathway: 'biology',
      anatomical: 'biology',
      molecular: 'chemistry',
      cell: 'biology',
    };

    return domainMap[templateType] ?? 'general';
  }
}

// Export singleton instance
export const diagramGenerator = new DiagramGenerator();
export default diagramGenerator;
