'use client';

import React from 'react';
import AppButton from '@/components/AppButton';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '5rem' }}>
      <section className="section-padding" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--fs-h1)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Built by Students, <br />
          <span className="text-grad">Refined by You</span>
        </h1>
        
        <GlassCard style={{ marginTop: '3rem', textAlign: 'left' }}>
          <p style={{ fontSize: 'var(--fs-hero-lead)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            GrammarLift is a passion project by two Computer Science students based in Singapore. 
            We’re obsessed with using AI to make English grammar intuitive, but we know 
            we haven’t caught every edge case yet.
          </p>

          <div style={{ 
            padding: 'var(--card-p)', 
            borderRadius: '20px', 
            background: 'hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.05)',
            border: '1px solid hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1)',
            marginBottom: '2.5rem'
          }}>
            <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: '1rem', color: 'var(--primary)' }}>Want to help us grow?</h2>
            <p style={{ marginBottom: '1.5rem', fontSize: 'var(--fs-body)' }}>
              Send your feedback, bug reports, or feature ideas to{' '}
              <a href="mailto:grammarlift@gmail.com" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                grammarlift@gmail.com
              </a>.
            </p>
            <Link href="mailto:grammarlift@gmail.com">
              <AppButton>Send Feedback</AppButton>
            </Link>
          </div>

          <div style={{ position: 'relative', overflow: 'hidden', padding: 'var(--card-p)', borderRadius: '20px', background: 'linear-gradient(135deg, hsla(var(--secondary-h), var(--secondary-s), var(--secondary-l), 0.1), hsla(var(--primary-h), var(--primary-s), var(--primary-l), 0.1))', border: '1px solid var(--card-border)' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '5rem', opacity: 0.1, transform: 'rotate(15deg)' }}>🏆</div>
            <h3 style={{ fontSize: 'var(--fs-h3)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
               Founding Member Program
            </h3>
            <p style={{ fontSize: 'var(--fs-body)', lineHeight: '1.6', margin: 0 }}>
              Anyone who reaches out will automatically become a <strong>Founding Member</strong>. 
              We’ll personally look into your suggestions and ensure you have access to things we build next on GrammarLift.
            </p>
          </div>
        </GlassCard>

        <div style={{ marginTop: '4rem' }}>
          <Link href="/">
            <AppButton variant="outline">Back to Home</AppButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
