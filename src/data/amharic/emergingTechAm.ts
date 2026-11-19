import type { AmharicChapterNote } from './types';

export const EMERGING_TECH_AM_NOTES: Record<string, AmharicChapterNote> = {
  'emte-mod-ch1': {
    subject: 'emerging_tech',
    chapterNumber: 1,
    titleAm: 'ምዕራፍ 1፡ የኢመርጂንግ ቴክኖሎጂዎች መግቢያ እና ኢንዱስትሪያል አብዮቶች',
    briefOverviewAm: 'Emerging Technologies ትርጉም፣ ከ1ኛ እስከ 4ኛ ኢንዱስትሪያል አብዮት (IR 1.0–4.0)፣ Data/Information/Knowledge እና Human-to-Machine Interaction ያስተምራል።',
    briefPointsAm: [
      '4ቱ ኢንዱስትሪያል አብዮቶች፡ IR 1.0 (እንፋሎት/Steam 1760s) → IR 2.0 (ኤሌክትሪክ/Mass Production 1870s) → IR 3.0 (ኮምፒውተር/ኢንተርኔት 1950s) → IR 4.0 (AI, IoT, Robotics ዛሬ)።',
      'Programmable Devices 4 አይነቶች፡ Memory, Microprocessors, Logic (FPGAs), Networks።',
      'Data vs Information vs Knowledge vs Wisdom (DIKW Pyramid)።',
      'Human-Computer Interaction (HCI)፡ ሰው ከማሽን ጋር የሚገናኝበትን ቀላልና አካታች በይነገጽ ያጠናል።',
    ],
    examTipAm: 'የ4ቱን ኢንዱስትሪያል አብዮቶች ዋና መገለጫዎች በቅደም ተከተል ያዙ (Steam → Electricity → Computer/Automation → Cyber-Physical/AI/IoT)!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የIntroduction to Emerging Technologies (EMTE 1011/1012) መጀመሪያ ሲሆን የEmerging Technologiesን ትርጉምና ባህሪያት (Radical Novelty, Fast Growth, Uncertainty), ከ1760ዎቹ እስከ ዛሬ ያሉትን አራት ታላላቅ የኢንዱስትሪ አብዮቶች (IR 1.0 እስከ IR 4.0/Industry 4.0), Programmable Logic Devices, የኢንፎርሜሽን ቴክኖሎጂ የDIKW ተዋረድ እና የHuman-to-Machine Interaction (HCI) ፋይዳን በዝርዝር ያስተምራል።',
    learningOutcomesAm: [
      'Emerging Technologyን መተርጎም እና የ4ቱን Industrial Revolutions ዋና ቴክኖሎጂዎች መዘርዘር።',
      'Data, Information, Knowledge እና Wisdom (DIKW) መካከል ያለውን ልዩነት በምሳሌ ማብራራት።',
      'የIR 4.0 ዋና ምሰሶዎችን (AI, IoT, Big Data, Cloud, AR/VR, 3D Printing, Blockchain) መግለጽ።',
    ],
    sectionsAm: [
      {
        headingAm: '1.1 አራቱ ኢንዱስትሪያል አብዮቶች (IR 1.0 – IR 4.0) እና DIKW',
        contentAm: `### 1.1.1 Industrial Revolutions
1. **1st IR (1760s)**: የእንፋሎት ሞተር (Steam Engine)፣ የውሃ ኃይል እና ሜካናይዜሽን።
2. **2nd IR (1870s)**: ኤሌክትሪክ፣ Assembly Line (Henry Ford Mass Production)፣ ቴሌግራፍና ስልክ።
3. **3rd IR (1950s–1990s — Digital Revolution)**: ትራንዚስተር፣ ማይክሮፕሮሰሰር፣ ኮምፒውተር፣ PLC Automation እና ኢንተርኔት።
4. **4th IR (Industry 4.0 — ዛሬ)**: የፊዚካል፣ ዲጂታል እና ባዮሎጂካል ዓለሞች ውህደት (**Cyber-Physical Systems**) — AI, IoT, 3D Printing, Quantum Computing, Biotechnology!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንድ የፋብሪካ ዳሳሽ (Sensor) "28, 30, 35" የሚሉ ቁጥሮችን ላከ፤ ሲስተሙ "የሞተሩ ሙቀት በ10 ደቂቃ ውስጥ 35°C ደርሷል" አለ፤ መሐንዲሱ ደግሞ "ከ32°C በላይ መሞቅ ቅባት ማለቁን ስለሚያሳይ ሞተሩ ይቆም" ሲል በDIKW ምን ምን ናቸው?',
        stepsAm: [
          '1. "28, 30, 35" → **Data** (ጥሬ ቁጥር)',
          '2. "በ10 ደቂቃ ውስጥ 35°C ደርሷል" → **Information** (አውድ ያለው መረጃ)',
          '3. "ከ32°C በላይ መሞቅ ቅባት ማለቁን ያሳያል" → **Knowledge**',
          '4. "ሞተሩ እንዳይቃጠል በራስ-ሰር ማቆም" → **Wisdom**',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Industry 4.0', termAm: 'ኢንዱስትሪ 4.0', definitionAm: 'AI, IoT, Cloud እና Roboticsን በማዋሃድ በራሱ የሚወስን ስማርት ፋብሪካና ማህበረሰብ የሚፈጥር አራተኛው አብዮት።' },
    ],
    examTrapsAm: [
      'Digital Revolution 4ኛው አይደለም — ኮምፒውተርና ኢንተርኔት የ**3ኛው ኢንዱስትሪያል አብዮት (IR 3.0)** ውጤቶች ናቸው!',
    ],
    keyTakeawaysAm: [
      'IR 4.0 ለታዳጊ ሀገራት እንደ ኢትዮጵያ ትልቅ የመዝለያ (Leapfrogging) እድልም የስራ ገበያ ስጋትም ይዞ መጥቷል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ Emerging Technologyን ከTraditional Technology የሚለየው ምንድን ነው?',
        answerAm: 'መልስ፡ ፈጣን እድገት (Fast growth)፣ አዲስነት (Radical novelty)፣ ሰፊ የኢኮኖሚ ተጽዕኖ እና በመጀመሪያ ደረጃ ላይ ያለ እርግጠኛ አለመሆን (Uncertainty)።',
      },
    ],
  },

  'emte-mod-ch2': {
    subject: 'emerging_tech',
    chapterNumber: 2,
    titleAm: 'ምዕራፍ 2፡ ዳታ ሳይንስ እና Big Data (Data Science & Big Data)',
    briefOverviewAm: 'የData Science ሂደት፣ Data Types (Structured/Unstructured)፣ Big Data 5Vs (Volume, Velocity, Variety, Veracity, Value) እና Hadoop/Spark Ecosystemን ያስተምራል።',
    briefPointsAm: [
      'Structured Data (Tables/SQL), Semi-Structured (JSON, XML, CSV), Unstructured Data (~80% — ቪዲዮ፣ ፎቶ፣ ድምጽ፣ ጽሑፍ)።',
      'Big Data 5Vs፡ Volume (መጠን — Petabytes), Velocity (ፍጥነት/Real-time), Variety (ዓይነት), Veracity (ታማኝነት), Value (ጥቅም)።',
      'Data Value Chain፡ Acquisition → Analysis → Curation → Storage → Usage።',
      'Hadoop Ecosystem፡ HDFS (የተከፋፈለ ማከማቻ) እና MapReduce (የተከፋፈለ ማቀነባበሪያ)።',
    ],
    examTipAm: 'JSON እና XML "Structured" ሳይሆኑ **Semi-Structured Data** ናቸው (Schema በTags/Keys ውስጥ አላቸው)!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የዘመናዊ ዲጂታል ኢኮኖሚ "አዲሱ ነዳጅ" የሆነውን Data Science እና Big Data ያብራራል። የData Science ኢንተርዲሲፕሊናዊ ተፈጥሮ (Math/Stats + Computer Science + Domain Knowledge)፣ Data Processing Cycle (Input, Processing, Output)፣ ሦስቱ የዳታ ዓይነቶች፣ Data Value Chain፣ Big Data 5Vs (Volume, Velocity, Variety, Veracity, Value)፣ Data Warehouse vs Data Lake፣ እና የClustered Computing መሣሪያዎች (Hadoop HDFS, MapReduce, Apache Spark) በጥልቀት ቀርበዋል።',
    learningOutcomesAm: [
      'Structured, Semi-Structured እና Unstructured Dataን በምሳሌ መለየት።',
      'የBig Data 5Vs (Volume, Velocity, Variety, Veracity, Value) ማብራራት።',
      'Hadoop (HDFS & MapReduce) በተራ ሰርቨሮች ላይ ግዙፍ ዳታን እንዴት እንደሚያከማችና እንደሚያቀነባብር መግለጽ።',
    ],
    sectionsAm: [
      {
        headingAm: '2.1 የዳታ ዓይነቶች፣ Big Data 5Vs እና Hadoop',
        contentAm: `### 2.1.1 3ቱ የዳታ ዓይነቶች
- **Structured**: ቋሚ ረድፍና ዓምድ (SQL Relational Databases, Excel)።
- **Semi-Structured**: ቋሚ ሰንጠረዥ ባይኖረውም Tags/Keys አሉት (**JSON, XML, Email headers**)።
- **Unstructured**: ቋሚ ቅርጽ የሌለው (**MP4 ቪዲዮ, JPEG ፎቶ, Audio, PDF, Social Media Text**)።

### 2.1.2 Big Data 5Vs & Hadoop
- **Volume** (ብዛት: TB/PB/ZB), **Velocity** (ፍጥነት: Streaming), **Variety** (የተለያዩ ዓይነቶች), **Veracity** (ትክክለኛነት/ጽዳት), **Value** (የቢዝነስ ውጤት)።
- **Hadoop**: **HDFS** ፋይሎችን ወደ ብሎኮች ከፋፍሎ በብዙ ኮምፒውተሮች ያስቀምጣል፤ **MapReduce** ስራውን በመከፋፈል ያሰላል።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'በአንድ የቴሌኮም ኩባንያ በሰከንድ 50,000 ጥሪዎች ሲመዘገቡና የተወሰኑት ስህተት ያለባቸው ሲሆኑ እነዚህ የየትኞቹ Vዎች ምሳሌ ናቸው?',
        stepsAm: [
          '1. "በሰከንድ 50,000 ጥሪ" → **Velocity** (እና በድምሩ **Volume**)',
          '2. "ስህተትና ጉድለት ያለበት መረጃ" → **Veracity**',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Data Curation', termAm: 'ዳታ ኪውሬሽን', definitionAm: 'ዳታን ለወደፊት ጥቅም ማጽዳት፣ መሰየም፣ ማደራጀትና ጥራቱን መጠበቅ።' },
    ],
    examTrapsAm: [
      'Big Data በአንድ ትልቅ Supercomputer ብቻ አይሰራም — በብዙ ተራ ኮምፒውተሮች (Distributed Cluster Computing) ላይ በትይዩ ይሰራል።',
    ],
    keyTakeawaysAm: [
      'ያለ Veracity (ጥራት) እና Value (የቢዝነስ ጥቅም) ብዙ ዳታ መሰብሰብ ብቻ ዋጋ የለውም ("Garbage in, garbage out")።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "NoSQL" Databases (እንደ MongoDB/Firestore) ከSQL ለBig Data ለምን ይመረጣሉ?',
        answerAm: 'መልስ፡ Unstructured እና Semi-Structured ዳታን ያለ ጥብቅ Schema በቀላሉ Horizontal Scaling በማድረግ ስለሚያስተናግዱ።',
      },
    ],
  },

  'emte-mod-ch3': {
    subject: 'emerging_tech',
    chapterNumber: 3,
    titleAm: 'ምዕራፍ 3፡ አርቲፊሻል ኢንተለጀንስ (Artificial Intelligence - AI)',
    briefOverviewAm: 'የAI ትርጉምና ታሪክ (Turing Test 1950)፣ 3ቱ የAI ደረጃዎች (ANI, AGI, ASI)፣ Machine Learning (Supervised, Unsupervised, Reinforcement)፣ Deep Learning እና አጠቃቀሞችን ያስተምራል።',
    briefPointsAm: [
      'AI > Machine Learning > Deep Learning (Neural Networks with many hidden layers)።',
      '3 የAI ደረጃዎች፡ ANI (Narrow/Weak — ዛሬ ያሉ ሁሉም AIዎች) → AGI (General/Strong — እንደ ሰው) → ASI (Super AI — ከሰው የበለጠ)።',
      '3 የML ዓይነቶች፡ Supervised (Labeled data)፣ Unsupervised (Unlabeled/Clustering)፣ Reinforcement Learning (Reward & Punishment)።',
      '7 የAI አጠቃቀም ዘርፎች፡ Healthcare, Agriculture, Education, Finance, Social Media, Transport (Autonomous Cars)።',
    ],
    examTipAm: 'ዛሬ የምንጠቀምባቸው ሁሉም ቴክኖሎጂዎች (Siri, Face ID, Chatbots, Self-driving prototypes) **ANI (Artificial Narrow Intelligence / Weak AI)** ውስጥ እንጂ AGI ውስጥ አይደሉም!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የArtificial Intelligence (AI) መሰረታዊ ጽንሰ-ሐሳቦችን (ከ1950 Alan Turing Test እና 1956 Dartmouth Conference ጀምሮ)፣ የAIን 7 ደረጃዎችና 3 ዋና ምድቦችን (ANI, AGI, ASI)፣ የAI vs Machine Learning vs Deep Learning ተዋረድን፣ የMachine Learning ሦስት የመማሪያ ስልቶችን (Supervised, Unsupervised, Reinforcement)፣ Natural Language Processing (NLP), Computer Vision, Robotics እና በግብርና፣ ጤናና ትምህርት ያለውን ተግባራዊ ሚና በጥልቀት ያስተምራል።',
    learningOutcomesAm: [
      'በAI፣ Machine Learning እና Deep Learning መካከል ያለውን ግንኙነትና ልዩነት መግለጽ።',
      'ANI, AGI እና ASIን (እንዲሁም Reactive, Limited Memory, Theory of Mind, Self-Aware) መለየት።',
      'Supervised, Unsupervised እና Reinforcement Learning መቼ እንደሚውሉ በምሳሌ ማስረዳት።',
    ],
    sectionsAm: [
      {
        headingAm: '3.1 የAI ደረጃዎች እና የMachine Learning ዓይነቶች',
        contentAm: `### 3.1.1 3ቱ የAI ደረጃዎች (By Capability)
1. **ANI (Weak AI)**: ለአንድ የተወሰነ ሥራ ብቻ የሰለጠነ (Chess, Spam filter, Speech recognition) — **አሁን ያለንበት ደረጃ**።
2. **AGI (Strong AI)**: እንደ ሰው ማንኛውንም አእምሯዊ ሥራ መማርና ማሰብ የሚችል (ገና አልተደረሰበትም)።
3. **ASI (Superintelligence)**: በሁሉም መስክ ከሰው አእምሮ እጅግ የላቀ (ግምታዊ)።

### 3.1.2 3ቱ የMachine Learning ዘዴዎች
- **Supervised Learning**: በተሰየመ (Labeled) መረጃ መማር (ለምሳሌ Spam vs Not Spam Classification ወይም House Price Regression)።
- **Unsupervised Learning**: ምንም Label በሌለው መረጃ ውስጥ ቅርጽ/ቡድን መለየት (Clustering — Customer Segmentation)።
- **Reinforcement Learning**: Agent በEnvironment ውስጥ እየሞከረ በReward (+) እና Penalty (−) የሚማርበት (Game AI, Robotics)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንድ ሲስተም 10,000 "ታማሚ" እና "ጤነኛ" ተብለው ምልክት የተደረገባቸውን የX-ray ምስሎች አይቶ አዲስ ታካሚ ቢለይ የትኛው ML ዓይነት ነው?',
        stepsAm: [
          '1. መልሱ/ምልክቱ ("ታማሚ"/"ጤነኛ") አስቀድሞ ስለተሰጠ (Labeled Data) → **Supervised Learning (Classification)** ነው!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Turing Test', termAm: 'ቱሪንግ ቴስት', definitionAm: 'በ1950 Alan Turing ያቀረበው መለኪያ፡ አንድ ኮምፒውተር ከሰው ሳይለይ ውይይት ከቻለ Intelligent ሊባል ይችላል።' },
    ],
    examTrapsAm: [
      'Deep Learning ከMachine Learning የተለየ አይደለም — Deep Learning የMachine Learning **ንዑስ ክፍል (Subset)** ሲሆን Multi-layer Artificial Neural Networksን ይጠቀማል!',
    ],
    keyTakeawaysAm: [
      'የAI ሞዴል ጥራት በዳታው ጥራትና ብዛት ላይ በቀጥታ ይወሰናል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "NLP (Natural Language Processing)" ምን ይሰራል?',
        answerAm: 'መልስ፡ ኮምፒውተሮች የሰውን ቋንቋ (ጽሑፍና ንግግር) እንዲረዱ፣ እንዲተረጉሙና እንዲመልሱ የሚያስችል የAI ዘርፍ ነው።',
      },
    ],
  },

  'emte-mod-ch4': {
    subject: 'emerging_tech',
    chapterNumber: 4,
    titleAm: 'ምዕራፍ 4፡ ኢንተርኔት ኦፍ ቲንግስ (Internet of Things - IoT)',
    briefOverviewAm: 'የIoT ትርጉምና 4 አካላት (Sensors, Connectivity, Data Processing, UI)፣ የIoT Architecture Layers፣ Protocols (MQTT, CoAP, Zigbee) እና Smart Agriculture/Home/City ያስተምራል።',
    briefPointsAm: [
      'IoT፡ ቁሳዊ ነገሮች (Things) በSensors, Software እና Network ተገናኝተው ያለ ሰው ጣልቃ ገብነት መረጃ የሚለዋወጡበት ሥርዓት።',
      'IoT Formula፡ Physical Object + Controller/Sensor/Actuator + Internet = IoT!',
      'Sensor (ከአካባቢ መረጃ ይሰበስባል — ለምሳሌ Temperature) vs Actuator (ውሳኔን ወደ አካላዊ ድርጊት ይቀይራል — ለምሳሌ ቫልቭ መክፈት/መዝጋት)።',
      'ተግዳሮቶች፡ Privacy & Security (ብዙ የIoT እቃዎች ደካማ Password አላቸው), Interoperability, Power/Battery።',
    ],
    examTipAm: 'Sensor (Input — ይለካል) እና Actuator (Output — ይተገብራል/ያንቀሳቅሳል) መካከል ያለውን ልዩነት በፈተና ላይ በደንብ ለዩ!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የInternet of Things (IoT) ሥርዓተ-መዋቅርን፣ 4ቱን ዋና የIoT Architecture ደረጃዎች (Sensing Layer, Network Layer, Data Processing Layer, Application Layer)፣ Sensors vs Actuators፣ የግንኙነት ቴክኖሎጂዎችን (Wi-Fi, Bluetooth/BLE, Zigbee, LoRaWAN, 5G, MQTT, CoAP)፣ እንዲሁም በኢትዮጵያ Smart Agriculture (Soil Moisture + Automated Irrigation), Smart Healthcare, Smart Cities እና የIoT Security/Privacy ተግዳሮቶችን በዝርዝር ያስተምራል።',
    learningOutcomesAm: [
      'የIoTን ትርጉም፣ ባህሪያትና 4ቱን Architecture Layers ማብራራት።',
      'Sensors እና Actuators በተጨባጭ Smart System ምሳሌ መለየት።',
      'MQTT, Zigbee እና LoRaWAN ለIoT ለምን ከመደበኛ HTTP/Wi-Fi የተሻሉ እንደሆኑ መግለጽ።',
    ],
    sectionsAm: [
      {
        headingAm: '4.1 የIoT Architecture Layers እና Protocols',
        contentAm: `### 4.1.1 4ቱ የIoT Architecture Layers
1. **Sensing / Perception Layer**: Sensors (ሙቀት፣ እርጥበት፣ GPS) እና Actuators (ሞተር፣ መብራት ማብሪያ)።
2. **Network Layer**: መረጃን የሚያስተላልፉ Gatewayዎችና Protocols (Wi-Fi, BLE, Zigbee, LoRaWAN ለረጅም ርቀት፣ MQTT ቀላል Publish-Subscribe)።
3. **Data Processing Layer**: Cloud/Edge Analytics (ውሳኔ የሚሰጥበት አንጎል)።
4. **Application Layer**: የተጠቃሚው ስልክ App ወይም Smart Home/Farm Dashboard።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'በSmart Farming ውስጥ የአፈር እርጥበት ሲቀንስ የውሃ ፓምፑ በራሱ ይበራል። የአፈር መለኪያው እና የውሃ ፓምፑ በIoT ምን ይባላሉ?',
        stepsAm: [
          '1. Soil Moisture Probe = **Sensor** (መረጃ የሚወስድ)',
          '2. Water Pump Switch = **Actuator** (አካላዊ ድርጊት የሚፈጽም)',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'MQTT', termAm: 'ኤምኪውቲቲ', definitionAm: 'ለIoT እቃዎች በትንሽ Bandwidth እና ባትሪ መልዕክት የሚያስተላልፍ ቀላል Protocol።' },
    ],
    examTrapsAm: [
      'Smart Grid ከIoT አፕሊኬሽኖች አንዱ ሲሆን፣ "Smart" የሚባለው መሣሪያ ሁሉ ኢንተርኔት/ኔትወርክ ካልተገናኘ IoT አይባልም!',
    ],
    keyTakeawaysAm: [
      'Edge Computing በIoT መሣሪያው አጠገብ መረጃን በማቀነባበር ፍጥነት (Low Latency) ይጨምራል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "M2M (Machine-to-Machine)" እና "IoT" ልዩነት ምንድን ነው?',
        answerAm: 'መልስ፡ M2M ሁለት ማሽኖች በቀጥታ (ብዙ ጊዜ ያለ Cloud/Internet) ሲገናኙ ሲሆን IoT ግን ሰፊ Cloud, IP Networks እና Big Data Analyticsን ያካተተ ሙሉ ሥርዓት ነው።',
      },
    ],
  },

  'emte-mod-ch5': {
    subject: 'emerging_tech',
    chapterNumber: 5,
    titleAm: 'ምዕራፍ 5፡ ኦግሜንትድ ሪያሊቲ (AR vs VR vs MR)',
    briefOverviewAm: 'Augmented Reality (AR)፣ Virtual Reality (VR) እና Mixed Reality (MR) መካከል ያለውን ልዩነት (Reality-Virtuality Continuum)፣ ሃርድዌርና አጠቃቀም ያስተምራል።',
    briefPointsAm: [
      'VR (Virtual Reality)፡ ተጠቃሚውን ከገሃዱ ዓለም ሙሉ በሙሉ ቆርጦ 100% ዲጂታል ዓለም ውስጥ ያስገባል (VR Headset)።',
      'AR (Augmented Reality)፡ በገሃዱ ዓለም እይታ ላይ ዲጂታል ጽሑፍ/ምስል ይደርባል (ለምሳሌ Google Lens, Pokémon GO, የስልክ ካሜራ)።',
      'MR (Mixed Reality)፡ ዲጂታል ነገሮች ከገሃዱ ዓለም ጋር **በቀጥታ ይነካካሉ/ይተሳሰራሉ** (Occlusion — ጠረጴዛ ጀርባ መደበቅ፣ HoloLens)።',
      'XR (Extended Reality)፡ ለVR, AR እና MR ሁሉ የጋራ ስም ነው።',
    ],
    examTipAm: 'AR እና MR ልዩነት፡ AR በገሃዱ ዓለም ላይ ምስል ይደርባል (Overlay)፤ MR ግን ዲጂታሉ ምስል የገሃዱን ዓለም ግድግዳ/ጠረጴዛ አውቆ ከጀርባው ይደበቃል እና በእጅ ይነካል!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የExtended Reality (XR) ቴክኖሎጂዎችን — Virtual Reality (VR), Augmented Reality (AR) እና Mixed Reality (MR) — በMilgram\'s Reality-Virtuality Continuum መሠረት ያብራራል። የAR የስራ መርህ (Camera, Tracking/SLAM, Rendering), የሃርድዌር አካላት (IMU, Displays/Headsets, Depth Sensors) እና በሕክምና ቀዶ ጥገና ልምምድ፣ በትምህርት፣ በምህንድስና እና በመዝናኛ ያላቸውን አጠቃቀም ያስተምራል።',
    learningOutcomesAm: [
      'AR, VR እና MRን በVirtuality-Reality Continuum ላይ ማነጻጸር።',
      'የAR 3 ዋና ባህሪያትን (Combine real & virtual, Interactive in real time, Registered in 3D) መግለጽ።',
    ],
    sectionsAm: [
      {
        headingAm: '5.1 VR vs AR vs MR ንጽጽር',
        contentAm: `| ባህሪ | VR (Virtual Reality) | AR (Augmented Reality) | MR (Mixed Reality) |
| :--- | :--- | :--- | :--- |
| **የገሃዱ ዓለም እይታ** | 0% (ሙሉ በሙሉ ዲጂታል) | 100% + Digital Overlay | ገሃድ + 3D Interactive Holograms |
| **መሣሪያ** | ሙሉ ዝግ Headset (Meta Quest) | ስማርትፎን ወይም Smart Glasses | Spatial Headset (HoloLens, Vision Pro) |`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንድ የሕክምና ተማሪ በስማርትፎኑ ካሜራ በኩል ጠረጴዛው ላይ 3D የሰው ልብ እያየ ቢያጠና ይህ ምንድን ነው?',
        stepsAm: [
          '1. ገሃዱን ጠረጴዛ እያየ ዲጂታል 3D ልብ በላይ ስለተደረበ → **Augmented Reality (AR)** ነው!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Extended Reality (XR)', termAm: 'ኤክስቴንድድ ሪያሊቲ', definitionAm: 'AR, VR እና MRን በሙሉ የሚያጠቃልል ጃንጥላ ቃል።' },
    ],
    examTrapsAm: [
      'VR Headset ስታደርጉ ክፍላችሁን ማየት አትችሉም (Full Immersion)፤ AR ላይ ግን ገሃዱ ዓለም ሁልጊዜ ይታያል።',
    ],
    keyTakeawaysAm: [
      'AR ለኢንዱስትሪ ጥገና፣ ለትምህርትና ለቱሪዝም በስልክ ስለሚሰራ በስፋት ተደራሽ ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በAR ውስጥ SLAM (Simultaneous Localization and Mapping) ምን ይሰራል?',
        answerAm: 'መልስ፡ መሣሪያው የክፍሉን 3D ካርታ እየሰራ የራሱንም ቦታ በቅጽበት እንዲያውቅ ያስችላል።',
      },
    ],
  },

  'emte-mod-ch6': {
    subject: 'emerging_tech',
    chapterNumber: 6,
    titleAm: 'ምዕራፍ 6፡ የቴክኖሎጂ ሥነ-ምግባር እና ሙያዊ ኃላፊነት (Tech Ethics)',
    briefOverviewAm: 'Algorithmic Bias, Data Privacy (GDPR), Accountability, Intellectual Property, Cybersecurity, Digital Divide እና ሙያዊ ሥነ-ምግባርን ያስተምራል።',
    briefPointsAm: [
      'Algorithmic Bias፡ AI የሰለጠነበት ዳታ አድሎአዊ ከሆነ AIውም አድሎአዊ ውሳኔ ይሰጣል።',
      'Privacy & Informed Consent፡ የግል መረጃ ያለ ባለቤቱ ግልጽ ፈቃድ መሰብሰብና መሸጥ የለበትም።',
      'Accountability፡ Autonomous Car አደጋ ቢያደርስ ወይም AI ስህተት ቢሰራ ተጠያቂው ማን ነው? (Developer, Company, User)።',
      'Digital Divide፡ በቴክኖሎጂ ተደራሽነት ምክንያት በሀብታም/ከተማ እና በደሃ/ገጠር መካከል የሚፈጠር የእውቀትና የኢኮኖሚ ክፍተት።',
    ],
    examTipAm: 'Security (መረጃን ከጠላፊ/Hack መጠበቅ) እና Privacy (የተጠቃሚው መረጃ እንዴትና በማን ጥቅም ላይ እንደሚውል የመወሰን መብት) አንድ አይደሉም — Security ከሌለ Privacy የለም!',
    expandedOverviewAm:
      'ይህ ምዕራፍ አዳዲስ ቴክኖሎጂዎች የሚያመጡትን የሥነ-ምግባር፣ የሕግ እና የማህበረሰብ ፈተናዎች (Ethical, Legal, Social Implications — ELSI) ይተነትናል። Algorithmic Bias & Fairness, Surveillance & Data Privacy (GDPR Principles: Purpose Limitation, Data Minimization, Consent), Cybersecurity vs Cybercrime, Deepfakes & Misinformation, Job Displacement/Automation, Digital Divide እና ለAI/IT ባለሙያዎች የሚቀመጡ የሙያ ሥነ-ምግባር ደንቦችን (ACM/IEEE Code of Ethics) በዝርዝር ያስተምራል።',
    learningOutcomesAm: [
      'Privacy እና Security መካከል ያለውን ልዩነት እና የInformed Consent መርሆዎችን መግለጽ።',
      'በAI ውስጥ Algorithmic Bias እንዴት እንደሚፈጠርና እንዴት እንደሚቀነስ ማብራራት።',
      'Digital Divide እና Automation በስራ ገበያ ላይ የሚያመጡትን ተጽዕኖ መተንተን።',
    ],
    sectionsAm: [
      {
        headingAm: '6.1 የቴክኖሎጂ ሥነ-ምግባር ቁልፍ ጉዳዮች (Privacy, Bias, Security)',
        contentAm: `### 6.1.1 ዋና የTech Ethics ምሰሶዎች
1. **Transparency & Explainability**: AI ለምን ይህን ውሳኔ እንደወሰነ ማስረዳት መቻል (Black-box አለመሆን)።
2. **Privacy & Data Protection**: "Data Minimization" — አስፈላጊውን መረጃ ብቻ መሰብሰብ።
3. **Fairness (Non-discrimination)**: AI ጾታን፣ ዘርን ወይም ቋንቋን መሰረት አድርጎ እንዳያገል (Unbiased Training Data)።
4. **Cybersecurity**: CIA Triad — **C**onfidentiality (ሚስጥራዊነት), **I**ntegrity (ያለመቀየር), **A**vailability (ተደራሽነት)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንድ የቅጥር AI ሲስተም ባለፉት 20 ዓመታት የወንዶች CV ብቻ በብዛት ስለነበረ ሴት አመልካቾችን ቢጥል የምን ምሳሌ ነው?',
        stepsAm: [
          '1. **Historical / Algorithmic Bias** — AIው የሰለጠነበት የድሮ ዳታ አድሎአዊ ስለነበረ ሞዴሉ አድሎውን ተማረው!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'CIA Triad', termAm: 'ሲአይኤ ትራያድ', definitionAm: 'የሳይበር ደህንነት 3 ምሰሶዎች፡ Confidentiality, Integrity, Availability።' },
    ],
    examTrapsAm: [
      'AI ራሱ "የሞራል ኃላፊነት (Moral Agency)" የለውም — ተጠያቂዎቹ **የሰሩትና የተጠቀሙበት ሰዎችና ኩባንያዎች** ናቸው!',
    ],
    keyTakeawaysAm: [
      'Technology is never morally neutral — how it is designed and deployed reflects human values.',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በCybersecurity ውስጥ Integrity ማለት ምን ማለት ነው?',
        answerAm: 'መልስ፡ መረጃው በመጓጓዣ ወይም በማከማቻ ላይ ሳይበላሽ እና ባልተፈቀደለት ሰው ሳይቀየር ትክክለኛነቱን ጠብቆ መቆየቱ ነው።',
      },
    ],
  },

  'emte-mod-ch7': {
    subject: 'emerging_tech',
    chapterNumber: 7,
    titleAm: 'ምዕራፍ 7፡ ሌሎች ኢመርጂንግ ቴክኖሎጂዎች (Nanotech, Biotech, Blockchain, Cloud & Quantum)',
    briefOverviewAm: 'Nanotechnology, Biotechnology & CRISPR, Blockchain & Cryptocurrencies, Cloud & Quantum Computing, 3D Printing እና Cybersecurity ቴክኖሎጂዎችን ያስተምራል።',
    briefPointsAm: [
      'Nanotechnology (1–100 nm)፡ በአተም/ሞለኪውል መጠን ቁሶችን በመቀየር ልዩ ባህሪ መፍጠር (1 nm = 10⁻⁹ m)።',
      'Biotechnology & Genetic Engineering (CRISPR-Cas9)፡ DNAን በማስተካከል በሽታን ማከም እና የተሻሻለ ሰብል ማምረት።',
      'Blockchain፡ ያለ ማዕከላዊ ባንክ በCryptographic Blocks የተሳሰረ የማይቀየር (Immutable) እና Decentralized Ledger።',
      'Quantum Computing፡ ከClassical Bit (0 ወይም 1) ይልቅ **Qubit** (Superposition — 0 እና 1 በአንድ ጊዜ) ይጠቀማል።',
    ],
    examTipAm: '1 Nanometer = 10⁻⁹ meters (1 ቢሊየነኛ ሜትር)! Nanotechnology የሚሰራው ከ 1 እስከ 100 nm ክልል ውስጥ ነው።',
    expandedOverviewAm:
      'ይህ የመጨረሻው የEmerging Technologies ምዕራፍ ሌሎች ዓለምን እየለወጡ ያሉ ወሳኝ ቴክኖሎጂዎችን በጥልቀት ይዳስሳል። Nanotechnology (Top-down vs Bottom-up, Carbon Nanotubes, Nanomedicine)፣ Biotechnology (CRISPR, GMOs, Bioinformatics)፣ Blockchain Technology (Distributed Ledger, Hash, Smart Contracts, Bitcoin vs Private Blockchain)፣ Cloud Computing (IaaS, PaaS, SaaS)፣ Additive Manufacturing / 3D Printing፣ Computer Vision እና Quantum Computing (Qubits, Superposition, Entanglement) በምሳሌዎች ተብራርተዋል።',
    learningOutcomesAm: [
      'የNanotechnology ልኬት (1–100 nm) እና Top-Down vs Bottom-Up ዘዴዎችን ማብራራት።',
      'Cloud Computing 3 የአገልግሎት ሞዴሎችን (IaaS, PaaS, SaaS) በምሳሌ መለየት።',
      'Blockchain እንዴት Decentralization እና Immutability እንደሚያረጋግጥ መግለጽ።',
      'Classical Computing (Bit) እና Quantum Computing (Qubit) መካከል ያለውን ልዩነት መተንተን።',
    ],
    sectionsAm: [
      {
        headingAm: '7.1 Nanotech, Biotech, Blockchain, Cloud & Quantum',
        contentAm: `### 7.1.1 Cloud Service Models (IaaS, PaaS, SaaS)
- **IaaS (Infrastructure)**: ሰርቨር/ማከማቻ በኪራይ (AWS EC2)።
- **PaaS (Platform)**: ለፕሮግራመሮች ኮድ መጻፊያና ማስኬጃ መድረክ (Firebase, Heroku)።
- **SaaS (Software)**: ተጠቃሚው ቀጥታ በBrowser የሚጠቀመው (Gmail, Google Docs)።

### 7.1.2 Blockchain & Quantum
- **Blockchain**: እያንዳንዱ Block የራሱን Hash እና የቀድሞውን Block Hash ይይዛል — አንዱን ቢቀይሩት መላው ሰንሰለት ይፈርሳል (Tamper-evident)!
- **Quantum**: Qubit በ**Superposition** ምክንያት ብዙ ስሌቶችን በአንድ ጊዜ በፍጥነት ይሰራል (የአሁኑን RSA Encryption ሊሰብር ስለሚችል Post-Quantum Cryptography ያስፈልጋል)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንድ ድርጅት Google Workspace (Gmail/Drive) ሲጠቀም እና ሌላው ድርጅት AWS ላይ Virtual Machines ተከራይቶ ሲስተሙን ሲጭን ምን ምን ናቸው?',
        stepsAm: [
          '1. Gmail/Drive ሙሉ ዝግጁ ሶፍትዌር ስለሆነ → **SaaS (Software as a Service)**',
          '2. AWS Virtual Machines → **IaaS (Infrastructure as a Service)**',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Qubit', termAm: 'ኪውቢት', definitionAm: 'በQuantum Computing ውስጥ 0, 1 ወይም የሁለቱ Superposition መሆን የሚችል የመረጃ መሰረታዊ አሃድ።' },
      { termEn: 'Smart Contract', termAm: 'ስማርት ኮንትራክት', definitionAm: 'ቅድመ-ሁኔታው ሲሟላ በBlockchain ላይ በራሱ የሚፈጸም የኮድ ውል።' },
    ],
    examTrapsAm: [
      'Blockchain እና Bitcoin አንድ አይደሉም! Blockchain መሠረታዊ **ቴክኖሎጂው** ሲሆን Bitcoin ደግሞ በዚያ ቴክኖሎጂ ላይ የተሰራ አንድ Cryptocurrency ነው።',
    ],
    keyTakeawaysAm: [
      '3D Printing (Additive Manufacturing) ቁስን እየቆረጡ ከማስወገድ ይልቅ Layer-by-Layer በመደረብ ብክነትን ይቀንሳል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "Biometrics" (Fingerprint, Face ID, Iris) ለምን ከPassword የተሻለ ደህንነት ይሰጣል?',
        answerAm: 'መልስ፡ Password ሊረሳ ወይም ሊገመት ይችላል፤ Biometrics ግን የእያንዳንዱ ሰው ልዩ የአካል/ባህሪ መለያ ስለሆነ በቀላሉ አይኮረጅም።',
      },
    ],
  },
};
