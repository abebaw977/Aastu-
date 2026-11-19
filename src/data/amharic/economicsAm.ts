import type { AmharicChapterNote } from './types';

export const ECONOMICS_AM_NOTES: Record<string, AmharicChapterNote> = {
  'econ-mod-ch1': {
    subject: 'economics',
    chapterNumber: 1,
    titleAm: 'ምዕራፍ 1፡ የኢኮኖሚክስ መሰረታዊ ጽንሰ-ሐሳቦች (Basics of Economics)',
    briefOverviewAm: 'Scarcity, Choice & Opportunity Cost፣ Microeconomics vs Macroeconomics፣ Positive vs Normative፣ PPF (Production Possibility Frontier) እና የኢኮኖሚ ሥርዓቶችን ያስተምራል።',
    briefPointsAm: [
      'የኢኮኖሚክስ ዋና ችግር Scarcity (ውስን ሀብት vs ገደብ የሌለው ፍላጎት) ነው፤ ይህም Choice እና Opportunity Cost ይፈጥራል።',
      'Microeconomics ግለሰብ/ድርጅትን ሲያጠና Macroeconomics ጠቅላላ የሀገር ኢኮኖሚን (GDP, Inflation, Unemployment) ያጠናል።',
      'PPF በውስጥ = Inefficient፣ በመስመሩ ላይ = Efficient፣ ከመስመሩ ውጭ = Unattainable (በኢኮኖሚ እድገት ወደ ውጭ ይገፋል)።',
      'Positive Economics ("ምን አለ?" — በመረጃ የሚፈተሽ) vs Normative Economics ("ምን መሆን አለበት?" — የእሴት ፍርድ)።',
    ],
    examTipAm: 'PPF ወደ ውጭ የታጠፈ (Concave to origin) የሚሆነው በ**Law of Increasing Opportunity Cost** (ሀብቶች ለሁሉም ምርቶች እኩል ብቁ ስላልሆኑ) ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የኢኮኖሚክስ ሳይንስን መሰረት (Scarcity, Resource Allocation, Opportunity Cost)፣ Microeconomics vs Macroeconomics፣ Positive vs Normative Economics፣ Inductive vs Deductive Reasoning፣ የCircular Flow of Economic Activity ሞዴልን፣ Production Possibility Frontier (PPF) እና Economic Efficiencyን፣ እንዲሁም ሦስቱን የኢኮኖሚ ሥርዓቶች (Capitalist/Free Market, Command/Socialist, Mixed Economy) በጥልቀት ያስተምራል።',
    learningOutcomesAm: [
      'Scarcity ከShortage መለየት እና Opportunity Costን በPPF ላይ ማስላት።',
      'Microeconomics vs Macroeconomics እና Positive vs Normative Statementsን መለየት።',
      'የPPFን ቅርጽ (Concave vs Linear) እና Shift የሚያመጡ ምክንያቶችን ማብራራት።',
      'Capitalist, Command እና Mixed ኢኮኖሚዎች ሦስቱን መሰረታዊ ጥያቄዎች (What, How, For Whom) እንዴት እንደሚመልሱ ማነጻጸር።',
    ],
    sectionsAm: [
      {
        headingAm: '1.1 Scarcity, Opportunity Cost, PPF እና የኢኮኖሚክስ ክፍሎች',
        contentAm: `### 1.1.1 Scarcity vs Shortage & Opportunity Cost
- **Scarcity**: ዘላቂ የሆነ ሁኔታ — የሰው ልጅ ፍላጎት ገደብ የለሽ (Unlimited) ሲሆን ሀብቶች (Land, Labor, Capital, Entrepreneurship) ውስን (Finite) ናቸው።
- **Shortage**: ጊዜያዊ ክስተት — በአንድ ዋጋ ላይ ፍላጎት ከአቅርቦት ሲበልጥ ($Q_d > Q_s$)።
- **Opportunity Cost**: አንዱን አማራጭ ስንመርጥ የምናጣው **ቀጣዩ ምርጥ አማራጭ (Next Best Alternative Foregone)** ዋጋ ነው!

### 1.1.2 Production Possibility Frontier (PPF)
- **በከርቭ ላይ ያሉ ነጥቦች**: ሙሉ የሀብት አጠቃቀም (Full Employment & Efficiency)።
- **ከከርቭ በታች/ውስጥ**: ሥራ አጥነት ወይም ብክነት (Inefficiency)።
- **ከከርቭ በላይ/ውጭ**: አሁን ባለው ሀብትና ቴክኖሎጂ የማይደረስ (Unattainable) — የሚደረሰው በ**Economic Growth** (ተጨማሪ ሀብት ወይም የተሻለ ቴክኖሎጂ) ሲገኝ ብቻ ነው!
- **Concave PPF**: Slope = Marginal Rate of Transformation (MRT)፤ ሀብቶች ልዩ ስለሆኑ MRT እያደገ ይሄዳል (Increasing Opportunity Cost)።`,
      },
      {
        headingAm: '1.2 ሦስቱ መሰረታዊ የኢኮኖሚ ጥያቄዎች እና የኢኮኖሚ ሥርዓቶች',
        contentAm: `### 1.2.1 What, How, and For Whom to Produce?
- **Free Market (Capitalism — Adam Smith)**: በዋጋ ሥርዓት (Price Mechanism / "Invisible Hand") ይመለሳሉ፤ የግል ንብረት መብት የተጠበቀ ነው።
- **Command Economy (Socialism)**: ማዕከላዊ እቅድ ኮሚቴ (Central Planning Board) ይወስናል፤ ሀብት የመንግሥት ነው።
- **Mixed Economy**: የግሉ ዘርፍ ፈጠራን ከመንግሥት ማህበራዊ ጥበቃና Market Failure እርማት ጋር ያጣምራል (አብዛኛው ዓለም የሚከተለው)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'አንዲት ሀገር ከ40 ስንዴ + 10 መኪና ወደ 30 ስንዴ + 12 መኪና ብትሸጋገር የ1 መኪና Opportunity Cost ስንት ስንዴ ነው?',
        stepsAm: [
          '1. ለ2 ተጨማሪ መኪናዎች ($12-10=2$)፣ 10 ስንዴ ($40-30=10$) ተተወ።',
          '2. ስለዚህ የ1 መኪና Opportunity Cost = $\\frac{10}{2} = \\mathbf{5}$ ኩንታል ስንዴ ነው!',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Opportunity Cost', termAm: 'ኦፖርቹኒቲ ኮስት', definitionAm: 'አንድ ውሳኔ ሲወሰን የተተወው ቀጣዩ ምርጥ አማራጭ ዋጋ።' },
      { termEn: 'Ceteris Paribus', termAm: 'ሴተሪስ ፓሪቡስ', definitionAm: '"ሌሎች ሁኔታዎች ሳይቀየሩ ቋሚ ሆነው ሲቀሩ" ማለት ነው።' },
    ],
    examTrapsAm: [
      '"የመንግሥት ድጎማ ለአርሶ አደሩ መሰጠት **አለበት**" የሚል ዓረፍተ ነገር እውነት ቢመስልም **Normative Economics** (እሴት/ፍርድ) እንጂ Positive አይደለም!',
    ],
    keyTakeawaysAm: [
      'Scarcity ምርጫን፣ ምርጫ ደግሞ Opportunity Costን ይወልዳል።',
      'ቴክኖሎጂ በአንድ ምርት ላይ ብቻ ካደገ PPF በዚያኛው ዘንግ በኩል ብቻ ወደ ውጭ ይሰፋል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "Free lunch" የሚባል ነገር በኢኮኖሚክስ የለም የሚባለው ለምንድን ነው?',
        answerAm: 'መልስ፡ አንድ ሰው ምሳውን በነጻ ቢበላም ያን ምሳ ለማዘጋጀት የዋለው ሀብት (ጊዜ፣ ምግብ፣ ጉልበት) ለሌላ ነገር ሊውል ይችል ስለነበር ሁልጊዜ **Opportunity Cost** አለው!',
      },
    ],
  },

  'econ-mod-ch2': {
    subject: 'economics',
    chapterNumber: 2,
    titleAm: 'ምዕራፍ 2፡ የፍላጎት፣ የአቅርቦት እና የElasticity ቲዎሪ (Demand, Supply & Elasticity)',
    briefOverviewAm: 'የፍላጎትና አቅርቦት ሕጎች፣ Shift vs Movement Along the Curve፣ Market Equilibrium፣ Price Ceiling/Floor እና Elasticity (PED, YED, XED, PES)ን ያስተምራል።',
    briefPointsAm: [
      'Law of Demand፡ ዋጋ (P) ሲጨምር የተፈለገው መጠን (Q_d) ይቀንሳል (Inverse relationship)፤ የዋጋ ለውጥ Movement along the curve ብቻ ይፈጥራል።',
      'Non-price factors (ገቢ፣ የሰው ብዛት፣ ምርጫ፣ የተተኪ ዕቃ ዋጋ) ሙሉውን Demand Curve ወደ ቀኝ/ግራ ያሸጋግራሉ (Shift)።',
      'Market Equilibrium፡ Q_d = Q_s (Shortage ሲኖር ዋጋ ይጨምራል፤ Surplus ሲኖር ዋጋ ይቀንሳል)።',
      'Price Elasticity of Demand (|E_d|)： >1 Elastic (ዋጋ ሲቀንስ Total Revenue ይጨምራል!)፣ <1 Inelastic (ዋጋ ሲጨምር TR ይጨምራል!)።',
    ],
    examTipAm: 'Substitutes (ተተኪዎች — ቡና & ሻይ) Positive Cross-Price Elasticity ($E_{xy} > 0$) ሲኖራቸው፣ Complements (ተደጋጋፊዎች — ስኳር & ቡና) Negative ($E_{xy} < 0$) አላቸው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ የገበያ ዋጋ እንዴት እንደሚወሰን የሚያሳየውን የDemand እና Supply ሞዴል በጥልቀት ይተነትናል። Change in Quantity Demanded vs Change in Demand፣ Normal vs Inferior Goods፣ Substitutes vs Complements፣ Market Equilibrium እና Comparative Statics (የDemand/Supply Shift በዋጋና መጠን ላይ ያለው ተጽዕኖ)፣ Price Controls (Price Ceiling → Shortage, Price Floor → Surplus) እና አራቱን የElasticity መለኪያዎች (PED, Income Elasticity, Cross-Price Elasticity, Price Elasticity of Supply) ከTotal Revenue Test ጋር ያስተምራል።',
    learningOutcomesAm: [
      'በMovement Along a Curve እና በCurve Shift መካከል ያለውን ወሳኝ ልዩነት መለየት።',
      'የQ_d እና Q_s ሊኒየር እኩልታዎችን በመፍታት Equilibrium Price & Quantity ማግኘት።',
      'Point እና Midpoint (Arc) ቀመሮችን በመጠቀም Price Elasticity of Demand (PED) ማስላት።',
      'PEDን ከTotal Revenue ጋር አገናኝቶ ለንግድ ዋጋ አወሳሰን መጠቀም።',
    ],
    sectionsAm: [
      {
        headingAm: '2.1 ፍላጎት፣ አቅርቦት፣ Equilibrium እና የመንግሥት የዋጋ ቁጥጥር',
        contentAm: `### 2.1.1 Demand vs Supply Shifts
- **Demand Shifters (TRIBE)**: Tastes, Related goods (Substitutes/Complements), Income (Normal $Y\\uparrow \\implies D\\uparrow$; Inferior $Y\\uparrow \\implies D\\downarrow$), Buyers count, Expectations።
- **Supply Shifters (ROTTEN)**: Resource/Input prices, Other goods, Technology, Taxes & Subsidies, Expectations, Number of sellers።

### 2.1.2 Price Ceiling vs Price Floor
- **Price Ceiling** (ከፍተኛ ዋጋ ገደብ — ከEquilibrium **በታች** ሲጣል ብቻ Effective ነው፤ ለምሳሌ የቤት ኪራይ/ዳቦ ገደብ): **$Q_d > Q_s \\implies$ ዘላቂ Shortage** ይፈጥራል።
- **Price Floor** (ዝቅተኛ ዋጋ ገደብ — ከEquilibrium **በላይ** ሲጣል Effective ነው፤ ለምሳሌ Minimum Wage): **$Q_s > Q_d \\implies$ Surplus** (እና ሥራ አጥነት) ይፈጥራል።`,
      },
      {
        headingAm: '2.2 Elasticity (PED, YED, XED, PES) እና Total Revenue Test',
        contentAm: `### 2.2.1 ቀመሮች እና ትርጓሜ
- **Midpoint PED**:
  $$E_d = \\left|\\frac{Q_2 - Q_1}{(Q_1 + Q_2)/2} \\div \\frac{P_2 - P_1}{(P_1 + P_2)/2}\\right|$$
- **Point PED**: $E_d = \\left|\\frac{dQ_d}{dP} \\cdot \\frac{P}{Q_d}\\right|$
- **Total Revenue ($TR = P \\times Q$)**:
  - **Elastic ($|E_d| > 1$)**: $P$ እና $TR$ በተቃራኒ አቅጣጫ ይሄዳሉ ($P\\downarrow \\implies TR\\uparrow$)።
  - **Inelastic ($|E_d| < 1$)**: $P$ እና $TR$ በተመሳሳይ አቅጣጫ ይሄዳሉ ($P\\uparrow \\implies TR\\uparrow$)።
  - **Unitary ($|E_d| = 1$)**: $TR$ ከፍተኛው (Maximized) ደረጃ ላይ ነው!
- **Income Elasticity ($E_Y$)**: $>0$ Normal good ($>1$ Luxury, $0<E_Y<1$ Necessity)፤ $<0$ Inferior good።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: '$Q_d = 100 - 2P$ እና $Q_s = 20 + 2P$ ከሆነ (ሀ) Equilibrium ዋጋና መጠን ስንት ነው? (ለ) $P = 15$ ላይ PED ስንት ነው?',
        stepsAm: [
          '1. $100 - 2P = 20 + 2P \\implies 80 = 4P \\implies \\mathbf{P^* = 20}$ እና $Q^* = 100 - 2(20) = \\mathbf{60}$።',
          '2. $P=15$ ላይ $Q_d = 100 - 30 = 70$ እና $\\frac{dQ_d}{dP} = -2$።',
          '3. $|E_d| = |-2| \\cdot \\frac{15}{70} = \\frac{30}{70} \\approx \\mathbf{0.43}$ (Inelastic)።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Inferior Good', termAm: 'ኢንፊሪየር ዕቃ', definitionAm: 'የገለሰብ ገቢ ሲጨምር ፍላጎቱ የሚቀንስ ዕቃ ($E_Y < 0$)።' },
      { termEn: 'Deadweight Loss', termAm: 'ዴድዌይት ሎስ', definitionAm: 'በታክስ ወይም በዋጋ ገደብ ምክንያት የሚባክን የማህበራዊ ደህንነት (Consumer + Producer Surplus) ኪሳራ።' },
    ],
    examTrapsAm: [
      'Price Ceiling ከEquilibrium በላይ ከተቀመጠ (እና Price Floor ከEquilibrium በታች ከተቀመጠ) **Non-binding** ናቸው — ገበያው ላይ ምንም ለውጥ አያመጡም!',
    ],
    keyTakeawaysAm: [
      'Linear Demand Curve ላይ Slope ቋሚ ቢሆንም Elasticity ከላይ (Elastic) እስከ ታች (Inelastic) ይቀያየራል!',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ Demand ሲጨምር እና Supply በተመሳሳይ ጊዜ ሲቀንስ በEquilibrium ዋጋ ($P^*$) እና መጠን ($Q^*$) ላይ ምን ይሆናል?',
        answerAm: 'መልስ፡ $P^*$ በእርግጠኝነት **ይጨምራል** ($D\\uparrow \\Rightarrow P\\uparrow$ እና $S\\downarrow \\Rightarrow P\\uparrow$)፤ ነገር ግን $Q^*$ **Ambiguous (የማይታወቅ)** ነው (የአንዱ መጨመር ከሌላው መቀነስ ጋር ስለሚጋጭ)!',
      },
    ],
  },

  'econ-mod-ch3': {
    subject: 'economics',
    chapterNumber: 3,
    titleAm: 'ምዕራፍ 3፡ የሸማች ባህሪ ቲዎሪ (Theory of Consumer Behavior)',
    briefOverviewAm: 'Cardinal Utility (MU እና Law of Diminishing MU) እና Ordinal Utility (Indifference Curves, MRS, Budget Line እና Consumer Equilibrium MU_x/P_x = MU_y/P_y) ያስተምራል።',
    briefPointsAm: [
      'Cardinal Utility፡ እርካታ በቁጥር (Utils) ይለካል ይላል፤ MU = ΔTU/ΔQ። TU ከፍተኛ ሲሆን MU = 0 ነው።',
      'Equi-marginal Principle፡ ሸማቹ ሙሉ እርካታ የሚያገኘው MU_x/P_x = MU_y/P_y እና P_x X + P_y Y = M ሲሆን ነው።',
      'Ordinal Utility (Indifference Curve)፡ ተመሳሳይ እርካታ የሚሰጡ ጥምረቶችን ያሳያል፤ ወደ ታች ያጋደለ፣ Convex እና የማይቋረጡ ናቸው።',
      'Optimal Choice በOrdinal፡ MRS_{xy} = MU_x/MU_y = P_x/P_y (Indifference Curve እና Budget Line Tangency)።',
    ],
    examTipAm: 'Indifference Curves በፍጹም ሊቋረጡ (Intersect) አይችሉም — ምክንያቱም የTransitivity መርህን ስለሚጥስ ነው!',
    expandedOverviewAm:
      'ይህ ምዕራፍ ሸማቾች ውስን በሆነ ገቢያቸው ($M$) ከፍተኛውን እርካታ (Utility Maximization) እንዴት እንደሚያገኙ በሁለት ታላላቅ አቀራረቦች — **Cardinal Utility Approach** (Total & Marginal Utility, Law of Diminishing Marginal Utility, Equi-marginal Principle) እና **Ordinal Utility Approach** (Preferences Axioms: Completeness, Transitivity, Non-satiation; Indifference Curves & Maps, Marginal Rate of Substitution MRS, Budget Constraint & Shifts, Tangency Condition $MRS_{xy} = P_x/P_y$) — በጥልቀት ያስተምራል።',
    learningOutcomesAm: [
      'የCardinal እና Ordinal Utility አቀራረቦችን ልዩነት ማብራራት።',
      'በTotal Utility (TU) እና Marginal Utility (MU) መካከል ያለውን ግንኙነትና Saturation Pointን ማስረዳት።',
      'የIndifference Curveን 4 ባህሪያት እና MRS ($-\\Delta Y/\\Delta X = MU_x/MU_y$) ማስላት።',
      'Consumer Equilibriumን በEqui-marginal ሕግ እና በBudget Line Tangency መፍታት።',
    ],
    sectionsAm: [
      {
        headingAm: '3.1 Cardinal Utility እና Diminishing Marginal Utility',
        contentAm: `### 3.1.1 TU vs MU ግንኙነት
- $MU = \\frac{\\Delta TU}{\\Delta Q} = \\frac{dTU}{dQ}$
- $MU > 0 \\implies TU$ ይጨምራል፤ **$MU = 0 \\implies TU$ ከፍተኛ (Maximum/Saturation) ነው**፤ $MU < 0 \\implies TU$ ይቀንሳል።
- **Consumer Equilibrium (2 Goods)**: $\\frac{MU_x}{P_x} = \\frac{MU_y}{P_y}$ (በእያንዳንዱ ብር የምናገኘው ተጨማሪ እርካታ እኩል ሲሆን) እና $P_x X + P_y Y = M$።`,
      },
      {
        headingAm: '3.2 Ordinal Utility (Indifference Curves & Budget Line)',
        contentAm: `### 3.2.1 4ቱ የIndifference Curve ባህሪያት
1. **Downward Sloping** (ወደ ታች ያጋደለ — አንዱን ስትጨምር ሌላውን መቀነስ አለብህ)።
2. **Convex to the Origin** (በDiminishing MRS ምክንያት)።
3. **Higher IC = Higher Utility** (ወደ ቀኝ/ላይ ያለው IC ይበልጣል)።
4. **Never Intersect** (አይቋረጡም — Transitivity ይጠብቃል)።
*(ልዩ ቅርጾች፡ Perfect Substitutes → ቀጥታ መስመር IC፤ Perfect Complements → L-shaped IC!)*

### 3.2.2 Budget Line & Tangency
- $P_x X + P_y Y = M \\implies \\text{Slope} = -\\frac{P_x}{P_y}$።
- **Tangency Optimum**: $MRS_{xy} = \\frac{MU_x}{MU_y} = \\frac{P_x}{P_y}$።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: '$U(X, Y) = X \\cdot Y$፣ $P_x = 2$, $P_y = 4$, ገቢ $M = 40$ ከሆነ ምርጡን የሸማች ምርጫ $(X^*, Y^*)$ ፈልጉ።',
        stepsAm: [
          '1. $MU_x = \\frac{\\partial U}{\\partial X} = Y$ እና $MU_y = \\frac{\\partial U}{\\partial Y} = X$።',
          '2. Tangency: $\\frac{Y}{X} = \\frac{P_x}{P_y} = \\frac{2}{4} = \\frac{1}{2} \\implies X = 2Y$።',
          '3. በBudget Line ተካ: $2(2Y) + 4Y = 40 \\implies 8Y = 40 \\implies \\mathbf{Y^* = 5}, \\; \\mathbf{X^* = 10}$።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'MRS', termAm: 'ማርጂናል ሬት ኦፍ ሰብስቲቲውሽን', definitionAm: 'ሸማቹ እርካታው ሳይቀንስ አንድ ተጨማሪ $X$ ለማግኘት ለመተው ፈቃደኛ የሆነው የ $Y$ መጠን ($MU_x/MU_y$)።' },
    ],
    examTrapsAm: [
      'የBudget Line ዋጋ $P_x$ ብቻ ሲቀየር Budget Line ይሽከረከራል (Pivots) እንጂ በትይዩ አይሸጋገርም፤ ገቢ $M$ ሲቀየር ብቻ ነው ትይዩ Shift የሚያደርገው!',
    ],
    keyTakeawaysAm: [
      '$MU_x/P_x > MU_y/P_y$ ከሆነ ሸማቹ ብዙ $X$ እና ትንሽ $Y$ በመግዛት እርካታውን ማሳደግ ይችላል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "Diamond-Water Paradox" (ውሃ ለሕይወት ወሳኝ ሆኖ ርካሽ፣ አልማዝ ውድ የሆነው ለምንድን ነው?) በMarginal Utility እንዴት ይፈታል?',
        answerAm: 'መልስ፡ ዋጋ የሚወሰነው በTotal Utility ሳይሆን በ**Marginal Utility (MU)** ነው! ውሃ ብዙ ስለሆነ የመጨረሻው ጠብታ MU ዝቅተኛ ነው፤ አልማዝ ግን እጅግ ውስን ስለሆነ የአንድ አልማዝ MU እጅግ ከፍተኛ ነው።',
      },
    ],
  },

  'econ-mod-ch4': {
    subject: 'economics',
    chapterNumber: 4,
    titleAm: 'ምዕራፍ 4፡ የምርት እና የወጪ ቲዎሪ (Theory of Production & Cost)',
    briefOverviewAm: 'Short Run vs Long Run፣ TP/AP/MP እና Law of Diminishing Returns፣ 3ቱ የምርት ደረጃዎች፣ Returns to Scale እና Short-Run Cost Curves (TC, FC, VC, MC, AC) ያስተምራል።',
    briefPointsAm: [
      'Short Run፡ ቢያንስ አንድ Input ቋሚ (Fixed — እንደ ፋብሪካ/ካፒታል) ነው፤ Long Run፡ ሁሉም Inputs ተለዋዋጭ ናቸው።',
      'Law of Diminishing Marginal Returns (Short Run)፡ ቋሚ ካፒታል ላይ ተጨማሪ ሠራተኛ ሲጨመር ከተወሰነ ነጥብ በኋላ MP_L ይቀንሳል።',
      'Stage II (Economic Region of Production)፡ ከ AP_L ከፍተኛ ነጥብ እስከ MP_L = 0 (TP_L ከፍተኛ) ያለው ምርጡ የምርት ክልል።',
      'MC እና AC ግንኙነት፡ MC ከፍተኛ/ዝቅተኛ የሚሆነውን የAVC እና ATC ዝቅተኛ (Minimum) ነጥብ ከታች ወደ ላይ ያቋርጣል!',
    ],
    examTipAm: 'MC = dTC/dQ = dTVC/dQ ነው — Fixed Cost (TFC) የMC ዋጋ ላይ ምንም ተጽዕኖ የለውም (ምክንያቱም የቋሚ ቁጥር ዴሪቬቲቭ 0 ነው)!',
    expandedOverviewAm:
      'ይህ ምዕራፍ ድርጅቶች ግብዓቶችን (Inputs: Labor $L$, Capital $K$) ወደ ምርት (Output $Q$) እንዴት እንደሚቀይሩ እና የምርት ወጪያቸውን እንዴት እንደሚያሰሉ ይተነትናል። በShort Run ውስጥ የTotal Product ($TP$), Average Product ($AP_L = TP/L$) እና Marginal Product ($MP_L = \\Delta TP/\\Delta L$) ግንኙነት፣ የ3ቱ የምርት ደረጃዎች (Stage I, II, III)፣ በLong Run ውስጥ Isoquants, MRTS እና Returns to Scale (Increasing, Constant, Decreasing)፣ እንዲሁም የShort-Run Cost Curves ($TFC, TVC, TC, AFC, AVC, ATC, MC$) መስተጋብር (U-shaped curves & Mirror Image relation: $MC = w/MP_L$) በጥልቀት ተካተዋል።',
    learningOutcomesAm: [
      'TP, AP እና MP አሰላል እና በStage I, II, III መካከል ያለውን ልዩነት መለየት (ለምን Stage II ብቸኛው ምክንያታዊ ክልል እንደሆነ)።',
      'Diminishing Marginal Returns (Short Run) እና Returns to Scale (Long Run) መለየት።',
      'ሁሉንም የCost ቀመሮች ($TC=TFC+TVC$, $ATC=AFC+AVC$, $MC$) ማስላት።',
      'MC ለምን AVC እና ATCን ዝቅተኛው ነጥባቸው ላይ እንደሚያቋርጥ እና Cost-Product Mirror Imageን ማስረዳት።',
    ],
    sectionsAm: [
      {
        headingAm: '4.1 Production in Short Run & Long Run (Returns to Scale)',
        contentAm: `### 4.1.1 TP, AP, MP እና 3ቱ ደረጃዎች
- **Stage I**: ከ $L=0$ እስከ $AP_L$ ከፍተኛ ($MP_L = AP_L$)። ቋሚ ካፒታል ከመጠን በላይ ስላለ ማምረት አዋጭ ነው።
- **Stage II**: ከ $AP_L$ ከፍተኛ እስከ **$MP_L = 0$ ($TP$ ከፍተኛ)** — **ብቸኛው ኢኮኖሚያዊ የምርት ደረጃ (Rational Stage)!**
- **Stage III**: $MP_L < 0$ ($TP$ ይቀንሳል) — ተጨማሪ ሠራተኛ ምርትን ያበላሻል።

### 4.1.2 Returns to Scale (Long Run — $f(tK, tL)$ vs $t^k f(K,L)$)
- ሁሉንም ግብዓቶች በ $t$ እጥፍ ስናሳድግ ምርቱ ከ $t$ በላይ ካደገ → **Increasing Returns to Scale (IRS)** (ለCobb-Douglas $Q = AK^\\alpha L^\\beta$, $\\alpha+\\beta > 1$)፤ እኩል $t$ → **CRS** ($\\alpha+\\beta=1$)፤ ከ $t$ በታች → **DRS** ($\\alpha+\\beta<1$)።`,
      },
      {
        headingAm: '4.2 የወጪ ኩርቮች (Cost Curves & Mirror Image)',
        contentAm: `### 4.2.1 ዋና የCost ቀመሮች
- $TC = TFC + TVC$, $ATC = \\frac{TC}{Q} = AFC + AVC$ ($AFC = \\frac{TFC}{Q}$ ሁልጊዜ እየቀነሰ ይሄዳል — Rectangular Hyperbola)።
- $MC = \\frac{\\Delta TC}{\\Delta Q} = \\frac{\\Delta TVC}{\\Delta Q}$።
- **Cost-Production Mirror**: $MC = \\frac{w}{MP_L}$ እና $AVC = \\frac{w}{AP_L}$ — $MP_L$ ከፍተኛ ሲሆን $MC$ ዝቅተኛ ነው!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: '$TC(Q) = 100 + 20Q - 2Q^2 + Q^3$ ከሆነ TFC, TVC, AFC, AVC, ATC እና MC ቀመሮችን ፈልጉ።',
        stepsAm: [
          '1. $TFC = 100$ (ያለ $Q$ የቆመው ቋሚ ወጪ)፣ $TVC = 20Q - 2Q^2 + Q^3$።',
          '2. $AFC = 100/Q$, $AVC = 20 - 2Q + Q^2$, $ATC = 100/Q + 20 - 2Q + Q^2$።',
          '3. $MC = \\frac{dTC}{dQ} = \\mathbf{20 - 4Q + 3Q^2}$።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Sunk Cost', termAm: 'ሳንክ ኮስት', definitionAm: 'አንዴ የወጣና ሊመለስ የማይችል ወጪ፤ ለወደፊት ውሳኔ ግምት ውስጥ መግባት የለበትም።' },
    ],
    examTrapsAm: [
      'Implicit Cost (የራስ ጊዜ/ካፒታል Opportunity Cost) በAccounting Profit ውስጥ አይቀነስም፤ በ**Economic Profit** ውስጥ ግን ይቀነሳል ($\\text{Econ Profit} = TR - (\\text{Explicit} + \\text{Implicit})$)!',
    ],
    keyTakeawaysAm: [
      'በLong Run ምንም Fixed Cost የለም ($TC = TVC$)።',
      '$MC < ATC$ ሲሆን $ATC$ ይቀንሳል፤ $MC > ATC$ ሲሆን $ATC$ ይጨምራል፤ $MC = ATC$ ሲሆን $ATC$ ዝቅተኛ (Minimum) ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ $Q = 10 K^{0.6} L^{0.6}$ ምን ዓይነት Returns to Scale አለው?',
        answerAm: 'መልስ፡ $\\alpha + \\beta = 0.6 + 0.6 = 1.2 > 1$ ስለሆነ **Increasing Returns to Scale** አለው።',
      },
    ],
  },

  'econ-mod-ch5': {
    subject: 'economics',
    chapterNumber: 5,
    titleAm: 'ምዕራፍ 5፡ የገበያ መዋቅሮች (Market Structures: Competition, Monopoly, Monopolistic, Oligopoly)',
    briefOverviewAm: 'አራቱን የገበያ መዋቅሮች — Perfect Competition, Pure Monopoly, Monopolistic Competition እና Oligopoly — ከትርፍ ከፍተኛነት (MR=MC) እና Shutdown Point ጋር ያስተምራል።',
    briefPointsAm: [
      'Perfect Competition፡ ብዙ ሻጮች፣ ተመሳሳይ ምርት፣ ነጻ መግቢያ/መውጫ፣ Price Taker (P = MR = AR = Demand)።',
      'Short-Run Shutdown Rule፡ ድርጅት የሚዘጋው P < min(AVC) ሲሆን ብቻ ነው (P ≥ AVC ከሆነ Fixed Cost ለመሸፈን መሥራት ይሻላል!)።',
      'Monopoly፡ አንድ ሻጭ፣ የገበያ ዋጋ ተቆጣጣሪ (Price Maker)፣ P > MR = MC (Deadweight Loss ይፈጥራል!)።',
      'Oligopoly፡ ጥቂት ትላልቅ ድርጅቶች፣ Mutual Interdependence፣ Kinked Demand Curve እና Cartel (OPEC)።',
    ],
    examTipAm: 'በPerfect Competition በLong Run Economic Profit = **ዜሮ (Normal Profit)** ነው — ምክንያቱም ትርፍ ካለ አዳዲስ ድርጅቶች ስለሚገቡ ዋጋ ወደ P = min(ATC) ይወርዳል!',
    expandedOverviewAm:
      'ይህ ምዕራፍ አራቱን ዋና የገበያ መዋቅሮች በሻጮች ብዛት፣ በምርት ልዩነት፣ በመግቢያ/መውጫ እንቅፋቶች (Barriers to Entry) እና በዋጋ የመወሰን ኃይል (Market Power) ይተነትናል። Perfect Competition (Profit Max $P=MC$, Shutdown Point $P < AVC$, Long-Run Zero Economic Profit)፣ Pure Monopoly (Price Maker, $MR < P$, Price Discrimination, Natural Monopoly & Deadweight Loss)፣ Monopolistic Competition (Product Differentiation, Excess Capacity) እና Oligopoly (Interdependence, Game Theory / Prisoner\'s Dilemma, Kinked Demand) በጥልቀት ተብራርተዋል።',
    learningOutcomesAm: [
      'አራቱን የገበያ መዋቅሮች በባህሪያቸው ማነጻጸር።',
      'ለሁሉም የገበያ መዋቅሮች የProfit Maximization ሕግ ($MR = MC$) እና Shutdown Condition ($P < AVC$) መተግበር።',
      'Monopoly ለምን ከPerfect Competition ያነሰ ምርት በውድ ዋጋ እንደሚሸጥ እና Deadweight Loss እንደሚፈጥር ማሳየት።',
      'በOligopoly ውስጥ Cartel (Collusion) እና Nash Equilibrium (Prisoner\'s Dilemma)ን መግለጽ።',
    ],
    sectionsAm: [
      {
        headingAm: '5.1 የአራቱ የገበያ መዋቅሮች ንጽጽር እና ትርፍ ማክሲማይዜሽን',
        contentAm: `| የገበያ ዓይነት | ሻጮች | የምርት ዓይነት | የመግቢያ እንቅፋት | Price Power | Long-Run Profit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Perfect Competition** | እጅግ ብዙ | Homogeneous | የለም | Price Taker ($P=MR$) | **0 (Normal)** |
| **Monopolistic Comp.** | ብዙ | Differentiated | ዝቅተኛ | ትንሽ ($P > MC$) | **0 (Normal)** |
| **Oligopoly** | ጥቂት | Homogeneous/Diff. | ከፍተኛ | ከፍተኛ (Interdependent) | $>0$ ሊኖር ይችላል |
| **Monopoly** | 1 ብቻ | ልዩ (No close sub.) | ፍጹም ከፍተኛ | **Price Maker ($P>MR$)** | **$>0$ (Supernormal)** |`,
      },
      {
        headingAm: '5.2 Shutdown Rule, Price Discrimination እና Oligopoly',
        contentAm: `### 5.2.1 Shutdown vs Break-Even
- **Break-Even Point**: $P = \\min(ATC)$ (Zero economic profit)።
- **Shutdown Point**: $P < \\min(AVC)$ — ዋጋው ተለዋዋጭ ወጪውን (AVC) እንኳን ካልሸፈነ ድርጅቱ በShort Run መዝጋት አለበት (Total Loss $= TFC$)።

### 5.2.2 Price Discrimination (በMonopoly)
ተመሳሳይ ምርትን ለተለያዩ ደንበኞች በተለያየ ዋጋ መሸጥ (ለምሳሌ የተማሪ/አዛውንት ቅናሽ) — Elasticity ከፍተኛ ላለው ደንበኛ ዝቅተኛ ዋጋ መስጠት!`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'የአንድ Competitive ድርጅት $TC = 50 + 10Q + Q^2$ ሆኖ የገበያ ዋጋ $P = 30$ ቢሆን፣ ትርፉን ከፍተኛ የሚያደርገው ምርት $Q$ እና ትርፉ ስንት ነው?',
        stepsAm: [
          '1. በPerfect Competition $P = MR = 30$። $MC = \\frac{dTC}{dQ} = 10 + 2Q$።',
          '2. $MR = MC \\implies 30 = 10 + 2Q \\implies 2Q = 20 \\implies \\mathbf{Q^* = 10}$።',
          '3. $TR = 30(10) = 300$, $TC(10) = 50 + 100 + 100 = 250 \\implies \\text{Profit} = 300 - 250 = \\mathbf{50}$። (እና $P=30 > AVC(10)=20$ ስለሆነ አይዘጋም!)።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Natural Monopoly', termAm: 'ተፈጥሯዊ ሞኖፖሊ', definitionAm: 'ከፍተኛ Economies of Scale ስላለው አንድ ድርጅት ብቻ ቢያመርት ወጪው ከሁለት ይልቅ የሚቀንስበት (ለምሳሌ መብራት፣ ውሃ)።' },
    ],
    examTrapsAm: [
      'Monopoly ሁልጊዜ "የሚችለውን ከፍተኛ ዋጋ" ያስከፍላል ማለት ስህተት ነው! ዋጋውን የሚወስነው $MR = MC$ ላይ ካለው Demand Curve ($P$) ነው እንጂ Demand curveን ዘሎ አይደለም።',
    ],
    keyTakeawaysAm: [
      'Perfect Competition Allocative ($P=MC$) እና Productive ($P=\\min ATC$) Efficiency ሁለቱንም ያሳካል።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ አንድ ድርጅት $P < ATC$ ነገር ግን $P > AVC$ ከሆነ በShort Run መዝጋት አለበት?',
        answerAm: 'መልስ፡ **አይ!** ምንም እንኳን ኪሳራ ቢኖርበትም፣ AVCን ሙሉ በሙሉ ሸፍኖ ከFixed Cost የተወሰነውን ስለሚከፍል፣ መሥራቱ ከመዝጋት ይሻላል (ኪሳራው ከ $TFC$ ያንሳል)።',
      },
    ],
  },

  'econ-mod-ch6': {
    subject: 'economics',
    chapterNumber: 6,
    titleAm: 'ምዕራፍ 6፡ መሰረታዊ የማክሮኢኮኖሚክስ ጽንሰ-ሐሳቦች (Macroeconomics)',
    briefOverviewAm: 'GDP/GNP መለኪያ ዘዴዎች፣ Nominal vs Real GDP፣ ሥራ አጥነት (Unemployment Types)፣ የዋጋ ግሽበት (Inflation) እና የFiscal/Monetary Policiesን ያስተምራል።',
    briefPointsAm: [
      'GDP = C + I + G + (X − M) (Expenditure Approach)፤ GNP = GDP + Net Factor Income from Abroad።',
      'Real GDP በቋሚ የBase Year ዋጋ ይሰላል (የዋጋ ግሽበትን ያስወግዳል)፤ Nominal GDP በወቅቱ ዋጋ ይሰላል።',
      '3 የሥራ አጥነት ዓይነቶች፡ Frictional (ሥራ መፈለግ/መቀየር)፣ Structural (የክህሎት/ቴክኖሎጂ ልዩነት)፣ Cyclical (የኢኮኖሚ መቀዛቀዝ)።',
      'Inflation፡ Demand-Pull ("ብዙ ገንዘብ ጥቂት ዕቃን ሲያሳድድ") እና Cost-Push (የምርት/ነዳጅ/ደመወዝ ወጪ መጨመር)።',
    ],
    examTipAm: 'Natural Rate of Unemployment = Frictional + Structural (Cyclical = 0 ሲሆን "Full Employment" ይባላል — ዜሮ % ሥራ አጥነት ማለት አይደለም!)።',
    expandedOverviewAm:
      'ይህ የመጨረሻው የኢኮኖሚክስ ምዕራፍ ጠቅላላ የሀገር ኢኮኖሚን (Macroeconomics) ዋና መለኪያዎችና ፖሊሲዎች በጥልቀት ያስተምራል። Gross Domestic Product (GDP — Expenditure, Income & Value-Added Approaches, በGDP ውስጥ የማይገቡ ግብይቶች እንደ Second-hand, Transfer payments, Non-market), GDP vs GNP, Nominal vs Real GDP & GDP Deflator, Business Cycle (Peak, Recession, Trough, Recovery), Unemployment Rate & 3 Types, Consumer Price Index (CPI) & Inflation (Demand-Pull vs Cost-Push), እንዲሁም Fiscal Policy (Government Spending & Taxes) እና Monetary Policy (Money Supply, Reserve Ratio & Interest Rates by Central Bank) ተብራርተዋል።',
    learningOutcomesAm: [
      'GDPን በExpenditure Approach ($C+I+G+NX$) ማስላት እና ከGNP ጋር ማነጻጸር።',
      'Nominal GDP, Real GDP, GDP Deflator እና CPI Inflation Rate ማስላት።',
      'Frictional, Structural እና Cyclical ሥራ አጥነትን እና "Full Employment"ን መተንተን።',
      'Expansionary vs Contractionary Fiscal እና Monetary Policies መቼ ጥቅም ላይ እንደሚውሉ ማብራራት።',
    ],
    sectionsAm: [
      {
        headingAm: '6.1 National Income Accounting (GDP, GNP, Real GDP)',
        contentAm: `### 6.1.1 GDP ምንን ያካትታል / አያካትትም?
- **GDP (Gross Domestic Product)**: በአንድ ሀገር **ድንበር ውስጥ** በአንድ ዓመት የተመረቱ **የመጨረሻ (Final)** ዕቃዎችና አገልግሎቶች የገበያ ዋጋ።
  $$GDP = C + I + G + (X - M)$$
- **የማይካተቱ**: Intermediate goods (Double countingን ለማስቀረት), Used/Second-hand goods, Purely financial transactions (Stocks), Transfer payments (ጡረታ/ዕርዳታ), Non-market activities።
- **GDP Deflator** $= \\frac{\\text{Nominal GDP}}{\\text{Real GDP}} \\times 100$።`,
      },
      {
        headingAm: '6.2 ሥራ አጥነት፣ የዋጋ ግሽበት እና የማክሮኢኮኖሚ ፖሊሲዎች',
        contentAm: `### 6.2.1 ሥራ አጥነት እና Inflation
- **Unemployment Rate** $= \\frac{\\text{Unemployed}}{\\text{Labor Force}} \\times 100$ (Labor Force = Employed + Unemployed actively seeking work)።
- **Inflation**: $\\pi = \\frac{CPI_2 - CPI_1}{CPI_1} \\times 100$። ያልተጠበቀ ግሽበት ገንዘብ አበዳሪዎችን (Creditors) ሲጎዳ ተበዳሪዎችን (Debtors) ይጠቅማል!

### 6.2.2 Fiscal vs Monetary Policy
- **Recession (መቀዛቀዝ) ሲኖር** → **Expansionary Policy**: Fiscal ($G\\uparrow, T\\downarrow$)፤ Monetary (Money Supply$\\uparrow$, Interest Rate$\\downarrow$, Reserve Ratio$\\downarrow$)።
- **ከፍተኛ Inflation ሲኖር** → **Contractionary Policy**: Fiscal ($G\\downarrow, T\\uparrow$)፤ Monetary (Money Supply$\\downarrow$, Interest Rate$\\uparrow$, Reserve Ratio$\\uparrow$)።`,
      },
    ],
    workedExamplesAm: [
      {
        problemAm: 'በአንድ ሀገር Employed = 18 ሚሊዮን፣ Unemployed = 2 ሚሊዮን፣ እና ከLabor Force ውጭ ያሉ (ተማሪ/ጡረተኛ) = 10 ሚሊዮን ቢሆኑ Unemployment Rate ስንት ነው?',
        stepsAm: [
          '1. Labor Force = $18 + 2 = 20$ ሚሊዮን (ከLabor Force ውጭ ያሉት አይቆጠሩም!)።',
          '2. Unemployment Rate = $\\frac{2}{20} \\times 100\\% = \\mathbf{10\\%}$።',
        ],
      },
    ],
    glossaryAm: [
      { termEn: 'Stagflation', termAm: 'ስታግፍሌሽን', definitionAm: 'ኢኮኖሚው እየቀዘቀዘ (ሥራ አጥነት እየጨመረ) በተመሳሳይ ጊዜ የዋጋ ግሽበትም የሚያሻቅብበት አደገኛ ሁኔታ።' },
      { termEn: 'Fiscal Policy', termAm: 'ፊስካል ፖሊሲ', definitionAm: 'መንግሥት ኢኮኖሚውን ለማረጋጋት በወጪ (Spending) እና በታክስ (Taxation) የሚጠቀምበት ፖሊሲ።' },
    ],
    examTrapsAm: [
      'ያገለገለ መኪና መሸጥ ወይም በEqub/Stock ገበያ ገንዘብ ማዛወር አዲስ ምርት ስላልሆነ **GDP ውስጥ አይገባም** (የደላላው ኮሚሽን አገልግሎት ብቻ ነው የሚገባው)!',
    ],
    keyTakeawaysAm: [
      'Real GDP በጊዜ ሂደት የእውነተኛ ምርት እድገትን ለመለካት ትክክለኛው መለኪያ ነው።',
      'Monetary Policy የሚመራው በማዕከላዊ ባንክ (National Bank of Ethiopia - NBE) ነው።',
    ],
    reviewQaAm: [
      {
        questionAm: 'ጥያቄ፡ "Discouraged Workers" (ሥራ ፍለጋ ተስፋ ቆርጠው ያቆሙ ሰዎች) በOfficial Unemployment Rate ውስጥ ይቆጠራሉ?',
        answerAm: 'መልስ፡ **አይቆጠሩም!** ባለፉት 4 ሳምንታት በንቃት ሥራ ስላልፈለጉ ከLabor Force ውጭ ይመደባሉ።',
      },
    ],
  },
};
