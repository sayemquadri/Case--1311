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
  assert.equal(EXPERIENCE_CONTENT.warning.heading, 'READER ADVISORY');
  assert.equal(EXPERIENCE_CONTENT.warning.buttonText, 'CHECK THE FOOTAGE →');
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
