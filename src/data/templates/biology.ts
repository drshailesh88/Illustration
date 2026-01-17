/**
 * biology.ts
 * Biology diagram templates for FINNISH
 *
 * Contains templates for biological pathways, cellular processes,
 * and molecular biology diagrams.
 */

import type { DiagramTemplate } from './index';

/**
 * Cell Signaling Pathway template
 */
export const cellSignalingPathway: DiagramTemplate = {
  id: 'bio-cell-signaling',
  name: 'Cell Signaling Pathway',
  description:
    'Signal transduction pathway showing receptors, messengers, and downstream effects',
  domain: 'biology',
  promptTemplate: `Create a cell signaling pathway diagram:
- Signaling molecule/ligand: {{ligand}}
- Receptor type: {{receptorType}}
- Second messengers: {{secondMessengers}}
- Kinase cascade: {{kinaseCascade}}
- Transcription factors: {{transcriptionFactors}}
- Target genes: {{targetGenes}}
- Cellular responses: {{cellularResponses}}
- Feedback mechanisms: {{feedbackMechanisms}}
{{#inhibitors}}Known inhibitors: {{inhibitors}}{{/inhibitors}}`,
  placeholders: [
    'ligand',
    'receptorType',
    'secondMessengers',
    'kinaseCascade',
    'transcriptionFactors',
    'targetGenes',
    'cellularResponses',
    'feedbackMechanisms',
    'inhibitors',
  ],
  mermaidExample: `flowchart TB
    subgraph extracellular["Extracellular Space"]
        ligand["Growth Factor"]
    end

    subgraph membrane["Cell Membrane"]
        receptor["Receptor Tyrosine Kinase"]
    end

    subgraph cytoplasm["Cytoplasm"]
        ras["Ras-GTP"]
        raf["Raf"]
        mek["MEK"]
        erk["ERK"]
    end

    subgraph nucleus["Nucleus"]
        tf["Transcription Factors<br/>(Elk-1, c-Fos)"]
        genes["Target Gene Expression"]
    end

    ligand -->|binds| receptor
    receptor -->|activates| ras
    ras -->|recruits| raf
    raf -->|phosphorylates| mek
    mek -->|phosphorylates| erk
    erk -->|translocates| tf
    tf -->|activates| genes

    genes -.->|negative feedback| receptor

    classDef extracell fill:#e0f2fe,stroke:#0284c7
    classDef membrane fill:#fef3c7,stroke:#d97706
    classDef cyto fill:#f3e8ff,stroke:#9333ea
    classDef nuc fill:#dcfce7,stroke:#16a34a

    class ligand extracell
    class receptor membrane
    class ras,raf,mek,erk cyto
    class tf,genes nuc`,
};

/**
 * Metabolic Pathway template
 */
export const metabolicPathway: DiagramTemplate = {
  id: 'bio-metabolic-pathway',
  name: 'Metabolic Pathway',
  description:
    'Biochemical pathway showing metabolites, enzymes, and energy flow',
  domain: 'biology',
  promptTemplate: `Create a metabolic pathway diagram:
- Pathway name: {{pathwayName}}
- Initial substrate: {{initialSubstrate}}
- Intermediate metabolites: {{intermediates}}
- Enzymes: {{enzymes}}
- Cofactors required: {{cofactors}}
- ATP/NADH production or consumption: {{energetics}}
- Regulatory points: {{regulatoryPoints}}
- Final products: {{finalProducts}}
- Connections to other pathways: {{connections}}`,
  placeholders: [
    'pathwayName',
    'initialSubstrate',
    'intermediates',
    'enzymes',
    'cofactors',
    'energetics',
    'regulatoryPoints',
    'finalProducts',
    'connections',
  ],
  mermaidExample: `flowchart TB
    subgraph glycolysis["Glycolysis"]
        glucose["Glucose"]
        g6p["Glucose-6-P"]
        f6p["Fructose-6-P"]
        fbp["Fructose-1,6-BP"]
        gap["G3P"]
        pyruvate["Pyruvate"]
    end

    subgraph enzymes["Key Enzymes"]
        e1["Hexokinase"]
        e2["PFK-1"]
        e3["Pyruvate Kinase"]
    end

    subgraph energy["Energy"]
        atp["ATP"]
        nadh["NADH"]
    end

    glucose -->|"Hexokinase<br/>-1 ATP"| g6p
    g6p --> f6p
    f6p -->|"PFK-1<br/>-1 ATP"| fbp
    fbp --> gap
    gap -->|"+2 NADH"| pyruvate
    pyruvate -->|"Pyruvate Kinase<br/>+2 ATP"| atp

    classDef substrate fill:#dbeafe,stroke:#2563eb
    classDef product fill:#dcfce7,stroke:#16a34a
    classDef enzyme fill:#fef3c7,stroke:#d97706

    class glucose,g6p,f6p,fbp,gap substrate
    class pyruvate product
    class e1,e2,e3 enzyme`,
};

/**
 * Gene Expression template
 */
export const geneExpression: DiagramTemplate = {
  id: 'bio-gene-expression',
  name: 'Gene Expression',
  description:
    'Central dogma diagram showing transcription, processing, and translation',
  domain: 'biology',
  promptTemplate: `Create a gene expression diagram:
- Gene name: {{geneName}}
- Promoter elements: {{promoterElements}}
- Transcription factors: {{transcriptionFactors}}
- RNA processing steps: {{rnaProcessing}}
- Regulatory elements (enhancers/silencers): {{regulatoryElements}}
- Translation initiation: {{translationInitiation}}
- Post-translational modifications: {{postTranslational}}
- Protein localization: {{proteinLocalization}}`,
  placeholders: [
    'geneName',
    'promoterElements',
    'transcriptionFactors',
    'rnaProcessing',
    'regulatoryElements',
    'translationInitiation',
    'postTranslational',
    'proteinLocalization',
  ],
  mermaidExample: `flowchart TB
    subgraph nucleus["Nucleus"]
        dna["DNA<br/>Gene Sequence"]
        premrna["Pre-mRNA"]
        mrna["Mature mRNA"]
    end

    subgraph cytoplasm["Cytoplasm"]
        ribosome["Ribosome"]
        protein["Protein"]
        modified["Modified Protein"]
    end

    subgraph destination["Destination"]
        membrane["Membrane"]
        secreted["Secreted"]
        cytosolic["Cytosolic"]
    end

    dna -->|"Transcription<br/>RNA Polymerase II"| premrna
    premrna -->|"Splicing<br/>5' Cap, 3' Poly-A"| mrna
    mrna -->|"Export"| ribosome
    ribosome -->|"Translation"| protein
    protein -->|"Post-translational<br/>modification"| modified
    modified --> membrane
    modified --> secreted
    modified --> cytosolic

    classDef dna fill:#dbeafe,stroke:#2563eb
    classDef rna fill:#fce7f3,stroke:#db2777
    classDef protein fill:#dcfce7,stroke:#16a34a`,
};

/**
 * Protein Structure template
 */
export const proteinStructure: DiagramTemplate = {
  id: 'bio-protein-structure',
  name: 'Protein Structure',
  description:
    'Hierarchical protein structure showing primary through quaternary organization',
  domain: 'biology',
  promptTemplate: `Create a protein structure diagram:
- Protein name: {{proteinName}}
- Primary sequence features: {{primaryFeatures}}
- Secondary structures: {{secondaryStructures}}
- Domains: {{domains}}
- Active sites: {{activeSites}}
- Binding sites: {{bindingSites}}
- Quaternary organization: {{quaternary}}
- Post-translational modifications: {{modifications}}`,
  placeholders: [
    'proteinName',
    'primaryFeatures',
    'secondaryStructures',
    'domains',
    'activeSites',
    'bindingSites',
    'quaternary',
    'modifications',
  ],
  mermaidExample: `flowchart TB
    subgraph primary["Primary Structure"]
        seq["N-terminus --- Amino Acid Sequence --- C-terminus"]
    end

    subgraph secondary["Secondary Structure"]
        helix["Alpha Helices"]
        sheet["Beta Sheets"]
        loop["Loops/Turns"]
    end

    subgraph tertiary["Tertiary Structure"]
        domain1["Catalytic Domain"]
        domain2["Regulatory Domain"]
        domain3["Binding Domain"]
    end

    subgraph quaternary["Quaternary Structure"]
        tetramer["Tetramer Assembly<br/>(4 subunits)"]
    end

    seq --> helix
    seq --> sheet
    seq --> loop
    helix --> domain1
    sheet --> domain2
    loop --> domain3
    domain1 --> tetramer
    domain2 --> tetramer
    domain3 --> tetramer`,
};

/**
 * Phylogenetic Tree template
 */
export const phylogeneticTree: DiagramTemplate = {
  id: 'bio-phylogenetic-tree',
  name: 'Phylogenetic Tree',
  description:
    'Evolutionary tree showing ancestral relationships between species or genes',
  domain: 'biology',
  promptTemplate: `Create a phylogenetic tree:
- Taxa/species to include: {{taxa}}
- Outgroup: {{outgroup}}
- Branch lengths (if applicable): {{branchLengths}}
- Bootstrap values: {{bootstrapValues}}
- Key evolutionary events: {{evolutionaryEvents}}
- Time scale: {{timeScale}}
- Tree style: {{treeStyle}}
{{#annotations}}Annotations: {{annotations}}{{/annotations}}`,
  placeholders: [
    'taxa',
    'outgroup',
    'branchLengths',
    'bootstrapValues',
    'evolutionaryEvents',
    'timeScale',
    'treeStyle',
    'annotations',
  ],
  mermaidExample: `flowchart TB
    ancestor["Common Ancestor"]

    node1["Node 1<br/>(95%)"]
    node2["Node 2<br/>(87%)"]
    node3["Node 3<br/>(99%)"]

    sp1["Species A<br/><i>Homo sapiens</i>"]
    sp2["Species B<br/><i>Pan troglodytes</i>"]
    sp3["Species C<br/><i>Gorilla gorilla</i>"]
    sp4["Species D<br/><i>Pongo pygmaeus</i>"]
    sp5["Outgroup<br/><i>Macaca mulatta</i>"]

    ancestor --> node1
    ancestor --> sp5
    node1 --> node2
    node1 --> sp4
    node2 --> node3
    node2 --> sp3
    node3 --> sp1
    node3 --> sp2

    classDef ancestor fill:#f3e8ff,stroke:#9333ea
    classDef node fill:#fef3c7,stroke:#d97706
    classDef species fill:#dcfce7,stroke:#16a34a
    classDef outgroup fill:#fee2e2,stroke:#dc2626

    class ancestor ancestor
    class node1,node2,node3 node
    class sp1,sp2,sp3,sp4 species
    class sp5 outgroup`,
};

/**
 * Food Web template
 */
export const foodWeb: DiagramTemplate = {
  id: 'bio-food-web',
  name: 'Food Web',
  description:
    'Ecological food web showing trophic relationships between organisms',
  domain: 'biology',
  promptTemplate: `Create a food web diagram:
- Ecosystem type: {{ecosystemType}}
- Primary producers: {{producers}}
- Primary consumers (herbivores): {{primaryConsumers}}
- Secondary consumers: {{secondaryConsumers}}
- Tertiary consumers: {{tertiaryConsumers}}
- Apex predators: {{apexPredators}}
- Decomposers: {{decomposers}}
- Energy flow direction: {{energyFlow}}`,
  placeholders: [
    'ecosystemType',
    'producers',
    'primaryConsumers',
    'secondaryConsumers',
    'tertiaryConsumers',
    'apexPredators',
    'decomposers',
    'energyFlow',
  ],
  mermaidExample: `flowchart TB
    subgraph producers["Primary Producers"]
        grass["Grass"]
        algae["Algae"]
        trees["Trees"]
    end

    subgraph primary["Primary Consumers"]
        rabbit["Rabbit"]
        deer["Deer"]
        insects["Insects"]
    end

    subgraph secondary["Secondary Consumers"]
        fox["Fox"]
        snake["Snake"]
        frog["Frog"]
    end

    subgraph tertiary["Tertiary Consumers"]
        hawk["Hawk"]
        owl["Owl"]
    end

    subgraph decomp["Decomposers"]
        bacteria["Bacteria"]
        fungi["Fungi"]
    end

    grass --> rabbit
    grass --> deer
    grass --> insects
    trees --> insects
    algae --> insects

    rabbit --> fox
    rabbit --> hawk
    deer --> fox
    insects --> frog
    insects --> snake

    frog --> snake
    frog --> owl
    snake --> hawk
    fox --> hawk

    hawk -.-> decomp
    all -.-> decomp
    decomp -.-> producers`,
};

/**
 * Cell Cycle template
 */
export const cellCycle: DiagramTemplate = {
  id: 'bio-cell-cycle',
  name: 'Cell Cycle',
  description:
    'Cell division cycle showing phases, checkpoints, and regulatory proteins',
  domain: 'biology',
  promptTemplate: `Create a cell cycle diagram:
- Cell type: {{cellType}}
- G1 phase details: {{g1Phase}}
- S phase details: {{sPhase}}
- G2 phase details: {{g2Phase}}
- M phase (mitosis) stages: {{mPhase}}
- Checkpoints: {{checkpoints}}
- Cyclin-CDK complexes: {{cyclinCDK}}
- Regulatory proteins: {{regulatoryProteins}}
- Duration estimates: {{duration}}`,
  placeholders: [
    'cellType',
    'g1Phase',
    'sPhase',
    'g2Phase',
    'mPhase',
    'checkpoints',
    'cyclinCDK',
    'regulatoryProteins',
    'duration',
  ],
  mermaidExample: `flowchart TB
    subgraph interphase["Interphase"]
        g1["G1 Phase<br/>Cell Growth<br/>(Cyclin D-CDK4/6)"]
        s["S Phase<br/>DNA Replication<br/>(Cyclin E/A-CDK2)"]
        g2["G2 Phase<br/>Preparation<br/>(Cyclin A-CDK2)"]
    end

    subgraph mitosis["M Phase"]
        prophase["Prophase"]
        metaphase["Metaphase"]
        anaphase["Anaphase"]
        telophase["Telophase"]
        cytokinesis["Cytokinesis"]
    end

    check1{"G1/S<br/>Checkpoint"}
    check2{"G2/M<br/>Checkpoint"}
    check3{"Spindle<br/>Checkpoint"}

    g1 --> check1
    check1 -->|Pass| s
    s --> g2
    g2 --> check2
    check2 -->|Pass| prophase
    prophase --> metaphase
    metaphase --> check3
    check3 -->|Pass| anaphase
    anaphase --> telophase
    telophase --> cytokinesis
    cytokinesis --> g1

    classDef phase fill:#dbeafe,stroke:#2563eb
    classDef checkpoint fill:#fee2e2,stroke:#dc2626
    classDef mitotic fill:#dcfce7,stroke:#16a34a

    class g1,s,g2 phase
    class check1,check2,check3 checkpoint
    class prophase,metaphase,anaphase,telophase,cytokinesis mitotic`,
};

/**
 * All biology templates exported as an array
 */
export const biologyTemplates: DiagramTemplate[] = [
  cellSignalingPathway,
  metabolicPathway,
  geneExpression,
  proteinStructure,
  phylogeneticTree,
  foodWeb,
  cellCycle,
];
