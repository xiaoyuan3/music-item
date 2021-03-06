import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  // export const SET_MUSIC_URL = 'SET_MUSIC_URL'
  [types.SET_MUSIC_URL](state, musicUrl) {
    state.musicUrl = musicUrl
  },
  [types.SET_SONGS](state, songs) {
    state.songs = songs
  },
  [types.SET_RANK](state, Rank) {
    state.Rank = Rank
  },
  [types.SET_RANK_NAME](state, RankName) {
    state.RankName = RankName
  },
  [types.SET_SONG_IMG](state, songImg) {
    state.songImg = songImg
  },
  [types.SET_LAST_TIME](state, lastTime) {
    state.lastTime = lastTime
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  },
}

export default mutations