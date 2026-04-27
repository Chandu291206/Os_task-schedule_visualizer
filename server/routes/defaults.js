const express = require('express');
const router = express.Router();
const Default = require('../models/Default');

// GET /api/defaults/:algoId
// Fetch default example for a specific algorithm
router.get('/:algoId', async (req, res) => {
  try {
    const defaultExample = await Default.findOne({ algoId: req.params.algoId });
    if (!defaultExample) {
      return res.status(404).json({ message: 'Default example not found for this algorithm' });
    }
    res.json(defaultExample);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
