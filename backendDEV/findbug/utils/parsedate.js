/**
 *  Printf now Datetime
 *  @param {
 *    type: String('eg: yyyy-MM-dd') || String('timeStap') ('type is printf DateType')
 *  }
 */
let _nowDate = function (type) {
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

/**
 *  Diff startDate and endDate
 *  @param {
 *    startDate: String|timeStap ('The Param must be yyyy-MM-dd HH:mm:ss Or timeStap')
 *    endDate:   String|timeStap
 *  }
 *  @returns {
 *    0 ('s = e'),
 *    -1 ('s < e'),
 *    1 ('s > e'),
 *    'err' ('Error')
 *  }
 */
let _diffDate = function (s,e) {
  if(typeof(s) !== "string" || typeof(e) !== "string") {
    return new Error(`The param ${s} or ${e} is not a string`);
  }
  let n,m;
  try {
    n = (new Date(s)).getTime();
    m = (new Date(e)).getTime();
    if(isNaN(n) || isNaN(m)) {
      return new Error(`The param ${s} or ${e} is not a DateType`);
    }
  } catch {
    return new Error(`The param ${s} or ${e} is not a DateType`);
  }
  if(n < m) {
    return -1;
  } else if (n == m) {
    return 0;
  } else if (n > m) {
    return 1;
  } else {
    return new Error(`Invaildy Error`);
  }
}

module.exports = {
  _nowDate,
  _diffDate
}