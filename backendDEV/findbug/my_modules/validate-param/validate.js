/**
 * validate-param dev code
 * Version: 0.0.1
 * author: ronchan
 * 
 * *********note: 时间类型校验及默认值转换暂未实现***********
 */
var $util = require('../../utils/util.js');

/**
 * @param {Object} rules 检验规则
 * @param {Array} values [...{key: value}, {key: value}, {key: value}] 待校验对象 - 数组形式
 * @returns {Boolean} true/false 是否合法
 */
function Validate (values, rules) {
  let back = {
    right: true,
    data: null
  }
  let keys = Object.keys(rules);
  for(let i = 0; i < keys.length; i++) {

    let value = _parseValueOfKey(values, rules[keys[i]]);

    if(_Illegal( rules[keys[i]], value)) {
      back.right = false;
      break;
    }

  }
  
}

/**
 * parseValueOfKey
 * 返回arr数组中的对象中key为keyName的value值
 */
function _parseValueOfKey (arr, keyName) {
  var value;
  arr.forEach((item, index, array) => {
    if(item.hasOwnProperty(keyName)) {
      value = item[keyName];
    }
  });
  return value;
}

/**
 * 检测值是否非法
 * @param {
 *  ruleObj: 每一个参数的校验规则对象
 *  value: 校验的值
 * }
 * @returns {
 *  true: 非法
 *  false: 合法
 * }
 */
function _Illegal (ruleObj, value) {
  var res = false;
  let keys = Object.keys(ruleObj);
  for(let i = 0; i < keys.length; i++) {

    if ( keys[i] == 'require' && ruleObj[keys[i]] ) {
      if( $util._typeOf(value) == 'Null' || $util._typeOf(value) == 'Undefined' ) {
        res = true;
        break;
      }
      if ( keys[i] == 'type' && ruleObj[keys[i]] != $util._typeOf(value) ) {
        res = true;
        break;
      }
      else if ( keys[i] == 'isInt' && ruleObj[keys[i]] ) {
        if(!_isInteger(value)) {
          res = true;
          break;
        }
      }
    }
    // else if ( keys[i] == 'default' && !value ) {
    //   value = ruleObj[keys[i]];
    // }
    // else if( keys[i] == 'dateType' && ruleObj[keys[i]] ) {
    //   // 时间类型校验
    // }
  }
  return res;
}


// 整数判断
function _isInteger (num) {
  return Math.floor(num) === num;
}

module.exports = {
  Validate
}