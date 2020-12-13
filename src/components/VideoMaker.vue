<template>
  <div class="gif-converter">
    <form @submit.prevent="uploadFile">
      <p>Upload your Gif</p>
      <input type="file" id="myFile" @change="uploadFile" name="filename">
      <div class="image-preview">
        <img id="gifImage" v-if="gifImage" :src="gifImage" alt="your image" />
      </div>
    </form>
    <div class="action-bar">
      <h2>Convert to Video </h2>

      <button :disabled="!gifImage" @click="convertToVideo">Convert to Gif to Video</button>
    </div>
    <video v-if="video" id="output-video" controls :src="video"></video>
  </div>
</template>

<script>
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

export default {
  name: 'VideoMaker',
  async created() {
      await ffmpeg.load();
  },
  data() {
    return {
      gifImage: null,
      video: null,
    }
  },
  methods: {
    uploadFile(e) {
      const file = e.target.files[0];
      this.gifImage = URL.createObjectURL(file);
    },
    async  convertToVideo() {
      console.log('convert image to gif');
      ffmpeg.FS('writeFile', 'randGif.gif', await fetchFile(this.gifImage));

      await ffmpeg.run('-f', 'gif', '-i', 'randGif.gif',  'output.mp4');

      const data = ffmpeg.FS('readFile', 'output.mp4');
      this.video = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    },
    downloadVideo() {
        console.log('download video');
        URL.revokeObjectURL(this.video);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gif-converter {
  padding: 5em 7em;
  background-color: #fff;
  border-radius: 20px;
}
.action-bar {
  margin-top: 50px;
}
</style>
