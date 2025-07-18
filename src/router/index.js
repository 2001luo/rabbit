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
        { path: 'category/:id', component: () => import('@/views/Category/indexPage.vue') },
        { path: 'category/sub/:id', component: () => import('@/views/SubCategory/indexPage.vue') },
      ],
    },
    {
      path: '/login',
      component: () => import('@/views/Login/indexPage.vue'),
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
    }
  },
})

export default router
