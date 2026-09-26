import React, { useEffect, useRef } from 'react';

export function RearviewMirror({ speedMph, popups = [], driveDistance = 0, playerX = 0 }) {
  const canvasRef = useRef(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const width = (canvas.width = canvas.clientWidth || 380);
      const height = (canvas.height = canvas.clientHeight || 100);

      const horizonY = height * 0.45;

      // Grid moves in reverse for rear mirror reflection ONLY when speedMph > 0
      if (Math.abs(speedMph) > 0) {
        offsetRef.current = (offsetRef.current - (0.6 + speedMph * 0.06) + 40) % 40;
      }

      // 1. Deep Space Sky & Reflection Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#0a0218');
      skyGrad.addColorStop(0.5, '#2e0842');
      skyGrad.addColorStop(1, '#05010b');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant Rear Mountain Silhouettes (Darker Silhouette)
      const mountainShift = -playerX * 6;
      ctx.fillStyle = '#06010d';
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width * 0.12 + mountainShift, horizonY - 24);
      ctx.lineTo(width * 0.25 + mountainShift, horizonY - 10);
      ctx.lineTo(width * 0.42 + mountainShift, horizonY - 32);
      ctx.lineTo(width * 0.58 + mountainShift, horizonY - 14);
      ctx.lineTo(width * 0.75 + mountainShift, horizonY - 35);
      ctx.lineTo(width * 0.88 + mountainShift, horizonY - 16);
      ctx.lineTo(width, horizonY);
      ctx.fill();

      // Rear 3D Grid Floor
      ctx.fillStyle = '#030007';
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // Horizontal lines receding backward
      ctx.lineWidth = 1.2;
      const numH = 10;
      for (let i = 0; i < numH; i++) {
        const progress = (((i + offsetRef.current / 40) % numH) + numH) % numH / numH;
        const py = horizonY + Math.pow(progress, 2.2) * (height - horizonY);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.3 + progress * 0.7})`;
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = progress * 6;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
        ctx.stroke();
      }

      // Fan vertical lines shifting with playerX steering
      const fanning = 16;
      const cx = width / 2;
      for (let i = -fanning; i <= fanning; i++) {
        const startX = cx - playerX * (width * 0.04) + (i / fanning) * 16;
        const endX = cx - playerX * (width * 0.35) + i * (width * 0.08);
        ctx.strokeStyle = 'rgba(255, 0, 127, 0.5)';
        ctx.shadowColor = '#FF007F';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.moveTo(startX, horizonY);
        ctx.lineTo(endX, height);
        ctx.stroke();
      }

      // Sleek glass reflection glare
      const sheen = ctx.createLinearGradient(0, 0, width, height);
      sheen.addColorStop(0, 'rgba(0, 240, 255, 0.22)');
      sheen.addColorStop(0.35, 'rgba(255, 255, 255, 0.12)');
      sheen.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [speedMph, playerX]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Glass Rearview Mirror Housing Flush at Very Top */}
      <div
        style={{
          width: 'clamp(320px, 45vw, 440px)',
          height: '98px',
          background: 'rgba(5, 1, 14, 0.92)',
          backdropFilter: 'blur(14px)',
          border: '1.8px solid rgba(0, 240, 255, 0.75)',
          borderTop: 'none',
          borderRadius: '0 0 36px 36px',
          boxShadow: '0 4px 35px rgba(0, 240, 255, 0.45), inset 0 0 20px rgba(0, 240, 255, 0.2)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Mirror Canvas */}
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

        {/* Popups reflecting in the rearview mirror */}
        {popups &&
          popups.map((popup) => {
            const rawProgress = (driveDistance - popup.startDist) / 36;

            // Only show in the rearview mirror AFTER they pass the camera
            if (rawProgress < 0.95) return null;

            // p ranges from 0 (closest to mirror edge) to > 1 (receding into horizon)
            const p = rawProgress - 1.0;
            if (p > 1.5) return null; // Disappears in the distance

            // Shrinks and moves UP towards horizon (45%)
            const progressY = Math.pow(Math.max(0, 1 - p / 1.5), 2.5); // 1 to 0

            // Horizon is 45%, lower the signs onto the road surface (no stems)
            const topPct = 47 + progressY * 45;

            // Scale from 0.85 down to 0.01 at horizon
            const scale = Math.max(0.01, progressY * 0.85);

            // Fade in initially as it enters the mirror, fade out at horizon
            const opacity = p < 0.1 ? p / 0.1 : p > 1.2 ? 1 - (p - 1.2) / 0.3 : 1;

            const isLeft = popup.number % 2 === 0;
            const lineIndex = isLeft ? -1.5 : 1.5;

            const startX_pct = 50 - playerX * 4 + (lineIndex / 16) * 16; // horizon X
            const endX_pct = 50 - playerX * 35 + lineIndex * 20; // bottom X

            const currentX_pct = startX_pct + (endX_pct - startX_pct) * progressY;

            const primaryWaveColor = isLeft ? '#00F0FF' : '#FF007F';
            const waveGlowRgba = isLeft ? 'rgba(0, 240, 255, 0.6)' : 'rgba(255, 0, 127, 0.6)';
            const secondaryGlowRgba = isLeft ? 'rgba(255, 0, 127, 0.35)' : 'rgba(0, 240, 255, 0.35)';

            return (
              <div
                key={popup.id}
                style={{
                  position: 'absolute',
                  top: `${topPct}%`,
                  left: `${currentX_pct}%`,
                  transform: `translate(-50%, -100%) scale(${scale})`,
                  transformOrigin: '50% 100%',
                  opacity,
                  zIndex: Math.round(10 + progressY * 20),
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(8, 2, 28, 0.94) 0%, rgba(22, 4, 42, 0.94) 50%, rgba(3, 14, 36, 0.96) 100%)',
                    backdropFilter: 'blur(12px)',
                    border: `2px solid ${primaryWaveColor}`,
                    borderRadius: '6px',
                    width: '160px',
                    minHeight: '44px',
                    padding: '0.4rem 0.6rem',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: `0 8px 20px rgba(0, 0, 0, 0.8), 0 0 15px ${waveGlowRgba}, 0 0 25px ${secondaryGlowRgba}, inset 0 0 12px ${
                      isLeft ? 'rgba(0, 240, 255, 0.18)' : 'rgba(255, 0, 127, 0.18)'
                    }`,
                    overflow: 'hidden',
                    textAlign: 'center',
                  }}
                >
                  {/* Orange to Red Luminous Top Gradient Line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, #FF9900 0%, #FF4400 50%, #FF0055 100%)',
                      boxShadow: '0 0 8px #FF5500, 0 0 12px #FF0044',
                    }}
                  />

                  <div
                    style={{
                      fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
                      fontSize: '0.58rem',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      color: '#FFFFFF',
                      textShadow: `0 0 6px rgba(255, 255, 255, 0.9), 0 0 12px ${waveGlowRgba}`,
                      letterSpacing: '0.01em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '144px',
                    }}
                  >
                    "{popup.text}"
                  </div>
                </div>
              </div>
            );
          })}

        {/* Speedometer readout */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            fontWeight: 900,
            color: '#00F0FF',
            letterSpacing: '0.08em',
            textShadow: '0 0 8px rgba(0, 240, 255, 0.9)',
            zIndex: 40,
          }}
        >
          {Math.max(0, Math.round(speedMph))} MPH
        </div>
      </div>
    </div>
  );
}
