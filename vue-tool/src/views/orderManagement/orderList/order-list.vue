<template>
  <div class="order-list">
    <div class="my-form">
      <ajax-form :formData="formData" ref="myform"></ajax-form>
    </div>
    <div class="my-actions">
      <div class="myfaketable" style="padding-left: 8px">
        <fake-table :itemsList="topTotalItemsList" />
      </div>

      <div class="my-btns">
        <el-dropdown trigger="click" placement="bottom" @click.native="handlePrint">
          <el-button size="small" :disabled="multipleSelection.length == 0">
            打印销售发票
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-rules="20">
              <router-link
                style="color: inherit"
                tag="a"
                target="_blank"
                :to="{
                  path: '/printPreview',
                  query: { list: listStr, type: 'hasPrice' },
                }"
                >销售发票（有价格）</router-link
              >
            </el-dropdown-item>
            <el-dropdown-item v-rules="21">
              <router-link
                style="color: inherit"
                tag="a"
                target="_blank"
                :to="{
                  path: '/printPreview',
                  query: { list: listStr, type: 'hasNoPrice' },
                }"
                >销售发票（无价格）</router-link
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown trigger="click" placement="bottom">
          <el-button v-rules="17" size="small">
            导出
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="handleExportAll" v-rules="40"
              >导出订单列表</el-dropdown-item
            >
            <div @click="handleExportPreview">
              <el-dropdown-item
                v-rules="18"
                @click.native="handleExport"
                :disabled="multipleSelection.length == 0 && !searchForm.jiaofuPeriod"
                >销售发票（有价格）</el-dropdown-item
              >
              <el-dropdown-item
                v-rules="19"
                @click.native="handleExport('noPrice')"
                :disabled="multipleSelection.length == 0 && !searchForm.jiaofuPeriod"
                >销售发票（无价格）</el-dropdown-item
              >
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button type="primary" size="small" @click="handleXiadan" v-rules="12"
          >代下单</el-button
        >
        <el-button
          type=""
          :disabled="asyncFlag"
          size="small"
          @click="handleAsyncToJD"
          v-rules="12"
          style="margin-left: 0"
          >同步至金蝶</el-button
        >
      </div>
    </div>
    <div class="my-table">
      <el-table
        ref="multipleOrderTable"
        :data="tableData"
        style="width: 100%"
        :cell-style="{ height: '51px' }"
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" :reserve-selection="true">
        </el-table-column>
        <el-table-column type="index" label="序号" width="50"> </el-table-column>
        <el-table-column prop="ono" label="订单号" width="280">
          <template slot-scope="scope">
            <div class="table-badge">
              <div>{{ scope.row.ono }}</div>
              <div>
                <el-badge value="有更新" class="item" v-if="scope.row.hconfirmed === 2">
                </el-badge>
                <el-badge value="有备注" class="item" v-if="scope.row.cremark">
                </el-badge>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="otime" label="下单时间" width="180"> </el-table-column>
        <el-table-column label="客户名称">
          <template slot-scope="scope">
            <div class="table-cname">
              <div style="padding-right: 4px; line-height: 16px; text-align: center">
                {{ scope.row.cname }}
              </div>
              <img
                v-if="scope.row.bcustom === 1"
                src="../../../assets/rxe/favourite.png"
                style="height: 16px; width: 19px"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="tprize" label="订单金额（元）" sortable> </el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            <span v-if="scope.row.ostatus === 1">已提交</span>
            <span v-if="scope.row.ostatus === 2">已签收</span>
            <span v-if="scope.row.ostatus === 3" style="color: red">已作废</span>
          </template>
        </el-table-column>

        <el-table-column label="金蝶同步结果">
          <template slot-scope="scope">
            <span v-if="scope.row.aresult === 1" style="color: red">未同步</span>
            <span v-if="scope.row.aresult === 2">成功</span>
            <span v-if="scope.row.aresult === 3" style="color: red">失败</span>
            <span v-if="scope.row.aresult === null" style="color: red">--</span>
          </template>
        </el-table-column>
        <el-table-column prop="htime" label="交付日期"> </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              v-rules="13"
              size="mini"
              v-if="scope.row.ostatus !== 3"
              type="text"
              @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button
              v-rules="14"
              v-if="scope.row.ostatus !== 3"
              size="mini"
              type="text"
              @click="handleDiscard(scope.row)"
              >作废</el-button
            >
            <el-button
              v-rules="11"
              size="mini"
              type="text"
              @click="handleDetails(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <el-dialog title="作废" :visible.sync="zuofeiVisiable" width="640px">
      <div style="padding-bottom: 16px">
        <span style="padding-left: 16px; padding-bottom: 16px">是否确认作废该订单？</span>
      </div>

      <el-form
        :model="zuofeiForm"
        :rules="zuofeiRule"
        label-width="110px"
        ref="zuofeiForm"
        label-suffix="："
      >
        <el-form-item label="作废原因" prop="dreason">
          <el-input
            type="textarea"
            placeholder="请输入"
            :rows="7"
            maxlength="200"
            show-word-limit
            v-model="zuofeiForm.dreason"
          ></el-input>
          <span>操作成功后用户也可以看到作废原因</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitZuofei('zuofeiForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import FakeTable from "@c/fakeTable";
import moment from "moment";
import {
  fetchOrderList,
  setOrderDiscard,
  exportInvoice,
  exportInvoiceNoPrice,
  exportOrderToExcel,
  fetchOrderToPInfo,
  asyncToJD,
} from "@/api/orderMgrApi";
import expandMixins from "@/mixins/expand";
const orderStatusMap = [
  // { label: "全部", value: 0 },
  { label: "已提交", value: 1 },
  { label: "已签收", value: 2 },
  { label: "已作废", value: 3 },
];
const priceAble = [
  // { label: "全部", value: 0 },
  { label: "是", value: 1 },
  { label: "否", value: 2 },
];
const asyncResult = [
  { label: "未同步", value: 1 },
  { label: "成功", value: 2 },
  { label: "失败", value: 3 },
];
export default {
  name: "orderlist",
  components: {
    "fake-table": FakeTable,
  },
  data() {
    return {
      topTotalItemsList: [],
      cnum: "", // 已提交
      unum: "", // 未提交
      dnum: "", // 作废数量
      oid: "", // 作废oid
      timerRefreshData: null,

      zuofeiVisiable: false,
      zuofeiForm: {
        dreason: "",
      },

      zuofeiRule: {
        dreason: [
          {
            required: true,
            message: "请输入作废原因",
            trigger: "blur",
          },
        ],
      },
      status: 0,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      formData: {
        id: "searchForm",
        inline: true,
        arr: [
          {
            label: "订单号：",
            type: "input",
            key: "ono",
            placeholder: "请输入",
            width: "68px",
          },
          {
            label: "客户名称：",
            type: "input",
            key: "cname",
            placeholder: "请输入",
            width: "82px",
          },
          {
            label: "订单状态：",
            type: "select",
            key: "ostatus",
            placeholder: "请选择",
            option: orderStatusMap,
          },
          {
            label: "是否自定义价格：",
            type: "select",
            key: "bcustom",
            placeholder: "请选择",
            option: priceAble,
          },
          {
            label: "下单时间：",
            type: "daterange-picker",
            key: "xiadanPeriod",
            placeholder: "请输入",
            width: "82px",
          },

          {
            label: "交付日期：",
            type: "daterange-picker",
            key: "jiaofuPeriod",
            placeholder: "请输入",
            width: "82px",
          },

          {
            label: "金蝶同步结果：",
            type: "select",
            key: "aresult",
            placeholder: "请选择",
            option: asyncResult,
          },

          {
            label: "",
            type: "button",
            key: "",
            handles: [
              {
                type: "primary",
                rules: 39,
                text: "查询",
                fn: (row) => {
                  this.pageNum = 1;
                  this.toggleSelection();
                  this.search(row);
                  this.getTopInfo();
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
            ],
          },
        ],
      },
      tableData: [],
      multipleSelection: [], // 列表选择
      asyncFlag: true,
      listStr: "", //
    };
  },
  mixins: [expandMixins],
  beforeDestroy() {
    clearInterval(this.timerRefreshData);
  },
  created() {
    this.getTopInfo();
    this.init();
    this.timer();
  },
  methods: {
    async handleAsyncToJD() {
      let orders = [];
      orders = this.multipleSelection.filter((item) => {
        return item.aresult !== 2;
      });
      if (orders.length) {
        const orderIds = orders.map((item) => {
          return item.oid;
        });
        const params = {
          orderIds: orderIds,
        };

        await this.$confirm(
          "是否确定同步至金蝶？<br><span style='color:#FFA652'>注意：本次仅同步已签收且同步失败的订单。</span>",
          "同步至金蝶",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            closeOnClickModal: false,
            dangerouslyUseHTMLString: true,
          }
        );

        await asyncToJD(params);
        this.$message.success("同步成功");
        this.init();
        this.toggleSelection();
      } else {
        this.$message.warning("请勾选未同步或者同步失败的订单");
      }
    },
    handleXiadan() {
      this.$router.push({
        path: "/orderManagement/orderList/substitute",
      });
    },
    getRowKeys(row) {
      return row.oid;
    },
    toggleSelection() {
      this.$refs.multipleOrderTable.clearSelection();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.asyncFlag = val.length > 0 ? false : true;
      let listStr = "";
      this.multipleSelection.map((item) => {
        listStr += item.oid + ",";
      });
      if (listStr) listStr = listStr.substring(0, listStr.length - 1);
      this.listStr = listStr;
    },
    init() {
      this.getTableList();
    },
    timer() {
      this.timerRefreshData = setInterval(() => {
        this.getTopInfo();
        this.getTableList();
      }, 5000);
    },
    async getTopInfo() {
      try {
        let otstart = "",
          otend = "",
          htstart = "",
          htend = "";
        console.log("当前的this.searchForm:", !this.searchForm);
        if (this.searchForm && this.searchForm.xiadanPeriod) {
          otstart = moment(this.searchForm.xiadanPeriod[0]).format("YYYY-MM-DD");
          otend = moment(this.searchForm.xiadanPeriod[1]).format("YYYY-MM-DD");
        }
        if (this.searchForm && this.searchForm.jiaofuPeriod) {
          htstart = moment(this.searchForm.jiaofuPeriod[0]).format("YYYY-MM-DD");
          htend = moment(this.searchForm.jiaofuPeriod[1]).format("YYYY-MM-DD");
        }

        const params = {
          ...this.searchForm,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          otstart: otstart,
          otend: otend,
          htstart: htstart,
          htend: htend,
        };
        const res = await fetchOrderToPInfo(params);
        console.log("顶部信息：", res);
        const { total, cnum, dnum, unum } = res;
        this.topTotalItemsList = [
          {
            label: "订单数",
            value: total,
          },
          {
            label: "已提交",
            value: cnum,
          },
          {
            label: "已签收",
            value: unum,
          },
          {
            label: "已作废",
            value: dnum,
          },
        ];
      } catch (e) {}
    },
    search(row) {
      this.searchForm = { ...row };

      this.getTableList();
    },

    handleDetails(row) {
      this.$router.push({
        path: "/orderManagement/orderList/details",
        query: {
          oid: row.oid,
        },
      });
    },
    handleEdit(row) {
      this.$router.push({
        path: "/orderManagement/orderList/edit",
        query: {
          oid: row.oid,
        },
      });
    },

    // 订单作废
    handleDiscard(row) {
      console.log("row: ", row);
      this.oid = row.oid;
      this.zuofeiVisiable = true;
    },
    handleClose() {
      this.$refs["zuofeiForm"].resetFields();
      this.zuofeiVisiable = false;
    },

    submitZuofei(forName) {
      this.$refs[forName].validate(async (valid) => {
        if (valid) {
          const params = {
            oid: parseInt(this.oid),
            ...this.zuofeiForm,
          };
          console.log("作废参数：", params);
          await setOrderDiscard(params);
          this.$message.success("作废成功");
          this.init();
          this.$refs["zuofeiForm"].resetFields();
          this.zuofeiVisiable = false;
        } else {
          console.log("errror submit");
        }
      });
    },

    getDaysBetween(dateString1, dateString2) {
      var startDate = Date.parse(dateString1);
      var endDate = Date.parse(dateString2);
      var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
      return days;
    },

    handlePrint() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请先选择您要操作的订单");
        return;
      }
    },

    handleExportPreview() {
      let htstart = "",
        htend = "";
      if (this.multipleSelection.length == 0) {
        if (this.$refs["myform"].searchForm.jiaofuPeriod) {
          htstart = moment(this.$refs["myform"].searchForm.jiaofuPeriod[0]).format(
            "YYYY-MM-DD"
          );
          htend = moment(this.$refs["myform"].searchForm.jiaofuPeriod[1]).format(
            "YYYY-MM-DD"
          );
          const dayNum = this.getDaysBetween(htstart, htend) + 1;
          if (dayNum > 31) {
            this.$message.error("最多一次性可以导出30天的订单记录");
            return;
          }
          this.tableData.forEach((row) => {
            this.$refs.multipleOrderTable.toggleRowSelection(row);
          });
        } else {
          this.$message.error("请先选择交付日期或者订单!");
          return;
        }
      }
    },

    async handleExportAll() {
      let otstart = "",
        otend = "",
        htstart = "",
        htend = "";
      if (this.$refs["myform"].searchForm.xiadanPeriod) {
        otstart = moment(this.$refs["myform"].searchForm.xiadanPeriod[0]).format(
          "YYYY-MM-DD"
        );
        otend = moment(this.$refs["myform"].searchForm.xiadanPeriod[1]).format(
          "YYYY-MM-DD"
        );
        const dayNum = this.getDaysBetween(otstart, otend) + 1;
        if (dayNum > 31) {
          this.$message.error("最多一次性可以导出30天的订单记录");
          return;
        }
        console.log("当前的天数是：", dayNum);
      } else {
        this.$message.error("请先选择下单时间!");
        return;
      }
      if (this.$refs["myform"].searchForm.jiaofuPeriod) {
        htstart = moment(this.$refs["myform"].searchForm.jiaofuPeriod[0]).format(
          "YYYY-MM-DD"
        );
        htend = moment(this.$refs["myform"].searchForm.jiaofuPeriod[1]).format(
          "YYYY-MM-DD"
        );
      }
      const params = {
        ...this.searchForm,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        otstart: otstart,
        otend: otend,
        htstart: htstart,
        htend: htend,
      };
      delete params.jiaofuPeriod;
      delete params.xiadanPeriod;
      try {
        await exportOrderToExcel(params, "订单列表");
      } catch (e) {
        this.$message.error("下载失败!");
      }
    },

    async handleExport(type = "") {
      let dateStr = moment(new Date()).format("YYYYMMDD");
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const params = {
        list: this.listStr,
        ucode: userInfo.ucode,
      };
      let exportFunc = type === "noPrice" ? exportInvoiceNoPrice : exportInvoice;
      let fileName =
        type === "noPrice" ? `销售发票_无价格_${dateStr}` : `销售发票_有价格_${dateStr}`;
      try {
        await exportFunc(params, fileName);
      } catch (e) {
        this.$message.error("下载失败!");
      }
    },

    async getTableList() {
      let otstart = "",
        otend = "",
        htstart = "",
        htend = "";
      console.log("当前的this.searchForm:", !this.searchForm);
      if (this.searchForm && this.searchForm.xiadanPeriod) {
        otstart = moment(this.searchForm.xiadanPeriod[0]).format("YYYY-MM-DD");
        otend = moment(this.searchForm.xiadanPeriod[1]).format("YYYY-MM-DD");
      }
      if (this.searchForm && this.searchForm.jiaofuPeriod) {
        htstart = moment(this.searchForm.jiaofuPeriod[0]).format("YYYY-MM-DD");
        htend = moment(this.searchForm.jiaofuPeriod[1]).format("YYYY-MM-DD");
      }

      const params = {
        ...this.searchForm,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        otstart: otstart,
        otend: otend,
        htstart: htstart,
        htend: htend,
      };

      console.log("打印当前：查询订单", params);
      this.loading = true;
      try {
        const res = await fetchOrderList(params);
        this.total = res.total;
        const { cnum, dnum, unum } = res;
        this.cnum = cnum;
        this.dnum = dnum;
        this.unum = unum;
        this.tableData = res.data.map((item) => {
          return {
            ...item,
          };
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
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
  },
};
</script>
<style lang="less" scoped>
.order-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .my-actions {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .list-details {
      width: 360px;
      display: flex;
      padding-left: 8px;
      line-height: 34px;
      justify-content: space-around;
    }
    .my-btns {
      width: 440px;
      display: flex;
      justify-content: space-between;
      // margin-right: 48px;
    }
  }

  .my-table {
    margin-top: 24px;
    .table-cname {
      display: flex;
      align-items: center;
    }
    .table-badge {
      display: flex;
      align-items: center;
      .item {
        margin-top: 5px;
      }
    }
  }
  .mypagination {
    margin-top: 8px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
