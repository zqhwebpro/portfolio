import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ConceptSlideDeck } from './components/ConceptSlideDeck';
import { KnowledgeMatrix } from './components/KnowledgeMatrix';
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
        {/* Core Presentation: Interactive 8-Concept Slide Deck */}
        <ConceptSlideDeck currentSlideIndex={activeSlideIndex} onSelectSlide={handleSelectSlide} />
        
        <div className="hazard-divider" />

        {/* 8 Core CS Terms Canonical Comparison Matrix & Deep Dive */}
        <KnowledgeMatrix onSelectSlide={handleSelectSlide} />
      </main>

      <Footer onSelectSlide={handleSelectSlide} />
    </div>
  );
}

export default App;

