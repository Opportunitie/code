const routes = [
  {
    path: '/orderManagement/summaryInfomation',
    name: '汇总信息',
    level: 0,
    code: 5,
    // meta: {
    //   code: 258,
    //   level: 0,
    // },

    component: () =>
      import(
        /* webpackChunkName:'workbench' */ '@v/orderManagement/summaryInfomation/index.vue'
      )
  }
]

export default routes
