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
  };

  return (
    <div style={{ display: 'flex', gap: '1.5rem', height: '100%', width: '100%', overflow: 'hidden' }}>
      
      {/* LEFT PANE - Visualizer */}
      <div style={{ 
        flex: 3, 
        backgroundColor: 'var(--color-bg-card)', 
        borderRadius: 'var(--border-radius-lg)',
        border: '1px solid var(--color-border)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto' 
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
            <p>Configure processes and click "Compute" to see the visualization.</p>
          </div>
        )}
      </div>

      {/* RIGHT PANE - Controls + Input */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem',
        overflow: 'hidden'
      }}>
        <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-border)' }}>
          <PlaybackControls 
            isPlaying={isPlaying}
            play={play}
            pause={pause}
            stepForward={stepForward}
            stepBack={stepBack}
            reset={reset}
            currentStep={currentStep}
            totalSteps={totalSteps}
            speedMultiplier={speedMultiplier}
            setSpeedMultiplier={setSpeedMultiplier}
            runSimulation={runSimulation}
          />
        </div>
        
        <div style={{ 
           flex: 1, 
           backgroundColor: 'var(--color-bg-card)', 
           borderRadius: 'var(--border-radius-lg)',
           border: '1px solid var(--color-border)',
           padding: '1.5rem',
           overflowY: 'auto'
         }}>
           <InputPanel />
         </div>
      </div>
    </div>
  );
};

export default VisualizerContainer;
