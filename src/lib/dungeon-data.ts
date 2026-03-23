export type QuestionType = 'mcq' | 'fix' | 'fill-blank' | 'rewrite';
export type Topic = 'tenses' | 'articles' | 'modals' | 'prepositions' | 'passive' | 'conditionals' | 'relative-clauses' | 'reported-speech';

export interface DungeonExplanation {
  triggers: string[];       // Words to highlight in the question
  bullets: string[];        // 2-3 short "WHY" bullet points
}

export interface DungeonQuestion {
  id: string;
  type: QuestionType;
  topic: Topic;
  difficulty: 'easy' | 'medium' | 'hard';
  prompt: string;
  options?: string[];       // for mcq
  answer: string;
  isBoss?: boolean;
  bossPartOf?: string;      // boss question group id
  explanation: DungeonExplanation;
  xpReward: number;
  hpPenalty: number;
}

export const dungeonQuestions: DungeonQuestion[] = [
  // ─────────────────────── TENSES ───────────────────────
  {
    id: 't1', type: 'mcq', topic: 'tenses', difficulty: 'easy',
    prompt: 'She ___ to work every day.',
    options: ['go', 'goes', 'going', 'went'],
    answer: 'goes',
    explanation: {
      triggers: ['every day'],
      bullets: [
        '"Every day" signals a habitual routine → Present Simple.',
        'Third person singular (she) → add -s: "goes".',
      ]
    },
    xpReward: 10, hpPenalty: 10
  },
  {
    id: 't2', type: 'fix', topic: 'tenses', difficulty: 'easy',
    prompt: 'He go to the shop yesterday.',
    answer: 'He went to the shop yesterday.',
    explanation: {
      triggers: ['yesterday'],
      bullets: [
        '"Yesterday" is a past time marker → Past Simple required.',
        '"go" is irregular → Past Simple form is "went".',
      ]
    },
    xpReward: 15, hpPenalty: 10
  },
  {
    id: 't3', type: 'fill-blank', topic: 'tenses', difficulty: 'easy',
    prompt: 'I ___ (watch) TV when you called.',
    answer: 'was watching',
    explanation: {
      triggers: ['when you called'],
      bullets: [
        '"When you called" = interrupting action (Past Simple).',
        'The background action uses Past Continuous: was/were + -ing.',
      ]
    },
    xpReward: 15, hpPenalty: 15
  },
  {
    id: 't4', type: 'mcq', topic: 'tenses', difficulty: 'medium',
    prompt: 'By 2020, she ___ her novel.',
    options: ['finished', 'has finished', 'had finished', 'was finishing'],
    answer: 'had finished',
    explanation: {
      triggers: ['By 2020'],
      bullets: [
        '"By [past time]" signals completion before a reference point.',
        'Use Past Perfect: had + past participle.',
      ]
    },
    xpReward: 20, hpPenalty: 20
  },
  {
    id: 't5', type: 'fix', topic: 'tenses', difficulty: 'medium',
    prompt: 'I have seen that movie last week.',
    answer: 'I saw that movie last week.',
    explanation: {
      triggers: ['last week'],
      bullets: [
        '"Last week" is a specific past time → Past Simple, not Present Perfect.',
        'Present Perfect cannot be used with a definite past time expression.',
      ]
    },
    xpReward: 20, hpPenalty: 15
  },
  {
    id: 't6', type: 'mcq', topic: 'tenses', difficulty: 'hard',
    prompt: 'She realised she ___ her keys at home.',
    options: ['left', 'has left', 'had left', 'was leaving'],
    answer: 'had left',
    explanation: {
      triggers: ['realised'],
      bullets: [
        '"Realised" is the main past event.',
        'Leaving keys happened BEFORE realising → Past Perfect: "had left".',
      ]
    },
    xpReward: 25, hpPenalty: 20
  },

  // ─────────────────────── ARTICLES ───────────────────────
  {
    id: 'a1', type: 'mcq', topic: 'articles', difficulty: 'easy',
    prompt: 'I saw ___ elephant at the zoo.',
    options: ['a', 'an', 'the', '—'],
    answer: 'an',
    explanation: {
      triggers: ['elephant'],
      bullets: [
        'First mention of a singular countable noun → indefinite article.',
        '"Elephant" starts with a vowel sound /ɛ/ → use "an".',
      ]
    },
    xpReward: 10, hpPenalty: 10
  },
  {
    id: 'a2', type: 'fix', topic: 'articles', difficulty: 'easy',
    prompt: 'She plays a piano beautifully.',
    answer: 'She plays the piano beautifully.',
    explanation: {
      triggers: ['piano'],
      bullets: [
        'Musical instruments use "the" — it refers to the instrument in general.',
        '"a piano" implies one specific piano; "the piano" means the instrument concept.',
      ]
    },
    xpReward: 15, hpPenalty: 10
  },
  {
    id: 'a3', type: 'mcq', topic: 'articles', difficulty: 'medium',
    prompt: '___ Sun rises in the east.',
    options: ['A', 'An', 'The', '—'],
    answer: 'The',
    explanation: {
      triggers: ['Sun'],
      bullets: [
        'The Sun is unique — there is only one → use "the".',
        'Unique nouns (the Moon, the Earth, the Internet) take "the".',
      ]
    },
    xpReward: 15, hpPenalty: 15
  },
  {
    id: 'a4', type: 'fix', topic: 'articles', difficulty: 'medium',
    prompt: 'He was elected as the president of the company.',
    answer: 'He was elected as president of the company.',
    explanation: {
      triggers: ['elected', 'president'],
      bullets: [
        'After "elected/appointed/named as" + unique role → no article.',
        'Compare: "He is a president" (general) vs "elected president" (role).',
      ]
    },
    xpReward: 20, hpPenalty: 20
  },

  // ─────────────────────── MODALS ───────────────────────
  {
    id: 'm1', type: 'mcq', topic: 'modals', difficulty: 'easy',
    prompt: 'You ___ smoke here. It\'s not allowed.',
    options: ['mustn\'t', 'don\'t have to', 'shouldn\'t', 'needn\'t'],
    answer: 'mustn\'t',
    explanation: {
      triggers: ['not allowed'],
      bullets: [
        '"Mustn\'t" = prohibition (it is forbidden).',
        '"Don\'t have to" = no obligation (but it\'s allowed) — wrong here.',
      ]
    },
    xpReward: 15, hpPenalty: 15
  },
  {
    id: 'm2', type: 'fill-blank', topic: 'modals', difficulty: 'medium',
    prompt: 'She ___ be at home — her lights are on. (logical deduction)',
    answer: 'must',
    explanation: {
      triggers: ['her lights are on', 'logical deduction'],
      bullets: [
        '"Must" expresses strong deduction based on evidence.',
        'Evidence: lights on → conclusion: she is home.',
      ]
    },
    xpReward: 20, hpPenalty: 15
  },
  {
    id: 'm3', type: 'mcq', topic: 'modals', difficulty: 'hard',
    prompt: 'You ___ have told me earlier! I would have helped.',
    options: ['should', 'could', 'would', 'must'],
    answer: 'should',
    explanation: {
      triggers: ['would have helped'],
      bullets: [
        '"Should have + past participle" = criticism of a past omission.',
        'The speaker is expressing regret/blame about something not done.',
      ]
    },
    xpReward: 25, hpPenalty: 20
  },

  // ─────────────────────── PREPOSITIONS ───────────────────────
  {
    id: 'p1', type: 'mcq', topic: 'prepositions', difficulty: 'easy',
    prompt: 'The meeting is ___ Monday morning.',
    options: ['in', 'at', 'on', 'by'],
    answer: 'on',
    explanation: {
      triggers: ['Monday morning'],
      bullets: [
        'Use "on" for specific days and dates.',
        'Pattern: on Monday / on 5th March / on Christmas Day.',
      ]
    },
    xpReward: 10, hpPenalty: 10
  },
  {
    id: 'p2', type: 'fix', topic: 'prepositions', difficulty: 'easy',
    prompt: 'I will arrive in 3 o\'clock.',
    answer: 'I will arrive at 3 o\'clock.',
    explanation: {
      triggers: ['3 o\'clock'],
      bullets: [
        'Use "at" for precise times: at 3 o\'clock, at noon, at midnight.',
        '"In" is for longer periods: in the morning, in March, in 2024.',
      ]
    },
    xpReward: 15, hpPenalty: 10
  },

  // ───────────────────── PASSIVE VOICE ──────────────────────
  {
    id: 'pv1', type: 'mcq', topic: 'passive', difficulty: 'easy',
    prompt: 'The cake ___ by my mum every Sunday.',
    options: ['bakes', 'is baking', 'is baked', 'baked'],
    answer: 'is baked',
    explanation: {
      triggers: ['by my mum'],
      bullets: [
        '"By my mum" signals the agent → passive construction.',
        'Present Simple Passive: is/are + past participle.',
      ]
    },
    xpReward: 15, hpPenalty: 15
  },
  {
    id: 'pv2', type: 'rewrite', topic: 'passive', difficulty: 'medium',
    prompt: 'Rewrite in passive voice: "Shakespeare wrote Hamlet."',
    answer: 'Hamlet was written by Shakespeare.',
    explanation: {
      triggers: ['Shakespeare', 'Hamlet'],
      bullets: [
        'Object becomes subject: "Hamlet" moves to front.',
        'Past Simple Passive: was/were + past participle ("written").',
        'Original subject becomes "by [agent]".',
      ]
    },
    xpReward: 25, hpPenalty: 20
  },

  // ─────────────────────── CONDITIONALS ───────────────────────
  {
    id: 'c1', type: 'mcq', topic: 'conditionals', difficulty: 'easy',
    prompt: 'If you heat water to 100°C, it ___.',
    options: ['boils', 'will boil', 'would boil', 'boiled'],
    answer: 'boils',
    explanation: {
      triggers: ['heat water to 100°C'],
      bullets: [
        'Scientific fact → Zero Conditional.',
        'Both clauses use Present Simple for universal truths.',
      ]
    },
    xpReward: 15, hpPenalty: 15
  },
  {
    id: 'c2', type: 'fill-blank', topic: 'conditionals', difficulty: 'medium',
    prompt: 'If I ___ (be) rich, I would travel the world.',
    answer: 'were',
    explanation: {
      triggers: ['would travel', 'rich'],
      bullets: [
        'Imaginary/hypothetical situation → Second Conditional.',
        '"If I were" (subjunctive) is the formal/correct form, though "was" is accepted in informal speech.',
      ]
    },
    xpReward: 20, hpPenalty: 20
  },
  {
    id: 'c3', type: 'fix', topic: 'conditionals', difficulty: 'hard',
    prompt: 'If she would have studied, she would have passed.',
    answer: 'If she had studied, she would have passed.',
    explanation: {
      triggers: ['would have passed'],
      bullets: [
        'Third Conditional = regret about the past.',
        'The "if" clause NEVER uses "would" → use Past Perfect "had studied".',
      ]
    },
    xpReward: 25, hpPenalty: 20
  },

  // ─────────────── RELATIVE CLAUSES ──────────────────────
  {
    id: 'rc1', type: 'mcq', topic: 'relative-clauses', difficulty: 'easy',
    prompt: 'The woman ___ called you is my sister.',
    options: ['which', 'who', 'whose', 'whom'],
    answer: 'who',
    explanation: {
      triggers: ['woman'],
      bullets: [
        '"Woman" is a person → use "who" (subject relative pronoun).',
        '"Which" is for things, not people.',
      ]
    },
    xpReward: 10, hpPenalty: 10
  },
  {
    id: 'rc2', type: 'fix', topic: 'relative-clauses', difficulty: 'medium',
    prompt: 'That\'s the house who I want to buy.',
    answer: 'That\'s the house that I want to buy.',
    explanation: {
      triggers: ['house'],
      bullets: [
        '"House" is a thing → never use "who".',
        'Use "that" or "which" for things.',
      ]
    },
    xpReward: 20, hpPenalty: 15
  },

  // ─────────────── REPORTED SPEECH ───────────────────────
  {
    id: 'rs1', type: 'mcq', topic: 'reported-speech', difficulty: 'medium',
    prompt: 'He said: "I am tired." → He said he ___ tired.',
    options: ['is', 'was', 'were', 'has been'],
    answer: 'was',
    explanation: {
      triggers: ['said'],
      bullets: [
        'Reported speech shifts tense one step back.',
        'Present Simple "am" → Past Simple "was".',
      ]
    },
    xpReward: 20, hpPenalty: 20
  },
  {
    id: 'rs2', type: 'fill-blank', topic: 'reported-speech', difficulty: 'hard',
    prompt: '"I will call you tomorrow," she said. → She said she ___ call me the following day.',
    answer: 'would',
    explanation: {
      triggers: ['will', 'tomorrow'],
      bullets: [
        '"Will" shifts to "would" in reported speech.',
        '"Tomorrow" shifts to "the following day" when reporting.',
      ]
    },
    xpReward: 25, hpPenalty: 20
  },

  // ═════════════════ BOSS QUESTIONS ═════════════════════
  {
    id: 'boss1', type: 'fill-blank', topic: 'conditionals', difficulty: 'hard',
    isBoss: true, bossPartOf: 'boss-cond',
    prompt: 'Boss: If she ___ (study) harder last year, she ___ (pass) the exam.',
    answer: 'had studied / would have passed',
    explanation: {
      triggers: ['last year', 'studied', 'passed'],
      bullets: [
        'Past regret → Third Conditional.',
        '"If" clause: Past Perfect "had studied".',
        'Result clause: "would have" + past participle "passed".',
      ]
    },
    xpReward: 50, hpPenalty: 30
  },
  {
    id: 'boss2', type: 'rewrite', topic: 'reported-speech', difficulty: 'hard',
    isBoss: true, bossPartOf: 'boss-rep',
    prompt: 'Boss: Convert to reported speech: "I have been working here for five years," she told us.',
    answer: 'She told us that she had been working there for five years.',
    explanation: {
      triggers: ['have been', 'five years', 'here'],
      bullets: [
        'Present Perfect Continuous → Past Perfect Continuous.',
        '"Here" → "there" (pronoun/adverb shift).',
        '"I" → "she" (pronoun shift).',
      ]
    },
    xpReward: 50, hpPenalty: 30
  },
  {
    id: 'boss3', type: 'fix', topic: 'tenses', difficulty: 'hard',
    isBoss: true, bossPartOf: 'boss-tense',
    prompt: 'Boss: By the time we arrived, the presentation already starts and everyone has taken their seats.',
    answer: 'By the time we arrived, the presentation had already started and everyone had taken their seats.',
    explanation: {
      triggers: ['By the time', 'arrived', 'starts', 'has taken'],
      bullets: [
        '"By the time we arrived" = reference past point.',
        'Actions before that point → Past Perfect: "had started", "had taken".',
        'Both verbs must be Past Perfect to show they happened earlier.',
      ]
    },
    xpReward: 60, hpPenalty: 30
  },
];

export const dungeonTopics: { id: Topic; label: string; emoji: string }[] = [
  { id: 'tenses', label: 'Tenses', emoji: '⏰' },
  { id: 'articles', label: 'Articles', emoji: '📰' },
  { id: 'modals', label: 'Modal Verbs', emoji: '💬' },
  { id: 'prepositions', label: 'Prepositions', emoji: '📍' },
  { id: 'passive', label: 'Passive Voice', emoji: '🔄' },
  { id: 'conditionals', label: 'Conditionals', emoji: '🔀' },
  { id: 'relative-clauses', label: 'Relative Clauses', emoji: '🔗' },
  { id: 'reported-speech', label: 'Reported Speech', emoji: '💭' },
];

// Returns questions for a given topic, shuffled with boss at the end
export function getDungeonRun(topic: Topic, count: number = 8): DungeonQuestion[] {
  const normal = dungeonQuestions.filter(q => q.topic === topic && !q.isBoss);
  const boss = dungeonQuestions.filter(q => q.topic === topic && q.isBoss);
  const shuffled = [...normal].sort(() => Math.random() - 0.5).slice(0, count - boss.length);
  return [...shuffled, ...boss];
}
