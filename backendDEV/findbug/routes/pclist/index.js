var express = require('express');
var { Validate } = require('../../my_modules/validate-param/validate.js');
var { getInfoList } = require('../../my_modules/validate-param/rules.js');
var router = express.Router();

// 获取日志列表
router.get('/getInfoList',(request, response) => {
  let { pageNum, pageSize, startDate, endDate } = request.query;
  let p = Validate([{pageNum: pageNum},{pageSize: pageSize},{startDate: startDate},{endDate: endDate}], getInfoList);
  response.json({
    code: 200,
    data: p,
    msg: 'ok'
  });
});

module.exports = router;