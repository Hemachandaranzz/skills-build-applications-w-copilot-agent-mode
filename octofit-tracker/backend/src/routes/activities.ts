import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

// In-memory sample activities for fallback when DB is not available
const sampleActivities = [
  { id: 'a1', type: 'run', distance_km: 5, user: 'Alice Runner', date: new Date() },
  { id: 'a2', type: 'cycle', distance_km: 20, user: 'Carol Cyclist', date: new Date() },
];

router.get('/', (req: Request, res: Response) => {
  res.json(sampleActivities);
});

router.post('/', (req: Request, res: Response) => {
  const activity = { id: `a${Date.now()}`, ...req.body, date: new Date() };
  sampleActivities.push(activity as any);
  res.status(201).json(activity);
});

export default router;
