export const runFCFS = (inputProcesses) => {
  let processes = inputProcesses.map(p => ({
    id: p.id,
    at: p.arrivalTime,
    bt: p.burstTime,
    remainingBT: p.burstTime,
    state: 'new', // new, ready, running, waiting, terminated
    ct: null,
    tat: null,
    wt: null
  })).sort((a, b) => a.at - b.at); // Sort by arrival time

  let time = 0;
  let snapshots = [];
  let readyQueue = [];
  let completedProcesses = [];
  let currentProcess = null;
  let ganttBlock = null;

  // Initial snapshot at time 0
  snapshots.push({
    time: 0,
    cpuProcess: null,
    readyQueue: [],
    completedProcesses: [],
    processes: JSON.parse(JSON.stringify(processes)),
    ganttBlock: null
  });

  while (completedProcesses.length < processes.length) {
    // 1. Arrive processes
    processes.forEach(p => {
      if (p.at === time && p.state === 'new') {
        p.state = 'ready';
        readyQueue.push(p);
      }
    });

    // 2. Dispatch process if CPU is idle
    if (!currentProcess && readyQueue.length > 0) {
      currentProcess = readyQueue.shift();
      currentProcess.state = 'running';
      ganttBlock = { pid: currentProcess.id, start: time, end: time + 1 };
    }

    // 3. Execution snapshot (record state AT this time unit)
    snapshots.push({
      time: time + 1,
      cpuProcess: currentProcess ? currentProcess.id : null,
      readyQueue: readyQueue.map(p => p.id),
      completedProcesses: completedProcesses.map(p => p.id),
      processes: JSON.parse(JSON.stringify(processes)),
      ganttBlock: ganttBlock ? { ...ganttBlock, end: time + 1 } : { pid: 'IDLE', start: time, end: time + 1 }
    });

    // 4. Run CPU cycle
    time++;
    if (currentProcess) {
      currentProcess.remainingBT--;
      if (ganttBlock) ganttBlock.end = time;

      // 5. Completion
      if (currentProcess.remainingBT === 0) {
        currentProcess.state = 'terminated';
        currentProcess.ct = time;
        currentProcess.tat = currentProcess.ct - currentProcess.at;
        currentProcess.wt = currentProcess.tat - currentProcess.bt;
        completedProcesses.push(currentProcess);
        currentProcess = null;
        ganttBlock = null;
      }
    }
  }

  return snapshots;
};
