import React, { useState, useEffect, useRef } from 'react';
import { SoundEngine } from '../utils/soundEngine';
import { ArrowDown, Navigation, Flag, RotateCcw, Zap, Sparkles, ChevronDown } from 'lucide-react';

export function SynthwaveDrive({ onSelect }) {
  const canvasRef = useRef(null);
  
  // Random target scroll threshold between 4 and 9
  const [targetScrolls, setTargetScrolls] = useState(() => Math.floor(Math.random() * 6) + 4);
  const [scrollCount, setScrollCount] = useState(0);
  const [speedMph, setSpeedMph] = useState(0);
  const [arrived, setArrived] = useState(false);
  const [distanceKm, setDistanceKm] = useState(0);

  const speedRef = useRef(0);
  const offsetRef = useRef(0);
  const scrollCountRef = useRef(scrollCount);
  const targetScrollsRef = useRef(targetScrolls);
  const arrivedRef = useRef(arrived);

  scrollCountRef.current = scrollCount;
  targetScrollsRef.current = targetScrolls;
  arrivedRef.current = arrived;

  // Reset / Drive Again logic
  const handleDriveAgain = () => {
    SoundEngine.playClick();
    const newTarget = Math.floor(Math.random() * 6) + 4;
    setTargetScrolls(newTarget);
    setScrollCount(0);
    setSpeedMph(0);
    setDistanceKm(0);
    setArrived(false);
    speedRef.current = 0;
  };

  // Handle scroll / wheel interaction
  useEffect(() => {
    const handleWheel = (e) => {
      // If modal already arrived, allow standard scroll down
      if (arrivedRef.current) return;

      // Increment scroll progress on downward wheel
      if (e.deltaY > 0) {
        e.preventDefault();
        
        speedRef.current = Math.min(180, speedRef.current + 35);
        setSpeedMph(Math.round(speedRef.current));
        SoundEngine.playDriveRev(speedRef.current / 180);

        setScrollCount((prev) => {
          const next = prev + 1;
          setDistanceKm(+(next * 1.2).toFixed(1));
          if (next >= targetScrollsRef.current && !arrivedRef.current) {
            setArrived(true);
            SoundEngine.playSuccess();
          }
          return next;
        });
      }
    };

    const container = document.getElementById('synthwave-hero-container');
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
    speedRef.current = Math.min(180, speedRef.current + 45);
    setSpeedMph(Math.round(speedRef.current));
    SoundEngine.playDriveRev(speedRef.current / 180);

    setScrollCount((prev) => {
      const next = prev + 1;
      setDistanceKm(+(next * 1.2).toFixed(1));
      if (next >= targetScrollsRef.current && !arrivedRef.current) {
        setArrived(true);
        SoundEngine.playSuccess();
      }
      return next;
    });
  };

  // Canvas 3D Perspective Grid Render Loop
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
      const baseVel = 1.5 + (speedRef.current * 0.12);
      offsetRef.current = (offsetRef.current + baseVel) % 40;

      // 1. Deep Space Night Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.55);
      skyGrad.addColorStop(0, '#0a0314');
      skyGrad.addColorStop(0.5, '#1e0836');
      skyGrad.addColorStop(1, '#4a0e4e');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 40; i++) {
        const sx = (Math.sin(i * 99 + offsetRef.current * 0.01) * 0.5 + 0.5) * width;
        const sy = (Math.cos(i * 33) * 0.5 + 0.5) * (height * 0.45);
        ctx.fillRect(sx, sy, (i % 2) + 1, (i % 2) + 1);
      }

      const horizonY = height * 0.55;
      const sunCenterX = width * 0.5;
      const sunRadius = Math.min(width, height) * 0.24;
      const sunCenterY = horizonY - sunRadius * 0.3;

      // 3. Giant Synthwave Sun with Cutout Stripes
      const sunGrad = ctx.createLinearGradient(0, sunCenterY - sunRadius, 0, horizonY);
      sunGrad.addColorStop(0, '#ffe600');
      sunGrad.addColorStop(0.5, '#ff0055');
      sunGrad.addColorStop(1, '#7928ca');
      ctx.fillStyle = sunGrad;

      ctx.save();
      ctx.beginPath();
      ctx.arc(sunCenterX, sunCenterY, sunRadius, 0, Math.PI * 2);
      ctx.fill();

      // Cutout stripes in lower half of sun
      ctx.fillStyle = '#0a0314';
      const stripeCount = 7;
      for (let i = 0; i < stripeCount; i++) {
        const stripeY = sunCenterY + (i / stripeCount) * sunRadius;
        const stripeH = 2 + i * 1.5;
        ctx.fillRect(sunCenterX - sunRadius - 10, stripeY, sunRadius * 2 + 20, stripeH);
      }
      ctx.restore();

      // Sun Glow Aura
      const sunGlow = ctx.createRadialGradient(sunCenterX, sunCenterY, sunRadius * 0.8, sunCenterX, sunCenterY, sunRadius * 1.6);
      sunGlow.addColorStop(0, 'rgba(255, 0, 85, 0.3)');
      sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, width, height);

      // 4. Distant Mountain Silhouettes
      ctx.fillStyle = '#0f051d';
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width * 0.15, horizonY - 35);
      ctx.lineTo(width * 0.28, horizonY - 15);
      ctx.lineTo(width * 0.4, horizonY - 50);
      ctx.lineTo(width * 0.5, horizonY - 20);
      ctx.lineTo(width * 0.65, horizonY - 60);
      ctx.lineTo(width * 0.8, horizonY - 25);
      ctx.lineTo(width, horizonY);
      ctx.fill();

      // 5. 3D Perspective Grid Floor
      ctx.save();
      const floorGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      floorGrad.addColorStop(0, '#120426');
      floorGrad.addColorStop(1, '#05010a');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // Perspective Grid Lines (Horizontal moving forward)
      ctx.lineWidth = 1.8;
      const numH = 16;
      for (let i = 0; i < numH; i++) {
        const progress = ((i + offsetRef.current / 40) % numH) / numH;
        const py = horizonY + Math.pow(progress, 2.5) * (height - horizonY);

        ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 + progress * 0.85})`;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
        ctx.stroke();
      }

      // Perspective Grid Lines (Vertical fanning outward)
      const fanning = 22;
      for (let i = -fanning; i <= fanning; i++) {
        const startX = sunCenterX + (i / fanning) * (width * 0.05);
        const endX = sunCenterX + i * (width * 0.08);

        ctx.strokeStyle = 'rgba(255, 0, 128, 0.45)';
        ctx.beginPath();
        ctx.moveTo(startX, horizonY);
        ctx.lineTo(endX, height);
        ctx.stroke();
      }
      ctx.restore();

      // 6. Destination Portal Zooming into view as scroll increases
      const totalT = targetScrollsRef.current;
      const curS = scrollCountRef.current;
      const zoomRatio = Math.min(1, curS / totalT);

      if (curS > 0) {
        ctx.save();
        const pSize = 30 + zoomRatio * 160;
        const pX = sunCenterX - pSize / 2;
        const pY = horizonY - pSize * 0.6;

        ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
        ctx.strokeStyle = '#00F0FF';
        ctx.lineWidth = 3;
        ctx.fillRect(pX, pY, pSize, pSize * 0.8);
        ctx.strokeRect(pX, pY, pSize, pSize * 0.8);

        // Inner glowing core
        ctx.fillStyle = '#FFE600';
        ctx.font = `bold ${Math.max(10, pSize * 0.14)}px "Space Grotesk", sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('DESTINATION', sunCenterX, pY + pSize * 0.45);

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      id="synthwave-hero-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '85vh',
        minHeight: '580px',
        overflow: 'hidden',
        borderBottom: '4px solid #0A0A0A',
        background: '#0a0314',
      }}
    >
      {/* 3D Canvas */}
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

      {/* Top HUD Bar */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        right: '1rem',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <div style={{
          background: 'rgba(10, 3, 20, 0.85)',
          border: '2px solid #00F0FF',
          padding: '0.5rem 1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          fontWeight: 900,
          color: '#00F0FF',
          boxShadow: '3px 3px 0 #00F0FF',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Navigation size={16} /> SYNTHWAVE CS DRIVE // 3D HUD
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{
            background: 'rgba(10, 3, 20, 0.85)',
            border: '2px solid #FFE600',
            padding: '0.5rem 0.85rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            fontWeight: 900,
            color: '#FFE600',
            boxShadow: '3px 3px 0 #0A0A0A',
          }}>
            SPEED: {speedMph} MPH
          </div>
          <div style={{
            background: 'rgba(10, 3, 20, 0.85)',
            border: '2px solid #FF0055',
            padding: '0.5rem 0.85rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            fontWeight: 900,
            color: '#FFFFFF',
            boxShadow: '3px 3px 0 #0A0A0A',
          }}>
            PROGRESS: {scrollCount} / {targetScrolls} SCROLLS
          </div>
        </div>
      </div>

      {/* Scene 1: Initial "SCROLL TO DRIVE" Prompt Banner */}
      {scrollCount === 0 && (
        <div style={{
          position: 'absolute',
          bottom: '3rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          textAlign: 'center',
          width: '90%',
          maxWidth: '520px',
        }}>
          <div style={{
            background: '#FFE600',
            color: '#0A0A0A',
            border: '3.5px solid #0A0A0A',
            padding: '1.25rem 2rem',
            boxShadow: '8px 8px 0 #0A0A0A',
            animation: 'floatGentle 3s ease-in-out infinite',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 900,
              letterSpacing: '0.12em',
              marginBottom: '0.4rem',
              textTransform: 'uppercase',
            }}>
              ◆ SYNTHWAVE VEHICLE CONTROL
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '0.6rem',
              textTransform: 'uppercase',
            }}>
              SCROLL TO DRIVE
            </h2>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 800,
              color: '#333',
              marginBottom: '1rem',
            }}>
              Scroll down (or tap gas) to accelerate towards your random destination ({targetScrolls} scrolls away)!
            </p>

            <button
              onClick={handleGasPedal}
              style={{
                background: '#0038FF',
                color: '#FFFFFF',
                border: '2.5px solid #0A0A0A',
                padding: '0.75rem 1.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '4px 4px 0 #0A0A0A',
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
          bottom: '2rem',
          right: '2rem',
          zIndex: 10,
        }}>
          <button
            onClick={handleGasPedal}
            style={{
              background: '#00F0FF',
              color: '#0A0A0A',
              border: '3px solid #0A0A0A',
              padding: '0.85rem 1.25rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '4px 4px 0 #0A0A0A',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <Zap size={16} /> ACCELERATE (+1 SCROLL)
          </button>
        </div>
      )}

      {/* Digital Pop-up Modal: DESTINATION ARRIVED */}
      {arrived && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 3, 20, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1.5rem',
        }}>
          <div style={{
            background: '#FFFFFF',
            color: '#0A0A0A',
            border: '4px solid #0A0A0A',
            padding: '2rem 2.25rem',
            width: '100%',
            maxWidth: '480px',
            boxShadow: '12px 12px 0 #00F0FF',
            textAlign: 'center',
            animation: 'pulseGeometric 0.3s ease-out',
            position: 'relative'
          }}>
            
            {/* Arrival Badge Header */}
            <div style={{
              background: '#FFE600',
              border: '2.5px solid #0A0A0A',
              padding: '0.4rem 0.85rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 900,
              letterSpacing: '0.1em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '1rem',
              boxShadow: '3px 3px 0 #0A0A0A'
            }}>
              <Flag size={16} /> 🏁 TRIP COMPLETED
            </div>

            {/* Main Pop-up Headline */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 2.8rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              marginBottom: '0.75rem',
              color: '#0A0A0A',
              textTransform: 'uppercase',
            }}>
              DESTINATION ARRIVED
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: '#444',
              fontWeight: 600,
              marginBottom: '1.5rem',
              lineHeight: 1.5,
            }}>
              You successfully navigated the synthwave 3D grid and reached the destination after <strong>{scrollCount}</strong> scrolls!
            </p>

            {/* Trip Telemetry Stats */}
            <div style={{
              background: '#0A0A0A',
              color: '#FFFFFF',
              border: '2.5px solid #0A0A0A',
              padding: '1rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              marginBottom: '1.75rem',
              textAlign: 'left'
            }}>
              <div>
                <div style={{ color: '#888', fontSize: '0.65rem' }}>DISTANCE TRAVELED:</div>
                <div style={{ color: '#00F0FF', fontSize: '1.1rem', fontWeight: 900 }}>{distanceKm} KM</div>
              </div>
              <div>
                <div style={{ color: '#888', fontSize: '0.65rem' }}>REQUIRED SCROLLS:</div>
                <div style={{ color: '#FFE600', fontSize: '1.1rem', fontWeight: 900 }}>{targetScrolls} (RANDOM 4-9)</div>
              </div>
            </div>

            {/* Modal Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={handleDriveAgain}
                style={{
                  background: '#0038FF',
                  color: '#FFFFFF',
                  border: '3px solid #0A0A0A',
                  padding: '0.9rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0 #0A0A0A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  textTransform: 'uppercase'
                }}
              >
                <RotateCcw size={18} /> 🏎️ DRIVE AGAIN (RANDOMIZE DESTINATION)
              </button>

              <button
                onClick={() => {
                  SoundEngine.playClick();
                  const el = document.getElementById('concept-slides');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  background: '#FFE600',
                  color: '#0A0A0A',
                  border: '3px solid #0A0A0A',
                  padding: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0 #0A0A0A',
                  textTransform: 'uppercase'
                }}
              >
                📜 EXPLORE 5 CS CONCEPTS ↓
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
