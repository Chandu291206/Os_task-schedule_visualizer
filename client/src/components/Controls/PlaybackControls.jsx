import React from 'react';

const PlaybackControls = ({
  isPlaying, play, pause, stepForward, stepBack, reset,
  currentStep, totalSteps, speedMultiplier, setSpeedMultiplier, runSimulation
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0.75rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Playback Controls</h4>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
          Step: {totalSteps > 0 ? `${currentStep + 1} / ${totalSteps}` : '0 / 0'}
        </span>
      </div>

      {totalSteps === 0 ? (
        <button
          onClick={runSimulation}
          style={{ width: '100%', padding: '0.6rem', background: 'var(--color-accent-blue)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
        >
          Compute & Load Visualizer
        </button>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem' }}>
            <button onClick={reset} style={btnStyle}>|&lt;</button>
            <button onClick={stepBack} disabled={currentStep === 0} style={{ ...btnStyle, opacity: currentStep === 0 ? 0.5 : 1 }}>&lt;&lt;</button>

            {isPlaying ? (
              <button onClick={pause} style={playBtnStyle}>||</button>
            ) : (
              <button onClick={play} disabled={currentStep >= totalSteps - 1} style={{ ...playBtnStyle, opacity: currentStep >= totalSteps - 1 ? 0.5 : 1 }}>&gt;</button>
            )}

            <button onClick={stepForward} disabled={currentStep >= totalSteps - 1} style={{ ...btnStyle, opacity: currentStep >= totalSteps - 1 ? 0.5 : 1 }}>&gt;&gt;</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Speed</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-primary)', fontWeight: '600' }}>
                {speedMultiplier.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speedMultiplier}
              onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-text-secondary)' }}>
              <span>0.5x</span>
              <span>2.0x</span>
            </div>
          </div>

          <button onClick={runSimulation} style={{ marginTop: '0.25rem', background: 'transparent', color: 'var(--color-text-secondary)', border: '1px dashed var(--color-border)', padding: '0.45rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.82rem' }}>
            Recompute Simulation
          </button>
        </>
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
  borderRadius: '16px',
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
  height: '32px',
  fontSize: '0.9rem'
};

export default PlaybackControls;
