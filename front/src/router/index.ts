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
      {
        path: '/home/two',
        name: "Two",
        component: () =>
          import('../views/docx/two.vue'),
      },
      {
        path: '/home/three',
        name: "Three",
        component: () =>
          import('../views/docx/three.vue'),
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
      import("../views/news/AddNews.vue"),
  },
  {
    path: "/edit_news",
    name: "EditNews",
    component: () =>
      import("../views/news/EditNews.vue"),
  },
  {
    path: "/open_news",
    name: "OpenNews",
    component: () =>
      import("../views/news/OpenNews.vue"),
  },
  {
    path: "/news",
    name: "news",  
    component: () => import("../views/news/News.vue"),
  },
  {
    path: "/add_task",
    name: "add_task",
    component: () => import("../views/AddTask.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

