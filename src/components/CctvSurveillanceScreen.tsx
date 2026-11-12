/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { CctvAtmosphereAudio } from '../utils/cctvAudio';
import { InteractiveDiaryModal } from './InteractiveDiaryModal';
import { PasswordUnlockModal } from './PasswordUnlockModal';
import { DetectiveLaren } from './DetectiveLaren';

interface CctvSurveillanceScreenProps {
  onUnlockEnvelopeSuccess: () => void;
  onDirectOpenEnvelope: () => void;
  isEnvelopeUnlocked?: boolean;
}

type CameraId = 'cam01' | 'cam02' | 'cam03' | 'cam04' | 'cam05' | 'cam06';

interface CameraInfo {
  id: CameraId;
  code: string;
  location: string;
  fullName: string;
  src: string;
  hasHotspot?: 'diary' | 'envelope';
}

const CAMERAS: CameraInfo[] = [
  {
    id: 'cam01',
    code: 'CAM 01',
    location: 'MAIN DOOR',
    fullName: 'CAM 01 — MAIN DOOR',
    src: '/assets/cctv/cctv_main_door.jpg',
  },
  {
    id: 'cam02',
    code: 'CAM 02',
    location: 'KITCHEN',
    fullName: 'CAM 02 — KITCHEN',
    src: '/assets/cctv/cctv_kitchen.jpg',
  },
  {
    id: 'cam03',
    code: 'CAM 03',
    location: 'BEDROOM',
    fullName: 'CAM 03 — BEDROOM',
    src: '/assets/aistudio/bed_7c9f4a3e.png',
    hasHotspot: 'diary',
  },
  {
    id: 'cam04',
    code: 'CAM 04',
    location: 'LIVING ROOM',
    fullName: 'CAM 04 — LIVING ROOM',
    src: '/assets/aistudio/liv_a2158ad5.png',
    hasHotspot: 'envelope',
  },
  {
    id: 'cam05',
    code: 'CAM 05',
    location: 'BACKYARD',
    fullName: 'CAM 05 — BACKYARD',
    src: '/assets/cctv/cctv_backyard.jpg',
  },
  {
    id: 'cam06',
    code: 'CAM 06',
    location: 'THREAT',
    fullName: 'CAM 06 — THREAT',
    src: '/assets/cctv/cctv_threat.jpg',
  },
];

export function CctvSurveillanceScreen({
  onUnlockEnvelopeSuccess,
  onDirectOpenEnvelope,
  isEnvelopeUnlocked = false,
}: CctvSurveillanceScreenProps) {
  // Startup sequence: 'black' -> 'startup' -> 'ready'
  const [startupStage, setStartupStage] = useState<'black' | 'startup' | 'ready'>('black');
  const [selectedCamId, setSelectedCamId] = useState<CameraId | null>(null);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [isAudioRunning, setIsAudioRunning] = useState<boolean>(false);
  const [isDiaryOpen, setIsDiaryOpen] = useState<boolean>(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [unlocked, setUnlocked] = useState<boolean>(isEnvelopeUnlocked);
  const [isFlickering, setIsFlickering] = useState<boolean>(false);
  const [hotspotHovered, setHotspotHovered] = useState<'diary' | 'envelope' | null>(null);

  // Detective Laren persistent guide state
  const [isLarenIntroOpen, setIsLarenIntroOpen] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('case1311_laren_intro') !== 'seen';
    } catch {
      return true;
    }
  });
  const [hasTappedLockedEnvelope, setHasTappedLockedEnvelope] = useState<boolean>(false);

  const handleDismissLarenIntro = () => {
    setIsLarenIntroOpen(false);
    try {
      sessionStorage.setItem('case1311_laren_intro', 'seen');
    } catch {
      // ignore
    }
  };

  const audioRef = useRef<CctvAtmosphereAudio | null>(null);

  // Initialize atmospheric sound
  useEffect(() => {
    audioRef.current = new CctvAtmosphereAudio();
    return () => {
      audioRef.current?.stop();
    };
  }, []);

  // CCTV Startup Transition Effect
  useEffect(() => {
    const t1 = setTimeout(() => {
      setStartupStage('startup');
    }, 180);

    const t2 = setTimeout(() => {
      setStartupStage('ready');
    }, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Live ticking surveillance timestamp (e.g., 13 NOV 2026  11:47:32 PM)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const day = now.getDate().toString().padStart(2, '0');
      const month = months[now.getMonth()];
      const year = now.getFullYear();

      let hours = now.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const hoursStr = hours.toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      setCurrentTimeStr(`${day} ${month} ${year}  ${hoursStr}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subtle tape flicker / scanline perturbation
  useEffect(() => {
    const triggerFlicker = () => {
      setIsFlickering(true);
      setTimeout(() => setIsFlickering(false), 80 + Math.random() * 90);
    };

    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.45) {
        triggerFlicker();
      }
    }, 4200);

    return () => clearInterval(flickerInterval);
  }, []);

  // Handle ambient sound start on first user interaction
  const handleUserInteractionSound = () => {
    if (audioRef.current && !isAudioRunning) {
      audioRef.current.start();
      setIsAudioRunning(true);
    }
  };

  const handleOpenDiary = () => {
    handleUserInteractionSound();
    audioRef.current?.playPaperTurn();
    setIsDiaryOpen(true);
  };

  const handleDiaryPageTurnSound = () => {
    audioRef.current?.playPaperTurn();
  };

  const handleEnvelopeClick = () => {
    handleUserInteractionSound();
    if (unlocked) {
      audioRef.current?.playSealCrack();
      onDirectOpenEnvelope();
    } else {
      setHasTappedLockedEnvelope(true);
      setIsPasswordModalOpen(true);
    }
  };

  const handleUnlockSuccess = () => {
    setUnlocked(true);
    setIsPasswordModalOpen(false);
    audioRef.current?.playSealCrack();
    onUnlockEnvelopeSuccess();
  };

  // Contextual dialogue for Detective Laren
  const getLarenDialogue = (): string => {
    if (isPasswordModalOpen || (selectedCamId === 'cam04' && hasTappedLockedEnvelope && !unlocked)) {
      return "The password SHOULD be in the diary! Let's go back and check the final entry.";
    }
    if (selectedCamId === 'cam03') {
      return "finally we found the diary! Interesting, we should read it, tap into it!";
    }
    if (selectedCamId === 'cam04') {
      return "Ohh an envelope? You should check it out by tapping on it";
    }
    return "You can check all the cameras if u tap on it";
  };

  const selectedCamera = CAMERAS.find((c) => c.id === selectedCamId);

  // Transition: Black screen & Startup effect
  if (startupStage !== 'ready') {
    return (
      <section
        className="relative w-screen h-[100dvh] bg-[#000000] flex flex-col items-center justify-center select-none overflow-hidden"
        onClick={() => {
          handleUserInteractionSound();
          setStartupStage('ready');
        }}
        aria-label="CCTV Startup"
      >
        {startupStage === 'startup' && (
          <div className="flex flex-col items-center gap-3 font-mono text-xs tracking-widest text-[#E83B46] animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E83B46] animate-ping" />
              <span>CCTV MATRIX 1311 // SYSTEM BOOT</span>
            </div>
            <div className="text-[10px] text-neutral-400">INITIALIZING CAMERA HUBS [6/6]...</div>
            <div className="w-48 h-1 bg-[#8F1320]/30 rounded overflow-hidden">
              <div className="w-full h-full bg-[#E83B46] animate-[pulse_0.6s_ease-in-out_infinite]" />
            </div>
          </div>
        )}

        {/* Scanlines on startup */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0,0,0,0.8) 0px, rgba(0,0,0,0.8) 1px, transparent 1px, transparent 3px)',
          }}
        />
      </section>
    );
  }

  return (
    <section
      data-testid="cctv-surveillance-screen"
      onClick={handleUserInteractionSound}
      onTouchStart={handleUserInteractionSound}
      className="relative w-screen h-[100dvh] bg-[#050505] text-neutral-200 overflow-hidden flex flex-col justify-between select-none"
      aria-label="CCTV Surveillance Control Room"
    >
      {/* Dynamic CRT Scanlines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-15"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* Subtle Grain / Film Noise Filter */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-15 mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 10%, transparent 11%)`,
          backgroundSize: '4px 4px',
        }}
      />

      {/* Occasional Camera Glitch Line / Flicker */}
      {isFlickering && (
        <div className="absolute inset-0 z-30 pointer-events-none bg-white/5 backdrop-contrast-150 backdrop-brightness-125">
          <div
            className="w-full h-1.5 bg-white/20 absolute"
            style={{ top: `${Math.random() * 85}%` }}
          />
        </div>
      )}

      {/* Surveillance Camera Outer Frame Border & Subtle Vignette */}
      <div className="absolute inset-0 pointer-events-none z-20 border-[3px] sm:border-[6px] border-black/80 shadow-[inset_0_0_50px_rgba(0,0,0,0.65)]" />

      {/* ================= TOP HUD: Essential Navigation, Single REC, Single Timestamp ================= */}
      <header className="relative z-30 px-2.5 py-1.5 sm:px-4 sm:py-2 flex items-center justify-between font-mono text-xs tracking-wider text-[#E83B46] bg-black/85 backdrop-blur-md border-b border-[#8F1320]/40 shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          {selectedCamId !== null ? (
            <button
              type="button"
              data-testid="back-to-cameras-button"
              onClick={() => setSelectedCamId(null)}
              className="flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#8F1320]/25 hover:bg-[#8F1320]/50 border border-[#8F1320] text-[#FFCCD5] rounded-[2px] transition-colors cursor-pointer text-[10px] sm:text-xs font-bold"
            >
              <span>←</span>
              <span>ALL CAMERAS</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 font-bold tracking-[0.2em] text-[#FF4D5A]">
              <span className="w-2 h-2 rounded-full bg-[#E83B46] animate-ping" />
              <span>● REC</span>
            </div>
          )}

          {selectedCamId !== null && (
            <div className="flex items-center gap-1.5 font-bold tracking-wider text-[#FF4D5A]">
              <span className="w-2 h-2 rounded-full bg-[#E83B46] animate-ping" />
              <span>● REC</span>
            </div>
          )}
        </div>

        {/* Single Clean Timestamp in Top Bar */}
        <div className="flex items-center">
          <span className="font-mono text-[10px] sm:text-xs text-neutral-300 font-bold tracking-wider">
            {currentTimeStr || '13 NOV 2026  11:47:32 PM'}
          </span>
        </div>
      </header>

      {/* ================= MAIN CONTENT: GRID OR FULL-SCREEN CAMERA ================= */}
      <main className="relative flex-1 min-h-0 w-full flex flex-col items-center justify-center overflow-hidden p-1 sm:p-2.5">
        {selectedCamId === null ? (
          /* ================= 1. CAMERA SELECTION VIEW (2-column x 3-row layout occupying almost entire viewport) ================= */
          <div className="w-full h-full flex flex-col justify-between max-w-4xl mx-auto flex-1 min-h-0">
            {/* Slim Heading Bar */}
            <div className="w-full flex items-center justify-between px-1 mb-1 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#E83B46] rounded-full" />
                <h1 className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#FF4D5A] uppercase font-bold">
                  SELECT CAMERA FEED [6/6]
                </h1>
              </div>
              <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest hidden sm:inline">
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>

            {/* 2-Column x 3-Row Grid Occupying Full Available Screen Height */}
            <div className="w-full grid grid-cols-2 grid-rows-3 gap-1.5 sm:gap-2 flex-1 min-h-0">
              {CAMERAS.map((cam) => (
                <button
                  key={cam.id}
                  type="button"
                  data-testid={`camera-card-${cam.id}`}
                  onClick={() => {
                    handleUserInteractionSound();
                    setSelectedCamId(cam.id);
                  }}
                  className="group relative w-full h-full min-h-0 bg-black rounded-[2px] overflow-hidden border border-[#8F1320]/40 hover:border-[#E83B46] focus:border-[#E83B46] focus:outline-none transition-all duration-200 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.8)] text-left flex flex-col"
                >
                  {/* Camera Footage Snapshot */}
                  <img
                    src={cam.src}
                    alt={cam.fullName}
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02] ${
                      cam.id === 'cam03' || cam.id === 'cam04'
                        ? 'brightness-110 contrast-100 saturate-105'
                        : 'filter contrast-125 brightness-95 grayscale'
                    }`}
                    loading="eager"
                  />

                  {/* Corner Surveillance Brackets */}
                  <span className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-white/60 pointer-events-none" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-white/60 pointer-events-none" />
                  <span className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-white/60 pointer-events-none" />
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-white/60 pointer-events-none" />

                  {/* Scanlines inside preview */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 2px)',
                    }}
                  />

                  {/* Special Camera Subtle Glowing Highlights in Preview */}
                  {cam.id === 'cam03' && (
                    <div
                      className="absolute rounded-full bg-red-500/50 shadow-[0_0_12px_rgba(239,68,68,0.85)] animate-pulse pointer-events-none"
                      style={{
                        left: '81%',
                        top: '48%',
                        width: '8%',
                        height: '7%',
                      }}
                    />
                  )}
                  {cam.id === 'cam04' && (
                    <div
                      className="absolute rounded-full bg-amber-400/50 shadow-[0_0_14px_rgba(251,191,36,0.85)] animate-pulse pointer-events-none"
                      style={{
                        left: '49%',
                        top: '56%',
                        width: '10%',
                        height: '8%',
                      }}
                    />
                  )}

                  {/* Top Overlay: Camera Label and REC Indicator */}
                  <div className="absolute top-1 inset-x-1.5 flex items-center justify-between font-mono text-[8px] sm:text-[9.5px] text-white tracking-wider pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    <span className="font-bold text-neutral-200 group-hover:text-white truncate max-w-[70%]">
                      {cam.fullName}
                    </span>
                    <span className="text-[#FF4D5A] font-bold flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E83B46] inline-block animate-pulse" />
                      <span>REC</span>
                    </span>
                  </div>

                  {/* Bottom Overlay: Timestamp and [ VIEW ] */}
                  <div className="absolute bottom-1 inset-x-1.5 flex items-center justify-between font-mono text-[7.5px] sm:text-[9px] text-neutral-300 tracking-wider pointer-events-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    <span className="truncate">{currentTimeStr || '13 NOV 2026'}</span>
                    <span className="text-neutral-400 group-hover:text-[#FFCCD5] transition-colors shrink-0">
                      [ VIEW ]
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ================= 2. INDIVIDUAL CCTV CAMERA VIEW (No overlays blocking image, controls outside) ================= */
          <div className="w-full max-w-4xl mx-auto flex-1 min-h-0 flex flex-col items-center justify-center py-2 px-1">
            {/* Camera Footage Frame (Takes Main Focus) */}
            <div className="relative w-full aspect-[16/9] max-h-[56vh] sm:max-h-[68vh] flex items-center justify-center bg-black rounded-[2px] overflow-hidden border border-[#8F1320]/60 shadow-[0_8px_30px_rgba(0,0,0,0.95)] shrink-0">
              {/* Over footage: Exactly one clean camera label and one timestamp */}
              {selectedCamId !== 'cam03' && selectedCamId !== 'cam04' && (
                <>
                  <div className="absolute top-2.5 left-3 sm:top-3.5 sm:left-4 font-mono text-[10px] sm:text-xs text-white font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] pointer-events-none">
                    {selectedCamera?.fullName}
                  </div>
                  <div className="absolute top-2.5 right-3 sm:top-3.5 sm:right-4 font-mono text-[9px] sm:text-xs text-neutral-300 font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] pointer-events-none">
                    {currentTimeStr}
                  </div>
                </>
              )}

              {/* The Selected Camera Footage Image */}
              <img
                src={selectedCamera?.src}
                alt={selectedCamera?.fullName}
                className={`w-full h-full object-cover select-none ${
                  selectedCamId === 'cam03' || selectedCamId === 'cam04'
                    ? 'brightness-110 contrast-100 saturate-105'
                    : 'filter contrast-125 brightness-95 grayscale'
                }`}
              />

              {/* Corner Surveillance Reticles */}
              <span className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-white/70 pointer-events-none" />
              <span className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-white/70 pointer-events-none" />
              <span className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-white/70 pointer-events-none" />
              <span className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-white/70 pointer-events-none" />

              {/* ================= CAM 03: BEDROOM DIARY HOTSPOT ================= */}
              {selectedCamId === 'cam03' && (
                <button
                  type="button"
                  data-testid="interactive-diary-button"
                  onClick={handleOpenDiary}
                  onMouseEnter={() => setHotspotHovered('diary')}
                  onMouseLeave={() => setHotspotHovered(null)}
                  onFocus={() => setHotspotHovered('diary')}
                  onBlur={() => setHotspotHovered(null)}
                  className="absolute z-30 cursor-pointer rounded-[4px] group focus:outline-none transition-all duration-300"
                  style={{
                    left: '78.5%',
                    top: '45.5%',
                    width: '11%',
                    height: '11.5%',
                  }}
                  aria-label="Interactive Object: Diary resting on the desk - tap to inspect"
                  title="Her Diary - Tap to read"
                >
                  {/* Soft ambient crimson glow halo under the diary */}
                  <div
                    className="absolute -inset-2.5 rounded-lg bg-red-600/35 blur-md pointer-events-none animate-[pulse_3s_ease-in-out_infinite]"
                    aria-hidden="true"
                  />

                  {/* Subtle Crimson Glow on Diary */}
                  <div
                    className={`absolute inset-0 rounded-[2px] transition-all duration-300 pointer-events-none ${
                      hotspotHovered === 'diary'
                        ? 'border border-[#FF3B4E] bg-red-950/20 shadow-[0_0_24px_rgba(255,59,78,0.95)] scale-105'
                        : 'border border-[#FF3B4E]/60 shadow-[0_0_16px_rgba(255,59,78,0.65)] animate-pulse'
                    }`}
                  />

                  {/* Tactical Reticle Brackets */}
                  <span className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#DE3B4C] pointer-events-none" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#DE3B4C] pointer-events-none" />
                  <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#DE3B4C] pointer-events-none" />
                  <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#DE3B4C] pointer-events-none" />

                  {/* Floating Tag */}
                  <div
                    className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 border border-[#DE3B4C] text-[#FFCCD5] px-2 py-0.5 rounded-[2px] font-mono text-[8px] sm:text-[10px] tracking-wider uppercase shadow-xl transition-all duration-200 pointer-events-none ${
                      hotspotHovered === 'diary' ? 'opacity-100 -translate-y-1' : 'opacity-90 sm:opacity-0'
                    }`}
                  >
                    <div className="flex items-center gap-1 font-bold">
                      <span className="text-[#DE3B4C]">▸</span>
                      <span>DIARY</span>
                    </div>
                  </div>
                </button>
              )}

              {/* ================= CAM 04: LIVING ROOM ENVELOPE HOTSPOT ================= */}
              {selectedCamId === 'cam04' && (
                <button
                  type="button"
                  data-testid="interactive-envelope-button"
                  onClick={handleEnvelopeClick}
                  onMouseEnter={() => setHotspotHovered('envelope')}
                  onMouseLeave={() => setHotspotHovered(null)}
                  onFocus={() => setHotspotHovered('envelope')}
                  onBlur={() => setHotspotHovered(null)}
                  className="absolute z-30 cursor-pointer rounded-[4px] group focus:outline-none transition-all duration-300"
                  style={{
                    left: '45%',
                    top: '53%',
                    width: '12.5%',
                    height: '11.5%',
                  }}
                  aria-label={
                    unlocked
                      ? 'Interactive Object: Unlocked Dossier Envelope - tap to open'
                      : 'Interactive Object: Sealed Antique Envelope with wax seal - tap to unlock'
                  }
                  title={unlocked ? 'Unlocked Envelope - Tap to open' : 'Sealed Envelope - Tap to unlock'}
                >
                  {/* Soft ambient warm golden/amber glow halo under the envelope */}
                  <div
                    className={`absolute -inset-2.5 rounded-lg blur-md pointer-events-none animate-[pulse_3s_ease-in-out_infinite] ${
                      unlocked ? 'bg-emerald-500/35' : 'bg-amber-500/30'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Subtle Highlight Outline */}
                  <div
                    className={`absolute inset-0 rounded-[2px] transition-all duration-300 pointer-events-none ${
                      hotspotHovered === 'envelope'
                        ? unlocked
                          ? 'border border-emerald-400 bg-emerald-950/20 shadow-[0_0_24px_rgba(52,211,153,0.95)] scale-105'
                          : 'border border-[#FF3B4E] bg-red-950/20 shadow-[0_0_24px_rgba(255,59,78,0.95)] scale-105'
                        : unlocked
                        ? 'border border-emerald-400/70 shadow-[0_0_16px_rgba(52,211,153,0.6)] animate-pulse'
                        : 'border border-[#FF3B4E]/60 shadow-[0_0_16px_rgba(255,59,78,0.6)] animate-pulse'
                    }`}
                  />

                  {/* Tactical Reticle Brackets */}
                  <span
                    className={`absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 pointer-events-none ${
                      unlocked ? 'border-emerald-400' : 'border-[#DE3B4C]'
                    }`}
                  />
                  <span
                    className={`absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 pointer-events-none ${
                      unlocked ? 'border-emerald-400' : 'border-[#DE3B4C]'
                    }`}
                  />
                  <span
                    className={`absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 pointer-events-none ${
                      unlocked ? 'border-emerald-400' : 'border-[#DE3B4C]'
                    }`}
                  />
                  <span
                    className={`absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 pointer-events-none ${
                      unlocked ? 'border-emerald-400' : 'border-[#DE3B4C]'
                    }`}
                  />

                  {/* Floating Tag */}
                  <div
                    className={`absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 border px-2 py-0.5 rounded-[2px] font-mono text-[8px] sm:text-[10px] tracking-wider uppercase shadow-xl transition-all duration-200 pointer-events-none ${
                      unlocked
                        ? 'border-emerald-400 text-emerald-200'
                        : 'border-[#DE3B4C] text-[#FFCCD5]'
                    } ${
                      hotspotHovered === 'envelope'
                        ? 'opacity-100 -translate-y-1'
                        : 'opacity-90 sm:opacity-0'
                    }`}
                  >
                    <div className="flex items-center gap-1 font-bold">
                      <span>{unlocked ? '🔓' : '🔒'}</span>
                      <span>{unlocked ? 'OPEN ENVELOPE' : 'SEALED ENVELOPE'}</span>
                    </div>
                  </div>
                </button>
              )}
            </div>

            {/* Camera Navigation in a Separate, Compact Area OUTSIDE and BELOW the Footage */}
            <div className="w-full shrink-0 mt-2 sm:mt-3 px-1 flex items-center justify-between gap-1.5 sm:gap-2 z-30">
              <button
                type="button"
                onClick={() => setSelectedCamId(null)}
                className="px-2 sm:px-2.5 py-1 bg-black/85 hover:bg-[#8F1320] text-neutral-200 hover:text-white border border-[#8F1320]/60 rounded-[2px] font-mono text-[9px] sm:text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer shrink-0"
              >
                ← GRID VIEW
              </button>

              <div className="flex items-center gap-1 bg-black/85 p-0.5 sm:p-1 rounded-[2px] border border-[#8F1320]/40 overflow-x-auto max-w-[75%]">
                {CAMERAS.map((cam) => (
                  <button
                    key={cam.id}
                    type="button"
                    onClick={() => {
                      handleUserInteractionSound();
                      setSelectedCamId(cam.id);
                    }}
                    className={`px-1.5 sm:px-2 py-0.5 font-mono text-[8.5px] sm:text-[10px] rounded-[1px] transition-colors cursor-pointer whitespace-nowrap ${
                      cam.id === selectedCamId
                        ? 'bg-[#8F1320] text-white font-bold'
                        : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {cam.code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= COMPACT FOOTER ================= */}
      <footer className="relative z-30 px-2.5 py-1 sm:px-4 sm:py-1.5 bg-black/90 border-t border-[#8F1320]/40 flex items-center justify-between font-mono text-[8.5px] sm:text-[10px] text-neutral-400 shrink-0">
        <div className="flex items-center gap-1.5 truncate">
          <span className="text-[#DE3B4C] font-bold shrink-0">STATUS:</span>
          <span className="truncate">
            {selectedCamId === null
              ? 'Select any camera feed to investigate.'
              : selectedCamId === 'cam03'
              ? 'CAM 03: Diary located on desk. Tap to inspect.'
              : selectedCamId === 'cam04'
              ? unlocked
                ? 'CAM 04: Envelope unsealed. Tap to open.'
                : 'CAM 04: Sealed envelope on table. Tap to unlock.'
              : `${selectedCamera?.fullName}: Feed online · No active target objects.`}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-neutral-500 hidden sm:inline">SIGNAL: 99.8%</span>
          {selectedCamId === null && (
            <span className="text-[#FF4D5A] font-bold">6 FEEDS</span>
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

      {/* Detective Laren Persistent Interactive Guide (Hidden when PasswordUnlockModal has its own anchored Laren) */}
      {!isPasswordModalOpen && (
        <DetectiveLaren
          dialogueText={getLarenDialogue()}
          isIntroModalOpen={isLarenIntroOpen}
          onDismissIntro={handleDismissLarenIntro}
        />
      )}
    </section>
  );
}
