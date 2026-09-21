import React, { useEffect, useRef } from 'react';
import { HandLandmarker } from '@mediapipe/tasks-vision';

export function ScryingMirror({
  videoRef,
  isCameraActive,
  isReady,
  activeSpell,
  rawLandmarks,
  onToggleCamera,
  cameraError
}) {
  const overlayCanvasRef = useRef(null);

  // Render glowing starlight skeleton over the mirrored video
  useEffect(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas || !isCameraActive) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (rawLandmarks && rawLandmarks.length >= 21) {
      try {
        const w = canvas.width;
        const h = canvas.height;

        // Use MediaPipe HAND_CONNECTIONS which are objects { start, end }
        const connections = HandLandmarker.HAND_CONNECTIONS || [
          { start: 0, end: 1 }, { start: 1, end: 2 }, { start: 2, end: 3 }, { start: 3, end: 4 },
          { start: 0, end: 5 }, { start: 5, end: 6 }, { start: 6, end: 7 }, { start: 7, end: 8 },
          { start: 5, end: 9 }, { start: 9, end: 10 }, { start: 10, end: 11 }, { start: 11, end: 12 },
          { start: 9, end: 13 }, { start: 13, end: 14 }, { start: 14, end: 15 }, { start: 15, end: 16 },
          { start: 13, end: 17 }, { start: 0, end: 17 }, { start: 17, end: 18 }, { start: 18, end: 19 }, { start: 19, end: 20 }
        ];

        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = activeSpell === 'PINCH' 
          ? 'rgba(255, 215, 0, 0.9)' 
          : activeSpell === 'PEACE'
          ? 'rgba(0, 255, 234, 0.9)'
          : 'rgba(168, 85, 247, 0.85)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = ctx.strokeStyle;

        connections.forEach((conn) => {
          const start = conn.start !== undefined ? conn.start : conn[0];
          const end = conn.end !== undefined ? conn.end : conn[1];
          const p1 = rawLandmarks[start];
          const p2 = rawLandmarks[end];
          if (p1 && p2) {
            ctx.beginPath();
            ctx.moveTo(p1.x * w, p1.y * h);
            ctx.lineTo(p2.x * w, p2.y * h);
            ctx.stroke();
          }
        });

        // Draw luminous star joints
        rawLandmarks.forEach((lm, idx) => {
          const isTip = [4, 8, 12, 16, 20].includes(idx);
          ctx.beginPath();
          ctx.arc(lm.x * w, lm.y * h, isTip ? 4.5 : 2.5, 0, Math.PI * 2);
          ctx.fillStyle = isTip ? '#ffffff' : 'rgba(0, 255, 234, 0.9)';
          ctx.shadowBlur = isTip ? 14 : 6;
          ctx.shadowColor = '#00ffea';
          ctx.fill();
        });

        ctx.restore();
      } catch (renderErr) {
        console.warn("Error rendering starlight skeleton:", renderErr);
      }
    }
  }, [rawLandmarks, isCameraActive, activeSpell]);

  const getSpellLabel = () => {
    switch (activeSpell) {
      case 'PINCH':
        return { label: 'Pinch of Fate', desc: 'Channeling Cosmic Prophecy' };
      case 'POINTING':
        return { label: 'Celestial Wand', desc: 'Targeting Zodiac Constellations' };
      case 'OPEN_PALM':
        return { label: 'Celestial Supernova', desc: 'Illuminating Astrological Aspects' };
      case 'PEACE':
        return { label: 'Elemental Shift', desc: 'Transmuting Cosmic Elements' };
      case 'FIST':
        return { label: 'Arcane Seal', desc: 'Condensing Cosmic Orb' };
      case 'CHANNELING':
        return { label: 'Channeling Aura', desc: 'Hand in Astral Plane' };
      default:
        return { label: 'Scrying Glass', desc: 'Show Hand to Cast Spells' };
    }
  };

  const spellInfo = getSpellLabel();

  return (
    <div className="scrying-mirror-container">
      {/* Entire circle is a clickable button/orb */}
      <div 
        className={`scrying-mirror ${isCameraActive ? 'active' : 'clickable-orb'}`}
        onClick={onToggleCamera}
        role="button"
        tabIndex={0}
        aria-label={isCameraActive ? "Disconnect Scrying Camera" : "Connect Scrying Camera"}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggleCamera();
          }
        }}
      >
        {/* Mystic Portal Frame Ring */}
        <div className="mirror-rune-ring"></div>

        <div className="mirror-glass">
          <video
            ref={videoRef}
            className="mirror-video"
            autoPlay
            playsInline
            muted
            style={{ display: isCameraActive ? 'block' : 'none' }}
          />

          {isCameraActive && (
            <canvas
              ref={overlayCanvasRef}
              className="mirror-overlay-canvas"
              width={210}
              height={210}
            />
          )}

          {!isCameraActive && (
            <div className="mirror-portal-placeholder">
              <span className="portal-caption">Scrying Glass</span>
              <span className="portal-subaction">
                {isReady ? 'Click to Awaken' : 'Transmuting Runes...'}
              </span>
            </div>
          )}

          {isCameraActive && (
            <div className="mirror-active-overlay" title="Click anywhere to disconnect">
              <span className="mirror-status-dot"></span>
            </div>
          )}
        </div>
      </div>

      {/* Real-Time Spell HUD */}
      {isCameraActive && (
        <div className={`spell-ribbon-hud ${activeSpell ? 'glow' : ''}`}>
          <div className="spell-ribbon-title">{spellInfo.label}</div>
          <div className="spell-ribbon-desc">{spellInfo.desc}</div>
        </div>
      )}

      {cameraError && (
        <div className="camera-notice-bubble">
          <span>{cameraError}</span>
        </div>
      )}
    </div>
  );
}
