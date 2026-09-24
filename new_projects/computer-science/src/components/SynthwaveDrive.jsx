import React, { useState, useEffect, useRef } from 'react';
import { RearviewMirror } from './RearviewMirror';
import { WaveformVisualizer } from './WaveformVisualizer';
import { SpotifyRadio } from './SpotifyRadio';
import { Sparkles } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

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

  const speedRef = useRef(0);
  const directionRef = useRef(1); // 1 = Forward, -1 = Reverse
  const offsetRef = useRef(0);
  const driveDistanceRef = useRef(0);
  const nextMilestoneDistRef = useRef(28); // Spaced apart, no initial popup at startup
  const milestoneCountRef = useRef(0);

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
        driveDistanceRef.current += 0.45;
      } else if (e.deltaY < 0) {
        // Scroll UP = Drive Reverse
        directionRef.current = -1;
        speedRef.current = Math.min(280, speedRef.current + impulse);
        driveDistanceRef.current -= 0.45;
      }

      const currentDist = Math.abs(driveDistanceRef.current);

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
          targetDist: currentDist + 24
        };

        setPopups((prev) => [...prev, newPopup]);

        const nextGap = Math.floor(Math.random() * 20) + 30;
        nextMilestoneDistRef.current = currentDist + nextGap;
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
        const progress = (driveDistance - p.startDist) / (p.targetDist - p.startDist);
        return progress <= 1.08;
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
      const width = (canvas.width = parent ? parent.clientWidth : window.innerWidth);
      const height = (canvas.height = parent ? parent.clientHeight : window.innerHeight);

      // Decelerate speed smoothly to 0 when not scrolling (Exponential smoothing)
      if (speedRef.current > 0.1) {
        speedRef.current = speedRef.current * 0.95;
      } else {
        speedRef.current = 0;
      }
      
      // Smooth 60fps state updates
      setSpeedMph(Math.round(speedRef.current));
      setDriveDistance(Math.abs(driveDistanceRef.current));

      // Advance grid offset forward or backward depending on directionRef
      if (speedRef.current > 0) {
        const baseVel = speedRef.current * 0.14 * directionRef.current;
        offsetRef.current = (offsetRef.current + baseVel + 40) % 40;
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

      {/* POP-UPS TRAVELING DOWNWARD ALONG THE ROAD FLOOR PLANE */}
      {popups.map((popup) => {
        const totalDist = popup.targetDist - popup.startDist;
        const rawProgress = (driveDistance - popup.startDist) / totalDist;
        const p = Math.max(0, Math.min(1, rawProgress));

        // 3D Road Sign Perspective Calculations: Starts at vanishing point (55%), moves down the screen
        const topPct = 55 + Math.pow(p, 2.5) * 65; 
        const scale = 0.02 + Math.pow(p, 2.5) * 2.5;
        
        // Fade in quickly, fade out as it passes the camera (p > 0.85)
        const opacity = Math.min(1, p * 8) * (p > 0.85 ? Math.max(0, 1 - (p - 0.85) * 6.6) : 1);
        
        const stemHeight = 30 + (popup.id % 50); // Stem height between 30 and 80px
        const stemWidth = 6;

        return (
          <div
            key={popup.id}
            style={{
              position: 'absolute',
              top: `${topPct}%`,
              left: popup.leftPos,
              transform: `translate(-50%, -100%) scale(${scale})`, // Origin at bottom center
              opacity: opacity,
              zIndex: Math.round(45 + p * 20),
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'top 0.08s linear, transform 0.08s linear, opacity 0.08s linear',
              pointerEvents: opacity > 0.3 ? 'auto' : 'none',
            }}
          >
            <div style={{
              background: '#043818',
              border: '3px solid #FFFFFF',
              borderRadius: '8px',
              padding: '1.5rem 2rem',
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
                whiteSpace: 'nowrap'
              }}>
                "{popup.text}"
              </div>
            </div>
            
            {/* The Stem */}
            <div style={{
              width: `${stemWidth}px`,
              height: `${stemHeight}px`,
              background: 'linear-gradient(to right, #666, #aaa, #666)',
              borderLeft: '1px solid #fff',
              borderRight: '1px solid #333',
              boxShadow: '5px 0 15px rgba(0, 0, 0, 0.5)'
            }} />
          </div>
        );
      })}


    </div>
  );
}
