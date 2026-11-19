import type { AmharicChapterNote } from './types';

export const GEOGRAPHY_AM_NOTES: Record<string, AmharicChapterNote> = {
  'geo-mod-ch1': {
    subject: 'geography',
    chapterNumber: 1,
    titleAm: 'ምዕራፍ 1፡ የጂኦግራፊ መግቢያ (Introduction to Geography & Location of Ethiopia)',
    briefOverviewAm: 'የጂኦግራፊ ትርጉም፣ 5ቱ መሪ ሃሳቦች (Themes)፣ የኢትዮጵያና የአፍሪካ ቀንድ አንጻራዊና ፍጹም (Astronomical) መገኛ፣ ቅርጽ (Compactness) እና ካርታ አነባበብን ያስተምራል።',
    briefPointsAm: [
      'የኢትዮጵያ Astronomical መገኛ፡ 3°N–15°N ላቲቲዩድ እና 33°E–48°E ሎንጊቲዩድ (ሞያሌ እስከ ባድመ፤ አኮቦ እስከ ኦጋዴን)።',
      'ስፋት፡ ~1,106,000 km² (በዓለም 25ኛ፣ በአፍሪካ 10ኛ) — Compact (ክብ ቅርጽ ያለው) በመሆኑ ለአስተዳደርና መከላከያ አመቺ ነው።',
      '5ቱ Themes of Geography፡ Location, Place, Human-Environment Interaction, Movement, Region።',
      'Landlocked (የባህር በር የሌላት) ከኤርትራ 1993 መገንጠል በኋላ፤ 6 ጎረቤት ሀገራት (ሱዳን፣ ደቡብ ሱዳን፣ ኬንያ፣ ሶማሊያ፣ ጅቡቲ፣ ኤርትራ)።',
    ],
    examTipAm: 'ኢትዮጵያ በ3°N–15°N ስለምትገኝ በሙቀት ዞን (Tropical Zone) ውስጥ ብትሆንም ከፍታዋ (Altitude) አየሯን ሞቃታማ እንዳይሆን አድርጎታል!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የGeography of Ethiopia and the Horn (GeES 1011) መጀመሪያ ሲሆን፣ የጂኦግራፊን ሳይንሳዊ ትርጉም (Spatial science of Earth\'s surface & human-environment interaction)፣ 5ቱን ዋና የጥናት Themes፣ የአፍሪካ ቀንድን (SEED: Somalia, Ethiopia, Eritrea, Djibouti) ስትራቴጂካዊ መገኛ፣ የኢትዮጵያን Absolute (Astronomical) እና Relative (Vicinal/Geological) መገኛዎች፣ የስፋትና የCompactness ቅርጽ መለኪያዎችን (A/B, A/C, B/C ratios) እና የመሰረታዊ ካርታ ንባብ (Scale, Grid, Marginal info) ህጎችን በጥልቀት ያስተምራል።',
    learningOutcomesAm: [
      'የጂኦግራፊን ትርጉም፣ ወሰን እና 5ቱን Themes of Geography ማብራራት።',
      'የኢትዮጵያን Astronomical Location (3°N–15°N, 33°E–48°E) እና Vicinal Location ከ6 ጎረቤቶቿ ጋር መግለጽ።',
      'የሀገር ስፋትና የCompactness ቅርጽ ያላቸውን ፖለቲካዊ፣ ኢኮኖሚያዊና የመከላከያ አንድምታዎች መተንተን።',
    ],
    sectionsAm: [
      {
        headingAm: '1.1 የኢትዮጵያ መገኛ፣ ስፋት፣ ቅርጽ እና የካርታ መሰረቶች',
        contentAm: `### 1.1.1 Astronomical & Relative Location
- **Latitude ($3^\\circ\\text{N} - 15^\\circ\\text{N}$)**: Tropical zone (12° ስፋት) — ከፍተኛ የፀሐይ ጨረርና እኩል የቀን/ሌሊት ርዝመት ያመጣል።
- **Longitude ($33^\\circ\\text{E} - 48^\\circ\\text{E}$)**: 15° ስፋት — **1 ሰዓት ልዩነት** ($15^\\circ/15 = 1\\text{ hr}$; EAT = GMT+3)።
- **Strategic Location**: ለቀይ ባህር፣ ለሕንድ ውቅያኖስ፣ ለመካከለኛው ምሥራቅና ለናይል ተፋሰስ መጋጠሚያ።
- **Shape (Compactness)**: ኢትዮጵያ ክብ-መሰል (Compact) ቅርጽ ያላት ሲሆን Elongated (እንደ ቺሊ) ወይም Fragmented (እንደ ኢንዶኔዥያ) ካሉ ሀገራት በተሻለ መጓጓዣና መከላከያን ታቀላጥፋለች።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የኢትዮጵያ ምዕራባዊ ጫፍ ($33^\\circ\\text{E}$) እና ምሥራቃዊ ጫፍ ($48^\\circ\\text{E}$) መካከል የSolar/Local Time ልዩነት ስንት ነው?',
        stepsAm: [
          '1. የLongitude ልዩነት $= 48^\\circ - 33^\\circ = 15^\\circ$።',
          '2. ምድር በሰዓት $15^\\circ$ ስለምትዞር ($360^\\circ / 24\\text{ hr} = 15^\\circ/\\text{hr}$)፣ ልዩነቱ ትክክለኛ **1 ሰዓት (60 ደቂቃ)** ነው (ምንም እንኳን መላው ሀገሪቱ በአንድ GMT+3 ሰዓት ብትጠቀምም)።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Astronomical Location', termAm: 'አስትሮኖሚካል መገኛ', definitionAm: 'የአንድ ቦታ መገኛ በLatitude (ኬክሮስ) እና Longitude (ኬንትሮስ) መስመሮች በዲግሪ ሲገለጽ።' },
    ],
    examTrapsAm: [
      'ረጅሙ የኢትዮጵያ ድንበር ከሱዳን ጋር አይደለም (ሱዳንና ደቡብ ሱዳን ከተከፈሉ በኋላ **ከሶማሊያ** ጋር ~1,600 km ረጅሙ ድንበር ነው፤ አጭሩ ደግሞ ከጅቡቲ ~310 km)!',
    ],
    keyTakeawaysAm: [
      'Location መሬት አቀማመጥን፣ የአየር ንብረትን፣ ባህልን እና የውጭ ግንኙነትን በጥልቀት ይወስናል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "Environmental Determinism" እና "Possibilism" ልዩነት ምንድን ነው?',
        answerAm: 'መልስ፡ Determinism ተፈጥሮ የሰውን ባህሪ ሙሉ በሙሉ ትወስናለች ሲል፣ Possibilism ግን ተፈጥሮ ገደብ ብትጥልም ሰው በቴክኖሎጂና ባህል አማራጮችን ይፈጥራል ይላል።',
      },
    ],
  },

  'geo-mod-ch2': {
    subject: 'geography',
    chapterNumber: 2,
    titleAm: 'ምዕራፍ 2፡ የኢትዮጵያ እና የአፍሪካ ቀንድ ጂኦሎጂ (Geology)',
    briefOverviewAm: 'Endogenic vs Exogenic Processes፣ Geological Time Scale፣ አራቱ ዘመናት (Precambrian, Paleozoic, Mesozoic, Cenozoic) እና የኢትዮጵያ ማዕድናትን ያስተምራል።',
    briefPointsAm: [
      'Precambrian (4.5B–600M ዓመት)፡ Crystalline Basement Complex rocks — የወርቅ፣ ፕላቲነም፣ መዳብና እብነ-በረድ ምንጭ።',
      'Mesozoic (225–70M ዓመት)፡ ባህር ወደ ኢትዮጵያ ገባና ወጣ → Adigrat Sandstone (ታች) → Hintalo Limestone (መሃል) → Upper Sandstone (ላይ)።',
      'Cenozoic (70M–ዛሬ)፡ Trappean Lava (ደጋዎቹ ተራሮች), Great East African Rift Valley (Miocene/Pliocene), Quaternary የውሃ/አፈር ክምችት።',
      'Endogenic (ውስጣዊ — Volcanism, Folding, Faulting) vs Exogenic (ውጫዊ — Weathering, Erosion, Deposition)።',
    ],
    examTipAm: 'የMesozoic 3 የድንጋይ ንብብሮችን ከታች ወደ ላይ በቅደም ተከተል ያዙ: **Adigrat Sandstone (Lower) → Hintalo Limestone (Middle — በከፍተኛው ባህር) → Upper Sandstone**!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የኢትዮጵያን መልክዓ ምድር የፈጠሩትን የጂኦሎጂ ሂደቶች (Continental Drift Theory by Alfred Wegener, Endogenic & Exogenic Forces, Geological Time Scale: Eons/Eras/Periods) በዝርዝር ይዳስሳል። ከPrecambrian Basement Rocks (530+ ሚሊዮን ዓመት — ብረታ ብረት ማዕድናት)፣ Paleozoic (Denudation/Peneplanation — ምንም ታላቅ ድንጋይ ያልተፈጠረበት)፣ Mesozoic (Transgression & Regression of Sea — Adigrat Sandstone, Hintalo Limestone, Upper Sandstone እና የኦጋዴን ነዳጅ/ጋዝ) እስከ Cenozoic (Trappean Basalt Lava, Great Rift Valley, Quaternary Alluvial & Lacustrine Deposits) በጥልቀት ተብራርተዋል።',
    learningOutcomesAm: [
      'Endogenic (Internal) እና Exogenic (External) የምድር ኃይሎችን መለየት።',
      'በአራቱ Geological Eras ውስጥ በኢትዮጵያ የተከሰቱትን ዋና ክስተቶችና የተፈጠሩ ድንጋዮችን ማብራራት።',
      'የኢትዮጵያን ዋና ማዕድናት (ወርቅ፣ ፖታሽ፣ ታንታለም፣ ጋዝ፣ እብነ-በረድ) ከተፈጠሩበት ዘመን ጋር ማዛመድ።',
    ],
    sectionsAm: [
      {
        headingAm: '2.1 የኢትዮጵያ ጂኦሎጂ በ4ቱ ዘመናት (Eras)',
        contentAm: `| ዘመን (Era) | ዋና የጂኦሎጂ ክስተት በኢትዮጵያ | የተፈጠረው ድንጋይ / ማዕድን |
| :--- | :--- | :--- |
| **Precambrian** | የእሳተ ገሞራ፣ ከፍተኛ ግፊትና Orogenesis (ተራራ አፈጣጠር) | Basement Complex (Metamorphic & Igneous) — **ወርቅ፣ ታንታለም፣ ፕላቲነም፣ እብነ-በረድ** |
| **Paleozoic** | ከባድ **Denudation & Peneplanation** (መሬት መሸርሸር/መስተካከል) | ትልቅ ክምችት የለም (Peneplained surface) |
| **Mesozoic** | የሕንድ ውቅያኖስ Transgression (መግባት) & Regression (መውጣት) | **Adigrat Sandstone → Hintalo Limestone → Upper Sandstone** (ነዳጅ/ጋዝ/ጂፕሰም) |
| **Cenozoic** | **Trappean Lava** መፍሰስ እና የ**Rift Valley** መሰንጠቅ | Basalt ተራሮች፣ **Geothermal**, ፖታሽ (ዳሎል), Soda Ash (አብያታ/ሻላ) |`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'በኦጋዴንና በአባይ ሸለቆ ውስጥ ከMesozoic ዘመን የመጡ ሦስቱ ድንጋዮች በቁፋሮ ቢገኙ ከሁሉም በላይኛው (በጣም ወጣቱ) የትኛው ነው?',
        stepsAm: [
          '1. **Upper Sandstone** (ባህሩ ወደ ደቡብ-ምሥራቅ ሲሸሽ የቀረ)፤ መሃል **Hintalo Limestone**፤ በጣም ታች (ጥንታዊ) **Adigrat Sandstone**!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Transgression', termAm: 'ትራንስግሬሽን', definitionAm: 'የውቅያኖስ ውሃ ቀስ በቀስ ወደ የብስ (ኢትዮጵያ) መግባት — Limestone ይፈጥራል።' },
    ],
    examTrapsAm: [
      'Cement ለመስራት የሚያገለግለው **Hintalo Limestone** በMesozoic (Jurassic) የተፈጠረ ሲሆን፣ Basement Rocks ግን Precambrian ናቸው!',
    ],
    keyTakeawaysAm: [
      'Cenozoic ዘመን አሁን የምናየውን የኢትዮጵያን ደጋዎችና ስምጥ ሸለቆ የቀረጸው ወሳኙ ዘመን ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "Trappean Lava Series" በየትኛው ዘመን ፈሰሰ? ምንንስ ፈጠረ?',
        answerAm: 'መልስ፡ በ**Cenozoic Era (Tertiary)** ውስጥ በFissure eruptions ፈሶ ሰፋፊ የኢትዮጵያን ደጋ ፕላቶዎች (Basalt Plateaus) ፈጠረ።',
      },
    ],
  },

  'geo-mod-ch3': {
    subject: 'geography',
    chapterNumber: 3,
    titleAm: 'ምዕራፍ 3፡ የኢትዮጵያ መልክዓ ምድር (Topography & Physiographic Divisions)',
    briefOverviewAm: 'የኢትዮጵያ ከፍታ ልዩነት (ካሳር ዲፕሬሽን −125m እስከ ራስ ዳሽን 4,620m) እና ሦስቱን ዋና Physiographic Regions (ምዕራብ ደጋ፣ ደቡብ-ምሥራቅ ደጋ፣ ስምጥ ሸለቆ) ያስተምራል።',
    briefPointsAm: [
      'ከፍታ፡ ዝቅተኛው ኮባር ሲንክ/ዳሎል (−125m ከባህር በታች)፤ ከፍተኛው ራስ ዳሽን (4,620m — ስሜን ተራሮች)።',
      '3ቱ Physiographic Regions፡ Western Highlands & Lowlands (~44%)፣ Southeastern Highlands & Lowlands (~37%)፣ Rift Valley (~18%)።',
      'አባይ፣ ተከዜ፣ ባሮ-አኮቦ እና ኦሞ-ጊቤ በWestern Highlands ውስጥ ይፈሳሉ።',
      'አርሲ-ባሌ (ቱሉ ዲምቱ 4,377m) እና ሐረርጌ ከፍተኛ ቦታዎች በSoutheastern Highlands ውስጥ ይገኛሉ።',
    ],
    examTipAm: 'ኢትዮጵያ "Roof of East Africa" (የምሥራቅ አፍሪካ ጣሪያ) የተባለችው ከአፍሪካ 2/3ኛው በላይ ከ2,000m በላይ ያለ መሬት ስለምትይዝ ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የኢትዮጵያን እና የአፍሪካ ቀንድን መልክዓ ምድራዊ ክፍሎች (Physiographic Divisions) በዝርዝር ይተነትናል። ከ1,000m በላይ (~56% የሀገሪቱ መሬት) ደጋዎች (Highlands) እና ቆላማ ሜዳዎች (Lowlands — 44%)፣ የWestern Highlands 4 ንዑስ ክፍሎች (Tigray Plateau, North Central Massifs [Ras Dashen], Shewa Plateau, Southwestern Highlands)፣ የWestern Lowlands (Setit-Humera to Baro-Akobo)፣ የSoutheastern Highlands (Arsi-Bale Massifs & Hararghe Plateau)፣ የOgaden/Borena Lowlands እና የRift Valley 3 ንዑስ ክፍሎች (Afar Triangle, Main Ethiopian Rift, Chew Bahir Rift) በጥልቀት ተብራርተዋል።',
    learningOutcomesAm: [
      'የኢትዮጵያን 3 ዋና Physiographic Divisions ከንዑስ ክፍሎቻቸው ጋር መዘርዘር።',
      'የከፍታ (Altitude) ልዩነት በኢትዮጵያ የአየር ንብረት፣ ግብርና እና አሰፋፈር ላይ ያለውን ተጽዕኖ መተንተን።',
    ],
    sectionsAm: [
      {
        headingAm: '3.1 ሦስቱ Physiographic Regions እና ዋና ዋና ጫፎች',
        contentAm: `### 3.1.1 ሦስቱ ክፍሎች
1. **Western Highlands & Lowlands**: ትልቁ (~44%)። ከራስ ዳሽን (4,620m) እና አባይ/ተከዜ/ባሮ-አኮቦ ወንዞች ጋር።
2. **Southeastern Highlands & Lowlands**: አርሲ-ባሌ (ቱሉ ዲምቱ 4,377m, የሶፍ ኡመር ዋሻ)፣ ሐረርጌ እና ኦጋዴን/ኤልከሬ/ቦረና ቆላዎች።
3. **The Rift Valley**: ከአፋር ትሪያንግል (Erta Ale, Dallol −125m) እስከ Main Ethiopian Rift (ሐይቆች) እና Chew Bahir።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የ"ሶፍ ኡመር ዋሻ (Sof Omar Cave)" በየትኛው Physiographic Division ውስጥ ይገኛል? በምን ድንጋይ ውስጥ ተፈጠረ?',
        stepsAm: [
          '1. በ**Southeastern Highlands (Bale Massif)** በወይብ ወንዝ (Weyib River) በMesozoic **Limestone** ድንጋይ መሟሟት (Karst Topography) የተፈጠረ ነው!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Physiography', termAm: 'ፊዚዮግራፊ', definitionAm: 'የምድር ገጽ ቅርጾችን (ተራራ፣ አምባ፣ ሸለቆ፣ ሜዳ) ስርጭት የሚያጠና ዘርፍ።' },
    ],
    examTrapsAm: [
      'Shewa Plateau የWestern Highlands ክፍል ሲሆን፣ ለአባይ፣ አዋሽ እና ኦሞ ወንዞች **Water Divide (የውሃ መከፋፈያ)** ሆኖ ያገለግላል!',
    ],
    keyTakeawaysAm: [
      'Rift Valley ደጋዎቹን በሁለት (NW እና SE Highlands) ከፍሎታል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በኢትዮጵያ "Water Tower of Northeast Africa" የሚባለው ማን ነው? ለምን?',
        answerAm: 'መልስ፡ የኢትዮጵያ ደጋዎች (በተለይ Western Highlands) ከፍተኛ የዝናብ መጠን ተቀብለው እንደ አባይ፣ ባሮ፣ ተከዜ፣ አዋሽ እና ዋቢ ሸበሌ ያሉ ድንበር ተሻጋሪ ወንዞችን ስለሚመግቡ።',
      },
    ],
  },

  'geo-mod-ch4': {
    subject: 'geography',
    chapterNumber: 4,
    titleAm: 'ምዕራፍ 4፡ የኢትዮጵያ ወንዞች፣ ሐይቆች እና የውሃ ሀብት (Drainage & Water)',
    briefOverviewAm: 'ሦስቱ የኢትዮጵያ Drainage Systems (Western/Mediterranean, Southeastern/Indian Ocean, Rift Valley/Inland)፣ የወንዞች ባህሪያት፣ ሐይቆች እና የውሃ ኃይል/መስኖን ያስተምራል።',
    briefPointsAm: [
      'Western (Mediterranean) System (~69% የውሃ ፍሰት)፡ አባይ (85% ለናይል የሚሰጥ)፣ ተከዜ (አትባራ)፣ ባሮ-አኮቦ (ሶባት)።',
      'Southeastern (Indian Ocean) System፡ ዋቢ ሸበሌ (ረጅሙ ወንዝ — ሕንድ ውቅያኖስ ሳይደርስ በሶማሌ አሸዋ ይሰምጣል!) እና ገናሌ (ጁባ — ሕንድ ውቅያኖስ ይደርሳል!)።',
      'Rift Valley (Inland/Endorheic) System፡ አዋሽ (አቤ ሐይቅ ላይ ያልቃል)፣ ኦሞ-ጊቤ (ቱርካና ሐይቅ)፣ የስምጥ ሸለቆ ሐይቆች።',
      'Highland Lake (ጣና — 3,600 km², ትልቁ ሐይቅ) vs Rift Valley Lakes (ሻላ — ጥልቁ 266m፣ ዝዋይ — ጥልቀቱ ዝቅተኛ)።',
    ],
    examTipAm: 'ዋቢ ሸበሌ በርዝመት ከገናሌ ቢበልጥም **ሕንድ ውቅያኖስን የሚቀላቀለው ገናሌ (Juba)** ብቻ ነው፤ ዋቢ ሸበሌ በሶማሊያ ውስጥ በአሸዋ ይሰምጣል!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የኢትዮጵያን የውሃ ሀብት (Drainage Basins, Surface & Ground Water, Lakes, Wetlands) በጥልቀት ይመረምራል። ሦስቱ ዋና የDrainage Systems (Western 39% area / 69% water volume; Southeastern 33% area / 25% water; Rift Valley 28% area / 6% water)፣ የኢትዮጵያ ወንዞች 6 የጋራ ባህሪያት (Seasonal fluctuation, Steep profiles/Waterfalls/Rapids, Deep gorges, Exotic rivers, Transboundary nature)፣ Natural Lakes (Tectonic/Rift vs Crater/Highland) እና የውሃ ሀብት አጠቃቀም (GERD Hydroelectric 45,000 MW potential, Irrigation, Fishing) ተብራርተዋል።',
    learningOutcomesAm: [
      'ሦስቱን የDrainage Systems እና ዋና ዋና ወንዞቻቸውን መድቦ መግለጽ።',
      'የኢትዮጵያ ወንዞች ለመርከብ መጓጓዣ (Navigation) ለምን እንደማይመቹ (ከባሮ በስተቀር) ማስረዳት።',
      'የRift Valley ሐይቆችን ከHighland/Crater ሐይቆች (ጣና፣ ወንጪ፣ ዝቅዋላ) ማነጻጸር።',
    ],
    sectionsAm: [
      {
        headingAm: '4.1 ሦስቱ Drainage Systems እና የወንዞች/ሐይቆች ባህሪያት',
        contentAm: `### 4.1.1 ሦስቱ ዋና ተፋሰሶች
1. **Western (Mediterranean) System**: አባይ (Abay — ከነገባሮቹ ድደሳ፣ ዳቡስ፣ በለስ)፣ ተከዜ እና ባሮ-አኮቦ (**ባሮ** ብቸኛው ለመርከብ መጓጓዣ የሚሆን ወንዝ!)።
2. **Southeastern (Indian Ocean) System**: ዋቢ ሸበሌ (Wabishebelle) እና ገናሌ-ዳዋ (Genale-Dawa)።
3. **Rift Valley System**: አዋሽ (በሀገር ውስጥ ለመስኖና ኢንዱስትሪ በብዛት የዋለው!)፣ ኦሞ-ጊቤ (Gilgel Gibe I-III, Koysha)፣ ብላቴ/ሰገን።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የኢትዮጵያ ወንዞች ለመርከብ ጉዞ (Navigation) አይመቹም ግን ለHydroelectric Power እጅግ ምቹ ናቸው። ለምን?',
        stepsAm: [
          '1. Steep Slope (ቁልቁለት)፣ ፏፏቴዎች (Waterfalls — እንደ ጢስ አባይ)፣ Gorge እና የወቅት መለዋወጥ (Seasonal fluctuation) መርከብ እንዳይጓዝ ይከለክላሉ፤ ነገር ግን ይኸው Steep Slope እና ፈጣን ፍሰት ለ**Hydroelectric Power** ($P = \\eta\\rho g Q h$) ፍጹም ምቹ ነው!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Endorheic Basin', termAm: 'ኢንዶሬይክ (ውስጣዊ) ተፋሰስ', definitionAm: 'ወደ ውቅያኖስ ሳይወጣ በሀገር ውስጥ ሐይቅ ወይም በረሃ የሚያልቅ (እንደ Rift Valley System)።' },
    ],
    examTrapsAm: [
      'በኢትዮጵያ ጥልቁ ሐይቅ **ሻላ (266 m)** ሲሆን በስፋት ትልቁ ደግሞ **ጣና (~3,600 km²)** ነው — አታምታቷቸው!',
    ],
    keyTakeawaysAm: [
      'አብዛኞቹ የኢትዮጵያ ትላልቅ ወንዞች ድንበር ተሻጋሪ (Transboundary) ስለሆኑ ፍትሐዊ ክፍፍልና ዲፕሎማሲ ይጠይቃሉ።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "Exotic Rivers" ምን ማለት ነው? የኢትዮጵያ ምሳሌ ማን ነው?',
        answerAm: 'መልስ፡ በዝናባማ ደጋ ተወልደው በረሃማ/ደረቅ ቆላዎችን አቋርጠው የሚፈሱ ወንዞች (ለምሳሌ አባይ፣ ዋቢ ሸበሌ፣ አዋሽ)።',
      },
    ],
  },

  'geo-mod-ch5': {
    subject: 'geography',
    chapterNumber: 5,
    titleAm: 'ምዕራፍ 5፡ የኢትዮጵያ የአየር ንብረት (Climate & Agro-Ecological Zones)',
    briefOverviewAm: 'Weather vs Climate፣ የኢትዮጵያን አየር የሚቆጣጠሩ ነገሮች (Altitude, ITCZ, Latitude)፣ 4ቱ ወቅቶች እና 5ቱ Agro-Ecological Zones (በረሃ እስከ ውርጭ) ያስተምራል።',
    briefPointsAm: [
      'Lapse Rate፡ ከፍታ በ1,000 m ሲጨምር ሙቀት በ6.5°C ይቀንሳል — ስለዚህ ከፍታ የኢትዮጵያ ዋነኛው የአየር ንብረት መቆጣጠሪያ ነው!',
      'ITCZ (Intertropical Convergence Zone)፡ ወደ ሰሜን/ደቡብ እየተንቀሳቀሰ የክረምትና የበልግ ዝናብን ያመጣል።',
      '5ቱ Agro-Ecological Zones፡ Bereha (<500m) → Kolla (500–1500m) → Woina Dega (1500–2300m) → Dega (2300–3300m) → Wurch (>3300m)።',
      'ክረምት ዝናብ (ሰኔ–ነሐሴ) የሚመጣው ከEquatorial Westerlies (Guinea Monsoon) ሲሆን፣ በልግ (መጋቢት–ግንቦት) ከሕንድ ውቅያኖስ ይመጣል።',
    ],
    examTipAm: 'የኢትዮጵያ **አብዛኛው ሕዝብ እና የከተማ ልማት** የሚኖረው በ**Woina Dega (1,500–2,300m)** ዞን ውስጥ ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የኢትዮጵያንና የአፍሪካ ቀንድን የአየር ንብረት (Climate) መሰረታዊ ተቆጣጣሪዎችን (Latitude, Altitude, Mountain Barriers, ITCZ, Pressure & Wind Systems, Ocean Currents)፣ የሙቀትና የዝናብ ስርጭትን (Temporal & Spatial variations: Kiremt, Belg, Meher, Bega እና 4ቱ የዝናብ ቀጠናዎች)፣ አምስቱን ባህላዊ Agro-Ecological Zones (Wurch, Dega, Woina Dega, Kolla, Bereha)፣ እንዲሁም የአየር ንብረት ለውጥ መንስኤዎችና መዘዞችን (ድርቅ፣ ጎርፍ) በጥልቀት ያስተምራል።',
    learningOutcomesAm: [
      'Weather እና Climateን እንዲሁም Lapse Rate (6.5°C/1000m) ማስረዳት።',
      'የITCZ እና የንፋስ አቅጣጫዎች (Equatorial Westerlies vs Easterlies) በኢትዮጵያ ዝናብ ላይ ያላቸውን ሚና መግለጽ።',
      'አምስቱን Agro-Ecological Zones ከከፍታ፣ ሙቀት እና ዋና ሰብሎቻቸው ጋር ማዛመድ።',
    ],
    sectionsAm: [
      {
        headingAm: '5.1 የአየር ንብረት መቆጣጠሪያዎች እና 5ቱ Agro-Ecological Zones',
        contentAm: `| ባህላዊ ዞን | ከፍታ (Altitude) | አማካይ ሙቀት | ዋና ሰብሎች |
| :--- | :--- | :--- | :--- |
| **Wurch (ውርጭ)** | $> 3,300\\text{ m}$ | $< 10^\\circ\\text{C}$ | ገብስ (አልፓይን) |
| **Dega (ደጋ)** | $2,300 - 3,300\\text{ m}$ | $10 - 15^\\circ\\text{C}$ | ገብስ፣ ስንዴ፣ ባቄላ |
| **Woina Dega (ወይና ደጋ)** | $1,500 - 2,300\\text{ m}$ | $15 - 20^\\circ\\text{C}$ | ጤፍ፣ በቆሎ፣ ቡና፣ እንሰት (ከፍተኛ ሕዝብ!) |
| **Kolla (ቆላ)** | $500 - 1,500\\text{ m}$ | $20 - 30^\\circ\\text{C}$ | ማሽላ፣ ሰሊጥ፣ ቆሎ፣ ጥጥ |
| **Bereha (በረሃ)** | $< 500\\text{ m}$ | $> 30^\\circ\\text{C}$ | የለም (አርብቶ አደር / መስኖ ብቻ) |`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አዲስ አበባ በ2,400m ላይ 20°C ቢሆን፣ በተመሳሳይ ቀን በ1,400m ላይ ያለው ቆላማ ቦታ (በLapse Rate $6.5^\\circ\\text{C}/1000\\text{m}$) ሙቀቱ ስንት ይሆናል?',
        stepsAm: [
          '1. ወደ ታች 1,000m ስንወርድ ሙቀት በ $6.5^\\circ\\text{C}$ ይጨምራል → $20 + 6.5 = \\mathbf{26.5^\\circ\\text{C}}$።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'ITCZ', termAm: 'አይቲሲዜድ', definitionAm: 'የሰሜንና ደቡብ ንፋሶች የሚገናኙበት ዝቅተኛ ግፊት መስመር — ዝናብ አምጪ!'},
    ],
    examTrapsAm: [
      'በደጋ ኢትዮጵያ የሙቀት ልዩነት ከወር ወደ ወር ትንሽ ቢሆንም፣ **Diurnal Range (የቀንና የሌሊት ሙቀት ልዩነት)** እጅግ ከፍተኛ ነው ("Summer every day, winter every night")!',
    ],
    keyTakeawaysAm: [
      'የኢትዮጵያ የዝናብ ስርጭት በITCZ መዘዋወርና በተራሮች Orographic Effect ይወሰናል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ ደቡብ-ምሥራቅ ኢትዮጵያ (ቦረና/ኦጋዴን) የዋና ዝናብ ወቅታቸው ክረምት ሳይሆን የትኞቹ ወራት ናቸው?',
        answerAm: 'መልስ፡ **በልግ (መጋቢት–ግንቦት)** እና **መኸር/ደይር (መስከረም–ጥቅምት)** — ከሕንድ ውቅያኖስ በሚመጡ ንፋሶች!',
      },
    ],
  },

  'geo-mod-ch6': {
    subject: 'geography',
    chapterNumber: 6,
    titleAm: 'ምዕራፍ 6፡ የኢትዮጵያ አፈር፣ ተፈጥሯዊ እፅዋት እና የዱር እንስሳት',
    briefOverviewAm: 'ዋና የኢትዮጵያ የአፈር ዓይነቶች (Nitosols, Vertisols, Cambisols, Fluvisols)፣ የአፈር መሸርሸር፣ የተፈጥሮ እፅዋት እና ብሔራዊ ፓርኮች (Endemic Wildlife) ያስተምራል።',
    briefPointsAm: [
      'Nitosols (ቀይ ለም አፈር)፡ በደጋማና ዝናባማ አካባቢ — ለቡና፣ እንሰትና እህል በጣም ምቹ።',
      'Vertisols (ጥቁር አፈር / Black Cotton Soil)፡ ከፍተኛ የሸክላ መጠን አለው — ሲደርቅ ይሰነጠቃል፣ ሲረጥብ ውሃ ያቁራል (ለጤፍና ስንዴ ምቹ)።',
      'Fluvisols (Alluvial)፡ በወንዝ ዳርቻና ዴልታ የሚከማች በጣም ለም አፈር (ለመስኖ ግብርና ምርጥ)።',
      'Endemic Mammals (በኢትዮጵያ ብቻ የሚገኙ)፡ ዋልያ አይቤክስ (ስሜን)፣ ቀይ ቀበሮ (ባሌ/ስሜን)፣ የተራራ ኒያላ (ባሌ)፣ ጭላዳ ዝንጀሮ፣ ስዋይን ሃርትቢስት።',
    ],
    examTipAm: 'Nitosols (Red/Acidic — በምዕራብ/ደቡብ ቡና አብቃይ) እና Vertisols (Black/Swelling Clay — በመሃል ኢትዮጵያ ጤፍ) ሁልጊዜ በፈተና ላይ ይጠየቃሉ!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የኢትዮጵያን ሦስት ቁልፍ የተፈጥሮ ሀብቶች — አፈር (Soils), እፅዋት (Natural Vegetation) እና የዱር እንስሳት (Wildlife) — በዝርዝር ይዳስሳል። የአፈር መፈጠር (CLORPT)፣ 6ቱ ዋና የFAO የኢትዮጵያ አፈሮች (Nitosols, Vertisols, Cambisols, Regosols, Xerosols/Yermosols, Luvisols, Lithosols, Fluvisols)፣ የአፈር መሸርሸር (Sheet, Rill, Gully) እና የጥበቃ ዘዴዎች (Terracing, Afforestation, Check dams)፣ የተፈጥሮ ጫካዎች መመናመን (ከ40% ወደ <15% መውረድና በGreen Legacy መመለስ) እና የብሔራዊ ፓርኮችና Endemic እንስሳት ጥበቃ ተካተዋል።',
    learningOutcomesAm: [
      'ዋና ዋና የኢትዮጵያ የአፈር ዓይነቶችን (Nitosols, Vertisols, Fluvisols, Xerosols) ባህሪና ግብርናዊ ጥቅም መለየት።',
      'የአፈር መሸርሸርና የደን መጨፍጨፍ መንስኤዎችንና መፍትሄዎችን መተንተን።',
      'የኢትዮጵያን Endemic የዱር እንስሳት ከመኖሪያ ፓርኮቻቸው (Simien, Bale, Awash, Nechisar, Omo) ጋር ማዛመድ።',
    ],
    sectionsAm: [
      {
        headingAm: '6.1 የኢትዮጵያ አፈር ዓይነቶች እና የተፈጥሮ እፅዋት/እንስሳት',
        contentAm: `### 6.1.1 ዋና የአፈር ዓይነቶች
- **Nitosols (31% — ከፍተኛ ዝናብ ቦታዎች)**: ቀይ ቡናማ፣ ጥልቅ፣ ለም እና ውሃ አሳላፊ።
- **Vertisols (ጥቁር አፈር)**: በሸክላ የበለጸገ — በበጋ ይሰነጠቃል፣ በክረምት ውሃ ይይዛል (Broad Bed and Furrow - BBF ያስፈልገዋል)።
- **Fluvisols**: ከጎርፍ/ወንዝ ደለል የሚፈጠር (አዋሽ፣ ኦሞ) — በጣም ለም።
- **Xerosols / Yermosols**: የበረሃ አፈር (ጨዋማና ደረቅ)።

### 6.1.2 ብሔራዊ ፓርኮች እና Endemic እንስሳት
- **ስሜን ተራሮች ፓርክ (UNESCO)**: ዋልያ አይቤክስ (Walia Ibex), ጭላዳ ዝንጀሮ (Gelada), ቀይ ቀበሮ።
- **ባሌ ተራሮች ፓርክ**: የተራራ ኒያላ (Mountain Nyala), ቀይ ቀበሮ (Ethiopian Wolf), የባሌ ዝንጀሮ።
- **ነጭ ሳር / ሰንቀሌ / አዋሽ / አብያታ-ሻላ**: Swayne\'s Hartebeest, Wild Ass (በያቤሎ/አፋር)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንድ አርሶ አደር በሸዋ ሜዳ ላይ በክረምት ውሃ በሚተኛበትና በበጋ በሚሰነጠቅ ጥቁር አፈር ላይ ስንዴ/ጤፍ ቢዘራ ይህ ምን ዓይነት አፈር ነው?',
        stepsAm: [
          '1. **Vertisol (Black Cotton Soil)** — የሸክላ ማዕድን (Montmorillonite) ስላለው ውሃ ሲነካው ያብጣል፣ ሲደርቅ ይሰነጠቃል።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Endemic Species', termAm: 'ብርቅዬ (ኢንዴሚክ) ዝርያ', definitionAm: 'በዓለም ውስጥ በተፈጥሮ በአንድ ሀገር (በኢትዮጵያ) ብቻ የሚገኝ እጽዋት ወይም እንስሳ።' },
    ],
    examTrapsAm: [
      'Acrisols እና Ferralsols ከመጠን በላይ በዝናብ የታጠቡ (Leached & Acidic) ሲሆኑ **Nitosols** ግን ለግብርና እጅግ ምርጥ ቀይ አፈር ነው!',
    ],
    keyTakeawaysAm: [
      'አፈር ታዳሽ ሀብት ቢሆንም $1\\text{ cm}$ አፈር ለመፈጠር በመቶዎች ዓመታት ይፈጃል — መሸርሸርን መከላከል ግዴታ ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "Gully Erosion" እና "Sheet Erosion" ልዩነት ምንድን ነው?',
        answerAm: 'መልስ፡ Sheet erosion የላይኛውን ቀጭን ለም አፈር ሳይታወቅ በጠቅላላው ሲጠርግ (በጣም አደገኛው)፣ Gully erosion ግን ጥልቅ ቦይ/ገደል በመፍጠር መሬቱን ይቆርጣል።',
      },
    ],
  },

  'geo-mod-ch7': {
    subject: 'geography',
    chapterNumber: 7,
    titleAm: 'ምዕራፍ 7፡ የኢትዮጵያ ሕዝብ (Population of Ethiopia and the Horn)',
    briefOverviewAm: 'የሕዝብ መረጃ ምንጮች (Census, Sample Survey, Vital Registration)፣ የሕዝብ ዕድገትና Pyramids (Expansive)፣ Fertility/Mortality/Migration እና Age-Dependency Ratio ያስተምራል።',
    briefPointsAm: [
      'ኢትዮጵያ በአፍሪካ 2ኛው ከፍተኛ የሕዝብ ብዛት ያላት ሀገር ነች (~120+ ሚሊዮን)፤ Youth Bulge (~40%+ ከ15 ዓመት በታች)።',
      'Demographic Transition Model (DTM)፡ ኢትዮጵያ ከStage 2 (ከፍተኛ ልደት + እየቀነሰ ያለ ሞት = ፈጣን እድገት) ወደ Stage 3 እየገባች ነው።',
      'Age Dependency Ratio (ADR) = [(Pop <15 + Pop ≥65) / Pop 15–64] × 100።',
      'የሕዝብ ስርጭት፡ >80% በደጋና ወይና ደጋ ይኖራል (ለም አፈር፣ ተስማሚ አየር፣ ከወባ ነጻ)።',
    ],
    examTipAm: 'CBR (Crude Birth Rate) እና TFR (Total Fertility Rate) ልዩነት: CBR በ1,000 አጠቃላይ ሕዝብ ላይ የሚለካ ሲሆን TFR አንዲት ሴት በመውለድ ዕድሜዋ (15–49) የምትወልዳቸው አማካይ ልጆች ብዛት ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የኢትዮጵያን ሕዝብ ስነ-ሕዝባዊ ባህሪያት (Demography) በጥልቀት ይተነትናል። ሦስቱ የሕዝብ መረጃ ምንጮች (1984, 1994, 2007 Censuses, Vital Registration, Sample Surveys), የሕዝብ ቁጥር እድገት፣ Fertility (CBR, TFR)፣ Mortality (CDR, IMR, Maternal Mortality) እና Migration (Push vs Pull Factors, Rural-Urban Migration), Age-Sex Pyramid (Broad-base Expansive Pyramid), Age Dependency Ratio, የሕዝብ ጥግግት (Crude vs Agricultural Density) እና የ1993ቱ የኢትዮጵያ ብሔራዊ የሕዝብ ፖሊሲ በዝርዝር ቀርበዋል።',
    learningOutcomesAm: [
      'Rate of Natural Increase ($RNI = CBR - CDR$)፣ Doubling Time ($70 / \\text{Growth Rate}$) እና Dependency Ratio ማስላት።',
      'የኢትዮጵያን ሰፊ-መሠረት Population Pyramid እና Demographic Dividendን መተንተን።',
      'የሕዝብ አሰፋፈርን የሚወስኑ ተፈጥሯዊ (Altitude, Rainfall, Malaria) እና ሰው-ሰራሽ (History, Infrastructure) ምክንያቶችን ማብራራት።',
    ],
    sectionsAm: [
      {
        headingAm: '7.1 የስነ-ሕዝብ መለኪያዎች (Fertility, Mortality, Migration & Density)',
        contentAm: `### 7.1.1 ቁልፍ የDemography ቀመሮች
- **Rate of Natural Increase ($RNI$)**: $\\frac{\\text{CBR} - \\text{CDR}}{10} \\%$ (CBR እና CDR በ1,000 ስለሚለኩ በ10 ሲካፈል % ይሰጣል!)።
- **Doubling Time (Rule of 70)**: $T_d = \\frac{70}{r\\%}$ (ለምሳሌ እድገት $2.5\\%$ ከሆነ ሕዝቡ በ $70/2.5 = 28$ ዓመት እጥፍ ይሆናል)።
- **Age Dependency Ratio (ADR)**: $\\frac{P_{0-14} + P_{65+}}{P_{15-64}} \\times 100$።
- **Sex Ratio**: $\\frac{\\text{Males}}{\\text{Females}} \\times 100$።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የአንድ አካባቢ ከ0–14 ዓመት 45%፣ ከ65 በላይ 5%፣ እና ከ15–64 (ሠራተኛ ዕድሜ) 50% ቢሆን Age Dependency Ratio ስንት ነው?',
        stepsAm: [
          '1. $ADR = \\frac{45 + 5}{50} \\times 100 = \\frac{50}{50} \\times 100 = \\mathbf{100\\%}$ (እያንዳንዱ 100 ሠራተኛ 100 ጥገኞችን ይጦራል ማለት ነው!)።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Demographic Dividend', termAm: 'ዴሞግራፊክ ዲቪደንድ', definitionAm: 'የልደት መጠን ሲቀንስ የሠራተኛ ዕድሜ ሕዝብ (15–64) ከጥገኞች በልጦ ፈጣን የኢኮኖሚ እድገት የሚመጣበት ዕድል።' },
    ],
    examTrapsAm: [
      'Agricultural Density = **Rural Population ÷ Cultivated (Arable) Land** እንጂ ጠቅላላ ሕዝብ ÷ ጠቅላላ መሬት (Crude Density) አይደለም!',
    ],
    keyTakeawaysAm: [
      'በኢትዮጵያ የሴቶች ትምህርት፣ የቤተሰብ ምጣኔ እና የከተማ መስፋፋት TFRን ከ7+ ወደ ~4.1 ዝቅ አድርገውታል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "Tsetse Fly" እና "Malaria" በኢትዮጵያ የሕዝብ አሰፋፈር ላይ ምን ተጽዕኖ አላቸው?',
        answerAm: 'መልስ፡ ዝቅተኛ ቆላማና ረግረጋማ አካባቢዎች (በተለይ ምዕራብ ቆላ) ለወባና ለእንስሳት ገንዲ በሽታ (Trypanosomiasis) ስለሚያጋልጡ ሕዝቡ በደጋና ወይና ደጋ እንዲሰበሰብ አድርገዋል።',
      },
    ],
  },

  'geo-mod-ch8': {
    subject: 'geography',
    chapterNumber: 8,
    titleAm: 'ምዕራፍ 8፡ የኢትዮጵያ ኢኮኖሚያዊ እንቅስቃሴዎች (Economic Activities)',
    briefOverviewAm: 'Primary (ግብርና፣ ደን፣ ማዕድን፣ ዓሣ), Secondary (ኢንዱስትሪ/ማኑፋክቸሪንግ), Tertiary (ንግድ፣ ትራንስፖርት፣ ቱሪዝም) እና የኢትዮጵያን የኢኮኖሚ ተግዳሮቶች ያስተምራል።',
    briefPointsAm: [
      'ግብርና (Agriculture)፡ ለ~65–70% ሕዝብ የሥራ ዕድል፣ ከፍተኛ የውጭ ምንዛሬ ምንጭ (ቡና፣ ሰሊጥ፣ አበባ፣ ቆዳ፣ ቅባት እህሎች)።',
      'የግብርና ሥርዓቶች፡ Smallholder Mixed Farming (95% ምርት), Pastoralism (ቆላ) እና Commercial/Mechanized Farming።',
      'ኢንዱስትሪ (Manufacturing)፡ Agro-processing, ጨርቃ ጨርቅ፣ ቆዳ፣ ሲሚንቶ እና Industrial Parks (ሐዋሳ፣ ቦሌ ለሚ፣ አዳማ)።',
      'አገልግሎት ዘርፍ (Tertiary — ትልቁ የGDP ድርሻ!)፡ Ethiopian Airlines፣ ቱሪዝም (ላሊበላ፣ አክሱም፣ ጎንደር፣ ጀጎል፣ ኮንሶ፣ ገዳ) እና ንግድ።',
    ],
    examTipAm: 'በኢትዮጵያ **ለEmployment (ሥራ ዕድል)** ቁጥር 1 ግብርና ሲሆን፣ ለ**GDP (ጠቅላላ ምርት ድርሻ)** ግን በቅርብ ዓመታት **Service Sector (አገልግሎት)** ከግብርና በልጦ ቀዳሚ ሆኗል!',
    expandedOverviewAm:
      'ይህ የመጨረሻው የጂኦግራፊ ምዕራፍ የኢትዮጵያን ኢኮኖሚ ዋና ዘርፎች (Primary: Agriculture, Mining, Forestry, Fishery; Secondary: Manufacturing & Construction; Tertiary: Trade, Transport, Communication, Tourism) በጥልቀት ይተነትናል። በግብርና ዘርፍ የዝናብ ጥገኝነት፣ የመሬት መቆራረጥ (Land Fragmentation) እና የቴክኖሎጂ እጥረት፣ በማዕድንና ኢነርጂ፣ በኢንዱስትሪ (Import Substitution vs Export-Oriented Industrial Parks)፣ እና በቱሪዝምና ትራንስፖርት (Addis-Djibouti Electric Railway & Ethiopian Airlines) ያሉትን ዕድሎችና ተግዳሮቶች በዝርዝር ያስተምራል።',
    learningOutcomesAm: [
      'Primary, Secondary እና Tertiary የኢኮኖሚ ዘርፎችን በኢትዮጵያ ምሳሌዎች መተንተን።',
      'የኢትዮጵያ ግብርና መዋቅራዊ ችግሮችን (Rain-fed, Subsistence, Fragmentation) እና መፍትሄዎቻቸውን መግለጽ።',
      'የኢትዮጵያን ዋና Export ምርቶች (ቡና፣ ወርቅ፣ አበባ፣ ሰሊጥ) እና የኢንዱስትሪ ፓርኮችን ሚና ማብራራት።',
    ],
    sectionsAm: [
      {
        headingAm: '8.1 ግብርና፣ ማዕድን፣ ኢንዱስትሪ እና የአገልግሎት ዘርፍ',
        contentAm: `### 8.1.1 የኢትዮጵያ ኢኮኖሚ መዋቅር
- **ግብርና (Primary)**: ቡና ("Black Gold"), ጤፍ, እንሰት, የቁም እንስሳት (በአፍሪካ 1ኛ በከብት ብዛት!)። ችግሮቹ: ዝናብ ጥገኝነት፣ ትንሽ መሬት፣ ዝቅተኛ መካናይዜሽን።
- **ማኑፋክቸሪንግ (Secondary)**: ዝቅተኛ የGDP ድርሻ ቢኖረውም ለኢኮኖሚ ለውጥ (Structural Transformation) ወሳኝ ነው።
- **አገልግሎት (Tertiary)**: ትራንስፖርት (Ethiopian Airlines በአፍሪካ 1ኛ, Djibouti Railway), ባንክ፣ ቴሌኮም እና ቱሪዝም (ኢትዮጵያ በአፍሪካ ከፍተኛ የUNESCO ቅርሶች አሏት!)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንድ አርሶ አደር የዘራውን ስንዴ ወፍጮ ቤት ፈጭቶ የብስኩት ፋብሪካ ብስኩት ሰርቶ በሱፐርማርኬት ቢሸጥ፣ እያንዳንዱ ደረጃ የትኛው ዘርፍ ነው?',
        stepsAm: [
          '1. ስንዴ ማምረት → **Primary**',
          '2. ብስኩት ማምረት → **Secondary**',
          '3. ሱፐርማርኬት መሸጥና ማጓጓዝ → **Tertiary**',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Subsistence Farming', termAm: 'ለእለት ጉርስ እርሻ', definitionAm: 'ለገበያ ሳይሆን በዋናነት ለቤተሰብ ምግብ ብቻ የሚመረት አነስተኛ እርሻ።' },
    ],
    examTrapsAm: [
      'ኢትዮጵያ በአፍሪካ 1ኛ የከብት ብዛት ቢኖራትም ከዘርፉ የምታገኘው የውጭ ምንዛሬ ዝቅተኛ የሆነው በባህላዊ አረባብ፣ በበሽታና በሕገ-ወጥ ኮንትሮባንድ ንግድ ምክንያት ነው!',
    ],
    keyTakeawaysAm: [
      'የኢትዮጵያ ዘላቂ እድገት ከዝናብ-ጥገኛ ግብርና ወደ Agro-processing ኢንዱስትሪና መስኖ መሸጋገርን ይጠይቃል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "Import Substitution" እና "Export-Oriented" ኢንዱስትሪያላይዜሽን ልዩነት ምንድን ነው?',
        answerAm: 'መልስ፡ Import Substitution ከውጭ የሚገቡ ምርቶችን በሀገር ውስጥ በማምረት የውጭ ምንዛሬ ማዳን ሲሆን፣ Export-Oriented ግን ለዓለም ገበያ በማምረት የውጭ ምንዛሬ ማስገባት ነው።',
      },
    ],
  },
};
