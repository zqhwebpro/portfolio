import React, { useEffect, useRef } from 'react';

export function WaveformVisualizer({ isAudioPlaying = true, speedMph = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let phase = 0;

    const render = () => {
      const parent = canvas.parentElement;
      const width = (canvas.width = parent ? parent.clientWidth : window.innerWidth);
      const height = (canvas.height = parent ? parent.clientHeight : window.innerHeight);

      ctx.clearRect(0, 0, width, height);

      const horizonY = height * 0.55;
      const baseAmp = isAudioPlaying ? 28 : Math.abs(speedMph) > 0 ? 14 : 6;
      phase += isAudioPlaying ? 0.05 + Math.abs(speedMph) * 0.001 : 0.02;

      ctx.save();

      // 1. VERTICAL SPECTRUM EQUALIZER BARS ALONG MOUNTAIN HORIZON
      const numBars = 54;
      const barW = (width - 40) / numBars;
      ctx.globalAlpha = isAudioPlaying ? 0.55 : 0.25;

      for (let i = 0; i < numBars; i++) {
        const x = 20 + i * barW;
        const noise = Math.sin(i * 0.5 + phase * 2.2) * Math.cos(i * 0.3 - phase * 1.5);
        const barH = Math.max(4, Math.abs(noise) * baseAmp * 1.3 + Math.sin(phase + i) * 6 + 4);
        const barY = horizonY - barH - 2;

        const grad = ctx.createLinearGradient(0, barY, 0, horizonY);
        grad.addColorStop(0, '#00F0FF');
        grad.addColorStop(0.5, '#FF007F');
        grad.addColorStop(1, '#FFE600');

        ctx.fillStyle = grad;
        ctx.fillRect(x, barY, barW - 3, barH);
      }

      // 2. DUAL GLOWING NEON SINE OSCILLATION WAVES ALONG MOUNTAIN RIDGE
      // Wave 1: Neon Cyan Sky Wave
      ctx.globalAlpha = isAudioPlaying ? 0.85 : 0.4;
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 12;
      ctx.beginPath();

      for (let x = 0; x <= width; x += 4) {
        const normX = x / width;
        const wave = Math.sin(normX * Math.PI * 5 + phase) * (baseAmp * 0.7) +
                     Math.cos(normX * Math.PI * 10 - phase * 1.4) * (baseAmp * 0.3);
        const y = horizonY - 14 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Wave 2: Neon Magenta Sky Wave
      ctx.strokeStyle = '#FF007F';
      ctx.lineWidth = 2.0;
      ctx.shadowColor = '#FF007F';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      for (let x = 0; x <= width; x += 4) {
        const normX = x / width;
        const wave = Math.cos(normX * Math.PI * 6 - phase * 1.6) * (baseAmp * 0.6) +
                     Math.sin(normX * Math.PI * 12 + phase) * (baseAmp * 0.25);
        const y = horizonY - 10 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isAudioPlaying, speedMph]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 16,
        pointerEvents: 'none',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
