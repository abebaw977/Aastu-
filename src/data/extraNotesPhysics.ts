import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for General Physics (Physics - 7 Chapters)
 * Preserves all existing notes and adds rigorous derivations, governing equation matrices,
 * multi-step university worked examples, and trap alerts for all 7 chapters.
 */
export const EXTRA_NOTES_PHYSICS: Record<number, MasterNoteSection[]> = {
  // Chapter 1: Preliminaries
  1: [
    {
      id: 'phys-extra-c1-sec1',
      heading: '1.4 Masterclass: Dimensional Homogeneity, Systematic vs. Random Errors & Vector Algebra Vector Analysis',
      content: `### 1.4.1 Principle of Dimensional Homogeneity & Method of Dimensions
- **Dimensional Analysis**:
  Physical quantities can be expressed in terms of fundamental dimensions: $[L]$ (length), $[M]$ (mass), $[T]$ (time), $[I]$ (electric current), and $[\Theta]$ (temperature).
- **The Law of Dimensional Homogeneity**:
  An equation describing a real physical phenomenon is physically valid only if **every additive term on both sides possesses the exact same net dimensions**.
  - If $A = B + C$, then $[A] = [B] = [C]$.
  - The arguments of transcendental functions (trigonometric $\\sin(\\theta)$, logarithmic $\\ln(x)$, exponential $e^x$) must be **strictly dimensionless** ($[M^0 L^0 T^0] = 1$).
- **Application 1: Checking Formula Consistency**:
  If a student writes $v^2 = u^2 + 2as^2$, dimensional testing reveals:
  $$[v^2] = (LT^{-1})^2 = L^2T^{-2}, \\quad [2as^2] = (LT^{-2})(L^2) = L^3T^{-2} \\implies L^2T^{-2} \\neq L^3T^{-2}$$
  The formula is immediately proved dimensionally inconsistent and false.
- **Application 2: Deriving Power-Law Relationships (Rayleigh's Method)**:
  Assume period $T$ of a simple pendulum depends on mass $m$, length $l$, and gravitational acceleration $g$:
  $$T = k \\cdot m^a \\cdot l^b \\cdot g^c \\implies [T^1] = [M]^a [L]^b [LT^{-2}]^c = M^a L^{b+c} T^{-2c}$$
  Equating powers: $a = 0$, $-2c = 1 \\implies c = -1/2$, $b + c = 0 \\implies b = 1/2$.
  Thus, $T = k \\sqrt{\\frac{l}{g}}$, proving pendulum period is completely **independent of bob mass**.

---

### 1.4.2 Error Propagation and Uncertainty Budgeting

| Type of Error | Source / Characteristics | Elimination / Mitigation Strategy | Mathematical Model |
| :--- | :--- | :--- | :--- |
| **Systematic Error** | Zero calibration offset, instrument bias, flawed experimental technique, ambient drift. Consistent in direction (always too high or always too low). | Recalibrate instrument against reference standard; apply correction factors. **Cannot be reduced by repeated averaging!** | Shift in mean: $\\bar{x}_{\\text{measured}} = x_{\\text{true}} + \\delta_{\\text{systematic}}$ |
| **Random Error** | Unpredictable electronic noise, microscopic thermal fluctuations, mechanical vibrations, human visual parallax. Scatter around true mean. | **Take multiple independent readings ($N \\gg 1$)** and compute arithmetic mean $\\bar{x}$; standard deviation decreases as $1/\\sqrt{N}$. | Gaussian distribution: $\\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{N}}$ |

- **Rules for Combining Uncertainties**:
  - **Addition / Subtraction**: If $Z = A \\pm B$, absolute uncertainties add in quadrature:
    $$\\Delta Z = \\sqrt{(\\Delta A)^2 + (\\Delta B)^2} \\quad (\\text{or upper bound } \\Delta Z \\le \\Delta A + \\Delta B)$$
  - **Multiplication / Division**: If $Z = A \\cdot B$ or $Z = \\frac{A}{B}$, fractional (relative) uncertainties add in quadrature:
    $$\\frac{\\Delta Z}{Z} = \\sqrt{\\left(\\frac{\\Delta A}{A}\\right)^2 + \\left(\\frac{\\Delta B}{B}\\right)^2}$$
  - **Power Relationship**: If $Z = A^n$, fractional uncertainty is scaled by power $n$:
    $$\\frac{\\Delta Z}{Z} = |n| \\cdot \\frac{\\Delta A}{A}$$

---

### 1.4.3 Vector Algebra: Scalar (Dot) vs. Vector (Cross) Product Matrix

$$\\begin{aligned}
\\vec{A} &= A_x\\hat{i} + A_y\\hat{j} + A_z\\hat{k} \\\\
\\vec{B} &= B_x\\hat{i} + B_y\\hat{j} + B_z\\hat{k}
\\end{aligned}$$

1. **Scalar Product (Dot Product)**:
   $$\\vec{A} \\cdot \\vec{B} = |\\vec{A}||\\vec{B}|\\cos(\\theta) = A_x B_x + A_y B_y + A_z B_z$$
   - Commutative: $\\vec{A} \\cdot \\vec{B} = \\vec{B} \\cdot \\vec{A}$.
   - Orthogonality condition: If $\\vec{A} \\perp \\vec{B}$ ($\\theta = 90^\\circ$), then $\\vec{A} \\cdot \\vec{B} = 0$.
   - Component projection: The scalar projection of $\\vec{A}$ onto $\\vec{B}$ is $\\text{proj}_{\\vec{B}}(\\vec{A}) = \\frac{\\vec{A} \\cdot \\vec{B}}{|\\vec{B}|}$.
2. **Vector Product (Cross Product)**:
   $$\\vec{A} \\times \\vec{B} = |\\vec{A}||\\vec{B}|\\sin(\\theta)\\,\\hat{n} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ A_x & A_y & A_z \\\\ B_x & B_y & B_z \\end{vmatrix} = (A_y B_z - A_z B_y)\\hat{i} - (A_x B_z - A_z B_x)\\hat{j} + (A_x B_y - A_y B_x)\\hat{k}$$
   - **Anti-commutative**: $\\vec{A} \\times \\vec{B} = -(\\vec{B} \\times \\vec{A})$.
   - Collinear / Parallel condition: If $\\vec{A} \\parallel \\vec{B}$ ($\\theta = 0^\\circ$ or $180^\\circ$), then $\\vec{A} \\times \\vec{B} = \\vec{0}$.
   - Geometric significance: $|\\vec{A} \\times \\vec{B}|$ equals the **area of the parallelogram** formed by vectors $\\vec{A}$ and $\\vec{B}$. Area of the triangle is $\\frac{1}{2}|\\vec{A} \\times \\vec{B}|$.`,
      equations: [
        {
          name: 'Quadrature Uncertainty Propagation for Powers and Products',
          formula: 'Z = k \\frac{X^a Y^b}{W^c} \\implies \\frac{\\Delta Z}{Z} = \\sqrt{a^2\\left(\\frac{\\Delta X}{X}\\right)^2 + b^2\\left(\\frac{\\Delta Y}{Y}\\right)^2 + c^2\\left(\\frac{\\Delta W}{W}\\right)^2}',
          description: 'Standard formula for compounding relative errors when variables are statistically independent.'
        },
        {
          name: 'Angle Between Vectors via Dot Product',
          formula: '\\cos(\\theta) = \\frac{\\vec{A} \\cdot \\vec{B}}{|\\vec{A}||\\vec{B}|} = \\frac{A_x B_x + A_y B_y + A_z B_z}{\\sqrt{A_x^2 + A_y^2 + A_z^2}\\sqrt{B_x^2 + B_y^2 + B_z^2}}',
          description: 'Used in physics exams to determine the exact geometric orientation between force and displacement vectors.'
        }
      ],
      workedExamples: [
        {
          problem: 'Given two vectors $\\vec{A} = 3\\hat{i} - 2\\hat{j} + 6\\hat{k}$ and $\\vec{B} = 2\\hat{i} + 4\\hat{j} - 1\\hat{k}$, calculate: (1) The scalar product $\\vec{A} \\cdot \\vec{B}$; (2) The angle $\\theta$ between them; (3) The vector cross product $\\vec{A} \\times \\vec{B}$ and the area of the triangle spanned by $\\vec{A}$ and $\\vec{B}$.',
          stepByStepSolution: [
            'Step 1 (Dot Product): $\\vec{A} \\cdot \\vec{B} = (3)(2) + (-2)(4) + (6)(-1) = 6 - 8 - 6 = -8$.',
            'Step 2 (Magnitudes): $|\\vec{A}| = \\sqrt{3^2 + (-2)^2 + 6^2} = \\sqrt{9 + 4 + 36} = \\sqrt{49} = 7$. $|\\vec{B}| = \\sqrt{2^2 + 4^2 + (-1)^2} = \\sqrt{4 + 16 + 1} = \\sqrt{21} \\approx 4.583$.',
            'Step 3 (Angle): $\\cos(\\theta) = \\frac{-8}{7 \\times \\sqrt{21}} = \\frac{-8}{32.078} \\approx -0.2494 \\implies \\theta = \\arccos(-0.2494) \\approx 104.44^\\circ$.',
            'Step 4 (Cross Product): $\\vec{A} \\times \\vec{B} = \\hat{i}[(-2)(-1) - (6)(4)] - \\hat{j}[(3)(-1) - (6)(2)] + \\hat{k}[(3)(4) - (-2)(2)] = \\hat{i}[2 - 24] - \\hat{j}[-3 - 12] + \\hat{k}[12 + 4] = -22\\hat{i} + 15\\hat{j} + 16\\hat{k}$.',
            'Step 5 (Triangle Area): $|\\vec{A} \\times \\vec{B}| = \\sqrt{(-22)^2 + (15)^2 + (16)^2} = \\sqrt{484 + 225 + 256} = \\sqrt{965} \\approx 31.06$. Triangle area $= \\frac{1}{2}|\\vec{A} \\times \\vec{B}| = \\frac{31.06}{2} = 15.53\\text{ sq units}$.'
          ],
          shortcutTip: 'Dot product yields a scalar number; cross product yields a vector perpendicular to both original vectors via the right-hand rule.'
        }
      ],
      examTraps: [
        'Assuming systematic errors can be eliminated by repeating measurements and averaging. Averaging only reduces random errors; systematic bias persists unchanged across all trials.',
        'Reversing the order in a cross product: $\\vec{A} \\times \\vec{B} \\neq \\vec{B} \\times \\vec{A}$; it flips sign: $\\vec{B} \\times \\vec{A} = -(\\vec{A} \\times \\vec{B})$.'
      ],
      keyTakeaways: [
        'An equation must be dimensionally homogeneous, but dimensional correctness does not guarantee physical accuracy (dimensionless constants like 1/2 or 2pi cannot be detected).',
        'Relative error adds linearly when variables are raised to powers: if kinetic energy $E_k = \\frac{1}{2}m v^2$, a 2% uncertainty in velocity contributes 4% to the total uncertainty in $E_k$.'
      ]
    }
  ],

  // Chapter 2: Kinematics and Dynamics of Particles
  2: [
    {
      id: 'phys-extra-c2-sec1',
      heading: '2.5 Masterclass: Projectile Trajectory Equations, Friction Dynamics, Non-Inertial Frames & Orbital Energy',
      content: `### 2.5.1 General Kinematics & Parabolic Trajectory Derivations
Consider a projectile launched from origin $(0,0)$ with initial speed $v_0$ at angle $\\theta_0$ above horizontal ground ($a_x = 0$, $a_y = -g$):
1. **Velocity Components**:
   $$v_x(t) = v_0\\cos\\theta_0, \\qquad v_y(t) = v_0\\sin\\theta_0 - gt$$
2. **Parametric Positions**:
   $$x(t) = (v_0\\cos\\theta_0)t \\implies t = \\frac{x}{v_0\\cos\\theta_0}$$
   $$y(t) = (v_0\\sin\\theta_0)t - \\frac{1}{2}gt^2$$
3. **Cartesian Trajectory Equation**:
   Substitute $t$:
   $$y(x) = (\\tan\\theta_0)x - \\left[\\frac{g}{2v_0^2\\cos^2\\theta_0}\\right]x^2$$
   This proves the trajectory is mathematically a **downward-opening parabola**.
4. **Key Trajectory Extrema**:
   - **Time to Maximum Height**: $v_y(t_{\\text{up}}) = 0 \\implies t_{\\text{up}} = \\frac{v_0\\sin\\theta_0}{g}$.
   - **Maximum Vertical Height**: $H_{\\max} = y(t_{\\text{up}}) = \\frac{v_0^2\\sin^2\\theta_0}{2g}$.
   - **Total Flight Time (flat ground)**: $T = 2 t_{\\text{up}} = \\frac{2v_0\\sin\\theta_0}{g}$.
   - **Horizontal Range ($R$)**:
     $$R = x(T) = v_0\\cos\\theta_0 \\cdot \\frac{2v_0\\sin\\theta_0}{g} = \\frac{v_0^2\\sin(2\\theta_0)}{g}$$
   - **Complementary Angles Theorem**: Launch angles $\\theta$ and $(90^\\circ - \\theta)$ yield the **exact same range** $R$ for identical launch speed $v_0$, since $\\sin(2(90^\\circ - \\theta)) = \\sin(180^\\circ - 2\\theta) = \\sin(2\\theta)$. Maximum range occurs strictly at $\\theta_0 = 45^\\circ$.

---

### 2.5.2 Friction Dynamics: Static vs. Kinetic on Inclined Planes
- **Static Friction ($f_s$)**: Prevents relative motion up to a maximum threshold:
  $$f_s \\le \\mu_s N, \\qquad f_{s,\\max} = \\mu_s N$$
- **Kinetic Friction ($f_k$)**: Opposes established sliding motion:
  $$f_k = \\mu_k N \\quad (\\text{where } \\mu_k < \\mu_s)$$
- **Angle of Repose (Critical Slump Angle $\\theta_c$)**:
  On an adjustable ramp, when an object is on the verge of slipping:
  $$mg\\sin\\theta_c = f_{s,\\max} = \\mu_s (mg\\cos\\theta_c) \\implies \\tan\\theta_c = \\mu_s$$
  - If incline angle $\\theta < \\theta_c$: Object remains stationary; $f_s = mg\\sin\\theta < \\mu_s mg\\cos\\theta$.
  - If incline angle $\\theta > \\theta_c$: Object accelerates downward with $a = g(\\sin\\theta - \\mu_k\\cos\\theta)$.

---

### 2.5.3 Conservative Systems, Potential Wells & Orbital Dynamics
- **Conservative Force Condition**: Work done around any closed loop is zero: $\\oint \\vec{F} \\cdot d\\vec{r} = 0 \\iff \\vec{F} = -\\vec{\\nabla} U$.
- **Mechanical Energy Conservation**: $E_{\\text{mech}} = K + U = \\text{constant}$.
- **Newtonian Gravitation & Orbital Motion**:
  $$F_g = \\frac{G M m}{r^2} = \\frac{m v_{\\text{orb}}^2}{r} \\implies v_{\\text{orb}} = \\sqrt{\\frac{GM}{r}}$$
  - **Orbital Period (Kepler's Third Law)**:
    $$T = \\frac{2\\pi r}{v_{\\text{orb}}} = \\frac{2\\pi r}{\\sqrt{GM/r}} \\implies T^2 = \\left(\\frac{4\\pi^2}{GM}\\right)r^3$$
  - **Total Orbital Energy**:
    $$E = K + U = \\frac{1}{2}m v_{\\text{orb}}^2 - \\frac{GMm}{r} = \\frac{GMm}{2r} - \\frac{GMm}{r} = -\\frac{GMm}{2r} = \\frac{1}{2}U$$
    The negative total energy signifies that the satellite is in a **gravitationally bound state**.
  - **Escape Velocity ($v_{\\text{esc}}$)**: Speed required to reach $r \\to \\infty$ with zero residual energy:
    $$\\frac{1}{2}m v_{\\text{esc}}^2 - \\frac{GMm}{R} = 0 \\implies v_{\\text{esc}} = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2}\\,v_{\\text{orb, surface}}$$`,
      equations: [
        {
          name: 'Cartesian Parabolic Trajectory Formula',
          formula: 'y(x) = x\\tan(\\theta) - \\frac{g x^2}{2 v_0^2 \\cos^2(\\theta)}',
          description: 'Enables direct calculation of required clearance heights over obstacles without finding flight time.'
        },
        {
          name: 'Mechanical Energy Conservation with Non-Conservative Work',
          formula: 'W_{\\text{nc}} = \\Delta E_{\\text{mech}} = (K_f + U_f) - (K_i + U_i)',
          description: 'Calculates thermal dissipation and frictional energy losses along arbitrary paths.'
        }
      ],
      workedExamples: [
        {
          problem: 'A block of mass $m = 5\\text{ kg}$ is projected up a $30^\\circ$ inclined plane with an initial velocity $v_0 = 10\\text{ m/s}$. The coefficient of kinetic friction between the block and the plane is $\\mu_k = 0.2$. Taking $g = 9.8\\text{ m/s}^2$: (1) Find the deceleration of the block as it moves up the plane; (2) Determine the maximum distance $d$ the block slides up before coming momentarily to rest.',
          stepByStepSolution: [
            'Step 1 (Normal Force): $N = mg\\cos(30^\\circ) = (5)(9.8)\\cos(30^\\circ) = 49 \\times 0.866 = 42.437\\text{ N}$.',
            'Step 2 (Kinetic Friction Force): $f_k = \\mu_k N = (0.2)(42.437) = 8.487\\text{ N}$.',
            'Step 3 (Net Force Parallel to Incline): Both gravity component and friction oppose upward motion: $\\Sigma F_x = -mg\\sin(30^\\circ) - f_k = -(5)(9.8)(0.5) - 8.487 = -24.5 - 8.487 = -32.987\\text{ N}$.',
            'Step 4 (Deceleration): $a = \\frac{\\Sigma F_x}{m} = \\frac{-32.987}{5} = -6.60\\text{ m/s}^2$.',
            'Step 5 (Maximum Distance along Incline): Using $v_f^2 = v_i^2 + 2ad$ with $v_f = 0$: $0 = 10^2 + 2(-6.60)d \\implies 13.2 d = 100 \\implies d = \\frac{100}{13.2} = 7.58\\text{ m}$.'
          ],
          shortcutTip: 'Work-Energy shortcut: $\\frac{1}{2}m v_0^2 = mgh + f_k d = mg(d\\sin\\theta) + (\\mu_k mg\\cos\\theta)d \\implies d = \\frac{v_0^2}{2g(\\sin\\theta + \\mu_k\\cos\\theta)}$.'
        }
      ],
      examTraps: [
        'Assuming static friction always equals $\\mu_s N$. Static friction is a self-adjusting reaction force ($0 \\le f_s \\le \\mu_s N$). It only equals $\\mu_s N$ when impending motion is explicitly stated.',
        'Confusing momentum conservation with kinetic energy conservation: In an inelastic collision, total momentum is ALWAYS strictly conserved, but kinetic energy is NOT conserved (dissipated as heat, deformation, or sound).'
      ],
      keyTakeaways: [
        'In projectile motion, horizontal and vertical components are completely decoupled and independent.',
        'Satellites in circular orbit have kinetic energy equal to half the absolute value of gravitational potential energy: $K = \\frac{1}{2}|U|$, and total energy is negative.'
      ]
    }
  ],

  // Chapter 3: Fluid Mechanics
  3: [
    {
      id: 'phys-extra-c3-sec1',
      heading: '3.4 Masterclass: Hydrostatic Pressure Profiles, Buoyancy Stability, Bernoulli Applications & Poiseuille Flow',
      content: `### 3.4.1 Hydrostatics, Pascal\'s Principle and Archimedes\' Buoyant Force
1. **Hydrostatic Equation & Gauge vs. Absolute Pressure**:
   $$\\frac{dP}{dy} = -\\rho g \\implies P_2 = P_1 + \\rho g h$$
   - **Absolute Pressure**: $P_{\\text{abs}} = P_{\\text{atm}} + P_{\\text{gauge}}$, where $P_{\\text{atm}} \\approx 1.013 \\times 10^5\\text{ Pa} = 1\\text{ atm}$.
   - **Pascal's Principle**: External pressure applied to an enclosed, incompressible fluid is transmitted **undiminished** to every portion of the fluid and the vessel walls.
     $$\\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\implies F_2 = F_1 \\left(\\frac{A_2}{A_1}\\right) = F_1 \\left(\\frac{d_2}{d_1}\\right)^2$$
     Mechanical advantage equals the square of the hydraulic piston diameter ratio!
2. **Archimedes' Principle & Immersion Fractions**:
   The buoyant force on a submerged or floating body equals the weight of the fluid displaced:
   $$F_b = \\rho_{\\text{fluid}} V_{\\text{submerged}} g$$
   - **Floating Equilibrium ($F_b = W_{\\text{body}}$)**:
     $$\\rho_{\\text{fluid}} V_{\\text{submerged}} g = \\rho_{\\text{body}} V_{\\text{total}} g \\implies \\frac{V_{\\text{submerged}}}{V_{\\text{total}}} = \\frac{\\rho_{\\text{body}}}{\\rho_{\\text{fluid}}}$$
   - **Apparent Weight**: $W_{\\text{apparent}} = W_{\\text{true}} - F_b = (\\rho_{\\text{body}} - \\rho_{\\text{fluid}}) V_{\\text{total}} g$.

---

### 3.4.2 Ideal Fluid Dynamics: Continuity & Bernoulli\'s Theorem
For an incompressible, non-viscous, irrotational, steady streamline flow:
1. **Equation of Continuity (Mass Conservation)**:
   $$A_1 v_1 = A_2 v_2 = Q \\quad (\\text{Volume Flow Rate in } \\text{m}^3/\\text{s})$$
   When pipe diameter narrows ($A_2 < A_1$), fluid speed must increase ($v_2 > v_1$).
2. **Bernoulli's Equation (Work-Energy Conservation per Unit Volume)**:
   $$P_1 + \\frac{1}{2}\\rho v_1^2 + \\rho g y_1 = P_2 + \\frac{1}{2}\\rho v_2^2 + \\rho g y_2 = \\text{constant}$$
3. **Canonical Applications**:
   - **Torricelli's Law of Efflux**: Fluid flowing out of a small orifice at depth $h$ below an open tank surface ($A_{\\text{hole}} \\ll A_{\\text{tank}}$):
     $$v_{\\text{efflux}} = \\sqrt{2gh}$$
   - **Venturi Tube (Flow Measurement)**: In a horizontal constriction ($y_1 = y_2$):
     $$P_1 - P_2 = \\frac{1}{2}\\rho (v_2^2 - v_1^2) = \\frac{1}{2}\\rho v_1^2 \\left[\\left(\\frac{A_1}{A_2}\\right)^2 - 1\\right]$$
     High velocity in the throat produces **lower static pressure**, creating suction (aspirators, carburetors, atomizer sprayers).
   - **Aerodynamic Lift**: Air travels faster over a curved upper wing surface than underneath, creating lower pressure above: $\\Delta P = \\frac{1}{2}\\rho (v_{\\text{top}}^2 - v_{\\text{bottom}}^2)$, yielding net upward lift force $F_L = \\Delta P \\cdot A_{\\text{wing}}$.

---

### 3.4.3 Real Fluids: Viscosity & Poiseuille\'s Law
In real fluids, internal friction generates shearing resistance characterized by coefficient of viscosity $\\eta$ (SI unit: $\\text{Pa}\\cdot\\text{s}$ or $\\text{N}\\cdot\\text{s}/\\text{m}^2$):
- **Poiseuille's Law (Laminar Flow in Cylindrical Pipes)**:
  $$Q = \\frac{\\pi r^4 (P_1 - P_2)}{8 \\eta L}$$
  Volume flow rate is proportional to the **fourth power of pipe radius ($r^4$)**. Halving blood vessel radius reduces flow rate by a factor of $2^4 = 16$, requiring cardiac pressure to skyrocket!`,
      equations: [
        {
          name: 'Bernoulli Constant Energy Equation',
          formula: 'P + \\frac{1}{2}\\rho v^2 + \\rho g y = \\text{constant}',
          description: 'Total head (pressure head + velocity head + elevation head) is conserved along any streamline.'
        },
        {
          name: 'Poiseuille Radius-to-the-Fourth Law',
          formula: 'Q = \\frac{\\pi \\Delta P r^4}{8 \\eta L}',
          description: 'Demonstrates extreme flow sensitivity to pipe or artery constriction in fluid transport.'
        }
      ],
      workedExamples: [
        {
          problem: 'Water (density $\\rho = 1000\\text{ kg/m}^3$) flows through a horizontal pipe. At section 1, the cross-sectional area is $A_1 = 40\\text{ cm}^2$ and gauge pressure is $P_1 = 300\\text{ kPa}$. At section 2, the pipe constricts to $A_2 = 10\\text{ cm}^2$. The volume flow rate through the pipe is $Q = 0.02\\text{ m}^3/\\text{s}$. Calculate: (1) Velocities $v_1$ and $v_2$; (2) Gauge pressure $P_2$ at the constriction.',
          stepByStepSolution: [
            'Step 1 (Convert areas): $A_1 = 40 \\times 10^{-4}\\text{ m}^2 = 0.004\\text{ m}^2$; $A_2 = 10 \\times 10^{-4}\\text{ m}^2 = 0.001\\text{ m}^2$.',
            'Step 2 (Fluid velocities from Continuity): $v_1 = \\frac{Q}{A_1} = \\frac{0.02}{0.004} = 5.0\\text{ m/s}$. $v_2 = \\frac{Q}{A_2} = \\frac{0.02}{0.001} = 20.0\\text{ m/s}$.',
            'Step 3 (Bernoulli Equation on horizontal line $y_1 = y_2$): $P_1 + \\frac{1}{2}\\rho v_1^2 = P_2 + \\frac{1}{2}\\rho v_2^2$.',
            'Step 4 (Substitute values): $300,000 + \\frac{1}{2}(1000)(5.0)^2 = P_2 + \\frac{1}{2}(1000)(20.0)^2$.',
            'Step 5 (Compute terms): $300,000 + 12,500 = P_2 + 200,000 \\implies 312,500 = P_2 + 200,000$.',
            'Step 6 (Solve for $P_2$): $P_2 = 312,500 - 200,000 = 112,500\\text{ Pa} = 112.5\\text{ kPa}$.'
          ],
          shortcutTip: 'Pressure difference in horizontal flow: $\\Delta P = \\frac{1}{2}\\rho (v_2^2 - v_1^2)$. High speed always produces low static pressure.'
        }
      ],
      examTraps: [
        'Believing buoyant force depends on the mass or density of the submerged object. Buoyant force depends ONLY on the density of the surrounding fluid and the volume of fluid displaced: $F_b = \\rho_{\\text{fluid}} V_{\\text{sub}} g$.',
        'Confusing gauge pressure with absolute pressure in Bernoulli problems. Atmospheric pressure cancels only when both reference points are exposed to air.'
      ],
      keyTakeaways: [
        'Pascal\'s principle provides hydraulic force magnification proportional to piston area, but work/energy is conserved ($F_1 d_1 = F_2 d_2$).',
        'In Poiseuille flow, resistance scales as $1/r^4$; even minor clogging causes dramatic flow reduction.'
      ]
    }
  ],

  // Chapter 4: Heat and Thermodynamics
  4: [
    {
      id: 'phys-extra-c4-sec1',
      heading: '4.4 Masterclass: Thermal State Cycles, First Law Work Derivations & Carnot Heat Engine Limits',
      content: `### 4.4.1 Thermodynamics Work Across Four Prototypical Processes
Work done by an expanding gas on a piston is $W = \\int_{V_i}^{V_f} P\\, dV$:

| Thermodynamic Process | Defining Condition | Mathematical Identity | Work Done by Gas ($W$) | First Law Reformulation ($\\Delta U = Q - W$) |
| :--- | :--- | :--- | :--- | :--- |
| **Isobaric** | Constant Pressure ($P = \\text{const}$) | $\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$ (Charles) | $W = P(V_f - V_i)$ | $\\Delta U = Q - P\\Delta V = n C_v \\Delta T$ |
| **Isochoric (Isovolumetric)** | Constant Volume ($V = \\text{const}$) | $\\frac{P_1}{T_1} = \\frac{P_2}{T_2}$ (Gay-Lussac) | **$W = 0$** (zero boundary displacement) | $\\Delta U = Q_v = n C_v \\Delta T$ |
| **Isothermal** | Constant Temperature ($T = \\text{const}$) | $P_1 V_1 = P_2 V_2$ (Boyle) | $W = nRT \\ln\\left(\\frac{V_f}{V_i}\\right) = nRT \\ln\\left(\\frac{P_i}{P_f}\\right)$ | **$\\Delta U = 0 \\implies Q = W$** (all heat converts to work) |
| **Adiabatic** | Zero Heat Exchange ($Q = 0$) | $P V^\\gamma = \\text{const}$, $T V^{\\gamma - 1} = \\text{const}$ | $W = \\frac{P_i V_i - P_f V_f}{\\gamma - 1} = \\frac{nR(T_i - T_f)}{\\gamma - 1}$ | **$Q = 0 \\implies \\Delta U = -W$** (expansion cools the gas) |

- **Molar Heat Capacities Ratio**:
  - $C_p - C_v = R$ (Mayer's relation for ideal gas).
  - Adiabatic index $\\gamma = \\frac{C_p}{C_v}$ (for monatomic gas, $\\gamma = 5/3 \\approx 1.67$; for diatomic gas like $N_2$ or $O_2$, $\\gamma = 7/5 = 1.4$).

---

### 4.4.2 Heat Engines, Refrigerators & The Carnot Limit
1. **Heat Engine Operational Cycle**:
   Absorbs heat $Q_H$ from high-temperature reservoir at $T_H$, performs net work $W_{\\text{net}} = Q_H - Q_C$, and discharges waste heat $Q_C$ to low-temperature reservoir at $T_C$.
   - **Thermal Efficiency ($\\eta$)**:
     $$\\eta = \\frac{W_{\\text{net}}}{Q_H} = \\frac{Q_H - Q_C}{Q_H} = 1 - \\frac{Q_C}{Q_H}$$
2. **Carnot Engine Theorem (Max Theoretical Bound)**:
   Operates on two reversible isotherms and two reversible adiabats. By the Second Law of Thermodynamics:
   $$\\frac{Q_C}{Q_H} = \\frac{T_C}{T_H} \\implies \\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H}$$
   *(Temperatures $T_C$ and $T_H$ MUST be in Kelvin!)*
   - No real engine operating between two given thermal reservoirs can ever exceed the Carnot efficiency: $\\eta_{\\text{real}} < \\eta_{\\text{Carnot}}$.
3. **Refrigerators & Heat Pumps (Coefficient of Performance)**:
   - Refrigerator COP: $\\text{COP}_{\\text{ref}} = \\frac{Q_C}{W} = \\frac{T_C}{T_H - T_C}$.
   - Heat Pump COP: $\\text{COP}_{\\text{hp}} = \\frac{Q_H}{W} = \\frac{T_H}{T_H - T_C} = \\text{COP}_{\\text{ref}} + 1$.

---

### 4.4.3 Entropy & The Second Law of Thermodynamics
- **Clausius Definition of Entropy Change**:
  $$dS = \\frac{dQ_{\\text{rev}}}{T} \\implies \\Delta S = \\int_i^f \\frac{dQ_{\\text{rev}}}{T}$$
- **Second Law Formulation**: For any spontaneous irreversible process in an isolated system, the total entropy always strictly increases:
  $$\\Delta S_{\\text{isolated}} \\ge 0$$`,
      equations: [
        {
          name: 'Carnot Maximum Thermal Efficiency',
          formula: '\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H} = \\frac{T_H - T_C}{T_H}',
          description: 'Upper physical boundary for any thermodynamic conversion of thermal energy to mechanical work.'
        },
        {
          name: 'Isothermal Work for Ideal Gas',
          formula: 'W = n R T \\ln\\left(\\frac{V_f}{V_i}\\right)',
          description: 'Calculates reversible work performed along constant temperature isotherms on PV diagrams.'
        }
      ],
      workedExamples: [
        {
          problem: 'A heat engine operates between a boiler temperature of $500^\\circ\\text{C}$ and a condenser temperature of $50^\\circ\\text{C}$. In each cycle, it absorbs $6000\\text{ J}$ of heat from the boiler. (1) What is the maximum possible theoretical efficiency of this engine? (2) What is the maximum mechanical work it can deliver per cycle? (3) If the actual engine delivers $2200\\text{ J}$ of work per cycle, what is its actual efficiency and what percentage of the Carnot theoretical maximum does it achieve?',
          stepByStepSolution: [
            'Step 1 (Convert to Kelvin): $T_H = 500 + 273.15 = 773.15\\text{ K}$, $T_C = 50 + 273.15 = 323.15\\text{ K}$.',
            'Step 2 (Carnot Efficiency): $\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H} = 1 - \\frac{323.15}{773.15} = 1 - 0.41796 = 0.582 = 58.2\\%$.',
            'Step 3 (Maximum Work): $W_{\\max} = \\eta_{\\text{Carnot}} \\times Q_H = (0.582)(6000\\text{ J}) = 3492\\text{ J}$.',
            'Step 4 (Actual Efficiency): $\\eta_{\\text{actual}} = \\frac{W_{\\text{actual}}}{Q_H} = \\frac{2200\\text{ J}}{6000\\text{ J}} = 0.3667 = 36.67\\%$.',
            'Step 5 (Fraction of Carnot): $\\frac{\\eta_{\\text{actual}}}{\\eta_{\\text{Carnot}}} = \\frac{0.3667}{0.582} \\times 100\\% = 63.0\\%$.'
          ],
          shortcutTip: 'Never plug Celsius into Carnot efficiency formulas! $\\eta \\neq 1 - (50/500) = 90\\%$. Always add 273.15 first!'
        }
      ],
      examTraps: [
        'Using temperatures in degrees Celsius ($^\\circ\\text{C}$) in thermodynamic efficiency or gas law equations ($PV=nRT$). You must ALWAYS convert to Kelvin ($K = ^\\circ\\text{C} + 273.15$).',
        'Confusing adiabatic ($Q=0$) with isothermal ($T=\\text{constant}$). In an adiabatic expansion, no heat enters, but temperature DROPS because the gas does work at the expense of its internal energy.'
      ],
      keyTakeaways: [
        'Internal energy $U$ of an ideal gas depends solely on its absolute temperature $T$; therefore, for any isothermal process, $\\Delta U = 0$.',
        'In any complete thermodynamic cycle returning to the initial state, $\\Delta U_{\\text{cycle}} = 0$ and net work equals the enclosed area on the $PV$ diagram.'
      ]
    }
  ],

  // Chapter 5: Oscillations, Waves and Optics
  5: [
    {
      id: 'phys-extra-c5-sec1',
      heading: '5.4 Masterclass: SHM Differential Mechanics, Wave Superposition, Doppler Shift & Lensmaker Optics',
      content: `### 5.4.1 Simple Harmonic Motion (SHM) Mechanics & Energy
1. **Differential Equation of SHM**:
   $$F = -kx = m \\frac{d^2x}{dt^2} \\implies \\frac{d^2x}{dt^2} + \\omega^2 x = 0, \\quad \\text{where } \\omega = \\sqrt{\\frac{k}{m}}$$
2. **Kinematic Equations**:
   - Position: $x(t) = A\\cos(\\omega t + \\phi)$
   - Velocity: $v(t) = \\frac{dx}{dt} = -A\\omega\\sin(\\omega t + \\phi) \\implies v(x) = \\pm \\omega\\sqrt{A^2 - x^2}$
   - Acceleration: $a(t) = \\frac{dv}{dt} = -A\\omega^2\\cos(\\omega t + \\phi) = -\\omega^2 x(t)$
   - Maximum Extrema: $x_{\\max} = A$, $v_{\\max} = A\\omega$, $a_{\\max} = A\\omega^2$.
3. **Energy Partition in SHM**:
   - Potential Energy: $U(x) = \\frac{1}{2}kx^2 = \\frac{1}{2}kA^2\\cos^2(\\omega t + \\phi)$
   - Kinetic Energy: $K(x) = \\frac{1}{2}mv^2 = \\frac{1}{2}kA^2\\sin^2(\\omega t + \\phi)$
   - Total Conserved Mechanical Energy:
     $$E = U + K = \\frac{1}{2}kA^2 = \\frac{1}{2}m v_{\\max}^2 = \\text{constant}$$
4. **Simple Pendulum (Small Angle Approximation $\\sin\\theta \\approx \\theta$)**:
   $$\\tau = -mgL\\sin\\theta \\approx -mgL\\theta = I\\alpha = (mL^2)\\frac{d^2\\theta}{dt^2} \\implies \\frac{d^2\\theta}{dt^2} + \\left(\\frac{g}{L}\\right)\\theta = 0$$
   $$\\omega = \\sqrt{\\frac{g}{L}} \\implies T = 2\\pi\\sqrt{\\frac{L}{g}}$$
   Period depends only on length $L$ and local gravity $g$, completely independent of pendulum mass.

---

### 5.4.2 The Doppler Effect for Sound
When source ($S$) and observer ($O$) move along the line connecting them with speeds $v_s$ and $v_o$ relative to air (sound speed $v$):
$$f_o = f_s \\left(\\frac{v \\pm v_o}{v \\mp v_s}\\right)$$
- **Sign Convention Rule**:
  - **Approaching**: Frequency **increases** (use $+$ in numerator for observer approaching, $-$ in denominator for source approaching).
  - **Receding**: Frequency **decreases** (use $-$ in numerator for observer receding, $+$ in denominator for source receding).

---

### 5.4.3 Geometric Optics: Thin Lenses & Sign Conventions
1. **Gaussian Thin Lens Equation**:
   $$\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}$$
2. **Lateral Magnification**:
   $$m = \\frac{h_i}{h_o} = -\\frac{d_i}{d_o}$$
3. **Cartesian Sign Convention Table**:

| Parameter | Positive ($+$) Sign | Negative ($-$) Sign |
| :--- | :--- | :--- |
| **Focal Length ($f$)** | **Converging** lens (Convex) / Concave mirror | **Diverging** lens (Concave) / Convex mirror |
| **Object Distance ($d_o$)** | **Real** object (in front of lens/mirror) | Virtual object (behind lens/mirror) |
| **Image Distance ($d_i$)** | **Real** image (behind lens / in front of mirror) | **Virtual** image (in front of lens / behind mirror) |
| **Magnification ($m$)** | **Upright** (erect) image | **Inverted** image |

4. **Lensmaker\'s Equation**:
   $$\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$$
   Where $n$ is index of refraction of glass, and $R_1, R_2$ are radii of curvature of the two surfaces.`,
      equations: [
        {
          name: 'General Doppler Frequency Equation',
          formula: 'f_o = f_s \\left(\\frac{v + v_o}{v - v_s}\\right) \\quad (\\text{approach configuration})',
          description: 'Calculates perceived frequency shift when both sound source and observer are in motion.'
        },
        {
          name: 'Thin Lens and Mirror Optical Formula',
          formula: '\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}, \\qquad m = -\\frac{d_i}{d_o}',
          description: 'Predicts real/virtual image locations, inverted/upright orientation, and scale.'
        }
      ],
      workedExamples: [
        {
          problem: 'An object of height $h_o = 4\\text{ cm}$ is placed $30\\text{ cm}$ in front of a converging thin lens with focal length $f = +10\\text{ cm}$. (1) Find the image position $d_i$; (2) Find the image magnification $m$ and height $h_i$; (3) Characterize whether the image is real or virtual, and upright or inverted.',
          stepByStepSolution: [
            'Step 1 (Thin lens equation): $\\frac{1}{d_i} = \\frac{1}{f} - \\frac{1}{d_o} = \\frac{1}{10} - \\frac{1}{30}$.',
            'Step 2 (Common denominator): $\\frac{1}{d_i} = \\frac{3 - 1}{30} = \\frac{2}{30} = \\frac{1}{15} \\implies d_i = +15\\text{ cm}$.',
            'Step 3 (Magnification): $m = -\\frac{d_i}{d_o} = -\\frac{15}{30} = -0.5$.',
            'Step 4 (Image height): $h_i = m \\cdot h_o = (-0.5)(4\\text{ cm}) = -2.0\\text{ cm}$.',
            'Step 5 (Characterization): Since $d_i > 0$, the image is **Real** (formed behind the lens); since $m < 0$, the image is **Inverted**; since $|m| = 0.5 < 1$, the image is **Reduced in size** to half the object height.'
          ],
          shortcutTip: 'For any object placed beyond $2f$ of a converging lens ($30 > 20$), the image always lands between $f$ and $2f$, real, inverted, and diminished.'
        }
      ],
      examTraps: [
        'Confusing wave speed ($v = \\lambda f$) with the transverse particle velocity ($v_y = \\partial y/\\partial t$). Wave speed depends solely on the tension and linear density of the medium ($v = \\sqrt{T/\\mu}$), not on frequency or amplitude!',
        'Forgetting the minus sign in magnification $m = -d_i / d_o$. A positive image distance yields a negative magnification, which signifies an inverted real image.'
      ],
      keyTakeaways: [
        'In SHM, acceleration is proportional to displacement but opposite in direction: $a = -\\omega^2 x$.',
        'Total energy in SHM scales quadratically with amplitude ($E \\propto A^2$); doubling amplitude quadruples total mechanical energy.'
      ]
    }
  ],

  // Chapter 6: Electromagnetism and Electronics
  6: [
    {
      id: 'phys-extra-c6-sec1',
      heading: '6.4 Masterclass: Gauss Flux, Kirchhoff Loop Matrix, Lorentz Force & Transistor Switch Mechanics',
      content: `### 6.4.1 Electrostatics: Gauss\'s Law & Capacitance
1. **Gauss\'s Law for Electric Flux**:
   $$\\Phi_E = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{\\text{enclosed}}}{\\varepsilon_0}$$
   - **Uniform Infinite Sheet**: $E = \\frac{\\sigma}{2\\varepsilon_0}$.
   - **Between Oppositely Charged Parallel Plates**: $E = \\frac{\\sigma}{\\varepsilon_0} = \\frac{V}{d}$.
2. **Capacitance & Dielectric Polarization**:
   $$C = \\frac{Q}{V} = \\kappa \\varepsilon_0 \\frac{A}{d} = \\kappa C_0$$
   - Dielectric constant $\\kappa > 1$ reduces electric field ($E = E_0/\\kappa$) and increases capacitance.
   - **Electrostatic Energy Stored**:
     $$U_E = \\frac{1}{2}Q V = \\frac{1}{2}C V^2 = \\frac{Q^2}{2C}$$

---

### 6.4.2 Circuit Analysis: Kirchhoff\'s Laws & RC Transients
1. **Kirchhoff\'s Current Law (KCL - Charge Conservation)**:
   $$\\sum I_{\\text{in}} = \\sum I_{\\text{out}} \\quad \\text{at any node/junction}$$
2. **Kirchhoff\'s Voltage Law (KVL - Energy Conservation)**:
   $$\\sum \\Delta V = 0 \\quad \\text{around any closed loop}$$
3. **RC Circuit Charging and Discharging**:
   - Charging: $q(t) = C\\mathcal{E}(1 - e^{-t/RC})$, $\\quad I(t) = \\frac{\\mathcal{E}}{R}e^{-t/RC}$.
   - Discharging: $q(t) = Q_0 e^{-t/RC}$, $\\quad I(t) = -\\frac{Q_0}{RC}e^{-t/RC}$.
   - **Time Constant ($\\tau = RC$)**: Time required for charging capacitor to reach $(1 - e^{-1}) \\approx 63.2\\%$ of maximum charge.

---

### 6.4.3 Magnetism: Lorentz Force & Faraday\'s Induction
1. **Lorentz Force on a Moving Charge**:
   $$\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B})$$
   - Magnetic force $\\vec{F}_B = q(\\vec{v} \\times \\vec{B})$ does **zero work** because $\\vec{F}_B \\perp \\vec{v}$ at all times ($W = \\int \\vec{F}_B \\cdot d\\vec{r} = 0$). It changes the direction of motion, not the kinetic energy or speed!
   - In uniform perpendicular $\\vec{B}$ field, charge executes uniform circular motion with radius:
     $$r = \\frac{mv}{qB}, \\qquad \\omega_{\\text{cyclotron}} = \\frac{qB}{m}$$
2. **Faraday\'s Law of Electromagnetic Induction & Lenz\'s Law**:
   $$\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(B A \\cos\\theta)$$
   The negative sign (Lenz's Law) indicates that the induced current generates an opposing magnetic flux that resists the change in original flux.

---

### 6.4.4 Electronics: Semiconductors, Diodes & BJT Transistors
1. **Semiconductors**:
   - **Intrinsic Silicon**: Group IV, energy bandgap $E_g \\approx 1.1\\text{ eV}$.
   - **n-type**: Doped with Pentavalent impurities (P, As, Sb - donors); electrons are majority carriers, holes are minority carriers.
   - **p-type**: Doped with Trivalent impurities (B, Al, Ga - acceptors); holes are majority carriers, electrons are minority carriers.
2. **p-n Junction Diode**:
   - Barrier potential $\\approx 0.7\\text{ V}$ for Silicon, $0.3\\text{ V}$ for Germanium.
   - Forward bias narrows depletion region; reverse bias widens depletion region.
3. **Bipolar Junction Transistor (BJT)**:
   - Three terminals: **Emitter (E)**, **Base (B)**, **Collector (C)**.
   - Current relationship: $I_E = I_B + I_C$.
   - Current gain: $\\beta = \\frac{I_C}{I_B} \\gg 1$ (typically $50\\text{--}300$).
   - Functions: Small base current $I_B$ switches or amplifies large collector current $I_C$.`,
      equations: [
        {
          name: 'Cyclotron Orbit Radius in Magnetic Field',
          formula: 'r = \\frac{m v}{q B}',
          description: 'Used to calculate ion trajectory radii in mass spectrometers and particle accelerators.'
        },
        {
          name: 'Faraday-Lenz Law of Induction',
          formula: '\\mathcal{E} = -N \\frac{d\\Phi_B}{dt}',
          description: 'Fundamental governing law for electric power generators and transformers.'
        }
      ],
      workedExamples: [
        {
          problem: 'A circular coil of $N = 50\\text{ turns}$ and radius $r = 10\\text{ cm}$ is placed in a uniform magnetic field $B = 0.4\\text{ T}$ perpendicular to the plane of the coil. Over a time interval $\\Delta t = 0.05\\text{ s}$, the magnetic field is uniformly reduced to zero. (1) Find the initial magnetic flux through one turn of the coil; (2) Determine the magnitude of the average induced EMF in the coil.',
          stepByStepSolution: [
            'Step 1 (Coil area): $A = \\pi r^2 = \\pi (0.1\\text{ m})^2 = 0.01\\pi \\approx 0.0314\\text{ m}^2$.',
            'Step 2 (Initial flux): Since field is perpendicular to coil surface, normal vector is parallel to field ($\\theta = 0^\\circ$): $\\Phi_{B,i} = B A \\cos(0^\\circ) = (0.4)(0.0314)(1) = 0.01257\\text{ Wb}$.',
            'Step 3 (Final flux): $\\Phi_{B,f} = 0\\text{ Wb}$.',
            'Step 4 (Rate of flux change): $\\frac{\\Delta \\Phi_B}{\\Delta t} = \\frac{0 - 0.01257}{0.05} = -0.2513\\text{ Wb/s}$.',
            'Step 5 (Induced EMF): $|\\mathcal{E}| = N \\left|\\frac{\\Delta \\Phi_B}{\\Delta t}\\right| = 50 \\times 0.2513 = 12.57\\text{ V}$.'
          ],
          shortcutTip: 'Induced EMF $= N A \\frac{\\Delta B}{\\Delta t}$ when area and orientation are held constant.'
        }
      ],
      examTraps: [
        'Believing magnetic forces do work on free moving charges. The magnetic force is always strictly perpendicular to velocity: $\\vec{F}_B \\cdot \\vec{v} = 0$, so work done is identically zero; speed remains constant.',
        'Confusing donor and acceptor dopants: Donors create n-type material with free electrons; acceptors create p-type material with mobile holes.'
      ],
      keyTakeaways: [
        'Kirchhoff\'s Junction Rule enforces conservation of charge; the Loop Rule enforces conservation of electrical energy.',
        'In an RC charging circuit, current starts at maximum $\\mathcal{E}/R$ and decays exponentially to zero as capacitor voltage charges toward $\\mathcal{E}$.'
      ]
    }
  ],

  // Chapter 7: Cross Cutting Applications of Physics
  7: [
    {
      id: 'phys-extra-c7-sec1',
      heading: '7.4 Masterclass: Radiocarbon Half-Life Kinetics, Medical Imaging Physics & Betz Wind Limits',
      content: `### 7.4.1 Nuclear Decay Kinetics & Radiocarbon Dating Mechanics
- **Radioactive Decay Law**:
  $$N(t) = N_0 e^{-\\lambda t}$$
  Where $\\lambda$ is the decay constant, $N_0$ is initial nuclei count at $t=0$, and $N(t)$ is remaining active nuclei.
- **Half-Life ($T_{1/2}$)**: Time required for half the original radioactive nuclei to decay:
  $$\\frac{N_0}{2} = N_0 e^{-\\lambda T_{1/2}} \\implies \\ln(2) = \\lambda T_{1/2} \\implies T_{1/2} = \\frac{\\ln 2}{\\lambda} \\approx \\frac{0.693}{\\lambda}$$
- **Activity ($A$)**: Decay rate in Becquerels ($1\\text{ Bq} = 1\\text{ decay/second}$):
  $$A(t) = -\\frac{dN}{dt} = \\lambda N(t) = A_0 e^{-\\lambda t}$$
- **Carbon-14 Dating Mechanics**:
  - Cosmic rays form $^{14}\\text{C}$ in upper atmosphere ($^{14}\\text{N} + n \\to ^{14}\\text{C} + p$).
  - Living organisms ingest $^{14}\\text{C}$ via photosynthetic food chains, maintaining constant equilibrium ratio $^{14}\\text{C} / ^{12}\\text{C} \\approx 1.3 \\times 10^{-12}$.
  - At death, carbon intake ceases; $^{14}\\text{C}$ decays by $\\beta^-$ emission ($^{14}\\text{C} \\to ^{14}\\text{N} + e^- + \\bar{\\nu}_e$) with half-life $T_{1/2} = 5730\\text{ years}$.
  - Measuring remaining activity ratio determines organic specimen age:
    $$t = -\\frac{1}{\\lambda}\\ln\\left(\\frac{A(t)}{A_0}\\right) = -\\frac{5730}{\\ln 2}\\ln\\left(\\frac{A(t)}{A_0}\\right)$$

---

### 7.4.2 Biophysics & Medical Diagnostic Imaging
1. **X-Ray Radiography & Computed Tomography (CT)**:
   - High-energy electrons strike a tungsten anode, producing Bremsstrahlung and characteristic X-rays.
   - Attenuation follows Beer-Lambert law: $I(x) = I_0 e^{-\\mu x}$, where linear attenuation coefficient $\\mu$ is much higher in dense bone ($Z_{\\text{eff}} \\approx 13.8$) than soft muscle tissue ($Z_{\\text{eff}} \\approx 7.4$).
2. **Magnetic Resonance Imaging (MRI)**:
   - Utilizes nuclear magnetic resonance of hydrogen protons ($^1\\text{H}$) in water molecules.
   - Strong static magnetic field $B_0$ aligns nuclear magnetic moments; radiofrequency (RF) pulses tip them into precession at the Larmor frequency $\\omega_0 = \\gamma B_0$. Relaxation signals reveal anatomical soft-tissue contrast with **zero ionizing radiation**.
3. **Medical Ultrasound Imaging**:
   - Piezoelectric transducers emit high-frequency acoustic waves ($2\\text{--}15\\text{ MHz}$).
   - Reflection intensity depends on mismatch in acoustic impedance $Z = \\rho c$:
     $$R = \\left(\\frac{Z_2 - Z_1}{Z_2 + Z_1}\\right)^2$$
     Acoustic coupling gel eliminates air gaps ($Z_{\\text{air}} \\ll Z_{\\text{tissue}}$) to prevent total reflection at skin surface.

---

### 7.4.3 Renewable Energy Physics: Betz Limit for Wind Turbines
The kinetic energy flux of an air mass of density $\\rho$ passing through rotor area $A$ at speed $v$ is $P_{\\text{wind}} = \\frac{1}{2}\\rho A v^3$.
- **Betz\'s Law**: No wind turbine can convert more than $\\frac{16}{27} \\approx 59.3\\%$ of the wind's kinetic energy into electrical power:
  $$P_{\\max} = \\frac{16}{27}\\left(\\frac{1}{2}\\rho A v^3\\right) \\approx 0.593 \\, P_{\\text{wind}}$$
  Because air exiting the turbine must retain non-zero speed to move away and make room for incoming air.`,
      equations: [
        {
          name: 'Radioactive Decay Age Formula',
          formula: 't = \\frac{T_{1/2}}{\\ln 2} \\ln\\left(\\frac{A_0}{A}\\right)',
          description: 'Calculates archaeological and paleontological ages of carbon-bearing organic artifacts.'
        },
        {
          name: 'Wind Kinetic Power Equation',
          formula: 'P = \\frac{1}{2}\\rho A v^3',
          description: 'Shows that available wind power scales with the cube of wind speed; doubling speed yields 8x power.'
        }
      ],
      workedExamples: [
        {
          problem: 'An ancient wooden tool discovered at an Ethiopian archaeological site exhibits a $^{14}\\text{C}$ activity of $3.0\\text{ decays/min}$ per gram of carbon. Fresh living wood has a $^{14}\\text{C}$ activity of $15.0\\text{ decays/min}$ per gram of carbon. Given that the half-life of Carbon-14 is $5730\\text{ years}$: (1) What fraction of original $^{14}\\text{C}$ remains? (2) Calculate the age of the wooden tool.',
          stepByStepSolution: [
            'Step 1 (Activity fraction): $\\frac{A(t)}{A_0} = \\frac{3.0}{15.0} = 0.20$ (i.e., $20\\%$ remains).',
            'Step 2 (Decay constant $\\lambda$): $\\lambda = \\frac{\\ln 2}{T_{1/2}} = \\frac{0.69315}{5730\\text{ yr}} \\approx 1.2097 \\times 10^{-4}\\text{ yr}^{-1}$.',
            'Step 3 (Solve decay equation): $A(t) = A_0 e^{-\\lambda t} \\implies \\ln(0.20) = -\\lambda t$.',
            'Step 4 (Evaluate logarithm): $\\ln(0.20) = -1.6094$.',
            'Step 5 (Compute age): $t = \\frac{-1.6094}{-1.2097 \\times 10^{-4}} = 13,304\\text{ years}$.',
            'Result: The wooden artifact is approximately **$13,300\\text{ years}$ old**.'
          ],
          shortcutTip: 'Notice $20\\%$ is between $25\\%$ (2 half-lives $= 11,460\\text{ yr}$) and $12.5\\%$ (3 half-lives $= 17,190\\text{ yr}$). Expected age must fall in this interval.'
        }
      ],
      examTraps: [
        'Believing wind turbine power scales linearly with wind velocity. Power is proportional to $v^3$; a $20\\%$ increase in wind speed increases available power by $(1.2)^3 - 1 = 72.8\\%$.',
        'Confusing ionizing radiation (X-rays, gamma rays) with non-ionizing imaging modalities (Ultrasound, MRI). Ultrasound uses mechanical pressure waves, and MRI uses radiofrequency electromagnetic waves, both posing zero radiation risk.'
      ],
      keyTakeaways: [
        'Radiocarbon dating is valid only for organic specimens up to $\\sim 50,000\\text{ years}$; older fossils require potassium-argon or uranium-lead dating.',
        'Betz\'s limit ($59.3\\%$) represents the theoretical maximum aerodynamic power extraction from fluid streams.'
      ]
    }
  ]
};
