/**
 * biochemistry.ts
 * Biochemistry diagram templates
 *
 * Contains comprehensive templates for biochemistry including:
 * - Metabolic pathways (glycolysis, TCA, oxidative phosphorylation)
 * - Enzyme kinetics and regulation
 * - Signal transduction
 * - Protein structure and function
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// METABOLIC PATHWAYS
// =============================================================================

/**
 * Glycolysis Pathway template
 */
export const glycolysisPathway: DiagramTemplate = {
  id: 'biochem-glycolysis',
  name: 'Glycolysis Pathway',
  description: 'Complete glycolytic pathway with enzymes and regulation',
  domain: 'chemistry',
  promptTemplate: `Create a glycolysis pathway diagram:
- Starting substrate: {{startingSubstrate}}
- Key intermediates: {{intermediates}}
- ATP investment phase: {{atpInvestment}}
- ATP payoff phase: {{atpPayoff}}
- Regulatory enzymes: {{regulatoryEnzymes}}
- Net yield: {{netYield}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'startingSubstrate',
    'intermediates',
    'atpInvestment',
    'atpPayoff',
    'regulatoryEnzymes',
    'netYield',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Glucose"] -->|"Hexokinase -ATP"| B["G6P"]
    B --> C["F6P"]
    C -->|"PFK-1 -ATP"| D["F1,6BP"]
    D --> E["GAP + DHAP"]
    E --> F["Pyruvate"]
    subgraph Yield["Net Yield"]
        G["2 ATP, 2 NADH, 2 Pyruvate"]
    end
    style C fill:#ff6b6b`,
};

/**
 * TCA Cycle template
 */
export const tcaCycle: DiagramTemplate = {
  id: 'biochem-tca-cycle',
  name: 'TCA/Krebs Cycle',
  description: 'Citric acid cycle with intermediates and products',
  domain: 'chemistry',
  promptTemplate: `Create a TCA cycle diagram:
- Entry point: {{entryPoint}}
- Cycle intermediates: {{intermediates}}
- NADH production: {{nadhProduction}}
- FADH2 production: {{fadh2Production}}
- GTP production: {{gtpProduction}}
- Regulatory points: {{regulation}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'entryPoint',
    'intermediates',
    'nadhProduction',
    'fadh2Production',
    'gtpProduction',
    'regulation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Acetyl-CoA"] --> B["Citrate"]
    B --> C["Isocitrate"]
    C -->|"NADH"| D["α-KG"]
    D -->|"NADH"| E["Succinyl-CoA"]
    E -->|"GTP"| F["Succinate"]
    F -->|"FADH2"| G["Fumarate"]
    G --> H["Malate"]
    H -->|"NADH"| I["OAA"]
    I --> A
    style A fill:#4ecdc4`,
};

/**
 * Electron Transport Chain template
 */
export const electronTransportChain: DiagramTemplate = {
  id: 'biochem-etc',
  name: 'Electron Transport Chain',
  description: 'Oxidative phosphorylation and ATP synthesis',
  domain: 'chemistry',
  promptTemplate: `Create an electron transport chain diagram:
- Complex I function: {{complexI}}
- Complex II function: {{complexII}}
- Complex III function: {{complexIII}}
- Complex IV function: {{complexIV}}
- ATP synthase: {{atpSynthase}}
- Proton gradient: {{protonGradient}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'complexI',
    'complexII',
    'complexIII',
    'complexIV',
    'atpSynthase',
    'protonGradient',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["NADH"] --> B["Complex I"]
    B -->|"e-"| C["CoQ"]
    C --> D["Complex III"]
    D -->|"e-"| E["Cyt c"]
    E --> F["Complex IV"]
    F --> G["O2 → H2O"]
    subgraph Proton["H+ Gradient"]
        H["Drives ATP Synthase"]
    end`,
};

/**
 * Beta Oxidation template
 */
export const betaOxidation: DiagramTemplate = {
  id: 'biochem-beta-oxidation',
  name: 'Fatty Acid Beta Oxidation',
  description: 'Fatty acid catabolism in mitochondria',
  domain: 'chemistry',
  promptTemplate: `Create a beta oxidation diagram:
- Fatty acid activation: {{activation}}
- Transport (carnitine shuttle): {{transport}}
- Oxidation steps: {{oxidationSteps}}
- Products per cycle: {{productsPerCycle}}
- Total ATP yield: {{atpYield}}
- Regulation: {{regulation}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'activation',
    'transport',
    'oxidationSteps',
    'productsPerCycle',
    'atpYield',
    'regulation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["FA-CoA"] --> B["Acyl-CoA Dehydrogenase"]
    B -->|"FADH2"| C["Enoyl-CoA"]
    C --> D["Hydratase"]
    D --> E["β-Hydroxyacyl-CoA"]
    E -->|"NADH"| F["β-Ketoacyl-CoA"]
    F --> G["Thiolase"]
    G --> H["Acetyl-CoA + Shortened FA"]`,
};

// =============================================================================
// ENZYME KINETICS
// =============================================================================

/**
 * Michaelis-Menten Kinetics template
 */
export const michaelisMenten: DiagramTemplate = {
  id: 'biochem-michaelis-menten',
  name: 'Michaelis-Menten Kinetics',
  description: 'Enzyme kinetics analysis with Km and Vmax',
  domain: 'chemistry',
  promptTemplate: `Create a Michaelis-Menten kinetics diagram:
- Enzyme: {{enzyme}}
- Substrate: {{substrate}}
- Km value: {{kmValue}}
- Vmax value: {{vmaxValue}}
- Catalytic efficiency: {{catalyticEfficiency}}
- Kinetic mechanism: {{mechanism}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'enzyme',
    'substrate',
    'kmValue',
    'vmaxValue',
    'catalyticEfficiency',
    'mechanism',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Equation["Michaelis-Menten"]
        A["v = Vmax[S]/(Km + [S])"]
    end
    subgraph Parameters
        B["Km = [S] at v = Vmax/2"]
        C["kcat = Vmax/[E]T"]
        D["kcat/Km = Catalytic efficiency"]
    end`,
};

/**
 * Enzyme Inhibition template
 */
export const enzymeInhibition: DiagramTemplate = {
  id: 'biochem-enzyme-inhibition',
  name: 'Enzyme Inhibition',
  description: 'Competitive, noncompetitive, and uncompetitive inhibition',
  domain: 'chemistry',
  promptTemplate: `Create an enzyme inhibition diagram:
- Inhibition type: {{inhibitionType}}
- Inhibitor: {{inhibitor}}
- Effect on Km: {{kmEffect}}
- Effect on Vmax: {{vmaxEffect}}
- Ki value: {{kiValue}}
- Lineweaver-Burk pattern: {{lbPattern}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'inhibitionType',
    'inhibitor',
    'kmEffect',
    'vmaxEffect',
    'kiValue',
    'lbPattern',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Competitive["Competitive"]
        A["Km increases, Vmax same"]
    end
    subgraph NonComp["Noncompetitive"]
        B["Km same, Vmax decreases"]
    end
    subgraph UnComp["Uncompetitive"]
        C["Both Km and Vmax decrease"]
    end`,
};

/**
 * Allosteric Regulation template
 */
export const allostericRegulation: DiagramTemplate = {
  id: 'biochem-allosteric',
  name: 'Allosteric Enzyme Regulation',
  description: 'Cooperativity and allosteric effectors',
  domain: 'chemistry',
  promptTemplate: `Create an allosteric regulation diagram:
- Enzyme: {{enzyme}}
- Allosteric effector: {{effector}}
- Effect type: {{effectType}}
- Hill coefficient: {{hillCoefficient}}
- T and R states: {{tAndRStates}}
- Physiological significance: {{significance}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'enzyme',
    'effector',
    'effectType',
    'hillCoefficient',
    'tAndRStates',
    'significance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    A["T State (Tense)"] <-->|"Equilibrium"| B["R State (Relaxed)"]
    C["Activator"] -->|"Stabilizes"| B
    D["Inhibitor"] -->|"Stabilizes"| A
    style A fill:#ff6b6b
    style B fill:#4ecdc4`,
};

// =============================================================================
// SIGNAL TRANSDUCTION
// =============================================================================

/**
 * GPCR Signaling template
 */
export const gpcrSignaling: DiagramTemplate = {
  id: 'biochem-gpcr-signaling',
  name: 'GPCR Signal Transduction',
  description: 'G protein-coupled receptor signaling cascade',
  domain: 'chemistry',
  promptTemplate: `Create a GPCR signaling diagram:
- Receptor: {{receptor}}
- Ligand: {{ligand}}
- G protein type: {{gProtein}}
- Second messenger: {{secondMessenger}}
- Effector enzyme: {{effectorEnzyme}}
- Cellular response: {{cellularResponse}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'receptor',
    'ligand',
    'gProtein',
    'secondMessenger',
    'effectorEnzyme',
    'cellularResponse',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Ligand"] --> B["GPCR"]
    B --> C["G protein activation"]
    C --> D["Adenylyl Cyclase"]
    D --> E["cAMP"]
    E --> F["PKA"]
    F --> G["Cellular Response"]
    style E fill:#ffd93d`,
};

/**
 * Receptor Tyrosine Kinase template
 */
export const rtkSignaling: DiagramTemplate = {
  id: 'biochem-rtk-signaling',
  name: 'RTK Signaling Pathway',
  description: 'Receptor tyrosine kinase and MAPK cascade',
  domain: 'chemistry',
  promptTemplate: `Create an RTK signaling diagram:
- Growth factor: {{growthFactor}}
- Receptor: {{receptor}}
- Adaptor proteins: {{adaptors}}
- Ras activation: {{rasActivation}}
- MAPK cascade: {{mapkCascade}}
- Transcription factors: {{transcriptionFactors}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'growthFactor',
    'receptor',
    'adaptors',
    'rasActivation',
    'mapkCascade',
    'transcriptionFactors',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Growth Factor"] --> B["RTK Dimerization"]
    B --> C["Autophosphorylation"]
    C --> D["Grb2-SOS"]
    D --> E["Ras-GTP"]
    E --> F["Raf → MEK → ERK"]
    F --> G["Gene Expression"]`,
};

// =============================================================================
// PROTEIN STRUCTURE
// =============================================================================

/**
 * Protein Folding template
 */
export const proteinFolding: DiagramTemplate = {
  id: 'biochem-protein-folding',
  name: 'Protein Folding Pathway',
  description: 'Protein folding from primary to quaternary structure',
  domain: 'chemistry',
  promptTemplate: `Create a protein folding diagram:
- Primary sequence: {{primarySequence}}
- Secondary structures: {{secondaryStructures}}
- Tertiary folding: {{tertiaryFolding}}
- Quaternary assembly: {{quaternaryAssembly}}
- Chaperones involved: {{chaperones}}
- Misfolding diseases: {{misfoldingDiseases}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'primarySequence',
    'secondaryStructures',
    'tertiaryFolding',
    'quaternaryAssembly',
    'chaperones',
    'misfoldingDiseases',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Primary (sequence)"] --> B["Secondary (α-helix, β-sheet)"]
    B --> C["Tertiary (3D fold)"]
    C --> D["Quaternary (subunits)"]
    E["Chaperones"] -.-> B
    E -.-> C
    style D fill:#4ecdc4`,
};

/**
 * Enzyme Mechanism template
 */
export const enzymeMechanism: DiagramTemplate = {
  id: 'biochem-enzyme-mechanism',
  name: 'Enzyme Catalytic Mechanism',
  description: 'Step-by-step enzyme catalysis mechanism',
  domain: 'chemistry',
  promptTemplate: `Create an enzyme mechanism diagram:
- Enzyme: {{enzyme}}
- Active site residues: {{activeSiteResidues}}
- Substrate binding: {{substrateBinding}}
- Catalytic steps: {{catalyticSteps}}
- Transition state: {{transitionState}}
- Product release: {{productRelease}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'enzyme',
    'activeSiteResidues',
    'substrateBinding',
    'catalyticSteps',
    'transitionState',
    'productRelease',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["E + S"] --> B["ES Complex"]
    B --> C["ES‡ Transition State"]
    C --> D["EP Complex"]
    D --> E["E + P"]
    subgraph Catalysis
        F["Acid-base catalysis"]
        G["Covalent catalysis"]
        H["Metal ion catalysis"]
    end`,
};

// =============================================================================
// NUCLEIC ACIDS
// =============================================================================

/**
 * DNA Replication template
 */
export const dnaReplication: DiagramTemplate = {
  id: 'biochem-dna-replication',
  name: 'DNA Replication',
  description: 'Semiconservative DNA replication mechanism',
  domain: 'chemistry',
  promptTemplate: `Create a DNA replication diagram:
- Origin of replication: {{origin}}
- Helicase function: {{helicase}}
- Leading strand synthesis: {{leadingStrand}}
- Lagging strand synthesis: {{laggingStrand}}
- Okazaki fragments: {{okazakiFragments}}
- Proofreading: {{proofreading}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'origin',
    'helicase',
    'leadingStrand',
    'laggingStrand',
    'okazakiFragments',
    'proofreading',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Origin Recognition"] --> B["Helicase Unwinding"]
    B --> C["Leading Strand (continuous)"]
    B --> D["Lagging Strand (Okazaki)"]
    C --> E["DNA Pol III"]
    D --> F["Primase + DNA Pol III"]
    F --> G["Ligase joins fragments"]`,
};

/**
 * Transcription template
 */
export const transcription: DiagramTemplate = {
  id: 'biochem-transcription',
  name: 'Transcription Process',
  description: 'Gene expression from DNA to mRNA',
  domain: 'chemistry',
  promptTemplate: `Create a transcription diagram:
- Promoter elements: {{promoterElements}}
- Transcription factors: {{transcriptionFactors}}
- RNA polymerase: {{rnaPolymerase}}
- Initiation: {{initiation}}
- Elongation: {{elongation}}
- Termination: {{termination}}
{{#additionalNotes}}Additional notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'promoterElements',
    'transcriptionFactors',
    'rnaPolymerase',
    'initiation',
    'elongation',
    'termination',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    A["Promoter (TATA box)"] --> B["TF Binding"]
    B --> C["RNA Pol II Recruitment"]
    C --> D["Initiation"]
    D --> E["Elongation (5'→3')"]
    E --> F["Termination"]
    F --> G["pre-mRNA"]`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All biochemistry templates
 */
export const biochemistryTemplates: DiagramTemplate[] = [
  // Metabolic Pathways
  glycolysisPathway,
  tcaCycle,
  electronTransportChain,
  betaOxidation,
  // Enzyme Kinetics
  michaelisMenten,
  enzymeInhibition,
  allostericRegulation,
  // Signal Transduction
  gpcrSignaling,
  rtkSignaling,
  // Protein Structure
  proteinFolding,
  enzymeMechanism,
  // Nucleic Acids
  dnaReplication,
  transcription,
];

export default biochemistryTemplates;
