import React, { useEffect, useRef } from 'react';

export function WaveformVisualizer({ isAudioPlaying = false, speedMph = 0, onAudioNode = null }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let phase = 0;

    const render = () => {
      const width = (canvas.width = canvas.clientWidth || 280);
      const height = (canvas.height = canvas.clientHeight || 55);

      ctx.clearRect(0, 0, width, height);

      // Background screen fill
      ctx.fillStyle = '#06020c';
      ctx.fillRect(0, 0, width, height);

      // Grid mesh lines on audio scope
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 10) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Compute sound intensity based on audio playing, speed, or blips
      const baseAmp = isAudioPlaying ? 18 : speedMph > 0 ? 12 : 5;
      phase += 0.08 + (speedMph * 0.002);

      // Draw 24 Neon Equalizer Bars
      const numBars = 24;
      const barW = (width - 20) / numBars;
      for (let i = 0; i < numBars; i++) {
        const x = 10 + i * barW;
        const noise = Math.sin(i * 0.7 + phase * 2) * Math.cos(i * 0.3 - phase);
        const barH = Math.max(4, Math.abs(noise) * baseAmp + (Math.sin(phase + i) * 4 + 4));

        const barY = height / 2 - barH / 2;

        // Color gradient by frequency band
        const grad = ctx.createLinearGradient(0, barY, 0, barY + barH);
        grad.addColorStop(0, '#FFE600');
        grad.addColorStop(0.5, '#FF0055');
        grad.addColorStop(1, '#00F0FF');

        ctx.fillStyle = grad;
        ctx.fillRect(x, barY, barW - 2, barH);
      }

      // Overlay Glowing Sine Wave Oscillograph Line
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#00F0FF';
      ctx.shadowBlur = 8;
      ctx.beginPath();

      const centerY = height / 2;
      for (let x = 0; x <= width; x += 2) {
        const normX = x / width;
        const wave = Math.sin(normX * Math.PI * 6 + phase) * (baseAmp * 0.6) +
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
        bottom: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 25,
        background: '#0A0A0A',
        border: '3px solid #00F0FF',
        borderRadius: '4px',
        boxShadow: '0 0 12px rgba(0, 240, 255, 0.4), 4px 4px 0 #0A0A0A',
        padding: '0.4rem 0.6rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.2rem',
        pointerEvents: 'none',
      }}
    >
      <div style={{
        display: 'flex',
        justify: 'space-between',
        width: '100%',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        fontWeight: 900,
        color: '#FFE600',
        letterSpacing: '0.08em'
      }}>
        <span>SYNTH AUDIO SCOPE // LIVE WAVEFORM</span>
        <span style={{ color: isAudioPlaying ? '#00E599' : '#FF2A00' }}>
          {isAudioPlaying ? '● AUDIO ACTIVE' : 'STANDBY'}
        </span>
      </div>

      <canvas ref={canvasRef} style={{ width: '280px', height: '50px', display: 'block' }} />
    </div>
  );
}
