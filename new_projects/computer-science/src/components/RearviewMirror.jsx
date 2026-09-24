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
      const width = (canvas.width = canvas.clientWidth || 240);
      const height = (canvas.height = canvas.clientHeight || 75);

      const horizonY = height * 0.45;

      // Grid moves in reverse for rear mirror reflection ONLY when speedMph > 0
      if (speedMph > 0) {
        offsetRef.current = (offsetRef.current - (0.5 + speedMph * 0.05) + 40) % 40;
      }

      // 1. Sky & Reflection Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#090214');
      skyGrad.addColorStop(0.5, '#260838');
      skyGrad.addColorStop(1, '#05010b');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Rear 3D Grid Floor
      ctx.fillStyle = '#05010b';
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // Horizontal lines receding backward
      ctx.lineWidth = 1;
      const numH = 8;
      for (let i = 0; i < numH; i++) {
        const progress = ((i + offsetRef.current / 40) % numH) / numH;
        const py = horizonY + Math.pow(progress, 2) * (height - horizonY);
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.25 + progress * 0.75})`;
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(width, py);
        ctx.stroke();
      }

      // Fan vertical lines
      const fanning = 12;
      const cx = width / 2;
      for (let i = -fanning; i <= fanning; i++) {
        const startX = cx + (i / fanning) * 12;
        const endX = cx + i * (width * 0.08);
        ctx.strokeStyle = 'rgba(255, 0, 127, 0.45)';
        ctx.beginPath();
        ctx.moveTo(startX, horizonY);
        ctx.lineTo(endX, height);
        ctx.stroke();
      }

      // Sleek glass reflection glare
      const sheen = ctx.createLinearGradient(0, 0, width, height);
      sheen.addColorStop(0, 'rgba(0, 240, 255, 0.2)');
      sheen.addColorStop(0.3, 'rgba(255, 255, 255, 0.1)');
      sheen.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
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
      {/* Sleek Cyber Mounting Bracket */}
      <div style={{
        width: '5px',
        height: '16px',
        background: 'linear-gradient(to bottom, #00F0FF, rgba(0, 240, 255, 0.2))',
        boxShadow: '0 0 8px #00F0FF'
      }} />

      {/* Aerodynamic Glass Rearview Mirror Housing */}
      <div style={{
        width: '270px',
        height: '82px',
        background: 'rgba(9, 3, 20, 0.85)',
        backdropFilter: 'blur(10px)',
        border: '1.5px solid rgba(0, 240, 255, 0.6)',
        borderRadius: '16px 16px 32px 32px',
        boxShadow: '0 0 25px rgba(0, 240, 255, 0.35), inset 0 0 15px rgba(0, 240, 255, 0.15)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Mirror Canvas */}
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

        <div style={{
          position: 'absolute',
          bottom: '5px',
          right: '12px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          fontWeight: 800,
          color: '#00F0FF',
          textShadow: '0 0 6px rgba(0, 240, 255, 0.8)'
        }}>
          {speedMph} MPH
        </div>
      </div>
    </div>
  );
}
