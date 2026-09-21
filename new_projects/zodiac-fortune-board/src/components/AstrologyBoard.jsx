import React from 'react';

export function AstrologyBoard({ signs, activeSign, onHoverSign, onLeaveSign, fortune }) {
  
  const radius = 50; // percentage based on astrolabe size (50% is edge)
  const totalNodes = signs.length;

  return (
    <>
      <div className="astrolabe" id="astrolabe">
          <div className="astrolabe-inner"></div>
          
          {signs.map((sign, i) => {
            const angle = (i / totalNodes) * (2 * Math.PI) - (Math.PI / 2);
            const x = 50 + (radius * Math.cos(angle));
            const y = 50 + (radius * Math.sin(angle));

            return (
              <div 
                key={sign.id}
                className="project-node"
                style={{
                  left: `${x}%`,
                  top: `${y}%`
                }}
                onMouseEnter={() => onHoverSign(sign)}
                onMouseLeave={onLeaveSign}
              >
                {sign.symbol}
              </div>
            );
          })}

          {/* Decorative runes */}
          {[...Array(12)].map((_, i) => {
            const runes = ['♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓'];
            const angle = (i / 12) * (2 * Math.PI);
            const rx = 50 + (35 * Math.cos(angle));
            const ry = 50 + (35 * Math.sin(angle));
            
            return (
              <div 
                key={i} 
                className="tribal-rune"
                style={{
                  left: `${rx}%`,
                  top: `${ry}%`,
                  transform: `translate(-50%, -50%) rotate(${angle + Math.PI/2}rad)`
                }}
              >
                {runes[i]}
              </div>
            );
          })}
      </div>

      <div className={`oracle-core ${activeSign ? 'active' : ''}`} id="oracle" style={{
        boxShadow: activeSign 
          ? '0 0 80px rgba(197, 160, 89, 0.4), inset 0 0 50px rgba(197, 160, 89, 0.4)' 
          : '0 0 60px rgba(0,0,0,0.9), inset 0 0 30px rgba(197, 160, 89, 0.2)'
      }}>
          <div className="oracle-icon" id="oracle-icon">
            {activeSign ? activeSign.symbol : '👁️'}
          </div>
          <div className="oracle-title" id="oracle-title">
            {activeSign ? activeSign.name : 'The Grand Astrolabe'}
          </div>
          <div className="oracle-desc" id="oracle-desc">
            {activeSign 
              ? 'A celestial connection is formed. Read your fate.' 
              : 'Hover over the cosmic runes to channel knowledge from past realms and projects.'}
          </div>
          <div className="oracle-fortune" id="oracle-fortune">
            {fortune}
          </div>
      </div>
    </>
  );
}
