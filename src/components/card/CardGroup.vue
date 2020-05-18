<template>
  <div class="card-group">
    <card
      v-for="task in tasks"
      :task="task"
      :key="task.id"
      @delete="openDeleteTaskModal"
      @update="updateTask"
    ></card>
    <modal v-show="isDeleteTaskModalOpen" @close="closeDeleteTaskModal">
      <template v-slot:header>
        <h2>Удалить задание</h2>
      </template>
      <template v-slot:body>
        <p>
          Вы действительно хотите удалить задание "{{
            selectedTask ? selectedTask.title : ""
          }}"? Это действие будет невозможно отменить.
        </p>
      </template>
      <template v-slot:footer>
        <button type="button" class="button" @click="deleteTask">
          Удалить
        </button>
        <button
          type="button"
          class="button button_light"
          @click="closeDeleteTaskModal"
        >
          Отмена
        </button>
      </template>
    </modal>
  </div>
</template>

<script>
import Card from "./Card";
import Modal from "../modal/Modal";

export default {
  name: "CardGroup",
  components: { Card, Modal },
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteTaskModalOpen: false,
      selectedTask: null
    };
  },
  methods: {
    updateTask(task) {
      this.$emit("update", task);
    },
    openDeleteTaskModal(task) {
      this.isDeleteTaskModalOpen = true;
      this.selectedTask = task;
    },
    closeDeleteTaskModal() {
      this.isDeleteTaskModalOpen = false;
      this.selectedTask = null;
    },
    deleteTask() {
      this.$emit("delete", this.selectedTask.id);
      this.closeDeleteTaskModal();
    }
  }
};
</script>

<style>
.card-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(0, 21rem));
  grid-auto-rows: minmax(14rem, max-content);
  justify-content: space-around;
  padding: 1rem;
  gap: 1rem;
}
</style>
