import type { AmharicChapterNote } from './types';

export const MATHS_APPLIED_AM_NOTES: Record<string, AmharicChapterNote> = {
  'appmath-mod-ch1': {
    subject: 'math_applied_2',
    chapterNumber: 1,
    titleAm: 'ምዕራፍ 1፡ ቬክተሮች እና አጠቃቀማቸው በ ℝ² እና ℝ³ (Vectors & Vector Spaces)',
    briefOverviewAm: 'ቬክተሮች በ2D/3D፣ Dot Product፣ Cross Product፣ የመስመርና ፕሌን እኩልታዎች በ ℝ³፣ እና Vector Spaces/Basis በጥልቀት ይገለጻሉ።',
    briefPointsAm: [
      'Dot Product u·v = ||u|| ||v|| cosθ = 0 ከሆነ ሁለቱ ቬክተሮች ቀጥ ያሉ (Orthogonal) ናቸው።',
      'Cross Product u × v ለ u እና v ቀጥ ያለ ቬክተር ይሰጣል፤ ||u × v|| የParallelogram ስፋት ነው።',
      'የPlane እኩልታ፡ n · (r − r₀) = 0 ማለትም a(x−x₀) + b(y−y₀) + c(z−z₀) = 0።',
      'Scalar Triple Product |u · (v × w)| የParallelepiped ይዘት (Volume) ይሰጣል፤ 0 ከሆነ Coplanar ናቸው።',
    ],
    examTipAm: 'በ ℝ³ ውስጥ የመስመር አቅጣጫ ቬክተር v ከPlane Normal n ጋር Orthogonal (v · n = 0) ከሆነ መስመሩ ለPlaneው ትይዩ (Parallel) ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ ለምህንድስና እና ለተፈጥሮ ሳይንስ ተማሪዎች ወሳኝ የሆነውን የቬክተር ጂኦሜትሪ እና ሊኒየር አልጀብራ መግቢያ (Applied Math II, Ch 1) በጥልቀት ይዳስሳል። ከመሰረታዊ የቬክተር ስሌቶች ጀምሮ Dot Product (እና Vector Projections)፣ Cross Product፣ የትይዩፕሊፐድ ይዘት (Scalar Triple Product)፣ በ3D ሕዋ ($\\mathbb{R}^3$) ውስጥ የመስመሮችና ፕሌኖች እኩልታዎችን፣ ከነጥብ እስከ ፕሌን/መስመር ያለ ርቀትን፣ እንዲሁም Abstract Vector Spaces፣ Subspaces፣ Linear Independence፣ Span እና Basisን ያስተምራል።',
    learningOutcomesAm: [
      'በ $\\mathbb{R}^2$ እና $\\mathbb{R}^3$ ውስጥ ቬክተሮችን መደመር፣ Unit Vector ማግኘት እና Norm ($\\|\\vec{v}\\|$) ማስላት።',
      'Dot Product በመጠቀም በሁለት ቬክተሮች መካከል ያለውን አንግል፣ Orthogonality እና Projection ($\\text{proj}_v u$) ማስላት።',
      'Cross Product ($\\vec{u} \\times \\vec{v}$) በDeterminant ማስላት እና የሶስት ማዕዘን/ፓራሌሎግራም ስፋትና የParallelepiped ይዘት ማግኘት።',
      'በ3D ውስጥ Symmetric, Parametric እና Vector Equations of a Line እና Scalar Equation of a Plane መጻፍ።',
      'የቬክተሮች ስብስብ Linearly Independent ወይም Basis መሆኑን ማረጋገጥ።',
    ],
    sectionsAm: [
      {
        headingAm: '1.1 ቬክተሮች፣ Dot Product፣ Projections እና Cross Product',
        contentAm: `### 1.1.1 መሰረታዊ ቬክተሮች እና Dot Product
- ለ $\\vec{u} = (u_1, u_2, u_3)$ እና $\\vec{v} = (v_1, v_2, v_3)$:
  - **Norm (ርዝመት)**: $\\|\\vec{u}\\| = \\sqrt{u_1^2 + u_2^2 + u_3^2}$ እና **Unit Vector**: $\\hat{u} = \\frac{\\vec{u}}{\\|\\vec{u}\\|}$።
  - **Dot (Scalar) Product**: $\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2 + u_3 v_3 = \\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta$።
  - **Orthogonality**: $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$።
  - **Orthogonal Projection** የ $\\vec{u}$ በ $\\vec{v}$ ላይ፡
    $$\\operatorname{proj}_{\\vec{v}}\\vec{u} = \\left(\\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{v}\\|^2}\\right)\\vec{v}$$

### 1.1.2 Cross Product እና የጂኦሜትሪ ትርጉሙ
- $\\vec{u} \\times \\vec{v} = \\begin{vmatrix} \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{vmatrix}$ — በ $\\mathbb{R}^3$ ውስጥ ብቻ ይገለጻል፤ ለሁለቱም $\\vec{u}$ እና $\\vec{v}$ ቀጥ ያለ ነው!
- **የParallelogram ስፋት**: $A = \\|\\vec{u} \\times \\vec{v}\\|$ (የTriangle ስፋት ግማሹ $\\frac{1}{2}\\|\\vec{u} \\times \\vec{v}\\|$ ነው)።
- **የParallelepiped ይዘት (Volume)**: $V = |\\vec{u} \\cdot (\\vec{v} \\times \\vec{w})|$።`,
      },
      {
        headingAm: '1.2 መስመሮችና ፕሌኖች በ ℝ³ እና Vector Spaces (Subspace, Independence, Basis)',
        contentAm: `### 1.2.1 መስመሮች እና ፕሌኖች በ ℝ³
- **መስመር (Line)** በነጥብ $P_0(x_0, y_0, z_0)$ አልፎ በአቅጣጫ $\\vec{d} = (a,b,c)$ የሚሄድ፡
  - Parametric: $x = x_0 + at, \\; y = y_0 + bt, \\; z = z_0 + ct$
  - Symmetric: $\\frac{x-x_0}{a} = \\frac{y-y_0}{b} = \\frac{z-z_0}{c}$
- **ፕሌን (Plane)** በነጥብ $P_0$ አልፎ Normal ቬክተር $\\vec{n} = (A, B, C)$ ያለው፡
  $$A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$$
- **ከነጥብ $P_1(x_1, y_1, z_1)$ እስከ ፕሌን $Ax+By+Cz+D=0$ ያለ ርቀት**:
  $$d = \\frac{|Ax_1 + By_1 + Cz_1 + D|}{\\sqrt{A^2 + B^2 + C^2}}$$

### 1.2.2 Vector Spaces, Linear Independence እና Basis
- **Subspace Test**: $W \\subseteq V$ ባዶ ካልሆነ ($\\vec{0} \\in W$) እና በመደመርና በScalar ማባዛት ዝግ (Closed) ከሆነ Subspace ነው።
- **Linear Independence**: $c_1\\vec{v}_1 + \\dots + c_k\\vec{v}_k = \\vec{0} \\implies c_1 = \\dots = c_k = 0$ ብቻ ከሆነ ቬክተሮቹ Linearly Independent ናቸው።
- **Basis**: $V$ን Span የሚያደርጉ እና Linearly Independent የሆኑ ቬክተሮች ስብስብ፤ ብዛታቸው **Dimension ($\\dim V$)** ይባላል።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'በነጥቦች $P(1, 0, 2)$፣ $Q(2, 1, 1)$ እና $R(-1, 2, 3)$ ውስጥ የሚያልፈውን Plane እኩልታ ፈልጉ።',
        stepsAm: [
          'ደረጃ 1፡ ሁለት ቬክተሮች አግኝ፡ $\\vec{PQ} = (1, 1, -1)$ እና $\\vec{PR} = (-2, 2, 1)$።',
          'ደረጃ 2፡ Normal ቬክተር $\\vec{n} = \\vec{PQ} \\times \\vec{PR} = \\mathbf{i}(1 - (-2)) - \\mathbf{j}(1 - 2) + \\mathbf{k}(2 - (-2)) = (3, 1, 4)$።',
          'ደረጃ 3፡ በነጥብ $P(1,0,2)$፡ $3(x-1) + 1(y-0) + 4(z-2) = 0 \\implies \\mathbf{3x + y + 4z = 11}$።',
        ],
        tipAm: 'ሦስቱንም ነጥቦች $P, Q, R$ በ $3x+y+4z$ ውስጥ በመክተት 11 መስጠታቸውን በ5 ሰከንድ ያረጋግጡ!',
      },
    ],
    glossaryAm: [
      { termEn: 'Orthogonal', termAm: 'ኦርቶጎናል (ቀጥ ያለ)', definitionAm: 'የሁለት ቬክተሮች Dot Product ዜሮ ($\\vec{u}\\cdot\\vec{v}=0$) ሲሆን።' },
      { termEn: 'Skew Lines', termAm: 'ስኪው መስመሮች', definitionAm: 'በ $\\mathbb{R}^3$ ውስጥ ትይዩ ያልሆኑ እና የማይገናኙ መስመሮች።' },
      { termEn: 'Span', termAm: 'ስፓን', definitionAm: 'የተሰጡ ቬክተሮች ሁሉንም Linear Combinations ያቀፈ ስብስብ።' },
    ],
    examTrapsAm: [
      'Cross Product Commutative አይደለም! $\\vec{u} \\times \\vec{v} = -(\\vec{v} \\times \\vec{u})$ ነው።',
      'ሁለት መስመሮች በ $\\mathbb{R}^3$ ውስጥ ትይዩ ካልሆኑ የግድ ይገናኛሉ ማለት አይደለም — **Skew Lines** ሊሆኑ ይችላሉ!',
    ],
    keyTakeawaysAm: [
      'Dot Product ቁጥር (Scalar) ይሰጣል፤ Cross Product ቬክተር ይሰጣል።',
      'የPlaneን እኩልታ ለማግኘት ሁልጊዜ አንድ ነጥብ እና አንድ Normal ቬክተር ($\vec{n}$) በቂ ናቸው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ የ $\\vec{a} = (2, -1, 2)$ Unit Vector ማን ነው?',
        answerAm: 'መልስ፡ $\\|\\vec{a}\\| = \\sqrt{4+1+4} = 3$ ስለሆነ Unit Vector $\\hat{a} = \\left(\\frac{2}{3}, -\\frac{1}{3}, \\frac{2}{3}\\right)$ ነው።',
      },
    ],
  },

  'appmath-mod-ch2': {
    subject: 'math_applied_2',
    chapterNumber: 2,
    titleAm: 'ምዕራፍ 2፡ ማትሪክሶች፣ ዲተርሚናንቶች እና Eigenvalues (Matrices & Determinants)',
    briefOverviewAm: 'የማትሪክስ ስሌቶች፣ EROs፣ Reduced Row Echelon Form (RREF)፣ Rank፣ Inverse፣ Cramer\'s Rule እና Eigenvalues/Eigenvectorsን ያስተምራል።',
    briefPointsAm: [
      'ማትሪክስ A Invertible የሚሆነው det(A) ≠ 0 እና Rank(A) = n ሲሆን ብቻ ነው።',
      'Gauss-Jordan Inverse፡ [A | I]ን በElementary Row Operations ወደ [I | A⁻¹] መቀየር።',
      'Cramer\'s Rule፡ x_i = det(A_i) / det(A) (det(A) ≠ 0 ሲሆን)።',
      'Eigenvalues፡ det(A − λI) = 0 የሚለውን Characteristic Equation በመፍታት ይገኛሉ።',
    ],
    examTipAm: 'ለ 3×3 ማትሪክስ kA ሲባዛ det(kA) = k³ det(A) እንጂ k det(A) አይደለም!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የማትሪክስ አልጀብራን፣ የሊኒየር እኩልታዎች ሥርዓት አፈታትን እና የኢንጂነሪንግ መሰረት የሆኑትን Eigenvalues እና Diagonalization ያስተምራል። Transpose, Trace, Symmetric/Skew-Symmetric/Orthogonal ማትሪክሶች፣ Elementary Row Operations (EROs)፣ Rank-Nullity ግንኙነት፣ Cofactor Expansion፣ Adjoint Inverse ($A^{-1} = \\frac{1}{\\det A}\\operatorname{adj}(A)$)፣ Gaussian/Gauss-Jordan Elimination፣ የሊኒየር ሥርዓቶች Consistency (Unique, Infinite, No Solution) እና Diagonalization ($A = PDP^{-1}$) በዝርዝር ተብራርተዋል።',
    learningOutcomesAm: [
      'የማትሪክስ ማባዛት፣ Transpose $(AB)^T = B^T A^T$ እና Traceን ማስላት።',
      'በGauss-Jordan ($[A|I] \\to [I|A^{-1}]$) እና በAdjoint Method የማትሪክስ Inverse ማግኘት።',
      'የDeterminant ባህሪያትን ($\\det(AB)=\\det A\\det B$, Row swap ምልክት መቀየር) በመጠቀም ፈጣን ስሌት መስራት።',
      'በRREF እና Rank በመጠቀም $Ax=b$ Unique, Infinite ወይም No Solution መሆኑን (Rouché–Capelli) መወሰን።',
      'Characteristic Polynomial $\\det(A - \\lambda I)=0$ በመፍታት Eigenvalues እና Eigenvectors ማግኘት።',
    ],
    sectionsAm: [
      {
        headingAm: '2.1 የማትሪክስ ዓይነቶች፣ Row Operations (RREF)፣ Rank እና Inverse',
        contentAm: `### 2.1.1 ልዩ የማትሪክስ ዓይነቶች እና ሕጎች
- **Symmetric**: $A^T = A$፤ **Skew-Symmetric**: $A^T = -A$ (ዋና Diagonal ሁልጊዜ 0 ነው!)
- **Orthogonal**: $A^T = A^{-1}$ (ማለትም $A^T A = I$)
- **Reverse Order Law**: $(AB)^T = B^T A^T$ እና $(AB)^{-1} = B^{-1} A^{-1}$።

### 2.1.2 Rank እና Consistency ($Ax = b$)
ከ $[A \\mid b]$ ወደ RREF ከቀየርን በኋላ፡
- $\\operatorname{rank}(A) < \\operatorname{rank}([A \\mid b]) \\implies$ **መፍትሄ የለውም (Inconsistent)** — የ $[0 \\; 0 \\; 0 \\mid c]$ ($c\\neq 0$) ረድፍ ሲኖር።
- $\\operatorname{rank}(A) = \\operatorname{rank}([A \\mid b]) = n$ (የተለዋዋጮች ብዛት) $\\implies$ **አንድ ብቸኛ መፍትሄ (Unique Solution)**።
- $\\operatorname{rank}(A) = \\operatorname{rank}([A \\mid b]) < n \\implies$ **ወሰን የሌላቸው መፍትሄዎች (Infinitely Many Solutions)**።`,
      },
      {
        headingAm: '2.2 ዲተርሚናንት፣ Cramer\'s Rule፣ Eigenvalues እና Diagonalization',
        contentAm: `### 2.2.1 የዲተርሚናንት ዋና ሕጎች ($n \\times n$)
- ሁለት ረድፍ ወይም ዓምድ ሲቀያየሩ $\\det$ በ $-1$ ይባዛል።
- አንድ ረድፍ በ $k$ ሲባዛ $\\det$ በ $k$ ይባዛል፤ **ሙሉ ማትሪክስ $kA$ ከሆነ $\\det(kA) = k^n \\det(A)$!**
- **Adjoint Formula**: $A^{-1} = \\frac{1}{\\det(A)} \\operatorname{adj}(A)$ (የCofactor ማትሪክስ Transpose)።
- **Cramer\'s Rule**: ለ $Ax = b$፣ $x_i = \\frac{\\det(A_i)}{\\det(A)}$ ($A_i$ ማለት $i$-ኛው ዓምድ በ $b$ የተተካበት ማትሪክስ)።

### 2.2.2 Eigenvalues & Eigenvectors
- $A\\vec{v} = \\lambda\\vec{v}$ ($\vec{v} \\neq \\vec{0}$)።
- $\\lambda$ የሚገኘው $\\det(A - \\lambda I) = 0$ በመፍታት ነው።
- ለፈጣን ማረጋገጫ፡ የEigenvalues ድምር $= \\operatorname{tr}(A)$፤ የEigenvalues ብዜት $= \\det(A)$!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የ $A = \\begin{pmatrix} 4 & 1 \\\\ 2 & 3 \\end{pmatrix}$ Eigenvalues እና Eigenvectors ፈልጉ።',
        stepsAm: [
          'ደረጃ 1፡ $\\det(A - \\lambda I) = (4-\\lambda)(3-\\lambda) - 2 = \\lambda^2 - 7\\lambda + 10 = 0$።',
          'ደረጃ 2፡ Factor: $(\\lambda - 5)(\\lambda - 2) = 0 \\implies \\lambda_1 = 5, \\; \\lambda_2 = 2$። (ማረጋገጫ፡ $5+2 = 7 = \\operatorname{tr}(A)$, $5\\cdot 2 = 10 = \\det(A)$!)',
          'ደረጃ 3፡ ለ $\\lambda_1 = 5$: $(A-5I)\\vec{v}=0 \\implies \\begin{pmatrix}-1 & 1\\\\2 & -2\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}=0 \\implies y=x \\implies \\vec{v}_1 = \\begin{pmatrix}1\\\\1\\end{pmatrix}$።',
          'ደረጃ 4፡ ለ $\\lambda_2 = 2$: $\\begin{pmatrix}2 & 1\\\\2 & 1\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}=0 \\implies y=-2x \\implies \\vec{v}_2 = \\begin{pmatrix}1\\\\-2\\end{pmatrix}$።',
        ],
        tipAm: 'ሁልጊዜ $\\sum\\lambda_i = \\operatorname{tr}(A)$ እና $\\prod\\lambda_i = \\det(A)$ መሆኑን በማረጋገጥ ስሌትዎን ይፈትሹ!',
      },
    ],
    glossaryAm: [
      { termEn: 'RREF', termAm: 'ሬዲዩስድ ሮው ኢሸሎን ፎርም', definitionAm: 'እያንዳንዱ Pivot 1 የሆነበትና ከPivot በላይና በታች 0 የሆነበት መደበኛ የማትሪክስ ቅርጽ።' },
      { termEn: 'Singular Matrix', termAm: 'ሲንጉላር ማትሪክስ', definitionAm: '$\\det(A) = 0$ የሆነ እና Inverse የሌለው ማትሪክስ።' },
      { termEn: 'Eigenvalue', termAm: 'አይገንቫልዩ (λ)', definitionAm: 'ማትሪክስ $A$ በቬክተር $\\vec{v}$ ላይ ሲተገበር አቅጣጫ ሳይቀይር የሚያሰፋበት Scalar ቁጥር።' },
    ],
    examTrapsAm: [
      'የማትሪክስ ማባዛት $AB \\neq BA$ (Commutative አይደለም)!',
      '$(AB)^{-1} = A^{-1}B^{-1}$ ማለት ስህተት ነው፤ ቅደም ተከተሉ ተገልብጦ $B^{-1}A^{-1}$ ነው።',
    ],
    keyTakeawaysAm: [
      'Row addition ($R_i \\to R_i + cR_j$) የDeterminant ዋጋን አይለውጥም።',
      'Homogeneous ሥርዓት $Ax=0$ ሁልጊዜ ቢያንስ Trivial Solution ($x=0$) አለው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ $A$ $3\\times 3$ ማትሪክስ ሆኖ $\\det(A) = 4$ ከሆነ $\\det(2A^{-1})$ ስንት ነው?',
        answerAm: 'መልስ፡ $\\det(2A^{-1}) = 2^3 \\cdot \\det(A^{-1}) = 8 \\cdot \\frac{1}{4} = \\mathbf{2}$።',
      },
    ],
  },

  'appmath-mod-ch3': {
    subject: 'math_applied_2',
    chapterNumber: 3,
    titleAm: 'ምዕራፍ 3፡ ዴሪቬቲቮች እና አጠቃቀማቸው (Derivatives & Optimization)',
    briefOverviewAm: 'የዴሪቬቲቭ ሕጎች፣ Implicit & Logarithmic Differentiation፣ Rolle\'s & Mean Value Theorems፣ Optimization እና L\'Hôpital\'s Ruleን ያብራራል።',
    briefPointsAm: [
      'Chain Rule፡ d/dx[f(g(x))] = f\'(g(x)) · g\'(x)።',
      'Mean Value Theorem፡ f ቀጣይና Differentiable ከሆነ f\'(c) = [f(b)−f(a)]/(b−a) የሚያሟላ c አለ።',
      'Second Derivative Test፡ f\'(c) = 0 ሆኖ f\'\'(c) > 0 ከሆነ Local Min፣ f\'\'(c) < 0 ከሆነ Local Max ነው።',
      'L\'Hôpital\'s Rule፡ 0/0 ወይም ∞/∞ ሲመጣ lim f(x)/g(x) = lim f\'(x)/g\'(x)።',
    ],
    examTipAm: 'L\'Hôpital\'s Rule ከመጠቀምዎ በፊት ሁልጊዜ ገደቡ 0/0 ወይም ∞/∞ መሆኑን ያረጋግጡ — ካልሆነ መጠቀም ትልቅ ስህተት ያመጣል!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የዲፈረንሻል ካልኩለስን ሙሉ ኃይል በጥልቀት ያስተምራል። ከLimit ፍቺ ጀምሮ Product/Quotient/Chain Rules፣ Implicit Differentiation፣ Inverse Trigonometric እና Hyperbolic Derivatives፣ Logarithmic Differentiation (ለ $x^x$ ዓይነት ፈንክሽኖች)፣ Extreme Value/Rolle\'s/Mean Value Theorems፣ በ1ኛ እና 2ኛ ዴሪቬቲቭ ግራፍ መተንተን (Monotonicity, Concavity, Inflection Points)፣ Applied Optimization፣ Related Rates እና L\'Hôpital\'s Rule (ሁሉንም Indeterminate Forms ጨምሮ) ይሸፍናል።',
    learningOutcomesAm: [
      'የExponential, Logarithmic, Inverse Trig ($\\arcsin, \\arctan$) እና Hyperbolic ፈንክሽኖችን ዴሪቬቲቭ ማስላት።',
      'Implicit እና Logarithmic Differentiationን በመጠቀም ውስብስብ እኩልታዎችንና $u(x)^{v(x)}$ን Differentiate ማድረግ።',
      'Rolle\'s Theorem እና Mean Value Theoremን በማረጋገጫና በቀመር ስሌት መተግበር።',
      'First እና Second Derivative Tests በመጠቀም Local/Absolute Extrema እና Inflection Pointsን ማግኘት።',
      'L\'Hôpital\'s Ruleን ለ $0/0, \\infty/\\infty, 0\\cdot\\infty, \\infty-\\infty, 1^\\infty, 0^0$ መጠቀም።',
    ],
    sectionsAm: [
      {
        headingAm: '3.1 የዴሪቬቲቭ ሕጎች፣ Implicit እና Inverse Trig/Hyperbolic ዴሪቬቲቮች',
        contentAm: `### 3.1.1 መሰረታዊ እና ልዩ የዴሪቬቲቭ ሕጎች
- **Chain Rule**: $\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$
- **Inverse Trig**:
  - $\\frac{d}{dx}(\\arcsin u) = \\frac{u'}{\\sqrt{1-u^2}}, \\quad \\frac{d}{dx}(\\arctan u) = \\frac{u'}{1+u^2}, \\quad \\frac{d}{dx}(\\operatorname{arcsec} u) = \\frac{u'}{|u|\\sqrt{u^2-1}}$
- **Hyperbolic**: $\\frac{d}{dx}(\\sinh u) = u'\\cosh u$, $\\frac{d}{dx}(\\cosh u) = u'\\sinh u$ (አሉታዊ ምልክት የለም!)
- **Logarithmic Differentiation**: ለ $y = f(x)^{g(x)}$ በሁለቱም በኩል $\\ln$ ውሰድ ($\\ln y = g(x)\\ln f(x)$) ከዚያ Implicitly Differentiate አድርግ!`,
      },
      {
        headingAm: '3.2 MVT፣ ግራፍ ትንተና፣ Optimization እና L\'Hôpital\'s Rule',
        contentAm: `### 3.2.1 Mean Value Theorem (MVT) እና የግራፍ ትንተና
- **MVT**: $f$ በ $[a,b]$ Continuous እና በ $(a,b)$ Differentiable ከሆነ $f'(c) = \\frac{f(b)-f(a)}{b-a}$ የሚያሟላ $c \\in (a,b)$ አለ።
- **Critical Number**: $f'(c) = 0$ ወይም $f'(c)$ የማይኖርበት ($c \\in \\text{Dom}(f)$)።
- **Concavity & Inflection Point**: $f''(x) > 0 \\implies$ Concave Up ($\\cup$)፤ $f''(x) < 0 \\implies$ Concave Down ($\\cap$)። $f''$ ምልክት የሚቀይርበት ነጥብ **Inflection Point** ነው!

### 3.2.2 L\'Hôpital\'s Rule ለ Indeterminate Forms
- ለ $0/0$ ወይም $\\infty/\\infty$፡ $\\lim_{x\\to a}\\frac{f(x)}{g(x)} = \\lim_{x\\to a}\\frac{f'(x)}{g'(x)}$።
- ለ $1^\\infty, 0^0, \\infty^0$፡ $y = f(x)^{g(x)}$ ብለን $\\ln y = g(x)\\ln f(x)$ በመውሰድ ወደ $0/0$ ወይም $\\infty/\\infty$ መቀየር፣ መጨረሻ ላይ መልሱ **$e^L$** መሆኑን አለመርሳት!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የ $y = x^{\\sin x}$ ($x>0$) ዴሪቬቲቭ $\\frac{dy}{dx}$ን ፈልጉ።',
        stepsAm: [
          'ደረጃ 1፡ ሁለቱንም ወገን $\\ln$ ውሰድ፡ $\\ln y = \\sin x \\cdot \\ln x$።',
          'ደረጃ 2፡ በ $x$ Differentiate (Product Rule)፡ $\\frac{1}{y}\\frac{dy}{dx} = \\cos x \\cdot \\ln x + \\sin x \\cdot \\frac{1}{x}$።',
          'ደረጃ 3፡ በ $y = x^{\\sin x}$ አባዛ፡ $\\frac{dy}{dx} = x^{\\sin x}\\left(\\cos x \\ln x + \\frac{\\sin x}{x}\\right)$።',
        ],
        tipAm: '$x^{\\sin x}$ ላይ Power Rule ($n x^{n-1}$) ወይም Exponential Rule ($a^x \\ln a$) መጠቀም የተከለከለ ነው — ሁልጊዜ Logarithmic Differentiation ተጠቀሙ!',
      },
    ],
    glossaryAm: [
      { termEn: 'Inflection Point', termAm: 'ኢንፍሌክሽን ፖይንት', definitionAm: 'የግራፉ መጠምዘዝ ከConcave Up ወደ Concave Down (ወይም በተቃራኒው) የሚቀየርበት ነጥብ።' },
      { termEn: 'L\'Hôpital\'s Rule', termAm: 'የሎፒታል ሕግ', definitionAm: '0/0 ወይም ∞/∞ ገደቦችን የላይና የታች ዴሪቬቲቭ በመውሰድ መፍቻ ዘዴ።' },
    ],
    examTrapsAm: [
      'በL\'Hôpital\'s Rule Quotient Rule አትጠቀሙ — ላይኛውንና ታችኛውን ለየብቻ Differentiate አድርጉ!',
      'በOptimization የClosed Interval $[a,b]$ ጥያቄ ላይ Endpoints ($f(a), f(b)$) መፈተሽ አትርሱ።',
    ],
    keyTakeawaysAm: [
      'Differentiable ከሆነ ሁልጊዜ Continuous ነው፤ ግን Continuous ከሆነ የግድ Differentiable አይደለም (ለምሳሌ $|x|$ በ0)።',
      'ለ $1^\\infty$ ገደብ $\\lim (1 + a/x)^{bx} = e^{ab}$ በቀጥታ መፈተሽ ፈጣን ማረጋገጫ ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ $\\lim_{x\\to 0} \\frac{\\sin(5x) - 5x}{x^3}$ ስንት ነው?',
        answerAm: 'መልስ፡ L\'Hôpital 3 ጊዜ (ወይም Taylor): $\\frac{5\\cos 5x - 5}{3x^2} \\to \\frac{-25\\sin 5x}{6x} \\to \\frac{-125\\cos 5x}{6} = -\\frac{125}{6}$።',
      },
    ],
  },

  'appmath-mod-ch4': {
    subject: 'math_applied_2',
    chapterNumber: 4,
    titleAm: 'ምዕራፍ 4፡ ኢንቴግሬሽን እና አጠቃቀሙ (Integration, FTC, Area & Volume)',
    briefOverviewAm: 'የኢንቴግሬሽን ቴክኒኮች (Substitution, Integration by Parts, Trig Sub, Partial Fractions)፣ Fundamental Theorem of Calculus፣ Improper Integrals እና Area/Volume ስሌቶችን ያስተምራል።',
    briefPointsAm: [
      'Integration by Parts (ILATE)፡ ∫ u dv = uv − ∫ v du።',
      'Fundamental Theorem of Calculus (FTC)፡ ∫_a^b f(x)dx = F(b) − F(a) እና d/dx ∫_a^{g(x)} f(t)dt = f(g(x))g\'(x)።',
      'Improper Integral፡ ∫_1^∞ (1/x^p) dx የሚሰበሰበው (Converge) p > 1 ሲሆን ብቻ ነው!',
      'Solids of Revolution፡ Disk/Washer V = π∫(R²−r²)dx፤ Cylindrical Shell V = 2π∫ r·h dx።',
    ],
    examTipAm: 'በPartial Fractions ውስጥ የላይኛው ደረጃ ከታችኛው ደረጃ ጋር እኩል ወይም የሚበልጥ ከሆነ መጀመሪያ Long Division መስራት ግዴታ ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የኢንቴግራል ካልኩለስን ቴክኒኮች እና ጂኦሜትሪካል አጠቃቀሞች በጥልቀት ይሸፍናል። Antiderivatives፣ u-Substitution፣ Integration by Parts (ILATE)፣ Trigonometric Integrals እና Trigonometric Substitution ($\\sqrt{a^2-x^2}, \\sqrt{a^2+x^2}, \\sqrt{x^2-a^2}$), Partial Fraction Decomposition፣ Fundamental Theorem of Calculus (Part 1 & 2)፣ Improper Integrals (Type I & II + $p$-Test)፣ በሁለት ከርቮች መካከል ያለ ስፋት፣ የSolids of Revolution ይዘት (Disk, Washer, Shell Methods) እና Arc Length በዝርዝር ተካተዋል።',
    learningOutcomesAm: [
      'ትክክለኛውን የኢንቴግሬሽን ዘዴ (u-Sub, IBP, Trig Sub, Partial Fractions) መርጦ Antiderivative ማስላት።',
      'FTC Part 1 እና Leibniz Rule ($\\frac{d}{dx}\\int_{a(x)}^{b(x)} f(t)dt$) በመጠቀም የኢንቴግራል ዴሪቬቲቭ ማግኘት።',
      'Improper Integralsን በLimit ገልጾ Convergent ወይም Divergent መሆናቸውን መወሰን።',
      'በሁለት ከርቮች መካከል ያለውን ስፋት (Area) እና በDisk/Washer/Shell ዘዴዎች የሽክርክሪት ይዘትን (Volume) ማስላት።',
    ],
    sectionsAm: [
      {
        headingAm: '4.1 አራቱ ዋና የኢንቴግሬሽን ቴክኒኮች',
        contentAm: `### 4.1.1 Integration by Parts (ILATE)
$$\\int u \\, dv = uv - \\int v \\, du$$
**$u$ መምረጫ ቅደም ተከተል (ILATE)**: **I**nverse trig $\\to$ **L**ogarithmic $\\to$ **A**lgebraic ($x^n$) $\\to$ **T**rigonometric $\\to$ **E**xponential ($e^x$)።

### 4.1.2 Trigonometric Substitution (ሦስቱ ቅርጾች)
- $\\sqrt{a^2 - x^2} \\implies x = a\\sin\\theta$ (1 − $\\sin^2\\theta = \\cos^2\\theta$)
- $\\sqrt{a^2 + x^2} \\implies x = a\\tan\\theta$ (1 + $\\tan^2\\theta = \\sec^2\\theta$)
- $\\sqrt{x^2 - a^2} \\implies x = a\\sec\\theta$ ($\\sec^2\\theta - 1 = \\tan^2\\theta$)

### 4.1.3 Partial Fractions
1. $\\deg(P) \\ge \\deg(Q)$ ከሆነ መጀመሪያ **Polynomial Long Division** ስራ!
2. Distinct Linear $(x-a)$ $\\to \\frac{A}{x-a}$፤ Repeated $(x-a)^k \\to \\frac{A_1}{x-a} + \\dots + \\frac{A_k}{(x-a)^k}$፤ Irreducible Quadratic $(ax^2+bx+c) \\to \\frac{Bx+C}{ax^2+bx+c}$።`,
      },
      {
        headingAm: '4.2 FTC፣ Improper Integrals እና Area / Volume / Arc Length',
        contentAm: `### 4.2.1 Improper Integrals ($p$-Integral Rules)
- $\\int_1^\\infty \\frac{1}{x^p}\\,dx$: **Converges** $\\iff p > 1$ (ዋጋው $\\frac{1}{p-1}$)፤ Diverges $\\iff p \\le 1$።
- $\\int_0^1 \\frac{1}{x^p}\\,dx$: **Converges** $\\iff p < 1$፤ Diverges $\\iff p \\ge 1$! *(ተገላቢጦሽ መሆኑን አስተውሉ!)*

### 4.2.2 የሽክርክሪት ይዘት (Volume) እና Arc Length
- **Disk / Washer (ከ $x$-ዘንግ ዙሪያ)** — ቁርጡ ለዘንጉ **ቀጥ** ያለ፡
  $$V = \\pi \\int_a^b \\left([R(x)]^2 - [r(x)]^2\\right) dx$$
- **Cylindrical Shells (ከ $y$-ዘንግ ዙሪያ)** — ቁርጡ ለዘንጉ **ትይዩ**፡
  $$V = 2\\pi \\int_a^b x \\cdot [f(x) - g(x)] \\, dx$$
- **Arc Length**: $L = \\int_a^b \\sqrt{1 + [f'(x)]^2}\\,dx$።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የ $\\int_0^1 x e^x \\, dx$ ዋጋን በIntegration by Parts አስሉ።',
        stepsAm: [
          'ደረጃ 1፡ በILATE $u = x$ (Algebraic), $dv = e^x dx$ (Exponential)።',
          'ደረጃ 2፡ $du = dx$, $v = e^x$።',
          'ደረጃ 3፡ $\\int_0^1 x e^x dx = [x e^x]_0^1 - \\int_0^1 e^x dx = (1\\cdot e^1 - 0) - (e^1 - e^0) = e - (e - 1) = \\mathbf{1}$።',
        ],
        tipAm: 'ለDefinite Integral ሁልጊዜ $[uv]_a^b$ ላይ ገደቡን መተካት እንዳትረሱ!',
      },
    ],
    glossaryAm: [
      { termEn: 'Improper Integral', termAm: 'ኢምፕሮፐር ኢንቴግራል', definitionAm: 'የኢንቴግሬሽን ገደቡ $\\pm\\infty$ የሆነ ወይም ውስጡ Discontinuity ያለበት ኢንቴግራል።' },
      { termEn: 'Washer Method', termAm: 'ዋሸር ዘዴ', definitionAm: 'በውስጡ ክፍት ቦታ ያለውን የሽክርክሪት ይዘት በ $\\pi(R^2-r^2)$ የማስላት ዘዴ።' },
    ],
    examTrapsAm: [
      'በDefinite Integral ላይ u-Substitution ስትሰሩ ወይ የ $x$ ገደቦችን ወደ $u$ ቀይሩ፣ ወይም $x$ን መልሳችሁ ተኩ — ሁለቱን አትቀላቅሉ!',
      'በWasher Method ላይ $(R - r)^2$ ሳይሆን $R^2 - r^2$ ነው!',
    ],
    keyTakeawaysAm: [
      '$\\int_a^b f(x)dx$ የታችኛውን ቦታ በአሉታዊ ይወስዳል፤ ስፋት (Area) ስትፈልጉ ግን ሁልጊዜ (Top − Bottom) ወይም $|f(x)|$ ውሰዱ።',
      'ILATE ለIntegration by Parts የ $u$ ምርጫ ስህተትን ያስወግዳል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ $\\frac{d}{dx}\\int_2^{x^3} \\cos(t)\\,dt$ ስንት ነው?',
        answerAm: 'መልስ፡ በFTC + Chain Rule፡ $\\cos(x^3) \\cdot \\frac{d}{dx}(x^3) = \\mathbf{3x^2 \\cos(x^3)}$።',
      },
    ],
  },
};
