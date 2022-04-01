<template>
  <el-breadcrumb separator="/" class="my-breadcrumb">
  <!-- <el-breadcrumb-item
      :to="{ path: '/' }"
    >AI</el-breadcrumb-item> -->
    <el-breadcrumb-item
      v-for="item in matcheds"
      :key="item.path"
      :to="{ path: item.path }"
    >{{item.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { routes } from "@/router";
export default {
  name: "my-breadcrumb",
  data() {
    return {
      matcheds: []
    };
  },
  watch: {
    $route() {
      this.getRouterMap();
    }
  },
  created() {
    this.getRouterMap();
  },
  methods: {
    // getMatcheds() {
    //   const matcheds = this.$route.matched;
    //   this.matcheds = matcheds.filter(item => item.path);
    // },
    getRouterMap() {
      const routesMap = routes[0].children;
      const path = this.$route.path;
      this.deep(path, routesMap, []);
    },
    deep(path, arr, barr) {
      if (arr[0].level > 0 ) {
        for (let i in arr) {
          if (path.includes(arr[i].path)) {
            barr.push(arr[i]);
            this.deep(path, arr[i].children, barr);
            break;
          }
        }
      } else {
        const newArr = arr.filter((item) => {
          return path.includes(item.path)
        })
        this.matcheds = [...barr, ...newArr]
        // console.log('this.matcheds',this.matcheds);
      }
    }
  }
};
</script>

<style lang="less">
@import "@/styles/theme.less";
.my-breadcrumb {
  & > .el-breadcrumb__item > .el-breadcrumb__inner.is-link {
    font-weight: normal;
    color: #606266;
  }
  & > .el-breadcrumb__item > .el-breadcrumb__inner.is-link:hover {
    color: #409eff;
  }
  & > .el-breadcrumb__item:last-child > .el-breadcrumb__inner.is-link {
    font-weight: bold;
    color: #303133;
  }
}
</style>