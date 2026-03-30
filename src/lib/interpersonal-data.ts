export interface InterpersonalScenario {
  id: string;
  title: string;
  category: 'Corporate' | 'Leadership' | 'Conflict' | 'Negotiation' | 'Networking' | 'Social';
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
  },
  {
    id: 'corp-5',
    title: 'First Day at the Office',
    category: 'Social',
    difficulty: 'Beginner',
    context: 'You just arrived at your new desk. Your manager, Sarah, walks over to introduce herself and see how you are settling in.',
    character: {
      name: 'Sarah',
      role: 'Marketing Manager',
      description: 'Friendly but busy. She appreciates clear, polite, and brief introductions.'
    },
    prompt: "Hi! You must be the new team member. I'm Sarah, the Marketing Manager. How are you settling in?",
    learningObjectives: ['Polite introductions', 'Professional small talk', 'Initial rapport building']
  },
  {
    id: 'corp-6',
    title: 'Networking at a Tech Mixer',
    category: 'Networking',
    difficulty: 'Intermediate',
    context: 'You are at a professional networking event. You see someone standing alone near the buffet. You decide to strike up a conversation.',
    character: {
      name: 'David',
      role: 'Senior Developer',
      description: 'Introverted but knowledgeable. He likes people who show genuine interest in tech trends but hates "salesy" talk.'
    },
    prompt: "I'm just here for the free pizza, really. Most of these 'innovative' talks feel like marketing fluff, don't they?",
    learningObjectives: ['Active listening', 'Bridging casual and professional talk', 'Genuine networking']
  },
  {
    id: 'corp-7',
    title: 'Giving Constructive Feedback',
    category: 'Leadership',
    difficulty: 'Intermediate',
    context: 'You are mentoring a junior developer, Leo. His recent code submission is functional but lacks unit tests and follows poor naming conventions.',
    character: {
      name: 'Leo',
      role: 'Junior Developer',
      description: 'Eager to please but sensitive to criticism. He works hard but needs guidance on quality standards.'
    },
    prompt: "I finished that feature ahead of schedule! Check it out. It's all working fine on my machine. What do you think?",
    learningObjectives: ['Balanced feedback', 'Mentorship communication', 'Quality standards enforcement']
  },
  {
    id: 'corp-8',
    title: 'Handling a Dissatisfied Client',
    category: 'Negotiation',
    difficulty: 'Advanced',
    context: 'A long-term client, Mr. Tan, is upset because a critical feature deployment was delayed by 48 hours due to an unforeseen bug.',
    character: {
      name: 'Mr. Tan',
      role: 'Key Client',
      description: 'Protective of his business and easily frustrated by technical delays. He values transparency and accountability.'
    },
    prompt: "This delay is unacceptable. We had a marketing campaign tied to this release! How are you going to fix this and compensate us for the lost time?",
    learningObjectives: ['De-escalation', 'Accountability', 'Client relationship management']
  },
  {
    id: 'corp-9',
    title: 'Explaining a Project Delay to Seniors',
    category: 'Corporate',
    difficulty: 'Advanced',
    context: 'A major infrastructure migration has hit a massive roadblock that will delay the project by two weeks. You need to inform the CTO before the news breaks.',
    character: {
      name: 'Marcus',
      role: 'CTO',
      description: 'High-level thinker who hates surprises. He wants the facts, the impact, and the plan for recovery—fast.'
    },
    prompt: "I'm heading into the board meeting. Give me a quick status on the migration. We're still on track for Monday, right?",
    learningObjectives: ['Upward communication', 'Crisis transparency', 'Problem-solving communication']
  },
  {
    id: 'corp-10',
    title: 'Conducting a Peer Interview',
    category: 'Networking',
    difficulty: 'Intermediate',
    context: 'You are interviewing a candidate, Chloe, for a lead role. You want to assess if she can handle pressure and collaborate with the team.',
    character: {
      name: 'Chloe',
      role: 'Job Candidate',
      description: 'Polished and experienced, but seems to take all the credit for her previous team\'s successes.'
    },
    prompt: "Tell me about a time you had a conflict with a team member and how YOU resolved it by yourself.",
    learningObjectives: ['Probing questions', 'Professional interviewing', 'Collaboration assessment']
  }
];
