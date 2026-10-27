/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Exact specifications for The Sanober Files opening sequence.
 */
export const EXACT_CASE_TITLE = 'EXTREMELY CONFIDENTIAL \u2014 CASE 1311';
export const EXACT_BUTTON_TEXT = 'check the case';
export const BLOOD_RED_COLOR = '#A31525';

export const DARKNESS_DURATION_MS = 800; // ~0.8s silence and complete darkness
export const GLITCH_DURATION_MS = 550; // brief cinematic glitch animation
export const BUTTON_DELAY_AFTER_TITLE_MS = 1200; // ~1.2s pause after title appearance
export const TOTAL_BUTTON_REVEAL_MS = DARKNESS_DURATION_MS + BUTTON_DELAY_AFTER_TITLE_MS; // 2000ms

export type SequenceStage = 'darkness' | 'title-glitch' | 'title-settled' | 'button-reveal';

export interface SequenceState {
  stage: SequenceStage;
  isTitleVisible: boolean;
  isTitleGlitching: boolean;
  isTitleSettled: boolean;
  isButtonVisible: boolean;
}

/**
 * Calculates current sequence state based on elapsed time (in ms).
 */
export function getSequenceState(elapsedMs: number, prefersReducedMotion = false): SequenceState {
  if (elapsedMs < DARKNESS_DURATION_MS) {
    return {
      stage: 'darkness',
      isTitleVisible: false,
      isTitleGlitching: false,
      isTitleSettled: false,
      isButtonVisible: false,
    };
  }

  if (elapsedMs < TOTAL_BUTTON_REVEAL_MS) {
    const isGlitching = !prefersReducedMotion && elapsedMs < DARKNESS_DURATION_MS + GLITCH_DURATION_MS;
    return {
      stage: isGlitching ? 'title-glitch' : 'title-settled',
      isTitleVisible: true,
      isTitleGlitching: isGlitching,
      isTitleSettled: !isGlitching,
      isButtonVisible: false,
    };
  }

  return {
    stage: 'button-reveal',
    isTitleVisible: true,
    isTitleGlitching: false,
    isTitleSettled: true,
    isButtonVisible: true,
  };
}
