import { request } from './request'

export function getRankNews() {
  return request({
    url: '/toplist',
  })
}

export function getRankNewsSing() {
  return request({
    url: '/toplist/detail',
  })
}