<template>
  <div>
    <recommend-swiper :banners="banners"></recommend-swiper>
    <recommend-person :result="result"></recommend-person>
  </div>
</template>

<script>
// 公共组件
import { getRecommendBanner, getRecommendPerson } from "network/recommend";
// 子组件
import RecommendSwiper from "./childComps/RecommendSwiper";
import RecommendPerson from './childComps/RecommendPerson'
export default {
  name: "Recommend",
  data() {
    return {
      banners: [],
      result:[],
    };
  },
  components: {
    RecommendSwiper,
    RecommendPerson
  },
  created() {
    // 调用下面的getRecommendBanner函数
    this.getRecommendBanner();
    this.getRecommendPerson();
  },
  methods: {
    // axios的网络请求
    getRecommendBanner() {
      getRecommendBanner().then((res) => {
        // 打印数据
        console.log(res.banners);
        this.banners = res.banners;
      });
    },
    getRecommendPerson() {
      getRecommendPerson().then((res) => {
        console.log(res.result);
        this.result = res.result
      })
    }
  },
};
</script>

<style lang="less" scoped>
</style>