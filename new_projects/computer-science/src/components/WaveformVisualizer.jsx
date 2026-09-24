import React, { useEffect, useRef } from 'react';

export function WaveformVisualizer({ isAudioPlaying = false, speedMph = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let phase = 0;

    const render = () => {
      const width = (canvas.width = canvas.clientWidth || 800);
      const height = (canvas.height = canvas.clientHeight || 110);

      ctx.clearRect(0, 0, width, height);

      // Compute sound intensity
      const baseAmp = isAudioPlaying ? 28 : speedMph > 0 ? 18 : 8;
      phase += 0.05 + (speedMph * 0.0015);

      // 1. Draw Ethereal Glowing Celestial Spectrum Bars (Sky Aurora Effect)
      const numBars = 42;
      const barW = (width - 40) / numBars;
      ctx.globalAlpha = 0.3;

      for (let i = 0; i < numBars; i++) {
        const x = 20 + i * barW;
        const noise = Math.sin(i * 0.45 + phase * 1.8) * Math.cos(i * 0.25 - phase);
        const barH = Math.max(6, Math.abs(noise) * baseAmp * 1.4 + (Math.sin(phase + i) * 6 + 6));
        const barY = height / 2 - barH / 2;

        const grad = ctx.createLinearGradient(0, barY, 0, barY + barH);
        grad.addColorStop(0, '#FF007F');
        grad.addColorStop(0.5, '#00F0FF');
        grad.addColorStop(1, '#FFE600');

        ctx.fillStyle = grad;
        ctx.fillRect(x, barY, barW - 3, barH);
      }

      // 2. Overlay Dual Glowing Sine Oscillograph Waves across Sky
      ctx.globalAlpha = 0.55;
      
      // Wave 1: Neon Cyan Sky Wave
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 12;
      ctx.beginPath();

      const centerY = height / 2;
      for (let x = 0; x <= width; x += 4) {
        const normX = x / width;
        const wave = Math.sin(normX * Math.PI * 4 + phase) * (baseAmp * 0.8) +
                     Math.cos(normX * Math.PI * 8 - phase * 1.2) * (baseAmp * 0.3);
        const y = centerY + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Wave 2: Neon Magenta Sky Wave
      ctx.strokeStyle = '#FF007F';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#FF007F';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      for (let x = 0; x <= width; x += 4) {
        const normX = x / width;
        const wave = Math.cos(normX * Math.PI * 5 - phase * 1.4) * (baseAmp * 0.6) +
                     Math.sin(normX * Math.PI * 10 + phase) * (baseAmp * 0.25);
        const y = centerY + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isAudioPlaying, speedMph]);

  return (
    <div
      style={{
        position: 'absolute',
        top: '70px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 15,
        width: '85vw',
        maxWidth: '920px',
        height: '110px',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.85
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}

