import { construct } from "core-js/fn/reflect";

export default class Song {
  constructor({ al, briefDesc, cover, id, musicSize, mvSize, name, rank }) {
    this.al = al
    this.briefDesc = briefDesc
    this.cover = cover
    this.id = id
    this.musicSize = musicSize
    this.mvSize = mvSize
    this.name = name
    this.rank = rank
  }
}