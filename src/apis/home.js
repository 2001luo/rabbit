import http from '@/utils/http'

export function getBannerAPI(params = {}) {
  const { distributionSite = '1' } = params
  return http({
    url: 'home/banner',
    params: {
      distributionSite,
    },
  })
}

export function findNewAPI() {
  return http({
    url: '/home/new',
  })
}

export function findHotApi() {
  return http({
    url: '/home/hot',
  })
}

export function getGoodsAPI() {
  return http({
    url: '/home/goods',
  })
}
