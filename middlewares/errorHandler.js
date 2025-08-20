// Global error handler simple: selalu balikan JSON { message }
module.exports = (err, req, res, next) => {
  console.error(err); // untuk debugging di server
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ message });
};
