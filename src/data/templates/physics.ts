/**
 * physics.ts
 * Physics diagram templates for FINNISH
 *
 * Contains templates for mechanics, circuits, waves,
 * optics, and energy systems.
 */

import type { DiagramTemplate } from './index';

/**
 * Force Diagram (Free Body Diagram) template
 */
export const forceDiagram: DiagramTemplate = {
  id: 'phys-force-diagram',
  name: 'Force Diagram',
  description:
    'Free body diagram showing all forces acting on an object with vectors',
  domain: 'physics',
  promptTemplate: `Create a free body diagram:
- Object/body: {{object}}
- Applied forces: {{appliedForces}}
- Gravitational force (weight): {{weight}}
- Normal force: {{normalForce}}
- Friction force: {{frictionForce}}
- Tension forces: {{tensionForces}}
- Other forces: {{otherForces}}
- Reference frame/coordinate system: {{referenceFrame}}
- Acceleration: {{acceleration}}
- Angle of incline (if applicable): {{inclineAngle}}`,
  placeholders: [
    'object',
    'appliedForces',
    'weight',
    'normalForce',
    'frictionForce',
    'tensionForces',
    'otherForces',
    'referenceFrame',
    'acceleration',
    'inclineAngle',
  ],
  mermaidExample: `flowchart TB
    subgraph fbd["Free Body Diagram"]
        object["Block<br/>(mass m)"]
    end

    subgraph forces["Forces"]
        weight["W = mg<br/>↓ Weight"]
        normal["N<br/>↑ Normal Force"]
        friction["f = μN<br/>← Friction"]
        applied["F<br/>→ Applied Force"]
    end

    subgraph equations["Equations"]
        eq1["ΣFx = F - f = ma"]
        eq2["ΣFy = N - mg = 0"]
    end

    weight --> object
    normal --> object
    friction --> object
    applied --> object

    classDef force fill:#fee2e2,stroke:#dc2626
    classDef obj fill:#dbeafe,stroke:#2563eb

    class weight,normal,friction,applied force
    class object obj`,
};

/**
 * Circuit Diagram template
 */
export const circuitDiagram: DiagramTemplate = {
  id: 'phys-circuit-diagram',
  name: 'Circuit Diagram',
  description:
    'Electrical circuit diagram with components and connections',
  domain: 'physics',
  promptTemplate: `Create an electrical circuit diagram:
- Circuit type: {{circuitType}}
- Power source: {{powerSource}}
- Resistors: {{resistors}}
- Capacitors: {{capacitors}}
- Inductors: {{inductors}}
- Switches: {{switches}}
- Other components: {{otherComponents}}
- Series/parallel configuration: {{configuration}}
- Current direction: {{currentDirection}}
- Voltage labels: {{voltageLabels}}
- Ground reference: {{ground}}`,
  placeholders: [
    'circuitType',
    'powerSource',
    'resistors',
    'capacitors',
    'inductors',
    'switches',
    'otherComponents',
    'configuration',
    'currentDirection',
    'voltageLabels',
    'ground',
  ],
  mermaidExample: `flowchart LR
    subgraph source["Power Source"]
        battery["Battery<br/>V = 12V"]
    end

    subgraph series["Series Branch"]
        r1["R1 = 100Ω"]
        r2["R2 = 200Ω"]
    end

    subgraph parallel["Parallel Branch"]
        r3["R3 = 150Ω"]
        r4["R4 = 150Ω"]
    end

    subgraph load["Load"]
        led["LED"]
    end

    battery -->|"I"| r1
    r1 --> r2
    r2 --> r3
    r2 --> r4
    r3 --> led
    r4 --> led
    led --> battery

    classDef source fill:#fef3c7,stroke:#d97706
    classDef resistor fill:#dbeafe,stroke:#2563eb
    classDef load fill:#dcfce7,stroke:#16a34a

    class battery source
    class r1,r2,r3,r4 resistor
    class led load`,
};

/**
 * Wave Diagram template
 */
export const waveDiagram: DiagramTemplate = {
  id: 'phys-wave-diagram',
  name: 'Wave Diagram',
  description:
    'Wave representation showing amplitude, wavelength, and propagation',
  domain: 'physics',
  promptTemplate: `Create a wave diagram:
- Wave type: {{waveType}}
- Amplitude: {{amplitude}}
- Wavelength: {{wavelength}}
- Frequency: {{frequency}}
- Period: {{period}}
- Wave speed: {{waveSpeed}}
- Direction of propagation: {{direction}}
- Medium: {{medium}}
- Phase: {{phase}}
- Interference pattern (if applicable): {{interference}}`,
  placeholders: [
    'waveType',
    'amplitude',
    'wavelength',
    'frequency',
    'period',
    'waveSpeed',
    'direction',
    'medium',
    'phase',
    'interference',
  ],
  mermaidExample: `flowchart TB
    subgraph wave["Wave Properties"]
        direction lateral["Wave Propagation →"]
        crest["Crest<br/>(Maximum)"]
        trough["Trough<br/>(Minimum)"]
        equilibrium["Equilibrium<br/>Line"]
    end

    subgraph measurements["Measurements"]
        amp["Amplitude (A)<br/>= displacement from equilibrium"]
        lambda["Wavelength (λ)<br/>= crest to crest distance"]
        period["Period (T)<br/>= time for one cycle"]
    end

    subgraph equations["Key Equations"]
        eq1["v = fλ"]
        eq2["f = 1/T"]
        eq3["y = A sin(kx - ωt)"]
    end

    crest --> equilibrium
    equilibrium --> trough`,
};

/**
 * Optics Ray Diagram template
 */
export const opticsRayDiagram: DiagramTemplate = {
  id: 'phys-optics-ray',
  name: 'Optics Ray Diagram',
  description:
    'Ray diagram for lenses or mirrors showing image formation',
  domain: 'physics',
  promptTemplate: `Create an optics ray diagram:
- Optical element type: {{elementType}}
- Focal length: {{focalLength}}
- Object distance: {{objectDistance}}
- Object height: {{objectHeight}}
- Principal rays to show: {{principalRays}}
- Image characteristics: {{imageCharacteristics}}
- Magnification: {{magnification}}
- Sign conventions: {{signConventions}}
- Multiple element system: {{multipleElements}}`,
  placeholders: [
    'elementType',
    'focalLength',
    'objectDistance',
    'objectHeight',
    'principalRays',
    'imageCharacteristics',
    'magnification',
    'signConventions',
    'multipleElements',
  ],
  mermaidExample: `flowchart LR
    subgraph object["Object Side"]
        obj["Object<br/>↑<br/>Height h"]
    end

    subgraph lens["Converging Lens"]
        f1["F<br/>(focal point)"]
        center["Optical<br/>Center"]
        f2["F'<br/>(focal point)"]
    end

    subgraph image["Image Side"]
        img["Image<br/>↓<br/>(inverted)"]
    end

    subgraph rays["Principal Rays"]
        ray1["Ray 1: Parallel → through F'"]
        ray2["Ray 2: Through center → straight"]
        ray3["Ray 3: Through F → parallel"]
    end

    obj -->|"Ray 1"| center
    center -->|"converges"| img
    obj -->|"Ray 2"| center
    obj -->|"Ray 3"| center

    classDef object fill:#dbeafe,stroke:#2563eb
    classDef lens fill:#fef3c7,stroke:#d97706
    classDef image fill:#dcfce7,stroke:#16a34a`,
};

/**
 * Energy Level Diagram template
 */
export const energyLevelDiagram: DiagramTemplate = {
  id: 'phys-energy-level',
  name: 'Energy Level Diagram',
  description:
    'Atomic or molecular energy level diagram showing transitions',
  domain: 'physics',
  promptTemplate: `Create an energy level diagram:
- System type: {{systemType}}
- Energy levels: {{energyLevels}}
- Ground state: {{groundState}}
- Excited states: {{excitedStates}}
- Allowed transitions: {{allowedTransitions}}
- Photon energies/wavelengths: {{photonEnergies}}
- Selection rules: {{selectionRules}}
- Degeneracy: {{degeneracy}}
- Fine structure (if applicable): {{fineStructure}}`,
  placeholders: [
    'systemType',
    'energyLevels',
    'groundState',
    'excitedStates',
    'allowedTransitions',
    'photonEnergies',
    'selectionRules',
    'degeneracy',
    'fineStructure',
  ],
  mermaidExample: `flowchart TB
    subgraph levels["Energy Levels (Hydrogen Atom)"]
        n4["n = 4 _____ E = -0.85 eV"]
        n3["n = 3 _____ E = -1.51 eV"]
        n2["n = 2 _____ E = -3.40 eV"]
        n1["n = 1 _____ E = -13.6 eV<br/>(Ground State)"]
    end

    subgraph series["Spectral Series"]
        lyman["Lyman Series<br/>(UV)"]
        balmer["Balmer Series<br/>(Visible)"]
        paschen["Paschen Series<br/>(IR)"]
    end

    n4 -->|"Paschen"| n3
    n3 -->|"Balmer"| n2
    n2 -->|"Lyman"| n1
    n4 -->|"Balmer"| n2
    n3 -->|"Lyman"| n1
    n4 -->|"Lyman"| n1

    classDef ground fill:#dcfce7,stroke:#16a34a
    classDef excited fill:#dbeafe,stroke:#2563eb

    class n1 ground
    class n2,n3,n4 excited`,
};

/**
 * Motion Graph template
 */
export const motionGraph: DiagramTemplate = {
  id: 'phys-motion-graph',
  name: 'Motion Graph',
  description:
    'Kinematics graph showing position, velocity, or acceleration vs time',
  domain: 'physics',
  promptTemplate: `Create a motion graph:
- Graph type: {{graphType}}
- Motion description: {{motionDescription}}
- Initial conditions: {{initialConditions}}
- Time interval: {{timeInterval}}
- Key points/events: {{keyPoints}}
- Slope interpretation: {{slopeInterpretation}}
- Area interpretation: {{areaInterpretation}}
- Equations of motion: {{equations}}
- Multiple objects (if comparing): {{multipleObjects}}`,
  placeholders: [
    'graphType',
    'motionDescription',
    'initialConditions',
    'timeInterval',
    'keyPoints',
    'slopeInterpretation',
    'areaInterpretation',
    'equations',
    'multipleObjects',
  ],
  mermaidExample: `flowchart TB
    subgraph position["Position vs Time"]
        xvt["x(t) curve<br/>Slope = velocity"]
    end

    subgraph velocity["Velocity vs Time"]
        vvt["v(t) curve<br/>Slope = acceleration<br/>Area = displacement"]
    end

    subgraph acceleration["Acceleration vs Time"]
        avt["a(t) curve<br/>Area = change in velocity"]
    end

    subgraph interpretation["Graph Interpretation"]
        slope["Slope of x-t = v"]
        area1["Area under v-t = Δx"]
        slope2["Slope of v-t = a"]
        area2["Area under a-t = Δv"]
    end

    position --> velocity
    velocity --> acceleration

    classDef graph fill:#dbeafe,stroke:#2563eb
    class xvt,vvt,avt graph`,
};

/**
 * All physics templates exported as an array
 */
export const physicsTemplates: DiagramTemplate[] = [
  forceDiagram,
  circuitDiagram,
  waveDiagram,
  opticsRayDiagram,
  energyLevelDiagram,
  motionGraph,
];
