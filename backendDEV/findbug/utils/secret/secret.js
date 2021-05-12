let md5 = require('../CDN/md5.js')
/**
 * 
 * @param {
 *    num: Number, 
 *    validity: Number(分钟min) || String('Max'),
 *    ip: String,
 *    note: String
 * }
 * @returns {String} 
 */
let createSecretCode = function (num, validity, ip, note) {
  // some code ...
  // num is mysql data-id
  // 秘钥在解密后查询之前应该做非法字符过滤...
  num = new Date().getTime().toString() + num;
  let res = md5.hex_md5(num + 'str').toUpperCase();
  return res;
}

module.exports = {
  createSecretCode
}