import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroPlayground } from './components/HeroPlayground';
import { ConceptSlideDeck } from './components/ConceptSlideDeck';
import { KnowledgeMatrix } from './components/KnowledgeMatrix';
import { BigOGraph } from './components/BigOGraph';
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
        {/* Unit 00: Introduction to Computational Thinking & The 8 Pillars Launchpad */}
        <HeroPlayground onSelectSlide={handleSelectSlide} />

        <div className="hazard-divider" />

        {/* Core Presentation: The 8 Fundamental Concepts of Algorithms Interactive Slide Deck */}
        <ConceptSlideDeck currentSlideIndex={activeSlideIndex} onSelectSlide={handleSelectSlide} />
        
        <div className="hazard-divider" />

        {/* Comprehensive Taxonomy Matrix: 8 Concepts Side-by-Side Deep Dive */}
        <KnowledgeMatrix onSelectSlide={handleSelectSlide} />

        <div className="hazard-divider" />

        {/* Asymptotic Growth Calculus & Complexity Curves */}
        <BigOGraph />

        <div className="hazard-divider" />

        {/* Algorithmic Mastery Quiz: The 8 Fundamental Concepts Challenge */}
        <QuizChallenge />
      </main>

      <Footer onSelectSlide={handleSelectSlide} />
    </div>
  );
}

export default App;
