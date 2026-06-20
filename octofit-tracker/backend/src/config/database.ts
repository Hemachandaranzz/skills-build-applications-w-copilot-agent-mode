import mongoose from 'mongoose';

// Allow forcing an in-memory MongoDB for local runs: set USE_IN_MEMORY_MONGO=true
const useInMemory = process.env.USE_IN_MEMORY_MONGO === 'true';

let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const connectDB = async () => {
  try {
    if (useInMemory) {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      MONGODB_URI = mongod.getUri();
      console.log('Using in-memory MongoDB at', MONGODB_URI);
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    if (!useInMemory) {
      console.warn('Attempting to start in-memory MongoDB as fallback...');
      try {
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        MONGODB_URI = mongod.getUri();
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to in-memory MongoDB');
        return;
      } catch (err2) {
        console.error('❌ In-memory MongoDB failed to start:', err2);
      }
    }
    console.warn('Continuing without MongoDB connection — some endpoints may be limited.');
  }
};

export default mongoose;
