// Controller untuk Saved Jobs
const { SavedJob } = require('../models');
const { UniqueConstraintError } = require('sequelize');

module.exports = {
  // GET /saved -> list saved jobs user login
  async listSavedJobs(req, res, next) {
    try {
      const userId = req.user.id;
      const list = await SavedJob.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']],
      });
      res.json({ count: list.length, data: list });
    } catch (err) {
      next(err);
    }
  },

  // POST /saved -> simpan payload job ke JSONB
  async saveJob(req, res, next) {
    try {
      const userId = req.user.id;
      const { jobExternalId = '', source = 'google', jobPayload = {} } = req.body;

      if (!jobExternalId) return res.status(400).json({ message: 'jobExternalId is required' });
      if (!source) return res.status(400).json({ message: 'source is required' });

      const created = await SavedJob.create({
        userId,
        jobExternalId,
        source,
        jobPayload,
      });

      res.status(201).json({ message: 'Saved', data: created });
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        // Jika duplikat (unik pada userId + jobExternalId + source)
        err.status = 409;
        err.message = 'Already saved';
      }
      next(err);
    }
  },

  // DELETE /saved/:id
  async deleteSavedJob(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const found = await SavedJob.findOne({ where: { id, userId } });
      if (!found) return res.status(404).json({ message: 'Not Found' });

      await found.destroy();
      res.json({ message: 'Deleted' });
    } catch (err) {
      next(err);
    }
  },
};
