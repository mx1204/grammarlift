'use client';

import React from 'react';
import GlassCard from '@/components/GlassCard';
import AppButton from '@/components/AppButton';

const PricingPage = () => {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started and identifying your level.',
      features: [
        'Level placement quiz',
        '10 exercises per month',
        'Basic AI feedback',
        'Daily streaks & goals',
      ],
      cta: 'Current Plan',
      variant: 'outline'
    },
    {
      name: 'Pro',
      price: '$9',
      popular: true,
      description: 'The ultimate tool for serious learners and professionals.',
      features: [
        'Unlimited exercises',
        'Advanced AI with examples',
        'Full Free Writing Mode',
        'Personalized error tracking',
        'Exportable reports',
      ],
      cta: 'Upgrade to Pro',
      variant: 'primary'
    },
    {
      name: 'Teams',
      price: '$29',
      description: 'For language schools and corporate teams up to 10 seats.',
      features: [
        'Admin dashboard',
        'Team progress viewing',
        'Custom exercises',
        'Priority support',
        'Everything in Pro',
      ],
      cta: 'Contact Sales',
      variant: 'outline'
    }
  ];

  return (
    <div className="container animate-fade-in" style={{ marginTop: '2rem' }}>
      <header style={{ marginBottom: '5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Choose Your <span className="text-grad">Path to Mastery</span></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Flexible pricing designed for individual learners and language learning teams.
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '2.5rem',
        alignItems: 'start'
      }}>
        {tiers.map((tier, i) => (
          <GlassCard 
            key={i} 
            hover 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              padding: '3rem 2rem',
              position: 'relative',
              border: tier.popular ? `2px solid var(--primary)` : '1px solid var(--card-border)',
              transform: tier.popular ? 'scale(1.05)' : 'scale(1)',
              zIndex: tier.popular ? 2 : 1
            }}
          >
            {tier.popular && (
              <div style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--primary)',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                Recommended
              </div>
            )}
            
            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{tier.name}</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>{tier.price}</span>
              <span style={{ opacity: 0.6 }}>/mo</span>
            </div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '2.5rem', minHeight: '3rem' }}>
              {tier.description}
            </p>

            <div style={{ flex: 1, marginBottom: '2.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', opacity: 0.8, marginBottom: '1.25rem', fontWeight: 700 }}>What&apos;s included:</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tier.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--success)', fontWeight: 700 }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <AppButton variant={tier.variant as 'primary' | 'outline'} size="lg" style={{ width: '100%' }}>
              {tier.cta}
            </AppButton>
          </GlassCard>
        ))}
      </div>

      <div style={{ marginTop: '6rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '0.9rem' }}>All plans include 14-day money-back guarantee. Cancel anytime.</p>
      </div>
    </div>
  );
};

export default PricingPage;
