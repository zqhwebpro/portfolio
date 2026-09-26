import React, { useState, useEffect, useRef } from 'react';
import { RearviewMirror } from './RearviewMirror';
import { WaveformVisualizer } from './WaveformVisualizer';
import { SpotifyRadio } from './SpotifyRadio';

const AFFIRMATIONS = [
  "You are unstoppable. Keep pushing forward.",
  "Code is creativity in motion. Design your future.",
  "Every scroll brings you closer to mastery.",
  "Greatness is created one step at a time.",
  "The horizon belongs to those who dare to drive.",
  "Innovation lives at the edge of freedom.",
  "Focus on the journey. Results will follow.",
  "Your potential is infinite. Ride the neon wave.",
  "Persistence masters every algorithm.",
  "Synthesize your ideas into reality.",
  "Your logic shines brighter than a neon sunrise.",
  "The digital grid expands with your vision.",
  "You are bending reality with every line of code.",
  "Keep driving. The future is crafted by you.",
  "Master the fundamentals, command any language."
];

export function SynthwaveDrive() {
  const canvasRef = useRef(null);
  const viewportRef = useRef(null);

  // Driving & simulation state
  const [speedMph, setSpeedMph] = useState(0);
  const [driveDistance, setDriveDistance] = useState(0);
  const [popups, setPopups] = useState([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [autoDrive, setAutoDrive] = useState(false);
  const [playerX, setPlayerX] = useState(0); // Left/Right lateral position (-0.85 to +0.85)

  const showsRef = useRef([]);

  // Animation & simulation refs
  const autoDriveRef = useRef(false);
  const speedRef = useRef(0);
  const directionRef = useRef(1); // 1 = Forward, -1 = Reverse
  const offsetRef = useRef(0);
  const driveDistanceRef = useRef(0);
  const nextMilestoneDistRef = useRef(28); // Spaced apart, no initial popup at startup
  const milestoneCountRef = useRef(0);

  // Steering physics refs
  const playerXRef = useRef(0);
  const steerVelocityRef = useRef(0);
  const keysPressedRef = useRef({ left: false, right: false });

  // Fetch optional show names for sign text variety
  useEffect(() => {
    let isMounted = true;
    fetch('https://api.tvmaze.com/shows')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          showsRef.current = data;
        }
      })
      .catch((err) => console.error('Failed to load show titles:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleAutoDrive = () => {
    setAutoDrive((prev) => {
      const next = !prev;
      autoDriveRef.current = next;
      return next;
    });
  };

  // Keyboard left/right steering on the Tron road
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressedRef.current.left = true;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressedRef.current.right = true;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressedRef.current.left = false;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressedRef.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Fluid momentum wheel / scroll interaction
  useEffect(() => {
    const handleWheel = (e) => {
      const deltaMag = Math.min(Math.abs(e.deltaY), 120);
      const impulse = deltaMag * 0.35;

      if (e.deltaY > 0) {
        // Scroll DOWN = Drive Forward
        directionRef.current = 1;
        speedRef.current = Math.min(280, speedRef.current + impulse);
      } else if (e.deltaY < 0) {
        // Scroll UP = Drive Reverse
        directionRef.current = -1;
        speedRef.current = Math.min(280, speedRef.current + impulse);
      }
    };

    const container = viewportRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // Filter out popups that have traveled past the driver
  useEffect(() => {
    setPopups((prev) =>
      prev.filter((p) => {
        const progress = (driveDistance - p.startDist) / 36;
        return progress <= 3.0;
      })
    );
  }, [driveDistance]);

  // Canvas 3D Perspective Grid & Scene Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;

      // Only resize canvas buffer when dimensions actually change
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      // Handle keyboard lateral steering physics
      if (keysPressedRef.current.left) {
        steerVelocityRef.current = Math.max(-0.045, steerVelocityRef.current - 0.008);
      }
      if (keysPressedRef.current.right) {
        steerVelocityRef.current = Math.min(0.045, steerVelocityRef.current + 0.008);
      }
      if (!keysPressedRef.current.left && !keysPressedRef.current.right) {
        steerVelocityRef.current *= 0.88; // Smooth inertia damping
      }

      if (Math.abs(steerVelocityRef.current) > 0.0001) {
        playerXRef.current += steerVelocityRef.current;
        playerXRef.current = Math.max(-0.85, Math.min(0.85, playerXRef.current));
        setPlayerX(playerXRef.current);
      }

      // Handle speed adjustments (auto-drive cruise vs momentum deceleration)
      if (autoDriveRef.current) {
        directionRef.current = 1;
        speedRef.current = speedRef.current + (40 - speedRef.current) * 0.05; // Ease to 40 mph
      } else {
        if (speedRef.current > 0.1) {
          speedRef.current = speedRef.current * 0.95;
        } else {
          speedRef.current = 0;
        }
      }

      // Smooth state updates
      setSpeedMph(Math.round(speedRef.current));
      setDriveDistance(Math.abs(driveDistanceRef.current));

      // Advance grid offset
      if (speedRef.current > 0) {
        const baseVel = speedRef.current * 0.14 * directionRef.current;
        offsetRef.current = (offsetRef.current + baseVel + 40) % 40;
        driveDistanceRef.current += baseVel / 40;
      }

      const currentDist = Math.abs(driveDistanceRef.current);

      // Trigger new affirmation popup far down the road horizon
      if (currentDist >= nextMilestoneDistRef.current) {
        milestoneCountRef.current += 1;

        let popupText = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
        if (showsRef.current.length > 0) {
          const show = showsRef.current[Math.floor(Math.random() * showsRef.current.length)];
          popupText = show.name;
        }

        const startDist = Math.ceil(currentDist);
        const newPopup = {
          id: Date.now() + Math.random(),
          text: popupText,
          number: milestoneCountRef.current,
          startDist: startDist,
          targetDist: startDist + 36, // 36 grid squares
        };

        setPopups((prev) => [...prev, newPopup]);
        const nextGap = Math.floor(Math.random() * 15) + 20;
        nextMilestoneDistRef.current = startDist + nextGap;
      }

      const horizonY = height * 0.55;
      const sunCenterX = width * 0.5;
      const sunRadius = Math.min(width, height) * 0.25;
      const sunCenterY = horizonY - sunRadius * 0.35;

      // 1. Deep Space Night Sky & Synthwave Sun (with subtle steering parallax)
      drawSkyAndSun(ctx, width, height, horizonY, sunCenterX, sunCenterY, sunRadius, playerXRef.current);

      // 2. Distant Mountain Silhouettes
      drawMountains(ctx, width, horizonY, playerXRef.current);

      // 3. 3D Perspective Grid Floor (shifting with lateral road steering)
      drawGridFloor(ctx, width, height, horizonY, sunCenterX, offsetRef.current, playerXRef.current);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={viewportRef}
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

      {/* Top Center Rearview Mirror */}
      <RearviewMirror
        speedMph={speedMph}
        popups={popups}
        driveDistance={driveDistance}
        playerX={playerX}
      />

      {/* Live Waveform Scope Along Horizon */}
      <WaveformVisualizer isAudioPlaying={isAudioPlaying} speedMph={speedMph} />

      {/* Direct Spotify Radio Embed */}
      <SpotifyRadio onAudioStateChange={(active) => setIsAudioPlaying(active)} />

      {/* Steering & Drive Controls Hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '1.5rem',
          zIndex: 35,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(10, 2, 22, 0.82)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          borderRadius: '8px',
          padding: '0.45rem 0.85rem',
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.68rem',
          letterSpacing: '0.08em',
          pointerEvents: 'none',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.6)',
        }}
      >
        <span style={{ color: '#00F0FF', fontWeight: 800 }}>← / → or A / D</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
        <span>Steer Across Road</span>
      </div>

      {/* Auto Drive Toggle Button */}
      <button
        type="button"
        onClick={toggleAutoDrive}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 40,
          background: autoDrive ? 'rgba(0, 240, 255, 0.2)' : 'rgba(10, 2, 20, 0.75)',
          border: `1px solid ${autoDrive ? '#00F0FF' : 'rgba(0, 240, 255, 0.3)'}`,
          color: autoDrive ? '#00F0FF' : 'rgba(255, 255, 255, 0.7)',
          padding: '0.75rem 1.25rem',
          borderRadius: '8px',
          fontFamily: 'var(--font-sans, sans-serif)',
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          boxShadow: autoDrive ? '0 0 15px rgba(0, 240, 255, 0.4)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {autoDrive ? 'Auto Drive: ON' : 'Auto Drive: OFF'}
      </button>

      {/* Popups Traveling Along Roadside Track Lines */}
      {popups.map((popup) => (
        <RoadsideSign
          key={popup.id}
          popup={popup}
          driveDistance={driveDistance}
          playerX={playerX}
        />
      ))}
    </div>
  );
}

// ----------------------------------------------------------------------------
// Canvas Layer Render Helpers
// ----------------------------------------------------------------------------

function drawSkyAndSun(ctx, width, height, horizonY, sunCenterX, sunCenterY, sunRadius, playerX = 0) {
  const shiftX = -playerX * (width * 0.02);
  const cx = sunCenterX + shiftX;

  // Deep space sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
  skyGrad.addColorStop(0, '#040008');
  skyGrad.addColorStop(0.5, '#18042e');
  skyGrad.addColorStop(1, '#420747');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height);

  // Synthwave sun
  const sunGrad = ctx.createLinearGradient(0, sunCenterY - sunRadius, 0, horizonY);
  sunGrad.addColorStop(0, '#ffe600');
  sunGrad.addColorStop(0.4, '#ff007f');
  sunGrad.addColorStop(0.8, '#ff0055');
  sunGrad.addColorStop(1, '#9d00ff');
  ctx.fillStyle = sunGrad;

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, sunCenterY, sunRadius, 0, Math.PI * 2);
  ctx.fill();

  // Sun glow aura
  const sunGlow = ctx.createRadialGradient(
    cx,
    sunCenterY,
    sunRadius * 0.5,
    cx,
    sunCenterY,
    sunRadius * 2.2
  );
  sunGlow.addColorStop(0, 'rgba(255, 0, 127, 0.45)');
  sunGlow.addColorStop(0.5, 'rgba(0, 240, 255, 0.2)');
  sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sunGlow;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function drawMountains(ctx, width, horizonY, playerX = 0) {
  const shift = -playerX * (width * 0.035);
  ctx.fillStyle = '#0e041d';
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  ctx.lineTo(width * 0.15 + shift, horizonY - 45);
  ctx.lineTo(width * 0.28 + shift, horizonY - 20);
  ctx.lineTo(width * 0.4 + shift, horizonY - 60);
  ctx.lineTo(width * 0.5 + shift, horizonY - 25);
  ctx.lineTo(width * 0.65 + shift, horizonY - 70);
  ctx.lineTo(width * 0.8 + shift, horizonY - 30);
  ctx.lineTo(width, horizonY);
  ctx.fill();
}

function drawGridFloor(ctx, width, height, horizonY, sunCenterX, offset, playerX = 0) {
  ctx.save();
  const floorGrad = ctx.createLinearGradient(0, horizonY, 0, height);
  floorGrad.addColorStop(0, '#120328');
  floorGrad.addColorStop(1, '#040108');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, horizonY, width, height - horizonY);

  // Horizon anchor line
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
  ctx.shadowColor = '#00F0FF';
  ctx.shadowBlur = 4;
  ctx.beginPath();
  ctx.moveTo(0, horizonY);
  ctx.lineTo(width, horizonY);
  ctx.stroke();

  // Horizontal perspective lines moving forward/backward
  const numH = 18;
  for (let i = 0; i < numH; i++) {
    const progress = (((i + offset / 40) % numH) + numH) % numH / numH;
    const py = horizonY + Math.pow(progress, 2.5) * (height - horizonY);

    ctx.strokeStyle = `rgba(0, 240, 255, ${0.25 + progress * 0.75})`;
    ctx.shadowColor = '#00F0FF';
    ctx.shadowBlur = progress * 8;
    ctx.beginPath();
    ctx.moveTo(0, py);
    ctx.lineTo(width, py);
    ctx.stroke();
  }

  // Vertical perspective lines fanning outward, shifting laterally with steering
  const fanning = 26;
  const cx = sunCenterX;
  for (let i = -fanning; i <= fanning; i++) {
    const startX = cx - playerX * (width * 0.04) + (i / fanning) * (width * 0.05);
    const endX = cx - playerX * (width * 0.40) + i * (width * 0.08);

    ctx.strokeStyle = 'rgba(255, 0, 127, 0.55)';
    ctx.shadowColor = '#FF007F';
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.moveTo(startX, horizonY);
    ctx.lineTo(endX, height);
    ctx.stroke();
  }
  ctx.restore();
}

// ----------------------------------------------------------------------------
// Roadside Sign Popup Component
// ----------------------------------------------------------------------------

function RoadsideSign({ popup, driveDistance, playerX = 0 }) {
  const rawProgress = (driveDistance - popup.startDist) / 36;
  if (rawProgress > 1.05) return null;

  const p = Math.max(0, Math.min(1, rawProgress));
  const progressY = Math.pow(p, 2.5);

  // Calculate Y as a percentage (horizon is 55%) - Moved up by 3%
  const topPct = 52 + progressY * 45;

  // Scale starts extremely small at horizon
  const scale = Math.max(0.01, progressY * 3.0);

  // Fully opaque until it passes the camera
  const opacity = p > 0.85 ? Math.max(0, 1 - (p - 0.85) * 6.6) : 1;

  // Track the first magenta track line (i=2 and i=-2), shifted by playerX steering
  const isLeft = popup.number % 2 === 0;
  const lineIndex = isLeft ? -2 : 2;

  // X starts at 50% (center) + offset, shifted by playerX steering
  const startX_pct = 50 - playerX * 4 + (lineIndex / 26) * 5;
  const endX_pct = 50 - playerX * 40 + lineIndex * 8;
  const currentX_pct = startX_pct + (endX_pct - startX_pct) * progressY;

  const primaryWaveColor = isLeft ? '#00F0FF' : '#FF007F';
  const waveGlowRgba = isLeft ? 'rgba(0, 240, 255, 0.6)' : 'rgba(255, 0, 127, 0.6)';
  const secondaryGlowRgba = isLeft ? 'rgba(255, 0, 127, 0.35)' : 'rgba(0, 240, 255, 0.35)';

  return (
    <div
      style={{
        position: 'absolute',
        top: `${topPct}%`,
        left: `${currentX_pct}%`,
        transform: `translate(-50%, -100%) scale(${scale})`,
        transformOrigin: '50% 100%',
        opacity,
        zIndex: Math.round(45 + p * 20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'opacity 0.08s linear',
        pointerEvents: opacity > 0.3 ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(8, 2, 28, 0.94) 0%, rgba(22, 4, 42, 0.94) 50%, rgba(3, 14, 36, 0.96) 100%)',
          backdropFilter: 'blur(16px)',
          border: `2.5px solid ${primaryWaveColor}`,
          borderRadius: '10px',
          padding: '1.4rem 1.75rem',
          width: '320px',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: `0 12px 35px rgba(0, 0, 0, 0.8), 0 0 30px ${waveGlowRgba}, 0 0 55px ${secondaryGlowRgba}, inset 0 0 20px ${
            isLeft ? 'rgba(0, 240, 255, 0.18)' : 'rgba(255, 0, 127, 0.18)'
          }`,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Orange to Red Luminous Top Gradient Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #FF9900 0%, #FF4400 50%, #FF0055 100%)',
            boxShadow: '0 0 10px #FF5500, 0 0 16px #FF0044',
          }}
        />

        {/* Clean Sentence Case Affirmation Text */}
        <div
          style={{
            fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
            fontSize: '1.25rem',
            fontWeight: 700,
            lineHeight: 1.35,
            color: '#FFFFFF',
            textShadow: `0 0 15px rgba(255, 255, 255, 0.95), 0 0 30px ${waveGlowRgba}, 0 0 45px ${secondaryGlowRgba}`,
            letterSpacing: '0.01em',
            margin: 0,
            textTransform: 'none',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          }}
        >
          "{popup.text}"
        </div>
      </div>
    </div>
  );
}
