import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AstrologyBoard } from './components/AstrologyBoard';
import { ScryingMirror } from './components/ScryingMirror';
import { GrimoirePanel } from './components/GrimoirePanel';
import { 
  ZODIAC_SIGNS, 
  getRandomGoal, 
  getZodiacTarot, 
  drawRuneSpread 
} from './data/fortunes';
import { useHandTracking } from './hooks/useHandTracking';
import { mysticAudio } from './utils/mysticAudio';
import './styles/astral.css';

function App() {
  const [activeSign, setActiveSign] = useState(ZODIAC_SIGNS[0]);
  const [isSignLocked, setIsSignLocked] = useState(false);

  // 4 Progressive Stages: 1: Zodiac Seal | 2: Destiny Covenant | 3: Tarot | 4: Runes
  const [activeStage, setActiveStage] = useState(1);
  const [hoveredSign, setHoveredSign] = useState(null);

  // Divination state containers
  const [horoscopeGoal, setHoroscopeGoal] = useState(() => getRandomGoal(ZODIAC_SIGNS[0]));

  const [manualAspects, setManualAspects] = useState(false);
  const [isGrimoireOpen, setIsGrimoireOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const gestureCooldownRef = useRef({});

  const {
    isCameraActive,
    isReady,
    rotation,
    setRotation,
    activeSpell,
    handCoordinates,
    rawLandmarks,
    cameraError,
    startCamera,
    stopCamera,
    videoRef
  } = useHandTracking();

  const showAspects = activeSpell === 'HORNS' || manualAspects;

  const isSignLockedRef = useRef(false);

  // Derive Tarot card and Runes spread directly from active sign
  const effectiveActiveSign = hoveredSign || activeSign || ZODIAC_SIGNS[0];

  const tarotCard = React.useMemo(() => {
    return getZodiacTarot(effectiveActiveSign?.id);
  }, [effectiveActiveSign?.id]);

  const runeData = React.useMemo(() => {
    return drawRuneSpread(effectiveActiveSign);
  }, [effectiveActiveSign]);

  // A fist selects the sign on the board and locks it
  const handleCastFistSelect = useCallback(() => {
    if (gestureCooldownRef.current.fist) return;
    gestureCooldownRef.current.fist = true;

    requestAnimationFrame(() => {
      const chosen = hoveredSign || activeSign;
      isSignLockedRef.current = true;
      setIsSignLocked(true);
      setActiveSign(chosen);
      setHoveredSign(null);
      setActiveStage(1);
      mysticAudio.playNodeIgnite();

      const signIdx = ZODIAC_SIGNS.findIndex(s => s.id === chosen.id);
      if (signIdx !== -1) {
        setRotation(-signIdx * 30);
      }

      setTimeout(() => {
        gestureCooldownRef.current.fist = false;
      }, 1200);
    });
  }, [hoveredSign, activeSign, setRotation]);

  // Pointing Wand: Aim at sign / browse on wheel before locking
  const handleCastPointing = useCallback(() => {
    if (gestureCooldownRef.current.pointing) return;
    gestureCooldownRef.current.pointing = true;

    requestAnimationFrame(() => {
      if (!isSignLockedRef.current && handCoordinates) {
        const hx = handCoordinates.x - 0.5;
        const hy = handCoordinates.y - 0.5;
        const radius = Math.sqrt(hx * hx + hy * hy);
        if (radius > 0.28 && radius < 0.58) {
          const handAngle = (Math.atan2(hy, hx) * (180 / Math.PI) - rotation + 360) % 360;
          const adjusted = (handAngle + 90 + 15) % 360;
          const signIndex = Math.floor(adjusted / 30);
          const chosen = ZODIAC_SIGNS[signIndex];
          if (chosen) {
            setHoveredSign(chosen);
          }
        }
      }
      setActiveStage(1);
      setTimeout(() => {
        gestureCooldownRef.current.pointing = false;
      }, 300);
    });
  }, [handCoordinates, rotation]);

  // Stage 2: Cast Destiny Covenant / Horoscope Goal Channeling
  const handleCastGoal = useCallback(() => {
    if (gestureCooldownRef.current.prophecy) return;
    gestureCooldownRef.current.prophecy = true;

    setActiveStage(2);
    mysticAudio.playSpellCast('prophecy');

    const newGoal = getRandomGoal(effectiveActiveSign);
    setHoroscopeGoal(newGoal);

    setTimeout(() => {
      mysticAudio.playCelestialChime(Math.floor(Math.random() * 6));
      setTimeout(() => {
        gestureCooldownRef.current.prophecy = false;
      }, 1200);
    }, 200);
  }, [effectiveActiveSign]);

  // 4-Stage Gesture Controller: A fist selects the sign on the board
  useEffect(() => {
    // FIST (✊) Selects the sign on the board and locks it
    if (activeSpell === 'FIST') {
      handleCastFistSelect();
    }

    // POINTING (☝️) Aim and preview sign
    if (activeSpell === 'POINTING') {
      handleCastPointing();
    }

    // Stage 2: PEACE / V-SIGN (2 Fingers - Destiny Covenant)
    if (activeSpell === 'PEACE' && !gestureCooldownRef.current.peace) {
      gestureCooldownRef.current.peace = true;
      handleCastGoal();
      setTimeout(() => {
        gestureCooldownRef.current.peace = false;
      }, 1400);
    }

    // Stage 3: OPEN_PALM (Open Hand - Major Arcana Tarot Card Display)
    if (activeSpell === 'OPEN_PALM' && !gestureCooldownRef.current.tarot) {
      gestureCooldownRef.current.tarot = true;
      setActiveStage(3);
      mysticAudio.playTarotDraw();
      setTimeout(() => {
        gestureCooldownRef.current.tarot = false;
      }, 1400);
    }

    // Stage 4: HORNS (Mystic Horns 🤘 - Witches' 3 Sacred Runes)
    if (activeSpell === 'HORNS' && !gestureCooldownRef.current.runes) {
      gestureCooldownRef.current.runes = true;
      setActiveStage(4);
      mysticAudio.playRuneCast();
      setTimeout(() => {
        gestureCooldownRef.current.runes = false;
      }, 1400);
    }
  }, [activeSpell, handleCastFistSelect, handleCastPointing, handleCastGoal]);

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
        handleCastGoal();
      } else if (e.key === '1' || e.key === 'Enter') {
        handleCastFistSelect();
      } else if (e.key === '2') {
        handleCastGoal();
      } else if (e.key === '3') {
        setActiveStage(3);
        mysticAudio.playTarotDraw();
      } else if (e.key === '4') {
        setActiveStage(4);
        mysticAudio.playRuneCast();
      } else if (e.key.toLowerCase() === 'a') {
        setManualAspects(prev => !prev);
        mysticAudio.playSpellCast('flare');
      } else if (e.key.toLowerCase() === 'm') {
        handleToggleAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCastGoal, handleCastFistSelect]);

  const handleHoverSign = (sign) => {
    if (!isSignLocked) {
      setHoveredSign(sign);
    }
  };

  const handleLeaveSign = () => {
    setHoveredSign(null);
  };

  const handleSelectSign = (sign) => {
    setActiveSign(sign);
    isSignLockedRef.current = true;
    setIsSignLocked(true); // Locking sign: no other can be chosen by pointing
    setHoveredSign(null);
    mysticAudio.playNodeIgnite();

    // Smoothly rotate the wheel so the chosen sign aligns at the top Zenith
    const signIdx = ZODIAC_SIGNS.findIndex(s => s.id === sign.id);
    if (signIdx !== -1) {
      setRotation(-signIdx * 30);
    }
  };

  const handleWheelRotate = (delta) => {
    // Smooth, responsive 1:1 wheel rotation
    setRotation(prev => prev + delta);
    mysticAudio.playAstralRotation(delta * 0.05);
  };

  return (
    <div className="universe-container">
      <div className="universe-bg"></div>
      <div className="celestial-body"></div>

      {/* Top Header & Arcane Controls */}
      <header className="site-header">
        <div className="header-titles">
          <h1>Tarot & Zodiac Divination Compass</h1>
          <p className="realm-tagline">Mystic Cartomancy · Ancient Astrolabe · Gesture Spells</p>
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

      {/* Main Astrolabe Horoscope Compass */}
      <div className="board-container">
        <AstrologyBoard
          signs={ZODIAC_SIGNS}
          activeSign={effectiveActiveSign}
          selectedSign={activeSign}
          hoveredSign={hoveredSign}
          isSignLocked={isSignLocked}
          onHoverSign={handleHoverSign}
          onLeaveSign={handleLeaveSign}
          onSelectSign={handleSelectSign}
          horoscopeGoal={horoscopeGoal}
          rotation={rotation}
          onWheelRotate={handleWheelRotate}
          showAspects={showAspects}
          activeSpell={activeSpell}
          activeStage={activeStage}
          onSelectStage={(stage) => {
            setActiveStage(stage);
            if (stage === 1) handleCastFistSelect();
            if (stage === 2) handleCastGoal();
            if (stage === 3) mysticAudio.playTarotDraw();
            if (stage === 4) mysticAudio.playRuneCast();
          }}
          onCastGoalSpell={handleCastGoal}
          tarotCard={tarotCard}
          runeData={runeData}
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
      />
    </div>
  );
}

export default App;
