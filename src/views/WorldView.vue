<template>
	<div class="main-container">
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
					<div class="box-1-8 border-x1">
						<i class="ra ra-repair ra-2x"></i>
					</div>
				</div>
				<div class="stack stack5">
					<div class="lined-paper">
							<div v-for="(name, index) in listOfNames" :key="index" class="name-box">
									<span class="index">{{ index + 1 }}. </span>
									<span class="name">{{ name }}</span>
							</div>
					</div>
				</div>
				<div class="name-box">
					<button class="blue-button fit-width">Add {{selectedEntity}}</button>
				</div>
			</div>
		</div>

		<div class="c80 border-x2">
			<div class="stack-setup">
				<div class="">
				Stack 1
						<input type="text" placeholder="User Input">
				</div>
				<div class="stack stack2">Stack 2</div>
				<div class="stack stack3">Stack 3</div>
			</div>

			<!--
			<div @click="openArributeModal();">
				Test
			</div>
			-->
		</div>
		<Attribute :visible="AttributeModalVisible" @close="closeAttributeModal"/>
	</div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
import Attribute from '@/bigComponents/Attribute.vue'

export default {
	name: 'WorldView',
	components: {
		VueMultiselect,
		Attribute,
	},
	data: function() {
		return {
			world: {
				'Entity': {
					'Template1': {},
					'Template2': {},
					'Template3': {},

				},
			},
			listOfNames:  [
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

.button {
	padding: 10px 20px;
	font-size: 16px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 0 5px 5px 0;
	cursor: pointer;
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
}

.name {
	margin-left: 10px;
  flex: 11;
}

.lined-paper {
  background-color: #fff;
  padding: 5px;
  border: 1px solid #000;
  height: 90%; /* Fixed height */
  overflow-y: auto; /* Enable vertical scrollbar */
}

.lined-paper::-webkit-scrollbar {
  width: 0; /* Remove scrollbar width */
  height: 0; /* Remove scrollbar height */
}

.user-input {
  border-top: 1px solid #000; /* Add border on top to separate from existing content */
  padding: 10px;
  display: flex;
  align-items: center;
}

</style>

