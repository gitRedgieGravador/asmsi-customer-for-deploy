
<template>
  <div>
    <div>
      <center>
        <h1 class="errortext">WARNING</h1>
        <p class="st404">401</p>
        <h1 class="pagenotfound">Page is Forbidden for {{role}}s</h1>
        <v-btn @click="$router.push({name:'login'})" id="gotologin" tile color="secondary darken-2">GO TO LOGIN</v-btn>
      </center>
    </div>
  </div>
</template>
<style scoped>
@media only screen and (max-width: 600px) {
  #gotologin {
    width: 100% !important;
  }
}
#gotologin {
  width: 35% !important;
}
</style>
<script>
export default {
  name: "ForbiddenPage",
  data() {
    return {
      //
    };
  },
  computed:{
      role(){
          return this.$store.getters.user.role
      }
  }
};
</script>
