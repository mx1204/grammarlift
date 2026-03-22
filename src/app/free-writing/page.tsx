'use client';

import React, { useState } from 'react';
import GlassCard from '@/components/GlassCard';
import AppButton from '@/components/AppButton';

interface Highlight {
  type: 'error' | 'suggestion';
  text: string;
  correction: string;
  explanation: string;
  start: number;
  end: number;
}

const FreeWritingPage = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [highlights, setHighlights] = useState<Highlight[] | null>(null);

  const handleAnalyze = () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    const inputText = text;
    
    // Simulate AI Latency
    setTimeout(() => {
      const foundHighlights: Highlight[] = [];
      
      // Define some common error patterns to "detect" for the mock
      const errorPatterns = [
        { 
          pattern: /([Ss]he|[Hh]e|[Ii]t)\s+don't/g, 
          correction: '$1 doesn\'t', 
          explanation: 'Third-person singular subjects (he/she/it) require "doesn\'t" in the negative present simple.',
          type: 'error' as const
        },
        { 
          pattern: /[Ii]\s+likes/g, 
          correction: 'I like', 
          explanation: 'First-person singular subjects do not take an "-s" suffix in the present simple.',
          type: 'error' as const
        },
        { 
          pattern: /([Gg]et)\s+it/g, 
          correction: 'obtain it', 
          explanation: 'Consider using more formal vocabulary like "obtain" or "acquire" in written English.',
          type: 'suggestion' as const
        }
      ];

      errorPatterns.forEach(({ pattern, correction, explanation, type }) => {
        let match;
        while ((match = pattern.exec(inputText)) !== null) {
          foundHighlights.push({
            type,
            text: match[0],
            correction: correction.replace('$1', match[1] || ''),
            explanation,
            start: match.index,
            end: match.index + match[0].length
          });
        }
      });

      // If no specific errors found, provide a generic "Good job" or single suggestion
      if (foundHighlights.length === 0 && inputText.length > 10) {
        const words = inputText.split(' ');
        const firstWord = words[0];
        foundHighlights.push({
          type: 'suggestion',
          text: firstWord,
          correction: firstWord,
          explanation: 'Your sentence structure looks solid! Great use of grammar at the Intermediate level.',
          start: 0,
          end: firstWord.length
        });
      }
      
      setHighlights(foundHighlights.sort((a, b) => a.start - b.start));
      setIsAnalyzing(false);
    }, 1500);
  };

  const renderAnnotatedText = () => {
    if (!highlights || highlights.length === 0) return text;

    let lastIndex = 0;
    const parts = [];

    // Ensure they are sorted
    const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start);

    sortedHighlights.forEach((h, i) => {
      // Add text before highlight
      parts.push(text.slice(lastIndex, h.start));
      
      // Add highlighted text
      parts.push(
        <span 
          key={i} 
          style={{ 
            background: h.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)',
            borderBottom: `2px solid ${h.type === 'error' ? 'var(--error)' : 'var(--primary)'}`,
            padding: '2px 0'
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
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Free Writing Mode</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Paste any text and receive level-aware AI feedback.</p>
      </header>

      <div className="responsive-grid" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
        {/* Input area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <GlassCard style={{ padding: '0' }}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your English text here to check for grammar and interpersonal tone..."
              style={{
                width: '100%',
                minHeight: '350px',
                padding: '1.5rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--foreground)',
                fontFamily: 'inherit',
                fontSize: '1.1rem',
                resize: 'vertical',
                outline: 'none',
                lineHeight: 1.6
              }}
            />
          </GlassCard>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
             <AppButton variant="outline" onClick={() => { setText(''); setHighlights(null); }}>Clear</AppButton>
             <AppButton 
               onClick={handleAnalyze} 
               disabled={isAnalyzing || !text.trim()}
             >
               {isAnalyzing ? 'Analyzing...' : 'Analyze Writing'}
             </AppButton>
          </div>
        </div>

        {/* Results area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {isAnalyzing ? (
            <GlassCard style={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '3rem 2rem'
            }}>
              <div className="pulse" style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                border: '4px solid var(--primary)',
                borderTopColor: 'transparent',
                animation: 'spin 1.5s linear infinite',
                marginBottom: '1.5rem'
              }} />
              <h4>AI is analyzing...</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Checking grammar and interpersonal nuances</p>
            </GlassCard>
          ) : highlights ? (
            <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <GlassCard style={{ lineHeight: 1.8 }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Annotated Results</h4>
                <div style={{ fontSize: '1.1rem' }}>{renderAnnotatedText()}</div>
              </GlassCard>

              {highlights.map((h, i) => (
                <GlassCard key={i} style={{ borderLeft: `4px solid ${h.type === 'error' ? 'var(--error)' : 'var(--primary)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                    <span style={{ 
                      fontWeight: 700, 
                      color: h.type === 'error' ? 'var(--error)' : 'var(--primary)',
                      textTransform: 'uppercase',
                      fontSize: '0.75rem'
                    }}>
                      {h.type}
                    </span>
                    <span style={{ opacity: 0.6, fontSize: '0.85rem', fontStyle: 'italic' }}>&quot;{h.text}&quot;</span>
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Correction: <span style={{ color: 'var(--success)' }}>{h.correction}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{h.explanation}</p>
                </GlassCard>
              ))}
            </div>
          ) : (
            <GlassCard style={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              textAlign: 'center',
              padding: '4rem 2rem',
              opacity: 0.7
            }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>📝</div>
              <h4>Ready for analysis</h4>
              <p style={{ fontSize: '0.95rem' }}>Type something on the left and click &quot;Analyze Writing&quot; to see detailed feedback.</p>
            </GlassCard>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FreeWritingPage;
