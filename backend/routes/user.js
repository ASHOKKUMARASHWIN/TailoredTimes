const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/countries', userController.updateCountries);
router.put('/interests', userController.updateInterests);
router.put('/preferences', userController.updatePreferences);
router.post('/onboarding', userController.completeOnboarding);
router.get('/saved', userController.getSavedArticles);
router.post('/saved', userController.saveArticle);
router.delete('/saved/:url', userController.unsaveArticle);

module.exports = router;
