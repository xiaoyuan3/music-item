<template>
  <div class="music-list">
    <div class="back">
      <i class="iconfont iconaui-icon-back"></i>
    </div>
    <h1 class="title">{{ songs.name }}</h1>
    <div>
      <img class="image" :src="songs.cover" alt="" />
    </div>
    <song-list></song-list>
    <router-view></router-view>
  </div>
</template>

<script>
import SongList from "../song-list/SongList";
import { getSingerList } from "network/list";
export default {
  props: {
    songs: {},
  },
  components: {
    SongList,
  },
  data() {

  },
  created() {
    console.log(this.songs.id);
    this.getSingerList();
  },
  methods: {
    getSingerList() {
      console.log(this.songs.id);
      getSingerList(this.songs.id).then((res) => {
        console.log(res.songs);
        // res.songs.forEach((item) => {
        //   console.log(item.al);
        //   this.list = item.al;
        // });
      });
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
    // background-color: #fff;
    color: #fff;
  }
  .image {
    width: 100%;
  }
}
</style>