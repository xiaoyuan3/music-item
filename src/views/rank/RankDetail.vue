<template>
  <transition name="slide">
    <music-list
      :name="name"
      :pic="pic"
      :list="list"
      :singers="singers"
    ></music-list>
  </transition>
</template>

<script>
import MusicList from "components/content/music-list/MusicList.vue";
import{ getPlayer } from "network/player"
import {getSingerList} from "network/list"
import { mapGetters } from "vuex";
export default {
  components: {
    MusicList,
  },
  created() {
    this.getPlayer();
    console.log(this.Rank);
  },
  methods: {
    getPlayer() {
      // if(!this.setRank.id) {
      //   this.$router.push('/rank')
      // }
      getPlayer(this.setRank.id).then(res => {
        console.log(res);
      })
      // getPlayer(this.disc.id).then((res) => {
      //   res.playlist.tracks.forEach((item) => {
      //     this.list.push(item);
      //   });
      // });
    },
    
  },
  computed: {
    name() {
      return ;
    },
    pic(){
      return ;
    },
    singers(){
      return 
    },
    ...mapGetters(["Rank"]),
  },
};
</script>

<style lang="less" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave {
  transform: translate3d(100%, 0, 0);
}
.slide {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 199;
  background-color: #fff;
}
</style>