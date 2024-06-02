<template>
  <div class="stack-setup">
    <div class="stack stackFixed40">
      <div class="base-format">
        <div class="title-container">
          <h2> Attribute Configuration </h2>
          <button class="grey-button save-button"
                  :class="{'yellow-button': entityPropertiesLength}"
                  @click="saveToWorld">
            Save
          </button>
        </div>
      </div>
    </div>
    <div class="stack stack9 trueHeight">
      <div class="trueHeight">
        <table>
          <thead>
            <tr class="border-x1">
              <th class="order"> Order </th>
              <th class="name">Attribute </th>
              <th class="type">Type</th>
              <th class="link">Link Reference To</th>
              <th class="listType">List Type</th>
              <th class="remove"> </th>
            </tr>
          </thead>
          <tbody class="">
            <tr class="" v-for="(row,index) in referenceProperties" :key="row.id">
              <td>
                {{index}}
              </td>
              <td>{{row}}</td>
              <td v-if="referenceEntity[row]">{{ referenceEntity[row]['type']}} </td>
              <td v-if="referenceEntity[row]">{{ referenceEntity[row]['referenceTo']}} </td>
              <td v-if="referenceEntity[row]">{{ referenceEntity[row]['listType']}} </td>

              <td>
                <button v-if="row != 'name'" class="red-button save-button fit-button-small" 
                @click="removeAttribute(row)"> remove </button>
              </td>
            </tr>

            <tr class="yellow" v-for="row in entityProperties" :key="row.id">
              <td> </td>
              <td>
                {{row}}
              </td>
              <td>
                <VueMultiselect
                    v-model="template[row]['type']"
                    :options="attributeTypeList"
                    placeholder="Change Data Type..."
                    :show-labels="false"
                    @open="onOpen"
                    class="attribute-layout"
                    openDirection="below"
                    >
                    <template v-slot:option="{ option }">
                      <div v-if="typeof option !== 'object'">
                        <div class="title3">
                          {{option}}
                        </div>
                      </div>
                      <div v-else>
                        <div class="title3">
                          {{option.label}}
                        </div>
                      </div>
                    </template>
                </VueMultiselect>
              </td>
              <td>{{ template[row]['referenceTo'] }}</td>
              <td>{{ template[row]['listType'] }}</td>
              <td>
              </td>
            </tr>
            <tr class="empty-height" v-for="index in 10" :key="index">
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="stack stackFixed40">
      <div class="button-container border-top-x2">
      <input class="custom-input" v-model="inputValue" type="text"
      placeholder="Add New Attribute ...">
      <button class="blue-button save-button" @click="add"> Add Single </button>
      <button class="blue-button save-button" @click="refresh"> Add Shared </button>
      </div>
    </div>

  </div>
</template>

<script>
  import VueMultiselect from 'vue-multiselect'
  import {useWorldStore } from '@/store/world';

  export default {
    name: 'AttributeConfiguration',
    components:{
      VueMultiselect,
    },
    props: {
      entity: String,
      entityName: String,
    },
    computed:{
      testfire() {
        return this.$root.entityTemplate['entity'];
      },
      entityProperties() {
        if(this.template){
          return Object.keys(this.template);
        }
        else return [];
      },
      templateProperties() {
        if(this.template){
          return Object.keys(this.template);
        }
        else return [];
      },
      referenceProperties() {
        if(this.referenceEntity){
          return Object.keys(this.referenceEntity);
        }
        else return [];
      },
      entityPropertiesLength() {
        if(this.template){
          return Object.keys(this.template).length;
        }
        else return 0;
      },
      entityActive() {
        if(this.template || (this.referenceEntity != {})){
          return true;
        }
        else return false;
      },
      emptyRowsCount() {
        const totalRowsNeeded = 10;
        const filledRows = this.entityPropertiesLength;
        return Math.max(totalRowsNeeded - filledRows, 0);
      },
      entityReferenceAndTemplateList(){
        return [...this.entityProperties, ...this.entityProperties];
      }
    },
    mounted() {
      this.getAttributeTemplate();
    },
    watch: {
      entity(newValue, oldValue) {
        console.log("Entity Change", newValue, oldValue);
        this.getAttributeTemplate();
      },
      entityName(newValue, oldValue) {
        console.log("Entity Change", newValue, oldValue);
        this.getAttributeTemplate();
      },
    },
    methods: {
      getAttributeTemplate(){
        const world = useWorldStore();
        console.log("WHAT IS THIS ENTITY", this.entityName);

        console.log("WHAT IS ", this.$root.entityTemplate[this.entityName]);
        if (this.$root.entityTemplate[this.entityName]) {
          this.template = this.$root.entityTemplate[this.entityName];
          this.referenceEntity = world.getEntityTemplateInfo(this.entityName);
        }
        else{
          this.template = this.$root.entityTemplate[this.entityName] = {};
          this.referenceEntity = world.getEntityTemplateInfo(this.entityName);
        }
      },
			onOpen() {
				this.$nextTick(() => {
					const dropdownList = document.querySelector('.vue-multiselect-list');
					if (dropdownList) {
						dropdownList.style.border = '1px solid #ccc'; // Add border to dropdown list
						dropdownList.style.borderRadius = '4px'; // Optional: Add border radius for rounded corners
					}
				});
      },
      add(){
        if(this.inputValue === 'name'){
          window.alert("Name is defaulted and fixed");
          return false;
        }

        if(!this.template[this.inputValue]){
          this.template[this.inputValue] = {
            "name": this.inputValue,
            "type": 'number',
            "referenceTo": "",
            "listType": "",
          };
        }
      },
      addToRemoveList(name){
        name;
      },
      removeAttribute(name){
        console.log("Remove Property: ", name);
        const world = useWorldStore();
        world.deleteEntityTemplateInfoProperty(this.entityName, name);
      },
      saveToWorld(){
        if(!this.referenceEntity){
          window.alert("Reference Entity is Empty!");
          return false;
        }

        const world = useWorldStore();
        world.editEntityTemplateInfo(this.entityName, this.template);

        this.template = {};
        this.$root.entityTemplate[this.entityName] = {};
        this.$root.entityItem[this.entityName] = {};
        //this.$root.entityItem[this.selectedEntityName] = {};

        localStorage.setItem('world', JSON.stringify(this.$root.world));
      },
      refresh(){
        this.$forceUpdate();
      }
    },
    data: function(){
      return {
        test: 0,
        trueMaxHeight: 500,
        template: {},
        referenceEntity: {},
        inputValue: '',
        attributeTest: '',
        attributeTypeList: [
          'number',
          'string',
          'current_and_max',
          'boolean',
          'script_list',
          'resource',
          'table',
          'table_list',
          'image_url'
        ],
       }
    }
  }

</script>

<style scoped>

.base-format{
  margin-left: 10px;
  margin-top: -10px;
  box-sizing: border-box;
}

.trueHeight{
  height: 100%;
  overflow-y: auto;
}

table {
  height: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color:  white;
}

td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  position: sticky;
  top: 0;
  border-bottom: 2px solid black;
}

thead {
  height: 50px;
}

th.order {
  width: 3%; /* Adjust the width of the 'Name' column */
}

th.name {
  width: 15%; /* Adjust the width of the 'Name' column */
}

th.type {
  z-index: 60;
  width: 20%; /* Adjust the width of the 'Type' column */
}

th.link {
  width: 20%; /* Adjust the width of the 'Link Reference To' column */
}

th.listType {
  width: 20%; /* Adjust the width of the 'List Type' column */
}

th.remove {
  width: 10%; /* Adjust the width of the 'List Type' column */
}

tr{
  height: 20px;
}

tr:hover {
  background-color: lightblue; /* Highlight background on hover */
  border: 2px solid #000; /* Increase border size on hover */
}

h2 {
  text-decoration: underline;
  text-decoration-thickness: 2px;
}

button {
  width: 30%;
}

.button-container {
  display: flex;
  justify-content: left; /* Horizontally center the buttons */
  align-items: center; /* Vertically center the buttons */

  padding: 5px; /* Apply padding of 20 pixels inside the container */
  gap: 1%;
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-input {
  width: 200px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  font-family: "Neucha";
  outline: none; /* Remove default focus outline */
  height: 10px;
}

.custom-input:focus {
  border-color: dodgerblue; /* Change border color on focus */
}
.save-button{
  height: 30px;
  padding: 4px 5px;
}

.fit-button{
  width: 100%;
}

.fit-button-small{
  width: 100%;
  height: 80%;
}

.empty-height{
  height: 30px;
}

.lightblue{
  background-color: lightblue;
}

.yellow{
  background-color: #fbfae6;
}

</style>

