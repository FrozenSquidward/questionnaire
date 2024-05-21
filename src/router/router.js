// router.js
import { createRouter, createWebHistory } from 'vue-router';

// 引入组件
import DdPage from '../views/DdPage.vue';
import ShowPage from '../views/ShowPage.vue';
// import ListPage from '../views/ListPage.vue';

// 定义路由
const routes = [
    { path: '/', redirect: '/list', name:'index' },
    { path: '/mang', redirect: '/list', name:'mang' },
    { path: '/dd', component: DdPage , name:'dd' },
    { path: '/show', component: ShowPage, name:'show'  },
    { path: '/list', component: () => import('../views/ListPage.vue'), name:'list' }
];

// 创建router实例
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
