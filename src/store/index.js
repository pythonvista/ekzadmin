import Vue from 'vue';

import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    admin:"",
    isAdmin: false
  },
  getters: {},
  mutations: {
    SET_ACTIVE_ADMIN(state, payload) {
      localStorage.setItem('admin_id', JSON.stringify(payload));
      state.admin = payload;
    },
    SET_ADMIN_STATE(state, payload) {
      localStorage.setItem('admin_state', JSON.stringify(payload));
      state.isAdmin = payload;
    },
    
  },
  actions: {
    ActiveAdmin({ commit }, payload) {
      commit('SET_ACTIVE_ADMIN', payload);
    },
    AdminState({ commit }, payload) {
      commit('SET_ADMIN_STATE', payload);
    },
    
  },
  modules: {},
});
