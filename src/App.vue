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
  text-align: center;
  color: #2c3e50;
  margin-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}
body {
  background-color: #e5ebfb;
}
</style>
