<template>
  <div class="player" v-show="playlist.length > 0">
    <transition
      name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img :src="songImg" alt="" />
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="iconfont iconlower"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="singer.name"></h2>
        </div>
        <div class="center">
          <div>
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="e1-image" :class="cdCls">
                <!-- <img src="~assets/image/BFQ/e1.png" alt="" /> -->
                <img :src="songImg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="progress-wrapper">
            <span class="time time-l">{{ format(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onPercentChange"></progress-bar>
            </div>
            <span class="time time-r">{{ format(lastTime) }}</span>
          </div>
          <div class="operators">
            <div class="left-left" @click="changeMode">
              <!-- <i :class="iconfont iconloop"></i> -->
              <i :class="iconMode"></i>
            </div>
            <div>
              <i @click="prev" :class="disableCls" class="iconfont icon7"></i>
            </div>
            <div class="i-center">
              <i @click="tooglePlaying" :class="playIcon"></i>
            </div>
            <div>
              <i @click="next" :class="disableCls" class="iconfont icon5"></i>
            </div>
            <div>
              <i class="iconfont iconiconhomecollection_"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img :class="cdCls" :src="songImg" alt="" />
        </div>
        <div class="text">
          <h2 v-html="currentSong.name"></h2>
          <p v-html="singer.name"></p>
        </div>
        <div class="mini-control">
          <progress-circle>
            <i @click.stop="tooglePlaying" class="icon-mini" :class="playIcon"></i>
          </progress-circle>
        </div>
        <div class="mini-right">
          <i class="iconfont iconicon-music-lsit"></i>
        </div>
      </div>
    </transition>
    <audio
      ref="audio"
      @timeupdate="updateTime"
      :src="musicUrl"
      @canplay="ready"
      @error="error"
      @ended="end"
    ></audio>

    <router-view></router-view>
  </div>
</template>

<script>
import animations from "create-keyframe-animation";
import ProgressBar from "../progress-bar/progress-bar.vue";
import ProgressCircle from "../progress-circle/progress-circle"
import Lyric from 'lyric-parser'
import { mapGetters, mapMutations } from "vuex";
import { prefixStyle } from "assets/js/dom";
import { getMusic, getSongDetail,getSongWords } from "network/player";
import {playMode} from "assets/js/config"
import {shuffle} from "assets/js/util"

const transform = prefixStyle("transform");
export default {
  components: {
    ProgressBar,
    ProgressCircle
  },
  data() {
    return {
      songReady: false,
      currentTime: 0,
      currentLyric: null
    };
  },
  beforeCreate() {},
  created() {
    console.log(this.currentSong);
    console.log(this.playlist);
    console.log(this.fullScreen);
    // console.log(this.singer);
    // console.log(this.musicUrl);
    console.log(this.lastTime);
    console.log(this.currentSong);
    // console.log(this.words);
  },
  methods: {
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setMusicUrl: "SET_MUSIC_URL",
      setSongImg: "SET_SONG_IMG",
      setLastTime: "SET_LAST_TIME",
      setPlayMode: "SET_PLAY_MODE",
      setPlayList: "SET_PLAYLIST"
    }),
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    // enter afterEnter leave afterLeave 是设置大图小图css属性
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale();
      let animation = {
        0: {
          transform: `translate3d(${x}px, ${y}px,0) scale(${scale})`,
        },
        // 60: {
        //   transform: `translate3d(0,-85px,0) scale(1.1)`,
        // },
        100: {
          // 正常
          transform: `translate3d(0,-85px,0) scale(1.0)`,
        },
      };
      animations.registerAnimation({
        name: "move",
        animation,
        presets: {
          duration: 300,
          easing: "linear",
        },
      });
      animations.runAnimation(this.$refs.cdWrapper, "move", done);
    },
    afterEnter() {
      animations.registerAnimation("move");
      this.$refs.cdWrapper.style.animation = "";
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = "all 0.4s";
      const { x, y, scale } = this._getPosAndScale();
      this.$refs.cdWrapper.style[
        transform
      ] = `translate3d(${x}px, ${y}px,0) scale(${scale})`;
      this.$refs.cdWrapper.addEventListener("transitionend", done);
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = "";
      this.$refs.cdWrapper.style[transform] = "";
    },
    // 计算大图片和小图片的中心位置
    _getPosAndScale() {
      const targetWith = 40;
      const paddingLeft = 60;
      const paddingBottom = 30;
      const paddingTop = 120;
      const width = 220;
      const scale = targetWith / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return {
        x,
        y,
        scale,
      };
    },
    // 
    tooglePlaying() {
      if (!this.songReady) {
        return;
      }
      this.setPlayingState(!this.playing);
    },
    prev() {
      if (!this.songReady) {
        return;
      }
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playlist.length - 1;
      }
      this.setCurrentIndex(index);
      this.getMusic();
      if (!this.playing) {
        this.tooglePlaying();
      }
      this.songReady = false;
    },
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
    },
    next() {
      if (!this.songReady) {
        return;
      }
      let index = this.currentIndex + 1;
      if (index === this.playlist.length) {
        index = 0;
      }
      this.setCurrentIndex(index);
      // console.log(index);
      console.log(this.currentSong.id);
      this.getMusic();
      if (!this.playing) {
        this.tooglePlaying();
      }
      this.songReady = false;
    },
    // audio的监听事件
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    end(){
      if(this.mode === playMode.loop){
        this.loop()
      }else{
        this.next()
      }
    },
    ready() {
      this.songReady = true;
    },
    error() {
      this.songReady = true;
    },
    // 播放开始时间
    format(interval) {
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      let second = interval % 60;
      if (second < 10) {
        second = "0" + second;
      } else {
        second = second;
      }
      return `${minute}:${second}`;
    },
    // 获取音乐
    getMusic() {
      getMusic(this.currentSong.id).then((res) => {
        this.setMusicUrl(res.data[0].url);
      });
      this.getSongDetail();
    },
    getSongDetail() {
      getSongDetail(this.currentSong.id).then((res) => {
        const songs = res.songs[0];
        this.setSongImg(songs.al.picUrl);
        console.log(songs.al.picUrl); //dt是总时长
        const time = songs.dt / 1000;
        this.setLastTime(time);
      });
    },
    onPercentChange(percent) {
      this.$refs.audio.currentTime = this.lastTime * percent
      if(!this.playing) {
        this.tooglePlaying()
      }
    },
    // 循环 随机 单循环
    changeMode(){
      
      const mode = (this.mode + 1) % 3
      console.log(mode);
      this.setPlayMode(mode)
      let list = null
      if(mode === playMode.random) {
        list = shuffle(this.sequenceList)
      }else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    // 获取歌词
    getLyric(){
      getSongWords(this.currentSong.id).then(res => {
        this.currentLyric = new Lyric(res.lrc.lyric)
        console.log(this.currentLyric);
      })
    }
  },
  computed: {
    ...mapGetters([
      "playlist",
      "fullScreen",
      "currentSong",
      "singer",
      "musicUrl",
      "playing",
      "currentIndex",
      "songImg",
      "lastTime",
      "mode",
      "sequenceList",
      "words"
    ]),
    playIcon() {
      return this.playing ? "iconfont iconpasue-min-gray" : "iconfont iconplay";
    },
    iconMode(){
      return this.mode === playMode.sequence ? "iconfont iconloop" : this.mode=== playMode.loop ? "iconfont iconloop2": "iconfont iconicon_random"
    },
    cdCls() {
      return this.playing ? "play" : "play pause";
    },
    disableCls(){
      return this.songReady ? '' : 'disable'
    },
    percent() {
      return this.currentTime / this.lastTime
    }
  },
  watch: {
    musicUrl(newSong, oldSong) {
      this.$nextTick(() => {
        this.$refs.audio.play();
        this.getLyric()
      });
    },
    playing(newPlaying) {
      this.$nextTick(() => {
        const audio = this.$refs.audio;
        newPlaying ? audio.play() : audio.pause();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.player {
  margin: 0;
  padding: 0;
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 199;
    background-color: #fff;
    .background {
      position: absolute;
      // top: -33%; 
      top: -0;
      right: 0;
      // left: -150%;
      left: 0;
      bottom: 0;
      img{
        -webkit-filter: blur(90px);  
        filter: blur(90px);  
      }
    }
    .top {
      position: relative;
      padding: 0;
      margin: 0;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 0;
        padding: 20px;
      }
      .title {
        width: 70%;
        margin: 0 auto;
        font-size: 18px;
        line-height: 40px;
        text-align: center;
      }
      .subtitle {
        margin: 0;
        line-height: 15px;
        text-align: center;
        font-size: 15px;
      }
    }
    .center {
      .e1-image {
        // width: calc(100% - 0.2px);
        position: fixed;
        top: calc(50% - 240px);
        left: calc(50% - 120px);
        // width: 100%;
        // transform: translateX(-50%);

        img {
          width: 240px;
          height: 240px;
          background-color: red;
          border-radius: 50%;
        }
      }
      .play {
        animation: rotate 20s linear infinite;
      }
      .pause {
        animation-play-state: paused;
      }
    }
    .bottom {
      position: absolute;
      bottom: 30px;
      width: 100%;
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
          margin: 0 10px;
          color: #000;
        }
        .time-l {
          text-align: left;
        }
        .time-r {
          text-align: right;
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        // margin: 0 20px;
        .iconfont {
          flex: 1;
        }
        i {
          font-size: 40px;
        }
        .i-center {
          i {
            font-size: 50px;
          }
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.4s;
      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 60px;
    z-index: 199;
    background-color: red;

    .icon {
      padding: 5px 10px 0 20px;
      img {
        width: 40px;
        height: 40px;
        // border-radius: 50%;
        background-color: #fff;
        border-radius: 50%;
      }
      .play {
        animation: rotate 20s linear infinite;
      }
      .pause {
        animation-play-state: paused;
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 20px;
      h2,
      p {
        padding: 0;
        margin: 0;
        font-size: 16px;
      }
      p {
        font-size: 14px;
      }
    }
    .mini-control {
      position: fixed;
      right: 17%;
      i {
        font-size: 34px;
      }
      // .icon-mini{
      //   font-size: 34px;
      //   position: absolute;
      //   left: 0;
      //   top: 0;
      // }
    }
    .mini-right {
      position: fixed;
      right: 0;
      padding: 0 20px;
      i {
        font-size: 30px;
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>