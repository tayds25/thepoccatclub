import express from 'express';
import cors from 'cors';
import users from '../server/routes/user.js';
import adopt from '../server/routes/adopt.js';
import announcement from "../server/routes/announcement.js";
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

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

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(express.json());

// API routes
app.use('/user', users);
app.use('/adopt', adopt);
app.use('/announcement', announcement);

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5050;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;