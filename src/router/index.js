import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'timetable',
    component: () => import('../views/Timetable.vue')
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

router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.name === 'timetable' && !localStorage.getItem('timetable-group-id') && localStorage.getItem('timetable-group-id') != "-1")
    next({ name: 'init' });
  else next();
})
export default router;
