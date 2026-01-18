/**
 * nephrology.ts
 * Nephrology diagram templates for FINNISH
 *
 * Contains comprehensive templates for renal medicine including:
 * - Clinical decision trees (AKI workup, CKD management, electrolytes)
 * - Anatomical diagrams (nephron, glomerulus, electrolyte handling)
 * - Procedure illustrations (biopsy, dialysis access, transplant)
 * - Data visualization templates (CKD staging, urinalysis, protocols)
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CLINICAL DECISION TREES
// =============================================================================

/**
 * AKI Workup Algorithm template
 */
export const akiWorkupAlgorithm: DiagramTemplate = {
  id: 'nephro-aki-workup',
  name: 'AKI Workup Algorithm',
  description: 'Systematic approach to acute kidney injury evaluation and classification',
  domain: 'medicine',
  promptTemplate: `Create an AKI workup algorithm flowchart:
- Presentation: {{presentation}}
- Baseline creatinine: {{baselineCreatinine}}
- KDIGO stage: {{kdigoStage}}
- Prerenal indicators: {{prerenalIndicators}}
- Intrinsic indicators: {{intrinsicIndicators}}
- Postrenal indicators: {{postrenalIndicators}}
- Urinalysis findings: {{urinalysisFindings}}
- Management priorities: {{managementPriorities}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'baselineCreatinine',
    'kdigoStage',
    'prerenalIndicators',
    'intrinsicIndicators',
    'postrenalIndicators',
    'urinalysisFindings',
    'managementPriorities',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Initial["Initial Assessment"]
        A[("AKI Detected\\nCr rise or UOP")] --> B{"KDIGO Stage?"}
    end
    B -->|"Stage 1"| C["1.5-1.9x baseline"]
    B -->|"Stage 2"| D["2.0-2.9x baseline"]
    B -->|"Stage 3"| E["3x or Cr>4 or RRT"]
    C & D & E --> F{"Etiology?"}
    subgraph Prerenal["Prerenal"]
        F -->|"FeNa<1%\\nBUN/Cr>20"| G["Volume resuscitate"]
    end
    subgraph Intrinsic["Intrinsic"]
        F -->|"FeNa>2%\\nMuddy casts"| H["ATN/AIN workup"]
    end
    subgraph Postrenal["Postrenal"]
        F -->|"Hydronephrosis"| I["Relieve obstruction"]
    end
    style E fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff`,
};

/**
 * CKD Management Algorithm template
 */
export const ckdManagementAlgorithm: DiagramTemplate = {
  id: 'nephro-ckd-management',
  name: 'CKD Management Algorithm',
  description: 'Comprehensive CKD staging and management pathway following KDIGO guidelines',
  domain: 'medicine',
  promptTemplate: `Create a CKD management algorithm:
- eGFR value: {{egfrValue}}
- CKD stage: {{ckdStage}}
- Albuminuria category: {{albuminuriaCategory}}
- Underlying etiology: {{etiology}}
- Complications present: {{complications}}
- RAAS blockade status: {{raasBlockade}}
- BP target: {{bpTarget}}
- Referral criteria: {{referralCriteria}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'egfrValue',
    'ckdStage',
    'albuminuriaCategory',
    'etiology',
    'complications',
    'raasBlockade',
    'bpTarget',
    'referralCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("CKD Confirmed\\neGFR <60 x 3mo")] --> B{"Stage?"}
    B -->|"G3a 45-59"| C["Monitor q6-12mo"]
    B -->|"G3b 30-44"| D["Nephrology referral"]
    B -->|"G4 15-29"| E["Prep for RRT"]
    B -->|"G5 <15"| F["RRT initiation"]
    C & D --> G["Management"]
    G --> G1["BP <130/80"]
    G --> G2["ACEi/ARB if albuminuria"]
    G --> G3["SGLT2i if DKD"]
    G --> G4["Treat anemia, MBD"]
    E --> H["AV fistula creation"]
    F --> I{"Modality?"}
    I --> J["HD"] & K["PD"] & L["Transplant"]
    style F fill:#DC143C,color:#fff
    style L fill:#228B22,color:#fff`,
};

/**
 * Hyponatremia Workup Algorithm template
 */
export const hyponatremiaAlgorithm: DiagramTemplate = {
  id: 'nephro-hyponatremia-workup',
  name: 'Hyponatremia Workup Algorithm',
  description: 'Systematic approach to hyponatremia diagnosis and management',
  domain: 'medicine',
  promptTemplate: `Create a hyponatremia workup flowchart:
- Serum sodium: {{serumSodium}}
- Serum osmolality: {{serumOsm}}
- Urine osmolality: {{urineOsm}}
- Urine sodium: {{urineSodium}}
- Volume status: {{volumeStatus}}
- Symptoms: {{symptoms}}
- Correction rate: {{correctionRate}}
- Treatment approach: {{treatmentApproach}}
{{#additionalNotes}}Additional factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'serumSodium',
    'serumOsm',
    'urineOsm',
    'urineSodium',
    'volumeStatus',
    'symptoms',
    'correctionRate',
    'treatmentApproach',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Hyponatremia\\nNa <135")] --> B{"Serum Osm?"}
    B -->|"<280"| C["Hypotonic"]
    B -->|"280-295"| D["Isotonic\\n(pseudohypoNa)"]
    B -->|">295"| E["Hypertonic\\n(hyperglycemia)"]
    C --> F{"Volume Status?"}
    F -->|"Hypovolemic"| G{"UNa?"}
    G -->|"<20"| H["GI/skin losses"]
    G -->|">20"| I["Diuretics/salt-wasting"]
    F -->|"Euvolemic"| J["SIADH, hypothyroid"]
    F -->|"Hypervolemic"| K["CHF, cirrhosis, nephrotic"]
    style A fill:#FFA500,color:#000
    style J fill:#4169E1,color:#fff`,
};

/**
 * Hyperkalemia Management Algorithm template
 */
export const hyperkalemiaAlgorithm: DiagramTemplate = {
  id: 'nephro-hyperkalemia-management',
  name: 'Hyperkalemia Management Algorithm',
  description: 'Emergency and chronic management of hyperkalemia',
  domain: 'medicine',
  promptTemplate: `Create a hyperkalemia management flowchart:
- Potassium level: {{potassiumLevel}}
- ECG changes: {{ecgChanges}}
- Underlying cause: {{underlyingCause}}
- Renal function: {{renalFunction}}
- Medications contributing: {{medications}}
- Emergent interventions: {{emergentInterventions}}
- Chronic management: {{chronicManagement}}
- Dialysis indication: {{dialysisIndication}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'potassiumLevel',
    'ecgChanges',
    'underlyingCause',
    'renalFunction',
    'medications',
    'emergentInterventions',
    'chronicManagement',
    'dialysisIndication',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Hyperkalemia\\nK >5.5")] --> B{"ECG Changes?"}
    B -->|"Peaked T, wide QRS"| C["EMERGENCY"]
    C --> C1["Calcium gluconate 1g IV"]
    C --> C2["Insulin 10U + D50"]
    C --> C3["Albuterol nebs"]
    C --> C4["Consider HD"]
    B -->|"Normal ECG"| D{"K level?"}
    D -->|"5.5-6.0"| E["Kayexalate/Lokelma"]
    D -->|"6.0-6.5"| F["IV insulin + binders"]
    D -->|">6.5"| C
    E & F --> G["Address cause"]
    G --> G1["Stop K-sparing meds"]
    G --> G2["Low K diet"]
    G --> G3["Loop diuretic if able"]
    style C fill:#DC143C,color:#fff
    style C1 fill:#FFA500,color:#000`,
};

/**
 * Proteinuria Evaluation Algorithm template
 */
export const proteinuriaEvaluation: DiagramTemplate = {
  id: 'nephro-proteinuria-evaluation',
  name: 'Proteinuria Evaluation Algorithm',
  description: 'Workup and management of proteinuria based on severity and etiology',
  domain: 'medicine',
  promptTemplate: `Create a proteinuria evaluation flowchart:
- Dipstick result: {{dipstickResult}}
- UPCR or 24h protein: {{proteinQuantity}}
- Albumin vs total protein: {{albuminRatio}}
- Underlying conditions: {{underlyingConditions}}
- Glomerular vs tubular: {{proteinType}}
- Indications for biopsy: {{biopsyIndications}}
- Treatment approach: {{treatmentApproach}}
{{#additionalNotes}}Additional workup: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'dipstickResult',
    'proteinQuantity',
    'albuminRatio',
    'underlyingConditions',
    'proteinType',
    'biopsyIndications',
    'treatmentApproach',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Proteinuria\\nDetected")] --> B{"Quantify"}
    B --> C["UPCR or 24h"]
    C --> D{"Amount?"}
    D -->|"<150mg"| E["Normal"]
    D -->|"150-500mg"| F["Moderate"]
    D -->|"500-3500mg"| G["Significant"]
    D -->|">3500mg"| H["Nephrotic range"]
    F --> I["Monitor + ACEi/ARB"]
    G --> J["Nephrology referral"]
    H --> K["Urgent workup"]
    K --> K1["Lipid panel"]
    K --> K2["Albumin"]
    K --> K3["Consider biopsy"]
    J & K --> L{"Biopsy?"}
    L -->|"Yes"| M["Histology-directed Rx"]
    style H fill:#DC143C,color:#fff
    style M fill:#4169E1,color:#fff`,
};

/**
 * Hematuria Workup Algorithm template
 */
export const hematuriaWorkup: DiagramTemplate = {
  id: 'nephro-hematuria-workup',
  name: 'Hematuria Workup Algorithm',
  description: 'Systematic evaluation of microscopic and gross hematuria',
  domain: 'medicine',
  promptTemplate: `Create a hematuria workup flowchart:
- Type of hematuria: {{hematuriaType}}
- RBC morphology: {{rbcMorphology}}
- Presence of casts: {{rbcCasts}}
- Proteinuria present: {{proteinuria}}
- Age and risk factors: {{riskFactors}}
- Imaging findings: {{imagingFindings}}
- Urology vs nephrology referral: {{referralPath}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'hematuriaType',
    'rbcMorphology',
    'rbcCasts',
    'proteinuria',
    'riskFactors',
    'imagingFindings',
    'referralPath',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Hematuria\\n>3 RBC/hpf")] --> B{"Gross or\\nMicroscopic?"}
    B -->|"Gross"| C["Urgent evaluation"]
    B -->|"Microscopic"| D{"RBC morphology?"}
    D -->|"Dysmorphic\\n+ RBC casts"| E["Glomerular\\nNephrology"]
    D -->|"Isomorphic\\nNo casts"| F["Non-glomerular\\nUrology workup"]
    F --> G{"Age >35 or\\nRisk factors?"}
    G -->|"Yes"| H["CT urogram + cysto"]
    G -->|"No"| I["Renal US + repeat UA"]
    C --> H
    E --> J["Serologies + biopsy"]
    J --> J1["ANA, C3/C4, ANCA"]
    J --> J2["Anti-GBM, Hep B/C"]
    style C fill:#DC143C,color:#fff
    style E fill:#4169E1,color:#fff`,
};

/**
 * Dialysis Initiation Algorithm template
 */
export const dialysisInitiation: DiagramTemplate = {
  id: 'nephro-dialysis-initiation',
  name: 'Dialysis Initiation Decision Algorithm',
  description: 'Criteria and timing for initiating renal replacement therapy',
  domain: 'medicine',
  promptTemplate: `Create a dialysis initiation decision flowchart:
- eGFR level: {{egfrLevel}}
- Uremic symptoms: {{uremicSymptoms}}
- Fluid overload status: {{fluidStatus}}
- Electrolyte abnormalities: {{electrolyteIssues}}
- Nutritional status: {{nutritionalStatus}}
- Access readiness: {{accessReadiness}}
- Modality selection factors: {{modalityFactors}}
- Urgent indications: {{urgentIndications}}
{{#additionalNotes}}Patient preferences: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'egfrLevel',
    'uremicSymptoms',
    'fluidStatus',
    'electrolyteIssues',
    'nutritionalStatus',
    'accessReadiness',
    'modalityFactors',
    'urgentIndications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("CKD G5\\neGFR <15")] --> B{"Urgent\\nIndication?"}
    B -->|"Refractory K/acidosis\\nPulmonary edema\\nUremic encephalopathy"| C["Emergent HD"]
    B -->|"No"| D{"Symptoms?"}
    D -->|"Uremic sx\\nAnorexia\\nNausea"| E["Plan elective start"]
    D -->|"Asymptomatic"| F["Continue monitoring"]
    E --> G{"Access ready?"}
    G -->|"AVF mature"| H["Start HD"]
    G -->|"PD catheter"| I["Start PD"]
    G -->|"No access"| J["Temp catheter or\\nurgent access"]
    F --> K{"eGFR <10 or\\ndeclining fast?"}
    K -->|"Yes"| E
    style C fill:#DC143C,color:#fff
    style H fill:#228B22,color:#fff
    style I fill:#228B22,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS
// =============================================================================

/**
 * Nephron Structure template
 */
export const nephronStructure: DiagramTemplate = {
  id: 'nephro-nephron-structure',
  name: 'Nephron Structure Diagram',
  description: 'Detailed nephron anatomy with functional segments labeled',
  domain: 'medicine',
  promptTemplate: `Create a nephron structure diagram showing:
- Glomerulus components: {{glomerulusComponents}}
- Proximal tubule features: {{proximalTubule}}
- Loop of Henle segments: {{loopOfHenle}}
- Distal tubule characteristics: {{distalTubule}}
- Collecting duct details: {{collectingDuct}}
- Blood supply: {{bloodSupply}}
- Transport mechanisms: {{transportMechanisms}}
{{#additionalNotes}}Additional annotations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'glomerulusComponents',
    'proximalTubule',
    'loopOfHenle',
    'distalTubule',
    'collectingDuct',
    'bloodSupply',
    'transportMechanisms',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Cortex["Cortex"]
        A["Glomerulus"] --> B["PCT\\n65% reabsorption"]
        G["DCT"] --> H["Connecting tubule"]
    end
    subgraph Medulla["Medulla"]
        B --> C["Thin descending\\nH2O permeable"]
        C --> D["Thin ascending"]
        D --> E["Thick ascending\\nNa/K/Cl"]
        E --> F["Macula densa"]
        F --> G
    end
    subgraph CD["Collecting System"]
        H --> I["Cortical CD"]
        I --> J["Medullary CD\\nADH-responsive"]
    end
    style A fill:#DC143C,color:#fff
    style E fill:#4169E1,color:#fff`,
};

/**
 * Glomerulus Detailed template
 */
export const glomerulusDetail: DiagramTemplate = {
  id: 'nephro-glomerulus-detail',
  name: 'Glomerulus Detailed Anatomy',
  description: 'Detailed glomerular structure with filtration barrier components',
  domain: 'medicine',
  promptTemplate: `Create a detailed glomerulus diagram:
- Capillary structure: {{capillaryStructure}}
- Podocyte anatomy: {{podocyteAnatomy}}
- Basement membrane layers: {{gbmLayers}}
- Mesangial cells: {{mesangialCells}}
- Bowman's capsule: {{bowmansCapsule}}
- Filtration barrier: {{filtrationBarrier}}
- Afferent/efferent arterioles: {{arterioles}}
{{#additionalNotes}}Pathological changes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'capillaryStructure',
    'podocyteAnatomy',
    'gbmLayers',
    'mesangialCells',
    'bowmansCapsule',
    'filtrationBarrier',
    'arterioles',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Filtration["Filtration Barrier"]
        A["Fenestrated\\nEndothelium\\n70-100nm pores"]
        B["GBM\\nCollagen IV\\nLaminin"]
        C["Podocyte\\nFoot Processes\\nSlit diaphragm"]
    end
    subgraph Support["Support Cells"]
        D["Mesangial cells\\nPhagocytosis\\nMatrix support"]
    end
    subgraph Capsule["Bowman's Capsule"]
        E["Parietal epithelium"]
        F["Urinary space"]
    end
    G["Afferent\\narteriole"] --> A
    A --> B --> C --> F
    C --> H["Efferent\\narteriole"]
    style C fill:#22C55E,color:#fff`,
};

/**
 * Electrolyte Handling template
 */
export const electrolyteHandling: DiagramTemplate = {
  id: 'nephro-electrolyte-handling',
  name: 'Renal Electrolyte Handling',
  description: 'Nephron segment-specific electrolyte transport mechanisms',
  domain: 'medicine',
  promptTemplate: `Create a renal electrolyte handling diagram:
- Sodium handling by segment: {{sodiumHandling}}
- Potassium handling: {{potassiumHandling}}
- Calcium transport: {{calciumTransport}}
- Phosphate regulation: {{phosphateRegulation}}
- Magnesium handling: {{magnesiumHandling}}
- Key transporters: {{keyTransporters}}
- Hormonal regulation: {{hormonalRegulation}}
{{#additionalNotes}}Drug targets: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sodiumHandling',
    'potassiumHandling',
    'calciumTransport',
    'phosphateRegulation',
    'magnesiumHandling',
    'keyTransporters',
    'hormonalRegulation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph PCT["PCT (65%)"]
        A["Na/H exchanger\\nNa/glucose\\nNa/amino acid"]
    end
    subgraph TAL["TAL (25%)"]
        B["NKCC2\\nNa/K/2Cl\\n(Loop target)"]
    end
    subgraph DCT["DCT (5%)"]
        C["NCC\\nNa/Cl\\n(Thiazide target)"]
    end
    subgraph CD["CD (3%)"]
        D["ENaC\\n(Aldo-sensitive)\\nK secretion"]
    end
    A --> B --> C --> D
    style B fill:#4169E1,color:#fff
    style C fill:#22C55E,color:#fff
    style D fill:#FFA500,color:#000`,
};

/**
 * Acid-Base Regulation template
 */
export const acidBaseRegulation: DiagramTemplate = {
  id: 'nephro-acid-base-regulation',
  name: 'Renal Acid-Base Regulation',
  description: 'Nephron mechanisms of acid-base homeostasis',
  domain: 'medicine',
  promptTemplate: `Create a renal acid-base regulation diagram:
- Bicarbonate reabsorption: {{bicarbReabsorption}}
- Acid excretion: {{acidExcretion}}
- Ammonium handling: {{ammoniumHandling}}
- Titratable acid: {{titratableAcid}}
- PCT mechanisms: {{pctMechanisms}}
- Collecting duct role: {{collectingDuct}}
- Compensation mechanisms: {{compensation}}
{{#additionalNotes}}Pathological states: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bicarbReabsorption',
    'acidExcretion',
    'ammoniumHandling',
    'titratableAcid',
    'pctMechanisms',
    'collectingDuct',
    'compensation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph PCT["PCT - HCO3 Reclamation"]
        A["H+ secretion\\n(Na/H exchanger)"]
        B["HCO3 reabsorption\\n(~85%)"]
        C["Carbonic anhydrase"]
    end
    subgraph CD["Collecting Duct"]
        D["Type A intercalated\\nH+ secretion"]
        E["Type B intercalated\\nHCO3 secretion"]
    end
    subgraph Buffer["Urinary Buffers"]
        F["NH3 + H+ -> NH4+"]
        G["HPO4 + H+ -> H2PO4"]
    end
    A --> C --> B
    D --> F & G
    style D fill:#DC143C,color:#fff
    style F fill:#FFA500,color:#000`,
};

// =============================================================================
// PROCEDURE ILLUSTRATIONS
// =============================================================================

/**
 * Renal Biopsy Procedure template
 */
export const renalBiopsyProcedure: DiagramTemplate = {
  id: 'nephro-renal-biopsy-procedure',
  name: 'Renal Biopsy Procedure Steps',
  description: 'Step-by-step percutaneous renal biopsy procedure',
  domain: 'medicine',
  promptTemplate: `Create a renal biopsy procedure flowchart:
- Pre-procedure preparation: {{prePrep}}
- Positioning: {{positioning}}
- Ultrasound guidance: {{usGuidance}}
- Needle technique: {{needleTechnique}}
- Number of passes: {{numberOfPasses}}
- Post-procedure monitoring: {{postMonitoring}}
- Complications to watch: {{complications}}
{{#additionalNotes}}Contraindications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'prePrep',
    'positioning',
    'usGuidance',
    'needleTechnique',
    'numberOfPasses',
    'postMonitoring',
    'complications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Pre-procedure"] --> A1["Check coags\\nPT/INR, platelets"]
    A --> A2["Hold anticoagulants"]
    A --> A3["Type and screen"]
    A1 & A2 & A3 --> B["Position prone"]
    B --> C["US localization\\nLower pole, cortex"]
    C --> D["Local anesthesia"]
    D --> E["Biopsy gun\\n2-3 passes"]
    E --> F["Check specimen\\n10+ glomeruli"]
    F --> G["Post-procedure"]
    G --> G1["Bed rest 6h"]
    G --> G2["Serial H/H"]
    G --> G3["Watch for hematuria"]
    style E fill:#DC143C,color:#fff
    style G1 fill:#4169E1,color:#fff`,
};

/**
 * Dialysis Access Creation template
 */
export const dialysisAccessCreation: DiagramTemplate = {
  id: 'nephro-dialysis-access-creation',
  name: 'Dialysis Access Creation',
  description: 'Vascular access options and creation procedures for hemodialysis',
  domain: 'medicine',
  promptTemplate: `Create a dialysis access creation flowchart:
- Access type selection: {{accessTypeSelection}}
- Preferred vessel mapping: {{vesselMapping}}
- AVF creation steps: {{avfSteps}}
- AVG placement: {{avgPlacement}}
- Catheter insertion: {{catheterInsertion}}
- Maturation timeline: {{maturationTimeline}}
- Complications: {{complications}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'accessTypeSelection',
    'vesselMapping',
    'avfSteps',
    'avgPlacement',
    'catheterInsertion',
    'maturationTimeline',
    'complications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Dialysis Access\\nNeeded")] --> B{"Timeline?"}
    B -->|"3-6 months"| C["AVF preferred"]
    B -->|"2-4 weeks"| D["AVG"]
    B -->|"Immediate"| E["Tunneled catheter"]
    C --> C1["Vessel mapping"]
    C1 --> C2["Radiocephalic\\n(wrist)"]
    C1 --> C3["Brachiocephalic\\n(elbow)"]
    C1 --> C4["Brachiobasilic\\n(transposition)"]
    C2 & C3 & C4 --> F["Maturation\\n8-12 weeks"]
    D --> D1["PTFE graft\\n2-4 weeks use"]
    E --> E1["IJ preferred\\nImmediate use"]
    style C fill:#228B22,color:#fff
    style E fill:#FFA500,color:#000`,
};

/**
 * Kidney Transplant Evaluation template
 */
export const kidneyTransplantEval: DiagramTemplate = {
  id: 'nephro-transplant-evaluation',
  name: 'Kidney Transplant Evaluation',
  description: 'Pre-transplant evaluation and workup pathway',
  domain: 'medicine',
  promptTemplate: `Create a kidney transplant evaluation flowchart:
- Initial referral criteria: {{referralCriteria}}
- Medical evaluation: {{medicalEval}}
- Cardiac workup: {{cardiacWorkup}}
- Infectious disease screening: {{idScreening}}
- Immunological testing: {{immunoTesting}}
- Psychosocial evaluation: {{psychosocialEval}}
- Surgical evaluation: {{surgicalEval}}
- Listing criteria: {{listingCriteria}}
{{#additionalNotes}}Living donor pathway: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'referralCriteria',
    'medicalEval',
    'cardiacWorkup',
    'idScreening',
    'immunoTesting',
    'psychosocialEval',
    'surgicalEval',
    'listingCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Transplant\\nReferral")] --> B["Initial evaluation"]
    B --> C["Medical workup"]
    C --> C1["Cardiac: Echo, stress"]
    C --> C2["Cancer screening"]
    C --> C3["Infection: Hep, HIV, CMV"]
    B --> D["Immunology"]
    D --> D1["Blood type"]
    D --> D2["HLA typing"]
    D --> D3["PRA/crossmatch"]
    B --> E["Psychosocial"]
    E --> E1["Social work"]
    E --> E2["Psychiatry PRN"]
    C & D & E --> F{"Suitable?"}
    F -->|"Yes"| G["List for transplant"]
    F -->|"Issues"| H["Address/defer"]
    G --> I["Living vs deceased\\ndonor"]
    style G fill:#228B22,color:#fff`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES
// =============================================================================

/**
 * CKD Staging Reference template
 */
export const ckdStagingReference: DiagramTemplate = {
  id: 'nephro-ckd-staging',
  name: 'CKD Staging Reference',
  description: 'KDIGO CKD staging by GFR and albuminuria categories',
  domain: 'medicine',
  promptTemplate: `Create a CKD staging reference diagram:
- GFR categories (G1-G5): {{gfrCategories}}
- Albuminuria categories (A1-A3): {{albuminuriaCategories}}
- Risk stratification: {{riskStratification}}
- Monitoring frequency: {{monitoringFrequency}}
- Management by stage: {{managementByStage}}
- Referral thresholds: {{referralThresholds}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'gfrCategories',
    'albuminuriaCategories',
    'riskStratification',
    'monitoringFrequency',
    'managementByStage',
    'referralThresholds',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph GFR["GFR Categories"]
        G1["G1: >=90\\nNormal/high"]
        G2["G2: 60-89\\nMild decrease"]
        G3a["G3a: 45-59\\nMild-moderate"]
        G3b["G3b: 30-44\\nModerate-severe"]
        G4["G4: 15-29\\nSevere"]
        G5["G5: <15\\nKidney failure"]
    end
    subgraph Album["Albuminuria"]
        A1["A1: <30 mg/g\\nNormal"]
        A2["A2: 30-300\\nModerately increased"]
        A3["A3: >300\\nSeverely increased"]
    end
    subgraph Risk["Risk"]
        R1["Low"]
        R2["Moderate"]
        R3["High"]
        R4["Very high"]
    end
    style G5 fill:#DC143C,color:#fff
    style A3 fill:#FFA500,color:#000`,
};

/**
 * Urinalysis Interpretation template
 */
export const urinalysisInterpretation: DiagramTemplate = {
  id: 'nephro-urinalysis-interpretation',
  name: 'Urinalysis Interpretation Guide',
  description: 'Systematic interpretation of urinalysis findings',
  domain: 'medicine',
  promptTemplate: `Create a urinalysis interpretation guide:
- Dipstick components: {{dipstickComponents}}
- Microscopy findings: {{microscopyFindings}}
- Specific gravity interpretation: {{specificGravity}}
- pH significance: {{phSignificance}}
- Cast types and meanings: {{castTypes}}
- Crystal identification: {{crystalTypes}}
- Clinical correlations: {{clinicalCorrelations}}
{{#additionalNotes}}Limitations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'dipstickComponents',
    'microscopyFindings',
    'specificGravity',
    'phSignificance',
    'castTypes',
    'crystalTypes',
    'clinicalCorrelations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Dipstick["Dipstick"]
        D1["Protein: Glomerular dz"]
        D2["Blood: Hematuria"]
        D3["LE/Nitrite: UTI"]
        D4["Glucose: DM, Fanconi"]
    end
    subgraph Micro["Microscopy"]
        M1["RBC: >3/hpf abnormal"]
        M2["WBC: >5/hpf = pyuria"]
        M3["Bacteria: Infection"]
        M4["Epithelial: Contamination"]
    end
    subgraph Casts["Casts"]
        C1["Hyaline: Concentrated urine"]
        C2["RBC: Glomerulonephritis"]
        C3["WBC: Pyelonephritis/AIN"]
        C4["Muddy brown: ATN"]
        C5["Waxy: CKD"]
    end
    style C2 fill:#DC143C,color:#fff
    style C4 fill:#8B4513,color:#fff`,
};

/**
 * Electrolyte Replacement Protocol template
 */
export const electrolyteReplacement: DiagramTemplate = {
  id: 'nephro-electrolyte-replacement',
  name: 'Electrolyte Replacement Protocols',
  description: 'IV and oral electrolyte replacement dosing guidelines',
  domain: 'medicine',
  promptTemplate: `Create electrolyte replacement protocol diagram:
- Potassium replacement: {{potassiumReplacement}}
- Magnesium replacement: {{magnesiumReplacement}}
- Phosphorus replacement: {{phosphorusReplacement}}
- Calcium replacement: {{calciumReplacement}}
- Sodium correction: {{sodiumCorrection}}
- Monitoring parameters: {{monitoringParameters}}
- Renal dose adjustments: {{renalAdjustments}}
{{#additionalNotes}}Special situations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'potassiumReplacement',
    'magnesiumReplacement',
    'phosphorusReplacement',
    'calciumReplacement',
    'sodiumCorrection',
    'monitoringParameters',
    'renalAdjustments',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph K["Potassium"]
        K1["K 3.0-3.5: 40 mEq PO"]
        K2["K 2.5-3.0: 60-80 mEq"]
        K3["K <2.5: IV 10-20 mEq/hr"]
        K4["Max peripheral: 10 mEq/hr"]
    end
    subgraph Mg["Magnesium"]
        M1["Mg 1.0-1.5: 2-4g IV"]
        M2["Mg <1.0: 4-8g IV"]
        M3["Replete before K"]
    end
    subgraph Phos["Phosphorus"]
        P1["Phos 1.0-2.0: Neutra-Phos"]
        P2["Phos <1.0: IV K-Phos"]
        P3["15-30 mmol over 6h"]
    end
    subgraph Ca["Calcium"]
        C1["Symptomatic: Ca gluconate 1-2g"]
        C2["Asymptomatic: oral Ca + Vit D"]
    end
    style K3 fill:#DC143C,color:#fff
    style C1 fill:#FFA500,color:#000`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All nephrology templates
 */
export const nephrologyTemplates: DiagramTemplate[] = [
  // Clinical Decision Trees (6)
  akiWorkupAlgorithm,
  ckdManagementAlgorithm,
  hyponatremiaAlgorithm,
  hyperkalemiaAlgorithm,
  proteinuriaEvaluation,
  hematuriaWorkup,
  dialysisInitiation,
  // Anatomical Diagrams (4)
  nephronStructure,
  glomerulusDetail,
  electrolyteHandling,
  acidBaseRegulation,
  // Procedure Illustrations (3)
  renalBiopsyProcedure,
  dialysisAccessCreation,
  kidneyTransplantEval,
  // Data Visualization (3)
  ckdStagingReference,
  urinalysisInterpretation,
  electrolyteReplacement,
];

export default nephrologyTemplates;
