<template>
  <div class="x-hidden">
    <div flat class="text-center pl-2 pr-2">
      <div class="dp pt-3">
        <form id="myform">
          <input
            ref="uploadPP"
            class="d-none"
            type="file"
            accept="image/*"
            @change="updateProfile($event)"
          >
        </form>
        <v-card class="img mx-auto rounded-xl">
          <!-- class="img rounded-xl" -->
          <v-img
            @click="$refs.uploadPP.click()"
            :src="hasUpdate? profile:`${user.image}`"
            class="white--text align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-text class="overlay text-right">
              <v-icon color="white">mdi mdi-camera</v-icon>EDIT
            </v-card-text>
          </v-img>
        </v-card>
      </div>
      <h2>{{user.firstname}} {{user.lastname}}</h2>
      <span
        class="sm-8"
      >Joined the merchandise @ {{new Date(user.dateinserted).toLocaleDateString("en-US",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</span>
      <v-row>
        <v-col cols="6">
          <v-btn @click="$router.push({name:'account-update'})" text tile block color="primary darken-2">
            <v-icon>fa fa-pencil-square-o</v-icon>Edit
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn :text="true" @click="logout" tile block color="error darken-2">
            <v-icon>fa fa-sign-out</v-icon>logout
          </v-btn>
        </v-col>
      </v-row>
      <v-container>
        <div>
          <v-row class="pa-2">
            <v-icon size="30" class="hw45 brd-black circle pa-1 grey lighten-2">mdi mdi-account</v-icon>
            <div class="pl-3 text-left">
              <small class="bold f-12">{{user.username}}</small>
              <br>
              <small class="neg6 sm-8 grey--text">USERNAME</small>
            </div>
          </v-row>
          <div class="pl-10">
            <v-divider/>
          </div>
          <v-row class="pa-2">
            <v-icon
              size="30"
              class="hw45 brd-black circle pa-1 grey lighten-2"
            >mdi mdi-map-marker-radius</v-icon>
            <div class="pl-3 text-left">
              <small class="bold f-12">{{user.address}}</small>
              <br>
              <small class="neg6 sm-8 grey--text">ADDRESS</small>
            </div>
          </v-row>
          <div class="pl-10">
            <v-divider/>
          </div>
          <v-row class="pa-2">
            <v-icon
              size="30"
              class="hw45 brd-black circle pa-1 grey lighten-2"
            >mdi mdi-gender-male-female</v-icon>
            <div class="pl-3 text-left">
              <small class="bold f-12">{{user.gender}}</small>
              <br>
              <small class="neg6 sm-8 grey--text">GENDER</small>
            </div>
          </v-row>
          <div class="pl-10">
            <v-divider/>
          </div>
          <v-row class="pa-2">
            <v-icon size="30" class="hw45 brd-black circle pa-1 grey lighten-2">mdi mdi-phone</v-icon>
            <div class="pl-3 text-left">
              <small class="bold f-12">{{user.mobileno}}</small>
              <br>
              <small class="neg6 sm-8 grey--text">MOBILE NUMBER</small>
            </div>
          </v-row>
          <div class="pl-10">
            <v-divider/>
          </div>
          <v-row class="pa-2">
            <v-icon size="30" class="hw45 brd-black circle pa-1 grey lighten-2">mdi mdi-calendar-check</v-icon>
            <div class="pl-3 text-left">
              <small class="bold f-12">{{new Date(user.birthdate).toISOString().substr(0, 10)}}</small>
              <br>
              <small class="neg6 sm-8 grey--text">BIRTHDATE</small>
            </div>
          </v-row>
          <div class="pl-10">
            <v-divider/>
          </div>
          <v-row class="pa-2" v-if="user.points != null || user.points > 0">
            <v-icon
              size="30"
              class="hw45 brd-black circle pa-1 grey lighten-2"
            >mdi mdi-trophy-variant</v-icon>
            <div class="pl-3 text-left">
              <small class="bold f-12">{{user.points}} points</small>
              <br>
              <small class="neg6 sm-8 grey--text">REWARDS</small>
            </div>
          </v-row>
        </div>
      </v-container>
      <v-row>
        <v-col cols="6" class="pa-2">
          <v-btn @click="$router.push({name:'transaction-tracking'})" text tile block color="primary darken-2">
            <v-icon large>mdi mdi-calendar-clock</v-icon>
            <small class="text-left pl-1">
              Transaction
              <br>Tracking
            </small>
          </v-btn>
        </v-col>
        <v-col cols="6" class="pa-2">
          <v-btn @click="$router.push({name:'transaction-history'})" text tile block color="primary darken-2">
            <v-icon large>mdi mdi-history</v-icon>
            <small class="text-left pl-1">
              Transaction
              <br>history
            </small>
          </v-btn>
        </v-col>
      </v-row>
      <br><br>
      <div v-if="showM">
        <AlertModal
          :onError="onErrorM"
          :message="message"
          @btnConfirm="handleConfirm"
          @btnNO="handleNO"
          @btnYES="handleYES"
          :isAsking="isAsking"
        />
      </div>
      <v-overlay :value="isloading">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </div>
  </div>
</template>


<script>
import AlertModal from "./alertModal.vue";
import imageAPI from "@/services/upload";
import UsersAPI from "@/services/users";

export default {
  name: "account",
  components: {
    AlertModal
  },
  data() {
    return {
      message: "the quick brown fox jumps over the lazy dog.",
      profile: null,
      showM: false,
      onErrorM: false,
      isAsking: false,
      file: null,
      imageUrl: null,
      hasUpdate: false,
      isloading: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  mounted() {
    window.scrollTo(0, 0);
    this.profile = this.user.image;
    // localStorage.removeItem("fromCrop")
    console.log("account: ", this.user);
    let fromCrop = localStorage.getItem("fromCrop") == "true";
    if (fromCrop) {
      this.isloading = true;
      let cropSrc = JSON.parse(localStorage.getItem("cropSrc")).img;
      let cropedFile = this.dataURLtoFile(
        cropSrc,
        localStorage.getItem("filename")
      );
      this.imageUrl = URL.createObjectURL(cropedFile);
      var body = new FormData();
      body.append("file", cropedFile);
      imageAPI.uploadToS3(body).then(result => {
        this.isloading = false;
        console.log(result);
        if (result.error) {
          this.showM = true;
          this.onErrorM = true;
          this.message = result.message;
          this.img = null;
        } else {
          this.hasUpdate = true;
          this.profile = result.body.file_url;
          this.$forceUpdate();
          localStorage.setItem("cropSrc", null);
          localStorage.setItem("fromCrop", false);
          UsersAPI.updateProfilePic({id: this.user.userid, url: result.body.file_url}).then(res=>{
            console.log(res)
          })
        }
      });
    }
  },
  methods: {
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },
    updateProfile(e) {
      this.file = e.target.files[0];
      console.log(this.file);
      this.imageUrl = URL.createObjectURL(this.file);
      localStorage.setItem("src", this.imageUrl);
      localStorage.setItem("filename", this.file.name);
      this.$router.push({ name: "cropper" });
    },
    handleYES() {
      this.showM = false;
      this.isAsking = false;
      this.$store.dispatch("logout").then(res => {
        console.log(res);
        this.$router.push({ name: "login" });
      });
    },
    logout() {
      this.showM = true;
      this.isAsking = true;
      this.message = "Are you sure you want to logout?";
    },
    handleConfirm() {
      this.showM = false;
      this.isAsking = false;
      this.$store.dispatch("logout").then(res => {
        console.log(res);
        this.$router.push({ name: "login" });
      });
    },
    handleNO() {
      this.showM = false;
      this.isAsking = false;
    }
  }
};
</script>
<style scoped>
.sm-8 {
  font-size: 8px !important;
}
.f-12 {
  font-size: 14px !important;
}
.img {
  height: 200px !important;
  width: 200px !important;
}
.neg6 {
  position: relative;
  top: -5px !important;
  /* left: -6px !important; */
}
.overlay {
  background-color: rgb(13, 71, 161, 0.4);
}
</style>