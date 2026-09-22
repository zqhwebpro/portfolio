import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AstrologyBoard } from './components/AstrologyBoard';
import { SparkleCanvas } from './components/SparkleCanvas';
import { ScryingMirror } from './components/ScryingMirror';
import { GrimoirePanel } from './components/GrimoirePanel';
import { 
  ZODIAC_SIGNS, 
  getRandomGoal, 
  getZodiacTarot, 
  drawRuneSpread, 
  rollD100Fate 
} from './data/fortunes';
import { useHandTracking } from './hooks/useHandTracking';
import { mysticAudio } from './utils/mysticAudio';
import './styles/astral.css';

function App() {
  const [activeSign, setActiveSign] = useState(ZODIAC_SIGNS[0]);

  // 5 Progressive Stages: 1: Zodiac Seal | 2: Destiny Covenant | 3: Tarot | 4: Runes | 5: d100 Fate
  const [activeStage, setActiveStage] = useState(1);

  // Divination state containers
  const [horoscopeGoal, setHoroscopeGoal] = useState(() => getRandomGoal(ZODIAC_SIGNS[0]));
  const [diceFate, setDiceFate] = useState(() => rollD100Fate(ZODIAC_SIGNS[0]));
  const [isDiceRolling, setIsDiceRolling] = useState(false);

  const [manualAspects, setManualAspects] = useState(false);
  const [isGrimoireOpen, setIsGrimoireOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [spellBurstTrigger, setSpellBurstTrigger] = useState(0);

  const gestureCooldownRef = useRef({});
  const lastPointedRef = useRef(null);

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

  // Calculate pointed sign directly from hand coordinates when pointer is in outer ring
  let pointedSign = null;
  if (activeSpell === 'POINTING' && handCoordinates) {
    const hx = handCoordinates.x - 0.5;
    const hy = handCoordinates.y - 0.5;
    const radius = Math.sqrt(hx * hx + hy * hy);
    // Outer ring zone: radius between 0.28 and 0.58
    if (radius > 0.28 && radius < 0.58) {
      const handAngle = (Math.atan2(hy, hx) * (180 / Math.PI) - rotation + 360) % 360;
      const adjusted = (handAngle + 90 + 15) % 360;
      const signIndex = Math.floor(adjusted / 30);
      pointedSign = ZODIAC_SIGNS[signIndex] || null;
    }
  }

  const effectiveActiveSign = pointedSign || activeSign || ZODIAC_SIGNS[0];

  // Derive Tarot card and Runes spread directly from effective active sign
  const tarotCard = React.useMemo(() => {
    return getZodiacTarot(effectiveActiveSign?.id);
  }, [effectiveActiveSign?.id]);

  const runeData = React.useMemo(() => {
    return drawRuneSpread(effectiveActiveSign);
  }, [effectiveActiveSign]);

  // Sound and stage update when pointed sign changes
  useEffect(() => {
    if (pointedSign && lastPointedRef.current?.id !== pointedSign.id) {
      setActiveSign(pointedSign);
      setActiveStage(1);
      mysticAudio.playNodeIgnite();
    }
    lastPointedRef.current = pointedSign;
  }, [pointedSign]);

  // Stage 2: Cast Destiny Covenant / Horoscope Goal Channeling
  const handleCastGoal = useCallback(() => {
    if (gestureCooldownRef.current.prophecy) return;
    gestureCooldownRef.current.prophecy = true;

    setActiveStage(2);
    mysticAudio.playSpellCast('prophecy');
    setSpellBurstTrigger(t => t + 1);

    const newGoal = getRandomGoal(effectiveActiveSign);
    setHoroscopeGoal(newGoal);

    setTimeout(() => {
      mysticAudio.playCelestialChime(Math.floor(Math.random() * 6));
      setTimeout(() => {
        gestureCooldownRef.current.prophecy = false;
      }, 1200);
    }, 200);
  }, [effectiveActiveSign]);

  // Stage 5: Roll 100-Sided Fate Dice
  const handleRollDice = useCallback(() => {
    if (gestureCooldownRef.current.dice) return;
    gestureCooldownRef.current.dice = true;

    setActiveStage(5);
    setIsDiceRolling(true);
    mysticAudio.playDiceRoll();
    setSpellBurstTrigger(t => t + 1);

    setTimeout(() => {
      setDiceFate(rollD100Fate(effectiveActiveSign));
      setIsDiceRolling(false);
      setTimeout(() => {
        gestureCooldownRef.current.dice = false;
      }, 1000);
    }, 550);
  }, [effectiveActiveSign]);

  // 5-Stage Gesture Controller (1, 2, 3, 5, 0 Fingers)
  useEffect(() => {
    // Stage 1: POINTING (1 Finger - Focus Zodiac Sign & Grimoire Seal)
    if (activeSpell === 'POINTING' && !gestureCooldownRef.current.pointing) {
      gestureCooldownRef.current.pointing = true;
      setActiveStage(1);
      mysticAudio.playNodeIgnite();
      setSpellBurstTrigger(t => t + 1);
      setTimeout(() => {
        gestureCooldownRef.current.pointing = false;
      }, 1200);
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
      setSpellBurstTrigger(t => t + 1);
      setTimeout(() => {
        gestureCooldownRef.current.tarot = false;
      }, 1400);
    }

    // Stage 4: HORNS (Mystic Horns 🤘 - Witches' 3 Sacred Runes)
    if (activeSpell === 'HORNS' && !gestureCooldownRef.current.runes) {
      gestureCooldownRef.current.runes = true;
      setActiveStage(4);
      mysticAudio.playRuneCast();
      setSpellBurstTrigger(t => t + 1);
      setTimeout(() => {
        gestureCooldownRef.current.runes = false;
      }, 1400);
    }

    // Stage 5: FIST (Clenched Fist ✊ - Roll d100 Dice of Fate)
    if (activeSpell === 'FIST' && !gestureCooldownRef.current.fist) {
      gestureCooldownRef.current.fist = true;
      handleRollDice();
      setTimeout(() => {
        gestureCooldownRef.current.fist = false;
      }, 1500);
    }
  }, [activeSpell, handleCastGoal, handleRollDice]);

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
      } else if (e.key === '1') {
        setActiveStage(1);
        mysticAudio.playNodeIgnite();
      } else if (e.key === '2') {
        handleCastGoal();
      } else if (e.key === '3') {
        setActiveStage(3);
        mysticAudio.playTarotDraw();
      } else if (e.key === '4') {
        setActiveStage(4);
        mysticAudio.playRuneCast();
      } else if (e.key === '5') {
        handleRollDice();
      } else if (e.key.toLowerCase() === 'a') {
        setManualAspects(prev => !prev);
        mysticAudio.playSpellCast('flare');
      } else if (e.key.toLowerCase() === 'm') {
        handleToggleAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCastGoal, handleRollDice]);

  const handleSelectSign = (sign) => {
    setActiveSign(sign);
    setActiveStage(1);
    mysticAudio.playNodeIgnite();

    // Smoothly rotate the wheel so the chosen sign aligns at the Zenith (top)
    const signIdx = ZODIAC_SIGNS.findIndex(s => s.id === sign.id);
    if (signIdx !== -1) {
      // In a 12-sign circle, sign index i is at angle (i * 30) degrees.
      // Rotating by -i * 30 brings that sign to the top (Zenith).
      setRotation(-signIdx * 30);
    }
  };

  const handleLeaveSign = () => {
    // Keep sign focused for seamless divination reading
  };

  const handleWheelRotate = (delta) => {
    // Graceful slow rotation
    setRotation(prev => prev + delta * 0.4);
    mysticAudio.playAstralRotation(delta * 0.05);
  };

  return (
    <div className="universe-container">
      <div className="universe-bg"></div>
      <div className="celestial-body"></div>

      {/* Particle Spell FX */}
      <SparkleCanvas
        handCoordinates={handCoordinates}
        isCameraActive={isCameraActive}
        activeSpell={activeSpell}
        spellBurstTrigger={spellBurstTrigger}
      />

      {/* Top Header & Arcane Controls */}
      <header className="site-header">
        <div className="header-titles">
          <h1>Zodiac Divination Compass</h1>
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
          onHoverSign={handleSelectSign}
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
            if (stage === 1) mysticAudio.playNodeIgnite();
            if (stage === 2) handleCastGoal();
            if (stage === 3) mysticAudio.playTarotDraw();
            if (stage === 4) mysticAudio.playRuneCast();
            if (stage === 5) handleRollDice();
          }}
          onCastGoalSpell={handleCastGoal}
          tarotCard={tarotCard}
          runeData={runeData}
          diceFate={diceFate}
          onRollDice={handleRollDice}
          isDiceRolling={isDiceRolling}
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
