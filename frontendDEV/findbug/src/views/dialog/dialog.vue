<template>
  <el-dialog
    title="提示"
    :visible.sync="isShow"
    width="80%"
    :before-close="handleClose">
    <div class="box">
      <div class="item_01">
        <p class="tit">日志日期：</p>
        <p>{{log.date}}</p>
      </div>
      <div class="item_02">
        <p class="tit">来源IP：</p>
        <p>{{log.ip}}</p>
      </div>
      <div class="item_03">
        <p class="tit">日志内容：</p>
        <div style="overflow-x:auto;">{{log.content}}</div>
      </div>
    </div>
    <span slot="footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        log: {
          date: '2021-03-26 00:00:00',
          ip: '172.81.252.202',
          content: '日志内容于2021年3月26日生产，暂未发现错误。。。。。。。。。。。。。。。。。。。。。。。。。。。'
        }
      }
    },
    methods: {
      handleClose() {
        this.$emit('closeDia','');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    height: 300px;
    overflow-y: scroll;
    border: 1px solid black;
    .item_01,.item_02,.item_03 {
      display: flex;
      margin: 10px 0;
      .tit {
        min-width: 90px;
        font-weight: bold;
      }
    }
  }
</style>
