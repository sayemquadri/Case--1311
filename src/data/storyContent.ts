/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PageInteraction {
  type: 'window' | 'map' | 'bookmark' | 'casenumber' | 'stamp' | 'tornpaper' | 'calendar' | 'turnpage';
  promptLabel: string;
  revealedText: string;
  metadata?: Record<string, string | string[]>;
}

export interface ContentWarningData {
  heading: string;
  stampText: string;
  subheading: string;
  disclosures: string[];
  authorNote: string[];
  buttonText: string;
}

export interface PageVisualMeta {
  rotationDeg: number;
  tactileDetail?: 'brass-clip' | 'washi-tape' | 'silk-ribbon' | 'wax-seal-scrap' | 'torn-edge';
  accentNote?: string;
  exhibitCode?: string;
}

export interface StoryPage {
  id: number;
  label: string;
  subtitle: string;
  caseRef: string;
  paragraphs: string[];
  interaction: PageInteraction;
  marginNote?: string;
  visual?: PageVisualMeta;
}

export interface ExperienceContent {
  warning: ContentWarningData;
  story: {
    seriesTitle: string;
    chapterTitle: string;
    caseNumber: string;
    pages: StoryPage[];
    finalPageCta: string;
  };
  envelope: {
    label: string;
    sealMonogram: string;
    buttonText: string;
    statementHeading: string;
    statementPlaceholder: string;
    letterHeading: string;
    letterPlaceholder: string;
  };
}

export const PERSONAL_BIRTHDAY_LETTER: string[] = [
  "HAPPYYYY BIRTHDAYYYY SANOBERRR! 😼🩵",
  "I hope this year brings you countless More Books and ofcccc little reasons to smile, stories worth staying up late for, books that leave you speechless, and memories (like me) you'll want to write about a thousand times.",
  "I hope you get to visit all those places you've imagined (me bhi chlunga plz 😭), walk through unfamiliar streets, discover beautiful little corners of the world, and collect experiences that make you feel truly alive. I hope you never run out of curiosity, never lose your love for writing n reading 💥, and never stop dreaming about the things you haven't experienced yet.",
  "May you always have the courage to explore your own choices, the freedom to discover yourself, and the comfort of knowing that you are loved and appreciated. I hope life is gentle with you, that you meet people (like me ofc 🙄) who understand the little things about you, and that you never have to question your worth or your place in someone's life.",
  "And amidst all these wishes, there's one little thing I want to confess. (I'm sorry)",
  "You've been a special person to me for longer than you probably realise. Five years have passed, so much has changed, and yet there's still a certain fondness I can't quite put into words. I genuinely enjoy knowing you, listening to your thoughts, discovering your little interests and sharing these ordinary conversations with you. I'm glad our paths crossed, and even gladder that they crossed again.",
  "I don't know what the future holds, and I'm not asking it to promise me anything. I just hope you get the beautiful life you deserve, whether that means adventures you've always dreamed of 😼 , stories you've yet to write (plz start writing something it's cool), or simply peaceful days surrounded by the people you love. (even on days when they drive you crazy 😭)",
  "Keep reading, keep writing, keep exploring, and never stop being curious about this ridiculously enormous world.",
  "Here's to another year of being wonderfully, unapologetically YOU.",
  "Happy Birthday once again, Sanober. Stay happy, stay blessed with my presence, and take care of that little heart of yours. 🩵",
  "and I LOVE YOU SO MUCHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH (IM SORRY 😭😭💔🥀) I just hope that you'll be lovedddddd! n loved so muchhhh! hum na honge to koi humsa hoga 😞",
  "I wish u beautiful life and absolute peak life experiences 😼🩷",
  "(I'll be fasting from Saturday cz i think it's romantic)",
];

export const EXPERIENCE_CONTENT: ExperienceContent = {
  warning: {
    heading: 'CONTENT WARNING',
    stampText: 'CASE 1311 // RESTRICTED',
    subheading: 'Before you turn the first page...',
    disclosures: [
      'Dark themes and fictional mystery elements.',
      'Mysterious stains and intriguing journal entries.',
      'References to curious habits and unwritten stories.',
      'Atmospheric tension and suspicious diary entries.',
      'An unreasonable amount of thought and a warm birthday surprise.',
    ],
    authorNote: [],
    buttonText: 'ENTER ANYWAYS',
  },
  story: {
    seriesTitle: 'THE GIRL WHO KEPT A THOUSAND STORIES',
    chapterTitle: 'HER STORY',
    caseNumber: 'CASE 1311 · A BIRTHDAY MYSTERY',
    pages: [
      {
        id: 1,
        label: 'PAGE 1 — THE HOUSE OF WARM LIGHT',
        subtitle: 'ENTRY BEGINS',
        caseRef: 'OCTOBER 14',
        paragraphs: [
          'There is something strange about familiar places. You can know every corner of a house, every sound of a door, every little routine, and still discover something new about it.',
          'This house is full of warmth. Someone always notices when I return late. Someone asks whether I\'ve eaten. There are familiar voices, familiar arguments over little things, and people who somehow know when something is wrong.',
          'I love that.',
          'But sometimes I wonder what the world looks like beyond the roads I already know.',
        ],
        interaction: {
          type: 'window',
          promptLabel: 'Look through the warm window',
          revealedText: 'Some places hold you close, and some stories make you want to wander.',
        },
        marginNote: '— written late by the quiet lamp',
        visual: {
          rotationDeg: -0.5,
          tactileDetail: 'brass-clip',
        },
      },
      {
        id: 2,
        label: 'PAGE 2 — CONTINUATION',
        subtitle: 'HER THOUGHTS',
        caseRef: 'OCTOBER 14 · CONTINUATION',
        paragraphs: [
          'I don\'t think wanting to see more means loving what I have any less.',
          'Perhaps that\'s the thing about a good story. It doesn\'t make you hate the chapter you\'re in. It simply makes you curious about the next one.',
          'And perhaps a little curiosity is all a person needs to begin an adventure.',
        ],
        interaction: {
          type: 'tornpaper',
          promptLabel: 'Turn the delicate page',
          revealedText: 'A little curiosity is all a person needs to begin an adventure.',
        },
        marginNote: '— a little curiosity is all a person needs',
      },
      {
        id: 3,
        label: 'PAGE 3 — THE SECRET ATLAS',
        subtitle: 'ENTRY BEGINS',
        caseRef: 'OCTOBER 28',
        paragraphs: [
          'I have a habit of collecting places I haven\'t visited.',
          'Lisbon at sunset. Prague in the rain. Vienna when the streets are quiet. Little bookshops hidden between unfamiliar streets. Train windows, strange cafés, and cities where nobody knows your name.',
          'I\'ve drawn routes on scraps of paper and tucked them between the pages of books.',
          'Sometimes I imagine choosing a destination simply because it sounds beautiful.',
        ],
        interaction: {
          type: 'map',
          promptLabel: 'Unfold the scrap of paper',
          revealedText: 'Lisbon at sunset. Prague in the rain. Vienna when the streets are quiet.',
        },
        marginNote: '— routes drawn on scraps of paper',
        visual: {
          rotationDeg: 0.5,
          tactileDetail: 'silk-ribbon',
        },
      },
      {
        id: 4,
        label: 'PAGE 4 — CONTINUATION',
        subtitle: 'HER PREFERENCES',
        caseRef: 'OCTOBER 28 · CONTINUATION',
        paragraphs: [
          'I wonder whether the best adventures begin with a carefully planned journey or with a completely unreasonable decision.',
          'I\'ve always liked having my own little preferences. The books I pick up, the things I find beautiful, the colours I choose, the small details that make a place feel like mine.',
          'Maybe one day I\'ll find out what it feels like to see all those places.',
          'Until then, the map stays folded inside this diary.',
        ],
        interaction: {
          type: 'bookmark',
          promptLabel: 'Inspect the folded map',
          revealedText: 'Until then, the map stays folded inside this diary.',
        },
        marginNote: '— kept safe inside this diary',
      },
      {
        id: 5,
        label: 'PAGE 5 — THE GIRL WHO NOTICES EVERYTHING',
        subtitle: 'ENTRY BEGINS',
        caseRef: 'NOVEMBER 06',
        paragraphs: [
          'I used to think mysteries were about finding the person who did something terrible.',
          'Lately, I\'ve started thinking they\'re about noticing the things everyone else overlooks.',
          'A sentence that sounds ordinary but means something else. A character who seems suspicious for entirely the wrong reason. A book you pick up casually and somehow cannot put down until two in the morning.',
          'And then there are people.',
          'Some people have a way of making ordinary conversations interesting.',
        ],
        interaction: {
          type: 'stamp',
          promptLabel: 'Notice the quiet details',
          revealedText: 'Some people have a way of making ordinary conversations interesting.',
        },
        marginNote: '— noticing the things everyone else overlooks',
      },
      {
        id: 6,
        label: 'PAGE 6 — CONTINUATION',
        subtitle: 'A NEW MYSTERY',
        caseRef: 'NOVEMBER 06 · CONTINUATION',
        paragraphs: [
          'They remember strange little details, have opinions about fictional characters, and can turn a simple book recommendation into an entire reading list.',
          'I wonder if they realise how much personality hides in those little things.',
          'Anyway, I have a new mystery to solve.',
          'Someone has been leaving clues.',
          'And whoever it is has a rather dramatic sense of timing.',
          'I should probably stop reading mysteries before bed.',
        ],
        interaction: {
          type: 'turnpage',
          promptLabel: 'Read the clue trail',
          revealedText: 'Someone has been leaving clues... with a rather dramatic sense of timing.',
        },
        marginNote: '— reading mysteries past 2:00 a.m.',
      },
      {
        id: 7,
        label: 'PAGE 7 — THE FINAL CHAPTER',
        subtitle: 'ENTRY BEGINS',
        caseRef: 'NOVEMBER 13',
        paragraphs: [
          'I\'ve finally understood the mystery.',
          'The clues were never leading to a crime scene. They were leading to a story.',
          'A story about books, little adventures, familiar places, unexpected conversations, and the curious things that make someone unmistakably themselves.',
          'I think I\'ve spent too long trying to make this look like a grand mystery.',
          'The truth is much simpler.',
          'Some occasions deserve more than an ordinary greeting.',
        ],
        interaction: {
          type: 'casenumber',
          promptLabel: 'Reveal the true nature of the story',
          revealedText: 'The clues were never leading to a crime scene. They were leading to a story.',
        },
        marginNote: '— some occasions deserve more than an ordinary greeting',
      },
      {
        id: 8,
        label: 'PAGE 8 — THE LAST CLUE',
        subtitle: 'THE FINAL PASSWORD',
        caseRef: 'NOVEMBER 13 · FINAL ENTRY',
        paragraphs: [
          'Some people deserve a little effort, a little imagination, and something they can smile about long after the day is over.',
          'So I\'ve prepared one last envelope.',
          'No more clues after this. No more suspicious notes. No more dramatic detective work.',
          'Well... perhaps just one final password.',
          'If you\'ve made it this far, you\'ve earned the right to open it.',
        ],
        interaction: {
          type: 'calendar',
          promptLabel: 'Inspect the calendar clue',
          revealedText: '13 NOVEMBER circled in crimson. The password is 1311.',
        },
        marginNote: '— the password is 1311',
      },
    ],
    finalPageCta: 'examine sealed envelope (1311) →',
  },
  envelope: {
    label: 'FINAL EVIDENCE // DOSSIER 1311',
    sealMonogram: '1311',
    buttonText: 'tap to break seal & open letter',
    statementHeading: 'LAST REPORTED STATEMENT',
    statementPlaceholder: '',
    letterHeading: 'PERSONAL BIRTHDAY LETTER',
    letterPlaceholder: PERSONAL_BIRTHDAY_LETTER.join('\n\n'),
  },
};

export interface DiarySpread {
  id: number;
  entryDate: string;
  entryTitle: string;
  leftPage: {
    pageNumber: number;
    greetingPrefix: string;
    obscuredNameNote: string;
    title: string;
    text: string[];
    handwrittenSignoff?: string;
  };
  rightPage: {
    pageNumber: number;
    title: string;
    text: string[];
    isContinuation: boolean;
    handwrittenSignoff?: string;
    isFinalSpread?: boolean;
    exhibitTag?: string;
    caption?: string;
    annotationNotes?: string[];
    photoType?: 'house' | 'map' | 'midnight' | 'cipher';
    hiddenPasswordClue?: {
      code: string;
      label: string;
      instruction: string;
      handwrittenLines?: string[];
      calendarDetail?: {
        month: string;
        circledDay: number;
        caption: string;
      };
    };
  };
}

export const DIARY_SPREADS: DiarySpread[] = [
  {
    id: 1,
    entryDate: 'OCTOBER 14',
    entryTitle: 'THE HOUSE OF WARM LIGHT',
    leftPage: {
      pageNumber: 1,
      greetingPrefix: "hii, I'm",
      obscuredNameNote: '[TORN EDGE / CRIMSON STAIN]',
      title: 'PAGE 1 — THE HOUSE OF WARM LIGHT',
      text: [
        'There is something strange about familiar places. You can know every corner of a house, every sound of a door, every little routine, and still discover something new about it.',
        'This house is full of warmth. Someone always notices when I return late. Someone asks whether I\'ve eaten. There are familiar voices, familiar arguments over little things, and people who somehow know when something is wrong.',
        'I love that.',
        'But sometimes I wonder what the world looks like beyond the roads I already know.',
      ],
      handwrittenSignoff: '— written late by the quiet lamp',
    },
    rightPage: {
      pageNumber: 2,
      title: 'PAGE 2 — CONTINUATION',
      isContinuation: true,
      text: [
        'I don\'t think wanting to see more means loving what I have any less.',
        'Perhaps that\'s the thing about a good story. It doesn\'t make you hate the chapter you\'re in. It simply makes you curious about the next one.',
        'And perhaps a little curiosity is all a person needs to begin an adventure.',
      ],
      handwrittenSignoff: '— a little curiosity is all it takes',
    },
  },
  {
    id: 2,
    entryDate: 'OCTOBER 28',
    entryTitle: 'THE SECRET ATLAS',
    leftPage: {
      pageNumber: 3,
      greetingPrefix: "hii, I'm",
      obscuredNameNote: '[TORN EDGE / CRIMSON STAIN]',
      title: 'PAGE 3 — THE SECRET ATLAS',
      text: [
        'I have a habit of collecting places I haven\'t visited.',
        'Lisbon at sunset. Prague in the rain. Vienna when the streets are quiet. Little bookshops hidden between unfamiliar streets. Train windows, strange cafés, and cities where nobody knows your name.',
        'I\'ve drawn routes on scraps of paper and tucked them between the pages of books.',
        'Sometimes I imagine choosing a destination simply because it sounds beautiful.',
      ],
      handwrittenSignoff: '— routes drawn on scraps of paper',
    },
    rightPage: {
      pageNumber: 4,
      title: 'PAGE 4 — CONTINUATION',
      isContinuation: true,
      text: [
        'I wonder whether the best adventures begin with a carefully planned journey or with a completely unreasonable decision.',
        'I\'ve always liked having my own little preferences. The books I pick up, the things I find beautiful, the colours I choose, the small details that make a place feel like mine.',
        'Maybe one day I\'ll find out what it feels like to see all those places.',
        'Until then, the map stays folded inside this diary.',
      ],
      handwrittenSignoff: '— the map stays folded inside this diary',
    },
  },
  {
    id: 3,
    entryDate: 'NOVEMBER 06',
    entryTitle: 'THE GIRL WHO NOTICES EVERYTHING',
    leftPage: {
      pageNumber: 5,
      greetingPrefix: "hii, I'm",
      obscuredNameNote: '[TORN EDGE / CRIMSON STAIN]',
      title: 'PAGE 5 — THE GIRL WHO NOTICES EVERYTHING',
      text: [
        'I used to think mysteries were about finding the person who did something terrible.',
        'Lately, I\'ve started thinking they\'re about noticing the things everyone else overlooks.',
        'A sentence that sounds ordinary but means something else. A character who seems suspicious for entirely the wrong reason. A book you pick up casually and somehow cannot put down until two in the morning.',
        'And then there are people.',
        'Some people have a way of making ordinary conversations interesting.',
      ],
      handwrittenSignoff: '— noticing what everyone overlooks',
    },
    rightPage: {
      pageNumber: 6,
      title: 'PAGE 6 — CONTINUATION',
      isContinuation: true,
      text: [
        'They remember strange little details, have opinions about fictional characters, and can turn a simple book recommendation into an entire reading list.',
        'I wonder if they realise how much personality hides in those little things.',
        'Anyway, I have a new mystery to solve.',
        'Someone has been leaving clues.',
        'And whoever it is has a rather dramatic sense of timing.',
        'I should probably stop reading mysteries before bed.',
      ],
      handwrittenSignoff: '— reading mysteries past 2:00 a.m.',
    },
  },
  {
    id: 4,
    entryDate: 'NOVEMBER 13',
    entryTitle: 'THE FINAL CHAPTER',
    leftPage: {
      pageNumber: 7,
      greetingPrefix: "hii, I'm",
      obscuredNameNote: '[TORN EDGE / CRIMSON STAIN]',
      title: 'PAGE 7 — THE FINAL CHAPTER',
      text: [
        'I\'ve finally understood the mystery.',
        'The clues were never leading to a crime scene. They were leading to a story.',
        'A story about books, little adventures, familiar places, unexpected conversations, and the curious things that make someone unmistakably themselves.',
        'I think I\'ve spent too long trying to make this look like a grand mystery.',
        'The truth is much simpler.',
        'Some occasions deserve more than an ordinary greeting.',
      ],
      handwrittenSignoff: '— leading to a story, not a crime',
    },
    rightPage: {
      pageNumber: 8,
      title: 'PAGE 8 — THE LAST CLUE',
      isContinuation: true,
      isFinalSpread: true,
      text: [
        'Some people deserve a little effort, a little imagination, and something they can smile about long after the day is over.',
        'So I\'ve prepared one last envelope.',
        'No more clues after this. No more suspicious notes. No more dramatic detective work.',
        'Well... perhaps just one final password.',
        'If you\'ve made it this far, you\'ve earned the right to open it.',
      ],
      handwrittenSignoff: '— the case is yours to open',
      hiddenPasswordClue: {
        code: '1311',
        label: 'PASSWORD: 1311',
        instruction: 'Enter passcode 1311 or tap below to unlock the envelope',
        handwrittenLines: [
          '“Every mystery has a key.',
          'This one was hiding in plain sight.',
          'Remember the date that started the case?”',
        ],
        calendarDetail: {
          month: 'NOVEMBER',
          circledDay: 13,
          caption: '13 NOVEMBER circled in crimson',
        },
      },
    },
  },
];
