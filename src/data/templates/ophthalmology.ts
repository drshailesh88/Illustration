/**
 * ophthalmology.ts
 * Ophthalmology diagram templates for FINNISH
 *
 * Contains comprehensive templates for eye and vision medicine including:
 * - Clinical decision algorithms
 * - Diagnostic flowcharts
 * - Anatomical diagrams
 * - Procedure illustrations
 * - Data visualization templates
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CLINICAL DECISION TREES (5)
// =============================================================================

/**
 * Red Eye Evaluation Algorithm template
 */
export const redEyeEvaluation: DiagramTemplate = {
  id: 'ophth-red-eye-algorithm',
  name: 'Red Eye Evaluation Algorithm',
  description: 'Systematic approach to differential diagnosis and management of the red eye',
  domain: 'medicine',
  promptTemplate: `Create a red eye evaluation algorithm flowchart:
- Patient presentation: {{presentation}}
- Vision status: {{visionStatus}}
- Pain characteristics: {{painCharacteristics}}
- Discharge type: {{dischargeType}}
- Pupil findings: {{pupilFindings}}
- IOP measurement: {{iopMeasurement}}
- Slit lamp findings: {{slitLampFindings}}
- Differential diagnosis: {{differentialDiagnosis}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'visionStatus',
    'painCharacteristics',
    'dischargeType',
    'pupilFindings',
    'iopMeasurement',
    'slitLampFindings',
    'differentialDiagnosis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Initial["Initial Assessment"]
        A[("👁️ Red Eye\\nPresentation")] --> B{"Vision\\nAffected?"}
    end
    subgraph Emergency["Vision Threatening"]
        B -->|"Yes"| C["🚨 Urgent Eval"]
        C --> C1{"IOP High?"}
        C1 -->|"Yes"| C2["Acute Glaucoma"]
        C1 -->|"No"| C3["Keratitis/Uveitis"]
    end
    subgraph NonUrgent["Non-Vision Threatening"]
        B -->|"No"| D{"Discharge?"}
        D -->|"Purulent"| E["Bacterial Conjunctivitis"]
        D -->|"Watery"| F["Viral/Allergic"]
        D -->|"None"| G["Episcleritis/Subconj Hemorrhage"]
    end
    style C fill:#DC143C,color:#fff
    style E fill:#FFA500,color:#000`,
};

/**
 * Vision Loss Workup Algorithm template
 */
export const visionLossWorkup: DiagramTemplate = {
  id: 'ophth-vision-loss-algorithm',
  name: 'Vision Loss Workup Algorithm',
  description: 'Systematic evaluation pathway for acute and chronic vision loss',
  domain: 'medicine',
  promptTemplate: `Create a vision loss workup algorithm:
- Onset: {{onset}}
- Unilateral or bilateral: {{laterality}}
- Associated symptoms: {{associatedSymptoms}}
- Visual field pattern: {{visualFieldPattern}}
- Pupil response: {{pupilResponse}}
- Fundus findings: {{fundusFindings}}
- Neuroimaging indication: {{neuroimagingIndication}}
- Etiology suspected: {{etiology}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'onset',
    'laterality',
    'associatedSymptoms',
    'visualFieldPattern',
    'pupilResponse',
    'fundusFindings',
    'neuroimagingIndication',
    'etiology',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("👁️ Vision Loss")] --> B{"Onset?"}
    B -->|"Sudden"| C{"Painful?"}
    B -->|"Gradual"| D["Cataract/Glaucoma/AMD"]
    C -->|"Yes"| E["Acute Glaucoma\\nOptic Neuritis"]
    C -->|"No"| F{"APD Present?"}
    F -->|"Yes"| G["CRAO/CRVO\\nOptic Neuropathy"]
    F -->|"No"| H["Retinal Detachment\\nVitreous Hemorrhage"]
    G --> I["Urgent Workup"]
    H --> J["Dilated Exam"]
    style E fill:#DC143C,color:#fff
    style G fill:#FFA500,color:#000`,
};

/**
 * Glaucoma Management Algorithm template
 */
export const glaucomaManagement: DiagramTemplate = {
  id: 'ophth-glaucoma-algorithm',
  name: 'Glaucoma Management Algorithm',
  description: 'Stepwise approach to glaucoma diagnosis and treatment escalation',
  domain: 'medicine',
  promptTemplate: `Create a glaucoma management flowchart:
- Glaucoma type: {{glaucomaType}}
- IOP baseline: {{iopBaseline}}
- Target IOP: {{targetIop}}
- Optic nerve status: {{opticNerveStatus}}
- Visual field defects: {{visualFieldDefects}}
- Current medications: {{currentMedications}}
- Treatment escalation: {{treatmentEscalation}}
- Surgical options: {{surgicalOptions}}
{{#additionalNotes}}Risk factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'glaucomaType',
    'iopBaseline',
    'targetIop',
    'opticNerveStatus',
    'visualFieldDefects',
    'currentMedications',
    'treatmentEscalation',
    'surgicalOptions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("👁️ Glaucoma\\nDiagnosed")] --> B["Set Target IOP"]
    B --> C["First-Line: PGA"]
    C --> D{"IOP at\\nTarget?"}
    D -->|"No"| E["Add Beta Blocker"]
    E --> F{"IOP at\\nTarget?"}
    F -->|"No"| G["Add CAI or Alpha Agonist"]
    G --> H{"Progression?"}
    H -->|"Yes"| I["Consider SLT/Surgery"]
    D -->|"Yes"| J["Monitor q3-6mo"]
    F -->|"Yes"| J
    I --> K{"MIGS vs Trab?"}
    style I fill:#DC143C,color:#fff
    style J fill:#228B22,color:#fff`,
};

/**
 * Diabetic Eye Screening Algorithm template
 */
export const diabeticEyeScreening: DiagramTemplate = {
  id: 'ophth-diabetic-screening',
  name: 'Diabetic Eye Screening Protocol',
  description: 'Screening and referral algorithm for diabetic retinopathy',
  domain: 'medicine',
  promptTemplate: `Create a diabetic eye screening flowchart:
- Diabetes type: {{diabetesType}}
- Duration of diabetes: {{diabetesDuration}}
- HbA1c level: {{hba1cLevel}}
- Current retinopathy stage: {{retinopathyStage}}
- Macular edema present: {{macularEdema}}
- Screening interval: {{screeningInterval}}
- Referral criteria: {{referralCriteria}}
- Treatment indications: {{treatmentIndications}}
{{#additionalNotes}}Risk factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diabetesType',
    'diabetesDuration',
    'hba1cLevel',
    'retinopathyStage',
    'macularEdema',
    'screeningInterval',
    'referralCriteria',
    'treatmentIndications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("🩺 Diabetic\\nPatient")] --> B{"Baseline\\nEye Exam"}
    B --> C{"Retinopathy\\nPresent?"}
    C -->|"No"| D["Annual Screening"]
    C -->|"Mild NPDR"| E["Screen q9-12mo"]
    C -->|"Moderate NPDR"| F["Screen q6mo"]
    C -->|"Severe NPDR"| G["⚠️ Refer Retina"]
    C -->|"PDR"| H["🚨 Urgent Referral"]
    G --> I["Consider PRP"]
    H --> I
    D --> J{"DME?"}
    J -->|"Yes"| K["Anti-VEGF"]
    style H fill:#DC143C,color:#fff
    style G fill:#FFA500,color:#000`,
};

/**
 * Cataract Surgery Planning Algorithm template
 */
export const cataractSurgeryPlanning: DiagramTemplate = {
  id: 'ophth-cataract-planning',
  name: 'Cataract Surgery Planning Algorithm',
  description: 'Preoperative assessment and IOL selection decision tree',
  domain: 'medicine',
  promptTemplate: `Create a cataract surgery planning flowchart:
- Cataract type and grade: {{cataractType}}
- Visual symptoms: {{visualSymptoms}}
- Refractive goals: {{refractiveGoals}}
- Ocular comorbidities: {{ocularComorbidities}}
- Biometry results: {{biometryResults}}
- IOL selection: {{iolSelection}}
- Surgical approach: {{surgicalApproach}}
- Risk factors: {{riskFactors}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cataractType',
    'visualSymptoms',
    'refractiveGoals',
    'ocularComorbidities',
    'biometryResults',
    'iolSelection',
    'surgicalApproach',
    'riskFactors',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("👁️ Cataract\\nAssessment")] --> B["Biometry + Topography"]
    B --> C{"Astigmatism\\n>1.0 D?"}
    C -->|"Yes"| D["Toric IOL"]
    C -->|"No"| E{"Spectacle\\nIndependence?"}
    E -->|"Desired"| F["Multifocal/EDOF"]
    E -->|"Not Priority"| G["Monofocal"]
    D --> H["Target Refraction"]
    F --> H
    G --> H
    H --> I{"Comorbidities?"}
    I -->|"Glaucoma"| J["Consider MIGS"]
    I -->|"Macular Disease"| K["Avoid Premium IOL"]
    style F fill:#4169E1,color:#fff
    style D fill:#4169E1,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS (4)
// =============================================================================

/**
 * Eye Anatomy template
 */
export const eyeAnatomy: DiagramTemplate = {
  id: 'ophth-eye-anatomy',
  name: 'Eye Anatomy Cross-Section',
  description: 'Comprehensive labeled diagram of eye structures',
  domain: 'medicine',
  promptTemplate: `Create a labeled eye anatomy diagram showing:
- Anterior segment structures: {{anteriorSegment}}
- Posterior segment structures: {{posteriorSegment}}
- Uveal tract: {{uvealTract}}
- Optical pathway: {{opticalPathway}}
- Vascular supply: {{vascularSupply}}
- Annotations: {{annotations}}
{{#additionalNotes}}Focus areas: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'anteriorSegment',
    'posteriorSegment',
    'uvealTract',
    'opticalPathway',
    'vascularSupply',
    'annotations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Anterior["Anterior Segment"]
        COR["Cornea"] --> AC["Anterior Chamber"]
        AC --> IRIS["Iris"] --> LENS["Lens"]
    end
    subgraph Posterior["Posterior Segment"]
        VIT["Vitreous"] --> RET["Retina"]
        RET --> CHO["Choroid"]
        CHO --> SCL["Sclera"]
    end
    LENS --> VIT
    subgraph Nerve["Visual Pathway"]
        RET --> ON["Optic Nerve"]
    end
    style COR fill:#87CEEB
    style RET fill:#FFA500`,
};

/**
 * Retinal Layers template
 */
export const retinalLayers: DiagramTemplate = {
  id: 'ophth-retinal-layers',
  name: 'Retinal Layers Diagram',
  description: 'Detailed histological representation of retinal layers',
  domain: 'medicine',
  promptTemplate: `Create a retinal layers diagram showing:
- Inner limiting membrane: {{ilm}}
- Nerve fiber layer: {{nfl}}
- Ganglion cell layer: {{gcl}}
- Inner plexiform layer: {{ipl}}
- Inner nuclear layer: {{inl}}
- Outer plexiform layer: {{opl}}
- Outer nuclear layer: {{onl}}
- Photoreceptor layer: {{photoreceptors}}
- RPE: {{rpe}}
- Bruch's membrane: {{bruchs}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ilm',
    'nfl',
    'gcl',
    'ipl',
    'inl',
    'opl',
    'onl',
    'photoreceptors',
    'rpe',
    'bruchs',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Inner["Inner Retina"]
        ILM["ILM"] --> NFL["NFL"]
        NFL --> GCL["GCL"]
        GCL --> IPL["IPL"]
    end
    subgraph Middle["Middle Retina"]
        IPL --> INL["INL"]
        INL --> OPL["OPL"]
    end
    subgraph Outer["Outer Retina"]
        OPL --> ONL["ONL"]
        ONL --> PR["Photoreceptors"]
        PR --> RPE["RPE"]
        RPE --> BM["Bruch's Membrane"]
    end
    style PR fill:#FFD700
    style RPE fill:#8B4513`,
};

/**
 * Visual Pathway template
 */
export const visualPathway: DiagramTemplate = {
  id: 'ophth-visual-pathway',
  name: 'Visual Pathway Diagram',
  description: 'Neuroanatomical pathway from retina to visual cortex',
  domain: 'medicine',
  promptTemplate: `Create a visual pathway diagram showing:
- Retina: {{retina}}
- Optic nerve: {{opticNerve}}
- Optic chiasm: {{opticChiasm}}
- Optic tract: {{opticTract}}
- LGN: {{lgn}}
- Optic radiations: {{opticRadiations}}
- Visual cortex: {{visualCortex}}
- Visual field correlations: {{visualFieldCorrelations}}
{{#additionalNotes}}Lesion localization: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'retina',
    'opticNerve',
    'opticChiasm',
    'opticTract',
    'lgn',
    'opticRadiations',
    'visualCortex',
    'visualFieldCorrelations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Eyes["Eyes"]
        RE["Right Eye"] --> RON["R Optic Nerve"]
        LE["Left Eye"] --> LON["L Optic Nerve"]
    end
    RON & LON --> CHI["Optic Chiasm"]
    CHI --> ROT["R Optic Tract"]
    CHI --> LOT["L Optic Tract"]
    ROT --> RLGN["R LGN"]
    LOT --> LLGN["L LGN"]
    RLGN --> ROR["R Optic Radiations"]
    LLGN --> LOR["L Optic Radiations"]
    ROR --> RVC["R Visual Cortex"]
    LOR --> LVC["L Visual Cortex"]
    style CHI fill:#FFA500
    style RVC fill:#9370DB
    style LVC fill:#9370DB`,
};

/**
 * Aqueous Humor Flow template
 */
export const aqueousFlow: DiagramTemplate = {
  id: 'ophth-aqueous-flow',
  name: 'Aqueous Humor Flow Diagram',
  description: 'Production and drainage pathway of aqueous humor',
  domain: 'medicine',
  promptTemplate: `Create an aqueous humor flow diagram showing:
- Ciliary body production: {{ciliaryBody}}
- Posterior chamber: {{posteriorChamber}}
- Pupil flow: {{pupilFlow}}
- Anterior chamber: {{anteriorChamber}}
- Trabecular outflow: {{trabecularOutflow}}
- Uveoscleral outflow: {{uveoScleralOutflow}}
- Schlemm's canal: {{schlemmsCanal}}
- Episcleral veins: {{episcleralVeins}}
{{#additionalNotes}}IOP regulation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ciliaryBody',
    'posteriorChamber',
    'pupilFlow',
    'anteriorChamber',
    'trabecularOutflow',
    'uveoScleralOutflow',
    'schlemmsCanal',
    'episcleralVeins',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Production["Production"]
        CB["Ciliary Body"] -->|"Secretion"| PC["Posterior Chamber"]
    end
    PC -->|"Through Pupil"| AC["Anterior Chamber"]
    subgraph Drainage["Outflow"]
        AC --> TM["Trabecular Meshwork\\n(90%)"]
        AC --> UV["Uveoscleral\\n(10%)"]
        TM --> SC["Schlemm's Canal"]
        SC --> EV["Episcleral Veins"]
    end
    style CB fill:#4169E1
    style TM fill:#228B22
    style UV fill:#228B22`,
};

// =============================================================================
// PROCEDURE ILLUSTRATIONS (3)
// =============================================================================

/**
 * Cataract Surgery Steps template
 */
export const cataractSurgerySteps: DiagramTemplate = {
  id: 'ophth-cataract-procedure',
  name: 'Cataract Surgery Steps',
  description: 'Step-by-step phacoemulsification procedure illustration',
  domain: 'medicine',
  promptTemplate: `Create a cataract surgery procedure flowchart:
- Anesthesia: {{anesthesia}}
- Incision creation: {{incision}}
- Capsulorhexis: {{capsulorhexis}}
- Hydrodissection: {{hydrodissection}}
- Phacoemulsification: {{phacoemulsification}}
- Cortex removal: {{cortexRemoval}}
- IOL implantation: {{iolImplantation}}
- Wound closure: {{woundClosure}}
{{#additionalNotes}}Complications to monitor: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'anesthesia',
    'incision',
    'capsulorhexis',
    'hydrodissection',
    'phacoemulsification',
    'cortexRemoval',
    'iolImplantation',
    'woundClosure',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Topical Anesthesia"] --> B["Clear Corneal Incision"]
    B --> C["OVD Injection"]
    C --> D["Capsulorhexis"]
    D --> E["Hydrodissection"]
    E --> F["Phacoemulsification"]
    F --> G["I/A Cortex"]
    G --> H["IOL Implantation"]
    H --> I["Wound Hydration"]
    I --> J["IOP Check"]
    style D fill:#FFA500
    style F fill:#DC143C
    style H fill:#4169E1`,
};

/**
 * Intravitreal Injection Procedure template
 */
export const intravitealInjectionProcedure: DiagramTemplate = {
  id: 'ophth-ivt-procedure',
  name: 'Intravitreal Injection Procedure',
  description: 'Step-by-step intravitreal injection technique',
  domain: 'medicine',
  promptTemplate: `Create an intravitreal injection procedure flowchart:
- Indication: {{indication}}
- Medication: {{medication}}
- Preparation: {{preparation}}
- Anesthesia: {{anesthesia}}
- Injection site: {{injectionSite}}
- Technique: {{technique}}
- Post-procedure assessment: {{postProcedure}}
- Follow-up: {{followUp}}
{{#additionalNotes}}Complications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indication',
    'medication',
    'preparation',
    'anesthesia',
    'injectionSite',
    'technique',
    'postProcedure',
    'followUp',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Confirm Indication"] --> B["Informed Consent"]
    B --> C["Prep: Povidone-Iodine"]
    C --> D["Topical/Subconj Anesthesia"]
    D --> E["Speculum Placement"]
    E --> F["Mark 3.5-4mm from Limbus"]
    F --> G["30G Needle Injection"]
    G --> H["Withdraw + Apply Pressure"]
    H --> I["Check Vision + IOP"]
    I --> J["Follow-up PRN"]
    style F fill:#FFA500
    style G fill:#DC143C`,
};

/**
 * Laser Procedures template
 */
export const laserProcedures: DiagramTemplate = {
  id: 'ophth-laser-procedures',
  name: 'Ophthalmic Laser Procedures',
  description: 'Overview of common laser treatments in ophthalmology',
  domain: 'medicine',
  promptTemplate: `Create a laser procedures overview:
- Laser type: {{laserType}}
- PRP indications: {{prpIndications}}
- Focal/Grid laser: {{focalGridLaser}}
- YAG capsulotomy: {{yagCapsulotomy}}
- SLT for glaucoma: {{sltGlaucoma}}
- LPI (laser iridotomy): {{lpi}}
- Refractive laser: {{refractiveLaser}}
- Settings and parameters: {{settings}}
{{#additionalNotes}}Safety considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'laserType',
    'prpIndications',
    'focalGridLaser',
    'yagCapsulotomy',
    'sltGlaucoma',
    'lpi',
    'refractiveLaser',
    'settings',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Retina["Retinal Lasers"]
        PRP["PRP\\n(Argon/Green)"]
        FOCAL["Focal/Grid\\n(DME)"]
    end
    subgraph Glaucoma["Glaucoma Lasers"]
        SLT["SLT\\n(532nm)"]
        LPI["LPI\\n(YAG)"]
    end
    subgraph Anterior["Anterior Segment"]
        YAG["YAG Capsulotomy"]
        EXCIMER["LASIK/PRK\\n(Excimer)"]
    end
    style PRP fill:#228B22
    style SLT fill:#4169E1
    style YAG fill:#FFA500`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES (2)
// =============================================================================

/**
 * Visual Acuity Chart template
 */
export const visualAcuityChart: DiagramTemplate = {
  id: 'ophth-visual-acuity',
  name: 'Visual Acuity Documentation',
  description: 'Template for recording and interpreting visual acuity measurements',
  domain: 'medicine',
  promptTemplate: `Create a visual acuity documentation template:
- Uncorrected VA OD: {{ucvaOd}}
- Uncorrected VA OS: {{ucvaOs}}
- Best corrected VA OD: {{bcvaOd}}
- Best corrected VA OS: {{bcvaOs}}
- Pinhole improvement: {{pinholeImprovement}}
- Near vision: {{nearVision}}
- Notation system: {{notationSystem}}
- LogMAR conversion: {{logmarConversion}}
{{#additionalNotes}}Clinical significance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ucvaOd',
    'ucvaOs',
    'bcvaOd',
    'bcvaOs',
    'pinholeImprovement',
    'nearVision',
    'notationSystem',
    'logmarConversion',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Distance["Distance Vision"]
        A["Snellen Chart"]
        B["OD: 20/__"]
        C["OS: 20/__"]
    end
    subgraph Correction["With Correction"]
        D["BCVA OD: 20/__"]
        E["BCVA OS: 20/__"]
    end
    subgraph Conversions["Conversions"]
        F["20/20 = 6/6 = 1.0 = LogMAR 0"]
        G["20/40 = 6/12 = 0.5 = LogMAR 0.3"]
        H["20/200 = 6/60 = 0.1 = LogMAR 1.0"]
    end
    A --> B & C
    B --> D
    C --> E`,
};

/**
 * Visual Field Interpretation template
 */
export const visualFieldInterpretation: DiagramTemplate = {
  id: 'ophth-visual-field-interpretation',
  name: 'Visual Field Interpretation Template',
  description: 'Systematic approach to interpreting automated perimetry results',
  domain: 'medicine',
  promptTemplate: `Create a visual field interpretation template:
- Test type: {{testType}}
- Reliability indices: {{reliabilityIndices}}
- Pattern of loss: {{patternOfLoss}}
- Mean deviation: {{meanDeviation}}
- Pattern standard deviation: {{patternStandardDeviation}}
- GHT result: {{ghtResult}}
- VFI percentage: {{vfiPercentage}}
- Progression analysis: {{progressionAnalysis}}
{{#additionalNotes}}Clinical correlation: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'testType',
    'reliabilityIndices',
    'patternOfLoss',
    'meanDeviation',
    'patternStandardDeviation',
    'ghtResult',
    'vfiPercentage',
    'progressionAnalysis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Reliability["1. Reliability"]
        R1["Fixation Losses <20%"]
        R2["False Positives <15%"]
        R3["False Negatives <33%"]
    end
    subgraph Global["2. Global Indices"]
        G1["MD: Mean Deviation"]
        G2["PSD: Pattern SD"]
        G3["VFI: Visual Field Index"]
    end
    subgraph Pattern["3. Pattern Analysis"]
        P1["Arcuate Defect → Glaucoma"]
        P2["Hemianopia → Chiasm/Tract"]
        P3["Central Scotoma → Macular"]
        P4["Peripheral Constriction → RP"]
    end
    subgraph GHT["4. GHT"]
        H1["Within Normal"]
        H2["Borderline"]
        H3["Outside Normal"]
    end
    style H3 fill:#DC143C,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All ophthalmology templates
 */
export const ophthalmologyTemplates: DiagramTemplate[] = [
  // Clinical Decision Trees (5)
  redEyeEvaluation,
  visionLossWorkup,
  glaucomaManagement,
  diabeticEyeScreening,
  cataractSurgeryPlanning,
  // Anatomical Diagrams (4)
  eyeAnatomy,
  retinalLayers,
  visualPathway,
  aqueousFlow,
  // Procedure Illustrations (3)
  cataractSurgerySteps,
  intravitealInjectionProcedure,
  laserProcedures,
  // Data Visualization (2)
  visualAcuityChart,
  visualFieldInterpretation,
];

export default ophthalmologyTemplates;
