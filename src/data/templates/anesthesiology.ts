/**
 * anesthesiology.ts
 * Anesthesiology diagram templates for FINNISH
 *
 * Contains comprehensive templates for anesthesiology and perioperative medicine including:
 * - Clinical decision algorithms (pre-op, airway, intraop, PONV, pain)
 * - Anatomical diagrams (airway, spinal/epidural, brachial plexus, ANS)
 * - Procedure illustrations (RSI, spinal, arterial line)
 * - Data visualization (ASA, Mallampati, drug dosing)
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// DECISION TREES
// =============================================================================

/**
 * Pre-operative Assessment Algorithm template
 */
export const preopAssessment: DiagramTemplate = {
  id: 'anes-preop-assessment',
  name: 'Pre-operative Assessment Algorithm',
  description: 'Comprehensive pre-anesthesia evaluation and optimization pathway',
  domain: 'medicine',
  promptTemplate: `Create a pre-operative assessment algorithm flowchart:
- Patient demographics: {{patientDemographics}}
- Surgical procedure: {{surgicalProcedure}}
- Comorbidities: {{comorbidities}}
- Medications: {{medications}}
- Airway assessment: {{airwayAssessment}}
- Functional capacity (METs): {{functionalCapacity}}
- Labs/studies needed: {{labsStudies}}
- Optimization required: {{optimization}}
- NPO guidelines: {{npoGuidelines}}
{{#additionalNotes}}Additional considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'patientDemographics',
    'surgicalProcedure',
    'comorbidities',
    'medications',
    'airwayAssessment',
    'functionalCapacity',
    'labsStudies',
    'optimization',
    'npoGuidelines',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Pre-op Evaluation")] --> B["History & Physical"]
    B --> C{"ASA Status?"}
    C -->|"I-II"| D["Standard Workup"]
    C -->|"III-IV"| E["Extended Evaluation"]
    D --> F{"Airway Assessment"}
    E --> G["Subspecialty Consults"]
    G --> F
    F -->|"Difficult"| H["Airway Plan"]
    F -->|"Normal"| I["Standard Plan"]
    H & I --> J{"Functional Capacity?"}
    J -->|">=4 METs"| K["Proceed"]
    J -->|"<4 METs"| L["Optimize First"]
    style A fill:#4169E1,color:#fff
    style K fill:#228B22,color:#fff`,
};

/**
 * Airway Management Algorithm template
 */
export const airwayManagementAlgorithm: DiagramTemplate = {
  id: 'anes-airway-management',
  name: 'Airway Management Algorithm',
  description: 'Systematic approach to airway management and device selection',
  domain: 'medicine',
  promptTemplate: `Create an airway management algorithm flowchart:
- Airway assessment findings: {{airwayFindings}}
- Predictors of difficulty: {{difficultyPredictors}}
- Patient cooperation: {{patientCooperation}}
- Aspiration risk: {{aspirationRisk}}
- Primary plan: {{primaryPlan}}
- Backup devices: {{backupDevices}}
- Awake vs asleep approach: {{awakeVsAsleep}}
- Cricothyrotomy readiness: {{cricReadiness}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'airwayFindings',
    'difficultyPredictors',
    'patientCooperation',
    'aspirationRisk',
    'primaryPlan',
    'backupDevices',
    'awakeVsAsleep',
    'cricReadiness',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Airway Assessment")] --> B{"Predicted Difficult?"}
    B -->|"No"| C["Standard Induction"]
    B -->|"Yes"| D{"Patient Cooperative?"}
    D -->|"Yes"| E["Awake FOB"]
    D -->|"No"| F["Asleep + Video Laryngoscopy"]
    C --> G{"Successful?"}
    G -->|"Yes"| H["Proceed"]
    G -->|"No"| I["Call for Help + SGA"]
    F --> G
    I --> J{"Ventilation OK?"}
    J -->|"No"| K["CICO - Cricothyrotomy"]
    J -->|"Yes"| L["Alternative Technique"]
    style K fill:#DC143C,color:#fff
    style H fill:#228B22,color:#fff`,
};

/**
 * Difficult Airway Algorithm template
 */
export const difficultAirwayAlgorithm: DiagramTemplate = {
  id: 'anes-difficult-airway',
  name: 'Difficult Airway Algorithm',
  description: 'ASA difficult airway algorithm for cannot intubate/cannot oxygenate scenarios',
  domain: 'medicine',
  promptTemplate: `Create a difficult airway algorithm flowchart:
- Initial assessment: {{initialAssessment}}
- Intubation attempts: {{intubationAttempts}}
- Supraglottic airway use: {{sgaUse}}
- Mask ventilation status: {{maskVentilation}}
- CICO criteria: {{cicoCriteria}}
- Emergency surgical airway: {{surgicalAirway}}
- Team notification: {{teamNotification}}
- Post-event debriefing: {{debriefing}}
{{#additionalNotes}}Specific equipment: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialAssessment',
    'intubationAttempts',
    'sgaUse',
    'maskVentilation',
    'cicoCriteria',
    'surgicalAirway',
    'teamNotification',
    'debriefing',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Failed Intubation"] --> B{"Can Oxygenate?"}
    B -->|"Yes"| C["Wake Patient or SGA"]
    B -->|"No"| D["CICO Emergency"]
    C --> E{"SGA Successful?"}
    E -->|"Yes"| F["Continue via SGA or Wake"]
    E -->|"No"| D
    D --> G["Call for Help"]
    G --> H["Front of Neck Access"]
    H --> I{"Scalpel-Bougie-Tube"}
    I --> J["Confirm Ventilation"]
    style D fill:#DC143C,color:#fff
    style H fill:#8B0000,color:#fff
    style J fill:#228B22,color:#fff`,
};

/**
 * Intraoperative Hypotension Algorithm template
 */
export const intraopHypotension: DiagramTemplate = {
  id: 'anes-intraop-hypotension',
  name: 'Intraoperative Hypotension Algorithm',
  description: 'Systematic approach to managing intraoperative hypotension',
  domain: 'medicine',
  promptTemplate: `Create an intraoperative hypotension management flowchart:
- Baseline blood pressure: {{baselineBP}}
- Current blood pressure: {{currentBP}}
- Anesthetic depth: {{anestheticDepth}}
- Volume status assessment: {{volumeStatus}}
- Cardiac output estimate: {{cardiacOutput}}
- Surgical factors: {{surgicalFactors}}
- First-line interventions: {{firstLineInterventions}}
- Vasopressor selection: {{vasopressorSelection}}
- Escalation criteria: {{escalationCriteria}}
{{#additionalNotes}}Patient-specific factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'baselineBP',
    'currentBP',
    'anestheticDepth',
    'volumeStatus',
    'cardiacOutput',
    'surgicalFactors',
    'firstLineInterventions',
    'vasopressorSelection',
    'escalationCriteria',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Hypotension\\nMAP <65"] --> B{"Anesthetic Depth?"}
    B -->|"Too Deep"| C["Reduce Agent"]
    B -->|"Appropriate"| D{"Volume Status?"}
    D -->|"Hypovolemic"| E["Fluid Bolus"]
    D -->|"Euvolemic"| F{"SVR Low?"}
    F -->|"Yes"| G["Phenylephrine"]
    F -->|"No"| H{"CO Low?"}
    H -->|"Yes"| I["Ephedrine/Inotrope"]
    H -->|"No"| J["Reassess"]
    E --> K{"Response?"}
    K -->|"No"| L["Vasopressor Infusion"]
    K -->|"Yes"| M["Continue Monitoring"]
    style A fill:#FFA500,color:#000
    style L fill:#DC143C,color:#fff`,
};

/**
 * PONV Management Algorithm template
 */
export const ponvManagement: DiagramTemplate = {
  id: 'anes-ponv-management',
  name: 'PONV Management Algorithm',
  description: 'Post-operative nausea and vomiting prevention and treatment pathway',
  domain: 'medicine',
  promptTemplate: `Create a PONV management algorithm:
- Apfel risk factors: {{apfelFactors}}
- Risk score: {{riskScore}}
- Prophylaxis strategy: {{prophylaxisStrategy}}
- Anesthetic technique modifications: {{anestheticModifications}}
- Rescue medications: {{rescueMedications}}
- Multimodal approach: {{multimodalApproach}}
- Alternative therapies: {{alternativeTherapies}}
{{#additionalNotes}}High-risk considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'apfelFactors',
    'riskScore',
    'prophylaxisStrategy',
    'anestheticModifications',
    'rescueMedications',
    'multimodalApproach',
    'alternativeTherapies',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("PONV Risk\\nAssessment")] --> B{"Apfel Score?"}
    B -->|"0-1"| C["Low Risk - 1 Agent"]
    B -->|"2"| D["Moderate - 2 Agents"]
    B -->|"3-4"| E["High Risk - Multimodal"]
    C --> F["Ondansetron 4mg"]
    D --> G["Ondansetron + Dexamethasone"]
    E --> H["Triple Therapy + TIVA"]
    F & G & H --> I{"PONV in PACU?"}
    I -->|"Yes"| J["Rescue: Different Class"]
    I -->|"No"| K["Discharge Criteria Met"]
    style E fill:#DC143C,color:#fff
    style K fill:#228B22,color:#fff`,
};

/**
 * Pain Management Ladder template
 */
export const painManagementLadder: DiagramTemplate = {
  id: 'anes-pain-ladder',
  name: 'Pain Management Ladder',
  description: 'Stepwise approach to perioperative and chronic pain management',
  domain: 'medicine',
  promptTemplate: `Create a pain management ladder flowchart:
- Pain assessment: {{painAssessment}}
- Current pain level: {{currentPainLevel}}
- Step 1 non-opioid agents: {{stepOneAgents}}
- Step 2 weak opioids: {{stepTwoAgents}}
- Step 3 strong opioids: {{stepThreeAgents}}
- Adjuvant medications: {{adjuvantMedications}}
- Regional techniques: {{regionalTechniques}}
- Multimodal strategies: {{multimodalStrategies}}
{{#additionalNotes}}Patient-specific factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'painAssessment',
    'currentPainLevel',
    'stepOneAgents',
    'stepTwoAgents',
    'stepThreeAgents',
    'adjuvantMedications',
    'regionalTechniques',
    'multimodalStrategies',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Pain Assessment\\nNRS 0-10")] --> B{"Severity?"}
    B -->|"Mild 1-3"| C["Step 1: Non-Opioid"]
    B -->|"Moderate 4-6"| D["Step 2: Weak Opioid"]
    B -->|"Severe 7-10"| E["Step 3: Strong Opioid"]
    C --> C1["Paracetamol + NSAIDs"]
    D --> D1["Tramadol/Codeine + Step 1"]
    E --> E1["Morphine/Oxycodone + Step 1"]
    C1 & D1 & E1 --> F["+ Adjuvants PRN"]
    F --> G["Regional Block?"]
    G -->|"Yes"| H["Nerve Block/Epidural"]
    G -->|"No"| I["Continue Systemic"]
    style E fill:#DC143C,color:#fff
    style C fill:#228B22,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS
// =============================================================================

/**
 * Airway Anatomy template
 */
export const airwayAnatomy: DiagramTemplate = {
  id: 'anes-airway-anatomy',
  name: 'Airway Anatomy Diagram',
  description: 'Comprehensive upper and lower airway anatomy with clinical landmarks',
  domain: 'medicine',
  promptTemplate: `Create an airway anatomy diagram:
- Upper airway structures: {{upperAirway}}
- Laryngeal anatomy: {{laryngealAnatomy}}
- Vocal cord landmarks: {{vocalCords}}
- Tracheal anatomy: {{trachealAnatomy}}
- Bronchial tree: {{bronchialTree}}
- Clinical landmarks: {{clinicalLandmarks}}
- Measurements: {{measurements}}
{{#additionalNotes}}Variations to highlight: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'upperAirway',
    'laryngealAnatomy',
    'vocalCords',
    'trachealAnatomy',
    'bronchialTree',
    'clinicalLandmarks',
    'measurements',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Upper["Upper Airway"]
        A["Nasopharynx"] --> B["Oropharynx"]
        B --> C["Hypopharynx"]
    end
    subgraph Larynx["Larynx"]
        C --> D["Epiglottis"]
        D --> E["Vocal Cords"]
        E --> F["Subglottis"]
    end
    subgraph Lower["Lower Airway"]
        F --> G["Trachea 10-12cm"]
        G --> H["Carina"]
        H --> I["Right Main"] & J["Left Main"]
    end
    style E fill:#FFA500,color:#000
    style H fill:#DC143C,color:#fff`,
};

/**
 * Spinal/Epidural Anatomy template
 */
export const spinalEpiduralAnatomy: DiagramTemplate = {
  id: 'anes-spinal-epidural-anatomy',
  name: 'Spinal/Epidural Anatomy',
  description: 'Cross-sectional and sagittal anatomy for neuraxial anesthesia',
  domain: 'medicine',
  promptTemplate: `Create a spinal/epidural anatomy diagram:
- Vertebral levels: {{vertebralLevels}}
- Ligaments: {{ligaments}}
- Epidural space: {{epiduralSpace}}
- Dura mater: {{duraMater}}
- Subarachnoid space: {{subarachnoidSpace}}
- Spinal cord termination: {{conus}}
- CSF distribution: {{csfDistribution}}
- Needle trajectory: {{needleTrajectory}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'vertebralLevels',
    'ligaments',
    'epiduralSpace',
    'duraMater',
    'subarachnoidSpace',
    'conus',
    'csfDistribution',
    'needleTrajectory',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Posterior["Posterior to Anterior"]
        A["Skin"] --> B["Subcutaneous"]
        B --> C["Supraspinous Lig"]
        C --> D["Interspinous Lig"]
        D --> E["Ligamentum Flavum"]
        E --> F["Epidural Space"]
        F --> G["Dura Mater"]
        G --> H["Arachnoid"]
        H --> I["CSF + Cauda Equina"]
    end
    style F fill:#FFA500,color:#000
    style I fill:#ADD8E6,color:#000`,
};

/**
 * Brachial Plexus Anatomy template
 */
export const brachialPlexusAnatomy: DiagramTemplate = {
  id: 'anes-brachial-plexus',
  name: 'Brachial Plexus Anatomy',
  description: 'Brachial plexus anatomy from roots to terminal branches for regional blocks',
  domain: 'medicine',
  promptTemplate: `Create a brachial plexus anatomy diagram:
- Roots (C5-T1): {{roots}}
- Trunks: {{trunks}}
- Divisions: {{divisions}}
- Cords: {{cords}}
- Terminal branches: {{terminalBranches}}
- Block approaches: {{blockApproaches}}
- Sensory distribution: {{sensoryDistribution}}
{{#additionalNotes}}Common variations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'roots',
    'trunks',
    'divisions',
    'cords',
    'terminalBranches',
    'blockApproaches',
    'sensoryDistribution',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Roots["Roots"]
        R1["C5"] & R2["C6"] & R3["C7"] & R4["C8"] & R5["T1"]
    end
    subgraph Trunks["Trunks"]
        R1 & R2 --> T1["Superior"]
        R3 --> T2["Middle"]
        R4 & R5 --> T3["Inferior"]
    end
    subgraph Cords["Cords"]
        T1 & T2 --> C1["Lateral"]
        T1 & T2 & T3 --> C2["Posterior"]
        T3 --> C3["Medial"]
    end
    subgraph Branches["Branches"]
        C1 --> B1["Musculocutaneous"]
        C1 & C3 --> B2["Median"]
        C2 --> B3["Radial"]
        C3 --> B4["Ulnar"]
    end`,
};

/**
 * Autonomic Nervous System template
 */
export const autonomicNervousSystem: DiagramTemplate = {
  id: 'anes-autonomic-ns',
  name: 'Autonomic Nervous System',
  description: 'Sympathetic and parasympathetic nervous system for anesthetic considerations',
  domain: 'medicine',
  promptTemplate: `Create an autonomic nervous system diagram:
- Sympathetic chain: {{sympatheticChain}}
- Parasympathetic pathways: {{parasympathetic}}
- Target organs: {{targetOrgans}}
- Neurotransmitters: {{neurotransmitters}}
- Receptors: {{receptors}}
- Anesthetic implications: {{anestheticImplications}}
- Drug effects: {{drugEffects}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sympatheticChain',
    'parasympathetic',
    'targetOrgans',
    'neurotransmitters',
    'receptors',
    'anestheticImplications',
    'drugEffects',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph CNS["Central"]
        A["Hypothalamus"] --> B["Brainstem"]
    end
    subgraph SNS["Sympathetic T1-L2"]
        B --> C["Sympathetic Chain"]
        C --> D["Heart: Inotropy"]
        C --> E["Vessels: Vasoconstriction"]
        C --> F["Bronchi: Dilation"]
    end
    subgraph PNS["Parasympathetic"]
        B --> G["Vagus (CN X)"]
        G --> H["Heart: Bradycardia"]
        G --> I["GI: Increased motility"]
        G --> J["Bronchi: Constriction"]
    end
    style D fill:#FF6347
    style H fill:#4169E1`,
};

// =============================================================================
// PROCEDURE ILLUSTRATIONS
// =============================================================================

/**
 * Rapid Sequence Induction template
 */
export const rsiSequence: DiagramTemplate = {
  id: 'anes-rsi-sequence',
  name: 'RSI Sequence',
  description: 'Rapid sequence induction and intubation procedure steps',
  domain: 'medicine',
  promptTemplate: `Create an RSI sequence flowchart:
- Indications: {{indications}}
- Pre-oxygenation: {{preoxygenation}}
- Induction agent: {{inductionAgent}}
- Neuromuscular blocker: {{nmb}}
- Cricoid pressure: {{cricoidPressure}}
- Laryngoscopy technique: {{laryngoscopy}}
- Tube confirmation: {{tubeConfirmation}}
- Backup plan: {{backupPlan}}
{{#additionalNotes}}Modifications for specific conditions: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'indications',
    'preoxygenation',
    'inductionAgent',
    'nmb',
    'cricoidPressure',
    'laryngoscopy',
    'tubeConfirmation',
    'backupPlan',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Indication for RSI"] --> B["Pre-oxygenation 3-5 min"]
    B --> C["IV Induction Agent"]
    C --> D["Cricoid Pressure"]
    D --> E["Succinylcholine/Rocuronium"]
    E --> F["Wait 45-60 sec"]
    F --> G["Direct Laryngoscopy"]
    G --> H["ETT Placement"]
    H --> I["Confirm: EtCO2 + Auscultation"]
    I --> J["Release Cricoid"]
    J --> K["Secure Tube"]
    style A fill:#DC143C,color:#fff
    style I fill:#228B22,color:#fff`,
};

/**
 * Spinal Anesthesia Procedure template
 */
export const spinalAnesthesiaProcedure: DiagramTemplate = {
  id: 'anes-spinal-procedure',
  name: 'Spinal Anesthesia Procedure',
  description: 'Step-by-step spinal anesthesia technique illustration',
  domain: 'medicine',
  promptTemplate: `Create a spinal anesthesia procedure flowchart:
- Patient positioning: {{positioning}}
- Landmark identification: {{landmarks}}
- Sterile preparation: {{sterilePrep}}
- Local infiltration: {{localInfiltration}}
- Needle selection: {{needleSelection}}
- Insertion technique: {{insertionTechnique}}
- CSF confirmation: {{csfConfirmation}}
- Drug injection: {{drugInjection}}
- Post-procedure monitoring: {{monitoring}}
{{#additionalNotes}}Troubleshooting: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'positioning',
    'landmarks',
    'sterilePrep',
    'localInfiltration',
    'needleSelection',
    'insertionTechnique',
    'csfConfirmation',
    'drugInjection',
    'monitoring',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Position: Sitting/Lateral"] --> B["Identify L3-L4/L4-L5"]
    B --> C["Sterile Prep & Drape"]
    C --> D["Local Anesthetic to Skin"]
    D --> E["Insert Spinal Needle"]
    E --> F["Advance Through Ligaments"]
    F --> G{"CSF Flow?"}
    G -->|"Yes"| H["Inject LA + Opioid"]
    G -->|"No"| I["Redirect Needle"]
    I --> F
    H --> J["Position Patient"]
    J --> K["Monitor Block Level"]
    style G fill:#FFA500,color:#000
    style K fill:#228B22,color:#fff`,
};

/**
 * Arterial Line Insertion template
 */
export const arterialLineInsertion: DiagramTemplate = {
  id: 'anes-arterial-line',
  name: 'Arterial Line Insertion',
  description: 'Radial arterial line placement technique and troubleshooting',
  domain: 'medicine',
  promptTemplate: `Create an arterial line insertion flowchart:
- Site selection: {{siteSelection}}
- Allen test: {{allenTest}}
- Patient positioning: {{positioning}}
- Sterile technique: {{sterileTechnique}}
- Needle/catheter selection: {{needleCatheter}}
- Insertion technique: {{insertionTechnique}}
- Wire technique: {{wireTechnique}}
- Transducer setup: {{transducerSetup}}
- Waveform confirmation: {{waveformConfirmation}}
{{#additionalNotes}}Complications to avoid: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'siteSelection',
    'allenTest',
    'positioning',
    'sterileTechnique',
    'needleCatheter',
    'insertionTechnique',
    'wireTechnique',
    'transducerSetup',
    'waveformConfirmation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Site: Radial Preferred"] --> B["Modified Allen Test"]
    B --> C{"Collateral OK?"}
    C -->|"No"| D["Alternative Site"]
    C -->|"Yes"| E["Wrist Extension 30-45"]
    E --> F["Sterile Prep"]
    F --> G["Palpate Pulse"]
    G --> H["Insert at 30-45 angle"]
    H --> I{"Flash?"}
    I -->|"Yes"| J["Flatten & Advance"]
    I -->|"No"| K["Redirect"]
    J --> L["Remove Needle"]
    L --> M["Connect Transducer"]
    M --> N["Zero at Phlebostatic"]
    style N fill:#228B22,color:#fff`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES
// =============================================================================

/**
 * ASA Classification template
 */
export const asaClassification: DiagramTemplate = {
  id: 'anes-asa-classification',
  name: 'ASA Physical Status Classification',
  description: 'ASA physical status classification system with examples',
  domain: 'medicine',
  promptTemplate: `Create an ASA classification reference chart:
- ASA I criteria: {{asaOne}}
- ASA II criteria: {{asaTwo}}
- ASA III criteria: {{asaThree}}
- ASA IV criteria: {{asaFour}}
- ASA V criteria: {{asaFive}}
- ASA VI criteria: {{asaSix}}
- Emergency modifier: {{emergencyModifier}}
- Clinical examples: {{clinicalExamples}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'asaOne',
    'asaTwo',
    'asaThree',
    'asaFour',
    'asaFive',
    'asaSix',
    'emergencyModifier',
    'clinicalExamples',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph ASA["ASA Physical Status"]
        A1["ASA I\\nHealthy Patient"] --> A2["ASA II\\nMild Systemic Disease"]
        A2 --> A3["ASA III\\nSevere Systemic Disease"]
        A3 --> A4["ASA IV\\nLife-threatening"]
        A4 --> A5["ASA V\\nMoribund"]
        A5 --> A6["ASA VI\\nBrain Dead Donor"]
    end
    style A1 fill:#228B22,color:#fff
    style A2 fill:#90EE90,color:#000
    style A3 fill:#FFFF00,color:#000
    style A4 fill:#FFA500,color:#000
    style A5 fill:#DC143C,color:#fff
    style A6 fill:#000000,color:#fff`,
};

/**
 * Mallampati Scoring template
 */
export const mallampatiScoring: DiagramTemplate = {
  id: 'anes-mallampati-scoring',
  name: 'Mallampati Scoring System',
  description: 'Mallampati airway classification with visual guide and clinical correlation',
  domain: 'medicine',
  promptTemplate: `Create a Mallampati scoring guide:
- Class I visualization: {{classOne}}
- Class II visualization: {{classTwo}}
- Class III visualization: {{classThree}}
- Class IV visualization: {{classFour}}
- Examination technique: {{examTechnique}}
- Correlation with intubation difficulty: {{correlation}}
- Additional airway predictors: {{additionalPredictors}}
- Combined assessment: {{combinedAssessment}}
{{#additionalNotes}}Limitations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'classOne',
    'classTwo',
    'classThree',
    'classFour',
    'examTechnique',
    'correlation',
    'additionalPredictors',
    'combinedAssessment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Visible["Structures Visible"]
        M1["Class I\\nSoft palate\\nFauces\\nUvula\\nPillars"]
        M2["Class II\\nSoft palate\\nFauces\\nUvula partial"]
        M3["Class III\\nSoft palate\\nBase of uvula"]
        M4["Class IV\\nHard palate only"]
    end
    subgraph Risk["Difficulty Risk"]
        R1["Low"] --> R2["Moderate"]
        R2 --> R3["High"]
        R3 --> R4["Very High"]
    end
    M1 --> R1
    M2 --> R2
    M3 --> R3
    M4 --> R4
    style M1 fill:#228B22,color:#fff
    style M4 fill:#DC143C,color:#fff`,
};

/**
 * Anesthetic Drug Dosing template
 */
export const anestheticDrugDosing: DiagramTemplate = {
  id: 'anes-drug-dosing',
  name: 'Anesthetic Drug Dosing Reference',
  description: 'Quick reference for common anesthetic drug dosing and considerations',
  domain: 'medicine',
  promptTemplate: `Create an anesthetic drug dosing reference:
- Induction agents: {{inductionAgents}}
- Neuromuscular blockers: {{nmbDosing}}
- Opioids: {{opioidDosing}}
- Volatile agents (MAC): {{volatileMAC}}
- Local anesthetics: {{localAnesthetics}}
- Reversal agents: {{reversalAgents}}
- Vasopressors: {{vasopressors}}
- Weight-based calculations: {{weightBased}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'inductionAgents',
    'nmbDosing',
    'opioidDosing',
    'volatileMAC',
    'localAnesthetics',
    'reversalAgents',
    'vasopressors',
    'weightBased',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Induction["IV Induction"]
        I1["Propofol: 1.5-2.5 mg/kg"]
        I2["Etomidate: 0.2-0.3 mg/kg"]
        I3["Ketamine: 1-2 mg/kg"]
    end
    subgraph NMB["Muscle Relaxants"]
        N1["Succinylcholine: 1-1.5 mg/kg"]
        N2["Rocuronium: 0.6-1.2 mg/kg"]
        N3["Cisatracurium: 0.1-0.2 mg/kg"]
    end
    subgraph Opioids["Opioids"]
        O1["Fentanyl: 1-2 mcg/kg"]
        O2["Morphine: 0.1-0.2 mg/kg"]
        O3["Hydromorphone: 10-20 mcg/kg"]
    end
    subgraph Reversal["Reversal"]
        R1["Sugammadex: 2-16 mg/kg"]
        R2["Neostigmine: 0.04-0.07 mg/kg"]
    end`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All anesthesiology templates
 */
export const anesthesiologyTemplates: DiagramTemplate[] = [
  // Decision Trees
  preopAssessment,
  airwayManagementAlgorithm,
  difficultAirwayAlgorithm,
  intraopHypotension,
  ponvManagement,
  painManagementLadder,
  // Anatomical Diagrams
  airwayAnatomy,
  spinalEpiduralAnatomy,
  brachialPlexusAnatomy,
  autonomicNervousSystem,
  // Procedure Illustrations
  rsiSequence,
  spinalAnesthesiaProcedure,
  arterialLineInsertion,
  // Data Visualization
  asaClassification,
  mallampatiScoring,
  anestheticDrugDosing,
];

export default anesthesiologyTemplates;
