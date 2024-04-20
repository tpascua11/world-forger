<template>
	<div class="main-container-start-col">
		<div class="tab-collection border-x2">
			<div class="tab border-x1" :class="{ 'is-selected': showMainView === 'ENTITY'}" > Entity           </div>
			<div class="tab border-x1" :class="{ 'is-selected': showMainView === 'WORLD'}"> World            </div>
			<div class="tab border-x1" :class="{ 'is-selected': showMainView === 'SHARED_ATTRIBUTE'}"> Shared Attribute </div>
		</div>
		<div class="bottom-row">
		<div class="c20 border-x2">
			<div class="stack-setup">
				<div class="box">
					<div class="box-7-8 border-x2">
						<VueMultiselect
							v-model="selectedEntity"
							:options="entityNames"
							:option-height="200"
							:taggable="true"
							@tag="addNewProperty"
							tag-placeholder="Add this as new tag"
							placeholder="Select or Add Property..."
							ref="multiselect"
							@input="selectEntityInputCSS"
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
					<div class="lined-paper">
							<div v-for="(name, index) in listOfNames" :key="index" class="name-box">
									<span class="index">{{ index + 1 }}. </span>
									<span class="name">{{ name }}</span>
							</div>
					</div>
				</div>
				<div class="name-box">
					<button class="green-button fit-width">Add {{selectedEntity}}</button>
				</div>
			</div>
		</div>

		<div v-if="showView === 'ATTRIBUTE_CONFIGURATION'" class="c80 border-x2">
			<AttributeConfiguration :entity="selectedEntity"/>
		</div>
		<div v-else class="c80 border-x2">

		</div>
		</div>

		<Attribute :visible="AttributeModalVisible" @close="closeAttributeModal"/>
	</div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
import Attribute from '@/bigComponents/Attribute.vue'
import AttributeConfiguration from '@/components/AttributeConfiguration.vue'

export default {
	name: 'WorldView',
	components: {
		VueMultiselect,
		Attribute,
		AttributeConfiguration,
	},
	data: function() {
		return {
			world: {
				'Entity': {
					'Template1': {test: 123},
					'Template2': {},
					'Template3': {},

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
			selectedEntity: null,
			test: '',
			AttributeModalVisible: false,
			showMainView: 'ENTITY',
			showView: '',
			//showView: 'ATTRIBUTE_CONFIGURATION',
		}
	},
	methods: {
		addNewProperty(name){
			console.log("what is the name: ", name);
			if (this.world['Entity'][name] !== undefined) {
				console.log("Entity Exist");
				return false;
			}

			this.world['Entity'][name]= '';
			console.log("WORLD", this.world);
			this.selectedEntity = name;
		},
		addPropertyName() {
			if (this.world['Entity'][this.newPropertyName] !== undefined) {
				console.log("Entity Exist");
				return false;
			}

			this.world['Entity'][this.newPropertyName]= '';
			console.log("WORLD", this.world);
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
		}
	},
	computed:{
		entityNames() {
			return Object.keys(this.world['Entity']);
		},
	}
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

</style>

