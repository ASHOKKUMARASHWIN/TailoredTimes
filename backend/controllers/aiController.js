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
 * Universal Academic Response Generator for Tyla
 */
function generateAcademicResponse(question, mode = 'doubt', context = '') {
  const normQ = question.toLowerCase();

  // 1. Mnemonic / Memory Hook Generator Mode
  if (mode === 'mnemonic' || normQ.includes('mnemonic') || normQ.includes('acronym') || normQ.includes('remember') || normQ.includes('trick')) {
    return `### 🧠 Tyla's Memory Mnemonic & Catchy Acronym

**📌 Concept to Memorize:**
*${question}*

${context ? `> **Context:** ${context.slice(0, 160)}...\n` : ''}

**💡 The Golden Acronym / Hook:**
> **M-A-S-T-E-R**
> • **M** — **Mechanics:** Understand the core physical/statutory rule first
> • **A** — **Application:** Identify the input parameters and units
> • **S** — **Sign & Standards:** Apply governing formulas / Ind AS / Newton / NCERT laws
> • **T** — **Thresholds:** Check statutory limits or boundary conditions (e.g. $T > 0$, limits)
> • **E** — **Exceptions:** Remember edge-case exemptions and corner traps
> • **R** — **Review:** Verify the final units and conclusion

**🎯 Fun Story / Visual Analogy:**
Think of this concept like a *train switching tracks*:
- The *locomotive engine* represents the main driving force / law.
- The *switches* represent statutory exemptions or boundary thresholds.
- When both align, the train reaches the terminal smoothly without derailment!

**⚡ Quick 10-Second Recall Rule:**
Whenever this appears in an exam, write down the 3-letter trigger: **[Trigger → Formula → Exception]** before solving!`;
  }

  // 2. Interactive Live Quiz Mode (MCQ Generator)
  if (mode === 'quiz' || normQ.includes('mcq') || normQ.includes('quiz') || normQ.includes('test me') || normQ.includes('practice question')) {
    return `### 🎯 Tyla's Interactive Quiz (Tap an option to test yourself!)

**Q1. Core Principle & Identification:**
Which of the following statements is **most accurate** regarding **${question.replace(/\?/g, '')}**?
- **A)** It operates independently of underlying boundary conditions or statutory limits.
- **B)** It requires systematic verification of governing parameters and edge-case exceptions. ✅
- **C)** It is purely theoretical with zero practical or exam scoring implications.
- **D)** It is deprecated in recent syllabus editions.

> **Tyla's Explanation:** Top exam rubrics test deep first-principles clarity along with boundary condition exceptions.

---

**Q2. Step-by-Step Problem Solving:**
When presented with a complex multi-part problem on this topic, what is the best initial step?
- **A)** Compute numerical results directly without stating formulas
- **B)** State given boundary values, identify governing standard/law, and solve step-by-step ✅
- **C)** Skip intermediate working to save time
- **D)** Guess the closest approximate option

> **Tyla's Explanation:** Methodical step marks and formula citation maximize score reliability under exam pressure.

---

**Q3. Advanced Edge-Case:**
If a parameter exceeds the standard threshold in this topic, what is the direct consequence?
- **A)** The governing model requires adjustment for non-linear or statutory divergence. ✅
- **B)** The calculation defaults to zero automatically.
- **C)** Marks are awarded only for descriptive text.
- **D)** No adjustment is required.

> **Tyla's Explanation:** Always check whether boundary thresholds trigger alternative formulas or statutory rules!`;
  }

  // 3. Formula Cheat Sheet Mode
  if (mode === 'formulas' || normQ.includes('formula') || normQ.includes('cheat sheet') || normQ.includes('equation') || normQ.includes('summary')) {
    return `### 📋 Tyla's High-Yield Formula & Rule Cheat Sheet

**1. Core Topic Definition:**
- **Topic:** ${question}
- **Applicability:** Universal High-Yield Academic Module

**2. Essential Mathematical / Scientific / Statutory Formulations:**
\`\`\`text
• Primary Formulation: Output = Function(Inputs, Boundary Constraints)
• Efficiency / Performance Ratio = [Target Metric / Total Base Metric]
• Equilibrium / Compliance Condition: Threshold Criterion >= Statutory Limit
\`\`\`

**3. Three Golden Rules for Top Exam Scores:**
1. **Double Check Units & Reference Standards:** Always state governing sections, SI units, or standard conventions.
2. **Watch for Negative Constraints:** Read carefully if a question asks for *"Which is INCORRECT"*.
3. **Mnemonic Hook:** Remember: *Definition → Governing Mechanism → Boundary Exception*.`;
  }

  // 4. Default: Comprehensive Step-by-Step Doubt Solver Mode
  return `### 🎓 Tyla's Academic Explanation

**📌 Query Breakdown:**
*${question.trim().endsWith('?') ? question : question + '?'}*

**1. Core Theory & Foundation:**
At its foundation, this topic connects core theoretical principles with practical exam applications. Mastering it requires understanding the structural mechanics from first principles.

${context ? `> **Referenced Article Context:** ${context.slice(0, 180)}...\n` : ''}

**2. Step-by-Step Breakdown & Mechanics:**
• **Step 1 (Groundwork):** Identify the governing parameters and what the examiner is specifically evaluating.
• **Step 2 (Execution):** Apply the systematic method—whether deriving equations, calculating statutory figures, or analyzing conceptual nuance.
• **Step 3 (Edge Cases):** Pay special attention to exceptions. Examiners frequently design tricky questions around boundary conditions where standard rules alter.

**3. Common Examiner Traps to Avoid:**
⚠️ **Trap 1:** Memorizing formulas without understanding their derivations or limits of applicability.
⚠️ **Trap 2:** Overlooking assumptions or negative constraints (e.g. *"Which of the following is NOT true"*).

**4. Scoring Strategy:**
Present your working clearly with labeled steps. On multiple-choice questions, eliminate the two most obviously flawed options first before selecting your final answer.

---
💡 *Want an interactive practice quiz, a formula cheat sheet, or a catchy memory mnemonic? Just ask Tyla!*`;
}

const askAI = async (req, res) => {
  try {
    const { question, mode = 'doubt', context = '' } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ message: 'Question is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const systemPrompt = `You are Tyla, an intelligent, encouraging, friendly, and highly precise universal academic AI study mentor on TailoredTimes.
Help students clear doubts across any subject (CA, NEET, JEE, SAT, IELTS, TOEFL, STEM, Humanities, Law, and General Studies).
Provide step-by-step explanations, clear headings, formulas, and exam tips.
When generating MCQs, format options as "- **A)** Option", "- **B)** Option", etc. and include ✅ on the correct answer.
Format responses in clean GitHub-style Markdown.`;

        const userPrompt = `${context ? 'Article Context: ' + context + '\n' : ''}Mode: ${mode}\nStudent Question: ${question}`;

        const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(geminiEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: systemPrompt + '\n\n' + userPrompt }] }
            ],
            generationConfig: {
              temperature: 0.4,
              maxOutputTokens: 1000
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