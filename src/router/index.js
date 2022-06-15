import { createWebHistory, createRouter } from 'vue-router'

import MainIndex from '../pages/MainIndex'

const routes = [
    {
        path: '/',
        name: 'main-index',
        component: MainIndex
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
