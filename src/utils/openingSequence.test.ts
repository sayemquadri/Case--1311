/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EXACT_CASE_TITLE,
  EXACT_BUTTON_TEXT,
  BLOOD_RED_COLOR,
  DARKNESS_DURATION_MS,
  BUTTON_DELAY_AFTER_TITLE_MS,
  TOTAL_BUTTON_REVEAL_MS,
  getSequenceState,
} from './openingSequence';

test('exact text constants match user requirements', () => {
  assert.equal(EXACT_CASE_TITLE, 'EXTREMELY CONFIDENTIAL — CASE 1311');
  assert.equal(EXACT_BUTTON_TEXT, 'check the case');
  assert.equal(BLOOD_RED_COLOR, '#A31525');
});

test('timing parameters conform to requested sequential schedule', () => {
  assert.equal(DARKNESS_DURATION_MS, 800);
  assert.equal(BUTTON_DELAY_AFTER_TITLE_MS, 1200);
  assert.equal(TOTAL_BUTTON_REVEAL_MS, 2000);
});

test('stage at < 800ms is complete darkness', () => {
  const atZero = getSequenceState(0);
  assert.equal(atZero.stage, 'darkness');
  assert.equal(atZero.isTitleVisible, false);
  assert.equal(atZero.isButtonVisible, false);

  const at799 = getSequenceState(799);
  assert.equal(at799.stage, 'darkness');
  assert.equal(at799.isTitleVisible, false);
  assert.equal(at799.isButtonVisible, false);
});

test('stage at 800ms reveals title with glitch', () => {
  const at800 = getSequenceState(800);
  assert.equal(at800.stage, 'title-glitch');
  assert.equal(at800.isTitleVisible, true);
  assert.equal(at800.isTitleGlitching, true);
  assert.equal(at800.isButtonVisible, false);
});

test('stage between glitch settle and button delay keeps title settled', () => {
  const at1500 = getSequenceState(1500);
  assert.equal(at1500.stage, 'title-settled');
  assert.equal(at1500.isTitleVisible, true);
  assert.equal(at1500.isTitleGlitching, false);
  assert.equal(at1500.isTitleSettled, true);
  assert.equal(at1500.isButtonVisible, false);
});

test('stage at 2000ms and beyond reveals the button', () => {
  const at2000 = getSequenceState(2000);
  assert.equal(at2000.stage, 'button-reveal');
  assert.equal(at2000.isTitleVisible, true);
  assert.equal(at2000.isButtonVisible, true);

  const at5000 = getSequenceState(5000);
  assert.equal(at5000.stage, 'button-reveal');
  assert.equal(at5000.isTitleVisible, true);
  assert.equal(at5000.isButtonVisible, true);
});

test('reduced motion disables glitching', () => {
  const at900Reduced = getSequenceState(900, true);
  assert.equal(at900Reduced.stage, 'title-settled');
  assert.equal(at900Reduced.isTitleGlitching, false);
  assert.equal(at900Reduced.isTitleSettled, true);
});
