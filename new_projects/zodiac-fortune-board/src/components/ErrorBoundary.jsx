import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Mystic Error Caught by Boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 50% 50%, #15082e 0%, #030108 100%)',
          color: '#f9e2af',
          fontFamily: "'Philosopher', 'MedievalSharp', serif",
          textAlign: 'center',
          padding: '20px',
          zIndex: 99999
        }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', color: '#ffd700' }}>
            The Astral Weave Rippled
          </h2>
          <p style={{ maxWidth: '500px', fontSize: '0.95rem', lineHeight: '1.6', color: 'rgba(255,255,255,0.85)', marginBottom: '20px' }}>
            A surge of cosmic energy momentarily disrupted the divination plane.
          </p>
          <button
            onClick={this.handleReset}
            style={{
              padding: '10px 24px',
              fontFamily: "'Philosopher', serif",
              fontSize: '0.9rem',
              background: 'rgba(139, 69, 255, 0.4)',
              border: '1px solid #ffd700',
              color: '#fff',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Realign the Stars
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
