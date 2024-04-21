<template>
  <div class="stack-setup">
    <!--<div class="stack stack05 border-top-x2"> -->
    <div class="stack stackFixed40 border-top-x2">
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
              <th class="name">Attribute </th>
              <th class="type">Type</th>
              <th class="link">Link Reference To</th>
              <th class="listType">List Type</th>
            </tr>
          </thead>
          <tbody class="">
            <tr class="" v-for="row in referenceProperties" :key="row.id">
              <td>{{row}}</td>
              <td v-if="referenceEntity[row]">{{ referenceEntity[row]['type']}} </td>
              <td v-if="referenceEntity[row]">{{ referenceEntity[row]['referenceTo']}} </td>
              <td v-if="referenceEntity[row]">{{ referenceEntity[row]['listType']}} </td>
            </tr>

            <tr class="yellow" v-for="row in entityProperties" :key="row.id">
              <td>{{row}}</td>
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
            </tr>
            <tr class="empty-height" v-for="index in 10" :key="index">
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
  <!--
  <div class="trueHeight">
    <table>
      <thead>
        <tr class="border-x1">
          <th class="name">Name</th>
          <th class="type">Type</th>
          <th class="link">Link Reference To</th>
          <th class="listType">List Type</th>
        </tr>
      </thead>
      <tbody class="">
        <tr v-for="row in attributeTemplate" :key="row.id">
          <td>{{ row['Name'] }}</td>
          <td>{{ row['Type']}}</td>
          <td>{{ row['Link Reference To']}}</td>
          <td>{{ row['List Type']}}</td>
        </tr>
        <tr v-for="row in attributeTemplate" :key="row.id">
          <td>{{ row['Name'] }}</td>
          <td>{{ row['Type']}}</td>
          <td>{{ row['Link Reference To']}}</td>
          <td>{{ row['List Type']}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  -->
</template>

<script>
import VueMultiselect from 'vue-multiselect'
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
        /*
        if(this.selectedEntity){
          return Object.keys(this.selectedEntity);
        }
        */
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
        if(this.$root.entityTemplate[this.entityName]){
          console.log("WHAT IS THIS ENTITY", this.entityName);
          this.template = this.$root.entityTemplate[this.entityName];

          this.referenceEntity = this.$root.world['Entity'][this.entityName];
        }
        else{
          console.log("WHAT IS THIS ENTITY", this.entityName);
          this.template = this.$root.entityTemplate[this.entityName] = {};

          this.referenceEntity = this.$root.world['Entity'][this.entityName];
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
        if(!this.template[this.inputValue]){
          this.template[this.inputValue] = {
            "name": this.inputValue,
            "type": '',
            "referenceTo": "",
            "listType": "",
          };
        }
      },
      saveToWorld(){
        console.log("Save This Template", this.template);
        for (let key in this.template) {
          this.referenceEntity[key] = this.template[key];
        }
        this.template = {};
        //this.$emit('updateAttribute', this.entityName, this.template);
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
        attributeTemplate:
        [
          {
            "Name": "Object1",
            "Type": "Type1",
            "Link Reference To": "Reference1",
            "List Type": "ListType1"
          },
          {
            "Name": "Object2",
            "Type": "Type2",
            "Link Reference To": "Reference2",
            "List Type": "ListType2"
          },
          {
            "Name": "Object3",
            "Type": "Type3",
            "Link Reference To": "Reference3",
            "List Type": "ListType3"
          },
          {
            "Name": "Object4",
            "Type": "Type1",
            "Link Reference To": "Reference4",
            "List Type": "ListType4"
          },
          {
            "Name": "Object5",
            "Type": "Type2",
            "Link Reference To": "Reference5",
            "List Type": "ListType5"
          },
          {
            "Name": "Object6",
            "Type": "Type3",
            "Link Reference To": "Reference6",
            "List Type": "ListType6"
          },
          {
            "Name": "Object7",
            "Type": "Type1",
            "Link Reference To": "Reference7",
            "List Type": "ListType7"
          },
          {
            "Name": "Object8",
            "Type": "Type2",
            "Link Reference To": "Reference8",
            "List Type": "ListType8"
          },
          {
            "Name": "Object9",
            "Type": "Type3",
            "Link Reference To": "Reference9",
            "List Type": "ListType9"
          },
          {
            "Name": "Object10",
            "Type": "Type1",
            "Link Reference To": "Reference10",
            "List Type": "ListType10"
          }
        ],
      }
    }
  }

</script>

<style scoped>

table {
  width: 100%;
  height: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
}

th.name {
  width: 30%; /* Adjust the width of the 'Name' column */
}

th.type {
  width: 20%; /* Adjust the width of the 'Type' column */
}

th.link {
  width: 30%; /* Adjust the width of the 'Link Reference To' column */
}

th.listType {
  width: 20%; /* Adjust the width of the 'List Type' column */
}
/*tr:nth-child(even) {
/*  background-color: #f9f9f9;
/*}
*/

.base-format{
  margin-left: 10px;
  margin-top: -10px;
  box-sizing: border-box;
}

.trueHeight{
  height: 100%;
  overflow-y: auto;
}

th { /* header cell */
  position: sticky;
  top: 0;
  background-color: #F9F8F8;
}

table {
  height: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color:  white;
}

th {
  position: sticky;
  top: 0;
  border-bottom: 2px solid black;
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




  thead {
    height: 50px;
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
    width: 45%; /* Adjust the width of the 'List Type' column */
  }

  tr{
    height: 20px;
  }

  tr:hover {
    background-color: lightblue; /* Highlight background on hover */
    border: 2px solid #000; /* Increase border size on hover */
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

