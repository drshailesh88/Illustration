/**
 * neurology.ts
 * Neurology diagram templates for FINNISH
 *
 * Contains comprehensive templates for neurological medicine including:
 * - Neural pathway diagrams
 * - Brain anatomy cross-sections
 * - Stroke assessment workflows
 * - Neurological examination flowcharts
 * - Diagnostic algorithms
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CLINICAL DECISION TREES
// =============================================================================

/**
 * Acute Stroke Assessment Algorithm template
 */
export const strokeAssessment: DiagramTemplate = {
  id: 'neuro-stroke-assessment',
  name: 'Acute Stroke Assessment Algorithm',
  description: 'NIH Stroke Scale assessment and treatment pathway for acute stroke',
  domain: 'medicine',
  promptTemplate: `Create an acute stroke assessment algorithm:
- Time of symptom onset: {{symptomOnset}}
- NIHSS score: {{nihssScore}}
- CT findings: {{ctFindings}}
- tPA eligibility: {{tpaEligibility}}
- Large vessel occlusion: {{lvo}}
- Contraindications: {{contraindications}}
- Treatment pathway: {{treatmentPathway}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'symptomOnset',
    'nihssScore',
    'ctFindings',
    'tpaEligibility',
    'lvo',
    'contraindications',
    'treatmentPathway',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Acute Stroke\\nSymptoms")] --> B["NIHSS Assessment"]
    B --> C{"Time Since\\nOnset?"}
    C -->|"<4.5h"| D["CT Head STAT"]
    C -->|">4.5h"| E["CT + CTA"]
    D -->|"No Hemorrhage"| F{"tPA\\nEligible?"}
    F -->|"Yes"| G["IV tPA"]
    F -->|"No"| H["Supportive Care"]
    E --> I{"LVO on\\nCTA?"}
    I -->|"Yes"| J["Thrombectomy Eval"]
    I -->|"No"| H
    G --> K{"LVO?"}
    K -->|"Yes"| J
    style A fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff
    style J fill:#4169E1,color:#fff`,
};

/**
 * Headache Evaluation Algorithm template
 */
export const headacheEvaluation: DiagramTemplate = {
  id: 'neuro-headache-evaluation',
  name: 'Headache Evaluation Algorithm',
  description: 'Diagnostic approach to acute and chronic headache',
  domain: 'medicine',
  promptTemplate: `Create a headache evaluation algorithm:
- Headache characteristics: {{characteristics}}
- Red flag symptoms: {{redFlags}}
- Duration and onset: {{duration}}
- Associated symptoms: {{associatedSymptoms}}
- Primary vs secondary: {{headacheType}}
- Imaging indications: {{imagingIndications}}
- Treatment approach: {{treatment}}
{{#additionalNotes}}Additional factors: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'characteristics',
    'redFlags',
    'duration',
    'associatedSymptoms',
    'headacheType',
    'imagingIndications',
    'treatment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Headache\\nPresentation")] --> B{"Red Flags?"}
    B -->|"Thunderclap\\nWorst ever"| C["CT/LP for SAH"]
    B -->|"Fever + Stiff Neck"| D["LP for Meningitis"]
    B -->|"None"| E{"Primary\\nHeadache?"}
    E -->|"Migraine Features"| F["Migraine Tx"]
    E -->|"Cluster Features"| G["Cluster Tx"]
    E -->|"Tension Type"| H["TTH Tx"]
    C -->|"Negative"| I["CTA/MRA"]
    style C fill:#DC143C,color:#fff
    style D fill:#FFA500,color:#000
    style F fill:#228B22,color:#fff`,
};

/**
 * Seizure Management Algorithm template
 */
export const seizureManagement: DiagramTemplate = {
  id: 'neuro-seizure-management',
  name: 'Seizure Management Algorithm',
  description: 'Status epilepticus and new-onset seizure management pathway',
  domain: 'medicine',
  promptTemplate: `Create a seizure management algorithm:
- Seizure type: {{seizureType}}
- Duration: {{duration}}
- First-line treatment: {{firstLine}}
- Second-line treatment: {{secondLine}}
- Status epilepticus criteria: {{statusCriteria}}
- Workup required: {{workup}}
- Maintenance therapy: {{maintenance}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'seizureType',
    'duration',
    'firstLine',
    'secondLine',
    'statusCriteria',
    'workup',
    'maintenance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Active\\nSeizure")] --> B["ABCs + O2"]
    B --> C{"Duration\\n>5 min?"}
    C -->|"Yes"| D["Benzodiazepine"]
    C -->|"No"| E["Monitor"]
    D --> F{"Seizure\\nContinues?"}
    F -->|"Yes"| G["2nd Line AED"]
    F -->|"No"| H["Load AED"]
    G --> I{"Still Seizing\\n>30 min?"}
    I -->|"Yes"| J["RSI + cEEG"]
    I -->|"No"| H
    H --> K["EEG + MRI"]
    style A fill:#DC143C,color:#fff
    style J fill:#8B0000,color:#fff`,
};

/**
 * Altered Mental Status Workup template
 */
export const neuroAlteredMentalStatus: DiagramTemplate = {
  id: 'neuro-ams-workup',
  name: 'Altered Mental Status Workup',
  description: 'Systematic approach to altered mental status evaluation',
  domain: 'medicine',
  promptTemplate: `Create an altered mental status workup:
- Baseline mental status: {{baseline}}
- GCS score: {{gcsScore}}
- Vital signs: {{vitals}}
- Toxic/metabolic causes: {{toxicMetabolic}}
- Infectious workup: {{infectiousWorkup}}
- Structural causes: {{structural}}
- Treatment approach: {{treatment}}
{{#additionalNotes}}Additional context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'baseline',
    'gcsScore',
    'vitals',
    'toxicMetabolic',
    'infectiousWorkup',
    'structural',
    'treatment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Altered Mental\\nStatus")] --> B["ABCs + Glucose"]
    B --> C{"Hypoglycemia?"}
    C -->|"Yes"| D["D50 IV"]
    C -->|"No"| E["Labs + CT"]
    E --> F{"Fever?"}
    F -->|"Yes"| G["LP if Safe"]
    F -->|"No"| H{"Focal\\nDeficit?"}
    H -->|"Yes"| I["Stroke Protocol"]
    H -->|"No"| J["Tox Screen"]
    J --> K{"Overdose?"}
    K -->|"Opioid"| L["Naloxone"]
    K -->|"Benzo"| M["Flumazenil?"]
    style A fill:#FFA500,color:#000
    style D fill:#228B22,color:#fff`,
};

/**
 * Multiple Sclerosis Diagnostic Criteria template
 */
export const msDiagnostic: DiagramTemplate = {
  id: 'neuro-ms-diagnostic',
  name: 'MS Diagnostic Criteria',
  description: 'McDonald criteria for multiple sclerosis diagnosis',
  domain: 'medicine',
  promptTemplate: `Create an MS diagnostic algorithm:
- Clinical attacks: {{clinicalAttacks}}
- Objective lesions: {{objectiveLesions}}
- MRI criteria: {{mriCriteria}}
- CSF findings: {{csfFindings}}
- DIS criteria: {{disCriteria}}
- DIT criteria: {{ditCriteria}}
- Differential diagnosis: {{differential}}
{{#additionalNotes}}Additional workup: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalAttacks',
    'objectiveLesions',
    'mriCriteria',
    'csfFindings',
    'disCriteria',
    'ditCriteria',
    'differential',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Suspected\\nMS")] --> B{"Clinical\\nAttacks?"}
    B -->|">=2"| C{"Objective\\nLesions >=2?"}
    B -->|"1"| D["MRI + CSF"]
    C -->|"Yes"| E["MS Confirmed"]
    C -->|"1 Lesion"| F["DIS Criteria"]
    D --> G{"DIS + DIT\\nMet?"}
    G -->|"Yes"| E
    G -->|"No"| H["Follow-up MRI"]
    F --> I{"Additional\\nMRI Lesions?"}
    I -->|"Yes"| E
    style E fill:#DC143C,color:#fff
    style H fill:#FFA500,color:#000`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS
// =============================================================================

/**
 * Neural Pathway Diagram template
 */
export const neuralPathway: DiagramTemplate = {
  id: 'neuro-neural-pathway',
  name: 'Neural Pathway Diagram',
  description: 'Motor or sensory neural pathway illustration',
  domain: 'medicine',
  promptTemplate: `Create a neural pathway diagram:
- Pathway type: {{pathwayType}}
- Origin: {{origin}}
- Decussation level: {{decussation}}
- Relay nuclei: {{relayNuclei}}
- Termination: {{termination}}
- Key structures: {{keyStructures}}
- Clinical correlates: {{clinicalCorrelates}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pathwayType',
    'origin',
    'decussation',
    'relayNuclei',
    'termination',
    'keyStructures',
    'clinicalCorrelates',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Cortex["Motor Cortex"]
        A["Primary Motor\\nCortex (M1)"]
    end
    subgraph Internal["Internal Capsule"]
        B["Posterior Limb"]
    end
    subgraph Brainstem["Brainstem"]
        C["Cerebral Peduncle"]
        D["Pyramidal\\nDecussation"]
    end
    subgraph Spinal["Spinal Cord"]
        E["Lateral\\nCorticospinal"]
        F["Alpha Motor\\nNeuron"]
    end
    A --> B --> C --> D
    D -->|"85%"| E --> F
    style D fill:#FFA500,color:#000`,
};

/**
 * Brain Anatomy Cross Section template
 */
export const brainCrossSection: DiagramTemplate = {
  id: 'neuro-brain-cross-section',
  name: 'Brain Anatomy Cross Section',
  description: 'Labeled cross-sectional brain anatomy',
  domain: 'medicine',
  promptTemplate: `Create a brain cross-section diagram:
- Section level: {{sectionLevel}}
- Structures to label: {{structures}}
- Gray matter regions: {{grayMatter}}
- White matter tracts: {{whiteMatter}}
- Ventricles: {{ventricles}}
- Blood supply: {{bloodSupply}}
{{#additionalNotes}}Clinical annotations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sectionLevel',
    'structures',
    'grayMatter',
    'whiteMatter',
    'ventricles',
    'bloodSupply',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Cortex["Cerebral Cortex"]
        A["Frontal Lobe"]
        B["Parietal Lobe"]
    end
    subgraph Deep["Deep Structures"]
        C["Basal Ganglia"]
        D["Thalamus"]
        E["Internal Capsule"]
    end
    subgraph Ventricle["Ventricular System"]
        F["Lateral Ventricle"]
        G["Third Ventricle"]
    end
    A --- E
    B --- E
    C --- D
    D --- G
    F --- G
    style C fill:#FFD700,color:#000
    style D fill:#87CEEB,color:#000`,
};

/**
 * Cranial Nerves Overview template
 */
export const cranialNerves: DiagramTemplate = {
  id: 'neuro-cranial-nerves',
  name: 'Cranial Nerves Overview',
  description: 'All 12 cranial nerves with functions and pathways',
  domain: 'medicine',
  promptTemplate: `Create a cranial nerves diagram:
- Nerves to include: {{nervesToInclude}}
- Origin/exit points: {{originPoints}}
- Functions: {{functions}}
- Motor vs sensory: {{motorSensory}}
- Clinical testing: {{clinicalTesting}}
- Common pathologies: {{pathologies}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'nervesToInclude',
    'originPoints',
    'functions',
    'motorSensory',
    'clinicalTesting',
    'pathologies',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Brainstem["Brainstem Origin"]
        M["Midbrain"]
        P["Pons"]
        Med["Medulla"]
    end
    subgraph CNs["Cranial Nerves"]
        CN3["III: Oculomotor"]
        CN5["V: Trigeminal"]
        CN7["VII: Facial"]
        CN10["X: Vagus"]
        CN12["XII: Hypoglossal"]
    end
    M --> CN3
    P --> CN5
    P --> CN7
    Med --> CN10
    Med --> CN12
    style CN3 fill:#4169E1,color:#fff
    style CN7 fill:#228B22,color:#fff`,
};

/**
 * Spinal Cord Tract Diagram template
 */
export const spinalCordTracts: DiagramTemplate = {
  id: 'neuro-spinal-cord-tracts',
  name: 'Spinal Cord Tracts',
  description: 'Ascending and descending spinal cord tract organization',
  domain: 'medicine',
  promptTemplate: `Create a spinal cord tract diagram:
- Ascending tracts: {{ascendingTracts}}
- Descending tracts: {{descendingTracts}}
- Cross-section level: {{sectionLevel}}
- Tract locations: {{tractLocations}}
- Functions: {{functions}}
- Clinical syndromes: {{clinicalSyndromes}}
{{#additionalNotes}}Additional annotations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ascendingTracts',
    'descendingTracts',
    'sectionLevel',
    'tractLocations',
    'functions',
    'clinicalSyndromes',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Posterior["Posterior Columns"]
        DC["Dorsal Column\\n(Proprioception)"]
    end
    subgraph Lateral["Lateral"]
        LST["Lateral\\nSpinothalamic\\n(Pain/Temp)"]
        LCS["Lateral\\nCorticospinal\\n(Motor)"]
    end
    subgraph Anterior["Anterior"]
        AST["Anterior\\nSpinothalamic\\n(Light Touch)"]
        ACS["Anterior\\nCorticospinal"]
    end
    DC --- LCS
    LST --- AST
    style DC fill:#4169E1,color:#fff
    style LCS fill:#DC143C,color:#fff`,
};

// =============================================================================
// PROCEDURE & EXAMINATION TEMPLATES
// =============================================================================

/**
 * Neurological Examination Flowchart template
 */
export const neuroExam: DiagramTemplate = {
  id: 'neuro-examination-flowchart',
  name: 'Neurological Examination Flowchart',
  description: 'Systematic neurological examination checklist',
  domain: 'medicine',
  promptTemplate: `Create a neurological examination flowchart:
- Mental status assessment: {{mentalStatus}}
- Cranial nerve exam: {{cranialNerves}}
- Motor exam: {{motorExam}}
- Sensory exam: {{sensoryExam}}
- Reflexes: {{reflexes}}
- Coordination: {{coordination}}
- Gait assessment: {{gait}}
{{#additionalNotes}}Special tests: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mentalStatus',
    'cranialNerves',
    'motorExam',
    'sensoryExam',
    'reflexes',
    'coordination',
    'gait',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Neuro Exam"] --> B["Mental Status"]
    B --> B1["Orientation"]
    B --> B2["Attention"]
    B --> B3["Memory"]
    A --> C["Cranial Nerves"]
    C --> C1["II-XII Testing"]
    A --> D["Motor"]
    D --> D1["Strength 0-5"]
    D --> D2["Tone"]
    A --> E["Sensory"]
    E --> E1["Light Touch"]
    E --> E2["Pin/Temp"]
    E --> E3["Proprioception"]
    A --> F["Reflexes"]
    F --> F1["DTRs 0-4+"]
    A --> G["Coordination"]
    G --> G1["FNF"]
    G --> G2["HTS"]
    A --> H["Gait"]`,
};

/**
 * Lumbar Puncture Procedure template
 */
export const lumbarPunctureProcedure: DiagramTemplate = {
  id: 'neuro-lumbar-puncture',
  name: 'Lumbar Puncture Procedure',
  description: 'Step-by-step lumbar puncture technique and interpretation',
  domain: 'medicine',
  promptTemplate: `Create a lumbar puncture procedure diagram:
- Patient positioning: {{positioning}}
- Landmark identification: {{landmarks}}
- Needle insertion: {{needleInsertion}}
- Opening pressure: {{openingPressure}}
- CSF collection: {{csfCollection}}
- Studies to send: {{studies}}
- Interpretation: {{interpretation}}
{{#additionalNotes}}Complications to monitor: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'positioning',
    'landmarks',
    'needleInsertion',
    'openingPressure',
    'csfCollection',
    'studies',
    'interpretation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Position Patient"] --> B["Identify L3-L4"]
    B --> C["Prep + Drape"]
    C --> D["Local Anesthesia"]
    D --> E["Insert Needle"]
    E --> F["Check Opening\\nPressure"]
    F --> G["Collect CSF\\n4 Tubes"]
    G --> H["Send Studies"]
    H --> H1["Cell Count"]
    H --> H2["Glucose/Protein"]
    H --> H3["Gram Stain/Cx"]
    H --> H4["Special Tests"]
    style F fill:#FFA500,color:#000`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All neurology templates
 */
export const neurologyTemplates: DiagramTemplate[] = [
  // Clinical Decision Trees
  strokeAssessment,
  headacheEvaluation,
  seizureManagement,
  neuroAlteredMentalStatus,
  msDiagnostic,
  // Anatomical Diagrams
  neuralPathway,
  brainCrossSection,
  cranialNerves,
  spinalCordTracts,
  // Procedure & Examination
  neuroExam,
  lumbarPunctureProcedure,
];

export default neurologyTemplates;
