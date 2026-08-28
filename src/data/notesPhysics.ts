import { MasterNoteChapter } from '../types';

export const PHYSICS_MASTER_NOTES: MasterNoteChapter[] = [
  {
    id: 'phys-ch1-mechanics',
    subject: 'physics',
    chapterNumber: 1,
    title: 'Mechanics: Kinematics, Projectile Motion & Dynamics',
    gradeLevel: 'Grade 11 & 12 Advanced',
    overview: 'Comprehensive notes covering 1D/2D Kinematics, Projectile Trajectory equations, Newton’s 3 Laws of Motion, Friction on Inclines, Atwood Pulley Systems, Circular Motion, and Banking of Highways.',
    estimatedReadTimeMinutes: 30,
    sections: [
      {
        id: 'phys-1-1-kinematics',
        heading: '1.1 Kinematics in 1D and 2D Projectile Equations',
        content: `Kinematics describes motion without regard to its causes.

### 1D Constant Acceleration Equations (SUVAT):
1. $v = u + at$
2. $s = ut + \\frac{1}{2}at^2$
3. $v^2 = u^2 + 2as$
4. $s = \\left(\\frac{u + v}{2}\\right)t$
5. $s_n = u + \\frac{a}{2}(2n - 1)$ *(Distance covered specifically in the $n$-th second)*

### 2D Projectile Motion (Launched at angle $\\theta$ with initial speed $u$):
- Horizontal component: $u_x = u \\cos\\theta$, $a_x = 0$, $x(t) = (u \\cos\\theta) t$
- Vertical component: $u_y = u \\sin\\theta$, $a_y = -g$, $y(t) = (u \\sin\\theta) t - \\frac{1}{2}gt^2$

### Key Projectile Formulas (Must Memorize):
- **Time of Flight**: $T = \\frac{2 u \\sin\\theta}{g}$
- **Maximum Height**: $H = \\frac{u^2 \\sin^2\\theta}{2g}$
- **Horizontal Range**: $R = \\frac{u^2 \\sin(2\\theta)}{g}$
- **Maximum Range Angle**: $\\theta = 45^\\circ \\implies R_{\\text{max}} = \\frac{u^2}{g} = 4 H_{\\text{max}}$
- **Equation of Trajectory**: $y = x \\tan\\theta - \\frac{g x^2}{2 u^2 \\cos^2\\theta} = x \\tan\\theta \\left(1 - \\frac{x}{R}\\right)$`,
        equations: [
          {
            name: "Trajectory Factorized Form",
            formula: "y = x \\tan\\theta \\left(1 - \\frac{x}{R}\\right)",
            explanation: "Extremely fast trick when given range $R$ and coordinates $(x,y)$."
          },
          {
            name: "Ratio of Max Range to Height",
            formula: "R = 4 H \\cot\\theta \\implies \\tan\\theta = \\frac{4H}{R}",
            explanation: "Instantly gives launch angle when range and max height are provided."
          }
        ],
        workedExamples: [
          {
            problem: "A projectile is launched from ground level such that its horizontal range is 4 times its maximum height ($R = 4H$). Find the launch angle $\\theta$.",
            stepByStepSolution: [
              "We know $R = \\frac{u^2 \\sin(2\\theta)}{g} = \\frac{2 u^2 \\sin\\theta \\cos\\theta}{g}$.",
              "We know $H = \\frac{u^2 \\sin^2\\theta}{2g}$.",
              "Set $R = 4H$: $\\frac{2 u^2 \\sin\\theta \\cos\\theta}{g} = 4 \\left( \\frac{u^2 \\sin^2\\theta}{2g} \\right)$.",
              "Simplify: $2 \\cos\\theta = 2 \\sin\\theta \\implies \\tan\\theta = 1 \\implies \\theta = 45^\\circ$."
            ],
            shortcutTip: "Use direct formula $\\tan\\theta = \\frac{4H}{R}$. When $R = 4H$, $\\tan\\theta = 1 \\implies \\theta = 45^\\circ$ in 2 seconds!"
          }
        ],
        examTraps: [
          "Forgetting that horizontal velocity remains CONSTANT ($v_x = u \\cos\\theta$) throughout the flight, even at peak height where vertical velocity is zero.",
          "Using $g = 9.8$ vs $g = 10$ m/s$^2$. On Ethiopian entrance exams, check if the question prompt states $g = 10\\text{ m/s}^2$ for cleaner round numbers."
        ],
        keyTakeaways: [
          "Complementary launch angles $\\theta$ and $90^\\circ - \\theta$ produce identical horizontal ranges $R$ for the same initial velocity.",
          "At maximum height, the speed is NOT zero; it is equal to $u \\cos\\theta$."
        ]
      },
      {
        id: 'phys-1-2-dynamics-inclines',
        heading: '1.2 Dynamics, Friction, Atwood Pulley Systems & Inclined Planes',
        content: `Newton's Laws of Motion form the basis of classical mechanics.

### Newton's Laws:
1. **1st Law (Inertia)**: An object remains at rest or constant velocity unless acted upon by a net external force ($\\Sigma \\vec{F} = 0$).
2. **2nd Law (Momentum & Force)**: $\\Sigma \\vec{F} = m \\vec{a} = \\frac{d\\vec{p}}{dt}$.
3. **3rd Law (Action-Reaction)**: $\\vec{F}_{AB} = -\\vec{F}_{BA}$ (equal in magnitude, opposite in direction, acting on *different* bodies).

### Inclined Plane Mechanics:
For a block of mass $m$ on an incline of angle $\\theta$:
- Normal force: $N = mg \\cos\\theta$
- Parallel gravity force down incline: $F_{\\parallel} = mg \\sin\\theta$
- Max static friction: $f_s^{\\text{max}} = \\mu_s N = \\mu_s mg \\cos\\theta$
- Kinetic friction: $f_k = \\mu_k mg \\cos\\theta$
- Angle of Repose (angle where block just begins to slide): $\\tan\\theta = \\mu_s$
- Downward acceleration (with friction): $a = g(\\sin\\theta - \\mu_k \\cos\\theta)$
- Upward acceleration under push: $a = g(\\sin\\theta + \\mu_k \\cos\\theta)$

### Atwood Pulley Machine & Connected Systems:
1. **Standard Atwood (Two hanging masses $m_1 > m_2$)**:
   $$a = \\frac{m_1 - m_2}{m_1 + m_2} g, \\quad T = \\frac{2 m_1 m_2}{m_1 + m_2} g$$
2. **Table Pulley (Mass $M$ on frictionless horizontal table connected to hanging mass $m$)**:
   $$a = \\frac{m}{M + m} g, \\quad T = \\frac{M m}{M + m} g$$`,
        equations: [
          {
            name: "Atwood Machine Acceleration",
            formula: "a = \\frac{\\text{Net Driving Force}}{\\text{Total Mass System}} = \\frac{m_1 - m_2}{m_1 + m_2} g",
            explanation: "System approach: treat entire chain as one connected mass."
          },
          {
            name: "Banking Angle for Curved Roads",
            formula: "\\tan\\theta = \\frac{v^2}{r g}",
            explanation: "Ideal frictionless road banking angle where normal force supplies centripetal force."
          }
        ],
        workedExamples: [
          {
            problem: "Two masses $m_1 = 6\\text{ kg}$ and $m_2 = 4\\text{ kg}$ are connected by a light string over a frictionless pulley. Find the acceleration and tension in the string ($g = 10\\text{ m/s}^2$).",
            stepByStepSolution: [
              "Identify driving force: $(m_1 - m_2)g = (6 - 4)(10) = 20\\text{ N}$.",
              "Total system mass: $m_1 + m_2 = 6 + 4 = 10\\text{ kg}$.",
              "Acceleration: $a = \\frac{20}{10} = 2\\text{ m/s}^2$.",
              "Tension: $T = m_2(g + a) = 4(10 + 2) = 48\\text{ N}$ or $T = m_1(g - a) = 6(10 - 2) = 48\\text{ N}$."
            ]
          }
        ],
        examTraps: [
          "Action-Reaction pairs NEVER cancel each other because they act on TWO DIFFERENT objects.",
          "Assuming normal force is always $mg$. On an incline, $N = mg \\cos\\theta$; with an angled applied force, $N = mg \\pm F \\sin\\theta$."
        ],
        keyTakeaways: [
          "Static friction adjusts to match applied force up to $f_s^{\\text{max}} = \\mu_s N$. Once sliding occurs, kinetic friction is constant $f_k = \\mu_k N$.",
          "Centripetal force is not a new physical force; it is the net inward radial force ($F_c = \\frac{m v^2}{r} = m \\omega^2 r$)."
        ]
      }
    ]
  },
  {
    id: 'phys-ch2-electromagnetism',
    subject: 'physics',
    chapterNumber: 2,
    title: 'Electricity, DC Circuits, Magnetism & Electromagnetic Induction',
    gradeLevel: 'Grade 11 & 12 Advanced',
    overview: 'In-depth review of Coulomb’s Law, Gauss’s Law, Electric Potential, Capacitors & Dielectrics, Kirchhoff’s Circuit Laws, Wheatstone Bridge, Magnetic Forces, Biot-Savart, Ampère’s Law, Faraday’s Law & Lenz’s Law.',
    estimatedReadTimeMinutes: 32,
    sections: [
      {
        id: 'phys-2-1-circuits',
        heading: '2.1 DC Circuits, Resistor Networks & Kirchhoff’s Laws',
        content: `Electric current $I = \\frac{dQ}{dt}$ is the rate of flow of electric charge.

### Fundamental Circuit Laws:
1. **Ohm's Law**: $V = I R \\implies R = \\rho \\frac{L}{A}$ (where $\\rho$ is resistivity, $L$ is length, $A = \\pi r^2$ is cross-sectional area).
2. **Joule's Heating / Electric Power**:
   $$P = V I = I^2 R = \\frac{V^2}{R}, \\quad E = P t$$

### Series vs Parallel Combinations:
- **Resistors**:
  - Series: $R_{\\text{eq}} = R_1 + R_2 + \\dots + R_n$ (Current is same, voltages add)
  - Parallel: $\\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots \\implies R_{\\text{eq}} = \\frac{R_1 R_2}{R_1 + R_2}$ for 2 resistors.
- **Capacitors**:
  - Parallel: $C_{\\text{eq}} = C_1 + C_2 + \\dots + C_n$
  - Series: $\\frac{1}{C_{\\text{eq}}} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\dots$
  - Energy stored: $U = \\frac{1}{2} C V^2 = \\frac{Q^2}{2C} = \\frac{1}{2} Q V$

### Kirchhoff's Rules:
- **Junction Rule (KCL)**: $\\Sigma I_{\\text{in}} = \\Sigma I_{\\text{out}}$ (Conservation of Charge).
- **Loop Rule (KVL)**: $\\Sigma \\Delta V = 0$ around any closed loop (Conservation of Energy).
- **Wheatstone Bridge Balance**: When galvanometer reads zero, $\\frac{R_1}{R_2} = \\frac{R_3}{R_4}$.`,
        equations: [
          {
            name: "Capacitance & Dielectric Effect",
            formula: "C = \\kappa \\epsilon_0 \\frac{A}{d}",
            explanation: "Inserting dielectric $\\kappa > 1$ increases capacitance by factor $\\kappa$."
          },
          {
            name: "Magnetic Force on Charge & Wire",
            formula: "\\vec{F} = q(\\vec{v} \\times \\vec{B}) \\implies F = q v B \\sin\\theta \\quad \\text{and} \\quad \\vec{F} = I(\\vec{L} \\times \\vec{B})",
            explanation: "Right-Hand Rule determines direction of magnetic Lorentz force."
          }
        ],
        workedExamples: [
          {
            problem: "A wire of resistance $R = 16\\,\\Omega$ is stretched uniformly until its length is doubled ($L' = 2L$). Find its new resistance.",
            stepByStepSolution: [
              "When a wire is stretched, its volume $V = A \\cdot L$ remains constant.",
              "Doubling length $L' = 2L \\implies A' = \\frac{A}{2}$.",
              "New resistance $R' = \\rho \\frac{L'}{A'} = \\rho \\frac{2L}{A/2} = 4 \\left(\\rho \\frac{L}{A}\\right) = 4 R$.",
              "Therefore, $R' = 4 \\times 16 = 64\\,\\Omega$."
            ],
            shortcutTip: "Uniform stretching rule: $R' = n^2 R$, where $n$ is length multiplier. $2^2 \\times 16 = 64\\,\\Omega$ instantly!"
          }
        ],
        examTraps: [
          "Confusing capacitor vs resistor formulas: capacitors ADD directly in parallel, while resistors ADD directly in series.",
          "Magnetic force does NO work on a moving charge because $\\vec{F} \\perp \\vec{v} \\implies W = \\vec{F} \\cdot \\vec{d} = 0$. Hence magnetic fields alter direction, NOT kinetic energy."
        ],
        keyTakeaways: [
          "Faraday's Law of Induction: $\\mathcal{E} = -N \\frac{d\\Phi_B}{dt}$, where magnetic flux $\\Phi_B = B A \\cos\\theta$.",
          "Lenz's Law: The induced current always flows in a direction such that its magnetic field opposes the change in flux creating it."
        ]
      }
    ]
  },
  {
    id: 'phys-ch3-waves-optics-modern',
    subject: 'physics',
    chapterNumber: 3,
    title: 'Waves, Physical Optics & Modern Physics',
    gradeLevel: 'Grade 11 & 12 Advanced',
    overview: 'Wave mechanics, Doppler Effect, Standing Waves, Thin Lens Equation, Wave Optics (Interference & Diffraction), Photoelectric Effect, and Bohr Model of Hydrogen Atom.',
    estimatedReadTimeMinutes: 28,
    sections: [
      {
        id: 'phys-3-1-waves-optics',
        heading: '3.1 Wave Properties, Doppler Effect & Modern Physics',
        content: `### Wave Equation & Sound:
- Wave speed: $v = f \\lambda = \\frac{\\omega}{k}$
- Wave speed on a stretched string: $v = \\sqrt{\\frac{T}{\\mu}}$ (where $T$ is tension, $\\mu = \\frac{m}{L}$ is linear mass density).
- Sound intensity level: $\\beta = 10 \\log_{10}\\left(\\frac{I}{I_0}\\right)$ dB, with $I_0 = 10^{-12}\\text{ W/m}^2$.
- **Doppler Effect for Sound**:
  $$f' = f \\left( \\frac{v \\pm v_o}{v \\mp v_s} \\right)$$
  *(Top signs: moving TOWARDS each other $\\implies$ higher frequency; Bottom signs: moving AWAY $\\implies$ lower frequency).*

### Geometric & Wave Optics:
- Snell's Law: $n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2$
- Critical Angle (Total Internal Reflection): $\\sin\\theta_c = \\frac{n_2}{n_1}$ ($n_1 > n_2$).
- Thin Lens & Mirror Formula: $\\frac{1}{f} = \\frac{1}{d_o} + \\frac{1}{d_i}, \\quad m = -\\frac{d_i}{d_o} = \\frac{h_i}{h_o}$.
- Young's Double-Slit Fringe Width: $\\beta = \\frac{\\lambda D}{d}$.

### Modern Physics & Quantum Phenomena:
1. **Photoelectric Effect (Einstein's Equation)**:
   $$E_{\\text{photon}} = h f = \\Phi + K_{\\text{max}} = h f_0 + e V_s$$
   - Cutoff frequency: $f_0 = \\frac{\\Phi}{h}$
   - Stopping potential: $V_s = \\frac{K_{\\text{max}}}{e}$
2. **de Broglie Matter Wavelength**: $\\lambda = \\frac{h}{p} = \\frac{h}{m v} = \\frac{h}{\\sqrt{2 m K}}$.
3. **Bohr Model Energy Levels for Hydrogen**:
   $$E_n = -\\frac{13.6\\text{ eV}}{n^2}, \\quad \\frac{1}{\\lambda} = R_H \\left( \\frac{1}{n_1^2} - \\frac{1}{n_2^2} \\right)$$
   - Lyman series: $n_1 = 1$ (Ultraviolet)
   - Balmer series: $n_1 = 2$ (Visible spectrum)
   - Paschen series: $n_1 = 3$ (Infrared)`,
        equations: [
          {
            name: "Photoelectric Max Kinetic Energy",
            formula: "K_{\\text{max}} = h f - \\Phi = \\frac{h c}{\\lambda} - \\Phi",
            explanation: "Kinetic energy depends ONLY on photon frequency, NOT on light intensity."
          },
          {
            name: "Hydrogen Energy Transitions",
            formula: "\\Delta E = 13.6\\text{ eV} \\left( \\frac{1}{n_{\\text{lower}}^2} - \\frac{1}{n_{\\text{upper}}^2} \\right)",
            explanation: "Energy emitted as a photon during downward electronic transition."
          }
        ],
        workedExamples: [
          {
            problem: "Light of wavelength $400\\text{ nm}$ shines on a metal with work function $\\Phi = 2.1\\text{ eV}$. Find the maximum kinetic energy of emitted photoelectrons ($h c \\approx 1240\\text{ eV}\\cdot\\text{nm}$).",
            stepByStepSolution: [
              "Calculate photon energy: $E = \\frac{hc}{\\lambda} = \\frac{1240\\text{ eV}\\cdot\\text{nm}}{400\\text{ nm}} = 3.1\\text{ eV}$.",
              "Apply Einstein's equation: $K_{\\text{max}} = E - \\Phi = 3.1\\text{ eV} - 2.1\\text{ eV} = 1.0\\text{ eV}$.",
              "In Joules: $1.0\\text{ eV} \\times 1.6 \\times 10^{-19}\\text{ J/eV} = 1.6 \\times 10^{-19}\\text{ J}$."
            ]
          }
        ],
        examTraps: [
          "Increasing light intensity increases the NUMBER of photoelectrons (photocurrent), NOT their maximum kinetic energy.",
          "Balmer series produces VISIBLE photons ($n_1 = 2$), while Lyman produces ULTRAVIOLET ($n_1 = 1$)."
        ],
        keyTakeaways: [
          "Doppler shift frequency increases when source and observer move towards each other, decreases when moving apart.",
          "Diffraction is most pronounced when the aperture/obstacle size is comparable to the wavelength ($d \\approx \\lambda$)."
        ]
      }
    ]
  }
];
