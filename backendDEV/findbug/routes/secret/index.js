var express = require('express');
var $fs = require('../../utils/nodeApi/r_fs.js');
var util = require('../../utils/util.js');
var query = require('../../utils/mysql/index.js');
var { Base64 } = require('../../utils/CDN/base64.js');
var { createSecretCode } = require('../../utils/secret/secret.js');
var router = express.Router();

// 创建web唯一秘钥通行证
router.get('/pwdcode', function(req, res, next) {
  // Base64解码ip
  // let ip = Base64.decode(req.headers.ms);
  let sql = `SELECT * FROM secret_key_code`;
  query(sql).then(back => {
    let str = createSecretCode(back.length);
  })
});

module.exports = router;
