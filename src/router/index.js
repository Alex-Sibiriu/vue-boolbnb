import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Error404 from '../pages/Error404.vue';
import Login from '../pages/Login.vue';
import HouseDetails from '../pages/HouseDetails.vue';
import Houses from '../pages/Houses.vue';

// importo middlewares
import auth from '../middlewares/auth.js';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/houses',
      name: 'houses',
      component: Houses
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: auth.guest,
    },
    {
      path: '/house-detail/:slug',
      name: 'houseDetails',
      component: HouseDetails,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'error404',
      component: Error404,
    }
  ]
})

export default router
