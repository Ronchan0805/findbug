var express = require('express');
var $fs = require('../../utils/nodeApi/r_fs.js');
var util = require('../../utils/util.js');
var $date = require('../../utils/parsedate.js');
var { _getSecretKeyCodeCanUse } = require('../../utils/secret/secret.js');
var router = express.Router();

router.use('/', (request, response, next) => {
  console.log('keycode校验');
  _getSecretKeyCodeCanUse('89B670725CF2851BE5F1960FE95D9C28ronchan').then(res => {
    if(res == 1) {
      next();
      return;
    } else {
      response.json({
        code: 100002,
        data: '秘钥无效,请重新申请',
        msg: 'fail'
      });
      return;
    }
  }).catch(err => {
    response.json({
      code: 100002,
      data: '请输入正确的秘钥',
      msg: 'fail'
    });
    return;
  })
});

router.get('/getInfoList',(request, response) => {
  response.json({
    code: 200,
    data: '获取列表成功',
    msg: 'ok'
  });
  return;
});






module.exports = router;