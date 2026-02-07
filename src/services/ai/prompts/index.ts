/**
 * prompts/index.ts
 * Prompt templates for AI diagram generation
 *
 * Contains system prompts and few-shot examples for different diagram types.
 * These templates guide AI models to generate accurate diagram DSL.
 */

import type { DiagramType, DiagramDomain, SpecialtyPromptSet, SpecialtyContext } from '../types';

// =============================================================================
// SYSTEM PROMPTS
// =============================================================================

/**
 * Base system prompt for diagram generation
 */
export const BASE_SYSTEM_PROMPT = `You are an expert diagram generator for scientific and technical illustrations.
Your role is to convert natural language descriptions into precise diagram specifications.

Guidelines:
- Generate clean, well-structured diagrams
- Use appropriate visual hierarchy
- Follow scientific visualization best practices
- Ensure accessibility with clear labels and adequate contrast
- Keep diagrams focused and uncluttered`;

/**
 * System prompt for Mermaid diagram generation
 */
export const MERMAID_SYSTEM_PROMPT = `${BASE_SYSTEM_PROMPT}

You generate Mermaid.js DSL for flowcharts, sequence diagrams, and state diagrams.

Mermaid Syntax Guidelines:
- Use 'flowchart TB' for top-to-bottom flowcharts
- Use 'flowchart LR' for left-to-right flowcharts
- Node syntax: A["Label"] for rectangles, A{"Label"} for diamonds, A(["Label"]) for stadiums
- Arrow syntax: --> for solid arrows, -.-> for dashed arrows
- Use subgraphs for grouping related nodes
- Apply classDef for consistent styling

Always output valid Mermaid DSL that renders without errors.`;

/**
 * System prompt for direct SVG generation
 */
export const SVG_SYSTEM_PROMPT = `${BASE_SYSTEM_PROMPT}

You generate direct SVG code for custom diagrams that don't fit standard DSL patterns.

SVG Guidelines:
- Include proper viewBox for scalability
- Use semantic group elements (<g>) for logical sections
- Apply consistent stroke and fill colors
- Add appropriate text labels with proper anchoring
- Ensure the diagram is self-contained with no external dependencies

Always output valid, well-formed SVG that displays correctly.`;

// =============================================================================
// DOMAIN-SPECIFIC PROMPTS
// =============================================================================

/**
 * Domain-specific prompt additions
 */
export const DOMAIN_PROMPTS: Record<DiagramDomain, string> = {
  medicine: `
Medical diagram requirements:
- Follow CONSORT, PRISMA, or STROBE guidelines where applicable
- Use standard medical terminology
- Include appropriate sample sizes (n=) where relevant
- Maintain patient confidentiality in examples
- Use color coding consistent with medical publications`,

  biology: `
Biology diagram requirements:
- Use proper biological nomenclature
- Follow conventions for pathway diagrams
- Include scale bars where appropriate
- Use standard symbols for cellular components
- Maintain directional conventions (5' to 3', etc.)`,

  chemistry: `
Chemistry diagram requirements:
- Use IUPAC nomenclature
- Follow standard reaction arrow conventions
- Include proper molecular representations
- Use appropriate bonding symbols
- Maintain stereochemistry conventions`,

  physics: `
Physics diagram requirements:
- Include proper unit labels
- Use standard vector notation
- Follow conventional force diagram rules
- Include reference frames where needed
- Maintain scale consistency`,

  engineering: `
Engineering diagram requirements:
- Use standard engineering symbols
- Include proper dimensions and tolerances
- Follow industry-specific conventions
- Maintain consistent line weights
- Use appropriate annotation styles`,

  'computer-science': `
Computer science diagram requirements:
- Use standard algorithm notation
- Follow UML conventions where appropriate
- Include complexity annotations where relevant
- Use consistent data structure representations
- Maintain code-style consistency`,

  statistics: `
Statistics diagram requirements:
- Include proper axis labels and units
- Show confidence intervals where appropriate
- Use standard statistical notation
- Include sample sizes and p-values
- Follow publication-quality chart guidelines`,

  general: `
General diagram requirements:
- Maintain clarity and simplicity
- Use intuitive visual metaphors
- Include clear labels
- Ensure logical flow
- Use accessible color schemes`,
};

// =============================================================================
// DIAGRAM TYPE PROMPTS
// =============================================================================

/**
 * Type-specific prompt additions
 */
export const TYPE_PROMPTS: Partial<Record<DiagramType, string>> = {
  consort: `
CONSORT Flow Diagram requirements:
- Include all four phases: Enrollment, Allocation, Follow-up, Analysis
- Show exclusion reasons with counts
- Track both intervention and control arms
- Include discontinuation and loss to follow-up
- Reference: CONSORT 2010 Statement`,

  prisma: `
PRISMA Flow Diagram requirements:
- Include Identification, Screening, Eligibility, Included phases
- Show database sources with record counts
- Track duplicate removal
- Include exclusion reasons at each stage
- Reference: PRISMA 2020 Statement`,

  'decision-tree': `
Decision Tree requirements:
- Clear decision nodes with yes/no branches
- Terminal nodes for outcomes
- Probability or likelihood annotations where appropriate
- Logical left-to-right or top-to-bottom flow
- Clear action recommendations at endpoints`,

  'state-diagram': `
State Diagram requirements:
- Clear initial and terminal states
- Labeled transitions between states
- Include trigger conditions on transitions
- Show self-loops for recurring events
- Use standard state machine notation`,

  flowchart: `
Flowchart requirements:
- Use appropriate shapes: rectangles for processes, diamonds for decisions
- Maintain consistent flow direction
- Include start and end terminators
- Label all decision branches
- Keep connector lines clean and non-crossing where possible`,

  sequence: `
Sequence Diagram requirements:
- Clear participant/actor definitions
- Properly ordered message flows
- Include activation bars for long operations
- Show return messages where appropriate
- Use notes for clarification`,

  pathway: `
Pathway Diagram requirements:
- Show molecular/cellular components
- Include activation and inhibition arrows
- Use standard pathway notation
- Group related components
- Include feedback loops where present`,
};

// =============================================================================
// FEW-SHOT EXAMPLES
// =============================================================================

/**
 * Few-shot examples for different diagram types
 */
export const FEW_SHOT_EXAMPLES: Partial<Record<DiagramType, FewShotExample[]>> = {
  flowchart: [
    {
      prompt: 'Create a simple process flowchart for user registration',
      output: `flowchart TB
    start(["Start"])
    input["User enters email and password"]
    validate{"Valid input?"}
    checkExists{"Email exists?"}
    createAccount["Create account"]
    sendEmail["Send verification email"]
    error1["Show validation error"]
    error2["Show 'email exists' error"]
    success(["Registration complete"])

    start --> input
    input --> validate
    validate -->|No| error1
    validate -->|Yes| checkExists
    checkExists -->|Yes| error2
    checkExists -->|No| createAccount
    createAccount --> sendEmail
    sendEmail --> success
    error1 --> input
    error2 --> input`,
    },
    {
      prompt: 'Make a flowchart showing data processing pipeline',
      output: `flowchart LR
    subgraph input["Data Input"]
        A["Raw Data"]
        B["Data Validation"]
    end

    subgraph processing["Processing"]
        C["Data Cleaning"]
        D["Transformation"]
        E["Feature Engineering"]
    end

    subgraph output["Output"]
        F["Model Input"]
        G["Data Warehouse"]
    end

    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    E --> G`,
    },
  ],

  consort: [
    {
      prompt: 'Create a CONSORT diagram for a randomized trial with 200 participants',
      output: `flowchart TB
    subgraph enrollment["Enrollment"]
        assessed["Assessed for eligibility<br/>(n=250)"]
        excluded["Excluded (n=50)<br/>Not meeting criteria (n=30)<br/>Declined (n=15)<br/>Other (n=5)"]
    end

    randomized["Randomized<br/>(n=200)"]

    subgraph allocation["Allocation"]
        intervention["Allocated to intervention (n=100)<br/>Received intervention (n=98)<br/>Did not receive (n=2)"]
        control["Allocated to control (n=100)<br/>Received control (n=99)<br/>Did not receive (n=1)"]
    end

    subgraph followup["Follow-up"]
        fuIntervention["Lost to follow-up (n=5)<br/>Discontinued (n=3)"]
        fuControl["Lost to follow-up (n=4)<br/>Discontinued (n=2)"]
    end

    subgraph analysis["Analysis"]
        analysisIntervention["Analyzed (n=92)<br/>Excluded (n=8)"]
        analysisControl["Analyzed (n=94)<br/>Excluded (n=6)"]
    end

    assessed --> excluded
    assessed --> randomized
    randomized --> intervention
    randomized --> control
    intervention --> fuIntervention
    control --> fuControl
    fuIntervention --> analysisIntervention
    fuControl --> analysisControl`,
    },
  ],

  'decision-tree': [
    {
      prompt: 'Create a clinical decision tree for chest pain evaluation',
      output: `flowchart TB
    start(["Patient presents with chest pain"])

    q1{"STEMI on ECG?"}
    q2{"High-risk features?"}
    q3{"Troponin elevated?"}
    q4{"ACS likely?"}

    a1["Activate cath lab<br/>Emergent PCI"]
    a2["Admit to CCU<br/>Anticoagulation"]
    a3["Serial troponins<br/>Observation"]
    a4["Risk stratify<br/>Stress testing"]
    a5["Consider non-cardiac causes"]

    start --> q1
    q1 -->|Yes| a1
    q1 -->|No| q2
    q2 -->|Yes| a2
    q2 -->|No| q3
    q3 -->|Yes| a2
    q3 -->|No| q4
    q4 -->|Yes| a3
    q4 -->|No| a5

    classDef emergency fill:#fee2e2,stroke:#dc2626
    classDef admit fill:#fef3c7,stroke:#d97706
    classDef observe fill:#d1fae5,stroke:#059669

    class a1 emergency
    class a2 admit
    class a3,a4,a5 observe`,
    },
  ],

  sequence: [
    {
      prompt: 'Create a patient journey sequence diagram for clinic visit',
      output: `sequenceDiagram
    participant P as Patient
    participant R as Reception
    participant N as Nurse
    participant D as Doctor
    participant L as Lab

    P->>R: Arrives for appointment
    R->>R: Verify insurance
    R-->>P: Confirm copay

    R->>N: Patient ready
    N->>P: Vital signs
    N->>N: Update chart

    N->>D: Patient in room
    D->>P: History & examination

    alt Lab work needed
        D->>L: Order tests
        P->>L: Blood draw
        L-->>D: Results
    end

    D->>P: Discuss findings
    D->>P: Treatment plan
    D-->>R: Schedule follow-up
    R-->>P: Appointment confirmed`,
    },
  ],
};

/**
 * Few-shot example structure
 */
export interface FewShotExample {
  prompt: string;
  output: string;
  /** Optional explanation of why this output is appropriate */
  reasoning?: string;
}

// =============================================================================
// MODIFICATION PROMPTS
// =============================================================================

/**
 * Prompts for diagram modification requests
 */
export const MODIFICATION_PROMPTS = {
  addNode: `Add a new node to the existing diagram.
Identify the appropriate location based on the description.
Connect it to relevant existing nodes.
Maintain the diagram's visual consistency.`,

  removeNode: `Remove the specified node from the diagram.
Update connections to maintain flow.
Consider if any orphaned nodes need to be handled.`,

  updateLabel: `Update the label of the specified element.
Preserve formatting and styling.
Ensure the new label fits appropriately.`,

  changeStyle: `Modify the visual style of the diagram.
Apply changes consistently across similar elements.
Maintain readability and accessibility.`,

  restructure: `Reorganize the diagram structure.
Maintain all existing information.
Improve visual clarity and logical flow.`,
};

// =============================================================================
// PROMPT BUILDER
// =============================================================================

/**
 * Build a complete prompt for diagram generation
 */
export function buildPrompt(params: {
  userPrompt: string;
  diagramType?: DiagramType;
  domain?: DiagramDomain;
  backend?: 'mermaid' | 'svg';
  isModification?: boolean;
  existingDiagram?: string;
  conversationContext?: string;
}): string {
  const {
    userPrompt,
    diagramType,
    domain = 'general',
    backend = 'mermaid',
    isModification = false,
    existingDiagram,
    conversationContext,
  } = params;

  const parts: string[] = [];

  // Add base system prompt
  parts.push(backend === 'mermaid' ? MERMAID_SYSTEM_PROMPT : SVG_SYSTEM_PROMPT);

  // Add domain-specific guidance
  parts.push(DOMAIN_PROMPTS[domain]);

  // Add type-specific guidance
  if (diagramType && TYPE_PROMPTS[diagramType]) {
    parts.push(TYPE_PROMPTS[diagramType]!);
  }

  // Add conversation context if available
  if (conversationContext) {
    parts.push(`\nPrevious context:\n${conversationContext}`);
  }

  // Add existing diagram for modifications
  if (isModification && existingDiagram) {
    parts.push(`\nExisting diagram to modify:\n\`\`\`\n${existingDiagram}\n\`\`\``);
  }

  // Add few-shot examples if available
  if (diagramType && FEW_SHOT_EXAMPLES[diagramType]) {
    const examples = FEW_SHOT_EXAMPLES[diagramType]!;
    parts.push('\nExamples:');
    for (const example of examples.slice(0, 2)) {
      parts.push(`\nUser: ${example.prompt}\nAssistant:\n\`\`\`mermaid\n${example.output}\n\`\`\``);
    }
  }

  // Add the user's actual prompt
  parts.push(`\nUser request: ${userPrompt}`);
  parts.push('\nGenerate the diagram code:');

  return parts.join('\n');
}

/**
 * Extract DSL code from AI response
 */
export function extractDSL(response: string): string | null {
  // Try to extract from code blocks
  const codeBlockMatch = response.match(/```(?:mermaid|svg|xml)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }

  // Try to extract Mermaid DSL directly
  const mermaidPatterns = [
    /^(flowchart\s+(?:TB|BT|LR|RL)[\s\S]*)/m,
    /^(sequenceDiagram[\s\S]*)/m,
    /^(stateDiagram[\s\S]*)/m,
    /^(graph\s+(?:TB|BT|LR|RL)[\s\S]*)/m,
  ];

  for (const pattern of mermaidPatterns) {
    const match = response.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  // Try to extract SVG directly
  const svgMatch = response.match(/(<svg[\s\S]*<\/svg>)/);
  if (svgMatch) {
    return svgMatch[1].trim();
  }

  return null;
}

/**
 * Validate that extracted content is valid DSL
 */
export function isValidDSL(content: string): { valid: boolean; type: 'mermaid' | 'svg' | 'unknown' } {
  const trimmed = content.trim();

  // Check for Mermaid DSL
  if (
    trimmed.startsWith('flowchart') ||
    trimmed.startsWith('graph') ||
    trimmed.startsWith('sequenceDiagram') ||
    trimmed.startsWith('stateDiagram') ||
    trimmed.startsWith('classDiagram') ||
    trimmed.startsWith('erDiagram') ||
    trimmed.startsWith('pie') ||
    trimmed.startsWith('gantt')
  ) {
    return { valid: true, type: 'mermaid' };
  }

  // Check for SVG
  if (trimmed.startsWith('<svg') && trimmed.endsWith('</svg>')) {
    return { valid: true, type: 'svg' };
  }

  return { valid: false, type: 'unknown' };
}

// =============================================================================
// SPECIALTY REGISTRY
// =============================================================================

// Import specialty exports for the registry
import { CARDIOLOGY_DOMAIN_PROMPT, CARDIOLOGY_PROMPTS, CARDIOLOGY_FEW_SHOT_EXAMPLES } from './cardiology-prompts';
import { NEUROLOGY_DOMAIN_PROMPT, NEUROLOGY_PROMPTS, NEUROLOGY_FEW_SHOT_EXAMPLES } from './neurology-prompts';
import { PULMONOLOGY_DOMAIN_PROMPT, PULMONOLOGY_PROMPTS, PULMONOLOGY_FEW_SHOT_EXAMPLES } from './pulmonology-prompts';
import { EMERGENCY_MEDICINE_DOMAIN_PROMPT, EMERGENCY_MEDICINE_PROMPTS, EMERGENCY_MEDICINE_FEW_SHOT_EXAMPLES } from './emergency-medicine-prompts';
import { GASTROENTEROLOGY_DOMAIN_PROMPT, GASTROENTEROLOGY_PROMPTS, GASTROENTEROLOGY_FEW_SHOT_EXAMPLES } from './gastroenterology-prompts';
import { NEPHROLOGY_DOMAIN_PROMPT, NEPHROLOGY_PROMPTS, NEPHROLOGY_FEW_SHOT_EXAMPLES } from './nephrology-prompts';
import { INFECTIOUS_DISEASE_DOMAIN_PROMPT, INFECTIOUS_DISEASE_PROMPTS, INFECTIOUS_DISEASE_FEW_SHOT_EXAMPLES } from './infectious-disease-prompts';
import { ENDOCRINOLOGY_DOMAIN_PROMPT, ENDOCRINOLOGY_PROMPTS, ENDOCRINOLOGY_FEW_SHOT_EXAMPLES } from './endocrinology-prompts';
import { ORTHOPEDICS_DOMAIN_PROMPT, ORTHOPEDICS_PROMPTS, ORTHOPEDICS_FEW_SHOT_EXAMPLES } from './orthopedics-prompts';
import { ANESTHESIOLOGY_DOMAIN_PROMPT, ANESTHESIOLOGY_PROMPTS, ANESTHESIOLOGY_FEW_SHOT_EXAMPLES } from './anesthesiology-prompts';
import { RADIOLOGY_DOMAIN_PROMPT, RADIOLOGY_PROMPTS, RADIOLOGY_FEW_SHOT_EXAMPLES } from './radiology-prompts';
import { OPHTHALMOLOGY_DOMAIN_PROMPT, OPHTHALMOLOGY_PROMPTS, OPHTHALMOLOGY_FEW_SHOT_EXAMPLES } from './ophthalmology-prompts';
import { DERMATOLOGY_DOMAIN_PROMPT, DERMATOLOGY_PROMPTS, DERMATOLOGY_FEW_SHOT_EXAMPLES } from './dermatology-prompts';
import { ENT_DOMAIN_PROMPT, ENT_PROMPTS, ENT_FEW_SHOT_EXAMPLES } from './ent-prompts';
import { PEDIATRICS_DOMAIN_PROMPT, PEDIATRICS_PROMPTS, PEDIATRICS_FEW_SHOT_EXAMPLES } from './pediatrics-prompts';
import { OBGYN_DOMAIN_PROMPT, OBGYN_PROMPTS, OBGYN_FEW_SHOT_EXAMPLES } from './obgyn-prompts';
import { PSYCHIATRY_DOMAIN_PROMPT, PSYCHIATRY_PROMPTS, PSYCHIATRY_FEW_SHOT_EXAMPLES } from './psychiatry-prompts';
import { RHEUMATOLOGY_DOMAIN_PROMPT, RHEUMATOLOGY_PROMPTS, RHEUMATOLOGY_FEW_SHOT_EXAMPLES } from './rheumatology-prompts';
import { PATHOLOGY_DOMAIN_PROMPT, PATHOLOGY_PROMPTS, PATHOLOGY_FEW_SHOT_EXAMPLES } from './pathology-prompts';
import { PHYSIOLOGY_DOMAIN_PROMPT, PHYSIOLOGY_PROMPTS, PHYSIOLOGY_FEW_SHOT_EXAMPLES } from './physiology-prompts';
import { BIOCHEMISTRY_DOMAIN_PROMPT, BIOCHEMISTRY_PROMPTS, BIOCHEMISTRY_FEW_SHOT_EXAMPLES } from './biochemistry-prompts';
import { MATHEMATICS_DOMAIN_PROMPT, MATHEMATICS_PROMPTS, MATHEMATICS_FEW_SHOT_EXAMPLES } from './mathematics-prompts';
import { MOLECULAR_BIOLOGY_DOMAIN_PROMPT, MOLECULAR_BIOLOGY_PROMPTS, MOLECULAR_BIOLOGY_FEW_SHOT_EXAMPLES } from './molecular-biology-prompts';
import { ENGINEERING_DOMAIN_PROMPT, ENGINEERING_PROMPTS, ENGINEERING_FEW_SHOT_EXAMPLES } from './engineering-prompts';
import { BIOMEDICAL_ENGINEERING_DOMAIN_PROMPT, BIOMEDICAL_ENGINEERING_PROMPTS, BIOMEDICAL_ENGINEERING_FEW_SHOT_EXAMPLES } from './biomedical-engineering-prompts';
import { COMPUTER_SCIENCE_DOMAIN_PROMPT, computerSciencePrompts } from './computer-science-prompts';
import { PHARMACOLOGY_DOMAIN_PROMPT, PHARMACOLOGY_PROMPTS, PHARMACOLOGY_FEW_SHOT_EXAMPLES } from './pharmacology-prompts';
import { NEUROSCIENCE_DOMAIN_PROMPT, NEUROSCIENCE_PROMPTS, NEUROSCIENCE_FEW_SHOT_EXAMPLES } from './neuroscience-prompts';
import { CELL_BIOLOGY_DOMAIN_PROMPT, CELL_BIOLOGY_PROMPTS, CELL_BIOLOGY_FEW_SHOT_EXAMPLES } from './cell-biology-prompts';
import { CHEMISTRY_DOMAIN_PROMPT, CHEMISTRY_PROMPTS, CHEMISTRY_FEW_SHOT_EXAMPLES } from './chemistry-prompts';
import { PHYSICS_DOMAIN_PROMPT, PHYSICS_PROMPTS, PHYSICS_FEW_SHOT_EXAMPLES } from './physics-prompts';
import { MICROBIOLOGY_DOMAIN_PROMPT, MICROBIOLOGY_PROMPTS, MICROBIOLOGY_FEW_SHOT_EXAMPLES } from './microbiology-prompts';
import { ANATOMY_DOMAIN_PROMPT, ANATOMY_PROMPTS, ANATOMY_FEW_SHOT_EXAMPLES } from './anatomy-prompts';
import { BIOLOGY_DOMAIN_PROMPT, BIOLOGY_PROMPTS, BIOLOGY_FEW_SHOT_EXAMPLES } from './biology-prompts';
import { AEROSPACE_DOMAIN_PROMPT, AEROSPACE_PROMPTS, AEROSPACE_FEW_SHOT_EXAMPLES } from './aerospace-prompts';
import { AGRICULTURE_DOMAIN_PROMPT, AGRICULTURE_PROMPTS, AGRICULTURE_FEW_SHOT_EXAMPLES } from './agriculture-prompts';
import { FORENSICS_DOMAIN_PROMPT, FORENSICS_PROMPTS, FORENSICS_FEW_SHOT_EXAMPLES } from './forensics-prompts';
import { GEOLOGY_DOMAIN_PROMPT, GEOLOGY_PROMPTS, GEOLOGY_FEW_SHOT_EXAMPLES } from './geology-prompts';
import { ASTRONOMY_DOMAIN_PROMPT, ASTRONOMY_PROMPTS, ASTRONOMY_FEW_SHOT_EXAMPLES } from './astronomy-prompts';
import { ECOLOGY_DOMAIN_PROMPT, ECOLOGY_PROMPTS, ECOLOGY_FEW_SHOT_EXAMPLES } from './ecology-prompts';
import { METEOROLOGY_DOMAIN_PROMPT, METEOROLOGY_PROMPTS, METEOROLOGY_FEW_SHOT_EXAMPLES } from './meteorology-prompts';
import { OCEANOGRAPHY_DOMAIN_PROMPT, OCEANOGRAPHY_PROMPTS, OCEANOGRAPHY_FEW_SHOT_EXAMPLES } from './oceanography-prompts';
import { BOTANY_DOMAIN_PROMPT, BOTANY_PROMPTS, BOTANY_FEW_SHOT_EXAMPLES } from './botany-prompts';
import { ZOOLOGY_DOMAIN_PROMPT, ZOOLOGY_PROMPTS, ZOOLOGY_FEW_SHOT_EXAMPLES } from './zoology-prompts';
import { HEMATOLOGY_ONCOLOGY_SYSTEM_PROMPT, HEMATOLOGY_ONCOLOGY_TYPE_PROMPTS, HEMATOLOGY_ONCOLOGY_EXAMPLES } from './hematology-oncology-prompts';

/**
 * Registry mapping specialty names to their prompt data.
 * Connects the 45+ existing specialty prompt files.
 */
export const SPECIALTY_REGISTRY: Record<string, SpecialtyPromptSet> = {
  cardiology: { domainPrompt: CARDIOLOGY_DOMAIN_PROMPT, prompts: CARDIOLOGY_PROMPTS, examples: CARDIOLOGY_FEW_SHOT_EXAMPLES },
  neurology: { domainPrompt: NEUROLOGY_DOMAIN_PROMPT, prompts: NEUROLOGY_PROMPTS, examples: NEUROLOGY_FEW_SHOT_EXAMPLES },
  pulmonology: { domainPrompt: PULMONOLOGY_DOMAIN_PROMPT, prompts: PULMONOLOGY_PROMPTS, examples: PULMONOLOGY_FEW_SHOT_EXAMPLES },
  'emergency-medicine': { domainPrompt: EMERGENCY_MEDICINE_DOMAIN_PROMPT, prompts: EMERGENCY_MEDICINE_PROMPTS, examples: EMERGENCY_MEDICINE_FEW_SHOT_EXAMPLES },
  gastroenterology: { domainPrompt: GASTROENTEROLOGY_DOMAIN_PROMPT, prompts: GASTROENTEROLOGY_PROMPTS, examples: GASTROENTEROLOGY_FEW_SHOT_EXAMPLES },
  nephrology: { domainPrompt: NEPHROLOGY_DOMAIN_PROMPT, prompts: NEPHROLOGY_PROMPTS, examples: NEPHROLOGY_FEW_SHOT_EXAMPLES },
  'infectious-disease': { domainPrompt: INFECTIOUS_DISEASE_DOMAIN_PROMPT, prompts: INFECTIOUS_DISEASE_PROMPTS, examples: INFECTIOUS_DISEASE_FEW_SHOT_EXAMPLES },
  endocrinology: { domainPrompt: ENDOCRINOLOGY_DOMAIN_PROMPT, prompts: ENDOCRINOLOGY_PROMPTS, examples: ENDOCRINOLOGY_FEW_SHOT_EXAMPLES },
  orthopedics: { domainPrompt: ORTHOPEDICS_DOMAIN_PROMPT, prompts: ORTHOPEDICS_PROMPTS, examples: ORTHOPEDICS_FEW_SHOT_EXAMPLES },
  anesthesiology: { domainPrompt: ANESTHESIOLOGY_DOMAIN_PROMPT, prompts: ANESTHESIOLOGY_PROMPTS, examples: ANESTHESIOLOGY_FEW_SHOT_EXAMPLES },
  radiology: { domainPrompt: RADIOLOGY_DOMAIN_PROMPT, prompts: RADIOLOGY_PROMPTS, examples: RADIOLOGY_FEW_SHOT_EXAMPLES },
  ophthalmology: { domainPrompt: OPHTHALMOLOGY_DOMAIN_PROMPT, prompts: OPHTHALMOLOGY_PROMPTS, examples: OPHTHALMOLOGY_FEW_SHOT_EXAMPLES },
  dermatology: { domainPrompt: DERMATOLOGY_DOMAIN_PROMPT, prompts: DERMATOLOGY_PROMPTS, examples: DERMATOLOGY_FEW_SHOT_EXAMPLES },
  ent: { domainPrompt: ENT_DOMAIN_PROMPT, prompts: ENT_PROMPTS, examples: ENT_FEW_SHOT_EXAMPLES },
  pediatrics: { domainPrompt: PEDIATRICS_DOMAIN_PROMPT, prompts: PEDIATRICS_PROMPTS, examples: PEDIATRICS_FEW_SHOT_EXAMPLES },
  obgyn: { domainPrompt: OBGYN_DOMAIN_PROMPT, prompts: OBGYN_PROMPTS, examples: OBGYN_FEW_SHOT_EXAMPLES },
  psychiatry: { domainPrompt: PSYCHIATRY_DOMAIN_PROMPT, prompts: PSYCHIATRY_PROMPTS, examples: PSYCHIATRY_FEW_SHOT_EXAMPLES },
  rheumatology: { domainPrompt: RHEUMATOLOGY_DOMAIN_PROMPT, prompts: RHEUMATOLOGY_PROMPTS, examples: RHEUMATOLOGY_FEW_SHOT_EXAMPLES },
  pathology: { domainPrompt: PATHOLOGY_DOMAIN_PROMPT, prompts: PATHOLOGY_PROMPTS, examples: PATHOLOGY_FEW_SHOT_EXAMPLES },
  physiology: { domainPrompt: PHYSIOLOGY_DOMAIN_PROMPT, prompts: PHYSIOLOGY_PROMPTS, examples: PHYSIOLOGY_FEW_SHOT_EXAMPLES },
  biochemistry: { domainPrompt: BIOCHEMISTRY_DOMAIN_PROMPT, prompts: BIOCHEMISTRY_PROMPTS, examples: BIOCHEMISTRY_FEW_SHOT_EXAMPLES },
  mathematics: { domainPrompt: MATHEMATICS_DOMAIN_PROMPT, prompts: MATHEMATICS_PROMPTS, examples: MATHEMATICS_FEW_SHOT_EXAMPLES },
  'molecular-biology': { domainPrompt: MOLECULAR_BIOLOGY_DOMAIN_PROMPT, prompts: MOLECULAR_BIOLOGY_PROMPTS, examples: MOLECULAR_BIOLOGY_FEW_SHOT_EXAMPLES },
  engineering: { domainPrompt: ENGINEERING_DOMAIN_PROMPT, prompts: ENGINEERING_PROMPTS, examples: ENGINEERING_FEW_SHOT_EXAMPLES },
  'biomedical-engineering': { domainPrompt: BIOMEDICAL_ENGINEERING_DOMAIN_PROMPT, prompts: BIOMEDICAL_ENGINEERING_PROMPTS, examples: BIOMEDICAL_ENGINEERING_FEW_SHOT_EXAMPLES },
  'computer-science': { domainPrompt: COMPUTER_SCIENCE_DOMAIN_PROMPT, prompts: computerSciencePrompts as unknown as Record<string, string>, examples: [] },
  pharmacology: { domainPrompt: PHARMACOLOGY_DOMAIN_PROMPT, prompts: PHARMACOLOGY_PROMPTS, examples: PHARMACOLOGY_FEW_SHOT_EXAMPLES },
  neuroscience: { domainPrompt: NEUROSCIENCE_DOMAIN_PROMPT, prompts: NEUROSCIENCE_PROMPTS, examples: NEUROSCIENCE_FEW_SHOT_EXAMPLES },
  'cell-biology': { domainPrompt: CELL_BIOLOGY_DOMAIN_PROMPT, prompts: CELL_BIOLOGY_PROMPTS, examples: CELL_BIOLOGY_FEW_SHOT_EXAMPLES },
  chemistry: { domainPrompt: CHEMISTRY_DOMAIN_PROMPT, prompts: CHEMISTRY_PROMPTS, examples: CHEMISTRY_FEW_SHOT_EXAMPLES },
  physics: { domainPrompt: PHYSICS_DOMAIN_PROMPT, prompts: PHYSICS_PROMPTS, examples: PHYSICS_FEW_SHOT_EXAMPLES },
  microbiology: { domainPrompt: MICROBIOLOGY_DOMAIN_PROMPT, prompts: MICROBIOLOGY_PROMPTS, examples: MICROBIOLOGY_FEW_SHOT_EXAMPLES },
  anatomy: { domainPrompt: ANATOMY_DOMAIN_PROMPT, prompts: ANATOMY_PROMPTS, examples: ANATOMY_FEW_SHOT_EXAMPLES },
  biology: { domainPrompt: BIOLOGY_DOMAIN_PROMPT, prompts: BIOLOGY_PROMPTS, examples: BIOLOGY_FEW_SHOT_EXAMPLES },
  aerospace: { domainPrompt: AEROSPACE_DOMAIN_PROMPT, prompts: AEROSPACE_PROMPTS, examples: AEROSPACE_FEW_SHOT_EXAMPLES },
  agriculture: { domainPrompt: AGRICULTURE_DOMAIN_PROMPT, prompts: AGRICULTURE_PROMPTS, examples: AGRICULTURE_FEW_SHOT_EXAMPLES },
  forensics: { domainPrompt: FORENSICS_DOMAIN_PROMPT, prompts: FORENSICS_PROMPTS, examples: FORENSICS_FEW_SHOT_EXAMPLES },
  geology: { domainPrompt: GEOLOGY_DOMAIN_PROMPT, prompts: GEOLOGY_PROMPTS, examples: GEOLOGY_FEW_SHOT_EXAMPLES },
  astronomy: { domainPrompt: ASTRONOMY_DOMAIN_PROMPT, prompts: ASTRONOMY_PROMPTS, examples: ASTRONOMY_FEW_SHOT_EXAMPLES },
  ecology: { domainPrompt: ECOLOGY_DOMAIN_PROMPT, prompts: ECOLOGY_PROMPTS, examples: ECOLOGY_FEW_SHOT_EXAMPLES },
  meteorology: { domainPrompt: METEOROLOGY_DOMAIN_PROMPT, prompts: METEOROLOGY_PROMPTS, examples: METEOROLOGY_FEW_SHOT_EXAMPLES },
  oceanography: { domainPrompt: OCEANOGRAPHY_DOMAIN_PROMPT, prompts: OCEANOGRAPHY_PROMPTS, examples: OCEANOGRAPHY_FEW_SHOT_EXAMPLES },
  botany: { domainPrompt: BOTANY_DOMAIN_PROMPT, prompts: BOTANY_PROMPTS, examples: BOTANY_FEW_SHOT_EXAMPLES },
  zoology: { domainPrompt: ZOOLOGY_DOMAIN_PROMPT, prompts: ZOOLOGY_PROMPTS, examples: ZOOLOGY_FEW_SHOT_EXAMPLES },
  'hematology-oncology': { domainPrompt: HEMATOLOGY_ONCOLOGY_SYSTEM_PROMPT, prompts: HEMATOLOGY_ONCOLOGY_TYPE_PROMPTS, examples: Object.values(HEMATOLOGY_ONCOLOGY_EXAMPLES) as FewShotExample[] },
};

/**
 * Look up specialty prompt data by detected specialty name.
 * Returns undefined if specialty not in registry.
 */
export function getSpecialtyContext(specialty: string): SpecialtyContext | undefined {
  const entry = SPECIALTY_REGISTRY[specialty.toLowerCase()];
  if (!entry) return undefined;
  return {
    specialty: specialty.toLowerCase(),
    domainPrompt: entry.domainPrompt,
    relevantExamples: entry.examples.slice(0, 3),
    relevantPrompts: entry.prompts,
  };
}

// =============================================================================
// SPECIALTY PROMPTS EXPORTS
// =============================================================================

export * from './pulmonology-prompts';
export { default as pulmonologyPrompts } from './pulmonology-prompts';

export * from './emergency-medicine-prompts';
export { default as emergencyMedicinePrompts } from './emergency-medicine-prompts';

export * from './endocrinology-prompts';
export { default as endocrinologyPrompts } from './endocrinology-prompts';

export * from './gastroenterology-prompts';
export { default as gastroenterologyPrompts } from './gastroenterology-prompts';

export * from './neurology-prompts';
export { default as neurologyPrompts } from './neurology-prompts';

export * from './nephrology-prompts';
export { default as nephrologyPrompts } from './nephrology-prompts';

export * from './infectious-disease-prompts';
export { default as infectiousDiseasePrompts } from './infectious-disease-prompts';

export * from './hematology-oncology-prompts';
export { default as hematologyOncologyPrompts } from './hematology-oncology-prompts';

export * from './orthopedics-prompts';
export { default as orthopedicsPrompts } from './orthopedics-prompts';

export * from './anesthesiology-prompts';
export { default as anesthesiologyPrompts } from './anesthesiology-prompts';

export * from './radiology-prompts';
export { default as radiologyPrompts } from './radiology-prompts';

export * from './ophthalmology-prompts';
export { default as ophthalmologyPrompts } from './ophthalmology-prompts';

export * from './ent-prompts';
export { default as entPrompts } from './ent-prompts';

export * from './dermatology-prompts';
export { default as dermatologyPrompts } from './dermatology-prompts';

export * from './physiology-prompts';
export { default as physiologyPrompts } from './physiology-prompts';

export * from './biochemistry-prompts';
export { default as biochemistryPrompts } from './biochemistry-prompts';

export * from './pharmacology-prompts';
export { default as pharmacologyPrompts } from './pharmacology-prompts';

export * from './rheumatology-prompts';
export { default as rheumatologyPrompts } from './rheumatology-prompts';

export * from './biology-prompts';
export { default as biologyPrompts } from './biology-prompts';

export * from './cell-biology-prompts';
export { default as cellBiologyPrompts } from './cell-biology-prompts';

export * from './psychiatry-prompts';
export { default as psychiatryPrompts } from './psychiatry-prompts';

export * from './computer-science-prompts';
export { default as computerSciencePrompts } from './computer-science-prompts';

export * from './engineering-prompts';
export { default as engineeringPrompts } from './engineering-prompts';

export * from './molecular-biology-prompts';
export { default as molecularBiologyPrompts } from './molecular-biology-prompts';

export * from './mathematics-prompts';
export { default as mathematicsPrompts } from './mathematics-prompts';

export * from './neuroscience-prompts';
export { default as neurosciencePrompts } from './neuroscience-prompts';

export * from './biomedical-engineering-prompts';
export { default as biomedicalEngineeringPrompts } from './biomedical-engineering-prompts';

export * from './microbiology-prompts';
export { default as microbiologyPrompts } from './microbiology-prompts';

export * from './anatomy-prompts';
export { default as anatomyPrompts } from './anatomy-prompts';

export * from './physics-prompts';
export { default as physicsPrompts } from './physics-prompts';

export * from './chemistry-prompts';
export { default as chemistryPrompts } from './chemistry-prompts';

export * from './obgyn-prompts';
export { default as obgynPrompts } from './obgyn-prompts';

export * from './cardiology-prompts';
export { default as cardiologyPrompts } from './cardiology-prompts';

export * from './aerospace-prompts';
export { default as aerospacePrompts } from './aerospace-prompts';

export * from './agriculture-prompts';
export { default as agriculturePrompts } from './agriculture-prompts';

export * from './forensics-prompts';
export { default as forensicsPrompts } from './forensics-prompts';

export * from './geology-prompts';
export { default as geologyPrompts } from './geology-prompts';

export * from './astronomy-prompts';
export { default as astronomyPrompts } from './astronomy-prompts';

export * from './ecology-prompts';
export { default as ecologyPrompts } from './ecology-prompts';

export * from './meteorology-prompts';
export { default as meteorologyPrompts } from './meteorology-prompts';

export * from './oceanography-prompts';
export { default as oceanographyPrompts } from './oceanography-prompts';

export * from './botany-prompts';
export { default as botanyPrompts } from './botany-prompts';

export * from './zoology-prompts';
export { default as zoologyPrompts } from './zoology-prompts';
