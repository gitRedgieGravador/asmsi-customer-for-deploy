<template>
  <div>
    <v-container fluid>
      <v-row align="center" justify="center">
        <div class="pl-2 pr-2">
          <v-card flat color="#E3F2FD" class="pa-3 rounded-xl text-center">
            <b>
              <small class="rm-txt">Provide you username below.</small>
            </b>
          </v-card>
          <v-form class="pa-0 ma-0 pt-5" v-model="myform">
            <v-text-field
              outlined
              :rules="[rules.required]"
              placeholder="USERNAME"
              autocomplete="off"
              class="pa-0 ma-0"
              v-model="username"
              color="primary"
              full-width
            />
            <v-btn @click="handleSubmit" outlined block x-large color="error">
              <h1>Submit</h1>
            </v-btn>
          </v-form>
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
      myform: false,
      username: "",
      snackbar: false,
      snackbar_message: "",
      isloading: false,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    handleSubmit() {
      try {
        if (!this.myform) {
          throw "Invalid username. Please check your input.";
        }
        this.isloading = true;
        auth.isExists(this.username).then(result => {
          // returning an error response means username is found
          if (result.error) {
            this.isloading = false;
            localStorage.setItem("nextRoute", "new-password")
            this.$router.push({ path: `/verify/${result.body[0].userid}` });
          } else {
            this.isloading = false;
            console.log("not found");
            this.snackbar_message =
              "Opps! Username not found. Please check your input!";
            this.snackbar = true;
          }
        });
      } catch (error) {
        console.log(error);
        this.snackbar_message = error
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
