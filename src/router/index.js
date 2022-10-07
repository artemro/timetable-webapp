import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'timetable',
    component: () => import('../views/Timetable.vue'),
  },
  {
    path: '/init',
    name: 'init',
    component: () => import('../views/Init.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/timetable'),
  routes
})

export default router;
