<template>
  <el-drawer
    custom-class="my-drawer"
    :wrapperClosable="false"
    :size="size"
    :visible.sync="drawer"
    :with-header="false"
  >
    <div class="my-drawer-content">
      <slot name="title">
        <my-title :title="title" />
      </slot>
      <slot>默认内容</slot>
    </div>
    <div class="close-icon" @click="closeDrawer">
      <i class="el-icon-close"></i>
    </div>
  </el-drawer>
</template>

<script>
import MyTitle from "./title";
export default {
  data() {
    return {};
  },
  components: {
    MyTitle
  },
  props: {
    drawer: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: '596px'
    }
  },
  methods: {
    closeDrawer() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="less" scoped>
.my-drawer {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  .my-drawer-content {
    padding: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .close-icon {
    position: absolute;
    left: -44px;
    top: 50%;
    width: 44px;
    height: 44px;
    background-color: #1677ff;
    border-radius: 4px 0 0 4px;
    color: #fff;
    font-size: 22px;
    line-height: 44px;
    text-align: center;
    margin-top: -22px;
  }
}
/deep/ .el-drawer__body {
  height: 100%;
}
/deep/ .el-drawer {
  overflow: visible;
  height: 100%;
}
</style>

