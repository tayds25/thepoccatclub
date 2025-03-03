import express from 'express';
import cors from 'cors';
import users from './routes/user.js';
import adopt from './routes/adopt.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT || 5050;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use('/user', users);
app.use('/adopt', adopt);
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
