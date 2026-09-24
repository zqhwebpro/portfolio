import React, { useState, useEffect, useRef } from 'react';
import { RearviewMirror } from './RearviewMirror';
import { WaveformVisualizer } from './WaveformVisualizer';
import { SpotifyRadio } from './SpotifyRadio';
import { Sparkles, X } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

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

const HORIZONTAL_POSITIONS = ['25%', '50%', '75%'];

export function SynthwaveDrive() {
  const canvasRef = useRef(null);

  // Infinite Driving Scroll State
  const [speedMph, setSpeedMph] = useState(0);
  const [driveDistance, setDriveDistance] = useState(0);
  const [popups, setPopups] = useState([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const speedRef = useRef(0);
  const offsetRef = useRef(0);
  const phaseRef = useRef(0);
  const driveDistanceRef = useRef(0);
  const nextMilestoneDistRef = useRef(6);
  const milestoneCountRef = useRef(0);

  // Handle Wheel / Scroll Interaction (Scroll Down = Drive Forward, Scroll Up = Reverse)
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();

      const scrollDelta = e.deltaY > 0 ? 1 : -1;

      if (e.deltaY > 0) {
        speedRef.current = Math.min(320, speedRef.current + 35);
      } else {
        speedRef.current = Math.max(-240, speedRef.current - 35);
      }

      setSpeedMph(Math.round(speedRef.current));

      // Advance 3D Driving Distance
      driveDistanceRef.current += scrollDelta;
      const currentDist = driveDistanceRef.current;
      setDriveDistance(currentDist);

      // Trigger new affirmation popup far down the road horizon when reaching distance milestones
      if (currentDist >= nextMilestoneDistRef.current) {
        milestoneCountRef.current += 1;
        const randomAff = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
        const randomPos = HORIZONTAL_POSITIONS[Math.floor(Math.random() * HORIZONTAL_POSITIONS.length)];

        const newPopup = {
          id: Date.now() + Math.random(),
          text: randomAff,
          number: milestoneCountRef.current,
          leftPos: randomPos,
          startDist: currentDist,
          targetDist: currentDist + 18 // Distance traveled for full road passage
        };

        setPopups((prev) => [...prev, newPopup]);

        // Next milestone 8 to 15 distance units away
        const nextGap = Math.floor(Math.random() * 8) + 8;
        nextMilestoneDistRef.current = currentDist + nextGap;
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

  // Remove popups that have traveled completely past the driver
  useEffect(() => {
    setPopups((prev) =>
      prev.filter((p) => {
        const progress = (driveDistance - p.startDist) / (p.targetDist - p.startDist);
        return progress <= 1.08;
      })
    );
  }, [driveDistance]);

  // Canvas 3D Perspective Grid & Sun Circle Waves Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const parent = canvas.parentElement;
      const width = (canvas.width = parent ? parent.clientWidth : window.innerWidth);
      const height = (canvas.height = parent ? parent.clientHeight : window.innerHeight);

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

      // 1. Deep Space Night Sky Gradient (Clean)
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

      // 2. SYNTHWAVE SUN
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

      // Sun Glow Aura
      const sunGlow = ctx.createRadialGradient(sunCenterX, sunCenterY, sunRadius * 0.5, sunCenterX, sunCenterY, sunRadius * 2.2);
      sunGlow.addColorStop(0, 'rgba(255, 0, 127, 0.45)');
      sunGlow.addColorStop(0.5, 'rgba(0, 240, 255, 0.2)');
      sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // 2.5 TRANSPARENT CONCENTRIC SUN CIRCLE WAVES (Behind mountain & foreground grid)
      const numRings = 5;
      const baseAmp = isAudioPlaying ? 22 : Math.abs(speedRef.current) > 0 ? 12 : 5;
      phaseRef.current += 0.03 + (Math.abs(speedRef.current) * 0.001);

      ctx.save();
      for (let rIdx = 0; rIdx < numRings; rIdx++) {
        const ringBaseR = sunRadius + 18 + rIdx * 26 + ((phaseRef.current * 16) % 26);
        const ringAlpha = Math.max(0.04, 0.25 - (rIdx * 0.04));

        ctx.globalAlpha = ringAlpha;
        ctx.strokeStyle = rIdx % 2 === 0 ? '#00F0FF' : '#FF007F';
        ctx.lineWidth = 1.8;
        ctx.shadowColor = rIdx % 2 === 0 ? '#00F0FF' : '#FF007F';
        ctx.shadowBlur = 8;

        ctx.beginPath();
        const steps = 90;
        for (let s = 0; s <= steps; s++) {
          const a = (s / steps) * Math.PI * 2;
          const wave = Math.sin(a * (6 + rIdx * 2) + phaseRef.current * 2) * (baseAmp * 0.35);
          const currentR = ringBaseR + wave;

          const rx = sunCenterX + Math.cos(a) * currentR;
          const ry = sunCenterY + Math.sin(a) * currentR;

          if (s === 0) ctx.moveTo(rx, ry);
          else ctx.lineTo(rx, ry);
        }
        ctx.closePath();
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;
      ctx.restore();

      // 3. Distant Mountain Silhouettes (Drawn ON TOP of sky & sun circles)
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

      // 4. 3D Perspective Grid Floor (Drawn ON TOP of horizon)
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
  }, [isAudioPlaying]);

  const dismissPopup = (id) => {
    SoundEngine.playSuccess();
    setPopups((prev) => prev.filter((p) => p.id !== id));
  };

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

      {/* 1. TOP CENTER REARVIEW MIRROR (FLUSH AT VERY TOP) */}
      <RearviewMirror speedMph={speedMph} />

      {/* 2. LIVE WAVEFORM SCOPE */}
      <WaveformVisualizer isAudioPlaying={isAudioPlaying} speedMph={speedMph} />

      {/* 3. SPOTIFY RADIO PLAYER WITH OFFICIAL SPOTIFY EMBED */}
      <SpotifyRadio onAudioStateChange={(active) => setIsAudioPlaying(active)} />

      {/* Initial Start Instructions */}
      {driveDistance === 0 && (
        <div style={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 40,
          textAlign: 'center',
          width: '90%',
          maxWidth: '440px',
          pointerEvents: 'none'
        }}>
          <div style={{
            background: 'rgba(6, 1, 18, 0.55)',
            backdropFilter: 'blur(16px)',
            color: '#FFFFFF',
            border: '1.5px solid rgba(0, 240, 255, 0.8)',
            borderRadius: '18px',
            padding: '1.5rem 1.8rem',
            boxShadow: '0 0 40px rgba(0, 240, 255, 0.4), inset 0 0 20px rgba(0, 240, 255, 0.15)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 800,
              color: '#00F0FF',
              letterSpacing: '0.14em',
              marginBottom: '0.5rem',
              textTransform: 'uppercase',
              textShadow: '0 0 10px rgba(0, 240, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem'
            }}>
              <Sparkles size={13} color="#00F0FF" /> INFINITE SYNTH DRIVE
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
              Scroll down to accelerate forward. Affirmations move up in 3D perspective along the road as you drive past them.
            </p>
          </div>
        </div>
      )}

      {/* DYNAMIC SCROLL-DRIVEN 3D ROAD PERSPECTIVE POP-UPS */}
      {popups.map((popup) => {
        const totalDist = popup.targetDist - popup.startDist;
        const rawProgress = (driveDistance - popup.startDist) / totalDist;
        const progress = Math.max(0, Math.min(1.05, rawProgress));

        // 3D Perspective Calculations based on road distance progress
        let topPct, scale, opacity, rotateX;

        if (progress <= 0.8) {
          // Approaching along synthwave perspective road
          const p = progress / 0.8;
          topPct = 54 - p * 30; // 54% -> 24%
          scale = 0.06 + Math.pow(p, 2.2) * 1.25; // 0.06 -> 1.31
          opacity = Math.min(1, p * 3.5);
          rotateX = (1 - p) * 45;
        } else {
          // Passing overhead/past the driver
          const p = (progress - 0.8) / 0.25;
          topPct = 24 - p * 20; // 24% -> 4%
          scale = 1.31 + p * 0.4;
          opacity = Math.max(0, 1 - p * 1.2);
          rotateX = -p * 12;
        }

        return (
          <div
            key={popup.id}
            onClick={() => dismissPopup(popup.id)}
            style={{
              position: 'absolute',
              top: `${topPct}%`,
              left: popup.leftPos,
              transform: `translate(-50%, -50%) scale(${scale}) rotateX(${rotateX}deg)`,
              opacity: opacity,
              zIndex: Math.round(50 + progress * 20),
              width: '88%',
              maxWidth: '460px',
              cursor: 'pointer',
              transition: 'top 0.08s linear, transform 0.08s linear, opacity 0.08s linear',
              pointerEvents: opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div style={{
              background: 'rgba(6, 1, 18, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(0, 240, 255, 0.85)',
              borderRadius: '20px',
              padding: '1.4rem 1.7rem',
              boxShadow: '0 0 50px rgba(0, 240, 255, 0.5), inset 0 0 25px rgba(0, 240, 255, 0.25)',
              textAlign: 'center',
              position: 'relative'
            }}>
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismissPopup(popup.id);
                }}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '14px',
                  background: 'rgba(0, 240, 255, 0.1)',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  borderRadius: '50%',
                  color: '#00F0FF',
                  cursor: 'pointer',
                  padding: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Acknowledge Affirmation"
              >
                <X size={15} />
              </button>

              {/* High Contrast White Text */}
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.2rem, 2.8vw, 1.6rem)',
                fontWeight: 900,
                lineHeight: 1.35,
                color: '#FFFFFF',
                textShadow: '0 0 15px rgba(255, 255, 255, 0.95), 0 0 35px rgba(0, 240, 255, 0.9), 0 0 55px rgba(0, 240, 255, 0.7)',
                letterSpacing: '0.03em',
                margin: 0
              }}>
                "{popup.text}"
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
