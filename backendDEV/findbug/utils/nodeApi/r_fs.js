var fs = require('fs');
var path = require('path');

/**
 * fs.appendFile
 * 绝对地址|可JSON化数据|换行写入
 */
let rcAppendFile = function (url, data) {
  return new Promise((resolve,reject) => {
    fs.appendFile(path.join(__dirname,`../..${url}`), `\r\n ${JSON.stringify(data)}`, (err) => {
      if(err) {
        reject(err);
      } else {
        resolve('ok');
      }
    })
  })
}

/**
 * fs.readFile
 * 绝对地址|默认utf8读取
 */
let rcReadFile = function (url,encoding = 'utf-8') {
  return new Promise((resolve,reject) => {
    fs.readFile(path.join(__dirname,`../..${url}`),(err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    })
  })
}
module.exports = {
  rcAppendFile
}