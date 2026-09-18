import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ConceptSlides } from './components/ConceptSlides';
import { ReferenceTable } from './components/ReferenceTable';
import { Footer } from './components/Footer';
import { CONCEPTS } from './utils/csData';

export function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll to the stacked concept block and update the active nav highlight
  const handleSelect = (i) => {
    setActiveIndex(i);
    const id = CONCEPTS[i]?.id;
    if (id) {
      const el = document.getElementById(`concept-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <Navbar activeIndex={activeIndex} onSelect={handleSelect} />
      <main style={{ flex: 1 }}>
        <HeroSection onSelect={handleSelect} />
        <div className="hazard-divider" />
        <ConceptSlides />
        <div className="bauhaus-divider"><div /><div /><div /><div /></div>
        <ReferenceTable onSelect={handleSelect} />
      </main>
      <Footer onSelect={handleSelect} />
    </div>
  );
}

export default App;

