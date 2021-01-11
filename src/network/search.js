import { request } from './request'
// 搜索
export function getSearch(keywords) {
  return request({
    url: '/search',
    params: {
      keywords
    }
  })
}
// 热搜列表(详细)
export function getHot() {
  return request({
    url: '/search/hot/detail'
  })
}
