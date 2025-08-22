// serverr/middlewares/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err);

  let status = 500;
  let message = 'Internal Server Error';

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    status = 400;
    message = err.errors?.[0]?.message || message;

  } else if (err.name === 'Unauthenticated') {
    status = 401;
    message = 'Unauthenticated';

  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Invalid or expired token';

  } else if (err.name === 'Data not found') {
    status = 404;
    message = 'Data not found';

  } else if (err.status) {
    status = err.status;
    message = err.message || message;

  } else if (err.message) {
    message = err.message;
  }

  res.status(status).json({ message });
};
