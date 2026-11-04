/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { EXPERIENCE_CONTENT } from '../data/storyContent';
import { WaxSeal } from './TactileDecorations';
import { BirthdayMusicBox } from '../utils/birthdayMusic';

// Assets
import crimeEvidenceEnvelopeImg from '../assets/images/crime_evidence_envelope_1793563754168.jpg';
import birthdayScrapbookImg from '../assets/images/birthday_scrapbook_stickers_1793563753884.jpg';
import cherryBirthdaySkyImg from '../assets/images/cherry_birthday_sky_1793567446706.jpg';

interface FinalEnvelopeScreenProps {
  onReturnToCctv?: () => void;
  defaultRevealed?: boolean;
}

type AnimationStep = 'sealed' | 'breaking' | 'opening-flap' | 'sliding' | 'unfolded';

export function FinalEnvelopeScreen({
  onReturnToCctv,
  defaultRevealed = false,
}: FinalEnvelopeScreenProps) {
  const { envelope } = EXPERIENCE_CONTENT;
  const [step, setStep] = useState<AnimationStep>(defaultRevealed ? 'unfolded' : 'sealed');
  const [isBirthdayMode, setIsBirthdayMode] = useState<boolean>(defaultRevealed);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  const musicBoxRef = useRef<BirthdayMusicBox | null>(null);

  // Initialize music box
  useEffect(() => {
    musicBoxRef.current = new BirthdayMusicBox();
    if (defaultRevealed) {
      triggerBirthdaySurprise();
    }
    return () => {
      musicBoxRef.current?.stop();
    };
  }, []);

  // Handle start reveal sequence
  const handleStartReveal = () => {
    if (step !== 'sealed') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep('unfolded');
      triggerBirthdaySurprise();
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
      // Transition immediately into celebration mode once unfolded
      setTimeout(() => {
        triggerBirthdaySurprise();
      }, 600);
    }, 1450);
  };

  const triggerBirthdaySurprise = () => {
    setIsBirthdayMode(true);
    if (musicBoxRef.current && !isMusicPlaying) {
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
      data-testid="final-envelope-screen"
      className={`fixed inset-0 w-screen h-[100dvh] transition-colors duration-1000 flex flex-col items-center justify-between p-3 sm:p-6 overflow-y-auto select-none ${
        isBirthdayMode ? 'bg-[#FFF8F0] text-[#2C221E]' : 'bg-[#080707] text-[#D5C19B]'
      }`}
      aria-label="Final Evidence and Birthday Scrapbook Screen"
      style={
        isBirthdayMode
          ? {
              backgroundImage: `url(${cherryBirthdaySkyImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }
          : undefined
      }
    >
      {/* ================= FLOATING BIRTHDAY CELEBRATION PARTICLES ================= */}
      {isBirthdayMode && (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Floating Cherry Blossom Petals */}
          <div className="absolute top-10 left-8 text-2xl animate-bounce opacity-80">🌸</div>
          <div className="absolute top-24 right-12 text-3xl animate-pulse opacity-75">🍒</div>
          <div className="absolute top-1/3 left-16 text-xl animate-spin opacity-70">🌸</div>
          <div className="absolute top-1/2 right-20 text-2xl animate-bounce opacity-80">✨</div>
          <div className="absolute bottom-24 left-10 text-3xl opacity-75">🎈</div>
          <div className="absolute bottom-32 right-14 text-3xl opacity-80">🎂</div>

          {/* Golden Rainbow Arc Glow */}
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-pink-300/20 via-yellow-200/10 to-transparent" />
        </div>
      )}

      {/* ================= SCREEN TOP HEADER ================= */}
      <header
        className={`relative z-20 w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-2.5 border-b pb-2 pt-2 px-3 transition-colors duration-500 shrink-0 ${
          isBirthdayMode
            ? 'border-[#E63946]/40 text-[#8B1E2B] bg-white/85 backdrop-blur-md rounded-lg shadow-sm mb-2'
            : 'border-[#651B20]/40 text-[#D5C19B]'
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-xs sm:text-sm tracking-[0.2em] font-bold uppercase text-center sm:text-left"
            style={{ color: isBirthdayMode ? '#E63946' : '#A31525' }}
          >
            {isBirthdayMode ? '🎉 CASE 1311 // BIRTHDAY CELEBRATION' : envelope.label}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          {isBirthdayMode && (
            <button
              type="button"
              data-testid="toggle-birthday-melody-button"
              onClick={toggleMusic}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#FFF0F3] hover:bg-[#FFE3E8] border border-[#E63946] text-[#E63946] font-mono text-[11px] font-bold rounded-full shadow cursor-pointer transition-transform active:scale-95"
              title="Toggle Happy Birthday Chime Melody"
            >
              <span>{isMusicPlaying ? '🎵' : '🔇'}</span>
              <span>{isMusicPlaying ? 'Melody: PLAYING' : 'Melody: MUTED'}</span>
            </button>
          )}

          {onReturnToCctv && (
            <button
              type="button"
              onClick={onReturnToCctv}
              className={`font-mono text-[11px] tracking-wider transition-colors cursor-pointer py-1 px-2.5 rounded border ${
                isBirthdayMode
                  ? 'bg-white text-[#8B1E2B] hover:text-[#E63946] border-[#E63946]/40'
                  : 'bg-black/40 text-[#8F1320] hover:text-[#ff4b63] border-[#8F1320]/40'
              }`}
            >
              ← Back to CCTV Table
            </button>
          )}
        </div>
      </header>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="relative z-20 my-auto py-4 w-full max-w-xl flex flex-col items-center justify-center">
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
                  step === 'sliding' ? '-translate-y-24 opacity-95 scale-102' : 'translate-y-2 opacity-0'
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
                <span>AUTHENTICATED CIPHER: 1311</span>
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
                className={`font-mono text-xs uppercase tracking-[0.22em] text-[#EAE0CD] bg-[#651B20] hover:bg-[#9E2934] active:bg-[#481216] border border-[#9E2934] px-8 py-3.5 rounded-[2px] shadow-[0_4px_16px_rgba(101,27,32,0.5)] transition-all duration-300 min-h-[50px] flex items-center justify-center gap-2 cursor-pointer ${
                  isInteracting ? 'opacity-50 cursor-wait' : 'hover:scale-102'
                }`}
              >
                <span>{step === 'breaking' ? 'BREAKING WAX...' : envelope.buttonText}</span>
              </button>

              <p className="font-mono text-[10px] tracking-wider text-[#A88A55] uppercase">
                [ Tap wax seal or click button to unseal and unfold letter ]
              </p>
            </div>
          </div>
        ) : (
          /* ================= FULLY UNFOLDED LETTER / CELEBRATION ================= */
          <div className="w-full space-y-6">
            {/* Surprise Celebration Banner */}
            <div
              className="w-full p-5 rounded-lg shadow-2xl text-center text-white space-y-2 border-2 border-pink-200"
              style={{
                backgroundImage: `
                  linear-gradient(135deg, rgba(255, 107, 107, 0.92), rgba(255, 209, 102, 0.92)),
                  url(${birthdayScrapbookImg})
                `,
                backgroundSize: 'cover',
              }}
            >
              <div className="text-3xl sm:text-4xl font-extrabold tracking-wide uppercase drop-shadow">
                🎂 HAPPY BIRTHDAY! 🌸
              </div>
              <p className="font-sans text-xs sm:text-sm font-semibold text-white/95 drop-shadow">
                The mystery of Case 1311 is solved! May your year be filled with sunshine, cherry blossoms, and endless freedom! ✨
              </p>
            </div>

            {/* The Unfolded Letter Article */}
            <article
              data-testid="unfolded-letter-card"
              className="relative w-full rounded-lg p-6 sm:p-9 md:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.5)] border bg-[#FFFDF9]/95 border-[#FFCCD5] text-[#2C221E] backdrop-blur-md"
            >
              {/* Scrapbook stickers / pins in Birthday Mode */}
              <div className="absolute -top-3 left-6 px-3 py-1 bg-[#FFD166] text-[#6A4C00] font-sans text-xs font-bold rounded shadow transform -rotate-3">
                🍒 Cherry & Sunshine
              </div>
              <div className="absolute -top-3 right-6 px-3 py-1 bg-[#FF6B6B] text-white font-sans text-xs font-bold rounded shadow transform rotate-3">
                🌈 Rainbow & Joy
              </div>

              {/* Letter Header */}
              <div className="border-b-2 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-[#FFCCD5]">
                <div>
                  <div className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.24em] uppercase text-[#E63946]">
                    CONFIDENTIAL DISCLOSURE // EXHIBIT 1311-FINAL
                  </div>
                  <h2
                    className="font-serif text-xl sm:text-2xl font-bold tracking-tight mt-1 text-[#4A0A10]"
                    style={{ fontFamily: "'Cinzel', 'Lora', serif" }}
                  >
                    A CELEBRATION FOR THE RECORD
                  </h2>
                </div>

                <div className="font-mono text-[10px] tracking-wider text-[#A85865]">
                  CASE 1311 // SOLVED & CELEBRATED
                </div>
              </div>

              {/* SECTION 1: LAST REPORTED STATEMENT */}
              <section
                data-testid="statement-section"
                className="p-4 sm:p-5 rounded-[4px] mb-8 border bg-[#FFF9FA] border-[#FFD6DC]"
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E63946]/20">
                  <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#E63946]">
                    {envelope.statementHeading}
                  </h3>
                  <span className="font-mono text-[9px] tracking-wider text-[#7A6455] uppercase italic">
                    // Secret Admirer's Confession
                  </span>
                </div>

                <div
                  className="font-serif text-sm sm:text-base leading-relaxed whitespace-pre-line tracking-normal text-[#241A15]"
                  style={{ fontFamily: "'Lora', 'Georgia', serif" }}
                >
                  {envelope.statementPlaceholder}
                </div>
              </section>

              {/* SECTION 2: PERSONAL BIRTHDAY LETTER */}
              <section
                data-testid="letter-section"
                className="p-4 sm:p-6 rounded-[4px] mb-6 border bg-[#FFFDF8] border-[#FFE5B4] shadow-sm"
              >
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E63946]/20">
                  <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#E63946]">
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

                <div className="mt-4 pt-3 border-t text-[11px] font-mono italic text-[#E63946] border-[#FFD6DC]">
                  ~~ Happy Birthday, Sanober! The cage has opened into sunshine and flowers ~~
                </div>
              </section>

              {/* Footer inside letter */}
              <div className="pt-4 border-t border-[#38271D]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono text-[#7A6455]">
                <span>CASE FILE 1311 // CONGRATULATIONS</span>
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
      <footer className="relative z-20 w-full max-w-2xl text-center py-2 border-t transition-colors duration-500 shrink-0 border-[#E63946]/30">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold text-[#E63946]">
          CASE FILE 1311 // INVESTIGATION COMPLETE · WISHING YOU THE BEST YEAR AHEAD
        </span>
      </footer>
    </section>
  );
}
