import Vue from 'vue';

import VueRouter from 'vue-router';

import AdminLogin from '../views/AdminLogin';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    meta: { requiresGuest: true },
    component: AdminLogin,
   
    
  },
  {
    path: "/error 404",
    name: "NotFound",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
  },
  {
    path: "*",
    redirect: { name: "NotFound" },
  },
  {
    path: "/dashboard",
    meta: { requiresAuth: true },
    component: () =>
    import(/* webpackChunkName: "profile" */ '../views/AdminDashboard.vue'),
    children: [
      {
        path: '', 
        name: 'MainView',
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/components/Admin/index'),
      },
      {
        path: '/business', 
        name: 'AllBusiness',
        // meta: { requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/components/Admin/AllBusiness'),
      },
      {
        path: '/founder', 
        name: 'AllFounder',
        // meta: { requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/components/Admin/AllFounder'),
      },
      {
        path: '/sort-business', 
        name: 'SortBusiness',
        // meta: { requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "profile" */ '@/components/Admin/SortBusiness'),
      }

    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  let Admin = JSON.parse(localStorage.getItem('admin_id'));
  let AdminState = JSON.parse( localStorage.getItem('admin_state'));
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (Admin && AdminState) {
      next();
    } else {
      next({ path: "/", query: { redirect: to.fullPath } });
      
    }
  } else {
    next();
  }
  if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (!Admin && !AdminState) {
      next();
    } else {
      next({ path: "/dashboard", query: { redirect: to.fullPath } });
      
    }
  } else {
    next();
  }
});

export default router;
