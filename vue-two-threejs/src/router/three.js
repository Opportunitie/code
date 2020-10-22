const routes = [
  {
    path: "/three",
    name: "3D",
    component: () => import(/* webpackChunkName:'workbench' */ "@/views/three")
  }
];

export default routes;
