/**
 * chemistry.ts
 * Chemistry diagram templates for FINNISH
 *
 * Contains templates for chemical reactions, molecular structures,
 * and thermodynamic diagrams.
 */

import type { DiagramTemplate } from './index';

/**
 * Reaction Mechanism template
 */
export const reactionMechanism: DiagramTemplate = {
  id: 'chem-reaction-mechanism',
  name: 'Reaction Mechanism',
  description:
    'Step-by-step reaction mechanism showing electron movement and intermediates',
  domain: 'chemistry',
  promptTemplate: `Create a reaction mechanism diagram:
- Reaction type: {{reactionType}}
- Starting materials: {{startingMaterials}}
- Reagents/conditions: {{reagentsConditions}}
- Mechanism steps: {{mechanismSteps}}
- Intermediates: {{intermediates}}
- Transition states: {{transitionStates}}
- Products: {{products}}
- Stereochemistry: {{stereochemistry}}
{{#catalysis}}Catalytic cycle: {{catalysis}}{{/catalysis}}`,
  placeholders: [
    'reactionType',
    'startingMaterials',
    'reagentsConditions',
    'mechanismSteps',
    'intermediates',
    'transitionStates',
    'products',
    'stereochemistry',
    'catalysis',
  ],
  mermaidExample: `flowchart LR
    subgraph step1["Step 1: Nucleophilic Attack"]
        sm["R-X<br/>(Substrate)"]
        nu["Nu⁻<br/>(Nucleophile)"]
        ts1["[Nu---R---X]‡<br/>Transition State"]
    end

    subgraph step2["Step 2: Product Formation"]
        prod["Nu-R<br/>(Product)"]
        lg["X⁻<br/>(Leaving Group)"]
    end

    sm --> ts1
    nu --> ts1
    ts1 --> prod
    ts1 --> lg

    classDef substrate fill:#dbeafe,stroke:#2563eb
    classDef ts fill:#fef3c7,stroke:#d97706
    classDef product fill:#dcfce7,stroke:#16a34a

    class sm,nu substrate
    class ts1 ts
    class prod,lg product`,
};

/**
 * Molecular Structure template
 */
export const molecularStructure: DiagramTemplate = {
  id: 'chem-molecular-structure',
  name: 'Molecular Structure',
  description:
    'Molecular structure diagram showing atoms, bonds, and spatial arrangement',
  domain: 'chemistry',
  promptTemplate: `Create a molecular structure diagram:
- Compound name: {{compoundName}}
- Molecular formula: {{molecularFormula}}
- Structural features: {{structuralFeatures}}
- Functional groups: {{functionalGroups}}
- Bond types: {{bondTypes}}
- Stereochemistry: {{stereochemistry}}
- Representation style: {{representationStyle}}
- Highlight specific atoms/groups: {{highlights}}`,
  placeholders: [
    'compoundName',
    'molecularFormula',
    'structuralFeatures',
    'functionalGroups',
    'bondTypes',
    'stereochemistry',
    'representationStyle',
    'highlights',
  ],
};

/**
 * Energy Diagram template (Reaction Coordinate)
 */
export const energyDiagram: DiagramTemplate = {
  id: 'chem-energy-diagram',
  name: 'Energy Diagram',
  description:
    'Reaction coordinate diagram showing energy changes during a chemical reaction',
  domain: 'chemistry',
  promptTemplate: `Create a reaction energy diagram:
- Reaction: {{reaction}}
- Reactant energy level: {{reactantEnergy}}
- Product energy level: {{productEnergy}}
- Activation energy (Ea): {{activationEnergy}}
- Transition state(s): {{transitionStates}}
- Intermediate(s): {{intermediates}}
- Delta H (enthalpy change): {{deltaH}}
- Catalyst effect (if applicable): {{catalystEffect}}
- Temperature dependence: {{temperatureDependence}}`,
  placeholders: [
    'reaction',
    'reactantEnergy',
    'productEnergy',
    'activationEnergy',
    'transitionStates',
    'intermediates',
    'deltaH',
    'catalystEffect',
    'temperatureDependence',
  ],
  mermaidExample: `flowchart TB
    subgraph uncatalyzed["Uncatalyzed Pathway"]
        r1["Reactants<br/>E = 0 kJ/mol"]
        ts1["Transition State<br/>Ea = 75 kJ/mol"]
        p1["Products<br/>ΔH = -30 kJ/mol"]
    end

    subgraph catalyzed["Catalyzed Pathway"]
        r2["Reactants"]
        ts2a["TS1<br/>Ea = 40 kJ/mol"]
        int["Intermediate"]
        ts2b["TS2<br/>Ea = 35 kJ/mol"]
        p2["Products"]
    end

    r1 -->|"Ea = 75"| ts1
    ts1 -->|"ΔH = -30"| p1

    r2 -->|"Ea = 40"| ts2a
    ts2a --> int
    int -->|"Ea = 35"| ts2b
    ts2b --> p2

    note["Catalyst lowers Ea<br/>but doesn't change ΔH"]`,
};

/**
 * Phase Diagram template
 */
export const phaseDiagram: DiagramTemplate = {
  id: 'chem-phase-diagram',
  name: 'Phase Diagram',
  description:
    'Phase diagram showing states of matter as function of temperature and pressure',
  domain: 'chemistry',
  promptTemplate: `Create a phase diagram:
- Substance: {{substance}}
- Triple point (T, P): {{triplePoint}}
- Critical point (T, P): {{criticalPoint}}
- Normal melting point: {{meltingPoint}}
- Normal boiling point: {{boilingPoint}}
- Solid phase regions: {{solidPhases}}
- Special features: {{specialFeatures}}
- Phase transition lines: {{transitionLines}}`,
  placeholders: [
    'substance',
    'triplePoint',
    'criticalPoint',
    'meltingPoint',
    'boilingPoint',
    'solidPhases',
    'specialFeatures',
    'transitionLines',
  ],
  mermaidExample: `flowchart TB
    subgraph diagram["Phase Diagram"]
        solid["SOLID<br/>Region"]
        liquid["LIQUID<br/>Region"]
        gas["GAS<br/>Region"]
        supercrit["Supercritical<br/>Fluid"]
    end

    subgraph points["Key Points"]
        triple["Triple Point<br/>(0.01°C, 611 Pa)"]
        critical["Critical Point<br/>(374°C, 22.1 MPa)"]
    end

    subgraph transitions["Phase Boundaries"]
        melt["Melting/Freezing Line"]
        vap["Vaporization Line"]
        sub["Sublimation Line"]
    end

    solid -->|"melt"| liquid
    liquid -->|"vaporize"| gas
    solid -->|"sublimate"| gas
    liquid -->|"above critical"| supercrit
    gas -->|"above critical"| supercrit`,
};

/**
 * Titration Curve template
 */
export const titrationCurve: DiagramTemplate = {
  id: 'chem-titration-curve',
  name: 'Titration Curve',
  description:
    'pH vs volume curve for acid-base titration with equivalence point',
  domain: 'chemistry',
  promptTemplate: `Create a titration curve diagram:
- Titration type: {{titrationType}}
- Analyte: {{analyte}}
- Titrant: {{titrant}}
- Initial concentration of analyte: {{analyteConcentration}}
- Concentration of titrant: {{titrantConcentration}}
- Initial pH: {{initialPH}}
- Equivalence point(s): {{equivalencePoints}}
- pKa value(s): {{pKaValues}}
- Buffer region: {{bufferRegion}}
- Indicator recommended: {{indicator}}`,
  placeholders: [
    'titrationType',
    'analyte',
    'titrant',
    'analyteConcentration',
    'titrantConcentration',
    'initialPH',
    'equivalencePoints',
    'pKaValues',
    'bufferRegion',
    'indicator',
  ],
  mermaidExample: `flowchart TB
    subgraph curve["Titration Curve Features"]
        initial["Initial pH<br/>(acidic analyte)"]
        buffer["Buffer Region<br/>pH = pKa"]
        halfEq["Half-Equivalence Point<br/>[HA] = [A⁻]"]
        equiv["Equivalence Point<br/>Steep rise"]
        excess["Excess Titrant<br/>Region"]
    end

    subgraph annotations["Key Values"]
        pka["pKa = 4.76<br/>(acetic acid)"]
        equivpH["pH at equiv = 8.72"]
        volume["Veq = 25.0 mL"]
    end

    initial --> buffer
    buffer --> halfEq
    halfEq --> equiv
    equiv --> excess`,
};

/**
 * Electron Configuration template
 */
export const electronConfiguration: DiagramTemplate = {
  id: 'chem-electron-configuration',
  name: 'Electron Configuration',
  description:
    'Orbital diagram showing electron arrangement in atomic orbitals',
  domain: 'chemistry',
  promptTemplate: `Create an electron configuration diagram:
- Element: {{element}}
- Atomic number: {{atomicNumber}}
- Electron configuration notation: {{configNotation}}
- Orbital diagram type: {{orbitalDiagramType}}
- Valence electrons: {{valenceElectrons}}
- Unpaired electrons: {{unpairedElectrons}}
- Oxidation states: {{oxidationStates}}
- Special features (exceptions): {{specialFeatures}}`,
  placeholders: [
    'element',
    'atomicNumber',
    'configNotation',
    'orbitalDiagramType',
    'valenceElectrons',
    'unpairedElectrons',
    'oxidationStates',
    'specialFeatures',
  ],
  mermaidExample: `flowchart TB
    subgraph orbitals["Orbital Energy Levels"]
        s1["1s ↑↓"]
        s2["2s ↑↓"]
        p2["2p ↑↓ ↑↓ ↑↓"]
        s3["3s ↑↓"]
        p3["3p ↑↓ ↑↓ ↑"]
    end

    subgraph info["Configuration Info"]
        element["Chlorine (Cl)"]
        config["1s² 2s² 2p⁶ 3s² 3p⁵"]
        valence["Valence: 7 electrons"]
        unpaired["Unpaired: 1 electron"]
    end

    s1 --> s2
    s2 --> p2
    p2 --> s3
    s3 --> p3

    classDef filled fill:#dcfce7,stroke:#16a34a
    classDef partial fill:#fef3c7,stroke:#d97706

    class s1,s2,p2,s3 filled
    class p3 partial`,
};

/**
 * All chemistry templates exported as an array
 */
export const chemistryTemplates: DiagramTemplate[] = [
  reactionMechanism,
  molecularStructure,
  energyDiagram,
  phaseDiagram,
  titrationCurve,
  electronConfiguration,
];
