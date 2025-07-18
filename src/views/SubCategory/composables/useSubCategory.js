import { getSubCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export function useSubCategory() {
  const route = useRoute()
  // 获取基础列表数据
  const goodList = ref([])
  const reqData = ref({
    categoryId: route.params.id,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime',
  })

  const getGoodList = async () => {
    const res = await getSubCategoryAPI(reqData.value)
    goodList.value = res.result.items
  }
  onMounted(() => {
    getGoodList()
  })
  return { goodList }
}
