/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { DIARY_SPREADS, DiarySpread } from '../data/storyContent';

// Assets
import antiquePaperImg from '../assets/images/antique_manuscript_paper_1793563752766.jpg';

interface InteractiveDiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToUnlock: () => void;
  onPageTurnAudio?: () => void;
}

/**
 * Realistic physical torn paper patch with fibrous frayed edges and dried crimson blood smears.
 * Visually conceals the name without displaying any placeholder text.
 */
function TornPaperNameCover() {
  return (
    <span
      className="relative inline-block align-middle mx-1 my-0.5 select-none"
      style={{ width: '88px', height: '22px' }}
      title="Name torn away and stained with crimson ink"
      aria-label="Name torn out of page and stained"
    >
      {/* Background shadow of the excised torn fragment */}
      <span
        className="absolute inset-0 bg-black/40 filter blur-[1px] translate-y-[1px] translate-x-[0.5px] pointer-events-none"
        style={{
          clipPath:
            'polygon(2% 14%, 12% 5%, 26% 11%, 43% 3%, 60% 12%, 74% 6%, 86% 15%, 98% 7%, 96% 46%, 99% 75%, 94% 94%, 82% 90%, 68% 97%, 52% 89%, 36% 96%, 20% 88%, 6% 95%, 2% 70%, 1% 40%)',
        }}
      />

      {/* Exposed white/cream paper fiber fringe along the tear */}
      <span
        className="absolute inset-[-1px] bg-[#FAF5EA] opacity-90 pointer-events-none"
        style={{
          clipPath:
            'polygon(1% 11%, 10% 2%, 24% 8%, 41% 1%, 58% 10%, 72% 3%, 85% 12%, 99% 4%, 97% 43%, 100% 77%, 95% 96%, 83% 92%, 69% 99%, 53% 91%, 37% 98%, 21% 90%, 5% 97%, 1% 72%, 0% 38%)',
        }}
      />

      {/* Main torn parchment strip */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-[#D7C5A0] via-[#E9DBBC] to-[#CFBF9A] pointer-events-none"
        style={{
          clipPath:
            'polygon(3% 14%, 13% 6%, 26% 12%, 43% 5%, 59% 13%, 73% 7%, 86% 16%, 97% 8%, 95% 47%, 98% 73%, 93% 92%, 81% 88%, 67% 95%, 51% 87%, 35% 94%, 19% 86%, 5% 93%, 3% 68%, 2% 42%)',
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.25)',
        }}
      >
        {/* Paper fiber lines texture */}
        <span
          className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(120,90,50,0.2) 3px, rgba(120,90,50,0.2) 4px)',
          }}
        />

        {/* Realistic dried blood smear & irregular stain droplets */}
        <svg
          viewBox="0 0 100 24"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-90"
          preserveAspectRatio="none"
        >
          {/* Base blood pool smear */}
          <path
            d="M 6 12 Q 22 7 40 12 Q 58 15 74 9 Q 89 6 94 13 Q 86 21 66 18 Q 46 22 26 18 Q 12 21 6 12 Z"
            fill="#5E0B14"
            opacity="0.85"
          />
          {/* Darker clotted oxidized center */}
          <path
            d="M 16 11 Q 32 8 48 12 Q 62 14 78 10 Q 70 17 52 15 Q 34 18 16 11 Z"
            fill="#3B050B"
            opacity="0.9"
          />
          {/* Subtle blood splatter droplets and smears */}
          <circle cx="12" cy="7" r="1.5" fill="#6E0D18" opacity="0.75" />
          <circle cx="84" cy="16" r="1.2" fill="#5E0B14" opacity="0.7" />
          <circle cx="44" cy="5" r="1.1" fill="#7E101D" opacity="0.65" />
          <path d="M 62 14 Q 65 20 63 23" stroke="#5E0B14" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
        </svg>

        {/* Faint pen tear line across the excised paper */}
        <span className="absolute inset-y-1.5 inset-x-2 border-b border-[#3B050B]/35 opacity-70" />
      </span>
    </span>
  );
}

/**
 * Subtle CSS/SVG noise-based fibrous paper texture overlay.
 * Infuses organic pulp grain and delicate laid-paper chain lines into the antique cream pages.
 */
function PaperFiberNoiseOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply z-10"
      style={{
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperFiberNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.15  0 0 0 0.14 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperFiberNoise)'/%3E%3C/svg%3E"),
          repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(140, 110, 80, 0.025) 3px, rgba(140, 110, 80, 0.025) 4px)
        `,
        backgroundSize: '150px 150px, 100% 4px',
      }}
      aria-hidden="true"
    />
  );
}

export function InteractiveDiaryModal({
  isOpen,
  onClose,
  onProceedToUnlock,
  onPageTurnAudio,
}: InteractiveDiaryModalProps) {
  // Mobile breakpoint check (< 768px shows 1 page at a time; >= 768px shows 2-page spread)
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Track single page index (0 to 7 across the 4 spreads)
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev' | null>(null);

  // Touch gesture coordinates for swipe navigation
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen) return null;

  const totalPages = 8;
  const totalSpreads = DIARY_SPREADS.length; // 4
  const currentSpreadIndex = Math.min(totalSpreads - 1, Math.floor(pageIndex / 2));
  const currentSpread: DiarySpread = DIARY_SPREADS[currentSpreadIndex];

  // Mobile navigation boundaries
  const isFirst = isMobile ? pageIndex === 0 : currentSpreadIndex === 0;
  const isLast = isMobile ? pageIndex === totalPages - 1 : currentSpreadIndex === totalSpreads - 1;

  const handleNext = () => {
    if (isLast) return;
    onPageTurnAudio?.();
    setTurnDirection('next');
    setTimeout(() => {
      if (isMobile) {
        setPageIndex((prev) => Math.min(totalPages - 1, prev + 1));
      } else {
        setPageIndex((prev) => {
          const nextSpread = Math.min(totalSpreads - 1, Math.floor(prev / 2) + 1);
          return nextSpread * 2;
        });
      }
      setTurnDirection(null);
    }, 180);
  };

  const handlePrev = () => {
    if (isFirst) return;
    onPageTurnAudio?.();
    setTurnDirection('prev');
    setTimeout(() => {
      if (isMobile) {
        setPageIndex((prev) => Math.max(0, prev - 1));
      } else {
        setPageIndex((prev) => {
          const prevSpread = Math.max(0, Math.floor(prev / 2) - 1);
          return prevSpread * 2;
        });
      }
      setTurnDirection(null);
    }, 180);
  };

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    // Detect horizontal swipe if delta is significant and horizontal
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Keyboard navigation support (Arrow keys)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'Escape') onClose();
  };

  // Whether mobile view is currently displaying the Left Page (even index) or Right Page (odd index)
  const isLeftPageOnMobile = pageIndex % 2 === 0;

  // Render Left Page Content (Personal handwritten entry)
  const renderLeftPage = (spread: DiarySpread, isMobileView: boolean) => (
    <div
      className={`relative p-3.5 xs:p-4.5 sm:p-7 flex flex-col justify-between h-full bg-[#FAF4E5] select-text overflow-hidden ${
        isMobileView ? 'rounded' : 'md:border-r border-[#C7B594]/60'
      }`}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(237, 225, 197, 0.4), rgba(250, 244, 229, 0.95) 40%, rgba(236, 224, 196, 0.5)),
          url(${antiquePaperImg})
        `,
        backgroundSize: 'cover',
      }}
    >
      {/* Subtle noise-based fibrous paper texture overlay */}
      <PaperFiberNoiseOverlay />

      {/* Decorative center spine shadow gradient for desktop curvature */}
      {!isMobileView && (
        <div className="hidden md:block absolute top-0 bottom-0 right-0 w-10 bg-gradient-to-l from-black/25 via-black/10 to-transparent pointer-events-none z-10" />
      )}

      {/* Curvature inner shadow for physical realism */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.06)] z-10" />

      {/* Main Narrative Block */}
      <div className="relative z-20 space-y-2 xs:space-y-2.5">
        {/* Entry Date & Title (Natural journal elements only) */}
        <div className="border-b border-[#8F1320]/25 pb-1.5 xs:pb-2">
          <div className="font-serif text-[10.5px] xs:text-[11.5px] sm:text-xs font-semibold text-[#8F1320] tracking-wider uppercase">
            {spread.entryDate}
          </div>
          <h2
            className="font-serif text-sm xs:text-base sm:text-lg font-bold tracking-tight text-[#1E1513] mt-0.5 leading-snug"
            style={{ fontFamily: "'Cinzel', 'Lora', serif" }}
          >
            {spread.entryTitle}
          </h2>
        </div>

        {/* Greeting with Physical Torn-Name Effect */}
        <div className="pt-0.5">
          <div className="inline-flex items-center flex-wrap font-serif text-xs xs:text-[13.5px] sm:text-base font-bold text-[#1F1513]">
            <span className="italic mr-0.5">{spread.leftPage.greetingPrefix}</span>
            <TornPaperNameCover />
            <span className="ml-0.5">,</span>
          </div>
        </div>

        {/* Narrative Paragraphs */}
        <div className="space-y-1.5 xs:space-y-2 sm:space-y-2.5 font-serif text-[11px] xs:text-[12px] sm:text-[13.5px] leading-[1.48] xs:leading-[1.52] sm:leading-relaxed text-[#2B1F1C]">
          {spread.leftPage.text.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Bottom Signoff in Cursive Handwriting */}
      <div className="relative z-20 pt-2 sm:pt-3 border-t border-[#B5A17D]/40 font-handwriting text-xs xs:text-sm sm:text-base text-[#6B5342] italic mt-auto">
        {spread.leftPage.handwrittenSignoff}
      </div>
    </div>
  );

  // Render Right Page Content (Clean antique journal page, with cipher key on final entry)
  const renderRightPage = (spread: DiarySpread, isMobileView: boolean) => (
    <div
      className={`relative p-3.5 xs:p-4.5 sm:p-7 flex flex-col justify-center h-full bg-[#FAF4E5] select-text overflow-hidden ${
        isMobileView ? 'rounded' : ''
      }`}
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(236, 224, 196, 0.5), rgba(250, 244, 229, 0.95) 60%, rgba(237, 225, 197, 0.4)),
          url(${antiquePaperImg})
        `,
        backgroundSize: 'cover',
      }}
    >
      {/* Subtle noise-based fibrous paper texture overlay */}
      <PaperFiberNoiseOverlay />

      {/* Decorative center spine shadow gradient for desktop curvature */}
      {!isMobileView && (
        <div className="hidden md:block absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none z-10" />
      )}

      {/* Curvature inner shadow */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.06)] z-10" />

      {/* ================= FINAL ENTRY: THE HIDDEN CIPHER KEY ================= */}
      {spread.rightPage.isFinalSpread && (
        <div
          data-testid="hidden-password-clue-box"
          className="relative z-20 bg-[#FFF9EE] border-2 border-[#8F1320] p-3 sm:p-4 rounded shadow-lg text-center space-y-1.5 sm:space-y-2 -rotate-1 max-w-[300px] sm:max-w-none mx-auto my-auto"
        >
          <div className="font-serif text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#8F1320]">
            ★ CONFIDENTIAL CIPHER KEY ★
          </div>
          <div className="py-1.5 px-3 sm:py-2 sm:px-4 bg-[#8F1320]/10 border-2 border-dashed border-[#8F1320] rounded inline-block">
            <span className="font-mono text-xl sm:text-2xl font-bold tracking-[0.3em] text-[#8F1320]">
              1311
            </span>
          </div>
          <p className="font-serif text-[10.5px] sm:text-xs text-[#3D2E28] leading-tight">
            {spread.rightPage.hiddenPasswordClue?.instruction ||
              'Enter passcode 1311 or tap below to unlock the envelope'}
          </p>

          <button
            type="button"
            data-testid="unlock-envelope-direct-button"
            onClick={() => {
              onClose();
              onProceedToUnlock();
            }}
            className="w-full py-2 px-3 sm:py-2.5 sm:px-4 bg-[#8F1320] hover:bg-[#A31525] active:bg-[#6E0E18] text-white font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-md cursor-pointer flex items-center justify-center gap-1.5 mt-1"
          >
            <span>🔓 UNLOCK ENVELOPE (CODE: 1311) →</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Antique Personal Journal"
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 flex flex-col justify-between items-center p-2 sm:p-4 bg-black/92 backdrop-blur-md overflow-hidden select-none"
    >
      {/* ================= TOP CONTROL BAR (Outside Book Pages) ================= */}
      <div className="w-full max-w-4xl flex items-center justify-between py-1.5 px-2 sm:px-3 mb-1 shrink-0 bg-[#140F0D]/90 border border-[#8F1320]/30 rounded text-neutral-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8F1320] animate-pulse" />
          <span
            className="font-serif italic text-xs sm:text-sm text-[#F0D5D8] tracking-wider"
            style={{ fontFamily: "'Cinzel', 'Lora', serif" }}
          >
            Her Personal Journal
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Natural Page Counter */}
          <span className="font-serif text-[11px] sm:text-xs text-[#C4B3A3]">
            {isMobile
              ? `Page ${pageIndex + 1} of ${totalPages}`
              : `Pages ${currentSpreadIndex * 2 + 1}–${currentSpreadIndex * 2 + 2} of ${totalPages}`}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 bg-[#8F1320]/25 hover:bg-[#8F1320] text-red-200 hover:text-white text-xs font-bold rounded border border-[#8F1320]/60 transition-colors cursor-pointer flex items-center gap-1 active:scale-95"
          >
            <span>✕</span>
            <span>Close Diary</span>
          </button>
        </div>
      </div>

      {/* ================= PHYSICAL ANTIQUE BOOK CONTAINER ================= */}
      <div
        className="w-full max-w-4xl flex-1 min-h-0 flex items-center justify-center my-auto touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Leather Book Cover Wrap & Spine Shadow */}
        <div className="relative w-full h-full max-h-[58dvh] xs:max-h-[62dvh] sm:max-h-[68vh] md:max-h-[72vh] flex items-center justify-center shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_25px_rgba(143,19,32,0.3)] rounded-lg p-1.5 xs:p-2 sm:p-4 bg-[#23150F] border-2 sm:border-4 border-[#3D251A]">
          {/* Aged Leather Border Bevel */}
          <div className="absolute inset-0 pointer-events-none rounded-lg border border-[#170E0A] opacity-75 shadow-inner" />

          {/* Book Spine Hinges and Stitches on Outer Casing */}
          <div className="absolute -left-1 top-6 bottom-6 w-1 border-r border-[#4A2D1F]/50 hidden sm:block pointer-events-none" />
          <div className="absolute -right-1 top-6 bottom-6 w-1 border-l border-[#4A2D1F]/50 hidden sm:block pointer-events-none" />

          {/* ================= DESKTOP VIEW: TWO-PAGE SIDE-BY-SIDE SPREAD ================= */}
          {!isMobile ? (
            <div
              className={`relative w-full h-full grid grid-cols-2 bg-[#F4ECDA] text-[#241A15] rounded border border-[#BFA985] shadow-2xl overflow-hidden transition-all duration-200 ${
                turnDirection === 'next'
                  ? 'rotate-y-[-1.5deg] scale-[0.99] opacity-80'
                  : turnDirection === 'prev'
                  ? 'rotate-y-[1.5deg] scale-[0.99] opacity-80'
                  : 'rotate-y-0 scale-100 opacity-100'
              }`}
            >
              {/* Natural Centre Spine Binding / Fold Overlay */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none z-20 flex justify-center">
                {/* Deep spine crease shadow */}
                <div className="w-full h-full bg-gradient-to-r from-transparent via-black/35 to-transparent" />
                {/* Centre binding thread groove */}
                <div className="absolute top-0 bottom-0 w-[1.5px] bg-[#3D261E]/40" />
                {/* Top and Bottom spine stitching marks */}
                <span className="absolute top-2 w-2 h-0.5 bg-[#8F1320]/70 rounded-full" />
                <span className="absolute bottom-2 w-2 h-0.5 bg-[#8F1320]/70 rounded-full" />
              </div>

              {/* Left Page (Spread Left) */}
              <div className="h-full overflow-hidden">
                {renderLeftPage(currentSpread, false)}
              </div>

              {/* Right Page (Spread Right) */}
              <div className="h-full overflow-hidden">
                {renderRightPage(currentSpread, false)}
              </div>
            </div>
          ) : (
            /* ================= MOBILE VIEW: ONE COMPLETE DIARY PAGE AT A TIME ================= */
            <div
              className={`relative w-full h-full max-w-[420px] mx-auto bg-[#F4ECDA] text-[#241A15] rounded border border-[#BFA985] shadow-2xl overflow-hidden transition-all duration-200 ${
                turnDirection === 'next'
                  ? '-translate-x-2 scale-[0.98] opacity-75'
                  : turnDirection === 'prev'
                  ? 'translate-x-2 scale-[0.98] opacity-75'
                  : 'translate-x-0 scale-100 opacity-100'
              }`}
            >
              {/* Mobile Single Page Content */}
              {isLeftPageOnMobile
                ? renderLeftPage(currentSpread, true)
                : renderRightPage(currentSpread, true)}

              {/* Subtle Mobile Edge Tap Hints (Left 15% / Right 15%) */}
              {!isFirst && (
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous Page"
                  className="absolute left-0 inset-y-0 w-8 z-10 cursor-pointer focus:outline-none opacity-0 hover:opacity-10 bg-gradient-to-r from-black/20 to-transparent"
                />
              )}
              {!isLast && (
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next Page"
                  className="absolute right-0 inset-y-0 w-8 z-10 cursor-pointer focus:outline-none opacity-0 hover:opacity-10 bg-gradient-to-l from-black/20 to-transparent"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* ================= BOTTOM PAGINATION CONTROLS (Outside Book Pages) ================= */}
      <div className="w-full max-w-4xl flex items-center justify-between mt-1 px-1 sm:px-2 shrink-0">
        <button
          type="button"
          data-testid="diary-prev-button"
          onClick={handlePrev}
          disabled={isFirst}
          className={`min-h-[40px] px-3 sm:px-4 py-1.5 sm:py-2 rounded font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer select-none active:scale-95 ${
            isFirst
              ? 'opacity-25 border-neutral-800 text-neutral-600 cursor-not-allowed'
              : 'bg-[#231A16] hover:bg-[#382821] text-amber-100 border-[#8F1320]/60'
          }`}
        >
          <span>←</span>
          <span>{isMobile ? 'Previous Page' : 'Previous Spread'}</span>
        </button>

        <span className="font-serif text-xs text-amber-200/80 tracking-widest select-none">
          {isMobile
            ? `${pageIndex + 1} / ${totalPages}`
            : `${currentSpreadIndex + 1} / ${totalSpreads}`}
        </span>

        <button
          type="button"
          data-testid="diary-next-button"
          onClick={handleNext}
          disabled={isLast}
          className={`min-h-[40px] px-3 sm:px-4 py-1.5 sm:py-2 rounded font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer select-none active:scale-95 ${
            isLast
              ? 'opacity-25 border-neutral-800 text-neutral-600 cursor-not-allowed'
              : 'bg-[#8F1320] hover:bg-[#A31525] text-amber-100 border-[#DE3B4C]'
          }`}
        >
          <span>{isMobile ? 'Next Page' : 'Next Spread'}</span>
          <span>→</span>
        </button>
      </div>

      {/* ================= DETECTIVE LAREN COMPANION (Outside Book, Fixed Area) ================= */}
      <div className="w-full max-w-4xl flex items-center gap-2 mt-1 sm:mt-1.5 px-2.5 py-1.5 bg-[#120E0D]/95 border border-[#B45309]/50 rounded-lg text-neutral-300 shadow-lg shrink-0">
        <div className="relative shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xs" />
          <img
            src="/assets/detective_laren.webp"
            alt="Detective Laren"
            className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[8.5px] text-[#F59E0B] font-bold tracking-wider uppercase flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            <span>DETECTIVE LAREN</span>
          </div>
          <p className="font-serif text-[10.5px] sm:text-[11.5px] leading-tight text-[#F5EDE0] truncate sm:whitespace-normal">
            {isLast
              ? '“Look! There’s the cipher code 1311! That’s the password to unlock the envelope!”'
              : '“finally we found the diary! The password should be in the final entry.”'}
          </p>
        </div>
      </div>
    </div>
  );
}
