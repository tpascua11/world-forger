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
      <!--
      <div class="item-attribute" v-for="(item) in list" :key="item">
        <div class="item-set">
          <div class="left">
            {{item}}
          </div>
          <div class="right">
            <input v-model="replaceEntityItem[item]" class="entity-item-input" type="number" id="username" name="username">
          </div>
        </div>
      </div>
      -->
      <div class="item-attribute" v-for="(item) in templateList" :key="item">
        <div class="item-set"
          :class="{'is-changed': replaceEntityItem[item] !== currentEntityItem[item]}">
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
        </div>
      </div>

    </div>
  </div>
</template>

<script>
	export default {
    name: 'EntityItem',
    mounted(){
      this.getEntityItemData();
    },
    watch: {
      entityItemKey(){
        this.getEntityItemData();
      },
      same(newValue){
        console.log("SAME", newValue);
        this.$emit('update-entity-item-list'
          , this.entityName, this.entityItemKey, !newValue);
      }
    },
    data: function() {
      return {
        test: '',
        entityItem: {},
        replaceEntityItem: {},
        templateInfo: {},
        currentEntityItem: {},
      }
    },
    props: {
      entityItemKey: Number,
      entityName: String,
    },
    methods: {
      getEntityItemData(){
        this.templateInfo =
          this.$root.world['Entity'][this.entityName].templateInfo;
        //let referenceItem =
        console.log("GIVE ME TEMPLATE INFO", JSON.stringify(this.templateInfo));
        //  this.entityItem = this.$root.world['Entity'][this.entityName].list[this.entityItemKey];

        //If No MAIN Saved Reference make a new one
        if(!this.$root.entityItem[this.entityName]){
          this.$root.entityItem[this.entityName] = {};
        }

        //If There is Save Reference Copy It
        if(this.$root.entityItem[this.entityName][this.entityItemKey]){
          console.log("REFERENCE COPY");
          this.replaceEntityItem =
            this.$root.entityItem[this.entityName][this.entityItemKey];
        }
        //Else If There is no Save Reference but the REAL entity and item is there
        else{
          console.log("REAL COPY");

          this.$root.entityItem[this.entityName][this.entityItemKey] =
          this.replaceEntityItem =
            JSON.parse(JSON.stringify(
              this.$root.world['Entity'][this.entityName].list[this.entityItemKey]));


        }

        this.currentEntityItem = this.$root.world['Entity'][this.entityName].list[this.entityItemKey];
        console.log("REFERENCE ITEM", JSON.stringify(this.replaceEntityItem));

      },
      replace(){
        let obj1 = this.currentEntityItem;
        let obj2 = this.replaceEntityItem;

        for (let key in this.templateInfo) {
            obj1[key] = obj2[key];
        }

        this.$root.entityItem[this.entityName][this.entityItemKey] = null;
        this.getEntityItemData();
        this.$emit('update-parent', 'Data from child component');

        //obj2 = null;

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
      same() {
        let obj1 = this.replaceEntityItem;
        let obj2 = this.currentEntityItem;
				// Get the keys of both objects
				const keys1 = Object.keys(obj1);
				//const keys2 = Object.keys(obj2);

				// Iterate through keys and compare values
				for (let key of keys1) {
					// If values are not equal, objects are not equal
					if (obj1[key] !== obj2[key]) {
						return false;
					}
				}

				// If all keys and values match, objects are equal
				return true;
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

	padding: 4px;
}

.right {
  flex: 80%;

	padding: 4px;
}

</style>

