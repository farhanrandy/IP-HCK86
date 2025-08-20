const express = require('express');
const router = express.Router();

// Import router per modul
router.use('/auth', require('./auth'));
router.use('/jobs', require('./jobs'));
router.use('/saved', require('./saved'));
router.use('/resumes', require('./resumes'));
router.use('/ai', require('./ai'));

// root
router.get('/', (req, res) => {
  res.json({ message: 'API OK' });
});

module.exports = router;
