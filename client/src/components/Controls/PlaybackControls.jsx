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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Playback Controls</h4>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
          Step: {totalSteps > 0 ? `${currentStep + 1}/${totalSteps}` : '0/0'}
        </span>
      </div>

      {totalSteps === 0 ? (
        <button
          onClick={runSimulation}
          style={{ width: '100%', padding: '0.6rem', background: 'var(--color-accent-blue)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Compute Visualizer
        </button>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button onClick={reset} style={btnStyle}>|&lt;</button>
            <button onClick={stepBack} disabled={currentStep === 0} style={{...btnStyle, opacity: currentStep === 0 ? 0.5 : 1}}>&lt;</button>
            
            {isPlaying ? (
              <button onClick={pause} style={playBtnStyle}>||</button>
            ) : (
              <button onClick={play} disabled={currentStep >= totalSteps - 1} style={{...playBtnStyle, opacity: currentStep >= totalSteps - 1 ? 0.5 : 1}}>&gt;</button>
            )}
            
            <button onClick={stepForward} disabled={currentStep >= totalSteps - 1} style={{...btnStyle, opacity: currentStep >= totalSteps - 1 ? 0.5 : 1}}>&gt;</button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={cycleSpeed}
              style={{ background: 'var(--color-bg-sidebar)', color: 'var(--color-accent-yellow)', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '0 0.5rem', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', height: '32px' }}
            >
              {speedMultiplier.toFixed(1)}x
            </button>
            <button 
              onClick={runSimulation} 
              style={{ background: 'transparent', color: 'var(--color-text-secondary)', border: '1px dashed var(--color-border)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', padding: '0 0.5rem', height: '32px' }}
            >
              Recompute
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const btnStyle = {
  background: 'var(--color-bg-card)',
  color: '#fff',
  border: '1px solid var(--color-border)',
  width: '32px',
  height: '32px',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.82rem',
  fontWeight: '700'
};

const playBtnStyle = {
  ...btnStyle,
  background: 'var(--color-accent-blue)',
  border: 'none',
  width: '38px',
};

export default PlaybackControls;
