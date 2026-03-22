'use client';

import React from 'react';
import GlassCard from '@/components/GlassCard';
import AppButton from '@/components/AppButton';
import Link from 'next/link';

const DashboardPage = () => {
  const user = {
    name: 'Sara',
    level: 'Intermediate',
    streak: 12,
    goal: 15,
    xp: 1250,
    mastery: [
      { topic: 'Tenses', score: 85, color: 'var(--primary)' },
      { topic: 'Conditionals', score: 40, color: 'var(--secondary)' },
      { topic: 'Passive Voice', score: 15, color: 'var(--error)' },
      { topic: 'Articles', score: 95, color: 'var(--success)' },
    ]
  };

  const recommendedExercises = [
    { id: 101, title: 'Zero & First Conditional', level: 'Intermediate', duration: '5 min' },
    { id: 102, title: 'Passive Voice Basics', level: 'Intermediate', duration: '8 min' },
    { id: 103, title: 'Modal Verbs: Must vs Should', level: 'Intermediate', duration: '6 min' },
  ];

  return (
    <div className="container animate-fade-in" style={{ marginTop: '2rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Welcome back, {user.name}!</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>You&apos;re on a <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{user.streak} day streak</span>. Keep it up!</p>
        </div>
        <div className="glass" style={{ padding: '1rem 2rem', borderRadius: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>CURRENT LEVEL</span>
          <span className="text-grad" style={{ fontSize: '1.5rem' }}>{user.level}</span>
        </div>
      </header>

      <div className="responsive-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Mastery Grid */}
          <GlassCard>
            <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Topic Mastery</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
              gap: '1.5rem',
              justifyItems: 'center'
            }}>
              {user.mastery.map((m, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    position: 'relative', 
                    width: '80px', 
                    height: '80px', 
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="80" height="80" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="var(--card-border)" strokeWidth="8" />
                      <circle cx="50" cy="50" r="45" fill="none" stroke={m.color} strokeWidth="8" 
                        strokeDasharray={`${2 * Math.PI * 45}`}
                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - m.score / 100)}`}
                        strokeLinecap="round"
                        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s ease' }}
                      />
                    </svg>
                    <span style={{ position: 'absolute', fontWeight: 700, fontSize: '1rem' }}>{m.score}%</span>
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>{m.topic}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Recommended Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.5rem' }}>Recommended for you</h3>
            {recommendedExercises.map((ex, i) => (
              <GlassCard key={i} hover style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{ex.title}</h4>
                  <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <span>{ex.level}</span>
                    <span>•</span>
                    <span>{ex.duration}</span>
                  </div>
                </div>
                <Link href={`/exercise/${ex.id}`}>
                  <AppButton size="sm">Start</AppButton>
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <GlassCard style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: '1.5rem', opacity: 0.7 }}>DAILY GOAL</h4>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {Math.min(10, user.goal)}/15
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Minutes practiced today</p>
            <div style={{ height: '8px', background: 'var(--card-border)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '66%', height: '100%', background: 'var(--primary)' }} />
            </div>
          </GlassCard>

          <GlassCard className="grad-primary" style={{ color: 'white' }}>
            <h3 style={{ marginBottom: '1rem' }}>Go Pro!</h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', opacity: 0.9 }}>Unlock unlimited exercises and advanced AI feedback.</p>
            <Link href="/pricing">
              <AppButton variant="outline" style={{ border: '2px solid white', color: 'white', width: '100%' }}>Upgrade Now</AppButton>
            </Link>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
