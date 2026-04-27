const mongoose = require('mongoose');

const processSchema = new mongoose.Schema({
  id: { type: String, required: true },
  arrivalTime: { type: Number, required: true, min: 0 },
  burstTime: { type: Number, required: true, min: 1 },
  priority: { type: Number, default: null }
});

const exampleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  algoId: { type: String, required: true },
  processes: [processSchema],
  timeQuantum: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Example', exampleSchema);
