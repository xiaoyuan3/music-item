<template>
  <div class="ranking">
    <!-- <div v-for="(item, index) in list" :key="index" class="rank-d"></div> -->

    <!-- <div v-for="(items, index) in resft" :key="index">
      {{items.artistToplist.artists[index].first}}
    </div> -->
    <ul v-for="(item, index) in list" :key="index" class="rank-sing">
      <li>
        <a href="">
          <img :src="item.coverImgUrl" alt="" />
          <!-- {{item.description}} -->
        </a>
      </li>

      <li>
        <p v-for="items in artists" class="rankp">{{ items.first }}-</p>
        <p v-for="item in songs" class="rankp-p">{{ item.name }}</p>
      </li>
    </ul>
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
.ranking {
  padding: 0;
  margin: 0;
  .rank-sing {
    display: flex;
    // justify-content: space-between;
    padding: 0;
    list-style: none;
    li {
      
      img {
        width: 120px;
        height: 120px;
      }
      a {
        text-decoration: none;
      }
    }
  }
}
</style>