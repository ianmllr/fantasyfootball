const express = require('express');
require('dotenv').config({ path: './.gitignore/config.env' });

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGODB_URL;

const { logger } = require('./middleware/logger');
const { limiter } = require('./middleware/rateLimiter');
const connectDB = require('./config/db');

const app = express();

connectDB(MONGO_URL).catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
});

app.use(limiter);
app.use(logger);
app.use(express.json());

// routes herunder


app.listen(PORT, HOST, () => {
    console.log(`Server kører på ${HOST}:${PORT}/`);
}).on('error', (err) => {
    console.error('Server error:', err);
});