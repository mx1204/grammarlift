import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log("Chat Request Received. Message count:", messages?.length);

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.warn("GROQ_API_KEY is missing in env vars. Using simulation.");
      return NextResponse.json({ 
        content: "[SIMULATION] I'm currently in simulation mode because no API key was found. How can I help you practice today?" 
      });
    }

    console.log("Attempting to call Groq API (llama-3.1-8b-instant)...");
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant', // Switched to a more widely available model
          messages: [
            { 
              role: 'system', 
              content: "You are a professional, friendly English Grammar Tutor. Your goal is to help users improve their English through conversation. Keep replies concise, encouraging, and occasionally point out grammar improvements if you see mistakes. Use a sophisticated but accessible tone." 
            },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 500
        }),
        // Avoid using AbortSignal.timeout if it might not be supported in user's Node version
      });

      if (!response.ok) {
        const data = await response.json();
        console.error("Groq API Error Response:", response.status, data);
        return NextResponse.json(
          { error: `Groq AI Error (${response.status}): ${data.error?.message || 'Unknown error'}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      console.log("Groq API Success.");

      return NextResponse.json({ 
        content: data.choices?.[0]?.message?.content || "I'm sorry, I couldn't generate a response."
      });

    } catch (fetchError: any) {
      console.error("Network Fetch Error to Groq:", fetchError.message);
      
      // FALLBACK: If the network call itself fails (DNS, timeout, etc.), 
      // providing a helpful simulated response so the user isn't stuck.
      const lastMsg = messages[messages?.length - 1]?.content?.toLowerCase() || '';
      let simulatedReply = "I'm having a bit of trouble connecting to my main brain right now. ";
      
      if (lastMsg.includes('hello') || lastMsg.includes('hi')) {
        simulatedReply += "But hello! Let's practice anyway. How was your day? (Note: This is a backup response)";
      } else if (lastMsg.includes('weather')) {
        simulatedReply += "I'm not sure about the local weather since I'm offline, but it's a great day to practice English! (Note: This is a backup response)";
      } else {
        simulatedReply += "Let's keep talking! I heard you say something about: \"" + lastMsg + "\". (Note: This is a backup response due to a network connection issue to the AI server)";
      }

      return NextResponse.json({ 
        content: simulatedReply,
        isFallback: true
      });
    }

  } catch (error: any) {
    console.error("Critical API Proxy Failure:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
