import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/timetable',
    name: 'Timetable',
    component: () => import('../views/Timetable.vue')
  },
  {
    path: '/timetable/init',
    name: 'Init',
    component: () => import('../views/Init.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Init' && !localStorage.getItem('timetable-group-id')) 
    next({ name: 'Init' });
  else next();
})
export default router
