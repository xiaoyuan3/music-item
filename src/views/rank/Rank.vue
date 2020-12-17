<template>
  <div class="rank">
    <rank-news :list="list" :songs="songs" :artists="artists"></rank-news>
    <!-- <rank-news-song :songs="songs" :artists="artists"></rank-news-song> -->
  </div>
</template>

<script>
// 公共组件
import { getRankNews, getRankNewsSing } from "network/rank";

// 子组件
import RankNews from "./childComps/RankNews";
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
      artists:[],
      songs:[],
    };
  },
  created() {
    this.getRankNews();
    this.getRankNewsSing();
  },
  methods: {
    getRankNews() {
      getRankNews().then((res) => {
        // console.log(res);
        this.list = res.list;
      });
    },
    getRankNewsSing() {
      getRankNewsSing().then((res) => {
        console.log(res);
        // console.log(res.artistToplist.artists);
        // console.log(res.rewardToplist.songs);
        this.artists = res.artistToplist.artists;
        this.songs = res.rewardToplist.songs;

        // this.resft = res
      });
    },
  },
};
</script>

<style lang="less" scoped>
.rank {
  margin-top: 78px;
}

</style>