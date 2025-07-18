import http from '@/utils/http'
import request from '@/utils/request'

export function getCategorysAPI(id) {
  return http({
    url: '/category',
    params: {
      id,
    },
  })
}

export function getCategoryFilterAPI(id) {
  return http({
    url: '/category/sub/filter',
    params: {
      id,
    },
  })
}

export function getSubCategoryAPI(data) {
  return request({
    url: '/category/goods/temporary',
    method: 'POST',
    data,
  })
}
