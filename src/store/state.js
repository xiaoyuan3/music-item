import {playMode} from 'assets/js/config'

// 管理状态
const state = {
  singer: {},
  songs:{},
  songImg: "",
  Rank: {},
  RankName:{},  //还没用
  disc:{},
  lastTime: "",
  musicUrl: "",
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1
}

export default state