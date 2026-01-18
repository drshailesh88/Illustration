/**
 * computer.ts
 * Computer Engineering diagram templates for FINNISH
 *
 * Contains comprehensive templates for computer engineering including:
 * - Processor and CPU design
 * - Memory systems
 * - Computer architecture
 * - Embedded systems
 * - Digital logic design
 * - Network architecture
 */

import type { DiagramTemplate } from './index';

// =============================================================================
// PROCESSOR DESIGN
// =============================================================================

/**
 * CPU Architecture template
 */
export const cpuArchitecture: DiagramTemplate = {
  id: 'comp-cpu-architecture',
  name: 'CPU Architecture Diagram',
  description: 'Central processing unit internal architecture',
  domain: 'engineering',
  promptTemplate: `Create a CPU architecture diagram:
- Architecture type: {{architectureType}}
- Instruction set: {{instructionSet}}
- Pipeline stages: {{pipelineStages}}
- Execution units: {{executionUnits}}
- Register file: {{registerFile}}
- Cache hierarchy: {{cacheHierarchy}}
- Branch prediction: {{branchPrediction}}
{{#additionalNotes}}Performance notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'architectureType',
    'instructionSet',
    'pipelineStages',
    'executionUnits',
    'registerFile',
    'cacheHierarchy',
    'branchPrediction',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Frontend["Frontend"]
        IF["Instruction\\nFetch"]
        ID["Instruction\\nDecode"]
        BP["Branch\\nPredictor"]
    end
    subgraph Backend["Execution"]
        RN["Register\\nRename"]
        IS["Issue"]
        ALU["ALU"]
        FPU["FPU"]
        LSU["Load/Store"]
    end
    subgraph Memory["Memory"]
        L1["L1 Cache"]
        L2["L2 Cache"]
    end
    IF --> ID --> RN --> IS
    IS --> ALU & FPU & LSU
    LSU --> L1 --> L2
    BP --> IF
    style IF fill:#3b82f6,color:#fff
    style ALU fill:#10b981,color:#fff`,
};

/**
 * Pipeline Design template
 */
export const pipelineDesign: DiagramTemplate = {
  id: 'comp-pipeline',
  name: 'Pipeline Design Diagram',
  description: 'CPU instruction pipeline stages and hazards',
  domain: 'engineering',
  promptTemplate: `Create a pipeline design diagram:
- Number of stages: {{numStages}}
- Stage functions: {{stageFunctions}}
- Data hazards: {{dataHazards}}
- Control hazards: {{controlHazards}}
- Forwarding paths: {{forwarding}}
- Stall conditions: {{stallConditions}}
- Pipeline registers: {{pipelineRegisters}}
{{#additionalNotes}}Hazard handling: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'numStages',
    'stageFunctions',
    'dataHazards',
    'controlHazards',
    'forwarding',
    'stallConditions',
    'pipelineRegisters',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Pipeline["5-Stage Pipeline"]
        IF["IF\\nFetch"]
        ID["ID\\nDecode"]
        EX["EX\\nExecute"]
        MEM["MEM\\nMemory"]
        WB["WB\\nWriteback"]
    end
    subgraph Hazards["Hazard Handling"]
        FW["Forwarding\\nUnit"]
        HD["Hazard\\nDetection"]
    end
    IF --> ID --> EX --> MEM --> WB
    EX --> FW --> EX
    MEM --> FW
    HD --> IF
    style EX fill:#dc2626,color:#fff
    style FW fill:#10b981,color:#fff`,
};

/**
 * Multi-core Processor template
 */
export const multicoreProcessor: DiagramTemplate = {
  id: 'comp-multicore',
  name: 'Multi-core Processor Design',
  description: 'Multi-core CPU with shared and private caches',
  domain: 'engineering',
  promptTemplate: `Create a multi-core processor design diagram:
- Number of cores: {{numCores}}
- Core architecture: {{coreArchitecture}}
- Private caches: {{privateCaches}}
- Shared cache: {{sharedCache}}
- Interconnect: {{interconnect}}
- Cache coherence: {{cacheCoherence}}
- Memory controller: {{memoryController}}
{{#additionalNotes}}Design considerations: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'numCores',
    'coreArchitecture',
    'privateCaches',
    'sharedCache',
    'interconnect',
    'cacheCoherence',
    'memoryController',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Cores["Processing Cores"]
        C0["Core 0\\nL1 I/D"]
        C1["Core 1\\nL1 I/D"]
        C2["Core 2\\nL1 I/D"]
        C3["Core 3\\nL1 I/D"]
    end
    subgraph Shared["Shared Resources"]
        L2["L2 Cache"]
        L3["L3 Cache\\n(Shared)"]
        MC["Memory\\nController"]
    end
    C0 & C1 --> L2
    C2 & C3 --> L2
    L2 --> L3 --> MC
    style L3 fill:#3b82f6,color:#fff
    style MC fill:#10b981,color:#fff`,
};

// =============================================================================
// MEMORY SYSTEMS
// =============================================================================

/**
 * Memory Hierarchy template
 */
export const memoryHierarchy: DiagramTemplate = {
  id: 'comp-memory-hierarchy',
  name: 'Memory Hierarchy Diagram',
  description: 'Computer memory hierarchy from registers to storage',
  domain: 'engineering',
  promptTemplate: `Create a memory hierarchy diagram:
- Register file: {{registerFile}}
- L1 cache: {{l1Cache}}
- L2 cache: {{l2Cache}}
- L3 cache: {{l3Cache}}
- Main memory: {{mainMemory}}
- Storage: {{storage}}
- Access latencies: {{latencies}}
{{#additionalNotes}}Performance characteristics: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'registerFile',
    'l1Cache',
    'l2Cache',
    'l3Cache',
    'mainMemory',
    'storage',
    'latencies',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Fast["Fast (Small)"]
        REG["Registers\\n1 cycle"]
        L1["L1 Cache\\n4 cycles"]
    end
    subgraph Medium["Medium"]
        L2["L2 Cache\\n12 cycles"]
        L3["L3 Cache\\n40 cycles"]
    end
    subgraph Slow["Slow (Large)"]
        RAM["DRAM\\n100+ cycles"]
        SSD["SSD\\n10μs"]
    end
    REG --> L1 --> L2 --> L3 --> RAM --> SSD
    style REG fill:#dc2626,color:#fff
    style L1 fill:#f59e0b,color:#fff
    style RAM fill:#3b82f6,color:#fff`,
};

/**
 * Cache Design template
 */
export const cacheDesign: DiagramTemplate = {
  id: 'comp-cache-design',
  name: 'Cache Design Diagram',
  description: 'Cache memory organization and associativity',
  domain: 'engineering',
  promptTemplate: `Create a cache design diagram:
- Cache size: {{cacheSize}}
- Line size: {{lineSize}}
- Associativity: {{associativity}}
- Replacement policy: {{replacementPolicy}}
- Write policy: {{writePolicy}}
- Tag structure: {{tagStructure}}
- Indexing scheme: {{indexing}}
{{#additionalNotes}}Cache organization: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cacheSize',
    'lineSize',
    'associativity',
    'replacementPolicy',
    'writePolicy',
    'tagStructure',
    'indexing',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Address["Address Bits"]
        TG["Tag"]
        IX["Index"]
        OF["Offset"]
    end
    subgraph Cache["4-way Set Associative"]
        S0["Set 0"]
        S1["Set 1"]
        SN["Set N"]
    end
    subgraph Way["Each Set"]
        W0["Way 0"]
        W1["Way 1"]
        W2["Way 2"]
        W3["Way 3"]
    end
    IX --> S0 & S1 & SN
    S0 --> W0 & W1 & W2 & W3
    TG --> W0
    style S0 fill:#3b82f6,color:#fff
    style TG fill:#10b981,color:#fff`,
};

/**
 * Virtual Memory System template
 */
export const virtualMemorySystem: DiagramTemplate = {
  id: 'comp-virtual-memory',
  name: 'Virtual Memory System',
  description: 'Virtual memory address translation and page tables',
  domain: 'engineering',
  promptTemplate: `Create a virtual memory system diagram:
- Page size: {{pageSize}}
- Address space: {{addressSpace}}
- Page table structure: {{pageTableStructure}}
- TLB organization: {{tlbOrganization}}
- Page replacement: {{pageReplacement}}
- Protection bits: {{protectionBits}}
- Hardware support: {{hardwareSupport}}
{{#additionalNotes}}Memory management: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'pageSize',
    'addressSpace',
    'pageTableStructure',
    'tlbOrganization',
    'pageReplacement',
    'protectionBits',
    'hardwareSupport',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph VA["Virtual Address"]
        VPN["Virtual Page\\nNumber"]
        PO["Page\\nOffset"]
    end
    subgraph Translation["Translation"]
        TLB["TLB"]
        PT["Page\\nTable"]
    end
    subgraph PA["Physical Address"]
        PPN["Physical Page\\nNumber"]
        PO2["Page\\nOffset"]
    end
    VPN --> TLB
    TLB -->|"Hit"| PPN
    TLB -->|"Miss"| PT --> PPN
    PO --> PO2
    style TLB fill:#10b981,color:#fff
    style PT fill:#3b82f6,color:#fff`,
};

// =============================================================================
// COMPUTER ARCHITECTURE
// =============================================================================

/**
 * System Bus Architecture template
 */
export const systemBusArchitecture: DiagramTemplate = {
  id: 'comp-system-bus',
  name: 'System Bus Architecture',
  description: 'Computer system bus interconnection',
  domain: 'engineering',
  promptTemplate: `Create a system bus architecture diagram:
- Bus type: {{busType}}
- Bus width: {{busWidth}}
- Clock frequency: {{clockFrequency}}
- Arbitration: {{arbitration}}
- Connected devices: {{connectedDevices}}
- Protocol: {{protocol}}
- Bandwidth: {{bandwidth}}
{{#additionalNotes}}Bus specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'busType',
    'busWidth',
    'clockFrequency',
    'arbitration',
    'connectedDevices',
    'protocol',
    'bandwidth',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Devices["System Devices"]
        CPU["CPU"]
        MEM["Memory\\nController"]
        GPU["Graphics"]
        IO["I/O Hub"]
    end
    subgraph Bus["System Bus"]
        FB["Front Bus\\n64-bit"]
        PCI["PCIe\\nx16"]
    end
    CPU --> FB --> MEM
    CPU --> PCI --> GPU
    FB --> IO
    style FB fill:#3b82f6,color:#fff
    style PCI fill:#10b981,color:#fff`,
};

/**
 * I/O System Architecture template
 */
export const ioSystemArchitecture: DiagramTemplate = {
  id: 'comp-io-system',
  name: 'I/O System Architecture',
  description: 'Input/Output system organization',
  domain: 'engineering',
  promptTemplate: `Create an I/O system architecture diagram:
- I/O bus types: {{ioBusTypes}}
- Controllers: {{controllers}}
- DMA system: {{dmaSystem}}
- Interrupt handling: {{interruptHandling}}
- Peripheral interfaces: {{peripherals}}
- Driver organization: {{driverOrganization}}
- Performance: {{performance}}
{{#additionalNotes}}I/O specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'ioBusTypes',
    'controllers',
    'dmaSystem',
    'interruptHandling',
    'peripherals',
    'driverOrganization',
    'performance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph CPU["Processor"]
        CORE["CPU Core"]
        INT["Interrupt\\nController"]
    end
    subgraph IO["I/O Subsystem"]
        DMA["DMA\\nController"]
        PCIE["PCIe\\nController"]
        USB["USB\\nController"]
    end
    subgraph Devices["Devices"]
        NIC["Network"]
        SSD["Storage"]
        PER["Peripherals"]
    end
    CORE --> DMA --> PCIE --> NIC & SSD
    CORE --> USB --> PER
    INT --> CORE
    style DMA fill:#10b981,color:#fff
    style PCIE fill:#3b82f6,color:#fff`,
};

/**
 * GPU Architecture template
 */
export const gpuArchitecture: DiagramTemplate = {
  id: 'comp-gpu-architecture',
  name: 'GPU Architecture Diagram',
  description: 'Graphics processing unit architecture',
  domain: 'engineering',
  promptTemplate: `Create a GPU architecture diagram:
- Architecture generation: {{architecture}}
- Streaming multiprocessors: {{streamingMultiprocessors}}
- CUDA/shader cores: {{shaderCores}}
- Memory system: {{memorySystem}}
- Texture units: {{textureUnits}}
- Raster operations: {{rasterOps}}
- Display interface: {{displayInterface}}
{{#additionalNotes}}Compute capabilities: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'architecture',
    'streamingMultiprocessors',
    'shaderCores',
    'memorySystem',
    'textureUnits',
    'rasterOps',
    'displayInterface',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph GPU["GPU Chip"]
        GPC["Graphics Processing\\nCluster"]
        SM["Streaming\\nMultiprocessors"]
        TPC["Texture\\nProcessing"]
    end
    subgraph Memory["Memory System"]
        L2["L2 Cache"]
        MC["Memory\\nController"]
        GDDR["GDDR6\\nMemory"]
    end
    subgraph Output["Output"]
        ROP["Raster\\nOperations"]
        DISP["Display\\nEngine"]
    end
    GPC --> SM --> TPC
    TPC --> L2 --> MC --> GDDR
    TPC --> ROP --> DISP
    style SM fill:#10b981,color:#fff
    style GDDR fill:#3b82f6,color:#fff`,
};

// =============================================================================
// EMBEDDED SYSTEMS
// =============================================================================

/**
 * Microcontroller System template
 */
export const microcontrollerSystem: DiagramTemplate = {
  id: 'comp-microcontroller',
  name: 'Microcontroller System Design',
  description: 'Embedded microcontroller system architecture',
  domain: 'engineering',
  promptTemplate: `Create a microcontroller system design diagram:
- MCU family: {{mcuFamily}}
- CPU core: {{cpuCore}}
- Memory map: {{memoryMap}}
- Peripherals: {{peripherals}}
- Clock system: {{clockSystem}}
- Power management: {{powerManagement}}
- Debug interface: {{debugInterface}}
{{#additionalNotes}}Application requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'mcuFamily',
    'cpuCore',
    'memoryMap',
    'peripherals',
    'clockSystem',
    'powerManagement',
    'debugInterface',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph MCU["Microcontroller"]
        CPU["ARM\\nCortex-M4"]
        FL["Flash\\n256KB"]
        RAM["SRAM\\n64KB"]
    end
    subgraph Peripherals["Peripherals"]
        TIM["Timers"]
        ADC["ADC"]
        UART["UART/SPI/I2C"]
        GPIO["GPIO"]
    end
    subgraph System["System"]
        CLK["Clock\\nSystem"]
        PWR["Power\\nManagement"]
        DBG["Debug\\n(JTAG/SWD)"]
    end
    CPU --> FL & RAM
    CPU --> TIM & ADC & UART & GPIO
    CLK --> CPU
    PWR --> MCU
    DBG --> CPU
    style CPU fill:#10b981,color:#fff
    style FL fill:#3b82f6,color:#fff`,
};

/**
 * FPGA System Design template
 */
export const fpgaSystemDesign: DiagramTemplate = {
  id: 'comp-fpga-system',
  name: 'FPGA System Design',
  description: 'Field-programmable gate array system architecture',
  domain: 'engineering',
  promptTemplate: `Create an FPGA system design diagram:
- FPGA family: {{fpgaFamily}}
- Logic elements: {{logicElements}}
- Block RAM: {{blockRam}}
- DSP blocks: {{dspBlocks}}
- I/O banks: {{ioBanks}}
- Clocking: {{clocking}}
- IP cores: {{ipCores}}
{{#additionalNotes}}Design specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'fpgaFamily',
    'logicElements',
    'blockRam',
    'dspBlocks',
    'ioBanks',
    'clocking',
    'ipCores',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph FPGA["FPGA Fabric"]
        LE["Logic\\nElements"]
        BRAM["Block\\nRAM"]
        DSP["DSP\\nBlocks"]
    end
    subgraph IP["IP Cores"]
        CPU["Soft\\nProcessor"]
        ETH["Ethernet\\nMAC"]
        DDR["DDR\\nController"]
    end
    subgraph IO["I/O"]
        GTX["High-Speed\\nTransceivers"]
        GPIO["General\\nI/O"]
    end
    LE --> CPU
    BRAM --> CPU
    DSP --> CPU
    CPU --> ETH --> GTX
    CPU --> DDR --> GPIO
    style LE fill:#10b981,color:#fff
    style CPU fill:#3b82f6,color:#fff`,
};

/**
 * Real-Time System template
 */
export const realTimeSystem: DiagramTemplate = {
  id: 'comp-realtime-system',
  name: 'Real-Time System Design',
  description: 'Real-time embedded system architecture',
  domain: 'engineering',
  promptTemplate: `Create a real-time system design diagram:
- RTOS: {{rtos}}
- Task scheduling: {{taskScheduling}}
- Priority levels: {{priorityLevels}}
- Interrupt handling: {{interruptHandling}}
- Inter-task communication: {{interTaskComm}}
- Timing constraints: {{timingConstraints}}
- Watchdog: {{watchdog}}
{{#additionalNotes}}Real-time requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'rtos',
    'taskScheduling',
    'priorityLevels',
    'interruptHandling',
    'interTaskComm',
    'timingConstraints',
    'watchdog',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph RTOS["RTOS Kernel"]
        SC["Scheduler"]
        TM["Timer\\nService"]
        SY["Sync\\nPrimitives"]
    end
    subgraph Tasks["Application Tasks"]
        T1["High Priority\\nControl Loop"]
        T2["Medium Priority\\nComm Task"]
        T3["Low Priority\\nLogging"]
    end
    subgraph HW["Hardware"]
        INT["Interrupt\\nHandler"]
        WD["Watchdog"]
    end
    SC --> T1 & T2 & T3
    TM --> SC
    INT --> SC
    T1 --> SY --> T2
    WD --> SC
    style SC fill:#10b981,color:#fff
    style T1 fill:#dc2626,color:#fff`,
};

// =============================================================================
// DIGITAL LOGIC DESIGN
// =============================================================================

/**
 * Digital System Design template
 */
export const digitalSystemDesign: DiagramTemplate = {
  id: 'comp-digital-system',
  name: 'Digital System Design',
  description: 'Digital system with datapath and control',
  domain: 'engineering',
  promptTemplate: `Create a digital system design diagram:
- System function: {{systemFunction}}
- Datapath components: {{datapathComponents}}
- Control unit: {{controlUnit}}
- State machine: {{stateMachine}}
- Timing: {{timing}}
- Interface signals: {{interfaceSignals}}
- Clock domains: {{clockDomains}}
{{#additionalNotes}}Design specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'systemFunction',
    'datapathComponents',
    'controlUnit',
    'stateMachine',
    'timing',
    'interfaceSignals',
    'clockDomains',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Control["Control Unit"]
        FSM["State\\nMachine"]
        DEC["Decoder"]
    end
    subgraph Datapath["Datapath"]
        REG["Registers"]
        ALU["ALU"]
        MUX["Multiplexers"]
    end
    subgraph IO["I/O"]
        IN["Input"]
        OUT["Output"]
    end
    IN --> REG
    FSM --> DEC --> MUX
    REG --> ALU --> REG
    MUX --> ALU
    REG --> OUT
    style FSM fill:#10b981,color:#fff
    style ALU fill:#3b82f6,color:#fff`,
};

/**
 * State Machine Design template
 */
export const stateMachineDesign: DiagramTemplate = {
  id: 'comp-state-machine',
  name: 'State Machine Design',
  description: 'Finite state machine design and implementation',
  domain: 'engineering',
  promptTemplate: `Create a state machine design diagram:
- Machine type: {{machineType}}
- States: {{states}}
- Inputs: {{inputs}}
- Outputs: {{outputs}}
- State transitions: {{stateTransitions}}
- Reset behavior: {{resetBehavior}}
- Encoding: {{encoding}}
{{#additionalNotes}}Implementation notes: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'machineType',
    'states',
    'inputs',
    'outputs',
    'stateTransitions',
    'resetBehavior',
    'encoding',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    IDLE["IDLE"] -->|"start"| FETCH["FETCH"]
    FETCH -->|"ready"| DECODE["DECODE"]
    DECODE -->|"op=add"| EXECUTE["EXECUTE"]
    DECODE -->|"op=load"| MEMORY["MEMORY"]
    EXECUTE -->|"done"| IDLE
    MEMORY -->|"done"| IDLE
    style IDLE fill:#10b981,color:#fff
    style EXECUTE fill:#3b82f6,color:#fff
    style MEMORY fill:#f59e0b,color:#fff`,
};

// =============================================================================
// NETWORK ARCHITECTURE
// =============================================================================

/**
 * Network-on-Chip template
 */
export const networkOnChip: DiagramTemplate = {
  id: 'comp-noc',
  name: 'Network-on-Chip Design',
  description: 'On-chip interconnection network architecture',
  domain: 'engineering',
  promptTemplate: `Create a Network-on-Chip design diagram:
- Topology: {{topology}}
- Router architecture: {{routerArchitecture}}
- Routing algorithm: {{routingAlgorithm}}
- Flow control: {{flowControl}}
- Virtual channels: {{virtualChannels}}
- Nodes: {{nodes}}
- Performance: {{performance}}
{{#additionalNotes}}NoC specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'topology',
    'routerArchitecture',
    'routingAlgorithm',
    'flowControl',
    'virtualChannels',
    'nodes',
    'performance',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph Mesh["2D Mesh NoC"]
        R00["Router\\n(0,0)"]
        R01["Router\\n(0,1)"]
        R10["Router\\n(1,0)"]
        R11["Router\\n(1,1)"]
    end
    subgraph Cores["Processing Elements"]
        C0["Core 0"]
        C1["Core 1"]
        C2["Core 2"]
        C3["Core 3"]
    end
    R00 --- R01
    R00 --- R10
    R01 --- R11
    R10 --- R11
    C0 --> R00
    C1 --> R01
    C2 --> R10
    C3 --> R11
    style R00 fill:#10b981,color:#fff
    style R11 fill:#10b981,color:#fff`,
};

/**
 * Network Interface Card template
 */
export const networkInterfaceCard: DiagramTemplate = {
  id: 'comp-nic',
  name: 'Network Interface Card Design',
  description: 'Network adapter hardware architecture',
  domain: 'engineering',
  promptTemplate: `Create a network interface card design diagram:
- Interface standard: {{interfaceStandard}}
- MAC controller: {{macController}}
- PHY: {{phy}}
- DMA engine: {{dmaEngine}}
- Packet buffers: {{packetBuffers}}
- Offload engines: {{offloadEngines}}
- Host interface: {{hostInterface}}
{{#additionalNotes}}Performance specifications: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'interfaceStandard',
    'macController',
    'phy',
    'dmaEngine',
    'packetBuffers',
    'offloadEngines',
    'hostInterface',
    'additionalNotes',
  ],
  mermaidExample: `flowchart LR
    subgraph Host["Host Interface"]
        PCIE["PCIe\\nController"]
        DMA["DMA\\nEngine"]
    end
    subgraph NIC["NIC Core"]
        BUF["Packet\\nBuffers"]
        MAC["MAC\\nController"]
        OFF["Offload\\n(TSO/RSS)"]
    end
    subgraph Network["Network"]
        PHY["PHY\\n10GbE"]
        CON["Connector"]
    end
    PCIE --> DMA --> BUF
    BUF --> MAC --> PHY --> CON
    OFF --> MAC
    style MAC fill:#10b981,color:#fff
    style PHY fill:#3b82f6,color:#fff`,
};

// =============================================================================
// SECURITY
// =============================================================================

/**
 * Hardware Security Module template
 */
export const hardwareSecurityModule: DiagramTemplate = {
  id: 'comp-hsm',
  name: 'Hardware Security Module',
  description: 'Cryptographic hardware security architecture',
  domain: 'engineering',
  promptTemplate: `Create a hardware security module design diagram:
- Crypto engines: {{cryptoEngines}}
- Key storage: {{keyStorage}}
- Random number generator: {{rng}}
- Tamper protection: {{tamperProtection}}
- Secure boot: {{secureBoot}}
- Interface: {{interface}}
- Certification: {{certification}}
{{#additionalNotes}}Security requirements: {{additionalNotes}}{{/additionalNotes}}`,
  placeholders: [
    'cryptoEngines',
    'keyStorage',
    'rng',
    'tamperProtection',
    'secureBoot',
    'interface',
    'certification',
    'additionalNotes',
  ],
  mermaidExample: `flowchart TB
    subgraph HSM["HSM Module"]
        CPU["Secure\\nProcessor"]
        AES["AES\\nEngine"]
        RSA["RSA\\nEngine"]
        RNG["TRNG"]
    end
    subgraph Keys["Key Management"]
        KS["Key\\nStorage"]
        KW["Key\\nWrapping"]
    end
    subgraph Protection["Security"]
        TP["Tamper\\nDetection"]
        SB["Secure\\nBoot"]
    end
    CPU --> AES & RSA
    RNG --> CPU
    CPU --> KS --> KW
    TP --> CPU
    SB --> CPU
    style CPU fill:#dc2626,color:#fff
    style KS fill:#10b981,color:#fff`,
};

// =============================================================================
// Export all templates
// =============================================================================

export const computerTemplates: DiagramTemplate[] = [
  // Processor Design
  cpuArchitecture,
  pipelineDesign,
  multicoreProcessor,
  // Memory Systems
  memoryHierarchy,
  cacheDesign,
  virtualMemorySystem,
  // Computer Architecture
  systemBusArchitecture,
  ioSystemArchitecture,
  gpuArchitecture,
  // Embedded Systems
  microcontrollerSystem,
  fpgaSystemDesign,
  realTimeSystem,
  // Digital Logic Design
  digitalSystemDesign,
  stateMachineDesign,
  // Network Architecture
  networkOnChip,
  networkInterfaceCard,
  // Security
  hardwareSecurityModule,
];
