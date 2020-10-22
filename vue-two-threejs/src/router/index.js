import Vue from "vue";
import Router from "vue-router";
import Three from "./three";
import P404 from "@v/404.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "首页",
      component: () => import('@v/layout'),
      children: [
        ...Three,
      ]
    },
    {
      path: "/404",
      meta: {
      },
      component: P404,
      name: "样例"
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
