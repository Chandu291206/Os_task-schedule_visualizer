import React from 'react';
import { useScheduler } from '../../context/SchedulerContext';

const AlgoConfig = () => {
  const { algoId, timeQuantum, setTimeQuantum } = useScheduler();

  const isRR = algoId === 'rr';

  const getAlgoName = (id) => {
    switch (id) {
      case 'fcfs': return { name: 'FCFS', type: 'Non-Preemptive' };
      case 'sjf-np': return { name: 'SJF', type: 'Non-Preemptive' };
      case 'sjf-p': return { name: 'SRTF', type: 'Preemptive' };
      case 'priority-np': return { name: 'Priority', type: 'Non-Preemptive' };
      case 'priority-p': return { name: 'Priority', type: 'Preemptive' };
      case 'rr': return { name: 'Round Robin', type: 'Preemptive' };
      default: return { name: 'Unknown', type: '' };
    }
  };

  const algoInfo = getAlgoName(algoId);

  return (
    <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--color-accent-blue)' }}>{algoInfo.name}</h4>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
            {algoInfo.type}
          </span>
        </div>

        {isRR && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>Time Quantum:</label>
            <input 
              type="number" 
              min="1" 
              value={timeQuantum} 
              onChange={e => setTimeQuantum(Number(e.target.value))}
              style={{ width: '60px', background: 'var(--color-bg-card)', color: '#fff', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '0.3rem' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgoConfig;
