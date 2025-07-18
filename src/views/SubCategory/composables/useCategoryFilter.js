import { getCategoryFilterAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export function useCategoryFilter() {
  const route = useRoute()
  const categoryData = ref([])
  const getCategoryData = async (id) => {
    const res = await getCategoryFilterAPI(id)
    categoryData.value = res.result
  }

  onMounted(() => {
    getCategoryData(route.params.id)
  })
  onBeforeRouteUpdate((to) => {
    getCategoryData(to.params.id)
  })

  return { categoryData }
}
