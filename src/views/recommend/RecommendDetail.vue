<template>
  <div class="slide">
    <music-list :name="name" :pic="pic" :list="list" :singers="singers"></music-list>
  </div>
</template>

<script>
import MusicList from "components/content/music-list/MusicList";
import{ getPlayer } from "network/player"
import {getSingerList} from "network/list"
import { mapGetters } from "vuex"

export default {
  components:{
    MusicList
  },
  data(){
    return{
      list:[],
      singers:""
    }
  },
  created() {
    console.log(this.disc);
    this.getPlayer()
  },
  methods:{
    getPlayer(){
      if(!this.disc.id) {
        this.$router.push('/recommend')
      }
      getPlayer(this.disc.id).then(res => {
        console.log(res);
        
         let songs = res.playlist.tracks
         console.log(songs);
      })
      getPlayer(this.disc.id).then((res) => {
        res.playlist.tracks.forEach((item) => {
          this.list.push(item);
        });
      });
    }
  },
  computed:{
    ...mapGetters(["disc"]),
    name() {
      return this.disc.name  //picUrl
    },
    pic() {
      return this.disc.picUrl
    },
    
  }
}
</script>

<style lang="less" scoped>
.slide{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  background-color: #fff;
}
</style>