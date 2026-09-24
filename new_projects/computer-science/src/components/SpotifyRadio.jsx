import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Disc, Radio, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import { SoundEngine } from '../utils/soundEngine';

const SPOTIFY_CLIENT_ID = '00f3d3d13ecf4304bea7652ce9d28448';
const SPOTIFY_CLIENT_SECRET = '05c88a1d8ec242ca8fc7d62c43e21677';

// Fallback Synthwave tracks with audio streams
const FALLBACK_TRACKS = [
  {
    name: 'Synthwave Night Drive',
    artist: 'Retrowave Cyber FM',
    album: 'Outrun 1984',
    cover: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=120&q=80',
    preview_url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a86a63.mp3?filename=synthwave-80s-110045.mp3',
    spotify_url: 'https://open.spotify.com/genre/synthwave'
  },
  {
    name: 'Neon Horizon',
    artist: 'Vector Hold',
    album: 'Cyberpunk Drive',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=120&q=80',
    preview_url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=synthwave-action-113524.mp3',
    spotify_url: 'https://open.spotify.com/genre/synthwave'
  },
  {
    name: 'Cybernetic Highway',
    artist: 'Laserhawk Sound',
    album: 'Redline Sunset',
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    preview_url: 'https://cdn.pixabay.com/download/audio/2021/11/24/audio_34d3f58a70.mp3?filename=retro-synthwave-11254.mp3',
    spotify_url: 'https://open.spotify.com/genre/synthwave'
  }
];

export function SpotifyRadio({ onAudioStateChange }) {
  const [accessToken, setAccessToken] = useState('');
  const [tracks, setTracks] = useState(FALLBACK_TRACKS);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [spotifyStatus, setSpotifyStatus] = useState('CONNECTING...');
  
  const audioRef = useRef(null);
  const currentTrack = tracks[trackIndex] || FALLBACK_TRACKS[0];

  // 1. Authenticate with Spotify API Client Credentials Flow
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
          setAccessToken(data.access_token);
          setSpotifyStatus('SPOTIFY CONNECTED');
          fetchSpotifyTracks(data.access_token);
        }
      } catch (err) {
        console.warn('Spotify Auth Warning:', err);
        setSpotifyStatus('RADIO FM MODE');
      }
    }

    fetchSpotifyToken();
  }, []);

  // 2. Query Spotify Web API for Synthwave Tracks
  async function fetchSpotifyTracks(token) {
    try {
      const res = await fetch('https://api.spotify.com/v1/search?q=synthwave+outrun&type=track&limit=12', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.tracks && data.tracks.items && data.tracks.items.length > 0) {
        const formatted = data.tracks.items.map(t => ({
          name: t.name,
          artist: t.artists.map(a => a.name).join(', '),
          album: t.album.name,
          cover: t.album.images[0]?.url || FALLBACK_TRACKS[0].cover,
          preview_url: t.preview_url || FALLBACK_TRACKS[0].preview_url,
          spotify_url: t.external_urls.spotify
        }));
        setTracks(formatted);
      }
    } catch (err) {
      console.warn('Spotify Search Error:', err);
    }
  }

  // Handle Play/Pause
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
    const nextIdx = (trackIndex + 1) % tracks.length;
    setTrackIndex(nextIdx);
    setIsPlaying(false);
    if (onAudioStateChange) onAudioStateChange(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          if (onAudioStateChange) onAudioStateChange(true);
        });
      }
    }, 150);
  };

  const prevTrack = () => {
    SoundEngine.playClick();
    const prevIdx = (trackIndex - 1 + tracks.length) % tracks.length;
    setTrackIndex(prevIdx);
    setIsPlaying(false);
    if (onAudioStateChange) onAudioStateChange(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          if (onAudioStateChange) onAudioStateChange(true);
        });
      }
    }, 150);
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '1.25rem',
        right: '1.25rem',
        zIndex: 30,
        width: '320px',
        background: '#0A0A0A',
        border: '3.5px solid #00F0FF',
        boxShadow: '0 8px 24px rgba(0, 240, 255, 0.3), 6px 6px 0 #0A0A0A',
        padding: '1rem',
        color: '#FFFFFF',
      }}
    >
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.preview_url}
        onEnded={nextTrack}
        muted={isMuted}
      />

      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '1.5px solid #222', paddingBottom: '0.4rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 900, color: '#1DB954', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Radio size={14} /> {spotifyStatus}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#FFE600', fontWeight: 800 }}>
          98.4 FM SYNTHWAVE
        </div>
      </div>

      {/* Radio LCD Screen */}
      <div style={{
        background: '#04120b',
        border: '2px solid #1DB954',
        padding: '0.75rem',
        marginBottom: '0.75rem',
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center',
        boxShadow: 'inset 0 0 10px rgba(29, 185, 84, 0.2)'
      }}>
        {/* Album Cover Art */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img
            src={currentTrack.cover}
            alt="Album Cover"
            style={{ width: '48px', height: '48px', objectFit: 'cover', border: '1.5px solid #1DB954' }}
          />
          {/* Cassette Spinning Wheel when playing */}
          {isPlaying && (
            <Disc
              size={20}
              color="#FFE600"
              style={{ position: 'absolute', top: '50%', left: '50%', margin: '-10px 0 0 -10px' }}
              className="animate-spin-medium"
            />
          )}
        </div>

        {/* Track Metadata */}
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            fontWeight: 900,
            color: '#1DB954',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {currentTrack.name}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: '#00F0FF',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {currentTrack.artist}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            color: '#888',
            marginTop: '0.2rem'
          }}>
            Album: {currentTrack.album}
          </div>
        </div>
      </div>

      {/* Control Knobs & Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            onClick={prevTrack}
            style={{
              background: '#181818',
              color: '#FFF',
              border: '1.5px solid #00F0FF',
              padding: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Previous Track"
          >
            <SkipBack size={14} />
          </button>

          <button
            onClick={togglePlay}
            style={{
              background: '#1DB954',
              color: '#000',
              border: '1.5px solid #0A0A0A',
              padding: '0.4rem 0.8rem',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem'
            }}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </button>

          <button
            onClick={nextTrack}
            style={{
              background: '#181818',
              color: '#FFF',
              border: '1.5px solid #00F0FF',
              padding: '0.4rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Next Track"
          >
            <SkipForward size={14} />
          </button>
        </div>

        {/* Spotify External Link */}
        <a
          href={currentTrack.spotify_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#1DB954',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 800,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}
        >
          SPOTIFY <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
