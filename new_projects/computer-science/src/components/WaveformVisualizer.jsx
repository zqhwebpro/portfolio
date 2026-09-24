import React, { useEffect, useRef } from 'react';

export function WaveformVisualizer({ isAudioPlaying = true, speedMph = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let phase = 0;

    // Glowing audio spark particles rising from mountains
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random(),
      offsetY: Math.random() * 50,
      size: Math.random() * 2.2 + 0.8,
      speed: Math.random() * 0.5 + 0.2,
      hue: Math.random() > 0.5 ? '#00F0FF' : Math.random() > 0.5 ? '#FF007F' : '#FFE600',
    }));

    const render = () => {
      const parent = canvas.parentElement;
      const width = (canvas.width = parent ? parent.clientWidth : window.innerWidth);
      const height = (canvas.height = parent ? parent.clientHeight : window.innerHeight);

      ctx.clearRect(0, 0, width, height);

      const horizonY = height * 0.55;
      const baseAmp = isAudioPlaying ? 38 : Math.abs(speedMph) > 0 ? 18 : 10;
      phase += isAudioPlaying ? 0.038 + Math.abs(speedMph) * 0.001 : 0.015;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter'; // High glow composite

      // 1. ETHEREAL TRANSPARENT EQUALIZER SPECTRUM BARS
      const numBars = 72;
      const barW = (width - 40) / numBars;
      ctx.globalAlpha = isAudioPlaying ? 0.22 : 0.10;

      for (let i = 0; i < numBars; i++) {
        const x = 20 + i * barW;
        const noise = Math.sin(i * 0.4 + phase * 2.2) * Math.cos(i * 0.2 - phase * 1.5);
        const barH = Math.max(4, Math.abs(noise) * baseAmp * 1.3 + Math.sin(phase * 1.5 + i) * 6);
        const barY = horizonY - barH;

        const grad = ctx.createLinearGradient(0, barY, 0, horizonY);
        grad.addColorStop(0, '#00F0FF');
        grad.addColorStop(0.5, '#FF007F');
        grad.addColorStop(1, 'rgba(255, 230, 0, 0.05)');

        ctx.fillStyle = grad;
        ctx.fillRect(x, barY, barW - 2, barH);
      }

      // 2. HOLOGRAPHIC AUDIO ENERGY FIELD BLOOM (TRANSPARENT WAVE FILL)
      ctx.globalAlpha = isAudioPlaying ? 0.12 : 0.05;
      const waveGrad = ctx.createLinearGradient(0, horizonY - 45, 0, horizonY);
      waveGrad.addColorStop(0, '#00F0FF');
      waveGrad.addColorStop(0.5, '#FF007F');
      waveGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = waveGrad;

      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      for (let x = 0; x <= width; x += 6) {
        const normX = x / width;
        const wave = Math.sin(normX * Math.PI * 4 + phase) * (baseAmp * 0.7) +
                     Math.cos(normX * Math.PI * 8 - phase * 1.2) * (baseAmp * 0.3);
        ctx.lineTo(x, horizonY - 8 + wave);
      }
      ctx.lineTo(width, horizonY);
      ctx.closePath();
      ctx.fill();

      // 3. THREE HIGH-GLOW TRANSPARENT SINE HARMONIC RIBBONS
      // Ribbon A: Cyan High-Glow
      ctx.globalAlpha = isAudioPlaying ? 0.32 : 0.16;
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 2.0;
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 22;
      ctx.beginPath();

      for (let x = 0; x <= width; x += 4) {
        const normX = x / width;
        const wave = Math.sin(normX * Math.PI * 4.2 + phase) * (baseAmp * 0.75) +
                     Math.cos(normX * Math.PI * 9.5 - phase * 1.3) * (baseAmp * 0.32);
        const y = horizonY - 12 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Ribbon B: Neon Magenta High-Glow
      ctx.globalAlpha = isAudioPlaying ? 0.28 : 0.14;
      ctx.strokeStyle = '#FF007F';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#FF007F';
      ctx.shadowBlur = 20;
      ctx.beginPath();

      for (let x = 0; x <= width; x += 4) {
        const normX = x / width;
        const wave = Math.cos(normX * Math.PI * 5.2 - phase * 1.4) * (baseAmp * 0.65) +
                     Math.sin(normX * Math.PI * 11 + phase) * (baseAmp * 0.25);
        const y = horizonY - 8 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Ribbon C: Electric Gold Pulse Trace
      ctx.globalAlpha = isAudioPlaying ? 0.24 : 0.10;
      ctx.strokeStyle = '#FFE600';
      ctx.lineWidth = 1.4;
      ctx.shadowColor = '#FFE600';
      ctx.shadowBlur = 15;
      ctx.beginPath();

      for (let x = 0; x <= width; x += 5) {
        const normX = x / width;
        const wave = Math.sin(normX * Math.PI * 6.5 + phase * 1.6) * (baseAmp * 0.45);
        const y = horizonY - 10 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 4. FLOATING NEON AUDIO SPARK PARTICLES
      ctx.shadowBlur = 12;
      particles.forEach((p) => {
        p.offsetY = (p.offsetY + p.speed) % 55;
        const px = p.x * width;
        const py = horizonY - 6 - p.offsetY;
        const pAlpha = (1 - p.offsetY / 55) * (isAudioPlaying ? 0.55 : 0.20);

        ctx.globalAlpha = pAlpha;
        ctx.fillStyle = p.hue;
        ctx.shadowColor = p.hue;

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

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

