// Verifikasi Google ID Token sederhana
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Fungsi ini return payload token (name, email, sub = googleId)
async function verifyGoogleIdToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return {
    name: payload.name,
    email: payload.email,
    googleId: payload.sub,
  };
}

module.exports = { verifyGoogleIdToken };
