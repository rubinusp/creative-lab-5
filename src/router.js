import Vue from "vue";
import Router from "vue-router";
import Dex from "./views/Dex.vue";
import Team from "./views/Team.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/:gen?",
      name: "dex",
      component: Dex,
    },  
    {
      path: "/",
      redirect: "/:gen",
    },
    {
      path: "/team",
      name: "team",
      component: Team,
    },
  ]
});
