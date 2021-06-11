var express = require('express');
var { validate } = require('../../my_modules/validate-param/validate.js');
var { getInfoList } = require('../../my_modules/validate-param/rules.js');
var router = express.Router();

// 获取日志列表
router.get('/getInfoList',(request, response) => {
  let rq = request.query;
  if ( !validate(rq,getInfoList) ) {
    response.json({
      code: 200,
      data: '参数不合法',
      msg: 'fail'
    });
    return;
  }
  response.json({
    code: 200,
    data: rq,
    msg: 'ok'
  });
});

module.exports = router;