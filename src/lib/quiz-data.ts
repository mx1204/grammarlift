export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  category: 'articles' | 'tenses' | 'structure' | 'punctuation' | 'vocabulary';
}

export const quizQuestions: Question[] = [
  // A1 Questions
  {
    id: 1,
    text: "I ___ a student.",
    options: ["am", "is", "are", "be"],
    correctAnswer: 0,
    level: 'A1',
    category: 'tenses'
  },
  {
    id: 2,
    text: "She has ___ apple in her bag.",
    options: ["a", "an", "the", "some"],
    correctAnswer: 1,
    level: 'A1',
    category: 'articles'
  },
  // A2 Questions
  {
    id: 10,
    text: "Where ___ you yesterday?",
    options: ["was", "were", "did", "been"],
    correctAnswer: 1,
    level: 'A2',
    category: 'tenses'
  },
  {
    id: 11,
    text: "I haven't seen him ___ last week.",
    options: ["for", "since", "until", "from"],
    correctAnswer: 1,
    level: 'A2',
    category: 'tenses'
  },
  // B1 Questions
  {
    id: 20,
    text: "If I ___ you, I would take the job.",
    options: ["am", "was", "were", "had been"],
    correctAnswer: 2,
    level: 'B1',
    category: 'structure'
  },
  {
    id: 21,
    text: "The book ___ by a famous author.",
    options: ["wrote", "was writing", "was written", "has written"],
    correctAnswer: 2,
    level: 'B1',
    category: 'structure'
  },
  // B2 Questions
  {
    id: 30,
    text: "I wish I ___ more time for my hobbies.",
    options: ["have", "had", "will have", "would have"],
    correctAnswer: 1,
    level: 'B2',
    category: 'structure'
  },
  {
    id: 31,
    text: "Hardly ___ entered the room when the phone rang.",
    options: ["I had", "had I", "I was", "did I"],
    correctAnswer: 1,
    level: 'B2',
    category: 'structure'
  },
  // C1/C2 Questions
  {
    id: 40,
    text: "It is essential that she ___ present at the meeting.",
    options: ["is", "was", "be", "were"],
    correctAnswer: 2,
    level: 'C1',
    category: 'structure'
  },
  {
    id: 41,
    text: "Were it not for his help, we ___ the deadline.",
    options: ["missed", "would miss", "would have missed", "had missed"],
    correctAnswer: 2,
    level: 'C2',
    category: 'structure'
  }
];

export const getResultLevel = (score: number, total: number): 'Beginner' | 'Intermediate' | 'Advanced' => {
  const percentage = (score / total) * 100;
  if (percentage < 40) return 'Beginner';
  if (percentage < 75) return 'Intermediate';
  return 'Advanced';
};
