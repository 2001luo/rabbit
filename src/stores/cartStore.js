import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.token)
    //1.定义state - cartList
    const cartList = ref([])
    //2.定义action - addCart
    const addCart = async (goods) => {
      const { skuId, count } = goods
      if (isLogin.value) {
        // 登录之后的加入购车逻辑
        await insertCartAPI({ skuId, count })
        const res = await findNewCartListAPI()
        cartList.value = res.result
      } else {
        // 添加购物车操作
        // 已添加过 - count + 1
        // 没有添加过 - 直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          // 找到了
          item.count++
        } else {
          // 没找到
          cartList.value.push(goods)
        }
      }
    }
    const delCart = async (skuId) => {
      if (isLogin.value) {
        await delCartAPI([skuId])
        const res = await findNewCartListAPI()
        cartList.value = res.result
      } else {
        cartList.value = cartList.value.filter((item) => skuId !== item.skuId)
      }
    }
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    // 单选功能
    const singleCheck = (skuId, selected) => {
      // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }
    const allCheck = (selected) => {
      // 把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item) => (item.selected = selected))
    }
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    // 3. 已选择数量
    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0),
    )
    // 4. 已选择商品价钱合计
    const selectedPrice = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0),
    )

    //清除购物车
    const clearCart = () => {
      cartList.value = []
    }

    const updateNewList = async () => {
      const res = await findNewCartListAPI()
      cartList.value = res.result
    }
    return {
      cartList,
      allCount,
      allPrice,
      isAll,
      selectedCount,
      selectedPrice,
      addCart,
      delCart,
      singleCheck,
      allCheck,
      clearCart,
      updateNewList,
    }
  },
  {
    persist: true,
  },
)
