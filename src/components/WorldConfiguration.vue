<template>
  <div class="c100">
    <div class="stack8 height90 border-down-x2">
      <pre class="">{{showWorldJSON}} </pre>
    </div>
    <div class="stack-dynamic simple-center">
      <button @click="saveJSON('world')" class="green-button"> Save World </button>

      <button class="yellow-button" @click="loadJSONFromFile">Load JSON</button>
      <button class="white-button" @dragover.prevent @drop="loadJSONFromFile">Drop JSON File Here</button>


      <button @click="resetWorld()" class="red-button"> Reset World </button>
    </div>
  </div>
</template>

<script>
    import {useWorldStore } from '@/store/world';

  export default {
    name: 'AttributeConfiguration',
    components:{
    },
    props: {
    },
    computed:{
      showWorldJSON(){
        //return JSON.stringify(this.$root.world, null, 2);
        const world = useWorldStore();
        return world.getWorld;
      }
    },
    mounted() {
    },
    watch: {
    },
    methods: {
      getAttributeTemplate(){
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
      openFileMenu() {
        this.$refs.fileInput.click();
      },
      loadJSON(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const jsonData = JSON.parse(e.target.result);
            // Do something with the loaded JSON data
            console.log(jsonData);
            this.$root.world = jsonData;
          } catch (error) {
            console.error('Error parsing JSON file:', error);
          }
        };
        reader.readAsText(file);
      },
      loadJSONFromFile() {
        // Trigger the input file dialog
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = this.loadJSON;
        input.click();
      },
      resetWorld(){

        /*
        if(!confirm("Reset the World!?")) return;
        this.$root.world = {
          'Entity': {}
        }
         */
        this.$emit('resetWorld', 'Reset World');
      }

    },
    data: function(){
      return {
        trueMaxHeight: 500,
       }
    }
  }

</script>

<style scoped>


</style>

