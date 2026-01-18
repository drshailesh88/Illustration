/**
 * electromagnetism.ts
 * Electromagnetism diagram templates for FINNISH
 *
 * Contains comprehensive templates for EM theory including:
 * - Electric and magnetic field diagrams
 * - Maxwell's equations visualizations
 * - Circuit analysis diagrams
 * - Wave propagation
 * - Electromagnetic devices
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// ELECTRIC FIELD TEMPLATES
// =============================================================================

/**
 * Electric Field Lines template
 */
export const electricFieldLines: DiagramTemplate = {
  id: 'em-electric-field-lines',
  name: 'Electric Field Lines',
  description: 'Field line patterns for various charge configurations',
  domain: 'physics',
  promptTemplate: `Create an electric field lines diagram:
- Charge configuration: {{chargeConfiguration}}
- Field line density: {{fieldLineDensity}}
- Equipotential surfaces: {{equipotentials}}
- Field strength indication: {{fieldStrength}}
- Boundary conditions: {{boundaryConditions}}
- Symmetry: {{symmetry}}
{{#additionalNotes}}Additional details: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'chargeConfiguration',
    'fieldLineDensity',
    'equipotentials',
    'fieldStrength',
    'boundaryConditions',
    'symmetry',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Charges["Charge Configuration"]
        POS["+q: Source"]
        NEG["-q: Sink"]
    end
    subgraph Field["Field Lines"]
        F["E = kq/r²"]
    end
    POS -->|"Radially outward"| F
    F -->|"Radially inward"| NEG`,
};

/**
 * Gauss's Law Application template
 */
export const gaussLaw: DiagramTemplate = {
  id: 'em-gauss-law',
  name: 'Gauss Law Application',
  description: 'Gaussian surface analysis for electric field calculation',
  domain: 'physics',
  promptTemplate: `Create a Gauss's law diagram:
- Charge distribution: {{chargeDistribution}}
- Gaussian surface shape: {{gaussianSurface}}
- Symmetry exploited: {{symmetryExploited}}
- Electric flux: {{electricFlux}}
- Enclosed charge: {{enclosedCharge}}
- Resulting field: {{resultingField}}
{{#additionalNotes}}Calculation notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'chargeDistribution',
    'gaussianSurface',
    'symmetryExploited',
    'electricFlux',
    'enclosedCharge',
    'resultingField',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Surface["Gaussian Surface"]
        S["∮E·dA"]
    end
    subgraph Charge["Enclosed Charge"]
        Q["Q_enc/ε₀"]
    end
    subgraph Result["E Field"]
        E["E(r)"]
    end
    S -->|"= "| Q --> E`,
};

/**
 * Capacitor Analysis template
 */
export const capacitorAnalysis: DiagramTemplate = {
  id: 'em-capacitor-analysis',
  name: 'Capacitor Analysis',
  description: 'Parallel plate capacitor with dielectric materials',
  domain: 'physics',
  promptTemplate: `Create a capacitor analysis diagram:
- Plate geometry: {{plateGeometry}}
- Plate separation: {{plateSeparation}}
- Dielectric material: {{dielectricMaterial}}
- Capacitance: {{capacitance}}
- Electric field: {{electricField}}
- Energy stored: {{energyStored}}
{{#additionalNotes}}Design notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'plateGeometry',
    'plateSeparation',
    'dielectricMaterial',
    'capacitance',
    'electricField',
    'energyStored',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Capacitor["Parallel Plate"]
        P1["+Q plate"]
        D["Dielectric κ"]
        P2["-Q plate"]
    end
    subgraph Properties["Properties"]
        C["C = κε₀A/d"]
        U["U = ½CV²"]
    end
    P1 --> D --> P2
    Capacitor --> Properties`,
};

// =============================================================================
// MAGNETIC FIELD TEMPLATES
// =============================================================================

/**
 * Magnetic Field Patterns template
 */
export const magneticFieldPatterns: DiagramTemplate = {
  id: 'em-magnetic-field-patterns',
  name: 'Magnetic Field Patterns',
  description: 'Field patterns for currents and magnets',
  domain: 'physics',
  promptTemplate: `Create a magnetic field pattern diagram:
- Source type: {{sourceType}}
- Current/magnetization: {{currentMagnetization}}
- Field line pattern: {{fieldLinePattern}}
- Right-hand rule: {{rightHandRule}}
- Field strength: {{fieldStrength}}
- Applications: {{applications}}
{{#additionalNotes}}Field notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sourceType',
    'currentMagnetization',
    'fieldLinePattern',
    'rightHandRule',
    'fieldStrength',
    'applications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Source["Current Source"]
        I["I through wire"]
    end
    subgraph Field["B Field"]
        B["Concentric circles"]
    end
    subgraph Rule["Right-Hand Rule"]
        R["Thumb: I, Fingers: B"]
    end
    I --> B --> R`,
};

/**
 * Ampere's Law Application template
 */
export const ampereLaw: DiagramTemplate = {
  id: 'em-ampere-law',
  name: 'Ampere Law Application',
  description: 'Amperian loop analysis for magnetic field calculation',
  domain: 'physics',
  promptTemplate: `Create an Ampere's law diagram:
- Current configuration: {{currentConfiguration}}
- Amperian loop shape: {{amperianLoop}}
- Symmetry used: {{symmetryUsed}}
- Line integral: {{lineIntegral}}
- Enclosed current: {{enclosedCurrent}}
- Resulting B field: {{resultingBField}}
{{#additionalNotes}}Calculation notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'currentConfiguration',
    'amperianLoop',
    'symmetryUsed',
    'lineIntegral',
    'enclosedCurrent',
    'resultingBField',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Loop["Amperian Loop"]
        L["∮B·dl"]
    end
    subgraph Current["Enclosed Current"]
        I["μ₀I_enc"]
    end
    subgraph Result["B Field"]
        B["B(r)"]
    end
    L -->|"= "| I --> B`,
};

/**
 * Solenoid and Toroid template
 */
export const solenoidToroid: DiagramTemplate = {
  id: 'em-solenoid-toroid',
  name: 'Solenoid and Toroid Fields',
  description: 'Magnetic field in coil geometries',
  domain: 'physics',
  promptTemplate: `Create a solenoid/toroid field diagram:
- Coil type: {{coilType}}
- Number of turns: {{numberOfTurns}}
- Current: {{current}}
- Core material: {{coreMaterial}}
- Internal field: {{internalField}}
- External field: {{externalField}}
{{#additionalNotes}}Design notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'coilType',
    'numberOfTurns',
    'current',
    'coreMaterial',
    'internalField',
    'externalField',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Solenoid["Solenoid"]
        S["n turns/length"]
        I["Current I"]
    end
    subgraph Field["Field"]
        BIN["B_inside = μ₀nI"]
        BOUT["B_outside ≈ 0"]
    end
    S --> Field
    I --> Field`,
};

// =============================================================================
// ELECTROMAGNETIC INDUCTION TEMPLATES
// =============================================================================

/**
 * Faraday's Law template
 */
export const faradayLaw: DiagramTemplate = {
  id: 'em-faraday-law',
  name: 'Faraday Law of Induction',
  description: 'Electromagnetic induction and induced EMF',
  domain: 'physics',
  promptTemplate: `Create a Faraday's law diagram:
- Changing flux source: {{changingFluxSource}}
- Loop/coil geometry: {{loopGeometry}}
- Rate of flux change: {{fluxChangeRate}}
- Induced EMF: {{inducedEMF}}
- Lenz's law direction: {{lenzDirection}}
- Applications: {{applications}}
{{#additionalNotes}}Induction notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'changingFluxSource',
    'loopGeometry',
    'fluxChangeRate',
    'inducedEMF',
    'lenzDirection',
    'applications',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Flux["Changing Magnetic Flux"]
        F["dΦ_B/dt"]
    end
    subgraph EMF["Induced EMF"]
        E["ε = -dΦ_B/dt"]
    end
    subgraph Current["Induced Current"]
        I["I = ε/R"]
    end
    F --> E --> I`,
};

/**
 * Transformer template
 */
export const transformer: DiagramTemplate = {
  id: 'em-transformer',
  name: 'Transformer Analysis',
  description: 'Mutual induction and voltage transformation',
  domain: 'physics',
  promptTemplate: `Create a transformer diagram:
- Primary turns: {{primaryTurns}}
- Secondary turns: {{secondaryTurns}}
- Core material: {{coreMaterial}}
- Voltage ratio: {{voltageRatio}}
- Current ratio: {{currentRatio}}
- Efficiency: {{efficiency}}
{{#additionalNotes}}Design specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'primaryTurns',
    'secondaryTurns',
    'coreMaterial',
    'voltageRatio',
    'currentRatio',
    'efficiency',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Primary["Primary N₁"]
        V1["V₁"]
        I1["I₁"]
    end
    subgraph Core["Iron Core"]
        M["Mutual Flux Φ"]
    end
    subgraph Secondary["Secondary N₂"]
        V2["V₂ = V₁(N₂/N₁)"]
        I2["I₂ = I₁(N₁/N₂)"]
    end
    Primary --> Core --> Secondary`,
};

// =============================================================================
// CIRCUIT ANALYSIS TEMPLATES
// =============================================================================

/**
 * RC Circuit template
 */
export const rcCircuit: DiagramTemplate = {
  id: 'em-rc-circuit',
  name: 'RC Circuit Analysis',
  description: 'Resistor-capacitor circuit charging and discharging',
  domain: 'physics',
  promptTemplate: `Create an RC circuit diagram:
- Resistance: {{resistance}}
- Capacitance: {{capacitance}}
- Time constant: {{timeConstant}}
- Charging curve: {{chargingCurve}}
- Discharging curve: {{dischargingCurve}}
- Energy analysis: {{energyAnalysis}}
{{#additionalNotes}}Transient notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'resistance',
    'capacitance',
    'timeConstant',
    'chargingCurve',
    'dischargingCurve',
    'energyAnalysis',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Circuit["RC Circuit"]
        V["V source"]
        R["R"]
        C["C"]
    end
    subgraph Response["Time Response"]
        TAU["τ = RC"]
        Q["Q(t) = Q₀(1-e^(-t/τ))"]
    end
    Circuit --> Response`,
};

/**
 * RLC Circuit template
 */
export const rlcCircuit: DiagramTemplate = {
  id: 'em-rlc-circuit',
  name: 'RLC Circuit Resonance',
  description: 'Series and parallel RLC resonance analysis',
  domain: 'physics',
  promptTemplate: `Create an RLC circuit diagram:
- Configuration: {{configuration}}
- Resonance frequency: {{resonanceFrequency}}
- Quality factor: {{qualityFactor}}
- Impedance: {{impedance}}
- Phase angle: {{phaseAngle}}
- Bandwidth: {{bandwidth}}
{{#additionalNotes}}Resonance notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'configuration',
    'resonanceFrequency',
    'qualityFactor',
    'impedance',
    'phaseAngle',
    'bandwidth',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph RLC["Series RLC"]
        R["R"]
        L["L"]
        C["C"]
    end
    subgraph Resonance["At Resonance"]
        F0["f₀ = 1/(2π√LC)"]
        Q["Q = ω₀L/R"]
        Z["Z = R (minimum)"]
    end
    RLC --> Resonance`,
};

/**
 * AC Circuit Phasor template
 */
export const acPhasor: DiagramTemplate = {
  id: 'em-ac-phasor',
  name: 'AC Circuit Phasor Diagram',
  description: 'Phasor representation of AC circuits',
  domain: 'physics',
  promptTemplate: `Create an AC phasor diagram:
- Voltage phasors: {{voltagePhasors}}
- Current phasor: {{currentPhasor}}
- Phase relationships: {{phaseRelationships}}
- Impedance triangle: {{impedanceTriangle}}
- Power factor: {{powerFactor}}
- Complex power: {{complexPower}}
{{#additionalNotes}}AC analysis notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'voltagePhasors',
    'currentPhasor',
    'phaseRelationships',
    'impedanceTriangle',
    'powerFactor',
    'complexPower',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Phasors["Phasor Diagram"]
        VR["V_R (in phase)"]
        VL["V_L (leads 90°)"]
        VC["V_C (lags 90°)"]
    end
    subgraph Total["Total"]
        V["V = √(V_R² + (V_L-V_C)²)"]
    end
    Phasors --> Total`,
};

// =============================================================================
// ELECTROMAGNETIC WAVE TEMPLATES
// =============================================================================

/**
 * EM Wave Propagation template
 */
export const emWavePropagation: DiagramTemplate = {
  id: 'em-wave-propagation',
  name: 'EM Wave Propagation',
  description: 'Electromagnetic wave structure and propagation',
  domain: 'physics',
  promptTemplate: `Create an EM wave propagation diagram:
- Wave direction: {{waveDirection}}
- E field orientation: {{eFieldOrientation}}
- B field orientation: {{bFieldOrientation}}
- Wavelength: {{wavelength}}
- Frequency: {{frequency}}
- Wave speed: {{waveSpeed}}
{{#additionalNotes}}Wave properties: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'waveDirection',
    'eFieldOrientation',
    'bFieldOrientation',
    'wavelength',
    'frequency',
    'waveSpeed',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Wave["EM Wave"]
        E["E field (vertical)"]
        B["B field (horizontal)"]
        K["k direction"]
    end
    subgraph Properties["Properties"]
        C["c = 1/√(ε₀μ₀)"]
        EB["E = cB"]
    end
    Wave --> Properties`,
};

/**
 * Poynting Vector template
 */
export const poyntingVector: DiagramTemplate = {
  id: 'em-poynting-vector',
  name: 'Poynting Vector',
  description: 'Electromagnetic energy flow and intensity',
  domain: 'physics',
  promptTemplate: `Create a Poynting vector diagram:
- E field: {{eField}}
- B field: {{bField}}
- Poynting vector: {{poyntingVector}}
- Intensity: {{intensity}}
- Energy density: {{energyDensity}}
- Power flow: {{powerFlow}}
{{#additionalNotes}}Energy transport notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'eField',
    'bField',
    'poyntingVector',
    'intensity',
    'energyDensity',
    'powerFlow',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Fields["Fields"]
        E["E"]
        B["B"]
    end
    subgraph Poynting["S = (1/μ₀)E×B"]
        S["Energy flux"]
    end
    subgraph Intensity["⟨S⟩ = I"]
        I["Time average"]
    end
    E --> Poynting
    B --> Poynting
    Poynting --> Intensity`,
};

// =============================================================================
// MAXWELL'S EQUATIONS TEMPLATES
// =============================================================================

/**
 * Maxwell's Equations Overview template
 */
export const maxwellEquations: DiagramTemplate = {
  id: 'em-maxwell-equations',
  name: 'Maxwell Equations Overview',
  description: 'Complete set of Maxwell equations in differential form',
  domain: 'physics',
  promptTemplate: `Create a Maxwell's equations diagram:
- Gauss (electric): {{gaussElectric}}
- Gauss (magnetic): {{gaussMagnetic}}
- Faraday: {{faraday}}
- Ampere-Maxwell: {{ampereMaxwell}}
- Physical meanings: {{physicalMeanings}}
- Wave equation derivation: {{waveEquation}}
{{#additionalNotes}}Symmetry notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'gaussElectric',
    'gaussMagnetic',
    'faraday',
    'ampereMaxwell',
    'physicalMeanings',
    'waveEquation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TD
    subgraph Maxwell["Maxwell's Equations"]
        G1["∇·E = ρ/ε₀"]
        G2["∇·B = 0"]
        F["∇×E = -∂B/∂t"]
        AM["∇×B = μ₀J + μ₀ε₀∂E/∂t"]
    end
    subgraph Wave["Wave Equation"]
        W["∇²E = (1/c²)∂²E/∂t²"]
    end
    F --> W
    AM --> W`,
};

/**
 * Displacement Current template
 */
export const displacementCurrent: DiagramTemplate = {
  id: 'em-displacement-current',
  name: 'Displacement Current',
  description: 'Maxwell correction to Ampere law',
  domain: 'physics',
  promptTemplate: `Create a displacement current diagram:
- Capacitor setup: {{capacitorSetup}}
- Changing E field: {{changingEField}}
- Displacement current density: {{displacementCurrentDensity}}
- Continuity of current: {{currentContinuity}}
- Maxwell's addition: {{maxwellAddition}}
- Physical interpretation: {{physicalInterpretation}}
{{#additionalNotes}}Historical notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'capacitorSetup',
    'changingEField',
    'displacementCurrentDensity',
    'currentContinuity',
    'maxwellAddition',
    'physicalInterpretation',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Wire["Wire"]
        I["Conduction I"]
    end
    subgraph Gap["Capacitor Gap"]
        JD["J_D = ε₀∂E/∂t"]
    end
    subgraph Total["Total Current"]
        IT["I + I_D continuous"]
    end
    Wire --> Gap --> Total`,
};

// =============================================================================
// EXPORT ALL TEMPLATES
// =============================================================================

/**
 * All electromagnetism templates
 */
export const electromagnetismTemplates: DiagramTemplate[] = [
  // Electric Fields
  electricFieldLines,
  gaussLaw,
  capacitorAnalysis,
  // Magnetic Fields
  magneticFieldPatterns,
  ampereLaw,
  solenoidToroid,
  // Induction
  faradayLaw,
  transformer,
  // Circuits
  rcCircuit,
  rlcCircuit,
  acPhasor,
  // EM Waves
  emWavePropagation,
  poyntingVector,
  // Maxwell
  maxwellEquations,
  displacementCurrent,
];

export default electromagnetismTemplates;
