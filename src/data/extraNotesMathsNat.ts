import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for Mathematics for Natural Sciences (MathsNat - 4 Chapters)
 * Preserves all existing notes and adds formal inductive proofs, De Moivre's derivations,
 * asymptotic graphing algorithms, conic section geometry derivations, and exam traps for all 4 chapters.
 */
export const EXTRA_NOTES_MATHS_NAT: Record<number, MasterNoteSection[]> = {
  // Chapter 1: Propositional Logic and Set Theory
  1: [
    {
      id: 'mnat-extra-c1-sec1',
      heading: '1.5 Masterclass: Formal Proofs of Validity, Quantifier Negations & 3-Set Counting Mechanics',
      content: `### 1.5.1 Nine Fundamental Rules of Inference for Formal Proofs

$$\\begin{array}{l|l|l}
\\textbf{Inference Rule} & \\textbf{Formal Syllogistic Pattern} & \\textbf{Logical Rationale} \\\\ \\hline
\\textbf{Modus Ponens (MP)} & p \\to q, \\; p \\;\\vdash\\; q & \\text{Affirming the antecedent affirms the consequent.} \\\\
\\textbf{Modus Tollens (MT)} & p \\to q, \\; \\neg q \\;\\vdash\\; \\neg p & \\text{Denying the consequent denies the antecedent.} \\\\
\\textbf{Hypothetical Syllogism (HS)} & p \\to q, \\; q \\to r \\;\\vdash\\; p \\to r & \\text{Transitivity of conditional implication.} \\\\
\\textbf{Disjunctive Syllogism (DS)} & p \\lor q, \\; \\neg p \\;\\vdash\\; q & \\text{Eliminating one disjunct validates the other.} \\\\
\\textbf{Constructive Dilemma (CD)} & (p \\to q) \\land (r \\to s), \\; p \\lor r \\;\\vdash\\; q \\lor s & \\text{Two conditionals applied to a disjunction of antecedents.} \\\\
\\textbf{Simplification (Simp)} & p \\land q \\;\\vdash\\; p & \\text{A conjunction is true only if each conjunct is true.} \\\\
\\textbf{Conjunction (Conj)} & p, \\; q \\;\\vdash\\; p \\land q & \\text{Combining two verified truths into a conjunction.} \\\\
\\textbf{Addition (Add)} & p \\;\\vdash\\; p \\lor q & \\text{If } p \\text{ is true, } p \\lor q \\text{ is unconditionally true.} \\\\
\\textbf{Absorption (Abs)} & p \\to q \\;\\vdash\\; p \\to (p \\land q) & \\text{Self-implication expansion.}
\\end{array}$$

---

### 1.5.2 Quantifier Negation Rules & Open Sentences
- Negating a Universal Quantifier yields an Existential Quantifier:
  $$\\neg (\\forall x \\, P(x)) \\equiv \\exists x \\, \\neg P(x)$$
- Negating an Existential Quantifier yields a Universal Quantifier:
  $$\\neg (\\exists x \\, P(x)) \\equiv \\forall x \\, \\neg P(x)$$
- **Nested Quantifiers Ordering Rule**:
  $$\\exists y \\, \\forall x \\, P(x, y) \\implies \\forall x \\, \\exists y \\, P(x, y) \\quad (\\text{Converse is strictly FALSE!})$$

---

### 1.5.3 Three-Set Principle of Inclusion-Exclusion
$$n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A \\cap B) - n(A \\cap C) - n(B \\cap C) + n(A \\cap B \\cap C)$$`,
      equations: [
        {
          name: 'Three-Set Inclusion-Exclusion Formula',
          formula: 'n(A \\cup B \\cup C) = \\sum n(A_i) - \\sum n(A_i \\cap A_j) + n(A \\cap B \\cap C)',
          description: 'Calculates union size for three overlapping sets without double-counting intersections.'
        }
      ],
      workedExamples: [
        {
          problem: 'Prove that the argument: "If it rains, the grass is wet ($p \\to q$). The grass is not wet ($\\neg q$). Therefore, it did not rain ($\\neg p$)" is valid using the rules of inference.',
          stepByStepSolution: [
            '1. Premise 1: $p \\to q$.',
            '2. Premise 2: $\\neg q$.',
            '3. Applying **Modus Tollens (MT)** to lines 1 and 2 directly yields: $\\neg p$.',
            'Conclusion: The argument is formally valid by Modus Tollens.'
          ],
          shortcutTip: 'Modus Ponens affirms the front; Modus Tollens denies the back. Affirming the consequent is a fallacy!'
        }
      ],
      keyTakeaways: [
        'A conditional statement $p \\to q$ is false if and only if $p$ is True and $q$ is False.',
        'The contrapositive $(\\neg q \\to \\neg p)$ is logically equivalent to the original conditional $(p \\to q)$.'
      ]
    }
  ],

  // Chapter 2: The Real and the Complex Number System
  2: [
    {
      id: 'mnat-extra-c2-sec1',
      heading: '2.4 Masterclass: Mathematical Induction Proofs, Complex Polar Geometry & De Moivre\'s Roots',
      content: `### 2.4.1 The Principle of Mathematical Induction (PMI)
To prove that a predicate $P(n)$ is true for all integers $n \\ge 1$:
1. **Base Case**: Verify that $P(1)$ is true.
2. **Inductive Hypothesis**: Assume $P(k)$ is true for an arbitrary integer $k \\ge 1$.
3. **Inductive Step**: Prove that $P(k+1)$ must also be true under the hypothesis.
4. **Conclusion**: By the Principle of Mathematical Induction, $P(n)$ holds for all $n \\in \\mathbb{Z}^+$.

---

### 2.4.2 Complex Numbers: Polar Form & De Moivre\'s Theorem
For a complex number $z = x + iy$:
- **Modulus**: $r = |z| = \\sqrt{x^2 + y^2}$.
- **Principal Argument**: $\\theta = \\operatorname{Arg}(z) \\in (-\\pi, \\pi]$.
- **Polar / Trigonometric Representation**:
  $$z = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta}$$
- **De Moivre\'s Theorem for Powers ($n \\in \\mathbb{Z}$)**:
  $$z^n = [r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos(n\\theta) + i\\sin(n\\theta))$$
- **The $n$ Distinct Complex $n^{\\text{th}}$ Roots of $z$ ($k = 0, 1, 2, \\dots, n-1$)**:
  $$w_k = r^{1/n} \\left[\\cos\\left(\\frac{\\theta + 2k\\pi}{n}\\right) + i\\sin\\left(\\frac{\\theta + 2k\\pi}{n}\\right)\\right]$$
  Geometrically, the $n$ roots form the vertices of a regular $n$-sided polygon centered at the origin of the complex plane!`,
      equations: [
        {
          name: 'De Moivre\'s Theorem for Complex Powers',
          formula: '(r(\\cos\\theta + i\\sin\\theta))^n = r^n(\\cos(n\\theta) + i\\sin(n\\theta))',
          description: 'Calculates high integer and fractional powers of complex numbers in polar coordinates.'
        },
        {
          name: 'Roots of Complex Numbers Formula',
          formula: 'z_k = r^{1/n}\\operatorname{cis}\\left(\\frac{\\theta + 2k\\pi}{n}\\right), \\quad k \\in \\{0, 1, \\dots, n-1\\}',
          description: 'Yields all n geometrically distributed roots of a complex number.'
        }
      ],
      workedExamples: [
        {
          problem: 'Find the three cube roots of $z = -8i$ in polar and Cartesian form.',
          stepByStepSolution: [
            'Step 1 (Find modulus and argument): $z = 0 - 8i \\implies r = |z| = 8$. The point $(0, -8)$ lies on the negative imaginary axis $\\implies \\theta = -\\frac{\\pi}{2}$ (or $270^\\circ$).',
            'Step 2 (Cube root modulus): $r^{1/3} = 8^{1/3} = 2$.',
            'Step 3 (Formula for $k = 0, 1, 2$): $w_k = 2\\left[\\cos\\left(\\frac{-\\pi/2 + 2k\\pi}{3}\\right) + i\\sin\\left(\\frac{-\\pi/2 + 2k\\pi}{3}\\right)\\right]$.',
            'Step 4 (For $k=0$): $\\theta_0 = -\\frac{\\pi}{6} \\implies w_0 = 2\\left(\\cos(-\\pi/6) + i\\sin(-\\pi/6)\\right) = 2\\left(\\frac{\\sqrt{3}}{2} - \\frac{1}{2}i\\right) = \\mathbf{\\sqrt{3} - i}$.',
            'Step 5 (For $k=1$): $\\theta_1 = \\frac{-\\pi/2 + 2\\pi}{3} = \\frac{\\pi}{2} \\implies w_1 = 2\\left(\\cos(\\pi/2) + i\\sin(\\pi/2)\\right) = \\mathbf{2i}$.',
            'Step 6 (For $k=2$): $\\theta_2 = \\frac{-\\pi/2 + 4\\pi}{3} = \\frac{7\\pi}{6} \\implies w_2 = 2\\left(\\cos(7\\pi/6) + i\\sin(7\\pi/6)\\right) = 2\\left(-\\frac{\\sqrt{3}}{2} - \\frac{1}{2}i\\right) = \\mathbf{-\\sqrt{3} - i}$.'
          ],
          shortcutTip: 'Check: $(2i)^3 = 8i^3 = 8(-i) = -8i$. Perfect!'
        }
      ],
      keyTakeaways: [
        'Euler\'s identity $e^{i\\pi} + 1 = 0$ unites the five fundamental mathematical constants: e, i, pi, 1, and 0.',
        'Complex roots of real polynomials always occur in conjugate pairs ($a \\pm bi$).'
      ]
    }
  ],

  // Chapter 3: Functions
  3: [
    {
      id: 'mnat-extra-c3-sec1',
      heading: '3.4 Masterclass: Rational Function Asymptotics, Polynomial Root Theorems & Inverse Bijectivity',
      content: `### 3.4.1 Comprehensive Rational Function Asymptote Algorithm
For a rational function $f(x) = \\frac{P(x)}{Q(x)} = \\frac{a_n x^n + \\dots + a_0}{b_m x^m + \\dots + b_0}$ in lowest terms:
1. **Vertical Asymptotes (VA)**: Roots of $Q(x) = 0$ where $P(x) \\neq 0$. Common roots between $P$ and $Q$ create removable **holes**.
2. **Horizontal Asymptotes (HA) vs. Slant (Oblique) Asymptotes (OA)**:
   - If **$n < m$**: **Horizontal Asymptote is $y = 0$** ($x$-axis).
   - If **$n = m$**: **Horizontal Asymptote is $y = \\frac{a_n}{b_m}$** (ratio of leading coefficients).
   - If **$n = m + 1$**: No HA; perform polynomial long division $f(x) = (mx + b) + \\frac{R(x)}{Q(x)}$; the line **$y = mx + b$ is the Oblique (Slant) Asymptote**.
   - If **$n > m + 1$**: Neither HA nor OA (parabolic or higher asymptote).

---

### 3.4.2 Five Foundational Polynomial Theorems
1. **Division Algorithm**: $P(x) = D(x)Q(x) + R(x)$ with $R(x)=0$ or $\\deg R < \\deg D$.
2. **Remainder Theorem**: $R = P(c)$ when divided by $(x - c)$.
3. **Factor Theorem**: $(x - c)$ is a factor of $P(x) \\iff P(c) = 0$.
4. **Rational Root Theorem**: Every rational root $\\frac{p}{q}$ in lowest terms satisfies $p \\mid a_0$ (constant term) and $q \\mid a_n$ (leading coefficient).
5. **Fundamental Theorem of Algebra**: Every polynomial of degree $n \\ge 1$ has exactly $n$ complex roots counting multiplicity.`,
      keyTakeaways: [
        'A function has an inverse if and only if it is strictly bijective (passes both vertical and horizontal line tests).',
        'A horizontal asymptote can be crossed by a curve in its middle domain, but a vertical asymptote can never be touched or crossed.'
      ]
    }
  ],

  // Chapter 4: Analytic Geometry
  4: [
    {
      id: 'mnat-extra-c4-sec1',
      heading: '4.4 Masterclass: Conic Section Derivations, Eccentricity Unified Metric & Axis Rotation',
      content: `### 4.4.1 Unified Geometric Definition of Conic Sections
A conic section is the locus of a point $P$ whose distance to a fixed point (the **Focus**) divided by its perpendicular distance to a fixed line (the **Directrix**) is a constant ratio called the **Eccentricity ($e$)**:
$$\\frac{\\text{dist}(P, \\text{Focus})}{\\text{dist}(P, \\text{Directrix})} = e$$
- **Parabola**: $e = 1$.
- **Ellipse**: $0 < e < 1$ (special case Circle: $e = 0$).
- **Hyperbola**: $e > 1$.

---

### 4.4.2 Master Standard Equation Matrix of Conic Sections

| Conic Section | Standard Equation (Horizontal Major Axis) | Center / Vertex | Foci Coordinates | Governing Focal Metric | Asymptote / Directrix Equations |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Parabola** | $(y - k)^2 = 4p(x - h)$ | Vertex $(h, k)$ | Focus $(h + p, k)$ | Focal length $p$ | Directrix: $x = h - p$ |
| **Ellipse** | $\\frac{(x - h)^2}{a^2} + \\frac{(y - k)^2}{b^2} = 1 \\; (a > b)$ | Center $(h, k)$ | $(h \\pm c, k)$ | $\\mathbf{c^2 = a^2 - b^2}$ | Eccentricity $e = \\frac{c}{a} < 1$ |
| **Hyperbola** | $\\frac{(x - h)^2}{a^2} - \\frac{(y - k)^2}{b^2} = 1$ | Center $(h, k)$ | $(h \\pm c, k)$ | $\\mathbf{c^2 = a^2 + b^2}$ | Asymptotes: $y - k = \\pm \\frac{b}{a}(x - h)$ |

---

### 4.4.3 General Second-Degree Equation and Conic Classification
For $Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0$, the discriminant $\\Delta = B^2 - 4AC$ determines the conic type:
- If $\\Delta < 0$ ($B^2 - 4AC < 0$): **Ellipse** (or Circle if $A = C$ and $B = 0$).
- If $\\Delta = 0$ ($B^2 - 4AC = 0$): **Parabola**.
- If $\\Delta > 0$ ($B^2 - 4AC > 0$): **Hyperbola**.`,
      equations: [
        {
          name: 'Perpendicular Distance from Point to Line',
          formula: 'd = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}',
          description: 'Calculates the shortest geometric distance from point (x0, y0) to line Ax + By + C = 0.'
        },
        {
          name: 'Conic Section Classification Discriminant',
          formula: '\\Delta = B^2 - 4AC',
          description: 'Classifies ellipses, parabolas, and hyperbolas from general second-degree equations.'
        }
      ],
      workedExamples: [
        {
          problem: 'Find the center, foci, vertices, and asymptotes of the hyperbola: $9x^2 - 16y^2 - 36x - 64y - 172 = 0$.',
          stepByStepSolution: [
            'Step 1 (Complete the square): $9(x^2 - 4x) - 16(y^2 + 4y) = 172$.',
            'Step 2 (Add constants): $9(x - 2)^2 - 16(y + 2)^2 = 172 + 9(4) - 16(4) = 172 + 36 - 64 = 144$.',
            'Step 3 (Divide by 144): $\\frac{(x - 2)^2}{16} - \\frac{(y + 2)^2}{9} = 1$.',
            'Step 4 (Extract parameters): Center $(h, k) = (2, -2)$. $a^2 = 16 \\implies a = 4$. $b^2 = 9 \\implies b = 3$.',
            'Step 5 (Compute focal distance $c$): $c^2 = a^2 + b^2 = 16 + 9 = 25 \\implies c = 5$.',
            'Step 6 (Foci & Vertices): Horizontal transverse axis $\\implies$ Vertices $(2 \\pm 4, -2) = \\mathbf{(6, -2)}$ and $\\mathbf{(-2, -2)}$. Foci $(2 \\pm 5, -2) = \\mathbf{(7, -2)}$ and $\\mathbf{(-3, -2)}$.',
            'Step 7 (Asymptotes): $y - k = \\pm \\frac{b}{a}(x - h) \\implies \\mathbf{y + 2 = \\pm \\frac{3}{4}(x - 2)}$.'
          ],
          shortcutTip: 'In an ellipse: $c^2 = a^2 - b^2$. In a hyperbola: $c^2 = a^2 + b^2$. Don\'t mix them up!'
        }
      ],
      examTraps: [
        'Confusing the focal relationships: For ellipses $c^2 = a^2 - b^2$ ($c < a$); for hyperbolas $c^2 = a^2 + b^2$ ($c > a$).',
        'Forgetting the absolute value in the point-to-line distance formula: Distance is always a non-negative geometric quantity.'
      ],
      keyTakeaways: [
        'The eccentricity of a circle is 0; parabola is exactly 1; ellipse is between 0 and 1; hyperbola is strictly greater than 1.',
        'Completing the square transforms general second-degree conic equations into standard solvable forms.'
      ]
    }
  ]
};
