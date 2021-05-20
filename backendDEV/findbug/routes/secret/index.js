var express = require('express');
var $fs = require('../../utils/nodeApi/r_fs.js');
var util = require('../../utils/util.js');
var $date = require('../../utils/parsedate.js');
var { createSecretCode } = require('../../utils/secret/secret.js');
var router = express.Router();

/**
 * @api {get} /danger/pwdcode Request User information
 * @apiName 创建web唯一秘钥通行证
 * @apiGroup danger
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       data: "",
 *       msg: 'ok'
 *     }
 */
router.get('/pwdcode', function(request, response, next) {
  createSecretCode('Max','192.168.94.37').then(res => {
    response.json({
      code: 200,
      data: res,
      msg: 'ok'
    });
    return;
  }).catch(err => {
    response.json({
      code: 1000001,
      data: '秘钥创建失败',
      msg: 'fail'
    });
    // 记录失败原因
    $fs.rcAppendFile('/public/log/index.txt',
      `${$date._parseTime(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss')}: 秘钥创建错误-createSecretCode-${err}`).then(res => {
        return false;
      })
    return;
  })
});

module.exports = router;
