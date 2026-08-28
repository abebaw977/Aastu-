import { MasterNoteChapter } from '../types';

export const MATH_MASTER_NOTES: MasterNoteChapter[] = [
  {
    id: 'math-ch1-calculus-differential',
    subject: 'mathematics',
    chapterNumber: 1,
    title: 'Differential Calculus: Limits, Continuity, Derivative Theorems & Optimization',
    gradeLevel: 'Grade 11 & 12 Advanced',
    overview: 'Exhaustive textbook-grade guide to Differential Calculus for the AASTU entrance exam. Covers rigorous limit theorems, indeterminate algebraic forms, trigonometric limits, L’Hôpital’s rule, continuity conditions, differentiability, full derivative tables, chain rules, implicit differentiation, higher-order derivatives, tangent & normal lines, Mean Value Theorem, Rolle’s Theorem, critical points, concavity, and real-world optimization problems.',
    estimatedReadTimeMinutes: 45,
    sections: [
      {
        id: 'math-1-1-limits-deep',
        heading: '1.1 Limits of Functions, Indeterminate Forms & Asymptotic Behavior',
        content: `### 1. The Fundamental Definition of a Limit
The statement $\\lim_{x \\to c} f(x) = L$ means that as $x$ approaches the real number $c$ from both sides (left and right), $f(x)$ becomes arbitrarily close to $L$.

**Existence Criterion**:
$$\\lim_{x \\to c} f(x) = L \\iff \\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = L$$
If the left-hand limit (LHL) and right-hand limit (RHL) are unequal, the two-sided limit **Does Not Exist (DNE)**.

---

### 2. Properties of Limits (Algebraic Limit Laws)
Assuming $\\lim_{x \\to c} f(x) = L$ and $\\lim_{x \\to c} g(x) = M$:
1. **Sum/Difference Law**: $\\lim_{x \\to c} [f(x) \\pm g(x)] = L \\pm M$
2. **Product Law**: $\\lim_{x \\to c} [f(x) \\cdot g(x)] = L \\cdot M$
3. **Constant Multiple Law**: $\\lim_{x \\to c} [k \\cdot f(x)] = k \\cdot L$
4. **Quotient Law**: $\\lim_{x \\to c} \\left[\\frac{f(x)}{g(x)}\\right] = \\frac{L}{M}$, provided $M \\neq 0$.
5. **Power & Root Law**: $\\lim_{x \\to c} [f(x)]^n = L^n$ and $\\lim_{x \\to c} \\sqrt[n]{f(x)} = \\sqrt[n]{L}$ (if $n$ is even, $L > 0$).
6. **Squeeze (Sandwich) Theorem**: If $g(x) \\le f(x) \\le h(x)$ for all $x$ in an open interval containing $c$ (except possibly at $c$) and:
   $$\\lim_{x \\to c} g(x) = \\lim_{x \\to c} h(x) = L \\implies \\lim_{x \\to c} f(x) = L$$
   *Crucial Application*: $\\lim_{x \\to 0} x^2 \\sin\\left(\\frac{1}{x}\\right) = 0$ because $-x^2 \\le x^2 \\sin(1/x) \\le x^2$.

---

### 3. Indeterminate Forms & Resolution Techniques
There are seven classic indeterminate forms in calculus:
$$\\left[\\frac{0}{0}\\right], \\quad \\left[\\frac{\\pm\\infty}{\\pm\\infty}\\right], \\quad [0 \\cdot (\\pm\\infty)], \\quad [\\infty - \\infty], \\quad [0^0], \\quad [\\infty^0], \\quad [1^\\infty]$$

#### Technique A: Factoring & Rationalization
- When encountering $\\frac{0}{0}$ with polynomials, factor out the common root $(x - c)$.
- When square roots are present, multiply the numerator and denominator by the algebraic conjugate:
  $$\\frac{\\sqrt{x + a} - \\sqrt{a}}{x} \\cdot \\frac{\\sqrt{x + a} + \\sqrt{a}}{\\sqrt{x + a} + \\sqrt{a}} = \\frac{(x+a) - a}{x(\\sqrt{x+a} + \\sqrt{a})} = \\frac{1}{\\sqrt{x+a} + \\sqrt{a}}$$

#### Technique B: L'Hôpital's Rule
If $\\lim_{x \\to c} \\frac{f(x)}{g(x)}$ yields directly $\\frac{0}{0}$ or $\\frac{\\pm\\infty}{\\pm\\infty}$, and $f, g$ are differentiable:
$$\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)}$$
*Note*: Differentiate numerator and denominator independently! Do **not** apply the quotient rule.

#### Technique C: Exponential & Power Indeterminate Forms ($1^\\infty, 0^0, \\infty^0$)
Use natural logarithms: Let $y = [f(x)]^{g(x)} \\implies \\ln(y) = g(x) \\cdot \\ln[f(x)]$.
Calculate $K = \\lim_{x \\to c} [g(x) \\ln(f(x))]$, then the final limit is:
$$\\lim_{x \\to c} [f(x)]^{g(x)} = e^K$$

---

### 4. Must-Know Special Limits for AASTU Entrance:
- **Trigonometric Limits**:
  - $\\lim_{x \\to 0} \\frac{\\sin(kx)}{x} = k$
  - $\\lim_{x \\to 0} \\frac{\\tan(kx)}{x} = k$
  - $\\lim_{x \\to 0} \\frac{1 - \\cos(kx)}{x^2} = \\frac{k^2}{2}$
  - $\\lim_{x \\to 0} \\frac{\\arcsin(x)}{x} = 1, \\quad \\lim_{x \\to 0} \\frac{\\arctan(x)}{x} = 1$
- **Exponential & Logarithmic Limits**:
  - $\\lim_{x \\to \\infty} \\left(1 + \\frac{k}{x}\\right)^x = e^k$
  - $\\lim_{x \\to 0} (1 + kx)^{1/x} = e^k$
  - $\\lim_{x \\to 0} \\frac{e^{kx} - 1}{x} = k$
  - $\\lim_{x \\to 0} \\frac{a^x - 1}{x} = \\ln(a) \\quad (a > 0)$
  - $\\lim_{x \\to 0} \\frac{\\ln(1 + x)}{x} = 1$`,
        equations: [
          {
            name: "L'Hôpital's Standard Formulation",
            formula: "\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)} \\quad \\left(\\text{strictly for } \\frac{0}{0} \\text{ or } \\frac{\\pm\\infty}{\\pm\\infty}\\right)",
            explanation: "Differentiate numerator and denominator independently until determinate."
          },
          {
            name: "Cosine Parabolic Limit Identity",
            formula: "\\lim_{x \\to 0} \\frac{1 - \\cos(ax)}{x^2} = \\frac{a^2}{2}",
            explanation: "Derived from half-angle identity $1 - \\cos(ax) = 2\\sin^2(ax/2)$."
          },
          {
            name: "Euler Limit Identity for 1^∞",
            formula: "\\lim_{x \\to c} [f(x)]^{g(x)} = e^{\\lim_{x \\to c} g(x)[f(x) - 1]}",
            explanation: "Ultra-fast direct formula when $f(x) \\to 1$ and $g(x) \\to \\infty$."
          }
        ],
        workedExamples: [
          {
            problem: "Evaluate $\\lim_{x \\to 0} \\left(\\frac{\\sin(3x) + x^2}{\\tan(2x) - x}\\right)$.",
            stepByStepSolution: [
              "Check form: $\\frac{\\sin(0) + 0}{\\tan(0) - 0} = \\frac{0}{0}$ (Indeterminate).",
              "Divide numerator and denominator by $x$: $\\lim_{x \\to 0} \\frac{\\frac{\\sin(3x)}{x} + x}{\\frac{\\tan(2x)}{x} - 1}$.",
              "Apply standard trigonometric limits: $\\lim_{x \\to 0} \\frac{\\sin(3x)}{x} = 3$ and $\\lim_{x \\to 0} \\frac{\\tan(2x)}{x} = 2$.",
              "Substitute: $\\frac{3 + 0}{2 - 1} = \\frac{3}{1} = 3$."
            ],
            shortcutTip: "Small angle approximations: for $x \\to 0$, replace $\\sin(3x) \\approx 3x$ and $\\tan(2x) \\approx 2x$. Then $\\frac{3x + x^2}{2x - x} \\approx \\frac{3x}{x} = 3$ instantly!"
          },
          {
            problem: "Evaluate $\\lim_{x \\to \\infty} \\left(\\frac{x + 4}{x - 1}\\right)^{2x}$.",
            stepByStepSolution: [
              "Check base: $\\lim_{x \\to \\infty} \\frac{x+4}{x-1} = 1$. Power: $2(\\infty) = \\infty$. Form is $[1^\\infty]$.",
              "Use Euler shortcut $\\lim [f(x)]^{g(x)} = e^{\\lim g(x)(f(x) - 1)}$:",
              "$f(x) - 1 = \\frac{x + 4}{x - 1} - 1 = \\frac{x + 4 - (x - 1)}{x - 1} = \\frac{5}{x - 1}$.",
              "Multiply by $g(x) = 2x$: $\\lim_{x \\to \\infty} 2x \\left(\\frac{5}{x - 1}\\right) = \\lim_{x \\to \\infty} \\frac{10x}{x - 1} = 10$.",
              "Therefore, the limit is $e^{10}$."
            ],
            shortcutTip: "For $\\left(\\frac{x + a}{x + b}\\right)^{kx}$, the limit is always $e^{k(a - b)}$. Here: $e^{2(4 - (-1))} = e^{2(5)} = e^{10}$ in 3 seconds!"
          }
        ],
        examTraps: [
          "Applying L'Hôpital's rule when the denominator does NOT approach 0 or $\\infty$. For example, $\\lim_{x \\to 0} \\frac{\\sin x}{x + 1} = \\frac{0}{1} = 0$. Using L'Hôpital blindly yields $\\frac{\\cos 0}{1} = 1$, which is completely incorrect!",
          "Forgetting to verify both one-sided limits at piecewise boundaries or absolute value functions: $\\lim_{x \\to 0^+} \\frac{|x|}{x} = +1$, but $\\lim_{x \\to 0^-} \\frac{|x|}{x} = -1$ (DNE)."
        ],
        keyTakeaways: [
          "Continuity at $x = c$ requires: (1) $f(c)$ is defined, (2) $\\lim_{x \\to c} f(x)$ exists, and (3) $\\lim_{x \\to c} f(x) = f(c)$.",
          "Types of Discontinuity: Removable (hole where limit exists $\\neq f(c)$), Jump (LHL $\\neq$ RHL), Infinite (vertical asymptote)."
        ]
      },
      {
        id: 'math-1-2-differentiation-rules',
        heading: '1.2 Complete Differentiation Rules, Chain Rule & Implicit Differentiation',
        content: `### 1. Definition of the Derivative
The derivative $f'(x)$ or $\\frac{dy}{dx}$ is the limit of the difference quotient:
$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} = \\lim_{t \\to x} \\frac{f(t) - f(x)}{t - x}$$
Geometrically, $f'(x_0)$ is the slope of the tangent line to the graph of $y = f(x)$ at $x = x_0$.

---

### 2. Comprehensive Master Differentiation Rules

| Function $f(x)$ | Derivative $f'(x)$ | Note / Condition |
|---|---|---|
| $c$ (constant) | $0$ | Horizontal line slope $= 0$ |
| $x^n$ | $n x^{n-1}$ | Power Rule (all real $n$) |
| $u(x) \\pm v(x)$ | $u'(x) \\pm v'(x)$ | Sum/Difference Rule |
| $u(x) \\cdot v(x)$ | $u'v + uv'$ | Product Rule |
| $\\frac{u(x)}{v(x)}$ | $\\frac{u'v - uv'}{v^2}$ | Quotient Rule ($v \\neq 0$) |
| $f(g(x))$ | $f'(g(x)) \\cdot g'(x)$ | Chain Rule |
| $\\sin(x)$ | $\\cos(x)$ | Radians |
| $\\cos(x)$ | $-\\sin(x)$ | Negative sign! |
| $\\tan(x)$ | $\\sec^2(x)$ | $1 + \\tan^2(x)$ |
| $\\cot(x)$ | $-\\csc^2(x)$ | Negative |
| $\\sec(x)$ | $\\sec(x)\\tan(x)$ | |
| $\\csc(x)$ | $-\\csc(x)\\cot(x)$ | Negative |
| $e^{kx}$ | $k e^{kx}$ | Natural exponential |
| $a^x$ | $a^x \\ln(a)$ | Base $a > 0, a \\neq 1$ |
| $\\ln(x)$ | $\\frac{1}{x}$ | For $x > 0$ |
| $\\log_a(x)$ | $\\frac{1}{x \\ln(a)}$ | Change of base |
| $\\arcsin(x)$ | $\\frac{1}{\\sqrt{1 - x^2}}$ | $|x| < 1$ |
| $\\arccos(x)$ | $-\\frac{1}{\\sqrt{1 - x^2}}$ | Negative of arcsin |
| $\\arctan(x)$ | $\\frac{1}{1 + x^2}$ | Defined for all $x \\in \\mathbb{R}$ |

---

### 3. Logarithmic Differentiation
Used when differentiating functions of the form $y = [f(x)]^{g(x)}$ or complex products/quotients:
1. Take natural logarithm of both sides: $\\ln(y) = g(x) \\ln(f(x))$.
2. Differentiate implicitly: $\\frac{1}{y} \\frac{dy}{dx} = g'(x)\\ln(f(x)) + g(x) \\cdot \\frac{f'(x)}{f(x)}$.
3. Multiply by $y$:
   $$\\frac{d}{dx}\\left[f(x)^{g(x)}\\right] = f(x)^{g(x)} \\left(g'(x) \\ln(f(x)) + \\frac{g(x) f'(x)}{f(x)}\\right)$$

---

### 4. Implicit Differentiation & Partial Derivative Shortcut
For relations $F(x, y) = 0$ where $y$ cannot be explicitly isolated:
$$\\frac{dy}{dx} = -\\frac{\\partial F / \\partial x}{\\partial F / \\partial y} = -\\frac{F_x}{F_y}$$
where $F_x$ is the partial derivative treating $y$ as a constant, and $F_y$ is the partial derivative treating $x$ as a constant.`,
        equations: [
          {
            name: "Chain Rule General Formulation",
            formula: "\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)",
            explanation: "Differentiate outside function holding inside unchanged, then multiply by derivative of inside."
          },
          {
            name: "Partial Derivative Implicit Shortcut",
            formula: "\\frac{dy}{dx} = -\\frac{F_x}{F_y} \\quad \\text{for } F(x, y) = 0",
            explanation: "Fastest way on AASTU exam to find implicit slopes without tedious algebraic isolation."
          }
        ],
        workedExamples: [
          {
            problem: "Find $\\frac{dy}{dx}$ for the curve $x^3 + y^3 - 9xy = 0$ (Folium of Descartes) at the point $(2, 4)$.",
            stepByStepSolution: [
              "Let $F(x, y) = x^3 + y^3 - 9xy = 0$.",
              "Compute partial with respect to $x$ (treating $y$ as constant): $F_x = 3x^2 - 9y$.",
              "Compute partial with respect to $y$ (treating $x$ as constant): $F_y = 3y^2 - 9x$.",
              "Apply shortcut formula: $\\frac{dy}{dx} = -\\frac{3x^2 - 9y}{3y^2 - 9x} = -\\frac{x^2 - 3y}{y^2 - 3x} = \\frac{3y - x^2}{y^2 - 3x}$.",
              "Evaluate at $(2, 4)$: $\\frac{3(4) - (2)^2}{(4)^2 - 3(2)} = \\frac{12 - 4}{16 - 6} = \\frac{8}{10} = \\frac{4}{5}$."
            ],
            shortcutTip: "Applying $-\\frac{F_x}{F_y}$ directly eliminates 5 lines of product rule equation regrouping!"
          }
        ],
        examTraps: [
          "Forgetting to multiply by the derivative of the inside function in chained powers like $\\frac{d}{dx}[\\sin^3(4x)] = 3\\sin^2(4x) \\cdot \\cos(4x) \\cdot 4 = 12\\sin^2(4x)\\cos(4x)$.",
          "Confusing the derivative of $a^x$ with $x^a$: $\\frac{d}{dx}[x^a] = a x^{a-1}$ (power rule), but $\\frac{d}{dx}[a^x] = a^x \\ln a$ (exponential rule)."
        ],
        keyTakeaways: [
          "Differentiability implies continuity, but continuity does NOT imply differentiability (e.g. sharp corners like $f(x) = |x|$ at $x=0$, or vertical tangents).",
          "The second derivative $f''(x)$ gives the rate of change of the slope (acceleration/concavity)."
        ]
      },
      {
        id: 'math-1-3-applications-extrema',
        heading: '1.3 Tangents, Normals, Mean Value Theorem & Optimization',
        content: `### 1. Tangent and Normal Lines to Curves
At a point $P(x_0, y_0)$ on $y = f(x)$:
- **Slope of Tangent**: $m_T = f'(x_0)$
- **Equation of Tangent**: $y - y_0 = m_T(x - x_0)$
- **Slope of Normal (Perpendicular)**: $m_N = -\\frac{1}{m_T}$ (if $m_T \\neq 0$)
- **Equation of Normal**: $y - y_0 = -\\frac{1}{f'(x_0)}(x - x_0)$
- If $m_T = 0$ (horizontal tangent), normal is vertical: $x = x_0$.
- If $m_T = \\pm\\infty$ (vertical tangent), tangent is $x = x_0$ and normal is $y = y_0$.

---

### 2. Rolle's Theorem & The Mean Value Theorem (MVT)

#### Rolle's Theorem:
If $f(x)$ is:
1. Continuous on $[a, b]$,
2. Differentiable on $(a, b)$, and
3. $f(a) = f(b)$
Then there exists at least one $c \\in (a, b)$ such that:
$$f'(c) = 0$$

#### Mean Value Theorem (MVT):
If $f(x)$ is continuous on $[a, b]$ and differentiable on $(a, b)$, then there exists at least one $c \\in (a, b)$ such that:
$$f'(c) = \\frac{f(b) - f(a)}{b - a}$$
*(Geometric meaning: The instantaneous rate of change at $c$ equals the average rate of change / secant slope over $[a, b]$).*

---

### 3. Critical Points, Extrema & Concavity Tests

1. **Critical Points**: Points $x = c$ in domain where $f'(c) = 0$ or $f'(c)$ is undefined.
2. **First Derivative Test for Local Extrema**:
   - $f'(x)$ changes from $+$ to $-$ at $c \\implies$ **Local Maximum** at $c$.
   - $f'(x)$ changes from $-$ to $+$ at $c \\implies$ **Local Minimum** at $c$.
   - $f'(x)$ does not change sign $\\implies$ Neither (saddle / plateau point).
3. **Second Derivative Test**:
   - If $f'(c) = 0$ and $f''(c) < 0 \\implies$ **Local Maximum** (Concave Down $\\cap$).
   - If $f'(c) = 0$ and $f''(c) > 0 \\implies$ **Local Minimum** (Concave Up $\\cup$).
   - If $f''(c) = 0$, test is inconclusive (use First Derivative Test).
4. **Inflection Points**: Points where concavity changes sign (i.e. $f''(x)$ changes sign and $f(x)$ is continuous).

---

### 4. Optimization Problem Strategy
1. Identify the quantity to be maximized/minimized (Objective function $Q$).
2. Identify constraints and express $Q$ as a single variable function $Q(x)$.
3. Determine physical/domain boundaries.
4. Set $Q'(x) = 0$, find feasible critical numbers, and verify optimality via $Q''(x)$.`,
        equations: [
          {
            name: "Mean Value Theorem Equation",
            formula: "f'(c) = \\frac{f(b) - f(a)}{b - a} \\quad \\text{for some } c \\in (a, b)",
            explanation: "Equates instantaneous tangent slope with secant slope."
          },
          {
            name: "Second Derivative Test for Concavity",
            formula: "f''(x) > 0 \\implies \\text{Concave Up } (\\cup), \\quad f''(x) < 0 \\implies \\text{Concave Down } (\\cap)",
            explanation: "Inflection point occurs where $f''(x) = 0$ and concavity flips."
          }
        ],
        workedExamples: [
          {
            problem: "Find the dimensions of the rectangular fence of maximum area that can be enclosed with 120 meters of fencing, given that one side is against a straight river (no fencing needed on that side).",
            stepByStepSolution: [
              "Let length parallel to river be $L$ and width perpendicular to river be $W$.",
              "Constraint: $L + 2W = 120 \\implies L = 120 - 2W$.",
              "Objective Function: Area $A = L \\cdot W = (120 - 2W)W = 120W - 2W^2$.",
              "Take derivative: $A'(W) = 120 - 4W = 0 \\implies 4W = 120 \\implies W = 30\\text{ m}$.",
              "Calculate length: $L = 120 - 2(30) = 60\\text{ m}$.",
              "Verify maximum: $A''(W) = -4 < 0$ (Confirms local and global maximum).",
              "Maximum Area: $A = 60 \\times 30 = 1800\\text{ m}^2$."
            ],
            shortcutTip: "In single-constrained linear perimeter problems, optimal allocation divides the budget equally among opposing directions: $2W = 60 \\implies W = 30$ and $L = 60$!"
          }
        ],
        examTraps: [
          "Confusing inflection points with local extrema. At an inflection point, $f''(x) = 0$, but $f'(x)$ does not necessarily equal $0$ (e.g. $f(x) = x^3 + x$ at $x=0$).",
          "Forgetting to check boundary endpoints when finding absolute (global) maximum/minimum on a closed interval $[a, b]$."
        ],
        keyTakeaways: [
          "Extreme Value Theorem: Any continuous function on a closed interval $[a, b]$ is guaranteed to attain both an absolute maximum and an absolute minimum.",
          "Tangent line slope $m_T$ and normal line slope $m_N$ always satisfy $m_T \\cdot m_N = -1$."
        ]
      }
    ]
  },
  {
    id: 'math-ch2-integral-calculus',
    subject: 'mathematics',
    chapterNumber: 2,
    title: 'Integral Calculus: Integration Techniques, Definite Integrals, Areas & Volumes',
    gradeLevel: 'Grade 11 & 12 Advanced',
    overview: 'Mastery of Indefinite Integrals, U-Substitution, Tabular Integration by Parts (DI Method), Trigonometric Integrals, Partial Fractions Decomposition, Fundamental Theorem of Calculus Parts 1 & 2, Area Between Curves, and Solids of Revolution (Disk, Washer & Shell methods).',
    estimatedReadTimeMinutes: 40,
    sections: [
      {
        id: 'math-2-1-integration-methods',
        heading: '2.1 Standard Antiderivatives, Substitution & Tabular Integration by Parts',
        content: `### 1. Indefinite Integrals & Master Antiderivative Table

| Function $f(x)$ | Antiderivative $\\int f(x) dx$ |
|---|---|
| $x^n$ | $\\frac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)$ |
| $\\frac{1}{x}$ | $\\ln|x| + C$ |
| $e^{kx}$ | $\\frac{1}{k} e^{kx} + C$ |
| $a^x$ | $\\frac{a^x}{\\ln a} + C$ |
| $\\sin(kx)$ | $-\\frac{1}{k} \\cos(kx) + C$ |
| $\\cos(kx)$ | $\\frac{1}{k} \\sin(kx) + C$ |
| $\\sec^2(kx)$ | $\\frac{1}{k} \\tan(kx) + C$ |
| $\\csc^2(kx)$ | $-\\frac{1}{k} \\cot(kx) + C$ |
| $\\sec(x)\\tan(x)$ | $\\sec(x) + C$ |
| $\\csc(x)\\cot(x)$ | $-\\csc(x) + C$ |
| $\\tan(x)$ | $\\ln|\\sec x| + C = -\\ln|\\cos x| + C$ |
| $\\cot(x)$ | $\\ln|\\sin x| + C$ |
| $\\sec(x)$ | $\\ln|\\sec x + \\tan x| + C$ |
| $\\csc(x)$ | $-\\ln|\\csc x + \\cot x| + C$ |
| $\\frac{1}{x^2 + a^2}$ | $\\frac{1}{a} \\arctan\\left(\\frac{x}{a}\\right) + C$ |
| $\\frac{1}{\\sqrt{a^2 - x^2}}$ | $\\arcsin\\left(\\frac{x}{a}\\right) + C$ |
| $\\frac{1}{x^2 - a^2}$ | $\\frac{1}{2a} \\ln\\left|\\frac{x - a}{x + a}\\right| + C$ |

---

### 2. Integration by Substitution (U-Sub)
When the integrand contains a composite function and its derivative:
$$\\int f(g(x)) g'(x) \\, dx = \\int f(u) \\, du \\quad (\\text{where } u = g(x), \\, du = g'(x)dx)$$

**Special Derivative-Over-Function Pattern**:
$$\\int \\frac{f'(x)}{f(x)} \\, dx = \\ln|f(x)| + C$$
$$\\int [f(x)]^n f'(x) \\, dx = \\frac{[f(x)]^{n+1}}{n+1} + C \\quad (n \\neq -1)$$

---

### 3. Integration by Parts & The Ultra-Fast Tabular (DI) Method
$$\\int u \\, dv = u v - \\int v \\, du$$

#### Priority for choosing $u$ using **LIATE**:
1. **L** - Logarithmic: $\\ln(x), \\log_2(x)$
2. **I** - Inverse Trig: $\\arctan(x), \\arcsin(x)$
3. **A** - Algebraic: $x^3, 4x^2, x+1$
4. **T** - Trigonometric: $\\sin(x), \\cos(x)$
5. **E** - Exponential: $e^x, 3^x$

#### The Tabular (DI) Shortcut:
For integrands of the form $P(x) \\cdot e^{kx}$, $P(x) \\cdot \\sin(kx)$, or $P(x) \\cdot \\cos(kx)$ where $P(x)$ is a polynomial:
1. Column **D**: Write $P(x)$ and differentiate repeatedly down to $0$.
2. Column **I**: Write the second factor and integrate down repeatedly.
3. Assign alternating signs $(+, -, +, -)$ to products along diagonal arrows.`,
        equations: [
          {
            name: "Derivative-Over-Function Shortcut",
            formula: "\\int \\frac{f'(x)}{f(x)} \\, dx = \\ln|f(x)| + C",
            explanation: "Solves fractions where numerator is derivative of denominator in 2 seconds."
          },
          {
            name: "Integration by Parts Formula",
            formula: "\\int u \\, dv = uv - \\int v \\, du",
            explanation: "Product rule in reverse. Use LIATE rule for setting $u$."
          }
        ],
        workedExamples: [
          {
            problem: "Evaluate $\\int x^2 e^{3x} \\, dx$.",
            stepByStepSolution: [
              "Set up Tabular DI:",
              "D column: $x^2 \\to 2x \\to 2 \\to 0$.",
              "I column: $e^{3x} \\to \\frac{1}{3}e^{3x} \\to \\frac{1}{9}e^{3x} \\to \\frac{1}{27}e^{3x}$.",
              "Multiply diagonally with alternating signs:",
              "$+(x^2)\\left(\\frac{1}{3}e^{3x}\\right) - (2x)\\left(\\frac{1}{9}e^{3x}\\right) + (2)\\left(\\frac{1}{27}e^{3x}\\right) + C$.",
              "Factored result: $e^{3x}\\left(\\frac{x^2}{3} - \\frac{2x}{9} + \\frac{2}{27}\\right) + C$."
            ],
            shortcutTip: "Tabular DI takes 15 seconds compared to 2 full rounds of manual integration by parts!"
          }
        ],
        examTraps: [
          "Forgetting the constant of integration $+ C$ on indefinite integrals.",
          "Forgetting the $\\frac{1}{a}$ factor in $\\int \\frac{1}{x^2 + a^2} dx = \\frac{1}{a}\\arctan(x/a) + C$, while $\\int \\frac{1}{\\sqrt{a^2 - x^2}} dx = \\arcsin(x/a) + C$ (no $1/a$ outside!)."
        ],
        keyTakeaways: [
          "Partial Fractions Rule: If denominator has distinct linear factors $\\frac{P(x)}{(x-a)(x-b)} = \\frac{A}{x-a} + \\frac{B}{x-b}$. Use Heaviside Cover-Up method for instant coefficients.",
          "Always check if degree of numerator $\\ge$ degree of denominator; if so, perform polynomial long division first!"
        ]
      },
      {
        id: 'math-2-2-definite-areas-volumes',
        heading: '2.2 Definite Integrals, Symmetry, Area Between Curves & Volumes of Revolution',
        content: `### 1. Fundamental Theorem of Calculus (FTC)

#### FTC Part 1 (Derivative of Integral):
If $F(x) = \\int_{a}^{g(x)} f(t) \\, dt$, then by Leibniz rule:
$$F'(x) = \\frac{d}{dx}\\left[\\int_{u(x)}^{v(x)} f(t) \\, dt\\right] = f(v(x)) \\cdot v'(x) - f(u(x)) \\cdot u'(x)$$

#### FTC Part 2 (Evaluation Theorem):
If $f(x)$ is continuous on $[a, b]$ and $F'(x) = f(x)$:
$$\\int_{a}^{b} f(x) \\, dx = F(b) - F(a) = [F(x)]_a^b$$

---

### 2. Definite Integral Symmetry Shortcuts
For integrals over symmetric bounds $[-a, a]$:
- If $f(x)$ is **ODD** ($f(-x) = -f(x)$):
  $$\\int_{-a}^{a} f(x) \\, dx = 0 \\quad (\\text{Instant!})$$
  *(Examples of odd functions: $\\sin x, x^3, x\\cos x, \\tan x$)*
- If $f(x)$ is **EVEN** ($f(-x) = f(x)$):
  $$\\int_{-a}^{a} f(x) \\, dx = 2 \\int_{0}^{a} f(x) \\, dx$$
  *(Examples of even functions: $\\cos x, x^2, x^4, |x|, x\\sin x$)*

---

### 3. Area Between Two Intersecting Curves
To find the area bounded by $y = f(x)$ and $y = g(x)$ from $x = a$ to $x = b$:
$$A = \\int_{a}^{b} [y_{\\text{top}} - y_{\\text{bottom}}] \\, dx = \\int_{a}^{b} [f(x) - g(x)] \\, dx$$
If integrating with respect to $y$:
$$A = \\int_{c}^{d} [x_{\\text{right}} - x_{\\text{left}}] \\, dy$$

**Archimedes Parabola-Line Shortcut**:
The area bounded by a parabola $y = ax^2 + bx + c$ and a secant line intersecting it at $x_1$ and $x_2$ is:
$$A = \\frac{|a|}{6}(x_2 - x_1)^3$$

---

### 4. Volumes of Solids of Revolution
1. **Disk Method** (Rotation about $x$-axis, no gap):
   $$V = \\pi \\int_{a}^{b} [R(x)]^2 \\, dx$$
2. **Washer Method** (Rotation about $x$-axis, with inner hole):
   $$V = \\pi \\int_{a}^{b} \\left([R_{\\text{outer}}(x)]^2 - [r_{\\text{inner}}(x)]^2\\right) \\, dx$$
3. **Cylindrical Shell Method** (Rotation about $y$-axis):
   $$V = 2\\pi \\int_{a}^{b} x \\cdot f(x) \\, dx \\quad (x = \\text{radius}, \\, f(x) = \\text{height})$$`,
        equations: [
          {
            name: "Leibniz Integral Derivative Rule",
            formula: "\\frac{d}{dx}\\left[\\int_{a}^{g(x)} f(t) dt\\right] = f(g(x)) \\cdot g'(x)",
            explanation: "Differentiates integral with variable upper bound without integrating."
          },
          {
            name: "Archimedes Parabolic Area Shortcut",
            formula: "A = \\frac{|a|}{6}(x_2 - x_1)^3",
            explanation: "Calculates area between any parabola $y=ax^2+\\dots$ and line in 5 seconds."
          },
          {
            name: "Washer Volume Formula",
            formula: "V = \\pi \\int_{a}^{b} \\left(R_{\\text{out}}^2 - r_{\\text{in}}^2\\right) dx",
            explanation: "Volume of solid of revolution around horizontal axis."
          }
        ],
        workedExamples: [
          {
            problem: "Find $\\frac{d}{dx} \\left[ \\int_{0}^{x^3} \\sqrt{1 + t^2} \\, dt \\right]$.",
            stepByStepSolution: [
              "Apply FTC Part 1 / Leibniz Rule: $\\frac{d}{dx}\\int_a^{g(x)} f(t)dt = f(g(x)) \\cdot g'(x)$.",
              "Here $f(t) = \\sqrt{1 + t^2}$ and $g(x) = x^3$.",
              "Substitute $g(x)$ into $f$: $f(x^3) = \\sqrt{1 + (x^3)^2} = \\sqrt{1 + x^6}$.",
              "Differentiate upper limit: $g'(x) = 3x^2$.",
              "Multiply: $3x^2 \\sqrt{1 + x^6}$."
            ],
            shortcutTip: "Never attempt to integrate $f(t)$ first—substitute the upper bound and multiply by its derivative!"
          }
        ],
        examTraps: [
          "Subtracting in Washer method as $(R - r)^2$ instead of $R^2 - r^2$. Remember: $(R^2 - r^2) \\neq (R - r)^2$!",
          "Forgetting to find intersection points to verify which curve is on top over each interval."
        ],
        keyTakeaways: [
          "Odd function over $[-a, a] \\implies 0$. Check for odd symmetry immediately when symmetric limits are given.",
          "Average value of a function $f(x)$ on $[a, b]$ is $f_{\\text{avg}} = \\frac{1}{b - a} \\int_{a}^{b} f(x) dx$."
        ]
      }
    ]
  },
  {
    id: 'math-ch3-vectors-matrices',
    subject: 'mathematics',
    chapterNumber: 3,
    title: '3D Analytic Geometry, Vector Calculus & Matrix Algebra',
    gradeLevel: 'Grade 11 & 12 Advanced',
    overview: 'Complete master guide for 3D coordinate geometry, vector operations, dot & cross products, projections, vector equations of lines, planes in 3D, distances, matrix determinants, inverses, and Cramer’s Rule.',
    estimatedReadTimeMinutes: 35,
    sections: [
      {
        id: 'math-3-1-vector-operations',
        heading: '3.1 3D Vectors, Dot Product, Cross Product & Geometric Applications',
        content: `### 1. Vector Basics in 3D
Given vectors $\\vec{u} = \\langle u_1, u_2, u_3 \\rangle = u_1\\hat{i} + u_2\\hat{j} + u_3\\hat{k}$ and $\\vec{v} = \\langle v_1, v_2, v_3 \\rangle$:
- **Magnitude**: $|\\vec{u}| = \\sqrt{u_1^2 + u_2^2 + u_3^2}$
- **Unit Vector**: $\\hat{u} = \\frac{\\vec{u}}{|\\vec{u}|}$ (has magnitude $1$)
- **Vector Addition**: $\\vec{u} + \\vec{v} = \\langle u_1 + v_1, u_2 + v_2, u_3 + v_3 \\rangle$
- **Direction Cosines**: $\\cos(\\alpha) = \\frac{u_1}{|\\vec{u}|}, \\, \\cos(\\beta) = \\frac{u_2}{|\\vec{u}|}, \\, \\cos(\\gamma) = \\frac{u_3}{|\\vec{u}|}$, where $\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1$.

---

### 2. The Dot (Scalar) Product & Projections
$$\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2 + u_3 v_3 = |\\vec{u}| |\\vec{v}| \\cos(\\theta)$$

- **Angle Formula**: $\\cos(\\theta) = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| |\\vec{v}|}$
- **Orthogonality (Perpendicularity) Test**:
  $$\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$$
- **Scalar Projection of $\\vec{u}$ onto $\\vec{v}$**:
  $$\\text{scal}_{\\vec{v}}(\\vec{u}) = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{v}|}$$
- **Vector Projection of $\\vec{u}$ onto $\\vec{v}$**:
  $$\\text{proj}_{\\vec{v}}(\\vec{u}) = \\left(\\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{v}|^2}\\right) \\vec{v}$$

---

### 3. The Cross (Vector) Product
The cross product produces a vector **perpendicular to both $\\vec{u}$ and $\\vec{v}$**:
$$\\vec{u} \\times \\vec{v} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{vmatrix} = \\hat{i}(u_2 v_3 - u_3 v_2) - \\hat{j}(u_1 v_3 - u_3 v_1) + \\hat{k}(u_1 v_2 - u_2 v_1)$$

- **Magnitude**: $|\\vec{u} \\times \\vec{v}| = |\\vec{u}| |\\vec{v}| \\sin(\\theta)$
- **Parallel / Collinear Test**:
  $$\\vec{u} \\parallel \\vec{v} \\iff \\vec{u} \\times \\vec{v} = \\vec{0} \\iff \\frac{u_1}{v_1} = \\frac{u_2}{v_2} = \\frac{u_3}{v_3}$$
- **Area of Parallelogram formed by $\\vec{u}, \\vec{v}$**: $A = |\\vec{u} \\times \\vec{v}|$
- **Area of Triangle formed by vertices $A, B, C$**:
  $$A_{\\Delta} = \\frac{1}{2} |\\vec{AB} \\times \\vec{AC}|$$
- **Scalar Triple Product (Volume of Parallelepiped)**:
  $$V = |\\vec{u} \\cdot (\\vec{v} \\times \\vec{w})| = \\left| \\begin{vmatrix} u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\\\ w_1 & w_2 & w_3 \\end{vmatrix} \\right|$$
  *(If Volume $= 0$, the three vectors are **Coplanar**).*`,
        equations: [
          {
            name: "Angle Between Vectors",
            formula: "\\cos(\\theta) = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| |\\vec{v}|}",
            explanation: "Valid for all non-zero vectors in 2D and 3D."
          },
          {
            name: "Vector Cross Product Definition",
            formula: "\\vec{u} \\times \\vec{v} = (u_2 v_3 - u_3 v_2)\\hat{i} - (u_1 v_3 - u_3 v_1)\\hat{j} + (u_1 v_2 - u_2 v_1)\\hat{k}",
            explanation: "Yields a normal vector obeying the Right-Hand Rule."
          },
          {
            name: "Coplanar Condition (Scalar Triple Product)",
            formula: "\\vec{u} \\cdot (\\vec{v} \\times \\vec{w}) = 0",
            explanation: "Three vectors lie on the exact same plane if their scalar triple determinant is zero."
          }
        ],
        workedExamples: [
          {
            problem: "Find the value of $k$ such that the vectors $\\vec{a} = \\langle 2, -1, 3 \\rangle$ and $\\vec{b} = \\langle 4, k, -2 \\rangle$ are perpendicular.",
            stepByStepSolution: [
              "Two vectors are perpendicular if and only if their dot product equals zero: $\\vec{a} \\cdot \\vec{b} = 0$.",
              "Compute dot product: $(2)(4) + (-1)(k) + (3)(-2) = 0$.",
              "Simplify: $8 - k - 6 = 0 \\implies 2 - k = 0 \\implies k = 2$."
            ],
            shortcutTip: "Mental math: $2(4) + 3(-2) = 8 - 6 = 2$, so $k$ must equal $2$ to cancel out!"
          }
        ],
        examTraps: [
          "Cross product is ANTI-commutative: $\\vec{a} \\times \\vec{b} = -(\\vec{b} \\times \\vec{a})$. Switching the order reverses the vector direction.",
          "Confusing vector projection with scalar projection. Scalar projection is a number (length with sign); vector projection is a vector multiplied by $\\vec{v}$."
        ],
        keyTakeaways: [
          "Dot product yields a SCALAR; Cross product yields a VECTOR.",
          "$\\vec{u} \\cdot \\vec{u} = |\\vec{u}|^2$ and $\\vec{u} \\times \\vec{u} = \\vec{0}$."
        ]
      },
      {
        id: 'math-3-2-lines-planes-matrices',
        heading: '3.2 Equations of Lines, Planes in 3D & Matrices / Determinants',
        content: `### 1. Equations of Lines in 3D Space
A line passing through point $P_0(x_0, y_0, z_0)$ with direction vector $\\vec{d} = \\langle a, b, c \\rangle$:
- **Vector Equation**: $\\vec{r}(t) = \\langle x_0, y_0, z_0 \\rangle + t\\langle a, b, c \\rangle$
- **Parametric Equations**:
  $$x = x_0 + at, \\quad y = y_0 + bt, \\quad z = z_0 + ct$$
- **Symmetric Equations** (for $a, b, c \\neq 0$):
  $$\\frac{x - x_0}{a} = \\frac{y - y_0}{b} = \\frac{z - z_0}{c}$$

---

### 2. Equations of Planes in 3D Space
A plane passing through point $P_0(x_0, y_0, z_0)$ with normal vector $\\vec{n} = \\langle A, B, C \\rangle$:
- **Point-Normal Form**: $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$
- **General Form**: $Ax + By + Cz + D = 0$ (where $D = -(Ax_0 + By_0 + Cz_0)$)
- **Distance from Point $(x_1, y_1, z_1)$ to Plane $Ax + By + Cz + D = 0$**:
  $$d = \\frac{|Ax_1 + By_1 + Cz_1 + D|}{\\sqrt{A^2 + B^2 + C^2}}$$

---

### 3. Matrix Algebra, Determinants & Cramer's Rule

#### 2x2 and 3x3 Determinants:
$$\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc$$
$$\\det \\begin{pmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{pmatrix} = a(ei - fh) - b(di - fg) + c(dh - eg)$$

#### Matrix Inverse ($2 \\times 2$):
$$A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\implies A^{-1} = \\frac{1}{ad - bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$$
*(Inverse exists $\\iff \\det(A) \\neq 0$)*.

#### Cramer's Rule for Linear Systems:
For $Ax = B$, $x_i = \\frac{\\det(A_i)}{\\det(A)}$, where $A_i$ is matrix $A$ with column $i$ replaced by the constants vector $B$.`,
        equations: [
          {
            name: "Distance from Point to Plane",
            formula: "d = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}",
            explanation: "Shortest perpendicular distance from a point to a 3D plane."
          },
          {
            name: "2x2 Matrix Inverse Formula",
            formula: "A^{-1} = \\frac{1}{ad - bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}",
            explanation: "Swap main diagonal elements, negate off-diagonal elements, divide by determinant."
          }
        ],
        workedExamples: [
          {
            problem: "Find the equation of the plane passing through point $P(2, -1, 3)$ with normal vector $\\vec{n} = \\langle 3, 4, -2 \\rangle$.",
            stepByStepSolution: [
              "Use Point-Normal equation: $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0$.",
              "Substitute coefficients: $3(x - 2) + 4(y - (-1)) - 2(z - 3) = 0$.",
              "Expand: $3x - 6 + 4y + 4 - 2z + 6 = 0$.",
              "Simplify: $3x + 4y - 2z + 4 = 0$."
            ],
            shortcutTip: "Form is $3x + 4y - 2z + D = 0$. Plug $(2,-1,3)$: $3(2)+4(-1)-2(3) = 6-4-6 = -4$, so $D = +4$!"
          }
        ],
        examTraps: [
          "Forgetting the absolute value in the distance formula numerator.",
          "Assuming $\\det(A + B) = \\det(A) + \\det(B)$ (FALSE!). Determinant only distributes over multiplication: $\\det(AB) = \\det(A)\\det(B)$."
        ],
        keyTakeaways: [
          "Two planes are parallel if their normal vectors are proportional: $\\frac{A_1}{A_2} = \\frac{B_1}{B_2} = \\frac{C_1}{C_2}$.",
          "Two planes are perpendicular if $A_1 A_2 + B_1 B_2 + C_1 C_2 = 0$."
        ]
      }
    ]
  }
];
