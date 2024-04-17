import { createRouter, createWebHistory } from 'vue-router'
import WorldView from '../views/WorldView.vue'

const routes = [
  {
    path: '/',
    name: 'world',
    component: WorldView
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
