<template>
  <div class="container-scroller">
    <DashboardNav />
    <div class="container-fluid page-body-wrapper">
      <SideNav />
      <router-view :currAdmin="adminData"  :allBusiness="allBusiness" :allFounders="allFounders" class="landing"></router-view>

    </div>
  </div>

</template>

<script>
import SideNav from '@/components/navs/SideNav.vue';
import DashboardNav from '@/components/navs/DashboardNav.vue';
import { selectedUser, onSnapshot, alluser } from '@/Auth/index';
import { mapState } from 'vuex';
export default {
  name: "AdminDashboard",
  components: {
    DashboardNav,
    SideNav,

  },
  computed: {
    ...mapState(['admin']),

  },
  data: () => ({
    adminData: {},
    allBusiness: [],
    allFounders: []

  }),
  created() {
    this.getAdmin()
    this.getBusiness()
    this.getFounders()
  },
  methods: {
    getAdmin() {
      onSnapshot(selectedUser("Admin", this.admin), (doc) => {
        this.adminData = doc.data()
      })
    },
    
    getBusiness() {
      onSnapshot(alluser("business"), (snapshot) => {
        this.allBusiness = []
        snapshot.forEach((doc) => {
          this.allBusiness.push({ ...doc.data(), id: doc.id });
        });
      })
    },
    getFounders() {
      onSnapshot(alluser("founderInfo"), (snapshot) => {
        this.allFounders = []
        snapshot.forEach((doc) => {
          this.allFounders.push({ ...doc.data(), id: doc.id });
        });
      })
    },

  }
}
</script>

<style scoped>
.landing {
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll !important;
}

.landing::-webkit-scrollbar {
  widows: 13px;
  background: green;
}

.landing::-webkit-scrollbar-thumb {
  background: rgb(255, 255, 255);

}
</style>
