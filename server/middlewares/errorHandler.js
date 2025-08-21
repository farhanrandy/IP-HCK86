// Global error handler
// Seluruh error dari controller / middleware akan berakhir di sini
// dan dibalas dalam format JSON { message }
module.exports = (err, req, res, next) => {
  console.error(err); // log dulu untuk debugging di server

  let status = 500; // default 500
  let message = 'Internal Server Error';

  // Error bawaan Sequelize ketika validasi atau unik gagal
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    status = 400;
    // ambil pesan pertama dari array errors jika ada
    message = err.errors?.[0]?.message || message;

    // Error JWT dari jsonwebtoken.verify
  } else if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Invalid token';

    // Error custom dari middleware auth ketika tidak ada token
  } else if (err.name === 'Unauthenticated') {
    status = 401;
    message = 'Unauthenticated';

    // Error ketika user tidak punya akses
  } else if (err.name === 'Forbidden') {
    status = 403;
    message = 'Forbidden';

    // Ketika data yang diminta tidak ditemukan
  } else if (err.name === 'Data not found') {
    status = 404;
    message = 'Data not found';

    // Jika ada err.status manual dari controller
  } else if (err.status) {
    status = err.status;
    message = err.message || message;

    // Fallback: gunakan message bawaan error jika ada
  } else if (err.message) {
    message = err.message;
  }

  res.status(status).json({ message });
};
