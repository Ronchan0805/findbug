var express = require('express');
var $fs = require('../../utils/nodeApi/r_fs.js');
var util = require('../../utils/util.js');
var $date = require('../../utils/parsedate.js');
var query = require('../../utils/mysql/index.js');
var { _getSecretKeyCodeCanUse } = require('../../utils/secret/secret.js');
var router = express.Router();

// 获取日志列表
router.get('/getInfoList',(request, response) => {
  let { pageNum, pageSize, startDate, endDate } = request.query;
});

module.exports = router;