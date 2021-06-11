/**
 * validate-param dev code
 * Version: 0.0.1
 * author: ronchan
 */
var $util = require('../../utils/util.js');

/**
 * 校验 + 合法时默认值转换
 * @param {Object} rq {pageNum: 1, pageSize: 10 (may not include other property)} 待校验对象 - 数组形式
 * @param {Object} rules 检验规则
 * @returns {Boolean} true/false 是否合法
 */
function validate (rq, rules) {
  let ruleKeys = Object.keys(rules);

  for (let i = 0; i < ruleKeys.length; i++) {
    const val = _getValue( rq, ruleKeys[i] );
    if( _Illegal(rules[ruleKeys[i]], val, rq, ruleKeys[i]) ) {
      // 检测到非法参数,终止执行
      return false;
    }
  }
  return true;
}

/**
 * 获取对象中属性名为keyName的value值
 */
function _getValue (obj, keyName) {
  return ($util._typeOf(obj[keyName]) === "Undefined" || $util._typeOf(obj[keyName]) === "Null")?"":obj[keyName];
}

/**
 * 检测key的值是否非法
 * @param {
 *  {Object} keyRulesObj 待校验key的rules规则
 *  {*} value 校验的key对应的值 - 可能不存在
 *  {Object} rq 原参数对象 - 利用对象做参数传递特性修改默认值
 *  {String} keyName 校验的key
 * }
 * @returns {
 *  true: 非法
 *  false: 合法
 * }
 */
function _Illegal (keyRulesObj, value, rq, keyName) {

  if(value === "") {
    if(keyRulesObj.require) {
      return true;
    }
    if(!_hasOwnProperty(keyRulesObj,'default')) {
      throw new Error(`syntax error: Please define a default value when require is false in rules`);
    }
    const defaultValue = keyRulesObj.default;
    rq[keyName] = defaultValue;
    return false;
  }
  
  if(_hasOwnProperty(keyRulesObj,'type') && $util._typeOf(value) !== keyRulesObj.type) {
    return true;
  }
  if(_hasOwnProperty(keyRulesObj,'isInt')) {
    return keyRulesObj.isInt?!_isInteger(value):_isInteger(value);
  }
  if(_hasOwnProperty(keyRulesObj,'dateType')) {
    return keyRulesObj.dateType?!_isDateType(value):_isDateType(value);
  }
  
  return false;
}


// 整数判断
function _isInteger (num) {
  return Math.floor(num) === num;
}

// 时间类型判断
function _isDateType (date) {
  return !isNaN(new Date(date).getTime());
}

// 对象属性存在性判断
function _hasOwnProperty (obj, key) {
  return obj.hasOwnProperty(key);
}

module.exports = {
  validate
}