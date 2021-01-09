<template>
  <div class="list-detail">
    <music-list :name="name" :pic="pic" :list="list" :singers="singer.name"></music-list>
  </div>
</template>

<script>
import MusicList from "components/content/music-list/MusicList";
import { mapGetters,mapMutations } from "vuex";
import { getSingerDeail,getSingerList } from "network/list";
// import { getSingerList } from "network/list";
export default {
  components: {
    MusicList,
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    console.log(this.singer);
    this.getSingerDeail();
    console.log(this.songs);
    console.log();
  },
  computed: {
    ...mapGetters(["singer", "songs"]),
    name(){
      return this.songs.name
    },
    pic(){
      return this.songs.cover
    }
  },
  methods: {
    getSingerDeail() {
      if (!this.singer.id) {
        this.$router.push("/list");
      }
      getSingerDeail(this.singer.id).then((res) => {
        console.log(res);
        let songs = []
        songs = res.data.artist;
        this.setSongs(songs)
      });
      getSingerList(this.singer.id).then((res) => {
          res.songs.forEach((item) => {
            // console.log(item);
            this.list.push(item);
          });
        });
    },
    
    ...mapMutations({
      setSongs: "SET_SONGS",
      
    }),
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