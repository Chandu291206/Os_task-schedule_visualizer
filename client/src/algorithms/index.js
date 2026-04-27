import { runFCFS } from './fcfs';
import { runSJF_NP, runSJF_P } from './sjf';
import { runPriority_NP, runPriority_P } from './priority';
import { runRoundRobin } from './roundRobin';

export const runAlgorithm = (algoId, processes, timeQuantum = null) => {
  // Validate input
  if (!processes || processes.length === 0) return [];

  // Deep clone to avoid mutating input during simulation
  const clonedProcesses = processes.map(p => ({
    id: p.id,
    arrivalTime: Number(p.arrivalTime),
    burstTime: Number(p.burstTime),
    priority: p.priority ? Number(p.priority) : null
  }));

  switch (algoId) {
    case 'fcfs':
      return runFCFS(clonedProcesses);
    case 'sjf-np':
      return runSJF_NP(clonedProcesses);
    case 'sjf-p':
      return runSJF_P(clonedProcesses);
    case 'priority-np':
      return runPriority_NP(clonedProcesses);
    case 'priority-p':
      return runPriority_P(clonedProcesses);
    case 'rr':
      return runRoundRobin(clonedProcesses, Number(timeQuantum) || 2);
    default:
      console.warn('Unknown algorithm ID:', algoId);
      return [];
  }
};
