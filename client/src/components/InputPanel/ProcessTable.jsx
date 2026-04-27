import React from 'react';
import { useScheduler } from '../../context/SchedulerContext';

const ProcessTable = () => {
  const { processes, addProcess, removeProcess, updateProcess, generateRandomProcesses, algoId } = useScheduler();

  const showPriority = algoId.includes('priority');

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>Processes</h3>
        <div>
          <button onClick={generateRandomProcesses} style={{
            background: 'transparent', border: '1px solid var(--color-border)', 
            color: 'var(--color-text-primary)', padding: '0.4rem 0.8rem', 
            borderRadius: 'var(--border-radius)', marginRight: '0.5rem'
          }}>🎲 Random</button>
          <button onClick={addProcess} style={{
            background: 'var(--color-accent-blue)', border: 'none', 
            color: '#fff', padding: '0.4rem 0.8rem', 
            borderRadius: 'var(--border-radius)'
          }}>➕ Add</button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '0.5rem' }}>ID</th>
              <th style={{ padding: '0.5rem' }}>Arrival Time</th>
              <th style={{ padding: '0.5rem' }}>Burst Time</th>
              {showPriority && <th style={{ padding: '0.5rem' }}>Priority</th>}
              <th style={{ padding: '0.5rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {processes.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '0.5rem' }}>{p.id}</td>
                <td style={{ padding: '0.5rem' }}>
                  <input type="number" min="0" value={p.arrivalTime} 
                    onChange={e => updateProcess(p.id, 'arrivalTime', e.target.value)}
                    style={{ width: '60px', background: 'var(--color-bg-primary)', color: '#fff', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '0.2rem' }} />
                </td>
                <td style={{ padding: '0.5rem' }}>
                  <input type="number" min="1" value={p.burstTime} 
                    onChange={e => updateProcess(p.id, 'burstTime', e.target.value)}
                    style={{ width: '60px', background: 'var(--color-bg-primary)', color: '#fff', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '0.2rem' }} />
                </td>
                {showPriority && (
                  <td style={{ padding: '0.5rem' }}>
                    <input type="number" min="1" value={p.priority} 
                      onChange={e => updateProcess(p.id, 'priority', e.target.value)}
                      style={{ width: '60px', background: 'var(--color-bg-primary)', color: '#fff', border: '1px solid var(--color-border)', borderRadius: '4px', padding: '0.2rem' }} />
                  </td>
                )}
                <td style={{ padding: '0.5rem' }}>
                  <button onClick={() => removeProcess(p.id)} style={{
                    background: 'transparent', color: 'var(--color-accent-red)', border: 'none'
                  }}>❌</button>
                </td>
              </tr>
            ))}
            {processes.length === 0 && (
              <tr>
                <td colSpan={showPriority ? 5 : 4} style={{ textAlign: 'center', padding: '1rem', color: 'var(--color-text-secondary)' }}>
                  No processes added.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessTable;
