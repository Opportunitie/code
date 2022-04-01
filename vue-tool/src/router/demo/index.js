const routes = [
  {
    path: "/demo",
    name: 'AI监控',
    component: () =>
    import(/* webpackChunkName:'workbench' */ "@v/demo/index"),
    level: 2,
    icon: "iconruku",
    children: [
      {
        path: '/demo/all',
        name: '视频',
        level: 1,
        badge: true,
        // code: 255,
        // meta: {
        //     code: 255,
        //     level: 1,
        // },
        component: () =>
          import(
            /* webpackChunkName:'workbench/index' */ '@v/demo/video/index'
          ),
      },
    ]
  },
];

export default routes;
