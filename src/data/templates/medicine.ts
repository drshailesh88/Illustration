/**
 * medicine.ts
 * Medical diagram templates for FINNISH
 *
 * Contains templates for common medical and clinical research diagrams
 * following established guidelines (CONSORT, PRISMA, etc.)
 */

import type { DiagramTemplate } from './index';

/**
 * CONSORT Flow Diagram template for randomized controlled trials
 */
export const consortFlowDiagram: DiagramTemplate = {
  id: 'med-consort-flow',
  name: 'CONSORT Flow Diagram',
  description:
    'Standard flow diagram for reporting randomized controlled trials following CONSORT 2010 guidelines',
  domain: 'medicine',
  promptTemplate: `Create a CONSORT flow diagram for a randomized controlled trial with the following details:
- Total assessed for eligibility: {{totalAssessed}}
- Exclusion reasons: {{exclusionReasons}}
- Number randomized: {{randomized}}
- Intervention group: {{interventionGroup}}
- Control group: {{controlGroup}}
- Lost to follow-up (intervention): {{lostIntervention}}
- Lost to follow-up (control): {{lostControl}}
- Analyzed (intervention): {{analyzedIntervention}}
- Analyzed (control): {{analyzedControl}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'totalAssessed',
    'exclusionReasons',
    'randomized',
    'interventionGroup',
    'controlGroup',
    'lostIntervention',
    'lostControl',
    'analyzedIntervention',
    'analyzedControl',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph enrollment["Enrollment"]
        assessed["Assessed for eligibility<br/>(n=250)"]
        excluded["Excluded (n=50)<br/>Not meeting criteria (n=30)<br/>Declined (n=15)<br/>Other (n=5)"]
    end

    randomized["Randomized<br/>(n=200)"]

    subgraph allocation["Allocation"]
        intervention["Allocated to intervention (n=100)<br/>Received intervention (n=98)"]
        control["Allocated to control (n=100)<br/>Received control (n=99)"]
    end

    subgraph followup["Follow-up"]
        fuInt["Lost to follow-up (n=5)<br/>Discontinued (n=3)"]
        fuCtrl["Lost to follow-up (n=4)<br/>Discontinued (n=2)"]
    end

    subgraph analysis["Analysis"]
        anaInt["Analyzed (n=92)"]
        anaCtrl["Analyzed (n=94)"]
    end

    assessed --> excluded
    assessed --> randomized
    randomized --> intervention
    randomized --> control
    intervention --> fuInt
    control --> fuCtrl
    fuInt --> anaInt
    fuCtrl --> anaCtrl`,
};

/**
 * PRISMA Flow Diagram template for systematic reviews
 */
export const prismaFlowDiagram: DiagramTemplate = {
  id: 'med-prisma-flow',
  name: 'PRISMA Flow Diagram',
  description:
    'Flow diagram for systematic reviews and meta-analyses following PRISMA 2020 guidelines',
  domain: 'medicine',
  promptTemplate: `Create a PRISMA 2020 flow diagram for a systematic review:
- Records from databases: {{databaseRecords}}
- Records from registers: {{registerRecords}}
- Records from other sources: {{otherRecords}}
- Duplicates removed: {{duplicatesRemoved}}
- Records screened: {{recordsScreened}}
- Records excluded: {{recordsExcluded}}
- Reports sought for retrieval: {{reportsSought}}
- Reports not retrieved: {{reportsNotRetrieved}}
- Reports assessed for eligibility: {{reportsAssessed}}
- Reports excluded with reasons: {{reportsExcludedReasons}}
- Studies included in review: {{studiesIncluded}}
- Studies in meta-analysis: {{studiesInMetaAnalysis}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'databaseRecords',
    'registerRecords',
    'otherRecords',
    'duplicatesRemoved',
    'recordsScreened',
    'recordsExcluded',
    'reportsSought',
    'reportsNotRetrieved',
    'reportsAssessed',
    'reportsExcludedReasons',
    'studiesIncluded',
    'studiesInMetaAnalysis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph identification["Identification"]
        databases["Records from databases<br/>(n=1,234)"]
        registers["Records from registers<br/>(n=45)"]
        other["Records from other sources<br/>(n=23)"]
        duplicates["Duplicates removed<br/>(n=302)"]
    end

    subgraph screening["Screening"]
        screened["Records screened<br/>(n=1,000)"]
        excluded1["Records excluded<br/>(n=850)"]
    end

    subgraph eligibility["Eligibility"]
        sought["Reports sought<br/>(n=150)"]
        notRetrieved["Reports not retrieved<br/>(n=12)"]
        assessed["Reports assessed<br/>(n=138)"]
        excluded2["Reports excluded (n=98)<br/>Wrong population (n=45)<br/>Wrong intervention (n=30)<br/>Wrong outcome (n=23)"]
    end

    subgraph included["Included"]
        review["Studies in review<br/>(n=40)"]
        meta["Studies in meta-analysis<br/>(n=35)"]
    end

    databases --> duplicates
    registers --> duplicates
    other --> duplicates
    duplicates --> screened
    screened --> excluded1
    screened --> sought
    sought --> notRetrieved
    sought --> assessed
    assessed --> excluded2
    assessed --> review
    review --> meta`,
};

/**
 * Forest Plot template for meta-analysis
 */
export const forestPlot: DiagramTemplate = {
  id: 'med-forest-plot',
  name: 'Forest Plot',
  description:
    'Forest plot for displaying meta-analysis results with effect sizes and confidence intervals',
  domain: 'medicine',
  promptTemplate: `Create a forest plot for a meta-analysis:
- Study names: {{studyNames}}
- Effect sizes (odds ratios/risk ratios/mean differences): {{effectSizes}}
- 95% Confidence intervals: {{confidenceIntervals}}
- Weights: {{weights}}
- Overall effect: {{overallEffect}}
- Heterogeneity (I-squared): {{heterogeneity}}
- Favors labels: {{favorsLeft}} vs {{favorsRight}}
{{#subgroups}}Subgroup analysis: {{subgroups}}{{/subgroups}}`,
  placeholders: [
    'studyNames',
    'effectSizes',
    'confidenceIntervals',
    'weights',
    'overallEffect',
    'heterogeneity',
    'favorsLeft',
    'favorsRight',
    'subgroups',
  ],
};

/**
 * Kaplan-Meier Survival Curve template
 */
export const kaplanMeierCurve: DiagramTemplate = {
  id: 'med-kaplan-meier',
  name: 'Kaplan-Meier Survival Curve',
  description:
    'Survival curve for time-to-event analysis with censoring and risk tables',
  domain: 'medicine',
  promptTemplate: `Create a Kaplan-Meier survival curve:
- Groups to compare: {{groups}}
- Time points: {{timePoints}}
- Events at each time: {{events}}
- Censoring: {{censoring}}
- Median survival times: {{medianSurvival}}
- Hazard ratio: {{hazardRatio}}
- P-value (log-rank): {{pValue}}
- Include number at risk table: {{includeRiskTable}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'groups',
    'timePoints',
    'events',
    'censoring',
    'medianSurvival',
    'hazardRatio',
    'pValue',
    'includeRiskTable',
    'additionalNotes',
  ],
};

/**
 * Treatment Algorithm template
 */
export const treatmentAlgorithm: DiagramTemplate = {
  id: 'med-treatment-algorithm',
  name: 'Treatment Algorithm',
  description:
    'Clinical decision algorithm for treatment selection based on patient characteristics',
  domain: 'medicine',
  promptTemplate: `Create a treatment algorithm flowchart:
- Initial condition/diagnosis: {{initialCondition}}
- Decision points: {{decisionPoints}}
- Treatment options: {{treatmentOptions}}
- Response assessments: {{responseAssessments}}
- Escalation criteria: {{escalationCriteria}}
- Contraindications: {{contraindications}}
- Monitoring parameters: {{monitoring}}
{{#guidelines}}Based on guidelines: {{guidelines}}{{/guidelines}}`,
  placeholders: [
    'initialCondition',
    'decisionPoints',
    'treatmentOptions',
    'responseAssessments',
    'escalationCriteria',
    'contraindications',
    'monitoring',
    'guidelines',
  ],
  mermaidExample: `flowchart TB
    start(["Patient with Type 2 Diabetes"])

    assess{"HbA1c Level?"}

    lifestyle["Lifestyle Modifications<br/>+ Metformin"]

    check1{"HbA1c at target<br/>after 3 months?"}

    add1["Add second agent:<br/>SGLT2i, GLP-1 RA, or DPP-4i"]

    check2{"HbA1c at target<br/>after 3 months?"}

    add2["Add third agent or<br/>consider insulin"]

    monitor["Continue current therapy<br/>Monitor every 3-6 months"]

    start --> assess
    assess -->|"<7%"| lifestyle
    assess -->|">=7%"| lifestyle
    lifestyle --> check1
    check1 -->|No| add1
    check1 -->|Yes| monitor
    add1 --> check2
    check2 -->|No| add2
    check2 -->|Yes| monitor
    add2 --> monitor

    classDef decision fill:#fef3c7,stroke:#d97706
    classDef treatment fill:#d1fae5,stroke:#059669
    classDef monitor fill:#dbeafe,stroke:#2563eb

    class assess,check1,check2 decision
    class lifestyle,add1,add2 treatment
    class monitor monitor`,
};

/**
 * Patient Journey template
 */
export const patientJourney: DiagramTemplate = {
  id: 'med-patient-journey',
  name: 'Patient Journey',
  description:
    'Visual representation of patient experience through healthcare system touchpoints',
  domain: 'medicine',
  promptTemplate: `Create a patient journey map:
- Patient persona: {{patientPersona}}
- Journey phases: {{journeyPhases}}
- Touchpoints: {{touchpoints}}
- Actions at each stage: {{actions}}
- Pain points: {{painPoints}}
- Opportunities for improvement: {{opportunities}}
- Emotional states: {{emotionalStates}}
- Key metrics: {{metrics}}`,
  placeholders: [
    'patientPersona',
    'journeyPhases',
    'touchpoints',
    'actions',
    'painPoints',
    'opportunities',
    'emotionalStates',
    'metrics',
  ],
  mermaidExample: `flowchart LR
    subgraph awareness["Awareness"]
        a1["Symptoms noticed"]
        a2["Online research"]
    end

    subgraph access["Access"]
        b1["Schedule appointment"]
        b2["Insurance verification"]
    end

    subgraph diagnosis["Diagnosis"]
        c1["Initial consultation"]
        c2["Diagnostic tests"]
        c3["Results review"]
    end

    subgraph treatment["Treatment"]
        d1["Treatment plan"]
        d2["Therapy sessions"]
    end

    subgraph followup["Follow-up"]
        e1["Progress monitoring"]
        e2["Lifestyle adjustments"]
    end

    a1 --> a2
    a2 --> b1
    b1 --> b2
    b2 --> c1
    c1 --> c2
    c2 --> c3
    c3 --> d1
    d1 --> d2
    d2 --> e1
    e1 --> e2`,
};

/**
 * Clinical Pathway template
 */
export const clinicalPathway: DiagramTemplate = {
  id: 'med-clinical-pathway',
  name: 'Clinical Pathway',
  description:
    'Standardized care pathway showing timeline of interventions and expected outcomes',
  domain: 'medicine',
  promptTemplate: `Create a clinical pathway diagram:
- Condition/procedure: {{condition}}
- Timeline/phases: {{timeline}}
- Assessment activities: {{assessments}}
- Interventions: {{interventions}}
- Expected outcomes: {{expectedOutcomes}}
- Variance indicators: {{varianceIndicators}}
- Discharge criteria: {{dischargeCriteria}}
- Care team roles: {{careTeamRoles}}`,
  placeholders: [
    'condition',
    'timeline',
    'assessments',
    'interventions',
    'expectedOutcomes',
    'varianceIndicators',
    'dischargeCriteria',
    'careTeamRoles',
  ],
  mermaidExample: `flowchart TB
    subgraph day0["Day 0: Admission"]
        a1["Initial assessment"]
        a2["Baseline labs"]
        a3["Start IV fluids"]
    end

    subgraph day1["Day 1: Treatment"]
        b1["Morning rounds"]
        b2["Administer treatment"]
        b3["Monitor vitals q4h"]
    end

    subgraph day2["Day 2: Assessment"]
        c1["Response evaluation"]
        c2["Adjust therapy"]
        c3["Physical therapy consult"]
    end

    subgraph day3["Day 3: Discharge Planning"]
        d1["Discharge criteria check"]
        d2["Patient education"]
        d3["Follow-up scheduled"]
    end

    a1 --> a2 --> a3
    a3 --> b1
    b1 --> b2 --> b3
    b3 --> c1
    c1 --> c2 --> c3
    c3 --> d1
    d1 --> d2 --> d3`,
};

/**
 * All medicine templates exported as an array
 */
export const medicineTemplates: DiagramTemplate[] = [
  consortFlowDiagram,
  prismaFlowDiagram,
  forestPlot,
  kaplanMeierCurve,
  treatmentAlgorithm,
  patientJourney,
  clinicalPathway,
];
