'use client';

import React, { useState } from 'react';
import GlassCard from './GlassCard';
import AppButton from './AppButton';
import { getGoldenReply, GoldenReplyFeedback } from '@/lib/groq';

export default function GoldenReplyGenerator() {
  const [input, setInput] = useState('');
  const [context, setContext] = useState('General Professional');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GoldenReplyFeedback | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const feedback = await getGoldenReply(input, context);
      setResult(feedback);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result.goldenReply);
      alert('Golden Reply copied to clipboard!');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <GlassCard style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Draft Your Message</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Type your raw thoughts or a blunt draft. Select a context, and our AI will craft a "Golden Version" that is tactful, professional, and impactful.
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase', opacity: 0.7 }}>
            Professional Context
          </label>
          <select 
            value={context}
            onChange={(e) => setContext(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              borderRadius: '8px', 
              background: 'var(--card-bg)', 
              border: '1px solid var(--card-border)',
              color: 'inherit',
              cursor: 'pointer'
            }}
          >
            <option>General Professional</option>
            <option>Email to Manager</option>
            <option>Client Communication</option>
            <option>Team Chat (Slack/Teams)</option>
            <option>Conflict Resolution</option>
            <option>Networking Request</option>
          </select>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., 'i'm late because traffic' or 'i won't do this task because i'm busy'"
          style={{
            width: '100%',
            height: '150px',
            padding: '1rem',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid var(--card-border)',
            color: 'inherit',
            fontFamily: 'inherit',
            fontSize: '1.1rem',
            resize: 'none',
            marginBottom: '1.5rem',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <AppButton 
            size="lg" 
            onClick={handleGenerate} 
            loading={loading}
            disabled={!input.trim()}
          >
            Generate Golden Version
          </AppButton>
        </div>
      </GlassCard>

      {result && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <GlassCard style={{ 
            borderLeft: '6px solid var(--primary)', 
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(255, 255, 255, 0) 100%)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h5 style={{ textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.7, marginBottom: '0.5rem' }}>Your Original Tone</h5>
                <span style={{ 
                  background: 'rgba(168, 85, 247, 0.1)', 
                  color: '#a855f7', 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  fontWeight: 700 
                }}>
                  {result.originalTone}
                </span>
              </div>
              <AppButton variant="outline" size="sm" onClick={copyToClipboard}>
                Copy Golden Copy
              </AppButton>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h5 style={{ textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.7, marginBottom: '1rem' }}>✨ The Golden Version</h5>
              <div style={{ 
                fontSize: '1.25rem', 
                fontWeight: 500, 
                lineHeight: 1.6, 
                padding: '1.5rem', 
                background: 'rgba(255, 255, 255, 0.03)', 
                borderRadius: '12px',
                border: '1px dashed var(--primary)'
              }}>
                &quot;{result.goldenReply}&quot;
              </div>
            </div>

            <section>
              <h5 style={{ textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.7, marginBottom: '0.5rem' }}>Professional Logic</h5>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{result.explanation}</p>
            </section>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
