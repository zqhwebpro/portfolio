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
  onCastPinchSpell
}) {
  const totalNodes = signs.length;
  const radius = 50; // percentage based on astrolabe size (50% is edge)
  const isDraggingRef = useRef(false);
  const lastMouseAngleRef = useRef(0);

  // Mouse / Touch drag to spin astrolabe
  const handlePointerDown = (e) => {
    // Only drag if clicking outside nodes or on the outer ring
    if (e.target.closest('.project-node') || e.target.closest('.oracle-core')) return;
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
    // Aspect angles: Trines (120° = 4 signs apart), Sextiles (60° = 2 signs apart), Oppositions (180° = 6 signs apart)
    const chords = [];
    for (let i = 0; i < totalNodes; i++) {
      // Connect each sign to its Trines (+4, +8)
      const trine1 = (i + 4) % totalNodes;
      if (i < trine1) {
        chords.push({ from: i, to: trine1, type: 'trine' });
      }
      // Oppositions (+6)
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
            {/* Degree ticks */}
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

          {/* 12 Zodiac Constellation Nodes */}
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
              >
                <span className="node-symbol">{sign.symbol}</span>
                <span className="node-element-tag" style={{ color: sign.element.color }}>
                  {sign.element.symbol}
                </span>

                {/* Micro Constellation Map popup on hover */}
                {isSelected && (
                  <div className="constellation-mini-map">
                    <div className="constellation-name">{sign.name}</div>
                    <div className="constellation-meta">{sign.element.name} · {sign.planet}</div>
                    <svg className="constellation-svg" viewBox="0 0 100 100">
                      {sign.lines.map(([s1, s2], lineIdx) => (
                        <line
                          key={lineIdx}
                          x1={sign.stars[s1].x}
                          y1={sign.stars[s1].y}
                          x2={sign.stars[s2].x}
                          y2={sign.stars[s2].y}
                          stroke={sign.element.color}
                          strokeWidth="2"
                        />
                      ))}
                      {sign.stars.map((st, starIdx) => (
                        <circle
                          key={starIdx}
                          cx={st.x}
                          cy={st.y}
                          r="3.5"
                          fill="#ffffff"
                          stroke={sign.element.color}
                          strokeWidth="1.5"
                        />
                      ))}
                    </svg>
                  </div>
                )}
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

      {/* Central Oculus of Fate / The Oracle Core */}
      <div
        className={`oracle-core ${activeSign ? 'active' : ''} ${activeSpell === 'PINCH' ? 'pinch-charging' : ''}`}
        id="oracle"
        onClick={onCastPinchSpell}
        title="Click or Pinch to Channel Prophecy"
        style={{
          boxShadow: activeSign
            ? `0 0 90px ${activeSign.element.glow}, inset 0 0 50px ${activeSign.element.glow}`
            : currentElement
            ? `0 0 70px ${currentElement.glow}, inset 0 0 40px ${currentElement.glow}`
            : '0 0 80px rgba(0,0,0,0.9), inset 0 0 40px rgba(145, 133, 199, 0.25)'
        }}
      >
        {/* Swirling Nebula Ring */}
        <div className="oculus-vortex"></div>

        <div className="oracle-icon" id="oracle-icon">
          {activeSign ? activeSign.symbol : currentElement ? currentElement.symbol : '👁️'}
        </div>

        <div className="oracle-title" id="oracle-title">
          {activeSign 
            ? `${activeSign.name} · ${activeSign.title}` 
            : `The Grand Astrolabe (${currentElement ? currentElement.name : 'Aether'})`}
        </div>

        {activeSign && (
          <div className="oracle-sub-meta">
            <span>{activeSign.house}</span> • <span>Ruler: {activeSign.planet}</span>
          </div>
        )}

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
          <div className="oracle-fortune" id="oracle-fortune">
            {fortune || 'Cast a Pinch or Hover over a Constellation to Divinate Fate...'}
          </div>
        )}

        <div className="oracle-hint">
          {activeSpell === 'PINCH'
            ? '✨ Pinch Held! Releasing Fate Spell... ✨'
            : '🤏 Pinch or Click to Channel New Prophecy · ✋ Palm for Sacred Aspects'}
        </div>
      </div>
    </>
  );
}
