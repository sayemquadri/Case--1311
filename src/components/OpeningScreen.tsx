/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  EXACT_CASE_TITLE,
  EXACT_BUTTON_TEXT,
  DARKNESS_DURATION_MS,
  TOTAL_BUTTON_REVEAL_MS,
} from '../utils/openingSequence';

interface OpeningScreenProps {
  onCheckCase: () => void;
  skipIntro?: boolean;
}

export function OpeningScreen({ onCheckCase, skipIntro = false }: OpeningScreenProps) {
  const [stage, setStage] = useState<'darkness' | 'title' | 'ready'>(
    skipIntro ? 'ready' : 'darkness'
  );

  useEffect(() => {
    if (skipIntro) {
      setStage('ready');
      return;
    }

    // Step 1: Complete pitch black silence for ~0.8s
    const titleTimer = setTimeout(() => {
      setStage('title');
    }, DARKNESS_DURATION_MS);

    // Step 2: Button revealed ~1.2s after title appears (~2.0s total)
    const buttonTimer = setTimeout(() => {
      setStage('ready');
    }, TOTAL_BUTTON_REVEAL_MS);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(buttonTimer);
    };
  }, [skipIntro]);

  const isTitleVisible = stage === 'title' || stage === 'ready';
  const isButtonVisible = stage === 'ready';

  return (
    <main
      className="fixed inset-0 w-screen h-[100dvh] bg-[#000000] text-[#A31525] flex items-center justify-center overflow-hidden p-6 select-none relative"
      aria-label="CASE FILE 1311 Classified Opening Screen"
    >
      {/* Centered composition with generous surrounding pitch-black space */}
      <div className="flex flex-col items-center justify-center text-center max-w-4xl w-full px-4">
        {/* Case Title - slightly larger for cinematic presence while fitting mobile */}
        {isTitleVisible && (
          <h1
            data-testid="case-title"
            className="animate-title-glitch font-mono font-bold uppercase text-[#A31525] text-sm sm:text-base md:text-xl lg:text-2xl tracking-[0.16em] sm:tracking-[0.22em] leading-relaxed select-none"
          >
            {EXACT_CASE_TITLE}
          </h1>
        )}
      </div>

      {/* Action Button: revealed in the bottom-right corner as an invitation into the classified dossier */}
      {isButtonVisible && (
        <div className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 animate-button-flicker z-20">
          <button
            type="button"
            data-testid="check-case-button"
            onClick={onCheckCase}
            className="group font-mono text-xs sm:text-sm lowercase tracking-[0.18em] text-[#8F1320] hover:text-[#A31525] bg-transparent border border-transparent hover:border-[#8F1320]/30 px-3 py-1.5 transition-all duration-300 ease-out cursor-pointer active:opacity-60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8F1320]/60 inline-flex items-center gap-2"
            aria-label="Check the case file"
          >
            <span className="transition-all duration-300 group-hover:tracking-[0.24em]">
              {EXACT_BUTTON_TEXT}
            </span>
            <span
              className="text-[#8F1320] group-hover:text-[#A31525] transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>
      )}
    </main>
  );
}
