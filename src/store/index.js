import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import service from "../services/auth";
import axios from "axios";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");
export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || null,
    user: localStorage.getItem("token") ?
      JSON.parse(window.atob(localStorage.getItem("token").split(".")[1]))
        .user :
      {},
    showSB: false,
    id: localStorage.getItem("id") || null,
    search: "",
    mobile: window.innerWidth < 700 ? true : false,
    showit: localStorage.getItem("showit") || false,
    login_role: localStorage.getItem("login_role") || "guest",
    header: localStorage.getItem("header") || "",
    isloading: false
  },
  getters: {
    ismobile(state) {
      return state.mobile;
    },
    isloading(state) {
      return state.isloading;
    },
    isLogin(state) {
      return state.token != null;
    },
    user(state) {
      return state.user;
    },
    showSB(state) {
      return state.showSB;
    },
    GetId(state) {
      return state.id;
    },
    getSearch(state) {
      return state.search;
    },
    showit(state) {
      return state.showit;
    },
    header(state) {
      return state.header;
    },
    login_role(state) {
      return state.login_role
    }
  },
  mutations: {
    SET_SHOWIT(state, showit) {
      state.showit = showit;
    },
    SET_ISLOADING(state, bool) {
      state.isloading = bool;
    },
    SET_HEADER(state, header) {
      state.header = header;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_SEARCH(state, search) {
      state.search = search;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.token = null;
      state.user = {};
    },
    SET_SB(state, bool) {
      state.showSB = bool;
      console.log("Setting SB...", state.showSB)
    },
    SET_ID(state, id) {
      state.id = id;
    },
    SET_LOGINROLE(state, role) {
      state.login_role = role;
    }
  },
  actions: {
    SET_SHOWIT({
      commit
    }, showit) {
      commit("SET_SHOWIT", showit);
    },
    SET_ISLOADING({
      commit
    }, bool) {
      commit("SET_ISLOADING", bool);
    },
    SET_HEADER({
      commit
    }, showit) {
      commit("SET_HEADER", showit);
    },
    SET_SEARCH({
      commit
    }, search) {
      commit("SET_SEARCH", search);
    },
    setSB({
      commit
    }, bool) {
      console.log("Setting SB...")
      commit("SET_SB", bool);
    },
    SET_ID({
      commit
    }, id) {
      return new Promise(resolve => {
        commit("SET_ID", id);
        localStorage.setItem("id", id);
        resolve(true);
      });
    },
    login({
      commit
    }, user) {
      return new Promise((resolve, reject) => {
        service
          .login(user)
          .then(result => {
            if (result.error) {
              reject(result);
            } else {
              localStorage.setItem("login_role", result.body.user.role)

              commit("SET_LOGINROLE", result.body.user.role);
              commit("SET_TOKEN", result.body.token);
              var resUser = JSON.parse(window.atob(result.body.token.split(".")[1])).user;
              commit("SET_USER", resUser);
              axios.defaults.headers.common["Authorization"] =
                result.body.token;
              localStorage.setItem("token", result.body.token);
              resolve(result);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    onUpdateUser({ commit }, user) {
      commit("SET_USER", user);
      return new Promise((resolve) => {
        resolve(true)
      })

    },
    confirm({
      commit
    }, body) {
      return new Promise((resolve, reject) => {
        service
          .verifyCode(body)
          .then(result => {
            if (result.error) {
              reject(result);
            } else {
              localStorage.setItem("login_role", result.body.user.role)

              commit("SET_LOGINROLE", result.body.user.role);
              commit("SET_TOKEN", result.body.token);
              var resUser = JSON.parse(window.atob(result.body.token.split(".")[1])).user;
              commit("SET_USER", resUser);
              axios.defaults.headers.common["Authorization"] =
                result.body.token;
              localStorage.setItem("token", result.body.token);
              axios.defaults.headers.common["Authorization"] =
                result.body.token;
              localStorage.setItem("token", result.body.token);
              //axios.defaults.timeout.common = 1000
              resolve(result);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    logout({
      commit
    }) {
      return new Promise(resolve => {
        commit("LOGOUT");
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        localStorage.removeItem("login_role");
        resolve(true);
      });
      //delete axios.defaults.timeout.common
    }
  }
});