/**
 * cardiology.ts
 * Cardiology diagram templates for FINNISH
 *
 * Contains comprehensive templates for cardiovascular medicine including:
 * - Clinical decision algorithms
 * - Diagnostic flowcharts
 * - Anatomical diagrams
 * - Procedure illustrations
 * - Data visualization templates
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CLINICAL DECISION TREES
// =============================================================================

/**
 * Chest Pain Evaluation Algorithm template
 */
export const chestPainAlgorithm: DiagramTemplate = {
  id: 'cardio-chest-pain-algorithm',
  name: 'Chest Pain Evaluation Algorithm',
  description: 'ACS/NSTE-ACS risk stratification algorithm for chest pain evaluation in emergency settings',
  domain: 'medicine',
  promptTemplate: `Create a chest pain evaluation algorithm flowchart:
- Patient presentation: {{presentation}}
- ECG findings available: {{ecgFindings}}
- Troponin results: {{troponinResults}}
- Risk score used: {{riskScore}}
- High-risk features: {{highRiskFeatures}}
- STEMI criteria: {{stemiCriteria}}
- Disposition options: {{dispositionOptions}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'ecgFindings',
    'troponinResults',
    'riskScore',
    'highRiskFeatures',
    'stemiCriteria',
    'dispositionOptions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Initial["Initial Assessment"]
        A[("🫀 Chest Pain\\nPresentation")] --> B{"12-Lead ECG\\nWithin 10 min"}
    end
    subgraph STEMI["STEMI Pathway"]
        B -->|"ST Elevation"| C["🚨 STEMI Protocol"]
        C --> C1["Activate Cath Lab"]
    end
    subgraph NSTEACS["NSTE-ACS Pathway"]
        B -->|"ST Depression"| D["⚠️ NSTE-ACS"]
        D --> D1["Troponin + Risk Stratify"]
    end
    subgraph RiskStrat["Risk Stratification"]
        B -->|"Normal"| E{"HEART Score"}
        E -->|"0-3"| F["Consider Discharge"]
        E -->|"≥4"| G["Admit"]
    end
    style C fill:#DC143C,color:#fff
    style F fill:#228B22,color:#fff`,
};

/**
 * Heart Failure Management Algorithm template
 */
export const heartFailureAlgorithm: DiagramTemplate = {
  id: 'cardio-hf-algorithm',
  name: 'Heart Failure Management Algorithm',
  description: 'GDMT optimization pathway for HFrEF management following ACC/AHA guidelines',
  domain: 'medicine',
  promptTemplate: `Create a heart failure management algorithm:
- Ejection fraction: {{ejectionFraction}}
- NYHA functional class: {{nyhaClass}}
- Current medications: {{currentMedications}}
- Target GDMT: {{targetGDMT}}
- Device therapy indications: {{deviceIndications}}
- Advanced therapy criteria: {{advancedCriteria}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ejectionFraction',
    'nyhaClass',
    'currentMedications',
    'targetGDMT',
    'deviceIndications',
    'advancedCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🫀 HFrEF\\nEF ≤40%")] --> B["Four Pillars of GDMT"]
    B --> C["ACEi/ARB → ARNI"]
    B --> D["Beta Blocker"]
    B --> E["MRA"]
    B --> F["SGLT2i"]
    C & D & E & F --> G{"At Target\\nDoses?"}
    G -->|"No"| H["Titrate q2 weeks"]
    G -->|"Yes"| I{"Still\\nSymptomatic?"}
    I -->|"Yes"| J["Consider CRT/ICD"]
    style A fill:#DC143C,color:#fff
    style J fill:#4169E1,color:#fff`,
};

/**
 * Atrial Fibrillation Management template
 */
export const afibManagement: DiagramTemplate = {
  id: 'cardio-afib-management',
  name: 'Atrial Fibrillation Management',
  description: 'Rate vs rhythm control and anticoagulation decision pathway for AFib',
  domain: 'medicine',
  promptTemplate: `Create an atrial fibrillation management flowchart:
- AF type: {{afType}}
- Duration: {{duration}}
- Symptoms: {{symptoms}}
- CHA2DS2-VASc score: {{chadScore}}
- HAS-BLED score: {{hasBledScore}}
- Rate control strategy: {{rateControl}}
- Rhythm control options: {{rhythmControl}}
- Anticoagulation choice: {{anticoagulation}}
{{#additionalNotes}}Additional factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'afType',
    'duration',
    'symptoms',
    'chadScore',
    'hasBledScore',
    'rateControl',
    'rhythmControl',
    'anticoagulation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("💓 Atrial Fibrillation")] --> B{"Hemodynamically\\nStable?"}
    B -->|"No"| C["🚨 DC Cardioversion"]
    B -->|"Yes"| D{"CHA₂DS₂-VASc"}
    D -->|"≥2"| E["DOAC"]
    D -->|"0-1"| F["Consider DOAC"]
    E & F --> G{"Symptomatic?"}
    G -->|"Yes"| H["Rhythm Control"]
    G -->|"No"| I["Rate Control"]
    style C fill:#DC143C,color:#fff
    style E fill:#228B22,color:#fff`,
};

/**
 * Syncope Evaluation template
 */
export const syncopeEvaluation: DiagramTemplate = {
  id: 'cardio-syncope-evaluation',
  name: 'Syncope Evaluation Algorithm',
  description: 'Risk stratification and workup pathway for syncope evaluation',
  domain: 'medicine',
  promptTemplate: `Create a syncope evaluation algorithm:
- Presentation details: {{presentation}}
- High-risk features: {{highRiskFeatures}}
- ECG findings: {{ecgFindings}}
- Orthostatic changes: {{orthostatics}}
- History suggestive of: {{historyType}}
- Workup planned: {{workup}}
- Disposition: {{disposition}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'highRiskFeatures',
    'ecgFindings',
    'orthostatics',
    'historyType',
    'workup',
    'disposition',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("😵 Syncope")] --> B["H&P + ECG"]
    B --> C{"High-Risk\\nFeatures?"}
    C -->|"Yes"| D["Admit"]
    C -->|"No"| E{"Vasovagal\\nTrigger?"}
    E -->|"Yes"| F["Reassurance"]
    E -->|"No"| G["Further Workup"]
    D --> H["Echo + Telemetry"]
    G --> I["Tilt Table / ILR"]
    style D fill:#FFA500,color:#000
    style F fill:#228B22,color:#fff`,
};

/**
 * Hypertension Treatment template
 */
export const hypertensionTreatment: DiagramTemplate = {
  id: 'cardio-htn-treatment',
  name: 'Hypertension Treatment Algorithm',
  description: 'JNC/ACC guideline-based antihypertensive therapy selection',
  domain: 'medicine',
  promptTemplate: `Create a hypertension treatment algorithm:
- BP classification: {{bpClassification}}
- Stage: {{stage}}
- Compelling indications: {{compellingIndications}}
- First-line agents: {{firstLineAgents}}
- Target BP: {{targetBP}}
- Titration strategy: {{titrationStrategy}}
- Resistant HTN criteria: {{resistantCriteria}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bpClassification',
    'stage',
    'compellingIndications',
    'firstLineAgents',
    'targetBP',
    'titrationStrategy',
    'resistantCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🩺 HTN Confirmed")] --> B{"Stage?"}
    B -->|"Stage 1"| C["Lifestyle ± 1 Drug"]
    B -->|"Stage 2"| D["Lifestyle + 2 Drugs"]
    C & D --> E{"Compelling\\nIndication?"}
    E -->|"DM/CKD"| F["ACEi/ARB"]
    E -->|"None"| G["ACEi, CCB, or Thiazide"]
    F & G --> H{"At Goal?"}
    H -->|"No"| I["Add Agent"]
    H -->|"Yes"| J["✓ Maintain"]
    style J fill:#228B22,color:#fff`,
};

/**
 * Preoperative Cardiac Risk Assessment template
 */
export const preopCardiacRisk: DiagramTemplate = {
  id: 'cardio-preop-risk',
  name: 'Preoperative Cardiac Risk Assessment',
  description: 'ACC/AHA perioperative cardiovascular evaluation algorithm for non-cardiac surgery',
  domain: 'medicine',
  promptTemplate: `Create a preoperative cardiac risk assessment flowchart:
- Surgery type: {{surgeryType}}
- Surgical risk level: {{surgicalRisk}}
- Active cardiac conditions: {{activeConditions}}
- Functional capacity (METs): {{functionalCapacity}}
- RCRI score: {{rcriScore}}
- Need for stress testing: {{stressTesting}}
- Recommendations: {{recommendations}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'surgeryType',
    'surgicalRisk',
    'activeConditions',
    'functionalCapacity',
    'rcriScore',
    'stressTesting',
    'recommendations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🏥 Non-cardiac\\nSurgery")] --> B{"Emergency?"}
    B -->|"Yes"| C["Proceed to OR"]
    B -->|"No"| D{"Active Cardiac\\nConditions?"}
    D -->|"Yes"| E["Delay - Evaluate"]
    D -->|"No"| F{"Surgical Risk?"}
    F -->|"Low"| G["Proceed"]
    F -->|"Elevated"| H{"≥4 METs?"}
    H -->|"Yes"| G
    H -->|"No"| I["Consider Stress Test"]
    style C fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff`,
};

/**
 * Acute PE Management template
 */
export const acutePEManagement: DiagramTemplate = {
  id: 'cardio-pe-management',
  name: 'Acute PE Management Algorithm',
  description: 'Pulmonary embolism risk stratification and treatment pathway',
  domain: 'medicine',
  promptTemplate: `Create an acute PE management flowchart:
- Clinical probability: {{clinicalProbability}}
- Wells score: {{wellsScore}}
- Imaging result: {{imagingResult}}
- Hemodynamic status: {{hemodynamicStatus}}
- RV dysfunction: {{rvDysfunction}}
- Troponin: {{troponin}}
- Treatment approach: {{treatment}}
- Anticoagulation: {{anticoagulation}}
{{#additionalNotes}}Additional factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalProbability',
    'wellsScore',
    'imagingResult',
    'hemodynamicStatus',
    'rvDysfunction',
    'troponin',
    'treatment',
    'anticoagulation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🫁 Suspected PE")] --> B{"Wells Score"}
    B -->|"≤4"| C["D-dimer"]
    B -->|">4"| D["CTPA"]
    C -->|"Negative"| E["PE Unlikely"]
    C -->|"Positive"| D
    D -->|"PE Confirmed"| F{"Stable?"}
    F -->|"No"| G["🚨 Thrombolysis"]
    F -->|"Yes"| H["Anticoagulation"]
    style G fill:#DC143C,color:#fff
    style E fill:#228B22,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS
// =============================================================================

/**
 * Heart Anatomy template
 */
export const heartAnatomy: DiagramTemplate = {
  id: 'cardio-heart-anatomy',
  name: 'Heart Anatomy 4-Chamber View',
  description: 'Labeled 4-chamber heart anatomy with chambers, valves, and great vessels',
  domain: 'medicine',
  promptTemplate: `Create a labeled heart anatomy diagram showing:
- Chambers to label: {{chambers}}
- Valves to highlight: {{valves}}
- Great vessels: {{greatVessels}}
- Blood flow direction: {{bloodFlow}}
- Color coding: {{colorCoding}}
- Annotations: {{annotations}}
{{#additionalNotes}}Additional structures: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'chambers',
    'valves',
    'greatVessels',
    'bloodFlow',
    'colorCoding',
    'annotations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Vessels["Great Vessels"]
        SVC["SVC"] & IVC["IVC"] --> RA
        PA["PA"] --> LUNGS["Lungs"]
        LUNGS --> PV["PV"] --> LA
        AO["Aorta"] --> BODY["Body"]
    end
    subgraph Heart["Heart"]
        RA["RA"] -->|"TV"| RV["RV"]
        LA["LA"] -->|"MV"| LV["LV"]
        RV -->|"PV"| PA
        LV -->|"AV"| AO
    end
    style RA fill:#4169E1
    style RV fill:#4169E1
    style LA fill:#DC143C
    style LV fill:#DC143C`,
};

/**
 * Coronary Artery Anatomy template
 */
export const coronaryAnatomy: DiagramTemplate = {
  id: 'cardio-coronary-anatomy',
  name: 'Coronary Artery Anatomy',
  description: 'Major coronary arteries and their myocardial territories',
  domain: 'medicine',
  promptTemplate: `Create a coronary artery anatomy diagram:
- Left main and branches: {{leftSystem}}
- Right coronary system: {{rightSystem}}
- Dominance pattern: {{dominance}}
- Territories supplied: {{territories}}
- Common variants: {{variants}}
- Annotations: {{annotations}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'leftSystem',
    'rightSystem',
    'dominance',
    'territories',
    'variants',
    'annotations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Left["Left System"]
        LMCA["LMCA"] --> LAD["LAD"]
        LMCA --> LCx["LCx"]
        LAD --> D1["D1"] & D2["D2"]
        LCx --> OM1["OM1"] & OM2["OM2"]
    end
    subgraph Right["Right System"]
        RCA["RCA"] --> AM["AM"]
        RCA --> PDA["PDA"]
    end
    style LMCA fill:#DC143C
    style RCA fill:#4169E1`,
};

/**
 * Cardiac Conduction System template
 */
export const conductionSystem: DiagramTemplate = {
  id: 'cardio-conduction-system',
  name: 'Cardiac Conduction System',
  description: 'Electrical conduction pathway from SA node to Purkinje fibers',
  domain: 'medicine',
  promptTemplate: `Create a cardiac conduction system diagram:
- SA node location: {{saNode}}
- Internodal pathways: {{internodal}}
- AV node: {{avNode}}
- Bundle of His: {{bundleHis}}
- Bundle branches: {{bundleBranches}}
- Purkinje fibers: {{purkinje}}
- Conduction times: {{conductionTimes}}
{{#additionalNotes}}ECG correlation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'saNode',
    'internodal',
    'avNode',
    'bundleHis',
    'bundleBranches',
    'purkinje',
    'conductionTimes',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    SA["SA Node\\n60-100 bpm"] -->|"Internodal"| AV["AV Node\\n40-60 bpm"]
    AV -->|"AV delay"| HIS["Bundle of His"]
    HIS --> RBB["RBB"] & LBB["LBB"]
    LBB --> LAF["LAF"] & LPF["LPF"]
    RBB & LAF & LPF --> PUR["Purkinje Fibers"]
    style SA fill:#FFD700
    style AV fill:#FFA500`,
};

/**
 * Blood Flow Circulation template
 */
export const bloodFlowCirculation: DiagramTemplate = {
  id: 'cardio-blood-flow',
  name: 'Cardiac Blood Flow Diagram',
  description: 'Systemic and pulmonary circulation pathway showing oxygenation',
  domain: 'medicine',
  promptTemplate: `Create a blood flow circulation diagram:
- Systemic circulation: {{systemicCirculation}}
- Pulmonary circulation: {{pulmonaryCirculation}}
- Oxygenation points: {{oxygenationPoints}}
- Deoxygenation points: {{deoxygenationPoints}}
- Pressure values: {{pressures}}
- Oxygen saturations: {{saturations}}
{{#additionalNotes}}Special features: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'systemicCirculation',
    'pulmonaryCirculation',
    'oxygenationPoints',
    'deoxygenationPoints',
    'pressures',
    'saturations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    BODY["Body"] -->|"Deoxy"| SVC["SVC/IVC"]
    SVC --> RA["RA"] --> RV["RV"]
    RV --> PA["PA"] --> LUNGS["Lungs 🫁"]
    LUNGS -->|"Oxy"| PV["PV"]
    PV --> LA["LA"] --> LV["LV"]
    LV --> AO["Aorta"] --> BODY
    style RA fill:#4169E1
    style LA fill:#DC143C`,
};

// =============================================================================
// PROCEDURE ILLUSTRATIONS
// =============================================================================

/**
 * PCI Procedure Steps template
 */
export const pciProcedure: DiagramTemplate = {
  id: 'cardio-pci-procedure',
  name: 'PCI Procedure Steps',
  description: 'Step-by-step percutaneous coronary intervention illustration',
  domain: 'medicine',
  promptTemplate: `Create a PCI procedure flowchart:
- Access site: {{accessSite}}
- Guide catheter: {{guideCatheter}}
- Wire crossing technique: {{wireTechnique}}
- Lesion preparation: {{lesionPrep}}
- Stent type: {{stentType}}
- Post-dilation: {{postDilation}}
- Final result assessment: {{finalAssessment}}
{{#additionalNotes}}Complications to monitor: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'accessSite',
    'guideCatheter',
    'wireTechnique',
    'lesionPrep',
    'stentType',
    'postDilation',
    'finalAssessment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Vascular Access"] --> B["Guide Catheter"]
    B --> C["Engage Ostium"]
    C --> D["Wire Lesion"]
    D --> E["Predilation"]
    E --> F["Deploy Stent"]
    F --> G["Post-dilate"]
    G --> H["Final Angio"]
    style A fill:#4169E1
    style F fill:#DC143C
    style H fill:#228B22`,
};

/**
 * Pacemaker Implantation template
 */
export const pacemakerImplant: DiagramTemplate = {
  id: 'cardio-pacemaker-implant',
  name: 'Pacemaker Implantation Steps',
  description: 'Permanent pacemaker implantation procedure illustration',
  domain: 'medicine',
  promptTemplate: `Create a pacemaker implantation flowchart:
- Device type: {{deviceType}}
- Venous access: {{venousAccess}}
- Lead positions: {{leadPositions}}
- Threshold testing: {{thresholdTesting}}
- Generator pocket: {{generatorPocket}}
- Final programming: {{finalProgramming}}
{{#additionalNotes}}Post-procedure care: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'deviceType',
    'venousAccess',
    'leadPositions',
    'thresholdTesting',
    'generatorPocket',
    'finalProgramming',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Prep + Access"] --> B["Venous Puncture"]
    B --> C["Advance Leads"]
    C --> D["Position Leads"]
    D --> E["Test Thresholds"]
    E --> F["Create Pocket"]
    F --> G["Connect Generator"]
    G --> H["Final Check + CXR"]
    style E fill:#FFA500
    style H fill:#228B22`,
};

/**
 * Cardioversion Protocol template
 */
export const cardioversionProtocol: DiagramTemplate = {
  id: 'cardio-cardioversion',
  name: 'Cardioversion Protocol',
  description: 'Electrical cardioversion procedure and safety checklist',
  domain: 'medicine',
  promptTemplate: `Create a cardioversion protocol flowchart:
- Indication: {{indication}}
- Anticoagulation status: {{anticoagulation}}
- TEE requirement: {{teeRequired}}
- Sedation: {{sedation}}
- Energy settings: {{energySettings}}
- Sync mode: {{syncMode}}
- Post-procedure: {{postProcedure}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indication',
    'anticoagulation',
    'teeRequired',
    'sedation',
    'energySettings',
    'syncMode',
    'postProcedure',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Confirm Indication"] --> B{"Anticoag\\n≥3 weeks?"}
    B -->|"No"| C["TEE First"]
    B -->|"Yes"| D["Proceed"]
    C -->|"No Clot"| D
    D --> E["Sedate Patient"]
    E --> F["SYNC Mode ON"]
    F --> G["Deliver Shock"]
    G --> H{"Sinus?"}
    H -->|"Yes"| I["✓ Monitor"]
    H -->|"No"| J["Repeat Higher"]
    style F fill:#FFA500
    style I fill:#228B22`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES
// =============================================================================

/**
 * ECG Interpretation template
 */
export const ecgInterpretation: DiagramTemplate = {
  id: 'cardio-ecg-interpretation',
  name: 'ECG Interpretation Template',
  description: '12-lead ECG systematic interpretation template',
  domain: 'medicine',
  promptTemplate: `Create an ECG interpretation flowchart:
- Rate calculation method: {{rateMethod}}
- Rhythm criteria: {{rhythmCriteria}}
- Axis determination: {{axisDetermination}}
- Interval measurements: {{intervals}}
- ST-T wave analysis: {{stTAnalysis}}
- Other findings: {{otherFindings}}
{{#additionalNotes}}Clinical correlation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'rateMethod',
    'rhythmCriteria',
    'axisDetermination',
    'intervals',
    'stTAnalysis',
    'otherFindings',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["1. Rate"] --> B["2. Rhythm"]
    B --> C["3. Axis"]
    C --> D["4. Intervals"]
    D --> E["5. ST-T Changes"]
    E --> F["6. Other"]
    A1["60-100 bpm"] --> A
    B1["P before QRS?"] --> B
    C1["I and aVF"] --> C
    D1["PR, QRS, QTc"] --> D
    E1["Elevation/Depression"] --> E`,
};

/**
 * Hemodynamic Parameters template
 */
export const hemodynamicParameters: DiagramTemplate = {
  id: 'cardio-hemodynamics',
  name: 'Hemodynamic Parameters Template',
  description: 'Hemodynamic monitoring values and calculations',
  domain: 'medicine',
  promptTemplate: `Create a hemodynamic parameters reference:
- Measured pressures: {{measuredPressures}}
- Cardiac output method: {{coMethod}}
- Derived parameters: {{derivedParameters}}
- Normal values: {{normalValues}}
- Clinical patterns: {{clinicalPatterns}}
- Formulas: {{formulas}}
{{#additionalNotes}}Interpretation tips: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'measuredPressures',
    'coMethod',
    'derivedParameters',
    'normalValues',
    'clinicalPatterns',
    'formulas',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Pressures["Measured"]
        P1["CVP: 2-8"]
        P2["PA: 15-30/8-15"]
        P3["PCWP: 6-12"]
    end
    subgraph Derived["Calculated"]
        D1["CO = HR × SV"]
        D2["SVR = (MAP-CVP)/CO × 80"]
    end
    subgraph Patterns["Clinical"]
        C1["Cardiogenic: ↓CO, ↑PCWP"]
        C2["Septic: ↑CO, ↓SVR"]
    end`,
};

/**
 * Pressure-Volume Loop template
 */
export const pvLoop: DiagramTemplate = {
  id: 'cardio-pv-loop',
  name: 'Pressure-Volume Loop',
  description: 'LV pressure-volume relationship diagram showing cardiac mechanics',
  domain: 'medicine',
  promptTemplate: `Create a pressure-volume loop diagram:
- Loop phases: {{loopPhases}}
- Key points (ABCD): {{keyPoints}}
- ESPVR and EDPVR: {{espvrEdpvr}}
- Normal values: {{normalValues}}
- Pathological changes: {{pathChanges}}
- Hemodynamic correlates: {{hemodynamics}}
{{#additionalNotes}}Clinical applications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'loopPhases',
    'keyPoints',
    'espvrEdpvr',
    'normalValues',
    'pathChanges',
    'hemodynamics',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["A: MV Closes\\n(EDV)"] --> B["B: AV Opens"]
    B --> C["C: AV Closes\\n(ESV)"]
    C --> D["D: MV Opens"]
    D --> A
    subgraph Segments["Phases"]
        S1["A→B: Isovolumic\\nContraction"]
        S2["B→C: Ejection"]
        S3["C→D: Isovolumic\\nRelaxation"]
        S4["D→A: Filling"]
    end`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All cardiology templates
 */
export const cardiologyTemplates: DiagramTemplate[] = [
  // Clinical Decision Trees
  chestPainAlgorithm,
  heartFailureAlgorithm,
  afibManagement,
  syncopeEvaluation,
  hypertensionTreatment,
  preopCardiacRisk,
  acutePEManagement,
  // Anatomical Diagrams
  heartAnatomy,
  coronaryAnatomy,
  conductionSystem,
  bloodFlowCirculation,
  // Procedure Illustrations
  pciProcedure,
  pacemakerImplant,
  cardioversionProtocol,
  // Data Visualization
  ecgInterpretation,
  hemodynamicParameters,
  pvLoop,
];

export default cardiologyTemplates;
