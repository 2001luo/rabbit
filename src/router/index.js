import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path 和 component 对应关系的位置
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/indexPage.vue'),
      children: [
        { path: '', component: () => import('@/views/Home/indexPage.vue') },
        { path: 'category', component: () => import('@/views/Category/indexPage.vue') },
      ],
    },
    {
      path: '/login',
      component: () => import('@/views/Login/indexPage.vue'),
    },
  ],
})

export default router
