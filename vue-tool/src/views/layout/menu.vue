<template>
  <el-menu :default-active="activeMenu" unique-opened :router="true">
    <template v-for="item in selectRoute">
      <my-menu-item :key="item.path" :menu="item" />
    </template>
  </el-menu>
</template>

<script>
import MyMenuItem from "./menuItem";
import { mapState } from 'vuex';
const CJ = 2
export default {
  name: "my-menu",
  components: {
    "my-menu-item": MyMenuItem
  },
  data() {
    return {
      activeMenu: "",
    };
  },
  computed: {
    ...mapState({
      selectRoute: state => state.common.selectRoute
    })
  },
  watch: {
    '$route' (to) {
      if (to) {
        this.getActiveMenu(to.path)
      }
    },
  },
  created() {
    this.getActiveMenu(this.$route.path)
  },
  methods: {
    getActiveMenu(path) {
      const paths = path.split('/')
      let npath = ''
      for (let i = 0; i <= CJ; i++) {
        if (paths[i]) {
          npath += '/' + paths[i]
        }
      }
      console.log('npath1', npath)
      this.activeMenu = npath
    }
  }
};
</script>

<style lang="less" scoped>
</style>
