const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const auth = require('../middlewares/auth');

// AI cover letter (butuh login)
router.post('/cover-letter', auth, aiController.generateCoverLetter);

module.exports = router;
