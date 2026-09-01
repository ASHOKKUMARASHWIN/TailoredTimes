const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, default: null }, // null for guest/oauth
  role: { type: String, enum: ['user', 'admin', 'guest', 'deleted'], default: 'user' },
  isGuest: { type: Boolean, default: false },
  countries: [{ type: String }],
  interests: [{ type: String }],
  profession: { type: String },
  readingFormat: { type: String },
  preferredSources: [{ type: String }],
  viewpoint: { type: String }, // 'balanced','left','right','local'
  readingPreferences: [{ type: String }],
  savedArticles: [{
    title: String,
    description: String,
    url: String,
    image: String,
    source: String,
    country: String,
    category: String,
    publishedAt: Date,
    savedAt: { type: Date, default: Date.now }
  }],
  onboardingComplete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date }
});

userSchema.methods.comparePassword = async function(plaintext) {
  if (!this.passwordHash) return false;
  return bcrypt.compare(plaintext, this.passwordHash);
};

userSchema.methods.toPublicJSON = function() {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
