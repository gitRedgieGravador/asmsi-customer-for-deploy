<template>
  <div class>
    <v-container fluid>
      <v-row align="center" justify="center">
        <div class="pl-2 pr-2">
          <!-- Phase 1 username and password pt-16 -->
          <div v-show="phase1" class="text-center">
            <v-form class="pa-0 ma-0" v-model="myform">
              <v-text-field
                outlined
                :rules="usernameValid ? [rules.required, rules.UsernameMin,rules.hasNonAlphaNum]:[rules.required, rules.hasNonAlphaNum,rules.UsernameMin, rules.isExists]"
                placeholder="USERNAME"
                :success="usernameValid"
                autocomplete="off"
                class="pa-0 ma-0"
                v-model="username"
                color="primary"
                :success-messages="myform? 'Good username.':''"
                full-width
                :append-icon="myform? 'mdi-check':''"
              />
            </v-form>
            <v-form class="pa-0 ma-0" v-model="addressform">
              <v-text-field
                autocomplete="off"
                :rules="[rules.required]"
                placeholder="ADDRESS"
                :success="addressform"
                class="pa-0 ma-0"
                v-model="address"
                outlined
                color="primary"
                full-width
              />
            </v-form>
            <v-form class="pa-0 ma-0" v-model="passwordform">
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
            <v-btn
              dark
              @click.stop="submitPhase1"
              class="rounded-xl bold"
              block
              height="60"
              color="#29B6F6"
            >
              <h1>continue</h1>
              <v-icon size="60">mdi mdi-chevron-double-right</v-icon>
            </v-btn>
          </div>

          <!-- pahse 2 complete registration -->
          <div v-show="!phase1" class="text-center">
            <v-form ref="completionForm" class="pa-0 ma-0" v-model="completionForm">
              <v-text-field
                :rules="[rules.required]"
                placeholder="Firstname"
                class="pa-0 ma-0"
                v-model="firstname"
                outlined
                color="black"
                full-width
              />
              <v-text-field
                :rules="[rules.required]"
                placeholder="Lastname"
                class="pa-0 ma-0"
                v-model="lastname"
                outlined
                color="black"
                full-width
              />
              <v-text-field
                :rules="[rules.required, rules.numsOnly, rules.maxlen]"
                placeholder="Mobile Number"
                class="pa-0 ma-0"
                v-model="mobileno"
                autocomplete="off"
                type="number"
                outlined
                color="black"
                maxlength="10"
                full-width
              >
                <div slot="prepend-inner" class="plus63">+63</div>
              </v-text-field>
              <v-row>
                <v-col>
                  <v-select
                    v-model="gender"
                    :items="items"
                    :rules="[rules.required]"
                    placeholder="Gender"
                    outlined
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    label="BIRTHDATE"
                    :rules="[rules.required]"
                    class="pa-0 ma-0"
                    outlined
                    color="black"
                    v-model="birthdate"
                    @click="dateDialog = true"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <v-btn
              dark
              class="rounded-xl bold"
              block
              height="60"
              color="#29B6F6"
              @click.stop="submitRegistration"
            >
              <h1 class="mx-2">Register</h1>
              <v-icon size="40" class="mx-2">mdi mdi-account-plus</v-icon>
            </v-btn>
          </div>
          <v-row justify="center" class="x-hidden">
            <v-dialog v-model="dateDialog" persistent transition="scale-transition">
              <v-date-picker
                color="error darken-1"
                @change="dateDialog = false"
                :max="today"
                v-model="birthdate"
                :show-current="false"
              ></v-date-picker>
            </v-dialog>
          </v-row>
        </div>
        <v-snackbar
          top
          multi-line
          color="deep purple"
          elevation="24"
          v-model="snackbar"
          :timeout="2000"
        >{{snackbar_message}}</v-snackbar>
        <v-overlay :value="isloading">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-row>
    </v-container>
    <div v-if="showM">
      <AlertModal :onError="onErrorM" :message="message" @btnConfirm="handleConfirm"/>
    </div>
  </div>
</template>
<script>
import auth from "@/services/auth";
import AlertModal from "./alertModal";
export default {
  name: "UpdateProfile",
  components: { AlertModal },
  data() {
    return {
      message: "Message here.",
      showM: false,
      onErrorM: false,
      conf_eye: false,
      pass_eye: false,
      snackbar_message: "",
      snackbar: false,
      isloading: false,
      dateDialog: false,
      today: new Date().toISOString().substr(0, 10),
      birthdate: new Date().toISOString().substr(0, 10),
      phase1: true,
      myform: false,
      passwordform: true,
      confpasswordform: true,
      addressform: true,
      address: "",
      username: "",
      password: "",
      confpassword: "",
      usernameValid: false,
      firstname: "",
      lastname: "",
      mobileno: "",
      gender: "",
      completionForm: false,
      items: ["Male", "Female"],
      rules: {
        required: value => !!value || "Required.",
        isExists: v => v == null || "Username not available.",
        UsernameMin: v => v.length >= 5 || "Username atleast 5 characters",
        passMin: v => v.length >= 8 || "Password atleast 8 characters",
        match: v => v == this.password || "Password password did not match.",
        maxlen: v =>
          v.length <= 10 ||
          "Exceeds the maximum number of charater for a mobile number.",
        hasNonAlphaNum: value => {
          const pattern = /^[a-zA-Z0-9]+$/;
          return (
            pattern.test(value) ||
            "Username only accepts alphanumric characters"
          );
        },
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
        numsOnly: value => {
          const pattern = /^[0-9]/;
          return pattern.test(value) || "Numbers only.";
        },
        spacialChars: value => {
          const pattern = /^(?=.*[!@#$%^&*])/;
          return pattern.test(value) || "Must Contain special character.";
        }
      }
    };
  },
  beforeMount() {
    this.$store.dispatch("logout").then(res => {
      console.log("logout ", res);
    });
  },
  methods: {
    handleConfirm() {
      console.log("handleConfirm...");
      this.showM = false;
      this.onErrorM = false;
      this.registerSuccess = true;
      localStorage.setItem("nextRoute", "customer");
      this.$router.push({ path: `/verify/${this.insertId}` });
    },
    submitPhase1(e) {
      e.preventDefault();
      try {
        if (!this.myform) {
          throw "Invalid username. Please check your input.";
        }
        if (!this.passwordform) {
          throw "Invalid password. Please check your input.";
        }
        if (!this.confpasswordform) {
          throw "Invalid confirm password. Please check your input.";
        }
        this.$store.dispatch("SET_HEADER", "Complete Registration");
        this.phase1 = false;
        window.scrollTo(0, 0);
      } catch (error) {
        this.snackbar_message = error;
        this.snackbar = true;
        console.log(error);
      }
    },
    submitRegistration() {
      try {
        this.$refs.completionForm.validate();
        if (!this.completionForm)
          throw "Complete Registration has invalid input. Please check your input.";
        if (this.birthdate >= this.today)
          throw "Invalid birthdate. Please check your input.";
        console.log("completed registraton...");
        var user = {
          username: this.username,
          role: "customer",
          firstname: this.firstname,
          lastname: this.lastname,
          gender: this.gender,
          password: this.password,
          mobileno: this.mobileno,
          address: this.address,
          isdefaultpass: false,
          isConfirm: false,
          image: "https://asmsi-photos.s3.amazonaws.com/guest.png",
          birthdate: new Date(this.birthdate)
        };
        auth
          .register(user)
          .then(result => {
            if (result.error) {
              this.showM = true;
              this.onErrorM = true;
              this.message = result.message;
            } else {
              console.log("confirmationCode", result.body.code);
              localStorage.setItem("confirmationCode", result.body.code);
              this.showM = true;
              this.onErrorM = false;
              this.message = result.message;
              this.registerSuccess = true;
              this.insertId = result.body.insertId;
            }
          })
          .catch(err => {
            this.showM = true;
            this.onErrorM = true;
            this.message = err.message;
          });
      } catch (error) {
        this.snackbar_message = error;
        this.snackbar = true;
        console.log(error);
      }
    }
  },
  watch: {
    password: function() {
      if (this.confpassword != "") {
        this.$refs.confpasswordform.validate();
      }
    },
    username: function(val) {
      this.username = val.toLowerCase();
      if (val != "") {
        if (this.username.length >= 5) {
          auth.isExists(this.username).then(result => {
            if (result.error) {
              this.usernameValid = false;
            } else {
              this.usernameValid = true;
            }
          });
        }
      }
      if (val == "") {
        this.usernameValid = false;
      }
    }
  }
};
</script>
<style scoped>
.plus63 {
  padding-top: 3px !important;
}
</style>
