/**
 * Comprehensive High-Yield Study & Exam Prep Articles for TailoredTimes
 * 
 * Includes curated curriculum-aligned content for:
 * 1. General Students (STEM, Education, Career, Current Affairs)
 * 2. IELTS Prep (Band 8+ Reading, Writing Tasks 1 & 2, Speaking Cue Cards, Advanced Vocab)
 * 3. TOEFL Prep (Academic English, Integrated Writing, Lecture Listening, Academic Lexicon)
 */

const generalStudentArticles = [
  {
    id: 'STU-01',
    code: 'STU-01',
    title: 'Quantum Computing Fundamentals & Qubit Superposition Principles',
    section: 'students',
    topic: 'technology',
    categoryName: 'Science & Technology',
    difficulty: 'Advanced',
    wordCount: 520,
    coreConcept: 'Quantum superposition enables qubits to exist as linear combinations of |0⟩ and |1⟩, achieving exponential state parallelism.',
    description: 'A deep-dive technical breakdown of quantum bit architecture, quantum entanglement, Decoherence mitigation, and algorithm advantages.',
    syllabus: 'Undergraduate Computer Science & Applied Physics',
    content: `1. Principles of Qubit Superposition:
Unlike classical computing which encodes binary information strictly in deterministic binary states of 0 or 1, quantum computing leverages quantum mechanics to represent information in quantum bits (qubits). A single qubit is defined as a vector in a two-dimensional complex Hilbert space: |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex probability amplitudes satisfying |α|² + |β|² = 1. This mathematical property allows n entangled qubits to represent 2ⁿ simultaneous states in linear superposition.

2. Quantum Entanglement and Bell States:
Entanglement represents a non-local quantum correlation between multiple qubits such that the quantum state of each particle cannot be described independently of the state of the others. In quantum algorithms, generating maximally entangled Bell states (|Φ⁺⟩ = (|00⟩ + |11⟩)/√2) is foundational for quantum teleportation, superdense coding, and error correction protocols like surface codes.

3. Decoherence and Hardware Architecture:
The primary barrier to fault-tolerant quantum computing is quantum decoherence, caused by thermal fluctuations and electromagnetic interference collapsing delicate wavefunctions into classical states. Leading hardware paradigms include superconducting transmon qubits cooled to millikelvin temperatures in dilution refrigerators, trapped-ion systems using laser-manipulated ytterbium ions, and topological quantum computing based on non-Abelian anyons.

4. Algorithmic Supremacy and Real-World Applications:
Quantum algorithms offer polynomial to exponential speedups over classical counterparts. Shor's Algorithm solves prime factorization in polynomial time O((log N)³), posing existential challenges to classical RSA encryption. Grover's Algorithm accelerates unstructured database search with quadratic speedup O(√N). Key commercial applications include molecular chemistry modeling for pharmaceutical discovery, portfolio optimization, and room-temperature superconductor simulation.`
  },
  {
    id: 'STU-02',
    code: 'STU-02',
    title: 'CRISPR-Cas9 Gene Editing Mechanism and Prime Editing Innovations',
    section: 'students',
    topic: 'science',
    categoryName: 'Biological Sciences',
    difficulty: 'Advanced',
    wordCount: 490,
    coreConcept: 'Targeted double-strand DNA cleavage guided by single guide RNA (sgRNA) combined with Cas9 endonuclease precision.',
    description: 'Explores the molecular biochemistry of CRISPR-Cas9, non-homologous end joining (NHEJ), homology-directed repair (HDR), and prime editing.',
    syllabus: 'Molecular Biology & Biotechnology Curriculum',
    content: `1. Molecular Mechanism of CRISPR Cleavage:
The Clustered Regularly Interspaced Short Palindromic Repeats (CRISPR) system functions in nature as an adaptive immune defense in bacteria and archaea against bacteriophage viral infections. The engineered CRISPR-Cas9 platform consists of a catalytic endonuclease (Cas9) and a synthetic single-guide RNA (sgRNA). The sgRNA recognizes a complementary 20-nucleotide target genomic sequence adjacent to a 5'-NGG Protospacer Adjacent Motif (PAM).

2. DNA Repair Pathways (NHEJ vs HDR):
Upon PAM recognition and R-loop formation, Cas9 introduces a site-specific double-strand break (DSB) 3 base pairs upstream of the PAM. Eukaryotic cells resolve DSBs through two competing repair mechanisms: Non-Homologous End Joining (NHEJ), an error-prone pathway generating insertion/deletion (indel) mutations that knock out genes; and Homology-Directed Repair (HDR), a high-fidelity pathway utilizing donor DNA templates for precise point corrections.

3. Precision Editing: Base & Prime Editing:
To overcome the risks of uncontrolled double-strand breaks and chromosomal translocations, next-generation tools have emerged. Base editors fuse catalytically impaired Cas9 nickases to cytidine or adenosine deaminases, executing C→T or A→G single-base transitions without DSBs. Prime editing further integrates an engineered reverse transcriptase with a prime editing guide RNA (pegRNA) to copy genetic edits directly into the target DNA site.

4. Clinical Frontiers and Therapeutic Milestones:
CRISPR technology has achieved regulatory approvals for sickle cell disease and beta-thalassemia through ex-vivo gene modification (Casgevy). In-vivo lipid nanoparticle delivery systems now enable targeted liver editing to treat hereditary transthyretin amyloidosis and hypercholesterolemia, heralding a new era of curative precision medicine.`
  },
  {
    id: 'STU-03',
    code: 'STU-03',
    title: 'Macroeconomic Monetary Policy: Liquidity Traps and Quantitative Easing',
    section: 'students',
    topic: 'education',
    categoryName: 'Economics & Policy',
    difficulty: 'Intermediate',
    wordCount: 480,
    coreConcept: 'Central bank balance sheet expansion when nominal interest rates hit the Zero Lower Bound (ZLB).',
    description: 'A study of transmission mechanisms of central bank interest rate channels, open market operations, inflation targeting, and unconventional balance sheet policies.',
    syllabus: 'Macroeconomics & Public Finance',
    content: `1. Conventional Monetary Policy Transmission:
Central banks manage macroeconomic aggregate demand, price stability, and maximum employment primarily through short-term policy interest rates. By adjusting the repo or benchmark rate, central banks influence interbank lending rates, commercial loan pricing, asset yields, and currency exchange rates. Lower policy rates reduce the cost of capital, stimulating consumer credit and business capital expenditure.

2. The Zero Lower Bound and Liquidity Traps:
In periods of severe financial distress or deflationary shock, nominal interest rates may drop to zero (the Zero Lower Bound). At this juncture, conventional interest rate cuts lose efficacy because individuals and institutions hoard cash balances rather than purchasing yielding securities—a phenomenon termed a Keynesian liquidity trap. The LM curve becomes horizontal, rendering traditional expansionary monetary policy impotent.

3. Unconventional Operations: Quantitative Easing (QE):
To bypass the ZLB, central banks deploy Quantitative Easing (QE)—the large-scale electronic creation of central bank reserves used to purchase long-duration sovereign bonds and mortgage-backed securities from commercial banks. QE flattens the long end of the yield curve through portfolio rebalancing, signaling expectations, and direct liquidity injections, thereby suppressing real borrowing costs across the economy.

4. Exit Strategies and Inflationary Trade-offs:
Prolonged balance sheet expansion risks inflating asset price bubbles, distorting risk premia, and fueling broad-based consumer price inflation when velocity rebounds. Central banks must orchestrate quantitative tightening (QT)—allowing maturing securities to roll off without reinvestment—while managing debt sustainability and fiscal dominance concerns.`
  },
  {
    id: 'STU-04',
    code: 'STU-04',
    title: 'Transformer Neural Networks and Self-Attention Mathematics',
    section: 'students',
    topic: 'technology',
    categoryName: 'Artificial Intelligence',
    difficulty: 'Advanced',
    wordCount: 510,
    coreConcept: 'Scaled dot-product attention: Attention(Q, K, V) = softmax(QKᵀ / √dₖ) V replaces recurrent sequential processing.',
    description: 'Examines the architectural revolution of the Transformer model, multi-head attention mechanisms, positional embeddings, and scaling laws in Large Language Models.',
    syllabus: 'Machine Learning & Deep Learning Specialization',
    content: `1. The Bottleneck of Recurrent Architectures:
Prior to 2017, sequence modeling in Natural Language Processing relied on Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTM) units. Because RNNs compute hidden state hₜ sequentially conditioned on hₜ₋₁, they prevent parallelization during training across GPUs and suffer from vanishing gradient degradation across extended context windows.

2. Scaled Dot-Product Attention:
The Transformer architecture eliminates recurrence in favor of self-attention mechanisms. Given input token embeddings, linear projection matrices generate Queries (Q), Keys (K), and Values (V) of dimension dₖ. The scaled dot-product attention is mathematically formalized as:
Attention(Q, K, V) = softmax( (Q · Kᵀ) / √dₖ ) · V
Dividing by √dₖ prevents the dot products from growing excessively large for high dimensions, ensuring gradients do not vanish during the softmax exponentiation.

3. Multi-Head Attention and Positional Encodings:
Rather than performing a single attention function, Multi-Head Attention projects Q, K, and V with h distinct parameter matrices, enabling the network to jointly attend to information from different representation subspaces and semantic positions simultaneously. Because attention is permutation-invariant, sinusoidal or rotary positional embeddings (RoPE) are injected to maintain sequence order.

4. Large Language Models and Modern Scaling:
Decoder-only transformer architectures (such as GPT-4, Gemini, and LLaMA) scale compute, dataset token count, and parameter capacity in accordance with empirical Chinchilla scaling laws. Self-attention enables emergence in in-context learning, code synthesis, and zero-shot reasoning.`
  }
];

const ieltsArticles = [
  {
    id: 'IELTS-01',
    code: 'IELTS-01',
    title: 'Academic Writing Task 2: Band 9 Essay Structure & Cohesion Masterclass',
    section: 'ielts',
    topic: 'writing',
    categoryName: 'IELTS Academic Writing',
    difficulty: 'Advanced',
    wordCount: 530,
    coreConcept: 'Mastering the 4-paragraph discursive essay structure with high Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range.',
    description: 'Detailed blueprint for writing 250+ word Band 9 essays for Agree/Disagree, Discuss Both Views, and Problem-Solution prompt types.',
    syllabus: 'IELTS Academic & General Training Module',
    content: `1. The Four Assessment Criteria for Band 8/9:
Examiners evaluate Writing Task 2 essays across four equally weighted criteria (25% each):
• Task Achievement (TA): Fully answering all parts of the prompt with well-developed ideas, concrete real-world evidence, and an unambiguous thesis statement throughout.
• Coherence and Cohesion (CC): Clear paragraph progression, topic sentences, and seamless cohesive devices (discourse markers) without mechanical repetition.
• Lexical Resource (LR): Precise academic vocabulary, natural collocations, idiomatic dexterity, and minimal spelling errors.
• Grammatical Range and Accuracy (GRA): Frequent error-free complex and compound sentences (inversions, conditionals, relative clauses, passive voice).

2. Ideal 4-Paragraph Essay Architecture:
• Introduction (45-50 words):
  - Sentence 1: Background paraphrase of the prompt using synonyms and syntactic inversion.
  - Sentence 2: Explicit Thesis Statement establishing your clear stance.
  - Sentence 3: Outline sentence previewing the main supporting arguments.
• Body Paragraph 1 (80-90 words):
  - Sentence 1: Topic Sentence introducing primary supporting argument.
  - Sentence 2-3: In-depth logical explanation ("This is primarily due to the fact that...").
  - Sentence 4: Concrete example ("A case in point is...", "Recent empirical data from...").
  - Sentence 5: Concluding link back to thesis.
• Body Paragraph 2 (80-90 words):
  - Counter-argument evaluation or second robust supporting pillar with supporting example.
• Conclusion (35-45 words):
  - Restatement of thesis using novel lexical synonyms and a forward-looking recommendation.

3. Model Complex Grammar Patterns to Deploy:
- Conditional Type 3 & Inversion: "Were governments to subsidize renewable infrastructure, emissions would decline precipitously."
- Not Only / But Also: "Not only does urbanization foster economic innovation, but it also strains municipal utilities."
- Passive Nominalization: "The implementation of stringent regulatory frameworks is paramount."`
  },
  {
    id: 'IELTS-02',
    code: 'IELTS-02',
    title: 'Academic Reading: True/False/Not Given & Heading Matching Tactics',
    section: 'ielts',
    topic: 'reading',
    categoryName: 'IELTS Academic Reading',
    difficulty: 'Intermediate',
    wordCount: 490,
    coreConcept: 'Differentiating between absolute contradictions (FALSE) and absent verification (NOT GIVEN) using strict keyword-evidence mapping.',
    description: 'Techniques to manage 60-minute time constraints across 3 complex academic passages with 40 questions.',
    syllabus: 'IELTS Reading Section Strategy',
    content: `1. Dissecting TRUE, FALSE, and NOT GIVEN:
The most frequent pitfall in IELTS Reading is confusing FALSE and NOT GIVEN:
• TRUE / YES: The passage explicitly agrees with and confirms the premise in the question statement.
• FALSE / NO: The passage contradicts the statement directly (the opposite fact is stated).
• NOT GIVEN: The passage neither confirms nor denies the claim. Even if the topic is discussed in general, the specific relationship or degree claimed in the question is absent from the text.
Golden Rule: Never extrapolate or use external world knowledge. If the text does not supply the factual link, the answer is strictly NOT GIVEN.

2. Skimming, Scanning, and Intensive Reading:
• Stage 1 (Skimming - 2 minutes): Read the title, subheadings, and first/last sentences of each paragraph to construct a mental map of passage hierarchy.
• Stage 2 (Scanning - targeted): Highlight irreplaceable anchor keywords in the questions (proper nouns, dates, technical acronyms, numerical quantities).
• Stage 3 (Intensive Parallel Reading): Read the 2-3 sentences surrounding the anchor keywords in the passage to decode qualifying adverbs (e.g., 'predominantly', 'occasionally', 'invariable').

3. Heading Matching Master Technique:
• Read the list of headings first and underline keywords.
• Cross off already used headings immediately.
• Read the first two sentences and the concluding sentence of a paragraph, which contain 80% of topic assertions.
• Beware of distractors: A heading containing a word mentioned in the paragraph is often a trap if it does not encapsulate the overarching central theme.`
  },
  {
    id: 'IELTS-03',
    code: 'IELTS-03',
    title: 'Speaking Part 2 & 3: Idiomatic Collocations and Fluent Elaboration',
    section: 'ielts',
    topic: 'speaking',
    categoryName: 'IELTS Speaking Section',
    difficulty: 'Advanced',
    wordCount: 470,
    coreConcept: 'The P-E-E-R (Point, Explanation, Example, Result) method for sustained 2-minute fluency and high lexical variety in Speaking Part 3.',
    description: 'Strategies to eliminate hesitation pauses, deliver structured 2-minute Part 2 cue cards, and analyze abstract societal questions in Part 3.',
    syllabus: 'IELTS Oral Fluency & Lexical Precision',
    content: `1. Mastering the Part 2 Cue Card (1-Minute Preparation Strategy):
During the 60-second preparation window, write a 4-bullet keyword mindmap covering:
• Who / What / Where (Contextual setup)
• Why it occurred (Core narrative)
• Emotional impression or conflict
• Lasting significance or future implication

2. The P-E-E-R Framework for Speaking Part 3:
Part 3 requires abstract, analytical, and third-person answers rather than personal anecdotes:
• Point: "It is widely acknowledged that automation is transforming modern labor markets."
• Explanation: "This shift is predominantly driven by the economic imperative for higher operational efficiency and lower recurring overheads."
• Example: "For instance, manufacturing and retail sectors have progressively transitioned toward self-service and automated assembly systems."
• Result/Repercussion: "Consequently, governments must prioritize workforce upskilling in technical and creative domains."

3. High-Band Lexical Connectors & Fillers:
Avoid dead silence by deploying natural conversational framing devices:
- "That is a multifaceted issue, but if I had to pinpoint the primary factor..."
- "Looking at this from a broader societal perspective..."
- "While one school of thought suggests X, a compelling counter-argument is Y..."`
  }
];

const toeflArticles = [
  {
    id: 'TOEFL-01',
    code: 'TOEFL-01',
    title: 'TOEFL iBT Integrated Writing: Synthesis & Counter-Point Mapping',
    section: 'toefl',
    topic: 'writing',
    categoryName: 'TOEFL iBT Writing',
    difficulty: 'Advanced',
    wordCount: 520,
    coreConcept: 'Synthesizing conflicting viewpoints between an academic reading passage and a university lecture using a point-by-point rebuttal template.',
    description: 'Step-by-step methodology for achieving 28+ on the TOEFL Integrated Writing task within the 20-minute writing limit.',
    syllabus: 'TOEFL iBT Academic Writing Assessment',
    content: `1. Task Dynamics and Structure:
In the TOEFL iBT Integrated Writing task, test-takers have 3 minutes to read an academic passage (approx. 250-300 words) presenting 3 supporting claims for a theory or proposal. Subsequently, a university professor delivers a 2-minute lecture directly refuting or casting doubt upon each of the 3 points made in the reading. You then have 20 minutes to write a 225-300 word summary synthesizing how the lecture challenges the reading.

2. Two-Column Note-Taking System:
On your scratch paper, divide the sheet into two equal columns:
• Column 1: Reading Claim 1, Claim 2, Claim 3 (Focus on main nouns, theories, and mechanisms).
• Column 2: Lecture Rebuttal 1, Rebuttal 2, Rebuttal 3 (Record specific counter-evidence, experimental anomalies, and alternative explanations).

3. High-Scoring 4-Paragraph Template:
• Paragraph 1 (Introduction):
  "Both the reading and the lecture discuss the controversial subject of [Topic]. While the reading asserts that [Summary of Reading's Main Stance], the lecturer explicitly refutes this position, arguing instead that [Summary of Professor's Counter-Thesis]."
• Paragraph 2 (Point 1 Synthesis):
  "First and foremost, the reading passage contends that [Reading Point 1]. However, the professor challenges this claim by pointing out that [Lecture Counter-Point 1]. Specifically, she explains that [Detailed Evidence from Audio]."
• Paragraph 3 (Point 2 Synthesis):
  "Secondly, although the author suggests that [Reading Point 2], the speaker disputes this assertion, stating that [Lecture Counter-Point 2]."
• Paragraph 4 (Point 3 Synthesis):
  "Finally, the reading claims that [Reading Point 3]. In contrast, the lecturer casts doubt on this conclusion by demonstrating that [Lecture Counter-Point 3]."`
  },
  {
    id: 'TOEFL-02',
    code: 'TOEFL-02',
    title: 'TOEFL Academic Reading: Inference & Purpose Questions Decoded',
    section: 'toefl',
    topic: 'reading',
    categoryName: 'TOEFL iBT Reading',
    difficulty: 'Intermediate',
    wordCount: 480,
    coreConcept: 'Identifying implicit academic implications and authorial rhetorical intent without over-inferring.',
    description: 'Mastery over Rhetorical Purpose, Negative Factual Information, and Sentence Insertion questions on the updated TOEFL iBT format.',
    syllabus: 'ETS TOEFL Reading Section Skills',
    content: `1. Deconstructing "Rhetorical Purpose" Questions:
Questions that ask "Why does the author mention X in paragraph 2?" or "The author discusses Y in order to..." test structural awareness rather than factual retention.
• Rule of Thumb: Authors rarely introduce details in isolation. A specific case, study, or example is introduced to substantiate a broader assertion made in the preceding sentence.
• Identify the immediate claim: Look one sentence above the mentioned phrase to locate the main conceptual thesis that the detail is serving.

2. Navigating "Inference" Questions:
Inference questions require recognizing what is logically entailed by the text without being verbatim quoted.
• Common Traps:
  - Extreme generalizations (answers containing 'always', 'never', 'solely', 'impossible').
  - True-to-life but unsupported statements (facts that are scientifically accurate in the real world but not mentioned in the passage).
  - Reverse causality (inverting cause and effect relationships).

3. Sentence Insertion Strategy (The Black Square ■):
When tasked with inserting a sentence into one of four black squares [■], evaluate:
• Transition Signals: Words like 'Consequently', 'In contrast', 'Furthermore', or 'For example'.
• Pronoun Antecedents: Phrases like 'These ancient structures', 'This disparity', or 'Such findings' must immediately follow the noun they reference.
• Chronological Progression: Historical periods or experimental step sequences must follow strict chronological order.`
  }
];

module.exports = {
  generalStudentArticles,
  ieltsArticles,
  toeflArticles
};
