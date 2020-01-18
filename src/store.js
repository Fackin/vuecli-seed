import Vue from 'vue';
import Vuex from 'vuex';
import { modules } from './schema';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: modules,
  state: {},
  mutations: {},
  actions: {}
});

export default store;
