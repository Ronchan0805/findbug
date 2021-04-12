/**
 *  输出当前时间
 *  @param {
 *    type: String('eg: yyyy-MM-dd') || String('timeStap')
 *  }
 */
let nowDate = function (type) {
  const TIME = new Date();
  if(type == 'timeStap') {
    return TIME.getTime();
  } else {
    let Y = TIME.getFullYear();
    let M = TIME.getMonth() + 1;
    let MM = (TIME.getMonth() + 1) < 10?'0'+(TIME.getMonth()+1):TIME.getMonth()+1;
    let d = TIME.getDate();
    let dd = TIME.getDate() < 10?'0'+TIME.getDate():TIME.getDate();
    let H = TIME.getHours();
    let HH = TIME.getHours() < 10?'0'+TIME.getHours():TIME.getHours();
    let m = TIME.getMinutes();
    let mm = TIME.getMinutes() < 10?'0'+TIME.getMinutes():TIME.getMinutes();
    let s = TIME.getSeconds();
    let ss = TIME.getSeconds() < 10?'0'+TIME.getSeconds():TIME.getSeconds();
    let result = type.replace(/yyyy|MM|dd|HH|mm|ss/g, function(matchStr) {
      let tokenMap = {
          'yyyy': Y,
          'MM': MM,
          'dd': dd,
          'HH': HH,
          'mm': mm,
          'ss': ss
      };
      return tokenMap[matchStr];
    });
    return result.replace(/M/g,M).replace(/d/g,d).replace(/H/g,H).replace(/m/g,m).replace(/s/g,s);
  }
}

module.exports = {
  nowDate
}