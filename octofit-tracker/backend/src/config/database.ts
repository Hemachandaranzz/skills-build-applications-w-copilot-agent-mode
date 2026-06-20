import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    console.warn('Continuing without MongoDB connection — some endpoints may be limited.');
  }
};

export default mongoose;
