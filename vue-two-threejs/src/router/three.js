const routes = [
  {
    path: "/three",
    name: "3D",
    component: () => import(/* webpackChunkName:'workbench' */ "@/views/three")
  },
  {
    path: "/three/line",
    name: "3D",
    component: () =>
      import(/* webpackChunkName:'workbench' */ "@/views/three/drawLine")
  },
  {
    path: "/three/word",
    name: "3D",
    component: () =>
      import(/* webpackChunkName:'workbench' */ "@/views/three/word")
  }
];

export default routes;
