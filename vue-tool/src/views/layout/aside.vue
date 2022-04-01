<template>
  <div class="my-nav">
    <!-- <my-nav1></my-nav1> -->
    <!-- <my-nav2 v-if="!collapseFlag"></my-nav2> -->
    <my-nav2></my-nav2>
  </div>
</template>

<script>
// import MyNav1 from './nav1'
import MyNav2 from './nav2'
import { mapState } from 'vuex'
export default {
  name: 'my-aside',
  components: {
    // MyNav1,
    MyNav2
  },
  computed: {
    ...mapState({
      collapseFlag: state => state.common.collapseFlag
    })
  }
}
</script>

<style lang="less" scoped>
@import "@/styles/theme.less";
.my-nav {
  display: flex;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}
</style>