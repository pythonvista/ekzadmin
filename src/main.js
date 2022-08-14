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

Vue.config.productionTip = false;
export const bus = new Vue();

new Vue({
  router,
  store,
  vuetify,

  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem('admin_id', JSON.stringify(user.uid));
      }
     
    });
  },
  render: (h) => h(App)
}).$mount("#app");
