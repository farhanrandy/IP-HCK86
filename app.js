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

// 404 handler sederhana
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// Error handler global sederhana: selalu balikan { message }
app.use(errorHandler);

module.exports = app;
