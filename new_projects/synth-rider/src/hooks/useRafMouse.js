import { useEffect, useRef } from 'react';

/**
 * Hook for high-frequency cursor tracking with direct DOM transform mutation.
 * Avoids React re-renders by utilizing requestAnimationFrame and direct ref updates.
 */
export function useRafMouse(containerRef, callback) {
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false });
  const rafId = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mousePos.current.targetX = e.clientX - rect.left;
      mousePos.current.targetY = e.clientY - rect.top;
      mousePos.current.isHovering = true;
    };

    const handleMouseEnter = () => {
      mousePos.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mousePos.current.isHovering = false;
      const rect = container.getBoundingClientRect();
      mousePos.current.targetX = rect.width / 2;
      mousePos.current.targetY = rect.height / 2;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const loop = () => {
      // Lerp smooth interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.15;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.15;

      if (callback) {
        callback(mousePos.current);
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [containerRef, callback]);

  return mousePos;
}
