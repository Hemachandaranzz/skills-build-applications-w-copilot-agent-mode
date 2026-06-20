import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import usersRouter from './routes/users';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Basic routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OctoFit Tracker Backend is running!', timestamp: new Date() });
});

// Logic tier routes
app.use('/api/users', usersRouter);

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err?.status || 500).json({ error: err?.message || 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
