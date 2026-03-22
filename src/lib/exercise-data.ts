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
  }
};
