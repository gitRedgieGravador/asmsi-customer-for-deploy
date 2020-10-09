<template>
  <div>
    <div>
      <center>
        <h1 class="errortext">WARNING</h1>
        <p class="st404">404</p>
        <h1 class="pagenotfound">Page Not Found</h1>
        <v-btn @click="goToLogin" id="gotologin" tile color="secondary darken-2">GO TO LOGIN</v-btn>
      </center>
    </div>
  </div>
</template>
<style scoped>
@media only screen and (max-width: 600px) {
  #gotologin {
    width: 80% !important;
  }
}
#gotologin {
  width: 35% !important;
}
</style>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "notfound",
  methods:{
    goToLogin(){
      this.$router.push({name:'login'})
    }
  }
};
</script>

