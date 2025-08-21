// Middleware auth JWT sederhana
const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  try {
    // Ambil token dari header: Authorization: Bearer <token>
    const authHeader = req.headers.authorization || '';
    const parts = authHeader.split(' ');
    // allow case-insensitive "Bearer" scheme to support different clients
    const token =
      parts.length === 2 && parts[0].toLowerCase() === 'bearer'
        ? parts[1]
        : null;

    if (!token) {
      // jika tidak ada token lempar error khusus
      throw { name: 'Unauthenticated' };
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Simpan data user di req.user supaya bisa dipakai controller
    req.user = { id: payload.id, email: payload.email, name: payload.name };
    next();
  } catch (err) {
    // lempar error ke errorHandler
    next(err);
  }
};
