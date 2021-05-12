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
  // num is mysql data-id
  
  num = new Date().getTime().toString() + num;
  let res = md5.hexMD5(num,'str').toUpperCase();
  return res;
}

module.exports = {
  createSecretCode
}