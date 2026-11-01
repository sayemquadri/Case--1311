/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageInteraction } from '../data/storyContent';

interface StoryPageInteractionProps {
  interaction: PageInteraction;
  pageId: number;
}

export function StoryPageInteraction({ interaction, pageId }: StoryPageInteractionProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const toggleReveal = () => {
    setIsRevealed((prev) => !prev);
  };

  switch (interaction.type) {
    case 'window':
      return (
        <div className="border border-[#8F1320]/30 bg-[#161211]/90 rounded p-3 sm:p-4 text-[#ede3cb] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono tracking-widest text-[#8F1320] uppercase gap-1">
            <span>[ EVIDENCE CLUE: THE WINDOW ]</span>
            <span className="opacity-75">INTERACTIVE FIELD</span>
          </div>

          <div
            onClick={toggleReveal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') toggleReveal();
            }}
            className="relative h-28 sm:h-32 w-full rounded border border-[#8F1320]/40 bg-gradient-to-b from-[#1b1716] via-[#211b19] to-[#0e0c0b] flex flex-col items-center justify-center cursor-pointer overflow-hidden p-3 group select-none transition-all hover:border-[#A31525]"
            aria-label="Tap the window glass"
          >
            {/* Window pane crossbars */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="w-full h-full border border-[#8F1320]/40" />
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#8F1320]/40" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#8F1320]/40" />
            </div>

            {/* Crimson scratch line on glass */}
            {isRevealed && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
                <path
                  d="M 30 85 Q 120 45, 260 55 T 380 25"
                  fill="none"
                  stroke="#A31525"
                  strokeWidth="2.5"
                  strokeDasharray="200"
                  strokeDashoffset="0"
                  className="animate-pulse"
                />
              </svg>
            )}

            {!isRevealed ? (
              <div className="text-center space-y-1 z-10">
                <span className="font-mono text-xs text-[#c9959b] tracking-[0.2em] uppercase group-hover:text-[#ff3b53] transition-colors">
                  ▸ {interaction.promptLabel}
                </span>
                <p className="text-[10px] font-mono text-[#8F1320]/70 italic">
                  Look closely at the illuminated glass
                </p>
              </div>
            ) : (
              <div className="text-center space-y-2 z-10 animate-fade-in max-w-md px-2">
                <p className="font-mono text-[11px] text-[#A31525] italic tracking-wide">
                  A thin line of crimson appears in the glass, like a scratch that wasn't there a moment ago.
                </p>
                <p className="font-mono text-xs sm:text-sm font-bold text-[#f5ecd8] tracking-wider pt-1 border-t border-[#8F1320]/30">
                  “{interaction.revealedText}”
                </p>
              </div>
            )}
          </div>
        </div>
      );

    case 'map':
      return (
        <div className="border border-[#8F1320]/30 bg-[#161211]/90 rounded p-3 sm:p-4 text-[#ede3cb] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono tracking-widest text-[#8F1320] uppercase gap-1">
            <span>[ EVIDENCE CLUE: THE FOLDED MAP ]</span>
            <span className="opacity-75">INTERACTIVE FIELD</span>
          </div>

          <div
            onClick={toggleReveal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') toggleReveal();
            }}
            className="relative min-h-[120px] w-full rounded border border-[#8F1320]/40 bg-[#1e1715] p-3 sm:p-4 cursor-pointer group select-none transition-all hover:border-[#A31525]"
            aria-label="Open the folded map"
          >
            {!isRevealed ? (
              <div className="flex flex-col items-center justify-center py-4 space-y-1">
                <span className="font-mono text-xs text-[#c9959b] tracking-[0.2em] uppercase group-hover:text-[#ff3b53] transition-colors">
                  ▸ {interaction.promptLabel}
                </span>
                <p className="text-[10px] font-mono text-[#8F1320]/70 italic">
                  Folded paper fragment with pencilled coordinates
                </p>
              </div>
            ) : (
              <div className="space-y-3 animate-fade-in">
                {/* Visual schematic of the route */}
                <div className="border border-[#8F1320]/25 bg-[#120e0d] p-3 rounded text-[11px] font-mono">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-[#8F1320]/80 border-b border-[#8F1320]/20 pb-1 mb-2 gap-1">
                    <span>RECOVERED ITINERARY // 3 CITIES</span>
                    <span className="text-[#A31525]">DESTINATION: UNMARKED</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-xs py-2 px-1 text-[#d1bda5] gap-2">
                    <span>CITY 01</span>
                    <span className="text-[#8F1320]">→</span>
                    <span>CITY 02</span>
                    <span className="text-[#8F1320]">→</span>
                    <span>CITY 03</span>
                    <span className="text-[#8F1320]">→ ⋮ [EDGE OF PAPER]</span>
                  </div>

                  <div className="text-right pt-2 border-t border-[#8F1320]/20">
                    <span className="text-[10px] text-[#8F1320] mr-2">HANDWRITTEN NOTE:</span>
                    <span className="font-mono text-sm sm:text-base font-bold text-[#ff3b53] tracking-widest uppercase">
                      {interaction.revealedText}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] font-mono text-[#8F1320]/80 italic text-center">
                  Inside is a pencilled route ending abruptly at the edge of the paper. There is no X marking the destination.
                </p>
              </div>
            )}
          </div>
        </div>
      );

    case 'bookmark':
      return (
        <div className="border border-[#8F1320]/30 bg-[#161211]/90 rounded p-3 sm:p-4 text-[#ede3cb] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono tracking-widest text-[#8F1320] uppercase gap-1">
            <span>[ EVIDENCE CLUE: THE BOOKMARK ]</span>
            <span className="opacity-75">INTERACTIVE FIELD</span>
          </div>

          <div
            onClick={toggleReveal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') toggleReveal();
            }}
            className="relative min-h-[100px] w-full rounded border border-[#8F1320]/40 bg-[#1c1514] p-3 sm:p-4 cursor-pointer group select-none transition-all hover:border-[#A31525]"
            aria-label="Lift the red marker"
          >
            {/* Red paper marker band */}
            <div className="bg-[#8F1320] text-[#ffeef0] px-3 py-1.5 rounded-sm font-mono text-xs tracking-widest uppercase flex items-center justify-between shadow-md">
              <span>RED MARKER: &quot;What do stories leave behind?&quot;</span>
              <span className="text-[10px] opacity-80 group-hover:translate-y-[-1px] transition-transform ml-2 shrink-0">
                {!isRevealed ? '▸ LIFT' : '▾ FOLD BACK'}
              </span>
            </div>

            {isRevealed && (
              <div className="mt-3 pt-2 border-t border-[#8F1320]/25 animate-fade-in space-y-1">
                <span className="text-[10px] font-mono text-[#8F1320]/80 uppercase block">
                  Beneath the marker in almost illegible handwriting:
                </span>
                <p className="font-mono text-xs sm:text-sm font-bold text-[#ff3b53] tracking-wider italic">
                  “{interaction.revealedText}”
                </p>
              </div>
            )}
          </div>
        </div>
      );

    case 'casenumber':
      return (
        <div className="border border-[#8F1320]/30 bg-[#161211]/90 rounded p-3 sm:p-4 text-[#ede3cb] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono tracking-widest text-[#8F1320] uppercase gap-1">
            <span>[ EVIDENCE CLUE: CIPHER 1311 ]</span>
            <span className="opacity-75">INTERACTIVE FIELD</span>
          </div>

          <div
            onClick={toggleReveal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') toggleReveal();
            }}
            className="relative min-h-[110px] w-full rounded border border-[#8F1320]/40 bg-[#1d1615] p-3 sm:p-4 cursor-pointer group select-none transition-all hover:border-[#A31525] flex flex-col items-center justify-center text-center"
            aria-label="Tap cipher 1311"
          >
            <div className="inline-block border border-[#8F1320] bg-[#2a1317] px-4 py-1.5 rounded text-[#ff3b53] font-mono font-bold text-lg tracking-[0.3em] group-hover:scale-105 transition-transform shadow-sm">
              1311
            </div>
            <span className="text-[10px] font-mono text-[#c9959b] tracking-widest uppercase mt-2 group-hover:text-[#ff3b53]">
              {!isRevealed ? '▸ Tap to shift paper aside' : '▾ Paper shifted'}
            </span>

            {isRevealed && (
              <div className="mt-4 pt-3 border-t border-[#8F1320]/30 w-full animate-fade-in space-y-2">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 font-mono text-xs font-bold tracking-widest">
                  <span className="text-[#ede3cb]">1. THE HOUSE</span>
                  <span className="text-[#8F1320]">·</span>
                  <span className="text-[#ede3cb]">2. THE GIRL</span>
                  <span className="text-[#8F1320]">·</span>
                  <span className="text-[#ff3b53] underline decoration-wavy decoration-[#8F1320]">
                    3. TOMORROW
                  </span>
                </div>
                <p className="font-mono text-[10px] text-[#A31525] italic">
                  (The ink beneath the final word is still wet.)
                </p>
              </div>
            )}
          </div>
        </div>
      );

    case 'stamp':
      return (
        <div className="border border-[#8F1320]/30 bg-[#161211]/90 rounded p-3 sm:p-4 text-[#ede3cb] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono tracking-widest text-[#8F1320] uppercase gap-1">
            <span>[ EVIDENCE CLUE: DOSSIER CLASSIFICATION ]</span>
            <span className="opacity-75">INTERACTIVE FIELD</span>
          </div>

          <div
            onClick={toggleReveal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') toggleReveal();
            }}
            className="relative min-h-[110px] w-full rounded border border-[#8F1320]/40 bg-[#1a1413] p-3 sm:p-4 cursor-pointer group select-none transition-all hover:border-[#A31525] flex flex-col items-center justify-center text-center"
            aria-label="Stamp the document"
          >
            {!isRevealed ? (
              <div className="space-y-1">
                <span className="font-mono text-xs text-[#c9959b] tracking-[0.2em] uppercase group-hover:text-[#ff3b53] transition-colors">
                  ▸ {interaction.promptLabel}
                </span>
                <p className="text-[10px] font-mono text-[#8F1320]/70 italic">
                  Initial charge: CULPRIT → Click to register forensic re-examination
                </p>
              </div>
            ) : (
              <div className="space-y-3 animate-fade-in w-full">
                <div className="flex items-center justify-center gap-4 text-xs font-mono">
                  <span className="line-through text-[#785b51] opacity-70">CULPRIT</span>
                  <span className="text-[#8F1320]">→</span>
                  <span className="font-bold text-[#f5ecd8] border border-[#8F1320]/50 px-2 py-0.5">
                    WITNESS
                  </span>
                </div>

                <div className="inline-block border-2 border-[#A31525] text-[#ff3b53] font-mono font-bold text-sm tracking-[0.25em] uppercase px-4 py-1 rotate-[-1deg] shadow-[0_0_12px_rgba(163,21,37,0.3)]">
                  {interaction.revealedText}
                </div>
                <p className="text-[10px] font-mono text-[#8F1320]/80 italic">
                  Red ink spreads unevenly across the page. A place could shape a life without explaining everything.
                </p>
              </div>
            )}
          </div>
        </div>
      );

    case 'tornpaper':
      return (
        <div className="border border-[#8F1320]/30 bg-[#161211]/90 rounded p-3 sm:p-4 text-[#ede3cb] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono tracking-widest text-[#8F1320] uppercase gap-1">
            <span>[ EVIDENCE CLUE: THE MISSING LINE ]</span>
            <span className="opacity-75">INTERACTIVE FIELD</span>
          </div>

          <div
            onClick={toggleReveal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') toggleReveal();
            }}
            className="relative min-h-[100px] w-full rounded border border-[#8F1320]/40 bg-[#1d1615] p-3 sm:p-4 cursor-pointer group select-none transition-all hover:border-[#A31525]"
            aria-label="Lift the torn paper"
          >
            {!isRevealed ? (
              <div className="flex flex-col items-center justify-center py-2 space-y-1">
                <div className="bg-[#2a1d1b] border-dashed border border-[#8F1320]/50 px-4 py-2 text-center rounded">
                  <span className="font-mono text-xs text-[#c9959b] tracking-[0.2em] uppercase group-hover:text-[#ff3b53]">
                    ▸ {interaction.promptLabel}
                  </span>
                </div>
                <p className="text-[10px] font-mono text-[#8F1320]/70 italic pt-1 text-center">
                  A torn fragment adhered over unwritten journal margin
                </p>
              </div>
            ) : (
              <div className="animate-fade-in space-y-2 p-2">
                <span className="text-[10px] font-mono text-[#8F1320]/80 uppercase block">
                  Revealed beneath torn fragment:
                </span>
                <p className="font-mono text-xs sm:text-sm font-bold text-[#ff3b53] tracking-wide italic leading-relaxed">
                  “{interaction.revealedText}”
                </p>
              </div>
            )}
          </div>
        </div>
      );

    case 'calendar':
      return (
        <div className="border border-[#8F1320]/30 bg-[#161211]/90 rounded p-3 sm:p-4 text-[#ede3cb] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono tracking-widest text-[#8F1320] uppercase gap-1">
            <span>[ EVIDENCE CLUE: THE CALENDAR ]</span>
            <span className="opacity-75">INTERACTIVE FIELD</span>
          </div>

          <div
            onClick={toggleReveal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') toggleReveal();
            }}
            className="relative min-h-[120px] w-full rounded border border-[#8F1320]/40 bg-[#1b1514] p-3 sm:p-4 cursor-pointer group select-none transition-all hover:border-[#A31525]"
            aria-label="Turn the calendar page"
          >
            {!isRevealed ? (
              <div className="flex flex-col items-center justify-center py-2 space-y-1">
                <span className="font-mono text-xs text-[#c9959b] tracking-[0.2em] uppercase group-hover:text-[#ff3b53]">
                  ▸ {interaction.promptLabel}
                </span>
                <p className="text-[10px] font-mono text-[#8F1320]/70 italic">
                  Turn to the final calendar sheet
                </p>
              </div>
            ) : (
              <div className="space-y-3 animate-fade-in">
                {/* Blank calendar grid simulation */}
                <div className="grid grid-cols-7 gap-1 border border-[#8F1320]/25 p-2 bg-[#100d0c] rounded text-center opacity-40">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="h-4 border border-[#8F1320]/20 flex items-center justify-center text-[8px] font-mono text-[#8F1320]">
                      —
                    </div>
                  ))}
                </div>

                <div className="text-center pt-2 border-t border-[#8F1320]/25">
                  <span className="text-[10px] font-mono text-[#8F1320] block mb-1 uppercase">
                    The final page has no dates at all:
                  </span>
                  <p className="font-mono text-xs sm:text-sm font-bold text-[#ff3b53] tracking-wide">
                    “{interaction.revealedText}”
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      );

    case 'turnpage':
      return (
        <div className="border border-[#8F1320]/30 bg-[#161211]/90 rounded p-4 text-[#ede3cb] space-y-2 text-center">
          <div className="text-[10px] font-mono tracking-widest text-[#8F1320] uppercase">
            [ CONCLUSION OF MANUSCRIPT ]
          </div>
          <p className="font-mono text-xs text-[#d1bda5] italic leading-relaxed">
            {interaction.revealedText}
          </p>
          <div className="pt-2 text-[10px] font-mono text-[#8F1320]/80">
            Case 1311 now proceeds to the sealed evidence envelope.
          </div>
        </div>
      );

    default:
      return null;
  }
}
