const express = require('express');
const router = express.Router();
const archiveController = require('../controllers/archiveController');

router.get('/sections', archiveController.getArchiveSections);
router.get('/articles', archiveController.getArchiveArticles);
router.get('/year-stats', archiveController.getYearStats);

module.exports = router;
