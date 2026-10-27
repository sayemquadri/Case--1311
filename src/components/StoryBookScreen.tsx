/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EXPERIENCE_CONTENT, StoryPage } from '../data/storyContent';
import { ClassifiedStamp, CrimsonFingerprint, InkSplatter } from './TactileDecorations';

interface StoryBookScreenProps {
  onProceedToEnvelope: () => void;
  initialPageIndex?: number;
}

export function StoryBookScreen({
  onProceedToEnvelope,
  initialPageIndex = 0,
}: StoryBookScreenProps) {
  const { chapterTitle, pages, finalPageCta } = EXPERIENCE_CONTENT.story;
  const [currentPage, setCurrentPage] = useState(initialPageIndex);
  const [pageTurnDirection, setPageTurnDirection] = useState<'next' | 'prev' | null>(null);

  const totalPages = pages.length;
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;
  const activePage: StoryPage = pages[currentPage];

  const handleNext = () => {
    if (isLastPage) {
      onProceedToEnvelope();
    } else {
      setPageTurnDirection('next');
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstPage) {
      setPageTurnDirection('prev');
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Keyboard navigation support (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isLastPage, isFirstPage]);

  // Reset animation flag after transition
  useEffect(() => {
    if (pageTurnDirection) {
      const timer = setTimeout(() => setPageTurnDirection(null), 300);
      return () => clearTimeout(timer);
    }
  }, [pageTurnDirection]);

  return (
    <section
      className="fixed inset-0 w-screen h-[100dvh] bg-[#070606] text-[#A31525] flex flex-col items-center justify-between p-3 sm:p-6 overflow-y-auto select-none"
      aria-label="Her Story Interactive Manuscript"
    >
      {/* Top Header & Chapter Bar */}
      <header className="w-full max-w-3xl flex items-center justify-between border-b border-[#8F1320]/25 pb-2.5 pt-1 px-1">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs sm:text-sm tracking-[0.2em] font-bold text-[#A31525] uppercase">
            {chapterTitle}
          </span>
          <span className="hidden sm:inline font-mono text-[10px] tracking-widest text-[#8F1320]/60">
            // CASE DOSSIER 1311
          </span>
        </div>

        {/* Page progress indicator */}
        <div
          data-testid="page-progress"
          className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-[#8F1320] uppercase"
        >
          PAGE {currentPage + 1} OF {totalPages}
        </div>
      </header>

      {/* Tactile Aged-Paper Manuscript Page Container */}
      <div className="my-auto py-3 w-full max-w-2xl flex justify-center items-center">
        <article
          key={currentPage}
          data-testid="story-page-card"
          className={`relative w-full bg-[#f2e9d7] text-[#241a17] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_15px_rgba(143,19,32,0.15)] rounded-sm p-6 sm:p-9 border-l-4 sm:border-l-8 border-[#3b271d] transition-all duration-300 ${
            pageTurnDirection === 'next'
              ? 'translate-x-2 opacity-90'
              : pageTurnDirection === 'prev'
              ? '-translate-x-2 opacity-90'
              : 'translate-x-0 opacity-100'
          }`}
          style={{
            backgroundImage: `
              radial-gradient(circle at 85% 15%, rgba(143,19,32,0.04) 0%, transparent 60%),
              radial-gradient(circle at 10% 80%, rgba(60,35,15,0.06) 0%, transparent 50%),
              linear-gradient(to bottom, #f5ecd8, #ede3cb)
            `,
          }}
        >
          {/* Crimson Thread & Forensic Stitching Detail on Spine */}
          <div className="absolute left-1 sm:left-2 top-0 bottom-0 w-1 flex flex-col justify-around py-4 opacity-40 pointer-events-none">
            <span className="w-1.5 h-3 border-r-2 border-[#8F1320]" />
            <span className="w-1.5 h-3 border-r-2 border-[#8F1320]" />
            <span className="w-1.5 h-3 border-r-2 border-[#8F1320]" />
            <span className="w-1.5 h-3 border-r-2 border-[#8F1320]" />
          </div>

          {/* Forensic Evidence Markings & Crimson Stains */}
          <div className="absolute top-4 right-5 pointer-events-none opacity-30">
            <CrimsonFingerprint className="w-10 h-14" />
          </div>
          <div className="absolute -bottom-2 right-12 pointer-events-none opacity-20">
            <InkSplatter className="w-12 h-12" />
          </div>

          {/* Page Meta Header */}
          <div className="flex items-center justify-between border-b border-[#241a17]/20 pb-3 mb-5">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#73554b] block">
                {activePage.caseRef} · {activePage.entryDate}
              </span>
              <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#8F1320]">
                {activePage.label}
              </h3>
            </div>

            <ClassifiedStamp
              text="CONFIDENTIAL"
              className="text-[9px] px-1.5 py-0.5 border-[#8F1320]/60 text-[#8F1320] rotate-1"
            />
          </div>

          {/* Designated Editable Story Content Area */}
          <div
            data-testid="story-content-area"
            className="min-h-[160px] sm:min-h-[200px] border border-dashed border-[#8F1320]/30 bg-[#fbf5e8]/60 p-4 sm:p-5 rounded-[1px] relative mb-6"
          >
            <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.18em] text-[#8F1320]/80 uppercase pb-2 border-b border-[#8F1320]/15 mb-3">
              <span>[ Designated Story Block — Page {activePage.id} ]</span>
              <span className="text-[9px] text-[#73554b] italic">// Editable narrative</span>
            </div>

            <div className="font-mono text-xs sm:text-sm text-[#2b201d] leading-relaxed whitespace-pre-line tracking-wide">
              {activePage.placeholderText}
            </div>
          </div>

          {/* Handwritten Annotation in Margin */}
          <div className="pt-2 border-t border-[#241a17]/15 flex items-center justify-between text-[11px] font-mono text-[#73554b]">
            <span className="italic text-[#8F1320]/90">
              {activePage.marginNote}
            </span>
            <span className="text-[10px] tracking-widest uppercase opacity-75">
              Ref #{activePage.id}
            </span>
          </div>
        </article>
      </div>

      {/* Navigation Controls Bar */}
      <footer className="w-full max-w-2xl flex items-center justify-between pt-2 pb-1 gap-4">
        {/* Previous Button (disabled on page 0) */}
        <button
          type="button"
          data-testid="prev-page-button"
          onClick={handlePrev}
          disabled={isFirstPage}
          className={`font-mono text-xs tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-300 min-h-[44px] flex items-center justify-center ${
            isFirstPage
              ? 'opacity-20 border-[#8F1320]/20 text-[#8F1320] cursor-not-allowed'
              : 'opacity-80 hover:opacity-100 border-[#8F1320]/50 hover:border-[#A31525] text-[#8F1320] hover:text-[#A31525] hover:bg-[#8F1320]/10 cursor-pointer active:scale-95'
          }`}
        >
          ← Previous
        </button>

        {/* Page progress pills / indicators */}
        <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
          {pages.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentPage
                  ? 'bg-[#A31525] scale-125'
                  : 'bg-[#8F1320]/30'
              }`}
            />
          ))}
        </div>

        {/* Next / Proceed Button */}
        <button
          type="button"
          data-testid="next-page-button"
          onClick={handleNext}
          className="font-mono text-xs tracking-[0.2em] uppercase px-4 sm:px-5 py-2 border border-[#8F1320] text-[#A31525] hover:text-[#ff3b53] hover:border-[#ff3b53] hover:bg-[#8F1320]/15 transition-all duration-300 cursor-pointer min-h-[44px] flex items-center justify-center active:scale-95 shadow-[0_0_10px_rgba(143,19,32,0.15)]"
        >
          {isLastPage ? finalPageCta : 'Next \u2192'}
        </button>
      </footer>
    </section>
  );
}
