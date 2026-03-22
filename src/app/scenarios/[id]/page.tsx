'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { scenarios } from '@/lib/scenario-data';
import GlassCard from '@/components/GlassCard';
import AppButton from '@/components/AppButton';
import Link from 'next/link';

export default function ScenarioPlayerPage() {
  const { id } = useParams();
  const router = useRouter();
  const scenario = scenarios.find(s => s.id === id);
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!scenario) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h2>Scenario not found</h2>
        <Link href="/scenarios">Back to directory</Link>
      </div>
    );
  }

  // Handle empty options for placeholders
  if (scenario.options.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>
        <GlassCard>
          <h2>Coming Soon!</h2>
          <p style={{ margin: '1rem 0 2rem' }}>We are currently crafting this scenario to be perfect for your level.</p>
          <AppButton onClick={() => router.push('/scenarios')}>Back to directory</AppButton>
        </GlassCard>
      </div>
    );
  }

  const handleOptionSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const currentOption = selectedOption !== null ? scenario.options[selectedOption] : null;

  return (
    <div className="container animate-fade-in" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
      <Link href="/scenarios" style={{ textDecoration: 'none', color: 'var(--primary)', display: 'block', marginBottom: '2rem' }}>
        ← Back to Scenarios
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        {/* Main Section */}
        <div>
          <header style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="glass" style={{ fontSize: '0.75rem', padding: '4px 12px', borderRadius: '20px' }}>{scenario.category}</span>
              <span className="glass" style={{ fontSize: '0.75rem', padding: '4px 12px', borderRadius: '20px' }}>{scenario.level}</span>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{scenario.title}</h1>
          </header>

          <GlassCard style={{ padding: '2rem', marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>
            <h3 style={{ marginBottom: '1rem' }}>The Situation</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>{scenario.context}</p>
          </GlassCard>

          {/* Prompt */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                background: 'var(--primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                fontWeight: 800,
                fontSize: '1.2rem'
              }}>
                {scenario.character.name[0]}
              </div>
              <GlassCard style={{ flex: 1, padding: '1.5rem', position: 'relative' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                  {scenario.character.name} ({scenario.character.role})
                </span>
                <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>&quot;{scenario.prompt}&quot;</p>
              </GlassCard>
            </div>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ marginBottom: '0.5rem' }}>How do you respond?</h4>
            {scenario.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionSelect(i)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  background: selectedOption === i ? 'rgba(59, 130, 246, 0.1)' : 'var(--card-bg)',
                  border: `2px solid ${selectedOption === i ? 'var(--primary)' : 'var(--card-border)'}`,
                  color: 'inherit',
                  fontFamily: 'inherit',
                  fontSize: '1.05rem',
                  cursor: isSubmitted ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '50%', 
                  border: `2px solid ${selectedOption === i ? 'var(--primary)' : 'var(--text-muted)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  background: selectedOption === i ? 'var(--primary)' : 'transparent',
                  color: selectedOption === i ? 'white' : 'inherit'
                }}>
                  {String.fromCharCode(65 + i)}
                </div>
                {opt.text}
              </button>
            ))}
          </div>

          {!isSubmitted ? (
            <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <AppButton size="lg" disabled={selectedOption === null} onClick={() => setIsSubmitted(true)}>
                Confirm Selection
              </AppButton>
            </div>
          ) : (
            <div style={{ marginTop: '3rem' }}>
              <GlassCard style={{ 
                borderLeft: `6px solid ${currentOption?.isCorrect ? 'var(--success)' : 'var(--error)'}`,
                padding: '2rem' 
              }}>
                <h3 style={{ color: currentOption?.isCorrect ? 'var(--success)' : 'var(--error)', marginBottom: '1.5rem' }}>
                  {currentOption?.isCorrect ? '✓ Excellent Selection' : '✗ Needs Improvement'}
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <h5 style={{ marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.7 }}>Grammar Check</h5>
                    <p>{currentOption?.grammarFeedback}</p>
                  </div>
                  <div>
                    <h5 style={{ marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.7 }}>Interpersonal Skill</h5>
                    <p>{currentOption?.interpersonalFeedback}</p>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                  <AppButton onClick={() => router.push('/scenarios')}>Finish Session</AppButton>
                  {!currentOption?.isCorrect && (
                    <AppButton variant="outline" onClick={() => { setIsSubmitted(false); setSelectedOption(null); }}>
                      Try Again
                    </AppButton>
                  )}
                </div>
              </GlassCard>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <GlassCard>
            <h4 style={{ marginBottom: '1rem' }}>Interaction Partner</h4>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
               <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '20px', 
                background: 'var(--primary)', 
                margin: '0 auto 1rem',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'white',
                fontWeight: 800,
                fontSize: '2rem'
              }}>
                {scenario.character.name[0]}
              </div>
              <h5 style={{ fontSize: '1.2rem' }}>{scenario.character.name}</h5>
              <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>{scenario.character.role}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, textAlign: 'center' }}>
              {scenario.character.description}
            </p>
          </GlassCard>

          <GlassCard>
            <h4 style={{ marginBottom: '1rem' }}>Helpful Hints</h4>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              {scenario.level === 'Beginner' ? (
                <>
                  <li>Focus on using the correct 'is/am/are'.</li>
                  <li>Keep your sentences short and clear.</li>
                </>
              ) : (
                <>
                  <li>Consider the social hierarchy.</li>
                  <li>Use &quot;polite softening&quot; phrases like &quot;I was wondering&quot;.</li>
                </>
              )}
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
