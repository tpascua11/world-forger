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
					'Items': {
            templateInfo: {
              'name': {
                type: 'string',
                important: true
              },
              'cost': {
                type: 'number',
              },
              'description': {
                type: 'string',
              },
            },
            templateOrder: [],
            rules: {},
            list: {
              0: {name: 'Milk',    cost: 5 , description: 'Fresh 2 weeks'},
              1: {name: 'Juice',   cost: 5 , description: 'cold'},
              2: {name: 'Corn',    cost: 2 , description: 'on sale'},
              3: {name: 'Apple',   cost: 1 , description: 'on sale'},
              4: {name: 'Orange',  cost: 1 , description: 'on sale'},
              5: {name: 'Steak',   cost: 10, description: 'fresh cut'},
              6: {name: 'Pork',    cost: 12, description: 'fresh cut'},
            },
            description: '',
          },
					'Store': {
            templateInfo: {
              'name': {
                type: 'string',
                important: true
              },
              'x-cord': {
                type: 'number',
              },
              'y-cord': {
                type: 'number',
              },
              'description': {
                type: 'string'
              },
            },
            templateOrder: [],
            rules: {},
            list: {
              0: {name: 'Average Store', 'x-cord': 10, 'y-cord': 10, description: 'basic store stuff'}
            },
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
