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
    ]
  },
  {
    id: 'present-tenses',
    title: 'Present Tenses: Simple vs. Continuous',
    level: 'Beginner',
    category: 'Tenses',
    shortDescription: 'Learn to talk about routines and ongoing actions.',
    detailedContent: `
      ### Present Simple
      Used for habits, general truths, and regular actions.
      *Example:* I drink coffee every morning.
      
      ### Present Continuous
      Used for actions happening right now or around this time.
      *Example:* I am drinking coffee right now.
    `,
    examples: [
      { original: "She is walk to work.", corrected: "She walks to work.", note: "Use present simple for routines." },
      { original: "I look for my keys now.", corrected: "I am looking for my keys now.", note: "Use present continuous for current actions." }
    ],
    practiceQuestions: [
      {
        id: 'pres-1',
        question: "Every Tuesday, I ___ to the gym.",
        options: [
          { text: "go", isCorrect: true, explanation: "Correct! 'Every Tuesday' implies a habit or routine, which requires the Present Simple." },
          { text: "am going", isCorrect: false, explanation: "Present Continuous is for what's happening *now*, not for regular habits." },
          { text: "goes", isCorrect: false, explanation: "The subject 'I' takes 'go'. 'Goes' is for third-person singular (He/She/It)." }
        ]
      },
      {
        id: 'pres-2',
        question: "Look! It ___ outside.",
        options: [
          { text: "snows", isCorrect: false, explanation: "Present Simple is for facts/habits. 'Look!' indicates it's happening right now." },
          { text: "is snowing", isCorrect: true, explanation: "Correct! We use Present Continuous for actions happening at the moment of speaking." },
          { text: "is snow", isCorrect: false, explanation: "This is grammatically incorrect. You need the '-ing' form after 'is'." }
        ]
      },
      {
        id: 'pres-3',
        question: "Water ___ at 100 degrees Celsius.",
        options: [
          { text: "is boiling", isCorrect: false, explanation: "This would mean it's boiling right now, but we are stating a general scientific fact." },
          { text: "boils", isCorrect: true, explanation: "Correct! Use Present Simple for general truths and scientific facts." },
          { text: "boil", isCorrect: false, explanation: "'Water' is treated as an uncountable/singular noun, so it needs 'boils'." }
        ]
      },
      {
        id: 'pres-4',
        question: "What ___ you doing right now?",
        options: [
          { text: "are", isCorrect: true, explanation: "Correct! Use 'are' with 'you' in the Present Continuous." },
          { text: "do", isCorrect: false, explanation: " 'Do' is used for Present Simple questions (e.g., 'What do you do?')." },
          { text: "is", isCorrect: false, explanation: "'Is' is for singular third-person subjects (He/She/It)." }
        ]
      },
      {
        id: 'pres-5',
        question: "I ___ usually eat breakfast.",
        options: [
          { text: "doesn't", isCorrect: false, explanation: "'Doesn't' is for He, She, or It." },
          { text: "don't", isCorrect: true, explanation: "Correct! 'Don't' (do not) is the negative helper for 'I'." },
          { text: "not", isCorrect: false, explanation: "You need a 'do' helper for negatives in the Present Simple." }
        ]
      },
      {
        id: 'pres-6',
        question: "She ___ to stay at home today.",
        options: [
          { text: "wants", isCorrect: true, explanation: "Correct! 'Want' is a stative verb and is rarely used in continuous form." },
          { text: "is wanting", isCorrect: false, explanation: "Stative verbs (like want, need, love) are usually not used in the '-ing' form." },
          { text: "want", isCorrect: false, explanation: "For 'She', you must add an 's' to the verb in Present Simple." }
        ]
      },
      {
        id: 'pres-7',
        question: "Currently, my brother ___ for a new job.",
        options: [
          { text: "looks", isCorrect: false, explanation: "'Currently' flags a temporary situation or action in progress." },
          { text: "is looking", isCorrect: true, explanation: "Correct! Continuous is used for ongoing temporary actions." },
          { text: "looking", isCorrect: false, explanation: "You're missing the auxiliary verb 'is'." }
        ]
      },
      {
        id: 'pres-8',
        question: "How often ___ you go to the cinema?",
        options: [
          { text: "are", isCorrect: false, explanation: "'Are' would be used for Continuous (e.g., 'Are you going?')." },
          { text: "do", isCorrect: true, explanation: "Correct! Use 'do' as an auxiliary for routine-related questions." },
          { text: "does", isCorrect: false, explanation: "'Does' is only for 'He', 'She', or 'It'." }
        ]
      },
      {
        id: 'pres-9',
        question: "The sun ___ in the East.",
        options: [
          { text: "rises", isCorrect: true, explanation: "Correct! Scientific truths use Present Simple." },
          { text: "is rising", isCorrect: false, explanation: "While the sun might be rising *now*, the statement usually refers to a general fact." },
          { text: "rise", isCorrect: false, explanation: "'Sun' is singular, so the verb needs 's'." }
        ]
      },
      {
        id: 'pres-10',
        question: "Wait a minute! I ___ on the phone.",
        options: [
          { text: "talk", isCorrect: false, explanation: "This action is clearly happening right now, at the moment of the request 'Wait!'" },
          { text: "am talking", isCorrect: true, explanation: "Correct! Use the Present Continuous for an action in progress." },
          { text: "talking", isCorrect: false, explanation: "A helping verb (am/is/are) is required for the continuous form." }
        ]
      }
    ]
  },
  {
    id: 'past-tenses',
    title: 'Past Tenses: Simple vs. Continuous',
    level: 'Beginner',
    category: 'Tenses',
    shortDescription: 'Talk about finished actions and background events.',
    detailedContent: `
      ### Past Simple
      Used for actions that happened and finished in the past.
      *Example:* I visited Paris last year.
      
      ### Past Continuous
      Used for actions that were in progress at a specific time in the past.
      *Example:* I was sleeping when the phone rang.
    `,
    examples: [
      { original: "Yesterday I go to the mall.", corrected: "Yesterday I went to the mall.", note: "Use Past Simple for finished actions." },
      { original: "What you did at 8 PM?", corrected: "What were you doing at 8 PM?", note: "Use Past Continuous for actions in progress in the past." }
    ],
    practiceQuestions: [
      {
        id: 'past-1',
        question: "I ___ a movie last night.",
        options: [
          { text: "watch", isCorrect: false, explanation: "This is present tense. 'Last night' requires the past." },
          { text: "watched", isCorrect: true, explanation: "Correct! Use Past Simple for completed actions at a definite time." },
          { text: "was watching", isCorrect: false, explanation: "Possible, but Past Simple is the standard way to describe a completed event." }
        ]
      },
      {
        id: 'past-2',
        question: "While I ___ lunch, the postman arrived.",
        options: [
          { text: "ate", isCorrect: false, explanation: "We use continuous to show a long action ('having lunch') was interrupted by a short one." },
          { text: "was eating", isCorrect: true, explanation: "Correct! Use Past Continuous for the longer background action." },
          { text: "had eaten", isCorrect: false, explanation: "Past Perfect would mean you finished lunch *before* he arrived." }
        ]
      },
      {
        id: 'past-3',
        question: "They ___ to the party because they were tired.",
        options: [
          { text: "didn't went", isCorrect: false, explanation: "After 'didn't', always use the base form of the verb (go), not the past form (went)." },
          { text: "didn't go", isCorrect: true, explanation: "Correct! 'Didn't' + base verb is the standard negative past simple." },
          { text: "not go", isCorrect: false, explanation: "You need the 'did' helper to make a negative in the past simple." }
        ]
      },
      {
        id: 'past-4',
        question: "___ you see the news this morning?",
        options: [
          { text: "Do", isCorrect: false, explanation: "'This morning' (referring to a past time) requires 'did'." },
          { text: "Did", isCorrect: true, explanation: "Correct! Use 'Did' to start questions in the Past Simple." },
          { text: "Was", isCorrect: false, explanation: "'Was' is for continuous or state-of-being, not for 'see' questions." }
        ]
      },
      {
        id: 'past-5',
        question: "At 10 AM yesterday, I ___ in the park.",
        options: [
          { text: "ran", isCorrect: false, explanation: "A specific time in the past ('10 AM yesterday') usually calls for the continuous." },
          { text: "was running", isCorrect: true, explanation: "Correct! Use Past Continuous for actions in progress at a specific past moment." },
          { text: "were running", isCorrect: false, explanation: "'I' takes 'was', not 'were'." }
        ]
      },
      {
        id: 'past-6',
        question: "She ___ her keys on the way home.",
        options: [
          { text: "lost", isCorrect: true, explanation: "Correct! 'Lost' is the irregular past form of 'lose'." },
          { text: "losed", isCorrect: false, explanation: "'Lose' is an irregular verb. There is no such word as 'losed'." },
          { text: "was losing", isCorrect: false, explanation: "Losing keys is usually a sudden, finished event, not a continuous process." }
        ]
      },
      {
        id: 'past-7',
        question: "We ___ very happy to see you.",
        options: [
          { text: "was", isCorrect: false, explanation: "'We' is plural and takes 'were'." },
          { text: "were", isCorrect: true, explanation: "Correct! 'Were' is the past of 'to be' for plural subjects." },
          { text: "did be", isCorrect: false, explanation: "The verb 'to be' does not use the 'did' auxiliary in the past simple." }
        ]
      },
      {
        id: 'past-8',
        question: "My parents ___ in London when they were young.",
        options: [
          { text: "lived", isCorrect: true, explanation: "Correct! Past simple for a state or situation in the past." },
          { text: "were living", isCorrect: false, explanation: "Possible, but 'lived' is the more common way to describe a permanent past state." },
          { text: "live", isCorrect: false, explanation: "This is present tense. The sentence refers to when they 'were young'." }
        ]
      },
      {
        id: 'past-9',
        question: "Who ___ you talking to when I saw you?",
        options: [
          { text: "was", isCorrect: false, explanation: "The subject is 'you', which always takes 'were'." },
          { text: "were", isCorrect: true, explanation: "Correct! Use 'were' with 'you' in Past Continuous questions." },
          { text: "did", isCorrect: false, explanation: "You need 'was/were' to form the continuous, not 'did'." }
        ]
      },
      {
        id: 'past-10',
        question: "I ___ to call you, but I forgot.",
        options: [
          { text: "meant", isCorrect: true, explanation: "Correct! 'Meat' is the past of 'mean' (to intend)." },
          { text: "meaned", isCorrect: false, explanation: "'Mean' is irregular; its past form is 'meant'." },
          { text: "was meaning", isCorrect: false, explanation: "This isn't grammatically wrong, but 'meant' is the natural choice for a past intention." }
        ]
      }
    ]
  },
  {
    id: 'future-tenses',
    title: 'Future: Will vs. Going to',
    level: 'Beginner',
    category: 'Tenses',
    shortDescription: 'Make predictions and talk about your plans.',
    detailedContent: `
      ### Will
      Used for instant decisions, predictions without evidence, and promises.
      *Example:* I think it will rain.
      
      ### Going to
      Used for plans, intentions, and predictions based on present evidence.
      *Example:* I am going to visit my grandma this weekend.
    `,
    examples: [
      { original: "I will to see a move.", corrected: "I am going to see a movie.", note: "Use 'going to' for plans." },
      { original: "Maybe it goes to snow.", corrected: "Maybe it will snow.", note: "Use 'will' for uncertain predictions." }
    ],
    practiceQuestions: [
      {
        id: 'fut-1',
        question: "A: The phone is ringing! B: I ___ get it.",
        options: [
          { text: "will", isCorrect: true, explanation: "Correct! We use 'will' for instant decisions made at the moment of speaking." },
          { text: "am going to", isCorrect: false, explanation: "'Going to' is for pre-made plans, not sudden reactions." },
          { text: "going to", isCorrect: false, explanation: "You're missing the auxiliary 'am'." }
        ]
      },
      {
        id: 'fut-2',
        question: "Look at those black clouds! It ___ rain.",
        options: [
          { text: "will", isCorrect: false, explanation: "When there is clear evidence (the clouds), 'is going to' is better than 'will'." },
          { text: "is going to", isCorrect: true, explanation: "Correct! Use 'going to' for predictions based on physical evidence." },
          { text: "rains", isCorrect: false, explanation: "Present simple is used for schedules (trains, buses), not weather predictions." }
        ]
      },
      {
        id: 'fut-3',
        question: "Next summer, we ___ travel to Japan.",
        options: [
          { text: "will", isCorrect: false, explanation: "'Will' is less common for deliberate, pre-arranged holiday plans." },
          { text: "are going to", isCorrect: true, explanation: "Correct! Use 'going to' for intentions and plans made before speaking." },
          { text: "going to", isCorrect: false, explanation: "The auxiliary verb 'are' is missing." }
        ]
      },
      {
        id: 'fut-4',
        question: "I promise I ___ tell anyone your secret.",
        options: [
          { text: "won't", isCorrect: true, explanation: "Correct! 'Won't' (will not) is used for promises." },
          { text: "am not going to", isCorrect: false, explanation: "While possible, 'won't' is the standard way to express a promise." },
          { text: "don't", isCorrect: false, explanation: "This is present tense. Promises are for the future." }
        ]
      },
      {
        id: 'fut-5',
        question: "I ___ my dentist tomorrow at 3 PM.",
        options: [
          { text: "see", isCorrect: false, explanation: "For a fixed appointment, use present continuous or 'going to'." },
          { text: "am seeing", isCorrect: true, explanation: "Correct! Present continuous is often used for fixed future arrangements." },
          { text: "will seeing", isCorrect: false, explanation: "After 'will', use the base verb (see), not the '-ing' form." }
        ]
      },
      {
        id: 'fut-6',
        question: "I think people ___ live on Mars one day.",
        options: [
          { text: "are going to", isCorrect: false, explanation: "Predictions based on opinion/guess ('I think') usually use 'will'." },
          { text: "will", isCorrect: true, explanation: "Correct! Use 'will' for personal opinions about the future." },
          { text: "shall", isCorrect: false, explanation: "'Shall' is very formal and less common for general predictions." }
        ]
      },
      {
        id: 'fut-7',
        question: "What ___ you going to do after university?",
        options: [
          { text: "do", isCorrect: false, explanation: "You need the 'to be' verb to complete the 'going to' structure." },
          { text: "are", isCorrect: true, explanation: "Correct! 'Are' is the auxiliary for 'you'." },
          { text: "will", isCorrect: false, explanation: "You can't use 'will' and 'going to' together like this." }
        ]
      },
      {
        id: 'fut-8',
        question: "Maybe I ___ stay at home tonight.",
        options: [
          { text: "am going to", isCorrect: false, explanation: "'Maybe' indicates uncertainty, which favors 'will'." },
          { text: "will", isCorrect: true, explanation: "Correct! Use 'will' when you are not 100% sure about a decision." },
          { text: "going to", isCorrect: false, explanation: "Missing auxiliary and 'maybe' makes it less appropriate anyway." }
        ]
      },
      {
        id: 'fut-9',
        question: "The train ___ at 9:00 AM tomorrow.",
        options: [
          { text: "is going to leave", isCorrect: false, explanation: "For timetables and official schedules, Present Simple is best." },
          { text: "leaves", isCorrect: true, explanation: "Correct! Use Present Simple for fixed schedules (trains, planes, classes)." },
          { text: "leaving", isCorrect: false, explanation: "A single '-ing' word cannot function as the verb of a sentence." }
        ]
      },
      {
        id: 'fut-10',
        question: "If I win the lottery, I ___ buy a big house.",
        options: [
          { text: "am going to", isCorrect: false, explanation: "'Will' is standard in the first conditional result clause." },
          { text: "will", isCorrect: true, explanation: "Correct! First conditional: 'If' + Present, 'Will' + Base Verb." },
          { text: "bought", isCorrect: false, explanation: "This is past tense; we are talking about a future possibility." }
        ]
      }
    ]
  },
  {
    id: 'modal-verbs',
    title: 'Modal Verbs: Can, Must, Should',
    level: 'Intermediate',
    category: 'Verbs',
    shortDescription: 'Express ability, obligation, and advice.',
    detailedContent: `
      ### Can / Could
      Used for ability or permission. 'Could' is the past of 'can' or used for polite requests.
      
      ### Must / Have to
      Used for strong obligation or necessity.
      
      ### Should
      Used for giving advice or suggestions.
    `,
    examples: [
      { original: "I must to go.", corrected: "I must go.", note: "Do not use 'to' after modal verbs (except 'have to')." },
      { original: "You can swimming?", corrected: "Can you swim?", note: "Use the base form of the verb after 'can'." }
    ],
    practiceQuestions: [
      {
        id: 'mod-1',
        question: "You ___ smoke in the hospital. It's strictly forbidden.",
        options: [
          { text: "mustn't", isCorrect: true, explanation: "Correct! 'Mustn't' is used for prohibition (things that are not allowed)." },
          { text: "don't have to", isCorrect: false, explanation: "'Don't have to' means it's not necessary, but 'mustn't' means it's forbidden." },
          { text: "shouldn't", isCorrect: false, explanation: "'Shouldn't' is for advice. Hospitals usually have strict rules (prohibition)." }
        ]
      },
      {
        id: 'mod-2',
        question: "I ___ speak three languages fluently.",
        options: [
          { text: "can", isCorrect: true, explanation: "Correct! 'Can' expresses a general ability." },
          { text: "may", isCorrect: false, explanation: "'May' is for permission or possibility, not usually for physical/mental abilities." },
          { text: "must", isCorrect: false, explanation: "Ability is not the same as obligation." }
        ]
      },
      {
        id: 'mod-3',
        question: "___ you help me with this heavy box, please?",
        options: [
          { text: "Could", isCorrect: true, explanation: "Correct! 'Could' is a polite way to make a request." },
          { text: "Should", isCorrect: false, explanation: "You are asking for help, not asking for advice." },
          { text: "Must", isCorrect: false, explanation: "'Must' is too forceful for a polite request." }
        ]
      },
      {
        id: 'mod-4',
        question: "You ___ see a doctor if your cough gets worse.",
        options: [
          { text: "should", isCorrect: true, explanation: "Correct! 'Should' is used to give advice." },
          { text: "can", isCorrect: false, explanation: "'Can' means you are able to, but 'should' provides the needed advice." },
          { text: "have to", isCorrect: false, explanation: "Possible, but 'should' is the standard way to offer a suggestion." }
        ]
      },
      {
        id: 'mod-5',
        question: "We ___ wear a uniform at my school. It's the rule.",
        options: [
          { text: "have to", isCorrect: true, explanation: "Correct! 'Have to' expresses an external obligation (from rules or laws)." },
          { text: "could", isCorrect: false, explanation: "'Could' is about ability or past permission, not a current rule." },
          { text: "might", isCorrect: false, explanation: "'Might' is for possibility." }
        ]
      },
      {
        id: 'mod-6',
        question: "I'm not sure, but it ___ rain later.",
        options: [
          { text: "might", isCorrect: true, explanation: "Correct! 'Might' is used for a weak possibility." },
          { text: "must", isCorrect: false, explanation: "'Must' for deduction means you are almost certain." },
          { text: "should", isCorrect: false, explanation: "'Should' implies you expect it to rain, but 'might' fits 'not sure' better." }
        ]
      },
      {
        id: 'mod-7',
        question: "You ___ bring anything to the party. We have plenty of food.",
        options: [
          { text: "mustn't", isCorrect: false, explanation: "'Mustn't' means you are forbidden from bringing food!" },
          { text: "don't have to", isCorrect: true, explanation: "Correct! 'Don't have to' means there is no necessity or obligation." },
          { text: "couldn't", isCorrect: false, explanation: "'Couldn't' means you were unable to." }
        ]
      },
      {
        id: 'mod-8',
        question: "Last year, I ___ swim very well, but now I can.",
        options: [
          { text: "can't", isCorrect: false, explanation: "The sentence starts with 'Last year', so you need the past tense." },
          { text: "couldn't", isCorrect: true, explanation: "Correct! 'Couldn't' is the past of 'can't' for general ability." },
          { text: "shouldn't", isCorrect: false, explanation: "It's about ability, not advice." }
        ]
      },
      {
        id: 'mod-9',
        question: "Where is Mark? He ___ be at the library.",
        options: [
          { text: "could", isCorrect: true, explanation: "Correct! 'Could' can express a possibility in the present." },
          { text: "must to", isCorrect: false, explanation: "Never use 'to' after 'must'." },
          { text: "shouldn't", isCorrect: false, explanation: "You are guessing where he is, not giving advice." }
        ]
      },
      {
        id: 'mod-10',
        question: "___ I use your pen for a moment?",
        options: [
          { text: "May", isCorrect: true, explanation: "Correct! 'May' is a formal way to ask for permission." },
          { text: "Should", isCorrect: false, explanation: "You are not asking for advice on using the pen." },
          { text: "Will", isCorrect: false, explanation: "'Will' is for future/offers, not permission." }
        ]
      }
    ]
  },
  {
    id: 'prepositions-basic',
    title: 'Prepositions: In, At, On',
    level: 'Beginner',
    category: 'Prepositions',
    shortDescription: 'Master the common prepositions of time and place.',
    detailedContent: `
      ### Time
      - **In**: Months, years, seasons, parts of the day.
      - **On**: Days of the week, dates, specific days.
      - **At**: Specific times, mealtimes, holidays without 'day'.
      
      ### Place
      - **In**: Enclosed spaces, cities, countries.
      - **On**: Surfaces, floors, public transport.
      - **At**: Specific points, events.
    `,
    examples: [
      { original: "I'll see you in Monday.", corrected: "I'll see you on Monday.", note: "Use 'on' for days of the week." },
      { original: "He is at the car.", corrected: "He is in the car.", note: "Use 'in' for enclosed spaces like cars." }
    ],
    practiceQuestions: [
      {
        id: 'prep-1',
        question: "The meeting is ___ 9:30 AM.",
        options: [
          { text: "at", isCorrect: true, explanation: "Correct! Use 'at' for specific clock times." },
          { text: "in", isCorrect: false, explanation: "'In' is for larger periods like months or years." },
          { text: "on", isCorrect: false, explanation: "'On' is for days and dates." }
        ]
      },
      {
        id: 'prep-2',
        question: "I was born ___ 1995.",
        options: [
          { text: "at", isCorrect: false, explanation: "'At' is for specific times, not years." },
          { text: "in", isCorrect: true, explanation: "Correct! Use 'in' for years, months, and seasons." },
          { text: "on", isCorrect: false, explanation: "'On' is for specific dates (e.g., May 10th)." }
        ]
      },
      {
        id: 'prep-3',
        question: "Let's meet ___ the weekend.",
        options: [
          { text: "at", isCorrect: true, explanation: "Correct! In British English, 'at the weekend' is common. (In US English, 'on' is also common)." },
          { text: "in", isCorrect: false, explanation: "We don't say 'in the weekend'." },
          { text: "to", isCorrect: false, explanation: "'To' implies direction/movement." }
        ]
      },
      {
        id: 'prep-4',
        question: "The book is ___ the table.",
        options: [
          { text: "in", isCorrect: false, explanation: "Unless the book is somehow inside the wood of the table!" },
          { text: "on", isCorrect: true, explanation: "Correct! Use 'on' for surfaces." },
          { text: "at", isCorrect: false, explanation: "'At' would mean next to or near the table, but 'on' is more specific." }
        ]
      },
      {
        id: 'prep-5',
        question: "She lives ___ Paris.",
        options: [
          { text: "at", isCorrect: false, explanation: "We use 'at' for specific addresses, but 'in' for cities/countries." },
          { text: "in", isCorrect: true, explanation: "Correct! Use 'in' for cities, countries, and continents." },
          { text: "on", isCorrect: false, explanation: "'On Paris' would mean she is on top of the city!" }
        ]
      },
      {
        id: 'prep-6',
        question: "I'll see you ___ Christmas Day.",
        options: [
          { text: "at", isCorrect: false, explanation: "We say 'at Christmas' but 'on Christmas Day'." },
          { text: "on", isCorrect: true, explanation: "Correct! Use 'on' for specific days that include the word 'Day'." },
          { text: "in", isCorrect: false, explanation: "No, use 'on' for dates and days." }
        ]
      },
      {
        id: 'prep-7',
        question: "There's a lot of traffic ___ the morning.",
        options: [
          { text: "at", isCorrect: false, explanation: "Except for 'at night', we use 'in' for parts of the day." },
          { text: "in", isCorrect: true, explanation: "Correct! Use 'in' for 'the morning', 'the afternoon', and 'the evening'." },
          { text: "on", isCorrect: false, explanation: "No, unless it's a specific day like 'on Monday morning'." }
        ]
      },
      {
        id: 'prep-8',
        question: "I am waiting ___ the bus stop.",
        options: [
          { text: "in", isCorrect: false, explanation: "A bus stop is a point, not an enclosed space." },
          { text: "at", isCorrect: true, explanation: "Correct! Use 'at' for specific points or locations." },
          { text: "on", isCorrect: false, explanation: "Unless you are literally standing on top of the bus stop sign!" }
        ]
      },
      {
        id: 'prep-9',
        question: "He is ___ the bus right now.",
        options: [
          { text: "at", isCorrect: false, explanation: "'At the bus' is possible but 'on the bus' is the standard for public transport." },
          { text: "on", isCorrect: true, explanation: "Correct! Use 'on' for public transportation (bus, train, plane, boat)." },
          { text: "in", isCorrect: false, explanation: "While you are physically 'in' it, 'on' is the standard preposition for the bus." }
        ]
      },
      {
        id: 'prep-10',
        question: "The shops are closed ___ Sundays.",
        options: [
          { text: "in", isCorrect: false, explanation: "Use 'on' for days." },
          { text: "on", isCorrect: true, explanation: "Correct! Use 'on' for days of the week." },
          { text: "at", isCorrect: false, explanation: "No, 'at' is for specific times." }
        ]
      }
    ]
  },
  {
    id: 'passive-voice',
    title: 'Passive Voice: Present and Past',
    level: 'Intermediate',
    category: 'Verbs',
    shortDescription: 'Focus on the action rather than who did it.',
    detailedContent: `
      The passive voice is used when the focus is on the action or the person/thing affected by the action.
      
      ### Structure
      Subject + To Be + Past Participle
      
      *Present Simple Passive:* The house is cleaned every day.
      *Past Simple Passive:* The house was cleaned yesterday.
    `,
    examples: [
      { original: "The cake ate by me.", corrected: "The cake was eaten by me.", note: "Passive voice requires the verb 'to be' and the past participle." },
      { original: "Spanish is spoke in Mexico.", corrected: "Spanish is spoken in Mexico.", note: "'Spoken' is the past participle of 'speak'." }
    ],
    practiceQuestions: [
      {
        id: 'pass-1',
        question: "This book ___ in 1950.",
        options: [
          { text: "wrote", isCorrect: false, explanation: "This would mean the book itself wrote something! You need passive." },
          { text: "was written", isCorrect: true, explanation: "Correct! Past simple passive: 'was' + past participle." },
          { text: "is written", isCorrect: false, explanation: "'1950' indicates the past; 'is written' is present passive." }
        ]
      },
      {
        id: 'pass-2',
        question: "Many cars ___ in this factory every month.",
        options: [
          { text: "are produced", isCorrect: true, explanation: "Correct! Present simple passive for regular actions." },
          { text: "is produced", isCorrect: false, explanation: "'Cars' is plural, so you need 'are'." },
          { text: "produce", isCorrect: false, explanation: "The cars don't produce anything; they are the result of the production." }
        ]
      },
      {
        id: 'pass-3',
        question: "The Mona Lisa ___ by Leonardo da Vinci.",
        options: [
          { text: "was painted", isCorrect: true, explanation: "Correct! Past simple passive for a completed historical action." },
          { text: "painted", isCorrect: false, explanation: "The painting didn't paint anything; it was painted by someone." },
          { text: "had painted", isCorrect: false, explanation: "This would mean the Mona Lisa had painted something else earlier!" }
        ]
      },
      {
        id: 'pass-4',
        question: "The window ___ broken by the wind.",
        options: [
          { text: "is", isCorrect: true, explanation: "Correct! Present passive to describe the current state or a general event." },
          { text: "was", isCorrect: true, explanation: "Correct! Both 'is' and 'was' are grammatically correct depending on the context." },
          { text: "did", isCorrect: false, explanation: "You can't use 'did' to form a passive sentence." }
        ]
      },
      {
        id: 'pass-5',
        question: "Emails ___ sent automatically these days.",
        options: [
          { text: "are", isCorrect: true, explanation: "Correct! Plural subject 'Emails' + present 'are' for today's habits." },
          { text: "is", isCorrect: false, explanation: "'Emails' is plural." },
          { text: "am", isCorrect: false, explanation: "'Am' is only for the subject 'I'." }
        ]
      },
      {
        id: 'pass-6',
        question: "The thief ___ by the police yesterday.",
        options: [
          { text: "caught", isCorrect: false, explanation: "The thief didn't catch anyone; he was caught." },
          { text: "was caught", isCorrect: true, explanation: "Correct! Past simple passive: 'was' + irregular participle 'caught'." },
          { text: "was catching", isCorrect: false, explanation: "This is active voice, meaning the thief was in the process of catching something." }
        ]
      },
      {
        id: 'pass-7',
        question: "Coffee ___ in Brazil.",
        options: [
          { text: "grows", isCorrect: false, explanation: "Coffee doesn't grow itself; it is grown (by people)." },
          { text: "is grown", isCorrect: true, explanation: "Correct! Present simple passive for general facts about production." },
          { text: "are grown", isCorrect: false, explanation: "'Coffee' is uncountable and takes a singular verb." }
        ]
      },
      {
        id: 'pass-8',
        question: "The invitations ___ to all the guests last week.",
        options: [
          { text: "were sent", isCorrect: true, explanation: "Correct! 'Invitations' (plural) + 'were' (past) + 'sent' (participle)." },
          { text: "was sent", isCorrect: false, explanation: "'Invitations' is plural, so it needs 'were'." },
          { text: "sent", isCorrect: false, explanation: "You need the auxiliary 'were' for the passive voice." }
        ]
      },
      {
        id: 'pass-9',
        question: "The rules ___ to everyone before the game started.",
        options: [
          { text: "explained", isCorrect: false, explanation: "The rules didn't explain themselves." },
          { text: "were explained", isCorrect: true, explanation: "Correct! Past simple passive for a completed action." },
          { text: "been explained", isCorrect: false, explanation: "You can't use 'been' alone; you need 'were' or 'had been'." }
        ]
      },
      {
        id: 'pass-10',
        question: "Is English ___ in your country?",
        options: [
          { text: "speak", isCorrect: false, explanation: "You need the past participle after 'is' for the passive voice." },
          { text: "speaking", isCorrect: false, explanation: "This would be active continuous (Is English speaking?)." },
          { text: "spoken", isCorrect: true, explanation: "Correct! 'Spoken' is the past participle of 'speak'." }
        ]
      }
    ]
  },
  {
    id: 'relative-clauses',
    title: 'Relative Clauses: Who, Which, That',
    level: 'Intermediate',
    category: 'Structure',
    shortDescription: 'Join sentences and add information about people or things.',
    detailedContent: `
      ### Relative Pronouns
      - **Who**: For people.
      - **Which**: For things or animals.
      - **That**: For people or things (especially in defining clauses).
      - **Whose**: For possession.
      - **Whom**: For people (as an object, formal).
    `,
    examples: [
      { original: "The man which is talking is my brother.", corrected: "The man who is talking is my brother.", note: "Use 'who' for people." },
      { original: "The car who I bought is red.", corrected: "The car which I bought is red.", note: "Use 'which' or 'that' for things." }
    ],
    practiceQuestions: [
      {
        id: 'rel-1',
        question: "The girl ___ won the race is my cousin.",
        options: [
          { text: "who", isCorrect: true, explanation: "Correct! Use 'who' to refer to a person as the subject." },
          { text: "which", isCorrect: false, explanation: "'Which' is for things or animals." },
          { text: "whose", isCorrect: false, explanation: "'Whose' is for possession." }
        ]
      },
      {
        id: 'rel-2',
        question: "This is the book ___ I was telling you about.",
        options: [
          { text: "who", isCorrect: false, explanation: "A book is a thing, not a person." },
          { text: "that", isCorrect: true, explanation: "Correct! 'That' can refer to both people and things." },
          { text: "whom", isCorrect: false, explanation: "'Whom' is for people as objects." }
        ]
      },
      {
        id: 'rel-3',
        question: "I know a boy ___ father is a pilot.",
        options: [
          { text: "who", isCorrect: false, explanation: "We need to show the relationship between the boy and his father (possession)." },
          { text: "whose", isCorrect: true, explanation: "Correct! 'Whose' is used to show possession." },
          { text: "who's", isCorrect: false, explanation: "'Who's' means 'who is' or 'who has'." }
        ]
      },
      {
        id: 'rel-4',
        question: "The house ___ they live is very old.",
        options: [
          { text: "which", isCorrect: false, explanation: "If you use 'which', you need a preposition: 'The house in which they live'." },
          { text: "where", isCorrect: true, explanation: "Correct! 'Where' is used for places." },
          { text: "that", isCorrect: false, explanation: "Same as 'which'—needs a preposition: 'The house that they live in'." }
        ]
      },
      {
        id: 'rel-5',
        question: "Yesterday I met a woman ___ could speak five languages.",
        options: [
          { text: "who", isCorrect: true, explanation: "Correct! Refers to the woman (a person)." },
          { text: "which", isCorrect: false, explanation: "Incorrect for people." },
          { text: "whose", isCorrect: false, explanation: "Not expressing possession." }
        ]
      },
      {
        id: 'rel-6',
        question: "The movie ___ we watched last night was amazing.",
        options: [
          { text: "who", isCorrect: false, explanation: "A movie is not a person." },
          { text: "which", isCorrect: true, explanation: "Correct! 'Which' refers to things." },
          { text: "where", isCorrect: false, explanation: "A movie is an event/thing, not a physical location." }
        ]
      },
      {
        id: 'rel-7',
        question: "Is that the man ___ you were talking to?",
        options: [
          { text: "whom", isCorrect: true, explanation: "Correct! 'Whom' is the object form for people (whom you were talking to)." },
          { text: "whose", isCorrect: false, explanation: "Not showing possession." },
          { text: "which", isCorrect: false, explanation: "Incorrect for people." }
        ]
      },
      {
        id: 'rel-8',
        question: "I have a friend ___ lives in New York.",
        options: [
          { text: "who", isCorrect: true, explanation: "Correct! Subject relative pronoun for a person." },
          { text: "that", isCorrect: true, explanation: "Correct! 'That' can also be used for people in this context." },
          { text: "which", isCorrect: false, explanation: "No, never use 'which' for people." }
        ]
      },
      {
        id: 'rel-9',
        question: "The laptop ___ I bought is broken.",
        options: [
          { text: "who", isCorrect: false, explanation: "Laptops aren't people." },
          { text: "which", isCorrect: true, explanation: "Correct! 'Which' for things." },
          { text: "whose", isCorrect: false, explanation: "Not possession." }
        ]
      },
      {
        id: 'rel-10',
        question: "The school ___ I studied was built in 1900.",
        options: [
          { text: "where", isCorrect: true, explanation: "Correct! Refers to the location of the study." },
          { text: "who", isCorrect: false, explanation: "A school is not a person." },
          { text: "that", isCorrect: false, explanation: "Would need 'in': 'that I studied in'." }
        ]
      }
    ]
  },
  {
    id: 'reported-speech',
    title: 'Reported Speech: Tense Shifting',
    level: 'Advanced',
    category: 'Structure',
    shortDescription: 'Learn how to tell people what someone else said.',
    detailedContent: `
      When reporting what someone said, we usually move the tense one step back.
      
      - Present Simple → Past Simple
      - Present Continuous → Past Continuous
      - Will → Would
      - Can → Could
      
      ### Pronouns and Time
      Pronouns and time references also change (e.g., "I" → "he/she", "today" → "that day").
    `,
    examples: [
      { original: 'He said, "I am hungry."', corrected: "He said that he was hungry.", note: "Shift Present Simple to Past Simple." },
      { original: 'She said, "I will call you."', corrected: "She said she would call me.", note: "Shift 'will' to 'would'." }
    ],
    practiceQuestions: [
      {
        id: 'rep-1',
        question: 'Direct: "I love coffee." Reported: He said he ___ coffee.',
        options: [
          { text: "love", isCorrect: false, explanation: "You must shift the tense back in reported speech." },
          { text: "loved", isCorrect: true, explanation: "Correct! Present Simple shifts to Past Simple." },
          { text: "is loving", isCorrect: false, explanation: "This is a forward shift/incorrect form." }
        ]
      },
      {
        id: 'rep-2',
        question: 'Direct: "I am working." Reported: She said she ___ working.',
        options: [
          { text: "is", isCorrect: false, explanation: "Shift 'is' back to 'was'." },
          { text: "was", isCorrect: true, explanation: "Correct! Present Continuous shifts to Past Continuous." },
          { text: "will be", isCorrect: false, explanation: "Incorrect tense shift." }
        ]
      },
      {
        id: 'rep-3',
        question: 'Direct: "I will help you." Reported: He said he ___ help me.',
        options: [
          { text: "will", isCorrect: false, explanation: "Shift 'will' back to 'would'." },
          { text: "would", isCorrect: true, explanation: "Correct! 'Will' becomes 'would' in reported speech." },
          { text: "going to", isCorrect: false, explanation: "Different structure." }
        ]
      },
      {
        id: 'rep-4',
        question: 'Direct: "I can swim." Reported: She said she ___ swim.',
        options: [
          { text: "can", isCorrect: false, explanation: "Shift 'can' back to 'could'." },
          { text: "could", isCorrect: true, explanation: "Correct! 'Can' becomes 'could' in reported speech." },
          { text: "was able", isCorrect: false, explanation: "Possible, but 'could' is the direct shift for 'can'." }
        ]
      },
      {
        id: 'rep-5',
        question: 'Direct: "I saw her yesterday." Reported: He said he ___ her the day before.',
        options: [
          { text: "saw", isCorrect: false, explanation: "Past Simple should shift to Past Perfect (had seen)." },
          { text: "had seen", isCorrect: true, explanation: "Correct! Past Simple shifts back to Past Perfect." },
          { text: "has seen", isCorrect: false, explanation: "This is Present Perfect." }
        ]
      },
      {
        id: 'rep-6',
        question: 'Direct: "Where do you live?" Reported: She asked me where I ___.',
        options: [
          { text: "do live", isCorrect: false, explanation: "In reported questions, we use statement word order (no 'do')." },
          { text: "lived", isCorrect: true, explanation: "Correct! Statement order and tense shift to Past Simple." },
          { text: "did live", isCorrect: false, explanation: "Again, avoid the 'do' auxiliary in reported questions." }
        ]
      },
      {
        id: 'rep-7',
        question: 'Direct: "Stay here." Reported: He told me ___ there.',
        options: [
          { text: "stay", isCorrect: false, explanation: "Use 'to' + base verb for reported imperatives." },
          { text: "to stay", isCorrect: true, explanation: "Correct! Use 'to' for positive commands." },
          { text: "must stay", isCorrect: false, explanation: "Changes the tone/meaning slightly." }
        ]
      },
      {
        id: 'rep-8',
        question: 'Direct: "I have finished." Reported: She said she ___ finished.',
        options: [
          { text: "has", isCorrect: false, explanation: "Shift 'has' back to 'had'." },
          { text: "had", isCorrect: true, explanation: "Correct! Present Perfect shifts to Past Perfect." },
          { text: "finished", isCorrect: false, explanation: "Needs the auxiliary 'had'." }
        ]
      },
      {
        id: 'rep-9',
        question: 'Direct: "I am going to call." Reported: He said he ___ going to call.',
        options: [
          { text: "was", isCorrect: true, explanation: "Correct! Shift 'am' to 'was'." },
          { text: "is", isCorrect: false, explanation: "Needs to shift back." },
          { text: "were", isCorrect: false, explanation: "'He' takes 'was'." }
        ]
      },
      {
        id: 'rep-10',
        question: 'Which word order is correct in a reported question?',
        options: [
          { text: "He asked where was I.", isCorrect: false, explanation: "Reported questions use statement word order." },
          { text: "He asked where I was.", isCorrect: true, explanation: "Correct! Question word + Subject + Verb." },
          { text: "He asked where I was?", isCorrect: false, explanation: "Do not use a question mark in reported questions." }
        ]
      }
    ]
  },
  {
    id: 'gerunds-infinitives',
    title: 'Gerunds and Infinitives',
    level: 'Intermediate',
    category: 'Verbs',
    shortDescription: 'When to use -ing vs. to + verb.',
    detailedContent: `
      ### Gerunds (-ing)
      Used after certain verbs like *enjoy, finish, avoid, suggest*.
      
      ### Infinitives (to + verb)
      Used after certain verbs like *want, decide, hope, promise*.
      
      ### Some verbs can take both
      Verbs like *like, love, hate* can take either with little change in meaning. 
      However, *stop, remember, forget* change meaning depending on the form.
    `,
    examples: [
      { original: "I want going home.", corrected: "I want to go home.", note: "Use infinitive after 'want'." },
      { original: "I enjoy to dance.", corrected: "I enjoy dancing.", note: "Use gerund after 'enjoy'." }
    ],
    practiceQuestions: [
      {
        id: 'ger-1',
        question: "I suggested ___ to the park.",
        options: [
          { text: "going", isCorrect: true, explanation: "Correct! 'Suggest' is always followed by a gerund." },
          { text: "to go", isCorrect: false, explanation: "No, 'suggest' does not take the infinitive." },
          { text: "go", isCorrect: false, explanation: "Missing the '-ing'." }
        ]
      },
      {
        id: 'ger-2',
        question: "She decided ___ for the job.",
        options: [
          { text: "applying", isCorrect: false, explanation: "'Decide' is followed by the infinitive." },
          { text: "to apply", isCorrect: true, explanation: "Correct! 'Decide' + to-infinitive." },
          { text: "apply", isCorrect: false, explanation: "Missing 'to'." }
        ]
      },
      {
        id: 'ger-3',
        question: "I don't mind ___ you with your homework.",
        options: [
          { text: "helping", isCorrect: true, explanation: "Correct! 'Mind' is followed by a gerund." },
          { text: "to help", isCorrect: false, explanation: "No, 'mind' takes the gerund." },
          { text: "help", isCorrect: false, explanation: "Missing the '-ing'." }
        ]
      },
      {
        id: 'ger-4',
        question: "We hope ___ from you soon.",
        options: [
          { text: "hearing", isCorrect: false, explanation: "'Hope' takes the infinitive." },
          { text: "to hear", isCorrect: true, explanation: "Correct! 'Hope' + to-infinitive." },
          { text: "heard", isCorrect: false, explanation: "Past tense doesn't follow 'hope' in this way." }
        ]
      },
      {
        id: 'ger-5',
        question: "Avoid ___ junk food if you want to be healthy.",
        options: [
          { text: "eating", isCorrect: true, explanation: "Correct! 'Avoid' is followed by a gerund." },
          { text: "to eat", isCorrect: false, explanation: "No, 'avoid' takes the gerund." },
          { text: "eat", isCorrect: false, explanation: "Missing the '-ing'." }
        ]
      },
      {
        id: 'ger-6',
        question: "I stopped ___ because I was tired. (Meaning: I was walking and then I ceased the action).",
        options: [
          { text: "walking", isCorrect: true, explanation: "Correct! 'Stop + gerund' means to cease an action." },
          { text: "to walk", isCorrect: false, explanation: "'Stop + infinitive' means to stop what you are doing *in order to* do something else." },
          { text: "walk", isCorrect: false, explanation: "Missing the '-ing'." }
        ]
      },
      {
        id: 'ger-7',
        question: "She promised ___ on time.",
        options: [
          { text: "to arrive", isCorrect: true, explanation: "Correct! 'Promise' + to-infinitive." },
          { text: "arriving", isCorrect: false, explanation: "No, 'promise' does not take the gerund." },
          { text: "arrive", isCorrect: false, explanation: "Missing 'to'." }
        ]
      },
      {
        id: 'ger-8',
        question: "I remember ___ this movie before. (Meaning: I have a memory of it).",
        options: [
          { text: "seeing", isCorrect: true, explanation: "Correct! 'Remember + gerund' refers to a past memory." },
          { text: "to see", isCorrect: false, explanation: "'Remember + infinitive' means not to forget to do a future task." },
          { text: "saw", isCorrect: false, explanation: "Incorrect structure." }
        ]
      },
      {
        id: 'ger-9',
        question: "He's good at ___ chess.",
        options: [
          { text: "play", isCorrect: false, explanation: "After a preposition (at), you must use a gerund." },
          { text: "playing", isCorrect: true, explanation: "Correct! Use gerunds after prepositions." },
          { text: "to play", isCorrect: false, explanation: "No, preposition + gerund." }
        ]
      },
      {
        id: 'ger-10',
        question: "It was nice ___ you.",
        options: [
          { text: "meeting", isCorrect: true, explanation: "Correct! Both 'meeting' and 'to meet' can work here, but gerund is very common for greetings/closings." },
          { text: "to meet", isCorrect: true, explanation: "Correct! Both forms are grammatically acceptable in this specific context." },
          { text: "met", isCorrect: false, explanation: "Incorrect form." }
        ]
      }
    ]
  },
  {
    id: 'conditionals-advanced',
    title: 'Second and Third Conditionals',
    level: 'Advanced',
    category: 'Tenses',
    shortDescription: 'Talk about imaginary situations and regrets.',
    detailedContent: `
      ### Second Conditional
      Used for hypothetical or imaginary situations in the present or future.
      *Structure:* If + Past Simple, ... Would + Base Verb.
      
      ### Third Conditional
      Used for regrets or imaginary situations in the past.
      *Structure:* If + Past Perfect, ... Would have + Past Participle.
    `,
    examples: [
      { original: "If I win the lottery, I would buy a boat.", corrected: "If I won the lottery, I would buy a boat.", note: "Second conditional uses past simple in the 'if' clause." },
      { original: "If I would have known, I would have told you.", corrected: "If I had known, I would have told you.", note: "Third conditional uses past perfect in the 'if' clause." }
    ],
    practiceQuestions: [
      {
        id: 'cond-1',
        question: "If I ___ you, I would tell her the truth.",
        options: [
          { text: "am", isCorrect: false, explanation: "This is second conditional (imaginary present); use 'were'." },
          { text: "was", isCorrect: true, explanation: "Correct! 'Was' is common in spoken English, though 'were' is formally preferred." },
          { text: "were", isCorrect: true, explanation: "Correct! 'Were' is the formally correct form for 'if I were you' (subjunctive)." }
        ]
      },
      {
        id: 'cond-2',
        question: "If I had more money, I ___ a new car.",
        options: [
          { text: "will buy", isCorrect: false, explanation: "This is Second Conditional (If + Past); use 'would'." },
          { text: "would buy", isCorrect: true, explanation: "Correct! Result clause of a Second Conditional." },
          { text: "buy", isCorrect: false, explanation: "Missing 'would'." }
        ]
      },
      {
        id: 'cond-3',
        question: "She would have passed the exam if she ___ harder.",
        options: [
          { text: "studied", isCorrect: false, explanation: "This is a Third Conditional (regret about past); use 'had studied'." },
          { text: "had studied", isCorrect: true, explanation: "Correct! 'If' clause of a Third Conditional." },
          { text: "would study", isCorrect: false, explanation: "Never use 'would' in the 'if' clause." }
        ]
      },
      {
        id: 'cond-4',
        question: "If we ___ the map, we wouldn't have got lost.",
        options: [
          { text: "didn't forget", isCorrect: false, explanation: "Third conditional needs Past Perfect." },
          { text: "hadn't forgotten", isCorrect: true, explanation: "Correct! Past Perfect negative for past regrets." },
          { text: "forgot", isCorrect: false, explanation: "Incorrect tense and meaning." }
        ]
      },
      {
        id: 'cond-5',
        question: "If it ___ tomorrow, we'll cancel the trip.",
        options: [
          { text: "rained", isCorrect: false, explanation: "The result is 'we'll' (future); this is a First Conditional." },
          { text: "rains", isCorrect: true, explanation: "Correct! First Conditional: 'If' + Present Simple." },
          { text: "will rain", isCorrect: false, explanation: "No 'will' in the 'if' clause." }
        ]
      },
      {
        id: 'cond-6',
        question: "If I ___ wings, I would fly to the moon.",
        options: [
          { text: "have", isCorrect: false, explanation: "Imaginary situation; use past simple." },
          { text: "had", isCorrect: true, explanation: "Correct! Second Conditional for impossible situations." },
          { text: "will have", isCorrect: false, explanation: "No 'will' in the 'if' clause." }
        ]
      },
      {
        id: 'cond-7',
        question: "What ___ you do if you saw a ghost?",
        options: [
          { text: "will", isCorrect: false, explanation: "The 'if' clause is 'saw' (past); use 'would'." },
          { text: "would", isCorrect: true, explanation: "Correct! Use 'would' in questions about hypothetical situations." },
          { text: "do", isCorrect: false, explanation: "Incorrect tense." }
        ]
      },
      {
        id: 'cond-8',
        question: "If I ___ you were coming, I would have baked a cake.",
        options: [
          { text: "knew", isCorrect: false, explanation: "This is Third Conditional (past regret); use 'had known'." },
          { text: "had known", isCorrect: true, explanation: "Correct! 'If' + Past Perfect." },
          { text: "know", isCorrect: false, explanation: "Incorrect tense." }
        ]
      },
      {
        id: 'cond-9',
        question: "Unless it ___ raining, we won't go out.",
        options: [
          { text: "stops", isCorrect: true, explanation: "Correct! 'Unless' + Present Simple in first conditional." },
          { text: "will stop", isCorrect: false, explanation: "No 'will' after 'unless'." },
          { text: "stopped", isCorrect: false, explanation: "First conditional needs present." }
        ]
      },
      {
        id: 'cond-10',
        question: "If I hadn't gone to that party, I ___ my husband.",
        options: [
          { text: "wouldn't meet", isCorrect: false, explanation: "Needs to be Third Conditional result: 'wouldn't have met'." },
          { text: "wouldn't have met", isCorrect: true, explanation: "Correct! Past regret result: 'would have' + participle." },
          { text: "didn't meet", isCorrect: false, explanation: "Incorrect tense for past imaginary result." }
        ]
      }
    ]
  }
];
