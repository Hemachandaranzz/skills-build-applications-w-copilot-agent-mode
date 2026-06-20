import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database.ts';
import usersRouter from './routes/users.ts';
import activitiesRouter from './routes/activities.ts';
import { seedDB } from './scripts/seed.ts';

dotenv.config();

const app: Application = express();
const PORT = Number(process.env.PORT || 8000);

// Build API base URL for Codespaces when available
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

console.log(`API base URL: ${API_BASE_URL}`);

// Middleware
// Configure CORS to allow Codespaces URL and localhost dev origin
const allowedOrigins = [API_BASE_URL, `http://localhost:5173`, `http://127.0.0.1:5173`];
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (await so we can optionally seed after connection)
await connectDB();

// Optionally seed the DB at startup when in-memory MongoDB is used or when requested
const shouldSeedOnStart = process.env.USE_IN_MEMORY_MONGO === 'true' || process.env.SEED_ON_START === 'true';
if (shouldSeedOnStart) {
  seedDB().catch((err) => console.error('Seeding at startup failed:', err));
}

// Basic routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OctoFit Tracker Backend is running!', timestamp: new Date() });
});

// Logic tier routes
app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err?.status || 500).json({ error: err?.message || 'Internal Server Error' });
});

// Start server
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT} (host ${HOST})`);
});
