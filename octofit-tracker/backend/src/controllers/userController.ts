import type { Request, Response, NextFunction } from 'express';
import userService from '../services/userService.ts';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let id = req.params.id;
    if (!id) return res.status(400).json({ message: 'Missing id parameter' });
    if (Array.isArray(id)) id = id[0];
    const user = await userService.getById(id as string);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};
