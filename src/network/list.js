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
// /artist/detail
// 因为id是动态的所以定义一个参数  由外部传进来的参数替换动态id
// singgerId = this.singer.id (singer就是item)
export function getSingerDeail(singgerId) {
  return request({
    url: '/artist/detail',
    params: {
      id: singgerId
    }
  })
}
// /artist/songs

export function getSingerList(singgerId) {
  return request({
    url: '/artist/songs',
    params: {
      id: singgerId
    }
  })
}

