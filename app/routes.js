var express = require('express');
var router = express.Router();
var sb = require('./soundboard');

router.post('/', function(req, res) {
  var html = sb(req.body);
  res.send(html);
});

module.exports = router;
