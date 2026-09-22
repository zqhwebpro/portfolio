import React, { useRef } from 'react';

export function AstrologyBoard({
  signs,
  activeSign,
  onHoverSign,
  onLeaveSign,
  onSelectSign,
  isSignLocked = false,
  onToggleLock,
  horoscopeGoal,
  rotation = 0,
  onWheelRotate,
  showAspects = false,
  activeSpell,
  activeStage = 1,
  onSelectStage,
  onCastPinchSpell,
  tarotCard,
  runeData,
  diceFate,
  onRollDice,
  isDiceRolling = false
}) {
  const totalNodes = signs.length;
  const radius = 50; // percentage based on astrolabe size (50% is edge)
  const isDraggingRef = useRef(false);
  const lastMouseAngleRef = useRef(0);

  const activeSignIndex = signs.findIndex(s => s.id === activeSign?.id);
  const alignmentAngle = activeSignIndex !== -1 ? (activeSignIndex / totalNodes) * 360 - 90 : -90;

  // Mouse / Touch drag to spin astrolabe (active when unlocked)
  const handlePointerDown = (e) => {
    if (isSignLocked) return;
    if (
      e.target.closest('.crystal-lock-pill') || 
      e.target.closest('.astral-btn') || 
      e.target.closest('.compass-spin-btn') || 
      e.target.closest('.compass-gesture-nav') || 
      e.target.closest('.project-node')
    ) return;

    isDraggingRef.current = true;
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
    onWheelRotate(delta);
    lastMouseAngleRef.current = currentAngle;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
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
              stroke={isTrine ? 'rgba(255, 215, 0, 0.45)' : 'rgba(0, 242, 254, 0.35)'}
              strokeWidth={isTrine ? '0.45' : '0.3'}
              strokeDasharray={isTrine ? 'none' : '1,1'}
            />
          );
        })}
      </svg>
    );
  };

  // 5 Stage Navigation Definitions
  const stages = [
    { id: 1, title: 'Lock Horoscope', icon: '👍', howTo: 'How to: Thumbs up gesture' },
    { id: 2, title: 'Horoscope Goal', icon: '🤏', howTo: 'How to: Pinch index and thumb' },
    { id: 3, title: 'Tarot Arcana', icon: '✌️', howTo: 'How to: Two-finger peace sign' },
    { id: 4, title: 'Divination Runes', icon: '✋', howTo: 'How to: Open palm with 5 fingers' },
    { id: 5, title: 'Dice of Fate', icon: '✊', howTo: 'How to: Clench into a fist' }
  ];

  return (
    <div className="divination-arena">
      {/* Left-Side Divination Navigation Panel (Off the Compass) */}
      <nav className="compass-gesture-nav" aria-label="Divination Stages">
        <div className="nav-panel-header">
          <span className="nav-panel-title">Divination Stages</span>
        </div>
        <div className="nav-stages-list">
          {stages.map(stg => (
            <button
              key={stg.id}
              className={`nav-stage-btn ${activeStage === stg.id ? 'active' : ''}`}
              onClick={() => onSelectStage && onSelectStage(stg.id)}
            >
              <div className="nav-stage-top">
                <span className="nav-stage-icon">{stg.icon}</span>
                <span className="nav-stage-name">{stg.id}. {stg.title}</span>
              </div>
              <div className="nav-stage-howto">{stg.howTo}</div>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Astrolabe / Divination Compass */}
      <div className="compass-stage-center">
        <div 
          className="astrolabe-wrapper"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Quick-Spin Wheels Buttons */}
          <button 
            className="compass-spin-btn prev"
            onClick={(e) => { e.stopPropagation(); if (onWheelRotate) onWheelRotate(-30); }}
            title="Spin Compass Clockwise (‹)"
            aria-label="Spin Compass Clockwise"
          >
            ‹
          </button>
          <button 
            className="compass-spin-btn next"
            onClick={(e) => { e.stopPropagation(); if (onWheelRotate) onWheelRotate(30); }}
            title="Spin Compass Counter-Clockwise (›)"
            aria-label="Spin Compass Counter-Clockwise"
          >
            ›
          </button>

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
            <div className="compass-cardinal zenith">Zenith</div>
            <div className="compass-cardinal nadir">Nadir</div>
            <div className="compass-cardinal ascendant">Ascendant</div>
            <div className="compass-cardinal descendant">Descendant</div>

            <div className="astrolabe-inner"></div>
            <div className="astrolabe-runic-ring"></div>

            {/* Luminous Celestial Alignment Ray */}
            {activeSign && (
              <div 
                className="celestial-alignment-ray"
                style={{ transform: `rotate(${alignmentAngle}deg)` }}
              >
                <div className="alignment-beam"></div>
                <div className="alignment-halo"></div>
              </div>
            )}

            {/* Aspect Lines Web */}
            {renderAspectLines()}

            {/* 12 Zodiac Constellation Nodes (NO element text in bubbles; pure glyphs) */}
            {signs.map((sign, i) => {
              const angle = (i / totalNodes) * (2 * Math.PI) - Math.PI / 2;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              const isSelected = activeSign && activeSign.id === sign.id;

              return (
                <div
                  key={sign.id}
                  className={`project-node ${isSelected ? 'active-node' : ''} ${isSignLocked && isSelected ? 'locked-node' : ''}`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    borderColor: isSelected ? sign.color : undefined,
                    boxShadow: isSelected 
                      ? `0 0 35px ${sign.color}, inset 0 0 15px ${sign.color}` 
                      : undefined
                  }}
                  onMouseEnter={() => !isSignLocked && onHoverSign(sign)}
                  onMouseLeave={onLeaveSign}
                  onClick={() => onSelectSign ? onSelectSign(sign) : onHoverSign(sign)}
                  title={`${sign.name} (${sign.dates}) - Click to Select`}
                >
                  <span className="node-symbol">{sign.symbol}</span>
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

        {/* 3D Luminous Scrying Crystal Ball */}
        <div className="crystal-ball-stand-base"></div>
        <div
          className={`crystal-ball-sphere stage-${activeStage} ${activeSign ? 'active' : ''} ${isSignLocked ? 'is-locked' : ''} ${activeSpell === 'PINCH' ? 'pinch-charging' : ''}`}
          id="crystal-ball"
        >
          {/* Volumetric Optical Glare & Velvet Reflection Layers */}
          <div className="crystal-specular-glare"></div>
          <div className="crystal-glare-secondary"></div>
          <div className="crystal-velvet-reflection"></div>
          <div className="crystal-mist-layer mist-1"></div>
          <div className="crystal-mist-layer mist-2"></div>
          <div className="crystal-inner-refraction"></div>

          {/* Floating Content Inside the Crystal Ball */}
          <div className="crystal-ball-content">
            {/* Lock Status Pill */}
            {activeSign && (
              <button 
                className={`crystal-lock-pill ${isSignLocked ? 'locked' : 'unlocked'}`}
                onClick={onToggleLock}
                title={isSignLocked ? "Horoscope Locked · Click or Thumbs Up 👍 to Unlock" : "Click or Thumbs Up 👍 to Lock In Horoscope"}
              >
                <span className="lock-icon">{isSignLocked ? '🔒' : '🔓'}</span>
                <span className="lock-label">
                  {isSignLocked ? `${activeSign.name} Locked` : 'Thumbs Up 👍 to Lock'}
                </span>
              </button>
            )}

            {/* STAGE 1: Constellation & Horoscope Lock Decree */}
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
                            stroke={activeSign.color || '#f9e2af'}
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
                            stroke={activeSign.color || '#c5a059'}
                            strokeWidth="2"
                          />
                        ))}
                      </svg>
                    </div>

                    <h2 className="center-sign-title">{activeSign.name} · {activeSign.title}</h2>
                    
                    {/* Clean Meta: No element label */}
                    <div className="center-sign-meta">
                      <span>{activeSign.house}</span>
                      <span className="meta-dot">·</span>
                      <span>Ruler: {activeSign.planet}</span>
                      <span className="meta-dot">·</span>
                      <span>{activeSign.dates}</span>
                    </div>

                    <p className="stage-action-prompt">
                      {isSignLocked 
                        ? 'Horoscope locked. Pinch fingers for Goal, or Peace sign for Tarot.' 
                        : 'Give a Thumbs Up gesture 👍 or click the lock pill to freeze your horoscope.'}
                    </p>
                  </>
                ) : (
                  <div className="center-empty-state">
                    <div className="empty-symbol">⭐</div>
                    <h2 className="center-sign-title">Zodiac Compass</h2>
                    <p className="empty-desc">Select any sign on the wheel and give a Thumbs Up 👍 to lock in your horoscope.</p>
                  </div>
                )}
              </div>
            )}

            {/* STAGE 2: Goal-Oriented Horoscope Quest View */}
            {activeStage === 2 && (
              <div className="stage-content stage-goal-view" onClick={onCastPinchSpell} title="Click or Pinch to Channel New Goal">
                {horoscopeGoal && typeof horoscopeGoal === 'object' ? (
                  <div className="oracle-goal-card">
                    <div className="goal-quest-badge">Destiny Quest</div>
                    <h2 className="goal-quest-title">{horoscopeGoal.questTitle}</h2>
                    
                    <div className="goal-section impetus-section">
                      <span className="goal-label">Cosmic Impetus:</span>
                      <p className="goal-text">{horoscopeGoal.cosmicImpetus}</p>
                    </div>

                    <div className="goal-milestone-box">
                      <span className="milestone-label">Action Milestone:</span>
                      <p className="milestone-text">{horoscopeGoal.goalMilestone}</p>
                    </div>

                    <div className="goal-section oath-section">
                      <span className="goal-label">Cosmic Oath:</span>
                      <p className="oath-text">{horoscopeGoal.cosmicOath}</p>
                    </div>

                    <div className="goal-window-tag">
                      Horizon Window: {horoscopeGoal.horizonWindow}
                    </div>

                    <p className="stage-action-prompt">
                      Pinch to channel new goal. Peace sign for Tarot.
                    </p>
                  </div>
                ) : (
                  <div className="oracle-fortune">
                    <h2 className="fortune-headline">Celestial Alignment</h2>
                    <p className="fortune-omen">Cosmic currents align with {activeSign?.name}. Focus your intent to manifest destiny.</p>
                  </div>
                )}
              </div>
            )}

            {/* STAGE 3: Major Arcana Tarot Card View */}
            {activeStage === 3 && tarotCard && (
              <div className="stage-content stage-tarot-view">
                <div className="tarot-card-orb">
                  <div className="tarot-card-numeral">{tarotCard.numeral}</div>
                  <div className="tarot-card-sigil">{tarotCard.sigil}</div>
                  <h2 className="tarot-card-name">{tarotCard.name}</h2>
                  <div className="tarot-keywords-pill">{tarotCard.keywords}</div>
                  <div className="tarot-counsel-box">
                    <span className="counsel-label">Arcana Counsel:</span>
                    <p className="counsel-text">{tarotCard.upright}</p>
                  </div>
                  <p className="stage-action-prompt">
                    Cast Open Palm gesture or select Divination Runes to reveal ancient runes.
                  </p>
                </div>
              </div>
            )}

            {/* STAGE 4: Divination Runes Spread & Designated Spell Rune View */}
            {activeStage === 4 && runeData && (
              <div className="stage-content stage-runes-view">
                <div className="runes-spread-grid">
                  {runeData.spread.map((rn, idx) => (
                    <div key={idx} className="rune-stone-card">
                      <div className="rune-position-title">{rn.position}</div>
                      <div className="rune-stone-glyph">{rn.glyph}</div>
                      <div className="rune-stone-name">{rn.name}</div>
                      <p className="rune-stone-meaning">{rn.meaning}</p>
                    </div>
                  ))}
                </div>

                <div className="spell-rune-banner">
                  <div className="spell-rune-left">
                    <span className="spell-rune-large-glyph">{runeData.spellRune.glyph}</span>
                  </div>
                  <div className="spell-rune-right">
                    <div className="spell-rune-tag">Designated Spell Rune · {runeData.spellRune.name}</div>
                    <div className="spell-rune-chant">"{runeData.spellRune.incantation}"</div>
                  </div>
                </div>

                <p className="stage-action-prompt">
                  Cast Fist gesture or select Dice of Fate on the left to roll the 100-sided die.
                </p>
              </div>
            )}

            {/* STAGE 5: 100-Sided Dice Roll (d100) */}
            {activeStage === 5 && diceFate && (
              <div className="stage-content stage-dice-view">
                <div 
                  className={`d100-die-orb ${isDiceRolling ? 'rolling' : ''}`}
                  onClick={onRollDice}
                  title="Click or Clench Fist to Roll d100"
                >
                  <div className="d100-polyhedron-glow"></div>
                  <div className="d100-center-number">
                    {isDiceRolling ? '🎲' : diceFate.roll}
                  </div>
                  <div className="d100-d-tag">d100</div>
                </div>
                <div className="dice-tier-badge">{diceFate.tier}</div>
                <h2 className="dice-fate-title">{diceFate.title}</h2>
                <p className="dice-fate-omen">{diceFate.omen}</p>
                <div className="dice-blessing-pill">{diceFate.blessing}</div>
                <button className="astral-btn dice-reroll-btn" onClick={onRollDice}>
                  Roll d100 for Fate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
