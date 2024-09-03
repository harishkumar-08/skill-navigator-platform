const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory storage for candidates
let candidates = [];

// Helper function for batch allocation
function allocateBatch(candidate) {
    if (candidate.certifications.includes('AWS') || candidate.certifications.includes('Java')) {
        return 'Java Batch';
    } else if (candidate.certifications.includes('Azure') || candidate.certifications.includes('.NET')) {
        return '.NET Batch';
    } else if (candidate.certifications.includes('Python')) {
        return 'Data Engineering Batch';
    }
    return 'General Batch';
}

// POST: Add a new candidate
app.post('/api/candidates', (req, res) => {
    const candidate = req.body;
    candidate.batch = allocateBatch(candidate);
    candidates.push(candidate);
    console.log('Candidate added:', candidate);
    res.status(201).send(candidate);
});

// GET: Retrieve all candidates
app.get('/api/candidates', (req, res) => {
    res.status(200).send(candidates);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
