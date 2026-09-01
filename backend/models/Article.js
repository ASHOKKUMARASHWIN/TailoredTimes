const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  content: { type: String },
  image: { type: String },
  source: { type: String },
  sourceId: { type: String },
  country: { type: String },
  category: { type: String },
  topic: { type: String },
  url: { type: String, required: true, unique: true },
  publishedAt: { type: Date },
  fetchedAt: { type: Date, default: Date.now },
  tags: [{ type: String }]
});

// TTL index of 24 hours on fetchedAt
articleSchema.index({ fetchedAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model('Article', articleSchema);
