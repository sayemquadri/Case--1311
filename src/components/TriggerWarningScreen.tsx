/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ClassifiedStamp, CrimsonFingerprint, InkSplatter } from './TactileDecorations';
import { EXPERIENCE_CONTENT } from '../data/storyContent';

interface TriggerWarningScreenProps {
  onEnterAnyways: () => void;
}

export function TriggerWarningScreen({ onEnterAnyways }: TriggerWarningScreenProps) {
  const { warning } = EXPERIENCE_CONTENT;

  return (
    <section
      className="fixed inset-0 w-screen h-[100dvh] bg-[#070606] text-[#A31525] flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto select-none"
      aria-label="Classified Content Advisory Screen"
    >
      {/* Background ambient texture / subtle forensic evidence cues */}
      <div className="absolute top-6 left-6 pointer-events-none opacity-20 hidden sm:block">
        <ClassifiedStamp text="CASE 1311 — RESTRICTED" />
      </div>

      <div className="relative max-w-xl w-full bg-[#110d0e] border border-[#8F1320]/30 p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(143,19,32,0.06)] rounded-[2px] transition-all">
        {/* Decorative tactical forensic marks */}
        <div className="absolute top-3 right-3 pointer-events-none opacity-25">
          <CrimsonFingerprint className="w-10 h-14" />
        </div>
        <div className="absolute -bottom-3 -left-3 pointer-events-none opacity-15">
          <InkSplatter className="w-14 h-14" />
        </div>

        {/* Dossier Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#8F1320]/25 pb-4 mb-6">
          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-[0.24em] text-[#8F1320]/80 uppercase">
              {warning.subheading}
            </span>
            <h2
              data-testid="warning-heading"
              className="font-mono text-base sm:text-lg md:text-xl font-bold uppercase tracking-[0.2em] text-[#A31525]"
            >
              {warning.heading}
            </h2>
          </div>

          <div className="self-start sm:self-center">
            <ClassifiedStamp text={warning.stampText} className="-rotate-2" />
          </div>
        </div>

        {/* Designated Editable Content Warning Box */}
        <div
          data-testid="warning-content-area"
          className="bg-[#0b0809] border border-dashed border-[#8F1320]/40 p-4 sm:p-5 rounded-[1px] space-y-3.5 mb-8"
        >
          <div className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-mono text-[#8F1320]/90">
            <span className="inline-block w-1.5 h-1.5 bg-[#A31525]" />
            <span>Designated Advisory Entries // Editable Field</span>
          </div>

          <ul className="space-y-2.5 font-mono text-xs sm:text-sm text-[#c89297] leading-relaxed">
            {warning.placeholderItems.map((item, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span className="text-[#8F1320] font-bold select-none">{`0${index + 1}.`}</span>
                <span className="bg-[#8F1320]/10 px-1.5 py-0.5 rounded text-[#e0a8ad] border-l-2 border-[#8F1320]/50">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <p className="font-mono text-[10px] tracking-wide text-[#8F1320]/60 italic pt-1 border-t border-[#8F1320]/15">
            // Notice: Author can customize all advisories in `src/data/storyContent.ts`
          </p>
        </div>

        {/* Action Button: enter anyways */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <span className="font-mono text-[11px] tracking-[0.16em] text-[#8F1320]/70 lowercase text-center sm:text-left">
            clearance granted — reader discretion advised
          </span>

          <button
            type="button"
            data-testid="enter-anyways-button"
            onClick={onEnterAnyways}
            className="w-full sm:w-auto font-mono text-xs uppercase tracking-[0.22em] text-[#8F1320] hover:text-[#A31525] bg-transparent hover:bg-[#8F1320]/10 border border-[#8F1320]/50 hover:border-[#A31525] px-6 py-2.5 transition-all duration-300 ease-out cursor-pointer active:scale-98 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A31525]"
          >
            {warning.buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
