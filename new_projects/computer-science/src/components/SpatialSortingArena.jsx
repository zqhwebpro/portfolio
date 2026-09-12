import React, { useState, useEffect, useRef } from 'react';
import { Trophy, RefreshCw, Play, Sparkles, Grid, Eye } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

const ARRAY_SIZE = 24;

export function SpatialSortingArena() {
  const [activeTab, setActiveTab] = useState('race'); // 'race' | 'quadtree'
  const [arrayBase, setArrayBase] = useState([]);
  const [isRacing, setIsRacing] = useState(false);
  const [results, setResults] = useState({
    quick: { arr: [], comps: 0, swaps: 0, done: false, active: [] },
    merge: { arr: [], comps: 0, swaps: 0, done: false, active: [] },
    bubble: { arr: [], comps: 0, swaps: 0, done: false, active: [] },
    insertion: { arr: [], comps: 0, swaps: 0, done: false, active: [] }
  });

  // QuadTree interactive state
  const quadCanvasRef = useRef(null);
  const [quadPoints, setQuadPoints] = useState([
    { x: 120, y: 80 }, { x: 340, y: 150 }, { x: 420, y: 220 },
    { x: 80, y: 260 }, { x: 220, y: 180 }, { x: 480, y: 90 }
  ]);

  // Generate initial random array
  const generateNewArray = () => {
    SoundEngine.playClick();
    const arr = Array.from({ length: ARRAY_SIZE }, () => Math.floor(Math.random() * 85) + 15);
    setArrayBase(arr);
    setResults({
      quick: { arr: [...arr], comps: 0, swaps: 0, done: false, active: [] },
      merge: { arr: [...arr], comps: 0, swaps: 0, done: false, active: [] },
      bubble: { arr: [...arr], comps: 0, swaps: 0, done: false, active: [] },
      insertion: { arr: [...arr], comps: 0, swaps: 0, done: false, active: [] }
    });
    setIsRacing(false);
  };

  useEffect(() => {
    generateNewArray();
  }, []);

  // Run Concurrent Race
  const startSortRace = async () => {
    if (isRacing) return;
    setIsRacing(true);
    SoundEngine.playClick();

    // 1. Bubble Sort Runner
    const runBubble = async () => {
      let arr = [...arrayBase];
      let comps = 0, swaps = 0;
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          comps++;
          if (arr[j] > arr[j + 1]) {
            swaps++;
            const t = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = t;
          }
          if (j % 2 === 0) {
            setResults(prev => ({
              ...prev,
              bubble: { arr: [...arr], comps, swaps, done: false, active: [j, j + 1] }
            }));
            await new Promise(r => setTimeout(r, 12));
          }
        }
      }
      setResults(prev => ({
        ...prev,
        bubble: { arr: [...arr], comps, swaps, done: true, active: [] }
      }));
    };

    // 2. Insertion Sort Runner
    const runInsertion = async () => {
      let arr = [...arrayBase];
      let comps = 0, swaps = 0;
      for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
          comps++;
          swaps++;
          arr[j + 1] = arr[j];
          j--;
          setResults(prev => ({
            ...prev,
            insertion: { arr: [...arr], comps, swaps, done: false, active: [j + 1, i] }
          }));
          await new Promise(r => setTimeout(r, 15));
        }
        arr[j + 1] = key;
      }
      setResults(prev => ({
        ...prev,
        insertion: { arr: [...arr], comps, swaps, done: true, active: [] }
      }));
    };

    // 3. QuickSort Runner
    const runQuick = async () => {
      let arr = [...arrayBase];
      let comps = 0, swaps = 0;
      async function partition(low, high) {
        let pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
          comps++;
          if (arr[j] < pivot) {
            i++;
            swaps++;
            let t = arr[i]; arr[i] = arr[j]; arr[j] = t;
            setResults(prev => ({
              ...prev,
              quick: { arr: [...arr], comps, swaps, done: false, active: [j, high] }
            }));
            await new Promise(r => setTimeout(r, 16));
          }
        }
        swaps++;
        let t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;
        setResults(prev => ({
          ...prev,
          quick: { arr: [...arr], comps, swaps, done: false, active: [i + 1, high] }
        }));
        await new Promise(r => setTimeout(r, 16));
        return i + 1;
      }
      async function qSort(low, high) {
        if (low < high) {
          let pi = await partition(low, high);
          await qSort(low, pi - 1);
          await qSort(pi + 1, high);
        }
      }
      await qSort(0, arr.length - 1);
      setResults(prev => ({
        ...prev,
        quick: { arr: [...arr], comps, swaps, done: true, active: [] }
      }));
    };

    // 4. MergeSort Runner
    const runMerge = async () => {
      let arr = [...arrayBase];
      let comps = 0, swaps = 0;
      async function merge(l, m, r) {
        let n1 = m - l + 1;
        let n2 = r - m;
        let L = arr.slice(l, m + 1);
        let R = arr.slice(m + 1, r + 1);
        let i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
          comps++;
          if (L[i] <= R[j]) {
            arr[k] = L[i]; i++;
          } else {
            arr[k] = R[j]; j++;
          }
          swaps++;
          k++;
          setResults(prev => ({
            ...prev,
            merge: { arr: [...arr], comps, swaps, done: false, active: [k] }
          }));
          await new Promise(r => setTimeout(r, 18));
        }
        while (i < n1) { arr[k] = L[i]; i++; k++; }
        while (j < n2) { arr[k] = R[j]; j++; k++; }
      }
      async function mSort(l, r) {
        if (l < r) {
          let m = Math.floor((l + r) / 2);
          await mSort(l, m);
          await mSort(m + 1, r);
          await merge(l, m, r);
        }
      }
      await mSort(0, arr.length - 1);
      setResults(prev => ({
        ...prev,
        merge: { arr: [...arr], comps, swaps, done: true, active: [] }
      }));
    };

    await Promise.all([runQuick(), runMerge(), runInsertion(), runBubble()]);
    setIsRacing(false);
    SoundEngine.playSuccess();
  };

  // Render Quadtree Canvas on click/hover
  useEffect(() => {
    if (activeTab !== 'quadtree') return;
    const canvas = quadCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    // Background Grid
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, w, h);

    // QuadTree Recursive Subdivider
    const MAX_CAPACITY = 1;
    function buildAndDrawQuad(boundary, pts, depth = 0) {
      ctx.strokeStyle = depth % 2 === 0 ? '#0038FF' : '#FF2A00';
      ctx.lineWidth = Math.max(1, 2.5 - depth * 0.4);
      ctx.strokeRect(boundary.x, boundary.y, boundary.w, boundary.h);

      if (pts.length <= MAX_CAPACITY || depth >= 4) {
        return;
      }

      const halfW = boundary.w / 2;
      const halfH = boundary.h / 2;

      const quadrants = [
        { x: boundary.x, y: boundary.y, w: halfW, h: halfH },
        { x: boundary.x + halfW, y: boundary.y, w: halfW, h: halfH },
        { x: boundary.x, y: boundary.y + halfH, w: halfW, h: halfH },
        { x: boundary.x + halfW, y: boundary.y + halfH, w: halfW, h: halfH },
      ];

      quadrants.forEach((q) => {
        const inside = pts.filter(p => p.x >= q.x && p.x < q.x + q.w && p.y >= q.y && p.y < q.y + q.h);
        buildAndDrawQuad(q, inside, depth + 1);
      });
    }

    buildAndDrawQuad({ x: 0, y: 0, w, h }, quadPoints, 0);

    // Draw Points
    quadPoints.forEach((p) => {
      ctx.fillStyle = '#FFE600';
      ctx.strokeStyle = '#0A0A0A';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
  }, [quadPoints, activeTab]);

  const handleCanvasClick = (e) => {
    const canvas = quadCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    SoundEngine.playClick();
    setQuadPoints(prev => [...prev, { x, y }]);
  };

  return (
    <section id="sorting" className="section-wrapper" style={{ background: 'var(--bg-paper)' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Trophy size={14} /> CONCEPT 04 // ALGORITHMIC RACING & SPATIAL CS
          </div>
          <h2 className="section-title">
            THE ALGORITHM <span style={{ color: 'var(--canary-yellow)', textShadow: '2px 2px 0px #000' }}>RACE ARENA</span> & QUADTREE
          </h2>
          <p className="section-subtitle">
            Observe the empirical reality of asymptotic time limits. Watch 4 sorting algorithms race concurrently against identical data, or explore 2D Quadtree spatial partitioning.
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => { setActiveTab('race'); SoundEngine.playClick(); }}
            className={`brutal-btn ${activeTab === 'race' ? 'brutal-btn-accent' : ''}`}
          >
            <Trophy size={16} /> 4-WAY SORTING RACE
          </button>
          <button
            onClick={() => { setActiveTab('quadtree'); SoundEngine.playClick(); }}
            className={`brutal-btn ${activeTab === 'quadtree' ? 'brutal-btn-primary' : ''}`}
          >
            <Grid size={16} /> 2D SPATIAL QUADTREE
          </button>
        </div>

        {activeTab === 'race' ? (
          <div>
            {/* Action Bar */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={startSortRace}
                disabled={isRacing}
                className="brutal-btn brutal-btn-primary"
              >
                <Play size={16} /> START HEAD-TO-HEAD RACE
              </button>
              <button
                onClick={generateNewArray}
                disabled={isRacing}
                className="brutal-btn"
              >
                <RefreshCw size={16} /> RANDOMIZE DATA
              </button>
            </div>

            {/* 4 Concurrent Race Tracks */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '1.5rem'
            }}>
              {[
                { key: 'quick', name: 'QUICKSORT', complexity: 'O(n log n)', color: 'var(--cobalt-blue)' },
                { key: 'merge', name: 'MERGESORT', complexity: 'O(n log n)', color: 'var(--emerald-mint)' },
                { key: 'insertion', name: 'INSERTION SORT', complexity: 'O(n²)', color: 'var(--canary-yellow)' },
                { key: 'bubble', name: 'BUBBLE SORT', complexity: 'O(n²)', color: 'var(--vermilion-red)' }
              ].map((algo) => {
                const data = results[algo.key];
                return (
                  <div key={algo.key} className="brutal-card" style={{
                    background: 'var(--bg-card)',
                    border: 'var(--border-thick)',
                    boxShadow: 'var(--shadow-md)',
                    padding: '1.25rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{algo.name}</h4>
                        <span className="brutal-pill" style={{ background: algo.color, color: algo.key === 'insertion' ? '#000' : '#FFF' }}>
                          {algo.complexity}
                        </span>
                      </div>
                      {data.done && (
                        <span className="font-mono" style={{ background: 'var(--canary-yellow)', border: '1.5px solid #000', padding: '2px 6px', fontWeight: 900, fontSize: '0.75rem' }}>
                          FINISHED
                        </span>
                      )}
                    </div>

                    {/* Bar Chart Representation */}
                    <div style={{
                      height: '140px',
                      background: 'var(--bg-paper)',
                      border: 'var(--border-solid)',
                      display: 'flex',
                      alignItems: 'flex-end',
                      gap: '2px',
                      padding: '4px',
                      marginBottom: '0.75rem'
                    }}>
                      {data.arr.map((val, idx) => {
                        const isActive = data.active.includes(idx);
                        return (
                          <div
                            key={idx}
                            style={{
                              flex: 1,
                              height: `${val}%`,
                              background: isActive ? 'var(--vermilion-red)' : data.done ? 'var(--emerald-mint)' : algo.color,
                              border: '1px solid #0A0A0A',
                              transition: 'height 0.05s linear'
                            }}
                          />
                        );
                      })}
                    </div>

                    {/* Telemetry Metrics */}
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span>COMPS: <strong>{data.comps}</strong></span>
                      <span>SWAPS: <strong>{data.swaps}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Quadtree Visualizer */
          <div className="brutal-card" style={{
            background: 'var(--bg-card)',
            border: 'var(--border-thick)',
            boxShadow: 'var(--shadow-lg)',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem' }}>SPATIAL QUADTREE SUBDIVISION</h3>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: '#666' }}>
                  Click anywhere on the canvas to inject points & watch recursive 2D bounding boxes partition.
                </span>
              </div>
              <button
                onClick={() => {
                  SoundEngine.playClick();
                  setQuadPoints([]);
                }}
                className="brutal-btn brutal-btn-sm"
              >
                CLEAR POINTS
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <canvas
                ref={quadCanvasRef}
                width={580}
                height={340}
                onClick={handleCanvasClick}
                style={{
                  width: '100%',
                  maxWidth: '580px',
                  height: 'auto',
                  border: 'var(--border-thick)',
                  cursor: 'crosshair',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
