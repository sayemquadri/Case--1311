/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DIARY_SPREADS, DiarySpread } from '../data/storyContent';
import { ClassifiedStamp, CrimsonFingerprint, InkSplatter } from './TactileDecorations';

// Assets
import antiquePaperImg from '../assets/images/antique_manuscript_paper_1793563752766.jpg';
import vintageJournalImg from '../assets/images/vintage_reading_journal_1793563753682.jpg';

interface InteractiveDiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToUnlock: () => void;
  onPageTurnAudio?: () => void;
}

export function InteractiveDiaryModal({
  isOpen,
  onClose,
  onProceedToUnlock,
  onPageTurnAudio,
}: InteractiveDiaryModalProps) {
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | null>(null);

  if (!isOpen) return null;

  const currentSpread: DiarySpread = DIARY_SPREADS[currentSpreadIndex];
  const isFirstSpread = currentSpreadIndex === 0;
  const isLastSpread = currentSpreadIndex === DIARY_SPREADS.length - 1;

  const handleNext = () => {
    if (isLastSpread) return;
    onPageTurnAudio?.();
    setTurnDirection('next');
    setTimeout(() => {
      setCurrentSpreadIndex((prev) => prev + 1);
      setTurnDirection(null);
    }, 180);
  };

  const handlePrev = () => {
    if (isFirstSpread) return;
    onPageTurnAudio?.();
    setTurnDirection('prev');
    setTimeout(() => {
      setCurrentSpreadIndex((prev) => prev - 1);
      setTurnDirection(null);
    }, 180);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Antique Diary"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative max-w-4xl w-full my-auto flex flex-col items-center">
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between py-2 px-3 mb-2 bg-[#120F0D]/90 border border-[#8F1320]/40 rounded text-neutral-300 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8F1320] animate-pulse" />
            <span className="font-bold text-[#D5A0A6] uppercase tracking-wider">
              EXHIBIT 1311-A // RECOVERED ANTIQUE DIARY
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#A89887] text-[11px] hidden sm:inline">
              SPREAD {currentSpreadIndex + 1} OF {DIARY_SPREADS.length}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 bg-[#8F1320]/20 hover:bg-[#8F1320] text-red-200 text-xs font-bold rounded border border-[#8F1320]/50 transition-colors cursor-pointer"
            >
              ✕ Close Diary
            </button>
          </div>
        </div>

        {/* Physical Antique Book Container */}
        <div className="relative w-full shadow-[0_25px_70px_rgba(0,0,0,0.98),0_0_20px_rgba(143,19,32,0.4)] rounded-lg p-2 sm:p-5 bg-[#2B1B15] border-4 border-[#3D261E]">
          {/* Leather Book Spine & Texture Rim */}
          <div className="absolute inset-0 pointer-events-none rounded-lg border-2 border-[#170E0A] opacity-70" />

          {/* Book Double-Page Spread */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0 bg-[#F4ECDA] text-[#241A15] rounded border border-[#BFA985] shadow-2xl overflow-hidden transition-opacity duration-200 ${
              turnDirection ? 'opacity-70 scale-[0.99]' : 'opacity-100 scale-100'
            }`}
            style={{
              backgroundImage: 'linear-gradient(to right, #EDE1C5, #FAF4E5 50%, #ECE0C4)',
            }}
          >
            {/* ================= LEFT PAGE ================= */}
            <div className="relative p-4 sm:p-7 md:border-r border-[#C7B594] flex flex-col justify-between min-h-[360px] sm:min-h-[440px] bg-[#FAF4E5]/80">
              {/* Decorative paper spine shadow on right edge for 3D realism */}
              <div className="hidden md:block absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />

              {/* Red blood/ink stain in top corner */}
              <div className="absolute -top-3 -left-3 pointer-events-none opacity-30">
                <InkSplatter className="w-16 h-16" />
              </div>

              <div>
                {/* Header Date & Title */}
                <div className="border-b border-[#8F1320]/30 pb-2 mb-4">
                  <div className="flex items-center justify-between font-mono text-[10px] sm:text-[11px] font-bold text-[#8F1320] uppercase tracking-widest">
                    <span>{currentSpread.entryDate}</span>
                    <span>FOLIO #{currentSpread.id * 2 - 1}</span>
                  </div>
                  <h3
                    className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1E1513] mt-0.5"
                    style={{ fontFamily: "'Cinzel', 'Lora', serif" }}
                  >
                    {currentSpread.entryTitle}
                  </h3>
                </div>

                {/* Mandated Greeting: "hii, I'm..." with name physically torn away / obscured by blood */}
                <div className="mb-4">
                  <div className="inline-flex items-center flex-wrap gap-1.5 font-serif text-base sm:text-lg font-bold text-[#1F1513]">
                    <span className="italic">{currentSpread.leftPage.greetingPrefix}</span>
                    <span
                      title="Name torn away and stained with crimson ink"
                      className="inline-flex items-center px-2 py-0.5 bg-[#4A0A10] text-[#FFC4C8] text-xs sm:text-sm font-mono font-bold tracking-wider rounded-[2px] shadow-inner select-none relative overflow-hidden border border-[#8F1320]"
                    >
                      <span className="line-through decoration-[#DE3B4C] decoration-2">
                        {currentSpread.leftPage.obscuredNameNote}
                      </span>
                      {/* Blood overlay texture */}
                      <span className="absolute inset-0 bg-red-950/60 mix-blend-multiply pointer-events-none" />
                    </span>
                    <span>,</span>
                  </div>
                </div>

                {/* Condensed Narrative Text in first-person */}
                <div className="space-y-3 font-serif text-[13.5px] sm:text-[14.5px] leading-relaxed text-[#2B1F1C]">
                  {currentSpread.leftPage.text.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Bottom Signoff */}
              <div className="pt-4 border-t border-[#B5A17D]/40 font-serif italic text-xs text-[#6B5342]">
                {currentSpread.leftPage.handwrittenSignoff}
              </div>
            </div>

            {/* ================= RIGHT PAGE ================= */}
            <div className="relative p-4 sm:p-7 flex flex-col justify-between min-h-[360px] sm:min-h-[440px] bg-[#F5EBD4]/90">
              {/* Decorative paper spine shadow on left edge for 3D realism */}
              <div className="hidden md:block absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />

              {/* Red blood/ink fingerprint */}
              <div className="absolute top-2 right-3 pointer-events-none opacity-20">
                <CrimsonFingerprint className="w-14 h-18" />
              </div>

              <div>
                {/* Header Tag */}
                <div className="border-b border-[#8F1320]/30 pb-2 mb-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#8F1320] uppercase tracking-wider">
                    {currentSpread.rightPage.exhibitTag}
                  </span>
                  <span className="font-mono text-[10px] text-[#7A6455]">
                    FOLIO #{currentSpread.id * 2}
                  </span>
                </div>

                {/* Recovered Visual / Clue Item */}
                <div className="mb-4">
                  {currentSpread.rightPage.photoType === 'house' && (
                    <div className="relative bg-[#2B1B15] p-2.5 rounded shadow-md border border-[#8F1320]/40 -rotate-1">
                      {/* Washi tape piece */}
                      <div className="absolute -top-2 left-6 w-12 h-4 bg-[#DFD0AA]/80 border border-[#9A8462] rotate-3 shadow-sm" />
                      <div className="w-full h-28 bg-[#120D0A] flex flex-col items-center justify-center text-center p-2 rounded">
                        <span className="text-2xl mb-1">🏡</span>
                        <span className="font-serif italic text-xs text-[#E8DCB9]">
                          "A house of golden lamps, warm tea, and unyielding routines."
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] font-mono text-[#E8DCB9]/80 text-center">
                        {currentSpread.rightPage.caption}
                      </div>
                    </div>
                  )}

                  {currentSpread.rightPage.photoType === 'map' && (
                    <div className="relative bg-[#F2E8D2] p-2.5 rounded shadow-md border-2 border-dashed border-[#8F1320]/60 rotate-1">
                      <div className="w-full h-28 bg-[#FAF4E5] flex flex-col items-center justify-center text-center p-2 rounded border border-[#C2B193]">
                        <span className="text-2xl mb-1">🗺️</span>
                        <span className="font-serif italic text-xs text-[#4A382C]">
                          "Lisbon · Prague · Vienna — routes circled in red ink."
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] font-mono text-[#8F1320] text-center font-bold">
                        {currentSpread.rightPage.caption}
                      </div>
                    </div>
                  )}

                  {currentSpread.rightPage.photoType === 'midnight' && (
                    <div className="relative bg-[#231A16] p-2.5 rounded shadow-md border border-[#8F1320] -rotate-1">
                      <div className="w-full h-28 bg-[#0F0A08] flex flex-col items-center justify-center text-center p-2 rounded border border-[#52131A]">
                        <span className="text-2xl mb-1">🕯️</span>
                        <span className="font-serif italic text-xs text-[#E8DCB9]">
                          "The anonymous observer waits outside the light of the cage."
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] font-mono text-[#E8DCB9]/80 text-center">
                        {currentSpread.rightPage.caption}
                      </div>
                    </div>
                  )}

                  {/* ================= FINAL SPREAD: HIDDEN PASSWORD CLUE ================= */}
                  {currentSpread.rightPage.isFinalSpread && (
                    <div
                      data-testid="hidden-password-clue-box"
                      className="relative bg-[#FFF7E8] border-2 border-[#8F1320] p-4 rounded shadow-lg text-center space-y-2 -rotate-1"
                    >
                      <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#8F1320]">
                        ★ CONFIDENTIAL CIPHER KEY ★
                      </div>
                      <div className="py-2 px-4 bg-[#8F1320]/10 border-2 border-dashed border-[#8F1320] rounded inline-block">
                        <span className="font-mono text-2xl font-bold tracking-[0.3em] text-[#8F1320]">
                          1311
                        </span>
                      </div>
                      <p className="font-serif text-xs text-[#3D2E28] leading-tight">
                        {currentSpread.rightPage.hiddenPasswordClue?.instruction}
                      </p>

                      <button
                        type="button"
                        data-testid="unlock-envelope-direct-button"
                        onClick={() => {
                          onClose();
                          onProceedToUnlock();
                        }}
                        className="w-full py-2.5 px-4 bg-[#8F1320] hover:bg-[#A31525] active:bg-[#6E0E18] text-white font-mono text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
                      >
                        <span>🔓 UNLOCK ENVELOPE (CODE: 1311) →</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Marginalia Annotations */}
                <div className="space-y-1.5 pt-2">
                  {currentSpread.rightPage.annotationNotes.map((note, idx) => (
                    <div
                      key={idx}
                      className="font-mono text-[11px] sm:text-xs text-[#6B4F3B] leading-snug flex items-start gap-1.5"
                    >
                      <span className="text-[#8F1320] font-bold">▸</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Stamp or Exhibit Mark */}
              <div className="pt-3 border-t border-[#B5A17D]/40 flex items-center justify-between">
                <ClassifiedStamp text="CASE 1311 // DOSSIER" className="scale-75 origin-left" />
                <span className="font-mono text-[10px] text-[#7A6455] italic">
                  Classified Archive 1311
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pagination Controls */}
        <div className="w-full flex items-center justify-between mt-3 px-2">
          <button
            type="button"
            data-testid="diary-prev-button"
            onClick={handlePrev}
            disabled={isFirstSpread}
            className={`px-4 py-2 rounded font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer ${
              isFirstSpread
                ? 'opacity-30 border-neutral-800 text-neutral-600 cursor-not-allowed'
                : 'bg-[#231A16] hover:bg-[#382821] text-amber-100 border-[#8F1320]/60'
            }`}
          >
            ← Previous Spread
          </button>

          <span className="font-mono text-xs text-amber-200/70 tracking-widest">
            {currentSpreadIndex + 1} / {DIARY_SPREADS.length}
          </span>

          <button
            type="button"
            data-testid="diary-next-button"
            onClick={handleNext}
            disabled={isLastSpread}
            className={`px-4 py-2 rounded font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer ${
              isLastSpread
                ? 'opacity-30 border-neutral-800 text-neutral-600 cursor-not-allowed'
                : 'bg-[#8F1320] hover:bg-[#A31525] text-amber-100 border-[#DE3B4C]'
            }`}
          >
            Next Spread →
          </button>
        </div>
      </div>
    </div>
  );
}
