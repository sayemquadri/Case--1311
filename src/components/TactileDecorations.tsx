/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export function CrimsonFingerprint({ className = 'w-16 h-20 opacity-30' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 130"
      className={className}
      fill="none"
      stroke="#8F1320"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M50 15 C 30 15, 20 30, 20 50 C 20 75, 30 105, 50 115" strokeDasharray="3 4" />
      <path d="M50 25 C 36 25, 28 38, 28 55 C 28 80, 36 100, 50 108" />
      <path d="M50 35 C 42 35, 36 45, 36 60 C 36 78, 42 92, 50 98" strokeDasharray="5 3" />
      <path d="M50 45 C 46 45, 43 50, 43 62 C 43 72, 47 80, 50 85" />
      <path d="M50 15 C 70 15, 80 30, 80 50 C 80 75, 70 105, 50 115" strokeDasharray="4 4" />
      <path d="M50 25 C 64 25, 72 38, 72 55 C 72 80, 64 100, 50 108" />
      <path d="M50 35 C 58 35, 64 45, 64 60 C 64 78, 58 92, 50 98" strokeDasharray="6 3" />
      <path d="M50 45 C 54 45, 57 50, 57 62 C 57 72, 53 80, 50 85" />
      <circle cx="50" cy="65" r="4" fill="#8F1320" />
    </svg>
  );
}

export function InkSplatter({ className = 'w-12 h-12 opacity-25' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="#7A0C1A" aria-hidden="true">
      <path d="M48 42 C45 35 32 38 35 48 C37 54 42 56 46 54 C52 52 53 45 48 42 Z" />
      <circle cx="62" cy="38" r="4" />
      <circle cx="58" cy="62" r="3" />
      <circle cx="32" cy="58" r="2.5" />
      <circle cx="44" cy="28" r="1.5" />
      <path d="M45 52 Q 52 64 60 55 Q 68 45 58 40 Q 50 35 45 52 Z" opacity="0.8" />
      <circle cx="72" cy="50" r="2" />
      <circle cx="25" cy="42" r="1.5" />
    </svg>
  );
}

export function ClassifiedStamp({
  text = 'CLASSIFIED // CONFIDENTIAL',
  className = '',
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-block border-2 border-[#8F1320] px-3 py-1 font-mono text-xs uppercase tracking-[0.25em] text-[#8F1320] select-none ${className}`}
      style={{
        boxShadow: 'inset 0 0 0 1px rgba(143,19,32,0.15)',
        textShadow: '0 0 1px rgba(143,19,32,0.4)',
      }}
    >
      {text}
    </div>
  );
}

export function WaxSeal({
  isBreaking = false,
  isBroken = false,
  monogram = '1311',
  onClick,
}: {
  isBreaking?: boolean;
  isBroken?: boolean;
  monogram?: string;
  onClick?: () => void;
}) {
  if (isBroken) {
    return (
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center opacity-40 filter grayscale-[40%] transition-opacity duration-700">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#540B13] fill-current">
          <path d="M20 50 Q 15 25 35 20 Q 55 15 70 25 L 52 48 L 45 52 Z" />
          <path d="M50 55 L 75 32 Q 85 45 80 65 Q 75 85 55 85 L 48 58 Z" />
          <path d="M42 56 L 25 55 Q 20 75 35 85 Q 45 90 52 82 Z" />
        </svg>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isBreaking}
      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-transform duration-300 group cursor-pointer focus:outline-none ${
        isBreaking ? 'scale-90 opacity-80' : 'hover:scale-105 active:scale-95'
      }`}
      aria-label="Wax seal on envelope - tap to release"
      title="Tap to break seal"
    >
      {/* Wax edge puddles & irregular seal border */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-[#A31525] via-[#85121e] to-[#4A0A10] shadow-[0_4px_12px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.25)] border border-[#c52336]/30"
        style={{
          clipPath:
            'polygon(50% 0%, 80% 5%, 98% 30%, 100% 70%, 85% 95%, 55% 100%, 20% 95%, 2% 75%, 0% 35%, 15% 8%)',
        }}
      />
      {/* Inner embossed rim */}
      <div className="absolute inset-2 rounded-full border border-[#d62b3f]/40 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
        <span className="font-mono font-bold text-xs sm:text-sm tracking-wider text-[#ffd0d5] drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] select-none">
          {monogram}
        </span>
      </div>
    </button>
  );
}
