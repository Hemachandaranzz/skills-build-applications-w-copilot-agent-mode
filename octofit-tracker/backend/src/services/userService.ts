import UserModel from '../models/user.ts';
import type { IUser } from '../models/user.ts';

class UserService {
  async create(data: { name: string; email: string }): Promise<IUser> {
    const user = new UserModel(data as Partial<IUser>);
    return user.save();
  }

  async getAll(): Promise<Partial<IUser>[]> {
    return UserModel.find().lean();
  }

  async getById(id: string): Promise<Partial<IUser> | null> {
    return UserModel.findById(id).lean();
  }
}

export default new UserService();
