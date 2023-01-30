import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/timetable',
    name: 'timetable',
    component: () => import('../views/Timetable.vue'),
    meta: { requiresGroupSelection: true }
  },
  {
    path: '/timetable/init',
    name: 'init',
    component: () => import('../views/Init.vue')
  },
  {
    path: '/timetable/event/:eventId',
    name: 'Event',
    component: () => import('../views/Event.vue')
  },
  {
    path: '/timetable/lecturer/:lecturerId',
    name: 'Lecturer',
    component: () => import('../views/Lecturer.vue')
  },
  {
    path: '/timetable/room/:roomId',
    name: 'Room',
    component: () => import('../views/Room.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to)
  if (
    to.meta.requiresGroupSelection && (
      localStorage.getItem('timetable-group-id') === null ||
      localStorage.getItem('timetable-group-id') === undefined ||
      localStorage.getItem('timetable-group-id') === "-1")
    )
    next({ name: 'init' });
  else next();
})

export default router;
