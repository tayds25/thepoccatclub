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
const __dirname = path.dirname(__filename);

// Handle API path prefixing for Vercel
app.use('/api', (req, res, next) => {
    req.url = req.url.replace(/^\/api/, '');
    next();
});

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? [
        'https://your-vercel-app.vercel.app',
        /\.vercel\.app$/
    ] : 'http://localhost:5173'
}));

app.use(express.json());

// Mount routes without the /api prefix
app.use('/user', users);
app.use('/adopt', adopt);
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
app.use('/announcement', announcement);

// Handle serverless environment for Vercel
if (process.env.NODE_ENV === 'production') {
  // In production, our server code is running on Vercel serverless functions
    console.log('Running in production mode on Vercel');
    } else {
    // In development, listen on a port
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export for serverless environment
export default app;