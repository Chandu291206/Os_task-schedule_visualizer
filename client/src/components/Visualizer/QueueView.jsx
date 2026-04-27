import React from 'react';

const QueueView = ({ snapshot }) => {
  if (!snapshot) return null;

  const { cpuProcess, readyQueue, processes } = snapshot;

  const getProcessData = (id) => processes.find(p => p.id === id);
  const activeProcess = cpuProcess ? getProcessData(cpuProcess) : null;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>CPU & Ready Queue</h3>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        
        {/* CPU Box */}
        <div style={{ 
          width: '120px', height: '120px', 
          border: `2px dashed ${activeProcess ? 'var(--color-accent-green)' : 'var(--color-border)'}`,
          borderRadius: '50%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'var(--color-bg-primary)',
          position: 'relative',
          boxShadow: activeProcess ? '0 0 15px rgba(63, 185, 80, 0.3)' : 'none'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', position: 'absolute', top: '15px' }}>CPU</span>
          {activeProcess ? (
            <>
              <strong style={{ fontSize: '1.5rem', color: 'var(--color-accent-green)' }}>{activeProcess.id}</strong>
              <span style={{ fontSize: '0.8rem' }}>Rem: {activeProcess.remainingBT}</span>
            </>
          ) : (
            <span style={{ color: 'var(--color-text-secondary)' }}>IDLE</span>
          )}
        </div>

        {/* Queue connection line */}
        <div style={{ height: '2px', width: '50px', backgroundColor: 'var(--color-border)', position: 'relative' }}>
          <div style={{ position: 'absolute', right: 0, top: '-4px', borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '5px solid var(--color-border)' }}></div>
        </div>

        {/* Ready Queue */}
        <div style={{ 
          flex: 1, 
          height: '100px', 
          backgroundColor: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '1rem',
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          alignItems: 'center'
        }}>
          {readyQueue.length === 0 && <span style={{ color: 'var(--color-text-secondary)', margin: 'auto' }}>Queue Empty</span>}
          
          {readyQueue.map(pid => {
            const p = getProcessData(pid);
            return (
              <div key={pid} style={{ 
                minWidth: '60px', height: '60px', 
                backgroundColor: 'var(--color-bg-card)', 
                border: '1px solid var(--color-accent-yellow)',
                borderRadius: '6px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <strong>{pid}</strong>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Rem: {p.remainingBT}</span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default QueueView;
