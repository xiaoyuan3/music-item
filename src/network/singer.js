import { request } from "./request"

// 歌手榜列表
export function getSingerList() {
  return request({
    url: '/artist/list',
  })
}
// /artist/detail

export function getSingerDeail() {
  return request({
    url: `artist/detail?id=${ser}`,
  })  
}