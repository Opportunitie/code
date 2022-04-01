<template>
  <div class="my-label-entry" ref="labelEntry">
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
            <span>{{(scope.row.pdate && scope.row.pdate.split(' ')[0]) || '-'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pbatch" label="批号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="num" label="数量(个)" width="80"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: true,
      tableH: undefined
    };
  },
  computed: {
    ...mapState({
      drawerInfos: state => state.drawer.drawerInfos,
      labellist: state => state.drawer.labellist
    }),
  },
  watch: {
    "drawerInfos.rbid"(val) {
      this.getLabelListfn();
      this.showSuccess = false;
    }
  },
  created() {
    this.getLabelListfn();
  },
  mounted() {
    this.caleTableHeight();
  },
  methods: {
    ...mapActions([
      "getLabelList"
    ]),
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
    caleTableHeight() {
      try {
        const Rect = this.$refs.labelEntry.getBoundingClientRect();
        this.tableH = Rect.height
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
    }
  }
};
</script>

<style lang="less" scoped>
.my-label-entry {
  height: 100%;
  flex: 1;
  /deep/ .el-table__footer .cell {
    text-align: center;
  }
}
</style>
