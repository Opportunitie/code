import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login.vue";
import P404 from "@/views/404.vue";
import Home from "@/views/layout/index.vue";
import PrintPreview from "@/views/PrintPreview.vue";

// import demo from "./demo/index";
import HomePageRoutes from "./home-page/index";
import ExcelToolRoutes from "./excel-tool/index";
// import orderManagementRoutes from "./orderManagement/index";
import Store from "@/store";
import { gotologin } from "@/utils";

if (process.env.NODE_ENV == "develop") {
  const originalPush = VueRouter.prototype.push;
  VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
      return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch((err) => err);
  };
}

export const routes = [
  {
    path: "/",
    component: Home,
    code: 4,
    meta: {
      level: 2,
    },
    redirect: "/home-page",
    children: [
      ...HomePageRoutes,
      ...ExcelToolRoutes,
      // ...orderManagementRoutes,
    ],
  },
  {
    path: "/404",
    meta: {
      level: 2,
    },
    component: P404,
    name: "样例",
  },
  {
    path: "/login",
    component: Login,
    meta: {
      level: 2,
    },
    name: "登录",
  },
  {
    path: "/printPreview",
    component: PrintPreview,
    meta: {
      level: 2,
    },
    name: "打印预览",
  },
  {
    path: "*",
    redirect: "/",
  },
];

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  base: process.env.VUE_APP_ENVIRONMENT === "development" ? "" : "/rxe/admin",
  scrollBehavior: () => ({ y: 0 }),
  routes: routes,
});

function depthFirstSearch(node, result) {
  if (node) {
    const { code = 0, level = 0, name = "", path = "" } = node;
    result.push({ code, level, name, path });
    if (!node.children) {
      return;
    }
    let children = node.children;
    for (let i = 0; i < children.length; i++) {
      depthFirstSearch(children[i], result);
    }
  }
  return result;
}
const noAuthPath = ["/404", "/printPreview", "/login"];
const routeInfo = depthFirstSearch(routes[0], []);
let mapToRoute = {};
let mapToCode = {};
routeInfo.forEach((item) => {
  mapToRoute[item.code] = item.path;
  mapToCode[item.path] = item.code;
});
router.beforeEach((to, from, next) => {
  next()
  // const { path = "/" } = to;
  // const rules = JSON.parse(window.localStorage.getItem("rules")) || [];
  // let token = localStorage.getItem("token");
  // if (token && path == "/login") {
  //   Store.dispatch("clearInfos");
  //   gotologin();
  //   next();
  //   return;
  // }
  // if (!token && path != "/login") {
  //   Store.dispatch("clearInfos");
  //   gotologin(true, next);
  //   return;
  // }
  // if (noAuthPath.includes(path)) {
  //   next();
  //   return;
  // }
  // if (rules.includes(mapToCode[path])) {
  //   next();
  //   return;
  // } else if (rules.length !== 0) {
  //   next(mapToRoute[rules[1]]);
  // } else {
  //   next({
  //     path: "/404",
  //   });
  // }
});

export default router;
