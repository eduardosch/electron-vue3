<template>
  <Home :data="data" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Home from './views/Home.vue'

declare global {
    interface Window { electronAPI: any; }
}

export default defineComponent({
  components: {
    Home,
  },
  data() {
      return {
          data: [],
      }
  },
  mounted() {
      const api = window.electronAPI
      api.getData()
        .then((response:any) => {
            this.data = response
        })
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
