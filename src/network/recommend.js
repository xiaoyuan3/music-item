import { request } from "./request"

export function getRecommendBanner() {
  return request({
    url: '/banner',
  })
}

export function getRecommendPerson() {
  return request({
    url: '/personalized',
  })
}

