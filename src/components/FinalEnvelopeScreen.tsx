/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EXPERIENCE_CONTENT } from '../data/storyContent';
import { ClassifiedStamp, CrimsonFingerprint, InkSplatter, WaxSeal } from './TactileDecorations';

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

  const handleStartReveal = () => {
    if (step !== 'sealed') return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setStep('unfolded');
      return;
    }

    // Step 1: Break seal
    setStep('breaking');

    // Step 2: Open flap
    setTimeout(() => {
      setStep('opening-flap');
    }, 450);

    // Step 3: Slide out letter
    setTimeout(() => {
      setStep('sliding');
    }, 900);

    // Step 4: Fully unfolded letter
    setTimeout(() => {
      setStep('unfolded');
    }, 1450);
  };

  const handleReseal = () => {
    setStep('sealed');
  };

  const isRevealed = step === 'unfolded';
  const isInteracting = step !== 'sealed' && step !== 'unfolded';

  return (
    <section
      className="fixed inset-0 w-screen h-[100dvh] bg-[#050404] text-[#A31525] flex flex-col items-center justify-between p-4 sm:p-6 overflow-y-auto select-none"
      aria-label="Final Evidence Envelope and Unfolded Letter Screen"
    >
      {/* Top quiet header */}
      <header className="w-full max-w-2xl flex items-center justify-between border-b border-[#8F1320]/20 pb-2 pt-1 px-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs tracking-[0.22em] font-bold text-[#A31525] uppercase">
            {envelope.label}
          </span>
          <span className="text-[10px] font-mono text-[#8F1320]/60 hidden sm:inline">
            // ARCHIVAL DISCLOSURE
          </span>
        </div>

        {onReturnToStory && (
          <button
            type="button"
            onClick={onReturnToStory}
            className="font-mono text-[11px] tracking-wider text-[#8F1320] hover:text-[#A31525] transition-colors cursor-pointer py-1 px-2 border border-transparent hover:border-[#8F1320]/30"
          >
            ← Back to Case
          </button>
        )}
      </header>

      {/* Main Center Area: Envelope or Unfolded Letter */}
      <div className="my-auto py-4 w-full max-w-xl flex flex-col items-center justify-center">
        {!isRevealed ? (
          /* ================= ENVELOPE (SEALED / OPENING) ================= */
          <div className="flex flex-col items-center space-y-6 w-full">
            {/* The Physical Aged Envelope */}
            <div
              data-testid="sealed-envelope"
              className={`relative w-full max-w-md aspect-[16/10] bg-[#beae94] rounded-[2px] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_20px_rgba(143,19,32,0.1)] border border-[#87755b] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ${
                step === 'sliding' ? 'translate-y-4' : 'translate-y-0'
              }`}
              style={{
                backgroundImage: `
                  linear-gradient(135deg, #c7b79e 0%, #b8a68b 50%, #ad9b80 100%),
                  radial-gradient(circle at 50% 50%, rgba(143,19,32,0.05), transparent 70%)
                `,
              }}
            >
              {/* Envelope Flap Triangular Lines */}
              <svg
                viewBox="0 0 400 250"
                className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              >
                {/* Lower diagonal folds */}
                <path d="M0 250 L200 130 L400 250" fill="none" stroke="#7a6850" strokeWidth="1.5" />
                {/* Upper flap fold */}
                <path
                  d={
                    step === 'opening-flap' || step === 'sliding'
                      ? 'M0 0 L200 -80 L400 0'
                      : 'M0 0 L200 130 L400 0'
                  }
                  fill="rgba(175,155,128,0.3)"
                  stroke="#6d5c45"
                  strokeWidth="2"
                  className="transition-all duration-500 ease-out"
                />
              </svg>

              {/* Faint Forensic Smudges & Evidence Label on Envelope */}
              <div className="absolute top-3 left-4 pointer-events-none opacity-25">
                <InkSplatter className="w-10 h-10" />
              </div>
              <div className="absolute bottom-3 right-4 pointer-events-none opacity-30">
                <CrimsonFingerprint className="w-8 h-12" />
              </div>

              {/* Evidence Tag Taped to Envelope */}
              <div className="absolute top-4 sm:top-5 left-1/2 -translate-x-1/2 bg-[#2b211d] text-[#c9959b] border border-[#8F1320]/40 px-3 py-1 font-mono text-[10px] tracking-[0.24em] uppercase shadow-sm select-none">
                EVIDENCE ITEM: 1311-FINAL
              </div>

              {/* Slide-out folded paper peek during transition */}
              {step === 'sliding' && (
                <div className="absolute w-[80%] h-24 -top-8 bg-[#f5ecda] border border-[#7a6850] shadow-md -translate-y-6 transition-transform duration-500" />
              )}

              {/* Crimson Wax Seal */}
              <div className="relative z-10 mt-6 sm:mt-8">
                <WaxSeal
                  isBreaking={step === 'breaking'}
                  isBroken={step === 'opening-flap' || step === 'sliding'}
                  monogram={envelope.sealMonogram}
                  onClick={handleStartReveal}
                />
              </div>

              {/* Label below seal */}
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#47372c] mt-3 z-10">
                CONFIDENTIAL ARCHIVE
              </span>
            </div>

            {/* Tap to reveal letter Button */}
            <div className="pt-2">
              <button
                type="button"
                data-testid="reveal-letter-button"
                onClick={handleStartReveal}
                disabled={isInteracting}
                className={`font-mono text-xs uppercase tracking-[0.22em] text-[#8F1320] hover:text-[#A31525] bg-transparent hover:bg-[#8F1320]/10 border border-[#8F1320]/50 hover:border-[#A31525] px-6 py-2.5 transition-all duration-300 cursor-pointer min-h-[44px] ${
                  isInteracting ? 'opacity-40 cursor-wait' : 'active:scale-95'
                }`}
              >
                {isInteracting ? 'breaking seal...' : envelope.buttonText}
              </button>
            </div>
          </div>
        ) : (
          /* ================= UNFOLDED LETTER CONTENT ================= */
          <article
            data-testid="unfolded-letter"
            className="relative w-full bg-[#f6efe2] text-[#2b201d] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_20px_rgba(143,19,32,0.15)] rounded-sm p-6 sm:p-9 border border-[#d8cca8] animate-fade-in"
            style={{
              backgroundImage: `
                radial-gradient(circle at 90% 10%, rgba(143,19,32,0.05) 0%, transparent 50%),
                radial-gradient(circle at 10% 90%, rgba(60,35,15,0.05) 0%, transparent 60%),
                linear-gradient(to bottom, #f7f1e6, #f1e7d4)
              `,
            }}
          >
            {/* Tactile paper fold creases */}
            <div className="absolute inset-x-0 top-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#2b201d]/15 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-2/3 h-[1px] bg-gradient-to-r from-transparent via-[#2b201d]/15 to-transparent pointer-events-none" />

            {/* Tactile fingerprints & stamps */}
            <div className="absolute top-4 right-5 pointer-events-none opacity-25">
              <CrimsonFingerprint className="w-10 h-14" />
            </div>
            <div className="absolute bottom-5 right-6 pointer-events-none opacity-20">
              <InkSplatter className="w-12 h-12" />
            </div>

            {/* Letter Header */}
            <div className="flex items-center justify-between border-b border-[#2b201d]/20 pb-3 mb-6">
              <div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#785b51] uppercase block">
                  AUTHENTICATED RECORD // DOSSIER 1311
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-[#8F1320]">
                  OFFICIAL DECLASSIFICATION
                </span>
              </div>
              <ClassifiedStamp text="DECLASSIFIED" className="text-[9px] px-1.5 py-0.5 rotate-1" />
            </div>

            {/* PLACEHOLDER 1: LAST REPORTED STATEMENT */}
            <section
              data-testid="last-reported-statement-area"
              className="border border-dashed border-[#8F1320]/40 bg-[#fbf5eb]/80 p-4 sm:p-5 rounded-[1px] mb-6 relative"
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#8F1320]/15">
                <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#8F1320]">
                  {envelope.statementHeading}
                </h3>
                <span className="font-mono text-[9px] tracking-wider text-[#785b51] uppercase italic">
                  // Reserved for Admirer’s Statement
                </span>
              </div>

              <div className="font-mono text-xs sm:text-sm text-[#2e2320] leading-relaxed whitespace-pre-line tracking-wide">
                {envelope.statementPlaceholder}
              </div>

              <div className="mt-3 pt-2 border-t border-[#8F1320]/10 text-[10px] font-mono text-[#8F1320]/70 italic">
                ~~redacted surveillance log~~ · [Awaiting final statement text]
              </div>
            </section>

            {/* PLACEHOLDER 2: LETTER CONTENT */}
            <section
              data-testid="letter-content-area"
              className="border border-dashed border-[#8F1320]/40 bg-[#fbf5eb]/80 p-4 sm:p-5 rounded-[1px] mb-6 relative"
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#8F1320]/15">
                <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-[#8F1320]">
                  {envelope.letterHeading}
                </h3>
                <span className="font-mono text-[9px] tracking-wider text-[#785b51] uppercase italic">
                  // Personal Letter & Birthday Roast
                </span>
              </div>

              <div className="font-mono text-xs sm:text-sm text-[#2e2320] leading-relaxed whitespace-pre-line tracking-wide">
                {envelope.letterPlaceholder}
              </div>

              <div className="mt-3 pt-2 border-t border-[#8F1320]/10 text-[10px] font-mono text-[#8F1320]/70 italic">
                ~~confidential birthday disclosure~~ · [Awaiting final letter text]
              </div>
            </section>

            {/* Footer inside letter */}
            <div className="pt-3 border-t border-[#2b201d]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[10px] font-mono text-[#785b51]">
              <span>CASE FILE NO. 1311 // THE SANOBER FILES</span>
              <button
                type="button"
                onClick={handleReseal}
                className="underline hover:text-[#8F1320] cursor-pointer py-1"
              >
                [re-fold & re-seal letter]
              </button>
            </div>
          </article>
        )}
      </div>

      {/* Bottom status line */}
      <footer className="w-full max-w-2xl text-center py-2 border-t border-[#8F1320]/15">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#8F1320]/60 uppercase">
          THE SANOBER FILES // CASE ARCHIVE COMPLETE
        </span>
      </footer>
    </section>
  );
}
