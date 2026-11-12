/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { EXPERIENCE_CONTENT, StoryPage } from '../data/storyContent';

// Tactile visual assets
import antiqueParchmentImg from '../assets/images/antique_manuscript_paper_1793563752766.jpg';

interface StoryBookScreenProps {
  onProceedToEnvelope: () => void;
  initialPageIndex?: number;
}

interface BookInteractionsState {
  page1Tapped: boolean;
  page2Tapped: boolean;
  page3Tapped: boolean;
  page4Tapped: boolean;
  page5Tapped: boolean;
  page6Tapped: boolean;
  page7Tapped: boolean;
  page8Tapped: boolean;
}

interface BookState {
  currentPage: number;
  direction: 'next' | 'prev' | null;
  interactions: BookInteractionsState;
}

export function StoryBookScreen({
  onProceedToEnvelope,
  initialPageIndex = 0,
}: StoryBookScreenProps) {
  const { seriesTitle, chapterTitle, pages, finalPageCta } = EXPERIENCE_CONTENT.story;
  const totalPages = pages.length;

  const [bookState, setBookState] = useState<BookState>({
    currentPage: Math.max(0, Math.min(initialPageIndex, totalPages - 1)),
    direction: null,
    interactions: {
      page1Tapped: false,
      page2Tapped: false,
      page3Tapped: false,
      page4Tapped: false,
      page5Tapped: false,
      page6Tapped: false,
      page7Tapped: false,
      page8Tapped: false,
    },
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activePage: StoryPage = pages[bookState.currentPage];
  const isFirstPage = bookState.currentPage === 0;
  const isLastPage = bookState.currentPage === totalPages - 1;

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [bookState.currentPage]);

  const toggleInteraction = (key: keyof BookInteractionsState) => {
    setBookState((prev) => ({
      ...prev,
      interactions: {
        ...prev.interactions,
        [key]: !prev.interactions[key],
      },
    }));
  };

  const handleNextPage = () => {
    if (isLastPage) {
      onProceedToEnvelope();
    } else {
      setBookState((prev) => ({
        ...prev,
        direction: 'next',
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (!isFirstPage) {
      setBookState((prev) => ({
        ...prev,
        direction: 'prev',
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  const handleJumpToPage = (targetIndex: number) => {
    if (targetIndex >= 0 && targetIndex < totalPages) {
      setBookState((prev) => ({
        ...prev,
        direction: targetIndex > prev.currentPage ? 'next' : 'prev',
        currentPage: targetIndex,
      }));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextPage();
      if (e.key === 'ArrowLeft') handlePrevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bookState.currentPage, isLastPage, isFirstPage]);

  useEffect(() => {
    if (bookState.direction) {
      const timer = setTimeout(() => {
        setBookState((prev) => ({ ...prev, direction: null }));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [bookState.direction]);

  const rotationAngle = activePage.visual?.rotationDeg ?? 0;

  return (
    <section
      className="fixed inset-0 w-screen h-[100dvh] bg-[#0A0808] text-[#D5C19B] flex flex-col justify-between p-2 sm:p-4 md:p-6 overflow-hidden select-none"
      aria-label="Her Story Interactive Manuscript"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, #151111 0%, #060505 100%)`,
      }}
    >
      {/* Top Header */}
      <header className="w-full max-w-3xl mx-auto flex items-center justify-between border-b border-[#651B20]/40 pb-2 pt-1 px-1 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className="font-serif text-xs sm:text-sm tracking-[0.24em] font-bold text-[#A31525] uppercase"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {seriesTitle}
          </span>
          <span className="font-mono text-[10px] tracking-widest text-[#A88A55]/80 hidden sm:inline">
            // {chapterTitle}
          </span>
        </div>

        {/* Page progress indicator */}
        <div
          data-testid="page-progress"
          className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-[#D5C19B] uppercase font-bold shrink-0 ml-2 flex items-center gap-2"
        >
          <span className="inline-block w-1.5 h-1.5 bg-[#9E2934] rounded-full animate-pulse" />
          <span>PAGE {bookState.currentPage + 1} OF {totalPages}</span>
        </div>
      </header>

      {/* Main Manuscript Book Container */}
      <main
        ref={scrollContainerRef}
        className="my-auto py-2 sm:py-4 w-full max-w-2xl mx-auto flex-1 overflow-y-auto px-1 focus:outline-none"
        tabIndex={0}
      >
        <div className="relative mx-auto w-full transition-transform duration-300">
          <div
            className="absolute inset-0 bg-[#38271D]/40 rounded-[2px] transform translate-y-1.5 translate-x-1 rotate-[0.3deg] pointer-events-none filter blur-[1px]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-[#A88A55]/20 rounded-[2px] transform -translate-y-1 -translate-x-1 -rotate-[0.4deg] pointer-events-none"
            aria-hidden="true"
          />

          <article
            key={activePage.id}
            data-testid="story-page-card"
            className={`relative w-full bg-[#EAE0CD] text-[#241A15] shadow-[0_25px_60px_rgba(0,0,0,0.92),0_0_1px_rgba(101,27,32,0.4)] rounded-[2px] p-5 sm:p-8 md:p-10 border-l-[6px] sm:border-l-[10px] border-[#38271D] transition-all duration-300 ${
              bookState.direction === 'next'
                ? 'translate-x-1 opacity-95'
                : bookState.direction === 'prev'
                ? '-translate-x-1 opacity-95'
                : 'translate-x-0 opacity-100'
            }`}
            style={{
              transform: `rotate(${rotationAngle}deg)`,
              backgroundImage: `
                linear-gradient(rgba(234, 224, 205, 0.94), rgba(225, 212, 189, 0.96)),
                url(${antiqueParchmentImg})
              `,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Thread Stitch Accents */}
            <div className="absolute left-1 sm:left-2 top-0 bottom-0 w-1 flex flex-col justify-around py-4 opacity-50 pointer-events-none">
              <span className="w-1.5 h-3 border-r-2 border-[#651B20]" />
              <span className="w-1.5 h-3 border-r-2 border-[#651B20]" />
              <span className="w-1.5 h-3 border-r-2 border-[#651B20]" />
              <span className="w-1.5 h-3 border-r-2 border-[#651B20]" />
            </div>

            {/* Page Header */}
            <div className="border-b border-[#38271D]/20 pb-3 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-[11px] font-mono tracking-wider text-[#651B20] uppercase font-bold">
                <span>{activePage.caseRef}</span>
                <span className="text-[10px] text-[#7A6455]">
                  {activePage.subtitle}
                </span>
              </div>

              <h2
                className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#241A15] mt-1"
                style={{ fontFamily: "'Cinzel', 'Lora', serif" }}
              >
                {activePage.label}
              </h2>
            </div>

            {/* Narrative Body Paragraphs */}
            <div
              className="space-y-4 font-serif text-[15px] sm:text-[16px] md:text-[17px] leading-[1.85] text-[#241A15] tracking-normal mb-8"
              style={{ fontFamily: "'Lora', 'Georgia', serif" }}
            >
              {activePage.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="indent-4 sm:indent-6">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* ================= INTERACTIVE REFLECTION ACCENT ================= */}
            <div className="my-6 border-t-2 border-dashed border-[#651B20]/30 pt-4">
              {activePage.id === 1 && (
                <div
                  onClick={() => toggleInteraction('page1Tapped')}
                  role="button"
                  tabIndex={0}
                  className="p-3 sm:p-4 rounded border border-[#651B20]/40 bg-[#1A1414] text-[#EAE0CD] cursor-pointer hover:border-[#9E2934] transition-all text-center"
                >
                  {!bookState.interactions.page1Tapped ? (
                    <span className="font-mono text-xs text-[#EAE0CD] tracking-[0.2em] uppercase">
                      ▸ Look through the warm window
                    </span>
                  ) : (
                    <p className="font-serif italic text-sm font-semibold text-[#ff4b63]">
                      “Some places hold you close, and some stories make you want to wander.”
                    </p>
                  )}
                </div>
              )}

              {activePage.id === 2 && (
                <div
                  onClick={() => toggleInteraction('page2Tapped')}
                  role="button"
                  tabIndex={0}
                  className="p-3 sm:p-4 rounded border border-[#651B20]/40 bg-[#1A1414] text-[#EAE0CD] cursor-pointer hover:border-[#9E2934] transition-all text-center"
                >
                  {!bookState.interactions.page2Tapped ? (
                    <span className="font-mono text-xs text-[#EAE0CD] tracking-[0.2em] uppercase">
                      ▸ Turn the delicate page
                    </span>
                  ) : (
                    <p className="font-serif italic text-sm font-semibold text-[#ff4b63]">
                      “A little curiosity is all a person needs to begin an adventure.”
                    </p>
                  )}
                </div>
              )}

              {activePage.id === 3 && (
                <div
                  onClick={() => toggleInteraction('page3Tapped')}
                  role="button"
                  tabIndex={0}
                  className="p-3 sm:p-4 rounded border border-[#651B20]/40 bg-[#1A1414] text-[#EAE0CD] cursor-pointer hover:border-[#9E2934] transition-all text-center"
                >
                  {!bookState.interactions.page3Tapped ? (
                    <span className="font-mono text-xs text-[#EAE0CD] tracking-[0.2em] uppercase">
                      ▸ Unfold the scrap of paper
                    </span>
                  ) : (
                    <p className="font-serif italic text-sm font-semibold text-[#ff4b63]">
                      “Lisbon at sunset. Prague in the rain. Vienna when the streets are quiet.”
                    </p>
                  )}
                </div>
              )}

              {activePage.id === 4 && (
                <div
                  onClick={() => toggleInteraction('page4Tapped')}
                  role="button"
                  tabIndex={0}
                  className="p-3 sm:p-4 rounded border border-[#651B20]/40 bg-[#1A1414] text-[#EAE0CD] cursor-pointer hover:border-[#9E2934] transition-all text-center"
                >
                  {!bookState.interactions.page4Tapped ? (
                    <span className="font-mono text-xs text-[#EAE0CD] tracking-[0.2em] uppercase">
                      ▸ Inspect the folded map
                    </span>
                  ) : (
                    <p className="font-serif italic text-sm font-semibold text-[#ff4b63]">
                      “Until then, the map stays folded inside this diary.”
                    </p>
                  )}
                </div>
              )}

              {activePage.id === 5 && (
                <div
                  onClick={() => toggleInteraction('page5Tapped')}
                  role="button"
                  tabIndex={0}
                  className="p-3 sm:p-4 rounded border border-[#651B20]/40 bg-[#1A1414] text-[#EAE0CD] cursor-pointer hover:border-[#9E2934] transition-all text-center"
                >
                  {!bookState.interactions.page5Tapped ? (
                    <span className="font-mono text-xs text-[#EAE0CD] tracking-[0.2em] uppercase">
                      ▸ Notice the quiet details
                    </span>
                  ) : (
                    <p className="font-serif italic text-sm font-semibold text-[#ff4b63]">
                      “Some people have a way of making ordinary conversations interesting.”
                    </p>
                  )}
                </div>
              )}

              {activePage.id === 6 && (
                <div
                  onClick={() => toggleInteraction('page6Tapped')}
                  role="button"
                  tabIndex={0}
                  className="p-3 sm:p-4 rounded border border-[#651B20]/40 bg-[#1A1414] text-[#EAE0CD] cursor-pointer hover:border-[#9E2934] transition-all text-center"
                >
                  {!bookState.interactions.page6Tapped ? (
                    <span className="font-mono text-xs text-[#EAE0CD] tracking-[0.2em] uppercase">
                      ▸ Follow the clue trail
                    </span>
                  ) : (
                    <p className="font-serif italic text-sm font-semibold text-[#ff4b63]">
                      “Someone has been leaving clues... with a rather dramatic sense of timing.”
                    </p>
                  )}
                </div>
              )}

              {activePage.id === 7 && (
                <div
                  onClick={() => toggleInteraction('page7Tapped')}
                  role="button"
                  tabIndex={0}
                  className="p-3 sm:p-4 rounded border border-[#651B20]/40 bg-[#1A1414] text-[#EAE0CD] cursor-pointer hover:border-[#9E2934] transition-all text-center"
                >
                  {!bookState.interactions.page7Tapped ? (
                    <span className="font-mono text-xs text-[#EAE0CD] tracking-[0.2em] uppercase">
                      ▸ Reveal the mystery
                    </span>
                  ) : (
                    <p className="font-serif italic text-sm font-semibold text-[#ff4b63]">
                      “The clues were never leading to a crime scene. They were leading to a story.”
                    </p>
                  )}
                </div>
              )}

              {activePage.id === 8 && (
                <div className="border border-[#8F1320] bg-[#1A1414] rounded p-4 text-[#EAE0CD] space-y-3 text-center">
                  <div className="text-[11px] font-mono tracking-widest text-[#9E2934] uppercase font-bold">
                    [ THE FINAL CLUE // CIPHER 1311 ]
                  </div>
                  <p
                    className="italic text-base text-[#ff4b63] leading-relaxed"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    “Every mystery has a key. This one was hiding in plain sight. Remember the date that started the case?”
                  </p>
                  <div className="py-1 px-3 bg-[#8F1320]/20 border border-[#8F1320] rounded inline-block font-mono text-xs text-amber-200">
                    13 NOVEMBER circled in crimson · Password: 1311
                  </div>
                </div>
              )}
            </div>

            {/* Handwritten Margin Note */}
            {activePage.marginNote && (
              <div className="pt-4 border-t border-[#38271D]/20 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span
                  className="font-handwriting text-xl sm:text-2xl text-[#651B20] leading-none"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  {activePage.marginNote}
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#7A594D]">
                  Page #{activePage.id}
                </span>
              </div>
            )}
          </article>
        </div>
      </main>

      {/* Navigation Controls Bar */}
      <footer className="w-full max-w-2xl mx-auto flex items-center justify-between pt-2 pb-1 gap-2 shrink-0">
        <button
          type="button"
          data-testid="prev-page-button"
          onClick={handlePrevPage}
          disabled={isFirstPage}
          className={`font-mono text-xs tracking-[0.2em] uppercase px-4 py-2 border transition-all duration-300 min-h-[44px] flex items-center justify-center rounded-[2px] ${
            isFirstPage
              ? 'opacity-20 border-[#651B20]/20 text-[#651B20] cursor-not-allowed'
              : 'opacity-85 hover:opacity-100 border-[#651B20] hover:border-[#9E2934] text-[#D5C19B] hover:text-[#ff4b63] hover:bg-[#651B20]/20 cursor-pointer active:scale-95'
          }`}
        >
          ← Previous
        </button>

        {/* Page jump dots */}
        <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
          {pages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleJumpToPage(idx)}
              title={`Jump to Page ${idx + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === bookState.currentPage
                  ? 'bg-[#9E2934] scale-125 ring-2 ring-[#9E2934]/40'
                  : 'bg-[#651B20]/40 hover:bg-[#651B20]'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          data-testid="next-page-button"
          onClick={handleNextPage}
          className="font-mono text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase px-4 sm:px-6 py-2 border-2 border-[#9E2934] bg-[#651B20]/40 text-[#ff4b63] hover:bg-[#9E2934] hover:text-[#FFFFFF] transition-all duration-200 cursor-pointer min-h-[44px] flex items-center justify-center active:scale-95 shadow-[0_0_12px_rgba(158,41,52,0.3)] rounded-[2px] truncate"
        >
          {isLastPage ? finalPageCta : 'Next →'}
        </button>
      </footer>
    </section>
  );
}
