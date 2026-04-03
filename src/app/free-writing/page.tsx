'use client';

import React, { useState, useMemo } from 'react';
import GlassCard from '@/components/GlassCard';
import AppButton from '@/components/AppButton';
import { getFreeWritingFeedback, FreeWritingFeedback, FreeWritingHighlight } from '@/lib/groq';

const FreeWritingPage = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<FreeWritingFeedback | null>(null);

  const wordCount = useMemo(() => text.trim() ? text.trim().split(/\s+/).length : 0, [text]);
  const charCount = text.length;

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    try {
      const feedback = await getFreeWritingFeedback(text);
      setResult(feedback);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const applyCorrection = (h: FreeWritingHighlight) => {
    const newText = text.slice(0, h.start) + h.correction + text.slice(h.end);
    setText(newText);
    
    // Clear results or re-calculate offsets (simpler to clear and let user re-analyze or just remove the highlight)
    if (result) {
      const newHighlights = result.highlights.filter(item => item !== h).map(item => {
        if (item.start > h.start) {
          const diff = h.correction.length - h.text.length;
          return { ...item, start: item.start + diff, end: item.end + diff };
        }
        return item;
      });
      setResult({ ...result, highlights: newHighlights });
    }
  };

  const applyAllChanges = () => {
    if (!result || result.highlights.length === 0) return;
    
    let refined = text;
    // Apply from back to front to preserve offsets
    const sorted = [...result.highlights].sort((a, b) => b.start - a.start);
    sorted.forEach(h => {
      refined = refined.slice(0, h.start) + h.correction + refined.slice(h.end);
    });
    
    setText(refined);
    setResult(null);
  };

  const renderAnnotatedText = () => {
    if (!result || result.highlights.length === 0) return text;

    let lastIndex = 0;
    const parts = [];

    result.highlights.forEach((h, i) => {
      parts.push(text.slice(lastIndex, h.start));
      parts.push(
        <span 
          key={i} 
          title={h.explanation}
          style={{ 
            background: h.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)',
            borderBottom: `2px solid ${h.type === 'error' ? 'var(--error)' : 'var(--primary)'}`,
            padding: '2px 0',
            cursor: 'help'
          }}
        >
          {h.text}
        </span>
      );
      lastIndex = h.end;
    });

    parts.push(text.slice(lastIndex));
    return parts;
  };

  return (
    <div className="container animate-fade-in" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: 'var(--section-py)' }}>
        <h1 style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: 'var(--fs-h1)' }}>Free Writing Mode</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body)' }}>Paste any text and receive level-aware AI feedback on grammar and tone.</p>
      </header>

      <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '2rem' }}>
        {/* Input area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
          <GlassCard style={{ padding: '0', position: 'relative', overflow: 'hidden' }}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your English text here..."
              style={{
                width: '100%',
                minHeight: 'clamp(300px, 50vh, 450px)',
                padding: 'var(--container-px)',
                background: 'transparent',
                border: 'none',
                color: 'var(--foreground)',
                fontFamily: 'inherit',
                fontSize: 'var(--fs-body)',
                resize: 'vertical',
                outline: 'none',
                lineHeight: 1.7
              }}
            />
            <div style={{ 
              position: 'absolute', 
              bottom: '1rem', 
              right: '2rem', 
              display: 'flex', 
              gap: '1.5rem', 
              fontSize: '0.85rem', 
              color: 'var(--text-muted)',
              background: 'rgba(0,0,0,0.2)',
              padding: '4px 12px',
              borderRadius: '20px',
              backdropFilter: 'blur(4px)'
            }}>
              <span>{wordCount} words</span>
              <span>{charCount} characters</span>
            </div>
          </GlassCard>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
             <AppButton variant="outline" onClick={() => { setText(''); setResult(null); }}>Clear</AppButton>
             <AppButton 
               size="lg"
               onClick={handleAnalyze} 
               disabled={isAnalyzing || !text.trim()}
               style={{ width: 'clamp(150px, 100%, 250px)' }}
             >
               {isAnalyzing ? 'Analyzing...' : 'Analyze Writing'}
             </AppButton>
          </div>

          {result && (
             <div className="animate-fade-in" style={{ marginTop: '1rem' }}>
                <GlassCard style={{ borderLeft: '6px solid var(--primary)' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <h4 style={{ color: 'var(--primary)' }}>Annotated Results</h4>
                      {result.highlights.length > 0 && (
                        <AppButton size="sm" variant="outline" onClick={applyAllChanges}>Apply All Fixes</AppButton>
                      )}
                   </div>
                   <div style={{ fontSize: 'var(--fs-body)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                      {renderAnnotatedText()}
                   </div>
                </GlassCard>
             </div>
          )}
        </div>

        {/* Results area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {isAnalyzing ? (
            <GlassCard style={{ 
              height: '400px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '3rem 2rem'
            }}>
              <div className="spinner" style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                border: '4px solid var(--primary)',
                borderTopColor: 'transparent',
                animation: 'spin 1.5s linear infinite',
                marginBottom: '1.5rem'
              }} />
              <h4>AI is analyzing...</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                Checking grammar patterns and interpersonal nuances
              </p>
            </GlassCard>
          ) : result ? (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Score Card */}
              <GlassCard style={{ textAlign: 'center', padding: 'var(--card-p)' }}>
                <h5 style={{ textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.7, marginBottom: '1rem' }}>Quality Score</h5>
                <div style={{ fontSize: 'var(--fs-h1)', fontWeight: 800, color: result.score > 80 ? 'var(--success)' : result.score > 60 ? 'var(--secondary)' : 'var(--error)' }}>
                  {result.score}
                </div>
                <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>Based on grammar & professional clarity</p>
              </GlassCard>

              {/* Tone Card */}
              <GlassCard style={{ borderTop: '4px solid var(--secondary)' }}>
                <h5 style={{ textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.7, marginBottom: '0.5rem' }}>Interpersonal Tone</h5>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                  {result.tone}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {result.toneExplanation}
                </p>
              </GlassCard>

              {/* Individual Highlights */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h5 style={{ textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.7, paddingLeft: '0.5rem' }}>
                  Detailed Feedback ({result.highlights.length})
                </h5>
                {result.highlights.length === 0 ? (
                  <GlassCard>
                    <p style={{ textAlign: 'center', color: 'var(--success)', fontWeight: 600 }}>No issues found! Your writing looks great.</p>
                  </GlassCard>
                ) : (
                  result.highlights.map((h, i) => (
                    <GlassCard key={i} style={{ borderLeft: `4px solid ${h.type === 'error' ? 'var(--error)' : 'var(--primary)'}`, padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                        <span style={{ 
                          fontWeight: 700, 
                          color: h.type === 'error' ? 'var(--error)' : 'var(--primary)',
                          textTransform: 'uppercase',
                          fontSize: '0.7rem'
                        }}>
                          {h.type}
                        </span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                           <AppButton size="sm" variant="outline" onClick={() => applyCorrection(h)}>Apply</AppButton>
                        </div>
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                         Change <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>&quot;{h.text}&quot;</span> to <span style={{ color: 'var(--success)' }}>&quot;{h.correction}&quot;</span>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{h.explanation}</p>
                    </GlassCard>
                  ))
                )}
              </div>
            </div>
          ) : (
            <GlassCard style={{ 
              height: '400px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              textAlign: 'center',
              padding: '4rem 2rem',
              opacity: 0.7
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✍️</div>
              <h4>Waiting for Text</h4>
              <p style={{ fontSize: '0.95rem' }}>Once you provide text, we&apos;ll analyze its impact and correctness.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <style jsx>{`
        .spinner {
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FreeWritingPage;

