require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cron = require('node-cron');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const newsRoutes = require('./routes/news');
const archiveRoutes = require('./routes/archive');
const adminRoutes = require('./routes/admin');
const rssFetcher = require('./services/rssFetcher');
const sourcesConfig = require('./config/sources');
const Article = require('./models/Article');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // For serving frontend safely
}));
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/archive', archiveRoutes);
app.use('/api/admin', adminRoutes);

// Serve frontend if present
const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ message: 'API route not found' });
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Cache Refresh Job (Every 30 mins)
cron.schedule('*/30 * * * *', async () => {
  console.log('Running background cache refresh...');
  try {
    const articles = await rssFetcher.fetchMultipleFeeds(sourcesConfig);
    for (const article of articles) {
      await Article.updateOne(
        { url: article.url },
        { $set: article },
        { upsert: true }
      );
    }
    console.log(`Cache refreshed: ${articles.length} articles processed.`);
  } catch (error) {
    console.error('Cache refresh error:', error);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
