import React, { useEffect, useRef } from 'react';

export function RearviewMirror({ speedMph }) {
  const canvasRef = useRef(null);
  const offsetRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const render = () => {
      const width = (canvas.width = canvas.clientWidth || 220);
      const height = (canvas.height = canvas.clientHeight || 70);

      // Grid moves in reverse for rear mirror reflection!
      offsetRef.current = (offsetRef.current - (0.5 + speedMph * 0.05) + 40) % 40;

      // 1. Sky & Reflection Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#19062b');
      skyGrad.addColorStop(0.5, '#3b0d40');
      skyGrad.addColorStop(1, '#080112');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant mini sunset / horizon line in mirror
      const horizonY = height * 0.45;
      ctx.fillStyle = '#ff0055';
      ctx.beginPath();
      ctx.arc(width / 2, horizonY, 18, 0, Math.PI, true);
      ctx.fill();

      // Rear 3D Grid Floor
      ctx.fillStyle = '#080112';
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // Horizontal lines receding backward
      ctx.lineWidth = 1;
      const numH = 8;
      for (let i = 0; i < numH; i++) {
        const progress = ((i + offsetRef.current / 40) % numH) / numH;
        const py = horizonY + Math.pow(progress, 2) * (height - horizonY);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.2 + progress * 0.8})`;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
        ctx.stroke();
      }

      // Fan vertical lines
      const fanning = 10;
      const cx = width / 2;
      for (let i = -fanning; i <= fanning; i++) {
        const startX = cx + (i / fanning) * 10;
        const endX = cx + i * (width * 0.08);
        ctx.strokeStyle = 'rgba(255, 42, 0, 0.4)';
        ctx.beginPath();
        ctx.moveTo(startX, horizonY);
        ctx.lineTo(endX, height);
        ctx.stroke();
      }

      // Mirror reflection vignette / sheen
      const sheen = ctx.createLinearGradient(0, 0, width, height);
      sheen.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
      sheen.addColorStop(0.4, 'rgba(255, 255, 255, 0)');
      sheen.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [speedMph]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Mirror Stem / Bracket attachment */}
      <div style={{ width: '6px', height: '14px', background: '#0A0A0A', border: '1px solid #00F0FF' }} />

      {/* Rearview Mirror Housing */}
      <div style={{
        width: '220px',
        height: '70px',
        background: '#0A0A0A',
        border: '3px solid #00F0FF',
        borderRadius: '8px 8px 16px 16px',
        boxShadow: '0 6px 16px rgba(0, 240, 255, 0.3), 4px 4px 0 #0A0A0A',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Rearview Mirror Canvas */}
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

        {/* Top & Bottom Mirror Labels */}
        <div style={{
          position: 'absolute',
          top: '3px',
          left: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          fontWeight: 900,
          color: '#FFE600',
          textShadow: '0 0 4px #000',
          letterSpacing: '0.08em'
        }}>
          REAR VIEW // OBJECTS CLOSER THAN THEY APPEAR
        </div>

        <div style={{
          position: 'absolute',
          bottom: '3px',
          right: '8px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          fontWeight: 800,
          color: '#00F0FF',
          textShadow: '0 0 4px #000'
        }}>
          {speedMph} MPH REAR GRID
        </div>
      </div>
    </div>
  );
}
