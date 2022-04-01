<template>
  <el-container>
    <el-header>
      <my-header />
    </el-header>
    <el-container style="height: calc(100% - 60px); width: 100%">
      <el-aside :width="asideWidthMax">
        <my-aside />
      </el-aside>
      <el-main class="my-main" :style="`calc(100% - ${asideWidthMax})`">
        <div class="my-breadcrumb">
          <my-breadcrumb />
        </div>
        <div class="my-container" :class="{ canShowClass: canShow }">
          <router-view></router-view>
          <div
            class="expand-details"
            v-if="selectId.length > 0"
            :style="{ top: top + 'px' }"
          >
            <my-expand-details :selectId="selectId" />
          </div>
        </div>
      </el-main>
    </el-container>
    <div
      class="drawer-details"
      v-if="showDrawerDelete"
      :style="{ top: drawerTop + 'px', left: drawerLeft + 'px' }"
    >
      <my-drawer-details :deleteDrawerRow="deleteDrawerRow" />
      <div class="drawer-details__arrow"></div>
    </div>
  </el-container>
</template>

<script>
import MyHeader from "./header";
import MyAside from "./aside";
import MyBreadcrumb from "./breadcrumb";
import MyExpandDetails from "./expandDetails";
import MyDrawerDetails from "./drawerDetails";
import { mapState, mapActions } from "vuex";

import { asideWidthMax, asideWidthMin } from "./config";
export default {
  components: {
    MyHeader,
    MyAside,
    MyBreadcrumb,
    MyExpandDetails,
    MyDrawerDetails,
  },
  data() {
    return {
      asideWidthMax,
      asideWidthMin,
    };
  },
  computed: {
    ...mapState({
      collapseFlag: (state) => state.common.collapseFlag,
      top: (state) => state.expand.top,
      selectId: (state) => state.expand.selectId,
      showDrawerDelete: (state) => state.drawer.showDrawerDelete,
      drawerTop: (state) => state.drawer.top,
      drawerLeft: (state) => state.drawer.left,
      deleteDrawerRow: (state) => state.drawer.deleteRow,
    }),
    canShow() {
      const path = [
        "/orderManagement/orderList/details",
        "/orderManagement/orderList/edit",
        "/commodity/commodityList/details",
        "/clinet/clientList/details",
        "/orderManagement/orderList/substitute",
        "/commodity/commodityList/add",
        "/commodity/commodityList/edit",
        "/client/clientList/add",
        "/client/clientList/check",
        "/client/clientList/edit",

        "/client/clientList/details",
      ];
      const nPath = this.$route.path;
      if (path.includes(nPath)) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {},
};
</script>

<style lang="less" scoped>
@import "@/styles/theme.less";
.my-main {
  width: 100%;
  height: 100%;
  background-color: @mainBgColor;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  & > .my-breadcrumb {
    width: 100%;
    height: 40px;
    div {
      padding-left: 20px;
      height: 100%;
      background-color: #fff;
    }
  }
  & > .my-container {
    width: 100%;
    // height: 91.5%;
    height: calc(95% - 40px);
    div {
      overflow: auto;
      width: calc(100% - 40px);
      height: 100%;
      position: relative;
      margin: 20px;
      // flex: 1;
      background-color: #fff;
      box-shadow: 0 0 5px #edeff2;
      border-radius: 4px;
      padding: 24px 32px 32px 32px;
      box-sizing: border-box;
    }
  }
  .canShowClass {
    padding: 0;
    background: #f0f2f5;
  }
}

.expand-details {
  position: absolute;
  left: 32px;
  right: 32px;
  height: 300px;
  z-index: 2800;
  padding: 20px;
  background: #fff;
  border: 20px solid #e7f1ff;
  border-radius: 4px;
}
.drawer-details {
  position: absolute;
  width: 160px;
  height: 70px;
  z-index: 4000;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  padding: 12px;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  word-break: break-all;
  margin-bottom: 12px;
  &__arrow {
    position: absolute;
    bottom: -6px;
    right: 16px;
    margin-right: 3px;
    border-top-color: #ebeef5;
    border-bottom-width: 0;
    border-width: 6px;
    filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
  }
  &__arrow::after {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    z-index: 4001;
    content: " ";
    border-width: 6px;

    bottom: 1px;
    margin-left: -6px;
    border-top-color: #fff;
    border-bottom-width: 0;
  }
}
</style>

<style lang="less">
@import "@/styles/theme.less";
body > #app > .el-container {
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: @bgColor;
  & > .el-header {
    padding: 0;
    z-index: 10;
    height: 54px !important;
  }
  & > .el-container {
    // overflow-y: hidden;
    & > .el-aside {
      background-color: @navColor2;
      box-shadow: 3px 0px 8px @shadowColor;
    }
    & > .el-main {
      padding: 0;
    }
  }
}
.my-main > .my-breadcrumb > .el-breadcrumb {
  line-height: 40px;
}
// 滚动条宽度
::-webkit-scrollbar {
  width: 8px;
  height: 12px;
  background-color: #fff;
}
// 滑块
::-webkit-scrollbar-thumb {
  display: block;
  min-height: 12px;
  min-width: 8px;
  border-radius: 6px;
  // box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  background-color: #d9d9d9;
}
// 轨道
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background-color: #f5f5f5;
}
// hover滑块颜色
::-webkit-scrollbar-thumb:hover {
  display: block;
  min-height: 12px;
  min-width: 8px;
  border-radius: 6px;
  // background-color: rgb(159, 159, 159,0.2);
}

/*三角箭头的颜色*/
// div {
//   // width: 8px;
//   // scrollbar-arrow-color: #fff;
//   /*滚动条滑块按钮的颜色*/
//   // scrollbar-face-color: #0099dd;
//   /*滚动条整体颜色*/
//   scrollbar-highlight-color: inset 0 0 5px rgba(0, 0, 0, 0.2);
//   /*滚动条阴影*/
//   scrollbar-shadow-color: #0099dd;
//   /*滚动条轨道颜色*/
//   scrollbar-track-color: inset 0 0 5px rgba(0, 0, 0, 0.2);
//   /*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
//   // scrollbar-3dlight-color: #0099dd;
//   /*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
//   // scrollbar-darkshadow-color: #0099dd;
//   /*滚动条基准颜色*/
//   scrollbar-base-color: #d9d9d9;
// }
</style>
