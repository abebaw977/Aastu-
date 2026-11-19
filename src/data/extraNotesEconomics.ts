import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for Introduction to Economics (Economics - 6 Chapters)
 * Preserves all existing notes and adds microeconomic optimization proofs, elasticity equations,
 * cost curve derivations, macroeconomic multiplier equations, and exam traps for all 6 chapters.
 */
export const EXTRA_NOTES_ECONOMICS: Record<number, MasterNoteSection[]> = {
  // Chapter 1: Basics of Economics
  1: [
    {
      id: 'econ-extra-c1-sec1',
      heading: '1.4 Masterclass: The PPF Mathematical Model, Opportunity Cost & Economic Systems Taxonomy',
      content: `### 1.4.1 The Production Possibilities Frontier (PPF) Mechanics
The PPF is a graphical curve depicting the maximum output combinations of two goods that an economy can produce given fixed resources and technology:
- **Marginal Rate of Transformation (MRT) / Opportunity Cost**:
  The opportunity cost of producing an additional unit of Good $X$ is the quantity of Good $Y$ that must be forgone:
  $$MRT_{XY} = |\\text{Slope of PPF}| = -\\frac{\\Delta Y}{\\Delta X}$$
- **The Law of Increasing Opportunity Cost**:
  As more of Good $X$ is produced, the opportunity cost in terms of Good $Y$ progressively increases.
  - *Economic Reason*: Factors of production are **specialized** and not equally adaptable across all industries.
  - *Geometric Shape*: Renders the PPF **concave (bowed outward) to the origin**.
- **Three Core Points on the PPF Graph**:
  1. **Points on the frontier (Curve)**: Productively efficient; full employment of all available resources.
  2. **Points inside the frontier**: Inefficient; represents idle resources, underemployment, or wasted labor.
  3. **Points outside the frontier**: Unattainable under current resources and technology (attainable only through economic growth, capital accumulation, or international trade).

---

### 1.4.2 Comparative Economic Systems

| Parameter | Pure Command / Socialist Economy | Pure Free-Market / Capitalist Economy | Mixed Economic System |
| :--- | :--- | :--- | :--- |
| **Resource Ownership** | State / Public ownership of all productive means. | Private property rights and capital ownership. | Dual ownership: private enterprise alongside state-owned strategic assets. |
| **Allocation Mechanism** | Central government planning bureau. | **Price Mechanism (Adam Smith\'s "Invisible Hand")**. | Regulated market forces guided by state industrial policy. |
| **Primary Motivation** | Collective social welfare and state quotas. | **Self-interest and private profit maximization**. | Private profit balanced by public interest, social safety nets, and taxes. |
| **Consumer Sovereignty** | Very low; consumers buy government-rationed goods. | **High**; consumer dollar votes dictate production. | Moderate to high; consumer choice subject to consumer protection laws. |`,
      keyTakeaways: [
        'A point inside the PPF indicates unemployment or inefficiency, whereas an outward shift represents true long-term economic growth.',
        'Positive economics describes objective factual reality ("what is"); Normative economics involves subjective value judgments ("what ought to be").'
      ]
    }
  ],

  // Chapter 2: Theory of Demand and Supply
  2: [
    {
      id: 'econ-extra-c2-sec1',
      heading: '2.4 Masterclass: Elasticity Calculus, Total Revenue Test & Market Equilibrium Statics',
      content: `### 2.4.1 Master Elasticity Formulas Matrix

$$\\begin{array}{l|l|l}
\\textbf{Elasticity Concept} & \\textbf{Mathematical Formula} & \\textbf{Economic Interpretation} \\\\ \\hline
\\textbf{Point Price Elasticity of Demand} & E_d = \\frac{dQ_d}{dP} \\cdot \\frac{P}{Q_d} & |E_d| > 1 \\text{ (Elastic)}, \\; |E_d| < 1 \\text{ (Inelastic)}, \\; |E_d| = 1 \\text{ (Unitary)} \\\\
\\textbf{Arc (Midpoint) Price Elasticity} & E_d = \\frac{Q_2 - Q_1}{P_2 - P_1} \\cdot \\frac{P_1 + P_2}{Q_1 + Q_2} & \\text{Direction-neutral elasticity between discrete points.} \\\\
\\textbf{Income Elasticity of Demand } (E_I) & E_I = \\frac{\\%\\Delta Q_d}{\\%\\Delta I} = \\frac{\\Delta Q_d}{\\Delta I} \\cdot \\frac{I}{Q_d} & E_I > 0 \\implies \\textbf{Normal Good} \\; (E_I > 1 \\text{ Luxury; } 0 < E_I < 1 \\text{ Necessity}) \\\\
& & E_I < 0 \\implies \\textbf{Inferior Good} \\\\
\\textbf{Cross-Price Elasticity } (E_{XY}) & E_{XY} = \\frac{\\%\\Delta Q_X}{\\%\\Delta P_Y} = \\frac{\\Delta Q_X}{\\Delta P_Y} \\cdot \\frac{P_Y}{Q_X} & E_{XY} > 0 \\implies \\textbf{Substitute Goods} \\\\
& & E_{XY} < 0 \\implies \\textbf{Complementary Goods} \\\\
& & E_{XY} = 0 \\implies \\textbf{Unrelated (Independent) Goods}
\\end{array}$$

---

### 2.4.2 Total Revenue Test for Price Elasticity of Demand
Total Revenue $TR = P \\times Q$:
- **Elastic Demand ($|E_d| > 1$)**: $P$ and $TR$ move in **opposite directions** (lowering price increases total revenue; raising price lowers total revenue).
- **Inelastic Demand ($|E_d| < 1$)**: $P$ and $TR$ move in the **same direction** (raising price increases total revenue; lowering price reduces total revenue).
- **Unitary Elasticity ($|E_d| = 1$)**: Total Revenue is at its **mathematical maximum** ($dTR/dP = 0$).`,
      equations: [
        {
          name: 'Midpoint Arc Price Elasticity Formula',
          formula: 'E_d = \\frac{Q_2 - Q_1}{P_2 - P_1} \\cdot \\frac{P_1 + P_2}{Q_1 + Q_2}',
          description: 'Calculates price responsiveness without depending on the starting or ending point.'
        }
      ],
      workedExamples: [
        {
          problem: 'Given the market demand function $Q_d = 200 - 4P$ and market supply function $Q_s = 20 + 2P$: (1) Find the equilibrium price $P^*$ and equilibrium quantity $Q^*$; (2) Calculate point price elasticity of demand at market equilibrium; (3) If the government imposes a price ceiling of $P_c = 20\\text{ ETB}$, calculate the resulting shortage.',
          stepByStepSolution: [
            'Step 1 (Equilibrium): Set $Q_d = Q_s \\implies 200 - 4P = 20 + 2P \\implies 6P = 180 \\implies \\mathbf{P^* = 30\\text{ ETB}}$.',
            'Substitute into $Q$: $Q^* = 200 - 4(30) = 200 - 120 = \\mathbf{80\\text{ units}}$.',
            'Step 2 (Point Elasticity): $\\frac{dQ_d}{dP} = -4$. $E_d = -4 \\times \\left(\\frac{30}{80}\\right) = -4 \\times 0.375 = \\mathbf{-1.5}$. Since $|E_d| = 1.5 > 1$, demand is **Price Elastic**.',
            'Step 3 (Price Ceiling of 20): $Q_d(20) = 200 - 4(20) = 120\\text{ units}$. $Q_s(20) = 20 + 2(20) = 60\\text{ units}$.',
            'Shortage $= Q_d - Q_s = 120 - 60 = \\mathbf{60\\text{ units of shortage}}$.'
          ],
          shortcutTip: 'An effective price ceiling is set BELOW equilibrium price, creating permanent shortage (Qd > Qs) and black markets!'
        }
      ],
      keyTakeaways: [
        'A change in a good\'s own price causes a movement ALONG the curve; a change in any non-price factor SHIFTS the entire curve.',
        'Cross-price elasticity positive sign ($+$) indicates substitutes; negative sign ($-$) indicates complements.'
      ]
    }
  ],

  // Chapter 3: Theory of Consumer Behaviour
  3: [
    {
      id: 'econ-extra-c3-sec1',
      heading: '3.4 Masterclass: Cardinal Equimarginal Utility & Ordinal Tangency Optimization Dynamics',
      content: `### 3.4.1 Cardinal Utility Approach: Equimarginal Principle
- **Marginal Utility**: $MU = \\frac{\\Delta TU}{\\Delta Q}$.
- **Law of Diminishing Marginal Utility**: As consumption of a good increases, the additional utility gained from each consecutive unit diminishes.
- **Consumer Equilibrium Rule (Two Goods $X$ and $Y$)**:
  $$\\frac{MU_X}{P_X} = \\frac{MU_Y}{P_Y} = \\dots = \\frac{MU_N}{P_N} = MU_{\\text{money}}, \\qquad P_X X + P_Y Y = M$$

---

### 3.4.2 Ordinal Utility Approach: Indifference Curves & Tangency Condition
- **Indifference Curve (IC)**: Shows all consumption bundles $(X, Y)$ providing identical satisfaction:
  - Slopes downward; strictly convex to origin; higher curves indicate greater utility; two ICs can never intersect.
- **Marginal Rate of Substitution ($MRS_{XY}$)**:
  $$MRS_{XY} = -\\left.\\frac{dY}{dX}\\right|_{U = \\text{const}} = \\frac{MU_X}{MU_Y}$$
- **Budget Constraint**: $P_X X + P_Y Y = M \\implies Y = \\frac{M}{P_Y} - \\left(\\frac{P_X}{P_Y}\\right)X$.
- **Consumer Equilibrium Tangency Condition**:
  $$\\text{Slope of Indifference Curve} = \\text{Slope of Budget Line} \\implies MRS_{XY} = \\frac{P_X}{P_Y} \\iff \\frac{MU_X}{P_X} = \\frac{MU_Y}{P_Y}$$`,
      keyTakeaways: [
        'Consumer equilibrium occurs at the exact point of tangency between the budget line and the highest attainable indifference curve.',
        'Total utility reaches its absolute maximum when marginal utility equals zero ($MU = 0$).'
      ]
    }
  ],

  // Chapter 4: The Theory of Production and Cost
  4: [
    {
      id: 'econ-extra-c4-sec1',
      heading: '4.4 Masterclass: The 3 Stages of Production, Isoquant MRTS & Short-Run Cost Geometry',
      content: `### 4.4.1 The Three Stages of Short-Run Production
- **Marginal Product**: $MP_L = \\frac{\\Delta TP}{\\Delta L}$. **Average Product**: $AP_L = \\frac{TP}{L}$.
1. **Stage I**: From $L = 0$ until $AP_L$ reaches its maximum (where $MP_L = AP_L$). $MP_L > AP_L$; increasing returns; irrational to stop here!
2. **Stage II (The Rational Economic Stage)**: From $\\max AP_L$ ($MP_L = AP_L$) to where $TP$ is maximized ($MP_L = 0$). Both $AP_L$ and $MP_L$ decline, but are positive.
3. **Stage III**: Where $MP_L < 0$ (negative marginal returns); $TP$ declines; completely irrational.

---

### 4.4.2 Short-Run Cost Geometry & Relationships
- $TC = TFC + TVC$.
- $ATC = AFC + AVC = \\frac{TFC}{Q} + \\frac{TVC}{Q}$.
- $MC = \\frac{\\Delta TC}{\\Delta Q} = \\frac{\\Delta TVC}{\\Delta Q}$.
- **Critical Cost Curve Intersection Rule**:
  The **Marginal Cost ($MC$) curve passes through the absolute minimum points** of both the **Average Variable Cost ($AVC$)** and the **Average Total Cost ($ATC$)** curves from below!`,
      keyTakeaways: [
        'Rational production occurs strictly in Stage II where marginal product is positive but diminishing.',
        'Average Fixed Cost ($AFC$) is a rectangular hyperbola that steadily declines toward zero as output expands.'
      ]
    }
  ],

  // Chapter 5: Market Structure
  5: [
    {
      id: 'econ-extra-c5-sec1',
      heading: '5.4 Masterclass: Comparative Market Structures Matrix, Monopoly Deadweight Loss & Game Theory',
      content: `### 5.4.1 Comprehensive Market Structures Matrix

| Market Structure | Number of Firms | Nature of Product | Barriers to Entry | Pricing Power | Demand Curve Faced by Firm | Long-Run Economic Profit |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Perfect Competition** | Vast multitude (infinite). | **Homogeneous (Identical)**. | **Zero barriers**. | **Zero (Price-Taker)**. | **Perfectively elastic (Horizontal)**: $P = AR = MR$. | **Zero ($P = \\min ATC$)**. |
| **Monopoly** | Exactly **One**. | **Unique (No close substitutes)**.| **Extremely high / Blocked**. | **Full (Price-Maker)**. | Downward-sloping market demand; $MR < P$. | **Positive (Supernormal)**. |
| **Monopolistic Competition**| Many. | **Differentiated**. | Low barriers. | Slight (brand loyalty). | Downward-sloping, highly elastic. | **Zero (Excess capacity)**. |
| **Oligopoly** | Few dominant firms. | Homogeneous or Differentiated. | High barriers. | Significant (**Strategic Interdependence**). | Kinked demand curve; Game Theory. | **Positive**. |

---

### 5.4.2 Perfect Competition vs. Monopoly Efficiency Comparison
- **Profit Maximization Condition**: All firms maximize profit where **$MR = MC$**.
- **Perfect Competition**: $P = MR = MC$ $\\implies$ achieves both **Allocative Efficiency** ($P = MC$) and **Productive Efficiency** ($P = \\min ATC$).
- **Monopoly**: Restricts output and charges higher price ($P > MC = MR$), creating **Deadweight Loss (DWL)** and reducing consumer surplus.`,
      keyTakeaways: [
        'In perfect competition, the firm\'s short-run supply curve is its marginal cost curve above the minimum AVC (shutdown point).',
        'Monopolistic competition results in excess capacity in long-run equilibrium ($P > \\min ATC$).'
      ]
    }
  ],

  // Chapter 6: Fundamental Concepts of Macroeconomics
  6: [
    {
      id: 'econ-extra-c6-sec1',
      heading: '6.4 Masterclass: National Income Accounting, Multiplier Economics & Macro Policy Levers',
      content: `### 6.4.1 National Income Accounting: Three Measurement Approaches
1. **Expenditure Approach (Four Spending Sectors)**:
   $$GDP = C + I + G + (X - M)$$
   Where $C = \\text{Consumption}$, $I = \\text{Gross Private Domestic Investment}$, $G = \\text{Government Purchases}$, and $(X - M) = \\text{Net Exports}$.
2. **Nominal vs. Real GDP & GDP Deflator**:
   $$\\text{Real GDP} = \\frac{\\text{Nominal GDP}}{\\text{GDP Deflator}} \\times 100, \\qquad \\text{GDP Deflator} = \\frac{\\text{Nominal GDP}}{\\text{Real GDP}} \\times 100$$
3. **Key Keynesian Multipliers**:
   $$\\text{Marginal Propensity to Consume (MPC)} + \\text{Marginal Propensity to Save (MPS)} = 1$$
   $$\\text{Expenditure Multiplier } (k) = \\frac{1}{1 - MPC} = \\frac{1}{MPS}, \\qquad \\Delta Y = k \\cdot \\Delta I$$
   $$\\text{Tax Multiplier } (k_t) = -\\frac{MPC}{MPS} = -\\frac{MPC}{1 - MPC}$$

---

### 6.4.2 Unemployment & Inflation Metrics
- **Labor Force** $= \\text{Employed} + \\text{Unemployed}$.
- **Unemployment Rate**: $\\text{UR (\\%)} = \\frac{\\text{Unemployed}}{\\text{Labor Force}} \\times 100$.
- **Types of Unemployment**:
  - **Frictional**: Voluntary job-search transition time.
  - **Structural**: Mismatch between worker skills and market demand.
  - **Natural Rate of Unemployment (NRU)** $= \\text{Frictional} + \\text{Structural}$ (Full Employment!).
  - **Cyclical**: Deficient aggregate demand during recessions ($\\,\\text{UR} - \\text{NRU}$).`,
      keyTakeaways: [
        'GDP measures market value of all final goods produced within a nation\'s geographic borders in a year.',
        'Full employment does not mean 0% unemployment; it means zero cyclical unemployment ($UR = NRU$).'
      ]
    }
  ]
};
