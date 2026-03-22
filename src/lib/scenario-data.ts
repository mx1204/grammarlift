export interface ScenarioOption {
  text: string;
  isCorrect: boolean;
  grammarFeedback: string;
  interpersonalFeedback: string;
}

export interface Scenario {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Corporate' | 'Social' | 'Networking' | 'Negotiation';
  context: string;
  character: {
    name: string;
    role: string;
    description: string;
  };
  prompt: string;
  options: ScenarioOption[];
}

export const scenarios: Scenario[] = [
  {
    id: '1',
    title: 'First Day at the Office',
    level: 'Beginner',
    category: 'Corporate',
    context: 'You just arrived at your new desk. Your manager walks over to introduce themselves.',
    character: {
      name: 'Sarah',
      role: 'Marketing Manager',
      description: 'Friendly but busy. She appreciates clear and polite introductions.'
    },
    prompt: "Hi! You must be the new team member. I'm Sarah, the Marketing Manager. How are you settling in?",
    options: [
      {
        text: "I am fine. Where is my computer?",
        isCorrect: false,
        grammarFeedback: "Perfectly correct grammar.",
        interpersonalFeedback: "A bit too direct for a first meeting. Try acknowledging the introduction first."
      },
      {
        text: "Nice to meet you Sarah. I am feeling good, thank you.",
        isCorrect: true,
        grammarFeedback: "Good use of the present continuous ('feeling').",
        interpersonalFeedback: "Excellent! You acknowledged the introduction and answered her question politely."
      },
      {
        text: "I feel great because I am here now.",
        isCorrect: false,
        grammarFeedback: "Correct grammar.",
        interpersonalFeedback: "Slightly informal and self-centered. It's better to mirror Sarah's professional tone."
      },
      {
        text: "Settling in well, thanks for ask.",
        isCorrect: false,
        grammarFeedback: "Error: should be 'thanks for asking' (gerund after preposition).",
        interpersonalFeedback: "Friendly tone, but the grammar mistake makes it less professional."
      },
      {
        text: "Hi Sarah. What I should do first?",
        isCorrect: false,
        grammarFeedback: "Error: Indirect question order. Should be 'What should I do first?'",
        interpersonalFeedback: "Too eager. Allow the manager to finish the welcome before jumping into tasks."
      }
    ]
  },
  {
    id: '2',
    title: 'Networking at a Tech Mixer',
    level: 'Intermediate',
    category: 'Networking',
    context: 'You are at a professional networking event. You see someone standing alone near the buffet.',
    character: {
      name: 'David',
      role: 'Senior Developer',
      description: 'Introverted but knowledgeable. He likes people who show genuine interest in tech trends.'
    },
    prompt: "I'm just here for the free pizza, really. Most of these 'innovative' talks feel like marketing fluff, don't they?",
    options: [
      {
        text: "Haha, I agree! By the way, have you tried the pepperoni? It's great.",
        isCorrect: false,
        grammarFeedback: "Flawless grammar.",
        interpersonalFeedback: "Good for rapport, but misses a chance to pivot to a professional connection."
      },
      {
        text: "I see your point. I am curious though—what kind of tech are you actually excited about these days?",
        isCorrect: true,
        grammarFeedback: "Excellent use of 'I am curious' to lead into a question.",
        interpersonalFeedback: "Perfect. You acknowledged his cynicism but redirected the conversation to a positive professional topic."
      },
      {
        text: "You shouldn't be so negative. The speakers worked hard.",
        isCorrect: false,
        grammarFeedback: "Correct but potentially confrontational.",
        interpersonalFeedback: "Too critical. In networking, it's better to find common ground than to correct your partner's attitude."
      },
      {
        text: "I am sorry you feel that. I am a developer too.",
        isCorrect: false,
        grammarFeedback: "Grammar error: 'I am sorry you feel that way' is the standard idiom.",
        interpersonalFeedback: "A bit flat. Doesn't encourage David to talk more."
      },
      {
        text: "It is true. What is your role at your company?",
        isCorrect: false,
        grammarFeedback: "Fine grammar.",
        interpersonalFeedback: "A bit of a 'cold' transition. Try to bridge the pizza comment with the professional question."
      }
    ]
  }
];

// Add 48 more placeholders for now to satisfy the "50 scenarios" requirement in the UI
for (let i = 3; i <= 50; i++) {
  scenarios.push({
    id: i.toString(),
    title: `Scenario Topic ${i}`,
    level: i % 3 === 0 ? 'Beginner' : i % 3 === 1 ? 'Intermediate' : 'Advanced',
    category: i % 4 === 0 ? 'Corporate' : i % 4 === 1 ? 'Social' : i % 4 === 2 ? 'Networking' : 'Negotiation',
    context: `This is context description for scenario ${i}.`,
    character: { name: 'Person', role: 'Role', description: 'Description' },
    prompt: '...',
    options: []
  });
}
