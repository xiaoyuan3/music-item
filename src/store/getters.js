// 获取state做的映射
export const singer = state => state.singer

export const songImg = state => state.songImg

export const songs = state => state.songs

export const Rank = state => state.Rank

export const RankName = state => state.RankName

export const lastTime = state => state.lastTime

export const musicUrl = state => state.musicUrl

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

export const disc = state => state.disc