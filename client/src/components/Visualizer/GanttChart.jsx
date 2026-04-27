import React from 'react';

const processColors = [
  '#58a6ff', '#3fb950', '#e3b341', '#f85149', '#bc8cff', 
  '#d2a8ff', '#ff7b72', '#a5d6ff', '#7ee787', '#f2cc60'
];

const getColorForProcess = (pid) => {
  if (!pid || pid === 'IDLE') return '#30363d';
  const num = parseInt(pid.replace(/\D/g, '')) || 1;
  return processColors[(num - 1) % processColors.length];
};

const GanttChart = ({ snapshots, currentStep }) => {
  if (!snapshots || snapshots.length === 0) {
    return <div style={{ color: 'var(--color-text-secondary)' }}>No simulation data</div>;
  }

  // Build the complete gantt history up to currentStep
  const history = snapshots.slice(0, currentStep + 1);
  const ganttBlocks = [];
  
  let currentBlock = null;

  for (let i = 1; i < history.length; i++) { // start at 1 because 0 is initial state with no block
    const snap = history[i];
    if (snap.ganttBlock) {
      if (!currentBlock) {
        currentBlock = { ...snap.ganttBlock };
      } else if (currentBlock.pid === snap.ganttBlock.pid) {
        currentBlock.end = snap.ganttBlock.end;
      } else {
        ganttBlocks.push(currentBlock);
        currentBlock = { ...snap.ganttBlock };
      }
    }
  }
  if (currentBlock) ganttBlocks.push(currentBlock);

  const maxTime = Math.max(10, history[history.length - 1]?.time || 10);

  return (
    <div style={{ width: '100%', overflowX: 'auto', padding: '1rem 0 2.5rem 0', flexShrink: 0 }}>
      <h3 style={{ marginBottom: '1rem' }}>Gantt Chart</h3>
      
      <div style={{ 
        position: 'relative', 
        height: '80px', 
        backgroundColor: 'var(--color-bg-primary)', 
        borderRadius: '8px',
        border: '1px solid var(--color-border)',
        display: 'flex'
      }}>
        {ganttBlocks.map((block, i) => {
          const widthPercent = ((block.end - block.start) / maxTime) * 100;
          const isIdle = block.pid === 'IDLE';
          return (
            <div 
              key={`${block.pid}-${i}`}
              style={{
                width: `${widthPercent}%`,
                backgroundColor: getColorForProcess(block.pid),
                borderRight: '1px solid var(--color-bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isIdle ? '#8b949e' : '#fff',
                fontWeight: 'bold',
                position: 'relative',
                transition: 'width 0.3s ease',
                backgroundImage: isIdle ? 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)' : 'none'
              }}
            >
              {widthPercent > 5 && block.pid}
              
              {/* Time markers */}
              {i === 0 && (
                <span style={{ position: 'absolute', bottom: '-25px', left: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                  {block.start}
                </span>
              )}
              <span style={{ position: 'absolute', bottom: '-25px', right: 0, fontSize: '0.8rem', color: 'var(--color-text-secondary)', transform: 'translateX(50%)' }}>
                {block.end}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GanttChart;
