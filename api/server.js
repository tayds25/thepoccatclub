import express from 'express';
import cors from 'cors';
import users from '../server/routes/user.js';
import adopt from '../server/routes/adopt.js';
import announcement from "../server/routes/announcement.js";
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from "mongodb";
import path from 'path';

dotenv.config({ path: '../server/config.env' });

// Initialize MongoDB connection
const URI = process.env.ATLAS_URI || "";
const client = new MongoClient(URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function initializeMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}

initializeMongoDB();

const app = express();

// Configure CORS with proper headers
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Parse JSON requests
app.use(express.json());

// Set default content type for all responses
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// API routes
app.use('/user', users);
app.use('/adopt', adopt);
app.use('/announcement', announcement);

// Serve static files (necessary for image uploads)
app.use('/uploads', express.static(path.join(process.cwd(), '../uploads')));

// Error handling middleware - ensures JSON responses even for errors
app.use((err, req, res, next) => {
    console.error("API Error:", err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'production' ? null : err.message
    });
});

// Catch-all route for 404 errors
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5050;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;