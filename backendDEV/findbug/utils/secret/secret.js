var query = require('../../utils/mysql/index.js');
var $fs = require('../nodeApi/r_fs.js');
var md5 = require('../CDN/md5.js');
/**
 * 
 * @param {
 *    validity: Number(分钟min) || String('Max'),
 *    ip: String,
 *    note: String
 * }
 * @returns {String} 
 */
function createSecretCode (validity, ip, note='') {
  // ip拦截验证 - (略)
  return new Promise((resolve, reject) => {
    let sql_selectSecKeyCode = `SELECT * FROM secret_key_code`;
    query(sql_selectSecKeyCode).then(res => {
      // 生成秘钥
      num = new Date().getTime().toString() + res.length;
      let _s = md5.hex_md5(num + 'rc').toUpperCase();
      // 插入秘钥
      let limit = _getSecretKeyCodeLimit(validity);
      let create_date = new Date().getTime();
      let sql_insertSecKeyCode = (
        `INSERT INTO secret_key_code
         (keycode, create_ip, limit_date, create_date, note) VALUES ('${_s}', '${ip}', '${limit}', '${create_date}', '${note}')
         `);
      query(sql_insertSecKeyCode).then(res => {
        resolve(_s);
      }).catch(err => {
        reject(err);
      });
    })
  })
}

// 获取秘钥到期时间
function _getSecretKeyCodeLimit (limitTime) {
  if(limitTime === 'Max') {
    return new Date('2099-01-01 00:00:00').getTime();
  } else {
    // limitTime is a Number
    return (new Date().getTime() + Number(limitTime) * 60 * 1000);
  }
}





module.exports = {
  createSecretCode
}