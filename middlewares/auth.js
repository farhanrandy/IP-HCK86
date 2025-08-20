// Middleware auth JWT sederhana
const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  try {
    // Ambil token dari header: Authorization: Bearer <token>
    const authHeader = req.headers.authorization || '';
    const parts = authHeader.split(' ');
    const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : null;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Simpan data user di req.user supaya bisa dipakai controller
    req.user = { id: payload.id, email: payload.email, name: payload.name };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
