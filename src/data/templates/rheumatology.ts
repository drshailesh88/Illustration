/**
 * rheumatology.ts
 * Rheumatology diagram templates for FINNISH
 *
 * Contains comprehensive templates for rheumatologic conditions including:
 * - Clinical decision algorithms (joint pain, RA, lupus, gout, vasculitis)
 * - Anatomical diagrams (synovial joint, inflammatory vs degenerative, hand deformities)
 * - Assessment templates (ACR criteria, disease activity scores, joint examination)
 * - Data visualization (autoantibody interpretation, DMARD monitoring, biologic selection)
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// DECISION TREES
// =============================================================================

/**
 * Joint Pain Workup Algorithm template
 */
export const rheumJointPainWorkup: DiagramTemplate = {
  id: 'rheum-joint-pain-workup',
  name: 'Joint Pain Workup Algorithm',
  description: 'Systematic approach to evaluating joint pain including inflammatory vs mechanical differentiation',
  domain: 'medicine',
  promptTemplate: `Create a joint pain evaluation algorithm flowchart:
- Initial presentation: {{presentation}}
- Joint pattern (mono/oligo/poly): {{jointPattern}}
- Inflammatory vs mechanical features: {{inflammatoryFeatures}}
- Duration (acute vs chronic): {{duration}}
- Extra-articular manifestations: {{extraArticular}}
- Initial laboratory workup: {{labWorkup}}
- Imaging approach: {{imagingApproach}}
- Differential diagnosis: {{differentialDiagnosis}}
{{#additionalNotes}}Additional clinical context: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'jointPattern',
    'inflammatoryFeatures',
    'duration',
    'extraArticular',
    'labWorkup',
    'imagingApproach',
    'differentialDiagnosis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Initial["Initial Assessment"]
        A[("Joint Pain")] --> B{"Inflammatory\\nFeatures?"}
    end
    subgraph Inflammatory["Inflammatory Path"]
        B -->|"Morning stiffness >1hr\\nSwelling, warmth"| C{"Pattern?"}
        C -->|"Monoarticular"| D["Septic? Crystal?"]
        C -->|"Polyarticular"| E["RA? SLE? PsA?"]
    end
    subgraph Mechanical["Mechanical Path"]
        B -->|"No stiffness\\nUsage-related"| F{"Pattern?"}
        F -->|"Weight-bearing"| G["OA likely"]
        F -->|"Specific injury"| H["Trauma workup"]
    end
    D --> I["Arthrocentesis"]
    E --> J["RF, Anti-CCP, ANA"]
    style D fill:#DC143C,color:#fff
    style G fill:#228B22,color:#fff`,
};

/**
 * Rheumatoid Arthritis Treatment Algorithm template
 */
export const raTreatmentAlgorithm: DiagramTemplate = {
  id: 'rheum-ra-treatment',
  name: 'RA Treatment Algorithm',
  description: 'Treat-to-target approach for rheumatoid arthritis following ACR/EULAR guidelines',
  domain: 'medicine',
  promptTemplate: `Create a rheumatoid arthritis treatment algorithm:
- Disease activity level: {{diseaseActivity}}
- Poor prognostic factors: {{poorPrognosticFactors}}
- Initial DMARD choice: {{initialDMARD}}
- Combination therapy options: {{combinationTherapy}}
- Biologic/targeted therapy indications: {{biologicIndications}}
- Treatment target: {{treatmentTarget}}
- Monitoring schedule: {{monitoringSchedule}}
- Flare management: {{flareManagement}}
{{#additionalNotes}}Special considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diseaseActivity',
    'poorPrognosticFactors',
    'initialDMARD',
    'combinationTherapy',
    'biologicIndications',
    'treatmentTarget',
    'monitoringSchedule',
    'flareManagement',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Early RA\\nDiagnosis")] --> B["Start MTX\\n+ Short-term steroids"]
    B --> C{"3-6 month\\nReassess"}
    C -->|"Target achieved\\nLDA/Remission"| D["Continue\\nMonitor q3-6mo"]
    C -->|"Not at target"| E{"Poor Prognostic\\nFactors?"}
    E -->|"Yes"| F["Add bDMARD/tsDMARD"]
    E -->|"No"| G["Add csDMARD\\nor Switch"]
    F --> H{"Response?"}
    H -->|"No"| I["Switch Mechanism"]
    H -->|"Yes"| J["Continue\\nConsider Taper"]
    style A fill:#DC143C,color:#fff
    style D fill:#228B22,color:#fff
    style J fill:#228B22,color:#fff`,
};

/**
 * Lupus Management Algorithm template
 */
export const lupusManagement: DiagramTemplate = {
  id: 'rheum-lupus-management',
  name: 'Lupus Management Algorithm',
  description: 'Comprehensive SLE management including organ involvement and treatment escalation',
  domain: 'medicine',
  promptTemplate: `Create a lupus management algorithm:
- Disease manifestations: {{manifestations}}
- Organ involvement: {{organInvolvement}}
- Disease activity score: {{activityScore}}
- Baseline medications: {{baselineMedications}}
- Flare management: {{flareManagement}}
- Immunosuppressive options: {{immunosuppressives}}
- Biologic therapy: {{biologicOptions}}
- Monitoring parameters: {{monitoringParameters}}
{{#additionalNotes}}Pregnancy considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'manifestations',
    'organInvolvement',
    'activityScore',
    'baselineMedications',
    'flareManagement',
    'immunosuppressives',
    'biologicOptions',
    'monitoringParameters',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("SLE\\nDiagnosis")] --> B["All patients:\\nHCQ + Sunscreen"]
    B --> C{"Organ\\nInvolvement?"}
    C -->|"Skin/Joints"| D["HCQ +/- MTX\\nLow-dose steroids"]
    C -->|"Nephritis"| E["MMF or CYC\\n+ Steroids"]
    C -->|"CNS/Severe"| F["High-dose steroids\\n+ Rituximab/CYC"]
    D --> G{"Response?"}
    E --> G
    G -->|"No"| H["Add Belimumab\\nor Switch IS"]
    G -->|"Yes"| I["Maintain\\nTaper steroids"]
    style E fill:#FFA500,color:#000
    style F fill:#DC143C,color:#fff
    style I fill:#228B22,color:#fff`,
};

/**
 * Gout Treatment Algorithm template
 */
export const goutTreatment: DiagramTemplate = {
  id: 'rheum-gout-treatment',
  name: 'Gout Treatment Algorithm',
  description: 'Acute gout management and urate-lowering therapy initiation and optimization',
  domain: 'medicine',
  promptTemplate: `Create a gout treatment algorithm:
- Acute presentation: {{acutePresentation}}
- Flare treatment options: {{flareOptions}}
- ULT indications: {{ultIndications}}
- ULT choice: {{ultChoice}}
- Target serum urate: {{targetUrate}}
- Flare prophylaxis: {{flareProphylaxis}}
- Titration strategy: {{titrationStrategy}}
- Refractory gout options: {{refractoryOptions}}
{{#additionalNotes}}Comorbidity considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'acutePresentation',
    'flareOptions',
    'ultIndications',
    'ultChoice',
    'targetUrate',
    'flareProphylaxis',
    'titrationStrategy',
    'refractoryOptions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Gout\\nDiagnosis")] --> B{"Acute\\nFlare?"}
    B -->|"Yes"| C["Colchicine/NSAID\\nor Steroids"]
    B -->|"No"| D{"ULT\\nIndicated?"}
    D -->|"Tophi, >2 flares/yr\\nCKD, Stones"| E["Start ULT\\n+ Prophylaxis"]
    D -->|"First flare"| F["Lifestyle\\nReassess"]
    E --> G["Allopurinol\\nStart low, go slow"]
    G --> H{"sUA\\n<6 mg/dL?"}
    H -->|"No"| I["Titrate up\\nq2-4 weeks"]
    H -->|"Yes"| J["Maintain\\nStop prophylaxis 3-6mo"]
    I --> H
    style C fill:#FFA500,color:#000
    style J fill:#228B22,color:#fff`,
};

/**
 * Vasculitis Evaluation Algorithm template
 */
export const vasculitisEvaluation: DiagramTemplate = {
  id: 'rheum-vasculitis-evaluation',
  name: 'Vasculitis Evaluation Algorithm',
  description: 'Systematic approach to vasculitis classification and workup by vessel size',
  domain: 'medicine',
  promptTemplate: `Create a vasculitis evaluation algorithm:
- Clinical presentation: {{presentation}}
- Vessel size suspected: {{vesselSize}}
- ANCA status: {{ancaStatus}}
- Organ involvement: {{organInvolvement}}
- Biopsy considerations: {{biopsyConsiderations}}
- Imaging modalities: {{imagingModalities}}
- Classification criteria: {{classificationCriteria}}
- Initial treatment: {{initialTreatment}}
{{#additionalNotes}}Mimics to exclude: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'presentation',
    'vesselSize',
    'ancaStatus',
    'organInvolvement',
    'biopsyConsiderations',
    'imagingModalities',
    'classificationCriteria',
    'initialTreatment',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("Suspected\\nVasculitis")] --> B{"Vessel\\nSize?"}
    B -->|"Large"| C["GCA, Takayasu"]
    B -->|"Medium"| D["PAN, Kawasaki"]
    B -->|"Small"| E{"ANCA?"}
    E -->|"Positive"| F["GPA, MPA, EGPA"]
    E -->|"Negative"| G["IgAV, Cryo,\\nHypocomplementemic"]
    C --> H["CTA/MRA\\nPET-CT, Biopsy"]
    D --> I["Angiography\\nSkin/Nerve Bx"]
    F --> J["Lung/Kidney Bx\\nCT Chest"]
    G --> K["Skin Bx\\nComplement, Cryo"]
    style F fill:#DC143C,color:#fff
    style C fill:#FFA500,color:#000`,
};

// =============================================================================
// ANATOMICAL DIAGRAMS
// =============================================================================

/**
 * Synovial Joint Anatomy template
 */
export const synovialJointAnatomy: DiagramTemplate = {
  id: 'rheum-synovial-joint-anatomy',
  name: 'Synovial Joint Anatomy',
  description: 'Detailed anatomical diagram of synovial joint structures',
  domain: 'medicine',
  promptTemplate: `Create a synovial joint anatomy diagram:
- Joint type: {{jointType}}
- Articular surfaces: {{articularSurfaces}}
- Cartilage layers: {{cartilageLayers}}
- Synovial membrane: {{synovialMembrane}}
- Joint capsule: {{jointCapsule}}
- Supporting ligaments: {{ligaments}}
- Bursae locations: {{bursae}}
- Vascular supply: {{vascularSupply}}
{{#additionalNotes}}Clinical correlations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'jointType',
    'articularSurfaces',
    'cartilageLayers',
    'synovialMembrane',
    'jointCapsule',
    'ligaments',
    'bursae',
    'vascularSupply',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Layers["Joint Structure"]
        A["Bone"] --> B["Subchondral Bone"]
        B --> C["Articular Cartilage"]
        C --> D["Synovial Fluid"]
    end
    subgraph Capsule["Capsular Structures"]
        E["Fibrous Capsule"]
        F["Synovial Membrane"]
        G["Ligaments"]
    end
    subgraph Supporting["Supporting"]
        H["Bursae"]
        I["Tendons"]
        J["Entheses"]
    end
    E --- F
    F --> D
    style C fill:#87CEEB,color:#000
    style D fill:#FFE4B5,color:#000`,
};

/**
 * Inflammatory vs Degenerative Changes template
 */
export const inflammatoryVsDegenerative: DiagramTemplate = {
  id: 'rheum-inflammatory-vs-degenerative',
  name: 'Inflammatory vs Degenerative Changes',
  description: 'Side-by-side comparison of inflammatory arthritis vs osteoarthritis pathology',
  domain: 'medicine',
  promptTemplate: `Create a comparison diagram of inflammatory vs degenerative joint changes:
- Inflammatory features: {{inflammatoryFeatures}}
- Degenerative features: {{degenerativeFeatures}}
- Synovial changes: {{synovialChanges}}
- Cartilage patterns: {{cartilagePatterns}}
- Bone changes: {{boneChanges}}
- Lab differences: {{labDifferences}}
- Imaging differences: {{imagingDifferences}}
- Clinical presentation: {{clinicalPresentation}}
{{#additionalNotes}}Overlap syndromes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'inflammatoryFeatures',
    'degenerativeFeatures',
    'synovialChanges',
    'cartilagePatterns',
    'boneChanges',
    'labDifferences',
    'imagingDifferences',
    'clinicalPresentation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph IA["Inflammatory Arthritis"]
        A1["Synovial Hypertrophy"]
        A2["Pannus Formation"]
        A3["Marginal Erosions"]
        A4["Uniform JSN"]
        A5["Periarticular Osteopenia"]
    end
    subgraph OA["Osteoarthritis"]
        B1["Minimal Synovitis"]
        B2["Cartilage Loss"]
        B3["Osteophytes"]
        B4["Asymmetric JSN"]
        B5["Subchondral Sclerosis"]
    end
    A1 --> A2 --> A3
    B1 --> B2 --> B3
    style A3 fill:#DC143C,color:#fff
    style B3 fill:#FFD700,color:#000`,
};

/**
 * Hand Deformities in RA template
 */
export const handDeformitiesRA: DiagramTemplate = {
  id: 'rheum-hand-deformities',
  name: 'Hand Deformities in Rheumatoid Arthritis',
  description: 'Illustrated guide to characteristic hand deformities in RA',
  domain: 'medicine',
  promptTemplate: `Create a hand deformities diagram for RA:
- Swan neck deformity: {{swanNeck}}
- Boutonniere deformity: {{boutonniere}}
- Ulnar deviation: {{ulnarDeviation}}
- Z-thumb deformity: {{zThumb}}
- MCP involvement: {{mcpInvolvement}}
- Tendon rupture patterns: {{tendonRupture}}
- Carpal involvement: {{carpalInvolvement}}
- Functional impact: {{functionalImpact}}
{{#additionalNotes}}Surgical options: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'swanNeck',
    'boutonniere',
    'ulnarDeviation',
    'zThumb',
    'mcpInvolvement',
    'tendonRupture',
    'carpalInvolvement',
    'functionalImpact',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Deformities["RA Hand Deformities"]
        A["Swan Neck\\nPIP hyper, DIP flex"]
        B["Boutonniere\\nPIP flex, DIP hyper"]
        C["Ulnar Deviation\\nMCP subluxation"]
        D["Z-Thumb\\nMCP flex, IP hyper"]
    end
    subgraph Mechanism["Mechanism"]
        E["Synovitis"] --> F["Ligament laxity"]
        F --> G["Tendon imbalance"]
        G --> H["Fixed deformity"]
    end
    A & B & C & D --> E
    style A fill:#FFA500,color:#000
    style B fill:#FFA500,color:#000
    style C fill:#DC143C,color:#fff`,
};

// =============================================================================
// ASSESSMENT TEMPLATES
// =============================================================================

/**
 * ACR/EULAR RA Classification Criteria template
 */
export const acrRACriteria: DiagramTemplate = {
  id: 'rheum-acr-ra-criteria',
  name: 'ACR/EULAR RA Classification Criteria',
  description: '2010 ACR/EULAR classification criteria for rheumatoid arthritis',
  domain: 'medicine',
  promptTemplate: `Create an ACR/EULAR RA classification criteria diagram:
- Joint involvement scoring: {{jointInvolvement}}
- Serology (RF/anti-CCP): {{serology}}
- Acute phase reactants: {{acutePhase}}
- Duration criteria: {{duration}}
- Score thresholds: {{scoreThresholds}}
- Exclusions: {{exclusions}}
- Application guidance: {{applicationGuidance}}
{{#additionalNotes}}Clinical pearls: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'jointInvolvement',
    'serology',
    'acutePhase',
    'duration',
    'scoreThresholds',
    'exclusions',
    'applicationGuidance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Score["Score Components (need ≥6)"]
        A["Joint Involvement\\n1 large: 0\\n2-10 large: 1\\n1-3 small: 2\\n4-10 small: 3\\n>10 +1 small: 5"]
        B["Serology\\nNeg: 0\\nLow pos: 2\\nHigh pos: 3"]
        C["Acute Phase\\nNormal: 0\\nAbnormal: 1"]
        D["Duration\\n<6 wks: 0\\n≥6 wks: 1"]
    end
    A & B & C & D --> E{"Total\\nScore?"}
    E -->|"≥6"| F["Definite RA"]
    E -->|"<6"| G["Not classified\\nas RA"]
    style F fill:#DC143C,color:#fff`,
};

/**
 * SLICC/ACR Lupus Classification Criteria template
 */
export const sliccLupusCriteria: DiagramTemplate = {
  id: 'rheum-slicc-lupus-criteria',
  name: 'SLICC Lupus Classification Criteria',
  description: 'SLICC 2012 and ACR 1997 classification criteria for SLE',
  domain: 'medicine',
  promptTemplate: `Create a lupus classification criteria diagram:
- Clinical criteria: {{clinicalCriteria}}
- Immunologic criteria: {{immunologicCriteria}}
- Biopsy-proven nephritis: {{biopsyProvenNephritis}}
- Required combinations: {{requiredCombinations}}
- Sensitivity/specificity: {{sensitivity}}
- Comparison to ACR 1997: {{comparisonACR}}
{{#additionalNotes}}Updates and considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'clinicalCriteria',
    'immunologicCriteria',
    'biopsyProvenNephritis',
    'requiredCombinations',
    'sensitivity',
    'comparisonACR',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Clinical["Clinical (11)"]
        A["Acute cutaneous\\nChronic cutaneous"]
        B["Oral/nasal ulcers\\nAlopecia"]
        C["Arthritis\\nSerositis"]
        D["Renal\\nNeurologic"]
        E["Hemolytic anemia\\nLeukopenia\\nThrombocytopenia"]
    end
    subgraph Immuno["Immunologic (6)"]
        F["ANA\\nAnti-dsDNA"]
        G["Anti-Sm\\nAntiphospholipid"]
        H["Low complement\\nDirect Coombs"]
    end
    A & B & C & D & E & F & G & H --> I{"≥4 criteria\\n(1 clinical + 1 immuno)\\nOR Biopsy-proven LN + ANA/dsDNA"}
    I --> J["SLE Classification"]
    style J fill:#9370DB,color:#fff`,
};

/**
 * DAS28 Disease Activity Score template
 */
export const das28Score: DiagramTemplate = {
  id: 'rheum-das28-score',
  name: 'DAS28 Disease Activity Score',
  description: 'Disease Activity Score calculation and interpretation for RA',
  domain: 'medicine',
  promptTemplate: `Create a DAS28 disease activity score diagram:
- Tender joint count: {{tenderJoints}}
- Swollen joint count: {{swollenJoints}}
- ESR or CRP value: {{acutePhase}}
- Patient global assessment: {{patientGlobal}}
- Calculation formula: {{formula}}
- Score thresholds: {{thresholds}}
- Clinical interpretation: {{interpretation}}
- Treatment decisions: {{treatmentDecisions}}
{{#additionalNotes}}Limitations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'tenderJoints',
    'swollenJoints',
    'acutePhase',
    'patientGlobal',
    'formula',
    'thresholds',
    'interpretation',
    'treatmentDecisions',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Components["DAS28 Components"]
        A["TJC28\\n(0-28 joints)"]
        B["SJC28\\n(0-28 joints)"]
        C["ESR or CRP"]
        D["Patient VAS\\n(0-100mm)"]
    end
    A & B & C & D --> E["DAS28 Score"]
    E --> F{"Score?"}
    F -->|"<2.6"| G["Remission"]
    F -->|"2.6-3.2"| H["Low Activity"]
    F -->|"3.2-5.1"| I["Moderate"]
    F -->|">5.1"| J["High Activity"]
    style G fill:#228B22,color:#fff
    style H fill:#90EE90,color:#000
    style I fill:#FFA500,color:#000
    style J fill:#DC143C,color:#fff`,
};

/**
 * Joint Examination Template template
 */
export const jointExamination: DiagramTemplate = {
  id: 'rheum-joint-examination',
  name: 'Systematic Joint Examination',
  description: 'Comprehensive joint examination template for rheumatologic assessment',
  domain: 'medicine',
  promptTemplate: `Create a systematic joint examination diagram:
- Inspection findings: {{inspectionFindings}}
- Palpation assessment: {{palpation}}
- Range of motion: {{rangeOfMotion}}
- Special tests: {{specialTests}}
- Joint pattern: {{jointPattern}}
- Extra-articular signs: {{extraArticularSigns}}
- Documentation format: {{documentation}}
- Red flags: {{redFlags}}
{{#additionalNotes}}Pediatric considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'inspectionFindings',
    'palpation',
    'rangeOfMotion',
    'specialTests',
    'jointPattern',
    'extraArticularSigns',
    'documentation',
    'redFlags',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph GALS["GALS Screen"]
        A["Gait\\nArms\\nLegs\\nSpine"]
    end
    subgraph Detailed["Regional Exam"]
        B["Hands/Wrists"]
        C["Elbows/Shoulders"]
        D["Hips/Knees"]
        E["Ankles/Feet"]
        F["Spine/SI joints"]
    end
    A -->|"Abnormal"| B & C & D & E & F
    subgraph Each["Each Joint"]
        G["Look: Swelling, erythema, deformity"]
        H["Feel: Warmth, tenderness, effusion"]
        I["Move: Active, passive, crepitus"]
    end
    B & C & D & E & F --> G --> H --> I`,
};

/**
 * SLEDAI Disease Activity Score template
 */
export const sledaiScore: DiagramTemplate = {
  id: 'rheum-sledai-score',
  name: 'SLEDAI Disease Activity Score',
  description: 'Systemic Lupus Erythematosus Disease Activity Index calculation',
  domain: 'medicine',
  promptTemplate: `Create a SLEDAI disease activity score diagram:
- CNS manifestations: {{cnsManifestations}}
- Vascular manifestations: {{vascularManifestations}}
- Renal manifestations: {{renalManifestations}}
- Musculoskeletal: {{musculoskeletal}}
- Mucocutaneous: {{mucocutaneous}}
- Serology changes: {{serologyChanges}}
- Score calculation: {{scoreCalculation}}
- Activity levels: {{activityLevels}}
{{#additionalNotes}}Flare definition: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cnsManifestations',
    'vascularManifestations',
    'renalManifestations',
    'musculoskeletal',
    'mucocutaneous',
    'serologyChanges',
    'scoreCalculation',
    'activityLevels',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph High["High Weight (8)"]
        A["Seizure\\nPsychosis\\nOrganic brain"]
    end
    subgraph Medium["Medium Weight (4)"]
        B["Vasculitis\\nArthritis\\nMyositis"]
        C["Casts\\nHematuria\\nProteinuria"]
    end
    subgraph Low["Low Weight (1-2)"]
        D["Rash\\nAlopecia\\nMucosal ulcers"]
        E["Pleurisy\\nPericarditis\\nFever"]
    end
    subgraph Serologic["Serologic (2)"]
        F["Low complement\\nAnti-dsDNA"]
    end
    A & B & C & D & E & F --> G["SLEDAI Score"]
    G --> H{"Activity?"}
    H -->|"0"| I["Inactive"]
    H -->|"1-5"| J["Mild"]
    H -->|"6-10"| K["Moderate"]
    H -->|"11-19"| L["High"]
    H -->|"≥20"| M["Very High"]
    style M fill:#DC143C,color:#fff`,
};

// =============================================================================
// DATA VISUALIZATION TEMPLATES
// =============================================================================

/**
 * Autoantibody Interpretation Guide template
 */
export const autoantibodyInterpretation: DiagramTemplate = {
  id: 'rheum-autoantibody-interpretation',
  name: 'Autoantibody Interpretation Guide',
  description: 'Clinical interpretation of common rheumatologic autoantibodies',
  domain: 'medicine',
  promptTemplate: `Create an autoantibody interpretation guide:
- ANA patterns and associations: {{anaPatterns}}
- Anti-dsDNA significance: {{antidsDNA}}
- ENA panel interpretation: {{enaPanel}}
- RA-specific antibodies: {{raAntibodies}}
- Myositis-specific antibodies: {{myositisAntibodies}}
- ANCA patterns: {{ancaPatterns}}
- Sensitivity/specificity data: {{testCharacteristics}}
- Clinical context importance: {{clinicalContext}}
{{#additionalNotes}}Ordering guidance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'anaPatterns',
    'antidsDNA',
    'enaPanel',
    'raAntibodies',
    'myositisAntibodies',
    'ancaPatterns',
    'testCharacteristics',
    'clinicalContext',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph ANA["ANA Patterns"]
        A["Homogeneous: SLE, Drug-induced"]
        B["Speckled: MCTD, Sjogren, SLE"]
        C["Nucleolar: Scleroderma"]
        D["Centromere: Limited SSc"]
    end
    subgraph Specific["Disease-Specific"]
        E["Anti-dsDNA: SLE (nephritis)"]
        F["Anti-Sm: SLE (specific)"]
        G["Anti-CCP: RA (specific)"]
        H["Anti-Scl70: Diffuse SSc"]
        I["Anti-Jo1: Antisynthetase"]
    end
    subgraph ANCA["ANCA"]
        J["c-ANCA/PR3: GPA"]
        K["p-ANCA/MPO: MPA, EGPA"]
    end
    style E fill:#9370DB,color:#fff
    style G fill:#DC143C,color:#fff
    style J fill:#FFA500,color:#000`,
};

/**
 * DMARD Monitoring Protocol template
 */
export const dmardMonitoring: DiagramTemplate = {
  id: 'rheum-dmard-monitoring',
  name: 'DMARD Monitoring Protocol',
  description: 'Laboratory and clinical monitoring schedule for DMARDs',
  domain: 'medicine',
  promptTemplate: `Create a DMARD monitoring protocol:
- Methotrexate monitoring: {{mtxMonitoring}}
- Leflunomide monitoring: {{lefMonitoring}}
- Sulfasalazine monitoring: {{ssaMonitoring}}
- Hydroxychloroquine monitoring: {{hcqMonitoring}}
- Biologic monitoring: {{biologicMonitoring}}
- JAK inhibitor monitoring: {{jakMonitoring}}
- Baseline requirements: {{baselineRequirements}}
- Frequency schedule: {{frequencySchedule}}
{{#additionalNotes}}Action thresholds: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mtxMonitoring',
    'lefMonitoring',
    'ssaMonitoring',
    'hcqMonitoring',
    'biologicMonitoring',
    'jakMonitoring',
    'baselineRequirements',
    'frequencySchedule',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Baseline["Baseline Labs"]
        A["CBC, CMP, LFTs"]
        B["Hepatitis B/C"]
        C["TB screening"]
        D["Pregnancy test"]
    end
    subgraph MTX["Methotrexate"]
        E["CBC, CMP q2-4wk x3mo"]
        F["Then q8-12wk"]
        G["Add Folic acid 1mg"]
    end
    subgraph Bio["Biologics"]
        H["Infection screening"]
        I["Monitor for infections"]
        J["Periodic labs"]
    end
    subgraph JAK["JAK Inhibitors"]
        K["CBC q4wk initially"]
        L["Lipids at 4-8wk"]
        M["VTE risk assess"]
    end
    A & B & C & D --> E & H & K
    style E fill:#4169E1,color:#fff
    style M fill:#DC143C,color:#fff`,
};

/**
 * Biologic Selection Guide template
 */
export const biologicSelection: DiagramTemplate = {
  id: 'rheum-biologic-selection',
  name: 'Biologic Selection Guide',
  description: 'Evidence-based guide for selecting biologic therapy in rheumatic diseases',
  domain: 'medicine',
  promptTemplate: `Create a biologic selection guide:
- Disease indication: {{diseaseIndication}}
- Mechanism options: {{mechanismOptions}}
- TNF inhibitors: {{tnfInhibitors}}
- IL-6 inhibitors: {{il6Inhibitors}}
- T-cell costimulation: {{tcellCostim}}
- B-cell depletion: {{bcellDepletion}}
- JAK inhibitors: {{jakInhibitors}}
- Patient factors: {{patientFactors}}
- Contraindications: {{contraindications}}
{{#additionalNotes}}Cost considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'diseaseIndication',
    'mechanismOptions',
    'tnfInhibitors',
    'il6Inhibitors',
    'tcellCostim',
    'bcellDepletion',
    'jakInhibitors',
    'patientFactors',
    'contraindications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A[("MTX\\nInadequate")] --> B{"Considerations?"}
    B -->|"Standard"| C["TNF Inhibitor"]
    B -->|"CHF concern"| D["Avoid TNFi\\n→ Abatacept, Tocilizumab"]
    B -->|"Prior TB"| E["Prefer Abatacept"]
    B -->|"MS history"| F["Avoid TNFi"]
    B -->|"Oral preferred"| G["JAK inhibitor\\n(assess VTE risk)"]
    C --> H{"Response?"}
    H -->|"No"| I["Switch mechanism\\nor 2nd TNFi"]
    H -->|"Yes"| J["Continue\\nMonitor"]
    subgraph Mechanisms["Available Mechanisms"]
        K["TNFi: Ada, Eta, Inf, Gol, Cer"]
        L["IL-6i: Toci, Sari"]
        M["Abatacept (CTLA4-Ig)"]
        N["Rituximab (anti-CD20)"]
        O["JAKi: Tofa, Bari, Upa"]
    end
    style C fill:#4169E1,color:#fff
    style J fill:#228B22,color:#fff`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All rheumatology templates
 */
export const rheumatologyTemplates: DiagramTemplate[] = [
  // Decision Trees
  rheumJointPainWorkup,
  raTreatmentAlgorithm,
  lupusManagement,
  goutTreatment,
  vasculitisEvaluation,
  // Anatomical Diagrams
  synovialJointAnatomy,
  inflammatoryVsDegenerative,
  handDeformitiesRA,
  // Assessment Templates
  acrRACriteria,
  sliccLupusCriteria,
  das28Score,
  jointExamination,
  sledaiScore,
  // Data Visualization
  autoantibodyInterpretation,
  dmardMonitoring,
  biologicSelection,
];

export default rheumatologyTemplates;
