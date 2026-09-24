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
      const parent = canvas.parentElement;
      const width = (canvas.width = parent ? parent.clientWidth : window.innerWidth);
      const height = (canvas.height = parent ? parent.clientHeight : window.innerHeight);

      ctx.clearRect(0, 0, width, height);

      // Sound audio intensity
      const baseAmp = isAudioPlaying ? 16 : Math.abs(speedMph) > 0 ? 10 : 4;
      phase += 0.03 + (Math.abs(speedMph) * 0.001);

      // Subtle Ethereal Sky Wave Horizon Pulse
      ctx.save();
      ctx.globalAlpha = isAudioPlaying ? 0.25 : 0.12;
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const horizonY = height * 0.55;
      for (let x = 0; x <= width; x += 6) {
        const normX = x / width;
        const wave = Math.sin(normX * Math.PI * 4 + phase) * baseAmp +
                     Math.cos(normX * Math.PI * 8 - phase * 1.5) * (baseAmp * 0.4);
        const y = horizonY - 12 + wave;
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
        zIndex: 14,
        pointerEvents: 'none',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
