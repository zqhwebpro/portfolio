import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ConceptSlides } from './components/ConceptSlides';
import { ReferenceTable } from './components/ReferenceTable';
import { Footer } from './components/Footer';
import { CONCEPTS } from './utils/csData';

export function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <ConceptSlides />
        <ReferenceTable />
      </main>
      <Footer />
    </div>
  );
}

export default App;

