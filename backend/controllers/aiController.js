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

function generateAcademicResponse(question, subject = 'students', context = '') {
  const normQ = question.toLowerCase();
  const subInfo = subjectKnowledgeBase[subject] || subjectKnowledgeBase.students;
  
  if (normQ.includes('mcq') || normQ.includes('quiz') || normQ.includes('test me') || normQ.includes('practice question')) {
    return `### 🎯 High-Yield Practice Questions (${subInfo.name})

**Q1. Conceptual Understanding:**
Which of the following principles is central to **${question.replace(/\?/g, '')}**?
- **A)** It operates independently of underlying boundary conditions.
- **B)** It requires systematic verification of core parameters and statutory/scientific rules. ✅
- **C)** It is purely theoretical with zero practical exam applications.
- **D)** It has been deprecated in recent curriculum updates.

> **Answer:** **(B)**
> **Explanation:** Top examination rubrics test deep first-principles clarity along with edge-case exceptions.

---

**Q2. Application & Problem-Solving:**
When presented with a complex multi-part problem on this topic, what is the best procedural approach?
- **A)** Compute numerical results directly without stating formulas
- **B)** State given boundary values, identify governing standard/theorem, and solve step-by-step ✅
- **C)** Skip intermediate working to save time
- **D)** Guess the closest option

> **Answer:** **(B)**
> **Explanation:** Methodical step marks and formula citation maximize score reliability under exam pressure.`;
  }

  if (normQ.includes('formula') || normQ.includes('cheat sheet') || normQ.includes('equation') || normQ.includes('summary')) {
    return `### 📋 Quick Revision & Formula Cheat Sheet (${subInfo.name})

**1. Core Topic Definition:**
- **Topic:** ${question}
- **Subject Domain:** ${subInfo.name}

**2. Essential Mathematical / Statutory Formulations:**
\`\`\`text
• Primary Formulation: Output = Function(Inputs, Constraints)
• Efficiency / Performance Ratio = [Target Metric / Total Base]
• Condition for Equilibrium / Compliance: Threshold Criterion >= Statutory Limit
\`\`\`

**3. Three Golden Rules for Top Scores:**
1. **Double Check Units & Reference Standards:** Always state governing sections or standard units (SI).
2. **Watch for Negative Constraints:** Read carefully if a question asks for *"Which is INCORRECT"*.
3. **Mnemonic / Memory Hook:** Remember: *Definition → Governing Mechanism → Boundary Exception*.`;
  }

  return `### 🎓 Academic Tutor Explanation (${subInfo.name})

**📌 Query Breakdown:**
*${question.trim().endsWith('?') ? question : question + '?'}*

**1. Core Theory & Foundation:**
In **${subInfo.name}**, this concept forms a vital building block. Questions testing this area look for both theoretical precision and practical problem-solving ability.

${context ? `> **Referenced Article Context:** ${context.slice(0, 180)}...\n` : ''}

**2. Key Steps & Mechanics:**
• **Step 1:** Establish what is given and state applicable standards, laws, or physics/math equations.
• **Step 2:** Break complex problems into smaller sub-components to prevent calculation and conceptual slip-ups.
• **Step 3:** Review boundary conditions or edge cases (e.g., zero denominators, exempt statutory categories).

**3. Common Examiner Traps to Avoid:**
⚠️ **Trap 1:** Confusing similar-sounding terms or applying theorems outside their valid domain.
⚠️ **Trap 2:** Overlooking assumptions (e.g., ideal gas, arm's length price, constant friction).

**4. Exam Scoring Strategy:**
Present your working clearly with labeled steps. On multiple-choice questions, eliminate the two most obviously flawed options first before choosing the best answer.

---
💡 *Want practice MCQs, a step-by-step formula breakdown, or a simplified analogy? Just ask!*`;
}

const askAI = async (req, res) => {
  try {
    const { question, subject = 'students', context = '' } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({ message: 'Question is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const subInfo = subjectKnowledgeBase[subject] || subjectKnowledgeBase.students;
        const systemPrompt = `${subInfo.promptContext}
You are an intelligent, encouraging, and highly precise academic tutor on TailoredTimes.
Help students clear doubts with step-by-step explanations, clear headings, formulas, and exam tips.
Format responses in clean GitHub-style Markdown.`;

        const userPrompt = `Subject: ${subInfo.name}
${context ? 'Article Context: ' + context + '\n' : ''}
Student Question: ${question}`;

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
              subject,
              source: 'gemini-ai'
            });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call error:', geminiError.message);
      }
    }

    const localAnswer = generateAcademicResponse(question, subject, context);
    return res.json({
      answer: localAnswer,
      subject,
      source: 'academic-tutor-engine'
    });

  } catch (error) {
    console.error('AI Controller Error:', error);
    res.status(500).json({ message: 'Error processing AI doubt request', error: error.message });
  }
};

module.exports = {
  askAI
};