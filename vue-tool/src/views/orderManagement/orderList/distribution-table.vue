<template>
  <div class="distribution-container">
    <div class="my-form">
      <ajax-form :formData="formData" ref="my-ajax"></ajax-form>
    </div>
    <div class="my-table">
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
import { fetchDistribution, peihuobiaoBatchExport } from "@/api/distributetApi";
export default {
  name: "distribution",
  components: {
    "my-table": MyTable,
  },
  data() {
    return {
      loading: false,
      list: [],
      batchList: [], //批量导出
      queryPeriod: [],
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
            label: "配货员：",
            type: "input",
            key: "dname",
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
                rules: 44,
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
                rules:27,
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
    this.tableData = {
      //   id: "did",
      showSelection: false, // 可以控制弹出框，提示不显示
      arr: [
        { label: "", prop: "", type: "selection", minWidth: "50px" },
        { label: "序号", type: "index", minWidth: "60px" },
        { label: "交付日期", prop: "htime" },
        { label: "配货员", prop: "dname" },
        { label: "订单数", prop: "onumber", sortable: true },
        { label: "商品总件数", prop: "cnum", sortable: true },

        {
          label: "操作",
          type: "handle",

          minWidth: "120px",
          handles: [
            {
              text: "详情",
              type: "text",
              rules: 28,
              fn: (index, row) => this.showDetails(row),
            },
          ],
        },
      ],
    };
    this.init();
  },
  methods: {
    init() {
      this.getTableList();
    },
    handleSelectionChange(val) {
      this.batchList = val;
      console.log("打印当前选中的：", this.batchList);
    },
    async handleExport() {
      try {
        if (this.batchList.length === 0) {
          this.$message.warning("请先选择要导出的配货表");
          return;
        }
        // const params = this.batchList.map((item) => {
        // return {
        //   disid: item.did,
        //   htime: item.htime,
        // };

        // });

        const params = {
          hdates: this.batchList
            .map((item) => {
              return item.htime;
            })
            .join(","),
          disids: this.batchList
            .map((item) => {
              return item.did;
            })
            .join(","),
        };

        let currentDate = new Date();
        const excelName = "配货表-" + moment(currentDate).format("YYYYMMDD");
        await peihuobiaoBatchExport(params, excelName);
      } catch (e) {}
    },
    showDetails(row) {
      this.$router.push({
        path: "/orderManagement/orderList/distribution-details",
        query: {
          did: row.did,
          hdate: row.htime,
        },
      });
    },
    search(row) {
      this.searchForm = { ...row };
      this.getTableList();
    },
    async getTableList() {
      console.log("this.searchForm.queryPeriod：", this.searchForm.queryPeriod);

      let htstart = "",
        htend = "";
      if (this.searchForm.queryPeriod) {
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
        const res = await fetchDistribution(params);
        this.pageState = {
          ...this.pageState,
          total: res.total,
        };
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
