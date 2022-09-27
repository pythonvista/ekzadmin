<template>
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
            <li class="nav-item">
                <v-btn exact text :to="{ path: '/dashboard' }" link class="nav-link">
                    <i class="icon-grid menu-icon"></i>
                    Dashboard
                </v-btn>
            </li>
            <li class="nav-item">
                 <v-btn exact text :to="{ name: 'AllBusiness' }" link class="nav-link">
                    <i class="icon-grid menu-icon"></i>
                   All Business
                </v-btn>

            </li>
            <li class="nav-item">
               <v-btn exact text :to="{ name: 'AllFounder' }" link class="nav-link">
                    <i class="icon-grid menu-icon"></i>
                    <span class="menu-title">All Founders</span>
                </v-btn>
            </li>
            <!-- <li class="nav-item ">
                <v-btn text :to="{ name: 'SortBusiness' }" link class="nav-link">
                    <i class="icon-grid menu-icon"></i>
                    <span class="menu-title text-p">Sort Business</span>
                </v-btn>
            </li> -->
        </ul>
    </nav>
</template>

<script>
export default {
    name: "SideNav"

}
</script>

<style>
</style>