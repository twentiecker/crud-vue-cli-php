<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <img alt="PHP logo" src="./assets/php.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Crud />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Crud from "./components/Crud.vue";

export default {
  name: "App",
  components: {
    // HelloWorld
    Crud,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
