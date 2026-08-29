import { MasterNoteChapter } from '../types';

export const DAY2_PHYSICS_MASTER_NOTES: MasterNoteChapter[] = [
  {
    id: 'phys-day2-ch1-kinematics-advanced',
    subject: 'physics',
    chapterNumber: 4,
    title: 'Day 2 Master Notes: Advanced Kinematics, Projectile Trajectories & Relative Motion',
    gradeLevel: 'University Prep',
    overview: 'Exhaustive university-level kinematics handbook for Day 2 of the AASTU blueprint. Covers variable acceleration calculus relations, SUVAT extensions, 2D projectile motion on horizontal and inclined planes, trajectory geometry, relative motion vectors (River-Boat and Wind-Airplane problems), and graph-based calculus transformations.',
    estimatedReadTimeMinutes: 35,
    sections: [
      {
        id: 'phys-day2-1-1-variable-acceleration',
        heading: '1.1 Calculus-Based Kinematics & Variable Acceleration',
        content: `In university entrance problems, acceleration is frequently **non-constant** (a function of time $a(t)$, velocity $a(v)$, or position $a(x)$). You must use differential and integral calculus rather than basic SUVAT equations.

---

### Fundamental Calculus Relationships:
1. **Velocity from Position**: $v(t) = \\frac{dx}{dt}$
2. **Acceleration from Velocity**: $a(t) = \\frac{dv}{dt} = \\frac{d^2x}{dt^2}$
3. **Chain Rule Formulation (Velocity as function of position)**:
   $$a = \\frac{dv}{dt} = \\frac{dv}{dx} \\cdot \\frac{dx}{dt} = v \\frac{dv}{dx}$$
   $$\\implies \\int_{v_0}^{v} v \\, dv = \\int_{x_0}^{x} a(x) \\, dx$$

---

### Integration Cases:
- **Case 1: $a = f(t)$ (Time-dependent)**:
  $$v(t) = v_0 + \\int_0^t f(t') \\, dt', \\quad x(t) = x_0 + \\int_0^t v(t') \\, dt'$$
- **Case 2: $a = f(x)$ (Position-dependent)**:
  $$\\frac{v^2 - v_0^2}{2} = \\int_{x_0}^x f(x') \\, dx'$$
- **Case 3: $a = f(v)$ (Velocity-dependent, such as fluid drag)**:
  $$t = \\int_{v_0}^v \\frac{dv'}{f(v')}, \\quad x - x_0 = \\int_{v_0}^v \\frac{v' \\, dv'}{f(v')}$$`,
        equations: [
          {
            name: "Position-Dependent Acceleration Identity",
            formula: "v \\frac{dv}{dx} = a(x) \\implies \\int v \\, dv = \\int a(x) \\, dx",
            explanation: "Eliminates time $t$ completely when acceleration is given as a function of position $x$."
          },
          {
            name: "Terminal Velocity with Linear Drag (F_drag = -kv)",
            formula: "v(t) = v_{\\text{term}} \\left(1 - e^{-\\frac{k}{m}t}\\right), \\quad v_{\\text{term}} = \\frac{mg}{k}",
            explanation: "As $t \\to \\infty$, acceleration drops to 0 and velocity asymptotes to $v_{\\text{term}}$."
          }
        ],
        workedExamples: [
          {
            problem: "A particle moves along the x-axis with acceleration $a(x) = -4x\\text{ m/s}^2$. If its initial speed at $x = 0$ is $v_0 = 8\\text{ m/s}$, find its speed when it reaches $x = 3\\text{ m}$.",
            stepByStepSolution: [
              "Recognize acceleration is position-dependent: use $v \\frac{dv}{dx} = a(x)$.",
              "Set up the integral: $\\int_8^v v \\, dv = \\int_0^3 (-4x) \\, dx$.",
              "Evaluate LHS: $\\left[\\frac{v^2}{2}\\right]_8^v = \\frac{v^2 - 64}{2}$.",
              "Evaluate RHS: $\\left[-2x^2\\right]_0^3 = -2(9) - 0 = -18$.",
              "Equate: $\\frac{v^2 - 64}{2} = -18 \\implies v^2 - 64 = -36 \\implies v^2 = 28$.",
              "Result: $v = \\sqrt{28} = 2\\sqrt{7} \\approx 5.29\\text{ m/s}$."
            ],
            shortcutTip: "Whenever $a = -\\omega^2 x$, the motion is Simple Harmonic Motion (SHM) where $v(x) = \\omega\\sqrt{A^2 - x^2}$."
          }
        ],
        examTraps: [
          "Do NOT use SUVAT equations ($v^2 = u^2 + 2as$) when acceleration is not constant! Applying SUVAT to $a = -4x$ produces completely wrong answers.",
          "Check whether the particle stops before reaching the specified point ($v^2 \\ge 0$ must hold)."
        ],
        keyTakeaways: [
          "Slope of $x-t$ graph is velocity $v$.",
          "Slope of $v-t$ graph is acceleration $a$.",
          "Area under $v-t$ curve is displacement $\\Delta x$.",
          "Area under $a-t$ curve is change in velocity $\\Delta v$."
        ]
      },
      {
        id: 'phys-day2-1-2-projectile-inclines-elevations',
        heading: '1.2 Projectile Motion on Elevated Cliffs & Inclined Planes',
        content: `Standard ground-to-ground projectile formulas are easy, but university entrance exams frequently test **projectiles launched from cliffs ($h > 0$)** or **projectiles on inclined planes**.

---

### 1. Projectile Launched from Cliff Height $h$ with Angle $\\theta$:
- Velocity components: $u_x = u\\cos\\theta$, $u_y = u\\sin\\theta$
- Vertical position as function of time: $y(t) = h + (u\\sin\\theta)t - \\frac{1}{2}gt^2$
- Time to hit ground ($y = 0$): Solve $\\frac{1}{2}gt^2 - (u\\sin\\theta)t - h = 0$:
  $$T_{\\text{ground}} = \\frac{u\\sin\\theta + \\sqrt{u^2\\sin^2\\theta + 2gh}}{g}$$
- Horizontal range: $R = u_x \\cdot T_{\\text{ground}} = (u\\cos\\theta) \\cdot T_{\\text{ground}}$
- Speed upon impact with ground (via conservation of energy):
  $$v_{\\text{impact}} = \\sqrt{u^2 + 2gh} \\quad \\text{(independent of launch angle } \\theta!)$$

---

### 2. Projectile on an Inclined Plane (Incline Angle $\\alpha$, Launch Angle $\\theta$ relative to incline):
Rotate coordinate axes so that $x'$ is along the incline and $y'$ is perpendicular to the incline:
- $g_{x'} = -g\\sin\\alpha$, $\\quad g_{y'} = -g\\cos\\alpha$
- $u_{x'} = u\\cos\\theta$, $\\quad u_{y'} = u\\sin\\theta$
- **Time of Flight on Incline**:
  $$T = \\frac{2 u \\sin\\theta}{g \\cos\\alpha}$$
- **Range along Upward Incline**:
  $$R_{\\text{up}} = \\frac{u^2}{g\\cos^2\\alpha} [\\sin(2\\theta + \\alpha) - \\sin\\alpha]$$
- **Maximum Range Angle on Incline**:
  $$\\theta_{\\text{opt}} = \\frac{\\pi}{4} - \\frac{\\alpha}{2} = 45^\\circ - \\frac{\\alpha}{2} \\implies R_{\\text{max}} = \\frac{u^2}{g(1 + \\sin\\alpha)}$$`,
        equations: [
          {
            name: "Impact Velocity from Height h",
            formula: "v_{\\text{impact}} = \\sqrt{u^2 + 2gh}",
            explanation: "Magnitude of final velocity depends ONLY on initial speed $u$ and height $h$, regardless of launch angle."
          },
          {
            name: "Max Range on Upward Incline",
            formula: "R_{\\text{max, incline}} = \\frac{u^2}{g(1 + \\sin\\alpha)} \\quad \\text{at } \\theta = 45^\\circ - \\frac{\\alpha}{2}",
            explanation: "Reduces to standard ground max range $R = \\frac{u^2}{g}$ when incline angle $\\alpha = 0$."
          }
        ],
        workedExamples: [
          {
            problem: "A ball is projected horizontally at $15\\text{ m/s}$ from the top of a $80\\text{ m}$ cliff. Taking $g = 10\\text{ m/s}^2$, find: (a) time of flight, (b) horizontal distance from base, (c) speed when hitting ground.",
            stepByStepSolution: [
              "Horizontal launch means $\\theta = 0^\\circ \\implies u_x = 15\\text{ m/s}, u_y = 0$.",
              "Time of flight: $h = \\frac{1}{2}gt^2 \\implies 80 = \\frac{1}{2}(10)t^2 = 5t^2 \\implies t^2 = 16 \\implies t = 4\\text{ s}$.",
              "Horizontal distance: $R = u_x \\cdot t = 15 \\times 4 = 60\\text{ m}$.",
              "Vertical velocity at impact: $v_y = gt = 10 \\times 4 = 40\\text{ m/s}$.",
              "Final speed: $v = \\sqrt{v_x^2 + v_y^2} = \\sqrt{15^2 + 40^2} = \\sqrt{225 + 1600} = \\sqrt{1825} = 5\\sqrt{73} \\approx 42.72\\text{ m/s}$.",
              "Energy check: $v = \\sqrt{u^2 + 2gh} = \\sqrt{15^2 + 2(10)(80)} = \\sqrt{225 + 1600} = \\sqrt{1825}\\text{ m/s}$ (Exact match!)."
            ],
            shortcutTip: "For horizontal launch, time is ALWAYS $t = \\sqrt{\\frac{2h}{g}}$. For $h = 80\\text{ m}$, $t = \\sqrt{16} = 4\\text{ s}$ in 1 second."
          }
        ],
        examTraps: [
          "Do not forget to add cliff height $h$ when setting up vertical equations.",
          "When calculating angle of impact $\\phi$ with ground: $\\tan\\phi = \\frac{v_y}{v_x}$, NOT $\\frac{v_x}{v_y}$."
        ],
        keyTakeaways: [
          "Horizontal launch time of flight $t = \\sqrt{2h/g}$ is identical to dropping an object from rest from the same height.",
          "Maximum range angle on an incline is always bisector of the vertical and the incline: $\\theta = 45^\\circ - \\frac{\\alpha}{2}$."
        ]
      },
      {
        id: 'phys-day2-1-3-relative-motion',
        heading: '1.3 Relative Velocity Vectors: River-Boat & Wind Problems',
        content: `Relative velocity relates the motion of body $A$ with respect to frame/body $B$:
$$\\vec{v}_{A/B} = \\vec{v}_A - \\vec{v}_B \\iff \\vec{v}_A = \\vec{v}_{A/B} + \\vec{v}_B$$

---

### River-Boat Crossing Classical Configurations:
Let $v_b = |\\vec{v}_{b/w}|$ (boat speed in still water), $v_r = |\\vec{v}_{w/g}|$ (river flow speed), and $w$ = river width.

#### Condition 1: Shortest Time to Cross the River
- Boat must steer **directly perpendicular** to the river banks (heading angle $\\theta = 90^\\circ$ relative to flow).
- Time to cross: $t_{\\text{min}} = \\frac{w}{v_b}$
- Drift downstream: $x_{\\text{drift}} = v_r \\cdot t_{\\text{min}} = \\frac{w v_r}{v_b}$
- Resultant speed relative to ground: $v_{\\text{ground}} = \\sqrt{v_b^2 + v_r^2}$

#### Condition 2: Shortest Path (Zero Drift, Direct Opposite Point)
- Possible **ONLY if $v_b > v_r$** (boat speed exceeds river current).
- Boat must head upstream at angle $\\theta$ from the bank such that the horizontal component cancels river flow:
  $$v_b \\cos\\theta = v_r \\implies \\cos\\theta = \\frac{v_r}{v_b} \\quad \\text{(or angle with normal } \\sin\\alpha = \\frac{v_r}{v_b})$$
- Effective crossing speed: $v_{\\text{cross}} = \\sqrt{v_b^2 - v_r^2}$
- Time to cross along shortest path:
  $$t = \\frac{w}{\\sqrt{v_b^2 - v_r^2}}$$`,
        equations: [
          {
            name: "Minimum Crossing Time",
            formula: "t_{\\text{min}} = \\frac{w}{v_b}",
            explanation: "Crossing time depends ONLY on perpendicular speed component; river current does not delay crossing."
          },
          {
            name: "Zero-Drift Heading Angle",
            formula: "\\sin\\alpha = \\frac{v_r}{v_b} \\implies v_{\\text{net}} = \\sqrt{v_b^2 - v_r^2}",
            explanation: "Angle $\\alpha$ steered upstream from perpendicular normal to cancel downstream drift."
          }
        ],
        workedExamples: [
          {
            problem: "A river $400\\text{ m}$ wide flows eastward at $3\\text{ m/s}$. A motorboat capable of $5\\text{ m/s}$ in still water wants to cross to the point directly opposite. Find: (a) direction to steer, (b) time taken.",
            stepByStepSolution: [
              "We need zero drift $\\implies$ boat must point upstream (North-West).",
              "Compute angle $\\alpha$ from North (upstream): $\\sin\\alpha = \\frac{v_r}{v_b} = \\frac{3}{5} \\implies \\alpha = \\arcsin(0.6) \\approx 36.87^\\circ$ West of North.",
              "Calculate effective northward speed: $v_{\\text{eff}} = \\sqrt{v_b^2 - v_r^2} = \\sqrt{5^2 - 3^2} = \\sqrt{25 - 9} = \\sqrt{16} = 4\\text{ m/s}$.",
              "Time taken: $t = \\frac{w}{v_{\\text{eff}}} = \\frac{400\\text{ m}}{4\\text{ m/s}} = 100\\text{ seconds}$ (1 min 40 s)."
            ],
            shortcutTip: "Notice the 3-4-5 right triangle: $v_r = 3, v_{\\text{eff}} = 4, v_b = 5$. Time is simply $400 / 4 = 100\\text{ s}$."
          }
        ],
        examTraps: [
          "If river speed $v_r > v_b$, zero drift is IMPOSSIBLE. The minimum drift in that case occurs when $\\sin\\alpha = \\frac{v_b}{v_r}$.",
          "Confusing shortest time (head straight across) with shortest distance (head upstream)."
        ],
        keyTakeaways: [
          "Steering straight across ($90^\\circ$ to bank) always produces minimum time, regardless of river speed.",
          "Steering at angle $\\sin\\alpha = v_r/v_b$ produces zero drift if $v_b > v_r$."
        ]
      }
    ]
  },
  {
    id: 'phys-day2-ch2-dynamics-friction-circular',
    subject: 'physics',
    chapterNumber: 5,
    title: 'Day 2 Master Notes: Newton’s Laws, Incline Friction, Pulley Systems & Circular Dynamics',
    gradeLevel: 'University Prep',
    overview: 'In-depth treatment of classical dynamics: rigorous Free-Body Diagrams (FBD), static vs kinetic friction on variable angle ramps, double-block sliding thresholds, string constraint kinematics for multi-pulley systems, and uniform/non-uniform circular motion dynamics (banking, conical pendulums, vertical loops).',
    estimatedReadTimeMinutes: 40,
    sections: [
      {
        id: 'phys-day2-2-1-friction-inclines-systems',
        heading: '2.1 Friction Dynamics on Inclined Planes & Multi-Block Systems',
        content: `### 1. Friction Laws & Angle of Repose
- **Static Friction**: $f_s \\le \\mu_s N$ (self-adjusting force matching applied shear force up to maximum $f_{s,\\text{max}} = \\mu_s N$).
- **Kinetic Friction**: $f_k = \\mu_k N$ (constant opposing relative sliding motion, where $\\mu_k < \\mu_s$).
- **Angle of Friction ($\\lambda$)**: $\\tan\\lambda = \\mu_s$.
- **Angle of Repose ($\\theta_r$)**: The maximum incline angle at which a block rests on a rough ramp without sliding:
  $$mg\\sin\\theta_r = f_{s,\\text{max}} = \\mu_s mg\\cos\\theta_r \\implies \\tan\\theta_r = \\mu_s$$

---

### 2. Motion on an Incline of Angle $\\theta$:
- Normal force: $N = mg\\cos\\theta$
- Downward gravity component: $F_{\\parallel} = mg\\sin\\theta$
- **Case A: Block sliding down under gravity ($\\theta > \\theta_r$)**:
  $$a_{\\text{down}} = g(\\sin\\theta - \\mu_k\\cos\\theta)$$
- **Case B: Block projected upward along incline**:
  $$a_{\\text{up}} = -g(\\sin\\theta + \\mu_k\\cos\\theta) \\quad \\text{(deceleration)}$$
- **Ratio of Time of Ascent ($t_{\\text{up}}$) to Time of Descent ($t_{\\text{down}}$)**:
  $$\\frac{t_{\\text{down}}}{t_{\\text{up}}} = \\sqrt{\\frac{\\sin\\theta + \\mu_k\\cos\\theta}{\\sin\\theta - \\mu_k\\cos\\theta}} > 1$$
  *(It always takes longer to slide down a rough incline than to go up, because friction opposes motion in both directions!)*`,
        equations: [
          {
            name: "Acceleration on Incline",
            formula: "a = g(\\sin\\theta \\mp \\mu_k\\cos\\theta)",
            explanation: "Minus sign for downward slide, plus sign for upward projected deceleration."
          },
          {
            name: "Ascent vs Descent Time Ratio",
            formula: "\\frac{t_{\\text{down}}}{t_{\\text{up}}} = \\sqrt{\\frac{a_{\\text{up}}}{a_{\\text{down}}}} = \\sqrt{\\frac{\\sin\\theta + \\mu_k\\cos\\theta}{\\sin\\theta - \\mu_k\\cos\\theta}}",
            explanation: "High-yield formula for entrance questions asking 'time to slide down is $n$ times time to slide up'."
          }
        ],
        workedExamples: [
          {
            problem: "A block takes twice as long to slide down a rough $45^\\circ$ inclined plane as it takes to slide down an identical smooth $45^\\circ$ plane. Find the coefficient of kinetic friction $\\mu_k$.",
            stepByStepSolution: [
              "Smooth acceleration: $a_1 = g\\sin 45^\\circ = \\frac{g}{\\sqrt{2}}$.",
              "Rough acceleration: $a_2 = g(\\sin 45^\\circ - \\mu_k\\cos 45^\\circ) = \\frac{g}{\\sqrt{2}}(1 - \\mu_k)$.",
              "Distance $s = \\frac{1}{2}a t^2 \\implies t = \\sqrt{\\frac{2s}{a}} \\implies \\frac{t_{\\text{rough}}}{t_{\\text{smooth}}} = \\sqrt{\\frac{a_1}{a_2}} = 2$.",
              "Square both sides: $\\frac{a_1}{a_2} = 4 \\implies a_1 = 4 a_2$.",
              "Substitute: $\\frac{g}{\\sqrt{2}} = 4 \\left[\\frac{g}{\\sqrt{2}}(1 - \\mu_k)\\right] \\implies 1 = 4(1 - \\mu_k) = 4 - 4\\mu_k$.",
              "Solve for $\\mu_k$: $4\\mu_k = 3 \\implies \\mu_k = \\frac{3}{4} = 0.75$."
            ],
            shortcutTip: "General formula: $\\mu_k = \\tan\\theta \\left(1 - \\frac{1}{n^2}\\right)$. For $n = 2, \\theta = 45^\\circ$: $\\mu_k = 1 \\cdot (1 - 1/4) = 0.75$ instantly!"
          }
        ],
        examTraps: [
          "Static friction is not always equal to $\\mu_s N$; it equals applied force until $f_s$ reaches its maximum threshold $\\mu_s N$.",
          "Normal force is altered when pulling at an angle: $N = mg - F\\sin\\theta$ (pulling) vs $N = mg + F\\sin\\theta$ (pushing)."
        ],
        keyTakeaways: [
          "Pushing an object is always harder than pulling it at an angle because pushing increases the normal force ($N = mg + F\\sin\\theta$), increasing maximum friction.",
          "Angle of repose depends only on coefficient of static friction $\\mu_s$, completely independent of the object's mass."
        ]
      },
      {
        id: 'phys-day2-2-2-pulley-constraint-systems',
        heading: '2.2 Connected Bodies, Pulleys & String Constraint Equations',
        content: `### 1. Standard Atwood Machine (Two masses $m_1 > m_2$ over a light pulley):
- System net driving force: $F_{\\text{net}} = (m_1 - m_2)g$
- Total accelerated mass: $M_{\\text{total}} = m_1 + m_2$
- **System Acceleration**:
  $$a = \\frac{(m_1 - m_2)g}{m_1 + m_2}$$
- **String Tension ($T$)**:
  $$T = \\frac{2 m_1 m_2 g}{m_1 + m_2}$$
- **Force on Pulley Support**:
  $$F_{\\text{support}} = 2T = \\frac{4 m_1 m_2 g}{m_1 + m_2}$$

---

### 2. Table-Edge Incline System (Mass $m_1$ on table, $m_2$ hanging):
- On smooth table: $a = \\frac{m_2 g}{m_1 + m_2}, \\quad T = \\frac{m_1 m_2 g}{m_1 + m_2}$
- On rough table (friction $\\mu_k$): $a = \\frac{(m_2 - \\mu_k m_1)g}{m_1 + m_2}, \\quad T = \\frac{m_1 m_2 g(1 + \\mu_k)}{m_1 + m_2}$

---

### 3. Virtual Work / String Constraint Shortcut Method:
For any complex multi-pulley system with inextensible strings:
$$\\sum \\vec{T}_i \\cdot \\vec{a}_i = 0 \\quad \\text{and} \\quad \\sum \\vec{T}_i \\cdot \\vec{v}_i = 0$$
If tension on body 1 is $n T$ and tension on body 2 is $T$, then:
$$a_2 = n a_1$$`,
        equations: [
          {
            name: "Atwood Acceleration & Tension",
            formula: "a = \\frac{m_1 - m_2}{m_1 + m_2}g, \\quad T = \\frac{2m_1 m_2}{m_1 + m_2}g",
            explanation: "Harmonic mean structure gives string tension in ideal 2-mass Atwood machine."
          },
          {
            name: "Virtual Work Constraint",
            formula: "\\sum T_i a_i = 0 \\implies T_1 a_1 + T_2 a_2 + \\dots = 0",
            explanation: "Instantaneously yields acceleration relationships in complex movable pulley systems."
          }
        ],
        workedExamples: [
          {
            problem: "Two masses $m_1 = 6\\text{ kg}$ and $m_2 = 4\\text{ kg}$ are connected by a light string over a frictionless pulley. Find: (a) system acceleration, (b) string tension ($g = 10\\text{ m/s}^2$).",
            stepByStepSolution: [
              "Identify driving force: $F = (m_1 - m_2)g = (6 - 4)(10) = 20\\text{ N}$.",
              "Compute total mass: $M = 6 + 4 = 10\\text{ kg}$.",
              "Acceleration: $a = \\frac{20}{10} = 2\\text{ m/s}^2$.",
              "Compute tension: $T = m_1(g - a) = 6(10 - 2) = 48\\text{ N}$.",
              "Double check with $m_2$: $T = m_2(g + a) = 4(10 + 2) = 48\\text{ N}$."
            ],
            shortcutTip: "Use direct tension formula: $T = \\frac{2 \\times 6 \\times 4 \\times 10}{6 + 4} = \\frac{480}{10} = 48\\text{ N}$."
          }
        ],
        examTraps: [
          "Do not assume the scale supporting the pulley reads $(m_1 + m_2)g$; it reads $2T = \\frac{4m_1 m_2 g}{m_1 + m_2} < (m_1 + m_2)g$ while accelerating!",
          "Make sure signs of acceleration match string directions."
        ],
        keyTakeaways: [
          "When masses accelerate, total load on the ceiling support is strictly LESS than the sum of static weights.",
          "String constraint states that the total length of string is constant: $\\sum T_i \\cdot x_i = 0$."
        ]
      },
      {
        id: 'phys-day2-2-3-circular-motion-dynamics',
        heading: '2.3 Circular Dynamics: Banking, Conical Pendulums & Vertical Loops',
        content: `### 1. Kinematics of Circular Motion
- Angular velocity: $\\omega = \\frac{d\\theta}{dt} = \\frac{2\\pi}{T} = 2\\pi f$
- Linear velocity: $v = \\omega r$
- Centripetal (radial) acceleration: $a_c = \\frac{v^2}{r} = \\omega^2 r = v\\omega$
- Centripetal Force: $F_c = m a_c = \\frac{m v^2}{r} = m \\omega^2 r$
- Tangential acceleration (if speed changes): $a_t = \\frac{dv}{dt} = \\alpha r$
- Total acceleration: $a_{\\text{total}} = \\sqrt{a_c^2 + a_t^2}$

---

### 2. Banking of Curved Roads
Let $r$ be curve radius, $v$ be vehicle speed, and $\\theta$ be banking angle.

#### Optimum Speed (No Friction Required):
Normal force horizontal component provides exact centripetal force:
$$N\\sin\\theta = \\frac{mv^2}{r}, \\quad N\\cos\\theta = mg \\implies \\tan\\theta = \\frac{v^2}{rg} \\iff v_{\\text{opt}} = \\sqrt{rg\\tan\\theta}$$

#### Safe Speed Range with Friction (Coefficient $\\mu_s$):
- **Maximum Safe Speed (avoid skidding outwards)**:
  $$v_{\\text{max}} = \\sqrt{rg \\left( \\frac{\\tan\\theta + \\mu_s}{1 - \\mu_s\\tan\\theta} \\right)}$$
- **Minimum Safe Speed (avoid slipping inwards)**:
  $$v_{\\text{min}} = \\sqrt{rg \\left( \\frac{\\tan\\theta - \\mu_s}{1 + \\mu_s\\tan\\theta} \\right)}$$

---

### 3. Vertical Circular Motion (Mass $m$ on string of length $L$):
- **Critical Minimum Velocity at Top to complete loop**:
  $$T_{\\text{top}} = 0 \\implies \\frac{m v_{\\text{top}}^2}{L} = mg \\implies v_{\\text{top}} = \\sqrt{gL}$$
- **Critical Velocity at Bottom**:
  $$v_{\\text{bottom}} = \\sqrt{v_{\\text{top}}^2 + 4gL} = \\sqrt{gL + 4gL} = \\sqrt{5gL}$$
- **Critical Velocity at Horizontal Position**:
  $$v_{\\text{mid}} = \\sqrt{3gL}$$
- **Tension Difference between Bottom and Top**:
  $$T_{\\text{bottom}} - T_{\\text{top}} = 6mg \\quad \\text{(ALWAYS exactly } 6mg\\text{ regardless of initial speed!)}$$`,
        equations: [
          {
            name: "Optimum Banking Angle",
            formula: "\\tan\\theta = \\frac{v^2}{rg}",
            explanation: "Angle where normal force alone turns vehicle without needing tire friction."
          },
          {
            name: "Vertical Loop Critical Speeds",
            formula: "v_{\\text{top}} = \\sqrt{gL}, \\quad v_{\\text{bottom}} = \\sqrt{5gL}",
            explanation: "Threshold speeds required for taut string to complete full vertical circle."
          },
          {
            name: "Tension Difference in Vertical Loop",
            formula: "T_{\\text{bottom}} - T_{\\text{top}} = 6mg",
            explanation: "Fundamental constant difference for any particle undergoing full vertical circular revolution."
          }
        ],
        workedExamples: [
          {
            problem: "A $500\\text{ g}$ stone tied to a $0.8\\text{ m}$ string is whirled in a vertical circle. What minimum speed must it have at the lowest point to complete the circle, and what is string tension at that lowest point ($g = 10\\text{ m/s}^2$)?",
            stepByStepSolution: [
              "Given $m = 0.5\\text{ kg}, L = 0.8\\text{ m}, g = 10\\text{ m/s}^2$.",
              "Minimum lowest speed: $v_{\\text{bottom}} = \\sqrt{5gL} = \\sqrt{5(10)(0.8)} = \\sqrt{40} = 2\\sqrt{10} \\approx 6.32\\text{ m/s}$.",
              "At lowest point, forces are: $T - mg = \\frac{mv^2}{L}$.",
              "Substitute $v^2 = 5gL$: $T = mg + \\frac{m(5gL)}{L} = mg + 5mg = 6mg$.",
              "Compute tension: $T = 6 \\times (0.5\\text{ kg}) \\times (10\\text{ m/s}^2) = 30\\text{ N}$."
            ],
            shortcutTip: "At critical threshold, lowest tension is ALWAYS $6mg = 6(0.5)(10) = 30\\text{ N}$."
          }
        ],
        examTraps: [
          "For a light rigid rod (instead of a flexible string), the mass cannot fall slack, so $v_{\\text{top}} = 0$ is allowed, giving $v_{\\text{bottom}} = \\sqrt{4gL} = 2\\sqrt{gL}$.",
          "Centripetal force is not a new physical force; it is the net resultant of real forces (tension, gravity, normal, friction)."
        ],
        keyTakeaways: [
          "Work done by centripetal force is ALWAYS ZERO because $\\vec{F}_c \\perp \\vec{v}$.",
          "In a conical pendulum with string length $L$ at angle $\\theta$ with vertical, period $T = 2\\pi\\sqrt{\\frac{L\\cos\\theta}{g}}$."
        ]
      }
    ]
  },
  {
    id: 'phys-day2-ch3-work-energy-momentum-collisions',
    subject: 'physics',
    chapterNumber: 6,
    title: 'Day 2 Master Notes: Work-Energy Theorem, Potential Wells, Momentum & Collisions',
    gradeLevel: 'University Prep',
    overview: 'Core energy and momentum mechanics for Day 2: Calculus formulation of variable force work, conservative field potential functions U(x), equilibrium stability analysis, Power formulas, Impulse-Momentum theorem, 1D/2D Elastic & Inelastic collisions, and Ballistic Pendulums.',
    estimatedReadTimeMinutes: 38,
    sections: [
      {
        id: 'phys-day2-3-1-work-energy-potential',
        heading: '3.1 Work-Energy Theorem & Potential Energy Curves',
        content: `### 1. Work Done by Constant & Variable Forces
- Constant force: $W = \\vec{F} \\cdot \\vec{d} = F d \\cos\\theta$
- Variable force in 1D: $W = \\int_{x_i}^{x_f} F(x) \\, dx$ (Area under $F-x$ graph)
- Variable force in 3D: $W = \\int_{\\vec{r}_i}^{\\vec{r}_f} \\vec{F} \\cdot d\\vec{r} = \\int (F_x dx + F_y dy + F_z dz)$
- Ideal Spring Work: $W_{\\text{spring}} = -\\int_{x_i}^{x_f} kx \\, dx = \\frac{1}{2}k x_i^2 - \\frac{1}{2}k x_f^2$

---

### 2. Work-Energy Theorem:
$$\\Sigma W_{\\text{all forces}} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2$$
*Crucial*: This theorem holds for **all forces** (conservative, non-conservative, internal, and external).

---

### 3. Conservative Forces & Potential Energy $U(x)$:
A force is conservative if work done around any closed loop is zero ($\\oint \\vec{F} \\cdot d\\vec{r} = 0$).
$$F(x) = -\\frac{dU}{dx} \\quad \\text{and in 3D} \\quad \\vec{F} = -\\nabla U = -\\left(\\frac{\\partial U}{\\partial x}\\hat{i} + \\frac{\\partial U}{\\partial y}\\hat{j} + \\frac{\\partial U}{\\partial z}\\hat{k}\\right)$$

---

### 4. Equilibrium States from Potential Energy $U(x)$:
Equilibrium occurs when net force is zero: $F = -\\frac{dU}{dx} = 0$.
1. **Stable Equilibrium**:
   $$\\frac{dU}{dx} = 0 \\quad \\text{and} \\quad \\frac{d^2U}{dx^2} > 0 \\quad (U(x) \\text{ is at a local minimum})$$
   *(Small displacement produces restoring force back to equilibrium).*
2. **Unstable Equilibrium**:
   $$\\frac{dU}{dx} = 0 \\quad \\text{and} \\quad \\frac{d^2U}{dx^2} < 0 \\quad (U(x) \\text{ is at a local maximum})$$
   *(Small displacement drives particle away from equilibrium).*
3. **Neutral Equilibrium**:
   $$\\frac{dU}{dx} = 0 \\quad \\text{and} \\quad \\frac{d^2U}{dx^2} = 0 \\quad (U(x) \\text{ is flat/constant})$$`,
        equations: [
          {
            name: "Force from Potential Gradient",
            formula: "F(x) = -\\frac{dU}{dx}, \\quad \\vec{F} = -\\nabla U",
            explanation: "Derivative of potential energy gives conservative force with a negative sign."
          },
          {
            name: "Equilibrium Stability Criterion",
            formula: "\\frac{d^2U}{dx^2} > 0 \\text{ (Stable)}, \\quad \\frac{d^2U}{dx^2} < 0 \\text{ (Unstable)}",
            explanation: "Second derivative test determines stability of physical potential wells."
          }
        ],
        workedExamples: [
          {
            problem: "The potential energy of a conservative 1D system is $U(x) = x^3 - 6x^2 + 9x\\text{ Joules}$. Find the equilibrium points and determine their stability.",
            stepByStepSolution: [
              "Find first derivative: $\\frac{dU}{dx} = 3x^2 - 12x + 9$.",
              "Set $F(x) = -\\frac{dU}{dx} = 0 \\implies 3x^2 - 12x + 9 = 0 \\implies x^2 - 4x + 3 = 0$.",
              "Factor: $(x - 1)(x - 3) = 0 \\implies x = 1\\text{ m}$ and $x = 3\\text{ m}$ are equilibrium positions.",
              "Compute second derivative: $\\frac{d^2U}{dx^2} = 6x - 12$.",
              "Evaluate at $x = 1$: $\\frac{d^2U}{dx^2} = 6(1) - 12 = -6 < 0 \\implies x = 1\\text{ m}$ is **Unstable Equilibrium**.",
              "Evaluate at $x = 3$: $\\frac{d^2U}{dx^2} = 6(3) - 12 = +6 > 0 \\implies x = 3\\text{ m}$ is **Stable Equilibrium**."
            ],
            shortcutTip: "Remember: Minimum of potential well = Stable (like a ball in a bowl); Maximum = Unstable (ball on a hill)."
          }
        ],
        examTraps: [
          "Forgetting the minus sign: $F = -\\frac{dU}{dx}$, NOT $+\\frac{dU}{dx}$. If $U(x)$ increases with $x$, force pushes in the $-x$ direction.",
          "Work done by non-conservative forces (like friction) changes mechanical energy: $W_{\\text{nc}} = \\Delta E_{\\text{mech}} = E_f - E_i$."
        ],
        keyTakeaways: [
          "Instantaneous Power: $P = \\vec{F} \\cdot \\vec{v} = F v \\cos\\theta$.",
          "Area under a Force vs Position ($F-x$) graph represents Work Done.",
          "Area under a Power vs Time ($P-t$) graph represents Energy transferred."
        ]
      },
      {
        id: 'phys-day2-3-2-collisions-momentum-restitution',
        heading: '3.2 Impulse, Momentum Conservation & Collision Restitution ($e$)',
        content: `### 1. Impulse-Momentum Theorem
- Linear Momentum: $\\vec{p} = m\\vec{v}$
- Impulse: $\\vec{J} = \\int_{t_1}^{t_2} \\vec{F} \\, dt = \\vec{F}_{\\text{avg}} \\Delta t = \\Delta \\vec{p} = m\\vec{v}_f - m\\vec{v}_i$
- Area under a Force-time ($F-t$) curve equals Impulse $\\vec{J}$.

---

### 2. Conservation of Linear Momentum:
In an isolated system ($\\Sigma \\vec{F}_{\\text{ext}} = 0$):
$$m_1 \\vec{u}_1 + m_2 \\vec{u}_2 = m_1 \\vec{v}_1 + m_2 \\vec{v}_2$$
*Universal Law*: Momentum is conserved in **ALL collisions** (elastic, inelastic, perfectly inelastic, and explosive).

---

### 3. Coefficient of Restitution ($e$):
$$e = \\frac{\\text{Velocity of Separation}}{\\text{Velocity of Approach}} = \\frac{v_2 - v_1}{u_1 - u_2}$$
- **$e = 1$**: Perfectly Elastic Collision (Kinetic energy is conserved, $\\Delta K = 0$).
- **$0 < e < 1$**: Inelastic Collision (Kinetic energy is partially lost as heat/deformation).
- **$e = 0$**: Perfectly Inelastic Collision (Objects stick together and move with common velocity $v = \\frac{m_1 u_1 + m_2 u_2}{m_1 + m_2}$).

---

### 4. General 1D Collision Velocity Formulas:
$$v_1 = \\left(\\frac{m_1 - e m_2}{m_1 + m_2}\\right) u_1 + \\left(\\frac{(1 + e)m_2}{m_1 + m_2}\\right) u_2$$
$$v_2 = \\left(\\frac{(1 + e)m_1}{m_1 + m_2}\\right) u_1 + \\left(\\frac{m_2 - e m_1}{m_1 + m_2}\\right) u_2$$

#### Special Elastic Cases ($e = 1$):
- **Equal Masses ($m_1 = m_2$)**: Velocities completely swap ($v_1 = u_2, v_2 = u_1$).
- **Mass $m_1$ hits stationary massive target $m_2 \\gg m_1$ ($u_2 = 0$)**: $v_1 \\approx -u_1$ (rebounds with same speed), $v_2 \\approx 0$.
- **Massive projectile $m_1 \\gg m_2$ hits stationary light target $m_2$ ($u_2 = 0$)**: $v_1 \\approx u_1$, $v_2 \\approx 2u_1$.`,
        equations: [
          {
            name: "Coefficient of Restitution",
            formula: "e = \\frac{v_2 - v_1}{u_1 - u_2} \\iff v_2 - v_1 = e(u_1 - u_2)",
            explanation: "Relates relative separation speed to relative approach speed."
          },
          {
            name: "Kinetic Energy Loss in Inelastic Collision",
            formula: "\\Delta K_{\\text{lost}} = \\frac{1}{2}\\frac{m_1 m_2}{m_1 + m_2}(1 - e^2)(u_1 - u_2)^2",
            explanation: "Max energy loss occurs when $e = 0$ (perfectly inelastic)."
          }
        ],
        workedExamples: [
          {
            problem: "A $2\\text{ kg}$ ball moving at $6\\text{ m/s}$ collides head-on with a stationary $3\\text{ kg}$ ball. If the collision is perfectly elastic ($e = 1$), find the final velocity of each ball.",
            stepByStepSolution: [
              "Given: $m_1 = 2\\text{ kg}, u_1 = 6\\text{ m/s}, m_2 = 3\\text{ kg}, u_2 = 0\\text{ m/s}, e = 1$.",
              "Use formula for $v_1$: $v_1 = \\frac{m_1 - m_2}{m_1 + m_2}u_1 = \\frac{2 - 3}{2 + 3}(6) = \\frac{-1}{5}(6) = -1.2\\text{ m/s}$ (rebounds).",
              "Use formula for $v_2$: $v_2 = \\frac{2m_1}{m_1 + m_2}u_1 = \\frac{2(2)}{2 + 3}(6) = \\frac{4}{5}(6) = 4.8\\text{ m/s}$.",
              "Check momentum: Initial $p = 2(6) + 3(0) = 12\\text{ kg}\\cdot\\text{m/s}$. Final $p = 2(-1.2) + 3(4.8) = -2.4 + 14.4 = 12\\text{ kg}\\cdot\\text{m/s}$ (Exact!).",
              "Check relative speed: $v_2 - v_1 = 4.8 - (-1.2) = 6.0 = u_1 - u_2$ ($e = 1$ confirmed!)."
            ],
            shortcutTip: "For stationary target in elastic collision: $v_1 = \\frac{m_1 - m_2}{m_1 + m_2}u_1$ and $v_2 = \\frac{2m_1}{m_1 + m_2}u_1$."
          }
        ],
        examTraps: [
          "Mechanical energy is NOT conserved in inelastic collisions; do not attempt to write $\\frac{1}{2}m_1 u_1^2 = \\frac{1}{2}(m_1+m_2)v^2$ unless explicitly told it is elastic!",
          "Momentum is a VECTOR quantity. If an object bounces backwards, its final velocity has a NEGATIVE sign: $\\Delta p = m(-v) - m(u) = -m(v+u)$."
        ],
        keyTakeaways: [
          "In a bouncing ball from height $h_0$ with restitution $e$, height after $n$ bounces is $h_n = e^{2n} h_0$.",
          "Total time until the bouncing ball comes to rest is $T_{\\text{total}} = \\sqrt{\\frac{2h_0}{g}} \\left(\\frac{1+e}{1-e}\\right)$."
        ]
      }
    ]
  },
  {
    id: 'phys-day2-ch4-rotational-fluids-gravitation',
    subject: 'physics',
    chapterNumber: 7,
    title: 'Day 2 Master Notes: Rotational Dynamics, Fluid Mechanics & Gravitation',
    gradeLevel: 'University Prep',
    overview: 'Advanced physics module concluding Day 2: Moment of Inertia calculations, Parallel & Perpendicular Axis theorems, Rolling without slipping on inclines, Angular Momentum conservation, Fluid Statics (Archimedes, Pascal), Fluid Dynamics (Bernoulli, Continuity, Torricelli), and Universal Gravitation (escape & orbital velocities, Kepler’s Laws).',
    estimatedReadTimeMinutes: 45,
    sections: [
      {
        id: 'phys-day2-4-1-rotational-dynamics',
        heading: '4.1 Rotational Dynamics, Moment of Inertia & Rolling Motion',
        content: `### 1. Rotational Analogues to Linear Quantities:
| Linear Quantity | Rotational Equivalent | Linking Relation |
| :--- | :--- | :--- |
| Displacement $x$ | Angular displacement $\\theta$ | $s = r\\theta$ |
| Velocity $v$ | Angular velocity $\\omega$ | $v = r\\omega$ |
| Acceleration $a$ | Angular acceleration $\\alpha$ | $a_t = r\\alpha$ |
| Mass / Inertia $m$ | Moment of Inertia $I$ | $I = \\int r^2 dm$ |
| Force $F$ | Torque $\\tau$ | $\\vec{\\tau} = \\vec{r} \\times \\vec{F} = I\\vec{\\alpha}$ |
| Momentum $p = mv$ | Angular Momentum $L$ | $\\vec{L} = \\vec{r} \\times \\vec{p} = I\\vec{\\omega}$ |
| Kinetic Energy $\\frac{1}{2}mv^2$ | Rotational KE | $K_{\\text{rot}} = \\frac{1}{2}I\\omega^2$ |

---

### 2. Standard Moments of Inertia (Must Memorize):
- **Thin Ring / Hoop ($M, R$)**: $I = M R^2$
- **Solid Cylinder / Disk ($M, R$)**: $I = \\frac{1}{2} M R^2$
- **Solid Sphere ($M, R$)**: $I = \\frac{2}{5} M R^2$
- **Hollow Sphere ($M, R$)**: $I = \\frac{2}{3} M R^2$
- **Thin Rod (Length $L$) about center**: $I = \\frac{1}{12} M L^2$
- **Thin Rod (Length $L$) about end**: $I = \\frac{1}{3} M L^2$

---

### 3. Theorems of Moment of Inertia:
1. **Parallel Axis Theorem**: $I = I_{\\text{cm}} + M d^2$ ($d$ = distance between axes).
2. **Perpendicular Axis Theorem (Planar Lamina in $xy$-plane)**: $I_z = I_x + I_y$.

---

### 4. Pure Rolling Without Slipping on an Incline (Angle $\\theta$):
Condition: $v_{\\text{cm}} = R\\omega$ and $a_{\\text{cm}} = R\\alpha$.
- Total Kinetic Energy:
  $$K_{\\text{total}} = K_{\\text{trans}} + K_{\\text{rot}} = \\frac{1}{2}M v^2 + \\frac{1}{2}I\\omega^2 = \\frac{1}{2}M v^2 \\left(1 + \\frac{k^2}{R^2}\\right)$$
  *(where $k$ is radius of gyration, $I = M k^2$)*
- **Acceleration down an Incline**:
  $$a = \\frac{g\\sin\\theta}{1 + \\frac{I_{\\text{cm}}}{M R^2}} = \\frac{g\\sin\\theta}{1 + \\frac{k^2}{R^2}}$$
- **Race Down Incline (Smallest $k^2/R^2$ reaches bottom first)**:
  $$\\text{Solid Sphere } \\left(\\frac{2}{5}=0.4\\right) > \\text{Solid Disk } \\left(\\frac{1}{2}=0.5\\right) > \\text{Hollow Sphere } \\left(\\frac{2}{3}=0.67\\right) > \\text{Ring } (1.0)$$`,
        equations: [
          {
            name: "Rolling Acceleration down Incline",
            formula: "a_{\\text{rolling}} = \\frac{g\\sin\\theta}{1 + \\frac{I}{MR^2}}",
            explanation: "Mass and radius cancel out; acceleration depends strictly on shape factor $I/(MR^2)$."
          },
          {
            name: "Parallel Axis Theorem",
            formula: "I = I_{\\text{cm}} + M d^2",
            explanation: "Calculates moment of inertia about any parallel axis offset by distance $d$."
          }
        ],
        workedExamples: [
          {
            problem: "A solid sphere and a hollow ring of the same mass and radius are released simultaneously from rest at the top of an incline. Which reaches the bottom first and why?",
            stepByStepSolution: [
              "Recall acceleration formula: $a = \\frac{g\\sin\\theta}{1 + \\frac{I}{MR^2}}$.",
              "For solid sphere: $\\frac{I}{MR^2} = \\frac{2}{5} = 0.4 \\implies a_{\\text{sphere}} = \\frac{g\\sin\\theta}{1 + 0.4} = \\frac{g\\sin\\theta}{1.4} \\approx 0.714 g\\sin\\theta$.",
              "For hollow ring: $\\frac{I}{MR^2} = 1.0 \\implies a_{\\text{ring}} = \\frac{g\\sin\\theta}{1 + 1} = \\frac{g\\sin\\theta}{2} = 0.500 g\\sin\\theta$.",
              "Because $a_{\\text{sphere}} > a_{\\text{ring}}$, the solid sphere has higher acceleration.",
              "Conclusion: The solid sphere reaches the bottom first in less time."
            ],
            shortcutTip: "Mass and radius do NOT matter. The object with the smallest shape ratio $\\frac{I}{MR^2}$ always wins the rolling race."
          }
        ],
        examTraps: [
          "Static friction is REQUIRED for pure rolling without slipping, but static friction does NO WORK ($W_f = 0$) because the point of contact is instantaneously at rest.",
          "Conservation of angular momentum ($I_1\\omega_1 = I_2\\omega_2$) applies only when net external torque is zero ($\\Sigma \\tau_{\\text{ext}} = 0$)."
        ],
        keyTakeaways: [
          "When an ice skater pulls in her arms, $I$ decreases, $\\omega$ increases, and rotational kinetic energy INCREASES due to internal muscular work.",
          "Speed at bottom of incline: $v = \\sqrt{\\frac{2gh}{1 + \\frac{I}{MR^2}}}$."
        ]
      },
      {
        id: 'phys-day2-4-2-fluid-mechanics',
        heading: '4.2 Fluid Statics & Dynamics (Pascal, Archimedes & Bernoulli)',
        content: `### 1. Fluid Statics:
- Pressure: $P = \\frac{F_{\\perp}}{A}$ ($1\\text{ atm} = 1.013 \\times 10^5\\text{ Pa} = 760\\text{ mmHg}$).
- Hydrostatic Pressure at depth $h$: $P = P_0 + \\rho g h$.
- **Pascal’s Principle**: $\\Delta P_1 = \\Delta P_2 \\implies \\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\implies F_2 = F_1 \\left(\\frac{A_2}{A_1}\\right)$.
- **Archimedes’ Principle**:
  $$F_B = \\rho_{\\text{fluid}} \\cdot V_{\\text{submerged}} \\cdot g = \\text{Weight of displaced fluid}$$
- **Fraction of Submerged Volume for Floating Object**:
  $$\\frac{V_{\\text{submerged}}}{V_{\\text{total}}} = \\frac{\\rho_{\\text{object}}}{\\rho_{\\text{fluid}}}$$
- Apparent Weight: $W_{\\text{apparent}} = W_{\\text{actual}} - F_B = mg - \\rho_{\\text{fluid}} V g$.

---

### 2. Fluid Dynamics:
#### Equation of Continuity (Mass Conservation for Incompressible Fluid):
$$A_1 v_1 = A_2 v_2 = Q = \\text{Constant Volume Flow Rate } (\\text{m}^3/\\text{s})$$

#### Bernoulli’s Principle (Energy Conservation for Ideal Flow):
$$P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{Constant}$$
- **Horizontal Pipe ($h_1 = h_2$)**: High fluid speed $\\implies$ Low static pressure ($P_1 + \\frac{1}{2}\\rho v_1^2 = P_2 + \\frac{1}{2}\\rho v_2^2$).

#### Torricelli’s Law of Efflux:
Speed of liquid exiting a small orifice at depth $h$ below open surface:
$$v = \\sqrt{2gh}$$
- Horizontal range of efflux jet from height $H$ with hole at depth $h$:
  $$R = 2\\sqrt{h(H - h)} \\implies R_{\\text{max}} = H \\quad \\text{when hole is at midpoint } h = \\frac{H}{2}$$`,
        equations: [
          {
            name: "Bernoulli Equation",
            formula: "P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{const}",
            explanation: "Sum of static pressure, dynamic pressure, and hydrostatic pressure is constant along a streamline."
          },
          {
            name: "Torricelli Efflux Speed",
            formula: "v = \\sqrt{2gh}",
            explanation: "Exit velocity from a tank hole is identical to free-fall speed from height $h$."
          }
        ],
        workedExamples: [
          {
            problem: "Water flows through a horizontal pipe of diameter $4\\text{ cm}$ at $2\\text{ m/s}$ with pressure $200\\text{ kPa}$. The pipe constricts to diameter $2\\text{ cm}$. Find: (a) flow speed in narrow section, (b) pressure in narrow section ($\\rho_{\\text{water}} = 1000\\text{ kg/m}^3$).",
            stepByStepSolution: [
              "Use Continuity: $A_1 v_1 = A_2 v_2 \\implies \\frac{\\pi d_1^2}{4}v_1 = \\frac{\\pi d_2^2}{4}v_2 \\implies v_2 = v_1 \\left(\\frac{d_1}{d_2}\\right)^2$.",
              "Compute $v_2 = 2 \\times \\left(\\frac{4}{2}\\right)^2 = 2 \\times 4 = 8\\text{ m/s}$.",
              "Apply Bernoulli: $P_1 + \\frac{1}{2}\\rho v_1^2 = P_2 + \\frac{1}{2}\\rho v_2^2$.",
              "Substitute values: $200\\text{ kPa} + \\frac{1}{2}(1000)(2^2) = P_2 + \\frac{1}{2}(1000)(8^2)$.",
              "$200,000 + 2,000 = P_2 + 32,000 \\implies 202,000 = P_2 + 32,000$.",
              "Solve $P_2 = 202,000 - 32,000 = 170,000\\text{ Pa} = 170\\text{ kPa}$."
            ],
            shortcutTip: "When diameter is halved, cross-sectional area is $\\frac{1}{4}$, so speed quadruples ($4\\times$). Velocity head increases by factor of $4^2 = 16$."
          }
        ],
        examTraps: [
          "Archimedes buoyant force depends on the density of the FLUID ($\\rho_{\\text{fluid}}$), NOT the density of the immersed object.",
          "When water freezes into floating ice in a glass, the water level remains EXACTLY THE SAME when the ice melts."
        ],
        keyTakeaways: [
          "Venturi tube measures fluid flow rate by detecting pressure drop at the narrow throat.",
          "Lift on an airplane wing is generated by higher flow speed (lower pressure) above the curved upper wing surface."
        ]
      },
      {
        id: 'phys-day2-4-3-gravitation-orbits',
        heading: '4.3 Universal Gravitation, Kepler’s Laws & Orbital Mechanics',
        content: `### 1. Newton’s Law of Universal Gravitation:
$$F = G \\frac{M m}{r^2}, \\quad G = 6.674 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$$
- **Gravitational Field Strength (Surface Acceleration $g$)**:
  $$g = \\frac{GM}{R^2} \\implies GM = g R^2$$
- **Variation with Altitude $h$**:
  $$g(h) = \\frac{GM}{(R+h)^2} = g \\left(1 + \\frac{h}{R}\\right)^{-2} \\approx g\\left(1 - \\frac{2h}{R}\\right) \\quad (\\text{for } h \\ll R)$$
- **Variation with Depth $d$ inside Earth**:
  $$g(d) = g \\left(1 - \\frac{d}{R}\\right) \\implies g = 0 \\quad \\text{at Earth center } (d = R)$$

---

### 2. Gravitational Potential Energy & Escape Velocity:
- Gravitational Potential Energy (Reference $U(\\infty) = 0$):
  $$U(r) = -\\frac{GMm}{r}$$
- Gravitational Potential: $V(r) = -\\frac{GM}{r}$
- **Escape Velocity ($v_{\\text{esc}}$)** from planet surface:
  $$\\frac{1}{2}m v_{\\text{esc}}^2 - \\frac{GMm}{R} = 0 \\implies v_{\\text{esc}} = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} \\approx 11.2\\text{ km/s for Earth}$$

---

### 3. Satellite Orbital Mechanics:
For a satellite of mass $m$ orbiting at radius $r = R + h$:
- **Orbital Velocity ($v_o$)**:
  $$F_c = \\frac{m v_o^2}{r} = \\frac{GMm}{r^2} \\implies v_o = \\sqrt{\\frac{GM}{r}} = \\sqrt{\\frac{g R^2}{r}}$$
  *(Near surface $r \\approx R$: $v_o = \\sqrt{gR} \\approx 7.9\\text{ km/s} = \\frac{v_{\\text{esc}}}{\\sqrt{2}}$)*
- **Orbital Period ($T$)**:
  $$T = \\frac{2\\pi r}{v_o} = \\frac{2\\pi r^{3/2}}{\\sqrt{GM}} \\implies T^2 = \\left(\\frac{4\\pi^2}{GM}\\right) r^3 \\quad \\text{(Kepler's 3rd Law)}$$
- **Total Mechanical Energy of Orbiting Satellite**:
  $$E_{\\text{total}} = K + U = \\frac{1}{2}m v_o^2 - \\frac{GMm}{r} = \\frac{GMm}{2r} - \\frac{GMm}{r} = -\\frac{GMm}{2r} = -K = \\frac{U}{2}$$
  *(Negative total energy signifies a bound gravitational orbit!)*`,
        equations: [
          {
            name: "Escape vs Orbital Speed Relation",
            formula: "v_{\\text{esc}} = \\sqrt{2} \\cdot v_{\\text{orbital}}",
            explanation: "Increasing circular orbital speed by factor $\\sqrt{2} \\approx 1.414$ (+41.4%) escapes orbit completely."
          },
          {
            name: "Satellite Energy Partition",
            formula: "E_{\\text{total}} = -K = \\frac{1}{2}U = -\\frac{GMm}{2r}",
            explanation: "Virial theorem relation for inverse-square central force gravitational fields."
          }
        ],
        workedExamples: [
          {
            problem: "If a satellite is moved to a new orbit with twice the radius ($r_2 = 2r_1$), by what factor do its (a) orbital speed, (b) orbital period, and (c) total energy change?",
            stepByStepSolution: [
              "Orbital speed: $v_o \\propto \\frac{1}{\\sqrt{r}} \\implies \\frac{v_2}{v_1} = \\sqrt{\\frac{r_1}{2r_1}} = \\frac{1}{\\sqrt{2}} \\approx 0.707$ (decreases by 29.3%).",
              "Orbital period: $T \\propto r^{3/2} \\implies \\frac{T_2}{T_1} = (2)^{3/2} = 2\\sqrt{2} \\approx 2.83$ times longer.",
              "Total energy: $E = -\\frac{GMm}{2r} \\implies \\frac{E_2}{E_1} = \\frac{r_1}{2r_1} = \\frac{1}{2}$ (Energy becomes half as negative, i.e., increases towards 0)."
            ],
            shortcutTip: "Kepler's 3rd Law shortcut: $(r_2/r_1)^3 = (T_2/T_1)^2$. For $r_2 = 2r_1$, $T_2/T_1 = 2^{1.5} = 2\\sqrt{2}$."
          }
        ],
        examTraps: [
          "Gravitational potential energy $U = -\\frac{GMm}{r}$ is NEGATIVE. Moving to a higher orbit increases potential energy (makes it less negative).",
          "Kepler's 2nd Law (Equal areas in equal times) is a direct consequence of Conservation of Angular Momentum ($L = m r v_\\perp = \\text{constant}$)."
        ],
        keyTakeaways: [
          "Geostationary satellites orbit in the equatorial plane with period $T = 24\\text{ hours}$ at altitude $h \\approx 36,000\\text{ km}$ from West to East.",
          "Inside a uniform spherical shell, gravitational field intensity is ZERO everywhere."
        ]
      }
    ]
  }
];
