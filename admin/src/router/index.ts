import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import localCatch from '@/utils/cache';
import { firstPath } from '@/utils/map-menus';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    children: [
      {
        path: 'userInfo',
        name: 'userInfo',
        component: () => import('@/views/main/userInfo/index.vue'),
        meta: { title: '个人信息' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: () => import('@/views/404.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCatch.getCache('blog_token');
    if (!token) router.push({ path: '/login', query: { redirect: to.path } });
  }
  if (to.path === '/main') {
    if (firstPath) router.push(firstPath);
  }
  document.title = process.env.VUE_APP_BASE_TITLE! + `-${to.meta.title}`;
});

export default router;
