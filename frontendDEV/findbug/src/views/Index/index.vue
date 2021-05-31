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
          <p style="min-width:80px;">时间段:</p>
          <el-date-picker
            v-if="!isSmallScreen"
            v-model="searchForm.date"
            type="datetimerange"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MMM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <div class="box" v-if="isSmallScreen">
            <el-date-picker v-model="searchForm.startDate" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="开始日期"></el-date-picker>
            <p style="height:5px;"></p>
            <el-date-picker v-model="searchForm.endDate" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="结束日期"></el-date-picker>
          </div>
        </div>
      </div>
      <!-- 表格数据 -->
      <el-table :data="tableData" style="width:100%" border>
        <el-table-column prop="date" label="日期" :width="tableAdaptive.date"></el-table-column>
        <el-table-column prop="ip" label="IP地址" :width="tableAdaptive.ip"></el-table-column>
        <el-table-column prop="log" label="日志内容" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="操作" :width="tableAdaptive.operate" fixed="right">
          <template slot-scope="scope">
            <div class="scope">
              <p @click="handleDetail(scope.row)">详情</p>
              <p @click="handleDelete(scope.row)">删除</p>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页器 -->
      <div class="rc_pagination">
        <el-pagination
          :small="isSmallScreen"
          background layout="prev, pager, next"
          :total="page.total"
          :pager-count="7"
          @current-change="handleCurrentPage"
        ></el-pagination>
      </div>
    </div>

    <!-- 对话框 -->
    <Dialog :isShow="isDiaShow" @closeDia="handleCloseDia"></Dialog>
  </div>
</template>

<script>
import Dialog from '../dialog/dialog.vue'
export default {
  components: {
      Dialog
  },
  data () {
    return {
      isSmallScreen: false, // 小屏适应 - 筛选条件
      tableAdaptive: {
        date: 110,
        ip: 100,
        operate: 90
      }, // 小屏适应 - 单元格
      page: {
        pageNum: 1,
        pageSize: 8,
        total: 300
      },
      searchForm: {
        date: '',
        startDate: "",
        endDate: ""
      },
      tableData: [
        {id: 0, date: '2021-12-25 23:00:00', log: '这是一段很长很长很长的错误内容', ip: '172.81.252.202'},
        {id: 1, date: '2021-12-26 23:00:00', log: '这是一段很长很长很长的错误内容', ip: '172.81.252.202'},
        {id: 2, date: '2021-12-27 23:00:00', log: '这是一段很长很长很长的错误内容', ip: '172.81.252.202'}
      ],
      isDiaShow: false, // 对话框显示隐藏
    }
  },

  beforeMount() {
    this.adaptiveClientWidth();
  },

  methods: {
    // 详情
    handleDetail (row) {
      this.isDiaShow = true;
      console.log('详情按钮点击',row);
    },
    // 编辑
    handleDelete (row) {
      console.log('删除按钮点击',row);
    },
    // 对话框关闭回调 （子组件通信事件）
    handleCloseDia (param) {
      this.isDiaShow = false;
      console.log('子组件请求关闭对话框',param);
    },
    // 分页器当前页改变
    handleCurrentPage (v) {
      console.log('这是当前页:',v);
    },
    // 客户端宽度功能自适应
    adaptiveClientWidth () {
      const CWIDTH = document.body.clientWidth;
      if(CWIDTH <= 670) {
        this.isSmallScreen = true;
        this.tableAdaptive = {
          ...this.tableAdaptive
        }
      } else {
        this.isSmallScreen = false;
        this.tableAdaptive = {
          ...this.tableAdaptive,
          date: 180,
          ip: 170,
          operate: 110
        }
      }
    }
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
        margin-bottom: 15px;
        .item {
          max-width: 600px;
          line-height: 32px;
          display: flex;
          justify-content: space-around;
          align-content: center;
          margin: 10px 0;
        }
      }
    }

    .scope {
      display: flex;
      justify-content: space-around;
      align-content: center;
      p {
        cursor: pointer;
      }
      p:nth-child(1) {
        color: #eea010;
      }
      p:nth-child(2) {
        color: #f75454;
      }
    }
    .rc_pagination {
      text-align: right;
      margin-top: 15px;
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
