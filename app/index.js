'use strict';

var express = require('express'),
    app = module.exports = express(),
    routes = require('./routes'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', routes);

app.listen(3000, function() {
  console.log('Express listening on port 3000');
});
