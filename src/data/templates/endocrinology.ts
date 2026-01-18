/**
 * endocrinology.ts
 * Endocrinology diagram templates for FINNISH
 *
 * Contains comprehensive templates for endocrine medicine including:
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
 * Diabetes Management Algorithm template
 */
export const diabetesManagement: DiagramTemplate = {
  id: 'endo-diabetes-management',
  name: 'Diabetes Management Algorithm',
  description: 'ADA guideline-based diabetes treatment algorithm with GDMT approach',
  domain: 'medicine',
  promptTemplate: `Create a diabetes management algorithm flowchart:
- Diabetes type: {{diabetesType}}
- Current HbA1c: {{currentHbA1c}}
- Target HbA1c: {{targetHbA1c}}
- Comorbidities: {{comorbidities}}
- Current medications: {{currentMedications}}
- Cardiovascular risk: {{cvRisk}}
- Renal function: {{renalFunction}}
- Weight considerations: {{weightConsiderations}}
- Hypoglycemia risk: {{hypoglycemiaRisk}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diabetesType',
    'currentHbA1c',
    'targetHbA1c',
    'comorbidities',
    'currentMedications',
    'cvRisk',
    'renalFunction',
    'weightConsiderations',
    'hypoglycemiaRisk',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Initial["Initial Assessment"]
        A[("Type 2 DM\\nDiagnosis")] --> B{"HbA1c Level?"}
    end
    subgraph FirstLine["First-Line Therapy"]
        B -->|"<9%"| C["Metformin + Lifestyle"]
        B -->|">9%"| D["Metformin + Second Agent"]
    end
    subgraph CardioRenal["Cardiorenal Considerations"]
        C --> E{"ASCVD, HF,\\nor CKD?"}
        E -->|"ASCVD"| F["Add GLP-1 RA"]
        E -->|"HF/CKD"| G["Add SGLT2i"]
        E -->|"None"| H["Add based on goals"]
    end
    subgraph Intensify["Intensification"]
        H --> I{"Need Weight Loss?"}
        I -->|"Yes"| J["GLP-1 RA or Tirzepatide"]
        I -->|"No"| K["SGLT2i, DPP-4i, or SU"]
    end
    style A fill:#4169E1,color:#fff
    style F fill:#228B22,color:#fff
    style G fill:#228B22,color:#fff`,
};

/**
 * Thyroid Nodule Workup template
 */
export const thyroidNoduleWorkup: DiagramTemplate = {
  id: 'endo-thyroid-nodule-workup',
  name: 'Thyroid Nodule Workup Algorithm',
  description: 'ATA guideline-based thyroid nodule evaluation and management pathway',
  domain: 'medicine',
  promptTemplate: `Create a thyroid nodule workup flowchart:
- Nodule size: {{noduleSize}}
- TSH level: {{tshLevel}}
- Ultrasound features: {{usFeatures}}
- TI-RADS score: {{tiradsScore}}
- FNA indication: {{fnaIndication}}
- Bethesda category: {{bethesdaCategory}}
- Molecular testing: {{molecularTesting}}
- Management plan: {{managementPlan}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'noduleSize',
    'tshLevel',
    'usFeatures',
    'tiradsScore',
    'fnaIndication',
    'bethesdaCategory',
    'molecularTesting',
    'managementPlan',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Thyroid Nodule\\nDiscovered")] --> B["Check TSH"]
    B -->|"Low TSH"| C["Thyroid Scan"]
    C -->|"Hot"| D["Likely Benign\\nFollow"]
    C -->|"Cold"| E["US + FNA"]
    B -->|"Normal/High"| F["Thyroid US"]
    F --> G{"TI-RADS Score?"}
    G -->|"TR1-2"| H["No FNA"]
    G -->|"TR3"| I{"Size >2.5cm?"}
    G -->|"TR4-5"| J{"Size >1cm?"}
    I & J -->|"Yes"| K["FNA Biopsy"]
    K --> L{"Bethesda?"}
    L -->|"I-II"| M["Repeat/Follow"]
    L -->|"III-IV"| N["Molecular Test"]
    L -->|"V-VI"| O["Surgery"]
    style O fill:#DC143C,color:#fff
    style D fill:#228B22,color:#fff`,
};

/**
 * Adrenal Incidentaloma Workup template
 */
export const adrenalIncidentaloma: DiagramTemplate = {
  id: 'endo-adrenal-incidentaloma',
  name: 'Adrenal Incidentaloma Algorithm',
  description: 'Workup pathway for incidentally discovered adrenal masses',
  domain: 'medicine',
  promptTemplate: `Create an adrenal incidentaloma workup flowchart:
- Mass size: {{massSize}}
- CT characteristics: {{ctCharacteristics}}
- Hounsfield units: {{hounsfieldUnits}}
- Hormonal workup: {{hormonalWorkup}}
- Pheochromocytoma screen: {{pheoScreen}}
- Aldosterone/cortisol evaluation: {{aldoCortisol}}
- Follow-up plan: {{followUpPlan}}
- Surgical criteria: {{surgicalCriteria}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'massSize',
    'ctCharacteristics',
    'hounsfieldUnits',
    'hormonalWorkup',
    'pheoScreen',
    'aldoCortisol',
    'followUpPlan',
    'surgicalCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Adrenal Mass\\nIncidentaloma")] --> B["Size + CT Features"]
    B --> C{"Size?"}
    C -->|">4cm"| D["Consider Surgery"]
    C -->|"1-4cm"| E["Hormonal Workup"]
    C -->|"<1cm"| F["Follow-up"]
    E --> G["1mg DST"]
    E --> H["Metanephrines"]
    E --> I["Aldo/Renin if HTN"]
    G & H & I --> J{"Functional?"}
    J -->|"Yes"| K["Surgery"]
    J -->|"No"| L{"Imaging Features?"}
    L -->|"Benign\\n<10 HU"| M["Follow 12 mo"]
    L -->|"Indeterminate"| N["Adrenal Protocol CT"]
    L -->|"Suspicious"| D
    style K fill:#DC143C,color:#fff
    style M fill:#228B22,color:#fff`,
};

/**
 * Hypoglycemia Evaluation template
 */
export const hypoglycemiaEvaluation: DiagramTemplate = {
  id: 'endo-hypoglycemia-evaluation',
  name: 'Hypoglycemia Evaluation Algorithm',
  description: 'Diagnostic approach to hypoglycemia in diabetic and non-diabetic patients',
  domain: 'medicine',
  promptTemplate: `Create a hypoglycemia evaluation flowchart:
- Patient population: {{patientPopulation}}
- Whipple triad confirmed: {{whippleTriad}}
- Timing of hypoglycemia: {{timing}}
- Medication review: {{medications}}
- Insulin/C-peptide levels: {{insulinCpeptide}}
- Sulfonylurea screen: {{suScreen}}
- Differential diagnosis: {{differentialDx}}
- Treatment approach: {{treatment}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'patientPopulation',
    'whippleTriad',
    'timing',
    'medications',
    'insulinCpeptide',
    'suScreen',
    'differentialDx',
    'treatment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Hypoglycemia\\nSuspected")] --> B{"Whipple's\\nTriad?"}
    B -->|"No"| C["Unlikely True Hypo"]
    B -->|"Yes"| D{"Diabetic on\\nMeds?"}
    D -->|"Yes"| E["Med-Induced"]
    D -->|"No"| F["72hr Fast"]
    F --> G{"Symptoms + BG<50?"}
    G -->|"No"| H["No Hypoglycemia"]
    G -->|"Yes"| I["Check Insulin,\\nC-peptide, SU"]
    I --> J{"Insulin↑\\nC-peptide?"}
    J -->|"↑Insulin, ↑C-pep"| K{"SU Screen?"}
    K -->|"Positive"| L["Drug-Induced"]
    K -->|"Negative"| M["Insulinoma"]
    J -->|"↑Insulin, ↓C-pep"| N["Exogenous Insulin"]
    J -->|"↓Insulin, ↓C-pep"| O["Non-Islet Tumor"]
    style M fill:#DC143C,color:#fff
    style E fill:#FFA500,color:#000`,
};

/**
 * Obesity Management Algorithm template
 */
export const obesityManagement: DiagramTemplate = {
  id: 'endo-obesity-management',
  name: 'Obesity Management Algorithm',
  description: 'Comprehensive obesity treatment pathway including lifestyle, pharmacotherapy, and surgery',
  domain: 'medicine',
  promptTemplate: `Create an obesity management algorithm:
- BMI category: {{bmiCategory}}
- Comorbidities: {{comorbidities}}
- Previous weight loss attempts: {{previousAttempts}}
- Lifestyle intervention: {{lifestyleIntervention}}
- Pharmacotherapy options: {{pharmacotherapy}}
- Bariatric surgery criteria: {{surgeryCriteria}}
- Monitoring plan: {{monitoringPlan}}
- Goals: {{goals}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bmiCategory',
    'comorbidities',
    'previousAttempts',
    'lifestyleIntervention',
    'pharmacotherapy',
    'surgeryCriteria',
    'monitoringPlan',
    'goals',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Obesity\\nBMI >30")] --> B["Lifestyle Modification"]
    B --> C["Diet + Exercise\\n6 months"]
    C --> D{"5% Weight\\nLoss?"}
    D -->|"Yes"| E["Continue + Monitor"]
    D -->|"No"| F{"BMI ≥30 or\\nBMI ≥27 + Comorbid?"}
    F -->|"Yes"| G["Add Pharmacotherapy"]
    G --> H["GLP-1 RA\\nTirzepatide\\nOther agents"]
    H --> I{"Adequate\\nResponse?"}
    I -->|"No"| J{"BMI ≥40 or\\nBMI ≥35 + Comorbid?"}
    J -->|"Yes"| K["Bariatric Surgery\\nConsultation"]
    K --> L["Sleeve/RYGB/DS"]
    style L fill:#4169E1,color:#fff
    style E fill:#228B22,color:#fff`,
};

/**
 * Pituitary Tumor Approach template
 */
export const pituitaryTumorApproach: DiagramTemplate = {
  id: 'endo-pituitary-tumor',
  name: 'Pituitary Tumor Approach Algorithm',
  description: 'Diagnostic and management pathway for pituitary adenomas',
  domain: 'medicine',
  promptTemplate: `Create a pituitary tumor approach flowchart:
- Tumor size: {{tumorSize}}
- Hormonal status: {{hormonalStatus}}
- Visual symptoms: {{visualSymptoms}}
- Hormone hypersecretion type: {{hypersecretion}}
- Pituitary function tests: {{pituitaryTests}}
- MRI findings: {{mriFindings}}
- Medical vs surgical approach: {{treatmentApproach}}
- Follow-up plan: {{followUp}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'tumorSize',
    'hormonalStatus',
    'visualSymptoms',
    'hypersecretion',
    'pituitaryTests',
    'mriFindings',
    'treatmentApproach',
    'followUp',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Pituitary Mass\\nDiscovered")] --> B["Full Pituitary\\nHormone Panel"]
    B --> C{"Hormone\\nExcess?"}
    C -->|"Prolactin↑"| D["Prolactinoma"]
    D --> E["Cabergoline"]
    C -->|"GH/IGF-1↑"| F["Acromegaly"]
    F --> G["Surgery +/- Meds"]
    C -->|"ACTH↑"| H["Cushing's Disease"]
    H --> I["Surgery"]
    C -->|"Non-functional"| J{"Size + Symptoms?"}
    J -->|"Micro, Asx"| K["Monitor MRI"]
    J -->|"Macro or\\nVision Loss"| L["Surgery"]
    B --> M{"Hypopituitarism?"}
    M -->|"Yes"| N["Hormone Replacement"]
    style E fill:#228B22,color:#fff
    style I fill:#DC143C,color:#fff
    style L fill:#DC143C,color:#fff`,
};

/**
 * Osteoporosis Treatment Algorithm template
 */
export const osteoporosisTreatment: DiagramTemplate = {
  id: 'endo-osteoporosis-treatment',
  name: 'Osteoporosis Treatment Algorithm',
  description: 'Risk stratification and treatment pathway for osteoporosis management',
  domain: 'medicine',
  promptTemplate: `Create an osteoporosis treatment algorithm:
- T-score: {{tScore}}
- FRAX score: {{fraxScore}}
- Prior fractures: {{priorFractures}}
- Secondary causes evaluated: {{secondaryCauses}}
- Calcium/Vitamin D status: {{calciumVitD}}
- First-line therapy choice: {{firstLineTherapy}}
- Bisphosphonate duration: {{bisphosDuration}}
- Anabolic therapy criteria: {{anabolicCriteria}}
- Monitoring approach: {{monitoring}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'tScore',
    'fraxScore',
    'priorFractures',
    'secondaryCauses',
    'calciumVitD',
    'firstLineTherapy',
    'bisphosDuration',
    'anabolicCriteria',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Osteoporosis\\nDiagnosed")] --> B["Assess Fracture Risk"]
    B --> C{"T-score or\\nFRAX?"}
    C -->|"T ≤-2.5 or\\nFragility Fx"| D["High Risk"]
    C -->|"T -1 to -2.5\\nFRAX >20%"| E["Moderate Risk"]
    C -->|"Low FRAX"| F["Lifestyle Only"]
    D --> G{"Very High Risk?\\nMultiple Fx?"}
    G -->|"Yes"| H["Anabolic First\\nRomosozumab/Teriparatide"]
    G -->|"No"| I["Bisphosphonate\\nor Denosumab"]
    E --> I
    H --> J["Then Bisphosphonate"]
    I --> K{"5 years on\\nBisphosphonate?"}
    K -->|"Low Risk"| L["Drug Holiday"]
    K -->|"High Risk"| M["Continue or Switch"]
    style H fill:#4169E1,color:#fff
    style I fill:#228B22,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS
// =============================================================================

/**
 * Endocrine System Overview template
 */
export const endocrineSystemOverview: DiagramTemplate = {
  id: 'endo-system-overview',
  name: 'Endocrine System Overview',
  description: 'Comprehensive view of endocrine glands and their hormones',
  domain: 'medicine',
  promptTemplate: `Create an endocrine system overview diagram:
- Glands to include: {{glands}}
- Hormones to show: {{hormones}}
- Target organs: {{targetOrgans}}
- Feedback loops: {{feedbackLoops}}
- Color coding scheme: {{colorScheme}}
- Annotations: {{annotations}}
{{#additionalNotes}}Additional structures: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'glands',
    'hormones',
    'targetOrgans',
    'feedbackLoops',
    'colorScheme',
    'annotations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Brain["Central"]
        HYP["Hypothalamus"] --> PIT["Pituitary"]
        PIN["Pineal"]
    end
    subgraph Neck["Neck"]
        THY["Thyroid"] --> T4["T3/T4"]
        PARA["Parathyroids"] --> PTH["PTH"]
    end
    subgraph Trunk["Trunk"]
        ADR["Adrenals"] --> CORT["Cortisol"]
        PANC["Pancreas"] --> INS["Insulin"]
    end
    subgraph Gonads["Reproductive"]
        OV["Ovaries"] --> EST["Estrogen"]
        TES["Testes"] --> TEST["Testosterone"]
    end
    PIT -->|"TSH"| THY
    PIT -->|"ACTH"| ADR
    PIT -->|"FSH/LH"| OV & TES
    style HYP fill:#FFD700
    style PIT fill:#FFA500`,
};

/**
 * Hypothalamic-Pituitary Axes template
 */
export const hpaAxes: DiagramTemplate = {
  id: 'endo-hpa-axes',
  name: 'Hypothalamic-Pituitary Axes',
  description: 'Complete hypothalamic-pituitary-target organ feedback loops',
  domain: 'medicine',
  promptTemplate: `Create a hypothalamic-pituitary axes diagram:
- Axes to show: {{axes}}
- Releasing hormones: {{releasingHormones}}
- Pituitary hormones: {{pituitaryHormones}}
- Target glands: {{targetGlands}}
- End hormones: {{endHormones}}
- Feedback mechanisms: {{feedbackMechanisms}}
- Clinical correlations: {{clinicalCorrelations}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'axes',
    'releasingHormones',
    'pituitaryHormones',
    'targetGlands',
    'endHormones',
    'feedbackMechanisms',
    'clinicalCorrelations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Hypothalamus["Hypothalamus"]
        CRH["CRH"] & TRH["TRH"] & GnRH["GnRH"] & GHRH["GHRH"]
    end
    subgraph Pituitary["Anterior Pituitary"]
        ACTH["ACTH"] & TSH["TSH"] & LH["LH/FSH"] & GH["GH"]
    end
    subgraph Target["Target Glands"]
        ADR["Adrenals"] & THY["Thyroid"] & GON["Gonads"] & LIV["Liver"]
    end
    CRH --> ACTH --> ADR -->|"Cortisol"| CRH
    TRH --> TSH --> THY -->|"T3/T4"| TRH
    GnRH --> LH --> GON -->|"Sex Steroids"| GnRH
    GHRH --> GH --> LIV -->|"IGF-1"| GHRH
    style Hypothalamus fill:#FFD700,color:#000
    style Pituitary fill:#FFA500,color:#000`,
};

/**
 * Glucose Metabolism template
 */
export const glucoseMetabolism: DiagramTemplate = {
  id: 'endo-glucose-metabolism',
  name: 'Glucose Metabolism Diagram',
  description: 'Insulin and glucagon effects on glucose homeostasis',
  domain: 'medicine',
  promptTemplate: `Create a glucose metabolism diagram:
- Fed state pathways: {{fedState}}
- Fasting state pathways: {{fastingState}}
- Insulin actions: {{insulinActions}}
- Glucagon actions: {{glucagonActions}}
- Tissue targets: {{tissues}}
- Glucose transporters: {{transporters}}
- Key enzymes: {{enzymes}}
{{#additionalNotes}}Additional pathways: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'fedState',
    'fastingState',
    'insulinActions',
    'glucagonActions',
    'tissues',
    'transporters',
    'enzymes',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph FedState["Fed State"]
        FOOD["Glucose Intake"] --> BG["Blood Glucose↑"]
        BG --> BETA["Beta Cells"]
        BETA -->|"Insulin↑"| INS["Insulin Release"]
    end
    subgraph InsulinEffects["Insulin Actions"]
        INS --> MUS["Muscle: GLUT4\\nGlucose Uptake↑"]
        INS --> FAT["Adipose: Lipogenesis↑"]
        INS --> LIV["Liver: Glycogenesis↑"]
    end
    subgraph FastingState["Fasting State"]
        LOW["Low Glucose"] --> ALPHA["Alpha Cells"]
        ALPHA -->|"Glucagon↑"| GLU["Glucagon Release"]
        GLU --> LIV2["Liver: Glycogenolysis\\nGluconeogenesis"]
    end
    style INS fill:#4169E1,color:#fff
    style GLU fill:#DC143C,color:#fff`,
};

/**
 * Calcium Homeostasis template
 */
export const calciumHomeostasis: DiagramTemplate = {
  id: 'endo-calcium-homeostasis',
  name: 'Calcium Homeostasis Diagram',
  description: 'PTH, Vitamin D, and calcitonin regulation of calcium',
  domain: 'medicine',
  promptTemplate: `Create a calcium homeostasis diagram:
- PTH actions: {{pthActions}}
- Vitamin D activation: {{vitaminDActivation}}
- Calcitonin role: {{calcitoninRole}}
- Bone effects: {{boneEffects}}
- Kidney effects: {{kidneyEffects}}
- GI effects: {{giEffects}}
- Feedback regulation: {{feedback}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pthActions',
    'vitaminDActivation',
    'calcitoninRole',
    'boneEffects',
    'kidneyEffects',
    'giEffects',
    'feedback',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Regulation["Calcium Regulation"]
        CA["Blood Ca²⁺"] -->|"Low Ca²⁺"| PTH["PTH Release↑"]
        CA -->|"High Ca²⁺"| CAL["Calcitonin↑"]
    end
    subgraph PTHEffects["PTH Actions"]
        PTH --> BONE["Bone: Ca²⁺ Release↑"]
        PTH --> KID["Kidney: Ca²⁺ Reabs↑\\nPO₄ Excretion↑"]
        PTH --> VITD["Activates 1,25(OH)₂D"]
    end
    subgraph VitD["Vitamin D Actions"]
        VITD --> GI["GI: Ca²⁺ Absorption↑"]
        VITD --> BONE2["Bone: Mineralization"]
    end
    subgraph Calcitonin["Calcitonin"]
        CAL --> BONE3["Bone: Ca²⁺ Deposit↑"]
    end
    BONE & KID & GI -->|"Ca²⁺↑"| CA
    style PTH fill:#FFA500,color:#000
    style VITD fill:#FFD700,color:#000`,
};

// =============================================================================
// PROCEDURE ILLUSTRATIONS
// =============================================================================

/**
 * Thyroid FNA Procedure template
 */
export const thyroidFnaProcedure: DiagramTemplate = {
  id: 'endo-thyroid-fna-procedure',
  name: 'Thyroid FNA Procedure',
  description: 'Step-by-step ultrasound-guided thyroid fine needle aspiration',
  domain: 'medicine',
  promptTemplate: `Create a thyroid FNA procedure illustration:
- Patient positioning: {{patientPosition}}
- Ultrasound technique: {{usTechnique}}
- Needle approach: {{needleApproach}}
- Sampling technique: {{samplingTechnique}}
- Number of passes: {{passes}}
- Sample processing: {{sampleProcessing}}
- Complications to avoid: {{complications}}
- Post-procedure care: {{postCare}}
{{#additionalNotes}}Additional steps: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'patientPosition',
    'usTechnique',
    'needleApproach',
    'samplingTechnique',
    'passes',
    'sampleProcessing',
    'complications',
    'postCare',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Position Patient\\nNeck Extended"] --> B["US: Identify Nodule"]
    B --> C["Measure + Document"]
    C --> D["Prep Sterile Field"]
    D --> E["Local Anesthesia"]
    E --> F["Insert 25g Needle\\nUS-Guided"]
    F --> G["Capillary Technique\\n10-15 passes/site"]
    G --> H["Expel onto Slides"]
    H --> I["Air Dry + Fix"]
    I --> J["Repeat 2-4 Sites"]
    J --> K["Apply Pressure\\n5 min"]
    K --> L["Cytology Review"]
    style F fill:#4169E1,color:#fff
    style L fill:#228B22,color:#fff`,
};

/**
 * Insulin Pump Management template
 */
export const insulinPumpManagement: DiagramTemplate = {
  id: 'endo-insulin-pump-management',
  name: 'Insulin Pump Management',
  description: 'CSII setup, programming, and troubleshooting guide',
  domain: 'medicine',
  promptTemplate: `Create an insulin pump management flowchart:
- Pump initiation criteria: {{initiationCriteria}}
- Basal rate calculation: {{basalCalculation}}
- Bolus settings (ICR, ISF): {{bolusSettings}}
- Site rotation: {{siteRotation}}
- Troubleshooting high BG: {{troubleshootingHigh}}
- Troubleshooting pump issues: {{pumpIssues}}
- Sick day management: {{sickDay}}
- Exercise adjustments: {{exerciseAdjust}}
{{#additionalNotes}}Additional guidance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initiationCriteria',
    'basalCalculation',
    'bolusSettings',
    'siteRotation',
    'troubleshootingHigh',
    'pumpIssues',
    'sickDay',
    'exerciseAdjust',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Setup["Initial Setup"]
        A["Calculate TDD"] --> B["Basal = 50% TDD"]
        A --> C["ICR = 450-500/TDD"]
        A --> D["ISF = 1700-1800/TDD"]
    end
    subgraph Operation["Daily Operation"]
        E["Insert Site q3 days"] --> F["Rotate Sites"]
        G["Pre-meal Bolus"] --> H["Correction Bolus"]
    end
    subgraph Troubleshoot["Troubleshooting"]
        I["High BG >250"] --> J{"Ketones?"}
        J -->|"Yes"| K["Change Site\\nInject via Syringe"]
        J -->|"No"| L["Correction Bolus"]
        M["Pump Alarm"] --> N["Check Occlusion\\nBattery\\nReservoir"]
    end
    style K fill:#DC143C,color:#fff
    style B fill:#4169E1,color:#fff`,
};

/**
 * CGM Management template
 */
export const cgmManagement: DiagramTemplate = {
  id: 'endo-cgm-management',
  name: 'Continuous Glucose Monitoring Management',
  description: 'CGM interpretation, pattern analysis, and clinical decision making',
  domain: 'medicine',
  promptTemplate: `Create a CGM management guide:
- CGM metrics: {{cgmMetrics}}
- Time in range targets: {{tirTargets}}
- Pattern recognition: {{patterns}}
- Trend arrows interpretation: {{trendArrows}}
- Alarm settings: {{alarmSettings}}
- Dosing decisions: {{dosingDecisions}}
- AGP report interpretation: {{agpInterpretation}}
- Integration with pump: {{pumpIntegration}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cgmMetrics',
    'tirTargets',
    'patterns',
    'trendArrows',
    'alarmSettings',
    'dosingDecisions',
    'agpInterpretation',
    'pumpIntegration',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Metrics["CGM Metrics"]
        A["Time in Range\\n70-180: >70%"]
        B["Time Below\\n<70: <4%"]
        C["Time Above\\n>180: <25%"]
        D["GMI: ~A1c"]
        E["CV: <36%"]
    end
    subgraph Trends["Trend Arrows"]
        F["↑↑ Rising Fast"] --> G["Consider Correction"]
        H["↓↓ Falling Fast"] --> I["Eat 15g Carbs"]
        J["→ Stable"] --> K["No Action"]
    end
    subgraph Patterns["Pattern Analysis"]
        L["Fasting Highs"] --> M["Adjust Basal"]
        N["Post-meal Spikes"] --> O["Adjust ICR/Timing"]
        P["Overnight Lows"] --> Q["Reduce Night Basal"]
    end
    style A fill:#228B22,color:#fff
    style B fill:#DC143C,color:#fff`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES
// =============================================================================

/**
 * HbA1c Targets template
 */
export const hba1cTargets: DiagramTemplate = {
  id: 'endo-hba1c-targets',
  name: 'HbA1c Targets Reference',
  description: 'Individualized HbA1c targets based on patient factors',
  domain: 'medicine',
  promptTemplate: `Create an HbA1c targets reference:
- General target: {{generalTarget}}
- Tight control candidates: {{tightControl}}
- Relaxed target criteria: {{relaxedTarget}}
- Hypoglycemia risk factors: {{hypoRisk}}
- Life expectancy considerations: {{lifeExpectancy}}
- Complication status: {{complications}}
- ADA recommendations: {{adaRecs}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'generalTarget',
    'tightControl',
    'relaxedTarget',
    'hypoRisk',
    'lifeExpectancy',
    'complications',
    'adaRecs',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("HbA1c Target\\nSelection")] --> B{"Patient\\nCharacteristics?"}
    B -->|"Young, Healthy\\nNo Hypo Risk"| C["<6.5%\\nTight Control"]
    B -->|"Most Adults"| D["<7%\\nStandard"]
    B -->|"Elderly, Comorbid\\nHypo Risk"| E["<8%\\nRelaxed"]
    B -->|"Limited Life\\nExpectancy"| F["Avoid Symptoms\\nNo Strict Target"]
    subgraph Factors["Consider"]
        G["Disease Duration"]
        H["Hypoglycemia History"]
        I["CV Disease"]
        J["Resources/Support"]
    end
    style C fill:#228B22,color:#fff
    style D fill:#4169E1,color:#fff
    style E fill:#FFA500,color:#000`,
};

/**
 * Thyroid Function Interpretation template
 */
export const thyroidFunctionInterpretation: DiagramTemplate = {
  id: 'endo-thyroid-function',
  name: 'Thyroid Function Test Interpretation',
  description: 'Systematic interpretation of TSH, T4, T3 results',
  domain: 'medicine',
  promptTemplate: `Create a thyroid function interpretation guide:
- TSH patterns: {{tshPatterns}}
- Free T4 interpretation: {{freeT4}}
- Free T3 role: {{freeT3}}
- Antibody testing: {{antibodies}}
- Primary vs secondary patterns: {{primarySecondary}}
- Common scenarios: {{commonScenarios}}
- Pitfalls: {{pitfalls}}
{{#additionalNotes}}Special cases: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'tshPatterns',
    'freeT4',
    'freeT3',
    'antibodies',
    'primarySecondary',
    'commonScenarios',
    'pitfalls',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Check TSH")] --> B{"TSH Level?"}
    B -->|"Low"| C{"Free T4?"}
    B -->|"Normal"| D["Euthyroid"]
    B -->|"High"| E{"Free T4?"}
    C -->|"High"| F["Primary\\nHyperthyroidism"]
    C -->|"Normal"| G["Subclinical\\nHyperthyroid"]
    C -->|"Low"| H["Central\\nHypothyroid"]
    E -->|"Low"| I["Primary\\nHypothyroidism"]
    E -->|"Normal"| J["Subclinical\\nHypothyroid"]
    E -->|"High"| K["TSH-secreting\\nAdenoma or Resistance"]
    F --> L["Check T3, TRAb"]
    I --> M["Check TPO Ab"]
    style F fill:#DC143C,color:#fff
    style I fill:#4169E1,color:#fff
    style D fill:#228B22,color:#fff`,
};

/**
 * Adrenal Testing Interpretation template
 */
export const adrenalTesting: DiagramTemplate = {
  id: 'endo-adrenal-testing',
  name: 'Adrenal Testing Interpretation',
  description: 'Guide to interpreting adrenal function tests',
  domain: 'medicine',
  promptTemplate: `Create an adrenal testing interpretation guide:
- Morning cortisol interpretation: {{morningCortisol}}
- ACTH stimulation test: {{acthStim}}
- Dexamethasone suppression: {{dexSuppression}}
- Midnight cortisol/salivary: {{midnightCortisol}}
- 24h urine cortisol: {{urineCortisol}}
- Metanephrines interpretation: {{metanephrines}}
- Aldosterone/renin interpretation: {{aldoRenin}}
{{#additionalNotes}}Special scenarios: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'morningCortisol',
    'acthStim',
    'dexSuppression',
    'midnightCortisol',
    'urineCortisol',
    'metanephrines',
    'aldoRenin',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Insufficiency["Adrenal Insufficiency"]
        A["AM Cortisol"] -->|"<3"| B["AI Likely"]
        A -->|"3-15"| C["ACTH Stim Test"]
        A -->|">15"| D["AI Unlikely"]
        C -->|"Peak <18"| B
        C -->|"Peak >18"| D
        B --> E{"ACTH Level?"}
        E -->|"High"| F["Primary AI"]
        E -->|"Low/Normal"| G["Secondary AI"]
    end
    subgraph Cushing["Cushing Screening"]
        H["1mg DST"] -->|">1.8"| I["Possible Cushing"]
        H -->|"<1.8"| J["Cushing Unlikely"]
        I --> K["Confirm with\\n24h UFC or\\nMidnight Salivary"]
    end
    style B fill:#DC143C,color:#fff
    style I fill:#FFA500,color:#000`,
};

/**
 * Bone Density Scoring template
 */
export const boneDensityScoring: DiagramTemplate = {
  id: 'endo-bone-density-scoring',
  name: 'Bone Density Scoring Reference',
  description: 'DEXA interpretation and FRAX risk assessment guide',
  domain: 'medicine',
  promptTemplate: `Create a bone density scoring reference:
- T-score interpretation: {{tScoreInterpretation}}
- Z-score usage: {{zScoreUsage}}
- FRAX calculation inputs: {{fraxInputs}}
- FRAX thresholds for treatment: {{fraxThresholds}}
- Site-specific considerations: {{siteConsiderations}}
- Trabecular bone score: {{tbsScore}}
- When to repeat DEXA: {{repeatDexa}}
{{#additionalNotes}}Special cases: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'tScoreInterpretation',
    'zScoreUsage',
    'fraxInputs',
    'fraxThresholds',
    'siteConsiderations',
    'tbsScore',
    'repeatDexa',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph TScore["T-Score Classification"]
        A["T-score ≥ -1.0"] --> B["Normal"]
        C["T-score -1.0 to -2.5"] --> D["Osteopenia"]
        E["T-score ≤ -2.5"] --> F["Osteoporosis"]
        G["T-score ≤ -2.5\\n+ Fragility Fx"] --> H["Severe Osteoporosis"]
    end
    subgraph FRAX["FRAX Assessment"]
        I["Calculate FRAX"] --> J{"10-yr Hip Fx?"}
        J -->|"≥3%"| K["Consider Treatment"]
        J -->|"<3%"| L{"Major Fx ≥20%?"}
        L -->|"Yes"| K
        L -->|"No"| M["Lifestyle + Follow"]
    end
    subgraph Sites["Sites to Measure"]
        N["Lumbar Spine L1-L4"]
        O["Total Hip"]
        P["Femoral Neck"]
    end
    style B fill:#228B22,color:#fff
    style D fill:#FFA500,color:#000
    style F fill:#DC143C,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All endocrinology templates
 */
export const endocrinologyTemplates: DiagramTemplate[] = [
  // Clinical Decision Trees
  diabetesManagement,
  thyroidNoduleWorkup,
  adrenalIncidentaloma,
  hypoglycemiaEvaluation,
  obesityManagement,
  pituitaryTumorApproach,
  osteoporosisTreatment,
  // Anatomical Diagrams
  endocrineSystemOverview,
  hpaAxes,
  glucoseMetabolism,
  calciumHomeostasis,
  // Procedure Illustrations
  thyroidFnaProcedure,
  insulinPumpManagement,
  cgmManagement,
  // Data Visualization
  hba1cTargets,
  thyroidFunctionInterpretation,
  adrenalTesting,
  boneDensityScoring,
];

export default endocrinologyTemplates;
