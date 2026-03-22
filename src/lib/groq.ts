// No imports needed for current implementation

export interface GroqFeedback {
  errorFound: boolean;
  correction: string;
  explanation: string;
  example: string;
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
        example: "He doesn't like tea."
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
