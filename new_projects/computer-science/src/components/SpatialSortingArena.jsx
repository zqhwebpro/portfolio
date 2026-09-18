import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Shuffle, ChevronRight, ArrowDownUp, CheckCircle, BarChart2, Layers } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

const INITIAL_ARRAY = [42, 18, 77, 23, 91, 5, 64, 33];

export function SpatialSortingArena() {
  const [array, setArray] = useState(INITIAL_ARRAY);
  const [algo, setAlgo] = useState('selection'); // 'selection' | 'insertion'
  const [sortedIndex, setSortedIndex] = useState(0);
  const [comparingIndices, setComparingIndices] = useState([]);
  const [minCandidateIndex, setMinCandidateIndex] = useState(null);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, steps: 0, isFinished: false });
  const [explanation, setExplanation] = useState('Select an algorithm and click "Step" or "Auto Play" to begin sorting.');
  const [isPlaying, setIsPlaying] = useState(false);

  const resetArray = (preset = 'random') => {
    SoundEngine.playClick();
    setIsPlaying(false);
    let newArr;
    if (preset === 'random') {
      newArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
    } else if (preset === 'reversed') {
      newArr = [95, 80, 65, 50, 40, 30, 20, 10];
    } else if (preset === 'nearly') {
      newArr = [10, 20, 35, 30, 50, 65, 80, 75];
    } else {
      newArr = [...INITIAL_ARRAY];
    }

    setArray(newArr);
    setSortedIndex(0);
    setComparingIndices([]);
    setMinCandidateIndex(null);
    setStats({ comparisons: 0, swaps: 0, steps: 0, isFinished: false });
    setExplanation(`Initialized array of size ${newArr.length}. Ready for ${algo === 'selection' ? 'Selection Sort' : 'Insertion Sort'}.`);
  };

  // Step generator for Selection Sort
  const stepSelectionSort = (currArr, currSorted, currStats) => {
    const arr = [...currArr];
    const n = arr.length;
    let i = currSorted;
    let comps = currStats.comparisons;
    let swaps = currStats.swaps;

    if (i >= n - 1) {
      SoundEngine.playFanfare();
      return { arr, sorted: n, stats: { ...currStats, isFinished: true }, explanation: 'Array is fully sorted via Selection Sort!' };
    }

    // Find min in arr[i..n-1]
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comps++;
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // Swap min with arr[i]
    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      swaps++;
      SoundEngine.playPop();
    } else {
      SoundEngine.playBlip();
    }

    const exp = `Found minimum ${arr[i]} at index ${minIdx}. Swapped into sorted position index ${i}.`;
    return {
      arr,
      sorted: i + 1,
      minIdx,
      comparing: [i, minIdx],
      stats: { comparisons: comps, swaps, steps: currStats.steps + 1, isFinished: i + 1 >= n - 1 },
      explanation: exp
    };
  };

  // Step generator for Insertion Sort
  const stepInsertionSort = (currArr, currSorted, currStats) => {
    const arr = [...currArr];
    const n = arr.length;
    let i = Math.max(1, currSorted === 0 ? 1 : currSorted);
    let comps = currStats.comparisons;
    let swaps = currStats.swaps;

    if (i >= n) {
      SoundEngine.playFanfare();
      return { arr, sorted: n, stats: { ...currStats, isFinished: true }, explanation: 'Array is fully sorted via Insertion Sort!' };
    }

    const key = arr[i];
    let j = i - 1;
    let inserted = false;

    while (j >= 0) {
      comps++;
      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        swaps++;
        j--;
      } else {
        break;
      }
    }
    arr[j + 1] = key;
    SoundEngine.playPop();

    const exp = `Inserted key ${key} into sorted prefix at index ${j + 1}.`;
    return {
      arr,
      sorted: i + 1,
      comparing: [j + 1, i],
      stats: { comparisons: comps, swaps, steps: currStats.steps + 1, isFinished: i + 1 >= n },
      explanation: exp
    };
  };

  const handleStep = () => {
    if (stats.isFinished) return;
    if (algo === 'selection') {
      const res = stepSelectionSort(array, sortedIndex, stats);
      setArray(res.arr);
      setSortedIndex(res.sorted);
      setMinCandidateIndex(res.minIdx);
      setComparingIndices(res.comparing || []);
      setStats(res.stats);
      setExplanation(res.explanation);
    } else {
      const res = stepInsertionSort(array, sortedIndex, stats);
      setArray(res.arr);
      setSortedIndex(res.sorted);
      setComparingIndices(res.comparing || []);
      setStats(res.stats);
      setExplanation(res.explanation);
    }
  };

  const handleAutoPlay = () => {
    if (isPlaying || stats.isFinished) return;
    setIsPlaying(true);
    SoundEngine.playClick();

    let currentArr = [...array];
    let currentSorted = sortedIndex;
    let currentStats = { ...stats };

    const interval = setInterval(() => {
      if (currentStats.isFinished || currentSorted >= currentArr.length - 1) {
        clearInterval(interval);
        setIsPlaying(false);
        return;
      }

      const res = algo === 'selection'
        ? stepSelectionSort(currentArr, currentSorted, currentStats)
        : stepInsertionSort(currentArr, currentSorted, currentStats);

      currentArr = res.arr;
      currentSorted = res.sorted;
      currentStats = res.stats;

      setArray(res.arr);
      setSortedIndex(res.sorted);
      setStats(res.stats);
      setExplanation(res.explanation);
      if (res.comparing) setComparingIndices(res.comparing);

      if (res.stats.isFinished) {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 600);
  };

  return (
    <section id="sorting" className="section-padding" style={{
      background: 'var(--bg-primary)',
      borderBottom: 'var(--border-thick)'
    }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="brutal-badge brutal-badge-red font-mono" style={{ fontSize: '0.8rem' }}>
              UNIT 04 // SORTING PARADIGMS
            </span>
            <span className="brutal-badge brutal-badge-yellow font-mono" style={{ fontSize: '0.8rem' }}>
              SELECTION SORT &amp; INSERTION SORT
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '1rem'
          }}>
            SELECTION SORT VS. INSERTION SORT
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            maxWidth: '850px',
            lineHeight: 1.6
          }}>
            Selection Sort and Insertion Sort are foundational quadratic comparison sorting algorithms. Understand how each strategy structures its sorted subarray and how their best/worst-case performance differs.
          </p>
        </div>

        {/* Algorithm Switcher & Preset Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
          background: 'var(--bg-paper)',
          padding: '1rem',
          border: '2px solid #000',
          boxShadow: '3px 3px 0 #000'
        }}>
          {/* Algo Toggle */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => { SoundEngine.playClick(); setAlgo('selection'); resetArray(); }}
              className="brutal-btn"
              style={{
                background: algo === 'selection' ? 'var(--canary-yellow)' : '#FFF',
                fontWeight: algo === 'selection' ? 900 : 700,
                border: '2px solid #000',
                padding: '0.5rem 1rem'
              }}
            >
              SELECTION SORT (FIND MIN)
            </button>
            <button
              onClick={() => { SoundEngine.playClick(); setAlgo('insertion'); resetArray(); }}
              className="brutal-btn"
              style={{
                background: algo === 'insertion' ? 'var(--canary-yellow)' : '#FFF',
                fontWeight: algo === 'insertion' ? 900 : 700,
                border: '2px solid #000',
                padding: '0.5rem 1rem'
              }}
            >
              INSERTION SORT (SHIFT &amp; INSERT)
            </button>
          </div>

          {/* Preset Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800 }}>DATASET:</span>
            <button onClick={() => resetArray('random')} className="brutal-btn brutal-btn-sm" style={{ background: '#FFF' }}>
              <Shuffle size={14} /> Random
            </button>
            <button onClick={() => resetArray('reversed')} className="brutal-btn brutal-btn-sm" style={{ background: '#FFF' }}>
              Reversed (Worst Case)
            </button>
            <button onClick={() => resetArray('nearly')} className="brutal-btn brutal-btn-sm" style={{ background: '#FFF' }}>
              Nearly Sorted (Best Case)
            </button>
          </div>
        </div>

        {/* 2-Column Main Workspace */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>

          {/* Left Column: Visual Bar Arena & Stepper */}
          <div className="brutal-card" style={{ background: '#FFF' }}>
            
            {/* Stepper Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              borderBottom: '2px solid #000',
              paddingBottom: '0.75rem'
            }}>
              <div>
                <span className="brutal-badge brutal-badge-mint font-mono" style={{ fontSize: '0.75rem' }}>
                  STEP-BY-STEP SIMULATOR
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.25rem', marginTop: '0.25rem' }}>
                  {algo === 'selection' ? 'SELECTION SORT ARENA' : 'INSERTION SORT ARENA'}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={handleStep}
                  disabled={isPlaying || stats.isFinished}
                  className="brutal-btn brutal-btn-red"
                  style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
                >
                  <ChevronRight size={16} /> STEP
                </button>
                <button
                  onClick={handleAutoPlay}
                  disabled={isPlaying || stats.isFinished}
                  className="brutal-btn brutal-btn-blue"
                  style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
                >
                  <Play size={16} /> AUTO PLAY
                </button>
                <button
                  onClick={() => resetArray()}
                  className="brutal-btn brutal-btn-sm"
                  style={{ background: '#E5E5E5', border: '1.5px solid #000' }}
                  title="Reset"
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>

            {/* Visual Bar Columns */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '0.5rem',
              height: '200px',
              alignItems: 'end',
              background: 'var(--bg-paper)',
              padding: '1rem',
              border: '2px solid #000',
              marginBottom: '1.5rem'
            }}>
              {array.map((val, idx) => {
                const isSorted = idx < sortedIndex || stats.isFinished;
                const isComparing = comparingIndices.includes(idx);
                const isMinCandidate = idx === minCandidateIndex;

                let barColor = 'var(--cobalt-blue)';
                if (isSorted) barColor = 'var(--emerald-mint)';
                else if (isMinCandidate) barColor = 'var(--canary-yellow)';
                else if (isComparing) barColor = 'var(--vermilion-red)';

                return (
                  <div
                    key={idx}
                    style={{
                      height: `${(val / 100) * 100}%`,
                      background: barColor,
                      border: '2px solid #000',
                      boxShadow: '2px 2px 0 #000',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.25rem 0',
                      color: isSorted || isMinCandidate ? '#000' : '#FFF',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 900,
                      fontSize: '0.8rem',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <span>{val}</span>
                    <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>[{idx}]</span>
                  </div>
                );
              })}
            </div>

            {/* Live Metrics Strip */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.75rem',
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem'
            }}>
              <div style={{ background: 'var(--bg-paper)', padding: '0.5rem', border: '1.5px solid #000' }}>
                <div>COMPARISONS:</div>
                <strong style={{ fontSize: '1.2rem', color: 'var(--cobalt-blue)' }}>{stats.comparisons}</strong>
              </div>
              <div style={{ background: 'var(--bg-paper)', padding: '0.5rem', border: '1.5px solid #000' }}>
                <div>SWAPS / SHIFTS:</div>
                <strong style={{ fontSize: '1.2rem', color: 'var(--vermilion-red)' }}>{stats.swaps}</strong>
              </div>
              <div style={{ background: 'var(--bg-paper)', padding: '0.5rem', border: '1.5px solid #000' }}>
                <div>SORTED PREFIX:</div>
                <strong style={{ fontSize: '1.2rem', color: 'var(--emerald-mint)' }}>{sortedIndex} / {array.length}</strong>
              </div>
            </div>

            {/* Explanation Banner */}
            <div style={{
              background: stats.isFinished ? '#D1FAE5' : 'var(--bg-paper)',
              border: '2px solid #000',
              padding: '0.85rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              lineHeight: 1.5
            }}>
              <strong style={{ color: 'var(--cobalt-blue)', display: 'block', marginBottom: '0.2rem' }}>
                STEP EXPLANATION:
              </strong>
              {explanation}
            </div>

          </div>

          {/* Right Column: Sorting Theory & Comparison Table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Selection Sort Theory */}
            <div className="brutal-card brutal-card-yellow">
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                1. HOW SELECTION SORT WORKS: Θ(N²)
              </h4>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#111', marginBottom: '0.5rem' }}>
                Selection sort divides the array into sorted (left) and unsorted (right) subarrays. It searches the entire unsorted subarray to find the <strong>smallest element</strong>, and swaps it to the end of the sorted portion.
              </p>
              <div style={{ background: '#FFF', padding: '0.5rem', border: '1.5px solid #000', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                Total Comparisons = (n-1) + (n-2) + ... + 1 = <strong>n(n-1)/2 = Θ(n²)</strong> in all cases!
              </div>
            </div>

            {/* Insertion Sort Theory */}
            <div className="brutal-card brutal-card-blue">
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                2. HOW INSERTION SORT WORKS: O(N²) / BEST O(N)
              </h4>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#FFF', marginBottom: '0.5rem' }}>
                Insertion sort builds a sorted array one item at a time. It takes the current item and slides all larger items in the sorted subarray to the right until it finds the correct insertion slot.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.5rem', border: '1.5px solid rgba(255,255,255,0.3)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                Best Case (Already Sorted): <strong>Θ(n) linear</strong> (1 check per item).<br />
                Worst Case (Reversed): <strong>Θ(n²) quadratic</strong> comparisons and shifts.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default SpatialSortingArena;
