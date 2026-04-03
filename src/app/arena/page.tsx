import Link from 'next/link';
import GlassCard from '@/components/GlassCard';

export default function ArenaPage() {
  return (
    <div className="container animate-fade-in">
      {/* Hero */}
      <section className="section-padding" style={{ textAlign: 'center', paddingBottom: '3rem' }}>
        <div style={{ marginBottom: '1rem', fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}>⚔️</div>
        <h1 style={{ fontSize: 'var(--fs-h1)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>
          <span className="text-grad">Grammar Arena</span>
        </h1>
        <p style={{ fontSize: 'var(--fs-hero-lead)', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Learn grammar by doing battle. Every question teaches <em>why</em> — not just right or wrong.
        </p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
          padding: '0.6rem 1.25rem', borderRadius: '99px',
          border: '1.5px solid var(--card-border)',
          background: 'var(--card-bg)', backdropFilter: 'blur(8px)',
          fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500
        }}>
          <span>🏆</span> Your Rank: <strong style={{ color: 'var(--primary)' }}>Bronze</strong>
          &nbsp;·&nbsp; XP: <strong style={{ color: 'var(--xp-color)' }}>0</strong>
        </div>
      </section>

      {/* Game Mode Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', paddingBottom: '5rem' }}>

        {/* Grammar Dungeon */}
        <Link href="/arena/dungeon" style={{ textDecoration: 'none' }}>
          <GlassCard hover style={{ height: '100%', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
              background: 'linear-gradient(90deg, var(--primary), var(--secondary))'
            }} />
            <div style={{ padding: '0.5rem 0 1.5rem' }}>
              <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '1rem' }}>🏰</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800 }}>Grammar Dungeon</h2>
                <span style={{
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  color: 'white', padding: '0.2rem 0.75rem',
                  borderRadius: '99px', fontSize: '0.78rem', fontWeight: 700
                }}>SOLO</span>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.7 }}>
                Battle through grammar enemies, face boss sentences, and earn XP. Every answer comes with a <strong>WHY</strong> explanation.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                {[
                  { icon: '❤️', label: 'HP System', desc: 'Lose HP on mistakes' },
                  { icon: '⚡', label: 'XP & Streaks', desc: 'Earn bonus multipliers' },
                  { icon: '👹', label: 'Boss Fights', desc: 'Multi-step challenges' },
                  { icon: '🧠', label: 'WHY Engine', desc: 'Learn the rule every time' },
                ].map((f) => (
                  <div key={f.label} style={{
                    padding: '0.75rem', borderRadius: '10px',
                    background: 'hsla(222,89%,60%,0.06)',
                    border: '1px solid var(--card-border)'
                  }}>
                    <div style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{f.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{f.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{f.desc}</div>
                  </div>
                ))}
              </div>

              <button className="btn btn-primary" style={{ width: '100%', fontSize: '1.05rem' }}>
                Enter Dungeon →
              </button>
            </div>
          </GlassCard>
        </Link>

        {/* Grammar Duel */}
        <Link href="/arena/duel" style={{ textDecoration: 'none' }}>
          <GlassCard hover style={{ height: '100%', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
              background: 'linear-gradient(90deg, var(--secondary), var(--hp-color))'
            }} />
            <div style={{ padding: '0.5rem 0 1.5rem' }}>
              <div style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '1rem' }}>🆚</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800 }}>Grammar Duel</h2>
                <span style={{
                  background: 'linear-gradient(135deg, hsl(280,80%,60%), hsl(0,80%,60%))',
                  color: 'white', padding: '0.2rem 0.75rem',
                  borderRadius: '99px', fontSize: '0.78rem', fontWeight: 700
                }}>2 PLAYERS</span>
              </div>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: 1.7 }}>
                Face off against a friend on the same screen. Three competitive modes: fix races, choice battles, and sentence building.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                {[
                  { icon: '⚡', label: 'Repair Race', desc: 'Fix the broken sentence — first to answer wins' },
                  { icon: '🧠', label: "Who's Right?", desc: 'Choose the correct answer AND explanation' },
                  { icon: '🧱', label: 'Sentence Builder', desc: 'Drag word blocks into the right order' },
                ].map((m) => (
                  <div key={m.label} style={{
                    display: 'flex', gap: '1rem', alignItems: 'center',
                    padding: '0.85rem 1rem', borderRadius: '10px',
                    background: 'hsla(280,80%,60%,0.06)',
                    border: '1px solid var(--card-border)'
                  }}>
                    <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{m.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{m.label}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="btn" style={{
                width: '100%', fontSize: '1.05rem',
                background: 'linear-gradient(135deg, hsl(280,80%,60%), hsl(0,80%,60%))',
                color: 'white', border: 'none'
              }}>
                Start Duel →
              </button>
            </div>
          </GlassCard>
        </Link>
      </section>

      {/* How It Works */}
      <section className="glass" style={{ borderRadius: '32px', padding: 'var(--card-p)', marginBottom: '5rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.75rem' }}>How Arena Works</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem' }}>
          Every action teaches the <em>why</em> — not just the what.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {[
            { step: '1', icon: '🎯', title: 'Face a Question', desc: 'MCQ, error fix, fill-blank, or rewrite — no filler' },
            { step: '2', icon: '⏱️', title: 'Answer in Time', desc: 'Timer adds pressure; streaks multiply your XP' },
            { step: '3', icon: '💡', title: 'Get the WHY', desc: 'Trigger words highlighted, 2–3 rule bullets explained' },
            { step: '4', icon: '📈', title: 'Adapt & Level Up', desc: 'Weak topics appear more; difficulty increases with you' },
          ].map((s) => (
            <div key={s.step} style={{ textAlign: 'center' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                color: 'white', fontWeight: 800, fontSize: '1.2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>{s.step}</div>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
              <h4 style={{ marginBottom: '0.4rem' }}>{s.title}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
