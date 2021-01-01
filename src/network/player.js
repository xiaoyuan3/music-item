import { request } from './request'

// 获取歌单
export function getPlayer(id) {
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}
// 获取音乐
export function getMusic(id) {
  return request({
    url: '/song/url',
    params: {
      id
    }
  })
}
// /playlist/cover/update

export function getSongDetail(ids) {
  return request({
    url: '/song/detail',
    params: {
      ids
    }
  })
}