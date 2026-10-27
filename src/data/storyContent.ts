/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StoryPage {
  id: number;
  label: string;
  entryDate: string;
  caseRef: string;
  placeholderText: string;
  marginNote: string;
}

export interface ExperienceContent {
  warning: {
    heading: string;
    stampText: string;
    subheading: string;
    placeholderItems: string[];
    buttonText: string;
  };
  story: {
    chapterTitle: string;
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

export const EXPERIENCE_CONTENT: ExperienceContent = {
  warning: {
    heading: 'BEFORE YOU PROCEED',
    stampText: 'WARNING // CLASSIFIED',
    subheading: 'CONTENT ADVISORY FOR CASE FILE 1311',
    placeholderItems: [
      '[EDITABLE WARNING 1: Insert content advisory regarding psychological suspense / case tension]',
      '[EDITABLE WARNING 2: Insert trigger or thematic disclosure appropriate for the upcoming narrative]',
      '[EDITABLE WARNING 3: Reserved for personal boundary / inside jokes or specific reading notes]',
    ],
    buttonText: 'enter anyways',
  },
  story: {
    chapterTitle: 'HER STORY',
    pages: [
      {
        id: 1,
        label: 'RECORD NO. 01',
        entryDate: 'OCTOBER 27 // ARCHIVED',
        caseRef: 'EXHIBIT 1311-A',
        placeholderText:
          '[EDITABLE STORY CONTENT — PAGE 1]\n\nThis is a designated placeholder for the first chapter of the story. Replace this text with the opening narrative, initial discovery, or investigation logs when ready.\n\nThe layout preserves authentic manuscript margins, forensic ink stains, and tactile evidence cues.',
        marginNote: '// note: timeline matches initial surveillance report',
      },
      {
        id: 2,
        label: 'RECORD NO. 02',
        entryDate: 'NOVEMBER 04 // INTERCEPTED',
        caseRef: 'EXHIBIT 1311-B',
        placeholderText:
          '[EDITABLE STORY CONTENT — PAGE 2]\n\nThis is a designated placeholder for the second chapter of the story. Insert suspect encounters, clue deciphering, or personal reflections here.\n\nAll formatting, line heights, and aged-paper textures automatically adjust to your custom text.',
        marginNote: '// crossed-out lead: do not verify through official channels',
      },
      {
        id: 3,
        label: 'RECORD NO. 03',
        entryDate: 'NOVEMBER 13 // CRITICAL',
        caseRef: 'EXHIBIT 1311-C',
        placeholderText:
          '[EDITABLE STORY CONTENT — PAGE 3]\n\nThis is a designated placeholder for the climax or conclusion of the manuscript. The narrative here directly bridges the case into the final discovery awaiting inside the envelope.\n\nOnce read, the reader is prompted to examine the sealed evidence.',
        marginNote: '// final recovered dossier fragment before closure',
      },
    ],
    finalPageCta: 'proceed to final evidence \u2192',
  },
  envelope: {
    label: 'FINAL EVIDENCE',
    sealMonogram: '1311',
    buttonText: 'tap to reveal the letter',
    statementHeading: 'LAST REPORTED STATEMENT',
    statementPlaceholder:
      '[LAST REPORTED STATEMENT]\n\nReserved for the secret admirer’s final statement.\n(Replace this editable block with your statement text when ready.)',
    letterHeading: 'LETTER CONTENT',
    letterPlaceholder:
      '[LETTER CONTENT]\n\nReserved for the personal letter, birthday wishes, and humorous roast.\n(Replace this editable block with your birthday letter text when ready.)',
  },
};
