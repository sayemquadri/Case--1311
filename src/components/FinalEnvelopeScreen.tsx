/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { WaxSeal } from './TactileDecorations';
import { BirthdayMusicBox } from '../utils/birthdayMusic';
import { PERSONAL_BIRTHDAY_LETTER } from '../data/storyContent';

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
  const [step, setStep] = useState<AnimationStep>(defaultRevealed ? 'unfolded' : 'sealed');
  const [isBirthdayMode, setIsBirthdayMode] = useState<boolean>(defaultRevealed);

  const musicBoxRef = useRef<BirthdayMusicBox | null>(null);

  // Initialize music box
  useEffect(() => {
    musicBoxRef.current = new BirthdayMusicBox();
    if (defaultRevealed) {
      setIsBirthdayMode(true);
      musicBoxRef.current.play();
    }
    return () => {
      musicBoxRef.current?.stop();
    };
  }, [defaultRevealed]);

  // Handle start reveal sequence
  const handleStartReveal = () => {
    if (step !== 'sealed') return;

    // Automatic Birthday Music: Starts immediately on the envelope-opening user interaction with gentle audio fade-in
    if (musicBoxRef.current) {
      musicBoxRef.current.play();
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep('unfolded');
      setIsBirthdayMode(true);
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
      setIsBirthdayMode(true);
    }, 1450);
  };

  const isRevealed = step === 'unfolded';
  const isInteracting = step !== 'sealed' && step !== 'unfolded';

  return (
    <section
      data-testid="final-envelope-screen"
      className={`fixed inset-0 w-screen h-[100dvh] transition-colors duration-1000 flex flex-col items-center ${
        isRevealed
          ? 'overflow-y-auto p-3 sm:p-6 md:p-8 select-text'
          : 'justify-center p-3 sm:p-4 overflow-hidden select-none'
      } ${
        isBirthdayMode ? 'bg-[#FFF8F0] text-[#2C221E]' : 'bg-[#080707] text-[#D5C19B]'
      }`}
      aria-label="Final Envelope Screen"
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
          <div className="absolute top-8 left-6 text-2xl animate-bounce opacity-80">🌸</div>
          <div className="absolute top-20 right-10 text-3xl animate-pulse opacity-75">🍒</div>
          <div className="absolute top-1/3 left-12 text-xl animate-spin opacity-70">🌸</div>
          <div className="absolute top-1/2 right-16 text-2xl animate-bounce opacity-80">✨</div>
          <div className="absolute bottom-20 left-8 text-3xl opacity-75">🎈</div>
          <div className="absolute bottom-28 right-12 text-3xl opacity-80">🎂</div>
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-pink-300/25 via-yellow-100/15 to-transparent" />
        </div>
      )}

      {/* ================= MAIN CONTENT ================= */}
      <div className={`relative z-20 w-full flex flex-col items-center ${isRevealed ? 'max-w-2xl mx-auto my-auto py-4 sm:py-6' : 'max-w-md'}`}>
        {!isRevealed ? (
          /* ================= MINIMAL, ELEGANT SEALED ENVELOPE ================= */
          <div className="flex flex-col items-center w-full">
            {/* Simple Heading above Envelope */}
            <div className="w-full flex items-center justify-between px-2 mb-3.5 sm:mb-5">
              {onReturnToCctv ? (
                <button
                  type="button"
                  onClick={onReturnToCctv}
                  className="font-mono text-[10px] sm:text-[11px] tracking-wider py-1 px-2.5 rounded border bg-black/50 text-[#8F1320] hover:text-[#ff4b63] border-[#8F1320]/40 transition-colors cursor-pointer"
                >
                  ← Back
                </button>
              ) : (
                <div className="w-12" />
              )}

              <h1
                className="font-serif text-sm sm:text-base md:text-lg tracking-[0.25em] font-bold text-[#A31525] uppercase text-center flex-1"
                style={{ fontFamily: "'Cinzel', 'Lora', serif" }}
              >
                THE FINAL LETTER
              </h1>

              <div className="w-12" />
            </div>

            {/* Prominent Antique Envelope */}
            <div
              data-testid="sealed-envelope"
              className={`relative w-full max-w-[340px] xs:max-w-[380px] sm:max-w-md aspect-[16/10.5] bg-[#CBB89D] rounded-[2px] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_20px_rgba(143,19,32,0.18)] border border-[#87755b] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ${
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
                className={`absolute w-[86%] bg-[#FAF4EA] text-[#241A15] p-3.5 shadow-md border border-[#C5B49C] rounded-[1px] transition-all duration-700 z-20 ${
                  step === 'sliding' ? '-translate-y-24 opacity-95 scale-102' : 'translate-y-2 opacity-0'
                }`}
              >
                <div className="border-b border-[#8F1320]/25 pb-1 flex justify-between text-[9px] font-serif italic text-[#8F1320]">
                  <span>Personal letter</span>
                  <span>✨</span>
                </div>
                <div className="h-4 mt-2 bg-[#8F1320]/10 rounded-sm" />
              </div>

              {/* The Wax Seal in center (Tappable, with decorative embossed emblem) */}
              <div className="relative z-30 transform hover:scale-105 transition-transform duration-200">
                <WaxSeal
                  isBreaking={step === 'breaking'}
                  isBroken={step === 'opening-flap' || step === 'sliding'}
                  onClick={handleStartReveal}
                />
              </div>
            </div>

            {/* Single Elegant Button Below Envelope */}
            <div className="mt-4 sm:mt-6 text-center">
              <button
                type="button"
                data-testid="reveal-letter-button"
                onClick={handleStartReveal}
                disabled={isInteracting}
                className={`font-mono text-xs uppercase tracking-[0.22em] text-[#EAE0CD] bg-[#651B20] hover:bg-[#9E2934] active:bg-[#481216] border border-[#9E2934] px-7 sm:px-8 py-3 sm:py-3.5 rounded-[2px] shadow-[0_4px_16px_rgba(101,27,32,0.5)] transition-all duration-300 min-h-[46px] sm:min-h-[50px] flex items-center justify-center gap-2 cursor-pointer ${
                  isInteracting ? 'opacity-50 cursor-wait' : 'hover:scale-102'
                }`}
              >
                <span>{step === 'breaking' ? 'BREAKING WAX...' : 'OPEN THE LETTER →'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* ================= JOYFUL, POLISHED BIRTHDAY CELEBRATION & LETTER ================= */
          <div className="w-full space-y-5 sm:space-y-6">
            {/* Cheerful Birthday Greeting Banner */}
            <div
              className="w-full p-6 sm:p-8 rounded-2xl shadow-xl text-center text-white space-y-2 border border-pink-200/90 relative overflow-hidden"
              style={{
                backgroundImage: `
                  linear-gradient(135deg, rgba(255, 107, 107, 0.94), rgba(255, 209, 102, 0.94)),
                  url(${birthdayScrapbookImg})
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="text-3xl xs:text-4xl sm:text-5xl font-black tracking-wide uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                🎂 HAPPY BIRTHDAY! 🌸
              </div>
              <p className="font-sans text-xs sm:text-sm font-semibold text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.2)] max-w-md mx-auto leading-relaxed">
                May your year be filled with sunshine, cherry blossoms, and endless adventures! ✨
              </p>
            </div>

            {/* The Main Letter Card */}
            <article
              data-testid="unfolded-letter-card"
              className="relative w-full rounded-2xl p-5 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border bg-[#FFFDF9]/95 border-[#FFCCD5] text-[#2C221E] backdrop-blur-md"
            >
              {/* SECTION: PERSONAL BIRTHDAY LETTER */}
              <section
                data-testid="letter-section"
                className="p-5 sm:p-8 rounded-xl border bg-[#FFFDF8]/95 border-[#FFE5B4] shadow-xs"
              >
                <div className="pb-2.5 mb-4 border-b border-[#E63946]/20 flex items-center justify-between">
                  <h3
                    className="font-serif text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#E63946]"
                    style={{ fontFamily: "'Cinzel', 'Lora', serif" }}
                  >
                    PERSONAL BIRTHDAY LETTER
                  </h3>
                  <span className="text-sm select-none" aria-hidden="true">💌</span>
                </div>

                <div
                  className="font-serif text-sm sm:text-base leading-[1.85] sm:leading-[1.95] text-[#2C221E] space-y-4 sm:space-y-4.5 tracking-normal break-words"
                  style={{ fontFamily: "'Lora', 'Georgia', serif" }}
                >
                  {PERSONAL_BIRTHDAY_LETTER.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? 'font-bold text-base sm:text-lg text-[#8F1320] pb-1'
                          : idx === PERSONAL_BIRTHDAY_LETTER.length - 1
                          ? 'italic text-xs sm:text-sm text-[#7A6455] pt-1'
                          : undefined
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}
