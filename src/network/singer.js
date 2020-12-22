import { request } from "./request"

// 歌手榜列表
export function getSingerList(type, area, initial, limit, offset) {
  return request({
    url: '/artist/list',
    params: {
      type,
      area,
      initial,
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
    url: 'artist/detail',
    params: {
      id: singgerId
    }
  })
}