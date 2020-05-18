import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";
import localForage from "localforage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    groups: [],
    init: false
  },
  actions: {
    addTask({ state }, newTask) {
      state.tasks.push({ ...newTask, id: uuidv4() });
      localForage.setItem("todo-state", state);
    },
    updateTask({ state }, task) {
      for (let i = 0; i < state.tasks.length; ++i) {
        if (state.tasks[i].id === task.id) {
          state.tasks[i].title = task.title;
          state.tasks[i].description = task.description;
          state.tasks[i].done = task.done;
          state.tasks[i].group = task.group;
          break;
        }
      }
      localForage.setItem("todo-state", state);
    },
    removeTask({ state }, taskId) {
      for (let i = 0; i < state.tasks.length; ++i) {
        if (state.tasks[i].id === taskId) {
          state.tasks.splice(i, 1);
          break;
        }
      }
      localForage.setItem("todo-state", state);
    },
    addGroup({ state }, newGroup) {
      state.groups.push({ ...newGroup, id: uuidv4() });
      localForage.setItem("todo-state", state);
    },
    updateGroup({ state }, group) {
      for (let i = 0; i < state.groups.length; ++i) {
        if (state.groups[i].id === group.id) {
          state.groups[i].title = group.title;
          break;
        }
      }
      localForage.setItem("todo-state", state);
    },
    removeGroup({ state }, groupId) {
      for (let i = 0; i < state.groups.length; ++i) {
        if (state.groups[i].id === groupId) {
          state.groups.splice(i, 1);
          break;
        }
      }
      localForage.setItem("todo-state", state);
    }
  }
});
