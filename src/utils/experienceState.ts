/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppScreen = 'opening' | 'warning' | 'cctv' | 'story' | 'envelope';

export type EnvelopeStage = 'sealed' | 'unfolding' | 'revealed';

export interface ExperienceNavigationState {
  currentScreen: AppScreen;
  storyPageIndex: number;
  totalPages: number;
  envelopeStage: EnvelopeStage;
  isDiaryOpen: boolean;
  diarySpreadIndex: number;
  totalDiarySpreads: number;
  isPasswordModalOpen: boolean;
  isEnvelopeUnlocked: boolean;
}

export function createInitialExperienceState(totalPages = 8): ExperienceNavigationState {
  return {
    currentScreen: 'opening',
    storyPageIndex: 0,
    totalPages,
    envelopeStage: 'sealed',
    isDiaryOpen: false,
    diarySpreadIndex: 0,
    totalDiarySpreads: 4,
    isPasswordModalOpen: false,
    isEnvelopeUnlocked: false,
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
      currentScreen: 'cctv',
      storyPageIndex: 0,
      isDiaryOpen: false,
    };
  }
  return state;
}

export function handleOpenDiary(
  state: ExperienceNavigationState,
  spreadIndex = 0
): ExperienceNavigationState {
  return {
    ...state,
    isDiaryOpen: true,
    diarySpreadIndex: spreadIndex,
  };
}

export function handleCloseDiary(
  state: ExperienceNavigationState
): ExperienceNavigationState {
  return {
    ...state,
    isDiaryOpen: false,
  };
}

export function handleNextDiarySpread(
  state: ExperienceNavigationState
): ExperienceNavigationState {
  if (state.diarySpreadIndex < state.totalDiarySpreads - 1) {
    return {
      ...state,
      diarySpreadIndex: state.diarySpreadIndex + 1,
    };
  }
  return state;
}

export function handlePrevDiarySpread(
  state: ExperienceNavigationState
): ExperienceNavigationState {
  if (state.diarySpreadIndex > 0) {
    return {
      ...state,
      diarySpreadIndex: state.diarySpreadIndex - 1,
    };
  }
  return state;
}

export function validateEnvelopePassword(input: string): boolean {
  if (!input) return false;
  const cleaned = input.trim().toLowerCase().replace(/[\s\-_#]/g, '');
  return (
    cleaned === '1311' ||
    cleaned === 'case1311' ||
    cleaned === 'cage' ||
    cleaned === 'freedom'
  );
}

export function handleUnlockEnvelopeWithPassword(
  state: ExperienceNavigationState,
  passwordInput: string
): { success: boolean; nextState: ExperienceNavigationState } {
  if (validateEnvelopePassword(passwordInput)) {
    return {
      success: true,
      nextState: {
        ...state,
        isEnvelopeUnlocked: true,
        isPasswordModalOpen: false,
        isDiaryOpen: false,
        currentScreen: 'envelope',
        envelopeStage: 'sealed',
      },
    };
  }
  return {
    success: false,
    nextState: state,
  };
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
