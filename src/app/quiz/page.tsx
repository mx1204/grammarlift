'use client';

import React, { useState } from 'react';
import { quizQuestions, getResultLevel } from '@/lib/quiz-data';
import AppButton from '@/components/AppButton';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const level = isFinished ? getResultLevel(score, quizQuestions.length) : null;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;

  const handleNext = () => {
    if (selectedOption === null) return;

    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="container animate-fade-in" style={{ maxWidth: '600px', marginTop: 'var(--section-py)' }}>
        <GlassCard style={{ textAlign: 'center', padding: 'var(--card-p)' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🎉</div>
          <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: '1rem' }}>Quiz Complete!</h2>
          <p style={{ fontSize: 'var(--fs-body)', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Your calculated level is:
          </p>
          <div className="text-grad" style={{ fontSize: 'var(--fs-h1)', fontWeight: 800, marginBottom: '2rem' }}>
            {level}
          </div>
          <p style={{ marginBottom: '3rem', color: 'var(--text-muted)' }}>
            You scored {score} out of {quizQuestions.length}. Based on your performance, we&apos;ve unlocked the <b>{level} curriculum</b> for you.
          </p>
          <Link href="/learn">
            <AppButton size="lg" style={{ width: '100%' }}>Explore the Library</AppButton>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ maxWidth: '800px', marginTop: '2rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          <span>Placement Quiz</span>
          <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
        </div>
        <div style={{ height: '8px', background: 'var(--card-border)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ 
            height: '100%', 
            width: `${progress}%`, 
            background: 'var(--primary)', 
            transition: 'width 0.3s ease' 
          }} />
        </div>
      </div>

      <GlassCard style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'var(--card-p)' }}>
        <h2 style={{ fontSize: 'var(--fs-h3)', marginBottom: '2.5rem' }}>{currentQuestion.text}</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              style={{
                padding: '1rem 1.25rem',
                borderRadius: '16px',
                border: `2px solid ${selectedOption === index ? 'var(--primary)' : 'var(--card-border)'}`,
                background: selectedOption === index ? 'var(--primary-light)' : 'transparent',
                color: selectedOption === index ? 'var(--primary-dark)' : 'inherit',
                textAlign: 'left',
                fontSize: 'var(--fs-body)',
                fontWeight: selectedOption === index ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ 
                marginRight: '1rem', 
                opacity: 0.5,
                fontWeight: 700 
              }}>
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <AppButton 
            onClick={handleNext} 
            disabled={selectedOption === null}
            style={{ opacity: selectedOption === null ? 0.5 : 1 }}
          >
            {currentQuestionIndex === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </AppButton>
        </div>
      </GlassCard>
    </div>
  );
}
