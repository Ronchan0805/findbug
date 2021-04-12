let md5 = require('./md5.js')
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
  
  num = (num + 258) * 6;
  let res = md5.hexMD5(num,'str');
  res = res.toUpperCase();
  return res;
}

module.exports = {
  createSecretCode
}