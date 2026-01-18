/**
 * biomedical.ts
 * Biomedical Engineering diagram templates for FINNISH
 *
 * Contains comprehensive templates for biomedical engineering including:
 * - Medical device design
 * - Imaging systems
 * - Biomechanics
 * - Tissue engineering
 * - Biosensors
 * - Neural engineering
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// MEDICAL DEVICE DESIGN
// =============================================================================

/**
 * Medical Device System template
 */
export const medicalDeviceSystem: DiagramTemplate = {
  id: 'biomed-device-system',
  name: 'Medical Device System Diagram',
  description: 'Medical device architecture with subsystems and interfaces',
  domain: 'engineering',
  promptTemplate: `Create a medical device system diagram:
- Device type: {{deviceType}}
- Sensing subsystem: {{sensingSub}}
- Processing unit: {{processing}}
- User interface: {{userInterface}}
- Power management: {{powerManagement}}
- Communication: {{communication}}
- Safety systems: {{safetySystems}}
{{#additionalNotes}}Regulatory requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'deviceType',
    'sensingSub',
    'processing',
    'userInterface',
    'powerManagement',
    'communication',
    'safetySystems',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Device["Medical Device"]
        SN["Sensors"]
        SP["Signal\\nProcessing"]
        MC["Microcontroller"]
        UI["User\\nInterface"]
        PW["Power\\nManagement"]
    end
    subgraph Safety["Safety"]
        AL["Alarms"]
        FD["Fault\\nDetection"]
    end
    SN --> SP --> MC
    MC --> UI
    PW --> MC
    MC --> AL
    MC --> FD
    style MC fill:#10b981,color:#fff
    style AL fill:#dc2626,color:#fff`,
};

/**
 * Prosthetic Design template
 */
export const prostheticDesign: DiagramTemplate = {
  id: 'biomed-prosthetic',
  name: 'Prosthetic Device Design',
  description: 'Prosthetic limb design with control and actuation systems',
  domain: 'engineering',
  promptTemplate: `Create a prosthetic design diagram:
- Prosthetic type: {{prostheticType}}
- Socket design: {{socketDesign}}
- Control system: {{controlSystem}}
- Actuators: {{actuators}}
- Sensors: {{sensors}}
- Power source: {{powerSource}}
- Materials: {{materials}}
{{#additionalNotes}}Biomechanical considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'prostheticType',
    'socketDesign',
    'controlSystem',
    'actuators',
    'sensors',
    'powerSource',
    'materials',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Interface["User Interface"]
        SK["Socket"]
        EMG["EMG\\nSensors"]
    end
    subgraph Control["Control System"]
        MC["Controller"]
        ML["ML\\nAlgorithm"]
    end
    subgraph Actuation["Actuation"]
        MT["Motors"]
        HD["Hand\\nMechanism"]
    end
    EMG --> MC --> ML
    ML --> MT --> HD
    SK --> EMG
    style ML fill:#10b981,color:#fff
    style HD fill:#3b82f6,color:#fff`,
};

/**
 * Cardiac Pacemaker Design template
 */
export const pacemakerDesign: DiagramTemplate = {
  id: 'biomed-pacemaker',
  name: 'Cardiac Pacemaker Design',
  description: 'Implantable pacemaker system architecture',
  domain: 'engineering',
  promptTemplate: `Create a pacemaker design diagram:
- Pacing mode: {{pacingMode}}
- Sensing circuits: {{sensingCircuits}}
- Pulse generator: {{pulseGenerator}}
- Lead system: {{leadSystem}}
- Battery technology: {{battery}}
- Telemetry: {{telemetry}}
- Rate response: {{rateResponse}}
{{#additionalNotes}}Clinical parameters: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pacingMode',
    'sensingCircuits',
    'pulseGenerator',
    'leadSystem',
    'battery',
    'telemetry',
    'rateResponse',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Heart["Cardiac Interface"]
        RA["RA Lead"]
        RV["RV Lead"]
    end
    subgraph Device["Pacemaker"]
        SN["Sensing"]
        PG["Pulse\\nGenerator"]
        TM["Telemetry"]
        BT["Battery"]
    end
    subgraph External["External"]
        PR["Programmer"]
    end
    RA --> SN
    RV --> SN
    SN --> PG
    PG --> RA & RV
    BT --> PG
    TM <--> PR
    style PG fill:#dc2626,color:#fff
    style SN fill:#3b82f6,color:#fff`,
};

/**
 * Insulin Pump System template
 */
export const insulinPumpSystem: DiagramTemplate = {
  id: 'biomed-insulin-pump',
  name: 'Insulin Pump System Design',
  description: 'Automated insulin delivery system architecture',
  domain: 'engineering',
  promptTemplate: `Create an insulin pump system diagram:
- Pump mechanism: {{pumpMechanism}}
- Glucose monitoring: {{glucoseMonitoring}}
- Control algorithm: {{controlAlgorithm}}
- Reservoir system: {{reservoir}}
- Infusion set: {{infusionSet}}
- User interface: {{userInterface}}
- Safety features: {{safetyFeatures}}
{{#additionalNotes}}Dosing parameters: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pumpMechanism',
    'glucoseMonitoring',
    'controlAlgorithm',
    'reservoir',
    'infusionSet',
    'userInterface',
    'safetyFeatures',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Sensing["Glucose Sensing"]
        CGM["CGM\\nSensor"]
    end
    subgraph Control["Control System"]
        AL["Control\\nAlgorithm"]
        UI["User\\nInterface"]
    end
    subgraph Delivery["Insulin Delivery"]
        RS["Reservoir"]
        PM["Pump\\nMotor"]
        IF["Infusion\\nSet"]
    end
    CGM --> AL
    AL --> PM
    UI --> AL
    RS --> PM --> IF
    style AL fill:#10b981,color:#fff
    style CGM fill:#3b82f6,color:#fff`,
};

// =============================================================================
// MEDICAL IMAGING
// =============================================================================

/**
 * MRI System Architecture template
 */
export const mriSystemArchitecture: DiagramTemplate = {
  id: 'biomed-mri-system',
  name: 'MRI System Architecture',
  description: 'Magnetic resonance imaging system components and signal flow',
  domain: 'engineering',
  promptTemplate: `Create an MRI system architecture diagram:
- Magnet system: {{magnetSystem}}
- Gradient system: {{gradientSystem}}
- RF system: {{rfSystem}}
- Receiver coils: {{receiverCoils}}
- Computer system: {{computerSystem}}
- Image reconstruction: {{imageReconstruction}}
- Patient handling: {{patientHandling}}
{{#additionalNotes}}Imaging parameters: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'magnetSystem',
    'gradientSystem',
    'rfSystem',
    'receiverCoils',
    'computerSystem',
    'imageReconstruction',
    'patientHandling',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Magnet["Magnet System"]
        SM["Superconducting\\nMagnet 3T"]
        GC["Gradient\\nCoils"]
        RF["RF Coils"]
    end
    subgraph Electronics["Electronics"]
        GA["Gradient\\nAmplifiers"]
        RA["RF\\nAmplifier"]
        RX["Receiver"]
    end
    subgraph Processing["Processing"]
        ADC["ADC"]
        RC["Reconstruction"]
        DIS["Display"]
    end
    GC --> GA
    RF --> RA
    RF --> RX --> ADC --> RC --> DIS
    style SM fill:#3b82f6,color:#fff
    style RC fill:#10b981,color:#fff`,
};

/**
 * Ultrasound System template
 */
export const ultrasoundSystem: DiagramTemplate = {
  id: 'biomed-ultrasound',
  name: 'Ultrasound System Design',
  description: 'Diagnostic ultrasound imaging system architecture',
  domain: 'engineering',
  promptTemplate: `Create an ultrasound system design diagram:
- Transducer type: {{transducerType}}
- Beamforming: {{beamforming}}
- Signal processing: {{signalProcessing}}
- Imaging modes: {{imagingModes}}
- Doppler processing: {{dopplerProcessing}}
- Display system: {{displaySystem}}
- System control: {{systemControl}}
{{#additionalNotes}}Clinical applications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'transducerType',
    'beamforming',
    'signalProcessing',
    'imagingModes',
    'dopplerProcessing',
    'displaySystem',
    'systemControl',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Probe["Transducer"]
        TX["Transmit"]
        RX["Receive"]
        PA["Phased\\nArray"]
    end
    subgraph Processing["Signal Processing"]
        BF["Beamformer"]
        SP["Signal\\nProcessor"]
        DP["Doppler"]
    end
    subgraph Output["Display"]
        SC["Scan\\nConverter"]
        DIS["Display"]
    end
    TX --> PA
    PA --> RX --> BF --> SP
    SP --> DP
    SP --> SC --> DIS
    style BF fill:#3b82f6,color:#fff
    style PA fill:#10b981,color:#fff`,
};

/**
 * CT Scanner System template
 */
export const ctScannerSystem: DiagramTemplate = {
  id: 'biomed-ct-scanner',
  name: 'CT Scanner System Design',
  description: 'Computed tomography scanner architecture',
  domain: 'engineering',
  promptTemplate: `Create a CT scanner system design diagram:
- X-ray source: {{xraySource}}
- Detector array: {{detectorArray}}
- Gantry system: {{gantrySystem}}
- Data acquisition: {{dataAcquisition}}
- Reconstruction algorithm: {{reconstruction}}
- Patient table: {{patientTable}}
- Dose management: {{doseManagement}}
{{#additionalNotes}}Scanning protocols: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'xraySource',
    'detectorArray',
    'gantrySystem',
    'dataAcquisition',
    'reconstruction',
    'patientTable',
    'doseManagement',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Gantry["Rotating Gantry"]
        XR["X-ray\\nTube"]
        DT["Detector\\nArray"]
    end
    subgraph Acquisition["Data Acquisition"]
        DA["DAS"]
        ADC["ADC"]
    end
    subgraph Recon["Reconstruction"]
        FP["Filtered Back\\nProjection"]
        GPU["GPU\\nProcessing"]
        IM["3D Image"]
    end
    XR --> DT --> DA --> ADC
    ADC --> FP --> GPU --> IM
    style XR fill:#dc2626,color:#fff
    style FP fill:#10b981,color:#fff`,
};

// =============================================================================
// BIOMECHANICS
// =============================================================================

/**
 * Joint Biomechanics template
 */
export const jointBiomechanics: DiagramTemplate = {
  id: 'biomed-joint-biomech',
  name: 'Joint Biomechanics Diagram',
  description: 'Musculoskeletal joint mechanics analysis',
  domain: 'engineering',
  promptTemplate: `Create a joint biomechanics diagram:
- Joint type: {{jointType}}
- Range of motion: {{rangeOfMotion}}
- Forces and moments: {{forcesAndMoments}}
- Muscle groups: {{muscleGroups}}
- Ligament loading: {{ligamentLoading}}
- Contact mechanics: {{contactMechanics}}
- Kinematic analysis: {{kinematics}}
{{#additionalNotes}}Clinical relevance: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'jointType',
    'rangeOfMotion',
    'forcesAndMoments',
    'muscleGroups',
    'ligamentLoading',
    'contactMechanics',
    'kinematics',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Joint["Knee Joint"]
        FM["Femur"]
        TB["Tibia"]
        PT["Patella"]
    end
    subgraph Forces["Force Analysis"]
        QD["Quadriceps\\nForce"]
        GR["Ground\\nReaction"]
        JR["Joint\\nReaction"]
    end
    subgraph Ligaments["Stabilizers"]
        ACL["ACL"]
        PCL["PCL"]
        MCL["MCL"]
    end
    QD --> PT --> FM
    GR --> TB
    FM --> JR --> TB
    ACL --> FM & TB
    style JR fill:#dc2626,color:#fff
    style QD fill:#3b82f6,color:#fff`,
};

/**
 * Gait Analysis template
 */
export const gaitAnalysis: DiagramTemplate = {
  id: 'biomed-gait-analysis',
  name: 'Gait Analysis Diagram',
  description: 'Human gait cycle analysis with kinetics and kinematics',
  domain: 'engineering',
  promptTemplate: `Create a gait analysis diagram:
- Gait cycle phases: {{gaitCyclePhases}}
- Joint angles: {{jointAngles}}
- Ground reaction forces: {{groundReactionForces}}
- Muscle activity: {{muscleActivity}}
- Temporal parameters: {{temporalParameters}}
- Spatial parameters: {{spatialParameters}}
- Abnormalities: {{abnormalities}}
{{#additionalNotes}}Clinical assessment: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'gaitCyclePhases',
    'jointAngles',
    'groundReactionForces',
    'muscleActivity',
    'temporalParameters',
    'spatialParameters',
    'abnormalities',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Stance["Stance Phase (60%)"]
        IC["Initial\\nContact"]
        LR["Loading\\nResponse"]
        MS["Mid\\nStance"]
        TS["Terminal\\nStance"]
        PS["Pre-Swing"]
    end
    subgraph Swing["Swing Phase (40%)"]
        IS["Initial\\nSwing"]
        MSW["Mid\\nSwing"]
        TSW["Terminal\\nSwing"]
    end
    IC --> LR --> MS --> TS --> PS --> IS --> MSW --> TSW --> IC
    style IC fill:#3b82f6,color:#fff
    style PS fill:#10b981,color:#fff`,
};

/**
 * Orthopedic Implant Design template
 */
export const orthopedicImplantDesign: DiagramTemplate = {
  id: 'biomed-orthopedic-implant',
  name: 'Orthopedic Implant Design',
  description: 'Joint replacement implant design analysis',
  domain: 'engineering',
  promptTemplate: `Create an orthopedic implant design diagram:
- Implant type: {{implantType}}
- Materials: {{materials}}
- Bearing surfaces: {{bearingSurfaces}}
- Fixation method: {{fixation}}
- Load analysis: {{loadAnalysis}}
- Wear analysis: {{wearAnalysis}}
- Biocompatibility: {{biocompatibility}}
{{#additionalNotes}}Design constraints: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'implantType',
    'materials',
    'bearingSurfaces',
    'fixation',
    'loadAnalysis',
    'wearAnalysis',
    'biocompatibility',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Implant["Total Hip Replacement"]
        AC["Acetabular\\nCup"]
        LN["Liner\\n(PE/Ceramic)"]
        HD["Femoral\\nHead"]
        ST["Stem\\n(Ti Alloy)"]
    end
    subgraph Bone["Bone Interface"]
        PL["Pelvis"]
        FM["Femur"]
    end
    AC --> PL
    LN --> AC
    HD --> LN
    ST --> HD
    ST --> FM
    style AC fill:#6b7280,color:#fff
    style HD fill:#3b82f6,color:#fff`,
};

// =============================================================================
// TISSUE ENGINEERING
// =============================================================================

/**
 * Tissue Scaffold Design template
 */
export const tissueScaffoldDesign: DiagramTemplate = {
  id: 'biomed-tissue-scaffold',
  name: 'Tissue Scaffold Design',
  description: 'Biodegradable scaffold for tissue engineering',
  domain: 'engineering',
  promptTemplate: `Create a tissue scaffold design diagram:
- Scaffold material: {{scaffoldMaterial}}
- Pore structure: {{poreStructure}}
- Fabrication method: {{fabricationMethod}}
- Cell seeding: {{cellSeeding}}
- Growth factors: {{growthFactors}}
- Degradation profile: {{degradationProfile}}
- Mechanical properties: {{mechanicalProperties}}
{{#additionalNotes}}Tissue application: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'scaffoldMaterial',
    'poreStructure',
    'fabricationMethod',
    'cellSeeding',
    'growthFactors',
    'degradationProfile',
    'mechanicalProperties',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Scaffold["Scaffold Structure"]
        PR["Porous\\nMatrix"]
        GF["Growth\\nFactors"]
        CL["Seeded\\nCells"]
    end
    subgraph Process["Culture Process"]
        BR["Bioreactor"]
        NT["Nutrients"]
        O2["Oxygen"]
    end
    subgraph Outcome["Tissue Formation"]
        TI["New\\nTissue"]
        DG["Scaffold\\nDegradation"]
    end
    CL --> PR
    GF --> PR
    PR --> BR
    NT --> BR
    O2 --> BR
    BR --> TI
    PR --> DG
    style PR fill:#10b981,color:#fff
    style TI fill:#3b82f6,color:#fff`,
};

/**
 * Bioreactor System template
 */
export const bioreactorSystem: DiagramTemplate = {
  id: 'biomed-bioreactor',
  name: 'Bioreactor System Design',
  description: 'Tissue culture bioreactor system',
  domain: 'engineering',
  promptTemplate: `Create a bioreactor system design diagram:
- Bioreactor type: {{bioreactorType}}
- Culture chamber: {{cultureChamber}}
- Perfusion system: {{perfusionSystem}}
- Mechanical stimulation: {{mechanicalStimulation}}
- Gas exchange: {{gasExchange}}
- Monitoring sensors: {{monitoringSensors}}
- Control system: {{controlSystem}}
{{#additionalNotes}}Culture parameters: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'bioreactorType',
    'cultureChamber',
    'perfusionSystem',
    'mechanicalStimulation',
    'gasExchange',
    'monitoringSensors',
    'controlSystem',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Chamber["Culture Chamber"]
        SC["Scaffold +\\nCells"]
        ST["Mechanical\\nStimulus"]
    end
    subgraph Perfusion["Perfusion Loop"]
        PM["Pump"]
        MD["Media\\nReservoir"]
        OX["Oxygenator"]
    end
    subgraph Control["Control System"]
        SN["Sensors\\n(pH, O2, T)"]
        CT["Controller"]
    end
    MD --> PM --> OX --> SC
    SC --> MD
    ST --> SC
    SN --> CT --> PM
    style SC fill:#10b981,color:#fff
    style CT fill:#3b82f6,color:#fff`,
};

// =============================================================================
// BIOSENSORS
// =============================================================================

/**
 * Biosensor Design template
 */
export const biosensorDesign: DiagramTemplate = {
  id: 'biomed-biosensor',
  name: 'Biosensor Design Diagram',
  description: 'Electrochemical or optical biosensor architecture',
  domain: 'engineering',
  promptTemplate: `Create a biosensor design diagram:
- Sensing principle: {{sensingPrinciple}}
- Biorecognition element: {{biorecognition}}
- Transducer type: {{transducer}}
- Signal conditioning: {{signalConditioning}}
- Analyte: {{analyte}}
- Sensitivity: {{sensitivity}}
- Selectivity: {{selectivity}}
{{#additionalNotes}}Application requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sensingPrinciple',
    'biorecognition',
    'transducer',
    'signalConditioning',
    'analyte',
    'sensitivity',
    'selectivity',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Sample["Sample"]
        AN["Analyte\\n(Glucose)"]
    end
    subgraph Sensor["Biosensor"]
        BR["Biorecognition\\n(Enzyme)"]
        TR["Transducer\\n(Electrode)"]
        SC["Signal\\nConditioning"]
    end
    subgraph Output["Output"]
        AD["ADC"]
        DP["Display"]
    end
    AN --> BR --> TR --> SC --> AD --> DP
    style BR fill:#10b981,color:#fff
    style TR fill:#3b82f6,color:#fff`,
};

/**
 * Lab-on-a-Chip template
 */
export const labOnChip: DiagramTemplate = {
  id: 'biomed-lab-on-chip',
  name: 'Lab-on-a-Chip Design',
  description: 'Microfluidic diagnostic device architecture',
  domain: 'engineering',
  promptTemplate: `Create a lab-on-a-chip design diagram:
- Sample input: {{sampleInput}}
- Microfluidic channels: {{channels}}
- Mixing chambers: {{mixingChambers}}
- Reaction zones: {{reactionZones}}
- Detection method: {{detectionMethod}}
- Reagent storage: {{reagentStorage}}
- Waste handling: {{wasteHandling}}
{{#additionalNotes}}Diagnostic application: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'sampleInput',
    'channels',
    'mixingChambers',
    'reactionZones',
    'detectionMethod',
    'reagentStorage',
    'wasteHandling',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Input["Sample Input"]
        SI["Sample\\nInlet"]
        RG["Reagent\\nChamber"]
    end
    subgraph Processing["Microfluidics"]
        MX["Mixing\\nZone"]
        RX["Reaction\\nChamber"]
        SP["Separation\\nChannel"]
    end
    subgraph Detection["Detection"]
        DT["Optical\\nDetector"]
        WS["Waste"]
    end
    SI --> MX
    RG --> MX
    MX --> RX --> SP --> DT
    SP --> WS
    style RX fill:#10b981,color:#fff
    style DT fill:#3b82f6,color:#fff`,
};

// =============================================================================
// NEURAL ENGINEERING
// =============================================================================

/**
 * Brain-Computer Interface template
 */
export const brainComputerInterface: DiagramTemplate = {
  id: 'biomed-bci',
  name: 'Brain-Computer Interface Design',
  description: 'Neural interface system architecture',
  domain: 'engineering',
  promptTemplate: `Create a brain-computer interface diagram:
- Electrode array: {{electrodeArray}}
- Signal acquisition: {{signalAcquisition}}
- Signal processing: {{signalProcessing}}
- Feature extraction: {{featureExtraction}}
- Decoder algorithm: {{decoder}}
- Output device: {{outputDevice}}
- Feedback mechanism: {{feedback}}
{{#additionalNotes}}Clinical application: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'electrodeArray',
    'signalAcquisition',
    'signalProcessing',
    'featureExtraction',
    'decoder',
    'outputDevice',
    'feedback',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Neural["Neural Interface"]
        EL["Electrode\\nArray"]
        AM["Amplifier"]
    end
    subgraph Processing["Signal Processing"]
        FT["Filtering"]
        FE["Feature\\nExtraction"]
        DC["Decoder\\n(ML)"]
    end
    subgraph Output["Output"]
        CM["Control\\nCommand"]
        FB["Visual\\nFeedback"]
    end
    EL --> AM --> FT --> FE --> DC --> CM
    CM --> FB
    style DC fill:#10b981,color:#fff
    style EL fill:#3b82f6,color:#fff`,
};

/**
 * Deep Brain Stimulation template
 */
export const deepBrainStimulation: DiagramTemplate = {
  id: 'biomed-dbs',
  name: 'Deep Brain Stimulation System',
  description: 'Implantable neurostimulation system design',
  domain: 'engineering',
  promptTemplate: `Create a deep brain stimulation system diagram:
- Target nucleus: {{targetNucleus}}
- Electrode design: {{electrodeDesign}}
- IPG specifications: {{ipgSpecs}}
- Stimulation parameters: {{stimParameters}}
- Programming interface: {{programming}}
- Sensing capabilities: {{sensing}}
- Closed-loop control: {{closedLoop}}
{{#additionalNotes}}Clinical parameters: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'targetNucleus',
    'electrodeDesign',
    'ipgSpecs',
    'stimParameters',
    'programming',
    'sensing',
    'closedLoop',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Brain["Brain Target"]
        TG["Subthalamic\\nNucleus"]
        EL["DBS\\nElectrode"]
    end
    subgraph Implant["Implanted System"]
        EX["Extension\\nWire"]
        IPG["Pulse\\nGenerator"]
    end
    subgraph External["Programming"]
        PR["Clinician\\nProgrammer"]
        PT["Patient\\nController"]
    end
    EL --> TG
    EL --> EX --> IPG
    PR --> IPG
    PT --> IPG
    style IPG fill:#3b82f6,color:#fff
    style TG fill:#dc2626,color:#fff`,
};

// =============================================================================
// REHABILITATION ENGINEERING
// =============================================================================

/**
 * Exoskeleton System template
 */
export const exoskeletonSystem: DiagramTemplate = {
  id: 'biomed-exoskeleton',
  name: 'Exoskeleton System Design',
  description: 'Powered exoskeleton for rehabilitation or assistance',
  domain: 'engineering',
  promptTemplate: `Create an exoskeleton system diagram:
- Target joints: {{targetJoints}}
- Actuation system: {{actuationSystem}}
- Sensor suite: {{sensors}}
- Control strategy: {{controlStrategy}}
- Power system: {{powerSystem}}
- Human-machine interface: {{hmi}}
- Safety systems: {{safetySystems}}
{{#additionalNotes}}Application requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'targetJoints',
    'actuationSystem',
    'sensors',
    'controlStrategy',
    'powerSystem',
    'hmi',
    'safetySystems',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Structure["Mechanical Structure"]
        HP["Hip\\nJoint"]
        KN["Knee\\nJoint"]
        AK["Ankle\\nJoint"]
    end
    subgraph Actuation["Actuation"]
        MT["Motors"]
        GB["Gearboxes"]
    end
    subgraph Control["Control System"]
        SN["Sensors\\n(IMU, Force)"]
        CT["Controller"]
        IN["User\\nIntent"]
    end
    IN --> CT
    SN --> CT
    CT --> MT --> GB
    GB --> HP & KN & AK
    style CT fill:#10b981,color:#fff
    style MT fill:#3b82f6,color:#fff`,
};

// =============================================================================
// Export all templates
// =============================================================================

export const biomedicalTemplates: DiagramTemplate[] = [
  // Medical Device Design
  medicalDeviceSystem,
  prostheticDesign,
  pacemakerDesign,
  insulinPumpSystem,
  // Medical Imaging
  mriSystemArchitecture,
  ultrasoundSystem,
  ctScannerSystem,
  // Biomechanics
  jointBiomechanics,
  gaitAnalysis,
  orthopedicImplantDesign,
  // Tissue Engineering
  tissueScaffoldDesign,
  bioreactorSystem,
  // Biosensors
  biosensorDesign,
  labOnChip,
  // Neural Engineering
  brainComputerInterface,
  deepBrainStimulation,
  // Rehabilitation Engineering
  exoskeletonSystem,
];
