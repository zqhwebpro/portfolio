import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Disc, Radio } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

const SPOTIFY_CLIENT_ID = '00f3d3d13ecf4304bea7652ce9d28448';
const SPOTIFY_CLIENT_SECRET = '05c88a1d8ec242ca8fc7d62c43e21677';

// Reliable High-Quality Synthwave / Retrowave Audio Streams
const SYNTHWAVE_PLAYLIST = [
  {
    id: 1,
    name: 'Synthwave Night Drive',
    artist: 'Retrowave Cyber FM',
    album: 'Outrun 1984',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=120&q=80',
    preview_url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a86a63.mp3?filename=synthwave-80s-110045.mp3'
  },
  {
    id: 2,
    name: 'Neon Horizon',
    artist: 'Vector Hold',
    album: 'Cyberpunk Drive',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=120&q=80',
    preview_url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=synthwave-action-113524.mp3'
  },
  {
    id: 3,
    name: 'Cybernetic Highway',
    artist: 'Laserhawk Sound',
    album: 'Redline Sunset',
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    preview_url: 'https://cdn.pixabay.com/download/audio/2021/11/24/audio_34d3f58a70.mp3?filename=retro-synthwave-11254.mp3'
  },
  {
    id: 4,
    name: 'Midnight Cruiser',
    artist: 'Kavinsky Wave',
    album: 'Grid Explorer',
    cover: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=120&q=80',
    preview_url: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_993f822e11.mp3?filename=cyberpunk-2099-122938.mp3'
  },
  {
    id: 5,
    name: 'Starlight Outrun',
    artist: 'Lazer Blade',
    album: 'Neon Nights',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=120&q=80',
    preview_url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=synthwave-retro-18653.mp3'
  }
];

export function SpotifyRadio({ onAudioStateChange }) {
  const [tracks, setTracks] = useState(SYNTHWAVE_PLAYLIST);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [radioStatus, setRadioStatus] = useState('CYBER FM 98.4');
  
  const audioRef = useRef(null);
  const currentTrack = tracks[trackIndex] || SYNTHWAVE_PLAYLIST[0];

  // Fetch Spotify API tracks if available and merge valid preview_urls
  useEffect(() => {
    async function fetchSpotifyToken() {
      try {
        const authString = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);
        const res = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${authString}`
          },
          body: 'grant_type=client_credentials'
        });

        if (!res.ok) throw new Error('Spotify auth failed');
        const data = await res.json();
        if (data.access_token) {
          fetchSpotifyTracks(data.access_token);
        }
      } catch (err) {
        console.warn('Spotify Auth Warning:', err);
      }
    }

    fetchSpotifyToken();
  }, []);

  async function fetchSpotifyTracks(token) {
    try {
      const res = await fetch('https://api.spotify.com/v1/search?q=synthwave+outrun&type=track&limit=10', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.tracks && data.tracks.items) {
        const validTracks = data.tracks.items
          .filter(t => t.preview_url)
          .map((t, idx) => ({
            id: `sp-${idx}`,
            name: t.name,
            artist: t.artists.map(a => a.name).join(', '),
            album: t.album.name,
            cover: t.album.images[0]?.url || SYNTHWAVE_PLAYLIST[0].cover,
            preview_url: t.preview_url
          }));
        
        if (validTracks.length > 0) {
          setTracks([...validTracks, ...SYNTHWAVE_PLAYLIST]);
          setRadioStatus('SPOTIFY CYBER RADIO');
        }
      }
    } catch (err) {
      console.warn('Spotify Search Error:', err);
    }
  }

  // Handle automatic audio loading and playing when trackIndex changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().then(() => {
        if (onAudioStateChange) onAudioStateChange(true);
      }).catch(err => {
        console.warn('Track change playback error:', err);
        setIsPlaying(false);
        if (onAudioStateChange) onAudioStateChange(false);
      });
    }
  }, [trackIndex]);

  const togglePlay = () => {
    SoundEngine.playClick();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (onAudioStateChange) onAudioStateChange(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        if (onAudioStateChange) onAudioStateChange(true);
      }).catch(err => {
        console.warn('Playback error:', err);
      });
    }
  };

  const nextTrack = () => {
    SoundEngine.playClick();
    setTrackIndex(prev => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    SoundEngine.playClick();
    setTrackIndex(prev => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '0.85rem',
        right: '0.85rem',
        zIndex: 35,
        width: '240px',
        background: 'rgba(8, 2, 22, 0.78)',
        backdropFilter: 'blur(16px)',
        border: '1.5px solid rgba(0, 240, 255, 0.65)',
        borderRadius: '14px',
        boxShadow: '0 0 25px rgba(0, 240, 255, 0.35), inset 0 0 15px rgba(0, 240, 255, 0.1)',
        padding: '0.75rem',
        color: '#FFFFFF',
      }}
    >
      {/* Hidden Audio Stream Element */}
      <audio
        ref={audioRef}
        src={currentTrack.preview_url}
        onEnded={nextTrack}
      />

      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.55rem', borderBottom: '1px solid rgba(0, 240, 255, 0.2)', paddingBottom: '0.3rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 800, color: '#00F0FF', display: 'flex', alignItems: 'center', gap: '0.3rem', textShadow: '0 0 6px rgba(0, 240, 255, 0.8)' }}>
          <Radio size={12} color="#00F0FF" /> {radioStatus}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#FF007F', fontWeight: 800, textShadow: '0 0 6px rgba(255, 0, 127, 0.8)' }}>
          TRACK {String(trackIndex + 1).padStart(2, '0')}/{String(tracks.length).padStart(2, '0')}
        </div>
      </div>

      {/* Track Player Screen */}
      <div style={{
        background: 'rgba(4, 1, 14, 0.95)',
        border: '1px solid rgba(255, 0, 127, 0.5)',
        borderRadius: '10px',
        padding: '0.55rem',
        marginBottom: '0.6rem',
        display: 'flex',
        gap: '0.6rem',
        alignItems: 'center',
        boxShadow: 'inset 0 0 10px rgba(255, 0, 127, 0.2)'
      }}>
        {/* Album Art with Spinning Vinyl Disc */}
        <div style={{ position: 'relative', flexShrink: 0, width: '42px', height: '42px' }}>
          <img
            src={currentTrack.cover}
            alt="Album Cover"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px', border: '1px solid #00F0FF' }}
          />
          {isPlaying && (
            <Disc
              size={20}
              color="#FFE600"
              style={{ position: 'absolute', top: '50%', left: '50%', margin: '-10px 0 0 -10px', filter: 'drop-shadow(0 0 6px #FFE600)' }}
              className="animate-spin-medium"
            />
          )}
        </div>

        {/* Track Info */}
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            fontWeight: 900,
            color: '#00F0FF',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textShadow: '0 0 8px rgba(0, 240, 255, 0.8)'
          }}>
            {currentTrack.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: '#FF007F',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: '0.1rem'
          }}>
            {currentTrack.artist}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          onClick={prevTrack}
          style={{
            background: 'rgba(0, 240, 255, 0.12)',
            color: '#00F0FF',
            border: '1px solid rgba(0, 240, 255, 0.5)',
            borderRadius: '8px',
            padding: '0.45rem 0.6rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(0, 240, 255, 0.2)',
            transition: 'all 0.2s'
          }}
          title="Previous Track"
        >
          <SkipBack size={14} />
        </button>

        <button
          onClick={togglePlay}
          style={{
            flex: 1,
            margin: '0 0.4rem',
            background: isPlaying 
              ? 'linear-gradient(135deg, #FF007F, #7928CA)'
              : 'linear-gradient(135deg, #00F0FF, #0070F3)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            padding: '0.45rem 0.75rem',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.35rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.05em',
            boxShadow: isPlaying 
              ? '0 0 15px rgba(255, 0, 127, 0.6)'
              : '0 0 15px rgba(0, 240, 255, 0.6)'
          }}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>

        <button
          onClick={nextTrack}
          style={{
            background: 'rgba(0, 240, 255, 0.12)',
            color: '#00F0FF',
            border: '1px solid rgba(0, 240, 255, 0.5)',
            borderRadius: '8px',
            padding: '0.45rem 0.6rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(0, 240, 255, 0.2)',
            transition: 'all 0.2s'
          }}
          title="Next Track"
        >
          <SkipForward size={14} />
        </button>
      </div>
    </div>
  );
}

