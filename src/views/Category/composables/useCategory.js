import { ref, onMounted } from 'vue'
import { getCategorysAPI } from '@/apis/category'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  const categoryData = ref([])
  const route = useRoute()
  const getCategoryData = async (id) => {
    const res = await getCategorysAPI(id)
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
