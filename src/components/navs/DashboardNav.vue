<template>
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a class="navbar-brand brand-logo mr-5" ><img src="images/logo.png" class="mr-2"
                    alt="logo" /></a>
            <a class="navbar-brand brand-logo-mini" ><img src="images/logo.png" alt="logo" /></a>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            
            <ul class="navbar-nav mr-lg-2">
            </ul>
            <ul class="navbar-nav navbar-nav-right">
                <li class="nav-item nav-profile dropdown">
                    <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                        <img src="images/faces/face28.jpg" alt="profile" />
                    </a>
                    <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                        <a @click="signOut" class="dropdown-item">
                            <i class="ti-power-off text-primary"></i>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
            <v-btn @click="openNav" class="mobile-menu" small text fab ><v-icon color="black">mdi-menu</v-icon></v-btn>
        </div>
    </nav>
</template>

<script>
import { logOut } from '@/Auth/index';
import { nav } from "@/main.js";
export default {
    name: "DashboardNav",
    methods:{
      async  signOut() {
            await logOut()
            localStorage.removeItem('admin_id')
            localStorage.removeItem('admin_state')
            this.$router.go({ name: "Login" })
        },
        openNav() {
            nav.$emit("navigation");

        },
    }

}
</script>

<style scoped>
    .navbar{
        z-index: 111 !important;
    }

    .mobile-menu{
        display: none;
    }

    @media (max-width:900px) {

        .mobile-menu{
        display: block;
    }
       
    }
</style>