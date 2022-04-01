<template>
  <div class="order-container">
    <produce-order-summary />
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="生产单汇总" name="first">
        <produce-order-summary />
      </el-tab-pane>
      <el-tab-pane label="订单商品汇总" name="second"> </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
import moment from "moment";
import MyTable from "@c/myTable";
import ProduceOrderSummary from './components/produce-order-summary'
export default {
  name: "order",
  components: {
    "my-table": MyTable,
    "produce-order-summary":ProduceOrderSummary
  },

  data() {
    return {
      activeName: "first",
      loading: false,
    };
  },

  created() {},
  methods: {
    handleClick(val) {
      this.activeName = val.paneName;
    },
  },
};
</script>

<style lang="less" scoped>
.order-container {
  background-color: #fff;
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }

  /deep/ .el-badge sup.el-badge__content {
    top: 1px;
    right: -8px;
  }
}
</style>
