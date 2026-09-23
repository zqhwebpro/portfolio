import React, { useEffect, useRef } from 'react';

export function SparkleCanvas({ handCoordinates, rawLandmarks, isCameraActive }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const pointerPosRef = useRef({ x: -100, y: -100 });
  const prevPointerPosRef = useRef({ x: -100, y: -100 });
  const animFrameRef = useRef(null);

  // Track mouse or touch position when hand tracking is inactive
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isCameraActive && handCoordinates) return;
      pointerPosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e) => {
      if (isCameraActive && handCoordinates) return;
      if (e.touches && e.touches[0]) {
        pointerPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isCameraActive, handCoordinates]);

  // Update pointer pos from MediaPipe hand tracking if available
  useEffect(() => {
    if (isCameraActive) {
      if (rawLandmarks && rawLandmarks[8]) {
        // Index finger tip landmark (mirrored X)
        const fx = (1.0 - rawLandmarks[8].x) * window.innerWidth;
        const fy = rawLandmarks[8].y * window.innerHeight;
        pointerPosRef.current = { x: fx, y: fy };
      } else if (handCoordinates) {
        pointerPosRef.current = {
          x: handCoordinates.x * window.innerWidth,
          y: handCoordinates.y * window.innerHeight
        };
      }
    }
  }, [isCameraActive, handCoordinates, rawLandmarks]);

  // Helper to spawn continuous glowing gold magic sparks
  const spawnSparkle = (x, y, isMoving = false) => {
    const colors = [
      '#ffd700', // Radiant Gold
      '#f5a623', // Amber Gold
      '#ffb703', // Warm Arcane Gold
      '#fff6d6', // Star White-Gold
      '#f9e2af'  // Soft Starlight Gold
    ];

    const count = isMoving ? 3 : 1;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.4 + 0.3;

      particlesRef.current.push({
        x: x + (Math.random() * 10 - 5),
        y: y + (Math.random() * 10 - 5),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.4,
        size: Math.random() * 3.8 + 1.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 25 + 20,
        rotation: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.12
      });
    }
  };

  // Main Canvas Render Loop
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

    const draw4PointStar = (ctx, cx, cy, spikes, outerRadius, innerRadius, color, alpha, rot) => {
      ctx.save();
      ctx.beginPath();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      let step = Math.PI / spikes;
      let rotAngle = 0;

      ctx.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        let x = Math.cos(rotAngle) * outerRadius;
        let y = Math.sin(rotAngle) * outerRadius;
        ctx.lineTo(x, y);
        rotAngle += step;

        x = Math.cos(rotAngle) * innerRadius;
        y = Math.sin(rotAngle) * innerRadius;
        ctx.lineTo(x, y);
        rotAngle += step;
      }
      ctx.lineTo(0, -outerRadius);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = 14;
      ctx.shadowColor = '#ffd700';
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const px = pointerPosRef.current.x;
      const py = pointerPosRef.current.y;
      const prevX = prevPointerPosRef.current.x;
      const prevY = prevPointerPosRef.current.y;

      const dist = Math.hypot(px - prevX, py - prevY);

      if (px > 0 && py > 0) {
        // Continuous, smooth emission trailing finger/cursor
        spawnSparkle(px, py, dist > 4);

        // Draw soft glowing golden magical aura at finger tip
        ctx.save();
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 32);
        grad.addColorStop(0, 'rgba(255, 215, 0, 0.6)');
        grad.addColorStop(0.4, 'rgba(245, 166, 35, 0.28)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 32, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      prevPointerPosRef.current = { x: px, y: py };

      // Update and render active sparkles
      const nextParticles = [];
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.life += 1;

        if (p.life < p.maxLife) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.03; // Soft upward drift & gravity
          p.vx *= 0.96;
          p.rotation += p.rotSpeed;

          const progress = p.life / p.maxLife;
          const alpha = Math.max(0, 1 - progress);
          const currentSize = p.size * (1 - progress * 0.35);

          draw4PointStar(
            ctx,
            p.x,
            p.y,
            4,
            currentSize,
            currentSize * 0.35,
            p.color,
            alpha,
            p.rotation
          );

          nextParticles.push(p);
        }
      }

      particlesRef.current = nextParticles;
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="magic-finger-sparkle-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 90
      }}
    />
  );
}
