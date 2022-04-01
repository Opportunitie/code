<template>
  <div class="order-details" v-loading="loading">
    <!-- <div class="item-box">
      <h1>订单信息</h1>
      <div class="myfaketable">
        <fake-table :itemsList="baseItemList" />
      </div>
    </div> -->

    <div class="item-box">
      <div class="myfaketable">
        <fake-table :itemsList="baseItemList" />
      </div>
      <h1>商品列表</h1>
      <el-table
        :data="list"
        style="width: 100%"
        :summary-method="getSummaries"
        show-summary
      >
        <el-table-column type="index" label="序号" width="50"> </el-table-column>
        <el-table-column prop="mthumb" label="商品主图" width="180">
          <template slot-scope="scope">
            <div style="display: flex; align-items: center">
              <img :src="scope.row.mthumb" style="width: 43px; height: 32px" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cname" label="商品名称" width="180"> </el-table-column>
        <el-table-column prop="ccode" label="商品编号" width="180"> </el-table-column>
        <el-table-column prop="pnum" label="数量" width="180"> </el-table-column>
        <el-table-column prop="cunit" label="单位"> </el-table-column>
        <el-table-column prop="uprize" label="单价"> </el-table-column>
        <el-table-column prop="total" label="金额小计(元)">
          <template v-slot="{ row }">
            <div class="adjust-munit">
              <span>{{ row.total | numFormat }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="item-box">
      <h1>收货信息</h1>
      <div class="myfaketable">
        <fake-table :itemsList="deliveryItemList" />
      </div>
    </div>

    <div class="item-box">
      <h1>配货信息</h1>
      <div class="myfaketable">
        <fake-table :itemsList="prepareItemList" />
      </div>
    </div>

    <div class="item-box">
      <h1>其他信息</h1>
      <div class="myfaketable">
        <!-- <fake-table :itemsList="otherItemList" /> -->
        <div>
          <span
            style="
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: bolder;
              color: rgba(0, 0, 0, 0.85);
              line-height: 24px;
            "
            >订单备注(仅用户可见)：</span
          ><span
            style="
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              line-height: 24px;
            "
            >{{ otherItemList[1].value }}</span
          >
        </div>
        <div>
          <span
            style="
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: bolder;
              color: rgba(0, 0, 0, 0.85);
              line-height: 24px;
            "
            >后台备注(仅后台可见)：</span
          ><span
            style="
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              line-height: 24px;
            "
            >{{ otherItemList[0].value }}</span
          >
        </div>
        <div>
          <span
            style="
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: bolder;
              color: rgba(0, 0, 0, 0.85);
              line-height: 24px;
            "
            >核算单位：</span
          ><span
            style="
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              line-height: 24px;
            "
            >{{ aunit }}</span
          >
        </div>
        <div>
          <span
            style="
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: bolder;
              color: rgba(0, 0, 0, 0.85);
              line-height: 24px;
            "
            >金蝶同步结果：</span
          ><span
            style="
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              line-height: 24px;
            "
            >{{ asyncResult }}</span
          >
        </div>
      </div>
    </div>

    <div class="item-box" style="margin-bottom: 24px">
      <h1>操作记录</h1>
      <el-table :data="records" style="width: 100%">
        <el-table-column type="index" label="序号" width="50"> </el-table-column>
        <el-table-column prop="rtime" label="操作时间" width="180"> </el-table-column>
        <el-table-column label="操作类型" width="180">
          <template slot-scope="scope">
            <span>{{ operateTypeList[scope.row.rtype - 1] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rname" label="操作人" width="180"> </el-table-column>
        <el-table-column prop="rlog" label="操作日志" width="200" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 20px; width: 100%; height: 24px"></div>

    <bottom-bar>
      <el-button @click="goBack">返回</el-button>
    </bottom-bar>
  </div>
</template>

<script>
import BottomBar from "@c/bottomBar";
import FakeTable from "@c/fakeTable";
import { fetchOrderDetails } from "@/api/orderMgrApi";
export default {
  name: "order-details",
  components: {
    "fake-table": FakeTable,
    BottomBar,
  },
  data() {
    return {
      loading: false,
      oid: "",
      operateTypeList: ["提交订单", "修改订单", "作废订单"],
      ostatusList: ["已提交", "已签收", "已作废"],
      base: {}, // 顶部基本信息
      baseItemList: [], // 顶部订单基本信息
      deliveryItemList: [],
      prepareItemList: [], // 配货信息
      otherItemList: [], // 其他信息
      delivery: {},
      prepare: {},
      other: {},
      list: [],
      records: [],
      orderItemLists: [],

      aunit: "", // 核算单位
      aresultList: ["", "未同步", "同步成功", "同步失败"],
      areason: "",
      aresult: "",
      asyncResult: "",
      tableData: {
        // id: "lid",
        // showSelection: true,
        arr: [
          { label: "序号", prop: "", type: "index", minWidth: "50px" },
          {
            label: "线路名称",
            prop: "lname",
          },
          {
            label: "司机",
            prop: "drname",
          },
          { label: "装卸工", prop: "doname" },
          { label: "客户数", prop: "cnumb" },
          { label: "备注", prop: "remark" },
          { label: "创建时间", prop: "ctime" },
        ],
      },
    };
  },
  created() {
    if (this.$route.query.oid) {
      this.loading = true;
      this.getDetails(this.$route.query.oid);
      this.loading = false;
    }
  },
  filters: {
    numFormat(val) {
      if (!isNaN(val)) {
        return val
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return "--";
      }
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index === 3 || index === 6) {
          sums[index] = "";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (sums[index].toString().includes(".")) {
            sums[index] = sums[index].toFixed(2);
            console.log("包含小数");
          }
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },

    async getDetails(id) {
      const params = {
        oid: id,
      };
      try {
        const res = await fetchOrderDetails(params);
        console.log("订单详情： ", res);
        const {
          base = {},
          delivery = {},
          prepare = {},
          other = {},
          list = [],
          discard = {},
          records = [],
          tprize,
        } = res;
        this.base = base;
        // 订单基本信息fakeTable
        this.baseItemList = [
          {
            label: "订单号",
            value: base.ono || "--",
          },
          {
            label: "客户名称",
            value: base.cname || "--",
          },
          {
            label: "客户经理",
            value: base.cmanager || "--",
          },
          {
            label: "订单状态",
            value: this.ostatusList[base.ostatus - 1] || "--",
          },
        ];
        this.deliveryItemList = [
          {
            label: "联系人姓名",
            value: delivery.cname || "--",
          },
          {
            label: "手机号",
            value: delivery.cmobile || "--",
          },
          {
            label: "收货地址",
            value: delivery.apr + delivery.act + delivery.aarea + delivery.adetail,
          },
        ];
        this.prepareItemList = [
          {
            label: "交付日期",
            value: prepare.htime || "--",
          },
          {
            label: "配货员",
            value: prepare.dname || "--",
          },
          {
            label: "线路",
            value: prepare.lname || "--",
          },
          {
            label: "司机",
            value: prepare.driver + "(" + prepare.dmobile + ")",
          },
          {
            label: "装卸工",
            value: prepare.dock,
          },
        ];
        this.otherItemList = [
          {
            label: "备注",
            value: other.remark || "--",
          },
          {
            label: "订单备注(仅用户可见)",
            value: other.cremark || "--",
          },
        ];

        this.list = list;
        this.aunit = other.aunit ? other.aunit : base.cname;
        this.aresult = other.aresult ? this.aresultList[other.aresult] : "--";
        let areason = other.areason ? other.areason : "--";
        if (other.aresult === 3) {
          this.asyncResult = `${this.aresult}（失败原因：${areason}）`;
        } else {
          this.asyncResult = this.aresult;
        }

        this.delivery = delivery;
        this.prepare = prepare;
        this.other = other;
        this.records = records;
        this.discard = discard;
      } catch (e) {}
    },
  },
};
</script>
<style lang="less" scoped>
.order-details {
  .item-box {
    background: #fff;
    border-radius: 2px;
    padding: 20px;
    margin-bottom: 20px;
    h1 {
      // width: 96px;
      height: 21px;
      font-size: 16px;
      font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.85);
      line-height: 21px;
      margin-bottom: 20px;
    }
  }

  .order-list {
    margin-top: 16px;
    background: #ffffff;
    border-radius: 3px;
    /deep/ .el-divider--horizontal {
      display: block;
      height: 1px;
      width: 100%;
      margin: 12px 0;
    }
  }
}
</style>
