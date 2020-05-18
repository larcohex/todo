import Vue from "vue";
import VueRouter from "vue-router";
import TaskList from "../views/TaskList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/group/:id",
    name: "Group",
    component: TaskList
  },
  {
    path: "/",
    name: "Home",
    component: TaskList
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
