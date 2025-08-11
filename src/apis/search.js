import http from '@/utils/http'

export const getSearchListAPI = (search) => {
  return http({
    url: '/goods/search',
    params: { search },
  })
}
