require('dotenv').config({ override: true });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.LOCAL_MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Basic route
app.get('/api', (req, res) => {
    res.json({ message: 'OS Visualizer API running' });
});

// API Routes
app.use('/api/defaults', require('./routes/defaults'));
app.use('/api/examples', require('./routes/examples'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
