const mongoose = require('mongoose');

const archiveArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  content: { type: String },
  url: { type: String, required: true },
  source: { type: String },
  country: { type: String },
  section: { type: String, enum: ['ca', 'students', 'ielts', 'toefl'] },
  topic: { type: String },
  year: { type: Number },
  publishedAt: { type: Date },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  tags: [{ type: String }],
  wordCount: { type: Number }
});

module.exports = mongoose.model('ArchiveArticle', archiveArticleSchema);
