/**
 * Comprehensive High-Yield Study & Exam Prep Articles for TailoredTimes
 * 
 * Includes curated curriculum-aligned content for:
 * 1. General Students (STEM, Education, Career, Economics)
 * 2. NEET Prep (Medical / Biology, Physiology, Optics, Organic Chemistry)
 * 3. JEE Prep (Engineering / Rotational Physics, Calculus, Electrodynamics, Physical Chemistry)
 * 4. Digital SAT Prep (Reading & Writing, Math, Grammar, Quadratic Models)
 * 5. IELTS Prep (Band 8+ Reading, Writing Tasks 1 & 2, Advanced Vocab)
 * 6. TOEFL Prep (Academic English, Integrated Writing, Lecture Listening)
 */

const generalStudentArticles = [
  {
    "id": "STU-01",
    "code": "STU-01",
    "title": "Quantum Computing Fundamentals & Qubit Superposition Principles",
    "section": "students",
    "topic": "technology",
    "categoryName": "Science & Technology",
    "difficulty": "Advanced",
    "wordCount": 520,
    "coreConcept": "Quantum superposition enables qubits to exist as linear combinations of |0⟩ and |1⟩, achieving exponential state parallelism.",
    "description": "A deep-dive technical breakdown of quantum bit architecture, quantum entanglement, Decoherence mitigation, and algorithm advantages.",
    "syllabus": "Undergraduate Computer Science & Applied Physics",
    "content": "1. Principles of Qubit Superposition:\nUnlike classical computing which encodes binary information strictly in deterministic binary states of 0 or 1, quantum computing leverages quantum mechanics to represent information in quantum bits (qubits). A single qubit is defined as a vector in a two-dimensional complex Hilbert space: |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex probability amplitudes satisfying |α|² + |β|² = 1. This mathematical property allows n entangled qubits to represent 2ⁿ simultaneous states in linear superposition.\n\n2. Quantum Entanglement and Bell States:\nEntanglement represents a non-local quantum correlation between multiple qubits such that the quantum state of each particle cannot be described independently of the state of the others. In quantum algorithms, generating maximally entangled Bell states (|Φ⁺⟩ = (|00⟩ + |11⟩)/√2) is foundational for quantum teleportation, superdense coding, and error correction protocols like surface codes.\n\n3. Decoherence and Hardware Architecture:\nThe primary barrier to fault-tolerant quantum computing is quantum decoherence, caused by thermal fluctuations and electromagnetic interference collapsing delicate wavefunctions into classical states. Leading hardware paradigms include superconducting transmon qubits cooled to millikelvin temperatures in dilution refrigerators, trapped-ion systems using laser-manipulated ytterbium ions, and topological quantum computing based on non-Abelian anyons.\n\n4. Algorithmic Supremacy and Real-World Applications:\nQuantum algorithms offer polynomial to exponential speedups over classical counterparts. Shor's Algorithm solves prime factorization in polynomial time O((log N)³), posing existential challenges to classical RSA encryption. Grover's Algorithm accelerates unstructured database search with quadratic speedup O(√N). Key commercial applications include molecular chemistry modeling for pharmaceutical discovery, portfolio optimization, and room-temperature superconductor simulation."
  },
  {
    "id": "STU-02",
    "code": "STU-02",
    "title": "Large Language Models (LLMs) & Multi-Head Self-Attention Mechanics",
    "section": "students",
    "topic": "technology",
    "categoryName": "Artificial Intelligence",
    "difficulty": "Advanced",
    "wordCount": 510,
    "coreConcept": "Scaled dot-product self-attention mechanism: Attention(Q, K, V) = softmax(QKᵀ / √d_k)V.",
    "description": "Mathematical architecture of Transformer neural networks, positional encodings, feed-forward sublayers, and RLHF fine-tuning.",
    "syllabus": "Machine Learning & Deep Learning Curriculum",
    "content": "1. The Transformer Self-Attention Breakthrough:\nThe Transformer architecture eliminates recurrence (RNNs) in favor of parallelized self-attention. For input embeddings projected into Query (Q), Key (K), and Value (V) matrices of dimension d_k, the scaled dot-product attention computes:\nAttention(Q, K, V) = softmax((Q Kᵀ) / √d_k) V. The scaling factor 1/√d_k prevents dot products from growing excessively large in high dimensions, which would otherwise push the softmax function into regions with vanishingly small gradients.\n\n2. Multi-Head Attention Parallelism:\nMulti-Head Attention projects queries, keys, and values h times with distinct learned linear projections:\nMultiHead(Q,K,V) = Concat(head_1, ..., head_h) W^O, where each head_i = Attention(Q W_i^Q, K W_i^K, V W_i^V). This enables the model to simultaneously attend to information from different representation subspaces at different positions.\n\n3. Positional Encodings & Autoregressive Decoding:\nBecause self-attention is permutation-invariant, positional information is injected via sinusoidal encodings or Rotary Position Embeddings (RoPE). During autoregressive inference, causal masking ensures that predictions for position i can only depend on known outputs at positions prior to i."
  },
  {
    "id": "STU-03",
    "code": "STU-03",
    "title": "CRISPR-Cas9 Gene Editing Mechanism and Prime Editing Innovations",
    "section": "students",
    "topic": "science",
    "categoryName": "Biological Sciences",
    "difficulty": "Advanced",
    "wordCount": 490,
    "coreConcept": "Targeted double-strand DNA cleavage guided by single guide RNA (sgRNA) combined with Cas9 endonuclease precision.",
    "description": "Explores the molecular biochemistry of CRISPR-Cas9, non-homologous end joining (NHEJ), homology-directed repair (HDR), and prime editing.",
    "syllabus": "Molecular Biology & Biotechnology Curriculum",
    "content": "1. Molecular Mechanism of CRISPR Cleavage:\nThe Clustered Regularly Interspaced Short Palindromic Repeats (CRISPR) system functions in nature as an adaptive immune defense in bacteria against viral infections. The engineered CRISPR-Cas9 platform consists of a catalytic endonuclease (Cas9) and a synthetic single-guide RNA (sgRNA). The sgRNA recognizes a complementary 20-nucleotide target genomic sequence adjacent to a 5'-NGG Protospacer Adjacent Motif (PAM).\n\n2. DNA Repair Pathways (NHEJ vs HDR):\nUpon PAM recognition and R-loop formation, Cas9 introduces a site-specific double-strand break (DSB) 3 base pairs upstream of the PAM. Eukaryotic cells resolve DSBs through two competing repair mechanisms: Non-Homologous End Joining (NHEJ), an error-prone pathway generating insertion/deletion (indel) mutations that knock out genes; and Homology-Directed Repair (HDR), a high-fidelity pathway utilizing donor DNA templates for precise point corrections.\n\n3. Clinical Frontiers:\nCRISPR technology has achieved regulatory approvals for sickle cell disease and beta-thalassemia through ex-vivo gene modification (Casgevy), heralding a new era of curative precision medicine."
  },
  {
    "id": "STU-04",
    "code": "STU-04",
    "title": "Macroeconomic Equilibrium: IS-LM Framework & Monetary Policy Transmission",
    "section": "students",
    "topic": "economics",
    "categoryName": "Economics & Policy",
    "difficulty": "Intermediate",
    "wordCount": 480,
    "coreConcept": "Simultaneous equilibrium across the Goods Market (IS curve) and Money Market (LM curve).",
    "description": "How central bank interest rate interventions, fiscal deficit spending, and liquidity traps shift aggregate demand in modern economies.",
    "syllabus": "Macroeconomics & Public Finance",
    "content": "1. The IS Curve (Goods Market Equilibrium):\nThe Investment-Saving (IS) curve represents combinations of interest rates (r) and aggregate income (Y) such that planned expenditure equals total output: Y = C(Y - T) + I(r) + G. Because higher interest rates increase the cost of capital and dampen investment demand, the IS curve slopes downward.\n\n2. The LM Curve (Money Market Equilibrium):\nThe Liquidity Preference-Money Supply (LM) curve depicts combinations of r and Y where real money demand equals real money supply: M/P = L(r, Y). Because higher national income increases transaction demand for money, interest rates must rise to restore money market equilibrium, giving the LM curve an upward slope.\n\n3. Monetary Transmission Channels:\nCentral bank policy rate cuts reduce nominal yields, stimulating bank lending, asset valuations (Tobin's q), and currency depreciation (boosting net exports). In a Liquidity Trap (near zero-bound rates), conventional monetary policy loses efficacy, necessitating Quantitative Easing (QE) and targeted fiscal stimulus."
  },
  {
    "id": "STU-05",
    "code": "STU-05",
    "title": "Thermodynamics of Green Hydrogen Production: PEM vs Alkaline Electrolysis",
    "section": "students",
    "topic": "science",
    "categoryName": "Renewable Energy & Chemistry",
    "difficulty": "Advanced",
    "wordCount": 500,
    "coreConcept": "Gibbs free energy of water dissociation: ΔG = ΔH - TΔS, requiring 39.4 kWh/kg theoretical electrical energy.",
    "description": "Comparative efficiency analysis of Proton Exchange Membrane (PEM), Alkaline Water Electrolysis (AWE), and Solid Oxide Electrolyzer Cells (SOEC).",
    "syllabus": "Chemical Engineering & Clean Technology",
    "content": "1. Electrochemical Principles of Water Splitting:\nWater electrolysis decomposes water into hydrogen and oxygen through non-spontaneous electrochemical redox reactions:\n2 H₂O(l) → 2 H₂(g) + O₂(g) [ΔH° = +285.8 kJ/mol (Higher Heating Value)].\nThe minimum electrical energy required under standard conditions corresponds to Gibbs free energy change ΔG° = 237.2 kJ/mol, corresponding to a reversible cell voltage E_rev = 1.23 V. At the thermoneutral voltage E_tn = 1.48 V, electrolysis operates without absorbing or releasing net heat.\n\n2. Technology Comparison (PEM vs Alkaline):\n- Alkaline Water Electrolysis (AWE): Uses liquid KOH electrolyte and nickel catalysts. Highly mature and cost-effective, but limited by low current densities (0.2–0.6 A/cm²) and sluggish dynamic response to intermittent renewable solar/wind inputs.\n- Proton Exchange Membrane (PEM): Uses solid perfluorosulfonic acid polymer electrolyte and precious metal catalysts (Pt/Ir). Operates at high current densities (>2.0 A/cm²) and delivers pure, pressurized hydrogen with rapid ramp-up flexibility matching renewable power fluctuations."
  },
  {
    "id": "STU-06",
    "code": "STU-06",
    "title": "Zero Trust Cybersecurity Architecture & Public Key Infrastructure (PKI)",
    "section": "students",
    "topic": "technology",
    "categoryName": "Cybersecurity",
    "difficulty": "Intermediate",
    "wordCount": 470,
    "coreConcept": "\"Never Trust, Always Verify\" principle, micro-segmentation, and asymmetric RSA/ECC cryptographic handshakes.",
    "syllabus": "Computer Networks & Information Security",
    "content": "1. Core Tenets of Zero Trust (NIST SP 800-207):\nTraditional perimeter security assumed all internal corporate network traffic was benign. Zero Trust fundamentally reverses this paradigm through three guiding principles:\n- Explicit Verification: Always authenticate and authorize based on all available data points (identity, device health, location, data classification).\n- Least Privilege Access: Restrict user access with Just-In-Time (JIT) and Just-Enough-Access (JEA) risk-adaptive policies.\n- Assume Breach: Minimize blast radius through micro-segmentation and end-to-end encrypted session communications.\n\n2. Asymmetric Cryptography & TLS 1.3 Handshake:\nPublic Key Infrastructure utilizes mathematical trapdoor functions. RSA relies on the computational hardness of prime factorization, while Elliptic Curve Cryptography (ECC) leverages the Discrete Logarithm problem over elliptic curve fields, achieving equivalent 256-bit security with dramatically smaller key sizes. In TLS 1.3, ephemeral Diffie-Hellman key exchange (ECDHE) guarantees Perfect Forward Secrecy (PFS)."
  },
  {
    "id": "STU-07",
    "code": "STU-07",
    "title": "Behavioral Economics: Prospect Theory, Loss Aversion & Choice Architecture",
    "section": "students",
    "topic": "economics",
    "categoryName": "Behavioral Economics & Psychology",
    "difficulty": "Intermediate",
    "wordCount": 460,
    "coreConcept": "Kahneman & Tversky's value function: losses loom larger than gains (Loss Aversion coefficient λ ≈ 2.25).",
    "description": "How cognitive biases, framing effects, anchoring heuristics, and institutional \"Nudges\" shape real-world economic decision-making.",
    "syllabus": "Economics & Behavioral Science",
    "content": "1. The Breakdown of Expected Utility Theory:\nClassical economics assumed rational agents (Homo economicus) evaluate choices based on final wealth states. Daniel Kahneman and Amos Tversky's Prospect Theory demonstrated that humans evaluate outcomes as gains or losses relative to an internalized subjective reference point.\n\n2. S-Shaped Value Function Properties:\n- Concave in the Domain of Gains: Exhibiting risk aversion when facing positive prospects (preferring a guaranteed $500 over a 50% gamble for $1,000).\n- Convex in the Domain of Losses: Exhibiting risk-seeking behavior to avoid guaranteed losses.\n- Loss Aversion: The value function is steeper for losses than for gains; psychological distress from losing $100 is more than double the pleasure of gaining $100.\n\n3. Choice Architecture and Nudge Theory:\nRichard Thaler popularized Nudges—interventions that alter people's behavior without forbidding choices or changing economic incentives. Automatic opt-in employee pension schemes (Save More Tomorrow) dramatically boost retirement savings rates by leveraging status-quo bias."
  },
  {
    "id": "STU-08",
    "code": "STU-08",
    "title": "Astrophysics: Gravitational Waves, LIGO Interferometry & Black Hole Mergers",
    "section": "students",
    "topic": "science",
    "categoryName": "Astrophysics & Relativity",
    "difficulty": "Advanced",
    "wordCount": 510,
    "coreConcept": "Einstein's General Relativity tensor field equations predicting spacetime ripples propagating at the speed of light.",
    "description": "Laser interferometer precision measurement of subatomic length shifts (10⁻¹⁸ meters), binary black hole inspiral chirps, and multi-messenger astronomy.",
    "syllabus": "Physics & Advanced Astronomy",
    "content": "1. Theoretical Foundations in General Relativity:\nIn 1915, Albert Einstein formulated the gravitational field equations: G_μν = (8πG / c⁴) T_μν, describing how mass-energy curves spacetime. When asymmetric compact masses (binary black holes or neutron stars) accelerate, they emit quadrupolar ripples in spacetime geometry known as Gravitational Waves, causing transverse strain h = ΔL/L propagating at the speed of light c.\n\n2. LIGO Laser Interferometer Technology:\nThe Laser Interferometer Gravitational-Wave Observatory (LIGO) operates Michelson interferometers with 4-kilometer perpendicular arms. Using Fabry-Pérot resonant optical cavities, stabilized 1064 nm Nd:YAG lasers, and quadruple pendulum seismic isolation, LIGO detects strain amplitudes of h ~ 10⁻²¹—measuring length changes smaller than one-thousandth the diameter of a proton.\n\n3. GW150914 Discovery & Multi-Messenger Era:\nOn September 14, 2015, LIGO made the historic first direct detection of gravitational waves from the merger of two black holes (36 M_☉ and 29 M_☉) coalescing into a single spinning black hole, radiating 3 solar masses of energy in pure gravitational waves. Combined with optical telescopes, gravitational wave astronomy now probes the expansion rate of the universe (Hubble constant) and cosmic heavy-element nucleosynthesis."
  },
  {
    "id": "STU-09",
    "code": "STU-09",
    "title": "Neuroscience: Synaptic Plasticity & Long-Term Potentiation (LTP) in Memory",
    "section": "students",
    "topic": "science",
    "categoryName": "Neurobiology & Cognitive Science",
    "difficulty": "Intermediate",
    "wordCount": 480,
    "coreConcept": "Hebb's Postulate (\"neurons that fire together wire together\") and NMDA/AMPA receptor calcium influx dynamics.",
    "syllabus": "Neuroscience & Biomedical Sciences",
    "content": "1. Cellular Basis of Learning (Hebbian Theory):\nLearning and memory formation in the human brain occur through structural and functional modifications of synaptic connections. Long-Term Potentiation (LTP)—first characterized by Bliss and Lømo in the mammalian hippocampus—provides the neurobiological substrate for information storage.\n\n2. Molecular Cascade of LTP Induction:\n- Resting State: Postsynaptic AMPA receptors bind glutamate to permit Na⁺ influx, generating excitatory postsynaptic potentials (EPSPs). NMDA receptors remain blocked by extracellular Magnesium (Mg²⁺) ions.\n- High-Frequency Tetanic Stimulation: Sustained postsynaptic depolarization expels the Mg²⁺ block from NMDA channels, permitting a surge of Calcium (Ca²⁺) into the dendritic spine.\n- Intracellular Signaling: Ca²⁺ activates Calcium/Calmodulin-Dependent Protein Kinase II (CaMKII), triggering the insertion of additional AMPA receptors into the postsynaptic membrane (Early-LTP).\n\n3. Memory Consolidation (Late-LTP):\nPersistent memory stabilization requires gene transcription and de novo protein synthesis. CaMKII activates the transcription factor CREB (cAMP response element-binding protein), inducing dendritic spine enlargement and permanent structural remodeling of neural circuits."
  },
  {
    "id": "STU-10",
    "code": "STU-10",
    "title": "Global Semiconductor Geopolitics & Extreme Ultraviolet (EUV) Lithography",
    "section": "students",
    "topic": "technology",
    "categoryName": "Geopolitics & Technology",
    "difficulty": "Intermediate",
    "wordCount": 490,
    "coreConcept": "13.5 nm EUV light generation via laser-pulsed molten tin droplets and atomic-scale silicon fabrication monopolies.",
    "description": "Strategic analysis of advanced semiconductor supply chains, ASML photolithography, TSMC fabrication dominance, and the CHIPS Act.",
    "syllabus": "International Relations & Technology Policy",
    "content": "1. The Physics of Extreme Ultraviolet (EUV) Lithography:\nAs silicon transistor gate lengths shrank below 7 nanometers, conventional 193 nm deep ultraviolet immersion lithography reached physical diffraction limits. ASML's EUV scanners produce light at a microscopic 13.5 nm wavelength by firing high-power CO₂ lasers at 50,000 molten tin droplets per second in a vacuum chamber, generating high-temperature tin plasma.\n\n2. Precision Optics and Mirrors:\nBecause 13.5 nm EUV light is absorbed by all matter (including air and glass lenses), the optical system relies on specialized Bragg multi-layer mirrors coated with alternating nanometer-thin layers of molybdenum and silicon, polished to sub-atomic tolerances.\n\n3. Geopolitical Supply Chain Bottlenecks:\nLeading-edge 3nm and 2nm semiconductor manufacturing forms a critical chokepoint in global geopolitics:\n- TSMC (Taiwan) manufactures over 90% of the world's most advanced AI and mobile processors.\n- ASML (Netherlands) holds a complete global monopoly on EUV lithography machines.\n- Geopolitical legislation like the US CHIPS and Science Act and European Chips Act aim to geographically diversify fabrication facilities to hedge against cross-strait geopolitical supply shocks."
  }
];

const neetArticles = [
  {
    "id": "NEET-01",
    "code": "NEET-01",
    "title": "Molecular Basis of Inheritance: DNA Replication Machinery & Okazaki Fragment Processing",
    "section": "neet",
    "topic": "Biology",
    "categoryName": "Genetics & Molecular Biology",
    "difficulty": "Advanced",
    "wordCount": 520,
    "coreConcept": "Semi-conservative replication (Meselson-Stahl), DNA Polymerase III proofreading (3'→5' exonuclease), and RNA primer excision via DNA Polymerase I.",
    "syllabus": "NEET Biology: Class 12 Genetics & Evolution",
    "content": "1. The Semi-Conservative Replication Complex:\nDNA replication in eukaryotes and prokaryotes occurs with extreme fidelity (error rate < 1 in 10⁹ bases). DNA Helicase unwinds the double helix at the Replication Fork, while Single-Strand DNA-Binding Proteins (SSBs) stabilize single strands and Topoisomerase (DNA Gyrase) relieves positive supercoiling strain.\n\n2. Leading vs. Lagging Strand Synthesis:\nBecause DNA Polymerases synthesize DNA exclusively in the 5'→3' direction:\n- Leading Strand: Synthesized continuously towards the advancing replication fork requiring a single RNA primer synthesized by RNA Primase.\n- Lagging Strand: Synthesized discontinuously away from the replication fork as short Okazaki fragments (1000–2000 nt in prokaryotes, 100–200 nt in eukaryotes).\n\n3. Primer Removal & Nick Ligation:\nDNA Polymerase I uses 5'→3' exonuclease activity to remove RNA primers and fills the gaps with deoxyribonucleotides. Finally, DNA Ligase catalyzes phosphodiester bond formation between adjacent 3'-OH and 5'-phosphate ends utilizing ATP/NAD⁺.\n\n4. High-Yield NEET Takeaways:\n- Helicase unzips hydrogen bonds between nitrogenous bases (A=T with 2 H-bonds, G≡C with 3 H-bonds).\n- DNA Polymerase III is the main catalytic enzyme for elongation; DNA Polymerase I performs proofreading and primer removal."
  },
  {
    "id": "NEET-02",
    "code": "NEET-02",
    "title": "Human Cardiovascular Physiology: Cardiac Cycle, ECG Waves & Blood Pressure Regulation",
    "section": "neet",
    "topic": "Biology",
    "categoryName": "Human Physiology",
    "difficulty": "Intermediate",
    "wordCount": 500,
    "coreConcept": "SA node pacemaker potential, P-QRS-T wave mapping on standard 12-lead ECG, and RAAS hormonal blood pressure feedback.",
    "syllabus": "NEET Biology: Class 11 Body Fluids and Circulation",
    "content": "1. Sequential Phases of the Cardiac Cycle (Duration: 0.8 seconds at 72 bpm):\n- Joint Diastole (0.4 s): All four chambers relaxed; AV valves open; 70% of ventricular filling occurs passively.\n- Atrial Systole (0.1 s): SA node fires; atria contract, pumping the remaining 30% of blood into ventricles (atrial kick).\n- Ventricular Systole (0.3 s): Isovolumetric contraction closes AV valves (First Heart Sound \"LUB\"); ventricular ejection opens semilunar valves (Stroke Volume ≈ 70 mL; Cardiac Output = 70 mL × 72 bpm ≈ 5 L/min).\n- Isovolumetric Relaxation: Ventricles relax; closure of semilunar valves generates the Second Heart Sound (\"DUB\").\n\n2. Electrocardiogram (ECG) Deflection Waves:\n- P Wave: Atrial depolarization (triggered by Sinoatrial SA node).\n- QRS Complex: Rapid ventricular depolarization (AV bundle → Bundle of His → Purkinje fibers).\n- T Wave: Ventricular repolarization (recovery phase).\n\n3. Hormonal Blood Pressure Regulation (RAAS System):\nA drop in glomerular blood flow triggers Juxtaglomerular (JG) cells to release Renin, converting Angiotensinogen → Angiotensin I. ACE converts it to Angiotensin II (a potent vasoconstrictor), stimulating the Adrenal Cortex to secrete Aldosterone (reabsorbing Na⁺ and H₂O in DCT)."
  },
  {
    "id": "NEET-03",
    "code": "NEET-03",
    "title": "Chemical Bonding & Hybridization: VSEPR Geometry, Molecular Orbital Theory (MOT)",
    "section": "neet",
    "topic": "Chemistry",
    "categoryName": "Inorganic Chemistry",
    "difficulty": "Intermediate",
    "wordCount": 480,
    "coreConcept": "Bond order calculation: BO = ½(N_b - N_a), predicting paramagnetic behavior in O₂ and B₂ molecules.",
    "syllabus": "NEET Chemistry: Chemical Bonding & Molecular Structure",
    "content": "1. Valence Shell Electron Pair Repulsion (VSEPR) Theory:\nElectron pairs around a central atom repel each other to adopt geometries that minimize electrostatic repulsion. The order of repulsion strength is:\nLone Pair - Lone Pair > Lone Pair - Bond Pair > Bond Pair - Bond Pair.\n- NH₃: sp³ hybridized (3 bond pairs + 1 lone pair) → Trigonal Pyramidal (Bond angle: 107° due to lp-bp repulsion).\n- H₂O: sp³ hybridized (2 bond pairs + 2 lone pairs) → Bent / V-Shaped (Bond angle: 104.5°).\n- SF₄: sp³d hybridized (4 bp + 1 lp in equatorial position) → See-Saw geometry.\n\n2. Molecular Orbital Theory (MOT) Principles:\nAtomic orbitals combine linearly (LCAO) to form Bonding (σ, π) and Anti-bonding (σ*, π*) molecular orbitals.\n- For molecules with ≤ 14 electrons (B₂, C₂, N₂): Energy order is σ1s < σ*1s < σ2s < σ*2s < (π2p_x = π2p_y) < σ2p_z < (π*2p_x = π*2p_y) < σ*2p_z.\n- For molecules with > 14 electrons (O₂, F₂): Energy order is σ1s < σ*1s < σ2s < σ*2s < σ2p_z < (π2p_x = π2p_y) < (π*2p_x = π*2p_y) < σ*2p_z.\n- Paramagnetism of O₂: O₂ has 16 electrons; the last two electrons occupy degenerate π*2p_x and π*2p_y singly, confirming experimental paramagnetism."
  },
  {
    "id": "NEET-04",
    "code": "NEET-04",
    "title": "Ray Optics & Optical Instruments: Lens Maker's Formula & Compound Microscope Magnification",
    "section": "neet",
    "topic": "Physics",
    "categoryName": "Ray Optics",
    "difficulty": "Advanced",
    "wordCount": 490,
    "coreConcept": "Lens Maker's Formula: 1/f = (μ - 1)(1/R₁ - 1/R₂), and total magnifying power of compound optical systems.",
    "syllabus": "NEET Physics: Ray Optics & Optical Instruments",
    "content": "1. Lens Maker's Equation:\nFor a thin lens of refractive index μ₂ placed in a medium of refractive index μ₁ with surfaces of radius of curvature R₁ and R₂, the focal length f is given by:\n1/f = ((μ₂/μ₁) - 1) × [1/R₁ - 1/R₂].\nSign Convention: For a biconvex lens, R₁ is positive (+), and R₂ is negative (-). Therefore, 1/f = (μ - 1)(1/R₁ + 1/R₂), confirming that a convex lens has a positive focal length in air.\n\n2. Compound Microscope Ray Diagram & Magnification:\nA compound microscope consists of an Objective lens (small focal length f_o, small aperture) and an Eyepiece lens (larger focal length f_e, larger aperture).\n- Total Magnification (at least distance of distinct vision D = 25 cm):\n  m = m_o × m_e = (-L / f_o) × (1 + D / f_e), where L is the tube length.\n- Total Magnification (at normal adjustment / image at infinity):\n  m = (-L / f_o) × (D / f_e)."
  },
  {
    "id": "NEET-05",
    "code": "NEET-05",
    "title": "Biomolecules & Enzyme Kinetics: Michaelis-Menten Equation & Competitive Inhibition",
    "section": "neet",
    "topic": "Biology",
    "categoryName": "Biochemistry & Biomolecules",
    "difficulty": "Intermediate",
    "wordCount": 470,
    "coreConcept": "V_max and K_m relationships, competitive inhibition (K_m increases, V_max unchanged), and allosteric feedback regulation.",
    "syllabus": "NEET Biology & Chemistry: Biomolecules & Enzymes",
    "content": "1. Enzyme Catalysis Mechanism:\nEnzymes are biocatalysts that accelerate reaction rates by lowering the Activation Energy (E_a) barrier without altering the equilibrium constant (K_eq) or standard Gibbs free energy (ΔG°).\n\n2. Michaelis-Menten Kinetics:\nThe reaction velocity v as a function of substrate concentration [S] is modeled as:\nv = (V_max [S]) / (K_m + [S]), where K_m (Michaelis constant) is the substrate concentration at which the reaction velocity reaches half of V_max (v = V_max / 2). A lower K_m reflects higher substrate affinity.\n\n3. Enzyme Inhibition Classification:\n- Competitive Inhibition: The inhibitor resembles the substrate and competes for the active catalytic site (e.g. Malonate inhibiting Succinate Dehydrogenase). Effect: K_m increases (lower apparent affinity), but V_max remains unchanged (can be overcome by excess substrate).\n- Non-Competitive Inhibition: Inhibitor binds to an allosteric site (e.g. Cyanide on Cytochrome Oxidase). Effect: V_max decreases, while K_m remains unchanged."
  }
];

const jeeArticles = [
  {
    "id": "JEE-01",
    "code": "JEE-01",
    "title": "Rotational Dynamics: Moment of Inertia Tensors & Parallel/Perpendicular Axis Theorems",
    "section": "jee",
    "topic": "Physics",
    "categoryName": "Classical Mechanics",
    "difficulty": "Advanced",
    "wordCount": 520,
    "coreConcept": "Torque-angular acceleration relation τ = Iα, rolling without slipping v_cm = Rω, and angular momentum conservation.",
    "syllabus": "JEE Advanced Physics: Mechanics & Rotational Motion",
    "content": "1. Theorems of Moment of Inertia:\n- Parallel Axis Theorem: For any rigid body of mass M, the moment of inertia about an axis parallel to a central axis passing through the Center of Mass (CM) is:\n  I = I_cm + M d², where d is the perpendicular distance between axes.\n- Perpendicular Axis Theorem (Planar Lamina Only): For a two-dimensional sheet in the xy-plane:\n  I_z = I_x + I_y.\n\n2. Pure Rolling Without Slipping on an Incline:\nWhen a symmetric body (sphere, cylinder, ring) of mass M, radius R, and radius of gyration k rolls down an incline of angle θ without slipping:\n- Acceleration of Center of Mass: a_cm = (g sin θ) / (1 + k²/R²).\n- Minimum Coefficient of Friction Required: μ_min = (tan θ) / (1 + R²/k²).\n- Fraction of Total Kinetic Energy in Rotation: K_rot / K_total = (k²/R²) / (1 + k²/R²).\n\n3. Angular Momentum Conservation:\nWhen net external torque about an axis is zero (Στ_ext = 0), total angular momentum L = Iω = constant. This governs central-force planetary orbits and inelastic collision simulations."
  },
  {
    "id": "JEE-02",
    "code": "JEE-02",
    "title": "Electromagnetic Induction & Maxwell's Equations: Faraday's Law & Poynting Vector",
    "section": "jee",
    "topic": "Physics",
    "categoryName": "Electrodynamics",
    "difficulty": "Advanced",
    "wordCount": 510,
    "coreConcept": "Differential form of Faraday's Law ∇ × E = -∂B/∂t and Displacement Current in Ampère-Maxwell equation.",
    "syllabus": "JEE Main & Advanced Physics: Electromagnetism",
    "content": "1. Faraday-Lenz Law of Induction:\nInduced electromotive force (emf) is proportional to the negative time rate of change of magnetic flux:\nε = -dΦ_B / dt = -d/dt [∫ B · dA].\nLenz's Law ensures energy conservation: the induced current flows in a direction such that its own magnetic field opposes the change in flux producing it.\n\n2. Motional EMF and Self-Inductance:\nFor a conducting rod of length L moving with velocity v perpendicular to a uniform magnetic field B: ε = B v L.\nMagnetic Energy stored in an inductor: U = ½ L I², with magnetic energy density u_B = B² / (2μ₀).\n\n3. Maxwell's Correction & Displacement Current:\nJames Clerk Maxwell identified an inconsistency in Ampère's circuital law during capacitor charging:\nDisplacement Current I_d = ε₀ (dΦ_E / dt).\nThe Poynting Vector S = (1/μ₀) (E × B) represents the directional energy flux density (watts per square meter) of propagating electromagnetic waves."
  },
  {
    "id": "JEE-03",
    "code": "JEE-03",
    "title": "Chemical Kinetics & Arrhenius Activation Energy: Order, Molecularity & Steady State",
    "section": "jee",
    "topic": "Chemistry",
    "categoryName": "Physical Chemistry",
    "difficulty": "Intermediate",
    "wordCount": 490,
    "coreConcept": "Integrated rate laws, half-life formulas (t_1/2 = ln 2 / k for 1st order), and Arrhenius equation: k = A e^(-E_a / RT).",
    "syllabus": "JEE Chemistry: Chemical Kinetics",
    "content": "1. Integrated Rate Laws:\n- Zero Order (Rate = k): [A]_t = [A]_0 - k t; Half-life t_1/2 = [A]_0 / (2k) (depends directly on initial concentration).\n- First Order (Rate = k[A]): ln([A]_t / [A]_0) = -k t; Half-life t_1/2 = (ln 2) / k ≈ 0.693 / k (independent of initial concentration).\n- Second Order (Rate = k[A]²): 1/[A]_t - 1/[A]_0 = k t; Half-life t_1/2 = 1 / (k [A]_0).\n\n2. Temperature Dependence (Arrhenius Equation):\nk = A exp(-E_a / (R T)), where A is the pre-exponential frequency factor and E_a is the activation energy.\nLogarithmic Form: ln(k₂ / k₁) = (E_a / R) × [(T₂ - T₁) / (T₁ T₂)].\nA catalyst provides an alternative reaction pathway with lower activation energy (E_a'), accelerating both forward and reverse reaction rates equally without shifting equilibrium."
  },
  {
    "id": "JEE-04",
    "code": "JEE-04",
    "title": "Advanced Calculus: Definite Integrals as Limits of Sums & Leibniz Differentiation Rule",
    "section": "jee",
    "topic": "Mathematics",
    "categoryName": "Integral Calculus",
    "difficulty": "Advanced",
    "wordCount": 480,
    "coreConcept": "Newton-Leibniz formula for differentiation under the integral sign and Riemann sum conversions.",
    "syllabus": "JEE Advanced Mathematics: Integral Calculus",
    "content": "1. Leibniz Rule of Differentiation Under the Integral Sign:\nIf F(x) = ∫_{u(x)}^{v(x)} f(x, t) dt, then:\ndF/dx = f(x, v(x)) · v'(x) - f(x, u(x)) · u'(x) + ∫_{u(x)}^{v(x)} [∂f(x, t) / ∂x] dt.\nThis rule is vital for solving differential equations and evaluating integrals with variable limits.\n\n2. Definite Integral as Limit of a Riemann Sum:\nlim_{n → ∞} Σ_{r=1}^{n} (1/n) f(r/n) = ∫₀¹ f(x) dx.\nConversion Protocol:\n- Replace r/n with x.\n- Replace 1/n with dx.\n- Limits of integration: Lower limit = lim_{n→∞} (r_min / n), Upper limit = lim_{n→∞} (r_max / n).\n\n3. King's Property (Definite Integral Symmetry):\n∫_a^b f(x) dx = ∫_a^b f(a + b - x) dx.\nIf f(x) + f(a + b - x) = C (constant), then I = ½ C (b - a)."
  },
  {
    "id": "JEE-05",
    "code": "JEE-05",
    "title": "Coordination Chemistry & Crystal Field Theory (CFT): d-Orbital Splitting & Isomerism",
    "section": "jee",
    "topic": "Chemistry",
    "categoryName": "Inorganic Chemistry",
    "difficulty": "Advanced",
    "wordCount": 500,
    "coreConcept": "Octahedral (Δ_o) vs Tetrahedral (Δ_t = 4/9 Δ_o) crystal field splitting, Spectrochemical series, and CFSE calculation.",
    "syllabus": "JEE Chemistry: Coordination Compounds",
    "content": "1. Crystal Field Splitting in Octahedral Complexes:\nUnder the electrostatic field of 6 ligands approaching along Cartesian axes, the five degenerate d-orbitals split into two sets:\n- e_g set (d_x²-y², d_z²): Higher energy (+0.6 Δ_o) due to direct axial repulsion.\n- t_2g set (d_xy, d_yz, d_xz): Lower energy (-0.4 Δ_o) lying between Cartesian axes.\n\n2. Crystal Field Stabilization Energy (CFSE):\nCFSE = [-0.4 n(t_2g) + 0.6 n(e_g)] Δ_o + m P, where P is the pairing energy.\n- Strong Field Ligands (CN⁻, CO, en): Δ_o > P → Low-spin complexes (electrons pair in t_2g before occupying e_g).\n- Weak Field Ligands (I⁻, Br⁻, F⁻, H₂O): Δ_o < P → High-spin complexes (Hund's rule followed).\n\n3. Magnetic Moments:\nSpin-only magnetic moment μ = √(n(n + 2)) Bohr Magnetons (BM), where n is the count of unpaired d-electrons."
  }
];

const satArticles = [
  {
    "id": "SAT-01",
    "code": "SAT-01",
    "title": "Digital SAT Reading & Writing: Craft and Structure & Transition Word Mastery",
    "section": "sat",
    "topic": "Reading & Writing",
    "categoryName": "SAT Verbal",
    "difficulty": "Intermediate",
    "wordCount": 510,
    "coreConcept": "Mastering logical connectors across Contrast (However, Nonetheless), Cause/Effect (Consequently, Hence), and Addition (Furthermore).",
    "syllabus": "Digital SAT Reading and Writing: Expression of Ideas",
    "content": "1. The 3 Fundamental Categories of Transition Words:\nThe Digital SAT heavily tests transitions between sentences. To identify the correct transition:\nStep 1: Read the first sentence and summarize its core claim in 3 words.\nStep 2: Read the second sentence and identify whether it continues, contradicts, or explains the first.\n\n- Contrast / Concession: However, Nevertheless, Conversely, Nonetheless, On the contrary, By contrast.\n- Cause and Effect: Consequently, Therefore, Hence, Thus, Accordingly, As a result.\n- Addition / Elaboration: Furthermore, Moreover, In addition, In fact, Indeed, Specifically.\n\n2. Eliminating Synonymous Answer Traps:\nIf two answer choices belong to the exact same category and have identical meaning (e.g., Choice A: \"Furthermore\", Choice B: \"Moreover\"), BOTH must be incorrect! Look for the distinct relationship."
  },
  {
    "id": "SAT-02",
    "code": "SAT-02",
    "title": "Digital SAT Math: Quadratic Equations, Vertex Form & Discriminant Analysis",
    "section": "sat",
    "topic": "Math",
    "categoryName": "SAT Math",
    "difficulty": "Intermediate",
    "wordCount": 490,
    "coreConcept": "Parabola vertex coordinates (-b/2a, f(-b/2a)), vertex form y = a(x - h)² + k, and discriminant Δ = b² - 4ac solutions.",
    "syllabus": "Digital SAT Math: Passport to Advanced Math",
    "content": "1. The Three Forms of Quadratic Functions:\n- Standard Form: y = a x² + b x + c (y-intercept is (0, c)). Axis of symmetry is x = -b / (2a).\n- Factored / Intercept Form: y = a (x - r₁) (x - r₂) (x-intercepts are r₁ and r₂). The vertex x-coordinate lies midway at (r₁ + r₂) / 2.\n- Vertex Form: y = a (x - h)² + k (Vertex is (h, k)). If a > 0, the parabola opens upward with minimum value k; if a < 0, it opens downward with maximum value k.\n\n2. Discriminant Rules (Δ = b² - 4ac):\nFor quadratic equation a x² + b x + c = 0:\n- Δ > 0: Exactly two distinct real solutions (parabola intersects x-axis twice).\n- Δ = 0: Exactly one real solution / repeated root (parabola is tangent to x-axis at vertex).\n- Δ < 0: No real solutions (two complex solutions; parabola never crosses x-axis).\n\n3. Desmos Calculator Strategy:\nGraph the equation directly in the built-in Desmos graphing calculator to visually find intersections and minimum/maximum points in seconds."
  },
  {
    "id": "SAT-03",
    "code": "SAT-03",
    "title": "Digital SAT Writing: Standard English Conventions (Punctuation & Comma Splices)",
    "section": "sat",
    "topic": "Reading & Writing",
    "categoryName": "SAT Grammar",
    "difficulty": "Intermediate",
    "wordCount": 480,
    "coreConcept": "Connecting independent clauses with semicolons, FANBOYS conjunctions, and avoiding comma splices.",
    "syllabus": "Digital SAT: Standard English Conventions",
    "content": "1. Independent Clauses & Sentence Boundaries:\nAn independent clause contains a subject and a verb and can stand alone as a complete thought.\n- Rule: Two independent clauses CANNOT be joined by a comma alone (Comma Splice Error).\n\n2. Valid Methods to Connect Two Independent Clauses:\n(1) Period: [Clause 1]. [Clause 2].\n(2) Semicolon: [Clause 1]; [Clause 2].\n(3) Comma + FANBOYS: [Clause 1], for/and/nor/but/or/yet/so [Clause 2].\n(4) Colon / Em-Dash: [Clause 1]: [Explanation / List].\n\n3. Non-Essential Clauses (Parenthetical Elements):\nClauses that provide extra, non-essential description must be set off by matching punctuation on both sides:\n- Two commas: \"Dr. Chen, who discovered the fossil, published her paper.\"\n- Two em-dashes: \"The expedition—despite severe blizzards—reached the summit.\"\n- Two parentheses: \"The ancient text (translated in 1920) is preserved in Rome.\""
  },
  {
    "id": "SAT-04",
    "code": "SAT-04",
    "title": "Digital SAT Math: Exponential Growth, Compound Interest & Percentage Models",
    "section": "sat",
    "topic": "Math",
    "categoryName": "SAT Math",
    "difficulty": "Intermediate",
    "wordCount": 470,
    "coreConcept": "Exponential model f(t) = a(1 ± r)^t, continuous decay half-lives, and compound interest formulas.",
    "syllabus": "Digital SAT Math: Problem Solving and Data Analysis",
    "content": "1. The Exponential Growth & Decay Blueprint:\nf(t) = a · (1 ± r)^t, or f(t) = a · b^t:\n- a = Initial starting value at t = 0 (y-intercept).\n- r = Growth rate (expressed as decimal).\n- b = (1 + r) for growth (b > 1); b = (1 - r) for decay (0 < b < 1).\n\n2. Key SAT Trap (Percent Increase vs Factor):\n- \"Increases by 35% every year\": Growth factor is 1 + 0.35 = 1.35 → f(t) = a (1.35)^t.\n- \"Increases by a factor of 4 every 3 years\": f(t) = a · 4^(t / 3).\n- \"Decreases by 20% every month\": Decay factor is 1 - 0.20 = 0.80 → f(t) = a (0.80)^t.\n\n3. Compound Interest Formula:\nA = P (1 + r/n)^(n t), where P is principal, r is annual interest rate, n is compounding frequency per year (n = 12 for monthly, n = 4 for quarterly), and t is time in years."
  }
];

const ieltsArticles = [
  {
    "id": "IELTS-01",
    "code": "IELTS-01",
    "title": "IELTS Academic Writing Task 2: Opinion vs Discussion Essay Architecture",
    "section": "ielts",
    "topic": "writing",
    "categoryName": "IELTS Writing Task 2",
    "difficulty": "Advanced",
    "wordCount": 520,
    "coreConcept": "Band 9 Coherence & Cohesion: 4-paragraph structural blueprint, clear thesis formulation, and logical topic-sentence expansion.",
    "description": "Master the exact structural formula for \"To what extent do you agree/disagree\" and \"Discuss both views and give your opinion\" essays.",
    "syllabus": "IELTS Academic & General Training Writing",
    "content": "1. Deconstructing the Essay Prompt:\nIELTS Writing Task 2 accounts for 66% of your total Writing score. The most common error candidates make is failing to present a clear, consistent position throughout the response (Task Achievement Band 7+ requirement).\n\n2. The 4-Paragraph Band 9 Structural Formula:\n- Introduction (40-50 words):\n  Sentence 1: Paraphrase the prompt using academic synonyms.\n  Sentence 2: Clear thesis statement outlining your definitive position.\n  Sentence 3: Outline sentence previewing main supporting arguments.\n\n- Body Paragraph 1 (90-100 words):\n  Topic Sentence: Introduce Point 1.\n  Explanation: Elucidate why this occurs using causal linking phrases (e.g., \"This stems from the reality that...\").\n  Evidence/Example: Provide a specific illustrative example.\n  Concluding Impact: Conclude the paragraph linking back to your central thesis.\n\n- Body Paragraph 2 (90-100 words):\n  Topic Sentence: Introduce Point 2 (or the opposing viewpoint).\n  Explanation: Analyze implications in depth.\n  Evidence/Example: Ground the argument in real-world context.\n  Impact: Synthesize the point.\n\n- Conclusion (30-40 words):\n  Restate thesis in novel language and summarize main points. Never introduce new arguments in the conclusion.\n\n3. High-Band Cohesive Phrases:\nUse sophisticated discourse markers: \"Inextricably linked to\", \"Pivotal catalyst\", \"It is widely contended that\", \"A compelling justification for this is\"."
  },
  {
    "id": "IELTS-02",
    "code": "IELTS-02",
    "title": "IELTS Reading Mastery: True / False / Not Given & Paragraph Heading Match",
    "section": "ielts",
    "topic": "reading",
    "categoryName": "IELTS Reading",
    "difficulty": "Advanced",
    "wordCount": 500,
    "coreConcept": "Strict demarcation between direct contradiction (FALSE) and absence of verifiable textual evidence (NOT GIVEN).",
    "description": "Essential strategies to conquer the most challenging question types in IELTS Academic Reading passages under 20-minute time limits.",
    "syllabus": "IELTS Academic Reading Module",
    "content": "1. The Logical Anatomy of True / False / Not Given:\n- TRUE: The statement strictly matches the information and nuance in the text.\n- FALSE: The statement directly contradicts the facts or claims asserted by the author.\n- NOT GIVEN: The passage neither confirms nor contradicts the statement; the specific comparison or detail is entirely absent.\n\n2. Common Traps to Avoid:\n- The Extreme Qualifier Trap: Watch for words like \"all\", \"only\", \"always\", \"impossible\". If the text states \"most species exhibit\", but the question states \"all species exhibit\", the answer is FALSE.\n- The Plausible Assumption Trap: Do not use outside real-world knowledge. Even if a statement is factually true in real life, if the passage does not mention it, it MUST be marked NOT GIVEN.\n\n3. Heading Matching Strategy (Skimming for Topic Sentences):\nRead the first and last two sentences of each paragraph to identify the overarching main idea. Do not get bogged down by unfamiliar technical jargon—focus on communicative intent and logical progression."
  },
  {
    "id": "IELTS-03",
    "code": "IELTS-03",
    "title": "Band 8+ Academic Vocabulary Masterclass: 30 High-Yield Collocations & Idioms",
    "section": "ielts",
    "topic": "vocabulary",
    "categoryName": "Lexical Resource",
    "difficulty": "Advanced",
    "wordCount": 510,
    "coreConcept": "Natural academic collocations, precision adjectives, and avoiding cliché informal expressions.",
    "description": "A curated glossary of high-band vocabulary for Environmental, Educational, Economic, and Technological IELTS essays.",
    "syllabus": "IELTS Lexical Resource Band 8-9 Criteria",
    "content": "1. Environmental & Urbanization Topics:\n- \"Precipitous decline\" (rapid drop) — \"The species has suffered a precipitous decline in population.\"\n- \"Mitigate the ramifications\" (reduce consequences) — \"Governments must implement carbon taxes to mitigate the ramifications of global warming.\"\n- \"Irreversible ecological degradation\" — \"Unchecked deforestation leads to irreversible ecological degradation.\"\n- \"Sustainable urban sprawl\" — \"Urban planners must curb unchecked urban sprawl.\"\n\n2. Technology & Innovation Topics:\n- \"Pervasive influence\" (widespread effect) — \"Artificial intelligence exerts a pervasive influence on modern labor markets.\"\n- \"Catalyst for economic prosperity\" — \"Digital infrastructure acts as a catalyst for economic prosperity.\"\n- \"Ethical dilemmas\" — \"Genetic modification raises profound ethical dilemmas regarding human intervention.\"\n- \"Obsolescence\" (becoming outdated) — \"Technological rapid obsolescence creates mounting electronic waste.\"\n\n3. Education & Society Topics:\n- \"Foster critical thinking\" — \"Curriculums should foster critical thinking rather than rote memorization.\"\n- \"Exacerbate socio-economic disparities\" — \"Disparate access to technology threatens to exacerbate socio-economic disparities.\"\n- \"Paramount importance\" — \"Early childhood education is of paramount importance in cognitive development.\""
  },
  {
    "id": "IELTS-04",
    "code": "IELTS-04",
    "title": "IELTS Academic Writing Task 1: Describing Complex Trends, Maps & Processes",
    "section": "ielts",
    "topic": "writing",
    "categoryName": "IELTS Writing Task 1",
    "difficulty": "Intermediate",
    "wordCount": 480,
    "coreConcept": "Essential Overview paragraph, accurate trend vocabulary, and comparative grouping strategies.",
    "description": "How to score Band 8+ in Task 1 reports by grouping data logically, describing fluctuations accurately, and writing a flawless Overview.",
    "syllabus": "IELTS Academic Writing Task 1",
    "content": "1. The Indispensable Overview (Band 7+ Requirement):\nWithout an Overview paragraph summarizing the main upward/downward trends, key outliers, or major transformations, your Task Achievement score is strictly capped at Band 5. Always place your Overview immediately after the Introduction.\n\n2. Precise Trend Vocabulary:\n- Upward: \"witnessed a steady upward trajectory\", \"surged exponentially\", \"peaked at approximately 80%\".\n- Downward: \"plummeted dramatically\", \"experienced a gradual downturn\", \"bottomed out at 15 units\".\n- Stability / Fluctuations: \"remained relatively plateaued\", \"fluctuated wildly between 20% and 55%\".\n\n3. Process & Map Descriptions:\n- Process Diagrams: Use passive voice (\"Water is channeled into the filtration unit where impurities are extracted\").\n- Map Comparisons: Use compass directions and urban vocabulary (\"The northern agrarian zone was demolished to make way for commercial high-rises\")."
  },
  {
    "id": "IELTS-05",
    "code": "IELTS-05",
    "title": "IELTS Speaking Part 2 & 3: Fluency, Coherence & Abstract Topic Elaboration",
    "section": "ielts",
    "topic": "speaking",
    "categoryName": "IELTS Speaking",
    "difficulty": "Intermediate",
    "wordCount": 470,
    "coreConcept": "The P.E.E.L method (Point, Explain, Example, Link) for Part 3 abstract discussion questions.",
    "description": "Proven strategies for structuring 2-minute Part 2 Cue Cards and answering challenging Part 3 philosophical questions with poise.",
    "syllabus": "IELTS Speaking Test Preparation",
    "content": "1. Part 2 Cue Card Strategy (The 1-Minute Note-Taking Method):\nDivide your preparation paper into 4 quadrants corresponding to the prompt bullet points (Who/What, When, Where, Why/Significance). Write keywords and high-band adjectives rather than full sentences. Use storytelling techniques with varied narrative tenses (Past Continuous, Past Perfect) to maintain smooth fluency for a full 120 seconds.\n\n2. Part 3 Abstract Discussion (The P.E.E.L Formula):\nIn Part 3, the examiner evaluates your ability to discuss broad societal themes rather than personal anecdotes:\n- Point: Give a direct, academic answer (\"In my estimation, societal attitudes towards remote work have shifted irrevocably.\").\n- Explain: Clarify the underlying rationale (\"This is primarily because employees value autonomy...\").\n- Example: Provide a macroeconomic or cultural illustration (\"For instance, in major financial hubs...\").\n- Link: Tie back to the examiner's core question."
  }
];

const toeflArticles = [
  {
    "id": "TOEFL-01",
    "code": "TOEFL-01",
    "title": "TOEFL Integrated Writing: Reconciling Academic Reading with Lecture Refutations",
    "section": "toefl",
    "topic": "writing",
    "categoryName": "TOEFL Integrated Writing",
    "difficulty": "Advanced",
    "wordCount": 520,
    "coreConcept": "Systematic 3-point contrastive synthesis: Point-by-point refutation templates demonstrating advanced listening comprehension.",
    "description": "Master the 20-minute Integrated Writing Task by seamlessly contrasting the professor's spoken counterpoints against the reading passage.",
    "syllabus": "TOEFL iBT Writing Section",
    "content": "1. The Core Architecture of the Integrated Writing Task:\nIn the TOEFL Integrated Writing task, you are given 3 minutes to read an academic passage (250-300 words), followed by a 2-minute lecture where a professor directly challenges and refutes the three main claims of the reading. Your objective is not to express personal opinion, but to summarize how the lecture casts doubt on the reading.\n\n2. The 4-Paragraph Contrastive Template:\n- Introduction: State the central topic and explicitly mention that the lecturer contradicts/casts doubt on the assertions made in the reading.\n- Body Paragraph 1 (Point 1):\n  First, the reading claims that [Reading Point 1]. However, the professor refutes this by explaining that [Lecture Counterpoint 1], demonstrating that [Elaboration].\n- Body Paragraph 2 (Point 2):\n  Secondly, although the author suggests that [Reading Point 2], the speaker casts serious doubt on this assumption. She argues that [Lecture Counterpoint 2].\n- Body Paragraph 3 (Point 3):\n  Finally, the reading asserts that [Reading Point 3]. On the contrary, the lecturer points out that [Lecture Counterpoint 3].\n\n3. Essential Transition & Reporting Verbs:\nUse varied academic attribution verbs: \"The lecturer contends\", \"The speaker challenges the notion\", \"The professor puts forward evidence\", \"Directly undermines the claim\"."
  },
  {
    "id": "TOEFL-02",
    "code": "TOEFL-02",
    "title": "TOEFL Reading Mastery: Rhetorical Purpose, Negative Factual & Inference Questions",
    "section": "toefl",
    "topic": "reading",
    "categoryName": "TOEFL Reading",
    "difficulty": "Advanced",
    "wordCount": 500,
    "coreConcept": "Deconstructing \"Why does the author mention...?\" and \"Which of the following is NOT true?\" questions.",
    "description": "Proven analytical techniques for navigating high-density academic passages on Earth Sciences, Paleontology, and Art History.",
    "syllabus": "TOEFL iBT Reading Section",
    "content": "1. Rhetorical Purpose Questions (\"Why does the author mention X?\"):\nRhetorical purpose questions test your comprehension of the author's logical intent rather than simple factual retrieval.\n- Strategy: Look at the sentence preceding or following the reference. Authors almost always introduce examples, quotes, or statistics to illustrate, support, or clarify a broader topic sentence claim.\n\n2. Negative Factual Information (\"EXCEPT / NOT mentioned\"):\n- Strategy: Scan the paragraph for the three answer choices that ARE directly mentioned or supported in the text. Cross them out. The remaining choice—either because it is contradicted by the passage or completely unmentioned—is the correct answer.\n\n3. Sentence Insertion (Square [■] Placement Questions):\n- Look for discourse cohesive anchors in the target sentence: demonstrative pronouns (\"these findings\", \"this anomaly\"), definite articles (\"the subsequent phase\"), or contrastive transitions (\"However\", \"Consequently\"). The target sentence must logically bridge the sentence before and after the square."
  },
  {
    "id": "TOEFL-03",
    "code": "TOEFL-03",
    "title": "Academic Discourse & Lecture Listening: Identifying Speaker Stance & Implication",
    "section": "toefl",
    "topic": "listening",
    "categoryName": "TOEFL Listening",
    "difficulty": "Intermediate",
    "wordCount": 480,
    "coreConcept": "Recognizing professor digressions, tone shifts, rhetorical questions, and pragmatic meaning in university lectures.",
    "description": "Note-taking shorthand techniques and recognizing acoustic cues that indicate high-yield testable lecture points.",
    "syllabus": "TOEFL iBT Listening Module",
    "content": "1. Structural Clues in Academic Lectures:\nProfessors in TOEFL listening passages structure lectures using standard pedagogical signposts:\n- Definition & Classification: \"Today we will examine three distinct hypotheses explaining...\"\n- Cause and Effect: \"What led to this rapid speciation event? Well, geologists discovered...\"\n- Digression & Re-focus: \"Now, that brings up an interesting side point, but getting back to...\"\n\n2. Pragmatic Understanding (\"What does the professor imply when he says...?\"):\nThese questions evaluate intonation, irony, and implicit hesitation. When a professor pauses and asks, \"Are we sure about that?\", they are subtly signaling skepticism regarding an established theory rather than asking a literal question.\n\n3. Two-Column Note-Taking Shorthand:\nDivide your notepad into \"Concept / Theory\" on the left and \"Evidence / Professor Critique\" on the right. Use arrows (→ for causality, ↑ for increase, ↓ for decrease, ≠ for contrast) to capture ideas without losing pace with the audio stream."
  },
  {
    "id": "TOEFL-04",
    "code": "TOEFL-04",
    "title": "TOEFL Academic Lexicon: 40 Essential Terms for Biology, Geology & Social Sciences",
    "section": "toefl",
    "topic": "vocabulary",
    "categoryName": "TOEFL Academic Vocabulary",
    "difficulty": "Advanced",
    "wordCount": 510,
    "coreConcept": "Cross-disciplinary academic lexicon essential for understanding university textbook passages and lectures.",
    "description": "High-frequency vocabulary breakdown with definitions, morphological roots, and contextual academic sentences.",
    "syllabus": "TOEFL Academic Vocabulary Mastery",
    "content": "1. Earth Sciences & Geology:\n- \"Sedimentation\" (noun) — The process of settling or being deposited as a sediment. \"Over millions of years, sedimentation compacted organic matter into shale.\"\n- \"Stratification\" (noun) — The formation of distinct layers in rock or water bodies.\n- \"Permeability\" (noun) — The state or quality of a material that causes it to allow liquids or gases to pass through it.\n- \"Seismic Activity\" (noun) — Pertaining to earthquakes or vibrations of the earth's crust.\n\n2. Evolutionary Biology & Ecology:\n- \"Speciation\" (noun) — The evolutionary formation of new and distinct species. \"Geographic isolation frequently acts as the primary catalyst for speciation.\"\n- \"Symbiotic Relationship\" (noun) — A close ecological relationship between the individuals of two or more different species.\n- \"Desiccation\" (noun) — Extreme dryness or the process of extreme drying.\n- \"Adaptive Radiation\" (noun) — The diversification of a group of organisms into forms filling different ecological niches.\n\n3. Cognitive Science & Anthropology:\n- \"Cognitive Dissonance\" (noun) — Psychological conflict resulting from incongruous beliefs and attitudes.\n- \"Empirical Evidence\" (noun) — Information acquired through systematic observation and experiment.\n- \"Archaeological Excavation\" (noun) — The systematic digging and recording of archaeological sites."
  },
  {
    "id": "TOEFL-05",
    "code": "TOEFL-05",
    "title": "TOEFL Academic Speaking Task 2 & 3: Campus Announcement & Lecture Synthesis",
    "section": "toefl",
    "topic": "speaking",
    "categoryName": "TOEFL Speaking",
    "difficulty": "Intermediate",
    "wordCount": 470,
    "coreConcept": "The 60-second timing formula for campus policy discussions and academic lecture summaries.",
    "description": "How to structure spoken responses with precise time allocation for reading summary and speaker viewpoint analysis.",
    "syllabus": "TOEFL iBT Speaking Test",
    "content": "1. Task 2: Campus Announcement & Student Reaction:\n- Timing Blueprint (60 Seconds Total):\n  0–15s: State the campus proposal/change from the reading and its two stated reasons (\"The university plans to renovate the library because...\").\n  15–40s: State the student's opinion (agree/disagree) and their first reason with full detail.\n  40–60s: Explain the student's second reason and conclude cleanly.\n\n2. Task 3: Academic Concept & Lecture Illustration:\n- Timing Blueprint (60 Seconds Total):\n  0–15s: Define the academic term from the reading passage (\"Operant conditioning is a psychological learning process where...\").\n  15–55s: Synthesize how the professor's lecture example illustrates the concept (\"In the lecture, the professor illustrates this using the example of a pet dog that...\").\n  55–60s: Conclude by linking the example back to the core concept."
  }
];

module.exports = {
  generalStudentArticles,
  neetArticles,
  jeeArticles,
  satArticles,
  ieltsArticles,
  toeflArticles
};
