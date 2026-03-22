'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { exercises } from '@/lib/exercise-data';
import AppButton from '@/components/AppButton';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';

export default function ExercisePage() {
  const params = useParams();
  const exerciseId = parseInt(params.id as string);
  const exercise = exercises[exerciseId];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [selectedMcq, setSelectedMcq] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!exercise) return <div className="container">Exercise not found.</div>;

  const currentQuestion = exercise.questions[currentIndex];

  const handleCheck = () => {
    let correct = false;
    if (currentQuestion.type === 'mcq') {
      correct = selectedMcq === currentQuestion.correctAnswer;
    } else {
      correct = userAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toString().toLowerCase();
    }

    setIsCorrect(correct);
    if (correct) setSessionScore(sessionScore + 1);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentIndex < exercise.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setSelectedMcq(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="container animate-fade-in" style={{ maxWidth: '600px', marginTop: '4rem' }}>
        <GlassCard style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎯</div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Great Session!</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Exercise: {exercise.title}
          </p>
          <div className="text-grad" style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem' }}>
            {sessionScore}/{exercise.questions.length}
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/learn" style={{ flex: 1 }}>
              <AppButton variant="outline" style={{ width: '100%' }}>Back to Library</AppButton>
            </Link>
            <AppButton onClick={() => window.location.reload()} style={{ flex: 1 }}>Practice Again</AppButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '800px', marginTop: '2rem' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/learn" style={{ color: 'var(--text-muted)', fontWeight: 500 }}>← Back to Library</Link>
        <span style={{ fontWeight: 600 }}>{exercise.title}</span>
        <span style={{ color: 'var(--text-muted)' }}>{currentIndex + 1} / {exercise.questions.length}</span>
      </div>

      <GlassCard style={{ minHeight: '400px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ 
            padding: '4px 12px', 
            borderRadius: '20px', 
            background: 'var(--primary-light)', 
            color: 'var(--primary)', 
            fontSize: '0.8rem', 
            fontWeight: 700,
            textTransform: 'uppercase'
          }}>
            {currentQuestion.type.replace('-', ' ')}
          </span>
          <h2 style={{ fontSize: '1.8rem', marginTop: '1rem' }}>{currentQuestion.text}</h2>
        </div>

        {/* Input Area */}
        <div style={{ marginBottom: '3rem' }}>
          {currentQuestion.type === 'mcq' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentQuestion.options?.map((opt, i) => (
                <button
                  key={i}
                  disabled={showFeedback}
                  onClick={() => setSelectedMcq(i)}
                  style={{
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    border: `2px solid ${selectedMcq === i ? 'var(--primary)' : 'var(--card-border)'}`,
                    background: selectedMcq === i ? 'var(--primary-light)' : 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    opacity: showFeedback && selectedMcq !== i ? 0.5 : 1
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              placeholder="Type your answer here..."
              disabled={showFeedback}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              style={{
                width: '100%',
                padding: '1.25rem',
                borderRadius: '16px',
                border: '2px solid var(--card-border)',
                background: 'transparent',
                fontSize: '1.1rem',
                fontFamily: 'inherit',
                outline: 'none',
                color: 'inherit'
              }}
            />
          )}
        </div>

        {/* Feedback Section */}
        {showFeedback && (
          <div className="animate-fade-in" style={{ 
            padding: '1.5rem', 
            borderRadius: '16px', 
            background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${isCorrect ? 'var(--success)' : 'var(--error)'}`,
            marginBottom: '2rem'
          }}>
            <h4 style={{ color: isCorrect ? 'var(--success)' : 'var(--error)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isCorrect ? '✓ Correct!' : '✗ Not quite right'}
            </h4>
            <p style={{ marginBottom: '1rem', fontWeight: 500 }}>{currentQuestion.explanation}</p>
            <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.9rem' }}>
              <span style={{ opacity: 0.6, fontWeight: 700 }}>EXAMPLE:</span> {currentQuestion.example}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {!showFeedback ? (
            <AppButton 
              onClick={handleCheck} 
              disabled={currentQuestion.type === 'mcq' ? selectedMcq === null : userAnswer.trim() === ''}
            >
              Check Answer
            </AppButton>
          ) : (
            <AppButton onClick={handleNext}>
              {currentIndex === exercise.questions.length - 1 ? 'Finish' : 'Next Question'}
            </AppButton>
          )}
        </div>
      </GlassCard>
    </div>
  );
}
