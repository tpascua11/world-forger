<template>
  <div class="stack-setup">
    <div class="stack stack7 trueHeight">
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
            <tr v-for="row in attributeTemplate" :key="row.id">
              <td>{{ row['Name'] }}</td>
              <td>
                <VueMultiselect
                    v-model="attributeTest"
                    :options="attributeTypeList"
                    placeholder="Change Data Type..."
										:show-labels="false"
                    @open="onOpen"
                    class="attribute-layout"
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
              <td>{{ row['Link Reference To']}}</td>
              <td>{{ row['List Type']}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="stack stack1 border-top-x2">
      <div class="base-format">
        <h2> Attribute Configuration </h2>
        <div class="button-container">
          <button class="blue-button fit-width"> Add </button>
          <button class="blue-button fit-width"> Group </button>
          <button class="blue-button fit-width">Save </button>
        </div>
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
    },
    methods: {
			onOpen() {
				this.$nextTick(() => {
					const dropdownList = document.querySelector('.vue-multiselect-list');
					if (dropdownList) {
						dropdownList.style.border = '1px solid #ccc'; // Add border to dropdown list
						dropdownList.style.borderRadius = '4px'; // Optional: Add border radius for rounded corners
					}
				});
      },
    },
    data: function(){
      return {
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


.blue-button {
	width: 30%;
}

.button-container {
    display: flex;
    justify-content: center; /* Horizontally center the buttons */
    align-items: center; /* Vertically center the buttons */
    gap: 10%;
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

  tr:hover {
    background-color: lightblue; /* Highlight background on hover */
    border: 2px solid #000; /* Increase border size on hover */
  }

  .lightblue{
    background-color: lightblue;
  }
</style>

