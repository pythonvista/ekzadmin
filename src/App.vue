<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-snackbar :color="snackcolor" v-model="snackbar" :timeout="timeout">
      {{ snackmsg }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-navigation-drawer class="deep-yellow drawer accent-4 draw" dark v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 black--text">
            Admin Dashboard
          </v-list-item-title>

        </v-list-item-content>
      </v-list-item>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <div class="d-flex flex-row align-center">
            <v-icon left  color="black">{{ item.icon }}</v-icon>
            <v-btn color="black" exact :to="{ path: item.url }" text>
               {{item.title}}
            </v-btn>
          </div>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>

import { bus } from '@/main.js';
import { nav } from "@/main.js";
import { SideNav } from '@/components/navs/SideNav.vue'
export default {
  name: 'App',
  components: [
    SideNav

  ],
  data: () => ({
    snackbar: false,
    snackmsg: '',
    snackcolor: '',
    timeout: 2000,
    curuser: '',
    drawer: false,
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard', url: '/dashboard' },
      { title: 'All Business', icon: 'mdi-office-building-outline', url: 'business' },
      { title: 'All Founders', icon: 'mdi-account', url: 'founder' },
    ],
    //
  }),
  created() {
    bus.$on("snackbar", (event) => {
      this.snackcolor = event.color
      this.snackbar = true;
      this.snackmsg = event.msg

    });

    nav.$on("navigation", () => {
      this.drawer = true
    })
  },
  beforeMount() {
    let checkAdmin = JSON.parse(localStorage.getItem('admin_id'))
    this.curuser = checkAdmin
    if (this.curuser != null) {
      this.$store.dispatch('ActiveAdmin', this.curuser)
    }
  }
};
</script>

<style  scoped>
.drawer {
  background: white;
  z-index: 1111111111;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
}

.main {
  overflow-y: scroll !important;
  height: 100vh !important;
}

.main::-webkit-scrollbar {
  display: none;
}
</style>
