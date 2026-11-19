import { Subject, Semester, OutlineChapterItem } from '../types.ts';

export interface FreshmanCourseCatalogItem {
  id: string;
  code: string;
  title: string;
  shortTitle: string;
  subject: Subject;
  semester: Semester;
  creditHours: number;
  category: 'Natural Science Core' | 'Common Competency' | 'Social & Humanities' | 'Technology & Wellness';
  overview: string;
  keyTopics: string[];
  units?: string[];
  midtermWeight?: string;
  finalWeight?: string;
  defaultChapters: OutlineChapterItem[];
}

export type CourseCatalogEntry = FreshmanCourseCatalogItem;

export const OFFICIAL_17_FRESHMAN_COURSES: FreshmanCourseCatalogItem[] = [
  // ==========================================
  // 1. Anthropology (7 Units)
  // ==========================================
  {
    id: 'anthropology',
    code: 'Anthropology',
    title: 'Anthropology',
    shortTitle: 'Anthropology',
    subject: 'anthropology',
    semester: 1,
    creditHours: 3,
    category: 'Social & Humanities',
    overview: 'Comprehensive 7-Unit study of anthropology: introducing anthropology and its subject matter, the four sub-fields of anthropology and paleoanthropological human origins/racial variations, human diversity and Ethiopian culture areas, marginalized and vulnerable groups, identity and ethnicity theories, customary governance and peacemaking, and indigenous knowledge systems (IKS).',
    keyTopics: [
      'Unit 1: Introducing Anthropology and Its Subject Matter',
      'Unit 2: Sub-Fields of Anthropology (Archaeological, Linguistic, Socio-Cultural & Physical/Biological)',
      'Unit 3: Human Diversity, Culture Areas and Contact in Ethiopia',
      'Unit 4: Marginalized, Minorities, and Vulnerable Groups',
      'Unit 5: Identity, Inter-Ethnic Relations and Multiculturalism in Ethiopia',
      'Unit 6: Customary and Local Governance Systems and Peace Making',
      'Unit 7: Indigenous Knowledge Systems (IKS) and Practices'
    ],
    defaultChapters: [
      {
        id: 'anth-ch1',
        chapterNumber: 1,
        title: 'UNIT ONE: INTRODUCING ANTHROPOLOGY AND ITS SUBJECT MATTER',
        topics: [
          'Contents of the Unit: Definitions of anthropology, brief overview of its historical development, subject matter and scope, relations with other sciences and humanities, and relevance of the discipline',
          'Unit Learning Outcomes: Define anthropology; understand its historical development; explain its scope and subject matter; identify its sub-disciplines; internalize its unique features; understand its holistic, comparative and relativistic perspectives; describe similarities and differences with other disciplines; appraise its relevance and contribution',
          '1.1 Definition, Scope and Subject Matter of Anthropology',
          '1.1.1 Defining Anthropology (Greek origins: anthropos + logia; systematic study of humankind; holistic and comparative study)',
          '1.1.2 A Brief History of Anthropology (Ancient Greek philosophers, Herodotus, Sophists, Ibn Khaldun; Renaissance; 19th century; Darwinism; early 1900s ethnography; mid-1900s ethnology; founding fathers: Franz Boas, Radcliffe-Brown, Malinowski, Mauss; Ethiopia since late 1950s)',
          '1.1.3 Subject Matter and Scope of Anthropology (Vast scope: temporal and spatial; four sub-disciplines; bridges sciences and humanities; "the science of human similarities and differences"; key questions about human nature, origin, diversity)',
          '1.2 Unique Features of Anthropology (Broad Scope; Unique Approaches: Holistic, Relativistic, Comparative; Emphasis on Insider Perspective: Emic vs. Etic; Method of Research: Qualitative, Ethnographic fieldwork, Participant observation, Focus on local/micro-social processes)',
          '1.3 Misconceptions about Anthropology (Study of "primitive" societies only; Study of fossil remains only; Purpose to keep communities from development)',
          '1.4 The Relationship between Anthropology and Other Disciplines (Overlaps with humanities, social sciences, physical sciences; Distinctive characteristics: broad scope, unique approach, perspective, unit of analysis, methods; Comparison with sociology, philosophy, history, linguistics)',
          '1.5 Contributions of Anthropology (Corrective tool to deterministic thinking; Helps understand ourselves; Insight into different ways of life; Creates global awareness; Helps fight prejudice and ethnocentrism; Cultivates critical thinking; Practical applications in development, policy, problem-solving)',
          '1.6 Unit Summary, Suggested Reading Materials & Reference Materials'
        ],
        readings: 'Anthropology Module — Unit 1'
      },
      {
        id: 'anth-ch2',
        chapterNumber: 2,
        title: 'UNIT TWO: SUB-FIELDS OF ANTHROPOLOGY',
        topics: [
          'Contents of the Unit: Definitions of the four main branches of anthropology. Physical anthropology in detail: paleo-anthropological perspectives on human origins, perspectives on racial types, human physical variations, and the history of racial types',
          'Unit Learning Outcomes: Define the four main sub-fields of anthropology; explain paleo-anthropological perspectives on human origins; analyze human physical variations and perspectives on racial types; critique the historical classification of racial types',
          '2.1 Archaeological Anthropology (Study of past ways of life via material remains: Artifacts, Features, and Ecofacts; Prehistoric, Historic, Classical, and Ethno-archaeology)',
          '2.2 Linguistic Anthropology (Study of human language in cultural and social contexts: Structural/Descriptive Linguistics, Historical Linguistics, Ethno-linguistics/Cultural Linguistics, and Sociolinguistics)',
          '2.3 Socio-Cultural Anthropology (Study of contemporary human societies and cultures; Ethnography — descriptive fieldwork in a single community vs. Ethnology — cross-cultural comparative analysis; Specialized fields: Medical, Urban, Economic, Political, Development Anthropology)',
          '2.4 Physical/Biological Anthropology (Paleo-anthropological perspectives on human origins & East African/Ethiopian hominid fossils; Primatology; Human Genetics; Forensic Anthropology; Perspectives on racial types, clinal human physical variations, Bergmann\'s & Allen\'s rules, and the history/deconstruction of racial types)',
          '2.5 Unit Summary, Suggested Reading Materials & Reference Materials'
        ],
        readings: 'Anthropology Module — Unit 2'
      },
      {
        id: 'anth-ch3',
        chapterNumber: 3,
        title: 'UNIT THREE: HUMAN DIVERSITY, CULTURE AREAS AND CONTACT IN ETHIOPIA',
        topics: [
          'Contents of the Unit: Conceptualizing culture, characteristic features and elements of culture, ethnocentrism, cultural relativism and human rights, mechanisms of culture change, marriage, family and kinship ties, and culture areas of Ethiopia',
          'Unit Learning Outcomes: Define culture; identify characteristic features and elements of culture; distinguish ethnocentrism from cultural relativism; explain mechanisms of culture change; analyze marriage, family, and kinship systems; classify major culture areas of Ethiopia',
          '3.1 Conceptualizing Culture: What Culture Is and What Culture Is Not (E.B. Tylor\'s definition; Enculturation; Material vs. Non-Material Culture)',
          '3.2 Characteristic Features of Culture (Culture is learned, shared, symbolic, all-encompassing, integrated, adaptive and maladaptive, and dynamic)',
          '3.3 Aspects/Elements of Culture (Values, Beliefs, Norms — Folkways and Mores, Symbols, Language; Cultural Universals, Generalities, and Particularities)',
          '3.4 Ethnocentrism, Cultural Relativism, and Human Rights (Judging other cultures by one\'s own standards vs. understanding practices in their own cultural context)',
          '3.5 Culture Change (Invention, Diffusion — Direct, Forced, and Indirect, Acculturation, and Globalization)',
          '3.6 Ties That Connect: Marriage, Family, and Kinship (Endogamy, Exogamy, Incest Taboo, Monogamy, Polygyny, Polyandry, Levirate, Sororate, Bridewealth/Brideprice, Dowry, Brideservice, Post-marital Residence Rules; Family of Orientation vs. Procreation; Consanguineal, Affinal, and Fictive Kinship; Unilineal and Bilateral Descent)',
          '3.7 Culture Areas and Cultural Contact in Ethiopia (Plough Culture Area, Enset Culture Area, and Pastoral Culture Area)',
          '3.8 Unit Summary, Suggested Reading Materials & Reference Materials'
        ],
        readings: 'Anthropology Module — Unit 3'
      },
      {
        id: 'anth-ch4',
        chapterNumber: 4,
        title: 'UNIT FOUR: MARGINALIZED, MINORITIES, AND VULNERABLE GROUPS',
        topics: [
          'Contents of the Unit: Concepts of marginalization, minority groups, and vulnerability; gender-based marginalization; marginalized occupational groups; age-based vulnerability; religious and ethnic minorities; human rights approaches to inclusiveness',
          'Unit Learning Outcomes: Define marginalization, minority, and vulnerability; analyze gender-based marginalization and harmful traditional practices; examine the paradox of marginalized occupational craft workers in Ethiopia; appraise human rights frameworks for protecting vulnerable groups',
          '4.1 Definition of Concepts (Marginalization, Minority Groups, Vulnerability, and Social Exclusion)',
          '4.2 Gender-Based Marginalization (Gender inequality and Harmful Traditional Practices: Female Genital Cutting/Mutilation, Early/Child Marriage, Abduction)',
          '4.3 Marginalized Occupational Groups (Craft workers in Ethiopia: potters, tanners, weavers, ironsmiths/blacksmiths; spatial, social, economic, and marital exclusion)',
          '4.4 Age-Based Vulnerability (Vulnerability of children and older persons; changing traditional social support networks)',
          '4.5 Religious and Ethnic Minorities (Stereotyping, prejudice, discrimination, and minority rights protection)',
          '4.6 Human Rights Approaches and Inclusiveness (Promoting social justice, dignity, and constitutional protections)',
          '4.7 Unit Summary, Suggested Reading Materials & Reference Materials'
        ],
        readings: 'Anthropology Module — Unit 4'
      },
      {
        id: 'anth-ch5',
        chapterNumber: 5,
        title: 'UNIT FIVE: IDENTITY, INTER-ETHNIC RELATIONS AND MULTICULTURALISM IN ETHIOPIA',
        topics: [
          'Contents of the Unit: Conceptualizing identity, ethnicity, and race; theoretical approaches to ethnicity; ethnic groups and ethnic boundaries; inter-ethnic relations and multiculturalism in Ethiopia',
          'Unit Learning Outcomes: Distinguish ethnicity, race, and identity; explain ethnic boundary maintenance; compare Primordialist, Instrumentalist, and Social Constructivist theories of ethnicity; evaluate multiculturalism in Ethiopia',
          '5.1 Identity, Ethnicity and Race: A Conceptual Overview (Ethnic Groups & Hutchinson and Smith\'s six features of an ethnie; Fredrik Barth\'s Ethnic Boundaries and Boundary Maintenance; Social Construction of Race vs. Ethnicity)',
          '5.2 Conceptualizing Ethnicity: Theories of Ethnicity (Primordialist Approach — Geertz, Isaacs, Van den Berghe; Instrumentalist Approach — Abner Cohen, Paul Brass; Social Constructivist Approach — Fredrik Barth)',
          '5.3 Inter-Ethnic Relations and Multiculturalism in Ethiopia (Managing ethnic diversity, peaceful coexistence, and shared national spaces)',
          '5.4 Unit Summary, Suggested Reading Materials & Reference Materials'
        ],
        readings: 'Anthropology Module — Unit 5'
      },
      {
        id: 'anth-ch6',
        chapterNumber: 6,
        title: 'UNIT SIX: CUSTOMARY AND LOCAL GOVERNANCE SYSTEMS AND PEACE MAKING',
        topics: [
          'Contents of the Unit: Indigenous and local governance systems; intra- and inter-ethnic conflict resolution institutions; women\'s role in conflict resolution and peacemaking; legal pluralism in Ethiopia',
          'Unit Learning Outcomes: Describe indigenous governance systems in Ethiopia; analyze customary conflict resolution mechanisms and elders\' councils; explain women\'s peacemaking institutions; examine legal pluralism and state-customary law interaction',
          '6.1 Indigenous and Local Governance (The Oromo Gadaa System, The Gedeo Baalle System, The Gamo Dere Woga and Dubusha Assembly)',
          '6.2 Intra- and Inter-Ethnic Conflict Resolution Institutions (Shimgilina, Jaarsummaa, Abo-Gereb, Xeer, Mada\'a, Guma; Elders\' Councils and Restorative Justice vs. Retributive Courts)',
          '6.3 Women\'s Role in Conflict Resolution and Peacemaking (Siqqee institution among Oromo women, Don Kachel among Agnuak women, Sidama Yakka)',
          '6.4 Legal Pluralism: Interaction between Customary and State Legal Systems (Coexistence of state, customary, and religious laws; strengths and human rights limitations)',
          '6.5 Unit Summary, Suggested Reading Materials & Reference Materials'
        ],
        readings: 'Anthropology Module — Unit 6'
      },
      {
        id: 'anth-ch7',
        chapterNumber: 7,
        title: 'UNIT SEVEN: INDIGENOUS KNOWLEDGE SYSTEMS (IKS) AND PRACTICES',
        topics: [
          'Contents of the Unit: Definition and characteristics of Indigenous Knowledge Systems (IKS) and indigenous peoples; significance of IKS in conservation, medicine, agriculture, and development; challenges and preservation of IKS',
          'Unit Learning Outcomes: Define Indigenous Knowledge Systems (IKS) and identify their unique features; appraise the significance of IKS for environmental conservation and sustainable development; analyze challenges threatening IKS and propose preservation strategies',
          '7.1 Definition of Concepts: Indigenous Knowledge Systems (IKS) and Indigenous Peoples (Characteristics and unique features of IKS: local, empirical, cumulative, oral, holistic, and adaptive)',
          '7.2 Significance of Indigenous Knowledge (Environmental conservation: Konso terracing, Gedeo agroforestry, Borana Ella water management; Traditional medicine; Social mutual-aid institutions: Iddir, Iqqub, Debo/Jigge; IKS in sustainable development)',
          '7.3 Challenges Facing the Preservation of Indigenous Knowledge (Globalization, modernization, loss of oral elders, biopiracy, and strategies for documentation and integration)',
          '7.4 Unit Summary, Suggested Reading Materials & Reference Materials'
        ],
        readings: 'Anthropology Module — Unit 7'
      }
    ]
  },

  // ==========================================
  // 2. Biology (10 Chapters)
  // ==========================================
  {
    id: 'biology',
    code: 'Biology',
    title: 'Biology',
    shortTitle: 'Biology',
    subject: 'biology',
    semester: 1,
    creditHours: 3,
    category: 'Natural Science Core',
    overview: 'Comprehensive 10-Chapter General Biology course covering introduction to biology and the origin of life, biological molecules, the cellular basis of life, cellular metabolism and metabolic disorders, genetics and evolution, infectious diseases and immunity, taxonomy of organisms, ecology and conservation of natural resources, introduction to botany and zoology, and applications of biological sciences.',
    keyTopics: [
      'Chapter 1: Introduction (Meaning & Scope, Origin & Nature of Life, Scientific Methods)',
      'Chapter 2: Biological Molecules (Carbohydrates, Lipids, Proteins, Nucleic Acids, Vitamins, Water, Minerals)',
      'Chapter 3: The Cellular Basis of Life (Cell Theory, Organelles, Homogenization & Membrane Transport)',
      'Chapter 4: Cellular Metabolism and Metabolic Disorders (Enzymes, Photosynthesis, Respiration & Disorders)',
      'Chapter 5: Genetics and Evolution (Cell Division, Mendelian & Non-Mendelian Genetics, DNA/RNA & Evolution)',
      'Chapter 6: Infectious Diseases and Immunity (Pathogens, Transmission & Innate/Adaptive Immunity)',
      'Chapter 7: Taxonomy of Organisms (Classification Schemes, Binomial Nomenclature & Kingdoms of Life)',
      'Chapter 8: Ecology and Conservation of Natural Resources (Ecosystems, Biogeochemical Cycles & Conservation)',
      'Chapter 9: Introduction to Botany and Zoology (Plant Divisions, Invertebrate Phyla & Vertebrate Classes)',
      'Chapter 10: Applications of Biological Sciences (Medicine, Biosensors, Industry, Forensics & Biosecurity)'
    ],
    defaultChapters: [
      {
        id: 'biol-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: Introduction',
        topics: [
          'Learning Objectives: Define biology, explain scientific methods, know the origin and nature of life',
          '1.1. The meaning and scope of biology (Definition: Greek bio = life, logos = study; Coined by Pierre-Antoine de Monet and Jean-Baptiste de Lamarck; Branches: Botany, Zoology, and applied fields)',
          '1.2. The origin and nature of life (Theories of origin: Special Creation, Spontaneous Generation, Catastrophism, Cosmozoic/Panspermia, Chemical Evolution/Oparin-Haldane; Definition of life; Three aspects of life: physical, mind, spirit; Properties of living tissues: Irritability, Growth & Reproduction, Adaptability, Metabolism, Excretion & Osmoregulation)',
          '1.3. Scientific methods (Steps: Observation, Question, Hypothesis, Prediction, Test, Iterate; Key terms: Inference, Rejected/Accepted Hypothesis, Experiment, Theory, Control, Variables)',
          'Chapter review questions'
        ],
        readings: 'Biology Module — Chapter 1'
      },
      {
        id: 'biol-ch2',
        chapterNumber: 2,
        title: 'Chapter 2: Biological Molecules',
        topics: [
          'Learning Objectives: Define biomolecules, describe organic and inorganic molecules, identify basic structures, explain precursors, state properties of water',
          '2.1. Carbohydrates (Made of C, H, O; Monosaccharides: glucose, galactose, fructose, ribose, deoxyribose; Disaccharides: maltose, lactose, sucrose; Polysaccharides: starch, glycogen, cellulose; Glycosidic linkages; Summary of carbohydrates)',
          '2.2. Lipids (Fats, oils, waxes, steroids; Triglycerides: saturated, unsaturated, polyunsaturated; Properties: Insoluble in water, hydrophobic; Importance: Cell membranes, insulation, energy storage, protection, cellular communication)',
          '2.3. Proteins (Made of amino acids: C, H, O, N, sometimes S; Structure: Amino group, carboxyl group, variable R group; Peptide bonds; Four levels of structure: Primary, Secondary, Tertiary, Quaternary; Functions: Structural support, transport, signaling, enzymes, growth control)',
          '2.4. Nucleic acids (DNA and RNA; Nucleotides: Phosphate, nitrogenous base, ribose sugar; Bases: Adenine, Cytosine, Guanine, Thymine in DNA, Uracil in RNA; ATP as energy carrier)',
          '2.5. Vitamins (Organic compounds needed in small amounts; Fat-soluble stored vs. water-soluble not stored)',
          '2.6. Water (Polar molecule; Universal solvent; Essential for life)',
          '2.7. Minerals (Inorganic compounds; Examples: Iron in hemoglobin, Calcium in bones, Magnesium in chlorophyll)',
          'Summary of unit two & Chapter review questions'
        ],
        readings: 'Biology Module — Chapter 2'
      },
      {
        id: 'biol-ch3',
        chapterNumber: 3,
        title: 'Chapter 3: The Cellular Basis of Life',
        topics: [
          'Learning Objectives: State cell theory, identify organelles and functions, explain homogenization',
          '3.1. The cell theory (Robert Hooke, Schleiden, Schwann, Virchow; Cell as basic structural and functional unit; Three major parts: Plasma membrane, Cytoplasm, Nucleus)',
          '3.2. Cell organelles (Membranous: ER Rough and Smooth, Golgi, Mitochondria, Chloroplasts, Nucleus, Lysosomes, Peroxisomes, Vacuoles; Non-membranous: Ribosomes, Centrosomes, Cilia, Flagella, Microtubules, Microfilaments)',
          '3.3. Cell fractionation and homogenization (Homogenization in isotonic cold buffer; Differential and density-gradient centrifugation)',
          '3.4. Prokaryotic vs. Eukaryotic cells, Plasma membrane structure (Fluid Mosaic Model) and cellular transport (Diffusion, Osmosis, Facilitated diffusion, Active transport, Endocytosis & Exocytosis)',
          'Chapter review questions'
        ],
        readings: 'Biology Module — Chapter 3'
      },
      {
        id: 'biol-ch4',
        chapterNumber: 4,
        title: 'Chapter 4: Cellular Metabolism and Metabolic Disorders',
        topics: [
          'Learning Objectives: Explain anabolic and catabolic pathways, describe enzyme kinetics and regulation, outline photosynthesis and cellular respiration, and identify major metabolic disorders',
          '4.1. Enzymes and their role in metabolism (Properties, classification, Lock-and-key vs. Induced-fit models, Cofactors & Coenzymes, Factors affecting enzyme activity, Competitive, Non-competitive & Allosteric inhibition)',
          '4.2. Bioenergetics and Biosynthesis: Photosynthesis (Chloroplast structure, photosynthetic pigments, Light-dependent reactions & Photophosphorylation, Calvin cycle, C3, C4, and CAM pathways)',
          '4.3. Cellular Respiration (Aerobic respiration: Glycolysis, Pyruvate oxidation, Krebs/Citric Acid Cycle, Electron Transport Chain & Chemiosmosis; Anaerobic fermentation: Lactic acid and Alcoholic fermentation)',
          '4.4. Metabolic Disorders, Diagnosis and Treatments (Diabetes mellitus Type 1 & Type 2, Phenylketonuria/PKU, Galactosemia, Hyperthyroidism, Hypothyroidism, Obesity & Metabolic syndrome)',
          'Chapter review questions'
        ],
        readings: 'Biology Module — Chapter 4'
      },
      {
        id: 'biol-ch5',
        chapterNumber: 5,
        title: 'Chapter 5: Genetics and Evolution',
        topics: [
          'Learning Objectives: Understand cell division (mitosis and meiosis), Mendelian and non-Mendelian inheritance, molecular genetics (DNA replication, transcription, translation), and evolutionary mechanisms',
          '5.1. Cell Cycle and Cell Division (Interphase: G1, S, G2; Mitosis stages & cytokinesis; Meiosis I & II, crossing over, and gametogenesis)',
          '5.2. Mendelian Genetics and Principles of Inheritance (Monohybrid and dihybrid crosses, Law of Segregation, Law of Independent Assortment, Test cross & Back cross)',
          '5.3. Non-Mendelian Inheritance and Sex Determination (Incomplete dominance, Codominance, Multiple alleles/ABO blood groups, Pleiotropy, Epistasis, Polygenic inheritance, Sex-linked traits)',
          '5.4. Molecular Genetics & Central Dogma (DNA structure & semi-conservative replication, RNA types, Transcription, Genetic code, Translation/Protein synthesis, Gene & Chromosomal mutations)',
          '5.5. Introduction to Evolution (Theories of evolution: Lamarckism, Darwinism/Natural Selection, Neo-Darwinism, Evidence of evolution)',
          'Chapter review questions'
        ],
        readings: 'Biology Module — Chapter 5'
      },
      {
        id: 'biol-ch6',
        chapterNumber: 6,
        title: 'Chapter 6: Infectious Diseases and Immunity',
        topics: [
          'Learning Objectives: Distinguish infection and disease, classify major infectious pathogens and modes of transmission, and explain innate and adaptive immune defenses',
          '6.1. Principles of Infectious Diseases (Infection vs. Disease; Acute, chronic, subacute, latent, local, and systemic diseases; Koch\'s Postulates; Chain of infection & modes of transmission)',
          '6.2. Types of Infectious Diseases and Causative Agents (Bacteria, Viruses, Fungi, Protozoa, Helminths; Major diseases: HIV/AIDS, Malaria, Tuberculosis, Cholera, Typhoid)',
          '6.3. Host Defense Mechanisms and Immunity (Innate/Non-specific immunity: First-line physical/chemical barriers & Second-line phagocytosis, inflammation, fever, interferons; Adaptive/Specific immunity: Humoral B-cell & Cell-mediated T-cell responses)',
          '6.4. Active vs. Passive Immunity, Immunization (Vaccines), Hypersensitivity, Autoimmunity, and Immunodeficiency',
          'Chapter review questions'
        ],
        readings: 'Biology Module — Chapter 6'
      },
      {
        id: 'biol-ch7',
        chapterNumber: 7,
        title: 'Chapter 7: Taxonomy of Organisms',
        topics: [
          'Learning Objectives: Explain principles of taxonomy, classification schemes, scientific naming conventions, hierarchical classification, and the kingdoms of life',
          '7.1. Basics of Taxonomy and Systematics (Definitions of Taxonomy, Identification, Nomenclature, Classification; Importance of biological classification)',
          '7.2. Classification Schemes (Artificial, Natural, and Phylogenetic classification systems; Historical development from Two-Kingdom to Five-Kingdom Whittaker system and Three-Domain Woese system)',
          '7.3. Hierarchical Classification and Binomial Nomenclature (Taxonomic ranks: Domain, Kingdom, Phylum/Division, Class, Order, Family, Genus, Species; Rules of scientific naming; Dichotomous keys)',
          'Chapter review questions'
        ],
        readings: 'Biology Module — Chapter 7'
      },
      {
        id: 'biol-ch8',
        chapterNumber: 8,
        title: 'Chapter 8: Ecology and Conservation of Natural Resources',
        topics: [
          'Learning Objectives: Define ecology, describe aquatic and terrestrial ecosystems, explain energy flow and nutrient cycling, and analyze conservation of natural resources and pollution',
          '8.1. Definition and Basic Concepts of Ecology (Ecological hierarchy: Organism, Population, Community, Ecosystem, Biome, Biosphere; Biotic and Abiotic factors)',
          '8.2. Aquatic and Terrestrial Ecosystems (Freshwater, Marine, and Estuarine ecosystems; Terrestrial biomes and Ethiopian ecological zones)',
          '8.3. Energy Flow and Nutrient Recycling (Food chains, Food webs, Trophic levels, Ecological pyramids; Biogeochemical cycles: Water, Carbon, Nitrogen, Phosphorus cycles)',
          '8.4. Conservation of Natural Resources, Pollution, and Public Health (Principles of conservation, In-situ and Ex-situ conservation, Ethiopian endemic biodiversity, Environmental pollution & climate change)',
          'Chapter review questions'
        ],
        readings: 'Biology Module — Chapter 8'
      },
      {
        id: 'biol-ch9',
        chapterNumber: 9,
        title: 'Chapter 9: Introduction to Botany and Zoology',
        topics: [
          'Learning Objectives: Describe general features of major plant groups (Algae, Bryophytes, Pteridophytes, Seed plants) and classify invertebrate and vertebrate animals',
          '9.1. General Features and Classification of Plants (Algae; Bryophytes: mosses & liverworts; Pteridophytes: ferns; Seed plants/Spermatophytes: Gymnosperms & Angiosperms — Monocots vs. Dicots)',
          '9.2. General Features of Animals (Symmetry: radial vs. bilateral; Germ layers: diploblastic vs. triploblastic; Body cavity: acoelomate, pseudocoelomate, coelomate; Protostomes vs. Deuterostomes)',
          '9.3. Invertebrate Animals (Major phyla: Porifera, Cnidaria, Platyhelminthes, Nematoda, Annelida, Mollusca, Arthropoda, Echinodermata — characteristics and biological importance)',
          '9.4. Vertebrate Animals (Phylum Chordata features; Classes Pisces/Fishes, Amphibia, Reptilia, Aves/Birds, and Mammalia; Amniotes vs. Anamniotes)',
          'Chapter review questions'
        ],
        readings: 'Biology Module — Chapter 9'
      },
      {
        id: 'biol-ch10',
        chapterNumber: 10,
        title: 'Chapter 10: Applications of Biological Sciences',
        topics: [
          'Learning Objectives: Explain practical applications of biological knowledge in medicine, engineering, industry, forensic science, and biosecurity',
          '10.1. Applications in Medicine, Agriculture, and Engineering (Vaccines, antibiotics, gene therapy, recombinant DNA; Environmental engineering, Biosystem engineering, Chemical engineering, Bioremediation)',
          '10.2. Biosensor Technology and Industrial Applications (Biosensors in diagnostics and monitoring; Biology in food, brewery/fermentation, pharmaceutical, tannery, and textile industries)',
          '10.3. Forensic Science and Biological Warfare (DNA fingerprinting/profiling in crime investigation and paternity testing; Biological warfare agents, biosecurity, and bioethics)',
          'Chapter review questions'
        ],
        readings: 'Biology Module — Chapter 10'
      }
    ]
  },

  // ==========================================
  // 3. Geography (8 Chapters)
  // ==========================================
  {
    id: 'geography',
    code: 'Geography',
    title: 'Geography',
    shortTitle: 'Geography',
    subject: 'geography',
    semester: 1,
    creditHours: 3,
    category: 'Social & Humanities',
    overview: 'Comprehensive 8-Chapter Geography of Ethiopia and the Horn course covering Chapter One: Introduction (definition, scope, approaches & 5 themes of geography; astronomical & relative location, size, shape & compactness indices of Ethiopia; basic skills of map reading), Chapter Two: The Geology of Ethiopia and the Horn (continental drift, endogenic & exogenic forces, geological time scale & dating techniques, Precambrian, Paleozoic, Mesozoic & Cenozoic eras and landforms, rock & mineral resources and greenstone belts), Chapter Three: The Topography of Ethiopia and the Horn (Western & Southeastern Highlands and Lowlands, the Rift Valley, and impacts of relief), Chapter Four: Drainage Systems and Water Resources (Western, Southeastern & Rift Valley drainage systems, rivers, lakes, subsurface water, and development potentials), Chapter Five: The Climate of Ethiopia and the Horn (elements & controls, lapse rates, spatiotemporal temperature & ITCZ rainfall patterns, 5 agro-ecological zones, climate change & response mechanisms), Chapter Six: Soils, Natural Vegetation and Wildlife Resources (weathering, 11 major soil types, degradation & conservation, 5 vegetation types, wildlife & national parks), Chapter Seven: Population of Ethiopia and the Horn (census/survey/vital registration, fertility/mortality/migration measurements, age/sex structure, crude/physiological/agricultural density, languages & settlement), and Chapter Eight: Economic Activities in Ethiopia (primary/secondary/tertiary activities, mining, forestry, fishery, 5 agricultural systems, cottage & modern manufacturing/industrial parks, and transportation, trade & tourism).',
    keyTopics: [
      'Chapter One: Introduction (1.1 Definition, Scope, Approaches & 5 Themes; 1.2 Astronomical/Relative Location, Size & Shape Compactness Indices; 1.3 Map Reading Skills)',
      'Chapter Two: The Geology of Ethiopia and the Horn (2.1 Continental Drift, 2.2 Endogenic/Exogenic Forces, 2.3 Dating, 2.4 Precambrian–Cenozoic Eras, 2.5 Minerals & Greenstone Belts)',
      'Chapter Three: The Topography of Ethiopia and the Horn (3.1 Highlands vs. Lowlands, 3.2 Western/Southeastern Highlands & Lowlands and Rift Valley, 3.3 Impacts of Relief)',
      'Chapter Four: Drainage Systems and Water Resource (4.2 Western, Southeastern & Rift Valley Drainage Systems, 4.3 Rivers, Lakes & Groundwater, 4.4 HEP, Irrigation & Fishing Potentials)',
      'Chapter Five: The Climate of Ethiopia and the Horn (5.1–5.2 Controls & Lapse Rates, 5.3 Temperature & ITCZ Rainfall Seasons, 5.4 Five Agro-Ecological Zones, 5.5 Climate Change)',
      'Chapter Six: Soils, Natural Vegetation and Wildlife Resources (6.1–6.2 Eleven Soil Types & Conservation, 6.3 Five Natural Vegetation Types, 6.4 Wildlife & National Parks)',
      'Chapter Seven: Population of Ethiopia and the Horn (7.2 Census/Surveys, 7.3 CBR/GFR/TFR/CDR/IMR/MMR/RNI & Migration, 7.4 Age/Sex Pyramid, 7.5 Densities, 7.6 Languages, 7.7 Settlements)',
      'Chapter Eight: Economic Activities in Ethiopia (8.1 Sectors, 8.2 Mining, 8.3 Forestry, 8.4 Fishery, 8.5 Five Agricultural Systems, 8.6 Manufacturing & Industrial Parks, 8.7 Transport, Trade & Tourism)'
    ],
    defaultChapters: [
      {
        id: 'geo-ch1',
        chapterNumber: 1,
        title: 'Chapter One: Introduction',
        topics: [
          '1.1 Geography: Definition, Scope and Themes — 1.1.1 Meaning of Geography: Scientific study of the Earth, analyzing spatial and temporal variations of physical, biological, and human phenomena; 1.1.2 Scope (surface of the Earth: interface of atmosphere, lithosphere, hydrosphere, biosphere), Approaches (Human-physical continuum, topical-regional continuum), and Five Themes: Location (absolute, relative), Place (toponym, site, situation), Human-Environment Interaction (dependency, adaptation, modification), Movement (people, goods, ideas), Region (formal, functional)',
          '1.2 Location, Shape and Size of Ethiopia and the Horn — 1.2.1 Location of Ethiopia: Astronomical Location (3°N - 15°N latitude, 33°E - 48°E longitude; climate, socio-cultural, and political implications) & Relative Location (Vicinal location/neighbors, relation to Red Sea, Indian Ocean, Horn of Africa, Arabian Peninsula); 1.2.2 Size of Ethiopia (~1,106,000 km², ranked 8th in Africa, 25th in the world; advantages and disadvantages of size); 1.2.3 Shape of Ethiopia and its Implication (Compact, fragmented, elongated, perforated, protruded; Indices of compactness: Area-Boundary ratio, Boundary-Circumference ratio, etc.)',
          '1.3 Basic Skills of Map Reading — Definition and importance of maps; Types of maps (Topographical, Special purpose/statistical); Marginal Information (Title, Key/Legend, Scale, North Arrow, Margin, Date of compilation); Basic Principles of Map Reading (Symbol visualization, knowledge of directions, grid reference)'
        ],
        readings: 'Geography Module — Chapter 1'
      },
      {
        id: 'geo-ch2',
        chapterNumber: 2,
        title: 'Chapter Two: The Geology of Ethiopia and the Horn',
        topics: [
          '2.1 Introduction (Geology as an Earth science; Continental drift theory by Alfred Wegener) & 2.2 The Geologic Processes: Endogenic and Exogenic Forces — Endogenic (Internal: volcanic activity, tectonic processes — folding, faulting, orogenesis, epiorogenesis) and Exogenic (External: weathering, mass transfer, erosion, deposition)',
          '2.3 The Geological Time Scale and Age Dating Techniques — Geological Time Scale (Eras, Periods, Epochs); Age Dating Techniques: Relative Dating and Absolute Dating (Radiometric techniques: Carbon-14, Potassium-Argon)',
          '2.4 Geological Processes and the Resulting Landforms of Ethiopia and the Horn — 2.4.1 Precambrian Era (4.5 billion - 600 million years ago: Orogenesis, folding, intrusive igneous activity, metamorphism, Basement rocks); 2.4.2 Paleozoic Era (600 - 225 million years ago: Denudation, peneplanation); 2.4.3 Mesozoic Era (225 - 70 million years ago: Epiorogenesis, sea transgression/regression; Deposition of Adigrat sandstone, Hintalo limestone, Upper sandstone); 2.4.4 Cenozoic Era (70 million years ago - Present: Uplifting of Arabo-Ethiopian landmass, outpouring of Trap Series lava, Formation of the Rift Valley, Quaternary volcanism and deposition)',
          '2.5 Rock and Mineral Resources of Ethiopia — 2.5.1 Brief Facts and Current State of Main Minerals (Gold, Platinum, Tantalum, Potash, Gypsum, Clay, Marble, Construction stones); 2.5.2 Mineral Potential Sites of Ethiopia: Western and South-western greenstone belt, Southern greenstone belt (Adola), Northern greenstone belt (Tigray)'
        ],
        readings: 'Geography Module — Chapter 2'
      },
      {
        id: 'geo-ch3',
        chapterNumber: 3,
        title: 'Chapter Three: The Topography of Ethiopia and the Horn',
        topics: [
          '3.1 Introduction — General characteristics; Altitude range from 125m below sea level (Kobar Sink) to 4,620m (Ras Dashen); Contrasting features between highlands (>1000m) and lowlands (<1000m)',
          '3.2 The Physiographic Divisions of Ethiopia — 3.2.1 The Western Highlands and Lowlands (Tigray Plateau, North Central Massifs, Shewa Plateau, Southwestern Highlands; Western Lowlands); 3.2.2 The Southeastern Highlands and Lowlands (Arsi-Bale-Sidama Highlands, Hararghe Plateau; Southeastern Lowlands); 3.2.3 The Rift Valley (Afar Triangle, Main Ethiopian Rift, Chew Bahir Rift)',
          '3.3 The Impacts of Relief on Biophysical and Socioeconomic Conditions — Impacts on Agriculture, Settlement patterns, Transportation, Hydroelectric power, Socio-cultural feeling, Climate, Soil, and Natural vegetation'
        ],
        readings: 'Geography Module — Chapter 3'
      },
      {
        id: 'geo-ch4',
        chapterNumber: 4,
        title: 'Chapter Four: Drainage Systems and Water Resource of Ethiopia and the Horn',
        topics: [
          '4.1 Introduction (Distribution of water on Earth; Ethiopia\'s surface water potential) & 4.2 Major Drainage System of Ethiopia — 4.2.1 The Western Drainage Systems: Tekeze, Abay, Baro-Akobo, Ghibe (Omo); 4.2.2 The Southeastern Drainage Systems: Wabishebelle, Ghenale; 4.2.3 The Rift Valley Drainage System: Awash River, Lakes Region',
          '4.3 Water Resources: Rivers, Lakes and Sub-Surface Water — 4.3.1 The Ethiopian Rivers: General characteristics (originate from highlands, trans-boundary, seasonal fluctuation, rapids, gorges); 4.3.2 The Ethiopian Lakes (Lake Tana, Rift Valley lakes, crater lakes, man-made lakes); 4.3.3 Subsurface (Ground) Water Resource of Ethiopia',
          '4.4 Water Resources Potentials and Development in Ethiopia — Hydro-electric Potential, Irrigation and Transportation, Fishing and Recreation'
        ],
        readings: 'Geography Module — Chapter 4'
      },
      {
        id: 'geo-ch5',
        chapterNumber: 5,
        title: 'Chapter Five: The Climate of Ethiopia and the Horn',
        topics: [
          '5.1 Introduction (Weather vs. Climate) & 5.2 Elements and Controls of Weather and Climate — 5.2.1 Controls of Weather and Climate: Latitude, Inclination of Earth\'s Axis (Equinoxes, Solstices), Altitude (Lapse rates: Dry adiabatic, Wet adiabatic, Environmental)',
          '5.3 Spatiotemporal Patterns and Distribution of Temperature and Rainfall in Ethiopia — 5.3.1 Spatiotemporal Distribution of Temperature (Determined by altitude and latitude; Traditional temperature zones: Wurch, Dega, Woinna Dega, Kolla, Bereha); 5.3.2 Spatiotemporal Distribution of Rainfall (ITCZ, Seasonal variabilities: Summer/Kiremt, Autumn, Winter, Spring/Belg; Rainfall regions)',
          '5.4 Agro-ecological Zones of Ethiopia — Wurch, Dega, Weyna Dega, Kolla, Bereha',
          '5.5 Climate Change/Global Warming: Causes, Consequences and Response Mechanisms — 5.5.1 Current Trends of Climate in Ethiopia (Temperature and Rainfall variability); 5.5.2 Causes of Climate Change (Natural and Anthropogenic); 5.5.3 Consequences of Climate Change (Health, Water resources, Agriculture, Ecosystem); 5.5.4 Climate Response Mechanisms (Mitigation, Adaptation, Resilience)'
        ],
        readings: 'Geography Module — Chapter 5'
      },
      {
        id: 'geo-ch6',
        chapterNumber: 6,
        title: 'Chapter Six: Soils, Natural Vegetation and Wildlife Resources of Ethiopia and the Horn',
        topics: [
          '6.1 Introduction (Soil formation, weathering: Mechanical, Biological, Chemical) & 6.2 Ethiopian Soils: Types, Degradation and Conservation — 6.2.2 Major Soil Types in Ethiopia (Nitosols, Acrisols, Vertisols, Lithosols, Cambisols, Regosol, Xerosols, Yermosols, Solanchaks, Fluvisols, Luvisols); 6.2.2 Soil Degradation (Physical, Biological, Chemical); 6.2.3 Soil Erosion Control Measures (Biological and Physical)',
          '6.3 Natural Vegetation of Ethiopia — 6.3.2 Major Natural Vegetation Types (Afro-alpine and sub-afro alpine, Forest, Woodland Savannah, Steppe, Semi-desert); 6.3.3 Natural vegetation Degradation; 6.3.2 Natural Vegetation Conservation',
          '6.4 Wild Life/wild animals in Ethiopia — 6.4.2 Wildlife Conservation (National Parks, Sanctuaries, Reserves); 6.4.3 Challenges of wildlife conservation in Ethiopia'
        ],
        readings: 'Geography Module — Chapter 6'
      },
      {
        id: 'geo-ch7',
        chapterNumber: 7,
        title: 'Chapter Seven: Population of Ethiopia and the Horn',
        topics: [
          '7.1 Introduction (Human population as a point of reference) & 7.2 Population Data: Uses and Sources (Census, Sample Survey, Vital Registration)',
          '7.3 Population Dynamics: Fertility, Mortality and Migration — 7.3.1 Demographic Measurements (CBR, GFR, TFR, CDR, IMR, MMR, Life Expectancy, NRI); 7.3.2 Levels and trends in Fertility and Mortality rates in Ethiopia; 7.3.3 Migration in Ethiopia and the Horn (Internal and International migration)',
          '7.4 Age and Sex Structure of Ethiopian Population (Age Structure, Sex Structure, Population Pyramid) & 7.5 Population Distribution in Ethiopia — 7.5.1 Measures of Population Distribution (Crude Density, Physiological Density, Agricultural Density); 7.5.2 Factors Affecting Population Distribution in Ethiopia (Physical and Human factors)',
          '7.6 Socio-cultural Aspects of Ethiopian Population: Education, Health and Languages (Education, Health, Language Families: Afro-Asiatic, Nilo-Saharan) & 7.7 Settlement Types and Patterns — 7.7.1 Types of Settlement: Rural (Temporary/Mobile, Permanent) and Urban; 7.7.2 Urban Settlements and Urbanization in Ethiopia'
        ],
        readings: 'Geography Module — Chapter 7'
      },
      {
        id: 'geo-ch8',
        chapterNumber: 8,
        title: 'Chapter Eight: Economic Activities in Ethiopia',
        topics: [
          '8.1 Introduction (Classification of economic activities: Primary, Secondary, Tertiary), 8.2 Mining Activity in Ethiopia (Introduction, Status of mineral sector investment, Importance of Mining sector, Environmental issues), 8.3 Forestry (Economic significance of forest) & 8.4 Fishery (Introduction, Fishing Grounds in Ethiopia, Demand and consumption of fish, Constraints and opportunities)',
          '8.5 Agriculture in Ethiopia — 8.5.2 Contributions, potentials and characteristics of agriculture in Ethiopia; 8.5.3 Agriculture Systems in Ethiopia (Highland mixed farming, Lowland mixed farming, Pastoral system, Shifting cultivation, Commercial agriculture); 8.5.4 Major problems of Ethiopian agriculture',
          '8.6 Manufacturing Industry in Ethiopia — 8.6.2 Types and characteristics of manufacturing (Cottage industries, Manufacturing industries); 8.6.3 The Spatial Distribution of Manufacturing Industries in Ethiopia (Industrial parks/zones); 8.6.4 Industrial development in Ethiopia (Challenges and Opportunities)',
          '8.7 The Service Sector in Ethiopia — 8.7.2 Transportation and communication in Ethiopia (Traditional, Road, Railway, Waterways, Airways); 8.7.3 Trade in Ethiopia; 8.7.4 Tourism in Ethiopia (Types, major tourist attraction sites, challenges and prospects)'
        ],
        readings: 'Geography Module — Chapter 8'
      }
    ]
  },

  // ==========================================
  // 4. Entrepreuner (7 Chapters)
  // ==========================================
  {
    id: 'entrepreneur',
    code: 'Entrepreuner',
    title: 'Entrepreuner',
    shortTitle: 'Entrepreuner',
    subject: 'entrepreneur',
    semester: 2,
    creditHours: 3,
    category: 'Social & Humanities',
    overview: 'Comprehensive 7-Chapter Entrepreneurship course covering the nature and historical origin of entrepreneurship, entrepreneurial mindset and competences, creativity and innovation, business planning and opportunity identification/screening, business formation and Micro & Small Enterprises (MSEs) in Ethiopia, product/service development and intellectual property protection, marketing philosophies/research/mix and customer service, business financing (equity, debt, lease, traditional Equib/Idir, crowdfunding, microfinance), and managing growth, transition, Timmons model, Ansoff matrix, and CSR/ethics.',
    keyTopics: [
      'Chapter 1: The Nature of Entrepreneurship (Historical Origin, Definitions, Types, Economic Role, Competence/Environment, Creativity & Innovation)',
      'Chapter 2: Business Planning (Opportunity Identification/Evaluation, Idea Development/Generation/Screening & Developing a Business Plan)',
      'Chapter 3: Business Formation (Forms of Business Ownership, Role/Classification of MSEs in Ethiopia, Failure/Success Factors & Team Formation)',
      'Chapter 4: Product/Service Development (8-Stage Development Process, Legal/Regulatory Frameworks & Intellectual Property Protection: Patents, Trademarks, Copyrights)',
      'Chapter 5: Marketing (Core Concepts, 5 Utilities, Marketing Philosophies, MIS/Research/Intelligence, 4Ps Marketing Mix & Customer Service)',
      'Chapter 6: Business Financing (Capital Requirements, Equity vs. Debt, 5 Cs of Credit, Lease Financing, Traditional Equib/Idir, Crowdfunding & Ethiopian MFIs)',
      'Chapter 7: Managing Growth and Transition (Timmons Model, Expansion Strategies, Ansoff Growth Matrix, CSR, Triple Bottom Line, Stakeholder Theory & Business Ethics)'
    ],
    defaultChapters: [
      {
        id: 'ent-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: The Nature of Entrepreneurship',
        topics: [
          'Chapter Objectives: Define entrepreneurship and entrepreneur; Identify types of entrepreneur; Recognize the role of entrepreneurship in the economy; Analyze entrepreneurial competences; Understand creativity and innovation',
          '1.1 Introduction — Origin of the word \'entrepreneur\' (French); Concepts: entrepreneurial, entrepreneurship, entrepreneurial process; Entrepreneurship is what the entrepreneur does',
          '1.2 Historical Origin of Entrepreneurship — 17th Century (Contractual agreement with government); 18th Century (Richard Cantillon: risk taker, differentiation from capital providing role); Late 19th/Early 20th Century (Economic perspectives); Mid 20th Century (Entrepreneur as an inventor, innovation and newness)',
          '1.3 Definitions of Entrepreneurship and Entrepreneur — Five critical elements (Perceive opportunity, Commercialize, Pursue on sustainable basis, Pursue through systematic means, Acceptance of risk/failure); Three perspectives (Economist, Psychologist, Capitalist philosopher); Entrepreneur refers to the person, entrepreneurship defines the process',
          '1.4 Types of Entrepreneurs — Individual entrepreneur, Intrapreneur (entrepreneurial work within large organization), Entrepreneurial Organization',
          '1.5 Role of Entrepreneurs in Economic Development — Per capita Income/Wealth Generation, Employment Opportunities, Inspire others, Balanced Regional Development, Enhance Number of Enterprises, Diversity in Firms, Economic Independence, Combine Economic factors, Market efficiency, Accepting Risk, Maximize Investor\'s Return',
          '1.6 Entrepreneurial Competence and Environment — 1.6.1 Entrepreneurial Mindset: Who Becomes an Entrepreneur? (Young Professional, Inventor, Excluded); Qualities of an Entrepreneur (Opportunity-seeking, Persevering, Risk Taking, Demanding for efficiency and quality, Information-seeking, Goal Setting, Planning, Persuasion and networking, Building self-confidence, Listening to others, Demonstrating leadership); Entrepreneurial Skills: General Management Skills (Strategy, Planning, Marketing, Financial, Project Management, Time Management) & People Management Skills (Communication, Leadership, Motivation, Delegation, Negotiation); Entrepreneurial Tasks & Wealth of the Entrepreneur (Stakeholders); 1.6.2 Entrepreneurship and Environment: External (Economic, Legal, Political, Socio-Cultural, Demographic) & Internal (Raw Material, Production/Operation, Finance, Human Resource)',
          '1.7 Creativity, Innovation and Entrepreneurship — 1.7.1 Creativity: Steps in Creative Process (Opportunity Recognition, Immersion, Incubation, Insight, Verification and Application) & Barriers to Creativity; 1.7.2 Innovation: Innovation Process (Analytical planning, Resources organization, Implementation, Commercial application) & 7 Areas of Innovation; 1.7.3 From Creativity to Entrepreneurship (Entrepreneurship = creativity + innovation)',
          '1.8 Summary & 1.9 Review Questions'
        ],
        readings: 'Entrepreuner Module — Chapter 1'
      },
      {
        id: 'ent-ch2',
        chapterNumber: 2,
        title: 'Chapter 2: Business Planning',
        topics: [
          'Chapter Objectives: Identify opportunity in the environment; Evaluate the opportunities; Generate business idea; Explain the concept of business planning; Identify components of business plan; Develop business plan',
          '2.1 Introduction & 2.2 Opportunity Identification and Evaluation — Five main steps: (1) Scanning the Environment/Getting the Idea, (2) Opportunity Identification, (3) Opportunity Development, (4) Opportunity Evaluation (Table 2.1: Business factors), (5) Assessment of the Entrepreneurial Team (Table 2.2: Team factors)',
          '2.3 Business Idea Development — Case 1 (Janet\'s Experience), Case 2 (Lily\'s Experience); Three types of business ideas: Old Idea, Old Idea with Modification, A New Idea',
          '2.4 Business Idea Identification — 2.4.1 The Need Your Business Will Fulfill for Customers; 2.4.2 Good or Service Your Business Will Sell; 2.4.3 Identifies Potential Customer; 2.4.4 Strategy for Selling Goods or Services; 2.4.5 Relation between Business and Environment',
          '2.5 Methods for Generating Business Ideas — Case 3 (Hamisi Experience); 11 Methods: (1) Learn from successful business owners, (2) Draw from Experience (Own & Others\'), (3) Survey Local Business Area, (4) Scanning Environment (Natural Resources, Skills of People, Waste Products, Import Substitution, Publications, Trade Fairs), (5) Brainstorming, (6) Structured Brainstorming, (7) Focus Group, (8) Problem Inventory Analysis, (9) Free Association, (10) Forced Relationships, (11) Attribute Listing',
          '2.6 Business Idea Screening — 1) Macro screening, 2) Micro Screening, 3) Scoring the Suitability of Business Idea',
          '2.7 Concept of Business Plan & 2.8 Developing a Business Plan — 2.8.1 Business Planning Process (Preliminary Investigation, Opportunity Identification & Idea Generation, Environmental Scanning, Feasibility Analysis, Report Preparation); 2.8.2 Essential Components of Business Plan (Cover Sheet, Executive Summary, The Business, Funding Requirement, Product/Services, Marketing/Operational/Organizational/Financial Plan, Critical Risks, Exit Strategy, Appendix)',
          '2.9 Sample Business Plan Format (Ethiopian Micro-Enterprise Application), 2.10 Summary & 2.11 Review Questions'
        ],
        readings: 'Entrepreuner Module — Chapter 2'
      },
      {
        id: 'ent-ch3',
        chapterNumber: 3,
        title: 'Chapter 3: Business Formation',
        topics: [
          'Chapter Objectives: Explain Concept of Business Development; Identify Forms of Business Ownership; Analyze Importance/Role of MSEs; Set Up Small Scale Business; Distinguish Failure and Success Factors of MSEs; Identify Problems of Small Scale Business in Ethiopia; Develop Organizational Culture',
          '3.1 Introduction, 3.2 Concept of Small Business Development & 3.3 Forms of Business — Proprietorship, Partnership, Corporation; Table 3.1 Factors in Three Forms of Business Formation (Ownership, Liability, Costs of Starting, Continuity, Transferability, Capital Requirements, Management Control, Distribution of Profits, Attractiveness for Raising Capital)',
          '3.4 Definition and Role/Importance of MSEs in Developing Countries — 3.4.1 Definition of MSEs: Size Criteria & Economic/Control Criteria (Market Share, Independence, Personalized Management, Technology, Geographical Area); 3.4.2 Role/Importance of MSEs in Developing Countries (15 key economic contributions)',
          '3.5 Classification of Micro and Small Enterprises — Manufacturing vs. Service Enterprise (Table 3.2 Improved Definitions of MSEs); Priority Sectors in Ethiopia (Manufacturing, Construction, Trade, Service, Agriculture); Levels of MSEs in Ethiopia (Start-up, Growth, Maturity, Growth-Medium)',
          '3.6 Setting up Small Scale Business — Steps (Discovery, Evaluation, Exploitation); Environmental Analysis (Macro Environment, Sectoral Analysis, SWOT Analysis)',
          '3.7 Small Business Failure and Success Factors — 3.7.1 Failure Factors (Inadequate Management, Inadequate Financing, Neglect, Fraud, Disaster; Business Termination vs. Failure); 3.7.2 Success Factors (Conducive Environment, Adequate Credit Assistance, Markets and Marketing Support)',
          '3.8 Main Supporting Packages for MSEs Development in Ethiopia & 3.9 Problems of Small Scale Business in Ethiopia',
          '3.10 Organizational Structure and Entrepreneurial Team Formation — Designing the Organization (Structure, Planning/measurement/evaluation schemes, Rewards, Selection criteria, Training) & Building Management Team and Organizational Culture; 3.11 Summary & 3.12 Review Questions'
        ],
        readings: 'Entrepreuner Module — Chapter 3'
      },
      {
        id: 'ent-ch4',
        chapterNumber: 4,
        title: 'Chapter 4: Product/Service Development',
        topics: [
          'Chapter Objectives: Describe the Concept of Product and Services; List Product/Service Development Process; Discuss the Intellectual Property Protection',
          '4.1 Introduction & 4.2 The Concept of Product/Service',
          '4.3 Product/Service Development Process (8 Stages) — 1. New Idea Generation, 2. Idea Screening, 3. Concept Development and Testing, 4. Marketing Strategy Development, 5. Business Analysis, 6. Product Development, 7. Market Testing, 8. Commercialization (When, Where, To Whom, How)',
          '4.4 Legal and Regulatory Frameworks for Entrepreneurs',
          '4.5 Intellectual Property Protection/Product/Service Protection — 4.5.1 What is Intellectual Property?; 4.5.2 Patents (Utility Patent, Design Patent, What Can Be Patented); 4.5.3 Trademarks (Benefits of a Registered Trademark); 4.5.4 Copyrights',
          '4.6 The Intellectual Property System in Ethiopia — Ethiopian Intellectual Property Office (EIPO), Patent Proclamation, Copyright Proclamation, Trademark Directive',
          '4.7 Chapter Summary & 4.8 Questions for Review and Discussions'
        ],
        readings: 'Entrepreuner Module — Chapter 4'
      },
      {
        id: 'ent-ch5',
        chapterNumber: 5,
        title: 'Chapter 5: Marketing',
        topics: [
          'Chapter Objectives: Define marketing concepts; Analyze marketing philosophies; Describe role of marketing; Conduct marketing research; Make competitive analysis; Implement marketing intelligence; Apply marketing mixes and strategies; Implement selling and customer service skills',
          '5.1 Introduction, 5.2 Meaning and Definitions of Marketing (Kotler, Stanton, Mazor, AMA) & 5.3 Core Concepts of Marketing (Needs, Wants and Demand; Products; Value, Cost, Satisfaction; Exchange and Transaction; Relationship and Networks; Market; Marketers and Prospects)',
          '5.4 Importance of Marketing — Five Types of Economic Utility: Form Utility, Place Utility, Time Utility, Information Utility, Possession Utility',
          '5.5 Marketing Philosophies — 1. The Production Concept, 2. The Product Concept, 3. The Selling/Sales Concept, 4. The Marketing Concept (Table 5.1 Selling vs. Marketing Concept Contrasted), 5. The Societal Marketing Concept (Table 5.2 Evolution of Marketing), 6. Relationship Marketing',
          '5.6 Marketing Information Systems (MIS) — 5.6.1 Marketing Research (Role, Components, Customer Satisfaction Research, 6-Step Marketing Research Process); 5.6.2 Marketing Intelligence (Importance, Ways to Undertake); 5.6.3 Competitive Analysis (Uses, Steps)',
          '5.7 The Marketing Mix and Marketing Strategies — 5.7.1 The 4 P\'s of Marketing (Product, Pricing, Place, Promotion); 5.7.2 Marketing Strategies: Pricing Strategy (Price Skimming, Penetration Pricing, Cost-plus, Mark-up, Competition Oriented, Odd-even), Promotion Strategies (Advertising, Personal selling, Public relations, Sales promotion), Distribution Strategies (Direct vs. Indirect channels)',
          '5.8 Selling and Customer Service — 5.8.1 Concept of Service (4 Characteristics: Intangibility, Inseparability, Variability, Perishability); 5.8.2 Concept of Customer; 5.8.3 Strategic Activities for Quality Customer Service; 5.8.4 Customer Handling and Satisfaction',
          '5.9 Chapter Summary, 5.10 Review Questions & Practical Activity on Marketing'
        ],
        readings: 'Entrepreuner Module — Chapter 5'
      },
      {
        id: 'ent-ch6',
        chapterNumber: 6,
        title: 'Chapter 6: Business Financing',
        topics: [
          'Chapter Objectives: Learn about the cost of starting an enterprise; Know the different sources of finance; Understand lease financing; Learn micro finances; Understand crowd funding; Learn about traditional financing in Ethiopia',
          '6.1 Introduction & 6.2 Financial Requirements — 1) Permanent Capital, 2) Medium term capital, 3) Short term capital or working capital',
          '6.3 Sources of Financing — 6.3.1 Internal Sources (Equity capital): Personal saving, Friends and relatives, Partners, Public stock sale, Angels, Venture capital companies (Comparison of Angels vs. Venture Capitalists; Savings, Investments & Personal Budget); 6.3.2 External Sources (Debt capital): Commercial banks (Five C\'s of credit: Capital, Capacity, Collateral, Character, Conditions), Micro Finances, Trade Credit, Equipment Suppliers, Account receivable financing, Credit unions, Bonds, Traditional Sources of Finance',
          '6.4 Lease Financing — 6.4.1 Types of Lease: Finance Lease vs. Operating Lease; Advantages and Disadvantages of Lease Financing',
          '6.5 Traditional Financing in Ethiopia — Iqub (Rotating Savings and Credit) & Idir (Mutual Emergency/Burial Aid)',
          '6.6 Crowd Funding — 6.6.1 How Crowd Funding is Different; 6.6.2 Benefits (Reach, Presentation, PR & Marketing, Validation of Concept, Efficiency); 6.6.3 Types of Crowd Funding: Donation-Based, Rewards-Based, Equity-Based',
          '6.7 Micro Finances — 6.7.1 What is Micro Finance?; 6.7.2 Importance of MFIs; 6.7.3 Micro Finances in Ethiopia (ACSI, DECSI, OCSCO, Omo CSI, ADCSI) & Types of Activities',
          '6.8 Chapter Summary, 6.9 Review Questions & Practical Activity'
        ],
        readings: 'Entrepreuner Module — Chapter 6'
      },
      {
        id: 'ent-ch7',
        chapterNumber: 7,
        title: 'Chapter 7: Managing Growth and Transition',
        topics: [
          'Chapter Objectives: Identify factors that affect business growth; Understand business expansion strategies; Know & internalize business ethics & social responsibilities',
          '7.1 Introduction & 7.2 Timmons Model of Entrepreneurship (Figure 7.1) — Balancing the Three Driving Forces: 1. Opportunities, 2. Teams, 3. Resources',
          '7.3 New Venture Expansion Strategies — 7.3.1 Introduction; 7.3.2 Methods of Growth (Acquisition, Franchise ownership, Licensing, Distributorships/dealerships, New marketing routes, Industry cooperatives, Public stock offerings, Employee stock ownership plans/ESOP); 7.3.3 The Ansoff Matrix Growth Strategy (Figure 7.2: Market Penetration, Market Development, Product Development, Related & Unrelated Diversification); 7.3.4 Expansion Issues (Growing Too Fast, Recordkeeping/Infrastructure, Expansion Capital, Personnel, Customer Service, Ownership Disagreements, Family Issues, Culture Transformation, Changing Role of Owner); 7.3.5 Choosing Not to Grow',
          '7.4 Business Ethics and Social Responsibility — 7.4.1 Introduction; 7.4.2 Three Approaches to Corporate Responsibility: (1) Corporate Social Responsibility / CSR (Four obligations: Economic, Legal, Ethical, Philanthropic), (2) The Triple Bottom Line (Figure 7.3: Economic, Social, and Environmental sustainability — Profit, People, Planet), (3) Stakeholder Theory; 7.4.3 Twelve Business Ethics Principles (Honesty, Integrity, Promise-Keeping, Loyalty, Fairness, Concern for Others, Respect for Others, Law Abiding, Commitment to Excellence, Leadership, Reputation and Morale, Accountability)',
          '7.5 Summary, 7.6 Review Questions & Reading List'
        ],
        readings: 'Entrepreuner Module — Chapter 7'
      }
    ]
  },

  // ==========================================
  // 5. GlobalAffaris (5 Chapters)
  // ==========================================
  {
    id: 'global_affairs',
    code: 'GlobalAffaris',
    title: 'GlobalAffaris',
    shortTitle: 'GlobalAffaris',
    subject: 'global_affairs',
    semester: 2,
    creditHours: 3,
    category: 'Social & Humanities',
    overview: 'Comprehensive 5-Chapter Global Affairs course covering Chapter One: Understanding International Relations (Nationalism, Nations & States, Evolution from Westphalia, State & Non-State Actors, Singer & Waltz Levels of Analysis, Structure of International System, IR Theories: Liberalism, Realism, Marxism, Constructivism, Critical Theories), Chapter Two: Understanding Foreign Policy and Diplomacy (National Interest Debates & Criteria, Holsti\'s Foreign Policy Objectives, Dimensions & Instruments, Evolution of Ethiopian Foreign Policy from Tewodros II to Post-1991), Chapter Three: International Political Economy (IPE Theories: Mercantilism, Liberalism, Marxism, HST, Structuralism, Developmental State; American, Japanese & German Capitalism; WTO, World Bank, IMF & Exchange-Rate Systems), Chapter Four: Globalization and Regionalism (Hyper-globalists, Skeptics, Transformationalists; Impacts on Africa & Ethiopia; Old vs. New Regionalism; Functionalism, Neo-functionalism, Inter-governmentalism; EU, ASEAN, AU), and Chapter Five: Major Contemporary Global Issues (Global Terrorism, Nuclear Proliferation, Climate Change/Kyoto Protocol, Inequality, Migration/Refugees & Cultural Imperialism / Huntington\'s Clash of Civilizations).',
    keyTopics: [
      'Chapter One: Understanding International Relations (Nations/States, Westphalian Evolution, Actors, Levels of Analysis, System Polarity & IR Theories)',
      'Chapter Two: Understanding Foreign Policy and Diplomacy (National Interest Criteria, Holsti\'s Objectives, Dimensions/Instruments & Ethiopian Foreign Policy: Tewodros II to Post-1991)',
      'Chapter Three: International Political Economy — IPE (Mercantilism, Liberalism, Marxism, HST, Structuralism, Developmental State; US/Japanese/German Models; WTO, WB, IMF & Exchange Rates)',
      'Chapter Four: Globalization and Regionalism (3 Globalization Schools, Impacts on Africa & Ethiopia, Old vs. New Regionalism, Integration Theories & EU/ASEAN/AU)',
      'Chapter Five: Major Contemporary Global Issues (Global Terrorism, Nuclear Proliferation, Climate Change, Inequality/Migration & Clash of Civilizations)'
    ],
    defaultChapters: [
      {
        id: 'glob-ch1',
        chapterNumber: 1,
        title: 'Chapter One: Understanding International Relations',
        topics: [
          'Introduction & Objectives: Define nation, state, nationalism; describe meaning and evolution of IR; identify perspectives, approaches, paradigms; analyze roles of actors using levels of analysis; examine structure of international system',
          '1.1. Conceptualizing Nationalism, Nations and States — Nationalism as the doctrine that asserts the nation as the basic political unit (Heywood); Nation as historical entities evolving from ethnic communities; Nation-state: combination of state and nation; Revolutions in America (1776) and France (1789); Congress of Vienna (1815), self-determination, 1848 revolutions; First World War and self-determination as a right; Westphalian system vs. inter-national system',
          '1.2. Understanding International Relations — IR as integral aspect of everyday lives; Studying IR enables comprehension of daily information; IR as branch of law, philosophy, history; first chair at University of Wales (1919); IR describes interactions between people, groups, firms, associations, parties, nations, states, and international organizations; Participation in IR is inescapable; Differences between domestic and international politics; Hobbesian vs. Lockean state of nature; Key concepts: participation is inescapable; distinction between domestic and international politics real but declining',
          '1.3. The Nature and Evolution of International Relations — Rise of sovereign state in medieval Europe; Church and Empire (Holy Roman Empire); Reformation and state-building; Thirty Years\' War (1618–1648) and Treaty of Westphalia (1648); Sovereignty, formal equality, anarchy; Diplomacy and diplomatic practices; European impact on Americas, Asia, Africa; Industrial revolution and scramble for colonies; Decolonization and spread of European state model; Key concepts: Holy Roman Empire, Thirty Years War, Peace of Westphalia',
          '1.4. Actors in International Relations — 1.4.1. State Actors: 195 states, territoriality, sovereignty, world stage metaphor; 1.4.2. Non-State Actors: Multinational corporations (MNCs), trans-governmental organizations, international non-governmental organizations (INGOs), international governmental organizations (IGOs); Shift from inter-national to trans-national; Keohane: "Global Studies" or "World Politics"; Social media and political activity',
          '1.5. Levels of Analysis in International Relations — J. David Singer\'s criticism of "general sluggishness"; Kenneth Waltz\'s Man, the State and War (1959): individual, state, international system; 1.5.1. The individual level: behaviors, motivations, beliefs, psychology; 1.5.2. The group level: groups, lobbying, social movements; 1.5.3. The state level: state-centrism, arena for decision-makers, location of power, foreign policy; 1.5.4. The system level: global system as structure/context, distribution of power (unipolarity, bipolarity, multipolarity), anarchy',
          '1.6. The Structure of International System (Unipolar, Bipolar, Multipolar systems; Power: Dahl\'s relational definition, material aspects, Morgenthau\'s struggle for power; Anarchy: absence of central authority; Sovereignty: internal and external) & 1.7. Theories of International Relations — 1.7.1. Idealism/Liberalism (Kant, Wilson\'s Fourteen Points, League of Nations, collective security, international law); 1.7.2. Realism (Thucydides, Machiavelli, Hobbes, Morgenthau, Carr, Waltz neo-realism, Hedley Bull English School); 1.7.3. Structuralism/Marxism (dependency theory, John Burton, North-South inequalities); 1.7.4. Constructivism (ideas and norms, anarchy is what we make of it); 1.7.5. Critical Theories (Marxism, post-colonialism — Edward Said, feminism, marginalized voices); Summary & Self-Check Exercise'
        ],
        readings: 'GlobalAffaris Module — Chapter 1'
      },
      {
        id: 'glob-ch2',
        chapterNumber: 2,
        title: 'Chapter Two: Understanding Foreign Policy and Diplomacy',
        topics: [
          'Introduction & Objectives: Acquaint with debates on national interest; appreciate patterns of foreign policy behavior; understand tactics and instruments; analyze power/capabilities; critically examine Ethiopian foreign policy determinants',
          '2.1. Defining National Interest — Raison d\'état; set of values, orientation, goals, objectives; A.K. Holsti\'s definition; Seabury\'s normative and descriptive definitions; Debate: objective vs. subjective; Plato\'s philosopher king vs. participatory decision making; Criteria for defining national interest: Operational Philosophy (synoptic vs. incremental), Ideological Criteria, Moral and Legal Criteria, Pragmatic Criteria, Professional Advancement Criteria, Partisan Criteria, Foreign Dependency Criteria; Realist (Morgenthau: prudence, power, survival and security) vs. Idealist perspectives',
          '2.2. Understanding Foreign Policy and Foreign Policy Behaviors — 2.2.1. Defining Foreign Policy (Rochester\'s definition; general purposes, priorities, strategies, instruments); 2.2.2. Foreign Policy Objectives: Holsti\'s categorization — Short range (core interests, survival, territorial integrity, political/cultural identity), Middle range (economic and welfare needs), Long range (plans, dreams, visions for international system); 2.2.3. Foreign Policy Behavior: Patterns and Trends; 2.2.4. Foreign Policy Dimensions: Alignment (alliances, neutrality, nonalignment), Scope (global, regional, isolationism), Mode of Operation (multilateralism, unilateralism); 2.2.5. Instruments of Foreign Policy: Diplomacy, Economic Instruments (tariffs, quotas, boycotts, embargoes, loans, credits, currency manipulation, foreign aid), Propaganda, Terrorism, Use of Force',
          '2.3. Overview of Foreign Policy of Ethiopia — 2.3.1. Tewodros II (1855–1868: modernity, seeking Western Christian world\'s recognition and help); 2.3.2. Yohannes IV (1872–1889: Islam as threat, European expansionism, died fighting Mahdists); 2.3.3. Menelik II (1889–93: southward expansion, access to sea, Wuchale Treaty, Battle of Adwa 1896, boundary treaties); 2.3.4. Emperor Haile Selassie I (1916–1974: League of Nations, government in exile, British aid, US alliance, military aid, role in Africa, OAU, peacekeeping); 2.3.5. Military Government (1974–1991: socialist ideology, survival, territorial integrity, Soviet alliance, military aid, Eritrean conflict, Ogaden war, Nile issue, support for decolonization); 2.3.6. Post-1991 Foreign Policy (national interest, democracy and development, "inside-out" approach, economic diplomacy, East-look policy, military capability); Summary & Self-Check Exercise'
        ],
        readings: 'GlobalAffaris Module — Chapter 2'
      },
      {
        id: 'glob-ch3',
        chapterNumber: 3,
        title: 'Chapter Three: International Political Economy (IPE)',
        topics: [
          'Introduction & Objectives: Debate over state vs. market; explain meaning and nature of IPE; distinguish theoretical perspectives; figure out national political economy systems; identify core issues, governing institutions (IMF, WB, WTO) and governance of IPE',
          '3.1. Meaning and Nature of International Political Economy (IPE) — State-centered definition vs. Marxist definition; Limitations of the term "International"; Broader definition: study of ever-changing relationships between governments, businesses, and social forces across history and geographical areas; Political dimension (use of power) & Economic dimension (distribution of scarce resources; market as driving force)',
          '3.2. Theoretical Perspectives of IPE — Mercantilism/Nationalism (strong state role, balance-of-payment surpluses, autarky, developmental state approach — Friedrich List); Liberalism (free market, free trade, comparative advantage, competitive advantage — Adam Smith); Marxism (class struggle, critique of capitalism, exploitation, global inequality — Karl Marx); Hegemonic Stability Theory / HST (benevolent hegemon needed for stable international economic system, Bretton Woods); Structuralism (dependency theory, centre-periphery, unequal exchange, import substitution — Prebisch-Singer thesis); Developmental State Approach (strong state interventionism, bureaucratic apparatus, private sector participation, regime legitimacy)',
          '3.3. Survey of the Most Influential National Political Economy Systems — 3.3.1. The American System of Market-Oriented Capitalism (consumer benefit, wealth creation, competitive markets, managerial capitalism, regulatory bureaucracy, industrial policy); 3.3.2. The Japanese System of Developmental Capitalism (economy subordinate to social/political objectives, neo-mercantilism, MITI, developmental state capitalism, lifetime employment, industrial policy); 3.3.3. The German System of Social Market Capitalism (balance social concerns and market efficiency, welfare state capitalism, corporatist, co-determination, Bundesbank); 3.3.4. Differences among National Political Economy Systems (primary purposes, role of state, corporate structure)',
          '3.4. Core Issues, Governing Institutions and Governance of IPE — 3.4.1. International Trade and the WTO (1995, successor to GATT; free trade vs. protectionism; tariffs, NTBs); 3.4.2. International Investment and the WB (World Bank 1945; loans and grants; global FDI; transnational production networks — Swedish automobile example); 3.4.3. International Finance and the IMF (184 members; voting power by quota, US 17.4%; monetary system and credit system) & 3.5. Exchange Rates and the Exchange-Rate System (Fixed vs. floating exchange rate; IMF governance); Summary & Self-Check Exercise'
        ],
        readings: 'GlobalAffaris Module — Chapter 3'
      },
      {
        id: 'glob-ch4',
        chapterNumber: 4,
        title: 'Chapter Four: Globalization and Regionalism',
        topics: [
          'Introduction & Objectives: Conceptualize globalization and regionalism; expose to contemporary debates; analyze impacts on Africa, Ethiopia, developing world; explain theories of regionalism and mutual interaction',
          '4.1. Defining Globalization (Multidimensional process: stretching across frontiers, intensification of interconnectedness, accelerating pace, deepening enmeshment of local and global; Time-space compression; deterritorialization) & 4.2. The Globalization Debates — 4.2.1. The Hyper-globalists (new epoch, nation-states obsolete, borderless economy); 4.2.2. The Skeptics (myth, states still powerful, globalization is regionalization, North-South gap); 4.2.3. The Transformationalists (unprecedented process, reconstituting power of state, new sovereignty regime, diffusion of authority)',
          '4.3. Globalization and Its Impacts on Africa (Financial, economic, technological, cultural, religious/ideological forces; Americanization, Washington Consensus; Cold War consequences; Political, negative & economic impacts: brain-drain, primary goods dependence) & 4.4. Ethiopia in a Globalized World (Marginal integration; Post-1991 democratization, federalization, developmental state political economy; Positive & negative impacts) & 4.5. Pros and Cons of Globalization (glocalization, identity conflicts)',
          '4.6. Defining Regionalism and Regional Integration (Region, Regionalism, Regionalization; Old Regionalism: post-WWII ECSC, EEC, LAFTA, OAU, Lagos Plan of Action vs. New Regionalism: post-Cold War RTAs, externally oriented, multi-dimensional; Table 1 & Table 2: Two Waves of Regionalism) & 4.7. Major Theories of Regional Integration — 4.7.1. Functionalism (spillover, supranational institutions); 4.7.2. Neo-functionalism (political agency, spillover — Haas, Lindberg); Inter-governmentalism (state-centric, rational choice — Moravcsik); Supra-nationalism (positive spillover, transfer of allegiances, technocratic automaticity)',
          '4.8. Selected Cases of Regional Integration (European Union — EU, ASEAN, African Union — AU) & 4.9–4.11. Regionalization vs. Globalization and the State — 4.10. Relations between Regionalization and Globalization (Convergence, Divergence, Overlapping); 4.11. Seven patterns of interaction among Regionalization, Globalization and the Nation-State; Summary & Self-Check Exercise'
        ],
        readings: 'GlobalAffaris Module — Chapter 4'
      },
      {
        id: 'glob-ch5',
        chapterNumber: 5,
        title: 'Chapter Five: Major Contemporary Global Issues',
        topics: [
          'Introduction, Objectives & 5.1. Survey of Major Contemporary Global Issues — Shift from IR to Global relations and issues; Criteria for selection: extent/scope, urgency/intensity, salience/visibility, centrality/location',
          '5.1.1. Global Security Issues — Global Terrorism: Definition, ideological types (left wing, right wing, ethno-nationalist/separatist, religious), conducive factors (socio-economic, political, psychological), operational types (domestic, nationalist, religious, state, global); Nuclear Weapons and Their Proliferations: Post-Cold War concerns, four events increasing fears (Iraq, Soviet demise, South Asia arms race, Iran), reasons for proliferation (super-power rivalry, military burden sharing, regional balance of power, influence, economies of scale, self-reliance, ethnic conflicts, authoritarian regimes)',
          '5.1.2. Global Environmental Issues — Climate change and Global warming: Challenges for sustainable development, Kyoto Protocol, failure to achieve reduction targets, offshoring emissions, post-2020 regime',
          '5.1.3. Global Socio-economic Issues — Global Inequality and Poverty: Widening gap, Occupy Wall Street, consequences of inequality (discourages political participation, prevents impartial institutions, enables wealthy to refuse compromise); Migration and refugee problems: Factors (increase in states, population growth, communications/transport revolution, turmoil), rise to top of international agenda in 1980s, erosion of sovereignty, blurring domestic/international boundaries',
          '5.1.4. Global Cultural Issues — Cultural Imperialism: Cultural globalization, McDonaldization, homogenization, indigenization; Cultural (civilizational) clash and identity conflicts: Samuel Huntington\'s "clash-of-civilizations" thesis & Eight major civilizations (Western, Confucian, Japanese, Islamic, Hindu, Slavic-Orthodox, Latin American, African); Summary, Self-Check Questions & References'
        ],
        readings: 'GlobalAffaris Module — Chapter 5'
      }
    ]
  },

  // ==========================================
  // 6. Chemistry (8 Chapters)
  // ==========================================
  {
    id: 'chemistry',
    code: 'Chemistry',
    title: 'Chemistry',
    shortTitle: 'Chemistry',
    subject: 'chemistry',
    semester: 1,
    creditHours: 3,
    category: 'Natural Science Core',
    overview: 'Comprehensive 8-Chapter General Chemistry course covering Chapter One: Essential Ideas in Chemistry (Chemistry in Context, States & Classification of Matter, Physical/Chemical & Extensive/Intensive Properties, SI Units, Uncertainty/Significant Figures & Dimensional Analysis), Chapter Two: Atoms, Molecules and Ions (Early & Modern Atomic Theory, Thomson/Millikan/Rutherford/Chadwick Experiments, Atomic Structure, Isotopes, Chemical Formulas, Periodic Table, Ionic/Molecular Compounds & IUPAC Nomenclature), Chapter Three: Composition of Substances and Solutions (Formula Mass, Mole Concept, Percent Composition, Empirical & Molecular Formulas, Molarity, Dilution & Concentration Units), Chapter Four: Stoichiometry of Chemical Reactions (Balancing Equations, Net Ionic Equations, Precipitation, Acid-Base & Redox Reactions, Limiting Reactants, Percent Yield, Titration & Gravimetric Analysis), Chapter Five: Electronic Structure and Periodic Properties of Elements (Electromagnetic Energy, Planck/Photoelectric Effect, Bohr Model, De Broglie, Heisenberg, Quantum Numbers, Electron Configurations & Periodic Trends), Chapter Six: Chemical Bonding and Molecular Geometry (Ionic & Covalent Bonding, Electronegativity, Lewis Structures, Octet Exceptions, Formal Charge, Resonance, Bond Energy, Born-Haber Lattice Energy, VSEPR, Polarity, Hybridization & MO Theory), Chapter Seven: Equilibrium Concepts and Acid-Base Equilibrium (Dynamic Equilibrium, Kc & Kp, Reaction Quotient Q, Le Chatelier\'s Principle, ICE Tables, pH/pOH, Weak Acids/Bases, Salt Hydrolysis & Henderson-Hasselbalch Buffers), and Chapter Eight: Organic Chemistry (Alkanes, Alkenes, Alkynes, Aromatics, Alcohols, Ethers, Aldehydes, Ketones, Carboxylic Acids, Esters, Amines & Amides).',
    keyTopics: [
      'Chapter One: Essential Ideas in Chemistry (Central Science, Scientific Method, Domains, Matter Classification, Extensive/Intensive Properties, SI Units, Sig Figs & Dimensional Analysis)',
      'Chapter Two: Atoms, Molecules and Ions (Dalton\'s Theory, Fundamental Laws, Subatomic Particles, Isotopes, Periodic Table & Chemical Nomenclature)',
      'Chapter Three: Composition of Substances and Solutions (Formula Mass, Mole Concept, Percent Composition, Empirical/Molecular Formulas, Molarity & Dilution)',
      'Chapter Four: Stoichiometry of Chemical Reactions (Net Ionic Equations, Precipitation, Acid-Base, Redox Balancing, Limiting Reactants, Percent Yield, Titration & Gravimetric Analysis)',
      'Chapter Five: Electronic Structure and Periodic Properties of Elements (Electromagnetic Spectrum, Bohr Model, Quantum Numbers, Electron Configurations & Periodic Trends)',
      'Chapter Six: Chemical Bonding and Molecular Geometry (Ionic/Covalent Bonds, Lewis Structures, Formal Charge, Resonance, Lattice Energy, VSEPR, Hybridization & MO Theory)',
      'Chapter Seven: Equilibrium Concepts and Acid-Base Equilibrium (Kc & Kp, Le Chatelier\'s Principle, ICE Tables, pH/pOH, Weak Acids/Bases & Buffers)',
      'Chapter Eight: Organic Chemistry (Hydrocarbons: Alkanes/Alkenes/Alkynes/Aromatics & Functional Groups: Alcohols, Ethers, Carbonyls, Carboxylic Acids, Esters, Amines, Amides)'
    ],
    defaultChapters: [
      {
        id: 'chem-ch1',
        chapterNumber: 1,
        title: 'Chapter One: Essential Ideas in Chemistry',
        topics: [
          '1.1 Chemistry in Context — 1.1.1 Chemistry as the Central Science: Interconnectedness with other STEM disciplines (biology, medicine, materials science, environmental science, etc.); 1.1.2 The Scientific Method: Observation, hypothesis, experimentation, law, and theory; 1.1.3 The Domains of Chemistry: Macroscopic, Microscopic, and Symbolic domains',
          '1.2 State and Classification of Matter — 1.2.1 State of Matter: Solid, Liquid, Gas, Plasma; Law of conservation of matter; Mass vs. Weight; 1.2.2 Classification of Matter: Pure substances (Elements, Compounds) and Mixtures (Homogeneous/Solutions, Heterogeneous); Atoms and Molecules',
          '1.3 Physical and Chemical Properties — Physical properties (density, color, hardness, melting point, boiling point) vs. Chemical properties (flammability, toxicity, acidity, reactivity); Physical changes vs. Chemical changes',
          '1.4 Extensive and Intensive Property — Extensive properties depend on the amount of matter (mass, volume, heat, internal energy); Intensive properties do not depend on the amount of matter (temperature, density, melting point)',
          '1.5 Measurements and Units — 1.5.1 SI Base Units: Meter (m), Kilogram (kg), Second (s), Kelvin (K), Ampere (A), Mole (mol), Candela (cd) & Fractional/Multiple SI Prefixes (femto to tera); 1.5.2 Derived SI Units: Volume (m³, L, mL, cm³) and Density (ρ = m/V)',
          '1.6 Measurement Uncertainty, Accuracy, and Precision — Exact vs. inexact numbers; Significant figures (counting non-zero digits and captive/leading/trailing zeros; sig figs in addition/subtraction vs. multiplication/division; rounding rules); Accuracy vs. Precision',
          '1.7 Conversion Factors and Dimensional Analysis — Factor-label method for unit conversions & Temperature conversions (Celsius °C, Fahrenheit °F, and Kelvin K)'
        ],
        readings: 'Chemistry Module — Chapter 1'
      },
      {
        id: 'chem-ch2',
        chapterNumber: 2,
        title: 'Chapter Two: Atoms, Molecules and Ions',
        topics: [
          '2.1 Early Ideas in Atomic Theory — Leucippus & Democritus (atomos) vs. Aristotle; John Dalton\'s Atomic Theory (1807 postulates) & Fundamental Chemical Laws: Law of Conservation of Mass (Lavoisier), Law of Definite Proportions/Constant Composition (Proust), and Law of Multiple Proportions (Dalton)',
          '2.2 Evolution of Atomic Theory — J.J. Thomson\'s Cathode Ray Tube Experiment (charge-to-mass ratio of electron, Plum Pudding Model); Robert Millikan\'s Oil Drop Experiment (electron charge); Ernest Rutherford\'s Gold Foil α-Scattering Experiment (nuclear model of atom); Frederick Soddy (isotopes) & James Chadwick (discovery of the neutron)',
          '2.3 Atomic Structure and Symbolism — Protons, neutrons, and electrons (location, charge, mass in amu/Da); Atomic number (Z), Mass number (A = Z + N), Nuclear symbol, Ions (cations vs. anions); Isotopes, natural abundance, and calculating Average Atomic Mass',
          '2.4 Chemical Formulas — Molecular formula, Empirical formula, and Structural formula; Isomers: Structural (constitutional) isomers vs. Spatial (geometric) isomers',
          '2.5 The Periodic Table — Dmitri Mendeleev & Lothar Meyer; Periodic Law; Periods (1–7) and Groups (1–18); Metals, Nonmetals, and Metalloids; Main-group (Representative) elements (Alkali metals, Alkaline earth metals, Pnictogens, Chalcogens, Halogens, Noble gases), Transition metals, and Inner transition metals (Lanthanides & Actinides)',
          '2.6 Molecular and Ionic Compounds — Monatomic and Polyatomic ions (oxyanions); Predicting ionic charges; Electron transfer (ionic bonding between metals and nonmetals) vs. Electron sharing (covalent bonding between nonmetals)',
          '2.7 Chemical Nomenclature — Naming Ionic Compounds (fixed-charge metals, variable-charge transition metals using Roman numerals, and hydrated ionic compounds), Binary Molecular Compounds (Greek prefixes), and Acids (Binary acids and Oxyacids)'
        ],
        readings: 'Chemistry Module — Chapter 2'
      },
      {
        id: 'chem-ch3',
        chapterNumber: 3,
        title: 'Chapter Three: Composition of Substances and Solutions',
        topics: [
          '3.1 Formula Mass and the Mole Concept — 3.1.1 Formula Mass: Calculating formula mass for covalent substances (molecular mass) and ionic compounds; 3.1.2 The Mole Concept: Avogadro\'s number (N_A = 6.022 × 10²³ mol⁻¹), Molar Mass (g/mol), and interconverting mass, moles, and number of particles',
          '3.2 Determining Empirical and Molecular Formulas — 3.2.1 Percent Composition: Calculating mass percent of elements from chemical formulas or experimental data; 3.2.2 Determination of Empirical Formulas; 3.2.3 Determination of Molecular Formulas from empirical formula and molar mass',
          '3.3 Molarity and Other Concentration Units — 3.3.1 Molarity (M = mol solute / L solution) and Dilution of Solutions (C₁V₁ = C₂V₂); 3.3.2 Other Units for Solution Concentrations: Mass Percentage (w/w%), Volume Percentage (v/v%), Mass-Volume Percentage (w/v%), Parts per Million (ppm) & Parts per Billion (ppb)'
        ],
        readings: 'Chemistry Module — Chapter 3'
      },
      {
        id: 'chem-ch4',
        chapterNumber: 4,
        title: 'Chapter Four: Stoichiometry of Chemical Reactions',
        topics: [
          '4.1 Writing and Balancing Chemical Equations — 4.1.1 Writing and Balancing Chemical Equations (reactants, products, stoichiometric coefficients, physical states); 4.1.2 Equations for Ionic Reactions: Molecular equations, Complete ionic equations, Net ionic equations, and Spectator ions',
          '4.2 Classifying Chemical Reactions — 4.2.1 Precipitation Reactions and Solubility Rules; 4.2.2 Acid-Base Reactions (Arrhenius & Brønsted-Lowry acids/bases, strong vs. weak electrolytes, neutralization); 4.2.3 Oxidation-Reduction (Redox) Reactions (Oxidation numbers, oxidizing vs. reducing agents, balancing redox reactions by half-reaction method in acidic and basic media)',
          '4.3 Reaction Stoichiometry — Stoichiometric mole-to-mole, mole-to-mass, and mass-to-mass calculations',
          '4.4 Reaction Yields — 4.4.1 Limiting Reactant vs. Excess Reactant; 4.4.2 Theoretical Yield, Actual Yield, and Percent Yield',
          '4.5 Quantitative Chemical Analysis — 4.5.1 Acid-Base Titration (titrant, analyte, equivalence point, end point, titration calculations); 4.5.2 Gravimetric Analysis (quantitative determination via precipitation and mass measurement)'
        ],
        readings: 'Chemistry Module — Chapter 4'
      },
      {
        id: 'chem-ch5',
        chapterNumber: 5,
        title: 'Chapter Five: Electronic Structure and Periodic Properties of Elements',
        topics: [
          '5.1 Electromagnetic Energy — Wave properties (wavelength λ, frequency ν, speed c = λν, amplitude, nodes), Electromagnetic spectrum, Blackbody radiation & Planck\'s quantum theory (E = hν), Einstein\'s Photoelectric Effect, and Atomic Line Spectra',
          '5.2 The Bohr Model — Bohr\'s model of the hydrogen atom, quantized energy levels (E_n = -k/n²), Rydberg formula for spectral transitions, ground state vs. excited states, and limitations of the Bohr model',
          '5.3 Development of Quantum Theory — De Broglie wavelength (λ = h/mv), Heisenberg Uncertainty Principle, Schrödinger\'s quantum mechanical model (orbitals & probability density ψ²), and the Four Quantum Numbers (n, l, m_l, m_s); Shapes and nodes of s, p, d, f orbitals',
          '5.4 Electronic Structure of Atoms (Electron Configurations) — Aufbau Principle (n + l rule), Pauli Exclusion Principle, Hund\'s Rule, Orbital diagrams, spdf & noble-gas notation, anomalous configurations (Cr, Cu), valence vs. core electrons, and electron configurations of ions',
          '5.5 Periodic Variations in Element Properties — Effective nuclear charge (Z_eff) & shielding; Periodic trends in Covalent and Ionic Radii (isoelectronic series), First and Successive Ionization Energies (IE) with group exceptions, and Electron Affinity (EA)'
        ],
        readings: 'Chemistry Module — Chapter 5'
      },
      {
        id: 'chem-ch6',
        chapterNumber: 6,
        title: 'Chapter Six: Chemical Bonding and Molecular Geometry',
        topics: [
          '6.1 Ionic Bonding — Formation of ionic compounds, electronic structures of main-group and transition-metal cations and anions, properties of ionic compounds',
          '6.2 Covalent Bonding — Formation of covalent bonds, bond length and bond energy, pure (nonpolar) vs. polar covalent bonds, Electronegativity (Pauling scale trends) and bond polarity (ΔEN)',
          '6.3 Lewis Symbols and Structures — Lewis symbols, the Octet Rule, step-by-step writing of Lewis structures (single, double, triple bonds), and Exceptions to the Octet Rule: Odd-electron molecules (free radicals), Electron-deficient molecules (Be, B), and Hypervalent molecules (expanded valence shells in Period 3+)',
          '6.4 Formal Charges and Resonance — Calculating Formal Charge, evaluating competing Lewis structures, and Resonance structures/hybrids (NO₃⁻, CO₃²⁻, O₃, benzene)',
          '6.5 Strengths of Ionic and Covalent Bonds — Bond energy and reaction enthalpy (ΔH_rxn); Ionic bond strength, Lattice Energy (U ∝ Q₁Q₂/r₀), and the Born-Haber Cycle',
          '6.6 Molecular Structure and Polarity — VSEPR Theory (Electron-pair geometry vs. Molecular structure for steric numbers 2 to 6; lone pair repulsions), Molecular Polarity & Dipole Moment (μ), Valence Bond Hybridization (sp, sp², sp³, sp³d, sp³d²; σ and π bonds), and Molecular Orbital (MO) Theory (bonding/antibonding MOs, bond order, diamagnetism/paramagnetism)'
        ],
        readings: 'Chemistry Module — Chapter 6'
      },
      {
        id: 'chem-ch7',
        chapterNumber: 7,
        title: 'Chapter Seven: Equilibrium Concepts and Acid-Base Equilibrium',
        topics: [
          '7.1 Chemical Equilibrium — Reversible reactions, dynamic equilibrium, forward and reverse reaction rates, and the Law of Mass Action',
          '7.2 Equilibrium Constants (Kc and Kp) & Reaction Quotient (Q) — Homogeneous and heterogeneous equilibria, relationship between Kp and Kc, and predicting the direction of net reaction by comparing Q and K',
          '7.3 Shifting Equilibria: Le Châtelier\'s Principle — Effects of changes in concentration, pressure/volume, temperature, and catalysts on chemical equilibrium',
          '7.4 Equilibrium Calculations — Solving for equilibrium constants and equilibrium concentrations using ICE (Initial, Change, Equilibrium) tables',
          '7.5 Acid-Base Equilibria — Brønsted-Lowry conjugate acid-base pairs, autoionization of water (Kw), pH and pOH scales, weak acids and bases (Ka, Kb, percent ionization), salt hydrolysis, Common-Ion Effect, Buffer solutions (Henderson-Hasselbalch equation & buffer capacity), and Acid-Base Titrations'
        ],
        readings: 'Chemistry Module — Chapter 7'
      },
      {
        id: 'chem-ch8',
        chapterNumber: 8,
        title: 'Chapter Eight: Organic Chemistry',
        topics: [
          '8.1 Hydrocarbons — Carbon bonding & isomerism; Alkanes (saturated C_nH_{2n+2}, sp³, IUPAC nomenclature, conformations, substitution & combustion), Alkenes (unsaturated C=C, C_nH_{2n}, sp², cis-trans geometric isomers, addition reactions), Alkynes (C≡C, C_nH_{2n-2}, sp), and Aromatic Hydrocarbons (benzene structure & substitution)',
          '8.2 Alcohols and Ethers — Functional groups, classification (1°, 2°, 3° alcohols), IUPAC nomenclature, physical properties (hydrogen bonding), preparation, and chemical reactions of alcohols (R–OH) and ethers (R–O–R\')',
          '8.3 Aldehydes, Ketones, Carboxylic Acids, and Esters — Structure, nomenclature, properties, oxidation/reduction, and esterification/hydrolysis reactions of carbonyl-containing functional groups (R–CHO, R–CO–R\', R–COOH, R–COOR\')',
          '8.4 Amines and Amides — Structure, classification, nomenclature, basicity of amines (R–NH₂), and formation/properties of amides (R–CONH₂ and peptide linkages)'
        ],
        readings: 'Chemistry Module — Chapter 8'
      }
    ]
  },

  // ==========================================
  // 7. History (7 Units)
  // ==========================================
  {
    id: 'history',
    code: 'History',
    title: 'History of Ethiopia and the Horn',
    shortTitle: 'History',
    subject: 'history',
    semester: 2,
    creditHours: 3,
    category: 'Social & Humanities',
    overview: 'Comprehensive 7-Unit History of Ethiopia and the Horn course covering Introduction to History (nature, uses, primary/secondary sources, historiography, and geographical context), Peoples and Cultures (human evolution, Neolithic revolution, language super-families, settlement/economic formations, and indigenous/Abrahamic religions), Ancient States to the End of the 13th Century, Late 13th to Early 16th Century Solomonic & Sultanate Dynamics, 16th to 18th Century Conflicts, Population Movements (Gadaa), Gondarine Period & Zemene-Mesafint, 1800–1941 Modern State Formation, Battles Against Foreign Aggressors (Adwa) & Italian Occupation, and Post-1941 Imperial Period, Derg Regime & Transitional Government.',
    keyTopics: [
      'Unit One: Introduction to History (1.1 Nature & Uses, 1.2 Sources & Methods, 1.3 Historiography of Ethiopia & the Horn, 1.4 Geographical Context)',
      'Unit Two: Peoples and Cultures in Ethiopia and the Horn (2.1 Human Evolution, 2.2 Neolithic Revolution, 2.3 Peopling & Languages, 2.4 Religions)',
      'Unit Three: Politics, Economy and Society to the End of the 13th Century (3.1 State Formation, 3.2 Ancient States & Sultanates, 3.3 External Contacts, 3.4 Economy, 3.5 Socio-Cultural Achievements)',
      'Unit Four: Politics, Economy and Society from the Late 13th to the Beginning of the 16th Centuries (4.1 Solomonic Restoration, 4.2 Consolidation & Religious Movements, 4.3–4.4 Sultanate of Adal & Zeila Rivalry, 4.5 External Relations)',
      'Unit Five: Politics, Economy and Social Processes from the Early 16th to the End of the 18th Centuries (5.1 Adal–Christian War, 5.2 Jesuits & Doctrinal Controversies, 5.3 Population Movements & Gadaa, 5.4–5.5 Regional States, 5.6 Gondarine Period & Zemene-Mesafint)',
      'Unit Six: Internal Developments and External Relations of Ethiopia and the Horn, 1800–1941 (6.1 Southern/Western States & Trade, 6.2 Unification & Expansion, 6.3 Modernization, 6.4 Socio-Economic Changes, 6.5 Major Battles, Adwa & 1936–41 Patriotic Resistance)',
      'Unit Seven: Internal Developments and External Relations Since 1941 (7.1 Post-1941 Imperial Period & Oppositions, 7.2 The Derg Regime 1974–1991, 7.3 Transitional Government & 1994 FDRE Constitution)'
    ],
    defaultChapters: [
      {
        id: 'hist-ch1',
        chapterNumber: 1,
        title: 'Unit One: Introduction to History',
        topics: [
          '1.1 The Nature and Uses of History — Nature: Definition of history (from Greek historia), difference between the past and history, periodization, and the three dimensions of history (narrate, discuss how, analyze why); Uses of History: Understanding the present, providing a sense of identity, providing background for other disciplines, teaching critical skills, developing tolerance, and entertainment',
          '1.2 Sources and Methods of Historical Study — Primary Sources: Original, first-hand accounts (manuscripts, diaries, letters, oral tradition); Secondary Sources: Second-hand published accounts (books, articles, biographies); Critical Evaluation: Verifying authenticity (external criticism) and reliability (internal criticism) of sources',
          '1.3 Historiography of Ethiopia and the Horn — Early References: Periplus of the Erythraean Sea, Christian Topography by Cosmas Indicopleustes; Medieval Sources: Hagiographies, Chronicles, Arabic accounts (al-Masudi, Ibn Battuta), Futuh al-Habesha; Modern Historiography: Emergence as an academic discipline in the 1960s (Department of History at HSIU, Institute of Ethiopian Studies), Traditional writers (Taye Gebre-Mariam, Afework Gebre-Iyesus, Hiruy Wolde-Selassie, Tekle-Tsadik Mekuria)',
          '1.4 The Geographical Context of Human History in Ethiopia and the Horn — Physical features (highlands, lowlands, Rift Valley), climate, and drainage systems (Nile, Gibe/Omo, Genale/Shebelle, Awash, Rift Valley Lakes); Impact of geography on settlement, trade, and interactions'
        ],
        readings: 'History Module — Unit 1'
      },
      {
        id: 'hist-ch2',
        chapterNumber: 2,
        title: 'Unit Two: Peoples and Cultures in Ethiopia and the Horn',
        topics: [
          '2.1 Human Evolution — Creationist vs. Evolutionist views; Archaeological Evidence: Chororapithecus (Cororapithecus), Ardipithecus ramidus, Australopithecus afarensis (Lucy/Dinkinesh), Homo habilis, Homo erectus, Homo sapiens; Cultural Evolution: Stone Age (Paleolithic, Mesolithic, Neolithic), Bronze Age, Iron Age, and Modes of stone tools (Mode I, II, III)',
          '2.2 The Neolithic Revolution — Transition from hunting/gathering to domestication of plants and animals; Domestication of crops like Teff, Dagussa, Enset in Ethiopia',
          '2.3 The Peopling of the Region — 2.3.1 Languages and Linguistic Processes: Afro-Asiatic (Cushitic, Semitic, Omotic) and Nilo-Saharan super families; 2.3.2 Settlement Patterns: Distribution of Cushitic, Semitic, Omotic, and Nilotic peoples; 2.3.3 Economic Formations: Pastoralism (Afar, Somali, Borana) and Agriculture (mixed farming, trade)',
          '2.4 Religion and Religious Processes — 2.4.1 Indigenous Religion: Waqeffanna (Oromo), Hadiya, Kambata, Gedeo, Wolayta, Keficho, Nuer; 2.4.2 Judaism: Bete-Israel; 2.4.3 Christianity: Introduction in 334 A.D. by King Ezana, Nine Saints, expansion in medieval period; 2.4.4 Islam: Introduction through peaceful trade, Dahlak and Zeila routes, spread by Muslim clerics'
        ],
        readings: 'History Module — Unit 2'
      },
      {
        id: 'hist-ch3',
        chapterNumber: 3,
        title: 'Unit Three: Politics, Economy and Society in Ethiopia and the Horn to the End of the 13th Century',
        topics: [
          '3.1 Emergence of States — Factors for state formation (sedentary agriculture, trade, religion)',
          '3.2 Ancient States — 3.2.1 North and Northeast: Punt, Da\'amat, Yeha, Hawulti Melazo, Addi-Seglemeni, Aksumite State, Zagwe Dynasty; 3.2.2 East, Central, Southern, and Western States: Bizamo, Damot, Enarya, Gafat; Muslim Sultanates (Shewa, Dahlak, Ifat, Fatagar, Dawaro, Bali)',
          '3.3 External Contacts — Relations with Egypt, South Arabia, and the Greco-Roman world; The legend of Prester John',
          '3.4 Economic Formations — Agriculture and Land Tenure System (Rist, Gult); Handicraft; Trade',
          '3.5 Socio-cultural Achievements — Architecture (Steles, Zagwe churches), Writing System (Sabean, Ge\'ez), Calendar (Oromo, Sidama, Ethiopian), Numerals'
        ],
        readings: 'History Module — Unit 3'
      },
      {
        id: 'hist-ch4',
        chapterNumber: 4,
        title: 'Unit Four: Politics, Economy and Society from the Late 13th to the Beginning of the 16th Centuries',
        topics: [
          '4.1 The "Restoration" of the "Solomonic" Dynasty — Yikuno-Amlak (1270), legend of Queen of Sheba, Kibre Negest',
          '4.2 Power Struggle, Consolidation, Territorial Expansion and Religious Processes — 4.2.1 Succession Problem and "Royal Prison" of Amba Gishen; 4.2.2 Consolidation and Territorial Expansion: Amde-Tsion, Zara-Yaqob; 4.2.3 Evangelization, Religious Movements, and Reforms: Ewostatewos Movement, Deqige Estifanos, Religious Reforms of Zara-Yaqob',
          '4.3 Political and Socio-Economic Dynamics in Muslim Sultanates — Rise of Adal, Trade and Expansion of Islam',
          '4.4 Rivalry between the Christian Kingdom and the Muslim Sultanates — Conflicts over trade routes (Zeila)',
          '4.5 External Relations — Relations with Egypt and Christian Europe'
        ],
        readings: 'History Module — Unit 4'
      },
      {
        id: 'hist-ch5',
        chapterNumber: 5,
        title: 'Unit Five: Politics, Economy and Social Processes from the Early 16th to the End of the 18th Centuries',
        topics: [
          '5.1 Conflict between the Christian Kingdom and the Sultanate of Adal — Imam Ahmed Ibn Ibrahim al-Ghazi (Ahmed Gragn), Battle of Shimbra Kure (1529), Battle of Woyna-Dega (1543); Consequences: Human and material cost, weakened states, Oromo population movement',
          '5.2 Foreign Intervention and Religious Controversies — Jesuit missionaries (Pedro Paez, Alfonso Mendez), conversion of Susenyos, expulsion by Fasiledas; Doctrinal divisions (Tewahedo, Qibat, Sost Lidet)',
          '5.3 Population Movements — 5.3.1 Argoba, Afar, and Somali movements; 5.3.2 Gadaa System and Oromo Population Movement (1522–1618): Gadaa grades, Butta wars, integration mechanisms (Gudifacha, Moggasa)',
          '5.4 Interaction and Integration across Ethnic and Religious Diversities',
          '5.5 Peoples and States in Eastern, Central, Southern and Western Regions — Somali, Afar, Argoba, Harar, Shewa, Gurage, Kambata, Hadiya, Sidama, Gedeo, Konso, Wolayta, Kafa, Yem, Gamo, Dawuro, Ari, Berta, Gumuz, Anywa, Nuer, Majang, Kunama',
          '5.6 The Gondarine Period and Zemene-Mesafint — 5.6.1 The Gondarine Period: Political developments, achievements (architecture, painting, literature, trade); 5.6.2 The Period of Zemene-Mesafint (1769–1855): Regional lords (Yejju dynasty), features'
        ],
        readings: 'History Module — Unit 5'
      },
      {
        id: 'hist-ch6',
        chapterNumber: 6,
        title: 'Unit Six: Internal Developments and External Relations of Ethiopia and the Horn, 1800–1941',
        topics: [
          '6.1 The Nature of Interactions among Peoples and States — 6.1.1 Peoples and States in South-Central, Southwestern, and Western Ethiopia: Gibe States (Limmu-Enarya, Guma, Gomma, Jimma, Gera), Leqa States, Nilotic Sheikdoms; 6.1.2 Trade and Trade Routes: Bonga-Gondar-Massawa, Bonga-Harar-Zeila',
          '6.2 The Making of Modern Ethiopian State — A. The Process of Territorial Unification: Tewodros II, Yohannes IV; B. Territorial Expansion: Menilek II (conquest of Arsi, Harar, Wolayta, Kafa, Beni-Shangul)',
          '6.3 Modernization Attempts — Tewodros II (military, administrative reforms), Yohannes IV, Menilek II (postal, railway, bank), Lij Iyasu, Haile-Selassie I',
          '6.4 Socio-Economic Developments — 6.4.1 Agriculture and Land Tenure: Naftegna-gabbar system, Qalad; 6.4.2 Slavery and Slave Trade; 6.4.3 Manufacturing; 6.4.4 Urbanization',
          '6.5 External Relations — Travelers, treaties (Wuchale), Battle of Adwa, boundary agreements; 6.5.1 Major Battles Fought Against Foreign Aggressors: Dabarki, Maqdela, Gundet, Gura, Dogali, Metemma, Adwa; 6.5.2 Italian Occupation (1936–41) and the Patriotic Resistance: Walwal Incident, Invasion, Patriotic Resistance Movement (Abebe Aregay, Zerai Deres)'
        ],
        readings: 'History Module — Unit 6'
      },
      {
        id: 'hist-ch7',
        chapterNumber: 7,
        title: 'Unit Seven: Internal Developments and External Relations of Ethiopia and the Horn Since 1941',
        topics: [
          '7.1 Post-1941 Imperial Period — 7.1.1 Restoration and Consolidation of Imperial Power and External Relations: Relations with Britain and USA; 7.1.2 Socio-Economic Developments: Agriculture, industry, five-year plans, consolidation of autocracy; 7.1.3 Oppositions and the Downfall of the Monarchical Regime: Plots and conspiracies (1960 Coup), Peasant Rebellions (Woyane, Yejju, Gojjam, Gumuz, Gedeo, Bale), Movements of Nations and Nationalities (Mecha-Tulama), Ethiopian Student Movement',
          '7.2 The Derg Regime (1974–1991) — 7.2.2 Attempts at Socio-Economic Reform: Land reform proclamation, nationalization, resettlement, villagization; Political struggles (Red Terror), Somalia invasion (1977), fall of the Derg',
          '7.3 Transitional Government — 1991 Peace and Democracy Conference, Transitional Charter, FDRE Constitution (1994)'
        ],
        readings: 'History Module — Unit 7'
      }
    ]
  },

  // ==========================================
  // 8. Civics (5 Chapters)
  // ==========================================
  {
    id: 'civics',
    code: 'Civics',
    title: 'Civics',
    shortTitle: 'Civics',
    subject: 'civics',
    semester: 1,
    creditHours: 2,
    category: 'Common Competency',
    overview: 'Comprehensive 5-Chapter Moral and Civic Education course covering understanding civics, ethics and morality, normative and non-normative (meta-ethical) approaches to ethics, ethical decision-making and moral judgments, state, government and citizenship theories and Ethiopian nationality law, and constitution, constitutionalism, democracy and human rights.',
    keyTopics: [
      'Chapter One: Understanding Civics and Ethics (Definitions, Ethics & Law, Political Culture & Goals of Moral and Civic Education)',
      'Chapter Two: Approaches to Ethics (Normative Ethics: Egoism, Utilitarianism, Deontology, Virtue Ethics & Non-Normative/Meta-Ethics)',
      'Chapter Three: Ethical Decision Making and Moral Judgments (Moral Reasoning, Frameworks, Moral Responsibility & Why Be Moral)',
      'Chapter Four: State, Government and Citizenship (Rival Theories & Roles of State, Citizenship Theories & Ethiopian Nationality Law)',
      'Chapter Five: Constitution, Democracy and Human Rights (Constitutionalism, Ethiopian Constitutions, Democratization & Human Rights)'
    ],
    defaultChapters: [
      {
        id: 'civ-ch1',
        chapterNumber: 1,
        title: 'Chapter One: Understanding Civics and Ethics',
        topics: [
          '1.1. Chapter Introduction — Conceptualizes terms: civic education, citizen, citizenship, ethics, morality; Relations between civics and ethics; Goals of civics and ethics; Competences of a good citizen',
          '1.2. Chapter Objectives — Define civic education, ethics, morality; Differentiate civic education from ethics; Discuss goals of civics and ethics; Enumerate competences of a good citizen; Use critical thinking and ethical theories to make judgements',
          '1.3. Defining Civics, Ethics, Morality — 1.3.1. Civic Education: Definitions (Patrick, UNDP, Aggarwal), Minimal vs. Maximal civic education; 1.3.2. The Definition and Nature of Ethics and Morality: A. What Ethics is? (Branch of philosophy, moral philosophy, normative vs. non-normative ethics), B. What is Morality? (Latin moralitas, code of conduct, Socrates, distinction between ethics and morality)',
          '1.4. Ethics and Law — Differences between ethics and law; Civil disobedience',
          '1.5. The Importance/Goal of Moral and Civic Education — 1) The need to instill citizens about their rights and duties; 2) The Need for Participant Political Culture (Parochial, Subject, Participant cultures); 3) The Need for Relevant Knowledge, Skills and Positive Attitudes; 4) The issue of fostering intercultural societies; 5) The issue of peace-building; Core values: Respect for life, reasoning, fairness, welfare of others, diversity, peaceful resolution of conflict',
          'Chapter Summary & References'
        ],
        readings: 'Civics Module — Chapter 1'
      },
      {
        id: 'civ-ch2',
        chapterNumber: 2,
        title: 'Chapter Two: Approaches to Ethics',
        topics: [
          '2.1. Chapter Introduction — Three basic kinds of prescriptive moral theories: teleological, deontological, virtue-based',
          '2.2. Chapter Objectives — Discuss ideas about right/wrong, good/bad; Analyze ethical dimensions of rules and codes; Examine personal and community factors in defining beliefs; Critically analyze how groups justify actions',
          '2.3. Normative Ethics — 2.3.1. Teleological Ethics (Consequentialist): The end justifies the means; 2.3.2. Egoism: Ethical Egoism (Looking after oneself, Golden Rule reinterpreted) & Psychological Egoism (Human nature argument, critique); 2.3.3. Utilitarianism: Classic Utilitarianism, Jeremy Bentham (Quantity over Quality, Hedonic calculus), John Stuart Mill (Quality over Quantity, Higher/lower pleasures), Act- and Rule-Utilitarianism (Strengths and Criticisms), Altruism (Psychological altruism, distinction from egoism)',
          '2.3.4. Deontological Ethics (Non-Consequentialist): The means justifies the end — 2.3.4.1. Divine Command Theory (problems: redundancy, arbitrariness); 2.3.4.2. Rights Theory (John Locke, natural rights, correlativity of rights and duties, four features: natural, universal, equal, inalienable); 2.3.4.3. Kant\'s Categorical Imperative (Good will, hypothetical vs. categorical imperatives, Formulations: Universality, Humanity as an End, Autonomy, problem of rigidity); 2.3.4.4. Ross\'s Prima Facie Duties (Fidelity, Reparation, Gratitude, Justice, Beneficence, Self-improvement, Non-maleficence)',
          '2.3.5. Virtue Ethics: Challenging rule-based theories — 2.3.5.1. Aristotle\'s Ethics (Eudaimonia, arete, doctrine of the mean, phronesis, friendship, contemplative faculty)',
          '2.4. Non-Normative Ethics/Meta-ethics — 2.4.1. What is Meta-ethics?; 2.4.2. Cognitivism and Non-Cognitivism (Strong Cognitivism: Naturalism & Non-Naturalism — Moore, McDowell, Wiggins; Mackie\'s Error-Theory; Weak Cognitivism: Best Opinion Theories); 2.4.3. Non-Cognitivism: Emotivism (Ayer), Quasi-realism (Blackburn), Norm-expressivism (Gibbard), Frege-Geach problem, Internalism and Externalism, Humeanism and Anti-Humeanism',
          'Chapter Summary & References'
        ],
        readings: 'Civics Module — Chapter 2'
      },
      {
        id: 'civ-ch3',
        chapterNumber: 3,
        title: 'Chapter Three: Ethical Decision Making and Moral Judgments',
        topics: [
          '3.1. Chapter Introduction (Puzzles of making right decisions, functions of morality) & 3.2. Chapter Objectives (Identify moral foundations, apply standards, make good ethical decisions, understand why be moral)',
          '3.3. How Can We Make Ethical Decisions And Actions? — Instrumental vs. Intrinsic good/bad; 3.3.1. Ethical Principles and Values of Moral Judgments; 3.3.2. Moral intuitions and Critical Reasoning (Rationalisation; Types of reasoning: by analogy, deductive, inductive; Ethics and Religious Faith; Testing moral arguments: Factual accuracy, Consistency, Good will); 3.3.3. Thinking Ethically Framework: Fairness and Justice Approach (Aristotle), The Common Good Approach (Plato, Aristotle, Cicero, Rawls), The Rights Approach (Kant)',
          '3.4. To Whom or What Does Morality Apply? — 3.4.1. Religious Morality; 3.4.2. Morality and Nature; 3.4.3. Individual Morality; 3.4.4. Social Morality',
          '3.5. Who is Morally/Ethically Responsible? — 3.5.1. Moral Judgments: Motives, Means, Consequences, The Moral Situation; 3.5.2. What Makes an Action Moral? (Agent, Intention, Affects others)',
          '3.6. Why Should Human Beings Be Moral? — A. Argument from Enlightened Self-Interest; B. Argument from Tradition and Law; C. Common Human Needs; Five social benefits of moral rules',
          'Chapter Summary & References'
        ],
        readings: 'Civics Module — Chapter 3'
      },
      {
        id: 'civ-ch4',
        chapterNumber: 4,
        title: 'Chapter Four: State, Government and Citizenship',
        topics: [
          '4.1. Chapter Introduction & 4.2. Chapter Objectives (Define state, government, citizen, nationality, citizenship; Contending theories; Rights/duties; State structures; Acquiring and losing Ethiopian citizenship)',
          '4.3. Understanding State — 4.3.1. Defining State: Idealist (Hegel), Functionalist, Organizational, International approaches; Montevideo Convention (population, territory, government, sovereignty, recognition)',
          '4.4. Rival Theories of State — 4.4.1. The Pluralist State (neutral arbiter, Hobbes, Locke, neo-pluralism: Dahl, Lindblom); 4.4.2. The Capitalist State (Marxist theory, class oppression, relative autonomy, Gramsci, Miliband, Poulantzas); 4.4.3. The Leviathan State (New Right, parasitic growth, demand/supply-side pressures, public-choice theory); 4.4.4. The Patriarchal State (Liberal vs. Radical feminists: instrumentalist and structuralist versions)',
          '4.5. The Role of the State — 4.5.1. Minimal States (Night-watchman: Locke, Nozick, Hayek, Friedman); 4.5.2. Developmental States (Japan, MITI, competition states); 4.5.3. Social Democratic (Welfare) States (Keynesianism); 4.5.4. Collectivized States (USSR command economies); 4.5.5. Totalitarian States (Hitler, Stalin); 4.5.6. Religious States (Iran, Pakistan, Sri Lanka)',
          '4.6. Understanding Government — 4.6.1. Authority & Legitimacy; 4.6.2. Purposes and Functions of Government (Self-preservation, resource distribution, conflict management, social aspirations, protection of rights/property, moral conditions, goods/services)',
          '4.7. Understanding Citizenship — 4.7.1. Defining Citizenship (Marshall, Hohfeldian incidents: liberty, claim, power, immunity; Membership/Identity; Minimalist vs. Maximalist participation; Inclusion/Exclusion); 4.7.2. Theorizing Citizenship (Liberal, Communitarian, Republican, Multicultural Citizenship); 4.7.3. Acquiring Citizenship (Jus Soli, Jus Sanguinis, Naturalization; Ethiopian Citizenship by descent & by law; Dual Citizenship prohibited); 4.7.4. Losing Citizenship (Deprivation, Lapse/expiration, Renunciation, Substitution; Statelessness)',
          'Chapter Summary, Self-Check Exercise & References'
        ],
        readings: 'Civics Module — Chapter 4'
      },
      {
        id: 'civ-ch5',
        chapterNumber: 5,
        title: 'Chapter Five: Constitution, Democracy and Human Rights',
        topics: [
          '5.1. Chapter Introduction & 5.2. Chapter Objectives (Human rights, constitution vs. constitutionalism, classifications of constitution, actors of democratization, values and principles of democracy)',
          '5.3. Constitution and Constitutionalism & 5.4. Constitutionalism — 5.3.1. Conceptualizing Constitution; 5.3.2. Peculiar Features (Generality, Permanency, Supremacy, Codified document, Allocation of powers); 5.3.3. Major Purposes and Functions; 5.3.4. Classification of Constitutions (Written/Unwritten, Rigid/Flexible, Effective/Nominal, Federal/Unitary); 5.4. Constitutionalism (Limited and civilized government)',
          '5.5. The Constitutional Experience of Ethiopia: Pre and Post 1931 — 5.5.1. Traditional Constitution (Fetha Negest, Kibre Negest, Ser\'ate Mengist); 5.5.2. The 1931 First Written Constitution; 5.5.3. The Revised Constitution of 1955; 5.5.4. The 1987 PDRE Constitution (Dergue, Marxist-Leninist single party); 5.5.5. The 1995 FDRE Constitution (Federal form, fundamental principles: popular sovereignty, constitutionalism, sanctity of human rights, secularism, accountability)',
          '5.6. Democracy and Democratization — 5.6.1. Defining Democracy (Greek origins, Lincoln, Schumpeter, Direct vs. Indirect, Procedural vs. Substantive, Dahl\'s minimal conditions); 5.6.2. Values and Principles of Democracy; 5.6.3. Democratization; 5.6.4. Actors of Democratization (Political Parties, Media, Civic Societies)',
          '5.7. Human Rights: Concepts and Theories — 5.7.1. What Are Human Rights? (UDHR principles: universality, inalienability, indivisibility, interdependence, equality/non-discrimination); 5.7.2–5.7.4. Rights Holders and Duty Bearers; 5.7.5. Vasak\'s Three Generations (1st: Civil/Political negative rights; 2nd: Social/Economic positive rights; 3rd: Solidarity/Peace/Development/Environmental rights); 5.7.6–5.7.7. Limitations, Derogations & Non-derogable Rights (ICCPR & FDRE Constitution); 5.7.8–5.7.9. International, Regional & Ethiopian Human Rights Systems (FDRE Constitution, EHRC, EIO)',
          'Chapter Summary, Self-Check Questions & References'
        ],
        readings: 'Civics Module — Chapter 5'
      }
    ]
  },

  // ==========================================
  // 9. Inclusive (8 Chapters)
  // ==========================================
  {
    id: 'inclusive',
    code: 'Inclusive',
    title: 'Inclusive',
    shortTitle: 'Inclusive',
    subject: 'inclusive',
    semester: 2,
    creditHours: 2,
    category: 'Common Competency',
    overview: 'Comprehensive 8-Chapter Inclusiveness curriculum covering understanding disabilities and vulnerabilities, the concept of inclusion, identification and differentiated services/rehabilitation, promoting inclusive culture and indigenous values, inclusion for peace, democracy and development, international and Ethiopian legal frameworks, resources management for inclusion, and collaborative partnerships with stakeholders.',
    keyTopics: [
      'Chapter 1: Understanding Disabilities and Vulnerabilities (10 hrs — Impairment, Disability, Handicap, Medical vs. Social Model, 9 Types of Disabilities & Vulnerabilities)',
      'Chapter 2: Concept of Inclusion (Definition, 4 Principles, Rationales, Factors, Benefits, Inclusive School/Classroom Features & 12 Barriers to Inclusion)',
      'Chapter 3: Identification and Differentiated Services (Daily Life Impact, Maslow\'s Needs, Health Care, Prevention Levels, Twin-Track Approach, Multidisciplinary Rehabilitation, CBR, Assistive Tech & Inclusive Employment)',
      'Chapter 4: Promoting Inclusive Culture (5 hrs — Universal Design, Procedural/Interactional Justice, 4 Leadership Behaviors, 5 Stages, 7 Pillars, 16 Inclusive Values & Indigenous Inclusion)',
      'Chapter 5: Inclusion for Peace, Democracy and Development (Sources of Conflict, Democratic Principles, Psychosocial/Economic Development & Respecting Diversity)',
      'Chapter 6: Legal Framework (UDHR, CRC, Jomtien, Salamanca 1994, CRPD Art. 24, FDRE Constitution 1995 & Ethiopian Disability Proclamations)',
      'Chapter 7: Resources Management for Inclusion (School-Based Resource Rooms, Human & Material Resources, Instructional/Evaluation Accommodations & Workplace Resources)',
      'Chapter 8: Collaborative (Cooperative) Partnerships with Stakeholders (5 hrs — Collaboration, Cooperativeness, Co-Planning, Stakeholder Roles, Strategic Alliances & Community Involvement)'
    ],
    defaultChapters: [
      {
        id: 'inc-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: Understanding Disabilities and Vulnerabilities',
        topics: [
          'Time allotted: 10 contact hours — Chapter Objectives: Define disability and vulnerability; List different types of disabilities and vulnerabilities; Explain brief causes of disability and vulnerability; Describe the brief historical movements from segregation to inclusion; Describe the effect of attitude on the move towards inclusion; Discuss models of disability',
          'Chapter Contents: 1.1 Definitions of disability and vulnerability; 1.2 Types of disabilities and vulnerabilities; 1.3 Causes of disability and vulnerability; 1.4 Historical movements from segregation to inclusion; 1.5 The effects of attitude on the move towards inclusion; 1.6 Models of disability',
          '1.1 Definitions of Basic Terms (Impairment, Disability and Handicap) — Impairment: Lack/abnormality of an anatomic, physiological or psychological structure or function; Disability: Complex, dynamic, multidimensional, and contested; Medical Approach vs. Social Definition; Table: Medical model vs. Social model; Causes of disability: Genetic, Environmental, Unknown, Inaccessible environments',
          '1.2 Types of Disabilities (1–4) — 1. Visual impairment (Blindness, Low vision); 2. Hearing Impairment (Hard of Hearing, Deaf); 3. Specific learning disability (Auditory Processing Disorder, Dyscalculia, Dysgraphia, Dyslexia, Language Processing Disorder, Non-Verbal Learning Disabilities, Visual Perceptual/Visual Motor Deficit); 4. Speech and Language Impairments (Speech Impairments: articulation, fluency, voice disorders; Language Impairments: phonological, morphological, semantic, syntactical, pragmatic)',
          '1.2 Types of Disabilities (5–7) — 5. Autism; 6. Emotional and Behavioral Disorders (Conduct disorder, Socialized aggression, Attention problems, Anxiety/Withdrawn, Psychotic behavior, Motor excess; Externalizing vs. Internalizing Behavior; Causes: Biological, Family, Cultural, Environmental); 7. Intellectual Disability (Sub average intellectual functioning, Significant limitations in adaptive skill areas; General Cognition, Learning and Memory, Attention, Adaptive Skills, Speech and Language, Motivation, Academic Achievement, Physical characteristics; Levels of support)',
          '1.2 Types of Disabilities (8–9) — 8. Physical disability/Orthopedic Impairment and Health impairment (Neurological system: Epilepsy, Spinal bifida; Musculoskeletal system: Muscular dystrophy, Arthritis, Amputation, Marfan syndrome, Achondroplasia, Polio, Club foot, Cleft lip and cleft palate; Health Impairments: Heart disease, Cystic fibrosis, AIDS, Hemophilia, Asthma, Diabetes, Nephrosis & Nephritis, Sickle-cell anemia, Leukemia, Lead poisoning, Rheumatic fever, Tuberculosis, Cancer); 9. Vulnerability (Definition, Causes, Characteristics of Vulnerable People: Women, Children, Minorities, Poverty, Disabilities, Age, Illiteracy, Sickness, Gifted and Talentedness)',
          'Chapter Summary & Reference books'
        ],
        readings: 'Inclusive Module — Chapter 1 (10 Contact Hours)'
      },
      {
        id: 'inc-ch2',
        chapterNumber: 2,
        title: 'Chapter 2: Concept of Inclusion',
        topics: [
          'Chapter Overview & Learning Objectives — Define inclusion; Discuss the concept of inclusion in education; Identify reason regarding shift from special education and integrated education to inclusion; Differentiate the major rationales for inclusion; List factors that influenced development of inclusion; Identify benefits of inclusion; Name major characteristics of inclusive school and inclusive classroom environments; Point out strategies to implement inclusion; Differentiate the major barriers to inclusion',
          '2.1. Definition of Inclusion — Inclusion in education/service: Ongoing process aimed at offering quality education/services for all while respecting diversity and eliminating all forms of discrimination; Concepts about learners, education system and schools, diversity and discrimination, processes to promote inclusion, resources; McLeskey and Waldron (2000): Inclusion includes and does not mean',
          '2.2. Principles of Inclusion — Inclusion is a process; concerned with identification and removal of barriers; about presence, participation and achievement; invokes emphasis on those at risk of marginalization',
          '2.3. Rationale for Inclusion — Educational Foundations, Social Foundation, Legal Foundations, Economic Foundation, Foundations for Building Inclusive Society',
          '2.4. Factors that Influenced Development of Inclusion — Communities, Activists and advocates, The quality education and school improvement movement, Special educational needs movement, Involvement of International agencies, Involvement of NGOs movements, Other factors',
          '2.5. Benefits of Inclusion — Benefits for Students with Special Needs Education; Benefits for persons without Special Needs Education; Benefits for Teachers and Parents/Family; Benefits for Society; Ultimate Goal of Inclusion',
          '2.6. Features of Inclusive Environment & 2.7. Inclusive Environments — Major characteristics and Successful environment characteristics',
          '2.8. Barriers to Inclusion — Societal values and beliefs, Economic factors, Lack of measures, Lack of stakeholder responsibility, Conservative traditions, Lack of knowledge and skills, Rigid curricula, Fragile democratic institutions, Inadequate resources, Large class sizes, Globalization and free market policy, Using inclusive models imported from other countries',
          'Chapter Summary & References'
        ],
        readings: 'Inclusive Module — Chapter 2'
      },
      {
        id: 'inc-ch3',
        chapterNumber: 3,
        title: 'Chapter 3: Identification and Differentiated Services',
        topics: [
          'Chapter Overview & Learning Outcomes — Discuss impact of disability and vulnerability; Depict needs; Describe effects of environment; Describe intervention and rehabilitation approaches; Depict barriers for inclusive services; Describe role of technologies; Relate inclusiveness to specific profession; Evaluate inclusiveness of services provision',
          '3.1 Impact of Disability and Vulnerability on daily life (Part 1) — The Nature of the Disability, The Individual\'s Personality, The Meaning of the Disability to the Individual, The Individual\'s Current Life Circumstances, The Individual\'s Support System; Economic Factors and Disability; Political Factors and Disability; Factors Psychological of Disability (Self-Efficacy Beliefs, Psychological Control, Coping Patterns, Personality Disposition); The Family and Disability; Needs of persons with disabilities and vulnerabilities (Maslow\'s Hierarchy: Physiological, Safety, Belongingness and love, Esteem, Self-actualization); Social Needs; Gender and disability; Identity and disability; Belongingness and disability; Intersectionality',
          '3.1 Impact of Disability and Vulnerability on daily life (Part 2: Health & Environment) — The Health Care Needs (Secondary conditions, Co-morbid conditions, Age-related conditions, Engaging in health risk behaviors); Barriers to Health Care (Prohibitive costs, Limited availability, Physical barriers, Inadequate skills); Addressing for Inclusive Barriers to Health Care (Policy and legislation, Financing, Service delivery, Human resources); Disability, vulnerability and the Environment (Enabling and Disabling Factors in Physical/Human-made/Rural Environment; Creating Welcoming Environment; Environmental Modifications: Mobility aids, Communication aids, Accessible structural elements, Accessible features, Job accommodations, Differential use of personnel); Impact of Social and Psychological Environments on the Enabling-Disabling Process (Culture, Pathway from Pathology to Impairment to Functional Limitation to Disability)',
          '3.2 Disability Inclusive Intervention and Rehabilitation Services — Prevention (Primary, Secondary, Tertiary); Implementing the Twin-track Approach; Implement Disability Inclusive Project/Program (Education and vocational training, Health, Relief and social services, Infrastructure, Livelihoods, Protection, Humanitarian and emergency response); Components of Rehabilitation Interventions (Multiple Disciplines: Physicians, Occupational Therapists, Physical Therapists, Speech and Language Therapist, Audiologists, Rehabilitation Nurses, Social Workers, Case Managers, Rehabilitation Psychologists, Neuropsychologists, Therapeutic Recreation Specialists, Rehabilitation Counselors, Orthotists and Prosthetists, Person with the Disability and His or Her Family); Community-Based Rehabilitation (CBR): Definition, Major Objectives',
          '3.3 Implement Technologies for Disability Inclusion — Inclusiveness and Information Technology (ICT); Inclusiveness and Assistive Technology (AT): AT and Daily Living, AT Definitions, AT and User Needs, AT and the Marketplace, AT and Design Methods (User-centered design, Universal design)',
          '3.4 Implement Inclusive Job Opportunities and Employment — Barriers of employment (Attitudes and Discrimination, Accessibility, Education and Training, Social Networks, Women Disabilities, Legal Barriers, Inflexible Work Arrangements, Dismissal on the Basis of Disability, The Benefit Trap); Strategies to Improve Employment (Anti-Discrimination Legislation, Vocational Education And Training, Wage Subsidies, Supported Employment, Workplace Accommodation Schemes, Workers\' Compensation, Quota Systems, Sheltered Workshops, Private Sector Initiatives, Employer Networks, Support Disability-Inclusive Business, Social Enterprises, Support Persons with Disabilities in the Workplace, Building a More Inclusive Society, Boost Education and Training Opportunities, Break Down Attitudinal Barriers, Improve Data Collection)',
          'Chapter Summary & Reference books'
        ],
        readings: 'Inclusive Module — Chapter 3'
      },
      {
        id: 'inc-ch4',
        chapterNumber: 4,
        title: 'Chapter 4: Promoting Inclusive Culture',
        topics: [
          'Time allotted: 5 hours — Chapter Overview & Objectives: Define Inclusive Culture; Discuss the dimensions of Inclusive culture; Evaluate policy related to Inclusive Culture; Explain the process of building community for inclusive culture; Discuss approaches of establishing inclusive culture; Discuss inclusive values; Explore and discuss indigenous inclusive values; Evaluate existing inclusive practices',
          '4.1 Definition of Inclusive Culture — Inclusion is a sense of belonging, connection and community at work; Culture is "the ideas, customs, and social behavior of a particular people or society"; Core values: Representation, Receptivity, Fairness',
          '4.2 Dimensions of Inclusive culture — 1. Universal Design; 2. Recruitment, Training, & Advancement Opportunities (Recruitment, Training, Advancement); 3. Workplace Accommodations and Accessibility: Policy & Practice (Procedural justice, Interactional justice); Experiential and Bottom Line Outcomes: The Benefits of Inclusive cultures; Benefits of an Inclusive organization',
          '4.3 Building inclusive community — What is an inclusive community?; Why is building an inclusive community important?; Characteristics of an Inclusive Community (Integrative and cooperative, Interactive, Invested, Diverse, Equitable, Accessible and Sensitive, Participatory, Safe)',
          '4.4 Means of establish inclusive culture — Four key inclusive leadership behaviors: Empowerment, Accountability, Courage, Humility; Five stages in establishing inclusive culture (1. Consider what you want to achieve and benefits; 2. Undertake an inclusion review; 3. Decide where work is needed and create an action plan; 4. Communicate the plan and put into action; 5. Review, monitor and evaluate impact); Ten Characteristics of an Inclusive Organization',
          '4.5 Inclusive Values — The seven Pillars of Inclusion: Access, Attitude, Choice, partnership, communication, policy and opportunity; A framework of inclusive values: Equality, Rights, Participation, Community, Respect for diversity, Sustainability, Non-violence, Trust, Compassion, Honesty, Courage, Joy, Love, Hope/optimism, Beauty, Wisdom',
          '4.6 Indigenous inclusive values and practices — What is indigenous inclusion?; Features of an indigenous inclusion; A seven stage model to indigenous inclusion; Types of indigenous inclusion policies',
          '4.7 Inclusive practices — Definition; Seven principles of inclusive practices in education; Inclusive teaching strategies; Benefits of Inclusive practices; Chapter Summary & Reference'
        ],
        readings: 'Inclusive Module — Chapter 4 (5 Contact Hours)'
      },
      {
        id: 'inc-ch5',
        chapterNumber: 5,
        title: 'Chapter 5: Inclusion for Peace, Democracy and Development',
        topics: [
          'Chapter Overview & Objectives — Define Peace, Democracy and Development; Identify sources of exclusionary practices; Discuss exclusionary practices in the community; Discuss respecting divers needs, culture, values, demands and ideas; Discuss conflict emanated from exclusion; Explain means and benefits of participation of the marginalized group of people; Discuss the democratic principles for inclusive practices; Explain the importance of inclusion for psychosocial and economic development and peace',
          '5.1 Definition of Peace, Democracy and Development',
          '5.2 Inclusion for Peace — Definition; Why inclusive education is crucial; Sources of Conflict (Spiritual, Individual, Family, National/international, Historical); Sustaining Peace; Building of peace requires taking steps',
          '5.3 Inclusion Education for Democracy — Definition; Democratic principles for inclusive practices',
          '5.4 Inclusion for Development — Definition; Social inclusion; Importance of inclusiveness',
          '5.5 Respecting divers needs, culture, values, demands and ideas — Diversity in the Workplace; Valuing diversity; Cultural Diversity (Ethnic diversity, Benefits of Cultural Diversity); Religious diversity (How to Resolve Conflict); Gender differences (Mental abilities, Stereotype thinking against woman, Woman\'s participations in developments); Marginalized group of people (Creating friendly environments for marginalized people)',
          'Chapter Summary & References'
        ],
        readings: 'Inclusive Module — Chapter 5'
      },
      {
        id: 'inc-ch6',
        chapterNumber: 6,
        title: 'Chapter 6: Legal frame work',
        topics: [
          'Chapter Overview & Objectives — Discuss the concept of legal framework; Identify international and national legal frameworks; Discuss legal frameworks and their implementation; Explore gaps in implementation of legal frameworks to implement inclusion',
          '6.1 General Overview of Legal frameworks — Long history of discrimination; Universal Declaration of Human Rights; Increasing recognition of the rights of persons with disability by international and national law',
          '6.2 Legal Frameworks Regarding Inclusion — Right to inclusive education for persons with disabilities is a fundamental human right; States have specific obligations under international law',
          '6.3 International Legal Frameworks — 1948 Universal Declaration of Human Rights (Article 26); The UN Convention on the Rights of the Child, 1989 (Articles 2, 23, 28, 29); World Conference on Education for All, Jomtien, 1990; The World Programmed of Action, 1982 and the Standard Rules, 1993 (Rule 6); The Salamanca Statement and Framework for Action on Special Needs Education, 1994; Convention on the Rights of Persons with Disabilities (CRPD), 2006 (Article 24); World Education Forum, Dakar, 2000; 1960 UNESCO Convention against Discrimination in Education (Articles 1, 3 and 4)',
          '6.3 National Laws and Policy Frameworks (Ethiopia) — Constitution of the FDRE (1995); Labor Proclamation No. 377/2003 (amended by No. 494/2006) & Labor Proclamation No. 1156/2019; Federal Civil Servant Proclamation No. 515/2007 & No. 1064/2017; Proclamation concerning the Rights to Employment for Persons with Disabilities No. 101/1994 & No. 568/2008; Framework Document (2009); Ethiopian Building Proclamation No. 624/2009; Definition of Powers and Duties of the Executive Organs of the FDRE Proclamation No. 691/2010 & No. 1097/2018; Growth and Transformation Plan (GTP) 2010–2015; National Plan of Action of Persons with Disabilities (2012–2021); Organization of Civil Society Proclamation No. 1113/2019; Revised Higher Institutions Proclamation No. 1152/2019; Advertisement Proclamation No. 759/2012; Developmental Social Welfare Policy (1997); FDRE Education and Training Policy (1994); FDRE Special Needs/Inclusive Education Strategy (2012)',
          'Chapter Summary & References'
        ],
        readings: 'Inclusive Module — Chapter 6'
      },
      {
        id: 'inc-ch7',
        chapterNumber: 7,
        title: 'Chapter 7: Resources Management for Inclusion',
        topics: [
          'Overview of the Chapter — Inclusion demands resources to meet the need of all members of communities and to facilitate equal participants in all sphere of life',
          'Provisions of Resources (School Setting) — Resources for school children; School based resource room; Human resources in schools; School based material resources',
          'Accommodations — Instructional accommodation checklist; Organization and Task Completion; Evaluation accommodations',
          'Resources for work/social environment — Human resources; Material resources; Chapter Summary'
        ],
        readings: 'Inclusive Module — Chapter 7'
      },
      {
        id: 'inc-ch8',
        chapterNumber: 8,
        title: 'Chapter 8: Collaborative (Cooperative) Partnerships with stakeholders',
        topics: [
          'Time allotted: 5 hours — Introduction & Chapter Objectives: Define collaboration, partnership and stakeholder; Identify key elements of successful collaboration; Describe the benefits and challenges of collaboration for various stakeholders; Discuss the strategies for effective co-planning and team working; Identify characteristics of successful partnerships; Design strategies for community involvement',
          '8.1 Collaboration — Definition; Key elements of successful collaboration; General principles of collaboration; Advantages of collaboration; Benefits of collaboration; Challenges to Team Collaboration',
          '8.2 Cooperativeness — Definition; Strategies for effective co-planning and team working',
          '8.3 Stakeholder — Definition of a Stakeholder; Roles of Stakeholders in a Project; Benefits of stakeholder participation; Characteristics of successful stockholders partnerships; What makes a good strategic alliance partner?; What qualities make for a great business partner?; Main features of a partnership; Strategies for community involvement inclusive development; References',
          'Course Pedagogy, Assessment & Policy — Approach/Methods/Strategies: Interactive lectures, Cooperative learning, Brainstorming, Discussion, Role play, Independent/self learning, Field visits, Individual and group assignments and presentation, Seminars, Special needs/inclusive education expert consultancy; Assessment: Tests 10%, Assignment/group assignment 10%, Mid exam 30%, Final exam 50%; Course Policy: Responsibilities of Instructors & Responsibilities of Students'
        ],
        readings: 'Inclusive Module — Chapter 8 (5 Contact Hours)'
      }
    ]
  },

  // ==========================================
  // 10. CriticalThinking (6 Chapters)
  // ==========================================
  {
    id: 'critical_thinking',
    code: 'CriticalThinking',
    title: 'CriticalThinking',
    shortTitle: 'CriticalThinking',
    subject: 'critical_thinking',
    semester: 1,
    creditHours: 3,
    category: 'Common Competency',
    overview: 'Comprehensive 6-Chapter Logic and Critical Thinking curriculum: Course Introduction & Objectives, Chapter 1: Introduction to Philosophy (Lessons 1–5), Chapter 2: Basic Concepts of Logic (Lessons 1–4), Chapter 3: Logic and Language (Lessons 1–5), Chapter 4: Basic Concepts of Critical Thinking (Lessons 1–6), Chapter 5: Informal Fallacies (Lessons 1–5; 22 Fallacies), and Chapter 6: Categorical Propositions (Lessons 1–4).',
    keyTopics: [
      'Chapter One: Introduction to Philosophy (Meaning, 5 Basic Features, Metaphysics, Epistemology, Axiology, Logic & Importance)',
      'Chapter Two: Basic Concepts of Logic (Arguments, Premises/Conclusions, Recognizing Non-Arguments, Deduction vs. Induction & Validity/Soundness/Strength/Cogency)',
      'Chapter Three: Logic and Language (Philosophy of Language, Cognitive vs. Emotive Meaning, Vagueness/Ambiguity, Intension/Extension, 5 Definition Types, Techniques & 8 Lexical Rules)',
      'Chapter Four: Basic Concepts of Critical Thinking (Definitions, 8 Standards, 5 Good Argument Principles, 7 Critical Thinking Principles, Traits, 5 Barriers & Benefits)',
      'Chapter Five: Informal Fallacies (Formal vs. Informal; 8 Fallacies of Relevance, 6 of Weak Induction, 4 of Presumption, 2 of Ambiguity & 2 of Grammatical Analogy)',
      'Chapter Six: Categorical Propositions (Standard Forms A/E/I/O, Quality/Quantity/Distribution, Venn Diagrams, Traditional vs. Modern Squares of Opposition, Conversion/Obversion/Contraposition & Existential Fallacy)'
    ],
    defaultChapters: [
      {
        id: 'loct-ch1',
        chapterNumber: 1,
        title: 'CHAPTER ONE: INTRODUCTION TO PHILOSOPHY',
        topics: [
          'Course Introduction & Chapter Overview/Objectives — Understand the basic essence of philosophy; Logic as a field of study and an instrument; Philosophy as the study of general and fundamental problems; Understand meaning, nature, features, major fields, and importance of learning logic and philosophy',
          'Lesson 1: Meaning and Nature of Philosophy — Etymological definition: "love of wisdom" (philo + sophia); Philosophy as a rational and critical enterprise; Socrates: "Wonder is the feeling of a philosopher"; Philosophy as an activity, not just a body of knowledge; Constructive and critical sides of philosophy',
          'Lesson 2: Basic Features of Philosophy — 1. Set of views or beliefs about life and the universe; 2. Process of reflecting on and criticizing our most deeply held conceptions and beliefs; 3. Rational attempt to look at the world as a whole; 4. Logical analysis of language and clarification of the meaning of words and concepts; 5. Group of perennial problems that interest people',
          'Lesson 3: Metaphysics and Epistemology — 3.1 Metaphysics: Study of the ultimate nature of reality or existence (Cosmological Aspect, Theological Aspect, Anthropological Aspect, Ontological Aspect); 3.2 Epistemology: Study of the nature, scope, meaning, and possibility of knowledge (Sources: Empiricism, Rationalism, Intuition, Revelation, Authority; Skepticism, Agnosticism)',
          'Lesson 4: Axiology and Logic — 4.1 Axiology: Study or theory of value (Ethics: Meta-ethics, Normative ethics, Applied ethics; Aesthetics; Social/Political Philosophy); 4.2 Logic: Study or theory of principles of right reasoning',
          'Lesson 5: Importance of Learning Philosophy — Intellectual and Behavioral Independence; Reflective Self-Awareness; Flexibility, Tolerance, and Open-Mindedness; Creative and Critical Thinking; Conceptualized and well-thought-out value systems; Dealing with uncertainty; Chapter Summary, Self Check Exercise & References'
        ],
        readings: 'CriticalThinking Module — Chapter 1'
      },
      {
        id: 'loct-ch2',
        chapterNumber: 2,
        title: 'CHAPTER TWO: BASIC CONCEPTS OF LOGIC',
        topics: [
          'Chapter Overview & Objectives — Logic as the organized body of knowledge that evaluates arguments; understand meaning, components, and types of arguments; recognize major techniques of recognizing and evaluating arguments',
          'Lesson 1: Basic Concepts of Logic: Arguments, Premises and Conclusions — What is Logic?; Benefit of Studying Logic; What is an Argument? (Group of statements; premise(s) and conclusion); Statement (Declarative sentence with truth-value); Premise & Conclusion; Indicator words: Conclusion indicators (therefore, thus, so, hence, etc.) and Premise indicators (since, because, for, etc.); Inference',
          'Lesson 2: Techniques of Recognizing Arguments — 2.1 Recognizing Argumentative Passages: Factual claim and Inferential claim (Explicit and Implicit); 2.2 Recognizing Non-argumentative Passages: Simple Non-inferential Passages (Warnings, Pieces of advice, Statements of belief/opinion, Loosely associated statements, Reports), Expository Passages, Illustrations, Explanations (Explanandum and Explanans), Conditional Statements (Antecedent and Consequent; Sufficient and Necessary conditions)',
          'Lesson 3: Types of Arguments: Deduction and Induction — 3.1 Deductive Arguments (Strict necessity); 3.2 Inductive Arguments (Probability); 3.3 Differentiating Deductive and Inductive Arguments: Special indicator words, Actual strength of the inferential link, Character or form of argumentation (Deductive: mathematics, definition, categorical/hypothetical/disjunctive syllogisms; Inductive: predictions, analogy, inductive generalizations, authority, signs, causal inferences)',
          'Lesson 4: Evaluating Arguments — 4.1 Evaluating Deductive Arguments: Validity, Truth, and Soundness (Valid/Invalid; Sound/Unsound; Table 1.1 Relationship between validity and truth value); 4.2 Evaluating Inductive Arguments: Strength, Truth, and Cogency (Strong/Weak; Cogent/Uncogent; Table 1.2 Relationship between strength and truth value); Chapter Summary, Self Check Exercise & References'
        ],
        readings: 'CriticalThinking Module — Chapter 2'
      },
      {
        id: 'loct-ch3',
        chapterNumber: 3,
        title: 'CHAPTER THREE: LOGIC AND LANGUAGE',
        topics: [
          'Chapter Overview & Objectives — Recognize relationship between logic and language; identify varieties of meaning; appreciate intensional and extensional meaning; recognize types, purposes, and techniques of definitions; appreciate common rules for lexical definitions',
          'Lesson 1: Philosophy of Language: An overview — 1.1 What is Philosophy of Language?; 1.2 A Brief Note on the Debates and History of Philosophy of Language; 1.3 Some Philosophical Approaches to the Nature of Meaning (Idea theories, Truth-conditional theories, Use theories, Reference theories, Verificationist theories, Pragmatist theories)',
          'Lesson 2: Logic and Meaning — 2.1 The Functions of Language: Cognitive and Emotive Meanings (Cognitive meaning, Emotive meaning, Value claim; Emotive Terminologies in Arguments; Deficiency of Cognitive Meanings: Vagueness and Ambiguity; Forms of Disputes in Logic: Verbal and Factual Disputes); 2.2 The Intension and Extension of Terms (Intension/Connotation, Extension/Denotation, Increasing/Decreasing intension and extension, Empty extension)',
          'Lesson 3: Meaning, Types, and Purposes of Definitions — 3.1 The Meaning of Definition (Definiendum and Definiens); 3.2 The Types and Purposes of Definitions (Stipulative, Lexical, Precising, Theoretical, Persuasive definitions)',
          'Lesson 4: Techniques of Definition — 4.1 The Extensional (Denotative) Definitional Techniques (Demonstrative/Ostensive Definitions, Enumerative Definitions, Definition by Subclass); 4.2 The Intensional (Connotative) Definitional Techniques (Synonymous Definition, Etymological Definition, Operational Definition, Definition by Genus and Difference)',
          'Lesson 5: Criteria for Lexical Definitions — Rule 1: Conform to standards of proper grammar; Rule 2: Convey the essential meaning; Rule 3: Neither too broad nor too narrow; Rule 4: Avoid circularity; Rule 5: Not negative when it can be affirmative; Rule 6: Avoid figurative, obscure, vague, or ambiguous language; Rule 7: Avoid affective terminology; Rule 8: Indicate the context to which the definiens pertains; Chapter Summary, Self Check Exercise & References'
        ],
        readings: 'CriticalThinking Module — Chapter 3'
      },
      {
        id: 'loct-ch4',
        chapterNumber: 4,
        title: 'CHAPTER FOUR: BASIC CONCEPTS OF CRITICAL THINKING',
        topics: [
          'Chapter Overview & Objectives — Define critical thinking; understand standards of critical thinking; appreciate principles of good argument and critical thinking; understand characteristics, barriers, and benefits of critical thinking',
          'Lesson 1: Meaning of Critical Thinking — Definition: Wide range of cognitive skills and intellectual dispositions; John Dewey (Active, persistent, and careful consideration); Edward Glaser (Attitude, knowledge, skill); Robert Ennis (Reasonable, reflective thinking focused on deciding what to believe or do); Richard Paul (Mode of thinking about any subject); Michael Scriven (Skilled and active interpretation and evaluation); Criticocreative thinking',
          'Lesson 2: Standards of Critical Thinking — Clarity, Precision, Accuracy, Relevance, Consistency, Logical Correctness, Completeness, Fairness',
          'Lesson 3: Codes of Intellectual Conduct for Effective Discussion — 3.1 Principles of Good Argument (Structural Principle, Relevance Principle, Acceptability Principle, Sufficiency Principle, Rebuttal Principle); 3.2 Principles of Critical Thinking (Fallibility Principle, Truth Seeking Principle, Clarity Principle, Burden of Proof Principle, Principle of Charity, Suspension of Judgment Principle, Resolution Principle)',
          'Lesson 4: Characteristics of Critical Thinking — 4.1 Basic Traits of Critical Thinkers; 4.2 Basic Traits of Uncritical Thinkers',
          'Lesson 5: Barriers to Critical Thinking & Lesson 6: Benefits of Critical Thinking — Barriers: Egocentrism (Self-interested thinking, Superiority bias), Sociocentrism (Group bias, Conformism), Unwarranted Assumptions and Stereotypes, Relativistic Thinking (Subjectivism, Cultural relativism), Wishful Thinking; Benefits: Critical Thinking in the Classroom & in Life; Chapter Summary, Self Check Exercise & References'
        ],
        readings: 'CriticalThinking Module — Chapter 4'
      },
      {
        id: 'loct-ch5',
        chapterNumber: 5,
        title: 'CHAPTER FIVE: INFORMAL FALLACIES',
        topics: [
          'Chapter Overview, Objectives & Lesson 1: Fallacy in General — 1.1 The Meaning of Fallacy; 1.2 Types of Fallacies (Formal and Informal)',
          'Lesson 2: Fallacies of Relevance (1–8) — 1. Appeal to Force (Argumentum ad Baculum); 2. Appeal to Pity (Argumentum ad Misericordiam); 3. Appeal to the People (Argumentum ad Populum: Bandwagon, Vanity, Snobbery); 4. Argument against the Person (Argumentum ad Hominem: Abusive, Circumstantial, Tu Quoque); 5. Accident; 6. Straw Man; 7. Missing the Point (Ignoratio Elenchi); 8. Red Herring',
          'Lesson 3: Fallacies of Weak Induction (9–14) — 9. Appeal to Unqualified Authority (Argumentum ad Verecundiam); 10. Appeal to Ignorance (Argumentum ad Ignorantiam); 11. Hasty Generalization (Converse Accident); 12. False Cause (Post hoc ergo propter hoc, Non causa pro causa, Oversimplified cause); 13. Slippery Slope; 14. Weak Analogy',
          'Lesson 4: Fallacies of Presumption (15–18) — 15. Begging the Question (Petitio Principii); 16. Complex Question; 17. False Dichotomy; 18. Suppressed Evidence',
          'Lesson 5: Fallacies of Ambiguity and Grammatical Analogy (19–22) — 5.1 Fallacies of Ambiguity: 19. Equivocation, 20. Amphiboly; 5.2 Fallacies of Grammatical Analogy: 21. Composition, 22. Division; Chapter Summary & References'
        ],
        readings: 'CriticalThinking Module — Chapter 5'
      },
      {
        id: 'loct-ch6',
        chapterNumber: 6,
        title: 'CHAPTER SIX: CATEGORICAL PROPOSITIONS',
        topics: [
          'Chapter Overview & Objectives — Define categorical proposition; explain four standard categorical propositions; explain attributes of quality, quantity, and distribution; understand immediate inferences and logical oppositions',
          'Lesson 1: General Introduction — What is Categorical Propositions?; 1.1 Standard-Forms of Categorical Proposition (A, E, I, O); 1.2 The Components of Categorical Propositions (Quantifier, Subject term, Copula, Predicate term)',
          'Lesson 2: Attributes of Categorical Propositions: Quality, Quantity, and Distribution — A. Quality (Affirmative/Negative); B. Quantity (Universal/Particular); C. Distribution (Distributed/Undistributed)',
          'Lesson 3: Venn Diagrams and the Modern Square of Opposition — 3.1 Representing Categorical Propositions in Diagrams (Venn Diagrams); 3.2 Squares of Opposition: Traditional and Modern Squares of Opposition; 3.3 The Traditional Square of Opposition (Contradictory, Contrary, Subcontrary, Subalternation)',
          'Lesson 4: Evaluating Immediate Inferences: Using Venn Diagrams and Square of Oppositions — 4.1 Logical Operations: Conversion (Valid for E and I; Illicit conversion for A and O), Obversion (Valid for all four), Contraposition (Valid for A and O; Illicit contraposition for E and I); Existential fallacy; Chapter Summary, Self-Check Exercises & References'
        ],
        readings: 'CriticalThinking Module — Chapter 6'
      }
    ]
  },

  // ==========================================
  // 11. MathsNat (4 Chapters)
  // ==========================================
  {
    id: 'maths_nat',
    code: 'MathsNat',
    title: 'MathsNat',
    shortTitle: 'MathsNat',
    subject: 'mathematics',
    semester: 1,
    creditHours: 3,
    category: 'Natural Science Core',
    overview: 'Comprehensive 4-Chapter Mathematics for Natural Sciences (MathsNat) course covering Chapter One: Propositional Logic and Set Theory (propositions, logical connectives ∧, ∨, ⇒, ⇔, ¬, compound propositions & truth tables, tautology & contradiction, open propositions & quantifiers ∀ and ∃, arguments & validity, set concepts, descriptions, operations & Venn diagrams), Chapter Two: The Real and the Complex Number System (natural numbers, GCF, LCM, Principle of Mathematical Induction, integers, rational numbers & periodic decimals, real numbers, intervals, upper/lower bounds & completeness property, complex numbers z = x + iy, conjugate, modulus, polar form, De Moivre\'s formula, Euler\'s formula & roots of complex numbers), Chapter Three: Functions (Cartesian product, relations & functions, operations & composition, injective/surjective/bijective & inverse functions, polynomials, Division/Remainder/Factor/Location/FTA/Linear Factorization/Conjugate Roots/Rational Root theorems, rational functions & asymptotes, exponents/radicals, exponential, logarithmic, trigonometric & hyperbolic functions), and Chapter Four: Analytic Geometry (distance & section division formulas, equations of lines & point-to-line distance, circles & tangent lines, parabolas, ellipses, hyperbolas, rotation of coordinate axes & general second-degree conic equations).',
    keyTopics: [
      'Chapter One: Propositional Logic and Set Theory (1.1 Propositional Logic, 1.2 Open Propositions & Quantifiers, 1.3 Arguments & Validity, 1.4 Set Theory & Venn Diagrams)',
      'Chapter Two: The Real and the Complex Number System (2.1 Natural, Integer, Rational & Real Numbers, Induction & Completeness, 2.2 Complex Numbers, Polar Form, De Moivre\'s & Euler\'s Formulas)',
      'Chapter Three: Functions (3.1–3.3 Relations, Functions, Bijections & Inverses, 3.4 Polynomial Theorems & Rational Functions, 3.5 Exponential, Logarithmic, Trigonometric & Hyperbolic Functions)',
      'Chapter Four: Analytic Geometry (4.1 Distance, Section Formula & Lines, 4.2 Circles, 4.3 Parabolas, 4.4 Ellipses, 4.5 Hyperbolas, 4.6 Rotation of Axes & General Second-Degree Equation)'
    ],
    defaultChapters: [
      {
        id: 'mathnat-ch1',
        chapterNumber: 1,
        title: 'Chapter One: Propositional Logic and Set Theory',
        topics: [
          '1.1 Propositional Logic — 1.1.1 Definition and examples of Propositions: A proposition is a declarative sentence that is either true or false, but not both; 1.1.2 Logical connectives: Conjunction (∧, "and"), Disjunction (∨, "or"), Implication (⇒, "if...then"), Bi-implication (⇔, "if and only if"), and Negation (¬, "not") with truth tables for each connective; 1.1.3 Compound (or complex) propositions: Formed by joining propositions with connectives, determining truth values using truth tables, and logical equivalence of propositions; 1.1.4 Tautology and contradiction: A tautology is always true; a contradiction is always false',
          '1.2 Open propositions and quantifiers — Open propositions (predicates) contain variables and become propositions when values are assigned; Quantifiers: Universal quantifier (∀, "for all") and Existential quantifier (∃, "there exists"), negation of quantified statements, and quantifiers occurring in combinations',
          '1.3 Arguments and Validity — An argument is a set of premises leading to a conclusion; Validity: An argument is valid if the conclusion is true whenever all premises are true; Testing validity using truth tables and rules of inference (Modus Ponens, Modus Tollens, etc.) and formal proof of validity',
          '1.4 Set Theory — 1.4.1 The Concept of a set: A well-defined collection of objects, notation x ∈ A, x ∉ A; 1.4.2 Description of sets: Verbal, Roster/Complete Listing, Partial Listing, and Set-builder methods, subsets, proper subsets, power set, universal set, empty set; 1.4.3 Set operations and Venn diagrams: Union (∪), Intersection (∩), Difference (−), Complement (′), Symmetric Difference (Δ), and Venn diagrams to illustrate set relationships and operations'
        ],
        readings: 'MathsNat Module — Chapter 1'
      },
      {
        id: 'mathnat-ch2',
        chapterNumber: 2,
        title: 'Chapter Two: The Real and the Complex Number System',
        topics: [
          '2.1 The real number System — 2.1.1 The set of natural numbers: Operations (addition, multiplication), properties (closure, commutative, associative, distributive), order relations, factors, prime factorization, GCF, LCM, Principle of Mathematical Induction; 2.1.2 The set of Integers: Operations, properties, order relations; 2.1.3 The set of Rational Numbers: Definition, operations, properties, order relations, decimal representation (terminating, non-terminating periodic), conversion to fractions; 2.1.4 The set of Real Numbers: Definition (union of rational and irrational), operations, properties, number line, order relations, intervals, upper/lower bounds, completeness property',
          '2.2 The set of Complex Numbers — Definition: z = x + iy, where i² = -1, real and imaginary parts, plotting complex numbers in the complex plane, equality of complex numbers, operations (addition, subtraction, multiplication, division), conjugate and modulus (norm) with properties, additive and multiplicative inverses',
          '2.2 Polar Form, De Moivre\'s & Euler\'s Formulas and Roots — Argument (Amplitude) of a complex number (principal argument, properties), Polar form z = r(cos θ + i sin θ), multiplication and division in polar forms, De Moivre\'s Formula zⁿ = rⁿ(cos nθ + i sin nθ), Euler\'s formula z = re^(iθ), and extraction of roots of complex numbers'
        ],
        readings: 'MathsNat Module — Chapter 2'
      },
      {
        id: 'mathnat-ch3',
        chapterNumber: 3,
        title: 'Chapter Three: Functions',
        topics: [
          '3.1 Review of relations and functions — Cartesian Product A × B = {(a, b) : a ∈ A, b ∈ B}; Relations: Any subset of A × B, domain, range, codomain, inverse of a relation; Functions: A relation where each element in the domain maps to exactly one element in the range, domain, codomain, range, independent and dependent variables',
          '3.2 Real Valued functions and their properties — Operations on functions: Sum, difference, product, quotient; Composition of functions: (f ∘ g)(x) = f(g(x)); Equality of functions: Same domain and same functional values',
          '3.3 Types of functions and inverse of a function — One to One (Injective): f(x₁) = f(x₂) ⇒ x₁ = x₂; Onto (Surjective): Range(f) = B; One-to-one Correspondence (Bijective): Both one-to-one and onto; Inverse of a function: Only one-to-one functions have inverses, finding the inverse by interchanging x and y',
          '3.4 Polynomials, zeros of polynomials, rational functions and their graphs — Polynomial Functions: Definition, degree, leading coefficient, Division Algorithm, Remainder Theorem, Factor Theorem, Location Theorem, Fundamental Theorem of Algebra, Linear Factorization Theorem, Conjugate Roots Theorem, Rational Root Theorem; Rational Functions: Definition, domain, intercepts, vertical/horizontal/oblique asymptotes, graphing rational functions',
          '3.5 Definition and basic properties of logarithmic, exponential, trigonometric and hyperbolic functions and their graphs — Exponents and Radicals (rules for integer and rational exponents); Exponential Functions f(x) = bˣ (properties, graphs, natural exponential function eˣ); Logarithmic Functions (inverse of exponential functions, properties, common log and natural log ln, graphs); Trigonometric Functions (angle measurement in degrees & radians, definitions, graphs of sine/cosine/tangent, period, amplitude, frequency, identities); Hyperbolic Functions (definitions of sinh x, cosh x, tanh x, etc., graphs and identities)'
        ],
        readings: 'MathsNat Module — Chapter 3'
      },
      {
        id: 'mathnat-ch4',
        chapterNumber: 4,
        title: 'Chapter Four: Analytic Geometry',
        topics: [
          '4.1 Distance Formula and Equation of Lines — 4.1.1 Distance between two points and division of segments: Distance formula, midpoint formula, division point of a line segment; 4.1.2 Equations of lines: Slope, point-slope form, slope-intercept form, two-point form, intercept form, parallel and perpendicular lines; 4.1.3 Distance between a point and a line: Formula for the perpendicular distance from a point to a line',
          '4.2 Circles — 4.2.1 Definition of a Circle: Locus of points equidistant from a fixed point (center), radius, chord, diameter; 4.2.2 Equation of a Circle: Standard equation (x - h)² + (y - k)² = r², General equation x² + y² + Dx + Ey + F = 0; 4.2.3 Intersection of a circle with a line and tangent line to a circle: Conditions for no intersection, secant line (two points), tangent line (one point), finding the equation of a tangent line',
          '4.3 Parabolas — 4.3.1 Definition of a Parabola: Set of points equidistant from a fixed line (directrix) and a fixed point (focus), vertex, axis, latus rectum, focal length; 4.3.2 Equation of Parabolas: Standard equations for vertical (x² = 4py) and horizontal (y² = 4px) parabolas, shifted parabolas with vertex at (h, k)',
          '4.4 Ellipses & 4.5 Hyperbolas — 4.4.1–4.4.2 Definition of an Ellipse (constant sum of distances to foci, center, vertices, major/minor axes, eccentricity) and standard/shifted equations for horizontal (x²/a² + y²/b² = 1) and vertical (x²/b² + y²/a² = 1) ellipses; 4.5.1–4.5.2 Definition of a Hyperbola (constant difference of distances to foci, center, vertices, transverse/conjugate axes, eccentricity) and standard/shifted equations for horizontal (x²/a² - y²/b² = 1) and vertical (y²/a² - x²/b² = 1) hyperbolas with asymptotes',
          '4.6 The General Second Degree Equation — 4.6.1 Rotation of Coordinate Axes: Rotation formulas to transform coordinates between rotated systems; 4.6.2 The General Second Degree Equations: Using rotation of axes to eliminate the xy term in Ax² + Bxy + Cy² + Dx + Ey + F = 0 and identifying the type of conic section'
        ],
        readings: 'MathsNat Module — Chapter 4'
      }
    ]
  },

  // ==========================================
  // 12. Economics (6 Chapters)
  // ==========================================
  {
    id: 'economics',
    code: 'Economics',
    title: 'Economics',
    shortTitle: 'Economics',
    subject: 'economics',
    semester: 2,
    creditHours: 3,
    category: 'Social & Humanities',
    overview: 'Comprehensive 6-Chapter Introduction to Economics course covering Chapter One: Basics of Economics (Definition, Rationales, Scope & Methods of Analysis, Scarcity, Choice, Opportunity Cost, PPF, Basic Economic Questions, Economic Systems & Circular Flow Model), Chapter Two: Theory of Demand and Supply (Demand Schedule/Curve/Function, Determinants, Price/Income/Cross Elasticity, Supply Theory & Market Equilibrium), Chapter Three: Theory of Consumer Behaviour (Preferences, Utility, Cardinal Utility & Equi-Marginal Principle, Ordinal Utility, Indifference Curves, MRS & Budget Line Tangency), Chapter Four: The Theory of Production and Cost (Short-Run Production TP/AP/MP, Three Stages of Production, Explicit/Implicit Costs & Short-Run Cost Curves), Chapter Five: Market Structure (Perfect Competition, Monopoly, Monopolistic Competition & Oligopoly), and Chapter Six: Fundamental Concepts of Macroeconomics (Goals, National Income Accounting GDP/GNP, Business Cycle, Unemployment, Inflation, Budget/Trade Deficits & Monetary/Fiscal Policy).',
    keyTopics: [
      'Chapter One: Basics of Economics (Definitions, Rationales, Micro vs. Macro, Positive vs. Normative, Inductive vs. Deductive, Scarcity, Opportunity Cost, PPF, Economic Systems & Circular Flow)',
      'Chapter Two: Theory of Demand and Supply (Law of Demand & Supply, Shifters vs. Movements, Price/Income/Cross Elasticities & Market Equilibrium)',
      'Chapter Three: Theory of Consumer Behaviour (Cardinal Utility, LDMU, Equi-Marginal Rule, Ordinal Utility, Indifference Curves, MRS & Budget Line Equilibrium)',
      'Chapter Four: The Theory of Production and Cost (Short-Run Production TP/AP/MP, 3 Stages of Production, Explicit/Implicit Costs & Short-Run Cost Curves AFC/AVC/ATC/MC)',
      'Chapter Five: Market Structure (Physical & Digital Markets, Perfect Competition Short-Run Equilibrium & Shutdown Point, Monopoly, Monopolistic Competition & Oligopoly)',
      'Chapter Six: Fundamental Concepts of Macroeconomics (Macro Goals, National Income Accounting GDP/GNP Approaches, Real vs. Nominal GDP, Business Cycle, Unemployment, Inflation & Monetary/Fiscal Policy)'
    ],
    defaultChapters: [
      {
        id: 'econ-ch1',
        chapterNumber: 1,
        title: 'Chapter One: Basics of Economics',
        topics: [
          '1.1 Definition of Economics — Greek origin of "economy" (managing a household); Adam Smith (1776) as father of economics; Wealth, Welfare, Scarcity, and Growth definitions; Formal definition: social science studying efficient allocation of scarce resources to attain maximum fulfillment of unlimited human needs',
          '1.2 The Rationales of Economics — Two fundamental facts: (1) Human wants are unlimited, and (2) Economic resources are limited (scarce); Basic economic problem of scarcity and choice',
          '1.3 Scope and Method of Analysis in Economics — 1.3.1 Scope of Economics: Microeconomics (individual decision-making units) vs. Macroeconomics (aggregate economy); 1.3.2 Positive Analysis (facts, "what is") vs. Normative Analysis (value judgments, "what ought to be"); 1.3.3 Inductive Reasoning (specific to general) vs. Deductive Reasoning (general to specific)',
          '1.4 Scarcity, Choice, Opportunity Cost and Production Possibilities Frontier — 1.4.1 Scarcity vs. Shortage, Free vs. Economic Resources, Four Factors of Production and Rewards (Land/Rent, Labor/Wages, Capital/Interest, Entrepreneurship/Profit); 1.4.2 Choice; 1.4.3 Opportunity Cost formula; 1.4.4 Production Possibilities Frontier (PPF): Assumptions, Efficiency, Inefficiency, Unattainable points, Law of Increasing Opportunity Cost (concavity), and Economic Growth (PPF shifts)',
          '1.5 Basic Economic Questions — What to produce? How to produce? For whom to produce?',
          '1.6 Economic Systems — 1.6.1 Capitalist (Free Market) Economy; 1.6.2 Command (Socialist/Planned) Economy; 1.6.3 Mixed Economy (features, advantages, and disadvantages of each)',
          '1.7 Decision Making Units and the Circular Flow Model — Households, Firms, and Government; Resource (Factor) Market vs. Product Market; Two-Sector and Three-Sector Circular Flow Models (Real Flow vs. Money/Financial Flow)'
        ],
        readings: 'Economics Module — Chapter 1'
      },
      {
        id: 'econ-ch2',
        chapterNumber: 2,
        title: 'Chapter Two: Theory of Demand and Supply',
        topics: [
          '2.1 Theory of Demand — 2.1.1 Demand Schedule, Demand Curve, Demand Function & Law of Demand, Individual vs. Market Demand (horizontal summation); 2.1.2 Determinants of Demand (Demand Shifters: Taste, Income [Normal vs. Inferior], Related Goods [Substitutes vs. Complements], Expectations, Number of Buyers) & Movement along vs. Shift of Demand',
          '2.1.3 Elasticity of Demand — A. Price Elasticity of Demand (Point vs. Arc/Midpoint formulas, 5 Elasticity Categories, Determinants & Total Revenue Test); B. Income Elasticity of Demand (Normal, Necessity, Luxury, Inferior); C. Cross-Price Elasticity of Demand (Substitutes > 0, Complements < 0, Independent = 0)',
          '2.2 Theory of Supply — 2.2.1 Supply Schedule, Supply Curve, Supply Function & Law of Supply, Individual vs. Market Supply; 2.2.2 Determinants of Supply (Input prices, Technology, Taxes/Subsidies, Expectations, Number of Sellers, Weather); 2.2.3 Price Elasticity of Supply (Point & Arc formulas, Determinants)',
          '2.3 Market Equilibrium — 2.3.1 Concept & Graphical/Algebraic Determination of Equilibrium (Qd = Qs), Excess Demand (Shortage) vs. Excess Supply (Surplus), Price Ceilings & Price Floors; 2.3.2 Effects of Shifts in Demand and Supply on Equilibrium Price and Quantity'
        ],
        readings: 'Economics Module — Chapter 2'
      },
      {
        id: 'econ-ch3',
        chapterNumber: 3,
        title: 'Chapter Three: Theory of Consumer Behaviour',
        topics: [
          '3.1 Consumer Preferences (Completeness, Transitivity, Non-Satiation) & 3.2 The Concept of Utility (Subjectivity and Relativity of Utility)',
          '3.3 Approaches of Measuring Utility — 3.3.1 The Cardinal Utility Theory: Assumptions, Total Utility (TU) and Marginal Utility (MU), Law of Diminishing Marginal Utility (LDMU), Consumer Equilibrium (Equi-Marginal Principle: MUx/Px = MUy/Py = MUm) & Derivation of Demand Curve',
          '3.3.2 The Ordinal Utility Theory (Indifference Curve Approach) — Assumptions, Indifference Set/Curve/Map, Four Properties of Indifference Curves, Marginal Rate of Substitution (MRSxy = MUx/MUy), Perfect Substitutes & Perfect Complements',
          'The Budget Line (Price Line: PxX + PyY = I, Intercepts, Slope = -Px/Py, Effects of Income & Price Changes) & Consumer Optimum Equilibrium (Tangency Condition: MRSxy = MUx/MUy = Px/Py)'
        ],
        readings: 'Economics Module — Chapter 3'
      },
      {
        id: 'econ-ch4',
        chapterNumber: 4,
        title: 'Chapter Four: The Theory of Production and Cost',
        topics: [
          '4.1 Theory of Production — 4.1.1 Production Function, Fixed vs. Variable Inputs, Short Run vs. Long Run; 4.1.2 Short-Run Production with One Variable Input: Total Product (TP), Average Product (APL = TP/L), Marginal Product (MPL = dTP/dL)',
          'Law of Variable Proportions (Law of Diminishing Marginal Returns), Relationships between TP, APL, and MPL, and the Three Stages of Production (Why rational firms operate in Stage II)',
          '4.2 Theory of Cost — 4.2.1 Accounting (Explicit) Cost vs. Implicit Cost, Economic Cost & Economic vs. Accounting Profit; 4.2.2 Short-Run Costs: TFC, TVC, TC, AFC, AVC, ATC (AC), and Marginal Cost (MC)',
          'Properties of Short-Run Cost Curves (Why MC cuts AVC and ATC at their minimum points) & 4.2.3 Inverse Mirror Relationship between Short-Run Production (APL, MPL) and Cost Curves (AVC, MC)'
        ],
        readings: 'Economics Module — Chapter 4'
      },
      {
        id: 'econ-ch5',
        chapterNumber: 5,
        title: 'Chapter Five: Market Structure',
        topics: [
          '5.1 The Concept of Market in Physical and Digital Space & Criteria for Market Classification',
          '5.2 Perfectly Competitive Market — 5.2.1 Six Assumptions & Price-Taker Demand (P = AR = MR); 5.2.2 Short-Run Equilibrium of the Firm (Total Approach TR - TC & Marginal Approach MR = MC; Abnormal Profit, Normal Profit/Break-Even, Loss Minimization & Shutdown Point P = min AVC; Short-Run Supply Curve); 5.2.3 Industry Equilibrium',
          '5.3 Monopoly Market — 5.3.1 Characteristics (Single Seller, No Close Substitutes, Price Maker P > MR, Blocked Entry); 5.3.2 Sources of Monopoly Power (Control of Inputs, Patents/Copyrights, Natural Monopoly/Economies of Scale, Legal Franchises)',
          '5.4 Monopolistically Competitive Market (Product Differentiation, Non-Price Competition, Free Entry/Exit) & 5.5 Oligopoly Market (Few Dominant Sellers, Mutual Interdependence, Collusive/Cartel vs. Non-Collusive Oligopoly)'
        ],
        readings: 'Economics Module — Chapter 5'
      },
      {
        id: 'econ-ch6',
        chapterNumber: 6,
        title: 'Chapter Six: Fundamental Concepts of Macroeconomics',
        topics: [
          '6.1 Goals of Macroeconomics — Economic Growth, Full Employment, Price Stability, External Balance & Fair Income Distribution',
          '6.2 The National Income Accounting — 6.2.1 GDP vs. GNP (GNP = GDP + NFI), Precautions Against Double Counting, Three Approaches to Measuring GDP: Product (Value-Added) Approach, Expenditure Approach (GDP = C + I + G + NX), and Income Approach; 6.2.2 NDP, NNP, NI, PI & Disposable Income (DI); 6.2.3 Nominal vs. Real GDP, GDP Deflator & CPI',
          '6.3 Macroeconomic Problems — 6.3.1 Business Cycle (Expansion, Peak, Contraction/Recession, Trough); 6.3.2 Unemployment (Labor Force, Unemployment Rate, Frictional, Structural & Cyclical Unemployment, Natural Rate of Unemployment); 6.3.3 Inflation (Creeping to Hyperinflation, Demand-Pull vs. Cost-Push Inflation); 6.3.4 Budget Deficit & Trade Deficit',
          '6.4 Macroeconomic Policy Instruments — 6.4.1 Monetary Policy (Open Market Operations, Required Reserve Ratio, Discount Rate); 6.4.2 Fiscal Policy (Government Spending & Taxation — Expansionary vs. Contractionary Policies)'
        ],
        readings: 'Economics Module — Chapter 6'
      }
    ]
  },

  // ==========================================
  // 13. MathsApplied (4 Chapters)
  // ==========================================
  {
    id: 'maths_applied',
    code: 'MathsApplied',
    title: 'MathsApplied',
    shortTitle: 'MathsApplied',
    subject: 'math_applied_2',
    semester: 2,
    creditHours: 4,
    category: 'Natural Science Core',
    overview: 'Comprehensive 4-Chapter Applied Mathematics I course covering Chapter 1: Vectors and Their Applications (Scalars/Vectors in ℝ² and ℝ³, Dot & Cross Products, Projections, Direction Cosines, Area/Volume/Scalar Triple Product, Lines & Planes in ℝ³, Vector Spaces, Subspaces, Linear Independence & Basis), Chapter 2: Matrices and Determinants (Matrix Types & Operations, Transpose, Trace, EROs & RREF, Rank, Inverse, Determinants, Minors/Cofactors/Adjoint, Linear Systems: Cramer\'s Rule, Gaussian Elimination, Inverse Method, Eigenvalues/Eigenvectors & Diagonalization), Chapter 3: Derivatives and Application of Derivatives (Limit Definition, Differentiation Rules, Implicit & Higher-Order Derivatives, Inverse Trig & Hyperbolic Functions, Extrema, Rolle\'s & MVT, Monotonicity, Concavity, Optimization & L\'Hôpital\'s Rule), and Chapter 4: Integration and Application of Integration (Indefinite Integrals, Substitution, Integration by Parts/ILATE, Trig Integrals, Trig Substitution, Partial Fractions, FTC Part I & II, Improper Integrals, Area & Volumes of Revolution).',
    keyTopics: [
      'Chapter 1: Vectors and Their Applications (ℝ²/ℝ³ Vectors, Dot & Cross Products, Projections, Lines/Planes in ℝ³, Vector Spaces, Subspaces & Basis)',
      'Chapter 2: Matrices and Determinants (Matrix Operations, Transpose, Trace, RREF, Rank, Inverse, Determinants, Adjoint, Linear Systems & Eigenvalues/Diagonalization)',
      'Chapter 3: Derivatives and Application of Derivatives (Derivative Rules, Implicit, Inverse Trig/Hyperbolic, Extrema, MVT, Concavity, Optimization & L\'Hôpital\'s Rule)',
      'Chapter 4: Integration and Application of Integration (Substitution, By Parts/ILATE, Trig Integrals/Substitution, Partial Fractions, FTC, Improper Integrals, Area & Volume)'
    ],
    defaultChapters: [
      {
        id: 'math2-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: Vectors and Their Applications',
        topics: [
          '1.1 Scalars and Vectors in ℝ² and ℝ³ — Definition of scalar and vector; Component form of vectors in 2D and 3D; Directed line segment representation',
          '1.2 Operations on Vectors — 1.2.1 Vector Addition: Parallelogram rule; 1.2.2 Scalar multiplication: Standard basis vectors (i, j, k), components; 1.2.3 Vector Subtraction: Geometric representation',
          '1.3 Scalar or Dot product of vectors (Definition: a·b = a₁b₁ + a₂b₂ + a₃b₃) & 1.4 Norm of a vector — Magnitude: ||u|| = √(u₁² + u₂² + u₃²); Zero vector, Unit vector, Normalizing a vector; Properties of dot product and magnitude',
          '1.5 Angle between two vectors (u·v = ||u|| ||v|| cos θ; Orthogonal vectors) & 1.6 Projection of Vectors — Projection formula: proj_u A = ((u·A)/||u||²) u; Scalar projection; 1.6.1 Direction angles and direction cosine: cos α = x/r, cos β = y/r, cos γ = z/r; cos²α + cos²β + cos²γ = 1',
          '1.7 Cross Product of Vectors (Definition: a × b = ||a|| ||b|| sin(θ) n̂; Properties: Not commutative, distributive, parallel vectors, orthogonal vectors; Determinant formula) & 1.8 Application of cross and dot product — 1.8.1 Area: Area of parallelogram = ||a × b||, Area of triangle = ½ ||a × b||; 1.8.2 The scalar triple product: a·(b × c) = (a × b)·c; 1.8.3 Volume: Volume of parallelepiped = |c·(a × b)|',
          '1.9 Equation of Lines and planes — Vector equation, Parametric equations, Symmetric equations of a line; Distance from a point to a line; 1.9.1 Equations of Planes in ℝ³: Point-normal form, General form; 1.9.2 The angle between two planes: cos θ = (n₁·n₂)/(||n₁|| ||n₂||); 1.9.3 Distance between Points and a Plane: D = |ax₀ + by₀ + cz₀ - d| / √(a² + b² + c²)',
          '1.10 Vector Space and Subspaces (Definition of vector space: 10 conditions; Examples: ℝ², ℝⁿ, singleton set) & 1.11 Subspace — Definition and Proposition; 1.11.1 Linear Dependence and independence; Basis of a vector space; Linear combination, Spanning set, Basis; Examples, Theorems & Exercises'
        ],
        readings: 'MathsApplied Module — Chapter 1'
      },
      {
        id: 'math2-ch2',
        chapterNumber: 2,
        title: 'Chapter 2: Matrices and Determinants',
        topics: [
          '2.1 Definition and Types of matrix — Definition: Rectangular array of numbers; Size/order, entries, rows, columns; 2.1.1 Types of Matrices: Row matrix, Column matrix, Zero matrix, Square matrix, Diagonal matrix, Scalar matrix, Identity matrix, Upper/Lower triangular matrix, Sub matrix',
          '2.2 Operations on Matrices and their properties (2.2.1 Addition and Subtraction; 2.2.2 Multiplication by Scalar; 2.2.3 Properties) & 2.3 Product of matrices — Definition: (AB)ᵢⱼ = dot product of row i of A and column j of B; 2.3.1 Properties of Matrix Multiplication: Associative, Distributive, Scalar multiplication',
          '2.4 Transpose of a Matrix — Definition: Aᵗ = (aⱼᵢ); Symmetric matrix, Skew symmetric matrix; 2.4.1 Properties: (Aᵗ)ᵗ = A, (A + B)ᵗ = Aᵗ + Bᵗ, (AB)ᵗ = BᵗAᵗ & 2.5 Trace of a Matrix — Definition: Sum of diagonal elements; 2.5.1 Properties: trace(A + B), trace(Aᵗ), trace(cA), trace(AB)',
          '2.6 Elementary Row Operations and Row Echelon form (Interchanging rows, Multiplying row by constant, Adding multiple of one row to another; Row equivalent matrices; Reduced row echelon form: 4 properties) & 2.7 Rank of a matrix (Number of nonzero rows in row echelon form)',
          '2.8 Inverse of a matrix and its properties — Definition: AB = Iₙ and BA = Iₙ; 2.8.1 Computing the Inverse of a Non Singular Matrix: Augmented matrix method; 2.8.2 Properties: Uniqueness, Double inverse, (AB)⁻¹ = B⁻¹A⁻¹, (Aⁿ)⁻¹, (αA)⁻¹, (Aᵗ)⁻¹, Cancellation',
          '2.9 Determinant of a matrix and its properties (Recursive definition; 2.9.1 Properties: Triangular matrix, Row multiplication, Row addition, Invertibility, det(AB), Transpose) & 2.10 Minor of a matrix — Mᵢⱼ(A) = det(Aᵢⱼ); 2.10.1 Cofactor: Cᵢⱼ(A) = (-1)ⁱ⁺ʲ det(Aᵢⱼ); Adjoint: adj(A) = transpose of cofactor matrix; Theorem: A[Adj(A)] = [det(A)]Iₙ',
          '2.11 Solving system of linear equations (Linear equation/system, Coefficient & Augmented matrix, Homogeneous vs. Non-homogeneous, Rank conditions for unique/infinite/no solution; 2.11.1 Cramer\'s rule: xᵢ = |Aᵢ|/|A|; 2.11.2 Gaussian elimination method; 2.11.3 Inverse matrix method: x = A⁻¹b) & 2.12 Eigenvalues and Eigenvectors — Definition: Ax = λx; Characteristic equation: det(A - λIₙ) = 0; Diagonalization: P⁻¹AP is diagonal; Similar matrices, Diagonalizable matrix & Exercise 2.4'
        ],
        readings: 'MathsApplied Module — Chapter 2'
      },
      {
        id: 'math2-ch3',
        chapterNumber: 3,
        title: 'Chapter 3: Derivatives and Application of Derivatives',
        topics: [
          '3.1 Definition of derivatives — f\'(a) = lim(h→0) [f(a+h) - f(a)]/h; Tangent line: y = f\'(a)(x - a) + f(a); 3.1.1 The derivative of a function: f\'(x) = lim(h→0) [f(x+h) - f(x)]/h; Differentiable at a and on an interval; 3.1.2 Derivative of Combination of Functions: Constant, Power Rule, Constant Multiple, Sum, Product, Quotient, Power Rule for Negative Integers, Derivative of Logarithm, Derivative of Natural Exponential, Chain Rule; 3.1.3 Implicit differentiation (3 steps); 3.1.4 Higher order derivatives (f\'\', f\'\'\', f⁽ⁿ⁾); 3.1.5 Rate of Change (Instantaneous rate of change)',
          '3.2 Derivatives of inverse functions — Formula: d/dx [f⁻¹(x)] = 1 / f\'(f⁻¹(x)); 3.2.1 Derivatives of inverse trigonometric functions: sin⁻¹x, cos⁻¹x, tan⁻¹x; 3.2.2 Hyperbolic and inverse hyperbolic functions: Definitions, Identities, Derivatives, Inverse hyperbolic functions',
          '3.3 Application of derivatives — 3.3.1 Extrema of a function: Absolute minimum/maximum, Local maximum/minimum, Extreme Value Theorem; 3.3.2 Mean value theorem: Rolle\'s Theorem, Mean Value Theorem; First and second derivative tests: Critical number, First Derivative Test, Second Derivative Test; 3.3.3 Monotonic Functions: Increasing, Decreasing, First Derivative Test for Monotonic Functions; Concavity and inflection point: Concave upward/downward, Second Derivative Test for Concavity, Inflection point; Strategy for Sketching Graph',
          '3.3.4 Optimization problems — Marginal cost, Average cost, Break even point, Strawberry theorem; Examples: Maximizing revenue, Minimizing average cost',
          '3.4 Indeterminate Forms (L\'Hopital\'s Rule) — Indeterminate form 0/0 and ∞/∞; L\'Hospital\'s Rule: lim(f/g) = lim(f\'/g\'); Indeterminate Products (0·∞); Indeterminate Differences (∞ - ∞); Indeterminate Powers (0⁰, ∞⁰, 1^∞) & Exercise 3.6'
        ],
        readings: 'MathsApplied Module — Chapter 3'
      },
      {
        id: 'math2-ch4',
        chapterNumber: 4,
        title: 'Chapter 4: Integration and Application of Integration',
        topics: [
          '4.1 Anti-derivative: Indefinite integrals (Definition: F\'(x) = f(x); Indefinite integral: ∫f(x)dx = F(x) + C; Examples) & 4.2 Basic Properties of Indefinite Integrals — Constant rule: ∫cf(x)dx = c∫f(x)dx; Sum/Difference rule; Power rule: ∫xⁿdx = xⁿ⁺¹/(n+1) + C for n ≠ -1; Integral of 1/x: ∫dx/x = ln|x| + C; Integral of Exponential function: ∫eˣdx = eˣ + C; Integral of Sine and Cosine: ∫cos(x)dx = sin(x) + C, ∫sin(x)dx = -cos(x) + C',
          '4.3 Techniques of integration — 4.3.1 Integration by substitution (General Substitution Rule, 3 steps); 4.3.2 Integration by parts (∫udv = uv - ∫vdu, ILATE rule); 4.3.3 Trigonometric integrals: Integrals of form ∫sinⁿ(x)cosᵐ(x)dx (6 cases), Integrals of form ∫tanⁿ(x)secᵐ(x)dx (3 cases), Conversion to sine and cosine, Integrals of form ∫sin(ax)cos(bx)dx',
          '4.3.4 Integration by trigonometric substitution — Integrals containing √(a² - x²) (x = a sin θ), √(a² + x²) (x = a tan θ), √(x² - a²) (x = a sec θ), √(ax² + bx + c) (completing the square) & 4.3.5 Partial Fraction Method — 4 cases: Linear factors no repeats, Linear factors repeated, Irreducible quadratic factors, Repeated irreducible quadratic factors',
          '4.4 Fundamental theorem of calculus (Part I: F(x) = ∫ₐˣ f(t)dt → F\'(x) = f(x); Part II: ∫ₐᵇ f(x)dx = F(b) - F(a); Substitution Rule for Definite Integrals) & 4.5 Improper integrals (Type I: Infinite limits of integration; Type II: Discontinuous integrands)',
          '4.6 Applications of Integration — 4.6.1 Area: A = ∫ₐᵇ [f(x) - g(x)]dx; 4.6.2 Volume: Disk Method (V = π∫ₐᵇ y²dx), Volume by Rotating Area Between 2 Curves (V = π∫ₐᵇ [(y₂)² - (y₁)²]dx), Rotation around y-axis (V = π∫_c^d x²dy) & Exercise 4.4'
        ],
        readings: 'MathsApplied Module — Chapter 4'
      }
    ]
  },

  // ==========================================
  // 14. Emerging (7 Chapters)
  // ==========================================
  {
    id: 'emerging',
    code: 'Emerging',
    title: 'Emerging',
    shortTitle: 'Emerging',
    subject: 'emerging_tech',
    semester: 2,
    creditHours: 3,
    category: 'Technology & Wellness',
    overview: 'Comprehensive 7-Chapter Introduction to Emerging Technologies course covering Chapter 1: Introduction to Emerging Technologies (Evolution & Industrial Revolutions IR 1.0 to IR 4.0, Role of Data, Programmable Devices FPGAs/CPLDs/PLDs, Human-Computer Interaction & Future Trends), Chapter 2: Data Science (Data vs. Information, Data Processing Cycle, Programming vs. Analytics Data Types, 5-Stage Data Value Chain & Big Data / Clustered Computing / Hadoop Ecosystem), Chapter 3: Artificial Intelligence (Need/Goals/Compositions/Pros & Cons, History, 7 Levels of AI, Capabilities & Functionality Types, Influencers, Applications & Platforms), Chapter 4: Internet of Things (Overview/History/Pros/Cons/Challenges, 4-Layer Architecture, IoT Tools & Smart Home/City/Farming), Chapter 5: Augmented Reality (VR vs. AR vs. MR, AR System Architecture & Applications in Education, Medicine & Entertainment), Chapter 6: Ethics and Professionalism of Emerging Technologies (Ethical Principles, Professional Responsibilities & Leadership, Digital Privacy, Accountability/Trust & Threats/Challenges), and Chapter 7: Other Emerging Technologies (Nanotechnology, Biotechnology, Blockchain, Cloud & Quantum Computing, Autonomic Computing, Computer Vision, Embedded Systems, Cybersecurity & 3D Printing/Additive Manufacturing).',
    keyTopics: [
      'Chapter 1: Introduction to Emerging Technologies (IR 1.0–4.0, Role of Data, Programmable Devices FPGAs/CPLDs/PLDs, HCI Disciplines & Future Trends)',
      'Chapter 2: Data Science (Data vs. Information, Processing Cycle, Structured/Semi-Structured/Unstructured Data, 5-Step Data Value Chain, Big Data 3Vs+ & Hadoop Ecosystem)',
      'Chapter 3: Artificial Intelligence (7 Levels of AI, Narrow/General/Super AI, Reactive/Limited Memory/Theory of Mind/Self-Awareness, Influencers, Applications & Platforms)',
      'Chapter 4: Internet of Things (IoT) (Kevin Ashton 1999, Pros/Cons/Challenges, 4-Layer Architecture, IoT Platforms & Smart Home/City/Farming)',
      'Chapter 5: Augmented Reality (AR) (VR vs. AR vs. MR, AR Architecture: Tracker/Processing/Visual Units & Applications in Education, Medicine & Entertainment)',
      'Chapter 6: Ethics and Professionalism of Emerging Technologies (General Ethical Principles, Professional Responsibilities & Leadership, Digital Privacy, Accountability & Threats)',
      'Chapter 7: Other Emerging Technologies (Nanotechnology, Biotechnology, Blockchain 3 Pillars, Cloud/Quantum/Autonomic Computing, Computer Vision, Embedded Systems, Cybersecurity & 3D Printing)'
    ],
    defaultChapters: [
      {
        id: 'emte-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: Introduction to Emerging Technologies',
        topics: [
          '1.1 Evolution of Technologies — 1.1.1 Introduction to the Industrial Revolution (IR): Shift from manual tools to machine-powered factories starting in England in the late 1700s; 1.1.2 Most Important Inventions of the IR (Steam engine, railroad, telegraph, telephone, cotton gin, electric lights); 1.1.3 Historical Background: IR 1.0 (Mechanization via water & steam, 1760s), IR 2.0 (Mass production & assembly lines using electricity, 1870s), IR 3.0 (Digital Revolution, computers & automation, late 1950s), IR 4.0 (Cyber-physical systems, IoT, AI, robotics, autonomous vehicles — coined by Klaus Schwab, 2016)',
          '1.2 Role of Data for Emerging Technologies — Data as the "new oil" and strategic asset driving innovation, science, and the economy',
          '1.3 Enabling devices and network (Programmable devices) — 1.3.1 List of some Programmable devices: Memory, microprocessors, logic devices, networks; Examples: FPGAs (Field-Programmable Gate Arrays), CPLDs (Complex Programmable Logic Devices), and PLDs (Programmable Logic Devices)',
          '1.4 Human to Machine Interaction — 1.4.1 Disciplines Contributing to Human-Computer Interaction (HCI): Cognitive psychology, computer science, linguistics, engineering, AI, human factors',
          '1.5 Future Trends in Emerging Technologies — 1.5.1 Emerging technology trends in 2019 (5G, AI, autonomous devices, blockchain, augmented analytics, digital twins, edge computing); 1.5.2 Emerging technologies that will shape the future (Chatbots, VR/AR/MR, Blockchain, Ephemeral Apps, AI)'
        ],
        readings: 'Emerging Module — Chapter 1'
      },
      {
        id: 'emte-ch2',
        chapterNumber: 2,
        title: 'Chapter 2: Data Science',
        topics: [
          '2.1 An Overview of Data Science — Multi-disciplinary field using scientific methods, algorithms, and systems to extract knowledge from data; 2.1.1 What are data and information? (Data = unprocessed facts; Information = processed data with meaning); 2.1.2 Data Processing Cycle: Input -> Processing -> Output',
          '2.3 Data types and their representation — 2.3.1 Data types from Computer programming perspective (Integers, Booleans, Characters, Floating-point numbers, Strings); 2.3.2 Data types from Data Analytics perspective (Structured, Semi-structured, Unstructured data, and Metadata)',
          '2.4 Data Value Chain — 2.4.1 Data Acquisition (Gathering, filtering, cleaning); 2.4.2 Data Analysis (Exploring, transforming, modeling); 2.4.3 Data Curation (Active management for quality); 2.4.4 Data Storage (Scalable persistence and management); 2.4.5 Data Usage (Data-driven business activities)',
          '2.5 Basic concepts of Big Data — 2.5.1 What Is Big Data? Characterized by 3Vs (and more): Volume, Velocity, Variety, Veracity; 2.5.2 Clustered Computing (pooling, high availability, scalability) and Hadoop Ecosystem (HDFS, YARN, MapReduce, Spark, Pig, Hive, HBase); 2.5.3 Big Data Life Cycle with Hadoop: Ingesting, Processing, Analyzing, Visualizing'
        ],
        readings: 'Emerging Module — Chapter 2'
      },
      {
        id: 'emte-ch3',
        chapterNumber: 3,
        title: 'Chapter 3: Artificial Intelligence (AI)',
        topics: [
          '3.1 What is Artificial Intelligence (AI) — Man-made thinking power (reasoning, learning, problem-solving, perception, linguistic intelligence); 3.1.1 Need for AI; 3.1.2 Goals of AI; 3.1.3 What Comprises AI (Math, biology, psychology, sociology, CS, neurons study, statistics); 3.1.4 Advantages of AI; 3.1.5 Disadvantages of AI',
          '3.2 History of AI (Key milestones from 1943 neural networks to Turing 1950, Dartmouth 1956, AI Winters, Deep Blue, AlexNet, AlphaGo & present) & 3.3 Seven Levels of AI — (1) Rule-Based Systems, (2) Context Awareness and Retention, (3) Domain-Specific Expertise, (4) Reasoning Machines, (5) Self-Aware Systems (AGI), (6) Artificial Superintelligence (ASI), (7) Singularity and Transcendence',
          '3.4 Types of AI — 3.4.1 How humans think (Observe -> Interpret -> Make decisions); 3.4.2 Mapping human thinking to AI components (Sensing layer, Interpretation layer, Interacting layer); Based on Capabilities (Narrow/Weak AI, General/Strong AI, Super AI); Based on Functionality (Reactive Machines, Limited Memory, Theory of Mind, Self-Awareness)',
          '3.5 Influencers of AI (3.5.1 Big Data, 3.5.2 Cloud computing & APIs, 3.5.3 Emergence of Data Science), 3.6 Applications of AI (Agriculture, Healthcare, Education, Finance, Gaming, Data Security, Social Media, Travel, Automotive, Robotics, Entertainment), 3.7 AI Tools & Platforms (Azure ML, Google Cloud Prediction API, IBM Watson, TensorFlow) & 3.8 Sample AI Applications (Commuting, Email, Social Networking, Online Shopping, Mobile Use)'
        ],
        readings: 'Emerging Module — Chapter 3'
      },
      {
        id: 'emte-ch4',
        chapterNumber: 4,
        title: 'Chapter 4: Internet of Things (IoT)',
        topics: [
          '4.1 Overview of IoT — 4.1.1 What is IoT? (Network of physical objects with electronics, software, sensors, and connectivity); 4.1.2 History of IoT (From telegraph to RFID, coined by Kevin Ashton in 1999); 4.1.3 Advantages of IoT; 4.1.4 Disadvantages of IoT; 4.1.5 Challenges of IoT (Security, privacy, complexity, flexibility, compliance)',
          '4.2 How does it work? — 4.2.1 Architecture of IoT: 4 Layers (Sensing Layer, Network Layer, Data Processing Layer, Application Layer); 4.2.2 Devices and Networks (Consumer, enterprise, and industrial connected devices)',
          '4.3 IoT Tools and Platforms (KAA, SiteWhere, ThingSpeak, DeviceHive, Zetta, ThingsBoard) & Domain Applications — 4.3.1 IoT Based Smart Home; 4.3.2 IoT Based Smart City; 4.3.3 IoT Based Smart Farming'
        ],
        readings: 'Emerging Module — Chapter 4'
      },
      {
        id: 'emte-ch5',
        chapterNumber: 5,
        title: 'Chapter 5: Augmented Reality (AR)',
        topics: [
          '5.1 Overview of Augmented Reality (Combines real environment with virtual digital content) & 5.2 Virtual Reality (VR), Augmented Reality (AR) vs. Mixed Reality (MR) — 5.2.1 VR (Fully immersive computer-generated world); 5.2.2 AR (Overlays digital content on the real world); 5.2.3 MR (Merging real and virtual worlds where physical and digital objects co-exist and interact in real time)',
          '5.3 The Architecture of AR Systems — Three core blocks: (1) Infrastructure Tracker Unit, (2) Processing Unit, and (3) Visual Unit (Video see-through vs. Optical see-through displays)',
          '5.4 Applications of AR Systems — 5.4.1 AR in Education (Affordable materials, interactive 3D lessons, higher engagement); 5.4.2 AR in Medicine (Surgery, diagnostics, nursing care, vein visualization/ultrasounds, diabetes management, navigation); 5.4.3 AR in Entertainment (Games like Pokémon GO, music, TV, eSports, theater)'
        ],
        readings: 'Emerging Module — Chapter 5'
      },
      {
        id: 'emte-ch6',
        chapterNumber: 6,
        title: 'Chapter 6: Ethics and Professionalism of Emerging Technologies',
        topics: [
          '6.1 Technology and Ethics & 6.2 New Ethical Questions — 6.2.1 General Ethical Principles (Contribute to society, avoid harm, be honest, be fair/non-discriminatory, respect work/IP, respect privacy, honor confidentiality); 6.2.2 Professional Responsibilities (9 duties); 6.2.3 Professional Leadership Principles (7 duties)',
          '6.3 Digital Privacy — 6.3.1 Information Privacy; 6.3.2 Communication Privacy; 6.3.3 Individual Privacy; 6.3.4 Digital Privacy Principles (Data minimization, transparency, accuracy, security)',
          '6.4 Accountability and Trust & 6.5 Threats and Challenges — 6.5.1 Ethical and regulatory challenges in AI, Robotics, IoT, and Big Data; 6.5.2 Specific threats in driverless cars, wearables, drones, and IoT'
        ],
        readings: 'Emerging Module — Chapter 6'
      },
      {
        id: 'emte-ch7',
        chapterNumber: 7,
        title: 'Chapter 7: Other Emerging Technologies',
        topics: [
          '7.1 Nanotechnology (7.1.1 Richard Feynman 1959; 7.1.2 Nanoscale 1–100 nm & properties; 7.1.3 Applications in medicine, electronics, food, agriculture, vehicles) & 7.2 Biotechnology (7.2.1 History: Edward Jenner, Alexander Fleming, Karl Ereky; 7.2.2 Applications in agriculture, medicine, aquaculture, bioremediation)',
          '7.3 Blockchain Technology — 7.3.1 History (Stuart Haber & W. Scott Stornetta 1991, Satoshi Nakamoto 2008); 7.3.2 Blockchain Explained; 7.3.3 The Three Pillars of Blockchain (Decentralization, Transparency, Immutability); 7.3.4 How Blockchain Works; 7.3.5 Peer-to-Peer (P2P) Network; 7.3.6 Applications (Sharing economy, crowdfunding, governance, supply chain auditing, file storage)',
          '7.4 Cloud and Quantum Computing (7.4.1 Public/Private/Hybrid Clouds & IaaS, PaaS, SaaS; 7.4.2 Cloud advantages; 7.4.3 Quantum computing: Qubits & superposition; 7.4.4 Quantum advantages) & 7.5 Autonomic Computing (AC) (7.5.1 Eight Self-CHOP/Characteristics: Self-awareness, Self-configuring, Self-optimizing, Self-healing, Self-protecting, Context-aware, Open, Anticipatory)',
          '7.6 Computer Vision (7.6.1 MIT 1966; 7.6.2 Definition; 7.6.3 Acquiring -> Processing -> Understanding; 7.6.4 Applications: OCR, machine inspection, retail, medical imaging, automotive safety, surveillance) & 7.7 Embedded Systems (7.7.1 Pros & cons; 7.7.2 Basic Structure: Sensor -> A-D Converter -> Processor & ASICs -> D-A Converter -> Actuator)',
          '7.8 Cybersecurity (7.8.1 Definition; 7.8.2 Measures; 7.8.3 Threats: Ransomware, Malware, Social engineering, Phishing; 7.8.4 Benefits; 7.8.5 Vendors: Cisco, McAfee, Trend Micro) & 7.9 Additive Manufacturing (3D Printing: 7.9.1 3D Printing; 7.9.2 A Bytes-to-Parts Supply Chain)'
        ],
        readings: 'Emerging Module — Chapter 7'
      }
    ]
  },

  // ==========================================
  // 15. MathsSco (4 Chapters)
  // ==========================================
  {
    id: 'maths_sco',
    code: 'MathsSco',
    title: 'MathsSco',
    shortTitle: 'MathsSco',
    subject: 'math_social',
    semester: 1,
    creditHours: 3,
    category: 'Social & Humanities',
    overview: 'Comprehensive 4-Chapter Mathematics for Social Sciences course covering Chapter 1: Propositional Logic and Set Theory (propositions, logical connectives, compound propositions, tautology & contradiction, laws of logic, open propositions & quantifiers, arguments & validity, rules of inference, set theory & Venn diagrams), Chapter 2: Functions (real number system, linear & quadratic equations/inequalities, relations & functions, operations & composition, injective/surjective/bijective & inverse functions, polynomials, theorems & rational functions, exponential, logarithmic & trigonometric functions), Chapter 3: Matrices, Determinant and Systems of Linear Equations (matrices & matrix algebra, types of matrices, elementary row operations, REF/RREF, rank, determinants, adjoint & inverse, Gaussian elimination, Cramer\'s rule & inverse method), and Chapter 4: Introduction to Calculus (limits, asymptotes, continuity & IVT, derivatives & differentiation rules, extrema, monotonicity, curve sketching & related rates, indefinite/definite integrals, integration techniques & area between curves).',
    keyTopics: [
      'Chapter 1: Propositional Logic and Set Theory (Connectives, Truth Tables, Tautology/Contradiction, Quantifiers, Argument Validity & Set Operations)',
      'Chapter 2: Functions (Real Numbers, Linear/Quadratic Equations & Inequalities, Injective/Surjective/Bijective, Polynomials, Rational, Exponential, Log & Trig Functions)',
      'Chapter 3: Matrices, Determinant and Systems of Linear Equation (Matrix Algebra, Elementary Row Operations, REF/RREF, Rank, Determinants, Adjoint/Inverse, Gaussian Elimination & Cramer\'s Rule)',
      'Chapter 4: Introduction to Calculus (Limits & Continuity, Differentiation Rules, Extrema, Monotonicity, Curve Sketching, Related Rates, Integration Techniques & Area Bounded by Curves)'
    ],
    defaultChapters: [
      {
        id: 'msco-ch1',
        chapterNumber: 1,
        title: 'Chapter 1: Propositional Logic and Set Theory',
        topics: [
          '1.1 Propositional Logic — 1.1.1 Definition and examples of Propositions (Declarative sentence that is either true [T] or false [F], but not both; questions, commands, and exclamations are not propositions); 1.1.2 Logical connectives: Conjunction (∧: "p and q", true only when both p and q are true), Disjunction (∨: "p or q" inclusive, false only when both p and q are false), Implication (⇒: "If p, then q", false only when p is true and q is false; p = hypothesis/antecedent, q = conclusion/consequent), Bi-implication (⇔: "p if and only if q", true when p and q have the same truth values), Negation (¬: "not p", reverses truth value); 1.1.3 Compound (or complex) proposition & Truth tables; 1.1.4 Tautology (always true), Contradiction (always false), Logical equivalence (P ≡ Q means P ⇔ Q is a tautology), and Laws of Logic (Idempotent, Commutative, Associative, Distributive, De Morgan\'s, Contrapositive, Complement)',
          '1.2 Open propositions and quantifiers — Open Proposition (Predicate): Sentence with variables whose truth depends on values assigned (e.g., P(x): x > 5); Universal Quantifier (∀: "For every x" / "For all x"); Existential Quantifier (∃: "There exists an x" / "For some x"); Negation of Quantifiers: ¬(∀x)P(x) ≡ (∃x)¬P(x) and ¬(∃x)P(x) ≡ (∀x)¬P(x)',
          '1.3 Arguments and Validity — Argument (Set of premises yielding a conclusion); Valid Argument (Conclusion is true whenever all premises are true, equivalent to [(p₁ ∧ p₂ ∧ ... ∧ pₙ) ⇒ Q] being a tautology); Rules of Inference (Modus Ponens, Modus Tollens, Principle of Syllogism, Principle of Adjunction, Principle of Detachment)',
          '1.4 Set Theory — 1.4.1 The Concept of a set (Well-defined collection of objects); 1.4.2 Description of sets (Verbal, Roster/Complete Listing, Partial Listing, Set-builder methods; subset, proper subset, equal sets, power set, universal set); 1.4.3 Set operations and Venn diagrams: Union (∪), Intersection (∩), Difference (-), Complement (\'), Symmetric Difference (Δ)'
        ],
        readings: 'MathsSco Module — Chapter 1'
      },
      {
        id: 'msco-ch2',
        chapterNumber: 2,
        title: 'Chapter 2: Functions',
        topics: [
          '2.1 The real number system (Natural numbers ℕ, Integers ℤ, Rational numbers ℚ, Irrational numbers, Real numbers ℝ; Commutative, associative, distributive, inverse properties; Order relations and intervals) & 2.2 Solving equations and inequalities (Linear Equations ax + b = 0; Linear Inequalities; Quadratic Equations ax² + bx + c = 0 via Factoring, Completing the Square, Quadratic Formula; Quadratic Inequalities using sign analysis with cut points)',
          '2.3 Review of relations and functions (Cartesian Product A × B = {(a,b) : a ∈ A, b ∈ B}; Relation as subset of A × B, Domain and Range; Function mapping each domain element to exactly one range element) & 2.4 Real valued functions and their properties (Sum, Difference, Product, Quotient, Composition f∘g, Equality of functions)',
          '2.5 Types of functions and inverse of a function — One-to-One / Injective (f(x₁) = f(x₂) ⇒ x₁ = x₂), Onto / Surjective (Range(f) = Codomain), 1-1 Correspondence / Bijective (both one-to-one and onto), Inverse of a function f⁻¹(x) (only one-to-one functions have inverses)',
          '2.6 Polynomials, zeros of polynomials, rational functions and their graphs (Linear, Quadratic, Cubic polynomials; Division Algorithm, Remainder Theorem, Factor Theorem, Location Theorem, Fundamental Theorem of Algebra; Rational Functions: Vertical Asymptotes [VA], Horizontal Asymptotes [HA], Oblique Asymptotes [OA])',
          '2.7 Definition and basic properties of logarithmic, exponential, trigonometric functions and their graphs — Exponents and Radicals; Exponential Functions y = bˣ (growth and decay); Logarithmic Functions y = log_b x (inverse of exponential, properties, common log base 10, natural log base e); Trigonometric Functions (Degrees and radians, sin/cos/tan definitions and graphs, periodic functions, amplitude, frequency)'
        ],
        readings: 'MathsSco Module — Chapter 2'
      },
      {
        id: 'msco-ch3',
        chapterNumber: 3,
        title: 'Chapter 3: Matrices, Determinant and Systems of Linear Equation',
        topics: [
          '3.1 Definition of a matrix (Matrix, size m × n, entries, row vector, column vector, submatrix, equality of matrices, zero matrix), 3.2 Matrix Algebra (3.2.1 Addition and Scalar Multiplication laws; 3.2.2 Matrix Multiplication definition and non-commutativity) & 3.3 Types of matrices (Square, Identity, Diagonal, Scalar, Upper/Lower Triangular, Transpose, Symmetric)',
          '3.4 Elementary row operations (Interchanging rows Rᵢ ↔ Rⱼ, Scaling Rᵢ → αRᵢ, Replacement Rᵢ → Rᵢ + αRⱼ; Row equivalent matrices), 3.5 Row echelon form (REF) and reduced row echelon form (RREF) (Pivot positions) & 3.6 Rank of a matrix using elementary row operations (Number of nonzero rows in RREF)',
          '3.7 Determinant and its properties (Determinants of 2×2 and 3×3 matrices, Minors and Cofactors, Cofactor expansion for n×n matrices, Properties of determinants) & 3.8 Adjoint and inverse of a matrix (Adjoint = transpose of cofactor matrix; A⁻¹ = (1/det(A)) Adj(A); Computation using Gauss-Jordan Elimination)',
          '3.9 System of linear equations — Matrix form (Ax = b), Consistent vs. Inconsistent systems; 3.9.1 Gaussian elimination (Row reduction to solve systems); 3.9.2 Cramer\'s rule (Using determinants to solve systems with unique solutions); 3.9.3 Inverse method (x = A⁻¹b)'
        ],
        readings: 'MathsSco Module — Chapter 3'
      },
      {
        id: 'msco-ch4',
        chapterNumber: 4,
        title: 'Chapter 4: Introduction to Calculus',
        topics: [
          '4.1 Limit and continuity — Intuitive concept, one-sided limits, existence of limit, basic limit theorems, Squeeze Theorem, trigonometric limits; Infinite Limits and Limits at Infinity (Vertical, Horizontal, and Oblique Asymptotes); Continuity (Definition, conditions, properties); Intermediate Value Theorem (IVT) and finding roots of equations',
          '4.2 Derivatives — Definition as limit of difference quotient f\'(c) = lim (f(x)-f(c))/(x-c); Rules of Differentiation (Constant, Power, Sum/Difference, Product, Quotient, Chain Rule); Derivatives of Trigonometric, Logarithmic, and Exponential Functions; Higher Derivatives (Second, third, ..., nth derivatives)',
          '4.3 Application of derivative — Extrema of a Function (Maximum and minimum values, critical points); Monotonic Functions (Increasing/decreasing intervals); First and Second Derivative Tests for Relative Extrema; Curve Sketching (Domain, intercepts, asymptotes, monotonicity, extrema); Related Rates (Velocity, acceleration, rates of change)',
          '4.4 Integrals and their applications — Indefinite Integral (Anti-derivative: definition and properties); Techniques of Integration (Integration by Substitution, Integration by Parts, Integration by Partial Fractions); Definite Integral (Riemann sums, Fundamental Theorem of Calculus); Application of Definite Integral: Finding areas of regions bounded by curves'
        ],
        readings: 'MathsSco Module — Chapter 4'
      }
    ]
  },

  // ==========================================
  // 16. English1 (5 Units)
  // ==========================================
  {
    id: 'english1',
    code: 'English1',
    title: 'English1',
    shortTitle: 'English1',
    subject: 'english',
    semester: 1,
    creditHours: 3,
    category: 'Common Competency',
    overview: 'Comprehensive 5-Unit Communicative English Language Skills I course covering Unit 1: Study Skills (lecture listening & note-taking, modals/infinitives for giving advice, reading for study, present perfect vs. past simple), Unit 2: Health and Fitness (Zinedine Zidane listening, Type I/II/III conditionals, health & fitness reading, guessing meaning from context), Unit 3: Cultural Values (cultural tourism listening, tenses in contrast: present simple, past simple, present perfect, past perfect, grammar learning strategies, The Awramba community reading), Unit 4: Wild Animals (human-wildlife interaction listening, Africa\'s wild animals reading, denotative & connotative meanings, conditionals revised), and Unit 5: Population (population density listening, population pyramid reading, collocations of population & high-frequency verbs, active and passive voice).',
    keyTopics: [
      'Unit 1: Study Skills (Lecture Note-Taking, Modals/Infinitives for Advice: should/ought to/had better, Reading for Study: Skim/Scan & Present Perfect Tense)',
      'Unit 2: Health and Fitness (Zinedine Zidane Listening, Conditionals Type I, II & III, Health & Fitness Reading & Guessing Meaning from Context)',
      'Unit 3: Cultural Values (Cultural Tourism Listening, Tenses in Contrast: Present/Past Simple & Present/Past Perfect, Grammar Strategies & The Awramba Community)',
      'Unit 4: Wild Animals (Human-Wildlife Interaction, Africa\'s Wild Animals, Denotative vs. Connotative Meanings & Conditionals Revised)',
      'Unit 5: Population (Population Density Listening, Population Pyramid Reading, Collocations of Population & Active/Passive Voice)'
    ],
    defaultChapters: [
      {
        id: 'eng1-ch1',
        chapterNumber: 1,
        title: 'Unit 1: Study Skills',
        topics: [
          'Unit Introduction & Objectives: Find out what is involved in a lecture; take lecture notes; give advice using appropriate language; identify purposes for reading; read and make notes; use present perfect tense; write a reflective paragraph; expand vocabulary; self-assess progress',
          '1.1 Listening: What is a lecture? — Activity 1.1.1: Study habits checklist (10 habits of highly effective students); Activity 1.1.2: Pre-listening (What is a lecture? Who gives it? Vocabulary: transient, distractions, verbatim, cues, discriminating); Activity 1.1.3: While-listening (Matching what you do with purposes; note-taking tips; comprehension questions); Activity 1.1.4: Post-listening (Write a 100-word paragraph on problems faced when listening to lectures)',
          '1.2 Grammar focus: Modals and infinitives for giving advice — Activity 1.2.1: Sentence completion (should / ought to / had better); Activity 1.2.2: Completing short dialogues (10 situations for giving advice)',
          '1.3 Reading: Reading for study — Activity 1.3.1: Preparing for reading (What is reading? Vocabulary: invaluable, scan, skim, assimilate, repertoire); Activity 1.3.2: Reading for understanding (Text: "Reading for Study"; comprehension questions; True/False; reference words; guessing meanings; guided summary); Activity 1.2.3: Post-reading (Write a 150-200 word paragraph on reading experience)',
          '1.4 Grammar focus: Present perfect tense — Activity 1.4.1: Discussion (What we have done so far in this unit); Activity 1.4.2: Completing sentences (Present perfect vs. past simple)',
          '1.5 Reflections (4 questions), 1.6 Self-assessment (7 Can you...? items) & 1.7 Summary'
        ],
        readings: 'English1 Module — Unit 1'
      },
      {
        id: 'eng1-ch2',
        chapterNumber: 2,
        title: 'Unit 2: Health and Fitness',
        topics: [
          'Unit Introduction & Objectives: Listen and take notes from a story; read and identify main ideas; write a paragraph on health and fitness lessons; use conditional sentences; guess meanings from context; discuss health and fitness; reflect and self-assess',
          '2.1 Listening: Zinedine Zidane — Activity 2.1.1: Pre-listening (Vocabulary: career, profession, professional; describe a sportsman; discuss a picture of Zidane); Activity 2.1.2: While-listening (Note-taking; complete table: full name, date/place of birth, known for, playing position, played for, Real Madrid fee, games won, special points); Activity 2.1.3: Post-listening (WH-questions; sports activities discussion; vocabulary: jog/jogged/jogging)',
          '2.2 Grammar focus: Conditionals — Study questions with Derartu Tulu and Zinedine Zidane; Table for writing sentences (Type I, II, III); Teacher\'s lecture on conditional sentences; Dialogues 1-4: Circle correct words in parentheses; Question: What would you do if you were the mother?',
          '2.3 Reading: Health and fitness — Activity 2.3.1: Pre-reading (Benefits of sports; how sports improve health); Activity 2.3.2: While-reading (Find main idea of each paragraph; comprehension questions; reference words; True/False; discussion); Activity 2.3.3: Post-reading (Write a paragraph on lessons learned from the text)',
          '2.4 Vocabulary: Guessing meaning from context — Activity 2.4.1: Find words with given meanings (regular, value given for sport, a number of)',
          '2.5 Reflections (3 questions), 2.6 Self-assessment (7 Can you...? items) & 2.7 Summary'
        ],
        readings: 'English1 Module — Unit 2'
      },
      {
        id: 'eng1-ch3',
        chapterNumber: 3,
        title: 'Unit 3: Cultural Values',
        topics: [
          'Unit Introduction & Objectives: Listen and identify specific information; make notes; write a summary from notes; revise a paragraph using peer feedback; read and answer comprehension questions; work out meanings from context; use simple present, simple past, present perfect, and past perfect tenses; develop grammar learning strategies; converse about culture; reflect and self-assess',
          '3.1 Listening: Cultural tourism — Activity 3.1.1: Defining culture and cultural values (Write definition; list characteristics; class discussion; list 3-5 Ethiopian cultural values); Activity 3.1.2: Pre-listening (Discuss picture; questions about cultural attractions; vocabulary: the Grand Tour, advance guards; fill in blanks in sentences); Activity 3.1.3: While-listening (Complete table; True/False with evidence); Activity 3.1.4: Post-listening (Write a 100-word paragraph on benefits and dangers of cultural tourism; peer feedback)',
          '3.2 Grammar focus: Tenses in contrast — Activity 3.2.1: Tenses in context (Read article "No Shortage of Lip in the Mursi Tribe"; identify verbs and classify into present simple, past simple, present perfect, past perfect); Activity 3.2.2: Uses of tenses (Match tense to use; identify use in sentences; complete blanks with correct verb forms); Activity 3.2.3: Using tenses in writing (Write a 100-word paragraph on first day on campus using four tenses)',
          '3.3 Strategies for improving English grammar knowledge — Activity 3.3.1: Identifying a strategy (Order strategies from most to least effective; tick strategies to use in future)',
          '3.4 Reading: The Awramba community — Activity 3.4.1: Pre-reading (Discuss cultural values; picture discussion); Activity 3.4.2: While-reading (True/False with evidence; comprehension questions; find words with given meanings; match topic to paragraph); Activity 3.4.3: Post-reading (Write a 120-word paragraph on cultural values you are proud of)',
          '3.5 Reflections (6 questions), 3.6 Self-assessment (13 statements on 5-point scale) & 3.7 Summary'
        ],
        readings: 'English1 Module — Unit 3'
      },
      {
        id: 'eng1-ch4',
        chapterNumber: 4,
        title: 'Unit 4: Wild Animals',
        topics: [
          'Unit Introduction & Objectives: Interact based on background knowledge; listen and take notes; predict content; make notes while reading; explain and use denotative/connotative meanings; interact using notes and answers; reflect on learning',
          '4.1 Listening: Human-wildlife interaction — Activity 4.1.1: Discussing pictures of wildlife (Three pictures: describe what is happening, why, positive/negative interaction, what should be done); Activity 4.1.2: While-listening (Complete notes: human interactions with wildlife; reasons for competition; approaches to minimize conflict; effects of conflict; positive effects of advances; future research areas); Activity 4.1.3: Follow-up activity (Writer\'s information type: persuasive/statistical/factual/subjective; text source)',
          '4.2 Reading: Africa\'s wild animals — Activity 4.2.1: Brainstorming (Name wild animals in Ethiopia; how Africa benefits from wildlife; predict from pictures); Activity 4.2.2: Reading comprehension (Text: "Africa\'s Wild Animals" with sections on geography, lemurs, mountain gorillas, forest elephants, chimpanzees; match titles to paragraphs; comprehension questions; True/False; fill in missing words; match words to definitions; write a paragraph on attracting tourists)',
          '4.3 Vocabulary: Denotative and connotative meanings — Activity 4.3.1: Understanding connotative meanings (Table of words: unique, mother, childish, skinny, economical, questioning, group, clique, snake, elated, adolescent — indicate positive/negative/neutral connotation and possible meaning)',
          '4.4 Grammar focus: Conditionals revised — Activity 4.4.1: Using conditionals (Write conditional sentences based on Ethiopian National Parks table; complete table for Type I, II, III conditionals; discussion; focus on form, use, meaning)',
          '4.5 Reflections (3 questions), 4.6 Self-assessment (7 Can you...? items) & 4.7 Summary'
        ],
        readings: 'English1 Module — Unit 4'
      },
      {
        id: 'eng1-ch5',
        chapterNumber: 5,
        title: 'Unit 5: Population',
        topics: [
          'Unit Introduction & Objectives: Predict content of a listening text; read and summarize an article; write relevant notes; interact using notes, summaries, and answers; use collocations of \'population\'; construct active and passive sentences; reflect on task relevance; self-assess progress',
          '5.1 Listening: Population density — Activity 5.1.1: Pre-listening (Picture discussion; crowded vs. sparsely populated; definitions of population, dense, density, population density; predict content); Activity 5.1.2: While-listening (Complete notes: meaning of population density; geographical term; definition; effects of low density; calculation; True/False; guess meaning of \'inhospitable\'); Activity 5.1.3: Post-listening (Write a 4-7 line paragraph agreeing/disagreeing with writer on world population worries)',
          '5.2 Reading: Population pyramid — Activity 5.2.1: Pre-reading (Identify pyramid structures; guess meaning of \'population pyramid\'; discussion questions about age groups); Activity 5.2.2: While-reading (Text: "Population Pyramid" with South Korea graph; complete table with main ideas; comprehension questions; reference words; summarize paragraph 5 in 3-5 sentences); Activity 5.2.3: Post-reading (Write a paragraph interpreting data from table of Five Most Populous Cities in Africa)',
          '5.3 Vocabulary: Collocation — Activity 5.3.1: Identifying collocations of \'population\' (Find words that co-occur with \'population\' in the text; complete figure; discussion of saying; table of collocations with have, do, make, take, break, catch, pay, save, keep, come, go, get)',
          '5.4 Grammar focus: Voice — Activity 5.4.1: Active and passive constructions (Study sentences from text; identify subject performing/acted upon; active vs. passive; examples with giraffes; rules for forming passive; change active to passive and passive to active)',
          '5.5 Reflections (2 questions), 5.6 Self-assessment (6 Are you able to...? items), 5.7 Summary, References & Sources consulted'
        ],
        readings: 'English1 Module — Unit 5'
      }
    ]
  },

  // ==========================================
  // 17. Physics (7 Chapters)
  // ==========================================
  {
    id: 'physics',
    code: 'Physics',
    title: 'Physics',
    shortTitle: 'Physics',
    subject: 'physics',
    semester: 1,
    creditHours: 3,
    category: 'Natural Science Core',
    overview: 'Comprehensive 7-Chapter General Physics course covering preliminaries (physical quantities, SI units, uncertainty, vectors), kinematics and dynamics of particles (1D/2D motion, Newton\'s laws, planetary motion, work, energy, momentum), fluid mechanics (elasticity, hydrostatics, Archimedes\' & Bernoulli\'s principles), heat and thermodynamics, oscillations, waves and optics, electromagnetism and electronics (fields, circuits, induction, semiconductors, diodes, transistors, logic gates), and cross-cutting applications of physics in agriculture, industry, medicine, archaeology, earth/space sciences, and power generation.',
    keyTopics: [
      'Chapter 1: Preliminaries (Physical Quantities, SI Units, Uncertainty, Significant Digits, Vectors & Unit Vectors)',
      'Chapter 2: Kinematics and Dynamics of Particles (1D/2D Kinematics, Newton\'s Laws, Gravitation, Kepler\'s Laws, Work, Energy & Momentum)',
      'Chapter 3: Fluid Mechanics (Bulk Matter Elasticity, Stress/Strain Moduli, Static Fluid Pressure, Pascal\'s, Archimedes\' & Bernoulli\'s Principles)',
      'Chapter 4: Heat and Thermodynamics (Zeroth Law, Thermal Expansion, Specific/Latent Heat, Heat Transfer & First Law of Thermodynamics)',
      'Chapter 5: Oscillations, Waves and Optics (Simple Harmonic Motion, Simple Pendulum, Wave Characteristics, Resonance, Doppler Effect & Thin Lenses/Mirrors)',
      'Chapter 6: Electromagnetism and Electronics (Coulomb\'s Law, Electric Potential, Ohm\'s Law, Kirchhoff\'s Rules, Magnetic Induction, Semiconductors, Diodes, Transistors & Logic Gates)',
      'Chapter 7: Cross Cutting Applications of Physics (Agrophysics/Soil Physics, Motors/Generators, Medical Imaging, Radiocarbon Dating, Seismometer/Telecom & Power Generation)'
    ],
    defaultChapters: [
      {
        id: 'phys-ch1',
        chapterNumber: 1,
        title: 'CHAPTER ONE: PRELIMINARIES',
        topics: [
          'Learning Objectives: Explain physics, describe SI base units, derived units, metric prefixes, relationships among models/theories/laws, units, prefixes, unit conversion, uncertainty, and significant figures',
          '1.1. Physical Quantities and Measurement — 1.1.1. Physical quantities: Basic (length, mass, time) and Derived (area, volume, density); 1.1.2. SI Units: Basic and Derived Units (Table 1.1 & Table 1.2); 1.1.3. Conversion of Units (Table 1.3 & Examples)',
          '1.2. Uncertainty in Measurement and Significant Digits — Systematic Error, Random Errors; Uncertainty in scale and digital measuring devices; 1.2.1. Significant digits: Rules for significant digits',
          '1.3. Vectors: composition and resolution — 1.3.1. Vector Representation: Algebraic Method, Geometric Method; 1.3.2. Vector Addition: Graphical method, Parallelogram law of vector addition (Cosine law, Sine law); 1.3.3. Components of Vector (x, y, z components, direction of cosines)',
          '1.4. Unit Vector — 1.4.1. Vector addition in Unit Vector Notation; 1.4.2. Finding a Unit Vector',
          'Chapter Summary & Review Questions'
        ],
        readings: 'Physics Module — Chapter 1'
      },
      {
        id: 'phys-ch2',
        chapterNumber: 2,
        title: 'CHAPTER TWO: KINEMATICS AND DYNAMICS OF PARTICLES',
        topics: [
          'Learning Objectives: Understand motion of a particle, interaction with force, relationship between force and work done',
          '2.1. Kinematics in One and Two Dimensions — 2.1.1. Displacement, velocity and Acceleration in 1D and 2D (Position, Displacement, Distance, Average and Instantaneous Velocities, Average and Instantaneous Accelerations); 2.1.2. Motion with Constant Acceleration (Equations 2.1.7 - 2.1.10); 2.1.3. Free Fall Motion (g = 9.8 m/s²); 2.1.4. Projectile Motion (Horizontal Range, Maximum Height)',
          '2.2. Particle Dynamics and Planetary Motion — 2.2.1. The Concept of Force as A Measure of Interaction (Four basic forces); 2.2.2. Type of Forces: Contact Force (Muscular, Frictional, Applied, Tension, Spring, Air Resisting) & Non-Contact Force (Gravitational, Magnetic, Electrostatic); 2.2.3. Newton\'s Laws of Motion and Applications (First Law: Law of Inertia; Second Law: F = ma; Third Law: Action and Reaction; Forces of Friction: Static, Kinetic); 2.2.4. Uniform Circular Motion (Centripetal acceleration, Period); 2.2.5. Newton\'s Law of Universal Gravitation (F = GmM/r²); 2.2.6. Kepler\'s Laws, Satellites Motion and Weightlessness (First Law: Law of Orbits; Second Law: Law of Areas; Third Law: Law of Harmony)',
          '2.3. Work, Energy and Linear Momentum — 2.3.1. Work and Energy (Work-Energy theorem, Kinetic Energy, Potential Energy, Conservation of Mechanical Energy); 2.3.2. Power (P = W/t = Fv); 2.3.3. Linear Momentum (P = mv, Impulse, Conservation of Linear Momentum); 2.3.4. Collisions (Elastic, Inelastic, Perfectly Inelastic); 2.3.5. Center of Mass',
          'Chapter Summary & Review Questions'
        ],
        readings: 'Physics Module — Chapter 2'
      },
      {
        id: 'phys-ch3',
        chapterNumber: 3,
        title: 'CHAPTER THREE: FLUID MECHANICS',
        topics: [
          'Learning Objectives: Distinguish elastic and plastic materials, define stresses/strains/moduli, calculate density/pressure, state Pascal\'s and Archimedes\' principles, explain continuity and Bernoulli\'s equations',
          '3.1. Properties of Bulk Matter — Elastic materials, Elastic deformation, Plastic deformation; Stress (Tensile, Shear, Volume) and Strain (Tensile, Shear, Volume); Elasticity Moduli: Young\'s Modulus (Y), Shear Modulus (S), Bulk Modulus (B); Strain Energy; Table 3.1: Typical Values for Elastic Moduli',
          '3.2. Density and Pressure in Static Fluids — Density (ρ = m/V), Specific gravity (SG); Pressure (P = F/A), Fluid pressure (P = ρgh); Atmospheric Pressure, Gauge pressure, Absolute Pressure',
          '3.3. Buoyant Force and Archimedes\' Principles — Pascal\'s Principle (Hydraulic press); 3.3.1. Archimedes\' principle (F_buoyant = W_fluid = ρ_fluid * V_displaced * g)',
          '3.4. Moving Fluids and Bernoulli Equations (Fluid Dynamics) — Equation of Continuity (Av = constant); 3.4.1. Bernoulli\'s Equation (P + ½ρv² + ρgy = constant)',
          'Chapter Summary & Review Questions'
        ],
        readings: 'Physics Module — Chapter 3'
      },
      {
        id: 'phys-ch4',
        chapterNumber: 4,
        title: 'CHAPTER FOUR: HEAT AND THERMODYNAMICS',
        topics: [
          'Learning Objectives: State Zeroth law, distinguish heat and temperature, convert temperature scales, explain work/heat/internal energy, define specific/latent heat, define thermal expansion, explain heat transfer mechanisms, explain First law',
          '4.1. The concept of Temperature and the Zeroth law of Thermodynamics — Heat, Thermal equilibrium; Zeroth law of thermodynamics; Temperature Scales (Celsius, Fahrenheit, Kelvin); Table 4.1: Temperature Conversions',
          '4.2. Thermal Expansion — Linear Thermal Expansion (Δl = αl₀ΔT); Table 4.2: Coefficients of thermal expansion; Areal Expansion (ΔA = βA₀ΔT); Volume Expansion (ΔV = γV₀ΔT); Table 4.3: Coefficients of volume expansion',
          '4.3. The Concept of Heat, Work and Internal Energy — Heat (Q), Work (W), Internal Energy (U)',
          '4.4. Specific Heat and Latent Heat — Specific Heats (Q = mcΔT); Latent Heats (Q_L = ±mL); Table 4.4: Specific Heats of Substances; Types of Latent Heat Transfer: Latent Heat of Fusion (Lf), Latent Heat of Vaporization (Lv); Table 4.5: Specific latent heat of fusion and vaporization',
          '4.5. Heat Transfer Mechanisms — Conduction, Convection, Radiation, Direct Burning, Water as an Extinguishing Agent',
          '4.6. The First Law of Thermodynamics — ΔU = Q + W; First Law for different thermodynamic systems: Isolated system, Cyclic Process, Isochoric process, Adiabatic Process, Isothermal Process, Isobaric process',
          'Chapter Summary & Review Questions'
        ],
        readings: 'Physics Module — Chapter 4'
      },
      {
        id: 'phys-ch5',
        chapterNumber: 5,
        title: 'CHAPTER FIVE: OSCILLATIONS, WAVES AND OPTICS',
        topics: [
          'Learning Objectives: Discuss systems that oscillate with SHM, explain concept of wave, describe wave motion and derive wave equation, state Doppler Effect',
          '5.1. Simple Harmonic Motion — 5.1.1. Periodic and Oscillatory Motion (Period, Frequency, Amplitude); 5.1.2. Displacement, Velocity and Acceleration in a SHM (x = A sin(ωt), V = ωA cos(ωt), a = -ω²x); Energy of the Simple Harmonic Oscillator',
          '5.2. The simple Pendulum — T = 2π√(L/g)',
          '5.3. Wave and Its Characteristics — Terminologies: Crests/Troughs, Amplitude, Displacement, Wavelength, Period, Frequency, Speed (v = λf); Types of waves: Mechanical, Electromagnetic; Transverse, Longitudinal',
          '5.4. Resonance — Definition, Examples',
          '5.5. The Doppler Effect — f_o = f_s (v ± v_o)/(v ∓ v_s); Characteristics of Waves: Reflection, Refraction, Diffraction, Interference',
          '5.6. Image Formation by Thin Lenses and Mirrors — 5.6.1. Images Formed by plane Mirrors (Virtual image); 5.6.2. Images formed by Lenses: Convex (Converging), Concave (Diverging); Lens equation: 1/s_o + 1/s_i = 1/f; Magnification: m = h_i/h_o = -s_i/s_o; Table 5.1 & Table 5.2: Summary of image formation by convex and concave lenses',
          'Chapter Summary & Review Questions'
        ],
        readings: 'Physics Module — Chapter 5'
      },
      {
        id: 'phys-ch6',
        chapterNumber: 6,
        title: 'CHAPTER SIX: ELECTROMAGNETISM AND ELECTRONICS',
        topics: [
          'Learning Objectives: Describe electric force, define electric potential/voltage/potential difference, apply conservation of energy, define unit of current, analyze circuits using Kirchhoff\'s rules, explain attraction/repulsion by magnets, define magnetic flux, use Faraday\'s law',
          '6.1. Coulomb\'s Law and Electric Fields — Electric Charge (Positive, Negative, Coulomb); Coulomb\'s Law: F = K|q1q2|/r²; Electric Forces due to system of point charges (Principle of superposition); Electric Field: E = F/q = kq/r²; Electric Fields due to Charge Distributions; Electric Field Lines',
          '6.2. Electric Potential — 6.2.1. Electric potential energy (U = (1/4πε₀)(q1q2/r12)); Definition: Electric Potential (V = U/q); Electric Potential Difference (Voltage); Potential Difference and Electrical Potential Energy',
          '6.3. Current, Resistance and Ohm\'s Law — Current (I = ΔQ/Δt), Ampere; Resistivity (ρ = E/J); Ohm\'s Law (V = IR)',
          '6.4. Electrical Energy and Power — P = IV = I²R = V²/R',
          '6.5. Equivalent Resistance and Kirchhoff\'s Rule — Resistors in Series (R_eq = R1 + R2 + ... + RN); Resistors in Parallel (1/R_eq = 1/R1 + 1/R2 + ... + 1/RN); Kirchhoff\'s First Rule (Junction Rule: ΣI_in = ΣI_out); Kirchhoff\'s Second Rule (Loop Rule: ΣV = 0)',
          '6.6. Magnetic Field and Magnetic Flux — Definition: Magnetic Field (F = qv × B); Right-hand rule; Magnetic Flux (Φ = BA)',
          '6.7. Electromagnetic Induction — Faraday\'s Law: Induced emf = -N(ΔΦ/Δt); Lenz\'s Law',
          '6.8. Insulators, Conductors and Semiconductors — Energy Band in Solids (Valence band, Conduction band, Forbidden energy gap); Conductors (E_g = 0), Insulators (E_g > 3 eV), Semiconductors (E_g < 3 eV); Intrinsic Semiconductors (Electron-hole pairs); Extrinsic semiconductor: N-type (Donor impurities), P-type (Acceptor impurities)',
          '6.9. Diodes — P-N junction diode; Forward Biasing & Reverse biasing; P-N junction diode rectification: Half-wave rectification, Full Wave Rectifier Circuit',
          '6.10. Transistors — NPN and PNP transistors; Symbol for transistors; Transistor Amplifier-Common Emitter configuration (NPN); A.C. power gain; Advantages of common emitter configuration; Logic Gates: AND, NAND, OR, NOR, NOT',
          'Chapter Summary & Review Questions'
        ],
        readings: 'Physics Module — Chapter 6'
      },
      {
        id: 'phys-ch7',
        chapterNumber: 7,
        title: 'CHAPTER SEVEN: CROSS CUTTING APPLICATIONS OF PHYSICS',
        topics: [
          'Learning Objectives: Explain application of physics in different sciences and technology fields, describe physical properties of soil, analyze motor/generator operations, explain medical imaging techniques, discuss uses of radiation in archeology/industry/medicine, discuss seismometer/radio/TV communications, discuss renewable energy sources',
          '7.1. Physics in Agriculture and Environment — Agro physics; Soil physics: Soil Density, Soil Porosity, Soil Moisture Content; Energy Balance Concept and Energy Balance in Soil; Soil Moisture Characteristics',
          '7.2. Physics in Industries — Principles of Motor and generator: DC Motor, Generators',
          '7.3. Physics in Health Sciences and Medical Imaging — Radiation: Non-ionizing, Ionizing (Directly, Indirectly); Biological effects of radiation; Medical Imaging: X-Ray, Computerized Tomography (CT Scanner), Magnetic Resonance Imaging (MRI), Ultrasound',
          '7.3. Physics and Archeology — Radioactive Dating: Radiocarbon dating, Radiocarbon in nature, Radiocarbon in archaeological samples',
          '7.4. Application in Earth and Space Sciences — Seismometer; TV and Radio Communications: Radio waves, Sky waves, Space waves, Microwaves',
          '7.5. Applications in Power Generation — Fossil Fuels (Conventional Source of Energy); Energy from the Atom (Nuclear Energy); Sun (The Ultimate Source of Energy); Wind Energy; Geothermal Energy; Ocean Tidal and Wave energy; Hydropower (How a Hydropower Plant Works)',
          'Chapter Summary, Review Questions, Course Progress Evaluation Focus, Key Student-Related Policies & References'
        ],
        readings: 'Physics Module — Chapter 7'
      }
    ]
  },

  // ==========================================
  // 18. English2 (5 Units + Supplementary Readings)
  // ==========================================
  {
    id: 'english2',
    code: 'English2',
    title: 'English2',
    shortTitle: 'English2',
    subject: 'english_2',
    semester: 2,
    creditHours: 3,
    category: 'Common Competency',
    overview: 'Comprehensive 5-Unit Communicative English Language Skills II course (plus Supplementary Readings A, B & C) covering Unit I: Life Skills ("The Concept of Life Skills", Active & Passive Voices, Interpersonal Skills), Unit II: Speculations about the Future of Science ("Grassroots attack on bilharzia" by Mike Muller, Dr. Aklilu Lemma\'s work on Endod, Future Tense forms & functions), Unit III: Environmental Protection ("Environmental Challenges: A river ran through it", Modal Verbs & Supplementary Reading A on Environmental Problems), Unit IV: Indigenous Knowledge ("A Local Pathway to Global Development" by Benjamin Mkapa, Direct & Indirect/Reported Speech & Supplementary Reading B on Human Origins in the Afar by Berhane Asfaw), and Unit V: Cultural Heritages ("Cultural Heritage: What is it? Why is it important?", Defining/Non-Defining/Connective Relative Clauses & Supplementary Reading C on Tourism Products in Ethiopia).',
    keyTopics: [
      'Unit I: Life Skills (Reading: "The Concept of Life Skills", Grammar: Active & Passive Voices, Speaking & Writing on Interpersonal Skills)',
      'Unit II: Speculations about the Future of Science (Reading: "Grassroots attack on bilharzia" & Dr. Aklilu Lemma\'s Endod Research, Grammar: Future Tense Forms)',
      'Unit III: Environmental Protection (Reading: "Environmental Challenges: A river ran through it", Grammar: Modal Verbs & Global Warming Writing)',
      'Unit IV: Indigenous Knowledge (Reading: "A Local Pathway to Global Development" by Benjamin Mkapa, Grammar: Direct & Indirect/Reported Speech)',
      'Unit V: Cultural Heritages & Supplementary Readings A, B, C (Reading: Cultural Heritage, Grammar: Defining/Non-Defining/Connective Relative Clauses, Afar Human Origins & 9 Tourism Product Categories)'
    ],
    defaultChapters: [
      {
        id: 'eng2-ch1',
        chapterNumber: 1,
        title: 'Unit I: Life Skills',
        topics: [
          'Introduction & Unit Objectives: Identify different components of life skills; become successful in living in a community; develop speaking, listening, reading and writing abilities; know the voices in grammar and apply them in academic writing',
          'Part I: Reading Passage: The Concept of Life Skills — Activity 1.2: Main idea and prediction; Definitions of life skills (WHO, Elias, TACADE, Peck and Hong); Personal skills, Home management skills, Self-reliance skills; Life skills contribute to self-efficacy, self-confidence, self-esteem; Core set of skills for health and well-being of children and adolescents; Belonging as a component of life skills (Alfred Adler); Activity 1.4: Write a brief conclusion; Activity 1.5: Comprehension questions, True/False, Multiple choice, Reference words, Guessing meanings',
          'Part II: Grammar: Active and Passive Voices — Activity 1.6: Identifying passive verb forms (Magazine article on Academy Awards); Activity 1.7: List passive voice verbs; Table 1.1: Active and Passive voices in different tenses; Activity 1.8: Questions on passive forms; Activity 1.9: Write correct active or passive forms; Activity 1.10: Paragraph writing using active and passive verb forms (News report); Activity 1.11: Writing a paragraph using active and passive verb forms (Garment Production Process); Activity 1.12: Ask senior students for their reports and see how they applied Active and Passive Voices',
          'Part III: Speaking — Activity 1.13: Problem-solving scenarios (Senait, Zelalem, Bullying); Note on Interpersonal Skills; Activity 1.14: Self-evaluation of interpersonal skills; Activity 1.15: Discuss a problem encountered at school and write a short paragraph',
          'Part IV: Writing — Activity 1.16: Write a paragraph on the problem you encountered at school'
        ],
        readings: 'English2 Module — Unit I'
      },
      {
        id: 'eng2-ch2',
        chapterNumber: 2,
        title: 'Unit II: Speculations about the Future of Science',
        topics: [
          'Introduction & Unit Objectives: Reading passage about an Ethiopian scientist who discovered medication to Bilharzia; understand how scientific investigation can be carried out; develop speaking, listening, reading and writing abilities; know the future tense forms and use them in speech and writing',
          'Part I: Reading Passage: Grassroots attack on bilharzia — Activity 2.1: Pre-reading questions; Reading passage: "Grassroots attack on bilharzia" by Mike Muller; Activity 2.2: Main idea and prediction; Activity 2.3: Comprehension questions; Life cycle of bilharzia; Activity 2.4: Notes and questions; Dr. Aklilu Lemma\'s work on Endod; Activity 2.5: Write a conclusion; Activity 2.6: Comprehension questions; Activity 2.7: Vocabulary (similar meanings)',
          'Part II: Grammar: Future Tense — Activity 2.8: Questions on future tenses; Reading passage: "Mystery Guest"; Notes on future tense forms and functions; Activity 2.9: Write words in brackets in appropriate future tense forms; Activity 2.10: Construct future sentences using \'be going to\' based on Sara\'s Schedule; Activity 2.11: Complete sentences; Activity 2.12: Write sentences using \'will + inf.\'',
          'Part III: Speaking — Activity 2.13: Discuss Bilharzia vs. malaria and Endod vs. other commercial pesticides',
          'Part IV: Writing — Activity 2.14: Write short paragraphs on Endod as a pesticide, lessons learnt from Dr. Aklilu, and a local herb'
        ],
        readings: 'English2 Module — Unit II'
      },
      {
        id: 'eng2-ch3',
        chapterNumber: 3,
        title: 'Unit III: Environmental Protection',
        topics: [
          'Introduction & Unit Objectives: Become aware of environmental problems and how they can be resolved; determine to participate in environmental protection; develop speaking, listening, reading and writing abilities; understand and employ modal verbs in academic discussions and writing',
          'Part I: Reading Passage: Environmental Challenges: A river ran through it — Activity 3.1: Pre-reading questions; Reading passage: "Environmental Challenges: A river ran through it"; Activity 3.2: Central idea and cause for Murray\'s water level reduction; Activity 3.3: Notes and summary; Activity 3.4: Write a conclusion; Activity 3.5: Comprehension questions; Activity 3.6: Find words from the passage that mean given words/phrases',
          'Part II: Grammar: Modal Verbs — Activity 3.7: Match columns to identify the use of each modal verb; Activity 3.8: Match statements to sentences with same meaning; Activity 3.9: Complete spaces in text using phrases from list; Notes on Modal verbs and their functions (permission, request, possibility, advice, necessity, prohibition, promise, wish); Activity 3.10: Complete text with given phrases; Activity 3.11: Read reference material on modal verbs',
          'Part III: Speaking — Activity 3.12: Rationally argue on debatable statements; Activity 3.13: Discuss causes of environmental problems and propose solutions',
          'Part IV: Writing — Activity 3.14: Discuss causes and solutions for \'global warming\' and write a short paragraph; Supplementary Reading A: Environmental Problems (pollution, global warming, climate change, flood, pests, vector diseases & Ethiopian afforestation program)'
        ],
        readings: 'English2 Module — Unit III & Supp. A'
      },
      {
        id: 'eng2-ch4',
        chapterNumber: 4,
        title: 'Unit IV: Indigenous Knowledge',
        topics: [
          'Introduction & Unit Objectives: Create awareness of the importance of indigenous knowledge; apply important indigenous knowledge together with scientific knowledge; develop speaking, listening, reading and writing abilities; understand and use direct and indirect (reported) speech in speaking and writing',
          'Part I: Reading Passage: A Local Pathway to Global Development — Activity 4.1: Pre-reading questions; Reading passage: "A Local Pathway to Global Development" by Benjamin Mkapa; Activity 4.2: Central idea, cause for need of knowledge development, prediction; Activity 4.3: Advantages of indigenous knowledge, important points missed by scientists; Activity 4.4: Write a concluding paragraph; Activity 4.5: Comprehension questions; Activity 4.6: Find words with opposite meanings',
          'Part II: Grammar: Reported Speech — Activity 4.7: Identifying Quoted and Reported Speech; Activity 4.8: Find reported speech in dialogue; Activity 4.9: Change dialogue into reported speech; Activity 4.10–4.11: Change direct speech sentences into reported/indirect speech; Note on changing direct to indirect speech; Activity 4.12: Read about direct and indirect speech and present notes',
          'Part III: Speaking — Activity 4.13: Discuss human life began in Ethiopia, debate on indigenous vs. scientific knowledge, tell about a herbal medicine',
          'Part IV: Writing — Activity 4.14: Write a paragraph on points of agreement/disagreement with the author, and advantages/disadvantages of using herbal medicines; Supplementary Reading B: "The origin of humans: the record from the Afar of Ethiopia" by Berhane Asfaw (human evolution, fossil record, Middle Awash, Ethiopia)'
        ],
        readings: 'English2 Module — Unit IV & Supp. B'
      },
      {
        id: 'eng2-ch5',
        chapterNumber: 5,
        title: 'Unit V: Cultural Heritages & Supplementary Readings',
        topics: [
          'Introduction & Unit Objectives: Identify man-made and natural heritages; be aware of the importance of cultural heritages in national development; develop speaking, listening, reading and writing abilities; understand and use relative clauses in oral and written discourses',
          'Part I: Reading Passage: Cultural Heritage: What is it? Why is it important? — Activity 5.1: Pre-reading questions; Reading passage: "Cultural Heritage: What is it? Why is it important?"; Activity 5.2: Complete sentences with relative pronouns; Activity 5.3: Answer comprehension questions; Activity 5.4: Underline the pronoun that best completes each sentence; Activity 5.5: Complete paragraph about birth order with relative pronouns; Activity 5.6: Complete passage with suitable relative pronouns; Notes on Defining relative clauses, Non-defining relative clauses, Connective relative clauses',
          'Part III: Speaking — Activity 5.7: Discuss cultural heritages existing in your region, which national heritage you like most, what you have done and should do for our cultural heritages',
          'Part IV: Writing — Activity 5.8: Write an essay on preserving cultural heritages, advantages of cultural heritages, and our roles in valuing them',
          'Supplementary Readings (A, B & C) — A. Environmental Problems (Unit 3); B. The origin of humans: the record from the Afar of Ethiopia by Berhane Asfaw (Unit 4); C. Tourism can be used to preserve Ethiopia\'s cultural and historic wealth (Unit 5: destination marketing strategies & 9 Categories of tourism products: Nature tourism, Experiential cultural tourism, Agri-tourism, Historical tourism, Health and wellness tourism, Medical tourism, Religious tourism, Sports tourism, Scientific tourism)'
        ],
        readings: 'English2 Module — Unit V & Supp. C'
      }
    ]
  },

  // ==========================================
  // 19. Psychology (11 Chapters)
  // ==========================================
  {
    id: 'psychology',
    code: 'Psychology',
    title: 'Psychology',
    shortTitle: 'Psychology',
    subject: 'psychology',
    semester: 2,
    creditHours: 3,
    category: 'Common Competency',
    overview: 'Comprehensive 11-Chapter General Psychology and Life Skills course covering Chapter One: Essence of Psychology (definition, goals, early schools, modern perspectives, sub-fields, research methods), Chapter Two: Sensation and Perception (thresholds, adaptation, attention, Gestalt form laws, binocular/monocular depth cues, constancies, illusions), Chapter Three: Learning and Theories of Learning (Pavlovian classical conditioning, Skinnerian operant conditioning, Bandura\'s observational learning, Tolman\'s latent & Kohler\'s insight learning), Chapter Four: Memory and Forgetting (encoding/storage/retrieval, sensory/STM/LTM, Ebbinghaus & forgetting theories), Chapter Five: Motivation and Emotions (intrinsic/extrinsic, motivational theories, Maslow, conflict of motives, James-Lange, Cannon-Bard, Schachter-Singer), Chapter Six: Personality (Freud\'s Id/Ego/Superego & defense mechanisms, Big Five OCEAN traits, Rogers\' humanistic theory), Chapter Seven: Psychological Disorders and Treatment Techniques, Chapter Eight: Introduction to Life Skills, Chapter Nine: Intra-Personal and Interpersonal Skills, Chapter Ten: Academic Skills (time management, Cornell notes, test anxiety, SMART goals, career development), and Chapter Eleven: Social Skills (diversity, gender inclusion, communication, social influence, peer pressure, assertiveness, conflict resolution, teamwork & overcoming risky behavior).',
    keyTopics: [
      'Chapter One: Essence of Psychology (Definition, 4 Goals, Early Schools, Modern Perspectives, Branches & Research Methods)',
      'Chapter Two: Sensation and Perception (Sensory Thresholds, Adaptation, Attention, Gestalt Laws, Depth Cues, Constancies & Illusions)',
      'Chapter Three: Learning and Theories of Learning (Classical Conditioning, Operant Conditioning, Social Learning & Cognitive Learning)',
      'Chapter Four: Memory and Forgetting (Sensory, STM/Working & LTM, Serial Position Effect, Ebbinghaus & Theories of Forgetting)',
      'Chapter Five: Motivation and Emotions (Approaches to Motivation, Maslow\'s Hierarchy, Conflict of Motives & Theories of Emotion)',
      'Chapter Six: Personality (Psychoanalytic Theory & Defense Mechanisms, Big Five OCEAN Trait Model & Rogers\' Humanistic Theory)',
      'Chapter Seven: Psychological Disorders and Treatment Techniques (Criteria, Causes, Mood/Anxiety/Personality Disorders & Therapies)',
      'Chapter Eight: Introduction to Life Skills (Nature, Definition, 10 Core Components & Goals of Life Skills)',
      'Chapter Nine: Intra-Personal and Interpersonal Skills (Self-Concept/Awareness/Esteem/Control, EQ, Stress Coping, Resilience & Problem Solving)',
      'Chapter Ten: Academic Skills (Time Management, Cornell/Outlining/Charting Note-Taking, Test Anxiety, SMART Goals & Career Development)',
      'Chapter Eleven: Social Skills (Cultural Diversity, Gender Inclusion, Social Influences, Peer Pressure, Assertiveness, Conflict Resolution & Teamwork)'
    ],
    defaultChapters: [
      {
        id: 'psyc-ch1',
        chapterNumber: 1,
        title: 'Chapter One: Essence of Psychology',
        topics: [
          '1.1 Definition of Psychology and Related Concepts — Scientific study of human behavior and mental processes; Key aspects: Science, Behavior (overt and covert), Mental Processes (internal, covert activities)',
          '1.2 Goals of Psychology — Description (observing and noticing behavior), Explanation (finding reasons for behavior), Prediction (determining what will happen in the future), Control (changing or modifying behavior)',
          '1.3 Historical Background and Major Perspectives in Psychology — 1.3.1 Early schools of psychology: Structuralism (Titchener), Functionalism (James), Gestalt Psychology (Wertheimer), Behaviorism (Watson), Psychoanalysis (Freud); 1.3.2 Modern schools of psychology: Psychodynamic, Behavioral, Humanistic, Cognitive, Biological, and Socio-cultural perspectives',
          '1.4 Branches/Sub Fields of Psychology — Developmental, Personality, Social, Cross-cultural, Industrial, Forensic, Educational, Health, Clinical, and Counseling Psychology',
          '1.5 Research Methods in Psychology — Definition of terms (Scientific method, Theory, Hypotheses); Major types: Descriptive (Naturalistic observation, Case study, Survey), Correlational, and Experimental research; Steps of scientific research (Defining the problem, Formulating the hypothesis, Testing the hypothesis, Drawing conclusions, Reporting results)'
        ],
        readings: 'Psychology Module — Chapter 1'
      },
      {
        id: 'psyc-ch2',
        chapterNumber: 2,
        title: 'Chapter Two: Sensation and Perception',
        topics: [
          '2.1 The meanings of sensation and perception (Sensation: stimulation of receptor cells sends nerve impulses to the brain, involves a stimulus; Perception: organizes sensations into meaningful patterns, interpreting sensations) & 2.2 The sensory laws: Sensory thresholds and sensory adaptation (Absolute threshold, Difference threshold [jnd], Sensory Adaptation)',
          '2.3.1 Selectivity of perception: Attention (Focus vs. Margin; External factors: size, intensity, repetition, novelty, movement; Internal factors: set/expectancy, motives/needs) & 2.3.2 Form Perception (Figure-ground perception, Contours, Gestalt laws of organization: proximity, similarity, good figure, continuation, closure)',
          '2.3.3 Depth perception — Binocular cues (retinal disparity, convergence) and Monocular cues (accommodation, motion parallax, pictorial cues: interposition, linear perspective, shading, texture gradient)',
          '2.3.4 Perceptual Constancies (Size, shape, and brightness constancy) & 2.3.5 Perceptual Illusion (Misapplication of visual cues: Muller-Lyer illusion, Moon illusion)'
        ],
        readings: 'Psychology Module — Chapter 2'
      },
      {
        id: 'psyc-ch3',
        chapterNumber: 3,
        title: 'Chapter Three: Learning and Theories of Learning',
        topics: [
          '3.1 Definition, Characteristics and Principles of Learning — 3.1.1 Definitions (Relatively permanent change in behavior due to experience or practice); 3.1.2 Characteristics (Continuous, pervasive, involves the whole person, active, purposeful); 3.1.3 Principles (Readiness, meaningful practice, pleasant feeling, primacy, recency, intensity, freedom)',
          '3.2 Factors Influencing Learning — Motivation, Maturation, Health condition, Psychological wellbeing, Good working conditions, Background experiences, Length of working period, Massed vs. distributed learning',
          '3.3.1 Behavioral Theory of Learning — Classical Conditioning (Pavlov: Neutral stimulus paired with UCS to produce CR; Stimulus generalization, discrimination, extinction, spontaneous recovery) & Operant Conditioning (Skinner: Learning through consequences; Positive/negative reinforcement, Positive/negative punishment, Fixed/variable ratio/interval schedules of reinforcement, Shaping)',
          '3.3.2 Social Learning Theory / Observational Learning (Bandura: Learning by watching models; 4 Conditions: Attention, Retention, Motor reproduction, Motivation) & 3.3.3 Cognitive Learning Theory (Latent learning [Tolman], Insight learning [Kohler])'
        ],
        readings: 'Psychology Module — Chapter 3'
      },
      {
        id: 'psyc-ch4',
        chapterNumber: 4,
        title: 'Chapter Four: Memory and Forgetting',
        topics: [
          '5.1 Memory — 5.1.1 Meaning and Processes of Memory (Encoding, Storage, Retrieval); 5.1.2 Stages/Structure of Memory: Sensory Memory (Iconic, Echoic), Short-term Memory (Working memory, capacity 7±2, chunking), Long-term Memory (Declarative/Explicit: semantic, episodic; Non-declarative/Implicit: procedural), Serial Position Effect (Primacy, Recency); 5.1.3 Factors Affecting Memory (Ability to retain, health, age, maturity, will, intelligence, interest, overlearning, speed of learning, meaningfulness, sleep)',
          '5.2 Forgetting — 5.2.1 Meaning and Concepts of Forgetting (Apparent loss of information from LTM; Ebbinghaus\'s forgetting curve); 5.2.2 Theories of Forgetting: Decay Theory, Interference Theory (Proactive, Retroactive), New Memory for Old/Displacement Theory, Motivated Forgetting (Repression), Cue Dependent Forgetting',
          '5.3 Improving Memory — Pay attention, Encode in multiple ways, Add meaning, Take your time, Overlearn, Monitor learning'
        ],
        readings: 'Psychology Module — Chapter 4'
      },
      {
        id: 'psyc-ch5',
        chapterNumber: 5,
        title: 'Chapter Five: Motivation and Emotions',
        topics: [
          '5.1 Motivation — 5.1.1 Definition and types of motivation (Intrinsic and Extrinsic); 5.1.2 Approaches to motivation / theories: Instinct, Drive-reduction (Homeostasis), Arousal, Incentive, Cognitive, Humanistic (Maslow\'s Hierarchy of Needs: Physiological, Safety, Love/Belonging, Esteem, Self-actualization); 5.1.3 Conflict of motives and frustration (Approach-Approach, Avoidance-Avoidance, Approach-Avoidance, Multiple Approach-Avoidance)',
          '5.2 Emotions — 5.2.1 Definition of emotion (Feeling aspect of consciousness, characterized by physical arousal, behavior, and subjective experience); 5.2.2 Theories of emotion: James-Lange Theory, Cannon-Bard Theory, Schachter-Singer Cognitive Arousal Theory'
        ],
        readings: 'Psychology Module — Chapter 5'
      },
      {
        id: 'psyc-ch6',
        chapterNumber: 6,
        title: 'Chapter Six: Personality',
        topics: [
          '6.1 Meaning of Personality — Unique pattern of enduring thoughts, feelings, and actions; Distinction from character and temperament',
          '6.2.1 The psychoanalytic theory (Freud) — Structures: Id (pleasure principle), Ego (reality principle), Superego (moral conscience); Defense mechanisms: Repression, Denial, Regression, Rationalization, Displacement, Projection, Reaction formation, Sublimation',
          '6.2.2 The trait theory — Five-factor model (OCEAN): Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism',
          '6.2.3 Humanistic theory (Carl Rogers) — Self-concept (Real self vs. Ideal self), Positive regard (Conditional vs. Unconditional), Fully functioning person'
        ],
        readings: 'Psychology Module — Chapter 6'
      },
      {
        id: 'psyc-ch7',
        chapterNumber: 7,
        title: 'Chapter Seven: Psychological Disorders and Treatment Techniques',
        topics: [
          '7.1 Nature of Psychological Disorders (Criteria: Abnormality, Maladaptiveness, Personal Distress) & 7.2 Causes of Psychological Disorders Based on Perspectives (Biological: neurotransmitters; Psychoanalytic: unconscious conflicts; Learning: inadequate learning; Cognitive: self-defeating thoughts)',
          '7.3 Types of Psychological Disorders — Mood Disorders (Major Depression, Dysthymia, Bipolar Disorder, Cyclothymia); Anxiety Disorders (Panic Disorder, Agoraphobia, Specific/Social Phobia, OCD, PTSD, Generalized Anxiety Disorder); Personality Disorders (Paranoid, Schizoid, Schizotypal, Antisocial, Borderline, Histrionic, Narcissistic, Avoidant, Obsessive-Compulsive)',
          '7.4 Treatment Techniques — Treatment Approaches (Cognitive, Behavioral, Dynamic/Psychodynamic, Eclectic/Integrationist) & Treatment Modalities (Individual therapy, Group therapy, Couples/Family therapy)'
        ],
        readings: 'Psychology Module — Chapter 7'
      },
      {
        id: 'psyc-ch8',
        chapterNumber: 8,
        title: 'Chapter Eight: Introduction to Life Skills',
        topics: [
          '8.1 Nature and Definition of Life skills — Abilities for adaptive and positive behavior to deal effectively with demands and challenges of everyday life',
          '8.2 Goals of Life Skills — Lead a smooth and successful life at home, workplace, and in social relationships',
          '8.3 Components of Life Skills — Critical thinking, Self-confidence, Self-awareness, Self-esteem, Decision-making, Interpersonal relationships, Reflective communication, Peer pressure resistance, Knowing rights and duties, Problem solving'
        ],
        readings: 'Psychology Module — Chapter 8'
      },
      {
        id: 'psyc-ch9',
        chapterNumber: 9,
        title: 'Chapter Nine: Intra-Personal and Interpersonal Skills',
        topics: [
          '9.1 Self-Concept (totality of ideas about the self) and Self-Awareness (clear perception of personality), 9.2 Self-esteem (overall self-evaluation) and Self-confidence (trust in oneself and abilities), 9.3 Self-Control (refraining from immediate impulses for long-term goals) & 9.4 Anger Management (techniques to control anger and prevent conflicts)',
          '9.5 Emotional Intelligence and Managing Emotion (Ability to identify and manage one\'s own emotions and emotions of others) & 9.6 Stress, Coping with Stress and Resilience (Stressors: Catastrophes, Significant life changes, Daily hassles; Coping: Problem-focused vs. Emotion-focused; Resilience: Adapting well in the face of adversity)',
          '9.7 Critical and Creative Thinking (Critical thinking: analytic, purposeful judgment; Creative thinking: imaginative, constructive, generative) & 9.8 Problem Solving and Decision Making (7 Steps: Recognize, Define, Develop strategy, Organize, Allocate resources, Monitor, Evaluate; Decision-making selection process)'
        ],
        readings: 'Psychology Module — Chapter 9'
      },
      {
        id: 'psyc-ch10',
        chapterNumber: 10,
        title: 'Chapter Ten: Academic Skills',
        topics: [
          '10.1 Time Management (Ability to plan and control how time is spent to accomplish goals) & 10.2 Note-taking and Study Skills (Getting organized, Before class, During class: Cornell method, Outlining, Charting; After class)',
          '10.3 Test-Taking Skill (Strategies for preparing for and taking tests) & 10.4 Test Anxiety and Overcoming Test Anxiety (Physical, Emotional, Behavioral, Cognitive symptoms; Realistic thinking to reduce anxiety)',
          '10.5 Goal Setting (SMART goals: Specific, Measurable, Action, Realistic, Time-bound) & 10.6 Career Development Skill (Lifelong process of planning and managing learning, work, and leisure to achieve life objectives)'
        ],
        readings: 'Psychology Module — Chapter 10'
      },
      {
        id: 'psyc-ch11',
        chapterNumber: 11,
        title: 'Chapter Eleven: Social Skills',
        topics: [
          '11.1 Understanding cultural Diversity (Increase understanding, avoid imposing values, recognize variations), 11.2 Gender and Social Inclusion (Sex [biological] vs. Gender [social]; Gender inclusion) & 11.3 Interpersonal Communication Skills (Verbal and non-verbal messages)',
          '11.4 Social Influences (Attitude change, Compliance, Conformity, Obedience), 11.5 Peer Pressure (Positive vs. Negative; Strategies to handle peer pressure) & 11.6 Assertiveness (Expressing feelings, thoughts, beliefs, and opinions openly without violating rights of others)',
          '11.7 Conflict and Conflict Resolution (Sources: Economic, Value, Power, Ineffective communication; Levels: Intrapersonal, Interpersonal, Role, Intergroup, Multi-party, International; Methods: Win-lose, Lose-lose, Win-win), 11.8 Team Work (Complementary skills committed to a common purpose) & 11.9 Overcoming Risky Behavior'
        ],
        readings: 'Psychology Module — Chapter 11'
      }
    ]
  }
];

// Ensure every catalog item also exposes `units` (alias for `keyTopics`), `midtermWeight`, and `finalWeight`
OFFICIAL_17_FRESHMAN_COURSES.forEach((course) => {
  if (!course.units) {
    course.units = course.keyTopics;
  }
  if (!course.midtermWeight) {
    course.midtermWeight = '30%';
  }
  if (!course.finalWeight) {
    course.finalWeight = '50%';
  }
});

export const OFFICIAL_19_FRESHMAN_COURSES = OFFICIAL_17_FRESHMAN_COURSES;

export function getCourseBySubject(subject: Subject | string): FreshmanCourseCatalogItem | undefined {
  if (!subject) return undefined;
  const direct = OFFICIAL_17_FRESHMAN_COURSES.find((c) => c.subject === subject || c.id === subject);
  if (direct) return direct;

  // Map legacy subject IDs to their canonical course in the 19 subjects
  switch (subject) {
    case 'physics_2':
      return OFFICIAL_17_FRESHMAN_COURSES.find((c) => c.subject === 'physics');
    case 'chemistry_2':
      return OFFICIAL_17_FRESHMAN_COURSES.find((c) => c.subject === 'chemistry');
    case 'biology_2':
    case 'fitness':
      return OFFICIAL_17_FRESHMAN_COURSES.find((c) => c.subject === 'biology');
    case 'geography_history':
      return OFFICIAL_17_FRESHMAN_COURSES.find((c) => c.subject === 'geography');
    case 'aptitude':
      return OFFICIAL_17_FRESHMAN_COURSES.find((c) => c.subject === 'critical_thinking');
    case 'maths1':
    case 'maths_nat':
    case 'mathsnat':
      return OFFICIAL_17_FRESHMAN_COURSES.find((c) => c.subject === 'mathematics');
    default:
      return OFFICIAL_17_FRESHMAN_COURSES.find(
        (c) =>
          c.code.toLowerCase() === String(subject).toLowerCase() ||
          c.shortTitle.toLowerCase() === String(subject).toLowerCase()
      );
  }
}

export function getCourseById(courseId: string): FreshmanCourseCatalogItem | undefined {
  if (courseId === 'maths1' || courseId === 'maths_nat' || courseId === 'mathsnat' || courseId === 'MathsNat') {
    return OFFICIAL_17_FRESHMAN_COURSES.find((c) => c.subject === 'mathematics');
  }
  const direct = OFFICIAL_17_FRESHMAN_COURSES.find((c) => c.id === courseId);
  if (direct) return direct;
  return getCourseBySubject(courseId);
}

/**
 * Returns ONLY the exact clean subject name (e.g., "Anthropology", "Biology", "MathsNat")
 * without any course code numbers.
 */
export function getSubjectDisplayName(subject: Subject | string): string {
  if (!subject || subject === 'all') return 'All Subjects';
  if (subject === 'general') return 'General';
  const course = getCourseBySubject(subject);
  return course ? course.shortTitle : String(subject);
}

/**
 * Checks whether an item's subject matches the selected filter subject,
 * including unified matching for Biology, Chemistry, and Physics.
 */
export function matchesSubjectFilter(itemSubject: Subject | string, selectedSubject: Subject | string): boolean {
  if (!selectedSubject || selectedSubject === 'all') return true;
  if (itemSubject === selectedSubject) return true;
  if (selectedSubject === 'biology' && (itemSubject === 'biology_2' || itemSubject === 'fitness')) return true;
  if (selectedSubject === 'chemistry' && itemSubject === 'chemistry_2') return true;
  if (selectedSubject === 'physics' && itemSubject === 'physics_2') return true;
  if (selectedSubject === 'geography' && itemSubject === 'geography_history') return true;
  if (selectedSubject === 'critical_thinking' && itemSubject === 'aptitude') return true;
  return false;
}

/**
 * Normalizes any Subject (including legacy IDs) to one of the canonical 19 Freshman subjects.
 */
export function normalizeSubjectTo19(subject: Subject | string): Subject {
  if (!subject || subject === 'all') return 'all';
  const course = getCourseBySubject(subject);
  if (course) return course.subject;
  return subject as Subject;
}

