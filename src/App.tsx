/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppScreen } from './utils/experienceState';
import { OpeningScreen } from './components/OpeningScreen';
import { TriggerWarningScreen } from './components/TriggerWarningScreen';
import { StoryBookScreen } from './components/StoryBookScreen';
import { FinalEnvelopeScreen } from './components/FinalEnvelopeScreen';

export default function App() {
  // Check URL parameters for direct state testing if specified
  const getInitialScreen = (): AppScreen => {
    const params = new URLSearchParams(window.location.search);
    const screenParam = params.get('screen');
    if (
      screenParam === 'warning' ||
      screenParam === 'story' ||
      screenParam === 'envelope'
    ) {
      return screenParam;
    }
    return 'opening';
  };

  const [currentScreen, setCurrentScreen] = useState<AppScreen>(getInitialScreen);

  const params = new URLSearchParams(window.location.search);
  const skipIntro = params.get('autostart') === '1';
  const defaultRevealed = params.get('unfolded') === '1';

  // Navigation handlers
  const handleCheckCase = () => {
    setCurrentScreen('warning');
  };

  const handleEnterAnyways = () => {
    setCurrentScreen('story');
  };

  const handleProceedToEnvelope = () => {
    setCurrentScreen('envelope');
  };

  const handleReturnToStory = () => {
    setCurrentScreen('story');
  };

  return (
    <div className="w-screen h-[100dvh] bg-[#000000] text-[#A31525] overflow-hidden select-none">
      {/* 1. OPENING SCREEN — EXACT PRESERVATION */}
      {currentScreen === 'opening' && (
        <OpeningScreen onCheckCase={handleCheckCase} skipIntro={skipIntro} />
      )}

      {/* 2. TRIGGER WARNING SCREEN */}
      {currentScreen === 'warning' && (
        <TriggerWarningScreen onEnterAnyways={handleEnterAnyways} />
      )}

      {/* 3. “HER STORY” — INTERACTIVE BOOK */}
      {currentScreen === 'story' && (
        <StoryBookScreen onProceedToEnvelope={handleProceedToEnvelope} />
      )}

      {/* 4. FINAL SCENE — THE ENVELOPE */}
      {currentScreen === 'envelope' && (
        <FinalEnvelopeScreen
          onReturnToStory={handleReturnToStory}
          defaultRevealed={defaultRevealed}
        />
      )}
    </div>
  );
}
