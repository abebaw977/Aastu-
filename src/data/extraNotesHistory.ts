import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for History of Ethiopia and the Horn (History - 7 Units)
 * Preserves all existing notes and adds historiographical methodologies, source criticism,
 * dynastic succession timelines, battle mechanics, and exam traps for all 7 units.
 */
export const EXTRA_NOTES_HISTORY: Record<number, MasterNoteSection[]> = {
  // Unit 1: Introduction to History
  1: [
    {
      id: 'hist-extra-u1-sec1',
      heading: '1.4 Masterclass: Epistemology of History, Source Criticism & Ethiopian Historiographical Evolution',
      content: `### 1.4.1 The Nature and Scientific Methodology of History
- **Definition & Etymology**: Derived from the Greek *historia* ("inquiry", "knowledge acquired by investigation"). History is the organized, critical study of the human past based on surviving evidence.
- **Two Fundamental Categories of Historical Sources**:
  1. **Primary Sources**: First-hand, contemporary records produced during or immediately after the event by direct participants or eyewitnesses:
     - Inscriptions (e.g., Ezana Stone trilingual inscription in Ge'ez, Sabaean, and Greek).
     - Royal chronicles (*Tarik*), treaties (e.g., Treaty of Wuchale 1889), letters, coins, tools, pottery, fossil hominids.
  2. **Secondary Sources**: Second-hand analytical works produced long after the events by historians who synthesize and interpret primary evidence (e.g., textbooks, academic monographs, journal articles).
- **Historical Criticism (The Scientific Validation Filter)**:
  - **External Criticism (Authenticity / Provenance)**: Verifying whether the artifact or document is genuine or a forgery (testing physical parchment age, ink chemistry, language style, author identity).
  - **Internal Criticism (Credibility / Reliability)**: Analyzing the truthfulness and accuracy of the document's contents, uncovering authorial bias, political motives, or religious hagiographical exaggerations.

---

### 1.4.2 Historiographical Evolution in Ethiopia and the Horn
1. **Indigenous Historiography**:
   - **Hagiographies (*Gadlat*)**: Biographies of Christian saints and monks (e.g., *Gadle Tekle Haymanot*, *Gadle Ewostatewos*); emphasize spiritual piety, miracles, and monastic land endowments (*Gult*).
   - **Royal Chronicles (*Zena Mekonint* / *Tarik*)**: Commenced during the reign of Emperor Amda Seyon I ($1314\\text{--}1344$) and continued up to Emperor Menelik II; written by court scribes (*Afe Negus* / *Tsehafe Teezaz*) documenting military campaigns, dynastic legitimacy, and religious festivals.
   - **Islamic Chronicles**: Written in Arabic documenting Sultanates (e.g., *Futuh al-Habasha* by Shihab al-Din / Arab Faqih, detailing Ahmad Gragn's campaigns).
2. **Modern Professional Ethiopian Historiography**:
   - Pioneered by early 20th-century Ethiopian intellectuals: **Aleqa Taye Gebre Maryam**, **Negadras Afework Gebre Iyesus** (first Amharic biography of Menelik II), and **Blatten Geta Heruy Wolde Selassie**.
   - Institutionalized in the 1960s with the establishment of the Department of History and the Institute of Ethiopian Studies (IES) at Addis Ababa University under scholars like **Prof. Taddesse Tamrat**, **Prof. Bahru Zewde**, and **Prof. Merid Wolde Aregay**.`,
      keyTakeaways: [
        'Primary sources are the raw bedrock of history; secondary sources interpret and synthesize primary data.',
        'External criticism establishes authenticity; internal criticism establishes factual credibility and bias.'
      ]
    }
  ],

  // Unit 2: Peoples and Cultures in Ethiopia and the Horn
  2: [
    {
      id: 'hist-extra-u2-sec1',
      heading: '2.4 Masterclass: Hominid Evolution Sites, Plant Domestication & Ancient Religious Penetration',
      content: `### 2.4.1 Paleoanthropology & The Horn as the "Cradle of Humanity"
- **Key Hominid Discoveries**:
  - *Chororapithecus abyssinicus* ($10\\text{ Ma}$, Afar).
  - *Ardipithecus ramidus* ("Ardi", $4.4\\text{ Ma}$, Middle Awash/Aramis).
  - *Australopithecus afarensis* ("Lucy" / *Dinkenesh*, $3.2\\text{ Ma}$, Hadar, Donald Johanson 1974) — fully bipedal hominid.
  - *Australopithecus garhi* ($2.5\\text{ Ma}$, Bouri) — first associated with animal bones showing butchery stone-tool cut marks.
  - *Homo erectus* ($1.6\\text{ Ma}$, Konso-Gardula) — perfected Acheulean bifacial hand-axes.
  - *Homo sapiens* archaic fossils: **Omo Kibish I & II ($195,000\\text{ BP}$)** and **Herto ($160,000\\text{ BP}$)** — the oldest anatomically modern human remains on Earth.

---

### 2.4.2 Indigenous Plant Domestication in Ethiopia (Vavilov Center of Diversity)
Russian geneticist **Nikolai Vavilov** identified the Ethiopian highlands as one of the world's primary independent centers of plant domestication:
- **Indigenous Domesticated Crops**: **Teff** (*Eragrostis tef*), **Enset** (*Enset ventricosum*), **Coffee** (*Coffea arabica*, native to Kaffa), **Noog** (*Guizotia abyssinica*), **Dagussa** (finger millet), and **Gesho** (*Rhamnus prinoides*).

---

### 2.4.3 Introduction of Major Religions to Ethiopia
1. **Indigenous Traditional Religions**: Belief in a supreme celestial creator deity: *Waaqa* (Oromo), *Yero* (Kafficho), *Tosa* (Wolaita), *Magano* (Sidama). Mediated through spirit mediums (*Qallu*, *Kallicha*).
2. **Judaism**: Practiced historically by the *Bete Israel* (Ethiopian Jews / Falasha) centered in Semien, Dembiya, and Wegera.
3. **Christianity**: Introduced to the Aksumite royal court in **$330\\text{ AD}$** during the reign of **King Ezana**, converted by **Frumentius** (*Abba Selama Kesate Berhan*), who was consecrated by Patriarch Athanasius of Alexandria as the first Bishop of Ethiopia. In the late 5th century, the **Nine Saints** (*Tese'atu Qidusan*) arrived from Syria and the Byzantine Empire, translating scripture into Ge'ez and founding monastic asceticism.
4. **Islam**: Introduced peacefully during the **First Hijra in $615\\text{ AD}$**, when Prophet Muhammad sent his early persecuted followers (including daughter Ruqayyah and Uthman) across the Red Sea to seek asylum under the righteous Aksumite king, **Negash Armah (al-Najashi)**. Negash established the first Muslim settlement at **Wukro (Tigray)**.`,
      keyTakeaways: [
        'Omo Kibish and Herto establish Ethiopia as the anatomical birthplace of modern Homo sapiens.',
        'Aksum was among the first empires in the world to adopt Christianity as its official state religion.'
      ]
    }
  ],

  // Unit 3: Politics, Economy and Society to the End of the 13th Century
  3: [
    {
      id: 'hist-extra-u3-sec1',
      heading: '3.4 Masterclass: The Aksumite Empire, Zagwe Architectural Mastery & Early Sultanates',
      content: `### 3.4.1 The Rise and Flourishing of the Aksumite State ($100\\text{--}700\\text{ AD}$)
- **Economic Foundation**:
  - Strategic port of **Adulis** on the Red Sea, documented in the 1st-century Greek periplus merchant guide *The Periplus of the Erythraean Sea*.
  - Exported ivory, gold, frankincense, emeralds, and rhinoceros horn in exchange for Indian silks, Roman glassware, and Syrian textiles.
  - **Coinage**: Aksum was the only indigenous sub-Saharan African state to mint its own gold, silver, and bronze coinage (commencing under King Endubis, $\\sim 270\\text{ AD}$) stamped with Sabaean and Greek legends.
- **Imperial Zenith**:
  - **King Ezana ($320\\text{--}350\\text{ AD}$)**: Conquered Meroë (Nubia), expanded across the Red Sea, erected iconic stelae, and adopted Christianity.
  - **King Kaleb ($520\\text{ AD}$)**: Intervened militarily in South Arabia (Yemen) to protect Christian communities against King Dhu Nuwas of Himyar.
- **Decline of Aksum ($700\\text{--}900\\text{ AD}$)**:
  - Rise of the Islamic Caliphate in the 7th century destroyed Aksum's naval control of Red Sea trade routes and sacked Adulis.
  - Soil exhaustion, deforestation, climate deterioration, and local uprisings (legendary queen *Yodit / Gudit*).
  - Forced the geopolitical and cultural center of gravity to shift southward toward Lasta and Shewa.

---

### 3.4.2 The Zagwe Dynasty ($1150\\text{--}1270\\text{ AD}$)
- **Founding**: Rose to power from the Agaw ruling aristocracy of Bugna in Lasta, establishing their capital at **Adafa (Roha)**.
- **Monolithic Architectural Achievement**:
  - **Emperor Gebre Mesqel Lalibela ($1160\\text{--}1211$)**: Orchestrated the excavation of the **11 monolithic and semi-monolithic rock-hewn churches of Lalibela**, carved top-down out of single volcanic basalt outcrops (symbolic "New Jerusalem" after Jerusalem fell to Saladin in 1187).
  - Three architectural groups: Northern group (*Bete Medhane Alem* [largest], *Bete Maryam*), Eastern group (*Bete Amanuel*), and the free-standing cruciform masterpiece **Bete Giyorgis**.
- **Downfall**: Ended in $1270\\text{ AD}$ when the last Zagwe king, Yetbarak, was defeated by Yekuno Amlak.`,
      keyTakeaways: [
        'Aksumite stelae were carved from single blocks of nepheline phonolite granite without mortar, representing multi-story palaces.',
        'Lalibela\'s rock churches were excavated top-down directly into bedrock, combining Axumite architectural elements with Byzantine motifs.'
      ]
    }
  ],

  // Unit 4: Late 13th to Beginning of 16th Century
  4: [
    {
      id: 'hist-extra-u4-sec1',
      heading: '4.4 Masterclass: The Restored "Solomonic" Dynasty, Zara Yaqob\'s Centralization & Muslim-Christian Trade Wars',
      content: `### 4.4.1 The "Restoration" of the Solomonic Dynasty ($1270\\text{ AD}$)
- **Yekuno Amlak**: Overthrew the Zagwe dynasty in $1270$, claiming direct patrilineal descent from the ancient Aksumite kings and the biblical King Solomon and Queen of Sheba (*Makeda*), codified in the national epic **Kebra Nagast** ("Glory of Kings").
- **Amba Gishen (Royal Prison Fortress)**:
  To eliminate bloody succession wars, all male royal heirs (brothers and sons of the ruling emperor) were imprisoned atop the sheer basalt mesa of Amba Gishen in Wollo under strict monastic guard until summoned to the throne upon the emperor's death.

---

### 4.4.2 Emperor Zara Yaqob ($1434\\text{--}1468$): The Pinnacle of Medieval Centralization
- **Religious Consolidation & Reforms**:
  - Ended the protracted **Eustathian controversy** at the Council of Debre Mitmaq ($1450$), officially sanctioning the observance of **two Sabbaths (Saturday and Sunday)**.
  - Suppressed the Stephanite dissident movement; enforced rigorous Marian devotions; mandated wearing amulets bearing Christ's name.
  - Prolific theological writer (*Mets'hafe Berhan*, *Mets'hafe Milad*).
- **Administrative Innovation**:
  - Replaced rebellious regional dynasts with his own daughters and loyal royal commissioners.
  - Crushed Sultan Badlay of Adal at the Battle of Gomit ($1445$).
  - Maintained diplomatic ties with the Papacy in Rome and King Alfonso V of Aragon.`,
      keyTakeaways: [
        'The Kebra Nagast served as the ideological constitution of the Ethiopian monarchy for seven centuries until 1974.',
        'Amda Seyon I expanded the kingdom into an empire through formidable military campaigns southward and eastward.'
      ]
    }
  ],

  // Unit 5: Early 16th to End of 18th Century
  5: [
    {
      id: 'hist-extra-u5-sec1',
      heading: '5.4 Masterclass: The Adal-Christian War, The Oromo Population Movement & The Gondarine Era',
      content: `### 5.5.1 The War Between the Christian Kingdom and Sultanate of Adal ($1529\\text{--}1543$)
- **Context**: Decades of commercial rivalry over the lucrative Zeila trade route culminated in the jihad led by **Imam Ahmad ibn Ibrahim al-Ghazi (Ahmad Gragn)**.
- **Key Engagements**:
  - **Battle of Shimbra Kure ($1529$)**: Ahmad Gragn decisively defeated Emperor Lebne Dengel using Ottoman firearms and tactical cavalry.
  - Gragn occupied the highlands for 14 years, burning churches and monasteries.
  - **Foreign Intervention**: In 1541, a Portuguese expeditionary force of $400$ musketeers led by **Cristóvão da Gama** arrived to assist the Christian Kingdom; Gragn received $900$ Ottoman matchlock troops.
  - **Battle of Wofla ($1542$)**: Gragn defeated and executed da Gama.
  - **Battle of Wayna Daga ($1543$, near Lake Tana)**: Emperor Gelawdewos and remaining Portuguese troops defeated the Adal army; Gragn was killed, ending the jihad.

---

### 5.5.2 The Population Movement of the Oromo ($16^{\\text{th}}$ Century)
- **Causal Drivers**: Demographic population pressure, environmental drought/pasture shortages in southern cradle lands (Borena/Guji), and power vacuums created by the mutual exhaustion of Christian and Adal forces.
- **Socio-Political Engines of Success**:
  1. **Gadaa System**: Generation-set democratic governance system where each class served an **8-year military/leadership cycle**; the *Luba* class was socially obligated to initiate expansion (*Gadaa initiation*).
  2. **Social Integration Institutions**:
     - **Moggaasa**: Clan-level adoption of non-Oromo individuals and communities into an Oromo clan, granting full reciprocal lineage rights.
     - **Gudifacha**: Foster-adoption of children, integrating them seamlessly into kinship structures.

---

### 5.5.3 The Gondarine Period & Zemene Mesafint (Era of Princes)
- **Fasilides ($1632\\text{--}1667$)**: Expelled the Jesuit Catholic missionaries following bloody civil wars under Susenyos; restored Orthodox Christianity; established the permanent stone capital of **Gondar (Fasil Ghebbi)**.
- **Zemene Mesafint ($1769\\text{--}1855$)**:
  - Commenced in $1769$ when **Ras Mikael Sehul** of Tigray assassinated Emperor Iyoas I.
  - Characterized by the complete breakdown of central imperial authority, continuous civil warfare between regional warlords (Tigray, Wollo, Begemdir, Gojjam, Shewa), and puppet emperors stripped of real power.`,
      keyTakeaways: [
        'Wayna Daga (1543) marked the end of Adal hegemony and the exhaustion of both medieval Christian and Muslim states.',
        'Zemene Mesafint ended in 1855 when Kassa Hailu defeated the regional warlords and was crowned Emperor Tewodros II.'
      ]
    }
  ],

  // Unit 6: Internal Developments and External Relations 1800–1941
  6: [
    {
      id: 'hist-extra-u6-sec1',
      heading: '6.4 Masterclass: The Modern State Unification, The Adwa Campaign & The Antifascist Resistance',
      content: `### 6.4.1 The Unification Trinity: Tewodros II, Yohannes IV, Menelik II
1. **Emperor Tewodros II ($1855\\text{--}1868$)**:
   - The visionary modernizer; centralized taxation, created a national salaried army, attempted arms manufacturing at Gafat (*Sebastopol mortar*).
   - Clashed with Britain over unreturned diplomatic correspondence; General Robert Napier invaded with $32,000$ troops; Tewodros committed suicide atop **Maqdala (April 13, 1868)** rather than surrender.
2. **Emperor Yohannes IV ($1872\\text{--}1889$)**:
   - Pursued decentralized federalism (*"King of Kings"*); defended Ethiopia against Egyptian imperial aggression (**Gundet 1875, Gura 1876**), Italian aggression (**Dogali 1887**), and the Sudanese Mahdists; killed at the **Battle of Metemma ($1889$)**.
3. **Emperor Menelik II ($1889\\text{--}1913$)**:
   - Territorial expansion unifying southern and eastern regions; administrative modernization (telephone, railway, national bank, ministerial cabinet).

---

### 6.4.2 The Battle of Adwa (March 1, 1896)
- **Cause**: Deceptive Italian translation of **Article XVII of the Treaty of Wuchale (1889)**:
  - Amharic text: Ethiopia *could* choose to employ Italy's good offices for foreign diplomacy (optional).
  - Italian text: Ethiopia *must* conduct all foreign affairs through Italy (forced protectorate status!).
  - Menelik abrogated the treaty in 1893.
- **The Campaign**:
  - Over $100,000$ Ethiopian soldiers mobilized nationwide under Menelik II and Empress Taytu Betul.
  - Italian General Baratieri attacked at Adwa with $17,000$ troops.
  - In a single day of fierce combat, Ethiopian forces routed the Italian army, killing over $4,000$ Italian soldiers.
- **Significance**: First definitive military defeat of a European colonial power by an African sovereign state; guaranteed Ethiopia's unconditional independence; inspired global Pan-African anti-colonial liberation.`,
      keyTakeaways: [
        'The Treaty of Addis Ababa (October 1896) annulled the Treaty of Wuchale and forced Italy to recognize Ethiopia\'s absolute independence.',
        'Adwa became the universal symbol of Black dignity, freedom, and resistance against white colonial supremacy.'
      ]
    }
  ],

  // Unit 7: Internal Developments and External Relations Since 1941
  7: [
    {
      id: 'hist-extra-u7-sec1',
      heading: '7.4 Masterclass: The 1974 Revolution, Derg Governance Realities & Post-1991 Constitutional Transitions',
      content: `### 7.4.1 The Downfall of the Imperial Regime ($1974$)
- **Structural Crises**:
  - Feudal land tenure (*Gult/Rist*) impoverishing millions of tenant farmers.
  - Peasant rebellions in **Bale ($1963\\text{--}1970$)**, **Gojjam ($1968$)**, and **Tigray**.
  - **Ethiopian Student Movement (ESM)**: Chanting *"Land to the Tiller"* (*Meret Larashu*); popularized Marxist-Leninist discourse and raised the "Question of Nationalities" (Wallelign Mekonnen 1969).
  - Catastrophic **Wollo Famine ($1973$)** concealed by imperial authorities.
  - Mutinies in the armed forces leading to the formation of the **Derg** (Coordinating Committee of the Armed Forces), which formally deposed Emperor Haile Selassie I on **September 12, 1974**.

---

### 7.4.2 The Derg Regime ($1974\\text{--}1991$)
- **Radical Reforms**:
  - Nationalization of all rural agricultural land (**Proclamation 31/1975**), abolishing landlord tenancy.
  - Urban land and extra houses nationalized (**Proclamation 47/1975**); creation of urban neighborhood associations (*Kebele*).
- **Red Terror vs. White Terror ($1976\\text{--}1978$)**: Violent urban extermination campaign against the EPRP and other political dissidents.
- **Ethio-Somali War ($1977\\text{--}1978$)**: Siad Barre invaded the Ogaden; repelled by Ethiopian forces with decisive Soviet military airlift and $12,000$ Cuban troops.
- **Collapse ($1991$)**: Economic bankruptcy, the $1984\\text{--}85$ famine, cessation of Soviet aid (*Perestroika*), and combined military advances by the EPRDF and EPLF captured Addis Ababa on **May 28, 1991**.`,
      keyTakeaways: [
        'The 1974 Ethiopian Revolution shattered centuries of feudal land relations with the "Land to the Tiller" proclamation.',
        'The 1995 FDRE Constitution restructured Ethiopia into a multi-ethnic federation based on linguistic self-determination.'
      ]
    }
  ]
};
