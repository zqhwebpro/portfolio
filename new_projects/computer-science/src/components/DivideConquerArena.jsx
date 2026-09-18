import React, { useState } from 'react';
import { Play, RotateCcw, Shuffle, ChevronRight, GitMerge, Split, CheckCircle, Zap } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

const INITIAL_DC_ARRAY = [14, 7, 3, 12, 9, 11, 6, 2];

export function DivideConquerArena() {
  const [algo, setAlgo] = useState('mergesort'); // 'mergesort' | 'quicksort'
  const [array, setArray] = useState(INITIAL_DC_ARRAY);
  const [activeStep, setActiveStep] = useState(0);
  const [explanation, setExplanation] = useState('Divide-and-Conquer breaks a problem into smaller subproblems, solves them recursively, and combines the results.');

  const resetData = () => {
    SoundEngine.playClick();
    const shuffled = Array.from({ length: 8 }, () => Math.floor(Math.random() * 80) + 10);
    setArray(shuffled);
    setActiveStep(0);
    setExplanation(`New dataset generated for ${algo === 'mergesort' ? 'Merge Sort' : 'Quick Sort'}.`);
  };

  return (
    <section id="divide-conquer" className="section-padding" style={{
      background: 'var(--bg-primary)',
      borderBottom: 'var(--border-thick)'
    }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="brutal-badge brutal-badge-mint font-mono" style={{ fontSize: '0.8rem' }}>
              UNIT 06 // DIVIDE &amp; CONQUER
            </span>
            <span className="brutal-badge brutal-badge-blue font-mono" style={{ fontSize: '0.8rem' }}>
              DIVIDE &amp; CONQUER PARADIGM
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
            DIVIDE &amp; CONQUER: MERGE SORT &amp; QUICK SORT
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            maxWidth: '850px',
            lineHeight: 1.6
          }}>
            Divide-and-conquer algorithms attack a problem by: (1) <strong>Dividing</strong> it into subproblems, (2) <strong>Conquering</strong> the subproblems recursively, and (3) <strong>Combining</strong> their solutions.
          </p>
        </div>

        {/* 3 Pillars of Divide & Conquer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem'
        }}>
          <div className="brutal-card brutal-card-yellow">
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.8rem', color: '#000', marginBottom: '0.25rem' }}>
              STEP 01
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              DIVIDE
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#222', lineHeight: 1.4 }}>
              Divide the original problem into a number of subproblems that are smaller instances of the same problem.
            </p>
          </div>

          <div className="brutal-card brutal-card-blue">
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.8rem', color: 'var(--canary-yellow)', marginBottom: '0.25rem' }}>
              STEP 02
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              CONQUER
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#FFF', lineHeight: 1.4 }}>
              Conquer the subproblems by solving them recursively. If the subproblem sizes are small enough (base case), solve them directly.
            </p>
          </div>

          <div className="brutal-card brutal-card-red">
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 900, fontSize: '0.8rem', color: '#FFF', marginBottom: '0.25rem' }}>
              STEP 03
            </div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              COMBINE
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#FFF', lineHeight: 1.4 }}>
              Combine the subproblem solutions into the solution for the original problem (e.g. the linear merge step in Merge Sort).
            </p>
          </div>
        </div>

        {/* Comparison: Merge Sort vs Quick Sort */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>

          {/* Merge Sort Deep Dive */}
          <div className="brutal-card" style={{ background: '#FFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <GitMerge size={20} color="var(--cobalt-blue)" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.3rem' }}>
                MERGE SORT: Θ(N LOG N) GUARANTEED
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', lineHeight: 1.5 }}>
              <div style={{ background: 'var(--bg-paper)', padding: '0.75rem', border: '1.5px solid #000' }}>
                <strong style={{ display: 'block', color: 'var(--cobalt-blue)', marginBottom: '0.2rem' }}>
                  1. Recursive Tree Halving:
                </strong>
                Merge sort cuts array in half recursively until subarrays have length 1 (which is already sorted).
              </div>

              <div style={{ background: 'var(--bg-paper)', padding: '0.75rem', border: '1.5px solid #000' }}>
                <strong style={{ display: 'block', color: 'var(--emerald-mint)', marginBottom: '0.2rem' }}>
                  2. Linear Merge Step:
                </strong>
                Two sorted subarrays of total size $n$ are merged into one sorted array in <strong>linear $\Theta(n)$ time</strong> by comparing the front elements.
              </div>

              <div style={{ background: 'var(--bg-paper)', padding: '0.75rem', border: '1.5px solid #000' }}>
                <strong style={{ display: 'block', color: 'var(--vermilion-red)', marginBottom: '0.2rem' }}>
                  3. Total Recurrence Analysis:
                </strong>
                Tree height is $\log_2 n$ levels. Each level does $\Theta(n)$ merging work. Total runtime = <strong>$\Theta(n \log n)$</strong> in best, worst, and average cases!
              </div>
            </div>
          </div>

          {/* Quick Sort Deep Dive */}
          <div className="brutal-card" style={{ background: '#FFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Split size={20} color="var(--vermilion-red)" />
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.3rem' }}>
                QUICK SORT: O(N LOG N) AVG / O(N²) WORST
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', lineHeight: 1.5 }}>
              <div style={{ background: 'var(--bg-paper)', padding: '0.75rem', border: '1.5px solid #000' }}>
                <strong style={{ display: 'block', color: 'var(--vermilion-red)', marginBottom: '0.2rem' }}>
                  1. Partitioning Around a Pivot:
                </strong>
                Select a pivot element q. Rearrange array so all items ≤ q are on left, and items &gt; q are on right (Lomuto Partition).
              </div>

              <div style={{ background: 'var(--bg-paper)', padding: '0.75rem', border: '1.5px solid #000' }}>
                <strong style={{ display: 'block', color: 'var(--cobalt-blue)', marginBottom: '0.2rem' }}>
                  2. In-Place Conquering:
                </strong>
                Unlike Merge Sort, Quick Sort sorts in place with <strong>zero extra merge array allocation</strong> ($O(1)$ auxiliary space).
              </div>

              <div style={{ background: 'var(--bg-paper)', padding: '0.75rem', border: '1.5px solid #000' }}>
                <strong style={{ display: 'block', color: '#7928CA', marginBottom: '0.2rem' }}>
                  3. Pivot Selection &amp; Worst Case:
                </strong>
                If pivot creates balanced splits: $O(n \log n)$. If array is already sorted and lowest/highest pivot is picked: worst case degrades to $O(n^2)$.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default DivideConquerArena;
