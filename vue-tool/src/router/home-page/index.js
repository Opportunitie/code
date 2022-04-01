// 首页
const routes = [
  {
    path: '/home-page',
    name: '首页',
    level: 1,
    icon: 'el-icon-s-home',
    // redirect: '/orderManagement/orderList',
    code: 2,
    // meta: {
    //       code: 250,
    //       level: 2,
    //   },
    component: () => import(/* webpackChunkName:'workbench' */ '@v/home-page/index.vue'),
  
  }
]

export default routes
