import { useState, useEffect, useRef } from 'react';

export const useAnimator = (snapshots = [], speedMs = 500) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);

  // Auto pause when we reach the end
  useEffect(() => {
    if (currentStep >= snapshots.length - 1 && snapshots.length > 0) {
      setIsPlaying(false);
    }
  }, [currentStep, snapshots.length]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Playback engine
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < snapshots.length - 1) return prev + 1;
          clearInterval(timerRef.current);
          return prev;
        });
      }, speedMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speedMs, snapshots.length]);

  const play = () => {
    if (snapshots.length === 0) return;
    if (currentStep >= snapshots.length - 1) setCurrentStep(0); // restart if at end
    setIsPlaying(true);
  };

  const pause = () => setIsPlaying(false);
  
  const stepForward = () => {
    pause();
    setCurrentStep(prev => Math.min(prev + 1, snapshots.length - 1));
  };
  
  const stepBack = () => {
    pause();
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  
  const reset = () => {
    pause();
    setCurrentStep(0);
  };

  return {
    currentStep,
    currentSnapshot: snapshots[currentStep] || null,
    isPlaying,
    play,
    pause,
    stepForward,
    stepBack,
    reset,
    totalSteps: snapshots.length
  };
};
