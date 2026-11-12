/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EXPERIENCE_CONTENT } from '../data/storyContent';

interface TriggerWarningScreenProps {
  onEnterAnyways: () => void;
}

export function TriggerWarningScreen({ onEnterAnyways }: TriggerWarningScreenProps) {
  const { warning } = EXPERIENCE_CONTENT;

  return (
    <section
      className="relative w-screen h-[100dvh] bg-[#0A0705] text-[#241A15] flex items-center justify-center p-1.5 sm:p-3 overflow-hidden select-none"
      aria-label="Content Warning Poster"
    >
      {/* Dark Ambient Vignette and Atmospheric Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-80"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(35,22,15,0.4) 0%, rgba(10,7,5,0.95) 75%, #050302 100%)',
        }}
      />

      {/* Accessible Screen-Reader & Semantic Document Content */}
      <div className="sr-only">
        <h1>{warning.heading}</h1>
        <h2>{warning.subheading}</h2>
        <p>This little story contains:</p>
        <ol>
          {warning.disclosures.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>

      {/* The Physical Parchment Poster - tightly sized to exact aspect ratio with zero dead letterbox space */}
      <div
        className="relative z-10 my-auto flex flex-col items-center justify-center filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.98)]"
        style={{
          width: 'min(98vw, calc(96dvh * 1103 / 1426))',
          aspectRatio: '1103 / 1426',
        }}
      >
        {/* Visual Asset: trigge warning.png with WebP optimization */}
        <picture className="w-full h-full block relative">
          <source srcSet="/assets/aistudio/trigge_warning.webp" type="image/webp" />
          <img
            src="/trigge warning.png"
            alt="Vintage Thriller Content Warning Poster — Case 1311 evidence document with antique journal, brass key, and train ticket"
            className="w-full h-full object-contain pointer-events-none select-none rounded-[2px]"
            loading="eager"
            decoding="async"
          />
        </picture>

        {/* ================= INTERACTION: ENTER ANYWAYS BUTTON ================= */}
        {/* Integrated naturally into the bottom tape / torn edge area of the parchment */}
        <div
          className="absolute z-20 flex justify-center items-center pointer-events-auto"
          style={{
            bottom: '3.8%',
            left: '6%',
            right: '6%',
          }}
        >
          <button
            type="button"
            data-testid="enter-anyways-button"
            onClick={onEnterAnyways}
            className="group relative px-5 sm:px-9 py-2 sm:py-3.5 bg-[#8B141A] hover:bg-[#A31820] active:bg-[#680E13] border-2 border-[#5A0D11] rounded-[2px] shadow-[0_6px_20px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.25)] text-[#FAF3E6] font-mono text-[11px] sm:text-sm font-bold tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#8B141A] focus:ring-offset-2 focus:ring-offset-black"
          >
            {/* Subtle stamped ink texture */}
            <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] flex items-center gap-1.5 sm:gap-2">
              <span>ENTER ANYWAYS</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </span>

            {/* Corner archival notches */}
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#FFA8B0]/60 pointer-events-none" />
            <span className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#FFA8B0]/60 pointer-events-none" />
            <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#FFA8B0]/60 pointer-events-none" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#FFA8B0]/60 pointer-events-none" />
          </button>
        </div>
      </div>
    </section>
  );
}
