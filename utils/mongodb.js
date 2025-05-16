import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('Connecting to MongoDB Atlas...');
    
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then(async (mongoose) => {
        console.log('MongoDB Atlas connected successfully');
        
        // Verify the connection
        const db = mongoose.connection.db;
        console.log('Connected to database:', db.databaseName);
        
        // List all collections
        const collections = await db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
        
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB Atlas connection error:', error);
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Error in cached connection:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB; 