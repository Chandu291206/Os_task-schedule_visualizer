export const runRoundRobin = (inputProcesses, timeQuantum) => {
  let processes = inputProcesses.map(p => ({
    id: p.id, at: p.arrivalTime, bt: p.burstTime, remainingBT: p.burstTime,
    state: 'new', ct: null, tat: null, wt: null
  }));

  let time = 0;
  let snapshots = [];
  let readyQueue = [];
  let completedProcesses = [];
  let currentProcess = null;
  let ganttBlock = null;
  let currentQuantum = 0;

  snapshots.push({ time: 0, cpuProcess: null, readyQueue: [], completedProcesses: [], processes: JSON.parse(JSON.stringify(processes)), ganttBlock: null });

  // Array to hold processes that arrive at current time, to be added to queue AFTER preemption
  let newArrivals = [];

  while (completedProcesses.length < processes.length) {
    newArrivals = [];
    processes.forEach(p => {
      if (p.at === time && p.state === 'new') {
        p.state = 'ready';
        newArrivals.push(p);
      }
    });

    // If a process is running and its quantum is up or it finished, handle it
    if (currentProcess) {
      if (currentProcess.remainingBT > 0 && currentQuantum === timeQuantum) {
        currentProcess.state = 'ready';
        readyQueue.push(currentProcess);
        currentProcess = null;
      } else if (currentProcess.remainingBT === 0) {
        currentProcess.state = 'terminated';
        currentProcess.ct = time;
        currentProcess.tat = currentProcess.ct - currentProcess.at;
        currentProcess.wt = currentProcess.tat - currentProcess.bt;
        completedProcesses.push(currentProcess);
        currentProcess = null;
        ganttBlock = null;
      }
    }

    // New arrivals join queue AFTER current process is preempted (standard RR behavior)
    newArrivals.forEach(p => readyQueue.push(p));

    if (!currentProcess && readyQueue.length > 0) {
      currentProcess = readyQueue.shift();
      currentProcess.state = 'running';
      currentQuantum = 0;
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
      currentQuantum++;
      if (ganttBlock) ganttBlock.end = time;
    }
  }

  // Check completion at final step
  if (currentProcess && currentProcess.remainingBT === 0) {
     currentProcess.state = 'terminated';
     currentProcess.ct = time;
     currentProcess.tat = currentProcess.ct - currentProcess.at;
     currentProcess.wt = currentProcess.tat - currentProcess.bt;
     completedProcesses.push(currentProcess);
     
     // Update final snapshot processes state
     snapshots[snapshots.length - 1].processes = JSON.parse(JSON.stringify(processes));
     snapshots[snapshots.length - 1].completedProcesses = completedProcesses.map(p => p.id);
  }

  return snapshots;
};
