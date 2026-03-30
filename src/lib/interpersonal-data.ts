export interface InterpersonalScenario {
  id: string;
  title: string;
  category: 'Corporate' | 'Leadership' | 'Conflict' | 'Negotiation';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  context: string;
  character: {
    name: string;
    role: string;
    description: string;
  };
  prompt: string;
  learningObjectives: string[];
}

export const interpersonalScenarios: InterpersonalScenario[] = [
  {
    id: 'corp-1',
    title: 'Negotiating a Deadline Extension',
    category: 'Corporate',
    difficulty: 'Intermediate',
    context: 'Your team lead, Alex, has just assigned you a new task with a very tight deadline. However, you are already overloaded with two other high-priority projects.',
    character: {
      name: 'Alex',
      role: 'Team Lead',
      description: 'Results-driven but fair. He values honesty about capacity but expects a solution-oriented approach.'
    },
    prompt: "I need that security report by Friday afternoon. I know it's a lot, but the client is really pushing for it. Can you make it happen?",
    learningObjectives: ['Setting boundaries', 'Managing expectations', 'Professional assertiveness']
  },
  {
    id: 'corp-2',
    title: 'Addressing Interpersonal Conflict',
    category: 'Conflict',
    difficulty: 'Advanced',
    context: 'A colleague, Jamie, has been repeatedly talking over you in meetings. You need to address this behavior without ruining your working relationship.',
    character: {
      name: 'Jamie',
      role: 'Senior Analyst',
      description: 'Extroverted and enthusiastic, but often lacks self-awareness about their communication style.'
    },
    prompt: "That was a great session! I think we really nailed the strategy for next quarter, didn't we? (Context: Jamie interrupted you twice during the meeting)",
    learningObjectives: ['Providing difficult feedback', 'Conflict resolution', 'Maintaining relationships']
  },
  {
    id: 'corp-3',
    title: 'Asking for a Performance Raise',
    category: 'Negotiation',
    difficulty: 'Advanced',
    context: 'You have consistently exceeded your KPIs for the last year and have taken on additional responsibilities. You are meeting with your Director to discuss your compensation.',
    character: {
      name: 'Ms. Henderson',
      role: 'Director of Operations',
      description: 'Very formal and data-oriented. She requires clear evidence of value before approving budget changes.'
    },
    prompt: "I've reviewed your quarterly metrics, and they look solid. Is there anything specific you wanted to discuss in our 1-on-1 today?",
    learningObjectives: ['Self-advocacy', 'Data-backed negotiation', 'Formal business communication']
  },
  {
    id: 'corp-4',
    title: 'Leading Through Change',
    category: 'Leadership',
    difficulty: 'Intermediate',
    context: 'Your company is switching to a new project management tool. Your team is frustrated because they finally got used to the old one. You need to get them on board.',
    character: {
      name: 'The Team',
      role: 'Engineering Dept',
      description: 'Stressed and resistant to new workflows that might slow them down in the short term.'
    },
    prompt: "Not another tool! Why can't we just stick with what works? This is just going to waste our time.",
    learningObjectives: ['Empathy in leadership', 'Managing resistance', 'Communicating vision']
  }
];
