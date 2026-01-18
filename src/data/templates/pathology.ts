/**
 * pathology.ts
 * Pathology diagram templates for FINNISH
 *
 * Contains comprehensive templates for pathology and laboratory medicine including:
 * - Decision tree algorithms for tissue diagnosis
 * - Anatomical progression diagrams
 * - Laboratory workflow guides
 * - Data visualization templates
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// DECISION TREES
// =============================================================================

/**
 * Tissue Diagnosis Algorithm template
 */
export const tissueDiagnosisAlgorithm: DiagramTemplate = {
  id: 'path-tissue-diagnosis',
  name: 'Tissue Diagnosis Algorithm',
  description: 'Systematic approach to histopathological tissue diagnosis from specimen receipt to final report',
  domain: 'medicine',
  promptTemplate: `Create a tissue diagnosis algorithm flowchart:
- Specimen type: {{specimenType}}
- Clinical information: {{clinicalInfo}}
- Gross examination findings: {{grossFindings}}
- Microscopic features: {{microscopicFeatures}}
- Ancillary studies needed: {{ancillaryStudies}}
- Differential diagnoses: {{differentialDx}}
- Final diagnosis criteria: {{diagnosisCriteria}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'specimenType',
    'clinicalInfo',
    'grossFindings',
    'microscopicFeatures',
    'ancillaryStudies',
    'differentialDx',
    'diagnosisCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Receipt["Specimen Receipt"]
        A[("🔬 Specimen\\nReceived")] --> B["Gross Examination"]
    end
    subgraph Processing["Processing"]
        B --> C["Tissue Sampling"]
        C --> D["Processing & Embedding"]
        D --> E["H&E Staining"]
    end
    subgraph Microscopy["Microscopic Exam"]
        E --> F{"Pattern\\nRecognition"}
        F -->|"Epithelial"| G["Carcinoma Workup"]
        F -->|"Spindle"| H["Sarcoma Workup"]
        F -->|"Lymphoid"| I["Lymphoma Workup"]
    end
    subgraph Ancillary["Ancillary Studies"]
        G & H & I --> J["IHC Panel"]
        J --> K["Molecular Studies"]
    end
    K --> L["Final Diagnosis"]
    style L fill:#228B22,color:#fff`,
};

/**
 * Tumor Classification Algorithm template
 */
export const tumorClassificationAlgorithm: DiagramTemplate = {
  id: 'path-tumor-classification',
  name: 'Tumor Classification Algorithm',
  description: 'Systematic approach to classifying tumors as benign vs malignant with grading',
  domain: 'medicine',
  promptTemplate: `Create a tumor classification flowchart:
- Tumor location: {{tumorLocation}}
- Growth pattern: {{growthPattern}}
- Cytologic features: {{cytologicFeatures}}
- Mitotic activity: {{mitoticActivity}}
- Invasion markers: {{invasionMarkers}}
- Grading criteria: {{gradingCriteria}}
- Staging considerations: {{stagingConsiderations}}
{{#additionalNotes}}Special tumor types: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'tumorLocation',
    'growthPattern',
    'cytologicFeatures',
    'mitoticActivity',
    'invasionMarkers',
    'gradingCriteria',
    'stagingConsiderations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🔬 Tumor\\nIdentified")] --> B{"Encapsulated?"}
    B -->|"Yes"| C{"Uniform\\nCells?"}
    B -->|"No"| D{"Invasion\\nPresent?"}
    C -->|"Yes"| E["Benign"]
    C -->|"No"| F["Atypical - Workup"]
    D -->|"Yes"| G["Malignant"]
    D -->|"No"| F
    G --> H{"Differentiation"}
    H -->|"Well"| I["Grade 1"]
    H -->|"Moderate"| J["Grade 2"]
    H -->|"Poor"| K["Grade 3"]
    I & J & K --> L["TNM Staging"]
    style E fill:#228B22,color:#fff
    style G fill:#DC143C,color:#fff`,
};

/**
 * Inflammatory Pattern Recognition template
 */
export const inflammatoryPatternRecognition: DiagramTemplate = {
  id: 'path-inflammatory-pattern',
  name: 'Inflammatory Pattern Recognition',
  description: 'Algorithm for identifying and classifying inflammatory patterns in tissue',
  domain: 'medicine',
  promptTemplate: `Create an inflammatory pattern recognition flowchart:
- Tissue type: {{tissueType}}
- Cell infiltrate type: {{cellInfiltrate}}
- Distribution pattern: {{distributionPattern}}
- Associated changes: {{associatedChanges}}
- Granuloma features: {{granulomaFeatures}}
- Special stains needed: {{specialStains}}
- Differential diagnoses: {{differentialDx}}
{{#additionalNotes}}Infectious considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'tissueType',
    'cellInfiltrate',
    'distributionPattern',
    'associatedChanges',
    'granulomaFeatures',
    'specialStains',
    'differentialDx',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🔬 Inflammatory\\nInfiltrate")] --> B{"Predominant\\nCell Type?"}
    B -->|"Neutrophils"| C["Acute Inflammation"]
    B -->|"Lymphocytes"| D["Chronic Inflammation"]
    B -->|"Eosinophils"| E["Allergic/Parasitic"]
    B -->|"Granulomas"| F["Granulomatous"]
    C --> C1["Abscess?\\nPhlegmon?"]
    D --> D1["Plasma cells?\\nFollicles?"]
    F --> G{"Necrosis?"}
    G -->|"Caseous"| H["TB/Fungal"]
    G -->|"None"| I["Sarcoid/FB"]
    H --> J["AFB + GMS Stains"]
    style C fill:#DC143C,color:#fff
    style D fill:#4169E1,color:#fff`,
};

/**
 * Liver Biopsy Interpretation template
 */
export const liverBiopsyInterpretation: DiagramTemplate = {
  id: 'path-liver-biopsy',
  name: 'Liver Biopsy Interpretation',
  description: 'Systematic approach to liver biopsy evaluation including staging and grading',
  domain: 'medicine',
  promptTemplate: `Create a liver biopsy interpretation flowchart:
- Clinical indication: {{clinicalIndication}}
- Portal changes: {{portalChanges}}
- Lobular findings: {{lobularFindings}}
- Fibrosis assessment: {{fibrosisAssessment}}
- Steatosis grading: {{steatosisGrading}}
- Iron/copper evaluation: {{metalDeposition}}
- Staging system used: {{stagingSystem}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalIndication',
    'portalChanges',
    'lobularFindings',
    'fibrosisAssessment',
    'steatosisGrading',
    'metalDeposition',
    'stagingSystem',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🔬 Liver\\nBiopsy")] --> B["Adequacy Check"]
    B --> C["Portal Tract Exam"]
    B --> D["Lobular Exam"]
    C --> C1{"Inflammation?"}
    C1 -->|"Yes"| C2["Grade Activity"]
    D --> D1{"Steatosis?"}
    D1 -->|"Yes"| D2["Grade %"]
    C & D --> E["Fibrosis Assessment"]
    E --> F{"Pattern?"}
    F -->|"Portal"| G["Stage 1-2"]
    F -->|"Bridging"| H["Stage 3"]
    F -->|"Cirrhosis"| I["Stage 4"]
    G & H & I --> J["Trichrome Stain"]
    J --> K["Final Report"]
    style I fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff`,
};

/**
 * Lymph Node Evaluation template
 */
export const lymphNodeEvaluation: DiagramTemplate = {
  id: 'path-lymph-node-eval',
  name: 'Lymph Node Evaluation',
  description: 'Algorithm for systematic evaluation of lymph node pathology',
  domain: 'medicine',
  promptTemplate: `Create a lymph node evaluation flowchart:
- Clinical presentation: {{clinicalPresentation}}
- Architecture assessment: {{architectureAssessment}}
- Follicular pattern: {{follicularPattern}}
- Paracortex evaluation: {{paracortexEvaluation}}
- Sinus changes: {{sinusChanges}}
- IHC panel needed: {{ihcPanel}}
- Flow cytometry results: {{flowResults}}
{{#additionalNotes}}Staging implications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalPresentation',
    'architectureAssessment',
    'follicularPattern',
    'paracortexEvaluation',
    'sinusChanges',
    'ihcPanel',
    'flowResults',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🔬 Lymph Node\\nBiopsy")] --> B{"Architecture\\nPreserved?"}
    B -->|"Yes"| C["Reactive Hyperplasia"]
    B -->|"Effaced"| D{"Pattern?"}
    D -->|"Follicular"| E["FL vs Reactive"]
    D -->|"Diffuse"| F["DLBCL vs Other"]
    D -->|"Nodular"| G["HL vs NLPHL"]
    E --> H["IHC: CD10, BCL2, BCL6"]
    F --> I["IHC: CD20, CD3, Ki67"]
    G --> J["IHC: CD15, CD30, PAX5"]
    H & I & J --> K["Flow Cytometry"]
    K --> L{"Clonal?"}
    L -->|"Yes"| M["Lymphoma"]
    L -->|"No"| N["Reactive"]
    style M fill:#DC143C,color:#fff
    style N fill:#228B22,color:#fff`,
};

/**
 * Bone Marrow Assessment template
 */
export const boneMarrowAssessment: DiagramTemplate = {
  id: 'path-bone-marrow',
  name: 'Bone Marrow Assessment',
  description: 'Comprehensive bone marrow biopsy and aspirate evaluation algorithm',
  domain: 'medicine',
  promptTemplate: `Create a bone marrow assessment flowchart:
- Clinical indication: {{clinicalIndication}}
- Cellularity assessment: {{cellularity}}
- Trilineage hematopoiesis: {{trilineage}}
- Blast count: {{blastCount}}
- Dysplastic features: {{dysplasia}}
- Fibrosis grading: {{fibrosisGrade}}
- Ancillary studies: {{ancillaryStudies}}
{{#additionalNotes}}Cytogenetics/molecular: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalIndication',
    'cellularity',
    'trilineage',
    'blastCount',
    'dysplasia',
    'fibrosisGrade',
    'ancillaryStudies',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🔬 Bone Marrow\\nBiopsy + Aspirate")] --> B["Cellularity Assessment"]
    B --> C{"Age-Appropriate?"}
    C -->|"Hypo"| D["Aplastic?\\nMDS?"]
    C -->|"Hyper"| E["Neoplastic?"]
    C -->|"Normal"| F["Trilineage Eval"]
    E --> G{"Blast %?"}
    G -->|"<5%"| H["MPN vs Reactive"]
    G -->|"5-19%"| I["MDS vs MDS/MPN"]
    G -->|"≥20%"| J["Acute Leukemia"]
    J --> K{"Lineage?"}
    K -->|"Myeloid"| L["AML Workup"]
    K -->|"Lymphoid"| M["ALL Workup"]
    L & M --> N["Cytogenetics + Molecular"]
    style J fill:#DC143C,color:#fff
    style N fill:#4169E1,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS
// =============================================================================

/**
 * Cell Injury Progression template
 */
export const cellInjuryProgression: DiagramTemplate = {
  id: 'path-cell-injury',
  name: 'Cell Injury Progression',
  description: 'Diagram showing progression from reversible to irreversible cell injury',
  domain: 'medicine',
  promptTemplate: `Create a cell injury progression diagram:
- Initial insult type: {{insultType}}
- Reversible changes: {{reversibleChanges}}
- Point of no return: {{pointOfNoReturn}}
- Irreversible markers: {{irreversibleMarkers}}
- Necrosis type: {{necrosisType}}
- Morphologic features: {{morphologicFeatures}}
- Timeline: {{timeline}}
{{#additionalNotes}}Organ-specific features: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'insultType',
    'reversibleChanges',
    'pointOfNoReturn',
    'irreversibleMarkers',
    'necrosisType',
    'morphologicFeatures',
    'timeline',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Reversible["Reversible Injury"]
        A["Normal Cell"] --> B["ATP Depletion"]
        B --> C["Cell Swelling"]
        C --> D["ER Dilation"]
        D --> E["Membrane Blebs"]
    end
    subgraph PointNoReturn["Point of No Return"]
        E --> F{"Membrane\\nIntegrity"}
    end
    subgraph Irreversible["Irreversible Injury"]
        F -->|"Lost"| G["Ca2+ Influx"]
        G --> H["Enzyme Release"]
        H --> I["Nuclear Changes"]
    end
    subgraph Necrosis["Cell Death"]
        I --> J["Pyknosis"]
        I --> K["Karyorrhexis"]
        I --> L["Karyolysis"]
    end
    style A fill:#228B22,color:#fff
    style G fill:#FFA500,color:#000
    style L fill:#DC143C,color:#fff`,
};

/**
 * Inflammation Timeline template
 */
export const inflammationTimeline: DiagramTemplate = {
  id: 'path-inflammation-timeline',
  name: 'Inflammation Timeline',
  description: 'Temporal progression of inflammatory response from acute to chronic with healing',
  domain: 'medicine',
  promptTemplate: `Create an inflammation timeline diagram:
- Initial trigger: {{initialTrigger}}
- Vascular response: {{vascularResponse}}
- Cellular response timeline: {{cellularTimeline}}
- Acute phase (hours-days): {{acutePhase}}
- Transition phase: {{transitionPhase}}
- Chronic phase (weeks): {{chronicPhase}}
- Resolution/healing: {{resolution}}
{{#additionalNotes}}Complications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialTrigger',
    'vascularResponse',
    'cellularTimeline',
    'acutePhase',
    'transitionPhase',
    'chronicPhase',
    'resolution',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Hours["Minutes to Hours"]
        A["Tissue Injury"] --> B["Vasodilation"]
        B --> C["Increased Permeability"]
        C --> D["Neutrophil Margination"]
    end
    subgraph Days["Hours to Days"]
        D --> E["Neutrophil Infiltrate"]
        E --> F["Phagocytosis"]
        F --> G["Macrophage Arrival"]
    end
    subgraph Weeks["Days to Weeks"]
        G --> H["Lymphocyte Infiltrate"]
        H --> I["Granulation Tissue"]
        I --> J["Fibroblast Proliferation"]
    end
    subgraph Outcome["Resolution"]
        J --> K{"Complete\\nResolution?"}
        K -->|"Yes"| L["Healing"]
        K -->|"No"| M["Fibrosis/Scar"]
    end
    style E fill:#DC143C,color:#fff
    style H fill:#4169E1,color:#fff
    style L fill:#228B22,color:#fff`,
};

/**
 * Neoplasia Spectrum template
 */
export const neoplasiaSpectrum: DiagramTemplate = {
  id: 'path-neoplasia-spectrum',
  name: 'Neoplasia Spectrum',
  description: 'Progression from normal tissue through dysplasia to invasive carcinoma',
  domain: 'medicine',
  promptTemplate: `Create a neoplasia spectrum diagram:
- Normal tissue characteristics: {{normalTissue}}
- Hyperplasia features: {{hyperplasia}}
- Dysplasia grades: {{dysplasiaGrades}}
- Carcinoma in situ: {{carcinomaInSitu}}
- Invasion markers: {{invasionMarkers}}
- Metastatic potential: {{metastaticPotential}}
- Molecular changes: {{molecularChanges}}
{{#additionalNotes}}Organ-specific progression: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'normalTissue',
    'hyperplasia',
    'dysplasiaGrades',
    'carcinomaInSitu',
    'invasionMarkers',
    'metastaticPotential',
    'molecularChanges',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Normal["Normal"]
        A["Normal\\nEpithelium"]
    end
    subgraph Premalignant["Premalignant"]
        A --> B["Hyperplasia"]
        B --> C["Low-Grade\\nDysplasia"]
        C --> D["High-Grade\\nDysplasia"]
        D --> E["Carcinoma\\nIn Situ"]
    end
    subgraph Malignant["Malignant"]
        E --> F["Invasive\\nCarcinoma"]
        F --> G["Metastasis"]
    end
    subgraph Basement["Basement Membrane"]
        BM["——— Intact ———"]
        BM2["——— Breached ———"]
    end
    style A fill:#228B22,color:#fff
    style D fill:#FFA500,color:#000
    style E fill:#FF6347,color:#fff
    style F fill:#DC143C,color:#fff
    style G fill:#8B0000,color:#fff`,
};

/**
 * Metastatic Pathways template
 */
export const metastaticPathways: DiagramTemplate = {
  id: 'path-metastatic-pathways',
  name: 'Metastatic Pathways',
  description: 'Routes of tumor spread including lymphatic, hematogenous, and direct extension',
  domain: 'medicine',
  promptTemplate: `Create a metastatic pathways diagram:
- Primary tumor location: {{primaryLocation}}
- Local invasion pattern: {{localInvasion}}
- Lymphatic spread: {{lymphaticSpread}}
- Hematogenous spread: {{hematogenousSpread}}
- Common metastatic sites: {{metastaticSites}}
- Seeding patterns: {{seedingPatterns}}
- Staging implications: {{stagingImplications}}
{{#additionalNotes}}Tumor-specific patterns: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'primaryLocation',
    'localInvasion',
    'lymphaticSpread',
    'hematogenousSpread',
    'metastaticSites',
    'seedingPatterns',
    'stagingImplications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Primary["Primary Tumor"]
        A[("🔬 Primary\\nCarcinoma")]
    end
    subgraph Invasion["Local Spread"]
        A --> B["Basement Membrane\\nBreak"]
        B --> C["Direct Extension"]
    end
    subgraph Routes["Metastatic Routes"]
        B --> D["Lymphatic Invasion"]
        B --> E["Vascular Invasion"]
        B --> F["Perineural Invasion"]
    end
    subgraph Lymphatic["Lymphatic Spread"]
        D --> G["Regional Nodes"]
        G --> H["Distant Nodes"]
    end
    subgraph Hematogenous["Hematogenous Spread"]
        E --> I["Lung"]
        E --> J["Liver"]
        E --> K["Bone"]
        E --> L["Brain"]
    end
    style A fill:#DC143C,color:#fff
    style I fill:#FFA500,color:#000
    style J fill:#FFA500,color:#000`,
};

// =============================================================================
// LABORATORY WORKFLOWS
// =============================================================================

/**
 * Specimen Handling Protocol template
 */
export const specimenHandlingProtocol: DiagramTemplate = {
  id: 'path-specimen-handling',
  name: 'Specimen Handling Protocol',
  description: 'Laboratory workflow for proper specimen handling from receipt to archival',
  domain: 'medicine',
  promptTemplate: `Create a specimen handling protocol flowchart:
- Specimen reception: {{specimenReception}}
- Accessioning process: {{accessioning}}
- Grossing requirements: {{grossingRequirements}}
- Fixation protocol: {{fixationProtocol}}
- Processing steps: {{processingSteps}}
- Quality checkpoints: {{qualityCheckpoints}}
- Archival procedures: {{archivalProcedures}}
{{#additionalNotes}}Special specimen types: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'specimenReception',
    'accessioning',
    'grossingRequirements',
    'fixationProtocol',
    'processingSteps',
    'qualityCheckpoints',
    'archivalProcedures',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Reception["Specimen Reception"]
        A["Specimen Arrival"] --> B["Verify Requisition"]
        B --> C["Check Integrity"]
        C --> D["Accession Number"]
    end
    subgraph Gross["Grossing"]
        D --> E["Gross Examination"]
        E --> F["Photography"]
        F --> G["Tissue Sampling"]
        G --> H["Cassette Labeling"]
    end
    subgraph Processing["Processing"]
        H --> I["Fixation\\n10% Formalin"]
        I --> J["Tissue Processor"]
        J --> K["Embedding"]
        K --> L["Microtomy"]
    end
    subgraph Staining["Staining"]
        L --> M["H&E Staining"]
        M --> N["Quality Check"]
        N --> O["Pathologist Review"]
    end
    O --> P["Archive"]
    style A fill:#4169E1,color:#fff
    style O fill:#228B22,color:#fff`,
};

/**
 * Special Stains Guide template
 */
export const specialStainsGuide: DiagramTemplate = {
  id: 'path-special-stains',
  name: 'Special Stains Guide',
  description: 'Decision tree for selecting appropriate special stains based on diagnostic question',
  domain: 'medicine',
  promptTemplate: `Create a special stains selection guide:
- Diagnostic question: {{diagnosticQuestion}}
- Tissue type: {{tissueType}}
- Target substance: {{targetSubstance}}
- Stain options: {{stainOptions}}
- Expected results: {{expectedResults}}
- Quality control: {{qualityControl}}
- Interpretation pearls: {{interpretationPearls}}
{{#additionalNotes}}Alternative methods: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diagnosticQuestion',
    'tissueType',
    'targetSubstance',
    'stainOptions',
    'expectedResults',
    'qualityControl',
    'interpretationPearls',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Diagnostic Question"] --> B{"Target?"}
    B -->|"Microorganisms"| C["Infectious"]
    B -->|"Connective Tissue"| D["CT Stains"]
    B -->|"Mucins/Glycogen"| E["Carbohydrates"]
    B -->|"Pigments"| F["Pigment ID"]
    C --> C1["GMS - Fungi"]
    C --> C2["AFB - Mycobacteria"]
    C --> C3["Warthin-Starry - Spirochetes"]
    D --> D1["Trichrome - Collagen"]
    D --> D2["Reticulin - Reticular fibers"]
    D --> D3["EVG - Elastic"]
    E --> E1["PAS - Glycogen/Mucin"]
    E --> E2["Alcian Blue - Acid mucins"]
    E --> E3["Mucicarmine - Epithelial mucin"]
    F --> F1["Prussian Blue - Iron"]
    F --> F2["Fontana-Masson - Melanin"]
    style A fill:#4169E1,color:#fff`,
};

/**
 * Immunohistochemistry Panels template
 */
export const ihcPanelsGuide: DiagramTemplate = {
  id: 'path-ihc-panels',
  name: 'Immunohistochemistry Panels',
  description: 'Guide for selecting IHC panels based on morphologic differential diagnosis',
  domain: 'medicine',
  promptTemplate: `Create an IHC panel selection guide:
- Morphologic pattern: {{morphologicPattern}}
- Differential diagnosis: {{differentialDx}}
- First-line markers: {{firstLineMarkers}}
- Second-line markers: {{secondLineMarkers}}
- Expected staining patterns: {{stainingPatterns}}
- Pitfalls: {{pitfalls}}
- Interpretation algorithm: {{interpretationAlgorithm}}
{{#additionalNotes}}Molecular alternatives: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'morphologicPattern',
    'differentialDx',
    'firstLineMarkers',
    'secondLineMarkers',
    'stainingPatterns',
    'pitfalls',
    'interpretationAlgorithm',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Undifferentiated\\nMalignancy"] --> B{"Cytokeratin?"}
    B -->|"Positive"| C["Carcinoma"]
    B -->|"Negative"| D{"S100?"}
    C --> C1["CK7/CK20 Panel"]
    C1 -->|"CK7+/CK20-"| C2["Lung, Breast, Ovary"]
    C1 -->|"CK7-/CK20+"| C3["Colorectal"]
    C1 -->|"CK7+/CK20+"| C4["Urothelial, Pancreas"]
    D -->|"Positive"| E["Melanoma vs Neural"]
    D -->|"Negative"| F{"CD45?"}
    E --> E1["HMB45, Melan-A"]
    F -->|"Positive"| G["Lymphoma"]
    F -->|"Negative"| H{"Desmin?"}
    G --> G1["CD20, CD3 Panel"]
    H -->|"Positive"| I["Sarcoma"]
    H -->|"Negative"| J["Other - Expand Panel"]
    style C fill:#E8B4B8
    style G fill:#4169E1,color:#fff
    style I fill:#FFB6C1`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES
// =============================================================================

/**
 * TNM Staging Template
 */
export const tnmStagingTemplate: DiagramTemplate = {
  id: 'path-tnm-staging',
  name: 'TNM Staging System',
  description: 'Visual representation of TNM staging criteria for tumor classification',
  domain: 'medicine',
  promptTemplate: `Create a TNM staging diagram:
- Tumor site: {{tumorSite}}
- T stage criteria: {{tStageCriteria}}
- N stage criteria: {{nStageCriteria}}
- M stage criteria: {{mStageCriteria}}
- Stage groupings: {{stageGroupings}}
- Prognostic factors: {{prognosticFactors}}
- AJCC edition: {{ajccEdition}}
{{#additionalNotes}}Site-specific modifiers: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'tumorSite',
    'tStageCriteria',
    'nStageCriteria',
    'mStageCriteria',
    'stageGroupings',
    'prognosticFactors',
    'ajccEdition',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph T["T - Primary Tumor"]
        T0["T0: No tumor"]
        T1["T1: ≤2cm"]
        T2["T2: 2-5cm"]
        T3["T3: >5cm"]
        T4["T4: Invasion"]
    end
    subgraph N["N - Nodes"]
        N0["N0: No nodes"]
        N1["N1: 1-3 nodes"]
        N2["N2: 4-9 nodes"]
        N3["N3: ≥10 nodes"]
    end
    subgraph M["M - Metastasis"]
        M0["M0: No mets"]
        M1["M1: Distant mets"]
    end
    subgraph Stage["Stage Groups"]
        T1 --> S1["Stage I"]
        T2 --> S2["Stage II"]
        T3 --> S3["Stage III"]
        T4 --> S4["Stage IV"]
        M1 --> S4
    end
    style S1 fill:#228B22,color:#fff
    style S2 fill:#FFD700,color:#000
    style S3 fill:#FFA500,color:#000
    style S4 fill:#DC143C,color:#fff`,
};

/**
 * WHO Tumor Grading Template
 */
export const whoTumorGrading: DiagramTemplate = {
  id: 'path-who-grading',
  name: 'WHO Tumor Grading System',
  description: 'WHO classification and grading criteria for tumor assessment',
  domain: 'medicine',
  promptTemplate: `Create a WHO tumor grading diagram:
- Tumor type: {{tumorType}}
- Histologic criteria: {{histologicCriteria}}
- Mitotic count thresholds: {{mitoticThresholds}}
- Necrosis assessment: {{necrosisAssessment}}
- Differentiation markers: {{differentiationMarkers}}
- Grade definitions: {{gradeDefinitions}}
- Clinical implications: {{clinicalImplications}}
{{#additionalNotes}}Molecular grading: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'tumorType',
    'histologicCriteria',
    'mitoticThresholds',
    'necrosisAssessment',
    'differentiationMarkers',
    'gradeDefinitions',
    'clinicalImplications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Tumor Assessment"] --> B["Differentiation"]
    A --> C["Mitotic Count"]
    A --> D["Necrosis"]
    B --> B1["Well: Score 1"]
    B --> B2["Moderate: Score 2"]
    B --> B3["Poor: Score 3"]
    C --> C1["0-9/10 HPF: Score 1"]
    C --> C2["10-19/10 HPF: Score 2"]
    C --> C3["≥20/10 HPF: Score 3"]
    D --> D1["None: Score 0"]
    D --> D2["<50%: Score 1"]
    D --> D3["≥50%: Score 2"]
    B1 & C1 & D1 --> G1["Grade 1\\nTotal 2-3"]
    B2 & C2 & D2 --> G2["Grade 2\\nTotal 4-5"]
    B3 & C3 & D3 --> G3["Grade 3\\nTotal 6-8"]
    style G1 fill:#228B22,color:#fff
    style G2 fill:#FFD700,color:#000
    style G3 fill:#DC143C,color:#fff`,
};

/**
 * Pathology Report Template
 */
export const pathologyReportTemplate: DiagramTemplate = {
  id: 'path-report-template',
  name: 'Pathology Report Template',
  description: 'Structured template for comprehensive surgical pathology reports',
  domain: 'medicine',
  promptTemplate: `Create a pathology report template diagram:
- Specimen identification: {{specimenId}}
- Clinical history: {{clinicalHistory}}
- Gross description sections: {{grossDescription}}
- Microscopic findings: {{microscopicFindings}}
- Ancillary studies: {{ancillaryStudies}}
- Diagnosis format: {{diagnosisFormat}}
- Synoptic elements: {{synopticElements}}
{{#additionalNotes}}CAP protocol requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'specimenId',
    'clinicalHistory',
    'grossDescription',
    'microscopicFindings',
    'ancillaryStudies',
    'diagnosisFormat',
    'synopticElements',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Header["Report Header"]
        A["Patient Demographics"]
        B["Specimen Information"]
        C["Clinical History"]
    end
    subgraph Gross["Gross Description"]
        D["Specimen Type"]
        E["Measurements"]
        F["Description"]
        G["Sections Submitted"]
    end
    subgraph Micro["Microscopic"]
        H["Histologic Type"]
        I["Grade"]
        J["Margins"]
        K["LVI/PNI"]
    end
    subgraph Ancillary["Ancillary Studies"]
        L["IHC Results"]
        M["Molecular"]
    end
    subgraph Diagnosis["Final Diagnosis"]
        N["Primary Diagnosis"]
        O["Synoptic Report"]
        P["Comments"]
    end
    A & B & C --> D
    D & E & F & G --> H
    H & I & J & K --> L
    L & M --> N
    N & O & P --> Q["Sign Out"]
    style Q fill:#228B22,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All pathology templates
 */
export const pathologyTemplates: DiagramTemplate[] = [
  // Decision Trees
  tissueDiagnosisAlgorithm,
  tumorClassificationAlgorithm,
  inflammatoryPatternRecognition,
  liverBiopsyInterpretation,
  lymphNodeEvaluation,
  boneMarrowAssessment,
  // Anatomical Diagrams
  cellInjuryProgression,
  inflammationTimeline,
  neoplasiaSpectrum,
  metastaticPathways,
  // Laboratory Workflows
  specimenHandlingProtocol,
  specialStainsGuide,
  ihcPanelsGuide,
  // Data Visualization
  tnmStagingTemplate,
  whoTumorGrading,
  pathologyReportTemplate,
];

export default pathologyTemplates;
