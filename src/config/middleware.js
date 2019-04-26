const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const passport = require('passport');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const middleware = function (app) {
  if (isProd) {
    app.use(compression());
    app.use(helmet);
  }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(passport.initialize());
  if (isDev) {
    app.use(morgan('dev'));
  }
};

module.exports = { middleware };
