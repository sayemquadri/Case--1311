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
      className="fixed inset-0 w-screen h-[100dvh] bg-[#000000] text-[#A31525] flex flex-col items-center justify-center overflow-hidden p-6 select-none"
      aria-label="The Sanober Files Classified Opening Screen"
    >
      {/* Centered composition with generous surrounding pitch-black space */}
      <div className="flex flex-col items-center justify-center text-center max-w-3xl w-full">
        {/* Case Title */}
        {isTitleVisible && (
          <h1
            data-testid="case-title"
            className="animate-title-glitch font-mono font-bold uppercase text-[#A31525] text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.18em] sm:tracking-[0.24em] leading-relaxed select-none"
          >
            {EXACT_CASE_TITLE}
          </h1>
        )}

        {/* Action Button: revealed 1.2s after title */}
        {isButtonVisible && (
          <div className="mt-8 sm:mt-10 animate-button-flicker">
            <button
              type="button"
              data-testid="check-case-button"
              onClick={onCheckCase}
              className="group font-mono text-[11px] sm:text-xs lowercase tracking-[0.18em] text-[#85121e] hover:text-[#A31525] bg-transparent border border-transparent px-2.5 py-1 transition-all duration-300 ease-out cursor-pointer active:opacity-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#85121e]/50"
            >
              <span className="transition-all duration-300 group-hover:tracking-[0.24em]">
                {EXACT_BUTTON_TEXT}
              </span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
