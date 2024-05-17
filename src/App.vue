<template>
  <water-mark>
    <router-link to="/Dd">Go to Dd</router-link>
    <router-link to="/show">Go to Show</router-link>
    <router-view/>
  </water-mark>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import WaterMark from "@/components/WaterMark.vue"
import DdPage from './views/DdPage.vue';

@Options({
  components: {
    WaterMark, DdPage
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
