<template>
  <div class="my-drawer-details">
    <p class="text">你保存删除该条记录吗？</p>
    <div style="text-align: right; margin: 0px;">
      <button @click="cancel" type="button" class="el-button el-button--text el-button--mini">取消</button>
      <button
        @click="submit"
        v-loading="loading"
        type="button"
        class="el-button el-button--primary el-button--mini"
      >保存</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { deleteRecordLabel, deleteSplitRecordLabel } from "@/api/api";
export default {
  props: {
    deleteDrawerRow: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      drawerInfos: (state) => state.drawer.drawerInfos,
    }),
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    ...mapActions([
      "clearDrawerInfos",
      "setHighlight2",
      "getLabelList",
      "getLabelDataList",
    ]),
    cancel() {
      this.clearDrawerInfos();
      this.setHighlight2([]);
    },
    async getLabelListfn() {
      const params = {
        rbid: this.drawerInfos.rbid,
        status:
          this.drawerInfos.searchStatus === 2
            ? this.drawerInfos.searchStatus
            : 1,
      };
      try {
        await this.getLabelList(params);
      } catch (e) {}
    },
    async submit() {
      if (
        this.drawerInfos &&
        this.drawerInfos.pageFlag === "workOrderPicking"
      ) {
        const { pid = "" } = this.drawerInfos;
        if (pid) {
          try {
            this.loading = true;
            this.cancel();
            await deleteSplitRecordLabel({ pid });
            await this.getLabelDataList({ pid });
            this.loading = false;
          } catch (e) {
          } finally {
            this.loading = false;
          }
        } else {
          this.cancel();
        }
      } else {
        const { plid = "" } = this.deleteDrawerRow;
        const { rbid } = this.drawerInfos;
        if (plid) {
          try {
            this.loading = true;
            this.cancel();
            await deleteRecordLabel({ plid, rbid });
            await this.getLabelListfn();
            this.loading = false;
          } catch (e) {
          } finally {
            this.loading = false;
          }
        } else {
          this.cancel();
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.my-drawer-details {
  box-sizing: border-box;
  .text {
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 14px;
    height: 14px;
    padding: 10px 0;
  }
}
</style>
