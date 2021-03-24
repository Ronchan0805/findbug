<template>
  <div id="index">

    <div class="head">
      <span class="title">开发调试平台</span>
    </div>

    <div id="main" class="main">
      <div class="tit">
        <p>实时日志</p>
        <el-button type="primary">点击查询</el-button>
      </div>
      <div class="sec">
        <div class="item">
          <p>时间段:</p>
          <el-date-picker
            v-model="searchForm.date"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MMM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      searchForm: {
        date: ''
      }
    }
  },
  mounted () {
    console.log(document.getElementById('main'))
  }
}
</script>
<style lang="scss">
  #index {
    background-color: #ececec;
    height: 100%;

    .head {
      width: 100%;
      height: 60px;
      line-height: 60px;
      background-color: #fff;
      box-shadow: 0 0 6px rgba(0, 0, 0, .15);
      text-align: center;
      .title {
        color: #f75454;
        font-size: 23px;
      }
    }

    .main {
      width: 90%;
      min-height: 80vh;
      margin: 0 auto;
      background-color: #fff;
      position: relative;
      top: 10px;
      box-shadow: 0 0 6px rgba(0, 0, 0, .15);
      padding: 15px;
      box-sizing: border-box;

      .tit {
        display:flex;
        justify-content: space-between;
      }

      .sec {
        .item {
          max-width: 600px;
          height: 32px;
          line-height: 32px;
          display: flex;
          justify-content: space-around;
          align-content: center;
          margin: 10px 0;
        }
      }
    }
  }
  .el-range-editor.el-input__inner {
    width: 80%;
    height: 32px;
    line-height: 32px;
  }
  .el-input__icon,.el-date-editor .el-range-separator {
    height: auto !important;
  }
  .el-button {
    padding: 10px;
  }
</style>
