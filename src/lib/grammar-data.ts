export interface GrammarRule {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  shortDescription: string;
  detailedContent: string;
  examples: { original: string; corrected: string; note: string }[];
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
    ]
  },
  {
    id: 'present-continuous-basic',
    title: 'Present Continuous: Actions in Progress',
    level: 'Beginner',
    category: 'Tenses',
    shortDescription: 'Describe things happening right now or around now.',
    detailedContent: `
      Used for actions happening exactly at the time of speaking or temporary situations.
      
      ### Structure
      Subject + **am/is/are** + **Verb-ing**
      
      ### Usage
      1. **Now:** "I am eating lunch."
      2. **Around now:** "I am reading a great book this week."
      3. **Future (fixed plans):** "We are meeting at 6 PM."
    `,
    examples: [
      { original: "I eat lunch now.", corrected: "I am eating lunch now.", note: "Use present continuous for actions happening at the moment of speaking." },
      { original: "They are play soccer.", corrected: "They are playing soccer.", note: "Don't forget the -ing suffix for the main verb." }
    ]
  },
  {
    id: 'passive-voice-intro',
    title: 'The Passive Voice',
    level: 'Intermediate',
    category: 'Verb Forms',
    shortDescription: 'Focus on the action or the receiver, rather than the doer.',
    detailedContent: `
      In the passive voice, the object of the active sentence becomes the subject.
      
      ### Why use it?
      1. When the doer is unknown.
      2. When the action is more important than who did it.
      
      ### Structure
      Object + **Be (conjugated)** + **Past Participle**
    `,
    examples: [
      { original: "The cake ate by me.", corrected: "The cake was eaten by me.", note: "Passive voice requires the 'to be' verb and the past participle." },
      { original: "They founded the city in 1900.", corrected: "The city was founded in 1900.", note: "The passive focus shifts importance to the city." }
    ]
  },
  {
    id: 'inversion-advanced',
    title: 'Inversion for Emphasis',
    level: 'Advanced',
    category: 'Sentence Structure',
    shortDescription: 'Use dramatic word order to emphasize negative or restrictive ideas.',
    detailedContent: `
      Inversion happens when the auxiliary verb comes before the subject, often after negative adverbs.
      
      ### Common Starters
      - Never...
      - Rarely...
      - Seldom...
      - Not only...
      
      ### Structure
      Negative Adverb + **Auxiliary Verb** + **Subject** + Verb
    `,
    examples: [
      { original: "Never I have seen such a beautiful sunset.", corrected: "Never have I seen such a beautiful sunset.", note: "When 'Never' starts a sentence, the auxiliary verb 'have' must come before the subject." },
      { original: "Rarely he goes to the gym.", corrected: "Rarely does he go to the gym.", note: "Use the auxiliary 'does' for inversion in the present simple." }
    ]
  }
];
