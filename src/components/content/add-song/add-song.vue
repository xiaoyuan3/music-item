<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="iconfont icondelate"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box @query="search" placeholder="搜索歌曲"></search-box>
      </div>
      <div class="shortcut">
        <switches
          :switches="switches"
          :currentIndex="currentIndex"
          @switch="switchItem"
        ></switches>
        <div class="list-wrapper">
          <scroll
            class="list-scroll"
            v-if="currentIndex === 0"
          >
            <div class="list-inner">
              <song-list
                class="song-list"
                @select="selectSong"
                :list="playHistory"
              ></song-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest :query="query" @select="selectSuggest"></suggest>
      </div>
    </div>
  </transition>
</template>

<script>
import SearchBox from "components/content/search-box/SearchBox";
import Suggest from "components/content/suggest/Suggest";
import Switches from "../switches/switches";
import Scroll from "components/common/scroll/Scroll";
import SongList from "../song-list/SongList";
import { searchMixin } from "assets/js/mixin";
import { getMusic, getSongDetail } from "network/player";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  mixins: [searchMixin],
  components: {
    SearchBox,
    Suggest,
    Switches,
    Scroll,
    SongList,
  },
  data() {
    return {
      showFlag: false,
      query: "",
      currentIndex: 0,
      switches: [{ name: "最近播放" }, { name: "搜索历史" }],
    };
  },
  computed: {
    ...mapGetters(["playHistory"]),
  },
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    search(query) {
      this.query = query;
    },
    selectSuggest() {
      this.saveSearch();
    },
    switchItem(index) {
      this.currentIndex = index;
    },
    selectSong(item, index) {
      console.log(this.currentIndex);
      if (index !== 0) {
        getMusic(item.id).then((res) => {
          this.setMusicUrl(res.data[0].url);
        });
        getSongDetail(item.id).then((res) => {
          const songs = res.songs[0];
          this.setSongImg(songs.al.picUrl);
          console.log(songs.al.picUrl); //dt是总时长
          const time = songs.dt / 1000;
          this.setLastTime(time);
        });
        this.setPlayingState(true);
      }
    },
    ...mapActions(["insertSong",'currentIndex']),
    ...mapMutations({
      setMusicUrl: "SET_MUSIC_URL",
      setSongImg: "SET_SONG_IMG",
      setLastTime: "SET_LAST_TIME",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENT_INDEX",
    }),
  },
};
</script>

<style lang="less" scoped>
.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 200;
  background-color: gray;
  &.slide-enter-active,
  &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter,
  &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
  .header {
    position: relative;
    height: 44px;
    text-align: center;
    .title {
      line-height: 44px;
      font-size: 14px;
    }
    .close {
      position: absolute;
      top: 0;
      right: 8px;
      i {
        display: block;
        padding: 12px;
        font-size: 20px;
      }
    }
  }
  .shortcut {
    .list-wrapper {
      position: absolute;
      top: 165px;
      bottom: 0;
      width: 100%;
      color: white;
      .list-scroll {
        position: absolute;
        top: 0;
        height: 100%;
        overflow: hidden;
        .list-inner {
          padding: 20px 35px;
        }
      }
    }
  }
  .search-box-wrapper {
    margin: 20px;
  }
  .search-result {
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }
}
</style>