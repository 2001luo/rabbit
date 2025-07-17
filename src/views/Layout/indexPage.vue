<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutHeaderSticky from './components/LayoutHeaderSticky.vue'
import { onMounted } from 'vue'
import { getCategoryAPI } from '@/apis/layout'
import { useCategoryStore } from '@/stores/counter'

const getCategory = async () => {
  const res = await getCategoryAPI()
  // console.log(res)
  const categoryStore = useCategoryStore()
  categoryStore.setCategory(res.result)
}
onMounted(() => {
  getCategory()
})
</script>

<template>
  <LayoutHeaderSticky />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>
