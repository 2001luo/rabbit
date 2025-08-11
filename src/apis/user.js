import http from '@/utils/http'
import request from '@/utils/request'

export const loginApi = ({ account, password }) => {
  return http({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password,
    },
  })
}

export const getLikeListAPI = ({ limit = 4 }) => {
  return request({
    url: '/goods/relevant',
    params: {
      limit,
    },
  })
}
