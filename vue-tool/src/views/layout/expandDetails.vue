<template>
  <el-tabs v-model="activeName">
    <el-tab-pane
      label="物流信息"
      name="first"
      v-loading="expandloading"
      v-if="firstShowArr.includes($route.path)"
    >
      <my-first :plogistics="logistics" :rbid="row.rbid" @update="update" />
    </el-tab-pane>
    <el-tab-pane
      label="操作记录"
      name="second"
      v-if="secondShowArr.includes($route.path)"
    >
      <my-second :record="record" />
    </el-tab-pane>
    <el-tab-pane
      label="打印明细"
      name="third"
      v-if="thirdShowArr.includes($route.path)"
    >
      <my-third :print="print" />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import MyFirst from "./expandComponents/first";
import MySecond from "./expandComponents/second";
import MyThird from "./expandComponents/third";
import {
  getReceiptRecord,
  getReceiptRecordP,
  getOutBoundReceiptRecord,
  getOutBoundPReceiptRecord,
} from "@/api/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeName: "",
      print: [],
      record: [],
      logistics: {},
      expandloading: true,
      // 物料信息
      firstShowArr: [
        
      ],
      //操作记录
      secondShowArr: [
        // 入库管理
        "/warehousing/materialWarehousing/purchaseWarehousing",
        "/warehousing/materialWarehousing/productWarehousing",
        // 出库-物料出库
        "/outbound/delivery/work",
        "/outbound/delivery/sale",
      ],
      // 打印明细
      thirdShowArr: [
       
      ],
    };
  },
  components: {
    MyFirst,
    MySecond,
    MyThird,
  },
  computed: {
    ...mapState({
      row: (state) => state.expand.row,
    }),
  },
  created() {
    this.init();
    this.getActiveName();
  },
  watch: {
    row: {
      handler: function () {
        this.getActiveName();
        this.init();
      },
      deep: true,
    },
  },
  methods: {
    async init() {
      const {
        ohid = "",
        shid = "",
      } = this.row;

      // 出库模块-物料出库
      if (this.$route.path == "/outbound/delivery/work") {
        if (ohid) {
          try {
            const params = {
              ohid,
            };
            this.expandloading = true;
            let res = await getOutBoundReceiptRecord(params);
            this.expandloading = false;
            console.log(res);
            this.record = [...res];
          } catch (e) {
            this.expandloading = false;
          } finally {
            this.expandloading = false;
          }
        }
        return;
      }

      // 出库模块-销售出库
      if (this.$route.path == "/outbound/delivery/sale") {
        if (ohid) {
          try {
            const params = {
              ohid,
            };
            this.expandloading = true;
            let res = await getOutBoundPReceiptRecord(params);
            this.expandloading = false;
            this.record = [...res];
          } catch (e) {
            this.expandloading = false;
          } finally {
            this.expandloading = false;
          }
        }
        return;
      }

      // 生产入库
      if (this.$route.path == "/warehousing/materialWarehousing/productWarehousing") {
        console.log('12323')
        if (shid) {
          try {
            const params = {
              shid,
            };
            this.expandloading = true;
            let res = await getReceiptRecordP(params);
            this.expandloading = false;
            this.record = [...res];
          } catch (e) {
            this.expandloading = false;
            console.log(e);
          }
        }
      }
      // 采购入库
      if (this.$route.path == "/warehousing/materialWarehousing/purchaseWarehousing") {
        if (shid) {
          try {
            const params = {
              shid,
            };
            this.expandloading = true;
            let res = await getReceiptRecord(params);
            this.expandloading = false;
            this.record = [...res];
          } catch (e) {
            this.expandloading = false;
            console.log(e);
          }
        }
      }
    },
    getActiveName() {
      const path = this.$route.path;
      const isFirst = this.firstShowArr.includes(path);
      if (isFirst) {
        this.activeName = "first";
      } else {
        const isSecond = this.secondShowArr.includes(path);
        if (isSecond) {
          this.activeName = "second";
        } else {
          this.activeName = "third";
        }
      }
    },
    update() {
      this.init();
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-tabs__content {
  overflow: visible;
}
</style>
