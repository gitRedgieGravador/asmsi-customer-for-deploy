<template>
  <div>
    <v-btn @click="$router.push({name:'account'})" class="mt-4" large text color="info">
      <v-icon size="45" class="pa-0">mdi mdi-chevron-left</v-icon>
      <span class="ml-n4">Back</span>
    </v-btn>
    <div class="pt-4">
      <template>
        <v-row justify="center" class="pl-5 pr-5">
          <h2>TRANSACTION HISTORY</h2>
          <br>
          <br>
          <br>
          <div v-if="history.length < 1">
            <v-card flat class="pa-10 text-center transparent">
              <h3>No Complete Transaction yet.</h3>
            </v-card>
          </div>
          <v-expansion-panels v-else flat focusable>
            <v-expansion-panel v-for="(item,i) in history" :key="i">
              <v-expansion-panel-header>{{new Date(item.date).toLocaleDateString("en-US",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</v-expansion-panel-header>
              <v-expansion-panel-content>some details here...</v-expansion-panel-content>
              <div v-if="i < history.length - 1">
                <v-divider/>
              </div>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "TransactionHistory",
  data() {
    return {
      history: []
    };
  },
  mounted() {}
};
</script>
<style scoped>
.gif {
  width: 200px;
  height: auto;
}
</style>
