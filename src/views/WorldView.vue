<template>
	<div class="main-container-start-col">
		<div class="tab-collection">
			<div @click="changeMainViewMode('ENTITY')" 					 class="tab border-x1"  :class="{ 'is-selected': showMainView === 'ENTITY'}" > Entity           </div>
			<div @click="changeMainViewMode('WORLD')" 					 class="tab border-x1" 	:class="{ 'is-selected': showMainView === 'WORLD'}"> World            </div>
			<div @click="changeMainViewMode('SHARED_ATTRIBUTE')" class="tab border-x1"  :class="{ 'is-selected': showMainView === 'SHARED_ATTRIBUTE'}"> Shared Attribute </div>
		</div>

		<!-- ENTITY VIEW -->
		<div v-if="showMainView === 'ENTITY'" class="bottom-row">
			<div class="c20 border-L-x1">
				<div class="stack-setup">
					<div class="box">
						<div class="box-7-8 border-x2">
							<VueMultiselect
								v-model="selectedEntityName"
								:options="entityNames"
								:taggable="true"
								@tag="addNewProperty"
								tag-placeholder="Add this as new tag"
								placeholder="Select or Add Property..."
								ref="multiselect"
								@input="selectEntityInputCSS"
								:show-labels="false"
								>

								<template v-slot:singleLabel="{ option }">
									<div class="title4">
									{{ option }}
									</div>
								</template>
								<template v-slot:option="{ option }">
									<div v-if="typeof option !== 'object'">
										<div class="title4">
											{{option}}
										</div>
									</div>
									<div v-else>
										<div class="title4">
											{{option.label}}
										</div>
									</div>
								</template>

							</VueMultiselect>
						</div>
						<div class="box-1-8 border-x1 entity-box">
							<div class="entity-icon" @click="changeViewMode('ATTRIBUTE_CONFIGURATION');">
								<i class="ra ra-repair ra-2x"></i>
							</div>
						</div>
					</div>
					<div class="stack stack3 stack-overflow">
						<div class="better-lined-paper">
								<div v-for="(index, key) in entityList"
											:key="key" class="better-name-box border-x1"
											@click="selectEntityItem(key)"
											:class="
											{
												'is-changed' : (itemIsBeingEdited && entityChangeList[selectedEntityName][key]),
												'is-selected': selectedEntityItemKey  === key,
												}">
										<span class="better-index">{{ key  }}. {{entityChangeList[key]}}</span>
										<span class="better-name">{{ computedSelectedEntity.list[index].name}}</span>
								</div>
						</div>
					<!--
						<div class="lined-paper">
								<div v-for="(index, key) in entityList" :key="key" class="name-box">
										<span class="index">{{ key  }}. </span>
										<span class="name">{{ computedSelectedEntity.list[index].name}}</span>
								</div>
						</div>
						-->
					</div>
					<div class="name-box">
						<button class="green-button fit-width" @click="addToEntityList"> Add {{selectedEntityName}}</button>
					</div>
				</div>
			</div>

			<div v-if="(showView === 'ATTRIBUTE_CONFIGURATION') && selectedEntityExist" class="c80 smile-x1">
				<AttributeConfiguration
					:entityName="selectedEntityName"
					@updateAttribute="refreshEntityAttributeList"
					@deleteAttribute="deleteAttributeFromEntityList"
					/>
			</div>
			<div v-else-if="showView === 'ENTITY_ITEM'" class="c80 smile-x1">
				<EntityItem :entityItemKey=selectedEntityItemKey
										:entityName="selectedEntityName"
										@update-parent="refresh"
										@update-entity-item-list="checkEntityItemEdited"
										/>
			</div>
			<div v-else class="c80 border-x2">

			</div>
		</div>

		<!-- WORLD VIEW -->
		<div v-if="showMainView === 'WORLD'" class="bottom-row smile-x1">
			<WorldConfiguration @resetWorld="resetWorld"/>
		</div>

		<Attribute :visible="AttributeModalVisible" @close="closeAttributeModal"/>
	</div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
import Attribute from '@/bigComponents/Attribute.vue'
import AttributeConfiguration from '@/components/AttributeConfiguration.vue'
import WorldConfiguration from '@/components/WorldConfiguration.vue'
import EntityItem from '@/components/EntityItem.vue'

export default {
	name: 'WorldView',
	components: {
		VueMultiselect,
		Attribute,
		AttributeConfiguration,
		WorldConfiguration,
		EntityItem,
	},
	watch: {
		selectedEntityName(newValue){
			console.log("SELECTED NEW VALUE", newValue);
			if(this.world['Entity'][newValue]){
				console.log("SELECTED ENTITY", this.world['Entity'][newValue]);
				this.selectedEntity = this.world['Entity'][newValue];
				this.selectedEntityList = this.world['Entity'][newValue].list;
				this.showView = '';
				this.selectedEntityItemKey = '';
				this.$root.world = this.world;
			}
			if(!this.$root.entityItemIsEdited[this.selectedEntityName]){
				this.$root.entityItemIsEdited[this.selectedEntityname] = {};
			}
		}
	},
	data: function() {
		return {
			world: {
				'Entity': {
					'Template1': {test: 123},
					'Template2': {},
				},
			},
			listOfNames:  [
				'Apple', 'Banna', 'Carrots', 'Meats', 'Flowers', 'Power', 'Tacos 3000',
				'Apple', 'Banna', 'Carrots', 'Meats', 'Flowers', 'Power', 'Tacos 3000',
				'Apple', 'Banna', 'Carrots', 'Meats', 'Flowers', 'Power', 'Tacos 3000',
				'Apple', 'Banna', 'Carrots', 'Meats', 'Flowers', 'Power', 'Tacos 3000',
			],
			newPropertyName: '',
			propertyNames: {} ,
			list: ['apple', 'orage', 'gatorade'],
			selectedEntity: {},
			selectedEntityList: {},
			selectedEntityName: '',

			selectedEntityItem: {},
			selectedEntityItemKey: '',
			test: '',
			AttributeModalVisible: false,
			showMainView: 'ENTITY',
			showView: '',
			entityChangeList: {},
			//showView: 'ATTRIBUTE_CONFIGURATION',
		}
	},
	mounted(){
			this.world = this.$root.world;
	},
	methods: {
		resetWorld(){
			if(!confirm("Reset the World!?")) return;
			console.log("WORLD RESET!");

			this.$root.world =
			{
				'Entity': {}
			};
			this.world = this.$root.world;

			this.$forceUpdate();
		},
		addNewProperty(name){
			console.log("what is the name: ", name);
			if (this.world['Entity'][name] !== undefined) {
				console.log("Entity Exist");
				return false;
			}

			//this.world['Entity'][name]= '';
			this.world['Entity'][name]= {
				templateInfo: {
					'name': {
						type: 'string',
						important: true,
					}
				},
				templateOrder: {},
				rules: {},
				list: {},
				description: ''
			}

			console.log("WORLD", this.world);
			this.selectedEntityName = name;

			this.$root.world = this.world;
		},
		addPropertyName() {
		//TODO: WHY DID I DO THIS!?
			if (this.world['Entity'][this.newPropertyName] !== undefined) {
				console.log("Entity Exist");
				return false;
			}

			this.world['Entity'][this.newPropertyName] = '';

			console.log("WORLD", JSON.stringify(this.world));
		},
		addToEntityList(){
			let nextKey = Object.keys(this.world['Entity'][this.selectedEntityName].list).length;
			console.log("next key", nextKey);
			this.selectedEntityList[nextKey] = this.setDefaultEntityValues();

			this.$root.world = this.world;
		},
		setDefaultEntityValues(){
			let templateInfo = this.world['Entity'][this.selectedEntityName].templateInfo;
			let newObject = {};
			console.log(" what is template info", JSON.stringify(templateInfo));
			for (let key in templateInfo) {
					if(templateInfo[key].type === 'number'){
						newObject[key] = 0;
					}
					else{
						newObject[key]= '';
					}
			}
			console.log("NEW OBJECT!", newObject);
			return newObject;
		},
		updateEntityAttribute(entityName, attribute){
			console.log("TEST UPDATES");
			console.log("Entity", JSON.stringify(entityName));
			console.log("Attribute", JSON.stringify(attribute));

			console.log("THIS WORLD", JSON.stringify(this.world['Entity'][entityName]));
			for (let key in attribute) {
				this.world['Entity'][entityName][key] = attribute[key];
			}

			this.$root.world = this.world;
			this.selectedEntity = this.world['Entity'][entityName];
			//Vue.set(this, 'selectedEntity', this.$root.world['Entity'][entityName]);
			//this.$set(this, 'selectedEntity', this.$root.world['Entity'][entityName]);
		},
		deleteAttributeFromEntityList(attributeName){
			console.log("name of attribute to remove", attributeName);
			for (let key in this.entityList){
				delete this.world['Entity'][this.selectedEntityName].list[key][attributeName];
			}
			this.refreshEntityAttributeList();
		},
		refreshEntityAttributeList(){
			console.log("REFESH ATTRIBUE LIST");
			for (let key1 in this.entityList){
				let item = this.world['Entity'][this.selectedEntityName].list[key1];
				let templateInfo = this.world['Entity'][this.selectedEntityName].templateInfo;
				let newItem = {};
				key1; item; newItem;


				for(let prop in templateInfo){

					//Default the numbers if not exist
					if (item[prop] === undefined) {
						if(templateInfo[prop].type === 'number'){
							newItem[prop] = 0;
						}
						else {
							newItem[prop] = '';
						}
					}
					else {
						newItem[prop] = item[prop];
					}

					this.world['Entity'][this.selectedEntityName].list[key1] = newItem;
				}

			}
			this.$root.world = this.world;
		},
		selectEntityItem(key){
			console.log("KEY", key);
			this.selectedEntityItemKey = key;
			this.showView = 'ENTITY_ITEM';
		},
		emptyEntityItem(){
			this.showView = '';
		},
		openArributeModal(){
			this.AttributeModalVisible = true;
		},
		closeAttributeModal(){
			this.AttributeModalVisible = false;
		},
		selectEntityInputCSS() {
			const inputElement = this.$refs.multiselect.$el.querySelector('input');
			//inputElement.style.fontSize = '36px'; // Change the font size as needed
			inputElement.classList.add('title4');
		},
		changeViewMode(view){
			console.log("WHAT IS VIEW", view);
			this.showView = view;
			this.$forceUpdate();
		},
		changeMainViewMode(view){
			console.log(view);
			this.showMainView = view;
		},
		checkEntityItemEdited(EntityName, ItemName, condition){
			let ent = this.entityChangeList = this.$root.entityItemIsEdited;
			if(!ent[EntityName]) ent[EntityName] = {};
			ent[EntityName][ItemName] = condition;

			console.log("NEW LIST", ent);
			this.$forceUpdate();
		},

    saveJSON(fileName) {
			const jsonDataString = JSON.stringify(this.$root.world);
      const blob = new Blob([jsonDataString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
		},

		refresh(){
			console.log("REFRESH!");
			this.$forceUpdate();
		},
	},
	computed:{
		entityNames() {
			//return Object.keys(this.world['Entity']);
			return Object.keys(this.world['Entity']);
		},
		entityList() {
		/*
			if (this.$root.world?.['Entity']?.[this.selectedEntityName]?.list) {
				return Object.keys(this.$root.world['Entity'][this.selectedEntityName].list);
			}
			*/
			if (this.$root.world?.['Entity']?.[this.selectedEntityName]?.list) {
				return Object.keys(this.selectedEntityList);
			}
			else return [];
		},
		computedSelectedEntity(){
				return this.world['Entity'][this.selectedEntityName];
		},
		selectedEntityExist() {
			return Object.prototype.hasOwnProperty.call(this.world['Entity'], this.selectedEntityName);
		},
		itemIsBeingEdited(){
			if(this.entityChangeList){
				if(this.entityChangeList[this.selectedEntityName]){
					return true;
				}
				else return false;
			}
			else return false;
		},
		showWorldJSON(){
		//return this.$root.world;
		return JSON.stringify(this.$root.world, null, 2);
			/*
			try {
				// Parse the JSON string and stringify it with indentation for formatting
				return JSON.stringify(JSON.parse(this.$root.world), null, 2);
			} catch (error) {
				// Handle parsing errors
				console.error('Invalid JSON string:', error);
				return 'Invalid JSON';
			}
			*/
		}
	},
}
</script>


<style scoped>
.nav-bar-grid-layout {
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: left; /* Vertically center content */
}

.fixed-width-and-scroll {
	width: 100%;
	overflow-x: auto; /* Enable horizontal scrolling */
	scrollbar-width: none;
	white-space: nowrap;
}
.fixed-width-and-scroll::-webkit-scrollbar {
	display: none;
}

.container2 {
	max-width: 600px;
	margin: 0 auto;
}

.title {
	font-size: 24px;
	margin-bottom: 20px;
}

.input-container {
	display: flex;
	margin-bottom: 20px;
}

.input {
	flex: 1;
	padding: 10px;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 5px 0 0 5px;
}


.subtitle {
	font-size: 20px;
	margin-bottom: 10px;
}

.property-list {
	list-style: none;
	padding: 0;
}

.property-item {
	margin-bottom: 5px;
}

.property-name {
	font-weight: bold;
}

.property-value {
	color: #555;
}

.scroll-content {
	display: inline-block;
}

.entity-set{
}

.entity-button {
	background-color: green;
	border: none;
	color: white;
	padding: 2px 16px;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	margin: 4px 2px;
	cursor: pointer;
	border-radius: 8px;
}


.name-box {
	border-bottom: 1px solid #000;
	margin-bottom: 10px;
	padding: 1px;
	display: flex;
	align-items: center;
	font-weight: bold;
}

.name-box:hover {
	background-color: lightblue;
}

.index {
	font-weight: bold;
	text-align: right;
	flex: 1;

	/* font-family: "Times New Roman", Times, serif; */
	font-family: Arial, Helvetica, sans-serif;
	font-size: 10px;
}

.name {
	margin-left: 10px;
	flex: 11;
}

.lined-paper {
	background-color: #fff;
	padding: 5px;
	border: 1px solid #000;
	height: 100%; /* Fixed height */
	overflow-y: auto; /* Enable vertical scrollbar */
	overflow: hidden;
}

.lined-paper::-webkit-scrollbar {
	width: 0; /* Remove scrollbar width */
	height: 0; /* Remove scrollbar height */
}

.lined-paper-index{
}

.user-input {
	border-top: 1px solid #000; /* Add border on top to separate from existing content */
	padding: 10px;
	display: flex;
	align-items: center;
}


.entity-box {
}

.entity-box:hover {
	display: block;
	cursor: pointer;
	background-color: pink;
}


.entity-icon {
	margin-top: 5px;
}

.tab-collection{
	display: flex;
	justify-content: space-between;
	height: 23px;
	background-color: #d4ebf2;
}

.tab{
	flex: 1;
	font-size: 22px;
	text-align: center;

	box-sizing: content-box;
	height: 100%;

}

.tab:hover {
	display: block;
	cursor: pointer;

	font-weight: bold;
	background-color: #c0ccec;

}

p{
	height: 100%;
}

.better-lined-paper{
	height: 100%;
}

.better-name-box{
	height: 25px;
	display: flex;
}
.better-name-box:hover{
	background-color: #d4ebf2;
	cursor: pointer;
}


.better-index {
	font-weight: bold;
	text-align: center;
	flex: 2;

	/* font-family: "Times New Roman", Times, serif; */
	font-size: 12px;

	margin-left: 1px;
	margin-top: 10px;

}

.better-name {
	font-weight: bold;
	margin-left: 15px;
	margin-top: 7px;
	flex: 15;

}

</style>

