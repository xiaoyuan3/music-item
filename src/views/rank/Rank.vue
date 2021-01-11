<template>
  <div class="rank">
    <rank-news
      @selectItem="selectItem"
      :list="list"
      :songList1="songList1"
    ></rank-news>
    <!-- <rank-news-song :songs="songs" :artists="artists"></rank-news-song> -->
    <router-view></router-view>
  </div>
 
</template>

<script>
// 公共组件
import { getRankNews, getRankNewsSing } from "network/rank";
import { getPlayer } from "network/player";

// 子组件
import RankNews from "./childComps/RankNews";
import { mapMutations,mapGetters } from 'vuex';
// import RankNewsSong from "./childComps/RankNewsSong";
export default {
  name: "Rank",
  components: {
    RankNews,
    // RankNewsSong,
  },
  data() {
    return {
      list: [],
      artists: [],
      songs: [],
      songList1: [],
    };
  },
  created() {
    this.getRankNewsSing();
  },
  methods: {
    getRankNewsSing() {
      getRankNewsSing().then((res) => {
        console.log(res.list);
        this.list = res.list;
        
      });
    },
    selectItem(item) {
      console.log('xx');
      this.$router.push({
        path: `/rank/${item.id}`,
      });
      let rank = []
      rank = item
      this.setRank(rank)
    },
    ...mapMutations({
      setRank: "SET_RANK",
    }),
  },
  computed:{
    ...mapGetters["Rank"]
  }
};
</script>

<style lang="less" scoped>
.rank {
  margin-top: 78px;
}
</style>