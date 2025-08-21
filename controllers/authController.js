// Controller untuk auth Google
const { verifyGoogleIdToken } = require('../utils/googleVerify');
const { signUser } = require('../utils/jwt');
const { User } = require('../models');

module.exports = {
  // handle login google
  async googleLogin(req, res, next) {
    try {
      const { idToken } = req.body;
      if (!idToken) throw { status: 400, message: 'idToken is required' };

      // Verifikasi token ke Google
      const { name, email, googleId } = await verifyGoogleIdToken(idToken);

      // Upsert user berdasarkan email (jika ada -> update googleId/name)
      let user = await User.findOne({ where: { email } });
      if (!user) {
        user = await User.create({ name, email, googleId });
      } else {
        // update data simple
        user.name = name || user.name;
        user.googleId = googleId || user.googleId;
        await user.save();
      }

      // Generate JWT
      const access_token = signUser(user);

      res.json({
        message: 'Login success',
        user: { id: user.id, name: user.name, email: user.email, googleId: user.googleId },
        access_token,
      });
    } catch (err) {
      next(err);
    }
  },
};
