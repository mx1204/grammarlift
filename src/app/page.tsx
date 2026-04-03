import AppButton from "@/components/AppButton";
import GlassCard from "@/components/GlassCard";
import Link from "next/link";

export default function Home() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GrammarLift",
    "operatingSystem": "Web",
    "applicationCategory": "EducationalApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "GrammarLift is an AI-powered educational platform designed for English language learners. It features an adaptive placement quiz aligned with the Common European Framework of Reference for Languages (CEFR), covering levels A1 through C2. The system provides real-time, level-aware feedback on writing scenarios, helping users improve grammar precision and stylistic nuance through personalized AI-driven insights and comprehensive rule libraries.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <div className="container animate-fade-in">
      {/* Hero Section */}
      <section className="section-padding" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 'var(--fs-h1)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
          Elevate Your <span className="text-grad">English Grammar</span> <br />
          with AI Intelligence
        </h1>
        <p style={{ fontSize: 'var(--fs-hero-lead)', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '900px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
          GrammarLift is an AI-powered educational platform designed for English language learners. It features an adaptive placement quiz aligned with the Common European Framework of Reference for Languages (CEFR), covering levels A1 through C2. The system provides real-time, level-aware feedback on writing scenarios, helping users improve grammar precision and stylistic nuance through personalized AI-driven insights and comprehensive rule libraries.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/quiz">
            <AppButton size="lg">Start Free Placement Quiz</AppButton>
          </Link>
          <Link href="/faq">
            <AppButton variant="outline" size="lg">FAQ</AppButton>
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="section-padding">
        <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <GlassCard hover>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Adaptive Placement</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Our 5-minute quiz accurately places you in one of three CEFR-aligned levels to ensure you start exactly where you need.
            </p>
          </GlassCard>
          
          <GlassCard hover>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Real-world English Writing Scenarios</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Paste any text into Free Writing mode and get instant, level-aware corrections with plain-English explanations.
            </p>
          </GlassCard>
          
          <GlassCard hover>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Comprehensive Library</h3>
            <p style={{ color: 'var(--text-muted)' }}>
              Explore deep dives into grammar rules for every level. Practice on-the-spot with interactive questions that explain the logic.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* CEFR Levels Section */}
      <section className="section-padding glass" style={{ borderRadius: '32px', padding: 'var(--card-p)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: '1rem' }}>CEFR-Aligned Proficiency Levels (A1-C2)</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-body)' }}>We cover everything from foundational articles to advanced stylistic nuances.</p>
        </div>
        
        <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div style={{ padding: '1.5rem' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>Beginner (A1-A2)</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Foundational structures & basic tenses</p>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
              <li>✓ Articles (a, an, the)</li>
              <li>✓ Present Simple & Continuous</li>
              <li>✓ Basic Sentence Structure</li>
            </ul>
          </div>
          
          <div style={{ padding: '1.5rem' }}>
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
    </>
  );
}
