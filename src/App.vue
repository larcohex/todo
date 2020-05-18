<template>
  <div id="app">
    <nav class="menu">
      <router-link
        to="/"
        class="menu__link"
        :class="{ menu__link_active: currentPage === 'Home' }"
        >Все</router-link
      >
      <div class="menu__group" v-for="group in groups" :key="group.id">
        <router-link
          :to="'/group/' + group.id"
          class="menu__link"
          :class="{ menu__link_active: currentPage === group.id }"
        >
          {{ group.title }}
        </router-link>
        <div class="menu__controls">
          <button class="button button_light" @click="openGroupModal(group)">
            <fa-icon icon="pen" />
          </button>
          <button
            class="button button_light"
            @click="openDeleteGroupModal(group)"
          >
            <fa-icon icon="times" />
          </button>
        </div>
      </div>
      <button class="button" @click="openGroupModal()">
        <fa-icon icon="plus" size="xs" />&nbsp;Добавить группу
      </button>
    </nav>
    <div class="content">
      <div class="menu__info_mobile">
        <a
          class="menu__link menu__link_active menu__link_mobile-title"
          @click="toggleMenu"
        >
          {{ currentPageName }}
          <fa-icon icon="caret-down" class="menu__icon_mobile" />
        </a>
        <nav class="menu menu_mobile" v-show="isMenuOpen">
          <div class="menu__group">
            <router-link
              to="/"
              class="menu__link"
              :class="{ menu__link_active: currentPage === 'Home' }"
              @click.native="toggleMenu"
            >
              Все
            </router-link>
          </div>
          <div class="menu__group" v-for="group in groups" :key="group.id">
            <router-link
              :to="'/group/' + group.id"
              class="menu__link"
              :class="{ menu__link_active: currentPage === group.id }"
              @click.native="toggleMenu"
            >
              {{ group.title }}
            </router-link>
            <div class="menu__controls">
              <button
                class="button button_light"
                @click="openGroupModal(group)"
              >
                <fa-icon icon="pen" />
              </button>
              <button
                class="button button_light"
                @click="openDeleteGroupModal(group)"
              >
                <fa-icon icon="times" />
              </button>
            </div>
          </div>
          <button class="button" @click="openGroupModal()">
            <fa-icon icon="plus" size="xs" />&nbsp;Добавить группу
          </button>
        </nav>
      </div>
      <router-view />
    </div>
    <modal v-show="isGroupModalOpen" @close="closeGroupModal">
      <template v-slot:header>
        <h2>{{ selectedGroup.id ? "Изменить" : "Создать" }} группу</h2>
      </template>
      <template v-slot:body>
        <label for="name" class="label">Название</label>
        <input
          type="text"
          id="name"
          v-model="selectedGroup.title"
          class="text-input"
        />
      </template>
      <template v-slot:footer>
        <button type="button" class="button" @click="submitGroup">
          {{ selectedGroup.id ? "Изменить" : "Создать" }}
        </button>
        <button
          type="button"
          class="button button_light"
          @click="closeGroupModal"
        >
          Отмена
        </button>
      </template>
    </modal>
    <modal v-show="isDeleteGroupModalOpen" @close="closeDeleteGroupModal">
      <template v-slot:header>
        <h2>Удалить группу</h2>
      </template>
      <template v-slot:body>
        <p>
          Вы действительно хотите удалить группу "{{ selectedGroup.title }}"?
          Это действие будет невозможно отменить.
        </p>
      </template>
      <template v-slot:footer>
        <button type="button" class="button" @click="deleteGroup">
          Удалить
        </button>
        <button
          type="button"
          class="button button_light"
          @click="closeDeleteGroupModal"
        >
          Отмена
        </button>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/modal/Modal";

export default {
  name: "App",
  components: { Modal },
  data() {
    return {
      isGroupModalOpen: false,
      isDeleteGroupModalOpen: false,
      selectedGroup: {
        title: ""
      },
      isMenuOpen: false
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    groups() {
      return this.$store.state.groups;
    },
    currentPage() {
      if (this.$route.name === "Home") {
        return "Home";
      } else if (this.$route.name === "Group") {
        return this.$route.params.id;
      } else return null;
    },
    currentPageName() {
      if (this.$route.name === "Home") {
        return "Все";
      } else if (this.$route.name === "Group") {
        for (let i = 0; i < this.groups.length; ++i) {
          if (this.groups[i].id === this.$route.params.id) {
            return this.groups[i].title;
          }
        }
        return null;
      } else return null;
    }
  },
  methods: {
    openGroupModal(group) {
      if (group) {
        this.selectedGroup = { ...group };
      }
      this.isGroupModalOpen = true;
    },
    closeGroupModal() {
      this.resetGroup();
      this.isGroupModalOpen = false;
    },
    openDeleteGroupModal(group) {
      if (group) {
        this.selectedGroup = group;
      }
      this.isDeleteGroupModalOpen = true;
    },
    closeDeleteGroupModal() {
      this.resetGroup();
      this.isDeleteGroupModalOpen = false;
    },
    resetGroup() {
      this.selectedGroup = { title: "" };
    },
    submitGroup() {
      this.$store.dispatch(
        this.selectedGroup.id ? "updateGroup" : "addGroup",
        this.selectedGroup
      );
      this.closeGroupModal();
    },
    deleteGroup() {
      this.$store.dispatch("removeGroup", this.selectedGroup.id);
      this.closeDeleteGroupModal();
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style>
@import "./assets/css/styles.css";

#app {
  display: flex;
  height: 100%;
  width: 100%;
}

.menu {
  flex: 0 0 18rem;
  padding: 1rem;
  overflow: hidden;
  display: none;
}

.menu_mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: initial;
  position: absolute;
  top: 0;
  background-color: var(--white);
  width: 100%;
  z-index: 1;
}

.menu .menu__link,
.menu button {
  margin-top: 0.5rem;
}

.menu .menu__link:first-child {
  margin-top: 0;
}

.menu__link {
  width: 100%;
  font-size: 1.5rem;
  opacity: 0.5;
  transition: opacity 500ms ease-out;
  color: var(--black);
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

.menu__link:hover,
.menu__link:active {
  opacity: 1;
}

.menu__link:active {
  color: var(--secondary-color);
}

.menu__link_active {
  color: var(--primary-color);
  opacity: 1;
}

.menu__link_mobile-title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}

.menu__controls {
  display: flex;
}

.menu__group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  flex: 1 0 0;
}

.menu__info_mobile {
  display: flex;
  justify-content: center;
}

.menu__icon_mobile {
  margin-left: 0.5rem;
}

@media (min-width: 1024px) {
  .menu {
    display: block;
  }

  .menu__info_mobile {
    display: none;
  }
}
</style>
