# Walkthrough: Zodiac Fortune Board Case Study & Portfolio Rebranding

The **Zodiac Fortune Board Case Study** has been completely restructured and rewritten as an in-depth, flowing technical blog post focusing deeply on **build choices**, **architectural building blocks**, **hand gesture computer vision tech**, and **procedural Web Audio synthesis**, while strictly adhering to the [/2026/index.html](file:///c:/Users/zqhwe/OneDrive/Desktop/Art/portfolio-git/portfolio/2026/index.html) visual branding.

---

## 1. Flowing Technical Blog Post Structure

The case study at [portfolio/new_projects/zodiac-fortune-board/case-study.html](file:///c:/Users/zqhwe/OneDrive/Desktop/Art/portfolio-git/portfolio/new_projects/zodiac-fortune-board/case-study.html) now reads as a cohesive engineering journal article (*"Building an Eldritch Astrolabe: Computer Vision, Sacred Geometry & Procedural Audio"*), structured into 5 progressive sections:

### Section 1: Build Choices & Core Constraints
- **Zero-Cloud Privacy & Latency**: Why webcam frames must run 100% client-side via WebAssembly without external cloud ML APIs or data transmission.
- **The Decision Against Heavy 3D Engines**: Why we avoided bundling Three.js or Babylon.js (saving 600KB–1.5MB of gzipped bundle weight and battery drain), replacing it with hardware-accelerated CSS 3D transforms, double-buffered 2D canvas, and mathematical SVG geometry.
- **React 19 & Vite 8 Core**: Fast declarative state management for the multi-stage divination flow and sub-200ms production builds.

### Section 2: Building Blocks: Sacred Geometry & Horology
- **Polar Coordinate Trigonometry**: Mathematical mapping of the 12 constellation houses around a 360° circle using `x = 50 + r * cos(θ)`, `y = 50 + r * sin(θ)`.
- **Dynamic SVG Aspect Chords**: Real-time astrological Trine (120° angles, 4 signs apart) and Opposition (180° angles, 6 signs apart) line geometry that pulses during celestial spells.
- **Zenith Alignment & Tactile Snapping**: Calculating the high-noon sign via `normalizedAngle = (-rotation % 360 + 360) % 360` with procedural mechanical tick audio on each 30° house crossing.
- **Altar Tablet & Cartomancy Layers**: Tactile parchment styling, Major Arcana tarot card rendering, and Witches' elder rune triads (Past, Present, Outcome).

### Section 3: Hand Gesture Code Tech: From Pixels to Arcane Spells
- **Decoupled RequestAnimationFrame Engine**: Running the browser UI at 60 FPS while throttling heavier MediaPipe neural inference to ~30 FPS (32ms interval) using strictly monotonic timestamps, storing 21 landmarks in React refs to eliminate state re-render thrashing.
- **5 Discrete Gesture Classifiers**: Dual-ratio geometric joint distance formulas comparing MCP, PIP, and fingertip distances relative to the wrist root:
  - `☝️ Pointing` (atan2 angular velocity compass spin)
  - `✊ Clenched Fist` (3-second hold lock engine)
  - `✌️ Peace / V-Sign` (Destiny covenant horoscope)
  - `✋ Open Palm` (Major Arcana Tarot draw)
  - `🤘 Mystic Horns` (Witches' Three Elder Runes cast)
- **The 3-Second Fist Hold Lock Architecture**: Solving accidental pointer drift by requiring a continuous 3000ms clenched fist hold with radial SVG countdown HUD (`3.0s` down to `0.0s`), early release cancellation, rotational locking, and prominent visual expansion (`@keyframes selectedBeaconWave` + `👑 SELECTED` badge).

### Section 4: Procedural Web Audio: 100% Native Synthesis
- **Zero Audio Files Overhead**: Completely eliminating external MP3/WAV assets (0 KB download footprint, 0ms audio fetch delay).
- **432Hz Sub-Bass Cosmic Drone**: Dual oscillators (Sine A1 at 54Hz + Triangle E2 at 81Hz) routed through an active 140Hz low-pass BiquadFilter.
- **Solfeggio Harmonic Bell Synthesis**: Chimes based on healing frequencies (528Hz, 639Hz, 741Hz, 852Hz, 963Hz) using an acoustic bell overtone ratio (`frequency * 2.76`) with exponential gain decay.
- **Velocity-Modulated Angular Sweeps**: Dynamic bandpass filter (`Q = 3, center = 350Hz`) driven by instantaneous rotational speed deltas.
- **Stochastic Rune & Dice Audio**: Cascading 5-hit randomized square-wave bursts resolving into high-register sine chimes (E5 to E6).

### Section 5: Lessons Learned & Architectural Takeaways
- Balancing spatial gesture intuition with deliberate hold patterns to prevent accidental triggers.
- The power of client-side procedural synthesis for zero-overhead, physics-reactive soundscapes.
- Production readiness of local on-device WebAssembly/WebGPU machine learning vision.

---

## 2. Branding & Verification Details

- **Visual Language**: Obsidian black `#000`, amber `--amber: #F5A623`, red-orange `--red-orange: #E8442A`, `.accent-line` headers, JetBrains Mono code snippets, sticky `ZH // <span>CASE STUDY</span>` nav, and fixed `.btn-projects` portfolio button.
- **Secret Unlinked Slug Constraint**: Confirmed that `case-study.html` has **ZERO inbound links** from `index.html` or `App.jsx`.
- **Build Synchronization**: Executed `npm run build` in `portfolio/new_projects/zodiac-fortune-board/`, successfully syncing the updated `case-study.html` to `dist/case-study.html`.
