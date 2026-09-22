import React, { useEffect, useRef } from 'react';

export function SparkleCanvas({ 
  handCoordinates, 
  isCameraActive, 
  activeSpell, 
  spellBurstTrigger 
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const burstWavesRef = useRef([]);

  const handRef = useRef(handCoordinates);
  const cameraRef = useRef(isCameraActive);
  const spellRef = useRef(activeSpell);
  const mouseRef = useRef({ x: null, y: null, active: false });
  const smoothedPosRef = useRef({ x: null, y: null });

  useEffect(() => {
    handRef.current = handCoordinates;
  }, [handCoordinates]);

  useEffect(() => {
    cameraRef.current = isCameraActive;
  }, [isCameraActive]);

  useEffect(() => {
    spellRef.current = activeSpell;
  }, [activeSpell]);

  // Trigger luminous ethereal bloom & stardust shower on spell cast
  useEffect(() => {
    if (!spellBurstTrigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let targetX = canvas.width / 2;
    let targetY = canvas.height / 2;

    if (cameraRef.current && handRef.current) {
      targetX = handRef.current.x * canvas.width;
      targetY = handRef.current.y * canvas.height;
    } else if (mouseRef.current.active && mouseRef.current.x !== null) {
      targetX = mouseRef.current.x;
      targetY = mouseRef.current.y;
    }

    // Expanding ethereal ring of starlight
    burstWavesRef.current.push({
      x: targetX,
      y: targetY,
      radius: 12,
      maxRadius: 280,
      opacity: 1,
      color: '#ffd000',
      width: 3.5
    });
    burstWavesRef.current.push({
      x: targetX,
      y: targetY,
      radius: 6,
      maxRadius: 200,
      opacity: 0.9,
      color: '#ff3366',
      width: 2
    });

    // 70 Shimmering Diamond Star Flares & Fairy Dust Sparks
    for (let i = 0; i < 70; i++) {
      const angle = (i / 70) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 7 + 2.5;
      const isDiamondStar = Math.random() > 0.45;

      particlesRef.current.push({
        x: targetX,
        y: targetY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        size: isDiamondStar ? Math.random() * 6 + 4 : Math.random() * 4 + 2,
        life: 1.0,
        decay: Math.random() * 0.022 + 0.012,
        hue: [42, 35, 12, 340, 50][Math.floor(Math.random() * 5)],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.15,
        isStar: isDiamondStar
      });
    }
  }, [spellBurstTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let animationId;
    let clock = 0;

    // Helper: Draw 4-point diamond star sparkle flare
    const drawDiamondStar = (cx, cy, radius, rot, alpha, color) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      ctx.fillStyle = color || `rgba(255, 255, 230, ${alpha})`;
      ctx.shadowColor = '#ffd000';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.lineTo(radius, 0);
        ctx.lineTo(radius * 0.16, radius * 0.16);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clock += 0.035;

      let targetX = null;
      let targetY = null;

      if (cameraRef.current && handRef.current) {
        targetX = handRef.current.x * canvas.width;
        targetY = handRef.current.y * canvas.height;
      } else if (mouseRef.current.active && mouseRef.current.x !== null) {
        targetX = mouseRef.current.x;
        targetY = mouseRef.current.y;
      }

      // Smoothly interpolate cursor coordinates to eliminate all jitters
      if (targetX !== null && targetY !== null) {
        if (smoothedPosRef.current.x === null) {
          smoothedPosRef.current.x = targetX;
          smoothedPosRef.current.y = targetY;
        } else {
          smoothedPosRef.current.x += (targetX - smoothedPosRef.current.x) * 0.45;
          smoothedPosRef.current.y += (targetY - smoothedPosRef.current.y) * 0.45;
        }
      } else {
        smoothedPosRef.current.x = null;
        smoothedPosRef.current.y = null;
      }

      const emX = smoothedPosRef.current.x;
      const emY = smoothedPosRef.current.y;

      if (emX !== null && emY !== null) {
        // Continuous spawn of delicate fairy dust sparkles around finger point
        for (let i = 0; i < 2; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * 16;
          const hues = [42, 35, 15, 345, 52];
          const hue = hues[Math.floor(Math.random() * hues.length)];

          particlesRef.current.push({
            x: emX + Math.cos(angle) * dist,
            y: emY + Math.sin(angle) * dist,
            vx: (Math.random() - 0.5) * 1.5,
            vy: -Math.random() * 2.2 - 0.6,
            size: Math.random() * 3.8 + 1.2,
            life: 1.0,
            decay: Math.random() * 0.024 + 0.016,
            hue,
            rotation: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.1,
            isStar: Math.random() > 0.4
          });
        }

        ctx.save();
        ctx.globalCompositeOperation = 'screen';

        // 1. Wide Diffuse Velvet-Crimson Dream Halo (Deep soft blur)
        const haloPulse = 1 + 0.12 * Math.sin(clock * 2.5);
        const haloGrad = ctx.createRadialGradient(emX, emY, 0, emX, emY, 78 * haloPulse);
        haloGrad.addColorStop(0, 'rgba(230, 30, 75, 0.42)');
        haloGrad.addColorStop(0.35, 'rgba(180, 20, 50, 0.22)');
        haloGrad.addColorStop(0.7, 'rgba(120, 10, 30, 0.08)');
        haloGrad.addColorStop(1, 'rgba(40, 2, 10, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(emX, emY, 78 * haloPulse, 0, Math.PI * 2);
        ctx.fill();

        // 2. Warm Incandescent Golden Flame Aura (Mid soft glow)
        const innerPulse = 1 + 0.08 * Math.cos(clock * 3.2);
        const innerGrad = ctx.createRadialGradient(emX, emY, 0, emX, emY, 36 * innerPulse);
        innerGrad.addColorStop(0, 'rgba(255, 245, 190, 0.95)');
        innerGrad.addColorStop(0.25, 'rgba(255, 195, 65, 0.75)');
        innerGrad.addColorStop(0.6, 'rgba(255, 90, 80, 0.38)');
        innerGrad.addColorStop(1, 'rgba(255, 50, 80, 0)');
        ctx.fillStyle = innerGrad;
        ctx.beginPath();
        ctx.arc(emX, emY, 36 * innerPulse, 0, Math.PI * 2);
        ctx.fill();

        // 3. Dancing Organic Ethereal Flame Wisps (Soft floating flame droplets)
        for (let w = 0; w < 4; w++) {
          const wAngle = clock * 3.8 + w * (Math.PI * 2 / 4);
          const wDist = 7 + 5 * Math.sin(clock * 4.5 + w * 1.5);
          const wx = emX + Math.cos(wAngle) * wDist;
          const wy = emY - 8 - Math.abs(Math.sin(clock * 3 + w)) * 14 + Math.sin(wAngle) * 3;
          const wispRadius = 9 + 3 * Math.cos(clock * 5 + w);

          const wispGrad = ctx.createRadialGradient(wx, wy, 0, wx, wy, wispRadius);
          wispGrad.addColorStop(0, 'rgba(255, 250, 210, 0.85)');
          wispGrad.addColorStop(0.4, 'rgba(255, 175, 45, 0.5)');
          wispGrad.addColorStop(1, 'rgba(230, 40, 70, 0)');
          ctx.fillStyle = wispGrad;
          ctx.beginPath();
          ctx.arc(wx, wy, wispRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        // 4. Central Diamond Star Flare at Finger Point Core
        const coreSize = 13 + 3 * Math.sin(clock * 4);
        drawDiamondStar(emX, emY, coreSize, clock * 1.2, 0.95, '#ffffff');
        drawDiamondStar(emX, emY, coreSize * 0.65, -clock * 1.6, 0.85, '#ffe58f');

        // Tiny orbiting companion starlight diamond
        const orbX = emX + Math.cos(clock * 2.8) * 16;
        const orbY = emY + Math.sin(clock * 2.8) * 16;
        drawDiamondStar(orbX, orbY, 5.5, clock * 3, 0.8, '#fff2a3');

        ctx.restore();
      }

      // Render Expanding Starlight Burst Waves
      for (let i = burstWavesRef.current.length - 1; i >= 0; i--) {
        const bw = burstWavesRef.current[i];
        bw.radius += (bw.maxRadius - bw.radius) * 0.11 + 2.8;
        bw.opacity *= 0.92;

        if (bw.opacity <= 0.02 || bw.radius >= bw.maxRadius) {
          burstWavesRef.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          ctx.beginPath();
          ctx.arc(bw.x, bw.y, bw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = bw.color;
          ctx.lineWidth = bw.width * bw.opacity;
          ctx.globalAlpha = bw.opacity;
          ctx.shadowBlur = 20;
          ctx.shadowColor = bw.color;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Render Floating Fairy Dust and Diamond Star Sparkles
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.rotation += p.vRot;
        p.size *= 0.975;

        if (p.life <= 0 || p.size <= 0.3) {
          particlesRef.current.splice(i, 1);
        } else {
          const alpha = Math.max(0, p.life) * (0.75 + 0.25 * Math.sin(clock * 8 + i));
          if (p.isStar) {
            drawDiamondStar(
              p.x, 
              p.y, 
              p.size * 1.5, 
              p.rotation, 
              alpha, 
              `hsl(${p.hue}, 100%, 75%)`
            );
          } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.4, p.size), 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${p.hue}, 100%, 70%)`;
            ctx.globalAlpha = alpha;
            ctx.shadowBlur = 10;
            ctx.shadowColor = `hsl(${p.hue}, 100%, 60%)`;
            ctx.fill();
          }
        }
      }
      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="mystic-sparkle-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 90
      }}
    />
  );
}
