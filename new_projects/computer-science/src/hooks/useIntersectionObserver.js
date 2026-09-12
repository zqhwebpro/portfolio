import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook to detect when an element intersects the viewport.
 * Used for staggered animations and lazy triggering of visualizers.
 */
export function useIntersectionObserver(options = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = elementRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once visible, keep visible for educational infographics
        observer.unobserve(target);
      }
    }, options);

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [options]);

  return [elementRef, isVisible];
}
