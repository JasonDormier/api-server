'use strict';

const express = require('express');
const logger = require('./middleware/logger.js');
const v1Routes = require('./routes/v1.js');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const authRoutes = require('./auth/routes.js');

const app = express();

app.use(express.json());

app.use(logger);

app.use('/api/v1', v1Routes);


app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

// Catchalls
app.use(errorHandler);
app.use('*', notFoundHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};