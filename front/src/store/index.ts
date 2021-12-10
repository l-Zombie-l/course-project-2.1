import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const instance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_HOST,
});

instance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.token}`;

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
      const { data } = await axios.post('http://localhost:4100/login', params);
      const token = data.success ? data.token : "";
      commit("setToken", token);
      return data;
    },

    async logout({ state, commit, rootState }) {
      const { data } = await instance.get('http://localhost:4100/user/logout');
      commit("setToken", "");
      return data;
    },

    async update({ state }, params) {
      const { data } = await instance.put('http://localhost:4100/user/update', params);
      return data;
    },

    async updateNews({ state }, params) {
      const { data } = await instance.put('http://localhost:4100/user/update_news', params);
      return data;
    },

    async addNews({ state }, params) {
      const { data } = await instance.post('http://localhost:4100/user/add_news', params);
      return data;
    },

    async me({ state }, params) {
      const { data } = await instance.get('http://localhost:4100/me', params);
      return data;
    },
  },
  modules: {},
});
