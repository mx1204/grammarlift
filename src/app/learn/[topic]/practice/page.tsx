'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { grammarRules } from '@/lib/grammar-data';
import GlassCard from '@/components/GlassCard';
import AppButton from '@/components/AppButton';
import Link from 'next/link';

export default function PracticePage() {
  const params = useParams();
  const router = useRouter();
  const topicId = params.topic as string;
  const rule = grammarRules.find(r => r.id === topicId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!rule || !rule.practiceQuestions || rule.practiceQuestions.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h2>No practice questions available for this topic.</h2>
        <Link href={`/learn/${topicId}`}>Back to lesson</Link>
      </div>
    );
  }

  const currentQuestion = rule.practiceQuestions[currentQuestionIndex];
  const isFinished = currentQuestionIndex >= rule.practiceQuestions.length;

  const handleOptionSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedOptionIndex(index);
  };

  const handleSubmit = () => {
    if (selectedOptionIndex === null) return;
    setIsSubmitted(true);
    if (currentQuestion.options[selectedOptionIndex].isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < rule.practiceQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null);
      setIsSubmitted(false);
    } else {
      setCurrentQuestionIndex(rule.practiceQuestions.length); // Mark as finished
    }
  };

  if (isFinished) {
    return (
      <div className="container animate-fade-in" style={{ maxWidth: '600px', textAlign: 'center', marginTop: '5rem' }}>
        <GlassCard style={{ padding: '3rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎉</div>
          <h2 style={{ marginBottom: '1rem' }}>Practice Complete!</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            You scored {score} out of {rule.practiceQuestions.length} on {rule.title}.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <AppButton onClick={() => router.push('/learn')}>Back to Library</AppButton>
            <AppButton variant="outline" onClick={() => {
              setCurrentQuestionIndex(0);
              setScore(0);
              setSelectedOptionIndex(null);
              setIsSubmitted(false);
            }}>Try Again</AppButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '800px', marginTop: '2rem', paddingBottom: '4rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link href={`/learn/${topicId}`} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Back to Lesson
          </Link>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.5rem' }}>Practice Path</h1>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Question {currentQuestionIndex + 1} of {rule.practiceQuestions.length}
          </span>
          <div style={{ width: '150px', height: '6px', background: 'var(--card-border)', borderRadius: '3px', marginTop: '0.5rem', overflow: 'hidden' }}>
            <div style={{ width: `${((currentQuestionIndex + 1) / rule.practiceQuestions.length) * 100}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s ease' }} />
          </div>
        </div>
      </header>

      <GlassCard style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.4rem', lineHeight: 1.5, marginBottom: '2rem' }}>
          {currentQuestion.question}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {currentQuestion.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionSelect(i)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                background: selectedOptionIndex === i ? 'rgba(var(--primary-h), var(--primary-s), var(--primary-l), 0.1)' : 'var(--card-bg)',
                border: `2px solid ${
                  isSubmitted 
                    ? (opt.isCorrect ? 'var(--success)' : (selectedOptionIndex === i ? 'var(--error)' : 'var(--card-border)'))
                    : (selectedOptionIndex === i ? 'var(--primary)' : 'var(--card-border)')
                }`,
                color: 'inherit',
                fontFamily: 'inherit',
                fontSize: '1rem',
                cursor: isSubmitted ? 'default' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                opacity: isSubmitted && selectedOptionIndex !== i && !opt.isCorrect ? 0.6 : 1
              }}
            >
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                border: `2px solid ${selectedOptionIndex === i ? 'var(--primary)' : 'var(--text-muted)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                background: selectedOptionIndex === i ? 'var(--primary)' : 'transparent',
                color: selectedOptionIndex === i ? 'white' : 'inherit'
              }}>
                {String.fromCharCode(65 + i)}
              </div>
              {opt.text}
            </button>
          ))}
        </div>
      </GlassCard>

      {isSubmitted && (
        <div className="animate-fade-in" style={{ marginBottom: '2rem' }}>
          <GlassCard style={{ 
            borderLeft: `6px solid ${currentQuestion.options[selectedOptionIndex!].isCorrect ? 'var(--success)' : 'var(--error)'}`,
            padding: '2rem'
          }}>
            <h4 style={{ 
              color: currentQuestion.options[selectedOptionIndex!].isCorrect ? 'var(--success)' : 'var(--error)', 
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              {currentQuestion.options[selectedOptionIndex!].isCorrect ? '✓ Correct!' : '✗ Not quite right'}
            </h4>
            <div style={{ lineHeight: 1.6, color: 'var(--foreground)' }}>
              <span style={{ fontWeight: 700, marginRight: '0.5rem' }}>EXPLANATION:</span>
              {currentQuestion.options[selectedOptionIndex!].explanation}
            </div>
            
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <AppButton onClick={handleNext}>
                {currentQuestionIndex + 1 < rule.practiceQuestions.length ? 'Next Question' : 'Seal the Results'}
              </AppButton>
            </div>
          </GlassCard>
        </div>
      )}

      {!isSubmitted && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <AppButton 
            size="lg" 
            disabled={selectedOptionIndex === null} 
            onClick={handleSubmit}
          >
            Confirm Answer
          </AppButton>
        </div>
      )}
    </div>
  );
}
