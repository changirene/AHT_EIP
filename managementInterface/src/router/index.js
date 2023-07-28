import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
// import NewsView from '../views/NewsView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component:Login,
  },
  {
    path: "/news",
      name: "news",
      component: () => import("../views/NewsView.vue"),
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
