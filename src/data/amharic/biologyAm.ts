import type { AmharicChapterNote } from './types';

export const BIOLOGY_AM_NOTES: Record<string, AmharicChapterNote> = {
  'biol-mod-ch1': {
    subject: 'biology',
    chapterNumber: 1,
    titleAm: 'ምዕራፍ 1፡ የባዮሎጂ መግቢያ፣ የሕይወት አመጣጥ እና ሳይንሳዊ ዘዴ (Introduction to Biology)',
    briefOverviewAm:
      'የባዮሎጂ ትርጉምና ዘርፎች፣ የሕይወት ባህሪያት (MRS GREN + Homeostasis)፣ Hierarchical Organization & Emergent Properties፣ የሕይወት አመጣጥ ንድፈ-ሐሳቦች (Abiogenesis vs Biogenesis, Oparin-Haldane/Miller-Urey) እና የሳይንሳዊ ምርምር ዘዴን (Scientific Method) ያስተምራል።',
    briefPointsAm: [
      'Characteristics of Life፡ Cellular organization, Metabolism (Anabolism + Catabolism), Homeostasis, Growth & Development, Reproduction, Responsiveness, Heredity (DNA) እና Evolutionary Adaptation።',
      'Biological Hierarchy፡ Atom → Molecule → Organelle → Cell (መሰረታዊ የሕይወት አሃድ!) → Tissue → Organ → Organ System → Organism → Population → Community → Ecosystem → Biosphere።',
      'Biogenesis vs Spontaneous Generation፡ Francesco Redi (ሥጋ & ዝንቦች)፣ Lazzaro Spallanzani እና Louis Pasteur (Swan-neck flask) "ሕይወት ከሕይወት ብቻ ይመጣል" የሚለውን Biogenesis አረጋገጡ።',
      'Scientific Method፡ Observation → Question → Hypothesis (Testable & Falsifiable!) → Controlled Experiment (Independent, Dependent, Control variables) → Analysis → Conclusion → Theory።',
    ],
    examTipAm:
      'Hypothesis ከTheory ይለያል! **Hypothesis** ሊፈተሽና ውድቅ ሊሆን የሚችል የመጀመሪያ ግምት (Testable tentative explanation) ሲሆን **Theory** በብዙ ገለልተኛ ሙከራዎች የተደገፈ ሰፊ ማብራሪያ ነው!',
    expandedOverviewAm:
      'General Biology (Biol 1012) Chapter 1 የሕይወት ሳይንስ መሠረታዊ ማዕቀፍን ይዘረጋል። ሕይወት ያላቸውን ነገሮች ከግዑዝ ነገሮች የሚለዩትን ባህሪያት (በተለይ Homeostasis እና Emergent Properties)፣ የBiological Organization ደረጃዎችን፣ የሕይወት አመጣጥን (Special Creationism, Spontaneous Generation/Abiogenesis, Biogenesis በRedi/Pasteur፣ Biochemical Evolution በOparin-Haldane & Miller-Urey 1953፣ Panspermia/Cosmozoan) እንዲሁም Inductive vs Deductive Reasoning እና Controlled Experiment (Independent vs Dependent vs Standardized Variables, Placebo & Double-blind) በዝርዝር ያስተምራል።',
    learningOutcomesAm: [
      'የሕይወት ባህሪያትንና በእያንዳንዱ የOrganization ደረጃ የሚታዩ Emergent Propertiesን ማብራራት።',
      'Redi, Spallanzani እና Pasteur የSpontaneous Generationን ንድፈ-ሐሳብ እንዴት ውድቅ እንዳደረጉ ማነጻጸር።',
      'Miller-Urey (1953) ሙከራ ($\text{CH}_4, \text{NH}_3, \text{H}_2, \text{H}_2\text{O}$ + electric spark $\rightarrow$ Amino acids) ለBiochemical Evolution የሰጠውን ማስረጃ መግለጽ።',
      'በControlled Experiment ውስጥ Independent Variable, Dependent Variable, Experimental Group እና Control Group መለየት።',
    ],
    sectionsAm: [
      {
        headingAm: '1.1 የሕይወት ባህሪያት፣ Emergent Properties እና የሕይወት አመጣጥ',
        contentAm: `### 1.1.1 ቁልፍ የሕይወት ባህሪያት & Homeostasis
- **Cell as Fundamental Unit**: ሕይወት የሚጀምረው በ**Cell** ደረጃ ነው (ከሴል በታች ያሉ Organelles በራሳቸው ሕያው አይደሉም)።
- **Emergent Properties**: ከታችኛው ደረጃ ወደ ላይኛው ሲሸጋገር አዳዲስ መስተጋብሮች የሚፈጥሯቸው ባህሪያት (ለምሳሌ ካርቦንና ኦክሲጅን ሕይወት የላቸውም፣ ተቀናጅተው ሴል ሲሠሩ ግን ሕይወት ይገኛል!)።
- **Homeostasis**: ውጫዊው አካባቢ ቢቀየርም ውስጣዊ የሰውነት ሁኔታን (pH, Temperature, Blood glucose) በቋሚ ሚዛን የመጠበቅ ችሎታ (በNegative Feedback ይቆጣጠራል)።

### 1.1.2 Theories of Origin of Life
| ንድፈ-ሐሳብ | ዋና ሐሳብ | ቁልፍ ተመራማሪዎች / ማስረጃ |
|---|---|---|
| **Spontaneous Generation (Abiogenesis)** | ሕይወት ከበሰበሰ/ግዑዝ ነገር በድንገት ይፈጠራል | Aristotle (ውድቅ ተደርጓል!) |
| **Biogenesis** | ሕይወት ያለው ነገር ከቀዳሚ ሕይወት ብቻ ይገኛል | **Redi** (1668), **Spallanzani**, **Louis Pasteur** (1861 Swan-neck flask!) |
| **Biochemical Evolution (Modern Abiogenesis)** | በጥንቷ ምድር Reducing atmosphere (ያለ $\\text{O}_2$) ውስጥ ኬሚካሎች Amino acids እና RNA ፈጠሩ | **Oparin & Haldane** (1920s); **Stanley Miller & Harold Urey** (1953) |`,
      },
      {
        headingAm: '1.2 Scientific Method & Experimental Variables',
        contentAm: `### 1.2.1 የሙከራ ተለዋዋጮች (Variables)
- **Independent Variable ($X$)**: ተመራማሪው ሆን ብሎ የሚቀይረው ወይም የሚፈትነው ምክንያት (Cause — e.g., fertilizer dosage)።
- **Dependent Variable ($Y$)**: በIndependent Variable ለውጥ ምክንያት የሚለካው ውጤት (Effect — e.g., plant height)።
- **Controlled (Standardized) Variables**: በሙከራ ቡድንና በControl ቡድን ውስጥ እኩል ተይዘው እንዲቆዩ የሚደረጉ ሁኔታዎች (Temperature, Light, Water)።
- **Inductive Reasoning**: ከብዙ ዝርዝር ምልከታዎች ወደ አጠቃላይ መደምደሚያ መድረስ። **Deductive Reasoning**: ከአጠቃላይ ሕግ ("If... then...") ወደ ዝርዝር ትንበያ መሄድ።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ ተመራማሪ የውኃ ሙቀት ($15^\\circ\\text{C}, 25^\\circ\\text{C}, 35^\\circ\\text{C}$) በAmylase ኢንዛይም ፍጥነት ላይ ያለውን ተጽዕኖ ከፈተነ፣ pH እና የAmylase መጠንን እኩል ቢያደርግ Variables ምን ምን ናቸው?',
        stepsAm: [
          '1. ሆን ተብሎ የተቀየረው **Temperature** = **Independent Variable**።',
          '2. የሚለካው **Rate of Enzyme Reaction** = **Dependent Variable**።',
          '3. እኩል እንዲሆኑ የተያዙት **pH እና የAmylase/Starch መጠን** = **Controlled (Standardized) Variables**።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Homeostasis', termAm: 'ሆሚዮስታሲስ (ውስጣዊ ሚዛን)', definitionAm: 'ውጫዊ ለውጥ ቢኖርም የሰውነትን ውስጣዊ አካባቢ በተረጋጋ ሚዛን መጠበቅ።' },
      { termEn: 'Falsifiability', termAm: 'ውድቅ መደረግ መቻል', definitionAm: 'አንድ ሳይንሳዊ Hypothesis በሙከራ ውሸት መሆኑን ማረጋገጥ የሚቻልበት ባህሪ።' },
    ],
    examTrapsAm: [
      'Miller-Urey (1953) በጥንታዊ ከባቢ አየር ሞዴላቸው ውስጥ **Free Oxygen ($\\text{O}_2$) አልነበረም!** (Oxygen Oxidizing ስለሆነ Organic molecules ይሰብራል!)።',
      'Louis Pasteur በSwan-neck flask ሙከራ **Microorganisms** እንኳን ከአየር አቧራ እንደሚመጡ እንጂ በራሳቸው እንደማይፈጠሩ አረጋገጠ።',
    ],
    keyTakeawaysAm: [
      'የሳይንሳዊ Hypothesis ሁለት ወሳኝ መስፈርቶች፡ Testable (በሙከራ የሚፈተሽ) እና Falsifiable (ውድቅ መሆን የሚችል)።',
      'Pasteur በ1861 Spontaneous Generationን በዘላቂነት ውድቅ አደረገ።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "ሁሉም ሕያዋን ፍጥረታት በሴል የተገነቡ ናቸው፤ አዲስ ሴሎች ከቀዳሚ ሴሎች ይወለዳሉ" የሚለው በRedi ወይስ በCell Theory የትኛው ክፍል ነው?',
        answerAm: 'መልስ፡ **Cell Theory** (Schleiden, Schwann, እና Virchow *Omnis cellula e cellula*) — ከBiogenesis ጋር ሙሉ በሙሉ ይስማማል።',
      },
    ],
  },

  'biol-mod-ch2': {
    subject: 'biology',
    chapterNumber: 2,
    titleAm: 'ምዕራፍ 2፡ ባዮሎጂካል ሞለኪውሎች (Biological Molecules / Biomolecules)',
    briefOverviewAm:
      'Water properties, Carbohydrates (Monosaccharides, Disaccharides, Starch/Glycogen/Cellulose), Lipids (Triglycerides, Phospholipids, Steroids), Proteins (Amino acids, Peptide bonds, 4 Structural Levels), Nucleic Acids (DNA vs RNA), Vitamins እና Minerals ያስተምራል።',
    briefPointsAm: [
      'Dehydration Synthesis (Condensation)፡ ውኃ ($\\text{H}_2\\text{O}$) በማውጣት Monomers ወደ Polymer ይገናኛሉ፤ Hydrolysis፡ ውኃ በመጨመር Polymer ይሰበራል።',
      'Polysaccharides፡ Starch (Plant energy storage, $\\alpha$-glucose), Glycogen (Animal energy storage in liver/muscle, highly branched), Cellulose (Plant cell wall, $\\beta$-1,4-glucose — indigestible by humans), Chitin (Fungi cell wall & Arthropod exoskeleton)።',
      'Lipids፡ True polymers **አይደሉም!** (Hydrophobic)፤ Saturated fatty acids = Single C–C bonds (Solid butter), Unsaturated = $\\ge 1$ cis C=C double bond (Liquid oil)።',
      'Protein 4 Levels፡ Primary (Peptide bond sequence), Secondary ($\\alpha$-helix & $\\beta$-sheet via H-bonds), Tertiary (3D R-group interactions, Disulfide bridges), Quaternary ($\ge 2$ polypeptides like Hemoglobin)።',
    ],
    examTipAm:
      'Denaturation (በሙቀት ወይም Extreme pH) Secondary, Tertiary እና Quaternary structuresን ይሰብራል፣ ነገር ግን **Primary Structure (Peptide bonds) አይሰበርም!**',
    expandedOverviewAm:
      'Chapter 2 የሕይወትን ኬሚካላዊ ግንባታ blocks (**4 Macromolecule Classes + Water + Vitamins + Minerals**) በጥልቀት ይተነትናል። የውኃ Hydrogen bonding ባህሪያት (Cohesion, Adhesion, High Specific Heat, Ice floating because lower density, Universal solvent)፣ የCarbohydrates Monomer–Polymer ትስስር (Glycosidic bonds፣ Reducing sugars & Benedict\'s test፣ $\\alpha$ vs $\\beta$ glucose)፣ Lipids (Ester bonds, Amphipathic Phospholipids forming bilayers, Cholesterol)፣ Proteins (20 Amino acids, R-groups, Peptide bonds, Denaturation & Chaperonins)፣ Nucleic Acids (Phosphodiester bonds, Purines A/G vs Pyrimidines C/T/U, Chargaff\'s Rule, ATP) እና የFat-soluble (A, D, E, K) vs Water-soluble (B-complex, C) ቫይታሚኖች እጥረት በሽታዎችን ያስተምራል።',
    learningOutcomesAm: [
      'የእያንዳንዱን Macromolecule Monomer, Bond type እና ዋና ባዮሎጂካል ተግባር ማወዳደር።',
      'Starch, Glycogen, Cellulose እና Chitinን በግሉኮስ ዓይነት ($\\alpha$ vs $\\beta$) እና በአገልግሎት መለየት።',
      'የProtein 4 የመዋቅር ደረጃዎችን (Primary–Quaternary) እና Denaturation የሚያስከትሉ ሁኔታዎችን መዘርዘር።',
      'DNA እና RNAን (Sugar, Nitrogenous bases, Strands) እና Fat-soluble vs Water-soluble ቫይታሚኖችን ማነጻጸር።',
    ],
    sectionsAm: [
      {
        headingAm: '2.1 የባዮሞለኪውሎች እና የትስስር ሰንጠረዥ (Biomolecules Master Matrix)',
        contentAm: `### 2.1.1 4ቱ ዋና Macromolecules
| Class | Monomer | Covalent Bond | Polymers & Key Examples |
|---|---|---|---|
| **Carbohydrates** ($1:2:1$) | Monosaccharides (Glucose, Fructose, Galactose) | **Glycosidic linkage** | Disaccharides (Maltose, Sucrose, Lactose); Polysaccharides (Starch, Glycogen, Cellulose) |
| **Lipids** (Not true polymers) | Glycerol + 3 Fatty Acids | **Ester linkage** | Fats/Oils (Triglycerides), Phospholipids, Steroids (Cholesterol, Estrogen) |
| **Proteins** | Amino Acids ($20$ types, central $C_\\alpha$) | **Peptide bond** | Enzymes, Hemoglobin, Collagen, Antibodies ($\\text{C, H, O, N, S}$) |
| **Nucleic Acids** | Nucleotides (Pentose + Phosphate + Base) | **Phosphodiester bond** | DNA (Deoxyribose, A-T/C-G), RNA (Ribose, A-U/C-G), ATP |

### 2.1.2 የላብራቶሪ መለያ ሙከራዎች (Biochemical Food Tests)
- **Benedict’s Test** (Reducing sugars: Glucose, Maltose, Lactose — **Sucrose አይመልስም!**): Brick-red precipitate when heated.
- **Iodine (Lugol’s) Test** (Starch): Blue-black color.
- **Biuret Test** (Proteins / Peptide bonds): Violet / Purple color.
- **Sudan III / Emulsion Test** (Lipids): Red stained layer / Milky emulsion.`,
      },
      {
        headingAm: '2.2 Water, Nucleic Acids, Vitamins & Minerals',
        contentAm: `### 2.2.1 Vitamins & Deficiency Diseases (ከፍተኛ የፈተና ነጥብ!)
- **Fat-Soluble Vitamins (A, D, E, K — በስብ ሕብረ ሕዋስ ይከማቻሉ)**:
  - **Vit A**: Night blindness; **Vit D**: Rickets (Children) / Osteomalacia; **Vit E**: Antioxidant; **Vit K**: Blood clotting (Prothrombin)።
- **Water-Soluble Vitamins (B-Complex & C — አይከማቹም፣ በሽንት ይወጣሉ)**:
  - **Vit C**: Scurvy (የድድ መድማት); **Vit B1 (Thiamine)**: Beriberi; **Vit B3 (Niacin)**: Pellagra; **Vit B9 (Folic acid)**: Neural tube defects; **Vit B12**: Pernicious anemia።
- **Minerals**: **Fe** (Hemoglobin — Anemia), **Iodine** (Thyroxine — Goiter), **Ca/P** (Bones, muscle contraction, nerve impulse), **Na/K** (Action potential)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ የDNA ሞለኪውል **22% Adenine (A)** ካለው፣ የ**Guanine (G)** መቶኛ ስንት ነው?',
        stepsAm: [
          '1. በChargaff’s Rule መሠረት በDouble-stranded DNA ውስጥ $\\%A = \\%T$ እና $\\%G = \\%C$ ነው።',
          '2. $A = 22\\% \\implies T = 22\\%$፤ በድምሩ $A + T = 44\\%$።',
          '3. የቀረው $G + C = 100\\% - 44\\% = 56\\%$።',
          '4. $G = C$ ስለሆነ $G = \\frac{56\\%}{2} = \\mathbf{28\\%}$!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Amphipathic', termAm: 'አምፊፓቲክ', definitionAm: 'ሁለቱንም Hydrophilic (ውኃ ወዳድ — Phosphate head) እና Hydrophobic (ውኃ ፈር — Fatty acid tails) ክፍሎች የያዘ ሞለኪውል።' },
      { termEn: 'Zwitterion', termAm: 'ዝዊተርአዮን', definitionAm: 'በገለልተኛ pH ውስጥ ሁለቱንም $+\\text{NH}_3^+$ እና $-\\text{COO}^-$ ቻርጆች የያዘ Amino acid።' },
    ],
    examTrapsAm: [
      '**Sucrose** (Table sugar = Glucose + Fructose) **Non-reducing sugar** ነው — ስለዚህ በBenedict’s Test ቀጥታ አይቀየርም (በአሲድ ካልተፈጨ በስተቀር)!',
      'Phospholipids ሁለት (2) Fatty acids + 1 Phosphate group እንጂ 3 Fatty acids አይደሉም!',
    ],
    keyTakeawaysAm: [
      'Purines (2 rings: **A, G**) ሁልጊዜ ከPyrimidines (1 ring: **C, T, U**) ጋር በHydrogen bonds ይጣመራሉ ($A=T$ 2 H-bonds, $G\\equiv C$ 3 H-bonds)።',
      'የCarbohydratesና የLipids ዋና ልዩነት፡ 1 g Lipid (~9 kcal) ከ1 g Carbohydrate (~4 kcal) ከእጥፍ በላይ ኃይል ይሰጣል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ 100 Glucose ሞለኪውሎች በDehydration Synthesis ተያይዘው አንድ Starch ሰንሰለት ሲሠሩ ስንት $\\text{H}_2\\text{O}$ ሞለኪውሎች ይወጣሉ?',
        answerAm: 'መልስ፡ $n - 1 = 100 - 1 = \\mathbf{99}$ $\\text{H}_2\\text{O}$ ሞለኪውሎች (99 Glycosidic bonds)!',
      },
    ],
  },

  'biol-mod-ch3': {
    subject: 'biology',
    chapterNumber: 3,
    titleAm: 'ምዕራፍ 3፡ የሴል መሰረታዊ አወቃቀር እና Membrane Transport (Cellular Basis of Life)',
    briefOverviewAm:
      'Cell Theory, Prokaryotic vs Eukaryotic Cells, Organelles (Nucleus, ER, Golgi, Mitochondria, Chloroplast, Lysosome, Peroxisome), Cell Fractionation (Centrifugation), Fluid Mosaic Model እና Osmosis/Active Transport ያስተምራል።',
    briefPointsAm: [
      'Prokaryotes (Bacteria/Archaea)፡ Membrane-bound nucleus እና organelles የላቸውም ($70S$ ribosomes, Circular DNA in nucleoid, Peptidoglycan cell wall in bacteria)። Eukaryotes: True nucleus, membrane-bound organelles, $80S$ ribosomes።',
      'Endomembrane System፡ Nuclear envelope → Rough ER (ፕሮቲን ማምረት) → Smooth ER (Lipid synthesis & Detoxification) → Golgi Apparatus (Modify, Sort, Package) → Lysosome/Secretory vesicle።',
      'Differential Centrifugation Sediment Order (ዝቅተኛ ፍጥነት $\\rightarrow$ ከፍተኛ ፍጥነት)፡ Nuclei ($1000g$) → Mitochondria/Chloroplasts ($10,000g$) → Microsomes/Membranes ($100,000g$) → Ribosomes ($150,000g+$)።',
      'Tonicity (Osmosis)፡ Hypotonic ውስጥ Animal cell **Lyses (ይፈነዳል)**፣ Plant cell **Turgid** (ideal!)፤ Hypertonic ውስጥ Animal cell **Crenates (ይጨማደዳል)**፣ Plant cell **Plasmolyzes**!',
    ],
    examTipAm:
      'Mitochondria እና Chloroplasts በEndosymbiotic Theory መሠረት የራሳቸው **Circular DNA**፣ **Double Membrane** እና **$70S$ Ribosomes** አሏቸው — እንደ ቀድሞ Prokaryotes!',
    expandedOverviewAm:
      'Chapter 3 የሕይወት መሠረታዊ አሃድ የሆነውን **Cell** በጥልቀት ይመረምራል። Surface-Area-to-Volume Ratio ለምን ሴሎችን ትንሽ እንደሚያደርጋቸው፣ Prokaryotes vs Eukaryotes እና Plant vs Animal Cells (Cell wall, Chloroplasts, Central vacuole, Plasmodesmata vs Centrioles & Lysosomes)፣ Light vs Electron Microscopy (TEM vs SEM)፣ Subcellular Fractionation (Homogenization & Differential/Density-Gradient Centrifugation)፣ የSinger-Nicolson Fluid Mosaic Model (Phospholipids, Cholesterol temperature buffer, Integral/Peripheral proteins, Glycoproteins) እና ሁሉንም Membrane Transport ዘዴዎች (Simple Diffusion, Facilitated Diffusion, Osmosis, Primary Active Transport $\\text{Na}^+/\\text{K}^+$ pump 3 out / 2 in, Secondary Active Transport, Endocytosis/Phagocytosis & Exocytosis) ያስተምራል።',
    learningOutcomesAm: [
      'Prokaryotic vs Eukaryotic እና Animal vs Plant ሴሎችን በOrganelles እና በStructure ማወዳደር።',
      'የእያንዳንዱን Organelle (RER, SER, Golgi, Lysosome, Peroxisome, Mitochondria, Chloroplast, Cytoskeleton) ዋና ተግባር መለየት።',
      'በDifferential Centrifugation ጊዜ Organelles በክብደት/መጠን የሚዘቅጡበትን ቅደም ተከተል መግለጽ።',
      'በIsotonic, Hypotonic እና Hypertonic መፍትሔዎች ውስጥ በAnimal እና Plant ሴሎች ላይ የሚደርሰውን ለውጥ መተንበይ።',
    ],
    sectionsAm: [
      {
        headingAm: '3.1 Organelles, Plant vs Animal & Cell Fractionation',
        contentAm: `### 3.1.1 ቁልፍ Organelles እና ልዩ ተግባራቸው
- **Nucleus & Nucleolus**: DNA replication & transcription; Nucleolus **rRNA እና Ribosome subunits** ያመርታል።
- **Rough ER vs Smooth ER**: RER (Ribosomes አሉት) = Secretory & Membrane proteins; SER (Ribosomes የለውም) = Lipids, Steroids, $\\text{Ca}^{2+}$ storage, Drug detoxification (Liver!)።
- **Lysosome vs Peroxisome**: Lysosome ($\\text{pH} \\approx 5$) hydrolytic enzymes ይዞ Phagocytosis/Autophagy ይሠራል፤ Peroxisome $\\text{H}_2\\text{O}_2$ በCatalase ይሰብራል ($\beta$-oxidation of very long fatty acids)።
- **Cytoskeleton**: Microfilaments (Actin, muscle contraction/amoeboid), Intermediate filaments (Keratin, mechanical anchor), Microtubules (Tubulin, $9+2$ cilia/flagella, mitotic spindle)።

### 3.1.2 Differential Centrifugation
ሴሎች በ**Isotonic Cold Buffered Solution** ውስጥ Homogenized ከተደረጉ በኋላ Pellet Order:
**Nuclei $\\rightarrow$ Mitochondria / Chloroplasts / Lysosomes $\\rightarrow$ ER / Plasma Membrane fragments $\\rightarrow$ Ribosomes**!`,
      },
      {
        headingAm: '3.2 Fluid Mosaic Model & Membrane Transport Mechanisms',
        contentAm: `### 3.2.1 Passive vs Active Transport
| ዘዴ | ATP ይፈልጋል? | አቅጣጫ (Gradient) | ምሳሌ |
|---|---|---|---|
| **Simple Diffusion** | No | High $\\rightarrow$ Low | $\\text{O}_2, \\text{CO}_2$, Small nonpolar molecules |
| **Facilitated Diffusion** | No | High $\\rightarrow$ Low (via Channel/Carrier) | Glucose (GLUT), Ions, Water (**Aquaporins**) |
| **Osmosis** | No | High $\\Psi_w$ (Low solute) $\\rightarrow$ Low $\\Psi_w$ (High solute) | Water movement across semipermeable membrane |
| **Primary Active Transport** | **Yes (Direct ATP)** | Low $\\rightarrow$ High (Against gradient!) | **$\\text{Na}^+/\\text{K}^+$ Pump**: $3\\,\\text{Na}^+$ Out, $2\\,\\text{K}^+$ In! |
| **Bulk Transport** | **Yes (ATP)** | Vesicle fusion/budding | Phagocytosis ("Cell eating"), Pinocytosis, Exocytosis |`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ የRed Blood Cell ($0.9\\%$ internal solute) በ**$5\\%$ NaCl** መፍትሔ ውስጥ ቢቀመጥ ምን ይሆናል? ለምን?',
        stepsAm: [
          '1. ከውጭ ያለው $5\\%$ NaCl ከውስጡ $0.9\\%$ በላይ Solute ስላለው መፍትሔው **Hypertonic** ነው።',
          '2. ውኃ ሁልጊዜ ወደ ከፍተኛ Solute (ዝቅተኛ Water potential) አቅጣጫ ስለሚፈስ **ከሴሉ ውስጥ ወደ ውጭ ይወጣል**።',
          '3. ስለዚህ Red Blood Cell **ይጨማደዳል (Crenation / Shrinks)**!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Plasmolysis', termAm: 'ፕላዝሞሊሲስ', definitionAm: 'የPlant ሴል በHypertonic መፍትሔ ውስጥ ውኃ ሲያጣ Plasma membrane ከCell wall መላቀቅ።' },
      { termEn: 'Endosymbiotic Theory', termAm: 'ኢንዶሲምባዮቲክ ንድፈ-ሐሳብ', definitionAm: 'Mitochondria እና Chloroplasts በጥንት ጊዜ በትልቅ ሴል የተዋጡ ራሳቸውን የቻሉ Prokaryotes ነበሩ የሚል ንድፈ-ሐሳብ።' },
    ],
    examTrapsAm: [
      'Cell Fractionation ጊዜ **Cold Isotonic Buffer** የምንጠቀመው፡ Isotonic = Organelles እንዳይፈነዱ (Osmotic lysis ለመከላከል)፣ Cold = Lysosomal enzymes እንዳይበሉት፣ Buffer = pH ቋሚ እንዲሆን ነው!',
      '$\\text{Na}^+/\\text{K}^+$ Pump Electogenic ነው — **3 $\\text{Na}^+$ ወደ ውጭ**፣ **2 $\\text{K}^+$ ወደ ውስጥ** (ለእያንዳንዱ 1 ATP)!',
    ],
    keyTakeawaysAm: [
      'Cholesterol በAnimal cell membrane ውስጥ የFluidity buffer ሆኖ ያገለግላል (በቅዝቃዜ solidification ይከላከላል፤ በሙቀት over-fluidity ይገድባል)።',
      'Plasmolysis በPlant cells፣ Crenation በAnimal cells (በHypertonic) ይከሰታሉ።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "Turgor pressure" ለእፅዋት ጠቃሚ የሚሆነው በየትኛው መፍትሔ ውስጥ ነው?',
        answerAm: 'መልስ፡ **Hypotonic solution** — ውኃ ወደ Central vacuole ገብቶ Cell wallን ስለሚገፋ እፅዋቱ ቀጥ ብሎ እንዲቆም (Turgid) ያደርገዋል።',
      },
    ],
  },

  'biol-mod-ch4': {
    subject: 'biology',
    chapterNumber: 4,
    titleAm: 'ምዕራፍ 4፡ ኢንዛይሞች፣ Photosynthesis፣ Cellular Respiration እና Metabolic Disorders',
    briefOverviewAm:
      'Enzymes (Activation Energy, Induced-fit, Competitive vs Non-competitive Inhibition, Allosteric), Photosynthesis (Light Reactions & Calvin Cycle, C3/C4/CAM), Aerobic Respiration vs Fermentation (30–32 ATP) እና Metabolic Disorders (Diabetes, PKU, Gout, Tay-Sachs) ያስተምራል።',
    briefPointsAm: [
      'Enzymes፡ Activation Energy ($E_a$) ይቀንሳሉ እንጂ **$\\Delta G$ (Free energy change)** ወይም Equilibrium አይቀይሩም! Competitive inhibitor ከActive site ይወዳደራል ($V_{\\max}$ constant, $K_m \\uparrow$)፤ Non-competitive ግን Allosteric site ላይ ይይዛል ($V_{\\max} \\downarrow, K_m$ constant)።',
      'Photosynthesis ($6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{\\text{light}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$)፡ Light Reactions (Thylakoid membrane $\\rightarrow$ ATP, NADPH, $\\text{O}_2$ from $\\text{H}_2\\text{O}$!) + Calvin Cycle (Stroma $\\rightarrow$ RuBisCO fixes $\\text{CO}_2$ into G3P)።',
      'Aerobic Respiration ($\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\rightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O}$ + 30–32 ATP)፡ Glycolysis (Cytosol, 2 net ATP, 2 NADH, 2 Pyruvate) $\\rightarrow$ Pyruvate Oxidation $\\rightarrow$ Krebs/Citric Acid Cycle (Mitochondrial matrix, 2 ATP, 6 NADH, 2 FADH2) $\\rightarrow$ Oxidative Phosphorylation/ETC (Inner membrane cristae, **Final $e^-$ acceptor = $\\text{O}_2$**!)።',
      'Fermentation (No $\\text{O}_2$)፡ 2 ATP ብቻ ከGlycolysis፤ ዓላማው Glycolysis እንዲቀጥል **$NAD^+$ መልሶ ማምረት (Regenerate)** ነው (Lactic acid in muscle vs Alcohol + $\\text{CO}_2$ in yeast)።',
    ],
    examTipAm:
      'በPhotosynthesis ውስጥ የሚወጣው **$\text{O}_2$** የሚመጣው ከ**$\text{H}_2\text{O}$ (Photolysis)** እንጂ ከ$\text{CO}_2$ አይደለም! በCellular Respiration ውስጥ ደግሞ **$\text{O}_2$** በETC መጨረሻ ላይ ከ$e^-$ እና $H^+$ ጋር ተዋህዶ **$\text{H}_2\text{O}$** ይሠራል!',
    expandedOverviewAm:
      'Chapter 4 የሴል ኢነርጂ ፍሰትን (**Bioenergetics & Enzymes**) ከClinical Metabolic Disorders ጋር ያጣምራል። Enzyme Kinetics (Lock-and-Key vs Induced Fit, Optimal Temperature & pH, Cofactors vs Coenzymes, Feedback Inhibition)፣ Chloroplast Photosynthesis (Photosystems II & I, Cyclic vs Non-cyclic Photophosphorylation, Calvin Cycle Carbon Fixation/Reduction/Regeneration, Photorespiration in C3 vs Spatial separation in C4 vs Temporal separation in CAM plants)፣ Cellular Respiration 4 ደረጃዎች (Substrate-level vs Oxidative Phosphorylation, Chemiosmosis & ATP Synthase) እና የሰው ልጅ Metabolic Disorders (Type 1 vs Type 2 Diabetes Mellitus, Phenylketonuria/PKU, Albinism, Galactosemia, Tay-Sachs, Gaucher, Lactose Intolerance, Gout) በዝርዝር ይተነትናል።',
    learningOutcomesAm: [
      'Competitive, Non-competitive (Allosteric) እና Feedback Inhibitionን በMechanism እና በSubstrate concentration ተጽዕኖ መለየት።',
      'የPhotosynthesis Light-dependent Reactions (Thylakoid) እና Calvin Cycle (Stroma) Inputs እና Outputsን መዘርዘር።',
      'C3, C4 (Maize/Sugarcane) እና CAM (Cactus/Pineapple) ተክሎች Photorespirationን እንዴት እንደሚቋቋሙ ማነጻጸር።',
      'የGlycolysis, Pyruvate Oxidation, Krebs Cycle, ETC እና Fermentation ቦታዎችን (Cytosol vs Matrix vs Cristae) እና ATP/NADH ውጤቶችን መለየት።',
      'PKU, Tay-Sachs, Type 1/2 Diabetes እና Gout ያሉ Metabolic Disordersን መንስኤና ሕክምና መግለጽ።',
    ],
    sectionsAm: [
      {
        headingAm: '4.1 Enzyme Kinetics & Inhibition + Photosynthesis Summary',
        contentAm: `### 4.1.1 Enzyme Inhibitors
- **Competitive Inhibitor**: ከSubstrate ጋር ይመሳሰላል፤ **Active site**ን ይይዛል። **Substrate በብዛት በመጨመር መሻር (Overcome) ይቻላል!**
- **Non-competitive Inhibitor**: **Allosteric site** ላይ ይያያዛል፤ የActive siteን ቅርጽ ይቀይራል። Substrate ቢጨመርም አይሻርም!
- **Feedback Inhibition**: የMetabolic pathway የመጨረሻው ምርት (End product) በመጀመሪያው Enzyme Allosteric site ላይ በመግባት Pathwayውን ሲያቆም።

### 4.1.2 C3 vs C4 vs CAM Plants
- **C3**: $\\text{CO}_2$ directly fixed by **RuBisCO** into 3-PGA (3C); በሙቀት/ድርቅ **Photorespiration** ይጎዳቸዋል።
- **C4 (Maize, Sorghum)**: **Spatial Separation** — PEP Carboxylase in Mesophyll fixes $\\text{CO}_2$ (4C Malate) $\\rightarrow$ Bundle-sheath cells where Calvin cycle runs!
- **CAM (Pineapple, Cactus)**: **Temporal (Time) Separation** — Stomata open at **Night** to fix $\\text{CO}_2$ into organic acids; Stomata closed during **Day** to run Calvin cycle!`,
      },
      {
        headingAm: '4.2 Cellular Respiration 4 Stages & Metabolic Disorders',
        contentAm: `### 4.2.1 Aerobic Respiration Breakdown Table
| Stage | Location | Main Inputs | Main Outputs (per 1 Glucose) |
|---|---|---|---|
| **1. Glycolysis** | Cytosol ($\\text{O}_2$ not needed) | Glucose, 2 ATP, 2 $\\text{NAD}^+$ | **2 Pyruvate, 2 net ATP, 2 NADH** |
| **2. Pyruvate Oxidation** | Mitochondrial Matrix | 2 Pyruvate, 2 CoA, 2 $\\text{NAD}^+$ | **2 Acetyl-CoA, 2 $\\text{CO}_2$, 2 NADH** |
| **3. Krebs (Citric Acid) Cycle** | Mitochondrial Matrix | 2 Acetyl-CoA | **4 $\\text{CO}_2$, 2 ATP (GTP), 6 NADH, 2 $\\text{FADH}_2$** |
| **4. Oxidative Phosphorylation (ETC)** | Inner Mitochondrial Membrane (Cristae) | 10 NADH, 2 $\\text{FADH}_2$, $\\mathbf{\\text{O}_2}$ | **~26–28 ATP** (Total ~30–32 ATP), $\\text{H}_2\\text{O}$ |

### 4.2.2 Clinical Metabolic Disorders
- **PKU (Phenylketonuria)**: Phenylalanine hydroxylase enzyme እጥረት $\\rightarrow$ Phenylalanine toxic accumulation (Brain damage); ሕክምና = Phenylalanine-free diet።
- **Tay-Sachs Disease**: Lysosomal enzyme (Hexosaminidase A) እጥረት $\\rightarrow$ Ganglioside lipids in brain neurons።
- **Diabetes Mellitus**: **Type 1** = Autoimmune destruction of $\\beta$-cells (No insulin); **Type 2** = Insulin resistance።
- **Gout**: Uric acid crystals በመገጣጠሚያዎች (Joints) ውስጥ መከማቸት።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'Cyanide ወይም Carbon Monoxide (CO) Cytochrome c oxidase (Complex IV of ETC) ሲዘጋ Oxidative Phosphorylation እና Krebs Cycle ለምን ወዲያውኑ ይቆማሉ?',
        stepsAm: [
          '1. Complex IV ወደ $\\text{O}_2$ ኤሌክትሮን ማስተላለፍ ስለሚያቆም ሙሉው ETC ይቆማል፤ Proton gradient ($H^+$) ስለሚጠፋ ATP Synthase ይቆማል።',
          '2. NADH እና FADH2 ኤሌክትሮን መስጠት ስለማይችሉ $\\text{NAD}^+$ እና $\\text{FAD}$ አይመለሱም።',
          '3. ያለ $\\text{NAD}^+$ እና $\\text{FAD}$፣ Pyruvate Oxidation እና Krebs Cycle በድንገት ይቆማሉ (Glycolysis ብቻ ወደ Lactic acid fermentation ከቀየረ በ2 ATP ሊቆይ ይችላል)።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Substrate-Level Phosphorylation', termAm: 'ሳብስትሬት-ደረጃ ፎስፎሪሌሽን', definitionAm: 'ኢንዛይም በቀጥታ ከPhosphate-donor substrate ላይ Phosphate ወደ ADP አዛውሮ ATP መሥራት (በGlycolysis እና Krebs cycle)።' },
      { termEn: 'Chemiosmosis', termAm: 'ኬሚኦስሞሲስ', definitionAm: 'በProton gradient ($\\text{H}^+$) ኃይል በATP Synthase በኩል ATP የማምረት ሂደት።' },
    ],
    examTrapsAm: [
      'Mitochondria ውስጥ Proton ($\\text{H}^+$) gradient የሚከማቸው **Intermembrane Space** ውስጥ ሲሆን፣ Chloroplast ውስጥ ግን **Thylakoid Lumen** ውስጥ ነው!',
      'RuBisCO በዓለም ላይ እጅግ የተትረፈረፈ ፕሮቲን (Most abundant enzyme) ሲሆን Calvin cycle ላይ $\\text{CO}_2$ን ከ5C **RuBP** ጋር ያጣምራል።',
    ],
    keyTakeawaysAm: [
      'Fermentation ATP አያመርትም (የ2 ATP ምንጭ Glycolysis ነው!) — ዋና ተግባሩ NADHን ወደ $\\text{NAD}^+$ መመለስ ነው።',
      'C4 (Spatial) እና CAM (Temporal) ሁለቱም Photorespirationን ለመቀነስ $\\text{CO}_2$ን መጀመሪያ በPEP Carboxylase ይይዛሉ።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በCellular Respiration ውስጥ የሚተነፈሰው $\\text{CO}_2$ በዋናነት የሚመነጨው በየትኛው ደረጃ ነው?',
        answerAm: 'መልስ፡ በ**Pyruvate Oxidation** (2 $\\text{CO}_2$) እና በ**Krebs / Citric Acid Cycle** (4 $\\text{CO}_2$) በMitochondrial Matrix ውስጥ (Glycolysis $\\text{CO}_2$ አያወጣም!)።',
      },
    ],
  },

  'biol-mod-ch5': {
    subject: 'biology',
    chapterNumber: 5,
    titleAm: 'ምዕራፍ 5፡ ጄኔቲክስ፣ Cell Division፣ Central Dogma እና ኢቮሉሽን (Genetics & Evolution)',
    briefOverviewAm:
      'Mitosis vs Meiosis (Crossing-over & Independent assortment), Mendelian (3:1, 9:3:3:1) & Non-Mendelian Genetics (Incomplete/Codominance, Sex-linked, Epistasis), DNA Replication, Transcription & Translation (Central Dogma), Mutations እና Hardy-Weinberg Evolution ያስተምራል።',
    briefPointsAm: [
      'Mitosis (1 division $\\rightarrow$ 2 Diploid $2n$ Identical somatic cells) vs Meiosis (2 divisions $\\rightarrow$ 4 Haploid $n$ Genetically diverse gametes; Crossing-over in Prophase I, Homologs separate in Anaphase I, Sister chromatids separate in Anaphase II)።',
      'Mendelian Ratios፡ Monohybrid $Aa \\times Aa \\rightarrow 3:1$ Phenotype ($1:2:1$ Genotype)፤ Dihybrid $AaBb \\times AaBb \\rightarrow 9:3:3:1$፤ Test Cross = Unknown $\\times$ Homozygous recessive ($aa$)።',
      'Central Dogma (Crick)፡ **DNA $\\xrightarrow{\\text{Transcription (Nucleus)}}$ mRNA $\\xrightarrow{\\text{Translation (Ribosome)}}$ Protein** (Antiparallel $5\' \\rightarrow 3\'$ synthesis; Start codon = **AUG** [Methionine]; Stop = UAA, UAG, UGA)።',
      'Hardy-Weinberg Equilibrium ($p + q = 1$, $p^2 + 2pq + q^2 = 1$)፡ 5 ሁኔታዎች (No mutation, Random mating, No natural selection, Large population/No genetic drift, No gene flow)።',
    ],
    examTipAm:
      'በHardy-Weinberg ጥያቄዎች ውስጥ **ሁልጊዜ** መጀመሪያ ከRecessive Phenotype ($q^2$) ጀምሩ! $q = \\sqrt{q^2}$ $\\rightarrow$ $p = 1 - q$ $\\rightarrow$ Carriers (Heterozygotes) = **$2pq$**!',
    expandedOverviewAm:
      'Chapter 5 የዘመናዊ ባዮሎጂን ዋና ምሰሶ ማለትም **Cell Division, Classical & Molecular Genetics, እና Evolutionary Population Genetics**ን አንድ ላይ ያቀርባል። የCell Cycle ($G_1, S$ DNA replication, $G_2, M$) እና Checkpoints ($p53$ tumor suppressor)፣ Mitosis vs Meiosis & Nondisjunction (Trisomy 21 Down syndrome)፣ Mendelian Laws (Segregation & Independent Assortment)፣ Non-Mendelian Inheritance (Incomplete Dominance, Codominance / ABO Blood groups, Multiple alleles, Sex-linked X-recessive like Hemophilia/Color blindness, Polygenic traits)፣ Meselson-Stahl Semi-conservative DNA Replication ($\\text{Helicase, Primase, DNA Pol III Leading } 5\'\\rightarrow 3\' \\text{ & Lagging Okazaki fragments, Ligase}$), Transcription (RNA Pol, Intron splicing) & Genetic Code Translation (tRNA anticodons, Wobble)፣ Point vs Frameshift Mutations፣ እንዲሁም Darwinian Natural Selection vs Genetic Drift (Bottleneck & Founder effects) እና Hardy-Weinberg ስሌትን በዝርዝር ይተነትናል።',
    learningOutcomesAm: [
      'Mitosis እና Meiosis I/IIን (Ploidy $2n$ vs $n$, Crossing-over, Synapsis, Chromatid separation) በትክክል ማነጻጸር።',
      'Punnett Square በመጠቀም Monohybrid, Dihybrid, ABO Blood Groups እና X-linked Recessive ችግሮችን መፍታት።',
      'DNA Template strand ($3\'\\rightarrow 5\'$) ወደ mRNA ($5\'\\rightarrow 3\'$) እና ወደ Amino acid sequence መተርጎም።',
      'የHardy-Weinberg እኩልታዎችን ($p+q=1$, $p^2+2pq+q^2=1$) በመጠቀም Allele እና Carrier frequencies ማስላት።',
    ],
    sectionsAm: [
      {
        headingAm: '5.1 Cell Division, Genetics & ABO Blood Matrix',
        contentAm: `### 5.1.1 Mitosis vs Meiosis
- **S Phase**: DNA ይባዛል (Chromosome ቁጥር አይቀየርም፣ Sister chromatids ይፈጠራሉ)።
- **Meiosis I (Reductional)**: **Prophase I** = Synapsis & **Crossing-over** (Genetic recombination); **Metaphase I** = Homologous pairs align (Independent assortment); **Anaphase I** = **Homologous chromosomes** separate ($2n \\rightarrow n$)።
- **Meiosis II (Equational)**: **Anaphase II** = Sister chromatids separate (ለMitosis ይመሳሰላል!)።

### 5.1.2 ABO Blood Group Genetics (Multiple Alleles + Codominance)
- $I^A$ እና $I^B$ **Codominant** ናቸው፤ ሁለቱም በ$i$ ($O$) ላይ **Dominant** ናቸው።
- **Type A** ($I^AI^A$ or $I^Ai$), **Type B** ($I^BI^B$ or $I^Bi$), **Type AB** ($I^AI^B$), **Type O** ($ii$)።
- ወላጆች $I^Ai$ (Type A) እና $I^Bi$ (Type B) ከሆኑ **4ቱም የደም ዓይነቶች ($A, B, AB, O$) በ25% እኩል ዕድል** ሊወለዱ ይችላሉ!`,
      },
      {
        headingAm: '5.2 Molecular Central Dogma & Hardy-Weinberg Equations',
        contentAm: `### 5.2.1 DNA Replication & Gene Expression
- **DNA Replication**: Helicase unwinds helix; DNA Polymerase III synthesizes new DNA **ONLY in $5\' \\rightarrow 3\'$ direction** (requires RNA primer from Primase!). Lagging strand builds **Okazaki fragments** joined by **DNA Ligase**.
- **Transcription**: RNA Polymerase reads DNA **Template ($3\' \\rightarrow 5\'$)** to synthesize mRNA (**$5\' \\rightarrow 3\'$**) with **Uracil (U)** instead of Thymine (T). In Eukaryotes: $5\'$-cap, Poly-A tail, and **Introns removed / Exons spliced** by Spliceosome!
- **Frameshift Mutation**: Insertion/Deletion NOT a multiple of 3 shifts the entire reading frame (Far worse than silent/missense point mutation!).

### 5.2.2 Hardy-Weinberg Population Genetics
$$p + q = 1 \\qquad p^2 + 2pq + q^2 = 1$$
- $p$ = Dominant allele frequency ($A$)፤ $q$ = Recessive allele frequency ($a$)
- $p^2$ = Homozygous dominant ($AA$)፤ $2pq$ = Heterozygous carriers ($Aa$)፤ $q^2$ = Homozygous recessive ($aa$)`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'በአንድ ሕዝብ ውስጥ **4%** የሚሆኑት በAutosomal Recessive በሽታ ($aa$) የተጠቁ ናቸው (Population in Hardy-Weinberg equilibrium)። የCarrier ($Aa$) መቶኛ ስንት ነው?',
        stepsAm: [
          '1. Recessive phenotype $q^2 = 4\\% = 0.04$።',
          '2. $q = \\sqrt{0.04} = 0.20$።',
          '3. $p = 1 - q = 1 - 0.20 = 0.80$።',
          '4. Heterozygous Carriers ($2pq$) = $2(0.80)(0.20) = 0.32 = \\mathbf{32\\%}$!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'X-linked Recessive', termAm: 'በX-ክሮሞዞም የሚተላለፍ ሪሴሲቭ', definitionAm: 'በX ክሮሞዞም ላይ የሚገኝ Gene (ምሳሌ Hemophilia) — ወንዶች አንድ X ብቻ ስላላቸው ($X^h Y$) በቀላሉ ይጠቃሉ፤ ሴቶች ግን Carrier ($X^H X^h$) ሊሆኑ ይችላሉ።' },
      { termEn: 'Genetic Drift', termAm: 'ጄኔቲክ ድሪፍት', definitionAm: 'በትንሽ Population ውስጥ በድንገተኛ ዕድል ምክንያት የAllele frequency መለወጥ (Bottleneck & Founder effects)።' },
    ],
    examTrapsAm: [
      'X-linked Recessive ባህሪ **ከአባት ወደ ወንድ ልጅ በፍጹም አይተላለፍም!** (አባት ለወንድ ልጁ Y ክሮሞዞም ብቻ እንጂ X አይሰጠውም!)።',
      'Transcription ላይ **mRNA** ከCoding/Sense strand ጋር ተመሳሳይ ነው ($T \\rightarrow U$ ብቻ ይቀየራል)፤ ከTemplate/Antisense strand ጋር ግን Complementary ነው!',
    ],
    keyTakeawaysAm: [
      'DNA Polymerase ሁልጊዜ በ$5\' \\rightarrow 3\'$ አቅጣጫ ብቻ ነው አዲስ Nucleotide የሚጨምረው።',
      'Genetic variation የሚፈጠረው በCrossing-over (Prophase I), Independent Assortment (Metaphase I) እና Random Fertilization ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ የDNA Template strand $3\'-\\text{TAC GGC ACT}-5\'$ ከሆነ፣ የmRNA sequence ምን ይሆናል?',
        answerAm: 'መልስ፡ $5\'-\\mathbf{\\text{AUG CCG UGA}}-3\'$ (Start codon AUG $\\rightarrow$ Proline $\\rightarrow$ Stop codon UGA)።',
      },
    ],
  },

  'biol-mod-ch6': {
    subject: 'biology',
    chapterNumber: 6,
    titleAm: 'ምዕራፍ 6፡ ተላላፊ በሽታዎች እና የሰውነት በሽታ መከላከያ (Infectious Diseases & Immunity)',
    briefOverviewAm:
      'Koch’s Postulates, Causative Agents (Bacteria, Viruses, Fungi, Protozoa, Helminths, Prions), Innate (1st & 2nd Line) vs Adaptive Immunity (3rd Line: Humoral B-cells & Cell-mediated T-cells), Antibodies (IgG, IgM, IgA, IgE, IgD), Active vs Passive Immunity እና HIV/AIDS ያስተምራል።',
    briefPointsAm: [
      '3 Lines of Defense፡ 1st Line = Physical/Chemical barriers (Skin, Mucus, Stomach HCl, Lysozyme); 2nd Line = Non-specific Internal (Phagocytes, NK cells, Inflammation, Fever, Interferons); 3rd Line = Specific Adaptive Immunity with **Memory** (B & T lymphocytes)።',
      'Humoral (B-Cells $\\rightarrow$ Plasma cells secrete Antibodies) vs Cell-Mediated ($T_H$ CD4+ activates all; $T_C$ CD8+ kills virus-infected & cancer cells)።',
      '5 Antibody Classes (GAMED)፡ **IgG** (Most abundant, crosses Placenta!), **IgM** (First responder, Pentamer), **IgA** (Secretions/Breast milk, Dimer), **IgE** (Allergies/Parasites via Mast cells/Histamine), **IgD** (B-cell receptor)።',
      'Active Immunity (ሰውነት ራሱ Antibody ያመርታል — Long-lasting: Natural infection or Vaccine) vs Passive Immunity (ዝግጁ Antibody ይሰጣል — Immediate but Temporary: Maternal IgG/IgA or Antiserum)።',
    ],
    examTipAm:
      '**HIV (Retrovirus)** የሚያጠቃው **CD4+ Helper T-cells ($T_H$)**ን ነው! Helper T-cells ሁለቱንም B-cells እና Cytotoxic T-cells ስለሚያነቃቁ፣ ሲወድሙ ሙሉው Adaptive Immunity ይሽመደመዳል!',
    expandedOverviewAm:
      'Chapter 6 ሕክምናዊ ባዮሎጂን (**Microbiology & Immunology**) በጥልቀት ይሸፍናል። የPathogens ዓይነቶችን (Prokaryotic bacteria vs Acellular viruses with RNA/DNA vs Eukaryotic protozoa like *Plasmodium*/malaria & fungi vs Prions misfolded proteins)፣ Disease transmission routes፣ Koch\'s Postulates (እና ገደቦቻቸውን እንደ viruses & asymptomatic carriers)፣ Innate vs Adaptive Immunity፣ Antigen-Antibody specificity፣ Primary vs Secondary Immune Response (Memory cells making secondary response faster & stronger)፣ Active vs Passive (Natural & Artificial) Immunization፣ Autoimmune Diseases (Type 1 Diabetes, Rheumatoid Arthritis, Lupus)፣ Hypersensitivities/Allergies እና HIV Replication Cycle (Reverse Transcriptase, Integrase, Protease) ያስተምራል።',
    learningOutcomesAm: [
      'Koch’s Postulates እና 6ቱን ዋና Causative Agents (Bacteria, Virus, Fungi, Protozoa, Helminths, Prions) ማነጻጸር።',
      'የ1st, 2nd እና 3rd Line of Defense መከላከያዎችን ከሴሎቻቸው ጋር መለየት።',
      'B-cells (Humoral) እና Helper/Cytotoxic T-cells (Cell-mediated) በሽታን እንዴት እንደሚዋጉና የ5ቱን Immunoglobulins (IgG, IgM, IgA, IgE, IgD) ተግባር መግለጽ።',
      'Natural Active, Artificial Active (Vaccine), Natural Passive (Placenta/Milk) እና Artificial Passive (Antivenom) መለየት።',
    ],
    sectionsAm: [
      {
        headingAm: '6.1 Causative Agents & The Three Lines of Defense',
        contentAm: `### 6.1.1 Pathogens & Antibiotics Warning
- **Bacteria** (Prokaryotes, Peptidoglycan cell wall): **Antibiotics (e.g., Penicillin)** ባክቴሪያን ይገድላሉ።
- **Viruses** (DNA or RNA + Protein capsid; No metabolism of their own): **Antibiotics በፍጹም ቫይረስን አይገድሉም!** (Antivirals ብቻ ይውላሉ)።
- **Protozoa** (*Plasmodium falciparum* = Malaria via female *Anopheles* mosquito; *Leishmania*; *Trypanosoma*)።
- **Prions**: DNA/RNA የሌላቸው Misfolded proteins (Mad cow / Creutzfeldt-Jakob disease)።

### 6.1.2 Innate vs Adaptive Immunity
- **Innate (Non-specific, No Memory, Fast)**: Skin (keratin), Lysozyme in tears, Stomach acid ($\\text{pH } 1.5–2$), Neutrophils & Macrophages (Phagocytosis), Natural Killer (NK) cells (Perforin/Granzyme), Interferons (warn neighbor cells of viruses), Mast cells release **Histamine** (Vasodilation in inflammation)።
- **Adaptive (Specific, Memory, Slower primary response)**:
  - **Helper T-cells ($CD4^+$)**: "General" of immunity — recognize MHC Class II on APCs and release **Cytokines** to activate both B-cells and Cytotoxic T-cells!
  - **Cytotoxic T-cells ($CD8^+$)**: Recognize MHC Class I on all nucleated cells and induce apoptosis in infected/cancer cells.`,
      },
      {
        headingAm: '6.2 Active vs Passive Immunity & Immunoglobulin Classes',
        contentAm: `### 6.2.1 4 Types of Acquired Immunity
| Type | How Acquired | Memory? | Duration |
|---|---|---|---|
| **Natural Active** | Actual infection & recovery | **Yes** | Long-term / Lifelong |
| **Artificial Active** | **Vaccination** (Killed, attenuated, or mRNA antigen) | **Yes** | Long-term (Boosters) |
| **Natural Passive** | Maternal **IgG** (Placenta) & **IgA** (Colostrum/Breast milk) | No | Temporary (months) |
| **Artificial Passive** | Injection of preformed Antibodies (Snake antivenom, Rabies Ig) | No | Immediate, Temporary |`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ ሰው በመርዛማ እባብ ቢነደፍ ወዲያውኑ Antivenom (preformed antibodies) ይወጋል እንጂ Vaccine አይሰጠውም — ለምን?',
        stepsAm: [
          '1. Vaccine (Artificial Active) ሰውነት ራሱ B-cellsን አነቃቅቶ Antibody እስኪሠራ 1–2 ሳምንት ይፈጃል።',
          '2. የእባብ መርዝ በሰዓታት ውስጥ ስለሚገድል **ወዲያውኑ ገለልተኛ የሚያደርግ Artificial Passive Immunity (Antivenom)** የግድ ያስፈልጋል!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Antigen', termAm: 'አንቲጅን', definitionAm: 'በሰውነት ውስጥ የAdaptive Immune ምላሽን (Antibody ወይም T-cell ምላሽ) የሚቀሰቅስ የውጭ ሞለኪውል።' },
      { termEn: 'Herd Immunity', termAm: 'የማህበረሰብ ከለላ', definitionAm: 'አብዛኛው ሕዝብ በክትባት ወይም በበሽታ መከላከያ ሲጠበቅ ወረርሽኙ መስፋፋት የሚቆምበት ሁኔታ።' },
    ],
    examTrapsAm: [
      '**IgG** ብቻ ነው Placentaን አቋርጦ ወደ ፅንስ የሚደርሰው፤ **IgM** ግን ትልቅ Pentamer ስለሆነ Placenta አያቋርጥም (ስለዚህ በአዲስ ሕፃን ውስጥ ከፍተኛ IgM ከተገኘ ፅንሱ ራሱ በማህፀን ውስጥ መታመሙን ያሳያል!)።',
      'Antibiotics on Viruses = 0% ውጤት (Resistance ብቻ ያመጣል!)።',
    ],
    keyTakeawaysAm: [
      'Secondary immune response ከPrimary እጅግ ፈጣን፣ ጠንካራ እና ዘላቂ የሚሆነው በ**Memory B and T cells** ምክንያት ነው።',
      'B-cells በBone marrow ይበስላሉ (Bone marrow = B)፤ T-cells በThymus gland ይበስላሉ (Thymus = T)።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በAllergy (ለምሳሌ Asthma/Anaphylaxis) ጊዜ ከMast cells ላይ Histamine እንዲለቀቅ የሚያደርገው Antibody የቱ ነው?',
        answerAm: 'መልስ፡ **IgE**!',
      },
    ],
  },

  'biol-mod-ch7': {
    subject: 'biology',
    chapterNumber: 7,
    titleAm: 'ምዕራፍ 7፡ የፍጥረታት Taxonomy፣ Binomial Nomenclature እና ሦስቱ Domains',
    briefOverviewAm:
      'Taxonomy & Systematics, Aristotle to Carl Linnaeus, Binomial Nomenclature Rules, 8 Taxonomic Hierarchies (DKPCOFGS), Five-Kingdom vs Three-Domain System (Woese 1990: Bacteria, Archaea, Eukarya), Dichotomous Keys እና Cladistics (Monophyletic/Paraphyletic/Polyphyletic) ያስተምራል።',
    briefPointsAm: [
      'Taxonomic Hierarchy (ሰፊ $\\rightarrow$ ጠባብ)፡ **Domain > Kingdom > Phylum > Class > Order > Family > Genus > Species** ("Dear King Philip Came Over For Good Soup")።',
      'Binomial Nomenclature (Linnaeus)፡ *Genus* (Capitalized) + *species* (lowercase) — በ**Italics** (*Homo sapiens*) ወይም በእጅ ሲጻፍ **በተናጠል Underlined** (*<u>Homo</u> <u>sapiens</u>*)።',
      'Three-Domain System (Carl Woese via **16S rRNA** sequencing)፡ **Bacteria** (Peptidoglycan), **Archaea** (Extremophiles, NO peptidoglycan, histones & introns like Eukarya!), እና **Eukarya** (Protista, Fungi, Plantae, Animalia)።',
      'Cladistics፡ Monophyletic clade (Common ancestor + ALL descendants — True taxon!) vs Paraphyletic (Missing some descendants) vs Polyphyletic (Different ancestors)።',
    ],
    examTipAm:
      '**Archaea** Prokaryotes ቢሆኑም በMolecular genetics (rRNA, Histones, Absence of Peptidoglycan, Methionine start) ከBacteria ይልቅ **ለEukarya** በዝግመተ ለውጥ ይቀርባሉ!',
    expandedOverviewAm:
      'Chapter 7 የሕያዋን ፍጥረታትን ሳይንሳዊ ምደባ (**Taxonomy & Phylogenetics**) ያስተምራል። ከAristotle የመጀመሪያ ምደባ እስከ Carl Linnaeus Binomial Nomenclature፣ Taxonomic Ranks (Domain to Species)፣ የWhittaker 5 Kingdoms (Monera, Protista, Fungi, Plantae, Animalia) እድገት ወደ Carl Woese **3 Domains** (በ16S rRNA comparison የተገኘ)፣ የእያንዳንዱ Kingdom ልዩ መለያ ባህሪያት (Cell wall: Bacteria = Peptidoglycan, Fungi = Chitin, Plantae = Cellulose, Animalia = None; Nutrition: Autotroph vs Heterotroph absorption/ingestion)፣ Homologous vs Analogous structures እና Dichotomous Keys አጠቃቀምን በጥልቀት ይሸፍናል።',
    learningOutcomesAm: [
      '8ቱን የTaxonomic Hierarchy ደረጃዎች ከDomain እስከ Species በቅደም ተከተል መዘርዘርና በጋራ Class/Order ያሉ ፍጥረታትን ዝምድና መለየት።',
      'የBinomial Nomenclature ጽሑፍ ሕጎችን በትክክል መተግበር።',
      'Bacteria, Archaea እና Eukarya (Protista, Fungi, Plantae, Animalia)ን በCell type, Cell wall, Nutrition እና Molecular traits ማነጻጸር።',
      'Dichotomous Key ማንበብና Cladogram ላይ Monophyletic Cladesን እና Homology vs Analogy (Convergent Evolution) መለየት።',
    ],
    sectionsAm: [
      {
        headingAm: '7.1 Three Domains & Four Eukaryotic Kingdoms Matrix',
        contentAm: `### 7.1.1 Complete Classification Table
| Domain / Kingdom | Cell Type | Cell Wall | Nutrition Mode | Key Examples |
|---|---|---|---|---|
| **Domain Bacteria** | Prokaryotic | **Peptidoglycan** | Autotrophic / Heterotrophic | *E. coli*, Cyanobacteria, *Mycobacterium* |
| **Domain Archaea** | Prokaryotic | Pseudopeptidoglycan (**No Peptidoglycan**) | Chemotrophic / Extremophiles | Methanogens, Halophiles, Thermophiles |
| **Kingdom Protista** | Eukaryotic (Mostly unicellular) | Various / Cellulose / None | Autotrophic (Algae) & Heterotrophic | *Amoeba*, *Paramecium*, *Plasmodium*, Kelp |
| **Kingdom Fungi** | Eukaryotic (Multicellular except Yeast) | **Chitin** | **Absorptive Heterotroph** (Saprophytic) | Yeast, Mushrooms, *Penicillium* |
| **Kingdom Plantae** | Eukaryotic Multicellular | **Cellulose** | Photoautotrophic | Mosses, Ferns, Gymnosperms, Angiosperms |
| **Kingdom Animalia** | Eukaryotic Multicellular | **None** | **Ingestive Heterotroph** | Sponges, Arthropods, Chordates (Walia Ibex) |`,
      },
      {
        headingAm: '7.2 Nomenclature Rules, Homology vs Analogy & Cladistics',
        contentAm: `### 7.2.1 ዋና የፈተና ነጥቦች
- **Binomial Rule**: *Canis simensis* (Ethiopian Wolf) — Genus = *Canis* (Capital C), species epithet = *simensis* (lowercase s); በእጅ ሲጻፍ ሁለቱም **በተናጠል** ይሰመሩ (*<u>Canis</u> <u>simensis</u>*)።
- **Homologous Structures** (Divergent Evolution): ተመሳሳይ የአጥንት መዋቅር ከጋራ አያት ነገር ግን የተለየ ተግባር (የሰው እጅ፣ የዓሣ ነባሪ መቅዘፊያ፣ የሌሊት ወፍ ክንፍ)።
- **Analogous Structures** (Convergent Evolution): የተለየ አመጣጥ ግን በተመሳሳይ አካባቢ ምክንያት ተመሳሳይ ተግባር (የወፍ ክንፍ vs የቢራቢሮ ክንፍ)!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'ሁለት እንስሳት በአንድ **Order** ውስጥ ከሆኑ፣ በግዴታ በአንድ ______ ውስጥም መሆን አለባቸው፤ ነገር ግን በአንድ ______ ውስጥ ላይሆኑ ይችላሉ።',
        stepsAm: [
          '1. Hierarchy: Domain > Kingdom > Phylum > Class > **Order** > Family > Genus > Species።',
          '2. አንድ Order ውስጥ ያሉ ሁሉም ፍጥረታት በግዴታ ከላይ ያሉትን (**Domain, Kingdom, Phylum, Class**) ይጋራሉ!',
          '3. ከታች ያሉት (**Family, Genus, Species**) ግን ሊለያዩ ይችላሉ።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Monophyletic Clade', termAm: 'ሞኖፋይለቲክ ክሌድ', definitionAm: 'አንድ የጋራ አያት እና ከእርሱ የወጡትን ሁሉንም ዝርያዎች ያካተተ ትክክለኛ የTaxon ቡድን።' },
      { termEn: '16S rRNA', termAm: '16S ራይቦዞማል አርኤንኤ', definitionAm: 'Carl Woese ሕያዋንን በ3 Domains (Bacteria, Archaea, Eukarya) ለመከፋፈል የተጠቀመበት ሞለኪውላዊ መለኪያ።' },
    ],
    examTrapsAm: [
      'Fungi **እፅዋት አይደሉም!** Chlorophyll የላቸውም (Heterotrophic decomposers) እና Cell wallአቸው ከCellulose ሳይሆን ከ**Chitin** የተሠራ ነው!',
      '*<u>Homo sapiens</u>* በአንድ ቀጥ ያለ መስመር መስመር ስህተት ነው — *<u>Homo</u> <u>sapiens</u>* ተነጣጥሎ መሰመር አለበት!',
    ],
    keyTakeawaysAm: [
      'Species = በተፈጥሮ ተራብተው የሚራባ (Fertile) ልጅ መውለድ የሚችሉ ተመሳሳይ ፍጥረታት (Mayr\'s Biological Species Concept)።',
      'Cladograms የሚገነቡት በ**Shared Derived Characters (Synapomorphies)** ላይ ተመሥርቶ ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ *Panthera leo* (አንበሳ) እና *Panthera pardus* (ነብር) የሚጋሩት እስከ የትኛው Taxonomic Rank ድረስ ነው?',
        answerAm: 'መልስ፡ እስከ **Genus (*Panthera*)** ድረስ ይጋራሉ (Domain, Kingdom, Phylum, Class, Order, Family, Genus ተመሳሳይ፤ Species ብቻ ይለያያል)።',
      },
    ],
  },

  'biol-mod-ch8': {
    subject: 'biology',
    chapterNumber: 8,
    titleAm: 'ምዕራፍ 8፡ ሥነ-ምህዳር፣ የኃይል ፍሰት እና የተፈጥሮ ሀብት ጥበቃ (Ecology & Conservation)',
    briefOverviewAm:
      'Ecosystems (Biotic vs Abiotic), Trophic Levels & 10% Energy Rule (Lindeman), Ecological Pyramids, Biogeochemical Cycles (Carbon, Nitrogen Fixing/Nitrification/Denitrification, Phosphorus), Biodiversity, Ethiopian Endemic Hotspots እና Pollution/Climate Change ያስተምራል።',
    briefPointsAm: [
      '10% Rule (Energy Pyramid)፡ ከአንድ Trophic level ወደ ቀጣዩ የሚተላለፈው ~10% ኃይል ብቻ ነው (~90% በRespiration/Heat ይጠፋል) — ስለዚህ Energy Pyramid **ሁልጊዜ ቀጥ ያለ (Upright)** ነው!',
      'Nitrogen Cycle (4 ቁልፍ ባክቴሪያዎች)፡ Nitrogen Fixation ($\\text{N}_2 \\rightarrow \\text{NH}_3$ by *Rhizobium* & *Azotobacter*) $\\rightarrow$ Nitrification ($\\text{NH}_4^+ \\rightarrow \\text{NO}_2^- \\rightarrow \\text{NO}_3^-$ by *Nitrosomonas* & *Nitrobacter*) $\\rightarrow$ Assimilation $\\rightarrow$ Denitrification ($\\text{NO}_3^- \\rightarrow \\text{N}_2$ by *Pseudomonas*)።',
      'Ecological Succession፡ Primary (Bare rock without soil — Pioneer = Lichens/Mosses) vs Secondary (Soil remains after fire/farming — much faster!)።',
      'Ethiopian Biodiversity & Conservation፡ Endemic animals (*Canis simensis* Ethiopian Wolf, *Capra walie* Walia Ibex, *Theropithecus gelada*, *Tragelaphus buxtoni* Mountain Nyala)፤ In-situ (National Parks like Bale/Simien) vs Ex-situ (Seed banks EBI, Zoos)።',
    ],
    examTipAm:
      '**Energy Flows One-Way** (ከፀሐይ ወደ Producers $\\rightarrow$ Consumers $\\rightarrow$ Heat ይጠፋል፤ Recycle አይሆንም!)፣ **Nutrients (C, N, P, Water) ግን በDecomposers አማካኝነት Recycle ይደረጋሉ!**',
    expandedOverviewAm:
      'Chapter 8 ሕያዋን ፍጥረታት ከአካባቢያቸው ጋር ያላቸውን መስተጋብር (**Ecology**) እና **Conservation Biology**ን ያስተምራል። Biotic & Abiotic factors፣ Community interactions (Mutualism $+/+$, Commensalism $+/0$, Parasitism/Predation $+/-$, Competition $-/-$, Competitive Exclusion Principle)፣ Logistic vs Exponential Population Growth ($\\frac{dN}{dt} = rN(1 - N/K)$ & Carrying Capacity $K$)፣ Food Chains/Webs, Biomagnification (DDT/Mercury accumulating in top predators)፣ Carbon, Nitrogen & Phosphorus (NO atmospheric gas phase!) Cycles፣ Eutrophication ($N/P$ runoff causing algal blooms & hypoxia)፣ Greenhouse Effect vs Ozone Depletion (CFCs) እና የኢትዮጵያ Endemic Biodiversity ጥበቃን ይሸፍናል።',
    learningOutcomesAm: [
      'በTrophic Levels መካከል ያለውን የ10% የኃይል ዝውውር ማስላትና ለምን Food chains 4–5 ደረጃ ብቻ እንደሚኖራቸው ማብራራት።',
      'የNitrogen Cycle ባክቴሪያዎችን (Fixation, Nitrification, Ammonification, Denitrification) ሚና መለየት።',
      'Primary vs Secondary Succession እና Mutualism, Commensalism, Parasitism & Competition መለየት።',
      'In-situ vs Ex-situ Conservation፣ Eutrophication እና Biomagnification እንዴት እንደሚከሰቱ ማስረዳት።',
    ],
    sectionsAm: [
      {
        headingAm: '8.1 Trophic Energetics, 10% Rule & Biogeochemical Cycles',
        contentAm: `### 8.1.1 10% Rule & Ecological Pyramids
- **Producers ($10,000\\text{ J}$)** $\\rightarrow$ **Primary Consumers ($1,000\\text{ J}$)** $\\rightarrow$ **Secondary ($100\\text{ J}$)** $\\rightarrow$ **Tertiary ($10\\text{ J}$)**!
- **Inverted Pyramids**: Pyramid of Numbers (1 tree supporting 10,000 insects) እና Pyramid of Biomass (phytoplankton reproducing rapidly to support heavier zooplankton) Inverted ሊሆኑ ይችላሉ፤ **Pyramid of Energy ግን በፍጹም Inverted አይሆንም** (2nd Law of Thermodynamics)!

### 8.1.2 Nitrogen Cycle Enzymes & Bacteria
| Step | Chemical Conversion | Key Microorganisms |
|---|---|---|
| **Nitrogen Fixation** | $\\text{N}_2 \\rightarrow \\text{NH}_3 / \\text{NH}_4^+$ | *Rhizobium* (in legume root nodules), Cyanobacteria |
| **Nitrification** | $\\text{NH}_4^+ \\rightarrow \\text{NO}_2^- \\rightarrow \\text{NO}_3^-$ | *Nitrosomonas* ($\\rightarrow \\text{NO}_2^-$), *Nitrobacter* ($\\rightarrow \\text{NO}_3^-$) |
| **Ammonification** | Organic N (dead waste) $\\rightarrow \\text{NH}_4^+$ | Decomposer bacteria & fungi |
| **Denitrification** | $\\text{NO}_3^- \\rightarrow \\text{N}_2\\text{ (gas)}$ (Anaerobic!) | *Pseudomonas* (returns N to atmosphere) |`,
      },
      {
        headingAm: '8.2 Environmental Threats & Ethiopian Conservation Hotspots',
        contentAm: `### 8.2.1 Environmental Issues Distinction
- **Eutrophication**: ከእርሻ የሚታጠቡ Nitrate ($\\text{NO}_3^-$) እና Phosphate ($\\text{PO}_4^{3-}$) በሐይቆች ውስጥ Algae እንዲያብብ ያደርጋሉ $\\rightarrow$ ሲሞቱ ባክቴሪያ $\\text{O}_2$ ስለሚጨርስ ዓሦች ይሞታሉ (**Hypoxia**)!
- **Biomagnification**: የማይፈርሱ መርዞች (DDT, Methylmercury) ከታችኛው Trophic level ወደ Top Predators ሲወጡ Concentration በከፍተኛ ሁኔታ ይጨምራል።
- **Global Warming** ($\text{CO}_2, \text{CH}_4, \text{N}_2\text{O}$ trapping Infrared heat) vs **Ozone Layer Depletion** (CFCs destroying Stratospheric $\\text{O}_3$ UV shield) — የተለያዩ ክስተቶች ናቸው!
- **Ethiopia Hotspots**: Eastern Afromontane (Bale Mountains — Ethiopian Wolf, Simien Mountains — Walia Ibex & Gelada, Lake Tana — endemic *Labeobarbus* fish)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ የሳር መስክ (Producers) በዓመት **$250,000\\text{ kJ}$** ኃይል ቢያመርት፣ Tertiary Consumers (4th Trophic Level) ምን ያህል ኃይል ያገኛሉ?',
        stepsAm: [
          '1. Level 1 (Producers) = $250,000\\text{ kJ}$.',
          '2. Level 2 (Primary Consumers, 10%) = $25,000\\text{ kJ}$.',
          '3. Level 3 (Secondary Consumers, 10%) = $2,500\\text{ kJ}$.',
          '4. Level 4 (Tertiary Consumers, 10%) = **$\\mathbf{250\\text{ kJ}}$**!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Carrying Capacity ($K$)', termAm: 'የመሸከም አቅም ($K$)', definitionAm: 'አንድ አካባቢ ባለው ውስን ሀብት (ምግብ፣ ቦታ፣ ውኃ) በዘላቂነት ሊይዘው የሚችለው ከፍተኛው የPopulation ብዛት።' },
      { termEn: 'In-situ Conservation', termAm: 'በተፈጥሮ ቦታው ጥበቃ', definitionAm: 'ዝርያዎችን በራሳቸው ተፈጥሯዊ መኖሪያ (ብሔራዊ ፓርኮች፣ ጥብቅ ደኖች) ውስጥ መጠበቅ።' },
    ],
    examTrapsAm: [
      '**Phosphorus Cycle** Atmospheric gas phase **የለውም!** ዋናው ምንጭ ከድንጋይ መሸርሸር (Weathering of rocks) ነው።',
      'እፅዋት ከአየር $\\text{N}_2$ በቀጥታ መጠቀም አይችሉም — በNitrate ($\\text{NO}_3^-$) ወይም Ammonium ($\\text{NH}_4^+$) መልክ ብቻ ይወስዳሉ።',
    ],
    keyTakeawaysAm: [
      'Biodiversity Loss ዋና ምክንያቶች (**HIPPO**): Habitat destruction (1st!), Invasive species, Pollution, Population growth, Overexploitation።',
      'Secondary Succession ቀድሞ አፈር ስላለው ከPrimary Succession በመቶዎች ዓመታት ይፈጥናል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በአንድ ሐይቅ ውስጥ DDT መርዝ በውኃ ውስጥ 0.0001 ppm ቢሆን፣ ከፍተኛው Concentration የሚገኘው በAlgae፣ በትንሽ ዓሣ ወይስ በዓሣ አዳኝ አሞራ (Osprey) ውስጥ ነው?',
        answerAm: 'መልስ፡ በ**ዓሣ አዳኝ አሞራ (Top Predator)** ውስጥ (በ**Biomagnification** ምክንያት)!',
      },
    ],
  },

  'biol-mod-ch9': {
    subject: 'biology',
    chapterNumber: 9,
    titleAm: 'ምዕራፍ 9፡ የእፅዋት (Botany) እና የእንስሳት (Zoology) ሳይንስ መግቢያ',
    briefOverviewAm:
      'Major Plant Groups (Bryophytes, Pteridophytes, Gymnosperms, Angiosperms: Monocot vs Dicot), Xylem vs Phloem Transport, Plant Hormones (Auxin, Gibberellin, Ethylene, ABA), Invertebrate Phyla (Porifera to Arthropoda/Echinodermata), Chordata & Homeostasis ያስተምራል።',
    briefPointsAm: [
      '4 Plant Divisions፡ Bryophytes (Non-vascular Mosses, Dominant Gametophyte), Pteridophytes (Seedless vascular Ferns), Gymnosperms (Naked seeds in cones — *Juniperus/Podocarpus*), Angiosperms (Flowering covered seeds + **Double Fertilization**!)።',
      'Xylem (Water & Minerals unidirectional Upward via **Cohesion-Tension/Transpiration** — Dead cells!) vs Phloem (Sugars bidirectional Source $\\rightarrow$ Sink via **Pressure-Flow Hypothesis** — Living Sieve-tube cells!)።',
      'Monocot vs Dicot፡ Monocot (1 cotyledon, Parallel veins, Scattered vascular bundles, Petals $\\times 3$, Fibrous root) vs Dicot (2 cotyledons, Netted veins, Ringed bundles, Petals $\\times 4/5$, Taproot)።',
      'Chordate 4 Key Traits፡ Notochord, Dorsal hollow nerve cord, Pharyngeal gill slits, Post-anal tail (Ectotherms = Fish, Amphibians, Reptiles vs Endotherms = Birds & Mammals)።',
    ],
    examTipAm:
      'Angiosperms (Flowering Plants) ልዩ መለያቸው **Double Fertilization** ነው፡ አንዱ Sperm + Egg $\\rightarrow$ Diploid **Zygote ($2n$)**፤ ሁለተኛው Sperm + 2 Polar nuclei $\\rightarrow$ Triploid **Endosperm ($3n$)**!',
    expandedOverviewAm:
      'Chapter 9 የOrganismal Biology ሁለቱን ታላላቅ ዘርፎች **Botany (እፅዋት)** እና **Zoology (እንስሳት)** ያዋህዳል። በBotany ውስጥ Alternation of Generations (Gametophyte $n$ vs Sporophyte $2n$)፣ 4ቱን ዋና የእፅዋት ቡድኖች (Bryophytes, Pteridophytes, Gymnosperms, Angiosperms)፣ Monocot vs Dicot ንጽጽርን፣ Xylem (Tracheids & Vessels) እና Phloem (Sieve-tube & Companion cells) አሠራርን እና 5ቱን ዋና Plant Hormones (Auxin, Gibberellins, Cytokinins, Abscisic Acid/ABA, Ethylene) ያስተምራል። በZoology ውስጥ ደግሞ Symmetry (Asymmetry, Radial, Bilateral), Body Cavities (Acoelomate, Pseudocoelomate, Coelomate)፣ 9ኙን ዋና Animal Phyla (Porifera, Cnidaria, Platyhelminthes, Nematoda, Annelida, Mollusca, Arthropoda — 80% of all animals!, Echinodermata, Chordata) እና Vertebrate Classes + Negative/Positive Homeostatic Feedback Systems ያብራራል።',
    learningOutcomesAm: [
      'Bryophytes, Ferns, Gymnosperms እና Angiospermsን በVascular tissue, Seed/Fruit እና Dominant generation ማነጻጸር።',
      'Monocot እና Dicot እፅዋትን (Root, Stem vascular bundles, Leaf venation, Flower parts) መለየት።',
      'Xylem Transpiration-Cohesion-Tension እና Phloem Pressure-Flow ዘዴዎችን እና የ5ቱን Plant Hormones ተግባር መግለጽ።',
      '9ኙን ዋና Animal Phyla በSymmetry, Coelom እና ልዩ መለያ ባህሪያቸው (Cnidocytes, Exoskeleton, Water vascular system, Notochord) መለየት።',
    ],
    sectionsAm: [
      {
        headingAm: '9.1 Botany: Plant Groups, Monocot vs Dicot & Hormones',
        contentAm: `### 9.1.1 ዋና የእፅዋት ቡድኖች እና ሆርሞኖች
- **Bryophytes (Mosses)**: Xylem/Phloem የላቸውም፤ የውኃ ትራንስፖርት በDiffusion ስለሆነ ትናንሽ ናቸው፤ Sperm ለመዋኘት **ውኃ ይፈልጋል**።
- **Angiosperms**: Vascular, Seeds inside **Fruit (Ovary)**, **Double fertilization** ($2n$ Embryo + $3n$ Endosperm)።
- **Plant Hormones**:
  - **Auxin (IAA)**: Apical dominance, Phototropism (Cell elongation on shaded side)።
  - **Gibberellins**: Stem elongation, **Seed germination**።
  - **Cytokinins**: Cell division (Cytokinesis), delays leaf senescence።
  - **Abscisic Acid (ABA)**: Stress hormone — **Seed dormancy** & **Stomatal closure** during drought!
  - **Ethylene (Gas)**: **Fruit ripening** & Leaf abscission!`,
      },
      {
        headingAm: '9.2 Zoology: Major Animal Phyla & Homeostatic Feedback',
        contentAm: `### 9.2.1 Animal Phyla Master Table
| Phylum | Symmetry / Cavity | Key Defining Feature | Examples |
|---|---|---|---|
| **Porifera** | Asymmetrical, No true tissues | Pores, Choanocytes | Sponges |
| **Cnidaria** | Radial, Diploblastic | **Cnidocytes (Nematocysts)** | Jellyfish, Hydra, Coral |
| **Platyhelminthes** | Bilateral, Acoelomate | Flatworms, Flame cells | Tapeworm, *Schistosoma* |
| **Nematoda** | Bilateral, **Pseudocoelomate** | Unsegmented roundworms | *Ascaris*, Hookworm |
| **Annelida** | Bilateral, Coelomate | **Segmented body**, Nephridia | Earthworm, Leech |
| **Mollusca** | Bilateral, Coelomate | Muscular foot, Mantle, Radula | Snail, Octopus, Clam |
| **Arthropoda** | Bilateral, Coelomate | **Chitinous Exoskeleton + Jointed appendages** (Largest phylum!) | Insects, Spiders, Crabs |
| **Echinodermata** | Radial (adult), Deuterostome | **Water vascular system**, Tube feet | Starfish, Sea urchin |
| **Chordata** | Bilateral, Deuterostome | Notochord, Dorsal nerve cord, Gill slits, Tail | Fish, Amphibians, Reptiles, Birds, Mammals |

### 9.2.2 Animal Homeostasis
- **Negative Feedback** (99% — stabilizes): Blood glucose (Insulin lowers, Glucagon raises), Thermoregulation (Sweating/Vasodilation vs Shivering/Vasoconstriction)።
- **Positive Feedback** (Amplifies): **Oxytocin** during childbirth contractions, Blood clotting cascade!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ ተክል **Parallel leaf veins**, **6 petals (multiples of 3)** እና በግንዱ ውስጥ **Scattered vascular bundles** ካሉት Monocot ነው ወይስ Dicot?',
        stepsAm: [
          '1. Parallel venation = Monocot.',
          '2. Flower parts in multiples of 3 ($6 = 2 \\times 3$) = Monocot.',
          '3. Scattered vascular bundles = Monocot (ለምሳሌ Teff, Maize, Wheat, Banana) $\\implies$ **Monocotyledon**!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Transpiration', termAm: 'ትራንስፓይሬሽን', definitionAm: 'ውኃ በእፅዋት ቅጠል Stomata በኩል ወደ አየር በትነት ሲወጣ ከሥር ውኃን ወደ ላይ የሚስብ ኃይል።' },
      { termEn: 'Endotherm vs Ectotherm', termAm: 'ኢንዶተርም vs ኤክቶተርም', definitionAm: 'Endotherms (Birds, Mammals) የውስጥ ሙቀታቸውን በMetabolism ይጠብቃሉ፤ Ectotherms (Fish, Amphibians, Reptiles) ከውጭ አካባቢ ሙቀት ያገኛሉ።' },
    ],
    examTrapsAm: [
      'Arthropoda (insects, crabs) **እጅግ ትልቁ Phylum** (ከ80% በላይ የእንስሳት ዝርያዎች) ሲሆን፣ **Echinodermata** (Starfish) የDeuterostome phylum ስለሆነ ከArthropods/Molluscs ይልቅ **ለChordates** (ለኛ) ይቀርባል!',
      'Phloem **Living cells** (Sieve tubes supported by Companion cells) ሲሆን፣ Xylem (Vessels/Tracheids) ግን ሲበስሉ **Dead hollow cells** ናቸው።',
    ],
    keyTakeawaysAm: [
      'Ethylene ብቸኛው በጋዝ መልክ የሚገኝ Plant Hormone ሲሆን ፍራፍሬዎችን ያበስላል።',
      'Insulin (Beta cells) የደም ስኳር ይቀንሳል፤ Glucagon (Alpha cells) ደግሞ ይጨምራል (Negative feedback)።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በአንዲት ሞቃታማ ቀን ተክሉ ውኃ እንዳያጣ Stomata እንዲዘጋ የሚያዘው የእፅዋት ሆርሞን ማን ነው?',
        answerAm: 'መልስ፡ **Abscisic Acid (ABA)**!',
      },
    ],
  },

  'biol-mod-ch10': {
    subject: 'biology',
    chapterNumber: 10,
    titleAm: 'ምዕራፍ 10፡ የባዮሎጂ ሳይንስ አጠቃቀም — Biotechnology, PCR, Forensics & CRISPR',
    briefOverviewAm:
      'Biotechnology in Medicine (Recombinant Insulin, Monoclonal Antibodies, Gene Therapy), Agriculture (GMOs, Bt crops), Biosensors & Bioremediation, DNA Fingerprinting/Forensics (STRs & Gel Electrophoresis), Biowarfare እና Recombinant DNA, PCR & CRISPR-Cas9 ያስተምራል።',
    briefPointsAm: [
      'Recombinant DNA Tools፡ **Restriction Enzymes** ("Molecular scissors" — cut specific palindromic DNA sequences making Sticky/Blunt ends) + **DNA Ligase** ("Molecular glue" — joins sugar-phosphate backbone) + Plasmid vector።',
      'PCR (Polymerase Chain Reaction — Kary Mullis)፡ 3 repeating thermal cycles: **1) Denaturation ($94–95^\\circ\\text{C}$)** $\\rightarrow$ **2) Annealing ($50–65^\\circ\\text{C}$, Primers bind)** $\\rightarrow$ **3) Extension ($72^\\circ\\text{C}$, Heat-stable *Taq* polymerase)** ($2^n$ amplification!)።',
      'Gel Electrophoresis፡ DNA Negatively charged (Phosphate groups!) ስለሆነ ወደ **Positive Anode** ይጓዛል፤ **ትናንሽ fragments ከትላልቆቹ በፍጥነት** ይጓዛሉ!',
      'CRISPR-Cas9፡ Guide RNA (gRNA) ዒላማውን DNA ፈልጎ ሲያገኝ **Cas9 endonuclease** በትክክል ይቆርጠዋል (Precision gene editing!)።',
    ],
    examTipAm:
      'በPCR ውስጥ የተለመደ የሰው DNA Polymerase አይሠራም — ምክንያቱም በ$95^\\circ\\text{C}$ Denaturation ጊዜ Denature ስለሚሆን ከThermophilic bacterium (*Thermus aquaticus*) የሚገኘው **Taq Polymerase** ብቻ ይውላል!',
    expandedOverviewAm:
      'Chapter 10 የተማርነውን የባዮሎጂ እውቀት በዘመናዊ ኢንዱስትሪ፣ ሕክምና፣ ግብርና፣ ፍትሕ (Forensics) እና አካባቢ ጥበቃ እንዴት እንደሚተገበር (**Applied Biology & Biotechnology**) ያሳያል። Genetic Engineering (Recombinant human insulin Humulin in *E. coli*), Vaccines (mRNA, Subunit, Viral vector), Monoclonal Antibodies, Stem Cell & Gene Therapy, Biofuels & Bioremediation (using *Pseudomonas* to clean oil spills), Biosensors (Glucose meter using glucose oxidase), DNA Fingerprinting via **STRs (Short Tandem Repeats)** & Gel Electrophoresis, Biological Warfare Agents (Anthrax *Bacillus anthracis*, Smallpox, Botulinum toxin — CDC Category A), PCR Exponential Amplification እና CRISPR-Cas9 Genome Editing በጥልቀት ይሸፈናሉ።',
    learningOutcomesAm: [
      'Restriction Enzymes, DNA Ligase እና Plasmid Vectors Recombinant DNA ለመሥራት እንዴት እንደሚያገለግሉ መግለጽ።',
      'የPCR ሦስቱን ደረጃዎች (Denaturation, Annealing, Extension), የሙቀት መጠናቸውን እና $2^n$ DNA amplification ማስላት።',
      'Gel Electrophoresis Banding Patterns (Paternity test & Crime scene DNA matching) እና STRsን መተርጎም።',
      'Bioremediation, Biosensors, Bt-crops, Monoclonal Antibodies እና CRISPR-Cas9 አሠራርን ማብራራት።',
    ],
    sectionsAm: [
      {
        headingAm: '10.1 Recombinant DNA, PCR & Gel Electrophoresis',
        contentAm: `### 10.1.1 PCR Thermal Cycling (3 Steps)
| Step | Temp | What Happens |
|---|---|---|
| **1. Denaturation** | $\\approx 95^\\circ\\text{C}$ | H-bonds between double-stranded DNA break $\\rightarrow$ single strands. |
| **2. Annealing** | $\\approx 55^\\circ\\text{C}$ | Forward & reverse DNA **primers** hybridize to target sequences. |
| **3. Extension** | $\\approx 72^\\circ\\text{C}$ | Heat-stable **Taq DNA Polymerase** synthesizes new strands ($5\'\\rightarrow 3\'$). |

- **Amplification Formula**: ከ$n$ Cycles በኋላ የሚገኘው የDNA ቅጂ ብዛት $\\approx N_0 \\times 2^n$! (30 cycles $\\rightarrow 2^{30} > 1\\text{ billion copies}$!)።

### 10.1.2 Forensics & Gel Electrophoresis
- **DNA Charge**: በPhosphate backbone ምክንያት **Negative ($-$)** ስለሆነ ከCathode ($-$) ወደ **Anode ($+$)** ይፈልሳል።
- **Size Separation**: Agarose gel እንደ ወንፊት (Sieve) ስለሚሠራ **አጫጭር (Smaller) DNA fragments ርቀው ይሄዳሉ**፤ ረጃጅሞቹ ከWells አጠገብ ይቀራሉ።
- **Paternity Testing**: የልጁ እያንዳንዱ DNA band ከእናቱ **ወይም** ከባዮሎጂካል አባቱ መምጣት አለበት!`,
      },
      {
        headingAm: '10.2 Medicine, Biosensors, Bioremediation & Biowarfare',
        contentAm: `### 10.2.1 Applied Biotechnology Highlights
- **Medicine**: Recombinant Human Insulin (*E. coli* engineered with human insulin gene — no allergic reaction unlike pig insulin!), Monoclonal antibodies (Hybridoma cells for targeted cancer therapy & pregnancy tests).
- **Biosensor**: Biological recognition element (Enzyme/Antibody) + Physicochemical Transducer (ምሳሌ፡ Glucometer uses **Glucose oxidase** enzyme!).
- **Bioremediation**: ባክቴሪያና ፈንገስን በመጠቀም የነዳጅ ፍሳሽ (Oil spills) እና Toxic chemicals መበተን።
- **Biowarfare / Bioterrorism**: Biological agents intentionally used as weapons (Category A: *Bacillus anthracis* spores, *Yersinia pestis* plague, *Clostridium botulinum* neurotoxin, Ebola, Variola virus)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'በአንድ የወንጀል ምርመራ (Crime Scene) 1 የDNA ሞለኪውል ብቻ ተገኘ። **10 PCR Cycles** ከተካሄዱ በኋላ ስንት የDNA ቅጂዎች (Copies) ይገኛሉ?',
        stepsAm: [
          '1. እያንዳንዱ PCR Cycle የDNA መጠንን በእጥፍ ($\\times 2$) ያበዛል።',
          '2. ከ10 Cycles በኋላ: $2^{10} = \\mathbf{1,024}$ copies!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'CRISPR-Cas9', termAm: 'ክሪስፐር-ካስ9', definitionAm: 'Guide RNA በመጠቀም በተፈለገው DNA ቦታ ላይ በትክክል የሚቆርጥና Gene edit የሚያደርግ ዘመናዊ ቴክኖሎጂ (ከባክቴሪያ የተገኘ)።' },
      { termEn: 'STRs (Short Tandem Repeats)', termAm: 'አጭር ተደጋጋሚ የDNA ክፍሎች', definitionAm: 'በሰዎች መካከል ርዝመታቸው ስለሚለያይ ለForensic DNA Fingerprinting የሚውሉ Non-coding DNA ቅደም ተከተሎች።' },
    ],
    examTrapsAm: [
      'Gel Electrophoresis ላይ **ትልቁ DNA fragment** ወደ መጨረሻው አይደርስም — **ትንሹ (Shortest)** ነው ፈጥኖ ወደ Positive Anode (+) የሚደርሰው!',
      'Restriction enzymes DNAን የሚቆርጡት **Phosphodiester backbone** ላይ በተወሰነ **Palindromic sequence** (e.g., $5\'-\\text{GAATTC}-3\'$ for *Eco*RI) ነው።',
    ],
    keyTakeawaysAm: [
      'PCR exponential ($2^n$) amplification ያደርጋል — 30 cycles $\\approx 10^9$ copies።',
      'CRISPR-Cas9 ባክቴሪያዎች ቫይረስን (Bacteriophages) ለመከላከል ከሚጠቀሙበት Adaptive immunity የተወሰደ ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ DNA በGel Electrophoresis ውስጥ ወደ Positive electrode (Anode) የሚጓዘው ለምንድን ነው?',
        answerAm: 'መልስ፡ የDNA Sugar-phosphate backbone በውስጡ Negatively charged Phosphate groups ($\\text{PO}_4^-$) ስላለው ወደ Positive pole (+) ይሳባል።',
      },
    ],
  },
};
