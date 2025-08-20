// Controller untuk Resumes CRUD
const { Resume } = require('../models');

module.exports = {
  // GET /resumes -> ambil semua resume user
  async getResumes(req, res, next) {
    try {
      const userId = req.user.id;
      const list = await Resume.findAll({
        where: { userId },
        order: [['updatedAt', 'DESC']],
      });
      res.json({ count: list.length, data: list });
    } catch (err) {
      next(err);
    }
  },

  // POST /resumes -> buat resume baru
  async createResume(req, res, next) {
    try {
      const userId = req.user.id;
      const { title = '', contentText = '' } = req.body;

      if (!title) return res.status(400).json({ message: 'title is required' });

      const created = await Resume.create({ userId, title, contentText });
      res.status(201).json({ message: 'Created', data: created });
    } catch (err) {
      next(err);
    }
  },

  // PATCH /resumes/:id -> update sebagian
  async updateResume(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;
      const { title, contentText } = req.body;

      const found = await Resume.findOne({ where: { id, userId } });
      if (!found) return res.status(404).json({ message: 'Not Found' });

      if (title !== undefined) found.title = title;
      if (contentText !== undefined) found.contentText = contentText;
      await found.save();

      res.json({ message: 'Updated', data: found });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /resumes/:id
  async deleteResume(req, res, next) {
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const found = await Resume.findOne({ where: { id, userId } });
      if (!found) return res.status(404).json({ message: 'Not Found' });

      await found.destroy();
      res.json({ message: 'Deleted' });
    } catch (err) {
      next(err);
    }
  },
};
