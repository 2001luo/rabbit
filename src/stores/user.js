// 管理用户数据相关
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    const token = ref('')
    // 2. 定义获取接口数据的action函数
    const setUserInfo = (res) => {
      userInfo.value = res
      token.value = res.token
    }
    const clearUserInfo = () => {
      userInfo.value = {}
      token.value = ''
    }
    // 3. 以对象的格式把state和action return
    return {
      userInfo,
      token,
      setUserInfo,
      clearUserInfo,
    }
  },
  {
    persist: true,
  },
)
