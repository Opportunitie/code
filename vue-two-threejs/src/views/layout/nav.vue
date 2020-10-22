<template>
  <div class="nav">
    <el-menu
      class="nav-menu"
      default-active="/three"
      :router="true"
      :collapse="isCollapse"
      background-color="#001529"
      text-color="#ffffff"
    >
      <el-submenu index="1">
        <template slot="title">
          <div class="nav-sub-menu">
            <i class="el-icon-location"></i>
            <span slot="title">three.js-study</span>
          </div>
        </template>
        <el-menu-item index="/three" class="nav-menu-items">demo1</el-menu-item>
        <el-menu-item index="/" class="nav-menu-items">demo2</el-menu-item>
      </el-submenu>
      <!-- <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      isCollapse: false,
    };
  },
};
</script>

<style lang="less" scoped>
.nav {
  width: 100%;
  font-size: 24px;
  .nav-menu {
    .nav-sub-menu {
      font-size: 20px;
      display: flex;
      align-items: center;
    }
    .nav-menu-items {
      font-size: 18px;
        display: flex;
        align-items: center;
      }
  }
}
</style>