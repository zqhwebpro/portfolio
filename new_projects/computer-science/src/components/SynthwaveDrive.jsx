import React, { useState, useEffect, useRef } from 'react';
import { SoundEngine } from '../utils/soundEngine';
import { RearviewMirror } from './RearviewMirror';
import { WaveformVisualizer } from './WaveformVisualizer';
import { SpotifyRadio } from './SpotifyRadio';
import { Navigation, Zap, ChevronDown, Sparkles, Flame, ArrowRight } from 'lucide-react';

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
  "SYNTHESIZE YOUR IDEAS INTO REALITY."
];

export function SynthwaveDrive() {
  const canvasRef = useRef(null);
  
  // Random milestone threshold between 10 and 50 scrolls
  const [targetScrolls, setTargetScrolls] = useState(() => Math.floor(Math.random() * 41) + 10);
  const [scrollCount, setScrollCount] = useState(0);
  const [milestoneCount, setMilestoneCount] = useState(0);
  const [speedMph, setSpeedMph] = useState(0);
  const [arrived, setArrived] = useState(false);
  const [distanceKm, setDistanceKm] = useState(0);
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const speedRef = useRef(0);
  const offsetRef = useRef(0);
  const scrollCountRef = useRef(scrollCount);
  const targetScrollsRef = useRef(targetScrolls);
  const arrivedRef = useRef(arrived);
  const speedLinesRef = useRef([]);

  scrollCountRef.current = scrollCount;
  targetScrollsRef.current = targetScrolls;
  arrivedRef.current = arrived;

  // Initialize Speed Lines
  useEffect(() => {
    const lines = [];
    for (let i = 0; i < 60; i++) {
      lines.push({
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
        z: Math.random() * 1000 + 10,
        len: Math.random() * 40 + 20,
        speed: Math.random() * 5 + 10
      });
    }
    speedLinesRef.current = lines;
  }, []);

  // Continue Infinite Drive to Next Milestone
  const handleKeepDriving = () => {
    SoundEngine.playClick();
    const nextTarget = Math.floor(Math.random() * 41) + 10;
    setTargetScrolls(nextTarget);
    setScrollCount(0);
    setArrived(false);
    setMilestoneCount(prev => prev + 1);
    speedRef.current = 120; // boost speed on resume
  };

  // Handle scroll / wheel interaction
  useEffect(() => {
    const handleWheel = (e) => {
      if (arrivedRef.current) return;

      if (e.deltaY > 0) {
        e.preventDefault();
        
        speedRef.current = Math.min(260, speedRef.current + 35);
        setSpeedMph(Math.round(speedRef.current));
        SoundEngine.playDriveRev(speedRef.current / 260);

        setScrollCount((prev) => {
          const next = prev + 1;
          setDistanceKm(d => +(d + 0.9).toFixed(1));
          if (next >= targetScrollsRef.current && !arrivedRef.current) {
            setArrived(true);
            const randomAff = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
            setCurrentAffirmation(randomAff);
            SoundEngine.playSuccess();
          }
          return next;
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

  // Manual Gas Pedal trigger for mobile/click
  const handleGasPedal = () => {
    if (arrived) return;
    speedRef.current = Math.min(260, speedRef.current + 45);
    setSpeedMph(Math.round(speedRef.current));
    SoundEngine.playDriveRev(speedRef.current / 260);

    setScrollCount((prev) => {
      const next = prev + 1;
      setDistanceKm(d => +(d + 0.9).toFixed(1));
      if (next >= targetScrollsRef.current && !arrivedRef.current) {
        setArrived(true);
        const randomAff = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
        setCurrentAffirmation(randomAff);
        SoundEngine.playSuccess();
      }
      return next;
    });
  };

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
      for (let i = 0; i < 60; i++) {
        const sx = (Math.sin(i * 99 + offsetRef.current * 0.01) * 0.5 + 0.5) * width;
        const sy = (Math.cos(i * 33) * 0.5 + 0.5) * (height * 0.45);
        ctx.fillRect(sx, sy, (i % 2) + 1, (i % 2) + 1);
      }

      const horizonY = height * 0.55;
      const sunCenterX = width * 0.5;
      const sunRadius = Math.min(width, height) * 0.26;
      const sunCenterY = horizonY - sunRadius * 0.35;

      // 3. PURE VIBRANT UNINTERRUPTED SYNTHWAVE SUN (No black cutout lines!)
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
        // Move line closer in 3D Z space
        l.z -= (l.speed + speedRef.current * 0.15);
        if (l.z <= 10) {
          l.z = 1000;
          l.x = (Math.random() - 0.5) * 2;
          l.y = (Math.random() - 0.5) * 2;
        }

        const k = 400 / l.z;
        const px = sunCenterX + l.x * width * k * 0.8;
        const py = horizonY + l.y * height * k * 0.8;
        const pLen = l.len * k * (1 + speedIntensity * 2.5);

        const strokeAlpha = Math.min(1, (1000 - l.z) / 800) * speedIntensity;

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

      // 7. Destination / Affirmation Portal Zooming into view
      const totalT = targetScrollsRef.current;
      const curS = scrollCountRef.current;
      const zoomRatio = Math.min(1, curS / totalT);

      if (curS > 0) {
        ctx.save();
        const pSize = 30 + zoomRatio * 190;
        const pX = sunCenterX - pSize / 2;
        const pY = horizonY - pSize * 0.6;

        ctx.fillStyle = 'rgba(0, 240, 255, 0.18)';
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = 15;
        ctx.fillRect(pX, pY, pSize, pSize * 0.8);
        ctx.strokeRect(pX, pY, pSize, pSize * 0.8);

        // Inner glowing core text
        ctx.fillStyle = '#FFE600';
        ctx.font = `bold ${Math.max(10, pSize * 0.13)}px "Space Grotesk", sans-serif`;
        ctx.textAlign = 'center';
        ctx.shadowColor = '#FFE600';
        ctx.shadowBlur = 10;
        ctx.fillText('AFFIRMATION', sunCenterX, pY + pSize * 0.48);

        ctx.restore();
      }

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

      {/* 1. TOP CENTER REARVIEW MIRROR */}
      <RearviewMirror speedMph={speedMph} />

      {/* 2. BOTTOM CENTER LIVE WAVEFORM VISUALIZER */}
      <WaveformVisualizer isAudioPlaying={isAudioPlaying} speedMph={speedMph} />

      {/* 3. BOTTOM RIGHT SPOTIFY API RADIO */}
      <SpotifyRadio onAudioStateChange={(active) => setIsAudioPlaying(active)} />

      {/* Top Left Glass Telemetry HUD */}
      <div style={{
        position: 'absolute',
        top: '1.25rem',
        left: '1.25rem',
        zIndex: 20,
        pointerEvents: 'none',
      }}>
        <div style={{
          background: 'rgba(9, 3, 20, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid rgba(0, 240, 255, 0.5)',
          borderRadius: '8px',
          padding: '0.4rem 0.85rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: '#00F0FF',
          boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <Navigation size={14} /> INFINITE SYNTH DRIVE // HUD
        </div>
      </div>

      {/* Top Right Glass Telemetry HUD */}
      <div style={{
        position: 'absolute',
        top: '1.25rem',
        right: '1.25rem',
        zIndex: 20,
        pointerEvents: 'none',
        display: 'flex',
        gap: '0.6rem'
      }}>
        <div style={{
          background: 'rgba(9, 3, 20, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid rgba(255, 230, 0, 0.5)',
          borderRadius: '8px',
          padding: '0.4rem 0.85rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: '#FFE600',
          boxShadow: '0 0 15px rgba(255, 230, 0, 0.3)',
        }}>
          SPEED: {speedMph} MPH
        </div>
        <div style={{
          background: 'rgba(9, 3, 20, 0.85)',
          backdropFilter: 'blur(10px)',
          border: '1.5px solid rgba(255, 0, 127, 0.5)',
          borderRadius: '8px',
          padding: '0.4rem 0.85rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: '#FFFFFF',
          boxShadow: '0 0 15px rgba(255, 0, 127, 0.3)',
        }}>
          NEXT MILESTONE: {scrollCount} / {targetScrolls} SCROLLS
        </div>
      </div>

      {/* Scene 1: Initial "SCROLL TO DRIVE" Prompt Banner */}
      {scrollCount === 0 && milestoneCount === 0 && (
        <div style={{
          position: 'absolute',
          top: '52%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 20,
          textAlign: 'center',
          width: '90%',
          maxWidth: '520px',
        }}>
          <div style={{
            background: 'rgba(9, 3, 20, 0.88)',
            backdropFilter: 'blur(16px)',
            color: '#FFFFFF',
            border: '1.5px solid rgba(0, 240, 255, 0.6)',
            borderRadius: '16px',
            padding: '1.75rem 2rem',
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.35), inset 0 0 15px rgba(0, 240, 255, 0.15)',
            animation: 'floatGentle 3s ease-in-out infinite',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 800,
              color: '#FFE600',
              letterSpacing: '0.12em',
              marginBottom: '0.4rem',
              textTransform: 'uppercase',
              textShadow: '0 0 8px rgba(255, 230, 0, 0.6)'
            }}>
              ◆ INFINITE SYNTHWAVE DRIVE
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4.5vw, 2.8rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '0.6rem',
              color: '#00F0FF',
              textShadow: '0 0 12px rgba(0, 240, 255, 0.7)',
              textTransform: 'uppercase',
            }}>
              SCROLL TO DRIVE
            </h2>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#A0A0C0',
              marginBottom: '1.25rem',
              lineHeight: 1.5
            }}>
              Drive infinitely down the 3D synthwave highway! Every random 10–50 scrolls unlocks a new glowing affirmation milestone.
            </p>

            <button
              onClick={handleGasPedal}
              style={{
                background: 'linear-gradient(135deg, #0038FF, #00F0FF)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 1.6rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                textTransform: 'uppercase'
              }}
            >
              <Zap size={18} /> PRESS GAS PEDAL / SCROLL <ChevronDown size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Mid-Drive Gas Button for Mobile/Touch */}
      {scrollCount > 0 && !arrived && (
        <div style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '1.25rem',
          zIndex: 25,
        }}>
          <button
            onClick={handleGasPedal}
            style={{
              background: 'rgba(9, 3, 20, 0.85)',
              backdropFilter: 'blur(10px)',
              color: '#00F0FF',
              border: '1.5px solid rgba(0, 240, 255, 0.6)',
              borderRadius: '8px',
              padding: '0.75rem 1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Zap size={16} /> ACCELERATE (+1 SCROLL)
          </button>
        </div>
      )}

      {/* Sleek Digital Pop-up Modal: WORDS OF ENCOURAGEMENT / AFFIRMATION */}
      {arrived && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(6, 1, 13, 0.82)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1.5rem',
        }}>
          <div style={{
            background: 'rgba(12, 4, 28, 0.94)',
            backdropFilter: 'blur(18px)',
            color: '#FFFFFF',
            border: '1.5px solid rgba(0, 240, 255, 0.7)',
            borderRadius: '20px',
            padding: '2.25rem 2.5rem',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 0 40px rgba(0, 240, 255, 0.45), inset 0 0 20px rgba(0, 240, 255, 0.2)',
            textAlign: 'center',
            position: 'relative'
          }}>
            
            {/* Affirmation Badge Header */}
            <div style={{
              background: 'rgba(255, 230, 0, 0.15)',
              border: '1px solid #FFE600',
              borderRadius: '20px',
              padding: '0.4rem 1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#FFE600',
              letterSpacing: '0.1em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '1.25rem',
              boxShadow: '0 0 10px rgba(255, 230, 0, 0.4)'
            }}>
              <Flame size={16} /> ⚡ SYNTHWAVE MILESTONE #{milestoneCount + 1}
            </div>

            {/* Glowing Affirmation Quote Card */}
            <div style={{
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1.5px solid rgba(0, 240, 255, 0.4)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: 'inset 0 0 15px rgba(0, 240, 255, 0.15)'
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 3.5vw, 1.8rem)',
                fontWeight: 900,
                lineHeight: 1.3,
                color: '#00F0FF',
                textShadow: '0 0 15px rgba(0, 240, 255, 0.8)',
                letterSpacing: '0.02em',
                margin: 0
              }}>
                "{currentAffirmation}"
              </h2>
            </div>

            {/* Trip Telemetry Stats */}
            <div style={{
              background: 'rgba(5, 1, 10, 0.85)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              borderRadius: '12px',
              padding: '1.25rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              marginBottom: '1.75rem',
              textAlign: 'left'
            }}>
              <div>
                <div style={{ color: '#888', fontSize: '0.65rem' }}>TOTAL DISTANCE:</div>
                <div style={{ color: '#00F0FF', fontSize: '1.2rem', fontWeight: 900, textShadow: '0 0 8px rgba(0, 240, 255, 0.5)' }}>{distanceKm} KM</div>
              </div>
              <div>
                <div style={{ color: '#888', fontSize: '0.65rem' }}>SCROLLS COMPLETED:</div>
                <div style={{ color: '#FFE600', fontSize: '1.2rem', fontWeight: 900, textShadow: '0 0 8px rgba(255, 230, 0, 0.5)' }}>{targetScrolls} (RANDOM 10-50)</div>
              </div>
            </div>

            {/* Keep Driving Button */}
            <button
              onClick={handleKeepDriving}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #0038FF, #00F0FF)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 0 20px rgba(0, 240, 255, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                textTransform: 'uppercase'
              }}
            >
              <Zap size={18} /> 🏎️ KEEP DRIVING (NEXT MILESTONE) <ArrowRight size={18} />
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
