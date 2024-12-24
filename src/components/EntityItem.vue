<template>
  <div class="stack-setup">
    <div class="title-container">
      <input
          class="entity-item-name"
          placeholder="name..."
          v-model="replaceEntityItem.name"
          type="text"

          />
      <button class="grey-button save-button"
              :class="{'yellow-button': !same}"
              @click="replace"
              >
        Save
      </button>
    </div>
    <div class="edit-container">
      <!--TODO: This Contains the Attributes of a Entity, but with Nested Objects too-->
      <div class="item-attribute" v-for="(item) in templateOrder" :key="item">
        <!-- Main Loop-->
        <div class="item-set">
          <div class="left">
            {{item}}
          </div>
          <div class="right" v-if="templateInfo[item].type === 'number'">
            <input
            type="number" @keypress="preventNonNumericInput"
            v-model="replaceEntityItem[item]" class="entity-item-input" id="username" name="username">
          </div>
          <div class="right" v-else-if="templateInfo[item].type === 'string'">
            <input v-model="replaceEntityItem[item]" class="entity-item-input"
            type="textarea" id="username" name="username">
          </div>
          <div class="right" v-else-if="templateInfo[item].type === 'image_url'">
            <div v-if="replaceEntityItem[item]" class="image-container">
              <img
                 v-if="replaceEntityItem[item]"
                 :src="replaceEntityItem[item]"
                 alt="empty..."
                 class="fixed-size scalable-image"
                 @load="onImageLoad">

            </div>
            <p>Image size: {{ imageDimensions.width }}x{{ imageDimensions.height }}</p>
            <input v-model="replaceEntityItem[item]"
                   class="entity-item-input-straight"
            type="text" id="username" name="username">
          </div>
          <div class="right"
               v-else-if="templateInfo[item].type === 'current_and_max'"
                             >
            Current: <input v-model="replaceEntityItem[item].current" class="entity-item-input"
                                                     type="textarea" id="username" name="username">
            Max: <input v-model="replaceEntityItem[item].max" class="entity-item-input"
            type="textarea" id="username" name="username">
          </div>
          <div class="right"
               v-else-if="templateInfo[item].type === 'list_to_entity'">
            <div v-for="(row, index) in replaceEntityItem[item]" :key="row">
              <div>
                <div v-for="(row2, index2) in templateInfo[item].templateInfo" :key="index2">
                  {{index2}} {{row2}}
                  <template v-if="row2.type === 'number'">
                    <input
                        type="number"
                        v-model.lazy="replaceEntityItem[item][index2]" class="entity-item-input"
                        @input="same"
                        >
                  </template>

                  <template v-else-if="row2.type === 'string'">
                    <input
                        type="text"
                        v-model.lazy="replaceEntityItem[item][index2]" class="entity-item-input"
                        @input="same"
                        >
                  </template>
                </div>
                </div>
                <button class="grey-button save-button"
                        :class="{'yellow-button': !same}"
                        @click="removeFromList(replaceEntityItem[item], index)"
                        >
                       Remove
                </button>
              </div>
              <button class="grey-button save-button"
                      :class="{'yellow-button': !same}"
                      @click="addObjectToList(replaceEntityItem[item])"
                      >
                      Add
              </button>
          </div>
          <div class="right"
               v-else-if="templateInfo[item].type === 'entity_list_'">
          </div>
          <div class="right" v-else>
          </div>
        </div>
        <div v-if="templateInfo[item].type === 'shared_attribute'">
        <div class="item-set">
          <div class="left">
            {{item}}
          </div>
       </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {useWorldStore } from '@/store/world';

	export default {
    name: 'EntityItem',
    components:{
    },
    mounted(){
      this.getEntityItemData();
    },
    watch: {
      entityItemKey(){
        this.getEntityItemData();
      },
      same(newValue){
        console.log("SAME", newValue);
        /*
        this.$emit('update-entity-item-list'
          , this.entityName, this.entityItemKey, !newValue);
          */
      }
    },
    data: function() {
      return {
        test: '',
        entityItem: {},
        replaceEntityItem: {},
        templateInfo: {},
        templateOrder: [],
        currentEntityItem: {},
        imageDimensions: {height: 0, width: 0},
      }
    },
    props: {
      entityItemKey: Number,
      entityName: String,
    },
    methods: {
      getEntityItemData(){
        const world = useWorldStore();
        world;
        this.templateInfo = world.getEntityTemplateInfo(this.entityName);
        console.log("GIVE ME TEMPLATE INFO", JSON.stringify(this.templateInfo));

        //If No MAIN Saved Reference make a new one
        world.saveEntityHistory(this.entityName);
        this.replaceEntityItem = world.getEntityEdits(this.entityName, this.entityItemKey);
        this.currentEntityItem = world.getEntityListItem(this.entityName, this.entityItemKey);

        this.templateOrder = world.getEntityTemplateOrder(this.entityName);

        console.log("REFERENCE ITEM", JSON.stringify(this.replaceEntityItem));


      },
      replace(){
        const world = useWorldStore();
        world.editEntityListItem(this.entityName, this.entityItemKey,
          this.replaceEntityItem);

        world.resetEntityItemHistory(this.entityName, this.entityItemKey);
        this.getEntityItemData();

        localStorage.setItem('world', JSON.stringify(this.$root.world));
      },
      preventNonNumericInput(event) {
        // Get the input value
        const inputValue = event.key;

        // Check if the input value is a number or allowed control characters
        const isNumber = /^[0-9]$/.test(inputValue);
        const isControlCharacter =
          event.key === 'Backspace' ||
          event.key === 'Delete' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight' ||
          event.key === 'Tab';

        // Prevent input if it's not a number or a control character
        if (!isNumber && !isControlCharacter) {
          event.preventDefault();
        }
      },
      itemIsChanged(newItem, oldItem, type){
        //console.log("OLD ITEM", oldItem);
        //console.log("NEW ITEM", newItem);
        //console.log("TYPE ", type);
        if(type === 'current_and_max'){
          if(newItem.current !== oldItem.current || newItem.max !== oldItem.max){
            return true;
          }
        }
        else return (newItem !== oldItem);
      },
      onImageLoad(event){
        const img = event.target;
        this.imageDimensions = {
          width: img.naturalWidth,
          height: img.naturalHeight
        };
      },
      addObjectToList(list) {
        list.push({});
      },
      removeFromList(array, index) {
        if (index >= 0 && index < array.length) {
          array.splice(index, 1);
        }
      }
    },
    computed:{
      list() {
        console.log("COMPUTE", this.replaceEntityItem);
        if(!(this.replaceEntityItem === {})){
          return Object.keys(this.replaceEntityItem).filter(key => key !== 'name');
        }
        else return [];
      },
      templateList(){
          return Object.keys(this.templateInfo).filter(key => key !== 'name');
      },
      templateOrderL(){
        return Object.keys(this.templateInfo).filter(key => key !== 'name');
        /*
        const world = useWorldStore();
        world;
        let list = world.getEntityTemplateOrder(this.entityName);
        return list.filter(item => item !== 'name');*/
      },
      same() {
        let obj1 = this.replaceEntityItem;
        let obj2 = this.currentEntityItem;
				// Get the keys of both objects
				const keys1 = Object.keys(obj1);
        //const keys2 = Object.keys(obj2);
        console.log("KEYS PELASE", keys1);

				// Iterate through keys and compare values
        for (let key of keys1) {
          // If values are not equal, objects are not equal
          if(typeof obj1[key] === 'object' && obj1[key] !== null){
            //console.log("OBJECTED", obj1[key]);
            //console.log("OBJECTED", obj2[key]);
            if(obj1[key].current !== obj2[key].current) return false;
            if(obj1[key].max !== obj2[key].max) return false;
          }
					else if (obj1[key] !== obj2[key]) {
						return false;
					}
				}

				// If all keys and values match, objects are equal
				return true;
			},
      getEntityTypes(){
        const world = useWorldStore();
				return world.getEntityTypes;
      }
    },
	}
</script>

<style scoped>

.title-container {
  padding: 10px; /* Apply padding of 20 pixels inside the container */
  width: 100%;
  display: flex;

  box-sizing: border-box;
  gap: 10%;

}

.edit-container{
  padding: 10px; /* Apply padding of 20 pixels inside the container */
  align-items: flex-start;
}

.entity-item-name{
  border-style: hidden;
  font-family: inherit;
  font-size: 20px;
  height: 30px;
  width: 100%;

	font-weight: bold;
  border-radius: 3px;
  flex: 60%;

  background-color: #f5f5f5;
  border-bottom: 3px solid black;
}

.entity-item-name:focus{
  outline: none;
}

.save-button{
  flex: 40%;
  height: 33px;
}

.item-attribute{
  /*border: 1px solid black;*/
}

.entity-item-attribute{
  border-style: hidden;
  font-family: inherit;
  font-size: 18px;

  border-radius: 3px;
  border-bottom: 1px solid black;
}

.entity-item-attribute:focus{
  outline: none;
}

.entity-item-attribute label:after{
  background-color: #f5f5f5;
}


.entity-item-input{
  border-style: hidden;
  font-family: inherit;
  font-size: 15px;
  height: 100%;
  width: 25%;

	font-weight: bold;
  border-radius: 3px;
  flex: 60%;

  background-color: #f5f5f5;
}

.entity-item-input:focus{
  outline: none;
}

.entity-item-input-straight{
  border-style: hidden;
  font-family: inherit;
  font-size: 15px;
  width: 100%;
	font-weight: bold;
  border-radius: 3px;
  background-color: #f5f5f5;
}

.entity-item-input:focus{
  outline: none;
}


.item-set{
  display: flex;
  border: 1px solid black;
  font-size: 15px;
}

.item-set:hover{
	background-color: lightblue;
}

.left {
  flex: 15%;
  text-align: center;
  flex-wrap: wrap;
  word-break: break-all;
  font-weight: bold;
  font-size: 15px;

	padding: 4px;
}

.right {
  flex: 80%;

	padding: 4px;
}

.image-container {
  max-width: 250px;
  max-height: 250px;
  margin-bottom: 10px;
  overflow: hidden;
}

.scalable-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

::v-deep .multiselect {
  height: 20px;
}

::v-deep .multiselect__tags {
  height: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}

::v-deep .multiselect__single {
  padding-top: 2px;
  font-size: 18px;
}

::v-deep .multiselect__input {
  padding-top: 2px;
  font-size: 100px;
}

.select-container {
  font-family: Arial, sans-serif;
  max-width: 300px;
}

label {
  display: block;
  font-weight: bold;
  color: #333;
  font-size: 15px;
  font-family: inherit;
}

select {
  width: 25%;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: background-color 0.3s;
  font-family: inherit;
}

select:focus {
  outline: none;
  background-color: #e0e0e0;
}

.selection-text {
  font-style: italic;
  color: #007bff;
  font-size: 15px;
  font-weight: bold;
  font-family: inherit;
}

</style>

