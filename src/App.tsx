/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppScreen } from './utils/experienceState';
import { OpeningScreen } from './components/OpeningScreen';
import { TriggerWarningScreen } from './components/TriggerWarningScreen';
import { CctvSurveillanceScreen } from './components/CctvSurveillanceScreen';
import { StoryBookScreen } from './components/StoryBookScreen';
import { FinalEnvelopeScreen } from './components/FinalEnvelopeScreen';

export default function App() {
  // Check URL parameters for direct state testing if specified
  const getInitialScreen = (): AppScreen => {
    const params = new URLSearchParams(window.location.search);
    const screenParam = params.get('screen');
    if (
      screenParam === 'warning' ||
      screenParam === 'cctv' ||
      screenParam === 'story' ||
      screenParam === 'envelope'
    ) {
      return screenParam as AppScreen;
    }
    return 'opening';
  };

  const [currentScreen, setCurrentScreen] = useState<AppScreen>(getInitialScreen);
  const [isEnvelopeUnlocked, setIsEnvelopeUnlocked] = useState<boolean>(false);

  const params = new URLSearchParams(window.location.search);
  const skipIntro = params.get('autostart') === '1';
  const defaultRevealed = params.get('unfolded') === '1';

  // Navigation handlers
  const handleCheckCase = () => {
    setCurrentScreen('warning');
  };

  const handleProceedToCctv = () => {
    setCurrentScreen('cctv');
  };

  const handleUnlockEnvelope = () => {
    setIsEnvelopeUnlocked(true);
    setCurrentScreen('envelope');
  };

  const handleDirectOpenEnvelope = () => {
    setCurrentScreen('envelope');
  };

  const handleReturnToCctv = () => {
    setCurrentScreen('cctv');
  };

  const handleProceedToEnvelopeFromStory = () => {
    setCurrentScreen('envelope');
  };

  return (
    <div className="w-screen h-[100dvh] bg-[#000000] text-[#A31525] overflow-hidden select-none">
      {/* 1. OPENING SCREEN — EXACT PRESERVATION */}
      {currentScreen === 'opening' && (
        <OpeningScreen onCheckCase={handleCheckCase} skipIntro={skipIntro} />
      )}

      {/* 2. TRIGGER WARNING SCREEN — BUTTON: CHECK THE FOOTAGE → */}
      {currentScreen === 'warning' && (
        <TriggerWarningScreen onEnterAnyways={handleProceedToCctv} />
      )}

      {/* 3. CCTV SURVEILLANCE EVIDENCE SCENE */}
      {currentScreen === 'cctv' && (
        <CctvSurveillanceScreen
          onUnlockEnvelopeSuccess={handleUnlockEnvelope}
          onDirectOpenEnvelope={handleDirectOpenEnvelope}
          isEnvelopeUnlocked={isEnvelopeUnlocked}
        />
      )}

      {/* 4. LEGACY / FALLBACK STORYBOOK SCREEN */}
      {currentScreen === 'story' && (
        <StoryBookScreen onProceedToEnvelope={handleProceedToEnvelopeFromStory} />
      )}

      {/* 5. FINAL SCENE — THE ENVELOPE & BIRTHDAY CELEBRATION */}
      {currentScreen === 'envelope' && (
        <FinalEnvelopeScreen
          onReturnToCctv={handleReturnToCctv}
          defaultRevealed={defaultRevealed}
        />
      )}
    </div>
  );
}
