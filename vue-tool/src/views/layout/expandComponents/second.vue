<template>
  <div class="my-second">
    <ajax-table :tableData="tableData" :list="list"></ajax-table>
    <div class="btns">
      <div class="arrow" @click="prev"><i class="el-icon-arrow-left"></i></div>
      <div class="text"><span>{{index}}</span>{{showPage()}}</div>
      <div class="arrow" @click="next"><i class="el-icon-arrow-right"></i></div>
    </div>
  </div>
</template>

<script>
import { pageSize } from './config'
export default {
  data() {
    return {
      tableData: {},
      index: 1
    };
  },
  props: {
    record: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    list() {
      if (this.record && this.record.length >= pageSize) {
        const list = JSON.parse(JSON.stringify(this.record))
        return list.splice((this.index-1) * pageSize, pageSize);
      } else {
        return this.record;
      }
    }
  },
  created() {
    this.tableData = {
      id: "my-second",
      arr: [
        { label: "序号", prop: "", type: "index", minWidth: 80 },
        { label: "操作人", prop: "name" },
        { label: "操作名称", prop: "type" },
        { label: "操作日期", prop: "ctime" },
      ]
    };
  },
  methods: {
    showPage () {
      const pages = Math.ceil(this.record.length / pageSize) || 1
      return `/${pages}`
    },
    prev () {
      if (this.index <= 1) {
        return
      } else {
        this.index = this.index - 1
      }
    },
    next () {
      const pages = Math.ceil(this.record.length / pageSize)
      if (this.index >= pages) {
        return
      } else {
        this.index = this.index + 1
      }
    }
  }
};
</script>

<style lang="less" scoped>
.my-second {
  position: relative;
  .btns {
    position: absolute;
    right: 0;
    top: -52px;
    z-index: 9999;
    display: flex;
    .arrow {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      background: #fff;
      border: 1px solid #C4C6CF;
      line-height: 28px;
      text-align: center;
      cursor: pointer;
    }
    .text {
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      color: #333;
      & > span {
        color: #409EFF;
      }
    }
  }
}
</style>