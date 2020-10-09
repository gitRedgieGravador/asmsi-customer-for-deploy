<template>
  <v-app id="app" ref="app">
    <div v-if="hide_appbar"></div>
    <!-- customer app bar height="65" -->
    <div
      v-else-if="user.role == 'customer' && $route.name != 'account-update' && $route.name != 'transaction-history' && $route.name != 'transaction-tracking' && $route.name != 'verify' && $route.name != 'registration'"
    >
      <v-app-bar height="65" app flat dark :color="'light-blue lighten-1'">
        <!-- $route.name == 'basket' ||  $route.name == 'checkout'?'#D32F2F': -->
        <v-row v-if="!showit" class="pa-0">
          <v-col class="pa-0" cols="2">
            <v-icon size="45" @click="handleBack">mdi mdi-chevron-left</v-icon>
          </v-col>
          <v-col
            class="pa-0"
            style="margin-top:10px !important;margin-left:2px !important;"
            cols="4"
          >
            <div class="body-1" @click="handleBack">Back</div>
          </v-col>
        </v-row>
        <v-flex class="text-center mx-auto">
          <h2 v-if="!showit" class="header">{{header}}</h2>
        </v-flex>
        <v-spacer v-if="isLogin"></v-spacer>
        <span v-if="$route.name == 'customer' && isLogin" class="pa-1"></span>
        <v-icon
          v-if="$route.name == 'customer' && isLogin"
          class="pa-1"
          @click="navto('basket')"
        >fa fa-shopping-basket</v-icon>
        <span v-if="$route.name == 'customer' && isLogin" class="pr-2"></span>
        <img
          class="cursor"
          v-if="$route.name == 'customer' && isLogin"
          @click="navto('account')"
          :src="`${user.image}`"
          id="profile"
        >
      </v-app-bar>
    </div>
    <!-- Guest user -->
    <div
      v-else-if="login_role == 'guest' && $route.name != 'new-password' && $route.name != 'verify' && $route.name != 'login' && $route.name != 'home' && $route.name != 'registration' && $route.name != 'forgot-password'"
    >
      <v-app-bar height="65" app flat dark :color="'light-blue lighten-1'">
        <v-row v-if="!showit" class="pa-0">
          <v-col class="pa-0" cols="2">
            <v-icon size="45" @click="handleBack">mdi mdi-chevron-left</v-icon>
          </v-col>
          <v-col
            class="pa-0"
            style="margin-top:10px !important;margin-left:2px !important;"
            cols="4"
          >
            <div class="body-1" @click="handleBack">Back</div>
          </v-col>
        </v-row>
        <v-flex class="text-center mx-auto">
          <h2 v-if="!showit" class="header">{{header}}</h2>
        </v-flex>
        <v-spacer></v-spacer>
        <span class="pa-1"></span>
        <v-icon class="pa-1" @click="navto('basket')">fa fa-shopping-basket</v-icon>
        <span class="pr-2"></span>
        <img
          class="cursor"
          @click="navto('account')"
          :src="require('./assets/guest.png')"
          id="profile"
        >
      </v-app-bar>
    </div>
    <v-main class="x-hidden">
      <div
        v-if="$route.name == 'registration' || $route.name == 'account-update' || $route.name == 'forgot-password' || $route.name == 'new-password'"
      >
        <v-card tile flat class="bottom-border app-bg" height="120">
          <v-container fluid>
            <v-row align="center" justify="center">
              <h2 class="pt-16 pb-5 mx-auto">{{header}}</h2>
            </v-row>
          </v-container>
        </v-card>
      </div>
      <div
        v-if="$route.name == 'basket' || $route.name == 'checkout'"
        style="height: 150px; overflow: hidden;"
        class="mt-n1"
      >
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;">
          <path
            d="M-53.33,65.63 C319.13,61.67 272.85,152.45 500.84,150.48 L500.00,0.00 L0.00,0.00 Z"
            style="stroke: none; fill: #29B6F6;"
          ></path>
        </svg>
        <h1 class="mt-n16 ml-5">{{$route.name.toUpperCase()}}</h1>
      </div>
      <div
        :class="($route.name == 'product-details' || $route.name == 'account')? 'bg-img pa-0':$route.name == 'home'?'pa-0':'pa-0'"
      >
        <transition :name="pageTransition" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </v-main>
  </v-app>
</template>

<script>
// import http from 'axios'
export default {
  name: "App",
  components: {},
  data() {
    return {
      pageTransition: "slide-left",
      search: "",
      hide_appbar: false,
      menu: true,
      goingBack: false,
      api_url: process.env.API_URL || "not working"
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    isloading() {
      return this.$store.getters.isloading;
    },
    user() {
      return this.$store.getters.user;
    },
    showit() {
      return this.$store.getters.showit;
    },
    header() {
      return this.$store.getters.header;
    },
    login_role() {
      return this.$store.getters.login_role;
    }
  },
  watch: {
    search: function() {
      if (this.search != "" || this.search != null) {
        this.$store.dispatch("SET_SEARCH", this.search);
      }
      if (!this.search) this.search = "";
    },
    $route: function() {
      if (this.goingBack) this.pageTransition = "slide-right";
      else this.pageTransition = "slide-left";
      this.goingBack = false;
      console.log("Route: ", this.$route.name); //SET_HEADER
      let rname = this.$route.name;
      this.manageRouteParams(rname);
    }
  },
  mounted() {
    this.manageRouteParams(this.$route.name);
    localStorage.setItem("cropSrc", null);
    localStorage.setItem("fromCrop", false);
  },
  methods: {
    manageHeader(header, showit) {
      localStorage.setItem("header", header);
      localStorage.setItem("showit", showit);
      this.$store.dispatch("SET_HEADER", header);
      this.$store.dispatch("SET_SHOWIT", showit);
    },
    manageRouteParams(rname) {
      if (rname == "admin") {
        this.manageHeader("LLC General Merchadise", false);
      } else if (rname == "account") {
        this.manageHeader("", false);
      } else if (rname == "customer") {
        this.manageHeader("", true);
      } else if (rname == "cart") {
        this.manageHeader("", false);
      } else if (rname == "basket") {
        this.manageHeader("", false);
      } else if (rname == "registration") {
        this.manageHeader("Register Account", false);
      } else if (rname == "product-details") {
        this.manageHeader("", false);
      } else if (rname == "checkout") {
        this.manageHeader("", false);
      } else if (rname == "forgot-password") {
        this.manageHeader("Forgot Password", false);
      } else if (rname == "new-password") {
        this.manageHeader("New Password", false);
      } else if (rname == "account-update") {
        this.manageHeader("Update Account", false);
      } else if (rname == "transaction-tracking") {
        this.manageHeader("", true);
      }
      if (
        rname == "forbidden-page" ||
        rname == "notfound" ||
        rname == "login" ||
        rname == "customer-registration"
      ) {
        this.hide_appbar = true;
      } else {
        this.hide_appbar = false;
      }
      window.scrollTo(0, 0);
    },
    navto(rname) {
      if (this.$route.name != rname) {
        if (rname == "home" && this.$route.name == "registration") {
          this.$router.push({ name: "login" });
        } else {
          this.$router.push({ name: rname });
        }
      }
    },
    handleBack() {
      this.goingBack = true;
      let lastRoute = this.$route.name;
      if (lastRoute == "checkout") {
        this.$router.push({ name: "basket" });
      } else if (lastRoute == "cropper") {
        this.$router.push({ name: "account" });
      } else {
        this.$router.push({ name: "customer" });
      }
    },
    ShowSB() {
      this.$store.dispatch("setSB", true);
    },
    logout() {
      this.$store.dispatch("logout").then(resp => {
        if (resp) {
          this.$router.push({ name: "login" });
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "./CSS/global.css";
</style>
<style scoped>
.footer {
  position: fixed;
  bottom: 0 !important;
}
.label {
  font-size: 10px !important;
  margin-bottom: 0% !important;
}
#profile {
  border-radius: 50%;
  border: black;
  height: 40px !important;
  width: 40px !important;
}
/* .v-application {
  font-size: 16px !important;
  font-family: monospace !important;
  font-weight: 550 !important;
  letter-spacing: 1px !important;
} */

.v-application {
  font-size: 14px !important;
  font-family: "Lucida Sans", "Lucida Sans Unicode" !important;
  font-weight: 500 !important;
  letter-spacing: 1px !important;
}
.pad-10 {
  padding: 20px !important;
}

.app-bg {
  background: linear-gradient(to bottom, #29b6f6 10%, #ffffff 101%);
}
.bottom-border {
  border-bottom-left-radius: 30px !important;
  border-bottom-right-radius: 30px !important;
  border: transparent !important;
}
@media (display-mode: fullscreen) {
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>