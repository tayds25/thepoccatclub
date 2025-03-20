import express from 'express';
import cors from 'cors';
import users from '../server/routes/user.js';
import adopt from '../server/routes/adopt.js';
import announcement from "../server/routes/announcement.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connectToDatabase } from '../server/db/connection.js';
import fs from 'fs';

// Setup for __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Try to load environment variables from multiple possible locations
const envPaths = [
  path.resolve(__dirname, '../server/config.env'),
  path.resolve(__dirname, '../config.env'),
  path.resolve(__dirname, 'config.env'),
  path.resolve(process.cwd(), 'config.env'),
  path.resolve(process.cwd(), 'server/config.env'),
];

let envLoaded = false;
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    console.log(`Loading environment variables from ${envPath}`);
    dotenv.config({ path: envPath });
    envLoaded = true;
    break;
  }
}

if (!envLoaded) {
  console.log("No config.env file found. Using environment variables directly if available.");
}

// Manually set environment variables if they weren't loaded from file
// and only if running locally (don't do this in production)
if (process.env.NODE_ENV !== 'production') {
  if (!process.env.MONGODB_URI && !process.env.ATLAS_URI) {
    process.env.ATLAS_URI = "mongodb+srv://admin:admin123@poccatclub.i8ae2.mongodb.net/";
    console.log("Set ATLAS_URI manually as fallback. This should only happen in development.");
  }
}

// Create your express app
const app = express();

// Debug: Log whether we have MongoDB connection info
console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
console.log("ATLAS_URI exists:", !!process.env.ATLAS_URI);

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(express.json());

// Connect to database at startup
connectToDatabase()
    .then(() => console.log('Database connection ready'))
    .catch(err => console.error('Database connection error:', err));


// Health check endpoints
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Server is running' });
});

app.get('/health/db', async (req, res) => {
    try {
        await connectToDatabase();
        res.status(200).json({ status: 'Database connection successful' });
    } catch (error) {
        console.error('Health check: Database connection failed', error);
        res.status(500).json({ status: 'Database connection failed', error: error.message });
    }
});

// API routes
app.use('/user', users);
app.use('/adopt', adopt);
app.use('/announcement', announcement);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5050;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;