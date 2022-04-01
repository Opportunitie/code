//入库管理
const routes = [
  {
    path: '/excel-tool',
    name: 'excel',
    level: 1,
    icon: 'icon-rxedingdan',
    redirect: '/excel-tool/js-xlsc',
    code: 1,
    // meta: {
    //       code: 1,
    //       level: 1,
    //   },
    component: () => import(/* webpackChunkName:'workbench' */ '@v/excel-tool/index.vue'),
    children: [
      {
        path: '/excel-tool/js-xlsc',
        name: 'js-xlsc',
        level: 0,
        code: 3,
        // meta: {
        //   code: 258,
        //   level: 0,
        // },
    
        component: () =>
          import(
            /* webpackChunkName:'workbench' */ '@v/excel-tool/js-xlsc.vue'
          )
      },
    ]
  }
]

export default routes
