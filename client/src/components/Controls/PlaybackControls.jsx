import React from 'react';

const PlaybackControls = ({
  isPlaying, play, pause, stepForward, stepBack, reset,
  currentStep, totalSteps, speedMultiplier, setSpeedMultiplier, runSimulation
}) => {
  const speeds = [0.5, 1.0, 1.5, 2.0];
  const cycleSpeed = () => {
    const nextIdx = (speeds.indexOf(speedMultiplier) + 1) % speeds.length;
    setSpeedMultiplier(speeds[nextIdx]);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '0.5rem 1.5rem' }}>
      {totalSteps === 0 ? (
        <button
          onClick={runSimulation}
          style={{ padding: '0.6rem 2rem', background: 'var(--color-accent-blue)', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Compute Visualizer
        </button>
      ) : (
        <>
          {/* Step Indicator */}
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', minWidth: '80px', textAlign: 'center', fontWeight: 'bold' }}>
            {currentStep + 1} / {totalSteps}
          </div>

          {/* Media Controls */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button onClick={reset} style={btnStyle}>|&lt;</button>
            <button onClick={stepBack} disabled={currentStep === 0} style={{...btnStyle, opacity: currentStep === 0 ? 0.5 : 1}}>&lt;</button>
            
            {isPlaying ? (
              <button onClick={pause} style={playBtnStyle}>||</button>
            ) : (
              <button onClick={play} disabled={currentStep >= totalSteps - 1} style={{...playBtnStyle, opacity: currentStep >= totalSteps - 1 ? 0.5 : 1}}>&gt;</button>
            )}
            
            <button onClick={stepForward} disabled={currentStep >= totalSteps - 1} style={{...btnStyle, opacity: currentStep >= totalSteps - 1 ? 0.5 : 1}}>&gt;</button>
          </div>

          {/* Speed & Recompute */}
          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', borderLeft: '1px solid var(--color-border)', paddingLeft: '1.5rem' }}>
            <button 
              onClick={cycleSpeed}
              style={{ background: 'transparent', color: 'var(--color-accent-yellow)', border: 'none', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {speedMultiplier.toFixed(1)}x
            </button>
            <button 
              onClick={runSimulation} 
              style={{ background: 'transparent', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)', borderRadius: '15px', cursor: 'pointer', fontSize: '0.8rem', padding: '0.4rem 1rem', fontWeight: 'bold' }}
            >
              Recompute
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const btnStyle = {
  background: 'transparent',
  color: 'var(--color-text-primary)',
  border: 'none',
  width: '32px',
  height: '32px',
  borderRadius: '16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  transition: 'background 0.2s'
};

const playBtnStyle = {
  ...btnStyle,
  background: 'var(--color-accent-blue)',
  color: '#fff',
  width: '40px',
  height: '40px',
  borderRadius: '20px',
  fontSize: '1rem'
};

export default PlaybackControls;
