var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let a = 60;
  a = m;
  // make a mistake
  res.json({
    code: 200,
    data: a,
    msg: 'success'
  })
});

module.exports = router;
