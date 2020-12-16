<template>
  <div class="gif-converter">
    <div class="upload-form">
      <form @submit.prevent="uploadFile">
        <h2>Upload your Gif</h2>
        <div class="upload-box">
          <div class="upload-icon">
            <svg version="1.1" id="upload-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 486.3 486.3" style="enable-background:new 0 0 486.3 486.3;" xml:space="preserve">
          <g>
            <path d="M395.5,135.8c-5.2-30.9-20.5-59.1-43.9-80.5c-26-23.8-59.8-36.9-95-36.9c-27.2,0-53.7,7.8-76.4,22.5
        c-18.9,12.2-34.6,28.7-45.7,48.1c-4.8-0.9-9.8-1.4-14.8-1.4c-42.5,0-77.1,34.6-77.1,77.1c0,5.5,0.6,10.8,1.6,16
        C16.7,200.7,0,232.9,0,267.2c0,27.7,10.3,54.6,29.1,75.9c19.3,21.8,44.8,34.7,72,36.2c0.3,0,0.5,0,0.8,0h86
        c7.5,0,13.5-6,13.5-13.5s-6-13.5-13.5-13.5h-85.6C61.4,349.8,27,310.9,27,267.1c0-28.3,15.2-54.7,39.7-69
        c5.7-3.3,8.1-10.2,5.9-16.4c-2-5.4-3-11.1-3-17.2c0-27.6,22.5-50.1,50.1-50.1c5.9,0,11.7,1,17.1,3c6.6,2.4,13.9-0.6,16.9-6.9
        c18.7-39.7,59.1-65.3,103-65.3c59,0,107.7,44.2,113.3,102.8c0.6,6.1,5.2,11,11.2,12c44.5,7.6,78.1,48.7,78.1,95.6
        c0,49.7-39.1,92.9-87.3,96.6h-73.7c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5h74.2c0.3,0,0.6,0,1,0c30.5-2.2,59-16.2,80.2-39.6
        c21.1-23.2,32.6-53,32.6-84C486.2,199.5,447.9,149.6,395.5,135.8z"></path>
            <path d="M324.2,280c5.3-5.3,5.3-13.8,0-19.1l-71.5-71.5c-2.5-2.5-6-4-9.5-4s-7,1.4-9.5,4l-71.5,71.5c-5.3,5.3-5.3,13.8,0,19.1
        c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l48.5-48.5v222.9c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5V231.5l48.5,48.5
        C310.4,285.3,318.9,285.3,324.2,280z"></path>
          </g>
        </svg>
          </div>
          <input type="file" id="myFile" @change="uploadFile" name="filename">
        </div>
        <div class="image-preview">
          <img id="gifImage" v-if="gifImage" :src="gifImage" alt="your image" />
        </div>
      </form>
      <div class="action-bar">
        <button class='convert-btn' :disabled="!gifImage" @click="convertToVideo">Convert to Video</button>
      </div>
    </div>
    <div class="preview-form">
      <h1> Result </h1>
      <video v-if="video" id="output-video" controls :src="video"></video>
    </div>
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

body {
  background: linear-gradient(to bottom, #EDF1F2, #D5E2F2);
}
.gif-converter {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  padding: 20px;
  background: white;
  width: 90%;
  max-width: 600px;
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
}
</style>
