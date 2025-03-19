import express from 'express';
import cors from 'cors';
import users from '../server/routes/user.js';
import adopt from '../server/routes/adopt.js';
import announcement from "../server/routes/announcement.js";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: '../server/config.env' });

const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(express.json());

// API routes without the /api prefix (Vercel adds it automatically)
app.use('/user', users);
app.use('/adopt', adopt);
app.use('/announcement', announcement);

// Static uploads folder - for development
if (process.env.NODE_ENV !== 'production') {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    app.use('/uploads', express.static(path.join(__dirname, "../uploads")));
}

export default app;