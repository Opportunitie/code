<template>
  <div class="order-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="订单列表" name="first" v-rules="10">
        <order-list />
      </el-tab-pane>
      <el-tab-pane label="配货表" name="second" v-rules="26">
        <distribute-table v-if="activeName === 'second'" />
      </el-tab-pane>
      <el-tab-pane label="线路送货表" name="third" v-rules="31">
        <delivery-route />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import moment from "moment";
import MyTable from "@c/myTable";
import DistributeTable from "./distribution-table";
import DeliveryRoute from "./delivery-route";
import OrderList from "./order-list";
import expandMixins from "@/mixins/expand";

export default {
  name: "order",
  components: {
    "my-table": MyTable,
    "distribute-table": DistributeTable,
    "delivery-route": DeliveryRoute,
    "order-list": OrderList,
  },

  data() {
    return {
      activeName: "first",
      loading: false,
    };
  },

  created() {
    const currentName = window.localStorage.getItem("activeName");
    if (currentName) {
      console.log("打印当前的tab名字：", currentName);
      this.activeName = currentName;
    }
  },
  methods: {
    handleClick(val) {
      this.activeName = val.paneName;
      window.localStorage.setItem("activeName", val.paneName);
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
