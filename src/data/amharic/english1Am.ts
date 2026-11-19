import type { AmharicChapterNote } from './types';

export const ENGLISH_1_AM_NOTES: Record<string, AmharicChapterNote> = {
  'eng1-mod-u1': {
    subject: 'english',
    chapterNumber: 1,
    titleAm: 'ምዕራፍ 1፡ የጥናት ክህሎት (Study Skills, Listening & Present/Future Tenses)',
    briefOverviewAm: 'የዩኒቨርሲቲ ትምህርት ማስታወሻ አያያዝ (Cornell Note-Taking)፣ የጥናት ስልቶች (SQ3R)፣ የንባብ ዘዴዎች (Skimming/Scanning) እና Present Simple/Continuous/Future Tensesን ያስተምራል።',
    briefPointsAm: [
      'Skimming (አጠቃላይ ሃሳብ/Gist ለማግኘት በፍጥነት ማንበብ) vs Scanning (የተወሰነ ስም/ቀን/ቁጥር ለመፈለግ በዓይን መቃኘት)።',
      'Cornell Note-Taking System፡ ገጹን ለ3 መክፈል — Notes (ቀኝ), Cues/Questions (ግራ), Summary (ታች)።',
      'SQ3R Study Method፡ Survey → Question → Read → Recite → Review።',
      'Grammar፡ Present Simple (ቋሚ ልማድ/እውነታ — V1/s) vs Present Continuous (አሁን በመሆን ላይ — am/is/are + V-ing)፤ Stative verbs (know, like, believe) በContinuous አይገቡም!',
    ],
    examTipAm: 'Stative Verbs (know, understand, want, own, seem, believe) በፈተና ላይ **"I am knowing" ተብለው አይጻፉም** — ሁልጊዜ Simple Tense ("I know") ይጠቀማሉ!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የCommunicative English Language Skills I (FLEn 1011) መጀመሪያ ሲሆን የዩኒቨርሲቲ አዲስ ተማሪዎችን ለአካዳሚክ ሕይወት የሚያዘጋጁ የጥናት ክህሎቶችን (Listening to lectures, Cornell/Outline/Mind-map Note-taking, Skimming vs Scanning vs Intensive Reading, Guessing Meaning from Context, SQ3R Study Technique, Time Management) እና መሰረታዊ የሰዋስው ክፍሎችን (Present Simple, Present Continuous, Stative vs Action Verbs, Future Forms: will vs going to vs Present Continuous for plans) በጥልቀት ያስተምራል።',
    learningOutcomesAm: [
      'Skimming, Scanning, Intensive እና Extensive Reading መቼ እንደሚጠቀሙ መለየት።',
      'በንግግር (Lecture) ወቅት ዋና ሃሳቦችንና Discourse Markersን በመጠቀም Cornell Notes መያዝ።',
      'Present Simple, Present Continuous እና Future Tensesን (እና Stative verbsን) ያለ ስህተት መጠቀም።',
    ],
    sectionsAm: [
      {
        headingAm: '1.1 Study Skills (SQ3R, Skimming/Scanning) እና Grammar (Present/Future)',
        contentAm: `### 1.1.1 Reading & Note-Taking
- **Skimming**: ርዕሱን፣ መጀመሪያና መጨረሻ አንቀጾችን በማየት አጠቃላይ ጭብጡን (Main Idea) መያዝ።
- **Scanning**: በመዝገበ-ቃላት ወይም ፈተና ውስጥ የተወሰነ ቁጥር፣ ዓመተ ምሕረት ወይም ስም በፍጥነት ማግኘት።
- **Discourse Markers in Lectures**: መምህሩ "First of all..." (ቅደም ተከተል), "However/On the other hand..." (ተቃርኖ), "To sum up..." (ማጠቃለያ — ለፈተና ወሳኝ!) ሲል ትኩረት ስጡ።

### 1.1.2 Present & Future Tenses
- **Present Simple**: Facts ("Water boils at 100°C"), Habits ("She studies every night"), Timetables ("The bus leaves at 6 AM")።
- **Present Continuous**: Happening now ("They are writing notes"), Temporary actions, Planned near future ("I am meeting my advisor tomorrow at 2 PM")።
- **Will vs Going to**: "Will" = ቅጽበታዊ ውሳኔ/ተስፋ/ግምት፤ "Going to" = ቀድሞ የታቀደ እቅድ ወይም ግልጽ ምልክት ያለው ("Look at those black clouds! It is going to rain.")።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'ትክክለኛውን አስገቡ: (a) "She _______ (not/believe) that story right now." (b) "Look! The train is coming; it _______ (stop) soon."',
        stepsAm: [
          '(a) believe Stative Verb ስለሆነ "right now" ቢኖርም → **does not believe** (Present Simple)!',
          '(b) በዓይን የሚታይ ምልክት ስላለ → **is going to stop**!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Skimming', termAm: 'ስኪሚንግ', definitionAm: 'የጽሑፉን አጠቃላይ ዋና ሃሳብ (Gist) ለማወቅ በፍጥነት መገልበጥ/ማንበብ።' },
      { termEn: 'Scanning', termAm: 'ስካኒንግ', definitionAm: 'የተወሰነ ዝርዝር መረጃ (ስም፣ ቁጥር፣ ቀን) ብቻ ለማግኘት መፈለግ።' },
    ],
    examTrapsAm: [
      '"Have" ባለቤትነትን (Possession: "I have a laptop") ሲገልጽ Stative ስለሆነ Continuous አይሆንም፤ ነገር ግን "I am having lunch" (መመገብ) ሲሆን Action ስለሆነ ይቻላል!',
    ],
    keyTakeawaysAm: [
      'ውጤታማ ማስታወሻ የመምህሩን ቃላት ሁሉ መገልበጥ ሳይሆን ቁልፍ ሃሳቦችን በራስ ቃል ማጠቃለል ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "The semester exam starts on Monday" ለምን Present Simple ተጠቀመ?',
        answerAm: 'መልስ፡ በፕሮግራምና ሰዓት ሰሌዳ (Schedules/Timetables) የተወሰነ የወደፊት ክስተት ስለሆነ Present Simple መጠቀም ይቻላል።',
      },
    ],
  },

  'eng1-mod-u2': {
    subject: 'english',
    chapterNumber: 2,
    titleAm: 'ምዕራፍ 2፡ ጤና እና አካላዊ ብቃት (Health, Fitness & Conditionals)',
    briefOverviewAm: 'ስለ ጤና፣ አመጋገብና ስፖርት ንባብ/ቃላት፣ Conditional Sentences (Zero, First, Second, Third & Mixed Conditionals) እና Giving Advice (should/ought to/had better) ያስተምራል።',
    briefPointsAm: [
      'Zero Conditional (ሁልጊዜ እውነት/ሳይንስ)፡ If + V1, ... V1 ("If you heat ice, it melts")።',
      'First Conditional (እውን/ሊሆን የሚችል ወደፊት)፡ If + V1, ... will + V1 ("If I study, I will pass")።',
      'Second Conditional (ያልሆነ/ምናባዊ አሁን)፡ If + V2 (were), ... would + V1 ("If I were you, I would exercise")።',
      'Third Conditional (ያለፈ ጸጸት — መለወጥ የማይቻል!)፡ If + had + V3, ... would have + V3።',
    ],
    examTipAm: 'በSecond Conditional ውስጥ ለሁሉም Pronouns (I, he, she, it) **"were"** መጠቀም ትክክለኛው መደበኛ ሰዋስው ነው ("If I were rich...")፤ እንዲሁም **"will"** ወይም **"would"** ከ"If" ክፍል ውስጥ በፍጹም አይገቡም!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የጤና፣ የአካል ብቃት (Nutrition, Sedentary Lifestyle, Aerobic Exercise) ርዕሶችን በማንበብና በማዳመጥ ክህሎቶች ከConditionals (Zero, First, Second, Third, Unless = If...not, Provided that, In case) እና ከModal Verbs of Advice (Should, Ought to, Had better) ጋር በጥልቀት ያስተምራል። እንዲሁም በጽሑፍ ክህሎት ውስጥ Paragraph Structure (Topic Sentence, Supporting Sentences, Concluding Sentence) እና Coherence/Unityን ያቀርባል።',
    learningOutcomesAm: [
      'አራቱን የConditional ዓይነቶች (Zero, 1st, 2nd, 3rd) ያለ ስህተት መገንባትና መለየት።',
      '"Unless" (= If...not) እና "Wish / If only" አወቃቀርን በፈተና ላይ መፍታት።',
      'ውጤታማ የParagraph መዋቅር (Topic Sentence + Supporting Details + Concluding Sentence) መጻፍ።',
    ],
    sectionsAm: [
      {
        headingAm: '2.1 Conditional Sentences (0, 1st, 2nd, 3rd) & Paragraph Writing',
        contentAm: `| ዓይነት | If-Clause (ሁኔታ) | Main Clause (ውጤት) | ትርጉም |
| :--- | :--- | :--- | :--- |
| **Zero** | Present Simple ($V_1$) | Present Simple ($V_1$) | ቋሚ ሳይንሳዊ እውነታ |
| **First** | Present Simple ($V_1$) | will / can / may + $V_1$ | ለወደፊት ሊሆን የሚችል እውን ሁኔታ |
| **Second** | Past Simple ($V_2$ / **were**) | would / could + $V_1$ | አሁን እውን ያልሆነ / ምናባዊ |
| **Third** | Past Perfect (**had + $V_3$**) | would / could **have + $V_3$** | ያለፈ የማይቀየር ጸጸት |`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አስተካክሉ: "If he had studied harder last semester, he _______ (get) an A grade."',
        stepsAm: [
          '1. "last semester" እና "had studied" (Past Perfect) ስለሆነ 3rd Conditional ነው → **would have gotten (got)**!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Unless', termAm: 'አንለስ (If ... not)', definitionAm: '"ካል... በስተቀር" ማለት ነው፤ ከUnless በኋላ ሁልጊዜ አዎንታዊ (Affirmative) ግስ ይገባል ("Unless you study", NOT "Unless you don\'t study")።' },
    ],
    examTrapsAm: [
      '"If I would have known..." ስህተት ነው! በIf-clause ውስጥ "would" አይገባም — ትክክለኛው **"If I had known..."** (ወይም "Had I known..." Inversion) ነው!',
    ],
    keyTakeawaysAm: [
      'የHad better ("Had better V1") ትርጉም ጠንካራ ማስጠንቀቂያ ያለው ምክር ሲሆን "past tense" አይደለም!',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "If it weren\'t for your help, I wouldn\'t pass" የሚለውን በInversion እንዴት እንጽፈዋለን?',
        answerAm: 'መልስ፡ **"Were it not for your help, I wouldn\'t pass."**',
      },
    ],
  },

  'eng1-mod-u3': {
    subject: 'english',
    chapterNumber: 3,
    titleAm: 'ምዕራፍ 3፡ ባህላዊ እሴቶች (Cultural Values & Past/Present Perfect Tenses)',
    briefOverviewAm: 'ስለ ባህልና ባህላዊ እሴቶች፣ Past Simple vs Present Perfect vs Past Perfect Tenses፣ For/Since/Already/Yet እና Descriptive/Narrative Paragraph Writing ያስተምራል።',
    briefPointsAm: [
      'Past Simple (V2)፡ በተወሰነ ያለፈ ጊዜ የተጠናቀቀ ድርጊት (yesterday, in 2010, two days ago)።',
      'Present Perfect (has/have + V3)፡ ጊዜው ሳይጠቀስ የተፈጸመ፣ ወይም ከትናንት እስከ አሁን የቀጠለ (since, for, already, yet, ever)።',
      'Past Perfect (had + V3)፡ ካለፉ ሁለት ድርጊቶች **ቀድሞ** የተፈጸመው! ("Before I arrived, the train had left")።',
      'Since (ከመነሻ ነጥብ — since 2020, since Monday) vs For (የጊዜ ርዝመት — for 3 years, for 2 hours)።',
    ],
    examTipAm: 'በአንድ ዓረፍተ ነገር ውስጥ "yesterday", "ago", "last year", "in 1998" ከተጠቀሱ Present Perfect (have gone) መጠቀም በፍጹም አይቻልም — **Past Simple (went)** ግዴታ ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የኢትዮጵያንና የዓለምን ባህላዊ እሴቶች (Hospitality, Cultural Heritage, Generational Values) ከቋንቋ ክህሎቶች ጋር ያስተምራል። በዋናነት በPast Simple (V2), Present Perfect (have/has + V3), Present Perfect Continuous (have/has been + V-ing) እና Past Perfect (had + V3) መካከል ያለውን የጊዜ ልዩነት፣ የ"Since vs For", "Been to vs Gone to", "Just/Already/Yet" አጠቃቀም፣ Vocabulary Context Clues (Synonyms, Antonyms, Affixes) እና Narrative/Descriptive Writingን በጥልቀት ያቀርባል።',
    learningOutcomesAm: [
      'Past Simple እና Present Perfect Tensesን ከTime Expressions (ago/in 2020 vs since/for/yet) ጋር በትክክል መለየት።',
      'Past Perfectን በመጠቀም ካለፉ ሁለት ድርጊቶች መካከል ቀዳሚውን ማሳየት።',
      'የWord Formation (Prefixes/Suffixes) እና Context Cluesን በመጠቀም የአዳዲስ ቃላትን ትርጉም መገመት።',
    ],
    sectionsAm: [
      {
        headingAm: '3.1 Past Simple vs Present Perfect vs Past Perfect',
        contentAm: `### 3.1.1 Tense Matrix
- **Past Simple ($V_2$)**: "I **visited** Lalibela in 2022." (የተወሰነ ያለፈ ጊዜ ተጠቅሷል)።
- **Present Perfect ($have/has + V_3$)**: "I **have visited** Lalibela three times." (የሕይወት ልምድ — መቼ እንደሆነ አልተጠቀሰም!)።
- **Present Perfect Continuous ($have/has\\text{ been} + V\\text{-ing}$)**: በተግባሩ ቆይታ/ሂደት ላይ ያተኩራል ("She has been reading for 3 hours")።
- **Past Perfect ($had + V_3$)**: "When we **got** (2ኛ) to class, the quiz **had already started** (1ኛ)."`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'ትክክለኛውን ምረጡ: "Abebe _______ (live) in Addis Ababa since he graduated in 2019."',
        stepsAm: [
          '1. "since 2019" (ከ2019 ጀምሮ እስከ ዛሬ የቀጠለ) ስለሆነ → **has lived** ወይም **has been living** (Past Simple "lived" ስህተት ነው!)።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Have been to vs Have gone to', termAm: 'ሄዶ መመለስ vs እዚያው መሆን', definitionAm: '"Has been to Gondar" = ሄዶ ተመልሷል፤ "Has gone to Gondar" = አሁንም ጎንደር ውስጥ ነው (ገና አልተመለሰም)።' },
    ],
    examTrapsAm: [
      '"Already" በPositive ዓረፍተ ነገር፣ "Yet" በNegative እና Question መጨረሻ ላይ ይገባሉ ("Have you finished yet?")!',
    ],
    keyTakeawaysAm: [
      'Past Perfect ሁልጊዜ የ"Past in the Past" (ካለፈ ድርጊት በፊት የሆነ) መግለጫ ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "I have seen him yesterday" ለምን ስህተት ነው?',
        answerAm: 'መልስ፡ "yesterday" የተዘጋ/ያለፈ ጊዜ ስለሆነ Present Perfect አይወስድም፤ ትክክለኛው **"I saw him yesterday"** ነው።',
      },
    ],
  },

  'eng1-mod-u4': {
    subject: 'english',
    chapterNumber: 4,
    titleAm: 'ምዕራፍ 4፡ የዱር እንስሳት (Wild Animals, Passive Voice & Denotation/Connotation)',
    briefOverviewAm: 'ስለ ዱር እንስሳትና ብዝሃ ሕይወት ጥበቃ፣ Active vs Passive Voice (በሁሉም Tenses)፣ Denotation vs Connotation እና Expository Writingን ያስተምራል።',
    briefPointsAm: [
      'Passive Voice ቀመር፡ Subject + **be (በዋናው ግስ Tense)** + **V3 (Past Participle)** (+ by Agent)።',
      'Active/Passive ምሳሌ፡ "Poachers kill elephants" → "Elephants **are killed** by poachers"፤ Continuous: "is killing" → "**is being killed**"።',
      'Denotation (የመዝገበ-ቃላት ቀጥተኛ ትርጉም) vs Connotation (ቃሉ የሚፈጥረው አዎንታዊ/አሉታዊ ስሜት — ለምሳሌ "thrifty" vs "stingy")።',
      'Passive የሚመረጠው፡ ድርጊት ፈጻሚው ሲታወቅ/አስፈላጊ ካልሆነ ወይም በሳይንሳዊ ሪፖርት ላይ ድርጊቱን ለማጉላት።',
    ],
    examTipAm: 'በPassive Voice ቅየራ ወቅት የ**"be"** ግስ ሁልጊዜ የዋናውን ግስ Tense መውሰድ አለበት (Continuous ከሆነ **being**፣ Perfect ከሆነ **been** እንዳትረሱ)!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የዱር እንስሳት ጥበቃ (Endangered Species, Wildlife Conservation, Poaching & Eco-tourism in Ethiopia) ርዕስን በመጠቀም የActive እና Passive Voice አወቃቀርን በሁሉም Tenses (Simple, Continuous, Perfect, Modals, Ditransitive Verbs with 2 Objects)፣ የ"by Agent" መቼ እንደሚጠፋ፣ Phrasal Verbs፣ Denotation vs Connotation (Neutral, Positive, Negative Shades of Meaning) እና Expository/Cause-and-Effect Paragraph Writingን በጥልቀት ያስተምራል።',
    learningOutcomesAm: [
      'ማንኛውንም Active ዓረፍተ ነገር (Simple, Continuous, Perfect, Modal) ወደ Passive Voice መቀየር።',
      'Passive Voice መቼ እንደሚመረጥ (Unknown/Obvious/Scientific Objectivity) ማስረዳት።',
      'የቃላትን Denotation እና Connotation (አዎንታዊ vs አሉታዊ ቃና) መለየት።',
    ],
    sectionsAm: [
      {
        headingAm: '4.1 Passive Voice Matrix (በሁሉም Tenses)',
        contentAm: `| Tense | Active Form | Passive Form |
| :--- | :--- | :--- |
| Present Simple | protects | **is/are protected** |
| Present Continuous | is protecting | **is/are being protected** |
| Past Simple | protected | **was/were protected** |
| Present Perfect | has protected | **has/have been protected** |
| Modals (can/must) | must protect | **must be protected** |`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'ወደ Passive ቀይሩ: "The park rangers are protecting the Walia Ibex carefully."',
        stepsAm: [
          '1. Object ("the Walia Ibex") Subject ይሁን።',
          '2. "are protecting" (Present Continuous) → "**is being protected**".',
          '3. መልስ፡ **"The Walia Ibex is being protected carefully by the park rangers."**',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Intransitive Verb', termAm: 'ኢንትራንዚቲቭ ግስ', definitionAm: 'Direct Object የማይወስድ ግስ (እንደ sleep, arrive, happen, die) — **ወደ Passive በፍጹም አይቀየርም!**' },
    ],
    examTrapsAm: [
      '"The accident was happened" በፍጹም አትበሉ! "happen", "occur", "sleep", "arrive" Intransitive ስለሆኑ Passive የላቸውም — ትክክለኛው **"The accident happened"** ነው!',
    ],
    keyTakeawaysAm: [
      'Passive Voice በሳይንሳዊ ምርምርና በላቦራቶሪ ሪፖርት ላይ ተጨባጭነትን (Objectivity) ይጨምራል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "slender" እና "skinny" ተመሳሳይ Denotation ቢኖራቸውም Connotation ልዩነታቸው ምንድን ነው?',
        answerAm: 'መልስ፡ ሁለቱም "ቀጭን" ማለት ናቸው (Denotation)፤ ነገር ግን **slender** አዎንታዊ (አማላይ/ቆንጆ ቅጥነት) ሲሆን **skinny** ግን አሉታዊ (የከሳ/ያልተመቸ) Connotation አለው።',
      },
    ],
  },

  'eng1-mod-u5': {
    subject: 'english',
    chapterNumber: 5,
    titleAm: 'ምዕራፍ 5፡ የሕዝብ ቁጥር እና መግባቢያ ሰዋስው (Population, Collocations & Comparisons)',
    briefOverviewAm: 'ስለ ዓለምና የኢትዮጵያ የሕዝብ ቁጥር ዕድገት፣ Collocations, Comparatives & Superlatives፣ Relative Clauses (Defining/Non-Defining) እና Essay Structureን ያስተምራል።',
    briefPointsAm: [
      'Comparatives & Superlatives፡ አጭር ቅጽል (-er / -est) vs ረጅም ቅጽል (more / most)፤ Irregular: good–better–best, bad–worse–worst, far–farther–farthest።',
      'Parallel Comparison፡ "The more we educate women, the healthier the society becomes" (The + comparative..., the + comparative...)።',
      'Collocations፡ በእንግሊዝኛ አብረው የሚሄዱ ቃላት (ለምሳሌ **make** a mistake, **do** homework, **heavy** rain እንጂ strong rain አይባልም!)።',
      'Essay Structure፡ Introduction (Hook + Thesis Statement) → Body Paragraphs → Conclusion።',
    ],
    examTipAm: 'Double Comparatives ("more better", "more easier") በእንግሊዝኛ ትልቅ ስህተት ናቸው! ትክክለኛው **"much better"** ወይም **"much easier"** ነው።',
    expandedOverviewAm:
      'ይህ የመጨረሻው የCommunicative English I ምዕራፍ የሕዝብ ቁጥር እድገትን፣ ከተሜነትን (Urbanization) እና የሀብት ክፍፍልን መሠረት በማድረግ Collocations (Verb+Noun, Adj+Noun), Degrees of Comparison (Positive as...as, Comparative, Superlative, "The more... the more..." Structures), Modifiers of Comparison (far/much/a bit + comparative), Pronouns & Antecedent Agreement፣ እንዲሁም ከParagraph ወደ ሙሉ Academic Essay (Thesis Statement & Cohesive Devices) መሸጋገርን በጥልቀት ያስተምራል።',
    learningOutcomesAm: [
      'Comparatives, Superlatives, "as...as" እና "the more..., the more..." መዋቅሮችን ያለ ስህተት መጠቀም።',
      'የተለመዱ Academic Collocations (make/do, take/give, heavy/strong) መለየት።',
      'ግልጽ Thesis Statement ያለው ባለ 4–5 አንቀጽ Essay ማዋቀር።',
    ],
    sectionsAm: [
      {
        headingAm: '5.1 Comparison Structures, Collocations & Academic Essay',
        contentAm: `### 5.1.1 Comparison Traps & Modifiers
- **Modifier with Comparative**: "far / much / considerably / slightly **higher than**" (**very higher** በፍጹም አትበሉ!)።
- **Irregulars**: good → better → best | bad → worse → worst | little → less → least | many/much → more → most።
- **Parallel Increase**: "The **faster** the population grows, the **greater** the demand for jobs."

### 5.1.2 Common Make vs Do Collocations
- **Make**: make a decision, make a mistake, make progress, make money, make an effort።
- **Do**: do homework, do research, do business, do your best, do a favor።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አስተካክሉ: "Addis Ababa is very bigger than Adama, and it has the most highest population in Ethiopia."',
        stepsAm: [
          '1. "very bigger" → **much bigger** ("very" ከComparative ጋር አይገባም)።',
          '2. "most highest" → **the highest** (Double Superlative አይቻልም!)።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Thesis Statement', termAm: 'ቴሲስ ስቴትመንት', definitionAm: 'በEssay መግቢያ (Introduction) መጨረሻ ላይ የሚቀመጥ የሙሉ ጽሑፉን ዋና አቋምና አቅጣጫ የሚገልጽ ዓረፍተ ነገር።' },
    ],
    examTrapsAm: [
      '"Different **from**" ትክክል ነው ("different than/to" በብሪቲሽ/አሜሪካን ቢኖርም በአካዳሚክ ፈተና "different **from**" ይመረጣል)፤ እንዲሁም "prefer A **to** B" እንጂ "prefer A than B" አይባልም!',
    ],
    keyTakeawaysAm: [
      'Cohesive Devices (Furthermore, In contrast, Consequently) ሃሳቦችን በአንቀጾች መካከል በሚገባ ያገናኛሉ።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "Fewer" እና "Less" መካከል ያለው የሰዋስው ልዩነት ምንድን ነው?',
        answerAm: 'መልስ፡ **Fewer** ለሚቆጠሩ ነገሮች (Countable plural nouns — fewer students, fewer cars) ሲሆን **Less** ግን ለማይቆጠሩ (Uncountable nouns — less water, less time) ነው!',
      },
    ],
  },
};
