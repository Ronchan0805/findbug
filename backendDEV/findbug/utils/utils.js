/**
 * 类型检测 - Array
 */
let _isArray = function (a) {
  return a !== null && Object.prototype.toString.call(a) === "[object Array]";
}

/**
 * 类型检测 - Object
 */
let _isObject = function (o) {
  return o !== null && Object.prototype.toString.call(o) === "[object Object]";
}

/**
 * Object 相等判断
 */
let _uniqueObject = function (o1, o2) {
  if(!_isObject(o1) || !_isObject(o2)) {
    return new Error(`The param: ${o1} or ${o2} of _uniqueObject is not a Object`);
  }
  let a1 = Object.keys(o1);
  let a2 = Object.keys(o2);
}
console.log(_uniqueObject({name:'123'},{age:'666'}))
/**
 * Array 去重
 * [Object,Array,Number,String]
 */
let _uniqueArray = function (a) {
  if(!_isArray(a)) {
    return new Error(`The param: ${a} of _uniqueArray is not a Array`);
  }
}
// let arr = [1,'2',{},'2',[{name:'ron'},{name:'ron'}],false,{name:'ron'},{name:'ron'},{},{age:16,name:'ron'},[{name:'ron'},{name:'ron'}]];
// console.log(_uniqueArray(arr));