<template>
  <div class="line-main">
    <ajax-form :formData="formData" />
    <div
      class="myfaketable"
      style="padding-left: 8px; display: flex; justify-content: space-between"
    >
      <fake-table :itemsList="topTotalItemsList" style="width: 800px" />
      <el-checkbox
        v-model="mergeButtonFlag"
        @change="queryByStatus"
        style="line-height: 38px"
        >合并相同商品</el-checkbox
      >
    </div>
    <el-table :data="tableData" style="width: 100%" @sort-change="getSortChange">
      <el-table-column type="index" label="序号" width="100"> </el-table-column>
      <el-table-column prop="commodityCode" label="商品编码" width="180"> </el-table-column>
      <el-table-column prop="commodityName" label="商品名称" width="180"> </el-table-column>
      <el-table-column prop="commodityUnit" label="单位"> </el-table-column>
      <el-table-column prop="purchaseNum" label="数量"> </el-table-column>
      <el-table-column prop="unitPrize" label="单价" v-if="!mergeButtonFlag">
        <template slot-scope="scope">
          {{ scope.row.unitPrize | numberFix2 }}
        </template>
      </el-table-column>
      <el-table-column prop="salesLoan" label="销售货款（元）" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.salesLoan | numberFix2 }}
        </template>
      </el-table-column>
      <el-table-column prop="salesTax" label="销售税额（元）">
        <template slot-scope="scope">
          {{ scope.row.salesTax | numberFix2 }}
        </template>
      </el-table-column>
      <el-table-column prop="totalPrizeTax" label="价税合计（元）" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.totalPrizeTax | numberFix2 }}
        </template>
      </el-table-column>
    </el-table>

    <div class="mypagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import FakeTable from "@c/fakeTable";
import { fetchCommodityList } from "@/api/commodityManagement";
import { saleTotal, gatherInfo, coexport, gexport } from "@/api/orderMgrApi";
import expandMixins from "@/mixins/expand";
export default {
  name: "produceOrderSummary",
  components: {
    "fake-table": FakeTable,
  },
  data() {
    return {
      mergeButtonFlag: false,
      loading: true,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      sortForm: {
        oname: '', // 排序名称
        order: '', // 排序规则：asc：升序 desc：降序
      },
      tableData: [],
      topTotalItemsList: [],
      formData: {
        id: "searchForm",
        inline: true,
        arr: [
          {
            label: "商品编码：",
            type: "input",
            key: "ccode",
            placeholder: "请输入",
          },
          {
            label: "商品名称：",
            type: "input",
            key: "cname",
            placeholder: "请输入",
          },
          {
            label: "交付日期：",
            type: "daterange-picker",
            key: "jiaofuPeriod",
            placeholder: "请输入",
            width: "82px",
          },
          {
            label: "",
            type: "button",
            key: "",
            handles: [
              {
                type: "primary",
                rules: 47,
                text: "查询",
                fn: (row) => {
                  this.pageNum = 1;
                  this.search(row);
                },
              },
              {
                type: "",
                text: "重置",
                event: "reset",
                fn: (row) => {
                  this.reset(row);
                  this.getTopFakeInfo();
                },
              },
              {
                type: "",
                text: "导出",
                rules: 38,
                fn: (row) => {
                  this.exportData(row);
                },
              },
            ],
          },
        ],
      },
    };
  },
  mixins: [expandMixins],
  filters: {
    numberFix2(value){
      let newVal = parseFloat(value).toFixed(2);
      return newVal||'';
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getTopFakeInfo();
      this.getTableList();
    },
    queryByStatus(val) {
      console.log("当前是否选中：", val);
      // 变化了就 查询
      this.init();
    },
    search(row) {
      this.searchForm = { ...row };
      this.init();
    },
    getSortChange({column, prop, order}) {
      console.log(prop)
      this.sortForm = {
        oname: order?prop:"",
        order: order=="ascending"?"asc":order=="descending"?"desc":""
      };
      this.init();
    },
    async exportData(row) {
      this.searchForm = { ...row };
      let sdate, edate, name='', dateStr='';
      if (this.searchForm.jiaofuPeriod) {
        sdate = moment(this.searchForm.jiaofuPeriod[0]).format("YYYY-MM-DD");
        edate = moment(this.searchForm.jiaofuPeriod[1]).format("YYYY-MM-DD");
        if(sdate == edate) {
          dateStr = sdate;
        } else {
          dateStr = `${sdate}~${edate}`;
        }
      }else{
        this.$message.error("请先选择交付日期");
        return;
      }
      if(this.tableData.length == 0) {
        this.$message.error("页面内暂无信息可导出");
        return;
      }
      let exportFunc = this.mergeButtonFlag?coexport:gexport;
      const params = {
        ...this.searchForm,
        htstart: sdate,
        htend: edate,
        msame: 1
      };
      if(!this.mergeButtonFlag) delete params.msame;
      delete params.jiaofuPeriod;
      delete params.total;
      name = `汇总信息-${dateStr}${this.mergeButtonFlag?'-合并相同商品':''}`;
      try {
        await exportFunc(params, name);
      } catch (e) {
        console.log("e", e);
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTableList();
    },
    handleDetails(row) {
      this.$router.push({
        path: "/commodity/commodityList/details",
        query: {
          cid: row.cid,
        },
      });
    },
    async getTopFakeInfo() {
      let sdate, edate;
      if (this.searchForm.jiaofuPeriod) {
        sdate = moment(this.searchForm.jiaofuPeriod[0]).format("YYYY-MM-DD");
        edate = moment(this.searchForm.jiaofuPeriod[1]).format("YYYY-MM-DD");
      }
      const params = {
        ...this.searchForm,
        htstart: sdate,
        htend: edate,
      };
      delete params.jiaofuPeriod;
      delete params.total;
      try {
        const res = await saleTotal(params);
        // const { data = 0 } = res;
        console.log(res)
        this.topTotalItemsList = [
          {
            label: "总销售货款",
            value: (res||0).toFixed(2) + "元",
          },
          {
            label: "总销售税款",
            value: "0.00元",
          },
          {
            label: "总价税合计",
            value: (res||0).toFixed(2) + "元",
          },
        ];
      } catch (e) {
        console.log("e", e);
      } finally {
        this.loading = false;
      }
    },
    async getTableList() {
      let sdate, edate;
      if (this.searchForm.jiaofuPeriod) {
        sdate = moment(this.searchForm.jiaofuPeriod[0]).format("YYYY-MM-DD");
        edate = moment(this.searchForm.jiaofuPeriod[1]).format("YYYY-MM-DD");
      }
      const params = {
        ...this.searchForm,
        ...this.sortForm,
        htstart: sdate,
        htend: edate,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        msame: this.mergeButtonFlag?1:''
      };
      delete params.jiaofuPeriod;
      delete params.total;
      this.loading = true;
      try {
        const res = await gatherInfo(params);
        const { data = [], total = 0 } = res;
        this.total = total;
        this.tableData = data;
      } catch (e) {
        console.log("e", e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.mypagination {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
}
</style>
