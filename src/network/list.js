import { request } from './request'

export function getList(limit, offset) {
  return request({
    url: '/top/artists',
    params: {
      limit,
      offset
    }
  })
}