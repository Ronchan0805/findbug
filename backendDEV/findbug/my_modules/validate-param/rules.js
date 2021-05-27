// 日志列表API: pc/getInfoList
const getInfoList = {
  pageNum: {
    require: false,
    default: 1,
    type: 'Number',
    isInt: true
  },
  pageSize: {
    require: false,
    default: 10,
    type: 'Number',
    isInt: true
  },
  startDate: {
    require: false,
    type: 'String',
    dateType: true
  },
  endDate: {
    require: false,
    type: 'String',
    dateType: true
  }
}

module.exports = {
  getInfoList
}