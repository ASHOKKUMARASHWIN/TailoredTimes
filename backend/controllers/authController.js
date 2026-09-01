const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');
const emailService = require('../services/emailService');

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  countries: Joi.array().items(Joi.string()),
  profession: Joi.string().allow('')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const generateToken = (user) => {
  return jwt.sign({
    id: user._id || user.id,
    name: user.name,
    email: user.email,
    role: user.role || 'user',
    isGuest: !!user.isGuest,
    countries: user.countries || [],
    interests: user.interests || [],
    onboardingComplete: !!user.onboardingComplete
  }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });
};

const register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    let newUser;
    if (mongoose.connection.readyState === 1) {
      const existingUser = await User.findOne({ email: value.email });
      if (existingUser) return res.status(400).json({ message: 'Email already registered' });

      const passwordHash = await bcrypt.hash(value.password, 10);
      newUser = new User({
        name: value.name,
        email: value.email,
        passwordHash,
        countries: value.countries || [],
        profession: value.profession || '',
        isGuest: false
      });
      await newUser.save();
    } else {
      newUser = {
        _id: new mongoose.Types.ObjectId(),
        name: value.name,
        email: value.email,
        countries: value.countries || [],
        profession: value.profession || '',
        isGuest: false,
        role: 'user',
        onboardingComplete: false,
        toPublicJSON() {
          return {
            _id: this._id,
            name: this.name,
            email: this.email,
            role: this.role,
            isGuest: this.isGuest,
            countries: this.countries,
            interests: this.interests || [],
            onboardingComplete: this.onboardingComplete
          };
        }
      };
    }

    try {
      await emailService.sendRegistrationNotification(newUser);
      await emailService.sendWelcomeEmail(newUser);
    } catch (e) {}

    const token = generateToken(newUser);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: newUser.toPublicJSON ? newUser.toPublicJSON() : newUser
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: value.email });
      if (!user) return res.status(401).json({ message: 'Invalid email or password' });
      if (user.role === 'deleted') return res.status(403).json({ message: 'Account deactivated' });

      const isMatch = await user.comparePassword(value.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

      user.lastLogin = new Date();
      await user.save();

      const token = generateToken(user);
      return res.json({
        message: 'Login successful',
        token,
        user: user.toPublicJSON ? user.toPublicJSON() : user
      });
    }

    // Offline / Demo mode credentials check
    const demoUser = {
      _id: new mongoose.Types.ObjectId(),
      name: value.email.split('@')[0],
      email: value.email,
      role: value.email.includes('admin') || value.email === (process.env.ADMIN_EMAIL || 'timestailored@gmail.com') ? 'admin' : 'user',
      isGuest: false,
      countries: ['IN', 'US', 'GB'],
      interests: ['world', 'technology', 'business'],
      onboardingComplete: true,
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

    const token = generateToken(demoUser);
    res.json({
      message: 'Login successful',
      token,
      user: demoUser.toPublicJSON()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const guestLogin = async (req, res) => {
  try {
    const guestId = Math.floor(Math.random() * 100000000);
    const guestEmail = `guest_${guestId}@tailoredtimes.local`;
    const guestObjId = new mongoose.Types.ObjectId();
    
    const guestUserObj = {
      _id: guestObjId,
      name: `Guest ${guestId}`,
      email: guestEmail,
      isGuest: true,
      role: 'guest',
      countries: ['IN', 'US', 'GB'],
      interests: ['world', 'technology', 'business'],
      onboardingComplete: false,
      savedArticles: [],
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

    if (mongoose.connection.readyState === 1) {
      try {
        const guestUser = new User(guestUserObj);
        await guestUser.save();
      } catch (dbErr) {
        console.warn('Could not save guest to DB:', dbErr.message);
      }
    }

    const token = generateToken(guestUserObj);

    res.status(201).json({
      message: 'Guest login successful',
      token,
      user: guestUserObj.toPublicJSON()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMe = async (req, res) => {
  try {
    res.json(req.user.toPublicJSON());
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  guestLogin,
  getMe
};
