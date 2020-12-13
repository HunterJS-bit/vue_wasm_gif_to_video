<template>
  <div id="app">
    <VideoMaker />
  </div>
</template>

<script>
import VideoMaker from './components/VideoMaker.vue'

export default {
  name: 'App',
  components: {
    VideoMaker
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
body {
  background-color: #e5ebfb;
}
</style>
