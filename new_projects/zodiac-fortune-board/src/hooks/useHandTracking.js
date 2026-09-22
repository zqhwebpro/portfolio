import { useState, useEffect, useRef, useCallback } from 'react';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export function useHandTracking() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isPinching, setIsPinching] = useState(false);
  const [activeSpell, setActiveSpell] = useState(null); // 'POINTING' | 'PEACE' | 'THREE_FINGERS' | 'OPEN_PALM' | 'FIST'
  const [handCoordinates, setHandCoordinates] = useState(null); // { x, y } in 0..1 range (mirrored)
  const [rawLandmarks, setRawLandmarks] = useState(null); // 21 landmarks for skeleton rendering
  const [cameraError, setCameraError] = useState(null);

  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);
  const requestRef = useRef(null);
  const isCameraActiveRef = useRef(false);
  const prevAngleRef = useRef(null);
  const smoothDeltaRef = useRef(0);
  const lastDetectTimeRef = useRef(0);
  const lastMediaPipeTimeRef = useRef(0);
  const recentSpellsRef = useRef([]);
  const currentSpellRef = useRef(null);
  const handCoordsRef = useRef(null);
  const rawLandmarksRef = useRef(null);

  // Initialize MediaPipe HandLandmarker with robust fallback and single-hand speed
  useEffect(() => {
    let isMounted = true;

    const initLandmarker = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm"
        );

        if (!isMounted) return;

        let landmarker;
        const modelAssetPath = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

        try {
          // Attempt GPU delegate first with numHands: 1 for lightning-fast inference
          landmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath,
              delegate: "GPU"
            },
            runningMode: "VIDEO",
            numHands: 1
          });
        } catch (gpuError) {
          console.warn("GPU delegate failed for HandLandmarker, falling back to CPU:", gpuError);
          landmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath,
              delegate: "CPU"
            },
            runningMode: "VIDEO",
            numHands: 1
          });
        }

        if (isMounted) {
          landmarkerRef.current = landmarker;
          setIsReady(true);
        }
      } catch (err) {
        console.error("Critical error initializing MediaPipe HandLandmarker:", err);
        if (isMounted) {
          setCameraError("Mystic runes could not load vision models. Use mouse simulation mode.");
        }
      }
    };

    initLandmarker();

    return () => {
      isMounted = false;
      if (landmarkerRef.current) {
        try {
          landmarkerRef.current.close();
        } catch {}
      }
    };
  }, []);

  // Helper to calculate Euclidean distance between two points
  const dist = (p1, p2) => {
    return Math.sqrt(
      Math.pow(p1.x - p2.x, 2) + 
      Math.pow(p1.y - p2.y, 2) + 
      Math.pow((p1.z || 0) - (p2.z || 0), 2)
    );
  };

  // Gesture Classifier with 5 Radically Distinct Hand Poses:
  // 1. POINTING: Index extended only (Stage 1: Focus Zodiac Sign)
  // 2. PEACE: Index + Middle in V, others curled (Stage 2: Summary Horoscope)
  // 3. OPEN_PALM: All 5 fingers extended wide (Stage 3: Tarot Card Shown)
  // 4. HORNS: Index + Pinky extended, Middle + Ring curled down (Stage 4: 3 Runes)
  // 5. FIST: All 4 fingers clenched tight (Stage 5: 100-Sided Fate Die)
  const classifyGesture = (landmarks) => {
    if (!landmarks || landmarks.length < 21) return { spell: null, isPinch: false };

    const wrist = landmarks[0];
    const thumbTip = landmarks[4];
    const thumbIP = landmarks[3];
    const indexTip = landmarks[8];
    const indexPIP = landmarks[6];
    const middleTip = landmarks[12];
    const middlePIP = landmarks[10];
    const ringTip = landmarks[16];
    const ringPIP = landmarks[14];
    const pinkyTip = landmarks[20];
    const pinkyPIP = landmarks[18];

    // Distance ratio relative to wrist
    const isIndexExtended = dist(indexTip, wrist) > dist(indexPIP, wrist) * 1.18;
    const isMiddleExtended = dist(middleTip, wrist) > dist(middlePIP, wrist) * 1.18;
    const isRingExtended = dist(ringTip, wrist) > dist(ringPIP, wrist) * 1.18;
    const isPinkyExtended = dist(pinkyTip, wrist) > dist(pinkyPIP, wrist) * 1.18;

    // 1. CLENCHED FIST: All 4 fingers curled tight (Stage 5: Fate Die)
    if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      return { spell: 'FIST', isPinch: false };
    }

    // 2. POINTING WAND: Only Index extended (Stage 1: Sign Lore)
    if (isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      return { spell: 'POINTING', isPinch: false };
    }

    // 3. PEACE / V-SIGN: Index and Middle extended, Ring and Pinky curled (Stage 2: Summary Horoscope)
    if (isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      return { spell: 'PEACE', isPinch: false };
    }

    // 4. MYSTIC HORNS: Index and Pinky extended, Middle and Ring curled down into palm (Stage 4: 3 Runes)
    if (isIndexExtended && !isMiddleExtended && !isRingExtended && isPinkyExtended) {
      return { spell: 'HORNS', isPinch: false };
    }

    // 5. OPEN PALM: All fingers extended wide (Stage 3: Tarot Card Shown)
    if (isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended) {
      return { spell: 'OPEN_PALM', isPinch: false };
    }

    return { spell: 'CHANNELING', isPinch: false };
  };

  const frameLoopRef = useRef(null);

  // Optimized Frame Loop throttled to 30 FPS with decoupled landmark refs
  const frameLoop = useCallback(() => {
    if (!isCameraActiveRef.current) return;

    const now = performance.now();
    const video = videoRef.current;
    const landmarker = landmarkerRef.current;

    // Throttle ML hand detection to ~30 FPS (~33ms) to eliminate CPU lag and action pauses
    if (video && landmarker && video.readyState >= 2 && video.videoWidth > 0) {
      if (now - lastDetectTimeRef.current >= 32) {
        lastDetectTimeRef.current = now;

        try {
          // Strictly monotonic timestamp required by MediaPipe
          const timestamp = Math.max(now, lastMediaPipeTimeRef.current + 1);
          lastMediaPipeTimeRef.current = timestamp;

          const results = landmarker.detectForVideo(video, timestamp);

          if (results && results.landmarks && results.landmarks.length > 0) {
            const landmarks = results.landmarks[0];
            rawLandmarksRef.current = landmarks;

            // Mirrored X coordinates for intuitive mirror navigation
            const primaryTip = landmarks[8];
            const mirroredX = 1 - primaryTip.x;
            const mirroredY = primaryTip.y;
            const newCoords = { x: mirroredX, y: mirroredY };
            handCoordsRef.current = newCoords;

            // Only update coordinates state if moved by noticeable margin
            setHandCoordinates(prev => {
              if (!prev) return newCoords;
              const dx = prev.x - newCoords.x;
              const dy = prev.y - newCoords.y;
              if (dx * dx + dy * dy > 0.00015) {
                return newCoords;
              }
              return prev;
            });
            setRawLandmarks(landmarks);

            // Spatial Compass Rotation Control:
            // Calculate distance from center (0.5, 0.5)
            const dx = mirroredX - 0.5;
            const dy = mirroredY - 0.5;
            const radiusFromCenter = Math.sqrt(dx * dx + dy * dy);
            const currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);

            // STOP rotation when magic cursor pointer is INSIDE the center circle (radius <= 0.26)
            if (radiusFromCenter > 0.26 && prevAngleRef.current !== null) {
              let delta = currentAngle - prevAngleRef.current;
              if (delta > 180) delta -= 360;
              if (delta < -180) delta += 360;

              // Dampen and smooth rotation delta for butter-smooth spin
              if (Math.abs(delta) > 0.15 && Math.abs(delta) < 40) {
                smoothDeltaRef.current = smoothDeltaRef.current * 0.4 + delta * 0.6;
                setRotation(prev => prev + smoothDeltaRef.current * 0.35);
              } else {
                smoothDeltaRef.current *= 0.5;
              }
            } else {
              // Inside deadzone: reset momentum
              smoothDeltaRef.current = 0;
            }
            prevAngleRef.current = currentAngle;

            // Classify gesture with 2-frame debouncing to eliminate jitter
            const { spell, isPinch } = classifyGesture(landmarks);
            recentSpellsRef.current.push(spell);
            if (recentSpellsRef.current.length > 3) {
              recentSpellsRef.current.shift();
            }

            const isDebouncedMatch = recentSpellsRef.current.length >= 2 &&
              recentSpellsRef.current.every(s => s === spell);

            if (isDebouncedMatch && currentSpellRef.current !== spell) {
              currentSpellRef.current = spell;
              setActiveSpell(spell);
              setIsPinching(isPinch);
            }
          } else {
            // Hand out of frame
            prevAngleRef.current = null;
            smoothDeltaRef.current = 0;
            if (currentSpellRef.current !== null) {
              currentSpellRef.current = null;
              setActiveSpell(null);
              setIsPinching(false);
              setHandCoordinates(null);
              setRawLandmarks(null);
              handCoordsRef.current = null;
              rawLandmarksRef.current = null;
            }
          }
        } catch {
          // Gracefully skip dropped or duplicate frames
        }
      }
    }

    requestRef.current = requestAnimationFrame(() => {
      frameLoopRef.current?.();
    });
  }, []);

  useEffect(() => {
    frameLoopRef.current = frameLoop;
  }, [frameLoop]);

  // Sync ref with state & manage continuous animation frame
  useEffect(() => {
    isCameraActiveRef.current = isCameraActive;
    if (isCameraActive) {
      requestRef.current = requestAnimationFrame(() => {
        frameLoopRef.current?.();
      });
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };
  }, [isCameraActive]);

  // Reliable camera startup with resolution control and loadeddata synchronization
  const startCamera = async () => {
    setCameraError(null);
    if (!isReady) {
      setCameraError("Mystic vision models are still loading. Please wait a moment.");
      return;
    }

    try {
      // Lightweight 480x360 constraints prevent heavy CPU bottleneck
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 480, max: 640 },
          height: { ideal: 360, max: 480 },
          frameRate: { ideal: 30, max: 30 },
          facingMode: "user"
        },
        audio: false
      });

      streamRef.current = stream;
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.muted = true;
        video.playsInline = true;

        // Synchronize before playing to eliminate freeze/black screens
        await new Promise((resolve) => {
          if (video.readyState >= 2 && video.videoWidth > 0) {
            resolve();
          } else {
            const onReady = () => {
              video.removeEventListener('loadeddata', onReady);
              video.removeEventListener('canplay', onReady);
              resolve();
            };
            video.addEventListener('loadeddata', onReady);
            video.addEventListener('canplay', onReady);
            setTimeout(resolve, 2000); // safety fallback
          }
        });

        try {
          await video.play();
        } catch (playErr) {
          console.warn("Video play interrupted or already playing:", playErr);
        }
      }

      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access failed or denied:", err);
      setCameraError("Webcam access was denied or is busy. Use mouse simulation mode!");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    setIsCameraActive(false);
    isCameraActiveRef.current = false;
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    prevAngleRef.current = null;
    smoothDeltaRef.current = 0;
    currentSpellRef.current = null;
    recentSpellsRef.current = [];
    setIsPinching(false);
    setActiveSpell(null);
    setHandCoordinates(null);
    setRawLandmarks(null);
    handCoordsRef.current = null;
    rawLandmarksRef.current = null;
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return {
    isCameraActive,
    isReady,
    rotation,
    setRotation,
    isPinching,
    activeSpell,
    handCoordinates,
    rawLandmarks,
    cameraError,
    startCamera,
    stopCamera,
    videoRef
  };
}
