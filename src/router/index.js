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
  history: createWebHistory('/'),
  routes
})

export default router;
