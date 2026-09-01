const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri || uri.includes('<username>')) {
    console.warn('⚠️  MongoDB URI not configured. Database features disabled.');
    console.warn('   Set MONGODB_URI in backend/.env to enable full functionality.');
    console.warn('   Get a free DB at: https://www.mongodb.com/atlas');
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error(`Mongoose error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected');
    });

  } catch (error) {
    console.error(`⚠️  MongoDB connection failed: ${error.message}`);
    console.warn('   Server will continue running — DB features will be unavailable.');
    console.warn('   Set up MongoDB Atlas at https://www.mongodb.com/atlas (free tier)');
    // Don't exit — serve frontend and RSS-based features without DB
  }
};

module.exports = connectDB;

