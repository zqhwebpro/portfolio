import React from 'react';

export function OracleDisplay({ isChanneling, fortune }) {
  if (!isChanneling && !fortune) {
    return (
      <div className="oracle-container">
        <div className="oracle-text" style={{ opacity: 0.6 }}>
          Select a sign to divine your fate...
        </div>
      </div>
    );
  }

  if (isChanneling) {
    return (
      <div className="oracle-container">
        <div className="channeling-text">
          COMMUNING WITH THE ASTRAL PLANE...
        </div>
      </div>
    );
  }

  return (
    <div className="oracle-container">
      <div className="oracle-text">
        {fortune}
      </div>
    </div>
  );
}
