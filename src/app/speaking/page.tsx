'use client';

import React, { useState, useCallback } from 'react';
import GlassCard from '@/components/GlassCard';
import AppButton from '@/components/AppButton';
import SpeechToText from '@/components/SpeechToText';
import { getSpeakingFeedback, GroqFeedback } from '@/lib/groq';

const SHADOWING_PROMPTS = [
  "He goes to the gym every morning to stay healthy.",
  "I have lived in this city for over ten years.",
  "She didn't know that the meeting was cancelled.",
  "If it rains tomorrow, we will have to stay indoors.",
  "They have been working on this project since last month.",
  "The children were playing in the park when it started to rain.",
  "Could you please send me the report by Friday?",
  "I would have called you if I had known you were coming.",
  "She asked me whether I had finished the assignment.",
  "By the time we arrived, the show had already started."
];

const FREE_PROMPTS = [
  { question: "What did you do yesterday?", focus: "Past Simple" },
  { question: "What are your plans for the weekend?", focus: "Future Tenses" },
  { question: "What do you like to do in your free time?", focus: "Present Simple" },
  { question: "Have you ever traveled to another country? Where?", focus: "Present Perfect" },
  { question: "Describe your dream job.", focus: "Conditional/Future" },
  { question: "What were you doing this time last week?", focus: "Past Continuous" },
  { question: "If you could live anywhere, where would you choose?", focus: "Second Conditional" },
  { question: "Tell me about a skill you have been learning recently.", focus: "Present Perfect Continuous" },
  { question: "What advice would you give to someone learning English?", focus: "Modal Verbs" },
  { question: "Describe a memorable meal you have had.", focus: "Past Simple & Adjectives" }
];

interface SessionScore {
  promptIndex: number;
  fluencyScore: number;
  hadError: boolean;
}

export default function SpeakingPage() {
  const [mode, setMode] = useState<'shadowing' | 'free'>('shadowing');
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [feedback, setFeedback] = useState<GroqFeedback | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sessionScores, setSessionScores] = useState<SessionScore[]>([]);
  const [isSessionComplete, setIsSessionComplete] = useState(false);

  const currentShadowingPrompt = SHADOWING_PROMPTS[currentPromptIndex];
  const currentFreePrompt = FREE_PROMPTS[currentPromptIndex];
  const totalPrompts = mode === 'shadowing' ? SHADOWING_PROMPTS.length : FREE_PROMPTS.length;
  const progress = ((currentPromptIndex + 1) / totalPrompts) * 100;

  const handleTranscriptChange = useCallback((text: string) => {
    setTranscription(text);
    setFeedback(prev => prev ? null : prev);
  }, []);

  const handleStop = useCallback(async (finalText: string) => {
    if (!finalText.trim()) return;
    setTranscription(finalText);
    setIsAnalyzing(true);
    try {
      const prompt = mode === 'shadowing' ? currentShadowingPrompt : currentFreePrompt.question;
      const result = await getSpeakingFeedback(finalText, prompt, mode);
      setFeedback(result);
      // Record score for session summary
      setSessionScores(prev => [
        ...prev.filter(s => s.promptIndex !== currentPromptIndex),
        { promptIndex: currentPromptIndex, fluencyScore: result.fluencyScore, hadError: result.errorFound }
      ]);
    } catch (error) {
      console.error("Feedback error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [mode, currentShadowingPrompt, currentFreePrompt, currentPromptIndex]);

  const nextPrompt = () => {
    const nextIndex = currentPromptIndex + 1;
    if (nextIndex >= totalPrompts) {
      setIsSessionComplete(true);
    } else {
      setCurrentPromptIndex(nextIndex);
      setTranscription('');
      setFeedback(null);
    }
  };

  const retryPrompt = () => {
    setTranscription('');
    setFeedback(null);
  };

  const switchMode = (newMode: 'shadowing' | 'free') => {
    setMode(newMode);
    setCurrentPromptIndex(0);
    setTranscription('');
    setFeedback(null);
    setSessionScores([]);
    setIsSessionComplete(false);
  };

  const restartSession = () => {
    setCurrentPromptIndex(0);
    setTranscription('');
    setFeedback(null);
    setSessionScores([]);
    setIsSessionComplete(false);
  };

  // Session summary calculations
  const avgScore = sessionScores.length > 0
    ? Math.round(sessionScores.reduce((sum, s) => sum + s.fluencyScore, 0) / sessionScores.length)
    : 0;
  const errorCount = sessionScores.filter(s => s.hadError).length;
  const perfectCount = sessionScores.filter(s => !s.hadError).length;

  const getGrade = (score: number) => {
    if (score >= 90) return { label: 'Outstanding', emoji: '🏆', color: 'var(--success)' };
    if (score >= 75) return { label: 'Great Job', emoji: '🌟', color: 'var(--primary)' };
    if (score >= 60) return { label: 'Good Effort', emoji: '💪', color: 'var(--secondary)' };
    return { label: 'Keep Practicing', emoji: '📚', color: 'var(--error)' };
  };

  const grade = getGrade(avgScore);

  return (
    <div className="container animate-fade-in" style={{ marginTop: '3rem', paddingBottom: '6rem' }}>
      <header style={{ marginBottom: 'var(--section-py)', textAlign: 'center' }}>
        <div className="badge-premium">AI Powered</div>
        <h1 style={{ fontSize: 'var(--fs-h1)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-1px' }}>
          <span className="text-grad">Speaking Mode</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body)', maxWidth: '600px', margin: '0 auto' }}>
          Refine your English accent and grammar with real-time AI analysis.
        </p>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Mode Selector & Progress */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div className="segmented-control">
            <button 
              className={mode === 'shadowing' ? 'active' : ''} 
              onClick={() => switchMode('shadowing')}
            >
              Shadowing
            </button>
            <button 
              className={mode === 'free' ? 'active' : ''} 
              onClick={() => switchMode('free')}
            >
              Free Response
            </button>
          </div>

          <div style={{ flex: 1, maxWidth: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              <span>PROMPT {Math.min(currentPromptIndex + 1, totalPrompts)} OF {totalPrompts}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Session Complete Screen */}
        {isSessionComplete ? (
          <div className="animate-slide-up">
            <GlassCard style={{ padding: 'var(--card-p)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div className="decorative-glow" />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{grade.emoji}</div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                  <span className="text-grad">Session Complete!</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>
                  Here&apos;s how you performed across {sessionScores.length} prompt{sessionScores.length !== 1 ? 's' : ''}.
                </p>

                {/* Score Ring */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1rem, 5vw, 3rem)', flexWrap: 'wrap', marginBottom: '3rem' }}>
                  <div className="summary-stat">
                    <div className="stat-ring" style={{ borderColor: grade.color }}>
                      <span className="stat-ring-val">{avgScore}</span>
                    </div>
                    <span className="stat-label">Avg Fluency</span>
                    <span className="stat-grade" style={{ color: grade.color }}>{grade.label}</span>
                  </div>
                  <div className="summary-stat">
                    <div className="stat-ring" style={{ borderColor: 'var(--success)' }}>
                      <span className="stat-ring-val">{perfectCount}</span>
                    </div>
                    <span className="stat-label">Perfect</span>
                  </div>
                  <div className="summary-stat">
                    <div className="stat-ring" style={{ borderColor: 'var(--error)' }}>
                      <span className="stat-ring-val">{errorCount}</span>
                    </div>
                    <span className="stat-label">With Errors</span>
                  </div>
                </div>

                {/* Individual scores */}
                <div className="scores-list">
                  {sessionScores.map((s, i) => (
                    <div key={i} className="score-row">
                      <span className="score-row-label">Prompt {s.promptIndex + 1}</span>
                      <div className="score-row-bar">
                        <div className="score-row-fill" style={{ width: `${s.fluencyScore}%`, background: s.hadError ? 'var(--error)' : 'var(--success)' }} />
                      </div>
                      <span className="score-row-val">{s.fluencyScore}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
                  <AppButton onClick={restartSession} variant="primary" style={{ padding: '1rem 2rem' }}>
                    🔄 Start Over
                  </AppButton>
                  <AppButton onClick={() => switchMode(mode === 'shadowing' ? 'free' : 'shadowing')} variant="outline" style={{ padding: '1rem 2rem' }}>
                    Switch to {mode === 'shadowing' ? 'Free Response' : 'Shadowing'}
                  </AppButton>
                </div>
              </div>
            </GlassCard>
          </div>
        ) : (
          <>
            <GlassCard style={{ padding: 'var(--card-p)', textAlign: 'center', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden' }}>
              <div className="decorative-glow" />
              
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ marginBottom: '3rem' }}>
                  {mode === 'shadowing' ? (
                    <>
                      <span className="type-label">Repeat after me</span>
                      <p className="prompt-text">&quot;{currentShadowingPrompt}&quot;</p>
                    </>
                  ) : (
                    <>
                      <span className="type-label">Answer the question</span>
                      <p className="prompt-text">{currentFreePrompt.question}</p>
                      <div style={{ marginTop: '1.5rem' }}>
                        <span className="focus-tag">
                          🎯 Focus: {currentFreePrompt.focus}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                <SpeechToText 
                  onTranscriptChange={handleTranscriptChange}
                  onStop={handleStop}
                  isProcessing={isAnalyzing} 
                />

                {transcription && (
                  <div className="transcript-box animate-slide-up">
                    <span className="transcript-label">Transcribed Speech</span>
                    <p>{transcription}</p>
                  </div>
                )}
              </div>
            </GlassCard>

            {isAnalyzing && (
              <div className="analyzing-state">
                <div className="pulse-dot" />
                <span>AI is reviewing your performance...</span>
              </div>
            )}

            {feedback && !isAnalyzing && (
              <div className="feedback-grid animate-slide-up">
                <GlassCard className="feedback-main" style={{ padding: '2.5rem', borderLeft: `6px solid ${feedback.errorFound ? 'var(--error)' : 'var(--success)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {feedback.errorFound ? '🎯 Improvement Point' : '✨ Excellent Work!'}
                    </h3>
                    <div className="score-badge">
                      <span className="score-val">{feedback.fluencyScore}</span>
                      <span className="score-label">Fluency</span>
                    </div>
                  </div>
                  
                  <p style={{ fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '2rem', color: 'var(--foreground)' }}>
                    {feedback.explanation}
                  </p>
                  
                  {feedback.errorFound && (
                    <div className="correction-box">
                      <div className="correction-item">
                        <span className="label">Original</span>
                        <p className="val strike">{transcription}</p>
                      </div>
                      <div className="correction-item">
                        <span className="label">Better</span>
                        <p className="val success">{feedback.correction}</p>
                      </div>
                    </div>
                  )}
                  
                  {feedback.example && (
                    <div className="example-box">
                      <strong>Example:</strong> {feedback.example}
                    </div>
                  )}

                  <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
                    <AppButton onClick={retryPrompt} variant="outline" style={{ padding: '1rem 2rem' }}>
                      🔁 Try Again
                    </AppButton>
                    <AppButton onClick={nextPrompt} variant="primary" style={{ padding: '1rem 2rem' }}>
                      {currentPromptIndex + 1 >= totalPrompts ? '🏁 Finish Session' : 'Next Practice →'}
                    </AppButton>
                  </div>
                </GlassCard>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        .badge-premium {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(var(--primary-h), var(--primary-s), var(--primary-l), 0.1);
          color: var(--primary);
          border-radius: 30px;
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
        }

        .segmented-control {
          background: var(--card-bg);
          padding: 6px;
          border-radius: 30px;
          display: flex;
          border: 1px solid var(--card-border);
          box-shadow: var(--shadow);
        }

        .segmented-control button {
          padding: 10px 24px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font-weight: 600;
          cursor: pointer;
          border-radius: 24px;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .segmented-control button.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 12px rgba(var(--primary-h), var(--primary-s), var(--primary-l), 0.3);
        }

        .progress-track {
          height: 8px;
          background: var(--card-border);
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          border-radius: 10px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .type-label {
          display: block;
          color: var(--primary);
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 1.5rem;
        }

        .prompt-text {
          font-size: clamp(1.4rem, 6vw, 2.2rem);
          font-weight: 700;
          line-height: 1.3;
          letter-spacing: -0.5px;
        }

        .focus-tag {
          background: rgba(var(--primary-h), var(--primary-s), var(--primary-l), 0.1);
          color: var(--primary);
          padding: 8px 20px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .transcript-box {
          margin-top: 4rem;
          text-align: left;
          background: rgba(255,255,255,0.03);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid var(--card-border);
        }

        .transcript-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.75rem;
        }

        .transcript-box p {
          font-size: 1.25rem;
          font-weight: 500;
          margin: 0;
          color: var(--foreground);
        }

        .decorative-glow {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(var(--primary-h), var(--primary-s), var(--primary-l), 0.15) 0%, transparent 70%);
          z-index: 1;
        }

        .analyzing-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
          color: var(--primary);
          font-weight: 600;
        }

        .pulse-dot {
          width: 12px;
          height: 12px;
          background: var(--primary);
          border-radius: 50%;
          animation: dot-pulse 1.5s infinite;
        }

        @keyframes dot-pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        .score-badge {
          text-align: center;
          background: var(--card-bg);
          padding: 10px 15px;
          border-radius: 15px;
          border: 1px solid var(--card-border);
          min-width: 80px;
        }

        .score-val {
          display: block;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
          line-height: 1;
        }

        .score-label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .correction-box {
          background: rgba(255,255,255,0.03);
          border-radius: 15px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .correction-item .label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
          display: block;
        }

        .correction-item .val {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .correction-item .strike {
          text-decoration: line-through;
          opacity: 0.6;
        }

        .correction-item .success {
          color: var(--success);
        }

        .example-box {
          font-style: italic;
          color: var(--text-muted);
          font-size: 0.95rem;
          padding-left: 1rem;
          border-left: 2px solid var(--card-border);
        }

        .animate-slide-up {
          animation: slideUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Session Summary Styles */
        .summary-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .stat-ring {
          width: clamp(80px, 20vw, 100px);
          height: clamp(80px, 20vw, 100px);
          border-radius: 50%;
          border: 5px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.03);
        }

        .stat-ring-val {
          font-size: 2rem;
          font-weight: 800;
          color: var(--foreground);
        }

        .stat-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-grade {
          font-size: 0.9rem;
          font-weight: 700;
        }

        .scores-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: left;
          max-width: 500px;
          margin: 0 auto;
        }

        .score-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .score-row-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          min-width: 80px;
        }

        .score-row-bar {
          flex: 1;
          height: 8px;
          background: var(--card-border);
          border-radius: 10px;
          overflow: hidden;
        }

        .score-row-fill {
          height: 100%;
          border-radius: 10px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .score-row-val {
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--foreground);
          min-width: 30px;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
