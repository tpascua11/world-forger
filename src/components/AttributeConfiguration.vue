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
			<div class="table-container">
        <table>
          <thead>
            <tr class="">
              <th class="order"> Order </th>
              <th class="name">Attribute </th>
              <th class="type">Type</th>
              <th class="link">Link Reference To</th>
              <th class="listType">List Type</th>
              <th class="remove"> </th>
            </tr>
          </thead>
          <tbody>
            <tr class="" v-for="(row,index) in getOrder" :key="row.id">
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
              <td></td>
              <td>
                {{row}}
              </td>
							<td>
                <div v-if="false">
                <VueMultiselect
                    v-model="template[row]['type']"
                    :options="attributeTypeList"
                    :show-labels="false"
                    @open="onOpen"
                    class="attribute-layout"
                    :appendToBody="true"
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
                </div>
              </td>
              <td>{{ template[row]['referenceTo'] }}</td>
              <td>{{ template[row]['listType'] }}</td>
              <td>
              </td>
            </tr>


          </tbody>
        </table>
      </div>
    </div>
    <div class="stack stackFixed40">
      <div class="button-container border-top-x2">
<!--
      <input class="custom-input" v-model="inputValue" type="text"
      placeholder="Add New Attribute ...">
-->
			<!-- <button class="blue-button save-button" @click="add"> Add Single </button> -->
			<button
					class="blue-button save-button"
					@click="openModal();">
				Add Atribute
			</button>
      <button class="blue-button save-button" @click="refresh"> Add Shared </button>
      <button class="blue-button save-button" @click="openReorderModal"> Reorder </button>
      </div>
		</div>

		<TypeInputModal
				:isOpen="isModalOpen"
				:items="attributeTypeList"
				@item-selected="selectedItem"
				@close="closeModal"
				@add="addAttribute"
				/>

		<ReorderAttributeModal
				:isOpen="isReorderModalOpen"
				:initialItems="getOrder"
				@close="closeReorderModal"
				@reorder="reorderAttribute"
		/>

  </div>
</template>

<script>
  import VueMultiselect from 'vue-multiselect'
	import TypeInputModal from '@/inputs/TypeInputModal'
  import ReorderAttributeModal from '@/inputs/ReorderAttributeModal'
  import {useWorldStore } from '@/store/world';

  export default {
    name: 'AttributeConfiguration',
    components:{
      VueMultiselect,
			TypeInputModal,
			ReorderAttributeModal,
    },
    props: {
      entity: String,
      entityName: String,
    },
    beforeUnmount() {
      const dropdownList = document.querySelector('.multiselect__content-wrapper');
      if (dropdownList && dropdownList.parentNode === document.body) {
        document.body.removeChild(dropdownList);
      }
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
			},
			getOrder(){
				const world = useWorldStore();
				return world.getEntityTemplateOrder(this.entityName);
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
      template(newValue){
        //TODO: directly set to entityTemplate of world!
        const world = useWorldStore();
        world.setEntityTemplate(this.entityName, newValue);
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
					const multiselect = this.$el.querySelector('.multiselect');
					const dropdown = document.querySelector('.multiselect__content-wrapper');

					if (multiselect && dropdown) {
						const rect = multiselect.getBoundingClientRect();
						const spaceBelow = window.innerHeight - rect.bottom;
						const dropdownHeight = dropdown.offsetHeight;

						if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
							// Not enough space below, but enough space above
							dropdown.style.bottom = `${window.innerHeight - rect.top}px`;
							dropdown.style.top = 'auto';
							dropdown.style.position = 'fixed';
							dropdown.style.width = `${rect.width}px`;
							dropdown.style.left = `${rect.left}px`;
						} else {
							// Enough space below or not enough space above
							dropdown.style.top = `${rect.bottom}px`;
							dropdown.style.bottom = 'auto';
							dropdown.style.position = 'fixed';
							dropdown.style.width = `${rect.width}px`;
							dropdown.style.left = `${rect.left}px`;
						}
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

				world.resetEntityHistory(this.entityName);

				localStorage.setItem('world', JSON.stringify(this.$root.world));
			},
			addAttribute(template){
				const world = useWorldStore();

				if(world.checkAttributeExistInEntity(this.entityName, template.name)){
					confirm("Attribute Already Exist!!");
					return;
				}

				let trueTemplate = {
					"type": template.type,
					"referenceTo": "",
					"listType": "",
				};
				if(!template.type) template.type = 'number';

				trueTemplate;
				world.addAttributeToEntity(this.entityName, template.name, trueTemplate);
				world.resetEntityHistory(this.entityName);
				localStorage.setItem('world', JSON.stringify(this.$root.world));
				this.getAttributeTemplate();
				/*
				world.editEntityTemplateInfo(this.entityName, trueTemplate);
*/
			},
			reorderAttribute(reorder){
				const world = useWorldStore();
				world.setEntityOrder(this.entityName, reorder);
			},
			refresh(){
				this.$forceUpdate();
			},
			openModal() {
				this.isModalOpen = true;
			},
			closeModal() {
				this.isModalOpen = false;
			},
			openReorderModal(){
				this.isReorderModalOpen = true;
			},
			closeReorderModal(){
				this.isReorderModalOpen = false;
			},
			handleItemSelected(item) {
				this.selectedItem = item;
				this.closeModal();
			},
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
				isModalOpen: false,
				isReorderModalOpen: false,
				selectedItem: null,
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

	.table-container {
		width: 97%;
		overflow-y: auto;
		border: 1px solid #ccc;

		margin-left: 10px;
	}
	table {
		width: 100%;
		border-collapse: collapse;
	}
	th, td {
		padding: 8px 12px;
		text-align: left;
		border-bottom: 1px solid #ccc;
	}
	th {
		background-color: #f2f2f2;
		position: sticky;
		top: 0;
		z-index: 1;
	}

	</style>

