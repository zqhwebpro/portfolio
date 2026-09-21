import React, { useRef } from 'react';

export function AstrologyBoard({
  signs,
  activeSign,
  onHoverSign,
  onLeaveSign,
  fortune,
  rotation = 0,
  onWheelRotate,
  showAspects = false,
  activeSpell,
  currentElement,
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
    // Only drag if clicking outside nodes or on the outer ring
    if (e.target.closest('.project-node') || e.target.closest('.oracle-core') || e.target.closest('.top-focus-indicator')) return;
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
              strokeWidth={isTrine ? '0.4' : '0.25'}
              strokeDasharray={isTrine ? 'none' : '1,1'}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <>
      {/* Top Zodiac Focus Indicator / Celestial Crown */}
      <div className="top-focus-indicator">
        <div className="focus-badge-crown">
          <div className="focus-icon-orb" style={{ borderColor: activeSign?.element.color }}>
            <span className="focus-symbol">{activeSign ? activeSign.symbol : '✦'}</span>
          </div>
          <div className="focus-details">
            <div className="focus-header-line">
              <span className="focus-active-label">Zodiac Focus:</span>
              <span className="focus-name">{activeSign ? `${activeSign.name} · ${activeSign.title}` : 'Celestial Equator'}</span>
            </div>
            <div className="focus-sub-line">
              {activeSign ? (
                <>
                  <span className="focus-meta-dates">{activeSign.dates}</span>
                  <span className="focus-divider">·</span>
                  <span className="focus-meta-elem" style={{ color: activeSign.element.color }}>
                    {activeSign.element.symbol} {activeSign.element.name} ({activeSign.element.label})
                  </span>
                  <span className="focus-divider">·</span>
                  <span className="focus-meta-house">{activeSign.house}</span>
                </>
              ) : (
                <span className="focus-prompt">Point with Celestial Wand or hover over a sign to focus</span>
              )}
            </div>
          </div>
        </div>
      </div>

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

          <div className="astrolabe-inner"></div>
          <div className="astrolabe-runic-ring"></div>

          {/* Aspect Lines Web */}
          {renderAspectLines()}

          {/* 12 Zodiac Constellation Nodes (NO pop-up on nodes; content lives in center Oculus) */}
          {signs.map((sign, i) => {
            const angle = (i / totalNodes) * (2 * Math.PI) - Math.PI / 2;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            const isSelected = activeSign && activeSign.id === sign.id;
            const isElementMatch = currentElement && sign.element.name === currentElement.name;

            return (
              <div
                key={sign.id}
                className={`project-node ${isSelected ? 'active-node' : ''} ${isElementMatch ? 'element-resonate' : ''}`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  borderColor: isSelected ? sign.element.color : undefined,
                  boxShadow: isSelected 
                    ? `0 0 35px ${sign.element.glow}, inset 0 0 15px ${sign.element.glow}` 
                    : undefined
                }}
                onMouseEnter={() => onHoverSign(sign)}
                onMouseLeave={onLeaveSign}
                onClick={() => onHoverSign(sign)}
                title={`${sign.name} (${sign.dates}) - Click to Focus`}
              >
                <span className="node-symbol">{sign.symbol}</span>
                <span className="node-element-tag" style={{ color: sign.element.color }}>
                  {sign.element.symbol}
                </span>
              </div>
            );
          })}

          {/* Decorative Planetary Runes */}
          {['☉','☽','☿','♀','♂','♃','♄','♅','♆','♇','⚚','🜁'].map((rune, i) => {
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

      {/* Central Oculus of Fate / The 5-Stage Progressive Oracle Core */}
      <div
        className={`oracle-core stage-${activeStage} ${activeSign ? 'active' : ''} ${activeSpell === 'PINCH' ? 'pinch-charging' : ''}`}
        id="oracle"
        style={{
          boxShadow: activeSign
            ? `0 0 95px ${activeSign.element.glow}, inset 0 0 50px ${activeSign.element.glow}`
            : currentElement
            ? `0 0 75px ${currentElement.glow}, inset 0 0 40px ${currentElement.glow}`
            : '0 0 85px rgba(0,0,0,0.95), inset 0 0 45px rgba(145, 133, 199, 0.25)'
        }}
      >
        {/* Swirling Nebula Ring */}
        <div className="oculus-vortex"></div>

        {/* 5-Stage Switcher Bar (Supports direct clicks and reflects hand gestures) */}
        <div className="oculus-stage-tabs" onClick={(e) => e.stopPropagation()}>
          {[
            { id: 1, label: 'Constellation', icon: '✨', gesture: 'Point' },
            { id: 2, label: 'Horoscope', icon: '🤏', gesture: 'Pinch' },
            { id: 3, label: 'Tarot', icon: '✌️', gesture: 'Peace' },
            { id: 4, label: 'Runes', icon: '✋', gesture: 'Palm' },
            { id: 5, label: 'd100 Fate', icon: '✊', gesture: 'Fist' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`stage-pill ${activeStage === tab.id ? 'active' : ''}`}
              onClick={() => onSelectStage && onSelectStage(tab.id)}
              title={`Stage ${tab.id}: ${tab.label} (Gesture: ${tab.gesture})`}
            >
              <span className="stage-pill-icon">{tab.icon}</span>
              <span className="stage-pill-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* STAGE 1: Constellation Star Map & Lore (Moved from pop-up to center) */}
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
                        stroke={activeSign.element.color}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    ))}
                    {activeSign.stars.map((st, idx) => (
                      <circle
                        key={idx}
                        cx={st.x}
                        cy={st.y}
                        r="4.5"
                        fill="#ffffff"
                        stroke={activeSign.element.color}
                        strokeWidth="2"
                      />
                    ))}
                  </svg>
                </div>
                <div className="center-sign-title">{activeSign.name} · {activeSign.title}</div>
                <div className="center-sign-meta">
                  <span>{activeSign.house}</span>
                  <span className="meta-dot">·</span>
                  <span>Ruler: {activeSign.planet}</span>
                  <span className="meta-dot">·</span>
                  <span style={{ color: activeSign.element.color }}>
                    {activeSign.element.symbol} {activeSign.element.name}
                  </span>
                </div>
                <div className="stage-action-prompt">
                  Cast 🤏 Pinch gesture or click Horoscope for fortune prophecy
                </div>
              </>
            ) : (
              <div className="center-empty-state">
                <div className="empty-symbol">✨</div>
                <div className="center-sign-title">Zodiac Focus</div>
                <p className="empty-desc">Point with celestial wand or click any outer zodiac glyph to illuminate its constellation.</p>
              </div>
            )}
          </div>
        )}

        {/* STAGE 2: Horoscope Fortune & Prophecy */}
        {activeStage === 2 && (
          <div className="stage-content stage-prophecy-view" onClick={onCastPinchSpell} title="Click or Pinch to Channel New Prophecy">
            {fortune && typeof fortune === 'object' ? (
              <div className="oracle-fortune-card">
                <div className="prophecy-header">
                  <span className="prophecy-title">✦ {fortune.title} ✦</span>
                  <span className="prophecy-transit">{fortune.transit}</span>
                </div>
                <p className="prophecy-omen">{fortune.omen}</p>
                <div className="prophecy-footer">
                  <span className="prophecy-action">Guidance: {fortune.action}</span>
                  <span className="prophecy-aspect">Aspect: {fortune.luckyAspect}</span>
                </div>
              </div>
            ) : (
              <div className="oracle-fortune">
                {fortune || 'Cast a Pinch to unseal cosmic prophecy...'}
              </div>
            )}
            <div className="stage-action-prompt">
              Cast ✌️ Peace gesture or click Tarot to reveal Major Arcana
            </div>
          </div>
        )}

        {/* STAGE 3: Major Arcana Tarot Card Divination */}
        {activeStage === 3 && tarotCard && (
          <div className="stage-content stage-tarot-view">
            <div className="tarot-card-frame">
              <div className="tarot-card-header">
                <span className="tarot-numeral">{tarotCard.number}</span>
                <span className="tarot-arcana-tag">Major Arcana</span>
              </div>
              <div className="tarot-art-orb">
                <span className="tarot-sigil">{tarotCard.symbol}</span>
              </div>
              <div className="tarot-card-name">{tarotCard.name}</div>
              <div className="tarot-card-title">{tarotCard.title}</div>
              <div className="tarot-keywords">
                {tarotCard.keywords.map((kw, i) => (
                  <span key={i} className="tarot-chip">{kw}</span>
                ))}
              </div>
              <p className="tarot-upright">{tarotCard.upright}</p>
              <div className="tarot-advice">✦ Guidance: {tarotCard.advice}</div>
            </div>
            <div className="stage-action-prompt">
              Cast ✋ Open Palm gesture or click Runes for Elder Futhark spread
            </div>
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
            <div className="stage-action-prompt">
              Cast ✊ Fist gesture or click d100 Fate to roll 100-sided die
            </div>
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
            <div className="dice-fate-title">✦ {diceFate.title} ✦</div>
            <p className="dice-fate-omen">{diceFate.omen}</p>
            <div className="dice-blessing-pill">{diceFate.blessing}</div>
            <button className="astral-btn dice-reroll-btn" onClick={onRollDice}>
              🎲 Roll d100 for Fate
            </button>
          </div>
        )}

        {/* Bottom Hint */}
        <div className="oracle-hint">
          {activeSpell ? `Cast Gesture: ${activeSpell} Active` : 'Navigate with 5 Magic Gestures or Click the Stage Pills'}
        </div>
      </div>
    </>
  );
}
