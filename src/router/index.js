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
        { path: '/detail/:id', component: () => import('@/views/Detail/indexPage.vue') },
        { path: '/cartlist', component: () => import('@/views/CartList/indexPage.vue') },
        { path: 'checkout', component: () => import('@/views/Checkout/indexPage.vue') },
        { path: 'pay', component: () => import('@/views/Pay/indexPage.vue') },
        { path: 'paycallback', component: () => import('@/views/Pay/PayBack.vue') },
        { path: 'search', component: () => import('@/views/Search/IndexPage.vue') },
        {
          path: 'member',
          component: () => import('@/views/Member/indexPage.vue'),
          children: [
            {
              path: '',
              component: () => import('@/views/Member/components/UserInfo.vue'),
            },
            {
              path: 'order',
              component: () => import('@/views/Member/components/UserOrder.vue'),
            },
          ],
        },
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
