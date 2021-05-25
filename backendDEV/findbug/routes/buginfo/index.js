var express = require('express');
var $fs = require('../../utils/nodeApi/r_fs.js');
var util = require('../../utils/util.js');
var $date = require('../../utils/parsedate.js');
var query = require('../../utils/mysql/index.js');
var { _getSecretKeyCodeCanUse } = require('../../utils/secret/secret.js');
var router = express.Router();

// 秘钥拦截验证
router.use('/', (request, response, next) => {
  let { keycode } = request.query;
  if(!keycode) {
    response.json({
      code: 100002,
      data: '秘钥为空',
      msg: 'fail'
    });
    return;
  }
  let reg = /[^A-Za-z0-9 ]/;
  if(reg.test(keycode)) {
    response.json({
      code: 100003,
      data: '秘钥不合法，请检查后重新输入',
      msg: 'fail'
    });
    return;
  }
  _getSecretKeyCodeCanUse(keycode).then(res => {
    if(res == 1) {
      next();
      return;
    } else {
      response.json({
        code: 100004,
        data: '秘钥无效,请重新申请',
        msg: 'fail'
      });
      return;
    }
  }).catch(err => {
    response.json({
      code: 100005,
      data: '请输入正确的秘钥',
      msg: 'fail'
    });
    return;
  })
});

/**
 * @api {get} /danger/pwdcode 插入日志数据
 * @apiName 插入日志数据
 * @apiGroup secure
 * @apiParam {String} keycode 秘钥
 * @apiParam {String} data 日志内容
 * @apiSuccessExample {json} Success-Response:
 * "success"
 * @apiErrorExample {json} Error-Response:
 * {
 *   code: 100002-100005,
 *   data: '...秘钥相关错误',
 *   msg: 'fail'
 * }
 * 
 * "fail"
 */
router.get('/createInfo',(request, response) => {
  let { keycode, data } = request.query;
  let sql_insertInfo = `INSERT INTO bug_info (keycode, create_date, content_detail) VALUES (
    ?, ?, ?
  )`;
  query(sql_insertInfo,[keycode, new Date().getTime(), data]).then(res => {
    response.end('success');
    return;
  }).catch(err => {
    response.end('fail');
    $fs.rcAppendFile('/public/log/index.txt',`${$date._parseTime(new Date().getTime(), 'yyyy-MM-dd HH:mm:ss')}:createInfo
    错误：${err}`);
    return;
  });
});


module.exports = router;