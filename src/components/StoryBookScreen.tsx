/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { EXPERIENCE_CONTENT, StoryPage } from '../data/storyContent';
import { ClassifiedStamp, CrimsonFingerprint, InkSplatter } from './TactileDecorations';

// Tactile visual assets
import antiqueParchmentImg from '../assets/images/antique_manuscript_paper_1793563752766.jpg';

interface StoryBookScreenProps {
  onProceedToEnvelope: () => void;
  initialPageIndex?: number;
}

interface BookInteractionsState {
  windowTapped: boolean;
  mapOpened: boolean;
  bookmarkLifted: boolean;
  cipherTapped: boolean;
  documentStamped: boolean;
  tornPaperLifted: boolean;
  calendarTurned: boolean;
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
      windowTapped: false,
      mapOpened: false,
      bookmarkLifted: false,
      cipherTapped: false,
      documentStamped: false,
      tornPaperLifted: false,
      calendarTurned: false,
    },
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activePage: StoryPage = pages[bookState.currentPage];
  const isFirstPage = bookState.currentPage === 0;
  const isLastPage = bookState.currentPage === totalPages - 1;

  // Scroll to top of manuscript container on page turn
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [bookState.currentPage]);

  // Specific interaction handlers
  const handleWindowTap = () => {
    setBookState((prev) => ({
      ...prev,
      interactions: {
        ...prev.interactions,
        windowTapped: !prev.interactions.windowTapped,
      },
    }));
  };

  const handleMapOpen = () => {
    setBookState((prev) => ({
      ...prev,
      interactions: {
        ...prev.interactions,
        mapOpened: !prev.interactions.mapOpened,
      },
    }));
  };

  const handleBookmarkLift = () => {
    setBookState((prev) => ({
      ...prev,
      interactions: {
        ...prev.interactions,
        bookmarkLifted: !prev.interactions.bookmarkLifted,
      },
    }));
  };

  const handleCipherTap = () => {
    setBookState((prev) => ({
      ...prev,
      interactions: {
        ...prev.interactions,
        cipherTapped: !prev.interactions.cipherTapped,
      },
    }));
  };

  const handleEvidenceStamp = () => {
    setBookState((prev) => ({
      ...prev,
      interactions: {
        ...prev.interactions,
        documentStamped: !prev.interactions.documentStamped,
      },
    }));
  };

  const handleTornPaperLift = () => {
    setBookState((prev) => ({
      ...prev,
      interactions: {
        ...prev.interactions,
        tornPaperLifted: !prev.interactions.tornPaperLifted,
      },
    }));
  };

  const handleCalendarTurn = () => {
    setBookState((prev) => ({
      ...prev,
      interactions: {
        ...prev.interactions,
        calendarTurned: !prev.interactions.calendarTurned,
      },
    }));
  };

  // Navigation handlers
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

  // Keyboard navigation support (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNextPage();
      if (e.key === 'ArrowLeft') handlePrevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [bookState.currentPage, isLastPage, isFirstPage]);

  // Clear animation direction flag
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
      {/* Top Header & Archival File Details */}
      <header className="w-full max-w-3xl mx-auto flex items-center justify-between border-b border-[#651B20]/40 pb-2 pt-1 px-1 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className="font-serif text-xs sm:text-sm tracking-[0.24em] font-bold text-[#A31525] uppercase"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {chapterTitle}
          </span>
          <span className="font-mono text-[10px] tracking-widest text-[#A88A55]/80 hidden sm:inline">
            // {seriesTitle}
          </span>
        </div>

        {/* Page progress indicator */}
        <div
          data-testid="page-progress"
          className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-[#D5C19B] uppercase font-bold shrink-0 ml-2 flex items-center gap-2"
        >
          <span className="inline-block w-1.5 h-1.5 bg-[#9E2934] rounded-full animate-pulse" />
          <span>FOLIO {bookState.currentPage + 1} OF {totalPages}</span>
        </div>
      </header>

      {/* Main Manuscript Book Container with Scrollable Cream Paper Texture */}
      <main
        ref={scrollContainerRef}
        className="my-auto py-2 sm:py-4 w-full max-w-2xl mx-auto flex-1 overflow-y-auto px-1 focus:outline-none"
        tabIndex={0}
      >
        {/* Layered paper backing shadow illusion for authentic antique folio feel */}
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
            {/* Thread & Forensic Stitches on Spine */}
            <div className="absolute left-1 sm:left-2 top-0 bottom-0 w-1 flex flex-col justify-around py-4 opacity-50 pointer-events-none">
              <span className="w-1.5 h-3 border-r-2 border-[#651B20]" />
              <span className="w-1.5 h-3 border-r-2 border-[#651B20]" />
              <span className="w-1.5 h-3 border-r-2 border-[#651B20]" />
              <span className="w-1.5 h-3 border-r-2 border-[#651B20]" />
              <span className="w-1.5 h-3 border-r-2 border-[#651B20]" />
            </div>

            {/* Tactile detail badge (brass clip, washi tape, bookmark) */}
            {activePage.visual?.tactileDetail === 'brass-clip' && (
              <div
                className="absolute -top-3 left-8 w-6 h-10 border-2 border-[#A88A55] bg-gradient-to-b from-[#C4A86F] to-[#785E2F] rounded-t-sm shadow-md pointer-events-none z-10 opacity-90"
                title="Archival Brass Clip"
              />
            )}
            {activePage.visual?.tactileDetail === 'washi-tape' && (
              <div
                className="absolute -top-2.5 right-12 w-16 h-5 bg-[#9E2934]/60 border-t border-b border-[#651B20]/40 transform -rotate-2 shadow-sm pointer-events-none z-10"
                title="Crimson Washi Tape"
              />
            )}
            {activePage.visual?.tactileDetail === 'silk-ribbon' && (
              <div
                className="absolute -top-4 right-8 w-4 h-14 bg-gradient-to-b from-[#651B20] to-[#9E2934] shadow-md pointer-events-none z-10 rounded-b-sm border-l border-r border-[#38271D]/40"
                title="Silk Reading Ribbon"
              />
            )}
            {activePage.visual?.tactileDetail === 'wax-seal-scrap' && (
              <div
                className="absolute top-3 right-6 w-7 h-7 rounded-full bg-[#651B20] border border-[#9E2934] shadow flex items-center justify-center text-[8px] font-mono font-bold text-[#EAE0CD] pointer-events-none"
              >
                1311
              </div>
            )}

            {/* Crimson Forensic Fingerprint / Ink Mark */}
            <div className="absolute top-4 right-4 pointer-events-none opacity-20">
              <CrimsonFingerprint className="w-10 h-14" />
            </div>

            {/* Page Header within Manuscript */}
            <div className="border-b border-[#38271D]/20 pb-3 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-[11px] font-mono tracking-wider text-[#651B20] uppercase font-bold">
                <span>{activePage.caseRef}</span>
                <span className="text-[10px] text-[#7A6455]">
                  {activePage.visual?.exhibitCode || `EXHIBIT 1311-0${activePage.id}`}
                </span>
              </div>

              <h2
                className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-[#241A15] mt-1"
                style={{ fontFamily: "'Cinzel', 'Lora', serif" }}
              >
                {activePage.label}
              </h2>

              <p className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#7A594D] uppercase mt-0.5">
                {activePage.subtitle}
              </p>
            </div>

            {/* Narrative Body Paragraphs (High Readability Lora Serif) */}
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

            {/* ================= INTERACTION CLUES SECTION ================= */}
            <div className="my-6 border-t-2 border-dashed border-[#651B20]/30 pt-4">
              {/* PAGE 1: THE WINDOW */}
              {activePage.id === 1 && (
                <div className="border border-[#651B20]/40 bg-[#1A1414] rounded p-3 sm:p-4 text-[#EAE0CD] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono tracking-widest text-[#9E2934] uppercase gap-1">
                    <span>[ EVIDENCE CLUE: THE WINDOW ]</span>
                    <span className="opacity-75">INTERACTIVE FORENSIC FIELD</span>
                  </div>

                  <div
                    onClick={handleWindowTap}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleWindowTap();
                    }}
                    className="relative min-h-[110px] w-full rounded border border-[#651B20]/50 bg-[#120D0E] p-3 sm:p-4 cursor-pointer group select-none transition-all hover:border-[#9E2934]"
                    aria-label="Tap the window to inspect glass"
                  >
                    {!bookState.interactions.windowTapped ? (
                      <div className="flex flex-col items-center justify-center py-3 space-y-1 text-center">
                        <span className="font-mono text-xs text-[#EAE0CD] tracking-[0.2em] uppercase group-hover:text-[#ff4b63] transition-colors">
                          ▸ Tap the window glass
                        </span>
                        <p className="text-[10px] font-mono text-[#A88A55] italic">
                          Inspect pane for microscopic scratches
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 animate-fade-in">
                        <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#9E2934] to-transparent animate-pulse" />
                        <p className="font-mono text-[11px] text-[#A88A55] italic leading-relaxed text-center">
                          A thin line of crimson appears in the glass, like a scratch that wasn't there a moment ago.
                        </p>
                        <p className="font-serif italic text-sm font-semibold text-[#ff4b63] text-center pt-1">
                          “Some things can be loved without being understood completely.”
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PAGE 2: THE FOLDED MAP */}
              {activePage.id === 2 && (
                <div className="border border-[#651B20]/40 bg-[#1A1414] rounded p-3 sm:p-4 text-[#EAE0CD] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono tracking-widest text-[#9E2934] uppercase gap-1">
                    <span>[ EVIDENCE CLUE: THE FOLDED MAP ]</span>
                    <span className="opacity-75">INTERACTIVE RECON FIELD</span>
                  </div>

                  <div
                    onClick={handleMapOpen}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleMapOpen();
                    }}
                    className="relative min-h-[110px] w-full rounded border border-[#651B20]/50 bg-[#120D0E] p-3 sm:p-4 cursor-pointer group select-none transition-all hover:border-[#9E2934]"
                    aria-label="Open the folded map"
                  >
                    {!bookState.interactions.mapOpened ? (
                      <div className="flex flex-col items-center justify-center py-3 space-y-1 text-center">
                        <span className="font-mono text-xs text-[#EAE0CD] tracking-[0.2em] uppercase group-hover:text-[#ff4b63] transition-colors">
                          ▸ Open the folded map
                        </span>
                        <p className="text-[10px] font-mono text-[#A88A55] italic">
                          Unfold itinerary diagram across borders
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 animate-fade-in">
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#A88A55] border-b border-[#651B20]/30 pb-1">
                          <span>PARIS</span>
                          <span>→</span>
                          <span>KYOTO</span>
                          <span>→</span>
                          <span>LISBON</span>
                          <span>→</span>
                          <span className="text-[#ff4b63]">[ EDGE OF PAPER ]</span>
                        </div>
                        <p className="font-mono text-[11px] text-[#A88A55] italic leading-relaxed text-center">
                          Route crosses three cities before ending abruptly at the edge of the paper. There is no X marking the destination.
                        </p>
                        <p className="font-serif italic text-sm font-semibold text-[#ff4b63] text-center pt-1">
                          “Eventually.”
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PAGE 3: THE BOOKMARK */}
              {activePage.id === 3 && (
                <div className="border border-[#651B20]/40 bg-[#1A1414] rounded p-3 sm:p-4 text-[#EAE0CD] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono tracking-widest text-[#9E2934] uppercase gap-1">
                    <span>[ EVIDENCE CLUE: THE RED BOOKMARK ]</span>
                    <span className="opacity-75">INTERACTIVE ARCHIVAL FIELD</span>
                  </div>

                  <div
                    onClick={handleBookmarkLift}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleBookmarkLift();
                    }}
                    className="relative min-h-[110px] w-full rounded border border-[#651B20]/50 bg-[#120D0E] p-3 sm:p-4 cursor-pointer group select-none transition-all hover:border-[#9E2934]"
                    aria-label="Lift the red marker"
                  >
                    {!bookState.interactions.bookmarkLifted ? (
                      <div className="flex flex-col items-center justify-center py-3 space-y-1 text-center">
                        <span className="font-mono text-xs text-[#EAE0CD] tracking-[0.2em] uppercase group-hover:text-[#ff4b63] transition-colors">
                          ▸ Lift the red paper marker
                        </span>
                        <p className="text-[10px] font-mono text-[#A88A55] italic">
                          Marked between The Silent Patient and A Thousand Splendid Suns
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 animate-fade-in text-center">
                        <div className="inline-block px-3 py-1 bg-[#651B20] text-[#EAE0CD] font-mono text-xs tracking-wider rounded-[1px]">
                          “What do stories leave behind?”
                        </div>
                        <p className="font-serif italic text-sm font-semibold text-[#ff4b63] pt-1">
                          “Not every story ends when you put it down.”
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PAGE 4: THE CIPHER 1311 */}
              {activePage.id === 4 && (
                <div className="border border-[#651B20]/40 bg-[#1A1414] rounded p-3 sm:p-4 text-[#EAE0CD] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono tracking-widest text-[#9E2934] uppercase gap-1">
                    <span>[ EVIDENCE CLUE: CIPHER 1311 ]</span>
                    <span className="opacity-75">INTERACTIVE CRYPTOGRAPHIC FIELD</span>
                  </div>

                  <div
                    onClick={handleCipherTap}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleCipherTap();
                    }}
                    className="relative min-h-[110px] w-full rounded border border-[#651B20]/50 bg-[#120D0E] p-3 sm:p-4 cursor-pointer group select-none transition-all hover:border-[#9E2934]"
                    aria-label="Tap cipher 1311"
                  >
                    {!bookState.interactions.cipherTapped ? (
                      <div className="flex flex-col items-center justify-center py-3 space-y-1 text-center">
                        <span className="font-mono text-xs text-[#EAE0CD] tracking-[0.2em] uppercase group-hover:text-[#ff4b63] transition-colors">
                          ▸ Tap cipher 1311 in corner
                        </span>
                        <p className="text-[10px] font-mono text-[#A88A55] italic">
                          Decipher origin timestamp of uninvited correspondence
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 animate-fade-in text-center">
                        <div className="text-xl font-mono font-bold tracking-[0.3em] text-[#ff4b63]">
                          [ 1311 ]
                        </div>
                        <p className="font-serif italic text-sm font-semibold text-[#EAE0CD]">
                          “The case begins here.”
                        </p>
                        <p className="font-mono text-[10px] text-[#A88A55] italic">
                          Stamped in oxidised red ink in the corner of the envelope.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PAGE 5: THE EVIDENCE STAMP */}
              {activePage.id === 5 && (
                <div className="border border-[#651B20]/40 bg-[#1A1414] rounded p-3 sm:p-4 text-[#EAE0CD] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono tracking-widest text-[#9E2934] uppercase gap-1">
                    <span>[ EVIDENCE CLUE: VERDICT STAMP ]</span>
                    <span className="opacity-75">INTERACTIVE JUDICIAL REGISTRY</span>
                  </div>

                  <div
                    onClick={handleEvidenceStamp}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleEvidenceStamp();
                    }}
                    className="relative min-h-[110px] w-full rounded border border-[#651B20]/50 bg-[#120D0E] p-3 sm:p-4 cursor-pointer group select-none transition-all hover:border-[#9E2934]"
                    aria-label="Stamp the document"
                  >
                    {!bookState.interactions.documentStamped ? (
                      <div className="flex flex-col items-center justify-center py-3 space-y-1 text-center">
                        <span className="font-mono text-xs text-[#EAE0CD] tracking-[0.2em] uppercase group-hover:text-[#ff4b63] transition-colors">
                          ▸ Stamp the document
                        </span>
                        <p className="text-[10px] font-mono text-[#A88A55] italic">
                          Affix official status classification to the house
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 animate-fade-in text-center">
                        <div className="flex items-center justify-center gap-3 font-mono text-sm">
                          <span className="line-through text-[#7A6455]">CULPRIT</span>
                          <span className="text-[#A88A55]">→</span>
                          <span className="font-bold text-[#ff4b63] border border-[#ff4b63] px-2 py-0.5">
                            WITNESS
                          </span>
                        </div>
                        <p className="font-serif italic text-sm font-semibold text-[#EAE0CD] pt-1">
                          “TESTIMONY INCOMPLETE.”
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PAGE 6: THE TORN PAPER */}
              {activePage.id === 6 && (
                <div className="border border-[#651B20]/40 bg-[#1A1414] rounded p-3 sm:p-4 text-[#EAE0CD] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono tracking-widest text-[#9E2934] uppercase gap-1">
                    <span>[ EVIDENCE CLUE: THE TORN MARGIN ]</span>
                    <span className="opacity-75">INTERACTIVE EXCAVATION</span>
                  </div>

                  <div
                    onClick={handleTornPaperLift}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleTornPaperLift();
                    }}
                    className="relative min-h-[110px] w-full rounded border border-[#651B20]/50 bg-[#120D0E] p-3 sm:p-4 cursor-pointer group select-none transition-all hover:border-[#9E2934]"
                    aria-label="Lift the torn paper"
                  >
                    {!bookState.interactions.tornPaperLifted ? (
                      <div className="flex flex-col items-center justify-center py-3 space-y-1 text-center">
                        <span className="font-mono text-xs text-[#EAE0CD] tracking-[0.2em] uppercase group-hover:text-[#ff4b63] transition-colors">
                          ▸ Lift the torn paper fragment
                        </span>
                        <p className="text-[10px] font-mono text-[#A88A55] italic">
                          Inspect concealed lines beneath excised diary edge
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 animate-fade-in text-center">
                        <p className="font-serif italic text-sm font-semibold text-[#ff4b63] leading-relaxed">
                          “Not every unwritten page is a secret. But every page is a possibility.”
                        </p>
                        <p className="font-mono text-[10px] text-[#A88A55] italic">
                          Recovered beneath the torn corner of the renovation notes.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PAGE 7: THE CALENDAR */}
              {activePage.id === 7 && (
                <div className="border border-[#651B20]/40 bg-[#1A1414] rounded p-3 sm:p-4 text-[#EAE0CD] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] font-mono tracking-widest text-[#9E2934] uppercase gap-1">
                    <span>[ EVIDENCE CLUE: THE CALENDAR ]</span>
                    <span className="opacity-75">INTERACTIVE TEMPORAL FIELD</span>
                  </div>

                  <div
                    onClick={handleCalendarTurn}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') handleCalendarTurn();
                    }}
                    className="relative min-h-[110px] w-full rounded border border-[#651B20]/50 bg-[#120D0E] p-3 sm:p-4 cursor-pointer group select-none transition-all hover:border-[#9E2934]"
                    aria-label="Turn the calendar page"
                  >
                    {!bookState.interactions.calendarTurned ? (
                      <div className="flex flex-col items-center justify-center py-3 space-y-1 text-center">
                        <span className="font-mono text-xs text-[#EAE0CD] tracking-[0.2em] uppercase group-hover:text-[#ff4b63] transition-colors">
                          ▸ Turn the calendar page
                        </span>
                        <p className="text-[10px] font-mono text-[#A88A55] italic">
                          Turn to the final calendar leaf
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 animate-fade-in text-center">
                        <div className="grid grid-cols-7 gap-1 border border-[#651B20]/30 p-2 bg-[#0C0809] rounded opacity-50">
                          {Array.from({ length: 7 }).map((_, i) => (
                            <div
                              key={i}
                              className="h-3 border border-[#651B20]/20 flex items-center justify-center text-[7px] font-mono text-[#A88A55]"
                            >
                              —
                            </div>
                          ))}
                        </div>
                        <p className="font-serif italic text-sm font-semibold text-[#ff4b63] pt-1">
                          “There is a difference between a blank page and a finished story.”
                        </p>
                        <p className="font-mono text-[10px] text-[#A88A55] italic">
                          Every date is printed clearly. The final page has no dates at all.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PAGE 8: TURN THE LAST PAGE / CONCLUSION */}
              {activePage.id === 8 && (
                <div className="border border-[#651B20]/50 bg-[#1A1414] rounded p-4 text-[#EAE0CD] space-y-3 text-center">
                  <div className="text-[11px] font-mono tracking-widest text-[#9E2934] uppercase font-bold">
                    [ CONCLUSION OF MANUSCRIPT // CASE 1311 ]
                  </div>
                  <p className="font-serif italic text-sm text-[#EAE0CD] leading-relaxed">
                    “The story falls silent. A sealed envelope waits against the black background.”
                  </p>
                  <div className="pt-1 text-[11px] font-mono text-[#A88A55]">
                    Proceed below to examine the final sealed evidence envelope (1311).
                  </div>
                </div>
              )}
            </div>

            {/* Handwritten Margin Note (Cursive Handwriting Font Caveat) */}
            {activePage.marginNote && (
              <div className="pt-4 border-t border-[#38271D]/20 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span
                  className="font-handwriting text-xl sm:text-2xl text-[#651B20] leading-none"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  {activePage.marginNote}
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#7A594D]">
                  Exhibit Folio #{activePage.id}
                </span>
              </div>
            )}
          </article>
        </div>
      </main>

      {/* Navigation Controls Bar: Previous / Next & Jump Dots */}
      <footer className="w-full max-w-2xl mx-auto flex items-center justify-between pt-2 pb-1 gap-2 shrink-0">
        {/* Previous Button (disabled on page 0) */}
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

        {/* Page progress jump dots for all 8 pages */}
        <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
          {pages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleJumpToPage(idx)}
              title={`Jump to Folio ${idx + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === bookState.currentPage
                  ? 'bg-[#9E2934] scale-125 ring-2 ring-[#9E2934]/40'
                  : 'bg-[#651B20]/40 hover:bg-[#651B20]'
              }`}
            />
          ))}
        </div>

        {/* Next / Proceed to Final Envelope Button */}
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
