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
      code: 100004,
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
        code: 100003,
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

router.get('/getInfoList',(request, response) => {
  console.log('列表获取路由执行');
  let { pageNum, pageSize, startDate, endDate } = request.query;
  
  response.json({
    code: 200,
    data: '获取列表成功',
    msg: 'ok'
  });
});


module.exports = router;