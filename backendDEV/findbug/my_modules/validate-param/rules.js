// 日志列表API: pc/getInfoList
const getInfoList = {
  pageNum: {
    require: false,
    default: 1,
    type: 'String'
  },
  pageSize: {
    require: false,
    default: 10,
    type: 'String'
  },
  startDate: {
    require: false,
    default: "",
    type: 'String',
    dateType: true
  }
}

module.exports = {
  getInfoList
}