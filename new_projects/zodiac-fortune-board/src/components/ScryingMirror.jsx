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
      const w = canvas.width;
      const h = canvas.height;

      // Draw bones
      const connections = HandLandmarker.HAND_CONNECTIONS || [
        [0,1],[1,2],[2,3],[3,4], // Thumb
        [0,5],[5,6],[6,7],[7,8], // Index
        [5,9],[9,10],[10,11],[11,12], // Middle
        [9,13],[13,14],[14,15],[15,16], // Ring
        [13,17],[17,18],[18,19],[19,20],[0,17] // Pinky & Palm
      ];

      ctx.save();
      ctx.lineWidth = 2;
      ctx.strokeStyle = activeSpell === 'PINCH' 
        ? 'rgba(255, 215, 0, 0.9)' 
        : activeSpell === 'PEACE'
        ? 'rgba(0, 255, 234, 0.9)'
        : 'rgba(168, 85, 247, 0.8)';
      ctx.shadowBlur = 10;
      ctx.shadowColor = ctx.strokeStyle;

      connections.forEach(([i, j]) => {
        const p1 = rawLandmarks[i];
        const p2 = rawLandmarks[j];
        if (p1 && p2) {
          // Note: In CSS video is scaleX(-1), but inside canvas we draw in same coordinates as video element
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
    }
  }, [rawLandmarks, isCameraActive, activeSpell]);

  const getSpellLabel = () => {
    switch (activeSpell) {
      case 'PINCH':
        return { label: '🤏 Pinch of Fate', desc: 'Charging Cosmic Prophecy' };
      case 'POINTING':
        return { label: '✨ Celestial Wand', desc: 'Targeting Zodiac Constellations' };
      case 'OPEN_PALM':
        return { label: '✋ Celestial Supernova', desc: 'Illuminating Astrological Aspects' };
      case 'PEACE':
        return { label: '✌️ Elemental Shift', desc: 'Transmuting Cosmic Elements' };
      case 'FIST':
        return { label: '✊ Arcane Seal', desc: 'Condensing Cosmic Orb' };
      case 'CHANNELING':
        return { label: '🔮 Channeling Aura', desc: 'Hand In Astral Plane' };
      default:
        return { label: '👁️ Scrying Hand', desc: 'Show Hand To Cast Spells' };
    }
  };

  const spellInfo = getSpellLabel();

  return (
    <div className="scrying-mirror-container">
      <div className={`scrying-mirror ${isCameraActive ? 'active' : ''}`}>
        {/* Mystic Portal Frame */}
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
              width={200}
              height={200}
            />
          )}
          {!isCameraActive && (
            <div className="mirror-portal-placeholder">
              <div className="portal-eye">🔮</div>
              <p className="portal-caption">The Arcane Scrying Glass</p>
              <button
                onClick={onToggleCamera}
                disabled={!isReady}
                className="portal-invoke-btn"
              >
                {isReady ? '✨ Invoke Mystic Vision' : '⏳ Transmuting Wasm...'}
              </button>
            </div>
          )}
        </div>

        {isCameraActive && (
          <button 
            className="mirror-close-btn" 
            onClick={onToggleCamera} 
            title="Close Scrying Glass"
          >
            ✕
          </button>
        )}
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
          <span>⚠️ {cameraError}</span>
        </div>
      )}
    </div>
  );
}
