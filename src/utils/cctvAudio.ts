/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio API generator for surveillance room ambient hum, VHS tape hiss, and tactile clicks.
// Zero external audio dependencies, safe for all browsers, graceful autoplay policy handling.

export class CctvAtmosphereAudio {
  private ctx: AudioContext | null = null;
  private isRunning = false;
  private humGain: GainNode | null = null;
  private hissGain: GainNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private humOsc: OscillatorNode | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public start() {
    if (this.isRunning) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      this.isRunning = true;
      const now = this.ctx.currentTime;

      // 1. Low 60Hz electromagnetic monitor / transformer hum
      this.humOsc = this.ctx.createOscillator();
      this.humOsc.type = 'sawtooth';
      this.humOsc.frequency.setValueAtTime(58, now);

      const humFilter = this.ctx.createBiquadFilter();
      humFilter.type = 'lowpass';
      humFilter.frequency.setValueAtTime(140, now);

      this.humGain = this.ctx.createGain();
      this.humGain.gain.setValueAtTime(0.001, now);
      this.humGain.gain.exponentialRampToValueAtTime(0.035, now + 1.2);

      this.humOsc.connect(humFilter);
      humFilter.connect(this.humGain);
      this.humGain.connect(this.ctx.destination);
      this.humOsc.start(now);

      // 2. Continuous tape/CRT white noise hiss with bandpass
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      this.noiseSource = this.ctx.createBufferSource();
      this.noiseSource.buffer = noiseBuffer;
      this.noiseSource.loop = true;

      const hissFilter = this.ctx.createBiquadFilter();
      hissFilter.type = 'bandpass';
      hissFilter.frequency.setValueAtTime(1800, now);
      hissFilter.Q.setValueAtTime(1.8, now);

      this.hissGain = this.ctx.createGain();
      this.hissGain.gain.setValueAtTime(0.001, now);
      this.hissGain.gain.exponentialRampToValueAtTime(0.02, now + 1.5);

      this.noiseSource.connect(hissFilter);
      hissFilter.connect(this.hissGain);
      this.hissGain.connect(this.ctx.destination);
      this.noiseSource.start(now);
    } catch {
      // AudioContext blocked by browser policy until user interaction
    }
  }

  public stop() {
    if (!this.ctx || !this.isRunning) return;
    try {
      const now = this.ctx.currentTime;
      if (this.humGain) {
        this.humGain.gain.linearRampToValueAtTime(0.0001, now + 0.3);
      }
      if (this.hissGain) {
        this.hissGain.gain.linearRampToValueAtTime(0.0001, now + 0.3);
      }
      setTimeout(() => {
        try {
          this.humOsc?.stop();
          this.noiseSource?.stop();
        } catch {}
        this.isRunning = false;
      }, 350);
    } catch {
      this.isRunning = false;
    }
  }

  public playPaperTurn() {
    this.initCtx();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch {}
  }

  public playSealCrack() {
    this.initCtx();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }
}
