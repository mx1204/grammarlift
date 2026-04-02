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
      let originalTone = "Neutral";
      let goldenReply = "";
      let explanation = "";
      let tactScore = 10;
      
      const lowerText = text.toLowerCase().trim();
      const isShort = lowerText.length < 15;

      // Tone Detection Logic
      if (isShort) {
        originalTone = "Extremely Blunt";
        tactScore = 4;
      } else if (/\b(late|delay|traffic|sorry|apologies|behind)\b/i.test(lowerText)) {
        originalTone = "Apologetic / Excuse-making";
        tactScore = 7;
      } else if (/\b(no|can't|impossible|won't|busy|unable|not going to)\b/i.test(lowerText)) {
        originalTone = "Direct Refusal";
        tactScore = 6;
      } else if (/\b(just|actually|per my last|as stated|honestly|to be fair)\b/i.test(lowerText)) {
        originalTone = "Passive-Aggressive / Defensive";
        tactScore = 5;
      } else if (/\b(wow|unbelievable|fix|now|immediate|bad|fail)\b/i.test(lowerText)) {
        originalTone = "Emotional / Frustrated";
        tactScore = 3;
      } else if (/\b(hey|yo|dude|thanks|np|k|ok|lol)\b/i.test(lowerText)) {
        originalTone = "Casual / Informal";
        tactScore = 8;
      } else if (/\b(do this|send it|tell me|i need|you should)\b/i.test(lowerText)) {
        originalTone = "Commanding / Bossy";
        tactScore = 5;
      } else if (/\b(maybe|perhaps|i think|not sure|we'll see)\b/i.test(lowerText)) {
        originalTone = "Vague / Non-committal";
        tactScore = 7;
      } else {
        originalTone = "Direct & Informative";
        tactScore = 9;
      }

      // Context-aware generation
      const prefix = context === 'Email to Manager' ? "Dear Management, " : 
                     context === 'Client Communication' ? "Hello, thank you for your patience. " :
                     context === 'Team Chat (Slack/Teams)' ? "Hey team, " : "";
      
      const closer = context === 'Email to Manager' ? "\n\nBest regards,\n[Your Name]" :
                     context === 'Client Communication' ? "\n\nPlease let me know if you have any further questions." :
                     context === 'Networking Request' ? "\n\nI look forward to potentially connecting." : "";

      if (imageContext) {
        goldenReply = `Thank you for sharing the conversation context. ${prefix}I've reviewed the previous messages and regarding "${text}", I propose: ${text.charAt(0).toUpperCase() + text.slice(1)}. I've adjusted the tone to ensure a smooth transition in our ongoing discussion. ${closer}`;
        explanation = "Analyzed the provided screenshot for conversation flow. The tone has been harmonized with the previous interaction for maximum tact.";
      } else if (originalTone === "Extremely Blunt") {
        goldenReply = `${prefix}Thank you for the update. I appreciate you bringing this to my attention. regarding your point about ${text}, I will ensure we address this promptly. ${closer}`;
        explanation = "Expanded the blunt input into a professional acknowledgment that demonstrates proactive engagement.";
      } else if (originalTone === "Apologetic / Excuse-making") {
        goldenReply = `${prefix}I apologize for any inconvenience caused by the delay. I am currently focusing all efforts on resolving this as quickly as possible. Thank you for your continued patience. ${closer}`;
        explanation = "Shifted the focus from the 'excuse' to the solution and appreciation for the other party's patience.";
      } else if (originalTone === "Direct Refusal") {
        goldenReply = `${prefix}Thank you for considering me for this. However, due to my current project commitments, I won't be able to prioritize this immediately. Could we perhaps revisit this later? ${closer}`;
        explanation = "Used a 'Soft No' strategy. It maintains boundaries while remaining collaborative and open to future opportunities.";
      } else if (originalTone === "Passive-Aggressive / Defensive") {
        goldenReply = `${prefix}Thank you for the clarification. I appreciate the feedback and will take these points into account as we move forward to ensure the best outcome for the project. ${closer}`;
        explanation = "Neutralized defensive language with growth-oriented phrasing that focuses on project outcomes rather than personal friction.";
      } else if (originalTone === "Emotional / Frustrated") {
        goldenReply = `${prefix}I understand there are some challenges with the current situation. I'd like to schedule a brief call to discuss how we can align our efforts and find a constructive path forward. ${closer}`;
        explanation = "De-escalated emotional language by proposing a constructive communication channel (a call) and focusing on 'alignment'.";
      } else if (context === 'Networking Request') {
        goldenReply = `Hello, I've been following your work in the industry and was impressed by your recent insights. ${text.charAt(0).toUpperCase() + text.slice(1)}. I'd love to connect and learn more about your journey. ${closer}`;
        explanation = "Transformed the request into a value-based networking approach by adding a personalized compliment and a clear intent.";
      } else {
        goldenReply = `${prefix}${text.charAt(0).toUpperCase() + text.slice(1)}. I believe this approach will ensure clarity and maintain our professional standards. ${closer}`;
        explanation = "Enclosed your intent within a professional frame that emphasizes quality and standard compliance.";
      }
      resolve({
        originalTone,
        goldenReply: goldenReply.trim(),
        explanation,
        tactScore
      });
    }, 1500);
  });
}

export interface FreeWritingHighlight {
  type: 'error' | 'suggestion';
  text: string;
  correction: string;
  explanation: string;
  start: number;
  end: number;
}

export interface FreeWritingFeedback {
  highlights: FreeWritingHighlight[];
  tone: string;
  toneExplanation: string;
  score: number;
}

export async function getFreeWritingFeedback(text: string): Promise<FreeWritingFeedback> {
  console.log("Analyzing free writing text:", text);

  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      const highlights: FreeWritingHighlight[] = [];
      let tone = "Professional & Balanced";
      let toneExplanation = "Your message is polite, clear, and professional.";
      let score = 90;

      // 1. Interpersonal Tone Analysis (5+ patterns)
      if (lowerText.length > 0) {
        if (/\b(urgent|now|immediately|fix it|do it)\b/i.test(lowerText)) {
          tone = "Demanding / Harsh";
          toneExplanation = "This message may sound overly commanding. Consider adding 'Could you' or 'please' to soften the request.";
          score -= 15;
        } else if (/\b(actually|as i said|per my last|honestly)\b/i.test(lowerText)) {
          tone = "Passive-Aggressive / Defensive";
          toneExplanation = "Using phrases like 'per my last' can come across as frustrated in a professional context.";
          score -= 10;
        } else if (lowerText.length < 30 && (lowerText.includes("no") || lowerText.includes("wrong"))) {
          tone = "Blunt / Negative";
          toneExplanation = "This short response might sound dismissive or blunt. Try adding a brief explanation to maintain a collaboration spirit.";
          score -= 20;
        } else if (/\b(thanks|appreciate|please|happy to|collaborate|help)\b/i.test(lowerText)) {
          tone = "Helpful & Collaborative";
          toneExplanation = "Great use of polite markers! This builds strong working relationships.";
          score += 5;
        }
      }

      // 2. Grammar Pattern Detection (12+ patterns)
      const patterns: Array<{
        regex: RegExp;
        correction: string;
        explanation: string;
        type: 'error' | 'suggestion';
      }> = [
        {
          regex: /\b(he|she|it) don't\b/gi,
          correction: "$1 doesn't",
          explanation: "Third-person singular subjects use 'doesn't', not 'don't'.",
          type: 'error'
        },
        {
          regex: /\bi has\b/gi,
          correction: "I have",
          explanation: "'I' takes 'have', not 'has'.",
          type: 'error'
        },
        {
          regex: /\byesterday i go\b/gi,
          correction: "yesterday I went",
          explanation: "Use the past simple form 'went' when talking about yesterday.",
          type: 'error'
        },
        {
          regex: /\bgive it to me\b/gi,
          correction: "could you please provide it?",
          explanation: "Consider using a more formal and polite request in writing.",
          type: 'suggestion'
        },
        {
          regex: /\b(they|we) was\b/gi,
          correction: "$1 were",
          explanation: "Plural subjects ('they', 'we') take 'were', not 'was'.",
          type: 'error'
        },
        {
          regex: /\bi am agree\b/gi,
          correction: "I agree",
          explanation: "'Agree' is a verb on its own. You don't need 'am'.",
          type: 'error'
        },
        {
          regex: /\bmore better\b/gi,
          correction: "better",
          explanation: "Avoid double comparatives. 'Better' is already the comparative form.",
          type: 'error'
        },
        {
          regex: /\bgoed\b/gi,
          correction: "went",
          explanation: "The past tense of 'go' is 'went' (irregular).",
          type: 'error'
        },
        {
          regex: /\bsince 5 years\b/gi,
          correction: "for 5 years",
          explanation: "Use 'for' for durations and 'since' for specific points in time.",
          type: 'error'
        },
        {
          regex: /\bdid went\b/gi,
          correction: "did go",
          explanation: "After 'did', use the base form of the verb (go).",
          type: 'error'
        },
        {
          regex: /\bi look forward to see you\b/gi,
          correction: "I look forward to seeing you",
          explanation: "After 'look forward to', use the -ing form (seeing).",
          type: 'error'
        },
        {
          regex: /\banyways\b/gi,
          correction: "anyway",
          explanation: "'Anyway' is standard in formal writing; 'anyways' is informal.",
          type: 'suggestion'
        }
      ];

      // Run detection
      patterns.forEach(p => {
        let match;
        // Reset regex state for global
        p.regex.lastIndex = 0;
        while ((match = p.regex.exec(text)) !== null) {
          highlights.push({
            type: p.type,
            text: match[0],
            correction: p.correction.replace('$1', match[1] || ''),
            explanation: p.explanation,
            start: match.index,
            end: match.index + match[0].length
          });
          score -= 5;
        }
      });

      // Cleanup and cap score
      score = Math.max(0, Math.min(100, score));

      resolve({
        highlights: highlights.sort((a, b) => a.start - b.start),
        tone,
        toneExplanation,
        score
      });
    }, 1800);
  });
}
