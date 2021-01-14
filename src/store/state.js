import {playMode} from 'assets/js/config'

// 管理状态 player页面是由playlist.length > 0 来出现页面的
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