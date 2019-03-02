<template>
  <div id="app">
    <MainPage />
  </div>
</template>

<script>
import MainPage from './components/main.vue';

export default {
  name: 'app',
  components: {
    MainPage,
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
html, body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 18px;
  height: 100%;
}
</style>
