import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SchedulerProvider, useScheduler } from '../context/SchedulerContext';
import InputPanel from '../components/InputPanel/InputPanel';
import VisualizerContainer from '../components/Visualizer/VisualizerContainer';
import TutorialPanel from '../components/Tutorial/TutorialPanel';
import CodePanel from '../components/Tutorial/CodePanel';

const AlgorithmPageContent = () => {
  const { id } = useParams();
  const { setAlgoId } = useScheduler();
  const [activeMainTab, setActiveMainTab] = useState('visualizer');

  useEffect(() => {
    setAlgoId(id);
  }, [id, setAlgoId]);

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
      {/* Sidebar Placeholder */}
      <div style={{ 
        width: 'var(--sidebar-width)', 
        backgroundColor: 'var(--color-bg-sidebar)',
        borderRight: '1px solid var(--color-border)',
        padding: '1.5rem'
      }}>
        <Link to="/" style={{ color: 'var(--color-text-primary)', marginBottom: '2rem', display: 'block' }}>
          &larr; Back to Home
        </Link>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Algorithms</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {['fcfs', 'sjf-np', 'sjf-p', 'priority-np', 'priority-p', 'rr'].map(algo => (
            <li key={algo} style={{ marginBottom: '0.5rem' }}>
              <Link to={`/algorithm/${algo}`} style={{ 
                color: id === algo ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
                fontWeight: id === algo ? '600' : '400'
              }}>
                {algo.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem', overflow: 'hidden' }}>
        <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0 }}>Algorithm Visualizer: {id.toUpperCase()}</h1>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => setActiveMainTab('visualizer')}
              style={{
                background: activeMainTab === 'visualizer' ? 'var(--color-accent-blue)' : 'transparent',
                color: activeMainTab === 'visualizer' ? '#fff' : 'var(--color-text-secondary)',
                border: activeMainTab === 'visualizer' ? 'none' : '1px solid var(--color-border)',
                padding: '0.5rem 1rem', borderRadius: 'var(--border-radius)', cursor: 'pointer', fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
            >
              Visualizer
            </button>
            <button 
              onClick={() => setActiveMainTab('description')}
              style={{
                background: activeMainTab === 'description' ? 'var(--color-accent-blue)' : 'transparent',
                color: activeMainTab === 'description' ? '#fff' : 'var(--color-text-secondary)',
                border: activeMainTab === 'description' ? 'none' : '1px solid var(--color-border)',
                padding: '0.5rem 1rem', borderRadius: 'var(--border-radius)', cursor: 'pointer', fontWeight: 'bold',
                transition: 'all 0.2s'
              }}
            >
              Description & Code
            </button>
          </div>
        </header>

        {activeMainTab === 'visualizer' ? (
          <div style={{ display: 'flex', flex: 1, overflowY: 'auto' }}>
            <VisualizerContainer />
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1.5rem', flex: 1, overflowY: 'auto', alignItems: 'flex-start' }}>
            {/* Tutorial & Code Section */}
            <div style={{ flex: 1 }}>
              <TutorialPanel />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <CodePanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AlgorithmPage = () => {
  return (
    <SchedulerProvider>
      <AlgorithmPageContent />
    </SchedulerProvider>
  );
};

export default AlgorithmPage;
