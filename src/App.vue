<template>
    <router-view/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ListPage from "@/views/ListPage.vue";

@Options({
  components: {
    ListPage
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #d6f3f3;
  margin-top: 0px;
}
</style>
