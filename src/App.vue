<template>
  <div id="app">
    <h1>Gif to Video Converter</h1>
    <VideoMaker />
  </div>
</template>

<script>
import VideoMaker from "./components/VideoMaker.vue";

export default {
  name: "App",
  components: {
    VideoMaker
  }
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
