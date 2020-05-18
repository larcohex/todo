<template>
  <div>
    <header class="task-list__header">
      <div class="task-list__filters">
        <input type="text" placeholder="Поиск" v-model="taskFilter" />
        <div style="display: flex;">
          <div class="task-list__input">
            <input type="checkbox" id="done" v-model="closed" />
            <label for="done" class="task-list__label">Завершенные</label>
          </div>
          <div class="task-list__input">
            <input type="checkbox" id="open" v-model="open" />
            <label for="open" class="task-list__label">Открытые</label>
          </div>
        </div>
      </div>
      <button class="button" @click="openCreateTaskModal">
        <fa-icon icon="plus" size="xs" />&nbsp;Добавить задание
      </button>
    </header>
    <card-group
      :tasks="tasks"
      @update="updateTask"
      @delete="deleteTask"
    ></card-group>
    <modal v-show="isCreateTaskModalOpen" @close="closeCreateTaskModal">
      <template v-slot:header>
        <h2>Создать задание</h2>
      </template>
      <template v-slot:body>
        <div>
          <label for="name" class="label">Задание</label>
          <input
            type="text"
            id="name"
            v-model="newTask.title"
            class="text-input"
          />
        </div>
        <div>
          <label for="description" class="label">Описание</label>
          <textarea
            v-model="newTask.description"
            id="description"
            class="textarea"
          ></textarea>
        </div>
        <div>
          <label for="group" class="label">Группа</label>
          <select v-model="newTask.group" id="group">
            <option :value="null">Без группы</option>
            <option v-for="group in groups" :key="group.id" :value="group">{{
              group.title
            }}</option>
          </select>
        </div>
      </template>
      <template v-slot:footer>
        <button type="button" class="button" @click="createTask">
          Создать
        </button>
        <button
          type="button"
          class="button button_light"
          @click="closeCreateTaskModal"
        >
          Отмена
        </button>
      </template>
    </modal>
  </div>
</template>

<script>
import CardGroup from "@/components/card/CardGroup";
import Modal from "@/components/modal/Modal";

export default {
  name: "TaskList",
  components: { CardGroup, Modal },
  data() {
    return {
      isCreateTaskModalOpen: false,
      newTask: {
        title: "",
        description: "",
        done: false,
        group: null
      },
      taskFilter: "",
      closed: false,
      open: false
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks.filter(task => {
        return (
          (this.$route.name === "Group"
            ? task.group && task.group.id === this.$route.params.id
            : true) &&
          task.title.toLowerCase().startsWith(this.taskFilter.toLowerCase()) &&
          (this.open ? !task.done : true) &&
          (this.closed ? task.done : true)
        );
      });
    },
    groups() {
      return this.$store.state.groups;
    }
  },
  watch: {
    open(newOpenFilter) {
      if (newOpenFilter && this.closed) {
        this.closed = false;
      }
    },
    closed(newClosedFilter) {
      if (newClosedFilter && this.open) {
        this.open = false;
      }
    }
  },
  methods: {
    openCreateTaskModal() {
      this.isCreateTaskModalOpen = true;
    },
    closeCreateTaskModal() {
      this.isCreateTaskModalOpen = false;
      this.resetNewTask();
    },
    resetNewTask() {
      this.newTask.title = "";
      this.newTask.description = "";
    },
    createTask() {
      this.$store.dispatch("addTask", this.newTask);
      this.closeCreateTaskModal();
    },
    updateTask(task) {
      this.$store.dispatch("updateTask", task);
    },
    deleteTask(taskId) {
      this.$store.dispatch("removeTask", taskId);
    }
  }
};
</script>

<style scoped>
.task-list__header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.5rem 1rem;
}

.task-list__filters {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.task-list__input {
  margin-left: 1rem;
}

.task-list__label {
  margin-left: 0.5rem;
}
</style>
