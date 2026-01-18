// Neuroscience diagram templates for scientific illustration
import type { DiagramTemplate } from './index';

export const neuronStructureTemplate: DiagramTemplate = {
  id: 'neuro-neuron-structure',
  name: 'Neuron Anatomy',
  description: 'Detailed diagram of neuron structure with all major components',
  domain: 'biology',
  promptTemplate: `Create a neuron anatomy diagram showing:
- Cell body (soma): {{cellBody}}
- Dendrites: {{dendrites}}
- Axon: {{axon}}
- Myelin sheath: {{myelinSheath}}
- Axon terminals: {{axonTerminals}}

Include nodes of Ranvier and synaptic boutons.`,
  placeholders: ['cellBody', 'dendrites', 'axon', 'myelinSheath', 'axonTerminals'],
  mermaidExample: `flowchart LR
    subgraph Neuron["Neuron Structure"]
        DEND[Dendrites] --> SOMA[Cell Body/Soma]
        SOMA --> HILL[Axon Hillock]
        HILL --> AXON[Axon]
        AXON --> NODE[Nodes of Ranvier]
        MYELIN[Myelin Sheath] --> AXON
        AXON --> TERM[Axon Terminals]
        TERM --> SYN[Synaptic Boutons]
    end`
};

export const actionPotentialTemplate: DiagramTemplate = {
  id: 'neuro-action-potential',
  name: 'Action Potential Diagram',
  description: 'Diagram showing phases of action potential generation',
  domain: 'biology',
  promptTemplate: `Create an action potential diagram showing:
- Resting potential: {{restingPotential}}
- Depolarization: {{depolarization}}
- Repolarization: {{repolarization}}
- Hyperpolarization: {{hyperpolarization}}
- Ion channels: {{ionChannels}}

Include voltage-gated channel dynamics and ion movements.`,
  placeholders: ['restingPotential', 'depolarization', 'repolarization', 'hyperpolarization', 'ionChannels'],
  mermaidExample: `flowchart TB
    subgraph AP["Action Potential Phases"]
        REST[Resting -70mV] --> THRESH[Threshold -55mV]
        THRESH --> DEPOL[Depolarization +30mV]
        DEPOL --> |Na+ influx| PEAK[Peak]
        PEAK --> REPOL[Repolarization]
        REPOL --> |K+ efflux| HYPER[Hyperpolarization -80mV]
        HYPER --> |Na/K pump| REST
    end`
};

export const synapticTransmissionTemplate: DiagramTemplate = {
  id: 'neuro-synapse',
  name: 'Synaptic Transmission',
  description: 'Diagram showing chemical synapse structure and neurotransmitter release',
  domain: 'biology',
  promptTemplate: `Create a synaptic transmission diagram showing:
- Presynaptic terminal: {{presynaptic}}
- Synaptic vesicles: {{vesicles}}
- Neurotransmitter release: {{neurotransmitterRelease}}
- Synaptic cleft: {{synapticCleft}}
- Postsynaptic receptors: {{postsynapticReceptors}}

Include calcium signaling and vesicle fusion.`,
  placeholders: ['presynaptic', 'vesicles', 'neurotransmitterRelease', 'synapticCleft', 'postsynapticReceptors'],
  mermaidExample: `flowchart TB
    subgraph Synapse["Chemical Synapse"]
        AP[Action Potential] --> CA[Ca2+ Influx]
        CA --> VES[Vesicle Fusion]
        VES --> REL[Neurotransmitter Release]
        REL --> CLEFT[Synaptic Cleft]
        CLEFT --> RECEP[Postsynaptic Receptors]
        RECEP --> |Ionotropic| ION[Ion Channel Opening]
        RECEP --> |Metabotropic| GPCR[G-Protein Cascade]
    end`
};

export const neurotransmitterSystemsTemplate: DiagramTemplate = {
  id: 'neuro-neurotransmitters',
  name: 'Neurotransmitter Systems',
  description: 'Overview of major neurotransmitter pathways in the brain',
  domain: 'biology',
  promptTemplate: `Create a neurotransmitter systems diagram showing:
- Dopamine pathways: {{dopaminePathways}}
- Serotonin pathways: {{serotoninPathways}}
- Norepinephrine pathways: {{norepinephrinePathways}}
- Acetylcholine pathways: {{acetylcholinePathways}}
- GABA/Glutamate: {{gabaGlutamate}}

Include nuclei of origin and target regions.`,
  placeholders: ['dopaminePathways', 'serotoninPathways', 'norepinephrinePathways', 'acetylcholinePathways', 'gabaGlutamate'],
  mermaidExample: `flowchart TB
    subgraph Neurotransmitters["Major Neurotransmitter Systems"]
        subgraph Dopamine["Dopamine"]
            VTA[VTA] --> NAC[Nucleus Accumbens]
            SN[Substantia Nigra] --> STRI[Striatum]
        end
        subgraph Serotonin["Serotonin"]
            RAPHE[Raphe Nuclei] --> CTX[Cortex/Limbic]
        end
        subgraph NE["Norepinephrine"]
            LC[Locus Coeruleus] --> BRAIN[Widespread]
        end
    end`
};

export const brainAnatomyTemplate: DiagramTemplate = {
  id: 'neuro-brain-anatomy',
  name: 'Brain Regional Anatomy',
  description: 'Diagram showing major brain regions and their functions',
  domain: 'biology',
  promptTemplate: `Create a brain anatomy diagram showing:
- Cerebral cortex lobes: {{cortexLobes}}
- Subcortical structures: {{subcortical}}
- Brainstem regions: {{brainstem}}
- Cerebellum: {{cerebellum}}
- Functional areas: {{functionalAreas}}

Include sagittal and coronal views.`,
  placeholders: ['cortexLobes', 'subcortical', 'brainstem', 'cerebellum', 'functionalAreas'],
  mermaidExample: `flowchart TB
    subgraph Brain["Brain Regions"]
        subgraph Cortex["Cerebral Cortex"]
            FRONT[Frontal - Executive]
            PAR[Parietal - Sensory]
            TEMP[Temporal - Memory/Auditory]
            OCC[Occipital - Visual]
        end
        subgraph Subcortical["Subcortical"]
            THAL[Thalamus]
            HYPO[Hypothalamus]
            HIPPO[Hippocampus]
            AMYG[Amygdala]
            BG[Basal Ganglia]
        end
        subgraph Brainstem["Brainstem"]
            MID[Midbrain]
            PONS[Pons]
            MED[Medulla]
        end
        CEREB[Cerebellum]
    end`
};

export const neuralCircuitTemplate: DiagramTemplate = {
  id: 'neuro-neural-circuit',
  name: 'Neural Circuit Diagram',
  description: 'Diagram showing neural circuit connectivity and information flow',
  domain: 'biology',
  promptTemplate: `Create a neural circuit diagram showing:
- Input neurons: {{inputNeurons}}
- Interneurons: {{interneurons}}
- Output neurons: {{outputNeurons}}
- Excitatory connections: {{excitatoryConnections}}
- Inhibitory connections: {{inhibitoryConnections}}

Show circuit motifs and feedback loops.`,
  placeholders: ['inputNeurons', 'interneurons', 'outputNeurons', 'excitatoryConnections', 'inhibitoryConnections'],
  mermaidExample: `flowchart LR
    subgraph Circuit["Neural Circuit"]
        INPUT[Sensory Input] --> EXC1[Excitatory Neuron]
        EXC1 --> |+| INT[Interneuron]
        INT --> |- inhibition| EXC2[Principal Neuron]
        EXC1 --> |+ excitation| EXC2
        EXC2 --> OUTPUT[Motor Output]
        EXC2 --> |Feedback| INT
    end`
};

export const longTermPotentiationTemplate: DiagramTemplate = {
  id: 'neuro-ltp',
  name: 'Long-Term Potentiation',
  description: 'Diagram showing LTP mechanisms and synaptic plasticity',
  domain: 'biology',
  promptTemplate: `Create an LTP diagram showing:
- NMDA receptor activation: {{nmdaActivation}}
- Calcium influx: {{calciumInflux}}
- AMPA receptor trafficking: {{ampaTrafficking}}
- Synaptic strengthening: {{synapticStrengthening}}
- Protein synthesis: {{proteinSynthesis}}

Include early and late LTP phases.`,
  placeholders: ['nmdaActivation', 'calciumInflux', 'ampaTrafficking', 'synapticStrengthening', 'proteinSynthesis'],
  mermaidExample: `flowchart TB
    subgraph LTP["Long-Term Potentiation"]
        GLUT[Glutamate Release] --> AMPA[AMPA Receptor]
        AMPA --> DEPOL[Depolarization]
        DEPOL --> NMDA[NMDA Receptor Unblock]
        GLUT --> NMDA
        NMDA --> CA[Ca2+ Influx]
        CA --> CAMKII[CaMKII Activation]
        CAMKII --> INSERT[AMPA Insertion]
        CA --> CREB[CREB - Gene Expression]
        CREB --> LATE[Late LTP - New Proteins]
    end`
};

export const visualPathwayTemplate: DiagramTemplate = {
  id: 'neuro-visual-pathway',
  name: 'Visual Pathway',
  description: 'Diagram showing visual information processing from retina to cortex',
  domain: 'biology',
  promptTemplate: `Create a visual pathway diagram showing:
- Retinal processing: {{retina}}
- Optic nerve/chiasm: {{opticChiasm}}
- Lateral geniculate nucleus: {{lgn}}
- Primary visual cortex: {{v1}}
- Higher visual areas: {{higherVisual}}

Include retinotopic mapping and visual field representation.`,
  placeholders: ['retina', 'opticChiasm', 'lgn', 'v1', 'higherVisual'],
  mermaidExample: `flowchart LR
    subgraph Visual["Visual Pathway"]
        RET[Retina - Photo/Bipolar/Ganglion] --> ON[Optic Nerve]
        ON --> CHIASM[Optic Chiasm - Crossing]
        CHIASM --> OT[Optic Tract]
        OT --> LGN[Lateral Geniculate Nucleus]
        LGN --> RAD[Optic Radiation]
        RAD --> V1[Primary Visual Cortex]
        V1 --> V2[V2]
        V2 --> DORSAL[Dorsal - Where]
        V2 --> VENTRAL[Ventral - What]
    end`
};

export const motorSystemTemplate: DiagramTemplate = {
  id: 'neuro-motor-system',
  name: 'Motor System Organization',
  description: 'Diagram showing motor pathways from cortex to muscle',
  domain: 'biology',
  promptTemplate: `Create a motor system diagram showing:
- Motor cortex: {{motorCortex}}
- Basal ganglia circuits: {{basalGanglia}}
- Cerebellum role: {{cerebellum}}
- Corticospinal tract: {{corticospinalTract}}
- Lower motor neurons: {{lowerMotorNeurons}}

Include direct and indirect pathways.`,
  placeholders: ['motorCortex', 'basalGanglia', 'cerebellum', 'corticospinalTract', 'lowerMotorNeurons'],
  mermaidExample: `flowchart TB
    subgraph Motor["Motor System"]
        PM[Premotor Cortex] --> M1[Primary Motor Cortex]
        M1 --> CST[Corticospinal Tract]
        BG[Basal Ganglia] --> |Modulate| M1
        CEREB[Cerebellum] --> |Coordinate| M1
        CST --> |Decussation| SPINE[Spinal Cord]
        SPINE --> LMN[Lower Motor Neurons]
        LMN --> MUSCLE[Skeletal Muscle]
    end`
};

export const autonomicNervousSystemTemplate: DiagramTemplate = {
  id: 'neuro-autonomic',
  name: 'Autonomic Nervous System',
  description: 'Diagram comparing sympathetic and parasympathetic divisions',
  domain: 'biology',
  promptTemplate: `Create an autonomic NS diagram showing:
- Sympathetic division: {{sympathetic}}
- Parasympathetic division: {{parasympathetic}}
- Ganglia locations: {{ganglia}}
- Target organs: {{targetOrgans}}
- Neurotransmitters: {{neurotransmitters}}

Show fight-or-flight vs rest-and-digest responses.`,
  placeholders: ['sympathetic', 'parasympathetic', 'ganglia', 'targetOrgans', 'neurotransmitters'],
  mermaidExample: `flowchart TB
    subgraph ANS["Autonomic Nervous System"]
        subgraph Sympathetic["Sympathetic - Fight/Flight"]
            TSPINE[Thoracolumbar] --> SGANG[Paravertebral Ganglia]
            SGANG --> |NE| STARGET[Heart/Lungs/Vessels]
        end
        subgraph Parasympathetic["Parasympathetic - Rest/Digest"]
            BRAIN[Craniosacral] --> PGANG[Terminal Ganglia]
            PGANG --> |ACh| PTARGET[Heart/GI/Bladder]
        end
    end`
};

export const gliaCellsTemplate: DiagramTemplate = {
  id: 'neuro-glia',
  name: 'Glial Cell Types',
  description: 'Diagram showing different glial cells and their functions',
  domain: 'biology',
  promptTemplate: `Create a glial cells diagram showing:
- Astrocytes: {{astrocytes}}
- Oligodendrocytes: {{oligodendrocytes}}
- Microglia: {{microglia}}
- Schwann cells: {{schwannCells}}
- Ependymal cells: {{ependymal}}

Include neuron-glia interactions.`,
  placeholders: ['astrocytes', 'oligodendrocytes', 'microglia', 'schwannCells', 'ependymal'],
  mermaidExample: `flowchart TB
    subgraph Glia["Glial Cells"]
        subgraph CNS["CNS Glia"]
            ASTRO[Astrocytes - Support/BBB]
            OLIGO[Oligodendrocytes - Myelin]
            MICRO[Microglia - Immune]
            EPEN[Ependymal - CSF]
        end
        subgraph PNS["PNS Glia"]
            SCHW[Schwann Cells - Myelin]
            SAT[Satellite Cells - Support]
        end
    end`
};

export const sleepWakeCycleTemplate: DiagramTemplate = {
  id: 'neuro-sleep-wake',
  name: 'Sleep-Wake Regulation',
  description: 'Diagram showing brain circuits controlling sleep and wakefulness',
  domain: 'biology',
  promptTemplate: `Create a sleep-wake diagram showing:
- Wake-promoting systems: {{wakePromoting}}
- Sleep-promoting systems: {{sleepPromoting}}
- Circadian regulation: {{circadian}}
- Sleep stages: {{sleepStages}}
- REM regulation: {{remRegulation}}

Include flip-flop switch model.`,
  placeholders: ['wakePromoting', 'sleepPromoting', 'circadian', 'sleepStages', 'remRegulation'],
  mermaidExample: `flowchart TB
    subgraph SleepWake["Sleep-Wake Regulation"]
        subgraph Wake["Wake Systems"]
            LC[Locus Coeruleus - NE]
            TMN[TMN - Histamine]
            BF[Basal Forebrain - ACh]
        end
        subgraph Sleep["Sleep Systems"]
            VLPO[VLPO - GABA/Galanin]
        end
        SCN[SCN - Circadian Clock] --> |Modulate| Wake
        SCN --> |Modulate| Sleep
        VLPO --> |Inhibit| Wake
        Wake --> |Inhibit| VLPO
    end`
};

export const memorySystemsTemplate: DiagramTemplate = {
  id: 'neuro-memory-systems',
  name: 'Memory Systems Organization',
  description: 'Diagram showing different types of memory and their neural substrates',
  domain: 'biology',
  promptTemplate: `Create a memory systems diagram showing:
- Short-term memory: {{shortTerm}}
- Long-term memory types: {{longTerm}}
- Hippocampus role: {{hippocampus}}
- Cortical storage: {{corticalStorage}}
- Consolidation process: {{consolidation}}

Include declarative vs procedural memory circuits.`,
  placeholders: ['shortTerm', 'longTerm', 'hippocampus', 'corticalStorage', 'consolidation'],
  mermaidExample: `flowchart TB
    subgraph Memory["Memory Systems"]
        SENS[Sensory Memory] --> STM[Short-Term/Working Memory]
        STM --> |Encoding| LTM[Long-Term Memory]
        subgraph Declarative["Declarative - Hippocampus"]
            EPIS[Episodic]
            SEM[Semantic]
        end
        subgraph Nondeclarative["Non-Declarative"]
            PROC[Procedural - Basal Ganglia]
            COND[Conditioning - Amygdala/Cerebellum]
            PRIM[Priming - Cortex]
        end
        LTM --> Declarative
        LTM --> Nondeclarative
    end`
};

export const painPathwayTemplate: DiagramTemplate = {
  id: 'neuro-pain-pathway',
  name: 'Pain Pathway',
  description: 'Diagram showing nociceptive pathways and pain modulation',
  domain: 'biology',
  promptTemplate: `Create a pain pathway diagram showing:
- Nociceptors: {{nociceptors}}
- Spinal processing: {{spinalProcessing}}
- Ascending pathways: {{ascendingPathways}}
- Pain matrix: {{painMatrix}}
- Descending modulation: {{descendingModulation}}

Include spinothalamic tract and gate control.`,
  placeholders: ['nociceptors', 'spinalProcessing', 'ascendingPathways', 'painMatrix', 'descendingModulation'],
  mermaidExample: `flowchart TB
    subgraph Pain["Pain Pathway"]
        NOCI[Nociceptors] --> DRG[Dorsal Root Ganglion]
        DRG --> DH[Dorsal Horn]
        DH --> STT[Spinothalamic Tract]
        STT --> THAL[Thalamus]
        THAL --> S1[Somatosensory Cortex]
        THAL --> ACC[Anterior Cingulate - Affect]
        PAG[Periaqueductal Gray] --> |Descending Inhibition| DH
    end`
};

export const bloodBrainBarrierTemplate: DiagramTemplate = {
  id: 'neuro-bbb',
  name: 'Blood-Brain Barrier',
  description: 'Diagram showing BBB structure and transport mechanisms',
  domain: 'biology',
  promptTemplate: `Create a blood-brain barrier diagram showing:
- Endothelial cells: {{endothelial}}
- Tight junctions: {{tightJunctions}}
- Astrocyte end-feet: {{astrocyteEndFeet}}
- Transport mechanisms: {{transport}}
- Pericytes: {{pericytes}}

Include transcellular and paracellular routes.`,
  placeholders: ['endothelial', 'tightJunctions', 'astrocyteEndFeet', 'transport', 'pericytes'],
  mermaidExample: `flowchart TB
    subgraph BBB["Blood-Brain Barrier"]
        BLOOD[Blood] --> ENDO[Endothelial Cell]
        TJ[Tight Junctions] --> |Seal| ENDO
        ENDO --> |Transcytosis| BRAIN[Brain Parenchyma]
        ENDO --> |Transporters| BRAIN
        PERI[Pericytes] --> |Support| ENDO
        ASTRO[Astrocyte End-Feet] --> |Regulate| ENDO
        BM[Basement Membrane] --> ENDO
    end`
};

export const neurodegenerationTemplate: DiagramTemplate = {
  id: 'neuro-neurodegeneration',
  name: 'Neurodegenerative Disease Mechanisms',
  description: 'Diagram showing common pathways in neurodegenerative diseases',
  domain: 'biology',
  promptTemplate: `Create a neurodegeneration diagram showing:
- Protein aggregation: {{proteinAggregation}}
- Oxidative stress: {{oxidativeStress}}
- Mitochondrial dysfunction: {{mitoDysfunction}}
- Neuroinflammation: {{neuroinflammation}}
- Cell death pathways: {{cellDeath}}

Include disease-specific proteins (amyloid, tau, alpha-synuclein).`,
  placeholders: ['proteinAggregation', 'oxidativeStress', 'mitoDysfunction', 'neuroinflammation', 'cellDeath'],
  mermaidExample: `flowchart TB
    subgraph Neurodegeneration["Neurodegenerative Mechanisms"]
        MISFOLD[Protein Misfolding] --> AGG[Aggregation]
        AGG --> |Amyloid-β| AD[Alzheimer's]
        AGG --> |α-Synuclein| PD[Parkinson's]
        AGG --> |Huntingtin| HD[Huntington's]
        MITO[Mitochondrial Dysfunction] --> ROS[Oxidative Stress]
        ROS --> DAMAGE[Cellular Damage]
        MICRO[Microglial Activation] --> INFLAM[Neuroinflammation]
        DAMAGE --> APOP[Apoptosis/Necrosis]
    end`
};

export const neuroplasticityTemplate: DiagramTemplate = {
  id: 'neuro-plasticity',
  name: 'Neuroplasticity Mechanisms',
  description: 'Diagram showing forms of neural plasticity and adaptation',
  domain: 'biology',
  promptTemplate: `Create a neuroplasticity diagram showing:
- Synaptic plasticity: {{synapticPlasticity}}
- Structural plasticity: {{structuralPlasticity}}
- Adult neurogenesis: {{neurogenesis}}
- Homeostatic plasticity: {{homeostaticPlasticity}}
- Experience-dependent changes: {{experienceDependent}}

Include Hebbian and non-Hebbian mechanisms.`,
  placeholders: ['synapticPlasticity', 'structuralPlasticity', 'neurogenesis', 'homeostaticPlasticity', 'experienceDependent'],
  mermaidExample: `flowchart TB
    subgraph Plasticity["Neuroplasticity"]
        subgraph Synaptic["Synaptic Plasticity"]
            LTP[Long-Term Potentiation]
            LTD[Long-Term Depression]
            STDP[Spike-Timing Dependent]
        end
        subgraph Structural["Structural Plasticity"]
            SPINE[Spine Formation/Elimination]
            AXON[Axon Sprouting]
            DENDRITE[Dendritic Remodeling]
        end
        NEURO[Adult Neurogenesis - Hippocampus/SVZ]
        HOMEO[Homeostatic Scaling]
    end`
};

// Export all neuroscience templates
export const neuroscienceTemplates: DiagramTemplate[] = [
  neuronStructureTemplate,
  actionPotentialTemplate,
  synapticTransmissionTemplate,
  neurotransmitterSystemsTemplate,
  brainAnatomyTemplate,
  neuralCircuitTemplate,
  longTermPotentiationTemplate,
  visualPathwayTemplate,
  motorSystemTemplate,
  autonomicNervousSystemTemplate,
  gliaCellsTemplate,
  sleepWakeCycleTemplate,
  memorySystemsTemplate,
  painPathwayTemplate,
  bloodBrainBarrierTemplate,
  neurodegenerationTemplate,
  neuroplasticityTemplate
];

export default neuroscienceTemplates;
