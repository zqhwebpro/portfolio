import React from 'react';

export function OracleDisplay({ fortune, isChanneling }) {
  if (!fortune && !isChanneling) {
    return (
      <div className="oracle-container" style={{ opacity: 0.5 }}>
        <p style={{ letterSpacing: '0.2em' }}>SELECT A SIGN TO CHANNEL DESTINY...</p>
      </div>
    );
  }

  return (
    <div className="oracle-container">
      {isChanneling ? (
        <div className="channeling-text mystic-text">
          COMMUNING WITH THE ASTRAL PLANE...
        </div>
      ) : (
        <div className="oracle-text mystic-text" key={fortune}>
          {fortune}
        </div>
      )}
    </div>
  );
}
