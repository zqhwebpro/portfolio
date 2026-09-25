import React, { useState, useEffect, useRef } from 'react';
import { RearviewMirror } from './RearviewMirror';
import { WaveformVisualizer } from './WaveformVisualizer';
import { SpotifyRadio } from './SpotifyRadio';
import { Sparkles } from 'lucide-react';


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

const HORIZONTAL_POSITIONS = ['25%', '50%', '75%'];

export function SynthwaveDrive() {
  const canvasRef = useRef(null);

  // Infinite Driving Scroll State
  const [speedMph, setSpeedMph] = useState(0);
  const [driveDistance, setDriveDistance] = useState(0);
  const [popups, setPopups] = useState([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);
  const [dimensions, setDimensions] = useState({ w: 1000, h: 800 });
  const [autoDrive, setAutoDrive] = useState(false);

  const autoDriveRef = useRef(false);
  const speedRef = useRef(0);
  const directionRef = useRef(1); // 1 = Forward, -1 = Reverse
  const offsetRef = useRef(0);
  const driveDistanceRef = useRef(0);
  const nextMilestoneDistRef = useRef(28); // Spaced apart, no initial popup at startup
  const milestoneCountRef = useRef(0);

  const toggleAutoDrive = () => {
    setAutoDrive(prev => {
      autoDriveRef.current = !prev;
      return !prev;
    });
  };

  // Handle Wheel / Scroll Interaction (Smooth fluid momentum calculation)
  useEffect(() => {
    const handleWheel = (e) => {
      // Smooth continuous velocity impulse based on scroll delta
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

    const container = document.getElementById('synthwave-drive-viewport');
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
        const progress = (driveDistance - p.startDist) / 18;
        return progress <= 1.05;
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
      canvas.width = width;
      canvas.height = height;
      
      setDimensions(prev => {
        if (prev.w !== width || prev.h !== height) return { w: width, h: height };
        return prev;
      });

      if (autoDriveRef.current) {
        directionRef.current = 1;
        speedRef.current = speedRef.current + (120 - speedRef.current) * 0.05; // Ease towards 120 mph
      } else {
        // Decelerate speed smoothly to 0 when not scrolling (Exponential smoothing)
        if (speedRef.current > 0.1) {
          speedRef.current = speedRef.current * 0.95;
        } else {
          speedRef.current = 0;
        }
      }
      
      // Smooth 60fps state updates
      setSpeedMph(Math.round(speedRef.current));
      setDriveDistance(Math.abs(driveDistanceRef.current));

      // Advance grid offset forward or backward depending on directionRef
      if (speedRef.current > 0) {
        const baseVel = speedRef.current * 0.14 * directionRef.current;
        offsetRef.current = (offsetRef.current + baseVel + 40) % 40;
        driveDistanceRef.current += (baseVel / 40);
      }

      const currentDist = Math.abs(driveDistanceRef.current);

      // Trigger new affirmation popup far down the road horizon when reaching distance milestones
      if (currentDist >= nextMilestoneDistRef.current) {
        milestoneCountRef.current += 1;
        const randomAff = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];

        // Snap startDist to the next integer so it perfectly rides a blue grid line!
        const startDist = Math.ceil(currentDist);

        const newPopup = {
          id: Date.now() + Math.random(),
          text: randomAff,
          number: milestoneCountRef.current,
          startDist: startDist,
          targetDist: startDist + 18 // exactly 18 grid squares to match numH
        };

        setPopups((prev) => [...prev, newPopup]);

        const nextGap = Math.floor(Math.random() * 15) + 20;
        nextMilestoneDistRef.current = startDist + nextGap;
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

      // 2. SYNTHWAVE SUN (Clean uninterrupted neon gradient)
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
      
      // Draw a solid line exactly at the horizon so it anchors the perspective
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.8)';
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();

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

      {/* 1. TOP CENTER REARVIEW MIRROR */}
      <RearviewMirror speedMph={speedMph} />

      {/* 2. LIVE WAVEFORM SCOPE & HORIZON SOUND WAVES ALONG MOUNTAINS */}
      <WaveformVisualizer isAudioPlaying={isAudioPlaying} speedMph={speedMph} />

      {/* 3. DIRECT SPOTIFY EMBED PLAYLIST (WITHOUT EXTRA CONTAINER OR BUTTONS) */}
      <SpotifyRadio onAudioStateChange={(active) => setIsAudioPlaying(active)} />

      {/* 4. AUTO DRIVE TOGGLE */}
      <button
        onClick={toggleAutoDrive}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 40,
          background: autoDrive ? 'rgba(0, 240, 255, 0.2)' : 'rgba(10, 2, 20, 0.75)',
          border: `1px solid ${autoDrive ? '#00F0FF' : 'rgba(0, 240, 255, 0.3)'}`,
          color: autoDrive ? '#00F0FF' : 'rgba(255,255,255,0.7)',
          padding: '0.75rem 1.25rem',
          borderRadius: '8px',
          fontFamily: 'var(--font-sans, sans-serif)',
          fontWeight: 'bold',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
          boxShadow: autoDrive ? '0 0 15px rgba(0, 240, 255, 0.4)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        {autoDrive ? 'Auto Drive: ON' : 'Auto Drive: OFF'}
      </button>

      {/* POP-UPS TRAVELING DOWNWARD ALONG THE ROAD FLOOR PLANE */}
      {popups.map((popup) => {
        const rawProgress = (driveDistance - popup.startDist) / 18;
        const p = Math.max(0, Math.min(1, rawProgress));

        // Use exact pixel dimensions tracked by component
        const w = dimensions.w;
        const h = dimensions.h;
        const horizonY = h * 0.55;

        const progressY = Math.pow(p, 2.5);

        // Calculate Y as a percentage (horizon is 55%)
        const topPct = 55 + progressY * 45; 
        
        // Scale starts extremely small at horizon
        const scale = Math.max(0.01, progressY * 3.0); 
        
        // Fully opaque until it passes the camera
        const opacity = p > 0.85 ? Math.max(0, 1 - (p - 0.85) * 6.6) : 1;
        
        const stemHeight = 20 + (popup.id % 150); // Stem height between 20 and 170px
        const stemWidth = 6;

        // Calculate X position matching the pink perspective lines
        const isLeft = (popup.number % 2) === 0;
        
        // Precisely track the first magenta track line (i=2 and i=-2)
        const lineIndex = isLeft ? -2 : 2;
        
        // X starts at 50% (center) + offset
        const startX_pct = 50 + (lineIndex / 26) * 5;
        const endX_pct = 50 + lineIndex * 8;
        const currentX_pct = startX_pct + (endX_pct - startX_pct) * progressY;

        return (
          <div
            key={popup.id}
            style={{
              position: 'absolute',
              top: `${topPct}%`,
              left: `${currentX_pct}%`,
              transform: `translate(-50%, -100%) scale(${scale})`, // Origin at bottom center
              transformOrigin: '50% 100%',
              opacity: opacity,
              zIndex: Math.round(45 + p * 20),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'opacity 0.08s linear',
              pointerEvents: opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div style={{
              background: '#043818',
              border: '3px solid #FFFFFF',
              borderRadius: '8px',
              padding: '1.5rem 2rem',
              width: '320px',
              height: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 10px 30px rgba(0, 240, 255, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.3)',
              textAlign: 'center',
              position: 'relative'
            }}>
              {/* Clean Sentence Case Affirmation Text (No All Caps, Explicit textTransform none) */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                lineHeight: 1.35,
                color: '#FFFFFF',
                textShadow: '0 0 15px rgba(255, 255, 255, 0.95), 0 0 35px rgba(0, 240, 255, 0.9), 0 0 50px rgba(0, 240, 255, 0.7)',
                letterSpacing: '0.01em',
                margin: 0,
                textTransform: 'none',
                whiteSpace: 'normal',
                wordWrap: 'break-word'
              }}>
                "{popup.text}"
              </div>
            </div>
          </div>
        );
      })}


    </div>
  );
}
