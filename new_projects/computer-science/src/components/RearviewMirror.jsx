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

      // Distant Rear Mountain Silhouettes (Elevated detail)
      ctx.fillStyle = '#1c083d';
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width * 0.12, horizonY - 24);
      ctx.lineTo(width * 0.25, horizonY - 10);
      ctx.lineTo(width * 0.42, horizonY - 32);
      ctx.lineTo(width * 0.58, horizonY - 14);
      ctx.lineTo(width * 0.75, horizonY - 35);
      ctx.lineTo(width * 0.88, horizonY - 16);
      ctx.lineTo(width, horizonY);
      ctx.fill();

      // Rear 3D Grid Floor
      ctx.fillStyle = '#05010b';
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

      // Fan vertical lines
      const fanning = 16;
      const cx = width / 2;
      for (let i = -fanning; i <= fanning; i++) {
        const startX = cx + (i / fanning) * 16;
        const endX = cx + i * (width * 0.08);
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
  }, [speedMph]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '0.75rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      {/* Cyber Mounting Stem */}
      <div style={{
        width: '6px',
        height: '18px',
        background: 'linear-gradient(to bottom, #00F0FF, rgba(0, 240, 255, 0.3))',
        boxShadow: '0 0 10px #00F0FF'
      }} />

      {/* Larger Glass Rearview Mirror Housing */}
      <div style={{
        width: 'clamp(320px, 45vw, 440px)',
        height: '110px',
        background: 'rgba(8, 2, 20, 0.88)',
        backdropFilter: 'blur(14px)',
        border: '1.8px solid rgba(0, 240, 255, 0.75)',
        borderRadius: '20px 20px 40px 40px',
        boxShadow: '0 0 35px rgba(0, 240, 255, 0.45), inset 0 0 20px rgba(0, 240, 255, 0.2)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Mirror Canvas */}
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

        {/* Speedometer readout */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          right: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 900,
          color: '#00F0FF',
          letterSpacing: '0.08em',
          textShadow: '0 0 8px rgba(0, 240, 255, 0.9)'
        }}>
          {speedMph} MPH
        </div>
      </div>
    </div>
  );
}
