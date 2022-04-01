<template>
  <div class="distribution-container">
    <div class="my-form">
      <ajax-form :formData="formData"></ajax-form>
    </div>
    <div class="my-table">
      <!-- <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="交付日期" prop="htime" > </el-table-column>
        <el-table-column prop="lname" label="线路名称"> </el-table-column>
        <el-table-column prop="drname" label="司机" > </el-table-column>
        <el-table-column prop="doname" label="装卸工"> </el-table-column>
        <el-table-column prop="onumber" label="订单数" > </el-table-column>
        <el-table-column prop="cnum" label="商品总件数" > </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="showDetails(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table> -->
      <my-table
        :loading="loading"
        :list="list"
        :tableData="tableData"
        :listState="pageState"
        :isPager="true"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        @select="handleSelectionChange"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import MyTable from "@c/myTable";
import expandMixins from "@/mixins/expand";
import { fetchDeliveryRouteList, xianluBatchExport } from "@/api/distributetApi";
export default {
  name: "distribution",
  components: {
    "my-table": MyTable,
  },
  data() {
    return {
      loading: false,
      batchList: [],
      list: [],
      formData: {
        id: "searchForm",
        inline: true,
        arr: [
          {
            label: "交付日期：",
            type: "daterange-picker",
            key: "queryPeriod",
            placeholder: "请输入",
            width: "82px",
          },
          {
            label: "司机：",
            type: "input",
            key: "drname",
            placeholder: "请输入",
            width: "68px",
          },
          {
            label: "装卸工：",
            type: "input",
            key: "doname",
            placeholder: "请输入",
            width: "68px",
          },
          {
            label: "",
            type: "button",
            key: "",
            handles: [
              {
                type: "primary",
                rules: 45,
                text: "查询",
                fn: (row) => {
                  this.pageState.pageNum = 1;
                  this.search(row);
                },
              },
              {
                type: "",
                text: "重置",
                event: "reset",
                fn: (row) => {
                  this.reset(row);
                },
              },
              {
                type: "",
                text: "导出",
                event: "reset",
                fn: (row) => {
                  this.handleExport();
                },
              },
            ],
          },
        ],
      },
    };
  },
  mixins: [expandMixins],
  created() {
    this.init();
    this.tableData = {
      // id: "",
      // showSelection: true,
      arr: [
        { label: "", prop: "", type: "selection", minWidth: "50px" },
        { label: "序号", type: "index", minWidth: "60px" },
        { label: "交付日期", prop: "htime", minWidth: "140px" },
        { label: "线路名称", prop: "lname" },
        { label: "司机", prop: "drname" },
        { label: "装卸工", prop: "doname" },
        { label: "订单数", prop: "onumber", minWidth: "130px" },
        { label: "商品总件数", prop: "cnum", sortable: true },

        {
          label: "操作",
          type: "handle",

          minWidth: "120px",
          handles: [
            {
              text: "详情",
              type: "text",
              rules: 32,
              fn: (index, row) => this.showDetails(row),
            },
          ],
        },
      ],
    };
  },
  methods: {
    init() {
      this.getTableList();
    },
    handleSelectionChange(val) {
      this.batchList = val;
    },
    async handleExport() {
      try {
        if (this.batchList.length === 0) {
          this.$message.warning("请先选择要导出的送货表");
        }
        const params = {
          hdates: this.batchList
            .map((item) => {
              return item.htime;
            })
            .join(","),
          lids: this.batchList
            .map((item) => {
              return item.dlid;
            })
            .join(","),
        };

        let currentDate = new Date();
        const excelName = "线路送货表-" + moment(currentDate).format("YYYYMMDD");
        await xianluBatchExport(params, excelName);
      } catch (e) {}
    },

    showDetails(row) {
      this.$router.push({
        path: "/orderManagement/orderList/route-details",
        query: {
          lid: row.dlid,
          htime: row.htime,
        },
      });
    },
    search(row) {
      this.searchForm = { ...row };
      this.getTableList();
    },
    async getTableList() {
      let htstart = "",
        htend = "";
      if (this.searchForm && this.searchForm.queryPeriod) {
        htstart = moment(this.searchForm.queryPeriod[0]).format("YYYY-MM-DD");
        htend = moment(this.searchForm.queryPeriod[1]).format("YYYY-MM-DD");
      }
      const params = {
        ...this.pageState,
        ...this.searchForm,
        htstart: htstart,
        htend: htend,
      };

      try {
        const res = await fetchDeliveryRouteList(params);
        this.pageState = {
          ...this.pageState,
          total: res.total,
        };
        console.log("线路配送返回结果是：", res);
        this.list = res.data.map((item) => {
          return {
            ...item,
          };
        });
        // this.loading = false;
      } catch (e) {
      } finally {
      }
    },
  },
};
</script>

<style lang="less" scoped>
.distribution-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .my-form {
    display: flex;
  }
  .my-table {
    height: 100%;
    padding-top: 20px;
  }
}
</style>
