import { request } from './request'

export function getPlayer(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}