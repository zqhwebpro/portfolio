import React, { useEffect, useRef } from 'react';

export function SparkleCanvas({ 
  handCoordinates, 
  isCameraActive, 
  activeSpell, 
  spellBurstTrigger 
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const shockwavesRef = useRef([]);
  const runeAngleRef = useRef(0);
  const secondaryAngleRef = useRef(0);

  const handRef = useRef(handCoordinates);
  const cameraRef = useRef(isCameraActive);
  const spellRef = useRef(activeSpell);
  const mouseRef = useRef({ x: null, y: null, active: false });

  useEffect(() => {
    handRef.current = handCoordinates;
  }, [handCoordinates]);

  useEffect(() => {
    cameraRef.current = isCameraActive;
  }, [isCameraActive]);

  useEffect(() => {
    spellRef.current = activeSpell;
  }, [activeSpell]);

  // Trigger Doctor Strange Eldritch Mandala burst on spell cast
  useEffect(() => {
    if (!spellBurstTrigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let targetX = canvas.width / 2;
    let targetY = canvas.height / 2;

    if (handRef.current) {
      targetX = handRef.current.x * canvas.width;
      targetY = handRef.current.y * canvas.height;
    } else if (mouseRef.current.active && mouseRef.current.x !== null) {
      targetX = mouseRef.current.x;
      targetY = mouseRef.current.y;
    }

    // Add dual mandala shockwaves (fiery orange and incandescent gold)
    shockwavesRef.current.push({
      x: targetX,
      y: targetY,
      radius: 15,
      maxRadius: 320,
      opacity: 1,
      color: '#ff9d00',
      width: 4
    });
    shockwavesRef.current.push({
      x: targetX,
      y: targetY,
      radius: 5,
      maxRadius: 240,
      opacity: 1,
      color: '#ffe066',
      width: 2.5
    });

    // Add 80 Doctor Strange fiery ember spark particles
    for (let i = 0; i < 80; i++) {
      const angle = (i / 80) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const speed = Math.random() * 8 + 3.5;
      const hues = [35, 45, 25, 15]; // Glowing fiery orange, amber, incandescent gold
      const hue = hues[Math.floor(Math.random() * hues.length)];

      particlesRef.current.push({
        x: targetX,
        y: targetY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 2.5,
        life: 1.0,
        decay: Math.random() * 0.025 + 0.015,
        color: `hsl(${hue}, 100%, ${Math.random() * 25 + 60}%)`,
        sparkle: Math.random() > 0.4
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

    const spawnSparks = (x, y) => {
      const hues = [42, 32, 20, 50]; // Doctor Strange fiery amber sparks
      const hue = hues[Math.floor(Math.random() * hues.length)];
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;

      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        size: Math.random() * 3.5 + 1.5,
        life: 1.0,
        decay: Math.random() * 0.03 + 0.02,
        color: `hsl(${hue}, 100%, ${Math.random() * 25 + 65}%)`,
        sparkle: Math.random() > 0.35
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      runeAngleRef.current += 0.022;
      secondaryAngleRef.current -= 0.015;

      let emitterX = null;
      let emitterY = null;

      if (cameraRef.current && handRef.current) {
        emitterX = handRef.current.x * canvas.width;
        emitterY = handRef.current.y * canvas.height;
      } else if (mouseRef.current.active && mouseRef.current.x !== null) {
        emitterX = mouseRef.current.x;
        emitterY = mouseRef.current.y;
      }

      // Draw Doctor Strange Tao Mandala at hand/cursor position
      if (emitterX !== null && emitterY !== null) {
        // Spawn continuous fiery sparks
        for (let i = 0; i < 3; i++) {
          spawnSparks(emitterX, emitterY);
        }

        ctx.save();
        ctx.translate(emitterX, emitterY);

        // Core incandescent blaze
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffb300';
        ctx.shadowBlur = 18;
        ctx.fill();

        // Doctor Strange Rotating Outer Tao Mandala Ring
        ctx.save();
        ctx.rotate(runeAngleRef.current);
        ctx.strokeStyle = '#ff9d00';
        ctx.shadowColor = '#ff6600';
        ctx.shadowBlur = 14;
        ctx.lineWidth = 2;

        // Outer circular perimeter with dashed fiery segments
        ctx.beginPath();
        ctx.arc(0, 0, 32, 0, Math.PI * 2);
        ctx.setLineDash([8, 5, 2, 5]);
        ctx.stroke();

        // Concentric inner ring
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.setLineDash([]);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = '#ffd700';
        ctx.stroke();

        // Interlocking Eldritch Square 1
        ctx.strokeRect(-16, -16, 32, 32);

        // Interlocking Eldritch Square 2 (Rotated 45 degrees -> Octagram)
        ctx.rotate(Math.PI / 4);
        ctx.strokeRect(-16, -16, 32, 32);

        ctx.restore();

        // Counter-rotating secondary mystic ring
        ctx.save();
        ctx.rotate(secondaryAngleRef.current);
        ctx.beginPath();
        ctx.arc(0, 0, 42, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 140, 0, 0.6)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 10]);
        ctx.stroke();
        ctx.restore();

        ctx.restore();
      }

      // Render Expanding Shockwaves
      for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
        const sw = shockwavesRef.current[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.12 + 2.5;
        sw.opacity *= 0.91;

        if (sw.opacity <= 0.02 || sw.radius >= sw.maxRadius) {
          shockwavesRef.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = sw.color;
          ctx.lineWidth = sw.width * sw.opacity;
          ctx.globalAlpha = sw.opacity;
          ctx.shadowBlur = 24;
          ctx.shadowColor = sw.color;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Render Doctor Strange Fiery Ember Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.size *= 0.955;

        if (p.life <= 0 || p.size <= 0.4) {
          particlesRef.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.4, p.size), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.shadowBlur = p.sparkle ? 18 : 9;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      }

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
