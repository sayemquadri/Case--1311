/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ClassifiedStamp } from './TactileDecorations';

interface TriggerWarningScreenProps {
  onEnterAnyways: () => void;
}

const ADVISORY_ITEMS = [
  'Homicide (1 victim, unidentified)',
  'Missing evidence',
  'Psychological suspense',
  'Unreliable narrator',
  'One suspect who knows you well',
];

export function TriggerWarningScreen({ onEnterAnyways }: TriggerWarningScreenProps) {
  return (
    <section
      className="w-full h-[100dvh] bg-[#000000] text-[#241A15] flex items-center justify-center p-3 sm:p-4 overflow-hidden select-none"
      aria-label="Content Advisory"
    >
      <div className="relative max-w-sm sm:max-w-md w-full bg-[#EBE2D3] border border-[#B8A68B] shadow-[0_20px_50px_rgba(0,0,0,0.92),0_0_1px_rgba(143,19,32,0.4)] rounded-[2px] p-4 sm:p-6 flex flex-col justify-between">
        {/* 1. Small red label & 2. Title */}
        <header className="border-b border-[#B8A68B]/70 pb-3 mb-3">
          <div className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.24em] text-[#8F1320] uppercase">
            CONTENT ADVISORY
          </div>
          <h1
            data-testid="warning-heading"
            className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1E1513] mt-1"
            style={{ fontFamily: "'Cinzel', 'Lora', serif" }}
          >
            READER ADVISORY
          </h1>
        </header>

        {/* 3. The existing stamp: CASE 1311 // RESTRICTED */}
        <div className="mb-3.5 self-start">
          <ClassifiedStamp text="CASE 1311 // RESTRICTED" className="-rotate-1" />
        </div>

        {/* 4. A short list of 5 items, each on a single line, numbered 1 to 5 in existing small boxes */}
        <div
          data-testid="warning-content-area"
          className="bg-[#F5EFE4] border border-[#C5B49C] p-3 sm:p-3.5 rounded-[2px] shadow-inner mb-4"
        >
          <ul className="space-y-2 sm:space-y-2.5">
            {ADVISORY_ITEMS.map((item, index) => (
              <li key={index} className="flex items-center gap-2.5 text-[#2B1F1C]">
                <span className="font-mono text-[11px] font-bold text-[#8F1320] bg-[#8F1320]/10 border border-[#8F1320]/30 w-5 h-5 flex items-center justify-center shrink-0 rounded-[1px]">
                  {index + 1}
                </span>
                <span className="font-serif text-[12.5px] sm:text-[13.5px] whitespace-nowrap tracking-tight leading-none">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* 5. Full-width button: CHECK THE FOOTAGE → (min height 52px, tap area covers whole button) */}
        <button
          type="button"
          data-testid="enter-anyways-button"
          onClick={onEnterAnyways}
          className="w-full min-h-[52px] px-6 py-3.5 bg-[#8F1320] hover:bg-[#A31525] active:bg-[#6E0E18] text-[#F5EFE4] font-mono text-xs sm:text-sm font-bold tracking-[0.22em] uppercase rounded-[2px] shadow-[0_4px_14px_rgba(143,19,32,0.4)] cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F1320] focus-visible:ring-offset-2 select-none"
        >
          <span>CHECK THE FOOTAGE →</span>
        </button>
      </div>
    </section>
  );
}
