import type { AmharicChapterNote } from './types';

export const MATHS_NAT_AM_NOTES: Record<string, AmharicChapterNote> = {
  'mathnat-ch1': {
    subject: 'mathematics',
    chapterNumber: 1,
    titleAm: 'ምዕራፍ 1፡ የፕሮፖዚሽናል ሎጂክ እና የስብስብ ቲዎሪ (Propositional Logic & Set Theory)',
    briefOverviewAm: 'ፕሮፖዚሽኖች፣ የሎጂክ አገናኞች፣ የእውነት ሰንጠረዥ፣ ኳንቲፋየሮች፣ የክርክር ትክክለኛነት (Validity) እና የስብስብ ቲዎሪ መሰረታዊ ሕጎችን ይሸፍናል።',
    briefPointsAm: [
      'ፕሮፖዚሽን (Proposition) እውነት (T) ወይም ሐሰት (F) ብቻ ሊሆን የሚችል መግለጫ ዓረፍተ ነገር ነው።',
      'p ⇒ q ሐሰት የሚሆነው p እውነት (T) ሆኖ q ሐሰት (F) ሲሆን ብቻ ነው፤ Contrapositive (¬q ⇒ ¬p) ከዋናው ጋር እኩል ነው።',
      'የኳንቲፋየር አሉታ፡ ¬(∀x P(x)) ≡ ∃x ¬P(x) እና ¬(∃x P(x)) ≡ ∀x ¬P(x)።',
      'የስብስብ ብዛት (3 ስብስቦች)፡ n(A∪B∪C) = n(A)+n(B)+n(C) − n(A∩B)−n(A∩C)−n(B∩C) + n(A∩B∩C)።',
    ],
    examTipAm: 'በፈተና ላይ p ⇒ q እና Converse (q ⇒ p) እንዳይቀላቀሉብዎ ይጠንቀቁ፤ Contrapositive (¬q ⇒ ¬p) ብቻ ነው ሁልጊዜ ከዋናው ጋር እኩል የሆነው።',
    expandedOverviewAm:
      'ይህ ምዕራፍ የኢትዮጵያ ዩኒቨርሲቲ የመጀመሪያ ዓመት የተፈጥሮ ሳይንስ ሒሳብ (MathsNat) መሰረት ነው። የማንኛውም የሳይንስና የምህንድስና ማስረጃ (Mathematical Proof) መነሻ የሆነውን የፕሮፖዚሽናል ሎጂክን፣ ክፍት ዓረፍተ ነገሮችንና ኳንቲፋየሮችን (∀ እና ∃)፣ የክርክሮችን ትክክለኛነት (Validity of Arguments) በእውነት ሰንጠረዥና በኢንፈረንስ ሕጎች ማረጋገጥን፣ እንዲሁም የስብስብ ቲዎሪን (Set Theory)፣ የስብስብ አልጀብራ ሕጎችንና የቬን ዲያግራም የመቁጠር ስሌቶችን በጥልቀት ያስተምራል።',
    learningOutcomesAm: [
      'ፕሮፖዚሽን (Proposition) ከጥያቄ፣ ትዕዛዝ፣ አድናቆት፣ ክፍት ዓረፍተ ነገር እና ፓራዶክስ መለየት።',
      'አምስቱን የሎጂክ አገናኞች (¬, ∧, ∨, ⇒, ⇔) በመጠቀም የውህድ ፕሮፖዚሽኖችን የእውነት ሰንጠረዥ መገንባት።',
      'Tautology፣ Contradiction፣ Contingency እና Logical Equivalence (≡) በእውነት ሰንጠረዥና በአልጀብራ ሕጎች ማረጋገጥ።',
      'Universal (∀) እና Existential (∃) ኳንቲፋየሮችን በትክክል መተርጎም፣ ማካድ (Negate) እና የተደራረቡ ኳንቲፋየሮችን መመርመር።',
      'ዘጠኙን የኢንፈረንስ ሕጎች (Modus Ponens, Modus Tollens, HS, DS ወዘተ) በመጠቀም መደበኛ ማስረጃ (Formal Proof) መጻፍ።',
      'የስብስብ ስሌቶችን (∪, ∩, −, Δ, Power Set, Cartesian Product) እና የ3-ስብስብ Inclusion-Exclusion ቀመርን በተግባር መፍታት።',
    ],
    sectionsAm: [
      {
        headingAm: '1.1 ፕሮፖዚሽናል ሎጂክ፡ ፕሮፖዚሽኖች፣ የሎጂክ አገናኞች እና የሎጂክ ሕጎች',
        contentAm: `### 1.1.1 የፕሮፖዚሽን ትርጉም እና መሰረታዊ መርሆዎች
- **ፕሮፖዚሽን (Proposition / Statement)** ማለት በግልጽ **እውነት (True, $T$)** ወይም **ሐሰት (False, $F$)** ሊሆን የሚችል፣ ነገር ግን ሁለቱንም በአንድ ጊዜ መሆን የማይችል መግለጫ ዓረፍተ ነገር (Declarative Sentence) ነው።
- በክላሲካል ሎጂክ ሁለት ዋና መርሆዎች አሉ፡
  1. **የተገለለ መካከለኛ ሕግ (Law of Excluded Middle)**፡ ማንኛውም ፕሮፖዚሽን ወይ እውነት ወይም ሐሰት ነው፤ ሦስተኛ አማራጭ የለም።
  2. **ያለመቃረን ሕግ (Law of Non-Contradiction)**፡ አንድ ፕሮፖዚሽን በአንድ ጊዜ እውነትም ሐሰትም ሊሆን አይችልም።
- **ፕሮፖዚሽን ያልሆኑ ዓረፍተ ነገሮች (Non-Propositions)**፡
  - **ጥያቄዎች (Questions)**፡ *"ፈተናው ስንት ሰዓት ይጀምራል?"*
  - **ትዕዛዞች (Commands)**፡ *"እኩልታውን ለ $x$ አስላ!"*
  - **አድናቆት/ምኞት (Exclamations)**፡ *"እንዴት የሚገርም ማስረጃ ነው!"*
  - **ክፍት ዓረፍተ ነገሮች (Open Sentences)**፡ *"$x + 5 = 12$"* ወይም *"እርሱ የAASTU ተማሪ ነው።"* — የ $x$ ዋጋ እስካልተገለጸ ድረስ እውነት ወይም ሐሰት አይባልም።
  - **ፓራዶክስ (Self-Referential Paradox)**፡ *"ይህ ዓረፍተ ነገር ሐሰት ነው።"* — እውነት ከሆነ ሐሰት መሆን አለበት፤ ሐሰት ከሆነ እውነት መሆን አለበት።

### 1.1.2 አምስቱ መሰረታዊ የሎጂክ አገናኞች (Logical Connectives)
1. **አሉታ (Negation, $\\neg p$)**፡ የ $p$ን እውነትነት ይገለብጣል። $p=T \\implies \\neg p=F$፤ $p=F \\implies \\neg p=T$።
2. **መጣመር / እና (Conjunction, $p \\land q$)**፡ እውነት ($T$) የሚሆነው **ሁለቱም** $p$ እና $q$ እውነት ሲሆኑ ብቻ ነው። በእንግሊዝኛ *"and, but, yet, although, however, moreover, while"* የሚሉ ቃላት $\\land$ን ይወክላሉ!
3. **አማራጭ / ወይም (Disjunction, $p \\lor q$ — Inclusive OR)**፡ ሐሰት ($F$) የሚሆነው **ሁለቱም** ሐሰት ሲሆኑ ብቻ ነው። *(ማስታወሻ፡ Exclusive OR $p \\underline{\\lor} q$ ማለት ሁለቱ የተለያየ ዋጋ ሲኖራቸው ብቻ $T$ የሚሆን ነው።)*
4. **አስገዳጅ / ከ... ታዲያ (Implication, $p \\Rightarrow q$)**፡ እዚህ $p$ **መነሻ (Antecedent / Sufficient Condition)** ሲሆን $q$ **ውጤት (Consequent / Necessary Condition)** ነው።
   - **ወርቃማ ሕግ**፡ $p \\Rightarrow q$ ሐሰት ($F$) የሚሆነው **$p = T$ ሆኖ $q = F$ ሲሆን ብቻ** ነው! $p = F$ ከሆነ $p \\Rightarrow q$ ሁልጊዜ **እውነት (Vacuously True)** ነው።
   - **በፈተና ላይ የሚጠየቁ አቻ አገላለጾች**፡ *"$p$ only if $q$"*, *"$p$ is sufficient for $q$"*, *"$q$ is necessary for $p$"*, *"$q$ unless $\\neg p$"* ሁሉም **$p \\Rightarrow q$** ማለት ናቸው!
   - **ተዛማጅ አገላለጾች**፡
     - **Converse**: $q \\Rightarrow p$
     - **Inverse**: $\\neg p \\Rightarrow \\neg q$ (ከConverse ጋር እኩል ነው!)
     - **Contrapositive**: $\\neg q \\Rightarrow \\neg p$ (**ሁልጊዜ ከዋናው $p \\Rightarrow q$ ጋር እኩል ነው!**)
5. **ሁለት-አቅጣጫ አስገዳጅ (Biconditional, $p \\Leftrightarrow q$)**፡ $p$ እና $q$ **ተመሳሳይ** የእውነት ዋጋ ሲኖራቸው ($T,T$ ወይም $F,F$) ብቻ እውነት ይሆናል።

### 1.1.3 Tautology, Contradiction እና የሎጂክ አልጀብራ ሕጎች
- **Tautology**፡ በሁሉም ሁኔታዎች ሁልጊዜ $T$ የሆነ ውህድ ፕሮፖዚሽን (ለምሳሌ $p \\lor \\neg p$)።
- **Contradiction**፡ በሁሉም ሁኔታዎች ሁልጊዜ $F$ የሆነ (ለምሳሌ $p \\land \\neg p$)።
- **Contingency**፡ አንዳንዴ $T$ አንዳንዴ $F$ የሚሆን።
- **ዋና የአቻነት ሕጎች (Laws of Logic)**፡
  - **De Morgan's Laws**: $\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q$ እና $\\neg(p \\lor q) \\equiv \\neg p \\land \\neg q$
  - **Implication Law**: $p \\Rightarrow q \\equiv \\neg p \\lor q$ (እና አሉታው፡ $\\neg(p \\Rightarrow q) \\equiv p \\land \\neg q$)
  - **Distributive Laws**: $p \\land (q \\lor r) \\equiv (p \\land q) \\lor (p \\land r)$`,
        keyPointsAm: [
          '"but", "yet", "however", "although" በሎጂክ ውስጥ Conjunction (∧) ናቸው።',
          '¬(p ⇒ q) ≡ p ∧ ¬q — የImplication አሉታ ሌላ Implication አይደለም!',
        ],
      },
      {
        headingAm: '1.2 ክፍት ፕሮፖዚሽኖች፣ ኳንቲፋየሮች (∀, ∃) እና የክርክር ትክክለኛነት',
        contentAm: `### 1.2.1 ክፍት ፕሮፖዚሽኖች እና ኳንቲፋየሮች
- **Open Proposition $P(x)$**፡ ተለዋዋጭ ($x$) የያዘ ዓረፍተ ነገር ሲሆን ከተሰጠው ስብስብ (Domain / Universe of Discourse, $U$) ዋጋ ሲተካበት ፕሮፖዚሽን ይሆናል።
- **Universal Quantifier ($\\forall x \\, P(x)$)**፡ *"ለሁሉም $x \\in U$፣ $P(x)$ እውነት ነው"* ማለት ነው። ሐሰት ለማድረግ **አንድ መቃረኛ ምሳሌ (Counterexample)** መገኘቱ በቂ ነው!
- **Existential Quantifier ($\\exists x \\, P(x)$)**፡ *"ቢያንስ አንድ $x \\in U$ ለ $P(x)$ እውነት የሚያደርግ አለ"* ማለት ነው። እውነት ለማድረግ **አንድ ምሳሌ** መገኘቱ በቂ ነው።
- **የኳንቲፋየሮች አሉታ (Negation Rules)**፡
  $$\\neg(\\forall x \\, P(x)) \\equiv \\exists x \\, \\neg P(x) \\qquad \\text{እና} \\qquad \\neg(\\exists x \\, P(x)) \\equiv \\forall x \\, \\neg P(x)$$
- **የተደራረቡ ኳንቲፋየሮች (Nested Quantifiers)**፡ የ $\\forall$ እና $\\exists$ ቅደም ተከተል ትርጉሙን ሙሉ በሙሉ ይቀይራል!
  - $\\exists y \\, \\forall x \\, P(x, y) \\implies \\forall x \\, \\exists y \\, P(x, y)$ ሁልጊዜ እውነት ነው (አንድ የጋራ $y$ ለሁሉም $x$ የሚሰራ ከሆነ፣ ለእያንዳንዱ $x$ የሆነ $y$ አለ ማለት ነው)፤ **ተገላቢጦሹ ግን ሐሰት ነው!**

### 1.2.2 የክርክር ትክክለኛነት (Validity of Arguments) እና 9ኙ የኢንፈረንስ ሕጎች
አንድ ክርክር $(P_1 \\land P_2 \\land \\dots \\land P_n) \\Rightarrow C$ **ትክክለኛ (Valid)** የሚባለው ሁሉም መነሻዎች ($P_i$) እውነት በሆኑበት ረድፍ ሁሉ መደምደሚያው ($C$) እውነት ሲሆን — ማለትም $(P_1 \\land \\dots \\land P_n) \\Rightarrow C$ **Tautology** ሲሆን ነው!
- **9ኙ ዋና የኢንፈረንስ ሕጎች**፡
  1. **Modus Ponens (MP)**: $p \\to q, \\; p \\vdash q$
  2. **Modus Tollens (MT)**: $p \\to q, \\; \\neg q \\vdash \\neg p$
  3. **Hypothetical Syllogism (HS)**: $p \\to q, \\; q \\to r \\vdash p \\to r$
  4. **Disjunctive Syllogism (DS)**: $p \\lor q, \\; \\neg p \\vdash q$
  5. **Addition (Add)**: $p \\vdash p \\lor q$
  6. **Simplification (Simp)**: $p \\land q \\vdash p$
  7. **Conjunction (Conj)**: $p, \\; q \\vdash p \\land q$
  8. **Constructive Dilemma (CD)**: $(p \\to q) \\land (r \\to s), \\; p \\lor r \\vdash q \\lor s$
  9. **Absorption (Abs)**: $p \\to q \\vdash p \\to (p \\land q)$
- **ሁለት ታዋቂ የሎጂክ ስህተቶች (Logical Fallacies)**፡
  - **Fallacy of Affirming the Consequent**: $p \\to q, \\; q \\vdash p$ (**INVALID!**)
  - **Fallacy of Denying the Antecedent**: $p \\to q, \\; \\neg p \\vdash \\neg q$ (**INVALID!**)`,
        keyPointsAm: [
          'Valid argument ማለት መደምደሚያው እውነት ነው ማለት ሳይሆን መነሻዎቹ እውነት ከሆኑ መደምደሚያው በግድ እውነት መሆን አለበት ማለት ነው።',
          'Conditional Proof ለመጠቀም መደምደሚያው A → B ከሆነ Aን እንደ ተጨማሪ መነሻ ወስደን Bን ማምጣት ነው።',
        ],
      },
      {
        headingAm: '1.3 የስብስብ ቲዎሪ (Set Theory)፣ የስብስብ ስሌቶች እና የInclusion-Exclusion መርህ',
        contentAm: `### 1.3.1 የስብስብ መግለጫ መንገዶች እና ንዑስ ስብስቦች
- **ስብስብ (Set)** በግልጽ የተለዩ (Well-defined) የነገሮች ስብስብ ነው። አራቱ መገለጫ መንገዶች፡ *Verbal*, *Roster/Listing*, *Set-Builder*, እና *Venn Diagram* ናቸው።
- **ባዶ ስብስብ ($\\emptyset$ ወይም $\\{\\}$)** የማንኛውም ስብስብ ንዑስ ስብስብ ነው ($\emptyset \\subseteq A$)። ነገር ግን $\\{\\emptyset\\}$ ባዶ አይደለም፤ 1 አባል አለው!
- **Power Set ($\\mathcal{P}(A)$)**፡ የ $A$ ሁሉንም ንዑስ ስብስቦች የያዘ ስብስብ ሲሆን፣ $n(A) = k$ ከሆነ የንዑስ ስብስቦች ብዛት **$2^k$**፣ Proper subsets ብዛት ደግሞ **$2^k - 1$** ነው።

### 1.3.2 የስብስብ ስሌቶች (Set Operations) እና ሕጎች
- **Union ($A \\cup B$)**: $x \\in A \\text{ ወይም } x \\in B$
- **Intersection ($A \\cap B$)**: $x \\in A \\text{ እና } x \\in B$
- **Relative Difference ($A - B$ ወይም $A \\setminus B$)**: $x \\in A \\text{ እና } x \\notin B$ ($= A \\cap B'$)
- **Symmetric Difference ($A \\Delta B$)**: $(A - B) \\cup (B - A) = (A \\cup B) - (A \\cap B)$
- **Cartesian Product ($A \\times B$)**: $\\{(a, b) : a \\in A, b \\in B\\}$ እና $n(A \\times B) = n(A) \\cdot n(B)$

### 1.3.3 የInclusion-Exclusion መቁጠሪያ ቀመሮች
- **ለሁለት ስብስቦች**: $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$
- **ለሦስት ስብስቦች**:
  $$n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A \\cap B) - n(A \\cap C) - n(B \\cap C) + n(A \\cap B \\cap C)$$`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የ $(p \\Rightarrow q) \\land \\neg q$ ፕሮፖዚሽንን በቀላል አልጀብራ ወይም በእውነት ሰንጠረዥ በመመርመር ከ $\\neg(p \\lor q)$ ጋር እኩል መሆኑን ወይም አለመሆኑን አረጋግጡ።',
        stepsAm: [
          'ደረጃ 1፡ $p \\Rightarrow q \\equiv \\neg p \\lor q$ የሚለውን ሕግ ተጠቀም።',
          'ደረጃ 2፡ ስለዚህ $(\\neg p \\lor q) \\land \\neg q$ ይሆናል።',
          'ደረጃ 3፡ Distributive Law ስንጠቀም፡ $(\\neg p \\land \\neg q) \\lor (q \\land \\neg q)$።',
          'ደረጃ 4፡ $q \\land \\neg q \\equiv F$ ስለሆነ $(\\neg p \\land \\neg q) \\lor F \\equiv \\neg p \\land \\neg q$።',
          'ደረጃ 5፡ በDe Morgan ሕግ መሰረት $\\neg p \\land \\neg q \\equiv \\neg(p \\lor q)$ ስለሆነ ሁለቱም **ሙሉ በሙሉ እኩል (Logically Equivalent)** ናቸው!',
        ],
        tipAm: 'በፈተና ላይ ከ4 ረድፍ ሰንጠረዥ ይልቅ Implication + Distributive + De Morgan ሕጎችን መጠቀም ጊዜ ይቆጥባል።',
      },
      {
        problemAm: 'በአንድ ዩኒቨርሲቲ 100 የፍሬሽማን ተማሪዎች መካከል 60ዎቹ ሒሳብ፣ 50ዎቹ ፊዚክስ፣ 40ዎቹ ኬሚስትሪ ይወስዳሉ። 25ቱ ሒሳብና ፊዚክስ፣ 20ዎቹ ሒሳብና ኬሚስትሪ፣ 15ቱ ፊዚክስና ኬሚስትሪ፣ 10ሩ ደግሞ ሦስቱንም ይወስዳሉ። ከሦስቱ አንዱንም የማይወስዱ ስንት ናቸው?',
        stepsAm: [
          'ደረጃ 1፡ Inclusion-Exclusion ቀመር ጻፍ፡ $n(M \\cup P \\cup C) = 60 + 50 + 40 - 25 - 20 - 15 + 10$።',
          'ደረጃ 2፡ ድምሩ፡ $150 - 60 + 10 = 100$።',
          'ደረጃ 3፡ ቢያንስ አንድ ትምህርት የሚወስዱ 100 ተማሪዎች ናቸው። ስለዚህ ምንም የማይወስዱ $100 - 100 = 0$ ተማሪዎች ናቸው።',
        ],
        tipAm: 'መጨረሻ ላይ $+ n(A \\cap B \\cap C)$ን መደመር እንዳትረሱ — አለበለዚያ መሃሉ ሙሉ በሙሉ ይሰረዛል!',
      },
    ],
    glossaryAm: [
      { termEn: 'Proposition', termAm: 'ፕሮፖዚሽን', definitionAm: 'እውነት ወይም ሐሰት ብቻ ሊሆን የሚችል መግለጫ ዓረፍተ ነገር።' },
      { termEn: 'Contrapositive', termAm: 'ኮንትራፖዚቲቭ', definitionAm: 'የ $p \\Rightarrow q$ ተቃራኒ ግልባጭ ($\\neg q \\Rightarrow \\neg p$)፤ ሁልጊዜ ከዋናው ጋር እኩል ነው።' },
      { termEn: 'Tautology', termAm: 'ቶቶሎጂ', definitionAm: 'በማንኛውም የእውነት እሴት ጥምረት ሁልጊዜ እውነት ($T$) የሚሆን ፕሮፖዚሽን።' },
      { termEn: 'Modus Tollens', termAm: 'ሞዱስ ቶለንስ', definitionAm: 'ከ $p \\to q$ እና $\\neg q$ ተነስቶ $\\neg p$ን የሚደመድም ትክክለኛ የኢንፈረንስ ሕግ።' },
      { termEn: 'Power Set', termAm: 'ፓወር ሴት', definitionAm: 'የአንድ ስብስብ ሁሉንም ንዑስ ስብስቦች የያዘ ስብስብ፤ ብዛቱ $2^n$ ነው።' },
      { termEn: 'Symmetric Difference', termAm: 'ሲሜትሪክ ልዩነት', definitionAm: '$A \\Delta B = (A - B) \\cup (B - A)$፤ በአንዱ ብቻ ያሉ አባላት ስብስብ።' },
    ],
    examTrapsAm: [
      'የ $p \\Rightarrow q$ አሉታ $\\neg p \\Rightarrow \\neg q$ አይደለም! ትክክለኛው አሉታ $p \\land \\neg q$ ነው።',
      '"$p$ only if $q$" ማለት $q \\Rightarrow p$ አይደለም፤ $p \\Rightarrow q$ ነው።',
      '$\\emptyset$ እና $\\{\\emptyset\\}$ አንድ አይደሉም፡ $n(\\emptyset) = 0$ ሲሆን $n(\\{\\emptyset\\}) = 1$ ነው።',
      'Affirming the Consequent ($p \\to q, q \\vdash p$) እና Denying the Antecedent ($p \\to q, \\neg p \\vdash \\neg q$) ሁለቱም የተሳሳቱ (Invalid) ክርክሮች ናቸው።',
    ],
    keyTakeawaysAm: [
      'አምስቱን የሎጂክ አገናኞችና የእውነት ሰንጠረዣቸውን በቃል መያዝ ለሁሉም ሒሳብ ማስረጃዎች ቁልፍ ነው።',
      'Contrapositive ($\\neg q \\Rightarrow \\neg p$) እና Converse ($q \\Rightarrow p$) ሁልጊዜ መለየት ያስፈልጋል።',
      'የኳንቲፋየር አሉታ ሲወሰድ $\\forall$ ወደ $\\exists$ እና $\\exists$ ወደ $\\forall$ ይቀየራል፣ ውስጣዊው Predicate ደግሞ ይካዳል።',
      'የ3-ስብስብ ችግር ሲመጣ መጀመሪያ የጋራ መጋጠሚያውን ($A \\cap B \\cap C$) በቬን ዲያግራም መሃል ላይ መሙላት ስህተትን ይከላከላል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ 1፡ የ "For every real number $x$, there exists a real number $y$ such that $x + y = 0$" ትክክለኛ አሉታ (Negation) በምልክትና በቃል ምንድን ነው?',
        answerAm: 'መልስ፡ $\\neg(\\forall x \\exists y (x+y=0)) \\equiv \\exists x \\forall y (x+y \\neq 0)$። በቃል፡ "ቢያንስ አንድ የሪል ቁጥር $x$ አለ፤ ለማንኛውም $y$፣ $x+y \\neq 0$ የሚሆን" (ዋናው ዓረፍተ ነገር እውነት ስለሆነ አሉታው ሐሰት ነው)።',
      },
      {
        questionAm: 'ጥያቄ 2፡ $A = \\{1, 2, \\{3\\}\\}$ ከሆነ $\\mathcal{P}(A)$ ስንት አባላት አሉት? $\\{3\\} \\in A$ ወይስ $\\{3\\} \\subseteq A$?',
        answerAm: 'መልስ፡ $A$ 3 አባላት ($1$, $2$, እና $\\{3\\}$) ስላሉት $|\\mathcal{P}(A)| = 2^3 = 8$ ነው። እዚህ $\\{3\\}$ እንደ አንድ አባል ስለተቀመጠ $\\{3\\} \\in A$ **እውነት** ነው፤ $\\{3\\} \\subseteq A$ ግን **ሐሰት** ነው (ምክንያቱም $3 \\notin A$)። ትክክለኛው ንዑስ ስብስብ $\\{\\{3\\}\\} \\subseteq A$ ነው።',
      },
    ],
  },

  'mathnat-ch2': {
    subject: 'mathematics',
    chapterNumber: 2,
    titleAm: 'ምዕራፍ 2፡ የሪል እና የኮምፕሌክስ ቁጥሮች ሥርዓት (Real & Complex Numbers)',
    briefOverviewAm: 'የሪል ቁጥሮች ስብስብ (ℕ, ℤ, ℚ, ℝ)፣ የሒሳባዊ ኢንዳክሽን መርህ (PMI)፣ የኮምፕሌክስ ቁጥሮች አልጀብራ፣ ፖላር ቅርጽ፣ የDe Moivre ቲዎረም እና ሥሮችን ያስረዳል።',
    briefPointsAm: [
      'የሒሳባዊ ኢንዳክሽን 3 ደረጃዎች፡ Base Case (P(1))፣ Inductive Hypothesis (P(k) መገመት) እና Inductive Step (P(k+1) ማረጋገጥ)።',
      'ኮምፕሌክስ ቁጥር z = x + iy ሞዱለሱ r = √(x² + y²) ሲሆን ፖላር ቅርጹ z = r(cosθ + i sinθ) ነው።',
      'የDe Moivre ቲዎረም፡ [r(cosθ + i sinθ)]ⁿ = rⁿ(cos nθ + i sin nθ)።',
      'የz n-ኛ ሥሮች (k = 0, 1, ..., n−1)፡ w_k = r^(1/n) cis((θ + 2kπ)/n)።',
    ],
    examTipAm: 'የኮምፕሌክስ ቁጥር አንግል (θ = Arg(z)) ሲፈልጉ ቁጥሩ በየትኛው Quadrant ውስጥ እንዳለ መጀመሪያ ይወስኑ (ለምሳሌ -1 + i በ2ኛ Quadrant ውስጥ ስለሆነ θ = 3π/4 ነው)።',
    expandedOverviewAm:
      'ይህ ምዕራፍ የቁጥር ሥርዓቶችን ከተፈጥሮ ቁጥሮች ($\\mathbb{N}$) ጀምሮ እስከ ኢንቲጀር ($\\mathbb{Z}$), ራሽናል ($\\mathbb{Q}$), ኢራሽናል, ሪል ($\\mathbb{R}$) እና ኮምፕሌክስ ($\\mathbb{C}$) ቁጥሮች ድረስ በጥልቀት ይመረምራል። ለአዎንታዊ ኢንቲጀሮች የሚሰሩ ቀመሮችን በሒሳባዊ ኢንዳክሽን (Principle of Mathematical Induction) ማረጋገጥን፣ የEuclidean Algorithm (GCD) እና የሪል ቁጥሮችን Completeness Property (Supremum/Infimum) ያብራራል። በተጨማሪም የኮምፕሌክስ ቁጥሮችን ካርቴዥያን እና ፖላር አጻጻፍ፣ De Moivre\'s Theorem፣ Euler\'s Formula ($e^{i\\theta}$) እና የ $n$-ኛ ሥሮች አፈላለግን በምሳሌዎች ያስተምራል።',
    learningOutcomesAm: [
      'የቁጥር ስብስቦችን ግንኙነት ($\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\subset \\mathbb{C}$) እና የራሽናል/ኢራሽናል ልዩነትን ማስረዳት።',
      'የWell-Ordering Principle እና Principle of Mathematical Induction (PMI) በመጠቀም ድምሮችንና Inequalities ማረጋገጥ።',
      'የDivision Algorithm እና Euclidean Algorithm በመጠቀም GCD ማስላት።',
      'የኮምፕሌክስ ቁጥሮችን መደመር፣ ማባዛት፣ በConjugate ማካፈል፣ Modulus እና Principal Argument ማግኘት።',
      'የDe Moivre ቲዎረምን በመጠቀም ከፍተኛ ኃይሎችንና ሁሉንም $n$ የተለያዩ የኮምፕሌክስ ሥሮችን ማስላት።',
    ],
    sectionsAm: [
      {
        headingAm: '2.1 የሪል ቁጥሮች ሥርዓት፣ Completeness Axiom እና ሒሳባዊ ኢንዳክሽን (PMI)',
        contentAm: `### 2.1.1 የቁጥር ሥርዓቶች ሰንሰለት
- **ተፈጥሮ ቁጥሮች ($\\mathbb{N}$)**: $\\{1, 2, 3, \\dots\\}$
- **ኢንቲጀሮች ($\\mathbb{Z}$)**: $\\{\\dots, -2, -1, 0, 1, 2, \\dots\\}$
- **ራሽናል ቁጥሮች ($\\mathbb{Q}$)**: $\\{a/b : a, b \\in \\mathbb{Z}, b \\neq 0\\}$ — በአስርዮሽ ሲጻፉ የሚያልቁ (Terminating) ወይም የሚደጋገሙ (Repeating) ናቸው።
- **ኢራሽናል ቁጥሮች ($\\mathbb{Q}'$)**: የማያልቁና የማይደጋገሙ (ለምሳሌ $\\sqrt{2}, \\pi, e$)።
- **Completeness Axiom of $\\mathbb{R}$**: ባዶ ያልሆነ እና ከላይ የተገደበ (Bounded Above) ማንኛውም የ $\\mathbb{R}$ ንዑስ ስብስብ በ $\\mathbb{R}$ ውስጥ **Least Upper Bound (Supremum, $\\sup S$)** አለው። *(ይህ $\\mathbb{Q}$ የሌለው የ $\\mathbb{R}$ ልዩ ባህሪ ነው!)*

### 2.1.2 የሒሳባዊ ኢንዳክሽን መርህ (Principle of Mathematical Induction - PMI)
አንድ ዓረፍተ ነገር $P(n)$ ለሁሉም $n \\ge n_0$ እውነት መሆኑን ለማረጋገጥ 3 ግዴታ ደረጃዎች አሉ፡
1. **Base Case**: $P(n_0)$ እውነት መሆኑን በቀጥታ ማረጋገጥ (አብዛኛውን ጊዜ $n_0 = 1$)።
2. **Inductive Hypothesis**: ለዘፈቀደ ኢንቲጀር $k \\ge n_0$፣ $P(k)$ እውነት እንደሆነ **መገመት**።
3. **Inductive Step**: የ $P(k)$ እውነትነትን በመጠቀም **$P(k+1)$ እውነት መሆኑን ማረጋገጥ**።
- **የፈተና ዋና ድምር ቀመሮች**፡
  $$\\sum_{i=1}^n i = \\frac{n(n+1)}{2}, \\qquad \\sum_{i=1}^n i^2 = \\frac{n(n+1)(2n+1)}{6}, \\qquad \\sum_{i=1}^n i^3 = \\left[\\frac{n(n+1)}{2}\\right]^2$$`,
      },
      {
        headingAm: '2.2 የኮምፕሌክስ ቁጥሮች አልጀብራ፣ ፖላር ቅርጽ እና የDe Moivre ቲዎረም',
        contentAm: `### 2.2.1 የኮምፕሌክስ ቁጥሮች መሰረታዊ ስሌቶች
- የ Imaginary አሃድ $i = \\sqrt{-1}$ ሲሆን $i^2 = -1$ ነው። የ $i$ ኃይሎች በ4 ይደጋገማሉ ($i^{4k}=1, i^{4k+1}=i, i^{4k+2}=-1, i^{4k+3}=-i$)።
- $z = x + iy$ ከሆነ **Conjugate** $\\bar{z} = x - iy$ ሲሆን $z \\cdot \\bar{z} = x^2 + y^2 = |z|^2$ ይሰጣል።
- **ማካፈል**: $\\frac{z_1}{z_2} = \\frac{z_1 \\bar{z_2}}{|z_2|^2}$ — ሁልጊዜ ታችኛውንና ላይኛውን በታችኛው Conjugate አባዙ!

### 2.2.2 ፖላር (Trigonometric) ቅርጽ እና De Moivre\'s Theorem
- **Modulus (ርቀት)**: $r = |z| = \\sqrt{x^2 + y^2}$
- **Argument (አንግል)**: $\\theta = \\operatorname{Arg}(z) \\in (-\\pi, \\pi]$፣ $\\tan\\theta = y/x$ (Quadrant መፈተሽ ግዴታ ነው!)
- **Polar Form**: $z = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta}$ (Euler\'s Formula: $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$)
- **De Moivre\'s Theorem**: ለማንኛውም $n \\in \\mathbb{Z}$:
  $$z^n = r^n(\\cos(n\\theta) + i\\sin(n\\theta))$$
- **የ $z$ $n$ የተለያዩ $n^{\\text{th}}$ ሥሮች**:
  $$w_k = r^{1/n}\\left[\\cos\\left(\\frac{\\theta + 2k\\pi}{n}\\right) + i\\sin\\left(\\frac{\\theta + 2k\\pi}{n}\\right)\\right], \\quad k = 0, 1, 2, \\dots, n-1$$
  በArgand Plane ላይ እነዚህ $n$ ሥሮች በ $r^{1/n}$ ራዲየስ ክብ ላይ እኩል ርቀት ያላቸው መደበኛ $n$-ጎን (Regular $n$-gon) ይፈጥራሉ!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የ $z = (1 + i\\sqrt{3})^6$ ዋጋን በDe Moivre ቲዎረም አስሉ።',
        stepsAm: [
          'ደረጃ 1፡ $x = 1, y = \\sqrt{3}$ ስለሆነ በ1ኛ Quadrant ውስጥ ነው።',
          'ደረጃ 2፡ $r = \\sqrt{1^2 + (\\sqrt{3})^2} = \\sqrt{1+3} = 2$።',
          'ደረጃ 3፡ $\\tan\\theta = \\frac{\\sqrt{3}}{1} = \\sqrt{3} \\implies \\theta = \\frac{\\pi}{3}$።',
          'ደረጃ 4፡ በDe Moivre ቲዎረም፡ $z = 2^6\\left(\\cos\\left(6 \\cdot \\frac{\\pi}{3}\\right) + i\\sin\\left(6 \\cdot \\frac{\\pi}{3}\\right)\\right) = 64(\\cos 2\\pi + i\\sin 2\\pi) = 64(1 + 0i) = \\mathbf{64}$።',
        ],
        tipAm: 'በ6ኛ ኃይል ሲነሳ $6(\\pi/3) = 2\\pi$ መሆኑ ስሌቱን በሰከንዶች ውስጥ ወደ 64 ይቀይረዋል!',
      },
      {
        problemAm: 'የ $w^3 = -8i$ ሦስቱን የኩብ ሥሮች (Cube roots) ፈልጉ።',
        stepsAm: [
          'ደረጃ 1፡ $z = 0 - 8i$ በአሉታዊ $y$-ዘንግ ላይ ስለሚገኝ $r = 8$ እና $\\theta = -\\frac{\\pi}{2}$ (ወይም $\\frac{3\\pi}{2}$)።',
          'ደረጃ 2፡ $r^{1/3} = 8^{1/3} = 2$።',
          'ደረጃ 3፡ ለ $k=0$: $\\theta_0 = \\frac{-\\pi/2}{3} = -\\frac{\\pi}{6} \\implies w_0 = 2(\\cos(-\\pi/6)+i\\sin(-\\pi/6)) = \\sqrt{3} - i$።',
          'ደረጃ 4፡ ለ $k=1$: $\\theta_1 = \\frac{-\\pi/2 + 2\\pi}{3} = \\frac{\\pi}{2} \\implies w_1 = 2(\\cos(\\pi/2)+i\\sin(\\pi/2)) = 2i$።',
          'ደረጃ 5፡ ለ $k=2$: $\\theta_2 = \\frac{-\\pi/2 + 4\\pi}{3} = \\frac{7\\pi}{6} \\implies w_2 = -\\sqrt{3} - i$።',
        ],
        tipAm: 'የሦስቱም ሥሮች ድምር $w_0 + w_1 + w_2 = (\\sqrt{3}-i) + 2i + (-\\sqrt{3}-i) = 0$ መሆኑን በማየት መልስዎን ማረጋገጥ ይችላሉ!',
      },
    ],
    glossaryAm: [
      { termEn: 'Supremum', termAm: 'ሱፕሬመም (LUB)', definitionAm: 'የአንድ ስብስብ ትንሹ የላይኛው ገደብ (Least Upper Bound)።' },
      { termEn: 'Mathematical Induction', termAm: 'ሒሳባዊ ኢንዳክሽን', definitionAm: 'ለሁሉም አዎንታዊ ኢንቲጀሮች የሚሰራ ቀመርን በBase Case እና Inductive Step የማረጋገጫ ዘዴ።' },
      { termEn: 'Complex Conjugate', termAm: 'ኮምፕሌክስ ኮንጁጌት', definitionAm: 'የ $z=x+iy$ ኮንጁጌት $\\bar{z}=x-iy$ ሲሆን የምናባዊውን ክፍል ምልክት ይገለብጣል።' },
      { termEn: 'Modulus', termAm: 'ሞዱለስ', definitionAm: 'አንድ ኮምፕሌክስ ቁጥር ከመነሻው $(0,0)$ ያለው ርቀት $|z| = \\sqrt{x^2+y^2}$።' },
    ],
    examTrapsAm: [
      'የ $z = -1 - i$ አንግል $\\tan^{-1}(1) = \\pi/4$ ብለው አይውሰዱ! በ3ኛ Quadrant ውስጥ ስለሆነ $\\theta = -3\\pi/4$ (ወይም $5\\pi/4$) ነው።',
      'በPMI ማረጋገጫ ላይ $P(k)$ን እንደ እውነት መቀበል (Hypothesis) እንጂ $P(k)$ን "አረጋገጥን" ማለት አይደለም፤ $P(k+1)$ ከ $P(k)$ መምጣቱን ማሳየት ግዴታ ነው።',
      '$\\sqrt{-4}\\cdot\\sqrt{-9} \\neq \\sqrt{36} = 6$! ትክክለኛው $(2i)(3i) = 6i^2 = -6$ ነው።',
    ],
    keyTakeawaysAm: [
      'የሪል ቁጥሮች Completeness Axiom ለSupremum, Infimum እና ለCalculus መሰረት ነው።',
      'የኮምፕሌክስ ቁጥሮች ማባዛት ሞዱለሶችን ያባዛል፣ አንግሎችን ደግሞ ይደምራል።',
      'ማንኛውም ዜሮ ያልሆነ ኮምፕሌክስ ቁጥር ትክክለኛ $n$ የተለያዩ $n^{\\text{th}}$ ሥሮች አሉት።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ 1፡ የ $i^{2027}$ ዋጋ ስንት ነው?',
        answerAm: 'መልስ፡ $2027 = 4(506) + 3$ ስለሆነ $i^{2027} = i^3 = -i$ ነው።',
      },
      {
        questionAm: 'ጥያቄ 2፡ የ $S = \\{x \\in \\mathbb{Q} : x^2 < 2\\}$ ስብስብ በ $\\mathbb{Q}$ ውስጥ Supremum አለው?',
        answerAm: 'መልስ፡ የለውም! በ $\\mathbb{R}$ ውስጥ $\\sup S = \\sqrt{2}$ ቢሆንም፣ $\\sqrt{2} \\notin \\mathbb{Q}$ ስለሆነ $\\mathbb{Q}$ Complete አይደለም።',
      },
    ],
  },

  'mathnat-ch3': {
    subject: 'mathematics',
    chapterNumber: 3,
    titleAm: 'ምዕራፍ 3፡ ፈንክሽኖች (Functions: Polynomial, Rational, Exponential, Log, Trig & Hyperbolic)',
    briefOverviewAm: 'ግንኙነቶች፣ ፈንክሽኖች (1-to-1, Onto, Inverse)፣ የፖሊኖሚያል ቲዎረሞች፣ የራሽናል ፈንክሽን Asymptotes እና ኤክስፖኔንሻል/ሎጋሪዝም/ትሪጎኖሜትሪክ/ሃይፐርቦሊክ ፈንክሽኖችን ያብራራል።',
    briefPointsAm: [
      'ፈንክሽን Bijective (Invertible) የሚሆነው Injective (1-to-1) እና Surjective (Onto) ሲሆን ብቻ ነው።',
      'Remainder & Factor Theorem፡ P(x) በ (x − c) ሲካፈል ቀሪው P(c) ነው፤ P(c) = 0 ከሆነ (x − c) Factor ነው።',
      'Rational Function f(x) = P(x)/Q(x)፡ Vertical Asymptote ከ Q(x)=0 (ካልተሰረዘ)፣ Horizontal/Oblique Asymptote ከደረጃ ንጽጽር ይገኛል።',
      'Hyperbolic ፈንክሽኖች፡ cosh²x − sinh²x = 1 (ከትሪጎኖሜትሪ በተለየ የመቀነስ ምልክት!)።',
    ],
    examTipAm: 'Horizontal Asymptote ከፈለጉ በኋላ ግራፉ Horizontal Asymptoteን ሊያቋርጥ ይችላል፣ ነገር ግን Vertical Asymptoteን በፍጹም አያቋርጥም!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የካልኩለስ እና የከፍተኛ ሒሳብ መሰረት የሆነውን የፈንክሽኖች ቲዎሪ (Theory of Functions) ከመጀመሪያው እስከ መጨረሻው በስፋት ያቀርባል። ከRelations እና Domain/Range ጀምሮ Injective/Surjective/Bijective ባህሪያትን፣ Inverse እና Composite functions ($f \\circ g$)፣ Polynomial Root Theorems (Remainder, Factor, Rational Root Test)፣ Rational Functions እና Asymptotes (Vertical, Horizontal, Oblique, Holes)፣ እንዲሁም Exponential, Logarithmic, Trigonometric እና Hyperbolic ($\\sinh, \\cosh, \\tanh$) ፈንክሽኖችን ከነግራፎቻቸውና ሕጎቻቸው በጥልቀት ያስተምራል።',
    learningOutcomesAm: [
      'የማንኛውንም ፈንክሽን Domain እና Range በትክክል ማስላት (Square root, Denominator, Logarithm ገደቦችን በመፈተሽ)።',
      'አንድ ፈንክሽን One-to-One ($f(x_1)=f(x_2) \\implies x_1=x_2$) እና Onto መሆኑን በማረጋገጥ Inverse $f^{-1}(x)$ን ማግኘት።',
      'Rational Root Theorem እና Factor Theoremን በመጠቀም ከፍተኛ ደረጃ ያላቸውን ፖሊኖሚያሎች መበተን።',
      'የRational Function Vertical, Horizontal, Oblique Asymptotes እና Holesን በመለየት ግራፉን መሳል።',
      'የExponential, Logarithmic, Trigonometric እና Hyperbolic identitiesን በመጠቀም እኩልታዎችን መፍታት።',
    ],
    sectionsAm: [
      {
        headingAm: '3.1 ግንኙነቶች፣ ፈንክሽኖች፣ Bijection እና ተገላቢጦሽ (Inverse)',
        contentAm: `### 3.1.1 Domain እና Range የመፈለጊያ ወርቃማ ሕጎች
- **ክፍልፋይ $\\frac{A}{B}$**: $B \\neq 0$ መሆን አለበት።
- **ጥንድ ሥር $\\sqrt[2n]{A}$**: $A \\ge 0$ መሆን አለበት።
- **ሎጋሪዝም $\\log_b(A)$**: $A > 0$ (ጥብቅ ግዴታ!)፣ $b > 0$ እና $b \\neq 1$።

### 3.1.2 የፈንክሽን ዓይነቶች እና Inverse ($f^{-1}$)
- **One-to-One (Injective)**: $f(x_1) = f(x_2) \\implies x_1 = x_2$ (በግራፍ Horizontal Line Test ማለፍ)።
- **Onto (Surjective)**: $\\text{Range}(f) = \\text{Codomain}$።
- **Bijective**: Injective + Surjective። አንድ ፈንክሽን Inverse $f^{-1}$ የሚኖረው **Bijective ሲሆን ብቻ** ነው!
- **Composite Function**: $(f \\circ g)(x) = f(g(x))$። $\\text{Domain}(f \\circ g) = \\{x \\in \\text{Dom}(g) : g(x) \\in \\text{Dom}(f)\\}$።`,
      },
      {
        headingAm: '3.2 ፖሊኖሚያሎች እና ራሽናል ፈንክሽኖች (Asymptotes & Root Theorems)',
        contentAm: `### 3.2.1 የፖሊኖሚያል ቲዎረሞች
- **Remainder Theorem**: $P(x)$ በ $(x - c)$ ሲካፈል ቀሪው $P(c)$ ነው።
- **Factor Theorem**: $(x - c)$ የ $P(x)$ Factor የሚሆነው $P(c) = 0$ ከሆነ ብቻ ነው።
- **Rational Root Theorem**: ለ $P(x) = a_n x^n + \\dots + a_0$ ሊሆኑ የሚችሉ ራሽናል ሥሮች $\\pm\\frac{\\text{factors of } a_0}{\\text{factors of } a_n}$ ናቸው።

### 3.2.2 Rational Functions $f(x) = \\frac{P(x)}{Q(x)}$ እና Asymptotes
መጀመሪያ $P(x)$ እና $Q(x)$ን Factor በማድረግ የጋራ Factor ካለ አጥፉ!
1. **Hole (Removable Discontinuity)**፡ $(x - a)$ ከላይም ከታችም ከተሰረዘ በ $x = a$ ላይ Hole አለ።
2. **Vertical Asymptote (VA)**፡ ከተሰረዘ በኋላ $Q(x) = 0$ የሚያደርጉ ዋጋዎች $x = c$ VA ናቸው።
3. **Horizontal / Oblique Asymptote** (ደረጃ $n = \\deg P$, $m = \\deg Q$)፡
   - $n < m \\implies y = 0$ (HA)
   - $n = m \\implies y = \\frac{a_n}{b_m}$ (HA — የLeading coefficients ክፍፍል)
   - $n = m + 1 \\implies$ Oblique (Slant) Asymptote (በLong Division የሚገኘው Quotient $y = mx+b$)።`,
      },
      {
        headingAm: '3.3 ኤክስፖኔንሻል፣ ሎጋሪዝም፣ ትሪጎኖሜትሪክ እና ሃይፐርቦሊክ ፈንክሽኖች',
        contentAm: `### 3.3.1 Exponential & Logarithmic
- $y = b^x \\iff x = \\log_b y$ ($b>0, b\\neq 1, y>0$)።
- $\\ln(xy) = \\ln x + \\ln y$, $\\ln(x/y) = \\ln x - \\ln y$, $\\ln(x^k) = k\\ln x$, Change of base: $\\log_b x = \\frac{\\ln x}{\\ln b}$።

### 3.3.2 Hyperbolic Functions
- $\\sinh x = \\frac{e^x - e^{-x}}{2}$ (Odd, Domain $\\mathbb{R}$, Range $\\mathbb{R}$)
- $\\cosh x = \\frac{e^x + e^{-x}}{2}$ (Even, Domain $\\mathbb{R}$, Range $[1, \\infty)$)
- **ዋና ሕግ (Osborn\'s Rule)**፡ $\\cosh^2 x - \\sinh^2 x = 1$ እና $1 - \\tanh^2 x = \\operatorname{sech}^2 x$።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የ $f(x) = \\frac{x^2 - 4}{x^2 - x - 6}$ ፈንክሽንን Hole፣ Vertical Asymptote እና Horizontal Asymptote ፈልጉ።',
        stepsAm: [
          'ደረጃ 1፡ Factor አድርግ፡ $f(x) = \\frac{(x-2)(x+2)}{(x-3)(x+2)}$።',
          'ደረጃ 2፡ $(x+2)$ ከላይና ከታች ስለሚሰረዝ በ $x = -2$ ላይ **Hole** አለ (ቦታው $(-2, \\frac{-2-2}{-2-3}) = (-2, 4/5)$)።',
          'ደረጃ 3፡ ከተቃለለ በኋላ $f(x) = \\frac{x-2}{x-3}$ ($x \\neq -2$) ስለሆነ በ $x = 3$ ላይ **Vertical Asymptote** አለ።',
          'ደረጃ 4፡ የላይና የታች ደረጃ እኩል ($n=m=2$) ስለሆነ **Horizontal Asymptote** $y = \\frac{1}{1} = 1$ ነው።',
        ],
        tipAm: 'Factor ሳያደርጉ $x = -2$ን Vertical Asymptote ብሎ መጻፍ በፈተና ላይ ቁጥር አንድ ስህተት ነው!',
      },
    ],
    glossaryAm: [
      { termEn: 'Bijective', termAm: 'ባይጄክቲቭ', definitionAm: 'በአንድ ጊዜ 1-to-1 (Injective) እና Onto (Surjective) የሆነ ፈንክሽን።' },
      { termEn: 'Asymptote', termAm: 'አሲምፕቶት', definitionAm: 'የፈንክሽኑ ግራፍ ወደ ኢንፊኒቲ ሲሄድ የሚጠጋው ግን የማይነካው ቀጥታ መስመር።' },
      { termEn: 'Hyperbolic Cosine', termAm: 'ሃይፐርቦሊክ ኮሳይን (cosh x)', definitionAm: '$\\frac{e^x+e^{-x}}{2}$ ሲሆን ዝቅተኛ ዋጋው 1 ነው።' },
    ],
    examTrapsAm: [
      '$\\log(x+y) \\neq \\log x + \\log y$! በፍጹም አትበትኑት።',
      'የ $f(x) = \\sin x$ Inverse $\\arcsin x$ የሚኖረው Domain ወደ $[-\\pi/2, \\pi/2]$ ሲገደብ ብቻ ነው።',
      'Holeን እንደ Vertical Asymptote አትቁጠሩ፤ መጀመሪያ የጋራ Factorsን አቃልሉ።',
    ],
    keyTakeawaysAm: [
      'Inverse ለማግኘት $x$ እና $y$ን ቀይሮ ለ $y$ መፍታት እና $\\text{Dom}(f^{-1}) = \\text{Range}(f)$ መሆኑን ማስታወስ።',
      'የRational Function Asymptote ትንተና ሁልጊዜ ከSimplification (Factoring) ይጀምራል።',
      '$\\cosh^2 x - \\sinh^2 x = 1$ ከ $\\cos^2 x + \\sin^2 x = 1$ በመካከለኛው ምልክት ይለያል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ የ $f(x) = \\ln(4 - x^2)$ Domain ማን ነው?',
        answerAm: 'መልስ፡ $4 - x^2 > 0 \\implies x^2 < 4 \\implies (-2, 2)$ (ክፍት ክፍተት፣ $-2$ እና $2$ አይገቡም)።',
      },
    ],
  },

  'mathnat-ch4': {
    subject: 'mathematics',
    chapterNumber: 4,
    titleAm: 'ምዕራፍ 4፡ አናሊቲክ ጂኦሜትሪ (Analytic Geometry & Conic Sections)',
    briefOverviewAm: 'የርቀትና Section ቀመር፣ ቀጥታ መስመሮች፣ ክብ (Circle)፣ ፓራቦላ (Parabola)፣ ኤሊፕስ (Ellipse)፣ ሃይፐርቦላ (Hyperbola) እና የAxises Rotationን ያስተምራል።',
    briefPointsAm: [
      'ከነጥብ (x₀, y₀) እስከ መስመር Ax+By+C=0 ያለው ርቀት፡ d = |Ax₀+By₀+C| / √(A²+B²)።',
      'ፓራቦላ፡ e = 1፤ ኤሊፕስ፡ 0 ≤ e < 1 (c² = a² − b²)፤ ሃይፐርቦላ፡ e > 1 (c² = a² + b²)።',
      'ክብ (x−h)² + (y−k)² = r²፤ General form x²+y²+Dx+Ey+F=0 ላይ D²+E²−4F > 0 መሆን አለበት።',
      'Discriminant B² − 4AC፡ < 0 (Ellipse/Circle)፣ = 0 (Parabola)፣ > 0 (Hyperbola)።',
    ],
    examTipAm: 'በEllipse ውስጥ a ሁልጊዜ ትልቁ ዋጋ ነው (c² = a² − b²)፤ በHyperbola ውስጥ ግን a በአዎንታዊው ክፍል ስር ያለው ነው (c² = a² + b²) — ሁልጊዜ ትልቁ አይደለም!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የ2D ጂኦሜትሪን በአልጀብራ እኩልታዎች የሚገልጸውን አናሊቲክ ጂኦሜትሪ (Analytic Geometry) እና አራቱን የኮኒክ ክፍሎች (Conic Sections: Circle, Parabola, Ellipse, Hyperbola) በዝርዝር ያቀርባል። የSection Formula፣ ከነጥብ እስከ መስመር ያለ ርቀት፣ የሁሉም ኮኒኮች Center/Vertex/Focus/Directrix/Eccentricity/Asymptotes አፈላለግ፣ እንዲሁም General Second-Degree Equation ($Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$) የያዘውን $Bxy$ ቃል በAxis Rotation ($\cot 2\\theta = \\frac{A-C}{B}$) ማጥፋትን በተሟላ ሁኔታ ያስተምራል።',
    learningOutcomesAm: [
      'Distance Formula፣ Internal/External Division Formula እና Point-to-Line Distanceን በትክክል መጠቀም።',
      'ማንኛውንም የሁለተኛ ደረጃ እኩልታ Completing the Square በማድረግ ወደ Standard Conic ቅርጽ መቀየር።',
      'የParabola, Ellipse እና Hyperbola ቁልፍ ነጥቦችን (Vertices, Foci, Latus Rectum, Directrices, Eccentricity) ማስላት።',
      '$B^2 - 4AC$ Discriminant በመጠቀም ማንኛውንም ኮኒክ ወዲያውኑ መለየት እና Rotation of Axes መስራት።',
    ],
    sectionsAm: [
      {
        headingAm: '4.1 ርቀት፣ ቀጥታ መስመር እና ክብ (Lines & Circles)',
        contentAm: `### 4.1.1 መስመሮች እና ርቀቶች
- **ርቀት**: $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$
- **Section Formula** ($P$ መስመር $AB$ን በ $m:n$ ሲከፍል): $\\left(\\frac{mx_2+nx_1}{m+n}, \\frac{my_2+ny_1}{m+n}\\right)$
- **ከነጥብ እስከ መስመር ርቀት**: $d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}$
- **ትይዩ መስመሮች**: $m_1 = m_2$፤ **ቀጥ ያሉ (Perpendicular)**: $m_1 m_2 = -1$።

### 4.1.2 ክብ (Circle)
- Standard Form: $(x-h)^2 + (y-k)^2 = r^2$ (Center $(h,k)$, Radius $r$)
- General Form: $x^2 + y^2 + Dx + Ey + F = 0 \\implies$ Center $(-D/2, -E/2)$, $r = \\frac{1}{2}\\sqrt{D^2 + E^2 - 4F}$።`,
      },
      {
        headingAm: '4.2 ፓራቦላ፣ ኤሊፕስ፣ ሃይፐርቦላ እና Rotation of Axes',
        contentAm: `### 4.2.1 የኮኒክ ክፍሎች ማነጻጸሪያ ሰንጠረዥ

| ኮኒክ (Conic) | Eccentricity ($e$) | Standard Equation (Center/Vertex $(h,k)$) | ቁልፍ ግንኙነት |
| :--- | :--- | :--- | :--- |
| **Parabola** | $e = 1$ | $(x-h)^2 = 4p(y-k)$ (Vertical) / $(y-k)^2 = 4p(x-h)$ (Horiz.) | Latus Rectum $= |4p|$ |
| **Ellipse** | $0 < e < 1$ | $\\frac{(x-h)^2}{a^2} + \\frac{(y-k)^2}{b^2} = 1$ ($a>b$) | $c^2 = a^2 - b^2$, $e = c/a$ |
| **Hyperbola** | $e > 1$ | $\\frac{(x-h)^2}{a^2} - \\frac{(y-k)^2}{b^2} = 1$ (Horiz.) | $c^2 = a^2 + b^2$, Asymptotes: $y-k = \\pm\\frac{b}{a}(x-h)$ |

### 4.2.2 Discriminant እና Rotation of Axes
ለ $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$:
- $B^2 - 4AC < 0 \\implies$ Ellipse (ወይም $B=0, A=C$ ከሆነ Circle)
- $B^2 - 4AC = 0 \\implies$ Parabola
- $B^2 - 4AC > 0 \\implies$ Hyperbola
- የ $xy$ ቃልን ለማጥፋት የሚዞርበት አንግል፡ $\\cot(2\\theta) = \\frac{A - C}{B}$።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የ $9x^2 - 4y^2 - 36x + 8y - 4 = 0$ ኮኒክን ዓይነት፣ Center፣ Vertices፣ Foci እና Asymptotes ፈልጉ።',
        stepsAm: [
          'ደረጃ 1፡ $x$ እና $y$ን ሰብስብ፡ $9(x^2 - 4x) - 4(y^2 - 2y) = 4$።',
          'ደረጃ 2፡ Complete the Square፡ $9(x-2)^2 - 4(y-1)^2 = 4 + 36 - 4 = 36$።',
          'ደረጃ 3፡ በ36 አካፍል፡ $\\frac{(x-2)^2}{4} - \\frac{(y-1)^2}{9} = 1$ — **Horizontal Hyperbola** ነው!',
          'ደረጃ 4፡ Center $(2, 1)$, $a=2, b=3$, $c = \\sqrt{4+9} = \\sqrt{13}$።',
          'ደረጃ 5፡ Vertices: $(2\\pm 2, 1) = (4,1), (0,1)$፤ Foci: $(2\\pm\\sqrt{13}, 1)$፤ Asymptotes: $y-1 = \\pm\\frac{3}{2}(x-2)$።',
        ],
        tipAm: 'በ $y$ ፊት አሉታዊ ምልክት ሲወጣ $-4(y^2 - 2y + 1)$ ስትጨምሩ በቀኝ በኩል $-4$ መቀነስ እንዳለባችሁ አትርሱ!',
      },
    ],
    glossaryAm: [
      { termEn: 'Eccentricity', termAm: 'ኤክሰንትሪሲቲ ($e$)', definitionAm: 'የኮኒክን ቅርጽ የሚለካ ሬሾ ($e = c/a$)። $e=0$ ክብ፣ $0<e<1$ ኤሊፕስ፣ $e=1$ ፓራቦላ፣ $e>1$ ሃይፐርቦላ።' },
      { termEn: 'Latus Rectum', termAm: 'ላተስ ሬክተም', definitionAm: 'በFocus ውስጥ የሚያልፍና ለዋናው ዘንግ ቀጥ ያለ የኮኒኩ ገመድ (በEllipse/Hyperbola ርዝመቱ $2b^2/a$)።' },
    ],
    examTrapsAm: [
      'ለትይዩ መስመሮች ርቀት $Ax+By+C_1=0$ እና $Ax+By+C_2=0$ መጀመሪያ የ $A$ እና $B$ ቅድመ-ቁጥሮች እኩል መሆናቸውን አረጋግጡ!',
      'በHyperbola ላይ Asymptotes $y-k = \\pm\\frac{b}{a}(x-h)$ የሚሆነው $x$ አዎንታዊ ሲሆን ነው፤ $y$ አዎንታዊ ከሆነ $\\pm\\frac{a}{b}$ ይሆናል!',
    ],
    keyTakeawaysAm: [
      'Completing the Square ለሁሉም የኮኒክ እኩልታዎች ቁልፍ መሳሪያ ነው።',
      'የRotation አንግል $B^2 - 4AC$ን አይለውጠውም (Invariant under rotation)።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ $x^2 + 4xy + y^2 - 10 = 0$ ምን ዓይነት ኮኒክ ነው?',
        answerAm: 'መልስ፡ $A=1, B=4, C=1 \\implies B^2 - 4AC = 16 - 4 = 12 > 0$ ስለሆነ **Hyperbola** ነው።',
      },
    ],
  },
};
