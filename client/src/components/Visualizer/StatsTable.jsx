import React from 'react';

const StatsTable = ({ snapshot }) => {
  if (!snapshot) return null;

  const { processes } = snapshot;

  let totalTAT = 0;
  let totalWT = 0;
  let completedCount = 0;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Process Statistics</h3>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', backgroundColor: 'var(--color-bg-primary)', borderRadius: '8px', overflow: 'hidden' }}>
        <thead style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
          <tr>
            <th style={{ padding: '0.8rem' }}>Process</th>
            <th style={{ padding: '0.8rem' }}>AT</th>
            <th style={{ padding: '0.8rem' }}>BT</th>
            <th style={{ padding: '0.8rem' }}>CT</th>
            <th style={{ padding: '0.8rem' }}>TAT</th>
            <th style={{ padding: '0.8rem' }}>WT</th>
          </tr>
        </thead>
        <tbody>
          {processes.map(p => {
            const isCompleted = p.state === 'terminated';
            if (isCompleted) {
              totalTAT += p.tat;
              totalWT += p.wt;
              completedCount++;
            }

            return (
              <tr key={p.id} style={{ 
                borderBottom: '1px solid var(--color-border)',
                backgroundColor: isCompleted ? 'rgba(63, 185, 80, 0.1)' : 'transparent',
                transition: 'background-color 0.3s ease'
              }}>
                <td style={{ padding: '0.8rem', fontWeight: 'bold' }}>{p.id}</td>
                <td style={{ padding: '0.8rem' }}>{p.at}</td>
                <td style={{ padding: '0.8rem' }}>{p.bt}</td>
                <td style={{ padding: '0.8rem' }}>{isCompleted ? p.ct : '—'}</td>
                <td style={{ padding: '0.8rem', color: isCompleted ? 'var(--color-accent-blue)' : 'inherit' }}>{isCompleted ? p.tat : '—'}</td>
                <td style={{ padding: '0.8rem', color: isCompleted ? 'var(--color-accent-yellow)' : 'inherit' }}>{isCompleted ? p.wt : '—'}</td>
              </tr>
            );
          })}
        </tbody>
        {completedCount > 0 && (
          <tfoot style={{ backgroundColor: 'rgba(255,255,255,0.02)', fontWeight: 'bold' }}>
            <tr>
              <td colSpan="4" style={{ padding: '0.8rem', textAlign: 'right' }}>Averages:</td>
              <td style={{ padding: '0.8rem', color: 'var(--color-accent-blue)' }}>{(totalTAT / completedCount).toFixed(2)}</td>
              <td style={{ padding: '0.8rem', color: 'var(--color-accent-yellow)' }}>{(totalWT / completedCount).toFixed(2)}</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default StatsTable;
