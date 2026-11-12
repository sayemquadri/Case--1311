/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { validateEnvelopePassword } from '../utils/experienceState';

interface PasswordUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUnlockSuccess: () => void;
  onOpenDiaryHint: () => void;
}

export function PasswordUnlockModal({
  isOpen,
  onClose,
  onUnlockSuccess,
  onOpenDiaryHint,
}: PasswordUnlockModalProps) {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      if (validateEnvelopePassword(password)) {
        onUnlockSuccess();
      } else {
        setErrorMsg('ACCESS DENIED // INCORRECT CIPHER. Check the final diary entry.');
      }
    }, 350);
  };

  const handleQuickFill = () => {
    setPassword('1311');
    setErrorMsg('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lock-heading"
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-2.5 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn overflow-y-auto"
    >
      {/* Top spacer to center modal while leaving room for Laren */}
      <div className="flex-1 min-h-1" />

      {/* Main Password Modal Card */}
      <div className="relative max-w-md w-full bg-[#EBE2D3] border-2 border-[#8F1320] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_15px_rgba(143,19,32,0.3)] rounded-[2px] p-4 sm:p-6 text-[#241A15] shrink-0 my-auto">
        {/* Dossier Header */}
        <div className="border-b-2 border-[#8F1320] pb-2.5 mb-3 sm:mb-4 flex items-center justify-between">
          <div>
            <span className="font-mono text-[9px] sm:text-[11px] font-bold tracking-[0.24em] text-[#8F1320] uppercase">
              CONFIDENTIAL CLEARANCE REQUIRED
            </span>
            <h2
              id="lock-heading"
              className="font-serif text-base sm:text-xl font-bold tracking-tight text-[#1E1513] mt-0.5"
            >
              UNLOCK SEALED ENVELOPE
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-mono text-sm font-bold text-[#8F1320] hover:bg-[#8F1320]/10 rounded border border-[#8F1320]/30 cursor-pointer"
            aria-label="Close passcode prompt"
          >
            ✕
          </button>
        </div>

        {/* Lock visual status */}
        <div className="bg-[#DFD4C2] border-l-4 border-[#8F1320] p-2.5 sm:p-3 rounded-r-[2px] mb-3 sm:mb-4 space-y-1">
          <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs font-bold text-[#8F1320]">
            <span>🔒 ENCRYPTION STATUS: LOCKED</span>
          </div>
          <p className="font-serif text-xs text-[#3D2E28] leading-relaxed">
            The secret admirer's letter is protected by an archival cipher lock.
          </p>
          <div className="pt-0.5 flex items-center justify-between flex-wrap gap-1">
            <span className="font-mono text-[10px] sm:text-[11px] text-[#8F1320] font-bold">
              💡 HINT: Hidden in the final diary entry.
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenDiaryHint();
              }}
              className="font-mono text-[10px] sm:text-[11px] text-[#8F1320] underline hover:text-[#A31525] font-bold cursor-pointer"
            >
              Read Diary →
            </button>
          </div>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label
              htmlFor="cipher-input"
              className="block font-mono text-[11px] sm:text-xs font-bold tracking-wider text-[#5C4538] uppercase mb-1"
            >
              Enter 4-Digit Dossier Cipher:
            </label>
            <div className="relative">
              <input
                id="cipher-input"
                type="text"
                maxLength={12}
                autoFocus
                placeholder="e.g. 1311"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 bg-[#F5EFE4] border-2 border-[#8F1320]/60 focus:border-[#8F1320] focus:ring-1 focus:ring-[#8F1320] outline-none font-mono text-sm sm:text-base tracking-widest text-[#1E1513] uppercase rounded-[2px]"
              />
              <button
                type="button"
                onClick={handleQuickFill}
                title="Clue found: 1311"
                className="absolute right-1.5 top-1.5 sm:right-2 sm:top-2 px-2 py-1 bg-[#8F1320]/10 hover:bg-[#8F1320]/20 text-[#8F1320] font-mono text-[9px] sm:text-[10px] font-bold rounded cursor-pointer"
              >
                Clue: 1311
              </button>
            </div>
          </div>

          {errorMsg && (
            <div
              role="alert"
              className="p-2 bg-red-950/20 border border-red-700/50 text-[#8F1320] font-mono text-[11px] sm:text-xs font-bold rounded-[2px]"
            >
              {errorMsg}
            </div>
          )}

          <div className="flex items-center gap-2 sm:gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 bg-[#DFD4C2] hover:bg-[#D5C6AF] text-[#4A382C] font-mono text-[11px] sm:text-xs font-bold uppercase rounded-[2px] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isVerifying}
              className="flex-1 py-2 sm:py-2.5 px-3 sm:px-4 bg-[#8F1320] hover:bg-[#A31820] active:bg-[#6E0E18] text-[#F5EFE4] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-[2px] shadow-[0_4px_12px_rgba(143,19,32,0.35)] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {isVerifying ? <span>Verifying...</span> : <span>Unlock Envelope →</span>}
            </button>
          </div>
        </form>
      </div>

      {/* Bottom spacer before Laren */}
      <div className="flex-1 min-h-1" />

      {/* ================= DETECTIVE LAREN ANCHORED AT BOTTOM OUTSIDE MODAL ================= */}
      <aside
        data-testid="laren-password-hint"
        className="w-full max-w-md shrink-0 mb-1 z-10 flex items-end gap-2 px-1 pointer-events-auto"
        aria-live="polite"
      >
        {/* Laren Character Avatar */}
        <div className="relative shrink-0 w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xs" />
          <img
            src="/assets/detective_laren.webp"
            alt="Detective Laren"
            className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
          />
          <span className="absolute -top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-300/80 animate-ping" />
        </div>

        {/* Laren Compact Dialogue Bubble */}
        <div
          onClick={() => {
            onClose();
            onOpenDiaryHint();
          }}
          className="flex-1 bg-[#120E0D]/95 border border-[#B45309]/60 rounded-lg p-2 sm:p-2.5 shadow-2xl backdrop-blur-md cursor-pointer hover:border-[#D97706] transition-colors group"
        >
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className="font-mono text-[9px] text-[#F59E0B] font-bold tracking-wider uppercase flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
              DETECTIVE LAREN
            </span>
            <span className="font-mono text-[8px] text-amber-200/70 group-hover:underline">
              [tap to view diary]
            </span>
          </div>
          <p className="font-serif text-[11px] sm:text-[12px] leading-snug text-[#F5EDE0]">
            &ldquo;The password SHOULD be in the diary! Let&apos;s go back and check the final entry.&rdquo;
          </p>
        </div>
      </aside>
    </div>
  );
}
