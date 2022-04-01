<template>
  <div class="my-label-entry" ref="labelEntry" v-if="!showSuccess">
    <div class="header">
      <span class="label">扫码录入：</span>
      <el-input
        ref="tInput"
        style="width: 272px"
        placeholder="点击开始扫描"
        v-model="scanId"
        @change="onSubScan"
      >
        <div slot="suffix" class="saomiao" @click.prevent="beginInput"></div>
      </el-input>
      <span class="plant" @click="openPrint = !openPrint">点我添加打印PID</span>
    </div>
    <div class="print-box" v-show="openPrint">
      <my-print :drawer="drawer" @printSuccess="printSuccess" />
      <div class="print-box__arrow"></div>
    </div>
    <div class="tips" v-show="!openPrint">注意：如需重新打印，可鼠标悬停在新增行选择打印机重打</div>
    <div class="table" ref="table">
      <el-table
        :header-cell-style="{ background:'#fafafa', color:'#606266', textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        :data="labellist"
        show-summary
        :summary-method="summaryMethod"
        ref="labelTable"
        row-key="pid"
        style="width: 100%"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        v-loading="loading"
        :max-height="tableH"
      >
        <el-table-column prop="pid" label="PID" width="130">
          <template slot-scope="scope">
            <span style="color: #1677ff">{{ scope.row.pid }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pdate" label="生产日期" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.pdate.split(' ')[0] || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pbatch" label="批号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="num" label="数量(个)" width="80"></el-table-column>
        <el-table-column v-if="!canPrint" width="60">
          <template slot-scope="scope">
            <div class="print-action" v-show="highlight.includes(scope.row.pid)">
              <el-tooltip class="item" effect="dark" content="重新打印" placement="top">
                <i class="el-icon-printer"></i>
              </el-tooltip>
              <i class="el-icon-delete" @click="showDelete($event,scope.row)"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="actions">
      <el-button :disabled="canScan" type="primary" @click="finishScan">录入完成</el-button>
      <p v-if="canScan" style="color: red;margin-top: 10px">由于PID数量总计小于录入物料总数，无法报检</p>
    </div>
  </div>
  <div v-else class="my-label-success">
    <img src="@/assets/poSheet/success.png" />
    <h3>录入成功</h3>
    <p>您的物料PID已成功录入</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { insertRecordLabel, finishLabelListApi } from "@/api/api";
import MyPrint from "./print";
export default {
  props: {
    infos: {
      type: Object,
      default: () => {
        return {
          mno: "",
          mname: "",
          type: "",
          anum: ""
        };
      }
    },
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scanId: "",
      canPrint: false,
      openPrint: false,
      showSuccess: false,
      loading: true,
      tableH: undefined,
      showSuccTimer: null
    };
  },
  components: {
    MyPrint
  },
  computed: {
    ...mapState({
      highlight1: state => state.drawer.highlight1,
      highlight2: state => state.drawer.highlight2,
      drawerInfos: state => state.drawer.drawerInfos,
      labellist: state => state.drawer.labellist
    }),
    highlight() {
      return [...this.highlight1, ...this.highlight2];
    },
    canScan() {
      const { drawerInfos, labellist } = this;
      const max = drawerInfos.anum || 999999999;
      let now = 0;
      labellist &&
        labellist.map(item => {
          now += item.num;
        });
      if (now >= max) {
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    "drawerInfos.rbid"(val) {
      this.getLabelListfn();
      this.showSuccess = false;
    },
    "openPrint"() {
      this.caleTableHeight();
    },
    "drawer"(val) {
      if (!val) {
        this.scanId = "";
        this.canPrint = false;
        this.openPrint = false;
        this.showSuccess = false;
        clearTimeout(this.showSuccTimer)
      }
    }
  },
  created() {
    this.getLabelListfn();
    this.showSuccess = false;
  },
  mounted() {
    this.caleTableHeight();
  },
  methods: {
    ...mapActions([
      "showDrawerDelete",
      "setHighlight1",
      "setHighlight2",
      "getLabelList"
    ]),
    beginInput() {
      this.$refs.tInput.focus();
    },
    cellMouseEnter(row, column, cell, event) {
      const params = [row.pid];
      this.setHighlight1(params);
    },
    cellMouseLeave(row, column, cell, event) {
      this.setHighlight1([]);
    },
    showDelete(e, row) {
      const domRect = e.target.getBoundingClientRect();
      const params = {
        top: domRect.y - 106,
        left: domRect.x - 160,
        row,
        show: true
      };
      // 保持高亮
      const params1 = [row.pid];
      this.setHighlight2(params1);
      this.showDrawerDelete(params);
    },
    async getLabelListfn() {
      const params = {
        rbid: this.drawerInfos.rbid
      };
      this.loading = true;
      try {
        await this.getLabelList(params);
      } catch (e) {
      } finally {
        this.loading = false;
      }
    },
    async onSubScan() {
      if (this.scanId) {
        const params = {
          scode: this.scanId,
          rbid: this.drawerInfos.rbid
        };
        try {
          await insertRecordLabel(params);
          this.$refs.tInput.select();
          this.getLabelListfn();
        } catch (e) {
          console.log(e);
        }
      }
    },
    async finishScan() {
      try {
        const { rbid } = this.drawerInfos;
        await finishLabelListApi({ rbid });
        this.showSuccess = true;
        this.$emit("success");
        this.showSuccTimer = setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      } catch (e) {}
    },
    caleTableHeight() {
      try {
        const Rect = this.$refs.labelEntry.getBoundingClientRect();
        if (!this.openPrint) {
          this.tableH = Rect.height - 86 - 16 - 32;
        } else {
          this.tableH = Rect.height - 86 - 289;
        }
      } catch (e) {}
    },
    summaryMethod({ columns, data }) {
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        if (index === 3) {
          const values = data.map(item => Number(item[column.property]));
          sums[index] = values.reduce((prev, curr) => {
            return prev + curr;
          }, 0);
        }
      });
      return sums;
    },
    printSuccess() {
      console.log('xxxx')
      this.openPrint = false
    }
  }
};
</script>

<style lang="less" scoped>
.my-label-entry {
  height: 100%;
  flex: 1;
  .header {
    position: relative;
    margin-bottom: 16px;
    .label {
      font-size: 14px;
      line-height: 32px;
      color: black;
    }
    .saomiao {
      margin-top: 9px;
      margin-right: 4px;
      cursor: pointer;
      width: 14px;
      height: 14px;
      background-size: cover;
      background-image: url("../../assets/poSheet/saomiao.png");
    }
    .plant {
      position: absolute;
      font-size: 14px;
      color: #1677ff;
      text-decoration: underline;
      line-height: 14px;
      right: 0;
      bottom: 0;
      cursor: pointer;
      user-select: none;
    }
  }
  .print-box {
    flex: 1;
    margin-bottom: 16px;
    width: 100%;
    background: #f5f5f5;
    position: relative;
    border-radius: 4px;
    padding: 16px;
    box-sizing: border-box;
    &__arrow {
      position: absolute;
      top: 1px;
      right: 56px;
      margin-right: 3px;
      border-top-color: #ebeef5;
      border-bottom-width: 0;
      border-width: 6px;
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
    }
    &__arrow::after {
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      z-index: 4001;
      content: " ";
      border-width: 8px;
      bottom: 1px;
      border-bottom-color: #f5f5f5;
      border-top-width: 0;
    }
  }
  .tips {
    font-size: 14px;
    color: #ff6010;
    text-align: left;
    line-height: 22px;
    margin-bottom: 16px;
  }
  .table {
    .print-action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      i {
        cursor: pointer;
      }
    }
  }
  .actions {
    margin: 16px 0 0;
  }

  .hignlight-row {
    background: rgba(22, 119, 255, 0.1);
  }

  /deep/ .el-table__footer .cell {
    text-align: center;
  }
}
.my-label-success {
  text-align: center;
  & > h3 {
    font-size: 20px;
    line-height: 28px;
    margin: 14px 0 10px 0;
    color: #333;
  }
  & > p {
    font-size: 14px;
    color: #666;
    line-height: 22px;
  }
}
.el-icon-printer:hover{
  color: #409EFF;
}

.el-icon-delete:hover{
  color: #409EFF;
}
</style>
