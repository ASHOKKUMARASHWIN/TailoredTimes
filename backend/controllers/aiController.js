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
  const normQ = question.trim().toLowerCase();

  // 1. Natural Human Greetings & Small Talk
  const greetings = ['hi', 'hello', 'hey', 'heyy', 'heyyy', 'hola', 'hi tyla', 'hello tyla', 'hey tyla', 'good morning', 'good afternoon', 'good evening', 'sup', "what's up", 'yo'];
  if (greetings.includes(normQ) || normQ === 'hi!' || normQ === 'hello!' || normQ === 'hey!') {
    return `Hey there! 👋 Wonderful to see you! 

I'm **Tyla**, your personal AI study buddy. Whether you're stuck on a tricky question, preparing for an upcoming exam, or just want to explore something interesting—I'm here to help make learning feel effortless and fun!

**What's on your mind today?**
• Have a specific question or doubt you want to solve?
• Want me to explain a tough concept with a simple analogy?
• Or would you like a quick 3-question quiz to test your memory? 🎯`;
  }

  if (normQ.includes('how are you') || normQ.includes('how r u') || normQ.includes('how are u')) {
    return `I'm doing fantastic, thanks for asking! 😊 Energized and ready to help you learn. 

How is your study session going today? What topic or subject are we diving into?`;
  }

  if (normQ.includes('who are you') || normQ.includes('what are you') || normQ.includes('tell me about yourself') || normQ.includes('what can you do')) {
    return `I'm **Tyla**! ✨ Think of me as your 24/7 friendly tutor and study companion on **TailoredTimes**.

Here is how we can work together:
• 💡 **Clear Doubts:** I explain complex ideas in simple, plain terms using real-world analogies.
• 🎯 **Interactive Quizzes:** I can generate practice MCQs where you can tap to test your knowledge!
• 🧠 **Memory Mnemonics:** I create catchy acronyms and mental hooks to remember formulas & rules.
• 📋 **Cheat Sheets:** Quick bullet-point summaries and formulas for last-minute revision.
• 🔊 **Voice Readout:** You can click *"Listen to Tyla"* to have me explain concepts out loud!

Just type any question, homework problem, or topic, and let's conquer it together! 🚀`;
  }

  if (normQ.includes('thank you') || normQ.includes('thanks') || normQ === 'thx' || normQ.includes('ty') || normQ.includes('great job') || normQ.includes('awesome')) {
    return `You're so very welcome! 🌟 You're doing amazing work. 

Remember, consistency is key! Whenever you hit another roadblock or need a quick quiz, just send it over. Happy studying! 📚✨`;
  }

  if (normQ.includes('bye') || normQ.includes('good night') || normQ.includes('see you') || normQ.includes('cya')) {
    return `Take care and great job studying today! 👋 Rest well, and I'll be right here whenever you're ready to learn again. You've got this! ⭐`;
  }

  // 2. Mnemonic / Memory Hook Generator
  if (mode === 'mnemonic' || normQ.includes('mnemonic') || normQ.includes('acronym') || normQ.includes('remember') || normQ.includes('trick')) {
    return `### 🧠 Tyla's Memory Mnemonic

Here's a catchy memory hook to make **${question}** stick in your brain effortlessly!

${context ? `> **Context Attached:** ${context.slice(0, 160)}...\n` : ''}

**💡 The Golden Acronym: M-A-S-T-E-R**
• **M** — **Mechanics:** Understand the core physical or statutory rule first.
• **A** — **Application:** Identify the input parameters, variables, and units.
• **S** — **Sign & Standards:** Apply governing formulas, Ind AS, laws, or theorems.
• **T** — **Thresholds:** Check statutory limits or boundary conditions ($T > 0$, exemption ceilings).
• **E** — **Exceptions:** Watch out for corner cases and examiner trap exemptions.
• **R** — **Review:** Double check the final units and conclusion!

**🎯 The 10-Second Mental Picture:**
Imagine this concept like a *train switching tracks*: the main locomotive is the core formula, while the switches are statutory limits or boundary rules. When both align, you reach the correct answer every time!

*Does this memory trick help, or would you like another custom rhyme?* 😊`;
  }

  // 3. Interactive Live Quiz Mode (MCQ Generator)
  if (mode === 'quiz' || normQ.includes('mcq') || normQ.includes('quiz') || normQ.includes('test me') || normQ.includes('practice question')) {
    return `### 🎯 Tyla's Interactive Practice Quiz
*Tap any option below to test your understanding!*

**Q1. Core Concept Check:**
Which of the following statements is **most accurate** regarding **${question.replace(/\?/g, '')}**?
- **A)** It operates independently of underlying boundary conditions or statutory limits.
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

> **Tyla's Tip:** Methodical step marks and formula citation maximize score reliability under exam pressure!

---

**Q3. Advanced Edge-Case:**
If a parameter exceeds the standard threshold in this topic, what is the direct consequence?
- **A)** The governing model requires adjustment for non-linear or statutory divergence. ✅
- **B)** The calculation defaults to zero automatically.
- **C)** Marks are awarded only for descriptive text.
- **D)** No adjustment is required.

> **Tyla's Tip:** Always check whether boundary thresholds trigger alternative formulas or rules!`;
  }

  // 4. Formula Cheat Sheet Mode
  if (mode === 'formulas' || normQ.includes('formula') || normQ.includes('cheat sheet') || normQ.includes('equation') || normQ.includes('summary')) {
    return `### 📋 Tyla's Quick Revision & Formula Sheet

Here is your high-yield summary for **${question}**:

**1. Core Formulations & Relations:**
\`\`\`text
• Primary Formulation: Output = Function(Inputs, Constraints)
• Efficiency / Performance Ratio = [Target Metric / Total Base Metric]
• Equilibrium / Compliance Condition: Threshold Criterion >= Statutory Limit
\`\`\`

**2. Three Golden Rules for Full Marks:**
1. **Always State Units & Conventions:** Cite standard SI units or statutory section numbers.
2. **Watch for Negative Phrasing:** Pay close attention if a question asks for *"Which is NOT true"*.
3. **Check Edge Cases:** Verify zero-values or ceiling limits before finalizing.

*Need a quick practice question to test how to apply these formulas?*`;
  }

  // 5. Default: Friendly, Step-by-Step Doubt Explanation
  return `### 💡 Let's Break Down: ${question.replace(/\?/g, '')}

${context ? `> **Referenced Story / Module:** ${context.slice(0, 160)}...\n` : ''}

**1. What is this concept in simple terms?**
Think of this concept from first principles: it provides the governing framework to solve specific problems and predict how variables or rules behave under real-world conditions.

**2. Step-by-Step How It Works:**
• **Step 1 (The Setup):** Identify the given values, laws, or statutory standards that apply.
• **Step 2 (The Mechanism):** Walk through the logical process—connecting the cause to the effect or applying the formula directly.
• **Step 3 (The Verification):** Always check boundary conditions (e.g. extreme values, exemptions, or negative constraints).

**3. ⚠️ Common Traps to Watch Out For:**
Examiners frequently test the small details—like forgetting negative signs, confusing similar-sounding terminology, or applying standard rules when an exception applies!

---
💬 *How does this sound? Would you like a simple real-world analogy, a 3-question practice quiz, or a formula sheet? Just let me know!* 😊`;
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
        const systemPrompt = `You are Tyla, an intelligent, encouraging, friendly, and highly conversational universal academic AI study buddy and tutor on TailoredTimes (like ChatGPT, Gemini, and Claude).
Help students with any topic—from homework doubts, accounting standards, STEM, coding, essay writing, exam preparation, to fun conversational questions.
Respond warmly, empathetically, and conversationally.
When explaining concepts, use intuitive real-life analogies, clear step-by-step structure, bullet points, and check in on the student.
When generating practice quizzes/MCQs, format options as "- **A)** Option text", "- **B)** Option text", etc. with ✅ next to the correct answer.
Format responses in clean GitHub-style Markdown.`;

        const contents = [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'model', parts: [{ text: "Hey! I'm Tyla, your AI study buddy. I'm ready to help with warmth, clarity, and precision!" }] }
        ];

        // Append multi-turn history
        if (Array.isArray(history)) {
          for (const turn of history) {
            if (turn && turn.content) {
              contents.push({
                role: turn.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: turn.content }]
              });
            }
          }
        }

        // Current student turn
        const currentPrompt = `${context ? 'Article Attached Context: ' + context + '\n' : ''}${question}`;
        contents.push({
          role: 'user',
          parts: [{ text: currentPrompt }]
        });

        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(geminiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 1200
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
        console.warn('Gemini API multi-turn call error:', geminiError.message);
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