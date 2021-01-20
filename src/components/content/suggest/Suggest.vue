<template>
  <div>
    <div class="suggest" :data="result">
      <ul class="suggest-list" v-for="(item, index) in result" :key="index">
        <li @click="selectItem(item)" class="suggest-item">
          <div class="icon">
            <i class="iconfont iconzu"></i>
          </div>
          <div class="name">
            <p class="text" v-html="item.name"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getSearch } from "network/search";
import { getMusic, getSongDetail } from "network/player";
import Scroll from "components/common/scroll/Scroll";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components: {
    Scroll,
  },
  props: {
    query: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      result: [],
    };
  },
  created() {
    console.log(this.query);
  },
  methods: {
    search() {
      if (this.query === "") {
        return;
      }
      getSearch(this.query).then((res) => {
        console.log(res);
        this.result = res.result.songs;
      });
    },
    selectItem(item) {
      // console.log(item);
      this.insertSong(item);
      if (this.query === "") {
        return;
      }
      getMusic(item.id).then((res) => {
        // console.log(res);
        this.setMusicUrl(res.data[0].url);
      });
      getSongDetail(this.currentSong.id).then((res) => {
        const songs = res.songs[0];
        this.setSongImg(songs.al.picUrl);
        const time = songs.dt / 1000;
        this.setLastTime(time);
      });
      this.$emit("select");
    },
    ...mapMutations({
      setMusicUrl: "SET_MUSIC_URL",
      setSongImg: "SET_SONG_IMG",
      setLastTime: "SET_LAST_TIME",
    }),
    ...mapActions(["insertSong"]),
    // _normalizeSongs(list){
    //   list.forEach(e => {
    //   });
    // }
  },
  computed: {
    ...mapGetters(["currentSong"]),
  },
  watch: {
    query() {
      this.search();
    },
  },
};
</script>

<style lang="less" scoped>
div,
ul {
  padding: 0;
  margin: 0;
}
.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      height: 35px;
      padding-bottom: 10px;
      align-items: center;
    }
    .icon {
      flex: 0 0 30px;
      width: 30px;
      i {
        font-size: 14px;
      }
    }
    .name {
      flex: 1;
      font-size: 12px;
      overflow: hidden;
      .text {
        flex-wrap: nowrap;
        // no-wrap()
      }
    }
  }
}
</style>