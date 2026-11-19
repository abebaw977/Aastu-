import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for Communicative English Skills I (English1 - 5 Units)
 * Preserves all existing notes and adds academic grammar rules, formal discourse structures,
 * syntactic transformation tables, and exam traps for all 5 units.
 */
export const EXTRA_NOTES_ENGLISH1: Record<number, MasterNoteSection[]> = {
  // Unit 1: Study Skills
  1: [
    {
      id: 'eng1-extra-u1-sec1',
      heading: '1.8 Masterclass: Cornell Note-Taking System, Modals of Advice Nuances & Tense Contrasts',
      content: `### 1.8.1 The Cornell Note-Taking System Mechanics
Developed by Walter Pauk at Cornell University, this system optimizes lecture retention and revision efficiency:
1. **The Page Layout (Three Distinct Zones)**:
   - **Cue / Recall Column (Left $2.5\\text{ inches}$)**: Questions, keywords, formula names, exam alerts written *after* the lecture.
   - **Notes Column (Right $6\\text{ inches}$)**: Telegraphic sentences, headings, abbreviations, diagrams recorded *during* the lecture.
   - **Summary Area (Bottom $2\\text{ inches}$)**: $2$ to $4$ sentences capturing the core thesis of the page.
2. **The 5 R's of Note-Taking**:
   - **Record**: Write meaningful facts and ideas during class.
   - **Reduce**: Summarize facts into concise keywords in the Cue Column.
   - **Recite**: Cover the Notes Column and articulate concepts aloud using only the cues.
   - **Reflect**: Connect lecture concepts to personal experiences and other subjects.
   - **Review**: Spend $10$ to $15$ minutes weekly reviewing old cues to prevent the Ebbinghaus forgetting curve.

---

### 1.8.2 Degrees of Forcefulness in Modals for Giving Advice

| Modal / Expression | Degree of Strength | Pragmatic Nuance | Syntactic Structure | Example in Academic Context |
| :--- | :--- | :--- | :--- | :--- |
| **Should** | Standard / Polite Advice | Subjective opinion; speaker thinks it is a good idea | $\\text{Subject} + \\text{should} + V_1$ | *"You should review your chemistry notes before tomorrow's quiz."* |
| **Ought to** | Moral / Objective Duty | Based on rules, ethical norms, or standard university protocol | $\\text{Subject} + \\text{ought to} + V_1$ | *"Students ought to cite external sources to prevent plagiarism."* |
| **Had better** | Urgent / Warning | Implies negative consequences if the advice is ignored | $\\text{Subject} + \\text{had better} + V_1$ | *"You had better submit the assignment today, or you will receive zero."* |
| **Why don't you...?** | Friendly Suggestion | Collaborative brainstorming | $\\text{Why don't you} + V_1 \\dots?$ | *"Why don't you ask the lab assistant for clarification?"* |

---

### 1.8.3 Present Perfect vs. Past Simple: Diagnostic Matrix

| Parameter | Past Simple | Present Perfect |
| :--- | :--- | :--- |
| **Action Time** | Finished action in a **finished** time period | Action occurred at an **unspecified** time or an **unfinished** period |
| **Current Relevance** | Detached from the present; purely historical | Connected to the present; direct impact on current reality |
| **Temporal Adverbs** | *yesterday, in 2020, last week, 3 days ago, when I was in high school* | *already, yet, just, ever, never, since 2022, for 3 years, recently, so far* |
| **Example Pair** | *"Dr. Aklilu Lemma **died** in 1997."* (Finished life/time) | *"Scientists **have developed** new vaccines."* (Affects modern medicine) |`,
      keyTakeaways: [
        'The Cornell system partitions notes into Cue Column (left), Notes Column (right), and Summary (bottom).',
        '"Had better" carries an implicit threat of negative consequence; "ought to" implies moral duty; "should" is general advice.',
        'Past Simple requires a finished time marker; Present Perfect links past occurrences to present relevance.',
      ],
      examTraps: [
        'Exam Trap: Writing "had better to go". "Had better" is followed by a BARE INFINITIVE without "to"!',
        'Exam Trap: Using Present Perfect with specific past time indicators (e.g., "I have seen him yesterday" is grammatically incorrect; use "I saw him yesterday").',
      ],
    },
  ],

  // Unit 2: Health and Fitness
  2: [
    {
      id: 'eng1-extra-u2-sec1',
      heading: '2.8 Masterclass: The Complete Conditional Hierarchy, Mixed Conditionals & Context Clue Strategies',
      content: `### 2.8.1 The Complete Hierarchy of English Conditionals

| Type | Name / Meaning | If-Clause Tense | Main Clause Verb Form | Example |
| :--- | :--- | :--- | :--- | :--- |
| **Type 0** | Universal Truth / Scientific Fact | Simple Present | Simple Present | *If you heat water to $100^\\circ\\text{C}$, it boils.* |
| **Type 1** | Real / Probable Future | Simple Present | $\\text{will / can / may} + V_1$ | *If you exercise regularly, your cardiovascular health will improve.* |
| **Type 2** | Hypothetical / Unreal Present | Simple Past (\`were\` for all subjects) | $\\text{would / could / might} + V_1$ | *If I were the Minister of Health, I would build more community clinics.* |
| **Type 3** | Counterfactual Past (Regret) | Past Perfect (\`had\` $+ V_3$) | $\\text{would have} + V_3$ | *If she had trained consistently, she would have won the Olympic marathon.* |
| **Mixed** | Past Action $\\to$ Present State | Past Perfect | $\\text{would} + V_1$ | *If he had not injured his knee in 2021, he would be playing for the team today.* |

---

### 2.8.2 Advanced Inversion in Formal Conditional Structures
In formal academic writing, the conjunction *"if"* can be omitted via syntactic subject-auxiliary inversion:
1. **Type 1 Inversion**:
   - Standard: *"If you should encounter any complications, consult the physician."*
   - Inverted: *"**Should you encounter** any complications, consult the physician."*
2. **Type 2 Inversion**:
   - Standard: *"If the athlete were here, he would explain the strategy."*
   - Inverted: *"**Were the athlete here**, he would explain the strategy."*
3. **Type 3 Inversion**:
   - Standard: *"If the doctors had detected the disease early, they could have cured it."*
   - Inverted: *"**Had the doctors detected** the disease early, they could have cured it."*

---

### 2.8.3 The 5 Core Context Clue Types for Unfamiliar Vocabulary
1. **Definition / Explanation Clue**: The author directly defines the term using commas, parentheses, or phrases like *is defined as, that is, or*.
   - *Example*: *"Sedentary lifestyle, that is, spending most of the day sitting with little or no physical activity, increases cardiac risk."*
2. **Synonym / Restatement Clue**: Another word with similar meaning is used nearby.
   - *Example*: *"The athlete felt fatigued; his severe exhaustion caused him to collapse at the finish line."*
3. **Antonym / Contrast Clue**: Clue words like *however, unlike, on the other hand, whereas, but* signal an opposite meaning.
   - *Example*: *"While aerobic exercise was invigorating for Senait, sedentary isolation proved detrimental to her mood."*
4. **Example Clue**: Illustrative examples (*such as, including, for instance*) reveal meaning.
   - *Example*: *"Nutrient-dense foods, such as spinach, almonds, and lentils, provide vital micronutrients."*
5. **Inference / General Context Clue**: The overall paragraph context enables deductive meaning extraction.`,
      keyTakeaways: [
        'Type 2 conditionals use "were" for all subjects in standard formal English.',
        'Formal inversion replaces "If had..." with "Had + subject + past participle...".',
        'Context clues include Definition, Synonym, Contrast, Example, and General Inference.',
      ],
      examTraps: [
        'Exam Trap: Writing "If I would have studied..." in the if-clause. "Would have" belongs strictly in the main clause, NEVER in the if-clause!',
      ],
    },
  ],

  // Unit 3: Cultural Values
  3: [
    {
      id: 'eng1-extra-u3-sec1',
      heading: '3.8 Masterclass: Narrative Discourse Tenses, Complex Aspectual Contrasts & Cohesive Devices',
      content: `### 3.8.1 Narrative Tenses in Academic and Cultural Discourse
When recounting historical ethnography, folklore, or sociological field observations, academic writers orchestrate four primary tenses:
1. **Past Simple**: Carries the main chronological backbone of sequential events.
   - *"The elders assembled at the sacred sycamore tree and commenced the mediation ceremony."*
2. **Past Continuous (Past Progressive)**: Establishes ongoing background setting or simultaneous backdrop actions.
   - *"While the villagers were celebrating the harvest, the delegates arrived."*
3. **Past Perfect Simple**: Establishes anteriority (an event that took place *before* another past event).
   - *"Before the modern court system was introduced, local communities had resolved disputes through Shimgilina for centuries."*
4. **Past Perfect Continuous**: Emphasizes duration of an action leading up to a specific past milestone.
   - *"The anthropologist had been researching the Mursi lip-plate customs for three years before publishing her monograph."*

---

### 3.8.2 Cohesion and Coherence in Academic Essay Writing
- **Additive Transitions**: *Furthermore, moreover, in addition, additionally, not only... but also*.
- **Adversative / Contrastive Transitions**: *However, nevertheless, nonetheless, in contrast, whereas, conversely*.
- **Causal / Result Transitions**: *Consequently, as a result, therefore, thus, hence, accordingly*.
- **Exemplifying Transitions**: *For instance, specifically, to illustrate, notably*.`,
      keyTakeaways: [
        'Past Perfect establishes priority of events (the earlier of two past actions).',
        'Cohesive devices ensure logical transitions between body paragraphs in academic writing.',
      ],
      examTraps: [
        'Exam Trap: Overusing Past Perfect for all past events. Only use Past Perfect when it is necessary to clarify that one past event preceded another past event!',
      ],
    },
  ],

  // Unit 4: Wild Animals
  4: [
    {
      id: 'eng1-extra-u4-sec1',
      heading: '4.8 Masterclass: Denotation vs. Connotation, Semantic Prosody & Euphemisms in Ecological Writing',
      content: `### 4.8.1 Denotative vs. Connotative Meaning
- **Denotation**: The objective, literal, dictionary definition of a word devoid of emotional resonance.
- **Connotation**: The subjective, socio-cultural, and emotional associations evoked by a word.

#### Connotation Spectrum Table

| Denotation (Literal Meaning) | Positive Connotation | Neutral Term | Negative / Pejorative Connotation |
| :--- | :--- | :--- | :--- |
| Careful with financial spending | **Thrifty / Economical** | Budget-conscious | **Miserly / Stingy / Cheap** |
| Strong, resolute determination | **Steadfast / Dedicated** | Determined | **Stubborn / Pig-headed / Obstinate** |
| Below average body weight | **Slender / Svelte** | Thin | **Skinny / Scrawny / Emaciated** |
| Young, developing person | **Youthful / Spirited** | Adolescent | **Childish / Immature / Juvenile** |
| Rare, uncommon characteristic | **Unique / Distinctive** | Unusual | **Bizarre / Weird / Peculiar** |

---

### 4.8.2 Semantic Prosody in Academic Environmental Reports
- Certain words typically keep company with either positive or negative environments:
  - *Cause, plague, trigger, exacerbate*: Keep company with negative outcomes (*"Climate change triggers drought"*).
  - *Foster, promote, facilitate, cultivate*: Keep company with positive outcomes (*"Conservation fosters biodiversity"*).`,
      keyTakeaways: [
        'Denotation is literal dictionary meaning; connotation involves emotional and cultural overtones.',
        'Academic writers select words carefully to avoid unintended negative bias or emotional distortion.',
      ],
      examTraps: [
        'Exam Trap: Treating synonyms as completely interchangeable. "Slender" and "scrawny" have identical denotations but opposite connotations!',
      ],
    },
  ],

  // Unit 5: Population
  5: [
    {
      id: 'eng1-extra-u5-sec1',
      heading: '5.8 Masterclass: Passive Voice Across All Tenses, Impersonal Passive & Demographic Collocations',
      content: `### 5.8.1 Master Transformation Table: Active to Passive Voice

| Tense | Active Voice Form | Passive Voice Form | Example Active $\\to$ Passive |
| :--- | :--- | :--- | :--- |
| **Present Simple** | $S + V_1(s/es) + O$ | $S + \\text{am/is/are} + V_3 + (\\text{by } O)$ | *Government conducts census $\\to$ Census **is conducted** by government.* |
| **Present Continuous** | $S + \\text{am/is/are} + V_{ing} + O$ | $S + \\text{am/is/are} + \\text{being} + V_3$ | *They are surveying cities $\\to$ Cities **are being surveyed**.* |
| **Past Simple** | $S + V_2 + O$ | $S + \\text{was/were} + V_3$ | *Demographers analyzed data $\\to$ Data **were analyzed**.* |
| **Past Continuous** | $S + \\text{was/were} + V_{ing} + O$ | $S + \\text{was/were} + \\text{being} + V_3$ | *Planners were mapping zones $\\to$ Zones **were being mapped**.* |
| **Present Perfect** | $S + \\text{have/has} + V_3 + O$ | $S + \\text{have/has} + \\text{been} + V_3$ | *Ethiopia has built new roads $\\to$ New roads **have been built**.* |
| **Past Perfect** | $S + \\text{had} + V_3 + O$ | $S + \\text{had} + \\text{been} + V_3$ | *They had counted migrants $\\to$ Migrants **had been counted**.* |
| **Future Simple** | $S + \\text{will} + V_1 + O$ | $S + \\text{will} + \\text{be} + V_3$ | *Agencies will release reports $\\to$ Reports **will be released**.* |
| **Modal Verbs** | $S + \\text{modal} + V_1 + O$ | $S + \\text{modal} + \\text{be} + V_3$ | *We must protect forests $\\to$ Forests **must be protected**.* |

---

### 5.8.2 The Impersonal Passive in Academic Research
Used to report opinions, rumors, or scientific findings without attributing them to a specific individual:
- **Formula 1**: $\\text{It} + \\text{is} + [\\text{believed / reported / hypothesized / argued}] + \\text{that} + \\text{clause}$
  - *"It is widely believed that rapid urbanization strains municipal infrastructure."*
- **Formula 2**: $\\text{Subject} + \\text{is} + [\\text{said / reported / expected}] + \\text{to} + \\text{infinitive}$
  - *"The national population is projected to exceed $150\\text{ million}$ by 2035."*`,
      keyTakeaways: [
        'Passive voice places the thematic emphasis on the recipient of the action or the result.',
        'Continuous tenses require "being" in the passive; perfect tenses require "been".',
        'Impersonal passive structures ("It is estimated that...") provide academic objectivity.',
      ],
      examTraps: [
        'Exam Trap: Forgetting "being" in continuous passive sentences (e.g., "The census is conducted now" instead of "The census is being conducted now").',
      ],
    },
  ],
};
