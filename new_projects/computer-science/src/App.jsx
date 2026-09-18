import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroPlayground } from './components/HeroPlayground';
import { ConceptSlideDeck } from './components/ConceptSlideDeck';
import { KnowledgeMatrix } from './components/KnowledgeMatrix';
import { BinarySearchUnit } from './components/BinarySearchUnit';
import { BigOGraph } from './components/BigOGraph';
import { SpatialSortingArena } from './components/SpatialSortingArena';
import { RecursionStackTower } from './components/RecursionStackTower';
import { DivideConquerArena } from './components/DivideConquerArena';
import { TreeGraphTraversal } from './components/TreeGraphTraversal';
import { QuizChallenge } from './components/QuizChallenge';
import { Footer } from './components/Footer';

export function App() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const handleSelectSlide = (index) => {
    setActiveSlideIndex(index);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <Navbar activeSlideIndex={activeSlideIndex} onSelectSlide={handleSelectSlide} />
      
      <main style={{ flex: 1 }}>
        {/* Unit 00: Foundational Introduction & Search Intuition */}
        <HeroPlayground />

        <div className="hazard-divider" />

        {/* Core Curriculum: The 8 Fundamental Concepts of Algorithms Slide Deck */}
        <ConceptSlideDeck currentSlideIndex={activeSlideIndex} onSelectSlide={handleSelectSlide} />
        
        <div className="hazard-divider" />

        {/* Canonical 8 Concepts Taxonomy Matrix & Deep Dive */}
        <KnowledgeMatrix onSelectSlide={handleSelectSlide} />

        <div className="hazard-divider" />

        {/* Interactive Laboratories Header */}
        <section id="interactive-labs-section" style={{
          background: '#0A0A0A',
          color: '#FFFFFF',
          padding: '2.5rem 0',
          borderBottom: 'var(--border-thick)',
          textAlign: 'center'
        }}>
          <div className="container">
            <span className="brutal-badge brutal-badge-yellow font-mono" style={{ fontSize: '0.8rem', marginBottom: '0.5rem', display: 'inline-block' }}>
              ADVANCED ALGORITHMIC WORKSHOP
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              fontWeight: 900,
              letterSpacing: '-0.02em',
              margin: '0.25rem 0',
              color: '#FFFFFF'
            }}>
              DEEP DIVE <span style={{ color: 'var(--canary-yellow)' }}>INTERACTIVE LABORATORIES</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: '#AAA', maxWidth: '750px', margin: '0.5rem auto 0', lineHeight: 1.5 }}>
              Explore live simulators for logarithmic binary search, asymptotic runtime calculus, comparison sorting algorithms, recursive call stacks, and graph traversals.
            </p>
          </div>
        </section>

        {/* Unit 02: Binary Search Lab */}
        <BinarySearchUnit />

        {/* Unit 03: Asymptotic Growth Graph */}
        <BigOGraph />

        {/* Unit 04: Sorting Arena */}
        <SpatialSortingArena />

        {/* Unit 05: Recursion & Call Stack Tower */}
        <RecursionStackTower />

        {/* Unit 06: Divide & Conquer Arena */}
        <DivideConquerArena />

        {/* Unit 07: Graph & Binary Tree Traversals */}
        <TreeGraphTraversal />

        {/* Unit 08: Algorithmic Mastery Quiz */}
        <QuizChallenge />
      </main>

      <Footer onSelectSlide={handleSelectSlide} />
    </div>
  );
}

export default App;
