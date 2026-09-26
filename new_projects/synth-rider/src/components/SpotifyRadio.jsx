import React, { useEffect } from 'react';

export function SpotifyRadio({ onAudioStateChange }) {
  // Since we use an iframe, we can't detect play state directly.
  // The waveform visualizer can just run constantly.
  useEffect(() => {
    if (onAudioStateChange) {
      onAudioStateChange(true);
    }
  }, [onAudioStateChange]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 35,
        width: '340px',
        maxWidth: 'calc(100vw - 3rem)',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 240, 255, 0.25), 0 0 15px rgba(255, 0, 127, 0.4)',
      }}
    >
      <iframe 
        style={{ borderRadius: '12px', background: 'transparent' }} 
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DXdLEN7aqioXM?utm_source=generator&theme=0" 
        width="100%" 
        height="152" 
        frameBorder="0" 
        allowFullScreen="" 
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
        loading="lazy"
      ></iframe>
    </div>
  );
}
