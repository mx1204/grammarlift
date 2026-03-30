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

// All scenarios have been migrated to src/lib/interpersonal-data.ts for AI interactive mode
export const scenarios: Scenario[] = [];
