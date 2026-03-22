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
          replacement: 'obtain it', 
          explanation: 'Consider using more formal vocabulary like "obtain" or "acquire" in written English.',
          type: 'suggestion' as const
        }
      ];

      errorPatterns.forEach(({ pattern, correction, replacement, explanation, type }) => {
        let match;
        while ((match = pattern.exec(inputText)) !== null) {
          foundHighlights.push({
            type,
            text: match[0],
            correction: (correction || replacement || '').replace('$1', match[1] || ''),
            explanation,
            start: match.index,
            end: match.index + match[0].length
          });
        }
      });

      // If no specific errors found, provide a generic "Good job" or single suggestion
      if (foundHighlights.length === 0) {
        // Just mock a generic suggestion if the text is long enough
        if (inputText.length > 10) {
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
      }
      
      setHighlights(foundHighlights.sort((a, b) => a.start - b.start));
      setIsAnalyzing(false);
    }, 1500);
  };

  const renderAnnotatedText = () => {
    if (!highlights) return text;

    let lastIndex = 0;
    const parts = [];

    highlights.sort((a, b) => a.start - b.start).forEach((h, i) => {
      // Add text before highlight
      parts.push(text.slice(lastIndex, h.start));
      
      // Add highlighted text
      parts.push(
        <span 
          key={i} 
          style={{ 
            background: h.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)',
            borderBottom: `2px solid ${h.type === 'error' ? 'var(--error)' : 'var(--primary)'}`,
            cursor: 'help',
            padding: '2px 0',
            position: 'relative'
          }}
          title={h.explanation}
        >
          {h.text}
          <span style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            background: 'var(--foreground)',
            color: 'var(--background)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
            zIndex: 10,
            display: 'none', // Simple implementation, can use tooltips
          }}>
            {h.correction}
          </span>
        </span>
      );
      
      lastIndex = h.end;
    });

    parts.push(text.slice(lastIndex));
    return parts;
  };

  return (
    <div className="container animate-fade-in" style={{ marginTop: '2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Free Writing Mode</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Paste any text and receive level-aware AI feedback.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <GlassCard style={{ padding: '0' }}>
            <textarea
              placeholder="Start typing or paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: '100%',
                minHeight: '400px',
                padding: '2rem',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '1.1rem',
                resize: 'none',
                color: 'inherit',
                lineHeight: 1.6
              }}
            />
          </GlassCard>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <AppButton 
              size="lg" 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !text.trim()}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
            </AppButton>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Analysis Results</h3>
          {highlights ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <GlassCard style={{ lineHeight: 1.8 }}>
                {renderAnnotatedText()}
              </GlassCard>
              
              {highlights.map((h, i) => (
                <GlassCard key={i} style={{ borderLeft: `4px solid ${h.type === 'error' ? 'var(--error)' : 'var(--primary)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ 
                      fontWeight: 700, 
                      color: h.type === 'error' ? 'var(--error)' : 'var(--primary)',
                      textTransform: 'uppercase',
                      fontSize: '0.8rem'
                    }}>
                      {h.type}
                    </span>
                    <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>&quot;{h.text}&quot;</span>
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Correction: <span style={{ color: 'var(--success)' }}>{h.correction}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{h.explanation}</p>
                </GlassCard>
              ))}
            </div>
          ) : (
            <GlassCard style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
              <p>Type something on the left and click &quot;Analyze&quot; to see your grammar feedback here.</p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreeWritingPage;
