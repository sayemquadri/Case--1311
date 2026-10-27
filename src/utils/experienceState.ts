/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppScreen = 'opening' | 'warning' | 'story' | 'envelope';

export type EnvelopeStage = 'sealed' | 'unfolding' | 'revealed';

export interface ExperienceNavigationState {
  currentScreen: AppScreen;
  storyPageIndex: number;
  totalPages: number;
  envelopeStage: EnvelopeStage;
}

export function createInitialExperienceState(totalPages = 3): ExperienceNavigationState {
  return {
    currentScreen: 'opening',
    storyPageIndex: 0,
    totalPages,
    envelopeStage: 'sealed',
  };
}

export function handleCheckTheCase(
  state: ExperienceNavigationState
): ExperienceNavigationState {
  if (state.currentScreen === 'opening') {
    return {
      ...state,
      currentScreen: 'warning',
    };
  }
  return state;
}

export function handleEnterAnyways(
  state: ExperienceNavigationState
): ExperienceNavigationState {
  if (state.currentScreen === 'warning') {
    return {
      ...state,
      currentScreen: 'story',
      storyPageIndex: 0,
    };
  }
  return state;
}

export function handleNextStoryPage(
  state: ExperienceNavigationState
): ExperienceNavigationState {
  if (state.currentScreen !== 'story') return state;

  if (state.storyPageIndex < state.totalPages - 1) {
    return {
      ...state,
      storyPageIndex: state.storyPageIndex + 1,
    };
  }

  // Final page transition to envelope
  return {
    ...state,
    currentScreen: 'envelope',
    envelopeStage: 'sealed',
  };
}

export function handlePrevStoryPage(
  state: ExperienceNavigationState
): ExperienceNavigationState {
  if (state.currentScreen !== 'story') return state;

  if (state.storyPageIndex > 0) {
    return {
      ...state,
      storyPageIndex: state.storyPageIndex - 1,
    };
  }

  return state;
}

export function handleOpenEnvelope(
  state: ExperienceNavigationState
): ExperienceNavigationState {
  if (state.currentScreen === 'envelope') {
    return {
      ...state,
      envelopeStage: 'revealed',
    };
  }
  return state;
}

export function handleResetToEnvelope(
  state: ExperienceNavigationState
): ExperienceNavigationState {
  if (state.currentScreen === 'envelope') {
    return {
      ...state,
      envelopeStage: 'sealed',
    };
  }
  return state;
}
