// No imports needed for current implementation

export interface GroqFeedback {
  errorFound: boolean;
  correction: string;
  explanation: string;
  example: string;
  fluencyScore: number; // 0-100
}

/**
 * Service to interact with Groq API for grammar feedback.
 * Note: Real implementation would use the 'groq-sdk' or fetch to https://api.groq.com/openai/v1/chat/completions
 */
export async function getGrammarFeedback(text: string, level: string): Promise<GroqFeedback> {
  // In a real app, this would be a server-side call to Groq
  // For the MVP, we simulate the Groq response structure
  
  console.log(`Analyzing text for level ${level} using Groq...`);
  
  // This is where you'd call: 
  // const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     model: 'llama3-8b-8192',
  //     messages: [{ role: 'user', content: `Analyze this grammar for a ${level} learner: ${text}` }]
  //   })
  // });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        errorFound: true,
        correction: text.replace("don't", "doesn't"),
        explanation: `Groq Analysis: Third-person singular subjects require "doesn't" at the ${level} level.`,
        example: "He doesn't like tea.",
        fluencyScore: 85
      });
    }, 1500);
  });
}

export async function getTutorResponse(messages: { role: 'user' | 'assistant', content: string }[]): Promise<string> {
  // Simulate Groq conversational response
  const lastUserMessage = messages[messages.length - 1].content.toLowerCase();
  
  // Improved greeting check with word boundaries
  const isGreeting = /\b(hi|hello|hey|greetings)\b/g.test(lastUserMessage);

  return new Promise((resolve) => {
    setTimeout(() => {
      if (isGreeting) {
        resolve("Hello! I'm your AI Grammar Tutor. I'm here to help you practice your English. Would you like to talk about your day, or should we discuss a specific grammar topic like 'Present Continuous'?");
      } else if (lastUserMessage.includes('day')) {
        resolve("That sounds interesting! Please tell me more about what happened today. Remember to use the Past Simple (e.g., 'I finished my work') for completed actions. What was the most challenging part?");
      } else if (lastUserMessage.includes('company') || lastUserMessage.includes('ai') || lastUserMessage.includes('society')) {
        resolve("That is a very noble goal! Using AI to empower society and building a company is an ambitious plan. Your grammar in that sentence was excellent. By the way, 'to empower society' is a great collocation. How do you plan to start this journey?");
      } else if (/\bmore\b/.test(lastUserMessage)) {
        resolve("Excellent point. By the way, in professional writing, you can sometimes replace 'more' with 'further' for a more formal tone. What else is on your mind?");
      } else if (/\b(good|great)\b/.test(lastUserMessage)) {
        resolve("I'm glad to hear you're feeling positive! Using 'great' is perfect for casual conversation. If you wanted to sound even more descriptive, you could use 'productive' or 'rewarding'. What are you planning to do tomorrow?");
      } else {
        // Generic but safe feedback
        resolve(`I've analyzed your message. Your sentence structure is clear and correct! To keep the practice going, tell me a bit about your long-term goals. Where do you see yourself in five years?`);
      }
    }, 1200);
  });
}

export async function getSpeakingFeedback(transcription: string, originalPrompt: string, mode: 'shadowing' | 'free' = 'free'): Promise<GroqFeedback> {
  console.log(`Analyzing spoken text: "${transcription}" for mode: ${mode}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      let errorFound = false;
      let correction = transcription;
      let explanation = "Your speaking was clear and grammatically correct!";
      let example = "";
      let fluencyScore = 90 + Math.floor(Math.random() * 10);

      const lowerText = transcription.toLowerCase();

      if (mode === 'shadowing') {
        // Word-level similarity comparison instead of exact match
        const normalize = (s: string) => s.toLowerCase().replace(/[.,!?;:'"]/g, '').trim().split(/\s+/);
        const promptWords = normalize(originalPrompt);
        const spokenWords = normalize(transcription);

        const promptSet = new Set(promptWords);
        const spokenSet = new Set(spokenWords);
        const intersection = new Set([...promptSet].filter(w => spokenSet.has(w)));
        const union = new Set([...promptSet, ...spokenSet]);
        const similarity = union.size > 0 ? intersection.size / union.size : 0;

        // Find missing & extra words
        const missed = promptWords.filter(w => !spokenSet.has(w));
        const extra = spokenWords.filter(w => !promptSet.has(w));

        fluencyScore = Math.round(similarity * 100);

        if (similarity >= 0.95) {
          // Near-perfect match
          errorFound = false;
          explanation = "Excellent shadowing! Your pronunciation closely matched the model sentence.";
          fluencyScore = Math.max(fluencyScore, 92);
        } else if (similarity >= 0.7) {
          errorFound = true;
          correction = originalPrompt;
          const missedStr = missed.length > 0 ? `Missed words: "${missed.join('", "')}"` : '';
          const extraStr = extra.length > 0 ? `Unexpected words: "${extra.join('", "')}"` : '';
          explanation = `Close, but not quite! ${missedStr}${missedStr && extraStr ? '. ' : ''}${extraStr}. Try again to match the model more closely.`;
          example = `Model: "${originalPrompt}"`;
        } else {
          errorFound = true;
          correction = originalPrompt;
          explanation = "Your response diverged significantly from the model sentence. Listen carefully and try to match each word.";
          example = `Model: "${originalPrompt}"`;
        }
      } else {
        // Free response — expanded error pattern detection
        const errorPatterns: Array<{
          pattern: RegExp;
          fix: (text: string) => string;
          explanation: string;
          example: string;
          score: number;
        }> = [
          {
            pattern: /\b(he|she|it) go\b/i,
            fix: (t) => t.replace(/\b(he|she|it) go\b/gi, '$1 goes'),
            explanation: "Remember to add '-s' or '-es' for third-person singular in present tense.",
            example: "He goes to the gym every day.",
            score: 75,
          },
          {
            pattern: /\bi has\b/i,
            fix: (t) => t.replace(/\bi has\b/gi, 'I have'),
            explanation: "The first-person singular 'I' takes 'have', not 'has'.",
            example: "I have a lot of work today.",
            score: 80,
          },
          {
            pattern: /\byesterday i go\b/i,
            fix: (t) => t.replace(/\byesterday i go\b/gi, 'yesterday I went'),
            explanation: "When talking about the past, use the past simple form of the verb.",
            example: "Yesterday I went to the park.",
            score: 70,
          },
          {
            pattern: /\b(he|she|it) don't\b/i,
            fix: (t) => t.replace(/\b(he|she|it) don't\b/gi, "$1 doesn't"),
            explanation: "Third-person singular subjects use 'doesn't', not 'don't'.",
            example: "She doesn't like coffee.",
            score: 75,
          },
          {
            pattern: /\bthey was\b/i,
            fix: (t) => t.replace(/\bthey was\b/gi, 'they were'),
            explanation: "Plural subjects ('they', 'we') use 'were', not 'was'.",
            example: "They were at the park yesterday.",
            score: 78,
          },
          {
            pattern: /\bi (goed|runned|eated|writed|thinked|drived|comed|bringed)\b/i,
            fix: (t) => {
              const irregulars: Record<string, string> = { goed: 'went', runned: 'ran', eated: 'ate', writed: 'wrote', thinked: 'thought', drived: 'drove', comed: 'came', bringed: 'brought' };
              return t.replace(/\bi (goed|runned|eated|writed|thinked|drived|comed|bringed)\b/gi, (_, v) => `I ${irregulars[v.toLowerCase()] || v}`);
            },
            explanation: "This verb has an irregular past tense form. It doesn't follow the regular '-ed' pattern.",
            example: "I went to school. / I ran a marathon.",
            score: 72,
          },
          {
            pattern: /\bmore (better|worse|faster|slower|bigger|smaller|easier|harder)\b/i,
            fix: (t) => t.replace(/\bmore (better|worse|faster|slower|bigger|smaller|easier|harder)\b/gi, '$1'),
            explanation: "Don't use 'more' with comparative adjectives that already end in '-er'. This is a double comparative.",
            example: "This is better (not 'more better').",
            score: 76,
          },
          {
            pattern: /\bi am agree\b/i,
            fix: (t) => t.replace(/\bi am agree\b/gi, 'I agree'),
            explanation: "'Agree' is used directly as a verb, not with 'am'. This is a common mistake with stative verbs.",
            example: "I agree with your point.",
            score: 80,
          },
          {
            pattern: /\bsince (\d+|two|three|four|five|six|seven|eight|nine|ten) (year|month|week|day|hour)s?\b/i,
            fix: (t) => t.replace(/\bsince (\d+|two|three|four|five|six|seven|eight|nine|ten) (year|month|week|day|hour)s?\b/gi, 'for $1 $2s'),
            explanation: "Use 'for' with durations (for 3 years) and 'since' with specific points in time (since 2020).",
            example: "I have lived here for 5 years. / I have lived here since 2019.",
            score: 74,
          },
          {
            pattern: /\b(he|she|it) have\b/i,
            fix: (t) => t.replace(/\b(he|she|it) have\b/gi, '$1 has'),
            explanation: "Third-person singular subjects use 'has', not 'have'.",
            example: "She has a beautiful garden.",
            score: 78,
          },
          {
            pattern: /\bdid (went|saw|ate|ran|came|took|gave|made)\b/i,
            fix: (t) => {
              const baseForm: Record<string, string> = { went: 'go', saw: 'see', ate: 'eat', ran: 'run', came: 'come', took: 'take', gave: 'give', made: 'make' };
              return t.replace(/\bdid (went|saw|ate|ran|came|took|gave|made)\b/gi, (_, v) => `did ${baseForm[v.toLowerCase()] || v}`);
            },
            explanation: "After 'did', use the base form of the verb, not the past tense. 'Did' already marks the past.",
            example: "Did you go to the store? (not 'Did you went')",
            score: 70,
          },
        ];

        // Check each pattern
        for (const ep of errorPatterns) {
          if (ep.pattern.test(lowerText)) {
            errorFound = true;
            correction = ep.fix(transcription);
            explanation = ep.explanation;
            example = ep.example;
            fluencyScore = ep.score;
            break; // Report the first error found
          }
        }

        // Short answer check
        if (!errorFound && lowerText.length < 10) {
          explanation = "Good start! Try to expand your answer with more detail for a better fluency score.";
          fluencyScore = 60;
        } else if (!errorFound && lowerText.length < 25) {
          explanation = "Grammatically correct! Consider elaborating a bit more to practice longer sentence structures.";
          fluencyScore = 78;
        }
      }

      resolve({
        errorFound,
        correction,
        explanation,
        example,
        fluencyScore
      });
    }, 1500);
  });
}

export interface InterpersonalFeedback {
  tone: string;
  tactScore: number;
  tactFeedback: string;
  grammarFeedback: string;
  refinedVersion: string;
}

export async function getInterpersonalFeedback(
  text: string, 
  scenarioPrompt: string, 
  scenarioContext: string
): Promise<InterpersonalFeedback> {
  console.log("Analyzing interpersonal skills for:", text);

  return new Promise((resolve) => {
    setTimeout(() => {
      let tone = "Professional";
      let tactScore = 9;
      let tactFeedback = "Excellent! You matched the professional tone of the context and addressed the issue directly but politely.";
      let grammarFeedback = "Your grammar is perfect.";
      let refinedVersion = text;

      const lowerText = text.toLowerCase();

      if (lowerText.length < 15) {
        tone = "Blunt";
        tactScore = 4;
        tactFeedback = "This response is a bit too short for a corporate setting. It might come across as dismissive or cold.";
        refinedVersion = "Thank you for the update. I appreciate you bringing this to my attention, and I'll look into it right away.";
      } else if (lowerText.includes("no") || lowerText.includes("cannot") || lowerText.includes("won't")) {
        tone = "Direct/Potentially Negative";
        tactScore = 6;
        tactFeedback = "While clear, using direct negatives can sometimes sound harsh. Try 'softening' your refusal by explaining the constraint first.";
        refinedVersion = text.replace(/no|cannot|won't/g, "I'm currently unable to... due to...");
      } else if (lowerText.includes("please") || lowerText.includes("could you") || lowerText.includes("thank")) {
        tone = "Polite and Collaborative";
        tactScore = 10;
        tactFeedback = "Great use of polite markers. This helps maintain a positive working relationship even when delivering tough news.";
      }

      if (lowerText.includes("i is") || lowerText.includes("you is")) {
        grammarFeedback = "Subject-verb agreement error: 'I am' or 'You are'.";
      }

      resolve({
        tone,
        tactScore,
        tactFeedback,
        grammarFeedback,
        refinedVersion
      });
    }, 1800);
  });
}

export interface GoldenReplyFeedback {
  originalTone: string;
  goldenReply: string;
  explanation: string;
  tactScore: number;
}

export async function getGoldenReply(text: string, context: string, imageContext?: string): Promise<GoldenReplyFeedback> {
  console.log("Generating Golden Reply for:", text, "in context:", context, "with image context:", !!imageContext);

  return new Promise((resolve) => {
    setTimeout(() => {
      let originalTone = "Direct & Informative";
      let goldenReply = text;
      let explanation = "Polished for professional clarity and impact.";
      let tactScore = 10;

      const lowerText = text.toLowerCase();
      
      if (lowerText.length < 10) {
        originalTone = "Extremely Blunt";
        goldenReply = `Hello, thank you for reaching out. I wanted to let you know that I've received your message and will provide a more detailed update shortly.`;
        explanation = "Expanded the short message into a complete professional acknowledgment.";
      } else if (lowerText.includes("late") || lowerText.includes("delay") || lowerText.includes("traffic")) {
        originalTone = "Informal/Casual";
        goldenReply = "I apologize for the delay. I am currently held up, but I am making every effort to arrive as quickly as possible. Thank you for your patience.";
        explanation = "Replaced casual language with a formal apology and a commitment to resolution.";
      } else if (lowerText.includes("no") || lowerText.includes("can't") || lowerText.includes("impossible")) {
        originalTone = "Defensive/Negative";
        goldenReply = `Thank you for the opportunity to assist with this. However, given my current commitments, I won't be able to take this on immediately. Could we perhaps revisit this later in the week?`;
        explanation = "Softened the refusal with a 'Yes, but' approach, maintaining a collaborative spirit.";
      } else {
      if (imageContext) {
        goldenReply = `Thank you for sharing the conversation context. Based on that, here is a refined response: ${text.charAt(0).toUpperCase() + text.slice(1)}. I've adjusted the tone to match the ongoing discussion for a more natural transition.`;
        explanation = "Analyzed the provided screenshot for conversation flow and context. The tone has been harmonized with the previous messages.";
      } else {
        goldenReply = `Thank you for your message. ${text.charAt(0).toUpperCase() + text.slice(1)}.`;
        explanation = "Enclosed your intent within a professional frame that emphasizes results and professional courtesy.";
      }
      }

      resolve({
        originalTone,
        goldenReply,
        explanation,
        tactScore
      });
    }, 2000);
  });
}
