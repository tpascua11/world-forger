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
