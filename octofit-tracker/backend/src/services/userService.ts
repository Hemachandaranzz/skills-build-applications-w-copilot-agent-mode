import UserModel from '../models/user.ts';
import type { IUser } from '../models/user.ts';
import mongoose from '../config/database.ts';

class UserService {
  async create(data: { name: string; email: string }): Promise<IUser> {
    const user = new UserModel(data as Partial<IUser>);
    return user.save();
  }

  async getAll(): Promise<Partial<IUser>[]> {
    try {
      // If MongoDB is not connected, this may throw — fall back to sample data.
      if (mongoose.connection.readyState !== 1) {
        throw new Error('MongoDB not connected');
      }
      return UserModel.find().lean();
    } catch (err) {
      // fallback sample users when DB is unavailable
      return [
        { name: 'Alice Runner', email: 'alice.runner@example.com', id: 'u1' },
        { name: 'Bob Lifter', email: 'bob.lifter@example.com', id: 'u2' },
        { name: 'Carol Cyclist', email: 'carol.cyclist@example.com', id: 'u3' },
      ];
    }
  }

  async getById(id: string): Promise<Partial<IUser> | null> {
    try {
      if (mongoose.connection.readyState !== 1) throw new Error('MongoDB not connected');
      return UserModel.findById(id).lean();
    } catch (err) {
      const fallback = [
        { name: 'Alice Runner', email: 'alice.runner@example.com', id: 'u1' },
        { name: 'Bob Lifter', email: 'bob.lifter@example.com', id: 'u2' },
        { name: 'Carol Cyclist', email: 'carol.cyclist@example.com', id: 'u3' },
      ];
      return fallback.find((u) => u.id === id) || null;
    }
  }
}

export default new UserService();
