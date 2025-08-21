const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');
const { jobSearchLimiter } = require("../middlewares/rateLimiter");
// search jobs via SerpAPI
router.get('/search', jobSearchLimiter ,jobsController.searchJobs);

module.exports = router;
