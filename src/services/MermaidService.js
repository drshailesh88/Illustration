/**
 * MermaidService.js
 * Mermaid.js integration for DSL-based diagram generation
 *
 * Provides scientific diagram templates and SVG generation
 * ready for Fabric.js import in the FINNISH illustration editor.
 */

import mermaid from 'mermaid';

// Design tokens for consistent theming
const DESIGN_TOKENS = {
  colors: {
    primary: '#2563eb',      // Blue-600
    secondary: '#7c3aed',    // Violet-600
    success: '#059669',      // Emerald-600
    warning: '#d97706',      // Amber-600
    error: '#dc2626',        // Red-600
    neutral: '#6b7280',      // Gray-500
    background: '#ffffff',
    surface: '#f9fafb',      // Gray-50
    border: '#e5e7eb',       // Gray-200
    text: '#111827',         // Gray-900
    textMuted: '#6b7280',    // Gray-500
  },
  fonts: {
    primary: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
};

// Custom Mermaid theme configuration
const MERMAID_THEME_CONFIG = {
  theme: 'base',
  themeVariables: {
    // Primary colors
    primaryColor: DESIGN_TOKENS.colors.primary,
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#1d4ed8',

    // Secondary colors
    secondaryColor: DESIGN_TOKENS.colors.surface,
    secondaryTextColor: DESIGN_TOKENS.colors.text,
    secondaryBorderColor: DESIGN_TOKENS.colors.border,

    // Tertiary colors
    tertiaryColor: '#fef3c7',
    tertiaryTextColor: DESIGN_TOKENS.colors.text,
    tertiaryBorderColor: '#fbbf24',

    // Line and text colors
    lineColor: DESIGN_TOKENS.colors.neutral,
    textColor: DESIGN_TOKENS.colors.text,

    // Background
    mainBkg: DESIGN_TOKENS.colors.background,

    // Flowchart specific
    nodeBorder: DESIGN_TOKENS.colors.border,
    clusterBkg: DESIGN_TOKENS.colors.surface,
    clusterBorder: DESIGN_TOKENS.colors.border,

    // Font settings
    fontFamily: DESIGN_TOKENS.fonts.primary,
    fontSize: '14px',

    // State diagram
    labelColor: DESIGN_TOKENS.colors.text,

    // Sequence diagram
    actorBkg: DESIGN_TOKENS.colors.primary,
    actorBorder: '#1d4ed8',
    actorTextColor: '#ffffff',
    signalColor: DESIGN_TOKENS.colors.text,
    signalTextColor: DESIGN_TOKENS.colors.text,

    // Notes
    noteBkgColor: '#fef9c3',
    noteTextColor: DESIGN_TOKENS.colors.text,
    noteBorderColor: '#fbbf24',
  },
};

/**
 * MermaidService class for diagram generation and management
 */
class MermaidService {
  constructor() {
    this.initialized = false;
    this.templates = new Map();
    this.renderCounter = 0;
  }

  /**
   * Initialize Mermaid with custom theme configuration
   * @param {Object} customConfig - Optional custom configuration to merge
   * @returns {Promise<void>}
   */
  async initialize(customConfig = {}) {
    if (this.initialized) {
      return;
    }

    const config = {
      startOnLoad: false,
      securityLevel: 'loose', // Required for SVG export
      ...MERMAID_THEME_CONFIG,
      ...customConfig,
      themeVariables: {
        ...MERMAID_THEME_CONFIG.themeVariables,
        ...(customConfig.themeVariables || {}),
      },
    };

    mermaid.initialize(config);
    await this.loadBuiltInTemplates();
    this.initialized = true;
  }

  /**
   * Load built-in scientific diagram templates
   * @private
   */
  async loadBuiltInTemplates() {
    // CONSORT Flow Diagram
    this.templates.set('consort', {
      name: 'CONSORT Flow Diagram',
      description: 'CONSORT 2010 compliant randomized trial flow diagram',
      category: 'clinical-trial',
      template: this.getConsortTemplate(),
    });

    // PRISMA Flow Diagram
    this.templates.set('prisma', {
      name: 'PRISMA Flow Diagram',
      description: 'PRISMA 2020 systematic review flow diagram',
      category: 'systematic-review',
      template: this.getPrismaTemplate(),
    });

    // Study Design Flowchart
    this.templates.set('study-design', {
      name: 'Study Design Flowchart',
      description: 'Generic study design and methodology flowchart',
      category: 'methodology',
      template: this.getStudyDesignTemplate(),
    });

    // Decision Tree
    this.templates.set('decision-tree', {
      name: 'Decision Tree',
      description: 'Clinical decision tree or algorithm',
      category: 'clinical',
      template: this.getDecisionTreeTemplate(),
    });

    // State Diagram
    this.templates.set('state-diagram', {
      name: 'State Diagram',
      description: 'State transition diagram for processes',
      category: 'process',
      template: this.getStateDiagramTemplate(),
    });

    // Patient Journey
    this.templates.set('patient-journey', {
      name: 'Patient Journey',
      description: 'Sequence diagram for patient journey/timeline',
      category: 'clinical',
      template: this.getPatientJourneyTemplate(),
    });
  }

  /**
   * Parse Mermaid DSL string and generate SVG
   * @param {string} dsl - Mermaid DSL string
   * @param {Object} options - Rendering options
   * @returns {Promise<{svg: string, bindFunctions: Function|null}>}
   */
  async parse(dsl, options = {}) {
    if (!this.initialized) {
      await this.initialize();
    }

    const {
      id = `mermaid-diagram-${++this.renderCounter}`,
      suppressErrors = false,
    } = options;

    try {
      // Validate the DSL syntax first
      const isValid = await this.validate(dsl);
      if (!isValid.valid) {
        throw new MermaidSyntaxError(isValid.error, dsl);
      }

      // Render the diagram
      const { svg, bindFunctions } = await mermaid.render(id, dsl.trim());

      // Post-process SVG for Fabric.js compatibility
      const processedSvg = this.postProcessSvg(svg, options);

      return {
        svg: processedSvg,
        bindFunctions,
        id,
      };
    } catch (error) {
      if (suppressErrors) {
        console.warn('Mermaid parsing warning:', error.message);
        return {
          svg: this.generateErrorSvg(error.message),
          bindFunctions: null,
          id,
          error: error.message,
        };
      }
      throw error;
    }
  }

  /**
   * Validate Mermaid DSL syntax without rendering
   * @param {string} dsl - Mermaid DSL string
   * @returns {Promise<{valid: boolean, error: string|null}>}
   */
  async validate(dsl) {
    if (!this.initialized) {
      await this.initialize();
    }

    try {
      await mermaid.parse(dsl.trim());
      return { valid: true, error: null };
    } catch (error) {
      return {
        valid: false,
        error: this.formatSyntaxError(error),
      };
    }
  }

  /**
   * Format syntax error for user display
   * @private
   * @param {Error} error - The parse error
   * @returns {string} Formatted error message
   */
  formatSyntaxError(error) {
    const message = error.message || String(error);

    // Extract line number if available
    const lineMatch = message.match(/line (\d+)/i);
    const line = lineMatch ? lineMatch[1] : 'unknown';

    // Clean up the error message
    let cleanMessage = message
      .replace(/Syntax error in text/i, 'Syntax error')
      .replace(/mermaid version .+?$/m, '')
      .trim();

    return `Line ${line}: ${cleanMessage}`;
  }

  /**
   * Post-process SVG for Fabric.js compatibility
   * @private
   * @param {string} svg - Raw SVG string
   * @param {Object} options - Processing options
   * @returns {string} Processed SVG
   */
  postProcessSvg(svg, options = {}) {
    const {
      removeBackground = true,
      addViewBox = true,
      cleanStyles = true,
    } = options;

    let processed = svg;

    // Remove the Mermaid-generated background if requested
    if (removeBackground) {
      processed = processed.replace(
        /<rect[^>]*class="[^"]*background[^"]*"[^>]*><\/rect>/gi,
        ''
      );
    }

    // Ensure viewBox is present for proper scaling
    if (addViewBox && !processed.includes('viewBox')) {
      const widthMatch = processed.match(/width="([^"]+)"/);
      const heightMatch = processed.match(/height="([^"]+)"/);

      if (widthMatch && heightMatch) {
        const width = parseFloat(widthMatch[1]);
        const height = parseFloat(heightMatch[1]);
        processed = processed.replace(
          /<svg/,
          `<svg viewBox="0 0 ${width} ${height}"`
        );
      }
    }

    // Clean up inline styles for better compatibility
    if (cleanStyles) {
      // Remove max-width which can cause issues
      processed = processed.replace(/max-width:\s*[^;]+;?/gi, '');
      // Ensure stroke-linecap and stroke-linejoin are set
      processed = processed.replace(
        /<svg/,
        '<svg stroke-linecap="round" stroke-linejoin="round"'
      );
    }

    // Add XML declaration if not present
    if (!processed.startsWith('<?xml')) {
      processed = '<?xml version="1.0" encoding="UTF-8"?>\n' + processed;
    }

    return processed;
  }

  /**
   * Generate an error placeholder SVG
   * @private
   * @param {string} message - Error message
   * @returns {string} SVG with error display
   */
  generateErrorSvg(message) {
    const escapedMessage = message
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .substring(0, 100);

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200" viewBox="0 0 400 200">
  <rect width="100%" height="100%" fill="#fef2f2" stroke="#dc2626" stroke-width="2" rx="8"/>
  <text x="200" y="80" text-anchor="middle" fill="#dc2626" font-family="${DESIGN_TOKENS.fonts.primary}" font-size="16" font-weight="600">
    Diagram Error
  </text>
  <text x="200" y="110" text-anchor="middle" fill="#6b7280" font-family="${DESIGN_TOKENS.fonts.primary}" font-size="12">
    ${escapedMessage}
  </text>
  <text x="200" y="140" text-anchor="middle" fill="#9ca3af" font-family="${DESIGN_TOKENS.fonts.primary}" font-size="11">
    Please check your diagram syntax
  </text>
</svg>`;
  }

  /**
   * Customize theme colors
   * @param {Object} colors - Color overrides
   * @returns {Promise<void>}
   */
  async setTheme(colors) {
    const newThemeVars = {};

    if (colors.primary) {
      newThemeVars.primaryColor = colors.primary;
      newThemeVars.actorBkg = colors.primary;
    }
    if (colors.secondary) {
      newThemeVars.secondaryColor = colors.secondary;
    }
    if (colors.background) {
      newThemeVars.mainBkg = colors.background;
    }
    if (colors.text) {
      newThemeVars.textColor = colors.text;
      newThemeVars.primaryTextColor = colors.text;
    }
    if (colors.border) {
      newThemeVars.nodeBorder = colors.border;
      newThemeVars.clusterBorder = colors.border;
    }

    // Re-initialize with new theme
    this.initialized = false;
    await this.initialize({
      themeVariables: {
        ...MERMAID_THEME_CONFIG.themeVariables,
        ...newThemeVars,
      },
    });
  }

  /**
   * Get available template names and descriptions
   * @returns {Array<{id: string, name: string, description: string, category: string}>}
   */
  getTemplateList() {
    const list = [];
    for (const [id, template] of this.templates) {
      list.push({
        id,
        name: template.name,
        description: template.description,
        category: template.category,
      });
    }
    return list;
  }

  /**
   * Get a specific template by ID
   * @param {string} templateId - Template identifier
   * @returns {Object|null} Template object or null
   */
  getTemplate(templateId) {
    return this.templates.get(templateId) || null;
  }

  /**
   * Render a template with variable substitution
   * @param {string} templateId - Template identifier
   * @param {Object} variables - Variables to substitute
   * @returns {Promise<{svg: string, dsl: string}>}
   */
  async renderTemplate(templateId, variables = {}) {
    const template = this.getTemplate(templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    // Substitute variables in template
    let dsl = template.template;
    for (const [key, value] of Object.entries(variables)) {
      const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
      dsl = dsl.replace(regex, value);
    }

    // Remove any remaining unreplaced variables with defaults
    dsl = dsl.replace(/\{\{\s*\w+\s*\|\s*([^}]+)\s*\}\}/g, '$1');
    // Remove any remaining unreplaced variables without defaults
    dsl = dsl.replace(/\{\{\s*\w+\s*\}\}/g, '...');

    const result = await this.parse(dsl);
    return {
      svg: result.svg,
      dsl,
      id: result.id,
    };
  }

  /**
   * Register a custom template
   * @param {string} id - Template identifier
   * @param {Object} template - Template definition
   */
  registerTemplate(id, template) {
    if (!template.name || !template.template) {
      throw new Error('Template must have name and template properties');
    }
    this.templates.set(id, {
      name: template.name,
      description: template.description || '',
      category: template.category || 'custom',
      template: template.template,
    });
  }

  // ============================================================
  // SCIENTIFIC DIAGRAM TEMPLATES
  // ============================================================

  /**
   * CONSORT 2010 Flow Diagram template
   * @private
   */
  getConsortTemplate() {
    return `flowchart TB
    %% CONSORT 2010 Flow Diagram
    %% Enrollment
    subgraph enrollment["Enrollment"]
        assessed["Assessed for eligibility<br/>(n={{assessed|N}})"]
        excluded["Excluded (n={{excluded|n}})<br/>- Not meeting inclusion criteria (n={{notMeeting|n}})<br/>- Declined to participate (n={{declined|n}})<br/>- Other reasons (n={{otherExcluded|n}})"]
    end

    %% Randomization
    randomized["Randomized<br/>(n={{randomized|N}})"]

    %% Allocation
    subgraph allocation["Allocation"]
        direction LR
        allocIntervention["Allocated to intervention<br/>(n={{allocIntervention|n}})<br/>- Received allocated intervention (n={{receivedIntervention|n}})<br/>- Did not receive allocated intervention (n={{notReceivedIntervention|n}})"]
        allocControl["Allocated to control<br/>(n={{allocControl|n}})<br/>- Received allocated intervention (n={{receivedControl|n}})<br/>- Did not receive allocated intervention (n={{notReceivedControl|n}})"]
    end

    %% Follow-up
    subgraph followup["Follow-Up"]
        direction LR
        lostIntervention["Lost to follow-up (n={{lostIntervention|n}})<br/>Discontinued intervention (n={{discontinuedIntervention|n}})"]
        lostControl["Lost to follow-up (n={{lostControl|n}})<br/>Discontinued intervention (n={{discontinuedControl|n}})"]
    end

    %% Analysis
    subgraph analysis["Analysis"]
        direction LR
        analyzedIntervention["Analysed (n={{analyzedIntervention|n}})<br/>- Excluded from analysis (n={{excludedIntervention|n}})"]
        analyzedControl["Analysed (n={{analyzedControl|n}})<br/>- Excluded from analysis (n={{excludedControl|n}})"]
    end

    %% Connections
    assessed --> excluded
    assessed --> randomized
    randomized --> allocIntervention
    randomized --> allocControl
    allocIntervention --> lostIntervention
    allocControl --> lostControl
    lostIntervention --> analyzedIntervention
    lostControl --> analyzedControl

    %% Styling
    classDef enrollment fill:#e0f2fe,stroke:#0284c7,color:#0c4a6e
    classDef allocation fill:#f0fdf4,stroke:#16a34a,color:#14532d
    classDef followup fill:#fef9c3,stroke:#ca8a04,color:#713f12
    classDef analysis fill:#fce7f3,stroke:#db2777,color:#831843
    classDef excluded fill:#fee2e2,stroke:#dc2626,color:#7f1d1d

    class assessed,randomized enrollment
    class allocIntervention,allocControl allocation
    class lostIntervention,lostControl followup
    class analyzedIntervention,analyzedControl analysis
    class excluded excluded`;
  }

  /**
   * PRISMA 2020 Flow Diagram template
   * @private
   */
  getPrismaTemplate() {
    return `flowchart TB
    %% PRISMA 2020 Flow Diagram for Systematic Reviews

    %% Identification
    subgraph identification["Identification of studies via databases and registers"]
        dbRecords["Records identified from databases<br/>(n={{dbRecords|N}})<br/>{{databases|Database sources}}"]
        registerRecords["Records identified from registers<br/>(n={{registerRecords|n}})"]
        duplicates["Records removed before screening:<br/>Duplicate records (n={{duplicates|n}})<br/>Records marked as ineligible (n={{ineligibleAuto|n}})<br/>Records removed for other reasons (n={{otherRemoved|n}})"]
    end

    subgraph otherMethods["Identification of studies via other methods"]
        websites["Records identified from:<br/>Websites (n={{websites|n}})<br/>Organisations (n={{organisations|n}})<br/>Citation searching (n={{citations|n}})"]
        otherRetrieved["Reports sought for retrieval<br/>(n={{otherRetrieved|n}})"]
        otherAssessed["Reports assessed for eligibility<br/>(n={{otherAssessed|n}})"]
    end

    %% Screening
    subgraph screening["Screening"]
        screened["Records screened<br/>(n={{screened|N}})"]
        screenExcluded["Records excluded<br/>(n={{screenExcluded|n}})"]
        soughtRetrieval["Reports sought for retrieval<br/>(n={{soughtRetrieval|n}})"]
        notRetrieved["Reports not retrieved<br/>(n={{notRetrieved|n}})"]
        assessed["Reports assessed for eligibility<br/>(n={{assessed|n}})"]
        excludedReasons["Reports excluded:<br/>Reason 1 (n={{reason1|n}})<br/>Reason 2 (n={{reason2|n}})<br/>Reason 3 (n={{reason3|n}})"]
    end

    %% Included
    subgraph included["Included"]
        studiesIncluded["Studies included in review<br/>(n={{studiesIncluded|N}})<br/>Reports of included studies<br/>(n={{reportsIncluded|n}})"]
    end

    %% Connections - Main flow
    dbRecords --> duplicates
    registerRecords --> duplicates
    duplicates --> screened
    screened --> screenExcluded
    screened --> soughtRetrieval
    soughtRetrieval --> notRetrieved
    soughtRetrieval --> assessed
    assessed --> excludedReasons
    assessed --> studiesIncluded

    %% Connections - Other methods
    websites --> otherRetrieved
    otherRetrieved --> otherAssessed
    otherAssessed --> studiesIncluded

    %% Styling
    classDef identification fill:#dbeafe,stroke:#2563eb,color:#1e3a8a
    classDef screening fill:#fef3c7,stroke:#d97706,color:#78350f
    classDef included fill:#d1fae5,stroke:#059669,color:#064e3b
    classDef excluded fill:#fee2e2,stroke:#dc2626,color:#7f1d1d

    class dbRecords,registerRecords,duplicates,websites,otherRetrieved,otherAssessed identification
    class screened,soughtRetrieval,assessed screening
    class studiesIncluded included
    class screenExcluded,notRetrieved,excludedReasons excluded`;
  }

  /**
   * Study Design Flowchart template
   * @private
   */
  getStudyDesignTemplate() {
    return `flowchart TB
    %% Study Design Flowchart

    subgraph design["Study Design"]
        question["Research Question<br/>{{question|Define research question}}"]
        hypothesis["Hypothesis<br/>{{hypothesis|State hypothesis}}"]
        studyType["Study Type<br/>{{studyType|Select study design}}"]
    end

    subgraph population["Study Population"]
        target["Target Population<br/>{{targetPop|Define target population}}"]
        inclusion["Inclusion Criteria<br/>{{inclusion|List inclusion criteria}}"]
        exclusion["Exclusion Criteria<br/>{{exclusion|List exclusion criteria}}"]
        sampling["Sampling Method<br/>{{sampling|Describe sampling}}"]
        sampleSize["Sample Size<br/>n={{sampleSize|N}}"]
    end

    subgraph methods["Methods"]
        intervention["Intervention/Exposure<br/>{{intervention|Describe intervention}}"]
        control["Control/Comparison<br/>{{control|Describe control}}"]
        outcomes["Outcome Measures<br/>Primary: {{primaryOutcome|Primary outcome}}<br/>Secondary: {{secondaryOutcome|Secondary outcomes}}"]
        dataCollection["Data Collection<br/>{{dataCollection|Methods}}"]
    end

    subgraph analysis["Analysis Plan"]
        statistical["Statistical Analysis<br/>{{statistical|Analysis methods}}"]
        power["Power Analysis<br/>Power: {{power|80%}}<br/>Alpha: {{alpha|0.05}}"]
    end

    %% Flow
    question --> hypothesis
    hypothesis --> studyType
    studyType --> target
    target --> inclusion
    inclusion --> exclusion
    exclusion --> sampling
    sampling --> sampleSize
    sampleSize --> intervention
    sampleSize --> control
    intervention --> outcomes
    control --> outcomes
    outcomes --> dataCollection
    dataCollection --> statistical
    statistical --> power

    %% Styling
    classDef design fill:#ede9fe,stroke:#7c3aed,color:#4c1d95
    classDef population fill:#dbeafe,stroke:#2563eb,color:#1e3a8a
    classDef methods fill:#d1fae5,stroke:#059669,color:#064e3b
    classDef analysis fill:#fce7f3,stroke:#db2777,color:#831843

    class question,hypothesis,studyType design
    class target,inclusion,exclusion,sampling,sampleSize population
    class intervention,control,outcomes,dataCollection methods
    class statistical,power analysis`;
  }

  /**
   * Decision Tree template
   * @private
   */
  getDecisionTreeTemplate() {
    return `flowchart TB
    %% Clinical Decision Tree

    start(["{{startCondition|Patient presents with condition}}"])

    %% First decision
    decision1{"{{decision1|Initial Assessment}}"}

    %% Branches from first decision
    path1a["{{path1a|Option A}}"]
    path1b["{{path1b|Option B}}"]

    %% Second level decisions
    decision2{"{{decision2|Secondary Assessment}}"}
    decision3{"{{decision3|Alternative Assessment}}"}

    %% Third level
    outcome1(["{{outcome1|Outcome 1}}"])
    outcome2(["{{outcome2|Outcome 2}}"])
    outcome3(["{{outcome3|Outcome 3}}"])
    outcome4(["{{outcome4|Outcome 4}}"])

    %% Connections
    start --> decision1

    decision1 -->|"{{label1a|Yes}}"| path1a
    decision1 -->|"{{label1b|No}}"| path1b

    path1a --> decision2
    path1b --> decision3

    decision2 -->|"{{label2a|Positive}}"| outcome1
    decision2 -->|"{{label2b|Negative}}"| outcome2

    decision3 -->|"{{label3a|High Risk}}"| outcome3
    decision3 -->|"{{label3b|Low Risk}}"| outcome4

    %% Styling
    classDef startEnd fill:#dbeafe,stroke:#2563eb,color:#1e3a8a,stroke-width:2px
    classDef decision fill:#fef3c7,stroke:#d97706,color:#78350f
    classDef process fill:#f3f4f6,stroke:#6b7280,color:#1f2937
    classDef outcome fill:#d1fae5,stroke:#059669,color:#064e3b

    class start,outcome1,outcome2,outcome3,outcome4 startEnd
    class decision1,decision2,decision3 decision
    class path1a,path1b process`;
  }

  /**
   * State Diagram template
   * @private
   */
  getStateDiagramTemplate() {
    return `stateDiagram-v2
    %% State Diagram for Process/Disease States

    [*] --> {{initialState|Initial}}

    state "{{state1|State 1}}" as s1
    state "{{state2|State 2}}" as s2
    state "{{state3|State 3}}" as s3
    state "{{terminalState|Terminal}}" as terminal

    {{initialState|Initial}} --> s1: {{trigger1|Trigger 1}}
    s1 --> s2: {{trigger2|Trigger 2}}
    s2 --> s3: {{trigger3|Trigger 3}}
    s1 --> s3: {{trigger4|Direct transition}}
    s2 --> s1: {{trigger5|Regression}}
    s3 --> terminal: {{trigger6|Progression}}
    terminal --> [*]

    note right of s1
        {{note1|Description of state 1}}
    end note

    note right of s2
        {{note2|Description of state 2}}
    end note

    note left of s3
        {{note3|Description of state 3}}
    end note`;
  }

  /**
   * Patient Journey Sequence Diagram template
   * @private
   */
  getPatientJourneyTemplate() {
    return `sequenceDiagram
    %% Patient Journey / Timeline

    participant P as {{patient|Patient}}
    participant PC as {{primaryCare|Primary Care}}
    participant S as {{specialist|Specialist}}
    participant H as {{hospital|Hospital}}
    participant F as {{followup|Follow-up}}

    Note over P,F: {{title|Patient Journey Timeline}}

    %% Initial presentation
    P->>PC: {{step1|Initial presentation}}
    activate PC
    PC->>PC: {{step2|Assessment}}
    PC-->>P: {{step3|Initial treatment}}
    deactivate PC

    %% Referral
    Note over PC,S: {{referralNote|Referral process}}
    PC->>S: {{step4|Referral}}
    activate S
    S->>S: {{step5|Specialist evaluation}}

    alt {{condition1|Condition requiring hospitalization}}
        S->>H: {{step6|Admit to hospital}}
        activate H
        H->>H: {{step7|Treatment}}
        H-->>P: {{step8|Discharge}}
        deactivate H
    else {{condition2|Outpatient management}}
        S-->>P: {{step9|Outpatient treatment}}
    end
    deactivate S

    %% Follow-up
    loop {{loopLabel|Regular follow-up}}
        P->>F: {{step10|Follow-up visit}}
        activate F
        F->>F: {{step11|Monitoring}}
        F-->>P: {{step12|Continued care}}
        deactivate F
    end

    Note over P,F: {{outcomeNote|Outcome assessment}}`;
  }

  /**
   * Convert SVG string to data URL for embedding
   * @param {string} svg - SVG string
   * @returns {string} Data URL
   */
  svgToDataUrl(svg) {
    const base64 = btoa(unescape(encodeURIComponent(svg)));
    return `data:image/svg+xml;base64,${base64}`;
  }

  /**
   * Convert SVG to Blob for download
   * @param {string} svg - SVG string
   * @returns {Blob} SVG Blob
   */
  svgToBlob(svg) {
    return new Blob([svg], { type: 'image/svg+xml' });
  }

  /**
   * Prepare SVG for Fabric.js import
   * @param {string} svg - SVG string
   * @returns {Object} Object with svg string and import options
   */
  prepareForFabric(svg) {
    return {
      svg: this.postProcessSvg(svg, {
        removeBackground: true,
        addViewBox: true,
        cleanStyles: true,
      }),
      fabricOptions: {
        crossOrigin: 'anonymous',
        // Recommended Fabric.js import settings for Mermaid diagrams
        selectable: true,
        evented: true,
        hasControls: true,
        hasBorders: true,
        lockUniScaling: false,
      },
    };
  }
}

/**
 * Custom error class for Mermaid syntax errors
 */
class MermaidSyntaxError extends Error {
  constructor(message, dsl) {
    super(message);
    this.name = 'MermaidSyntaxError';
    this.dsl = dsl;
  }
}

// Export singleton instance
const mermaidService = new MermaidService();

export { mermaidService, MermaidService, MermaidSyntaxError, DESIGN_TOKENS };
export default mermaidService;
