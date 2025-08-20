const express = require('express');
const router = express.Router();
const savedJobsController = require('../controllers/savedJobsController');
const auth = require('../middlewares/auth');

// semua endpoint saved butuh auth
router.use(auth);

// list saved jobs user login
router.get('/', savedJobsController.listSavedJobs);

// simpan payload job ke JSONB
router.post('/', savedJobsController.saveJob);

// hapus saved job berdasarkan id
router.delete('/:id', savedJobsController.deleteSavedJob);

module.exports = router;
