var express = require('express');
var $fs = require('../utils/nodeApi/r_fs.js');
var fs = require('fs');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(req);
  let data = {
    ip: '192.81.252.202',
    msg: '未知报错',
    // date: des
  }
  $fs.rcAppendFile('/public/log/index.txt',data).then(res => {
    if(res == 'ok') {
      return;
    }
  }).catch(err => {
    console.log(err);
  })
  $fs.rcMkDir('/public/test/').then(res => {
    if(res == 'ok') {
      console.log('创建成功');
    }
  }).catch(err => {
    console.log('创建失败',err.errno,'---',err);
  })
  console.log('返回数据给前端');
  res.json({
    code: 200,
    data: '',
    msg: 'write success'
  });
});

module.exports = router;
