/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import cctvTableImg from '../assets/images/cctv_wooden_table_1793567432771.jpg';
import { CctvAtmosphereAudio } from '../utils/cctvAudio';
import { InteractiveDiaryModal } from './InteractiveDiaryModal';
import { PasswordUnlockModal } from './PasswordUnlockModal';

interface CctvSurveillanceScreenProps {
  onUnlockEnvelopeSuccess: () => void;
  onDirectOpenEnvelope: () => void;
  isEnvelopeUnlocked?: boolean;
}

export function CctvSurveillanceScreen({
  onUnlockEnvelopeSuccess,
  onDirectOpenEnvelope,
  isEnvelopeUnlocked = false,
}: CctvSurveillanceScreenProps) {
  const [activeCam, setActiveCam] = useState<'cam04' | 'cam01'>('cam04');
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [isAudioRunning, setIsAudioRunning] = useState<boolean>(false);
  const [isDiaryOpen, setIsDiaryOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [unlocked, setUnlocked] = useState<boolean>(isEnvelopeUnlocked);
  const [isFlickering, setIsFlickering] = useState<boolean>(false);
  const [hoveredObject, setHoveredObject] = useState<'diary' | 'envelope' | null>(null);

  const audioRef = useRef<CctvAtmosphereAudio | null>(null);

  useEffect(() => {
    audioRef.current = new CctvAtmosphereAudio();
    return () => {
      audioRef.current?.stop();
    };
  }, []);

  // CCTV live surveillance clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const year = now.getFullYear();
      const month = pad(now.getMonth() + 1);
      const day = pad(now.getDate());
      const hours = pad(now.getHours());
      const minutes = pad(now.getMinutes());
      const seconds = pad(now.getSeconds());
      setCurrentTimeStr(`${year}-${month}-${day} ${hours}:${minutes}:${seconds} GMT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Occasional realistic surveillance tape flicker
  useEffect(() => {
    const triggerFlicker = () => {
      setIsFlickering(true);
      setTimeout(() => setIsFlickering(false), 90 + Math.random() * 120);
    };

    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.4) {
        triggerFlicker();
      }
    }, 4500);

    return () => clearInterval(flickerInterval);
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isAudioRunning) {
      audioRef.current.stop();
      setIsAudioRunning(false);
    } else {
      audioRef.current.start();
      setIsAudioRunning(true);
    }
  };

  const handleOpenDiary = () => {
    audioRef.current?.playPaperTurn();
    setIsDiaryOpen(true);
  };

  const handleDiaryPageTurnSound = () => {
    audioRef.current?.playPaperTurn();
  };

  const handleEnvelopeClick = () => {
    if (unlocked) {
      audioRef.current?.playSealCrack();
      onDirectOpenEnvelope();
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const handleUnlockSuccess = () => {
    setUnlocked(true);
    setIsPasswordModalOpen(false);
    audioRef.current?.playSealCrack();
    onUnlockEnvelopeSuccess();
  };

  return (
    <section
      data-testid="cctv-surveillance-screen"
      className="relative w-screen h-[100dvh] bg-[#000000] text-neutral-200 overflow-hidden flex flex-col justify-between select-none"
      aria-label="CCTV Surveillance Evidence Room"
    >
      {/* Dynamic CRT Scanlines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-35"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.7) 0px, rgba(0,0,0,0.7) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Subtle Grain / Film Noise Filter */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-20 mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 10%, transparent 11%)`,
          backgroundSize: '4px 4px',
        }}
      />

      {/* Occasional Camera Glitch Line / Flicker */}
      {isFlickering && (
        <div className="absolute inset-0 z-30 pointer-events-none bg-white/5 backdrop-contrast-150 backdrop-brightness-125">
          <div
            className="w-full h-2 bg-white/20 absolute"
            style={{ top: `${Math.random() * 85}%` }}
          />
        </div>
      )}

      {/* Surveillance Camera Vignette & Heavy Outer Shadow */}
      <div className="absolute inset-0 pointer-events-none z-20 border-[6px] sm:border-[12px] border-black/90 shadow-[inset_0_0_140px_rgba(0,0,0,0.95)]" />

      {/* ================= CCTV TOP HUD ================= */}
      <header className="relative z-30 p-2.5 sm:p-4 flex items-center justify-between font-mono text-xs tracking-widest text-[#E83B46] bg-black/75 backdrop-blur-md border-b border-[#8F1320]/40">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Blinking REC indicator */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E83B46] animate-ping" />
            <span className="font-bold tracking-[0.2em] text-[#FF4D5A]">● REC</span>
          </div>

          <span className="text-neutral-600 hidden sm:inline">|</span>

          {/* Camera Selector Tabs */}
          <div className="flex items-center gap-1 bg-black/50 p-0.5 rounded border border-[#8F1320]/40">
            <button
              type="button"
              onClick={() => setActiveCam('cam04')}
              className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-bold rounded transition-colors cursor-pointer ${
                activeCam === 'cam04'
                  ? 'bg-[#8F1320] text-white shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              CAM 04 [DESK]
            </button>
            <button
              type="button"
              onClick={() => setActiveCam('cam01')}
              className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-bold rounded transition-colors cursor-pointer ${
                activeCam === 'cam01'
                  ? 'bg-[#8F1320] text-white shadow'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              CAM 01 [ROOM]
            </button>
          </div>
        </div>

        {/* Timestamp and Atmospheric Audio Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-mono text-[10px] sm:text-xs text-neutral-300 font-bold tracking-wider">
            {currentTimeStr || '2026-11-13 02:41:09 GMT'}
          </span>

          <button
            type="button"
            onClick={toggleAudio}
            className="px-2 py-1 bg-[#8F1320]/20 hover:bg-[#8F1320]/40 border border-[#8F1320] text-[#FF9EAA] font-mono text-[10px] sm:text-[11px] font-bold rounded cursor-pointer transition-colors"
            title="Toggle CCTV tape & surveillance atmosphere hum"
          >
            {isAudioRunning ? '🔊 HUM: ON' : '🔈 HUM: OFF'}
          </button>
        </div>
      </header>

      {/* ================= CCTV SURVEILLANCE ROOM MAIN VIEWPORT ================= */}
      <main className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden bg-black">
        {activeCam === 'cam04' ? (
          /* ================= FEED CAM 04: THE WOODEN TABLE WITH PHYSICAL OBJECTS ================= */
          <div className="relative w-full max-w-[177.78vh] aspect-[16/9] max-h-full flex items-center justify-center select-none">
            {/* The Background Camera Scene of the Wooden Desk */}
            <img
              src={cctvTableImg}
              alt="CCTV surveillance view looking down at old wooden table with antique diary and sealed envelope"
              className="w-full h-full object-cover filter contrast-125 brightness-95 saturate-80 pointer-events-none"
            />

            {/* Tactical Crosshair Center Mark */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
              <div className="w-20 h-20 border border-red-500/30 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-red-500/70 rounded-full" />
              </div>
            </div>

            {/* Subdued ambient focus hints in corners */}
            <div className="absolute top-4 left-6 pointer-events-none font-mono text-[10px] text-[#FF4D5A]/70 uppercase tracking-widest hidden sm:block">
              [ TARGET ACQUIRED: DESK 1311 ]
            </div>

            {/* ================= PHYSICAL OBJECT 1: THE ANTIQUE DIARY ================= */}
            <button
              type="button"
              data-testid="interactive-diary-button"
              onClick={handleOpenDiary}
              onMouseEnter={() => setHoveredObject('diary')}
              onMouseLeave={() => setHoveredObject(null)}
              onFocus={() => setHoveredObject('diary')}
              onBlur={() => setHoveredObject(null)}
              className="absolute z-30 cursor-pointer rounded-[4px] group focus:outline-none transition-all duration-300"
              style={{
                left: '27%',
                top: '41.5%',
                width: '23%',
                height: '34%',
                transform: 'rotate(-9.5deg)',
              }}
              aria-label="Interactive Object: Antique Diary on wooden table - tap to read"
              title="Antique Diary (Exhibit 1311-A) - Tap to inspect"
            >
              {/* Subtle ambient pulse / red outline & glow */}
              <div
                className={`absolute inset-0 rounded-[4px] border-2 transition-all duration-300 pointer-events-none ${
                  hoveredObject === 'diary'
                    ? 'border-[#DE3B4C] bg-red-950/25 shadow-[0_0_30px_rgba(222,59,76,0.85)] scale-102'
                    : 'border-[#DE3B4C]/40 hover:border-[#DE3B4C] shadow-[0_0_12px_rgba(222,59,76,0.35)] animate-pulse'
                }`}
              />

              {/* Tactical Camera HUD Reticle Brackets */}
              <span className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#DE3B4C] pointer-events-none" />
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#DE3B4C] pointer-events-none" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#DE3B4C] pointer-events-none" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#DE3B4C] pointer-events-none" />

              {/* Floating Tactical Label Tag (Appears on Hover / Always visible on Mobile) */}
              <div
                className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 border border-[#DE3B4C] text-[#FFCCD5] px-2.5 py-1 rounded-[2px] font-mono text-[9px] sm:text-[11px] tracking-wider uppercase shadow-xl transition-all duration-200 pointer-events-none ${
                  hoveredObject === 'diary'
                    ? 'opacity-100 -translate-y-1'
                    : 'opacity-85 sm:opacity-0'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="text-[#DE3B4C]">▸</span>
                  <span>EXHIBIT 1311-A // HER DIARY</span>
                </div>
              </div>
            </button>

            {/* ================= PHYSICAL OBJECT 2: THE SEALED ENVELOPE ================= */}
            <button
              type="button"
              data-testid="interactive-envelope-button"
              onClick={handleEnvelopeClick}
              onMouseEnter={() => setHoveredObject('envelope')}
              onMouseLeave={() => setHoveredObject(null)}
              onFocus={() => setHoveredObject('envelope')}
              onBlur={() => setHoveredObject(null)}
              className="absolute z-30 cursor-pointer rounded-[4px] group focus:outline-none transition-all duration-300"
              style={{
                left: '52%',
                top: '42%',
                width: '23%',
                height: '33%',
                transform: 'rotate(4.5deg)',
              }}
              aria-label={
                unlocked
                  ? 'Interactive Object: Unlocked Sealed Envelope - tap to open'
                  : 'Interactive Object: Sealed Dossier Envelope - tap to unlock with password'
              }
              title={
                unlocked
                  ? 'Unlocked Dossier Envelope - Tap to open'
                  : 'Sealed Envelope (Exhibit 1311-B) - Tap to unlock'
              }
            >
              {/* Subtle ambient pulse / red outline & glow */}
              <div
                className={`absolute inset-0 rounded-[4px] border-2 transition-all duration-300 pointer-events-none ${
                  hoveredObject === 'envelope'
                    ? unlocked
                      ? 'border-emerald-400 bg-emerald-950/25 shadow-[0_0_30px_rgba(52,211,153,0.85)] scale-102'
                      : 'border-[#DE3B4C] bg-red-950/25 shadow-[0_0_30px_rgba(222,59,76,0.85)] scale-102'
                    : unlocked
                    ? 'border-emerald-500/50 shadow-[0_0_12px_rgba(52,211,153,0.4)] animate-pulse'
                    : 'border-[#DE3B4C]/40 hover:border-[#DE3B4C] shadow-[0_0_12px_rgba(222,59,76,0.35)] animate-pulse'
                }`}
              />

              {/* Tactical Camera HUD Reticle Brackets */}
              <span
                className={`absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 pointer-events-none ${
                  unlocked ? 'border-emerald-400' : 'border-[#DE3B4C]'
                }`}
              />
              <span
                className={`absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 pointer-events-none ${
                  unlocked ? 'border-emerald-400' : 'border-[#DE3B4C]'
                }`}
              />
              <span
                className={`absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 pointer-events-none ${
                  unlocked ? 'border-emerald-400' : 'border-[#DE3B4C]'
                }`}
              />
              <span
                className={`absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 pointer-events-none ${
                  unlocked ? 'border-emerald-400' : 'border-[#DE3B4C]'
                }`}
              />

              {/* Floating Tactical Label Tag (Appears on Hover / Always visible on Mobile) */}
              <div
                className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 border px-2.5 py-1 rounded-[2px] font-mono text-[9px] sm:text-[11px] tracking-wider uppercase shadow-xl transition-all duration-200 pointer-events-none ${
                  unlocked
                    ? 'border-emerald-400 text-emerald-200'
                    : 'border-[#DE3B4C] text-[#FFCCD5]'
                } ${
                  hoveredObject === 'envelope'
                    ? 'opacity-100 -translate-y-1'
                    : 'opacity-85 sm:opacity-0'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold">
                  <span>{unlocked ? '🔓' : '🔒'}</span>
                  <span>
                    {unlocked
                      ? 'EXHIBIT 1311-B // UNLOCKED (TAP TO REVEAL)'
                      : 'EXHIBIT 1311-B // SEALED ENVELOPE'}
                  </span>
                </div>
              </div>
            </button>
          </div>
        ) : (
          /* ================= FEED CAM 01: PERIMETER CORRIDOR (USER REFERENCE SCENE) ================= */
          <div className="relative w-full max-w-[177.78vh] aspect-[16/9] max-h-full flex items-center justify-center select-none">
            <img
              src="/assets/aistudio/Security_cam_16886b60.jpg"
              alt="Security surveillance camera of hallway and living room with figure"
              className="w-full h-full object-contain filter contrast-125 brightness-95 grayscale"
            />
            {/* Cam 01 status overlay */}
            <div className="absolute top-4 left-6 bg-black/80 border border-[#DE3B4C]/60 px-3 py-1.5 rounded font-mono text-[10px] sm:text-xs text-[#FF4D5A]">
              <span>CAM 01 // APARTMENT HALLWAY // SUSPECT SIGHTING RECORDED</span>
            </div>
            <div className="absolute bottom-6 right-6">
              <button
                type="button"
                onClick={() => setActiveCam('cam04')}
                className="px-4 py-2 bg-[#8F1320] hover:bg-[#DE3B4C] text-white font-mono text-xs font-bold uppercase rounded tracking-wider shadow-lg cursor-pointer"
              >
                ← Return to Cam 04 (Desk Evidence)
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ================= CCTV FOOTER SURVEILLANCE STATUS ================= */}
      <footer className="relative z-30 p-2 sm:p-2.5 bg-black/85 border-t border-[#8F1320]/40 flex flex-col sm:flex-row items-center justify-between gap-1 font-mono text-[9px] sm:text-[10px] text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="text-[#DE3B4C] font-bold">FOOTAGE STATUS:</span>
          <span>
            {unlocked
              ? 'Exhibit B unsealed. Tap the envelope on the desk to reveal the letter.'
              : 'Interact directly with objects on the wooden desk: Tap Diary to read, tap Envelope to unlock.'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-neutral-500 hidden sm:inline">SIGNAL: 99.8% STABLE</span>
          {!unlocked ? (
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(true)}
              className="text-[#E83B46] hover:underline font-bold"
            >
              [ Enter Cipher Passcode ]
            </button>
          ) : (
            <button
              type="button"
              onClick={onDirectOpenEnvelope}
              className="text-emerald-400 hover:underline font-bold"
            >
              [ Open Unsealed Letter ]
            </button>
          )}
        </div>
      </footer>

      {/* Interactive Diary Modal */}
      <InteractiveDiaryModal
        isOpen={isDiaryOpen}
        onClose={() => setIsDiaryOpen(false)}
        onProceedToUnlock={() => {
          setIsDiaryOpen(false);
          setIsPasswordModalOpen(true);
        }}
        onPageTurnAudio={handleDiaryPageTurnSound}
      />

      {/* Password Prompt Modal */}
      <PasswordUnlockModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onUnlockSuccess={handleUnlockSuccess}
        onOpenDiaryHint={() => {
          setIsPasswordModalOpen(false);
          setIsDiaryOpen(true);
        }}
      />
    </section>
  );
}
