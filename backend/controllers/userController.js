const User = require('../models/User');

const getProfile = async (req, res) => {
  res.json(req.user.toPublicJSON ? req.user.toPublicJSON() : req.user);
};

const updateProfile = async (req, res) => {
  try {
    const { name, profession, readingFormat, viewpoint } = req.body;
    
    if (name) req.user.name = name;
    if (profession !== undefined) req.user.profession = profession;
    if (readingFormat !== undefined) req.user.readingFormat = readingFormat;
    if (viewpoint !== undefined) req.user.viewpoint = viewpoint;

    if (typeof req.user.save === 'function') await req.user.save();
    res.json(req.user.toPublicJSON ? req.user.toPublicJSON() : req.user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateCountries = async (req, res) => {
  try {
    const { countries } = req.body;
    if (Array.isArray(countries)) {
      req.user.countries = countries;
      if (typeof req.user.save === 'function') await req.user.save();
      res.json(req.user.toPublicJSON ? req.user.toPublicJSON() : req.user);
    } else {
      res.status(400).json({ message: 'countries must be an array' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateInterests = async (req, res) => {
  try {
    const { interests } = req.body;
    if (Array.isArray(interests)) {
      req.user.interests = interests;
      if (typeof req.user.save === 'function') await req.user.save();
      res.json(req.user.toPublicJSON ? req.user.toPublicJSON() : req.user);
    } else {
      res.status(400).json({ message: 'interests must be an array' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updatePreferences = async (req, res) => {
  try {
    const { countries, interests, preferredSources, readingPreferences } = req.body;
    if (countries) req.user.countries = countries;
    if (interests) req.user.interests = interests;
    if (preferredSources) req.user.preferredSources = preferredSources;
    if (readingPreferences) req.user.readingPreferences = readingPreferences;
    
    if (typeof req.user.save === 'function') await req.user.save();
    res.json(req.user.toPublicJSON ? req.user.toPublicJSON() : req.user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const completeOnboarding = async (req, res) => {
  try {
    const { countries, interests, profession, preferredSources, readingFormat, viewpoint, readingPreferences } = req.body;
    
    req.user.countries = countries || req.user.countries;
    req.user.interests = interests || req.user.interests;
    req.user.profession = profession !== undefined ? profession : req.user.profession;
    req.user.preferredSources = preferredSources || req.user.preferredSources;
    req.user.readingFormat = readingFormat !== undefined ? readingFormat : req.user.readingFormat;
    req.user.viewpoint = viewpoint !== undefined ? viewpoint : req.user.viewpoint;
    req.user.readingPreferences = readingPreferences || req.user.readingPreferences;
    req.user.onboardingComplete = true;

    if (typeof req.user.save === 'function') await req.user.save();
    res.json(req.user.toPublicJSON ? req.user.toPublicJSON() : req.user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const saveArticle = async (req, res) => {
  try {
    const article = req.body.article || req.body;
    if (!article || !article.url) return res.status(400).json({ message: 'Article URL is required' });

    if (!req.user) {
      return res.json({ success: true, saved: true, article });
    }

    req.user.savedArticles = req.user.savedArticles || [];
    const exists = req.user.savedArticles.some(a => a.url === article.url);
    if (!exists) {
      if (req.user.savedArticles.length >= 500) {
        req.user.savedArticles.pop();
      }
      req.user.savedArticles.unshift(article);
      if (typeof req.user.save === 'function') await req.user.save();
    }
    res.json(req.user.savedArticles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const unsaveArticle = async (req, res) => {
  try {
    const url = Buffer.from(req.params.url, 'base64').toString('utf-8');
    req.user.savedArticles = (req.user.savedArticles || []).filter(a => a.url !== url);
    if (typeof req.user.save === 'function') await req.user.save();
    res.json(req.user.savedArticles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getSavedArticles = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const saved = req.user.savedArticles || [];
    const paginated = saved.slice(skip, skip + limit);
    
    res.json({
      articles: paginated,
      total: saved.length,
      page,
      totalPages: Math.ceil(saved.length / limit) || 1
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateCountries,
  updateInterests,
  updatePreferences,
  completeOnboarding,
  saveArticle,
  unsaveArticle,
  getSavedArticles
};
