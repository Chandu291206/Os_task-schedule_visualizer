const mongoose = require('mongoose');

const processSchema = new mongoose.Schema({
  id: { type: String, required: true },
  arrivalTime: { type: Number, required: true, min: 0 },
  burstTime: { type: Number, required: true, min: 1 },
  priority: { type: Number, default: null }
});

const defaultSchema = new mongoose.Schema({
  algoId: { type: String, required: true, unique: true }, // fcfs, sjf-np, sjf-p, priority-np, priority-p, rr
  algoName: { type: String, required: true },
  processes: [processSchema],
  timeQuantum: { type: Number, default: null },
  description: { type: String }
});

module.exports = mongoose.model('Default', defaultSchema);
