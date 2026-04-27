import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useScheduler } from '../../context/SchedulerContext';

const ExampleLoader = () => {
  const { algoId, setProcesses, setTimeQuantum, processes, timeQuantum } = useScheduler();
  const [activeTab, setActiveTab] = useState('default'); // 'default' or 'custom'
  const [customExamples, setCustomExamples] = useState([]);
  const [defaultExample, setDefaultExample] = useState(null);
  const [saveName, setSaveName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [notification, setNotification] = useState('');

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  useEffect(() => {
    // Fetch default example for this algo
    axios.get(`http://localhost:5000/api/defaults/${algoId}`)
      .then(res => {
        setDefaultExample(res.data);
        // Auto-load default on first mount or algo change
        setProcesses(res.data.processes);
        if (res.data.timeQuantum) setTimeQuantum(res.data.timeQuantum);
      })
      .catch(err => console.error("Error fetching default:", err));

    fetchCustomExamples();
  }, [algoId]);

  const fetchCustomExamples = () => {
    axios.get(`http://localhost:5000/api/examples?algoId=${algoId}`)
      .then(res => setCustomExamples(res.data))
      .catch(err => console.error("Error fetching custom examples:", err));
  };

  const loadExample = (ex) => {
    setProcesses(ex.processes);
    if (ex.timeQuantum) setTimeQuantum(ex.timeQuantum);
    showNotification('Example loaded!');
  };

  const saveExample = () => {
    if (!saveName.trim()) return;
    axios.post('http://localhost:5000/api/examples', {
      name: saveName,
      algoId,
      processes,
      timeQuantum: algoId === 'rr' ? timeQuantum : null
    }).then(res => {
      setSaveName('');
      setShowSaveModal(false);
      fetchCustomExamples();
      showNotification('Example saved!');
      setActiveTab('custom');
    }).catch(err => console.error(err));
  };

  const deleteExample = (id) => {
    axios.delete(`http://localhost:5000/api/examples/${id}`)
      .then(() => {
        fetchCustomExamples();
        showNotification('Example deleted!');
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ marginTop: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button 
          onClick={() => setActiveTab('default')}
          style={{ background: 'none', border: 'none', color: activeTab === 'default' ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)', cursor: 'pointer', borderBottom: activeTab === 'default' ? '2px solid var(--color-accent-blue)' : 'none', paddingBottom: '0.5rem' }}
        >
          Default Example
        </button>
        <button 
          onClick={() => setActiveTab('custom')}
          style={{ background: 'none', border: 'none', color: activeTab === 'custom' ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)', cursor: 'pointer', borderBottom: activeTab === 'custom' ? '2px solid var(--color-accent-blue)' : 'none', paddingBottom: '0.5rem' }}
        >
          My Saved Examples
        </button>
      </div>

      {notification && <div style={{ marginBottom: '1rem', color: 'var(--color-accent-green)', fontSize: '0.9rem' }}>{notification}</div>}

      {activeTab === 'default' && defaultExample && (
        <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: '1rem', borderRadius: 'var(--border-radius)' }}>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{defaultExample.description}</p>
          <button onClick={() => loadExample(defaultExample)} style={{ background: 'var(--color-border)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>
            Load Default
          </button>
        </div>
      )}

      {activeTab === 'custom' && (
        <div>
          <button onClick={() => setShowSaveModal(true)} style={{ background: 'var(--color-accent-blue)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', marginBottom: '1rem', width: '100%' }}>
            💾 Save Current Input
          </button>
          
          {customExamples.length === 0 ? (
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>No saved examples for this algorithm.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {customExamples.map(ex => (
                <li key={ex._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--color-bg-primary)', padding: '0.8rem', borderRadius: '4px', marginBottom: '0.5rem' }}>
                  <span>{ex.name}</span>
                  <div>
                    <button onClick={() => loadExample(ex)} style={{ background: 'transparent', border: '1px solid var(--color-accent-blue)', color: 'var(--color-accent-blue)', padding: '0.2rem 0.5rem', borderRadius: '4px', marginRight: '0.5rem', cursor: 'pointer' }}>Load</button>
                    <button onClick={() => deleteExample(ex._id)} style={{ background: 'transparent', border: 'none', color: 'var(--color-accent-red)', cursor: 'pointer' }}>❌</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {showSaveModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'var(--color-bg-card)', padding: '2rem', borderRadius: 'var(--border-radius-lg)', width: '300px' }}>
            <h3>Save Example</h3>
            <input 
              type="text" 
              placeholder="Example Name" 
              value={saveName}
              onChange={e => setSaveName(e.target.value)}
              style={{ width: '100%', margin: '1rem 0', padding: '0.5rem', background: 'var(--color-bg-primary)', color: '#fff', border: '1px solid var(--color-border)', borderRadius: '4px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button onClick={() => setShowSaveModal(false)} style={{ background: 'transparent', color: '#fff', border: '1px solid var(--color-border)', padding: '0.4rem 0.8rem', borderRadius: '4px' }}>Cancel</button>
              <button onClick={saveExample} style={{ background: 'var(--color-accent-blue)', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px' }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExampleLoader;
