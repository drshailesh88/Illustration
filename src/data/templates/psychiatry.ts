/**
 * psychiatry.ts
 * Psychiatry diagram templates for FINNISH
 *
 * Contains comprehensive templates for psychiatry and mental health including:
 * - Clinical decision trees (5)
 * - Anatomical diagrams (3)
 * - Assessment templates (3)
 * - Data visualization templates (3)
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// CLINICAL DECISION TREES
// =============================================================================

/**
 * Depression Treatment Algorithm template
 */
export const depressionTreatmentAlgorithm: DiagramTemplate = {
  id: 'psych-depression-treatment',
  name: 'Depression Treatment Algorithm',
  description: 'Evidence-based treatment algorithm for major depressive disorder following APA guidelines',
  domain: 'medicine',
  promptTemplate: `Create a depression treatment algorithm flowchart:
- Initial presentation: {{initialPresentation}}
- Severity assessment: {{severityAssessment}}
- First-line treatment: {{firstLineTreatment}}
- Response monitoring: {{responseMonitoring}}
- Augmentation strategies: {{augmentationStrategies}}
- Treatment-resistant criteria: {{treatmentResistant}}
- Advanced interventions: {{advancedInterventions}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'initialPresentation',
    'severityAssessment',
    'firstLineTreatment',
    'responseMonitoring',
    'augmentationStrategies',
    'treatmentResistant',
    'advancedInterventions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Assessment["Initial Assessment"]
        A[("Depression\\nDiagnosed")] --> B{"PHQ-9\\nSeverity?"}
    end
    subgraph Mild["Mild Depression"]
        B -->|"5-9"| C["Psychotherapy\\nWatchful Waiting"]
    end
    subgraph Moderate["Moderate-Severe"]
        B -->|"10-19"| D["SSRI + Psychotherapy"]
        B -->|"20+"| E["Urgent: SSRI + Therapy\\nConsider Hospitalization"]
    end
    subgraph Response["Response Monitoring"]
        C & D --> F{"Response at\\n4-6 weeks?"}
        F -->|"Yes"| G["Continue 6-12 months"]
        F -->|"Partial"| H["Optimize Dose"]
        F -->|"No"| I["Switch/Augment"]
    end
    subgraph TRD["Treatment-Resistant"]
        I --> J{"2+ Failed\\nTrials?"}
        J -->|"Yes"| K["Consider ECT/TMS/\\nKetamine/Esketamine"]
    end
    style A fill:#4169E1,color:#fff
    style E fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff`,
};

/**
 * Anxiety Management Algorithm template
 */
export const anxietyManagementAlgorithm: DiagramTemplate = {
  id: 'psych-anxiety-management',
  name: 'Anxiety Management Algorithm',
  description: 'Treatment pathway for generalized anxiety disorder and related conditions',
  domain: 'medicine',
  promptTemplate: `Create an anxiety management algorithm flowchart:
- Anxiety type: {{anxietyType}}
- GAD-7 score: {{gad7Score}}
- First-line interventions: {{firstLineInterventions}}
- Pharmacotherapy options: {{pharmacotherapy}}
- Psychotherapy approach: {{psychotherapy}}
- Benzodiazepine considerations: {{benzoConsiderations}}
- Treatment response: {{treatmentResponse}}
{{#additionalNotes}}Special populations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'anxietyType',
    'gad7Score',
    'firstLineInterventions',
    'pharmacotherapy',
    'psychotherapy',
    'benzoConsiderations',
    'treatmentResponse',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Anxiety\\nDisorder")] --> B{"GAD-7\\nSeverity?"}
    B -->|"5-9 Mild"| C["Psychoeducation\\nRelaxation Techniques"]
    B -->|"10-14 Moderate"| D["CBT First-Line"]
    B -->|"15+ Severe"| E["CBT + SSRI/SNRI"]
    C --> F{"Improved?"}
    D --> F
    E --> F
    F -->|"Yes"| G["Maintenance\\nRelapse Prevention"]
    F -->|"No"| H{"CBT\\nCompleted?"}
    H -->|"No"| I["Complete CBT Course"]
    H -->|"Yes"| J["Add/Switch Medication"]
    J --> K["Consider:\\nBuspirone, Pregabalin\\nShort-term Benzo PRN"]
    style A fill:#FFA500,color:#000
    style G fill:#228B22,color:#fff
    style K fill:#9B59B6,color:#fff`,
};

/**
 * Psychosis Evaluation Algorithm template
 */
export const psychosisEvaluationAlgorithm: DiagramTemplate = {
  id: 'psych-psychosis-evaluation',
  name: 'Psychosis Evaluation Algorithm',
  description: 'Comprehensive evaluation and management pathway for first-episode and acute psychosis',
  domain: 'medicine',
  promptTemplate: `Create a psychosis evaluation algorithm:
- Presentation type: {{presentationType}}
- Safety assessment: {{safetyAssessment}}
- Medical workup: {{medicalWorkup}}
- Substance screening: {{substanceScreening}}
- First-episode considerations: {{firstEpisode}}
- Antipsychotic selection: {{antipsychoticSelection}}
- Monitoring requirements: {{monitoringRequirements}}
{{#additionalNotes}}Risk factors and prognosis: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentationType',
    'safetyAssessment',
    'medicalWorkup',
    'substanceScreening',
    'firstEpisode',
    'antipsychoticSelection',
    'monitoringRequirements',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Initial["Initial Presentation"]
        A[("Psychotic\\nSymptoms")] --> B{"Safety\\nAssessment"}
        B -->|"Unsafe"| C["Psychiatric\\nEmergency"]
        B -->|"Safe"| D["Outpatient\\nEvaluation"]
    end
    subgraph Workup["Medical Workup"]
        C & D --> E["Labs: CBC, CMP, TSH\\nUrine Tox, HIV"]
        E --> F["Brain Imaging if:\\nFirst Episode, Atypical"]
    end
    subgraph Diagnosis["Differential"]
        F --> G{"Primary\\nPsychosis?"}
        G -->|"Yes"| H["Schizophrenia Spectrum"]
        G -->|"No"| I["Substance-Induced\\nMedical Condition"]
    end
    subgraph Treatment["Treatment"]
        H --> J["Start Antipsychotic:\\nRisperidone, Aripiprazole"]
        J --> K["Monitor: Metabolic,\\nEPS, Prolactin"]
    end
    style C fill:#DC143C,color:#fff
    style J fill:#9B59B6,color:#fff`,
};

/**
 * Substance Use Treatment Algorithm template
 */
export const substanceUseTreatmentAlgorithm: DiagramTemplate = {
  id: 'psych-substance-treatment',
  name: 'Substance Use Treatment Algorithm',
  description: 'Evidence-based treatment pathway for substance use disorders',
  domain: 'medicine',
  promptTemplate: `Create a substance use treatment algorithm:
- Substance type: {{substanceType}}
- Use severity: {{useSeverity}}
- Withdrawal risk: {{withdrawalRisk}}
- Detoxification needs: {{detoxNeeds}}
- Medication-assisted treatment: {{mat}}
- Psychosocial interventions: {{psychosocialInterventions}}
- Relapse prevention: {{relapsePrevention}}
{{#additionalNotes}}Co-occurring disorders: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'substanceType',
    'useSeverity',
    'withdrawalRisk',
    'detoxNeeds',
    'mat',
    'psychosocialInterventions',
    'relapsePrevention',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Substance Use\\nDisorder")] --> B{"Withdrawal\\nRisk?"}
    B -->|"High (Alcohol/Benzo)"| C["Medically Supervised\\nDetox"]
    B -->|"Moderate (Opioids)"| D["Outpatient Detox\\nor MAT Induction"]
    B -->|"Low"| E["Outpatient\\nTreatment"]
    C --> F["Stabilization"]
    D --> F
    subgraph MAT["Medication-Assisted Treatment"]
        F --> G{"Opioid\\nUse?"}
        G -->|"Yes"| H["Buprenorphine\\nMethadone\\nNaltrexone"]
        G -->|"No - Alcohol"| I["Naltrexone\\nAcamprosate\\nDisulfiram"]
    end
    subgraph Psychosocial["Psychosocial"]
        H & I & E --> J["CBT, MI, 12-Step\\nContingency Management"]
    end
    J --> K["Ongoing Recovery\\nSupport"]
    style C fill:#DC143C,color:#fff
    style H fill:#4ECDC4,color:#000
    style K fill:#228B22,color:#fff`,
};

/**
 * Suicide Risk Assessment Algorithm template
 */
export const suicideRiskAssessmentAlgorithm: DiagramTemplate = {
  id: 'psych-suicide-risk-assessment',
  name: 'Suicide Risk Assessment Algorithm',
  description: 'Structured suicide risk assessment and intervention pathway',
  domain: 'medicine',
  promptTemplate: `Create a suicide risk assessment algorithm:
- Presenting concerns: {{presentingConcerns}}
- Risk factors: {{riskFactors}}
- Protective factors: {{protectiveFactors}}
- Suicidal ideation characteristics: {{ideationCharacteristics}}
- Plan and intent: {{planIntent}}
- Risk level determination: {{riskLevel}}
- Intervention and disposition: {{intervention}}
{{#additionalNotes}}Safety planning elements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentingConcerns',
    'riskFactors',
    'protectiveFactors',
    'ideationCharacteristics',
    'planIntent',
    'riskLevel',
    'intervention',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Screen["Screening"]
        A[("Suicidal\\nIdeation?")] --> B{"Active\\nSI?"}
    end
    subgraph Assess["Assessment"]
        B -->|"Yes"| C{"Plan?"}
        B -->|"Passive Only"| D["Assess Risk\\nFactors"]
        C -->|"Yes"| E{"Intent?\\nMeans?"}
        C -->|"No"| D
    end
    subgraph Risk["Risk Stratification"]
        E -->|"High Intent\\nAvailable Means"| F["HIGH RISK"]
        E -->|"Low Intent"| G["MODERATE RISK"]
        D --> H{"Multiple\\nRisk Factors?"}
        H -->|"Yes"| G
        H -->|"No"| I["LOW RISK"]
    end
    subgraph Intervention["Intervention"]
        F --> J["Psychiatric Hold\\nHospitalization"]
        G --> K["Crisis Intervention\\nIntensive Outpatient"]
        I --> L["Safety Plan\\nOutpatient Follow-up"]
    end
    style F fill:#DC143C,color:#fff
    style G fill:#FFA500,color:#000
    style I fill:#228B22,color:#fff
    style J fill:#8B0000,color:#fff`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS
// =============================================================================

/**
 * Neurotransmitter Pathways template
 */
export const neurotransmitterPathways: DiagramTemplate = {
  id: 'psych-neurotransmitter-pathways',
  name: 'Neurotransmitter Pathways',
  description: 'Major neurotransmitter systems and their brain pathways',
  domain: 'medicine',
  promptTemplate: `Create a neurotransmitter pathways diagram:
- Dopaminergic pathways: {{dopaminergic}}
- Serotonergic pathways: {{serotonergic}}
- Noradrenergic pathways: {{noradrenergic}}
- GABAergic system: {{gabaergic}}
- Glutamatergic system: {{glutamatergic}}
- Clinical correlations: {{clinicalCorrelations}}
{{#additionalNotes}}Medication targets: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'dopaminergic',
    'serotonergic',
    'noradrenergic',
    'gabaergic',
    'glutamatergic',
    'clinicalCorrelations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Dopamine["Dopamine Pathways"]
        VTA["VTA"] -->|"Mesolimbic"| NAcc["Nucleus Accumbens"]
        VTA -->|"Mesocortical"| PFC["Prefrontal Cortex"]
        SN["Substantia Nigra"] -->|"Nigrostriatal"| STR["Striatum"]
    end
    subgraph Serotonin["Serotonin Pathways"]
        RN["Raphe Nuclei"] --> CORTEX["Cortex"]
        RN --> LIMBIC["Limbic System"]
        RN --> SPINAL["Spinal Cord"]
    end
    subgraph Norepinephrine["NE Pathways"]
        LC["Locus Coeruleus"] --> HYPO["Hypothalamus"]
        LC --> AMYG["Amygdala"]
        LC --> CORTEXNE["Cortex"]
    end
    style VTA fill:#4ECDC4,color:#000
    style RN fill:#FFD93D,color:#000
    style LC fill:#FF6B6B,color:#fff`,
};

/**
 * Limbic System Anatomy template
 */
export const limbicSystemAnatomy: DiagramTemplate = {
  id: 'psych-limbic-system',
  name: 'Limbic System Anatomy',
  description: 'Anatomical diagram of the limbic system and emotional processing centers',
  domain: 'medicine',
  promptTemplate: `Create a limbic system anatomy diagram:
- Amygdala: {{amygdala}}
- Hippocampus: {{hippocampus}}
- Hypothalamus: {{hypothalamus}}
- Cingulate cortex: {{cingulateCortex}}
- Prefrontal connections: {{prefrontalConnections}}
- Function annotations: {{functionAnnotations}}
{{#additionalNotes}}Clinical relevance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'amygdala',
    'hippocampus',
    'hypothalamus',
    'cingulateCortex',
    'prefrontalConnections',
    'functionAnnotations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Cortical["Cortical Structures"]
        PFC["Prefrontal Cortex\\n(Executive Function)"]
        ACC["Anterior Cingulate\\n(Conflict Monitoring)"]
    end
    subgraph Limbic["Limbic Core"]
        AMYG["Amygdala\\n(Fear, Emotion)"]
        HIPP["Hippocampus\\n(Memory)"]
        HYPO["Hypothalamus\\n(HPA Axis)"]
    end
    subgraph Brainstem["Brainstem"]
        PAG["PAG\\n(Fear Response)"]
        VTA["VTA\\n(Reward)"]
    end
    PFC <-->|"Top-down\\nRegulation"| AMYG
    ACC --> AMYG
    AMYG <--> HIPP
    AMYG --> HYPO
    HYPO --> PAG
    VTA --> PFC
    style AMYG fill:#FF6B6B,color:#fff
    style HIPP fill:#4ECDC4,color:#000
    style PFC fill:#9B59B6,color:#fff`,
};

/**
 * Sleep Architecture template
 */
export const sleepArchitecture: DiagramTemplate = {
  id: 'psych-sleep-architecture',
  name: 'Sleep Architecture',
  description: 'Normal sleep stages and architecture with clinical correlations',
  domain: 'medicine',
  promptTemplate: `Create a sleep architecture diagram:
- Sleep stages: {{sleepStages}}
- REM characteristics: {{remCharacteristics}}
- NREM characteristics: {{nremCharacteristics}}
- Sleep cycle duration: {{cycleDuration}}
- Normal percentages: {{normalPercentages}}
- Disorder correlations: {{disorderCorrelations}}
{{#additionalNotes}}Age-related changes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sleepStages',
    'remCharacteristics',
    'nremCharacteristics',
    'cycleDuration',
    'normalPercentages',
    'disorderCorrelations',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Night["Sleep Cycles (90 min each)"]
        direction TB
        W["Wake"] --> N1["N1\\n(Light)"]
        N1 --> N2["N2\\n(Spindles)"]
        N2 --> N3["N3\\n(Deep/SWS)"]
        N3 --> N2B["N2"]
        N2B --> REM["REM\\n(Dreams)"]
        REM --> N1
    end
    subgraph Percentages["Normal Distribution"]
        P1["N1: 5%"]
        P2["N2: 45-55%"]
        P3["N3: 15-20%"]
        P4["REM: 20-25%"]
    end
    subgraph Disorders["Sleep Disorders"]
        D1["Insomnia: Less N3"]
        D2["Narcolepsy: REM intrusion"]
        D3["OSA: Fragmented"]
    end
    style N3 fill:#4169E1,color:#fff
    style REM fill:#DC143C,color:#fff`,
};

// =============================================================================
// ASSESSMENT TEMPLATES
// =============================================================================

/**
 * Mental Status Exam template
 */
export const mentalStatusExam: DiagramTemplate = {
  id: 'psych-mental-status-exam',
  name: 'Mental Status Exam',
  description: 'Comprehensive mental status examination template',
  domain: 'medicine',
  promptTemplate: `Create a mental status exam template:
- Appearance: {{appearance}}
- Behavior: {{behavior}}
- Speech: {{speech}}
- Mood and affect: {{moodAffect}}
- Thought process: {{thoughtProcess}}
- Thought content: {{thoughtContent}}
- Perception: {{perception}}
- Cognition: {{cognition}}
- Insight and judgment: {{insightJudgment}}
{{#additionalNotes}}Risk assessment: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'appearance',
    'behavior',
    'speech',
    'moodAffect',
    'thoughtProcess',
    'thoughtContent',
    'perception',
    'cognition',
    'insightJudgment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Observable["Observable"]
        A["Appearance\\n(Grooming, Dress)"]
        B["Behavior\\n(Psychomotor, Eye Contact)"]
        S["Speech\\n(Rate, Tone, Volume)"]
    end
    subgraph Mood["Mood/Affect"]
        M["Mood\\n(Patient's Words)"]
        AF["Affect\\n(Observed, Range, Congruence)"]
    end
    subgraph Thought["Thought"]
        TP["Process\\n(Linear, Tangential, Loose)"]
        TC["Content\\n(SI/HI, Delusions, Obsessions)"]
        P["Perception\\n(Hallucinations)"]
    end
    subgraph Cognitive["Cognitive"]
        C["Cognition\\n(A&O, Memory, Attention)"]
        IJ["Insight & Judgment"]
    end
    A --> M
    B --> M
    S --> TP
    M --> AF
    TP --> TC
    TC --> P
    P --> C
    C --> IJ
    style TC fill:#FFA500,color:#000
    style P fill:#FFA500,color:#000`,
};

/**
 * PHQ-9/GAD-7 Interpretation template
 */
export const screeningInterpretation: DiagramTemplate = {
  id: 'psych-screening-interpretation',
  name: 'PHQ-9/GAD-7 Interpretation',
  description: 'Interpretation guide for depression and anxiety screening tools',
  domain: 'medicine',
  promptTemplate: `Create a screening interpretation guide:
- PHQ-9 scoring: {{phq9Scoring}}
- PHQ-9 severity levels: {{phq9Severity}}
- GAD-7 scoring: {{gad7Scoring}}
- GAD-7 severity levels: {{gad7Severity}}
- Treatment recommendations by score: {{treatmentByScore}}
- Follow-up intervals: {{followUpIntervals}}
{{#additionalNotes}}Limitations and considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'phq9Scoring',
    'phq9Severity',
    'gad7Scoring',
    'gad7Severity',
    'treatmentByScore',
    'followUpIntervals',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph PHQ9["PHQ-9 Depression"]
        P0["0-4: Minimal"]
        P1["5-9: Mild"]
        P2["10-14: Moderate"]
        P3["15-19: Mod-Severe"]
        P4["20-27: Severe"]
    end
    subgraph GAD7["GAD-7 Anxiety"]
        G0["0-4: Minimal"]
        G1["5-9: Mild"]
        G2["10-14: Moderate"]
        G3["15-21: Severe"]
    end
    subgraph Actions["Treatment Actions"]
        P0 --> A1["Watchful Waiting"]
        P1 --> A2["Consider Treatment"]
        P2 & G2 --> A3["Active Treatment:\\nTherapy +/- Meds"]
        P3 & P4 & G3 --> A4["Urgent Treatment:\\nMeds + Therapy"]
    end
    subgraph Question9["PHQ-9 Question 9"]
        Q9["SI Question > 0"] --> ASSESS["Full Suicide\\nRisk Assessment"]
    end
    style P4 fill:#DC143C,color:#fff
    style G3 fill:#DC143C,color:#fff
    style ASSESS fill:#FFA500,color:#000`,
};

/**
 * Safety Planning template
 */
export const safetyPlanning: DiagramTemplate = {
  id: 'psych-safety-planning',
  name: 'Safety Planning',
  description: 'Structured safety planning template for suicide prevention',
  domain: 'medicine',
  promptTemplate: `Create a safety planning template:
- Warning signs: {{warningSigns}}
- Internal coping strategies: {{internalCoping}}
- Social contacts: {{socialContacts}}
- Professional contacts: {{professionalContacts}}
- Means restriction: {{meansRestriction}}
- Reasons for living: {{reasonsForLiving}}
{{#additionalNotes}}Follow-up plan: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'warningSigns',
    'internalCoping',
    'socialContacts',
    'professionalContacts',
    'meansRestriction',
    'reasonsForLiving',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Step1["Step 1: Warning Signs"]
        W1["Thoughts, Images, Mood,\\nSituation, Behavior"]
    end
    subgraph Step2["Step 2: Internal Coping"]
        IC["Things I Can Do Without\\nContacting Anyone"]
    end
    subgraph Step3["Step 3: People & Places"]
        PP["Social Settings for Distraction"]
    end
    subgraph Step4["Step 4: People for Help"]
        PH["Family, Friends\\n(Name & Phone)"]
    end
    subgraph Step5["Step 5: Professionals"]
        PRO["Therapist, Crisis Line\\n988, ER"]
    end
    subgraph Step6["Step 6: Safety"]
        MEANS["Means Restriction:\\nSecure/Remove Lethal Means"]
    end
    W1 --> IC --> PP --> PH --> PRO --> MEANS
    REASONS["Reasons for Living:\\n________________________"]
    MEANS --> REASONS
    style W1 fill:#FFA500,color:#000
    style MEANS fill:#DC143C,color:#fff
    style REASONS fill:#228B22,color:#fff`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES
// =============================================================================

/**
 * Medication Side Effects template
 */
export const medicationSideEffects: DiagramTemplate = {
  id: 'psych-medication-side-effects',
  name: 'Medication Side Effects',
  description: 'Comparison of psychiatric medication side effect profiles',
  domain: 'medicine',
  promptTemplate: `Create a medication side effects comparison:
- Medication classes: {{medicationClasses}}
- Common side effects: {{commonSideEffects}}
- Metabolic effects: {{metabolicEffects}}
- Cardiac effects: {{cardiacEffects}}
- Neurological effects: {{neurologicalEffects}}
- Monitoring requirements: {{monitoringRequirements}}
{{#additionalNotes}}Risk mitigation strategies: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'medicationClasses',
    'commonSideEffects',
    'metabolicEffects',
    'cardiacEffects',
    'neurologicalEffects',
    'monitoringRequirements',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph SSRI["SSRIs"]
        S1["GI: Nausea"]
        S2["Sexual Dysfunction"]
        S3["Activation/Insomnia"]
        S4["Low Weight Risk"]
    end
    subgraph Atypical["Atypical Antipsychotics"]
        A1["Metabolic Syndrome"]
        A2["Weight Gain"]
        A3["QTc Prolongation"]
        A4["EPS (varies)"]
    end
    subgraph Mood["Mood Stabilizers"]
        M1["Lithium: Thyroid, Renal"]
        M2["Valproate: Hepatic, Teratogenic"]
        M3["Carbamazepine: Blood, Drug-Drug"]
    end
    subgraph Monitoring["Required Monitoring"]
        MON1["Metabolic Panel"]
        MON2["Lipids, A1c"]
        MON3["ECG as indicated"]
        MON4["Drug levels (Li, VPA)"]
    end
    style A1 fill:#DC143C,color:#fff
    style A2 fill:#FFA500,color:#000
    style M1 fill:#FFA500,color:#000`,
};

/**
 * DSM-5 Criteria Overview template
 */
export const dsm5CriteriaOverview: DiagramTemplate = {
  id: 'psych-dsm5-criteria',
  name: 'DSM-5 Criteria Overview',
  description: 'Visual overview of DSM-5 diagnostic criteria for major disorders',
  domain: 'medicine',
  promptTemplate: `Create a DSM-5 criteria overview diagram:
- Disorder category: {{disorderCategory}}
- Core criteria: {{coreCriteria}}
- Duration requirements: {{durationRequirements}}
- Functional impairment: {{functionalImpairment}}
- Specifiers: {{specifiers}}
- Differential diagnosis: {{differentialDiagnosis}}
{{#additionalNotes}}Diagnostic pearls: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'disorderCategory',
    'coreCriteria',
    'durationRequirements',
    'functionalImpairment',
    'specifiers',
    'differentialDiagnosis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph MDD["Major Depressive Disorder"]
        C1["5+ symptoms x 2 weeks"]
        C2["Must include:\\nDepressed mood OR Anhedonia"]
        C3["+ Sleep, Energy, Concentration,\\nAppetite, Psychomotor,\\nGuilt, SI"]
    end
    subgraph GAD["Generalized Anxiety"]
        G1["Excessive worry x 6 months"]
        G2["Hard to control"]
        G3["3+ symptoms:\\nRestless, Fatigue, Concentration,\\nIrritability, Tension, Sleep"]
    end
    subgraph Schizophrenia["Schizophrenia"]
        SZ1["2+ for 1 month: Delusions,\\nHallucinations, Disorganized speech,\\nDisorganized/catatonic, Negative"]
        SZ2["One must be: Delusions,\\nHallucinations, or Disorganized"]
        SZ3["Duration: 6 months total"]
    end
    FUNC["All require:\\nFunctional Impairment"]
    EXCL["Exclusion of:\\nSubstances, Medical"]
    MDD --> FUNC
    GAD --> FUNC
    Schizophrenia --> FUNC
    FUNC --> EXCL
    style FUNC fill:#FFA500,color:#000`,
};

/**
 * Treatment Response Monitoring template
 */
export const treatmentResponseMonitoring: DiagramTemplate = {
  id: 'psych-treatment-monitoring',
  name: 'Treatment Response Monitoring',
  description: 'Framework for monitoring and documenting treatment response over time',
  domain: 'medicine',
  promptTemplate: `Create a treatment response monitoring diagram:
- Baseline measures: {{baselineMeasures}}
- Monitoring frequency: {{monitoringFrequency}}
- Response definitions: {{responseDefinitions}}
- Remission criteria: {{remissionCriteria}}
- Side effect tracking: {{sideEffectTracking}}
- Decision points: {{decisionPoints}}
{{#additionalNotes}}Documentation requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'baselineMeasures',
    'monitoringFrequency',
    'responseDefinitions',
    'remissionCriteria',
    'sideEffectTracking',
    'decisionPoints',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Baseline["Baseline (Week 0)"]
        B1["PHQ-9/GAD-7"]
        B2["Symptom Inventory"]
        B3["Functioning (GAF/WHODAS)"]
        B4["Labs if indicated"]
    end
    subgraph Monitoring["Monitoring Schedule"]
        W2["Week 2: Tolerability"]
        W4["Week 4: Early Response"]
        W8["Week 8: Response Assessment"]
        W12["Week 12: Continuation"]
    end
    subgraph Response["Response Definitions"]
        R1["Response: 50% reduction"]
        R2["Partial: 25-49% reduction"]
        R3["Remission: PHQ-9 <5"]
    end
    subgraph Decisions["Decision Points"]
        D1["No Response at 4wk:\\nOptimize/Augment"]
        D2["Partial at 8wk:\\nAdd therapy or Med"]
        D3["Remission:\\nMaintenance 6-12mo"]
    end
    B1 --> W2 --> W4 --> W8 --> W12
    W8 --> R1 & R2 & R3
    R1 --> D3
    R2 --> D2
    R3 --> D3
    style R3 fill:#228B22,color:#fff
    style D1 fill:#FFA500,color:#000`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All psychiatry templates
 */
export const psychiatryTemplates: DiagramTemplate[] = [
  // Clinical Decision Trees
  depressionTreatmentAlgorithm,
  anxietyManagementAlgorithm,
  psychosisEvaluationAlgorithm,
  substanceUseTreatmentAlgorithm,
  suicideRiskAssessmentAlgorithm,
  // Anatomical Diagrams
  neurotransmitterPathways,
  limbicSystemAnatomy,
  sleepArchitecture,
  // Assessment Templates
  mentalStatusExam,
  screeningInterpretation,
  safetyPlanning,
  // Data Visualization
  medicationSideEffects,
  dsm5CriteriaOverview,
  treatmentResponseMonitoring,
];

export default psychiatryTemplates;
