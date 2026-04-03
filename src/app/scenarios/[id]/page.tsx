'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { interpersonalScenarios } from '@/lib/interpersonal-data';
import GlassCard from '@/components/GlassCard';
import AppButton from '@/components/AppButton';
import InterpersonalTrainer from '@/components/InterpersonalTrainer';
import Link from 'next/link';

export default function ScenarioPlayerPage() {
  const { id } = useParams();
  const scenario = interpersonalScenarios.find(s => s.id === id);
  
  if (!scenario) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h2>Scenario not found</h2>
        <Link href="/scenarios" style={{ color: 'var(--primary)', textDecoration: 'none' }}>← Back to directory</Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
      <Link href="/scenarios" style={{ textDecoration: 'none', color: 'var(--primary)', display: 'block', marginBottom: '2rem' }}>
        ← Back to Scenarios
      </Link>
      
      <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', gap: '2rem' }}>
        <div>
          <header style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <span className="glass" style={{ fontSize: '0.7rem', padding: '4px 12px', borderRadius: '20px' }}>{scenario.category}</span>
              <span className="glass" style={{ fontSize: '0.7rem', padding: '4px 12px', borderRadius: '20px' }}>{scenario.difficulty}</span>
            </div>
            <h1 style={{ fontSize: 'var(--fs-h2)', fontWeight: 800 }}>{scenario.title}</h1>
          </header>

          <GlassCard style={{ padding: 'var(--card-p)', marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: 'var(--fs-h3)' }}>The Situation</h3>
            <p style={{ fontSize: 'var(--fs-body)', lineHeight: 1.6 }}>{scenario.context}</p>
          </GlassCard>

          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
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
              <GlassCard style={{ flex: 1, padding: '1.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {scenario.character.name} ({scenario.character.role})
                </span>
                <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', fontWeight: 500 }}>&quot;{scenario.prompt}&quot;</p>
              </GlassCard>
            </div>
          </div>

          <InterpersonalTrainer scenario={scenario} />
        </div>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <GlassCard>
            <h4>Learning Objectives</h4>
            <ul style={{ marginTop: '1rem', paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              {scenario.learningObjectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </GlassCard>
          
          <GlassCard>
            <h4 style={{ marginBottom: '1rem' }}>Interaction Partner</h4>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '16px', 
                background: 'var(--primary)', 
                margin: '0 auto 1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 800, fontSize: '1.5rem'
              }}>
                {scenario.character.name[0]}
              </div>
              <h5 style={{ fontSize: '1.1rem' }}>{scenario.character.name}</h5>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{scenario.character.description}</p>
            </div>
          </GlassCard>
        </aside>
      </div>
    </div>
  );
}
