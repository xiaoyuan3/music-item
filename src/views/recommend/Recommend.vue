<template>
  <div class="rencommend">
    <scroll class="content" ref="scroll" :probe-type="3">
      <div>
        <recommend-swiper :banners="banners"></recommend-swiper>
        <recommend-person @selectItem="selectItem" :result="result"></recommend-person>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
// 公共组件
import { getRecommendBanner, getRecommendPerson } from "network/recommend";
import Scroll from "components/common/scroll/Scroll";
// 子组件
import RecommendSwiper from "./childComps/RecommendSwiper";
import RecommendPerson from "./childComps/RecommendPerson";
import {mapMutations,mapGetters} from 'vuex'
export default {
  name: "Recommend",
  components: {
    RecommendSwiper,
    RecommendPerson,
    Scroll,
  },
  data() {
    return {
      banners: [],
      result: [],
    };
  },
  created() {
    // 调用methods中的getRecommendBanner、getRecommendPerson函数
    this.getRecommendBanner();
    this.getRecommendPerson();
    
  },
  mounted() {
    setTimeout(() => {
      this.$refs.scroll.refresh();
    }, 20);
  },
  methods: {
    getRecommendBanner() {
      // 轮播图的 axios的网络请求 返回ppromise
      getRecommendBanner().then((res) => {
        // 打印数据
        // console.log(res.banners);
        this.banners = res.banners;
      });
    },
    getRecommendPerson() {
      // 推荐歌单中的网络请求
      getRecommendPerson().then((res) => {
        console.log(res.result);
        this.result = res.result;
      });
    },
    selectItem(item){
      this.$router.push({
        path: `/recommend/${item.id}`,
      });
      let disc = []
      disc = item
      console.log(disc);
      this.setDisc(disc)
    },
    ...mapMutations({
        setDisc: 'SET_DISC'
      })
  },
  computed: {
    ...mapGetters["disc"]
  }
};
</script>

<style lang="less" scoped>
.rencommend {
  margin-top: 79px;
  height: calc(100% - 79);
  .content {
    position: absolute;
    top: 78px;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>