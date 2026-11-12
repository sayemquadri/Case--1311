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
        setErrorMsg('Incorrect password. Please try again.');
      }
    }, 350);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lock-heading"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn overflow-y-auto select-none"
    >
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-3 sm:gap-3.5 my-auto">
        {/* Minimal Sealed-Envelope Password Modal */}
        <div className="w-full bg-[#EBE2D3] border-2 border-[#8F1320] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_15px_rgba(143,19,32,0.3)] rounded-[2px] p-4 sm:p-5 text-[#241A15]">
          {/* Header */}
          <div className="border-b-2 border-[#8F1320] pb-2 mb-3.5 flex items-center justify-between">
            <div>
              <span className="font-mono text-[9px] sm:text-[10.5px] font-bold tracking-[0.22em] text-[#8F1320] uppercase block">
                CONFIDENTIAL CLEARANCE REQUIRED
              </span>
              <h2
                id="lock-heading"
                className="font-serif text-base sm:text-lg font-bold tracking-tight text-[#1E1513] mt-0.5 leading-snug"
                style={{ fontFamily: "'Cinzel', 'Lora', serif" }}
              >
                UNLOCK SEALED ENVELOPE
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-mono text-sm font-bold text-[#8F1320] hover:bg-[#8F1320]/10 rounded border border-[#8F1320]/30 cursor-pointer transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
            <div>
              <input
                id="cipher-input"
                type="text"
                maxLength={8}
                autoFocus
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 bg-[#FAF5EA] border-2 border-[#8F1320]/60 focus:border-[#8F1320] focus:ring-1 focus:ring-[#8F1320] outline-none font-mono text-sm sm:text-base tracking-widest text-[#1E1513] rounded-[2px] placeholder:text-[#8C7A6B]/70 placeholder:tracking-normal"
              />
            </div>

            {errorMsg && (
              <div
                role="alert"
                className="p-2 bg-red-950/15 border border-[#8F1320]/40 text-[#8F1320] font-mono text-[11px] sm:text-xs font-bold rounded-[2px] text-center"
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

        {/* Detective Laren visible beneath the modal without overlapping */}
        <aside
          data-testid="laren-password-hint"
          className="w-full flex items-end gap-2 px-1 pointer-events-auto"
          aria-live="polite"
        >
          <div className="relative shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xs" />
            <img
              src="/assets/detective_laren.webp"
              alt="Detective Laren"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]"
            />
            <span className="absolute -top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-300/80 animate-ping" />
          </div>

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
              &ldquo;Maybe the password is hidden somewhere in the diary. We should read it first!&rdquo;
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
