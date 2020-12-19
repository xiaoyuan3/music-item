import { request } from "./request"

// 轮播图
export function getRecommendBanner() {
  return request({
    url: '/banner',
  })
}

// 推荐歌单
export function getRecommendPerson() {
  return request({
    url: '/personalized',
  })
}

