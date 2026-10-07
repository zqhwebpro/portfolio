import React, { useEffect, useRef } from 'react';

export const WaveformVisualizer = React.memo(function WaveformVisualizer({
  isAudioPlaying = true,
  speedMph = 0,
}) {
  const canvasRef = useRef(null);
  const audioPlayingRef = useRef(isAudioPlaying);
  audioPlayingRef.current = isAudioPlaying;
  const speedRef = useRef(speedMph);
  speedRef.current = speedMph;

  const particlesRef = useRef(null);
  if (!particlesRef.current) {
    particlesRef.current = Array.from({ length: 24 }, () => ({
      x: Math.random(),
      offsetY: Math.random() * 50,
      size: Math.random() * 2.0 + 0.8,
      speed: Math.random() * 0.4 + 0.2,
      hue: Math.random() > 0.5 ? '#00F0FF' : '#FF007F',
    }));
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let phase = 0;

    const render = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;

      // Only resize canvas buffer when dimensions actually change
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      const playing = audioPlayingRef.current;
      const curSpeed = speedRef.current;
      const horizonY = height * 0.55;
      const time = Date.now() / 1000;
      const beat1 = Math.max(0, Math.sin(time * Math.PI * 2 * 1.8)); // ~108 BPM
      const beat2 = Math.max(0, Math.sin(time * Math.PI * 2 * 2.2)); // ~132 BPM
      const audioPulse = playing ? (beat1 * 0.6 + beat2 * 0.4) * 35 : 0;

      const baseAmp =
        (playing ? 38 + audioPulse : Math.abs(curSpeed) > 0 ? 18 : 10) *
        (playing ? 0.85 + Math.random() * 0.3 : 1);
      phase += playing ? 0.05 + Math.abs(curSpeed) * 0.001 + audioPulse * 0.0015 : 0.015;

      ctx.save();
      ctx.globalCompositeOperation = 'lighter'; // High glow composite

      // 1. HOLOGRAPHIC AUDIO ENERGY FIELD BLOOM
      ctx.globalAlpha = playing ? 0.10 : 0.04;
      const waveGrad = ctx.createLinearGradient(0, horizonY - 45, 0, horizonY);
      waveGrad.addColorStop(0, '#00F0FF');
      waveGrad.addColorStop(0.5, '#FF007F');
      waveGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = waveGrad;

      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      for (let x = 0; x <= width; x += 8) {
        const normX = x / width;
        const wave =
          Math.sin(normX * Math.PI * 4 + phase) * (baseAmp * 0.7) +
          Math.cos(normX * Math.PI * 8 - phase * 1.2) * (baseAmp * 0.3);
        ctx.lineTo(x, horizonY - 8 + wave);
      }
      ctx.lineTo(width, horizonY);
      ctx.closePath();
      ctx.fill();

      // Ribbon A: Cyan High-Glow
      ctx.beginPath();
      for (let x = 0; x <= width; x += 8) {
        const normX = x / width;
        const wave =
          Math.sin(normX * Math.PI * 4.2 + phase) * (baseAmp * 0.75) +
          Math.cos(normX * Math.PI * 9.5 - phase * 1.3) * (baseAmp * 0.32);
        const y = horizonY - 12 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.24)';
      ctx.lineWidth = 4.2;
      ctx.stroke();
      ctx.strokeStyle = playing ? 'rgba(0, 240, 255, 0.75)' : 'rgba(0, 240, 255, 0.35)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Ribbon B: Neon Magenta High-Glow
      ctx.beginPath();
      for (let x = 0; x <= width; x += 8) {
        const normX = x / width;
        const wave =
          Math.cos(normX * Math.PI * 5.2 - phase * 1.4) * (baseAmp * 0.65) +
          Math.sin(normX * Math.PI * 11 + phase) * (baseAmp * 0.25);
        const y = horizonY - 8 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(255, 0, 127, 0.20)';
      ctx.lineWidth = 3.8;
      ctx.stroke();
      ctx.strokeStyle = playing ? 'rgba(255, 0, 127, 0.70)' : 'rgba(255, 0, 127, 0.30)';
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Ribbon C: Electric Cyber Violet / Purple (NO YELLOW)
      ctx.beginPath();
      for (let x = 0; x <= width; x += 8) {
        const normX = x / width;
        const wave = Math.sin(normX * Math.PI * 6.5 + phase * 1.6) * (baseAmp * 0.45);
        const y = horizonY - 10 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(157, 0, 255, 0.18)';
      ctx.lineWidth = 3.2;
      ctx.stroke();
      ctx.strokeStyle = playing ? 'rgba(157, 0, 255, 0.60)' : 'rgba(157, 0, 255, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();

      // 3. Mountain silhouette to cleanly anchor waves behind terrain
      ctx.fillStyle = '#0e041d';
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width * 0.15, horizonY - 45);
      ctx.lineTo(width * 0.28, horizonY - 20);
      ctx.lineTo(width * 0.4, horizonY - 60);
      ctx.lineTo(width * 0.5, horizonY - 25);
      ctx.lineTo(width * 0.65, horizonY - 70);
      ctx.lineTo(width * 0.8, horizonY - 30);
      ctx.lineTo(width, horizonY);
      ctx.closePath();
      ctx.fill();

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
});
