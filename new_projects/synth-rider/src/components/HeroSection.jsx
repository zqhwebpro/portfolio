import React, { useState, useEffect } from 'react';
import { CONCEPTS } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';
import { Keyboard, Box, Monitor, GitFork, RotateCw, Sparkles, ArrowDown } from 'lucide-react';

const ICON_MAP = {
  Keyboard,
  Box,
  Monitor,
  GitFork,
  RotateCw,
};

export function HeroSection({ onSelect }) {
  const [count, setCount] = useState(1);
  const [typedHeadline, setTypedHeadline] = useState('');
  const fullHeadline = "5 Concepts. Every Language. Every Programmer.";
  const subtext = "Master these once — and you can code in any language.";
  const [typedSubtext, setTypedSubtext] = useState('');

  // Pulsing counter 1 -> 5
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < 5) {
          SoundEngine.playClick();
          return prev + 1;
        }
        return 5;
      });
    }, 450);
    return () => clearInterval(timer);
  }, []);

  // Typewriter effect for headline
  useEffect(() => {
    let index = 0;
    const headlineTimer = setInterval(() => {
      if (index <= fullHeadline.length) {
        setTypedHeadline(fullHeadline.slice(0, index));
        index++;
      } else {
        clearInterval(headlineTimer);
      }
    }, 35);
    return () => clearInterval(headlineTimer);
  }, []);

  // Typewriter effect for subtext after headline completes
  useEffect(() => {
    let index = 0;
    const delay = setTimeout(() => {
      const subtextTimer = setInterval(() => {
        if (index <= subtext.length) {
          setTypedSubtext(subtext.slice(0, index));
          index++;
        } else {
          clearInterval(subtextTimer);
        }
      }, 25);
    }, 1200);
    return () => clearTimeout(delay);
  }, []);

  return (
    <section style={{
      background: '#FFFFFF',
      borderBottom: '4px solid #0A0A0A',
      padding: 'clamp(3.5rem, 7vw, 6rem) clamp(1.25rem, 4vw, 3rem)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.12,
        backgroundImage: 'linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />

      {/* Bauhaus Color Accent bar */}
      <div style={{ position: 'absolute', top: '0', left: 0, right: 0, height: '8px', display: 'flex' }}>
        <div style={{ flex: 1, background: '#00F0FF' }} />
        <div style={{ flex: 1, background: '#00E599' }} />
        <div style={{ flex: 1, background: '#0038FF' }} />
        <div style={{ flex: 1, background: '#FF2A00' }} />
        <div style={{ flex: 1, background: '#FFE600' }} />
      </div>

      <div className="container" style={{ position: 'relative' }}>
        
        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          <span style={{
            background: '#FFE600', color: '#0A0A0A', fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem', fontWeight: 900, padding: '0.4rem 0.85rem',
            border: '3px solid #0A0A0A', boxShadow: '4px 4px 0px #0A0A0A',
            letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.4rem'
          }}>
            <Sparkles size={14} /> NEO-BRUTALIST CS INFOGRAPHIC
          </span>
          
          <span style={{
            background: '#0A0A0A', color: '#00F0FF', fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem', fontWeight: 800, padding: '0.4rem 0.85rem',
            border: '3px solid #0A0A0A', boxShadow: '4px 4px 0px #0038FF',
            letterSpacing: '0.06em',
          }}>
            CANONICAL CORE // EVERY PROGRAMMER
          </span>
        </div>

        {/* Counter Badge & Animated Headline */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          
          {/* Pulsing Count 1->5 Badge */}
          <div style={{
            background: count === 5 ? '#FFE600' : '#0038FF',
            color: count === 5 ? '#0A0A0A' : '#FFFFFF',
            border: '3.5px solid #0A0A0A',
            padding: '1rem 1.4rem',
            boxShadow: '6px 6px 0 #0A0A0A',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '110px',
            transform: 'rotate(-2deg)',
            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          className="animate-count-pulse"
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.1em' }}>
              CONCEPTS
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.2rem', fontWeight: 900, lineHeight: 1 }}>
              {count}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 800 }}>
              OUT OF 5
            </span>
          </div>

          {/* Typewriter Headline */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              color: '#0A0A0A',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              minHeight: '2.4em',
            }}>
              {typedHeadline}
              <span className="cursor-blink" style={{ display: 'inline-block', width: '12px', height: '1em', background: '#FF2A00', marginLeft: '4px', verticalAlign: 'middle' }} />
            </h1>
          </div>
        </div>

        {/* Subtext */}
        <p style={{
          fontFamily: 'var(--font-body)',
          color: '#1A1A1A',
          fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
          maxWidth: '740px',
          lineHeight: 1.6,
          marginBottom: '2.5rem',
          fontWeight: 700,
          background: '#F8F7F2',
          border: '2.5px solid #0A0A0A',
          padding: '1rem 1.4rem',
          boxShadow: '4px 4px 0 #0A0A0A',
        }}>
          "{typedSubtext}"
          <span className="cursor-blink" style={{ opacity: typedSubtext.length < subtext.length ? 1 : 0 }}>|</span>
        </p>

        {/* 5 Concept Jump Cards / Pills */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 900, color: '#666', letterSpacing: '0.08em', marginBottom: '1rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ArrowDown size={14} /> EXPLORE THE 5 CORE CONCEPTS (CLICK TO JUMP)
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '1.25rem',
          }}>
            {CONCEPTS.map((c, i) => {
              const IconComp = ICON_MAP[c.iconName] || Box;
              return (
                <button
                  key={c.id}
                  onClick={() => { SoundEngine.playClick(); if (onSelect) onSelect(i); }}
                  style={{
                    background: '#FFFFFF',
                    border: '3px solid #0A0A0A',
                    padding: '1.25rem 1.25rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '130px',
                    boxShadow: '5px 5px 0 #0A0A0A',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = c.color === '#FFE600' ? '#FFFBE6' : '#F4F7FF';
                    e.currentTarget.style.transform = 'translate(-3px, -3px)';
                    e.currentTarget.style.boxShadow = `8px 8px 0 ${c.color}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '5px 5px 0 #0A0A0A';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '0.75rem' }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1rem',
                      fontWeight: 900,
                      background: c.color,
                      color: c.textColor,
                      border: '2px solid #0A0A0A',
                      padding: '0.2rem 0.6rem',
                      boxShadow: '2px 2px 0 #0A0A0A',
                    }}>
                      {c.num}
                    </div>
                    <div style={{
                      background: '#0A0A0A',
                      color: c.color,
                      padding: '0.4rem',
                      borderRadius: '0px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1.5px solid #0A0A0A'
                    }}>
                      <IconComp size={18} />
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '1.15rem',
                      color: '#0A0A0A',
                      lineHeight: 1.15,
                      marginBottom: '0.35rem',
                      textTransform: 'uppercase',
                    }}>
                      {c.term}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: '#444',
                      fontWeight: 700,
                      lineHeight: 1.3,
                    }}>
                      {c.definition}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
