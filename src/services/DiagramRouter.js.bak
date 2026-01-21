/**
 * DiagramRouter.js
 * Intelligent routing of diagram generation requests to appropriate tools
 *
 * Routes user intent to:
 * - Mermaid for flowcharts and diagrams
 * - Plotly for statistical charts
 * - Custom SVG for complex scientific diagrams
 *
 * Uses natural language processing to determine best tool
 */

import mermaidService from './MermaidService.js';

// Diagram type definitions with routing rules
const DIAGRAM_TYPES = {
  // Flowcharts - Route to Mermaid
  flowchart: {
    keywords: ['flowchart', 'flow chart', 'flow diagram', 'process flow', 'workflow', 'pipeline'],
    tool: 'mermaid',
    mermaidType: 'flowchart',
    confidence: 0.9,
  },
  consort: {
    keywords: ['consort', 'randomized trial', 'rct flow', 'trial flow', 'participant flow', 'enrollment flow'],
    tool: 'mermaid',
    template: 'consort',
    confidence: 0.95,
  },
  prisma: {
    keywords: ['prisma', 'systematic review', 'literature review', 'screening flow', 'study selection', 'meta-analysis flow'],
    tool: 'mermaid',
    template: 'prisma',
    confidence: 0.95,
  },

  // Decision diagrams - Route to Mermaid
  decisionTree: {
    keywords: ['decision tree', 'decision diagram', 'algorithm', 'clinical algorithm', 'diagnostic algorithm', 'treatment algorithm'],
    tool: 'mermaid',
    template: 'decision-tree',
    confidence: 0.9,
  },

  // State diagrams - Route to Mermaid
  stateDiagram: {
    keywords: ['state diagram', 'state machine', 'state transition', 'disease states', 'markov', 'health states'],
    tool: 'mermaid',
    template: 'state-diagram',
    confidence: 0.85,
  },

  // Sequence diagrams - Route to Mermaid
  sequence: {
    keywords: ['sequence diagram', 'patient journey', 'timeline', 'care pathway', 'treatment sequence', 'interaction diagram'],
    tool: 'mermaid',
    template: 'patient-journey',
    confidence: 0.85,
  },

  // Study design - Route to Mermaid
  studyDesign: {
    keywords: ['study design', 'methodology', 'research design', 'protocol flow', 'methods diagram'],
    tool: 'mermaid',
    template: 'study-design',
    confidence: 0.8,
  },

  // Statistical charts - Route to Plotly
  forestPlot: {
    keywords: ['forest plot', 'meta-analysis', 'effect size', 'odds ratio', 'risk ratio', 'hazard ratio', 'pooled effect'],
    tool: 'plotly',
    plotlyType: 'forest',
    confidence: 0.95,
  },
  scatterPlot: {
    keywords: ['scatter plot', 'scatter diagram', 'correlation', 'regression plot', 'xy plot'],
    tool: 'plotly',
    plotlyType: 'scatter',
    confidence: 0.9,
  },
  barChart: {
    keywords: ['bar chart', 'bar graph', 'histogram', 'frequency', 'distribution'],
    tool: 'plotly',
    plotlyType: 'bar',
    confidence: 0.85,
  },
  boxPlot: {
    keywords: ['box plot', 'boxplot', 'box and whisker', 'quartile', 'median comparison'],
    tool: 'plotly',
    plotlyType: 'box',
    confidence: 0.9,
  },
  violinPlot: {
    keywords: ['violin plot', 'distribution comparison', 'density plot'],
    tool: 'plotly',
    plotlyType: 'violin',
    confidence: 0.9,
  },
  kaplanMeier: {
    keywords: ['kaplan meier', 'survival curve', 'survival analysis', 'time to event', 'km curve', 'survival plot'],
    tool: 'plotly',
    plotlyType: 'kaplan-meier',
    confidence: 0.95,
  },
  rocCurve: {
    keywords: ['roc curve', 'receiver operating', 'auc', 'sensitivity specificity', 'diagnostic accuracy'],
    tool: 'plotly',
    plotlyType: 'roc',
    confidence: 0.95,
  },
  funnelPlot: {
    keywords: ['funnel plot', 'publication bias', 'egger', 'begg'],
    tool: 'plotly',
    plotlyType: 'funnel',
    confidence: 0.95,
  },
  blandAltman: {
    keywords: ['bland altman', 'agreement plot', 'limits of agreement', 'method comparison'],
    tool: 'plotly',
    plotlyType: 'bland-altman',
    confidence: 0.95,
  },
  heatmap: {
    keywords: ['heatmap', 'heat map', 'correlation matrix', 'expression matrix'],
    tool: 'plotly',
    plotlyType: 'heatmap',
    confidence: 0.85,
  },

  // Complex diagrams - Route to custom SVG
  anatomical: {
    keywords: ['anatomy', 'anatomical', 'body diagram', 'organ', 'tissue', 'physiological'],
    tool: 'custom-svg',
    customType: 'anatomical',
    confidence: 0.8,
  },
  molecularStructure: {
    keywords: ['molecular', 'chemical structure', 'compound', 'molecule', 'pathway diagram', 'signaling pathway'],
    tool: 'custom-svg',
    customType: 'molecular',
    confidence: 0.85,
  },
  cellDiagram: {
    keywords: ['cell diagram', 'cellular', 'organelle', 'membrane', 'cytoplasm'],
    tool: 'custom-svg',
    customType: 'cell',
    confidence: 0.85,
  },
  geneticMap: {
    keywords: ['genetic map', 'chromosome', 'gene locus', 'linkage', 'karyotype'],
    tool: 'custom-svg',
    customType: 'genetic',
    confidence: 0.85,
  },
  proteinStructure: {
    keywords: ['protein structure', 'secondary structure', 'tertiary structure', 'domain', 'motif'],
    tool: 'custom-svg',
    customType: 'protein',
    confidence: 0.85,
  },
};

/**
 * DiagramRouter class for intelligent diagram tool selection
 */
class DiagramRouter {
  constructor() {
    this.diagramTypes = DIAGRAM_TYPES;
    this.mermaidService = mermaidService;
    this.plotlyService = null; // Will be injected
    this.customSvgService = null; // Will be injected
  }

  /**
   * Register external services for diagram generation
   * @param {Object} services - Service instances
   */
  registerServices(services = {}) {
    if (services.plotly) {
      this.plotlyService = services.plotly;
    }
    if (services.customSvg) {
      this.customSvgService = services.customSvg;
    }
  }

  /**
   * Analyze natural language input to determine diagram type
   * @param {string} input - User's natural language description
   * @returns {Object} Analysis result with detected type and confidence
   */
  analyzeIntent(input) {
    const normalizedInput = input.toLowerCase().trim();
    const matches = [];

    for (const [typeId, typeConfig] of Object.entries(this.diagramTypes)) {
      let score = 0;
      let matchedKeywords = [];

      for (const keyword of typeConfig.keywords) {
        if (normalizedInput.includes(keyword.toLowerCase())) {
          // Exact match gets higher score
          if (normalizedInput === keyword.toLowerCase()) {
            score += 2;
          } else {
            score += 1;
          }
          matchedKeywords.push(keyword);
        }
      }

      if (score > 0) {
        // Calculate confidence based on matches and keyword specificity
        const confidence = Math.min(
          (score / typeConfig.keywords.length) * typeConfig.confidence,
          1.0
        );

        matches.push({
          typeId,
          type: typeConfig,
          score,
          confidence,
          matchedKeywords,
        });
      }
    }

    // Sort by confidence (descending)
    matches.sort((a, b) => b.confidence - a.confidence);

    if (matches.length === 0) {
      return {
        detected: false,
        suggestion: 'flowchart',
        confidence: 0,
        message: 'Could not determine diagram type. Defaulting to flowchart.',
        alternatives: [],
      };
    }

    const best = matches[0];
    const alternatives = matches.slice(1, 4).map(m => ({
      typeId: m.typeId,
      confidence: m.confidence,
      tool: m.type.tool,
    }));

    return {
      detected: true,
      typeId: best.typeId,
      type: best.type,
      tool: best.type.tool,
      confidence: best.confidence,
      matchedKeywords: best.matchedKeywords,
      alternatives,
      template: best.type.template || null,
    };
  }

  /**
   * Route diagram generation to appropriate tool
   * @param {string} input - User's description or DSL
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generated diagram result
   */
  async route(input, options = {}) {
    const {
      forceType = null,
      forceTool = null,
      variables = {},
      theme = {},
    } = options;

    // Analyze intent if not forced
    let analysis;
    if (forceType) {
      analysis = {
        detected: true,
        typeId: forceType,
        type: this.diagramTypes[forceType],
        tool: this.diagramTypes[forceType]?.tool || 'mermaid',
        confidence: 1.0,
      };
    } else {
      analysis = this.analyzeIntent(input);
    }

    const tool = forceTool || analysis.tool;

    try {
      let result;

      switch (tool) {
        case 'mermaid':
          result = await this.routeToMermaid(input, analysis, { variables, theme });
          break;
        case 'plotly':
          result = await this.routeToPlotly(input, analysis, options);
          break;
        case 'custom-svg':
          result = await this.routeToCustomSvg(input, analysis, options);
          break;
        default:
          throw new Error(`Unknown tool: ${tool}`);
      }

      return {
        success: true,
        ...result,
        analysis,
        tool,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        analysis,
        tool,
        suggestions: this.getSuggestions(analysis, error),
      };
    }
  }

  /**
   * Route to Mermaid diagram generation
   * @private
   */
  async routeToMermaid(input, analysis, options = {}) {
    await this.mermaidService.initialize();

    // Apply theme if provided
    if (options.theme && Object.keys(options.theme).length > 0) {
      await this.mermaidService.setTheme(options.theme);
    }

    // Check if using a template
    if (analysis.type?.template) {
      const result = await this.mermaidService.renderTemplate(
        analysis.type.template,
        options.variables || {}
      );
      return {
        svg: result.svg,
        dsl: result.dsl,
        type: 'template',
        templateId: analysis.type.template,
      };
    }

    // Check if input is raw Mermaid DSL
    if (this.looksLikeMermaidDsl(input)) {
      const result = await this.mermaidService.parse(input);
      return {
        svg: result.svg,
        dsl: input,
        type: 'dsl',
      };
    }

    // Generate DSL from natural language description
    const dsl = this.generateMermaidDsl(input, analysis);
    const result = await this.mermaidService.parse(dsl);
    return {
      svg: result.svg,
      dsl,
      type: 'generated',
    };
  }

  /**
   * Route to Plotly chart generation
   * @private
   */
  async routeToPlotly(input, analysis, options = {}) {
    if (!this.plotlyService) {
      // Return placeholder with instructions
      return {
        svg: this.generatePlotlyPlaceholder(analysis),
        type: 'placeholder',
        plotlyType: analysis.type?.plotlyType || 'scatter',
        message: 'PlotlyService not registered. Register via DiagramRouter.registerServices()',
        dataSchema: this.getPlotlyDataSchema(analysis.type?.plotlyType),
      };
    }

    // Delegate to Plotly service
    return await this.plotlyService.generate(input, {
      type: analysis.type?.plotlyType,
      ...options,
    });
  }

  /**
   * Route to custom SVG generation
   * @private
   */
  async routeToCustomSvg(input, analysis, options = {}) {
    if (!this.customSvgService) {
      // Return placeholder with instructions
      return {
        svg: this.generateCustomSvgPlaceholder(analysis),
        type: 'placeholder',
        customType: analysis.type?.customType || 'generic',
        message: 'CustomSvgService not registered. Register via DiagramRouter.registerServices()',
      };
    }

    // Delegate to custom SVG service
    return await this.customSvgService.generate(input, {
      type: analysis.type?.customType,
      ...options,
    });
  }

  /**
   * Check if input looks like Mermaid DSL
   * @private
   */
  looksLikeMermaidDsl(input) {
    const dslPatterns = [
      /^flowchart\s+(TB|BT|LR|RL)/im,
      /^graph\s+(TB|BT|LR|RL)/im,
      /^sequenceDiagram/im,
      /^classDiagram/im,
      /^stateDiagram/im,
      /^erDiagram/im,
      /^pie\s+/im,
      /^gantt\s*/im,
      /^journey\s*/im,
      /^gitGraph\s*/im,
      /^mindmap\s*/im,
      /^timeline\s*/im,
      /^quadrantChart\s*/im,
      /^requirementDiagram\s*/im,
      /^C4Context\s*/im,
      /^sankey-beta\s*/im,
    ];

    return dslPatterns.some(pattern => pattern.test(input.trim()));
  }

  /**
   * Generate basic Mermaid DSL from natural language
   * @private
   */
  generateMermaidDsl(input, analysis) {
    // This is a simplified generator - in production,
    // this could use LLM for better natural language understanding

    const typeId = analysis.typeId || 'flowchart';

    // Extract potential node names from input
    const words = input.split(/\s+/);
    const potentialNodes = words.filter(w =>
      w.length > 2 &&
      /^[A-Z]/.test(w) &&
      !['The', 'And', 'For', 'With', 'From', 'Into'].includes(w)
    );

    if (potentialNodes.length < 2) {
      // Return a basic template
      return `flowchart TB
    A["Start"] --> B["Process"]
    B --> C["End"]

    %% Generated from: ${input.substring(0, 50)}...
    %% Please edit this diagram to match your needs`;
    }

    // Build a simple flowchart from detected nodes
    let dsl = 'flowchart TB\n';
    for (let i = 0; i < potentialNodes.length - 1; i++) {
      const current = potentialNodes[i];
      const next = potentialNodes[i + 1];
      dsl += `    ${current}["${current}"] --> ${next}["${next}"]\n`;
    }

    dsl += `\n    %% Auto-generated from: ${input.substring(0, 50)}...\n`;
    dsl += '    %% Please refine this diagram as needed';

    return dsl;
  }

  /**
   * Generate placeholder SVG for Plotly charts
   * @private
   */
  generatePlotlyPlaceholder(analysis) {
    const plotType = analysis.type?.plotlyType || 'chart';
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <rect width="100%" height="100%" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" rx="8"/>

  <!-- Grid lines -->
  <g stroke="#e2e8f0" stroke-width="1">
    <line x1="60" y1="340" x2="560" y2="340"/>
    <line x1="60" y1="260" x2="560" y2="260"/>
    <line x1="60" y1="180" x2="560" y2="180"/>
    <line x1="60" y1="100" x2="560" y2="100"/>
    <line x1="60" y1="60" x2="60" y2="340"/>
  </g>

  <!-- Placeholder content -->
  <text x="310" y="200" text-anchor="middle" fill="#64748b" font-family="Inter, sans-serif" font-size="16" font-weight="600">
    ${plotType.charAt(0).toUpperCase() + plotType.slice(1)} Chart
  </text>
  <text x="310" y="230" text-anchor="middle" fill="#94a3b8" font-family="Inter, sans-serif" font-size="12">
    Requires PlotlyService integration
  </text>

  <!-- Axis labels -->
  <text x="310" y="375" text-anchor="middle" fill="#64748b" font-family="Inter, sans-serif" font-size="11">X Axis</text>
  <text x="25" y="200" text-anchor="middle" fill="#64748b" font-family="Inter, sans-serif" font-size="11" transform="rotate(-90, 25, 200)">Y Axis</text>
</svg>`;
  }

  /**
   * Generate placeholder SVG for custom diagrams
   * @private
   */
  generateCustomSvgPlaceholder(analysis) {
    const customType = analysis.type?.customType || 'diagram';
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="400" viewBox="0 0 500 400">
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" stroke-width="0.5"/>
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#grid)"/>
  <rect width="100%" height="100%" fill="none" stroke="#cbd5e1" stroke-width="2" rx="8"/>

  <!-- Placeholder icon -->
  <circle cx="250" cy="160" r="40" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/>
  <text x="250" y="170" text-anchor="middle" fill="#0284c7" font-family="Inter, sans-serif" font-size="32">?</text>

  <!-- Labels -->
  <text x="250" y="240" text-anchor="middle" fill="#334155" font-family="Inter, sans-serif" font-size="16" font-weight="600">
    ${customType.charAt(0).toUpperCase() + customType.slice(1)} Diagram
  </text>
  <text x="250" y="270" text-anchor="middle" fill="#64748b" font-family="Inter, sans-serif" font-size="12">
    Requires CustomSvgService integration
  </text>
  <text x="250" y="295" text-anchor="middle" fill="#94a3b8" font-family="Inter, sans-serif" font-size="11">
    Register via DiagramRouter.registerServices()
  </text>
</svg>`;
  }

  /**
   * Get data schema for Plotly chart types
   * @private
   */
  getPlotlyDataSchema(plotlyType) {
    const schemas = {
      'forest': {
        studies: [{ name: 'string', effect: 'number', ci_low: 'number', ci_high: 'number', weight: 'number' }],
        pooled: { effect: 'number', ci_low: 'number', ci_high: 'number' },
        options: { effectMeasure: 'OR|RR|HR|MD', model: 'fixed|random' },
      },
      'kaplan-meier': {
        groups: [{ name: 'string', times: 'number[]', survival: 'number[]', censored: 'number[]' }],
        options: { showCI: 'boolean', showRiskTable: 'boolean' },
      },
      'roc': {
        curves: [{ name: 'string', fpr: 'number[]', tpr: 'number[]', auc: 'number' }],
        options: { showDiagonal: 'boolean', showAUC: 'boolean' },
      },
      'funnel': {
        studies: [{ effect: 'number', se: 'number' }],
        options: { showContours: 'boolean', effectMeasure: 'string' },
      },
      'bland-altman': {
        measurements: [{ method1: 'number', method2: 'number' }],
        options: { showLOA: 'boolean', showMean: 'boolean' },
      },
      'scatter': {
        points: [{ x: 'number', y: 'number', label: 'string?' }],
        options: { showTrendline: 'boolean', xLabel: 'string', yLabel: 'string' },
      },
      'bar': {
        categories: 'string[]',
        values: 'number[]',
        options: { orientation: 'h|v', showValues: 'boolean' },
      },
      'box': {
        groups: [{ name: 'string', values: 'number[]' }],
        options: { showOutliers: 'boolean', showMean: 'boolean' },
      },
      'violin': {
        groups: [{ name: 'string', values: 'number[]' }],
        options: { showBox: 'boolean', showPoints: 'boolean' },
      },
      'heatmap': {
        matrix: 'number[][]',
        xLabels: 'string[]',
        yLabels: 'string[]',
        options: { colorScale: 'string', showValues: 'boolean' },
      },
    };

    return schemas[plotlyType] || { data: 'Custom data format required' };
  }

  /**
   * Get suggestions based on analysis and error
   * @private
   */
  getSuggestions(analysis, error) {
    const suggestions = [];

    if (error.message.includes('syntax')) {
      suggestions.push({
        type: 'syntax',
        message: 'Check Mermaid DSL syntax. Common issues: missing quotes, invalid arrow syntax.',
        link: 'https://mermaid.js.org/syntax/flowchart.html',
      });
    }

    if (!analysis.detected) {
      suggestions.push({
        type: 'intent',
        message: 'Try being more specific about diagram type. Use keywords like "flowchart", "forest plot", "sequence diagram".',
      });
    }

    if (analysis.alternatives?.length > 0) {
      suggestions.push({
        type: 'alternatives',
        message: 'Alternative interpretations detected.',
        alternatives: analysis.alternatives,
      });
    }

    return suggestions;
  }

  /**
   * Get all supported diagram types
   * @returns {Array<Object>} List of supported diagram types
   */
  getSupportedTypes() {
    return Object.entries(this.diagramTypes).map(([id, config]) => ({
      id,
      tool: config.tool,
      keywords: config.keywords,
      template: config.template || null,
      description: this.getTypeDescription(id),
    }));
  }

  /**
   * Get description for diagram type
   * @private
   */
  getTypeDescription(typeId) {
    const descriptions = {
      flowchart: 'General purpose flowchart or process diagram',
      consort: 'CONSORT 2010 clinical trial flow diagram',
      prisma: 'PRISMA 2020 systematic review flow diagram',
      decisionTree: 'Clinical decision tree or diagnostic algorithm',
      stateDiagram: 'State transition diagram for processes or disease states',
      sequence: 'Sequence diagram for patient journey or interactions',
      studyDesign: 'Study design and methodology flowchart',
      forestPlot: 'Forest plot for meta-analysis results',
      scatterPlot: 'Scatter plot for correlation or regression',
      barChart: 'Bar chart for categorical comparisons',
      boxPlot: 'Box plot for distribution comparison',
      violinPlot: 'Violin plot for distribution visualization',
      kaplanMeier: 'Kaplan-Meier survival curve',
      rocCurve: 'ROC curve for diagnostic test accuracy',
      funnelPlot: 'Funnel plot for publication bias assessment',
      blandAltman: 'Bland-Altman plot for method agreement',
      heatmap: 'Heatmap for matrix data visualization',
      anatomical: 'Anatomical or body diagram',
      molecularStructure: 'Molecular or chemical structure diagram',
      cellDiagram: 'Cell or cellular structure diagram',
      geneticMap: 'Genetic map or chromosome diagram',
      proteinStructure: 'Protein structure diagram',
    };
    return descriptions[typeId] || 'Diagram type';
  }
}

// Export singleton instance
const diagramRouter = new DiagramRouter();

export { diagramRouter, DiagramRouter, DIAGRAM_TYPES };
export default diagramRouter;
