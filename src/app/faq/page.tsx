import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Grammar Lift by Max',
  description: 'Frequently asked questions about Grammar Lift by Max, including the free placement test, writing mode, and grammar library.',
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
          text: 'Grammar Lift by Max is a free English grammar platform. It offers a 5-minute CEFR placement test to identify your level (A1-C2), a free writing mode where you can paste text and receive grammar corrections with simple explanations, and a library of grammar rules organized by level.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Grammar Lift by Max free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all core features are completely free, including the placement test, writing corrections, and grammar library. There is no paywall or subscription required.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the placement test work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 5-minute adaptive quiz asks a series of questions and places you into one of three CEFR levels: A1-A2 (beginner), B1-B2 (intermediate), or C1-C2 (advanced). The platform then recommends exercises based on your level.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the free writing mode?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can paste any text into the free writing tool, and it will provide instant grammar corrections with plain-English explanations. The feedback is level-aware, meaning it matches your proficiency level.',
        },
      },
      {
        '@type': 'Question',
        name: 'What grammar topics are covered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The platform covers beginner topics like articles and present simple, intermediate topics like conditionals and passive voice, and advanced topics like mixed conditionals and subjunctive mood.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is Grammar Lift by Max different from Grammarly?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Grammar Lift by Max focuses on structured grammar learning, placement testing, and free writing corrections with explanations. Grammarly is a broader writing assistant for tone and style across many platforms.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to create an account?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No account is required to use the placement test, grammar library, or free writing mode.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this suitable for IELTS preparation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The platform focuses on foundational to advanced grammar (A1-C2). While it helps with grammar for IELTS, it does not yet offer IELTS-specific practice materials.',
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
      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        <div className="space-y-8">
          {faqSchema.mainEntity.map((item, idx) => (
            <div key={idx} className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-3">{item.name}</h2>
              <p className="text-gray-700">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
