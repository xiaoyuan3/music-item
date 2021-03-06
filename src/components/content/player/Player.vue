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
        <div
          class="center"
          @touchstart.prevent="middleTouchStart"
          @touchmove.prevent="middleTouchMove"
          @touchend="middleTouchEnd"
        >
          <div class="center-l" ref="centerL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="e1-image" :class="cdCls">
                <!-- <img src="~assets/image/BFQ/e1.png" alt="" /> -->
                <img :src="songImg" alt="" />
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{ playingLyric }}</div>
            </div>
          </div>
          <scroll
            class="center-r"
            :probe-type="3"
            ref="lyricList"
            :data="currentLyric && currentLyric.lines"
          >
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p
                  ref="lyricLine"
                  class="text"
                  v-for="(line, index) in currentLyric.lines"
                  :key="index"
                  :class="{ current: currentLineNum === index }"
                >
                  {{ line.txt }}
                </p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{ active: currentShow === 'cd' }"></span>
            <span
              class="dot"
              :class="{ active: currentShow === 'lyric' }"
            ></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{ format(currentTime) }}</span>
            <div class="progress-bar-wrapper">
              <progress-bar
                :percent="percent"
                @percentChange="onPercentChange"
              ></progress-bar>
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
          <!-- 播放器的歌手有点问题 -->
          <p v-html="singer.name"></p>
        </div>
        <div class="mini-control">
          <progress-circle>
            <i
              @click.stop="tooglePlaying"
              class="icon-mini"
              :class="playIcon"
            ></i>
          </progress-circle>
        </div>
        <div class="mini-right" @click.stop="showPlayList">
          <i class="iconfont iconicon-music-lsit"></i>
        </div>
      </div>
    </transition>
    <play-list ref="playlist"></play-list>
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
import ProgressCircle from "../progress-circle/progress-circle";
import Scroll from "components/common/scroll/Scroll";
import PlayList from "../playlist/playlist";
import Lyric from "lyric-parser";

import { mapGetters, mapMutations,mapActions } from "vuex";
import { prefixStyle } from "assets/js/dom";
import { getMusic, getSongDetail, getSongWords } from "network/player";
import { playMode } from "assets/js/config";
import { shuffle } from "assets/js/util";


const transform = prefixStyle("transform");
const transitionDuration = prefixStyle("transitionDuration");
export default {
  components: {
    ProgressBar,
    ProgressCircle,
    Scroll,
    PlayList
  },
  data() {
    return {
      songReady: false,
      currentTime: 0,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: "cd",
      playingLyric: "",
    };
  },
  created() {
    this.touch = {};
  },
  mounted(){
    setTimeout(() => {
      this.$refs.lyricList.refresh()
    }, 50);
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
      setPlayList: "SET_PLAYLIST",
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
    showPlayList() {
      this.$refs.playlist.show()
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
      if (this.currentLyric) {
        this.currentLyric.togglePlay();
      }
    },
    prev() {
      if (!this.songReady) {
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
      } else {
        let index = this.currentIndex - 1;
        if (index === -1) {
          index = this.playlist.length - 1;
        }
        this.setCurrentIndex(index);
        this.getMusic();
        if (!this.playing) {
          this.tooglePlaying();
        }
      }
      this.songReady = false;
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      if (this.currentLyric) {
        this.currentLyric.seek(0);
      }
    },
    next() {
      if (!this.songReady) {
        return;
      }
      if (this.playlist.length === 1) {
        this.loop();
      } else {
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
      }
      this.songReady = false;
    },
    // audio的监听事件
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    ready() {
      this.songReady = true;
      this.savePlayHistory(this.currentSong)
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
      getSongDetail(this.currentSong.id).then((res) => {
        const songs = res.songs[0];
        this.setSongImg(songs.al.picUrl);
        console.log(songs.al.picUrl); //dt是总时长
        const time = songs.dt / 1000;
        this.setLastTime(time);
      });
    },
    onPercentChange(percent) {
      const currentNew = this.lastTime * percent;
      this.$refs.audio.currentTime = currentNew;
      if (!this.playing) {
        this.tooglePlaying();
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentNew * 1000);
      }
    },
    // 循环 随机 单循环
    changeMode() {
      const mode = (this.mode + 1) % 3;
      console.log(mode);
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    resetCurrentIndex(list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    // 获取歌词
    getLyric() {
      getSongWords(this.currentSong.id)
        .then((res) => {
          console.log(this.currentSong);
          console.log(res);
          this.currentLyric = new Lyric(res.lrc.lyric, this.handleLyric);
          if (this.playing) {
            this.currentLyric.play();
          }
        })
        .catch(() => {
          this.currentLyric = null;
          this.playingLyric = "";
          this.currentLineNum = 0;
        });
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
      this.playingLyric = txt;
    },
    middleTouchStart(e) {
      console.log(e);
      this.touch.initiated = true;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
    },
    middleTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const touch = e.touches[0];
      const deltaX = touch.pageX - this.touch.startX;
      const deltaY = touch.pageY - this.touch.startY;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      }
      const left = this.currentShow === "cd" ? 0 : -window.innerWidth;
      const offsetwidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + deltaX)
      );
      this.touch.percent = Math.abs(offsetwidth / window.innerWidth);
      this.$refs.lyricList.$el.style[
        transform
      ] = `translate3d(${offsetwidth}px, 0, 0)`;
      this.$refs.lyricList.$el.style[transitionDuration] = 0;
      this.$refs.centerL.style.opacity = 1 - this.touch.percent;
      this.$refs.centerL.style[transitionDuration] = 0;
    },
    middleTouchEnd() {
      let offsetwidth;
      let opacity;
      if (this.currentShow == "cd") {
        // 从右向左划
        if (this.touch.percent > 0.1) {
          offsetwidth = -window.innerWidth;
          opacity = 0;
          console.log(opacity);
          this.currentShow = "lyric";
        } else {
          offsetwidth = 0;
          opacity = 1;
          console.log(opacity);
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetwidth = 0;
          this.currentShow = "cd";
          opacity = 1;
          console.log(opacity);
        } else {
          offsetwidth = -window.innerWidth;
          opacity = 0;
          console.log(opacity);
        }
      }

      this.$refs.lyricList.$el.style[
        transform
      ] = `translate3d(${offsetwidth}px, 0, 0)`;
      this.$refs.lyricList.$el.style[transitionDuration] = `300ms`;
      this.$refs.centerL.style.opacity = opacity;
      this.$refs.centerL.style[transitionDuration] = 300;
      this.touch.initiated = false;
    },
    ...mapActions([
      'savePlayHistory'
    ])
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
      "words",
    ]),
    playIcon() {
      return this.playing ? "iconfont iconpasue-min-gray" : "iconfont iconplay";
    },
    iconMode() {
      return this.mode === playMode.sequence
        ? "iconfont iconloop"
        : this.mode === playMode.loop
        ? "iconfont iconloop2"
        : "iconfont iconicon_random";
    },
    cdCls() {
      return this.playing ? "play" : "play pause";
    },
    disableCls() {
      return this.songReady ? "" : "disable";
    },
    percent() {
      return this.currentTime / this.lastTime;
    },
  },
  watch: {
    musicUrl(newSong, oldSong) {
      if (this.currentLyric) {
        this.currentLyric.stop();
      }
      this.$nextTick(() => {
        this.$refs.audio.play();
        this.getLyric();
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
      img {
        -webkit-filter: blur(90px);
        filter: blur(90px);
        opacity: 0.4;
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
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .center-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        // padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          top: 0;
          left: calc(50% - 120px);
          right: 0;
          width: 80%;
          height: 100%;
          .e1-image {
            margin: 0;
            width: 240px;
            height: 240px;
            // box-sizing: border-box;
            // border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            img {
              width: 240px;
              height: 240px;
              border-radius: 50%;
            }
          }
        }
        .playing-lyric-wrapper {
          position: fixed;
          bottom: 40%;
          left: 10%;
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: 15px;
            color: #000;
          }
        }
      }

      .center-r {
        overflow: hidden;
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        // height: calc(100% - 230px);
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          // height: 100%;
          .text {
            line-height: 32px;
            color: #000;
            font-size: 14px;
          }
          .current {
            color: #ffcd32;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 30px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          &.active {
            width: 20px;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.8);
          }
        }
      }
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