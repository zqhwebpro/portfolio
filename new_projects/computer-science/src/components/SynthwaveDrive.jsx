import React, { useState, useEffect, useRef } from 'react';
import { SoundEngine } from '../utils/soundEngine';
import { RearviewMirror } from './RearviewMirror';
import { WaveformVisualizer } from './WaveformVisualizer';
import { SpotifyRadio } from './SpotifyRadio';
import { Sparkles, X, Flame } from 'lucide-react';

const AFFIRMATIONS = [
  "YOU ARE UNSTOPPABLE. KEEP PUSHING FORWARD.",
  "CODE IS CREATIVITY IN MOTION. DESIGN YOUR FUTURE.",
  "EVERY SCROLL BRINGS YOU CLOSER TO MASTERY.",
  "GREATNESS IS CREATED ONE STEP AT A TIME.",
  "THE HORIZON BELONGS TO THOSE WHO DARE TO DRIVE.",
  "INNOVATION LIVES AT THE EDGE OF FREEDOM.",
  "FOCUS ON THE JOURNEY. RESULTS WILL FOLLOW.",
  "YOUR POTENTIAL IS INFINITE. RIDE THE NEON WAVE.",
  "PERSISTENCE MASTERS EVERY ALGORITHM.",
  "SYNTHESIZE YOUR IDEAS INTO REALITY.",
  "YOUR LOGIC SHINES BRIGHTER THAN A NEON SUNRISE.",
  "THE DIGITAL GRID EXPANDS WITH YOUR VISION.",
  "YOU ARE BENDING REALITY WITH EVERY LINE OF CODE.",
  "KEEP DRIVING. THE FUTURE IS CRAFTED BY YOU.",
  "MASTER THE FUNDAMENTALS, COMMAND ANY LANGUAGE."
];

export function SynthwaveDrive() {
  const canvasRef = useRef(null);

  // Infinite Scroll & Affirmation Mechanics
  const [totalScrolls, setTotalScrolls] = useState(0);
  const [speedMph, setSpeedMph] = useState(0);
  const [activeAffirmation, setActiveAffirmation] = useState(null); // { id, text, number }
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const speedRef = useRef(0);
  const offsetRef = useRef(0);
  const totalScrollsRef = useRef(0);
  const nextThresholdRef = useRef(() => Math.floor(Math.random() * 41) + 10);
  const milestoneCountRef = useRef(0);
  const speedLinesRef = useRef([]);

  totalScrollsRef.current = totalScrolls;

  // Initialize Speed Lines
  useEffect(() => {
    const lines = [];
    for (let i = 0; i < 70; i++) {
      lines.push({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: Math.random() * 1000 + 10,
        len: Math.random() * 45 + 20,
        speed: Math.random() * 6 + 10
      });
    }
    speedLinesRef.current = lines;
  }, []);

  // Handle Wheel / Scroll Interaction (Infinite Scroll, Never Stops)
  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 0) {
        e.preventDefault();

        // Accelerate smooth speed
        speedRef.current = Math.min(280, speedRef.current + 35);
        setSpeedMph(Math.round(speedRef.current));
        SoundEngine.playDriveRev(speedRef.current / 280);

        setTotalScrolls((prev) => {
          const nextScroll = prev + 1;

          // Check if random threshold (10-50 scrolls away) reached
          if (nextScroll >= nextThresholdRef.current) {
            milestoneCountRef.current += 1;
            const randomAff = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
            
            setActiveAffirmation({
              id: Date.now(),
              text: randomAff,
              number: milestoneCountRef.current
            });

            SoundEngine.playSuccess();

            // Set next random threshold 10 to 50 scrolls away
            const nextStep = Math.floor(Math.random() * 41) + 10;
            nextThresholdRef.current = nextScroll + nextStep;
          }

          return nextScroll;
        });
      }
    };

    const container = document.getElementById('synthwave-drive-viewport');
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Auto-dismiss floating affirmation toast after 5.5 seconds
  useEffect(() => {
    if (!activeAffirmation) return;
    const timer = setTimeout(() => {
      setActiveAffirmation(null);
    }, 5500);
    return () => clearTimeout(timer);
  }, [activeAffirmation]);

  // Canvas 3D Perspective Grid & Hyper-Speed Lines Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const width = (canvas.width = canvas.parentElement.clientWidth);
      const height = (canvas.height = canvas.parentElement.clientHeight);

      // Decelerate speed smoothly
      speedRef.current = Math.max(0, speedRef.current * 0.94);
      setSpeedMph(Math.round(speedRef.current));

      // Advance grid offset based on speed
      const baseVel = 1.8 + (speedRef.current * 0.14);
      offsetRef.current = (offsetRef.current + baseVel) % 40;

      // 1. Deep Space Night Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.55);
      skyGrad.addColorStop(0, '#06010d');
      skyGrad.addColorStop(0.5, '#1e0538');
      skyGrad.addColorStop(1, '#4e0a52');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 70; i++) {
        const sx = (Math.sin(i * 99 + offsetRef.current * 0.01) * 0.5 + 0.5) * width;
        const sy = (Math.cos(i * 33) * 0.5 + 0.5) * (height * 0.45);
        ctx.fillRect(sx, sy, (i % 2) + 1, (i % 2) + 1);
      }

      const horizonY = height * 0.55;
      const sunCenterX = width * 0.5;
      const sunRadius = Math.min(width, height) * 0.25;
      const sunCenterY = horizonY - sunRadius * 0.35;

      // 3. PURE VIBRANT UNINTERRUPTED SYNTHWAVE SUN (No black cutout lines)
      const sunGrad = ctx.createLinearGradient(0, sunCenterY - sunRadius, 0, horizonY);
      sunGrad.addColorStop(0, '#ffe600');
      sunGrad.addColorStop(0.4, '#ff007f');
      sunGrad.addColorStop(0.8, '#ff0055');
      sunGrad.addColorStop(1, '#9d00ff');
      ctx.fillStyle = sunGrad;

      ctx.save();
      ctx.beginPath();
      ctx.arc(sunCenterX, sunCenterY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Multi-layered Intense Neon Sun Glow Aura
      const sunGlow = ctx.createRadialGradient(sunCenterX, sunCenterY, sunRadius * 0.5, sunCenterX, sunCenterY, sunRadius * 2.2);
      sunGlow.addColorStop(0, 'rgba(255, 0, 127, 0.45)');
      sunGlow.addColorStop(0.5, 'rgba(0, 240, 255, 0.2)');
      sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // 4. Distant Mountain Silhouettes
      ctx.fillStyle = '#0e041d';
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width * 0.15, horizonY - 45);
      ctx.lineTo(width * 0.28, horizonY - 20);
      ctx.lineTo(width * 0.4, horizonY - 60);
      ctx.lineTo(width * 0.5, horizonY - 25);
      ctx.lineTo(width * 0.65, horizonY - 70);
      ctx.lineTo(width * 0.8, horizonY - 30);
      ctx.lineTo(width, horizonY);
      ctx.fill();

      // 5. 3D Perspective Grid Floor
      ctx.save();
      const floorGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      floorGrad.addColorStop(0, '#120328');
      floorGrad.addColorStop(1, '#040108');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // Perspective Grid Lines (Horizontal moving forward)
      ctx.lineWidth = 2;
      const numH = 18;
      for (let i = 0; i < numH; i++) {
        const progress = ((i + offsetRef.current / 40) % numH) / numH;
        const py = horizonY + Math.pow(progress, 2.5) * (height - horizonY);

        ctx.strokeStyle = `rgba(0, 240, 255, ${0.25 + progress * 0.75})`;
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = progress * 8;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
        ctx.stroke();
      }

      // Perspective Grid Lines (Vertical fanning outward)
      const fanning = 26;
      for (let i = -fanning; i <= fanning; i++) {
        const startX = sunCenterX + (i / fanning) * (width * 0.05);
        const endX = sunCenterX + i * (width * 0.08);

        ctx.strokeStyle = 'rgba(255, 0, 127, 0.55)';
        ctx.shadowColor = '#FF007F';
        ctx.shadowBlur = 5;
        ctx.beginPath();
        ctx.moveTo(startX, horizonY);
        ctx.lineTo(endX, height);
        ctx.stroke();
      }
      ctx.restore();

      // 6. DYNAMIC 3D SPEED LINES ACCENTUATING FORWARD MOTION
      ctx.save();
      const speedIntensity = Math.min(1, (speedRef.current + 20) / 200);
      const lines = speedLinesRef.current;

      lines.forEach((l) => {
        l.z -= (l.speed + speedRef.current * 0.18);
        if (l.z <= 10) {
          l.z = 1000;
          l.x = (Math.random() - 0.5) * 2;
          l.y = (Math.random() - 0.5) * 2;
        }

        const k = 400 / l.z;
        const px = sunCenterX + l.x * width * k * 0.8;
        const py = horizonY + l.y * height * k * 0.8;
        const pLen = l.len * k * (1 + speedIntensity * 2.8);

        const strokeAlpha = Math.min(1, (1000 - l.z) / 800) * (0.3 + speedIntensity * 0.7);

        if (strokeAlpha > 0.05 && px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.strokeStyle = l.z % 2 === 0 ? `rgba(0, 240, 255, ${strokeAlpha})` : `rgba(255, 230, 0, ${strokeAlpha})`;
          ctx.lineWidth = Math.max(1, 2.5 * k);
          ctx.shadowColor = '#00F0FF';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + (px - sunCenterX) * 0.15 * speedIntensity, py + (py - horizonY) * 0.15 * speedIntensity + pLen);
          ctx.stroke();
        }
      });
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      id="synthwave-drive-viewport"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#06010d',
      }}
    >
      {/* 3D Canvas Scene */}
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

      {/* 1. TOP CENTER REARVIEW MIRROR (COMPACT) */}
      <RearviewMirror speedMph={speedMph} />

      {/* 2. BOTTOM CENTER LIVE WAVEFORM VISUALIZER (COMPACT) */}
      <WaveformVisualizer isAudioPlaying={isAudioPlaying} speedMph={speedMph} />

      {/* 3. BOTTOM RIGHT SPOTIFY API RADIO (COMPACT) */}
      <SpotifyRadio onAudioStateChange={(active) => setIsAudioPlaying(active)} />

      {/* Static Initial Welcome Overlay: Concise & Clean */}
      {totalScrolls === 0 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 40,
          textAlign: 'center',
          width: '90%',
          maxWidth: '420px',
          pointerEvents: 'none'
        }}>
          <div style={{
            background: 'rgba(9, 3, 20, 0.90)',
            backdropFilter: 'blur(16px)',
            color: '#FFFFFF',
            border: '1.2px solid rgba(0, 240, 255, 0.6)',
            borderRadius: '14px',
            padding: '1.5rem 1.75rem',
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.3)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 800,
              color: '#FFE600',
              letterSpacing: '0.14em',
              marginBottom: '0.35rem',
              textTransform: 'uppercase',
              textShadow: '0 0 8px rgba(255, 230, 0, 0.6)'
            }}>
              INFINITE SYNTH DRIVE
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '0.5rem',
              color: '#00F0FF',
              textShadow: '0 0 12px rgba(0, 240, 255, 0.7)',
              textTransform: 'uppercase',
            }}>
              SCROLL TO DRIVE
            </h2>

            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: '#B0B0D0',
              margin: 0,
              lineHeight: 1.4
            }}>
              Drive endlessly into the neon grid. Affirmations float into view as you travel.
            </p>
          </div>
        </div>
      )}

      {/* SLEEK FUTURISTIC FLOATING AFFIRMATION TOAST CARD */}
      {activeAffirmation && (
        <div style={{
          position: 'absolute',
          top: '22%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          width: '90%',
          maxWidth: '440px',
          animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{
            background: 'rgba(12, 4, 28, 0.94)',
            backdropFilter: 'blur(20px)',
            color: '#FFFFFF',
            border: '1.5px solid rgba(0, 240, 255, 0.7)',
            borderRadius: '16px',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 0 35px rgba(0, 240, 255, 0.45), inset 0 0 15px rgba(0, 240, 255, 0.15)',
            textAlign: 'center',
            position: 'relative'
          }}>
            
            {/* Close Button */}
            <button
              onClick={() => setActiveAffirmation(null)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '12px',
                background: 'transparent',
                border: 'none',
                color: '#888',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s'
              }}
              title="Close Affirmation"
            >
              <X size={16} />
            </button>

            {/* Header Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 230, 0, 0.12)',
              border: '1px solid #FFE600',
              borderRadius: '20px',
              padding: '0.25rem 0.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 800,
              color: '#FFE600',
              letterSpacing: '0.12em',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              boxShadow: '0 0 8px rgba(255, 230, 0, 0.4)'
            }}>
              <Sparkles size={13} /> AFFIRMATION #{activeAffirmation.number}
            </div>

            {/* Affirmation Text */}
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              fontWeight: 900,
              lineHeight: 1.35,
              color: '#00F0FF',
              textShadow: '0 0 12px rgba(0, 240, 255, 0.8)',
              letterSpacing: '0.02em',
              margin: 0
            }}>
              "{activeAffirmation.text}"
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
