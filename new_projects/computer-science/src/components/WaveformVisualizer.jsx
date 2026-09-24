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

      // Compute Sun Position (matching SynthwaveDrive sun position)
      const horizonY = height * 0.55;
      const sunCenterX = width * 0.5;
      const sunRadius = Math.min(width, height) * 0.25;
      const sunCenterY = horizonY - sunRadius * 0.35;

      // Sound audio intensity
      const baseAmp = isAudioPlaying ? 32 : Math.abs(speedMph) > 0 ? 20 : 10;
      phase += 0.04 + (Math.abs(speedMph) * 0.001);

      ctx.save();

      // 1. RADIAL SOLAR SPECTRUM RAYS (Fanning 360 degrees around Sun)
      const numRays = 48;
      ctx.globalAlpha = 0.45;

      for (let i = 0; i < numRays; i++) {
        const angle = (i / numRays) * Math.PI * 2;
        const rayNoise = Math.sin(i * 0.6 + phase * 2) * Math.cos(i * 0.3 - phase);
        const rayLength = sunRadius + 12 + Math.abs(rayNoise) * baseAmp * 1.6 + (Math.sin(phase + i) * 8);

        const innerX = sunCenterX + Math.cos(angle) * (sunRadius + 4);
        const innerY = sunCenterY + Math.sin(angle) * (sunRadius + 4);
        const outerX = sunCenterX + Math.cos(angle) * rayLength;
        const outerY = sunCenterY + Math.sin(angle) * rayLength;

        const rayGrad = ctx.createLinearGradient(innerX, innerY, outerX, outerY);
        rayGrad.addColorStop(0, '#FFE600');
        rayGrad.addColorStop(0.5, '#FF007F');
        rayGrad.addColorStop(1, '#00F0FF');

        ctx.strokeStyle = rayGrad;
        ctx.lineWidth = isAudioPlaying ? 3 : 2;
        ctx.shadowColor = '#00F0FF';
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.moveTo(innerX, innerY);
        ctx.lineTo(outerX, outerY);
        ctx.stroke();
      }

      // 2. CONCENTRIC SOLAR AUDIO RIPPLE RINGS (Undulating Concentric Waves)
      const numRings = isAudioPlaying ? 5 : 3;
      for (let rIdx = 0; rIdx < numRings; rIdx++) {
        const ringBaseR = sunRadius + 20 + rIdx * 24 + ((phase * 15) % 24);
        const ringAlpha = Math.max(0.1, 0.7 - (rIdx * 0.12));

        ctx.globalAlpha = ringAlpha;
        ctx.strokeStyle = rIdx % 2 === 0 ? '#00F0FF' : '#FF007F';
        ctx.lineWidth = rIdx === 0 ? 2.5 : 1.8;
        ctx.shadowColor = rIdx % 2 === 0 ? '#00F0FF' : '#FF007F';
        ctx.shadowBlur = 12;

        ctx.beginPath();
        const steps = 90;
        for (let s = 0; s <= steps; s++) {
          const a = (s / steps) * Math.PI * 2;
          const wave = Math.sin(a * (6 + rIdx * 2) + phase * (2 + rIdx)) * (baseAmp * 0.4) +
                     Math.cos(a * 4 - phase * 1.5) * (baseAmp * 0.2);
          const currentR = ringBaseR + wave;

          const rx = sunCenterX + Math.cos(a) * currentR;
          const ry = sunCenterY + Math.sin(a) * currentR;

          if (s === 0) ctx.moveTo(rx, ry);
          else ctx.lineTo(rx, ry);
        }
        ctx.closePath();
        ctx.stroke();
      }

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
        zIndex: 15,
        pointerEvents: 'none',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
