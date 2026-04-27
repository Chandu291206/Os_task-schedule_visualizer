require('dotenv').config({ override: true });
const mongoose = require('mongoose');
const Default = require('../models/Default');

const defaultExamples = [
  {
    algoId: 'fcfs',
    algoName: 'FCFS',
    timeQuantum: null,
    description: 'Classic FCFS example showing the convoy effect (long job blocks shorter jobs).',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 10, priority: null },
      { id: 'P2', arrivalTime: 1, burstTime: 3, priority: null },
      { id: 'P3', arrivalTime: 2, burstTime: 2, priority: null },
      { id: 'P4', arrivalTime: 3, burstTime: 1, priority: null }
    ]
  },
  {
    algoId: 'sjf-np',
    algoName: 'SJF (Non-Preemptive)',
    timeQuantum: null,
    description: 'Shortest Job First selects the arrived process with the shortest burst time. Non-preemptive means it runs to completion.',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 7, priority: null },
      { id: 'P2', arrivalTime: 2, burstTime: 4, priority: null },
      { id: 'P3', arrivalTime: 4, burstTime: 1, priority: null },
      { id: 'P4', arrivalTime: 5, burstTime: 4, priority: null }
    ]
  },
  {
    algoId: 'sjf-p',
    algoName: 'SJF (Preemptive - SRTF)',
    timeQuantum: null,
    description: 'Shortest Remaining Time First. A late-arriving short job preempts the currently running process if its remaining time is shorter.',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 8, priority: null },
      { id: 'P2', arrivalTime: 1, burstTime: 4, priority: null },
      { id: 'P3', arrivalTime: 2, burstTime: 9, priority: null },
      { id: 'P4', arrivalTime: 3, burstTime: 5, priority: null }
    ]
  },
  {
    algoId: 'priority-np',
    algoName: 'Priority (Non-Preemptive)',
    timeQuantum: null,
    description: 'Runs the highest priority process (lower number = higher priority). FCFS is used as a tiebreaker.',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 10, priority: 3 },
      { id: 'P2', arrivalTime: 0, burstTime: 1, priority: 1 },
      { id: 'P3', arrivalTime: 0, burstTime: 2, priority: 4 },
      { id: 'P4', arrivalTime: 0, burstTime: 1, priority: 5 },
      { id: 'P5', arrivalTime: 0, burstTime: 5, priority: 2 }
    ]
  },
  {
    algoId: 'priority-p',
    algoName: 'Priority (Preemptive)',
    timeQuantum: null,
    description: 'A higher-priority process arriving later will interrupt a running lower-priority one.',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 4, priority: 2 },
      { id: 'P2', arrivalTime: 1, burstTime: 3, priority: 3 },
      { id: 'P3', arrivalTime: 2, burstTime: 2, priority: 4 },
      { id: 'P4', arrivalTime: 3, burstTime: 1, priority: 1 }
    ]
  },
  {
    algoId: 'rr',
    algoName: 'Round Robin',
    timeQuantum: 2,
    description: 'Processes take turns using the CPU for a maximum of Time Quantum (Q) units. Here Q = 2.',
    processes: [
      { id: 'P1', arrivalTime: 0, burstTime: 5, priority: null },
      { id: 'P2', arrivalTime: 1, burstTime: 4, priority: null },
      { id: 'P3', arrivalTime: 2, burstTime: 2, priority: null },
      { id: 'P4', arrivalTime: 3, burstTime: 1, priority: null }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.LOCAL_MONGO_URI);
    console.log('Connected to MongoDB');

    await Default.deleteMany({});
    console.log('Cleared existing default examples');

    await Default.insertMany(defaultExamples);
    console.log('Successfully seeded default examples');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
