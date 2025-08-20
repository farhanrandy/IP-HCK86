// Util sederhana untuk JWT
const jwt = require('jsonwebtoken');

function signUser(user) {
  // Simpan info basic saja
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '7d' } // expired 7 hari
  );
}

module.exports = { signUser };
