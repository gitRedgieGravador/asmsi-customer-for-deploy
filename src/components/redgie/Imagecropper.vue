<template>
  <div class="pa-10">
    <div id="container">
      <div class="img-container">
        <img class="chemae" ref="image" :src="src" alt="cropped image">
      </div>
    </div>
    <div>
      <v-row>
        <v-col cols="6">
          <v-btn block large color="error" @click="handleCancel">discard</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn block large color="success" @click="resultedImage(1)">apply</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Cropper from "cropperjs";
export default {
  name: "cropImage",
  watch: {
    src: function(nVal) {
      this.cropper.replace(nVal);
    }
  },
  data() {
    return {
      cropper: {},
      destination: {},
      FinalImage: {},
      dialog: false,
      image: {},
      src: null
    };
  },
  mounted() {
    let Imagesource = localStorage.getItem("src");
    this.src = Imagesource;
    this.image = this.$refs.image;
    this.cropper = new Cropper(this.image, {
      zoomable: true,
      scalable: false,
      movable: false,
      aspectRatio: 1,
      crop: () => {
        const canvas = this.cropper.getCroppedCanvas();
        this.destination = canvas.toDataURL("image/png");
      }
    });
  },
  methods: {
    handleCancel() {
      localStorage.setItem("cropSrc", null);
      localStorage.setItem("fromCrop", false);
      this.$router.push({ name: "account" });
    },
    resultedImage(isSuccess) {
      var result = "";
      result = this.destination;
      if (!isSuccess) {
        result = this.src;
      }
      localStorage.setItem("cropSrc", JSON.stringify({ img: result }));
      localStorage.setItem("fromCrop", true);
      this.$router.push({ name: "account" });
      console.log("back to account.");
    }
  }
};
</script>
<style scoped>
.img-container {
  width: auto !important;
  height: 40vh !important;
  justify-content: center !important;
  flex-direction: column !important;
  align-items: center !important;
  display: flex !important;
}
#container {
  height: 50vh !important;
  text-align: center;
  margin-top: 15px;
}
</style>