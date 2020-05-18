import Vue from "vue";
import localForage from "localforage";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretDown,
  faObjectGroup,
  faPen,
  faPlus,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.config.productionTip = false;

library.add(faCaretDown, faObjectGroup, faPen, faPlus, faTimes);
Vue.component("fa-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    localForage.getItem("todo-state").then(state => {
      store.state.tasks = state.tasks;
      store.state.groups = state.groups;
      store.state.init = true;
    });
  }
}).$mount("#app");
