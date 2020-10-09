<template>
  <div class="centered">
    <v-card outlined class="transparent text-center pt-12 pl-5 pr-5 pb-3" width="350" height="250">
      <v-snackbar :timeout="-1" :value="true" top app color="deep-purple accent-4" elevation="24">
        <h3>
          Your confirmation is
          <code class="pa-2">{{snackbar_code}}</code> display here temporary.
        </h3>
      </v-snackbar>
      <div class="transparent">
        <h4>
          Input the confirmation code
          <br>sent to your phone.
        </h4>
        <br>
        <v-form
          ref="form"
          @submit.prevent="submitConfirmation"
          autocomplete="off"
          v-model="isConfirmed"
        >
          <v-row>
            <v-col class="pa-1 text-center" cols="2">
              <v-text-field
                autocomplete="off"
                hide-details
                v-model="code1"
                :rules="[rules.required]"
                required
                height="50"
                class="bold black--text"
                ref="code1"
                outlined
                maxlength="1"
                color="success"
              />
            </v-col>
            <v-col class="pa-1 text-center" cols="2">
              <v-text-field
                autocomplete="off"
                hide-details
                v-model="code2"
                :rules="[rules.required]"
                required
                height="50"
                class="bold black--text"
                ref="code2"
                outlined
                maxlength="1"
                color="success"
              />
            </v-col>
            <v-col class="pa-1 text-center" cols="2">
              <v-text-field
                autocomplete="off"
                hide-details
                v-model="code3"
                :rules="[rules.required]"
                required
                height="50"
                class="bold black--text"
                ref="code3"
                outlined
                maxlength="1"
                color="success"
              />
            </v-col>
            <v-col class="pa-1 text-center" cols="2">
              <v-text-field
                autocomplete="off"
                hide-details
                v-model="code4"
                :rules="[rules.required]"
                required
                height="50"
                class="bold black--text"
                ref="code4"
                outlined
                maxlength="1"
                color="success"
              />
            </v-col>
            <v-col class="pa-1 text-center" cols="2">
              <v-text-field
                autocomplete="off"
                hide-details
                v-model="code5"
                :rules="[rules.required]"
                required
                height="50"
                class="bold black--text"
                ref="code5"
                outlined
                maxlength="1"
                color="success"
              />
            </v-col>
            <v-col class="pa-1 text-center" cols="2">
              <v-text-field
                autocomplete="off"
                hide-details
                v-model="code6"
                :rules="[rules.required]"
                required
                height="50"
                class="bold black--text"
                ref="code6"
                outlined
                maxlength="1"
                color="success"
              />
            </v-col>
          </v-row>
          <div>
            <br>
            <h6 @click="resend">Resend confirmation code.</h6>
            <v-spacer></v-spacer>
          </div>
          <br>
          <v-btn
            type="submit"
            :disabled="!isConfirmed"
            block
            color="red darken-2"
            class="white"
            tile
            x-large
          >
            <span>VALIDATE</span>
            <v-icon>mdi-telegram</v-icon>
          </v-btn>
        </v-form>
      </div>
    </v-card>
    <div v-if="showM">
      <AlertModal :onError="onErrorM" :message="message" @btnConfirm="handleConfirm"/>
    </div>
  </div>
</template>


<script>
import auth from "@/services/auth";
import AlertModal from "./alertModal.vue";
export default {
  name: "verify",
  components: {
    AlertModal
  },
  data() {
    return {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
      snackbar_code: "",
      userid: null,
      isConfirmed: false,
      goNext: false,
      rules: {
        required: value => !!value || "Required."
      },
      message: "Message here.",
      showM: false,
      onErrorM: false,
      confirmSuccess: false,
      nextRoute: ""
    };
  },
  watch: {
    code1: function() {
      if (this.code1 != "" && this.code1 != undefined) {
        this.$refs.code2.focus();
        this.code1 = this.code1.toUpperCase();
      } else {
        this.$refs.form.reset();
        this.$refs.code1.focus();
      }
    },
    code2: function() {
      if (this.code2 != "" && this.code2 != undefined) {
        this.$refs.code3.focus();
        this.code2 = this.code2.toUpperCase();
      } else {
        this.$refs.form.reset();
        this.$refs.code1.focus();
      }
    },
    code3: function() {
      if (this.code3 != "" && this.code3 != undefined) {
        this.$refs.code4.focus();
        this.code3 = this.code3.toUpperCase();
      } else {
        this.$refs.form.reset();
        this.$refs.code1.focus();
      }
    },
    code4: function() {
      if (this.code4 != "" && this.code4 != undefined) {
        this.$refs.code5.focus();
        this.code4 = this.code4.toUpperCase();
      } else {
        this.$refs.form.reset();
        this.$refs.code1.focus();
      }
    },
    code5: function() {
      if (this.code5 != "" && this.code5 != undefined) {
        this.$refs.code6.focus();
        this.code5 = this.code5.toUpperCase();
      } else {
        this.$refs.form.reset();
        this.$refs.code1.focus();
      }
    },
    code6: function() {
      if (this.code6 != "" && this.code6 != undefined) {
        this.$refs.code1.focus();
        this.code6 = this.code6.toUpperCase();
      } else {
        this.$refs.form.reset();
        this.$refs.code1.focus();
      }
    }
  },
  mounted() {
    this.userid = this.$route.params.insertId;
    this.nextRoute = localStorage.getItem("nextRoute");
    console.log(this.nextRoute);
  },
  beforeMount() {
    this.$store.dispatch("logout").then(res => {
      console.log("logout ", res);
    });
    this.snackbar_code = localStorage.getItem("confirmationCode");
    console.log("confirmationCode@verify ", this.snackbar_code);
  },
  methods: {
    resend() {
      this.showM = true;
      this.onErrorM = false;
      this.message = "Confirmation code was sent.";
    },
    handleConfirm() {
      this.showM = false;
      this.onErrorM = false;
      this.$refs.form.reset()
      if (this.goNext) {
        this.$router.push({ name: this.nextRoute });
        localStorage.removeItem("nextRoute");
      }
    },

    submitConfirmation() {
      var body = {
        userid: this.userid,
        confirmationCode:
          this.code1 +
          this.code2 +
          this.code3 +
          this.code4 +
          this.code5 +
          this.code6
      };

      if (this.nextRoute == "new-password") {
        auth
          .verifyCode(body)
          .then(result => {
            if (result.error) {
              this.showM = true;
              this.onErrorM = true;
              this.message = result.message;
              this.goNext = false;
            } else {
              this.showM = true;
              this.onErrorM = false;
              this.message = result.message;
              this.goNext = true;
              localStorage.setItem("userid", this.userid);
            }
          })
          .catch(err => {
            console.log(err);
            this.showM = true;
            this.onErrorM = true;
            this.message = err.message;
            this.goNext = false;
          });
      } else {
        this.$store
          .dispatch("confirm", body)
          .then(result => {
            console.log("res=> ", result);
            if (result.error) {
              this.showM = true;
              this.onErrorM = true;
              this.message = result.message;
              this.goNext = false;
            } else {
              this.showM = true;
              this.onErrorM = false;
              this.message = result.message;
              this.goNext = true;
            }
          })
          .catch(err => {
            console.log(err);
            this.showM = true;
            this.onErrorM = true;
            this.message = err.message;
            this.goNext = false;
          });
      }
    }
  }
};
</script>
<style scoped>
h6 {
  color: blue;
  position: relative;
  left: -25%;
  text-decoration: underline;
  cursor: pointer;
}
.hid {
  -webkit-appearance: none !important;
  -moz-appearance: none !important;
  appearance: none !important;
  margin: 0 !important;
}
.centered {
  justify-content: center !important;
  flex-direction: column !important;
  align-items: center !important;
  display: flex !important;
  height: 80vh !important;
}

.svg-1 {
  position: absolute;
  top: 20% !important;
  z-index: -1;
}
</style>