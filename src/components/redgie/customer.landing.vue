<template>
  <div class="landing-bg">
    <div v-if="!$vuetify.breakpoint.xs" class="centered">
      <v-card class="text-center pa-10">
        <h1>Implementation for larger screen is coming soon...</h1>
        <h4>Use your mobile phone</h4>
      </v-card>
    </div>
    <div v-else class="landing-bg">
      <v-card tile outlined class="pa-0 rounded-b-xl" color="light-blue lighten-1">
        <v-sheet color="light-blue lighten-1" class="mx-auto pt-2" max-width="100%">
          <!-- <v-slide-group v-model="selected"> -->
          <v-slide-group v-model="selected">
            <v-slide-item
              v-for="(cat,i) in categories"
              :key="i"
              v-slot:default="{ active, toggle }"
            >
              <v-btn
                class="mx-2"
                :input-value="active"
                active-class="purple white--text"
                depressed
                rounded
                x-small
                @click="toggle"
              >{{ cat.category }}</v-btn>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
        <v-text-field
          v-model="search"
          clearable
          color="white"
          class="pt-6 pl-3 pr-3"
          dense
          outlined
          rounded
          placeholder="Search"
        />
      </v-card>
      <v-container class="mb-0">
        <div v-if="products.length < 1">
          <v-card flat class="pa-10 text-center transparent">
            <h3>Nothing to display.</h3>
          </v-card>
        </div>
        <v-row class="mb-0" v-else>
          <v-flex
            v-for="(product,i) in products"
            :key="i"
            :xs3="!$vuetify.breakpoint.mobile"
            :xs6="$vuetify.breakpoint.mobile"
            class="pa-2 ma-0 x-fixed"
          >
            <v-card @click="routeToDetails(product)">
              <v-img
                :src="`${product.img}`"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="170px"
              >
                <v-card-text>
                  {{product.productname}}
                  <br>
                  {{product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}}
                </v-card-text>
              </v-img>
            </v-card>
          </v-flex>
        </v-row>
      </v-container>
    </div>
    <v-overlay :value="isloading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import API from "@/services/products";
export default {
  name: "lading",
  components: {},
  data() {
    return {
      search: "",
      isloading: true,
      showM: false,
      onErrorM: false,
      message: false,
      maxStock: 0,
      snackbar: false,
      selected: null,
      showdetails: false,
      addtocart: false,
      details: {},
      categories: [],
      products: [],
      quantity: 1
    };
  },
  methods: {
    routeToDetails(product) {
      localStorage.setItem("product_details", JSON.stringify(product));
      this.$router.push({ name: "product-details" });
    },
    getProducts() {
      API.getProducts().then(res => {
        this.isloading = false;
        if (!res.error) {
          this.products = res.body;
        } else {
          if (res.message.includes("forbidden")) {
            this.$router.push({ name: "login" });
          }
        }
      });
    }
  },
  computed: {
    searched() {
      return this.$store.getters.getSearch;
    },
    ismobile() {
      return this.$store.getters.ismobile;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  watch: {
    search: function(val) {
      if (val == null || val == undefined || val == "") {
        this.getProducts();
      } else {
        console.log(val);
        API.searchbychar(val).then(res => {
          console.log(res);
          this.products = res.body;
        });
      }
    },
    selected: function(val) {
      let searchval = this.categories[val].category;
      if (val == null || val == undefined || searchval.toUpperCase() == "ALL") {
        this.getProducts();
      } else {
        if (searchval.toUpperCase() != "ALL") {
          API.search(searchval).then(res => {
            this.products = res.body;
          });
        }
      }
    }
  },
  mounted() {
    this.isloading = true;
    API.getCategories().then(res => {
      if (res.error) {
        alert("please reload the page.");
      } else {
        let activeCategories = res.body.filter(item => item.isActive)
        this.categories = activeCategories;
        this.categories = Object.assign([
          {
            catid: 0,
            category: "All",
            isActive: true
          },
          ...this.categories
        ]);
      }
    });
    this.getProducts();
  }
};
</script>

<style scoped>
.centered {
  justify-content: center !important;
  flex-direction: column !important;
  align-items: center !important;
  display: flex !important;
  height: 90vh !important;
}
.lt-10 {
  position: relative;
  margin-left: 20px !important;
  color: white !important;
}
.text-subtitle-2 {
  font-size: 0.875rem !important;
  font-weight: 500 !important;
  line-height: 1.375rem !important;
  letter-spacing: 0.00714em !important;
}
.v-snack {
  margin-bottom: 100px !important;
}
.d-img {
  height: 200px;
  width: 200px;
}
.x-fixed {
  overflow-x: hidden;
}
img {
  width: 100% !important;
  height: 200px !important;
}
.landing-bg {
  background-color: #e3f2fd;
  height: 100vh !important;
}
</style>