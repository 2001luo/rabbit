<script setup>
import { useCategoryFilter } from './composables/useCategoryFilter'
import GoodsItem from '../Home/components/GoodsItem.vue'
import { getSubCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

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

const { categoryData } = useCategoryFilter()

const tabChange = () => {
  console.log('tab切换了', reqData.value.sortField)
  reqData.value.page = 1
  getGoodList()
}

const disabled = ref(false)
const load = async () => {
  console.log('加载更多数据')

  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = [...goodList.value, ...res.result.items]

  if (res.result.items === 0) {
    disabled.value = true
  }
}
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }"
          >{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <goods-item v-for="good in goodList" :good="good" :key="good.id"></goods-item>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
