<template>
  <div>
    <br>
    <br>
    <center>
      <img :src="`` + getUser.image" id="sbpp">
      <h5>{{getUser.firstname}} {{getUser.lastname}}</h5>
    </center>

    <v-list rounded class="pt-3">
      <v-divider class="pb-3"/>
      <v-list-item-group v-model="item" color="deep-purple">
        <v-list-item v-for="(item, i) in items" :key="i" @click="navto(item.route)">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>
<style scoped>
.theme--light.v-card.v-card--outlined {
  border: thin solid transparent !important;
}
#sbpp {
  height: 100px !important;
  width: 100px !important;
  border: 1px solid black;
}
</style>

<script>
export default {
  name: "sidebar",
  data() {
    return {
      open: false,
      item: 0,
      items: [
        { text: "DASHBOARD", icon: "mdi mdi-view-dashboard", route: "admin" },
        { text: "PRODUCTS", icon: "mdi mdi-dropbox", route: "productTable" },
        { text: "USERS", icon: "mdi mdi-account-multiple", route: "usertable" },
        { text: "REPORTS", icon: "mdi mdi-chart-bar", route: "coming" },
        { text: "LOGOUT", icon: "fa fa-sign-out", route: "login" }
      ]
    };
  },
  watch: {
    openSB: function() {
      this.open = this.openSB;
    },
    open: function() {
      if (!this.open) {
        this.$store.dispatch("setSB", false);
      }
    },
    getUser: function() {}
  },
  computed: {
    getUser() {
      return this.$store.getters.user;
    },

    openSB: {
      get: function() {
        return this.$store.getters.showSB;
      },
      set: function() {}
    }
  },
  mounted() {
    this.openSB = this.open;
  },
  methods: {
    btnClose() {
      this.$store.dispatch("setSB", false);
    },
    navto(rname) {
      if (this.$route.name != rname) {
        this.$router.push({ name: rname });
      }
    },
    logout() {
      this.$store.dispatch("logout").then(resp => {
        if (resp) {
          this.$router.push({ name: "login" });
        }
      });
    }
  }
};

/* 
get: function() {
return this.$store.getters.showSB;
},
set: function() {
}
*/
</script>

