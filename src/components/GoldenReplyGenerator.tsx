'use client';

import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import AppButton from './AppButton';
import { getGoldenReply, GoldenReplyFeedback } from '@/lib/groq';

export default function GoldenReplyGenerator() {
  const [input, setInput] = useState('');
  const [context, setContext] = useState('General Professional');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GoldenReplyFeedback | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState('');

  useEffect(() => {
    if (copyStatus) {
      const timer = setTimeout(() => setCopyStatus(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [copyStatus]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setLastInput(input);
    try {
      const feedback = await getGoldenReply(input, context, imagePreview || undefined);
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
      setCopyStatus('✓ Copied to clipboard!');
    }
  };

  const getToneColor = (tone: string) => {
    const lower = tone.toLowerCase();
    if (lower.includes('blunt') || lower.includes('frustrated') || lower.includes('defensive')) return 'var(--error)';
    if (lower.includes('apologetic') || lower.includes('casual') || lower.includes('vague')) return 'var(--secondary)';
    return 'var(--success)';
  };

  const MAX_CHARS = 500;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <GlassCard style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Draft Your Message</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Type your raw thoughts or a blunt draft. Select a context, and our AI will craft a "Golden Version" that is tactful, professional, and impactful.
        </p>

        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
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

          <div>
            <input
              type="file"
              accept="image/*"
              id="screenshot-upload"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label 
              htmlFor="screenshot-upload"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px dashed var(--card-border)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'all 0.2s'
              }}
            >
              📸 {image ? 'Change Screenshot' : 'Add Context Screenshot'}
            </label>
          </div>
        </div>

        {imagePreview && (
          <div style={{ 
            marginBottom: '1.5rem', 
            position: 'relative', 
            display: 'inline-block',
            padding: '4px',
            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
            borderRadius: '12px'
          }}>
            <img 
              src={imagePreview} 
              alt="Context Preview" 
              style={{ 
                maxWidth: '200px', 
                maxHeight: '150px', 
                borderRadius: '8px', 
                display: 'block' 
              }} 
            />
            <button
              onClick={clearImage}
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'var(--error)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              ✕
            </button>
          </div>
        )}

        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
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
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
          <div style={{ 
            position: 'absolute', 
            bottom: '10px', 
            right: '10px', 
            fontSize: '0.75rem', 
            color: input.length >= MAX_CHARS ? 'var(--error)' : 'var(--text-muted)' 
          }}>
            {input.length} / {MAX_CHARS}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
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
            background: 'linear-gradient(135deg, rgba(var(--primary-h), var(--primary-s), var(--primary-l), 0.05) 0%, rgba(255, 255, 255, 0) 100%)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div>
                  <h5 style={{ textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.7, marginBottom: '0.5rem' }}>Detected Tone</h5>
                  <span style={{ 
                    background: `${getToneColor(result.originalTone)}20`, 
                    color: getToneColor(result.originalTone), 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem', 
                    fontWeight: 700 
                  }}>
                    {result.originalTone}
                  </span>
                </div>
                <div>
                  <h5 style={{ textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.7, marginBottom: '0.5rem' }}>Tactical Score</h5>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      border: `3px solid ${result.tactScore > 7 ? 'var(--success)' : result.tactScore > 4 ? 'var(--secondary)' : 'var(--error)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '1rem'
                    }}>
                      {result.tactScore}
                    </div>
                    <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>/ 10</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {copyStatus && <span style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>{copyStatus}</span>}
                <AppButton variant="outline" size="sm" onClick={copyToClipboard}>
                  Copy Result
                </AppButton>
                <AppButton variant="outline" size="sm" onClick={handleGenerate} disabled={loading}>
                  Regenerate
                </AppButton>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <h5 style={{ textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.7, marginBottom: '1rem' }}>Original Message</h5>
                <div style={{ 
                  fontSize: '1rem', 
                  color: 'var(--text-muted)',
                  padding: '1.5rem', 
                  background: 'rgba(255, 255, 255, 0.02)', 
                  borderRadius: '12px',
                  border: '1px solid var(--card-border)',
                  fontStyle: 'italic'
                }}>
                  &quot;{lastInput}&quot;
                </div>
              </div>
              <div>
                <h5 style={{ textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.7, marginBottom: '1rem' }}>✨ The Golden Version</h5>
                <div style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 600, 
                  lineHeight: 1.6, 
                  padding: '1.5rem', 
                  background: 'rgba(var(--primary-h), var(--primary-s), var(--primary-l), 0.05)', 
                  borderRadius: '12px',
                  border: '1px dashed var(--primary)',
                  whiteSpace: 'pre-wrap'
                }}>
                  &quot;{result.goldenReply}&quot;
                </div>
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

