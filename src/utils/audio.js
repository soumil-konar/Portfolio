// src/utils/audio.js
// Native Web Audio API UI Sound Synthesizer (Zero asset dependencies, <1ms latency)

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    
    // Check localStorage preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_audio_muted');
      this.muted = saved === 'true';
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_audio_muted', this.muted ? 'true' : 'false');
    }
    if (!this.muted) {
      this.playChime(520);
    }
    return this.muted;
  }

  // Subtle tactile tap for buttons, tabs, and filters
  playClick() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Gracefully ignore audio autoplay restrictions
    }
  }

  // Soft modern harmonic chime for theme change, copy success, or modal open
  playChime(baseFreq = 440) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const freqs = [baseFreq, baseFreq * 1.25, baseFreq * 1.5];
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.03, this.ctx.currentTime + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.05 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + idx * 0.05 + 0.35);
      });
    } catch {
      // Ignore
    }
  }

  // Futuristic power-up tone for the LangGraph agent simulation
  playPowerUp() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {
      // Ignore
    }
  }

  // Subtle typewriter blip for streaming terminal response
  playTypeBlip() {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const f = 1200 + Math.random() * 300;
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, this.ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.02);
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundEngine();
