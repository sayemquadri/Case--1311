/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialExperienceState,
  handleCheckTheCase,
  handleEnterAnyways,
  handleNextStoryPage,
  handlePrevStoryPage,
  handleOpenEnvelope,
  handleResetToEnvelope,
} from './experienceState';
import { EXPERIENCE_CONTENT } from '../data/storyContent';

test('initial state begins at opening screen with sealed envelope', () => {
  const state = createInitialExperienceState(3);
  assert.equal(state.currentScreen, 'opening');
  assert.equal(state.storyPageIndex, 0);
  assert.equal(state.totalPages, 3);
  assert.equal(state.envelopeStage, 'sealed');
});

test('handleCheckTheCase navigates from opening to warning screen', () => {
  const state = createInitialExperienceState(3);
  const next = handleCheckTheCase(state);
  assert.equal(next.currentScreen, 'warning');
});

test('handleEnterAnyways navigates from warning to story screen at page 0', () => {
  const state = handleCheckTheCase(createInitialExperienceState(3));
  const next = handleEnterAnyways(state);
  assert.equal(next.currentScreen, 'story');
  assert.equal(next.storyPageIndex, 0);
});

test('story pages paginate forward and prevent overflow beyond last page into envelope', () => {
  let state = handleEnterAnyways(handleCheckTheCase(createInitialExperienceState(3)));
  assert.equal(state.storyPageIndex, 0);

  // Page 0 -> Page 1
  state = handleNextStoryPage(state);
  assert.equal(state.storyPageIndex, 1);
  assert.equal(state.currentScreen, 'story');

  // Page 1 -> Page 2
  state = handleNextStoryPage(state);
  assert.equal(state.storyPageIndex, 2);
  assert.equal(state.currentScreen, 'story');

  // Page 2 (last page) -> triggers envelope scene
  state = handleNextStoryPage(state);
  assert.equal(state.currentScreen, 'envelope');
  assert.equal(state.envelopeStage, 'sealed');
});

test('story pages paginate backward and do not go below page 0', () => {
  let state = handleEnterAnyways(handleCheckTheCase(createInitialExperienceState(3)));
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
    currentScreen: 'envelope' as const,
    storyPageIndex: 2,
    totalPages: 3,
    envelopeStage: 'sealed' as const,
  };

  const opened = handleOpenEnvelope(state);
  assert.equal(opened.envelopeStage, 'revealed');

  const resealed = handleResetToEnvelope(opened);
  assert.equal(resealed.envelopeStage, 'sealed');
});

test('content schema contains all required placeholders', () => {
  assert.equal(EXPERIENCE_CONTENT.warning.heading, 'BEFORE YOU PROCEED');
  assert.equal(EXPERIENCE_CONTENT.warning.buttonText, 'enter anyways');
  assert.equal(EXPERIENCE_CONTENT.story.chapterTitle, 'HER STORY');
  assert.ok(EXPERIENCE_CONTENT.story.pages.length >= 3);
  assert.equal(EXPERIENCE_CONTENT.envelope.label, 'FINAL EVIDENCE');
  assert.equal(EXPERIENCE_CONTENT.envelope.buttonText, 'tap to reveal the letter');
  assert.equal(EXPERIENCE_CONTENT.envelope.statementHeading, 'LAST REPORTED STATEMENT');
  assert.equal(EXPERIENCE_CONTENT.envelope.letterHeading, 'LETTER CONTENT');
});
