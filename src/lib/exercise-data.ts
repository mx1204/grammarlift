export interface Exercise {
  id: number;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: ExerciseQuestion[];
}

export interface ExerciseQuestion {
  type: 'mcq' | 'fill-blank' | 'correction' | 'rewriting';
  text: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  example: string;
}

export const exercises: Record<number, Exercise> = {
  101: {
    id: 101,
    title: 'Zero & First Conditional',
    level: 'Intermediate',
    questions: [
      {
        type: 'mcq',
        text: "If you ___ ice, it melts.",
        options: ["heat", "will heat", "heated", "heating"],
        correctAnswer: 0,
        explanation: "The zero conditional is used for general truths or scientific facts. It uses the present simple in both clauses.",
        example: "If you drop an object, it falls."
      },
      {
        type: 'fill-blank',
        text: "If it rains tomorrow, we ___ (stay) at home.",
        correctAnswer: "will stay",
        explanation: "The first conditional is used for real or possible situations in the future. It uses the present simple in the 'if' clause and 'will' in the main clause.",
        example: "If I find her number, I will call her."
      },
      {
        type: 'correction',
        text: "If I will see him, I'll tell him the news.",
        correctAnswer: "If I see him, I'll tell him the news.",
        explanation: "In the first conditional, we use the present simple in the 'if' clause, not 'will'.",
        example: "If he comes, we'll go together."
      }
    ]
  },
  102: {
    id: 102,
    title: 'Present Perfect vs. Past Simple',
    level: 'Intermediate',
    questions: [
      {
        type: 'mcq',
        text: "I ___ to Italy three times.",
        options: ["went", "have been", "was going", "gone"],
        correctAnswer: 1,
        explanation: "Use Present Perfect ('have been') for experiences at an unspecified time in the past.",
        example: "She has visited many countries."
      },
      {
        type: 'fill-blank',
        text: "I ___ (see) that movie yesterday.",
        correctAnswer: "saw",
        explanation: "Use Past Simple ('saw') for actions completed at a specific time in the past (yesterday).",
        example: "They left two hours ago."
      }
    ]
  },
  103: {
    id: 103,
    title: 'Modal Verbs: Obligation',
    level: 'Intermediate',
    questions: [
      {
        type: 'mcq',
        text: "You ___ park here. It's an entrance.",
        options: ["mustn't", "don't have to", "should", "can"],
        correctAnswer: 0,
        explanation: "'Mustn't' is used for things that are prohibited or against the rules.",
        example: "You mustn't smoke in the office."
      },
      {
        type: 'fill-blank',
        text: "I ___ (have to) work late tonight because of the deadline.",
        correctAnswer: "have to",
        explanation: "'Have to' expresses an external obligation or necessity.",
        example: "She has to wear glasses for reading."
      }
    ]
  },
  104: {
    id: 104,
    title: 'Relative Clauses',
    level: 'Intermediate',
    questions: [
      {
        type: 'mcq',
        text: "The person ___ called you is my boss.",
        options: ["which", "who", "whose", "whom"],
        correctAnswer: 1,
        explanation: "Use 'who' for people as the subject of the relative clause.",
        example: "The man who lives next door is nice."
      },
      {
        type: 'correction',
        text: "This is the car who I want to buy.",
        correctAnswer: "This is the car that I want to buy.",
        explanation: "Use 'that' or 'which' for things, not 'who'.",
        example: "The house which was built last year is beautiful."
      }
    ]
  },
  105: {
    id: 105,
    title: 'Passive Voice Practice',
    level: 'Intermediate',
    questions: [
      {
        type: 'fill-blank',
        text: "The letter ___ (post) by my secretary this morning.",
        correctAnswer: "was posted",
        explanation: "Past Simple Passive: was/were + past participle.",
        example: "The window was broken by a ball."
      },
      {
        type: 'mcq',
        text: "Paper ___ from wood.",
        options: ["is made", "makes", "is making", "has made"],
        correctAnswer: 0,
        explanation: "Present Simple Passive for general facts.",
        example: "Wine is made from grapes."
      }
    ]
  },
  106: {
    id: 106,
    title: 'Reported Speech Statements',
    level: 'Advanced',
    questions: [
      {
        type: 'correction',
        text: 'He said: "I am happy." -> He said that he is happy.',
        correctAnswer: "He said that he was happy.",
        explanation: "When reporting speech in the past, move the tense one step back (am -> was).",
        example: 'She said she would call me.'
      }
    ]
  }
};
