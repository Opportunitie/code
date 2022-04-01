<template>
  <div class="my-nav1" :style="{ width: collapseFlag ? asideWidthMax : asideWidthMin }">
    <div
      class="nav"
      v-for="(item) in routes"
      :key="item.path"
      :class="selectRoute == item.path ? 'select-class' : ''"
      @click.stop="switchRoute(item)"
    >
      <!-- v-rules="item.meta.code" -->

      <div class="icon-box">
        <i :class="item.icon"></i>
      </div>
      <div class="text-box" v-if="collapseFlag">
        <div class="nav-text">{{ item.name }}</div>
        <i class="nav-arrow"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import aiRealtimeMonitor from "@/router/aiRealtimeMonitor/index";
import orderManagement from "@/router/orderManagement/index";
// import outbound from "@/router/outbound/index";
// import basedata from "@/router/basedata/index";
// import library from "@/router/library/index";
import { asideWidthMax, asideWidthMin } from "./config";
// todo 更多的菜单栏
export default {
  name: "my-nav1",
  data() {
    return {
      routes: [],
      selectRoute: "",
      asideWidthMax,
      asideWidthMin,
    };
  },
  computed: {
    ...mapState({
      collapseFlag: (state) => state.common.collapseFlag,
    }),
  },
  created() {
    // todo 更多的菜单栏
    this.routes = [
      // ...aiRealtimeMonitor,
      ...orderManagement,
    ];
    const currentRoute = this.$route.path;
    const getRouteReg = /^(\/\w+)/;
    this.selectRoute = currentRoute.match(getRouteReg)[0] || "/workbench";
    const selectRoute = this.routes.filter((item) => item.path == this.selectRoute)[0];
    this.saveClickRoute(selectRoute);
  },
  methods: {
    ...mapActions(["saveClickRoute"]),
    switchRoute(item) {
      this.saveClickRoute(item);
      if (item != this.selectRoute) {
        this.$router.push({
          path: item.path,
        });
        this.selectRoute = item.path;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/theme.less";
.my-nav1 {
  height: 100%;
  background-color: @navColor1;
  box-shadow: 1px 0px 3px @shadowColor;
  transition: 0.3s;
  z-index: 10;
  & > .nav {
    width: 100%;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    & > .icon-box {
      width: 60px;
      height: 50px;
      padding: 15px 20px;
      box-sizing: border-box;
      flex: 0 0 60px;
      & > i {
        font-size: 18px !important;
        color: #fff;
      }
    }
    & > .text-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding-right: 10px;
      box-sizing: border-box;
      & > .nav-text {
        color: @navColor4;
      }
    }
  }
  & > .select-class {
    background-image: linear-gradient(to right, #ff6218, #f58731);
    & > .text-box > .nav-text {
      color: @navColor2;
    }
    & > .text-box > .nav-arrow {
      width: 7px;
      height: 10px;
      background-image: url("../../assets/base/arrow.png");
      background-size: 100% 100%;
      display: inline-block;
    }
  }
  .nav1-icon {
    background-image: url("../../assets/base/nav1.png");
    background-size: 100% 100%;
  }
  .nav2-icon {
    background-image: url("../../assets/base/nav2.png");
    background-size: 100% 100%;
  }
  .nav3-icon {
    background-image: url("../../assets/base/nav3.png");
    background-size: 100% 100%;
  }
  .nav4-icon {
    background-image: url("../../assets/base/nav4.png");
    background-size: 100% 100%;
  }
  .nav5-icon {
    background-image: url("../../assets/base/nav5.png");
    background-size: 100% 100%;
  }
}
</style>