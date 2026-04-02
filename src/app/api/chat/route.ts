import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      // Fallback if no key is found
      return NextResponse.json({ 
        content: "I'm currently in simulation mode because no API key was found. How can I help you practice today?" 
      });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { 
            role: 'system', 
            content: "You are a professional, friendly English Grammar Tutor. Your goal is to help users improve their English through conversation. Keep replies concise, encouraging, and occasionally point out grammar improvements if you see mistakes. Use a sophisticated but accessible tone." 
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Groq API Error:", data);
      throw new Error(data.error?.message || "Failed to fetch from Groq");
    }

    return NextResponse.json({ 
      content: data.choices[0].message.content 
    });

  } catch (error: any) {
    console.error("Chat API Route Error:", error);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
