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
