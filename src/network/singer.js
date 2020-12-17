import { request } from "./request"

export function getSingerList() {
  return request({
    url: '/artist/list',
  })
}