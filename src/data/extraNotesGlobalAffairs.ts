import type { MasterNoteSection } from '../types.ts';

/**
 * Enlarged & In-Depth Extra Notes for Global Affairs (GlobalAffaris - 5 Chapters)
 * Preserves all existing notes and adds theoretical paradigms, foreign policy timelines,
 * IPE structural models, regional integration theories, and exam traps for all 5 chapters.
 */
export const EXTRA_NOTES_GLOBAL_AFFAIRS: Record<number, MasterNoteSection[]> = {
  // Chapter 1: Understanding International Relations
  1: [
    {
      id: 'glob-extra-c1-sec1',
      heading: '1.4 Masterclass: The Westphalian Paradigm, Systemic Polarity & Contending IR Theories',
      content: `### 1.4.1 The Evolution of Modern International Relations
- **The Peace of Westphalia (1648)**:
  Ended the Thirty Years\' War in Europe and established the foundation of the modern **state-centric international system** based on three cornerstone principles:
  1. **Sovereignty**: The supreme, independent political authority of a state over its territory and population, free from external intervention (*Rex in regno suo est imperator*).
  2. **Territorial Integrity**: Inviolability of recognized national borders.
  3. **Legal Equality of States**: Sovereign states are formally equal under international law regardless of geographic size, population, or military power.
- **Kenneth Waltz\'s Three Levels of Analysis**:
  1. **Individual Level (First Image)**: Human psychology, cognitive perceptions, personality traits, and decision-making biases of individual leaders (e.g., Churchill, Hitler, Nelson Mandela).
  2. **State / Domestic Level (Second Image)**: Regime type (democracy vs. autocracy), bureaucratic politics, economic structure, political culture, and national interest groups.
  3. **Systemic / Structural Level (Third Image)**: The distribution of power, systemic polarity, and the condition of **international anarchy** (absence of a global governing Leviathan).

---

### 1.4.2 Comparative Matrix of Contending IR Theories

| Theoretical Paradigm | Foundational Theorists | View of the International System | Primary Actors | Core Driving Dynamic & Goal | Path to International Peace / Stability |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Realism (Classical & Structural)** | Thucydides, Machiavelli, Thomas Hobbes, Hans Morgenthau, Kenneth Waltz | **Anarchic, dangerous, zero-sum**. States must rely on **self-help**. | **Unitary, rational sovereign states**. | Pursuit of **national power, survival, and security**. Security Dilemma is inherent. | **Balance of Power**, nuclear deterrence, alliance balancing. |
| **Liberalism & Neo-Liberalism** | John Locke, Immanuel Kant, Woodrow Wilson, Robert Keohane, Joseph Nye | Anarchic but **mitigated by institutions, trade, and law**. Positive-sum. | States, international organizations (UN, WTO), NGOs, corporations. | Mutual economic prosperity, human rights, global collective security. | **Democratic Peace Theory**, economic interdependence, international law and multilateral regimes. |
| **Constructivism** | Alexander Wendt, Nicholas Onuf, Martha Finnemore | Socially constructed reality: *"Anarchy is what states make of it."* | States, transnational networks, norm entrepreneurs. | Shared ideas, social identities, cultural values, and international norms. | Diffusion of progressive human rights norms, confidence building, transforming strategic culture. |
| **Marxism & Critical Theory** | Karl Marx, V.I. Lenin, Immanuel Wallerstein | Hierarchical, exploitative capitalist world-system. | Transnational social classes, multinational corporations, core states. | Class struggle, global surplus value extraction, core exploitation of periphery. | Overthrow of global capitalist imperialism and core-periphery dependency. |`,
      keyTakeaways: [
        'Realism views international relations as a perpetual struggle for power in an anarchic world where survival requires self-help.',
        'Liberalism demonstrates that international institutions, trade interdependence, and democratic governance foster durable global peace.'
      ]
    }
  ],

  // Chapter 2: Understanding Foreign Policy and Diplomacy
  2: [
    {
      id: 'glob-extra-c2-sec1',
      heading: '2.4 Masterclass: National Interest Taxonomy, Diplomatic Instruments & Ethiopian Foreign Policy Milestones',
      content: `### 2.4.1 K.J. Holsti\'s Three-Tier Foreign Policy Objectives
1. **Core Values and Interests (Short-to-Medium Term)**:
   - Fundamental non-negotiable goals for which a nation is willing to make the ultimate sacrifice: **national self-preservation, sovereign territorial integrity, and political independence**.
2. **Middle-Range Objectives**:
   - Demands made on other states to improve socio-economic welfare: expanding export markets, attracting foreign direct investment (FDI), securing external development grants, and cultural diplomacy.
3. **Universal Long-Range Goals**:
   - Broad ideological visions for reorganizing the international system (e.g., establishing the Non-Aligned Movement, reforming the UN Security Council, promoting Pan-Africanism).

---

### 2.4.2 Historical Evolution of Ethiopian Foreign Policy

| Historical Era & Regime | Head of State / Government | Primary Strategic Security Challenges | Key Foreign Policy Doctrine & Diplomatic Milestones |
| :--- | :--- | :--- | :--- |
| **Imperial Re-unification Era** ($1855\\text{--}1889$) | **Emperor Tewodros II** & **Emperor Yohannes IV** | Regional fragmentation, European imperialist expansion, Egyptian and Sudanese Mahdist invasions. | Modernizing the state; seeking European military alliances; defending national sovereignty at the **Battle of Gundet (1875)**, **Gura (1876)**, and **Metemma (1889)**. |
| **Modern Expansion & Adwa Triumph** ($1889\\text{--}1913$) | **Emperor Menelik II** | European Scramble for Africa, Italian colonial aggression in the Horn. | Decisive victory over Italian invaders at the **Battle of Adwa (March 1, 1896)**, guaranteeing sovereign recognition; diplomatic demarcation of Ethiopia\'s modern boundaries. |
| **Collective Security & Pan-Africanism** ($1930\\text{--}1974$) | **Emperor Haile Selassie I** | Fascist Italian invasion ($1935\\text{--}1941$); Cold War geopolitical containment. | League of Nations appeal ($1936$); alliance with the Western bloc (US Point Four agreement); dispatching troops to Korea and Congo; **founding the Organization of African Unity (OAU) in 1963 in Addis Ababa**. |
| **The Derg Marxist-Leninist Alignment** ($1974\\text{--}1991$) | **Mengistu Haile Mariam** | Internal civil rebellion, Eritrean separatist war, Somali aggression in the Ogaden. | Radical foreign policy realignment toward the **Soviet Union, Cuba, and Eastern Bloc**; victory in the $1977\\text{--}1978$ Ethio-Somali War with Soviet/Cuban military assistance. |
| **Economic Diplomacy & Post-1991 Era** ($1991\\text{ to Present}$) | EPRDF / Prosperity Party | Extreme domestic poverty, landlocked vulnerability after Eritrea\'s independence ($1993$), regional terrorism. | **Economic Diplomacy** (poverty as primary security threat); Nile Basin initiative and construction of the **GERD**; peacekeeping deployments (Sudan/South Sudan/Somalia); BRICS membership. |`,
      keyTakeaways: [
        'The Battle of Adwa (1896) was the first major military defeat of a European colonial power by an African nation in modern history.',
        'Ethiopia has historically pursued collective security through international organizations (League of Nations, UN, OAU/AU).'
      ]
    }
  ],

  // Chapter 3: International Political Economy (IPE)
  3: [
    {
      id: 'glob-extra-c3-sec1',
      heading: '3.4 Masterclass: The Contending IPE Schools, The Bretton Woods System & The Developmental State',
      content: `### 3.4.1 The Three Classical Perspectives on IPE
1. **Mercantilism (Economic Nationalism)**:
   - Economic activity should serve national power and state security.
   - International economic relations are inherently **conflictual and zero-sum** (one nation's trade surplus is another's deficit).
   - Champions industrial tariffs, export subsidies, and strategic trade protectionism (Alexander Hamilton, Friedrich List).
2. **Economic Liberalism**:
   - The market operates most efficiently when free from state intervention (**Laissez-faire, Adam Smith**).
   - International trade is **positive-sum**; all nations gain when specializing in goods where they possess **Comparative Advantage (David Ricardo)**.
3. **Marxism / Structuralism (Dependency Theory)**:
   - International trade perpetuates unequal exchange between the wealthy capitalist **Core** and the impoverished commodity-exporting **Periphery (Raúl Prebisch, Immanuel Wallerstein)**.

---

### 3.4.2 The Bretton Woods Institutions (Established 1944)
- **International Monetary Fund (IMF)**: Mandated to maintain international monetary stability, facilitate balanced global trade growth, and provide short-term emergency balance-of-payments financing (subject to structural adjustment conditionality).
- **World Bank Group (IBRD & IDA)**: Mandated to finance long-term capital reconstruction and economic development through low-interest development loans and technical grants for infrastructure and health.
- **World Trade Organization (WTO / formerly GATT)**: Oversees multilateral trade agreements, enforces trade dispute arbitration, and upholds the **Most-Favored-Nation (MFN)** and **National Treatment** non-discrimination principles.`,
      keyTakeaways: [
        'The Developmental State model (e.g., East Asian Tigers and Ethiopia) combines market mechanisms with strategic state planning and heavy public infrastructure investments.',
        'Comparative advantage demonstrates that nations gain from free trade even when one country is more productive in producing every good in absolute terms.'
      ]
    }
  ],

  // Chapter 4: Globalization and Regionalism
  4: [
    {
      id: 'glob-extra-c4-sec1',
      heading: '4.4 Masterclass: The Three Globalization Schools, Regional Integration Theories & The AfCFTA',
      content: `### 4.4.1 The Great Globalization Debate

| Dimension | Hyperglobalist School | Skeptic School | Transformationalist School |
| :--- | :--- | :--- | :--- |
| **Core Premise** | A truly **borderless global marketplace** has emerged; the nation-state is becoming obsolete. | Globalization is a myth; current world economy is merely regionalized international trade. | Globalization is an unprecedented historic force restructuring state power and societies. |
| **State Sovereignty** | Rapidly declining; eroded by capital flows, MNCs, and global digital networks. | **Intact and supreme**; national governments remain the ultimate arbiters of economic life. | **Transformed and re-articulated**; states adapt through multilateral cooperation and pooling sovereignty. |
| **Primary Beneficiaries** | Global consumers, transnational tech corporations, and capital owners. | Wealthy Western and Asian industrialized nations. | Highly uneven; creates new winners and losers across and within all nations. |

---

### 4.4.2 Theories of Regional Integration & The African Union (AU)
- **Functionalism (David Mitrany)**: Integration begins with pragmatic, non-political technical cooperation in specific sectors (transport, health, energy) which gradually creates transnational loyalties.
- **Neofunctionalism (Ernst Haas)**: Features the **"Spillover Effect"**—integration in one economic sector (e.g., coal and steel) naturally creates irresistible pressure to integrate contiguous sectors (e.g., currency, transport, labor law).
- **African Continental Free Trade Area (AfCFTA)**:
  - Created under the African Union (AU) to establish a single continental market of **$1.3\\text{ billion}$ people** with a combined GDP of **$>3.4\\text{ trillion}$**, eliminating tariffs on $90\\%$ of intra-African trade goods.`,
      keyTakeaways: [
        'Addis Ababa serves as the diplomatic capital of Africa, hosting the permanent headquarters of the African Union (AU) and UNECA.',
        'Regional integration enhances collective bargaining power and creates critical economies of scale for developing economies.'
      ]
    }
  ],

  // Chapter 5: Major Contemporary Global Issues
  5: [
    {
      id: 'glob-extra-c5-sec1',
      heading: '5.4 Masterclass: Transnational Security Threats, The Non-Proliferation Regime & The Paris Climate Accord',
      content: `### 5.4.1 Transnational Threats: Terrorism & Weapons of Mass Destruction (WMD)
1. **Transnational Terrorism**:
   - Political or ideological violence deliberately directed against civilian non-combatants to generate pervasive terror and coerce governments.
   - Driven by violent extremist ideologies, political marginalization, state collapse, and exploitation of digital communications.
2. **Nuclear Non-Proliferation Treaty (NPT, 1968)**:
   - Rests on **Three Pillars**:
     1. **Non-Proliferation**: Non-nuclear weapon states agree never to acquire or develop nuclear weapons.
     2. **Disarmament**: The 5 recognized nuclear powers (US, Russia, China, UK, France) commit to negotiate complete nuclear disarmament.
     3. **Peaceful Uses of Nuclear Technology**: Guaranteed access to civilian nuclear energy technology under International Atomic Energy Agency (IAEA) safeguards.

---

### 5.4.2 Global Environmental Governance: The Paris Climate Agreement (2015)
- **Primary Goal**: Hold the increase in global average temperature to **well below $2^\\circ\\text{C}$ above pre-industrial levels**, and pursue efforts to limit the increase to **$1.5^\\circ\\text{C}$**.
- **Nationally Determined Contributions (NDCs)**: Each signatory country voluntarily formulates, communicates, and ratifies domestic emission reduction targets updated every 5 years.
- **Principle of Common But Differentiated Responsibilities (CBDR)**:
  Recognizes that developed industrialized nations historically generated the vast majority of cumulative greenhouse gas emissions and therefore bear the moral and financial responsibility to provide climate financing and technology transfer to vulnerable developing nations.`,
      keyTakeaways: [
        'The principle of Common But Differentiated Responsibilities (CBDR) bridges historical equity with global environmental survival.',
        'Transnational security threats (pandemics, terrorism, climate change) cannot be resolved by any sovereign state acting alone.'
      ]
    }
  ]
};
