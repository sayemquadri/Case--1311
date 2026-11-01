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
      className="w-full h-full bg-[#080707] text-[#241A15] overflow-y-auto px-3 sm:px-6 py-6 sm:py-10"
      aria-label="Content Advisory and Classified Briefing Screen"
    >
      {/* Background ambient forensic cues */}
      <div className="fixed top-4 left-6 pointer-events-none opacity-20 hidden md:block">
        <ClassifiedStamp text="CASE FILE 1311 // RESTRICTED DOSSIER" />
      </div>

      <div className="relative max-w-2xl w-full mx-auto bg-[#EBE2D3] border border-[#B8A68B] shadow-[0_20px_60px_rgba(0,0,0,0.92),0_0_1px_rgba(143,19,32,0.4)] rounded-[2px] p-5 sm:p-8 md:p-10 transition-all duration-300">
        {/* Subtle aged paper noise and watermark */}
        <div className="absolute top-3 right-4 pointer-events-none opacity-25">
          <CrimsonFingerprint className="w-12 h-16" />
        </div>
        <div className="absolute -bottom-4 -left-4 pointer-events-none opacity-20 hidden sm:block">
          <InkSplatter className="w-16 h-16" />
        </div>

        {/* Dossier Header */}
        <header className="border-b-2 border-[#8F1320] pb-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.24em] text-[#8F1320] uppercase">
                <span className="w-2 h-2 bg-[#8F1320]" />
                <span>{warning.subheading}</span>
              </div>
              <h1
                data-testid="warning-heading"
                className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#1E1513] mt-1"
                style={{ fontFamily: "'Cinzel', 'Lora', serif" }}
              >
                {warning.heading}
              </h1>
            </div>

            <div className="self-start sm:self-center">
              <ClassifiedStamp text={warning.stampText} className="-rotate-2" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 pt-2 border-t border-[#B8A68B]/60 font-mono text-[10px] text-[#5C4538] uppercase tracking-wider">
            <span>FILE REF: 1311-PROCEED</span>
            <span>CLEARANCE: LEVEL IV</span>
            <span>STATUS: PRE-TRANSMISSION REVIEW</span>
          </div>
        </header>

        {/* Content Disclosures Box (High Readability, Dark Ink on Aged Cream) */}
        <div
          data-testid="warning-content-area"
          className="bg-[#F5EFE4] border border-[#C5B49C] p-4 sm:p-6 rounded-[2px] space-y-4 mb-6 shadow-inner"
        >
          <div className="flex items-center justify-between border-b border-[#C5B49C]/70 pb-2">
            <span className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase text-[#8F1320]">
              SUBJECT MATTER & THEMATIC DISCLOSURES
            </span>
            <span className="font-mono text-[10px] text-[#7A6455] italic">
              [ 6 ARCHIVAL ITEMS ]
            </span>
          </div>

          <ul className="space-y-3 font-serif text-[14px] sm:text-[15px] leading-relaxed text-[#2B1F1C]">
            {warning.disclosures.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="font-mono text-xs font-bold text-[#8F1320] bg-[#8F1320]/10 border border-[#8F1320]/30 w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 rounded-[1px]">
                  {index + 1}
                </span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Author's Note / Clarification Box */}
        <div className="bg-[#DFD4C2] border-l-4 border-[#8F1320] p-4 sm:p-5 mb-8 rounded-r-[2px] space-y-2">
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#8F1320]">
            <span>AUTHOR'S ARCHIVAL NOTE</span>
          </div>
          <div className="space-y-2 font-serif text-[13px] sm:text-[14px] text-[#3D2E28] leading-relaxed italic">
            {warning.authorNote.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Footer Action: Proceed Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#B8A68B]">
          <span className="font-mono text-[11px] tracking-[0.14em] text-[#6E5547] uppercase text-center sm:text-left">
            Clearance verified · Proceed at your discretion
          </span>

          <button
            type="button"
            data-testid="enter-anyways-button"
            onClick={onEnterAnyways}
            className="w-full sm:w-auto min-h-[48px] px-8 py-3 bg-[#8F1320] hover:bg-[#A31525] active:bg-[#6E0E18] text-[#F5EFE4] font-mono text-xs sm:text-sm font-bold tracking-[0.22em] uppercase rounded-[2px] shadow-[0_4px_14px_rgba(143,19,32,0.4)] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F1320] focus-visible:ring-offset-2"
          >
            <span>{warning.buttonText}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
