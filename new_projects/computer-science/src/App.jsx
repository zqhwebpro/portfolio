import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ConceptSlides } from './components/ConceptSlides';
import { ReferenceTable } from './components/ReferenceTable';
import { Footer } from './components/Footer';

export function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <Navbar activeIndex={activeIndex} onSelect={setActiveIndex} />
      <main style={{ flex: 1 }}>
        <HeroSection onSelect={setActiveIndex} />
        <div className="hazard-divider" />
        <ConceptSlides activeIndex={activeIndex} onSelect={setActiveIndex} />
        <div className="bauhaus-divider"><div /><div /><div /><div /></div>
        <ReferenceTable onSelect={setActiveIndex} />
      </main>
      <Footer onSelect={setActiveIndex} />
    </div>
  );
}

export default App;
