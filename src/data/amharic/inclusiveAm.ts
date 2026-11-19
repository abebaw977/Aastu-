import type { AmharicChapterNote } from './types';

export const INCLUSIVE_AM_NOTES: Record<string, AmharicChapterNote> = {
  'inc-mod-ch1': {
    subject: 'inclusive',
    chapterNumber: 1,
    titleAm: 'ምዕራፍ 1፡ አካል ጉዳተኝነትንና ተጋላጭነትን መረዳት (Disabilities & Vulnerabilities)',
    briefOverviewAm: 'Impairment vs Disability vs Handicap፣ የአካል ጉዳት ሞዴሎች (Traditional, Medical, Social)፣ የተለያዩ የጉዳት ዓይነቶች እና Vulnerability ምንነትን ያስተምራል።',
    briefPointsAm: [
      'Impairment (የአካል/ስነ-ልቦና ክፍል ጉድለት), Disability (በImpairment ምክንያት ተግባር የመፈጸም ውስንነት), Handicap (በአካባቢው እንቅፋት ምክንያት የሚፈጠር ማህበራዊ ጉዳት)።',
      'Medical Model (ችግሩ በግለሰቡ አካል ውስጥ ነው — ሕክምና ብቻ) vs Social Model (ችግሩ ራምፕ/ብሬል በሌለው አካባቢና በሰው አመለካከት ውስጥ ነው!)።',
      'የጉዳት ዓይነቶች፡ Visual (Blind/Low Vision), Hearing (Deaf/Hard of Hearing), Learning Disabilities, Intellectual Disability, Physical/Motor, Emotional/Behavioral, Autism, Speech/Language።',
      'Vulnerability (ተጋላጭነት)፡ ለድህነት፣ ለአድልዎና ለጥቃት የመጋለጥ ስጋት (ሴቶች፣ ሕፃናት፣ አረጋውያን፣ አናሳ ቡድኖች)።',
    ],
    examTipAm: 'WHO (1980) ልዩነት፡ Impairment = ባዮሎጂያዊ እክል (ለምሳሌ ዓይን ማጣት)፤ Disability = የማንበብ ውስንነት፤ Handicap = መጽሐፉ በብሬል ባለመታተሙ ትምህርት ማጣት (በአካባቢው የተፈጠረ!)።',
    expandedOverviewAm:
      'ይህ ምዕራፍ የInclusiveness (SNIE 1012) መሰረታዊ ምዕራፍ ሲሆን Impairment, Disability እና Handicap መካከል ያለውን ወሳኝ ልዩነት፣ አካል ጉዳተኝነትን የሚገልጹ ሞዴሎችን (Traditional/Charity Model, Medical Model, Social Model, Biopsychosocial Model)፣ 10ሩን ዋና ዋና የአካል ጉዳትና የትምህርት ፍላጎት ምድቦች (Visual, Hearing, SLD — Dyslexia/Dyscalculia/Dysgraphia, Intellectual, Communication, Autism Spectrum, Emotional/Behavioral, Physical & Health Impairments, Multiple Disabilities) እና የተጋላጭነት (Vulnerability) መንስኤዎችንና መገለጫዎችን በጥልቀት ያስተምራል።',
    learningOutcomesAm: [
      'Impairment, Disability እና Handicapን በምሳሌዎች መለየት።',
      'Traditional, Medical እና Social Models of Disabilityን ማነጻጸር።',
      'Specific Learning Disabilities (Dyslexia, Dysgraphia, Dyscalculia) ከIntellectual Disability መለየት።',
      'የVulnerability 6ቱን ገጽታዎች (Physical, Economic, Social, Environmental, Attitudinal) ማብራራት።',
    ],
    sectionsAm: [
      {
        headingAm: '1.1 ሞዴሎች (Medical vs Social) እና ዋና የጉዳት ዓይነቶች',
        contentAm: `### 1.1.1 Medical Model vs Social Model
- **Medical Model**: አካል ጉዳተኝነትን እንደ "በሽታ" ወይም "የግለሰቡ ጉድለት" ብቻ ያያል — ተማሪውን ለመቀየር ይሞክራል።
- **Social Model (ዘመናዊ የInclusiveness መሰረት!)**: ሰውየው አካል ጉዳተኛ የሚሆነው **ማህበረሰቡና አካባቢው** (ደረጃ ብቻ መገንባት፣ ብሬል አለማዘጋጀት፣ የምልክት ቋንቋ አለመጠቀም፣ አሉታዊ አመለካከት) እንቅፋት (Barriers) ሲፈጥርበት ነው — ስለዚህ **አካባቢውን መቀየር** አለብን!

### 1.1.2 Specific Learning Disabilities (SLD — መደበኛ IQ እያላቸው!)
- **Dyslexia**: የንባብ ችግር፤ **Dysgraphia**: የጽሑፍ ችግር፤ **Dyscalculia**: የሒሳብ ስሌት ችግር።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንዲት የዊልቸር ተጠቃሚ ተማሪ ወደ 3ኛ ፎቅ የመማሪያ ክፍል መውጣት ስላልቻለች ፈተና አመለጣት (ህንጻው Ramp ወይም Lift የለውም)። ይህ በSocial Model እንዴት ይተነተናል?',
        stepsAm: [
          '1. የእግሯ ጉዳት = **Impairment**፤ መራመድ አለመቻሏ = **Disability**፤ ህንጻው Ramp ስለሌለው ፈተና ማጣቷ = **Handicap (Environmental Barrier)** — ይህን Ramp በመስራት 100% ማስወገድ ይቻላል!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Person-First Language', termAm: 'ሰው-ቀደም አጠራር', definitionAm: '"አካል ጉዳተኛ/ደንቆሮ" ከማለት ይልቅ "አካል ጉዳት ያለበት ሰው (Person with disability)" ብሎ መጥራት።' },
    ],
    examTrapsAm: [
      'Learning Disability (SLD) ያለበት ተማሪ **አእምሮው ዝቅተኛ (Intellectual Disability)** አይደለም — አብዛኛውን ጊዜ መደበኛ ወይም ከፍተኛ IQ አለው!',
    ],
    keyTakeawaysAm: [
      'አካል ጉዳተኝነት ማለት አለመቻል (Inability) ማለት አይደለም ("Disability is not inability")።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "Deaf" እና "Hard of Hearing" ልዩነት ምንድን ነው?',
        answerAm: 'መልስ፡ **Deaf** በHearing Aid እንኳን ድምጽን በበቂ ሁኔታ ለመስማት የማይችል (Sign Language ይጠቀማል) ሲሆን፣ **Hard of Hearing** ግን በHearing Aid ድምጽን በከፊል ሰምቶ በንግግር መግባባት የሚችል ነው።',
      },
    ],
  },

  'inc-mod-ch2': {
    subject: 'inclusive',
    chapterNumber: 2,
    titleAm: 'ምዕራፍ 2፡ የአካታችነት ጽንሰ-ሐሳብ (Concept of Inclusion)',
    briefOverviewAm: 'Exclusion → Segregation → Integration → Inclusion ጉዞ፣ የInclusive Education መርሆዎች፣ Universal Design for Learning (UDL) እና የአካታችነት ጥቅሞችን ያስተምራል።',
    briefPointsAm: [
      'Exclusion (ከትምህርት ሙሉ በሙሉ ማግለል) → Segregation (በልዩ ት/ቤት ለብቻ ማስቀመጥ) → Integration (ወደ መደበኛ ት/ቤት ማስገባት ግን ሲስተሙን አለመቀየር) → **Inclusion (ሲስተሙን ለሁሉም ተማሪ ማስተካከል!)**።',
      'Inclusion ለአካል ጉዳተኞች ብቻ አይደለም — በድህነት፣ በጾታ፣ በቋንቋና በችሎታ የተለዩትን ሁሉ ያካትታል።',
      'UDL (Universal Design for Learning)፡ መጀመሪያውኑ ለሁሉም ሰው የሚመች ትምህርትና ህንጻ መንደፍ።',
      'Reasonable Accommodation፡ ለአንድ ግለሰብ በተጨማሪ የሚደረግ ማስተካከያ (ለምሳሌ የፈተና ተጨማሪ ሰዓት፣ ብሬል)።',
    ],
    examTipAm: 'Integration (ተማሪው ወደ ሲስተሙ እንዲላመድ መጠበቅ) vs Inclusion (ሲስተሙ ራሱ ለሁሉም ልዩነቶች እንዲመች መለወጥ) በፈተና ሁልጊዜ ይጠየቃል!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የInclusionን ፍልስፍና እና ከSegregation እና Integration ያለውን መሰረታዊ ልዩነት ያስተምራል። Historical Shift (Exclusion → Segregation → Integration/Mainstreaming → Inclusion), Core Principles of Inclusion (Diversity strengthens everyone, Equal access, Zero-reject, Individualized Support / IEP), Inclusive Education vs Special Needs Education, Universal Design (UDL) እና Inclusive Society ለተማሪዎች፣ ለመምህራን፣ ለወላጆችና ለሀገር የሚሰጠውን ጥቅም በጥልቀት ያብራራል።',
    learningOutcomesAm: [
      'Exclusion, Segregation, Integration እና Inclusionን በምሳሌ ማነጻጸር።',
      'የInclusionን ዋና መርሆዎች (Zero Reject, Least Restrictive Environment, UDL) ማብራራት።',
      'Inclusion ለጉዳት የሌለባቸው ተማሪዎችም ጭምር እንዴት ጠቃሚ እንደሆነ መተንተን።',
    ],
    sectionsAm: [
      {
        headingAm: '2.1 ከSegregation ወደ Inclusion (4ቱ ደረጃዎች)',
        contentAm: `1. **Exclusion**: አካል ጉዳተኞች ትምህርት ቤት ፈጽሞ እንዳይገቡ መከልከል።
2. **Segregation**: በልዩ ትምህርት ቤቶች (Special Schools) ከሌሎች ተለይተው እንዲማሩ ማድረግ።
3. **Integration**: አብረው ክፍል ይገባሉ ግን መምህሩም ሆነ ክፍሉ ለውጥ አያደርግም ("Square peg in a round hole")።
4. **Inclusion**: ትምህርት ቤቱ፣ መምህሩ፣ መጽሐፉና ሕንጻው **ለሁሉም ተማሪ ብዝሃነት እንዲመች** ሆኖ ይቀረጻል!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንድ መደበኛ ት/ቤት ዓይነ-ስውር ተማሪ ተቀብሎ ነገር ግን የብሬል መጽሐፍም ሆነ የድምጽ ፈተና ሳያዘጋጅ "እንደ ሌሎቹ ተወዳደር" ቢለው ይህ ምንድን ነው?',
        stepsAm: [
          '1. **Integration (ያልተሟላ ውህደት)** እንጂ እውነተኛ Inclusion አይደለም — ምክንያቱም ሲስተሙ Reasonable Accommodation አላደረገም!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Universal Design (UDL)', termAm: 'ዩኒቨርሳል ዲዛይን', definitionAm: 'ከመጀመሪያው ጀምሮ ሕንጻዎችና ትምህርት ያለ ልዩ ማሻሻያ ለሁሉም ሰው እንዲመቹ አድርጎ መንደፍ።' },
    ],
    examTrapsAm: [
      'Inclusion ማለት Special Schoolsን ወዲያውኑ ማጥፋት ወይም ድጋፍን መቀነስ አይደለም — ድጋፉን ወደ መደበኛው ክፍል ማምጣት ነው!',
    ],
    keyTakeawaysAm: [
      'Inclusion የሰብአዊ መብት ጉዳይ እንጂ የበጎ አድራጎት ስጦታ አይደለም።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ የUDL ሦስቱ መርሆዎች ምን ምን ናቸው?',
        answerAm: 'መልስ፡ Multiple Means of **Representation** (መረጃን በብዙ መንገድ ማቅረብ)፣ **Action & Expression** (ተማሪው እውቀቱን በብዙ መንገድ እንዲገልጽ) እና **Engagement** (የመማር ተነሳሽነት)።',
      },
    ],
  },

  'inc-mod-ch3': {
    subject: 'inclusive',
    chapterNumber: 3,
    titleAm: 'ምዕራፍ 3፡ ልየታ እና ልዩ ድጋፍ (Identification & Differentiated Services)',
    briefOverviewAm: 'Early Identification & Intervention፣ Formal vs Informal Assessment፣ IEP (Individualized Education Plan)፣ Assistive Technologies እና Community-Based Rehabilitation (CBR) ያስተምራል።',
    briefPointsAm: [
      'Early Identification (በሕፃንነት ቀድሞ መለየት)፡ በልጁ እድገት ላይ የሚደርስ ሁለተኛ ደረጃ ጉዳትን ይቀንሳል።',
      'Assessment ዓይነቶች፡ Screening → Diagnosis → Educational Placement (IEP) → Monitoring።',
      'IEP (Individualized Education Plan)፡ ለአንድ ልዩ ፍላጎት ያለው ተማሪ በቡድን (መምህር፣ ወላጅ፣ ባለሙያ) የሚዘጋጅ የግል የትምህርት እቅድ።',
      'Assistive Technology & CBR (Community-Based Rehabilitation)፡ በማህበረሰቡ ውስጥ ርካሽና ተደራሽ የሆነ የመልሶ ማቋቋም ድጋፍ።',
    ],
    examTipAm: 'Community-Based Rehabilitation (CBR) ከInstitution-Based Rehabilitation (IBR) የተሻለው ውድ ሆስፒታል ሳይጠይቅ በራሱ በማህበረሰቡ ውስጥ ስለሚሰጥ ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ ልዩ ፍላጎት ያላቸውንና ተጋላጭ ዜጎችን እንዴት ቀድሞ መለየት (Screening, Identification & Multi-disciplinary Assessment) እና በፍላጎታቸው ልክ የተለየ ድጋፍ (Differentiated Services) መስጠት እንደሚቻል ያስተምራል። Early Childhood Intervention, Individualized Education Program (IEP), Differentiated Instruction (Content, Process, Product), Assistive Technologies (Braille, Screen Readers, Hearing Aids, Wheelchairs) እና WHO የ5-Component CBR Matrix (Health, Education, Livelihood, Social, Empowerment) በጥልቀት ቀርበዋል።',
    learningOutcomesAm: [
      'የEarly Identification እና Interventionን ጠቀሜታ ማብራራት።',
      'የIEP (Individualized Education Program) ክፍሎችንና ባለድርሻዎችን መዘርዘር።',
      'Differentiated Instruction (Content, Process, Product, Environment) እና Assistive Technologiesን መግለጽ።',
    ],
    sectionsAm: [
      {
        headingAm: '3.1 Assessment, IEP እና Community-Based Rehabilitation (CBR)',
        contentAm: `### 3.1.1 የIEP ዋና ክፍሎች
1. የተማሪው አሁን ያለበት የችሎታ ደረጃ (PLOP)
2. ዓመታዊ SMART ግቦች
3. የሚያስፈልጉ Special Services እና Assistive Devices
4. በመደበኛ ክፍል የሚቆይበት መቶኛ እና የግምገማ ዘዴ

### 3.1.2 Assistive Technologies (አጋዥ ቴክኖሎጂዎች)
- **Low-Tech**: Large print, Pencil grip, Magnifying glass, Cane (በትር)።
- **High-Tech**: Screen readers (JAWS/NVDA), Perkins Brailler, Cochlear Implants, Motorized Wheelchairs።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንድ መምህር የመስማት ችግር ላለበት ተማሪ ፊት ለፊት እየተመለከተ ቢያስተምር (Lip-reading) እና ጽሑፍ/ምስል ቢያሳይ ይህ የምን ምሳሌ ነው?',
        stepsAm: [
          '1. **Differentiated Instruction / Classroom Accommodation** — የማስተማሪያውን ሂደት (Process) ለተማሪው ፍላጎት ማስተካከል።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'CBR', termAm: 'ማህበረሰብ አቀፍ ተሃድሶ', definitionAm: 'በማህበረሰቡ ውስጥ በቤተሰብ፣ በአካባቢው ሀብትና ባለሙያዎች የሚሰጥ አካታች የማገገሚያ አገልግሎት።' },
    ],
    examTrapsAm: [
      'Diagnosis (የሕክምና ወይም የስነ-ልቦና ውሳኔ) የሚሰጠው በሰለጠኑ ባለሙያዎች (Audiologist, Psychologist, Doctor) እንጂ በተራ ክፍል መምህር ብቻ አይደለም (መምህሩ Screening & Referral ይሰራል)!',
    ],
    keyTakeawaysAm: [
      'Early Intervention ልዩነቶች ከባድ ጉዳት ከመሆናቸው በፊት ይደርሳል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "Accommodation" እና "Modification" በትምህርት ውስጥ በምን ይለያሉ?',
        answerAm: 'መልስ፡ **Accommodation** ተማሪው እንዴት እንደሚማር/እንደሚፈተን ይቀይራል (ተጨማሪ ጊዜ፣ ብሬል — Curriculum አይቀነስም!)፤ **Modification** ግን የትምህርቱን ይዘት/መጠን ራሱን ያቃልላል።',
      },
    ],
  },

  'inc-mod-ch4': {
    subject: 'inclusive',
    chapterNumber: 4,
    titleAm: 'ምዕራፍ 4፡ አካታች ባህልን መገንባት (Promoting Inclusive Culture)',
    briefOverviewAm: 'Inclusive Culture ባህሪያት፣ 5ቱ የInclusive Culture ደረጃዎች፣ Inclusive Leadership፣ የአመለካከት ለውጥ እና ድርጅታዊ እሴቶችን ያስተምራል።',
    briefPointsAm: [
      'Inclusive Culture፡ ሁሉም ሰው ያለ ፍርሃት የሚሰማበት፣ የሚከበርበትና የባለቤትነት (Belonging) ስሜት የሚሰማው አካባቢ።',
      '5ቱ መገለጫዎች፡ Representation (ውክልና), Receptivity (ተቀባይነት), Fairness (ፍትሐዊነት), Belongingness (የራስነት ስሜት), Psychological Safety።',
      'የባህል ለውጥ መሰናክሎች፡ Stereotypes, Prejudice (ጭፍን ጥላቻ), Discrimination (ተግባራዊ አድልዎ)።',
      'Indigenous Inclusive Values በኢትዮጵያ፡ እድር፣ ዳቦ/ጂጊ፣ እቁብ፣ ባህላዊ የእንግዳ ተቀባይነትና የጋራ መረዳዳት።',
    ],
    examTipAm: 'Stereotype (የአእምሮ ፍረጃ/ሃሳብ) → Prejudice (አሉታዊ ስሜት/ጥላቻ) → Discrimination (ተግባራዊ መገለል/ድርጊት) — ሦስቱን በቅደም ተከተል ይለዩ!',
    expandedOverviewAm:
      'ይህ ምዕራፍ በትምህርት ቤቶች፣ በሥራ ቦታዎች እና በማህበረሰብ ውስጥ አካታች ባህል (Inclusive Culture) እንዴት እንደሚገነባ ይተነትናል። Dimensions of Inclusive Culture (Universal Design, Recruitment & Retention of diverse talent, Workplace Flexibility, Equitable Pay), 5 Stages of Cultural Competence, አሉታዊ ባህላዊ እምነቶችን ("አካል ጉዳት የእርግማን ውጤት ነው" የሚለውን የተሳሳተ አመለካከት) በሳይንሳዊ ግንዛቤ መቀየር እና የኢትዮጵያን የመረዳዳት እሴቶች ለአካታችነት መጠቀም በጥልቀት ቀርበዋል።',
    learningOutcomesAm: [
      'የInclusive Culture ዋና ዋና ባህሪያትንና በድርጅት ምርታማነት ላይ ያለውን ፋይዳ መግለጽ።',
      'Stereotype, Prejudice እና Discrimination መካከል ያለውን ልዩነት ማብራራት።',
      'አካታች ባህል ለመገንባት የሚያስፈልጉ የአመራርና የማህበረሰብ እርምጃዎችን መዘርዘር።',
    ],
    sectionsAm: [
      {
        headingAm: '4.1 Inclusive Culture እና የአመለካከት እንቅፋቶችን መስበር',
        contentAm: `### 4.1.1 የአመለካከት ሰንሰለት
- **Stereotype**: ስለ አንድ ቡድን የተሳሳተ አጠቃላይ እምነት (Cognitive)።
- **Prejudice**: በዚያ ላይ የተመሰረተ አሉታዊ ስሜት/ጥላቻ (Affective)።
- **Discrimination**: በተግባር መብት መከልከል/መጉዳት (Behavioral)።

### 4.1.2 የInclusive Culture መገንቢያዎች
ግልጽ የሥነ-ምግባር ደንብ፣ አካታች አመራር፣ ተከታታይ ግንዛቤ ማስጨበጫ እና አካል ጉዳተኞችን በውሳኔ ሰጪ ቦታዎች ላይ ማሳተፍ ("Nothing about us without us")።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: '"ዓይነ-ስውር ሰው አስተዳዳሪ መሆን አይችልም" ብሎ ማሰብ እና በዚህ ምክንያት ለስራ ቅጥር አለመጥራት ምን ምን ናቸው?',
        stepsAm: [
          '1. "አይችልም" ብሎ ማሰብ = **Stereotype**፤ ለስራው ሳይፈትሹ ከቅጥር መከልከል = **Discrimination**!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Psychological Safety', termAm: 'የስነ-ልቦና ደህንነት', definitionAm: 'ማንም ሰው ለመሳቅ ወይም ለመቀጣት ሳይፈራ ሃሳቡንና ልዩነቱን በነጻነት የሚገልጽበት ባህል።' },
    ],
    examTrapsAm: [
      'Diversity (በቁጥር ብዙ የተለያዩ ሰዎች መኖር) እና Inclusion (እነዚያ ሰዎች ሁሉ በእኩልነት ክብርና ድምጽ ማግኘት) አንድ አይደሉም!',
    ],
    keyTakeawaysAm: [
      '"Nothing about us without us" የአካል ጉዳተኞች መብት ንቅናቄ ዋና መርህ ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ የኢትዮጵያ እድር እና ደቦ ለInclusive Culture ምን አስተዋጽኦ አላቸው?',
        answerAm: 'መልስ፡ አባላት በችግር፣ በሐዘንና በሥራ ጊዜ በጋራ የሚደጋገፉበት ነባር የአካታችነት መረብ ናቸው።',
      },
    ],
  },

  'inc-mod-ch5': {
    subject: 'inclusive',
    chapterNumber: 5,
    titleAm: 'ምዕራፍ 5፡ አካታችነት ለሰላም፣ ለዲሞክራሲ እና ለልማት',
    briefOverviewAm: 'አካታችነት ለዘላቂ ሰላም (Inclusion for Peace)፣ ለዲሞክራሲ (Inclusive Governance) እና ለዘላቂ ልማት (SDGs 2030 — Leave No One Behind) ያለውን ሚና ያስተምራል።',
    briefPointsAm: [
      'Inclusion for Peace፡ መገለልና ኢ-ፍትሐዊነት የግጭት ምንጮች ናቸው፤ አካታችነት የሰላም መሠረት ነው።',
      'Inclusion for Democracy፡ የሁሉም ዜጎች (አካል ጉዳተኞች፣ ሴቶች፣ አናሳዎች) ድምጽ ያለበት ዲሞክራሲ።',
      'Inclusion for Development (SDGs 2030)፡ "Leave No One Behind" — 12–15% ሕዝብን ወደ ኋላ ትቶ የሀገር ልማት አይሳካም!',
      'Disability-Inclusive Development፡ አካል ጉዳተኞችን ከስራና ከግብር ከፋይነት ሲያገሉ GDP ከ3–7% ይቀንሳል።',
    ],
    examTipAm: 'የUN 2030 Sustainable Development Goals (SDGs) መሪ ቃል **"Leave No One Behind"** መሆኑን እና Inclusion በትምህርት (SDG 4), እኩልነት (SDG 10) እና ሥራ (SDG 8) ላይ ያለውን ትስስር ያዙ!',
    expandedOverviewAm:
      'ይህ ምዕራፍ አካታችነት የበጎ አድራጎት ወይም የግለሰብ ጉዳይ ብቻ ሳይሆን የአንድ ሀገር **ሰላም፣ ዲሞክራሲ እና ኢኮኖሚያዊ ልማት** ቁልፍ ሞተር መሆኑን ያብራራል። Exclusion እንዴት ወደ ማህበራዊ አለመረጋጋትና ግጭት እንደሚመራ፣ Participatory Democracy & Inclusive Peacebuilding፣ እንዲሁም የUN 2030 SDGs ("Leave No One Behind") እና በኢትዮጵያ የአካል ጉዳተኞች እና የሴቶች የልማት ተሳትፎ እንዴት ድህነትን እንደሚቀንስ በዝርዝር ያስተምራል።',
    learningOutcomesAm: [
      'Marginalization እና Exclusion እንዴት ለግጭትና ለሰላም መደፍረስ መንስኤ እንደሚሆኑ መተንተን።',
      'አካታችነት የዲሞክራሲን ጥራትና ቅቡልነት እንዴት እንደሚያሳድግ ማብራራት።',
      'በ"Leave No One Behind" (UN SDGs 2030) እና በኢኮኖሚ እድገት መካከል ያለውን ግንኙነት መግለጽ።',
    ],
    sectionsAm: [
      {
        headingAm: '5.1 አካታችነት፣ ሰላም፣ ዲሞክራሲ እና SDGs',
        contentAm: `### 5.1.1 Inclusion and Peace
- አዎንታዊ ሰላም (Positive Peace — Johan Galtung) የጦርነት አለመኖር ብቻ ሳይሆን **የመዋቅራዊ አድልዎ (Structural Violence)** መጥፋትና ማህበራዊ ፍትህ መስፈን ነው።

### 5.1.2 Inclusion and Development
- በWHO ግምት ~15% የዓለም ሕዝብ የአካል ጉዳት አለበት። እነዚህን ዜጎች ከትምህርትና ከሥራ ማግለል ከፍተኛ የኢኮኖሚ ኪሳራ (GDP loss) ያመጣል፤ ማካተት ግን የሀገር ምርታማነትን ያሳድጋል።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'በአንድ የምርጫ ወቅት የምርጫ ጣቢያዎች ደረጃ ብቻ ቢኖራቸው እና የብሬል ወረቀት ባይኖር የትኛውን መርህ ይጥሳል?',
        stepsAm: [
          '1. **Inclusive Democracy / Political Participation** (እና UNCRPD Article 29 — የፖለቲካ ተሳትፎ መብት) ይጥሳል!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Positive Peace', termAm: 'አዎንታዊ ሰላም', definitionAm: 'የጥይት ድምጽ መቆም ብቻ ሳይሆን የፍትህ፣ የእኩልነትና የአካታችነት መረጋገጥ።' },
    ],
    examTrapsAm: [
      'Poverty እና Disability እርስ በርስ ተያያዥነት ያለው **Vicious Cycle** ይፈጥራሉ — ድህነት ለጉዳት ይዳርጋል፣ መገለልና ጉዳት ደግሞ ወደ ድህነት ይመልሳሉ!',
    ],
    keyTakeawaysAm: [
      'ዘላቂ ሰላምና ልማት የሚረጋገጠው ሁሉም ዜጋ በእኩልነት ሲሳተፍ ብቻ ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ የUN SDGs "Leave No One Behind" መርህ ምን ያዛል?',
        answerAm: 'መልስ፡ መንግሥታት የልማት ውጤቶችን ሲለኩ በጣም የተገለሉትንና ተጋላጭ የሆኑትን ቡድኖች (አካል ጉዳተኞች፣ ድሆች፣ ሴቶች፣ ገጠር) መጀመሪያ እንዲደርሱ ያዛል።',
      },
    ],
  },

  'inc-mod-ch6': {
    subject: 'inclusive',
    chapterNumber: 6,
    titleAm: 'ምዕራፍ 6፡ የአካታችነት የሕግ ማዕቀፎች (Legal Frameworks)',
    briefOverviewAm: 'ዓለም አቀፍ (UDHR 1948, UNCRPD 2006, Salamanca Statement 1994, EFA) እና የኢትዮጵያ የሕግ ማዕቀፎች (FDRE Constitution Art 41, Proc 568/2008 Right to Employment) ያስተምራል።',
    briefPointsAm: [
      'UDHR (1948) & UNCRC (1989)፡ ትምህርትና እኩልነት የሁሉም ሰውና ሕፃን መብት መሆኑን ደንግገዋል።',
      'Salamanca Statement (1994)፡ ለInclusive Education ዓለም አቀፍ ታሪካዊ መግለጫ ("Regular schools with inclusive orientation")።',
      'UNCRPD (2006 — ኢትዮጵያ በ2010/Proclamation 676/2010 አጸደቀችው)፡ አንቀጽ 24 = Inclusive Education፤ አንቀጽ 9 = Accessibility።',
      'የኢትዮጵያ ሕግ፡ 1995 FDRE ሕገ-መንግሥት (አንቀጽ 25 እኩልነት፣ አንቀጽ 41(5) የአካል ጉዳተኞች ድጋፍ) እና Proclamation 568/2008 (Right to Employment of Persons with Disability)።',
    ],
    examTipAm: 'በኢትዮጵያ **Proclamation No. 568/2008** በሥራ ቅጥር ላይ አካል ጉዳተኞች እኩል ብቃት ሲኖራቸው **ቅድሚያ (Affirmative Action)** እንዲሰጣቸውና Reasonable Accommodation እንዲደረግ ያዛል!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የአካታችነትን እና የአካል ጉዳተኞችን መብት የሚጠብቁ ዓለም አቀፍ፣ አህጉራዊ (African Charter on Human and Peoples\' Rights) እና ሀገራዊ (ኢትዮጵያ) የሕግና የፖሊሲ ሰነዶችን በዝርዝር ያስተምራል። UDHR (1948), UNCRC (1989 Art. 23 & 28), World Declaration on EFA (Jomtien 1990), Salamanca Statement (1994), UNCRPD (2006 — Article 9 Accessibility, 24 Education, 27 Employment)፣ እንዲሁም የ1995 የFDRE ሕገ-መንግሥት (Art. 25, 41(5)), Proclamation No. 568/2008 (Employment), Ethiopian Building Proclamation No. 624/2009 (Accessible Buildings/Ramps) እና ETP/ESDP ፖሊሲዎች ተብራርተዋል።',
    learningOutcomesAm: [
      'ዓለም አቀፍ የInclusion ስምምነቶችን (UDHR, Salamanca 1994, UNCRPD 2006) ዋና ድንጋጌዎች መዘርዘር።',
      'የኢትዮጵያን ሕገ-መንግሥት (አንቀጽ 41(5))፣ Proclamation 568/2008 (ሥራ) እና Building Proclamation 624/2009 ማብራራት።',
    ],
    sectionsAm: [
      {
        headingAm: '6.1 ዓለም አቀፍ እና የኢትዮጵያ የአካታችነት ሕጎች',
        contentAm: `| ሕግ / ስምምነት | ዓመት | ዋና ጭብጥ |
| :--- | :--- | :--- |
| **UDHR** | 1948 | ሁሉም ሰዎች እኩል ክብርና መብት (ትምህርት አንቀጽ 26) አላቸው። |
| **Salamanca Statement** | 1994 | መደበኛ ት/ቤቶች ሁሉንም ልዩ ፍላጎት ያላቸውን ሕፃናት ማካተት አለባቸው። |
| **UNCRPD** | 2006 (Eth: 2010) | አንቀጽ 9 (ተደራሽነት), አንቀጽ 24 (አካታች ትምህርት), አንቀጽ 27 (ሥራ)። |
| **FDRE Constitution** | 1995 | አንቀጽ 25 (ያለ አድልዎ እኩልነት)፣ አንቀጽ 41(5) (ለአካል ጉዳተኞች ልዩ ድጋፍ)። |
| **Proclamation 568/2008** | 2008 | በሥራ ቅጥር አድልዎ መከልከል እና በእኩል ውድድር ቅድሚያ መስጠት። |
| **Building Proc. 624/2009** | 2009 | ማንኛውም አዲስ የሕዝብ ሕንጻ ለአካል ጉዳተኞች ተደራሽ (Ramp/Toilet) መሆን አለበት። |`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንድ አዲስ የመንግሥት ዩኒቨርሲቲ ባለ 5 ፎቅ ቤተ መጻሕፍት ሲገነባ ሊፍት ወይም ራምፕ ሳይሰራ ቢቀር የትኛውን የኢትዮጵያ አዋጅ ይጥሳል?',
        stepsAm: [
          '1. **Ethiopian Building Proclamation No. 624/2009** (እና UNCRPD Article 9)ን በግልጽ ይጥሳል!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'UNCRPD', termAm: 'የUN የአካል ጉዳተኞች መብት ስምምነት', definitionAm: 'በ2006 የጸደቀና ኢትዮጵያ በ2010 ያጸደቀችው አስገዳጅ ዓለም አቀፍ ሕግ።' },
    ],
    examTrapsAm: [
      'Salamanca Statement (1994) ጠንካራ የፖሊሲ መመሪያ ቢሆንም በሕግ አስገዳጅ (Legally Binding Treaty) አይደለም፤ **UNCRPD (2006)** ግን ላጸደቁት ሀገራት **አስገዳጅ ዓለም አቀፍ ሕግ** ነው!',
    ],
    keyTakeawaysAm: [
      'በኢትዮጵያ ጠንካራ ሕጎች ቢኖሩም ዋናው ክፍተት **የአተገባበርና የክትትል (Implementation Gap)** እጥረት ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ Proclamation 568/2008 በሥራ ቦታ "Burden of Proof" ላይ ምን ይላል?',
        answerAm: 'መልስ፡ አድልዎ ተፈጽሞብኛል ብሎ የሚከሰው አካል ጉዳተኛ ሳይሆን፣ አድልዎ አለመፈጸሙን ማስረዳት ያለበት **ቀጣሪው (Employer)** ነው!',
      },
    ],
  },

  'inc-mod-ch7': {
    subject: 'inclusive',
    chapterNumber: 7,
    titleAm: 'ምዕራፍ 7፡ ለአካታችነት የሚያስፈልግ የሀብት አስተዳደር (Resources Management)',
    briefOverviewAm: 'ለአካታችነት የሚያስፈልጉ የሰው፣ የፋይናንስ እና የቁሳቁስ ሀብቶችን፣ Resource Mobilization፣ የResource Centers አጠቃቀም እና ተግዳሮቶችን ያስተምራል።',
    briefPointsAm: [
      '3ቱ የሀብት ዓይነቶች፡ Human (ልዩ ፍላጎት መምህራን፣ የምልክት ቋንቋ ተርጓሚዎች)፣ Material/Assistive (ብሬል፣ ዊልቸር፣ Screen readers)፣ Financial (የተለየ በጀት/ድጎማ)።',
      'Resource Centers (IT/Support Centers)፡ ለብዙ ተማሪዎች ብሬል፣ የድምጽ መጽሐፍትና ልዩ ድጋፍ የሚሰጥበት ማዕከል።',
      'Twin-Track Approach፡ አጠቃላይ በጀትን ሁሉ አካታች ማድረግ + ለአካል ጉዳተኞች ልዩ የሆነ ተጨማሪ ድጋፍ መመደብ።',
      'Resource Mobilization፡ ከመንግሥት፣ ከNGO፣ ከግል ዘርፍ እና ከማህበረሰብ ሀብት ማሰባሰብ።',
    ],
    examTipAm: 'Twin-Track Approach (ሁለትዮሽ መንገድ) = (1) Mainstreaming (ሁሉም ፕሮግራም አካታች እንዲሆን) + (2) Targeted Support (ልዩ መሣሪያና ድጋፍ ለሚያስፈልጋቸው መስጠት)!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የአካታችነት ሕጎች በወረቀት ላይ ብቻ እንዳይቀሩ የሚያስፈልገውን የሀብት አመዳደብና አስተዳደር (Human, Material, Financial & Technological Resources) ይተነትናል። Human Resources (Special Needs Teachers, Sign Language Interpreters, Braille Transcribers, Occupational/Speech Therapists, Counselors)፣ Material Resources (School Resource Centers, Assistive Technology, Accessible Infrastructure)፣ Inclusive Budgeting / Twin-Track Approach እና Resource Mobilization strategies በዝርዝር ተብራርተዋል።',
    learningOutcomesAm: [
      'ለአካታች ትምህርትና ሥራ የሚያስፈልጉትን 3 ዋና ሀብቶች (Human, Material, Financial) መለየት።',
      'የResource Center ሚናን እና የTwin-Track Approachን አሰራር ማብራራት።',
    ],
    sectionsAm: [
      {
        headingAm: '7.1 የሀብት አስተዳደር፣ Resource Centers እና Twin-Track Approach',
        contentAm: `### 7.1.1 አስፈላጊ ሀብቶች
- **Human**: በቂ ስልጠና የወሰዱ መምህራን፣ የምልክት ቋንቋ ተርጓሚዎች፣ አማካሪዎች (Counselors)።
- **Material**: የብሬል ማተሚያ (Embosser)፣ ታክታይል ካርታዎች፣ የስልክ/ኮምፒውተር Screen readers፣ Ramp እና ተደራሽ መጸዳጃ ቤቶች።
- **Financial**: በትምህርት ቤት እና በድርጅት ዓመታዊ በጀት ውስጥ "Reasonable Accommodation Line Item" መመደብ።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንድ ዩኒቨርሲቲ ለሁሉም ተማሪዎች ክፍሎቹን በRamp ቢያዘጋጅ እና በተጨማሪም ለዓይነ-ስውራን ተማሪዎች ብቻ የJAWS ኮምፒውተር ላብ ቢከፍት የትኛው አቀራረብ ነው?',
        stepsAm: [
          '1. **Twin-Track Approach** — Ramps ለሁሉም (Mainstreaming) + የJAWS ላብ ለዓይነ-ስውራን (Targeted Support)!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Resource Center', termAm: 'የድጋፍ/ሀብት ማዕከል', definitionAm: 'ልዩ የትምህርት መሣሪያዎችና ባለሙያዎች የሚገኙበት እና መደበኛ ት/ቤቶችን የሚያግዝ ማዕከል።' },
    ],
    examTrapsAm: [
      'ብዙ ተቋማት Inclusion "በጣም ውድ ነው" ብለው ይሸሻሉ፤ ነገር ግን Segregation (ለየብቻ ት/ቤቶች መስራት) በረጅም ጊዜ ከInclusion የበለጠ ውድ ነው!',
    ],
    keyTakeawaysAm: [
      'ያለ በጀት እና ያለ ሰለጠነ የሰው ኃይል የInclusion ፖሊሲዎች መሬት አይወርዱም።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ Low-cost/Local resource mobilization ለኢትዮጵያ ት/ቤቶች ለምን ይመከራል?',
        answerAm: 'መልስ፡ ከውጭ የሚገቡ መሣሪያዎች ውድ ስለሆኑ ከአካባቢው ቁሳቁስ (እንጨት፣ ሸክላ፣ በጎ ፈቃደኛ ተማሪዎች/Peer Tutoring) በመጠቀም ዘላቂ ድጋፍ መስጠት ስለሚቻል።',
      },
    ],
  },

  'inc-mod-ch8': {
    subject: 'inclusive',
    chapterNumber: 8,
    titleAm: 'ምዕራፍ 8፡ ከባለድርሻ አካላት ጋር የትብብር አጋርነት (Collaborative Partnerships)',
    briefOverviewAm: 'Collaboration vs Cooperation vs Coordination፣ ባለድርሻ አካላት (ቤተሰብ፣ መምህራን፣ OPDs፣ መንግሥት፣ NGOs)፣ Multidisciplinary Teams እና ውጤታማ የትብብር እንቅፋቶችን ያስተምራል።',
    briefPointsAm: [
      'አጋርነት (Partnership)፡ ቤተሰብ + ት/ቤት + አካል ጉዳተኞች ማህበራት (OPDs) + መንግሥት + ጤና + NGOs በጋራ መስራት።',
      'Co-Teaching / Multidisciplinary Team፡ የተለያዩ ባለሙያዎች (መምህር፣ ልዩ ፍላጎት ባለሙያ፣ የንግግር ሐኪም) ለአንድ ተማሪ ስኬት መተባበር።',
      'OPDs (Organizations of Persons with Disabilities)፡ እንደ FENAPD (የኢትዮጵያ ብሔራዊ አካል ጉዳተኞች ማህበራት ፌዴሬሽን) በውሳኔ መሳተፍ።',
      'የትብብር እንቅፋቶች፡ የመረጃ እጥረት፣ የኃላፊነት ግልጽነት ማጣት፣ የበጀት ውስንነት እና የባህል ተጽዕኖ።',
    ],
    examTipAm: 'Collaboration ከCooperation የበለጠ ጥልቅ ነው — **Collaboration** ማለት የጋራ ግብ፣ የጋራ ኃላፊነት፣ የጋራ ውሳኔ እና የጋራ ሀብት ማጋራት ነው!',
    expandedOverviewAm:
      'ይህ የመጨረሻው የInclusiveness ምዕራፍ አካታች ማህበረሰብ መገንባት የአንድ ተቋም ወይም የአንድ መምህር ብቻ ሥራ ሳይሆን የሁሉም ባለድርሻ አካላት (Stakeholders) ቅንጅት መሆኑን ያስረዳል። Key Stakeholders (Students, Parents/Families, General & Special Teachers, School Leaders, Health Professionals, Social Workers, OPDs/DPOs, Government Ministries, NGOs), Levels of Partnership (Networking, Coordination, Cooperation, Collaboration), Multidisciplinary vs Interdisciplinary vs Transdisciplinary Teams፣ እና ውጤታማ አጋርነትን የመገንባት መርሆዎች (Trust, Mutual Respect, Shared Vision, Clear Communication) በጥልቀት ተብራርተዋል።',
    learningOutcomesAm: [
      'Networking, Coordination, Cooperation እና Collaboration መካከል ያለውን የጥልቀት ልዩነት መግለጽ።',
      'በአካታች ትምህርትና ሥራ ውስጥ የወላጆችና የOPDs (እንደ FENAPD) ሚናን መተንተን።',
      'Multidisciplinary, Interdisciplinary እና Transdisciplinary ቡድኖችን ማነጻጸር።',
    ],
    sectionsAm: [
      {
        headingAm: '8.1 ባለድርሻ አካላት፣ የትብብር ደረጃዎች እና Team Models',
        contentAm: `### 8.1.1 የቡድን ስራ ሞዴሎች (Team Models)
- **Multidisciplinary**: እያንዳንዱ ባለሙያ (ሐኪም፣ መምህር) ተማሪውን ለየብቻ ገምግሞ ሪፖርት ይጽፋል (ውህደት ትንሽ ነው)።
- **Interdisciplinary**: ባለሙያዎች በመደበኛነት ተገናኝተው መረጃ በመለዋወጥ የጋራ IEP ይሰራሉ።
- **Transdisciplinary**: ድንበር ተሻጋሪ ጥልቅ ውህደት — ባለሙያዎች እውቀታቸውን በማጋራት አንድ ዋና አገናኝ (Role Release) በመጠቀም ይሰራሉ።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንድ ትምህርት ቤት የመንግሥት መምሪያን፣ የወላጆች ኮሚቴን፣ የአካል ጉዳተኞች ማህበርን (OPD) እና የጤና ጣቢያን ሰብስቦ የጋራ እቅድና በጀት ቢያወጣ ይህ የምን ምሳሌ ነው?',
        stepsAm: [
          '1. **Collaborative Partnership** — ሁሉም ባለድርሻዎች በጋራ ግብና ኃላፊነት እየሰሩ ስለሆነ!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'OPDs / DPOs', termAm: 'የአካል ጉዳተኞች ማህበራት', definitionAm: 'በራሳቸው በአካል ጉዳተኞች የሚመሩና መብታቸውን የሚያስከብሩ ድርጅቶች (ለምሳሌ ENAB, ENAD, FENAPD)።' },
    ],
    examTrapsAm: [
      'ወላጆች (Parents) በትምህርት ውስጥ "ተመልካች/ተቀባይ" ብቻ አይደሉም — ስለ ልጃቸው ባህሪና ፍላጎት ዋና ባለሙያና **የIEP ቡድን ወሳኝ አባላት** ናቸው!',
    ],
    keyTakeawaysAm: [
      'ያለ Collaboration የትኛውም ተቋም ብቻውን ሙሉ Inclusionን ማምጣት አይችልም።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በአንድ አካታች ክፍል ውስጥ "Co-teaching" ማለት ምን ማለት ነው?',
        answerAm: 'መልስ፡ አንድ መደበኛ መምህር እና አንድ የልዩ ፍላጎት መምህር በአንድ ክፍል ውስጥ በጋራ ሆነው ለሁሉም ተማሪዎች ትምህርት መስጠት ነው።',
      },
    ],
  },
};
