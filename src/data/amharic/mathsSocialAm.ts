import type { AmharicChapterNote } from './types';

export const MATHS_SOCIAL_AM_NOTES: Record<string, AmharicChapterNote> = {
  'msco-mod-ch1': {
    subject: 'math_social',
    chapterNumber: 1,
    titleAm: 'ምዕራፍ 1፡ የፕሮፖዚሽናል ሎጂክ እና የስብስብ ቲዎሪ ለማህበራዊ ሳይንስ',
    briefOverviewAm: 'ለማህበራዊ ሳይንስ ተማሪዎች ፕሮፖዚሽኖች፣ የእውነት ሰንጠረዥ፣ ኳንቲፋየሮች፣ የክርክር ትክክለኛነት፣ ስህተቶች (Fallacies) እና የስብስብ ስሌቶችን ያስረዳል።',
    briefPointsAm: [
      'ፕሮፖዚሽን እውነት (T) ወይም ሐሰት (F) ሊሆን የሚችል መግለጫ ነው፤ ጥያቄና ትዕዛዝ ፕሮፖዚሽን አይደሉም።',
      'p ⇒ q ሐሰት የሚሆነው p=T እና q=F ሲሆን ብቻ ነው፤ አሉታው p ∧ ¬q ነው።',
      'የክርክር ትክክለኛነት (Validity)፡ ሁሉም መነሻዎች እውነት ሲሆኑ መደምደሚያውም እውነት መሆን አለበት።',
      'Inclusion-Exclusion፡ n(A∪B) = n(A) + n(B) − n(A∩B)።',
    ],
    examTipAm: 'በፈተና ላይ "p unless q" ማለት "¬q ⇒ p" (ወይም p ∨ q) መሆኑን አስታውሱ!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የማህበራዊ ሳይንስ ሒሳብ (Mathematics for Social Sciences) መጀመሪያ ሲሆን፣ ተማሪዎች በሎጂክ፣ በክርክር ግምገማ እና በስብስብ መረጃ ትንተና ላይ ጠንካራ መሰረት እንዲይዙ ያዘጋጃል። የፕሮፖዚሽኖችን ባህሪ፣ የ5ቱን አገናኞች የእውነት ሰንጠረዥ፣ De Morgan\'s Laws፣ Universal እና Existential Quantifiersን፣ ዘጠኙን የኢንፈረንስ ሕጎችና ዋና የሎጂክ ስህተቶችን (Fallacies)፣ እንዲሁም የስብስብ ስሌቶችንና የዳሰሳ ጥናት የቬን ዲያግራም ችግሮችን በስፋት ያስተምራል።',
    learningOutcomesAm: [
      'ፕሮፖዚሽኖችንና ውህድ ፕሮፖዚሽኖችን መለየትና የእውነት ሰንጠረዥ መስራት።',
      'Converse, Inverse እና Contrapositiveን ከዋናው Implication መለየት።',
      'የኳንቲፋየሮችን (∀, ∃) አሉታ በትክክል መጻፍ።',
      'በTruth Table እና በRules of Inference የክርክሮችን ትክክለኛነት (Valid vs Invalid) መለየት።',
      'የ2 እና 3 ስብስቦችን የቬን ዲያግራምና የመቁጠር ስሌቶችን (Word Problems) መፍታት።',
    ],
    sectionsAm: [
      {
        headingAm: '1.1 ፕሮፖዚሽናል ሎጂክ እና አቻነት ሕጎች',
        contentAm: `### 1.1.1 ፕሮፖዚሽን እና የሎጂክ አገናኞች
- **ፕሮፖዚሽን** ማለት እውነት ($T$) ወይም ሐሰት ($F$) ሊባል የሚችል መግለጫ ዓረፍተ ነገር ነው። (ለምሳሌ *"አዲስ አበባ የኢትዮጵያ ዋና ከተማ ናት"* $= T$፤ *"$x+2=5$"* ግን ክፍት ዓረፍተ ነገር ስለሆነ ፕሮፖዚሽን አይደለም)።
- **አምስቱ አገናኞች**: $\\neg p$ (Not), $p \\land q$ (And), $p \\lor q$ (Or), $p \\Rightarrow q$ (If...then), $p \\Leftrightarrow q$ (If and only if)።
- **ቁልፍ ሕግ**: $p \\Rightarrow q \\equiv \\neg p \\lor q \\equiv \\neg q \\Rightarrow \\neg p$ (Contrapositive)።
- **De Morgan\'s Laws**: $\\neg(p \\land q) \\equiv \\neg p \\lor \\neg q$ እና $\\neg(p \\lor q) \\equiv \\neg p \\land \\neg q$።`,
      },
      {
        headingAm: '1.2 ኳንቲፋየሮች፣ የክርክር ትክክለኛነት እና የስብስብ ቲዎሪ',
        contentAm: `### 1.2.1 Quantifiers እና Formal Proofs
- $\\neg(\\forall x \\, P(x)) \\equiv \\exists x \\, \\neg P(x)$ እና $\\neg(\\exists x \\, P(x)) \\equiv \\forall x \\, \\neg P(x)$።
- **ትክክለኛ ኢንፈረንስ ሕጎች**: Modus Ponens ($p\\to q, p \\vdash q$), Modus Tollens ($p\\to q, \\neg q \\vdash \\neg p$), Hypothetical Syllogism ($p\\to q, q\\to r \\vdash p\\to r$), Disjunctive Syllogism ($p\\lor q, \\neg p \\vdash q$)።
- **ስህተቶች (Fallacies)**: $p\\to q, q \\vdash p$ (Affirming the Consequent) እና $p\\to q, \\neg p \\vdash \\neg q$ (Denying the Antecedent) ሁልጊዜ **Invalid** ናቸው!

### 1.2.2 የስብስብ ቲዎሪ (Set Theory)
- $n(A) = k$ ከሆነ **Power Set** $n(\\mathcal{P}(A)) = 2^k$፤ Proper Subsets $= 2^k - 1$።
- **Symmetric Difference**: $A \\Delta B = (A - B) \\cup (B - A)$።
- **Inclusion-Exclusion**: $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የሚከተለው ክርክር Valid ወይስ Invalid ነው? "ዝናብ ከዘነበ ጎዳናው እርጥብ ነው። ጎዳናው እርጥብ ነው። ስለዚህ ዝናብ ዘንቧል።"',
        stepsAm: [
          'ደረጃ 1፡ $p$ = "ዝናብ ዘነበ", $q$ = "ጎዳናው እርጥብ ነው" እንበል።',
          'ደረጃ 2፡ መነሻ 1: $p \\to q$፣ መነሻ 2: $q$፣ መደምደሚያ: $p$።',
          'ደረጃ 3፡ ይህ **Fallacy of Affirming the Consequent** ነው (ምክንያቱም ጎዳናው በውሃ ቱቦ መፍሰስም እርጥብ ሊሆን ይችላል፣ $p=F, q=T$)።',
          'መደምደሚያ፡ ክርክሩ **Invalid** ነው!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Valid Argument', termAm: 'ትክክለኛ ክርክር', definitionAm: 'ሁሉም መነሻዎች እውነት በሚሆኑበት ጊዜ መደምደሚያውም የግድ እውነት የሚሆንበት ክርክር።' },
      { termEn: 'Disjoint Sets', termAm: 'የማይገናኙ ስብስቦች', definitionAm: 'የጋራ አባል የሌላቸው ($A \\cap B = \\emptyset$) ሁለት ስብስቦች።' },
    ],
    examTrapsAm: [
      'እውነት ያልሆኑ መነሻዎች ያሉት ክርክር እንኳን Valid ሊሆን ይችላል — Validity የቅርጽ (Structure) ጉዳይ እንጂ የእውነታ አይደለም!',
      '$\\{1, 2\\} = \\{2, 1, 1\\}$ እውነት ነው፤ በስብስብ ውስጥ ቅደም ተከተልና ድግግሞሽ ለውጥ አያመጡም።',
    ],
    keyTakeawaysAm: [
      'Contrapositive ሁልጊዜ ከዋናው Implication ጋር እኩል ነው።',
      'De Morgan\'s ሕጎች በሎጂክም ($\\neg(p\\land q)$) በስብስብም ($(A\\cap B)\'=A\'\\cup B\'$) አንድ ዓይነት ናቸው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ የ "All students pass or some drop out" አሉታ ምንድን ነው?',
        answerAm: 'መልስ፡ በDe Morgan + Quantifier Negation፡ "Some students fail AND all do not drop out (none drop out)"።',
      },
    ],
  },

  'msco-mod-ch2': {
    subject: 'math_social',
    chapterNumber: 2,
    titleAm: 'ምዕራፍ 2፡ ፈንክሽኖች፣ እኩልታዎች እና ኢንኢኳሊቲዎች (Functions & Inequalities)',
    briefOverviewAm: 'ሪል ቁጥሮች፣ የ1ኛ/2ኛ ደረጃ እኩልታዎችና Sign Chart፣ ፈንክሽኖች፣ ፖሊኖሚያል/ራሽናል/ኤክስፖኔንሻል/ሎጋሪዝም/ትሪጎኖሜትሪክ ፈንክሽኖችን ያስተምራል።',
    briefPointsAm: [
      'Quadratic Inequality (x−a)(x−b) > 0 ለመፍታት Critical points አግኝቶ Sign Chart መስራት።',
      'Absolute Value፡ |x| < a ⇔ −a < x < a፤ |x| > a ⇔ x < −a ወይም x > a።',
      'ፈንክሽን Invertible የሚሆነው One-to-One (Injective) እና Onto (Surjective) ሲሆን ነው።',
      'ለRational Function f(x) = P(x)/Q(x)፣ Vertical Asymptote Q(x)=0 (ካልተሰረዘ በኋላ) ላይ ነው።',
    ],
    examTipAm: 'ለኢኮኖሚክስና ቢዝነስ ትንተና Break-Even Point የሚገኘው Revenue R(x) = Cost C(x) ሲሆን ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የማህበራዊ ሳይንስ፣ ኢኮኖሚክስ እና ማኔጅመንት ተማሪዎች የሚጠቀሙባቸውን ፈንክሽኖች እና እኩልታዎች በሙሉ በጥልቀት ያቀርባል። Linear እና Quadratic እኩልታዎች (Discriminant $b^2-4ac$)፣ Sign Chart በመጠቀም Rational Inequalities መፍታት፣ Relations & Functions (Domain, Range, 1-to-1, Onto, Inverse, Composite)፣ Remainder/Factor Theorems፣ Rational Asymptotes፣ እንዲሁም የCompound Interest መሰረት የሆኑትን Exponential, Logarithmic እና Trigonometric ፈንክሽኖችን ያብራራል።',
    learningOutcomesAm: [
      'Absolute Value እና Quadratic/Rational Inequalitiesን በSign Chart መፍታት።',
      'የማንኛውንም ፈንክሽን Domain, Range, Inverse እና Composition ማስላት።',
      'የRational Function Holes, Vertical/Horizontal/Oblique Asymptotesን መለየት።',
      'Exponential እና Logarithmic እኩልታዎችን (Compound Interestን ጨምሮ) መፍታት።',
    ],
    sectionsAm: [
      {
        headingAm: '2.1 እኩልታዎች፣ ኢንኢኳሊቲዎች እና ፈንክሽኖች',
        contentAm: `### 2.1.1 Quadratic Discriminant እና Sign Chart
ለ $ax^2 + bx + c = 0$: $\\Delta = b^2 - 4ac$።
- $\\Delta > 0$: 2 የተለያዩ ሪል ሥሮች፤ $\\Delta = 0$: 1 ተደጋጋሚ ሥር፤ $\\Delta < 0$: ሪል ሥር የለም።
- **Inequality ሕግ**: አሉታዊ ቁጥር ስታባዙ/ስታካፍሉ የInequality ምልክቱ ($< \\leftrightarrow >$) ይገለበጣል! Rational inequalityን በ $x$ **በፍጹም cross-multiply አታድርጉ** (ምልክቱ + ወይም − መሆኑ ስለማይታወቅ ወደ አንድ ጎን አምጥቶ Sign Chart መስራት ግዴታ ነው!)።

### 2.1.2 ፈንክሽኖች እና Inverse
- $f$ Injective (1-to-1) $\\iff f(a)=f(b) \\implies a=b$።
- Inverse $f^{-1}$ ለማግኘት: (1) $y = f(x)$ ጻፍ፣ (2) ለ $x$ ፍታ፣ (3) $x$ እና $y$ን ቀያይር።`,
      },
      {
        headingAm: '2.2 ፖሊኖሚያል፣ ራሽናል፣ ኤክስፖኔንሻል እና ሎጋሪዝም ፈንክሽኖች',
        contentAm: `### 2.2.1 Asymptotes
- $f(x) = \\frac{P(x)}{Q(x)}$ (ከተቃለለ በኋላ)፡ $\\deg P < \\deg Q \\implies y=0$ (HA)፤ $\\deg P = \\deg Q \\implies y = \\frac{a_n}{b_m}$ (HA)፤ $\\deg P = \\deg Q + 1 \\implies$ Oblique Asymptote።

### 2.2.2 Exponential & Logarithmic (Compound Interest)
- Compound Interest: $A = P\\left(1 + \\frac{r}{n}\\right)^{nt}$ (Continuous: $A = Pe^{rt}$).
- $\\log_b(MN) = \\log_b M + \\log_b N$, $\\log_b(M^k) = k\\log_b M$።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የ $\\frac{x - 1}{x + 2} \\ge 0$ ኢንኢኳሊቲን በSign Chart ፍቱ።',
        stepsAm: [
          'ደረጃ 1፡ Critical points፡ $x - 1 = 0 \\implies x = 1$ (Closed dot)፣ $x + 2 = 0 \\implies x = -2$ (Denominator ስለሆነ Open dot — አይካተትም!)።',
          'ደረጃ 2፡ 3 ክፍተቶችን ፈትሽ: $(-\\infty, -2)$ ላይ $(-)/(-)=+$; $(-2, 1)$ ላይ $(-)/(+)=-$; $(1, \\infty)$ ላይ $(+)/(+)=+$።',
          'መልስ፡ $(-\\infty, -2) \\cup [1, \\infty)$።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Sign Chart', termAm: 'ሳይን ቻርት', definitionAm: 'የፖሊኖሚያል ወይም ራሽናል አገላለጽን ምልክት (+/−) በክፍተቶች የመመርመሪያ ሰንጠረዥ።' },
      { termEn: 'Domain', termAm: 'ዶሜይን', definitionAm: 'ፈንክሽኑ ትክክለኛ ውጤት የሚሰጥባቸው የ $x$ ዋጋዎች ስብስብ።' },
    ],
    examTrapsAm: [
      'Rational Inequality ላይ Denominatorን ወደ ዜሮ አባዝታችሁ አታጥፉ — የDenominator ሥር በSolution Set ውስጥ በፍጹም አይገባም (Open bracket)!',
      'የ $\\log_2(x-3)$ Domain $x \\ge 3$ ሳይሆን $x > 3$ ነው ($\log(0)$ የለም!)።',
    ],
    keyTakeawaysAm: [
      'ሁልጊዜ Rational Inequalityን ወደ $\\frac{N(x)}{D(x)} \\ge 0$ ቅርጽ አምጥቶ Sign Chart መስራት።',
      'Composite function $(f\\circ g)(x) = f(g(x))$ ከውስጥ ወደ ውጭ ይሰራል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ $f(x) = \\frac{2x+1}{x-3}$ ከሆነ $f^{-1}(x)$ ማን ነው?',
        answerAm: 'መልስ፡ $y(x-3) = 2x+1 \\implies x(y-2) = 3y+1 \\implies f^{-1}(x) = \\frac{3x+1}{x-2}$ ($x \\neq 2$)።',
      },
    ],
  },

  'msco-mod-ch3': {
    subject: 'math_social',
    chapterNumber: 3,
    titleAm: 'ምዕራፍ 3፡ ማትሪክስ፣ ዲተርሚናንት እና ሊኒየር እኩልታዎች',
    briefOverviewAm: 'የማትሪክስ አልጀብራ፣ Elementary Row Operations፣ Rank፣ Inverse፣ Determinant፣ Gaussian Elimination እና Cramer\'s Ruleን ያስተምራል።',
    briefPointsAm: [
      'ማትሪክስ A (m×n) እና B (n×p) ሲባዙ ውጤቱ (m×p) ነው።',
      'Row Operations (RREF) በመጠቀም የማትሪክስ Inverse እና የAx=b መፍትሄን ማግኘት ይቻላል።',
      'Cramer\'s Rule፡ det(A) ≠ 0 ሲሆን x_i = det(A_i) / det(A)።',
      'Rank(A) = Rank([A|b]) = n ከሆነ Unique Solution አለ።',
    ],
    examTipAm: 'ለ 2×2 ማትሪክስ [[a, b], [c, d]] ፈጣን Inverse፡ (1/(ad−bc)) [[d, −b], [−c, a]] — ዋና Diagonal ቦታ ይቀያየራል፣ ሌላው በ −1 ይባዛል!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የሊኒየር እኩልታዎችን ሥርዓት (Systems of Linear Equations) በማትሪክስና በዲተርሚናንት የመፍታት ዘዴዎችን በዝርዝር ያቀርባል። በኢኮኖሚክስና በማህበራዊ ሳይንስ (Input-Output Models, Market Equilibrium) ሰፊ ጥቅም ያላቸውን የማትሪክስ ዓይነቶች (Identity, Diagonal, Triangular, Symmetric)፣ Elementary Row Operations፣ REF እና RREF፣ Rank፣ Cofactor Expansion፣ Adjoint Inverse፣ Gaussian Elimination እና Cramer\'s Ruleን ከሙሉ ምሳሌዎች ጋር ያስተምራል።',
    learningOutcomesAm: [
      'የማትሪክሶችን መደመር፣ Scalar ማባዛት እና ማትሪክስ ማባዛት (Dimension check ጨምሮ) መስራት።',
      'በEROs ወደ REF/RREF ቀይሮ የማትሪክስ Rank እና Inverse ማግኘት።',
      'የ 2×2 እና 3×3 ማትሪክሶችን Determinant በSarrus ወይም Cofactor Expansion ማስላት።',
      'Gaussian Elimination እና Cramer\'s Ruleን በመጠቀም የ3 ተለዋዋጭ ሥርዓቶችን መፍታት።',
    ],
    sectionsAm: [
      {
        headingAm: '3.1 ማትሪክስ አልጀብራ፣ Row Operations እና Rank',
        contentAm: `### 3.1.1 የማትሪክስ ቅድመ-ሁኔታዎች
- **ማባዛት ($AB$)**: የ $A$ ዓምዶች ብዛት ከ $B$ ረድፎች ብዛት ጋር እኩል መሆን አለበት ($m\\times \\mathbf{n}$ እና $\\mathbf{n}\\times p \\to m\\times p$)።
- **ሦስቱ EROs**: (1) ሁለት ረድፎችን መቀያየር ($R_i \\leftrightarrow R_j$)፣ (2) ረድፍን ዜሮ ባልሆነ ቁጥር ማባዛት ($kR_i$)፣ (3) የአንዱን ረድፍ ብዜት በሌላው ላይ መደመር ($R_i + kR_j$)።
- **Rank**: በREF/RREF ውስጥ ዜሮ ያልሆኑ ረድፎች (Pivot ረድፎች) ብዛት ነው።`,
      },
      {
        headingAm: '3.2 ዲተርሚናንት፣ Inverse እና የሊኒየር ሥርዓት መፍቻዎች',
        contentAm: `### 3.2.1 2×2 እና 3×3 Inverse & Cramer\'s Rule
- ለ 2×2 $A = \\begin{pmatrix}a & b\\\\c & d\\end{pmatrix}$: $\\det(A) = ad - bc$ እና $A^{-1} = \\frac{1}{ad-bc}\\begin{pmatrix}d & -b\\\\-c & a\\end{pmatrix}$።
- ለ 3×3: **Cofactor** $C_{ij} = (-1)^{i+j}M_{ij}$፣ **Adjoint** $\\operatorname{adj}(A) = [C_{ij}]^T$፣ እና $A^{-1} = \\frac{1}{\\det A}\\operatorname{adj}(A)$።
- **Cramer\'s Rule**: $\\det(A) \\neq 0$ ሲሆን ብቸኛው መፍትሄ $x = \\frac{D_x}{D}, y = \\frac{D_y}{D}, z = \\frac{D_z}{D}$ ነው።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'በCramer\'s Rule $2x + 3y = 8$ እና $x - 2y = -3$ን ፍቱ።',
        stepsAm: [
          'ደረጃ 1፡ $D = \\begin{vmatrix}2 & 3\\\\1 & -2\\end{vmatrix} = (2)(-2) - (3)(1) = -4 - 3 = -7$።',
          'ደረጃ 2፡ $D_x = \\begin{vmatrix}8 & 3\\\\-3 & -2\\end{vmatrix} = -16 - (-9) = -7 \\implies x = \\frac{-7}{-7} = \\mathbf{1}$።',
          'ደረጃ 3፡ $D_y = \\begin{vmatrix}2 & 8\\\\1 & -3\\end{vmatrix} = -6 - 8 = -14 \\implies y = \\frac{-14}{-7} = \\mathbf{2}$።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Determinant', termAm: 'ዲተርሚናንት', definitionAm: 'ለSquare Matrix የሚሰላ ቁጥር፤ 0 ከሆነ ማትሪክሱ Invertible አይደለም።' },
      { termEn: 'Adjoint', termAm: 'አድጆይንት', definitionAm: 'የCofactor ማትሪክስ Transpose ($\operatorname{adj}(A) = C^T$)።' },
    ],
    examTrapsAm: [
      'Adjoint ስትሰሩ የCofactor ማትሪክስን **Transpose ማድረግ** እንዳትረሱ!',
      'Cramer\'s Rule የሚሰራው Square ሥርዓት ላይ እና $\\det(A) \\neq 0$ ሲሆን ብቻ ነው።',
    ],
    keyTakeawaysAm: [
      'Invertible Matrix ($\\det(A)\\neq 0$) ሁልጊዜ ለ $Ax=b$ ብቸኛ መፍትሄ $x = A^{-1}b$ አለው።',
      'RREF የማንኛውንም መጠን ሥርዓት (Unique, Infinite, No Solution) ይፈታል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ የ $A = \\begin{pmatrix}3 & 6\\\\2 & 4\\end{pmatrix}$ Inverse ስንት ነው?',
        answerAm: 'መልስ፡ $\\det(A) = 3(4) - 6(2) = 12 - 12 = 0$ ስለሆነ Singular ነው፤ **Inverse የለውም**!',
      },
    ],
  },

  'msco-mod-ch4': {
    subject: 'math_social',
    chapterNumber: 4,
    titleAm: 'ምዕራፍ 4፡ የካልኩለስ መግቢያ (Limits, Derivatives, Optimization & Integrals)',
    briefOverviewAm: 'ለማህበራዊ ሳይንስና ኢኮኖሚክስ ገደብ (Limit)፣ ቀጣይነት (Continuity)፣ ዴሪቬቲቭ (Marginal Cost/Revenue)፣ Optimization እና ኢንቴግሬሽንን ያስተምራል።',
    briefPointsAm: [
      'Limit lim_{x→a} f(x) የሚኖረው የግራ ገደብ (LHL) እና የቀኝ ገደብ (RHL) እኩል ሲሆኑ ብቻ ነው።',
      'በኢኮኖሚክስ Marginal Cost = C\'(x) እና Marginal Revenue = R\'(x) ናቸው፤ ትርፍ ከፍተኛ የሚሆነው MR = MC ሲሆን ነው።',
      '2nd Derivative Test፡ f\'(c)=0 ሆኖ f\'\'(c) < 0 ከሆነ Maximum፣ f\'\'(c) > 0 ከሆነ Minimum ነው።',
      'Definite Integral ∫_a^b f(x)dx በከርቭ ስር ያለውን የተጣራ ስፋት ይሰጣል።',
    ],
    examTipAm: 'በኢኮኖሚክስ ውስጥ "Marginal" የሚለው ቃል ሁልጊዜ 1ኛ ዴሪቬቲቭ (Derivative) ማለት ነው፤ Total Cost ደግሞ የMarginal Cost ኢንቴግራል ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የካልኩለስ መሰረታዊ ጽንሰ-ሐሳቦችን ለማህበራዊ ሳይንስና ቢዝነስ/ኢኮኖሚክስ ተማሪዎች በግልጽ ያስተምራል። Limits & One-Sided Limits፣ 3ቱ የContinuity መስፈርቶች፣ የዴሪቬቲቭ ፍቺ (Slope of Tangent)፣ Power/Product/Quotient/Chain Rules፣ የExponential እና Log ዴሪቬቲቮች፣ Relative Extrema (1st & 2nd Derivative Tests)፣ በኢኮኖሚክስ የትርፍ ከፍተኛነት (Profit Maximization $MR = MC$)፣ እንዲሁም Indefinite/Definite Integrals፣ u-Substitution እና Area Between Curvesን በምሳሌ ያቀርባል።',
    learningOutcomesAm: [
      'የ0/0 ገደቦችን በFactoring ወይም Rationalizing መፍታት እና Continuityን መመርመር።',
      'የፖሊኖሚያል፣ ራሽናል፣ ኤክስፖኔንሻል ($e^u$) እና ሎጋሪዝም ($\\ln u$) ፈንክሽኖችን ዴሪቬቲቭ ማስላት።',
      'Marginal Cost ($C\'$), Marginal Revenue ($R\'$) እና Marginal Profit ($P\'$) በመጠቀም Optimization መስራት።',
      'Indefinite/Definite Integralsን በPower Rule እና Substitution በማስላት በሁለት ከርቮች መካከል ያለውን ስፋት ማግኘት።',
    ],
    sectionsAm: [
      {
        headingAm: '4.1 ገደብ (Limit)፣ ቀጣይነት (Continuity) እና ዴሪቬቲቮች',
        contentAm: `### 4.1.1 Limit & Continuity
- $\\lim_{x\\to a} f(x) = L \\iff \\lim_{x\\to a^-} f(x) = \\lim_{x\\to a^+} f(x) = L$።
- **Continuity በ $x=a$** (3ቱ መስፈርቶች): (1) $f(a)$ ይኖራል፣ (2) $\\lim_{x\\to a} f(x)$ ይኖራል፣ (3) $\\lim_{x\\to a} f(x) = f(a)$።

### 4.1.2 ዋና የዴሪቬቲቭ ሕጎች
- **Power Rule**: $(x^n)' = nx^{n-1}$
- **Product Rule**: $(fg)' = f'g + fg'$
- **Quotient Rule**: $(f/g)' = \\frac{f'g - fg'}{g^2}$
- **Chain Rule**: $(f(g(x)))' = f'(g(x))g'(x)$
- **Exp & Log**: $(e^u)' = u'e^u$ እና $(\\ln u)' = \\frac{u'}{u}$`,
      },
      {
        headingAm: '4.2 የዴሪቬቲቭ አጠቃቀም (Optimization) እና ኢንቴግሬሽን',
        contentAm: `### 4.2.1 Optimization በኢኮኖሚክስ
- ትርፍ $\\Pi(x) = R(x) - C(x)$ ከፍተኛ የሚሆነው $\\Pi'(x) = 0 \\implies \\mathbf{MR(x) = MC(x)}$ እና $\\Pi''(x) < 0$ ሲሆን ነው!
- Average Cost $\\bar{C}(x) = \\frac{C(x)}{x}$ ዝቅተኛ የሚሆነው $\\bar{C}(x) = MC(x)$ ሲሆን ነው።

### 4.2.2 ኢንቴግሬሽን እና Area Between Curves
- $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$ ($n \\neq -1$)፤ $\\int \\frac{1}{x}dx = \\ln|x| + C$፤ $\\int e^x dx = e^x + C$።
- **FTC**: $\\int_a^b f(x)dx = F(b) - F(a)$።
- **Area Between Curves**: $A = \\int_a^b [f_{\\text{top}}(x) - g_{\\text{bottom}}(x)]\\,dx$።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የአንድ ድርጅት Revenue $R(x) = 100x - x^2$ እና Cost $C(x) = 200 + 20x$ ከሆነ ትርፉን ከፍተኛ የሚያደርገውን ምርት $x$ እና ከፍተኛውን ትርፍ አስሉ።',
        stepsAm: [
          'ደረጃ 1፡ $P(x) = R(x) - C(x) = (100x - x^2) - (200 + 20x) = -x^2 + 80x - 200$።',
          'ደረጃ 2፡ $P\'(x) = -2x + 80 = 0 \\implies x = \\mathbf{40}$ አሃዶች።',
          'ደረጃ 3፡ $P\'\'(x) = -2 < 0$ ስለሆነ በ $x=40$ ላይ ከፍተኛ ትርፍ (Maximum) ነው።',
          'ደረጃ 4፡ ከፍተኛ ትርፍ $P(40) = -(40)^2 + 80(40) - 200 = -1600 + 3200 - 200 = \\mathbf{1400}$ ብር።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Marginal Cost', termAm: 'ማርጂናል ኮስት (MC)', definitionAm: 'አንድ ተጨማሪ ምርት ለማምረት የሚወጣ ተጨማሪ ወጪ ($C\'(x)$)።' },
      { termEn: 'Critical Point', termAm: 'ክሪቲካል ነጥብ', definitionAm: '$f\'(x)=0$ ወይም $f\'(x)$ የማይኖርበት የ $x$ ዋጋ።' },
    ],
    examTrapsAm: [
      'Quotient Rule ላይ $g f\' - f g\'$ ሳይሆን $f\' g - f g\'$ ነው (ቅደም ተከተሉ ወሳኝ ነው)!',
      'Indefinite Integral ሲሰሩ $+ C$ (Constant of Integration) መጻፍ አትርሱ።',
    ],
    keyTakeawaysAm: [
      'Profit Maximization ሁልጊዜ $MR = MC$ (እና $P\'\' < 0$) ላይ ይገኛል።',
      'Area Between Curves ስታሰሉ መጀመሪያ የሁለቱን ከርቮች መገናኛ ነጥቦች ($f(x)=g(x)$) ፈልጉ።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ $MC(x) = 3x^2 + 4$ እና Fixed Cost $C(0) = 50$ ከሆነ Total Cost $C(x)$ ማን ነው?',
        answerAm: 'መልስ፡ $C(x) = \\int (3x^2 + 4)dx = x^3 + 4x + C_0$። $C(0)=50 \\implies C_0=50$ ስለሆነ $C(x) = x^3 + 4x + 50$።',
      },
    ],
  },
};
