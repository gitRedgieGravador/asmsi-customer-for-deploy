<template>
  <div id="home" class="home">
    <div class="pa-0">
      <div>
        <div class="pa-0 upper-container bg-upper" height="50vh" width="100%">
          <div class="name text-center">
            <img class="asmsi-basket" id="basket" :src="require('@/assets/fullbasket.png')">
            <br>
            <img class="asmsi-llc" :src="require('@/assets/asmsi-llc.png')"><br>
            <img class="asmsi-llc" :src="require('@/assets/genmer.png')">
            <br>
          </div>
        </div>
        <div class="pa-0 lower-container" height="49vh" width="100%">
          <div class="text-center pt-5">
            <img class="tagline" :src="require('@/assets/tagline2.png')"><br>
            <!-- color="orange darken-1" -->
            <v-btn
              dark
              outlined
              class="ma-3 rounded-xl orange lighten-3 black--text"
              x-large
              @click="$router.push({name: 'customer'})"
            >PROCEED AS GUEST</v-btn>
            <div class="small">
              <small>
                Already have an account?
                <b
                  @click="$router.push({name: 'login'})"
                  class="underline primary--text cursor"
                >Login</b>
              </small>
            </div>
            <div class="absolute-bottom-right">
              <v-btn text absolute right fab color="primary">
                <v-icon
                  size="60"
                  @click="open('http://m.me/232550008046975')"
                >mdi mdi-facebook-messenger</v-icon>
              </v-btn>
            </div>
          </div>

          <!-- MESSENGER INTEGRATION -->
          <!-- <div
            class="fb-customerchat"
            attribution="setup_tool"
            page_id="232550008046975"
            theme_color="#fa3c4c"
            logged_in_greeting="Hi! Good day. How can we help you?"
            logged_out_greeting="Hi! Good day. How can we help you?"
          ></div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  methods: {
    open(link) {
      window.open(link);
    },
  },
  beforeMount() {
    this.$store.dispatch("logout").then(res => {
      console.log("logout ", res);
    });
  },
};
</script>
<style scoped>
.upper-container {
  justify-content: center !important;
  flex-direction: column !important;
  align-items: center !important;
  display: flex !important;
  height: 60vh !important;
}
.lower-container {
  height: 41vh !important;
}
.name {
  margin-top: 10vh !important;
}
.asmsi-llc {
  height: 40px !important;
  width: auto !important;
}
.tagline {
  height: 60px !important;
  width: 180px !important;
}
.asmsi-basket {
  height: 150px !important;
  width: auto !important;
}
.small {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 14px !important;
}
</style>
