const rateLimit = require("express-rate-limit");

const jobSearchLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 menit
  max: 10,              // max 10 request per menit
  message: { message: "Too many requests, please try again later." },
});

module.exports = { jobSearchLimiter };