import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const algorithms = [
    { id: 'fcfs', name: 'FCFS', type: 'Non-Preemptive', desc: 'First Come First Served' },
    { id: 'sjf-np', name: 'SJF', type: 'Non-Preemptive', desc: 'Shortest Job First' },
    { id: 'sjf-p', name: 'SRTF', type: 'Preemptive', desc: 'Shortest Remaining Time First' },
    { id: 'priority-np', name: 'Priority', type: 'Non-Preemptive', desc: 'Priority Scheduling' },
    { id: 'priority-p', name: 'Priority', type: 'Preemptive', desc: 'Preemptive Priority Scheduling' },
    { id: 'rr', name: 'Round Robin', type: 'Preemptive', desc: 'Time Quantum based scheduling' }
  ];

  return (
    <div style={{ padding: '2rem', width: '100%' }}>
      <h1>OS CPU Scheduling Algorithms</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Interactive visualizer for CPU scheduling algorithms.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {algorithms.map(algo => (
          <Link key={algo.id} to={`/algorithm/${algo.id}`} style={{
            backgroundColor: 'var(--color-bg-card)',
            padding: '1.5rem',
            borderRadius: 'var(--border-radius-lg)',
            border: '1px solid var(--color-border)',
            display: 'block',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, color: 'var(--color-accent-blue)' }}>{algo.name}</h3>
              <span style={{ 
                fontSize: '0.75rem', 
                padding: '0.25rem 0.5rem', 
                backgroundColor: 'rgba(255,255,255,0.1)', 
                borderRadius: '4px' 
              }}>
                {algo.type}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>{algo.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
