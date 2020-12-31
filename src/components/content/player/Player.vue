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
          <img :src="currentSong.image" alt="" />
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
              <div class="e1-image">
                <img src="~assets/image/BFQ/e1.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="left-left">
              <i class="iconfont iconloop"></i>
            </div>
            <div>
              <i class="iconfont icon7"></i>
            </div>
            <div class="i-center">
              <i @click="tooglePlaying" class="iconfont iconplay"></i>
            </div>
            <div>
              <i class="iconfont icon5"></i>
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
          <img src="~assets/image/BFQ/e1.png" alt="" />
        </div>
        <div class="text">
          <h2 v-html="currentSong.name"></h2>
          <p v-html="singer.name"></p>
        </div>
        <div class="control">
          <i></i>
        </div>
        <div class="mini-right">
          <i class="iconfont iconicon-music-lsit"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="musicUrl"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import animations from "create-keyframe-animation";
import { prefixStyle } from "assets/js/dom";

const transform = prefixStyle("transform");
export default {
  computed: {
    ...mapGetters([
      "playlist",
      "fullScreen",
      "currentSong",
      "singer",
      "musicUrl",
      "playing",
    ]),
  },
  created() {
    console.log(this.currentSong);
    console.log(this.playlist);
    console.log(this.fullScreen);
    // console.log(this.singer);
    console.log(this.musicUrl);
  },
  methods: {
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE",
    }),
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
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
      const width = 120;
      const scale = targetWith / width;
      const x = -(window.innerWidth / 2 - paddingLeft);
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
      return {
        x,
        y,
        scale,
      };
    },
    tooglePlaying() {
      this.setPlayingState(!this.playing);
    },
  },
  watch: {
    musicUrl() {
      this.$nextTick(() => {
        this.$refs.audio.play()
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
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
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
        position: fixed;
        top: 120px;
        left: 50%;
        // width: 100%;
        transform: translate(-50%);
        img {
          width: 240px;
          height: 240px;
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 30px;
      width: 100%;
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
      padding: 0 10px 0 20px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
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
</style>