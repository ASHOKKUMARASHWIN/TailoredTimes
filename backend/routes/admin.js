const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAuth } = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

router.use(requireAuth);
router.use(adminOnly);

router.get('/users', adminController.getUsers);
router.get('/stats', adminController.getUserStats);
router.get('/sources', adminController.getSources);
router.get('/articles', adminController.getArticleStats);
router.get('/registrations', adminController.getRegistrations);
router.delete('/users/:id', adminController.deleteUser);
router.put('/sources/:id', adminController.updateSource);

module.exports = router;
