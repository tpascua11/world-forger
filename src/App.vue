<template>
  <!-- Don't Need The Nav Bar Yet -->
  <!--
  <nav class="nav-bar-grid-layout">
    <div>
      <router-link to="/about">World </router-link> |
      <router-link to="/"> World </router-link>
    </div>
  </nav>
  -->
  <router-view/>
</template>

<script>
  export default {
    name: 'App',
    created() {
      // Define $root variable
      this.$root.exampleVariable = 'Hello, I am $root variable!';
      this.$root.exampleMethod = () => {
        console.log('This is a method of $root');
      };
      //Entity Template Stores Changes to Entity Attributes
      //For the Real Word Entity Attributes, Resets after it pass through
      this.$root.entityTemplate = {};
      this.$root.entityItem = {}; // ['entityName'].list[key]
      this.$root.entityItemIsEdited = {}; // ['entityName'].list[key]

      this.$root.world = {
				'Entity': {
					'Template Fire': {
            templateInfo: {
              'name': {
                type: 'string',
                important: true
              },
              'power': {
                type: 'number',
              },
              'love':{
                type: 'number',
              }
            },
            templateOrder: [],
            rules: {},
            list: {
              0: {name: 'Flamer', power: 10, coolnessFactorAndPowerUps: 10000,
                tower: '10', health: 0, mana: 0, stamina: 0, love: 9},
              1: {name: 'Fire', power: 20  , },
            },
            description: '',
          },
					'Template Ice': {
            templateInfo: {
              'name': {
                type: 'string',
                important: true
              },
              'attribute 1': {
                type: 'number',
                referenceTo: 'test1',
                listType: 'test2',
              }
            },
            templateOrder: [],
            rules: {},
            list: {},
            description: '',
          },

				},
			};
    }
};

</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style lang="scss">

nav {
  padding: 0px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.nav-bar-grid-layout {
  display: grid;
  grid-template-columns: 1fr 5fr;
  align-items: left; /* Vertically center content */
}

</style>
