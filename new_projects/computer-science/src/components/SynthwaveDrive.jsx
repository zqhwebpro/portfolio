import React, { useState, useEffect, useRef } from 'react';
import { RearviewMirror } from './RearviewMirror';
import { WaveformVisualizer } from './WaveformVisualizer';
import { SpotifyRadio } from './SpotifyRadio';
import { Sparkles, X } from 'lucide-react';

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

const HORIZONTAL_POSITIONS = ['22%', '50%', '75%'];

export function SynthwaveDrive() {
  const canvasRef = useRef(null);

  // Infinite Scroll & Affirmation State
  const [totalScrolls, setTotalScrolls] = useState(0);
  const [speedMph, setSpeedMph] = useState(0);
  const [activeAffirmation, setActiveAffirmation] = useState(null); // { id, text, number, leftPos }
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const speedRef = useRef(0);
  const offsetRef = useRef(0);
  const nextThresholdRef = useRef(5);
  const milestoneCountRef = useRef(0);

  // Handle Wheel / Scroll Interaction (Scroll Down = Forward, Scroll Up = Reverse)
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      if (e.deltaY > 0) {
        // Scroll DOWN = Drive Forward
        speedRef.current = Math.min(320, speedRef.current + 35);
      } else if (e.deltaY < 0) {
        // Scroll UP = Drive in Reverse / Brake
        speedRef.current = Math.max(-240, speedRef.current - 35);
      }

      setSpeedMph(Math.round(speedRef.current));

      setTotalScrolls((prev) => {
        const nextScroll = prev + 1;

        // Trigger Affirmation Popup on scroll milestones
        if (nextScroll >= nextThresholdRef.current) {
          milestoneCountRef.current += 1;
          const randomAff = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
          const randomPos = HORIZONTAL_POSITIONS[Math.floor(Math.random() * HORIZONTAL_POSITIONS.length)];
          
          setActiveAffirmation({
            id: Date.now(),
            text: randomAff,
            number: milestoneCountRef.current,
            leftPos: randomPos
          });

          // Set next random threshold (7 to 15 scrolls away)
          const nextStep = Math.floor(Math.random() * 9) + 7;
          nextThresholdRef.current = nextScroll + nextStep;
        }

        return nextScroll;
      });
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

  // Auto-dismiss floating affirmation toast after 5 seconds
  useEffect(() => {
    if (!activeAffirmation) return;
    const timer = setTimeout(() => {
      setActiveAffirmation(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeAffirmation]);

  // Canvas 3D Perspective Grid Render Loop (No Stars, No Speed Lines)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const width = (canvas.width = canvas.parentElement.clientWidth);
      const height = (canvas.height = canvas.parentElement.clientHeight);

      // Decelerate speed smoothly to 0 when not scrolling
      if (Math.abs(speedRef.current) > 0.1) {
        speedRef.current = speedRef.current * 0.92;
      } else {
        speedRef.current = 0;
      }
      setSpeedMph(Math.round(speedRef.current));

      // Advance grid offset forward or backward depending on speedRef
      if (speedRef.current !== 0) {
        const baseVel = speedRef.current * 0.16;
        offsetRef.current = (offsetRef.current + baseVel) % 40;
      }

      // 1. Deep Space Night Sky Gradient (Clean - No Stars)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.55);
      skyGrad.addColorStop(0, '#040008');
      skyGrad.addColorStop(0.5, '#18042e');
      skyGrad.addColorStop(1, '#420747');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      const horizonY = height * 0.55;
      const sunCenterX = width * 0.5;
      const sunRadius = Math.min(width, height) * 0.25;
      const sunCenterY = horizonY - sunRadius * 0.35;

      // 2. PURE VIBRANT UNINTERRUPTED SYNTHWAVE SUN
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

      // 3. Distant Mountain Silhouettes
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

      // 4. 3D Perspective Grid Floor
      ctx.save();
      const floorGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      floorGrad.addColorStop(0, '#120328');
      floorGrad.addColorStop(1, '#040108');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // Perspective Grid Lines (Horizontal moving forward/backward)
      ctx.lineWidth = 2;
      const numH = 18;
      for (let i = 0; i < numH; i++) {
        const progress = (((i + offsetRef.current / 40) % numH) + numH) % numH / numH;
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
        background: '#040008',
      }}
    >
      {/* 3D Canvas Scene */}
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

      {/* 1. TOP CENTER REARVIEW MIRROR (WITH MOUNTAINS & CLEAN SURFACE) */}
      <RearviewMirror speedMph={speedMph} />

      {/* 2. BOTTOM CENTER LIVE WAVEFORM SCOPE (MINIMALIST NEON WAVE) */}
      <WaveformVisualizer isAudioPlaying={isAudioPlaying} speedMph={speedMph} />

      {/* 3. BOTTOM RIGHT RADIO DECK (CLEAN - NO SPOTIFY TEXT/LINK) */}
      <SpotifyRadio onAudioStateChange={(active) => setIsAudioPlaying(active)} />

      {/* Initial Start Banner: Transparent Futuristic Neon Glass Aesthetic */}
      {totalScrolls === 0 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 40,
          textAlign: 'center',
          width: '90%',
          maxWidth: '440px',
          pointerEvents: 'none'
        }}>
          <div style={{
            background: 'rgba(10, 2, 26, 0.55)',
            backdropFilter: 'blur(16px)',
            color: '#FFFFFF',
            border: '1.5px solid rgba(0, 240, 255, 0.8)',
            borderRadius: '16px',
            padding: '1.6rem 1.8rem',
            boxShadow: '0 0 40px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(0, 240, 255, 0.15)',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 230, 0, 0.14)',
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
              boxShadow: '0 0 10px rgba(255, 230, 0, 0.5)'
            }}>
              <Sparkles size={13} /> INFINITE SYNTH DRIVE
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '0.5rem',
              color: '#00F0FF',
              textShadow: '0 0 15px rgba(0, 240, 255, 0.9)',
              textTransform: 'uppercase',
            }}>
              SCROLL TO DRIVE
            </h2>

            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#C0C0E0',
              margin: 0,
              lineHeight: 1.45
            }}>
              Scroll down to accelerate forward. Scroll up to reverse. Affirmations float into view as you travel.
            </p>
          </div>
        </div>
      )}

      {/* SLEEK TRANSPARENT FUTURISTIC FLOATING AFFIRMATION CARD SCROLLING UP INTO VIEW */}
      {activeAffirmation && (
        <div
          key={activeAffirmation.id}
          style={{
            position: 'absolute',
            left: activeAffirmation.leftPos,
            transform: 'translateX(-50%)',
            zIndex: 50,
            width: '90%',
            maxWidth: '430px',
            animation: 'scrollUpFloat 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          <div style={{
            background: 'rgba(10, 2, 26, 0.45)',
            backdropFilter: 'blur(16px)',
            color: '#FFFFFF',
            border: '1.5px solid rgba(0, 240, 255, 0.8)',
            borderRadius: '16px',
            padding: '1.35rem 1.6rem',
            boxShadow: '0 0 40px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(0, 240, 255, 0.15)',
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
                color: '#AAA',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
              background: 'rgba(255, 230, 0, 0.14)',
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
              boxShadow: '0 0 10px rgba(255, 230, 0, 0.5)'
            }}>
              <Sparkles size={13} /> AFFIRMATION #{activeAffirmation.number}
            </div>

            {/* Affirmation Text */}
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
              fontWeight: 900,
              lineHeight: 1.35,
              color: '#00F0FF',
              textShadow: '0 0 15px rgba(0, 240, 255, 0.9)',
              letterSpacing: '0.02em',
              margin: 0
            }}>
              "{activeAffirmation.text}"
            </h3>
          </div>
        </div>
      )}

      {/* Keyframe animation for scrolling pop-ups */}
      <style>{`
        @keyframes scrollUpFloat {
          0% {
            top: 75%;
            opacity: 0;
            transform: translateX(-50%) scale(0.85);
          }
          40% {
            opacity: 1;
          }
          100% {
            top: 26%;
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
