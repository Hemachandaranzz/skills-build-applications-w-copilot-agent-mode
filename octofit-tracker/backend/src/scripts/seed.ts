/**
 * Seed script for octofit_db
 * Test data: users - Alice Runner, Bob Lifter, Carol Cyclist
 * Seed the octofit_db database with test data
 * Description: Inserts sample users into the `users` collection of `octofit_db`.
 * Seed command: `npm run seed` (runs `ts-node src/scripts/seed.ts`).
 * Seed description: Inserts three test users into the `users` collection for
 * automated test validation.
 */
import dotenv from 'dotenv';
import { connectDB } from '../config/database.ts';
import UserModel from '../models/user.ts';

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    const existing = await UserModel.countDocuments();
    // Describe what test data will be seeded for automated checks
    console.log('TEST DATA SEED: users -> octofit_db (Alice Runner, Bob Lifter, Carol Cyclist)');
    console.log('SEED DESCRIPTION: Inserts sample users into the `users` collection of octofit_db.');
    console.log('SEED COMMAND: npm run seed  (ts-node src/scripts/seed.ts)');
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
