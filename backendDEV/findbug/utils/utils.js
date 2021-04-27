/**
 * 类型检测 - Array
 */
function _isArray (a) {
  return a !== null && Object.prototype.toString.call(a) === "[object Array]";
}

/**
 * 类型检测 - Object 
 */
function _isObject (o) {
  return o !== null && Object.prototype.toString.call(o) === "[object Object]";
}

/**
 * Object 相等判断
 * {Object,Array,Number,String}
 * @returns { true | false }
 */
function _diffObject (o1, o2) {
  if(!_isObject(o1) || !_isObject(o2)) {
    throw new Error(`The param: ${JSON.stringify(o1)} or ${JSON.stringify(o2)} of _diffObject is not a Object`);
  }
  let a1 = Object.keys(o1);
  let a2 = Object.keys(o2);
  // key is different -> object is diffrernt
  if(!_diffArray(a1, a2)) {
    return false;
  }
  // res -> 返回值
  let res = true;

    for(let i = 0; i < a1.length; i++) {
      let item = a1[i];
      // key:valueType is different -> object is different
      if( (typeof(o1[item]) !== typeof(o2[item])) || (_isArray(o1[item]) !== _isArray(o2[item]))  || (_isObject(o1[item]) !== _isObject(o2[item])) ) {
        res = false;
        break;
      } else {
          
        // o1[item] , o2[item]类型相同
        if(typeof(o1[item]) == "number" || typeof(o1[item]) == "string") {
          if(o1[item] !== o2[item]) {
            res = false;
            break;
          }
        } else if (_isArray(o1[item])) {
          if( !_diffArray(o1[item], o2[item]) ) {
            res = false;
            break;
          }
        } else if (_isObject(o1[item])) {
          if( !_diffObject(o1[item], o2[item]) ) {
            res = false;
            break;
          }
        } else {
          throw new Error('The value of object in _diffObject required {Object,Array,Number,String}')
        }

      }
    }
    return res;

}

/**
 * Array 相等判断
 * {Object,Array,Number,String}
 * @returns { true | false }
 * // sort() + JSON.stringfy()不适用深度判断
 * // 适用范围: 简单数组， 数组->对象, 数组->数组
 */
function _diffArray (a1, a2) {
  if(!_isArray(a1) || !_isArray(a2)) {
    throw new Error(`The param: ${JSON.stringify(a1)} or ${JSON.stringify(a2)} of _diffObject is not a Array`);
  }
  // 对a1, a2内部Object类型排序
  a1.forEach((item, index, arr) => {
    if(_isArray(item)) {
      item.sort();
    } else if (_isObject(item)) {
      let newObj = {};
      Object.keys(item).sort().forEach(key => {
        newObj[key] = item[key];
        arr[index] = newObj;
      });
    } else {
      return;
    }
  });
  a2.forEach((item, index, arr) => {
    if(_isArray(item)) {
      item.sort();
    } else if (_isObject(item)) {
      let newObj = {};
      Object.keys(item).sort().forEach(key => {
        newObj[key] = item[key];
        arr[index] = newObj;
      });
    } else {
      return;
    }
  });
  // 对a1, a2排序
  a1.sort();
  a2.sort();
  if(JSON.stringify(a1) === JSON.stringify(a2)) {
    return true;
  } else {
    return false;
  }
}

/**
 * Array 去重
 * [Object,Array,Number,String]
 */
function _uniqueArray (a) {
  if(!_isArray(a)) {
    return new Error(`The param: ${a} of _uniqueArray is not a Array`);
  }
}
// let arr = [1,'2',{},'2',[{name:'ron'},{name:'ron'}],false,{name:'ron'},{name:'ron'},{},{age:16,name:'ron'},[{name:'ron'},{name:'ron'}]];
// console.log(_uniqueArray(arr));