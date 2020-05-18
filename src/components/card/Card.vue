<template>
  <div class="card" :class="{ card_done: task.done }">
    <template v-if="isTaskFormOpen">
      <form @submit.prevent="updateTask" class="card__form">
        <section class="card__input">
          <div>
            <label for="name" class="label">Задание</label>
            <input
              type="text"
              v-model="taskCopy.title"
              class="text-input"
              id="name"
            />
          </div>
          <div>
            <label for="description" class="label">Описание</label>
            <textarea
              v-model="taskCopy.description"
              id="description"
              class="textarea"
            ></textarea>
          </div>
          <div>
            <label for="group" class="label">Группа</label>
            <select v-model="taskCopy.group" id="group">
              <option :value="null">Без группы</option>
              <option v-for="group in groups" :key="group.id" :value="group">{{
                group.title
              }}</option>
            </select>
          </div>
        </section>
        <footer class="card__footer">
          <button type="submit" class="button" :disabled="!taskCopy.title">
            Изменить
          </button>
          <button
            type="button"
            class="button button_light"
            @click="closeTaskForm"
          >
            Отмена
          </button>
        </footer>
      </form>
    </template>
    <template v-else>
      <header class="card__header" :class="{ card__header_short: !full }">
        <h3 class="card__title" :class="{ card__title_full: full }">
          {{ task.title }}
        </h3>
      </header>
      <section class="card__body" :class="{ card__body_short: !full }">
        <p
          class="card__description"
          :class="{ card__description_short: !full }"
        >
          {{ task.description }}
        </p>
      </section>
      <footer class="card__footer">
        <div class="card__controls">
          <button class="button button_light" @click="toggleFull">
            {{ full ? "Меньше" : "Раскрыть" }}
          </button>
          <input
            type="checkbox"
            v-model="task.done"
            class="card__checkbox"
            id="done"
            @change="toggleStatus"
          />
          <button class="button button_light" @click="openTaskForm">
            <fa-icon icon="pen" />
          </button>
          <button class="button button_light" @click="openDeleteTaskModal">
            <fa-icon icon="times" />
          </button>
        </div>
      </footer>
    </template>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isTaskFormOpen: false,
      isDeleteTaskModalOpen: false,
      taskCopy: null,
      full: false
    };
  },
  computed: {
    groups() {
      return this.$store.state.groups;
    }
  },
  methods: {
    openTaskForm() {
      this.isTaskFormOpen = true;
      this.taskCopy = { ...this.task };
    },
    closeTaskForm() {
      this.isTaskFormOpen = false;
    },
    openDeleteTaskModal() {
      this.$emit("delete", this.task);
    },
    updateTask() {
      this.$emit("update", this.taskCopy);
      this.closeTaskForm();
    },
    toggleStatus() {
      this.$emit("update", this.task);
    },
    toggleFull() {
      this.full = !this.full;
    }
  }
};
</script>

<style>
.card {
  border: 1px solid var(--black);
  border-radius: 2px;
  transition: all 500ms ease-out;
}

.card:hover {
  border-color: var(--primary-color);
}

.card:active {
  border-color: var(--secondary-color);
}

.card_done {
  opacity: 0.3;
}

.card__header,
.card__body,
.card__footer {
  padding: 0 1rem;
  display: flex;
}

.card__header,
.card__footer {
  display: flex;
  align-items: center;
}

.card__header_short {
  height: 3rem;
}

.card__footer {
  height: 3rem;
  justify-content: flex-end;
}

.card__body_short {
  height: 8rem;
  overflow: hidden;
}

.card__title,
.card__description {
  margin: 0;
}

.card__title {
  overflow: hidden;
  text-overflow: ellipsis;
}

.card__title_full {
  height: auto;
  word-wrap: break-word;
}

.card__description {
  height: 100%;
  width: 100%;
  word-wrap: break-word;
  position: relative;
}

.card__description_short:after {
  content: "";
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 70%;
  height: 1rem;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1) 50%
  );
}

.card__create-button {
  background-color: transparent;
  border: none;
  color: var(--primary-color);
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: all 500ms ease-out;
}

.card__create-button:hover {
  background-color: var(--primary-color);
  color: var(--white);
}

.card__create-button:active {
  background-color: var(--secondary-color);
  color: var(--white);
}

.card__form {
  width: 100%;
  height: 100%;
  padding: 0.5rem 0;
}

.card__input {
  height: 80%;
  padding: 0 1rem;
}

.card__checkbox {
  width: 1rem;
  height: 1rem;
}
</style>
