/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  ExperienceNavigationState,
  createInitialExperienceState,
  handleCheckTheCase,
  handleEnterAnyways,
  handleNextStoryPage,
  handlePrevStoryPage,
  handleOpenEnvelope,
  handleResetToEnvelope,
  validateEnvelopePassword,
  handleOpenDiary,
  handleNextDiarySpread,
  handlePrevDiarySpread,
  handleCloseDiary,
  handleUnlockEnvelopeWithPassword,
  getSpreadIndexFromPageIndex,
  getPageIndicesForSpread,
  handleNextDiaryPage,
  handlePrevDiaryPage,
} from './experienceState';
import { EXPERIENCE_CONTENT, DIARY_SPREADS } from '../data/storyContent';

test('initial state begins at opening screen with sealed envelope', () => {
  const state = createInitialExperienceState();
  assert.equal(state.currentScreen, 'opening');
  assert.equal(state.storyPageIndex, 0);
  assert.equal(state.totalPages, 8);
  assert.equal(state.envelopeStage, 'sealed');
  assert.equal(state.isDiaryOpen, false);
  assert.equal(state.diarySpreadIndex, 0);
  assert.equal(state.isEnvelopeUnlocked, false);
});

test('handleCheckTheCase navigates from opening to warning screen', () => {
  const state = createInitialExperienceState();
  const next = handleCheckTheCase(state);
  assert.equal(next.currentScreen, 'warning');
});

test('handleEnterAnyways navigates from warning to cctv screen at page 0', () => {
  const state = handleCheckTheCase(createInitialExperienceState());
  const next = handleEnterAnyways(state);
  assert.equal(next.currentScreen, 'cctv');
  assert.equal(next.storyPageIndex, 0);
  assert.equal(next.isDiaryOpen, false);
});

test('diary state opens, navigates through spreads, and closes cleanly', () => {
  let state = handleEnterAnyways(handleCheckTheCase(createInitialExperienceState()));
  assert.equal(state.isDiaryOpen, false);

  state = handleOpenDiary(state, 0);
  assert.equal(state.isDiaryOpen, true);
  assert.equal(state.diarySpreadIndex, 0);

  state = handleNextDiarySpread(state);
  assert.equal(state.diarySpreadIndex, 1);

  state = handleNextDiarySpread(state);
  assert.equal(state.diarySpreadIndex, 2);

  state = handlePrevDiarySpread(state);
  assert.equal(state.diarySpreadIndex, 1);

  state = handleCloseDiary(state);
  assert.equal(state.isDiaryOpen, false);
});

test('validateEnvelopePassword validates correct cipher and rejects incorrect', () => {
  assert.equal(validateEnvelopePassword('1311'), true);
  assert.equal(validateEnvelopePassword('  1311  '), true);
  assert.equal(validateEnvelopePassword('case 1311'), true);
  assert.equal(validateEnvelopePassword('CASE-1311'), true);
  assert.equal(validateEnvelopePassword('cage'), true);
  assert.equal(validateEnvelopePassword('0000'), false);
  assert.equal(validateEnvelopePassword(''), false);
  assert.equal(validateEnvelopePassword('password'), false);
});

test('handleUnlockEnvelopeWithPassword succeeds with correct code and navigates to envelope', () => {
  const state = handleEnterAnyways(handleCheckTheCase(createInitialExperienceState()));
  const failed = handleUnlockEnvelopeWithPassword(state, 'wrong');
  assert.equal(failed.success, false);
  assert.equal(failed.nextState.isEnvelopeUnlocked, false);

  const passed = handleUnlockEnvelopeWithPassword(state, '1311');
  assert.equal(passed.success, true);
  assert.equal(passed.nextState.isEnvelopeUnlocked, true);
  assert.equal(passed.nextState.currentScreen, 'envelope');
  assert.equal(passed.nextState.envelopeStage, 'sealed');
});

test('story pages paginate forward and prevent overflow beyond last page into envelope', () => {
  let state: ExperienceNavigationState = {
    ...handleEnterAnyways(handleCheckTheCase(createInitialExperienceState(8))),
    currentScreen: 'story',
  };
  assert.equal(state.storyPageIndex, 0);

  // Pages 0 to 7
  for (let i = 0; i < 7; i++) {
    state = handleNextStoryPage(state);
    assert.equal(state.storyPageIndex, i + 1);
    assert.equal(state.currentScreen, 'story');
  }

  // Page 7 -> envelope
  state = handleNextStoryPage(state);
  assert.equal(state.currentScreen, 'envelope');
  assert.equal(state.envelopeStage, 'sealed');
});

test('story pages paginate backward and do not go below page 0', () => {
  let state: ExperienceNavigationState = {
    ...handleEnterAnyways(handleCheckTheCase(createInitialExperienceState(3))),
    currentScreen: 'story',
  };
  assert.equal(state.storyPageIndex, 0);

  // Prev on page 0 does nothing
  state = handlePrevStoryPage(state);
  assert.equal(state.storyPageIndex, 0);

  // Advance to page 2, then prev to page 1
  state = handleNextStoryPage(state);
  state = handleNextStoryPage(state);
  assert.equal(state.storyPageIndex, 2);

  state = handlePrevStoryPage(state);
  assert.equal(state.storyPageIndex, 1);
});

test('envelope opens and reveals contents', () => {
  const state = {
    ...createInitialExperienceState(),
    currentScreen: 'envelope' as const,
    storyPageIndex: 7,
    envelopeStage: 'sealed' as const,
  };

  const opened = handleOpenEnvelope(state);
  assert.equal(opened.envelopeStage, 'revealed');

  const resealed = handleResetToEnvelope(opened);
  assert.equal(resealed.envelopeStage, 'sealed');
});

test('content schema contains all required placeholders', () => {
  assert.equal(EXPERIENCE_CONTENT.warning.heading, 'CONTENT WARNING');
  assert.equal(EXPERIENCE_CONTENT.warning.buttonText, 'ENTER ANYWAYS');
  assert.equal(EXPERIENCE_CONTENT.story.chapterTitle, 'HER STORY');
  assert.ok(EXPERIENCE_CONTENT.story.pages.length >= 3);
  assert.ok(DIARY_SPREADS.length === 4);
  assert.equal(EXPERIENCE_CONTENT.envelope.label, 'FINAL EVIDENCE // DOSSIER 1311');
  assert.equal(EXPERIENCE_CONTENT.envelope.buttonText, 'tap to break seal & open letter');
  assert.equal(EXPERIENCE_CONTENT.envelope.statementHeading, 'LAST REPORTED STATEMENT');
  assert.equal(EXPERIENCE_CONTENT.envelope.letterHeading, 'PERSONAL BIRTHDAY LETTER');
});

test('every diary spread starts with "hii, I\'m" and hides the name', () => {
  DIARY_SPREADS.forEach((spread) => {
    assert.equal(spread.leftPage.greetingPrefix, "hii, I'm");
    assert.ok(spread.leftPage.obscuredNameNote.length > 0);
  });
  // Final spread contains the hidden clue
  const lastSpread = DIARY_SPREADS[DIARY_SPREADS.length - 1];
  assert.equal(lastSpread.rightPage.isFinalSpread, true);
  assert.equal(lastSpread.rightPage.hiddenPasswordClue?.code, '1311');
});

test('detective laren dialogue constants match exact user specifications', () => {
  const intro = "hii, I'm detective laren, nice to meet you";
  const controlRoom = "You can check all the cameras if u tap on it";
  const bedroom = "finally we found the diary! Interesting, we should read it, tap into it!";
  const livingRoom = "Ohh an envelope? You should check it out by tapping on it";
  const lockedEnvelope = "Ohh we require a password! It should be on the diary! We should find it";

  assert.equal(intro, "hii, I'm detective laren, nice to meet you");
  assert.equal(controlRoom, "You can check all the cameras if u tap on it");
  assert.equal(bedroom, "finally we found the diary! Interesting, we should read it, tap into it!");
  assert.equal(livingRoom, "Ohh an envelope? You should check it out by tapping on it");
  assert.equal(lockedEnvelope, "Ohh we require a password! It should be on the diary! We should find it");
});

test('diary single-page navigation and spread index mappings work correctly', () => {
  // Spread conversions
  assert.equal(getSpreadIndexFromPageIndex(0), 0);
  assert.equal(getSpreadIndexFromPageIndex(1), 0);
  assert.equal(getSpreadIndexFromPageIndex(2), 1);
  assert.equal(getSpreadIndexFromPageIndex(3), 1);
  assert.equal(getSpreadIndexFromPageIndex(4), 2);
  assert.equal(getSpreadIndexFromPageIndex(5), 2);
  assert.equal(getSpreadIndexFromPageIndex(6), 3);
  assert.equal(getSpreadIndexFromPageIndex(7), 3);

  assert.deepEqual(getPageIndicesForSpread(0), [0, 1]);
  assert.deepEqual(getPageIndicesForSpread(1), [2, 3]);
  assert.deepEqual(getPageIndicesForSpread(2), [4, 5]);
  assert.deepEqual(getPageIndicesForSpread(3), [6, 7]);

  // Next page pagination (0 to 7)
  let p = 0;
  p = handleNextDiaryPage(p, 8);
  assert.equal(p, 1);
  p = handleNextDiaryPage(p, 8);
  assert.equal(p, 2);
  // Clamping at last page
  assert.equal(handleNextDiaryPage(7, 8), 7);

  // Prev page pagination
  p = handlePrevDiaryPage(p);
  assert.equal(p, 1);
  p = handlePrevDiaryPage(p);
  assert.equal(p, 0);
  // Clamping at first page
  assert.equal(handlePrevDiaryPage(0), 0);
});

test('new 8-page diary story "THE GIRL WHO KEPT A THOUSAND STORIES" conforms to specifications', () => {
  assert.equal(EXPERIENCE_CONTENT.story.seriesTitle, 'THE GIRL WHO KEPT A THOUSAND STORIES');
  assert.equal(DIARY_SPREADS.length, 4);

  // Spread 1: Page 1 and Page 2
  const s1 = DIARY_SPREADS[0];
  assert.equal(s1.leftPage.title, 'PAGE 1 — THE HOUSE OF WARM LIGHT');
  assert.equal(s1.leftPage.greetingPrefix, "hii, I'm");
  assert.ok(s1.leftPage.text.some((t) => t.includes('There is something strange about familiar places')));
  assert.ok(s1.leftPage.text.some((t) => t.includes('This house is full of warmth')));
  assert.equal(s1.rightPage.title, 'PAGE 2 — CONTINUATION');
  assert.equal(s1.rightPage.isContinuation, true);
  assert.ok(s1.rightPage.text.some((t) => t.includes('wanting to see more means loving what I have any less')));

  // Spread 2: Page 3 and Page 4
  const s2 = DIARY_SPREADS[1];
  assert.equal(s2.leftPage.title, 'PAGE 3 — THE SECRET ATLAS');
  assert.equal(s2.leftPage.greetingPrefix, "hii, I'm");
  assert.ok(s2.leftPage.text.some((t) => t.includes('Lisbon at sunset. Prague in the rain')));
  assert.equal(s2.rightPage.title, 'PAGE 4 — CONTINUATION');
  assert.equal(s2.rightPage.isContinuation, true);
  assert.ok(s2.rightPage.text.some((t) => t.includes('Until then, the map stays folded inside this diary')));

  // Spread 3: Page 5 and Page 6
  const s3 = DIARY_SPREADS[2];
  assert.equal(s3.leftPage.title, 'PAGE 5 — THE GIRL WHO NOTICES EVERYTHING');
  assert.equal(s3.leftPage.greetingPrefix, "hii, I'm");
  assert.ok(s3.leftPage.text.some((t) => t.includes('noticing the things everyone else overlooks')));
  assert.equal(s3.rightPage.title, 'PAGE 6 — CONTINUATION');
  assert.equal(s3.rightPage.isContinuation, true);
  assert.ok(s3.rightPage.text.some((t) => t.includes('Someone has been leaving clues')));

  // Spread 4: Page 7 and Page 8
  const s4 = DIARY_SPREADS[3];
  assert.equal(s4.leftPage.title, 'PAGE 7 — THE FINAL CHAPTER');
  assert.equal(s4.leftPage.greetingPrefix, "hii, I'm");
  assert.ok(s4.leftPage.text.some((t) => t.includes('The clues were never leading to a crime scene. They were leading to a story.')));
  assert.equal(s4.rightPage.title, 'PAGE 8 — THE LAST CLUE');
  assert.equal(s4.rightPage.isContinuation, true);
  assert.equal(s4.rightPage.isFinalSpread, true);
  assert.ok(s4.rightPage.text.some((t) => t.includes('So I\'ve prepared one last envelope')));
  assert.equal(s4.rightPage.hiddenPasswordClue?.code, '1311');
  assert.ok(s4.rightPage.hiddenPasswordClue?.handwrittenLines?.some((l) => l.includes('Every mystery has a key')));
  assert.equal(s4.rightPage.hiddenPasswordClue?.calendarDetail?.month, 'NOVEMBER');
  assert.equal(s4.rightPage.hiddenPasswordClue?.calendarDetail?.circledDay, 13);
});

