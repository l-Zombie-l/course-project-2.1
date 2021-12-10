import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/home",
    name: "Home",
    component: () =>
      import('../views/Home.vue'),
    children: [
      {
        path: '/home/one',
        name: "One",
        component: () =>
          import('../views/docx/one.vue'),
      },
    ],
  },

  {
    path: "/register",
    name: "Register",   
    component: () =>
      import("../views/Register.vue"),
  },
  {
    path: "/add_news",
    name: "AddNews",
    component: () =>
      import("../views/AddNews.vue"),
  },
  {
    path: "/news",
    name: "news",  
    component: () => import("../views/News.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },

  {
    path: "/one",
    name: "one",
    component: () => import("../views/docx/one.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

