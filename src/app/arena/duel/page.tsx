'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

type DuelMode = 'repair-race' | 'whos-right' | 'sentence-builder';
type DuelPhase = 'mode-select' | 'playing' | 'round-end' | 'game-over';

interface DuelQuestion {
  id: string;
  mode: DuelMode;
  prompt: string;
  brokenSentence?: string;
  options?: { text: string; explanation: string }[];
  correctOptionIndex?: number;
  wordBlocks?: string[];
  correctSentence?: string;
  explanation: { correct: string; bullets: string[] };
}

const DUEL_QUESTIONS: DuelQuestion[] = [
  {
    id: 'rr1', mode: 'repair-race',
    prompt: 'Fix the sentence:',
    brokenSentence: "She don't likes coffee.",
    explanation: { correct: "She doesn't like coffee.", bullets: ["Third-person singular → 'doesn't'", "After auxiliary, use base verb: 'like' not 'likes'."] }
  },
  {
    id: 'rr2', mode: 'repair-race',
    prompt: 'Fix the sentence:',
    brokenSentence: 'I have went to Paris last year.',
    explanation: { correct: 'I went to Paris last year.', bullets: ['"Last year" is a specific past time → Past Simple.', 'Present Perfect cannot be used with definite past time expressions.'] }
  },
  {
    id: 'rr3', mode: 'repair-race',
    prompt: 'Fix the sentence:',
    brokenSentence: 'He is more tall than his brother.',
    explanation: { correct: 'He is taller than his brother.', bullets: ['One-syllable adjectives → add -er (taller).', '"More" is for adjectives with 2+ syllables (more beautiful).'] }
  },
  {
    id: 'wr1', mode: 'whos-right',
    prompt: 'Which is grammatically correct?',
    options: [
      { text: 'A) She has ate lunch.', explanation: '"Has ate" is incorrect — never combine "has" with simple past.' },
      { text: 'B) She has eaten lunch.', explanation: '"Has eaten" is correct — Present Perfect uses the past participle.' },
    ],
    correctOptionIndex: 1,
    explanation: { correct: 'She has eaten lunch.', bullets: ['Present Perfect = has/have + past participle.', '"Eaten" is the past participle of eat; "ate" is the simple past.'] }
  },
  {
    id: 'wr2', mode: 'whos-right',
    prompt: 'Which is grammatically correct?',
    options: [
      { text: 'A) If I would know, I would tell you.', explanation: '"Would" cannot appear in the "if" clause of a conditional.' },
      { text: 'B) If I knew, I would tell you.', explanation: 'Second conditional: "if" + Past Simple, result + "would" + base verb.' },
    ],
    correctOptionIndex: 1,
    explanation: { correct: 'If I knew, I would tell you.', bullets: ['Second conditional for hypothetical situations.', 'If-clause: Past Simple. Result clause: would + base verb.', 'NEVER use "would" in the if-clause.'] }
  },
  {
    id: 'wr3', mode: 'whos-right',
    prompt: 'Which is grammatically correct?',
    options: [
      { text: 'A) The informations are available online.', explanation: '"Information" is an uncountable noun — cannot be pluralised.' },
      { text: 'B) The information is available online.', explanation: '"Information" is uncountable → singular verb "is".' },
    ],
    correctOptionIndex: 1,
    explanation: { correct: 'The information is available online.', bullets: ['"Information" is uncountable (like news, advice, furniture).', 'Uncountable nouns take singular verbs and no plural -s.'] }
  },
  {
    id: 'sb1', mode: 'sentence-builder',
    prompt: 'Build the passive sentence:',
    wordBlocks: ['by', 'was', 'the', 'cake', 'eaten', 'him'],
    correctSentence: 'The cake was eaten by him.',
    explanation: { correct: 'The cake was eaten by him.', bullets: ['Passive: Object → Subject, was/were + past participle.', '"By" introduces the agent (the original subject).'] }
  },
  {
    id: 'sb2', mode: 'sentence-builder',
    prompt: 'Build the correct sentence:',
    wordBlocks: ['she', 'if', 'studied', 'harder', 'would', 'have', 'had', 'passed', 'she'],
    correctSentence: 'If she had studied harder she would have passed.',
    explanation: { correct: 'If she had studied harder, she would have passed.', bullets: ['Third conditional: if + Past Perfect, would have + past participle.', 'Expresses regret about a past situation.'] }
  },
];

// Scramble word blocks
function shuffleBlocks(blocks: string[]): string[] {
  return [...blocks].sort(() => Math.random() - 0.5);
}

const ROUNDS = 5;

export default function DuelPage() {
  const [phase, setPhase] = useState<DuelPhase>('mode-select');
  const [mode, setMode] = useState<DuelMode>('repair-race');
  const [scores, setScores] = useState([0, 0]); // [P1, P2]
  const [round, setRound] = useState(0);
  const [currentQ, setCurrentQ] = useState<DuelQuestion | null>(null);
  const [p1Answer, setP1Answer] = useState('');
  const [p2Answer, setP2Answer] = useState('');
  const [p1Submitted, setP1Submitted] = useState(false);
  const [p2Submitted, setP2Submitted] = useState(false);
  const [p1Correct, setP1Correct] = useState<boolean | null>(null);
  const [p2Correct, setP2Correct] = useState<boolean | null>(null);
  const [p1Points, setP1Points] = useState(0);
  const [p2Points, setP2Points] = useState(0);
  const [p1SelectedOpt, setP1SelectedOpt] = useState<number | null>(null);
  const [p2SelectedOpt, setP2SelectedOpt] = useState<number | null>(null);
  // Sentence builder
  const [p1Blocks, setP1Blocks] = useState<string[]>([]);
  const [p2Blocks, setP2Blocks] = useState<string[]>([]);
  const [p1Built, setP1Built] = useState<string[]>([]);
  const [p2Built, setP2Built] = useState<string[]>([]);

  const modeQuestions = DUEL_QUESTIONS.filter(q => q.mode === mode);

  const startGame = (selectedMode: DuelMode) => {
    setMode(selectedMode);
    setScores([0, 0]);
    setRound(0);
    loadRound(0, selectedMode);
    setPhase('playing');
  };

  const loadRound = (idx: number, m: DuelMode = mode) => {
    const qs = DUEL_QUESTIONS.filter(q => q.mode === m);
    const q = qs[idx % qs.length];
    setCurrentQ(q);
    setP1Answer(''); setP2Answer('');
    setP1Submitted(false); setP2Submitted(false);
    setP1Correct(null); setP2Correct(null);
    setP1Points(0); setP2Points(0);
    setP1SelectedOpt(null); setP2SelectedOpt(null);
    if (q.wordBlocks) {
      setP1Blocks(shuffleBlocks(q.wordBlocks));
      setP2Blocks(shuffleBlocks(q.wordBlocks));
      setP1Built([]); setP2Built([]);
    }
  };

  const normalise = (s: string) => s.toLowerCase().replace(/[.,!?]/g, '').trim().replace(/\s+/g, ' ');

  const submitAnswer = (player: 0 | 1, answer: string) => {
    if (!currentQ) return;
    const correct = normalise(answer) === normalise(currentQ.explanation.correct);
    const pts = correct ? (mode === 'whos-right' ? 10 : 15) : -5;

    if (player === 0) {
      setP1Answer(answer); setP1Submitted(true); setP1Correct(correct); setP1Points(pts);
    } else {
      setP2Answer(answer); setP2Submitted(true); setP2Correct(correct); setP2Points(pts);
    }
  };

  const submitOption = (player: 0 | 1, optIdx: number) => {
    if (!currentQ?.options) return;
    const correct = optIdx === currentQ.correctOptionIndex;
    const pts = correct ? 10 : -5;
    if (player === 0) {
      setP1SelectedOpt(optIdx); setP1Submitted(true); setP1Correct(correct); setP1Points(pts);
    } else {
      setP2SelectedOpt(optIdx); setP2Submitted(true); setP2Correct(correct); setP2Points(pts);
    }
  };

  // When both submitted, show round end
  useEffect(() => {
    if (p1Submitted && p2Submitted) {
      setScores(prev => [prev[0] + Math.max(0, p1Points), prev[1] + Math.max(0, p2Points)]);
      setTimeout(() => setPhase('round-end'), 400);
    }
  }, [p1Submitted, p2Submitted]); // eslint-disable-line

  const nextRound = () => {
    const next = round + 1;
    if (next >= ROUNDS) {
      setPhase('game-over');
    } else {
      setRound(next);
      loadRound(next);
      setPhase('playing');
    }
  };

  const moveBlock = (blocks: string[], built: string[], from: 'bank' | 'built', word: string, idx: number,
    setBlocks: (b: string[]) => void, setBuilt: (b: string[]) => void) => {
    if (from === 'bank') {
      setBlocks(blocks.filter((_, i) => i !== idx));
      setBuilt([...built, word]);
    } else {
      setBuilt(built.filter((_, i) => i !== idx));
      setBlocks([...blocks, word]);
    }
  };

  // ─── MODE SELECT ────────────────────────────────────────
  if (phase === 'mode-select') {
    return (
      <div className="container animate-fade-in" style={{ maxWidth: '800px', padding: '3rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🆚</div>
          <h1 style={{ fontWeight: 800, marginBottom: '0.75rem' }}>Grammar Duel</h1>
          <p style={{ color: 'var(--text-muted)' }}>Two players, one screen. Choose your battle mode.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { id: 'repair-race' as DuelMode, icon: '⚡', title: 'Repair Race', sub: 'Both players fix the broken sentence. First correct answer wins.', color: 'var(--primary)' },
            { id: 'whos-right' as DuelMode, icon: '🧠', title: "Who's Right?", sub: 'Both players pick the correct answer. Explanations earn bonus points.', color: 'var(--secondary)' },
            { id: 'sentence-builder' as DuelMode, icon: '🧱', title: 'Sentence Builder', sub: 'Tap word blocks in the correct order. Accuracy scores more than speed.', color: 'var(--boss-color)' },
          ].map(m => (
            <button key={m.id} onClick={() => startGame(m.id)} style={{
              padding: '1.5rem 2rem', borderRadius: '16px',
              border: '2px solid var(--card-border)', background: 'var(--card-bg)',
              cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
              display: 'flex', gap: '1.25rem', alignItems: 'center',
              transition: 'all 0.2s ease'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = m.color; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--card-border)'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
            >
              <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>{m.icon}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.25rem' }}>{m.title}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{m.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── GAME OVER ───────────────────────────────────────────
  if (phase === 'game-over') {
    const winner = scores[0] > scores[1] ? 'Player 1' : scores[1] > scores[0] ? 'Player 2' : null;
    return (
      <div className="container animate-fade-in" style={{ maxWidth: '600px', padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🏆</div>
        <h1 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>
          {winner ? `${winner} Wins!` : "It's a Draw!"}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Great duel — the grammar was the real winner.</p>
        <div className="glass" style={{ borderRadius: '20px', padding: '2rem', marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[{ label: 'Player 1 🟦', score: scores[0] }, { label: 'Player 2 🟥', score: scores[1] }].map((p, i) => (
            <div key={i}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: i === 0 ? 'var(--primary)' : 'var(--hp-color)' }}>{p.score}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{p.label}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => startGame(mode)}>Rematch</button>
          <button className="btn btn-outline" onClick={() => setPhase('mode-select')}>New Mode</button>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  // ─── ROUND END ───────────────────────────────────────────
  if (phase === 'round-end') {
    return (
      <div className="container animate-slide-up" style={{ maxWidth: '700px', padding: '2rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span style={{
            padding: '0.3rem 1rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 700,
            background: 'var(--card-bg)', border: '1px solid var(--card-border)'
          }}>Round {round + 1} of {ROUNDS}</span>
        </div>

        {/* Scores */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
          <div className="glass" style={{ borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Player 1</div>
            <div style={{ fontWeight: 800, fontSize: '1.75rem', color: 'var(--primary)' }}>{scores[0]}</div>
            <div style={{ fontSize: '0.85rem', color: p1Correct ? 'var(--success)' : 'var(--hp-color)' }}>
              {p1Correct === null ? '—' : p1Correct ? `+${p1Points}` : `${p1Points}`}
            </div>
          </div>
          <div style={{ fontWeight: 800, fontSize: '1.25rem', textAlign: 'center' }}>VS</div>
          <div className="glass" style={{ borderRadius: '16px', padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Player 2</div>
            <div style={{ fontWeight: 800, fontSize: '1.75rem', color: 'var(--hp-color)' }}>{scores[1]}</div>
            <div style={{ fontSize: '0.85rem', color: p2Correct ? 'var(--success)' : 'var(--hp-color)' }}>
              {p2Correct === null ? '—' : p2Correct ? `+${p2Points}` : `${p2Points}`}
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="explanation-panel" style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 700, color: 'var(--xp-color)', marginBottom: '0.75rem' }}>🧠 Why?</div>
          <div style={{ marginBottom: '0.5rem', fontWeight: 600 }}>✅ {currentQ.explanation.correct}</div>
          <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {currentQ.explanation.bullets.map((b, i) => (
              <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{b}</li>
            ))}
          </ul>
        </div>

        <button className="btn btn-primary" style={{ width: '100%' }} onClick={nextRound}>
          {round + 1 >= ROUNDS ? 'See Final Scores →' : 'Next Round →'}
        </button>
      </div>
    );
  }

  // ─── PLAYING ─────────────────────────────────────────────
  return (
    <div className="container animate-fade-in" style={{ maxWidth: '1000px', padding: '1.5rem 1rem 4rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h3 style={{ fontWeight: 700, fontSize: '1rem' }}>
          {mode === 'repair-race' ? '⚡ Repair Race' : mode === 'whos-right' ? "🧠 Who's Right?" : '🧱 Sentence Builder'}
        </h3>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', fontWeight: 700 }}>
          <span style={{ color: 'var(--primary)' }}>P1: {scores[0]}</span>
          <span>·</span>
          <span style={{ color: 'var(--hp-color)' }}>P2: {scores[1]}</span>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Round {round + 1}/{ROUNDS}</span>
      </div>

      {/* Question */}
      <div className="glass" style={{ borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{currentQ.prompt}</p>
        {currentQ.brokenSentence && (
          <p style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--hp-color)' }}>{currentQ.brokenSentence}</p>
        )}
        {currentQ.mode === 'whos-right' && !currentQ.brokenSentence && (
          <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Choose the correct sentence.</p>
        )}
      </div>

      {/* Split screen */}
      <div className="split-screen" style={{ gap: '1.5rem', minHeight: 'unset' }}>
        {/* Player 1 */}
        <div>
          <div style={{ fontWeight: 800, marginBottom: '1rem', color: 'var(--primary)', textAlign: 'center', fontSize: '0.95rem' }}>
            🟦 Player 1 {p1Submitted && (p1Correct ? '✅' : '❌')}
          </div>

          {/* Repair Race */}
          {mode === 'repair-race' && (
            <>
              <textarea disabled={p1Submitted} value={p1Answer} onChange={e => setP1Answer(e.target.value)}
                placeholder="Fix the sentence..." rows={3} style={{
                  width: '100%', padding: '0.9rem', borderRadius: '12px',
                  border: '2px solid var(--card-border)', background: 'var(--card-bg)',
                  color: 'var(--foreground)', fontSize: '0.95rem', fontFamily: 'inherit',
                  resize: 'none', outline: 'none', marginBottom: '0.75rem'
                }} />
              <button className="btn btn-primary" style={{ width: '100%' }} disabled={p1Submitted || !p1Answer.trim()}
                onClick={() => submitAnswer(0, p1Answer)}>
                {p1Submitted ? 'Submitted ✓' : 'Submit'}
              </button>
            </>
          )}

          {/* Who's Right */}
          {mode === 'whos-right' && currentQ.options && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentQ.options.map((opt, i) => (
                <button key={i} className={`arena-option ${p1Submitted && p1SelectedOpt === i ? (p1Correct ? 'selected-correct' : 'selected-wrong') : p1Submitted && i === currentQ.correctOptionIndex ? 'reveal-correct' : ''}`}
                  disabled={p1Submitted}
                  onClick={() => submitOption(0, i)}>
                  {opt.text}
                </button>
              ))}
            </div>
          )}

          {/* Sentence Builder */}
          {mode === 'sentence-builder' && (
            <div>
              <div style={{ minHeight: '60px', padding: '0.75rem', borderRadius: '12px', border: '2px dashed var(--card-border)', marginBottom: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignContent: 'flex-start' }}>
                {p1Built.map((w, i) => (
                  <button key={i} disabled={p1Submitted} onClick={() => moveBlock(p1Blocks, p1Built, 'built', w, i, setP1Blocks, setP1Built)}
                    style={{ padding: '0.3rem 0.7rem', borderRadius: '8px', border: '1.5px solid var(--primary)', background: 'hsla(222,89%,60%,0.1)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.9rem' }}>
                    {w}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
                {p1Blocks.map((w, i) => (
                  <button key={i} disabled={p1Submitted} onClick={() => moveBlock(p1Blocks, p1Built, 'bank', w, i, setP1Blocks, setP1Built)}
                    style={{ padding: '0.3rem 0.7rem', borderRadius: '8px', border: '1.5px solid var(--card-border)', background: 'var(--card-bg)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem' }}>
                    {w}
                  </button>
                ))}
              </div>
              <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.9rem' }}
                disabled={p1Submitted || p1Built.length === 0}
                onClick={() => submitAnswer(0, p1Built.join(' '))}>
                {p1Submitted ? 'Submitted ✓' : 'Submit Sentence'}
              </button>
            </div>
          )}
        </div>

        <div className="split-divider" />

        {/* Player 2 */}
        <div>
          <div style={{ fontWeight: 800, marginBottom: '1rem', color: 'var(--hp-color)', textAlign: 'center', fontSize: '0.95rem' }}>
            🟥 Player 2 {p2Submitted && (p2Correct ? '✅' : '❌')}
          </div>

          {mode === 'repair-race' && (
            <>
              <textarea disabled={p2Submitted} value={p2Answer} onChange={e => setP2Answer(e.target.value)}
                placeholder="Fix the sentence..." rows={3} style={{
                  width: '100%', padding: '0.9rem', borderRadius: '12px',
                  border: '2px solid var(--card-border)', background: 'var(--card-bg)',
                  color: 'var(--foreground)', fontSize: '0.95rem', fontFamily: 'inherit',
                  resize: 'none', outline: 'none', marginBottom: '0.75rem'
                }} />
              <button className="btn" style={{ width: '100%', background: 'var(--hp-color)', color: 'white', border: 'none' }}
                disabled={p2Submitted || !p2Answer.trim()}
                onClick={() => submitAnswer(1, p2Answer)}>
                {p2Submitted ? 'Submitted ✓' : 'Submit'}
              </button>
            </>
          )}

          {mode === 'whos-right' && currentQ.options && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentQ.options.map((opt, i) => (
                <button key={i} className={`arena-option ${p2Submitted && p2SelectedOpt === i ? (p2Correct ? 'selected-correct' : 'selected-wrong') : p2Submitted && i === currentQ.correctOptionIndex ? 'reveal-correct' : ''}`}
                  disabled={p2Submitted}
                  onClick={() => submitOption(1, i)}>
                  {opt.text}
                </button>
              ))}
            </div>
          )}

          {mode === 'sentence-builder' && (
            <div>
              <div style={{ minHeight: '60px', padding: '0.75rem', borderRadius: '12px', border: '2px dashed var(--card-border)', marginBottom: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignContent: 'flex-start' }}>
                {p2Built.map((w, i) => (
                  <button key={i} disabled={p2Submitted} onClick={() => moveBlock(p2Blocks, p2Built, 'built', w, i, setP2Blocks, setP2Built)}
                    style={{ padding: '0.3rem 0.7rem', borderRadius: '8px', border: '1.5px solid var(--hp-color)', background: 'hsla(0,80%,60%,0.1)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.9rem' }}>
                    {w}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
                {p2Blocks.map((w, i) => (
                  <button key={i} disabled={p2Submitted} onClick={() => moveBlock(p2Blocks, p2Built, 'bank', w, i, setP2Blocks, setP2Built)}
                    style={{ padding: '0.3rem 0.7rem', borderRadius: '8px', border: '1.5px solid var(--card-border)', background: 'var(--card-bg)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem' }}>
                    {w}
                  </button>
                ))}
              </div>
              <button className="btn" style={{ width: '100%', fontSize: '0.9rem', background: 'var(--hp-color)', color: 'white', border: 'none' }}
                disabled={p2Submitted || p2Built.length === 0}
                onClick={() => submitAnswer(1, p2Built.join(' '))}>
                {p2Submitted ? 'Submitted ✓' : 'Submit Sentence'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Waiting indicator */}
      {(p1Submitted || p2Submitted) && !(p1Submitted && p2Submitted) && (
        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          ⏳ Waiting for {p1Submitted ? 'Player 2' : 'Player 1'}…
        </div>
      )}
    </div>
  );
}
