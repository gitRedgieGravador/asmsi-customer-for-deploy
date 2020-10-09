<template>
  <div>
    <v-row justify="center" class="x-hidden">
      <v-dialog v-model="dialog" persistent max-width="250">
        <v-card class="text-center x-hidden">
          <div
            :class="onError? 'pa-3 text-left error darken-1 white':'pa-3 text-left success darken-1 white'"
          >
            <h3 class="myfont" v-if="onError && !isAsking">WARNING</h3>
            <h3 class="myfont" v-if="!onError && !isAsking">SUCCESS</h3>
            <h3 class="myfont" v-if="isAsking">CONFIRMATION</h3>
          </div>
          <v-row align="center" justify="center">
            <v-col cols="4">
              <v-icon
                v-if="onError && !isAsking"
                color="red darken-2"
                class="error-icon pl-2"
                x-large
              >mdi-alert</v-icon>
              <v-icon
                v-if="!onError && !isAsking"
                color="green darken-2"
                class="error-icon pl-2"
                small
              >fa fa-check-square-o</v-icon>

              <v-icon
                v-if="isAsking"
                color="green darken-2"
                class="error-icon pl-2"
                x-large
              >fa fa-question-circle-o</v-icon>
            </v-col>
            <v-col cols="8">
              <small class="pl-1 pr-3">{{message}}</small>
            </v-col>
          </v-row>
          <div class="pl-3 pr-3">
            <div v-if="isAsking">
              <v-row class="text-right">
                <v-spacer/>
                <v-col class="pa-1">
                  <v-btn outlined dark height="40" class="rounded-lg" color="primary darken-2" @click="$emit('btnNO')">NO</v-btn>
                </v-col>
                <v-col class="pa-1">
                  <v-btn class="mr-3 rounded-lg" outlined dark height="40" color="red darken-2" @click="$emit('btnYES')">YES</v-btn>
                </v-col>
              </v-row>
            </div>
            <div v-if="!isAsking" class="text-right">
              <v-btn outlined dark height="40" class="rounded-lg" color="red darken-2" @click="$emit('btnConfirm')">Confirm</v-btn>
            </div>
          </div>
          <!-- <v-icon v-if="onError && !isAsking" color="red darken-2" class="error-icon" x-large>mdi-alert</v-icon>
          <v-icon
            v-if="!onError && !isAsking"
            color="green darken-2"
            class="error-icon"
            x-large
          >mdi-checkbox-marked-circle-outline</v-icon>

          <v-icon
            v-if="isAsking"
            color="green darken-2"
            class="error-icon"
            x-large
          >mdi-shield-outline</v-icon>
          <h2 class="myfont" v-if="onError && !isAsking">WARNING</h2>
          <h2 class="myfont" v-if="!onError && !isAsking">SUCCESS</h2>
          <h2 class="myfont" v-if="isAsking">CONFIRMATION</h2>
          <h5 class="justify">{{message}}</h5>
          <br>
          <v-spacer></v-spacer>
          <div class="pl-3 pr-3">
            <div v-if="isAsking">
              <v-row>
                <v-col>
                  <v-btn
                    tile
                    dark
                    height="50"
                    block
                    color="primary darken-2"
                    @click="$emit('btnNO')"
                  >NO</v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    tile
                    dark
                    height="50"
                    block
                    color="red darken-2"
                    @click="$emit('btnConfirm')"
                  >YES</v-btn>
                </v-col>
              </v-row>
            </div>
            <div v-if="!isAsking">
              <v-btn
                tile
                dark
                height="50"
                block
                color="red darken-2"
                @click="$emit('btnConfirm')"
              >Confirm</v-btn>
            </div>
          </div>-->
          <br>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "alertModal",
  props: {
    onError: Boolean,
    isAsking: Boolean,
    message: String
  },
  data() {
    return {
      dialog: true
    };
  }
};
</script>
<style scoped>
.myfont {
  font-family: Verdana;
}
.error-icon {
  font-size: 80px !important;
}
/* .v-btn {
  font-size: 15px !important;
  font-family: Verdana !important;
} */
.centercol {
  margin: auto;
  text-align: center;
}
</style>