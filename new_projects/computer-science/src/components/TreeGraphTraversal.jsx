import React, { useState } from 'react';
import { Play, RotateCcw, ChevronRight, Share2, Layers, CheckCircle, Database, Network } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

// Graph Definition (7 Vertices)
const GRAPH_NODES = [
  { id: 'A', label: 'A (Source)', x: 80, y: 130 },
  { id: 'B', label: 'B', x: 200, y: 60 },
  { id: 'C', label: 'C', x: 200, y: 200 },
  { id: 'D', label: 'D', x: 340, y: 60 },
  { id: 'E', label: 'E', x: 340, y: 200 },
  { id: 'F', label: 'F', x: 460, y: 130 },
];

const GRAPH_EDGES = [
  ['A', 'B'], ['A', 'C'],
  ['B', 'D'], ['C', 'E'],
  ['D', 'E'], ['D', 'F'],
  ['E', 'F']
];

const ADJ_LIST = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'E'],
  D: ['B', 'E', 'F'],
  E: ['C', 'D', 'F'],
  F: ['D', 'E']
};

export function TreeGraphTraversal() {
  const [visited, setVisited] = useState(['A']);
  const [queue, setQueue] = useState(['A']);
  const [distances, setDistances] = useState({ A: 0, B: null, C: null, D: null, E: null, F: null });
  const [activeNode, setActiveNode] = useState('A');
  const [stepIndex, setStepIndex] = useState(0);
  const [viewFormat, setViewFormat] = useState('list'); // 'list' | 'matrix'
  const [explanation, setExplanation] = useState('BFS starts at source vertex A with distance 0 and enqueues its neighbors.');
  const [isFinished, setIsFinished] = useState(false);

  const resetBfs = () => {
    SoundEngine.playClick();
    setVisited(['A']);
    setQueue(['A']);
    setDistances({ A: 0, B: null, C: null, D: null, E: null, F: null });
    setActiveNode('A');
    setStepIndex(0);
    setIsFinished(false);
    setExplanation('Initialized Breadth-First Search at source vertex A (distance 0).');
  };

  const stepBfs = () => {
    if (isFinished || queue.length === 0) {
      setIsFinished(true);
      SoundEngine.playFanfare();
      setExplanation('BFS Traversal Complete! All reachable vertices discovered with optimal shortest paths.');
      return;
    }

    SoundEngine.playPop();
    const current = queue[0];
    const newQueue = queue.slice(1);
    setActiveNode(current);

    const neighbors = ADJ_LIST[current] || [];
    const newDist = { ...distances };
    const newlyDiscovered = [];

    neighbors.forEach(nbr => {
      if (!visited.includes(nbr)) {
        visited.push(nbr);
        newQueue.push(nbr);
        newDist[nbr] = newDist[current] + 1;
        newlyDiscovered.push(nbr);
      }
    });

    setVisited([...visited]);
    setQueue(newQueue);
    setDistances(newDist);
    setStepIndex(prev => prev + 1);

    if (newlyDiscovered.length > 0) {
      setExplanation(`Visited vertex ${current}. Enqueued unvisited neighbors [${newlyDiscovered.join(', ')}] with distance ${newDist[current] + 1}.`);
    } else {
      setExplanation(`Visited vertex ${current}. All its neighbors were already discovered.`);
    }

    if (newQueue.length === 0) {
      setIsFinished(true);
      SoundEngine.playFanfare();
    }
  };

  return (
    <section id="graphs" className="section-padding" style={{
      background: 'var(--bg-paper)',
      borderBottom: 'var(--border-thick)'
    }}>
      <div className="container">

        {/* Section Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="brutal-badge brutal-badge-blue font-mono" style={{ fontSize: '0.8rem' }}>
              UNIT 07 // GRAPH &amp; TREE TRAVERSAL
            </span>
            <span className="brutal-badge brutal-badge-yellow font-mono" style={{ fontSize: '0.8rem' }}>
              GRAPH REPRESENTATION &amp; BREADTH-FIRST SEARCH
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
            GRAPH ALGORITHMS: BREADTH-FIRST SEARCH (BFS)
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--text-muted)',
            maxWidth: '850px',
            lineHeight: 1.6
          }}>
            Graphs model pairwise relationships between objects (vertices connected by edges). <strong>Breadth-First Search (BFS)</strong> traverses a graph level-by-level using a FIFO Queue to find the <strong>shortest path (minimum number of edges)</strong> from a source vertex.
          </p>
        </div>

        {/* 2-Column Main Workspace */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>

          {/* Left Column: Interactive Graph Canvas */}
          <div className="brutal-card" style={{ background: '#FFF' }}>
            
            {/* Stepper Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span className="brutal-badge brutal-badge-mint font-mono" style={{ fontSize: '0.75rem' }}>
                BFS LEVEL-ORDER QUEUE SIMULATOR
              </span>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={stepBfs}
                  disabled={isFinished}
                  className="brutal-btn brutal-btn-red"
                  style={{ padding: '0.45rem 0.85rem' }}
                >
                  <ChevronRight size={15} /> STEP BFS
                </button>
                <button
                  onClick={() => resetBfs()}
                  className="brutal-btn brutal-btn-sm"
                  style={{ background: '#E5E5E5' }}
                >
                  <RotateCcw size={15} />
                </button>
              </div>
            </div>

            {/* SVG Graph View */}
            <div style={{ background: '#0A0A0A', border: '2px solid #000', borderRadius: '2px', padding: '0.5rem', marginBottom: '1.25rem' }}>
              <svg viewBox="0 0 540 260" style={{ width: '100%', height: 'auto', display: 'block' }}>
                
                {/* Edges */}
                {GRAPH_EDGES.map(([u, v], i) => {
                  const n1 = GRAPH_NODES.find(n => n.id === u);
                  const n2 = GRAPH_NODES.find(n => n.id === v);
                  const isTraversed = visited.includes(u) && visited.includes(v);
                  return (
                    <line
                      key={i}
                      x1={n1.x}
                      y1={n1.y}
                      x2={n2.x}
                      y2={n2.y}
                      stroke={isTraversed ? 'var(--canary-yellow)' : '#444'}
                      strokeWidth={isTraversed ? 3 : 1.5}
                    />
                  );
                })}

                {/* Vertices */}
                {GRAPH_NODES.map((node) => {
                  const isVis = visited.includes(node.id);
                  const isAct = activeNode === node.id;
                  const dist = distances[node.id];

                  let fillColor = '#1A1A1A';
                  if (isAct) fillColor = 'var(--vermilion-red)';
                  else if (isVis) fillColor = 'var(--emerald-mint)';

                  return (
                    <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                      <circle
                        r="20"
                        fill={fillColor}
                        stroke="#FFF"
                        strokeWidth="2"
                      />
                      <text
                        textAnchor="middle"
                        dy="0.35em"
                        fill={isAct || isVis ? '#000' : '#FFF'}
                        fontFamily="monospace"
                        fontWeight="bold"
                        fontSize="13"
                      >
                        {node.id}
                      </text>

                      {/* Distance Badge */}
                      {dist !== null && (
                        <text
                          textAnchor="middle"
                          dy="-1.8em"
                          fill="var(--canary-yellow)"
                          fontFamily="monospace"
                          fontWeight="bold"
                          fontSize="10"
                        >
                          d={dist}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Queue State */}
            <div style={{
              background: 'var(--bg-paper)',
              border: '2px solid #000',
              padding: '0.85rem',
              marginBottom: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span><strong>FIFO QUEUE:</strong> [ {queue.join(' ← ')} ]</span>
              <span><strong>VISITED:</strong> {visited.length} / {GRAPH_NODES.length}</span>
            </div>

            {/* Explanation Banner */}
            <div style={{
              background: isFinished ? '#D1FAE5' : 'var(--bg-paper)',
              border: '2px solid #000',
              padding: '0.85rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              lineHeight: 1.5
            }}>
              {explanation}
            </div>

          </div>

          {/* Right Column: Representation Theory (Matrix vs List) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <div className="brutal-card brutal-card-yellow">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem' }}>
                  GRAPH REPRESENTATIONS
                </h4>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button
                    onClick={() => setViewFormat('list')}
                    className="brutal-btn brutal-btn-sm"
                    style={{ background: viewFormat === 'list' ? '#000' : '#FFF', color: viewFormat === 'list' ? '#FFF' : '#000' }}
                  >
                    ADJ LIST
                  </button>
                  <button
                    onClick={() => setViewFormat('matrix')}
                    className="brutal-btn brutal-btn-sm"
                    style={{ background: viewFormat === 'matrix' ? '#000' : '#FFF', color: viewFormat === 'matrix' ? '#FFF' : '#000' }}
                  >
                    MATRIX
                  </button>
                </div>
              </div>

              {viewFormat === 'list' ? (
                <div>
                  <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#111' }}>
                    <strong>Adjacency List:</strong> Array of lists where `adj[u]` contains all adjacent neighbors. Space efficiency: <strong>Θ(V + E)</strong>.
                  </p>
                  <pre style={{ background: '#FFF', padding: '0.5rem', border: '1.5px solid #000', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', lineHeight: 1.5 }}>
                    {Object.entries(ADJ_LIST).map(([k, v]) => `${k} → [${v.join(', ')}]\n`).join('')}
                  </pre>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: '#111' }}>
                    <strong>Adjacency Matrix:</strong> 2D array of size $V \times V$ with boolean values. Space efficiency: <strong>Θ(V²)</strong>.
                  </p>
                  <div style={{ background: '#FFF', padding: '0.5rem', border: '1.5px solid #000', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                    Fast $O(1)$ edge query, but wastes memory for sparse graphs.
                  </div>
                </div>
              )}
            </div>

            <div className="brutal-card brutal-card-blue">
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                BFS RUNNING TIME: O(V + E)
              </h4>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: '#FFF' }}>
                Every vertex is enqueued at most once ($O(V)$). Every adjacency list is scanned when its vertex is visited, scanning each edge twice in an undirected graph ($O(E)$). Total time = <strong>$O(V + E)$</strong>.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default TreeGraphTraversal;
