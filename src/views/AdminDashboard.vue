<template>
  <div class="container-scroller">
    <DashboardNav />
    <div  class="container-fluid page-body-wrapper">
      <SideNav />
       <router-view class="landing" ></router-view>
     
    </div>
  </div>

</template>

<script>
import SideNav from '@/components/navs/SideNav.vue';
import DashboardNav from '@/components/navs/DashboardNav.vue';
export default {
  name: "AdminDashboard",
  components: {
    DashboardNav,
    SideNav,

  },
  data: () => ({
    red: "absolute"
  })
}
</script>

<style scoped>
.landing {
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll !important;
}

.landing::-webkit-scrollbar{
  widows: 13px;
  background: green;
}

.landing::-webkit-scrollbar-thumb{
  background: rgb(255, 255, 255);
  
}

</style>
