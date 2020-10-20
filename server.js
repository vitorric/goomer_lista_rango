const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  fileUpload = require('express-fileupload'),
  app = express();

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Headers', 'Content-type, Accept, Authorization');

  console.log('IP: ', req.connection.remoteAddress);

  next();
});

/**
 * @description Se os param enviado ocorrer um erro. interno no middleware
 */
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError &&
    err.status >= 400 && err.status < 500 &&
    err.message.indexOf('JSON') !== -1) {
    return res.status(500).jsonp({ sucess: false, result: 'Invalid data' });
  }
  next();
});

/**
 * @description inicia o modulo de passaport jwt
 */
require('./src/services/passport')();

app.use(
  morgan('dev'),
  bodyParser.json({ limit: '1000MB' }),
  bodyParser.urlencoded({ extended: true }),
  fileUpload({ limits: { fileSize: 70 * 1024 * 1024 }, useTempFiles: true, tempFileDir: 'data/' })
);

require('./src/routes')(app);

app.set('port', process.env.PORT || 3000);

module.exports = app;