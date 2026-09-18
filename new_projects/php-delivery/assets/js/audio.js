/**
 * Procedural Web Audio Synthesizer for Kitchen Order Notifications
 */

let audioCtx = null;
let isMuted = false;

function getContext() {
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

window.KitchenAudio = {
  isMuted() {
    return isMuted;
  },
  toggleMute() {
    isMuted = !isMuted;
    const btn = document.getElementById('sfx-toggle-btn');
    if (btn) {
      btn.innerText = isMuted ? 'SFX OFF' : 'SFX ON';
    }
    return isMuted;
  },

  // Generic procedural tone
  playTone(freq = 440, type = 'sine', duration = 0.1, gainVal = 0.1) {
    if (isMuted) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration + 0.01);
    } catch {}
  },

  // Mechanical UI button click
  playClick() {
    this.playTone(180, 'triangle', 0.04, 0.08);
  },

  // Kitchen stage advance chime
  playStageChime(stageNum = 1) {
    if (isMuted) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const baseFreq = 440 + stageNum * 80;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.25, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {}
  },

  playStageAdvance(stageNum = 1) {
    this.playStageChime(stageNum);
  },

  // Order Fired / Placed Chime
  playOrderPlaced() {
    if (isMuted) return;
    try {
      const ctx = getContext();
      if (!ctx) return;
      const notes = [392.00, 523.25, 659.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.08;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.29);
      });
    } catch {}
  },

  // Order Ready on Counter Fanfare
  playOrderReadyFanfare() {
    if (isMuted) return;
    try {
      const ctx = getContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.09;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.14, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.46);
      });
    } catch {}
  },

  playReadyAlert() {
    this.playOrderReadyFanfare();
  }
};
