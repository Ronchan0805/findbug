var express = require('express');
var $fs = require('../utils/nodeApi/r_fs.js');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  let data = {
    ip: '192.81.252.202',
    msg: '未知报错',
    date: '2021-01-01 00:00:01'
  }
  $fs.rcAppendFile('/public/log/index.txt',data).then(res => {
    if(res == 'ok') {
      return;
    }
  }).catch(err => {
    console.log(err);
  })
  console.log('返回数据给前端');
  res.json({
    code: 200,
    data: '',
    msg: 'write success'
  });
});

module.exports = router;
