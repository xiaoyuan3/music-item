<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon"></i>
            <span class="text"></span>
            <span class="clear"><i class="iconfont icondelate2"></i></span>
          </h1>
        </div>
        <div ref="listContent" class="list-content">
          <ul name="list">
            <li
              class="item"
              @click="selectItem(item, index)"
              v-for="(item, index) in sequenceList"
              :key="index"
            >
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{ item.name }}</span>
              <span class="like">
                <i class="iconfont iconiconhomecollection_"></i>
              </span>
              <span class="delete">
                <i class="iconfont icondelate"></i>
              </span>
            </li>
          </ul>
        </div>
        <div class="list-operate">
          <div class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div @click="hide" class="list-close">
          <span>关闭</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { playMode } from "assets/js/config";
import { getMusic,getSongDetail } from "network/player";
export default {
  data() {
    return {
      showFlag: false,
    };
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    getCurrentIcon(item) {
      if (this.currentSong.id === item.id) {
        return "iconfont iconplay";
      }
      return "";
    },
    selectItem(item, index) {
      // console.log('xx');
      // console.log(item);
      this.setCurrentIndex(index);
      this.setPlayingState(true);

      getMusic(item.id).then((res) => {
        console.log(res);
        this.setMusicUrl(res.data[0].url);
      });
      getSongDetail(this.currentSong.id).then((res) => {
        const songs = res.songs[0];
        this.setSongImg(songs.al.picUrl);
        // console.log(songs.al.picUrl); //dt是总时长
        const time = songs.dt / 1000;
        this.setLastTime(time);
      });
    },
    ...mapMutations({
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayingState: "SET_PLAYING_STATE",
      setMusicUrl: "SET_MUSIC_URL",
      setSongImg: "SET_SONG_IMG",
      setLastTime: "SET_LAST_TIME",

    }),
  },
  computed: {
    ...mapGetters(["sequenceList", "currentSong", "playlist"]),
  },
};
</script>

<style lang="less" scoped>
ul,
div {
  margin: 0;
  padding: 0;
}
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  // background-color: rgb(22, 227, 238);
  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }
  &.list-fade-enter,
  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: gray;
  }
  .list-header {
    position: relative;
    padding: 0 30px 0 20px;
    .title {
      display: flex;
      align-items: center;
      // i {
      //   position: fixed;
      //   right: 0;
      //   margin-right: 10px;
      //   font-size: 20px;

      //   // font-size: 30px;
      // }
      .text {
        flex: 1;
        font-size: 14px;
      }
      .clear {
        .icon-clear {
          font-size: 12px;
        }
      }
    }
  }
  .list-content {
    max-height: 240px;
    overflow: hidden;
    .item {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 30px 0 10px;
      overflow: hidden;
      &.list-enter-active,
      &.list-leave-active {
        transition: all 0.1s;
      }
      &.list-enter,
      &.list-leave-to {
        height: 0;
      }
      .current {
        flex: 0 0 20px;
        width: 20px;
        font-size: 14px;
        color: rgb(251, 255, 0);
      }
      .text {
        flex: 1;
      }
      .like {
        margin-right: 15px;
      }
    }
  }
  .list-operate {
    width: 140px;
    margin: 20px auto 30px auto;
    .add {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      border: 1px solid black;
      border-radius: 100px;
      .icon-add {
        margin-right: 5px;
        font-size: 12px;
      }
      .text {
        font-size: 14px;
      }
    }
  }
  .list-close {
    text-align: center;
    line-height: 50px;
    background-color: rgb(11, 148, 82);
    font-size: 14px;
    color: white;
  }
}
</style>