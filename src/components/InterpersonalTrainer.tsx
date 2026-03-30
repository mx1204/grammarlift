'use client';

import React, { useState } from 'react';
import GlassCard from './GlassCard';
import AppButton from './AppButton';
import { getInterpersonalFeedback, InterpersonalFeedback } from '@/lib/groq';
import { InterpersonalScenario } from '@/lib/interpersonal-data';

interface InterpersonalTrainerProps {
  scenario: InterpersonalScenario;
}

export default function InterpersonalTrainer({ scenario }: InterpersonalTrainerProps) {
  const [userInput, setUserInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<InterpersonalFeedback | null>(null);

  const handleAnalyze = async () => {
    if (!userInput.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const result = await getInterpersonalFeedback(
        userInput,
        scenario.prompt,
        scenario.context
      );
      setFeedback(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setUserInput('');
    setFeedback(null);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ marginBottom: '1rem' }}>Your Response</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Type how you would respond to {scenario.character.name} in this situation. 
          Focus on being professional, clear, and tactful.
        </p>
        
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your response here..."
          disabled={isAnalyzing || !!feedback}
          style={{
            width: '100%',
            minHeight: '150px',
            padding: '1.5rem',
            borderRadius: '16px',
            background: 'var(--card-bg)',
            border: '2px solid var(--card-border)',
            color: 'inherit',
            fontFamily: 'inherit',
            fontSize: '1.1rem',
            lineHeight: 1.6,
            resize: 'vertical',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
        />
        
        {!feedback && (
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <AppButton 
              size="lg" 
              onClick={handleAnalyze} 
              loading={isAnalyzing}
              disabled={!userInput.trim() || isAnalyzing}
            >
              {isAnalyzing ? 'Analyzing Tone...' : 'Analyze My Response'}
            </AppButton>
          </div>
        )}
      </div>

      {feedback && (
        <div className="animate-fade-in" style={{ marginTop: '3rem' }}>
          <GlassCard style={{ 
            borderLeft: `6px solid ${feedback.tactScore > 7 ? 'var(--success)' : feedback.tactScore > 5 ? 'var(--warning)' : 'var(--error)'}`,
            padding: '2rem' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ margin: 0 }}>Analysis Results</h3>
              <div style={{ 
                padding: '8px 16px', 
                borderRadius: '20px', 
                background: 'rgba(59, 130, 246, 0.1)',
                color: 'var(--primary)',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}>
                Tone: {feedback.tone}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <section>
                  <h5 style={{ marginBottom: '0.75rem', textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.7, letterSpacing: '0.05em' }}>
                    Interpersonal Tact ({feedback.tactScore}/10)
                  </h5>
                  <p style={{ lineHeight: 1.6 }}>{feedback.tactFeedback}</p>
                </section>

                <section>
                  <h5 style={{ marginBottom: '0.75rem', textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.7, letterSpacing: '0.05em' }}>
                    Grammar & Clarity
                  </h5>
                  <p style={{ lineHeight: 1.6 }}>{feedback.grammarFeedback}</p>
                </section>
              </div>

              <div style={{ paddingLeft: '2.5rem', borderLeft: '1px solid var(--card-border)' }}>
                <h5 style={{ marginBottom: '1rem', textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 800 }}>
                  A More Collaborative Version:
                </h5>
                <div style={{ 
                  background: 'rgba(59, 130, 246, 0.05)', 
                  padding: '1.5rem', 
                  borderRadius: '12px', 
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  border: '1px dashed var(--primary)'
                }}>
                  &quot;{feedback.refinedVersion}&quot;
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
              <AppButton variant="outline" onClick={reset}>Try Another Way</AppButton>
              <AppButton onClick={() => window.location.href = '/scenarios'}>Next Scenario</AppButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
