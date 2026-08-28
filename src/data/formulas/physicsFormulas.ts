import { FormulaItem } from '../../types';

export const PHYSICS_FORMULAS: FormulaItem[] = [
  // 1. KINEMATICS & 1D/2D MOTION
  {
    id: 'pf-kin-01',
    subject: 'physics',
    topic: 'Mechanics',
    category: 'Kinematics',
    name: "1D Uniform Accelerated Motion (SUVAT Equations)",
    formula: "v = u + a t, \\quad s = u t + \\frac{1}{2}a t^2, \\quad v^2 = u^2 + 2a s, \\quad s = \\frac{(u + v)}{2}t",
    variablesExplanation: "u = initial velocity, v = final velocity, a = acceleration, t = time, s = displacement",
    units: "v, u (m/s), a (m/s²), s (m), t (s)",
    description: "Fundamental kinematic equations applicable strictly under CONSTANT acceleration.",
    examTip: "For free fall under gravity, set a = -g = -9.8 m/s² (or -10 m/s² for fast approximation).",
    difficulty: 'Core'
  },
  {
    id: 'pf-kin-02',
    subject: 'physics',
    topic: 'Mechanics',
    category: 'Kinematics',
    name: "2D Projectile Motion Master Equations",
    formula: "T = \\frac{2u\\sin\\theta}{g}, \\quad H_{\\max} = \\frac{u^2\\sin^2\\theta}{2g}, \\quad R = \\frac{u^2\\sin(2\\theta)}{g}",
    variablesExplanation: "u = launch speed, θ = launch angle above horizontal, g = 9.8 m/s²",
    units: "T (s), H (m), R (m)",
    description: "Time of flight, maximum peak height, and horizontal range on flat terrain.",
    examTip: "Maximum horizontal range occurs at θ = 45°. Complementary angles (θ and 90° - θ) yield identical ranges.",
    difficulty: 'Core'
  },
  {
    id: 'pf-kin-03',
    subject: 'physics',
    topic: 'Mechanics',
    category: 'Kinematics',
    name: "Trajectory Parabola Equation",
    formula: "y = x \\tan\\theta - \\frac{g x^2}{2 u^2 \\cos^2\\theta} = x\\tan\\theta\\left(1 - \\frac{x}{R}\\right)",
    variablesExplanation: "y is vertical position at horizontal distance x, R is total range",
    description: "Path of projectile in Cartesian coordinates without the time parameter t.",
    examTip: "The factored form y = x tan θ (1 - x/R) enables 15-second solutions when range R is given.",
    difficulty: 'Advanced'
  },
  {
    id: 'pf-kin-04',
    subject: 'physics',
    topic: 'Mechanics',
    category: 'Kinematics',
    name: "Uniform Circular Motion & Centripetal Acceleration",
    formula: "a_c = \\frac{v^2}{r} = \\omega^2 r = \\frac{4\\pi^2 r}{T^2}, \\quad v = \\omega r = 2\\pi r f",
    variablesExplanation: "v = linear speed, r = radius, ω = angular velocity, T = period, f = frequency",
    units: "a_c (m/s²), ω (rad/s), v (m/s)",
    description: "Acceleration directed strictly toward the center of curvature.",
    examTip: "Work done by centripetal force is ALWAYS ZERO because force is perpendicular to velocity (cos 90° = 0).",
    difficulty: 'Core'
  },
  {
    id: 'pf-kin-05',
    subject: 'physics',
    topic: 'Mechanics',
    category: 'Kinematics',
    name: "Vertical Circular Motion Minimum Speeds",
    formula: "v_{\\text{top, min}} = \\sqrt{g r}, \\quad v_{\\text{bottom, min}} = \\sqrt{5 g r}, \\quad T_{\\text{bottom}} - T_{\\text{top}} = 6 m g",
    variablesExplanation: "r = loop radius, m = mass",
    description: "Threshold speeds to maintain non-zero tension and complete a full vertical loop.",
    examTip: "Tension difference between bottom and top is ALWAYS exactly 6 mg.",
    difficulty: 'Top-Rank'
  },

  // 2. DYNAMICS & NEWTON'S LAWS
  {
    id: 'pf-dyn-01',
    subject: 'physics',
    topic: 'Mechanics',
    category: "Newton's Laws & Dynamics",
    name: "Newton's Second Law & Momentum",
    formula: "\\mathbf{F}_{\\text{net}} = m \\mathbf{a} = \\frac{d\\mathbf{p}}{dt}, \\quad \\mathbf{p} = m \\mathbf{v}",
    variablesExplanation: "F = net force, m = mass, a = acceleration, p = linear momentum",
    units: "F (Newtons, N = kg·m/s²), p (kg·m/s)",
    description: "Rate of change of linear momentum equals applied net external force.",
    examTip: "If mass varies with time (like a rocket), use F = m(dv/dt) + v(dm/dt).",
    difficulty: 'Core'
  },
  {
    id: 'pf-dyn-02',
    subject: 'physics',
    topic: 'Mechanics',
    category: "Newton's Laws & Dynamics",
    name: "Static & Kinetic Friction",
    formula: "f_s \\le \\mu_s N, \\quad f_k = \\mu_k N",
    variablesExplanation: "μ_s = static friction coefficient, μ_k = kinetic friction coefficient, N = normal contact force",
    description: "Static friction matches applied tangential force up to maximum threshold μ_s N. Kinetic friction acts during relative sliding.",
    examTip: "Always μ_s > μ_k. On an incline of angle θ, impending slip occurs at tan θ = μ_s (angle of repose).",
    difficulty: 'Core'
  },
  {
    id: 'pf-dyn-03',
    subject: 'physics',
    topic: 'Mechanics',
    category: "Newton's Laws & Dynamics",
    name: "Inclined Plane Dynamics",
    formula: "a = g(\\sin\\theta - \\mu_k \\cos\\theta), \\quad N = mg \\cos\\theta",
    variablesExplanation: "θ = incline angle, μ_k = friction coefficient",
    description: "Acceleration of a mass sliding down a rough inclined plane under gravity.",
    examTip: "Notice mass m cancels out! All bodies slide down with identical acceleration regardless of mass.",
    difficulty: 'Core'
  },
  {
    id: 'pf-dyn-04',
    subject: 'physics',
    topic: 'Mechanics',
    category: "Newton's Laws & Dynamics",
    name: "Atwood Machine (Connected Masses over Pulley)",
    formula: "a = \\frac{m_2 - m_1}{m_1 + m_2}g, \\quad T = \\frac{2 m_1 m_2}{m_1 + m_2}g",
    variablesExplanation: "m_2 > m_1, frictionless light pulley and inextensible string",
    units: "a (m/s²), T (N)",
    description: "Standard vertical Atwood machine acceleration and string tension.",
    examTip: "For a table-edge pulley: a = m_hang * g / (m_table + m_hang).",
    difficulty: 'Core'
  },
  {
    id: 'pf-dyn-05',
    subject: 'physics',
    topic: 'Mechanics',
    category: "Newton's Laws & Dynamics",
    name: "Banking of Curved Roads (No Friction)",
    formula: "\\tan\\theta = \\frac{v^2}{r g} \\implies v_{\\text{safe}} = \\sqrt{r g \\tan\\theta}",
    variablesExplanation: "θ = banking angle, r = curve radius, v = design speed",
    description: "Optimum road banking angle where horizontal normal force provides 100% of centripetal force with zero friction required.",
    examTip: "Also applies to conical pendulum angle and aircraft banking in a horizontal turn.",
    difficulty: 'Advanced'
  },

  // 3. WORK, ENERGY & POWER
  {
    id: 'pf-en-01',
    subject: 'physics',
    topic: 'Mechanics',
    category: 'Work & Energy',
    name: "Work-Energy Theorem",
    formula: "W_{\\text{net}} = \\mathbf{F} \\cdot \\mathbf{s} = F s \\cos\\theta = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2",
    variablesExplanation: "W = work, K = kinetic energy, θ = angle between force and displacement vectors",
    units: "Joules (J = N·m = kg·m²/s²)",
    description: "The net mechanical work done on a body equals the exact change in its translational kinetic energy.",
    examTip: "If force is variable: W = ∫ F(x) dx (area under Force vs. Position curve).",
    difficulty: 'Core'
  },
  {
    id: 'pf-en-02',
    subject: 'physics',
    topic: 'Mechanics',
    category: 'Work & Energy',
    name: "Elastic Potential Energy (Hooke's Law)",
    formula: "F_s = -k x, \\quad U_s = \\frac{1}{2}k x^2",
    variablesExplanation: "k = spring stiffness constant (N/m), x = extension/compression from equilibrium",
    units: "U_s in Joules (J)",
    description: "Restoring force and stored elastic potential energy of an ideal linear spring.",
    examTip: "Work required to stretch from x_1 to x_2 is (1/2)k(x_2^2 - x_1^2).",
    difficulty: 'Core'
  },
  {
    id: 'pf-en-03',
    subject: 'physics',
    topic: 'Mechanics',
    category: 'Work & Energy',
    name: "Conservation of Linear Momentum & Collisions",
    formula: "m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2, \\quad e = \\frac{v_2 - v_1}{u_1 - u_2}",
    variablesExplanation: "e = coefficient of restitution (e=1 elastic, 0 < e < 1 inelastic, e=0 perfectly inelastic)",
    description: "Momentum is always conserved in all closed systems. Kinetic energy is conserved ONLY when e = 1.",
    examTip: "In a 1D elastic collision of equal masses (m_1 = m_2), the velocities simply SWAP.",
    difficulty: 'Core'
  },

  // 4. ROTATIONAL DYNAMICS
  {
    id: 'pf-rot-01',
    subject: 'physics',
    topic: 'Mechanics',
    category: 'Rotational Motion',
    name: "Torque & Rotational Newton's Second Law",
    formula: "\\boldsymbol{\\tau} = \\mathbf{r} \\times \\mathbf{F} = r F \\sin\\theta = I \\boldsymbol{\\alpha}",
    variablesExplanation: "τ = torque (N·m), r = moment arm, I = moment of inertia (kg·m²), α = angular acceleration (rad/s²)",
    description: "Rotational equivalent of force and linear acceleration.",
    examTip: "Counterclockwise torque is positive by convention; clockwise is negative.",
    difficulty: 'Core'
  },
  {
    id: 'pf-rot-02',
    subject: 'physics',
    topic: 'Mechanics',
    category: 'Rotational Motion',
    name: "Moments of Inertia for Standard Rigid Bodies",
    formula: "I_{\\text{hoop}} = M R^2, \\quad I_{\\text{disk}} = \\frac{1}{2}M R^2, \\quad I_{\\text{solid sphere}} = \\frac{2}{5}M R^2, \\quad I_{\\text{hollow sphere}} = \\frac{2}{3}M R^2",
    variablesExplanation: "M = total mass, R = radius",
    description: "Resistance of rigid bodies to angular acceleration about their symmetry axes.",
    examTip: "Parallel Axis Theorem: I = I_cm + M d^2.",
    difficulty: 'Advanced'
  },
  {
    id: 'pf-rot-03',
    subject: 'physics',
    topic: 'Mechanics',
    category: 'Rotational Motion',
    name: "Rolling Without Slipping & Total Kinetic Energy",
    formula: "v_{\\text{cm}} = \\omega R, \\quad K_{\\text{total}} = \\frac{1}{2}M v_{\\text{cm}}^2 + \\frac{1}{2}I_{\\text{cm}} \\omega^2 = \\frac{1}{2}M v^2 \\left(1 + \\frac{k^2}{R^2}\\right)",
    variablesExplanation: "k is radius of gyration (I = M k^2)",
    description: "Combines translational center-of-mass energy and rotational kinetic energy.",
    examTip: "On an incline, the body with SMALLEST I/MR^2 ratio reaches bottom FASTEST.",
    difficulty: 'Advanced'
  },

  // 5. GRAVITATION & ORBITS
  {
    id: 'pf-grav-01',
    subject: 'physics',
    topic: 'Mechanics',
    category: 'Gravitation',
    name: "Newton's Law of Universal Gravitation",
    formula: "F_g = G \\frac{M m}{r^2}, \\quad g(r) = \\frac{G M}{r^2}, \\quad U_g = -\\frac{G M m}{r}",
    variablesExplanation: "G = 6.674×10⁻¹¹ N·m²/kg², M = central mass, r = center-to-center distance",
    units: "g in m/s², U_g in Joules (J)",
    description: "Inverse-square attractive force between point masses.",
    examTip: "Acceleration at altitude h: g_h = g_0 / (1 + h/R)^2.",
    difficulty: 'Core'
  },
  {
    id: 'pf-grav-02',
    subject: 'physics',
    topic: 'Mechanics',
    category: 'Gravitation',
    name: "Orbital Velocity & Escape Velocity",
    formula: "v_{\\text{orbit}} = \\sqrt{\\frac{G M}{r}}, \\quad v_{\\text{escape}} = \\sqrt{\\frac{2 G M}{R}} = \\sqrt{2 g R}",
    variablesExplanation: "R is planetary radius, r is orbital radius",
    description: "Speed for circular orbit and minimum speed to escape gravitational well to infinity.",
    examTip: "Notice: v_escape = √2 × v_orbit (approx. 41.4% faster). Earth escape speed is ~11.2 km/s.",
    difficulty: 'Core'
  },
  {
    id: 'pf-grav-03',
    subject: 'physics',
    topic: 'Mechanics',
    category: 'Gravitation',
    name: "Kepler's Third Law (Harmonic Law)",
    formula: "T^2 = \\left(\\frac{4\\pi^2}{G M}\\right) a^3 \\implies \\frac{T_1^2}{T_2^2} = \\frac{a_1^3}{a_2^3}",
    variablesExplanation: "T = orbital period, a = semi-major axis (radius for circular orbit)",
    description: "The square of orbital period is strictly proportional to the cube of semi-major axis.",
    examTip: "If orbital radius doubles (r -> 2r), the period increases by 2^{1.5} = √8 ≈ 2.83 times.",
    difficulty: 'Core'
  },

  // 6. FLUID MECHANICS
  {
    id: 'pf-fl-01',
    subject: 'physics',
    topic: 'Fluids & Thermal Physics',
    category: 'Fluid Mechanics',
    name: "Hydrostatic Pressure & Pascal's Principle",
    formula: "P = P_0 + \\rho g h, \\quad \\frac{F_1}{A_1} = \\frac{F_2}{A_2}",
    variablesExplanation: "P_0 = surface atmospheric pressure, ρ = fluid density, h = depth",
    units: "Pressure in Pascals (Pa = N/m²)",
    description: "Pressure in incompressible static fluid increases linearly with depth.",
    examTip: "Hydraulic output force: F_2 = F_1 × (A_2 / A_1) = F_1 × (d_2 / d_1)^2.",
    difficulty: 'Core'
  },
  {
    id: 'pf-fl-02',
    subject: 'physics',
    topic: 'Fluids & Thermal Physics',
    category: 'Fluid Mechanics',
    name: "Archimedes' Buoyancy Principle",
    formula: "F_b = \\rho_{\\text{fluid}} V_{\\text{displaced}} g = W_{\\text{displaced fluid}}",
    variablesExplanation: "V_displaced = submerged volume",
    description: "Upward buoyant force equals the weight of displaced fluid. Fraction submerged: V_sub / V_total = ρ_body / ρ_fluid.",
    examTip: "Apparent weight of submerged body: W_app = W_real - F_b.",
    difficulty: 'Core'
  },
  {
    id: 'pf-fl-03',
    subject: 'physics',
    topic: 'Fluids & Thermal Physics',
    category: 'Fluid Mechanics',
    name: "Continuity Equation & Bernoulli's Principle",
    formula: "A_1 v_1 = A_2 v_2 = Q, \\quad P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}",
    variablesExplanation: "A = cross-sectional area, v = fluid speed, P = static pressure",
    description: "Conservation of mass and energy for streamline, non-viscous, incompressible fluid flow.",
    examTip: "Venturi effect: When pipe narrows, speed INCREASES and pressure DECREASES.",
    difficulty: 'Advanced'
  },
  {
    id: 'pf-fl-04',
    subject: 'physics',
    topic: 'Fluids & Thermal Physics',
    category: 'Fluid Mechanics',
    name: "Stokes' Viscous Drag & Terminal Velocity",
    formula: "F_{\\text{drag}} = 6 \\pi \\eta r v, \\quad v_t = \\frac{2 r^2 (\\rho_{\\text{body}} - \\rho_{\\text{fluid}}) g}{9 \\eta}",
    variablesExplanation: "η = dynamic viscosity (Pa·s), r = sphere radius, v_t = terminal velocity",
    description: "Viscous resistance on small spheres in laminar flow regimes.",
    examTip: "Terminal velocity is proportional to radius SQUARED (r²).",
    difficulty: 'Advanced'
  },
  {
    id: 'pf-fl-05',
    subject: 'physics',
    topic: 'Fluids & Thermal Physics',
    category: 'Fluid Mechanics',
    name: "Surface Tension & Capillary Action",
    formula: "\\Delta P_{\\text{drop}} = \\frac{2\\gamma}{r}, \\quad \\Delta P_{\\text{bubble}} = \\frac{4\\gamma}{r}, \\quad h = \\frac{2\\gamma \\cos\\theta}{\\rho g r}",
    variablesExplanation: "γ = surface tension (N/m), r = radius, θ = contact angle",
    description: "Excess internal pressure in spherical drops and capillary meniscus height.",
    examTip: "A soap bubble has 2 surfaces (inner + outer), hence 4γ/r factor.",
    difficulty: 'Advanced'
  },

  // 7. THERMODYNAMICS & HEAT TRANSFER
  {
    id: 'pf-th-01',
    subject: 'physics',
    topic: 'Fluids & Thermal Physics',
    category: 'Thermodynamics',
    name: "First Law of Thermodynamics",
    formula: "\\Delta U = Q - W, \\quad W = \\int P dV",
    variablesExplanation: "ΔU = internal energy change, Q = heat added to system, W = work done BY system",
    description: "Conservation of energy for thermodynamic processes.",
    examTip: "Isochoric => W = 0, ΔU = Q. Isothermal => ΔU = 0, Q = W. Adiabatic (Q = 0) => ΔU = -W.",
    difficulty: 'Core'
  },
  {
    id: 'pf-th-02',
    subject: 'physics',
    topic: 'Fluids & Thermal Physics',
    category: 'Thermodynamics',
    name: "Carnot Engine Maximum Efficiency",
    formula: "\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H} = \\frac{W_{\\text{net}}}{Q_H} = \\frac{Q_H - Q_C}{Q_H}",
    variablesExplanation: "T_H = hot reservoir temperature in KELVIN, T_C = cold reservoir in KELVIN",
    description: "Theoretical upper limit of efficiency for any heat engine operating between two thermal reservoirs.",
    examTip: "Always convert temperatures to Kelvin (K = °C + 273.15)! Never use Celsius in η.",
    difficulty: 'Core'
  },
  {
    id: 'pf-th-03',
    subject: 'physics',
    topic: 'Fluids & Thermal Physics',
    category: 'Thermodynamics',
    name: "Stefan-Boltzmann Radiation Law & Wien's Law",
    formula: "P = \\varepsilon \\sigma A T^4, \\quad \\lambda_{\\max} T = b = 2.898 \\times 10^{-3} \\text{ m}\\cdot\\text{K}",
    variablesExplanation: "σ = 5.67×10⁻⁸ W/(m²·K⁴), ε = emissivity (0 <= ε <= 1)",
    description: "Total radiant power emitted by blackbody and peak wavelength distribution.",
    examTip: "If absolute temperature doubles (T -> 2T), emitted power increases by 2⁴ = 16 times!",
    difficulty: 'Core'
  },

  // 8. OSCILLATIONS & WAVES
  {
    id: 'pf-wav-01',
    subject: 'physics',
    topic: 'Waves & Optics',
    category: 'Simple Harmonic Motion (SHM)',
    name: "Mass-Spring & Simple Pendulum Periods",
    formula: "T_{\\text{spring}} = 2\\pi \\sqrt{\\frac{m}{k}}, \\quad T_{\\text{pendulum}} = 2\\pi \\sqrt{\\frac{L}{g}}",
    variablesExplanation: "m = mass, k = spring constant, L = pendulum length, g = acceleration of gravity",
    units: "Period T in seconds (s)",
    description: "Oscillation periods for linear SHM under small-angle approximations.",
    examTip: "Pendulum period does NOT depend on mass or amplitude (for small angles < 15°).",
    difficulty: 'Core'
  },
  {
    id: 'pf-wav-02',
    subject: 'physics',
    topic: 'Waves & Optics',
    category: 'Wave Motion',
    name: "Doppler Effect for Sound",
    formula: "f' = f \\left( \\frac{v \\pm v_o}{v \\mp v_s} \\right)",
    variablesExplanation: "v = sound speed in air (~343 m/s), v_o = observer speed, v_s = source speed",
    description: "Apparent frequency shift due to relative motion.",
    examTip: "Mnemonic: Towards => Higher pitch (f' > f); Away => Lower pitch (f' < f).",
    difficulty: 'Core'
  },
  {
    id: 'pf-wav-03',
    subject: 'physics',
    topic: 'Waves & Optics',
    category: 'Wave Motion',
    name: "Standing Waves in Pipes (Open vs Closed)",
    formula: "f_n^{\\text{open}} = \\frac{n v}{2 L} \\; (n=1,2,3\\dots), \\quad f_n^{\\text{closed}} = \\frac{(2n-1) v}{4 L} \\; (n=1,2,3\\dots)",
    variablesExplanation: "L = pipe length, v = speed of sound in air",
    description: "Resonant harmonics in open-open cylindrical columns versus open-closed tubes.",
    examTip: "A closed pipe supports ONLY ODD harmonics (1st, 3rd, 5th...).",
    difficulty: 'Core'
  },

  // 9. ELECTROSTATICS & CAPACITORS
  {
    id: 'pf-el-01',
    subject: 'physics',
    topic: 'Electricity & Magnetism',
    category: 'Electrostatics',
    name: "Coulomb's Law & Electric Potential",
    formula: "F_e = k_e \\frac{|q_1 q_2|}{r^2}, \\quad E = \\frac{k_e Q}{r^2}, \\quad V = \\frac{k_e Q}{r}",
    variablesExplanation: "k_e = 8.99×10⁹ N·m²/C², V = electric potential in Volts",
    description: "Inverse-square force, electric field, and scalar potential due to point charges.",
    examTip: "Electric field is the negative gradient of potential: E = -dV/dr.",
    difficulty: 'Core'
  },
  {
    id: 'pf-el-02',
    subject: 'physics',
    topic: 'Electricity & Magnetism',
    category: 'Electrostatics',
    name: "Gauss's Law of Electrostatics",
    formula: "\\Phi_E = \\oint \\mathbf{E} \\cdot d\\mathbf{A} = \\frac{Q_{\\text{enclosed}}}{\\epsilon_0}",
    variablesExplanation: "ε_0 = 8.854×10⁻¹² C²/(N·m²)",
    description: "Total electric flux through any closed Gaussian surface equals net enclosed charge divided by permittivity.",
    examTip: "Inside a charged hollow spherical shell, E = 0 everywhere.",
    difficulty: 'Advanced'
  },
  {
    id: 'pf-el-03',
    subject: 'physics',
    topic: 'Electricity & Magnetism',
    category: 'Electrostatics',
    name: "Capacitance, Energy & Dielectrics",
    formula: "C = \\frac{\\kappa \\epsilon_0 A}{d}, \\quad U = \\frac{1}{2} C V^2 = \\frac{Q^2}{2C}, \\quad u_E = \\frac{1}{2}\\epsilon_0 E^2",
    variablesExplanation: "κ = dielectric constant, u_E = electrostatic energy density (J/m³)",
    description: "Charge storage and energy density in electrostatic fields.",
    examTip: "Inserting dielectric with battery DISCONNECTED: Q remains constant, V decreases by factor κ, C increases by κ.",
    difficulty: 'Core'
  },

  // 10. CURRENT, CIRCUITS & MAGNETISM
  {
    id: 'pf-cir-01',
    subject: 'physics',
    topic: 'Electricity & Magnetism',
    category: 'Current Electricity',
    name: "Drift Velocity & Current Density",
    formula: "I = n A q v_d, \\quad J = \\frac{I}{A} = n q v_d = \\sigma E",
    variablesExplanation: "n = free charge carrier density (m⁻³), A = wire area, v_d = drift speed, σ = conductivity",
    description: "Microscopic view of electric conduction in metallic conductors.",
    examTip: "Drift velocity is very slow (order of mm/s), but electric signal travels near the speed of light.",
    difficulty: 'Advanced'
  },
  {
    id: 'pf-cir-02',
    subject: 'physics',
    topic: 'Electricity & Magnetism',
    category: 'Current Electricity',
    name: "Wheatstone Bridge & Potentiometer Balance",
    formula: "\\frac{R_1}{R_2} = \\frac{R_3}{R_4}, \\quad \\frac{\\mathcal{E}_1}{\\mathcal{E}_2} = \\frac{L_1}{L_2}",
    variablesExplanation: "L1, L2 are balancing null deflection lengths on uniform potentiometer wire",
    description: "Zero-deflection null methods for precision resistance and EMF measurement.",
    examTip: "Potentiometer draws NO current at balance point, measuring true EMF.",
    difficulty: 'Core'
  },
  {
    id: 'pf-cir-03',
    subject: 'physics',
    topic: 'Electricity & Magnetism',
    category: 'Magnetic Fields',
    name: "Biot-Savart Law & Solenoid Field",
    formula: "B_{\\text{wire}} = \\frac{\\mu_0 I}{2\\pi r}, \\quad B_{\\text{solenoid}} = \\mu_0 n I = \\mu_0 \\frac{N}{L} I",
    variablesExplanation: "μ_0 = 4π×10⁻⁷ T·m/A, n = turns per meter",
    description: "Magnetic fields generated by straight wires and tightly wound solenoids.",
    examTip: "At the edge/end of a long solenoid, B = (1/2) μ_0 n I (half of center field).",
    difficulty: 'Core'
  },
  {
    id: 'pf-cir-04',
    subject: 'physics',
    topic: 'Electricity & Magnetism',
    category: 'Electromagnetic Induction',
    name: "Motional EMF & Self-Inductance",
    formula: "\\mathcal{E} = B L v \\sin\\theta, \\quad \\mathcal{E}_L = -L \\frac{dI}{dt}, \\quad U_L = \\frac{1}{2} L I^2",
    variablesExplanation: "L = inductance (Henry, H), B = magnetic field, v = conductor speed",
    description: "Induced EMF in moving conductors and stored magnetic energy in inductors.",
    examTip: "Inductor opposes sudden changes in CURRENT, capacitor opposes sudden changes in VOLTAGE.",
    difficulty: 'Core'
  },
  {
    id: 'pf-cir-05',
    subject: 'physics',
    topic: 'Electricity & Magnetism',
    category: 'AC Circuits',
    name: "Series RLC Impedance & Resonance",
    formula: "Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad X_L = 2\\pi f L, \\quad X_C = \\frac{1}{2\\pi f C}, \\quad f_{\\text{res}} = \\frac{1}{2\\pi\\sqrt{LC}}",
    variablesExplanation: "Z = total impedance (Ohms), f_res = resonant frequency",
    description: "Alternating current impedance and resonance condition where X_L = X_C and Z = R.",
    examTip: "At resonance, impedance is at its MINIMUM (Z = R) and current amplitude is at its MAXIMUM.",
    difficulty: 'Advanced'
  },

  // 11. OPTICS & MODERN PHYSICS
  {
    id: 'pf-opt-01',
    subject: 'physics',
    topic: 'Waves & Optics',
    category: 'Wave Optics',
    name: "Young's Double Slit Fringe Width",
    formula: "y_m = m \\frac{\\lambda D}{d}, \\quad \\beta = \\frac{\\lambda D}{d}",
    variablesExplanation: "λ = light wavelength, D = distance to screen, d = slit separation, β = fringe width",
    description: "Constructive interference condition and uniform spacing between adjacent bright fringes.",
    examTip: "If whole apparatus is immersed in liquid of refractive index n, fringe width shrinks: β' = β / n.",
    difficulty: 'Core'
  },
  {
    id: 'pf-opt-02',
    subject: 'physics',
    topic: 'Waves & Optics',
    category: 'Geometric Optics',
    name: "Lens Maker's Equation",
    formula: "\\frac{1}{f} = (n - 1)\\left( \\frac{1}{R_1} - \\frac{1}{R_2} \\right)",
    variablesExplanation: "n = refractive index of lens material, R_1, R_2 = radii of curvature of surfaces",
    description: "Calculates focal length based on surface geometry and material index.",
    examTip: "For equiconvex lens in air with index n=1.5: f = R.",
    difficulty: 'Advanced'
  },
  {
    id: 'pf-mod-01',
    subject: 'physics',
    topic: 'Modern Physics',
    category: 'Quantum & Nuclear',
    name: "Photoelectric Effect (Einstein's Equation)",
    formula: "E = h f = \\frac{h c}{\\lambda} = \\Phi + K_{\\max}, \\quad K_{\\max} = e V_{\\text{stop}}",
    variablesExplanation: "h = 6.626×10⁻³⁴ J·s = 4.136×10⁻¹⁵ eV·s, Φ = work function, V_stop = stopping potential",
    description: "Quantum absorption of photons and maximum kinetic energy of emitted photoelectrons.",
    examTip: "Threshold frequency: f_0 = Φ / h. Intensity affects electron flux, NOT kinetic energy.",
    difficulty: 'Core'
  },
  {
    id: 'pf-mod-02',
    subject: 'physics',
    topic: 'Modern Physics',
    category: 'Quantum & Nuclear',
    name: "De Broglie Wavelength & Bohr Atom",
    formula: "\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2 m K}}, \\quad E_n = -\\frac{13.6 \\text{ eV}}{n^2} Z^2",
    variablesExplanation: "K = kinetic energy = q V",
    description: "Matter waves and quantized electronic orbital energy levels in hydrogenic atoms.",
    examTip: "For electron accelerated through potential V: λ = 1.227 / √V nm.",
    difficulty: 'Core'
  },
  {
    id: 'pf-mod-03',
    subject: 'physics',
    topic: 'Modern Physics',
    category: 'Quantum & Nuclear',
    name: "Nuclear Binding Energy & Mass Defect",
    formula: "\\Delta m = [Z m_p + (A - Z)m_n] - M_{\\text{nucleus}}, \\quad E_b = \\Delta m \\cdot c^2 = \\Delta m(\\text{amu}) \\times 931.5 \\text{ MeV}",
    variablesExplanation: "Z = proton count, A = mass number, 1 amu ≈ 931.5 MeV/c²",
    description: "Energy released during nuclear formation; binding energy per nucleon peaks around Fe-56.",
    examTip: "Higher binding energy per nucleon (BE/A) indicates greater nuclear stability.",
    difficulty: 'Core'
  }
];
