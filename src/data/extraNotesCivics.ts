import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for Moral and Civic Education (Civics - 5 Chapters)
 * Preserves all existing notes and adds philosophical ethics matrices, Kohlberg's moral stages,
 * constitutional governance structures, human rights generations, and exam traps for all 5 chapters.
 */
export const EXTRA_NOTES_CIVICS: Record<number, MasterNoteSection[]> = {
  // Chapter 1: Understanding Civics and Ethics
  1: [
    {
      id: 'civ-extra-c1-sec1',
      heading: '1.4 Masterclass: Epistemological Foundations of Civics & The Triad of Morality, Ethics, and Law',
      content: `### 1.4.1 Distinguishing Morality, Ethics, and Law
- **Morality**: The set of informal, socially transmitted beliefs, values, and customs regarding right and wrong behavior internalized by individuals from family, religion, and culture.
- **Ethics (Moral Philosophy)**: The systematic, rational, and philosophical investigation of morality—critically examining, defining, and defending concepts of right and wrong conduct.
- **Law**: The formal, codified rules enacted by sovereign legislative state authority, backed by coercive physical enforcement and legal penalties.

| Comparative Dimension | Morality | Ethics | Law |
| :--- | :--- | :--- | :--- |
| **Origin / Source** | Religious traditions, cultural norms, familial socialization. | Philosophical inquiry, critical human reason, academic discourse. | Sovereign state legislation, judicial precedent, constitution. |
| **Scope** | Internal conscience and personal character. | Professional codes, philosophical theories, universal duties. | External observable actions and public conduct. |
| **Enforcement Mechanism** | Guilt, remorse, social shame, community ostracism. | Peer censure, professional license revocation, moral rebuke. | Fines, incarceration, property seizure, state police force. |
| **Relationship Example** | Cheating on a spouse is immoral, but not necessarily a criminal offense. | Whistleblowing on corruption may be illegal under corporate contracts, but highly ethical. | Apartheid laws in South Africa were formally legal, but profoundly immoral and unethical. |

---

### 1.4.2 Core Competencies of Democratic Civic Education
1. **Civic Knowledge**: Understanding constitutional structures, separation of powers, voting procedures, and public policy formulation.
2. **Civic Skills**: Intellectual capacity to critically evaluate public arguments, negotiate political consensus, and peacefully resolve community disputes.
3. **Civic Dispositions**: Internalized virtues essential for constitutional democracy: tolerance, political efficacy, patriotism, respect for rule of law, and active civic participation.`,
      keyTakeaways: [
        'An action can be legal but unethical (e.g., predatory usury), or illegal but ethical (e.g., sheltering innocent refugees during unjust crackdowns).',
        'Civic education transforms passive subjects into autonomous, proactive democratic citizens.'
      ]
    }
  ],

  // Chapter 2: Approaches to Ethics
  2: [
    {
      id: 'civ-extra-c2-sec1',
      heading: '2.4 Masterclass: The Triad of Normative Ethical Theories: Deontology, Teleology & Virtue Ethics',
      content: `### 2.4.1 Comparative Matrix of the Three Major Normative Ethical Frameworks

| Normative Theory | Foundational Thinkers | Core Moral Criterion | Decision Rule & Slogan | Critical Limitation / Dilemma |
| :--- | :--- | :--- | :--- | :--- |
| **Deontology (Duty-Based)** | **Immanuel Kant** | The **intrinsic nature of the act itself** and adherence to universal moral duty, irrespective of outcomes. | **Categorical Imperative**: Act only on maxims you can will to become universal laws. Treat humans as ends, never as mere means. | Rigid inflexibility; cannot resolve conflicting absolute duties (e.g., lying to an axe-murderer to save an innocent life). |
| **Teleology / Consequentialism** | **Jeremy Bentham, John Stuart Mill** | The **net consequences or outcomes** produced by the action. | **Principle of Utility**: Produce the greatest happiness/good for the greatest number of sentient beings. | May justify tyrannizing or sacrificing an innocent minority to maximize overall majority pleasure. |
| **Virtue Ethics (Character-Based)** | **Aristotle, Confucius** | The **moral character and flourishing (*Eudaimonia*)** of the moral agent. | **The Golden Mean**: Virtue is the desirable middle state between the extremes of deficiency and excess. | Vague and subjective; fails to provide concrete action-guidance in complex moral dilemmas. |

---

### 2.4.2 Aristotle\'s Doctrine of the Mean (The Golden Mean)

$$\\begin{array}{l|c|r}
\\textbf{Vice of Deficiency} & \\textbf{Virtuous Mean (The Golden Mean)} & \\textbf{Vice of Excess} \\\\ \\hline
\\text{Cowardice (excessive fear)} & \\textbf{Courage} & \\text{Rashness / Recklessness} \\\\
\\text{Insensibility (lack of pleasure)} & \\textbf{Temperance / Moderation} & \\text{Self-Indulgence / Hedonism} \\\\
\\text{Stinginess / Miserliness} & \\textbf{Generosity / Liberality} & \\text{Extravagance / Wastefulness} \\\\
\\text{Self-Deprecation / Timidity} & \\textbf{Truthfulness / Honest Pride} & \\text{Boastfulness / Arrogance} \\\\
\\text{Apathy / Sluggishness} & \\textbf{Ambition / Proper Drive} & \\text{Greed / Ruthlessness}
\\end{array}$$`,
      keyTakeaways: [
        'Kant\'s Categorical Imperative forbids using any human being merely as an instrumental tool to achieve a goal.',
        'Utilitarianism calculates morality based on net utility: Hedonic Calculus evaluates intensity, duration, certainty, and extent.'
      ]
    }
  ],

  // Chapter 3: Ethical Decision Making and Moral Judgments
  3: [
    {
      id: 'civ-extra-c3-sec1',
      heading: '3.4 Masterclass: Lawrence Kohlberg\'s Stages of Moral Development & Cognitive Biases',
      content: `### 3.4.1 Lawrence Kohlberg\'s Three Levels (Six Stages) of Moral Reasoning

| Moral Level | Developmental Stage | Primary Motivation / Orientation | Reasoning in the Classic "Heinz Dilemma" |
| :--- | :--- | :--- | :--- |
| **Level I: Pre-Conventional**<br>*(Egocentric; children under 9)* | **Stage 1: Punishment and Obedience** | Avoiding physical punishment and obeying power. | *"Heinz should not steal the drug because he will be locked in prison."* |
| | **Stage 2: Individualism and Exchange** | Self-interest, instrumental reward, *"you scratch my back, I scratch yours"*. | *"Heinz should steal the drug because he needs his wife to make dinner."* |
| **Level II: Conventional**<br>*(Conformity to social expectations; adolescents/adults)* | **Stage 3: Good Interpersonal Relationships** | Gaining social approval; living up to expectations of family and peers (*"good boy / nice girl"*). | *"Heinz should steal the drug because a loving husband always protects his wife."* |
| | **Stage 4: Maintaining Social Order** | Upholding law, authority, duty, and social order for community survival. | *"Heinz must not steal because theft violates the law; if everyone steals, society collapses."* |
| **Level III: Post-Conventional**<br>*(Autonomous principled reasoning; minority of adults)* | **Stage 5: Social Contract & Individual Rights** | Protecting basic constitutional rights and values democratically agreed upon by society. | *"The law against theft is valid, but the law must yield to the fundamental human right to life."* |
| | **Stage 6: Universal Ethical Principles** | Conscience guided by self-chosen abstract universal principles of justice, equality, and human dignity. | *"Human life possesses absolute intrinsic moral worth that transcends property laws."* |

---

### 3.4.2 Psychological Impediments to Ethical Decision-Making
- **Bystander Effect (Diffusion of Responsibility)**: Individuals fail to assist a victim in distress when other people are present, assuming someone else will intervene.
- **Groupthink**: The psychological drive for consensus within a cohesive group overrides realistic appraisal of alternative ethical courses of action.
- **Confirmation Bias**: Selectively seeking out information that confirms pre-existing moral convictions while ignoring disconfirming ethical evidence.`,
      keyTakeaways: [
        'Kohlberg evaluated moral maturity based on the underlying reasoning used to justify a choice, not the specific yes/no conclusion.',
        'Most adults operate at Level II (Conventional morality), conforming to peer expectations and statutory laws.'
      ]
    }
  ],

  // Chapter 4: State, Government and Citizenship
  4: [
    {
      id: 'civ-extra-c4-sec1',
      heading: '4.4 Masterclass: Theories of State Origin, Modern Constitutional Systems & Citizenship Modalities',
      content: `### 4.4.1 The Four Essential Elements of the Modern State
1. **Defined Territory**: An internationally recognized geographic area enclosed by sovereign land, maritime, and airspace boundaries.
2. **Permanent Population**: A resident human community bound together under a common legal jurisdiction.
3. **Government**: The formal political and administrative apparatus that formulates, interprets, and enforces public policy and law.
4. **Sovereignty**: The supreme, absolute power of self-governance free from external control (**External Sovereignty**) and wielding legitimate monopoly on the use of physical force within (**Internal Sovereignty — Max Weber**).

---

### 4.4.2 Social Contract Theories of State Origin

| Thinker & Work | State of Nature Vision | The Social Contract Terms | Resulting Sovereign Power |
| :--- | :--- | :--- | :--- |
| **Thomas Hobbes** (*Leviathan*, 1651) | *"Solitary, poor, nasty, brutish, and short"*; constant war of all against all. | Individuals surrender all individual natural liberties to an absolute sovereign in exchange for basic physical survival and security. | **Absolute Monarchy / Irrevocable Leviathan**. |
| **John Locke** (*Second Treatise*, 1689) | Reasonably peaceful, but insecure protection of **Natural Rights: Life, Liberty, and Property**. | Citizens create a limited government solely as a fiduciary trustee to protect their natural rights; if broken, citizens possess the **Right to Revolution**. | **Limited Constitutional Government / Liberal Democracy**. |
| **Jean-Jacques Rousseau** (*The Social Contract*, 1762) | Noble savages corrupted by private property and civilization. | Citizens surrender individual natural freedom to the collective community to realize the **General Will (*Volonté Générale*)**. | **Direct Participatory Democracy / Popular Sovereignty**. |

---

### 4.4.3 Modes of Acquiring Citizenship
1. **By Birth (Involuntary)**:
   - **Jus Sanguinis (Right of Blood)**: Citizenship is inherited through the nationality of the parents (the primary principle under the Ethiopian Nationality Proclamation).
   - **Jus Soli (Right of the Soil)**: Citizenship is acquired automatically by being born within the territorial borders of a country (e.g., USA, Canada).
2. **By Naturalization (Voluntary)**: Legal acquisition of citizenship after meeting statutory residency, language, character, and loyalty oath criteria.`,
      keyTakeaways: [
        'John Locke\'s social contract provided the philosophical architecture for modern constitutional democracy and the American Declaration of Independence.',
        'Sovereignty is the defining legal attribute that distinguishes the state from all other social organizations.'
      ]
    }
  ],

  // Chapter 5: Constitution, Democracy and Human Rights
  5: [
    {
      id: 'civ-extra-c5-sec1',
      heading: '5.4 Masterclass: Constitutionalism, Three Generations of Human Rights & Democratic Architectures',
      content: `### 5.4.1 Constitutionalism & Constitutional Classifications
- **Constitutionalism**: The political philosophy that government authority must be legally limited by a supreme constitution, preventing despotic tyranny through **Separation of Powers**, **Checks and Balances**, and the **Rule of Law**.
- **Classifications**:
  - **Written (Codified)** (e.g., USA, Ethiopia) vs. **Unwritten (Uncodified)** (e.g., UK, New Zealand).
  - **Rigid** (requires special supermajority amendment procedures) vs. **Flexible** (amended like ordinary statutes).

---

### 5.4.2 Karel Vasak\'s Three Generations of Human Rights

| Generation | Historical Context & Ideological Root | Nature of Rights | Key Examples | State Obligation |
| :--- | :--- | :--- | :--- | :--- |
| **1st Generation: Civil and Political Rights** | 17th–18th century Enlightenment, American and French Revolutions. | **"Negative Rights"** (freedom *from* state tyranny). | Right to life, liberty, freedom of speech, fair trial, freedom of religion, right to vote. | **Restraint**: The state must refrain from interfering with individual liberties. |
| **2nd Generation: Economic, Social, and Cultural Rights** | Late 19th–20th century socialist and labor movements. | **"Positive Rights"** (freedom *to* basic welfare). | Right to education, healthcare, fair wages, shelter, clean water, social security. | **Provision**: The state must actively allocate public resources to progressively realize these rights. |
| **3rd Generation: Solidarity / Collective Rights** | Post-WWII decolonization, developing nations movement. | **"Group Rights"** belonging to entire peoples. | Right to clean environment, peace, self-determination, economic development, humanitarian aid. | **Global Solidarity**: Requires international cooperation among all sovereign states. |`,
      keyTakeaways: [
        'The Universal Declaration of Human Rights (UDHR, 1948) established universal human dignity as the foundation of international law.',
        'The 1995 FDRE Constitution devotes one-third of its provisions (Articles 13–44) to fundamental human and democratic rights.'
      ]
    }
  ]
};
