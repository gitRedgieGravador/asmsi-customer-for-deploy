<template>
  <div class="x-hidden">
    <v-card width="100%" flat class="bg">
      <v-row class="mt-6" align="center" justify="center">
        <img class="d-img" :src="`${info.img}`">
      </v-row>
      <v-container>
        <div>
          <v-row class="pa-0">
            <v-col cols="9 mx-auto">
              <div class="bold body-1">{{info.productname}}</div>
              <v-divider class="white"></v-divider>
            </v-col>
            <!-- <v-col cols="2">
              <v-icon
                size="30"
                v-if="!isFavorite"
                @click="isFavorite = true"
                color="pink"
              >mdi mdi-heart-outline</v-icon>
              <v-icon
                size="30"
                v-if="isFavorite"
                @click="isFavorite = false"
                color="pink"
              >mdi mdi-heart</v-icon>
            </v-col>-->
          </v-row>
        </div>

        <div>
          <v-row>
            <v-col cols="1" class="pl-4">
              <v-icon size="20" color="error">fa fa-info</v-icon>
            </v-col>
            <v-col class="black--text">
              <small class="bold">Description</small>
              <v-divider></v-divider>
              <small>{{info.description}}</small>
            </v-col>
          </v-row>
        </div>
        <v-row>
          <v-col class="text-center pt-6" cols="5">
            <v-row class="pa-0">
              <v-col class="pa-0" cols="4">
                <v-icon size="20" color="error">mdi mdi-wallet-giftcard</v-icon>
              </v-col>
              <v-col class="pa-0 text-left" cols="8">
                <span
                  class="bold mt-1 underline--red pl-1"
                >{{info.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</span>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="7">
            <v-btn
              class="rounded-xl"
              @click="addToCart(info.productid)"
              x-large
              tile
              color="error darken-1"
              block
            >
              Add to
              <v-icon class="mx-3">fa fa-shopping-basket</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <div v-if="showM">
      <AlertModal :onError="onErrorM" :message="message" @btnConfirm="handleConfirm"/>
    </div>
  </div>
</template>


<script>
import CART from "@/services/cartService";
import AlertModal from "./alertModal";
import url from "@/services/serviceConfig";
export default {
  name: "info",
  components: {
    AlertModal
  },
  beforeMount() {
    this.info = JSON.parse(localStorage.getItem("product_details"));
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    login_role() {
      return this.$store.getters.login_role;
    }
  },
  data() {
    return {
      isFavorite: false,
      info: {},
      showdetails: true,
      showM: false,
      onErrorM: false,
      message: "",
      frontend_url: url.frontend_url
    };
  },
  methods: {
    handleConfirm() {
      this.$router.push({ name: "customer" });
    },
    addToCart(productid) {
      if (this.login_role == "guest") {
        this.$router.push({ name: "login" });
      } else {
        var data = {
          custid: this.user.userid,
          productid: productid,
          quantity: 1
        };
        CART.addtoCart(data).then(res => {
          if (!res.error) {
            console.log(res);
            this.showM = true;
            this.onErrorM = false;
            this.message = res.message;
          } else {
            console.log("Error ", res);
            this.showM = true;
            this.onErrorM = true;
            this.message = res.message;
            if (res.message.includes("forbidden")) {
              this.$router.push({ name: "login" });
            }else if(res.message.includes("You are not authenticated")){
              this.$router.push({ name: "login" });
            }
          }
        });
        this.quantity = 1;
        this.addtocart = false;
      }
    }
  }
};
</script>
<style scoped>
.d-img {
  height: 220px !important;
  width: 80% !important;
  border-radius: 2% !important;
}
.neg6 {
  position: relative;
  top: -5px !important;
}
.v-card {
  border: thin solid transparent !important;
  background: transparent !important;
}

.theme--light.v-card.v-card--outlined {
  border: thin solid transparent !important;
}

.small {
  font-size: 12px !important;
}

.curved {
  background: red;
  color: white;
  text-align: center;
}

.curved h1 {
  font-size: 6rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>

