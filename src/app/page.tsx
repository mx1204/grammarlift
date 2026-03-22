import AppButton from "@/components/AppButton";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container animate-fade-in">
      {/* Hero Section */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Elevate Your <span className="text-grad">English Grammar</span> <br />
          with AI Intelligence
        </h1>
        <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem' }}>
          Personalized, level-aware feedback and expert explanations to help you write with confidence and precision.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <Link href="/quiz">
            <AppButton size="lg">Start Free Placement Quiz</AppButton>
          </Link>
          <Link href="/pricing">
            <AppButton variant="outline" size="lg">View Pricing</AppButton>
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="section-padding">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          <GlassCard hover>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Adaptive Placement</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Our 5-minute quiz accurately places you in one of three CEFR-aligned levels to ensure you start exactly where you need.
            </p>
          </GlassCard>
          
          <GlassCard hover>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Real-world Utility</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Paste any text into Free Writing mode and get instant, level-aware corrections with plain-English explanations.
            </p>
          </GlassCard>
          
          <GlassCard hover>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Habit Building</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Track your progress with streaks, mastery scores per topic, and personalized exercise recommendations.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* CEFR Levels Section */}
      <section className="section-padding glass" style={{ borderRadius: '32px', padding: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Curriculum Focused on You</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>We cover everything from foundational articles to advanced stylistic nuances.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          <div style={{ padding: '1.5rem', borderRight: '1px solid var(--card-border)' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>Beginner (A1-A2)</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Foundational structures & basic tenses</p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
              <li>✓ Articles (a, an, the)</li>
              <li>✓ Present Simple & Continuous</li>
              <li>✓ Basic Sentence Structure</li>
            </ul>
          </div>
          
          <div style={{ padding: '1.5rem', borderRight: '1px solid var(--card-border)' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>Intermediate (B1-B2)</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Complexity & professional writing</p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
              <li>✓ All Past & Future Tenses</li>
              <li>✓ Conditionals (0, 1, 2)</li>
              <li>✓ Passive Voice & Modals</li>
            </ul>
          </div>
          
          <div style={{ padding: '1.5rem' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>Advanced (C1-C2)</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Fluency & academic excellence</p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
              <li>✓ Mixed Conditionals</li>
              <li>✓ Subjunctive Mood</li>
              <li>✓ Register & Tone Refinement</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
