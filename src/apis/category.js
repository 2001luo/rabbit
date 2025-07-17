import http from '@/utils/http'

export function getCategorysAPI(id) {
  return http({
    url: '/category',
    params: {
      id,
    },
  })
}
