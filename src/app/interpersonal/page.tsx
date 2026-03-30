'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { interpersonalScenarios } from '@/lib/interpersonal-data';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';
import GoldenReplyGenerator from '@/components/GoldenReplyGenerator';

export default function InterpersonalHubPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get('tab') || 'scenarios';
  
  const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Corporate' | 'Social' | 'Networking' | 'Negotiation' | 'Conflict' | 'Leadership'>('All');

  const filteredScenarios = interpersonalScenarios.filter(s => {
    const levelMatch = filter === 'All' || s.difficulty === filter;
    const categoryMatch = categoryFilter === 'All' || s.category === categoryFilter;
    return levelMatch && categoryMatch;
  });

  const setTab = (newTab: string) => {
    router.push(`/interpersonal?tab=${newTab}`);
  };

  return (
    <div className="container animate-fade-in" style={{ marginTop: '2rem', paddingBottom: '4rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem' }}>Interpersonal Skills</h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.8, maxWidth: '750px', margin: '0 auto' }}>
          Master the art of professional communication. Practice with real-world scenarios or use our AI to craft the perfect Golden Version of your messages.
        </p>
      </header>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', background: 'var(--card-bg)', padding: '6px', borderRadius: '16px', border: '1px solid var(--card-border)', width: 'fit-content' }}>
          <button
            onClick={() => setTab('scenarios')}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '12px',
              background: tab === 'scenarios' ? 'var(--primary)' : 'transparent',
              color: tab === 'scenarios' ? 'white' : 'inherit',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1rem',
              transition: 'all 0.2s'
            }}
          >
            Practice Scenarios
          </button>
          <button
            onClick={() => setTab('golden-reply')}
            style={{
              padding: '0.75rem 2rem',
              borderRadius: '12px',
              background: tab === 'golden-reply' ? 'var(--primary)' : 'transparent',
              color: tab === 'golden-reply' ? 'white' : 'inherit',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '1rem',
              transition: 'all 0.2s'
            }}
          >
            Golden Reply Generator
          </button>
        </div>
      </div>

      {tab === 'scenarios' ? (
        <div className="animate-fade-in">
          {/* Filters */}
          <section style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', background: 'var(--card-bg)', padding: '4px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((l) => (
                <button
                  key={l}
                  onClick={() => setFilter(l as any)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    background: filter === l ? 'var(--primary)' : 'transparent',
                    color: filter === l ? 'white' : 'inherit',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}
                >
                  {l}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', background: 'var(--card-bg)', padding: '4px', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              {['All', 'Corporate', 'Social', 'Networking', 'Negotiation', 'Conflict', 'Leadership'].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(c as any)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    background: categoryFilter === c ? 'var(--primary)' : 'transparent',
                    color: categoryFilter === c ? 'white' : 'inherit',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </section>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '2rem' 
          }}>
            {filteredScenarios.map((s) => (
              <Link href={`/scenarios/${s.id}`} key={s.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <GlassCard style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      padding: '2px 8px', 
                      borderRadius: '4px', 
                      background: s.difficulty === 'Beginner' ? 'rgba(34, 197, 94, 0.1)' : s.difficulty === 'Intermediate' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: s.difficulty === 'Beginner' ? '#22c55e' : s.difficulty === 'Intermediate' ? '#eab308' : '#ef4444',
                      fontWeight: 700
                    }}>
                      {s.difficulty}
                    </span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{s.category}</span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', flex: 1 }}>{s.context}</p>
                  
                  <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                    Start Training →
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <GoldenReplyGenerator />
        </div>
      )}
    </div>
  );
}
