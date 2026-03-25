import { Metadata } from 'next';
import GlassCard from '@/components/GlassCard';

export const metadata: Metadata = {
  title: 'FAQ - Grammar Lift by Max',
  description: 'Frequently asked questions about Grammar Lift by Max, including the free placement test, grammar lessons, exercises, and games.',
};

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Grammar Lift by Max?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Grammar Lift by Max is a free English grammar platform. It offers a 5-minute CEFR placement test to identify your level (A1-C2), a library of grammar lessons organized by level, interactive exercises to practice each topic, and fun games to reinforce your skills.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Grammar Lift by Max free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all features are completely free: the placement test, grammar lessons, exercises, and games. There is no paywall or subscription required.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the placement test work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 5-minute adaptive quiz asks a series of questions and places you into one of three CEFR levels: A1-A2 (beginner), B1-B2 (intermediate), or C1-C2 (advanced). The platform then recommends lessons and exercises based on your level.',
        },
      },
      {
        '@type': 'Question',
        name: 'What grammar topics are covered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The platform covers beginner topics like articles and present simple, intermediate topics like conditionals and passive voice, and advanced topics like mixed conditionals and subjunctive mood. Each topic includes lessons, exercises, and games.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is Grammar Lift by Max different from Grammarly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Grammar Lift by Max focuses on structured grammar learning with levels, interactive exercises, and games. Grammarly is a broader writing assistant for tone and style. Grammar Lift helps you learn grammar systematically, while Grammarly helps you polish writing in real time.',
        },
      },
      {
        '@type': 'Question',
        name: 'What kinds of games are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The platform includes interactive grammar games that let you practice topics like verb tenses, articles, and sentence structure in a fun, engaging way. Games are designed to reinforce what you learn in the lessons and exercises.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to create an account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No account is required to use the placement test, grammar lessons, exercises, or games. Everything is accessible immediately without signing up.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this suitable for IELTS preparation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The platform focuses on foundational to advanced grammar (A1-C2). While it helps with grammar for IELTS, it does not yet offer IELTS-specific practice materials. It is ideal for building the grammar skills needed for the exam.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container animate-fade-in">
        {/* Hero Section - Simplified */}
        <section className="section-padding" style={{ textAlign: 'center' }}>
          <h1 style={{ fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Frequently Asked <span className="text-grad">Questions</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
            Everything you need to know about Grammar Lift by Max
          </p>
        </section>

        {/* FAQ Grid - Using same style as "Curriculum Focused on You" section */}
        <section className="section-padding glass" style={{ borderRadius: '32px', padding: 'clamp(2rem, 5vw, 4rem)' }}>
          <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {faqSchema.mainEntity.map((item, idx) => (
              <div key={idx} style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 600, color: 'var(--primary)' }}>
                  {item.name}
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
