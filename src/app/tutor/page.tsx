'use client';

import React, { useState, useEffect, useRef } from 'react';
import GlassCard from '@/components/GlassCard';
import AppButton from '@/components/AppButton';
import { getTutorResponse } from '@/lib/groq';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! I'm your AI English Tutor. Let's practice your English! You can tell me about your day, or we can look at some grammar rules together. How are you feeling today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Text to Speech function
  const speak = (text: string) => {
    if (!isSoundEnabled || typeof window === 'undefined') return;
    
    // Stop any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Try to find a good English voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en-US')) || voices.find(v => v.lang.startsWith('en'));
    if (englishVoice) utterance.voice = englishVoice;
    
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getTutorResponse(
        [...messages, userMsg].map(m => ({ role: m.role, content: m.content }))
      );

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
      speak(response);
    } catch (error) {
      console.error("Tutor Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ marginTop: '2rem', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>AI Conversational Tutor</h1>
        <p style={{ color: 'var(--text-muted)' }}>Practicing through natural conversation is the fastest way to improve.</p>
      </header>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', overflow: 'hidden' }}>
        {/* Chat Main */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          <GlassCard style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem', marginBottom: '1rem', overflow: 'hidden' }}>
            <div 
              ref={scrollRef}
              style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingRight: '1rem', marginBottom: '1.5rem' }}
            >
              {messages.map(m => (
                <div 
                  key={m.id} 
                  style={{ 
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: m.role === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{ 
                    padding: '1rem 1.25rem',
                    borderRadius: m.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                    background: m.role === 'user' ? 'var(--primary)' : 'var(--card-bg)',
                    color: m.role === 'user' ? 'white' : 'inherit',
                    border: m.role === 'user' ? 'none' : '1px solid var(--card-border)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    lineHeight: 1.5
                  }}>
                    {m.content}
                  </div>
                  <span style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '0.4rem' }}>
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div style={{ alignSelf: 'flex-start', background: 'var(--card-bg)', padding: '1rem', borderRadius: '12px', opacity: 0.6 }}>
                  AI is thinking...
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button 
                onClick={() => {
                  const newState = !isSoundEnabled;
                  setIsSoundEnabled(newState);
                  if (newState) speak("Sound enabled.");
                  else window.speechSynthesis.cancel();
                }}
                style={{
                  background: isSoundEnabled ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--card-border)',
                  borderRadius: '12px',
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  color: isSoundEnabled ? 'white' : 'inherit',
                  transition: 'all 0.2s ease'
                }}
                title={isSoundEnabled ? "Disable Sound" : "Enable Sound"}
              >
                {isSoundEnabled ? '🔊' : '🔇'}
              </button>
              <input 
                type="text" 
                placeholder="Type your message..."
                value={input}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--card-border)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'inherit',
                  fontFamily: 'inherit',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              <AppButton onClick={handleSend} disabled={isLoading} style={{ height: '48px' }}>Send</AppButton>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <GlassCard>
            <h4 style={{ marginBottom: '1rem', fontWeight: 700 }}>Session Focus</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span className="glass" style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: '20px' }}>Verb Tenses</span>
              <span className="glass" style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: '20px' }}>Daily Routine</span>
              <span className="glass" style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: '20px' }}>Formal vs Informal</span>
            </div>
          </GlassCard>
          
          <GlassCard style={{ flex: 1 }}>
            <h4 style={{ marginBottom: '1rem', fontWeight: 700 }}>Quick Tips</h4>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              <li>Try to use full sentences.</li>
              <li>Ask me for explanations if you&apos;re confused.</li>
              <li>Practice using &quot;since&quot; and &quot;for&quot; for time.</li>
            </ul>
          </GlassCard>

          <AppButton variant="outline" onClick={() => setMessages([messages[0]])}>Reset Conversation</AppButton>
        </div>
      </div>
    </div>
  );
}
