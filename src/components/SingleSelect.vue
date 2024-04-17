<template>
  <div class="custom-select">
    <div class="selected-option" @click="toggleDropdown">
      {{ selectedOption }}
      <i class="fa fa-angle-down"></i>
    </div>
    <div class="dropdown-menu" v-if="isDropdownOpen">
      <div class="option" v-for="option in options" :key="option" @click="selectOption(option)">
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      selectedOption: '',
      isDropdownOpen: false
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
      console.log("DID THIS WORK!?");
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
    }
  }
};
</script>

<style scoped>
.custom-select {
  position: relative;
  width: 200px;
}

.selected-option {
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.selected-option i {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #fff;
  border: 1px solid #ccc;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1;
  display: none;
}

.dropdown-menu.active {
  display: block;
}

.option {
  padding: 10px;
  cursor: pointer;
}

.option:hover {
  background: #f0f0f0;
}
</style>

