/**
 * Procedural Web Audio API Sound Engine
 * Generates tactile mechanical clicks, frequency shifts for tree traversals,
 * stack frame push/pop, and synthwave drive engine rev sound fx.
 */

let audioCtx = null;
let isMuted = false;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const SoundEngine = {
  getIsMuted() {
    return isMuted;
  },

  setMuted(muted) {
    isMuted = muted;
    return isMuted;
  },

  toggleMute() {
    isMuted = !isMuted;
    return isMuted;
  },

  // Tactile mechanical key click
  playClick() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio context error fallback
    }
  },

  // Synthwave Drive Engine Acceleration Rev (Muted for silent scroll)
  playDriveRev() {},

  // Push frame onto stack (ascending tone)
  playStackPush(depth = 1) {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const baseFreq = 260 + depth * 45;
      osc.type = 'square';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {}
  },

  // Pop frame off stack (descending tone)
  playStackPop(depth = 1) {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const baseFreq = 480 + depth * 30;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.6, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.11);
    } catch {}
  },

  // Tree node traversal / ping
  playNodeVisit(pitchIndex = 0) {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
      const freq = notes[pitchIndex % notes.length];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {}
  },

  // Big-O Scrubber Blip
  playSliderBlip(valRatio = 0.5) {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const freq = 200 + valRatio * 600;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch {}
  },

  // Algorithm completion fan-fare / chime
  playSuccess() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.26);
      });
    } catch {}
  },

  // Procedural Synthwave Music Generator Fallback
  synthBeatInterval: null,
  startSynthwaveBeat(trackIndex = 0) {
    if (isMuted) return;
    this.stopSynthwaveBeat();
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const scales = [
        [110, 130.81, 146.83, 164.81, 196.00], // A Minor Synth
        [123.47, 146.83, 164.81, 185.00, 220.00], // B Minor Synth
        [130.81, 155.56, 174.61, 196.00, 233.08], // C Minor Outrun
        [98.00, 116.54, 130.81, 146.83, 174.61]   // G Minor Retrowave
      ];
      const scale = scales[trackIndex % scales.length];
      let step = 0;

      this.synthBeatInterval = setInterval(() => {
        if (isMuted) return;
        try {
          const now = ctx.currentTime;
          const bassFreq = scale[step % scale.length];

          // Bass synth pulse
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(bassFreq, now);
          osc.frequency.exponentialRampToValueAtTime(bassFreq * 0.5, now + 0.18);

          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.2);

          // Arpeggiated lead chime on alternate beats
          if (step % 2 === 1) {
            const leadOsc = ctx.createOscillator();
            const leadGain = ctx.createGain();
            leadOsc.type = 'sine';
            leadOsc.frequency.setValueAtTime(bassFreq * 4, now);
            leadGain.gain.setValueAtTime(0.06, now);
            leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

            leadOsc.connect(leadGain);
            leadGain.connect(ctx.destination);
            leadOsc.start(now);
            leadOsc.stop(now + 0.15);
          }

          step = (step + 1) % 16;
        } catch {}
      }, 180);
    } catch {}
  },

  stopSynthwaveBeat() {
    if (this.synthBeatInterval) {
      clearInterval(this.synthBeatInterval);
      this.synthBeatInterval = null;
    }
  }
};

