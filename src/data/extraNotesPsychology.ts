import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for General Psychology (Psychology - 11 Chapters)
 * Preserves all existing notes and adds theoretical matrices, diagnostic comparisons,
 * applied psychological scenarios, and exam traps across all 11 chapters.
 */
export const EXTRA_NOTES_PSYCHOLOGY: Record<number, MasterNoteSection[]> = {
  // Chapter 1: Essence of Psychology
  1: [
    {
      id: 'psyc-extra-c1-sec1',
      heading: '1.4 Masterclass: Historical Paradigms Matrix, Modern Perspectives & Experimental Methodology',
      content: `### 1.4.1 Chronological Evolution of Psychological Thought
Psychology was born as an independent empirical discipline in **1879** when **Wilhelm Wundt** opened the first experimental psychology laboratory at the University of Leipzig, Germany.

| School of Thought | Founder / Key Proponents | Core Subject Matter | Primary Methodology | Key Criticism / Limitation |
| :--- | :--- | :--- | :--- | :--- |
| **Structuralism** | Wilhelm Wundt, Edward Titchener | Analyzing the **basic elemental structures** of conscious experience (sensations, feelings, images). | **Introspection** (self-reporting of inner conscious sensations). | Too subjective, untestable, unscientific; cannot study animals, children, or mental disorders. |
| **Functionalism** | William James, John Dewey | How the mind and conscious behavior **function to help organisms adapt** to their environment (influenced by Darwin). | Diverse: behavioral observation, animal testing, mental tests. | Lacked a cohesive unifying mathematical structure; superseded by behaviorism. |
| **Gestalt Psychology** | Max Wertheimer, Kurt Koffka, Wolfgang Köhler | Holistic perceptual organization: *"The whole is greater than the sum of its parts."* | Visual perceptual experiments, phenomenological demonstrations. | Described perceptual phenomena thoroughly but offered limited underlying neural mechanisms. |
| **Psychoanalysis** | Sigmund Freud | The powerful influence of the **unconscious mind**, repressed childhood conflicts, and sexual/aggressive instincts. | Free association, dream analysis, Freudian slips analysis. | Unfalsifiable; non-experimental; overly pessimistic and overemphasized infantile sexuality. |
| **Behaviorism** | John B. Watson, B.F. Skinner, Ivan Pavlov | **Observable, measurable behavior only**; rejected internal consciousness as an unobservable "black box". | Controlled laboratory animal/human experiments (S–R conditioning). | Ignored cognition, mental imagery, emotions, biological constraints, and free will. |
| **Humanism** | Abraham Maslow, Carl Rogers | Human freedom, inherent goodness, self-determination, and the drive toward **self-actualization**. | Qualitative case studies, phenomenological interviews, unconditional positive regard. | Overly idealistic; difficult to operationalize and test empirically. |
| **Cognitive Psychology**| Ulric Neisser, George Miller, Jean Piaget | Internal mental processes: **thinking, memory, perception, language, problem-solving** (mind as computer). | Rigorous laboratory experiments, reaction time measurements, computational modeling. | Sometimes underplays the role of emotion and sociocultural context in everyday thinking. |

---

### 1.4.2 Research Methods: Experimental Design Precision
- **Independent Variable (IV)**: The variable **manipulated or systematically altered** by the experimenter (the hypothesized cause).
- **Dependent Variable (DV)**: The variable **measured to assess the effect** of the IV (the hypothesized effect).
- **Control Group vs. Experimental Group**:
  - Experimental Group receives the experimental treatment (active level of IV).
  - Control Group receives the baseline or placebo treatment (zero level of IV).
- **Random Assignment**: Every participant has an equal mathematical probability of being assigned to either group, thereby controlling for participant-related **confounding variables** (extraneous variables).
- **Correlation vs. Causation**:
  - Pearson correlation coefficient $r \\in [-1.0, +1.0]$.
  - **Correlation does NEVER establish causation!** A third unmeasured variable ($Z$) could account for the observed covariation between $X$ and $Y$. Only a randomized controlled experiment can establish cause-and-effect relationships.`,
      workedExamples: [
        {
          problem: 'A university psychologist tests whether listening to classical music while studying improves freshman memory retention. Group 1 studies a list of 50 biology terms in silence. Group 2 studies the same list while listening to Mozart at 60 dB. Both groups take identical recall quizzes 24 hours later. Identify: (1) Independent Variable; (2) Dependent Variable; (3) Experimental and Control groups; (4) Two crucial confounding variables that must be controlled.',
          stepByStepSolution: [
            '1. Independent Variable (IV): **Presence or absence of classical background music (Mozart)**.',
            '2. Dependent Variable (DV): **Number of biology terms correctly recalled on the 24-hour test**.',
            '3. Groups: **Group 2 is the Experimental Group**; **Group 1 is the Control Group**.',
            '4. Confounding Variables: (a) **Prior biology knowledge** of participants (must randomize or pre-screen); (b) **Time of study / sleep duration** between learning and testing.'
          ],
          shortcutTip: 'Ask: "What did the researcher alter between groups?" = IV. "What was measured at the end?" = DV.'
        }
      ],
      examTraps: [
        'Confusing negative correlation with no correlation. A negative correlation ($r = -0.85$) represents a strong, highly predictable inverse relationship (as one variable rises, the other falls). A value near $r = 0.00$ represents no correlation.',
        'Believing Wundt was a behaviorist. Wundt founded Structuralism and relied heavily on introspection to map conscious elements.'
      ],
      keyTakeaways: [
        'Psychology is defined as the scientific study of human behavior and underlying mental processes.',
        'Random assignment is the single methodological hallmark that distinguishes true experimental designs from correlational surveys.'
      ]
    }
  ],

  // Chapter 2: Sensation and Perception
  2: [
    {
      id: 'psyc-extra-c2-sec1',
      heading: '2.4 Masterclass: Weber-Fechner Psychophysics, Signal Detection & Gestalt Grouping Laws',
      content: `### 2.4.1 Psychophysics: Sensory Thresholds and Weber\'s Law
1. **Absolute Threshold**:
   The minimum intensity of physical stimulation necessary for an observer to detect a stimulus **$50\\%$ of the time** (e.g., detecting a candle flame $30\\text{ miles}$ away on a clear, dark night).
2. **Difference Threshold (Just Noticeable Difference — JND)**:
   The minimal difference in physical magnitude between two stimuli required to perceive them as different $50\\%$ of the time.
3. **Weber\'s Law (Ernst Weber)**:
   The JND is not a constant absolute physical quantity, but a **constant fraction (proportion $k$)** of the original baseline stimulus intensity:
   $$\\frac{\\Delta I}{I} = k \\quad \\iff \\quad \\Delta I = k \\cdot I$$
   - If Weber's fraction for weight is $k = 0.02$ ($2\\%$):
     - For an initial load of $100\\text{ g}$, the JND is $\\Delta I = 0.02 \\times 100 = 2\\text{ g}$.
     - For an initial load of $1000\\text{ g}$, the JND is $\\Delta I = 0.02 \\times 1000 = 20\\text{ g}$.

---

### 2.4.2 Signal Detection Theory (SDT) Matrix
Rejects rigid absolute thresholds, recognizing that detection depends on both **sensory sensitivity** and **cognitive decision criteria**:

| Reality / State of Nature | Observer Response: "YES" (Signal Present) | Observer Response: "NO" (Signal Absent) |
| :--- | :--- | :--- |
| **Signal Actually Present** | **HIT** (Correct detection) | **MISS** (Type II Error) |
| **Signal Actually Absent (Noise Only)**| **FALSE ALARM** (Type I Error) | **CORRECT REJECTION** |

---

### 2.4.3 Gestalt Perceptual Organization Principles
The brain automatically synthesizes raw visual stimuli according to innate organizational heuristics:
1. **Figure-Ground Organization**: The visual field automatically segregates into a prominent, focused object (the **figure**) against a diffuse, receding background (the **ground**; e.g., Rubin's vase-face illusion).
2. **Law of Proximity**: Elements that are physically close to one another are perceived as belonging together as a unit.
3. **Law of Similarity**: Stimuli sharing visual characteristics (shape, color, size, texture) are grouped together.
4. **Law of Good Continuity**: The visual system prefers smooth, continuous lines and trajectories over sharp, discontinuous angles.
5. **Law of Closure**: The mind automatically bridges gaps or fills in missing contour information to perceive an incomplete figure as a coherent whole.
6. **Law of Simplicity (Prägnanz)**: Every visual stimulus pattern is perceived in such a way that the resulting perceptual structure is as simple, regular, and symmetrical as possible.`,
      equations: [
        {
          name: 'Weber\'s Law of Just Noticeable Difference',
          formula: '\\Delta I = k \\cdot I',
          description: 'States that the threshold of change detection scales directly with the baseline stimulus magnitude.'
        }
      ],
      workedExamples: [
        {
          problem: 'In an auditory perception experiment, a student can just detect a pitch change from a $500\\text{ Hz}$ tone when the frequency is adjusted to $515\\text{ Hz}$. (1) What is Weber\'s fraction $k$ for pitch detection? (2) What change in frequency would be required to notice a pitch difference from a $2000\\text{ Hz}$ tone?',
          stepByStepSolution: [
            'Step 1: Calculate $\\Delta I = 515 - 500 = 15\\text{ Hz}$. Baseline intensity $I = 500\\text{ Hz}$.',
            'Step 2: Weber fraction $k = \\frac{\\Delta I}{I} = \\frac{15}{500} = 0.03 = 3\\%$.',
            'Step 3: For $I_{\\text{new}} = 2000\\text{ Hz}$: $\\Delta I_{\\text{new}} = k \\times I_{\\text{new}} = 0.03 \\times 2000 = 60\\text{ Hz}$.',
            'Result: An increase or decrease of at least **$60\\text{ Hz}$** (i.e., reaching $2060\\text{ Hz}$ or $1940\\text{ Hz}$) is required.'
          ],
          shortcutTip: 'Use proportion: $\\frac{\\Delta I_1}{I_1} = \\frac{\\Delta I_2}{I_2} \\implies \\Delta I_2 = \\Delta I_1 \\left(\\frac{I_2}{I_1}\\right)$.'
        }
      ],
      examTraps: [
        'Confusing sensation with perception: Sensation is the passive physiological detection and transduction of raw environmental energy by sensory receptors; Perception is the active cognitive interpretation and meaning-making process in the cerebral cortex.',
        'Confusing sensory adaptation with habituation: Sensory adaptation is a peripheral receptor fatigue effect (e.g., no longer smelling perfume); habituation is a central cognitive learning process of ignoring repetitive, non-threatening stimuli.'
      ],
      keyTakeaways: [
        'Weber\'s law proves perception is relative, not absolute; larger stimuli require proportionally larger changes for detection.',
        'Signal Detection Theory accounts for psychological biases, expectations, and fatigue in perceptual decision-making.'
      ]
    }
  ],

  // Chapter 3: Learning and Theories of Learning
  3: [
    {
      id: 'psyc-extra-c3-sec1',
      heading: '3.4 Masterclass: Classical vs. Operant Conditioning Paradigms & Reinforcement Schedules',
      content: `### 3.4.1 Pavlovian Classical Conditioning (Associative S-S Learning)
Organism associates two stimuli occurring contiguously in time:
- **Unconditioned Stimulus (UCS)**: Stimulus that naturally and automatically triggers an innate reflex without prior learning (e.g., meat powder).
- **Unconditioned Response (UCR)**: The unlearned, reflexive physiological response to the UCS (e.g., salivation).
- **Conditioned Stimulus (CS)**: An originally neutral stimulus (NS) that, through pairing with the UCS, comes to trigger a conditioned response (e.g., bell sound).
- **Conditioned Response (CR)**: The learned response elicited by the CS alone (e.g., salivation to the bell).
- **Five Core Phenomena**:
  1. **Acquisition**: Initial phase where CS and UCS are paired; optimal timing is **forward delay conditioning** (CS precedes UCS by $0.5\\text{ seconds}$).
  2. **Extinction**: Gradual weakening and disappearance of the CR when the CS is repeatedly presented alone without the UCS.
  3. **Spontaneous Recovery**: The reappearance of an extinguished CR after a rest period without any new conditioning trials.
  4. **Stimulus Generalization**: Eliciting the CR to novel stimuli that are physically similar to the original CS (e.g., Little Albert fearing all white furry objects).
  5. **Stimulus Discrimination**: Learning to respond exclusively to the specific CS and not to similar non-paired stimuli.

---

### 3.4.2 Skinnerian Operant Conditioning (Behavior-Consequence Contingency)

| Stimulus Change Contingency | Desired Outcome: **INCREASE Behavior** | Desired Outcome: **DECREASE Behavior** |
| :--- | :--- | :--- |
| **STIMULUS PRESENTED (Added $+)** | **POSITIVE REINFORCEMENT**<br>Add pleasant stimulus following behavior.<br>*(e.g., awarding a scholarship or grade praise for study).* | **POSITIVE PUNISHMENT**<br>Add aversive/unpleasant stimulus following behavior.<br>*(e.g., assigning extra chores or giving a speeding ticket).* |
| **STIMULUS REMOVED (Subtracted $-)** | **NEGATIVE REINFORCEMENT**<br>Remove unpleasant/aversive stimulus.<br>*(e.g., taking an aspirin to remove a headache; buckling seatbelt to stop buzzing).* | **NEGATIVE PUNISHMENT (Penalty)**<br>Remove pleasant/valued stimulus.<br>*(e.g., confiscating a smartphone; revoking driver's license).* |

---

### 3.4.3 The Four Schedules of Partial (Intermittent) Reinforcement

| Schedule Type | Delivery Contingency | Response Rate & Extinction Resistance | Real-World Prototypical Example |
| :--- | :--- | :--- | :--- |
| **Fixed-Ratio (FR)** | Reinforcement delivered after a **fixed number of responses**. | High rate with a brief **post-reinforcement pause** immediately after reinforcement. | Piece-rate pay (paid $100\\text{ Birr}$ for every $5$ baskets woven). |
| **Variable-Ratio (VR)** | Reinforcement delivered after an **unpredictable, varying number of responses** around a mean. | **Extremely high, steady rate of response; highest resistance to extinction!** | Slot machines, lottery tickets, roulette wheels, door-to-door sales. |
| **Fixed-Interval (FI)** | Reinforcement delivered for the first response after a **fixed elapsed time**. | **Scalloped response pattern**: low responding right after reinforcement, surging dramatically as deadline approaches. | Studying frantically the night before scheduled weekly Friday quizzes. |
| **Variable-Interval (VI)**| Reinforcement delivered for the first response after **varying, unpredictable time intervals**. | **Slow, steady, consistent response rate**; high resistance to extinction. | Surprise pop quizzes, checking email or smartphone notifications. |`,
      workedExamples: [
        {
          problem: 'Classify each scenario into Positive Reinforcement, Negative Reinforcement, Positive Punishment, or Negative Punishment: (1) A father takes away his teenage son\'s car keys for two weeks after he came home past curfew; (2) An athlete takes a hot shower to eliminate painful muscle soreness; (3) A professor yells at a student who arrived late to class; (4) An employer awards an end-of-year cash bonus to the top-performing sales agent.',
          stepByStepSolution: [
            '1. Son loses car keys (valued stimulus removed) to decrease late curfew behavior: **Negative Punishment (Response Cost)**.',
            '2. Muscle soreness removed (aversive stimulus subtracted) which increases future hot shower taking: **Negative Reinforcement**.',
            '3. Yelling added (aversive stimulus introduced) to decrease late arrivals: **Positive Punishment**.',
            '4. Cash bonus added (appetitive stimulus presented) to increase sales performance: **Positive Reinforcement**.'
          ],
          shortcutTip: 'Ask: (1) Did behavior increase (reinforcement) or decrease (punishment)? (2) Was a stimulus added (+) or removed (-)?'
        }
      ],
      examTraps: [
        'Confusing negative reinforcement with punishment: Negative reinforcement ALWAYS INCREASES or strengthens behavior by eliminating an unpleasant stimulus (e.g., escaping pain). Punishment ALWAYS DECREASES behavior.',
        'Assuming continuous reinforcement produces the highest resistance to extinction. Partial reinforcement (especially Variable Ratio) produces vastly greater resistance to extinction.'
      ],
      keyTakeaways: [
        'Classical conditioning associates involuntary, reflexive visceral behaviors with antecedent stimuli.',
        'Operant conditioning associates voluntary, emitted behaviors with subsequent environmental consequences.'
      ]
    }
  ],

  // Chapter 4: Memory and Forgetting
  4: [
    {
      id: 'psyc-extra-c4-sec1',
      heading: '4.4 Masterclass: The Multi-Store Memory Architecture & Interference Theories of Forgetting',
      content: `### 4.4.1 Atkinson-Shiffrin Multi-Store Memory Architecture

| Memory Store | Sensory Register | Short-Term Memory (STM) | Long-Term Memory (LTM) |
| :--- | :--- | :--- | :--- |
| **Input / Encoding** | Environmental sensory transduction | Attention and acoustic/verbal coding | Semantic, conceptual, associative networks |
| **Storage Capacity** | Massive / virtually unlimited | **$7 \\pm 2$ chunks** (George Miller) | Theoretically **unlimited** |
| **Storage Duration** | Iconic: $0.25\\text{--}0.5\\text{ s}$; Echoic: $2\\text{--}4\\text{ s}$ | **$18\\text{--}30\\text{ seconds}$** without rehearsal | Minutes to a lifetime |
| **Loss Mechanism** | Sensory decay, neural fading | Displacement by new items, rapid decay | Retrieval failure, interference, consolidation failure |

---

### 4.4.2 Taxonomy of Long-Term Memory (LTM)
Long-term memory branches into two fundamental cognitive systems:
1. **Explicit (Declarative) Memory (Conscious Recall — Medial Temporal Lobe & Hippocampus)**:
   - **Episodic Memory**: Personally experienced autobiographical life events tied to specific times and places (e.g., your first day at university, your high school graduation).
   - **Semantic Memory**: Generalized abstract knowledge, facts, concepts, mathematical rules, and vocabulary detached from personal episode (e.g., knowing that Addis Ababa is the capital of Ethiopia; $E = mc^2$).
2. **Implicit (Non-Declarative) Memory (Unconscious Expression — Cerebellum & Basal Ganglia)**:
   - **Procedural Memory**: Motor skills, automated physical habits, and sensorimotor actions (e.g., riding a bicycle, swimming, typing).
   - **Priming**: Enhanced identification of a stimulus resulting from recent subliminal exposure.
   - **Classical Conditioning**: Learned emotional and autonomic reflexes (e.g., phobias).

---

### 4.4.3 Mechanisms of Forgetting: Proactive vs. Retroactive Interference

$$\\begin{aligned}
\\text{\\textbf{Proactive Interference (Pro = Old interferes forward)}}: &\\quad \\text{OLD Information} \\xrightarrow{\\text{blocks recall of}} \\text{NEW Information} \\\\
\\text{\\textbf{Retroactive Interference (Retro = New interferes backward)}}: &\\quad \\text{NEW Information} \\xrightarrow{\\text{blocks recall of}} \\text{OLD Information}
\\end{aligned}$$

- **Serial Position Effect (Hermann Ebbinghaus)**:
  - **Primacy Effect**: Superior recall of words at the **beginning** of a list (due to opportunity for repetitive rehearsal and transfer into LTM).
  - **Recency Effect**: Superior recall of words at the **end** of a list (items still reside fresh in active STM; eliminated by a $30\\text{-second}$ delay task).`,
      workedExamples: [
        {
          problem: 'Identify whether each forgetting event is caused by Proactive Interference or Retroactive Interference: (1) After changing your smartphone passcode yesterday to a new 6-digit number, you repeatedly catch yourself accidentally typing your old passcode; (2) You study Sociology on Monday and Economics on Tuesday. On Wednesday\'s Sociology exam, you find yourself confusing Sociology terms with newly learned Economics concepts.',
          stepByStepSolution: [
            '1. Old passcode interferes with retrieving the new passcode (Old $\\to$ New): **Proactive Interference**.',
            '2. Newly studied Economics material interferes with retrieving previously learned Sociology material (New $\\to$ Old): **Retroactive Interference**.'
          ],
          shortcutTip: 'Look at what is being RETRIEVED: If you cannot remember the NEW item, it is PROactive (Old blocks New). If you cannot remember the OLD item, it is RETROactive (New blocks Old).'
        }
      ],
      examTraps: [
        'Confusing Retrograde Amnesia with Anterograde Amnesia: Retrograde Amnesia is the inability to recall memories formed BEFORE the brain trauma; Anterograde Amnesia (e.g., Patient H.M.) is the inability to form NEW conscious long-term declarative memories after the trauma.',
        'Believing procedural memory is lost in amnesia: Amnesic patients who lose declarative episodic memory typically retain fully intact procedural motor memory (e.g., mirror drawing).'
      ],
      keyTakeaways: [
        'Chunking meaningfully groups isolated bits of information, effectively multiplying short-term memory capacity.',
        'Elaborative rehearsal (connecting new material meaningfully to existing knowledge) transfers information to LTM far more reliably than maintenance rote repetition.'
      ]
    }
  ],

  // Chapter 5: Motivation and Emotion
  5: [
    {
      id: 'psyc-extra-c5-sec1',
      heading: '5.4 Masterclass: Theoretical Models of Emotion & Kurt Lewin\'s Motivational Conflict Topography',
      content: `### 5.4.1 Comparative Synthesis of the Three Classic Theories of Emotion

| Theory of Emotion | Proponents | Causal Sequence & Core Mechanism | Prototypical Scenario: Encountering a Wild Lion |
| :--- | :--- | :--- | :--- |
| **James-Lange Theory** | William James, Carl Lange | Physiological arousal and bodily changes **PRECEDE** and directly cause the subjective emotion (*"We feel sorry because we cry, angry because we strike, afraid because we tremble"*). | 1. See lion $\\to$ 2. Heart pounds, legs sprint $\\to$ 3. Conscious fear experienced. |
| **Cannon-Bard Theory** | Walter Cannon, Philip Bard | Bodily physiological arousal and emotional experience occur **SIMULTANEOUSLY and INDEPENDENTLY** via thalamic relay to the cortex and autonomic nervous system. | 1. See lion $\\to$ 2. Thalamus routes signals simultaneously $\\to$ Heart races AND Fear is felt at the exact same instant. |
| **Schachter-Singer Two-Factor Theory** | Stanley Schachter, Jerome Singer | Emotion depends on **two factors**: (1) General, undifferentiated physiological arousal, and (2) **Cognitive cognitive labeling / attribution** based on environmental cues. | 1. See lion $\\to$ 2. Heart pounds $\\to$ 3. Brain appraises context: *"This is a dangerous predator"* $\\to$ 4. Emotion labeled as Fear. |

---

### 5.4.2 Yerkes-Dodson Law: Arousal vs. Task Performance
- An inverted-U curve characterizes the relationship between autonomic physiological arousal and performance.
- **Task Difficulty Moderation**:
  - **Simple, automatic, or over-learned tasks**: Peak performance occurs at **relatively high arousal** (adrenaline enhances physical vigor and speed).
  - **Complex, cognitively demanding, or novel tasks**: Peak performance requires **lower-to-moderate arousal**; high anxiety causes cognitive narrowing and working memory overload.

---

### 5.4.3 Kurt Lewin\'s Four Types of Motivational Conflicts
1. **Approach–Approach Conflict**: Choice between two mutually exclusive, equally appealing and attractive goals (e.g., choosing between two dream job offers in Addis Ababa and Hawassa). *Lowest psychological stress*.
2. **Avoidance–Avoidance Conflict**: Choice between two equally repellent, undesirable options (*"caught between the devil and the deep blue sea"*, e.g., enduring chronic toothache vs. painful surgery). *High stress; induces vacillation and paralysis*.
3. **Approach–Avoidance Conflict**: A **single goal** has both strong positive rewards and heavy negative liabilities (e.g., accepting a high-paying executive job that requires moving to an isolated desert station without family).
4. **Multiple Approach–Avoidance Conflict**: Choice between multiple options, each possessing complex mixtures of positive pros and negative cons (e.g., selecting among three university degree programs with different tuition costs, campus locations, and career prestige).`,
      workedExamples: [
        {
          problem: 'A college graduate receives an admission letter to an elite Master\'s program that offers high prestige but charges exorbitant tuition and requires 80 hours of weekly study. Classify this motivational conflict according to Kurt Lewin\'s model.',
          stepByStepSolution: [
            '1. Examine the goal: The applicant is evaluating a **single goal** (the elite Master\'s program).',
            '2. Analyze valences: The program has a positive valence (prestige, career advancement) and negative valences (huge financial debt, grueling hours).',
            '3. Result: A single option with both positive and negative attributes is an **Approach–Avoidance Conflict**.'
          ],
          shortcutTip: 'Count the options and check their valences: Two positive options = Approach-Approach; Two negative options = Avoidance-Avoidance; One mixed option = Approach-Avoidance; Multiple mixed options = Multiple Approach-Avoidance.'
        }
      ],
      examTraps: [
        'Confusing James-Lange with Cannon-Bard: In James-Lange, bodily changes happen first and cause emotion; in Cannon-Bard, bodily changes and emotional experience occur at the exact same time independently.',
        'Assuming high arousal always maximizes exam performance. By the Yerkes-Dodson law, high anxiety degrades performance on complex intellectual exams.'
      ],
      keyTakeaways: [
        'The Schachter-Singer two-factor theory demonstrates that identical physiological states (adrenaline surge) can be experienced as either euphoria or rage depending on cognitive appraisal.',
        'Maslow\'s hierarchy posits that biological deficiency needs (physiological, safety) take priority over psychological growth needs (self-actualization).'
      ]
    }
  ],

  // Chapter 6: Personality
  6: [
    {
      id: 'psyc-extra-c6-sec1',
      heading: '6.4 Masterclass: Freudian Structural Triad, Defense Mechanisms & The Big Five OCEAN Model',
      content: `### 6.4.1 Freud\'s Psychoanalytic Topography of Mind
1. **The Structural Triad**:
   - **Id (Pleasure Principle)**: Entirely unconscious; present from birth; biological instincts, libido, and aggressive drives (*Thanatos*); demands immediate gratification without regard for logic, reality, or morality.
   - **Ego (Reality Principle)**: Emerging in early childhood; conscious and preconscious; executive mediator that balances the unrealistic demands of the Id against the moral constraints of the Superego using realistic problem-solving.
   - **Superego (Morality Principle)**: Internalized moral values, societal conscience, and ego ideal; instills guilt and pride; strives for perfection rather than pleasure or reality.
2. **Freudian Ego Defense Mechanisms**:
   Unconscious strategies employed by the Ego to shield itself from overwhelming anxiety produced by Id–Superego conflicts:
   - **Repression**: The master defense mechanism; forcibly banishing anxiety-provoking memories, impulses, and thoughts from conscious awareness into the unconscious.
   - **Projection**: Attributing one's own unacceptable impulses, flaws, or aggressive desires to other people (*"I don't hate him, he hates me!"*).
   - **Reaction Formation**: Converting an unacceptable impulse into its exact opposite behavioral manifestation (*being excessively polite to someone you despise*).
   - **Displacement**: Redirecting emotional anger or impulses from a threatening, powerful target to a safer, less dangerous substitute (*a clerk yelled at by his boss goes home and kicks the dog*).
   - **Rationalization**: Generating plausible, self-justifying excuses to disguise the real unacceptable reasons for one's failure or behavior (*"I failed the test only because the questions were unfair"*).
   - **Sublimation**: Channeling aggressive or forbidden sexual energy into socially praiseworthy, constructive endeavors (*transforming aggressive impulses into championship boxing or artistic sculpting*). *The healthiest defense mechanism*.
   - **Regression**: Retreating to an immature, infantile behavioral pattern under severe stress (*a college student throwing a toddler-like temper tantrum*).

---

### 6.4.2 The Five-Factor Model of Personality (The Big Five — OCEAN)
Empirically validated across diverse global cultures through factor analysis:

| Trait Dimension | High Scorers (Polar High) | Low Scorers (Polar Low) |
| :--- | :--- | :--- |
| **Openness to Experience (O)** | Creative, curious, imaginative, unconventional, embraces novel ideas. | Pragmatic, conventional, routine-bound, narrow interests. |
| **Conscientiousness (C)** | Organized, self-disciplined, dependable, goal-oriented, punctual. | Impulsive, disorganized, careless, procrastinating, unreliable. |
| **Extraversion (E)** | Outgoing, energetic, assertive, talkative, thrives in social gatherings. | Introverted, reserved, quiet, reflective, enjoys solitude. |
| **Agreeableness (A)** | Empathetic, trusting, cooperative, compassionate, altruistic. | Cynical, suspicious, competitive, aggressive, hostile. |
| **Neuroticism (N)** | Anxious, emotionally unstable, moody, insecure, easily stressed. | Calm, emotionally resilient, even-tempered, secure under pressure. |`,
      workedExamples: [
        {
          problem: 'Identify the specific defense mechanism demonstrated: (1) A smoker who is unable to quit argues that smoking relieves tension, which prevents heart disease, and therefore improves longevity; (2) An envious coworker who is secretly jealous of a colleague\'s promotion accuses that colleague of being arrogant and envious of others.',
          stepByStepSolution: [
            '1. Generating logical-sounding, false self-justifications to reduce anxiety over harmful behavior: **Rationalization**.',
            '2. Unconsciously attributing one\'s own unacceptable envy onto another person: **Projection**.'
          ],
          shortcutTip: 'Sublimation = constructive redirect; Displacement = harmless substitute target; Projection = accusing others of your own hidden flaws.'
        }
      ],
      examTraps: [
        'Confusing Displacement with Projection: In Displacement, you take out your anger on a different, safer target. In Projection, you deny your own feelings and falsely claim that SOMEONE ELSE has those feelings.',
        'Confusing Introversion with Neuroticism: Introverts prefer solitary activities and lower stimulation; they are not inherently anxious or depressed unless they are also high in Neuroticism.'
      ],
      keyTakeaways: [
        'Freud considered Sublimation the most mature defense mechanism because it channels forbidden impulses into societal benefits.',
        'The Big Five traits represent continuous bell-curve spectra, not rigid either/or personality types.'
      ]
    }
  ],

  // Chapter 7: Psychological Disorders and Treatment
  7: [
    {
      id: 'psyc-extra-c7-sec1',
      heading: '7.4 Masterclass: DSM-5 Diagnostic Criteria, Psychopathology Taxonomy & Therapeutic Modalities',
      content: `### 7.4.1 The 4 Ds of Abnormal Psychology
To be diagnosed as a psychological disorder according to the DSM-5, behavior must generally exhibit:
1. **Deviance**: Behavior deviates significantly from statistical norms and cultural standards.
2. **Distress**: The individual experiences subjective suffering, emotional turmoil, or anguish.
3. **Dysfunction**: Maladaptive behavior that impairs daily cognitive, occupational, or social functioning.
4. **Danger**: Posing imminent risk of harm to oneself or to other people.

---

### 7.4.2 Diagnostic Taxonomy of Major Clinical Disorders

| Disorder Category | Specific Diagnoses | Core Symptomatology & Hallmarks | Underlying Etiology |
| :--- | :--- | :--- | :--- |
| **Anxiety Disorders** | **Generalized Anxiety Disorder (GAD)**, **Panic Disorder**, **Agoraphobia**, **Specific Phobias**. | Chronic irrational apprehension, autonomic arousal, recurrent sudden panic attacks, hypervigilance. | GABA deficiency, hyperactive amygdala, classical fear conditioning. |
| **Mood (Affective) Disorders** | **Major Depressive Disorder (MDD)**, **Bipolar I & II Disorders**. | Persistent depressed mood, anhedonia (loss of pleasure), sleep/appetite disruption, suicidal ideation; or cycling mania and depression. | Serotonin/norepinephrine deficit, Beck\'s negative cognitive triad (Self, World, Future), genetic vulnerability. |
| **Schizophrenia Spectrum** | **Schizophrenia**. | **Positive Symptoms**: Hallucinations (auditory common), delusions of grandeur/persecution, disorganized speech.<br>**Negative Symptoms**: Flat affect, alogia (poverty of speech), avolition. | Dopamine hypothesis (hyperactive D2 receptors), enlarged cerebral ventricles, maternal viral infection. |
| **Obsessive-Compulsive Disorder (OCD)**| **OCD**, **Body Dysmorphic Disorder**, **Hoarding**. | **Obsessions** (intrusive, persistent, anxiety-provoking thoughts) paired with **Compulsions** (repetitive ritualized behaviors designed to reduce the anxiety). | Basal ganglia/orbital frontal cortex dysfunction, low serotonin. |

---

### 7.4.3 Major Psychotherapeutic Modalities

| Modality | Core Theoretical Model | Therapeutic Mechanism / Techniques | Target Disorders |
| :--- | :--- | :--- | :--- |
| **Cognitive Behavioral Therapy (CBT)** | Aaron Beck, Albert Ellis (REBT) | Identifying and restructuring **cognitive distortions** (all-or-nothing thinking, catastrophizing) and behavioral exposure. | Depression, generalized anxiety, panic, PTSD, bulimia. |
| **Client-Centered (Humanistic)** | Carl Rogers | Nondirective reflection utilizing **Three Core Conditions**: (1) Unconditional Positive Regard, (2) Empathy, (3) Congruence / Genuineness. | Mild adjustment stress, identity confusion, self-esteem issues. |
| **Psychodynamic Therapy** | Neo-Freudian | Uncovering unconscious childhood conflicts, working through transference and resistance. | Chronic interpersonal relationship patterns, personality conflicts. |
| **Biological / Biomedical** | Pharmacotherapy | Modulating neurotransmitter levels (SSRIs for depression; atypical antipsychotics for schizophrenia). | Severe clinical depression, schizophrenia, bipolar mania. |`,
      workedExamples: [
        {
          problem: 'A 22-year-old university student spends 3 hours every morning repeatedly checking and locking his dormitory door locks 40 consecutive times. He recognizes this behavior is irrational, but skipping it causes unbearable, panic-inducing terror that someone will burglarize his room. Identify: (1) The obsession; (2) The compulsion; (3) The DSM-5 disorder category.',
          stepByStepSolution: [
            '1. Obsession: The persistent, intrusive, anxiety-generating fear that **his room will be burglarized**.',
            '2. Compulsion: The repetitive, ritualistic behavioral act of **checking and locking the door 40 times** to neutralize the anxiety.',
            '3. Category: **Obsessive-Compulsive Disorder (OCD)**.'
          ],
          shortcutTip: 'Obsessions are mental THOUGHTS; Compulsions are motor/mental ACTIONS performed to temporarily relieve obsession-induced panic.'
        }
      ],
      examTraps: [
        'Confusing hallucinations with delusions: Hallucinations are false sensory perceptions in the absence of external physical stimuli (e.g., hearing voices); Delusions are false, fixed, irrational beliefs held despite clear contradictory evidence (e.g., believing you are an emperor).',
        'Confusing negative symptoms with negative reinforcement: Negative symptoms of schizophrenia refer to the ABSENCE or deficit of normal behaviors (lack of emotion, lack of speech).'
      ],
      keyTakeaways: [
        'Beck\'s Cognitive Triad posits that depression is maintained by negative automatic schemas about the Self, the World, and the Future.',
        'CBT has the strongest empirical evidence base for treating clinical depression and anxiety disorders.'
      ]
    }
  ],

  // Chapter 8: Introduction to Life Skills
  8: [
    {
      id: 'psyc-extra-c8-sec1',
      heading: '8.3 Masterclass: The Tri-Domain Life Skills Framework & WHO/UNESCO Core Competencies',
      content: `### 8.3.1 WHO Definition and Taxonomy of Life Skills
According to the **World Health Organization (WHO)**, life skills are:
> *"Abilities for adaptive and positive behavior that enable individuals to deal effectively with the demands and challenges of everyday life."*

The WHO, UNICEF, and UNESCO organize life skills into **three interconnected domains**:
1. **Cognitive Domain (Thinking Skills)**:
   - **Critical Thinking**: Analyzing objective facts, recognizing bias, evaluating arguments, and distinguishing opinion from evidence.
   - **Creative Thinking**: Generating novel, innovative solutions; divergent thinking; synthesizing disparate concepts.
   - **Decision-Making**: Formulating alternatives, weighing risk-reward probabilities, and choosing ethically responsible actions.
   - **Problem-Solving**: Diagnosing systemic bottlenecks, decomposing complex obstacles, and monitoring corrective outcomes.
2. **Social Domain (Interpersonal Skills)**:
   - **Interpersonal Communication**: Verbal and non-verbal transmission of intent, active listening, and clarity.
   - **Assertiveness**: Expressing feelings and claiming rights with calm confidence without aggression.
   - **Empathy**: Cognitive and emotional ability to understand and share the feelings and perspective of another person.
   - **Negotiation and Conflict Resolution**: Constructing win-win compromises through principled bargaining.
3. **Emotional Domain (Coping and Self-Management Skills)**:
   - **Self-Awareness**: Identifying personal strengths, weaknesses, values, triggers, and cognitive blind spots.
   - **Coping with Stress**: Physiological regulation, time planning, exercise, and boundary management.
   - **Coping with Emotions**: Emotional regulation, preventing impulsive anger, and cultivating resilience.`,
      keyTakeaways: [
        'Life skills are not merely theoretical knowledge; they are psychosocial behavioral competencies learned through practice.',
        'Adaptive behavior means an individual can adjust their conduct flexibly to fit shifting situational contexts.'
      ]
    }
  ],

  // Chapter 9: Intra-Personal and Inter-Personal Skills
  9: [
    {
      id: 'psyc-extra-c9-sec1',
      heading: '9.3 Masterclass: Daniel Goleman\'s Emotional Intelligence Model & Active Listening Matrices',
      content: `### 9.3.1 Emotional Intelligence (EQ / EI — Daniel Goleman)
Emotional intelligence predicts life success and leadership effectiveness often more accurately than raw IQ:
1. **Self-Awareness**: Recognizing one\'s own moods, emotions, and their precise effects on others in real time.
2. **Self-Regulation**: The capacity to control or redirect disruptive impulses and moods; suspending premature judgment before acting.
3. **Internal Motivation**: A passion for work that transcends financial compensation or status; striving for personal excellence.
4. **Empathy**: Understanding the emotional makeup of other people; treating people in accordance with their emotional reactions.
5. **Social Skills**: Proficiency in managing relationships, building social networks, and finding common ground.

---

### 9.3.2 Active Listening: The 5-Stage Listening Architecture
1. **Receiving**: Focusing undistracted attention on the speaker\'s auditory words and non-verbal posture (eliminating smartphone distraction).
2. **Understanding**: Decoding the speaker\'s intended meaning without imposing premature subjective filters.
3. **Remembering**: Retaining key facts, thematic thesis, and emotional tone in working memory.
4. **Evaluating**: Assessing message validity only after the speaker has completely finished talking.
5. **Responding**: Providing constructive feedback through verbal paraphrasing (*"What I hear you saying is..."*) and supportive non-verbal cues.`,
      keyTakeaways: [
        'Empathy is distinct from sympathy: Sympathy feels pity for someone from an external vantage; empathy steps into the other person\'s shoes to share their emotional experience.',
        'Active listening requires withholding evaluation until the speaker has fully articulated their thought.'
      ]
    }
  ],

  // Chapter 10: Academic Skills
  10: [
    {
      id: 'psyc-extra-c10-sec1',
      heading: '10.3 Masterclass: The Eisenhower Time Matrix, SQ3R Cognitive System & Test Anxiety Desensitization',
      content: `### 10.3.1 The Eisenhower Priority Matrix (Stephen Covey)
Categorizes daily university tasks along two axes: **Urgency** vs. **Importance**:

| Eisenhower Matrix | **URGENT** (Demands immediate action) | **NOT URGENT** (Can be planned) |
| :--- | :--- | :--- |
| **IMPORTANT** (Directly impacts academic goals) | **QUADRANT I: DO FIRST (Crises)**<br>• Tomorrow's midterm exam.<br>• Assignment due in 2 hours.<br>• Medical emergencies. | **QUADRANT II: SCHEDULE (Mastery)**<br>• Weekly Cornell review.<br>• Deep conceptual reading.<br>• Physical exercise and sleep.<br>*(The Quadrant of Academic Excellence!)* |
| **NOT IMPORTANT** (Low intrinsic value) | **QUADRANT III: DELEGATE / MINIMIZE**<br>• Random peer phone calls.<br>• Minor urgent requests.<br>• Interruptions during study blocks. | **QUADRANT IV: ELIMINATE (Time Wasters)**<br>• Mindless social media doomscrolling.<br>• Excessive gaming.<br>• Binge-watching videos. |

---

### 10.3.2 The SQ3R Deep Reading Method (Francis Robinson)
1. **Survey**: Skim chapter titles, bold subheadings, diagrams, and summary boxes ($5\\text{ minutes}$).
2. **Question**: Turn each heading into an active question (e.g., heading *"Weber's Law"* becomes *"How does Weber's Law calculate JND?"*).
3. **Read**: Read actively seeking the direct answer to your formulated question.
4. **Recite**: Close the text and articulate or write down the answer from memory in your own words.
5. **Review**: Periodically re-test yourself across spaced temporal intervals to arrest forgetting curves.`,
      keyTakeaways: [
        'Top-performing university students spend 70% of their time in Quadrant II (Important, Not Urgent) preventing last-minute panics.',
        'SQ3R replaces passive reading with active retrieval practice, which doubles long-term conceptual retention.'
      ]
    }
  ],

  // Chapter 11: Social Skills and Assertiveness
  11: [
    {
      id: 'psyc-extra-c11-sec1',
      heading: '11.3 Masterclass: Assertiveness Taxonomy, "I"-Statements & Thomas-Kilmann Conflict Modes',
      content: `### 11.3.1 Comparative Taxonomy of Communication Styles

| Dimension | **Passive (Submissive)** | **Aggressive** | **Passive-Aggressive** | **Assertive** |
| :--- | :--- | :--- | :--- | :--- |
| **Core Belief** | *"I don't matter; only your rights count."* | *"Only I matter; your rights are irrelevant."* | *"I will smile now, but sabotage you later."* | *"We both matter; our rights are equal."* |
| **Behavior** | Apologetic, timid, avoids eye contact, silent resentment. | Loud, threatening, interrupts, violates personal space. | Sarcastic, procrastination, silent treatment, backstabbing. | Calm, direct eye contact, honest, respectful, clear posture. |
| **Outcome** | Exploited by others, low self-esteem, internal anxiety. | Provokes hostility, escalates violence, damages trust. | Creates toxic distrust, confusion, unresolved conflict. | Win-win solutions, mutual respect, healthy relationships. |

---

### 11.3.2 Constructing Assertive "I"-Statements (The 4-Part Formula)
Replaces accusatory, inflammatory "You"-blame statements with respectful, de-escalating communication:
$$\\mathbf{I\\text{-Statement Formula}}: \\quad \\text{1. } \\mathbf{\\text{When you } [\\text{objective observable behavior}]} \\implies \\text{2. } \\mathbf{\\text{I feel } [\\text{specific emotion}]} \\implies \\text{3. } \\mathbf{\\text{Because } [\\text{tangible impact/reason}]} \\implies \\text{4. } \\mathbf{\\text{I would prefer / request that } [\\text{concrete actionable change}]}$$
- Aggressive: *"You are an irresponsible partner and you are ruining our project!"*
- Assertive: *"When you submit your portion of the lab report two days late, I feel anxious and overburdened because our group risk losing grading points. I would appreciate it if you could share your draft by Thursday evening."*

---

### 11.3.3 Thomas-Kilmann Conflict Mode Instrument (TKI)
Classifies conflict resolution strategies along **Assertiveness** (satisfying one's own concerns) and **Cooperativeness** (satisfying the other party's concerns):
1. **Competing** (*High Assertiveness, Low Cooperativeness*): Pursuing one's own goal at the expense of the other (Win-Lose).
2. **Accommodating** (*Low Assertiveness, High Cooperativeness*): Neglecting one's own concerns to satisfy the other (Lose-Win).
3. **Avoiding** (*Low Assertiveness, Low Cooperativeness*): Side-stepping or postponing the conflict entirely (Lose-Lose).
4. **Compromising** (*Moderate Assertiveness, Moderate Cooperativeness*): Finding an expedient, mutually acceptable middle ground where both parties make concessions.
5. **Collaborating** (*High Assertiveness, High Cooperativeness*): Working creatively together to dig into root causes and generate an integrative solution that completely satisfies both sets of concerns (**Win-Win**).`,
      workedExamples: [
        {
          problem: 'Transform the following aggressive accusation into a 4-part assertive "I"-statement: "You always borrow my calculator without asking and leave it in the cafeteria, you selfish roommate!"',
          stepByStepSolution: [
            '1. Observable behavior (When you...): "When you take my calculator without asking and leave it behind in the cafeteria..."',
            '2. Emotion (I feel...): "...I feel frustrated and anxious..."',
            '3. Concrete impact (Because...): "...because I need it for my engineering lectures and fear it might get lost."',
            '4. Concrete request (I request...): "...I would appreciate it if you would ask me first before taking it and ensure you return it to my desk immediately after class."'
          ],
          shortcutTip: 'Never say "You make me feel..."; always take personal ownership: "When [X occurs], I feel [Y] because [Z]."'
        }
      ],
      examTraps: [
        'Confusing Assertiveness with Aggressiveness: Aggressiveness attacks the person and violates their rights; Assertiveness defends one\'s own rights while fully honoring and respecting the other person\'s rights.',
        'Confusing Compromising with Collaborating: Compromise splits the difference with mutual sacrifice; Collaboration explores new creative alternatives so neither party has to sacrifice their fundamental needs.'
      ],
      keyTakeaways: [
        'The collaborating conflict resolution style (Win-Win) builds enduring social trust and long-term organizational cohesion.',
        'Four-part "I"-messages minimize defensiveness by focusing on objective behaviors rather than moral character attacks.'
      ]
    }
  ]
};
