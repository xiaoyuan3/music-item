<template>
  <div class="music-list">
    <div class="back" @click="backClick">
      <i class="iconfont iconaui-icon-back"></i>
    </div>
    <h1 class="title">{{ songs.name }}</h1>
    <div ref="bgImg" class="bgimg">
      <img ref="img" class="image" :src="songs.cover" alt="" />
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" class="list" ref="list">
      <div class="song-list">
        <song-list @select="selectItem" :list="list"></song-list>
      </div>
    </scroll>

    <router-view></router-view>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import SongList from "../song-list/SongList";
import { mapGetters } from "vuex";
import {mapActions} from "vuex"
import {mapMutations} from 'vuex'
import { getSingerList } from "network/list";
import { getMusic} from "network/player"
const RESERVED_HEIGHT = 40;
export default {
  props: {
    songs: {},
  },
  components: {
    SongList,
    Scroll,
  },
  data() {
    return {
      list: [],
      ScrollY: 0,
    };
  },
  created() {
    this.getSingerList();
  },
  mounted() {
    this.imgHeight = this.$refs.bgImg.clientHeight;
    console.log(this.imgHeight);
    // 向上滚动的高度
    this.minTranslateY = -this.imgHeight + RESERVED_HEIGHT;
    this.$refs.list.$el.style.top = `${this.imgHeight}px`;
  },
  methods: {
    getSingerList() {
      // console.log(this.singer.id);
      getSingerList(this.singer.id).then((res) => {
        res.songs.forEach((item) => {
          this.list.push(item);
        });
      })
    },
    scroll(position) {
      this.ScrollY = position.y;
    },
    backClick(){
      this.$router.back()
    },
    selectItem(item, index){
      this.selectPlay({
        list: this.list,
        index
      })
      console.log(item.id);
      console.log(this.list);
      
      getMusic(item.id).then(res => {

        // this.musicUrl = res.data[0].url
        this.setMusicUrl(res.data[0].url)
        // this.$store.commit('SET_MUSIC_URL')
        // this.$store.dispatch('musicUrl', this.musicUrl)
        // this.$store.commit('musicUrl',musicUrl)
        // console.log(res.data[0].url);
      })
    },
    ...mapActions([
      'selectPlay'
    ]),
    ...mapMutations({
      setMusicUrl:'SET_MUSIC_URL'
    })
  },
  computed: {
    ...mapGetters(["singer"]),
  },
  watch: {
    ScrollY(newval) {
      let tranlateY = Math.max(this.minTranslateY, newval);
      let zIndex = 0;
      let scale = 1
      //  为ref=layer 的添加css 3d属性
      this.$refs.layer.style["transform"] = `translate3d(0, ${tranlateY}px, 0)`;
      this.$refs.layer.style["webkitTransform"] = `translate3d(0, ${tranlateY}px, 0)`;
      // Math.abs 返回一个绝对值
      const percent = Math.abs(newval/this.imgHeight)
      if(newval > 0) {
        scale = 1 + percent
        zIndex = 10
      }
      var style = this.$refs.bgImg.style
      if (newval < this.minTranslateY) {
        // console.log('我是新值'+newval);
        // console.log(this.minTranslateY);
        zIndex = 9
        style.paddingTop = 0;
        style.height = `${RESERVED_HEIGHT}px`;
        // this.$refs.bgImg.style.zIndex= 10
      } else {
        style.paddingTop = "75%";
        style.height = 0;
        // this.$refs.bgImg.style.zIndex= 0
        zIndex = 0
      }
      style.zIndex = zIndex
      // this.$refs.img.style.zIndex = zIndex;
      style["transform"] = `scale(${scale})`;
      style["webkitTransform"] = `scale(${scale})`;
    },
  },
};
</script>

<style lang="less" scoped>
.music-list {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: #fff;
  .back {
    // position: absolute;
    // top: 0;
    // left: 0;
    position: absolute;
    // float: left;
    left: 6px;
    z-index: 50;
    .iconfont {
      display: block;
      padding: 10px;
      color: #fff;
      // background-color: rgb(221, 214, 214);
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 50%;
    right: 0;
    width: 20%;
    transform: translate(-50%);
    text-align: center;
    font-size: 16px;
    z-index: 10;
    // background-color: #fff;
    color: #fff;
  }
  .bgimg {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 75%;
    transform-origin: top;
    background-size: cover;
    overflow: hidden;
    // z-index: 9;
    .image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      // height: 40px;
      z-index: 0;
      width: 100%;
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background-color: #fff;
    // overflow: hidden;
    // z-index: 10;
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    .song-list {
      padding: 20px 30px;
    }
  }
}
</style>