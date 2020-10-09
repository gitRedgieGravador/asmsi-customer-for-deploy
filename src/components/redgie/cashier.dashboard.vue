<template>
  <div>
    <v-row>
      <!-- <img v-if="animate" src="@/assets/delivery.gif" class="img"> -->
      <v-col cols="9">
        <div v-if="true">
          <v-card id="printme" class="ml-50 mt-0 mb-0 pr-3 pl-3 pb-2" outlined max-width="50%">
            <center>
              <br>
              <h5>LLC General Merchandise</h5>
              <h6>ML Quezon National Highway</h6>
              <h6>Contact us @mobile: 09971920548</h6>
              <h6>Contact us @email: llcgeneralmerchandise@gmail.com</h6>
              <br>  
              <br>
            </center>
            <v-row class="ml-2 ma-0">
              <v-col>
                <h5>Order Number: 00000001</h5>
              </v-col>
              <v-col class="text-right mr-8">
                <h5>Date: {{new Date().toLocaleString().split(",")[0]}}</h5>
              </v-col>
            </v-row>
            <v-row class="ml-2 ma-0">
              <v-col>
                <h5>Customer: Redgie Gravador</h5>
              </v-col>
              <v-col class="text-right mr-8">
                <h5>Time: {{new Date().toLocaleString().split(",")[1]}}</h5>
              </v-col>
            </v-row>

            <!-- Header -->
            <hr>
            <v-row>
              <v-col class="ml-2">
                <p>Particular</p>
              </v-col>
              <v-col>Price</v-col>
              <v-col class="text-right">Quantity</v-col>
              <v-col class="text-center">Total</v-col>
            </v-row>
            <hr>
            <!-- order list -->
            <div v-for="i in 5" :key="i">
              <v-row>
                <v-col class="ml-2">Particular</v-col>
                <v-col>Price</v-col>
                <v-col class="text-right">Quantity</v-col>
                <v-col class="text-center">Total</v-col>
              </v-row>
            </div>
          </v-card>
          <v-btn class="pl-3 pr-3" @click="printNow" block>print</v-btn>
        </div>
      </v-col>

      <v-col cols="3">
        <img v-if="animate" src="@/assets/delivery.gif" class="img">
        <!-- <img v-if="animate" src="@/assets/gift.png" class="gift hd_img"> -->
        <div v-for="(each, i) in orderList" :key="i" class="pa-1">
          <div :class="animate && i != 0?'animate':''" v-if="i < 5">
            <v-card
              @click="i == 0?picked(each.orderid):''"
              :class="i == 0?'cursor up':''"
              :color="(i+ii)%2==0?'#66b5ff':'#ff4d4d'"
              class="pr-2"
              max-height="120"
            >
              <v-row>
                <v-col cols="4" class="mt-2">
                  <img src="@/assets/gift.png" class="gift">
                </v-col>
                <v-col>
                  <v-card color="#ffe6ff" outlined height="100%">
                    <v-row class="ml-3 mt-2">
                      <h5>Order #: {{each.orderid}}</h5>
                      <h5>Date: {{each.date.split(',')[0]}}</h5>
                      <h5>Time: {{each.date.split(',')[1]}}</h5>
                      <h5>Total: {{each.total}}</h5>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<style scoped>
.img {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  float: left;
  height: 40px;
  width: 40px;
  position: relative;
  animation-name: img;
  animation-duration: 1.5s;
  /* -webkit-animation-timing-function: linear;
  animation-timing-function: linear; */
}

@keyframes img {
  0% {
    left: -200px;
  }
  10% {
    left: -325px;
  }
  25% {
    left: -350px;
  }
  30% {
    left: -375px;
  }
  40% {
    left: -400px;
  }
  50% {
    left: -425px;
  }
  70% {
    left: -450px;
  }
  75% {
    left: -475px;
  }
  100% {
    left: -500px;
  }
}
.ml-50 {
  margin-left: 25%;
}
.animate {
  position: relative;
  animation-name: animate;
  animation-duration: 1.5s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}

@keyframes animate {
  25% {
    top: -20px;
  }
  50% {
    top: -50px;
  }
  75% {
    top: -75px;
  }
  100% {
    top: -100px;
  }
}
.gift {
  height: 10px !important;
}

.hd_img {
  float: right;
  position: relative;
  animation-name: hd_img;
  animation-duration: 1.5s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}

@keyframes hd_img {
  0% {
    left: -300px;
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(-90deg);
  }
  25% {
    left: -350px;
    transform: rotate(-180deg);
  }
  30% {
    transform: rotate(-270deg);
  }
  40% {
    transform: rotate(-360deg);
  }
  50% {
    left: -400px;
    transform: rotate(-450deg);
  }
  70% {
    transform: rotate(-540deg);
  }
  75% {
    left: -450px;
    transform: rotate(-630deg);
  }
  100% {
    left: -500px;
    transform: rotate(-720deg);
  }
}
.rest {
  position: fixed !important;
  bottom: 0px !important;
}
.up {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22) !important;
}
</style>

<script>
export default {
  name: "cashier.dashboard",
  data() {
    return {
      serving: false,
      ii: 0,
      printOR: null,
      animate: false,
      orderList: [
        { orderid: "00000001", date: new Date().toLocaleString(), total: 1500 },
        { orderid: "00000002", date: new Date().toLocaleString(), total: 2500 },
        { orderid: "00000003", date: new Date().toLocaleString(), total: 3500 },
        { orderid: "00000004", date: new Date().toLocaleString(), total: 4500 },
        { orderid: "00000005", date: new Date().toLocaleString(), total: 5500 },
        { orderid: "00000006", date: new Date().toLocaleString(), total: 6500 },
        { orderid: "00000007", date: new Date().toLocaleString(), total: 7500 },
        { orderid: "00000008", date: new Date().toLocaleString(), total: 8500 },
        { orderid: "00000009", date: new Date().toLocaleString(), total: 9500 }
      ]
    };
  },
  mounted() {
    console.log("when component is mounted!");
    window.addEventListener("afterprint", this.handleAfter);
  },
  methods: {
    async picked(id) {
      this.animate = true;
      await setTimeout(() => {
        this.animate = false;
        this.serving = true;
        this.ii += 1;
        this.orderList = this.orderList.filter(item => {
          return item.orderid != id;
        });
      }, 1500);
    },
    handleAfter() {
      document.body.innerHTML = this.printOR;
    },
    printNow() {
      this.printOR = document.body.innerHTML;
      document.body.innerHTML = document.getElementById("printme").innerHTML;
      this.$nextTick(() => {
        window.print();
      });
    }
  }
};
</script>
