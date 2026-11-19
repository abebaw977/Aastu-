import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for Applied Mathematics II (MathsApplied - 4 Chapters)
 * Preserves all existing notes and adds 3D vector geometry derivations, Gauss-Jordan matrix proofs,
 * L'Hôpital calculus derivations, volume revolution integrals, and exam traps for all 4 chapters.
 */
export const EXTRA_NOTES_MATHS_APPLIED: Record<number, MasterNoteSection[]> = {
  // Chapter 1: Vectors and Their Applications
  1: [
    {
      id: 'appmath-extra-c1-sec1',
      heading: '1.4 Masterclass: 3D Vector Geometry, Scalar Triple Products & Spatial Plane Formulations',
      content: `### 1.4.1 Scalar Triple Product & Parallelepiped Volume
For three non-coplanar vectors $\\vec{u}, \\vec{v}, \\vec{w} \\in \\mathbb{R}^3$:
$$\\vec{u} \\cdot (\\vec{v} \\times \\vec{w}) = \\begin{vmatrix} u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\\\ w_1 & w_2 & w_3 \\end{vmatrix}$$
- **Geometric Volume of Parallelepiped**:
  $$V = |\\vec{u} \\cdot (\\vec{v} \\times \\vec{w})|$$
- **Coplanarity Condition**:
  Three vectors $\\vec{u}, \\vec{v}, \\vec{w}$ are **coplanar** (lie in the exact same plane) if and only if:
  $$\\vec{u} \\cdot (\\vec{v} \\times \\vec{w}) = 0$$

---

### 1.4.2 Equations of Lines and Planes in $\\mathbb{R}^3$
1. **Line Passing Through $P_0(x_0, y_0, z_0)$ Parallel to Direction Vector $\\vec{d} = \\langle a, b, c \\rangle$**:
   - **Vector Equation**: $\\vec{r}(t) = \\vec{r}_0 + t\\vec{d}$.
   - **Parametric Equations**: $x = x_0 + at, \\quad y = y_0 + bt, \\quad z = z_0 + ct$.
   - **Symmetric Equations**: $\\frac{x - x_0}{a} = \\frac{y - y_0}{b} = \\frac{z - z_0}{c} = t$.
2. **Plane Passing Through $P_0(x_0, y_0, z_0)$ with Normal Vector $\\vec{n} = \\langle A, B, C \\rangle$**:
   - **Vector Form**: $\\vec{n} \\cdot (\\vec{r} - \\vec{r}_0) = 0$.
   - **Standard Cartesian Form**: $A(x - x_0) + B(y - y_0) + C(z - z_0) = 0 \\implies Ax + By + Cz + D = 0$.
3. **Perpendicular Distance from Point $S(x_1, y_1, z_1)$ to Plane $Ax + By + Cz + D = 0$**:
   $$d = \\frac{|Ax_1 + By_1 + Cz_1 + D|}{\\sqrt{A^2 + B^2 + C^2}}$$`,
      equations: [
        {
          name: 'Scalar Triple Product Volume Formula',
          formula: 'V = |\\vec{u} \\cdot (\\vec{v} \\times \\vec{w})|',
          description: 'Calculates volume of parallelepiped spanned by three spatial vectors via 3x3 determinant.'
        },
        {
          name: 'Point-to-Plane Distance Formula',
          formula: 'd = \\frac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}',
          description: 'Determines the shortest perpendicular geometric distance in three-dimensional space.'
        }
      ],
      workedExamples: [
        {
          problem: 'Find the standard equation of the plane passing through the three points $P(1, 2, -1)$, $Q(2, 3, 1)$, and $R(0, 1, 2)$.',
          stepByStepSolution: [
            'Step 1 (Construct displacement vectors): $\\vec{PQ} = \\langle 2-1, 3-2, 1-(-1) \\rangle = \\langle 1, 1, 2 \\rangle$. $\\vec{PR} = \\langle 0-1, 1-2, 2-(-1) \\rangle = \\langle -1, -1, 3 \\rangle$.',
            'Step 2 (Find normal vector via cross product): $\\vec{n} = \\vec{PQ} \\times \\vec{PR} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & 1 & 2 \\\\ -1 & -1 & 3 \\end{vmatrix}$.',
            'Step 3 (Evaluate cross product): $\\hat{i}(3 - (-2)) - \\hat{j}(3 - (-2)) + \\hat{k}(-1 - (-1)) = 5\\hat{i} - 5\\hat{j} + 0\\hat{k} = \\langle 5, -5, 0 \\rangle$.',
            'Step 4 (Simplify normal): Divide by 5: $\\vec{n} = \\langle 1, -1, 0 \\rangle$.',
            'Step 5 (Plane equation with $P(1, 2, -1)$): $1(x - 1) - 1(y - 2) + 0(z + 1) = 0 \\implies x - 1 - y + 2 = 0 \\implies \\mathbf{x - y + 1 = 0}$.'
          ],
          shortcutTip: 'Check with point Q: 2 - 3 + 1 = 0. Point R: 0 - 1 + 1 = 0. All three points satisfy the plane equation!'
        }
      ],
      keyTakeaways: [
        'The cross product of two non-parallel vectors in a plane always produces a normal vector perpendicular to that plane.',
        'Two planes are perpendicular if their normal vectors are orthogonal ($\\vec{n}_1 \\cdot \\vec{n}_2 = 0$).'
      ]
    }
  ],

  // Chapter 2: Matrices and Determinants
  2: [
    {
      id: 'appmath-extra-c2-sec1',
      heading: '2.4 Masterclass: Gauss-Jordan Inversion Algorithm, Rank Consistency & Cramer\'s Rule',
      content: `### 2.4.1 Invertibility and The Gauss-Jordan Inversion Algorithm
For an $n \\times n$ matrix $A$:
- $A$ is invertible (non-singular) if and only if $\\det(A) \\neq 0$.
- **Gauss-Jordan $[A \\mid I_n] \\longrightarrow [I_n \\mid A^{-1}]$ Algorithm**:
  1. Adjoin the $n \\times n$ identity matrix to the right of $A$: $[A \\mid I_n]$.
  2. Perform elementary row operations (EROs) to reduce the left submatrix $A$ to Reduced Row Echelon Form (RREF).
  3. If $A$ reduces to $I_n$, the right submatrix is **$A^{-1}$**. If a row of zeros appears on the left, $A$ is non-invertible.
- **Adjugate Inversion Formula**:
  $$A^{-1} = \\frac{1}{\\det(A)} \\operatorname{adj}(A) = \\frac{1}{\\det(A)} C^T$$

---

### 2.4.2 Rouché-Capelli Rank Consistency Theorem for $A\\vec{x} = \\vec{b}$
Let $\\operatorname{rank}(A)$ be the number of non-zero rows in the row echelon form of $A$, and let $\\operatorname{rank}[A \\mid \\vec{b}]$ be the rank of the augmented matrix:
1. **Inconsistent (Zero Solutions)**: $\\operatorname{rank}(A) < \\operatorname{rank}[A \\mid \\vec{b}]$.
2. **Consistent with a Unique Solution**: $\\operatorname{rank}(A) = \\operatorname{rank}[A \\mid \\vec{b}] = n$ (number of variables).
3. **Consistent with Infinitely Many Solutions**: $\\operatorname{rank}(A) = \\operatorname{rank}[A \\mid \\vec{b}] = r < n$ (degrees of freedom: $n - r$ free parameters).`,
      keyTakeaways: [
        'The transpose reverses product order: $(AB)^T = B^T A^T$ and $(AB)^{-1} = B^{-1} A^{-1}$.',
        'Cramer\'s rule applies only to square linear systems where the coefficient determinant is strictly non-zero ($\det A \neq 0$).'
      ]
    }
  ],

  // Chapter 3: Derivatives and Application of Derivatives
  3: [
    {
      id: 'appmath-extra-c3-sec1',
      heading: '3.4 Masterclass: L\'Hôpital Limits Indeterminate Forms & Applied Optimization Mechanics',
      content: `### 3.4.1 L\'Hôpital\'s Rule for Indeterminate Forms
If $\\lim_{x \\to c} \\frac{f(x)}{g(x)}$ yields the indeterminate forms $\\left[\\frac{0}{0}\\right]$ or $\\left[\\frac{\\pm\\infty}{\\pm\\infty}\\right]$, and $f, g$ are differentiable with $g'(x) \\neq 0$:
$$\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)}$$
- **Transformations for Other Indeterminate Forms**:
  - **$[0 \\cdot \\infty]$**: Rewrite product as quotient: $f \\cdot g = \\frac{f}{1/g}$ or $\\frac{g}{1/f}$.
  - **$[\\infty - \\infty]$**: Combine using common denominators or algebraic conjugation.
  - **$[1^\\infty, 0^0, \\infty^0]$**: Set $y = f(x)^{g(x)}$, take natural logs $\\ln y = g(x)\\ln f(x)$, apply L'Hôpital to find $\\lim \\ln y = L$, then evaluate $y = e^L$.

---

### 3.4.2 Curve Sketching: Critical Numbers, Concavity & Inflection Points
- **Critical Numbers**: Numbers $c \\in \\operatorname{Dom}(f)$ where $f'(c) = 0$ or $f'(c)$ does not exist.
- **First Derivative Test**:
  - $f'(x)$ changes $+ \\to - \\implies$ **Local Maximum** at $c$.
  - $f'(x)$ changes $- \\to + \\implies$ **Local Minimum** at $c$.
- **Second Derivative Test (Concavity)**:
  - If $f'(c) = 0$ and $f''(c) < 0 \\implies$ **Local Maximum** (concave down $\\cap$).
  - If $f'(c) = 0$ and $f''(c) > 0 \\implies$ **Local Minimum** (concave up $\\cup$).
  - **Inflection Point**: A point where the curve changes concavity ($f''(x)$ changes sign) and the tangent line exists.`,
      keyTakeaways: [
        'L\'Hôpital\'s rule requires taking the derivative of the numerator and denominator separately ($f\'/g\'$), NOT using the quotient rule!',
        'Extreme Value Theorem guarantees that every continuous function on a closed bounded interval $[a, b]$ attains an absolute maximum and minimum.'
      ]
    }
  ],

  // Chapter 4: Integration and Application of Integration
  4: [
    {
      id: 'appmath-extra-c4-sec1',
      heading: '4.4 Masterclass: Solids of Revolution (Disk, Washer & Shell Methods) & Arc Length Integrals',
      content: `### 4.4.1 Solids of Revolution: Three Integration Methods

| Method | Geometry & Slice Orientation | Axis of Revolution | Integral Volume Formula |
| :--- | :--- | :--- | :--- |
| **Disk Method** | Perpendicular slices (no hole/core). | Horizontal ($x$-axis) | $V = \\pi \\int_a^b [R(x)]^2 \\, dx$ |
| **Washer Method** | Perpendicular circular rings (with hollow core). | Horizontal ($x$-axis) | $V = \\pi \\int_a^b \\left([R_{\\text{outer}}(x)]^2 - [r_{\\text{inner}}(x)]^2\\right) dx$ |
| **Cylindrical Shell Method** | Parallel cylindrical sleeves ($2\\pi \\times \\text{radius} \\times \\text{height}$). | Vertical ($y$-axis) | $V = 2\\pi \\int_a^b x \\cdot [f(x) - g(x)] \\, dx$ |

---

### 4.4.2 Arc Length & Surface Area of Revolution
1. **Arc Length of Smooth Curve $y = f(x)$ on $[a, b]$**:
   $$L = \\int_a^b \\sqrt{1 + \\left[f'(x)\\right]^2} \\, dx = \\int_a^b \\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2} dx$$
2. **Surface Area of Revolution (Rotated About $x$-Axis)**:
   $$S = 2\\pi \\int_a^b y \\sqrt{1 + \\left(\\frac{dy}{dx}\\right)^2} dx$$`,
      equations: [
        {
          name: 'Cylindrical Shell Volume Formula',
          formula: 'V = 2\\pi \\int_a^b (\\text{radius})(\\text{height})\\, dx',
          description: 'Calculates volume of revolution when rotating regions about the vertical y-axis.'
        },
        {
          name: 'Arc Length Integral Formula',
          formula: 'L = \\int_a^b \\sqrt{1 + [f\'(x)]^2}\\, dx',
          description: 'Determines the exact geometric length of a curve in the Cartesian plane.'
        }
      ],
      workedExamples: [
        {
          problem: 'Find the volume of the solid generated by revolving the region bounded by $y = \\sqrt{x}$, $y = 0$, and $x = 4$ about the $x$-axis using the Disk Method.',
          stepByStepSolution: [
            'Step 1 (Identify slice and radius): Slices are perpendicular to the $x$-axis. Radius $R(x) = \\sqrt{x} - 0 = \\sqrt{x}$.',
            'Step 2 (Set up Disk integral): $V = \\pi \\int_0^4 [R(x)]^2 \\, dx = \\pi \\int_0^4 (\\sqrt{x})^2 \\, dx = \\pi \\int_0^4 x \\, dx$.',
            'Step 3 (Evaluate antiderivative): $\\int_0^4 x \\, dx = \\left[ \\frac{x^2}{2} \\right]_0^4 = \\frac{4^2}{2} - 0 = \\frac{16}{2} = 8$.',
            'Step 4 (Multiply by $\\pi$): $V = 8\\pi \\approx \\mathbf{25.13\\text{ cubic units}}$.'
          ],
          shortcutTip: 'Disk method uses perpendicular cross-sections $\\pi \\int R^2$; Shell method uses parallel cross-sections $2\\pi \\int r h$.'
        }
      ],
      keyTakeaways: [
        'Integration by Parts $\\int u\\,dv = uv - \\int v\\,du$ follows the LIATE priority rule: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential.',
        'The Fundamental Theorem of Calculus Part 1 connects differentiation and integration as inverse processes.'
      ]
    }
  ]
};
