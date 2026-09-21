// Procedural Web Audio Synthesizer for Mystical Horoscope Board
// Generates all cosmic sounds natively without relying on external audio files

class MysticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.droneGain = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.isDronePlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.droneGain && this.ctx) {
      this.droneGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    } else if (!this.isMuted && this.droneGain && this.ctx && this.isDronePlaying) {
      this.droneGain.gain.setTargetAtTime(0.04, this.ctx.currentTime, 0.3);
    }
    return this.isMuted;
  }

  startCosmicDrone() {
    this.init();
    if (!this.ctx || this.isDronePlaying) return;
    try {
      const now = this.ctx.currentTime;
      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, now);
      if (!this.isMuted) {
        this.droneGain.gain.exponentialRampToValueAtTime(0.035, now + 3);
      }

      // Deep root 432Hz harmonic base (A1 ~ 54Hz, E2 ~ 81Hz)
      this.droneOsc1 = this.ctx.createOscillator();
      this.droneOsc1.type = 'sine';
      this.droneOsc1.frequency.setValueAtTime(54, now);

      this.droneOsc2 = this.ctx.createOscillator();
      this.droneOsc2.type = 'triangle';
      this.droneOsc2.frequency.setValueAtTime(81, now);

      // Soft low-pass filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);

      this.droneOsc1.connect(filter);
      this.droneOsc2.connect(filter);
      filter.connect(this.droneGain);
      this.droneGain.connect(this.ctx.destination);

      this.droneOsc1.start();
      this.droneOsc2.start();
      this.isDronePlaying = true;
    } catch (e) {
      console.warn("Could not start cosmic drone:", e);
    }
  }

  // Celestial chime for fortune / prophecy revelation
  playCelestialChime(scaleIndex = 0) {
    this.init();
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      // Ancient Phrygian Dominant or Mystical Pentatonic frequencies
      const baseFreqs = [528, 639, 741, 852, 963, 1056]; // Solfeggio healing/mystic harmonics
      const freq = baseFreqs[scaleIndex % baseFreqs.length] || 528;

      // Bell fundamental
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Shimmering overtone
      const overtone = this.ctx.createOscillator();
      const overtoneGain = this.ctx.createGain();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * 2.76, now); // Bell harmonic ratio

      // Envelopes
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      overtoneGain.gain.setValueAtTime(0.07, now);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      overtone.connect(overtoneGain);
      gain.connect(this.ctx.destination);
      overtoneGain.connect(this.ctx.destination);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + 2.3);
      overtone.stop(now + 1.3);
    } catch {
      // Audio autoplay policy or error
    }
  }

  // Astrolabe rotation sweep sound
  playAstralRotation(velocity = 1) {
    this.init();
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      const speed = Math.min(Math.max(Math.abs(velocity), 0.5), 3);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220 * speed, now);
      osc.frequency.exponentialRampToValueAtTime(440 * speed, now + 0.15);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(350, now);
      filter.Q.setValueAtTime(3, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {}
  }

  // Spell cast explosion / trigger
  playSpellCast(spellType = 'pinch') {
    this.init();
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (spellType === 'pinch' || spellType === 'prophecy') {
        // High sparkle arpeggio
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(432, now);
        osc1.frequency.exponentialRampToValueAtTime(864, now + 0.1);
        osc1.frequency.exponentialRampToValueAtTime(1296, now + 0.25);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(648, now);
        osc2.frequency.exponentialRampToValueAtTime(1728, now + 0.35);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      } else if (spellType === 'flare' || spellType === 'palm') {
        // Ethereal celestial bloom
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(432, now);
        osc1.frequency.exponentialRampToValueAtTime(576, now + 0.35);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(648, now);
        osc2.frequency.exponentialRampToValueAtTime(864, now + 0.4);

        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.75);
        osc2.stop(now + 0.75);
        return;
      } else if (spellType === 'element') {
        // Double harmony tone for transmutation
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(528, now);
        osc1.frequency.exponentialRampToValueAtTime(792, now + 0.2);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(396, now);
        osc2.frequency.exponentialRampToValueAtTime(594, now + 0.2);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      } else {
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(440, now);
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      }

      osc1.connect(gain);
      if (osc2) osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      if (osc2) osc2.start(now);
      osc1.stop(now + 0.85);
      if (osc2) osc2.stop(now + 0.85);
    } catch {}
  }

  // Constellation ignition chime on hover
  playNodeIgnite() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  }
  // Tarot card draw bell chime
  playTarotDraw() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.3); // A5

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now); // A5
      osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.3); // D6

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.45);
      osc2.stop(now + 1.45);
    } catch {}
  }

  // Divination Rune stone cast resonance
  playRuneCast() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {}
  }

  // 100-Sided Fate Dice roll clatter & triumph resolution
  playDiceRoll() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    try {
      const now = this.ctx.currentTime;
      // 5 rapid cascading dice clicks
      for (let i = 0; i < 5; i++) {
        const clickOsc = this.ctx.createOscillator();
        const clickGain = this.ctx.createGain();
        const t = now + i * 0.07;

        clickOsc.type = 'square';
        clickOsc.frequency.setValueAtTime(400 + Math.random() * 500, t);
        clickGain.gain.setValueAtTime(0.05, t);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);

        clickOsc.connect(clickGain);
        clickGain.connect(this.ctx.destination);

        clickOsc.start(t);
        clickOsc.stop(t + 0.05);
      }

      // Final resolution chime
      const resolveTime = now + 0.42;
      const resOsc = this.ctx.createOscillator();
      const resGain = this.ctx.createGain();

      resOsc.type = 'sine';
      resOsc.frequency.setValueAtTime(659.25, resolveTime); // E5
      resOsc.frequency.exponentialRampToValueAtTime(1318.5, resolveTime + 0.25); // E6

      resGain.gain.setValueAtTime(0.14, resolveTime);
      resGain.gain.exponentialRampToValueAtTime(0.0001, resolveTime + 1.2);

      resOsc.connect(resGain);
      resGain.connect(this.ctx.destination);

      resOsc.start(resolveTime);
      resOsc.stop(resolveTime + 1.25);
    } catch {}
  }
}

export const mysticAudio = new MysticAudioEngine();
