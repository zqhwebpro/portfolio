import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RearviewMirror } from './RearviewMirror';
import { WaveformVisualizer } from './WaveformVisualizer';
import { SpotifyRadio } from './SpotifyRadio';

// ---------------------------------------------------------------------------
// Wikipedia API helpers
// ---------------------------------------------------------------------------

/** Fetch a single random Wikipedia article summary with thumbnail */
async function fetchRandomWikiArticle() {
  const url = 'https://en.wikipedia.org/api/rest_v1/page/random/summary';
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Wiki API ${res.status}`);
  const data = await res.json();
  return {
    title: data.title,
    extract: data.extract_html
      ? data.extract_html.replace(/<[^>]*>/g, '').slice(0, 200)
      : (data.extract || '').slice(0, 200),
    image: data.thumbnail?.source || null,
    url:
      data.content_urls?.desktop?.page ||
      `https://en.wikipedia.org/wiki/${encodeURIComponent(data.title)}`,
  };
}

/** Pre-warm a pool of Wikipedia articles so cards appear instantly */
async function warmPool(pool, target = 6) {
  const needed = target - pool.length;
  if (needed <= 0) return;
  const fetches = Array.from({ length: needed }, fetchRandomWikiArticle);
  const results = await Promise.allSettled(fetches);
  for (const r of results) {
    if (r.status === 'fulfilled') pool.push(r.value);
  }
}

// ---------------------------------------------------------------------------
// F-Zero Tron Bike definitions (module-level constant — never recreated)
// ---------------------------------------------------------------------------
const FZERO_BIKES = [
  { lineIndex: -7,  color: '#00AAFF', exhaust: '#00EEFF', speed: 0.0022, startT: 0.12 }, // Blue Falcon
  { lineIndex: 7,   color: '#FF3300', exhaust: '#FF8800', speed: 0.0019, startT: 0.37 }, // Fire Stingray
  { lineIndex: -15, color: '#00DD55', exhaust: '#88FFBB', speed: 0.0027, startT: 0.06 }, // Wild Goose
  { lineIndex: 15,  color: '#FFD700', exhaust: '#FFFF88', speed: 0.0020, startT: 0.55 }, // Golden Fox
  { lineIndex: 1,   color: '#CC00FF', exhaust: '#FF77FF', speed: 0.0017, startT: 0.44 }, // Death Anchor
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
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);

  // Manage visibility of the center scroll instructions prompt
  useEffect(() => {
    let timer;
    if (speedMph > 2 || autoDrive) {
      setShowScrollPrompt(false);
    } else {
      // Re-show after idle when stopped
      timer = setTimeout(() => {
        setShowScrollPrompt(true);
      }, 1200);
    }
    return () => clearTimeout(timer);
  }, [speedMph, autoDrive]);

  // Wikipedia article pool (pre-fetched)
  const wikiPoolRef = useRef([]);
  const poolLoadingRef = useRef(false);

  // F-Zero Tron bikes (lazy-initialized inside render loop)
  const bikesRef = useRef(null);

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

  // Nearest popup ref for F-key shortcut
  const popupsRef = useRef([]);

  // Keep popupsRef in sync with state
  useEffect(() => {
    popupsRef.current = popups;
  }, [popups]);

  // Pre-warm the Wikipedia pool on mount
  useEffect(() => {
    const load = async () => {
      if (poolLoadingRef.current) return;
      poolLoadingRef.current = true;
      await warmPool(wikiPoolRef.current, 8);
      poolLoadingRef.current = false;
    };
    load();
  }, []);

  // Refill pool whenever it dips below 4
  const refillPool = useCallback(async () => {
    if (poolLoadingRef.current || wikiPoolRef.current.length >= 6) return;
    poolLoadingRef.current = true;
    await warmPool(wikiPoolRef.current, 8);
    poolLoadingRef.current = false;
  }, []);

  const toggleAutoDrive = () => {
    setAutoDrive((prev) => {
      const next = !prev;
      autoDriveRef.current = next;
      return next;
    });
  };

  // Keyboard left/right steering + Up/Down drive + F key to open nearest Wikipedia article
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressedRef.current.left = true;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressedRef.current.right = true;
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        directionRef.current = 1;
        speedRef.current = Math.min(280, speedRef.current + 12);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        if (speedRef.current > 5 && directionRef.current === 1) {
          speedRef.current = Math.max(0, speedRef.current - 16);
        } else {
          directionRef.current = -1;
          speedRef.current = Math.min(280, speedRef.current + 12);
        }
      } else if (e.key === 'f' || e.key === 'F') {
        // Open the most recently spawned (closest/largest) visible popup
        const visible = popupsRef.current.filter((p) => p.url);
        if (visible.length > 0) {
          const latest = visible[visible.length - 1];
          window.open(latest.url, '_blank', 'noopener,noreferrer');
        }
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

    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Touch swipe to scroll / drive interaction
  useEffect(() => {
    let lastTouchY = null;
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        lastTouchY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (!e.touches || !e.touches[0] || lastTouchY === null) return;
      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchY - currentY; // swipe up (standard scroll down) = positive deltaY
      lastTouchY = currentY;

      const deltaMag = Math.min(Math.abs(deltaY), 80);
      const impulse = deltaMag * 0.45;

      if (deltaY > 0) {
        directionRef.current = 1;
        speedRef.current = Math.min(280, speedRef.current + impulse);
      } else if (deltaY < 0) {
        directionRef.current = -1;
        speedRef.current = Math.min(280, speedRef.current + impulse);
      }
    };

    const handleTouchEnd = () => {
      lastTouchY = null;
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
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
        speedRef.current = speedRef.current + (30 - speedRef.current) * 0.05; // Ease to 30 mph
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

      // Spawn a new Wikipedia card popup
      if (currentDist >= nextMilestoneDistRef.current) {
        milestoneCountRef.current += 1;

        // Pull from pool or use a placeholder
        let article = wikiPoolRef.current.shift();
        if (!article) {
          article = {
            title: 'Wikipedia',
            extract: 'Loading random article...',
            image: null,
            url: 'https://en.wikipedia.org/wiki/Special:Random',
          };
        }

        // Refill the pool asynchronously
        refillPool();

        const startDist = Math.ceil(currentDist);
        const newPopup = {
          id: Date.now() + Math.random(),
          number: milestoneCountRef.current,
          startDist,
          targetDist: startDist + 36,
          title: article.title,
          extract: article.extract,
          image: article.image,
          url: article.url,
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

      // 4. F-Zero Tron bikes riding the pink perspective lanes
      if (!bikesRef.current) {
        bikesRef.current = FZERO_BIKES.map(cfg => ({
          ...cfg,
          t: cfg.startT,
          trail: [],
        }));
      }
      updateAndDrawBikes(
        ctx, width, height, horizonY, sunCenterX,
        bikesRef.current, playerXRef.current, speedRef.current
      );

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [refillPool]);

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
        id="synth-controls-hud"
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '1.5rem',
          zIndex: 35,
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          background: 'rgba(10, 2, 22, 0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 240, 255, 0.35)',
          borderRadius: '8px',
          padding: '0.45rem 0.95rem',
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.68rem',
          letterSpacing: '0.08em',
          pointerEvents: 'none',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.7), inset 0 0 10px rgba(0, 240, 255, 0.1)',
          maxWidth: 'calc(100vw - 3rem)',
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#FFE600', fontWeight: 800 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle' }}>
            <rect x="5" y="2" width="14" height="20" rx="7" />
            <path d="M12 6v4" />
          </svg>
          SCROLL ↓ / ↑
        </span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
        <span style={{ color: '#FFFFFF' }}>Drive / Reverse</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
        <span style={{ color: '#00F0FF', fontWeight: 800 }}>← / → or A / D</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
        <span>Steer</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
        <span style={{ color: '#FF007F', fontWeight: 800 }}>F</span>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
        <span>Open Article</span>
      </div>

      {/* Center "Scroll to Drive" Arcade Instructions Callout */}
      <div
        id="scroll-to-drive-banner"
        style={{
          position: 'absolute',
          bottom: '22%',
          left: '50%',
          transform: showScrollPrompt ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(16px)',
          opacity: showScrollPrompt ? 1 : 0,
          pointerEvents: showScrollPrompt ? 'auto' : 'none',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 38,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          background: 'linear-gradient(135deg, rgba(8, 2, 26, 0.94) 0%, rgba(22, 4, 42, 0.95) 50%, rgba(3, 14, 36, 0.96) 100%)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1.5px solid rgba(0, 240, 255, 0.65)',
          borderRadius: '16px',
          padding: '1.1rem 1.6rem',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 240, 255, 0.35), inset 0 0 20px rgba(255, 0, 127, 0.15)',
          maxWidth: '90vw',
          textAlign: 'center',
        }}
      >
        {/* Animated Mouse Scroll Icon with downward pulsing dot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '26px',
              height: '40px',
              borderRadius: '13px',
              border: '2px solid #00F0FF',
              boxShadow: '0 0 12px rgba(0, 240, 255, 0.7)',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: '4px',
                height: '8px',
                borderRadius: '2px',
                background: '#FF007F',
                boxShadow: '0 0 8px #FF007F',
                animation: 'mouseScrollBounce 1.4s infinite ease-in-out',
              }}
            />
          </div>

          <div style={{ textAlign: 'left' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.62rem',
                fontWeight: 700,
                color: '#FFE600',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textShadow: '0 0 8px rgba(255, 230, 0, 0.6)',
              }}
            >
              ◈ SPEED CONTROL ◈
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
                fontSize: '1.3rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                color: '#FFFFFF',
                textShadow: '0 0 16px rgba(0, 240, 255, 0.8), 0 0 24px rgba(255, 0, 127, 0.5)',
                lineHeight: 1.2,
              }}
            >
              SCROLL TO DRIVE
            </div>
          </div>
        </div>

        {/* Actionable instructions */}
        <div
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.72rem',
            color: 'rgba(230, 240, 255, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            marginTop: '2px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ color: '#00F0FF', fontWeight: 800 }}>Scroll Down (↓)</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
            <span>Accelerate Forward</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ color: '#FF007F', fontWeight: 800 }}>Scroll Up (↑)</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>→</span>
            <span>Drive in Reverse</span>
          </div>
        </div>

        {/* Fallback / quick options */}
        <div
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.62rem',
            color: 'rgba(255, 255, 255, 0.55)',
            letterSpacing: '0.04em',
            borderTop: '1px solid rgba(0, 240, 255, 0.2)',
            paddingTop: '6px',
            width: '100%',
          }}
        >
          Use mouse wheel, touchpad swipe, or click{' '}
          <span
            onClick={toggleAutoDrive}
            style={{
              color: '#00F0FF',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            Auto Drive: ON
          </span>
        </div>
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

      {/* Wikipedia Article Cards traveling down the road */}
      {popups.map((popup) => (
        <WikiCard
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
// F-Zero Tron Bike — Canvas Helpers
// ----------------------------------------------------------------------------

/** Map a bike's (lineIndex, t) to screen (x, y) using the same perspective formula as drawGridFloor */
function getBikePosOnLine(width, horizonY, height, sunCenterX, lineIndex, t, playerX) {
  const fanning = 26;
  const cx = sunCenterX;
  const startX = cx - playerX * (width * 0.04) + (lineIndex / fanning) * (width * 0.05);
  const endX   = cx - playerX * (width * 0.40) + lineIndex * (width * 0.08);
  const progressY = Math.pow(Math.max(0, Math.min(1, t)), 2.5);
  return {
    x: startX + (endX - startX) * progressY,
    y: horizonY + progressY * (height - horizonY),
    progressY,
  };
}

/** Update every bike's position and draw it + its speed trail onto ctx */
function updateAndDrawBikes(ctx, width, height, horizonY, sunCenterX, bikes, playerX, speed) {
  for (const bike of bikes) {
    // Always crawl forward; accelerate slightly with player speed
    bike.t += bike.speed + Math.max(0, speed) * 0.00012;
    if (bike.t > 0.93) {
      bike.t = 0.03 + Math.random() * 0.07;
      bike.trail = [];
    }

    const { x, y, progressY } = getBikePosOnLine(
      width, horizonY, height, sunCenterX, bike.lineIndex, bike.t, playerX
    );
    if (y < horizonY) continue; // clip above horizon

    const fadeIn = Math.min(1, bike.t * 6);
    const scale  = Math.pow(progressY, 0.72) * 0.9;

    // Store trail point
    bike.trail.push({ x, y });
    if (bike.trail.length > 28) bike.trail.shift();

    // --- Draw speed / light trail ---
    ctx.save();
    for (let i = 1; i < bike.trail.length; i++) {
      const ratio = i / bike.trail.length;
      const a = ratio * ratio * 0.85 * fadeIn;
      ctx.globalAlpha = a;
      ctx.strokeStyle  = bike.exhaust;
      ctx.lineWidth    = Math.max(0.4, ratio * progressY * 3.8);
      ctx.shadowColor  = bike.color;
      ctx.shadowBlur   = 8;
      ctx.beginPath();
      ctx.moveTo(bike.trail[i - 1].x, bike.trail[i - 1].y);
      ctx.lineTo(bike.trail[i].x,     bike.trail[i].y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();

    // --- Draw bike body ---
    if (scale > 0.03 && fadeIn > 0.08) {
      const angle = Math.atan2(horizonY - y, sunCenterX - x); // points toward vanishing point
      ctx.save();
      ctx.globalAlpha = Math.min(1, fadeIn);
      drawFZeroBike(ctx, x, y, scale, bike.color, bike.exhaust, angle);
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }
}

/**
 * Draw a single F-Zero-inspired Tron machine.
 * The nose (+x axis) points toward angle (vanishing point / horizon).
 * Canonical size: ~44px × 18px at scale 1.
 */
function drawFZeroBike(ctx, x, y, scale, color, exhaustColor, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle); // nose toward horizon = forward
  ctx.scale(scale, scale);

  // Outer glow aura
  ctx.shadowColor = color;
  ctx.shadowBlur  = 22;

  // ── Main hull (elongated ovoid) ────────────────────────────────────────
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(22, 0);
  ctx.bezierCurveTo(16, -5.5,  -8, -5.5, -18, 0);
  ctx.bezierCurveTo(-8,  5.5,  16,  5.5,  22, 0);
  ctx.fill();

  // Hull edge highlight
  ctx.strokeStyle = 'rgba(255,255,255,0.28)';
  ctx.lineWidth   = 0.7;
  ctx.shadowBlur  = 0;
  ctx.beginPath();
  ctx.moveTo(20, -2);
  ctx.bezierCurveTo(12, -5.5, -6, -5.5, -16, -1);
  ctx.stroke();

  // ── Cockpit canopy ──────────────────────────────────────────────────────
  ctx.shadowColor = 'rgba(160,240,255,0.7)';
  ctx.shadowBlur  = 6;
  ctx.fillStyle   = 'rgba(155, 235, 255, 0.90)';
  ctx.beginPath();
  ctx.ellipse(6, 0, 7.5, 3.8, 0, 0, Math.PI * 2);
  ctx.fill();
  // glare
  ctx.fillStyle = 'rgba(255,255,255,0.52)';
  ctx.beginPath();
  ctx.ellipse(7.5, -1.4, 3.2, 1.4, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // ── Left stabiliser wing ────────────────────────────────────────────────
  ctx.shadowColor = color;
  ctx.shadowBlur  = 12;
  ctx.fillStyle   = color;
  ctx.beginPath();
  ctx.moveTo( 2,  -5);
  ctx.lineTo(-10, -17);
  ctx.lineTo(-18, -13);
  ctx.lineTo( -6,  -4);
  ctx.closePath();
  ctx.fill();

  // ── Right stabiliser wing ───────────────────────────────────────────────
  ctx.beginPath();
  ctx.moveTo( 2,   5);
  ctx.lineTo(-10,  17);
  ctx.lineTo(-18,  13);
  ctx.lineTo( -6,   4);
  ctx.closePath();
  ctx.fill();

  // Wing accent striping
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth   = 0.9;
  ctx.shadowBlur  = 0;
  ctx.beginPath(); ctx.moveTo(0, -5.5); ctx.lineTo(-13, -15); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,  5.5); ctx.lineTo(-13,  15); ctx.stroke();

  // ── Nose bumper (front sensor) ──────────────────────────────────────────
  ctx.shadowColor = 'rgba(255,255,255,0.9)';
  ctx.shadowBlur  = 10;
  ctx.fillStyle   = 'rgba(255,255,255,0.95)';
  ctx.beginPath();
  ctx.arc(22, 0, 3.0, 0, Math.PI * 2);
  ctx.fill();

  // ── Twin engine exhausts ────────────────────────────────────────────────
  ctx.shadowColor = exhaustColor;
  ctx.shadowBlur  = 24;
  // top exhaust pod
  ctx.fillStyle = exhaustColor;
  ctx.beginPath();
  ctx.ellipse(-18, -2.6, 4.0, 2.1, 0.1, 0, Math.PI * 2);
  ctx.fill();
  // bottom exhaust pod
  ctx.beginPath();
  ctx.ellipse(-18,  2.6, 4.0, 2.1, -0.1, 0, Math.PI * 2);
  ctx.fill();
  // bright exhaust cores
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.beginPath(); ctx.ellipse(-18, -2.6, 1.8, 0.9, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(-18,  2.6, 1.8, 0.9, 0, 0, Math.PI * 2); ctx.fill();

  ctx.restore();
}

// ----------------------------------------------------------------------------
// Wikipedia Article Card Popup Component
// ----------------------------------------------------------------------------

function WikiCard({ popup, driveDistance, playerX = 0 }) {
  const rawProgress = (driveDistance - popup.startDist) / 36;
  if (rawProgress > 1.05) return null;

  const p = Math.max(0, Math.min(1, rawProgress));
  const progressY = Math.pow(p, 2.5);

  const topPct = 52 + progressY * 45;
  const scale = Math.max(0.01, progressY * 3.0);
  const opacity = p > 0.85 ? Math.max(0, 1 - (p - 0.85) * 6.6) : 1;

  const isLeft = popup.number % 2 === 0;
  const lineIndex = isLeft ? -2 : 2;
  const startX_pct = 50 - playerX * 4 + (lineIndex / 26) * 5;
  const endX_pct = 50 - playerX * 40 + lineIndex * 8;
  const currentX_pct = startX_pct + (endX_pct - startX_pct) * progressY;

  const primaryColor = isLeft ? '#00F0FF' : '#FF007F';
  const waveGlow = isLeft ? 'rgba(0, 240, 255, 0.6)' : 'rgba(255, 0, 127, 0.6)';
  const secondaryGlow = isLeft ? 'rgba(255, 0, 127, 0.35)' : 'rgba(0, 240, 255, 0.35)';
  const innerGlow = isLeft ? 'rgba(0, 240, 255, 0.18)' : 'rgba(255, 0, 127, 0.18)';
  const boxShadowBase = `0 12px 35px rgba(0,0,0,0.8), 0 0 30px ${waveGlow}, 0 0 55px ${secondaryGlow}, inset 0 0 20px ${innerGlow}`;
  const boxShadowHover = `0 16px 45px rgba(0,0,0,0.9), 0 0 45px ${waveGlow}, 0 0 75px ${secondaryGlow}, inset 0 0 25px ${innerGlow}`;

  const isClickable = opacity > 0.3 && popup.url;

  const handleClick = () => {
    if (popup.url) window.open(popup.url, '_blank', 'noopener,noreferrer');
  };

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
        transition: 'opacity 0.08s linear, transform 0.12s ease-out',
        pointerEvents: isClickable ? 'auto' : 'none',
        cursor: isClickable ? 'pointer' : 'default',
      }}
      onClick={handleClick}
      title={popup.url ? `Open "${popup.title}" on Wikipedia` : undefined}
    >
      <div
        style={{
          background:
            'linear-gradient(135deg, rgba(8,2,28,0.96) 0%, rgba(22,4,42,0.96) 50%, rgba(3,14,36,0.98) 100%)',
          backdropFilter: 'blur(16px)',
          border: `2.5px solid ${primaryColor}`,
          borderRadius: '14px',
          width: '340px',
          maxWidth: '88vw',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: boxShadowBase,
          position: 'relative',
          transition: 'box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = boxShadowHover; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = boxShadowBase; }}
      >
        {/* Top accent line */}
        <div
          style={{
            height: '4px',
            background: 'linear-gradient(90deg, #FF9900 0%, #FF4400 50%, #FF0055 100%)',
            boxShadow: '0 0 10px #FF5500, 0 0 16px #FF0044',
            flexShrink: 0,
          }}
        />

        {/* Article thumbnail image */}
        {popup.image && (
          <div
            style={{
              width: '100%',
              height: '160px',
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            <img
              src={popup.image}
              alt={popup.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(0.9) saturate(1.1)',
              }}
              onError={(e) => {
                e.currentTarget.parentElement.style.display = 'none';
              }}
            />
            {/* Gradient overlay fading into card body */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(to bottom, transparent, rgba(8,2,28,0.96))',
              }}
            />
          </div>
        )}

        {/* Text body */}
        <div style={{ padding: '1rem 1.2rem 1.1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {/* Wikipedia badge + open hint */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.6rem',
                fontWeight: 700,
                color: primaryColor,
                textShadow: `0 0 8px ${primaryColor}`,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              ◈ Wikipedia
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.58rem',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.06em',
              }}
            >
              click or press F ↗
            </span>
          </div>

          {/* Article title */}
          <div
            style={{
              fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
              fontSize: '1.15rem',
              fontWeight: 700,
              lineHeight: 1.25,
              color: '#FFFFFF',
              textShadow: `0 0 15px rgba(255,255,255,0.9), 0 0 30px ${waveGlow}`,
              letterSpacing: '0.01em',
            }}
          >
            {popup.title}
          </div>

          {/* Article extract / description */}
          {popup.extract && (
            <div
              style={{
                fontFamily: 'var(--font-sans, sans-serif)',
                fontSize: '0.78rem',
                fontWeight: 400,
                lineHeight: 1.5,
                color: 'rgba(220, 220, 255, 0.82)',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {popup.extract}
            </div>
          )}
        </div>
      </div>

      {/* Sign post pole */}
      <div
        style={{
          width: '3px',
          height: '32px',
          background: `linear-gradient(to bottom, ${primaryColor}, rgba(0,0,0,0))`,
          boxShadow: `0 0 6px ${primaryColor}`,
          borderRadius: '0 0 3px 3px',
        }}
      />
    </div>
  );
}
