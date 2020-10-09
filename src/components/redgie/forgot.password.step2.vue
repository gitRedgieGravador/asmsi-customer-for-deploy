<template>
  <div>
    <v-container fluid>
      <v-row align="center" justify="center">
        <div class="pl-2 pr-2">
          <v-form class="pa-0 ma-0 pt-8" v-model="passwordform">
            <v-text-field
              :rules="[rules.required, rules.alpha, rules.nums, rules.spacialChars, rules.passMin]"
              placeholder="PASSWORD"
              :success="passwordform"
              ref="username"
              class="pa-0 ma-0"
              v-model="password"
              :type="pass_eye?'text':'password'"
              outlined
              color="primary"
              :success-messages="passwordform? 'Strong password.':''"
              full-width
            >
              <template v-slot:append>
                <v-icon v-if="pass_eye" @click="pass_eye = !pass_eye">mdi-eye</v-icon>
                <v-icon v-if="!pass_eye" @click="pass_eye = !pass_eye">mdi-eye-off</v-icon>
              </template>
            </v-text-field>
            <!-- :append-icon="passwordform? 'mdi-check':''" :append-icon="'mdi-eye'" -->
          </v-form>
          <v-form class="pa-0 ma-0" v-model="confpasswordform" ref="confpasswordform">
            <v-text-field
              :rules="[rules.required, rules.match]"
              placeholder="PASSWORD"
              :success="confpasswordform"
              :type="conf_eye?'text':'password'"
              ref="confpasswordform"
              class="pa-0 ma-0"
              v-model="confpassword"
              outlined
              color="primary"
              :success-messages="confpasswordform? 'Password matched.':''"
              full-width
            >
              <template v-slot:append>
                <v-icon
                  v-if="conf_eye"
                  @click="conf_eye = !conf_eye"
                  :color="confpasswordform? 'success':''"
                >mdi-eye</v-icon>
                <v-icon
                  v-if="!conf_eye"
                  @click="conf_eye = !conf_eye"
                  :color="confpasswordform? 'success':''"
                >mdi-eye-off</v-icon>
              </template>
            </v-text-field>
          </v-form>
          <v-btn @click="handleSubmit" outlined block x-large color="error">
            <h1>Submit</h1>
          </v-btn>
        </div>
      </v-row>
    </v-container>
    <v-snackbar
      multi-line
      color="deep purple"
      elevation="24"
      v-model="snackbar"
      :timeout="2000"
    >{{snackbar_message}}</v-snackbar>
    <v-overlay :value="isloading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import auth from "@/services/auth";
export default {
  name: "forgotPassword",
  data() {
    return {
      userid: "",
      myform: false,
      username: "",
      snackbar: false,
      snackbar_message: "",
      isloading: false,
      conf_eye: false,
      pass_eye: false,
      passwordform: true,
      confpasswordform: true,
      password: "",
      confpassword: "",
      rules: {
        required: value => !!value || "Required.",
        passMin: v => v.length >= 8 || "Password atleast 8 characters",
        match: v => v == this.password || "Password password did not match.",
        alpha: value => {
          const pattern = /^(?=.*[a-z])(?=.*[A-Z])/; //(?=.{8,})
          return (
            pattern.test(value) ||
            "Must have at lowercase and uppercase letters."
          );
        },
        nums: value => {
          const pattern = /^(?=.*[0-9])/;
          return pattern.test(value) || "Must Contain number.";
        },
        spacialChars: value => {
          const pattern = /^(?=.*[!@#$%^&*])/;
          return pattern.test(value) || "Must Contain special character.";
        }
      }
    };
  },
  watch: {
    password: function() {
      if (this.confpassword != "") {
        this.$refs.confpasswordform.validate();
      }
    }
  },
  mounted() {
    this.userid = localStorage.getItem("userid");
  },
  methods: {
    handleSubmit() {
      try {
        if (!this.passwordform) {
          throw "Invalid username. Please check your input.";
        }
        this.isloading = true;
        let data = { newpassword: this.password, id: this.userid };
        auth.changePassword(data).then(result => {
          console.log(result);
          if (result.error) {
            this.snackbar_message = result.message;
            this.snackbar = true;
          } else {
            this.$router.push({ name: "login" });
          }
        });
      } catch (error) {
        console.log(error);
        this.snackbar_message = error;
        this.snackbar = true;
      }
    }
  }
};
</script>
<style scoped>
.rm-txt {
  color: #1976d2;
}
</style>
