'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { grammarRules } from '@/lib/grammar-data';
import GlassCard from '@/components/GlassCard';
import AppButton from '@/components/AppButton';
import Link from 'next/link';

export default function TopicDetailPage() {
  const params = useParams();
  const topicId = params.topic as string;
  const rule = grammarRules.find(r => r.id === topicId);

  if (!rule) {
    return <div className="container">Topic not found.</div>;
  }

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '900px', marginTop: '2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <Link href="/learn" style={{ color: 'var(--text-muted)', display: 'inline-block', marginBottom: '1.5rem', fontWeight: 500 }}>
          ← Back to Library
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
           <span style={{ 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            color: 'var(--primary)', 
            background: 'var(--primary-light)', 
            padding: '4px 12px', 
            borderRadius: '20px' 
          }}>
            {rule.level}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{rule.category}</span>
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>{rule.title}</h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }}>
        {/* Detailed Explanation */}
        <GlassCard>
          <div className="prose" style={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
            {rule.detailedContent.split('\n').map((line, i) => {
              if (line.trim().startsWith('###')) {
                return <h3 key={i} style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--primary)' }}>{line.replace('###', '').trim()}</h3>;
              }
              if (line.trim().startsWith('*')) {
                return <p key={i} style={{ marginBottom: '0.5rem', fontWeight: 600 }}>{line.trim()}</p>;
              }
              return <p key={i} style={{ marginBottom: '1rem' }}>{line.trim()}</p>;
            })}
          </div>
        </GlassCard>

        {/* Examples Section */}
        <section>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', paddingLeft: '0.5rem' }}>Examples & Clarifications</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {rule.examples.map((ex, i) => (
              <GlassCard key={i} style={{ borderLeft: '4px solid var(--secondary)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <div style={{ flex: 1 }}>
                       <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--error)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Common Mistake</span>
                       <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>{ex.original}</p>
                    </div>
                    <div style={{ width: '2px', background: 'var(--card-border)' }} />
                    <div style={{ flex: 1 }}>
                       <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>Correct Alternative</span>
                       <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{ex.corrected}</p>
                    </div>
                  </div>
                  <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                    <span style={{ fontWeight: 700, color: 'var(--foreground)', marginRight: '0.5rem' }}>RATIONALE:</span>
                    {ex.note}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Action Call */}
        <GlassCard className="grad-primary" style={{ textAlign: 'center', color: 'white', padding: '3rem' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Ready to practice?</h3>
          <p style={{ marginBottom: '2rem', opacity: 0.9 }}>Take a quick quiz to test your understanding of {rule.title}.</p>
          <Link href={`/learn/${rule.id}/practice`}>
            <AppButton variant="outline" style={{ border: '2px solid white', color: 'white' }}>Start Practice Session</AppButton>
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}
