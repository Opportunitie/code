<template>
  <div class="my-third">
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
    print: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    list() {
      if (this.print && this.print.length >= pageSize) {
        const list = JSON.parse(JSON.stringify(this.print))
        return list.splice((this.index-1) * pageSize, pageSize);
      } else {
        return this.print;
      }
    }
  },
  created() {
    this.tableData = {
      id: "my-third",
      arr: [
        { label: "package ID", prop: "pid" },
        { label: "打印物料数(个)", prop: "num" },
        { label: "关联package ID", prop: "rpid" },
        { label: "打印时间", prop: "ctime" },
        { 
            label: '操作',
            type: 'handle',
            width: '300', 
            handles: [
                { text: '重新打印', type: 'text', fn: (index, row) => this.printfn(row), }
            ]
        }
      ]
    };
  },
  methods: {
    showPage () {
      const pages = Math.ceil(this.print.length / pageSize) || 1
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
      const pages = Math.ceil(this.print.length / pageSize)
      if (this.index >= pages) {
        return
      } else {
        this.index = this.index + 1
      }
    },
    printfn (row) {
      console.log(row)
    }
  }
};
</script>

<style lang="less" scoped>
.my-third {
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