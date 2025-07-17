import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])

  const setCategory = (res) => {
    categoryList.value = res
  }
  return {
    categoryList,
    setCategory,
  }
})
