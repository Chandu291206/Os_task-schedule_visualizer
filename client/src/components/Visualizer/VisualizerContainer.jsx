import React, { useState, useEffect } from 'react';
import { useScheduler } from '../../context/SchedulerContext';
import { useAnimator } from '../../hooks/useAnimator';
import { runAlgorithm } from '../../algorithms';
import GanttChart from './GanttChart';
import QueueView from './QueueView';
import StatsTable from './StatsTable';
import PlaybackControls from '../Controls/PlaybackControls';

const VisualizerContainer = () => {
  const { processes, algoId, timeQuantum } = useScheduler();
  const [snapshots, setSnapshots] = useState([]);
  const [speed, setSpeed] = useState(500); // ms per step
  
  const {
    currentStep, currentSnapshot, isPlaying, 
    play, pause, stepForward, stepBack, reset, totalSteps
  } = useAnimator(snapshots, speed);

  const runSimulation = () => {
    // Basic validation
    if (!processes || processes.length === 0) {
      alert("Please add at least one process");
      return;
    }
    
    // Check if burst times are > 0
    if (processes.some(p => p.burstTime <= 0)) {
      alert("Burst times must be greater than 0");
      return;
    }

    const resultSnapshots = runAlgorithm(algoId, processes, timeQuantum);
    setSnapshots(resultSnapshots);
    reset(); // Reset animation to step 0
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1.5rem' }}>
      
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '0.5rem' }}>
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

      <div>
        <PlaybackControls 
          isPlaying={isPlaying}
          play={play}
          pause={pause}
          stepForward={stepForward}
          stepBack={stepBack}
          reset={reset}
          currentStep={currentStep}
          totalSteps={totalSteps}
          speed={speed}
          setSpeed={setSpeed}
          runSimulation={runSimulation}
        />
      </div>

    </div>
  );
};

export default VisualizerContainer;
