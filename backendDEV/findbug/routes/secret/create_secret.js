var express = require('express');
var $fs = require('../../utils/nodeApi/r_fs.js');
var util = require('../../utils/util.js');
var { Base64 } = require('../../utils/CDN/base64.js');
var router = express.Router();

// 创建web唯一秘钥通行证
router.get('/pwdcode', function(req, res, next) {
  let ip = req.headers.ms;
  // base64 加密解密ip

  res.json({
    code: 200,
    data: Base64.encode('zhanrun'),
    msg: 'ok'
  });
  return;
});

module.exports = router;
