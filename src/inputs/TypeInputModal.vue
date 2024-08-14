<!-- Modal.vue -->
<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>New Attribute</h2>
        <button @click="close" class="close-button">&times;</button>
      </div>
      <div class="modal-body">
        <div class="input-container">
          <label for="name-input">Name:</label>
					<input class="custom-input" v-model="name" type="text" placeholder="Add New Attribute ...">
        </div>
        <div class="multiselect-container">
          <label for="name-input">Attribute:</label>
          <VueMultiselect
            v-model="type"
            :options="items"
            :taggable="true"
            tag-placeholder="Add this as new tag"
            placeholder="Select or Add Property..."
            :show-labels="false"
            @input="updateSelectedItem"
          />
        </div>
      </div>
      <div class="modal-footer">
				<button class="blue-button save-button" @click="add"> Confirm </button>
			</div>
    </div>
  </div>
</template>

<script>

import VueMultiselect from 'vue-multiselect'

export default {
  components: {
    VueMultiselect,
  },
  props: {
    isOpen: Boolean,
    items: Array,
  },
  data() {
    return {
      name: '',
      type: 'number',
      selectedItem: null,
    }
  },
  methods: {
    updateSelectedItem(item) {
      this.selectedItem = item;
    },
    confirm() {
      if (this.name && this.selectedItem) {
        this.$emit('confirm', { name: this.name, item: this.selectedItem });
        this.close();
      }
    },
		add(){
			if(this.name === 'name'){
				window.alert("Name is defaulted and fixed");
				return false;
      }


      let template = {
        "name": this.name,
        "type": this.type,
				"referenceTo": "",
				"listType": "",
      };
      console.log("new attribute", template);
      this.$emit('add', template);
      this.close();
      /*
			if(!this.template[this.inputValue]){
				this.template[this.inputValue] = {
					"name": this.inputValue,
					"type": 'number',
				};
      }
      */
		},
    close() {
      this.name = '';
      this.type = 'number';
      this.selectedItem = null;
      this.$emit('close');
    },
  },
};
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
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
}

.modal-body {
  padding: 20px;
}

.input-container {
  margin-bottom: 15px;
}

.input-container label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #495057;
}

.input-container input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

.multiselect-container {
  margin-bottom: 15px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.confirm-button, .cancel-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
}

.confirm-button {
  background-color: #007bff;
  color: white;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
}

/* VueMultiselect custom styles */
::v-deep .multiselect__tags {
  min-height: 40px;
  padding: 8px 40px 0 8px;
  border-radius: 4px;
  border: 1px solid #ced4da;
  background: #fff;
  font-size: 14px;
}

::v-deep .multiselect__single {
  padding-left: 5px;
  margin-bottom: 8px;
}

::v-deep .multiselect__input {
  width: 100% !important;
}

::v-deep .multiselect__content-wrapper {
  width: 100% !important;
}

.custom-input {
	width: 200px;
	padding: 10px;
	border: 2px solid #ccc;
	border-radius: 5px;
	font-size: 16px;
	font-family: "Neucha";
	outline: none; /* Remove default focus outline */
	height: 20px;
}

.custom-input:focus {
	border-color: dodgerblue; /* Change border color on focus */
}


</style>
