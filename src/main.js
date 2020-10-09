import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "./plugins/axios";
import underscore from "underscore";
import '@mdi/font/css/materialdesignicons.css'
import VueTouch from 'vue-touch';
/* eslint-disable */
Vue.config.productionTip = false;

VueTouch.config.pan = {
    direction: 'horizontal'
}
Vue.use(VueTouch);
Vue.prototype.$_ = underscore
// Vue.prototype.$axios = axios
Vue.prototype.$imgbase = process.env.IMG_BASE || "http://localhost:3232/static";
Vue.prototype.$tomoney = function (val) {
    return val.replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

new Vue({
    underscore,
    axios,
    router,
    store,
    vuetify,
    // VueTelInputVuetify,
    render: h => h(App)
}).$mount("#app");