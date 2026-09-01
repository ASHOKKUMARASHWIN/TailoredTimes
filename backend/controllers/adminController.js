const User = require('../models/User');
const Article = require('../models/Article');
const sourcesConfig = require('../config/sources');

const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find({ role: { $ne: 'deleted' } })
      .select('-passwordHash')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments({ role: { $ne: 'deleted' } });

    res.json({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const guestUsers = await User.countDocuments({ isGuest: true });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const activeToday = await User.countDocuments({ lastLogin: { $gte: today } });

    res.json({
      totalUsers,
      activeToday,
      guestUsers,
      topCountries: [], // Implement aggregations if needed
      topProfessions: [],
      topInterests: []
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getSources = (req, res) => {
  res.json(sourcesConfig);
};

const getArticleStats = async (req, res) => {
  try {
    const totalCached = await Article.countDocuments();
    const latest = await Article.findOne().sort({ fetchedAt: -1 });
    
    res.json({
      totalCached,
      byCountry: [], // Aggregation can be added here
      byCategory: [],
      lastFetch: latest ? latest.fetchedAt : null
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getRegistrations = async (req, res) => {
  try {
    const users = await User.find({ isGuest: false })
      .select('name email createdAt')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.role = 'deleted';
    await user.save();
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSource = async (req, res) => {
  try {
    const { id } = req.params;
    const { enabled } = req.body;
    // For a real app, sources would be stored in DB if mutable.
    // Here we can just mock the response since sources are static config.
    res.json({ message: `Source ${id} updated`, id, enabled });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getUsers,
  getUserStats,
  getSources,
  getArticleStats,
  getRegistrations,
  deleteUser,
  updateSource
};
