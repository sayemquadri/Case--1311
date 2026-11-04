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
  exhibitCode: string;
  tactileDetail: 'brass-clip' | 'washi-tape' | 'silk-ribbon' | 'wax-seal-scrap' | 'evidence-pin' | 'torn-edge' | 'thread-stitch' | 'red-stamp';
  accentNote?: string;
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

export const EXPERIENCE_CONTENT: ExperienceContent = {
  warning: {
    heading: 'READER ADVISORY',
    stampText: 'CASE 1311 // RESTRICTED',
    subheading: 'CONTENT ADVISORY',
    disclosures: [
      'Homicide (1 victim, unidentified)',
      'Missing evidence',
      'Psychological suspense',
      'Unreliable narrator',
      'One suspect who knows you well',
    ],
    authorNote: [],
    buttonText: 'CHECK THE FOOTAGE →',
  },
  story: {
    seriesTitle: 'THE GIRL IN THE BEAUTIFUL CAGE',
    chapterTitle: 'HER STORY',
    caseNumber: 'CASE 1311 · A PSYCHOLOGICAL MYSTERY',
    pages: [
      {
        id: 1,
        label: 'PAGE 01 — A HOUSE FULL OF LIGHT',
        subtitle: 'EXHIBIT 1311-01 · THE ENCLOSURE',
        caseRef: 'DOSSIER 1311 // FILE 01',
        paragraphs: [
          'There once lived a girl in a house that had never given anyone a reason to call it a prison.',
          'It had warm lights, familiar voices, photographs on the walls, and the particular kind of silence that belongs to places where everybody knows one another\'s habits.',
          'Someone always noticed when she came home late.',
          'Someone always asked whether she\'d eaten.',
          'There were rules, of course. There were expectations, little traditions that repeated themselves until nobody could remember who had started them. But there was love, too. The ordinary, unremarkable kind that rarely appears in stories because it doesn\'t know how to make a grand entrance.',
          'The girl loved her family.',
          'That was the inconvenient detail.',
          'It would have made for a simpler mystery if she hadn\'t.',
          'Sometimes, though, she looked at the house from the inside and imagined how it might appear from the outside: its beautiful rooms, its illuminated windows, its familiar shape against the night.',
          'A beautiful cage, she once thought.',
          'Then she went on with her evening.',
          'She never decided whether the thought was a complaint.',
          'Or simply a thought.',
          'And perhaps that was why it stayed with her.',
        ],
        interaction: {
          type: 'window',
          promptLabel: 'Tap the window',
          revealedText: 'Some things can be loved without being understood completely.',
          metadata: {
            detail: 'A thin line of crimson appears in the glass, like a scratch that wasn\'t there a moment ago.',
          },
        },
        marginNote: '// note: illuminated from within; no bars on the glass',
        visual: {
          rotationDeg: -0.5,
          exhibitCode: 'EXHIBIT 1311-A',
          tactileDetail: 'brass-clip',
          accentNote: 'Found tucked inside family album',
        },
      },
      {
        id: 2,
        label: 'PAGE 02 — THE MAP OF ELSEWHERE',
        subtitle: 'EXHIBIT 1311-02 · UNVISITED COORDINATES',
        caseRef: 'DOSSIER 1311 // FILE 02',
        paragraphs: [
          'The girl collected places she had never been.',
          'Not necessarily in the form of maps or photographs. Sometimes, a place was only a name she had heard in passing. Sometimes, it was a street described in a book, a city glimpsed through somebody else\'s camera, or a little café she imagined sitting in while rain gathered on the pavement outside.',
          'She could make a journey out of almost nothing.',
          'A few pictures. A paragraph. A conversation that lasted five minutes longer than expected.',
          'She liked the thought of unfamiliar streets and the private freedom of being somewhere nobody knew what she usually did on a Tuesday.',
          'Travelling, however, was an unusual sort of plan.',
          'It was rarely forbidden. There was no locked suitcase, no dramatic argument at the door.',
          'There was usually a reasonable suggestion instead.',
          'We should all go together sometime.',
          'A lovely idea.',
          'Except that sometime was a place on no map she had ever seen.',
          'The family hardly travelled, and so the journeys remained in their natural habitat: conversation, imagination, and the occasional saved photograph.',
          'The girl didn\'t tear the pictures out.',
          'She kept them.',
          'Perhaps she would visit those places one day.',
          'Perhaps something else would happen first.',
          'The mystery was not that she had nowhere to go.',
          'It was that some destinations appeared to exist most comfortably when nobody asked when she intended to reach them.',
        ],
        interaction: {
          type: 'map',
          promptLabel: 'Open the folded map',
          revealedText: 'Eventually.',
          metadata: {
            route: 'Route crosses three cities before ending abruptly at the edge of the paper.',
            note: 'There is no X marking the destination.',
          },
        },
        marginNote: '// note: the destination remains on the other side of the paper',
      },
      {
        id: 3,
        label: 'PAGE 03 — THE THINGS SHE LEFT BETWEEN PAGES',
        subtitle: 'EXHIBIT 1311-03 · EVIDENCE OF READING',
        caseRef: 'DOSSIER 1311 // FILE 03',
        paragraphs: [
          'Her notebooks knew a version of her that no one else had met in quite the same way.',
          'There were lists, passing observations, thoughts that might have seemed insignificant if she had said them aloud. There were pages filled carefully and pages abandoned halfway through a sentence.',
          'Some things deserved to be remembered.',
          'Others, perhaps, deserved a place where they could exist without needing to become anything else.',
          'And then there were her books.',
          'Books were reliable in one particular way: they never promised to be gentle.',
          'They could take an ordinary afternoon and fill it with unfamiliar lives. They could place a person in a room they had never entered, make a stranger\'s grief feel impossibly close, and leave a sentence in the mind long after the cover had shut.',
          'The girl understood something about this.',
          'She recommended books to people.',
          'Not always with lengthy explanations. Sometimes she simply passed a title along, as if she were handing someone an ordinary object.',
          'You should read this.',
          'That was how The Silent Patient found its way into another person\'s hands.',
          'Later came A Thousand Splendid Suns.',
          'Two recommendations. Two doors into lives far removed from the person turning the pages.',
          'Somewhere, another reader was discovering that a book could make a person cry over people they had never known.',
          'And somewhere else, the girl was probably already thinking about what to read next.',
          'The case file contained no evidence that she understood the full effect of her recommendations.',
          'Or perhaps she understood perfectly.',
          'The investigator left that question unanswered.',
          'Instead, the investigator pressed a red paper marker between the two titles.',
          'On it were five words:',
          'What do stories leave behind?',
        ],
        interaction: {
          type: 'bookmark',
          promptLabel: 'Lift the red marker',
          revealedText: 'Not every story ends when you put it down.',
          metadata: {
            markerText: 'What do stories leave behind?',
          },
        },
        marginNote: '// bookmarks found inside "The Silent Patient" & "A Thousand Splendid Suns"',
      },
      {
        id: 4,
        label: 'PAGE 04 — THE ENVELOPE WITHOUT A NAME',
        subtitle: 'EXHIBIT 1311-04 · UNIDENTIFIED CORRESPONDENCE',
        caseRef: 'DOSSIER 1311 // FILE 04',
        paragraphs: [
          'The envelope appeared on a Tuesday.',
          'At least, the diary described it as Tuesday. The rest of the evidence was less cooperative.',
          'It was cream-coloured, unsealed, and unremarkable enough that the girl almost mistook it for something that belonged to somebody else.',
          'Inside was a single sheet of paper.',
          'No greeting.',
          'No signature.',
          'No explanation for why it had been written.',
          'Only one question:',
          'IF YOUR LIFE WERE A BOOK, WOULD YOU KNOW WHAT THE NEXT CHAPTER WAS CALLED?',
          'The girl read it once.',
          'Then again, more slowly.',
          'Outside, the house continued being a house. A familiar sound travelled from one room to another. Somewhere, a door closed. Somebody called out about something ordinary.',
          'The paper did not explain itself.',
          'She turned it over.',
          'On the back, someone had drawn a tiny outline of a door.',
          'Not a locked door.',
          'Not an open one, either.',
          'Just a door.',
          'In the lower corner, stamped in faded red ink, were four numbers:',
          '1311',
          'She searched her notebooks for the same number.',
          'Nothing.',
          'She checked the envelope again.',
          'There was no return address.',
          'Only a second line, written beneath the first in a different hand:',
          'Three suspects. One missing chapter. An answer that may not be an answer at all.',
        ],
        interaction: {
          type: 'casenumber',
          promptLabel: 'Tap 1311',
          revealedText: 'The ink beneath the final word is still wet.',
          metadata: {
            labels: ['THE HOUSE', 'THE GIRL', 'TOMORROW'],
          },
        },
        marginNote: '// cipher note: door outline drawn without a handle',
      },
      {
        id: 5,
        label: 'PAGE 05 — THE HOUSE ON TRIAL',
        subtitle: 'EXHIBIT 1311-05 · FIRST SUSPECT EXAMINATION',
        caseRef: 'DOSSIER 1311 // FILE 05',
        paragraphs: [
          'The house was questioned first.',
          'It had the most evidence against it.',
          'Years of routines. Familiar expectations. Plans discussed around tables. Decisions that were made collectively, even when the person most affected by them had her own thoughts.',
          'There were things the girl had wanted that had taken longer than expected.',
          'There were places she had imagined visiting.',
          'There were conversations about what came next that seemed to dissolve before they reached any definite conclusion.',
          'An investigator could have assembled the evidence into a convincing accusation.',
          'The difficulty was that the house contained more than its rules.',
          'It contained the people she loved.',
          'It contained rooms that had been arranged with care, memories that could not be recreated elsewhere, and a hundred small proofs that she belonged somewhere.',
          'The house was not innocent of every complication.',
          'But neither was it the single explanation for all of them.',
          'A locked room would have made the investigation easy.',
          'A room filled with love, expectation, habit and genuine happiness was considerably harder to understand.',
          'The investigator reviewed the evidence.',
          'Then crossed out the word CULPRIT.',
          'In its place:',
          'WITNESS.',
          'Because a place could shape a life without explaining everything about it.',
        ],
        interaction: {
          type: 'stamp',
          promptLabel: 'Stamp the document',
          revealedText: 'TESTIMONY INCOMPLETE.',
          metadata: {
            verdict: 'CULPRIT crossed out \u2192 WITNESS inscribed',
          },
        },
        marginNote: '// status: acquitted of malice; retained as primary witness',
      },
      {
        id: 6,
        label: 'PAGE 06 — THE GIRL WHO ARRANGED HER OWN ROOMS',
        subtitle: 'EXHIBIT 1311-06 · SECOND SUSPECT EXAMINATION',
        caseRef: 'DOSSIER 1311 // FILE 06',
        paragraphs: [
          'The second suspect proved even more difficult to question.',
          'The girl had a way of making small spaces feel like hers.',
          'When the house was to be painted, she had opinions about its colours. When her room was renovated, she knew what she wanted changed. Things that had existed one way for years could be imagined differently, rearranged, and made to feel right.',
          'There was evidence of her everywhere, if one knew where to look.',
          'In the corners of her journals.',
          'In the books she selected.',
          'In the details she noticed and the things she chose to keep.',
          'The investigator found a page filled with handwriting. A list of titles. A fragment of a thought. A sentence underlined twice.',
          'Nothing about it suggested an empty mind.',
          'And yet, elsewhere in the file, there were gaps.',
          'Not empty days.',
          'Not empty years.',
          'Just little stretches of paper where a plan seemed to approach the edge of the page and then become difficult to follow.',
          'There were possibilities, but no clear ending.',
          'There were beginnings, sometimes.',
          'There were things that could happen, someday.',
          'The investigator searched for a pattern.',
          'Perhaps the girl had not written enough.',
          'Perhaps the evidence had not been collected correctly.',
          'Perhaps the question itself was wrong.',
          'A diary was a place where one could write almost anything.',
          'But even the most beautiful notebook could not insist that every blank page be filled before its owner was ready.',
          'The investigator put down the pen.',
          'Some blanks were evidence.',
          'Others were simply blanks.',
          'The difference mattered.',
        ],
        interaction: {
          type: 'tornpaper',
          promptLabel: 'Lift the torn paper',
          revealedText: 'Not every unwritten page is a secret. But every page is a possibility.',
          metadata: {
            detail: 'A sentence appears beneath a piece of torn paper.',
          },
        },
        marginNote: '// observation: color choices and renovations confirm active will',
      },
      {
        id: 7,
        label: 'PAGE 07 — TOMORROW, THE UNTRACEABLE SUSPECT',
        subtitle: 'EXHIBIT 1311-07 · THIRD SUSPECT EXAMINATION',
        caseRef: 'DOSSIER 1311 // FILE 07',
        paragraphs: [
          'Tomorrow was the only suspect who never arrived at the investigation.',
          'It sent no letter.',
          'Left no fingerprints.',
          'Provided no account of its whereabouts.',
          'It was mentioned in conversations, but rarely stayed long enough to be questioned.',
          'It appeared in phrases that sounded perfectly harmless.',
          'We\'ll see.',
          'Maybe next time.',
          'There\'s still plenty of time.',
          'Someday.',
          'There was nothing inherently suspicious about any of them. People used such phrases every day and meant no harm by them.',
          'Yet the investigator noticed something peculiar about Tomorrow.',
          'It could accommodate almost anything.',
          'It could hold a journey, a conversation, a decision, a city, a hundred imagined versions of a life. It could remain open for years without complaining about the room it occupied.',
          'It never demanded an answer.',
          'And because it never demanded an answer, nobody could be certain what it had been promised.',
          'The investigator tried to locate Tomorrow on a map.',
          'It was not a city.',
          'It was not a date.',
          'It was not even a particularly reliable direction.',
          'It was simply the place where certain things were allowed to remain possible without becoming real.',
          'The case file offered no explanation for why some possibilities were brought closer while others were left at a distance.',
          'No explanation for why one person could speak easily about a hundred small details and grow quiet when a conversation stretched far beyond the present.',
          'Silence, the investigator knew, was poor evidence.',
          'It could mean reluctance.',
          'It could mean uncertainty.',
          'It could mean there was nothing to say yet.',
          'Sometimes, it meant a question had arrived before its answer.',
          'The investigator could not prove that Tomorrow had stolen anything.',
          'But it was the only suspect that benefited from never being found.',
        ],
        interaction: {
          type: 'calendar',
          promptLabel: 'Turn the calendar page',
          revealedText: 'There is a difference between a blank page and a finished story.',
          metadata: {
            detail: 'Every date is printed clearly. The final page has no dates at all.',
          },
        },
        marginNote: '// fugitive record: subpoenas sent to "Someday" returned unopened',
      },
      {
        id: 8,
        label: 'PAGE 08 — THE MURDER OF A PERFECTLY ORDINARY BIRTHDAY',
        subtitle: 'EXHIBIT 1311-08 · CLOSING PROCEEDINGS',
        caseRef: 'DOSSIER 1311 // FILE 08',
        paragraphs: [
          'The birthday was found dead at 12:01 a.m.',
          'Cause of death: excessive ordinariness.',
          'The evidence was overwhelming.',
          'There had been no dramatic incident, no extraordinary plot twist, no suspicious person in a dark alley carrying an unreasonable quantity of red ink.',
          'Just another birthday arriving in the ordinary course of things.',
          'And yet, somewhere in the records, something had changed.',
          'The house remained standing.',
          'The journals remained full of their little fragments.',
          'The books continued passing between hands.',
          'The map still ended at the edge of its paper.',
          'Nothing had been solved in the manner of a conventional mystery.',
          'The investigator could not accuse the family without overlooking the love that lived there.',
          'The girl could not be declared guilty simply because parts of her story remained unwritten.',
          'And Tomorrow, naturally, had declined to attend its own trial.',
          'So the investigator did the one thing the evidence permitted.',
          'The case was closed\u2014not because every question had been answered, but because the investigation had reached the limits of what it could honestly claim to know.',
          'A final note was added to the file:',
          'The girl has not disappeared. Her story has not ended. And the pages that remain blank do not belong to the investigator.',
          'There was a pause.',
          'Then, beneath it, one last line:',
          'Perhaps the most dangerous thing about a story is assuming you already know how it ends.',
          'The investigator gathered the pages.',
          'There was one document left.',
          'It had not been included in the original file.',
          'It was sealed inside an envelope, marked with the same number that had appeared on the first mysterious letter.',
          '1311.',
          'The document was labelled:',
          'LAST REPORTED STATEMENT.',
          'Beneath that, in faded red ink:',
          'The following record has been withheld from the investigation until the final chapter.',
        ],
        interaction: {
          type: 'turnpage',
          promptLabel: 'Turn the last page',
          revealedText: 'The story falls silent. A sealed envelope waits against the black background.',
          metadata: {
            detail: 'The final file is sealed with wax bearing cipher 1311.',
          },
        },
        marginNote: '// final recovered dossier fragment before closure',
      },
    ],
    finalPageCta: 'examine sealed envelope (1311) \u2192',
  },
  envelope: {
    label: 'FINAL EVIDENCE // DOSSIER 1311',
    sealMonogram: '1311',
    buttonText: 'tap to break seal & open letter',
    statementHeading: 'LAST REPORTED STATEMENT',
    statementPlaceholder:
      '[LAST REPORTED STATEMENT]\n\nReserved for the secret admirer’s final recorded statement.\n(Replace this editable block with your statement text when ready.)',
    letterHeading: 'PERSONAL BIRTHDAY LETTER',
    letterPlaceholder:
      'Dear Sanober,\n\n[LETTER CONTENT]\n\nReserved for the personal birthday letter, warmest wishes, inside memories, and humorous birthday roast.\n(Replace this editable block with your birthday letter text when ready.)',
  },
};

export interface DiarySpread {
  id: number;
  entryDate: string;
  entryTitle: string;
  leftPage: {
    greetingPrefix: string;
    obscuredNameNote: string;
    text: string[];
    handwrittenSignoff?: string;
  };
  rightPage: {
    exhibitTag: string;
    caption: string;
    annotationNotes: string[];
    photoType: 'house' | 'map' | 'midnight' | 'cipher';
    isFinalSpread?: boolean;
    hiddenPasswordClue?: {
      code: string;
      label: string;
      instruction: string;
    };
  };
}

export const DIARY_SPREADS: DiarySpread[] = [
  {
    id: 1,
    entryDate: 'OCTOBER 14 · 11:30 PM',
    entryTitle: 'THE HOUSE OF WARM LIGHT',
    leftPage: {
      greetingPrefix: "hii, I'm",
      obscuredNameNote: '[TORN EDGE / BLOOD STAIN]',
      text: [
        'There is nothing cruel about this house. That is what makes it so impossible to explain to anyone outside.',
        'Someone always notices when I return home late. Someone always asks whether I have eaten. There are unspoken family rules, quiet expectations, and traditions repeated until nobody remembers who began them.',
        'The inconvenient truth is simple: I love my family dearly. It would have made for an easier mystery if I didn’t.',
        'Sometimes I look at this house from across the dark road—its golden windows, its warm laughter—and I think: it is the most beautiful cage anyone could ever build. And I don’t even know if wishing to leave it makes me selfish.',
      ],
      handwrittenSignoff: '— scribbled while the house sleeps',
    },
    rightPage: {
      exhibitTag: 'EXHIBIT 1311-01 // THE ENCLOSURE',
      caption: 'Forensic Scan: Blurry photograph recovered between floorboards',
      annotationNotes: [
        'Evidence Note: Illuminated residence; no external locks detected.',
        'Margin Note: "Why do I feel like a ghost in rooms where I am so fiercely loved?"',
        'Forensic Observation: Dried red thumbprint along lower deckled edge.',
      ],
      photoType: 'house',
    },
  },
  {
    id: 2,
    entryDate: 'OCTOBER 28 · 01:15 AM',
    entryTitle: 'THE SECRET ATLASES',
    leftPage: {
      greetingPrefix: "hii, I'm",
      obscuredNameNote: '[TORN EDGE / BLOOD STAIN]',
      text: [
        'Beneath the bottom drawer of my wardrobe, hidden under university notebooks, I keep maps of cities I have never visited. Lisbon at sunrise. The midnight sleeper to Vienna. The coastline near Porto.',
        'I trace the tracks with my fingernails until the paper softens. I have chosen the books I read, the clothes I wear, and the quiet rhythm of my days.',
        'Yet the horizon itself feels pre-assigned, written into law before I took my first breath.',
        'Every ticket I never bought is an unwritten secret folded between the seams of this diary.',
      ],
      handwrittenSignoff: '— midnight route notes',
    },
    rightPage: {
      exhibitTag: 'EXHIBIT 1311-02 // THE UNSTAMPED ITINERARY',
      caption: 'Transit Route Fragment: Circled railway coordinates in crimson ink',
      annotationNotes: [
        'Evidence Note: Stamped railway passes to destinations never visited.',
        'Margin Note: "A caged bird with a library card is still behind bars."',
        'Forensic Observation: Tea stains and paper scorched along left margin.',
      ],
      photoType: 'map',
    },
  },
  {
    id: 3,
    entryDate: 'NOVEMBER 06 · 02:40 AM',
    entryTitle: 'MIDNIGHT WHISPERS',
    leftPage: {
      greetingPrefix: "hii, I'm",
      obscuredNameNote: '[TORN EDGE / BLOOD STAIN]',
      text: [
        'It is past two in the morning. The house has settled into dead silence. This is the only hour of the day that belongs entirely to me.',
        'Under the amber lamp, I write what I could never dare voice at the family table. I write of wind, of open fields, of stepping onto an empty train platform with a single coat and no return date.',
        'And lately... I have felt an impossible certainty that someone is watching. Not with judgment, but with astonishing understanding. Someone who knows what I whisper to the dark.',
      ],
      handwrittenSignoff: '— ink drying fast',
    },
    rightPage: {
      exhibitTag: 'EXHIBIT 1311-03 // THE WITNESS ARCHIVE',
      caption: 'Recovered Artifact: Dried botanical petal pinned with oxidized wire',
      annotationNotes: [
        'Evidence Note: Anonymous investigator footprints documented outside perimeter.',
        'Margin Note: "He watches from the shadows of this story. He knows what I am waiting for."',
        'Forensic Observation: Red ink splatter across exhibit tag.',
      ],
      photoType: 'midnight',
    },
  },
  {
    id: 4,
    entryDate: 'NOVEMBER 13 · FINAL ENTRY',
    entryTitle: 'THE UNLOCKED DOOR & CIPHER',
    leftPage: {
      greetingPrefix: "hii, I'm",
      obscuredNameNote: '[TORN EDGE / BLOOD STAIN]',
      text: [
        'If you have followed my trail this far into the evidence locker, you understand the truth now.',
        'The girl in the beautiful cage was never a casualty of violence. The only murder committed here was the abrupt end of an ordinary, predictable existence.',
        'The door of this cage was never locked from the outside. To unlock the sealed envelope waiting on the surveillance table, you must enter the classified case reference that brought you here.',
        'Enter the 4-digit case number into the envelope security prompt to break the seal.',
      ],
      handwrittenSignoff: '— dossier complete',
    },
    rightPage: {
      exhibitTag: 'EXHIBIT 1311-04 // MASTER CIPHER',
      caption: 'Archival Key: Forensic clearance stamp and envelope passcode',
      annotationNotes: [
        'CONFIDENTIAL CIPHER: The 4-digit code to unlock Exhibit B is "1311".',
        'Margin Note: "Your secret admirer has prepared the final confession inside the envelope."',
        'Status: Ready for evidence extraction.',
      ],
      photoType: 'cipher',
      isFinalSpread: true,
      hiddenPasswordClue: {
        code: '1311',
        label: 'CASE REFERENCE CIPHER: 1311',
        instruction: 'Enter passcode 1311 or tap below to unlock the envelope',
      },
    },
  },
];

