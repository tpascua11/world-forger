<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <div class="item-list">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="item"
          :class="{ 'non-draggable': item === 'name' }"
          draggable="true"
          @dragstart="dragStart(index)"
          @dragover.prevent
          @drop="drop(index)"
        >
          {{ item }}
          <span class="drag-handle">☰</span>
        </div>
      </div>
      <div class="modal-actions">
        <button @click="save">Save</button>
        <button @click="close">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReorderableArrayModal',
  props: {
    isOpen: Boolean,
    title: {
      type: String,
      default: 'Reorder Items'
    },
    initialItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      items: [],
      draggedItem: null
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.items = [...this.initialItems];
      }
    }
  },
  computed: {
    nameItemIndex() {
      return this.items.findIndex(item => item === 'name');
    }
  },
  methods: {
    dragStart(index) {
      if (this.items[index] !== 'name') {
        this.draggedItem = index;
      }
    },
    drop(index) {
      if (this.draggedItem !== null && this.items[this.draggedItem] !== 'name' && this.items[index] !== 'name') {
        const itemToMove = this.items.splice(this.draggedItem, 1)[0];
        this.items.splice(index, 0, itemToMove);
        this.draggedItem = null;
      }
    },
    save() {
      let updatedItems = [...this.items];

      // Check if 'name' exists in the list
      const nameIndex = updatedItems.indexOf('name');
      // If 'name' exists and it's not already at the top, move it to the top
      if (nameIndex !== -1 && nameIndex !== 0) {
        updatedItems.splice(nameIndex, 1);
        updatedItems.unshift('name');
      }

      this.$emit('reorder', updatedItems);
      this.close();
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
}

.item-list {
  margin-bottom: 20px;
}

.item {
  padding: 10px;
  background-color: #f0f0f0;
  margin-bottom: 5px;
  cursor: move;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drag-handle {
  cursor: grab;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
}

.non-draggable {
  cursor: not-allowed;
  background-color: lightgreen;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
}
</style>
