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
