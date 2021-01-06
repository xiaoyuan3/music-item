<template>
  <div class="slide">
    <music-list></music-list>
  </div>
</template>

<script>
import MusicList from "components/content/music-list/MusicList";
export default {
  components:{
    MusicList
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