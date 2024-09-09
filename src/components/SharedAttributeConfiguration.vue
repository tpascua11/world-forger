<template>
  <div class="c20 border-L-x1">
    <div class="stack-setup">
      <div class="box">
        <div class="title-container">
          Shared Attribute
        </div>
      </div>

      <div class="stack stack3 stack-overflow">
        <div class="better-lined-paper">

          <div v-for="(attribute, key) in listOfAttribute"
               :key="key" class="better-name-box border-x1"
                          @click="selectSharedAttribute(attribute, key)"
                          >
                          <span class="better-index">{{ key  }}. </span>
                          <span class="better-name"> {{attribute.name}}</span>
          </div>
        </div>
      </div>
      <div class="name-box">
        <button @click="addSharedAttribute" class="green-button fit-width"> Add Attribute </button>
      </div>
    </div>
  </div>
  <div class="c80">
    <div class="stack-setup">
      <div class="stack stackFixedTable1">
      <div class="title-container">
        <input
            class="entity-item-name"
            placeholder="name..."
            v-model="selectedSharedAttribute.name"
            type="text"
            />

        <button class="grey-button save-button"
                >
                Save
        </button>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr class="">
              <th class="order"> Order </th>
              <th class="name">Attribute </th>
              <th class="type">Type</th>
              <th class="remove"> </th>
            </tr>
          </thead>
          <tbody>
						<tr v-for="(attributeName, index) in selectedSharedAttribute.order" :key="attributeName">
							<td>{{ index + 1 }}</td>
							<td>{{ attributeName }}</td>
							<td>{{ selectedSharedAttribute.attribute[attributeName].type }}</td>
							<td>
								<button class="red-button save-button fit-button-small"
												@click="removeAttribute(attributeName)">
									remove
								</button>
							</td>
						</tr>
<!--
            <tr class="" v-for="(attribute ,key, index) in
                       selectedSharedAttribute.attribute"
                         :key="index">
              <td> {{index}} </td>
              <td> {{key}} </td>
              <td >{{ attribute['type']}} </td>

              <td>
                <button class="red-button save-button fit-button-small" 
                        @click="removeAttribute(key)"> remove </button>
              </td>
              </tr>
              -->


          </tbody>
        </table>
      </div>
      </div>
      <div class="stack stackFixed40">
        <div class="button-container border-top-x2">
          <button
              class="blue-button save-button"
              @click="openModal();">
            Add Atribute
          </button>
          <button class="blue-button save-button" @click="openReorderModal"> Reorder </button>
        </div>
      </div>
    </div>
    <TypeInputModal
        :isOpen="isModalOpen"
        :items="attributeTypeList"
        @item-selected="selectedSharedAttribute"
        @close="closeModal"
        @add="addAttribute"
        />

		<ReorderAttributeModal
				:isOpen="isReorderModalOpen"
				:initialItems="selectedSharedAttribute.order"
				@close="closeReorderModal"
				@reorder="reorderAttribute"
		/>


  </div>
</template>

<script>
  import {useWorldStore } from '@/store/world';
  import TypeInputModal from '@/inputs/TypeInputModal'
  import ReorderAttributeModal from '@/inputs/ReorderAttributeModal'

export default {
  name: 'SharedAttributeConfiguration',
  components:{
    TypeInputModal,
    ReorderAttributeModal,
    //VueMultiselect,
  },
  props: {
  },
  computed:{
    listOfAttribute(){
      const store = useWorldStore();
      return store.getSharedEntity();
    },
  },
  mounted() {
    const world = useWorldStore();
    console.log("CHHECK SHARED ATTRIBUTE", world.getSharedEntity());
  },
  watch: {
  },
  methods: {
    getAttributeTemplate(){

    },
    selectSharedAttribute(sharedAttribute, key){
      this.selectedSharedAttribute = sharedAttribute;
      this.selectedSharedAttributeKey = key;
      console.log("Check Selected", this.selectedSharedAttribute);
    },
    addSharedAttribute(){
      const world = useWorldStore();
      world.addSharedAttribute();
    },
    removeAttribute(attributeKey){
      const index = this.selectedSharedAttribute.order.indexOf(attributeKey);
      if (index > -1) {
        this.selectedSharedAttribute.order.splice(index, 1);
      }

      const world = useWorldStore();
      world.deleteSharedAttributeProperty(this.selectedSharedAttributeKey, attributeKey);
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
    addAttribute(template){
      template;
      console.log("Checkout", this.selectedSharedAttribute);
      console.log("new template", template);
      let trueTemplate = {
        "type": template.type,
      };
      if(!this.selectedSharedAttribute.attribute[template.name]){
        this.selectedSharedAttribute.attribute[template.name] = trueTemplate;
        this.selectedSharedAttribute.order.push(template.name);
      }
      else{
        window.alert("already added");
      }
    },
    reorderAttribute(reorder){
      //const world = useWorldStore();
      this.selectedSharedAttribute.order = reorder;
    },



    resetWorld(){}
  },
  data: function(){
    return {
      trueMaxHeight: 500,
      testList: [1,2,3,4,5],
      selectedSharedAttribute: {order: []},
      selectedSharedAttributeKey: -1,
      isModalOpen: false,
      isReorderModalOpen: false,
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

.title-container {
  padding: 10px; /* Apply padding of 20 pixels inside the container */
  width: 100%;
  display: flex;

  box-sizing: border-box;
  gap: 10%;

}

.better-lined-paper{
  height: 100%;
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

.trueHeight{
  height: 100%;
  overflow-y: auto;
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

.button-container {
  display: flex;
  justify-content: left; /* Horizontally center the buttons */
  align-items: center; /* Vertically center the buttons */

  padding: 5px; /* Apply padding of 20 pixels inside the container */
  gap: 1%;
}


.better-name-box{
  height: 25px;
  display: flex;
}

.better-name-box:hover{
  background-color: #d4ebf2;
  cursor: pointer;
}

.name-box {
  margin-bottom: 10px;
  padding: 1px;
  display: flex;
  align-items: center;
  font-weight: bold;
}

.save-button{
  flex: 40%;
  height: 33px;
}

.edit-container{
  padding: 10px; /* Apply padding of 20 pixels inside the container */
  align-items: flex-start;
}





</style>

