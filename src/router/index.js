import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/timetable',
    name: 'timetable',
    component: () => import('../views/Timetable.vue'),
  },
  {
    path: '/timetable/init',
    name: 'init',
    component: () => import('../views/Init.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router;
