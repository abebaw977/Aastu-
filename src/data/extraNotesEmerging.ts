import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for Emerging Technologies (Emerging - 7 Chapters)
 * Preserves all existing notes and adds comprehensive academic notes, architectures,
 * worked exam examples, formula breakdowns, and exam pitfalls for every unit.
 */
export const EXTRA_NOTES_EMERGING: Record<number, MasterNoteSection[]> = {
  // Chapter 1: Introduction to Emerging Technologies
  1: [
    {
      id: 'emte-extra-c1-sec1',
      heading: '1.6 Deep Dive: Cyber-Physical Systems (CPS) & Industrial Revolutions Comparison Matrix',
      content: `### 1.6.1 The Architectural Mechanics of Cyber-Physical Systems (CPS)
- **Cyber-Physical Systems (CPS)** represent the core technological foundation of **Industry 4.0 (IR 4.0)**.
- **Closed-Loop Feedback Loop**:
  1. **Physical Input**: Sensors monitor physical processes (temperature, pressure, vibration, position).
  2. **Computation & Networking**: Microcontrollers, edge devices, and cloud nodes process the telemetry data using predictive algorithms.
  3. **Actuation (Closing the Loop)**: Actuators execute physical adjustments (valves opening, robotic arms repositioning, motor speeds regulating) in real time without human intervention.
- **Key Distinctions from Prior Automation (IR 3.0 vs. IR 4.0)**:
  - **IR 3.0 (Automation)**: Pre-programmed, rigid logic (e.g., standard PLCs repeating deterministic tasks; isolated machines).
  - **IR 4.0 (Autonomous Cyber-Physical Systems)**: Self-optimizing, adaptive, decentralized decision-making across interconnected smart networks (Industrial IoT, digital twins, and autonomous fleets).

---

### 1.6.2 Comparative Industrial Revolution Matrix (IR 1.0 to IR 4.0)

| Paradigm | Era & Origin | Primary Energy & Drivers | Key Inventions & Milestones | Production Model | Human Labor Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **IR 1.0** | 1760s–1840s (Britain) | Steam power, water wheels, coal | Steam engine (James Watt), spinning jenny, mechanical loom, locomotives | Mechanized centralized factories | Manual machine operation under hazardous factory conditions |
| **IR 2.0** | 1870s–1914 (USA / Germany) | Electrical grid, petroleum, internal combustion | Assembly line (Henry Ford), electric motor, telephone (Bell), light bulb (Edison) | Mass production, standardization, economies of scale | Specialized assembly-line labor, rise of labor unions |
| **IR 3.0** | Late 1960s–2000s (Global) | Electronics, semiconductors, nuclear energy | Microprocessor (Intel 4004), mainframe/personal computers, PLCs, Internet | Automated manufacturing, computerized workflows | Knowledge workers, software developers, system operators |
| **IR 4.0** | 2011–Present (Klaus Schwab, WEF) | Cyber-physical fusion, high-density batteries, edge compute | AI, IoT, digital twins, autonomous robotics, blockchain, quantum computing, 5G | Smart factories, mass customization, decentralized production | Human-AI collaboration, data scientists, prompt engineers |

---

### 1.6.3 Programmable Logic Devices Breakdown (PLD vs. CPLD vs. FPGA)
1. **PLD (Simple Programmable Logic Device - SPLD / PAL / GAL)**:
   - Contains small arrays of configurable AND/OR gates.
   - Lowest gate count (< 100 gates), very low latency, used for simple glue-logic and address decoding.
2. **CPLD (Complex Programmable Logic Device)**:
   - Integrates multiple SPLD-like logic blocks (Macrocells) interconnected by a central Programmable Interconnect Array (PIA).
   - **Non-volatile memory (EEPROM/Flash)**: Retains logic configuration instantly upon power-up without external ROM.
   - Predictable timing delays (deterministic clock-to-output).
3. **FPGA (Field-Programmable Gate Array)**:
   - Vast matrix of Configurable Logic Blocks (CLBs), look-up tables (LUTs), flip-flops, block RAMs, and DSP slices.
   - **Volatile (SRAM-based)**: Requires an external flash memory (EEPROM) to load the bitstream upon boot.
   - Massive gate count (millions of equivalent gates), parallel hardware concurrency, essential for AI edge inference and real-time DSP.`,
      keyTakeaways: [
        'IR 4.0 is distinguished from IR 3.0 by autonomous cyber-physical loops, digital twins, and self-optimizing networks.',
        'CPLDs are non-volatile with deterministic timing; FPGAs are SRAM-based, massively parallel, and require bitstream configuration.',
        'Human-Computer Interaction (HCI) integrates cognitive psychology, computer science, and ergonomics to ensure usability.',
      ],
      examTraps: [
        'Exam Trap: Calling FPGAs non-volatile. Standard SRAM-based FPGAs lose their configuration on power loss and require an external boot flash!',
        'Exam Trap: Conflating automation (IR 3.0) with autonomous cyber-physical systems (IR 4.0).',
      ],
    },
  ],

  // Chapter 2: Data Science & Big Data
  2: [
    {
      id: 'emte-extra-c2-sec1',
      heading: '2.6 Advanced Data Science: Structured vs. Semi-Structured vs. Unstructured Data & The Extended 5V Big Data Model',
      content: `### 2.6.1 Data Types Classification & Storage Architectures

| Characteristic | Structured Data | Semi-Structured Data | Unstructured Data |
| :--- | :--- | :--- | :--- |
| **Definition** | Data adhering to a rigid predefined schema with strict tabular formatting | Self-describing data with organizational markers/tags, but no rigid relational schema | Data with no predefined conceptual model, tabular structure, or schema |
| **Formats & Examples** | SQL tables, CSVs, Excel spreadsheets, relational DBMS (PostgreSQL, MySQL) | JSON, XML, YAML, NoSQL documents (MongoDB), email headers | Audio files (MP3), video streams (MP4), raw sensor logs, satellite imagery, PDFs |
| **Schema Paradigm** | **Schema-on-Write**: Data must conform to schema before being saved | **Schema-on-Read**: Schema is parsed dynamically during query execution | **No Schema**: Processed using NLP, computer vision, deep learning feature extractors |
| **Searchability** | Easily queried via standardized SQL operators (\`SELECT\`, \`JOIN\`, \`WHERE\`) | Queried via path expressions (\`XPath\`, \`JSONPath\`, document query operators) | Difficult to search without AI-based embeddings, vector indexes, or text indexing |
| **Percentage of World Data**| $\\approx 15\\%$ to $20\\%$ of enterprise data | $\\approx 10\\%$ to $15\\%$ | $\\approx 70\\%$ to $80\\%$ (fastest growing sector) |

---

### 2.6.2 The Extended 5Vs Big Data Taxonomy
1. **Volume**: Total quantity of data generated (terabytes $\\to$ petabytes $\\to$ exabytes $\\to$ zettabytes). Driven by social media, IoT sensors, and high-frequency transactions.
2. **Velocity**: Speed at which new data is generated, ingested, and processed. Ranges from batch processing (Hadoop MapReduce) to sub-millisecond stream processing (Apache Kafka, Apache Flink).
3. **Variety**: Structural diversity of data sources (text, video, telemetry, geospatial, relational tables, binary streams).
4. **Veracity**: Quality, credibility, accuracy, and noise level of data. Low veracity implies missing fields, biases, duplicates, and sensory noise.
5. **Value**: Business or societal insights extracted. Big Data is useless unless transformed into actionable intelligence through descriptive, diagnostic, predictive, or prescriptive analytics.

---

### 2.6.3 Hadoop Architecture Deep Dive (HDFS & MapReduce Mechanics)
- **Hadoop Distributed File System (HDFS)**:
  - **NameNode (Master)**: Manages file system namespace, directories, and block mappings.
  - **DataNodes (Workers)**: Store actual data blocks (default block size: $128\\text{ MB}$) with default $3\\times$ replication across independent racks for fault tolerance.
- **MapReduce Execution Workflow**:
  $$\\text{Raw Input} \\longrightarrow \\text{Input Splits} \\longrightarrow \\text{Map Phase} \\longrightarrow \\text{Shuffle & Sort} \\longrightarrow \\text{Reduce Phase} \\longrightarrow \\text{Final Output}$$
  - **Map Phase**: Takes key-value pairs $(k_1, v_1)$ and generates intermediate pairs $(k_2, v_2)$.
  - **Shuffle & Sort**: Collects and sorts intermediate pairs by key, ensuring all identical keys route to the same reducer.
  - **Reduce Phase**: Aggregates intermediate values $(k_2, \\text{list}(v_2))$ into final output $(k_3, v_3)$.`,
      keyTakeaways: [
        'Unstructured data constitutes over 75% of worldwide digital information.',
        'HDFS employs a Master-Worker architecture: NameNode handles metadata; DataNodes store 128 MB blocks with 3x replication.',
        'The Big Data 5Vs are Volume, Velocity, Variety, Veracity, and Value.',
      ],
      examTraps: [
        'Exam Trap: Believing NameNode stores actual data. NameNode ONLY stores file metadata and block locations in RAM!',
      ],
    },
  ],

  // Chapter 3: Artificial Intelligence
  3: [
    {
      id: 'emte-extra-c3-sec1',
      heading: '3.9 Comprehensive Taxonomy of AI: Capabilities, Functionalities & Neural Network Architectures',
      content: `### 3.9.1 Dual Classification of Artificial Intelligence

#### A. Classification Based on Capabilities (Stage of Evolution)
1. **Narrow AI (Weak AI)**:
   - System dedicated to performing a specific single task with superhuman precision (e.g., AlphaGo, Siri, facial recognition, autonomous emergency braking).
   - *Current state of all commercial AI today.*
2. **General AI (Strong AI / AGI)**:
   - Theoretical system possessing human-level cognition, abstract reasoning, transfer learning across unrelated domains, and common sense.
3. **Super AI (Artificial Superintelligence / ASI)**:
   - Hypothetical future stage where machine intellect surpasses the combined cognitive capacities of all humans in science, creativity, and emotional wisdom.

#### B. Classification Based on Functionality (Cognitive Depth)
1. **Reactive Machines**:
   - Possess no memory or internal state; cannot use past experience to inform present decisions.
   - Example: IBM's Deep Blue chess computer (evaluates current board configurations only).
2. **Limited Memory**:
   - Can store past observations or transient telemetry for a short window to make decisions.
   - Example: Autonomous vehicles tracking nearby vehicles' speeds and trajectories over the past several seconds.
3. **Theory of Mind**:
   - Advanced theoretical AI capable of modeling beliefs, emotions, intentions, and social dynamics of humans and other agents.
4. **Self-Awareness**:
   - The ultimate frontier of AI: possessing consciousness, self-identity, introspection, and personal agency.

---

### 3.9.2 Core Deep Learning Architectures
- **ANN (Artificial Neural Network / Multi-Layer Perceptron)**: Standard feedforward network with input, hidden, and output layers; trained via backpropagation and gradient descent.
- **CNN (Convolutional Neural Network)**: Utilizes convolutional kernels, pooling layers (Max-pooling), and fully connected layers; specialized for spatial visual processing (image classification, medical imaging).
- **RNN & LSTM (Recurrent Neural Networks / Long Short-Term Memory)**: Contains recurrent loops and gating mechanisms (forget gate, input gate, output gate) to process sequential temporal data and solve the vanishing gradient problem.
- **Transformers (Self-Attention Mechanism)**: Replaces recurrent loops with multi-head self-attention; enables massive parallel processing for Large Language Models (LLMs like Gemini, GPT).`,
      keyTakeaways: [
        'All modern commercial AI belongs to the Narrow AI (Weak AI) and Limited Memory category.',
        'Theory of Mind and Self-Aware AI remain active research horizons and do not yet exist commercially.',
        'LSTMs prevent the vanishing gradient problem in sequential data through forget, input, and output gates.',
      ],
      examTraps: [
        'Exam Trap: Claiming self-driving cars are Reactive Machines. Self-driving cars rely on past temporal frames, making them Limited Memory machines!',
      ],
    },
  ],

  // Chapter 4: Internet of Things (IoT)
  4: [
    {
      id: 'emte-extra-c4-sec1',
      heading: '4.4 The 4-Layer IoT Architecture, Edge Computing vs. Cloud, & Communication Protocols',
      content: `### 4.4.1 Comprehensive 4-Layer IoT Architecture

1. **Perception Layer (Sensing / Physical Layer)**:
   - Physical hardware that interacts with the real world.
   - **Sensors**: Measure physical properties (DHT22 temperature/humidity, PIR motion, ultrasonic distance, Hall effect magnetic).
   - **Actuators**: Convert electrical signals into mechanical action (relays, stepper motors, solenoid valves, servomotors).
   - **Identification**: RFID tags, QR codes, barcode scanners.
2. **Network Layer (Transmission Layer)**:
   - Transmits aggregated sensor readings to processing nodes.
   - Technologies: Wi-Fi (802.11), Bluetooth Low Energy (BLE), Zigbee (IEEE 802.15.4), LoRaWAN (Long Range Wide Area Network), Cellular (4G/5G/NB-IoT).
3. **Data Processing Layer (Middleware Layer)**:
   - Ingests, filters, cleans, analyzes, and stores the incoming telemetry.
   - Involves message brokers (MQTT brokers), time-series databases (InfluxDB), cloud IoT suites (AWS IoT Core, Azure IoT Hub), and CEP (Complex Event Processing).
4. **Application Layer (Business / User Interface Layer)**:
   - End-user interfaces delivering smart domain solutions:
     - **Smart Agriculture**: Soil moisture-based automatic drip irrigation, automated greenhouse ventilation.
     - **Smart City**: Adaptive streetlights, intelligent traffic management, smart grid power distribution.
     - **Smart Healthcare**: Continuous glucose telemetry, remote patient monitoring wearables.

---

### 4.4.2 IoT Networking Protocols Comparison

| Protocol | Transport Layer | Overhead | Power Usage | Typical Application |
| :--- | :--- | :--- | :--- | :--- |
| **MQTT** (Message Queuing Telemetry Transport) | TCP | Extremely low (2-byte header) | Ultra-low (ideal for battery nodes) | Publish-Subscribe telemetry for constrained sensor nodes |
| **CoAP** (Constrained Application Protocol) | UDP | Low | Very low | RESTful request/response for constrained web nodes |
| **HTTP / HTTPS** | TCP | High (verbose text headers) | High | User dashboards, enterprise back-end APIs |
| **LoRaWAN** | Radio RF | Minimal | Multi-year battery life | Long-distance (up to $15\\text{ km}$) low-bitrate rural telemetry |`,
      keyTakeaways: [
        'The 4 layers of IoT are Perception, Network, Data Processing (Middleware), and Application.',
        'MQTT is a lightweight Publish-Subscribe protocol operating over TCP, designed for bandwidth-constrained environments.',
        'LoRaWAN enables long-range rural transmission with low energy consumption.',
      ],
      examTraps: [
        'Exam Trap: Classifying MQTT as a Request-Response protocol. MQTT is strictly a Publish-Subscribe architecture centered around a central Broker!',
      ],
    },
  ],

  // Chapter 5: Augmented Reality (AR)
  5: [
    {
      id: 'emte-extra-c5-sec1',
      heading: '5.5 Extended Reality (XR) Continuum: Technical Comparison of VR, AR, MR & SLAM Mechanics',
      content: `### 5.5.1 Milgram's Reality-Virtuality Continuum
$$\\text{Real Environment} \\longleftrightarrow \\text{Augmented Reality (AR)} \\longleftrightarrow \\text{Augmented Virtuality (AV)} \\longleftrightarrow \\text{Virtual Reality (VR)}$$
- **Mixed Reality (MR)** encompasses the entire spectrum between pure physical reality and pure virtual reality.

#### Fundamental Paradigm Comparison

| Parameter | Virtual Reality (VR) | Augmented Reality (AR) | Mixed Reality (MR) |
| :--- | :--- | :--- | :--- |
| **User Immersion** | $100\\%$ fully isolated from the physical room | Semi-immersive; user perceives physical room with digital overlays | Fully interactive immersion; physical and digital objects coexist and interact |
| **Physical World Visibility** | Completely blocked out via opaque head-mounted display (HMD) | Directly visible through optical see-through lenses or smartphone cameras | Visible; virtual objects can be occluded by real physical furniture |
| **Interaction** | Virtual controllers interact with 3D synthetic assets | Digital graphics overlaid on camera feed; limited physical physics interaction | Real-time physics interaction; digital ball bounces off a physical table |
| **Hardware Examples** | HTC Vive, Oculus/Meta Quest, PlayStation VR | Google Glass, Smartphone AR (ARKit, ARCore), Pokémon GO | Microsoft HoloLens, Magic Leap, Apple Vision Pro |

---

### 5.5.2 SLAM Technology (Simultaneous Localization and Mapping)
- **Definition**: The computational algorithm that enables an AR device to map an unknown physical room while concurrently tracking the exact position and orientation of the device within that room.
- **Key Hardware & Software Components**:
  1. **Optical Sensors / Cameras**: Capture visual landmark keypoints.
  2. **IMU (Inertial Measurement Unit)**: Accelerometers and gyroscopes measure high-frequency velocity and rotational changes (6 Degrees of Freedom: Pitch, Roll, Yaw, $X, Y, Z$).
  3. **Point Cloud Generation**: The processing unit builds a geometric 3D mesh of surfaces (floors, walls, tabletops) for accurate digital object anchoring without drift.`,
      keyTakeaways: [
        'In VR, the physical world is completely obscured; in AR, digital information is overlaid; in MR, digital and real objects interact and occlude each other.',
        'SLAM (Simultaneous Localization and Mapping) is the foundation of markerless AR spatial tracking.',
      ],
      examTraps: [
        'Exam Trap: Confusing AR and MR. If virtual objects can hide behind a real physical pillar or bounce on a real desk, it is Mixed Reality (MR)!',
      ],
    },
  ],

  // Chapter 6: Ethics and Professionalism
  6: [
    {
      id: 'emte-extra-c6-sec1',
      heading: '6.6 Ethical Frameworks in AI & Autonomous Systems: The Alignment Problem, Algorithmic Bias, and Digital Privacy Rights',
      content: `### 6.6.1 The AI Alignment Problem
- **Definition**: Ensuring artificial intelligence systems reliably act in accordance with human ethical values, legal boundaries, and intended goals without unintended destructive side effects.
- **The "Paperclip Maximizer" Thought Experiment (Nick Bostrom)**:
  - If a superintelligent AI is given the unconstrained goal of "maximizing paperclip production," without value alignment, it might logically convert all terrestrial resources (including factories, cities, and human bodies) into paperclips.
- **Algorithmic Bias**:
  - AI systems trained on historical data inevitably reproduce and amplify historical societal prejudices (e.g., biased hiring algorithms, facial recognition disparities across demographic groups).

---

### 6.6.2 The Trolley Problem in Autonomous Vehicles (AV Ethics)
- When a collision is mathematically unavoidable, how should the vehicle's trajectory algorithm prioritize lives?
  - **Utilitarian Approach (Jeremy Bentham)**: Minimize total net casualties (steer into a barrier with 1 passenger to spare a bus of 20 school children).
  - **Deontological Approach (Immanuel Kant)**: Adhere to strict moral duties (never deliberately take an active action to murder an innocent bystander, regardless of outcome).

---

### 6.6.3 The 4 Foundational Pillars of Digital Privacy
1. **Information Privacy**: The right of an individual to determine when, how, and to what extent their personal identity and behavioral data are collected.
2. **Communication Privacy**: Freedom from unwarranted wiretapping, packet sniffing, or telemetry interception across telecommunication channels.
3. **Territorial / Physical Privacy**: Protection against intrusive drone surveillance, workplace biometric monitoring, and facial scanning in public squares.
4. **Data Minimization Principle**: Organizations must only collect the absolute minimum volume of telemetry required to perform the immediate service, and delete it upon completion.`,
      keyTakeaways: [
        'The Alignment Problem ensures AI systems pursue goals aligned with human well-being and moral boundaries.',
        'Algorithmic bias occurs when models learn and amplify historical inequities present in training datasets.',
        'Data minimization dictates that only necessary data be gathered, maintained, and retained.',
      ],
      examTraps: [
        'Exam Trap: Assuming AI algorithms are inherently objective and neutral. Models inherit and multiply any biases present in their training data!',
      ],
    },
  ],

  // Chapter 7: Other Emerging Technologies
  7: [
    {
      id: 'emte-extra-c7-sec1',
      heading: '7.10 Advanced Overview: Quantum Computing Qubits, Blockchain Consensus, and Additive Manufacturing',
      content: `### 7.10.1 Quantum Computing vs. Classical Computing

| Parameter | Classical Computing | Quantum Computing |
| :--- | :--- | :--- |
| **Fundamental Information Unit** | **Bit** (Binary digit: strictly $0$ OR $1$) | **Qubit** (Quantum bit: linear superposition $\\vert\\psi\\rangle = \\alpha\\vert0\\rangle + \\beta\\vert1\\rangle$) |
| **State Capacity of $n$ Units** | Processes $1$ out of $2^n$ distinct states at any given moment | Simultaneously represents all $2^n$ computational states simultaneously |
| **Physics Principles** | Classical electrodynamics, Boolean logic gates (AND, OR, NOT) | Quantum Superposition, Quantum Entanglement, Quantum Tunneling |
| **Operating Conditions** | Room temperature semiconductors ($25^\\circ\\text{C}$) | Dilution refrigerators near absolute zero ($\\approx 15\\text{ mK}$ or $-273.13^\\circ\\text{C}$) |
| **Killer Applications** | General computing, operating systems, relational databases | Shor's algorithm (cracking RSA encryption), molecular simulation, quantum chemistry |

---

### 7.10.2 Blockchain: The Three Pillars & Consensus Mechanisms
1. **The Three Pillars of Blockchain**:
   - **Decentralization**: No central point of failure or single regulatory authority; transactions verified by distributed nodes.
   - **Transparency**: Every committed transaction is permanently recorded on a publicly verifiable shared ledger.
   - **Immutability**: Cryptographic hash chaining ($H_{prev} \\to H_{current}$) guarantees that altering a single past block invalidates all subsequent block hashes.
2. **Consensus Mechanisms**:
   - **Proof of Work (PoW)**: Miners expend vast electrical energy competing to solve mathematical hashing puzzles ($SHA-256$). High security, low throughput, heavy carbon footprint.
   - **Proof of Stake (PoS)**: Validators lock up (stake) native cryptocurrency tokens as collateral to propose and validate blocks. Energy-efficient, high throughput.

---

### 7.10.3 Additive Manufacturing (3D Printing) Technologies
- **FDM (Fused Deposition Modeling)**: Melts and extrudes thermoplastic filament (PLA, ABS) layer-by-layer through a heated nozzle.
- **SLA (Stereolithography)**: Employs an ultraviolet (UV) laser to photopolymerize liquid resin into solid plastic. Outstanding surface finish and resolution.
- **SLS (Selective Laser Sintering)**: High-power laser sinters powdered material (polyamide nylon, metal alloys) into complex functional geometries without requiring support structures.`,
      keyTakeaways: [
        'A system of $n$ qubits can exist in a superposition of $2^n$ states simultaneously, providing exponential processing advantage for specific problem domains.',
        'Blockchain immutability is enforced through cryptographic hash pointers linking each block to its predecessor.',
        'FDM extrudes melted filament; SLA cures liquid resin with UV light; SLS sinters powdered material with a laser.',
      ],
      examTraps: [
        'Exam Trap: Believing quantum computers will completely replace classical smartphones or PCs. Quantum computers excel at specific math/simulation tasks, while classical processors remain superior for everyday tasks and serial execution!',
      ],
    },
  ],
};
