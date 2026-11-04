/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  CASE_TITLE_LINE_1,
  CASE_TITLE_LINE_2,
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
      {/* Title positioned around upper-middle/central region with cinematic negative space */}
      <div className="flex flex-col items-center justify-center text-center max-w-xl w-full px-2 -translate-y-4 sm:-translate-y-6">
        {/* Case Title - two deliberate lines, never wrapping CASE and 1311 separately */}
        {isTitleVisible && (
          <h1
            data-testid="case-title"
            className="animate-title-glitch font-mono font-bold uppercase text-[#A31525] text-sm sm:text-base md:text-xl lg:text-2xl tracking-[0.09em] sm:tracking-[0.14em] md:tracking-[0.18em] leading-snug sm:leading-relaxed select-none max-w-full"
          >
            <span className="block whitespace-nowrap">{CASE_TITLE_LINE_1}</span>
            <span className="block whitespace-nowrap mt-1 sm:mt-2 text-[#A31525]">
              {CASE_TITLE_LINE_2}
            </span>
          </h1>
        )}
      </div>

      {/* Action Button: revealed in the bottom-right corner, brighter crimson text, comfortable touch area */}
      {isButtonVisible && (
        <div className="absolute bottom-8 right-6 sm:bottom-12 sm:right-10 animate-button-flicker z-20">
          <button
            type="button"
            data-testid="check-case-button"
            onClick={onCheckCase}
            className="group font-mono text-sm sm:text-base lowercase tracking-[0.16em] text-[#DE3B4C] hover:text-[#FF5A6B] active:text-[#FF5A6B] bg-transparent border-0 cursor-pointer p-3 -m-3 min-h-[48px] inline-flex items-center gap-2.5 select-none transition-all duration-200 ease-out active:scale-[0.97] active:opacity-85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#DE3B4C]/60"
            aria-label="check the case"
          >
            <span className="transition-colors duration-200">
              {EXACT_BUTTON_TEXT}
            </span>
            <span
              className="text-[#DE3B4C] group-hover:text-[#FF5A6B] group-hover:translate-x-1.5 transition-all duration-200 ease-out"
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
