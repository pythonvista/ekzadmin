import 'material-design-icons-iconfont/dist/material-design-icons.css';

import Vue from 'vue';

import {
  getAuth,
  onAuthStateChanged,
} from '@/Auth/index';

import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import VueExcelXlsx from "vue-excel-xlsx";

Vue.use(VueExcelXlsx);
Vue.config.productionTip = false;
export const bus = new Vue();
export const nav = new Vue();

new Vue({
  router,
  store,
  vuetify,

  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.$store.dispatch('ActiveAdmin', user.uid)
        localStorage.setItem('admin_id', JSON.stringify(user.uid));
      }else{
        this.$store.dispatch('ActiveAdmin', "")
        this.store.dispatch('AdminState', false)
      }
     
    });
  },
  render: (h) => h(App)
}).$mount("#app");
