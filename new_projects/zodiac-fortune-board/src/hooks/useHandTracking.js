import { useState, useEffect, useRef, useCallback } from 'react';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export function useHandTracking() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isPinching, setIsPinching] = useState(false);
  const [activeSpell, setActiveSpell] = useState(null); // 'PINCH' | 'POINTING' | 'OPEN_PALM' | 'FIST' | 'PEACE'
  const [handCoordinates, setHandCoordinates] = useState(null); // { x, y } in 0..1 range (mirrored)
  const [rawLandmarks, setRawLandmarks] = useState(null); // 21 landmarks for skeleton rendering
  const [cameraError, setCameraError] = useState(null);

  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);
  const requestRef = useRef(null);
  const isCameraActiveRef = useRef(false);
  const prevAngleRef = useRef(null);
  const lastTimeRef = useRef(-1);

  // Initialize MediaPipe HandLandmarker with robust fallbacks
  useEffect(() => {
    let isMounted = true;

    const initLandmarker = async () => {
      try {
        // Use version-matching wasm fileset
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm"
        );

        if (!isMounted) return;

        let landmarker;
        const modelAssetPath = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";

        try {
          // Attempt GPU delegate first
          landmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath,
              delegate: "GPU"
            },
            runningMode: "VIDEO",
            numHands: 2
          });
        } catch (gpuError) {
          console.warn("GPU delegate failed for HandLandmarker, falling back to CPU:", gpuError);
          landmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath,
              delegate: "CPU"
            },
            runningMode: "VIDEO",
            numHands: 2
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

  // Helper to calculate Euclidean distance between two 2D/3D points
  const dist = (p1, p2) => {
    return Math.sqrt(
      Math.pow(p1.x - p2.x, 2) + 
      Math.pow(p1.y - p2.y, 2) + 
      Math.pow((p1.z || 0) - (p2.z || 0), 2)
    );
  };

  // Gesture Classifier based on 21 hand landmarks
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

    // Distances from wrist to tips vs knuckles to determine extended fingers
    const isIndexExtended = dist(indexTip, wrist) > dist(indexPIP, wrist) * 1.15;
    const isMiddleExtended = dist(middleTip, wrist) > dist(middlePIP, wrist) * 1.15;
    const isRingExtended = dist(ringTip, wrist) > dist(ringPIP, wrist) * 1.15;
    const isPinkyExtended = dist(pinkyTip, wrist) > dist(pinkyPIP, wrist) * 1.15;
    const isThumbExtended = dist(thumbTip, wrist) > dist(thumbIP, wrist);

    // Pinch: index tip close to thumb tip
    const pinchDistance = dist(thumbTip, indexTip);
    const isPinchingNow = pinchDistance < 0.07;

    // Gesture 1: PINCH (Pinch of Fate)
    if (isPinchingNow) {
      return { spell: 'PINCH', isPinch: true };
    }

    // Gesture 2: PEACE / V-SIGN (Elemental Transmutation)
    // Index and middle extended; ring and pinky curled
    if (isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      return { spell: 'PEACE', isPinch: false };
    }

    // Gesture 3: POINTING / WAND (Celestial Focus)
    // Index extended; middle, ring, pinky curled
    if (isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      return { spell: 'POINTING', isPinch: false };
    }

    // Gesture 4: OPEN PALM (Celestial Supernova / Aspects)
    // All 5 fingers extended outward
    if (isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended && isThumbExtended) {
      return { spell: 'OPEN_PALM', isPinch: false };
    }

    // Gesture 5: FIST (Arcane Seal / Orb)
    // All fingers curled inwards
    if (!isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      return { spell: 'FIST', isPinch: false };
    }

    return { spell: 'CHANNELING', isPinch: false };
  };

  const frameLoopRef = useRef(null);

  // Continuous Frame Loop
  const frameLoop = useCallback(() => {
    if (!isCameraActiveRef.current) return;

    const video = videoRef.current;
    const landmarker = landmarkerRef.current;

    if (video && landmarker && video.readyState >= 2 && video.videoWidth > 0) {
      const currentTime = video.currentTime;
      if (currentTime !== lastTimeRef.current) {
        lastTimeRef.current = currentTime;

        try {
          const results = landmarker.detectForVideo(video, performance.now());

          if (results && results.landmarks && results.landmarks.length > 0) {
            // Use dominant/first hand
            const landmarks = results.landmarks[0];
            setRawLandmarks(landmarks);

            // Normalized screen coordinates (mirrored X for intuitive user experience)
            const primaryTip = landmarks[8]; // Index tip is the celestial wand
            const mirroredX = 1 - primaryTip.x;
            const mirroredY = primaryTip.y;
            setHandCoordinates({ x: mirroredX, y: mirroredY });

            // Astrolabe Rotation based on hand position angle relative to screen center
            const dx = mirroredX - 0.5;
            const dy = mirroredY - 0.5;
            const currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);

            if (prevAngleRef.current !== null) {
              let delta = currentAngle - prevAngleRef.current;
              // Wrap angle jump across 180/-180 boundary
              if (delta > 180) delta -= 360;
              if (delta < -180) delta += 360;

              // Only apply if movement is intentional
              if (Math.abs(delta) > 0.3 && Math.abs(delta) < 40) {
                setRotation(prev => prev + delta * 1.5);
              }
            }
            prevAngleRef.current = currentAngle;

            // Classify current spell gesture
            const { spell, isPinch } = classifyGesture(landmarks);
            setIsPinching(isPinch);
            setActiveSpell(spell);
          } else {
            // No hands detected in frame
            prevAngleRef.current = null;
            setIsPinching(false);
            setActiveSpell(null);
            setHandCoordinates(null);
            setRawLandmarks(null);
          }
        } catch {
          // Frame drop or non-monotonic time handled gracefully
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
      }
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isCameraActive]);

  const startCamera = async () => {
    setCameraError(null);
    if (!isReady) {
      setCameraError("Mystic vision models are still transmuting. Please wait a moment.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        await videoRef.current.play();
      }

      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access failed or denied:", err);
      setCameraError("Webcam access was denied or is unavailable. Use mouse / touch simulation mode!");
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
    setIsPinching(false);
    setActiveSpell(null);
    setHandCoordinates(null);
    setRawLandmarks(null);
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
