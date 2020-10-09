<template>
  <div class="centered text-center">
    <v-card outlined class="container text-center pt-7">
      <div>
        <!-- <v-avatar color="indigo" size="70"> -->
        <img class="logo" @click="$router.push({name: 'home'})" src="../assets/asmsi_logo.png">
        <!-- </v-avatar> -->
      </div>
      <br>
      <br>
      <v-form @submit.prevent="onLogin" autocomplete="off" v-model="isFormValid" ref="form">
        <v-text-field
          :rules="[rules.required]"
          v-model="username"
          label="Username"
          solo
          flat
          required
        ></v-text-field>
        <v-divider v-if="usernameInvalid" class="mt-0"></v-divider>
        <v-divider v-if="!usernameInvalid" class="mt-n5"></v-divider>
        <v-text-field
          :rules="[rules.required]"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          :type="show ? 'text' : 'password'"
          v-model="password"
          label="Password"
          solo
          flat
          required
        ></v-text-field>
        <v-btn
          type="submit"
          :disabled="!isFormValid || loading"
          block
          @click="onLogin"
          class="btn primary"
          tile
          large
        >
          <span>LOGIN</span>
          <div v-if="loading">
            <v-progress-circular class="pl-12" :size="15" color="black darken-3" indeterminate></v-progress-circular>
          </div>
        </v-btn>
      </v-form>
      <v-btn block @click="register()" class="btn success mt-3" tile large>CREATE ACCOUNT</v-btn>
      <br>
      <div class="forgot-pass">
        <v-btn text @click="forgotPass" color="primary">Forgot password</v-btn>
      </div>
    </v-card>
    <div v-if="showM">
      <AlertModal
        :onError="onErrorM"
        :message="message"
        @btnConfirm="handleConfirm"
        :isAsking="isAsking"
      />
    </div>
  </div>
</template>


<script>
import AlertModal from "../components/redgie/alertModal.vue";
export default {
  name: "Login",
  components: {
    AlertModal
  },
  data() {
    return {
      message: "the quick brown fox jumsp over the lazy dog.",
      showM: false,
      onErrorM: false,
      isAsking: false,
      loading: false,
      username: "",
      password: "",
      show: false,
      isFormValid: false,
      usernameInvalid: false,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  beforeMount() {
    this.$store.dispatch("logout").then(res => {
      console.log(res);
    });
    console.log("api: ", process.env.API_URL);
  },
  // mounted() {
  //   this.$store.dispatch('logout').then(res=>{
  //     console.log(res)
  //   })
  // },
  computed: {
    userRole() {
      console.log(this.$store.getters.user.role);
      return this.$store.getters.user.role;
    },
    login_role() {
      return this.$store.getters.login_role;
    }
  },
  watch: {
    username: function(value) {
      if (value != "") {
        this.usernameInvalid = false;
      } else {
        this.usernameInvalid = true;
      }
    },
    login_role: function() {
      console.log("watch: ", this.login_role);
      this.$router.push({ name: this.login_role });
    }
  },
  methods: {
    forgotPass() {
      this.$router.push({ name: "forgot-password" });
    },
    handleConfirm() {
      this.username = "admin";
      this.password = "P@ssw0rd";
      this.showM = false;
      this.onErrorM = false;
      this.$refs.form.reset();
    },
    onLogin() {
      this.loading = true;
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password
        })
        .then(result => {
          this.loading = false;
          if (result.error) {
            this.showM = true;
            this.onErrorM = true;
            this.message = result.message;
          }
          console.log("loggin user role: ", result.body.user.role);
          this.$router.push({ name: result.body.user.role });
          // console.log("loggin user: ",this.$store.getters.user)
          // this.$router.push({ name: result.body.user.role});
        })
        .catch(err => {
          this.loading = false;
          this.showM = true;
          this.onErrorM = true;
          this.message = err.message;
        });
    },
    register() {
      this.$router.push("/registration");
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .theme--light.v-card.v-card--outlined {
    border: thin solid transparent !important;
  }
}
.logo {
  height: auto !important;
  width: 45% !important;
}
.container {
  width: 380px;
  background-color: transparent !important;
  padding: 30px;
}
.btn {
  /* border-radius: 5% 5%; */
  border-radius: 10px;
}
.centered {
  justify-content: center !important;
  flex-direction: column !important;
  align-items: center !important;
  display: flex !important;
  height: 90vh !important;
}
/* .forgot-pass {
  position: relative;
  right: -75px !important;
} */
</style>