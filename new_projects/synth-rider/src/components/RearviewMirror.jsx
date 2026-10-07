import React, { useEffect, useRef } from 'react';

export const RearviewMirror = React.memo(function RearviewMirror({
  speedMph = 0,
  popups = [],
  driveDistance = 0,
  playerX = 0,
  popupsRef,
  driveDistanceRef,
  playerXRef,
}) {
  const canvasRef = useRef(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(speedMph);
  speedRef.current = speedMph;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth || canvas.clientWidth || 380;
      const height = parent?.clientHeight || canvas.clientHeight || 100;

      // Only resize canvas buffer when dimensions actually change
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const horizonY = height * 0.45;
      const curSpeed = speedRef.current;
      const curPX = playerXRef ? playerXRef.current : playerX;
      const curDist = driveDistanceRef ? Math.abs(driveDistanceRef.current) : driveDistance;
      const curPopups = popupsRef ? popupsRef.current : popups;

      // Grid moves in reverse for rear mirror reflection ONLY when speed > 0
      if (Math.abs(curSpeed) > 0) {
        offsetRef.current = (offsetRef.current - (0.6 + curSpeed * 0.06) + 40) % 40;
      }

      // 1. Deep Space Sky & Reflection Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#0a0218');
      skyGrad.addColorStop(0.5, '#2e0842');
      skyGrad.addColorStop(1, '#05010b');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant Rear Mountain Silhouettes
      const mountainShift = -curPX * 6;
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

      // Central Information Superhighway corridor in rear reflection
      const fanning = 16;
      const cx = width / 2;
      const startLeft  = cx - curPX * (width * 0.04) + (-3 / fanning) * 16;
      const startRight = cx - curPX * (width * 0.04) + (3 / fanning) * 16;
      const endLeft    = cx - curPX * (width * 0.35) - 3 * (width * 0.08);
      const endRight   = cx - curPX * (width * 0.35) + 3 * (width * 0.08);

      ctx.fillStyle = 'rgba(26, 5, 48, 0.85)';
      ctx.beginPath();
      ctx.moveTo(startLeft, horizonY);
      ctx.lineTo(startRight, horizonY);
      ctx.lineTo(endRight, height);
      ctx.lineTo(endLeft, height);
      ctx.closePath();
      ctx.fill();

      // Left shoulder barrier rail (Cyan) - dual stroke, zero shadowBlur
      ctx.beginPath();
      ctx.moveTo(startLeft, horizonY);
      ctx.lineTo(endLeft, height);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.22)';
      ctx.lineWidth = 3.6;
      ctx.stroke();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.80)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Right shoulder barrier rail (Magenta) - dual stroke, zero shadowBlur
      ctx.beginPath();
      ctx.moveTo(startRight, horizonY);
      ctx.lineTo(endRight, height);
      ctx.strokeStyle = 'rgba(255, 0, 127, 0.22)';
      ctx.lineWidth = 3.6;
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255, 0, 127, 0.80)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Horizontal lines receding backward (batched in single stroke)
      ctx.beginPath();
      const numH = 10;
      for (let i = 0; i < numH; i++) {
        const progress = (((i + offsetRef.current / 40) % numH) + numH) % numH / numH;
        const py = horizonY + Math.pow(progress, 2.2) * (height - horizonY);
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
      }
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Fan vertical lines shifting with player steering (no center yellow line, batched)
      // Left lines (Cyan)
      ctx.beginPath();
      for (let i = -fanning; i < 0; i++) {
        const startX = cx - curPX * (width * 0.04) + (i / fanning) * 16;
        const endX   = cx - curPX * (width * 0.35) + i * (width * 0.08);
        ctx.moveTo(startX, horizonY);
        ctx.lineTo(endX, height);
      }
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // Right lines (Magenta)
      ctx.beginPath();
      for (let i = 1; i <= fanning; i++) {
        const startX = cx - curPX * (width * 0.04) + (i / fanning) * 16;
        const endX   = cx - curPX * (width * 0.35) + i * (width * 0.08);
        ctx.moveTo(startX, horizonY);
        ctx.lineTo(endX, height);
      }
      ctx.strokeStyle = 'rgba(255, 0, 127, 0.35)';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // Popups reflecting directly onto rearview mirror canvas
      if (curPopups && curPopups.length > 0) {
        for (const popup of curPopups) {
          const rawProgress = (curDist - popup.startDist) / 36;
          if (rawProgress < 0.98) continue;
          const p = rawProgress - 1.0;
          if (p > 1.5) continue; // Disappears in distance

          const progressY = Math.pow(Math.max(0, 1 - p / 1.5), 2.5);
          const topPct = 0.47 + progressY * 0.45;
          const signY = topPct * height;
          const scale = Math.max(0.01, progressY * 0.85);
          const opacity = p < 0.08 ? p / 0.08 : p > 1.2 ? 1 - (p - 1.2) / 0.3 : 1;

          const isLeft = popup.number % 2 === 0;
          const lineIndex = isLeft ? -1.5 : 1.5;
          const startX_pct = 0.50 - curPX * 0.04 + (lineIndex / 16) * 0.16;
          const endX_pct   = 0.50 - curPX * 0.35 + lineIndex * 0.20;
          const currentX_pct = startX_pct + (endX_pct - startX_pct) * progressY;
          const signX = currentX_pct * width;

          const signW = Math.max(4, 84 * scale);
          const signH = Math.max(2, 24 * scale);

          ctx.save();
          ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
          ctx.fillStyle = 'rgba(8, 2, 28, 0.94)';
          ctx.fillRect(signX - signW / 2, signY - signH, signW, signH);
          ctx.strokeStyle = isLeft ? '#00F0FF' : '#FF007F';
          ctx.lineWidth = Math.max(1, 1.8 * scale);
          ctx.strokeRect(signX - signW / 2, signY - signH, signW, signH);
          // Top accent line
          ctx.fillStyle = isLeft ? '#00F0FF' : '#FF007F';
          ctx.fillRect(signX - signW / 2, signY - signH, signW, Math.max(1, 2.5 * scale));
          ctx.restore();
        }
      }

      // Sleek glass reflection glare
      const sheen = ctx.createLinearGradient(0, 0, width, height);
      sheen.addColorStop(0, 'rgba(0, 240, 255, 0.18)');
      sheen.addColorStop(0.35, 'rgba(255, 255, 255, 0.08)');
      sheen.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

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
          background: 'rgba(5, 1, 14, 0.95)',
          border: '1.8px solid rgba(0, 240, 255, 0.75)',
          borderTop: 'none',
          borderRadius: '0 0 36px 36px',
          boxShadow: '0 4px 25px rgba(0, 240, 255, 0.4), inset 0 0 15px rgba(0, 240, 255, 0.2)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Mirror Canvas */}
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

        {/* Speedometer readout */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '16px',
            fontFamily: 'var(--font-mono, monospace)',
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
});
