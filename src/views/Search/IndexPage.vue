<script setup>
import { inject, onMounted, ref, watch } from 'vue'
import GoodsItem from '../Home/components/GoodsItem.vue'
import { getSearchListAPI } from '@/apis/search'
const searchList = ref('')
const getSearchList = async (search) => {
  const res = await getSearchListAPI(search)
  searchList.value = res.result
}
const search = inject('searchValue')
watch(
  () => search.value,
  (newVal) => {
    getSearchList(newVal)
  },
)
onMounted(() => {
  getSearchList(search)
})
</script>
<template>
  <div class="body">
    <GoodsItem v-for="good in searchList" :good="good" :key="good.id" />
  </div>
</template>
