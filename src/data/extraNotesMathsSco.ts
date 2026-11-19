import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for Mathematics for Social Sciences (MathsSco - 4 Chapters)
 * Preserves all existing notes and adds rigorous proofs, worked university exam step-by-step solutions,
 * formula tables, and exam traps for all 4 units.
 */
export const EXTRA_NOTES_MATHS_SCO: Record<number, MasterNoteSection[]> = {
  // Chapter 1: Propositional Logic and Set Theory
  1: [
    {
      id: 'msco-extra-c1-sec1',
      heading: '1.5 Masterclass: Formal Rules of Inference, Logical Fallacies & Inclusion-Exclusion Principle',
      content: `### 1.5.1 Essential Rules of Inference in Formal Logic
A formal argument is valid if and only if its premises logically guarantee its conclusion:
$$(P_1 \\land P_2 \\land \\dots \\land P_n) \\Longrightarrow Q \\quad \\text{is a Tautology.}$$

#### The Primary Rules of Inference Table

| Rule Name | Premise 1 | Premise 2 | Conclusion | Logical Tautology Form |
| :--- | :--- | :--- | :--- | :--- |
| **Modus Ponens (MP)** | $p \\Rightarrow q$ | $p$ | $\\therefore q$ | $[(p \\Rightarrow q) \\land p] \\Rightarrow q$ |
| **Modus Tollens (MT)** | $p \\Rightarrow q$ | $\\neg q$ | $\\therefore \\neg p$ | $[(p \\Rightarrow q) \\land \\neg q] \\Rightarrow \\neg p$ |
| **Hypothetical Syllogism (HS)** | $p \\Rightarrow q$ | $q \\Rightarrow r$ | $\\therefore p \\Rightarrow r$ | $[(p \\Rightarrow q) \\land (q \\Rightarrow r)] \\Rightarrow (p \\Rightarrow r)$ |
| **Disjunctive Syllogism (DS)** | $p \\lor q$ | $\\neg p$ | $\\therefore q$ | $[(p \\lor q) \\land \\neg p] \\Rightarrow q$ |
| **Constructive Dilemma (CD)** | $(p \\Rightarrow q) \\land (r \\Rightarrow s)$ | $p \\lor r$ | $\\therefore q \\lor s$ | $[(p \\Rightarrow q) \\land (r \\Rightarrow s) \\land (p \\lor r)] \\Rightarrow (q \\lor s)$ |
| **Destructive Dilemma (DD)** | $(p \\Rightarrow q) \\land (r \\Rightarrow s)$ | $\\neg q \\lor \\neg s$ | $\\therefore \\neg p \\lor \\neg r$ | $[(p \\Rightarrow q) \\land (r \\Rightarrow s) \\land (\\neg q \\lor \\neg s)] \\Rightarrow (\\neg p \\lor \\neg r)$ |
| **Simplification (Simp)** | $p \\land q$ | — | $\\therefore p$ | $(p \\land q) \\Rightarrow p$ |
| **Conjunction (Conj)** | $p$ | $q$ | $\\therefore p \\land q$ | $[p \\land q] \\Rightarrow (p \\land q)$ |
| **Addition (Add)** | $p$ | — | $\\therefore p \\lor q$ | $p \\Rightarrow (p \\lor q)$ |

---

### 1.5.2 Formal Fallacies (Invalid Argument Patterns)
1. **Fallacy of Affirming the Consequent**:
   - Form: Premise 1: $p \\Rightarrow q$; Premise 2: $q$; Conclusion: $\\therefore p$ (**INVALID**).
   - *Example*: "If it rains, the ground is wet. The ground is wet. Therefore, it rained." (Invalid: a sprinkler could have wet the ground).
2. **Fallacy of Denying the Antecedent**:
   - Form: Premise 1: $p \\Rightarrow q$; Premise 2: $\\neg p$; Conclusion: $\\therefore \\neg q$ (**INVALID**).
   - *Example*: "If you study hard, you pass. You did not study hard. Therefore, you will not pass." (Invalid: you could pass by luck or prior knowledge).

---

### 1.5.3 Worked Example: Inclusion-Exclusion Counting in Survey Research
**Problem**: In a freshman survey of $120$ social science students:
- $65$ students read *The Ethiopian Herald* ($H$).
- $50$ students read *Addis Fortune* ($F$).
- $40$ students read *The Reporter* ($R$).
- $25$ read both $H$ and $F$.
- $20$ read both $H$ and $R$.
- $15$ read both $F$ and $R$.
- $10$ read all three newspapers.

**Questions**:
1. How many students read at least one of these newspapers?
2. How many read none of these newspapers?
3. How many read *exactly one* newspaper?

**Step-by-Step Solution**:
1. **Principle of Inclusion-Exclusion for 3 Sets**:
   $$n(H \\cup F \\cup R) = n(H) + n(F) + n(R) - [n(H \\cap F) + n(H \\cap R) + n(F \\cap R)] + n(H \\cap F \\cap R)$$
   $$n(H \\cup F \\cup R) = 65 + 50 + 40 - (25 + 20 + 15) + 10$$
   $$n(H \\cup F \\cup R) = 155 - 60 + 10 = 105 \\text{ students.}$$
2. **Students who read none**:
   $$n(\\text{None}) = n(U) - n(H \\cup F \\cup R) = 120 - 105 = 15 \\text{ students.}$$
3. **Students who read exactly one newspaper**:
   - Only $H$: $65 - (15 + 10 + 10) = 30$
   - Only $F$: $50 - (15 + 10 + 5) = 20$
   - Only $R$: $40 - (10 + 10 + 5) = 15$
   - Total exactly one: $30 + 20 + 15 = 65 \\text{ students.}$$`,
      keyTakeaways: [
        'An argument is valid when the conditional between the conjunction of premises and the conclusion forms a tautology.',
        'Affirming the consequent and denying the antecedent are common invalid formal fallacies.',
        'The 3-set Inclusion-Exclusion formula adds single sets, subtracts pair-wise intersections, and adds the triple intersection.',
      ],
      examTraps: [
        'Exam Trap: Treating $p \\Rightarrow q$ and $q \\Rightarrow p$ as equivalent. An implication is NEVER logically equivalent to its converse!',
        'Exam Trap: Forgetting to add back the triple intersection in the 3-set Inclusion-Exclusion formula.',
      ],
    },
  ],

  // Chapter 2: Functions
  2: [
    {
      id: 'msco-extra-c2-sec1',
      heading: '2.8 Masterclass: Sign Chart Analysis, Injective/Surjective Verification & Rational Function Asymptotes',
      content: `### 2.8.1 Solving Non-Linear Inequalities Using the Sign-Chart Method
**Problem**: Solve the rational inequality for $x \\in \\mathbb{R}$:
$$\\frac{x^2 - 4x + 3}{x + 2} \\ge 0$$

**Step-by-Step Solution**:
1. **Factor the Numerator**:
   $$\\frac{(x - 1)(x - 3)}{x + 2} \\ge 0$$
2. **Find Critical Cut Points**:
   - Zeros of Numerator: $x = 1, x = 3$ (included, $\\ge 0$).
   - Zeros of Denominator: $x = -2$ (strictly excluded, division by zero is undefined).
3. **Partition Real Line into Intervals**:
   $$(-\\infty, -2), \\quad (-2, 1), \\quad (1, 3), \\quad (3, \\infty)$$
4. **Sign Testing**:
   - Test $x = -3 \\in (-\\infty, -2)$: $\\frac{(-)(-)}{(-)} = \\frac{+}{-} = - < 0$ (False).
   - Test $x = 0 \\in (-2, 1)$: $\\frac{(-1)(-3)}{2} = \\frac{+}{+} = + > 0$ (True).
   - Test $x = 2 \\in (1, 3)$: $\\frac{(1)(-1)}{4} = \\frac{-}{+} = - < 0$ (False).
   - Test $x = 4 \\in (3, \\infty)$: $\\frac{(3)(1)}{6} = \\frac{+}{+} = + > 0$ (True).
5. **Solution Set**:
   $$x \\in (-2, 1] \\cup [3, \\infty)$$
   *(Notice $-2$ has an open parenthesis, while $1$ and $3$ have closed brackets).*

---

### 2.8.2 Rigorous Verification of Injective, Surjective, and Bijective Functions
- **Function**: Let $f: \\mathbb{R} \\setminus \\{2\\} \\to \\mathbb{R} \\setminus \\{3\\}$ defined by $f(x) = \\frac{3x + 1}{x - 2}$.
- **Injectivity (One-to-One)**:
  - Assume $f(x_1) = f(x_2)$:
    $$\\frac{3x_1 + 1}{x_1 - 2} = \\frac{3x_2 + 1}{x_2 - 2}$$
    $$(3x_1 + 1)(x_2 - 2) = (3x_2 + 1)(x_1 - 2)$$
    $$3x_1x_2 - 6x_1 + x_2 - 2 = 3x_1x_2 - 6x_2 + x_1 - 2$$
    $$-6x_1 + x_2 = -6x_2 + x_1 \\implies 7x_2 = 7x_1 \\implies x_1 = x_2.$$
    Therefore, $f$ is strictly **injective**.
- **Surjectivity (Onto)**:
  - Let $y \\in \\mathbb{R} \\setminus \\{3\\}$. We must find $x$ such that $f(x) = y$:
    $$y = \\frac{3x + 1}{x - 2} \\implies y(x - 2) = 3x + 1 \\implies xy - 2y = 3x + 1$$
    $$x(y - 3) = 2y + 1 \\implies x = \\frac{2y + 1}{y - 3}$$
    Since $y \\ne 3$, $x$ is well-defined and $x \\ne 2$ (if $x = 2 \\implies 2y + 1 = 2y - 6 \\implies 1 = -6$, impossible).
    Therefore, every element $y$ has a pre-image $x$, so $f$ is **surjective**.
- **Conclusion & Inverse**:
  - Since $f$ is both injective and surjective, it is **bijective**.
  - Its inverse function is:
    $$f^{-1}(x) = \\frac{2x + 1}{x - 3}.$$`,
      keyTakeaways: [
        'Denominator zeros must ALWAYS be excluded from inequality solution intervals with open parentheses.',
        'A function has an inverse if and only if it is bijective (both one-to-one and onto).',
        'Horizontal asymptotes of $P(x)/Q(x)$ depend on degrees: if $\\deg(P) = \\deg(Q)$, asymptote is the ratio of leading coefficients.',
      ],
      examTraps: [
        'Exam Trap: Including the denominator zero in a non-strict inequality ($\\le$ or $\\ge$). It produces division by zero!',
      ],
    },
  ],

  // Chapter 3: Matrices and Systems of Linear Equations
  3: [
    {
      id: 'msco-extra-c3-sec1',
      heading: '3.10 Masterclass: Step-by-Step Gauss-Jordan Inversion, Cramer\'s Rule & Rank Consistency Criteria',
      content: `### 3.10.1 The Consistency Criteria for Linear Systems (Rouché-Capelli Theorem)
For a linear system $Ax = b$ with $n$ variables, let $A$ be the coefficient matrix and $[A \\mid b]$ be the augmented matrix:
1. **Inconsistent (No Solution)**:
   $$\\text{Rank}(A) < \\text{Rank}([A \\mid b])$$
   *(Row echelon form contains a contradiction row like $[0 \\; 0 \\; \\dots \\; 0 \\mid c]$ where $c \\ne 0$).*
2. **Unique Solution**:
   $$\\text{Rank}(A) = \\text{Rank}([A \\mid b]) = n \\quad (\\text{number of unknowns}).$$
   *(Requires $\\det(A) \\ne 0$ for square systems).*
3. **Infinitely Many Solutions**:
   $$\\text{Rank}(A) = \\text{Rank}([A \\mid b]) = r < n.$$
   *(There are $n - r$ free parameters / degrees of freedom).*

---

### 3.10.2 Cramer's Rule for a 3x3 System of Linear Equations
Given:
$$\\begin{cases} x + 2y - z = 2 \\\\ 2x - y + z = 3 \\\\ 3x + y + 2z = 9 \\end{cases}$$

1. **Calculate Determinant $D = \\det(A)$**:
   $$D = \\begin{vmatrix} 1 & 2 & -1 \\\\ 2 & -1 & 1 \\\\ 3 & 1 & 2 \\end{vmatrix}$$
   $$D = 1[(-1)(2) - (1)(1)] - 2[(2)(2) - (1)(3)] + (-1)[(2)(1) - (-1)(3)]$$
   $$D = 1[-3] - 2[1] - 1[5] = -3 - 2 - 5 = -10.$$
   Since $D = -10 \\ne 0$, the system has a **unique solution**.

2. **Calculate $D_x$ (replace 1st column with constant vector $[2, 3, 9]^T$)**:
   $$D_x = \\begin{vmatrix} 2 & 2 & -1 \\\\ 3 & -1 & 1 \\\\ 9 & 1 & 2 \\end{vmatrix} = 2[-3] - 2[6 - 9] - 1[3 - (-9)] = -6 + 6 - 12 = -12 \\quad \\implies x = \\frac{D_x}{D} = \\frac{-12}{-10} = \\frac{6}{5}$$

3. **Calculate $D_y$ (replace 2nd column with $[2, 3, 9]^T$)**:
   $$D_y = \\begin{vmatrix} 1 & 2 & -1 \\\\ 2 & 3 & 1 \\\\ 3 & 9 & 2 \\end{vmatrix} = 1[6 - 9] - 2[4 - 3] - 1[18 - 9] = -3 - 2 - 9 = -14 \\quad \\implies y = \\frac{D_y}{D} = \\frac{-14}{-10} = \\frac{7}{5}$$

4. **Calculate $D_z$ (replace 3rd column with $[2, 3, 9]^T$)**:
   $$D_z = \\begin{vmatrix} 1 & 2 & 2 \\\\ 2 & -1 & 3 \\\\ 3 & 1 & 9 \\end{vmatrix} = 1[-9 - 3] - 2[18 - 9] + 2[2 - (-3)] = -12 - 18 + 10 = -20 \\quad \\implies z = \\frac{D_z}{D} = \\frac{-20}{-10} = 2.$$

**Final Solution**: $(x, y, z) = \\left(\\frac{6}{5}, \\frac{7}{5}, 2\\right)$.`,
      keyTakeaways: [
        'A linear system is consistent if and only if the rank of the coefficient matrix equals the rank of the augmented matrix.',
        'Cramer\'s Rule requires $\\det(A) \\ne 0$ and computes each variable as $x_i = \\det(A_i)/\\det(A)$.',
        'If $\\det(A) = 0$ and any $D_i \\ne 0$, the system has no solution.',
      ],
      examTraps: [
        'Exam Trap: Applying Cramer\'s Rule when $\\det(A) = 0$. Cramer\'s Rule is invalid when the determinant of the coefficient matrix is zero!',
      ],
    },
  ],

  // Chapter 4: Introduction to Calculus
  4: [
    {
      id: 'msco-extra-c4-sec1',
      heading: '4.5 Masterclass: Optimization in Economics, Second Derivative Tests & Area Between Curves',
      content: `### 4.5.1 Economic Applications of Derivatives (Marginal Analysis)
In managerial economics and social sciences:
- **Cost Function**: $C(q)$ is Total Cost.
  - **Marginal Cost (MC)**: $MC(q) = \\frac{dC}{dq} = C'(q)$.
  - **Average Cost (AC)**: $AC(q) = \\frac{C(q)}{q}$.
  - **Property**: $AC(q)$ reaches its minimum when $MC(q) = AC(q)$.
- **Revenue Function**: $R(q) = p \\cdot q$, where $p = P(q)$ is the demand price.
  - **Marginal Revenue (MR)**: $MR(q) = \\frac{dR}{dq} = R'(q)$.
- **Profit Maximization**:
  $$\\Pi(q) = R(q) - C(q)$$
  - **First-Order Condition (FOC)**: $\\Pi'(q) = 0 \\implies MR(q) = MC(q)$.
  - **Second-Order Condition (SOC)**: $\\Pi''(q) < 0 \\implies R''(q) < C''(q)$ (Marginal Cost must cut Marginal Revenue from below).

---

### 4.5.2 Worked Optimization Problem
**Problem**: A firm faces the demand function $P = 100 - 2Q$ and has the total cost function $C(Q) = Q^3 - 8Q^2 + 40Q + 50$.
1. Find the profit-maximizing output $Q^*$.
2. Verify using the second derivative test that profit is maximized.
3. Calculate the maximum profit $\\Pi^*$.

**Step-by-Step Solution**:
1. **Formulate Revenue and Profit**:
   $$R(Q) = P \\cdot Q = (100 - 2Q)Q = 100Q - 2Q^2$$
   $$\\Pi(Q) = R(Q) - C(Q) = (100Q - 2Q^2) - (Q^3 - 8Q^2 + 40Q + 50)$$
   $$\\Pi(Q) = -Q^3 + 6Q^2 + 60Q - 50$$
2. **First Derivative (FOC)**:
   $$\\frac{d\\Pi}{dQ} = -3Q^2 + 12Q + 60 = 0$$
   Divide by $-3$:
   $$Q^2 - 4Q - 20 = 0$$
   Using the quadratic formula:
   $$Q = \\frac{4 \\pm \\sqrt{16 - 4(1)(-20)}}{2} = \\frac{4 \\pm \\sqrt{96}}{2} = 2 \\pm 2\\sqrt{6}$$
   Since production output must be positive ($Q > 0$):
   $$Q^* = 2 + 2\\sqrt{6} \\approx 2 + 2(2.449) \\approx 6.90 \\text{ units.}$$
3. **Second Derivative Test (SOC)**:
   $$\\Pi''(Q) = -6Q + 12$$
   $$\\Pi''(6.90) = -6(6.90) + 12 = -41.4 + 12 = -29.4 < 0.$$
   Since $\\Pi''(Q^*) < 0$, profit is **strictly maximized**.

---

### 4.5.3 Calculating the Area Bounded Between Two Curves
**Problem**: Find the area of the region bounded by $f(x) = x^2 - 2x$ and $g(x) = x + 4$.

**Step-by-Step Solution**:
1. **Find Intersection Points (Limits of Integration)**:
   $$x^2 - 2x = x + 4 \\implies x^2 - 3x - 4 = 0 \\implies (x - 4)(x + 1) = 0$$
   Lower limit $a = -1$, Upper limit $b = 4$.
2. **Determine Upper vs. Lower Curve**:
   Test $x = 0 \\in [-1, 4]$:
   $g(0) = 4$, $f(0) = 0 \\implies g(x) \\ge f(x)$ on $[-1, 4]$.
3. **Evaluate the Definite Integral**:
   $$\\text{Area} = \\int_{-1}^{4} [g(x) - f(x)]\\,dx = \\int_{-1}^{4} [(x + 4) - (x^2 - 2x)]\\,dx = \\int_{-1}^{4} (-x^2 + 3x + 4)\\,dx$$
   $$\\text{Area} = \\left[ -\\frac{x^3}{3} + \\frac{3x^2}{2} + 4x \\right]_{-1}^{4}$$
   At $x = 4$:
   $$-\\frac{64}{3} + \\frac{48}{2} + 16 = -\\frac{64}{3} + 24 + 16 = 40 - \\frac{64}{3} = \\frac{56}{3}$$
   At $x = -1$:
   $$-\\frac{(-1)}{3} + \\frac{3(1)}{2} + 4(-1) = \\frac{1}{3} + \\frac{3}{2} - 4 = \\frac{2 + 9 - 24}{6} = -\\frac{13}{6}$$
   $$\\text{Area} = \\frac{56}{3} - \\left(-\\frac{13}{6}\\right) = \\frac{112}{6} + \\frac{13}{6} = \\frac{125}{6} \\approx 20.83 \\text{ sq. units.}$$`,
      keyTakeaways: [
        'Profit maximization occurs where $MR = MC$ and $d(MR)/dQ < d(MC)/dQ$.',
        'Average Cost is minimized at the exact output where $MC = AC$.',
        'The area between two curves is $\\int_a^b [\\text{Upper}(x) - \\text{Lower}(x)]\\,dx$ and must always be positive.',
      ],
      examTraps: [
        'Exam Trap: Subtracting lower from upper backwards, yielding a negative area. Area is a physical magnitude and must always be strictly positive!',
      ],
    },
  ],
};
