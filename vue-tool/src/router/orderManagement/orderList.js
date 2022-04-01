const routes = [
  {
    path: '/orderManagement/orderList',
    name: '订货单',
    level: 0,
    code: 3,
    // meta: {
    //   code: 258,
    //   level: 0,
    // },

    component: () =>
      import(
        /* webpackChunkName:'workbench' */ '@v/orderManagement/orderList/index.vue'
      )
  },
  {
    path: '/orderManagement/orderList/details',
    name: '订单详情',
    level: 0,
    hidden: true,
    code: 11,
    // meta: {
    //   code: 258,
    //   level: 0,
    // },

    component: () =>
      import(
        /* webpackChunkName:'workbench' */ '@v/orderManagement/orderList/order-details.vue'
      )
  },
  {
    path: '/orderManagement/orderList/substitute',
    name: '代下单',
    level: 0,
    hidden: true,
    code: 12,
    // meta: {
    //   code: 258,
    //   level: 0,
    // },

    component: () =>
      import(
        /* webpackChunkName:'workbench' */ '@v/orderManagement/orderList/substituteOrder.vue'
      )
  },
  {
    path: '/orderManagement/orderList/edit',
    name: '修改订单',
    level: 0,
    hidden: true,
    code: 13,
    // meta: {
    //   code: 258,
    //   level: 0,
    // },

    component: () =>
      import(
        /* webpackChunkName:'workbench' */ '@v/orderManagement/orderList/editOrder.vue'
      )
  },
  {
    path: '/orderManagement/orderList/distribution-details',
    name: '配货表详情',
    level: 0,
    hidden: true,
    code: 28,
    // meta: {
    //   code: 258,
    //   level: 0,
    // },

    component: () =>
      import(
        /* webpackChunkName:'workbench' */ '@v/orderManagement/orderList/distribution-details.vue'
      )
  },
  {
    path: '/orderManagement/orderList/route-details',
    name: '线路送货表详情',
    level: 0,
    hidden: true,
    code: 32,
    // meta: {
    //   code: 258,
    //   level: 0,
    // },

    component: () =>
      import(
        /* webpackChunkName:'workbench' */ '@v/orderManagement/orderList/delivery-route-details.vue'
      )
  },


]

export default routes
