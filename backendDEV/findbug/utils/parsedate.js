/**
 *  Printf Datetime
 *  @param {
 *    time: timeStap
 *    type: String('eg: yyyy-MM-dd') || String('timeStap') ('type is printf DateType')
 *          'yyyy, MM, M, D, DD, HH, h, mm, m, ss, s'
 *  }
 */
function _parseTime (time, type) {
  let TIME;
  try {
    TIME = new Date(Number(time));
  } catch {
    throw new Error(`The param ${JSON.stringify(time)} is not a timeStamp`);
  }
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
    return result.replace(/M/g,M).replace(/d/g,d).replace(/h/g,H).replace(/m/g,m).replace(/s/g,s);
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
 *    1 ('s > e')
 *  }
 */
function _diffDate (s,e) {
  if(typeof(s) !== "string" || typeof(e) !== "string") {
    throw new Error(`The param ${JSON.stringify(s)} or ${JSON.stringify(e)} is not a string`);
  }
  let n,m;
  try {
    n = (new Date(s)).getTime();
    m = (new Date(e)).getTime();
    if(isNaN(n) || isNaN(m)) {
      throw new Error(`The param ${JSON.stringify(s)} or ${JSON.stringify(e)} is not a DateType`);
    }
  } catch {
    throw new Error(`The param ${JSON.stringify(s)} or ${JSON.stringify(e)} is not a DateType`);
  }
  if(n < m) {
    return -1;
  } else if (n == m) {
    return 0;
  } else if (n > m) {
    return 1;
  } else {
    throw new Error(`Invaildy Error`);
  }
}

module.exports = {
  _parseTime,
  _diffDate
}