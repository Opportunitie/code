//入库管理
import orderListRoutes from './orderList'
import summaryInfomationRoutes from './summaryInfomation'
const routes = [
  {
    path: '/orderManagement',
    name: '订单管理',
    level: 1,
    icon: 'icon-rxedingdan',
    redirect: '/orderManagement/orderList',
    code: 1,
    // meta: {
    //       code: 1,
    //       level: 1,
    //   },
    component: () => import(/* webpackChunkName:'workbench' */ '@v/orderManagement/index.vue'),
    children: [
     ...orderListRoutes,
     ...summaryInfomationRoutes
    ]
  }
]

export default routes
