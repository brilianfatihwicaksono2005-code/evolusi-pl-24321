import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Tasks from './views/Tasks.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/tasks', name: 'Tasks', component: Tasks }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
