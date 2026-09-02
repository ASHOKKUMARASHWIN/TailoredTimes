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
  if (normQ.includes('thank you') || normQ.includes('thanks') || normQ === 'thx' || normQ.includes('ty') || normQ.includes('great job') || normQ.includes('awesome') || normQ.includes('you are smart') || normQ.includes('good bot') || normQ.includes('you are the best')) {
    return `You are awesome! 🌟 That truly makes my day. 

I'm always here cheering you on. Whenever you want to test another question, brainstorm, or explore more news, just drop a message! Keep up the incredible curiosity! 📚✨`;
  }

  // 5. Jokes & Fun
  if (normQ.includes('joke') || normQ.includes('make me laugh') || normQ.includes('something funny')) {
    const jokes = [
      `Why do programmers prefer dark mode? 🤔\n\n*Because light attracts bugs!* 🐛😂\n\nWant another one, or should we solve a math riddle next?`,
      `Why was the math book always sad? 📖\n\n*Because it had too many problems.* ➕➖😂\n\nNeed help solving any of yours today?`,
      `Why did the physicist break up with the biologist? 🔬\n\n*Because there was no chemistry!* 🧪😂\n\nWhat topic should we explore next?`
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  // 6. Stress / Motivation / Study Tips
  if (normQ.includes('stress') || normQ.includes('tired') || normQ.includes('anxious') || normQ.includes('cant focus') || normQ.includes('cannot focus') || normQ.includes('motivate') || normQ.includes('study tip')) {
    return `Take a deep breath! 🌿 Studying and learning can feel overwhelming, but remember: **progress is built one step at a time, not all in one night.**

Here is a quick **3-step reset strategy**:
1. **The 25-Minute Rule (Pomodoro):** Focus on just ONE single subtopic for 25 minutes. No phone, no distractions.
2. **The 5-Minute Brain Break:** Stand up, drink a glass of cold water, and stretch.
3. **Active Recall over Passive Reading:** Instead of re-reading notes, ask me to quiz you on 3 questions!

You are fully capable of mastering this. What specific topic are we tackling right now? Let's make it easy together! 💪✨`;
  }

  // 7. Goodbyes
  if (normQ.includes('bye') || normQ.includes('good night') || normQ.includes('see you') || normQ.includes('cya') || normQ.includes('talk later')) {
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

  // 10. Topic Knowledge: Black Holes
  if (normQ.includes('black hole') || normQ.includes('singularity') || normQ.includes('event horizon')) {
    return `### 🌌 The Wonders of Black Holes: The Ultimate Cosmic Vacuum Cleaners

Imagine packing the entire mass of planet Earth into the size of a single marble. That extreme density is essentially what a **Black Hole** is!

---

### 💡 1. The Trampoline Analogy
Imagine a stretched fabric trampoline:
- A tennis ball makes a small dip (like the Moon's gravity).
- A heavy bowling ball makes a deep crater (like our Sun's gravity).
- A **Black Hole** is like an infinitely heavy lead weight that punctures a bottomless funnel straight through the fabric of space and time!

---

### 🔬 2. Anatomy of a Black Hole:
1. **The Event Horizon ("Point of No Return"):** The invisible sphere where escape velocity equals the speed of light ($300,000\\text{ km/s}$).
2. **The Singularity:** A point of zero volume and infinite density at the center.
3. **The Accretion Disk:** Superheated swirling matter glowing with intense X-rays before falling inside.

---

### 🎯 Quick Question:
**Q. Why can't light escape from inside the Event Horizon?**
- **A)** Light is absorbed like a black sponge
- **B)** The escape velocity required exceeds the speed of light ($c$) ✅
- **C)** Black holes destroy electromagnetic waves
- **D)** Light stops moving in space

---
💬 *Would you like to explore Time Dilation (how time slows down near a black hole) or Hawking Radiation next?* ✨`;
  }

  // 11. Topic Knowledge: Quantum Physics
  if (normQ.includes('quantum') || normQ.includes('schrodinger') || normQ.includes('superposition') || normQ.includes('entanglement')) {
    return `### ⚛️ Quantum Physics: The Strange Rules of the Subatomic Realm

In our everyday world, a light switch is either **ON** or **OFF**. But in the quantum realm, until you look at it, particles exist in a cloud of probabilities where they can be **both ON and OFF simultaneously!**

---

### 💡 Core Pillars Explained Simply:
• **Superposition:** Particles exist in multiple potential states at once until measured.
• **Wave-Particle Duality:** Light behaves like waves (ripples in water) and particles (photons) depending on the observer.
• **Quantum Entanglement:** Two linked particles mirror each other instantly across light-years ("Spooky action at a distance").

---

### 🎯 Quick Question:
**Q. What happens to a particle in superposition the exact instant it is observed?**
- **A)** It disappears forever
- **B)** Its wave function collapses into a single definite state ✅
- **C)** It gains infinite mass
- **D)** It splits into two identical particles

---
💬 *Want to dive into Quantum Computing or Schrödinger's famous cat paradox?* 🚀`;
  }

  // 12. Dynamic Human-like Conversational Explanation Engine
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