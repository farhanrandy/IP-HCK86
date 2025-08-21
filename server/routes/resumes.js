const express = require('express');
const router = express.Router();
const resumesController = require('../controllers/resumesController');
const auth = require('../middlewares/auth');

// semua endpoint resume butuh auth
router.use(auth);

// ambil semua resume user
router.get('/', resumesController.getResumes);

// buat resume baru
router.post('/', resumesController.createResume);

// update sebagian (PATCH)
router.patch('/:id', resumesController.updateResume);

// hapus resume
router.delete('/:id', resumesController.deleteResume);

module.exports = router;
