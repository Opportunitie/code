<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      timmer: null
    };
  },
  methods: {
    moveEvent() {
      let path = ["/login"];
      if (!path.includes(this.$route.path)) {
        clearTimeout(this.timmer);
        this.init();
      }
    },

    init() {
      this.timmer = setTimeout(() => {
        //清除session
        sessionStorage.removeItem("sessionData");
        sessionStorage.clear();
        //清除缓存
        this.$cache.reset();
        //跳往登录页面
        this.$router.push({
          path: "/login"
        });
      }, 2 * 60 * 60 * 1000);
    }
  }
};
</script>
