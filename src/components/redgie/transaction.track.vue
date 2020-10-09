<template>
  <div class="x-hidden">
    <v-btn @click="$router.push({name:'account'})" class="mt-4" large text color="info">
      <v-icon size="45" class="pa-0">mdi mdi-chevron-left</v-icon>
      <span class="ml-n4">Back</span>
    </v-btn>
    <div v-if="packages.length < 1">
      <v-card flat class="pa-10 text-center transparent">
        <h3>No Pending Transaction.</h3>
      </v-card>
    </div>
    <div v-else>
      <div v-for="(pack, i) in packages" :key="i">
        <div class="center-90">
          <img class="gif" :src="assets[pack.traceStatus].src" alt srcset>
          <br>
          <h2>{{assets[pack.traceStatus].title}}</h2>

          <div>
            <h6>Ordered Date: {{new Date(pack.dbcreated).toLocaleString()}}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import USERS from "@/services/users";
export default {
  name: "TransactionTracking",
  data() {
    return {
      assets: [
        { src: require("@/assets/queue.jpg"), title: "ON QUEUE" },
        {
          src: require("@/assets/prepared.jpg"),
          title: "ON PREPARATION"
        },
        { src: require("@/assets/delivery.gif"), title: "ON DELIVERY" }
      ],
      index: 0,
      packages: [{ date: new Date().toLocaleString(), traceStatus: 1 }]
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  mounted() {
    this.index = 1;
    // USERS.getTransactionTrack(this.user.userid).then(res => {
    //   if (!res.error) {
    //     this.packages = res.body;
    //   } else {
    //     console.log(res);
    //   }
    // });
  }
};
</script>
<style scoped>
.gif {
  width: 200px;
  height: auto;
}
</style>
