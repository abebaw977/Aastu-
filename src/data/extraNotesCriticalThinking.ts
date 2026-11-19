import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for Logic and Critical Thinking (CriticalThinking - 6 Chapters)
 * Preserves all existing notes and adds philosophical branch taxonomy, deduction/induction matrices,
 * informal fallacy identification matrices, Square of Opposition rules, and exam traps for all 6 chapters.
 */
export const EXTRA_NOTES_CRITICAL_THINKING: Record<number, MasterNoteSection[]> = {
  // Chapter 1: Introduction to Philosophy
  1: [
    {
      id: 'crit-extra-c1-sec1',
      heading: '1.4 Masterclass: The Core Branches of Philosophy & Epistemological Stances',
      content: `### 1.4.1 Etymology and the Nature of Philosophy
- Derived from Greek *philein* ("to love") and *sophia* ("wisdom") $\\implies$ *"The Love of Wisdom"*.
- Philosophy is the critical, rational, and systematic examination of the most fundamental questions concerning human existence, knowledge, values, and reality.

---

### 1.4.2 The Four Primary Branches of Philosophy

| Primary Branch | Core Sub-Disciplines | Fundamental Inquiries & Questions |
| :--- | :--- | :--- |
| **1. Metaphysics** | Ontology (study of being), Cosmology (nature of universe), Philosophical Theology. | *"What is reality?", "Does God exist?", "Do human beings possess free will or is everything determined?", "What is the relationship between the mind and the physical body?"* |
| **2. Epistemology** | Rationalism (reason as source), Empiricism (sensory experience as source), Skepticism. | *"What is knowledge?", "How is knowledge acquired?", "What constitutes justified true belief?", "What are the limits of human knowledge?"* |
| **3. Axiology** | • **Ethics (Moral Philosophy)**: Right vs. wrong conduct, virtues, justice.<br>• **Aesthetics**: Nature of beauty, art, and aesthetic taste. | *"What is morally good?", "How should I live?", "What is justice?", "Is beauty an objective property or in the eye of the beholder?"* |
| **4. Logic** | Formal logic, informal logic, symbolic/mathematical logic. | *"What constitutes valid reasoning?", "How do we distinguish correct from incorrect arguments?", "What makes an argument sound?"* |`,
      keyTakeaways: [
        'Philosophy is characterized by its critical method and radical questioning rather than dogmatic acceptance of dogma.',
        'Logic is the foundational instrument (*Organon*) used by all branches of philosophy to evaluate arguments.'
      ]
    }
  ],

  // Chapter 2: Basic Concepts of Logic
  2: [
    {
      id: 'crit-extra-c2-sec1',
      heading: '2.4 Masterclass: Argument Mechanics, Deductive Validity/Soundness & Inductive Strength/Cogency',
      content: `### 2.4.1 Anatomy of an Argument
An **argument** is a group of statements (propositions) in which one or more statements (the **premises**) are claimed to provide evidential or logical support for another statement (the **conclusion**).
- **Premise Indicators**: *Since, because, for, given that, as indicated by, seeing that, in that*.
- **Conclusion Indicators**: *Therefore, thus, hence, consequently, so, it follows that, implies that, as a result*.
- **Non-Arguments**: Statements of belief/opinion, loosely associated statements, reports, warnings, pieces of advice, conditional statements (*if... then*), and **explanations** (which explain *why* an accepted fact occurred, rather than proving *that* it is true).

---

### 2.4.2 Deductive vs. Inductive Arguments: The Two Assessment Hierarchies

$$\\begin{array}{rcccl}
& & \\textbf{DEDUCTIVE ARGUMENT} & & \\\\
& \\swarrow & & \\searrow & \\\\
\\textbf{Valid} & & & & \\textbf{Invalid} \\\\
(\\text{Impossible for premises } T \\text{ and conclusion } F) & & & & (\\text{Conclusion can be } F \\text{ even if premises } T) \\\\
\\swarrow \\quad \\searrow & & & & \\\\
\\textbf{Sound} \\quad \\textbf{Unsound} & & & & \\textbf{All Invalid are UNSOUND} \\\\
(\\text{Valid } + \\text{ ALL true premises}) & & & & \\\\
\\hline \\hline
& & \\textbf{INDUCTIVE ARGUMENT} & & \\\\
& \\swarrow & & \\searrow & \\\\
\\textbf{Strong} & & & & \\textbf{Weak} \\\\
(\\text{Improbable for conclusion to be } F \\text{ if premises } T) & & & & (\\text{Premises do not make conclusion probable}) \\\\
\\swarrow \\quad \\searrow & & & & \\\\
\\textbf{Cogent} \\quad \\textbf{Uncogent} & & & & \\textbf{All Weak are UNCOGENT} \\\\
(\\text{Strong } + \\text{ ALL true premises}) & & & &
\\end{array}$$`,
      workedExamples: [
        {
          problem: 'Evaluate the validity and soundness of: "Premise 1: All mammals are warm-blooded animals. Premise 2: All whales are mammals. Conclusion: Therefore, all whales are warm-blooded animals."',
          stepByStepSolution: [
            'Step 1 (Check Validity): Assume both premises are true. If all mammals are warm-blooded, and all whales belong to mammals, it is strictly logically impossible for whales not to be warm-blooded. Thus, the argument is **VALID**.',
            'Step 2 (Check Factual Truth of Premises): Premise 1 is factually true in biology. Premise 2 is factually true in biology.',
            'Step 3 (Determine Soundness): A valid deductive argument with all factually true premises is **SOUND**.'
          ],
          shortcutTip: 'Soundness = Validity + All True Premises. If an argument is invalid, it is automatically unsound!'
        }
      ],
      examTraps: [
        'Confusing validity with truth: Validity is a structural relationship between premises and conclusion; an argument can be valid even if its premises are completely false (e.g., "All cats have 8 legs. All frogs are cats. $\\implies$ All frogs have 8 legs" is structurally VALID, but UNSOUND).',
        'Confusing an argument with a conditional statement: "If you study hard, you will pass" is a SINGLE statement, not an argument (it lacks premises asserting evidence).'
      ],
      keyTakeaways: [
        'Deductive arguments claim that the conclusion follows with strict necessity; inductive arguments claim probability.',
        'A sound argument guarantees with 100% certainty that its conclusion is true in reality.'
      ]
    }
  ],

  // Chapter 3: Logic and Language
  3: [
    {
      id: 'crit-extra-c3-sec1',
      heading: '3.4 Masterclass: Cognitive vs. Emotive Language & The Five Types of Definitions',
      content: `### 3.4.1 Functions of Language & Meaning of Terms
1. **Cognitive (Informative) Meaning**: Conveying factual information, descriptions, and logical assertions.
2. **Emotive Meaning**: Evoking subjective feelings, attitudes, and emotional values (e.g., loaded words like *bureaucrat* vs. *public servant*).
3. **Intensional (Connotative) Meaning**: The intrinsic qualities, attributes, or characteristics that define a term.
4. **Extensional (Denotative) Meaning**: The specific physical members, objects, or class instances to which the term refers in the real world.

---

### 3.4.2 The Five Types of Definitions

| Definition Type | Primary Communicative Purpose | Key Operational Characteristics |
| :--- | :--- | :--- |
| **1. Stipulative Definition** | Assigns an entirely new meaning to a brand new word or symbol. | Cannot be judged true or false; creates new jargon (*"selfie"*, *"byte"*). |
| **2. Lexical Definition** | Reports the conventional meaning a word already has in a linguistic dictionary. | Can be verified as true or false based on actual dictionary usage. |
| **3. Precising Definition** | Reduces the vagueness of an existing word for specific legal or scientific application. | Avoids borderline ambiguity (e.g., legally defining *"blindness"* as visual acuity $< 20/200$). |
| **4. Theoretical Definition** | Connects a term to a comprehensive scientific or philosophical theory. | Explains underlying reality (e.g., defining *"light"* as electromagnetic radiation). |
| **5. Persuasive Definition** | Influences emotional attitudes and prejudices under the guise of an objective definition. | Uses highly charged emotive terminology (e.g., defining *"abortion"* as *"murder of an innocent unborn baby"*). |`,
      keyTakeaways: [
        'Vague terms have blurred boundary cases; ambiguous terms have multiple distinct interpretations.',
        'A definition by genus and difference specifies the broader category (genus) and the distinguishing trait (difference).'
      ]
    }
  ],

  // Chapter 4: Basic Concepts of Critical Thinking
  4: [
    {
      id: 'crit-extra-c4-sec1',
      heading: '4.4 Masterclass: The Eight Intellectual Standards of Critical Thinking & Cognitive Barriers',
      content: `### 4.4.1 Paul & Elder\'s Eight Universal Intellectual Standards
1. **Clarity**: The gateway standard; statements must be understandable and unambiguous.
2. **Accuracy**: Free from factual errors, distortions, or false data.
3. **Precision**: Giving specific, exact details rather than vague approximations.
4. **Relevance**: Directly connected to and bearing upon the matter at hand.
5. **Depth**: Addressing the complexities and underlying root causes of the issue.
6. **Breadth**: Considering alternative viewpoints, stakeholder perspectives, and counterarguments.
7. **Logic**: Mutually supporting premises where conclusions follow without contradiction.
8. **Fairness**: Open-minded, empathetic, and free from self-serving vested bias.

---

### 4.4.2 The Major Psychological Barriers to Critical Thinking
- **Egocentrism**: Self-centered thinking:
  - *Self-Serving Bias*: Tendency to overrate one's own virtues and blame external factors for failures.
  - *Superiority Illusion*: Believing one is inherently smarter or more ethical than peers.
- **Sociocentrism (Group-Serving Bias)**:
  - *Ethnocentrism & Group Bias*: Viewing one's own clan, ethnic group, religion, or country as superior.
  - *Conformism*: Unthinkingly adopting the beliefs of the majority out of fear of social rejection.
- **Relativistic Thinking**:
  - *Subjectivism*: Believing truth is purely a matter of personal opinion (*"what is true for you is true for you"*).
  - *Cultural Relativism*: Believing truth is determined solely by cultural consensus.`,
      keyTakeaways: [
        'Critical thinking is disciplined, self-directed, self-monitored, and self-corrective thinking.',
        'Sociocentric conformism and groupthink represent the most common institutional enemies of critical thinking.'
      ]
    }
  ],

  // Chapter 5: Informal Fallacies
  5: [
    {
      id: 'crit-extra-c5-sec1',
      heading: '5.4 Masterclass: The Taxonomy of Informal Fallacies Matrix & Real-World Diagnostic Triggers',
      content: `### 5.5.1 Comprehensive Matrix of the Most Tested Informal Fallacies

| Fallacy Name | Latin Designation | Psychological Trick & Flawed Reasoning Pattern | Canonical Example |
| :--- | :--- | :--- | :--- |
| **Appeal to Force** | *Argumentum ad Baculum* | Threatening physical, financial, or political harm to force agreement. | *"Accept my proposal or I will have your department budget slashed."* |
| **Appeal to Pity** | *Argumentum ad Misericordiam* | Evoking sympathy or compassion to substitute for logical evidence. | *"Professor, give me an A; my grandmother was sick and I was crying."* |
| **Appeal to People (Bandwagon)**| *Argumentum ad Populum* | Urging acceptance because "everyone else believes or does it". | *"Buy Brand X smartphones; over 10 million Ethiopians can't be wrong!"* |
| **Ad Hominem (Abusive)** | *Argumentum ad Hominem* | Attacking the opponent's personal character rather than their argument. | *"His tax proposal is garbage because he is an arrogant drunkard."* |
| **Ad Hominem (Tu Quoque)** | *Tu Quoque ("You too")* | Accusing the opponent of hypocrisy instead of refuting the claim. | *"Doctor, how can you tell me to quit smoking when you smoke yourself?"* |
| **Straw Man** | — | Distorting, exaggerating, or misrepresenting an opponent's argument to easily attack it. | *"She wants to allocate more money to library books; she wants to bankrupt the university!"* |
| **Red Herring** | — | Introducing an irrelevant topic to divert attention away from the original issue. | *"Why worry about climate change when our university dormitories need new paint?"* |
| **Hasty Generalization** | *Converse Accident* | Drawing a universal conclusion from an unrepresentative or tiny sample. | *"I met two rude taxi drivers in town; all taxi drivers here are dishonest!"* |
| **False Cause (Post Hoc)** | *Post hoc ergo propter hoc* | Assuming that because event $Y$ followed event $X$, event $X$ caused $Y$. | *"A black cat crossed my path this morning, and an hour later I failed my exam!"* |
| **Slippery Slope** | — | Claiming without evidence that a minor first step will inevitably trigger a chain reaction of catastrophes. | *"If we let students use calculators today, tomorrow they won't know how to count to ten."* |
| **Begging the Question** | *Petitio Principii* | Circular reasoning; assuming as a premise the very conclusion to be proved. | *"The Bible is the infallible word of God because God says so in the Bible."* |
| **False Dichotomy** | *Either/Or Fallacy* | Presenting two extreme alternatives as the only choices when intermediate options exist. | *"Either you support our political party unconditionally, or you are a traitor to the country."* |`,
      keyTakeaways: [
        'An ad hominem tu quoque fallacy deflects criticism by calling the opponent a hypocrite without addressing the argument\'s merits.',
        'Straw man distorts the opponent\'s argument; Red herring abandons the argument entirely to talk about something else.'
      ]
    }
  ],

  // Chapter 6: Categorical Propositions
  6: [
    {
      id: 'crit-extra-c6-sec1',
      heading: '6.4 Masterclass: The Four Standard Categorical Propositions & The Traditional Square of Opposition',
      content: `### 6.4.1 The Four Standard Forms of Categorical Propositions

| Letter Code | Proposition Form | Quantity | Quality | Distributed Terms | Venn Diagram Representation |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **A** | **All $S$ are $P$** | Universal | Affirmative | **Subject ($S$) only** | Area 1 (outside $P$) shaded. |
| **E** | **No $S$ are $P$** | Universal | Negative | **Both Subject ($S$) and Predicate ($P$)** | Area 2 (overlap $S \\cap P$) shaded. |
| **I** | **Some $S$ are $P$** | Particular | Affirmative | **Neither $S$ nor $P$** | An $\\mathbf{X}$ placed in overlap Area 2. |
| **O** | **Some $S$ are not $P$**| Particular | Negative | **Predicate ($P$) only** | An $\\mathbf{X}$ placed in Area 1 ($S$ outside $P$). |

- **Distribution Mnemonic**: **"Unconditionally Distributed: $A$ distributes Subject, $E$ distributes Both, $I$ distributes Neither, $O$ distributes Predicate"** — **ASEBINOP**.

---

### 6.4.2 The Traditional (Aristotelian) Square of Opposition
Assumes existential import for universal propositions:
1. **Contradictories ($A \\leftrightarrow O$ and $E \\leftrightarrow I$)**:
   - Exactly **opposite truth values**: If one is True, the other MUST be False; they cannot both be true and cannot both be false simultaneously.
2. **Contraries ($A \\leftrightarrow E$)**:
   - At least one must be false: They **cannot both be true**, but they **can both be false**.
3. **Subcontraries ($I \\leftrightarrow O$)**:
   - At least one must be true: They **cannot both be false**, but they **can both be true**.
4. **Subalternation ($A \\to I$ and $E \\to O$)**:
   - **Truth trickles down**: If Universal is True, Particular is True ($A=T \\implies I=T$; $E=T \\implies O=T$).
   - **Falsity floats up**: If Particular is False, Universal is False ($I=F \\implies A=F$; $O=F \\implies E=F$).`,
      workedExamples: [
        {
          problem: 'Assuming the proposition "All philosophers are critical thinkers" ($A$) is FALSE, what can be deduced about: (1) "Some philosophers are not critical thinkers" ($O$); (2) "No philosophers are critical thinkers" ($E$); (3) "Some philosophers are critical thinkers" ($I$)?',
          stepByStepSolution: [
            '1. Proposition $A$ and $O$ are Contradictories: If $A$ is False, then $O$ MUST BE **TRUE**.',
            '2. Proposition $A$ and $E$ are Contraries: They cannot both be true, but they CAN both be false. Since $A$ is False, $E$ is **UNDETERMINED**.',
            '3. Proposition $I$ is the subaltern of $A$: Falsity does not trickle down; therefore, $I$ is **UNDETERMINED**.'
          ],
          shortcutTip: 'Contradictories (diagonals) always give an immediate definite truth value: T becomes F, and F becomes T!'
        }
      ],
      keyTakeaways: [
        'Universal propositions distribute their subject terms; Negative propositions distribute their predicate terms.',
        'Contradictory pairs ($A-O$ and $E-I$) are polar opposites that can never share the same truth value.'
      ]
    }
  ]
};
