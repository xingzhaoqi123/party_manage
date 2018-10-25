import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const components = {
  login: () => import("../views/login"),
  layout: () => import("../views/layout"),
  home: () => import("../views/home"),
  to_404: () => import("../views/404"),
  to_403: () => import("../views/403"),
  manage_list: () => import("../views/manage/manage_list"),
  manage_add: () => import("../views/manage/manage_add"),
  news_list: () => import("../views/news/news_list"),
  news_add: () => import("../views/news/news_add"),
  swiper_add: () => import("../views/swiper/swiper_add"),
  swiper_list: () => import("../views/swiper/swiper_list")
};

export default new Router({
  routes: [
    {
      path: "*",
      component: components.to_404
    },
    {
      path: "/",
      name: "login",
      component: components.login
    },
    {
      path: "/layout",
      name: "layout",
      component: components.layout,
      redirect: "/layout/home",
      children: [
        {
          path: "home",
          title: "首页",
          component: components.home
        },
        {
          path: "404",
          name: "404",
          component: components.to_404
        },
        {
          path: "manage_list",
          name: "manage_list",
          title: "管理员列表",
          component: components.manage_list
        },
        {
          path: "manage_add",
          name: "manage_add",
          title: "添加管理员",
          component: components.manage_add
        },
        {
          path: "news_list",
          title: "新闻列表",
          component: components.news_list
        },
        {
          path: "news_add",
          title: "添加新闻",
          component: components.news_add
        },{
          path:'swiper_add',
          title:'添加轮播图',
          component:components.swiper_add
        },{
          path:"swiper_list",
          title:'轮播图列表',
          component:components.swiper_list
        }
      ]
    }
  ]
});
