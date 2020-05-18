<template>
  <div class="modal" @click="closeModal">
    <div class="modal__body" @click="stopPropagation">
      <header class="modal__header">
        <slot name="header">
          <button type="button" class="modal__close-button" @click="closeModal">
            <fa-icon icon="times" />
          </button>
        </slot>
      </header>
      <section class="modal__body">
        <slot name="body"></slot>
      </section>
      <footer class="modal__footer">
        <slot name="footer">
          <button type="button" class="button button_light" @click="closeModal">
            Cancel
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    closeModal() {
      this.$emit("close");
    },
    stopPropagation(event) {
      event.stopPropagation();
    }
  }
};
</script>

<style>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__body {
  border-color: var(--black);
  background-color: var(--white);
  padding: 0.5rem 1rem;
}

.modal__close-button {
  border: none;
  font-size: 1.5rem;
  padding: 1.5rem;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}
</style>
