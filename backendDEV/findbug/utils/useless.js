/**
 * 包含了一些废弃的方法 - 该文件不可引入
 */

/**
 * Object 相等判断 - 废弃
 * 默认成员: {Object,Array,Number,String,Boolean}
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
        if(typeof(o1[item]) === "number" || typeof(o1[item]) === "string" || typeof(o1[item]) === "boolean") {
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