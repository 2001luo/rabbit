<script setup>
import HomePanel from './HomePanel.vue'
import { ref, onMounted } from 'vue'
import { findHotApi } from '@/apis/home'

const hotList = ref([])
const getHotList = async () => {
  const res = await findHotApi()
  hotList.value = res.result
}

onMounted(() => {
  getHotList()
})
</script>

<template>
  <home-panel title="人气推荐" subtitle="人气爆款 不容错过">
    <ul class="goods-list">
      <li v-for="item in hotList" :key="item.id">
        <RouterLink>
          <img v-img-lazy="item.picture" :alt="item.alt" />
          <p class="name">{{ item.title }}</p>
        </RouterLink>
      </li>
    </ul>
  </home-panel>
</template>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
