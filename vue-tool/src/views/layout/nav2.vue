<template>
  <div class="my-nav2">
    <div class="home-button" @click="handleHomepage" v-rules="2">
      <i
        class="icon-rxeshouye2"
        style="margin-left: 20px; margin-right: 8px; font-size: 18px"
      ></i>
      <span class="sub-title" style="font-size: 18px">首页</span>
    </div>
    <my-menu></my-menu>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import HomePage from "@/router/home-page/index";
import ExcelTool from "@/router/excel-tool/index";
// import orderManagement from "@/router/orderManagement/index";


import MyMenu from "./menu";
export default {
  name: "my-nav2",
  components: {
    "my-menu": MyMenu,
  },
  created() {
    // todo 更多的菜单栏
    this.routes = [
      ...HomePage,
      ...ExcelTool,
      // ...orderManagement,
    ];
    this.saveClickRoute([...this.routes]);
  },
  methods: {
    ...mapActions(["saveClickRoute"]),
    // switchRoute(item) {
    // this.saveClickRoute(item);
    // if (item != this.selectRoute) {
    //   this.$router.push({
    //     path: item.path,
    //   });
    //   this.selectRoute = item.path;
    // }
    // },
    handleHomepage() {
      this.$router.push({
        path: "/home-page",
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/styles/theme.less";
.my-nav2 {
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  .home-button {
    cursor: pointer;
    display: flex;
    width: 100%;
    height: 41px;
    line-height: 41px;
    // padding: 0 0 0 @navPaddingLeft1;
    box-sizing: border-box;
    // background-color: @navColor3;
    // color: @fontColor167;
    font-size: @fontSize16;
    font-color: #333333;
    font-weight: 500;
    // border-bottom: 1px solid #eee;
    border-right: solid 1px #e6e6e6;
  }
  .home-button:hover {
    background-color: rgba(22, 119, 255, 0.1);
  }
  // & > .title {
  //   width: 100%;
  //   height: 64px;
  //   line-height: 64px;
  //   padding: 0 0 0 @navPaddingLeft1;
  //   box-sizing: border-box;
  //   background-color: @navColor3;
  //   color: @fontColor167;
  //   font-size: @fontSize16;
  //   font-weight: bold;
  //   border-bottom: 1px solid #eee;
  // }
}
</style>
