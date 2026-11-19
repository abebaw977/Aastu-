import type { AmharicChapterNote } from './types';

export const PHYSICS_AM_NOTES: Record<string, AmharicChapterNote> = {
  'phys-mod-ch1': {
    subject: 'physics',
    chapterNumber: 1,
    titleAm: 'ምዕራፍ 1፡ መሰረታዊ ልኬት፣ Uncertainty እና ቬክተሮች (Preliminaries & Vectors)',
    briefOverviewAm: 'መሰረታዊ እና የተመነጩ አሃዶች (SI)፣ Dimensional Analysis፣ Significant Figures፣ የስህተት ትንተና እና የቬክተር ስሌቶችን በጥልቀት ያስተምራል።',
    briefPointsAm: [
      '7ቱ መሰረታዊ SI አሃዶች፡ m (ርዝመት), kg (መጠነ-ቁስ), s (ጊዜ), A (ካረንት), K (ሙቀት), mol (መጠን), cd (ብርሃን)።',
      'Dimensional Analysis [LHS] = [RHS] መሆኑን ይፈትሻል (ነገር ግን ቁጥራዊ ቋሚዎችን እንደ 1/2 ወይም π አይለይም)።',
      'Error Propagation፡ በመደመር/መቀነስ Absolute errors ይደመራሉ፤ በማባዛት/ማካፈል Fractional errors ይደመራሉ።',
      'የቬክተር ድምር በComponent ዘዴ፡ R_x = ΣA_x, R_y = ΣA_y, |R| = √(R_x² + R_y²)።',
    ],
    examTipAm: 'በSignificant Figures፡ የመጨረሻ ዜሮዎች በአስርዮሽ ነጥብ ካለ (ለምሳሌ 2.400) Significant ናቸው፤ ያለ ነጥብ (2400) ግን Ambiguous (በScientific notation 2.4×10³) ናቸው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የዩኒቨርሲቲ ፊዚክስ (General Physics Phys1011) መግቢያ ሲሆን፣ የሳይንሳዊ ልኬት ትክክለኛነትን (Accuracy vs Precision)፣ 7ቱን መሰረታዊ የSI አሃዶች፣ Dimensional Analysisን፣ Significant Figuresን፣ የልኬት ስህተቶችን (Systematic vs Random Errors & Error Propagation) እና የ2D/3D ቬክተሮች አልጀብራን (Graphical & Component Methods, Unit Vectors $\\hat{i},\\hat{j},\\hat{k}$, Dot & Cross Products) በጥልቀትና በተሰሩ ምሳሌዎች ያስተምራል።',
    learningOutcomesAm: [
      '7ቱን መሰረታዊ የSI አሃዶች ከተመነጩ (Derived) አሃዶች መለየት እና Dimensionally እኩልታዎችን ማረጋገጥ።',
      'Accuracy እና Precision እንዲሁም Systematic እና Random Errorsን መለየት።',
      'በመደመር፣ መቀነስ፣ ማባዛት፣ ማካፈል እና ኃይል ሲሰራ Error Propagation ማስላት።',
      'ቬክተሮችን በx, y, z Components መከፋፈል፣ Dot Product እና Cross Productን ማስላት።',
    ],
    sectionsAm: [
      {
        headingAm: '1.1 SI አሃዶች፣ Dimensional Analysis እና Significant Figures',
        contentAm: `### 1.1.1 7ቱ መሰረታዊ SI መጠኖች
| መጠን | አሃድ (Unit) | ምልክት | Dimension |
| :--- | :--- | :--- | :--- |
| ርዝመት (Length) | Meter | $\\text{m}$ | $[L]$ |
| መጠነ-ቁስ (Mass) | Kilogram | $\\text{kg}$ | $[M]$ |
| ጊዜ (Time) | Second | $\\text{s}$ | $[T]$ |
| ኤሌክትሪክ ካረንት | Ampere | $\\text{A}$ | $[I]$ |
| ሙቀት (Temperature) | Kelvin | $\\text{K}$ | $[\\Theta]$ |
| የቁስ መጠን | Mole | $\\text{mol}$ | $[N]$ |
| የብርሃን ጥንካሬ | Candela | $\\text{cd}$ | $[J]$ |

### 1.1.2 Dimensional Analysis ሕጎች
- **Principle of Homogeneity**: የሚደመሩ ወይም እኩል የሚደረጉ ቃላት ተመሳሳይ Dimension ሊኖራቸው ይገባል!
- የ $\\sin(\\theta), \\cos(\\theta), e^x, \\ln(x)$ ውስጣዊ ክፍል ሁልጊዜ **Dimensionless** ($[M^0L^0T^0]=1$) መሆን አለበት።

### 1.1.3 Accuracy vs Precision እና Errors
- **Accuracy**: ልኬቱ ከእውነተኛው ዋጋ ጋር ያለው ቅርበት (በ**Systematic Error** ይበላሻል — በCalibration ይስተካከላል)።
- **Precision**: ተደጋጋሚ ልኬቶች እርስ በርሳቸው ያላቸው ቅርበት (በ**Random Error** ይነካል — በAveraging ይቀንሳል)።
- **Error Propagation**:
  - ለ $Z = A \\pm B$: $\\Delta Z = \\Delta A + \\Delta B$ (ሁልጊዜ **ይደመራሉ** — በመቀነስም ቢሆን!)
  - ለ $Z = \\frac{A^a B^b}{C^c}$: $\\frac{\\Delta Z}{Z} = a\\frac{\\Delta A}{A} + b\\frac{\\Delta B}{B} + c\\frac{\\Delta C}{C}$`,
      },
      {
        headingAm: '1.2 ቬክተሮች፣ Components፣ Dot Product እና Cross Product',
        contentAm: `### 1.2.1 Component Method
- ለቬክተር $\\vec{A}$ ከ $+x$ ዘንግ $\\theta$ አንግል ካለው፡ $A_x = A\\cos\\theta$ እና $A_y = A\\sin\\theta$።
- ድምር ቬክተር $\\vec{R} = \\vec{A} + \\vec{B}$፡ $R_x = A_x + B_x$, $R_y = A_y + B_y$, $R = \\sqrt{R_x^2 + R_y^2}$, $\\theta = \\tan^{-1}(R_y/R_x)$ (Quadrant ፈትሹ!)።

### 1.2.2 Dot & Cross Products በፊዚክስ
- **Dot Product** (ሥራ $W = \\vec{F} \\cdot \\vec{d}$): $\\vec{A} \\cdot \\vec{B} = A_x B_x + A_y B_y + A_z B_z = AB\\cos\\theta$ (ውጤቱ Scalar ነው)።
- **Cross Product** (ቶርክ $\\vec{\\tau} = \\vec{r} \\times \\vec{F}$): $|\\vec{A} \\times \\vec{B}| = AB\\sin\\theta$ (ውጤቱ ለሁለቱም ቀጥ ያለ Vector ነው)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የፔንዱለም ክፍለ-ጊዜ $T = 2\\pi\\sqrt{L/g}$ ነው። የርዝመት $L$ Percentage Error $2\\%$ እና የ $g$ Percentage Error $4\\%$ ከሆነ የ $T$ ከፍተኛው Percentage Error ስንት ነው?',
        stepsAm: [
          '1. ቀመሩን በኃይል ጻፍ፡ $T = 2\\pi L^{1/2} g^{-1/2}$ ($2\\pi$ ቋሚ ስለሆነ Error የለውም)።',
          '2. Fractional Error ሕግ (ሁሉም Absolute Value ተወስዶ ይደመራሉ!)፡ $\\frac{\\Delta T}{T} = \\frac{1}{2}\\frac{\\Delta L}{L} + \\frac{1}{2}\\frac{\\Delta g}{g}$።',
          '3. $\\%\\Delta T = \\frac{1}{2}(2\\%) + \\frac{1}{2}(4\\%) = 1\\% + 2\\% = \\mathbf{3\\%}$።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Systematic Error', termAm: 'ሲስተማቲክ ስህተት', definitionAm: 'በተበላሸ መሳሪያ ወይም በZero Error ምክንያት ሁልጊዜ በአንድ አቅጣጫ የሚፈጠር ስህተት።' },
      { termEn: 'Resultant Vector', termAm: 'ሪዛልታንት ቬክተር', definitionAm: 'የሁለት ወይም ከዚያ በላይ ቬክተሮች ድምር ውጤት።' },
    ],
    examTrapsAm: [
      '$Z = A - B$ ሲሆን ስህተቱ $\\Delta A - \\Delta B$ አይደለም! ሁልጊዜ $\\Delta Z = \\Delta A + \\Delta B$ ነው (ስህተቶች በፍጹም አይቀነሱም)።',
      'አንግሉ ከ $y$-ዘንግ ከተለካ $A_x = A\\sin\\theta$ እና $A_y = A\\cos\\theta$ ይሆናል — ሁልጊዜ ከየትኛው ዘንግ እንደተለካ እዩ!',
    ],
    keyTakeawaysAm: [
      'Dimensional consistency አስፈላጊ (Necessary) እንጂ በቂ (Sufficient) አይደለም (1/2ን አያሳይም)።',
      'Unit vectors $\\hat{i}, \\hat{j}, \\hat{k}$ mutually orthogonal ናቸው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በ $x = At + Bt^2$ ውስጥ $x$ በሜትር $t$ በሰከንድ ቢለካ የ $A$ እና የ $B$ SI አሃድ ምንድን ነው?',
        answerAm: 'መልስ፡ $[At] = \\text{m} \\implies A = \\text{m/s}$ (Velocity)፤ $[Bt^2] = \\text{m} \\implies B = \\text{m/s}^2$ (Acceleration)።',
      },
    ],
  },

  'phys-mod-ch2': {
    subject: 'physics',
    chapterNumber: 2,
    titleAm: 'ምዕራፍ 2፡ ኪኔማቲክስ፣ የኒውተን ሕጎች፣ ሥራ-ኃይል እና ሞመንተም',
    briefOverviewAm: '1D እና 2D (Projectile) እንቅስቃሴ፣ Circular Motion፣ የኒውተን 3 ሕጎችና Friction፣ Work-Energy Theorem እና Momentum/Collisionsን ያስተምራል።',
    briefPointsAm: [
      'የ1D ቋሚ Acceleration ቀመሮች፡ v = v₀+at, Δx = v₀t + ½at², v² = v₀² + 2aΔx።',
      'Projectile Motion፡ a_x = 0 (vx ቋሚ) እና a_y = −g። ከፍተኛ Range የሚገኘው θ = 45° ላይ ነው።',
      'Newton 2nd Law፡ ΣF = ma። Centripetal Force፡ F_c = mv²/r ወደ መሃል ያመለክታል።',
      'Work-Energy Theorem፡ W_net = ΔK = ½mv_f² − ½mv_i²። Momentum፡ p = mv (በግጭት ውስጥ ሁልጊዜ ይጠበቃል!)።',
    ],
    examTipAm: 'በProjectile ከፍተኛ ነጥብ (Peak) ላይ v_y = 0 ነው፣ ነገር ግን v_x = v₀cosθ ዜሮ አይደለም እና Acceleration አሁንም a = g ወደ ታች ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የClassical Mechanicsን ዋና ልብ — ኪኔማቲክስ (1D, Free Fall, Projectile, Uniform Circular Motion)፣ ዳይናሚክስ (የኒውተን ሦስት ሕጎች፣ Free-Body Diagrams, Inclined Planes, Static & Kinetic Friction)፣ ሥራ እና ኃይል (Work-Energy Theorem, Conservative vs Non-Conservative Forces, Conservation of Mechanical Energy, Power)፣ እንዲሁም Impulse, Linear Momentum እና Elastic vs Inelastic Collisionsን በጥልቀትና በተሰሩ የፈተና ምሳሌዎች ያስተምራል።',
    learningOutcomesAm: [
      'የKinematics እኩልታዎችን በመጠቀም Free Fall እና Projectile (Range, Max Height, Time of Flight) ማስላት።',
      'Free-Body Diagram በመሳል በInclined Plane እና በተያያዙ ብሎኮች ላይ Acceleration እና Tension ማስላት።',
      'Work-Energy Theorem ($W_{\\text{nc}} = \\Delta K + \\Delta U$) በመጠቀም Friction ባለበትም ሆነ በሌለበት ፍጥነት ማግኘት።',
      'Elastic, Inelastic እና Perfectly Inelastic ግጭቶችን በMomentum Conservation መፍታት።',
    ],
    sectionsAm: [
      {
        headingAm: '2.1 ኪኔማቲክስ (1D, Projectile, Circular) እና የኒውተን ሕጎች',
        contentAm: `### 2.1.1 Projectile Motion (በአየር መቋቋም በሌለበት)
- Horizontal ($x$): $a_x = 0 \\implies v_x = v_0\\cos\\theta$ (ቋሚ!), $x = (v_0\\cos\\theta)t$።
- Vertical ($y$): $a_y = -g \\implies v_y = v_0\\sin\\theta - gt$, $y = (v_0\\sin\\theta)t - \\frac{1}{2}gt^2$።
- በእኩል ከፍታ ላይ ሲያርፍ፡
  $$T = \\frac{2v_0\\sin\\theta}{g}, \\qquad H_{\\max} = \\frac{v_0^2\\sin^2\\theta}{2g}, \\qquad R = \\frac{v_0^2\\sin(2\\theta)}{g}$$

### 2.1.2 Friction & Inclined Plane ($\theta$ ዘንበል ያለ ወለል)
- **Static Friction**: $f_s \\le \\mu_s N$፤ **Kinetic Friction**: $f_k = \\mu_k N$ (ሁልጊዜ $\\mu_s > \\mu_k$)።
- **Inclined Plane** ላይ Normal Force $N = mg\\cos\\theta$ ሲሆን ከስበት ወደ ታች የሚጎትተው ክፍል **$mg\\sin\\theta$** ነው!`,
      },
      {
        headingAm: '2.2 ሥራ፣ ኃይል (Energy)፣ ሞመንተም እና ግጭቶች (Collisions)',
        contentAm: `### 2.2.1 ሥራ እና ኃይል
- **Work**: $W = Fd\\cos\\theta$፤ **Power**: $P = \\frac{dW}{dt} = \\vec{F}\\cdot\\vec{v}$።
- **Mechanical Energy**: $E = K + U = \\frac{1}{2}mv^2 + mgh + \\frac{1}{2}kx^2$።
- Non-conservative (Friction) ካለ፡ $\\Delta E = W_{\\text{friction}} = -f_k d$።

### 2.2.2 Momentum & Collisions
- **Impulse**: $\\vec{J} = \\vec{F}_{\\text{avg}}\\Delta t = \\Delta \\vec{p}$።
- **Elastic Collision**: ሁለቱም **Momentum** እና **Kinetic Energy ($K$)** ይጠበቃሉ!
- **Inelastic Collision**: Momentum ይጠበቃል፣ Kinetic Energy ግን ይቀንሳል (በሙቀት/ድምጽ ይባክናል)።
- **Perfectly Inelastic**: ከግጭት በኋላ ተጣብቀው ይሄዳሉ ($m_1 v_1 + m_2 v_2 = (m_1+m_2)v_f$)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: '$4\\text{ kg}$ ብሎክ በ $30^\\circ$ ዘንበል ባለ Frictionless ገጽ ላይ ከእረፍት ተለቆ $5\\text{ m}$ ቢንሸራተት መጨረሻ ላይ ፍጥነቱ ስንት ነው? ($g=10\\text{ m/s}^2$)',
        stepsAm: [
          'ዘዴ (በEnergy Conservation): $h = L\\sin 30^\\circ = 5(0.5) = 2.5\\text{ m}$።',
          '$mgh = \\frac{1}{2}mv^2 \\implies v = \\sqrt{2gh} = \\sqrt{2(10)(2.5)} = \\sqrt{50} \\approx \\mathbf{7.07\\text{ m/s}}$።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Conservative Force', termAm: 'ኮንሰርቫቲቭ ኃይል', definitionAm: 'የሚሰራው ሥራ በመንገዱ ላይ ሳይሆን በመነሻና መድረሻ ብቻ የሚወሰን (እንደ ስበትና ስፕሪንግ)።' },
      { termEn: 'Centripetal Acceleration', termAm: 'ሴንትሪፔታል አክሰለሬሽን', definitionAm: 'በክብ እንቅስቃሴ ወቅት አቅጣጫን የሚቀይር ወደ ክቡ መሃል የሚያመለክት አክሰለሬሽን ($v^2/r$)።' },
    ],
    examTrapsAm: [
      'Normal Force ሁልጊዜ $N = mg$ አይደለም! Inclined plane ላይ $N = mg\\cos\\theta$ ነው፤ በሊፍት ወይም ተጨማሪ ኃይል ሲኖር ይለዋወጣል!',
      'በPerfectly Inelastic Collision ወቅት ሞመንተም ይጠበቃል እንጂ Kinetic Energy አይጠበቅም!',
    ],
    keyTakeawaysAm: [
      'የMechanics ችግሮችን በEnergy Conservation መፍታት ከKinematics + FBD በበለጠ ፈጣን ነው።',
      'Action እና Reaction (Newton 3rd Law) ሁልጊዜ በተለያዩ ሁለት አካላት ላይ ስለሚተገበሩ አይሰራረዙም!',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በአንድ አንግል $\\theta$ እና በ $90^\\circ - \\theta$ የተተኮሱ ሁለት Projectiles በተመሳሳይ ፍጥነት ቢወረወሩ የትኛው ተመሳሳይ ይሆናል?',
        answerAm: 'መልስ፡ **Horizontal Range ($R$)** እኩል ይሆናል! (ምክንያቱም $\\sin(2(90^\\circ-\\theta)) = \\sin(180^\\circ-2\\theta) = \\sin(2\\theta)$)።',
      },
    ],
  },

  'phys-mod-ch3': {
    subject: 'physics',
    chapterNumber: 3,
    titleAm: 'ምዕራፍ 3፡ የፈሳሾች ሜካኒክስ (Fluid Mechanics)',
    briefOverviewAm: 'Density እና Pressure፣ Pascal\'s Principle፣ Archimedes\' Buoyancy፣ Continuity Equation (A₁v₁ = A₂v₂) እና Bernoulli\'s Equationን ያብራራል።',
    briefPointsAm: [
      'Hydrostatic Pressure፡ P = P₀ + ρgh (በጥልቀት h ላይ ብቻ እንጂ በዕቃው ቅርጽ አይወሰንም)።',
      'Pascal\'s Principle (Hydraulic Press)፡ F₁/A₁ = F₂/A₂።',
      'Archimedes\' Principle (Buoyant Force)፡ F_B = ρ_fluid · V_submerged · g (የተገፋው ፈሳሽ ክብደት)።',
      'Bernoulli\'s Equation፡ P + ½ρv² + ρgh = Constant (ፍጥነት ሲጨምር ግፊት ይቀንሳል!)።',
    ],
    examTipAm: 'አንድ ነገር በፈሳሽ ላይ ሲንሳፈፍ (Floating) F_B = Weight (m_obj g) ነው፤ የሰመጠው መጠን ክፍልፋይ V_sub / V_total = ρ_obj / ρ_fluid ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ ፈሳሾችንና ጋዞችን በእረፍት (Fluid Statics) እና በእንቅስቃሴ (Fluid Dynamics) ውስጥ የሚገዙ ሕጎችን በዝርዝር ያስተምራል። Density, Specific Gravity, Absolute vs Gauge Pressure, Pascal\'s Law (Hydraulic lifts), Archimedes\' Principle (Buoyancy & Floating conditions), Ideal Fluid Flow, Equation of Continuity (Conservation of Mass) እና Bernoulli\'s Equation (Conservation of Energy + Torricelli\'s Theorem & Venturi Meter) በምሳሌዎች ተብራርተዋል።',
    learningOutcomesAm: [
      'Gauge Pressure እና Absolute Pressureን ($P = P_{\\text{atm}} + \\rho gh$) ማስላት።',
      'የPascal\'s Principle በመጠቀም በHydraulic Press ውስጥ ያለ ኃይልንና ርቀትን ማግኘት።',
      'Archimedes\' Principle በመጠቀም የሰመጠ/የሚንሳፈፍ አካል Buoyant Force እና Apparent Weight ማስላት።',
      'Continuity Equation እና Bernoulli\'s Equation በመጠቀም በቧንቧ ውስጥ ያለ ፍጥነትና ግፊት ልዩነት ማግኘት።',
    ],
    sectionsAm: [
      {
        headingAm: '3.1 Fluid Statics (Pressure, Pascal & Archimedes)',
        contentAm: `### 3.1.1 ግፊት እና የPascal ሕግ
- **ግፊት**: $P = \\frac{F}{A}$ ($1\\text{ Pa} = 1\\text{ N/m}^2$, $1\\text{ atm} = 1.013 \\times 10^5\\text{ Pa}$).
- **Gauge Pressure**: $P_{\\text{gauge}} = P_{\\text{abs}} - P_{\\text{atm}} = \\rho gh$።
- **Hydraulic Press**: $\\frac{F_1}{A_1} = \\frac{F_2}{A_2}$ እና $A_1 d_1 = A_2 d_2$ (Energy አይፈጠርም — ኃይል ሲያድግ ርቀቱ ይቀንሳል!)።

### 3.1.2 Archimedes\' Principle
$$F_B = \\rho_{\\text{fluid}} V_{\\text{sub}} g$$
- $\\rho_{\\text{obj}} < \\rho_{\\text{fluid}} \\implies$ ይንሳፈፋል ($V_{\\text{sub}}/V_{\\text{obj}} = \\rho_{\\text{obj}}/\\rho_{\\text{fluid}}$)።
- **Apparent Weight** በፈሳሽ ውስጥ፡ $W_{\\text{app}} = W_{\\text{air}} - F_B$።`,
      },
      {
        headingAm: '3.2 Fluid Dynamics (Continuity & Bernoulli\'s Equation)',
        contentAm: `### 3.2.1 Continuity & Bernoulli
- **Continuity Equation**: $A_1 v_1 = A_2 v_2$ (ቱቦው ሲጠብ ፍጥነቱ ይጨምራል!)።
- **Bernoulli\'s Equation**:
  $$P_1 + \\frac{1}{2}\\rho v_1^2 + \\rho g y_1 = P_2 + \\frac{1}{2}\\rho v_2^2 + \\rho g y_2$$
- **Torricelli\'s Speed** (በታንከር ቀዳዳ የሚወጣ ውሃ): $v = \\sqrt{2gh}$።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የበረዶ Density $920\\text{ kg/m}^3$ እና የባህር ውሃ Density $1025\\text{ kg/m}^3$ ከሆነ፣ የበረዶ ግግር (Iceberg) ምን ያህል መቶኛ ከውሃ በታች ይሰምጣል?',
        stepsAm: [
          'ለሚንሳፈፍ አካል $\\frac{V_{\\text{sub}}}{V_{\\text{total}}} = \\frac{\\rho_{\\text{ice}}}{\\rho_{\\text{water}}} = \\frac{920}{1025} \\approx 0.898 = \\mathbf{89.8\\%}$።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Buoyant Force', termAm: 'ቡያንት ፎርስ (ግፊት ወደ ላይ)', definitionAm: 'በፈሳሽ ውስጥ በሚገኝ አካል ላይ ወደ ላይ የሚገፋ ኃይል፤ ከተገፋው ፈሳሽ ክብደት ጋር እኩል ነው።' },
      { termEn: 'Viscosity', termAm: 'ቪስኮሲቲ (ውስጣዊ ግጭት)', definitionAm: 'ፈሳሽ ለመፍሰስ የሚያሳየው ውስጣዊ መቋቋም።' },
    ],
    examTrapsAm: [
      'በBernoulli ውስጥ በጠባብ ቧንቧ ውስጥ ፍጥነት $v$ ሲጨምር ግፊት $P$ **ይቀንሳል** እንጂ አይጨምርም!',
      'Archimedes\' Principle ላይ $F_B$ የሚወሰነው በ**ፈሳሹ** Density ($\\rho_f$) እንጂ በአካሉ Density አይደለም!',
    ],
    keyTakeawaysAm: [
      'Hydrostatic paradox፡ እኩል ጥልቀትና እኩል ፈሳሽ ያላቸው የተለያየ ቅርጽ ያላቸው እቃዎች ስር ላይ እኩል ግፊት አላቸው።',
      'Bernoulli\'s equation ለIncompressible እና Non-viscous (Ideal) ፍሰት የEnergy Conservation መግለጫ ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ የአንድ ቧንቧ ራዲየስ በግማሽ ቢቀንስ የውሃው ፍጥነት ስንት እጥፍ ይሆናል?',
        answerAm: 'መልስ፡ $A = \\pi r^2$ ስለሆነ ራዲየስ $r/2$ ሲሆን $A$ በ $1/4$ ይቀንሳል፤ ስለዚህ $v$ **4 እጥፍ** ይሆናል!',
      },
    ],
  },

  'phys-mod-ch4': {
    subject: 'physics',
    chapterNumber: 4,
    titleAm: 'ምዕራፍ 4፡ ሙቀት እና ቴርሞዳይናሚክስ (Heat & Thermodynamics)',
    briefOverviewAm: 'የሙቀት መጠንና መስፋፋት፣ Heat Capacity & Phase Changes፣ የሙቀት መተላለፍ (Conduction, Convection, Radiation) እና የቴርሞዳይናሚክስ ሕጎችን ያስተምራል።',
    briefPointsAm: [
      'የሙቀት መለኪያ ቅየራ፡ T_K = T_C + 273.15 እና T_F = (9/5)T_C + 32።',
      'Thermal Expansion፡ ΔL = α L₀ ΔT እና β ≈ 3α (Volume Expansion)።',
      'Heat & Phase Change፡ Q = mcΔT (ሙቀት መጨመር) እና Q = ±mL (Phase ለውጥ — ΔT = 0!)።',
      '1st Law of Thermodynamics፡ ΔU = Q − W (W = ጋዝ ሲሰፋ አዎንታዊ ሥራ)።',
    ],
    examTipAm: 'Adiabatic ሂደት Q = 0 ነው፤ Isothermal ሂደት ΔT = 0 (እና ለIdeal gas ΔU = 0) ነው፤ Isochoric ሂደት ΔV = 0 ስለሆነ W = 0 ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የቴርማል ፊዚክስና ቴርሞዳይናሚክስ መሰረታዊ ሕጎችን ያብራራል። Zeroth Law of Thermodynamics፣ የሙቀት መለኪያዎች (Celsius, Fahrenheit, Kelvin)፣ Linear/Area/Volume Thermal Expansion (እና Bimetallic Strips)፣ Specific Heat & Calorimetry፣ Latent Heat of Fusion & Vaporization፣ ሦስቱ የHeat Transfer መንገዶች (Conduction, Convection, Stefan-Boltzmann Radiation)፣ Ideal Gas Law፣ እንዲሁም 1ኛ እና 2ኛ የቴርሞዳይናሚክስ ሕጎችና Carnot Efficiency ($\\eta = 1 - T_C/T_H$) በምሳሌዎች ተብራርተዋል።',
    learningOutcomesAm: [
      'በCelsius, Fahrenheit እና Kelvin መካከል መቀየር እና Thermal Expansion ማስላት።',
      'Calorimetry ($\\sum Q = 0$) እና Phase Change (በረዶ → ውሃ → እንፋሎት) ስሌቶችን መስራት።',
      'የConduction, Convection እና Radiation ቀመሮችን መጠቀም።',
      'Isothermal, Isobaric, Isochoric እና Adiabatic ሂደቶችን በ1st Law ($\\Delta U = Q - W$) መተንተን።',
      'የHeat Engines እና Carnot Cycle ከፍተኛውን Efficiency (በKelvin!) ማስላት።',
    ],
    sectionsAm: [
      {
        headingAm: '4.1 ሙቀት፣ Thermal Expansion፣ Calorimetry እና Heat Transfer',
        contentAm: `### 4.1.1 Expansion & Phase Change
- **Linear**: $\\Delta L = \\alpha L_0 \\Delta T$፤ **Area**: $\\Delta A = 2\\alpha A_0 \\Delta T$፤ **Volume**: $\\Delta V = 3\\alpha V_0 \\Delta T$።
- **Sensible Heat**: $Q = mc\\Delta T$ ($c_{\\text{water}} = 4186\\text{ J/kg}\\cdot\\text{K}$).
- **Latent Heat**: $Q = mL$ (በዚህ ወቅት ሙቀት አይጨምርም — ሁሉም ጉልበት Bonds ለመስበር ይውላል!)።

### 4.1.2 ሦስቱ የሙቀት መተላለፊያ መንገዶች
1. **Conduction**: $\\mathcal{P} = \\frac{kA(T_H - T_C)}{d}$ (በጠንካራ ቁስ ውስጥ ያለ እንቅስቃሴ)።
2. **Convection**: በፈሳሽ/ጋዝ እንቅስቃሴ (Buoyancy currents)።
3. **Radiation**: $P = \\sigma e A T^4$ (Stefan-Boltzmann Law — Medium አይፈልግም፣ $T$ በKelvin መሆን አለበት!)።`,
      },
      {
        headingAm: '4.2 የቴርሞዳይናሚክስ ሕጎች እና የHeat Engines Efficiency',
        contentAm: `### 4.2.1 First Law ($\\Delta U = Q - W$)
| ሂደት (Process) | ቋሚው መጠን | የ1ኛ ሕግ ውጤት |
| :--- | :--- | :--- |
| **Isobaric** | ግፊት ($P$ ቋሚ) | $W = P\\Delta V$, $\\Delta U = Q - P\\Delta V$ |
| **Isochoric** | ይዘት ($V$ ቋሚ) | $W = 0 \\implies \\Delta U = Q$ |
| **Isothermal** | ሙቀት ($T$ ቋሚ) | $\\Delta U = 0 \\implies Q = W = nRT\\ln(V_f/V_i)$ |
| **Adiabatic** | ሙቀት ልውውጥ የለም ($Q=0$) | $\\Delta U = -W$ ($PV^\\gamma = \\text{const}$) |

### 4.2.2 Second Law & Carnot Efficiency
- ማንኛውም Heat Engine ሙቀትን 100% ወደ ሥራ መቀየር አይችልም (Kelvin-Planck)።
- **Carnot (ከፍተኛ) Efficiency**: $\\eta_{\\max} = 1 - \\frac{T_C}{T_H}$ (**$T_C$ እና $T_H$ በKelvin መግባት ግዴታ ነው!**)`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንድ Carnot Engine በ $327^\\circ\\text{C}$ እና በ $27^\\circ\\text{C}$ መካከል ቢሰራ ከፍተኛው Efficiency ስንት ነው?',
        stepsAm: [
          '1. ወደ Kelvin ቀይር፡ $T_H = 327 + 273 = 600\\text{ K}$፤ $T_C = 27 + 273 = 300\\text{ K}$።',
          '2. $\\eta = 1 - \\frac{300}{600} = 1 - 0.5 = 0.5 = \\mathbf{50\\%}$።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Latent Heat', termAm: 'ሌተንት ሂት (ስውር ሙቀት)', definitionAm: 'የቁስ ሙቀት መጠን ሳይለወጥ Phase (ጠንካራ → ፈሳሽ → ጋዝ) ለመቀየር የሚያስፈልግ ሙቀት።' },
      { termEn: 'Entropy', termAm: 'ኢንትሮፒ (S)', definitionAm: 'የአንድ ሥርዓት የተዘበራረቀ ሁኔታ (Disorder) መለኪያ፤ በተፈጥሮ ሁልጊዜ ይጨምራል ($\Delta S_{\\text{univ}} \\ge 0$)።' },
    ],
    examTrapsAm: [
      'Carnot Efficiency $\\eta = 1 - T_C/T_H$ ውስጥ $T$ን በCelsius ($27/327$) ማስገባት 100% የተሳሳተ ነው — ሁልጊዜ $+273.15$ ደምራችሁ Kelvin አድርጉ!',
    ],
    keyTakeawaysAm: [
      'በ0°C ያለ በረዶ ሲቀልጥ የሙቀት መጠኑ 0°C ላይ ይቆያል፤ Phase እስኪያልቅ ድረስ ΔT = 0 ነው።',
      'First Law የEnergy Conservation ሲሆን፣ Second Law የሂደቶችን አቅጣጫ ይወስናል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ አንድ ጋዝ በAdiabatic መስፋፋት (Expansion) ሲያደርግ የሙቀት መጠኑ ይጨምራል ወይስ ይቀንሳል?',
        answerAm: 'መልስ፡ **ይቀንሳል!** ምክንያቱም $Q=0$ ሆኖ ጋዙ ወደ ውጭ አዎንታዊ ሥራ ($W>0$) ስለሚሰራ $\\Delta U = -W < 0$ ይሆናል (ውስጣዊ ኃይሉና ሙቀቱ ይቀንሳል)።',
      },
    ],
  },

  'phys-mod-ch5': {
    subject: 'physics',
    chapterNumber: 5,
    titleAm: 'ምዕራፍ 5፡ ኦሲሌሽን፣ ሞገዶች እና ኦፕቲክስ (SHM, Waves & Optics)',
    briefOverviewAm: 'Simple Harmonic Motion (Spring & Pendulum)፣ የሞገድ ባህሪያት፣ Doppler Effect፣ Reflection/Refraction (Snell\'s Law)፣ መስታወቶችና ሌንሶችን ያስተምራል።',
    briefPointsAm: [
      'SHM፡ T_spring = 2π√(m/k) (በስበት g አይወሰንም) እና T_pendulum = 2π√(L/g) (በመጠነ-ቁስ m አይወሰንም!)።',
      'Wave Speed፡ v = λf፤ String wave v = √(T/μ)።',
      'Snell\'s Law፡ n₁ sinθ₁ = n₂ sinθ₂፤ Total Internal Reflection የሚሆነው n₁ > n₂ ሆኖ θ₁ > θ_c ሲሆን ነው።',
      'Mirror & Thin Lens Formula፡ 1/f = 1/p + 1/q እና Magnification M = −q/p።',
    ],
    examTipAm: 'ለDiverging (Concave) Lens እና Convex Mirror የFocal length f ሁልጊዜ አሉታዊ (Negative) ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የSimple Harmonic Motion (SHM — Hooke\'s Law, Spring-Mass & Simple Pendulum, Energy in SHM)፣ Mechanical & Sound Waves (Transverse vs Longitudinal, Standing Waves, Resonance, Decibel Scale, Doppler Effect)፣ እንዲሁም የGeometric & Wave Opticsን (Reflection, Snell\'s Law, Total Internal Reflection, Spherical Mirrors, Thin Lenses, Interference & Diffraction) በተሟሉ ቀመሮችና ምሳሌዎች ያስተምራል።',
    learningOutcomesAm: [
      'የSpring እና Pendulum Periodን፣ ከፍተኛ ፍጥነት ($v_{\\max} = \\omega A$) እና ኃይልን ($E = \\frac{1}{2}kA^2$) ማስላት።',
      'የDoppler Effect ቀመርን ($f\' = f\\frac{v \\pm v_o}{v \\mp v_s}$) በትክክለኛው +/- ምልክት መተግበር።',
      'Snell\'s Law እና Critical Angle ($\\sin\\theta_c = n_2/n_1$) ማስላት።',
      'የMirror/Lens እኩልታ ($1/f = 1/p + 1/q$) እና Ray Signs በመጠቀም ምስል (Real/Virtual, Upright/Inverted) መለየት።',
    ],
    sectionsAm: [
      {
        headingAm: '5.1 Simple Harmonic Motion (SHM) እና ሞገዶች (Waves & Doppler)',
        contentAm: `### 5.1.1 SHM ቀመሮች
- $x(t) = A\\cos(\\omega t + \\phi)$, $v_{\\max} = \\omega A$ (በEquilibrium $x=0$ ላይ)፣ $a_{\\max} = \\omega^2 A$ (በጫፍ $x=\\pm A$ ላይ)።
- **Spring**: $\\omega = \\sqrt{k/m}, \\; T = 2\\pi\\sqrt{m/k}$። **Pendulum**: $\\omega = \\sqrt{g/L}, \\; T = 2\\pi\\sqrt{L/g}$።

### 5.1.2 Doppler Effect (ድምጽ)
$$f' = f\\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right)$$
**ወርቃማ ሕግ**፡ Observer እና Source **ሲቀራረቡ** ድግግሞሹ ይጨምራል (ላይኛው $+$, ታችኛው $-$)፤ **ሲራራቁ** ይቀንሳል (ላይኛው $-$, ታችኛው $+$)።`,
      },
      {
        headingAm: '5.2 Optics: Snell\'s Law, Mirrors & Lenses',
        contentAm: `### 5.2.1 Refraction & TIR
- $n = c/v$ እና $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$።
- **Total Internal Reflection (TIR)**: ብርሃን ከወፍራም ($n_1$) ወደ ቀጭን ($n_2 < n_1$) ሲሄድ ብቻ $\\sin\\theta_c = n_2/n_1$።

### 5.2.2 Mirror & Thin Lens Sign Convention
- $f > 0$: Concave Mirror / Converging (Convex) Lens።
- $f < 0$: Convex Mirror / Diverging (Concave) Lens።
- $q > 0 \\implies$ **Real & Inverted** ($M < 0$)፤ $q < 0 \\implies$ **Virtual & Upright** ($M > 0$)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንድ $f = +10\\text{ cm}$ ያለው Converging Lens ፊት በ $15\\text{ cm}$ ርቀት ነገር ቢቀመጥ ምስሉ የት ይፈጠራል? ዓይነቱስ?',
        stepsAm: [
          '1. $\\frac{1}{q} = \\frac{1}{f} - \\frac{1}{p} = \\frac{1}{10} - \\frac{1}{15} = \\frac{3 - 2}{30} = \\frac{1}{30} \\implies q = +30\\text{ cm}$።',
          '2. $M = -\\frac{30}{15} = -2$። ስለዚህ ምስሉ $q>0$ ስለሆነ **Real**፣ $M<0$ ስለሆነ **Inverted** እና **2 እጥፍ የተጉላላ** ነው!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Total Internal Reflection', termAm: 'ሙሉ ውስጣዊ ነጸብራቅ (TIR)', definitionAm: 'ብርሃን ከHigh-$n$ ወደ Low-$n$ በCritical Angle በላይ ሲገባ ሳይወጣ ሙሉ በሙሉ የሚንጸባረቅበት ክስተት (Optical Fiber መሰረት)።' },
    ],
    examTrapsAm: [
      'Pendulumን ከምድር ወደ ጨረቃ ብንወስድ $g$ ስለሚቀንስ Period $T$ ይጨምራል (ሰዓት ይዘገያል)፤ የSpring Period ግን አይለወጥም!',
      'Total Internal Reflection ከአየር ($n=1$) ወደ ውሃ ($n=1.33$) ሲገባ በፍጹም አይከሰትም!',
    ],
    keyTakeawaysAm: [
      'በSHM ላይ Total Energy $E = \\frac{1}{2}kA^2$ ከAmplitude ካሬ ጋር ተመጣጣኝ ነው።',
      'Real Images በስክሪን ላይ መያዝ ይችላሉ (Inverted)፤ Virtual Images ግን አይችሉም (Upright)።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ የDouble-Slit Interference የብሩህ መስመሮች (Constructive) ሁኔታ ምንድን ነው?',
        answerAm: 'መልስ፡ $d\\sin\\theta = m\\lambda$ ($m = 0, 1, 2, \\dots$)፤ የጨለማ (Destructive) ደግሞ $d\\sin\\theta = (m + \\frac{1}{2})\\lambda$።',
      },
    ],
  },

  'phys-mod-ch6': {
    subject: 'physics',
    chapterNumber: 6,
    titleAm: 'ምዕራፍ 6፡ ኤሌክትሮማግኔቲዝም እና ኤሌክትሮኒክስ (Electricity, Magnetism & Electronics)',
    briefOverviewAm: 'Coulomb\'s Law፣ Electric Field & Potential፣ Ohm\'s Law እና Kirchhoff\'s Rules፣ ማግኔቲዝም (Lorentz Force)፣ Faraday\'s Law፣ Diodes/Transistors እና Logic Gatesን ያስተምራል።',
    briefPointsAm: [
      'Coulomb\'s Law፡ F = k|q₁q₂|/r² እና Gauss\'s Law፡ Φ_E = Q_enc / ε₀።',
      'Resistors፡ በSeries R_eq = ΣR_i (I እኩል)፤ በParallel 1/R_eq = Σ(1/R_i) (V እኩል)። ለCapacitors ግን ተገላቢጦሽ ነው!',
      'Kirchhoff\'s Rules፡ Junction Rule (ΣI_in = ΣI_out — Charge Conservation) እና Loop Rule (ΣΔV = 0 — Energy Conservation)።',
      'Lorentz Force፡ F = qvB sinθ (ለሙሉ ኃይል የግድ መንቀሳቀስ አለበት!) እና Faraday\'s Law፡ ε = −N ΔΦ_B/Δt።',
    ],
    examTipAm: 'የCapacitors እና የResistors Series/Parallel ቀመሮች እርስ በርስ ተቃራኒ ናቸው — በCapacitor Series 1/C_eq = Σ1/C_i ሲሆን Parallel C_eq = ΣC_i ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የኤሌክትሪክ እና የማግኔቲዝም መሰረታዊ ሕጎችን (Electrostatics, Gauss\'s Law, Electric Potential, Capacitance, DC Circuits & Kirchhoff\'s Rules, Magnetic Force on Moving Charges & Wires, Ampere\'s Law, Faraday\'s Electromagnetic Induction & Lenz\'s Law) ከዘመናዊ ኤሌክትሮኒክስ (Semiconductors P/N type, Diodes & Rectification, BJT Transistors እና Digital Logic Gates: AND, OR, NOT, NAND, NOR, XOR) ጋር አጣምሮ ያስተምራል።',
    learningOutcomesAm: [
      'Coulomb\'s Law እና Electric Field ($E = kQ/r^2$) በመጠቀም በቻርጆች መካከል ያለውን ኃይል ማስላት።',
      'Series እና Parallel Circuits (Resistors & Capacitors) እና Kirchhoff\'s Loop/Junction Rules መፍታት።',
      'Lorentz Force ($qvB\\sin\\theta$, $ILB\\sin\\theta$) እና Right-Hand Ruleን መተግበር።',
      'Faraday\'s Law እና Lenz\'s Law በመጠቀም የInduced EMF መጠንና አቅጣጫ መወሰን።',
      'የP-N Junction Diode, Transistor Switch እና Logic Gates Truth Tablesን መተንተን።',
    ],
    sectionsAm: [
      {
        headingAm: '6.1 ኤሌክትሮስታቲክስ፣ DC Circuits እና Kirchhoff\'s Rules',
        contentAm: `### 6.1.1 Coulomb, Field, Potential & Capacitance
- $F = \\frac{k|q_1 q_2|}{r^2}$, $E = \\frac{F}{q_0} = \\frac{k|Q|}{r^2}$, $V = \\frac{kQ}{r}$ (Scalar!)።
- **Capacitor**: $C = \\frac{Q}{V} = \\frac{\\kappa\\varepsilon_0 A}{d}$፤ የተከማቸ ኃይል $U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C}$።

### 6.1.2 Ohm\'s Law, Power & Kirchhoff
- $V = IR$, $P = IV = I^2R = \\frac{V^2}{R}$።
- **Kirchhoff Junction ($\\sum I = 0$)**: የቻርጅ ጥበቃ (Charge Conservation)።
- **Kirchhoff Loop ($\\sum \\Delta V = 0$)**: የኃይል ጥበቃ (Energy Conservation)።`,
      },
      {
        headingAm: '6.2 ማግኔቲዝም፣ Electromagnetic Induction እና ኤሌክትሮኒክስ',
        contentAm: `### 6.2.1 ማግኔቲክ ኃይል እና Induction
- $F = qvB\\sin\\theta$ (ቻርጁ ከቆመ $v=0$ ወይም ለ$B$ ትይዩ ከሆነ $\\theta=0$ ኃይሉ **ዜሮ** ነው!)።
- **Faraday & Lenz**: $\\mathcal{E} = -N\\frac{d\\Phi_B}{dt}$ ($\Phi_B = BA\\cos\\theta$)፤ Lenz\'s Law Induced current ሁልጊዜ **የFlux ለውጥን ይቃወማል** ይላል!

### 6.2.2 ሴሚኮንዳክተሮች እና Logic Gates
- **n-type** (Group V impurity እንደ P, As — Majority carriers = Electrons)፤ **p-type** (Group III እንደ B, Al — Majority carriers = Holes)።
- **Diode**: Forward Bias (P ወደ $+$, N ወደ $-$) ካረንት ያሳልፋል (Rectifier)፤ Reverse Bias ይከለክላል።
- **Logic Gates**: AND ($A\\cdot B$), OR ($A+B$), NOT ($\\bar{A}$), NAND ($\\overline{A\\cdot B}$ — Universal Gate!)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'ሁለት $6\\,\\Omega$ እና $3\\,\\Omega$ Resistors በParallel ተያይዘው ከ $12\\text{ V}$ ባትሪ ጋር ተገናኙ። ጠቅላላ $R_{\\text{eq}}$ እና ከባትሪው የሚወጣው ካረንት ስንት ነው?',
        stepsAm: [
          '1. $R_{\\text{eq}} = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{6 \\times 3}{6 + 3} = \\frac{18}{9} = \\mathbf{2\\,\\Omega}$።',
          '2. $I_{\\text{total}} = \\frac{V}{R_{\\text{eq}}} = \\frac{12}{2} = \\mathbf{6\\text{ A}}$።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Lenz\'s Law', termAm: 'የሌንዝ ሕግ', definitionAm: 'Induced current ሁልጊዜ እሱን የፈጠረውን የማግኔቲክ ፍላክስ ለውጥ በሚቃወም አቅጣጫ ይፈሳል (Energy Conservation)።' },
      { termEn: 'Semiconductor', termAm: 'ሴሚኮንዳክተር', definitionAm: 'በConductor እና Insulator መካከል የኤሌክትሪክ ማስተላለፍ ችሎታ ያለው ቁስ (Silicon, Germanium)።' },
    ],
    examTrapsAm: [
      'Magnetic Force በሚንቀሳቀስ ቻርጅ ላይ $F \\perp v$ ስለሆነ **ሥራ ($W=0$) አይሰራም** — ፍጥነቱን (Speed) አይቀይርም፣ አቅጣጫውን ብቻ ይቀይራል!',
    ],
    keyTakeawaysAm: [
      'NAND እና NOR "Universal Gates" ይባላሉ — ማንኛውንም ሌላ Logic Gate ከነሱ ብቻ መስራት ይቻላል።',
      'Transformer የሚሰራው በAC (ተለዋዋጭ Flux) ላይ ብቻ እንጂ በDC ላይ አይሰራም!',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ አንድ $2\\,\\mu\\text{C}$ ቻርጅ በ $4\\text{ T}$ ማግኔቲክ ፊልድ ውስጥ እረፍት ላይ ቢሆን የሚያገኘው ማግኔቲክ ኃይል ስንት ነው?',
        answerAm: 'መልስ፡ **ዜሮ ($0\\text{ N}$)!** ምክንያቱም $F = qvB\\sin\\theta$ ላይ $v = 0$ ነው።',
      },
    ],
  },

  'phys-mod-ch7': {
    subject: 'physics',
    chapterNumber: 7,
    titleAm: 'ምዕራፍ 7፡ የፊዚክስ ሁለገብ አጠቃቀም (Cross-Cutting Applications of Physics)',
    briefOverviewAm: 'ፊዚክስ በግብርና (Soil Physics)፣ በኢንዱስትሪ፣ በሕክምና ምስል (X-ray, Ultrasound, MRI)፣ በአርኪኦሎጂ (Carbon-14)፣ በEarth/Space እና በኃይል ማመንጫ (Hydro/Wind/Solar) ያለውን ሚና ያስረዳል።',
    briefPointsAm: [
      'Soil Physics፡ የአፈር እርጥበት፣ ፖሮሲቲ (Porosity)፣ ሙቀትና Osmotic/Capillary ውሃ መምጠጥ በፊዚክስ ይገለጻሉ።',
      'Medical Imaging፡ X-ray (Ionizing)፣ CT Scan (3D X-ray)፣ MRI (Strong Magnet + Radio waves — No Radiation!)፣ Ultrasound (High frequency sound)።',
      'Radiocarbon Dating (C-14)፡ t_{1/2} = 5,730 ዓመት፤ N(t) = N₀ (1/2)^{t/T_{1/2}}።',
      'Power Generation፡ Hydroelectric P = ηρgQh፤ Wind Turbine Betz Limit ከፍተኛው Efficiency 59.3% (16/27) ነው።',
    ],
    examTipAm: 'በMedical Imaging ውስጥ **X-ray & CT** Ionizing Radiation ይጠቀማሉ፤ **MRI እና Ultrasound** ግን Ionizing Radiation አይጠቀሙም (ለእርጉዝ ሴቶች Ultrasound ተመራጭ ነው)!',
    expandedOverviewAm:
      'ይህ የመጨረሻው የፊዚክስ ምዕራፍ ፊዚክስ ከሌሎች የትምህርትና የሥራ ዘርፎች ጋር እንዴት እንደሚተሳሰር ያሳያል። በግብርና (Soil texture, Bulk density, Porosity, Hydraulic conductivity, Energy balance)፣ በኢንዱስትሪ (Non-destructive testing, Laser, Robotics)፣ በጤና ሳይንስ (X-ray, CT, Ultrasound, MRI, Nuclear Medicine PET/SPECT)፣ በአርኪኦሎጂ (Radiocarbon C-14 dating $T_{1/2}=5730\\text{ yr}$, GPR)፣ በምድርና ህዋ ሳይንስ (Seismic P & S waves, Greenhouse Effect, Kepler\'s Laws)፣ እና በታዳሽ ኃይል ማመንጫ (Hydroelectric, Wind Betz Limit $59.3\\%$, Solar PV) ላይ ያለውን ተግባራዊ ፊዚክስ በዝርዝር ያስተምራል።',
    learningOutcomesAm: [
      'የSoil Physics ጽንሰ-ሐሳቦችን (Porosity, Bulk Density, Capillary Action) ማብራራት።',
      'አራቱን ዋና የMedical Imaging ቴክኖሎጂዎችን (X-ray, CT, Ultrasound, MRI) በአሰራርና ደህንነት ማነጻጸር።',
      'የRadiocarbon Dating ($N(t) = N_0 (1/2)^{t/t_{1/2}}$) ስሌቶችን መስራት።',
      'የHydroelectric Power ($P = \\eta\\rho g Q h$) እና የBetz Limit ($59.3\\%$) ቀመሮችን መተግበር።',
    ],
    sectionsAm: [
      {
        headingAm: '7.1 ፊዚክስ በግብርና፣ ኢንዱስትሪ እና ሕክምና (Medical Imaging)',
        contentAm: `### 7.1.1 ግብርና እና Soil Physics
- **Porosity ($\\phi$)**: $\\phi = 1 - \\frac{\\rho_{\\text{bulk}}}{\\rho_{\\text{particle}}}$ (የአፈር ክፍተቶች መጠን — አየርና ውሃ የሚይዙበት)።
- **Darcy\'s Law**: የውሃ በአፈር ውስጥ መፍሰስ ፍጥነት ከHydraulic Gradient ጋር ተመጣጣኝ ነው።

### 7.1.2 የሕክምና ምስል ቴክኖሎጂዎች (Medical Imaging)
| ቴክኖሎጂ | የሚጠቀመው ሞገድ/ኃይል | Ionizing? | ዋና አጠቃቀም |
| :--- | :--- | :--- | :--- |
| **X-ray / CT** | ከፍተኛ ኃይል EM Wave | **አዎ (Ionizing)** | አጥንት ስብራት፣ ሳንባ፣ 3D ቁርጥ (CT) |
| **Ultrasound** | ከፍተኛ ድግግሞሽ ድምጽ ($>20\\text{ kHz}$) | አይደለም (ደህንነቱ ከፍተኛ) | የእርግዝና ክትትል፣ የልብ Echocardiogram |
| **MRI** | ጠንካራ ማግኔቲክ ፊልድ + Radio Waves | አይደለም | አንጎል፣ ጅማት፣ ለስላሳ ሕብረ ሕዋሳት |`,
      },
      {
        headingAm: '7.2 ፊዚክስ በአርኪኦሎጂ (C-14)፣ ምድር/ህዋ እና ኃይል ማመንጫ',
        contentAm: `### 7.2.1 Radiocarbon Dating (C-14)
- የካርቦን-14 ግማሽ ዕድሜ ($T_{1/2}$) $= 5,730\\text{ ዓመታት}$ ነው።
- ቀመር፡ $N(t) = N_0 \\left(\\frac{1}{2}\\right)^{t / 5730}$። (እስከ ~$50,000$ ዓመት ላሉ ኦርጋኒክ ቅሪቶች ይሰራል፤ ለሚሊዮን ዓመታት ድንጋዮች ግን Potassium-Argon ወይም Uranium-Lead ይጠቀማሉ!)።

### 7.2.2 Hydroelectric & Wind Power
- **Hydroelectric Power** (እንደ ታላቁ የኢትዮጵያ ህዳሴ ግድብ GERD): $P = \\eta \\rho g Q h$ ($Q$ = Volume flow rate በ $\\text{m}^3/\\text{s}$፣ $h$ = Head height)።
- **Wind Power**: $P_{\\text{avail}} = \\frac{1}{2}\\rho A v^3$ (የንፋስ ፍጥነት 2 እጥፍ ሲሆን ኃይሉ **$2^3 = 8$ እጥፍ** ይሆናል!)፤ **Betz Limit**: አንድ የንፋስ ተርባይን ከ $59.3\\%$ በላይ ኃይል መሳብ አይችልም!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'በቁፋሮ የተገኘ የጥንት እንጨት የC-14 መጠን ከህያው ዛፍ $25\\%$ ($1/4$) ቢሆን የእንጨቱ ዕድሜ ስንት ዓመት ነው?',
        stepsAm: [
          '1. $\\frac{N}{N_0} = \\frac{1}{4} = \\left(\\frac{1}{2}\\right)^2 \\implies$ 2 Half-lives አልፈዋል።',
          '2. ዕድሜ $t = 2 \\times 5730 = \\mathbf{11,460\\text{ ዓመታት}}$።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Betz Limit', termAm: 'የቤትዝ ገደብ', definitionAm: 'የንፋስ ተርባይን ከንፋስ ሊወስደው የሚችለው ከፍተኛው ቲዎሬቲካል ቅልጥፍና ($16/27 \\approx 59.3\\%$)።' },
      { termEn: 'Half-Life', termAm: 'ግማሽ ዕድሜ (T₁/₂)', definitionAm: 'የራዲዮአክቲቭ አተሞች ግማሹ ለመበስበስ የሚፈጀው ጊዜ።' },
    ],
    examTrapsAm: [
      'Carbon-14 በሚሊዮን ዓመታት ዕድሜ ያላቸውን ቅሪተ አካላት (ለምሳሌ የ3.2 ሚሊዮን ዓመቷን ሉሲ) ለመለካት **አይጠቅምም** (ከ50,000 ዓመት በኋላ C-14 ጨርሶ ስለሚያልቅ)!',
    ],
    keyTakeawaysAm: [
      'የንፋስ ኃይል ከፍጥነት ኩብ ($v^3$) ጋር ስለሚያድግ የተርባይን ቦታ ምርጫ ወሳኝ ነው።',
      'Seismic S-waves በፈሳሽ ውስጥ ስለማያልፉ የምድር ውጫዊ እምብርት (Outer Core) ፈሳሽ መሆኑን አረጋግጠዋል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ በMRI ውስጥ X-ray ለምን የለም? ደህንነቱስ እንዴት ነው?',
        answerAm: 'መልስ፡ MRI ጠንካራ ማግኔቲክ ፊልድና Radio waves (ዝቅተኛ ኃይል ያለው Non-ionizing radiation) ስለሚጠቀም DNAን አይጎዳም (ሆኖም ብረት/Pacemaker ባለበት ሰው አይፈቀድም)።',
      },
    ],
  },
};
