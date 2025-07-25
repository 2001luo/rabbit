import { useUserStore } from '@/stores/user'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 创建axios实例
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000,
})

// axios请求拦截器
http.interceptors.request.use(
  (config) => {
    const userStore = useUserStore
    // 2. 按照后端的要求拼接token数据
    const token = userStore.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e),
)

// axios响应式拦截器
http.interceptors.response.use(
  (res) => res.data,
  (e) => {
    ElMessage({
      type: 'warning',
      message: e.response.data.message,
    })
    if (e.response.status === 401) {
      const userStore = useUserStore
      userStore.clearUserInfo()
      router.push('/login')
    }
    return Promise.reject(e)
  },
)

export default http
