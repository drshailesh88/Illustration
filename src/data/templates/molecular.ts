/**
 * molecular.ts
 * Molecular Biology diagram templates for FINNISH
 *
 * Contains comprehensive templates for molecular biology including:
 * - DNA/RNA processes
 * - Protein synthesis and structure
 * - Gene expression and regulation
 * - Laboratory techniques
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// DNA & RNA PROCESSES
// =============================================================================

export const dnaReplicationTemplate: DiagramTemplate = {
  id: 'mol-dna-replication',
  name: 'DNA Replication Diagram',
  description: 'Detailed diagram showing the DNA replication fork with all key enzymes and processes',
  domain: 'biology',
  promptTemplate: `Create a DNA replication diagram showing:
- Replication fork direction: {{forkDirection}}
- Leading strand synthesis: {{leadingStrand}}
- Lagging strand with Okazaki fragments: {{laggingStrand}}
- Key enzymes: {{enzymes}}
- Primer placement: {{primers}}
- 5' to 3' directionality: {{directionality}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['forkDirection', 'leadingStrand', 'laggingStrand', 'enzymes', 'primers', 'directionality', 'additionalNotes'],
  mermaidExample: `flowchart LR
    subgraph Fork["Replication Fork"]
        A["Helicase"] --> B["SSB Proteins"]
        B --> C["Leading Strand"]
        B --> D["Lagging Strand"]
    end
    subgraph Leading["Continuous"]
        C --> E["DNA Pol III"]
    end
    subgraph Lagging["Discontinuous"]
        D --> F["Primase"]
        F --> G["Okazaki Fragments"]
        G --> H["DNA Ligase"]
    end`
};

export const transcriptionTemplate: DiagramTemplate = {
  id: 'mol-transcription',
  name: 'Transcription Process',
  description: 'Diagram showing transcription from DNA to mRNA with all stages',
  domain: 'biology',
  promptTemplate: `Create a transcription diagram showing:
- Promoter region: {{promoter}}
- RNA polymerase binding: {{rnaPolBinding}}
- Template vs coding strand: {{strands}}
- Elongation process: {{elongation}}
- Termination signals: {{termination}}
- mRNA processing: {{processing}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['promoter', 'rnaPolBinding', 'strands', 'elongation', 'termination', 'processing', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Init["Initiation"]
        A["Promoter -35, -10"] --> B["RNAP Binding"]
        B --> C["Open Complex"]
    end
    subgraph Elong["Elongation"]
        C --> D["5' to 3' Synthesis"]
        D --> E["mRNA Chain"]
    end
    subgraph Term["Termination"]
        E --> F["Terminator Sequence"]
        F --> G["Release"]
    end`
};

export const translationTemplate: DiagramTemplate = {
  id: 'mol-translation',
  name: 'Translation Process',
  description: 'Protein synthesis on ribosomes from mRNA to polypeptide',
  domain: 'biology',
  promptTemplate: `Create a translation diagram showing:
- Ribosome structure: {{ribosomeStructure}}
- mRNA with codons: {{mrnaSequence}}
- tRNA with anticodons: {{trnaStructure}}
- A, P, E sites: {{ribosomeSites}}
- Peptide bond formation: {{peptideBond}}
- Elongation cycle: {{elongation}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['ribosomeStructure', 'mrnaSequence', 'trnaStructure', 'ribosomeSites', 'peptideBond', 'elongation', 'additionalNotes'],
  mermaidExample: `flowchart LR
    subgraph Ribosome["Ribosome"]
        E["E Site"] --> P["P Site"] --> A["A Site"]
    end
    mRNA["mRNA 5'...AUG-UUU-GGC...3'"] --> Ribosome
    tRNA["tRNA-AA"] --> A
    P --> Peptide["Growing Polypeptide"]`
};

export const splicingTemplate: DiagramTemplate = {
  id: 'mol-rna-splicing',
  name: 'RNA Splicing Diagram',
  description: 'Pre-mRNA processing showing intron removal and exon joining',
  domain: 'biology',
  promptTemplate: `Create an RNA splicing diagram showing:
- Pre-mRNA structure: {{preMrna}}
- Exons and introns: {{exonsIntrons}}
- Spliceosome assembly: {{spliceosome}}
- Branch point: {{branchPoint}}
- Lariat formation: {{lariat}}
- Mature mRNA: {{matureMrna}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['preMrna', 'exonsIntrons', 'spliceosome', 'branchPoint', 'lariat', 'matureMrna', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Pre-mRNA: E1-I1-E2-I2-E3"] --> B["Spliceosome Assembly"]
    B --> C["Branch Point Attack"]
    C --> D["Lariat Formation"]
    D --> E["Exon Ligation"]
    E --> F["Mature mRNA: E1-E2-E3"]`
};

// =============================================================================
// PROTEIN STRUCTURE
// =============================================================================

export const proteinStructureTemplate: DiagramTemplate = {
  id: 'mol-protein-structure',
  name: 'Protein Structure Levels',
  description: 'Four levels of protein structure from primary to quaternary',
  domain: 'biology',
  promptTemplate: `Create a protein structure diagram showing:
- Primary structure: {{primaryStructure}}
- Secondary structures: {{secondaryStructure}}
- Tertiary folding: {{tertiaryStructure}}
- Quaternary assembly: {{quaternaryStructure}}
- Stabilizing forces: {{stabilizingForces}}
- Example protein: {{exampleProtein}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['primaryStructure', 'secondaryStructure', 'tertiaryStructure', 'quaternaryStructure', 'stabilizingForces', 'exampleProtein', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Primary: AA Sequence"] --> B["Secondary: Alpha Helix, Beta Sheet"]
    B --> C["Tertiary: 3D Folding"]
    C --> D["Quaternary: Multiple Subunits"]
    style A fill:#FF6B6B
    style B fill:#4ECDC4
    style C fill:#45B7D1
    style D fill:#96CEB4`
};

export const enzymeMechanismTemplate: DiagramTemplate = {
  id: 'mol-enzyme-mechanism',
  name: 'Enzyme Mechanism Diagram',
  description: 'Enzyme catalysis showing substrate binding and product release',
  domain: 'biology',
  promptTemplate: `Create an enzyme mechanism diagram showing:
- Enzyme structure: {{enzymeStructure}}
- Active site: {{activeSite}}
- Substrate binding: {{substrateBinding}}
- Transition state: {{transitionState}}
- Product release: {{productRelease}}
- Kinetics (Km, Vmax): {{kinetics}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['enzymeStructure', 'activeSite', 'substrateBinding', 'transitionState', 'productRelease', 'kinetics', 'additionalNotes'],
  mermaidExample: `flowchart LR
    E["E (Enzyme)"] --> ES["E-S Complex"]
    S["S (Substrate)"] --> ES
    ES --> EP["E-P Complex"]
    EP --> E
    EP --> P["P (Product)"]`
};

// =============================================================================
// GENE EXPRESSION & REGULATION
// =============================================================================

export const operonTemplate: DiagramTemplate = {
  id: 'mol-operon-regulation',
  name: 'Operon Regulation Diagram',
  description: 'Bacterial gene regulation showing operon structure and control',
  domain: 'biology',
  promptTemplate: `Create an operon regulation diagram showing:
- Operon type: {{operonType}}
- Promoter and operator: {{promoterOperator}}
- Structural genes: {{structuralGenes}}
- Repressor protein: {{repressor}}
- Inducer/corepressor: {{regulator}}
- Expression states: {{expressionStates}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['operonType', 'promoterOperator', 'structuralGenes', 'repressor', 'regulator', 'expressionStates', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph LacOperon["Lac Operon"]
        P["Promoter"] --> O["Operator"]
        O --> Z["lacZ"]
        Z --> Y["lacY"]
        Y --> A["lacA"]
    end
    R["Repressor"] -->|"No Lactose"| O
    L["Lactose"] -->|"Binds"| R
    style O fill:#FF6B6B`
};

export const crisprTemplate: DiagramTemplate = {
  id: 'mol-crispr-mechanism',
  name: 'CRISPR-Cas9 Mechanism',
  description: 'Gene editing mechanism showing guide RNA and DNA cleavage',
  domain: 'biology',
  promptTemplate: `Create a CRISPR-Cas9 diagram showing:
- Guide RNA design: {{guideRna}}
- PAM sequence: {{pamSequence}}
- Cas9 protein: {{cas9Structure}}
- DNA target: {{dnaTarget}}
- Double-strand break: {{dsBreak}}
- Repair pathways: {{repairPathways}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['guideRna', 'pamSequence', 'cas9Structure', 'dnaTarget', 'dsBreak', 'repairPathways', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["sgRNA + Cas9"] --> B["Target Recognition"]
    B --> C["PAM Binding (NGG)"]
    C --> D["DNA Unwinding"]
    D --> E["Double-Strand Break"]
    E --> F["NHEJ (Knockout)"]
    E --> G["HDR (Knock-in)"]`
};

export const epigeneticsTemplate: DiagramTemplate = {
  id: 'mol-epigenetics',
  name: 'Epigenetic Modifications',
  description: 'Diagram showing DNA methylation and histone modifications',
  domain: 'biology',
  promptTemplate: `Create an epigenetics diagram showing:
- DNA methylation: {{dnaMethylation}}
- Histone modifications: {{histoneModifications}}
- Chromatin states: {{chromatinStates}}
- Writers/erasers/readers: {{modifyingEnzymes}}
- Gene expression effects: {{expressionEffects}}
- Inheritance patterns: {{inheritance}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['dnaMethylation', 'histoneModifications', 'chromatinStates', 'modifyingEnzymes', 'expressionEffects', 'inheritance', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Active["Euchromatin"]
        A["H3K4me3"] --> B["Active Transcription"]
        C["Acetylation"] --> B
    end
    subgraph Inactive["Heterochromatin"]
        D["H3K27me3"] --> E["Silenced"]
        F["DNA Methylation"] --> E
    end`
};

// =============================================================================
// LABORATORY TECHNIQUES
// =============================================================================

export const pcrTemplate: DiagramTemplate = {
  id: 'mol-pcr-process',
  name: 'PCR Amplification',
  description: 'Polymerase chain reaction showing thermal cycling steps',
  domain: 'biology',
  promptTemplate: `Create a PCR diagram showing:
- Initial DNA template: {{template}}
- Primer design: {{primers}}
- Denaturation step: {{denaturation}}
- Annealing step: {{annealing}}
- Extension step: {{extension}}
- Amplification curve: {{amplification}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['template', 'primers', 'denaturation', 'annealing', 'extension', 'amplification', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["1. Denaturation 95C"] --> B["2. Annealing 55C"]
    B --> C["3. Extension 72C"]
    C --> D{"Cycle Complete?"}
    D -->|"No"| A
    D -->|"Yes"| E["2^n Copies"]`
};

export const gelElectrophoresisTemplate: DiagramTemplate = {
  id: 'mol-gel-electrophoresis',
  name: 'Gel Electrophoresis',
  description: 'DNA/protein separation by size using gel matrix',
  domain: 'biology',
  promptTemplate: `Create a gel electrophoresis diagram showing:
- Gel type: {{gelType}}
- Sample loading: {{sampleLoading}}
- Molecular weight ladder: {{ladder}}
- Band migration: {{bandMigration}}
- Detection method: {{detection}}
- Result interpretation: {{interpretation}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['gelType', 'sampleLoading', 'ladder', 'bandMigration', 'detection', 'interpretation', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Gel["Agarose Gel"]
        W1["Well 1: Ladder"]
        W2["Well 2: Sample A"]
        W3["Well 3: Sample B"]
    end
    A["(-) Cathode"] --> Gel
    Gel --> B["(+) Anode"]
    style A fill:#E74C3C
    style B fill:#27AE60`
};

export const westernBlotTemplate: DiagramTemplate = {
  id: 'mol-western-blot',
  name: 'Western Blot Protocol',
  description: 'Protein detection workflow from gel to membrane',
  domain: 'biology',
  promptTemplate: `Create a Western blot diagram showing:
- Sample preparation: {{samplePrep}}
- SDS-PAGE separation: {{sdsPage}}
- Transfer to membrane: {{transfer}}
- Blocking step: {{blocking}}
- Primary antibody: {{primaryAb}}
- Secondary antibody: {{secondaryAb}}
- Detection: {{detection}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['samplePrep', 'sdsPage', 'transfer', 'blocking', 'primaryAb', 'secondaryAb', 'detection', 'additionalNotes'],
  mermaidExample: `flowchart LR
    A["SDS-PAGE"] --> B["Transfer"]
    B --> C["Block"]
    C --> D["1 Ab"]
    D --> E["2 Ab-HRP"]
    E --> F["ECL Detection"]`
};

export const sequencingTemplate: DiagramTemplate = {
  id: 'mol-dna-sequencing',
  name: 'DNA Sequencing Methods',
  description: 'Comparison of Sanger and next-generation sequencing',
  domain: 'biology',
  promptTemplate: `Create a DNA sequencing diagram showing:
- Sequencing method: {{method}}
- Template preparation: {{templatePrep}}
- Sequencing chemistry: {{chemistry}}
- Signal detection: {{detection}}
- Data output: {{dataOutput}}
- Applications: {{applications}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['method', 'templatePrep', 'chemistry', 'detection', 'dataOutput', 'applications', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Sanger["Sanger Sequencing"]
        A["ddNTPs"] --> B["Chain Termination"]
        B --> C["Capillary Electrophoresis"]
    end
    subgraph NGS["Next-Gen Sequencing"]
        D["Library Prep"] --> E["Cluster Generation"]
        E --> F["Sequencing by Synthesis"]
    end`
};

export const cloningTemplate: DiagramTemplate = {
  id: 'mol-molecular-cloning',
  name: 'Molecular Cloning Workflow',
  description: 'Gene cloning from insert preparation to transformation',
  domain: 'biology',
  promptTemplate: `Create a molecular cloning diagram showing:
- Insert preparation: {{insertPrep}}
- Vector selection: {{vector}}
- Restriction digestion: {{restriction}}
- Ligation reaction: {{ligation}}
- Transformation: {{transformation}}
- Colony screening: {{screening}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['insertPrep', 'vector', 'restriction', 'ligation', 'transformation', 'screening', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["PCR Insert"] --> B["Digest"]
    C["Vector"] --> B
    B --> D["Ligate"]
    D --> E["Transform E. coli"]
    E --> F["Select on Amp"]
    F --> G["Screen Colonies"]`
};

// =============================================================================
// CENTRAL DOGMA & PATHWAYS
// =============================================================================

export const centralDogmaTemplate: DiagramTemplate = {
  id: 'mol-central-dogma',
  name: 'Central Dogma of Biology',
  description: 'Flow of genetic information from DNA to RNA to protein',
  domain: 'biology',
  promptTemplate: `Create a central dogma diagram showing:
- DNA replication: {{replication}}
- Transcription: {{transcription}}
- Translation: {{translation}}
- Reverse transcription: {{reverseTranscription}}
- RNA replication: {{rnaReplication}}
- Exceptions: {{exceptions}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['replication', 'transcription', 'translation', 'reverseTranscription', 'rnaReplication', 'exceptions', 'additionalNotes'],
  mermaidExample: `flowchart LR
    DNA -->|"Replication"| DNA
    DNA -->|"Transcription"| RNA
    RNA -->|"Translation"| Protein
    RNA -.->|"Reverse Transcription"| DNA
    RNA -.->|"RNA Replication"| RNA`
};

export const signalTransductionTemplate: DiagramTemplate = {
  id: 'mol-signal-transduction',
  name: 'Signal Transduction Pathway',
  description: 'Cellular signaling cascade from receptor to gene expression',
  domain: 'biology',
  promptTemplate: `Create a signal transduction diagram showing:
- Ligand/receptor: {{ligandReceptor}}
- Second messengers: {{secondMessengers}}
- Kinase cascade: {{kinaseCascade}}
- Transcription factors: {{transcriptionFactors}}
- Target genes: {{targetGenes}}
- Feedback loops: {{feedback}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['ligandReceptor', 'secondMessengers', 'kinaseCascade', 'transcriptionFactors', 'targetGenes', 'feedback', 'additionalNotes'],
  mermaidExample: `flowchart TD
    A["Growth Factor"] --> B["RTK"]
    B --> C["Ras-GTP"]
    C --> D["RAF"]
    D --> E["MEK"]
    E --> F["ERK"]
    F --> G["Transcription Factors"]
    G --> H["Gene Expression"]`
};

export const cellCycleRegulationTemplate: DiagramTemplate = {
  id: 'mol-cell-cycle-regulation',
  name: 'Cell Cycle Regulation',
  description: 'Molecular control of cell cycle by cyclins and CDKs',
  domain: 'biology',
  promptTemplate: `Create a cell cycle regulation diagram showing:
- Cell cycle phases: {{phases}}
- Cyclin-CDK complexes: {{cyclinCdk}}
- Checkpoints: {{checkpoints}}
- Tumor suppressors: {{tumorSuppressors}}
- Oncogenes: {{oncogenes}}
- Apoptosis triggers: {{apoptosis}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['phases', 'cyclinCdk', 'checkpoints', 'tumorSuppressors', 'oncogenes', 'apoptosis', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph G1["G1 Phase"]
        A["Cyclin D-CDK4/6"]
    end
    subgraph S["S Phase"]
        B["Cyclin E/A-CDK2"]
    end
    subgraph G2["G2 Phase"]
        C["Cyclin A-CDK1"]
    end
    subgraph M["M Phase"]
        D["Cyclin B-CDK1"]
    end
    A --> B --> C --> D --> A
    E["p53"] -.->|"Arrest"| A`
};

export const apoptosisPathwayTemplate: DiagramTemplate = {
  id: 'mol-apoptosis-pathway',
  name: 'Apoptosis Signaling',
  description: 'Programmed cell death pathways - intrinsic and extrinsic',
  domain: 'biology',
  promptTemplate: `Create an apoptosis diagram showing:
- Intrinsic pathway: {{intrinsicPathway}}
- Extrinsic pathway: {{extrinsicPathway}}
- Bcl-2 family: {{bcl2Family}}
- Caspase cascade: {{caspaseCascade}}
- Death receptors: {{deathReceptors}}
- Execution phase: {{execution}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: ['intrinsicPathway', 'extrinsicPathway', 'bcl2Family', 'caspaseCascade', 'deathReceptors', 'execution', 'additionalNotes'],
  mermaidExample: `flowchart TD
    subgraph Extrinsic["Extrinsic"]
        A["FasL"] --> B["Fas"]
        B --> C["Caspase-8"]
    end
    subgraph Intrinsic["Intrinsic"]
        D["DNA Damage"] --> E["Bax/Bak"]
        E --> F["Cytochrome c"]
        F --> G["Caspase-9"]
    end
    C --> H["Caspase-3"]
    G --> H
    H --> I["Apoptosis"]`
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

export const molecularTemplates: DiagramTemplate[] = [
  dnaReplicationTemplate,
  transcriptionTemplate,
  translationTemplate,
  splicingTemplate,
  proteinStructureTemplate,
  enzymeMechanismTemplate,
  operonTemplate,
  crisprTemplate,
  epigeneticsTemplate,
  pcrTemplate,
  gelElectrophoresisTemplate,
  westernBlotTemplate,
  sequencingTemplate,
  cloningTemplate,
  centralDogmaTemplate,
  signalTransductionTemplate,
  cellCycleRegulationTemplate,
  apoptosisPathwayTemplate,
];

export default molecularTemplates;
