import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AstrologyBoard } from './components/AstrologyBoard';
import { SparkleCanvas } from './components/SparkleCanvas';
import { ScryingMirror } from './components/ScryingMirror';
import { GrimoirePanel } from './components/GrimoirePanel';
import { ZODIAC_SIGNS, ELEMENTS, getRandomFortune } from './data/fortunes';
import { useHandTracking } from './hooks/useHandTracking';
import { mysticAudio } from './utils/mysticAudio';
import './styles/astral.css';

function App() {
  const [activeSign, setActiveSign] = useState(null);
  const [currentElementIndex, setCurrentElementIndex] = useState(0);
  const elementKeys = Object.keys(ELEMENTS);
  const currentElement = ELEMENTS[elementKeys[currentElementIndex]];

  const [fortune, setFortune] = useState(() => getRandomFortune(null, currentElement));
  const [manualAspects, setManualAspects] = useState(false);
  const [isGrimoireOpen, setIsGrimoireOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [spellBurstTrigger, setSpellBurstTrigger] = useState(0);

  const spellCooldownRef = useRef(false);
  const elementCooldownRef = useRef(false);
  const prevSpellRef = useRef(null);

  const {
    isCameraActive,
    isReady,
    rotation,
    setRotation,
    isPinching,
    activeSpell,
    handCoordinates,
    rawLandmarks,
    cameraError,
    startCamera,
    stopCamera,
    videoRef
  } = useHandTracking();

  const showAspects = activeSpell === 'OPEN_PALM' || manualAspects;

  // Cycle Elemental plane
  const cycleElement = useCallback(() => {
    setCurrentElementIndex(prev => (prev + 1) % elementKeys.length);
    mysticAudio.playSpellCast('element');
    setSpellBurstTrigger(t => t + 1);
  }, [elementKeys.length]);

  // Cast Pinch of Fate / Prophecy Divination
  const handleCastProphecy = useCallback(() => {
    if (spellCooldownRef.current) return;
    spellCooldownRef.current = true;

    mysticAudio.playSpellCast('prophecy');
    setSpellBurstTrigger(t => t + 1);

    // Divinate fresh prophecy
    const newFortune = getRandomFortune(activeSign, currentElement);
    setFortune(newFortune);

    setTimeout(() => {
      mysticAudio.playCelestialChime(Math.floor(Math.random() * 6));
      setTimeout(() => {
        spellCooldownRef.current = false;
      }, 1400);
    }, 250);
  }, [activeSign, currentElement]);

  // Handle Hand Gesture Spells
  useEffect(() => {
    // Spell 1: Pinch of Fate
    if (isPinching && !spellCooldownRef.current) {
      handleCastProphecy();
    }

    // Spell 2: Elemental Transmutation (Peace / V-Sign)
    if (activeSpell === 'PEACE' && !elementCooldownRef.current) {
      elementCooldownRef.current = true;
      cycleElement();
      setTimeout(() => {
        elementCooldownRef.current = false;
      }, 2000);
    }

    // Spell 3: Celestial Supernova sound
    if (activeSpell === 'OPEN_PALM' && prevSpellRef.current !== 'OPEN_PALM') {
      mysticAudio.playSpellCast('flare');
    }

    prevSpellRef.current = activeSpell;
  }, [isPinching, activeSpell, handleCastProphecy, cycleElement]);

  // Calculate pointed sign directly from hand coordinates and astrolabe rotation
  let pointedSign = null;
  if (activeSpell === 'POINTING' && handCoordinates) {
    const hx = handCoordinates.x - 0.5;
    const hy = handCoordinates.y - 0.5;
    const handAngle = (Math.atan2(hy, hx) * (180 / Math.PI) - rotation + 360) % 360;
    const radius = Math.sqrt(hx * hx + hy * hy);
    if (radius > 0.18 && radius < 0.55) {
      const adjusted = (handAngle + 90 + 15) % 360;
      const signIndex = Math.floor(adjusted / 30);
      pointedSign = ZODIAC_SIGNS[signIndex] || null;
    }
  }

  const effectiveActiveSign = pointedSign || activeSign;
  const lastPointedRef = useRef(null);

  useEffect(() => {
    if (pointedSign && lastPointedRef.current?.id !== pointedSign.id) {
      mysticAudio.playNodeIgnite();
    }
    lastPointedRef.current = pointedSign;
  }, [pointedSign]);

  // Toggle Camera
  const handleToggleCamera = () => {
    if (isCameraActive) {
      stopCamera();
    } else {
      mysticAudio.startCosmicDrone();
      startCamera();
    }
  };

  // Toggle Audio Mute
  const handleToggleAudio = () => {
    const muted = mysticAudio.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      mysticAudio.startCosmicDrone();
    }
  };

  // Keyboard Shortcuts for Astral Simulator
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleCastProphecy();
      } else if (e.key.toLowerCase() === 'e') {
        cycleElement();
      } else if (e.key.toLowerCase() === 'a') {
        setManualAspects(prev => !prev);
        mysticAudio.playSpellCast('flare');
      } else if (e.key.toLowerCase() === 'm') {
        handleToggleAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCastProphecy, cycleElement]);

  const handleSelectSign = (sign) => {
    setActiveSign(sign);
    mysticAudio.playNodeIgnite();
  };

  const handleLeaveSign = () => {
    // Keep sign selected for better divination reading experience
  };

  const handleWheelRotate = (delta) => {
    setRotation(prev => prev + delta);
    mysticAudio.playAstralRotation(delta * 0.1);
  };

  return (
    <div className={`universe-container element-${currentElement.name.toLowerCase()}`}>
      <div className="universe-bg"></div>
      <div className="celestial-body"></div>

      {/* Particle Spell FX */}
      <SparkleCanvas
        handCoordinates={handCoordinates}
        isCameraActive={isCameraActive}
        activeSpell={activeSpell}
        currentElement={currentElement}
        spellBurstTrigger={spellBurstTrigger}
      />

      {/* Top Header & Arcane Controls */}
      <header className="site-header">
        <div className="header-titles">
          <h1>Zodiac Fortune Board</h1>
          <p className="realm-tagline">Astrological Oracle · Gesture Magic Spells</p>
        </div>

        <div className="header-actions">
          <a href="../index.html" className="astral-btn back-btn">
            <i className="fa-solid fa-arrow-left"></i> Return to Realm
          </a>

          {/* Spellbook Grimoire Toggle */}
          <button 
            className="astral-btn" 
            onClick={() => setIsGrimoireOpen(true)}
            title="Open Spellbook"
          >
            📜 Spellbook
          </button>

          {/* Elemental Transmutation Button */}
          <button 
            className="astral-btn element-badge-btn" 
            onClick={cycleElement}
            style={{ borderColor: currentElement.color, color: currentElement.color }}
            title="Click or use Peace Sign gesture to transmute element"
          >
            {currentElement.symbol} {currentElement.name}
          </button>

          {/* Audio Mute/Unmute */}
          <button 
            className="astral-btn icon-btn" 
            onClick={handleToggleAudio}
            title={isMuted ? "Unmute Cosmic Audio" : "Mute Cosmic Audio"}
          >
            <i className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i>
          </button>
        </div>
      </header>

      {/* Main Astrolabe Horoscope Board */}
      <div className="board-container">
        <AstrologyBoard
          signs={ZODIAC_SIGNS}
          activeSign={effectiveActiveSign}
          onHoverSign={handleSelectSign}
          onLeaveSign={handleLeaveSign}
          fortune={fortune}
          rotation={rotation}
          onWheelRotate={handleWheelRotate}
          showAspects={showAspects}
          activeSpell={activeSpell}
          currentElement={currentElement}
          onCastPinchSpell={handleCastProphecy}
        />
      </div>

      {/* Arcane Scrying Glass (Webcam PIP) */}
      <ScryingMirror
        videoRef={videoRef}
        isCameraActive={isCameraActive}
        isReady={isReady}
        activeSpell={activeSpell}
        rawLandmarks={rawLandmarks}
        onToggleCamera={handleToggleCamera}
        cameraError={cameraError}
      />

      {/* Grimoire Spellbook Drawer */}
      <GrimoirePanel
        isOpen={isGrimoireOpen}
        onClose={() => setIsGrimoireOpen(false)}
        currentElement={currentElement}
        onCycleElement={cycleElement}
      />
    </div>
  );
}

export default App;
