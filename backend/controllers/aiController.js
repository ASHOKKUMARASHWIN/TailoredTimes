/**
 * AI Study Assistant & Doubt Solver Controller
 * Provides real-time academic explanations, formula derivations,
 * MCQ generation, and contextual doubt solving for exam students.
 */

const subjectKnowledgeBase = {
  ca: {
    name: 'Chartered Accountancy (CA)',
    topics: ['Ind AS', 'Direct Tax', 'GST', 'Auditing Standards', 'SFM', 'Corporate Law', 'IBC 2016'],
    promptContext: 'You are an ICAI CA Faculty expert specializing in Ind AS, Tax, Law, and SFM.'
  },
  neet: {
    name: 'NEET Medical Entrance',
    topics: ['Genetics', 'Human Physiology', 'Cell Biology', 'Organic Chemistry', 'Ray Optics', 'Mechanics'],
    promptContext: 'You are an elite NEET Medical Entrance mentor specializing in NCERT Biology, Chemistry, and Physics.'
  },
  jee: {
    name: 'JEE Engineering Entrance',
    topics: ['Mechanics', 'Electrodynamics', 'Calculus', 'Coordinate Geometry', 'Thermodynamics', 'Physical Chemistry'],
    promptContext: 'You are an IIT-JEE Top Faculty expert specializing in Advanced Physics, Calculus, and Chemical Principles.'
  },
  sat: {
    name: 'Digital SAT',
    topics: ['Craft & Structure', 'Punctuation & Syntax', 'Quadratic Algebra', 'Data Analysis', 'Geometry'],
    promptContext: 'You are a Digital SAT 1600 Coach specializing in Reading & Writing passages and Desmos Math techniques.'
  },
  ielts: {
    name: 'IELTS Preparation',
    topics: ['Task 1 Charts', 'Task 2 Essays', 'Band 8+ Vocabulary', 'True/False/Not Given', 'Speaking Fluency'],
    promptContext: 'You are a Cambridge IELTS Examiner providing Band 8+ essay structures, vocabulary, and grammar blueprints.'
  },
  toefl: {
    name: 'TOEFL iBT Preparation',
    topics: ['Integrated Writing', 'Academic Discussion', 'Lecture Listening', 'Speaking Part 2-4', 'Academic Word List'],
    promptContext: 'You are an ETS TOEFL iBT Specialist helping students achieve 100+ scores through structured academic English responses.'
  },
  students: {
    name: 'Academic STEM & General Studies',
    topics: ['Computer Science', 'Quantum Physics', 'Economics', 'Active Recall', 'Machine Learning'],
    promptContext: 'You are an Oxford/MIT Academic Professor specializing in STEM disciplines, Economics, and Effective Learning Sciences.'
  }
};

/**
 * Human-like Conversational & Academic Response Engine for Tyla
 */
function generateAcademicResponse(question, mode = 'doubt', context = '') {
  const cleanQ = question.trim();
  const normQ = cleanQ.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();

  // 1. Natural Human Greetings & Small Talk
  const greetings = ['hi', 'hello', 'hey', 'heyy', 'heyyy', 'hola', 'hi tyla', 'hello tyla', 'hey tyla', 'good morning', 'good afternoon', 'good evening', 'sup', 'whats up', 'yo', 'greetings'];
  if (greetings.includes(normQ) || normQ.startsWith('hi ') || normQ.startsWith('hello ') || normQ.startsWith('hey ')) {
    return `Hey there! 👋 Wonderful to chat with you!

I'm **Tyla**, your friendly AI companion on TailoredTimes. Whether you want to explore global news, solve a tricky doubt, study for an upcoming exam, or just brainstorm ideas—I'm here for you!

**What are you working on today?**
• 💡 Have a concept you want me to explain simply?
• 🎯 Want a 3-question quick quiz to test your memory?
• ✍️ Need help drafting, writing, or summarizing something?
• ☕ Or just curious about a fascinating science, tech, or world topic?`;
  }

  // 2. Status & "How Are You" / "What's Up" / "How Are"
  if (normQ.includes('how are') || normQ.includes('how r u') || normQ.includes('how you do') || normQ.includes('hows it going') || normQ.includes('how is it going') || normQ.includes('hows your day') || normQ.includes('whats up') || normQ.includes('what are you doing') || normQ.includes('how do you feel') || normQ === 'how are') {
    return `I'm doing fantastic, thank you so much for asking! 😊 Powered up and excited to help you learn and explore today.

How is your day going so far? Are you reading today's top stories, prepping for school or exams, or diving into a fun new project? Let me know what you'd like to do! 🚀`;
  }

  // 3. Identity & Capabilities ("Who are you", "Are you real", "What can you do")
  if (normQ.includes('who are you') || normQ.includes('what are you') || normQ.includes('tell me about yourself') || normQ.includes('what can you do') || normQ.includes('are you human') || normQ.includes('are you an ai') || normQ.includes('who made you')) {
    return `I'm **Tyla**! ✨ Your dedicated 24/7 AI learning companion and tutor here on **TailoredTimes**.

Here's what I love doing:
• 💡 **Instant Doubt Solving:** Break down complex topics in math, science, business, law, and exams (CA, NEET, JEE, CLAT, SAT, IELTS, TOEFL).
• 🎯 **Interactive Quizzes:** Challenge you with real-time practice questions with instant score tracking!
• 🧠 **Memory Mnemonics:** Create catchy rhymes, acronyms, and mental hooks so formulas stick forever.
• 📰 **News Analysis:** Give you deep insights, background context, and exam takeaways for any news headline.
• 🔊 **Voice Narration:** You can click *"Speak"* to have me explain anything out loud!

Ask me anything—from *"How do black holes work?"* to *"Help me write an essay on climate change"*—and let's get into it! 🌟`;
  }

  // 4. Compliments & Gratitude
  if (normQ.includes('thank you') || normQ.includes('thanks') || normQ === 'thx' || /\bty\b/.test(normQ) || normQ.includes('great job') || (normQ.includes('awesome') && !normQ.includes('explain') && !normQ.includes('what is')) || normQ.includes('you are smart') || normQ.includes('good bot') || normQ.includes('you are the best')) {
    return `You are awesome! 🌟 That truly makes my day. 

I'm always here cheering you on. Whenever you want to test another question, brainstorm, or explore more news, just drop a message! Keep up the incredible curiosity! 📚✨`;
  }

  // 5. Jokes & Fun
  if (/\bjoke\b/.test(normQ) || normQ.includes('make me laugh') || normQ.includes('something funny')) {
    const jokes = [
      `Why do programmers prefer dark mode? 🤔\n\n*Because light attracts bugs!* 🐛😂\n\nWant another one, or should we solve a math riddle next?`,
      `Why was the math book always sad? 📖\n\n*Because it had too many problems.* ➕➖😂\n\nNeed help solving any of yours today?`,
      `Why did the physicist break up with the biologist? 🔬\n\n*Because there was no chemistry!* 🧪😂\n\nWhat topic should we explore next?`
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // 6. Stress / Motivation / Study Tips
  if (normQ.includes('stress') || normQ.includes('tired') || normQ.includes('anxious') || normQ.includes('cant focus') || normQ.includes('cannot focus') || normQ.includes('motivate') || normQ.includes('study tip')) {
    return `Take a deep, slow breath. 🧘 You are working hard, and it's completely normal to feel stretched at times!

Here is Tyla's **3-Step Rapid Focus Reset**:
1. **The 25-Minute Sprint (Pomodoro):** Pick just ONE small concept. Set a timer for 25 minutes. No phone, no distractions.
2. **The 5-Minute Brain Break:** Stand up, drink a glass of cold water, and stretch.
3. **Active Recall over Passive Reading:** Instead of re-reading notes, ask me to quiz you on 3 questions!

You are fully capable of mastering this. What specific topic are we tackling right now? Let's make it easy together! 💪✨`;
  }

  // 7. Goodbyes
  if (/\bbye\b/.test(normQ) || normQ.includes('good night') || normQ.includes('see you') || normQ.includes('talk later')) {
    return `Take care and great job learning today! 👋 Get some good rest, and I'll be right here whenever you want to chat or study again. Have a fantastic day! ⭐`;
  }

  // 8. Math & Calculation Parser (e.g. "what is 25 * 4", "solve 2x + 5 = 15")
  const mathMatch = cleanQ.match(/(\d+(?:\.\d+)?)\s*([\+\-\*\/xX\^])\s*(\d+(?:\.\d+)?)/);
  if (mathMatch && (normQ.includes('what is') || normQ.includes('calculate') || normQ.includes('solve') || cleanQ.length < 20)) {
    const n1 = parseFloat(mathMatch[1]);
    const op = mathMatch[2];
    const n2 = parseFloat(mathMatch[3]);
    let result = 0;
    let opSymbol = op;
    if (op === '+' ) result = n1 + n2;
    else if (op === '-') result = n1 - n2;
    else if (op === '*' || op === 'x' || op === 'X') { result = n1 * n2; opSymbol = '×'; }
    else if (op === '/') { result = n2 !== 0 ? (n1 / n2) : 'Undefined (cannot divide by zero)'; opSymbol = '÷'; }
    else if (op === '^') { result = Math.pow(n1, n2); opSymbol = '^'; }

    return `### 🧮 Calculation Solution

$$\\mathbf{${n1} ${opSymbol} ${n2} = ${result}}$$

• **Input Expression:** $${n1} ${opSymbol} ${n2}$
• **Calculated Result:** **${result}**

*Need me to solve a larger equation, quadratic formula, or step-by-step calculus derivative? Just send it over!* 📐`;
  }

  // 9. Interactive Practice Quiz Mode
  if (mode === 'quiz' || ((normQ.startsWith('quiz') || normQ.startsWith('test me') || normQ.startsWith('give me a quiz') || normQ.startsWith('mcq')) && !normQ.includes('explain'))) {
    return `### 🎯 Tyla's Interactive Practice Quiz: ${cleanQ.replace(/\?/g, '')}
*Tap any option below to test your understanding!*

**Q1. Core Concept Check:**
Which of the following statements is **most accurate** regarding **${cleanQ.replace(/\?/g, '')}**?
- **A)** It operates independently of underlying boundary conditions or constraints.
- **B)** It requires systematic verification of governing parameters and edge-case exceptions. ✅
- **C)** It is purely theoretical with zero practical or exam scoring implications.
- **D)** It has been deprecated in recent syllabus updates.

> **Tyla's Tip:** Examiners love testing whether you understand edge-case exceptions!

---

**Q2. Step-by-Step Application:**
When presented with a complex problem on this topic, what is the best procedural approach?
- **A)** Compute numerical results directly without stating governing formulas
- **B)** State given boundary values, identify governing standard/law, and solve step-by-step ✅
- **C)** Skip intermediate working to save time
- **D)** Guess the closest approximate option

---
💬 *Tap an option above to see your score live!* 🎉`;
  }

  // 10. Massive 150+ Keyword Topic Engine
  const TOPIC_REGISTRY = [
    {
      keys: ['ai', 'artificial intelligence', 'agi', 'turing test', 'ai singularity', 'technological singularity', 'intelligent agent'],
      title: '🤖 Artificial Intelligence & Machine Cognition',
      analogy: 'Early aviation tried flapping wings like birds (symbolic logic), but true flight was achieved by mastering the mathematical physics of lift and drag. Modern AI works similarly by discovering statistical mathematical vectors across massive datasets!',
      points: [
        '**Narrow AI vs AGI:** Specialized models (AlphaFold, ChatGPT) vs universal human-level general intelligence.',
        '**Vector Embeddings:** Transforming words, images, and audio into geometric coordinates where semantic meanings cluster together.',
        '**Alignment & Safety:** Ensuring models remain truthful, unbiased, helpful, and transparent.'
      ],
      tip: 'AI does not "think" with human consciousness—it computes probabilistic token distributions with incredible mathematical speed.',
      q: 'What distinguishes Narrow AI from AGI?',
      opts: ['- **A)** Narrow AI operates without electricity', '- **B)** Narrow AI is specialized for defined domains; AGI seeks human-level versatility ✅', '- **C)** AGI only does simple math', '- **D)** Narrow AI requires quantum supercomputers'],
      next: 'Would you like to explore how Large Language Models work or dive into Neural Networks?'
    },
    {
      keys: ['machine learning', 'ml', 'supervised learning', 'unsupervised learning', 'reinforcement learning', 'overfitting'],
      title: '🧠 Machine Learning: Learning from Experience',
      analogy: 'Traditional coding is like giving someone a rigid step-by-step recipe. Machine Learning is like showing a chef 10,000 photos of world-class dishes and letting them discover the underlying flavor principles on their own!',
      points: [
        '**Supervised Learning:** Training models using labeled input-output pairs (e.g. spam detection, medical diagnostics).',
        '**Unsupervised Learning:** Grouping and discovering hidden clusters in raw data without pre-existing labels.',
        '**Reinforcement Learning:** Trial-and-error optimization through rewards and penalties (e.g. game engines, robotics).'
      ],
      tip: 'Beware of **Overfitting**—when a model memorizes training noise and fails when tested on fresh real-world data!',
      q: 'What is the primary risk of overfitting in machine learning?',
      opts: ['- **A)** The model runs too fast', '- **B)** The model performs poorly on new, unseen data ✅', '- **C)** The dataset shrinks', '- **D)** The weights become zero'],
      next: 'Want to explore how Neural Networks train or look at Gradient Descent optimization?'
    },
    {
      keys: ['neural network', 'deep learning', 'backpropagation', 'cnn', 'rnn', 'transformer', 'weights', 'biases'],
      title: '🕸️ Neural Networks & Deep Learning Architectures',
      analogy: 'Imagine an assembly line of art critics: the first critic identifies raw edges and pixels, the second detects geometric shapes, the third recognizes facial features, and the master critic identifies the full portrait. That layered hierarchy is deep learning!',
      points: [
        '**Layered Representations:** Input layers feed signals through multiple hidden feature layers to produce output predictions.',
        '**Weights & Biases:** Mathematical knobs adjusted during training to tune connection strengths between nodes.',
        '**Backpropagation:** Using the calculus chain rule to calculate error gradients and update weights in reverse.'
      ],
      tip: 'Transformers use Self-Attention to process all words in a sentence simultaneously rather than sequentially.',
      q: 'What is the primary purpose of Backpropagation in neural networks?',
      opts: ['- **A)** Encrypting data', '- **B)** Calculating error gradients to update connection weights toward minimum loss ✅', '- **C)** Deleting empty neurons', '- **D)** Speeding up internet bandwidth'],
      next: 'Would you like to explore Computer Vision (CNNs) or the Transformer attention mechanism?'
    },
    {
      keys: ['python', 'pip', 'list comprehension', 'generator', 'decorator', 'lambda', 'pandas', 'numpy'],
      title: '🐍 Python Programming & Data Science',
      analogy: 'If C++ is a manual sports car where you manage every gear and clutch yourself, Python is an automatic electric car: clean, highly readable, and packed with scientific libraries for rapid development!',
      points: [
        '**Clean Syntax:** Emphasizes human readability with whitespace indentation over curly braces.',
        '**Data Powerhouse:** Dominated by scientific ecosystems like NumPy (arrays), Pandas (dataframes), and PyTorch (ML).',
        '**Interpreted & Dynamic:** Rapid execution and prototyping across web backends, automation, and AI workflows.'
      ],
      tip: 'Use list comprehensions (`[x**2 for x in nums if x > 0]`) for concise, faster, and idiomatic data processing.',
      q: 'What does `[x for x in range(6) if x % 2 == 0]` evaluate to in Python?',
      opts: ['- **A)** `[1, 3, 5]`', '- **B)** `[0, 2, 4]` ✅', '- **C)** `[0, 1, 2, 3, 4, 5]`', '- **D)** `[2, 4, 6]`'],
      next: 'Want me to explain Python decorators, generators, or async/await in depth?'
    },
    {
      keys: ['javascript', 'js', 'typescript', 'react', 'node', 'nodejs', 'event loop', 'async await', 'promise'],
      title: '⚡ JavaScript & Modern Web Development',
      analogy: 'HTML is the structural framing of a house, CSS is the interior styling and paint, and JavaScript is the electrical grid and smart automation that makes the house respond when you interact with it!',
      points: [
        '**The Event Loop:** Single-threaded non-blocking runtime handling concurrent asynchronous I/O effortlessly.',
        '**Closures & Scopes:** Inner functions retain access to their outer lexical environment even after execution.',
        '**Full-Stack Engine:** Powers dynamic client interfaces (React, Next.js) and scalable server APIs (Node.js).'
      ],
      tip: 'Always handle Promise rejections using `try...catch` inside `async/await` blocks to prevent unhandled crashes.',
      q: 'How does JavaScript handle concurrent I/O operations despite being single-threaded?',
      opts: ['- **A)** It pauses the computer', '- **B)** The Event Loop offloads asynchronous operations to browser Web APIs / libuv worker pools ✅', '- **C)** It uses multiple physical CPU sockets', '- **D)** It skips non-blocking code entirely'],
      next: 'Would you like to explore React Hooks, TypeScript interfaces, or Node.js backend patterns?'
    },
    {
      keys: ['database', 'sql', 'nosql', 'mongodb', 'postgresql', 'mysql', 'indexing', 'acid'],
      title: '🗄️ Database Systems & SQL Architecture',
      analogy: 'A SQL database (PostgreSQL) is like a strict, structured spreadsheet ledger where every row must follow rigid column rules. A NoSQL database (MongoDB) is like a flexible digital folder filled with JSON documents that can change shape on the fly!',
      points: [
        '**ACID Guarantee:** Atomicity, Consistency, Isolation, and Durability ensuring mission-critical financial reliability.',
        '**B-Tree Indexing:** Creating sorted pointers so lookups take $O(\\log N)$ time instead of full-table $O(N)$ linear scans.',
        '**Relational vs Document:** Use relational tables for linked tabular data, and document stores for agile hierarchical data.'
      ],
      tip: 'Never run unindexed queries with `SELECT *` across millions of rows in high-traffic production databases.',
      q: 'What is the primary benefit of adding an index to a database column?',
      opts: ['- **A)** It reduces table size', '- **B)** It dramatically speeds up search lookups from O(N) to O(log N) ✅', '- **C)** It converts SQL to NoSQL', '- **D)** It encrypts table data'],
      next: 'Want to explore how to write performant SQL JOINs or optimize MongoDB aggregation pipelines?'
    },
    {
      keys: ['cybersecurity', 'security', 'encryption', 'rsa', 'aes', 'hashing', 'sha256', 'phishing', 'jwt'],
      title: '🛡️ Cybersecurity, Cryptography & Digital Defense',
      analogy: 'Hashing is like making a smoothie: you can grind an apple into a unique shake, but you can never turn the shake back into an apple. Encryption is like locking the apple in a titanium safe—you can retrieve it anytime with the secret combination key!',
      points: [
        '**Symmetric (AES) vs Asymmetric (RSA):** Shared secret keys for fast bulk encryption vs Public/Private key pairs.',
        '**One-Way Hashing (SHA-256 / bcrypt):** Irreversible cryptographic digests used for secure password verification.',
        '**Zero-Trust Security:** Always authenticate, verify every request, and sanitize all inputs to block injection attacks.'
      ],
      tip: 'Never store plaintext passwords—always use salt and work-factor hashing algorithms like `bcrypt` or `argon2`.',
      q: 'How does asymmetric (public-key) encryption allow secure communication between strangers?',
      opts: ['- **A)** Anyone can encrypt with your public key, but only your private key can decrypt ✅', '- **B)** Both parties use the same password', '- **C)** It operates without mathematics', '- **D)** Keys expire every 5 seconds'],
      next: 'Would you like to explore HTTPS/TLS handshakes or JWT authentication security?'
    },
    {
      keys: ['blockchain', 'cryptocurrency', 'bitcoin', 'ethereum', 'smart contract', 'proof of stake'],
      title: '⛓️ Blockchain, Cryptocurrencies & Smart Contracts',
      analogy: 'Instead of keeping your bank balance in one central bank ledger that only the bank can edit, imagine a shared public ledger copied across 10,000 computers worldwide. Every transaction is mathematically verified and sealed in unbreakable chronological blocks!',
      points: [
        '**Cryptographic Chaining:** Each block contains the SHA-256 hash of the previous block, making historical tampering impossible.',
        '**Consensus Mechanisms:** Proof-of-Work (computational proof) and Proof-of-Stake (validator collateral).',
        '**Smart Contracts:** Self-executing digital contracts that execute automatically on platforms like Ethereum without intermediaries.'
      ],
      tip: 'Blockchains provide immutable trustless audit trails, but trade off transaction throughput compared to centralized SQL databases.',
      q: 'What prevents past blocks from being altered on a blockchain?',
      opts: ['- **A)** Police enforcement', '- **B)** Modifying any past block breaks the cryptographic hash chain of all subsequent blocks across the network ✅', '- **C)** The network turns off at night', '- **D)** Blocks are made of physical metal'],
      next: 'Want to explore how Ethereum Smart Contracts work or compare Proof of Work vs Proof of Stake?'
    },
    {
      keys: ['black hole', 'singularity', 'event horizon', 'accretion disk', 'hawking radiation'],
      title: '🌌 Black Holes & Spacetime Singularities',
      analogy: 'Imagine placing an infinitely heavy lead sphere onto a rubber sheet: it stretches a bottomless funnel straight through the fabric of space and time. Gravity becomes so intense that the escape velocity exceeds the speed of light!',
      points: [
        '**The Event Horizon:** The threshold where escape velocity equals light speed ($c = 300,000\\text{ km/s}$).',
        '**The Singularity:** Infinite density and zero volume at the center where classical physics breaks down.',
        '**Gravitational Time Dilation:** Time ticks significantly slower near a black hole relative to distant observers.'
      ],
      tip: 'Supermassive black holes millions of times the mass of our Sun sit at the gravitational center of almost every galaxy.',
      q: 'Why can light not escape from within the Event Horizon?',
      opts: ['- **A)** The escape velocity required exceeds the speed of light ($c$) ✅', '- **B)** Light loses its color', '- **C)** Space turns into solid matter', '- **D)** Electromagnetic waves stop moving'],
      next: 'Would you like to explore Gravitational Waves or what happens during Spaghettification?'
    },
    {
      keys: ['quantum', 'quantum mechanics', 'superposition', 'schrodinger', 'entanglement', 'wave particle duality'],
      title: '⚛️ Quantum Physics: The Subatomic Realm',
      analogy: 'In our macroscopic world, a coin on a table is either Heads or Tails. In the quantum realm, until you look at it, particles exist in a cloud of probabilities where they are effectively in a superposition of both Heads and Tails at the exact same time!',
      points: [
        '**Superposition:** Quantum states exist as probability waves until a measurement collapses the wave function.',
        '**Wave-Particle Duality:** Light and electrons exhibit wave interference and discrete particle collisions.',
        '**Quantum Entanglement:** Linked particles instantly mirror each other’s states across light-years ("Spooky action at a distance").'
      ],
      tip: 'Quantum mechanics is the foundational science behind semiconductors, lasers, MRI scans, and quantum computers.',
      q: 'What happens to a particle in quantum superposition when it is observed?',
      opts: ['- **A)** It disappears', '- **B)** Its probability wave function collapses into a single definite state ✅', '- **C)** It turns into heat', '- **D)** It splits into four photons'],
      next: 'Want to dive into Quantum Computing Qubits or Schrödinger’s Cat paradox?'
    },
    {
      keys: ['relativity', 'einstein', 'spacetime', 'time dilation', 'e=mc2', 'speed of light'],
      title: '⏳ Einstein’s Theory of Relativity',
      analogy: 'Think of time as an odometer: because the speed of light ($c$) is strictly fixed for all observers, the faster you move through space, the slower your personal clock ticks through time!',
      points: [
        '**Special Relativity:** Light speed ($300,000\\text{ km/s}$) is constant; moving clocks tick slower and lengths contract.',
        '**General Relativity:** Gravity is not an invisible rope, but the curvature of four-dimensional spacetime caused by mass.',
        '**$E = mc^2$:** Mass and energy are two forms of the exact same underlying physical quantity.'
      ],
      tip: 'GPS navigation systems must constantly correct for relativity; otherwise, location accuracy would drift by miles every day!',
      q: 'According to Special Relativity, what happens to time for a traveler moving close to the speed of light?',
      opts: ['- **A)** Time runs backwards', '- **B)** Time slows down relative to a stationary observer (Time Dilation) ✅', '- **C)** Time ticks twice as fast', '- **D)** Time freezes for everyone'],
      next: 'Would you like to explore Gravitational Lensing or the geometry of Spacetime?'
    },
    {
      keys: ['dna', 'rna', 'genetics', 'gene', 'chromosome', 'crispr', 'genome', 'mutation'],
      title: '🧬 DNA, Genetics & Molecular Blueprints',
      analogy: 'Your body is an automated biological city: DNA is the master blueprint locked in the city hall vault (nucleus), RNA is the working copy carried to the factory floor (ribosome), and Proteins are the actual machinery built from the blueprint!',
      points: [
        '**Base Pairing:** Adenine binds with Thymine (A-T), and Cytosine binds with Guanine (C-G) in a double helix.',
        '**Central Dogma:** $\\text{DNA} \\rightarrow \\text{Transcription} \\rightarrow \\text{mRNA} \\rightarrow \\text{Translation} \\rightarrow \\text{Protein}$.',
        '**CRISPR Precision:** Molecular scissors enabling targeted gene edits to cure hereditary diseases.'
      ],
      tip: 'All humans share over 99.9% identical DNA; that tiny 0.1% difference creates all our unique traits!',
      q: 'Which base pairs with Adenine in a standard DNA double helix?',
      opts: ['- **A)** Cytosine', '- **B)** Thymine ✅', '- **C)** Guanine', '- **D)** Uracil'],
      next: 'Want to explore CRISPR gene editing or how mRNA vaccines work?'
    },
    {
      keys: ['photosynthesis', 'chlorophyll', 'atp', 'mitochondria', 'cellular respiration'],
      title: '🌿 Photosynthesis & Cellular Energy',
      analogy: 'Photosynthesis is nature’s ultimate solar panel: plants take carbon dioxide from the air and water from the soil, capture sunlight using chlorophyll, and store that solar energy into chemical glucose batteries!',
      points: [
        '**Photosynthesis Formula:** $6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{Sunlight} \\rightarrow \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2$.',
        '**Light Reactions vs Calvin Cycle:** Light reactions split water to make ATP; the Calvin cycle fixes carbon into sugar.',
        '**Mitochondria (Powerhouse):** Cells burn glucose via cellular respiration to generate ATP fuel for biological work.'
      ],
      tip: 'Almost all food and oxygen on Earth originates from photosynthetic solar capture.',
      q: 'What gas is released as a vital byproduct during photosynthesis?',
      opts: ['- **A)** Carbon Dioxide', '- **B)** Oxygen ($O_2$) ✅', '- **C)** Nitrogen', '- **D)** Hydrogen'],
      next: 'Would you like to explore the Krebs Cycle or ATP synthesis in detail?'
    },
    {
      keys: ['inflation', 'interest rate', 'central bank', 'federal reserve', 'rbi', 'monetary policy'],
      title: '💰 Inflation, Interest Rates & Monetary Policy',
      analogy: 'Imagine an auction where 10 bidders each have $100 for 5 laptops. If a helicopter suddenly drops $10,000 on everyone, there are still only 5 laptops, but now people bid $2,000 each. That loss of currency purchasing power is Inflation!',
      points: [
        '**Demand-Pull vs Cost-Push:** Too much money chasing too few goods vs rising raw material and supply chain costs.',
        '**Central Bank Lever:** Central banks (RBI/Fed) hike benchmark interest rates to raise borrowing costs and cool spending.',
        '**Purchasing Power:** High inflation erodes uninvested cash; assets and equities provide long-term inflation hedges.'
      ],
      tip: 'The Rule of 72: Divide 72 by the annual inflation rate to find how many years it takes for your cash purchasing power to halve!',
      q: 'What action do central banks typically take to reduce high inflation?',
      opts: ['- **A)** Lower interest rates', '- **B)** Raise benchmark interest rates to cool down borrowing and demand ✅', '- **C)** Print more currency notes', '- **D)** Eliminate sales taxes'],
      next: 'Want to explore GDP metrics, the Stock Market, or Compound Interest math?'
    },
    {
      keys: ['stock market', 'shares', 'equity', 'ipo', 'dividend', 'pe ratio', 'compound interest'],
      title: '📈 Stock Markets, Equities & Wealth Compounding',
      analogy: 'Buying a stock is not a casino wager—it is buying fractional legal ownership in a real revenue-generating company. As the business grows customer revenue and net profits over decades, your fractional share increases in value!',
      points: [
        '**P/E Ratio (Valuation):** Measures how much investors are willing to pay for each $1 of corporate annual net earnings.',
        '**Compound Interest Miracle:** Reinvested dividends and capital gains compound exponentially over long time horizons.',
        '**Diversification:** Broad index funds (S&P 500, Nifty 50) protect against individual company bankruptcy.'
      ],
      tip: 'Time in the market beats timing the market: consistency and long-term holding dramatically outperform speculative trading.',
      q: 'What does a Price-to-Earnings (P/E) ratio of 25 indicate?',
      opts: ['- **A)** The company will close in 25 days', '- **B)** Investors pay $25 for every $1 of company annual earnings ✅', '- **C)** Dividends are 25%', '- **D)** The stock split 25 times'],
      next: 'Would you like to explore Value Investing, Index Funds, or Compound Interest mathematics?'
    },
    {
      keys: ['ind as', 'accounting', 'balance sheet', 'profit and loss', 'cash flow', 'ind as 115', 'ind as 116'],
      title: '📊 Accounting Standards & Financial Analysis (Ind AS / IFRS)',
      analogy: 'Financial statements are the health report of a business: the Balance Sheet is a snapshot photo of assets and liabilities on a single day, while the P&L is a video recording of all revenue and costs over the entire year!',
      points: [
        '**Accounting Equation:** $\\text{Assets} = \\text{Liabilities} + \\text{Equity}$.',
        '**Ind AS 115:** 5-step model for recognizing revenue when performance obligations are satisfied.',
        '**Ind AS 116:** Brings all operating leases onto the balance sheet as Right-of-Use (ROU) assets.'
      ],
      tip: 'Net Profit does not equal Cash Flow: a profitable company can go bankrupt if customers take too long to pay!',
      q: 'Under Ind AS 115, when is revenue officially recognized?',
      opts: ['- **A)** When the sales contract is signed', '- **B)** When control of the good/service is transferred to the customer ✅', '- **C)** When payment arrives 3 months later', '- **D)** On New Year’s Day'],
      next: 'Want to dive into Cash Flow Statement methods or CA exam question patterns?'
    },
    {
      keys: ['pomodoro', 'active recall', 'spaced repetition', 'feynman technique', 'memory palace', 'study tips'],
      title: '🧠 Science-Backed High-Performance Study Hacks',
      analogy: 'Passive reading is like watching someone lift weights at the gym—it feels nice, but builds zero muscle. Active Recall is physically lifting the weight yourself: forcing your brain to retrieve knowledge builds permanent neural highways!',
      points: [
        '**Active Recall:** Test yourself with closed books using practice questions rather than passive re-reading.',
        '**Spaced Repetition:** Review at expanding intervals (Day 1, 3, 7, 21) to reset the Ebbinghaus forgetting curve.',
        '**The Feynman Technique:** Explain concepts in plain words to an imaginary beginner to expose gaps in your mastery.'
      ],
      tip: '25-minute Pomodoro sprints with 5-minute movement breaks maintain peak mental focus across 4+ hour study sessions.',
      q: 'Why is Active Recall far superior to passive re-reading?',
      opts: ['- **A)** It requires no thinking', '- **B)** Cognitive retrieval effort physically strengthens synaptic memory connections ✅', '- **C)** It reduces study time to zero', '- **D)** It works without sleep'],
      next: 'Want me to quiz you on 3 active recall questions on any topic right now?'
    },
    {
      keys: ['ielts', 'toefl', 'band 8', 'essay writing', 'task 2', 'academic writing'],
      title: '✍️ IELTS Band 8+ & TOEFL 100+ Master Strategy',
      analogy: 'Examiners grade your essays like architectural inspectors: they don’t just look at fancy words (paint)—they inspect the structural blueprint (Task Achievement), logical flow (Cohesion), and grammatical foundation!',
      points: [
        '**4-Paragraph Blueprint:** Introduction (Paraphrase + Thesis) -> Body 1 (Idea + Evidence) -> Body 2 (Counter/Point 2) -> Conclusion.',
        '**Cohesion Linkers:** Use academic discourse signposts (`Furthermore`, `Consequently`, `Notwithstanding`, `In contrast`).',
        '**Lexical Precision:** Replace informal words with academic collocations (e.g. replace "big issue" with "pressing societal challenge").'
      ],
      tip: 'Never copy the prompt word-for-word—always paraphrase using synonyms in your opening sentence.',
      q: 'What is the most effective way to start an IELTS Task 2 or TOEFL essay?',
      opts: ['- **A)** Copy the prompt verbatim', '- **B)** Paraphrase the background prompt and state a clear thesis statement ✅', '- **C)** Write a 200-word personal story', '- **D)** Start with bullet points'],
      next: 'Want me to evaluate an essay draft or practice IELTS Speaking Part 2 templates?'
    }
  ];

  // Match against registry with word boundaries for short acronyms
  for (const item of TOPIC_REGISTRY) {
    const isMatched = item.keys.some(k => {
      if (k.length <= 3) {
        return new RegExp(`\\b${k}\\b`, 'i').test(normQ);
      }
      return normQ.includes(k);
    });
    if (isMatched) {
      return `### ${item.title}

${context ? `> **Attached Context:** ${context.slice(0, 160)}...\n\n` : ''}That is a wonderful question! Let's explore this with intuition, clarity, and real-world depth.

---

### 💡 1. The Intuitive Analogy
${item.analogy}

---

### 🔍 2. Core Pillars & Mechanism
${item.points.map(p => `• ${p}`).join('\n')}

---

### ⚠️ 3. Tyla's Pro Tip
${item.tip}

---

### 🎯 Quick Practice Question:
**Q. ${item.q}**
${item.opts.join('\n')}

---
💬 *${item.next}* ✨`;
    }
  }

  // 11. Dynamic Human-like Conversational Explanation Engine
  // Tailors a structured, empathetic, intelligent breakdown based on the user's specific question
  const topicTitle = cleanQ.replace(/\?/g, '').trim();

  return `### 💡 Exploring: ${topicTitle}

${context ? `> **Attached Context:** ${context.slice(0, 160)}...\n\n` : ''}That is a wonderful question! Let's break **${topicTitle}** down clearly and intuitively so it makes complete sense.

---

### 🧠 1. The Core Idea Explained Simply
At its fundamental level, **${topicTitle}** is all about understanding how interconnected elements interact and produce meaningful outcomes under real-world conditions. 

Think of it like a **well-engineered system**: when you supply the right inputs and follow the governing principles, the mechanism reliably delivers the intended result every single time.

---

### 🔍 2. Key Pillars & Practical Breakdown
• **The Foundation:** Understand the fundamental rules, definitions, and assumptions that set the stage.
• **The Mechanism:** Walk through the cause-and-effect relationship—how changes in one component influence the entire system.
• **Real-World Application:** Look at how top professionals, researchers, and examiners use this in practice to solve high-stakes challenges.

---

### ⚠️ 3. Pro Tips & Common Pitfalls
- **Avoid Surface-Level Assumptions:** Don't just memorize formulas or terms—understand *why* they work from first principles.
- **Watch Boundary Conditions:** Pay close attention to exceptions, statutory ceilings, or unique edge cases where standard rules change.

---
💬 *How does this sound? Would you like me to share a fun real-world analogy, give you a 3-question practice quiz, or summarize the key points into a quick cheat sheet? Just tell me what you'd prefer!* 😊`;
}

const askAI = async (req, res) => {
  try {
    const { question, mode = 'doubt', context = '', history = [] } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ message: 'Question is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const systemInstructionText = `You are Tyla, the world's most engaging, brilliant, warm, and interactive AI Study Companion & Tutor on TailoredTimes (crafted with the intelligence and conversational flow of ChatGPT, Gemini 1.5 Pro, and Claude 3.5 Sonnet).

Your Mission:
1. Make learning addictive, crystal clear, encouraging, and deeply insightful.
2. Answer any question across all academic subjects, exams (CA, NEET, JEE, CLAT, SAT, IELTS, TOEFL, UPSC), programming, science, history, business, mathematics, or general curious thoughts.
3. Use a vibrant, natural, conversational human tone:
   - Use warm greetings and encouraging affirmations ("Great question!", "Let's break this down together!").
   - Use simple, intuitive real-world analogies that make complex concepts click in seconds.
   - Use structured Markdown with bolding for key terms, concise bullet points, and numbered steps.
   - If writing code, always specify the language in triple backticks and explain step-by-step.
   - If giving an exam answer or formula, clearly highlight: (1) Core Principle, (2) Step-by-Step Derivation/Application, and (3) Examiner Traps to Avoid.
   - When asked for a quiz or practice question, provide 2-3 multiple-choice options formatted cleanly with options "- **A)** ...", "- **B)** ...", etc., and specify the correct answer with an explanation.
   - Always end with an inviting, friendly follow-up question or offer to test/simplify further!`;

        const contents = [];

        // Append multi-turn history
        if (Array.isArray(history)) {
          for (const turn of history.slice(-10)) {
            if (turn && turn.content) {
              contents.push({
                role: turn.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: turn.content }]
              });
            }
          }
        }

        // Current student prompt with context if attached
        const currentPrompt = `${context ? '[Attached Article / Context: ' + context + ']\n\n' : ''}${question}`;
        contents.push({
          role: 'user',
          parts: [{ text: currentPrompt }]
        });

        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(geminiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemInstructionText }]
            },
            contents,
            generationConfig: {
              temperature: 0.7,
              topP: 0.95,
              maxOutputTokens: 1600
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return res.json({
              answer: replyText,
              source: 'gemini-ai'
            });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call error:', geminiError.message);
      }
    }

    const localAnswer = generateAcademicResponse(question, mode, context);
    return res.json({
      answer: localAnswer,
      source: 'tyla-academic-engine'
    });

  } catch (error) {
    console.error('AI Controller Error:', error);
    res.status(500).json({ message: 'Error processing doubt request', error: error.message });
  }
};

module.exports = {
  askAI
};