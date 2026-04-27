import React, { createContext, useState, useContext } from 'react';

const SchedulerContext = createContext();

export const useScheduler = () => useContext(SchedulerContext);

export const SchedulerProvider = ({ children }) => {
  const [processes, setProcesses] = useState([]);
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [algoId, setAlgoId] = useState('fcfs');
  const [isPlaying, setIsPlaying] = useState(false);

  const addProcess = () => {
    const newId = `P${processes.length + 1}`;
    setProcesses([...processes, { id: newId, arrivalTime: 0, burstTime: 1, priority: 1 }]);
  };

  const removeProcess = (id) => {
    setProcesses(processes.filter(p => p.id !== id));
  };

  const updateProcess = (id, field, value) => {
    setProcesses(processes.map(p => 
      p.id === id ? { ...p, [field]: Number(value) } : p
    ));
  };

  const generateRandomProcesses = () => {
    const num = Math.floor(Math.random() * 4) + 3; // 3 to 6 processes
    const newProcesses = Array.from({ length: num }, (_, i) => ({
      id: `P${i + 1}`,
      arrivalTime: Math.floor(Math.random() * 5),
      burstTime: Math.floor(Math.random() * 8) + 1,
      priority: Math.floor(Math.random() * 5) + 1
    }));
    setProcesses(newProcesses);
  };

  return (
    <SchedulerContext.Provider value={{
      processes, setProcesses,
      timeQuantum, setTimeQuantum,
      algoId, setAlgoId,
      isPlaying, setIsPlaying,
      addProcess, removeProcess, updateProcess, generateRandomProcesses
    }}>
      {children}
    </SchedulerContext.Provider>
  );
};
