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
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        <div>
          <header style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <span className="glass" style={{ fontSize: '0.75rem', padding: '4px 12px', borderRadius: '20px' }}>{scenario.category}</span>
              <span className="glass" style={{ fontSize: '0.75rem', padding: '4px 12px', borderRadius: '20px' }}>{scenario.difficulty}</span>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{scenario.title}</h1>
          </header>

          <GlassCard style={{ padding: '2rem', marginBottom: '2rem', borderLeft: '4px solid var(--primary)' }}>
            <h3 style={{ marginBottom: '1rem' }}>The Situation</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6 }}>{scenario.context}</p>
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
              <GlassCard style={{ flex: 1, padding: '1.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '0.5rem', color: 'var(--primary)' }}>
                  {scenario.character.name} ({scenario.character.role})
                </span>
                <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>&quot;{scenario.prompt}&quot;</p>
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
