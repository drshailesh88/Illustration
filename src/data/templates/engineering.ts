/**
 * engineering.ts
 * Engineering diagram templates for FINNISH
 *
 * Contains templates for system design, software architecture,
 * and technical documentation diagrams.
 */

import type { DiagramTemplate } from './index';

/**
 * Block Diagram template
 */
export const blockDiagram: DiagramTemplate = {
  id: 'eng-block-diagram',
  name: 'Block Diagram',
  description:
    'System block diagram showing functional components and signal flow',
  domain: 'engineering',
  promptTemplate: `Create a block diagram:
- System name: {{systemName}}
- Input signals: {{inputs}}
- Output signals: {{outputs}}
- Processing blocks: {{processingBlocks}}
- Feedback loops: {{feedbackLoops}}
- Control signals: {{controlSignals}}
- Signal types: {{signalTypes}}
- Interfaces: {{interfaces}}
- Subsystem boundaries: {{subsystems}}`,
  placeholders: [
    'systemName',
    'inputs',
    'outputs',
    'processingBlocks',
    'feedbackLoops',
    'controlSignals',
    'signalTypes',
    'interfaces',
    'subsystems',
  ],
  mermaidExample: `flowchart LR
    subgraph input["Input Stage"]
        sensor["Sensor<br/>Input"]
        adc["ADC"]
    end

    subgraph processing["Processing"]
        filter["Digital<br/>Filter"]
        controller["PID<br/>Controller"]
    end

    subgraph output["Output Stage"]
        dac["DAC"]
        actuator["Actuator"]
    end

    subgraph feedback["Feedback"]
        fb_sensor["Feedback<br/>Sensor"]
    end

    sensor -->|"Analog"| adc
    adc -->|"Digital"| filter
    filter --> controller
    controller -->|"Control Signal"| dac
    dac -->|"Analog"| actuator
    actuator -->|"Physical"| fb_sensor
    fb_sensor -->|"Feedback"| controller

    classDef input fill:#dbeafe,stroke:#2563eb
    classDef process fill:#fef3c7,stroke:#d97706
    classDef output fill:#dcfce7,stroke:#16a34a
    classDef feedback fill:#f3e8ff,stroke:#9333ea

    class sensor,adc input
    class filter,controller process
    class dac,actuator output
    class fb_sensor feedback`,
};

/**
 * State Machine template
 */
export const stateMachine: DiagramTemplate = {
  id: 'eng-state-machine',
  name: 'State Machine',
  description:
    'Finite state machine diagram showing states, transitions, and events',
  domain: 'engineering',
  promptTemplate: `Create a state machine diagram:
- System/component name: {{systemName}}
- Initial state: {{initialState}}
- Final/accepting states: {{finalStates}}
- All states: {{states}}
- Transitions: {{transitions}}
- Events/triggers: {{events}}
- Guards/conditions: {{guards}}
- Actions: {{actions}}
- State entry/exit actions: {{entryExitActions}}`,
  placeholders: [
    'systemName',
    'initialState',
    'finalStates',
    'states',
    'transitions',
    'events',
    'guards',
    'actions',
    'entryExitActions',
  ],
  mermaidExample: `stateDiagram-v2
    [*] --> Idle

    Idle --> Processing : start / initBuffer()
    Processing --> Waiting : dataReady / sendData()
    Waiting --> Processing : ack / processNext()
    Waiting --> Error : timeout / logError()
    Processing --> Complete : done / cleanup()
    Error --> Idle : reset / clearError()
    Complete --> Idle : restart
    Complete --> [*] : shutdown

    state Processing {
        [*] --> Reading
        Reading --> Validating : readComplete
        Validating --> Transforming : valid
        Validating --> Reading : invalid
        Transforming --> [*] : transformed
    }`,
};

/**
 * Flowchart template
 */
export const flowchart: DiagramTemplate = {
  id: 'eng-flowchart',
  name: 'Flowchart',
  description:
    'Process flowchart showing steps, decisions, and control flow',
  domain: 'engineering',
  promptTemplate: `Create a flowchart:
- Process name: {{processName}}
- Start condition: {{startCondition}}
- Process steps: {{processSteps}}
- Decision points: {{decisionPoints}}
- Parallel processes: {{parallelProcesses}}
- Loop structures: {{loops}}
- End conditions: {{endConditions}}
- Error handling: {{errorHandling}}
- Swimlanes (if applicable): {{swimlanes}}`,
  placeholders: [
    'processName',
    'startCondition',
    'processSteps',
    'decisionPoints',
    'parallelProcesses',
    'loops',
    'endConditions',
    'errorHandling',
    'swimlanes',
  ],
  mermaidExample: `flowchart TB
    start(["Start"])

    input["Receive Input"]
    validate{"Valid Input?"}

    process1["Process Data"]
    process2["Transform Data"]

    check{"Quality Check<br/>Passed?"}

    output["Generate Output"]
    error["Log Error"]
    retry{"Retry?"}

    finish(["End"])

    start --> input
    input --> validate
    validate -->|Yes| process1
    validate -->|No| error
    process1 --> process2
    process2 --> check
    check -->|Yes| output
    check -->|No| error
    error --> retry
    retry -->|Yes| input
    retry -->|No| finish
    output --> finish

    classDef start fill:#dcfce7,stroke:#16a34a
    classDef process fill:#dbeafe,stroke:#2563eb
    classDef decision fill:#fef3c7,stroke:#d97706
    classDef error fill:#fee2e2,stroke:#dc2626

    class start,finish start
    class input,process1,process2,output process
    class validate,check,retry decision
    class error error`,
};

/**
 * Network Topology template
 */
export const networkTopology: DiagramTemplate = {
  id: 'eng-network-topology',
  name: 'Network Topology',
  description:
    'Network diagram showing nodes, connections, and infrastructure',
  domain: 'engineering',
  promptTemplate: `Create a network topology diagram:
- Network type: {{networkType}}
- Topology style: {{topologyStyle}}
- Nodes/devices: {{nodes}}
- Connections: {{connections}}
- Subnets: {{subnets}}
- IP addressing: {{ipAddressing}}
- Protocols: {{protocols}}
- Security zones: {{securityZones}}
- Bandwidth/capacity: {{bandwidth}}
- Redundancy: {{redundancy}}`,
  placeholders: [
    'networkType',
    'topologyStyle',
    'nodes',
    'connections',
    'subnets',
    'ipAddressing',
    'protocols',
    'securityZones',
    'bandwidth',
    'redundancy',
  ],
  mermaidExample: `flowchart TB
    subgraph internet["Internet"]
        cloud["Cloud<br/>Services"]
    end

    subgraph dmz["DMZ (10.0.1.0/24)"]
        fw1["Firewall"]
        lb["Load<br/>Balancer"]
        web1["Web Server 1"]
        web2["Web Server 2"]
    end

    subgraph internal["Internal Network (10.0.2.0/24)"]
        fw2["Internal<br/>Firewall"]
        app1["App Server 1"]
        app2["App Server 2"]
    end

    subgraph data["Data Tier (10.0.3.0/24)"]
        db1["Primary DB"]
        db2["Replica DB"]
    end

    cloud --> fw1
    fw1 --> lb
    lb --> web1
    lb --> web2
    web1 --> fw2
    web2 --> fw2
    fw2 --> app1
    fw2 --> app2
    app1 --> db1
    app2 --> db1
    db1 -.->|"replication"| db2

    classDef internet fill:#f3e8ff,stroke:#9333ea
    classDef dmz fill:#fef3c7,stroke:#d97706
    classDef internal fill:#dbeafe,stroke:#2563eb
    classDef data fill:#dcfce7,stroke:#16a34a

    class cloud internet
    class fw1,lb,web1,web2 dmz
    class fw2,app1,app2 internal
    class db1,db2 data`,
};

/**
 * Data Flow Diagram template
 */
export const dataFlowDiagram: DiagramTemplate = {
  id: 'eng-data-flow',
  name: 'Data Flow Diagram',
  description:
    'DFD showing data movement between processes, stores, and external entities',
  domain: 'engineering',
  promptTemplate: `Create a data flow diagram:
- System name: {{systemName}}
- DFD level: {{dfdLevel}}
- External entities: {{externalEntities}}
- Processes: {{processes}}
- Data stores: {{dataStores}}
- Data flows: {{dataFlows}}
- Data transformations: {{transformations}}
- Security boundaries: {{securityBoundaries}}`,
  placeholders: [
    'systemName',
    'dfdLevel',
    'externalEntities',
    'processes',
    'dataStores',
    'dataFlows',
    'transformations',
    'securityBoundaries',
  ],
  mermaidExample: `flowchart LR
    subgraph external["External Entities"]
        customer["Customer"]
        supplier["Supplier"]
    end

    subgraph processes["Processes"]
        p1(["1.0<br/>Process<br/>Order"])
        p2(["2.0<br/>Manage<br/>Inventory"])
        p3(["3.0<br/>Generate<br/>Reports"])
    end

    subgraph stores["Data Stores"]
        d1[("D1: Orders")]
        d2[("D2: Inventory")]
        d3[("D3: Customers")]
    end

    customer -->|"Order Request"| p1
    p1 -->|"Order Confirmation"| customer
    p1 -->|"Order Data"| d1
    p1 -->|"Inventory Query"| p2
    p2 -->|"Stock Level"| p1
    p2 <-->|"Inventory Data"| d2
    supplier -->|"Supply Info"| p2
    p2 -->|"Reorder Request"| supplier
    d1 -->|"Order History"| p3
    d2 -->|"Stock Data"| p3
    d3 -->|"Customer Data"| p3
    p3 -->|"Reports"| customer

    classDef external fill:#f3e8ff,stroke:#9333ea
    classDef process fill:#dbeafe,stroke:#2563eb
    classDef store fill:#dcfce7,stroke:#16a34a

    class customer,supplier external
    class p1,p2,p3 process
    class d1,d2,d3 store`,
};

/**
 * UML Class Diagram template
 */
export const umlClassDiagram: DiagramTemplate = {
  id: 'eng-uml-class',
  name: 'UML Class Diagram',
  description:
    'UML class diagram showing classes, attributes, methods, and relationships',
  domain: 'engineering',
  promptTemplate: `Create a UML class diagram:
- System/module name: {{systemName}}
- Classes: {{classes}}
- Attributes for each class: {{attributes}}
- Methods for each class: {{methods}}
- Inheritance relationships: {{inheritance}}
- Associations: {{associations}}
- Aggregation/composition: {{aggregation}}
- Interfaces: {{interfaces}}
- Abstract classes: {{abstractClasses}}
- Visibility modifiers: {{visibility}}`,
  placeholders: [
    'systemName',
    'classes',
    'attributes',
    'methods',
    'inheritance',
    'associations',
    'aggregation',
    'interfaces',
    'abstractClasses',
    'visibility',
  ],
  mermaidExample: `classDiagram
    class Animal {
        <<abstract>>
        -String name
        -int age
        +getName() String
        +getAge() int
        +makeSound()* void
    }

    class Dog {
        -String breed
        +fetch() void
        +makeSound() void
    }

    class Cat {
        -boolean isIndoor
        +scratch() void
        +makeSound() void
    }

    class Owner {
        -String name
        -List~Animal~ pets
        +addPet(Animal) void
        +feedAll() void
    }

    class Veterinarian {
        -String specialty
        +examine(Animal) Report
        +vaccinate(Animal) void
    }

    Animal <|-- Dog : extends
    Animal <|-- Cat : extends
    Owner "1" --> "*" Animal : owns
    Veterinarian --> Animal : treats`,
};

/**
 * All engineering templates exported as an array
 */
export const engineeringTemplates: DiagramTemplate[] = [
  blockDiagram,
  stateMachine,
  flowchart,
  networkTopology,
  dataFlowDiagram,
  umlClassDiagram,
];
