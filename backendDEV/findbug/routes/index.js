var express = require('express');
var $fs = require('../utils/nodeApi/r_fs.js');
var util = require('../utils/util.js');
var router = express.Router();

router.get('/', function(req, res, next) {
  let arr = [{},{},1,2,3];
  arr = util._uniqueArray(arr);
  if(arr) {
    res.json({
      code: 200,
      data: arr,
      msg: 'ok'
    });
  }
  console.log('代码执行');
  // next();
});

module.exports = router;
