import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/timetable',
        name: 'timetable',
        component: () => import('../views/TimetableView.vue'),
        meta: { requiresGroupSelection: true },
    },
    {
        path: '/timetable/init',
        name: 'init',
        component: () => import('../views/InitView.vue'),
    },
    {
        path: '/timetable/event/:eventId',
        name: 'Event',
        component: () => import('../views/EventView.vue'),
    },
    {
        path: '/timetable/lecturer/:lecturerId',
        name: 'Lecturer',
        component: () => import('../views/LecturerView.vue'),
    },
    {
        path: '/timetable/room/:roomId',
        name: 'Room',
        component: () => import('../views/RoomView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from) => {
    // Log to marketing API
    fetch(`${process.env.VUE_APP_API_MARKETING}/action`, {
        method: 'POST',
        cache: 'no-cache',
        redirect: 'follow',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: localStorage.getItem('marketing-id'),
            action: 'route to',
            path_from: from.fullPath || null,
            path_to: to.fullPath || null,
        }),
    }).catch();

    if (
        to.meta.requiresGroupSelection &&
        (localStorage.getItem('timetable-group-id') === null ||
            localStorage.getItem('timetable-group-id') === undefined ||
            localStorage.getItem('timetable-group-id') === '-1')
    )
        return { name: 'init' };
});

export default router;
