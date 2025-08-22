if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config(); // Hanya load .env di non-production
}
// Aplikasi Express utama (CommonJS)
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes'); // index.js di folder routes
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware umum
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // supaya bisa baca JSON body

// Route utama
app.use('/', routes);

// 404 handler sederhana -> lempar ke errorHandler
app.use((req, res, next) => {
  next({ name: 'Data not found' });
});

// Error handler global sederhana: selalu balikan { message }
app.use(errorHandler);

module.exports = app;
