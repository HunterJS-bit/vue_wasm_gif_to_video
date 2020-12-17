<template>
  <div class="gif-converter">
    <div class="upload-form">
      <h2>Upload your Gif</h2>
      <form @submit.prevent="uploadFile">
        <div class="upload-box" :style="{ backgroundImage: 'url(' + gifImage + ')' }">
          <div class="upload-icon" v-if="!gifImage">
           <upload-icon></upload-icon>
          </div>
          <input type="file" id="myFile" @change="uploadFile" name="filename">
        </div>
      </form>
      <div class="action-bar">
        <button class='convert-btn' :disabled="!gifImage" @click="convertToVideo">Convert to Video</button>
      </div>
    </div>
    <div class="preview-form">
      <h2> Result </h2>
      <div class="video-wrapper">
        <div class="loader" v-if="loading">
          <loader-icon></loader-icon>
        </div>
        <video v-if="video" id="output-video" controls :src="video"></video>
      </div>
    </div>
  </div>
</template>

<script>
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import UploadIcon from '../assets/icons/upload.svg';
import LoaderIcon from '../assets/icons/loader.svg';

const ffmpeg = createFFmpeg({ log: true });

export default {
  name: 'VideoMaker',
  components: {
    UploadIcon,
    LoaderIcon,
  },
  async created() {
      await ffmpeg.load();
  },
  data() {
    return {
      gifImage: null,
      video: null,
      loading: false,
    }
  },
  methods: {
    uploadFile(e) {
      const file = e.target.files[0];
      this.gifImage = URL.createObjectURL(file);
    },
    async  convertToVideo() {
      ffmpeg.FS('writeFile', 'randGif.gif', await fetchFile(this.gifImage));
      this.loading = true;

      await ffmpeg.run('-f', 'gif', '-i', 'randGif.gif',  'output.mp4');

      const data = ffmpeg.FS('readFile', 'output.mp4');
      this.video = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
      this.loading = false;
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

body {
  background: linear-gradient(to bottom, #EDF1F2, #D5E2F2);
}
.gif-converter {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  padding: 20px 50px;
  background: white;
  box-shadow: 0 15px 20px -15px rgba(0, 0, 0, 0.3), 0 55px 50px -35px rgba(0, 0, 0, 0.3), 0 85px 60px -25px rgba(0, 0, 0, 0.1);
}
.action-bar {
  margin-top: 20px;
}

.convert-btn{
  cursor: pointer;
  outline: 0;
  text-align: center;
  background: #434bdf;
  position: relative;
  font-size: 14px;
  font-size: .875rem;
  border: 1px solid #434bdf;
  font-weight: 600;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  border-radius: 3px;
  line-height: 1;
  padding: 12px 30px;
  color: #fff;
  transition: all 0.3s;
}

.convert-btn:hover {
  background-color: #fff;
  color:  #434bdf;
}

#myFile {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.preview-form {
  width: 380px;
  padding: 10px 30px;
  height: 300px;
}
</style>
