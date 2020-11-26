<template>
<el-container class="container">
  <el-header class="header">
    <div class='title'>Three.js学习项目</div>
  </el-header>
  <el-container>
    <el-aside class="aside">
      <!-- <router-link to="/three">demo1</router-link> -->
      <Navigates></Navigates>
    </el-aside>
    <el-main class="main">
      <router-view/>
    </el-main>
  </el-container>
  <!-- <el-footer>footer</el-footer> -->
</el-container>
</template>

<script>
import Navigates from './nav.vue'
  export default {
    components:{
      Navigates
    }
  }
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100vh;
  .header{
    height: 100px;
    background-color: aqua;
    display: flex;
    justify-content: center;
    align-items: center;
    .title{
      font-size: 24px;
      font-weight: bold;
    }
    
  }
  .aside{
    width: 200px;
    background-color: #001529;
  }
  .main{
    width: cals(100vw-200px);
  }
}
</style>