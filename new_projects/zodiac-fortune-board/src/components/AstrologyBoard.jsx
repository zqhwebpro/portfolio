import React, { useRef } from 'react';
import { TarotIllustration } from './TarotIllustration';

export function AstrologyBoard({
  signs,
  activeSign,
  selectedSign,
  hoveredSign,
  zenithSign,
  isSignLocked = false,
  activeSpell,
  onHoverSign,
  onLeaveSign,
  onSelectSign,
  horoscopeGoal,
  rotation = 0,
  onWheelRotate,
  showAspects = false,
  activeStage = 1,
  onSelectStage,
  onCastGoalSpell,
  tarotCard,
  runeData,
  fistHoldProgress = 0,
  isFistHeld = false,
  onStartFistHold,
  onEndFistHold
}) {
  const totalNodes = signs.length;
  const radius = 50; // percentage based on astrolabe size (50% is edge)
  const isDraggingRef = useRef(false);
  const lastMouseAngleRef = useRef(0);

  // Mouse / Touch drag to spin astrolabe smoothly (only when outside center circle and when not locked)
  const handlePointerDown = (e) => {
    if (isSignLocked) return;

    if (
      e.target.closest('.crystal-ball-sphere') || 
      e.target.closest('.crystal-ball-content') ||
      e.target.closest('.astral-btn') || 
      e.target.closest('.compass-gesture-nav') || 
      e.target.closest('.project-node')
    ) return;

    isDraggingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    lastMouseAngleRef.current = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
  };

  const handlePointerMove = (e) => {
    if (isSignLocked || !isDraggingRef.current || !onWheelRotate) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const currentAngle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
    let delta = currentAngle - lastMouseAngleRef.current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    // 1:1 direct tactile angular tracking for smooth effortless spin
    onWheelRotate(delta);
    lastMouseAngleRef.current = currentAngle;
  };

  const handlePointerUp = (e) => {
    isDraggingRef.current = false;
    try {
      if (e && e.currentTarget && e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}
  };

  // Generate aspect chords between signs for Sacred Geometry
  const renderAspectLines = () => {
    const chords = [];
    for (let i = 0; i < totalNodes; i++) {
      const trine1 = (i + 4) % totalNodes;
      if (i < trine1) {
        chords.push({ from: i, to: trine1, type: 'trine' });
      }
      const opp = (i + 6) % totalNodes;
      if (i < opp) {
        chords.push({ from: i, to: opp, type: 'opposition' });
      }
    }

    return (
      <svg className="aspect-lines-svg" viewBox="0 0 100 100">
        {chords.map((chord, idx) => {
          const a1 = (chord.from / totalNodes) * (2 * Math.PI) - Math.PI / 2;
          const a2 = (chord.to / totalNodes) * (2 * Math.PI) - Math.PI / 2;
          const x1 = 50 + 50 * Math.cos(a1);
          const y1 = 50 + 50 * Math.sin(a1);
          const x2 = 50 + 50 * Math.cos(a2);
          const y2 = 50 + 50 * Math.sin(a2);

          const isTrine = chord.type === 'trine';
          return (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className={`aspect-chord ${chord.type} ${showAspects ? 'active' : ''}`}
              stroke={isTrine ? 'rgba(255, 170, 0, 0.55)' : 'rgba(255, 90, 0, 0.45)'}
              strokeWidth={isTrine ? '0.5' : '0.35'}
              strokeDasharray={isTrine ? 'none' : '1.5,1.5'}
            />
          );
        })}
      </svg>
    );
  };

  // 5 Mystical Gestures: Point at the top as the primary sign selection gesture
  const gestures = [
    {
      id: 'point',
      gesture: '☝️ Point',
      desc: 'Rotate to choose sign',
      isPointAction: true
    },
    { 
      id: 'fist', 
      gesture: isSignLocked ? '✊ Fist (Locked)' : '✊ Fist', 
      desc: isSignLocked ? 'Hold 3s to unlock' : 'Hold 3s to lock sign',
      isFistAction: true
    },
    { id: 2, gesture: '✌️ Peace', desc: 'Summary horoscope' },
    { id: 3, gesture: '✋ Palm', desc: 'Tarot card' },
    { id: 4, gesture: '🤘 Horns', desc: 'Three runes' }
  ];

  return (
    <div className="divination-arena">
      {/* Left-Side Divination Navigation Panel - Antique Cartomancy Altar Tablet */}
      <nav className="compass-gesture-nav" aria-label="Divination Gestures">
        <div className="panel-corner tl"></div>
        <div className="panel-corner tr"></div>
        <div className="panel-corner bl"></div>
        <div className="panel-corner br"></div>

        <div className="nav-panel-astral-sigil">
          <span className="sigil-glyph">☽ ☉ ☾</span>
        </div>

        <div className="nav-stages-list">
          {gestures.map(stg => {
            const isPoint = stg.isPointAction;
            const isFist = stg.id === 'fist' || stg.isFistAction;
            const isActive = isPoint
              ? activeSpell === 'POINTING'
              : isFist
                ? false
                : activeStage === stg.id;

            return (
              <button
                key={stg.id}
                className={`nav-stage-btn ${isActive ? 'active' : ''} ${isFist && isSignLocked ? 'stage-locked' : ''} ${isPoint ? 'stage-point' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isPoint) {
                    if (onSelectStage) onSelectStage(1);
                  } else if (!isFist) {
                    if (onSelectStage) onSelectStage(stg.id);
                  }
                }}
                onPointerDown={() => {
                  if (isFist && onStartFistHold) onStartFistHold();
                }}
                onPointerUp={() => {
                  if (isFist && onEndFistHold) onEndFistHold();
                }}
                onPointerLeave={() => {
                  if (isFist && onEndFistHold) onEndFistHold();
                }}
                onPointerCancel={() => {
                  if (isFist && onEndFistHold) onEndFistHold();
                }}
                title={isPoint && isSignLocked ? "Sign is locked. Hold ✊ Fist 3s to unlock." : stg.desc}
              >
                {isFist && isFistHeld && fistHoldProgress > 0 && (
                  <div 
                    className="nav-btn-hold-fill"
                    style={{ width: `${Math.min(100, fistHoldProgress * 100)}%` }}
                  />
                )}
                <div className="nav-stage-indicator"></div>
                <div className="nav-stage-content">
                  <span className="nav-stage-gesture">{stg.gesture}</span>
                  <span className="nav-stage-desc">
                    {isFist && isFistHeld && fistHoldProgress > 0
                      ? `${isSignLocked ? 'Unlocking' : 'Locking'}... ${(3 - fistHoldProgress * 3).toFixed(1)}s`
                      : stg.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Astrolabe / Divination Compass */}
      <div className="compass-stage-center">
        <div 
          className={`astrolabe-wrapper ${isSignLocked ? 'is-locked-wrapper' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Fixed Zenith Needle pointing down at 12 o'clock sign displayed on board */}
          <div className={`zenith-alignment-pointer ${isSignLocked ? 'pointer-locked' : ''}`} title="Zenith: Zodiac sign at 12 o'clock is displayed on the board">
            <div className="zenith-pointer-glyph">▼</div>
            <div className="zenith-pointer-line"></div>
          </div>

          <div 
            className="astrolabe" 
            id="astrolabe" 
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Sacred Geometry Concentric Brass Rings */}
            <div className="astrolabe-outer-ring">
              {[...Array(36)].map((_, i) => (
                <div 
                  key={i} 
                  className="degree-tick" 
                  style={{ transform: `rotate(${i * 10}deg)` }}
                />
              ))}
            </div>

            {/* Cardinal Compass Markers */}
            <div className="compass-cardinal nadir">
              <span className="cardinal-flourish">▼</span> Nadir
            </div>
            <div className="compass-cardinal ascendant">
              <span className="cardinal-flourish">◀</span> Ascendant
            </div>
            <div className="compass-cardinal descendant">
              <span className="cardinal-flourish">▶</span> Descendant
            </div>

            <div className="astrolabe-inner"></div>
            <div className="astrolabe-runic-ring"></div>

            {/* Aspect Lines Web */}
            {renderAspectLines()}

            {/* 12 Zodiac Constellation Nodes (Pure Glyphs, Distinct Zenith/Selected/Hover States) */}
            {signs.map((sign, i) => {
              const angle = (i / totalNodes) * (2 * Math.PI) - Math.PI / 2;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              const isSelected = selectedSign && selectedSign.id === sign.id;
              const isAtZenith = zenithSign && zenithSign.id === sign.id;
              const isHovered = hoveredSign && hoveredSign.id === sign.id;

              return (
                <div
                  key={sign.id}
                  className={`project-node ${isSelected ? 'selected-node' : ''} ${isAtZenith ? 'zenith-node' : ''} ${isHovered ? 'hovered-node' : ''}`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`
                  }}
                  onMouseEnter={() => onHoverSign && onHoverSign(sign)}
                  onMouseLeave={() => onLeaveSign && onLeaveSign()}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectSign) onSelectSign(sign);
                  }}
                  title={`${sign.name} (${sign.dates}) ${isSelected ? '— Selected & Locked (Click to Unlock)' : isAtZenith ? '— Aligned at Zenith (On Board)' : '— Click to Select'}`}
                >
                  <span className="node-symbol">{sign.symbol}</span>
                  {isHovered && <span className="node-hover-label">{sign.name}</span>}
                </div>
              );
            })}

            {/* Planetary Runes */}
            {['☉','☽','☿','♀','♂','♃','♄','♅','♆','♇','⚚','⭐'].map((rune, i) => {
              const angle = (i / 12) * (2 * Math.PI);
              const rx = 50 + 35 * Math.cos(angle);
              const ry = 50 + 35 * Math.sin(angle);
              return (
                <div
                  key={i}
                  className="tribal-rune"
                  style={{
                    left: `${rx}%`,
                    top: `${ry}%`,
                    transform: `translate(-50%, -50%) rotate(${angle + Math.PI / 2}rad)`
                  }}
                >
                  {rune}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3-Second Fist Hold Radial Arc & Countdown Overlay */}
        {isFistHeld && fistHoldProgress > 0 && (
          <div className="fist-hold-overlay">
            <div className="fist-hold-card">
              <div className="fist-hold-meter-wrapper">
                <svg className="fist-hold-svg" viewBox="0 0 100 100">
                  <circle
                    className="fist-hold-track"
                    cx="50"
                    cy="50"
                    r="42"
                  />
                  <circle
                    className="fist-hold-progress-arc"
                    cx="50"
                    cy="50"
                    r="42"
                    style={{
                      strokeDasharray: 264,
                      strokeDashoffset: 264 - 264 * fistHoldProgress
                    }}
                  />
                </svg>
                <div className="fist-hold-inner-icon">✊</div>
              </div>
              <div className="fist-hold-action-title">
                {isSignLocked ? 'Unlocking Zodiac' : `Locking ${zenithSign.name}`}
              </div>
              <div className="fist-hold-countdown">
                {Math.max(0.1, (3 - fistHoldProgress * 3)).toFixed(1)}s
              </div>
              <div className="fist-hold-subtext">Keep Fist Clenched for 3s</div>
            </div>
          </div>
        )}

        {/* Doctor Strange Eldritch Sanctum / Central Divination Matrix */}
        <div className="crystal-ball-stand-base"></div>
        <div
          className={`crystal-ball-sphere stage-${activeStage} ${activeSign ? 'active' : ''}`}
          id="crystal-ball"
        >
          {/* Doctor Strange Tao Mandala Spark Rings in Background */}
          <div className="eldritch-mandala-ring ring-outer"></div>
          <div className="eldritch-mandala-ring ring-middle"></div>
          <div className="eldritch-mandala-ring ring-inner"></div>
          <div className="crystal-specular-glare"></div>
          <div className="crystal-inner-refraction"></div>

          {/* Floating Content Inside the Eldritch Circle */}
          <div className="crystal-ball-content">
            {/* STAGE 1: Ancient Zodiac Grimoire Seal & Constellation */}
            {activeStage === 1 && (
              <div className="stage-content stage-constellation-view">
                {activeSign ? (
                  <>
                    <div className="crystal-sign-emblem">
                      <span className="crystal-glyph-large">{activeSign.symbol}</span>
                    </div>

                    <div className="constellation-star-map-container">
                      <svg className="center-constellation-svg" viewBox="0 0 100 100">
                        {activeSign.lines.map(([s1, s2], idx) => (
                          <line
                            key={idx}
                            x1={activeSign.stars[s1].x}
                            y1={activeSign.stars[s1].y}
                            x2={activeSign.stars[s2].x}
                            y2={activeSign.stars[s2].y}
                            stroke="#ffb300"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                          />
                        ))}
                        {activeSign.stars.map((st, idx) => (
                          <circle
                            key={idx}
                            cx={st.x}
                            cy={st.y}
                            r="4.8"
                            fill="#ffffff"
                            stroke="#ff7700"
                            strokeWidth="2.2"
                          />
                        ))}
                      </svg>
                    </div>

                    <h2 className="center-sign-title">{activeSign.name} · {activeSign.title}</h2>
                    
                    <div className="center-sign-meta">
                      <span>{activeSign.house}</span>
                      <span className="meta-dot">·</span>
                      <span>Ruler: {activeSign.planet}</span>
                      <span className="meta-dot">·</span>
                      <span>{activeSign.dates}</span>
                    </div>
                  </>
                ) : (
                  <div className="center-empty-state">
                    <div className="empty-symbol">⭐</div>
                    <h2 className="center-sign-title">Mystic Compass</h2>
                    <p className="empty-desc">Point ☝️ with 1 finger outside the center to focus and spin. Clench a ✊ Fist to select.</p>
                  </div>
                )}
              </div>
            )}

            {/* STAGE 2: One Summary Horoscope (Clean, No Badges, Single Reading) */}
            {activeStage === 2 && (
              <div 
                className="stage-content stage-goal-view" 
                onClick={onCastGoalSpell} 
                title="Click or 2-Finger Peace to Channel Horoscope"
              >
                {horoscopeGoal && typeof horoscopeGoal === 'object' ? (
                  <div className="summary-horoscope-card">
                    <div className="summary-horoscope-header">
                      <span className="summary-horoscope-glyph">{activeSign?.symbol}</span>
                      <h2 className="summary-horoscope-title">{activeSign?.name} · {horoscopeGoal.questTitle}</h2>
                      <div className="summary-horoscope-meta">
                        <span>{activeSign?.dates}</span>
                        <span className="meta-dot">·</span>
                        <span>Ruler: {activeSign?.planet}</span>
                      </div>
                    </div>

                    <p className="summary-horoscope-text">
                      {horoscopeGoal.cosmicImpetus} {horoscopeGoal.goalMilestone} {horoscopeGoal.cosmicOath}
                    </p>
                  </div>
                ) : (
                  <div className="summary-horoscope-card">
                    <h2 className="summary-horoscope-title">{activeSign?.name || 'Celestial Seeker'} · Horoscope</h2>
                    <p className="summary-horoscope-text">
                      The cosmic currents align with {activeSign?.name || 'the cosmos'}. Channel your intent to unveil the astral forecast.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* STAGE 3: Authentic Physical Tarot Card Display (No Pills, Realistic Card Border) */}
            {activeStage === 3 && tarotCard && (
              <div className="stage-content stage-tarot-view">
                <div className="physical-tarot-card">
                  <div className="tarot-card-frame">
                    <div className="tarot-corner tl"></div>
                    <div className="tarot-corner tr"></div>
                    <div className="tarot-corner bl"></div>
                    <div className="tarot-corner br"></div>

                    <div className="tarot-card-numeral">{tarotCard.number}</div>

                    <div className="tarot-art-window">
                      <TarotIllustration signId={activeSign?.id} />
                    </div>

                    <h2 className="tarot-card-title">{tarotCard.name}</h2>
                    <div className="tarot-card-archetype">{tarotCard.title}</div>

                    <p className="tarot-card-reading">{tarotCard.upright}</p>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 4: Exactly 3 Runes (Past, Present, Outcome - No Bottom Banner) */}
            {activeStage === 4 && runeData && (
              <div className="stage-content stage-runes-view">
                <div className="runes-triad-grid">
                  {runeData.spread.slice(0, 3).map((rn, idx) => (
                    <div key={idx} className="rune-stone-card">
                      <div className="rune-position-header">{rn.position}</div>
                      <div className="rune-glyph-well">
                        <span className="rune-stone-glyph">{rn.glyph}</span>
                      </div>
                      <h3 className="rune-stone-name">{rn.name}</h3>
                      <div className="rune-element-tag">{rn.element}</div>
                      <p className="rune-stone-meaning">{rn.meaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
