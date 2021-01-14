<template>
  <transition name="slide">
    <music-list
      :name="name"
      :pic="pic"
      :singers="singers"
      :list="list"
    ></music-list>
  </transition>
</template>

<script>
import MusicList from "components/content/music-list/MusicList.vue";
import{ getPlayer } from "network/player"
import {getSingerList} from "network/list"
import { mapGetters,mapMutations } from "vuex";
export default {
  components: {
    MusicList,
  },
  data(){
    return{
      list:[],
      singerName:[]
    }
  },
  created() {
    this.getPlayer();
    // console.log(this.RankName);
    
  },
  mounted(){
    console.log(this.singerName);
  },
  methods: {
    getPlayer() {
      if(!this.Rank.id) {
        this.$router.push('/rank')
      }
      getPlayer(this.Rank.id).then((res,index) => {
        res.playlist.tracks.forEach((item) => {
          this.list.push(item);
          // this.singerName.push(item.ar[0].name)
          // console.log(item.ar[0].name);
        });
        
        
      });
    },
    ...mapMutations({
      setRankName: "SET_RANK_NAME",
    }),
    
  },
  computed: {
    name() {
      return this.Rank.name;
    },
    pic(){
      return this.Rank.coverImgUrl;
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