import http from '@/utils/http'
import { useUserStore } from '@/stores/user'
// 获取详情接口
export const getCheckInfoAPI = () => {
  console.log('✅ getCheckInfoAPI 被调用了')
  const userStore = useUserStore()
  console.log('✅ token:', userStore.token)
  return http({
    url: '/member/order/pre',
  })
}

// 创建订单
export const createOrderAPI = (data) => {
  return http({
    url: '/member/order',
    method: 'POST',
    data,
  })
}
