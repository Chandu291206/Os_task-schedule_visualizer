import React, { useState } from 'react';
import { useScheduler } from '../../context/SchedulerContext';

const tutorials = {
  'fcfs': {
    title: 'First Come First Served (FCFS)',
    concept: 'Processes are dispatched according to their arrival time on the ready queue. Being a non-preemptive algorithm, once the CPU is allocated to a process, it keeps the CPU until it releases it by terminating or by requesting I/O.',
    whenToUse: 'Useful for background systems where turnaround time is not a primary concern.',
    tradeoffs: 'Can suffer from the "Convoy Effect", where short processes get stuck waiting behind long processes, leading to high average waiting times.',
    complexity: 'Time: O(N log N) to sort by arrival time. Space: O(1) auxiliary.'
  },
  'sjf-np': {
    title: 'Shortest Job First (Non-Preemptive)',
    concept: 'When the CPU is available, it is assigned to the process that has the smallest next CPU burst. If the next CPU bursts of two processes are the same, FCFS scheduling is used to break the tie.',
    whenToUse: 'Optimal for minimizing average waiting time when burst times are known in advance.',
    tradeoffs: 'Can cause starvation for long processes if short processes keep arriving. It also requires knowing the burst time before execution, which is difficult in practice.',
    complexity: 'Time: O(N^2) or O(N log N) using a priority queue. Space: O(N) for the ready queue.'
  },
  'sjf-p': {
    title: 'Shortest Remaining Time First (SRTF)',
    concept: 'This is the preemptive version of SJF. If a new process arrives with a shorter burst time than what is left of the currently executing process, the current process is preempted and the new process is dispatched.',
    whenToUse: 'When a system needs to be highly responsive to short jobs.',
    tradeoffs: 'High overhead due to frequent context switching. Like SJF, it can cause starvation for longer jobs.',
    complexity: 'Time: O(N log N) per step with a priority queue. Space: O(N) for the ready queue.'
  },
  'priority-np': {
    title: 'Priority Scheduling (Non-Preemptive)',
    concept: 'A priority is associated with each process, and the CPU is allocated to the process with the highest priority. Equal-priority processes are scheduled in FCFS order.',
    whenToUse: 'When some tasks are strictly more important than others (e.g., system vs user processes).',
    tradeoffs: 'Can lead to indefinite blocking (starvation) of low-priority processes. A solution is "aging", where a process priority gradually increases over time.',
    complexity: 'Time: O(N log N) to sort by priority. Space: O(N).'
  },
  'priority-p': {
    title: 'Preemptive Priority Scheduling',
    concept: 'If a newly arrived process has a higher priority than the currently running process, the CPU is preempted and given to the new process.',
    whenToUse: 'Real-time operating systems where critical tasks must be executed immediately upon arrival.',
    tradeoffs: 'High context-switching overhead and potential starvation of low-priority tasks.',
    complexity: 'Time: O(N log N) per step with a priority queue. Space: O(N).'
  },
  'rr': {
    title: 'Round Robin',
    concept: 'Designed especially for time-sharing systems. A small unit of time, called a time quantum or time slice, is defined. The ready queue is treated as a circular queue. The CPU goes around the ready queue, allocating the CPU to each process for a time interval of up to 1 time quantum.',
    whenToUse: 'Interactive or time-sharing systems where responsiveness is critical.',
    tradeoffs: 'Performance depends heavily on the size of the time quantum. If it is too large, RR becomes FCFS. If it is too small, context-switching overhead dominates.',
    complexity: 'Time: O(N) per step. Space: O(N) for the circular queue.'
  }
};

const TutorialPanel = () => {
  const { algoId } = useScheduler();
  const [activeTab, setActiveTab] = useState('concept');
  
  const content = tutorials[algoId];
  if (!content) return null;

  return (
    <div style={{ backgroundColor: 'var(--color-bg-card)', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-border)', padding: '1.5rem' }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--color-accent-blue)' }}>{content.title}</h3>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
        {['concept', 'tradeoffs', 'formulas', 'complexity'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              background: 'none', border: 'none', 
              color: activeTab === tab ? '#fff' : 'var(--color-text-secondary)', 
              paddingBottom: '0.5rem', cursor: 'pointer',
              borderBottom: activeTab === tab ? '2px solid var(--color-accent-blue)' : '2px solid transparent',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ color: 'var(--color-text-primary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
        {activeTab === 'concept' && (
          <div>
            <p style={{ marginBottom: '1rem' }}><strong>How it works:</strong> {content.concept}</p>
            <p><strong>When to use:</strong> {content.whenToUse}</p>
          </div>
        )}
        
        {activeTab === 'tradeoffs' && (
          <p>{content.tradeoffs}</p>
        )}

        {activeTab === 'formulas' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: '4px', borderLeft: '3px solid var(--color-accent-blue)' }}>
              <strong>Turnaround Time (TAT)</strong> = Completion Time (CT) − Arrival Time (AT)
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.3rem' }}>Total time taken by the process from arrival to completion.</div>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-primary)', borderRadius: '4px', borderLeft: '3px solid var(--color-accent-yellow)' }}>
              <strong>Waiting Time (WT)</strong> = Turnaround Time (TAT) − Burst Time (BT)
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.3rem' }}>Total time the process spent waiting in the ready queue.</div>
            </div>
          </div>
        )}

        {activeTab === 'complexity' && (
          <p>{content.complexity}</p>
        )}
      </div>
    </div>
  );
};

export default TutorialPanel;
