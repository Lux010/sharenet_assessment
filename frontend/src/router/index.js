import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from '../views/ContactView.vue'
import VenuesView from '../views/VenuesView.vue'
import BookingsView from '../views/BookingsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/contact', name: 'contact', component: ContactView },
    { path: '/venues', name: 'venues', component: VenuesView },
    { path: '/bookings', name: 'bookings', component: BookingsView },
  ],
})

export default router
