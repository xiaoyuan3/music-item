<template>
  <div class="list-detail">
    <h2>你好</h2>
    <music-list :songs="songs"></music-list>
    <router-view></router-view>
  </div>
</template>

<script>
import MusicList from "components/content/music-list/MusicList";
import { mapGetters } from "vuex";
import { getSingerDeail } from "network/list";
export default {
  components: {
    MusicList,
  },
  data() {
    return {
      songs: [],
    };
  },
  created() {
    // console.log(this.singer);
    this.getSingerDeail();
    // console.log(this.songs);
    
  },
  computed: {
    ...mapGetters(["singer"]),
  },
  methods: {
    getSingerDeail() {
      if (!this.singer.id) {
        this.$router.push("/list");
      }
      getSingerDeail(this.singer.id).then((res) => {
        // this.songs.push(res.data.artist)
        // console.log(res.data);
        
        this.songs = res.data.artist;
        console.log(this.songs);
      });
    },
    
  },
};
</script>

<style>
.list-detail {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: #fff;
}
</style>