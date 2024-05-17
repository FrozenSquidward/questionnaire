// router.js
import { createRouter, createWebHistory } from 'vue-router';

// 引入组件
import DdPage from '../views/DdPage.vue';
import ShowPage from '../views/ShowPage.vue';

// 定义路由
const routes = [
    { path: '/Dd', component: DdPage },
    { path: '/show', component: ShowPage },
];

// 创建router实例
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
