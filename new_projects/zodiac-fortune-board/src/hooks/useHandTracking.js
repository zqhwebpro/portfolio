import { useState, useEffect, useRef, useCallback } from 'react';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export function useHandTracking() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isPinching, setIsPinching] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  const videoRef = useRef(null);
  const handLandmarkerRef = useRef(null);
  const streamRef = useRef(null);
  const requestRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);
  const prevAngleRef = useRef(null);

  useEffect(() => {
    let active = true;
    const initModel = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1
        });
        if (active) {
          handLandmarkerRef.current = landmarker;
          setIsReady(true);
        }
      } catch (err) {
        console.error("Error loading MediaPipe HandLandmarker:", err);
      }
    };
    initModel();
    
    return () => {
      active = false;
      if (handLandmarkerRef.current) {
        handLandmarkerRef.current.close();
      }
    };
  }, []);

  const processVideoFrame = useCallback(() => {
    if (!videoRef.current || !handLandmarkerRef.current || !isCameraActive) return;

    const video = videoRef.current;
    
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      requestRef.current = requestAnimationFrame(processVideoFrame);
      return;
    }

    if (video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;
      
      const results = handLandmarkerRef.current.detectForVideo(video, performance.now());
      
      if (results.landmarks && results.landmarks.length > 0) {
        const landmarks = results.landmarks[0];
        
        const indexTip = landmarks[8];
        const dx = indexTip.x - 0.5;
        const dy = indexTip.y - 0.5;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        if (prevAngleRef.current !== null) {
          let delta = angle - prevAngleRef.current;
          if (delta > 180) delta -= 360;
          if (delta < -180) delta += 360;
          
          setRotation(prev => prev + delta * 2.0); // Adjust sensitivity here
        }
        prevAngleRef.current = angle;
        
        const thumbTip = landmarks[4];
        const dist = Math.sqrt(Math.pow(thumbTip.x - indexTip.x, 2) + Math.pow(thumbTip.y - indexTip.y, 2));
        
        if (dist < 0.05) {
          setIsPinching(true);
        } else {
          setIsPinching(false);
        }
      } else {
        prevAngleRef.current = null;
        setIsPinching(false);
      }
    }
    
    requestRef.current = requestAnimationFrame(processVideoFrame);
  }, [isCameraActive]);

  const startCamera = async () => {
    if (!isReady) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
      requestRef.current = requestAnimationFrame(processVideoFrame);
    } catch (err) {
      console.error("Camera access denied or failed:", err);
      alert("Could not access camera. Please allow camera permissions to use gestures.");
    }
  };

  const stopCamera = () => {
    setIsCameraActive(false);
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
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
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return {
    isCameraActive,
    isReady,
    rotation,
    isPinching,
    startCamera,
    stopCamera,
    videoRef
  };
}
