<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <a href="">
        <img :src="item.coverImgUrl" alt="" />
        <!-- {{item.description}} -->
      </a>
    </div>
    <p v-for="items in artists">{{ items.first }}-</p>
    <p v-for="item in songs">{{ item.name }}</p>
    <!-- <div v-for="(items, index) in resft" :key="index">
      {{items.artistToplist.artists[index].first}}
    </div> -->
  </div>
</template>

<script>
export default {
  name: "RankNews",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    artists: {
      type: Array,
      default() {
        return [];
      },
    },
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
    // resft:{
    //   type:Object,
    //   default(){
    //     return {}
    //   }
    // }
  },
};
</script>

<style lang="less" scoped>
img {
  width: 120px;
  height: 120px;
}
a {
  text-decoration: none;
}
</style>