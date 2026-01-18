/**
 * Dermatology Templates
 * Comprehensive diagram templates for dermatologic medicine
 *
 * Categories:
 * - Diagnostic Algorithms (lesion assessment, cancer screening)
 * - Anatomical Diagrams (skin layers, structures)
 * - Treatment Pathways (acne, eczema, psoriasis management)
 * - Lesion Documentation (morphology, distribution)
 * - Surgical Planning (Mohs mapping, excision margins)
 *
 * Total: 25 templates
 */

import type { DiagramTemplate } from './index';

export const dermatologyTemplates: DiagramTemplate[] = [
  // ===========================================================================
  // DIAGNOSTIC ALGORITHMS
  // ===========================================================================
  {
    id: 'derm-lesion-assessment',
    name: 'Skin Lesion Assessment Algorithm',
    description: 'Systematic approach to evaluating skin lesions with differential diagnosis pathway',
    domain: 'medicine',
    promptTemplate: `Create a clinical decision flowchart for skin lesion assessment:

Patient Presentation: {{presentation}}
Key History Points: {{history}}
Lesion Characteristics: {{characteristics}}

The flowchart should include:
1. Initial lesion morphology assessment (flat vs raised, color, texture)
2. Size and border evaluation
3. Distribution pattern analysis
4. Key diagnostic questions (duration, symptoms, evolution)
5. Differential diagnosis branches
6. Recommended workup (dermoscopy, biopsy, labs)
7. Referral criteria

Use dermatology-specific terminology and include ABCDE criteria for pigmented lesions.`,
    placeholders: ['presentation', 'history', 'characteristics'],
    mermaidExample: `flowchart TD
    A[("Skin Lesion\\nPresentation")] --> B{"Morphology?"}
    B -->|"Flat"| C{"Pigmented?"}
    B -->|"Raised"| D{"Solid or\\nFluid-filled?"}
    C -->|"Yes"| E["Evaluate ABCDE"]
    C -->|"No"| F["Consider vitiligo,\\ntinea versicolor"]
    D -->|"Solid"| G{"Size?"}
    D -->|"Fluid"| H{"Clear or\\nPurulent?"}
    E --> I{"Suspicious?"}
    I -->|"Yes"| J["Biopsy"]
    I -->|"No"| K["Monitor + Photo"]`
  },
  {
    id: 'derm-abcde-melanoma-screening',
    name: 'ABCDE Melanoma Screening',
    description: 'Melanoma evaluation using ABCDE criteria with clinical decision support',
    domain: 'medicine',
    promptTemplate: `Create an ABCDE melanoma screening flowchart:

Patient Information: {{patientInfo}}
Lesion Location: {{location}}
Risk Factors: {{riskFactors}}

Include evaluation of:
1. A - Asymmetry assessment
2. B - Border irregularity
3. C - Color variation (multiple colors, blue-black)
4. D - Diameter (>6mm or changing)
5. E - Evolution (recent changes)

Provide scoring guidance and management recommendations based on findings.
Include dermoscopy features and biopsy indications.`,
    placeholders: ['patientInfo', 'location', 'riskFactors'],
  },
  {
    id: 'derm-rash-differential',
    name: 'Rash Differential Diagnosis',
    description: 'Systematic approach to diagnosing cutaneous rashes based on morphology and distribution',
    domain: 'medicine',
    promptTemplate: `Create a rash differential diagnosis flowchart:

Rash Description: {{rashDescription}}
Distribution: {{distribution}}
Associated Symptoms: {{symptoms}}
Patient Demographics: {{demographics}}

The flowchart should categorize by:
1. Primary lesion type (papular, vesicular, pustular, macular)
2. Distribution pattern (localized, generalized, dermatomal)
3. Acute vs chronic presentation
4. Infectious vs inflammatory vs allergic
5. Key differentiating features
6. Recommended workup
7. Treatment pathways`,
    placeholders: ['rashDescription', 'distribution', 'symptoms', 'demographics'],
  },
  {
    id: 'derm-biopsy-selection',
    name: 'Skin Biopsy Technique Selection',
    description: 'Algorithm for selecting appropriate skin biopsy technique based on lesion type',
    domain: 'medicine',
    promptTemplate: `Create a skin biopsy technique selection algorithm:

Lesion Type: {{lesionType}}
Location: {{location}}
Clinical Suspicion: {{suspicion}}

Include decision points for:
1. Shave biopsy (superficial lesions, benign suspected)
2. Punch biopsy (inflammatory, deeper lesions)
3. Excisional biopsy (suspicious for malignancy)
4. Incisional biopsy (large lesions, cosmetically sensitive)

Consider:
- Margin requirements
- Cosmetic outcomes
- Diagnostic adequacy
- Special handling requirements (IF, culture)`,
    placeholders: ['lesionType', 'location', 'suspicion'],
  },

  // ===========================================================================
  // TREATMENT PATHWAYS
  // ===========================================================================
  {
    id: 'derm-acne-management',
    name: 'Acne Vulgaris Management Algorithm',
    description: 'Step-up approach to acne treatment based on severity and response',
    domain: 'medicine',
    promptTemplate: `Create an acne management algorithm:

Acne Severity: {{severity}}
Previous Treatments: {{previousTreatments}}
Patient Factors: {{patientFactors}}

Include treatment ladder:
1. Mild acne: topical retinoids, benzoyl peroxide
2. Moderate acne: add topical antibiotics, combination therapy
3. Moderate-severe: oral antibiotics, hormonal therapy
4. Severe/nodular: isotretinoin consideration
5. Maintenance therapy

Address:
- Antibiotic stewardship
- Pregnancy considerations
- Isotretinoin iPLEDGE requirements
- Scar prevention and treatment`,
    placeholders: ['severity', 'previousTreatments', 'patientFactors'],
    mermaidExample: `flowchart TD
    A["Acne Assessment"] --> B{"Severity?"}
    B -->|"Mild\\nComedonal"| C["Topical Retinoid\\n+ BPO"]
    B -->|"Moderate\\nPapulopustular"| D["Add Topical\\nAntibiotic"]
    B -->|"Severe\\nNodular"| E{"Female?"}
    C --> F{"Response\\n8-12 weeks?"}
    D --> F
    F -->|"No"| G["Step Up"]
    F -->|"Yes"| H["Maintenance"]
    E -->|"Yes"| I["Consider\\nSpironolactone/OCP"]
    E -->|"No"| J["Consider\\nIsotretinoin"]`
  },
  {
    id: 'derm-eczema-management',
    name: 'Atopic Dermatitis Management',
    description: 'Comprehensive eczema treatment algorithm with step-up therapy',
    domain: 'medicine',
    promptTemplate: `Create an atopic dermatitis management flowchart:

Disease Severity: {{severity}}
Age Group: {{ageGroup}}
Affected Areas: {{areas}}
Previous Treatment History: {{history}}

Include:
1. Baseline skincare (emollients, trigger avoidance)
2. Mild disease: low-potency topical steroids, TCIs
3. Moderate disease: medium-potency steroids, wet wraps
4. Severe disease: systemic options (dupilumab, JAK inhibitors)
5. Infection management (S. aureus colonization)
6. Itch control strategies
7. Quality of life assessment (SCORAD, EASI)`,
    placeholders: ['severity', 'ageGroup', 'areas', 'history'],
  },
  {
    id: 'derm-psoriasis-management',
    name: 'Psoriasis Treatment Algorithm',
    description: 'Stepwise approach to psoriasis management including biologics',
    domain: 'medicine',
    promptTemplate: `Create a psoriasis treatment algorithm:

Disease Severity (BSA/PASI): {{severity}}
Affected Sites: {{sites}}
Comorbidities: {{comorbidities}}
Previous Treatments: {{previousTreatments}}

Treatment tiers:
1. Limited disease: topicals (steroids, vitamin D analogs, retinoids)
2. Moderate disease: phototherapy, methotrexate, apremilast
3. Moderate-severe: biologics (TNF-i, IL-17i, IL-23i)
4. Special considerations: nail psoriasis, scalp, inverse

Include:
- Psoriatic arthritis screening
- Cardiovascular risk assessment
- Biologic selection guidance
- Monitoring requirements`,
    placeholders: ['severity', 'sites', 'comorbidities', 'previousTreatments'],
  },
  {
    id: 'derm-urticaria-workup',
    name: 'Chronic Urticaria Workup',
    description: 'Diagnostic and treatment algorithm for chronic urticaria',
    domain: 'medicine',
    promptTemplate: `Create a chronic urticaria workup algorithm:

Duration: {{duration}}
Associated Symptoms: {{symptoms}}
Triggers Identified: {{triggers}}

Include:
1. Acute vs chronic classification (>6 weeks)
2. Physical urticaria screening (pressure, cold, heat, solar)
3. Laboratory workup (CBC, TSH, CRP, ANA)
4. Autoimmune screening if indicated
5. Treatment ladder:
   - First-line: H1 antihistamines (up to 4x dose)
   - Second-line: add H2 blockers, LTRA
   - Third-line: omalizumab, cyclosporine
6. Urticaria activity score (UAS7)`,
    placeholders: ['duration', 'symptoms', 'triggers'],
  },

  // ===========================================================================
  // SKIN CANCER PATHWAYS
  // ===========================================================================
  {
    id: 'derm-bcc-management',
    name: 'Basal Cell Carcinoma Management',
    description: 'Treatment algorithm for BCC based on risk stratification',
    domain: 'medicine',
    promptTemplate: `Create a BCC management algorithm:

Tumor Characteristics: {{tumorCharacteristics}}
Location: {{location}}
Size: {{size}}
Histologic Subtype: {{histology}}

Risk stratification and treatment:
1. Low-risk BCC: ED&C, standard excision (4mm margins)
2. High-risk features: Mohs surgery, wide excision
3. Locally advanced/metastatic: hedgehog inhibitors (vismodegib)
4. Non-surgical options: radiation, topical imiquimod/5-FU

Include:
- H zone facial locations
- Recurrent tumor considerations
- Follow-up schedule
- Sun protection counseling`,
    placeholders: ['tumorCharacteristics', 'location', 'size', 'histology'],
  },
  {
    id: 'derm-scc-management',
    name: 'Squamous Cell Carcinoma Management',
    description: 'Treatment algorithm for SCC with risk-based approach',
    domain: 'medicine',
    promptTemplate: `Create an SCC management algorithm:

Tumor Features: {{tumorFeatures}}
Location: {{location}}
Patient Status: {{patientStatus}}
Immunosuppression: {{immunoStatus}}

Include risk stratification:
1. Low-risk: standard excision, ED&C for superficial
2. High-risk features (>2cm, depth, PNI, poorly differentiated)
3. Mohs surgery indications
4. Lymph node evaluation
5. Adjuvant radiation considerations
6. Systemic therapy for advanced disease (cemiplimab)

Special populations:
- Transplant patients
- CLL/immunosuppression`,
    placeholders: ['tumorFeatures', 'location', 'patientStatus', 'immunoStatus'],
  },
  {
    id: 'derm-melanoma-staging',
    name: 'Melanoma Staging and Management',
    description: 'AJCC staging-based melanoma treatment algorithm',
    domain: 'medicine',
    promptTemplate: `Create a melanoma staging and management flowchart:

Breslow Thickness: {{breslow}}
Ulceration Status: {{ulceration}}
Mitotic Rate: {{mitoticRate}}
Clinical Stage: {{stage}}

Include:
1. Wide local excision margins by depth
2. Sentinel lymph node biopsy criteria
3. Imaging recommendations by stage
4. Adjuvant therapy options (nivolumab, dabrafenib/trametinib)
5. Metastatic treatment (immunotherapy, targeted therapy)
6. Surveillance schedule

AJCC 8th edition staging criteria reference.`,
    placeholders: ['breslow', 'ulceration', 'mitoticRate', 'stage'],
  },
  {
    id: 'derm-actinic-keratosis',
    name: 'Actinic Keratosis Treatment',
    description: 'Management algorithm for actinic keratoses and field cancerization',
    domain: 'medicine',
    promptTemplate: `Create an actinic keratosis treatment algorithm:

Number of Lesions: {{number}}
Location: {{location}}
Field Cancerization: {{fieldCancerization}}

Treatment options:
1. Individual lesion treatment:
   - Cryotherapy
   - ED&C
   - Shave removal
2. Field therapy:
   - Topical 5-fluorouracil
   - Imiquimod
   - PDT (photodynamic therapy)
   - Ingenol mebutate/tirbanibulin
3. Combination approaches
4. Monitoring and prevention`,
    placeholders: ['number', 'location', 'fieldCancerization'],
  },

  // ===========================================================================
  // ANATOMICAL DIAGRAMS
  // ===========================================================================
  {
    id: 'derm-skin-anatomy-diagram',
    name: 'Skin Anatomy Cross-Section',
    description: 'Detailed cross-sectional diagram of skin layers and appendages',
    domain: 'medicine',
    promptTemplate: `Create a detailed skin anatomy cross-section diagram showing:

Focus Areas: {{focusAreas}}
Level of Detail: {{detailLevel}}

Include layers:
1. Epidermis (stratum corneum, lucidum, granulosum, spinosum, basale)
2. Dermis (papillary and reticular)
3. Subcutis/Hypodermis

Include structures:
- Hair follicles with sebaceous glands
- Eccrine and apocrine sweat glands
- Arrector pili muscles
- Blood vessels and nerves
- Meissner and Pacinian corpuscles
- Langerhans cells, melanocytes, keratinocytes

Label all structures with proper anatomical terminology.`,
    placeholders: ['focusAreas', 'detailLevel'],
  },
  {
    id: 'derm-dermatomal-map',
    name: 'Dermatome Distribution Map',
    description: 'Body diagram showing dermatomal sensory distribution',
    domain: 'medicine',
    promptTemplate: `Create a dermatomal distribution map:

View: {{view}}
Specific Levels to Highlight: {{levels}}
Clinical Context: {{context}}

Show dermatome distribution:
- Cervical (C2-C8)
- Thoracic (T1-T12)
- Lumbar (L1-L5)
- Sacral (S1-S5)

Include key landmarks:
- C5: lateral arm
- C6: thumb
- C7: middle finger
- C8: little finger
- T4: nipple line
- T10: umbilicus
- L1: inguinal region
- S1: lateral foot`,
    placeholders: ['view', 'levels', 'context'],
  },
  {
    id: 'derm-body-surface-area',
    name: 'Rule of Nines / BSA Calculator',
    description: 'Body surface area diagram for burn assessment or disease extent',
    domain: 'medicine',
    promptTemplate: `Create a body surface area diagram:

Purpose: {{purpose}}
Age Group: {{ageGroup}}
Areas Affected: {{affectedAreas}}

Show Rule of Nines:
- Head: 9% (18% in infants)
- Each arm: 9%
- Each leg: 18% (14% in infants)
- Anterior trunk: 18%
- Posterior trunk: 18%
- Perineum: 1%

Include Lund-Browder chart modifications for pediatric patients.
Calculate total BSA for: {{calculatedAreas}}`,
    placeholders: ['purpose', 'ageGroup', 'affectedAreas', 'calculatedAreas'],
  },

  // ===========================================================================
  // LESION DOCUMENTATION
  // ===========================================================================
  {
    id: 'derm-lesion-morphology-chart',
    name: 'Primary Lesion Morphology Chart',
    description: 'Visual reference chart for primary skin lesion classification',
    domain: 'medicine',
    promptTemplate: `Create a primary lesion morphology reference chart:

Focus Categories: {{categories}}
Teaching Level: {{level}}

Include primary lesions:
- Flat lesions: macule (<1cm), patch (>1cm)
- Elevated solid: papule (<1cm), plaque (>1cm), nodule, tumor
- Fluid-filled: vesicle (<1cm), bulla (>1cm), pustule
- Other: wheal, cyst, comedone

For each lesion type show:
- Cross-sectional diagram
- Clinical example appearance
- Key characteristics
- Common conditions that present this way`,
    placeholders: ['categories', 'level'],
  },
  {
    id: 'derm-secondary-lesions-chart',
    name: 'Secondary Lesion Changes Chart',
    description: 'Visual reference for secondary skin changes and their significance',
    domain: 'medicine',
    promptTemplate: `Create a secondary lesion reference chart:

Focus Areas: {{focusAreas}}

Include secondary changes:
- Scale (desquamation types)
- Crust (dried exudate)
- Erosion (superficial loss)
- Ulcer (deeper loss)
- Fissure (linear crack)
- Excoriation (scratching)
- Lichenification (thickening)
- Atrophy (thinning)
- Scar (cicatrix)
- Keloid (overgrown scar)

Show progression from primary to secondary lesions where applicable.`,
    placeholders: ['focusAreas'],
  },
  {
    id: 'derm-distribution-patterns',
    name: 'Rash Distribution Patterns',
    description: 'Body diagram showing common distribution patterns and their differential diagnoses',
    domain: 'medicine',
    promptTemplate: `Create a rash distribution pattern reference:

Patterns to Include: {{patterns}}

Show distribution patterns on body diagram:
1. Photodistributed (sun-exposed areas)
2. Dermatomal (herpes zoster)
3. Flexural (atopic dermatitis)
4. Extensor surfaces (psoriasis)
5. Acral (hands/feet)
6. Truncal (pityriasis rosea, drug eruption)
7. Intertriginous (candidiasis)
8. Seborrheic (scalp, face, chest)

Include differential diagnosis for each pattern.`,
    placeholders: ['patterns'],
  },

  // ===========================================================================
  // SURGICAL PLANNING
  // ===========================================================================
  {
    id: 'derm-mohs-mapping',
    name: 'Mohs Surgery Stage Mapping',
    description: 'Template for documenting Mohs micrographic surgery stages',
    domain: 'medicine',
    promptTemplate: `Create a Mohs surgery mapping template:

Tumor Location: {{location}}
Initial Size: {{size}}
Tumor Type: {{tumorType}}

Include:
1. Anatomical location diagram
2. Initial tumor margins marking
3. Stage 1 tissue map with orientation
4. Positive margin locations
5. Subsequent stage documentation
6. Final defect diagram
7. Reconstruction planning options

Orientation markers and specimen processing notes.`,
    placeholders: ['location', 'size', 'tumorType'],
  },
  {
    id: 'derm-excision-margins',
    name: 'Surgical Excision Margin Guide',
    description: 'Reference for recommended surgical margins by tumor type',
    domain: 'medicine',
    promptTemplate: `Create a surgical margin reference guide:

Tumor Types: {{tumorTypes}}
Location Considerations: {{locations}}

Include margin recommendations:
1. Benign lesions: 1-2mm
2. AK: 2-3mm
3. BCC (low-risk): 4mm
4. BCC (high-risk): 5-10mm or Mohs
5. SCC: 4-6mm
6. Melanoma in situ: 5mm
7. Melanoma <1mm: 1cm
8. Melanoma 1-2mm: 1-2cm
9. Melanoma >2mm: 2cm

Include ellipse design principles (3:1 ratio).`,
    placeholders: ['tumorTypes', 'locations'],
  },

  // ===========================================================================
  // INFECTIOUS DISEASE
  // ===========================================================================
  {
    id: 'derm-fungal-infection-workup',
    name: 'Superficial Fungal Infection Algorithm',
    description: 'Diagnostic and treatment algorithm for dermatophyte infections',
    domain: 'medicine',
    promptTemplate: `Create a superficial fungal infection workup:

Suspected Infection: {{infection}}
Location: {{location}}
Duration: {{duration}}

Include:
1. Clinical presentation patterns
   - Tinea corporis (ringworm)
   - Tinea pedis (athlete's foot)
   - Tinea cruris (jock itch)
   - Tinea capitis (scalp)
   - Onychomycosis (nail)
2. Diagnostic workup
   - KOH preparation
   - Fungal culture
   - Wood's lamp (specific species)
3. Treatment selection
   - Topical antifungals
   - Systemic therapy indications
   - Duration guidelines`,
    placeholders: ['infection', 'location', 'duration'],
  },
  {
    id: 'derm-herpes-management',
    name: 'Herpes Virus Infection Management',
    description: 'Treatment algorithm for HSV and VZV cutaneous infections',
    domain: 'medicine',
    promptTemplate: `Create a herpes virus management algorithm:

Infection Type: {{infectionType}}
Episode: {{episode}}
Immunocompromised: {{immunoStatus}}

Include:
1. HSV-1/HSV-2 (orolabial, genital)
   - Primary vs recurrent
   - Episodic vs suppressive therapy
2. Herpes zoster (shingles)
   - Antiviral timing (<72 hours)
   - Pain management
   - PHN prevention
3. Dosing regimens
4. Special populations (pregnancy, HIV)
5. Vaccination recommendations (Shingrix)`,
    placeholders: ['infectionType', 'episode', 'immunoStatus'],
  },

  // ===========================================================================
  // SPECIAL POPULATIONS
  // ===========================================================================
  {
    id: 'derm-pediatric-rash',
    name: 'Pediatric Exanthems',
    description: 'Diagnostic algorithm for common childhood rashes',
    domain: 'medicine',
    promptTemplate: `Create a pediatric exanthem diagnostic algorithm:

Age: {{age}}
Rash Description: {{rashDescription}}
Associated Symptoms: {{symptoms}}
Vaccination Status: {{vaccinations}}

Include classic exanthems:
1. Measles (rubeola)
2. Rubella (German measles)
3. Varicella (chickenpox)
4. Fifth disease (erythema infectiosum)
5. Roseola (exanthem subitum)
6. Scarlet fever
7. Hand-foot-mouth disease

Differentiate from:
- Drug eruptions
- Kawasaki disease
- Bacterial infections`,
    placeholders: ['age', 'rashDescription', 'symptoms', 'vaccinations'],
  },
  {
    id: 'derm-drug-eruption',
    name: 'Drug Eruption Assessment',
    description: 'Algorithm for evaluating and managing cutaneous drug reactions',
    domain: 'medicine',
    promptTemplate: `Create a drug eruption assessment algorithm:

Rash Morphology: {{morphology}}
Timing of Onset: {{timing}}
Suspect Medications: {{medications}}
Systemic Symptoms: {{systemicSymptoms}}

Classification:
1. Morbilliform (exanthematous)
2. Urticarial
3. Fixed drug eruption
4. SJS/TEN (severe)
5. DRESS syndrome
6. AGEP
7. Photosensitivity

Severity assessment:
- ALDEN score for causality
- SCORTEN for TEN prognosis
- Management based on severity`,
    placeholders: ['morphology', 'timing', 'medications', 'systemicSymptoms'],
  },
];

export default dermatologyTemplates;
