'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { DungeonQuestion, Topic, getDungeonRun, dungeonTopics } from '@/lib/dungeon-data';

type GamePhase = 'topic-select' | 'playing' | 'explaining' | 'boss-intro' | 'run-end';

const MAX_HP = 100;
const TIMER_SECONDS = 20;

// Highlight trigger words in text
function HighlightedText({ text, triggers }: { text: string; triggers: string[] }) {
  if (!triggers.length) return <span>{text}</span>;
  const pattern = new RegExp(`(${triggers.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(pattern);
  return (
    <span>
      {parts.map((part, i) =>
        triggers.some(t => t.toLowerCase() === part.toLowerCase())
          ? <span key={i} className="trigger-word">{part}</span>
          : <span key={i}>{part}</span>
      )}
    </span>
  );
}

export default function DungeonPage() {
  const [phase, setPhase] = useState<GamePhase>('topic-select');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [questions, setQuestions] = useState<DungeonQuestion[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [hp, setHp] = useState(MAX_HP);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [xpEarned, setXpEarned] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [powerups, setPowerups] = useState({ hint: 2, eliminate: 1, shield: 1, retry: 1 });
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [shakeCard, setShakeCard] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<Record<Topic, number>>({} as Record<Topic, number>);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQ = questions[qIndex];
  const streakMultiplier = streak >= 5 ? 2 : streak >= 3 ? 1.5 : 1;

  const startRun = (topic: Topic) => {
    const qs = getDungeonRun(topic);
    setSelectedTopic(topic);
    setQuestions(qs);
    setQIndex(0);
    setHp(MAX_HP);
    setXp(0);
    setStreak(0);
    setTotalXp(0);
    setWrongAnswers({} as Record<Topic, number>);
    if (qs[0]?.isBoss) {
      setPhase('boss-intro');
    } else {
      setPhase('playing');
    }
    resetQuestion();
  };

  const resetQuestion = useCallback(() => {
    setSelectedOption(null);
    setIsCorrect(null);
    setInputValue('');
    setEliminatedOptions([]);
    setHintRevealed(false);
    setTimeLeft(TIMER_SECONDS);
  }, []);

  // Timer
  useEffect(() => {
    if (phase !== 'playing') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleSubmit('__TIMEOUT__');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, qIndex]); // eslint-disable-line

  const handleSubmit = useCallback((answer: string) => {
    if (!currentQ) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const normalise = (s: string) => s.toLowerCase().replace(/[.,!?]/g, '').trim();
    const correct = answer !== '__TIMEOUT__' &&
      (currentQ.type === 'mcq'
        ? answer === currentQ.answer
        : normalise(answer) === normalise(currentQ.answer));

    setSelectedOption(answer === '__TIMEOUT__' ? null : answer);
    setIsCorrect(correct);

    if (correct) {
      const timeBonus = Math.floor(timeLeft / 5);
      const earned = Math.round((currentQ.xpReward + timeBonus) * streakMultiplier);
      setXpEarned(earned);
      setXp(x => x + earned);
      setTotalXp(t => t + earned);
      setStreak(s => s + 1);
    } else {
      setXpEarned(0);
      setStreak(0);
      if (!powerups.shield || answer === '__TIMEOUT__') {
        setHp(h => Math.max(0, h - currentQ.hpPenalty));
        setShakeCard(true);
        setTimeout(() => setShakeCard(false), 500);
      }
      setWrongAnswers(w => ({
        ...w,
        [currentQ.topic]: (w[currentQ.topic] || 0) + 1
      }));
    }

    setPhase('explaining');
  }, [currentQ, timeLeft, streakMultiplier, powerups.shield]);

  const nextQuestion = () => {
    if (hp <= 0) {
      setPhase('run-end');
      return;
    }
    const next = qIndex + 1;
    if (next >= questions.length) {
      setPhase('run-end');
      return;
    }
    setQIndex(next);
    resetQuestion();
    if (questions[next]?.isBoss) {
      setPhase('boss-intro');
    } else {
      setPhase('playing');
    }
  };

  // Power-ups
  const useHint = () => {
    if (powerups.hint <= 0 || hintRevealed) return;
    setHintRevealed(true);
    setPowerups(p => ({ ...p, hint: p.hint - 1 }));
  };
  const useEliminate = () => {
    if (powerups.eliminate <= 0 || !currentQ?.options) return;
    const wrongs = currentQ.options.filter(o => o !== currentQ.answer && !eliminatedOptions.includes(o));
    if (wrongs.length > 0) {
      setEliminatedOptions(e => [...e, wrongs[0]]);
    }
    setPowerups(p => ({ ...p, eliminate: p.eliminate - 1 }));
  };

  const timerPct = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor = timerPct > 60 ? 'var(--success)' : timerPct > 30 ? 'var(--xp-color)' : 'var(--hp-color)';

  // ─── TOPIC SELECT ────────────────────────────────────────
  if (phase === 'topic-select') {
    return (
      <div className="container animate-fade-in" style={{ maxWidth: '800px', padding: '3rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🏰</div>
          <h1 style={{ fontWeight: 800, marginBottom: '0.75rem' }}>Grammar Dungeon</h1>
          <p style={{ color: 'var(--text-muted)' }}>Choose your grammar topic and begin the run.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {dungeonTopics.map((t) => (
            <button
              key={t.id}
              onClick={() => startRun(t.id)}
              style={{
                padding: '1.5rem 1rem', borderRadius: '16px',
                border: '2px solid var(--card-border)',
                background: 'var(--card-bg)', backdropFilter: 'blur(8px)',
                cursor: 'pointer', textAlign: 'center',
                transition: 'all 0.2s ease', fontFamily: 'inherit'
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--card-border)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{t.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.label}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── BOSS INTRO ──────────────────────────────────────────
  if (phase === 'boss-intro') {
    return (
      <div className="container animate-fade-in" style={{ maxWidth: '600px', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>👹</div>
        <div className="boss-banner boss-glow" style={{ marginBottom: '2rem' }}>
          ⚔️ Boss Encounter!
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
          A multi-step grammar boss stands in your way. Combine your knowledge to defeat it!
        </p>
        <button className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '0.9rem 2.5rem' }}
          onClick={() => setPhase('playing')}>
          Accept Challenge →
        </button>
      </div>
    );
  }

  // ─── RUN END ─────────────────────────────────────────────
  if (phase === 'run-end') {
    const survived = hp > 0;
    const weakAreas = Object.entries(wrongAnswers).sort(([, a], [, b]) => b - a).slice(0, 2);

    return (
      <div className="container animate-fade-in" style={{ maxWidth: '600px', padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{survived ? '🏆' : '💀'}</div>
        <h1 style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}>
          {survived ? 'Run Complete!' : 'Dungeon Cleared You'}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
          {survived ? 'Great battle. Here\'s your summary.' : 'Don\'t worry — the explanation was the XP.'}
        </p>

        {/* Stats */}
        <div className="glass" style={{ borderRadius: '20px', padding: '2rem', marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--hp-color)' }}>{hp}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>HP Left</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--xp-color)' }}>{totalXp}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>XP Earned</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>
              {questions.filter((_, i) => i < qIndex).length}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Answered</div>
          </div>
        </div>

        {/* Weak areas */}
        {weakAreas.length > 0 && (
          <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
            <h4 style={{ marginBottom: '0.75rem' }}>📉 Areas to Review</h4>
            {weakAreas.map(([topic, count]) => (
              <div key={topic} style={{
                padding: '0.75rem 1rem', borderRadius: '10px',
                background: 'var(--wrong-bg)', border: '1px solid var(--wrong-border)',
                marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between'
              }}>
                <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{topic.replace('-', ' ')}</span>
                <span style={{ color: 'var(--hp-color)' }}>{count} mistake{count > 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => selectedTopic && startRun(selectedTopic)}>
            Run Again
          </button>
          <button className="btn btn-outline" onClick={() => { setPhase('topic-select'); setSelectedTopic(null); }}>
            New Topic
          </button>
        </div>
      </div>
    );
  }

  // ─── PLAYING / EXPLAINING ─────────────────────────────────
  if (!currentQ) return null;

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '720px', padding: '2rem 1.5rem 4rem' }}>
      {/* HUD */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>❤️ HP</span><span>{hp}/{MAX_HP}</span>
          </div>
          <div className="arena-bar-track">
            <div className="arena-bar-fill arena-hp-fill" style={{ width: `${(hp / MAX_HP) * 100}%` }} />
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
            <span>⚡ XP</span>
            <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {streak >= 3 && <span className="streak-badge">🔥 ×{streakMultiplier}</span>}
              {xp}
            </span>
          </div>
          <div className="arena-bar-track">
            <div className="arena-bar-fill arena-xp-fill" style={{ width: `${Math.min(100, (xp / 500) * 100)}%` }} />
          </div>
        </div>
      </div>

      {/* Progress & Timer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Question {qIndex + 1} / {questions.length}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '80px', height: '8px', borderRadius: '99px',
            background: 'var(--card-border)', overflow: 'hidden'
          }}>
            <div style={{ height: '100%', borderRadius: '99px', background: timerColor, width: `${timerPct}%`, transition: 'width 1s linear, background 0.5s' }} />
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: timerColor, minWidth: '1.5rem', textAlign: 'right' }}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Boss banner */}
      {currentQ.isBoss && (
        <div className="boss-banner boss-glow" style={{ marginBottom: '1.5rem' }}>
          👹 Boss Encounter
        </div>
      )}

      {/* Question card */}
      <div className={`glass ${shakeCard ? 'animate-shake' : ''}`} style={{
        borderRadius: '20px', padding: '2rem', marginBottom: '1.5rem',
        border: currentQ.isBoss ? '2px solid var(--boss-color)' : '1px solid var(--card-border)'
      }}>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <span style={{
            padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 700,
            background: 'hsla(222,89%,60%,0.12)', color: 'var(--primary)', border: '1px solid var(--primary-light)'
          }}>
            {currentQ.type === 'mcq' ? 'Multiple Choice' : currentQ.type === 'fix' ? 'Fix the Sentence' : currentQ.type === 'fill-blank' ? 'Fill in the Blank' : 'Rewrite'}
          </span>
          <span style={{
            padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 600,
            background: 'var(--card-bg)', color: 'var(--text-muted)', border: '1px solid var(--card-border)'
          }}>
            {currentQ.difficulty}
          </span>
        </div>

        <p style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.6 }}>
          {phase === 'playing' ? currentQ.prompt : (
            <HighlightedText text={currentQ.prompt} triggers={currentQ.explanation.triggers} />
          )}
        </p>

        {/* Hint */}
        {hintRevealed && phase === 'playing' && (
          <div style={{
            marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '10px',
            background: 'var(--explain-bg)', border: '1px solid var(--explain-border)',
            fontSize: '0.9rem', color: 'var(--text-muted)'
          }}>
            💡 Hint: {currentQ.explanation.bullets[0]}
          </div>
        )}
      </div>

      {/* Answer area */}
      {phase === 'playing' && (
        <>
          {currentQ.type === 'mcq' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {currentQ.options!.map((opt) => {
                const isElim = eliminatedOptions.includes(opt);
                return (
                  <button
                    key={opt}
                    disabled={isElim}
                    className="arena-option"
                    style={{ opacity: isElim ? 0.3 : 1, textDecoration: isElim ? 'line-through' : 'none' }}
                    onClick={() => handleSubmit(opt)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {(currentQ.type === 'fix' || currentQ.type === 'fill-blank' || currentQ.type === 'rewrite') && (
            <div style={{ marginBottom: '1.5rem' }}>
              <textarea
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder={currentQ.type === 'fix' ? 'Type the corrected sentence...' : currentQ.type === 'fill-blank' ? 'Type the missing word(s)...' : 'Rewrite the sentence...'}
                rows={currentQ.type === 'rewrite' ? 3 : 2}
                style={{
                  width: '100%', padding: '1rem', borderRadius: '12px',
                  border: '2px solid var(--card-border)', background: 'var(--card-bg)',
                  color: 'var(--foreground)', fontSize: '1rem', fontFamily: 'inherit',
                  resize: 'vertical', outline: 'none', lineHeight: 1.5,
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => (e.target.style.borderColor = 'var(--primary)')}
                onBlur={e => (e.target.style.borderColor = 'var(--card-border)')}
              />
              <button className="btn btn-primary" style={{ marginTop: '0.75rem', width: '100%' }}
                onClick={() => handleSubmit(inputValue)}
                disabled={!inputValue.trim()}>
                Submit Answer
              </button>
            </div>
          )}

          {/* Power-ups */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button className="powerup-btn" onClick={useHint} disabled={powerups.hint === 0 || hintRevealed}>
              💡 Hint ({powerups.hint})
            </button>
            {currentQ.type === 'mcq' && (
              <button className="powerup-btn" onClick={useEliminate} disabled={powerups.eliminate === 0}>
                🗑️ Eliminate ({powerups.eliminate})
              </button>
            )}
            <button className="powerup-btn" disabled={powerups.shield === 0}
              title="Prevents HP loss on next wrong answer">
              🛡️ Shield ({powerups.shield})
            </button>
          </div>
        </>
      )}

      {/* Explanation panel */}
      {phase === 'explaining' && (
        <div className="animate-slide-up">
          {/* Result indicator */}
          <div className={`explanation-panel ${isCorrect ? 'correct' : 'wrong'}`} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
              </div>
              {isCorrect && xpEarned > 0 && (
                <div className="xp-pop streak-badge">+{xpEarned} XP {streak > 1 ? `🔥×${streakMultiplier}` : ''}</div>
              )}
            </div>
            {!isCorrect && (
              <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                {selectedOption && <span>Your answer: <strong>{selectedOption}</strong></span>}
                <br />
                Correct: <strong style={{ color: 'var(--correct-border)' }}>{currentQ.answer}</strong>
              </div>
            )}
          </div>

          {/* WHY explanation */}
          <div className="explanation-panel" style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: 'var(--xp-color)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              🧠 Why?
            </div>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {currentQ.explanation.bullets.map((b, i) => (
                <li key={i} style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                  <HighlightedText text={b} triggers={currentQ.explanation.triggers} />
                </li>
              ))}
            </ul>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', fontSize: '1.05rem' }} onClick={nextQuestion}>
            {qIndex + 1 >= questions.length ? 'See Results →' : 'Next Question →'}
          </button>
        </div>
      )}
    </div>
  );
}
