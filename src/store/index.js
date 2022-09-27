import Vue from 'vue';

import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    admin:"",
    isAdmin: false,
    qualifications: ["PhD", "Master", "Bachelor", "OND", "HND", "NCE", "SSCE", "None", "Others"],
    employees: ["0-10 employees", "11-20 employees", "21-30 employees", "31-50 employees", "Above 50"],
    annualRevenue: ["Below N100,000", "N100,000 - N500,000", "N501,000 - N1 Million", "N1 Million - N5 Million", "N5 Million - N10 Million"],
    averageRevenue: ["Below N50,000", "N50,000 - N100,000", "N101,000 - N500,000", "N501,000 - N1 Million", "N1 Million - N5 Million", "N5 Million and above"],
    sectors: [
      "Agriculture",
      "Aviation",
      "Commercial/Retail",
      "Constructuion",
      "Education and Training",
      "Energy and Power Generation",
      "FMCG",
      "Fashion",
      "FInancial Services",
      "Logistics",
      "Healthcare",
      "ICT",
      "Manufacturing",
      "Media and Entertainment",
      "Oil & Gas",
      "Professional Services",
      "Telecommunication",
      "Tourism/Hospitality",
      "Transporation",
      "Waste Management",
      "Others"
    ],
    lgas: [
      "Ado-Ekiti",
      "Efon",
      "Ekiti-East",
      "Ekiti-South-West",
      "Ekiti-West",
      "Emure",
      "Gbonyin",
      "Ido-Osi",
      "Ijero",
      "Ikere",
      "Ikole",
      "Ilejemeje",
      "Irepodun-Ifelodun",
      "Ise-Orun",
      "Moba",
      "Oye",
    ],
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
