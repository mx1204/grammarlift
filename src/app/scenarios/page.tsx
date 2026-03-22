'use client';

import React, { useState } from 'react';
import { scenarios } from '@/lib/scenario-data';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';

export default function ScenariosDirectory() {
  const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Corporate' | 'Social' | 'Networking' | 'Negotiation'>('All');

  const filteredScenarios = scenarios.filter(s => {
    const levelMatch = filter === 'All' || s.level === filter;
    const categoryMatch = categoryFilter === 'All' || s.category === categoryFilter;
    return levelMatch && categoryMatch;
  });

  return (
    <div className="container animate-fade-in" style={{ marginTop: '2rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Conversational Scenarios</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          Master 50+ real-world situations. Practice your grammar and interpersonal skills.
        </p>
      </header>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', background: 'var(--card-bg)', padding: '4px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((l) => (
            <button
              key={l}
              onClick={() => setFilter(l as 'All' | 'Beginner' | 'Intermediate' | 'Advanced')}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                background: filter === l ? 'var(--primary)' : 'transparent',
                color: filter === l ? 'white' : 'inherit',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              {l}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'flex', background: 'var(--card-bg)', padding: '4px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
          {['All', 'Corporate', 'Social', 'Networking', 'Negotiation'].map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c as 'All' | 'Corporate' | 'Social' | 'Networking' | 'Negotiation')}
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                background: categoryFilter === c ? 'var(--primary)' : 'transparent',
                color: categoryFilter === c ? 'white' : 'inherit',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s'
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        {filteredScenarios.map((s) => (
          <Link href={`/scenarios/${s.id}`} key={s.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <GlassCard 
              style={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
              }}
              className="hover-lift"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 700, 
                  padding: '4px 10px', 
                  borderRadius: '20px', 
                  background: s.level === 'Beginner' ? 'rgba(34, 197, 94, 0.1)' : s.level === 'Intermediate' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(168, 85, 247, 0.1)',
                  color: s.level === 'Beginner' ? '#22c55e' : s.level === 'Intermediate' ? '#3b82f6' : '#a855f7'
                }}>
                  {s.level}
                </span>
                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{s.category}</span>
              </div>
              
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', flex: 1 }}>{s.context}</p>
              
              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                Start Practice →
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
