const express = require('express');
const cors = require('cors');

const bfhlRoutes = require('./routes/bfhl.routes');
const healthRoutes = require('./routes/health.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/bfhl', bfhlRoutes);
app.use('/health', healthRoutes);

app.use((err, req, res, next) => {
    const response = {
        is_success: false,
        official_email: process.env.OFFICIAL_EMAIL || '',
        error: err.message || 'Internal Server Error'
    };
    res.status(err.status || 500).json(response);
});

app.use((req, res) => {
    res.status(404).json({
        is_success: false,
        official_email: process.env.OFFICIAL_EMAIL || '',
        error: 'Route not found'
    });
});

module.exports = app;
