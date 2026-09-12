import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Play, RotateCcw, Shuffle, Sparkles, ArrowDownUp, Layers, Compass, HelpCircle } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

// Initial Bauhaus Geometric Primitives
const INITIAL_SHAPES = [
  { id: 1, type: 'circle', color: '#0038FF', area: 85, hue: 226, label: '01' },
  { id: 2, type: 'square', color: '#FFE600', area: 120, hue: 54, label: '02' },
  { id: 3, type: 'triangle', color: '#FF2A00', area: 45, hue: 10, label: '03' },
  { id: 4, type: 'diamond', color: '#00E599', area: 95, hue: 160, label: '04' },
  { id: 5, type: 'semicircle', color: '#7928CA', area: 60, hue: 271, label: '05' },
  { id: 6, type: 'circle', color: '#00F0FF', area: 110, hue: 184, label: '06' },
  { id: 7, type: 'square', color: '#FF2A00', area: 70, hue: 10, label: '07' },
  { id: 8, type: 'triangle', color: '#FFE600', area: 130, hue: 54, label: '08' },
  { id: 9, type: 'diamond', color: '#0038FF', area: 50, hue: 226, label: '09' },
  { id: 10, type: 'semicircle', color: '#00E599', area: 100, hue: 160, label: '10' },
  { id: 11, type: 'square', color: '#7928CA', area: 140, hue: 271, label: '11' },
  { id: 12, type: 'circle', color: '#FF2A00', area: 35, hue: 10, label: '12' },
];

export function HeroPlayground() {
  const [shapes, setShapes] = useState(INITIAL_SHAPES);
  const [isSorting, setIsSorting] = useState(false);
  const [activeAlgorithm, setActiveAlgorithm] = useState('bubble');
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, timeElapsed: 0, state: 'IDLE' });
  const [activeIndices, setActiveIndices] = useState([]);
  
  const playgroundRef = useRef(null);
  const shapeDomRefs = useRef({});
  const mousePos = useRef({ x: 0, y: 0, isInside: false });
  const rafId = useRef(null);

  // Setup direct DOM requestAnimationFrame cursor field effect
  useEffect(() => {
    const container = playgroundRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mousePos.current.x = e.clientX - rect.left;
      mousePos.current.y = e.clientY - rect.top;
      mousePos.current.isInside = true;
    };

    const handleMouseLeave = () => {
      mousePos.current.isInside = false;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave);

    // 60fps physics / cursor repulsion loop on raw DOM nodes (ZERO React re-renders)
    const animateField = () => {
      if (mousePos.current.isInside) {
        Object.entries(shapeDomRefs.current).forEach(([id, domEl]) => {
          if (!domEl) return;
          const rect = domEl.getBoundingClientRect();
          const contRect = container.getBoundingClientRect();
          const elemX = rect.left - contRect.left + rect.width / 2;
          const elemY = rect.top - contRect.top + rect.height / 2;

          const dx = mousePos.current.x - elemX;
          const dy = mousePos.current.y - elemY;
          const dist = Math.hypot(dx, dy);

          if (dist < 140 && dist > 0) {
            const force = (1 - dist / 140) * 18;
            const angle = Math.atan2(dy, dx);
            const repelX = -Math.cos(angle) * force;
            const repelY = -Math.sin(angle) * force;
            domEl.style.transform = `translate3d(${repelX}px, ${repelY}px, 0) scale(${1 + force * 0.015})`;
          } else {
            domEl.style.transform = 'translate3d(0, 0, 0) scale(1)';
          }
        });
      } else {
        Object.values(shapeDomRefs.current).forEach((domEl) => {
          if (domEl) domEl.style.transform = 'translate3d(0, 0, 0) scale(1)';
        });
      }

      rafId.current = requestAnimationFrame(animateField);
    };

    rafId.current = requestAnimationFrame(animateField);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Bubble Sort by Area Step Generator
  const runBubbleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    SoundEngine.playClick();
    let arr = [...shapes];
    let comps = 0;
    let swaps = 0;
    const n = arr.length;

    setStats({ comparisons: 0, swaps: 0, timeElapsed: 0, state: 'RUNNING: BUBBLE SORT' });

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        comps++;
        setActiveIndices([j, j + 1]);
        SoundEngine.playNodeVisit(j);
        setStats(prev => ({ ...prev, comparisons: comps }));
        await new Promise(r => setTimeout(r, 120));

        if (arr[j].area > arr[j + 1].area) {
          swaps++;
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setShapes([...arr]);
          SoundEngine.playStackPush(j);
          setStats(prev => ({ ...prev, swaps }));
          await new Promise(r => setTimeout(r, 160));
        }
      }
    }

    setActiveIndices([]);
    setIsSorting(false);
    setStats(prev => ({ ...prev, state: 'COMPLETED: O(n²) SORTED' }));
    SoundEngine.playSuccess();
  };

  // Quick Sort by Hue
  const runQuickSortByHue = async () => {
    if (isSorting) return;
    setIsSorting(true);
    SoundEngine.playClick();
    let arr = [...shapes];
    let comps = 0;
    let swaps = 0;
    setStats({ comparisons: 0, swaps: 0, timeElapsed: 0, state: 'RUNNING: QUICKSORT (HUE)' });

    async function partition(low, high) {
      const pivot = arr[high].hue;
      let i = low - 1;

      for (let j = low; j < high; j++) {
        comps++;
        setActiveIndices([j, high]);
        SoundEngine.playNodeVisit(j);
        setStats(prev => ({ ...prev, comparisons: comps }));
        await new Promise(r => setTimeout(r, 130));

        if (arr[j].hue < pivot) {
          i++;
          swaps++;
          const t = arr[i];
          arr[i] = arr[j];
          arr[j] = t;
          setShapes([...arr]);
          SoundEngine.playStackPush(i);
          setStats(prev => ({ ...prev, swaps }));
          await new Promise(r => setTimeout(r, 150));
        }
      }

      swaps++;
      const t = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = t;
      setShapes([...arr]);
      setStats(prev => ({ ...prev, swaps }));
      await new Promise(r => setTimeout(r, 150));
      return i + 1;
    }

    async function qSort(low, high) {
      if (low < high) {
        const pi = await partition(low, high);
        await qSort(low, pi - 1);
        await qSort(pi + 1, high);
      }
    }

    await qSort(0, arr.length - 1);
    setActiveIndices([]);
    setIsSorting(false);
    setStats(prev => ({ ...prev, state: 'COMPLETED: O(n log n) SPECTRUM' }));
    SoundEngine.playSuccess();
  };

  // Shuffle Elements
  const shuffleShapes = () => {
    if (isSorting) return;
    SoundEngine.playClick();
    const shuffled = [...shapes].sort(() => Math.random() - 0.5);
    setShapes(shuffled);
    setActiveIndices([]);
    setStats({ comparisons: 0, swaps: 0, timeElapsed: 0, state: 'STATE SCATTERED (CHAOS)' });
  };

  // Render SVG Primitive based on Type
  const renderShapeIcon = (shape, isCompared) => {
    const size = Math.max(38, Math.min(68, shape.area * 0.5));
    const border = isCompared ? '3px solid #0A0A0A' : '2px solid #0A0A0A';
    
    switch (shape.type) {
      case 'circle':
        return (
          <div style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: shape.color,
            border,
            boxShadow: isCompared ? '0 0 0 4px var(--canary-yellow), 4px 4px 0px #000' : '3px 3px 0px #000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.75rem',
            color: '#0A0A0A',
            transition: 'box-shadow 0.15s ease'
          }}>
            {shape.label}
          </div>
        );
      case 'square':
        return (
          <div style={{
            width: `${size}px`,
            height: `${size}px`,
            background: shape.color,
            border,
            boxShadow: isCompared ? '0 0 0 4px var(--canary-yellow), 4px 4px 0px #000' : '3px 3px 0px #000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.75rem',
            color: '#0A0A0A',
            transition: 'box-shadow 0.15s ease'
          }}>
            {shape.label}
          </div>
        );
      case 'triangle':
        return (
          <div style={{
            width: `${size}px`,
            height: `${size}px`,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width={size} height={size} viewBox="0 0 60 60">
              <polygon
                points="30,5 55,55 5,55"
                fill={shape.color}
                stroke="#0A0A0A"
                strokeWidth={isCompared ? "4" : "3"}
              />
            </svg>
            <span style={{ position: 'absolute', bottom: '12%', fontWeight: 800, fontSize: '0.75rem', color: '#0A0A0A' }}>
              {shape.label}
            </span>
          </div>
        );
      case 'diamond':
        return (
          <div style={{
            width: `${size * 0.9}px`,
            height: `${size * 0.9}px`,
            background: shape.color,
            border,
            transform: 'rotate(45deg)',
            boxShadow: isCompared ? '0 0 0 4px var(--canary-yellow), 4px 4px 0px #000' : '3px 3px 0px #000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'box-shadow 0.15s ease'
          }}>
            <span style={{ transform: 'rotate(-45deg)', fontWeight: 800, fontSize: '0.75rem', color: '#0A0A0A' }}>
              {shape.label}
            </span>
          </div>
        );
      default: // semicircle
        return (
          <div style={{
            width: `${size}px`,
            height: `${size / 2}px`,
            borderRadius: `${size}px ${size}px 0 0`,
            background: shape.color,
            border,
            boxShadow: isCompared ? '0 0 0 4px var(--canary-yellow), 4px 4px 0px #000' : '3px 3px 0px #000',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.75rem',
            color: '#0A0A0A',
            paddingBottom: '2px',
            transition: 'box-shadow 0.15s ease'
          }}>
            {shape.label}
          </div>
        );
    }
  };

  return (
    <section id="hero" className="section-wrapper" style={{ paddingTop: 'clamp(2rem, 5vw, 4rem)', background: 'var(--bg-paper)' }}>
      <div className="container">
        {/* Top Badges and Metadata */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <div className="section-tag">
            <Compass size={14} /> FOUNDATIONS OF CS
          </div>
          <span className="brutal-pill pill-blue">CANVAS: INTERACTIVE GRAPHICS</span>
          <span className="brutal-pill pill-yellow">PARADIGM: BAUHAUS NEO-BRUTALISM</span>
          <span className="brutal-pill pill-mint">60FPS RAF DISPLACEMENT</span>
        </div>

        {/* Hero Title Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          {/* Left Column: Massive Manifesto Typography */}
          <div>
            <h1 style={{
              fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
              lineHeight: 0.95,
              marginBottom: '1.5rem',
              letterSpacing: '-0.04em'
            }}>
              THE <span style={{ color: 'var(--cobalt-blue)', textDecoration: 'underline wavy var(--canary-yellow)' }}>GEOMETRY</span><br />
              OF COMPUTATION.
            </h1>

            <p style={{
              fontSize: 'clamp(1.1rem, 2.2vw, 1.35rem)',
              lineHeight: 1.5,
              fontWeight: 500,
              maxWidth: '560px',
              marginBottom: '2rem',
              color: '#333'
            }}>
              Computer science is the art of structuring thought into physical space and runtime dimensions. 
              Explore algorithms not as dry formulas, but as vivid geometric state transitions, balanced trees, and memory towers.
            </p>

            {/* Quick Action Matrix */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="#big-o" className="brutal-btn brutal-btn-primary" onClick={() => SoundEngine.playClick()}>
                <Sparkles size={16} /> ENTER THE INFOGRAPH
              </a>
              <a href="#recursion" className="brutal-btn" onClick={() => SoundEngine.playClick()}>
                <Layers size={16} /> EXPLORE RECURSION
              </a>
            </div>
          </div>

          {/* Right Column: Bauhaus Geometric CS Manifesto Card */}
          <div className="brutal-card" style={{
            background: 'var(--bg-card)',
            border: 'var(--border-thick)',
            boxShadow: 'var(--shadow-xl)',
            padding: '2rem',
            position: 'relative'
          }}>
            {/* Corner Decorative Geometric Stamps */}
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '-12px',
              width: '40px',
              height: '40px',
              background: 'var(--vermilion-red)',
              border: '2px solid #000',
              boxShadow: '2px 2px 0px #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              fontFamily: 'var(--font-mono)',
              fontWeight: 900,
              fontSize: '0.8rem'
            }}>
              #01
            </div>

            <div style={{
              borderBottom: 'var(--border-solid)',
              paddingBottom: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span className="font-mono" style={{ fontWeight: 800, fontSize: '0.9rem' }}>
                // AXIOMS OF ALGORITHMS
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', background: 'var(--cobalt-blue)', border: '1px solid #000' }}></span>
                <span style={{ width: '8px', height: '8px', background: 'var(--canary-yellow)', border: '1px solid #000' }}></span>
                <span style={{ width: '8px', height: '8px', background: 'var(--vermilion-red)', border: '1px solid #000' }}></span>
              </div>
            </div>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ background: 'var(--cobalt-blue)', color: '#fff', padding: '0 5px', fontWeight: 800 }}>01</span>
                <span><strong>TIME COMPLEXITY</strong> defines asymptotic growth as input N approaches infinity.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ background: 'var(--canary-yellow)', color: '#000', padding: '0 5px', fontWeight: 800 }}>02</span>
                <span><strong>CALL STACKS</strong> preserve execution state in a physical LIFO memory tower.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ background: 'var(--vermilion-red)', color: '#fff', padding: '0 5px', fontWeight: 800 }}>03</span>
                <span><strong>GRAPHS & TREES</strong> map topology, pathing, and hierarchy with edge traversals.</span>
              </li>
            </ul>

            {/* Brutalist Warning Bar */}
            <div style={{
              marginTop: '1.5rem',
              background: '#0A0A0A',
              color: 'var(--canary-yellow)',
              padding: '0.6rem 1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>HARDWARE: DISCRETE LOGIC</span>
              <span>PARALLEL: READY</span>
            </div>
          </div>
        </div>

        {/* =========================================
            INTERACTIVE GEOMETRIC PLAYGROUND
            ========================================= */}
        <div className="brutal-card" style={{
          background: 'var(--bg-card)',
          border: 'var(--border-thick)',
          boxShadow: 'var(--shadow-lg)',
          padding: '0',
          overflow: 'hidden'
        }}>
          {/* Playground Top Controller Bar */}
          <div style={{
            background: '#0A0A0A',
            color: '#FFFFFF',
            padding: '0.85rem 1.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            borderBottom: 'var(--border-solid)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="font-mono" style={{ color: 'var(--canary-yellow)', fontWeight: 800, fontSize: '0.9rem' }}>
                [INTERACTIVE STATE PLAYGROUND]
              </span>
              <span className="font-mono" style={{ fontSize: '0.75rem', color: '#AAA' }}>
                Move mouse over shapes to distort field
              </span>
            </div>

            {/* Playback & Sort Trigger Buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={runBubbleSort}
                disabled={isSorting}
                className="brutal-btn brutal-btn-accent brutal-btn-sm"
              >
                <ArrowDownUp size={14} /> SORT BY AREA [BUBBLE]
              </button>
              <button
                onClick={runQuickSortByHue}
                disabled={isSorting}
                className="brutal-btn brutal-btn-primary brutal-btn-sm"
              >
                <Sparkles size={14} /> SORT BY HUE [QUICKSORT]
              </button>
              <button
                onClick={shuffleShapes}
                disabled={isSorting}
                className="brutal-btn brutal-btn-sm"
              >
                <Shuffle size={14} /> SCATTER / CHAOS
              </button>
            </div>
          </div>

          {/* Real-time State Monitor Ribbon */}
          <div style={{
            background: 'var(--bg-paper)',
            padding: '0.5rem 1.25rem',
            borderBottom: 'var(--border-solid)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span>STATE: <strong style={{ color: 'var(--cobalt-blue)' }}>{stats.state}</strong></span>
              <span>COMPARISONS: <strong>{stats.comparisons}</strong></span>
              <span>SWAPS: <strong>{stats.swaps}</strong></span>
            </div>
            <div style={{ color: 'var(--text-muted)' }}>
              ELEMENTS: 12 PRIMITIVES
            </div>
          </div>

          {/* Interactive Playground Canvas / Grid */}
          <div
            ref={playgroundRef}
            style={{
              minHeight: '260px',
              padding: '2.5rem 1.5rem',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '1.25rem',
              background: 'radial-gradient(#00000018 1px, transparent 1px), #ffffff',
              backgroundSize: '20px 20px',
              position: 'relative',
              cursor: 'crosshair'
            }}
          >
            {shapes.map((shape, idx) => {
              const isCompared = activeIndices.includes(idx);
              return (
                <div
                  key={shape.id}
                  ref={el => shapeDomRefs.current[shape.id] = el}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: isSorting ? 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
                    willChange: 'transform'
                  }}
                >
                  {renderShapeIcon(shape, isCompared)}
                  <span className="font-mono" style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: isCompared ? 'var(--vermilion-red)' : '#777',
                    background: isCompared ? 'var(--canary-yellow)' : 'transparent',
                    padding: '0 2px'
                  }}>
                    {shape.area}px²
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Bauhaus Bar */}
          <div className="bauhaus-divider" />
        </div>
      </div>
    </section>
  );
}
