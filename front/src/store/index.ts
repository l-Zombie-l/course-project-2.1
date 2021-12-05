import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const instance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_HOST,
});

instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.token}`;

export default new Vuex.Store({
  state: {
    token: localStorage.token,
  },

  mutations: {
    setToken(state, value) {
      localStorage.token = value;
      instance.defaults.headers.common["Authorization"] = `Bearer ${value}`;
    },
  },
  actions: {
    async login({ state, commit, rootState }, params) {
      const { data } = await instance.post("/login", params);
      const token = data.success ? data.token : "";
      commit("setToken", token);
      return data;
    },  
  },
  modules: {},
});
