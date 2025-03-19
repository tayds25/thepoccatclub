import express from 'express';
import cors from 'cors';
import users from './routes/user.js';
import adopt from './routes/adopt.js';
import announcement from "./routes/announcement.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5050;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

// Handle CORS for both development and production
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://yourdomainname.vercel.app'
        : 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

// API routes with /api prefix for Vercel
app.use('/api/user', users);
app.use('/api/adopt', adopt);
app.use('/api/announcement', announcement);

// Static uploads folder
app.use('/uploads', express.static(path.join(path.resolve(), "uploads")));

// For local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// For Vercel deployment
export default app;