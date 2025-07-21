import http from '@/utils/http'

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
