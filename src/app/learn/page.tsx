'use client';

import React, { useState } from 'react';
import { grammarRules } from '@/lib/grammar-data';
import GlassCard from '@/components/GlassCard';
import AppButton from '@/components/AppButton';
import Link from 'next/link';

export default function LearnDirectoryPage() {
  const [search, setSearch] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('All');

  const filteredRules = grammarRules.filter(rule => {
    const matchesSearch = rule.title.toLowerCase().includes(search.toLowerCase()) || 
                         rule.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = filterLevel === 'All' || rule.level === filterLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="container animate-fade-in" style={{ marginTop: '2rem' }}>
      <header style={{ marginBottom: 'var(--section-py)' }}>
        <h1 style={{ fontSize: 'var(--fs-h2)', fontWeight: 800, marginBottom: '0.5rem' }}>Grammar Library</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body)' }}>Explore comprehensive rules, examples, and expert tips for every CEFR level.</p>
      </header>

      {/* Search & Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px' }}>
          <input
            type="text"
            placeholder="Search topics (e.g., 'tenses', 'articles')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '1px solid var(--card-border)',
              background: 'var(--card-bg)',
              color: 'inherit',
              fontFamily: 'inherit',
              outline: 'none'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '8px',
                border: `1px solid ${filterLevel === lvl ? 'var(--primary)' : 'var(--card-border)'}`,
                background: filterLevel === lvl ? 'var(--primary-light)' : 'transparent',
                color: filterLevel === lvl ? 'var(--primary-dark)' : 'inherit',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {filteredRules.map(rule => (
          <GlassCard key={rule.id} hover style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                color: 'var(--primary)', 
                background: 'var(--primary-light)', 
                padding: '4px 10px', 
                borderRadius: '20px' 
              }}>
                {rule.level}
              </span>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{rule.category}</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{rule.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2rem', flex: 1 }}>
              {rule.shortDescription}
            </p>
            <Link href={`/learn/${rule.id}`}>
              <AppButton style={{ width: '100%' }}>Read More</AppButton>
            </Link>
          </GlassCard>
        ))}
      </div>

      {filteredRules.length === 0 && (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
          <p>No topics found matching your search. Try different keywords.</p>
        </div>
      )}
    </div>
  );
}
