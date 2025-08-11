<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutHeaderSticky from './components/LayoutHeaderSticky.vue'
import { onMounted, provide, ref } from 'vue'
import { getCategoryAPI } from '@/apis/layout'
import { useCategoryStore } from '@/stores/counter'

const getCategory = async () => {
  const res = await getCategoryAPI()
  // console.log(res)
  const categoryStore = useCategoryStore()
  categoryStore.setCategory(res.result)
}
const searchValue = ref(null)
provide('searchValue', searchValue)
const updateValue = (value) => {
  searchValue.value = value
  console.log(searchValue.value)
}
onMounted(() => {
  getCategory()
})
</script>

<template>
  <LayoutHeaderSticky />
  <LayoutNav />
  <LayoutHeader @update-value="updateValue" />
  <RouterView :key="$route.fullPath" />
  <LayoutFooter />
</template>
