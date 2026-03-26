'use client';

import React, { useState, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';
import AppButton from '@/components/AppButton';
import SpeechToText from '@/components/SpeechToText';
import { getSpeakingFeedback, GroqFeedback } from '@/lib/groq';

const SHADOWING_PROMPTS = [
  "He goes to the gym every morning to stay healthy.",
  "I have lived in this city for over ten years.",
  "She didn't know that the meeting was cancelled.",
  "If it rains tomorrow, we will have to stay indoors.",
  "They have been working on this project since last month."
];

const FREE_PROMPTS = [
  { question: "What did you do yesterday?", focus: "Past Simple" },
  { question: "What are your plans for the weekend?", focus: "Future Tenses" },
  { question: "What do you like to do in your free time?", focus: "Present Simple" },
  { question: "Have you ever traveled to another country? Where?", focus: "Present Perfect" },
  { question: "Describe your dream job.", focus: "Conditional/Future" }
];

export default function SpeakingPage() {
  const [mode, setMode] = useState<'shadowing' | 'free'>('shadowing');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [feedback, setFeedback] = useState<GroqFeedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentShadowingPrompt = SHADOWING_PROMPTS[currentPromptIndex];
  const currentFreePrompt = FREE_PROMPTS[currentPromptIndex];

  const handleTranscriptChange = (text: string) => {
    setTranscription(text);
    if (feedback) setFeedback(null); // Clear old feedback when user starts speaking again
  };

  const handleStop = async (finalText: string) => {
    if (!finalText.trim()) return;
    setTranscription(finalText);
    setIsAnalyzing(true);
    try {
      const prompt = mode === 'shadowing' ? currentShadowingPrompt : currentFreePrompt.question;
      const result = await getSpeakingFeedback(finalText, prompt, mode);
      setFeedback(result);
    } catch (error) {
      console.error("Feedback error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const nextPrompt = () => {
    const list = mode === 'shadowing' ? SHADOWING_PROMPTS : FREE_PROMPTS;
    setCurrentPromptIndex((prev) => (prev + 1) % list.length);
    setTranscription('');
    setFeedback(null);
  };

  const switchMode = (newMode: 'shadowing' | 'free') => {
    setMode(newMode);
    setCurrentPromptIndex(0);
    setTranscription('');
    setFeedback(null);
  };

  return (
    <div className="container animate-fade-in" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          <span className="text-grad">Speaking Mode</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Improve your fluency and oral grammar through real-time AI feedback.
        </p>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Mode Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <AppButton 
            variant={mode === 'shadowing' ? 'primary' : 'outline'} 
            onClick={() => switchMode('shadowing')}
            style={{ borderRadius: '30px' }}
          >
            Shadowing
          </AppButton>
          <AppButton 
            variant={mode === 'free' ? 'primary' : 'outline'} 
            onClick={() => switchMode('free')}
            style={{ borderRadius: '30px' }}
          >
            Free Response
          </AppButton>
        </div>

        <GlassCard style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            {mode === 'shadowing' ? (
              <>
                <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Repeat this sentence:</h4>
                <p style={{ fontSize: '1.8rem', fontWeight: 600, lineHeight: 1.4 }}>&quot;{currentShadowingPrompt}&quot;</p>
              </>
            ) : (
              <>
                <h4 style={{ color: 'var(--primary)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem' }}>Answer this question:</h4>
                <p style={{ fontSize: '1.8rem', fontWeight: 600, lineHeight: 1.4 }}>{currentFreePrompt.question}</p>
                <span className="glass" style={{ display: 'inline-block', marginTop: '1rem', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem' }}>
                  Focus: {currentFreePrompt.focus}
                </span>
              </>
            )}
          </div>

          <div style={{ margin: '3rem 0' }}>
            <SpeechToText 
              onTranscriptChange={handleTranscriptChange}
              onStop={handleStop}
              isProcessing={isAnalyzing} 
            />
          </div>

          {transcription && (
            <div style={{ marginTop: '2rem', textAlign: 'left' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '15px', border: '1px solid var(--card-border)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Your Speech:</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{transcription}</p>
              </div>
            </div>
          )}
        </GlassCard>

        {isAnalyzing && (
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <div className="pulse" style={{ display: 'inline-block', color: 'var(--primary)', fontWeight: 600 }}>
              AI is analyzing your grammar...
            </div>
          </div>
        )}

        {feedback && !isAnalyzing && (
          <GlassCard style={{ 
            padding: '2rem', 
            borderLeft: `5px solid ${feedback.errorFound ? '#ff4d4d' : '#4ade80'}`,
            animation: 'slide-up 0.4s ease-out'
          }}>
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {feedback.errorFound ? '🎯 Focus Point' : '✨ Well Spoken!'}
            </h3>
            
            <p style={{ marginBottom: '1rem', fontSize: '1.1rem', lineHeight: 1.6 }}>{feedback.explanation}</p>
            
            {feedback.errorFound && (
              <div style={{ background: 'rgba(74, 222, 128, 0.1)', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
                <p style={{ fontWeight: 600, color: '#4ade80', marginBottom: '0.3rem' }}>Correction:</p>
                <p>{feedback.correction}</p>
              </div>
            )}
            
            {feedback.example && (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                Example: {feedback.example}
              </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <AppButton onClick={nextPrompt}>Next Practice →</AppButton>
            </div>
          </GlassCard>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
