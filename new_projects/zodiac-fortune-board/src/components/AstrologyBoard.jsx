import React, { useRef } from 'react';

export function AstrologyBoard({
  signs,
  activeSign,
  onHoverSign,
  onLeaveSign,
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

  // Mouse / Touch drag to spin astrolabe
  const handlePointerDown = (e) => {
    if (e.target.closest('.project-node') || e.target.closest('.oracle-core') || e.target.closest('.compass-gesture-nav')) return;
    isDraggingRef.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    lastMouseAngleRef.current = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !onWheelRotate) return;
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
    { id: 1, title: 'Constellation Lore', icon: '✨', howTo: 'How to: Point index finger at sign' },
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
          <span className="nav-panel-sigil">🔮</span>
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

            {/* Aspect Lines Web */}
            {renderAspectLines()}

            {/* 12 Zodiac Constellation Nodes (NO pop-up on nodes; content in center Oculus) */}
            {signs.map((sign, i) => {
              const angle = (i / totalNodes) * (2 * Math.PI) - Math.PI / 2;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              const isSelected = activeSign && activeSign.id === sign.id;

              return (
                <div
                  key={sign.id}
                  className={`project-node ${isSelected ? 'active-node' : ''}`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    borderColor: isSelected ? sign.color : undefined,
                    boxShadow: isSelected 
                      ? `0 0 35px ${sign.color}, inset 0 0 15px ${sign.color}` 
                      : undefined
                  }}
                  onMouseEnter={() => onHoverSign(sign)}
                  onMouseLeave={onLeaveSign}
                  onClick={() => onHoverSign(sign)}
                  title={`${sign.name} (${sign.dates}) - Click to Focus`}
                >
                  <span className="node-symbol">{sign.symbol}</span>
                  <span className="node-element-tag" style={{ color: sign.color }}>
                    {sign.element}
                  </span>
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

        {/* Central Oculus of Fate / Uncluttered Divination Core */}
        <div
          className={`oracle-core stage-${activeStage} ${activeSign ? 'active' : ''} ${activeSpell === 'PINCH' ? 'pinch-charging' : ''}`}
          id="oracle"
          style={{
            boxShadow: activeSign
              ? `0 0 100px rgba(197, 160, 89, 0.35), inset 0 0 50px rgba(197, 160, 89, 0.2)`
              : '0 0 85px rgba(0,0,0,0.95), inset 0 0 45px rgba(145, 133, 199, 0.25)'
          }}
        >
          {/* Swirling Nebula Vortex */}
          <div className="oculus-vortex"></div>

          {/* STAGE 1: Constellation Lore View */}
          {activeStage === 1 && (
            <div className="stage-content stage-constellation-view">
              {activeSign ? (
                <>
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
                  <div className="center-sign-meta">
                    <span>{activeSign.house}</span>
                    <span className="meta-dot">·</span>
                    <span>Ruler: {activeSign.planet}</span>
                    <span className="meta-dot">·</span>
                    <span style={{ color: activeSign.color }}>{activeSign.element}</span>
                  </div>
                  <div className="center-sign-dates">{activeSign.dates}</div>
                  <p className="stage-action-prompt">
                    Cast Pinch gesture or select Horoscope Goal on the left to unseal your quest.
                  </p>
                </>
              ) : (
                <div className="center-empty-state">
                  <div className="empty-symbol">⭐</div>
                  <h2 className="center-sign-title">Zodiac Compass</h2>
                  <p className="empty-desc">Point with celestial wand or click any outer zodiac glyph to align its constellation.</p>
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

                  <div className="goal-section milestone-section">
                    <span className="goal-label">Action Milestone:</span>
                    <p className="goal-text highlight">{horoscopeGoal.goalMilestone}</p>
                  </div>

                  <div className="goal-section oath-section">
                    <span className="goal-label">Cosmic Oath:</span>
                    <p className="goal-text oath-text">"{horoscopeGoal.cosmicOath}"</p>
                  </div>

                  <div className="goal-footer">
                    <span className="goal-horizon">{horoscopeGoal.horizonWindow}</span>
                    <span className="goal-aspect">{horoscopeGoal.aspectLabel}</span>
                  </div>
                </div>
              ) : (
                <div className="oracle-fortune">
                  Cast a Pinch to unseal your celestial destiny goal.
                </div>
              )}
              <p className="stage-action-prompt">
                Cast Peace gesture or select Tarot Arcana on the left to draw your card.
              </p>
            </div>
          )}

          {/* STAGE 3: Major Arcana Tarot Card Divination */}
          {activeStage === 3 && tarotCard && (
            <div className="stage-content stage-tarot-view">
              <div className="tarot-card-frame">
                <div className="tarot-card-header">
                  <span className="tarot-numeral">Arcana {tarotCard.number}</span>
                  <span className="tarot-arcana-tag">Major Arcana</span>
                </div>
                <div className="tarot-art-orb">
                  <span className="tarot-sigil">{tarotCard.symbol}</span>
                </div>
                <h2 className="tarot-card-name">{tarotCard.name}</h2>
                <div className="tarot-card-title">{tarotCard.title}</div>
                <div className="tarot-keywords">
                  {tarotCard.keywords.map((kw, i) => (
                    <span key={i} className="tarot-chip">{kw}</span>
                  ))}
                </div>
                <p className="tarot-upright">{tarotCard.upright}</p>
                <div className="tarot-advice">Counsel: {tarotCard.advice}</div>
              </div>
              <p className="stage-action-prompt">
                Cast Open Palm gesture or select Divination Runes on the left to cast the runes.
              </p>
            </div>
          )}

          {/* STAGE 4: Divination Runes & Designated Spell Rune */}
          {activeStage === 4 && runeData && (
            <div className="stage-content stage-runes-view">
              <div className="runes-spread-grid">
                {runeData.spread.map((rune, idx) => (
                  <div key={idx} className="rune-node-card">
                    <span className="rune-position-label">{rune.position}</span>
                    <span className="rune-glyph-large">{rune.glyph}</span>
                    <span className="rune-name-label">{rune.name}</span>
                    <span className="rune-sub-meaning">{rune.translation}</span>
                  </div>
                ))}
              </div>
              <div className="designated-spell-rune-banner">
                <div className="spell-rune-badge">
                  <span className="spell-rune-glyph">{runeData.spellRune.glyph}</span>
                  <div className="spell-rune-details">
                    <div className="spell-rune-title">
                      Spell Rune: <strong>{runeData.spellRune.name}</strong> ({runeData.spellRune.element})
                    </div>
                    <div className="spell-rune-incantation">"{runeData.spellRune.incantation}"</div>
                  </div>
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

        {/* Text moved below the compass area */}
        <div className="compass-footer-hint">
          {activeSpell ? `Active Gesture: ${activeSpell}` : 'Navigate with 5 magic gestures or select a stage on the left navigation panel'}
        </div>
      </div>
    </div>
  );
}
