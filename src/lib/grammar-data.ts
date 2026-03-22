export interface PracticeQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface GrammarRule {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  shortDescription: string;
  detailedContent: string;
  examples: { original: string; corrected: string; note: string }[];
  practiceQuestions: PracticeQuestion[];
}

export const grammarRules: GrammarRule[] = [
  {
    id: 'articles-basic',
    title: 'Articles: A, An, The',
    level: 'Beginner',
    category: 'Determiners',
    shortDescription: 'Learn when to use definite and indefinite articles.',
    detailedContent: `
      Articles are words that define a noun as specific or unspecific.
      
      ### Indefinite Articles (A, An)
      Use "a" or "an" when referring to a non-specific item. 
      - Use **"a"** before words starting with a consonant sound.
      - Use **"an"** before words starting with a vowel sound.
      
      ### Definite Article (The)
      Use **"the"** when referring to a specific item that both the speaker and listener know.
    `,
    examples: [
      { original: "I saw a dog.", corrected: "I saw the dog.", note: "Use 'the' if you are referring to a specific dog we've already mentioned." },
      { original: "He is an doctor.", corrected: "He is a doctor.", note: "Doctor starts with a consonant sound, so use 'a'." }
    ],
    practiceQuestions: [
      {
        id: 'q1',
        question: "Could you pass me ___ water bottle on the table?",
        options: [
          { text: "a", isCorrect: false, explanation: "We use 'a' for non-specific items. Here, the bottle is specific because it's 'on the table'." },
          { text: "the", isCorrect: true, explanation: "Correct! The bottle is specific (it's the one on the table)." },
          { text: "an", isCorrect: false, explanation: " 'An' is used before vowel sounds. 'Water' starts with a consonant sound." }
        ]
      },
      {
        id: 'q2',
        question: "I have ___ idea for our project.",
        options: [
          { text: "a", isCorrect: false, explanation: "'Idea' starts with a vowel sound (i), so we must use 'an'." },
          { text: "an", isCorrect: true, explanation: "Correct! 'An' precedes words starting with vowel sounds." },
          { text: "the", isCorrect: false, explanation: "While 'the' is grammatically possible if we've mentioned the idea before, 'an' is usually the first choice for a new thought." }
        ]
      }
    ]
  },
  {
    id: 'prefixes-101',
    title: 'Common Prefixes: Un-, Re-, Pre-',
    level: 'Beginner',
    category: 'Vocabulary',
    shortDescription: 'Understand how prefixes change the meaning of base words.',
    detailedContent: `
      A prefix is a group of letters added to the beginning of a word to change its meaning.
      
      ### Common Prefixes
      1. **Un-**: Means "not" or "opposite of" (e.g., unhappy, unfriendly).
      2. **Re-**: Means "again" or "back" (e.g., redo, rewrite).
      3. **Pre-**: Means "before" (e.g., preview, preheat).
    `,
    examples: [
      { original: "I need to write this.", corrected: "I need to rewrite this.", note: "Adding 're-' implies you are doing it again." },
      { original: "He is not happy.", corrected: "He is unhappy.", note: "'Un-' is a common prefix for creating opposites." }
    ],
    practiceQuestions: [
      {
        id: 'p1',
        question: "Which prefix identifies doing something 'again'?",
        options: [
          { text: "Un-", isCorrect: false, explanation: "'Un-' means not or opposite (unhappy)." },
          { text: "Pre-", isCorrect: false, explanation: "'Pre-' means before (preview)." },
          { text: "Re-", isCorrect: true, explanation: "Correct! 'Re-' means to do something again (redo, recycle)." }
        ]
      }
    ]
  },
  {
    id: 'suffixes-common',
    title: 'Essential Suffixes: -ly, -ness, -ful',
    level: 'Intermediate',
    category: 'Vocabulary',
    shortDescription: 'Learn how suffixes change word classes and add meaning.',
    detailedContent: `
      Suffixes are added to the end of words to change their grammatical function or meaning.
      
      ### Common Suffixes
      1. **-ly**: Often creates adverbs from adjectives (e.g., quick → quickly).
      2. **-ness**: Often creates nouns from adjectives (e.g., happy → happiness).
      3. **-ful**: Means "full of" or "having" (e.g., careful, beautiful).
    `,
    examples: [
      { original: "She ran quick.", corrected: "She ran quickly.", note: "Use the -ly suffix to turn the adjective 'quick' into an adverb describing the verb 'ran'." },
      { original: "His happy is obvious.", corrected: "His happiness is obvious.", note: "Use -ness to turn an adjective into a noun." }
    ],
    practiceQuestions: [
      {
        id: 's1',
        question: "Choose the correct word: 'The sunset was absolutely ___.'",
        options: [
          { text: "beauty", isCorrect: false, explanation: "'Beauty' is a noun. We need an adjective to describe the sunset." },
          { text: "beautiful", isCorrect: true, explanation: "Correct! '-ful' creates an adjective meaning 'full of beauty'." },
          { text: "beautily", isCorrect: false, explanation: "This is not a standard English word." }
        ]
      }
    ]
  },
  {
    id: 'punctuation-marks',
    title: 'Punctuation: Commas and Semicolons',
    level: 'Intermediate',
    category: 'Writing',
    shortDescription: 'Master the subtle art of pauses and connections.',
    detailedContent: `
      Punctuation helps the reader understand the structure of your sentences.
      
      ### The Comma (,)
      Use for short pauses, listing items, or separating clauses with a conjunction.
      
      ### The Semicolon (;)
      Use to connect two independent clauses that are closely related without using a conjunction.
    `,
    examples: [
      { original: "I like coffee I like tea.", corrected: "I like coffee; I like tea.", note: "Use a semicolon or period to separate two complete thoughts." },
      { original: "He arrived, then he left.", corrected: "He arrived; then he left.", note: "A comma shouldn't separate two full sentences unless followed by 'and', 'but', etc." }
    ],
    practiceQuestions: [
      {
        id: 'pun1',
        question: "Where should the semicolon go? 'It rained all day ___ we stayed indoors.'",
        options: [
          { text: "day;", isCorrect: true, explanation: "Correct! Both sides are independent clauses." },
          { text: "rained;", isCorrect: false, explanation: "A semicolon cannot split a subject and its verb like this." },
          { text: "indoors;", isCorrect: false, explanation: "A semicolon is usually in the middle to join clauses, not at the end of a sentence." }
        ]
      }
    ]
  },
  {
    id: 'conditionals-zero-first',
    title: 'Zero and First Conditionals',
    level: 'Intermediate',
    category: 'Tenses',
    shortDescription: 'Master the rules for real and possible situations.',
    detailedContent: `
      Conditionals describe the result of a certain condition.
      
      ### Zero Conditional
      Used for general truths and scientific facts.
      *Structure:* If + Present Simple, ... Present Simple.
      
      ### First Conditional
      Used for real possibilities in the future.
      *Structure:* If + Present Simple, ... Will + Base Verb.
    `,
    examples: [
      { original: "If you heat ice, it will melt.", corrected: "If you heat ice, it melts.", note: "Zero conditional for scientific facts uses present simple in both clauses." },
      { original: "If it rains, I stay home.", corrected: "If it rains, I will stay home.", note: "First conditional for future possibilities uses 'will'." }
    ],
    practiceQuestions: [
      {
        id: 'c1',
        question: "If I ___ time tomorrow, I will help you.",
        options: [
          { text: "have", isCorrect: true, explanation: "Correct! The 'if' clause of a first conditional uses the present simple." },
          { text: "will have", isCorrect: false, explanation: "Avoid using 'will' in the 'if' clause." },
          { text: "am having", isCorrect: false, explanation: "Present continuous is for actions in progress, not conditional possibilities." }
        ]
      }
    ]
  }
];
