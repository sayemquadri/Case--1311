/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface DetectiveLarenProps {
  dialogueText: string;
  isIntroModalOpen: boolean;
  onDismissIntro: () => void;
}

export function DetectiveLaren({
  dialogueText,
  isIntroModalOpen,
  onDismissIntro,
}: DetectiveLarenProps) {
  const [displayedText, setDisplayedText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [isWobbling, setIsWobbling] = useState<boolean>(false);

  // Typewriter effect for speech dialogue
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex <= dialogueText.length) {
        setDisplayedText(dialogueText.slice(0, currentIndex));
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [dialogueText]);

  // Occasional cute blinking / eye flutter
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3800);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleLarenTap = () => {
    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 600);
    // If typing, instantly complete text
    if (isTyping) {
      setDisplayedText(dialogueText);
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* ================= 1. FIRST INTRODUCTION POP-UP MODAL ================= */}
      {isIntroModalOpen && (
        <div
          data-testid="laren-intro-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-label="Detective Laren Introduction"
        >
          <div className="relative w-full max-w-xs sm:max-w-sm bg-[#120E0D] border-2 border-[#D97706]/70 rounded-lg p-5 shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(217,119,6,0.25)] flex flex-col items-center text-center">
            {/* Laren Character Graphic with Magnifying Glass */}
            <div className="relative w-28 h-28 -mt-10 mb-2 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-md animate-pulse" />
              <img
                src="/assets/detective_laren.webp"
                alt="Detective Laren, small cute detective robot boy with little hat and magnifying glass"
                className={`w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)] ${
                  isBlinking ? 'scale-y-95' : 'scale-100'
                } transition-transform duration-150`}
              />
            </div>

            {/* Brass Badge Name Banner */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#78350F] via-[#B45309] to-[#78350F] border border-[#FDE68A]/40 text-[#FEF3C7] font-mono text-[10px] font-bold tracking-widest uppercase shadow-md mb-3">
              <span>★</span>
              <span>DETECTIVE LAREN</span>
              <span>★</span>
            </div>

            {/* Exact Introduction Dialogue */}
            <p className="font-serif text-[#F5EDE0] text-sm sm:text-base leading-relaxed mb-4 px-2 italic font-medium">
              &ldquo;hii, I&apos;m detective laren, nice to meet you&rdquo;
            </p>

            {/* Small OK button */}
            <button
              type="button"
              data-testid="laren-intro-ok-button"
              onClick={onDismissIntro}
              className="px-6 py-2 bg-[#8B141A] hover:bg-[#A31820] active:bg-[#680E13] border border-[#FCA5A5]/40 text-[#FFF5F5] font-mono text-xs font-bold uppercase tracking-widest rounded transition-all duration-150 shadow-md transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ================= 2. PERSISTENT WIDGET AT BOTTOM OF SCREEN ================= */}
      {/* Positioned fixed near bottom-left, never obscuring desk (top-right) or center table */}
      <aside
        data-testid="detective-laren-widget"
        className="fixed bottom-7 sm:bottom-8 left-1.5 sm:left-4 z-40 flex items-end gap-1.5 sm:gap-2.5 max-w-[calc(100vw-1rem)] sm:max-w-md pointer-events-none select-none transition-all duration-300"
        aria-live="polite"
      >
        {/* Animated Robot Character */}
        <button
          type="button"
          onClick={handleLarenTap}
          title="Detective Laren - Tap to interact"
          className={`group pointer-events-auto relative shrink-0 w-11 h-11 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer focus:outline-none transition-transform duration-300 ${
            isWobbling
              ? 'animate-bounce scale-110'
              : 'hover:scale-105 active:scale-95 animate-[pulse_4s_ease-in-out_infinite]'
          }`}
          aria-label="Detective Laren Guide"
        >
          {/* Ambient gold glow */}
          <div className="absolute inset-0 rounded-full bg-amber-500/15 blur-sm" />

          {/* Character illustration */}
          <img
            src="/assets/detective_laren.webp"
            alt="Detective Laren"
            className={`w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)] ${
              isBlinking ? 'scale-y-95' : 'scale-100'
            } ${isTyping ? 'animate-[bounce_0.8s_ease-in-out_infinite]' : ''}`}
          />

          {/* Magnifying glass gleam indicator */}
          <span className="absolute -top-0.5 right-0.5 sm:right-1 w-2 h-2 rounded-full bg-cyan-300/80 shadow-[0_0_8px_rgba(103,232,249,0.9)] animate-ping" />
        </button>

        {/* Dialogue Bubble beside / above Laren */}
        <div
          onClick={handleLarenTap}
          className="pointer-events-auto relative bg-[#120E0D]/95 border border-[#B45309]/50 rounded-lg rounded-bl-xs px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 shadow-[0_6px_20px_rgba(0,0,0,0.85),0_0_15px_rgba(180,83,9,0.15)] backdrop-blur-md max-w-[195px] xs:max-w-[230px] sm:max-w-[280px] cursor-pointer group hover:border-[#D97706] transition-colors duration-200"
        >
          {/* Little speech tail pointing to Laren */}
          <div className="absolute -left-1.5 bottom-2.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#120E0D]/95 border-b border-l border-[#B45309]/50 rotate-45 pointer-events-none" />

          {/* Name Header */}
          <div className="flex items-center justify-between gap-1.5 mb-0.5 sm:mb-1">
            <span className="font-mono text-[8.5px] sm:text-[10px] text-[#F59E0B] font-bold tracking-wider uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
              DETECTIVE LAREN
            </span>
            {isTyping && (
              <span className="font-mono text-[7.5px] sm:text-[8px] text-neutral-400 animate-pulse">
                talking...
              </span>
            )}
          </div>

          {/* Dialogue Text with Typewriter Effect */}
          <p className="font-serif text-[10.5px] sm:text-[12.5px] leading-tight sm:leading-snug text-[#F5EDE0] tracking-tight">
            &ldquo;{displayedText}&rdquo;
            {isTyping && (
              <span className="inline-block w-1.5 h-3 bg-[#F59E0B] ml-0.5 align-middle animate-pulse" />
            )}
          </p>
        </div>
      </aside>
    </>
  );
}
