import dotenv from 'dotenv';
import { connectDB } from '../config/database.ts';
import UserModel from '../models/user.ts';

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    const existing = await UserModel.countDocuments();
    // Describe what test data will be seeded for automated checks
    console.log('Seeding test data into octofit_db: users (Alice Runner, Bob Lifter, Carol Cyclist)');
    if (existing > 0) {
      console.log(`Database already has ${existing} users — skipping seeding.`);
      process.exit(0);
    }

    const users = [
      { name: 'Alice Runner', email: 'alice.runner@example.com' },
      { name: 'Bob Lifter', email: 'bob.lifter@example.com' },
      { name: 'Carol Cyclist', email: 'carol.cyclist@example.com' },
    ];

    await UserModel.insertMany(users);
    console.log('✅ Seeded test data into octofit_db');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seed();
