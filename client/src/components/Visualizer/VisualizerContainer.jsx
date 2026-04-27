import React, { useState, useEffect } from 'react';
import { useScheduler } from '../../context/SchedulerContext';
import { useAnimator } from '../../hooks/useAnimator';
import { runAlgorithm } from '../../algorithms';
import GanttChart from './GanttChart';
import QueueView from './QueueView';
import StatsTable from './StatsTable';
import PlaybackControls from '../Controls/PlaybackControls';
import InputPanel from '../InputPanel/InputPanel';

const VisualizerContainer = () => {
  const { processes, algoId, timeQuantum } = useScheduler();
  const [snapshots, setSnapshots] = useState([]);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [isInputOpen, setIsInputOpen] = useState(false);
  
  const speedMs = 500 / speedMultiplier;
  
  const {
    currentStep, currentSnapshot, isPlaying, 
    play, pause, stepForward, stepBack, reset, totalSteps
  } = useAnimator(snapshots, speedMs);

  const runSimulation = () => {
    if (!processes || processes.length === 0) {
      alert("Please add at least one process");
      return;
    }
    if (processes.some(p => p.burstTime <= 0)) {
      alert("Burst times must be greater than 0");
      return;
    }
    const resultSnapshots = runAlgorithm(algoId, processes, timeQuantum);
    setSnapshots(resultSnapshots);
    reset();
    setIsInputOpen(false); // auto close drawer on compute
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-border)' }}>
      
      {/* MAIN PANE - Visualizer (Scrollable) */}
      <div style={{ 
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        padding: '1.5rem',
        paddingBottom: '100px' // Space for floating controls
      }}>
        {snapshots.length > 0 ? (
          <>
            <GanttChart snapshots={snapshots} currentStep={currentStep} />
            <QueueView snapshot={currentSnapshot} />
            <StatsTable snapshot={currentSnapshot} />
          </>
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', flexDirection: 'column', gap: '1rem' }}>
            <span style={{ fontSize: '3rem' }}>📊</span>
            <p>Configure processes and click "Compute Visualizer" below.</p>
          </div>
        )}
      </div>

      {/* Floating Playback Controls (Bottom Center) */}
      <div style={{
         position: 'absolute',
         bottom: '20px',
         left: '50%',
         transform: 'translateX(-50%)',
         zIndex: 10,
         backgroundColor: 'rgba(30, 30, 30, 0.85)',
         backdropFilter: 'blur(10px)',
         borderRadius: '30px',
         boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
         border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <PlaybackControls 
          isPlaying={isPlaying} play={play} pause={pause}
          stepForward={stepForward} stepBack={stepBack} reset={reset}
          currentStep={currentStep} totalSteps={totalSteps}
          speedMultiplier={speedMultiplier} setSpeedMultiplier={setSpeedMultiplier}
          runSimulation={runSimulation}
        />
      </div>

      {/* Floating Toggle Button for Drawer */}
      <button 
        onClick={() => setIsInputOpen(true)}
        style={{
           position: 'absolute',
           top: '20px',
           right: isInputOpen ? '-100%' : '20px',
           transition: 'right 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
           zIndex: 10,
           padding: '0.6rem 1.2rem',
           backgroundColor: 'var(--color-bg-primary)',
           color: 'var(--color-text-primary)',
           border: '1px solid var(--color-border)',
           borderRadius: '20px',
           cursor: 'pointer',
           fontWeight: 'bold',
           boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}
      >
        ⚙️ Configure Input
      </button>

      {/* Sliding Input Panel Drawer */}
      <div style={{
         position: 'absolute',
         top: 0,
         right: 0,
         height: '100%',
         width: '450px',
         maxWidth: '100%',
         backgroundColor: 'var(--color-bg-card)',
         borderLeft: '1px solid var(--color-border)',
         boxShadow: '-10px 0 30px rgba(0,0,0,0.4)',
         transform: isInputOpen ? 'translateX(0)' : 'translateX(100%)',
         transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
         zIndex: 20,
         display: 'flex',
         flexDirection: 'column'
      }}>
         <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-bg-primary)' }}>
            <h3 style={{ margin: 0 }}>Input Configuration</h3>
            <button 
              onClick={() => setIsInputOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--color-text-secondary)', fontSize: '1.2rem', cursor: 'pointer' }}
            >
              ✕
            </button>
         </div>
         <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            <InputPanel />
         </div>
      </div>
      
      {/* Drawer Overlay (dim background when open) */}
      {isInputOpen && (
        <div 
          onClick={() => setIsInputOpen(false)}
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 15, cursor: 'pointer'
          }}
        />
      )}

    </div>
  );
};

export default VisualizerContainer;
