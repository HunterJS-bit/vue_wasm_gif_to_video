<template>
  <div class="gif-converter">
    <div class="upload-form">
      <h2>Upload your Gif</h2>
      <form @submit.prevent="uploadFile">
        <div class="upload-box" :style="{ backgroundImage: 'url(' + gifImage + ')' }">
          <div class="upload-icon" v-if="!gifImage">
            <upload-icon></upload-icon>
          </div>
          <input type="file" id="fileInput" @change="uploadFile" name="filename" />
        </div>
      </form>
      <div class="action-bar mt-10">
        <button class="convert-btn" :disabled="!gifImage" @click="convertToVideo">Convert to Video</button>
      </div>
    </div>
    <div class="preview-form">
      <h2>Result</h2>
      <div class="video-wrapper">
        <div class="loader" v-if="loading">
          <h2 class="loading-text">Loading ...</h2>
          <loader-icon></loader-icon>
        </div>
        <video v-if="video" id="output-video" controls :src="video"></video>
      </div>
    </div>
  </div>
</template>

<script>
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import UploadIcon from "../assets/icons/upload.svg";
import LoaderIcon from "../assets/icons/loader.svg";

const ffmpeg = createFFmpeg({ log: true });

export default {
  name: "VideoMaker",
  components: {
    UploadIcon,
    LoaderIcon
  },
  async created() {
    // load ffmpef when component is created
    await ffmpeg.load();
  },
  data() {
    return {
      gifImage: null,
      video: null,
      loading: false
    };
  },
  methods: {
    uploadFile(e) {
      const file = e.target.files[0];
      this.gifImage = URL.createObjectURL(file);
    },
    /**
     * Handles gif to video conversion
     */
    async convertToVideo() {
      this.video = null;
      ffmpeg.FS("writeFile", "randGif.gif", await fetchFile(this.gifImage));
      this.loading = true;

      await ffmpeg.run("-f", "gif", "-i", "randGif.gif", "output.mp4");

      const data = ffmpeg.FS("readFile", "output.mp4");
      this.video = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.gif-converter {
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  padding: 20px 50px;
  background: white;
  box-shadow: 0 15px 20px -15px rgba(0, 0, 0, 0.3),
    0 55px 50px -35px rgba(0, 0, 0, 0.3), 0 85px 60px -25px rgba(0, 0, 0, 0.1);
}

.preview-form video {
  max-width: 100%;
  width: 100%;
  height: auto;
}

.loader {
  margin-top: 50px;
}

.loader .loading-text {
  font-weight: 100;
  color: #dedede;
}

#fileInput {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
