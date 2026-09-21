import React, { useEffect, useRef } from 'react';

export function SparkleCanvas({ 
  handCoordinates, 
  isCameraActive, 
  activeSpell, 
  currentElement,
  spellBurstTrigger 
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const shockwavesRef = useRef([]);
  const runeAngleRef = useRef(0);

  const handRef = useRef(handCoordinates);
  const cameraRef = useRef(isCameraActive);
  const spellRef = useRef(activeSpell);
  const elementRef = useRef(currentElement);
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

  useEffect(() => {
    elementRef.current = currentElement;
  }, [currentElement]);

  // Trigger burst when spell is cast
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

    // Add shockwave ring
    shockwavesRef.current.push({
      x: targetX,
      y: targetY,
      radius: 10,
      maxRadius: 280,
      opacity: 1,
      color: elementRef.current ? elementRef.current.color : '#ffd700'
    });

    // Add 60 radial burst particles
    const elemColor = elementRef.current ? elementRef.current.color : '#ffd700';
    for (let i = 0; i < 60; i++) {
      const angle = (i / 60) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const speed = Math.random() * 7 + 3;
      particlesRef.current.push({
        x: targetX,
        y: targetY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 5 + 3,
        life: 1.0,
        decay: Math.random() * 0.02 + 0.015,
        color: elemColor,
        sparkle: Math.random() > 0.5
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

    const getElementHues = (element) => {
      if (!element) return [40, 50]; // Gold
      switch (element.name) {
        case 'Ignis': return [0, 30]; // Red/Orange
        case 'Terra': return [120, 160]; // Emerald
        case 'Aer': return [180, 210]; // Cyan/Electric
        case 'Aqua': return [260, 290]; // Indigo/Violet
        default: return [40, 55];
      }
    };

    const spawnParticle = (x, y, speedMult = 1) => {
      const [minHue, maxHue] = getElementHues(elementRef.current);
      const hue = minHue + Math.random() * (maxHue - minHue);
      const isSpellActive = spellRef.current === 'PINCH' || spellRef.current === 'PEACE';

      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 16,
        vx: (Math.random() - 0.5) * 2.5 * speedMult,
        vy: (Math.random() - 0.5) * 2.5 * speedMult - (isSpellActive ? 1.5 : 0.8),
        size: Math.random() * (isSpellActive ? 5 : 3.5) + 1.5,
        life: 1.0,
        decay: Math.random() * 0.02 + 0.015,
        color: `hsl(${hue}, 100%, ${isSpellActive ? 75 : 65}%)`,
        sparkle: Math.random() > 0.4
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      runeAngleRef.current += 0.015;

      let emitterX = null;
      let emitterY = null;

      if (cameraRef.current && handRef.current) {
        emitterX = handRef.current.x * canvas.width;
        emitterY = handRef.current.y * canvas.height;
      } else if (mouseRef.current.active && mouseRef.current.x !== null) {
        emitterX = mouseRef.current.x;
        emitterY = mouseRef.current.y;
      }

      // Draw Arcane Summoning Circle at hand/cursor position
      if (emitterX !== null && emitterY !== null) {
        // Spawn continuous stardust particles
        const particleCount = spellRef.current ? 4 : 2;
        for (let i = 0; i < particleCount; i++) {
          spawnParticle(emitterX, emitterY);
        }

        ctx.save();
        ctx.translate(emitterX, emitterY);

        const elemColor = elementRef.current ? elementRef.current.color : '#ffd700';
        ctx.strokeStyle = elemColor;
        ctx.shadowColor = elemColor;
        ctx.shadowBlur = 12;

        // Inner glowing core
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Rotating sacred rune ring
        ctx.rotate(runeAngleRef.current);
        ctx.beginPath();
        ctx.arc(0, 0, 24, 0, Math.PI * 2);
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Pinch charge effect
        if (spellRef.current === 'PINCH') {
          ctx.beginPath();
          ctx.arc(0, 0, 36, 0, Math.PI * 2);
          ctx.lineWidth = 2;
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.stroke();
        }

        ctx.restore();
      }

      // Render Shockwaves
      for (let i = shockwavesRef.current.length - 1; i >= 0; i--) {
        const sw = shockwavesRef.current[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.12 + 2;
        sw.opacity *= 0.92;

        if (sw.opacity <= 0.02 || sw.radius >= sw.maxRadius) {
          shockwavesRef.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
          ctx.strokeStyle = sw.color;
          ctx.lineWidth = 4 * sw.opacity;
          ctx.globalAlpha = sw.opacity;
          ctx.shadowBlur = 20;
          ctx.shadowColor = sw.color;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Render Stardust Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.size *= 0.96;

        if (p.life <= 0 || p.size <= 0.5) {
          particlesRef.current.splice(i, 1);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.shadowBlur = p.sparkle ? 16 : 8;
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
