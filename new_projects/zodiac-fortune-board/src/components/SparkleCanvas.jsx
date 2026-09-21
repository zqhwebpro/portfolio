import React, { useEffect, useRef } from 'react';

export function SparkleCanvas({ handCoordinates, isCameraActive }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId;

    const createParticle = (x, y) => {
      particlesRef.current.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 1, // drift upwards slightly
        size: Math.random() * 4 + 2,
        life: 1,
        color: `hsl(${40 + Math.random() * 40}, 100%, 70%)` // Golden/magical hues
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isCameraActive && handCoordinates) {
        // Because camera is mirrored (scaleX(-1)), we mirror the x coordinate
        const screenX = (1 - handCoordinates.x) * canvas.width;
        const screenY = handCoordinates.y * canvas.height;
        
        // Spawn multiple particles per frame for a dense effect
        for(let i = 0; i < 3; i++) {
          createParticle(screenX + (Math.random() - 0.5) * 20, screenY + (Math.random() - 0.5) * 20);
        }
      }

      particlesRef.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02; // Fade out speed
        p.size *= 0.95; // Shrink

        if (p.life <= 0) {
          particlesRef.current.splice(index, 1);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.shadowBlur = 15;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.globalAlpha = 1;
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [handCoordinates, isCameraActive]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
}
