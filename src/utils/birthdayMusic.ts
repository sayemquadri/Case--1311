/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Pure Web Audio API synthesized music box melody for "Happy Birthday to You"
// Self-contained, zero external media dependencies, handles autoplay policies gracefully.

interface Note {
  freq: number;
  duration: number; // in beats
}

const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const F4 = 349.23;
const G4 = 392.0;
const A4 = 440.0;
const B4 = 493.88;
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.25;
const F5 = 698.46;
const G5 = 783.99;

// "Happy Birthday to You" melody notes and beat durations
const MELODY: Note[] = [
  // Happy Birthday to you
  { freq: G4, duration: 0.75 },
  { freq: G4, duration: 0.25 },
  { freq: A4, duration: 1.0 },
  { freq: G4, duration: 1.0 },
  { freq: C5, duration: 1.0 },
  { freq: B4, duration: 2.0 },

  // Happy Birthday to you
  { freq: G4, duration: 0.75 },
  { freq: G4, duration: 0.25 },
  { freq: A4, duration: 1.0 },
  { freq: G4, duration: 1.0 },
  { freq: D5, duration: 1.0 },
  { freq: C5, duration: 2.0 },

  // Happy Birthday dear [Friend]
  { freq: G4, duration: 0.75 },
  { freq: G4, duration: 0.25 },
  { freq: G5, duration: 1.0 },
  { freq: E5, duration: 1.0 },
  { freq: C5, duration: 1.0 },
  { freq: B4, duration: 1.0 },
  { freq: A4, duration: 2.0 },

  // Happy Birthday to you
  { freq: F5, duration: 0.75 },
  { freq: F5, duration: 0.25 },
  { freq: E5, duration: 1.0 },
  { freq: C5, duration: 1.0 },
  { freq: D5, duration: 1.0 },
  { freq: C5, duration: 2.5 },
];

export class BirthdayMusicBox {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private timeoutIds: number[] = [];

  constructor() {
    // Lazily init AudioContext upon user gesture
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public play() {
    this.initCtx();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleMelody();
  }

  public stop() {
    this.timeoutIds.forEach((id) => clearTimeout(id));
    this.timeoutIds = [];
    this.isPlaying = false;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stop();
    } else {
      this.play();
    }
    return !this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private scheduleMelody() {
    if (!this.ctx || !this.isPlaying || this.isMuted) return;

    const tempoBpm = 110;
    const beatDurationMs = (60 / tempoBpm) * 1000;
    let accumulatedTimeMs = 200;

    MELODY.forEach((note) => {
      const noteDelay = accumulatedTimeMs;
      const noteLengthSec = (note.duration * beatDurationMs) / 1000;

      const tid = window.setTimeout(() => {
        if (!this.isPlaying || this.isMuted) return;
        this.playChimeNote(note.freq, noteLengthSec);
      }, noteDelay);

      this.timeoutIds.push(tid);
      accumulatedTimeMs += note.duration * beatDurationMs;
    });

    // Loop after song finishes plus small pause
    const loopTid = window.setTimeout(() => {
      if (this.isPlaying && !this.isMuted) {
        this.scheduleMelody();
      }
    }, accumulatedTimeMs + 1500);

    this.timeoutIds.push(loopTid);
  }

  private playChimeNote(freq: number, durationSec: number) {
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;

      // Primary chime oscillator (sine)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // Delicate overtone (triangle) for music box / celesta sparkle
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      // Gain envelope
      const gainNode = this.ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, now);
      // Soft percussive attack
      gainNode.gain.linearRampToValueAtTime(0.22, now + 0.02);
      // Bell-like exponential decay
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(durationSec * 1.2, 0.4));

      // Secondary overtone gain
      const overtoneGain = this.ctx.createGain();
      overtoneGain.gain.setValueAtTime(0.08, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc1.connect(gainNode);
      osc2.connect(overtoneGain);
      overtoneGain.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + durationSec * 1.5);
      osc2.stop(now + durationSec * 1.5);
    } catch {
      // AudioContext interrupted or not allowed yet
    }
  }
}
