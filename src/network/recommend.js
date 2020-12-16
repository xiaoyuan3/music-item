import { request } from "./request"

export function getRecommendBanner() {
  return request({
    url: '/banner',
    params: {
      // page
    }
  })
}

export function getRecommendPerson() {
  return request({
    url: '/personalized',
    params: {
      // page
    }
  })
}