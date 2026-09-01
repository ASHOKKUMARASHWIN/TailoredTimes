const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    
    if (decoded.isGuest || decoded.role === 'guest' || mongoose.connection.readyState !== 1) {
      req.user = {
        _id: decoded.id,
        id: decoded.id,
        name: decoded.name || 'Guest User',
        email: decoded.email || 'guest@tailoredtimes.local',
        role: decoded.role || 'guest',
        isGuest: !!decoded.isGuest,
        countries: decoded.countries || ['IN', 'US', 'GB'],
        interests: decoded.interests || ['world', 'technology', 'business'],
        onboardingComplete: !!decoded.onboardingComplete,
        savedArticles: [],
        save: async () => {},
        toPublicJSON() {
          return {
            _id: this._id,
            name: this.name,
            email: this.email,
            role: this.role,
            isGuest: this.isGuest,
            countries: this.countries,
            interests: this.interests,
            onboardingComplete: this.onboardingComplete
          };
        }
      };
      return next();
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.role === 'deleted') {
      return res.status(403).json({ message: 'Account deactivated' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      
      if (decoded.isGuest || decoded.role === 'guest' || mongoose.connection.readyState !== 1) {
        req.user = {
          _id: decoded.id,
          id: decoded.id,
          name: decoded.name || 'Guest User',
          email: decoded.email || 'guest@tailoredtimes.local',
          role: decoded.role || 'guest',
          isGuest: !!decoded.isGuest,
          countries: decoded.countries || ['IN', 'US', 'GB'],
          interests: decoded.interests || ['world', 'technology', 'business'],
          onboardingComplete: !!decoded.onboardingComplete,
          savedArticles: [],
          save: async () => {},
          toPublicJSON() {
            return {
              _id: this._id,
              name: this.name,
              email: this.email,
              role: this.role,
              isGuest: this.isGuest,
              countries: this.countries,
              interests: this.interests,
              onboardingComplete: this.onboardingComplete
            };
          }
        };
        return next();
      }

      const user = await User.findById(decoded.id);
      if (user && user.role !== 'deleted') {
        req.user = user;
      }
    }
  } catch (error) {
    // optional auth, ignore errors
  }
  next();
};

module.exports = { requireAuth, optionalAuth };
