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
      const width = (canvas.width = canvas.clientWidth || 300);
      const height = (canvas.height = canvas.clientHeight || 55);

      ctx.clearRect(0, 0, width, height);

      // Deep Space Glass Fill
      ctx.fillStyle = '#06020c';
      ctx.fillRect(0, 0, width, height);

      // Cyber Grid Mesh lines on scope
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.12)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Compute sound intensity
      const baseAmp = isAudioPlaying ? 20 : speedMph > 0 ? 14 : 5;
      phase += 0.08 + (speedMph * 0.002);

      // Draw 28 Neon Equalizer Spectrum Bars
      const numBars = 28;
      const barW = (width - 24) / numBars;
      for (let i = 0; i < numBars; i++) {
        const x = 12 + i * barW;
        const noise = Math.sin(i * 0.6 + phase * 2) * Math.cos(i * 0.35 - phase);
        const barH = Math.max(4, Math.abs(noise) * baseAmp + (Math.sin(phase + i) * 4 + 4));
        const barY = height / 2 - barH / 2;

        // Gradient by frequency band (Magenta -> Cyan -> Yellow)
        const grad = ctx.createLinearGradient(0, barY, 0, barY + barH);
        grad.addColorStop(0, '#FFE600');
        grad.addColorStop(0.5, '#FF007F');
        grad.addColorStop(1, '#00F0FF');

        ctx.fillStyle = grad;
        ctx.fillRect(x, barY, barW - 2, barH);
      }

      // Overlay Glowing Sine Wave Oscillograph Line
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const centerY = height / 2;
      for (let x = 0; x <= width; x += 2) {
        const normX = x / width;
        const wave = Math.sin(normX * Math.PI * 6 + phase) * (baseAmp * 0.65) +
                     Math.cos(normX * Math.PI * 12 - phase * 1.5) * (baseAmp * 0.25);
        const y = centerY + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isAudioPlaying, speedMph]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '0.85rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 25,
        background: 'rgba(9, 3, 20, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1.2px solid rgba(0, 240, 255, 0.5)',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0, 240, 255, 0.35)',
        padding: '0.35rem 0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '190px', height: '36px', display: 'block' }} />
    </div>
  );
}
