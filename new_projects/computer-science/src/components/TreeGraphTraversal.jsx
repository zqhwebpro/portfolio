import React, { useState, useEffect, useRef } from 'react';
import { GitBranch, Play, Pause, SkipForward, RotateCcw, ArrowRight, CornerDownRight, ShieldCheck, Zap } from 'lucide-react';
import { TREE_DATA } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

export function TreeGraphTraversal() {
  const [traversalType, setTraversalType] = useState('bfs'); // 'bfs' | 'dfs_pre' | 'dfs_post'
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeEdgeId, setActiveEdgeId] = useState(null);

  // Generate Traversal Step Sequence
  const generateSequence = (type) => {
    const steps = [];
    const adj = TREE_DATA.adjList;

    if (type === 'bfs') {
      // BFS with FIFO Queue
      const queue = ['1'];
      const visited = [];
      const edgeHistory = [];

      steps.push({
        action: 'Enqueue root node [1]',
        queue: [...queue],
        stack: null,
        visited: [...visited],
        currentNode: null,
        activeEdge: null
      });

      while (queue.length > 0) {
        const curr = queue.shift();
        visited.push(curr);

        steps.push({
          action: `Dequeue node [${curr}] -> Mark as VISITED`,
          queue: [...queue],
          stack: null,
          visited: [...visited],
          currentNode: curr,
          activeEdge: null
        });

        const neighbors = adj[curr] || [];
        for (const neighbor of neighbors) {
          queue.push(neighbor);
          const edge = `e${curr}-${neighbor}`;
          steps.push({
            action: `Discover edge (${curr} → ${neighbor}) -> Enqueue [${neighbor}]`,
            queue: [...queue],
            stack: null,
            visited: [...visited],
            currentNode: curr,
            activeEdge: edge
          });
        }
      }
    } else if (type === 'dfs_pre') {
      // DFS Pre-Order (LIFO Stack)
      const stack = ['1'];
      const visited = [];

      steps.push({
        action: 'Push root node [1] to Stack',
        queue: null,
        stack: [...stack],
        visited: [...visited],
        currentNode: null,
        activeEdge: null
      });

      while (stack.length > 0) {
        const curr = stack.pop();
        visited.push(curr);

        steps.push({
          action: `Pop node [${curr}] from Stack -> Process`,
          queue: null,
          stack: [...stack],
          visited: [...visited],
          currentNode: curr,
          activeEdge: null
        });

        const neighbors = [...(adj[curr] || [])].reverse(); // reverse for left-first in stack
        for (const neighbor of neighbors) {
          stack.push(neighbor);
          const edge = `e${curr}-${neighbor}`;
          steps.push({
            action: `Traverse edge (${curr} → ${neighbor}) -> Push [${neighbor}] to Stack`,
            queue: null,
            stack: [...stack],
            visited: [...visited],
            currentNode: curr,
            activeEdge: edge
          });
        }
      }
    } else {
      // DFS Post-Order (Recursive Left -> Right -> Root)
      const visited = [];
      const stack = [];

      function dfsPost(node) {
        stack.push(node);
        steps.push({
          action: `Enter node [${node}] (Explore subtrees first)`,
          queue: null,
          stack: [...stack],
          visited: [...visited],
          currentNode: node,
          activeEdge: null
        });

        const children = adj[node] || [];
        for (const child of children) {
          steps.push({
            action: `Traverse down (${node} → ${child})`,
            queue: null,
            stack: [...stack],
            visited: [...visited],
            currentNode: node,
            activeEdge: `e${node}-${child}`
          });
          dfsPost(child);
        }

        visited.push(node);
        stack.pop();
        steps.push({
          action: `All subtrees resolved. Visit node [${node}] (Post-Order)`,
          queue: null,
          stack: [...stack],
          visited: [...visited],
          currentNode: node,
          activeEdge: null
        });
      }

      dfsPost('1');
    }

    return steps;
  };

  const steps = React.useMemo(() => generateSequence(traversalType), [traversalType]);

  const currentStep = steps[stepIndex] || steps[0] || {
    action: 'Ready',
    queue: [],
    stack: [],
    visited: [],
    currentNode: null,
    activeEdge: null
  };

  // Timer loop
  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            SoundEngine.playSuccess();
            return prev;
          }
          const next = prev + 1;
          const s = steps[next];
          if (s && s.currentNode) {
            SoundEngine.playNodeVisit(parseInt(s.currentNode, 10));
          }
          return next;
        });
      }, 700);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, steps]);

  const handleTypeChange = (type) => {
    SoundEngine.playClick();
    setIsPlaying(false);
    setTraversalType(type);
    setStepIndex(0);
  };

  const handleStepForward = () => {
    if (stepIndex < steps.length - 1) {
      const next = stepIndex + 1;
      const s = steps[next];
      if (s && s.currentNode) {
        SoundEngine.playNodeVisit(parseInt(s.currentNode, 10));
      }
      setStepIndex(next);
    } else {
      SoundEngine.playSuccess();
    }
  };

  const handleStepBack = () => {
    if (stepIndex > 0) {
      SoundEngine.playClick();
      setStepIndex(stepIndex - 1);
    }
  };

  const handleReset = () => {
    SoundEngine.playClick();
    setIsPlaying(false);
    setStepIndex(0);
  };

  const togglePlay = () => {
    SoundEngine.playClick();
    if (stepIndex >= steps.length - 1) {
      setStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  // Node position helper
  const getNode = (id) => TREE_DATA.nodes.find(n => n.id === id);

  return (
    <section id="trees" className="section-wrapper" style={{ background: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <GitBranch size={14} /> CONCEPT 03 // GRAPH & TREE TOPOLOGY
          </div>
          <h2 className="section-title">
            GRAPH & BINARY TREE <span style={{ color: 'var(--cobalt-blue)' }}>TRAVERSALS</span>
          </h2>
          <p className="section-subtitle">
            Traversals define how computation navigates non-linear discrete topology. Compare level-by-level queue expansion (BFS) against depth-first stack descent (DFS).
          </p>
        </div>

        {/* Algorithm Type Selector Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {[
            { id: 'bfs', label: 'BREADTH-FIRST SEARCH [BFS (QUEUE)]', color: 'var(--cobalt-blue)' },
            { id: 'dfs_pre', label: 'DEPTH-FIRST SEARCH [DFS (PRE-ORDER)]', color: 'var(--vermilion-red)' },
            { id: 'dfs_post', label: 'DEPTH-FIRST SEARCH [DFS (POST-ORDER)]', color: 'var(--canary-yellow)' },
          ].map((tab) => {
            const isSelected = traversalType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTypeChange(tab.id)}
                className="brutal-btn"
                style={{
                  background: isSelected ? tab.color : 'var(--bg-card)',
                  color: isSelected && tab.id !== 'dfs_post' ? '#FFFFFF' : '#0A0A0A',
                  borderColor: '#0A0A0A',
                  boxShadow: isSelected ? 'var(--shadow-hover-md)' : 'var(--shadow-md)',
                  fontWeight: 800
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main Grid: SVG Tree Canvas & Data Structure Monitor */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
          gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          alignItems: 'start'
        }}>
          {/* Left Column: Interactive Vector Tree Canvas */}
          <div className="brutal-card" style={{
            background: 'var(--bg-card)',
            border: 'var(--border-thick)',
            boxShadow: 'var(--shadow-lg)',
            padding: '1.25rem'
          }}>
            {/* Control Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: 'var(--border-solid)',
              paddingBottom: '0.75rem',
              marginBottom: '1rem',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              <span className="font-mono" style={{ fontWeight: 800, fontSize: '0.85rem' }}>
                // TOPOLOGICAL VECTOR CANVAS
              </span>

              {/* Step Controls */}
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  onClick={togglePlay}
                  className={`brutal-btn brutal-btn-sm ${isPlaying ? 'brutal-btn-danger' : 'brutal-btn-primary'}`}
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                  <span>{isPlaying ? 'PAUSE' : 'RUN'}</span>
                </button>
                <button
                  onClick={handleStepBack}
                  disabled={stepIndex === 0 || isPlaying}
                  className="brutal-btn brutal-btn-sm"
                >
                  ◀
                </button>
                <button
                  onClick={handleStepForward}
                  disabled={stepIndex >= steps.length - 1 || isPlaying}
                  className="brutal-btn brutal-btn-accent brutal-btn-sm"
                >
                  ▶ STEP
                </button>
                <button
                  onClick={handleReset}
                  className="brutal-btn brutal-btn-sm"
                >
                  <RotateCcw size={13} />
                </button>
              </div>
            </div>

            {/* SVG Tree Vector Graph */}
            <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
              <svg
                viewBox="0 0 600 390"
                style={{ width: '100%', height: 'auto', display: 'block', background: 'var(--bg-paper)', border: 'var(--border-solid)' }}
              >
                {/* Edges */}
                {TREE_DATA.edges.map((edge) => {
                  const fromNode = getNode(edge.from);
                  const toNode = getNode(edge.to);
                  const isActiveEdge = currentStep.activeEdge === edge.id;
                  const isTraversed = currentStep.visited.includes(edge.from) && currentStep.visited.includes(edge.to);

                  return (
                    <g key={edge.id}>
                      {/* Base Edge Line */}
                      <line
                        x1={fromNode.x}
                        y1={fromNode.y}
                        x2={toNode.x}
                        y2={toNode.y}
                        stroke={isActiveEdge ? 'var(--vermilion-red)' : isTraversed ? 'var(--cobalt-blue)' : '#0A0A0A'}
                        strokeWidth={isActiveEdge ? '5' : isTraversed ? '3.5' : '2'}
                        strokeDasharray={isActiveEdge ? '6 4' : 'none'}
                        style={{ transition: 'all 0.2s ease' }}
                      />

                      {/* Edge Pulse Wave Particle */}
                      {isActiveEdge && (
                        <circle
                          r="6"
                          fill="var(--canary-yellow)"
                          stroke="#000"
                          strokeWidth="2"
                        >
                          <animate
                            attributeName="cx"
                            from={fromNode.x}
                            to={toNode.x}
                            dur="0.6s"
                            repeatCount="indefinite"
                          />
                          <animate
                            attributeName="cy"
                            from={fromNode.y}
                            to={toNode.y}
                            dur="0.6s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* Nodes */}
                {TREE_DATA.nodes.map((node) => {
                  const isCurrent = currentStep.currentNode === node.id;
                  const isVisited = currentStep.visited.includes(node.id);
                  const isInQueue = currentStep.queue?.includes(node.id) || currentStep.stack?.includes(node.id);

                  let fillColor = '#FFFFFF';
                  if (isCurrent) fillColor = 'var(--canary-yellow)';
                  else if (isVisited) fillColor = 'var(--emerald-mint)';
                  else if (isInQueue) fillColor = 'var(--cobalt-blue)';

                  const textColor = isInQueue && !isVisited && !isCurrent ? '#FFFFFF' : '#0A0A0A';

                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Node Outer Halo on Current */}
                      {isCurrent && (
                        <circle
                          r="26"
                          fill="none"
                          stroke="var(--vermilion-red)"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                          className="animate-spin-slow"
                        />
                      )}

                      {/* Main Node Body (Bauhaus Geometric Primitives) */}
                      <rect
                        x="-18"
                        y="-18"
                        width="36"
                        height="36"
                        rx={node.type === 'circle' ? '18' : '2'}
                        fill={fillColor}
                        stroke="#0A0A0A"
                        strokeWidth="2.5"
                        style={{
                          filter: 'drop-shadow(3px 3px 0px #0A0A0A)',
                          transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}
                      />

                      {/* Node Value Label */}
                      <text
                        x="0"
                        y="5"
                        textAnchor="middle"
                        fill={textColor}
                        fontFamily="var(--font-mono)"
                        fontWeight="900"
                        fontSize="14"
                      >
                        {node.label}
                      </text>

                      {/* Visited Status Badge */}
                      {isVisited && (
                        <g transform="translate(10, -14)">
                          <circle r="6" fill="var(--emerald-mint)" stroke="#000" strokeWidth="1.5" />
                          <text x="0" y="3" textAnchor="middle" fill="#000" fontSize="8" fontWeight="900">✓</text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Current Step Description Narration */}
            <div style={{
              marginTop: '1rem',
              background: '#0A0A0A',
              color: 'var(--canary-yellow)',
              padding: '0.65rem 1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: 'var(--border-solid)'
            }}>
              <Zap size={15} color="var(--canary-yellow)" />
              <span>{currentStep.action}</span>
            </div>
          </div>

          {/* Right Column: Live Data Structure & Visited Sequence */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Live Data Structure (FIFO Queue / LIFO Stack) */}
            <div className="brutal-card" style={{
              background: 'var(--bg-card)',
              border: 'var(--border-thick)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: 'var(--border-solid)',
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
              }}>
                <span className="font-mono" style={{ fontWeight: 800, fontSize: '0.85rem' }}>
                  ACTIVE CONTAINER: {traversalType === 'bfs' ? 'FIFO QUEUE' : 'LIFO STACK'}
                </span>
                <span className="brutal-pill pill-yellow">
                  {traversalType === 'bfs' ? 'FIRST-IN-FIRST-OUT' : 'LAST-IN-FIRST-OUT'}
                </span>
              </div>

              {/* Elements in Queue/Stack */}
              <div style={{
                minHeight: '80px',
                background: 'var(--bg-paper)',
                border: 'var(--border-solid)',
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                overflowX: 'auto'
              }}>
                {(traversalType === 'bfs' ? currentStep.queue : currentStep.stack)?.length === 0 ? (
                  <span className="font-mono" style={{ color: '#888', fontStyle: 'italic', fontSize: '0.85rem' }}>
                    // Container Empty
                  </span>
                ) : (
                  (traversalType === 'bfs' ? currentStep.queue : currentStep.stack)?.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        minWidth: '42px',
                        height: '42px',
                        background: 'var(--cobalt-blue)',
                        color: '#FFFFFF',
                        border: '2px solid #0A0A0A',
                        boxShadow: '2px 2px 0px #0A0A0A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 900,
                        fontSize: '1rem'
                      }}
                    >
                      {item}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Generated Visited Sequence Order */}
            <div className="brutal-card" style={{
              background: 'var(--bg-card)',
              border: 'var(--border-thick)',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: 'var(--border-solid)',
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
              }}>
                <span className="font-mono" style={{ fontWeight: 800, fontSize: '0.85rem' }}>
                  VISITATION OUTPUT ORDER
                </span>
                <span className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--emerald-mint)' }}>
                  {currentStep.visited.length} / {TREE_DATA.nodes.length} PROCESSED
                </span>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                alignItems: 'center',
                minHeight: '60px'
              }}>
                {currentStep.visited.length === 0 ? (
                  <span className="font-mono" style={{ color: '#888', fontStyle: 'italic', fontSize: '0.85rem' }}>
                    // No nodes visited yet. Click RUN to begin.
                  </span>
                ) : (
                  currentStep.visited.map((nodeId, idx) => (
                    <React.Fragment key={nodeId}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        background: 'var(--emerald-mint)',
                        color: '#0A0A0A',
                        border: '2px solid #0A0A0A',
                        boxShadow: '2px 2px 0px #0A0A0A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 900,
                        fontSize: '0.9rem'
                      }}>
                        {nodeId}
                      </div>
                      {idx < currentStep.visited.length - 1 && (
                        <ArrowRight size={14} color="#0A0A0A" />
                      )}
                    </React.Fragment>
                  ))
                )}
              </div>
            </div>

            {/* Educational Invariant Box */}
            <div className="brutal-card-dark" style={{ padding: '1rem', border: 'var(--border-solid)' }}>
              <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--canary-yellow)', fontWeight: 800, marginBottom: '0.35rem' }}>
                // TOPOLOGICAL INVARIANT
              </div>
              <p style={{ fontSize: '0.85rem', color: '#EEE', lineHeight: 1.4 }}>
                {traversalType === 'bfs' 
                  ? 'BFS guarantees finding the shortest path on unweighted graphs because it visits every vertex at depth D before any vertex at depth D+1.'
                  : 'DFS drives deep down branches before backtracking, using memory proportional to tree height O(H) rather than width O(W).'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
