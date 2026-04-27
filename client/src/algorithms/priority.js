export const runPriority_NP = (inputProcesses) => {
  let processes = inputProcesses.map(p => ({
    id: p.id, at: p.arrivalTime, bt: p.burstTime, remainingBT: p.burstTime, priority: p.priority,
    state: 'new', ct: null, tat: null, wt: null
  }));

  let time = 0;
  let snapshots = [];
  let readyQueue = [];
  let completedProcesses = [];
  let currentProcess = null;
  let ganttBlock = null;

  snapshots.push({ time: 0, cpuProcess: null, readyQueue: [], completedProcesses: [], processes: JSON.parse(JSON.stringify(processes)), ganttBlock: null });

  while (completedProcesses.length < processes.length) {
    processes.forEach(p => {
      if (p.at === time && p.state === 'new') {
        p.state = 'ready';
        readyQueue.push(p);
      }
    });

    // Sort by priority (lower number = higher priority), then by arrival time
    readyQueue.sort((a, b) => {
      if (a.priority === b.priority) return a.at - b.at;
      return a.priority - b.priority;
    });

    if (!currentProcess && readyQueue.length > 0) {
      currentProcess = readyQueue.shift();
      currentProcess.state = 'running';
      ganttBlock = { pid: currentProcess.id, start: time, end: time + 1 };
    }

    snapshots.push({
      time: time + 1,
      cpuProcess: currentProcess ? currentProcess.id : null,
      readyQueue: readyQueue.map(p => p.id),
      completedProcesses: completedProcesses.map(p => p.id),
      processes: JSON.parse(JSON.stringify(processes)),
      ganttBlock: ganttBlock ? { ...ganttBlock, end: time + 1 } : { pid: 'IDLE', start: time, end: time + 1 }
    });

    time++;
    if (currentProcess) {
      currentProcess.remainingBT--;
      if (ganttBlock) ganttBlock.end = time;

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

export const runPriority_P = (inputProcesses) => {
  let processes = inputProcesses.map(p => ({
    id: p.id, at: p.arrivalTime, bt: p.burstTime, remainingBT: p.burstTime, priority: p.priority,
    state: 'new', ct: null, tat: null, wt: null
  }));

  let time = 0;
  let snapshots = [];
  let readyQueue = [];
  let completedProcesses = [];
  let currentProcess = null;
  let ganttBlock = null;

  snapshots.push({ time: 0, cpuProcess: null, readyQueue: [], completedProcesses: [], processes: JSON.parse(JSON.stringify(processes)), ganttBlock: null });

  while (completedProcesses.length < processes.length) {
    processes.forEach(p => {
      if (p.at === time && p.state === 'new') {
        p.state = 'ready';
        readyQueue.push(p);
      }
    });

    if (currentProcess) {
      readyQueue.push(currentProcess);
      currentProcess.state = 'ready';
    }

    readyQueue.sort((a, b) => {
      if (a.priority === b.priority) return a.at - b.at;
      return a.priority - b.priority;
    });

    if (readyQueue.length > 0) {
      const nextProcess = readyQueue.shift();
      if (!currentProcess || currentProcess.id !== nextProcess.id) {
        ganttBlock = { pid: nextProcess.id, start: time, end: time + 1 };
      }
      currentProcess = nextProcess;
      currentProcess.state = 'running';
    } else {
      currentProcess = null;
    }

    snapshots.push({
      time: time + 1,
      cpuProcess: currentProcess ? currentProcess.id : null,
      readyQueue: readyQueue.map(p => p.id),
      completedProcesses: completedProcesses.map(p => p.id),
      processes: JSON.parse(JSON.stringify(processes)),
      ganttBlock: ganttBlock ? { ...ganttBlock, end: time + 1 } : { pid: 'IDLE', start: time, end: time + 1 }
    });

    time++;
    if (currentProcess) {
      currentProcess.remainingBT--;
      if (ganttBlock) ganttBlock.end = time;

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
