<template>
  <div class="pa-2">
    <div v-if="!cartItems.length && !isloading" class="pt-3">
      <center>
        <img :src="require('@/assets/basket.png')" class="basket-img">
        <h4>Your basket is empty.</h4>
      </center>
    </div>
    <div v-else class="pl-2 pr-2 mt-6">
      <!-- cart items -->
      <div v-for="(item,i) in cartItems" :key="i">
        <!-- @panstart="dragStart($event)"  @panend="dragOver($event) dragging&&i==dragIndex?"-->

        <v-touch ref="touch" @panend="dragOver($event)" @panmove="panMove($event, i)">
          <div class="item-bg item-bg rounded-lg">
            <v-card flat class="pa-0" :style="i==dragIndex?`margin-left: ${dragVal}px`:``">
              <v-row class="pa-0">
                <v-col cols="4">
                  <img class="pro-img" :src="`${item.img}`">
                </v-col>
                <v-col cols="8">
                  <div class="text-left">
                    <v-row class="pa-0 ma-0">
                      <v-col cols="9" class="pa-0 mt-3">
                        <div class="bold">
                          <span class="pr-1">
                            <v-icon size="20" color="error">mdi mdi-wallet-giftcard</v-icon>
                          </span>
                          {{item.productname}}
                        </div>
                      </v-col>
                      <v-col cols="3" class="pa-0">
                        <span class="text-center">
                          <!-- <v-switch
                              inset
                              v-model="item.isCheckout"
                              class="pb-2 pa-0"
                              @click="addToCheckout(item)"
                              color="success"
                          />-->
                          <v-checkbox
                            v-model="item.isCheckout"
                            class="pb-2 pa-0"
                            @click.native="addToCheckout(item)"
                            color="success"
                            hide-details
                          ></v-checkbox>
                        </span>
                      </v-col>
                    </v-row>
                    <v-row class="pa-0 ma-0">
                      <v-col class="pa-0">
                        <small
                          class="sm-8 bold error--text"
                        >{{item.price}}</small>
                        <!-- .toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') -->
                      </v-col>
                      <v-col class="pa-0">
                        <div class="bottom-el">
                          <v-row class="pa-0 ma-0 text-center" v-if="item.isCheckout">
                            <v-col class="pa-0 ma-0 red rounded-xl">
                              <v-icon class="white--text" @click="minusQuantity(item)">mdi-minus</v-icon>
                            </v-col>
                            <v-col class="pa-0 ma-0">
                              <div class="pl-2 pr-2 mt-1">{{item.quantity}}</div>
                            </v-col>
                            <v-col class="pa-0 ma-0 success rounded-xl">
                              <v-icon class="white--text" @click="addQuantity(item)">mdi-plus</v-icon>
                            </v-col>
                          </v-row>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
                <div class="pa-3 item-bg-ondrag mx-auto" v-if="dragging&&i==dragIndex">
                  <v-row class="pa-0 pa-1">
                    <v-col class="pa-1 mt-1">
                      <v-icon
                        @click="deleteItem(item.id)"
                        size="25"
                        class="rounded-xl grey pa-1"
                        color="error darken-1"
                      >mdi mdi-delete</v-icon>
                    </v-col>
                    <v-col class="pa-1">
                      <v-icon
                        @click="gotoDetails(item)"
                        size="40"
                        class="rounded-xl pa-1 mtop"
                        color="grey"
                      >fa fa-info-circle</v-icon>
                    </v-col>
                  </v-row>
                </div>
              </v-row>
            </v-card>
          </div>
        </v-touch>

        <v-divider v-if="i!=cartItems.length"/>
      </div>
      <!-- checkout footer -->
      <div class="mt-3">
        <v-card>
          <v-row class="text-center">
            <v-col>
              <h4 class="mt-4">{{checkoutAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</h4>
            </v-col>
            <v-col>
              <v-btn @click="checkout" color="success" height="50" class="rounded-lg">Checkout</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <br>
    </div>
    <!-- snackbars -->
    <v-snackbar
      multi-line
      color="deep-purple accent-4"
      elevation="24"
      v-model="snackbar"
      :timeout="2000"
    >You reach the maximum stocks {{maxStock}}</v-snackbar>
    <div v-if="showM">
      <AlertModal
        :onError="onErrorM"
        :message="message"
        @btnYES="handleYES"
        @btnNO="closeModal"
        @btnConfirm="closeModal"
        :isAsking="isAsking"
      />
    </div>
    <v-overlay :value="isloading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>


<script>
import CART from "@/services/cartService";
import AlertModal from "./alertModal.vue";
export default {
  name: "basket",
  components: { AlertModal },
  data() {
    return {
      checkoutAmount: 0,
      message: "the quick brown fox jumsp over the lazy dog.",
      showM: false,
      isloading: true,
      onErrorM: false,
      isAsking: false,
      snackbar: false,
      maxStock: 1,
      quantity: 1,
      cartItems: [],
      dragging: false,
      dragVal: 0,
      dragIndex: null,
      todeleteId: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  mounted() {
    // this.$refs.touch.disable('swipe')panright, panup, pandown
    CART.getCart(this.user.userid).then(res => {
      this.isloading = false;
      if (!res.error) {
        this.cartItems = res.body;
        this.updateTotal();
      }
    });
  },
  watch: {},
  methods: {
    updateTotal() {
      let total = 0;
      this.cartItems.forEach(item => {
        if (item.isCheckout) {
          total += item.price * item.quantity;
        }
      });
      this.checkoutAmount = total;
      this.$forceUpdate();
    },
    gotoDetails(item) {
      this.dragging = false;
      this.dragIndex = null;
      this.dragVal = 0;
      localStorage.setItem("product_details", JSON.stringify(item));
      this.$router.push({ name: "product-details" });
    },
    deleteItem(id) {
      this.showM = true;
      this.onErrorM = false;
      this.isAsking = true;
      this.message = "Are you sure you want to remove this item?";
      this.todeleteId = id;
    },
    handleYES() {
      this.showM = false;
      this.onErrorM = false;
      this.isAsking = false;
      this.dragging = false;
      this.dragIndex = null;
      this.dragVal = 0;
      CART.removeItem(this.todeleteId).then(result => {
        if (result.error) {
          this.showM = true;
          this.onErrorM = true;
          this.isAsking = false;
          this.message = result.message;
        } else {
          this.showM = true;
          this.onErrorM = false;
          this.isAsking = false;
          this.message = result.message;
        }
      });
    },
    closeModal() {
      console.log("handle no");
      this.showM = false;
      this.onErrorM = false;
      this.isAsking = false;
      this.dragging = false;
      this.dragIndex = null;
      this.dragVal = 0;
    },
    panMove(event, index) {
      this.dragIndex = index;
      if (event.additionalEvent == "panleft") {
        console.log("pan: ", event);
        this.dragging = true;
        if (event.distance < 130) {
          this.dragVal = event.deltaX;
        } else {
          this.dragVal = -130;
        }
      } else {
        this.dragging = false;
        this.dragIndex = null;
        this.dragVal = 0;
      }
    },

    dragOver(event) {
      this.dragging = true;
      if (event.distance > 130) {
        this.dragging = true;
        this.dragVal = -130;
      } else {
        this.dragging = false;
        this.dragVal = 0;
        this.dragIndex = null;
      }
    },
    addQuantity(item) {
      if (item.quantity < item.stocks) {
        item.quantity++;
        console.log("adding: ", item.id, item.quantity);
        CART.updateQuan(item.id, item.quantity).then(res => {
          if (!res.error) {
            for (let i = 0; i < this.cartItems.length; ++i) {
              if (this.cartItems[i].productid == item.productid) {
                this.cartItems[i] = item;
                this.$forceUpdate();
                break;
              }
            }
          }
        });
      } else {
        this.maxStock = item.stocks;
        this.snackbar = true;
      }

      this.updateTotal();
    },
    minusQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        console.log("adding: ", item.id, item.quantity);
        CART.updateQuan(item.id, item.quantity).then(res => {
          if (!res.error) {
            for (let i = 0; i < this.cartItems.length; ++i) {
              if (this.cartItems[i].productid == item.productid) {
                this.cartItems[i] = item;
                this.$forceUpdate();
                break;
              }
            }
          }
        });
      }
      this.updateTotal();
    },
    addToCheckout(item) {
      CART.setCheckout(item.id, item.isCheckout).then(res => {
        if (res.error) {
          this.showM = true;
          this.onErrorM = true;
          this.message =
            "Opps! item was not checkouted. Please try again in few minutes.";
        }
      });
      // this.cartItems.forEach(each => {
      //   if (each.productid == item.productid) {
      //     each.isCheckout = !each.isCheckout;
      //     this.$forceUpdate();
      //   }
      // });
      this.updateTotal();
    },
    checkout() {
      let checkoutItems = this.cartItems.filter(item => item.isCheckout);
      if (checkoutItems.length > 0) {
        localStorage.setItem("checkout_details", JSON.stringify(checkoutItems));
        this.$router.push({ name: "checkout" });
      }
    }
  }
};
</script>

<style scope>

.pro-img {
  height: 100% !important;
  width: 100% !important;
} 
.item-bg-ondrag {
  position: absolute !important;
  right: -120px !important; /*64*/
  top: calc(calc(100% - 70px) / 2) !important;
}
.item-bg {
  background: #f5f5f5;
}
.mtop {
  margin-top: -3px !important;
}
.checkbox {
  position: absolute;
  right: 0;
  padding-right: 0;
}
.basket-img {
  width: 80% !important;
  height: auto !important;
}
</style>