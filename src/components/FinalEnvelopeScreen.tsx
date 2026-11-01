/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { EXPERIENCE_CONTENT } from '../data/storyContent';
import { ClassifiedStamp, CrimsonFingerprint, InkSplatter, WaxSeal } from './TactileDecorations';
import { BirthdayMusicBox } from '../utils/birthdayMusic';

// Assets
import crimeEvidenceEnvelopeImg from '../assets/images/crime_evidence_envelope_1793563754168.jpg';
import birthdayScrapbookImg from '../assets/images/birthday_scrapbook_stickers_1793563753884.jpg';

interface FinalEnvelopeScreenProps {
  onReturnToStory?: () => void;
  defaultRevealed?: boolean;
}

type AnimationStep = 'sealed' | 'breaking' | 'opening-flap' | 'sliding' | 'unfolded';

export function FinalEnvelopeScreen({
  onReturnToStory,
  defaultRevealed = false,
}: FinalEnvelopeScreenProps) {
  const { envelope } = EXPERIENCE_CONTENT;
  const [step, setStep] = useState<AnimationStep>(defaultRevealed ? 'unfolded' : 'sealed');
  const [isBirthdayMode, setIsBirthdayMode] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  const musicBoxRef = useRef<BirthdayMusicBox | null>(null);

  // Initialize music box
  useEffect(() => {
    musicBoxRef.current = new BirthdayMusicBox();
    return () => {
      if (musicBoxRef.current) {
        musicBoxRef.current.stop();
      }
    };
  }, []);

  // Handle start reveal sequence
  const handleStartReveal = () => {
    if (step !== 'sealed') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep('unfolded');
      return;
    }

    setStep('breaking');

    setTimeout(() => {
      setStep('opening-flap');
    }, 450);

    setTimeout(() => {
      setStep('sliding');
    }, 900);

    setTimeout(() => {
      setStep('unfolded');
    }, 1450);
  };

  // Auto-trigger birthday surprise ~10 seconds after letter unfolds
  useEffect(() => {
    if (step === 'unfolded' && !isBirthdayMode) {
      const timer = setTimeout(() => {
        triggerBirthdaySurprise();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [step, isBirthdayMode]);

  const triggerBirthdaySurprise = () => {
    setIsBirthdayMode(true);
    if (musicBoxRef.current) {
      musicBoxRef.current.play();
      setIsMusicPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (!musicBoxRef.current) return;
    const playing = musicBoxRef.current.toggleMute();
    setIsMusicPlaying(playing);
  };

  const handleReseal = () => {
    setStep('sealed');
    setIsBirthdayMode(false);
    if (musicBoxRef.current) {
      musicBoxRef.current.stop();
      setIsMusicPlaying(false);
    }
  };

  const isRevealed = step === 'unfolded';
  const isInteracting = step !== 'sealed' && step !== 'unfolded';

  return (
    <section
      className={`fixed inset-0 w-screen h-[100dvh] transition-colors duration-1000 flex flex-col items-center justify-between p-3 sm:p-6 overflow-y-auto select-none ${
        isBirthdayMode
          ? 'bg-[#FFF8F0] text-[#2C221E]'
          : 'bg-[#080707] text-[#D5C19B]'
      }`}
      aria-label="Final Evidence and Birthday Scrapbook Screen"
    >
      {/* ================= FLOATING MUSIC CONTROL (IN BIRTHDAY MODE) ================= */}
      {isBirthdayMode && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMusic}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#FFF0F3] hover:bg-[#FFE3E8] border-2 border-[#E63946] text-[#E63946] font-mono text-xs font-bold rounded-full shadow-lg cursor-pointer transition-transform active:scale-95"
            title="Toggle Birthday Chime Melody"
          >
            <span>{isMusicPlaying ? '🔊' : '🔇'}</span>
            <span>{isMusicPlaying ? 'Melody: ON' : 'Melody: MUTED'}</span>
          </button>
        </div>
      )}

      {/* ================= SCREEN TOP HEADER ================= */}
      <header
        className={`w-full max-w-2xl flex items-center justify-between border-b pb-2 pt-1 px-1 transition-colors duration-500 shrink-0 ${
          isBirthdayMode
            ? 'border-[#E63946]/30 text-[#8B1E2B]'
            : 'border-[#651B20]/40 text-[#D5C19B]'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-xs sm:text-sm tracking-[0.2em] font-bold uppercase"
            style={{ color: isBirthdayMode ? '#E63946' : '#A31525' }}
          >
            {isBirthdayMode ? 'CASE 1311 SOLVED // BIRTHDAY WORLD' : envelope.label}
          </span>
          <span className="text-[10px] font-mono opacity-60 hidden sm:inline">
            // {isBirthdayMode ? 'CELEBRATION DEPLOYED' : 'ARCHIVAL DISCLOSURE'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isBirthdayMode && (
            <button
              type="button"
              onClick={() => setIsBirthdayMode(false)}
              className="font-mono text-[11px] tracking-wider text-[#651B20] hover:text-[#9E2934] transition-colors cursor-pointer py-1 px-2 border border-[#651B20]/30 hover:border-[#651B20] rounded-[2px]"
            >
              [Noir Evidence Mode]
            </button>
          )}

          {onReturnToStory && (
            <button
              type="button"
              onClick={onReturnToStory}
              className={`font-mono text-[11px] tracking-wider transition-colors cursor-pointer py-1 px-2 border border-transparent rounded-[2px] ${
                isBirthdayMode
                  ? 'text-[#8B1E2B] hover:text-[#E63946] hover:border-[#E63946]/40'
                  : 'text-[#8F1320] hover:text-[#ff4b63] hover:border-[#8F1320]/40'
              }`}
            >
              ← Back to Case
            </button>
          )}
        </div>
      </header>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="my-auto py-4 w-full max-w-xl flex flex-col items-center justify-center">
        {!isRevealed ? (
          /* ================= ENVELOPE (SEALED / IN-TRANSITION) ================= */
          <div className="flex flex-col items-center space-y-6 w-full">
            {/* The Physical Aged Envelope */}
            <div
              data-testid="sealed-envelope"
              className={`relative w-full max-w-md aspect-[16/10] bg-[#CBB89D] rounded-[2px] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_20px_rgba(101,27,32,0.15)] border border-[#87755b] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ${
                step === 'sliding' ? 'translate-y-4' : 'translate-y-0'
              }`}
              style={{
                backgroundImage: `
                  linear-gradient(135deg, rgba(203,184,157,0.95) 0%, rgba(184,166,139,0.95) 50%, rgba(173,155,128,0.95) 100%),
                  url(${crimeEvidenceEnvelopeImg})
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Envelope flap visual structure */}
              <div
                className={`absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#B39F83] to-[#9E8B70] border-b border-[#73634E] shadow-sm origin-top transition-transform duration-500 z-10 ${
                  step === 'opening-flap' || step === 'sliding'
                    ? '-rotate-x-180 opacity-60'
                    : 'rotate-x-0 opacity-95'
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              />

              {/* Lower triangular fold */}
              <div
                className="absolute inset-x-0 bottom-0 h-1/2 bg-[#B8A58A]/80 border-t border-[#73634E]/60 pointer-events-none"
                style={{
                  clipPath: 'polygon(0 100%, 100% 100%, 50% 0)',
                }}
              />

              {/* Emerging folded letter preview */}
              <div
                className={`absolute w-[86%] bg-[#FAF4EA] text-[#241A15] p-3 shadow-md border border-[#C5B49C] rounded-[1px] transition-all duration-700 z-20 ${
                  step === 'sliding'
                    ? '-translate-y-24 opacity-95 scale-102'
                    : 'translate-y-2 opacity-0'
                }`}
              >
                <div className="border-b border-[#651B20]/25 pb-1 flex justify-between text-[9px] font-mono text-[#651B20]">
                  <span>CONFIDENTIAL MEMORANDUM</span>
                  <span>1311</span>
                </div>
                <div className="h-4 mt-2 bg-[#651B20]/10 rounded-sm" />
              </div>

              {/* Forensic evidence markings */}
              <div className="absolute top-3 left-4 font-mono text-[10px] tracking-widest text-[#651B20] opacity-80 z-20 select-none">
                <span>EVIDENCE REF // 1311</span>
              </div>

              <div className="absolute bottom-3 right-4 font-mono text-[9px] tracking-wider text-[#38271D] opacity-75 z-20 select-none">
                <span>SEALED OCT 2026</span>
              </div>

              {/* The Wax Seal in center */}
              <div className="relative z-30 transform hover:scale-105 transition-transform duration-200">
                <WaxSeal
                  isBreaking={step === 'breaking'}
                  isBroken={step === 'opening-flap' || step === 'sliding'}
                  monogram={envelope.sealMonogram}
                  onClick={handleStartReveal}
                />
              </div>
            </div>

            {/* Interaction Instruction / Button */}
            <div className="text-center space-y-2">
              <button
                type="button"
                data-testid="reveal-letter-button"
                onClick={handleStartReveal}
                disabled={isInteracting}
                className={`font-mono text-xs uppercase tracking-[0.22em] text-[#EAE0CD] bg-[#651B20] hover:bg-[#9E2934] active:bg-[#481216] border border-[#9E2934] px-8 py-3 rounded-[2px] shadow-[0_4px_16px_rgba(101,27,32,0.5)] transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 cursor-pointer ${
                  isInteracting ? 'opacity-50 cursor-wait' : 'hover:scale-102'
                }`}
              >
                <span>{step === 'breaking' ? 'BREAKING WAX...' : envelope.buttonText}</span>
              </button>

              <p className="font-mono text-[10px] tracking-wider text-[#A88A55] uppercase">
                [ Tap wax seal or click button to unseal dossier ]
              </p>
            </div>
          </div>
        ) : (
          /* ================= FULLY UNFOLDED LETTER / CELEBRATION ================= */
          <div className="w-full space-y-6">
            {/* Surprise Celebration Banner (If Birthday Mode is Active) */}
            {isBirthdayMode && (
              <div
                className="w-full bg-gradient-to-r from-[#FFD166] via-[#FF6B6B] to-[#4ECDC4] p-4 rounded-[4px] shadow-lg text-center text-white space-y-1 animate-fade-in"
                style={{
                  backgroundImage: `
                    linear-gradient(135deg, rgba(255, 107, 107, 0.9), rgba(255, 209, 102, 0.9)),
                    url(${birthdayScrapbookImg})
                  `,
                  backgroundSize: 'cover',
                }}
              >
                <div className="text-2xl sm:text-3xl font-extrabold tracking-wide uppercase drop-shadow">
                  🎉 HAPPY BIRTHDAY! 🎂
                </div>
                <p className="font-sans text-xs sm:text-sm font-semibold text-white/95 drop-shadow">
                  The mystery has been solved! No routine birthdays allowed today! ✨
                </p>
              </div>
            )}

            {/* Manual Trigger Button for Birthday World (if not in birthday mode yet) */}
            {!isBirthdayMode && (
              <div className="w-full flex justify-center">
                <button
                  type="button"
                  onClick={triggerBirthdaySurprise}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#8F1320] to-[#C93344] hover:from-[#A31525] hover:to-[#E63946] text-[#FFF] font-mono text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-[0_0_15px_rgba(201,51,68,0.4)] transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>✨ Reveal Birthday Celebration Surprise ✨</span>
                </button>
              </div>
            )}

            {/* The Unfolded Letter Article */}
            <article
              data-testid="unfolded-letter-card"
              className={`relative w-full rounded-[2px] p-6 sm:p-9 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.95)] border transition-all duration-700 ${
                isBirthdayMode
                  ? 'bg-[#FFFDF9] border-[#FFCCD5] text-[#2C221E] shadow-[0_15px_40px_rgba(255,107,107,0.15)]'
                  : 'bg-[#F4ECE1] border-[#B8A68B] text-[#241A15]'
              }`}
              style={{
                backgroundImage: isBirthdayMode
                  ? `
                    linear-gradient(to bottom, rgba(255, 253, 249, 0.98), rgba(255, 248, 240, 0.98)),
                    url(${birthdayScrapbookImg})
                  `
                  : `
                    radial-gradient(circle at 90% 10%, rgba(101,27,32,0.04) 0%, transparent 60%),
                    linear-gradient(to bottom, #FAF5EC, #EDE4D4)
                  `,
                backgroundSize: 'cover',
              }}
            >
              {/* Scrapbook stickers / pins in Birthday Mode */}
              {isBirthdayMode && (
                <>
                  <div className="absolute -top-3 left-6 px-3 py-1 bg-[#FFD166] text-[#6A4C00] font-sans text-[11px] font-bold rounded shadow transform -rotate-3">
                    🍒 Sweetest Wishes!
                  </div>
                  <div className="absolute -top-3 right-6 px-3 py-1 bg-[#FF6B6B] text-white font-sans text-[11px] font-bold rounded shadow transform rotate-3">
                    🎈 Case 1311
                  </div>
                </>
              )}

              {/* Letter Header */}
              <div
                className={`border-b-2 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  isBirthdayMode ? 'border-[#FFCCD5]' : 'border-[#651B20]'
                }`}
              >
                <div>
                  <div
                    className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase"
                    style={{ color: isBirthdayMode ? '#E63946' : '#651B20' }}
                  >
                    CONFIDENTIAL DISCLOSURE // EXHIBIT 1311-FINAL
                  </div>
                  <h2
                    className="font-serif text-lg sm:text-2xl font-bold tracking-tight mt-1"
                    style={{ fontFamily: "'Cinzel', 'Lora', serif" }}
                  >
                    {isBirthdayMode ? 'A CELEBRATION FOR THE RECORD' : 'THE UNSEALED RECORD'}
                  </h2>
                </div>

                <div className="font-mono text-[10px] tracking-wider opacity-70">
                  REF NO. 1311 // FINAL RELEASE
                </div>
              </div>

              {/* SECTION 1: LAST REPORTED STATEMENT */}
              <section
                data-testid="statement-section"
                className={`p-4 sm:p-5 rounded-[2px] mb-8 border ${
                  isBirthdayMode
                    ? 'bg-[#FFF9FA] border-[#FFD6DC]'
                    : 'bg-[#EAE0D0] border-[#C5B49C]'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#651B20]/15">
                  <h3
                    className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em]"
                    style={{ color: isBirthdayMode ? '#E63946' : '#651B20' }}
                  >
                    {envelope.statementHeading}
                  </h3>
                  <span className="font-mono text-[9px] tracking-wider text-[#7A6455] uppercase italic">
                    // Recovered Confession
                  </span>
                </div>

                <div
                  className="font-serif text-sm sm:text-base leading-relaxed whitespace-pre-line tracking-normal"
                  style={{ fontFamily: "'Lora', 'Georgia', serif" }}
                >
                  {envelope.statementPlaceholder}
                </div>
              </section>

              {/* SECTION 2: PERSONAL BIRTHDAY LETTER */}
              <section
                data-testid="letter-section"
                className={`p-4 sm:p-6 rounded-[2px] mb-6 border ${
                  isBirthdayMode
                    ? 'bg-[#FFFDF8] border-[#FFE5B4] shadow-sm'
                    : 'bg-[#F2E8DC] border-[#C5B49C]'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#651B20]/15">
                  <h3
                    className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em]"
                    style={{ color: isBirthdayMode ? '#E63946' : '#651B20' }}
                  >
                    {envelope.letterHeading}
                  </h3>
                  <span className="font-mono text-[9px] tracking-wider text-[#7A6455] uppercase italic">
                    // Warmest Wishes & Birthday Roast
                  </span>
                </div>

                <div
                  className="font-serif text-sm sm:text-base leading-[1.85] whitespace-pre-line tracking-normal text-[#241A15]"
                  style={{ fontFamily: "'Lora', 'Georgia', serif" }}
                >
                  {envelope.letterPlaceholder}
                </div>

                <div
                  className="mt-4 pt-3 border-t text-[11px] font-mono italic"
                  style={{
                    borderColor: isBirthdayMode ? '#FFD6DC' : 'rgba(101,27,32,0.15)',
                    color: isBirthdayMode ? '#E63946' : '#651B20',
                  }}
                >
                  ~~ confidential birthday disclosure verified ~~
                </div>
              </section>

              {/* Footer inside letter */}
              <div className="pt-4 border-t border-[#38271D]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono text-[#7A6455]">
                <span>CASE FILE 1311 // ARCHIVE SEAL REVERSED</span>
                <button
                  type="button"
                  onClick={handleReseal}
                  className="underline hover:text-[#9E2934] cursor-pointer py-1"
                >
                  [re-fold & re-seal envelope]
                </button>
              </div>
            </article>
          </div>
        )}
      </div>

      {/* ================= BOTTOM STATUS LINE ================= */}
      <footer
        className={`w-full max-w-2xl text-center py-2 border-t transition-colors duration-500 shrink-0 ${
          isBirthdayMode ? 'border-[#E63946]/20' : 'border-[#651B20]/20'
        }`}
      >
        <span
          className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold"
          style={{ color: isBirthdayMode ? '#E63946' : '#651B20' }}
        >
          CASE FILE 1311 // INVESTIGATION COMPLETE
        </span>
      </footer>
    </section>
  );
}
