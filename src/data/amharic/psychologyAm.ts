import type { AmharicChapterNote } from './types';

export const PSYCHOLOGY_AM_NOTES: Record<string, AmharicChapterNote> = {
  'psyc-mod-ch1': {
    subject: 'psychology',
    chapterNumber: 1,
    titleAm: 'ምዕራፍ 1፡ የሳይኮሎጂ ምንነት፣ ግቦች፣ ታሪካዊ ትምህርት ቤቶች እና የምርምር ዘዴዎች',
    briefOverviewAm:
      'የPsychology ትርጉም (Behavior & Mental Processes)፣ 4ቱ ግቦች (Description, Explanation, Prediction, Control)፣ 5ቱ ቀደምት ትምህርት ቤቶች (Structuralism, Functionalism, Gestalt, Behaviorism, Psychoanalysis)፣ 6ቱ ዘመናዊ አመለካከቶች እና Experimental Research Methods ያስተምራል።',
    briefPointsAm: [
      'Psychology፡ የሰውንና የእንስሳትን **Behavior** (የሚታይ ድርጊት) እና **Mental Processes** (ውስጣዊ አስተሳሰብ/ስሜት) በሳይንሳዊ መንገድ የሚያጠና ሳይንስ ነው።',
      '4 Goals of Psychology፡ **Describe** ("ምን?") $\\rightarrow$ **Explain** ("ለምን?") $\\rightarrow$ **Predict** ("መቼ/ምን ይከሰታል?") $\\rightarrow$ **Control/Modify** ("እንዴት መቀየር/ማሻሻል ይቻላል?")።',
      'Early Schools፡ Structuralism (Wundt/Titchener — Introspection) vs Functionalism (William James — Purpose of consciousness) vs Gestalt (Max Wertheimer — "The whole is greater than the sum of its parts") vs Behaviorism (Watson/Skinner — Observable behavior) vs Psychoanalysis (Freud — Unconscious motives)።',
      'Correlation $\\ne$ Causation! ምክንያትና ውጤትን (Cause-and-Effect) ማረጋገጥ የሚችለው **Experimental Research Method** (Random assignment + Manipulation of Independent Variable) ብቻ ነው!',
    ],
    examTipAm:
      'Wilhelm Wundt (1879, Leipzig, Germany) "Father of Modern Psychology" ሲሆን Edward Titchener ትምህርት ቤቱን **Structuralism** ብሎ ሰየመው — ሁለቱም **Introspection** (የራስን ውስጣዊ ልምድ መመልከት) ተጠቅመዋል!',
    expandedOverviewAm:
      'General Psychology (Psyc 1011) Chapter 1 የሳይኮሎጂን ሳይንሳዊ መሠረት ያስቀምጣል። ቃሉ ከግሪክ *Psyche* (Mind/Soul) እና *Logos* (Study) እንደመጣ፣ 4ቱን መሠረታዊ ግቦች (Description, Explanation, Prediction, Control)፣ 5ቱን Historical Schools of Thought ከመሥራቾቻቸውና መሪ ቃላቸው ጋር፣ 6ቱን Modern Perspectives (Psychodynamic, Behavioral, Humanistic [Maslow/Rogers — Free will], Cognitive, Biological/Neuroscience, Socio-cultural)፣ የሳይኮሎጂ ንዑስ ዘርፎችን (Clinical vs Counseling, Developmental, Educational, Industrial/Organizational, Forensic) እና 3ቱን ዋና Research Methods (Descriptive [Naturalistic observation, Case study, Survey], Correlational [$r \in [-1, +1]$], እና Experimental [IV, DV, Experimental/Control groups, Random assignment, Double-blind]) በጥልቀት ያስተምራል።',
    learningOutcomesAm: [
      'የBehavior እና Mental Processes ልዩነትን እንዲሁም የሳይኮሎጂን 4 ግቦች በምሳሌ መለየት።',
      'Structuralism, Functionalism, Gestalt, Behaviorism እና Psychoanalysisን ከመሥራቾቻቸው እና ዋና ጽንሰ-ሐሳባቸው ጋር ማዛመድ።',
      '6ቱን ዘመናዊ Perspectives (Behavioral, Cognitive, Humanistic, Biological, Psychodynamic, Socio-cultural) በአንድ ባህሪ ላይ መተግበር።',
      'Correlation Coefficient ($r = -0.85$ vs $r = +0.50$) መተርጎም እና Descriptive, Correlational & Experimental ዘዴዎችን መለየት።',
    ],
    sectionsAm: [
      {
        headingAm: '1.1 ቀደምት ትምህርት ቤቶች እና ዘመናዊ አመለካከቶች',
        contentAm: `### 1.1.1 Historical Schools of Thought Matrix
| School | Founder(s) | Central Focus & Method |
|---|---|---|
| **Structuralism** | W. Wundt (1879), E. Titchener | Structure of consciousness ("atoms of mind") via **Introspection** |
| **Functionalism** | **William James** | *Purpose/Function* of consciousness for adaptation (influenced by Darwin) |
| **Gestalt Psychology** | **Max Wertheimer**, Koffka, Köhler | Organization of perception ("The whole is different from the sum of parts") |
| **Behaviorism** | **John B. Watson**, B.F. Skinner | Strictly **observable behavior** ($S-R$), rejects introspection & mind |
| **Psychoanalysis** | **Sigmund Freud** | **Unconscious** conflicts, childhood experiences, dreams & defense mechanisms |

### 1.1.2 Six Modern Perspectives
1. **Psychodynamic**: Modified Freud — unconscious drives & early relationships.
2. **Behavioral**: Learning through conditioning, rewards, and punishments.
3. **Humanistic** (Maslow, Carl Rogers — "Third Force"): Free will, self-actualization, inherent goodness.
4. **Cognitive**: How we encode, process, store, and retrieve information (Computer metaphor).
5. **Biological (Neuroscience)**: Brain chemistry, neurotransmitters, hormones, and genetics.
6. **Socio-cultural**: How culture, norms, ethnicity, and social context shape behavior.`,
      },
      {
        headingAm: '1.2 Subfields & Research Methods',
        contentAm: `### 1.2.1 Correlational vs Experimental Research
- **Correlation Coefficient ($r$)**: ከ$-1.00$ እስከ $+1.00$ ይለካል። Sign ($+/-$) **አቅጣጫን** ብቻ ያሳያል፤ Magnitude ($|r|$) **ጥንካሬን** ያሳያል! (ምሳሌ፡ $r = -0.88$ ከ$r = +0.65$ **የበለጠ ጠንካራ** ግንኙነት ነው!)
- **Experiment**: **Cause-and-Effect** የሚያረጋግጥ ብቸኛ ዘዴ! Independent Variable (Manipulated by researcher) $\\rightarrow$ Dependent Variable (Measured outcome); **Random Assignment** Confounding variablesን ያጠፋል።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ ጥናት "በተማሪዎች የማህበራዊ ሚዲያ ሰዓት እና በGPA መካከል $r = -0.78$ ግንኙነት አለ" ቢል፣ ይህ የሚያሳየው ምንድን ነው? በራሱ Causation ያረጋግጣል?',
        stepsAm: [
          '1. Negative sign ($-$) ማለት አንዱ ሲጨምር ሌላው ይቀንሳል (Inverse relationship: ብዙ ሰዓት $\\leftrightarrow$ ዝቅተኛ GPA)።',
          '2. $|-0.78| = 0.78$ ወደ $1.0$ የቀረበ **ጠንካራ** ግንኙነት ነው።',
          '3. **Causation አያረጋግጥም!** Correlational study ስለሆነ ሦስተኛ ተለዋዋጭ (e.g., ዝቅተኛ መነሳሳት) ለሁለቱም ምክንያት ሊሆን ይችላል።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Introspection', termAm: 'ውስጣዊ ምልከታ', definitionAm: 'የሰለጠኑ ሰዎች የራሳቸውን ውስጣዊ ስሜትና አስተሳሰብ በቃላት እንዲገልጹ የሚያደርግ የStructuralism ዘዴ።' },
      { termEn: 'Random Assignment', termAm: 'በዕድል መመደብ', definitionAm: 'በሙከራ ውስጥ ተሳታፊዎችን ያለ አድሎአዊነት ወደ Experimental ወይም Control ቡድን በእኩል ዕድል መመደብ።' },
    ],
    examTrapsAm: [
      '$r = -0.90$ ከ$r = +0.45$ **የበለጠ ጠንካራ** Correlation ነው — Negative መሆኑ ደካማ አያደርገውም!',
      '**Clinical Psychologist** (PhD/PsyD — Therapy & Psychological testing, No prescription) vs **Psychiatrist** (MD Medical Doctor — **መድኃኒት ማዘዝ ይችላል!**)።',
    ],
    keyTakeawaysAm: [
      'Psychology በ1879 በWilhelm Wundt እንደ ራሱን የቻለ ሳይንስ በጀርመን ተመሠረተ።',
      'Case Study ጥልቅ መረጃ ይሰጣል ግን ለጠቅላላ ሕዝብ Generalize ለማድረግ አይመችም፤ Experiment ብቻ Causation ይፈትሻል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "አንድ ተማሪ በፈተና ያወደቀው አሉታዊ አስተሳሰብ (Irrational beliefs) እና የመረጃ አቀናባበር ድክመት ስላለበት ነው" የሚለው የትኛው ዘመናዊ Perspective ነው?',
        answerAm: 'መልስ፡ **Cognitive Perspective** (አስተሳሰብ፣ ትውስታ እና የመረጃ ሂደት ላይ ስለሚያተኩር)።',
      },
    ],
  },

  'psyc-mod-ch2': {
    subject: 'psychology',
    chapterNumber: 2,
    titleAm: 'ምዕራፍ 2፡ ስሜት እና ግንዛቤ (Sensation and Perception)',
    briefOverviewAm:
      'Sensation vs Perception, Transduction, Absolute Threshold vs Difference Threshold (Weber’s Law), Signal Detection Theory, Sensory Adaptation, Attention, Gestalt Grouping Laws, Depth Cues, Perceptual Constancies እና Illusions ያስተምራል።',
    briefPointsAm: [
      'Sensation (ስሜት መቀበል — Bottom-up, Physical energy $\\rightarrow$ Neural signal via **Transduction**) vs Perception (ትርጉም መስጠት — Top-down interpretation in Brain)።',
      'Thresholds፡ **Absolute Threshold** = 50% of the time የሚታወቅ ዝቅተኛው ማነቃቂያ፤ **Difference Threshold (JND)** በ**Weber’s Law** ($\\frac{\\Delta I}{I} = k$) መሠረት በPercent/Proportion እንጂ በFixed number አይደለም!',
      'Sensory Adaptation፡ ቋሚና የማይቀየር ማነቃቂያ (ለምሳሌ የሰዓት ወይም የሽቶ ሽታ) ሲቆይ የስሜት አካላት መልመድ/ምላሽ መቀነስ።',
      'Gestalt Laws፡ Figure-Ground, Proximity, Similarity, Closure, Continuity/Good Continuation, Common Fate።',
    ],
    examTipAm:
      'በWeber’s Law ($\\frac{\\Delta I}{I} = k$) መሠረት 1 kg ላይ 0.1 kg መጨመርን ለመለየት $k = 10\\%$ ከሆነ፣ **10 kg** ላይ ለውጡን ለመለየት 0.1 kg በቂ አይደለም — **1 kg ($10\\%$ of $10$)** መጨመር አለበት!',
    expandedOverviewAm:
      'Chapter 2 ውጫዊው ዓለም እንዴት ወደ አእምሯችን ገብቶ ትርጉም እንደሚያገኝ ይመረምራል። Sensation vs Perception (Bottom-up vs Top-down processing)፣ Sensory Laws (Absolute threshold, Subliminal perception, Difference threshold/JND & Weber-Fechner Law, Signal Detection Theory separating sensitivity from response bias, Sensory Adaptation)፣ Attention (Selective Attention, Cocktail Party Effect, Inattentional Blindness & Change Blindness, External vs Internal factors)፣ Gestalt Form Perception Laws፣ Monocular vs Binocular Depth Cues (Retinal Disparity & Convergence vs Linear perspective, Interposition, Relative size, Texture gradient, Aerial perspective, Motion parallax)፣ Perceptual Constancies (Size, Shape, Brightness, Color) እና Visual Illusions (Müller-Lyer, Ponzo, Moon illusion) በዝርዝር ይሸፈናሉ።',
    learningOutcomesAm: [
      'Sensation (Transduction) እና Perception መካከል ያለውን ልዩነት እና Bottom-up vs Top-down processing ማብራራት።',
      'Absolute Threshold እና Difference Threshold (Weber’s Law $\\Delta I / I = k$) ማስላት።',
      'የAttention ተጽዕኖዎችን (External: Intensity, Contrast, Novelty, Movement vs Internal: Motive, Set, Interest) መለየት።',
      'Gestalt Laws (Proximity, Similarity, Closure, Continuity) እና Binocular vs Monocular Depth Cues መለየት።',
    ],
    sectionsAm: [
      {
        headingAm: '2.1 Sensory Laws, Weber’s Law & Attention',
        contentAm: `### 2.1.1 Psychophysics & Sensory Adaptation
- **Transduction**: Sensory receptors physical energyን (ብርሃን፣ ድምፅ፣ ግፊት) ወደ **Neural action potentials** መቀየር።
- **Weber’s Law**: $\\frac{\\Delta I}{I} = k$ (JND ከመጀመሪያው ማነቃቂያ መጠን ጋር ቀጥታ ተመጣጣኝ ነው!)።
- **Sensory Adaptation**: የልብስ ክብደት ወይም የክፍል ሽታ ከጥቂት ደቂቃዎች በኋላ አይታወቀንም (ነገር ግን **Pain** እና **Eye micro-saccades** ሙሉ በሙሉ Adapt አያደርጉም!)።

### 2.1.2 Selective Attention Factors
- **External (Stimulus)**: Size, Intensity, Repetition, Novelty/Contrast, Movement.
- **Internal (Perceiver)**: Motivation/Needs (የተራበ ሰው የምግብ ማስታወቂያ ቀድሞ ያያል!), Set/Expectancy, Emotional state, Interest።`,
      },
      {
        headingAm: '2.2 Gestalt Laws, Depth Perception & Constancies',
        contentAm: `### 2.2.1 Gestalt Principles of Form Organization
- **Figure-Ground**: ዋናውን ነገር (Figure) ከጀርባው (Ground) መለየት (e.g., Rubin\'s Vase/Faces)።
- **Proximity**: የተቀራረቡ ነገሮችን እንደ አንድ ቡድን ማየት።
- **Similarity**: ተመሳሳይ ቅርጽ/ቀለም ያላቸውን አንድ ላይ መመደብ።
- **Closure**: ክፍት ቦታዎችን አእምሮ ሞልቶ ሙሉ ቅርጽ መሥራት።
- **Continuity**: ለስላሳና ቀጣይነት ያለውን መስመር መከተል።

### 2.2.2 Depth Cues & Perceptual Constancies
- **Binocular Cues (ሁለት ዓይኖች ያስፈልጋሉ)**: **Retinal Disparity** (በ2 ዓይኖች ምስል ልዩነት) እና **Convergence** (ቅርብ ነገር ሲታይ ዓይኖች ወደ ውስጥ መዞር)።
- **Monocular Cues (አንድ ዓይን በቂ ነው)**: **Interposition** (ፊት ያለው የኋላውን ይሸፍናል), **Linear perspective** (ትይዩ መስመሮች ርቀው ሲሄዱ ይገናኛሉ), **Texture gradient**, **Relative size**, **Motion parallax**።
- **Perceptual Constancy**: የRetina ምስል ቢቀየርም የነገሩን እውነተኛ **Size, Shape, Color, Brightness** ቋሚ አድርጎ መረዳት!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'የWeber’s Constant ለክብደት $k = 0.02$ ($2\\%$) ከሆነ፣ 50 kg ሻንጣ የያዘ ሰው ክብደቱ መጨመሩን (JND) ለማወቅ ቢያንስ ስንት kg መጨመር አለበት?',
        stepsAm: [
          '1. $\\Delta I = k \\times I$',
          '2. $\\Delta I = 0.02 \\times 50\\text{ kg} = \\mathbf{1.0\\text{ kg}}$!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Transduction', termAm: 'ትራንስዳክሽን', definitionAm: 'ውጫዊ Physical energyን በReceptors አማካኝነት ወደ አእምሮ Neural impulses የመቀየር ሂደት።' },
      { termEn: 'Retinal Disparity', termAm: 'የሬቲና ልዩነት', definitionAm: 'ግራና ቀኝ ዓይኖች ትንሽ የተለየ ማዕዘን ስለሚያዩ አእምሮ ጥልቀትን (3D Depth) የሚያሰላበት Binocular cue።' },
    ],
    examTrapsAm: [
      'Signal Detection Theory ላይ Hit (Present & Yes), Miss (Present & No), **False Alarm** (Absent & Yes), Correct Rejection (Absent & No) እንዳትቀላቅሉ!',
      'Müller-Lyer Illusion (እኩል መስመሮች በቀስት አቅጣጫ የተለየ ርዝመት መምሰላቸው) እና **Moon Illusion** የSize Constancy ከDepth cues ጋር ሲጋጭ የሚፈጠሩ ናቸው።',
    ],
    keyTakeawaysAm: [
      'Sensation = Bottom-up raw data capture; Perception = Top-down brain interpretation.',
      'Binocular cues = Retinal Disparity & Convergence፤ ሌሎቹ (Interposition, Linear perspective, Texture, Aerial, Relative size) Monocular ናቸው!',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ አንድ የተዘጋ በር ከፊት፣ ከጎንና በትንሹ ተከፍቶ ሲታይ በRetina ላይ ቅርጹ Rectangle ሳይሆን Trapezoid ቢመስልም በር መሆኑን አናጣም — ይህ ምንድን ነው?',
        answerAm: 'መልስ፡ **Shape Constancy**!',
      },
    ],
  },

  'psyc-mod-ch3': {
    subject: 'psychology',
    chapterNumber: 3,
    titleAm: 'ምዕራፍ 3፡ ትምህርት እና የባህሪ ለውጥ ንድፈ-ሐሳቦች (Learning Theories)',
    briefOverviewAm:
      'Definition of Learning, Classical Conditioning (Pavlov: UCS, UCR, CS, CR, Extinction, Spontaneous Recovery, Generalization vs Discrimination), Operant Conditioning (Skinner: Positive/Negative Reinforcement vs Punishment & 4 Schedules), Bandura’s Social Learning & Cognitive Learning ያስተምራል።',
    briefPointsAm: [
      'Learning፡ በልምምድ/በተሞክሮ የሚመጣ **በአንጻራዊነት ዘላቂ (Relatively permanent)** የባህሪ ለውጥ (Maturation, Fatigue, Drugs ትምህርት አይደሉም!)።',
      'Classical Conditioning (Pavlov — Involuntary reflexes)፡ **UCS** (Food) $\\rightarrow$ **UCR** (Salivation); Neutral Stimulus (**NS** Bell) + **UCS** $\\rightarrow$ **CS** (Bell) $\\rightarrow$ **CR** (Salivation)።',
      'Operant Conditioning (Skinner — Voluntary behavior)፡ **Reinforcement** (ሁልጊዜ ባህሪን **ይጨምራል!** Positive = Add pleasant, Negative = **Remove unpleasant!**) vs **Punishment** (ሁልጊዜ ባህሪን **ይቀንሳል!**)።',
      'Schedules of Reinforcement፡ **Variable-Ratio (VR)** (Slot machines) ከፍተኛውን ምላሽና Extinction Resistance ይሰጣል! Fixed-Interval (FI) = Scalloped response (ከፈተና በፊት ብቻ ማጥናት!)።',
    ],
    examTipAm:
      '**Negative Reinforcement ቅጣት (Punishment) አይደለም!** "Negative" ማለት **መቀነስ/ማስወገድ (Remove)** ማለት ሲሆን "Reinforcement" ማለት **ባህሪውን መጨመር** ነው (ምሳሌ፡ የራስ ምታት እንዲጠፋ Aspirin መውሰድ $\\rightarrow$ Aspirin የመውሰድ ባህሪ ይጨምራል!)።',
    expandedOverviewAm:
      'Chapter 3 የሳይኮሎጂ እጅግ ከፍተኛ የፈተና ክብደት ያለውን **Learning** ምዕራፍ ያስተምራል። (1) **Classical (Respondent) Conditioning** (Ivan Pavlov, John Watson’s Little Albert experiment, Acquisition, Extinction, Spontaneous Recovery, Stimulus Generalization vs Discrimination, Higher-Order Conditioning)። (2) **Operant (Instrumental) Conditioning** (Thorndike’s Law of Effect, B.F. Skinner, Shaping via successive approximations, 2x2 Matrix of Positive/Negative Reinforcement & Positive/Negative Punishment, Primary vs Secondary Reinforcers, Continuous vs 4 Partial Schedules: FR, VR, FI, VI)። (3) **Observational / Social Learning Theory** (Albert Bandura — Bobo Doll experiment, 4 steps: Attention, Retention, Reproduction, Motivation + Vicarious reinforcement) እና (4) **Cognitive Learning** (Tolman’s Latent learning & Cognitive maps, Köhler’s Insight learning)።',
    learningOutcomesAm: [
      'በማንኛውም Classical Conditioning ሁኔታ ውስጥ UCS, UCR, NS, CS እና CRን በትክክል መለየት።',
      'Positive Reinforcement, Negative Reinforcement, Positive Punishment እና Negative Punishmentን በ2x2 Matrix መለየት።',
      '4ቱን Partial Reinforcement Schedules (FR, VR, FI, VI) በምሳሌ መለየትና ውጤታማነታቸውን ማነጻጸር።',
      'የBandura Social Learning 4 ሂደቶችን እና Tolman Latent Learning vs Köhler Insight Learning ማብራራት።',
    ],
    sectionsAm: [
      {
        headingAm: '3.1 Classical Conditioning (Pavlov) & 2x2 Operant Matrix (Skinner)',
        contentAm: `### 3.1.1 Classical Conditioning Components
- **UCS (Unconditioned Stimulus)**: ሳይማር በተፈጥሮ ምላሽ የሚቀሰቅስ (Food, Loud noise, Puff of air)።
- **UCR (Unconditioned Response)**: ተፈጥሯዊ ያልተማርነው ምላሽ (Salivating to food, Eye blink to air)።
- **CS (Conditioned Stimulus)**: ቀድሞ Neutral የነበረ ነገር ግን ከUCS ጋር ተደጋግሞ ተጣምሮ ምላሽ መቀስቀስ የጀመረ (Bell)።
- **CR (Conditioned Response)**: ለCS የሚሰጥ የተማርነው ምላሽ (Salivating to bell alone)።

### 3.1.2 The 2x2 Operant Conditioning Matrix
| Goal | Add / Apply a Stimulus (**Positive**) | Remove / Take Away a Stimulus (**Negative**) |
|---|---|---|
| **Increase Behavior (Reinforcement)** | **Positive Reinforcement** <br> (Add good: $A^+$ grade, Bonus, Praise) | **Negative Reinforcement** <br> (Remove bad: Aspirin removes headache; Seatbelt stops alarm!) |
| **Decrease Behavior (Punishment)** | **Positive Punishment** <br> (Add bad: Extra chores, Traffic ticket) | **Negative Punishment** <br> (Remove good: Revoke phone, Lose recess/driving license!) |`,
      },
      {
        headingAm: '3.2 Schedules of Reinforcement, Bandura & Cognitive Learning',
        contentAm: `### 3.2.1 4 Partial Schedules (Ratio = # Responses, Interval = Time!)
- **Fixed-Ratio (FR)**: ከቋሚ **ብዛት** በኋላ ሽልማት (ለምሳሌ ለ10 ሸሚዝ 1,000 ብር) $\\rightarrow$ High steady rate.
- **Variable-Ratio (VR)**: ከማይታወቅ አማካይ **ብዛት** በኋላ (Gambling, Lottery) $\\rightarrow$ **Highest rate & Highest resistance to extinction!**
- **Fixed-Interval (FI)**: ከቋሚ **ጊዜ** በኋላ ለሚደረግ የመጀመሪያ ምላሽ (ወርሃዊ ደመወዝ፣ የሴሚስተር ፈተና ቀን) $\\rightarrow$ Scalloping pattern!
- **Variable-Interval (VI)**: በማይታወቅ **ጊዜ** ልዩነት (Pop quizzes, Checking email/fishing) $\\rightarrow$ Slow, steady rate.

### 3.2.2 Social & Cognitive Learning
- **Bandura (Bobo Doll)**: ልጆች በማየት ብቻ (**Modeling**) ይማራሉ — 4 steps: **Attention $\\rightarrow$ Retention $\\rightarrow$ Motor Reproduction $\\rightarrow$ Motivation**።
- **Latent Learning (Tolman)**: ያለ ሽልማት የተማርነው እውቀት (Cognitive map) ተደብቆ ቆይቶ ሽልማት ሲኖር መታየቱ።
- **Insight Learning (Köhler’s Chimpanzees)**: በTrial-and-error ሳይሆን ድንገተኛ የአእምሮ መፍትሔ ("Aha!" moment)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'የመኪናው የሚረብሽ የማስጠንቀቂያ ድምፅ ("Beep-beep!") እንዲቆም አሽከርካሪው የደህንነት ቀበቶውን ታጠቀ፤ ከዚያ በኋላ ሁልጊዜ ቀበቶ ማሰር ጀመረ። ይህ የትኛው Operant Conditioning ነው?',
        stepsAm: [
          '1. ቀበቶ የማሰር ባህሪ **ጨምሯል** $\\implies$ **Reinforcement** (Punishment አይደለም)።',
          '2. ባህሪው የጨመረው አንድ የማይፈለግ ነገር (የሚረብሽ ድምፅ) **በመወገዱ (Removed)** ነው $\\implies$ **Negative**።',
          '3. ስለዚህ መልሱ **Negative Reinforcement** ነው!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Extinction', termAm: 'መጥፋት (Extinction)', definitionAm: 'በClassical ውስጥ CS ያለ UCS ሲደጋገም፣ ወይም በOperant ውስጥ ሽልማት ሲቋረጥ የተማረው ምላሽ መቀነስ/መጥፋት።' },
      { termEn: 'Spontaneous Recovery', termAm: 'ድንገተኛ መመለስ', definitionAm: 'ከእረፍት በኋላ ጠፍቶ የነበረው Conditioned Response በድንገት ተመልሶ መታየት።' },
    ],
    examTrapsAm: [
      'ስልክ መንጠቅ ወይም TV መከልከል **Negative Punishment** እንጂ Negative Reinforcement አይደለም! (የተፈለገ ነገር ተነጥቆ መጥፎ ባህሪ እንዲቀንስ ስለሚያደርግ)።',
      'Stimulus Generalization (ሁሉንም ነጭ አይጥ/ጸጉራማ ነገር መፍራት — Little Albert) vs Stimulus Discrimination (የእኛን ውሻ መውደድ፣ የባዕድ ውሻ መፍራት)።',
    ],
    keyTakeawaysAm: [
      'Classical Conditioning = Involuntary/Reflexive (CS + UCS)፤ Operant Conditioning = Voluntary behavior shaped by Consequences ($R$ or $P$)።',
      'Partial/Intermittent Reinforcement ከContinuous Reinforcement በላይ ለExtinction የመቋቋም አቅም አለው (Partial Reinforcement Effect)።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "አንድ መምህር ድንገተኛ ፈተና (Pop Quizzes) በማይታወቅ ቀን ቢሰጥ፣ ተማሪዎች ሁልጊዜ እንዲያነቡ ያደርጋል።" ይህ የትኛው Schedule ነው?',
        answerAm: 'መልስ፡ **Variable-Interval (VI)** Schedule (በጊዜ ላይ የተመሠረተ ነገር ግን ጊዜው የማይታወቅ!)።',
      },
    ],
  },

  'psyc-mod-ch4': {
    subject: 'psychology',
    chapterNumber: 4,
    titleAm: 'ምዕራፍ 4፡ ትውስታ፣ መርሳት እና የማስታወስ ችሎታን ማሻሻል (Memory & Forgetting)',
    briefOverviewAm:
      'Three Processes (Encoding, Storage, Retrieval), Atkinson-Shiffrin Three-Stage Model (Sensory Memory, STM/Working Memory $7\\pm 2$ & Chunking, LTM: Explicit/Declarative vs Implicit/Procedural), Ebbinghaus Forgetting Curve, 5 Theories of Forgetting (Proactive vs Retroactive Interference!) እና Mnemonics ያስተምራል።',
    briefPointsAm: [
      '3 Processes of Memory፡ **Encoding** (መቀበል/ማስገባት) $\\rightarrow$ **Storage** (ማስቀመጥ) $\\rightarrow$ **Retrieval** (መልሶ ማውጣት — Recall vs Recognition)።',
      'Atkinson-Shiffrin 3-Stage Model፡ **Sensory** (<1–3 sec; Iconic & Echoic) $\\rightarrow$ **Short-Term/Working** (15–30 sec; **$7 \\pm 2$ items**, Chunking & Maintenance/Elaborative rehearsal) $\\rightarrow$ **Long-Term** (Unlimited capacity!)።',
      'Long-Term Memory Types፡ **Explicit/Declarative** (Episodic = የግል ትዝታ + Semantic = አጠቃላይ እውቀት — Hippocampus!) vs **Implicit/Non-declarative** (Procedural = ብስክሌት መንዳት/ክህሎት + Classical conditioning — Cerebellum & Basal ganglia!)።',
      'Interference Theory (P.O.R.N. Shortcut)፡ **Proactive** (Old interferes with New — "Past blocks Present") vs **Retroactive** (New interferes with Old — "Recent erases Old")።',
    ],
    examTipAm:
      'Interference እንዳትሳሳቱ **P-O-R-N** አስታውሱ፡ **P**roactive = **O**ld interferes with learning/recalling new! **R**etroactive = **N**ew interferes with recalling old! (ምሳሌ፡ አዲሱን ስልክ ቁጥር ስታስገባ አሮጌው ካልጠፋ = Proactive፤ አዲሱን ስታጠና አሮጌው ከጠፋብህ = Retroactive!)።',
    expandedOverviewAm:
      'Chapter 4 (Module Ch. 5) የሰው ልጅ **Memory** እንዴት እንደሚሠራና ለምን እንደምንረሳ ይተነትናል። Encoding (Automatic vs Effortful, Visual/Acoustic/Semantic levels of processing — Craik & Lockhart), Atkinson-Shiffrin Three-Stage Architecture (Iconic 0.5s vs Echoic 3–4s; Short-Term/Working Memory [Baddeley: Phonological loop, Visuospatial sketchpad, Central executive]; Long-Term Memory subtypes), Serial Position Effect (Primacy effect = LTM, Recency effect = STM), Hermann Ebbinghaus Forgetting Curve (ፈጣን የመጀመሪያ መውደቅ ከዚያ መረጋጋት), 5ቱ የመርሳት ንድፈ-ሐሳቦች (Decay, Interference, Encoding Failure, Retrieval Failure / Tip-of-the-Tongue, Motivated Forgetting/Repression), Organic Amnesia (Anterograde = አዲስ አለመያዝ vs Retrograde = ያለፈውን መርሳት) እና በሳይንስ የተረጋገጡ የጥናት ዘዴዎች (Spacing Effect, Elaborative Rehearsal, Method of Loci, SQ3R) ያስተምራል።',
    learningOutcomesAm: [
      'Encoding, Storage እና Retrieval (Recall vs Recognition) እንዲሁም የ3ቱን Memory Stages አቅምና ቆይታ ማነጻጸር።',
      'Explicit (Episodic & Semantic) እና Implicit (Procedural & Priming) Long-Term Memory ከአንጎል ክፍሎቻቸው (Hippocampus vs Cerebellum) ጋር መለየት።',
      '5ቱን የForgetting ንድፈ-ሐሳቦች በተለይም Proactive vs Retroactive Interferenceን መለየት።',
      'Chunking, Elaborative Rehearsal, Spacing Effect እና Context/State-Dependent Retrievalን በጥናት ላይ መተግበር።',
    ],
    sectionsAm: [
      {
        headingAm: '4.1 Multi-Store Memory Architecture & LTM Subtypes',
        contentAm: `### 4.1.1 Three-Stage Memory Matrix
| Stage | Capacity | Duration | Primary Coding |
|---|---|---|---|
| **Sensory Memory** | Large (Exact replica) | Iconic (Visual): ~0.3–0.5s <br> Echoic (Auditory): ~3–4s | Sensory copy |
| **Short-Term / Working** | **$7 \\pm 2$ chunks** (George Miller) | ~15–30 seconds (without rehearsal) | Acoustic (mostly) |
| **Long-Term Memory (LTM)** | **Virtually Unlimited** | Minutes to Lifetime | **Semantic (Meaning!)** |

### 4.1.2 Declarative vs Non-Declarative LTM & Amnesia
- **Explicit (Declarative — Conscious)**: **Episodic** (የግል ታሪክ e.g., የመጀመሪያ የዩኒቨርሲቲ ቀንህ) + **Semantic** (እውነታ/ትርጉም e.g., የኢትዮጵያ ዋና ከተማ አዲስ አበባ ነው)። **Hippocampus** ላይ ይቀነባበራል!
- **Implicit (Non-Declarative — Unconscious)**: **Procedural skills** (ዋና፣ ታይፕ ማድረግ — **Cerebellum**), Priming.
- **Amnesia**: **Anterograde Amnesia** (ከአደጋ በኋላ አዲስ Explicit memory መሥራት አለመቻል — Patient H.M.!) vs **Retrograde Amnesia** (ከአደጋ በፊት የነበረውን መርሳት)።`,
      },
      {
        headingAm: '4.2 Five Theories of Forgetting & Memory Improvement',
        contentAm: `### 4.2.1 Why We Forget (5 Theories)
1. **Decay (Trace) Theory**: ጊዜ ሲያልፍ የአእምሮ አሻራ ይደበዝዛል።
2. **Interference Theory**: ተመሳሳይ መረጃዎች እርስ በርስ ይጋጫሉ (**Proactive** vs **Retroactive**)።
3. **Displacement**: በSTM ($7 \\pm 2$) ውስጥ አዲስ መረጃ አሮጌውን ገፍቶ ያወጣዋል።
4. **Motivated Forgetting (Repression — Freud)**: አሳዛኝ/አስጨናቂ ትዝታን ያለማወቅ ወደ Unconscious መግፋት።
5. **Cue-Dependent / Retrieval Failure**: መረጃው LTM ውስጥ አለ ነገር ግን ትክክለኛው Cue ጠፍቷል (Context-dependent & State-dependent memory)!

### 4.2.2 Evidence-Based Improvement
- **Elaborative Rehearsal** (ከቀላል መደጋገም Maintenance rehearsal ይልቅ ትርጉም ከአሮጌው እውቀት ጋር ማገናኘት!) + **Distributed Practice (Spacing Effect)** > Cramming!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'ዘንድሮ ጀርመንኛ መማር ከጀመርክ በኋላ፣ አምና የተማርከው የፈረንሳይኛ ቃላት እየተምታቱብህና እየጠፉብህ መጡ። ይህ የትኛው Interference ነው?',
        stepsAm: [
          '1. አዲሱ ትምህርት (ጀርመንኛ) አሮጌውን ትምህርት (ፈረንሳይኛ) ለማስታወስ እንቅፋት ሆኗል።',
          '2. **New** interferes with **Old** = **Retroactive Interference**!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Chunking', termAm: 'መከፋፈል / መሰብሰብ (Chunking)', definitionAm: 'ብዙ መረጃዎችን ትርጉም ወዳላቸው ትናንሽ ቡድኖች በማሰባሰብ የSTM ($7\\pm 2$) አቅምን ማሳደግ (e.g., 09-11-23-45-67)።' },
      { termEn: 'Serial Position Effect', termAm: 'የቅደም ተከተል ውጤት', definitionAm: 'በዝርዝር መጀመሪያ (Primacy) እና መጨረሻ (Recency) ያሉትን ከመካከለኞቹ በተሻለ ማስታወስ።' },
    ],
    examTrapsAm: [
      'Multiple-Choice Exam = **Recognition** (መለየት)፤ Essay/Fill-in-the-blank Exam = **Recall** (ያለ Cue ማውጣት)!',
      'Patient H.M. (Hippocampus ተወግዶለት) አዲስ Explicit ትዝታዎችን (Episodic/Semantic) መያዝ ባይችልም **Implicit/Procedural** ክህሎቶችን (Mirror tracing) መማር ይችል ነበር!',
    ],
    keyTakeawaysAm: [
      'ለረጅም ጊዜ ለማስታወስ Elaborative Rehearsal + Distributed Practice (Spacing Effect) ከCramming በብዙ እጥፍ ይበልጣሉ።',
      'Serial Position Curve: Primacy = ወደ LTM ስለገባ፣ Recency = ገና STM ውስጥ ስላለ!',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "0911458290" የሚለውን 10 አሃዝ ስልክ ቁጥር "(091) (145) (8290)" ብሎ በ3 ቡድን ከፍሎ መያዝ የትኛው የMemory ስልት ነው?',
        answerAm: 'መልስ፡ **Chunking** (10 items ወደ 3 chunks ቀይሮ የSTM $7 \\pm 2$ ገደብ ውስጥ ማስገባት)።',
      },
    ],
  },

  'psyc-mod-ch5': {
    subject: 'psychology',
    chapterNumber: 5,
    titleAm: 'ምዕራፍ 5፡ መነሳሳት፣ የግጭት ዓይነቶች እና ስሜት (Motivation & Emotion)',
    briefOverviewAm:
      'Intrinsic vs Extrinsic Motivation, Six Theories of Motivation (Instinct, Drive-Reduction/Homeostasis, Arousal/Yerkes-Dodson, Incentive, Cognitive, Maslow’s Hierarchy), Kurt Lewin’s 4 Conflicts of Motives, Emotion Components እና James-Lange, Cannon-Bard & Schachter-Singer Theories ያስተምራል።',
    briefPointsAm: [
      'Motivation Theories፡ Drive-Reduction (Biological need $\\rightarrow$ Drive $\\rightarrow$ Homeostasis), Yerkes-Dodson Arousal Law (Moderate arousal = Peak performance!), Maslow’s Hierarchy (Physiological $\\rightarrow$ Safety $\\rightarrow$ Belongingness/Love $\\rightarrow$ Esteem $\\rightarrow$ Self-Actualization)።',
      'Kurt Lewin’s 4 Conflicts፡ **Approach-Approach** (2 መልካም ምርጫ — ቀላሉ!), **Avoidance-Avoidance** (2 መጥፎ ምርጫ — አጣብቂኝ), **Approach-Avoidance** (1 ነገር ጥቅምም ጉዳትም ሲኖረው), **Multiple Approach-Avoidance** (ውስብስብ ሕይወት ምርጫ)።',
      'Emotion 3 Components፡ **Physiological Arousal** (Autonomic nervous system — Heart rate/Sweat), **Behavioral Expression** (Facial expressions — Paul Ekman’s 6 universal emotions!), **Cognitive/Subjective Experience**።',
      '3 Emotion Theories፡ **James-Lange** (Arousal $\\rightarrow$ Emotion), **Cannon-Bard** (Arousal + Emotion **Simultaneously**), **Schachter-Singer Two-Factor** (Arousal + **Cognitive Label** $\\rightarrow$ Emotion)።',
    ],
    examTipAm:
      'በ**James-Lange Theory**: "እንፈራለን ስለምንሮጥ እንጂ ስለምንፈራ አንሮጥም!" (Physiological arousal **በፊት** ይመጣል)፤ በ**Cannon-Bard**: ሁለቱም **በአንድ ጊዜ** በThalamus አማካኝነት ይከሰታሉ፤ በ**Schachter-Singer**: Arousal + አካባቢያዊ **Cognitive Label** ያስፈልጋል!',
    expandedOverviewAm:
      'Chapter 5 (Module Ch. 6) የሰውን ልጅ ድርጊት የሚገፉትን ውስጣዊና ውጫዊ ኃይሎች (**Motivation & Emotion**) ያስተምራል። Intrinsic vs Extrinsic Motivation (እና Overjustification effect)፣ 6ቱን የMotivation ንድፈ-ሐሳቦች (Instinct/Evolutionary, Drive-Reduction by Clark Hull, Optimal Arousal & Yerkes-Dodson Law, Incentive Theory, Cognitive Attribution/Expectancy, Humanistic Abraham Maslow’s 5-level Pyramid)፣ የKurt Lewin 4 የMotives ግጭት ዓይነቶች (Conflict of Motives) እና የEmotionን 3 አካላት (Sympathetic fight-or-flight vs Parasympathetic rest-and-digest, Amygdala) እንዲሁም 3ቱን Classic Theories of Emotion (+ Lazarus Cognitive-Mediational Theory) በጥልቀት ይሸፍናል።',
    learningOutcomesAm: [
      'Intrinsic vs Extrinsic Motivationን እና 6ቱን የMotivation ንድፈ-ሐሳቦች በተግባር ምሳሌ መለየት።',
      'የMaslow Hierarchy of Needs ደረጃዎችን (Deficiency needs vs Growth/Self-actualization) ከታች ወደ ላይ መዘርዘር።',
      'የKurt Lewinን 4 Motivational Conflicts (Approach-Approach, Avoidance-Avoidance, Approach-Avoidance, Multiple) በግልጽ መለየት።',
      'James-Lange, Cannon-Bard እና Schachter-Singer (Two-Factor) የEmotion ንድፈ-ሐሳቦችን ማወዳደር።',
    ],
    sectionsAm: [
      {
        headingAm: '5.1 Six Theories of Motivation, Maslow & Kurt Lewin’s Conflicts',
        contentAm: `### 5.1.1 Maslow’s Hierarchy & Yerkes-Dodson
- **Maslow Pyramid (Bottom $\\rightarrow$ Top)**:
  1. Physiological (ምግብ፣ ውኃ፣ እንቅልፍ፣ አየር)
  2. Safety (ደህንነት፣ ሥራ፣ መጠለያ)
  3. Love & Belongingness (ፍቅር፣ ጓደኝነት፣ ቤተሰብ)
  4. Esteem (በራስ መተማመን፣ ክብር፣ ስኬት)
  5. **Self-Actualization** (ሙሉ አቅምን መግለጽ — Peak growth need!)
- **Yerkes-Dodson Law**: ቀላል ተግባር ከፍተኛ Arousal ቢፈልግም፣ **ውስብስብ የፈተና/አካዳሚክ ተግባራት ግን Moderate (መካከለኛ) Arousal** ላይ ከፍተኛ ውጤት ያመጣሉ!

### 5.1.2 Kurt Lewin’s 4 Conflict Types
- **Approach-Approach ($+/+$)**: ሁለት ተፈላጊ ነገሮች መካከል መምረጥ (AAU Medicine vs Engineering) — በቀላሉ ይፈታል።
- **Avoidance-Avoidance ($-/-$)**: "ከድጡ ወደ ማጡ" — የግድ ከሁለት የማይፈለጉ አንዱን መምረጥ (መክሰር vs የማይወዱትን ሥራ መሥራት) $\\rightarrow$ ብዙ ጊዜ Vacillation / Escape ያስከትላል!
- **Approach-Avoidance ($+/-$)**: አንድ ነገር መልካምም መጥፎም ጎን ሲኖረው (ጣፋጭ ኬክ መብላት ደስ ይላል ግን ክብደት ይጨምራል)።`,
      },
      {
        headingAm: '5.2 Three Classic Theories of Emotion',
        contentAm: `### 5.2.1 James-Lange vs Cannon-Bard vs Schachter-Singer
| Theory | Exact Sequence (Example: Seeing a Lion) |
|---|---|
| **James-Lange** | Stimulus (Lion) $\\rightarrow$ **Physiological Arousal** (Heart pounds, trembling) $\\rightarrow$ **Emotion** ("I am afraid!") |
| **Cannon-Bard** | Stimulus (Lion) $\\rightarrow$ Thalamus sends signal **Simultaneously** to Cortex (**Emotion**) AND Autonomic System (**Arousal**) |
| **Schachter-Singer (Two-Factor)** | Stimulus $\\rightarrow$ **Physiological Arousal** + **Cognitive Label** ("This pounding heart means danger = Fear!") $\\rightarrow$ **Emotion** |`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ ተማሪ ወደ ውጭ ሀገር ሄዶ Scholarship ማግኘት ይፈልጋል (ጥቅም) ነገር ግን ቤተሰቡን መናፈቅና ቅዝቃዜውን ይፈራል (ጉዳት)። ይህ የትኛው ግጭት ነው?',
        stepsAm: [
          '1. ስለ **አንድ ነጠላ ግብ** (Scholarship abroad) አዎንታዊም አሉታዊም ስሜቶች አሉ።',
          '2. አንድ ግብ $+ / -$ ባህሪ ሲኖረው = **Approach-Avoidance Conflict**!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Overjustification Effect', termAm: 'የትርፍ ማበረታቻ ተጽዕኖ', definitionAm: 'ሰው ለውስጣዊ ደስታ (Intrinsic) የሚሠራውን ሥራ ውጫዊ ገንዘብ/ሽልማት ሲሰጠው ውስጣዊ ፍላጎቱ መቀነስ።' },
      { termEn: 'Paul Ekman’s Universal Emotions', termAm: 'የኤክማን ዓለም አቀፍ ስሜቶች', definitionAm: 'በሁሉም ባህሎች በተመሳሳይ የፊት ገጽታ የሚታወቁ 6 ስሜቶች፡ Happiness, Sadness, Fear, Anger, Surprise, Disgust።' },
    ],
    examTrapsAm: [
      'Arousal የሌለበት **High/Low** አደጋ ነው — Yerkes-Dodson Law "Moderate arousal = Optimal performance" እንጂ Maximum arousal አይልም!',
      'Schachter-Singer ንድፈ-ሐሳብ በ**Epinephrine (Adrenaline) ሙከራ** ተረጋግጧል — ተመሳሳይ የልብ ምት መጨመር እንደ ክፍሉ ሁኔታ ደስታ ወይም ንዴት ተብሎ Cognitive label ተሰጥቶታል።',
    ],
    keyTakeawaysAm: [
      'Sympathetic Nervous System (Fight-or-Flight) ስሜት ሲቀሰቀስ ይሠራል፤ Parasympathetic (Rest-and-Digest) ከፍርሃት በኋላ ሰውነትን ያረጋጋል።',
      'Intrinsic Motivation ከExtrinsic Motivation በላይ ዘላቂ ፈጠራንና ትምህርታዊ ስኬትን ይደግፋል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ ሲቆጡ ልብዎ ይመታል፣ ከዚያ በተመሳሳይ ቅጽበት "እየተናደድኩ ነው" የሚል ስሜት ይሰማዎታል (አንዱ የሌላው ምክንያት ሳይሆን) — ይህ የትኛው ንድፈ-ሐሳብ ነው?',
        answerAm: 'መልስ፡ **Cannon-Bard Theory** (Simultaneous physiological arousal and conscious emotion)!',
      },
    ],
  },

  'psyc-mod-ch6': {
    subject: 'psychology',
    chapterNumber: 6,
    titleAm: 'ምዕራፍ 6፡ የስብዕና ንድፈ-ሐሳቦች (Personality: Psychoanalytic, Trait & Humanistic)',
    briefOverviewAm:
      'Freud’s Psychoanalytic Theory (Id, Ego, Superego; Conscious/Preconscious/Unconscious; 8 Defense Mechanisms; Psychosexual Stages), Trait Theory (Allport, Cattell 16PF, Big Five OCEAN Model) እና Humanistic Theory (Carl Rogers’ Real vs Ideal Self & Unconditional Positive Regard) ያስተምራል።',
    briefPointsAm: [
      'Freud’s Structural Triad፡ **Id** (Unconscious, **Pleasure principle**, instinctive desires)፣ **Ego** (Mediator, **Reality principle**)፣ **Superego** (Moral conscience/ego ideal — Perfection!)።',
      'Defense Mechanisms (Unconscious Ego shields against anxiety)፡ **Repression** (Foundation), **Projection** (የራስን ስህተት በሌላው ላይ ማላከክ), **Displacement** (ንዴትን ወደ ደካማ/ደህንነቱ የተጠበቀ ነገር ማዞር), **Rationalization** (ምክንያት መደርደር), **Reaction Formation** (ተቃራኒውን ማሳየት), **Sublimation** (ወደ መልካም ማህበራዊ ሥራ መቀየር — Healthiest!)።',
      'Big Five Trait Model (**OCEAN**)፡ **O**penness to experience, **C**onscientiousness (ተጠያቂነት/ዲሲፕሊን), **E**xtraversion, **A**greeableness, **N**euroticism (Emotional instability)።',
      'Humanistic (Carl Rogers)፡ **Congruence** (Real Self $\\approx$ Ideal Self $\\rightarrow$ Healthy self-esteem) + **Unconditional Positive Regard** (ምንም ቅድመ ሁኔታ የሌለው መቀበል)።',
    ],
    examTipAm:
      '**Projection** vs **Displacement**: በ**Projection** ውስጥ የራስን የማይፈለግ ስሜት "እሱ ነው የሚጠላኝ እንጂ እኔ አልጠላውም" ብሎ ሌላውን መክሰስ ነው፤ በ**Displacement** ውስጥ ግን በአለቃው የተናደደ ሰው ወደ ቤት ሄዶ በትንሽ ልጁ ወይም በበሩ ላይ ይጮሃል!',
    expandedOverviewAm:
      'Chapter 6 (Module Ch. 7) የሰው ልጅ **Personality** (ቋሚ የአስተሳሰብ፣ የስሜትና የባህሪ ንድፍ) እንዴት እንደሚገነባ ሦስቱን ዋና ንድፈ-ሐሳቦች ያቀርባል፡ (1) **Sigmund Freud’s Psychoanalytic Theory**: Iceberg Topographic model (Conscious, Preconscious, Unconscious), Id/Ego/Superego dynamics, 8 Ego Defense Mechanisms (Repression, Regression, Denial, Projection, Displacement, Rationalization, Reaction Formation, Sublimation), እና Psychosexual Stages (Oral, Anal, Phallic [Oedipus/Electra complex], Latency, Genital — Fixation)። (2) **Trait Perspective**: Gordon Allport (Cardinal, Central, Secondary traits), Raymond Cattell (16PF), Hans Eysenck (PEN) እና **Costa & McCrae’s Five-Factor Model (OCEAN)**። (3) **Humanistic Theory**: Carl Rogers (Self-concept, Real vs Ideal Self, Unconditional vs Conditional Positive Regard) እና Abraham Maslow። እንዲሁም Personality Assessment (Projective tests: Rorschach Inkblot, TAT vs Objective tests: MMPI, Big Five Inventory) ይተነትናል።',
    learningOutcomesAm: [
      'Id (Pleasure), Ego (Reality) እና Superego (Morality) በውሳኔ አሰጣጥ ውስጥ እንዴት እንደሚጋጩ ማብራራት።',
      '8ቱን የFreud Ego Defense Mechanisms በተጨባጭ የዕለት ተዕለት ምሳሌዎች መለየት።',
      'የBig Five (OCEAN) ባህሪያትንና በአካዳሚክ/ሥራ ስኬት ላይ ያላቸውን ተጽዕኖ መግለጽ።',
      'የCarl Rogers Congruence/Incongruence እና Projective vs Objective Personality Testsን ማነጻጸር።',
    ],
    sectionsAm: [
      {
        headingAm: '6.1 Freud’s Structural Model & Ego Defense Mechanisms',
        contentAm: `### 6.1.1 Id, Ego & Superego
- **Id** (Present at birth): *Pleasure Principle* — ፈጣን እርካታ ይፈልጋል ("I want it NOW!")።
- **Ego** (Develops in childhood): *Reality Principle* — የIdን ፍላጎት ከእውነተኛው ዓለምና ከSuperego ጋር ያስታርቃል።
- **Superego** (Develops ~5–6 years): *Morality Principle* — ሕሊና (Guilt) እና Ego Ideal (Pride)።

### 6.1.2 8 Major Ego Defense Mechanisms
| Mechanism | Psychological Action | Example |
|---|---|---|
| **Repression** | Push painful thoughts to Unconscious | Forgot childhood trauma |
| **Denial** | Refuse to accept painful reality | Refusing to believe a medical diagnosis |
| **Rationalization** | Invent logical excuses for failure | "ፈተናው የወደቅኩት መምህሩ ስለሚጠላኝ ነው!" |
| **Projection** | Attribute own unacceptable impulse to others | "አብሮኝ ያለው ሰው ይቀናብኛል" (ራሱ እየቀና!) |
| **Displacement** | Redirect anger onto safer/weaker target | Boss yells at you $\\rightarrow$ you yell at your sibling |
| **Reaction Formation** | Act exact opposite of true feelings | Hating someone but acting overly sweet |
| **Regression** | Retreat to childish behavior under stress | Adult throwing a tantrum / crying like a child |
| **Sublimation** | Channel bad impulse into constructive social act (**Healthiest!**) | Aggressive person becomes a boxer or surgeon! |`,
      },
      {
        headingAm: '6.2 Trait Theory (OCEAN) & Carl Rogers’ Humanistic Self',
        contentAm: `### 6.2.1 The Big Five (OCEAN)
- **O — Openness**: ፈጠራ፣ ጉጉት፣ አዳዲስ ልምዶችን መቀበል (vs Conventional)።
- **C — Conscientiousness**: ታታሪነት፣ ድርጅት፣ ራስን መግዛት (GPAን ከፍ አድርጎ የሚተነብይ!)።
- **E — Extraversion**: ማህበራዊነት፣ ጉልበት፣ ንግግር (vs Introversion)።
- **A — Agreeableness**: ደግነት፣ መተማመን፣ ርህራሄ (vs Antagonistic)።
- **N — Neuroticism**: ጭንቀት፣ የስሜት መለዋወጥ (vs Emotional stability)።

### 6.2.2 Carl Rogers (Humanistic)
- **Congruence**: የምንሆነው (**Real Self**) እና መሆን የምንፈልገው (**Ideal Self**) ሲቀራረቡ **Fully Functioning Person** ይፈጠራል፤ ሲራራቁ ግን **Incongruence & Anxiety** ይመጣል!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ ተማሪ በፈተና ላይ በቂ ጥናት ባለማድረጉ ከወደቀ በኋላ "ፈተናው አይጠቅምም፣ መምህሩም ከመጽሐፉ ውጭ ነው ያወጣው" በማለት ራሱን ያሳምናል። የትኛው Defense Mechanism ነው?',
        stepsAm: [
          '1. ተማሪው የራሱን ጥፋት (አለማጥናት) ለመሸፈን አሳማኝ የሚመስል ውሸት ምክንያት (Excuse) ፈጥሯል።',
          '2. ይህ **Rationalization** ይባላል!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Projective Test', termAm: 'ፕሮጄክቲቭ ፈተና', definitionAm: 'ግልጽ ያልሆነ ምስል (Rorschach Inkblot, TAT) በማሳየት የተመላሹን Unconscious ፍላጎቶች የሚመረምር ዘዴ።' },
      { termEn: 'Unconditional Positive Regard', termAm: 'ቅድመ ሁኔታ የለሽ መቀበል', definitionAm: 'Carl Rogers የገለጸው አንድን ሰው ያለ ምንም "ከዚህ ከሆንክ ብቻ እወድሃለሁ" ቅድመ ሁኔታ መውደድና መቀበል።' },
    ],
    examTrapsAm: [
      '**MMPI** (Minnesota Multiphasic Personality Inventory) **Objective Test** ነው እንጂ Projective test አይደለም! Projective = **Rorschach** & **TAT**።',
      'Freud በPsychosexual stages ውስጥ Phallic stage (3–6 yrs) ላይ **Oedipus/Electra complex** ይከሰታል ብሏል — በዚያ Fixation ከተፈጠረ ወደ ጎልማሳነት ችግር ያመጣል።',
    ],
    keyTakeawaysAm: [
      'Sublimation በFreud ንድፈ-ሐሳብ ብቸኛው በማህበረሰብ ዘንድ ተቀባይነት ያለውና ጤናማ Defense mechanism ነው።',
      'በBig Five (OCEAN) ውስጥ **Conscientiousness** ከትምህርት እና ከሥራ ስኬት ጋር ከፍተኛው አዎንታዊ ግንኙነት አለው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "በራስህ ውስጣዊ መልካምነት እና የራስን አቅም (Real Self & Ideal Self) በማጣጣም ነው የምታድገው" የሚለው የማን ንድፈ-ሐሳብ ነው?',
        answerAm: 'መልስ፡ የ**Carl Rogers** (Humanistic / Person-Centered Theory)!',
      },
    ],
  },

  'psyc-mod-ch7': {
    subject: 'psychology',
    chapterNumber: 7,
    titleAm: 'ምዕራፍ 7፡ የአእምሮ ሕመሞች እና የሕክምና ዘዴዎች (Psychological Disorders & Therapy)',
    briefOverviewAm:
      'Criteria of Abnormality (4Ds: Deviance, Distress, Dysfunction, Danger), Causes (Biopsychosocial Model), DSM-5 Major Disorders (Anxiety, OCD, PTSD, Depressive, Bipolar, Schizophrenia: Positive vs Negative symptoms, Personality Disorders) እና Psychotherapy & Biomedical Therapies ያስተምራል።',
    briefPointsAm: [
      '4Ds of Abnormality፡ **Deviance** (ከባህላዊ ደንብ ያፈነገጠ), **Distress** (ግለሰባዊ ሥቃይ), **Dysfunction** (የዕለት ተዕለት/ትምህርት/ሥራ ተግባር መስተጓጎል — ቁልፉ!), **Danger** (ለራስ ወይም ለሌላ አደጋ)።',
      'Anxiety & Trauma Disorders፡ Phobias (Irrational fear), Panic Disorder (Sudden terror attacks), GAD, **OCD** (Obsessions = Unwanted thoughts + Compulsions = Repetitive behaviors), **PTSD** (Trauma flashbacks/nightmares)።',
      'Mood Disorders፡ **Major Depressive Disorder** (Unipolar: $\\ge 2$ weeks sadness, anhedonia — Low Serotonin/Norepinephrine) vs **Bipolar Disorder** (Cycles between Depression & **Mania** — high energy, racing thoughts, risky behavior)።',
      'Schizophrenia (Psychosis — Split from reality, NOT multiple personality!)፡ Positive Symptoms (**Hallucinations** = False perceptions, **Delusions** = False beliefs, Disorganized speech — Excess **Dopamine**!) vs Negative Symptoms (Flat affect, Avolition, Social withdrawal)።',
    ],
    examTipAm:
      '**Schizophrenia** "Split/Multiple Personality" **አይደለም!** ያ Dissociative Identity Disorder (DID) ነው! Schizophrenia ማለት ከእውነተኛው ዓለም መነጠል (**Psychosis**: Hallucinations & Delusions) ነው — ለመለየት: **Hallucination** = ያለ ነገር ማየት/መስማት (Sensory); **Delusion** = የተሳሳተ የማይለወጥ እምነት (Belief)!',
    expandedOverviewAm:
      'Chapter 7 (Module Ch. 8) Abnormal Psychology እና Clinical Treatmentን ይዳስሳል። ያልተለመደ ባህሪ መለኪያዎችን (Statistical infrequency, Cultural deviance, Distress, Dysfunction — 4Ds)፣ የአእምሮ ሕመም መንስኤዎችን (Biological: Genetics/Neurotransmitters; Psychological: Trauma/Cognitive distortions; Sociocultural — **Biopsychosocial Model** & Diathesis-Stress Model)፣ የDSM-5 ዋና ምድቦችን (Anxiety, OCD, PTSD, Somatic, Dissociative, Mood [MDD vs Bipolar I/II], Schizophrenia, Personality Disorders [Antisocial, Borderline]) እና የሕክምና ዘዴዎችን (Psychoanalytic [Free association, Dream analysis, Transference], Humanistic [Rogers Client-Centered: Empathy + UPR + Genuineness], Behavioral [Systematic Desensitization, Token economy, Aversion], Cognitive/CBT [Beck & Ellis REBT], እና Biomedical [Antidepressants SSRIs, Antipsychotics Dopamine blockers, Mood stabilizers Lithium, ECT]) ያስተምራል።',
    learningOutcomesAm: [
      'የአእምሮ ሕመምን ለመለየት የሚያገለግሉትን 4Ds (Deviance, Distress, Dysfunction, Danger) እና Biopsychosocial Modelን መግለጽ።',
      'Anxiety Disorders (GAD, Panic, Phobia, OCD, PTSD) እና Mood Disorders (Major Depression vs Bipolar) መለየት።',
      'የSchizophrenia Positive (Hallucinations, Delusions) እና Negative Symptomsን መለየት እና ከDID (Multiple personality) መለየት።',
      'Psychodynamic, Behavioral (Systematic Desensitization), CBT, Humanistic እና Biomedical Therapiesን ከNeurotransmitters (Serotonin, Dopamine) ጋር ማዛመድ።',
    ],
    sectionsAm: [
      {
        headingAm: '7.1 Major Psychological Disorders (DSM-5 Overview)',
        contentAm: `### 7.1.1 Key Disorders Comparison
| Disorder Category | Core Symptoms | Key Biological / Psychological Link |
|---|---|---|
| **Anxiety / Phobia / Panic** | Excessive fear, panic attacks, avoidance | Overactive Amygdala, Classical conditioning |
| **OCD** | Intrusive **Obsessions** (thoughts) + **Compulsions** (rituals to reduce anxiety) | Basal ganglia / Serotonin |
| **Major Depression** | $\\ge 2$ weeks depressed mood, loss of pleasure (**Anhedonia**), sleep/appetite shift | Low **Serotonin & Norepinephrine**; Beck’s negative cognitive triad |
| **Bipolar Disorder** | Alternates between Depression and **Mania** (euphoria, sleeplessness, grandiosity) | Strong heritability; Treated with **Lithium** |
| **Schizophrenia** | **Delusions** (false beliefs), **Hallucinations** (hearing voices), flat affect | **Dopamine Hypothesis** (Excess $D_2$ activity!) |
| **Antisocial Personality** | Lack of empathy/remorse, deceitfulness, violates rights of others (Sociopath) | Low arousal, prefrontal deficits |`,
      },
      {
        headingAm: '7.2 Psychological & Biomedical Therapies',
        contentAm: `### 7.2.1 Psychotherapies & Medications
- **Behavioral (Systematic Desensitization — Wolpe)**: ለPhobias በRelaxation training + Anxiety hierarchy (Exposure) Classical conditioningን ይሽራል!
- **Cognitive Behavioral Therapy (CBT — Aaron Beck & Albert Ellis)**: የተሳሳቱ አስተሳሰቦችን (**Catastrophizing, All-or-nothing thinking**) በመሞገት ባህሪን መለወጥ — ለDepression እና Anxiety እጅግ ውጤታማ!
- **Biomedical Medications**:
  - **SSRIs (Prozac/Fluoxetine)**: Serotonin reuptakeን በመከልከል Synaptic serotonin ይጨምራሉ (Depression & OCD)።
  - **Antipsychotics (Haloperidol, Risperidone)**: **Dopamine ($D_2$) receptors** ይዘጋሉ (Schizophrenia)።
  - **Anxiolytics (Benzodiazepines)**: **GABA** (Inhibitory neurotransmitter) ያጠናክራሉ።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ ሰው "ጎረቤቶቼ በሬዲዮ ሞገድ አእምሮዬን እየሰለሉ ነው" ብሎ በጽኑ ያምናል፤ ማንም ባይኖርም ድምፆችን ይሰማል። እነዚህ ሁለቱ ምልክቶች ምን ምን ናቸው?',
        stepsAm: [
          '1. ሬዲዮ አእምሮዬን ይሰልላል የሚለው **የተሳሳተ የማይለወጥ እምነት** = **Delusion of Persecution**።',
          '2. ውጫዊ ድምፅ ሳይኖር ድምፅ መስማቱ **የስሜት ህዋስ ስህተት** = **Auditory Hallucination**።',
          '3. ሁለቱም **Positive Symptoms of Schizophrenia** ናቸው!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Diathesis-Stress Model', termAm: 'ዳያቴሲስ-ስትሬስ ሞዴል', definitionAm: 'ባዮሎጂካል/ጄኔቲክ ተጋላጭነት (Diathesis) ከከባድ የአካባቢ ውጥረት (Stress) ጋር ሲገናኝ የአእምሮ ሕመም ይቀሰቀሳል የሚል ሞዴል።' },
      { termEn: 'Anhedonia', termAm: 'አንሄዶኒያ', definitionAm: 'በMajor Depression ውስጥ ከዚህ በፊት ያስደስቱ በነበሩ ነገሮች ሁሉ ደስታ ማጣት።' },
    ],
    examTrapsAm: [
      'Obsession (ሐሳብ — "እጄ በጀርም ተበክሏል") vs Compulsion (ድርጊት — "50 ጊዜ እጅ መታጠብ") እንዳይቀላቀል!',
      'በSchizophrenia ውስጥ **"Positive" Symptom** ማለት ጥሩ ነገር ሳይሆን በተጨማሪ የመጣ (Added abnormal behavior: Hallucinations/Delusions) ማለት ነው፤ **"Negative" Symptom** ደግሞ የጎደለ መደበኛ ባህሪ (Flat emotion, Lack of speech) ነው።',
    ],
    keyTakeawaysAm: [
      'የአእምሮ ሕመም Biological, Psychological እና Social ምክንያቶች (Biopsychosocial Model) ስላሉት መድኃኒት + CBT አንድ ላይ ከሁሉም የተሻለ ውጤት ይሰጣሉ።',
      'Systematic Desensitization (Relaxation + Gradual exposure) ለSpecific Phobias ዋናው Behavioral ሕክምና ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ SSRI መድኃኒቶች (ለምሳሌ Fluoxetine) የMajor Depression ምልክቶችን የሚያሻሽሉት የትኛውን Neurotransmitter በSinapse ውስጥ በመጨመር ነው?',
        answerAm: 'መልስ፡ **Serotonin** (Selective Serotonin Reuptake Inhibitors)!',
      },
    ],
  },

  'psyc-mod-ch8': {
    subject: 'psychology',
    chapterNumber: 8,
    titleAm: 'ምዕራፍ 8፡ የሕይወት ክህሎት መግቢያ (Introduction to Life Skills)',
    briefOverviewAm:
      'የLife Skills ትርጉም (WHO/UNESCO/UNICEF)፣ የLife Skills ዋና ግቦች (Prevention, Academic/Career Success, Personal Growth) እና 3ቱ ዋና ዘርፎች + 10 Core Components of Life Skills በጥልቀት ያስተምራል።',
    briefPointsAm: [
      'Life Skills (WHO)፡ "Abilities for adaptive and positive behavior that enable individuals to deal effectively with the demands and challenges of everyday life."',
      '3 Main Categories of Life Skills፡ 1) **Cognitive (Thinking) Skills**, 2) **Personal/Emotional (Self-Management) Skills**, 3) **Social/Interpersonal Skills**።',
      '10 WHO Core Components፡ Self-awareness, Empathy, Critical thinking, Creative thinking, Decision making, Problem solving, Effective communication, Interpersonal relationship skills, Coping with stress, Coping with emotions።',
      'IQ vs Life Skills፡ IQ ወደ ዩኒቨርሲቲ ቢያስገባም በዩኒቨርሲቲ ሕይወት ውስጥ መቆየትና መሳካትን የሚወስኑት **Life Skills & Emotional Intelligence** ናቸው!',
    ],
    examTipAm:
      'የWHO 10 Core Life Skills ውስጥ **Self-awareness** እና **Coping with Stress/Emotions** የPersonal/Emotional ዘርፍ ሲሆኑ፣ **Critical/Creative Thinking & Decision/Problem Solving** የCognitive ዘርፍ፣ **Communication/Empathy/Interpersonal** ደግሞ የSocial ዘርፍ ናቸው!',
    expandedOverviewAm:
      'Chapter 8 (Module Ch. 9) በኢትዮጵያ ዩኒቨርሲቲዎች የFreshman Psychology መጽሐፍ ውስጥ ከTheoretical Psychology ወደ Applied Life Skills የሚሸጋገርበት ምዕራፍ ነው። የLife Skillsን ፍቺ (WHO, UNICEF, UNESCO)፣ የሕይወት ክህሎቶችን በዩኒቨርሲቲ ካምፓስ ውስጥ የሚያስፈልጉበትን ዋና ግቦች (Psychosocial competence, Risky behavior prevention, Academic transition from high school to university independence, Responsible citizenship)፣ ሦስቱን ዋና Domains (Cognitive, Emotional/Personal, Social) እና 10ሩን Core Components ከተግባራዊ የዩኒቨርሲቲ ተማሪ ምሳሌዎች ጋር ያስተምራል።',
    learningOutcomesAm: [
      'በWHO መሠረት የLife Skillsን ትርጉምና ከTechnical/Vocational skills ያለውን ልዩነት መግለጽ።',
      'የLife Skills ትምህርት ዋና ግቦችን (Psychosocial competence, Prevention of HIV/Drugs/Dropouts) መዘርዘር።',
      '10ሩን Core Components በCognitive, Emotional እና Social Domains ስር መመደብ።',
    ],
    sectionsAm: [
      {
        headingAm: '8.1 Tri-Domain Framework & 10 WHO Core Life Skills',
        contentAm: `### 8.1.1 ሦስቱ የሕይወት ክህሎት ዘርፎች (The Tri-Domain Architecture)
| Domain | Core Components (WHO 10) | University Application |
|---|---|---|
| **1. Cognitive (Thinking) Skills** | 1. Critical Thinking <br> 2. Creative Thinking <br> 3. Decision Making <br> 4. Problem Solving | የጥናት ስልት መምረጥ፣ Peer pressure logic መመርመር፣ Academic dilemmas መፍታት |
| **2. Emotional / Personal Skills** | 5. Self-Awareness <br> 6. Coping with Stress <br> 7. Coping with Emotions | የጥንካሬ/ድክመት ግንዛቤ፣ Test anxiety መቆጣጠር፣ Anger management |
| **3. Social / Interpersonal Skills** | 8. Empathy <br> 9. Effective Communication <br> 10. Interpersonal Relationships | ከDormmates ጋር በሰላም መኖር፣ Assertiveness፣ ባህላዊ ብዝሃነትን ማክበር |

### 8.1.2 Core Goals of Life Skills Education
1. **Promote Psychosocial Competence**: የግቢ ሕይወት ፈተናዎችን በራስ መተማመን መወጣት።
2. **Prevent High-Risk Behaviors**: ሱስ (ጫት፣ አልኮል፣ ሲጋራ)፣ ጥንቃቄ የጎደለው ግንኙነት እና Depression መከላከል።
3. **Bridge Knowledge-to-Action Gap**: ሰዎች ትክክለኛውን ነገር *ማወቅ* ብቻ ሳይሆን *መተግበር* እንዲችሉ ማብቃት!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ የ1ኛ ዓመት ተማሪ ከቤተሰብ ተለይቶ ዩኒቨርሲቲ ሲገባ ከባድ ናፍቆትና የፈተና ጭንቀት ገጥሞታል፤ እንዲሁም ጓደኞቹ ጫት እንዲቅም እየገፋፉት ነው። ከ10ሩ Core Components የትኞቹ 3ቱ በቀጥታ ያስፈልጉታል?',
        stepsAm: [
          '1. የፈተና ጭንቀትና ናፍቆትን ለመቆጣጠር: **Coping with Stress & Coping with Emotions**።',
          '2. የጓደኞችን ግፊት በማመዛዘን ለመቋቋም: **Critical Thinking & Decision Making**።',
          '3. "አልቅምም!" ብሎ በአክብሮት ለመመለስ: **Effective Communication (Assertiveness)**።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Psychosocial Competence', termAm: 'ሳይኮሶሻል ብቃት', definitionAm: 'አንድ ሰው የዕለት ተዕለት ችግሮችን በአዎንታዊና በጤናማ መንገድ በማስተናገድ ደህንነቱን የመጠበቅ አቅም።' },
      { termEn: 'Empathy vs Sympathy', termAm: 'ኢምፓቲ vs ሲምፓቲ', definitionAm: 'Empathy ራስን በሌላው ጫማ አድርጎ ስሜቱን መረዳት ሲሆን Sympathy ለሌላው ማዘን ብቻ ነው።' },
    ],
    examTrapsAm: [
      'Life skills (Psycho-social behavioral skills) ከ**Livelihood/Vocational skills** (e.g., Carpentry, Coding, Accounting) ይለያሉ — Life skills ሁለገብ የሰብዓዊ አቅም ክህሎቶች ናቸው!',
    ],
    keyTakeawaysAm: [
      'Life Skills እውቀትን (Knowledge) እና አመለካከትን (Attitude) ወደ **ጤናማ ባህሪ (Healthy Behavior)** የሚቀይሩ ድልድዮች ናቸው።',
      'WHO የለያቸው 10 Core Skills በ3 ዘርፎች (Cognitive, Emotional, Social) ይጠቃለላሉ።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "ራስን ከሌላው ሰው ቦታ አድርጎ የሌላውን ሥቃይ ወይም ደስታ መረዳት" ከ10ሩ Core Life Skills ውስጥ የቱ ነው?',
        answerAm: 'መልስ፡ **Empathy** (በSocial/Interpersonal Skills ዘርፍ ውስጥ ይመደባል)!',
      },
    ],
  },

  'psyc-mod-ch9': {
    subject: 'psychology',
    chapterNumber: 9,
    titleAm: 'ምዕራፍ 9፡ የግል ክህሎቶች፣ Emotional Intelligence እና Stress Coping (Intra-Personal Skills)',
    briefOverviewAm:
      'Self-Concept, Self-Awareness, Self-Esteem, Self-Confidence, Self-Control, Anger Management, Daniel Goleman’s 5-Component Emotional Intelligence (EQ), Stress & Lazarus Appraisal, Problem-Focused vs Emotion-Focused Coping, Resilience እና Critical/Creative Thinking & Problem Solving ያስተምራል።',
    briefPointsAm: [
      'Self-Concept ("እኔ ማን ነኝ?" — Cognitive belief) vs Self-Esteem ("ለራሴ ምን ያህል ዋጋ እሰጣለሁ?" — Emotional evaluation) vs Self-Efficacy ("ይህን ሥራ መሥራት እችላለሁ!" — Bandura’s task belief)።',
      'Daniel Goleman’s 5 EQ Pillars፡ 1) **Self-Awareness**, 2) **Self-Regulation**, 3) **Motivation**, 4) **Empathy**, 5) **Social Skills**።',
      'Lazarus Stress Appraisal፡ Primary Appraisal ("ይህ አደጋ/ፈተና ነው?") $\\rightarrow$ Secondary Appraisal ("ይህን የመቋቋም አቅም አለኝ?")። Coping: **Problem-Focused** (ምንጩን ማስተካከል) vs **Emotion-Focused** (ጭንቀቱን ማረጋጋት)።',
      'Problem Solving Steps (5 Steps)፡ Identify Problem $\\rightarrow$ Generate Alternatives $\\rightarrow$ Evaluate Options $\\rightarrow$ Select & Implement $\\rightarrow$ Review/Evaluate Outcome።',
    ],
    examTipAm:
      'በLazarus Coping ውስጥ **ሁኔታው ሊቀየር የሚችል ሲሆን** (ለምሳሌ ዝቅተኛ ውጤት $\\rightarrow$ የጥናት ጊዜ መጨመር) **Problem-Focused Coping** ምርጥ ነው፤ **ሁኔታው ሊቀየር በማይችል ጊዜ** (ለምሳሌ የዘመድ ሞት/ሐዘን) **Emotion-Focused Coping** አስፈላጊ ነው!',
    expandedOverviewAm:
      'Chapter 9 (Module Ch. 10) የIntra-personal Life Skillsን ሙሉ በሙሉ ይዳስሳል። Self-Concept (Physical, Social, Academic self), Self-Awareness (Johari Window: Open, Blind, Hidden, Unknown self), Self-Esteem (High vs Low — Rosenberg), Self-Control & Delay of Gratification (Mischel Marshmallow Experiment), Anger Management (Stop-Think-Breathe, Time-out, Cognitive reframing), **Daniel Goleman’s Emotional Intelligence (EQ)** 5 Pillars, Stress & General Adaptation Syndrome (Hans Selye: **Alarm $\\rightarrow$ Resistance $\\rightarrow$ Exhaustion**), Coping Mechanisms & **Resilience**, Critical Thinking (Convergent logic) vs Creative Thinking (Divergent thinking / Brainstorming), እና Systematic Decision-Making & Problem-Solving Stepsን በዝርዝር ያስተምራል።',
    learningOutcomesAm: [
      'Self-Concept, Self-Awareness, Self-Esteem, Self-Confidence እና Self-Efficacy ያላቸውን ልዩነት መለየት።',
      'የDaniel Golemanን 5 የEmotional Intelligence አካላት በዩኒቨርሲቲ እና በሥራ ቦታ መግለጽ።',
      'የHans Selyeን 3 GAS ደረጃዎች (Alarm, Resistance, Exhaustion) እና Problem-Focused vs Emotion-Focused Copingን መለየት።',
      'Creative (Divergent) vs Critical (Convergent) Thinking እና 5ቱን የProblem-Solving ደረጃዎች መተግበር።',
    ],
    sectionsAm: [
      {
        headingAm: '9.1 Self-Dimensions & Goleman’s Emotional Intelligence (EQ)',
        contentAm: `### 9.1.1 Self-Awareness & Johari Window
- **Self-Concept**: ስለ ራሳችን ያለን አጠቃላይ እምነት (Cognitive map of "Who am I?")።
- **Self-Esteem**: ለራሳችን የምንሰጠው ዋጋና ክብር (Value judgment)።
- **Johari Window (4 Panes)**: **Open** (እኔም ሌሎችም የሚያውቁት)፣ **Blind** (ሌሎች የሚያዩት ግን እኔ የማላየው)፣ **Hidden** (እኔ ብቻ የማውቀው)፣ **Unknown** (ማንም ያላወቀው ድብቅ አቅም)።

### 9.1.2 Daniel Goleman’s 5 EQ Components
1. **Self-Awareness** (Personal): የራስን ስሜት፣ ቀስቃሽ ነገር እና ድክመት በቅጽበት ማወቅ።
2. **Self-Regulation** (Personal): ከመናገር/ከመድረግ በፊት መቆጣጠር (Emotional impulse control)።
3. **Internal Motivation** (Personal): ከገንዘብ/ዝና ባለፈ ለውስጣዊ ግብ መነሳሳት።
4. **Empathy** (Social): የሌሎችን ስሜትና ያልተነገረ ሁኔታ መረዳት።
5. **Social Skills** (Social): ግንኙነትን መገንባት፣ ግጭት መፍታትና ቡድን መምራት።`,
      },
      {
        headingAm: '9.2 Stress (GAS), Coping, Resilience & Problem Solving',
        contentAm: `### 9.2.1 Hans Selye’s General Adaptation Syndrome (GAS)
1. **Alarm Stage**: Sympathetic "Fight-or-Flight" (Adrenaline/Cortisol ይጨምራል)።
2. **Resistance Stage**: ሰውነት ውጥረቱን ለመቋቋም ሙሉ አቅሙን ተጠቅሞ ይታገላል (ግን Immune system ሊዳከም ይችላል)።
3. **Exhaustion Stage**: ውጥረቱ ከቀጠለ ሀብት ስለሚያልቅ ድካም፣ Burnout እና በሽታ ይከሰታል!

### 9.2.2 Critical vs Creative Thinking
- **Creative Thinking (Divergent)**: ብዙ የተለያዩ አዳዲስ መፍትሔዎችን ማፍለቅ (Brainstorming, "Thinking outside the box")።
- **Critical Thinking (Convergent)**: የተፈጠሩትን ሐሳቦች በማስረጃ መመዘን፣ አድሎን (Bias) መለየትና ምርጡን መምረጥ!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ ተማሪ የBiology Midterm ውጤቱ ዝቅተኛ ስለሆነ በጣም ተጨነቀ። ወዲያውኑ ከመምህሩ ጋር ተነጋገረ፣ የጥናት ቡድን ተቀላቀለ እና የቀን ፕሮግራሙን አሻሻለ። ይህ የትኛው Coping strategy ነው?',
        stepsAm: [
          '1. ተማሪው የውጥረቱን **ምንጭ (ዝቅተኛ ውጤት/የጥናት ዘዴ)** ለማስተካከል ተግባራዊ እርምጃ ወስዷል።',
          '2. ይህ **Problem-Focused Coping** ይባላል!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Resilience', termAm: 'ሪዚሊየንስ (ጽናት)', definitionAm: 'ከባድ ፈተና፣ ውድቀት ወይም አደጋ ከደረሰ በኋላ ተስፋ ሳይቆርጡ መላመድና ዳግም መነሳት።' },
      { termEn: 'Eustress vs Distress', termAm: 'ኢውስትሬስ vs ዲስትሬስ', definitionAm: 'Eustress አነቃቂ አዎንታዊ ውጥረት (e.g., ምረቃ/ውድድር) ሲሆን Distress ጎጂ አሉታዊ ውጥረት ነው።' },
    ],
    examTrapsAm: [
      'በAnger Management ውስጥ **"Venting" (በጩኸት/በመምታት ንዴትን ማውጣት)** አያረጋጋም — እንዲያውም Neurologically ንዴትን **ያባብሳል!** ምርጡ ዘዴ Cooling-off, Deep breathing እና Cognitive reframing ነው።',
    ],
    keyTakeawaysAm: [
      'በJohari Window ውስጥ Feedback መቀበል **Blind Area**ን ይቀንሳል፤ ራስን መግለጽ (Self-disclosure) **Hidden Area**ን ይቀንሳል።',
      'EQ ከIQ እኩል — በብዙ የአመራር ቦታዎች ከIQ በላይ — የሕይወት ስኬትን ይተነብያል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "በፈተና ወቅት ሳምንታት ሙሉ ከፍተኛ ውጥረት ውስጥ ቆይተን በመጨረሻ ሰውነታችን ዝሎ በሽታ የሚይዘን" በHans Selye GAS የትኛው ደረጃ ላይ ነው?',
        answerAm: 'መልስ፡ **Stage 3: Exhaustion Stage**!',
      },
    ],
  },

  'psyc-mod-ch10': {
    subject: 'psychology',
    chapterNumber: 10,
    titleAm: 'ምዕራፍ 10፡ አካዳሚክ ክህሎቶች — Time Management, SQ3R, Test Anxiety & SMART Goals',
    briefOverviewAm:
      'Time Management (Eisenhower 4-Quadrant Matrix & Procrastination), Active Note-Taking (Cornell Method, Mind Mapping) & SQ3R Study System, Exam Preparation & Test-Taking Strategies, Test Anxiety Management, SMART Goals እና Career Exploration ያስተምራል።',
    briefPointsAm: [
      'Eisenhower Matrix (Urgent vs Important)፡ **Q1** (Urgent + Important = Crises/Deadlines — Do Now), **Q2** (**Important + Not Urgent = Study, Planning, Health — የስኬታማ ተማሪዎች ኳድራንት!**), Q3 (Urgent + Not Important — Delegate), Q4 (Not Urgent + Not Important — Time wasters!)።',
      'SQ3R Reading System፡ **S**urvey (ርዕስና ማጠቃለያ ቅኝት) $\\rightarrow$ **Q**uestion (ጥያቄ ማዘጋጀት) $\\rightarrow$ **R**ead (በንቃት ማንበብ) $\\rightarrow$ **R**ecite (መጽሐፉን ዘግቶ በራስ ቃል ማስታወስ!) $\\rightarrow$ **R**eview (በጊዜ ልዩነት መከለስ)።',
      'Cornell Note-Taking፡ ገጹን በ3 ክፍል (Cue/Questions column [ግራ], Main notes [ቀኝ], Summary [ታች]) መከፋፈል።',
      'SMART Goals፡ **S**pecific (ግልጽ), **M**easurable (የሚለካ), **A**chievable (የሚደረስበት), **R**elevant (ተገቢ), **T**ime-bound (የጊዜ ገደብ ያለው)።',
    ],
    examTipAm:
      'በSQ3R ውስጥ እጅግ ኃይለኛው የMemory ደረጃ **Recite (Retrieval Practice)** ነው — በዝምታ ደጋግሞ ከማንበብ (Passive reading) ይልቅ መጽሐፉን ዘግቶ ራስን መፈተን 3 እጥፍ ውጤታማ ነው! እና በEisenhower Matrix ውስጥ **Quadrant II** Procrastinationን ያስወግዳል!',
    expandedOverviewAm:
      'Chapter 10 (Module Ch. 11) የዩኒቨርሲቲ አካዳሚክ ስኬትን በተግባር የሚያረጋግጡትን **Academic Skills** ያስተምራል። (1) **Time Management**: Eisenhower Urgent/Important Matrix, Parkinson’s Law, Procrastination causes (Perfectionism, Fear of failure, Task aversiveness) & Pomodoro technique። (2) **Study & Note-Taking Skills**: **SQ3R** (Robinson), **Cornell Note-Taking System** (5 Rs: Record, Reduce, Recite, Reflect, Review), Concept/Mind Mapping። (3) **Test-Taking & Test Anxiety**: Objective vs Essay exam strategies, Desensitization, Diaphragmatic breathing & Positive self-talk። (4) **Goal Setting & Career Development**: **SMART Goals**, Super’s & Holland’s RIASEC Career Interests (Realistic, Investigative, Artistic, Social, Enterprising, Conventional)።',
    learningOutcomesAm: [
      'የዕለት ተግባራትን በEisenhower 4 Quadrants መመደብና Procrastinationን ማሸነፍ።',
      '5ቱን የSQ3R ደረጃዎች እና የCornell Note-Taking ገጽ አወቃቀር በትክክል መተግበር።',
      'Test Anxietyን (Physiological arousal & Cognitive worry) በዝግጅት፣ በRelaxation እና በCognitive restructuring መቀነስ።',
      'ድክመት ያለበትን ግብ ወደ ሙሉ **SMART Goal** መቀየር።',
    ],
    sectionsAm: [
      {
        headingAm: '10.1 The Eisenhower Matrix & SQ3R Study Architecture',
        contentAm: `### 10.1.1 Eisenhower Time Management Matrix
| | **Urgent (አጣዳፊ)** | **Not Urgent (አጣዳፊ ያልሆነ)** |
|---|---|---|
| **Important (አስፈላጊ)** | **Q1 — Do First** (Cramming tomorrow's exam, Emergency assignment) | **Q2 — Schedule & Focus!** (Weekly study, Exercise, Career planning — **Key to High GPA!**) |
| **Not Important** | **Q3 — Delegate / Minimize** (Other people's minor interruptions, Some phone calls) | **Q4 — Eliminate!** (Endless social media scrolling, Gossip, Gaming) |

### 10.1.2 SQ3R + Cornell Note-Taking
- **SQ3R**: Survey $\\rightarrow$ Question $\\rightarrow$ Read $\\rightarrow$ Recite $\\rightarrow$ Review (Spaced repetition: Day 1, Day 3, Day 7, Day 21!).
- **Cornell Layout**: Left 2.5 inches = **Cue/Keywords/Questions**; Right 6 inches = **Lecture Notes**; Bottom 2 inches = **2–3 Sentence Summary**።`,
      },
      {
        headingAm: '10.2 Test Anxiety Reduction & SMART Goals',
        contentAm: `### 10.2.1 Managing Test Anxiety & Exam Strategy
- **Test Anxiety Causes**: Unpreparedness (Behavioral), Negative self-talk ("I will fail!" — Cognitive), Sympathetic hyperarousal (Physiological).
- **Solutions**: Distributed study (no last-night cramming!), Deep belly breathing, **Skip hard questions and return later**, Eliminate obviously wrong distractors on MCQs!

### 10.2.2 SMART Goals Checklist
- *Vague Goal*: "I want to get good grades in freshman year." (NOT SMART!)
- *SMART Goal*: "**I will solve 30 Biology MCQs daily at 7:00 PM for 6 weeks using the course module to score at least 85% (A) in the Midterm Exam.**" (Specific, Measurable, Achievable, Relevant, Time-bound!)`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'አንድ ተማሪ ለFinal Exam ከ3 ሳምንት በፊት የጥናት መርሐ ግብር ማውጣት፣ ጓደኞቹ ሲጠሩት TikTok ማየት፣ እና ነገ የሚያልቅበትን Assignment መሥራት በEisenhower Matrix የትኞቹ Quadrants ናቸው?',
        stepsAm: [
          '1. ከ3 ሳምንት በፊት የጥናት እቅድ ማውጣት = Important + Not Urgent $\\implies$ **Quadrant 2 (Q2)**!',
          '2. ዓላማ የሌለው TikTok scrolling = Not Important + Not Urgent $\\implies$ **Quadrant 4 (Q4)**!',
          '3. ነገ የሚያልቅበትን Assignment መሥራት = Urgent + Important $\\implies$ **Quadrant 1 (Q1)**!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Procrastination', termAm: 'ሥራን ለነገ ማሳደር', definitionAm: 'አስቸጋሪ ወይም አሰልቺ የሚመስሉ አስፈላጊ ተግባራትን ያለ በቂ ምክንያት ወደ ኋላ ማዘግየት።' },
      { termEn: 'Holland’s RIASEC Model', termAm: 'የሆላንድ የሙያ ሞዴል', definitionAm: 'የሥራ ምርጫን ከስብዕና ዓይነት (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) ጋር የሚያዛምድ ሞዴል።' },
    ],
    examTrapsAm: [
      '**Q1 (Crises)** ላይ ብቻ የሚኖሩ ተማሪዎች Burnout ይደርስባቸዋል! ዓላማው ብዙ Q1 ችግሮችን ቀድሞ በ**Q2** ውስጥ በመሥራት መከላከል ነው!',
      'SQ3R ውስጥ የመጀመሪያው R (**Read**) ከሁለተኛው R (**Recite**) እና ሦስተኛው R (**Review**) እንዳይቀላቀል!',
    ],
    keyTakeawaysAm: [
      'Active Recall (Recite) እና Spaced Repetition (Review) በሳይንስ የተረጋገጡ እጅግ ውጤታማ የጥናት ስልቶች ናቸው።',
      'ግቦች Specific, Measurable, Achievable, Relevant እና Time-bound (SMART) ሲሆኑ የመፈጸም ዕድላቸው በከፍተኛ ሁኔታ ይጨምራል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በCornell Note-Taking ዘዴ ውስጥ ከLecture በኋላ ክፍተቶችን ለመከለስ የሚያገለግለው የግራ 2.5 ኢንች አምድ ምን ይባላል?',
        answerAm: 'መልስ፡ **Cue Column (Recall/Question Column)** — ዋና ኖቱን ሸፍኖ በCue ጥያቄዎች ራስን ለመፈተን ያገለግላል።',
      },
    ],
  },

  'psyc-mod-ch11': {
    subject: 'psychology',
    chapterNumber: 11,
    titleAm: 'ምዕራፍ 11፡ ማህበራዊ ክህሎቶች — Diversity, Assertiveness, Conflict Resolution & Teamwork',
    briefOverviewAm:
      'Cultural Diversity & Multiculturalism, Gender Inclusion, Verbal/Non-Verbal Communication, Social Influence (Asch Conformity, Milgram Obedience, Peer Pressure), Assertiveness vs Passive/Aggressive ("I"-Statements), Thomas-Kilmann’s 5 Conflict Resolution Modes, Teamwork እና Overcoming Risky Behaviors ያስተምራል።',
    briefPointsAm: [
      'Cultural Competence፡ Ethnocentrism ("የእኔ ባህል ብቻ ነው ምርጡ") ከመሆን ይልቅ **Cultural Relativism & Empathy** በማዳበር ብዝሃነትን ማክበር።',
      '4 Communication Styles፡ **Assertive** (Respects BOTH self & others — Best!), **Passive** (Respects others, ignores self), **Aggressive** (Respects self, attacks others), **Passive-Aggressive** (Indirect hostility — Sarcasm/Silent treatment)።',
      '"I"-Statements Formula፡ *"I feel [emotion] when you [specific behavior] because [impact], and I would like [request]"* — ከ*"You always..."* ወቀሳ ይልቅ ትብብር ይፈጥራል!',
      'Thomas-Kilmann 5 Conflict Modes (Assertiveness vs Cooperativeness)፡ **Collaborating** (High Assert + High Coop = **Win-Win**), **Compromising** (Medium/Medium = Lose-Lose/Half-Half), **Competing** (High/Low = Win-Lose), **Accommodating** (Low/High = Lose-Win), **Avoiding** (Low/Low = Lose-Lose)።',
    ],
    examTipAm:
      '**Collaborating** (Win-Win) እና **Compromising** (Split the difference) ይለያያሉ! **Collaborating** የሁለቱንም ወገኖች ፍላጎት **100%** የሚያሟላ ፈጠራዊ መፍትሔ ሲሆን፣ **Compromising** ግን ሁለቱም ትንሽ ነገር **ሰጥተው የሚቀበሉበት** መካከለኛ ስምምነት ነው!',
    expandedOverviewAm:
      'Chapter 11 (Module Ch. 12) የFreshman Psychology የመጨረሻ ምዕራፍ ሲሆን በዩኒቨርሲቲ ካምፓስና በማህበረሰብ ውስጥ የሚኖረንን ግንኙነት (**Social Skills**) ያስተምራል። Cultural Diversity & Reducing Prejudice/Stereotypes (Contact Hypothesis), Gender Inclusion & Equity, Verbal vs Non-Verbal Communication & Active Listening, Social Influences (Solomon Asch’s Conformity, Stanley Milgram’s Obedience, Groupthink, Negative vs Positive Peer Pressure), Assertiveness Training (Broken Record, Fogging, **"I"-Statements**), **Thomas-Kilmann Conflict Resolution Matrix** (5 Styles), Effective Teamwork Stages (Tuckman: **Forming $\\rightarrow$ Storming $\\rightarrow$ Norming $\\rightarrow$ Performing $\\rightarrow$ Adjourning**), እና Overcoming Risky Behaviors (Substance abuse, Unsafe sexual practices, Academic dishonesty) በጥልቀት ይሸፈናሉ።',
    learningOutcomesAm: [
      'Passive, Aggressive, Passive-Aggressive እና Assertive የግንኙነት ዘይቤዎችን መለየትና "I"-Statements መገንባት።',
      'Solomon Asch (Conformity) እና Peer Pressureን የመቋቋም ስልቶችን ማብራራት።',
      'Thomas-Kilmann 5ቱን የግጭት አፈታት ዘዴዎች (Collaborating, Compromising, Competing, Accommodating, Avoiding) መቼ መጠቀም እንዳለበት መወሰን።',
      'የTuckman 5 የቡድን እድገት ደረጃዎችን (Forming–Adjourning) እና Risky Behaviors መከላከያ መንገዶችን መግለጽ።',
    ],
    sectionsAm: [
      {
        headingAm: '11.1 Assertiveness Taxonomy & Thomas-Kilmann Conflict Modes',
        contentAm: `### 11.1.1 Assertiveness vs Passive vs Aggressive
- **Passive**: "እኔ ምንም አይደለሁም፣ አንተ ትክክል ነህ" $\\rightarrow$ ፍርሃት፣ ቅሬታ መሸፈን።
- **Aggressive**: "እኔ ትክክል ነኝ፣ አንተ ዝም በል!" $\\rightarrow$ ማስፈራራት፣ "You"-statements።
- **Assertive**: "እኔም ዋጋ አለኝ፣ አንተም ዋጋ አለህ!" $\\rightarrow$ ቀጥተኛ፣ ታማኝ፣ አክባሪ እና **"I"-statements**!

### 11.1.2 Thomas-Kilmann 5 Conflict Management Styles
| Style | Assertiveness | Cooperativeness | Outcome | Best When... |
|---|---|---|---|---|
| **Collaborating** | High | High | **Win–Win** | Both concerns are too important to compromise; time allows creative solution |
| **Compromising** | Moderate | Moderate | **Give & Take** | Quick temporary settlement between equal-power parties |
| **Competing** | High | Low | **Win–Lose** | Emergency safety decision or enforcing vital ethics |
| **Accommodating** | Low | High | **Lose–Win** | Issue matters much more to the other person; preserving harmony |
| **Avoiding** | Low | Low | **Lose–Lose** | Trivial issue, or tempers need to cool down first |`,
      },
      {
        headingAm: '11.2 Social Influence, Tuckman Teamwork & Risky Behavior',
        contentAm: `### 11.2.1 Tuckman’s 5 Stages of Group/Team Development
1. **Forming**: የመጀመሪያ ትውውቅ፣ ጨዋነት፣ ግብ መፈለግ።
2. **Storming**: የሐሳብና የኃላፊነት ግጭት ("Who leads?") — ቡድኖች የሚፈተኑበት!
3. **Norming**: የጋራ ሕግ፣ መተማመን እና ትብብር መመሥረት።
4. **Performing**: ከፍተኛ ምርታማነት፣ ግብን በጋራ ማሳካት።
5. **Adjourning**: ፕሮጀክቱ ሲያልቅ በክብር መሰናበት።

### 11.2.2 Conformity & Peer Pressure
- **Informational Social Influence** (ትክክለኛውን ለማወቅ ከቡድን መቅዳት) vs **Normative Social Influence** (ተቀባይነት ለማግኘት/ላለመገለል መስማማት — Asch line study)።
- **Refusal Skills**: Direct "No" + Broken Record technique + Suggesting healthy alternatives + Walking away from toxic environments።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm:
          'የDormmateህ በየሌሊቱ እስከ 7 ሰዓት ድረስ በድምፅ ሙዚቃ ስለሚከፍት ማጥናት አልቻልክም። ይህንን ሁኔታ በ**"I"-Statement (Assertive)** እንዴት ትናገራለህ?',
        stepsAm: [
          '1. ስሜትህን መግለጽ (I feel...): *"I feel exhausted and stressed..."*',
          '2. ያልተነካ ባህሪውን ብቻ መጥቀስ (without insulting): *"...when loud music plays after 11:00 PM..."*',
          '3. ውጤቱንና መፍትሔውን መጠየቅ: *"...because I can’t concentrate on my exam study. Could we use headphones after 10:30 PM?"*',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Ethnocentrism', termAm: 'ኢትኖሴንትሪዝም', definitionAm: 'ሌሎችን ባህሎች በራስ ባህል መለኪያ ብቻ በመመዘን የራስን ከፍ አድርጎ የማየት ዝንባሌ።' },
      { termEn: 'Groupthink', termAm: 'ግሩፕቲንክ', definitionAm: 'በቡድን ውስጥ ስምምነትን ላለማበላሸት ሲባል ሂሳዊ አስተሳሰብን አጥፍቶ የተሳሳተ ውሳኔ መቀበል።' },
    ],
    examTrapsAm: [
      'Aggressive መሆን Assertive መሆን አይደለም! Assertive ማለት ሌላውን ሳትረግጥና ሳትፈራ የራስህን ድንበር ማስከበር ነው።',
      'በThomas-Kilmann ውስጥ Emergency (ለምሳሌ የእሳት አደጋ ወይም የሕግ ጥሰት ሲኖር) **Competing** (Firm decisive action) ተገቢ ነው እንጂ ሁልጊዜ Collaborating አይቻልም።',
    ],
    keyTakeawaysAm: [
      'Collaborating (Win-Win) ለዘላቂ ግንኙነትና ለትልቅ ችግር እጅግ የተሻለው Conflict Resolution ዘዴ ነው።',
      'የአቻ ግፊት (Peer Pressure) Positive (ጥናት ማበረታታት) ወይም Negative (ሱስ/መኮረጅ) ሊሆን ይችላል፤ Negativeውን ለመከላከል Assertiveness ቁልፍ ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በአንድ የቡድን ፕሮጀክት ውስጥ አባላት በአመራርና በሐሳብ ልዩነት መከራከርና መጋጨት የሚጀምሩት በTuckman የትኛው ደረጃ ላይ ነው?',
        answerAm: 'መልስ፡ **Stage 2: Storming** (ግጭቱ በAssertivenessና Norming ሲፈታ ወደ Stage 3 Norming ይሸጋገራል)።',
      },
    ],
  },
};
