const express = require('express');
const router = express.Router();
const Example = require('../models/Example');

// GET /api/examples?algoId=...
// Fetch all custom examples, optionally filtered by algorithm ID
router.get('/', async (req, res) => {
  try {
    const filter = req.query.algoId ? { algoId: req.query.algoId } : {};
    const examples = await Example.find(filter).sort({ createdAt: -1 });
    res.json(examples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/examples/:id
// Fetch a specific custom example
router.get('/:id', async (req, res) => {
  try {
    const example = await Example.findById(req.params.id);
    if (!example) {
      return res.status(404).json({ message: 'Example not found' });
    }
    res.json(example);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/examples
// Create a new custom example
router.post('/', async (req, res) => {
  const example = new Example({
    name: req.body.name,
    algoId: req.body.algoId,
    processes: req.body.processes,
    timeQuantum: req.body.timeQuantum
  });

  try {
    const newExample = await example.save();
    res.status(201).json(newExample);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/examples/:id
// Delete a custom example
router.delete('/:id', async (req, res) => {
  try {
    const example = await Example.findById(req.params.id);
    if (!example) {
      return res.status(404).json({ message: 'Example not found' });
    }
    await example.deleteOne();
    res.json({ message: 'Example deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
