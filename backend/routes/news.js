const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { requireAuth, optionalAuth } = require('../middleware/auth');

router.get('/feed', optionalAuth, newsController.getFeed);
router.get('/world', newsController.getWorldNews);
router.get('/category/:category', newsController.getCategoryFeed);
router.get('/my-countries', optionalAuth, newsController.getMyCountriesFeed);
router.get('/search', newsController.searchArticles);
router.get('/live-stats', newsController.getLiveStats);

module.exports = router;
