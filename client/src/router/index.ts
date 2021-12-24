import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue'),
    redirect: '/main/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/main/home/index.vue'),
        meta: {
          title: '首页',
          isShow: true
        }
      },
      {
        path: 'archive',
        name: 'archive',
        component: () => import('@/views/main/archive/index.vue'),
        meta: {
          title: '归档',
          isShow: true
        }
      },
      {
        path: 'details',
        name: 'details',
        component: () => import('@/views/main/post/index.vue'),
        meta: {
          title: '文章详情'
        }
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
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
