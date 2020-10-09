<template>
  <div>
    <div class="pl-2 pr-2 mt-6">
      <!-- Reminder -->
      <v-card flat color="#E3F2FD" class="pa-3">
        <b>
          <small
            class="rm-txt"
          >To ensure successful deliveries, please check your shipping address and contact. Keep your information updated.</small>
        </b>
      </v-card>
      <!-- address details -->
      <div class="address-info">
        <v-row class="pa-0">
          <v-col>
            <h3>Delivery Details</h3>
          </v-col>
          <v-col class="text-right">
            <h3 class="underline blue--text" @click="openSheet">Edit</h3>
          </v-col>
        </v-row>
        <v-row class="pa-2">
          <div class="pl-3 text-left">
            <small class="bold f-12">{{user.address}}</small>
            <br>
            <small class="neg6 sm-8 grey--text">ADDRESS</small>
          </div>
        </v-row>
        <v-divider class="mt-n2"/>
        <v-row class="pa-2">
          <div class="pl-3 text-left">
            <small class="bold f-12">{{user.mobileno}}</small>
            <br>
            <small class="neg6 sm-8 grey--text">MOBILE NUMBER</small>
          </div>
        </v-row>
      </div>
      <!-- cart items -->
      <H3>PACKAGE</H3>
      <div v-for="(item,i) in checkoutItems" :key="i">
        <div class="item-bg item-bg rounded-lg">
          <v-card flat class="pa-0">
            <v-row class="pa-0">
              <v-col cols="4">
                <img :src="`${item.img}`">
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
                  </v-row>
                  <v-row class="pa-0 ma-0">
                    <v-col class="pa-0">
                      <small
                        class="sm-8 bold error--text"
                      >&#8369; {{item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</small>
                    </v-col>
                  </v-row>
                  <v-row class="pa-0 ma-0">
                    <v-col class="pa-0">
                      <small class="sm-8 bold black--text">quantity: {{item.quantity}}</small>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </div>
        <v-divider v-if="i!=checkoutItems.length"/>
      </div>
      <!-- mode of payments -->
      <div class="pa-3">
        <v-row class="pa-0">
          <v-col cols="7">
            <h3>Mode of payment</h3>
          </v-col>
          <v-col class="text-right" cols="5">
            <h6 class="underline blue--text" @click="showComing">View all methods</h6>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 mx-1">
            <v-card class="pa-2 border-blue" color="rgb(204, 229, 255, 0.1)">
              <div class="mt-3">
                <v-icon color="info">mdi mdi-cash</v-icon>
                <span>
                  <b>
                    <small>Cash On Delivery</small>
                  </b>
                </span>
              </div>
              <div>
                <small>Pay when you receive</small>
              </div>
            </v-card>
          </v-col>
          <v-col class="pa-0 mx-1">
            <v-card class="pa-2" @click="showComing">
              <div class="mt-3">
                <v-icon color="info">mdi mdi-credit-card-multiple</v-icon>
                <span>
                  <b>
                    <small>Cash On Delivery</small>
                  </b>
                </span>
              </div>
              <div>
                <small>
                  tap to add card
                  <span>
                    <img :src="require('@/assets/mastercard.png')" class="master-card-img">
                  </span>
                </small>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <!-- Voucher code -->
      <!-- <div class="voucher pa-2">
        <v-form class="pa-0 ma-0" v-model="voucherForm">
          <v-text-field
            solo
            :rules="[rules.required]"
            placeholder="Enter Voucher Code"
            class="pa-0 ma-0"
            v-model="voucherCode"
            color="primary"
            append-icon="mdi-plus-circle-outline"
            :append-icon:click="applyVoucher"
          ></v-text-field>
        </v-form>
      </div>-->
      <!-- Checkout summary -->
      <div class="pa-2">
        <v-row>
          <v-col>
            <p>Sub Total</p>
          </v-col>
          <v-col class="text-right">
            <p>&#8369;{{checkoutAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>Delivery Fee</p>
          </v-col>
          <v-col class="text-right">
            <p>&#8369;0.00</p>
          </v-col>
        </v-row>
      </div>
      <!-- checkout footer -->
      <div class="mt-3">
        <v-card>
          <v-row class="text-center">
            <v-col>
              <h4
                class="mt-4"
              >&#8369;{{checkoutAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}</h4>
            </v-col>
            <v-col>
              <v-btn
                color="primary darken-3"
                @click="placeOrder"
                height="50"
                class="rounded-lg"
              >PLACE ORDER</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <br>
    </div>
    <!-- snackbars -->
    <v-snackbar v-model="snackbar" top>
      {{ snackbartext }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <div v-if="showM">
      <AlertModal
        :onError="onErrorM"
        :message="message"
        @btnConfirm="handleConfirm"
        :isAsking="isAsking"
      />
    </div>
    <v-overlay :value="isloading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- bottom sheet -->
    <div>
      <v-bottom-sheet v-model="sheet" persistent>
        <v-sheet class="text-center" height="60vh">
          <!-- <v-btn
            fab
            absolute
            right
            class="mt-6 mx-right"
            text
            color="red"
            @click="sheet = !sheet"
          >close</v-btn>-->
          <v-card flat class="pa-3">
            <div
              class="rm-txt"
            >Keeping your shipping information updated, ensures successful deliveries.</div>
          </v-card>
          <div class="pa-2 mt-6">
            <v-form class="pa-0 ma-0" v-model="sheetForm">
              <v-text-field
                solo
                :rules="[rules.required]"
                placeholder="Address"
                class="pa-0 ma-0"
                v-model="sheetAddress"
                color="primary"
              />
              <v-text-field
                solo
                :rules="[rules.required]"
                placeholder="Mobile Number"
                class="pa-0 ma-0"
                v-model="sheetMobile"
                color="primary"
                type="number"
              />
            </v-form>
            <v-row>
              <v-col>
                <v-btn text outlined @click="closeSheet" block color="red" large>Cancel</v-btn>
              </v-col>
              <v-col>
                <v-btn text outlined @click="updateShipping" block color="success" large>Save</v-btn>
              </v-col>
            </v-row>
          </div>
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>


<script>
import USERS from "@/services/users";
import CART from "@/services/cartService";
import AlertModal from "./alertModal.vue";
export default {
  name: "checkout",
  components: { AlertModal },
  data() {
    return {
      sheet: false,
      sheetForm: false,
      sheetAddress: "",
      sheetMobile: "",
      voucher: "None",
      voucherForm: false,
      voucherCode: "",
      isloading: false,
      checkoutAmount: 0,
      message: "default message.",
      showM: false,
      onErrorM: false,
      isAsking: false,
      snackbar: false,
      checkoutItems: [],
      snackbartext: "",
      hasPlaceOrder: false,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  beforeMount() {
    this.checkoutItems = JSON.parse(localStorage.getItem("checkout_details"));
  },
  mounted() {
    console.log("checkout mounted.", this.checkoutItems);
    console.log("checkout mounted. user ", this.user);
    let total = 0;
    this.checkoutItems.forEach(item => {
      if (item.isCheckout) {
        total += item.price * item.quantity;
      }
    });
    this.checkoutAmount = total;
    this.$forceUpdate();
  },
  methods: {
    updateShipping(e) {
      e.preventDefault();
      try {
        if (!this.sheetForm) {
          throw "Please check your input.";
        }
        this.isloading = true
        var updateUser = this.user;
        updateUser.mobileno = this.sheetMobile;
        updateUser.address = this.sheetAddress;
        USERS.updateUserMobileAddress(updateUser).then(result => {
          this.isloading = false
          if (result.error) {
            this.showM = true;
            this.onErrorM = true;
            this.isAsking = false;
            this.message = result.message;
            
          } else {
            this.$store.dispatch("onUpdateUser", updateUser).then(res => {
              console.log(res);
              this.closeSheet();
            });
          }
        });
      } catch (err) {
        console.log(err);
        this.snackbartext = err;
        this.snackbar = true;
        this.isloading = false
      }
    },
    closeSheet() {
      this.sheetAddress = "";
      this.sheetMobile = "";
      this.sheet = false;
    },
    openSheet() {
      this.sheetAddress = this.user.address;
      this.sheetMobile = this.user.mobileno;
      this.sheet = true;
    },
    showComing() {
      this.snackbartext = "This features is coming soon.";
      this.snackbar = true;
    },
    applyVoucher() {
      this.voucher = this.voucherCode;
    },
    placeOrder() {
      this.isloading = true;
      CART.placeOrder(this.user.userid).then(res => {
        console.log(res);
        if (res.error) {
          this.isloading = false;
          this.showM = true;
          this.onErrorM = res.error;
          this.message = res.message;
        } else {
          this.isloading = false;
          localStorage.setItem("checkout_details", null);
          this.showM = true;
          this.onErrorM = res.error;
          this.message = res.message;
          this.hasPlaceOrder = true;
        }
      });
    },
    handleConfirm() {
      console.log("handle yes...");
      this.showM = false;
      this.onErrorM = false;
      this.isAsking = false;
      if (this.hasPlaceOrder) {
        this.$router.push({ name: "basket" });
      }
    }
  }
};
</script>

<style scope>
img {
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
.sm-8 {
  font-size: 8px !important;
}
.f-12 {
  font-size: 14px !important;
}
.neg6 {
  position: relative;
  top: -5px !important;
  /* left: -6px !important; */
}
.border-blue {
  border: rgb(77, 148, 255) solid 2px !important;
}
.master-card-img {
  height: 12px !important;
  width: auto !important;
}
.rm-txt {
  color: #1976d2;
}
</style>